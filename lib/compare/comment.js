(function (global, factory) {
  if (typeof define === "function" && define.amd) {
    define(['exports', './text'], factory);
  } else if (typeof exports !== "undefined") {
    factory(exports, require('./text'));
  } else {
    var mod = {
      exports: {}
    };
    factory(mod.exports, global.text);
    global.comment = mod.exports;
  }
})(this, function (exports, _text) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });

  var _text2 = _interopRequireDefault(_text);

  function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : {
      default: obj
    };
  }

  exports.default = _text2.default;
});