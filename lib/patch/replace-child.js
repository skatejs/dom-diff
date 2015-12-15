(function (global, factory) {
  if (typeof define === 'function' && define.amd) {
    define(['exports', 'module', '../vdom/dom', '../util/real-node'], factory);
  } else if (typeof exports !== 'undefined' && typeof module !== 'undefined') {
    factory(exports, module, require('../vdom/dom'), require('../util/real-node'));
  } else {
    var mod = {
      exports: {}
    };
    factory(mod.exports, mod, global.dom, global.realNode);
    global.replaceChild = mod.exports;
  }
})(this, function (exports, module, _vdomDom, _utilRealNode) {
  'use strict';

  function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

  var _dom = _interopRequireDefault(_vdomDom);

  var _realNode = _interopRequireDefault(_utilRealNode);

  module.exports = function (src, dst) {
    var realNodeSrc = (0, _realNode['default'])(src);
    realNodeSrc && realNodeSrc.parentNode && realNodeSrc.parentNode.replaceChild((0, _dom['default'])(dst), realNodeSrc);
  };
});