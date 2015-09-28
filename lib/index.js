(function (global, factory) {
  if (typeof define === 'function' && define.amd) {
    define(['exports', 'module', './diff', './merge', './patch', './types'], factory);
  } else if (typeof exports !== 'undefined' && typeof module !== 'undefined') {
    factory(exports, module, require('./diff'), require('./merge'), require('./patch'), require('./types'));
  } else {
    var mod = {
      exports: {}
    };
    factory(mod.exports, mod, global.diff, global.merge, global.patch, global.types);
    global.index = mod.exports;
  }
})(this, function (exports, module, _diff, _merge, _patch, _types) {
  'use strict';

  function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

  var _diff2 = _interopRequireDefault(_diff);

  var _merge2 = _interopRequireDefault(_merge);

  var _patch2 = _interopRequireDefault(_patch);

  var _types2 = _interopRequireDefault(_types);

  module.exports = {
    diff: _diff2['default'],
    merge: _merge2['default'],
    patch: _patch2['default'],
    types: _types2['default']
  };
});