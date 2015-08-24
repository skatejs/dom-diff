(function (global, factory) {
  if (typeof define === 'function' && define.amd) {
    define(['exports', 'module', './types'], factory);
  } else if (typeof exports !== 'undefined' && typeof module !== 'undefined') {
    factory(exports, module, require('./types'));
  } else {
    var mod = {
      exports: {}
    };
    factory(mod.exports, mod, global.types);
    global.unknown = mod.exports;
  }
})(this, function (exports, module, _types) {
  'use strict';

  module.exports = diff;

  var NODE_COMMENT = 8;
  var NODE_ELEMENT = 1;
  var NODE_TEXT = 3;
  var KEY_SAME_AS_DESTINATION = Symbol();

  function compareNodeElement(src, dst) {
    if (src.tagName !== dst.tagName) {
      return false;
    }
  }

  function compareNodeText(src, dst) {
    if (src.textContent !== dst.textContent) {
      return false;
    }
  }

  function compareNodeComment(src, dst) {
    if (src.textContent !== dst.textContent) {
      return false;
    }
  }

  function isSameNode(src, dst) {
    var dstType = undefined,
        srcType = undefined;

    if (!dst || !src) {
      return false;
    }

    dstType = dst.nodeType;
    srcType = src.nodeType;

    if (dstType !== srcType) {
      return false;
    }

    if (dstType === NODE_ELEMENT) {
      return compareNodeElement(src, dst);
    }

    if (dstType === NODE_TEXT) {
      return compareNodeText(src, dst);
    }

    if (dstType === NODE_COMMENT) {
      return compareNodeComment(src, dst);
    }

    // We don't really care about incurring the cost of compareing anything else
    // so by returning true we just assume they're the same.
    return true;
  }

  function indexOfNode(childNodes, child) {
    var childNodesLength = childNodes.length;
    for (var a = 0; a < childNodesLength; a++) {
      if (isSameNode(childNodes[a], child)) {
        return a;
      }
    }
    return -1;
  }

  function diff(src, dst) {
    var instructions = [];

    if (!dst) {
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

      if (isSameNode(srcCh, dstCh)) {
        return [];
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
      var index = indexOfNode(srcChs, dstCh);

      // If they exist in the source, then mark that source node.
      if (index > -1) {
        dstInSrcMap.push(dstCh);
        srcInDstMap.push(srcChs[index]);
        srcChs[index][KEY_SAME_AS_DESTINATION] = true;
      }

      // If there are same nodes, we take the last node that we found and insert
      // after that one. This ensures destination nodes get placed where they're
      // supposed to be rather than just appended.
      else if (srcInDstMap.length) {
          instructions.push({
            destination: dstCh,
            source: srcInDstMap[srcInDstMap.length - 1],
            type: _types.INSERT_BEFORE
          });
        }

        // If the destination node doesn't exist in the source node and there are
        // no overlaps yet, we simply append.
        else {
            instructions.push({
              destination: dstCh,
              source: src,
              type: _types.APPEND_CHILD
            });
          }
    }

    // Remove any nodes in the source that don't exist in the destination.
    for (var a = 0; a < srcChsLen; a++) {
      var srcCh = srcChs[a];

      // If the source is in the destination, keep it but cleanup the property
      // we added to store some data.
      if (srcCh[KEY_SAME_AS_DESTINATION]) {
        delete srcCh[KEY_SAME_AS_DESTINATION];
      }

      // If the source does not exist in the destination, remove it.
      else {
          instructions.push({
            destination: null,
            source: srcCh,
            type: _types.REMOVE_CHILD
          });
        }
    }

    // For the nodes that exist in both diff objects, we diff thier trees.
    var dstInSrcMapLen = dstInSrcMap.length;
    for (var a = 0; a < dstInSrcMapLen; a++) {
      instructions = instructions.concat(diff(srcInDstMap[a], dstInSrcMap[a]));
    }

    return instructions;
  }
});