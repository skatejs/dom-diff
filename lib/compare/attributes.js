(function (global, factory) {
  if (typeof define === 'function' && define.amd) {
    define(['exports', 'module', '../types', '../util/accessor'], factory);
  } else if (typeof exports !== 'undefined' && typeof module !== 'undefined') {
    factory(exports, module, require('../types'), require('../util/accessor'));
  } else {
    var mod = {
      exports: {}
    };
    factory(mod.exports, mod, global.types, global.accessor);
    global.attributes = mod.exports;
  }
})(this, function (exports, module, _types, _utilAccessor) {
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
      var srcAttrName = srcAttr.name;
      var srcAttrValue = (0, _utilAccessor.getAccessor)(src, srcAttrName);
      var dstAttr = dstAttrs[srcAttrName];
      var dstAttrValue = (0, _utilAccessor.getAccessor)(dst, srcAttrName);

      if (!dstAttr) {
        instructions.push({
          data: { name: srcAttrName },
          destination: dst,
          source: src,
          type: _types.REMOVE_ATTRIBUTE
        });
      } else if (srcAttrValue !== dstAttrValue) {
        instructions.push({
          data: { name: srcAttrName, value: dstAttrValue },
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
      var dstAttrName = dstAttr.name;
      var dstAttrValue = (0, _utilAccessor.getAccessor)(dst, dstAttrName);
      var srcAttr = srcAttrs[dstAttrName];

      if (!srcAttr) {
        instructions.push({
          data: { name: dstAttrName, value: dstAttrValue },
          destination: dst,
          source: src,
          type: _types.SET_ATTRIBUTE
        });
      }
    }

    return instructions;
  };
});