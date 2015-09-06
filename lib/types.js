(function (global, factory) {
  if (typeof define === "function" && define.amd) {
    define(["exports"], factory);
  } else if (typeof exports !== "undefined") {
    factory(exports);
  } else {
    var mod = {
      exports: {}
    };
    factory(mod.exports);
    global.types = mod.exports;
  }
})(this, function (exports) {
  "use strict";

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  var APPEND_CHILD = 1;
  exports.APPEND_CHILD = APPEND_CHILD;
  var REMOVE_CHILD = 2;
  exports.REMOVE_CHILD = REMOVE_CHILD;
  var REMOVE_ATTRIBUTE = 3;
  exports.REMOVE_ATTRIBUTE = REMOVE_ATTRIBUTE;
  var REPLACE_CHILD = 4;
  exports.REPLACE_CHILD = REPLACE_CHILD;
  var SET_ATTRIBUTE = 5;
  exports.SET_ATTRIBUTE = SET_ATTRIBUTE;
  var TEXT_CONTENT = 6;
  exports.TEXT_CONTENT = TEXT_CONTENT;
});