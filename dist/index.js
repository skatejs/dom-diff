(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
  typeof define === 'function' && define.amd ? define(factory) :
  (global.skatejs-dom-diff = factory());
}(this, function () {

  var babelHelpers = {};
  babelHelpers.typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) {
    return typeof obj;
  } : function (obj) {
    return obj && typeof Symbol === "function" && obj.constructor === Symbol ? "symbol" : typeof obj;
  };
  babelHelpers;

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

  function compareAttributes (src, dst) {
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
    for (var a = 0; a < dstAttrsLen; a++) {
      var dstAttr = dstAttrs[a];
      var dstAttrName = dstAttr.name;
      var dstAttrValue = getAccessor(dst, dstAttrName);
      var srcAttr = srcAttrs[dstAttrName];

      if (!srcAttr) {
        instructions.push({
          data: { name: dstAttrName, value: dstAttrValue },
          destination: dst,
          source: src,
          type: SET_ATTRIBUTE
        });
      }
    }

    return instructions;
  }

  // Because weak map polyfills either are too big or don't use native if
  // available properly.

  var index = 0;
  var prefix = '__WEAK_MAP_POLYFILL_';

  var WeakMap$1 = function () {
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

  var map = new WeakMap$1();

  function eventMap (elem) {
    var events = map.get(elem);
    events || map.set(elem, events = {});
    return events;
  }

  function compareEvents (src, dst) {
    var dstEvents = dst.events;
    var srcEvents = eventMap(src);
    var instructions = [];

    // Remove any source events that aren't in the source before seeing if we
    // need to add any from the destination.
    if (srcEvents) {
      for (var name in srcEvents) {
        if (dstEvents[name] !== srcEvents[name]) {
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
      for (var name in dstEvents) {
        var value = dstEvents[name];
        if (srcEvents[name] !== value) {
          instructions.push({
            data: { name: name, value: value },
            destination: dst,
            source: src,
            type: SET_EVENT
          });
        }
      }
    }

    return instructions;
  }

  function compareElement (src, dst) {
    if (src.tagName === dst.tagName) {
      return compareAttributes(src, dst).concat(compareEvents(src, dst));
    }
  }

  function text (src, dst) {
    if (src.textContent === dst.textContent) {
      return [];
    }

    return [{
      destination: dst,
      source: src,
      type: TEXT_CONTENT
    }];
  }

  var NODE_COMMENT = 8;
  var NODE_ELEMENT = 1;
  var NODE_TEXT = 3;

  function compareNode (src, dst) {
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
      return compareElement(src, dst);
    } else if (dstType === NODE_TEXT) {
      return text(src, dst);
    } else if (dstType === NODE_COMMENT) {
      return text(src, dst);
    }
  }

  var realNodeMap = new WeakMap$1();

  var _window$1 = window;
  var Node$2 = _window$1.Node;

  function realNode (node) {
    return node instanceof Node$2 ? node : realNodeMap.get(node);
  }

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

      var nodeInstructions = compareNode(curSrc, curDst);

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
          type: REPLACE_CHILD
        });
      }
    }

    if (dstChsLen < srcChsLen) {
      for (var a = dstChsLen; a < srcChsLen; a++) {
        instructions.push({
          destination: srcChs[a],
          source: src,
          type: REMOVE_CHILD
        });
      }
    }

    return instructions;
  }

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

      for (var a = 0; a < childrenLen; a++) {
        var ch = children[a];
        ch && docfrag.appendChild(render$1(ch));
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

  function render$1(el) {
    if (el instanceof Node) {
      return el;
    }
    if (Array.isArray(el)) {
      var _ret = function () {
        var frag = document.createDocumentFragment();
        el.forEach(function (item) {
          return frag.appendChild(render$1(item));
        });
        return {
          v: frag
        };
      }();

      if ((typeof _ret === 'undefined' ? 'undefined' : babelHelpers.typeof(_ret)) === "object") return _ret.v;
    }
    var realNode = el.tagName ? createElement(el) : createText(el);
    realNodeMap.set(el, realNode);
    return realNode;
  }

  function appendChild (src, dst) {
    realNode(src).appendChild(render$1(dst));
  }

  function removeAttribute (src, dst, data) {
    removeAccessor(realNode(src), data.name);
  }

  function removeChild (src, dst) {
    var realDst = realNode(dst);
    var realSrc = realNode(src);

    // We don't do parentNode.removeChild because parentNode may report
    // incorrectly in some prollyfills since it's impossible (?) to spoof.
    realSrc.removeChild(realDst);
  }

  function replaceChild (src, dst) {
    var realSrc = realNode(src);
    realSrc && realSrc.parentNode && realSrc.parentNode.replaceChild(render$1(dst), realSrc);
  }

  function setAttribute (src, dst, data) {
    setAccessor(realNode(src), data.name, data.value);
  }

  function setEvent (src, dst, data) {
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
  }

  function textContent (src, dst) {
    realNode(src).textContent = dst.textContent;
  }

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

  function patch$1 (instructions) {
    instructions.forEach(patch);
  }

  function merge (opts) {
    var inst = diff(opts);
    patch$1(inst);
    return inst;
  }

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
      } else if ((typeof item === 'undefined' ? 'undefined' : babelHelpers.typeof(item)) === 'object') {
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
    var attrs = arguments.length <= 1 || arguments[1] === undefined ? {} : arguments[1];

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

  function mount (elem, tree) {
    removeChildNodes(elem);
    elem.appendChild(render$1(tree));
  }

  var _window = window;
  var Node$1 = _window.Node;

  var oldTreeMap = new WeakMap$1();

  function render (render) {
    return function (elem) {
      elem = elem instanceof Node$1 ? elem : this;

      if (!elem instanceof Node$1) {
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
  }

  var vdom = {
    dom: render$1,
    element: element,
    mount: mount,
    text: createTextNode
  };

  var version = '0.3.1';

  var main = {
    diff: diff,
    merge: merge,
    patch: patch$1,
    render: render,
    types: types,
    vdom: vdom,
    version: version
  };

  var previousGlobal = window.skatejsDomDiff;
  main.noConflict = function noConflict() {
    window.skatejsDomDiff = previousGlobal;
    return this;
  };
  window.skatejsDomDiff = main;

  return main;

}));
//# sourceMappingURL=index.js.map