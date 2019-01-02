import { describe, it } from "mocha";
import { expect } from "chai";

import * as obj from "./index";

describe("index.ts", () => {
  it("should file contains `single` method", () => {
    expect(obj).to.have.property('single');
  });

  it("should file contains `double` method", () => {
    expect(obj).to.have.property('double');
  });
});
