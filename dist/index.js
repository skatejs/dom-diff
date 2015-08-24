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
  var REMOVE_CHILD = 2;
  exports.REMOVE_CHILD = REMOVE_CHILD;
  var REPLACE_CHILD = 3;
  exports.REPLACE_CHILD = REPLACE_CHILD;
  var TEXT_CONTENT = 4;
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
          type: types.REPLACE_CHILD
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
            type: types.INSERT_BEFORE
          });
        }
  
        // If the destination node doesn't exist in the source node and there are
        // no overlaps yet, we simply append.
        else {
            instructions.push({
              destination: dstCh,
              source: src,
              type: types.APPEND_CHILD
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
            type: types.REMOVE_CHILD
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