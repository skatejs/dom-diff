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
    var eventHandlers = (0, _eventMap['default'])(src);
    var dstEvents = dst.events;
    var instructions = [];

    // Remove all handlers not being set.
    for (var _name in eventHandlers) {
      if (!dstEvents || !(_name in dstEvents)) {
        var value = null;
        instructions.push({
          data: { name: _name, value: value },
          destination: dst,
          source: src,
          type: _types.SET_EVENT
        });
      }
    }

    // Add new handlers, not changing existing ones.
    if (dstEvents) {
      for (var _name2 in dstEvents) {
        var value = dstEvents[_name2];
        if (eventHandlers[_name2] !== value) {
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