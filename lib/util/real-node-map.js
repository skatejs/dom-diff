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
    global.realNodeMap = mod.exports;
  }
})(this, function (module, exports, _weakMap) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });

  var _weakMap2 = _interopRequireDefault(_weakMap);

  function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : {
      default: obj
    };
  }

  exports.default = new _weakMap2.default();
  module.exports = exports['default'];
});