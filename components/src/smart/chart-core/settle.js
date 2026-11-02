// The data table under a chart costs a row per x: rebuilding it on every
// pointer move or every point of a stream would cost more than the chart.
// The table shows a settled copy of the data instead: a change after a quiet
// spell shows at once, a stream shows at most once per `wait`, and the latest
// data always shows last. Nothing is lost; a table read mid-stream is at most
// `wait` behind the plot.

/**
 * The value to show for `value`, which may change fast. `holder` keeps the
 * state between calls (one per element); `later` asks for a render when a
 * held value is due.
 */
export function settled(holder, value, {wait = 1000, later, now = Date.now()} = {}) {
  if (!holder.started || value === holder.shown) {
    clearTimeout(holder.timer);
    Object.assign(holder, {started: true, shown: value, latest: value, at: now, timer: 0});
    return value;
  }
  holder.latest = value;
  if (now - holder.at >= wait) {
    clearTimeout(holder.timer);
    Object.assign(holder, {shown: value, at: now, timer: 0});
    return value;
  }
  if (!holder.timer) {
    holder.timer = setTimeout(() => {
      Object.assign(holder, {shown: holder.latest, at: Date.now(), timer: 0});
      later?.();
    }, wait - (now - holder.at));
  }
  return holder.shown;
}
