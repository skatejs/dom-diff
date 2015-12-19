(function (global, factory) {
  if (typeof define === 'function' && define.amd) {
    define(['exports', 'module', './attributes', './events'], factory);
  } else if (typeof exports !== 'undefined' && typeof module !== 'undefined') {
    factory(exports, module, require('./attributes'), require('./events'));
  } else {
    var mod = {
      exports: {}
    };
    factory(mod.exports, mod, global.compareAttributes, global.compareEvents);
    global.element = mod.exports;
  }
})(this, function (exports, module, _attributes, _events) {
  'use strict';

  function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

  var _compareAttributes = _interopRequireDefault(_attributes);

  var _compareEvents = _interopRequireDefault(_events);

  module.exports = function (src, dst) {
    if (src.tagName === dst.tagName) {
      return (0, _compareAttributes['default'])(src, dst).concat((0, _compareEvents['default'])(src, dst));
    }
  };
});