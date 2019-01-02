/** Input Point Structure Interface */
interface Point {
  x: number;
  v: number;
}

/** Search Point Cursor Type */
type Cursor<T, U = { [K in keyof T]: number }> = U;

/**
 * Format matrix points to simple structure points
 * 
 * @param {string} points interpolation matrix data
 * @return {array} formatted points
 */
function format<T>(cursor: Cursor<T>, points: Point[]): [number, Array<Array<number>>] {
  if ("x" in cursor) {
    points.sort((a: Point, b: Point) => a.x - b.x);
    return [cursor["x"], points.map((i: Point) => [i.x, i.v])];
  }
  if ("v" in cursor) {
    points.sort((a: Point, b: Point) => a.v - b.v);
    return [cursor["v"], points.map((i: Point) => [i.v, i.x])];
  }
  throw "Can't calculate single interpolation, please provide correct martix data";
}

/**
 * Single interpolation store
 * 
 * @param {string} points interpolation matrix data
 * @return {void} interpolation execut method
 */
export function single(points: Point[]): <T>(cursor: Cursor<T>) => number {
  if (points.length <= 1) {
    throw "Can't calculate single interpolation, please provide more points";
  }

  return <T>(cursor: Cursor<T>): number => {
    const [c, p] = format(cursor, points);
    const n = points.length - 1;

    if (c <= p[0][0]) {
      return p[0][1] + (c - p[0][0]) * (p[1][1] - p[0][1]) / (p[1][0] - p[0][0]);
    }
  
    if (c >= p[n][0]) {
      return p[n][1] + (c - p[n][0]) * (p[n][1] - p[n - 1][1]) / (p[n][0] - p[n - 1][0]);
    }

    for (let i = 0; i < n; i += 1) {
      if (c > p[i][0] && c <= p[i + 1][0]) {
        return p[i][1] + (c - p[i][0]) * (p[i + 1][1] - p[i][1]) / (p[i + 1][0] - p[i][0]);
      }
    }

    throw "Can't calculate single interpolation";
  };
}
