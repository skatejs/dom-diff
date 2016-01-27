(function (global, factory) {
  if (typeof define === "function" && define.amd) {
    define(['exports', '../util/event-map', '../util/real-node'], factory);
  } else if (typeof exports !== "undefined") {
    factory(exports, require('../util/event-map'), require('../util/real-node'));
  } else {
    var mod = {
      exports: {}
    };
    factory(mod.exports, global.eventMap, global.realNode);
    global.setEvent = mod.exports;
  }
})(this, function (exports, _eventMap, _realNode) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });

  exports.default = function (src, dst, data) {
    var realSrc = (0, _realNode2.default)(src);
    var eventHandlers = (0, _eventMap2.default)(realSrc);
    var name = data.name;
    var prevHandler = eventHandlers[name];
    var nextHandler = data.value;

    if (typeof prevHandler === 'function') {
      delete eventHandlers[name];
      realSrc.removeEventListener(name, prevHandler);
    }

    if (typeof nextHandler === 'function') {
      eventHandlers[name] = nextHandler;
      realSrc.addEventListener(name, nextHandler);
    }
  };

  var _eventMap2 = _interopRequireDefault(_eventMap);

  var _realNode2 = _interopRequireDefault(_realNode);

  function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : {
      default: obj
    };
  }
});