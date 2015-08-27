(function (global, factory) {
  if (typeof define === 'function' && define.amd) {
    define(['exports', 'module', './node'], factory);
  } else if (typeof exports !== 'undefined' && typeof module !== 'undefined') {
    factory(exports, module, require('./node'));
  } else {
    var mod = {
      exports: {}
    };
    factory(mod.exports, mod, global.compareNode);
    global.unknown = mod.exports;
  }
})(this, function (exports, module, _node) {
  'use strict';

  function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

  var _compareNode = _interopRequireDefault(_node);

  module.exports = function (childNodes, child) {
    var childNodesLength = childNodes.length;
    for (var a = 0; a < childNodesLength; a++) {
      var instructions = (0, _compareNode['default'])(childNodes[a], child);
      if (instructions) {
        return {
          index: a,
          instructions: instructions
        };
      }
    }
    return {
      index: -1,
      instructions: null
    };
  };
});