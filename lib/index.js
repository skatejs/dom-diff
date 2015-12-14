(function (global, factory) {
  if (typeof define === 'function' && define.amd) {
    define(['exports', 'module', './diff', './merge', './patch', './render', './types', './vdom'], factory);
  } else if (typeof exports !== 'undefined' && typeof module !== 'undefined') {
    factory(exports, module, require('./diff'), require('./merge'), require('./patch'), require('./render'), require('./types'), require('./vdom'));
  } else {
    var mod = {
      exports: {}
    };
    factory(mod.exports, mod, global.diff, global.merge, global.patch, global.render, global.types, global.vdom);
    global.index = mod.exports;
  }
})(this, function (exports, module, _diff, _merge, _patch, _render, _types, _vdom) {
  'use strict';

  function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

  var _diff2 = _interopRequireDefault(_diff);

  var _merge2 = _interopRequireDefault(_merge);

  var _patch2 = _interopRequireDefault(_patch);

  var _render2 = _interopRequireDefault(_render);

  var _types2 = _interopRequireDefault(_types);

  var _vdom2 = _interopRequireDefault(_vdom);

  module.exports = {
    diff: _diff2['default'],
    merge: _merge2['default'],
    patch: _patch2['default'],
    render: _render2['default'],
    types: _types2['default'],
    vdom: _vdom2['default']
  };
});