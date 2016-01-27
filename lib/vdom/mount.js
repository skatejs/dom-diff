(function (global, factory) {
  if (typeof define === "function" && define.amd) {
    define(['module', 'exports', './dom'], factory);
  } else if (typeof exports !== "undefined") {
    factory(module, exports, require('./dom'));
  } else {
    var mod = {
      exports: {}
    };
    factory(mod, mod.exports, global.dom);
    global.mount = mod.exports;
  }
})(this, function (module, exports, _dom) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });

  exports.default = function (elem, tree) {
    removeChildNodes(elem);
    elem.appendChild((0, _dom2.default)(tree));
  };

  var _dom2 = _interopRequireDefault(_dom);

  function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : {
      default: obj
    };
  }

  function removeChildNodes(elem) {
    while (elem.firstChild) {
      var first = elem.firstChild;
      first.parentNode.removeChild(first);
    }
  }

  module.exports = exports['default'];
});