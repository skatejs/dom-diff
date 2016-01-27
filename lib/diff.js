(function (global, factory) {
  if (typeof define === "function" && define.amd) {
    define(['module', 'exports', './types', './compare/node', './util/real-node', './util/real-node-map'], factory);
  } else if (typeof exports !== "undefined") {
    factory(module, exports, require('./types'), require('./compare/node'), require('./util/real-node'), require('./util/real-node-map'));
  } else {
    var mod = {
      exports: {}
    };
    factory(mod, mod.exports, global.types, global.node, global.realNode, global.realNodeMap);
    global.diff = mod.exports;
  }
})(this, function (module, exports, _types, _node, _realNode, _realNodeMap) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = diff;

  var types = _interopRequireWildcard(_types);

  var _node2 = _interopRequireDefault(_node);

  var _realNode2 = _interopRequireDefault(_realNode);

  var _realNodeMap2 = _interopRequireDefault(_realNodeMap);

  function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : {
      default: obj
    };
  }

  function _interopRequireWildcard(obj) {
    if (obj && obj.__esModule) {
      return obj;
    } else {
      var newObj = {};

      if (obj != null) {
        for (var key in obj) {
          if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key];
        }
      }

      newObj.default = obj;
      return newObj;
    }
  }

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

      if (!curSrc) {
        instructions.push({
          destination: dstChs[a],
          source: src,
          type: types.APPEND_CHILD
        });
        continue;
      } else {
        if (!(curDst instanceof Node)) {
          _realNodeMap2.default.set(curDst, (0, _realNode2.default)(curSrc));
        }
      }

      var nodeInstructions = (0, _node2.default)(curSrc, curDst);

      if (nodeInstructions) {
        var newOpts = opts;
        newOpts.destination = curDst;
        newOpts.source = curSrc;
        instructions = instructions.concat(nodeInstructions, diff(newOpts));
      } else {
        instructions.push({
          destination: curDst,
          source: curSrc,
          type: types.REPLACE_CHILD
        });
      }
    }

    if (dstChsLen < srcChsLen) {
      for (var a = dstChsLen; a < srcChsLen; a++) {
        instructions.push({
          destination: srcChs[a],
          source: src,
          type: types.REMOVE_CHILD
        });
      }
    }

    return instructions;
  }

  module.exports = exports['default'];
});