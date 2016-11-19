(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define([], factory);
	else if(typeof exports === 'object')
		exports["skatejsDomDiff"] = factory();
	else
		root["skatejsDomDiff"] = factory();
})(this, function() {
return /******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;
/******/
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _diff = __webpack_require__(1);
	
	var _diff2 = _interopRequireDefault(_diff);
	
	var _merge = __webpack_require__(14);
	
	var _merge2 = _interopRequireDefault(_merge);
	
	var _patch = __webpack_require__(15);
	
	var _patch2 = _interopRequireDefault(_patch);
	
	var _render = __webpack_require__(24);
	
	var _render2 = _interopRequireDefault(_render);
	
	var _types = __webpack_require__(2);
	
	var types = _interopRequireWildcard(_types);
	
	var _vdom = __webpack_require__(28);
	
	var _vdom2 = _interopRequireDefault(_vdom);
	
	var _version = __webpack_require__(29);
	
	var _version2 = _interopRequireDefault(_version);
	
	function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	exports.default = {
	  diff: _diff2.default,
	  merge: _merge2.default,
	  patch: _patch2.default,
	  render: _render2.default,
	  types: types,
	  vdom: _vdom2.default,
	  version: _version2.default
	};

/***/ },
/* 1 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.default = diff;
	
	var _types = __webpack_require__(2);
	
	var types = _interopRequireWildcard(_types);
	
	var _node = __webpack_require__(3);
	
	var _node2 = _interopRequireDefault(_node);
	
	var _realNode = __webpack_require__(12);
	
	var _realNode2 = _interopRequireDefault(_realNode);
	
	var _realNodeMap = __webpack_require__(13);
	
	var _realNodeMap2 = _interopRequireDefault(_realNodeMap);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }
	
	var _window = window,
	    Node = _window.Node;
	
	
	function diffNode(source, destination) {
	  var nodeInstructions = (0, _node2.default)(source, destination);
	
	  // If there are instructions (even an empty array) it means the node can be
	  // diffed and doesn't have to be replaced. If the instructions are falsy
	  // it means that the nodes are not similar (cannot be changed) and must be
	  // replaced instead.
	  if (nodeInstructions) {
	    return nodeInstructions.concat(diff({ source: source, destination: destination }));
	  }
	
	  return [{
	    destination: destination,
	    source: source,
	    type: types.REPLACE_CHILD
	  }];
	}
	
	function diff() {
	  var opts = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
	
	  var src = opts.source;
	  var dst = opts.destination;
	
	  if (!src || !dst) {
	    return [];
	  }
	
	  var instructions = opts.root ? diffNode(src, dst) : [];
	
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
	        _realNodeMap2.default.set(curDst, (0, _realNode2.default)(curSrc));
	      }
	    }
	
	    instructions = instructions.concat(diffNode(curSrc, curDst));
	  }
	
	  if (dstChsLen < srcChsLen) {
	    for (var _a = dstChsLen; _a < srcChsLen; _a++) {
	      instructions.push({
	        destination: srcChs[_a],
	        source: src,
	        type: types.REMOVE_CHILD
	      });
	    }
	  }
	
	  return instructions;
	}

/***/ },
/* 2 */
/***/ function(module, exports) {

	"use strict";
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	var APPEND_CHILD = exports.APPEND_CHILD = 1;
	var REMOVE_CHILD = exports.REMOVE_CHILD = 2;
	var REMOVE_ATTRIBUTE = exports.REMOVE_ATTRIBUTE = 3;
	var REPLACE_CHILD = exports.REPLACE_CHILD = 4;
	var SET_ATTRIBUTE = exports.SET_ATTRIBUTE = 5;
	var SET_EVENT = exports.SET_EVENT = 6;
	var SET_PROPERTY = exports.SET_PROPERTY = 7;
	var TEXT_CONTENT = exports.TEXT_CONTENT = 8;

/***/ },
/* 3 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	exports.default = function (src, dst) {
	  var dstType = void 0,
	      srcType = void 0;
	
	  if (!dst || !src) {
	    return;
	  }
	
	  dstType = dst.nodeType;
	  srcType = src.nodeType;
	
	  if (dstType !== srcType) {
	    return;
	  } else if (dstType === NODE_ELEMENT) {
	    return (0, _element2.default)(src, dst);
	  } else if (dstType === NODE_TEXT) {
	    return (0, _text2.default)(src, dst);
	  } else if (dstType === NODE_COMMENT) {
	    return (0, _comment2.default)(src, dst);
	  }
	};
	
	var _element = __webpack_require__(4);
	
	var _element2 = _interopRequireDefault(_element);
	
	var _text = __webpack_require__(10);
	
	var _text2 = _interopRequireDefault(_text);
	
	var _comment = __webpack_require__(11);
	
	var _comment2 = _interopRequireDefault(_comment);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	var NODE_COMMENT = 8;
	var NODE_ELEMENT = 1;
	var NODE_TEXT = 3;

/***/ },
/* 4 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	exports.default = function (src, dst) {
	  if (src.tagName === dst.tagName) {
	    return (0, _attributes2.default)(src, dst).concat((0, _events2.default)(src, dst));
	  }
	};
	
	var _attributes = __webpack_require__(5);
	
	var _attributes2 = _interopRequireDefault(_attributes);
	
	var _events = __webpack_require__(7);
	
	var _events2 = _interopRequireDefault(_events);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/***/ },
/* 5 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	exports.default = function (src, dst) {
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
	    var srcAttrValue = (0, _accessor.getAccessor)(src, srcAttrName);
	    var dstAttr = dstAttrs[srcAttrName];
	    var dstAttrValue = (0, _accessor.getAccessor)(dst, srcAttrName);
	
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
	  for (var _a = 0; _a < dstAttrsLen; _a++) {
	    var _dstAttr = dstAttrs[_a];
	    var dstAttrName = _dstAttr.name;
	    var _dstAttrValue = (0, _accessor.getAccessor)(dst, dstAttrName);
	    var _srcAttr = srcAttrs[dstAttrName];
	
	    if (!_srcAttr) {
	      instructions.push({
	        data: { name: dstAttrName, value: _dstAttrValue },
	        destination: dst,
	        source: src,
	        type: types.SET_ATTRIBUTE
	      });
	    }
	  }
	
	  return instructions;
	};
	
	var _types = __webpack_require__(2);
	
	var types = _interopRequireWildcard(_types);
	
	var _accessor = __webpack_require__(6);
	
	function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

/***/ },
/* 6 */
/***/ function(module, exports) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.getAccessor = getAccessor;
	exports.mapAccessor = mapAccessor;
	exports.removeAccessor = removeAccessor;
	exports.setAccessor = setAccessor;
	function classToString(obj) {
	  if (typeof obj === 'string') {
	    return obj;
	  }
	
	  if (Array.isArray(obj)) {
	    return obj.join(' ');
	  }
	
	  return Object.keys(obj).filter(function (key) {
	    return obj[key] ? key : false;
	  }).join(' ');
	}
	
	function styleToString(obj) {
	  if (typeof obj === 'string') {
	    return obj;
	  }
	
	  return Object.keys(obj).map(function (key) {
	    return key + ': ' + obj[key] + ';';
	  }).join(' ');
	}
	
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
	    node.className = classToString(value);
	  } else if (name === 'style') {
	    node.style = { cssText: styleToString(value) };
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

/***/ },
/* 7 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	exports.default = function (src, dst) {
	  var dstEvents = dst.events;
	  var srcEvents = (0, _eventMap2.default)(src);
	  var instructions = [];
	
	  // Remove any source events that aren't in the destination before seeing if
	  // we need to add any from the destination.
	  if (srcEvents) {
	    for (var name in srcEvents) {
	      if (dstEvents && dstEvents[name] !== srcEvents[name]) {
	        instructions.push({
	          data: { name: name, value: undefined },
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
	    for (var _name in dstEvents) {
	      var value = dstEvents[_name];
	      if (srcEvents[_name] !== value) {
	        instructions.push({
	          data: { name: _name, value: value },
	          destination: dst,
	          source: src,
	          type: types.SET_EVENT
	        });
	      }
	    }
	  }
	
	  return instructions;
	};
	
	var _types = __webpack_require__(2);
	
	var types = _interopRequireWildcard(_types);
	
	var _eventMap = __webpack_require__(8);
	
	var _eventMap2 = _interopRequireDefault(_eventMap);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

/***/ },
/* 8 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	exports.default = function (elem) {
	  var events = map.get(elem);
	  events || map.set(elem, events = {});
	  return events;
	};
	
	var _weakMap = __webpack_require__(9);
	
	var _weakMap2 = _interopRequireDefault(_weakMap);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	var map = new _weakMap2.default();

/***/ },
/* 9 */
/***/ function(module, exports) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	// Because weak map polyfills either are too big or don't use native if
	// available properly.
	
	var index = 0;
	var prefix = '__WEAK_MAP_POLYFILL_';
	
	exports.default = function () {
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
	}();

/***/ },
/* 10 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	exports.default = function (src, dst) {
	  if (src.textContent === dst.textContent) {
	    return [];
	  }
	
	  return [{
	    destination: dst,
	    source: src,
	    type: types.TEXT_CONTENT
	  }];
	};
	
	var _types = __webpack_require__(2);
	
	var types = _interopRequireWildcard(_types);
	
	function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

/***/ },
/* 11 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _text = __webpack_require__(10);
	
	var _text2 = _interopRequireDefault(_text);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	exports.default = _text2.default;

/***/ },
/* 12 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	exports.default = function (node) {
	  return node instanceof Node ? node : _realNodeMap2.default.get(node);
	};
	
	var _realNodeMap = __webpack_require__(13);
	
	var _realNodeMap2 = _interopRequireDefault(_realNodeMap);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	var _window = window,
	    Node = _window.Node;

/***/ },
/* 13 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _weakMap = __webpack_require__(9);
	
	var _weakMap2 = _interopRequireDefault(_weakMap);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	exports.default = new _weakMap2.default();

/***/ },
/* 14 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	exports.default = function (opts) {
	  var inst = (0, _diff2.default)(opts);
	  (0, _patch2.default)(inst);
	  return inst;
	};
	
	var _diff = __webpack_require__(1);
	
	var _diff2 = _interopRequireDefault(_diff);
	
	var _patch = __webpack_require__(15);
	
	var _patch2 = _interopRequireDefault(_patch);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/***/ },
/* 15 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	exports.default = function (instructions) {
	  instructions.forEach(patch);
	};
	
	var _types = __webpack_require__(2);
	
	var types = _interopRequireWildcard(_types);
	
	var _appendChild = __webpack_require__(16);
	
	var _appendChild2 = _interopRequireDefault(_appendChild);
	
	var _removeAttribute = __webpack_require__(18);
	
	var _removeAttribute2 = _interopRequireDefault(_removeAttribute);
	
	var _removeChild = __webpack_require__(19);
	
	var _removeChild2 = _interopRequireDefault(_removeChild);
	
	var _replaceChild = __webpack_require__(20);
	
	var _replaceChild2 = _interopRequireDefault(_replaceChild);
	
	var _setAttribute = __webpack_require__(21);
	
	var _setAttribute2 = _interopRequireDefault(_setAttribute);
	
	var _setEvent = __webpack_require__(22);
	
	var _setEvent2 = _interopRequireDefault(_setEvent);
	
	var _textContent = __webpack_require__(23);
	
	var _textContent2 = _interopRequireDefault(_textContent);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }
	
	var patchers = {};
	patchers[types.APPEND_CHILD] = _appendChild2.default;
	patchers[types.REMOVE_ATTRIBUTE] = _removeAttribute2.default;
	patchers[types.REMOVE_CHILD] = _removeChild2.default;
	patchers[types.REPLACE_CHILD] = _replaceChild2.default;
	patchers[types.SET_ATTRIBUTE] = _setAttribute2.default;
	patchers[types.SET_EVENT] = _setEvent2.default;
	patchers[types.TEXT_CONTENT] = _textContent2.default;
	
	function patch(instruction) {
	  patchers[instruction.type](instruction.source, instruction.destination, instruction.data);
	}

/***/ },
/* 16 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	exports.default = function (src, dst) {
	  (0, _realNode2.default)(src).appendChild((0, _dom2.default)(dst));
	};
	
	var _realNode = __webpack_require__(12);
	
	var _realNode2 = _interopRequireDefault(_realNode);
	
	var _dom = __webpack_require__(17);
	
	var _dom2 = _interopRequireDefault(_dom);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/***/ },
/* 17 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };
	
	exports.default = render;
	
	var _accessor = __webpack_require__(6);
	
	var _eventMap = __webpack_require__(8);
	
	var _eventMap2 = _interopRequireDefault(_eventMap);
	
	var _realNodeMap = __webpack_require__(13);
	
	var _realNodeMap2 = _interopRequireDefault(_realNodeMap);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	var _window = window,
	    Node = _window.Node;
	
	
	function createElement(el) {
	  var realNode = document.createElement(el.tagName);
	  var attributes = el.attributes;
	  var events = el.events;
	  var eventHandlers = (0, _eventMap2.default)(realNode);
	  var children = el.childNodes;
	
	  if (attributes) {
	    var attributesLen = attributes.length;
	    for (var a = 0; a < attributesLen; a++) {
	      var attr = attributes[a];
	      (0, _accessor.setAccessor)(realNode, attr.name, attr.value);
	    }
	  }
	
	  if (events) {
	    for (var name in events) {
	      realNode.addEventListener(name, eventHandlers[name] = events[name]);
	    }
	  }
	
	  if (children) {
	    var docfrag = document.createDocumentFragment();
	    var childrenLen = children.length;
	
	    for (var _a = 0; _a < childrenLen; _a++) {
	      var ch = children[_a];
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
	    var _ret = function () {
	      var frag = document.createDocumentFragment();
	      el.forEach(function (item) {
	        return frag.appendChild(render(item));
	      });
	      return {
	        v: frag
	      };
	    }();
	
	    if ((typeof _ret === 'undefined' ? 'undefined' : _typeof(_ret)) === "object") return _ret.v;
	  }
	  var realNode = el.tagName ? createElement(el) : createText(el);
	  _realNodeMap2.default.set(el, realNode);
	  return realNode;
	}

/***/ },
/* 18 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	exports.default = function (src, dst, data) {
	  (0, _accessor.removeAccessor)((0, _realNode2.default)(src), data.name);
	};
	
	var _accessor = __webpack_require__(6);
	
	var _realNode = __webpack_require__(12);
	
	var _realNode2 = _interopRequireDefault(_realNode);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/***/ },
/* 19 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	exports.default = function (src, dst) {
	  var realDst = (0, _realNode2.default)(dst);
	  var realSrc = (0, _realNode2.default)(src);
	
	  // We don't do parentNode.removeChild because parentNode may report
	  // incorrectly in some prollyfills since it's impossible (?) to spoof.
	  realSrc.removeChild(realDst);
	};
	
	var _realNode = __webpack_require__(12);
	
	var _realNode2 = _interopRequireDefault(_realNode);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/***/ },
/* 20 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	exports.default = function (src, dst) {
	  var realSrc = (0, _realNode2.default)(src);
	  realSrc && realSrc.parentNode && realSrc.parentNode.replaceChild((0, _dom2.default)(dst), realSrc);
	};
	
	var _dom = __webpack_require__(17);
	
	var _dom2 = _interopRequireDefault(_dom);
	
	var _realNode = __webpack_require__(12);
	
	var _realNode2 = _interopRequireDefault(_realNode);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/***/ },
/* 21 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	exports.default = function (src, dst, data) {
	  (0, _accessor.setAccessor)((0, _realNode2.default)(src), data.name, data.value);
	};
	
	var _accessor = __webpack_require__(6);
	
	var _realNode = __webpack_require__(12);
	
	var _realNode2 = _interopRequireDefault(_realNode);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/***/ },
/* 22 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	exports.default = function (src, dst, data) {
	  var realSrc = (0, _realNode2.default)(src);
	  var eventHandlers = (0, _eventMap2.default)(realSrc);
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
	
	var _eventMap = __webpack_require__(8);
	
	var _eventMap2 = _interopRequireDefault(_eventMap);
	
	var _realNode = __webpack_require__(12);
	
	var _realNode2 = _interopRequireDefault(_realNode);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/***/ },
/* 23 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	exports.default = function (src, dst) {
	  (0, _realNode2.default)(src).textContent = dst.textContent;
	};
	
	var _realNode = __webpack_require__(12);
	
	var _realNode2 = _interopRequireDefault(_realNode);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/***/ },
/* 24 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	exports.default = function (render) {
	  return function (elem) {
	    elem = elem instanceof Node ? elem : this;
	
	    if (!(elem instanceof Node)) {
	      throw new Error('No node provided to diff renderer as either the first argument or the context.');
	    }
	
	    // Create a new element to house the new tree since we diff / mount fragments.
	    var newTree = (0, _element2.default)('div', null, render(elem));
	    var oldTree = oldTreeMap.get(elem);
	
	    if (oldTree) {
	      (0, _merge2.default)({
	        destination: newTree,
	        source: oldTree
	      });
	    } else {
	      (0, _mount2.default)(elem, newTree.childNodes);
	    }
	
	    oldTreeMap.set(elem, newTree);
	  };
	};
	
	var _weakMap = __webpack_require__(9);
	
	var _weakMap2 = _interopRequireDefault(_weakMap);
	
	var _element = __webpack_require__(25);
	
	var _element2 = _interopRequireDefault(_element);
	
	var _merge = __webpack_require__(14);
	
	var _merge2 = _interopRequireDefault(_merge);
	
	var _mount = __webpack_require__(27);
	
	var _mount2 = _interopRequireDefault(_mount);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	var _window = window,
	    Node = _window.Node;
	
	var oldTreeMap = new _weakMap2.default();

/***/ },
/* 25 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };
	
	exports.default = element;
	
	var _accessor = __webpack_require__(6);
	
	var _text = __webpack_require__(26);
	
	var _text2 = _interopRequireDefault(_text);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	function separateData(obj) {
	  var attrs = {};
	  var events = {};
	  var node = {};
	  var attrIdx = 0;
	
	  for (var name in obj) {
	    var value = obj[name];
	
	    if (name.indexOf('on') === 0) {
	      events[name.substring(2)] = value;
	    } else {
	      attrs[attrIdx++] = attrs[name] = { name: name, value: value };
	      (0, _accessor.mapAccessor)(node, name, value);
	    }
	  }
	
	  attrs.length = attrIdx;
	  return { attrs: attrs, events: events, node: node };
	}
	
	function ensureNodes(arr) {
	  var out = [];
	  if (!Array.isArray(arr)) {
	    arr = [arr];
	  }
	  arr.filter(Boolean).forEach(function (item) {
	    if (Array.isArray(item)) {
	      out = out.concat(ensureNodes(item));
	    } else if ((typeof item === 'undefined' ? 'undefined' : _typeof(item)) === 'object') {
	      out.push(translateFromReact(item));
	    } else {
	      out.push((0, _text2.default)(item));
	    }
	  });
	  return out;
	}
	
	function ensureTagName(name) {
	  return (typeof name === 'function' ? name.id || name.name : name).toUpperCase();
	}
	
	function isChildren(arg) {
	  return arg && (typeof arg === 'string' || Array.isArray(arg) || typeof arg.nodeType === 'number' || isReactNode(arg));
	}
	
	function isReactNode(item) {
	  return item && item.type && item.props;
	}
	
	function translateFromReact(item) {
	  if (isReactNode(item)) {
	    var props = item.props;
	    var chren = ensureNodes(props.children);
	    delete props.children;
	    return {
	      nodeType: 1,
	      tagName: item.type,
	      attributes: props,
	      childNodes: chren
	    };
	  }
	  return item;
	}
	
	function element(name) {
	  var attrs = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
	
	  var isAttrsNode = isChildren(attrs);
	  var data = separateData(isAttrsNode ? {} : attrs);
	  var node = data.node;
	  node.nodeType = 1;
	  node.tagName = ensureTagName(name);
	  node.attributes = data.attrs;
	  node.events = data.events;
	
	  for (var _len = arguments.length, chren = Array(_len > 2 ? _len - 2 : 0), _key = 2; _key < _len; _key++) {
	    chren[_key - 2] = arguments[_key];
	  }
	
	  node.childNodes = ensureNodes(isAttrsNode ? [attrs].concat(chren) : chren);
	  return node;
	}
	
	// Add an array factory that returns an array of virtual nodes.
	element.array = ensureNodes;
	
	// Generate built-in factories.
	['a', 'abbr', 'address', 'area', 'article', 'aside', 'audio', 'b', 'base', 'bdi', 'bdo', 'bgsound', 'blockquote', 'body', 'br', 'button', 'canvas', 'caption', 'cite', 'code', 'col', 'colgroup', 'command', 'content', 'data', 'datalist', 'dd', 'del', 'details', 'dfn', 'dialog', 'div', 'dl', 'dt', 'element', 'em', 'embed', 'fieldset', 'figcaption', 'figure', 'font', 'footer', 'form', 'h1', 'h2', 'h3', 'h4', 'h5', 'h6', 'head', 'header', 'hgroup', 'hr', 'html', 'i', 'iframe', 'image', 'img', 'input', 'ins', 'kbd', 'keygen', 'label', 'legend', 'li', 'link', 'main', 'map', 'mark', 'marquee', 'menu', 'menuitem', 'meta', 'meter', 'multicol', 'nav', 'nobr', 'noembed', 'noframes', 'noscript', 'object', 'ol', 'optgroup', 'option', 'output', 'p', 'param', 'picture', 'pre', 'progress', 'q', 'rp', 'rt', 'rtc', 'ruby', 's', 'samp', 'script', 'section', 'select', 'shadow', 'small', 'source', 'span', 'strong', 'style', 'sub', 'summary', 'sup', 'table', 'tbody', 'td', 'template', 'textarea', 'tfoot', 'th', 'thead', 'time', 'title', 'tr', 'track', 'u', 'ul', 'var', 'video', 'wbr'].forEach(function (tag) {
	  element[tag] = element.bind(null, tag);
	});

/***/ },
/* 26 */
/***/ function(module, exports) {

	"use strict";
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.default = createTextNode;
	function createTextNode(item) {
	  return {
	    nodeType: 3,
	    textContent: item
	  };
	}

/***/ },
/* 27 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	exports.default = function (elem, tree) {
	  removeChildNodes(elem);
	  elem.appendChild((0, _dom2.default)(tree));
	};
	
	var _dom = __webpack_require__(17);
	
	var _dom2 = _interopRequireDefault(_dom);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	function removeChildNodes(elem) {
	  while (elem.firstChild) {
	    var first = elem.firstChild;
	    first.parentNode.removeChild(first);
	  }
	}

/***/ },
/* 28 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _dom = __webpack_require__(17);
	
	var _dom2 = _interopRequireDefault(_dom);
	
	var _element = __webpack_require__(25);
	
	var _element2 = _interopRequireDefault(_element);
	
	var _mount = __webpack_require__(27);
	
	var _mount2 = _interopRequireDefault(_mount);
	
	var _text = __webpack_require__(26);
	
	var _text2 = _interopRequireDefault(_text);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	exports.default = {
	  dom: _dom2.default,
	  element: _element2.default,
	  mount: _mount2.default,
	  text: _text2.default
	};

/***/ },
/* 29 */
/***/ function(module, exports) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.default = '0.3.1';

/***/ }
/******/ ])
});
;
//# sourceMappingURL=index-with-deps.js.map