// The keyboard cursor of a plot (docs/research/rendering.md §3): one Tab stop,
// arrows along x, up and down across the shown series, Home and End, Page
// Up and Page Down a tenth of the points at a time. Past `bucketFrom`
// points an arrow moves by a bucket, so a long series is crossed in about
// a hundred presses, not ten thousand.

/** The next {index, series} for a key, or null when the key is not the cursor's. */
export function moveCursor(cursor, key, {count, shown, bucketFrom = 200}) {
  if (!count || !shown.length) return null;
  const start = cursor ?? {index: 0, series: shown[0]};
  const step = count > bucketFrom ? Math.ceil(count / 100) : 1;
  const page = Math.max(1, Math.round(count / 10));
  const place = Math.max(0, shown.indexOf(start.series));
  const clamp = (index) => Math.max(0, Math.min(count - 1, index));
  // The first key only puts the cursor on the first point.
  if (!cursor && ['ArrowRight', 'ArrowLeft', 'ArrowUp', 'ArrowDown'].includes(key)) return {index: 0, series: shown[0]};
  switch (key) {
    case 'ArrowRight': return {index: clamp(start.index + step), series: start.series};
    case 'ArrowLeft': return {index: clamp(start.index - step), series: start.series};
    case 'ArrowDown': return {index: start.index, series: shown[Math.min(shown.length - 1, place + 1)]};
    case 'ArrowUp': return {index: start.index, series: shown[Math.max(0, place - 1)]};
    case 'Home': return {index: 0, series: start.series};
    case 'End': return {index: count - 1, series: start.series};
    case 'PageDown': return {index: clamp(start.index + page), series: start.series};
    case 'PageUp': return {index: clamp(start.index - page), series: start.series};
    default: return null;
  }
}
