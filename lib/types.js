(function (global, factory) {
  if (typeof define === 'function' && define.amd) {
    define(['exports'], factory);
  } else if (typeof exports !== 'undefined') {
    factory(exports);
  } else {
    var mod = {
      exports: {}
    };
    factory(mod.exports);
    global.unknown = mod.exports;
  }
})(this, function (exports) {
  'use strict';

  Object.defineProperty(exports, '__esModule', {
    value: true
  });
  var APPEND_CHILD = 0;
  exports.APPEND_CHILD = APPEND_CHILD;
  var INSERT_BEFORE = 1;
  exports.INSERT_BEFORE = INSERT_BEFORE;
  var REMOVE_CHILD = 2;
  exports.REMOVE_CHILD = REMOVE_CHILD;
  var REPLACE_CHILD = 3;
  exports.REPLACE_CHILD = REPLACE_CHILD;
  var TEXT_CONTENT = 4;
  exports.TEXT_CONTENT = TEXT_CONTENT;
});