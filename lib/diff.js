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

  function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

  var _compareNode2 = _interopRequireDefault(_compareNode);

  function diff() {
    var opts = arguments.length <= 0 || arguments[0] === undefined ? defaultOptions : arguments[0];

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

      if (opts.ignore && opts.ignore(curSrc, curDst)) {
        continue;
      }

      var nodeInstructions = (0, _compareNode2['default'])(curSrc, curDst);

      // If there are instructions (even an empty array) it means the node can be
      // diffed and doesn't have to be replaced. If the instructions are falsy
      // it means that the nodes are not similar (cannot be changed) and must be
      // replaced instead.
      if (nodeInstructions) {
        instructions = instructions.concat(nodeInstructions);
        if (!curSrc.__DO_NOT_DESCEND && (!opts.descend || opts.descend(curSrc, curDst))) {
          var newOpts = opts;
          newOpts.destination = curDst;
          newOpts.source = curSrc;
          instructions = instructions.concat(diff(newOpts));
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

  module.exports = function (opts) {
    // We don't descend into any root nodes that have already been diffed.
    opts.source.__DO_NOT_DESCEND = true;
    return diff(opts);
  };
});