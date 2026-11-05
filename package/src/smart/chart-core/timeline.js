// The ranges of a timeline (docs/research/catalogue.md, Gantt / timeline):
// tasks or states as start and end times per row, the ranges data shape of
// docs/research/parameters.md §2.1 (row, start, end, status). A row is a
// lane across the plot; it may hold one range (a task of a plan) or many
// (the states of a service through a day). A range whose start and end are
// the same moment is a milestone.
//
// The rows, the layout and the time scale live here and not in the element,
// so another component can compose them: an editable Gantt chart of the view
// set draws its rows with them and adds its own editing and dependencies
// (the dispatcher's boundary with the name's reservation, docs/DECISIONS.md
// D13).
import {readRows, readTime} from './data.js';
import {bandScale, linearScale, tickCount, timeTicks} from './scale.js';

const text = (value) => (value === undefined || value === null ? '' : String(value));

/**
 * The ranges of rows: {rowField, startField, endField, statusField, lanes,
 * statuses, ranges, from, to, missing, dropped}.
 *
 * A lane is {key, place, ranges}, in the order the rows first name it. A
 * range is {row, lane, place, start, end, status, tone}: `place` is its
 * lane's, `tone` its status's place among the statuses (0 without a status
 * field). `ranges` go lane after lane, by start in each, the keyboard's
 * order, and each has its `index` in it. A row without a start or an end is
 * left out as missing, one that ends before it starts as dropped.
 */
export function timelineRows(items, {row = '', start = '', end = '', status = ''} = {}) {
  const rows = readRows(items);
  const fields = rows.length ? Object.keys(rows[0]) : [];
  const startField = start || 'start';
  const endField = end || 'end';
  const rowField = row || fields.find((name) => name !== startField && name !== endField && name !== status) || '';
  const lanes = new Map();
  const statuses = new Map();
  let missing = 0;
  let dropped = 0;
  rows.forEach((one, index) => {
    const from = readTime(one[startField]);
    const to = readTime(one[endField]);
    if (from === null || to === null) {
      missing += 1;
      return;
    }
    if (to < from) {
      dropped += 1;
      return;
    }
    const key = text(one[rowField]);
    if (!lanes.has(key)) lanes.set(key, {key, place: lanes.size, ranges: []});
    const said = status ? text(one[status]) : '';
    if (status && !statuses.has(said)) statuses.set(said, statuses.size);
    const lane = lanes.get(key);
    lane.ranges.push({row: index, lane: key, place: lane.place, start: from, end: to, status: said, tone: status ? statuses.get(said) : 0});
  });
  const ranges = [];
  for (const lane of lanes.values()) {
    lane.ranges.sort((a, b) => a.start - b.start || a.end - b.end || a.row - b.row);
    for (const one of lane.ranges) {
      one.index = ranges.length;
      ranges.push(one);
    }
  }
  const from = ranges.length ? Math.min(...ranges.map((one) => one.start)) : null;
  const to = ranges.length ? Math.max(...ranges.map((one) => one.end)) : null;
  return {
    rowField, startField, endField, statusField: status,
    lanes: [...lanes.values()], statuses: [...statuses.keys()], ranges, from, to, missing, dropped,
  };
}

/**
 * The time each status takes, summed over its ranges, largest first:
 * [{status, time}]. Milestones take none.
 */
export function statusTimes(ranges) {
  const times = new Map();
  for (const one of ranges) times.set(one.status, (times.get(one.status) ?? 0) + (one.end - one.start));
  return [...times].map(([status, time]) => ({status, time})).sort((a, b) => b.time - a.time);
}

/**
 * The range of `lane` nearest in time to the moment `at`: the one that holds
 * it, else the one whose nearer end is closest. Null for an empty lane.
 */
export function nearestRange(lane, at) {
  let best = null;
  let distance = Infinity;
  for (const one of lane?.ranges ?? []) {
    const away = at < one.start ? one.start - at : at > one.end ? at - one.end : 0;
    if (away < distance) {
      best = one;
      distance = away;
    }
  }
  return best;
}

const MINUTE = 60 * 1000;
const HOUR = 60 * MINUTE;
const DAY = 24 * HOUR;

/**
 * A length of time in the unit a person reads it in: {amount, unit}, the
 * unit an Intl unit (day, hour or minute). Two days and more are days, two
 * hours and more hours, else minutes; days and hours keep a tenth below ten.
 */
export function durationOf(ms) {
  const length = Math.max(0, ms);
  const round = (value) => (value < 10 ? Math.round(value * 10) / 10 : Math.round(value));
  if (length >= 2 * DAY) return {amount: round(length / DAY), unit: 'day'};
  if (length >= 2 * HOUR) return {amount: round(length / HOUR), unit: 'hour'};
  return {amount: Math.round(length / MINUTE), unit: 'minute'};
}

// A letter's width against the font: Cyrillic is near 0.7 of it.
const LETTER = 0.72;
// A digit's width against the font, for the axis.
const CHAR = 0.6;
const GAP = 8;

// A text cut to so many characters, with an ellipsis, which is wider than a
// letter and so takes two places; '' below three letters and the ellipsis.
export const cutText = (value, chars) => {
  if (value.length <= chars) return value;
  return chars < 5 ? '' : `${value.slice(0, chars - 2)}…`;
};

/**
 * Where a timeline's marks go in a box of {width, height}: {width, height,
 * font, inner, lanes, ranges, xTicks, gridTicks, x}.
 *
 * - The rows share the height in bands, a bar `thickest` px at most; a
 *   row's name (from `names`, cut with an ellipsis) stands at the start in
 *   at most three tenths of the width when the row is tall enough for a
 *   line, and is '' when not.
 * - The time runs from the first start to the last end (a day round one
 *   moment), with half a bar kept at each end so a milestone there is
 *   whole; `xTicks` are calendar ticks said by `tickText(time, unit)` that
 *   do not crowd, `gridTicks` every tick's place, `x` the scale.
 * - A range is the model's with {milestone, x, y, w, h, cx, cy}: a bar from
 *   its start to its end a pixel short so neighbours that touch stay apart,
 *   never thinner than one; a milestone a square box for its diamond.
 */
export function timelineLayout(model, {width, height}, {font = 12, thickest = 20, names = [], tickText = String} = {}) {
  const letter = font * LETTER;
  const top = GAP / 2;
  const bottom = Math.max(top + 1, height - font * 1.5 - GAP);
  const band = bandScale(model.lanes.length, [top, bottom], {padding: 0.3});
  const named = band.step >= font * 1.15;
  const widest = Math.min(width * 0.3, Math.max(0, ...names.map((name) => name.length)) * letter);
  const left = named ? Math.ceil(widest) + GAP * 1.5 : GAP / 2;
  const room = Math.floor((left - GAP * 1.5) / letter);
  const thick = Math.max(2, Math.min(thickest, band.width));
  const edge = Math.ceil(thick / 2) + 1;
  const inner = {top, bottom, left: left + edge, right: Math.max(left + edge + 1, width - Math.max(GAP, edge))};

  let from = model.from ?? 0;
  let to = model.to ?? 0;
  if (from === to) {
    from -= DAY / 2;
    to += DAY / 2;
  }
  const x = linearScale([from, to], [inner.left, inner.right]);
  const calendar = timeTicks(from, to, tickCount(inner.right - inner.left, font * CHAR * 12));
  const xTicks = [];
  let last = -Infinity;
  for (const time of calendar.ticks) {
    const said = tickText(time, calendar.unit);
    const at = x(time);
    const half = (said.length * font * CHAR * 1.2) / 2;
    if (at - half < last + GAP || at - half < 0 || at + half > width) continue;
    xTicks.push({at, text: said});
    last = at + half;
  }

  const lanes = model.lanes.map((one, index) => ({
    key: one.key, place: one.place, y: band.at(index) - (band.step - band.width) / 2, h: band.step,
    cy: band.at(index) + band.width / 2, text: named ? cutText(names[index] ?? '', room) : '',
  }));
  const ranges = model.ranges.map((one) => {
    const x0 = x(one.start);
    const x1 = x(one.end);
    const {cy} = lanes[one.place];
    const milestone = one.start === one.end;
    const w = milestone ? thick : Math.max(1, x1 - x0 > 3 ? x1 - x0 - 1 : x1 - x0);
    const start = milestone ? x0 - thick / 2 : x0;
    return {...one, milestone, x: start, y: cy - thick / 2, w, h: thick, cx: start + w / 2, cy};
  });
  return {width, height, font, inner, lanes, ranges, xTicks, gridTicks: calendar.ticks.map((time) => x(time)), x};
}
