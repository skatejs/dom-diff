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
    global.attributes = mod.exports;
  }
})(this, function (exports, module, _types) {
  'use strict';

  module.exports = function (src, dst) {
    var srcAttrs = src.attributes;
    var dstAttrs = dst.attributes;
    var srcAttrsLen = (srcAttrs || 0) && srcAttrs.length;
    var dstAttrsLen = (dstAttrs || 0) && dstAttrs.length;
    var instructions = [];

    // Bail early if possible.
    if (!srcAttrsLen && !dstAttrsLen) {
      return instructions;
    }

    // Merge attributes that exist in source with destination's.
    for (var a = 0; a < srcAttrsLen; a++) {
      var srcAttr = srcAttrs[a];
      var dstAttr = dstAttrs[srcAttr.name];

      if (!dstAttr) {
        instructions.push({
          data: { name: srcAttr.name },
          destination: dst,
          source: src,
          type: _types.REMOVE_ATTRIBUTE
        });
      } else if (srcAttr.value !== dstAttr.value) {
        instructions.push({
          data: { name: srcAttr.name, value: dstAttr.value },
          destination: dst,
          source: src,
          type: _types.SET_ATTRIBUTE
        });
      }
    }

    // We only need to worry about setting attributes that don't already exist
    // in the source.
    for (var a = 0; a < dstAttrsLen; a++) {
      var dstAttr = dstAttrs[a];
      var srcAttr = srcAttrs[dstAttr.name];

      if (!srcAttr) {
        instructions.push({
          data: { name: dstAttr.name, value: dstAttr.value },
          destination: dst,
          source: src,
          type: _types.SET_ATTRIBUTE
        });
      }
    }

    return instructions;
  };
});