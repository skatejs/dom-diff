(function (global, factory) {
  if (typeof define === "function" && define.amd) {
    define(['exports', './element', './text', './comment'], factory);
  } else if (typeof exports !== "undefined") {
    factory(exports, require('./element'), require('./text'), require('./comment'));
  } else {
    var mod = {
      exports: {}
    };
    factory(mod.exports, global.element, global.text, global.comment);
    global.node = mod.exports;
  }
})(this, function (exports, _element, _text, _comment) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });

  exports.default = function (src, dst) {
    var dstType = undefined,
        srcType = undefined;

    if (!dst || !src) {
      return;
    }

    dstType = dst.nodeType;
    srcType = src.nodeType;

    if (dstType !== srcType) {
      return;
    } else if (dstType === NODE_ELEMENT) {
      return (0, _element2.default)(src, dst);
    } else if (dstType === NODE_TEXT) {
      return (0, _text2.default)(src, dst);
    } else if (dstType === NODE_COMMENT) {
      return (0, _comment2.default)(src, dst);
    }
  };

  var _element2 = _interopRequireDefault(_element);

  var _text2 = _interopRequireDefault(_text);

  var _comment2 = _interopRequireDefault(_comment);

  function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : {
      default: obj
    };
  }

  var NODE_COMMENT = 8;
  var NODE_ELEMENT = 1;
  var NODE_TEXT = 3;
});