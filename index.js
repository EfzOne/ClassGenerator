var fs = require('fs');
var _ = require("lodash");
var debug = require("debug")("generator");

var selector = require("./selector");

var config = require("./config.json");
var classes = require("./data/classes.json");
var courses = require("./data/courses.json");
var students = require("./data/students.json");


var dat_classes = [];

var organizations = {};

_(config.courses).forEach((course) => {
  var course_selected = _.mapValues(classes, (v, k) => {
    return v[course];
  });
  var course_unselected = _.mapValues(classes, (v, k) => {
    return v.count - v[course];
  });
  cnt = 1;
  _(selector(course_selected, config.organization)).forEach((cls) => {
    organizations[course + "-adv-" + cnt] = {
      "course": course,
      "Selected": true,
      "classes": cls
    };
    cnt++;
  });
  cnt = 1;
  _(selector(course_unselected, config.organization)).forEach((cls) => {
    organizations[course + "-std-" + cnt] = {
      "course": course,
      "Selected": false,
      "classes": cls
    };
    cnt++;
  });
});

debug(organizations);

fs.writeFileSync('data/organizations.json', JSON.stringify(organizations));
