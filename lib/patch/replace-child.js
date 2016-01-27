(function (global, factory) {
  if (typeof define === "function" && define.amd) {
    define(['module', 'exports', '../vdom/dom', '../util/real-node'], factory);
  } else if (typeof exports !== "undefined") {
    factory(module, exports, require('../vdom/dom'), require('../util/real-node'));
  } else {
    var mod = {
      exports: {}
    };
    factory(mod, mod.exports, global.dom, global.realNode);
    global.replaceChild = mod.exports;
  }
})(this, function (module, exports, _dom, _realNode) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });

  exports.default = function (src, dst) {
    var realSrc = (0, _realNode2.default)(src);
    realSrc && realSrc.parentNode && realSrc.parentNode.replaceChild((0, _dom2.default)(dst), realSrc);
  };

  var _dom2 = _interopRequireDefault(_dom);

  var _realNode2 = _interopRequireDefault(_realNode);

  function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : {
      default: obj
    };
  }

  module.exports = exports['default'];
});