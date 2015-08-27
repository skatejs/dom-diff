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
  var REMOVE_ATTRIBUTE = 4;
  exports.REMOVE_ATTRIBUTE = REMOVE_ATTRIBUTE;
  var REPLACE_CHILD = 5;
  exports.REPLACE_CHILD = REPLACE_CHILD;
  var SET_ATTRIBUTE = 6;
  exports.SET_ATTRIBUTE = SET_ATTRIBUTE;
  var TEXT_CONTENT = 7;
  exports.TEXT_CONTENT = TEXT_CONTENT;
  
  return module.exports;
}).call(this);

// src/constants.js
__adcb32fd9f3d922c16eb43f5efa9df76 = (function () {
  var module = {
    exports: {}
  };
  var exports = module.exports;
  
  'use strict';
  
  Object.defineProperty(exports, '__esModule', {
    value: true
  });
  var KEY_NEW_INDEX = Symbol();
  exports.KEY_NEW_INDEX = KEY_NEW_INDEX;
  
  return module.exports;
}).call(this);

// src/compare/attributes.js
__bad2e851182eb57480d47d0d1303f9cd = (function () {
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
  
  exports['default'] = function (src, dst) {
    var srcAttrs = src.attributes;
    var dstAttrs = dst.attributes;
    var srcAttrsLen = (srcAttrs || 0) && srcAttrs.length;
    var dstAttrsLen = (dstAttrs || 0) && dstAttrs.length;
    var instructions = [];
  
    // Merge attributes that exist in source with destination's.
    for (var a = 0; a < srcAttrsLen; a++) {
      var srcAttr = srcAttrs[a];
      var dstAttr = dstAttrs[srcAttr.name];
  
      if (!dstAttr) {
        instructions.push({
          data: { name: srcAttr.name },
          destination: dst,
          source: src,
          type: types.REMOVE_ATTRIBUTE
        });
      } else if (srcAttr.value !== dstAttr.value) {
        instructions.push({
          data: { name: srcAttr.name },
          destination: dst,
          source: src,
          type: types.SET_ATTRIBUTE
        });
      }
    }
  
    // We only need to worry about setting attributes that don't already exist
    // in the source.
    for (var a = 0; a < dstAttrsLen; a++) {
      var dstAttr = dstAttrs[a];
      var srcAttr = srcAttrs[dstAttr.name];
  
      if (!srcAttr) {
        instructions.push({
          data: { name: dstAttr.name },
          destination: dst,
          source: src,
          type: types.SET_ATTRIBUTE
        });
      }
    }
  
    return instructions;
  };
  
  module.exports = exports['default'];
  
  return module.exports;
}).call(this);

// src/compare/element.js
__8a4ddda1ca8be7b0c056814a3966d1ca = (function () {
  var module = {
    exports: {}
  };
  var exports = module.exports;
  
  'use strict';
  
  Object.defineProperty(exports, '__esModule', {
    value: true
  });
  
  function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }
  
  var _attributes = __bad2e851182eb57480d47d0d1303f9cd;
  
  var _attributes2 = _interopRequireDefault(_attributes);
  
  exports['default'] = function (src, dst) {
    if (src.tagName !== dst.tagName) {
      return false;
    }
    return (0, _attributes2['default'])(src, dst);
  };
  
  module.exports = exports['default'];
  
  return module.exports;
}).call(this);

// src/compare/text.js
__6be3dfb2c966cc1cf98fbc28ab388768 = (function () {
  var module = {
    exports: {}
  };
  var exports = module.exports;
  
  'use strict';
  
  Object.defineProperty(exports, '__esModule', {
    value: true
  });
  
  exports['default'] = function (src, dst) {
    if (src.textContent !== dst.textContent) {
      return false;
    }
  };
  
  module.exports = exports['default'];
  
  return module.exports;
}).call(this);

// src/compare/comment.js
__b61b794da4779d6fe0fb5684b9f98c70 = (function () {
  var module = {
    exports: {}
  };
  var exports = module.exports;
  
  'use strict';
  
  Object.defineProperty(exports, '__esModule', {
    value: true
  });
  
  exports['default'] = function (src, dst) {
    if (src.textContent !== dst.textContent) {
      return false;
    }
  };
  
  module.exports = exports['default'];
  
  return module.exports;
}).call(this);

// src/compare/node.js
__d1a542bf52dea3e669dda0475c050479 = (function () {
  var module = {
    exports: {}
  };
  var exports = module.exports;
  
  'use strict';
  
  Object.defineProperty(exports, '__esModule', {
    value: true
  });
  
  function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }
  
  var _constants = __adcb32fd9f3d922c16eb43f5efa9df76;
  
  var _element = __8a4ddda1ca8be7b0c056814a3966d1ca;
  
  var _element2 = _interopRequireDefault(_element);
  
  var _text = __6be3dfb2c966cc1cf98fbc28ab388768;
  
  var _text2 = _interopRequireDefault(_text);
  
  var _comment = __b61b794da4779d6fe0fb5684b9f98c70;
  
  var _comment2 = _interopRequireDefault(_comment);
  
  var NODE_COMMENT = 8;
  var NODE_ELEMENT = 1;
  var NODE_TEXT = 3;
  
  exports['default'] = function (src, dst) {
    var dstType = undefined,
        srcType = undefined,
        ret = undefined;
  
    if (!dst || !src) {
      return;
    }
  
    // Check to see if it's already claimed.
    if (src[_constants.KEY_NEW_INDEX] > -1) {
      return;
    }
  
    dstType = dst.nodeType;
    srcType = src.nodeType;
  
    if (dstType !== srcType) {
      return;
    } else if (dstType === NODE_ELEMENT) {
      ret = (0, _element2['default'])(src, dst);
    } else if (dstType === NODE_TEXT) {
      ret = (0, _text2['default'])(src, dst);
    } else if (dstType === NODE_COMMENT) {
      ret = (0, _comment2['default'])(src, dst);
    }
  
    // Specific comparisons must actually return false to notify that the node is
    // not the same. This makes for a simpler internal API where specific
    // comparisons only have to worry about returning false, or an array
    // of instructions.
    if (ret === false) {
      return ret;
    }
  
    if (!ret) {
      return [];
    }
  
    return ret;
  };
  
  module.exports = exports['default'];
  
  return module.exports;
}).call(this);

// src/compare/nodes.js
__e17d94f59a8d36c59c30dfc91073ce18 = (function () {
  var module = {
    exports: {}
  };
  var exports = module.exports;
  
  'use strict';
  
  Object.defineProperty(exports, '__esModule', {
    value: true
  });
  
  function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }
  
  var _node = __d1a542bf52dea3e669dda0475c050479;
  
  var _node2 = _interopRequireDefault(_node);
  
  exports['default'] = function (childNodes, child) {
    var childNodesLength = childNodes.length;
    for (var a = 0; a < childNodesLength; a++) {
      var instructions = (0, _node2['default'])(childNodes[a], child);
      if (instructions) {
        return {
          index: a,
          instructions: instructions
        };
      }
    }
    return {
      index: -1,
      instructions: null
    };
  };
  
  module.exports = exports['default'];
  
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
  
  function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }
  
  function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj['default'] = obj; return newObj; } }
  
  var _types = __0ca807667308490ecea534df3b4369b8;
  
  var types = _interopRequireWildcard(_types);
  
  var _constants = __adcb32fd9f3d922c16eb43f5efa9df76;
  
  var _compareNode = __d1a542bf52dea3e669dda0475c050479;
  
  var _compareNode2 = _interopRequireDefault(_compareNode);
  
  var _compareNodes = __e17d94f59a8d36c59c30dfc91073ce18;
  
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
          type: types.REPLACE_CHILD
        }];
      }
    }
  
    // Add nodes that don't exist in the source.
    for (var a = 0; a < dstChsLen; a++) {
      var dstCh = dstChs[a];
      var srcCh = srcChs[a];
      var nodeInstructions = (0, _compareNode2['default'])(srcCh, dstCh);
  
      // If there are instructions, then the nodes are the same so concat those
      // and mark its index so we can ensure it's where it needs to be later.
      if (nodeInstructions) {
        instructions = instructions.concat(nodeInstructions);
        dstInSrcMap.push(dstCh);
        srcInDstMap.push(srcCh);
        srcCh[_constants.KEY_NEW_INDEX] = a;
        continue;
      }
  
      // Now try and find in the source.
      var dstInSrcChs = (0, _compareNodes2['default'])(srcChs, dstCh);
  
      // If the destination is in the source, we add the new key to it so that
      // we can ensure it gets moved to the right spot later.
      if (dstInSrcChs.index > -1) {
        dstInSrcMap.push(dstCh);
        srcInDstMap.push(srcChs[dstInSrcChs.index]);
        srcChs[dstInSrcChs.index][_constants.KEY_NEW_INDEX] = a;
        instructions = instructions.concat(dstInSrcChs.instructions);
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
      // prepend.
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
      if (srcCh[_constants.KEY_NEW_INDEX] > -1) {
        moves.push({
          destination: srcCh[_constants.KEY_NEW_INDEX],
          source: srcCh,
          type: types.MOVE_TO
        });
        delete srcCh[_constants.KEY_NEW_INDEX];
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
  
  module.exports = exports['default'];
  
  return module.exports;
}).call(this);

// src/patch/append-child.js
__3ed6aa44bf4d6b9365bed745b80029cf = (function () {
  var module = {
    exports: {}
  };
  var exports = module.exports;
  
  'use strict';
  
  Object.defineProperty(exports, '__esModule', {
    value: true
  });
  
  exports['default'] = function (src, dst) {
    src.appendChild(dst);
  };
  
  module.exports = exports['default'];
  
  return module.exports;
}).call(this);

// src/patch/insert-before.js
__7b296fa3be589da51b3b5ca50b276cc1 = (function () {
  var module = {
    exports: {}
  };
  var exports = module.exports;
  
  'use strict';
  
  Object.defineProperty(exports, '__esModule', {
    value: true
  });
  
  exports['default'] = function (src, dst) {
    src.parentNode.insertBefore(dst, src);
  };
  
  module.exports = exports['default'];
  
  return module.exports;
}).call(this);

// src/patch/move-to.js
__b3a28d67943501566807f7a8f644e43e = (function () {
  var module = {
    exports: {}
  };
  var exports = module.exports;
  
  'use strict';
  
  Object.defineProperty(exports, '__esModule', {
    value: true
  });
  
  exports['default'] = function (src, dstIndex) {
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
  
  module.exports = exports['default'];
  
  return module.exports;
}).call(this);

// src/patch/remove-attribute.js
__9bbe6d2e49edcd9d91aac0c352f01bb0 = (function () {
  var module = {
    exports: {}
  };
  var exports = module.exports;
  
  'use strict';
  
  Object.defineProperty(exports, '__esModule', {
    value: true
  });
  
  exports['default'] = function (src, dst, data) {
    src.removeAttribute(data.name);
  };
  
  module.exports = exports['default'];
  
  return module.exports;
}).call(this);

// src/patch/remove-child.js
__b306d2b34b0fbb399cbb13b5dc7dd96a = (function () {
  var module = {
    exports: {}
  };
  var exports = module.exports;
  
  'use strict';
  
  Object.defineProperty(exports, '__esModule', {
    value: true
  });
  
  exports['default'] = function (src) {
    src.parentNode.removeChild(src);
  };
  
  module.exports = exports['default'];
  
  return module.exports;
}).call(this);

// src/patch/replace-child.js
__36e2ac600d355b297d4888bed8e557b1 = (function () {
  var module = {
    exports: {}
  };
  var exports = module.exports;
  
  'use strict';
  
  Object.defineProperty(exports, '__esModule', {
    value: true
  });
  
  exports['default'] = function (src, dst) {
    src.parentNode.replaceChild(dst, src);
  };
  
  module.exports = exports['default'];
  
  return module.exports;
}).call(this);

// src/patch/set-attribute.js
__3a0f75dfacfe0f1a25269b7ec38195ba = (function () {
  var module = {
    exports: {}
  };
  var exports = module.exports;
  
  'use strict';
  
  Object.defineProperty(exports, '__esModule', {
    value: true
  });
  
  exports['default'] = function (src, dst, data) {
    src.setAttribute(data.name, dst.getAttribute(data.name));
  };
  
  module.exports = exports['default'];
  
  return module.exports;
}).call(this);

// src/patch/text-content.js
__2ecd35541218022de8f33fe72ae13c79 = (function () {
  var module = {
    exports: {}
  };
  var exports = module.exports;
  
  'use strict';
  
  Object.defineProperty(exports, '__esModule', {
    value: true
  });
  
  exports['default'] = function (src, dst) {
    src.textContent = dst.textContent;
  };
  
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
  
  function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }
  
  function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj['default'] = obj; return newObj; } }
  
  var _types = __0ca807667308490ecea534df3b4369b8;
  
  var types = _interopRequireWildcard(_types);
  
  var _patchAppendChild = __3ed6aa44bf4d6b9365bed745b80029cf;
  
  var _patchAppendChild2 = _interopRequireDefault(_patchAppendChild);
  
  var _patchInsertBefore = __7b296fa3be589da51b3b5ca50b276cc1;
  
  var _patchInsertBefore2 = _interopRequireDefault(_patchInsertBefore);
  
  var _patchMoveTo = __b3a28d67943501566807f7a8f644e43e;
  
  var _patchMoveTo2 = _interopRequireDefault(_patchMoveTo);
  
  var _patchRemoveAttribute = __9bbe6d2e49edcd9d91aac0c352f01bb0;
  
  var _patchRemoveAttribute2 = _interopRequireDefault(_patchRemoveAttribute);
  
  var _patchRemoveChild = __b306d2b34b0fbb399cbb13b5dc7dd96a;
  
  var _patchRemoveChild2 = _interopRequireDefault(_patchRemoveChild);
  
  var _patchReplaceChild = __36e2ac600d355b297d4888bed8e557b1;
  
  var _patchReplaceChild2 = _interopRequireDefault(_patchReplaceChild);
  
  var _patchSetAttribute = __3a0f75dfacfe0f1a25269b7ec38195ba;
  
  var _patchSetAttribute2 = _interopRequireDefault(_patchSetAttribute);
  
  var _patchTextContent = __2ecd35541218022de8f33fe72ae13c79;
  
  var _patchTextContent2 = _interopRequireDefault(_patchTextContent);
  
  var patchers = {};
  patchers[types.APPEND_CHILD] = _patchAppendChild2['default'];
  patchers[types.INSERT_BEFORE] = _patchInsertBefore2['default'];
  patchers[types.MOVE_TO] = _patchMoveTo2['default'];
  patchers[types.REMOVE_ATTRIBUTE] = _patchRemoveAttribute2['default'];
  patchers[types.REMOVE_CHILD] = _patchRemoveChild2['default'];
  patchers[types.REPLACE_CHILD] = _patchReplaceChild2['default'];
  patchers[types.SET_ATTRIBUTE] = _patchSetAttribute2['default'];
  patchers[types.TEXT_CONTENT] = _patchTextContent2['default'];
  
  function patch(instruction) {
    patchers[instruction.type](instruction.source, instruction.destination, instruction.data);
  }
  
  exports['default'] = function (instructions) {
    instructions.forEach(patch);
  };
  
  module.exports = exports['default'];
  
  return module.exports;
}).call(this);

// src/merge.js
__397f1a21725eb3fd4fbf51ee69fe1006 = (function () {
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
  
  exports['default'] = function (opts) {
    (0, _patch2['default'])((0, _diff2['default'])(opts));
    return opts.source;
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
  
  var _merge = __397f1a21725eb3fd4fbf51ee69fe1006;
  
  var _merge2 = _interopRequireDefault(_merge);
  
  var _patch = __d49832510105705a679155ef252b6786;
  
  var _patch2 = _interopRequireDefault(_patch);
  
  var _types = __0ca807667308490ecea534df3b4369b8;
  
  var _types2 = _interopRequireDefault(_types);
  
  exports['default'] = window.skateDomDiff = {
    diff: _diff2['default'],
    merge: _merge2['default'],
    patch: _patch2['default'],
    types: _types2['default']
  };
  module.exports = exports['default'];
  
  return module.exports;
}).call(this);