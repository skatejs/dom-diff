(function (global, factory) {
  if (typeof define === 'function' && define.amd) {
    define(['exports', 'module', '../types', '../util/event-map'], factory);
  } else if (typeof exports !== 'undefined' && typeof module !== 'undefined') {
    factory(exports, module, require('../types'), require('../util/event-map'));
  } else {
    var mod = {
      exports: {}
    };
    factory(mod.exports, mod, global.types, global.eventMap);
    global.events = mod.exports;
  }
})(this, function (exports, module, _types, _utilEventMap) {
  'use strict';

  function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

  var _eventMap = _interopRequireDefault(_utilEventMap);

  module.exports = function (src, dst) {
    var dstEvents = dst.events;
    var srcEvents = (0, _eventMap['default'])(src);
    var instructions = [];

    // Remove any source events that aren't in the source before seeing if we
    // need to add any from the destination.
    if (srcEvents) {
      for (var _name in srcEvents) {
        if (dstEvents[_name] !== srcEvents[_name]) {
          instructions.push({
            data: { name: _name, value: undefined },
            destination: dst,
            source: src,
            type: _types.SET_EVENT
          });
        }
      }
    }

    // After instructing to remove any old events, we then can instruct to add
    // new events. This prevents the new events from being removed from earlier
    // instructions.
    if (dstEvents) {
      for (var _name2 in dstEvents) {
        var value = dstEvents[_name2];
        if (srcEvents[_name2] !== value) {
          instructions.push({
            data: { name: _name2, value: value },
            destination: dst,
            source: src,
            type: _types.SET_EVENT
          });
        }
      }
    }

    return instructions;
  };
});