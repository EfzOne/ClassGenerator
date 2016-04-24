var expect = require("chai").expect;
var _ = require("lodash");
var debug = require("debug")("generator:test");

var selector = require("../selector");

var config = require("../config.json");

describe("Class Generator", () => {
  describe("Selector", () => {
    it("should be limited", () => {
      expect(selector({
        "1": 5,
        "2": 3,
        "3": 4
      }, {"max": 11})).to.eql([["1", "2"], ["3"]]);
    });
    it("should select all", () => {
      expect(selector({
        "1": 5,
        "2": 3,
        "3": 4
      }, {"max": 12})).to.eql([["1", "2", "3"]]);
    });
  });
});
