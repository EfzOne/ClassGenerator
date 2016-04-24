var expect = require("chai").expect;
var assert = require("chai").assert;
var _ = require("lodash");
var debug = require("debug")("generator:test");

var config = require("../config.json");
var orgs = require("../data/organizations.json");
var classes = require("../data/classes.json");

describe("Class Generator", () => {
  describe("Organization", () => {
    _(orgs).forEach((org, org_name) => {
      it(org_name + " should be limited", () => {
        var person = 0;
        if(org.Selected) {
          _(org.classes).forEach((cls) => {
            person += classes[cls][org.course];
          });
        } else {
          _(org.classes).forEach((cls) => {
            person += classes[cls].count - classes[cls][org.course];
          });
        }
        try {
          expect(person).to.not.above(config.organization.max);
        } catch(err) {
          debug(org_name);
          throw(err);
        }
      });
    });
  });
  describe("Everyone", () => {
    it("should have classes", () => {
      var hasClass = _.mapValues(classes, () => {
        return _.zipObject(config.courses, _.map(config.courses, () => { return [false, false]; }));
      });
      _(orgs).forEach((org, org_name) => {
        _(org.classes).forEach((cls) => {
          hasClass[cls][org.course][org.Selected ? 1 : 0] = true;
        });
      });
      _(hasClass).forEach((courses) => {
        _(courses).forEach((course) => {
          assert.isTrue(course[0], "is attending");
          assert.isTrue(course[1], "is attending");
        });
      });
    });
    it("should not conflict", () => {
      var hasClass = _.mapValues(classes, () => {
        return _.zipObject(config.courses, _.map(config.courses, () => { return [false, false]; }));
      });
      _(orgs).forEach((org, org_name) => {
        _(org.classes).forEach((cls) => {
          assert.isFalse(hasClass[cls][org.course][org.Selected ? 1 : 0], "is not attending");
          hasClass[cls][org.course][org.Selected ? 1 : 0] = true;
        });
      });
    });
  });
});
