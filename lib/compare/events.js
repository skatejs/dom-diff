(function (global, factory) {
  if (typeof define === "function" && define.amd) {
    define(['module', 'exports', '../types', '../util/event-map'], factory);
  } else if (typeof exports !== "undefined") {
    factory(module, exports, require('../types'), require('../util/event-map'));
  } else {
    var mod = {
      exports: {}
    };
    factory(mod, mod.exports, global.types, global.eventMap);
    global.events = mod.exports;
  }
})(this, function (module, exports, _types, _eventMap) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });

  exports.default = function (src, dst) {
    var dstEvents = dst.events;
    var srcEvents = (0, _eventMap2.default)(src);
    var instructions = [];

    // Remove any source events that aren't in the destination before seeing if
    // we need to add any from the destination.
    if (srcEvents) {
      for (var name in srcEvents) {
        if (dstEvents && dstEvents[name] !== srcEvents[name]) {
          instructions.push({
            data: { name: name, value: undefined },
            destination: dst,
            source: src,
            type: types.SET_EVENT
          });
        }
      }
    }

    // After instructing to remove any old events, we then can instruct to add
    // new events. This prevents the new events from being removed from earlier
    // instructions.
    if (dstEvents) {
      for (var name in dstEvents) {
        var value = dstEvents[name];
        if (srcEvents[name] !== value) {
          instructions.push({
            data: { name: name, value: value },
            destination: dst,
            source: src,
            type: types.SET_EVENT
          });
        }
      }
    }

    return instructions;
  };

  var types = _interopRequireWildcard(_types);

  var _eventMap2 = _interopRequireDefault(_eventMap);

  function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : {
      default: obj
    };
  }

  function _interopRequireWildcard(obj) {
    if (obj && obj.__esModule) {
      return obj;
    } else {
      var newObj = {};

      if (obj != null) {
        for (var key in obj) {
          if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key];
        }
      }

      newObj.default = obj;
      return newObj;
    }
  }

  module.exports = exports['default'];
});