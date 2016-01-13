(function (global, factory) {
  if (typeof define === 'function' && define.amd) {
    define(['exports', 'module', 'weakmap'], factory);
  } else if (typeof exports !== 'undefined' && typeof module !== 'undefined') {
    factory(exports, module, require('weakmap'));
  } else {
    var mod = {
      exports: {}
    };
    factory(mod.exports, mod, global.WeakMap);
    global.realNodeMap = mod.exports;
  }
})(this, function (exports, module, _weakmap) {
  'use strict';

  function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

  var _WeakMap = _interopRequireDefault(_weakmap);

  module.exports = new _WeakMap['default']();
});