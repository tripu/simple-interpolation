import { describe, it } from "mocha";
import { expect } from "chai";

import { single } from "./single";

describe("single.ts", () => {
  it("should do linear extrapolation", () => {
    const points = [{ x: 1, v: 1}, { x: 2, v: 2 }];

    expect(single(points)({ x: 1.5 })).to.equal(1.5);
    expect(single(points)({ x: 2 })).to.equal(2);

    expect(single(points)({ v: 1.5 })).to.equal(1.5);
    expect(single(points)({ v: 2 })).to.equal(2);
  });

  it("should do left extrapolation", () => {
    const points = [{ x: 1, v: 1}, { x: 2, v: 2 }];

    expect(single(points)({ x: -1.5 })).to.equal(-1.5);
    expect(single(points)({ v: -1.5 })).to.equal(-1.5);
  });

  it("should do right extrapolation", () => {
    const points = [{ x: 1, v: 1}, { x: 2, v: 2 }];

    expect(single(points)({ x: 3 })).to.equal(3);
    expect(single(points)({ v: 3 })).to.equal(3);
  });

  it("should throw interpolation error", () => {
    expect(() =>
      single([])({ x: 3 })
    ).to.throw(/Can't calculate single interpolation, please provide more points/);
    expect(() => 
      single([{ x: 1, v: 1}, { x: 2, v: 2 }])({ z: 3 })
    ).to.throw(/Can't calculate single interpolation, please provide correct martix data/);
  });
});
