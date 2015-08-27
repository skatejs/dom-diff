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
  var MOVE_TO = 2;
  exports.MOVE_TO = MOVE_TO;
  var REMOVE_CHILD = 3;
  exports.REMOVE_CHILD = REMOVE_CHILD;
  var REMOVE_ATTRIBUTE = 4;
  exports.REMOVE_ATTRIBUTE = REMOVE_ATTRIBUTE;
  var REPLACE_CHILD = 5;
  exports.REPLACE_CHILD = REPLACE_CHILD;
  var SET_ATTRIBUTE = 6;
  exports.SET_ATTRIBUTE = SET_ATTRIBUTE;
  var TEXT_CONTENT = 7;
  exports.TEXT_CONTENT = TEXT_CONTENT;
});