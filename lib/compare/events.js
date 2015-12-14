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
    global.events = mod.exports;
  }
})(this, function (exports, module, _types) {
  'use strict';

  module.exports = function (src, dst) {
    var dstEvents = dst.events;
    var instructions = [];

    if (!dstEvents) {
      return instructions;
    }

    for (var a in dstEvents) {
      var dstEvent = dstEvents[a];

      // Hack, as stated elsewhere, but we need to refer to the old event
      // handler. We only want to apply a patch if it's changed.
      if (src['__events_' + a] !== dstEvent) {
        instructions.push({
          data: { name: a, value: dstEvent },
          destination: dst,
          source: src,
          type: _types.SET_EVENT
        });
      }
    }

    return instructions;
  };
});