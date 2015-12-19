(function (global, factory) {
  if (typeof define === 'function' && define.amd) {
    define(['exports', 'module', './real-node-map'], factory);
  } else if (typeof exports !== 'undefined' && typeof module !== 'undefined') {
    factory(exports, module, require('./real-node-map'));
  } else {
    var mod = {
      exports: {}
    };
    factory(mod.exports, mod, global.realNodeMap);
    global.realNode = mod.exports;
  }
})(this, function (exports, module, _realNodeMap) {
  'use strict';

  function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

  var _realNodeMap2 = _interopRequireDefault(_realNodeMap);

  var Node = window.Node;

  module.exports = function (node) {
    return node instanceof Node ? node : _realNodeMap2['default'].get(node);
  };
});