(function (global, factory) {
  if (typeof define === 'function' && define.amd) {
    define(['exports', 'module', '../util/content-node'], factory);
  } else if (typeof exports !== 'undefined' && typeof module !== 'undefined') {
    factory(exports, module, require('../util/content-node'));
  } else {
    var mod = {
      exports: {}
    };
    factory(mod.exports, mod, global.contentNode);
    global.textContent = mod.exports;
  }
})(this, function (exports, module, _utilContentNode) {
  'use strict';

  function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

  var _contentNode = _interopRequireDefault(_utilContentNode);

  module.exports = function (src, dst) {
    (0, _contentNode['default'])(src).textContent = dst.textContent;
  };
});