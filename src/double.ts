import { single } from './single';

/** Input Point Structure Interface */
interface Point {
  x: number;
  y: number;
  z: number;
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

  return <T>(cursor: Cursor<T>): number => {
    if ("x" in cursor && "y" in cursor) {
      const xs1 = (a: Point, b: Point): number => b.x - a.x;
      const xf1 = (i: Point): boolean => i.x <= cursor["x"];

      const x1 = points.sort(xs1).find(xf1);

      const xs2 = (a: Point, b: Point): number => a.x - b.x;
      const xf2 = (i: Point): boolean => i.x >= cursor["x"];

      const x2 = points.sort(xs2).find(xf2);

      if (!x1 || !x2) {
        throw `Can't calculate double interpolation for x: '${cursor["x"]}'`;
      }
      const ys1 = (a: Point, b: Point): number => b.y - a.y;
      const yf1 = (i: Point): boolean => i.y <= cursor["y"];

      const y1 = points.sort(ys1).find(yf1);
      
      const ys2 = (a: Point, b: Point): number => a.y - b.y;
      const yf2 = (i: Point): boolean => i.y >= cursor["y"];

      const y2 = points.sort(ys2).find(yf2);

      if (!y1 || !y2) {
        throw `Can't calculate double interpolation for y: '${cursor["y"]}'`;
      }

      if (x1.x == x2.x) {
        const f = (i: Point): boolean => i.x == x1.x;
        const m = (i: Point): { x: number, y: number } => ({ x: i.y, y: i.z });

        return single(points.filter(f).map(m))({ x: cursor["y"] });
      }

      if (y1.y == y2.y) {
        const f = (i: Point): boolean => i.y == y1.y;
        const m = (i: Point): { x: number, y: number } => ({ x: i.x, y: i.z });

        return single(points.filter(f).map(m))({ x: cursor["x"] });
      }

      const z11 = points.find((i: Point): boolean => i.x == x1.x && i.y == y1.y);
      const z12 = points.find((i: Point): boolean => i.x == x2.x && i.y == y1.y);
      const z21 = points.find((i: Point): boolean => i.x == x1.x && i.y == y2.y);
      const z22 = points.find((i: Point): boolean => i.x == x2.x && i.y == y2.y);

      if (!z11 || !z12 || !z21 || !z22) {
        throw `Can't calculate double interpolation for x: '${cursor["x"]}' and y: '${cursor["y"]}'`;
      }

      const p1 = (((x2.x - cursor["x"]) * (y2.y - cursor["y"])) / ((x2.x - x1.x) * (y2.y - y1.y))) * z11.z;
      const p2 = (((cursor["x"] - x1.x) * (y2.y - cursor["y"])) / ((x2.x - x1.x) * (y2.y - y1.y))) * z12.z;
      const p3 = (((x2.x - cursor["x"]) * (cursor["y"] - y1.y)) / ((x2.x - x1.x) * (y2.y - y1.y))) * z21.z;
      const p4 = (((cursor["x"] - x1.x) * (cursor["y"] - y1.y)) / ((x2.x - x1.x) * (y2.y - y1.y))) * z22.z;

      return p1 + p2 + p3 + p4;
    }






    



    if ("z" in cursor && "x" in cursor) {
      const x1 = points.sort((a: Point, b: Point): number => b.x - a.x).find((i: Point): boolean => i.x <= cursor["x"]);
      const x2 = points.sort((a: Point, b: Point): number => a.x - b.x).find((i: Point): boolean => i.x >= cursor["x"]);

      if (!x1 || !x2) {
        throw `Can't calculate double interpolation for x: '${cursor["x"]}'`;
      }

      const z1 = points.filter((i: Point): boolean => i.x == x1.x);
      const z2 = points.filter((i: Point): boolean => i.x == x2.x);

      const p = z2.map((curr, i): { x: number, y: number } => {
        const a = cursor["x"] - curr.x;
        const b = z1[i]["z"] - curr.z;
        const c = z1[i]["x"] - curr.x;
        
       return { x: (((a * b) / c) || 0) + curr.z, y: curr.y };
      });

      return single(p)({ x: cursor["z"] });
    }

    if ("z" in cursor && "y" in cursor) {
      const y1 = points.sort((a: Point, b: Point): number => b.y - a.y).find((i: Point): boolean => i.y <= cursor["y"]);
      const y2 = points.sort((a: Point, b: Point): number => a.y - b.y).find((i: Point): boolean => i.y >= cursor["y"]);

      if (!y1 || !y2) {
        throw `Can't calculate double interpolation for y: '${cursor["y"]}'`;
      }

      const z1 = points.filter((i: Point): boolean => i.y == y1.y);
      const z2 = points.filter((i: Point): boolean => i.y == y2.y);


      const p = z2.map((curr, i): { x: number, y: number } => {
        const a = cursor["y"] - curr.y;
        const b = z1[i]["z"] - curr.z;
        const c = z1[i]["y"] - curr.y;
        
       return { x: (((a * b) / c) || 0) + curr.z, y: curr.x };
      });

      return single(p)({ x: cursor["z"] });
    }

    throw "Can't calculate double interpolation, please provide correct search parameters";
  };
}
