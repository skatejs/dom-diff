(function (global, factory) {
  if (typeof define === "function" && define.amd) {
    define(['exports', '../util/accessor', '../util/real-node'], factory);
  } else if (typeof exports !== "undefined") {
    factory(exports, require('../util/accessor'), require('../util/real-node'));
  } else {
    var mod = {
      exports: {}
    };
    factory(mod.exports, global.accessor, global.realNode);
    global.setAttribute = mod.exports;
  }
})(this, function (exports, _accessor, _realNode) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });

  exports.default = function (src, dst, data) {
    (0, _accessor.setAccessor)((0, _realNode2.default)(src), data.name, data.value);
  };

  var _realNode2 = _interopRequireDefault(_realNode);

  function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : {
      default: obj
    };
  }
});