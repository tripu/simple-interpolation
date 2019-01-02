import { describe, it } from "mocha";
import { expect } from "chai";

import { single } from "./single";

describe("single.ts", () => {
  it("should do linear interpolated", () => {
    expect(single([{ x: 1, v: 1}, { x: 2, v: 2 }])({ x: 1.5 })).to.equal(1.5);
    expect(single([{ x: 1, v: 1}, { x: 2, v: 2 }])({ x: 2 })).to.equal(2);

    expect(single([{ x: 1, v: 1}, { x: 2, v: 2 }])({ v: 1.5 })).to.equal(1.5);
    expect(single([{ x: 1, v: 1}, { x: 2, v: 2 }])({ v: 2 })).to.equal(2);
  });

  it("should do left extrapolated", () => {
    expect(single([{ x: 1, v: 1}, { x: 2, v: 2 }])({ x: -1.5 })).to.equal(-1.5);
    expect(single([{ x: 1, v: 1}, { x: 2, v: 2 }])({ v: -1.5 })).to.equal(-1.5);
  });

  it("should do right extrapolated", () => {
    expect(single([{ x: 1, v: 1}, { x: 2, v: 2 }])({ x: 3 })).to.equal(3);
    expect(single([{ x: 1, v: 1}, { x: 2, v: 2 }])({ v: 3 })).to.equal(3);
  });

  it("should throw interpolation error", () => {
    expect(() => single([])({ x: 3 })).to.throw(/Can't calculate single interpolation, please provide points/);
    expect(() => single([{ x: 1, v: 1}, { x: 2, v: 2 }])({ z: 3 })).to.throw(/Can't calculate single interpolation, please provide correct search data/);
  });
});
