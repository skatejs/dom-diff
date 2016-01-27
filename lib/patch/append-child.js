(function (global, factory) {
  if (typeof define === "function" && define.amd) {
    define(['module', 'exports', '../util/real-node', '../vdom/dom'], factory);
  } else if (typeof exports !== "undefined") {
    factory(module, exports, require('../util/real-node'), require('../vdom/dom'));
  } else {
    var mod = {
      exports: {}
    };
    factory(mod, mod.exports, global.realNode, global.dom);
    global.appendChild = mod.exports;
  }
})(this, function (module, exports, _realNode, _dom) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });

  exports.default = function (src, dst) {
    (0, _realNode2.default)(src).appendChild((0, _dom2.default)(dst));
  };

  var _realNode2 = _interopRequireDefault(_realNode);

  var _dom2 = _interopRequireDefault(_dom);

  function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : {
      default: obj
    };
  }

  module.exports = exports['default'];
});