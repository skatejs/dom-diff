(function (global, factory) {
  if (typeof define === 'function' && define.amd) {
    define(['exports', 'module', '../util/real-node'], factory);
  } else if (typeof exports !== 'undefined' && typeof module !== 'undefined') {
    factory(exports, module, require('../util/real-node'));
  } else {
    var mod = {
      exports: {}
    };
    factory(mod.exports, mod, global.realNode);
    global.setAttribute = mod.exports;
  }
})(this, function (exports, module, _utilRealNode) {
  'use strict';

  function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

  var _realNode = _interopRequireDefault(_utilRealNode);

  module.exports = function (src, dst, data) {
    var node = (0, _realNode['default'])(src);
    node.setAttribute(data.name, data.value);
  };
});