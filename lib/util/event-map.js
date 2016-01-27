(function (global, factory) {
  if (typeof define === "function" && define.amd) {
    define(['module', 'exports', './weak-map'], factory);
  } else if (typeof exports !== "undefined") {
    factory(module, exports, require('./weak-map'));
  } else {
    var mod = {
      exports: {}
    };
    factory(mod, mod.exports, global.weakMap);
    global.eventMap = mod.exports;
  }
})(this, function (module, exports, _weakMap) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });

  exports.default = function (elem) {
    var events = map.get(elem);
    events || map.set(elem, events = {});
    return events;
  };

  var _weakMap2 = _interopRequireDefault(_weakMap);

  function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : {
      default: obj
    };
  }

  var map = new _weakMap2.default();
  module.exports = exports['default'];
});