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
    global.properties = mod.exports;
  }
})(this, function (exports, module, _types) {
  'use strict';

  module.exports = function (src, dst) {
    // We only use destination prop specs since it could be a vDOM.
    var srcProps = src.properties || src;
    var dstProps = dst.properties;
    var instructions = [];

    // Bail early if possible.
    if (!dstProps) {
      return instructions;
    }

    // We use the destination prop spec as the source of truth.
    for (var a in dstProps) {
      var srcProp = srcProps[a];
      var dstProp = dstProps[a];

      if (srcProp !== dstProp) {
        instructions.push({
          data: { name: a, value: dstProp },
          destination: dst,
          source: src,
          type: _types.SET_PROPERTY
        });
      }
    }

    return instructions;
  };
});