// src/types.js
__0ca807667308490ecea534df3b4369b8 = (function () {
  var module = {
    exports: {}
  };
  var exports = module.exports;
  
  'use strict';
  
  Object.defineProperty(exports, '__esModule', {
    value: true
  });
  var APPEND_CHILD = 0;
  exports.APPEND_CHILD = APPEND_CHILD;
  var INSERT_BEFORE = 1;
  exports.INSERT_BEFORE = INSERT_BEFORE;
  var MOVE_TO = 2;
  exports.MOVE_TO = MOVE_TO;
  var REMOVE_CHILD = 3;
  exports.REMOVE_CHILD = REMOVE_CHILD;
  var REPLACE_CHILD = 4;
  exports.REPLACE_CHILD = REPLACE_CHILD;
  var TEXT_CONTENT = 5;
  exports.TEXT_CONTENT = TEXT_CONTENT;
  
  return module.exports;
}).call(this);

// src/diff.js
__22dce1b31df73fb8f06bda10d9498f07 = (function () {
  var module = {
    exports: {}
  };
  var exports = module.exports;
  
  'use strict';
  
  Object.defineProperty(exports, '__esModule', {
    value: true
  });
  exports['default'] = diff;
  
  function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj['default'] = obj; return newObj; } }
  
  var _types = __0ca807667308490ecea534df3b4369b8;
  
  var types = _interopRequireWildcard(_types);
  
  var NODE_COMMENT = 8;
  var NODE_ELEMENT = 1;
  var NODE_TEXT = 3;
  var KEY_NEW_INDEX = Symbol();
  
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
        srcType = undefined,
        ret = undefined;
  
    if (!dst || !src) {
      return false;
    }
  
    // Check to see if it's already claimed.
    if (src[KEY_NEW_INDEX] > -1) {
      return false;
    }
  
    dstType = dst.nodeType;
    srcType = src.nodeType;
  
    if (dstType !== srcType) {
      return false;
    } else if (dstType === NODE_ELEMENT) {
      ret = compareNodeElement(src, dst);
    } else if (dstType === NODE_TEXT) {
      ret = compareNodeText(src, dst);
    } else if (dstType === NODE_COMMENT) {
      ret = compareNodeComment(src, dst);
    }
  
    return ret !== false;
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
          type: types.REPLACE_CHILD
        }];
      }
    }
  
    // Add nodes that don't exist in the source.
    for (var a = 0; a < dstChsLen; a++) {
      var dstCh = dstChs[a];
      var srcCh = srcChs[a];
  
      // If the nodes are the same, we add the current key to it so that we can
      // ensure it is still there, or moved to there, when it comes time to
      // ensure postions.
      if (isSameNode(srcCh, dstCh)) {
        dstInSrcMap.push(dstCh);
        srcInDstMap.push(srcCh);
        srcCh[KEY_NEW_INDEX] = a;
        continue;
      }
  
      // Now try and find in the source.
      var index = indexOfNode(srcChs, dstCh);
  
      // If the destination is in the source, we add the new key to it so that
      // we can ensure it gets moved to the right spot later.
      if (index > -1) {
        dstInSrcMap.push(dstCh);
        srcInDstMap.push(srcChs[index]);
        srcChs[index][KEY_NEW_INDEX] = a;
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
          type: srcToInsertBefore ? types.INSERT_BEFORE : types.APPEND_CHILD
        });
        continue;
      }
  
      // If there are no destination nodes found in the source yet then we
      // append.
      instructions.push({
        destination: dstCh,
        source: srcChsLen ? srcChs[0] : src,
        type: srcChsLen ? types.INSERT_BEFORE : types.APPEND_CHILD
      });
    }
  
    // Remove any nodes in the source that don't exist in the destination.
    var moves = [];
    for (var a = 0; a < srcChsLen; a++) {
      var srcCh = srcChs[a];
  
      // The node has moved. We record this so that we can append the moves to
      // the end of the instructions array.
      if (srcCh[KEY_NEW_INDEX] > -1) {
        moves.push({
          destination: srcCh[KEY_NEW_INDEX],
          source: srcCh,
          type: types.MOVE_TO
        });
        delete srcCh[KEY_NEW_INDEX];
        continue;
      }
  
      // If the source does not exist in the destination, remove it.
      instructions.push({
        destination: null,
        source: srcCh,
        type: types.REMOVE_CHILD
      });
    }
  
    // Move instructions must come last to ensure that all attachments and
    // detachments have been carried out at this level in the tree. This ensures
    // that the source's length is the same as the destination's length and that
    // indexes where nodes need to be moved is accurate.
    instructions = instructions.concat(moves);
  
    // For the nodes that exist in both diff objects, we diff thier trees.
    var dstInSrcMapLen = dstInSrcMap.length;
    for (var a = 0; a < dstInSrcMapLen; a++) {
      instructions = instructions.concat(diff(srcInDstMap[a], dstInSrcMap[a]));
    }
  
    return instructions;
  }
  
  module.exports = exports['default'];
  
  return module.exports;
}).call(this);

// src/patch.js
__d49832510105705a679155ef252b6786 = (function () {
  var module = {
    exports: {}
  };
  var exports = module.exports;
  
  'use strict';
  
  Object.defineProperty(exports, '__esModule', {
    value: true
  });
  
  function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj['default'] = obj; return newObj; } }
  
  var _types = __0ca807667308490ecea534df3b4369b8;
  
  var types = _interopRequireWildcard(_types);
  
  var patchers = {};
  patchers[types.APPEND_CHILD] = function (src, dst) {
    src.appendChild(dst);
  };
  patchers[types.INSERT_BEFORE] = function (src, dst) {
    src.parentNode.insertBefore(dst, src);
  };
  patchers[types.MOVE_TO] = function (src, dstIndex) {
    var dst = src.parentNode.childNodes[dstIndex];
  
    if (dst === src) {
      return;
    }
  
    if (dst) {
      src.parentNode.insertBefore(src, dst);
    } else {
      src.parentNode.appendChild(src);
    }
  };
  patchers[types.REMOVE_CHILD] = function (src) {
    src.parentNode.removeChild(src);
  };
  patchers[types.REPLACE_CHILD] = function (src, dst) {
    src.parentNode.replaceChild(dst, src);
  };
  patchers[types.TEXT_CONTENT] = function (src, dst) {
    src.textContent = dst.textContent;
  };
  
  function patch(instruction) {
    patchers[instruction.type](instruction.source, instruction.destination);
  }
  
  exports['default'] = function (instructions) {
    instructions.forEach(patch);
  };
  
  module.exports = exports['default'];
  
  return module.exports;
}).call(this);

// src/index.js
__d0534c9e7312e01df51511bab04ed9e4 = (function () {
  var module = {
    exports: {}
  };
  var exports = module.exports;
  
  'use strict';
  
  Object.defineProperty(exports, '__esModule', {
    value: true
  });
  
  function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }
  
  var _diff = __22dce1b31df73fb8f06bda10d9498f07;
  
  var _diff2 = _interopRequireDefault(_diff);
  
  var _patch = __d49832510105705a679155ef252b6786;
  
  var _patch2 = _interopRequireDefault(_patch);
  
  var _types = __0ca807667308490ecea534df3b4369b8;
  
  var _types2 = _interopRequireDefault(_types);
  
  exports['default'] = {
    diff: _diff2['default'],
    patch: _patch2['default'],
    types: _types2['default']
  };
  module.exports = exports['default'];
  
  return module.exports;
}).call(this);