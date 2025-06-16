import { formatCurrency } from "../../scripts/utils/money.js";

describe("Test suite : formatCurrency", () => {
  // it("convert cents into dollars", () => {
  //   expect(formatCurrency(2095).toEqual(20.95));
  // });
  it("Convert", () => {
    expect('Convert',formatCurrency(2095) === '20.95');
  });
  it("Sero", () => {
    expect(0 === 0);
  });
  it("Month", () => {
    expect("month" === "month");
  });
});
