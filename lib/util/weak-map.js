(function (global, factory) {
  if (typeof define === "function" && define.amd) {
    define(['module', 'exports'], factory);
  } else if (typeof exports !== "undefined") {
    factory(module, exports);
  } else {
    var mod = {
      exports: {}
    };
    factory(mod, mod.exports);
    global.weakMap = mod.exports;
  }
})(this, function (module, exports) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  var index = 0;
  var prefix = '__WEAK_MAP_POLYFILL_';

  exports.default = function () {
    if (typeof WeakMap !== 'undefined') {
      return WeakMap;
    }

    function Polyfill() {
      this.key = prefix + index;
      ++index;
    }

    Polyfill.prototype = {
      get: function get(obj) {
        return obj[this.key];
      },
      set: function set(obj, val) {
        obj[this.key] = val;
      }
    };

    return Polyfill;
  }();

  module.exports = exports['default'];
});