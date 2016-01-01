(function (global, factory) {
  if (typeof define === 'function' && define.amd) {
    define(['exports', 'module', '../util/event-map', '../util/real-node'], factory);
  } else if (typeof exports !== 'undefined' && typeof module !== 'undefined') {
    factory(exports, module, require('../util/event-map'), require('../util/real-node'));
  } else {
    var mod = {
      exports: {}
    };
    factory(mod.exports, mod, global.eventMap, global.realNode);
    global.setEvent = mod.exports;
  }
})(this, function (exports, module, _utilEventMap, _utilRealNode) {
  'use strict';

  function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

  var _eventMap = _interopRequireDefault(_utilEventMap);

  var _realNode = _interopRequireDefault(_utilRealNode);

  module.exports = function (src, dst, data) {
    var realSrc = (0, _realNode['default'])(src);
    var eventHandlers = (0, _eventMap['default'])(realSrc);
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
});