import { single } from './single';

/** Input Point Structure Interface */
interface Point {
  x: number;
  y: number;
  v: number;
}

/** Search Point Cursor Type */
type Cursor<T, U = { [K in keyof T]: number }> = U;

/**
 * Double interpolation store
 * 
 * @param {string} points interpolation matrix data
 * @return {void} interpolation execut method
 */
export function double(points: Point[]): <T>(cursor: Cursor<T>) => number {
  if (points.length <= 3) {
    throw "Can't calculate double interpolation, please provide more points";
  }

  // const x1 = arr.sort((a, b) => b[0] - a[0]).find(i => i[0] <= x);
  // const x2 = arr.sort((a, b) => a[0] - b[0]).find(i => i[0] >= x);

  // if (!x1 || !x2) {
  //   throw new NotFoundError(`can't calculate double interpolation of x: '${x}' and y: '${y}'`);
  // }

  // if (x1[0] === x2[0]) {
  //   return SINGLE(arr.filter(i => i[0] === x1[0]).map(i => [i[2], i[1]]), y);
  // }

  // const y1 = arr.sort((a, b) => b[2] - a[2]).find(i => i[2] <= y);
  // const y2 = arr.sort((a, b) => a[2] - b[2]).find(i => i[2] >= y);

  // if (!y1 || !y2) {
  //   throw new NotFoundError(`can't calculate double interpolation of x: '${x}' and y: '${y}'`);
  // }

  // if (y1[2] === y2[2]) {
  //   return SINGLE(arr.filter(i => i[2] === y1[2]).map(i => [i[0], i[1]]), x);
  // }

  // const v11 = arr.find(i => i[0] === x1[0] && i[2] === y1[2]);
  // const v12 = arr.find(i => i[0] === x2[0] && i[2] === y1[2]);
  // const v21 = arr.find(i => i[0] === x1[0] && i[2] === y2[2]);
  // const v22 = arr.find(i => i[0] === x2[0] && i[2] === y2[2]);

  // const a1 = x2[0] - x;
  // const a2 = y2[2] - y;
  // const a3 = x2[0] - x1[0];
  // const a4 = y2[2] - y1[2];
  // const a = ((a1 * a2) / (a3 * a4)) * v11[1];

  // const b1 = x - x1[0];
  // const b2 = y2[2] - y;
  // const b3 = x2[0] - x1[0];
  // const b4 = y2[2] - y1[2];
  // const b = ((b1 * b2) / (b3 * b4)) * v12[1];

  // const c1 = x2[0] - x;
  // const c2 = y - y1[2];
  // const c3 = x2[0] - x1[0];
  // const c4 = y2[2] - y1[2];
  // const c = ((c1 * c2) / (c3 * c4)) * v21[1];

  // const d1 = x - x1[0];
  // const d2 = y - y1[2];
  // const d3 = x2[0] - x1[0];
  // const d4 = y2[2] - y1[2];
  // const d = ((d1 * d2) / (d3 * d4)) * v22[1];

  // return a + b + c + d;



  return <T>(cursor: Cursor<T>): number => {
    // to do left extrapolation
    // to do right extrapolation

    if ("x" in cursor && "y" in cursor) {
      const x1 = points.sort((a: Point, b: Point) => b.x - a.x).find((i: Point) => i.x <= cursor["x"]);
      const x2 = points.sort((a: Point, b: Point) => a.x - b.x).find((i: Point) => i.x >= cursor["x"]);

      if (!x1 || !x2) {
        throw `Can't calculate double interpolation of x: '${cursor["x"]}'`;
      }

      if (x1.x == x2.x) {
        return single(points.filter(i => i.x == x1.x).map(i => ({ x: i.y, v: i.v })))({ x: cursor["y"] });
      }

      const y1 = points.sort((a: Point, b: Point) => b.y - a.y).find((i: Point) => i.x <= cursor["y"]);
      const y2 = points.sort((a: Point, b: Point) => a.y - b.y).find((i: Point) => i.x >= cursor["y"]);

      if (!y1 || !y2) {
        throw `Can't calculate double interpolation of y: '${cursor["y"]}'`;
      }

      if (y1.y == y2.y) {
        return single(points.filter(i => i.y == y1.y).map(i => ({ x: i.x, v: i.v })))({ x: cursor["x"] });
      }

      const v11 = points.find(i => i.x == x1.x && i.y == y1.y);
      const v12 = points.find(i => i.x == x2.x && i.y == y1.y);
      const v21 = points.find(i => i.x == x1.x && i.y == y2.y);
      const v22 = points.find(i => i.x == x2.x && i.y == y2.y);

      if (!v11 || !v12 || !v21 || !v22) {
        throw `Can't calculate double interpolation of x: '${cursor["x"]}' and y: '${cursor["y"]}'`;
      }

      const p1 = (((x2.x - cursor["x"]) * (y2.y - cursor["y"])) / ((x2.x - x1.x) * (y2.y - y1.y))) * v11.v;
      const p2 = (((cursor["x"] - x1.x) * (y2.y - cursor["y"])) / ((x2.x - x1.x) * (y2.y - y1.y))) * v12.v;
      const p3 = (((x2.x - cursor["x"]) * (cursor["y"] - y1.y)) / ((x2.x - x1.x) * (y2.y - y1.y))) * v21.v;
      const p4 = (((cursor["x"] - x1.x) * (cursor["y"] - y1.y)) / ((x2.x - x1.x) * (y2.y - y1.y))) * v22.v;

      return p1 + p2 + p3 + p4;
    }

    if ("v" in cursor && "x" in cursor) {
      points.sort((a: Point, b: Point) => a.v - b.v);
      // to do
    }

    if ("v" in cursor && "y" in cursor) {
      points.sort((a: Point, b: Point) => a.v - b.v);
      // to do
    }

    throw "Can't calculate double interpolation, please provide correct martix data";
  };
}
