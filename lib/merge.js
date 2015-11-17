(function (global, factory) {
  if (typeof define === 'function' && define.amd) {
    define(['exports', 'module', './diff', './patch'], factory);
  } else if (typeof exports !== 'undefined' && typeof module !== 'undefined') {
    factory(exports, module, require('./diff'), require('./patch'));
  } else {
    var mod = {
      exports: {}
    };
    factory(mod.exports, mod, global.diff, global.patch);
    global.merge = mod.exports;
  }
})(this, function (exports, module, _diff, _patch) {
  'use strict';

  function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

  var _diff2 = _interopRequireDefault(_diff);

  var _patch2 = _interopRequireDefault(_patch);

  module.exports = function (opts) {
    var inst = (0, _diff2['default'])(opts);
    (0, _patch2['default'])(inst);
    return inst;
  };
});