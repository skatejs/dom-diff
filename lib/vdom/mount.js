(function (global, factory) {
  if (typeof define === 'function' && define.amd) {
    define(['exports', 'module', './dom'], factory);
  } else if (typeof exports !== 'undefined' && typeof module !== 'undefined') {
    factory(exports, module, require('./dom'));
  } else {
    var mod = {
      exports: {}
    };
    factory(mod.exports, mod, global.dom);
    global.mount = mod.exports;
  }
})(this, function (exports, module, _dom) {
  'use strict';

  function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

  var _dom2 = _interopRequireDefault(_dom);

  module.exports = function (elem, tree) {
    var content = elem;
    while (content.firstChild) {
      var first = content.firstChild;
      first.parentNode.removeChild(first);
    }
    content.appendChild((0, _dom2['default'])(tree));
  };
});