/** Input Point Structure Interface */
interface Point {
  x: number;
  y: number;
  v: number;
}

/** Search Point Cursor Type */
type Cursor<T, U = { [K in keyof T]: number }> = U;

/**
 * Dounble interpolation store
 * 
 * @param {string} points interpolation matrix data
 * @return {void} interpolation execut method
 */
export function double(points: Point[]): <T>(cursor: Cursor<T>) => number {
  if (points.length <= 1) {
    throw "Can't calculate double interpolation, please provide points";
  }

  return <T>(cursor: Cursor<T>): number => {
    return 1;
  };
}
