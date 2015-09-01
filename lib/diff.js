(function (global, factory) {
  if (typeof define === 'function' && define.amd) {
    define(['exports', 'module', './types', 'lodash/object/assign', './compare/node'], factory);
  } else if (typeof exports !== 'undefined' && typeof module !== 'undefined') {
    factory(exports, module, require('./types'), require('lodash/object/assign'), require('./compare/node'));
  } else {
    var mod = {
      exports: {}
    };
    factory(mod.exports, mod, global.types, global.assign, global.compareNode);
    global.unknown = mod.exports;
  }
})(this, function (exports, module, _types, _lodashObjectAssign, _compareNode) {
  'use strict';

  module.exports = diff;

  function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

  var _assign = _interopRequireDefault(_lodashObjectAssign);

  var _compareNode2 = _interopRequireDefault(_compareNode);

  function diff(opts) {
    if (opts.descend === undefined) {
      opts.descend = function () {
        return true;
      };
    }

    var dst = opts.destination;
    var src = opts.source;
    var instructions = [];

    if (!src || !dst) {
      return [];
    }

    var less = undefined;
    var more = undefined;

    if (dst.childNodes.length < src.childNodes.length) {
      less = dst;
      more = src;
    } else {
      less = src;
      more = dst;
    }

    var moreStartIndex = 0;

    // Diff the node with less items against the node with more items.
    for (var a = 0; a < less.childNodes.length; a++) {
      var curLess = less.childNodes[a];
      var curMore = more.childNodes[a];
      var curDst = less === dst ? less.childNodes[a] : more.childNodes[a];
      var curSrc = more === src ? more.childNodes[a] : less.childNodes[a];
      var nodeInstructions = (0, _compareNode2['default'])(curSrc, curDst);

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

      ++moreStartIndex;
    }

    // Add / remove extra items.
    for (var a = moreStartIndex; a < more.childNodes.length; a++) {
      if (more === dst) {
        instructions.push({
          destination: more.childNodes[a],
          source: less,
          type: _types.APPEND_CHILD
        });
      } else {
        instructions.push({
          destination: more.childNodes[a],
          source: more,
          type: _types.REMOVE_CHILD
        });
      }
    }

    return instructions;
  }
});