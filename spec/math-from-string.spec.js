/**
 * @author Leandro Silva
 * @copyright 2018 Leandro Silva (http://grafluxe.com)
 * @license MIT
 */

/* global describe, it, expect */

let mathFromString = require("../src/math-from-string");

describe("Equation should pass as", () => {
  it("123.678+0.01 = 123.688", () => {
    expect(mathFromString("123.678+0.01")).toBe(123.688);
  });

  it("123.678+0.1 = 123.77799999999999", () => {
    expect(mathFromString("123.678+0.1")).toBe(123.77799999999999);
  });

  it("(2+8)*2+(100.34-10+(2+5.4)) = 117.74000000000001", () => {
    expect(mathFromString("(2+8)*2+(100.34-10+(2+5.4))")).toBe(117.74000000000001);
  });

  it("(2*2)*3*(4*4) = 192", () => {
    expect(mathFromString("(2*2)*3*(4*4)")).toBe(192);
  });

  it("(2*8)*2*(100.34*10*(2*5.4)) = 346775.04000000004", () => {
    expect(mathFromString("(2*8)*2*(100.34*10*(2*5.4))")).toBe(346775.04000000004);
  });

  it("2*-3 = -6.0", () => {
    expect(mathFromString("2*-3")).toBe(-6.0);
  });

  it("2**3 = 8.0", () => {
    expect(mathFromString("2**3")).toBe(8.0);
  });

  it("(2+8)*2 = 20.0", () => {
    expect(mathFromString("(2+8)*2")).toBe(20.0);
  });

  it("-2+8 = 6.0", () => {
    expect(mathFromString("-2+8")).toBe(6.0);
  });

  it("2+-8 = -6.0", () => {
    expect(mathFromString("2+-8")).toBe(-6.0);
  });

  it("-2+-8 = -10.0", () => {
    expect(mathFromString("-2+-8")).toBe(-10.0);
  });

});

describe("Equation should fail as", () => {
  it("(2+8)*2+(100.3.4-10+(2+5.4)) is an invalid equation", () => {
    expect(() => mathFromString("(2+8)*2+(100.3.4-10+(2+5.4))")).toThrow(new Error("The value \"100.3.4\" is not a valid number."));
  });

  it("2+8.0.0 is an invalid equation", () => {
      expect(() => mathFromString("2+8.0.0")).toThrow(new Error("The value \"8.0.0\" is not a valid number."));
  });

  it("+2+8 is an invalid equation", () => {
      expect(() => mathFromString("+2+8")).toThrow(new Error("The string at/near \"+2+8\" is malformed."));
  });

  it("/2+8 is an invalid equation", () => {
      expect(() => mathFromString("/2+8")).toThrow(new Error("The string at/near \"/2+8\" is malformed."));
  });

  it("*2+8 is an invalid equation", () => {
      expect(() => mathFromString("*2+8")).toThrow(new Error("The string at/near \"*2+8\" is malformed."));
  });

  it("2++8 is an invalid equation", () => {
      expect(() => mathFromString("2++8")).toThrow(new Error("The string at/near \"2++8\" has a malformed operator."));
  });

  it("2+/8 is an invalid equation", () => {
      expect(() => mathFromString("2+/8")).toThrow(new Error("The string at/near \"2+/8\" has a malformed operator."));
  });

  it("2+*8 is an invalid equation", () => {
      expect(() => mathFromString("2+*8")).toThrow(new Error("The string at/near \"2+*8\" has a malformed operator."));
  });

  it("1+(1) is an invalid equation", () => {
      expect(() => mathFromString("1+(1)")).toThrow(new Error("The string at/near \"1\" is malformed."));
  });
});
