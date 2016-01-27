(function (global, factory) {
  if (typeof define === "function" && define.amd) {
    define(['exports', './diff', './patch'], factory);
  } else if (typeof exports !== "undefined") {
    factory(exports, require('./diff'), require('./patch'));
  } else {
    var mod = {
      exports: {}
    };
    factory(mod.exports, global.diff, global.patch);
    global.merge = mod.exports;
  }
})(this, function (exports, _diff, _patch) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });

  exports.default = function (opts) {
    var inst = (0, _diff2.default)(opts);
    (0, _patch2.default)(inst);
    return inst;
  };

  var _diff2 = _interopRequireDefault(_diff);

  var _patch2 = _interopRequireDefault(_patch);

  function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : {
      default: obj
    };
  }
});