(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports) :
  typeof define === 'function' && define.amd ? define(['exports'], factory) :
  (factory((global.skatejsDomDiff = global.skatejsDomDiff || {})));
}(this, (function (exports) {

var APPEND_CHILD = 1;
var REMOVE_CHILD = 2;
var REMOVE_ATTRIBUTE = 3;
var REPLACE_CHILD = 4;
var SET_ATTRIBUTE = 5;
var SET_EVENT = 6;
var SET_PROPERTY = 7;
var TEXT_CONTENT = 8;

var types = Object.freeze({
	APPEND_CHILD: APPEND_CHILD,
	REMOVE_CHILD: REMOVE_CHILD,
	REMOVE_ATTRIBUTE: REMOVE_ATTRIBUTE,
	REPLACE_CHILD: REPLACE_CHILD,
	SET_ATTRIBUTE: SET_ATTRIBUTE,
	SET_EVENT: SET_EVENT,
	SET_PROPERTY: SET_PROPERTY,
	TEXT_CONTENT: TEXT_CONTENT
});

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

var compareAttributes = function (src, dst) {
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
    var srcAttrValue = getAccessor(src, srcAttrName);
    var dstAttr = dstAttrs[srcAttrName];
    var dstAttrValue = getAccessor(dst, srcAttrName);

    if (!dstAttr) {
      instructions.push({
        data: { name: srcAttrName },
        destination: dst,
        source: src,
        type: REMOVE_ATTRIBUTE
      });
    } else if (srcAttrValue !== dstAttrValue) {
      instructions.push({
        data: { name: srcAttrName, value: dstAttrValue },
        destination: dst,
        source: src,
        type: SET_ATTRIBUTE
      });
    }
  }

  // We only need to worry about setting attributes that don't already exist
  // in the source.
  for (var _a = 0; _a < dstAttrsLen; _a++) {
    var _dstAttr = dstAttrs[_a];
    var dstAttrName = _dstAttr.name;
    var _dstAttrValue = getAccessor(dst, dstAttrName);
    var _srcAttr = srcAttrs[dstAttrName];

    if (!_srcAttr) {
      instructions.push({
        data: { name: dstAttrName, value: _dstAttrValue },
        destination: dst,
        source: src,
        type: SET_ATTRIBUTE
      });
    }
  }

  return instructions;
};

// Because weak map polyfills either are too big or don't use native if
// available properly.

var index$1 = 0;
var prefix = '__WEAK_MAP_POLYFILL_';

var WeakMap$1 = (function () {
  if (typeof WeakMap !== 'undefined') {
    return WeakMap;
  }

  function Polyfill() {
    this.key = prefix + index$1;
    ++index$1;
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

var map = new WeakMap$1();

var eventMap = function (elem) {
  var events = map.get(elem);
  events || map.set(elem, events = {});
  return events;
};

var compareEvents = function (src, dst) {
  var dstEvents = dst.events;
  var srcEvents = eventMap(src);
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
          type: SET_EVENT
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
          type: SET_EVENT
        });
      }
    }
  }

  return instructions;
};

var compareElement = function (src, dst) {
  if (src.tagName === dst.tagName) {
    return compareAttributes(src, dst).concat(compareEvents(src, dst));
  }
};

var text = function (src, dst) {
  if (src.textContent === dst.textContent) {
    return [];
  }

  return [{
    destination: dst,
    source: src,
    type: TEXT_CONTENT
  }];
};

var NODE_COMMENT = 8;
var NODE_ELEMENT = 1;
var NODE_TEXT = 3;

var compareNode = function (src, dst) {
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
    return compareElement(src, dst);
  } else if (dstType === NODE_TEXT) {
    return text(src, dst);
  } else if (dstType === NODE_COMMENT) {
    return text(src, dst);
  }
};

var realNodeMap = new WeakMap$1();

var _window$1 = window;
var Node$1 = _window$1.Node;


var realNode = function (node) {
  return node instanceof Node$1 ? node : realNodeMap.get(node);
};

var _window = window;
var Node = _window.Node;


function diffNode(source, destination) {
  var nodeInstructions = compareNode(source, destination);

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
    type: REPLACE_CHILD
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
        type: APPEND_CHILD
      });
      continue;
    } else {
      // Ensure the real node is carried over even if the destination isn't used.
      // This is used in the render() function to keep track of the real node
      // that corresponds to a virtual node if a virtual tree is being used.
      if (!(curDst instanceof Node)) {
        realNodeMap.set(curDst, realNode(curSrc));
      }
    }

    instructions = instructions.concat(diffNode(curSrc, curDst));
  }

  if (dstChsLen < srcChsLen) {
    for (var _a = dstChsLen; _a < srcChsLen; _a++) {
      instructions.push({
        destination: srcChs[_a],
        source: src,
        type: REMOVE_CHILD
      });
    }
  }

  return instructions;
}

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) {
  return typeof obj;
} : function (obj) {
  return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj;
};





var asyncGenerator = function () {
  function AwaitValue(value) {
    this.value = value;
  }

  function AsyncGenerator(gen) {
    var front, back;

    function send(key, arg) {
      return new Promise(function (resolve, reject) {
        var request = {
          key: key,
          arg: arg,
          resolve: resolve,
          reject: reject,
          next: null
        };

        if (back) {
          back = back.next = request;
        } else {
          front = back = request;
          resume(key, arg);
        }
      });
    }

    function resume(key, arg) {
      try {
        var result = gen[key](arg);
        var value = result.value;

        if (value instanceof AwaitValue) {
          Promise.resolve(value.value).then(function (arg) {
            resume("next", arg);
          }, function (arg) {
            resume("throw", arg);
          });
        } else {
          settle(result.done ? "return" : "normal", result.value);
        }
      } catch (err) {
        settle("throw", err);
      }
    }

    function settle(type, value) {
      switch (type) {
        case "return":
          front.resolve({
            value: value,
            done: true
          });
          break;

        case "throw":
          front.reject(value);
          break;

        default:
          front.resolve({
            value: value,
            done: false
          });
          break;
      }

      front = front.next;

      if (front) {
        resume(front.key, front.arg);
      } else {
        back = null;
      }
    }

    this._invoke = send;

    if (typeof gen.return !== "function") {
      this.return = undefined;
    }
  }

  if (typeof Symbol === "function" && Symbol.asyncIterator) {
    AsyncGenerator.prototype[Symbol.asyncIterator] = function () {
      return this;
    };
  }

  AsyncGenerator.prototype.next = function (arg) {
    return this._invoke("next", arg);
  };

  AsyncGenerator.prototype.throw = function (arg) {
    return this._invoke("throw", arg);
  };

  AsyncGenerator.prototype.return = function (arg) {
    return this._invoke("return", arg);
  };

  return {
    wrap: function (fn) {
      return function () {
        return new AsyncGenerator(fn.apply(this, arguments));
      };
    },
    await: function (value) {
      return new AwaitValue(value);
    }
  };
}();















var get$1 = function get$1(object, property, receiver) {
  if (object === null) object = Function.prototype;
  var desc = Object.getOwnPropertyDescriptor(object, property);

  if (desc === undefined) {
    var parent = Object.getPrototypeOf(object);

    if (parent === null) {
      return undefined;
    } else {
      return get$1(parent, property, receiver);
    }
  } else if ("value" in desc) {
    return desc.value;
  } else {
    var getter = desc.get;

    if (getter === undefined) {
      return undefined;
    }

    return getter.call(receiver);
  }
};

















var set$1 = function set$1(object, property, value, receiver) {
  var desc = Object.getOwnPropertyDescriptor(object, property);

  if (desc === undefined) {
    var parent = Object.getPrototypeOf(object);

    if (parent !== null) {
      set$1(parent, property, value, receiver);
    }
  } else if ("value" in desc && desc.writable) {
    desc.value = value;
  } else {
    var setter = desc.set;

    if (setter !== undefined) {
      setter.call(receiver, value);
    }
  }

  return value;
};

var _window$2 = window;
var Node$2 = _window$2.Node;


function createElement(el) {
  var realNode = document.createElement(el.tagName);
  var attributes = el.attributes;
  var events = el.events;
  var eventHandlers = eventMap(realNode);
  var children = el.childNodes;

  if (attributes) {
    var attributesLen = attributes.length;
    for (var a = 0; a < attributesLen; a++) {
      var attr = attributes[a];
      setAccessor(realNode, attr.name, attr.value);
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
  if (el instanceof Node$2) {
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
  realNodeMap.set(el, realNode);
  return realNode;
}

var appendChild = function (src, dst) {
  realNode(src).appendChild(render(dst));
};

var removeAttribute = function (src, dst, data) {
  removeAccessor(realNode(src), data.name);
};

var removeChild = function (src, dst) {
  var realDst = realNode(dst);
  var realSrc = realNode(src);

  // We don't do parentNode.removeChild because parentNode may report
  // incorrectly in some prollyfills since it's impossible (?) to spoof.
  realSrc.removeChild(realDst);
};

var replaceChild = function (src, dst) {
  var realSrc = realNode(src);
  realSrc && realSrc.parentNode && realSrc.parentNode.replaceChild(render(dst), realSrc);
};

var setAttribute = function (src, dst, data) {
  setAccessor(realNode(src), data.name, data.value);
};

var setEvent = function (src, dst, data) {
  var realSrc = realNode(src);
  var eventHandlers = eventMap(realSrc);
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

var textContent = function (src, dst) {
  realNode(src).textContent = dst.textContent;
};

var patchers = {};
patchers[APPEND_CHILD] = appendChild;
patchers[REMOVE_ATTRIBUTE] = removeAttribute;
patchers[REMOVE_CHILD] = removeChild;
patchers[REPLACE_CHILD] = replaceChild;
patchers[SET_ATTRIBUTE] = setAttribute;
patchers[SET_EVENT] = setEvent;
patchers[TEXT_CONTENT] = textContent;

function patch(instruction) {
  patchers[instruction.type](instruction.source, instruction.destination, instruction.data);
}

var patch$1 = function (instructions) {
  instructions.forEach(patch);
};

var merge = function (opts) {
  var inst = diff(opts);
  patch$1(inst);
  return inst;
};

function createTextNode(item) {
  return {
    nodeType: 3,
    textContent: item
  };
}

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
      mapAccessor(node, name, value);
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
      out.push(createTextNode(item));
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

function removeChildNodes(elem) {
  while (elem.firstChild) {
    var first = elem.firstChild;
    first.parentNode.removeChild(first);
  }
}

var mount = function (elem, tree) {
  removeChildNodes(elem);
  elem.appendChild(render(tree));
};

var _window$3 = window;
var Node$3 = _window$3.Node;

var oldTreeMap = new WeakMap$1();

var render$1 = function (render) {
  return function (elem) {
    elem = elem instanceof Node$3 ? elem : this;

    if (!(elem instanceof Node$3)) {
      throw new Error('No node provided to diff renderer as either the first argument or the context.');
    }

    // Create a new element to house the new tree since we diff / mount fragments.
    var newTree = element('div', null, render(elem));
    var oldTree = oldTreeMap.get(elem);

    if (oldTree) {
      merge({
        destination: newTree,
        source: oldTree
      });
    } else {
      mount(elem, newTree.childNodes);
    }

    oldTreeMap.set(elem, newTree);
  };
};

var vdom = {
  dom: render,
  element: element,
  mount: mount,
  text: createTextNode
};

var version = '0.3.1';

var index = {
  diff: diff,
  merge: merge,
  patch: patch$1,
  render: render$1,
  types: types,
  vdom: vdom,
  version: version
};

exports['default'] = index;

Object.defineProperty(exports, '__esModule', { value: true });

})));
//# sourceMappingURL=index.js.map
