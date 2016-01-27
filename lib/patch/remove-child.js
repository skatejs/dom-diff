(function (global, factory) {
  if (typeof define === "function" && define.amd) {
    define(['exports', '../util/real-node'], factory);
  } else if (typeof exports !== "undefined") {
    factory(exports, require('../util/real-node'));
  } else {
    var mod = {
      exports: {}
    };
    factory(mod.exports, global.realNode);
    global.removeChild = mod.exports;
  }
})(this, function (exports, _realNode) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });

  exports.default = function (src, dst) {
    var realDst = (0, _realNode2.default)(dst);
    realDst.parentNode.removeChild(realDst);
  };

  var _realNode2 = _interopRequireDefault(_realNode);

  function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : {
      default: obj
    };
  }
});