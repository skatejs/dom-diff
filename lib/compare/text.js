(function (global, factory) {
  if (typeof define === 'function' && define.amd) {
    define(['exports', 'module', '../types'], factory);
  } else if (typeof exports !== 'undefined' && typeof module !== 'undefined') {
    factory(exports, module, require('../types'));
  } else {
    var mod = {
      exports: {}
    };
    factory(mod.exports, mod, global.types);
    global.text = mod.exports;
  }
})(this, function (exports, module, _types) {
  'use strict';

  module.exports = function (src, dst) {
    if (src.textContent === dst.textContent) {
      return [];
    }

    return [{
      destination: dst,
      source: src,
      type: _types.TEXT_CONTENT
    }];
  };
});