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
    var similarMatch = undefined;

    for (var a = 0; a < childNodesLength; a++) {
      var instructions = (0, _compareNode['default'])(childNodes[a], child);

      // Falsy instructions means no match at all.
      if (!instructions) {
        continue;
      }

      // Some instructions means partial match. We only record the first match
      // but continue looking for an exact match.
      if (!similarMatch && instructions.length) {
        similarMatch = {
          index: a,
          instructions: instructions
        };
        continue;
      }

      // Instructions array with no instructions means exact match.
      if (instructions.length === 0) {
        return {
          index: a,
          instructions: instructions
        };
      }
    }

    // We record
    if (similarMatch) {
      return similarMatch;
    }

    return {
      index: -1,
      instructions: null
    };
  };
});