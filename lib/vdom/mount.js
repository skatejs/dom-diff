(function (global, factory) {
  if (typeof define === 'function' && define.amd) {
    define(['exports', 'module', '../util/content-node', './dom'], factory);
  } else if (typeof exports !== 'undefined' && typeof module !== 'undefined') {
    factory(exports, module, require('../util/content-node'), require('./dom'));
  } else {
    var mod = {
      exports: {}
    };
    factory(mod.exports, mod, global.contentNode, global.dom);
    global.mount = mod.exports;
  }
})(this, function (exports, module, _utilContentNode, _dom) {
  'use strict';

  function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

  var _contentNode = _interopRequireDefault(_utilContentNode);

  var _dom2 = _interopRequireDefault(_dom);

  module.exports = function (elem, tree) {
    var content = (0, _contentNode['default'])(elem) || elem;
    while (content.firstChild) {
      content.firstChild.remove();
    }
    content.appendChild((0, _dom2['default'])(tree));
  };
});