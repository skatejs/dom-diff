(function (global, factory) {
  if (typeof define === 'function' && define.amd) {
    define(['exports', 'module', 'weakmap'], factory);
  } else if (typeof exports !== 'undefined' && typeof module !== 'undefined') {
    factory(exports, module, require('weakmap'));
  } else {
    var mod = {
      exports: {}
    };
    factory(mod.exports, mod, global.weakmap);
    global.eventMap = mod.exports;
  }
})(this, function (exports, module, _weakmap) {
  'use strict';

  var WeakMap = window.WeakMap;

  var map = new WeakMap();

  module.exports = function (elem) {
    var events = map.get(elem);
    events || map.set(elem, events = {});
    return events;
  };
});