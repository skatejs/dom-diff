(function (global, factory) {
  if (typeof define === 'function' && define.amd) {
    define(['exports', 'module', './element', './text', './comment'], factory);
  } else if (typeof exports !== 'undefined' && typeof module !== 'undefined') {
    factory(exports, module, require('./element'), require('./text'), require('./comment'));
  } else {
    var mod = {
      exports: {}
    };
    factory(mod.exports, mod, global.compareElement, global.compareText, global.compareComment);
    global.node = mod.exports;
  }
})(this, function (exports, module, _element, _text, _comment) {
  'use strict';

  function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

  var _compareElement = _interopRequireDefault(_element);

  var _compareText = _interopRequireDefault(_text);

  var _compareComment = _interopRequireDefault(_comment);

  var NODE_COMMENT = 8;
  var NODE_ELEMENT = 1;
  var NODE_TEXT = 3;

  module.exports = function (src, dst) {
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
      return (0, _compareElement['default'])(src, dst);
    } else if (dstType === NODE_TEXT) {
      return (0, _compareText['default'])(src, dst);
    } else if (dstType === NODE_COMMENT) {
      return (0, _compareComment['default'])(src, dst);
    }
  };
});