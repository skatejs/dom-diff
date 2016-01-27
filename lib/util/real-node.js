(function (global, factory) {
  if (typeof define === "function" && define.amd) {
    define(['exports', './real-node-map'], factory);
  } else if (typeof exports !== "undefined") {
    factory(exports, require('./real-node-map'));
  } else {
    var mod = {
      exports: {}
    };
    factory(mod.exports, global.realNodeMap);
    global.realNode = mod.exports;
  }
})(this, function (exports, _realNodeMap) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });

  exports.default = function (node) {
    return node instanceof Node ? node : _realNodeMap2.default.get(node);
  };

  var _realNodeMap2 = _interopRequireDefault(_realNodeMap);

  function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : {
      default: obj
    };
  }

  var _window = window;
  var Node = _window.Node;
});