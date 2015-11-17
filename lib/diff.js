(function (global, factory) {
  if (typeof define === 'function' && define.amd) {
    define(['exports', 'module', './types', './compare/node'], factory);
  } else if (typeof exports !== 'undefined' && typeof module !== 'undefined') {
    factory(exports, module, require('./types'), require('./compare/node'));
  } else {
    var mod = {
      exports: {}
    };
    factory(mod.exports, mod, global.types, global.compareNode);
    global.diff = mod.exports;
  }
})(this, function (exports, module, _types, _compareNode) {
  'use strict';

  module.exports = diff;

  function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

  var _compareNode2 = _interopRequireDefault(_compareNode);

  function diff() {
    var opts = arguments.length <= 0 || arguments[0] === undefined ? {} : arguments[0];

    var src = opts.source;
    var dst = opts.destination;
    var instructions = [];

    if (!src || !dst) {
      return [];
    }

    var srcChs = src.childNodes;
    var dstChs = dst.childNodes;
    var srcChsLen = srcChs ? srcChs.length : 0;
    var dstChsLen = dstChs ? dstChs.length : 0;

    for (var a = 0; a < dstChsLen; a++) {
      var curSrc = srcChs[a];
      var curDst = dstChs[a];

      // If there is no matching destination node it means we need to remove the
      // current source node from the source.
      if (!curSrc) {
        instructions.push({
          destination: dstChs[a],
          source: src,
          type: _types.APPEND_CHILD
        });
        continue;
      } else {
        // Ensure the real node is carried over even if the destination isn't used.
        // This is used in the render() function to keep track of the real node
        // that corresponds to a virtual node if a virtual tree is being used.
        curDst.__realNode = curSrc.__realNode;
      }

      var nodeInstructions = (0, _compareNode2['default'])(curSrc, curDst);

      // If there are instructions (even an empty array) it means the node can be
      // diffed and doesn't have to be replaced. If the instructions are falsy
      // it means that the nodes are not similar (cannot be changed) and must be
      // replaced instead.
      if (nodeInstructions) {
        var newOpts = opts;
        newOpts.destination = curDst;
        newOpts.source = curSrc;
        instructions = instructions.concat(nodeInstructions, diff(newOpts));
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