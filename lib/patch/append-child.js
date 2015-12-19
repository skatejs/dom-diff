(function (global, factory) {
  if (typeof define === 'function' && define.amd) {
    define(['exports', 'module', '../util/content-node', '../vdom/dom'], factory);
  } else if (typeof exports !== 'undefined' && typeof module !== 'undefined') {
    factory(exports, module, require('../util/content-node'), require('../vdom/dom'));
  } else {
    var mod = {
      exports: {}
    };
    factory(mod.exports, mod, global.contentNode, global.dom);
    global.appendChild = mod.exports;
  }
})(this, function (exports, module, _utilContentNode, _vdomDom) {
  'use strict';

  function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

  var _contentNode = _interopRequireDefault(_utilContentNode);

  var _dom = _interopRequireDefault(_vdomDom);

  module.exports = function (src, dst) {
    (0, _contentNode['default'])(src).appendChild((0, _dom['default'])(dst));
  };
});