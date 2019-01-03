import { describe, it } from "mocha";

import { expect } from "chai";

import { double } from "./double";

describe("double.ts", () => {
  it("should do extrapolation 'z' variable by parameters equal matrix data", () => {
    const points = [{ x: 1, y: 1, z: 11 }, { x: 2, y: 1, z: 12 }, { x: 1, y: 2, z: 21 }, { x: 2, y: 2, z: 22 }];
    const params = { x: 2, y: 2 };

    expect(double(points)(params)).to.equal(22);
  });

  it("should do extrapolation 'z' variable by parameters between matrix data", () => {
    const points = [{ x: 1, y: 1, z: 11 }, { x: 2, y: 1, z: 12 }, { x: 1, y: 2, z: 21 }, { x: 2, y: 2, z: 22 }];
    const params = { x: 1.5, y: 1.5 };

    expect(double(points)(params)).to.equal(16.5);
  });

  it("should do extrapolation 'x' variable by parameters equal matrix data", () => {
    const points = [{ x: 1, y: 1, z: 11 }, { x: 2, y: 1, z: 12 }, { x: 1, y: 2, z: 21 }, { x: 2, y: 2, z: 22 }];
    const params = { y: 2, z: 22 };

    expect(double(points)(params)).to.equal(2);
  });

  it("should do extrapolation 'x' variable by parameters between matrix data", () => {
    const points = [{ x: 1, y: 1, z: 11 }, { x: 2, y: 1, z: 12 }, { x: 1, y: 2, z: 21 }, { x: 2, y: 2, z: 22 }];
    const params = { y: 1.5, z: 16.5 };

    expect(double(points)(params)).to.equal(1.5);
  });

  it("should do extrapolation 'y' variable by parameters equal matrix data", () => {
    const points = [{ x: 1, y: 1, z: 11 }, { x: 2, y: 1, z: 12 }, { x: 1, y: 2, z: 21 }, { x: 2, y: 2, z: 22 }];
    const params = { x: 2, z: 22 };

    expect(double(points)(params)).to.equal(2);
  });

  it("should do extrapolation 'y' variable by parameters between matrix data", () => {
    const points = [{ x: 1, y: 1, z: 11 }, { x: 2, y: 1, z: 12 }, { x: 1, y: 2, z: 21 }, { x: 2, y: 2, z: 22 }];
    const params = { x: 1.5, z: 16.5 };

    expect(double(points)(params)).to.equal(1.5);
  });

  it("should throw extrapolation error if incorrect matrix data", () => {
    const points = [{ x: 1, y: 1, z: 11 }, { x: 2, y: 1, z: 12 }, { x: 1, y: 2, z: 21 }];
    const params = { x: 1.5, y: 1.5 };

    expect(() => double(points)(params)).to.throw(/Can't calculate double interpolation, please provide more points/);
  });

  it("should throw extrapolation error if incorrect value of 'x' variable, calculation by 'x', 'y'", () => {
    const points = [{ x: 1, y: 1, z: 11 }, { x: 2, y: 1, z: 12 }, { x: 1, y: 2, z: 21 }, { x: 2, y: 2, z: 22 }];
    const params = { x: -1.5, y: 1 };

    expect(() => double(points)(params)).to.throw(/Can't calculate double interpolation for x: '-1.5'/);
  });

  it("should throw extrapolation error if incorrect value of 'x' variable, calculation by 'x', 'z'", () => {
    const points = [{ x: 1, y: 1, z: 11 }, { x: 2, y: 1, z: 12 }, { x: 1, y: 2, z: 21 }, { x: 2, y: 2, z: 22 }];
    const params = { x: -1.5, z: 16.5 };

    expect(() => double(points)(params)).to.throw(/Can't calculate double interpolation/);
  });

  it("should throw extrapolation error if incorrect value of 'y' variable, calculation by 'y', 'x'", () => {
    const points = [{ x: 1, y: 1, z: 11 }, { x: 2, y: 1, z: 12 }, { x: 1, y: 2, z: 21 }, { x: 2, y: 2, z: 22 }];
    const params = { x: 1, y: -1.5 };

    expect(() => double(points)(params)).to.throw(/Can't calculate double interpolation for y: '-1.5'/);
  });

  it("should throw extrapolation error if incorrect value of 'y' variable, calculation by 'y', 'z'", () => {
    const points = [{ x: 1, y: 1, z: 11 }, { x: 2, y: 1, z: 12 }, { x: 1, y: 2, z: 21 }, { x: 2, y: 2, z: 22 }];
    const params = { y: -1.5, z: 16.5 };

    expect(() => double(points)(params)).to.throw(/Can't calculate double interpolation/);
  });
});
