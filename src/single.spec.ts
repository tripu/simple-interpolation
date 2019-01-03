import { describe, it } from "mocha";

import { expect } from "chai";

import { single } from "./single";

describe("single.ts", () => {
  it("should do extrapolation 'x' variable by parameters equal matrix data", () => {
    const points = [{ x: 1, y: 1}, { x: 2, y: 2 }];
    const params = { x: 2 };

    expect(single(points)(params)).to.equal(2);
  });

  it("should do extrapolation 'x' variable by parameters between matrix data", () => {
    const points = [{ x: 1, y: 1}, { x: 2, y: 2 }];
    const params = { x: 1.5 };

    expect(single(points)(params)).to.equal(1.5);
  });

  it("should do extrapolation 'y' variable by parameters equal matrix data", () => {
    const points = [{ x: 1, y: 1}, { x: 2, y: 2 }];
    const params = { y: 2 };

    expect(single(points)(params)).to.equal(2);
  });

  it("should do extrapolation 'y' variable by parameters between matrix data", () => {
    const points = [{ x: 1, y: 1}, { x: 2, y: 2 }];
    const params = { y: 1.5 };

    expect(single(points)(params)).to.equal(1.5);
  });

  it("should do left extrapolation 'x' variable", () => {
    const points = [{ x: 1, y: 1}, { x: 2, y: 2 }];
    const params = { x: -1.5 };

    expect(single(points)(params)).to.equal(-1.5);
  });

  it("should do left extrapolation 'y' variable", () => {
    const points = [{ x: 1, y: 1}, { x: 2, y: 2 }];
    const params = { y: -1.5 };

    expect(single(points)(params)).to.equal(-1.5);
  });

  it("should do right extrapolation 'x' variable", () => {
    const points = [{ x: 1, y: 1}, { x: 2, y: 2 }];
    const params = { x: 3 };

    expect(single(points)(params)).to.equal(3);
  });

  it("should do right extrapolation 'y' variable", () => {
    const points = [{ x: 1, y: 1}, { x: 2, y: 2 }];
    const params = { y: 3 };

    expect(single(points)(params)).to.equal(3);
  });

  it("should throw extrapolation error if incorrect matrix data", () => {
    const points = [{ x: 1, y: 1}];
    const params = { x: 1.5 };

    expect(() => single(points)(params)).to.throw(/Can't calculate single interpolation, please provide more points/);
  });
});
