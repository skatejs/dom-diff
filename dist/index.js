// src/types.js
(typeof window === 'undefined' ? global : window).__0ca807667308490ecea534df3b4369b8 = (function () {
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
  var SET_EVENT = 6;
  exports.SET_EVENT = SET_EVENT;
  var SET_PROPERTY = 7;
  exports.SET_PROPERTY = SET_PROPERTY;
  var TEXT_CONTENT = 8;
  exports.TEXT_CONTENT = TEXT_CONTENT;
  
  return module.exports;
}).call(this);
// src/compare/attributes.js
(typeof window === 'undefined' ? global : window).__bad2e851182eb57480d47d0d1303f9cd = (function () {
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
  
    // Bail early if possible.
    if (!srcAttrsLen && !dstAttrsLen) {
      return instructions;
    }
  
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
          data: { name: srcAttr.name, value: dstAttr.value },
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
          data: { name: dstAttr.name, value: dstAttr.value },
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
// src/compare/events.js
(typeof window === 'undefined' ? global : window).__34fcf97edbfdec192096e8fcd1833156 = (function () {
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
    var dstEvents = dst.events;
    var instructions = [];
  
    if (!dstEvents) {
      return instructions;
    }
  
    for (var a in dstEvents) {
      var dstEvent = dstEvents[a];
  
      // Hack, as stated elsewhere, but we need to refer to the old event
      // handler. We only want to apply a patch if it's changed.
      if (src['__events_' + a] !== dstEvent) {
        instructions.push({
          data: { name: a, value: dstEvent },
          destination: dst,
          source: src,
          type: types.SET_EVENT
        });
      }
    }
  
    return instructions;
  };
  
  module.exports = exports['default'];
  
  return module.exports;
}).call(this);
// src/compare/properties.js
(typeof window === 'undefined' ? global : window).__64df7535a04c95c1d53e467370a46bf6 = (function () {
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
    // We only use destination prop specs since it could be a vDOM.
    var srcProps = src.properties || src;
    var dstProps = dst.properties;
    var instructions = [];
  
    // Bail early if possible.
    if (!dstProps) {
      return instructions;
    }
  
    // We use the destination prop spec as the source of truth.
    for (var a in dstProps) {
      var srcProp = srcProps[a];
      var dstProp = dstProps[a];
  
      if (srcProp !== dstProp) {
        instructions.push({
          data: { name: a, value: dstProp },
          destination: dst,
          source: src,
          type: types.SET_PROPERTY
        });
      }
    }
  
    return instructions;
  };
  
  module.exports = exports['default'];
  
  return module.exports;
}).call(this);
// src/compare/element.js
(typeof window === 'undefined' ? global : window).__8a4ddda1ca8be7b0c056814a3966d1ca = (function () {
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
  
  var _events = __34fcf97edbfdec192096e8fcd1833156;
  
  var _events2 = _interopRequireDefault(_events);
  
  var _properties = __64df7535a04c95c1d53e467370a46bf6;
  
  var _properties2 = _interopRequireDefault(_properties);
  
  exports['default'] = function (src, dst) {
    if (src.tagName === dst.tagName) {
      return (0, _attributes2['default'])(src, dst).concat((0, _events2['default'])(src, dst)).concat((0, _properties2['default'])(src, dst));
    }
  };
  
  module.exports = exports['default'];
  
  return module.exports;
}).call(this);
// src/compare/text.js
(typeof window === 'undefined' ? global : window).__6be3dfb2c966cc1cf98fbc28ab388768 = (function () {
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
(typeof window === 'undefined' ? global : window).__b61b794da4779d6fe0fb5684b9f98c70 = (function () {
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
(typeof window === 'undefined' ? global : window).__d1a542bf52dea3e669dda0475c050479 = (function () {
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
        srcType = undefined;
  
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
(typeof window === 'undefined' ? global : window).__22dce1b31df73fb8f06bda10d9498f07 = (function () {
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
  
  var _compareNode = __d1a542bf52dea3e669dda0475c050479;
  
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
          type: types.APPEND_CHILD
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
// src/vdom/dom.js
(typeof window === 'undefined' ? global : window).__c672b2ab009d1b5af8a22c830a9d5ab6 = (function () {
  var module = {
    exports: {}
  };
  var exports = module.exports;
  
  'use strict';
  
  Object.defineProperty(exports, '__esModule', {
    value: true
  });
  exports['default'] = render;
  function createElement(el) {
    var realNode = document.createElement(el.tagName);
    var attributes = el.attributes;
    var events = el.events;
    var properties = el.properties;
  
    if (attributes) {
      var attributesLen = attributes.length;
      for (var a = 0; a < attributesLen; a++) {
        var attr = attributes[a];
        var _name = attr.name;
        var value = attr.value;
        realNode.setAttribute(_name, value);
      }
    }
  
    if (events) {
      for (var _name2 in events) {
        var handler = events[_name2];
        if (typeof handler === 'function') {
          // This is a hack, but there's no way to get a handler for a specific
          // event bound to an element so we have to store the handler on it so
          // that the patcher can later unbind it when setting a new event
          // listener when / if the value changes.
          realNode['__events_' + _name2] = handler;
          realNode.addEventListener(_name2, handler);
        }
      }
    }
  
    if (properties) {
      for (var _name3 in properties) {
        var value = properties[_name3];
        if (_name3 === 'content') {
          if (Array.isArray(value)) {
            value.forEach(function (ch) {
              return realNode.appendChild(render(ch));
            });
          } else {
            realNode.appendChild(render(value));
          }
        } else if (typeof value !== 'undefined') {
          realNode[_name3] = value;
        }
      }
    }
  
    if (el.childNodes) {
      var frag = document.createDocumentFragment();
  
      for (var a = 0; a < el.childNodes.length; a++) {
        var ch = el.childNodes[a];
        if (ch) {
          frag.appendChild(render(ch));
        }
      }
  
      if (realNode.hasOwnProperty('content')) {
        realNode.content = frag;
      } else {
        realNode.appendChild(frag);
      }
    }
  
    return realNode;
  }
  
  function createText(el) {
    return document.createTextNode(el.textContent);
  }
  
  function render(el) {
    if (el instanceof Node) {
      return el;
    }
    var realNode = el.tagName ? createElement(el) : createText(el);
    return el.__realNode = realNode;
  }
  
  module.exports = exports['default'];
  
  return module.exports;
}).call(this);
// src/util/real-node.js
(typeof window === 'undefined' ? global : window).__5867064010dd8ce98a03e6d693c0b368 = (function () {
  var module = {
    exports: {}
  };
  var exports = module.exports;
  
  "use strict";
  
  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  
  exports["default"] = function (node) {
    return node instanceof Node ? node : node.__realNode;
  };
  
  module.exports = exports["default"];
  
  return module.exports;
}).call(this);
// src/patch/append-child.js
(typeof window === 'undefined' ? global : window).__3ed6aa44bf4d6b9365bed745b80029cf = (function () {
  var module = {
    exports: {}
  };
  var exports = module.exports;
  
  'use strict';
  
  Object.defineProperty(exports, '__esModule', {
    value: true
  });
  
  function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }
  
  var _vdomDom = __c672b2ab009d1b5af8a22c830a9d5ab6;
  
  var _vdomDom2 = _interopRequireDefault(_vdomDom);
  
  var _utilRealNode = __5867064010dd8ce98a03e6d693c0b368;
  
  var _utilRealNode2 = _interopRequireDefault(_utilRealNode);
  
  exports['default'] = function (src, dst) {
    (0, _utilRealNode2['default'])(src).appendChild((0, _vdomDom2['default'])(dst));
  };
  
  module.exports = exports['default'];
  
  return module.exports;
}).call(this);
// src/patch/remove-attribute.js
(typeof window === 'undefined' ? global : window).__9bbe6d2e49edcd9d91aac0c352f01bb0 = (function () {
  var module = {
    exports: {}
  };
  var exports = module.exports;
  
  'use strict';
  
  Object.defineProperty(exports, '__esModule', {
    value: true
  });
  
  function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }
  
  var _utilRealNode = __5867064010dd8ce98a03e6d693c0b368;
  
  var _utilRealNode2 = _interopRequireDefault(_utilRealNode);
  
  exports['default'] = function (src, dst, data) {
    var node = (0, _utilRealNode2['default'])(src);
    node.removeAttribute(data.name);
  };
  
  module.exports = exports['default'];
  
  return module.exports;
}).call(this);
// src/patch/remove-child.js
(typeof window === 'undefined' ? global : window).__b306d2b34b0fbb399cbb13b5dc7dd96a = (function () {
  var module = {
    exports: {}
  };
  var exports = module.exports;
  
  'use strict';
  
  Object.defineProperty(exports, '__esModule', {
    value: true
  });
  
  function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }
  
  var _utilRealNode = __5867064010dd8ce98a03e6d693c0b368;
  
  var _utilRealNode2 = _interopRequireDefault(_utilRealNode);
  
  exports['default'] = function (src, dst) {
    var realDst = (0, _utilRealNode2['default'])(dst);
    realDst.parentNode.removeChild(realDst);
  };
  
  module.exports = exports['default'];
  
  return module.exports;
}).call(this);
// src/patch/replace-child.js
(typeof window === 'undefined' ? global : window).__36e2ac600d355b297d4888bed8e557b1 = (function () {
  var module = {
    exports: {}
  };
  var exports = module.exports;
  
  'use strict';
  
  Object.defineProperty(exports, '__esModule', {
    value: true
  });
  
  function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }
  
  var _vdomDom = __c672b2ab009d1b5af8a22c830a9d5ab6;
  
  var _vdomDom2 = _interopRequireDefault(_vdomDom);
  
  var _utilRealNode = __5867064010dd8ce98a03e6d693c0b368;
  
  var _utilRealNode2 = _interopRequireDefault(_utilRealNode);
  
  exports['default'] = function (src, dst) {
    var realNodeSrc = (0, _utilRealNode2['default'])(src);
    realNodeSrc && realNodeSrc.parentNode && realNodeSrc.parentNode.replaceChild((0, _vdomDom2['default'])(dst), realNodeSrc);
  };
  
  module.exports = exports['default'];
  
  return module.exports;
}).call(this);
// src/patch/set-attribute.js
(typeof window === 'undefined' ? global : window).__3a0f75dfacfe0f1a25269b7ec38195ba = (function () {
  var module = {
    exports: {}
  };
  var exports = module.exports;
  
  'use strict';
  
  Object.defineProperty(exports, '__esModule', {
    value: true
  });
  
  function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }
  
  var _utilRealNode = __5867064010dd8ce98a03e6d693c0b368;
  
  var _utilRealNode2 = _interopRequireDefault(_utilRealNode);
  
  exports['default'] = function (src, dst, data) {
    var node = (0, _utilRealNode2['default'])(src);
    node.setAttribute(data.name, data.value);
  };
  
  module.exports = exports['default'];
  
  return module.exports;
}).call(this);
// src/patch/set-event.js
(typeof window === 'undefined' ? global : window).__9ec9c3aabc290894371d127fb1088492 = (function () {
  var module = {
    exports: {}
  };
  var exports = module.exports;
  
  'use strict';
  
  Object.defineProperty(exports, '__esModule', {
    value: true
  });
  
  function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }
  
  var _utilRealNode = __5867064010dd8ce98a03e6d693c0b368;
  
  var _utilRealNode2 = _interopRequireDefault(_utilRealNode);
  
  exports['default'] = function (src, dst, data) {
    var node = (0, _utilRealNode2['default'])(src);
    var name = data.name;
    var func = data.value;
  
    // This is a hack as described in the vDOM -> DOM creation function but we
    // need to be able to unbind the previous event handler otherwise events may
    // stack causing major issues.
    var temp = '__events_' + name;
    node.removeEventListener(name, node[temp]);
    node.addEventListener(name, node[temp] = func);
  };
  
  module.exports = exports['default'];
  
  return module.exports;
}).call(this);
// src/patch/set-property.js
(typeof window === 'undefined' ? global : window).__6c15bb643eba896c1c9d7e9c23db0b2b = (function () {
  var module = {
    exports: {}
  };
  var exports = module.exports;
  
  'use strict';
  
  Object.defineProperty(exports, '__esModule', {
    value: true
  });
  
  function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }
  
  var _utilRealNode = __5867064010dd8ce98a03e6d693c0b368;
  
  var _utilRealNode2 = _interopRequireDefault(_utilRealNode);
  
  exports['default'] = function (src, dst, data) {
    var node = (0, _utilRealNode2['default'])(src);
    node[data.name] = data.value;
  };
  
  module.exports = exports['default'];
  
  return module.exports;
}).call(this);
// src/patch/text-content.js
(typeof window === 'undefined' ? global : window).__2ecd35541218022de8f33fe72ae13c79 = (function () {
  var module = {
    exports: {}
  };
  var exports = module.exports;
  
  'use strict';
  
  Object.defineProperty(exports, '__esModule', {
    value: true
  });
  
  function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }
  
  var _utilRealNode = __5867064010dd8ce98a03e6d693c0b368;
  
  var _utilRealNode2 = _interopRequireDefault(_utilRealNode);
  
  exports['default'] = function (src, dst) {
    (0, _utilRealNode2['default'])(src).textContent = dst.textContent;
  };
  
  module.exports = exports['default'];
  
  return module.exports;
}).call(this);
// src/patch.js
(typeof window === 'undefined' ? global : window).__d49832510105705a679155ef252b6786 = (function () {
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
  
  var _patchSetEvent = __9ec9c3aabc290894371d127fb1088492;
  
  var _patchSetEvent2 = _interopRequireDefault(_patchSetEvent);
  
  var _patchSetProperty = __6c15bb643eba896c1c9d7e9c23db0b2b;
  
  var _patchSetProperty2 = _interopRequireDefault(_patchSetProperty);
  
  var _patchTextContent = __2ecd35541218022de8f33fe72ae13c79;
  
  var _patchTextContent2 = _interopRequireDefault(_patchTextContent);
  
  var patchers = {};
  patchers[types.APPEND_CHILD] = _patchAppendChild2['default'];
  patchers[types.REMOVE_ATTRIBUTE] = _patchRemoveAttribute2['default'];
  patchers[types.REMOVE_CHILD] = _patchRemoveChild2['default'];
  patchers[types.REPLACE_CHILD] = _patchReplaceChild2['default'];
  patchers[types.SET_ATTRIBUTE] = _patchSetAttribute2['default'];
  patchers[types.SET_EVENT] = _patchSetEvent2['default'];
  patchers[types.SET_PROPERTY] = _patchSetProperty2['default'];
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
(typeof window === 'undefined' ? global : window).__397f1a21725eb3fd4fbf51ee69fe1006 = (function () {
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
    var inst = (0, _diff2['default'])(opts);
    (0, _patch2['default'])(inst);
    return inst;
  };
  
  module.exports = exports['default'];
  
  return module.exports;
}).call(this);
// src/vdom/text.js
(typeof window === 'undefined' ? global : window).__a6dacf85b92d2d194c29d40bfdfc8927 = (function () {
  var module = {
    exports: {}
  };
  var exports = module.exports;
  
  "use strict";
  
  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports["default"] = createTextNode;
  
  function createTextNode(item) {
    return {
      nodeType: 3,
      textContent: item
    };
  }
  
  module.exports = exports["default"];
  
  return module.exports;
}).call(this);
// src/vdom/element.js
(typeof window === 'undefined' ? global : window).__90cd00536bcb3b42d1659021f5337f5f = (function () {
  var module = {
    exports: {}
  };
  var exports = module.exports;
  
  'use strict';
  
  Object.defineProperty(exports, '__esModule', {
    value: true
  });
  
  function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }
  
  var _text = __a6dacf85b92d2d194c29d40bfdfc8927;
  
  var _text2 = _interopRequireDefault(_text);
  
  function separateData(obj) {
    var attrs = {};
    var events = {};
    var props = {};
    var attrIdx = 0;
  
    for (var _name in obj) {
      var value = obj[_name];
  
      if (typeof value === 'string') {
        attrs[attrIdx++] = attrs[_name] = { name: _name, value: value };
      } else if (_name.indexOf('on') === 0) {
        events[_name.substring(2)] = value;
      } else {
        props[_name] = value;
      }
    }
  
    attrs.length = attrIdx;
    return { attrs: attrs, events: events, props: props };
  }
  
  function ensureNodes(arr) {
    var out = [];
    arr.filter(Boolean).forEach(function (item) {
      if (Array.isArray(item)) {
        out = out.concat(ensureNodes(item));
      } else if (typeof item === 'object') {
        out.push(item);
      } else {
        out.push((0, _text2['default'])(item));
      }
    });
    return out;
  }
  
  function ensureTagName(name) {
    return (typeof name === 'function' ? name.id || name.name : name).toUpperCase();
  }
  
  exports['default'] = function (name) {
    var attrs = arguments.length <= 1 || arguments[1] === undefined ? {} : arguments[1];
  
    var data = separateData(attrs);
  
    for (var _len = arguments.length, chren = Array(_len > 2 ? _len - 2 : 0), _key = 2; _key < _len; _key++) {
      chren[_key - 2] = arguments[_key];
    }
  
    return {
      nodeType: 1,
      tagName: ensureTagName(name),
      attributes: data.attrs,
      events: data.events,
      properties: data.props,
      childNodes: ensureNodes(chren)
    };
  };
  
  module.exports = exports['default'];
  
  return module.exports;
}).call(this);
// src/vdom/mount.js
(typeof window === 'undefined' ? global : window).__64984ff90aff8eb27308803984d99dfd = (function () {
  var module = {
    exports: {}
  };
  var exports = module.exports;
  
  'use strict';
  
  Object.defineProperty(exports, '__esModule', {
    value: true
  });
  
  function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }
  
  var _dom = __c672b2ab009d1b5af8a22c830a9d5ab6;
  
  var _dom2 = _interopRequireDefault(_dom);
  
  exports['default'] = function (elem, tree) {
    while (elem.firstChild) elem.firstChild.remove();
    elem.appendChild((0, _dom2['default'])(tree));
  };
  
  module.exports = exports['default'];
  
  return module.exports;
}).call(this);
// src/render.js
(typeof window === 'undefined' ? global : window).__7716f1488710dcad35ac89f2ee13769f = (function () {
  var module = {
    exports: {}
  };
  var exports = module.exports;
  
  'use strict';
  
  Object.defineProperty(exports, '__esModule', {
    value: true
  });
  
  function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }
  
  var _vdomElement = __90cd00536bcb3b42d1659021f5337f5f;
  
  var _vdomElement2 = _interopRequireDefault(_vdomElement);
  
  var _merge = __397f1a21725eb3fd4fbf51ee69fe1006;
  
  var _merge2 = _interopRequireDefault(_merge);
  
  var _vdomMount = __64984ff90aff8eb27308803984d99dfd;
  
  var _vdomMount2 = _interopRequireDefault(_vdomMount);
  
  var Node = window.Node;
  
  exports['default'] = function (render) {
    return function (elem) {
      elem = elem instanceof Node ? elem : this;
  
      if (!elem instanceof Node) {
        throw new Error('No node provided to diff renderer as either the first argument or the context.');
      }
  
      // Create a new element to house the new tree since we diff fragments.
      var newTree = (0, _vdomElement2['default'])('div', null, render(elem, { createElement: _vdomElement2['default'] }));
      if (elem.__oldTree) {
        (0, _merge2['default'])({
          destination: newTree,
          source: elem.__oldTree
        });
      } else {
        (0, _vdomMount2['default'])(elem, newTree.childNodes[0]);
      }
      elem.__oldTree = newTree;
    };
  };
  
  module.exports = exports['default'];
  
  return module.exports;
}).call(this);
// src/vdom/index.js
(typeof window === 'undefined' ? global : window).__1642ccd4766a5b54382caa2ba439f592 = (function () {
  var module = {
    exports: {}
  };
  var exports = module.exports;
  
  'use strict';
  
  Object.defineProperty(exports, '__esModule', {
    value: true
  });
  
  function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }
  
  var _dom = __c672b2ab009d1b5af8a22c830a9d5ab6;
  
  var _dom2 = _interopRequireDefault(_dom);
  
  var _element = __90cd00536bcb3b42d1659021f5337f5f;
  
  var _element2 = _interopRequireDefault(_element);
  
  var _mount = __64984ff90aff8eb27308803984d99dfd;
  
  var _mount2 = _interopRequireDefault(_mount);
  
  var _text = __a6dacf85b92d2d194c29d40bfdfc8927;
  
  var _text2 = _interopRequireDefault(_text);
  
  exports['default'] = {
    dom: _dom2['default'],
    element: _element2['default'],
    mount: _mount2['default'],
    text: _text2['default']
  };
  module.exports = exports['default'];
  
  return module.exports;
}).call(this);
// src/index.js
(typeof window === 'undefined' ? global : window).__d0534c9e7312e01df51511bab04ed9e4 = (function () {
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
  
  var _render = __7716f1488710dcad35ac89f2ee13769f;
  
  var _render2 = _interopRequireDefault(_render);
  
  var _types = __0ca807667308490ecea534df3b4369b8;
  
  var _types2 = _interopRequireDefault(_types);
  
  var _vdom = __1642ccd4766a5b54382caa2ba439f592;
  
  var _vdom2 = _interopRequireDefault(_vdom);
  
  exports['default'] = {
    diff: _diff2['default'],
    merge: _merge2['default'],
    patch: _patch2['default'],
    render: _render2['default'],
    types: _types2['default'],
    vdom: _vdom2['default']
  };
  module.exports = exports['default'];
  
  return module.exports;
}).call(this);
// src/global.js
(typeof window === 'undefined' ? global : window).__a072583ef3bdddb0fc56ec2a2194ea95 = (function () {
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