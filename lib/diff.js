(function (global, factory) {
  if (typeof define === 'function' && define.amd) {
    define(['exports', 'module', './types', 'object-assign', './compare/node'], factory);
  } else if (typeof exports !== 'undefined' && typeof module !== 'undefined') {
    factory(exports, module, require('./types'), require('object-assign'), require('./compare/node'));
  } else {
    var mod = {
      exports: {}
    };
    factory(mod.exports, mod, global.types, global.assign, global.compareNode);
    global.diff = mod.exports;
  }
})(this, function (exports, module, _types, _objectAssign, _compareNode) {
  'use strict';

  module.exports = diff;

  function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

  var _assign = _interopRequireDefault(_objectAssign);

  var _compareNode2 = _interopRequireDefault(_compareNode);

  function diff(opts) {
    if (opts.descend === undefined) {
      opts.descend = function () {
        return true;
      };
    }

    var src = opts.source;
    var dst = opts.destination;
    var instructions = [];

    if (!src || !dst) {
      return [];
    }

    var srcChs = src.childNodes;
    var dstChs = dst.childNodes;
    var srcChsLen = srcChs.length;
    var dstChsLen = dstChs.length;

    for (var a = 0; a < dstChsLen; a++) {
      var curSrc = srcChs[a];
      var curDst = dstChs[a];
      var nodeInstructions = (0, _compareNode2['default'])(curSrc, curDst);

      // If there is no matching destination node it means we need to remove the
      // current source node from the source.
      if (!curSrc) {
        instructions.push({
          destination: dstChs[a],
          source: src,
          type: _types.APPEND_CHILD
        });
        continue;
      }

      // If there are instructions (even an empty array) it means the node can be
      // diffed and doesn't have to be replaced. If the instructions are falsy
      // it means that the nodes are not similar (cannot be changed) and must be
      // replaced instead.
      if (nodeInstructions) {
        instructions = instructions.concat(nodeInstructions);
        if (opts.descend(curSrc, curDst)) {
          instructions = instructions.concat(diff((0, _assign['default'])(opts, {
            destination: curDst,
            source: curSrc
          })));
        }
      } else {
        instructions.push({
          destination: curDst,
          source: curSrc,
          type: _types.REPLACE_CHILD
        });
      }
    }

    if (dstChsLen < srcChsLen) {
      for (var a = dstChsLen; a < srcChsLen; a++) {
        instructions.push({
          destination: srcChs[a],
          source: src,
          type: _types.REMOVE_CHILD
        });
      }
    }

    return instructions;
  }
});