(function (global, factory) {
  if (typeof define === 'function' && define.amd) {
    define(['exports', 'module', 'es6-weak-map'], factory);
  } else if (typeof exports !== 'undefined' && typeof module !== 'undefined') {
    factory(exports, module, require('es6-weak-map'));
  } else {
    var mod = {
      exports: {}
    };
    factory(mod.exports, mod, global.WeakMap);
    global.realNodeMap = mod.exports;
  }
})(this, function (exports, module, _es6WeakMap) {
  'use strict';

  function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

  var _WeakMap = _interopRequireDefault(_es6WeakMap);

  module.exports = new _WeakMap['default']();
});