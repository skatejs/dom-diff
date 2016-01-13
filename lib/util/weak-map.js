(function (global, factory) {
  if (typeof define === 'function' && define.amd) {
    define(['exports', 'module'], factory);
  } else if (typeof exports !== 'undefined' && typeof module !== 'undefined') {
    factory(exports, module);
  } else {
    var mod = {
      exports: {}
    };
    factory(mod.exports, mod);
    global.weakMap = mod.exports;
  }
})(this, function (exports, module) {
  // Because weak map polyfills either are too big or don't use native if
  // available properly.

  'use strict';

  var index = 0;
  var prefix = '__WEAK_MAP_POLYFILL_';

  module.exports = (function () {
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
  })();
});