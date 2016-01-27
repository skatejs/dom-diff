(function (global, factory) {
  if (typeof define === "function" && define.amd) {
    define(['exports', './attributes', './events'], factory);
  } else if (typeof exports !== "undefined") {
    factory(exports, require('./attributes'), require('./events'));
  } else {
    var mod = {
      exports: {}
    };
    factory(mod.exports, global.attributes, global.events);
    global.element = mod.exports;
  }
})(this, function (exports, _attributes, _events) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });

  exports.default = function (src, dst) {
    if (src.tagName === dst.tagName) {
      return (0, _attributes2.default)(src, dst).concat((0, _events2.default)(src, dst));
    }
  };

  var _attributes2 = _interopRequireDefault(_attributes);

  var _events2 = _interopRequireDefault(_events);

  function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : {
      default: obj
    };
  }
});