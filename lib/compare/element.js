(function (global, factory) {
  if (typeof define === 'function' && define.amd) {
    define(['exports', 'module', './attributes', './events', './properties'], factory);
  } else if (typeof exports !== 'undefined' && typeof module !== 'undefined') {
    factory(exports, module, require('./attributes'), require('./events'), require('./properties'));
  } else {
    var mod = {
      exports: {}
    };
    factory(mod.exports, mod, global.compareAttributes, global.compareEvents, global.compareProperties);
    global.element = mod.exports;
  }
})(this, function (exports, module, _attributes, _events, _properties) {
  'use strict';

  function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

  var _compareAttributes = _interopRequireDefault(_attributes);

  var _compareEvents = _interopRequireDefault(_events);

  var _compareProperties = _interopRequireDefault(_properties);

  module.exports = function (src, dst) {
    if (src.tagName === dst.tagName) {
      return (0, _compareAttributes['default'])(src, dst).concat((0, _compareEvents['default'])(src, dst)).concat((0, _compareProperties['default'])(src, dst));
    }
  };
});