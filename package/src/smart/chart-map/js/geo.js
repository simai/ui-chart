// The regions of a choropleth map (docs/research/catalogue.md, Choropleth
// map; docs/DECISIONS.md D16): areas the page gives as GeoJSON, each
// filled by the step of its value. The package holds no map of its own: the
// boundaries, their source and their licence are the page's (the owner's
// decision q-f136944dd5). Own implementation: the reading of GeoJSON
// polygons, the projections, the fitting into the plot.
import {readNumber, readRows} from '../../chart-core/data.js';

const RAD = Math.PI / 180;
const text = (value) => (value === undefined || value === null ? '' : String(value));

/**
 * The areas of `shapes`, a GeoJSON FeatureCollection, a list of Features or
 * {features}: [{key, name, polygons}], in the order given. A polygon is a
 * list of rings (the outline, then its holes), a ring a list of [x, y]. A
 * feature's key is its `keyField` property, else its id, else its
 * properties.id; its name the `nameField` property (name by default), else
 * its key. A feature without a key or a polygon is left out (`dropped`).
 */
export function geoRegions(shapes, {keyField = '', nameField = ''} = {}) {
  const features = Array.isArray(shapes) ? shapes : Array.isArray(shapes?.features) ? shapes.features : [];
  const regions = [];
  const seen = new Set();
  let dropped = 0;
  for (const feature of features) {
    const props = feature?.properties ?? {};
    const key = text(keyField ? props[keyField] : feature?.id ?? props.id);
    const geometry = feature?.geometry;
    const raw = geometry?.type === 'Polygon' ? [geometry.coordinates] : geometry?.type === 'MultiPolygon' ? geometry.coordinates : [];
    const polygons = (raw ?? []).map((polygon) => (Array.isArray(polygon) ? polygon : [])
      .map((ring) => (Array.isArray(ring) ? ring.filter((point) => Array.isArray(point) && Number.isFinite(point[0]) && Number.isFinite(point[1])).map(([x, y]) => [x, y]) : []))
      .filter((ring) => ring.length >= 3))
      .filter((polygon) => polygon.length);
    if (!key || !polygons.length || seen.has(key)) {
      dropped += 1;
      continue;
    }
    seen.add(key);
    regions.push({key, name: text(props[nameField || 'name']) || key, polygons});
  }
  return {regions, dropped};
}

/**
 * The values of rows joined to the regions by key: {regionField,
 * valueField, values (Map key → number), unmatched, missing}. A row whose
 * key names no region is unmatched; a row without a number is missing; the
 * same key twice keeps the last.
 */
export function geoValues(items, regions, {region = '', value = ''} = {}) {
  const rows = readRows(items);
  const fields = [...new Set(rows.flatMap((row) => Object.keys(row)))];
  const regionField = region || fields.find((name) => rows.some((row) => typeof row[name] === 'string')) || 'region';
  const valueField = value || fields.find((name) => name !== regionField && rows.some((row) => readNumber(row[name]) !== null)) || 'value';
  const keys = new Set(regions.map((one) => one.key));
  const values = new Map();
  let unmatched = 0;
  let missing = 0;
  for (const row of rows) {
    const key = text(row[regionField]);
    const amount = readNumber(row[valueField]);
    if (!keys.has(key)) {
      unmatched += 1;
      continue;
    }
    if (amount === null) {
      missing += 1;
      continue;
    }
    values.set(key, amount);
  }
  return {regionField, valueField, values, unmatched, missing};
}

// Longitudes across the 180th meridian (a far-eastern region given at
// -170) are carried past 180, so a region and the map stay whole.
function wrapped(regions) {
  let east = false;
  let west = false;
  for (const one of regions) {
    for (const polygon of one.polygons) {
      for (const ring of polygon) {
        for (const [x] of ring) {
          if (x > 150) east = true;
          if (x < -150) west = true;
        }
      }
    }
  }
  if (!(east && west)) return regions;
  return regions.map((one) => ({...one, polygons: one.polygons.map((polygon) => polygon.map((ring) => ring.map(([x, y]) => [x < 0 ? x + 360 : x, y])))}));
}

function extentOf(regions) {
  let [left, right, bottom, top] = [Infinity, -Infinity, Infinity, -Infinity];
  for (const one of regions) {
    for (const polygon of one.polygons) {
      for (const [x, y] of polygon[0]) {
        left = Math.min(left, x);
        right = Math.max(right, x);
        bottom = Math.min(bottom, y);
        top = Math.max(top, y);
      }
    }
  }
  return {left, right, bottom, top};
}

/**
 * A projection of longitude and latitude in degrees to a plane, with north
 * up (the plane's y grows down, as on the screen):
 *   mercator         angles kept, the poles far (a city, a country)
 *   albers           areas kept, a cone through two parallels at a sixth
 *                    and five sixths of the map's latitudes (a wide
 *                    country)
 *   equirectangular  degrees as they are, longitude shortened at the
 *                    middle latitude
 *   plane            the coordinates as they are, y down (a floor plan)
 */
export function projectionOf(name, {left, right, bottom, top}) {
  if (name === 'plane') return ([x, y]) => [x, y];
  const middle = (left + right) / 2;
  if (name === 'equirectangular') {
    const squeeze = Math.cos(((bottom + top) / 2) * RAD);
    return ([x, y]) => [(x - middle) * squeeze, -y];
  }
  if (name === 'albers') {
    const p1 = (bottom + (top - bottom) / 6) * RAD;
    const p2 = (bottom + ((top - bottom) * 5) / 6) * RAD;
    const n = Math.abs(p1 - p2) < 1e-6 ? Math.sin(p1) || 1e-6 : (Math.sin(p1) + Math.sin(p2)) / 2;
    const c = Math.cos(p1) ** 2 + 2 * n * Math.sin(p1);
    const r0 = Math.sqrt(Math.max(0, c - 2 * n * Math.sin(((bottom + top) / 2) * RAD))) / n;
    return ([x, y]) => {
      const r = Math.sqrt(Math.max(0, c - 2 * n * Math.sin(y * RAD))) / n;
      const angle = n * (x - middle) * RAD;
      return [r * Math.sin(angle), -(r0 - r * Math.cos(angle))];
    };
  }
  return ([x, y]) => {
    const lat = Math.max(-85, Math.min(85, y)) * RAD;
    return [(x - middle) * RAD, -Math.log(Math.tan(Math.PI / 4 + lat / 2))];
  };
}

// A ring's signed area and centroid (the shoelace sums).
function ringFacts(ring) {
  let area = 0;
  let cx = 0;
  let cy = 0;
  for (let index = 0; index < ring.length; index += 1) {
    const [x0, y0] = ring[index];
    const [x1, y1] = ring[(index + 1) % ring.length];
    const cross = x0 * y1 - x1 * y0;
    area += cross;
    cx += (x0 + x1) * cross;
    cy += (y0 + y1) * cross;
  }
  area /= 2;
  return area ? {area, cx: cx / (6 * area), cy: cy / (6 * area)} : {area: 0, cx: ring[0][0], cy: ring[0][1]};
}

const round = (value) => Math.round(value * 10) / 10;

/**
 * The regions projected and fitted into `box` {width, height} with `pad`
 * px round, the shape's proportions kept and centred: [{key, name, path,
 * x, y, box, area}] in the regions' order. `path` is SVG path data (the
 * holes drawn by the even-odd rule); a point closer than half a pixel to
 * the one before is left out. (x, y) is the middle of the region's largest
 * polygon, where its name stands; `box` its bounds.
 */
export function geoLayout(regions, {width, height}, {projection = 'mercator', pad = 4} = {}) {
  const flat = projection === 'plane' ? regions : wrapped(regions);
  if (!flat.length) return [];
  const project = projectionOf(projection, extentOf(flat));
  const projected = flat.map((one) => ({...one, polygons: one.polygons.map((polygon) => polygon.map((ring) => ring.map(project)))}));
  const {left, right, bottom, top} = extentOf(projected);
  const scale = Math.min((width - pad * 2) / (right - left || 1), (height - pad * 2) / (top - bottom || 1));
  const dx = (width - (right - left) * scale) / 2 - left * scale;
  const dy = (height - (top - bottom) * scale) / 2 - bottom * scale;
  return projected.map((one) => {
    let path = '';
    let best = {area: -1};
    let [x0, x1, y0, y1] = [Infinity, -Infinity, Infinity, -Infinity];
    for (const polygon of one.polygons) {
      polygon.forEach((ring, place) => {
        const points = ring.map(([x, y]) => [x * scale + dx, y * scale + dy]);
        let at = null;
        let piece = '';
        for (const point of points) {
          if (at && Math.abs(point[0] - at[0]) < 0.5 && Math.abs(point[1] - at[1]) < 0.5) continue;
          piece += `${piece ? 'L' : 'M'}${round(point[0])} ${round(point[1])}`;
          at = point;
          if (!place) {
            x0 = Math.min(x0, point[0]);
            x1 = Math.max(x1, point[0]);
            y0 = Math.min(y0, point[1]);
            y1 = Math.max(y1, point[1]);
          }
        }
        path += `${piece}Z`;
        if (!place) {
          const facts = ringFacts(points);
          if (Math.abs(facts.area) > best.area) best = {area: Math.abs(facts.area), x: facts.cx, y: facts.cy};
        }
      });
    }
    return {key: one.key, name: one.name, path, x: best.x, y: best.y, box: {x: x0, y: y0, w: x1 - x0, h: y1 - y0}, area: best.area};
  });
}

/**
 * The reading order of placed regions: top to bottom in bands `band` px
 * tall, left to right in each.
 */
export function regionOrder(places, band) {
  return places.map((one, index) => ({index, row: Math.floor(one.y / band), x: one.x}))
    .sort((a, b) => a.row - b.row || a.x - b.x)
    .map((one) => one.index);
}

/**
 * The region nearest above (`up`) or below the one at `from`: among the
 * centres that lie more that way than sideways, the closest; else null.
 */
export function nearestRegion(places, from, up) {
  const here = places[from];
  let best = null;
  let bestDistance = Infinity;
  places.forEach((one, index) => {
    if (index === from) return;
    const dy = (one.y - here.y) * (up ? -1 : 1);
    const dx = Math.abs(one.x - here.x);
    if (dy <= 0 || dy < dx / 2) return;
    const distance = Math.hypot(dx, dy);
    if (distance < bestDistance) {
      best = index;
      bestDistance = distance;
    }
  });
  return best;
}
