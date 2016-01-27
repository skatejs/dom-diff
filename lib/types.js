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
  var APPEND_CHILD = exports.APPEND_CHILD = 1;
  var REMOVE_CHILD = exports.REMOVE_CHILD = 2;
  var REMOVE_ATTRIBUTE = exports.REMOVE_ATTRIBUTE = 3;
  var REPLACE_CHILD = exports.REPLACE_CHILD = 4;
  var SET_ATTRIBUTE = exports.SET_ATTRIBUTE = 5;
  var SET_EVENT = exports.SET_EVENT = 6;
  var SET_PROPERTY = exports.SET_PROPERTY = 7;
  var TEXT_CONTENT = exports.TEXT_CONTENT = 8;
});