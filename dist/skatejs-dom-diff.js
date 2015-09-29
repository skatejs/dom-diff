// src/types.js
__0ca807667308490ecea534df3b4369b8 = (function () {
  var module = {
    exports: {}
  };
  var exports = module.exports;
  
  "use strict";
  
  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  var APPEND_CHILD = 1;
  exports.APPEND_CHILD = APPEND_CHILD;
  var REMOVE_CHILD = 2;
  exports.REMOVE_CHILD = REMOVE_CHILD;
  var REMOVE_ATTRIBUTE = 3;
  exports.REMOVE_ATTRIBUTE = REMOVE_ATTRIBUTE;
  var REPLACE_CHILD = 4;
  exports.REPLACE_CHILD = REPLACE_CHILD;
  var SET_ATTRIBUTE = 5;
  exports.SET_ATTRIBUTE = SET_ATTRIBUTE;
  var TEXT_CONTENT = 6;
  exports.TEXT_CONTENT = TEXT_CONTENT;
  
  return module.exports;
}).call(this);
// node_modules/object-assign/index.js
__5b5233f7d04c59f0f45fe5fa7d6cb57c = (function () {
  var module = {
    exports: {}
  };
  var exports = module.exports;
  
  /* eslint-disable no-unused-vars */
  var hasOwnProperty = Object.prototype.hasOwnProperty;
  var propIsEnumerable = Object.prototype.propertyIsEnumerable;
  
  function toObject(val) {
  	if (val === null || val === undefined) {
  		throw new TypeError('Object.assign cannot be called with null or undefined');
  	}
  
  	return Object(val);
  }
  
  module.exports = Object.assign || function (target, source) {
  	var from;
  	var to = toObject(target);
  	var symbols;
  
  	for (var s = 1; s < arguments.length; s++) {
  		from = Object(arguments[s]);
  
  		for (var key in from) {
  			if (hasOwnProperty.call(from, key)) {
  				to[key] = from[key];
  			}
  		}
  
  		if (Object.getOwnPropertySymbols) {
  			symbols = Object.getOwnPropertySymbols(from);
  			for (var i = 0; i < symbols.length; i++) {
  				if (propIsEnumerable.call(from, symbols[i])) {
  					to[symbols[i]] = from[symbols[i]];
  				}
  			}
  		}
  	}
  
  	return to;
  };
  
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
    if (src.tagName === dst.tagName) {
      return (0, _attributes2['default'])(src, dst);
    }
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
  
  function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj['default'] = obj; return newObj; } }
  
  var _types = __0ca807667308490ecea534df3b4369b8;
  
  var types = _interopRequireWildcard(_types);
  
  exports['default'] = function (src, dst) {
    if (src.textContent === dst.textContent) {
      return [];
    }
  
    return [{
      destination: dst,
      source: src,
      type: types.TEXT_CONTENT
    }];
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
  
  function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }
  
  var _text = __6be3dfb2c966cc1cf98fbc28ab388768;
  
  var _text2 = _interopRequireDefault(_text);
  
  exports['default'] = _text2['default'];
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
  
    dstType = dst.nodeType;
    srcType = src.nodeType;
  
    if (dstType !== srcType) {
      return;
    } else if (dstType === NODE_ELEMENT) {
      return (0, _element2['default'])(src, dst);
    } else if (dstType === NODE_TEXT) {
      return (0, _text2['default'])(src, dst);
    } else if (dstType === NODE_COMMENT) {
      return (0, _comment2['default'])(src, dst);
    }
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
  
  var _objectAssign = __5b5233f7d04c59f0f45fe5fa7d6cb57c;
  
  var _objectAssign2 = _interopRequireDefault(_objectAssign);
  
  var _compareNode = __d1a542bf52dea3e669dda0475c050479;
  
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
          type: types.APPEND_CHILD
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
          instructions = instructions.concat(diff((0, _objectAssign2['default'])(opts, {
            destination: curDst,
            source: curSrc
          })));
        }
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
  
  return module.exports;
}).call(this);
// src/patch/append-child.js
__3ed6aa44bf4d6b9365bed745b80029cf = (function () {
  var module = {
    exports: {}
  };
  var exports = module.exports;
  
  "use strict";
  
  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  
  exports["default"] = function (src, dst) {
    src.appendChild(dst);
  };
  
  module.exports = exports["default"];
  
  return module.exports;
}).call(this);
// src/patch/remove-attribute.js
__9bbe6d2e49edcd9d91aac0c352f01bb0 = (function () {
  var module = {
    exports: {}
  };
  var exports = module.exports;
  
  "use strict";
  
  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  
  exports["default"] = function (src, dst, data) {
    src.removeAttribute(data.name);
  };
  
  module.exports = exports["default"];
  
  return module.exports;
}).call(this);
// src/patch/remove-child.js
__b306d2b34b0fbb399cbb13b5dc7dd96a = (function () {
  var module = {
    exports: {}
  };
  var exports = module.exports;
  
  "use strict";
  
  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  
  exports["default"] = function (src, dst) {
    src.removeChild(dst);
  };
  
  module.exports = exports["default"];
  
  return module.exports;
}).call(this);
// src/patch/replace-child.js
__36e2ac600d355b297d4888bed8e557b1 = (function () {
  var module = {
    exports: {}
  };
  var exports = module.exports;
  
  "use strict";
  
  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  
  exports["default"] = function (src, dst) {
    src.parentNode.replaceChild(dst, src);
  };
  
  module.exports = exports["default"];
  
  return module.exports;
}).call(this);
// src/patch/set-attribute.js
__3a0f75dfacfe0f1a25269b7ec38195ba = (function () {
  var module = {
    exports: {}
  };
  var exports = module.exports;
  
  "use strict";
  
  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  
  exports["default"] = function (src, dst, data) {
    src.setAttribute(data.name, dst.getAttribute(data.name));
  };
  
  module.exports = exports["default"];
  
  return module.exports;
}).call(this);
// src/patch/text-content.js
__2ecd35541218022de8f33fe72ae13c79 = (function () {
  var module = {
    exports: {}
  };
  var exports = module.exports;
  
  "use strict";
  
  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  
  exports["default"] = function (src, dst) {
    src.textContent = dst.textContent;
  };
  
  module.exports = exports["default"];
  
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
  
  exports['default'] = {
    diff: _diff2['default'],
    merge: _merge2['default'],
    patch: _patch2['default'],
    types: _types2['default']
  };
  module.exports = exports['default'];
  
  return module.exports;
}).call(this);
// src/global.js
__a072583ef3bdddb0fc56ec2a2194ea95 = (function () {
  var module = {
    exports: {}
  };
  var exports = module.exports;
  
  'use strict';
  
  function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }
  
  var _index = __d0534c9e7312e01df51511bab04ed9e4;
  
  var _index2 = _interopRequireDefault(_index);
  
  window.skateDomDiff = _index2['default'];
  
  return module.exports;
}).call(this);