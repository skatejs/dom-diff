(function (global, factory) {
  if (typeof define === 'function' && define.amd) {
    define(['exports', 'module', '../constants', './element', './text', './comment'], factory);
  } else if (typeof exports !== 'undefined' && typeof module !== 'undefined') {
    factory(exports, module, require('../constants'), require('./element'), require('./text'), require('./comment'));
  } else {
    var mod = {
      exports: {}
    };
    factory(mod.exports, mod, global.constants, global.compareElement, global.compareText, global.compareComment);
    global.unknown = mod.exports;
  }
})(this, function (exports, module, _constants, _element, _text, _comment) {
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
        srcType = undefined,
        ret = undefined;

    if (!dst || !src) {
      return;
    }

    // Check to see if it's already claimed.
    if (src[_constants.KEY_NEW_INDEX] > -1) {
      return;
    }

    dstType = dst.nodeType;
    srcType = src.nodeType;

    if (dstType !== srcType) {
      return;
    } else if (dstType === NODE_ELEMENT) {
      ret = (0, _compareElement['default'])(src, dst);
    } else if (dstType === NODE_TEXT) {
      ret = (0, _compareText['default'])(src, dst);
    } else if (dstType === NODE_COMMENT) {
      ret = (0, _compareComment['default'])(src, dst);
    }

    // Specific comparisons must actually return false to notify that the node is
    // not the same. This makes for a simpler internal API where specific
    // comparisons only have to worry about returning false, or an array
    // of instructions.
    if (ret === false) {
      return ret;
    }

    if (!ret) {
      return [];
    }

    return ret;
  };
});