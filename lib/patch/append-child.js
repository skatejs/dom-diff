(function (global, factory) {
  if (typeof define === 'function' && define.amd) {
    define(['exports', 'module', '../util/real-node', '../vdom/dom'], factory);
  } else if (typeof exports !== 'undefined' && typeof module !== 'undefined') {
    factory(exports, module, require('../util/real-node'), require('../vdom/dom'));
  } else {
    var mod = {
      exports: {}
    };
    factory(mod.exports, mod, global.realNode, global.dom);
    global.appendChild = mod.exports;
  }
})(this, function (exports, module, _utilRealNode, _vdomDom) {
  'use strict';

  function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

  var _realNode = _interopRequireDefault(_utilRealNode);

  var _dom = _interopRequireDefault(_vdomDom);

  module.exports = function (src, dst) {
    (0, _realNode['default'])(src).appendChild((0, _dom['default'])(dst));
  };
});