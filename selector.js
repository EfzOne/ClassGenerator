var _ = require("lodash");

module.exports = (courses, config) => {
  var __sum = 0;
  var __classes = [];
  var __result = [];
  _(courses).forEach((count, cls) => {
    if(__sum + count > config.max) {
      __result.push(__classes);
      __classes = [];
      __sum = 0;
    }
    __sum += count;
    __classes.push(cls);
  });
  if(!_.isEmpty(__classes)) {
    __result.push(__classes);
  }
  return __result;
};
