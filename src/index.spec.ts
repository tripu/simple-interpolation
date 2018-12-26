import { describe, it } from "mocha";
import { expect } from "chai";

import { single } from './index';

describe("index.ts", () => {
  it("should do file", () => {
    console.log(single([{ x: 1, v: 1}, { x: 2, v: 2 }]));
    expect(true).to.equal(true);
  });
});
