import { describe, it } from "mocha";
import { expect } from "chai";

import { double } from "./double";

describe("double.ts", () => {
  it("should do linear extrapolation", () => {
    const points = [{ x: 1, y: 1, v: 11 }, { x: 2, y: 1, v: 12 }, { x: 1, y: 2, v: 21 }, { x: 2, y: 2, v: 22 }];

    expect(double(points)({ x: 1.5, y: 1.5 })).to.equal(16.5);
    expect(double(points)({ x: 2, y: 2 })).to.equal(22);

    // expect(double(points)({ x: 1.5, y: 1.5 })).to.equal(16.5);
    // expect(double(points)({ x: 2, y: 2 })).to.equal(22);

    // expect(double(points)({ x: 1.5, y: 1.5 })).to.equal(16.5);
    // expect(double(points)({ x: 2, y: 2 })).to.equal(22);
  });

  it("should do left extrapolation", () => {
    const points = [{ x: 1, y: 1, v: 11 }, { x: 2, y: 1, v: 12 }, { x: 1, y: 2, v: 21 }, { x: 2, y: 2, v: 22 }];

    expect(double(points)({ x: -1.5, y: -1.5 })).to.equal(16.5);
    expect(double(points)({ x: 3, y: 3 })).to.equal(22);

    // expect(single([{ x: 1, v: 1}, { x: 2, v: 2 }])({ x: -1.5 })).to.equal(-1.5);
    // expect(single([{ x: 1, v: 1}, { x: 2, v: 2 }])({ v: -1.5 })).to.equal(-1.5);
  });

  it("should do right extrapolation", () => {
    // expect(single([{ x: 1, v: 1}, { x: 2, v: 2 }])({ x: 3 })).to.equal(3);
    // expect(single([{ x: 1, v: 1}, { x: 2, v: 2 }])({ v: 3 })).to.equal(3);
  });

  it("should throw interpolation error", () => {
    // expect(() => single([])({ x: 3 })).to.throw(/Can't calculate single interpolation, please provide points/);
    // expect(() => single([{ x: 1, v: 1}, { x: 2, v: 2 }])({ z: 3 })).to.throw(/Can't calculate single interpolation, please provide correct search data/);
  });
});
