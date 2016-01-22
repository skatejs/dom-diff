// src/types.js
(typeof window === 'undefined' ? global : window).__306adb5c6fd9dc9c0701f97d61c88c29 = (function () {
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
// src/util/accessor.js
(typeof window === 'undefined' ? global : window).__67e3bc52527f64dd454cbf743becd3ce = (function () {
  var module = {
    exports: {}
  };
  var exports = module.exports;
  
  'use strict';
  
  Object.defineProperty(exports, '__esModule', {
    value: true
  });
  exports.getAccessor = getAccessor;
  exports.mapAccessor = mapAccessor;
  exports.removeAccessor = removeAccessor;
  exports.setAccessor = setAccessor;
  
  function getAccessor(node, name) {
    if (name === 'class') {
      return node.className;
    } else if (name === 'style') {
      return node.style.cssText;
      // most things
    } else if (name !== 'type' && name in node) {
        return node[name];
        // real DOM elements
      } else if (node.getAttribute) {
          return node.getAttribute(name);
          // vDOM nodes
        } else if (node.attributes && node.attributes[name]) {
            return node.attributes[name].value;
          }
  }
  
  function mapAccessor(node, name, value) {
    if (name === 'class') {
      node.className = value;
    } else if (name === 'style') {
      node.style = { cssText: value };
    }
  }
  
  function removeAccessor(node, name) {
    if (name === 'class') {
      node.className = '';
    } else if (name === 'style') {
      node.style.cssText = '';
      // most things
    } else if (name !== 'type' && name in node) {
        node[name] = '';
        // real DOM elements
      } else if (node.removeAttribute) {
          node.removeAttribute(name);
          // vDOM nodes
        } else if (node.attributes) {
            delete node.attributes[name];
          }
  }
  
  function setAccessor(node, name, value) {
    if (name === 'class') {
      node.className = value;
    } else if (name === 'style') {
      node.style.cssText = value;
      // most things
    } else if (name !== 'type' && name in node || typeof value !== 'string') {
        // We check if it's undefined or null because IE throws "invalid argument"
        // errors for some types of properties. Essentially this is the same as
        // removing the accessor.
        node[name] = value == null ? '' : value;
        // real DOM elements
      } else if (node.setAttribute) {
          node.setAttribute(name, value);
          // vDOM nodes
        } else if (node.attributes) {
            node.attributes[node.attributes.length] = node.attributes[name] = { name: name, value: value };
          }
  }
  
  return module.exports;
}).call(this);
// src/compare/attributes.js
(typeof window === 'undefined' ? global : window).__9121c7689d7449da988fa114a9538a75 = (function () {
  var module = {
    exports: {}
  };
  var exports = module.exports;
  
  'use strict';
  
  Object.defineProperty(exports, '__esModule', {
    value: true
  });
  
  function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj['default'] = obj; return newObj; } }
  
  var _types = __306adb5c6fd9dc9c0701f97d61c88c29;
  
  var types = _interopRequireWildcard(_types);
  
  var _utilAccessor = __67e3bc52527f64dd454cbf743becd3ce;
  
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
      var srcAttrName = srcAttr.name;
      var srcAttrValue = (0, _utilAccessor.getAccessor)(src, srcAttrName);
      var dstAttr = dstAttrs[srcAttrName];
      var dstAttrValue = (0, _utilAccessor.getAccessor)(dst, srcAttrName);
  
      if (!dstAttr) {
        instructions.push({
          data: { name: srcAttrName },
          destination: dst,
          source: src,
          type: types.REMOVE_ATTRIBUTE
        });
      } else if (srcAttrValue !== dstAttrValue) {
        instructions.push({
          data: { name: srcAttrName, value: dstAttrValue },
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
      var dstAttrName = dstAttr.name;
      var dstAttrValue = (0, _utilAccessor.getAccessor)(dst, dstAttrName);
      var srcAttr = srcAttrs[dstAttrName];
  
      if (!srcAttr) {
        instructions.push({
          data: { name: dstAttrName, value: dstAttrValue },
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
// src/util/weak-map.js
(typeof window === 'undefined' ? global : window).__ce023ebacc34c07d605e08cb00be0fb8 = (function () {
  var module = {
    exports: {}
  };
  var exports = module.exports;
  
  // Because weak map polyfills either are too big or don't use native if
  // available properly.
  
  Object.defineProperty(exports, '__esModule', {
    value: true
  });
  var index = 0;
  var prefix = '__WEAK_MAP_POLYFILL_';
  
  exports['default'] = (function () {
    if (typeof WeakMap !== 'undefined') {
      return WeakMap;
    }
  
    function Polyfill() {
      this.key = prefix + index;
      ++index;
    }
  
    Polyfill.prototype = {
      get: function get(obj) {
        return obj[this.key];
      },
      set: function set(obj, val) {
        obj[this.key] = val;
      }
    };
  
    return Polyfill;
  })();
  
  module.exports = exports['default'];
  
  return module.exports;
}).call(this);
// src/util/event-map.js
(typeof window === 'undefined' ? global : window).__490e51f7cea3c91781b500cc4a5d8e3c = (function () {
  var module = {
    exports: {}
  };
  var exports = module.exports;
  
  'use strict';
  
  Object.defineProperty(exports, '__esModule', {
    value: true
  });
  
  function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }
  
  var _weakMap = __ce023ebacc34c07d605e08cb00be0fb8;
  
  var _weakMap2 = _interopRequireDefault(_weakMap);
  
  var map = new _weakMap2['default']();
  
  exports['default'] = function (elem) {
    var events = map.get(elem);
    events || map.set(elem, events = {});
    return events;
  };
  
  module.exports = exports['default'];
  
  return module.exports;
}).call(this);
// src/compare/events.js
(typeof window === 'undefined' ? global : window).__810e3e8aff9255d0b6d7cc3d2921fa2a = (function () {
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
  
  var _types = __306adb5c6fd9dc9c0701f97d61c88c29;
  
  var types = _interopRequireWildcard(_types);
  
  var _utilEventMap = __490e51f7cea3c91781b500cc4a5d8e3c;
  
  var _utilEventMap2 = _interopRequireDefault(_utilEventMap);
  
  exports['default'] = function (src, dst) {
    var dstEvents = dst.events;
    var srcEvents = (0, _utilEventMap2['default'])(src);
    var instructions = [];
  
    // Remove any source events that aren't in the source before seeing if we
    // need to add any from the destination.
    if (srcEvents) {
      for (var _name in srcEvents) {
        if (dstEvents[_name] !== srcEvents[_name]) {
          instructions.push({
            data: { name: _name, value: undefined },
            destination: dst,
            source: src,
            type: types.SET_EVENT
          });
        }
      }
    }
  
    // After instructing to remove any old events, we then can instruct to add
    // new events. This prevents the new events from being removed from earlier
    // instructions.
    if (dstEvents) {
      for (var _name2 in dstEvents) {
        var value = dstEvents[_name2];
        if (srcEvents[_name2] !== value) {
          instructions.push({
            data: { name: _name2, value: value },
            destination: dst,
            source: src,
            type: types.SET_EVENT
          });
        }
      }
    }
  
    return instructions;
  };
  
  module.exports = exports['default'];
  
  return module.exports;
}).call(this);
// src/compare/element.js
(typeof window === 'undefined' ? global : window).__012a3a3a199bd9a8bf288b88ac5d8016 = (function () {
  var module = {
    exports: {}
  };
  var exports = module.exports;
  
  'use strict';
  
  Object.defineProperty(exports, '__esModule', {
    value: true
  });
  
  function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }
  
  var _attributes = __9121c7689d7449da988fa114a9538a75;
  
  var _attributes2 = _interopRequireDefault(_attributes);
  
  var _events = __810e3e8aff9255d0b6d7cc3d2921fa2a;
  
  var _events2 = _interopRequireDefault(_events);
  
  exports['default'] = function (src, dst) {
    if (src.tagName === dst.tagName) {
      return (0, _attributes2['default'])(src, dst).concat((0, _events2['default'])(src, dst));
    }
  };
  
  module.exports = exports['default'];
  
  return module.exports;
}).call(this);
// src/compare/text.js
(typeof window === 'undefined' ? global : window).__1419767bbbbe333faa9863b1f37f5f45 = (function () {
  var module = {
    exports: {}
  };
  var exports = module.exports;
  
  'use strict';
  
  Object.defineProperty(exports, '__esModule', {
    value: true
  });
  
  function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj['default'] = obj; return newObj; } }
  
  var _types = __306adb5c6fd9dc9c0701f97d61c88c29;
  
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
(typeof window === 'undefined' ? global : window).__6f37dd78d1ae7423bfc8b440f9867b06 = (function () {
  var module = {
    exports: {}
  };
  var exports = module.exports;
  
  'use strict';
  
  Object.defineProperty(exports, '__esModule', {
    value: true
  });
  
  function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }
  
  var _text = __1419767bbbbe333faa9863b1f37f5f45;
  
  var _text2 = _interopRequireDefault(_text);
  
  exports['default'] = _text2['default'];
  module.exports = exports['default'];
  
  return module.exports;
}).call(this);
// src/compare/node.js
(typeof window === 'undefined' ? global : window).__083b9bfc83c334ff19a2673ae8faba7c = (function () {
  var module = {
    exports: {}
  };
  var exports = module.exports;
  
  'use strict';
  
  Object.defineProperty(exports, '__esModule', {
    value: true
  });
  
  function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }
  
  var _element = __012a3a3a199bd9a8bf288b88ac5d8016;
  
  var _element2 = _interopRequireDefault(_element);
  
  var _text = __1419767bbbbe333faa9863b1f37f5f45;
  
  var _text2 = _interopRequireDefault(_text);
  
  var _comment = __6f37dd78d1ae7423bfc8b440f9867b06;
  
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
// src/util/real-node-map.js
(typeof window === 'undefined' ? global : window).__26261b175dc60fa17898718402ac16b0 = (function () {
  var module = {
    exports: {}
  };
  var exports = module.exports;
  
  'use strict';
  
  Object.defineProperty(exports, '__esModule', {
    value: true
  });
  
  function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }
  
  var _weakMap = __ce023ebacc34c07d605e08cb00be0fb8;
  
  var _weakMap2 = _interopRequireDefault(_weakMap);
  
  exports['default'] = new _weakMap2['default']();
  module.exports = exports['default'];
  
  return module.exports;
}).call(this);
// src/util/real-node.js
(typeof window === 'undefined' ? global : window).__d18ac5c3473b294694afebfe4eb84766 = (function () {
  var module = {
    exports: {}
  };
  var exports = module.exports;
  
  'use strict';
  
  Object.defineProperty(exports, '__esModule', {
    value: true
  });
  
  function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }
  
  var _realNodeMap = __26261b175dc60fa17898718402ac16b0;
  
  var _realNodeMap2 = _interopRequireDefault(_realNodeMap);
  
  var Node = window.Node;
  
  exports['default'] = function (node) {
    return node instanceof Node ? node : _realNodeMap2['default'].get(node);
  };
  
  module.exports = exports['default'];
  
  return module.exports;
}).call(this);
// src/diff.js
(typeof window === 'undefined' ? global : window).__bc43ec47db3e25bfd4fae86b6294f1ff = (function () {
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
  
  var _types = __306adb5c6fd9dc9c0701f97d61c88c29;
  
  var types = _interopRequireWildcard(_types);
  
  var _compareNode = __083b9bfc83c334ff19a2673ae8faba7c;
  
  var _compareNode2 = _interopRequireDefault(_compareNode);
  
  var _utilRealNode = __d18ac5c3473b294694afebfe4eb84766;
  
  var _utilRealNode2 = _interopRequireDefault(_utilRealNode);
  
  var _utilRealNodeMap = __26261b175dc60fa17898718402ac16b0;
  
  var _utilRealNodeMap2 = _interopRequireDefault(_utilRealNodeMap);
  
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
        if (!(curDst instanceof Node)) {
          _utilRealNodeMap2['default'].set(curDst, (0, _utilRealNode2['default'])(curSrc));
        }
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
(typeof window === 'undefined' ? global : window).__945bdb727c61042f47a5a0d3e0e5b373 = (function () {
  var module = {
    exports: {}
  };
  var exports = module.exports;
  
  'use strict';
  
  Object.defineProperty(exports, '__esModule', {
    value: true
  });
  exports['default'] = render;
  
  function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }
  
  var _utilAccessor = __67e3bc52527f64dd454cbf743becd3ce;
  
  var _utilEventMap = __490e51f7cea3c91781b500cc4a5d8e3c;
  
  var _utilEventMap2 = _interopRequireDefault(_utilEventMap);
  
  var _utilRealNodeMap = __26261b175dc60fa17898718402ac16b0;
  
  var _utilRealNodeMap2 = _interopRequireDefault(_utilRealNodeMap);
  
  function createElement(el) {
    var realNode = document.createElement(el.tagName);
    var attributes = el.attributes;
    var events = el.events;
    var eventHandlers = (0, _utilEventMap2['default'])(realNode);
    var children = el.childNodes;
  
    if (attributes) {
      var attributesLen = attributes.length;
      for (var a = 0; a < attributesLen; a++) {
        var attr = attributes[a];
        (0, _utilAccessor.setAccessor)(realNode, attr.name, attr.value);
      }
    }
  
    if (events) {
      for (var _name in events) {
        realNode.addEventListener(_name, eventHandlers[_name] = events[_name]);
      }
    }
  
    if (children) {
      var docfrag = document.createDocumentFragment();
      var childrenLen = children.length;
  
      for (var a = 0; a < childrenLen; a++) {
        var ch = children[a];
        ch && docfrag.appendChild(render(ch));
      }
  
      if (realNode.appendChild) {
        realNode.appendChild(docfrag);
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
    if (Array.isArray(el)) {
      var _ret = (function () {
        var frag = document.createDocumentFragment();
        el.forEach(function (item) {
          return frag.appendChild(render(item));
        });
        return {
          v: frag
        };
      })();
  
      if (typeof _ret === 'object') return _ret.v;
    }
    var realNode = el.tagName ? createElement(el) : createText(el);
    _utilRealNodeMap2['default'].set(el, realNode);
    return realNode;
  }
  
  module.exports = exports['default'];
  
  return module.exports;
}).call(this);
// src/patch/append-child.js
(typeof window === 'undefined' ? global : window).__541cede3d2af09d7444130961c7580d8 = (function () {
  var module = {
    exports: {}
  };
  var exports = module.exports;
  
  'use strict';
  
  Object.defineProperty(exports, '__esModule', {
    value: true
  });
  
  function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }
  
  var _utilRealNode = __d18ac5c3473b294694afebfe4eb84766;
  
  var _utilRealNode2 = _interopRequireDefault(_utilRealNode);
  
  var _vdomDom = __945bdb727c61042f47a5a0d3e0e5b373;
  
  var _vdomDom2 = _interopRequireDefault(_vdomDom);
  
  exports['default'] = function (src, dst) {
    (0, _utilRealNode2['default'])(src).appendChild((0, _vdomDom2['default'])(dst));
  };
  
  module.exports = exports['default'];
  
  return module.exports;
}).call(this);
// src/patch/remove-attribute.js
(typeof window === 'undefined' ? global : window).__dafc4b689867f9e1cab3f635b7ca06d5 = (function () {
  var module = {
    exports: {}
  };
  var exports = module.exports;
  
  'use strict';
  
  Object.defineProperty(exports, '__esModule', {
    value: true
  });
  
  function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }
  
  var _utilAccessor = __67e3bc52527f64dd454cbf743becd3ce;
  
  var _utilRealNode = __d18ac5c3473b294694afebfe4eb84766;
  
  var _utilRealNode2 = _interopRequireDefault(_utilRealNode);
  
  exports['default'] = function (src, dst, data) {
    (0, _utilAccessor.removeAccessor)((0, _utilRealNode2['default'])(src), data.name);
  };
  
  module.exports = exports['default'];
  
  return module.exports;
}).call(this);
// src/patch/remove-child.js
(typeof window === 'undefined' ? global : window).__cac9724529e3dd1fe6dd8d3590baaf01 = (function () {
  var module = {
    exports: {}
  };
  var exports = module.exports;
  
  'use strict';
  
  Object.defineProperty(exports, '__esModule', {
    value: true
  });
  
  function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }
  
  var _utilRealNode = __d18ac5c3473b294694afebfe4eb84766;
  
  var _utilRealNode2 = _interopRequireDefault(_utilRealNode);
  
  exports['default'] = function (src, dst) {
    var realDst = (0, _utilRealNode2['default'])(dst);
    realDst.parentNode.removeChild(realDst);
  };
  
  module.exports = exports['default'];
  
  return module.exports;
}).call(this);
// src/patch/replace-child.js
(typeof window === 'undefined' ? global : window).__7ad8f3427b223f6cc9ccad7cefa4b11b = (function () {
  var module = {
    exports: {}
  };
  var exports = module.exports;
  
  'use strict';
  
  Object.defineProperty(exports, '__esModule', {
    value: true
  });
  
  function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }
  
  var _vdomDom = __945bdb727c61042f47a5a0d3e0e5b373;
  
  var _vdomDom2 = _interopRequireDefault(_vdomDom);
  
  var _utilRealNode = __d18ac5c3473b294694afebfe4eb84766;
  
  var _utilRealNode2 = _interopRequireDefault(_utilRealNode);
  
  exports['default'] = function (src, dst) {
    var realSrc = (0, _utilRealNode2['default'])(src);
    realSrc && realSrc.parentNode && realSrc.parentNode.replaceChild((0, _vdomDom2['default'])(dst), realSrc);
  };
  
  module.exports = exports['default'];
  
  return module.exports;
}).call(this);
// src/patch/set-attribute.js
(typeof window === 'undefined' ? global : window).__b5a8920cbdd51a0ae50dab8b2c57986d = (function () {
  var module = {
    exports: {}
  };
  var exports = module.exports;
  
  'use strict';
  
  Object.defineProperty(exports, '__esModule', {
    value: true
  });
  
  function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }
  
  var _utilAccessor = __67e3bc52527f64dd454cbf743becd3ce;
  
  var _utilRealNode = __d18ac5c3473b294694afebfe4eb84766;
  
  var _utilRealNode2 = _interopRequireDefault(_utilRealNode);
  
  exports['default'] = function (src, dst, data) {
    (0, _utilAccessor.setAccessor)((0, _utilRealNode2['default'])(src), data.name, data.value);
  };
  
  module.exports = exports['default'];
  
  return module.exports;
}).call(this);
// src/patch/set-event.js
(typeof window === 'undefined' ? global : window).__d792960cb7c1fceba10ffac05d208c61 = (function () {
  var module = {
    exports: {}
  };
  var exports = module.exports;
  
  'use strict';
  
  Object.defineProperty(exports, '__esModule', {
    value: true
  });
  
  function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }
  
  var _utilEventMap = __490e51f7cea3c91781b500cc4a5d8e3c;
  
  var _utilEventMap2 = _interopRequireDefault(_utilEventMap);
  
  var _utilRealNode = __d18ac5c3473b294694afebfe4eb84766;
  
  var _utilRealNode2 = _interopRequireDefault(_utilRealNode);
  
  exports['default'] = function (src, dst, data) {
    var realSrc = (0, _utilRealNode2['default'])(src);
    var eventHandlers = (0, _utilEventMap2['default'])(realSrc);
    var name = data.name;
    var prevHandler = eventHandlers[name];
    var nextHandler = data.value;
  
    if (typeof prevHandler === 'function') {
      delete eventHandlers[name];
      realSrc.removeEventListener(name, prevHandler);
    }
  
    if (typeof nextHandler === 'function') {
      eventHandlers[name] = nextHandler;
      realSrc.addEventListener(name, nextHandler);
    }
  };
  
  module.exports = exports['default'];
  
  return module.exports;
}).call(this);
// src/patch/text-content.js
(typeof window === 'undefined' ? global : window).__95ec5c51245495ab504f016cbf8634bd = (function () {
  var module = {
    exports: {}
  };
  var exports = module.exports;
  
  'use strict';
  
  Object.defineProperty(exports, '__esModule', {
    value: true
  });
  
  function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }
  
  var _utilRealNode = __d18ac5c3473b294694afebfe4eb84766;
  
  var _utilRealNode2 = _interopRequireDefault(_utilRealNode);
  
  exports['default'] = function (src, dst) {
    (0, _utilRealNode2['default'])(src).textContent = dst.textContent;
  };
  
  module.exports = exports['default'];
  
  return module.exports;
}).call(this);
// src/patch.js
(typeof window === 'undefined' ? global : window).__a261ed1a49da6c3f0b98b8a62875f939 = (function () {
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
  
  var _types = __306adb5c6fd9dc9c0701f97d61c88c29;
  
  var types = _interopRequireWildcard(_types);
  
  var _patchAppendChild = __541cede3d2af09d7444130961c7580d8;
  
  var _patchAppendChild2 = _interopRequireDefault(_patchAppendChild);
  
  var _patchRemoveAttribute = __dafc4b689867f9e1cab3f635b7ca06d5;
  
  var _patchRemoveAttribute2 = _interopRequireDefault(_patchRemoveAttribute);
  
  var _patchRemoveChild = __cac9724529e3dd1fe6dd8d3590baaf01;
  
  var _patchRemoveChild2 = _interopRequireDefault(_patchRemoveChild);
  
  var _patchReplaceChild = __7ad8f3427b223f6cc9ccad7cefa4b11b;
  
  var _patchReplaceChild2 = _interopRequireDefault(_patchReplaceChild);
  
  var _patchSetAttribute = __b5a8920cbdd51a0ae50dab8b2c57986d;
  
  var _patchSetAttribute2 = _interopRequireDefault(_patchSetAttribute);
  
  var _patchSetEvent = __d792960cb7c1fceba10ffac05d208c61;
  
  var _patchSetEvent2 = _interopRequireDefault(_patchSetEvent);
  
  var _patchTextContent = __95ec5c51245495ab504f016cbf8634bd;
  
  var _patchTextContent2 = _interopRequireDefault(_patchTextContent);
  
  var patchers = {};
  patchers[types.APPEND_CHILD] = _patchAppendChild2['default'];
  patchers[types.REMOVE_ATTRIBUTE] = _patchRemoveAttribute2['default'];
  patchers[types.REMOVE_CHILD] = _patchRemoveChild2['default'];
  patchers[types.REPLACE_CHILD] = _patchReplaceChild2['default'];
  patchers[types.SET_ATTRIBUTE] = _patchSetAttribute2['default'];
  patchers[types.SET_EVENT] = _patchSetEvent2['default'];
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
(typeof window === 'undefined' ? global : window).__2e9135a2ef2b350ee8af5b3e08ec84b7 = (function () {
  var module = {
    exports: {}
  };
  var exports = module.exports;
  
  'use strict';
  
  Object.defineProperty(exports, '__esModule', {
    value: true
  });
  
  function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }
  
  var _diff = __bc43ec47db3e25bfd4fae86b6294f1ff;
  
  var _diff2 = _interopRequireDefault(_diff);
  
  var _patch = __a261ed1a49da6c3f0b98b8a62875f939;
  
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
(typeof window === 'undefined' ? global : window).__3fe370f8eb8648250c674292a235d325 = (function () {
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
(typeof window === 'undefined' ? global : window).__e55e1024ac264e83b0b8ddc06e546322 = (function () {
  var module = {
    exports: {}
  };
  var exports = module.exports;
  
  'use strict';
  
  Object.defineProperty(exports, '__esModule', {
    value: true
  });
  
  function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }
  
  var _utilAccessor = __67e3bc52527f64dd454cbf743becd3ce;
  
  var _text = __3fe370f8eb8648250c674292a235d325;
  
  var _text2 = _interopRequireDefault(_text);
  
  function separateData(obj) {
    var attrs = {};
    var events = {};
    var node = {};
    var attrIdx = 0;
  
    for (var _name in obj) {
      var value = obj[_name];
  
      if (_name.indexOf('on') === 0) {
        events[_name.substring(2)] = value;
      } else {
        attrs[attrIdx++] = attrs[_name] = { name: _name, value: value };
        (0, _utilAccessor.mapAccessor)(node, _name, value);
      }
    }
  
    attrs.length = attrIdx;
    return { attrs: attrs, events: events, node: node };
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
    var node = data.node;
    node.nodeType = 1;
    node.tagName = ensureTagName(name);
    node.attributes = data.attrs;
    node.events = data.events;
  
    for (var _len = arguments.length, chren = Array(_len > 2 ? _len - 2 : 0), _key = 2; _key < _len; _key++) {
      chren[_key - 2] = arguments[_key];
    }
  
    node.childNodes = ensureNodes(chren);
    return node;
  };
  
  module.exports = exports['default'];
  
  return module.exports;
}).call(this);
// src/vdom/mount.js
(typeof window === 'undefined' ? global : window).__7217705187e312511385208c2d01bd13 = (function () {
  var module = {
    exports: {}
  };
  var exports = module.exports;
  
  'use strict';
  
  Object.defineProperty(exports, '__esModule', {
    value: true
  });
  
  function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }
  
  var _dom = __945bdb727c61042f47a5a0d3e0e5b373;
  
  var _dom2 = _interopRequireDefault(_dom);
  
  function removeChildNodes(elem) {
    while (elem.firstChild) {
      var first = elem.firstChild;
      first.parentNode.removeChild(first);
    }
  }
  
  exports['default'] = function (elem, tree) {
    removeChildNodes(elem);
    elem.appendChild((0, _dom2['default'])(tree));
  };
  
  module.exports = exports['default'];
  
  return module.exports;
}).call(this);
// src/render.js
(typeof window === 'undefined' ? global : window).__8e4981978325bbbace4c93eaed2f3553 = (function () {
  var module = {
    exports: {}
  };
  var exports = module.exports;
  
  'use strict';
  
  Object.defineProperty(exports, '__esModule', {
    value: true
  });
  
  function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }
  
  var _utilWeakMap = __ce023ebacc34c07d605e08cb00be0fb8;
  
  var _utilWeakMap2 = _interopRequireDefault(_utilWeakMap);
  
  var _vdomElement = __e55e1024ac264e83b0b8ddc06e546322;
  
  var _vdomElement2 = _interopRequireDefault(_vdomElement);
  
  var _merge = __2e9135a2ef2b350ee8af5b3e08ec84b7;
  
  var _merge2 = _interopRequireDefault(_merge);
  
  var _vdomMount = __7217705187e312511385208c2d01bd13;
  
  var _vdomMount2 = _interopRequireDefault(_vdomMount);
  
  var Node = window.Node;
  
  var oldTreeMap = new _utilWeakMap2['default']();
  
  exports['default'] = function (render) {
    return function (elem) {
      elem = elem instanceof Node ? elem : this;
  
      if (!elem instanceof Node) {
        throw new Error('No node provided to diff renderer as either the first argument or the context.');
      }
  
      // Create a new element to house the new tree since we diff / mount fragments.
      var newTree = (0, _vdomElement2['default'])('div', null, render(elem, { createElement: _vdomElement2['default'] }));
      var oldTree = oldTreeMap.get(elem);
  
      if (oldTree) {
        (0, _merge2['default'])({
          destination: newTree,
          source: oldTree
        });
      } else {
        (0, _vdomMount2['default'])(elem, newTree.childNodes);
      }
  
      oldTreeMap.set(elem, newTree);
    };
  };
  
  module.exports = exports['default'];
  
  return module.exports;
}).call(this);
// src/vdom/index.js
(typeof window === 'undefined' ? global : window).__574c147f21d8725abb5385f6059045f0 = (function () {
  var module = {
    exports: {}
  };
  var exports = module.exports;
  
  'use strict';
  
  Object.defineProperty(exports, '__esModule', {
    value: true
  });
  
  function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }
  
  var _dom = __945bdb727c61042f47a5a0d3e0e5b373;
  
  var _dom2 = _interopRequireDefault(_dom);
  
  var _element = __e55e1024ac264e83b0b8ddc06e546322;
  
  var _element2 = _interopRequireDefault(_element);
  
  var _mount = __7217705187e312511385208c2d01bd13;
  
  var _mount2 = _interopRequireDefault(_mount);
  
  var _text = __3fe370f8eb8648250c674292a235d325;
  
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
(typeof window === 'undefined' ? global : window).__18793bf9f3a784e4820048b2556b99d3 = (function () {
  var module = {
    exports: {}
  };
  var exports = module.exports;
  
  'use strict';
  
  Object.defineProperty(exports, '__esModule', {
    value: true
  });
  
  function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }
  
  var _diff = __bc43ec47db3e25bfd4fae86b6294f1ff;
  
  var _diff2 = _interopRequireDefault(_diff);
  
  var _merge = __2e9135a2ef2b350ee8af5b3e08ec84b7;
  
  var _merge2 = _interopRequireDefault(_merge);
  
  var _patch = __a261ed1a49da6c3f0b98b8a62875f939;
  
  var _patch2 = _interopRequireDefault(_patch);
  
  var _render = __8e4981978325bbbace4c93eaed2f3553;
  
  var _render2 = _interopRequireDefault(_render);
  
  var _types = __306adb5c6fd9dc9c0701f97d61c88c29;
  
  var _types2 = _interopRequireDefault(_types);
  
  var _vdom = __574c147f21d8725abb5385f6059045f0;
  
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
(typeof window === 'undefined' ? global : window).__51ccd9a24e2190fb93f04af8ed8916fe = (function () {
  var module = {
    exports: {}
  };
  var exports = module.exports;
  
  'use strict';
  
  function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }
  
  var _index = __18793bf9f3a784e4820048b2556b99d3;
  
  var _index2 = _interopRequireDefault(_index);
  
  window.skateDomDiff = _index2['default'];
  
  return module.exports;
}).call(this);