(function (global, factory) {
  if (typeof define === 'function' && define.amd) {
    define(['exports', 'module', './text'], factory);
  } else if (typeof exports !== 'undefined' && typeof module !== 'undefined') {
    factory(exports, module, require('./text'));
  } else {
    var mod = {
      exports: {}
    };
    factory(mod.exports, mod, global.text);
    global.comment = mod.exports;
  }
})(this, function (exports, module, _text) {
  'use strict';

  function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

  var _text2 = _interopRequireDefault(_text);

  module.exports = _text2['default'];
});