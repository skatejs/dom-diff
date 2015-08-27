(function (global, factory) {
  if (typeof define === 'function' && define.amd) {
    define(['exports', 'module', './types', './constants', './compare/node', './compare/nodes'], factory);
  } else if (typeof exports !== 'undefined' && typeof module !== 'undefined') {
    factory(exports, module, require('./types'), require('./constants'), require('./compare/node'), require('./compare/nodes'));
  } else {
    var mod = {
      exports: {}
    };
    factory(mod.exports, mod, global.types, global.constants, global.compareNode, global.compareNodes);
    global.unknown = mod.exports;
  }
})(this, function (exports, module, _types, _constants, _compareNode, _compareNodes) {
  'use strict';

  module.exports = diff;

  function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

  var _compareNode2 = _interopRequireDefault(_compareNode);

  var _compareNodes2 = _interopRequireDefault(_compareNodes);

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

    var dstChs = dst.childNodes;
    var dstChsLen = dstChs.length;
    var dstInSrcMap = [];
    var srcChs = src.childNodes;
    var srcChsLen = srcChs.length;
    var srcInDstMap = [];

    // If there's only one child in both source and destination, we can check to
    // see if they're the same, or replace the source with the destination if not
    // and simply return from here without doing any further operations.
    if (dstChsLen === 1 && srcChsLen === 1) {
      var dstCh = dstChs[0];
      var srcCh = srcChs[0];
      var nodeInstructions = (0, _compareNode2['default'])(srcCh, dstCh);

      // If it's the same node then there may be instructions to alter it so we
      // just return those.
      if (nodeInstructions) {
        instructions = instructions.concat(nodeInstructions);
      } else {
        return [{
          destination: dstCh,
          source: srcCh,
          type: _types.REPLACE_CHILD
        }];
      }
    }

    // Add nodes that don't exist in the source.
    for (var a = 0; a < dstChsLen; a++) {
      var dstCh = dstChs[a];
      var dstChInSrcChs = (0, _compareNodes2['default'])(srcChs, dstCh);

      // If the destination is in the source, we add the new key to it so that
      // we can ensure it gets moved to the right spot later.
      if (dstChInSrcChs.index > -1) {
        dstInSrcMap.push(dstCh);
        srcInDstMap.push(srcChs[dstChInSrcChs.index]);
        srcChs[dstChInSrcChs.index][_constants.KEY_NEW_INDEX] = a;
        instructions = instructions.concat(dstChInSrcChs.instructions);
        continue;
      }

      // If there are same nodes, we take the last node that we found and insert
      // after that one. This ensures destination nodes get placed where they're
      // supposed to be rather than just appended.
      if (dstInSrcMap.length) {
        var srcToInsertAfter = srcInDstMap[srcInDstMap.length - 1];
        var srcToInsertBefore = srcToInsertAfter.nextSibling;
        instructions.push({
          destination: dstCh,
          source: srcToInsertBefore || src,
          type: srcToInsertBefore ? _types.INSERT_BEFORE : _types.APPEND_CHILD
        });
        continue;
      }

      // If there are no destination nodes found in the source yet then we
      // prepend.
      instructions.push({
        destination: dstCh,
        source: srcChsLen ? srcChs[0] : src,
        type: srcChsLen ? _types.INSERT_BEFORE : _types.APPEND_CHILD
      });
    }

    // Remove any nodes in the source that don't exist in the destination.
    var moves = [];
    for (var a = 0; a < srcChsLen; a++) {
      var srcCh = srcChs[a];

      // The node has moved. We record this so that we can append the moves to
      // the end of the instructions array.
      if (srcCh[_constants.KEY_NEW_INDEX] > -1) {
        moves.push({
          destination: srcCh[_constants.KEY_NEW_INDEX],
          source: srcCh,
          type: _types.MOVE_TO
        });
        delete srcCh[_constants.KEY_NEW_INDEX];
        continue;
      }

      // If the source does not exist in the destination, remove it.
      instructions.push({
        destination: null,
        source: srcCh,
        type: _types.REMOVE_CHILD
      });
    }

    // Move instructions must come last to ensure that all attachments and
    // detachments have been carried out at this level in the tree. This ensures
    // that the source's length is the same as the destination's length and that
    // indexes where nodes need to be moved is accurate.
    instructions = instructions.concat(moves);

    // For the nodes that exist in both diff objects, we diff their trees.
    var dstInSrcMapLen = dstInSrcMap.length;
    for (var a = 0; a < dstInSrcMapLen; a++) {
      var dstDescent = dstInSrcMap[a];
      var srcDescent = srcInDstMap[a];
      if (opts.descend(srcDescent, dstDescent)) {
        instructions = instructions.concat(diff({
          destination: dstDescent,
          source: srcDescent
        }));
      }
    }

    return instructions;
  }
});