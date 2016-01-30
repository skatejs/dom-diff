(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
  typeof define === 'function' && define.amd ? define(factory) :
  (global.skatejs-dom-diff = factory());
}(this, function () {

  var __commonjs_global = typeof window !== 'undefined' ? window : typeof global !== 'undefined' ? global : this;
  function __commonjs(fn, module) { return module = { exports: {} }, fn(module, module.exports, __commonjs_global), module.exports; }

  var version = __commonjs(function (module, exports, global) {
  (function (global, factory) {
    if (typeof define === "function" && define.amd) {
      define(['module', 'exports'], factory);
    } else if (typeof exports !== "undefined") {
      factory(module, exports);
    } else {
      var mod = {
        exports: {}
      };
      factory(mod, mod.exports);
      global.version = mod.exports;
    }
  })(__commonjs_global, function (module, exports) {
    'use strict';

    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    exports.default = '0.3.1';
    module.exports = exports['default'];
  });
  });

  var require$$0$1 = (version && typeof version === 'object' && 'default' in version ? version['default'] : version);

  var text = __commonjs(function (module, exports, global) {
  (function (global, factory) {
    if (typeof define === "function" && define.amd) {
      define(["module", "exports"], factory);
    } else if (typeof exports !== "undefined") {
      factory(module, exports);
    } else {
      var mod = {
        exports: {}
      };
      factory(mod, mod.exports);
      global.text = mod.exports;
    }
  })(__commonjs_global, function (module, exports) {
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

    module.exports = exports['default'];
  });
  });

  var require$$0$3 = (text && typeof text === 'object' && 'default' in text ? text['default'] : text);

  var weakMap = __commonjs(function (module, exports, global) {
  (function (global, factory) {
    if (typeof define === "function" && define.amd) {
      define(['module', 'exports'], factory);
    } else if (typeof exports !== "undefined") {
      factory(module, exports);
    } else {
      var mod = {
        exports: {}
      };
      factory(mod, mod.exports);
      global.weakMap = mod.exports;
    }
  })(__commonjs_global, function (module, exports) {
    'use strict';

    Object.defineProperty(exports, "__esModule", {
      value: true
    });
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

    module.exports = exports['default'];
  });
  });

  var require$$0$6 = (weakMap && typeof weakMap === 'object' && 'default' in weakMap ? weakMap['default'] : weakMap);

  var realNodeMap = __commonjs(function (module, exports, global) {
  (function (global, factory) {
    if (typeof define === "function" && define.amd) {
      define(['module', 'exports', './weak-map'], factory);
    } else if (typeof exports !== "undefined") {
      factory(module, exports, require$$0$6);
    } else {
      var mod = {
        exports: {}
      };
      factory(mod, mod.exports, global.weakMap);
      global.realNodeMap = mod.exports;
    }
  })(__commonjs_global, function (module, exports, _weakMap) {
    'use strict';

    Object.defineProperty(exports, "__esModule", {
      value: true
    });

    var _weakMap2 = _interopRequireDefault(_weakMap);

    function _interopRequireDefault(obj) {
      return obj && obj.__esModule ? obj : {
        default: obj
      };
    }

    exports.default = new _weakMap2.default();
    module.exports = exports['default'];
  });
  });

  var require$$0$8 = (realNodeMap && typeof realNodeMap === 'object' && 'default' in realNodeMap ? realNodeMap['default'] : realNodeMap);

  var eventMap = __commonjs(function (module, exports, global) {
  (function (global, factory) {
    if (typeof define === "function" && define.amd) {
      define(['module', 'exports', './weak-map'], factory);
    } else if (typeof exports !== "undefined") {
      factory(module, exports, require$$0$6);
    } else {
      var mod = {
        exports: {}
      };
      factory(mod, mod.exports, global.weakMap);
      global.eventMap = mod.exports;
    }
  })(__commonjs_global, function (module, exports, _weakMap) {
    'use strict';

    Object.defineProperty(exports, "__esModule", {
      value: true
    });

    exports.default = function (elem) {
      var events = map.get(elem);
      events || map.set(elem, events = {});
      return events;
    };

    var _weakMap2 = _interopRequireDefault(_weakMap);

    function _interopRequireDefault(obj) {
      return obj && obj.__esModule ? obj : {
        default: obj
      };
    }

    var map = new _weakMap2.default();
    module.exports = exports['default'];
  });
  });

  var require$$0$10 = (eventMap && typeof eventMap === 'object' && 'default' in eventMap ? eventMap['default'] : eventMap);

  var accessor = __commonjs(function (module, exports, global) {
  (function (global, factory) {
    if (typeof define === "function" && define.amd) {
      define(['exports'], factory);
    } else if (typeof exports !== "undefined") {
      factory(exports);
    } else {
      var mod = {
        exports: {}
      };
      factory(mod.exports);
      global.accessor = mod.exports;
    }
  })(__commonjs_global, function (exports) {
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
      } else if (name !== 'type' && name in node) {
        return node[name];
      } else if (node.getAttribute) {
        return node.getAttribute(name);
      } else if (node.attributes && node.attributes[name]) {
        return node.attributes[name].value;
      }
    }

    function mapAccessor(node, name, value) {
      if (name === 'class') {
        node.className = classToString(value);
      } else if (name === 'style') {
        node.style = {
          cssText: styleToString(value)
        };
      }
    }

    function removeAccessor(node, name) {
      if (name === 'class') {
        node.className = '';
      } else if (name === 'style') {
        node.style.cssText = '';
      } else if (name !== 'type' && name in node) {
        node[name] = '';
      } else if (node.removeAttribute) {
        node.removeAttribute(name);
      } else if (node.attributes) {
        delete node.attributes[name];
      }
    }

    function setAccessor(node, name, value) {
      if (name === 'class') {
        node.className = value;
      } else if (name === 'style') {
        node.style.cssText = value;
      } else if (name !== 'type' && name in node || typeof value !== 'string') {
        node[name] = value == null ? '' : value;
      } else if (node.setAttribute) {
        node.setAttribute(name, value);
      } else if (node.attributes) {
        node.attributes[node.attributes.length] = node.attributes[name] = {
          name: name,
          value: value
        };
      }
    }
  });
  });

  var require$$0$9 = (accessor && typeof accessor === 'object' && 'default' in accessor ? accessor['default'] : accessor);

  var dom = __commonjs(function (module, exports, global) {
  (function (global, factory) {
    if (typeof define === "function" && define.amd) {
      define(['module', 'exports', '../util/accessor', '../util/event-map', '../util/real-node-map'], factory);
    } else if (typeof exports !== "undefined") {
      factory(module, exports, require$$0$9, require$$0$10, require$$0$8);
    } else {
      var mod = {
        exports: {}
      };
      factory(mod, mod.exports, global.accessor, global.eventMap, global.realNodeMap);
      global.dom = mod.exports;
    }
  })(__commonjs_global, function (module, exports, _accessor, _eventMap, _realNodeMap) {
    'use strict';

    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    exports.default = render;

    var _eventMap2 = _interopRequireDefault(_eventMap);

    var _realNodeMap2 = _interopRequireDefault(_realNodeMap);

    function _interopRequireDefault(obj) {
      return obj && obj.__esModule ? obj : {
        default: obj
      };
    }

    var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) {
      return typeof obj;
    } : function (obj) {
      return obj && typeof Symbol === "function" && obj.constructor === Symbol ? "symbol" : typeof obj;
    };

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

    module.exports = exports['default'];
  });
  });

  var require$$0$5 = (dom && typeof dom === 'object' && 'default' in dom ? dom['default'] : dom);

  var mount = __commonjs(function (module, exports, global) {
  (function (global, factory) {
    if (typeof define === "function" && define.amd) {
      define(['module', 'exports', './dom'], factory);
    } else if (typeof exports !== "undefined") {
      factory(module, exports, require$$0$5);
    } else {
      var mod = {
        exports: {}
      };
      factory(mod, mod.exports, global.dom);
      global.mount = mod.exports;
    }
  })(__commonjs_global, function (module, exports, _dom) {
    'use strict';

    Object.defineProperty(exports, "__esModule", {
      value: true
    });

    exports.default = function (elem, tree) {
      removeChildNodes(elem);
      elem.appendChild((0, _dom2.default)(tree));
    };

    var _dom2 = _interopRequireDefault(_dom);

    function _interopRequireDefault(obj) {
      return obj && obj.__esModule ? obj : {
        default: obj
      };
    }

    function removeChildNodes(elem) {
      while (elem.firstChild) {
        var first = elem.firstChild;
        first.parentNode.removeChild(first);
      }
    }

    module.exports = exports['default'];
  });
  });

  var require$$0$4 = (mount && typeof mount === 'object' && 'default' in mount ? mount['default'] : mount);

  var element = __commonjs(function (module, exports, global) {
  (function (global, factory) {
    if (typeof define === "function" && define.amd) {
      define(['module', 'exports', '../util/accessor', './text'], factory);
    } else if (typeof exports !== "undefined") {
      factory(module, exports, require$$0$9, require$$0$3);
    } else {
      var mod = {
        exports: {}
      };
      factory(mod, mod.exports, global.accessor, global.text);
      global.element = mod.exports;
    }
  })(__commonjs_global, function (module, exports, _accessor, _text) {
    'use strict';

    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    exports.default = element;

    var _text2 = _interopRequireDefault(_text);

    function _interopRequireDefault(obj) {
      return obj && obj.__esModule ? obj : {
        default: obj
      };
    }

    var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) {
      return typeof obj;
    } : function (obj) {
      return obj && typeof Symbol === "function" && obj.constructor === Symbol ? "symbol" : typeof obj;
    };

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
          attrs[attrIdx++] = attrs[name] = {
            name: name,
            value: value
          };
          (0, _accessor.mapAccessor)(node, name, value);
        }
      }

      attrs.length = attrIdx;
      return {
        attrs: attrs,
        events: events,
        node: node
      };
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

    element.array = ensureNodes;
    ['a', 'abbr', 'address', 'area', 'article', 'aside', 'audio', 'b', 'base', 'bdi', 'bdo', 'bgsound', 'blockquote', 'body', 'br', 'button', 'canvas', 'caption', 'cite', 'code', 'col', 'colgroup', 'command', 'content', 'data', 'datalist', 'dd', 'del', 'details', 'dfn', 'dialog', 'div', 'dl', 'dt', 'element', 'em', 'embed', 'fieldset', 'figcaption', 'figure', 'font', 'footer', 'form', 'h1', 'h2', 'h3', 'h4', 'h5', 'h6', 'head', 'header', 'hgroup', 'hr', 'html', 'i', 'iframe', 'image', 'img', 'input', 'ins', 'kbd', 'keygen', 'label', 'legend', 'li', 'link', 'main', 'map', 'mark', 'marquee', 'menu', 'menuitem', 'meta', 'meter', 'multicol', 'nav', 'nobr', 'noembed', 'noframes', 'noscript', 'object', 'ol', 'optgroup', 'option', 'output', 'p', 'param', 'picture', 'pre', 'progress', 'q', 'rp', 'rt', 'rtc', 'ruby', 's', 'samp', 'script', 'section', 'select', 'shadow', 'small', 'source', 'span', 'strong', 'style', 'sub', 'summary', 'sup', 'table', 'tbody', 'td', 'template', 'textarea', 'tfoot', 'th', 'thead', 'time', 'title', 'tr', 'track', 'u', 'ul', 'var', 'video', 'wbr'].forEach(function (tag) {
      element[tag] = element.bind(null, tag);
    });
    module.exports = exports['default'];
  });
  });

  var require$$2 = (element && typeof element === 'object' && 'default' in element ? element['default'] : element);

  var index$1 = __commonjs(function (module, exports, global) {
  (function (global, factory) {
    if (typeof define === "function" && define.amd) {
      define(['module', 'exports', './dom', './element', './mount', './text'], factory);
    } else if (typeof exports !== "undefined") {
      factory(module, exports, require$$0$5, require$$2, require$$0$4, require$$0$3);
    } else {
      var mod = {
        exports: {}
      };
      factory(mod, mod.exports, global.dom, global.element, global.mount, global.text);
      global.index = mod.exports;
    }
  })(__commonjs_global, function (module, exports, _dom, _element, _mount, _text) {
    'use strict';

    Object.defineProperty(exports, "__esModule", {
      value: true
    });

    var _dom2 = _interopRequireDefault(_dom);

    var _element2 = _interopRequireDefault(_element);

    var _mount2 = _interopRequireDefault(_mount);

    var _text2 = _interopRequireDefault(_text);

    function _interopRequireDefault(obj) {
      return obj && obj.__esModule ? obj : {
        default: obj
      };
    }

    exports.default = {
      dom: _dom2.default,
      element: _element2.default,
      mount: _mount2.default,
      text: _text2.default
    };
    module.exports = exports['default'];
  });
  });

  var require$$1 = (index$1 && typeof index$1 === 'object' && 'default' in index$1 ? index$1['default'] : index$1);

  var types = __commonjs(function (module, exports, global) {
  (function (global, factory) {
    if (typeof define === "function" && define.amd) {
      define(["exports"], factory);
    } else if (typeof exports !== "undefined") {
      factory(exports);
    } else {
      var mod = {
        exports: {}
      };
      factory(mod.exports);
      global.types = mod.exports;
    }
  })(__commonjs_global, function (exports) {
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
  });
  });

  var require$$1$1 = (types && typeof types === 'object' && 'default' in types ? types['default'] : types);

  var realNode = __commonjs(function (module, exports, global) {
  (function (global, factory) {
    if (typeof define === "function" && define.amd) {
      define(['module', 'exports', './real-node-map'], factory);
    } else if (typeof exports !== "undefined") {
      factory(module, exports, require$$0$8);
    } else {
      var mod = {
        exports: {}
      };
      factory(mod, mod.exports, global.realNodeMap);
      global.realNode = mod.exports;
    }
  })(__commonjs_global, function (module, exports, _realNodeMap) {
    'use strict';

    Object.defineProperty(exports, "__esModule", {
      value: true
    });

    exports.default = function (node) {
      return node instanceof Node ? node : _realNodeMap2.default.get(node);
    };

    var _realNodeMap2 = _interopRequireDefault(_realNodeMap);

    function _interopRequireDefault(obj) {
      return obj && obj.__esModule ? obj : {
        default: obj
      };
    }

    var _window = window;
    var Node = _window.Node;
    module.exports = exports['default'];
  });
  });

  var require$$1$5 = (realNode && typeof realNode === 'object' && 'default' in realNode ? realNode['default'] : realNode);

  var textContent = __commonjs(function (module, exports, global) {
  (function (global, factory) {
    if (typeof define === "function" && define.amd) {
      define(['module', 'exports', '../util/real-node'], factory);
    } else if (typeof exports !== "undefined") {
      factory(module, exports, require$$1$5);
    } else {
      var mod = {
        exports: {}
      };
      factory(mod, mod.exports, global.realNode);
      global.textContent = mod.exports;
    }
  })(__commonjs_global, function (module, exports, _realNode) {
    'use strict';

    Object.defineProperty(exports, "__esModule", {
      value: true
    });

    exports.default = function (src, dst) {
      (0, _realNode2.default)(src).textContent = dst.textContent;
    };

    var _realNode2 = _interopRequireDefault(_realNode);

    function _interopRequireDefault(obj) {
      return obj && obj.__esModule ? obj : {
        default: obj
      };
    }

    module.exports = exports['default'];
  });
  });

  var require$$0$7 = (textContent && typeof textContent === 'object' && 'default' in textContent ? textContent['default'] : textContent);

  var setEvent = __commonjs(function (module, exports, global) {
  (function (global, factory) {
    if (typeof define === "function" && define.amd) {
      define(['module', 'exports', '../util/event-map', '../util/real-node'], factory);
    } else if (typeof exports !== "undefined") {
      factory(module, exports, require$$0$10, require$$1$5);
    } else {
      var mod = {
        exports: {}
      };
      factory(mod, mod.exports, global.eventMap, global.realNode);
      global.setEvent = mod.exports;
    }
  })(__commonjs_global, function (module, exports, _eventMap, _realNode) {
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

    var _eventMap2 = _interopRequireDefault(_eventMap);

    var _realNode2 = _interopRequireDefault(_realNode);

    function _interopRequireDefault(obj) {
      return obj && obj.__esModule ? obj : {
        default: obj
      };
    }

    module.exports = exports['default'];
  });
  });

  var require$$1$4 = (setEvent && typeof setEvent === 'object' && 'default' in setEvent ? setEvent['default'] : setEvent);

  var setAttribute = __commonjs(function (module, exports, global) {
  (function (global, factory) {
    if (typeof define === "function" && define.amd) {
      define(['module', 'exports', '../util/accessor', '../util/real-node'], factory);
    } else if (typeof exports !== "undefined") {
      factory(module, exports, require$$0$9, require$$1$5);
    } else {
      var mod = {
        exports: {}
      };
      factory(mod, mod.exports, global.accessor, global.realNode);
      global.setAttribute = mod.exports;
    }
  })(__commonjs_global, function (module, exports, _accessor, _realNode) {
    'use strict';

    Object.defineProperty(exports, "__esModule", {
      value: true
    });

    exports.default = function (src, dst, data) {
      (0, _accessor.setAccessor)((0, _realNode2.default)(src), data.name, data.value);
    };

    var _realNode2 = _interopRequireDefault(_realNode);

    function _interopRequireDefault(obj) {
      return obj && obj.__esModule ? obj : {
        default: obj
      };
    }

    module.exports = exports['default'];
  });
  });

  var require$$2$1 = (setAttribute && typeof setAttribute === 'object' && 'default' in setAttribute ? setAttribute['default'] : setAttribute);

  var replaceChild = __commonjs(function (module, exports, global) {
  (function (global, factory) {
    if (typeof define === "function" && define.amd) {
      define(['module', 'exports', '../vdom/dom', '../util/real-node'], factory);
    } else if (typeof exports !== "undefined") {
      factory(module, exports, require$$0$5, require$$1$5);
    } else {
      var mod = {
        exports: {}
      };
      factory(mod, mod.exports, global.dom, global.realNode);
      global.replaceChild = mod.exports;
    }
  })(__commonjs_global, function (module, exports, _dom, _realNode) {
    'use strict';

    Object.defineProperty(exports, "__esModule", {
      value: true
    });

    exports.default = function (src, dst) {
      var realSrc = (0, _realNode2.default)(src);
      realSrc && realSrc.parentNode && realSrc.parentNode.replaceChild((0, _dom2.default)(dst), realSrc);
    };

    var _dom2 = _interopRequireDefault(_dom);

    var _realNode2 = _interopRequireDefault(_realNode);

    function _interopRequireDefault(obj) {
      return obj && obj.__esModule ? obj : {
        default: obj
      };
    }

    module.exports = exports['default'];
  });
  });

  var require$$3$1 = (replaceChild && typeof replaceChild === 'object' && 'default' in replaceChild ? replaceChild['default'] : replaceChild);

  var removeChild = __commonjs(function (module, exports, global) {
  (function (global, factory) {
    if (typeof define === "function" && define.amd) {
      define(['module', 'exports', '../util/real-node'], factory);
    } else if (typeof exports !== "undefined") {
      factory(module, exports, require$$1$5);
    } else {
      var mod = {
        exports: {}
      };
      factory(mod, mod.exports, global.realNode);
      global.removeChild = mod.exports;
    }
  })(__commonjs_global, function (module, exports, _realNode) {
    'use strict';

    Object.defineProperty(exports, "__esModule", {
      value: true
    });

    exports.default = function (src, dst) {
      var realDst = (0, _realNode2.default)(dst);
      realDst.parentNode.removeChild(realDst);
    };

    var _realNode2 = _interopRequireDefault(_realNode);

    function _interopRequireDefault(obj) {
      return obj && obj.__esModule ? obj : {
        default: obj
      };
    }

    module.exports = exports['default'];
  });
  });

  var require$$4 = (removeChild && typeof removeChild === 'object' && 'default' in removeChild ? removeChild['default'] : removeChild);

  var removeAttribute = __commonjs(function (module, exports, global) {
  (function (global, factory) {
    if (typeof define === "function" && define.amd) {
      define(['module', 'exports', '../util/accessor', '../util/real-node'], factory);
    } else if (typeof exports !== "undefined") {
      factory(module, exports, require$$0$9, require$$1$5);
    } else {
      var mod = {
        exports: {}
      };
      factory(mod, mod.exports, global.accessor, global.realNode);
      global.removeAttribute = mod.exports;
    }
  })(__commonjs_global, function (module, exports, _accessor, _realNode) {
    'use strict';

    Object.defineProperty(exports, "__esModule", {
      value: true
    });

    exports.default = function (src, dst, data) {
      (0, _accessor.removeAccessor)((0, _realNode2.default)(src), data.name);
    };

    var _realNode2 = _interopRequireDefault(_realNode);

    function _interopRequireDefault(obj) {
      return obj && obj.__esModule ? obj : {
        default: obj
      };
    }

    module.exports = exports['default'];
  });
  });

  var require$$5 = (removeAttribute && typeof removeAttribute === 'object' && 'default' in removeAttribute ? removeAttribute['default'] : removeAttribute);

  var appendChild = __commonjs(function (module, exports, global) {
  (function (global, factory) {
    if (typeof define === "function" && define.amd) {
      define(['module', 'exports', '../util/real-node', '../vdom/dom'], factory);
    } else if (typeof exports !== "undefined") {
      factory(module, exports, require$$1$5, require$$0$5);
    } else {
      var mod = {
        exports: {}
      };
      factory(mod, mod.exports, global.realNode, global.dom);
      global.appendChild = mod.exports;
    }
  })(__commonjs_global, function (module, exports, _realNode, _dom) {
    'use strict';

    Object.defineProperty(exports, "__esModule", {
      value: true
    });

    exports.default = function (src, dst) {
      (0, _realNode2.default)(src).appendChild((0, _dom2.default)(dst));
    };

    var _realNode2 = _interopRequireDefault(_realNode);

    var _dom2 = _interopRequireDefault(_dom);

    function _interopRequireDefault(obj) {
      return obj && obj.__esModule ? obj : {
        default: obj
      };
    }

    module.exports = exports['default'];
  });
  });

  var require$$6 = (appendChild && typeof appendChild === 'object' && 'default' in appendChild ? appendChild['default'] : appendChild);

  var patch = __commonjs(function (module, exports, global) {
  (function (global, factory) {
    if (typeof define === "function" && define.amd) {
      define(['module', 'exports', './types', './patch/append-child', './patch/remove-attribute', './patch/remove-child', './patch/replace-child', './patch/set-attribute', './patch/set-event', './patch/text-content'], factory);
    } else if (typeof exports !== "undefined") {
      factory(module, exports, require$$1$1, require$$6, require$$5, require$$4, require$$3$1, require$$2$1, require$$1$4, require$$0$7);
    } else {
      var mod = {
        exports: {}
      };
      factory(mod, mod.exports, global.types, global.appendChild, global.removeAttribute, global.removeChild, global.replaceChild, global.setAttribute, global.setEvent, global.textContent);
      global.patch = mod.exports;
    }
  })(__commonjs_global, function (module, exports, _types, _appendChild, _removeAttribute, _removeChild, _replaceChild, _setAttribute, _setEvent, _textContent) {
    'use strict';

    Object.defineProperty(exports, "__esModule", {
      value: true
    });

    exports.default = function (instructions) {
      instructions.forEach(patch);
    };

    var types = _interopRequireWildcard(_types);

    var _appendChild2 = _interopRequireDefault(_appendChild);

    var _removeAttribute2 = _interopRequireDefault(_removeAttribute);

    var _removeChild2 = _interopRequireDefault(_removeChild);

    var _replaceChild2 = _interopRequireDefault(_replaceChild);

    var _setAttribute2 = _interopRequireDefault(_setAttribute);

    var _setEvent2 = _interopRequireDefault(_setEvent);

    var _textContent2 = _interopRequireDefault(_textContent);

    function _interopRequireDefault(obj) {
      return obj && obj.__esModule ? obj : {
        default: obj
      };
    }

    function _interopRequireWildcard(obj) {
      if (obj && obj.__esModule) {
        return obj;
      } else {
        var newObj = {};

        if (obj != null) {
          for (var key in obj) {
            if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key];
          }
        }

        newObj.default = obj;
        return newObj;
      }
    }

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

    module.exports = exports['default'];
  });
  });

  var require$$0$2 = (patch && typeof patch === 'object' && 'default' in patch ? patch['default'] : patch);

  var text$1 = __commonjs(function (module, exports, global) {
  (function (global, factory) {
    if (typeof define === "function" && define.amd) {
      define(['module', 'exports', '../types'], factory);
    } else if (typeof exports !== "undefined") {
      factory(module, exports, require$$1$1);
    } else {
      var mod = {
        exports: {}
      };
      factory(mod, mod.exports, global.types);
      global.text = mod.exports;
    }
  })(__commonjs_global, function (module, exports, _types) {
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

    var types = _interopRequireWildcard(_types);

    function _interopRequireWildcard(obj) {
      if (obj && obj.__esModule) {
        return obj;
      } else {
        var newObj = {};

        if (obj != null) {
          for (var key in obj) {
            if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key];
          }
        }

        newObj.default = obj;
        return newObj;
      }
    }

    module.exports = exports['default'];
  });
  });

  var require$$0$12 = (text$1 && typeof text$1 === 'object' && 'default' in text$1 ? text$1['default'] : text$1);

  var comment = __commonjs(function (module, exports, global) {
  (function (global, factory) {
    if (typeof define === "function" && define.amd) {
      define(['module', 'exports', './text'], factory);
    } else if (typeof exports !== "undefined") {
      factory(module, exports, require$$0$12);
    } else {
      var mod = {
        exports: {}
      };
      factory(mod, mod.exports, global.text);
      global.comment = mod.exports;
    }
  })(__commonjs_global, function (module, exports, _text) {
    'use strict';

    Object.defineProperty(exports, "__esModule", {
      value: true
    });

    var _text2 = _interopRequireDefault(_text);

    function _interopRequireDefault(obj) {
      return obj && obj.__esModule ? obj : {
        default: obj
      };
    }

    exports.default = _text2.default;
    module.exports = exports['default'];
  });
  });

  var require$$0$11 = (comment && typeof comment === 'object' && 'default' in comment ? comment['default'] : comment);

  var events = __commonjs(function (module, exports, global) {
  (function (global, factory) {
    if (typeof define === "function" && define.amd) {
      define(['module', 'exports', '../types', '../util/event-map'], factory);
    } else if (typeof exports !== "undefined") {
      factory(module, exports, require$$1$1, require$$0$10);
    } else {
      var mod = {
        exports: {}
      };
      factory(mod, mod.exports, global.types, global.eventMap);
      global.events = mod.exports;
    }
  })(__commonjs_global, function (module, exports, _types, _eventMap) {
    'use strict';

    Object.defineProperty(exports, "__esModule", {
      value: true
    });

    exports.default = function (src, dst) {
      var dstEvents = dst.events;
      var srcEvents = (0, _eventMap2.default)(src);
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
              type: types.SET_EVENT
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
              type: types.SET_EVENT
            });
          }
        }
      }

      return instructions;
    };

    var types = _interopRequireWildcard(_types);

    var _eventMap2 = _interopRequireDefault(_eventMap);

    function _interopRequireDefault(obj) {
      return obj && obj.__esModule ? obj : {
        default: obj
      };
    }

    function _interopRequireWildcard(obj) {
      if (obj && obj.__esModule) {
        return obj;
      } else {
        var newObj = {};

        if (obj != null) {
          for (var key in obj) {
            if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key];
          }
        }

        newObj.default = obj;
        return newObj;
      }
    }

    module.exports = exports['default'];
  });
  });

  var require$$0$13 = (events && typeof events === 'object' && 'default' in events ? events['default'] : events);

  var attributes = __commonjs(function (module, exports, global) {
  (function (global, factory) {
    if (typeof define === "function" && define.amd) {
      define(['module', 'exports', '../types', '../util/accessor'], factory);
    } else if (typeof exports !== "undefined") {
      factory(module, exports, require$$1$1, require$$0$9);
    } else {
      var mod = {
        exports: {}
      };
      factory(mod, mod.exports, global.types, global.accessor);
      global.attributes = mod.exports;
    }
  })(__commonjs_global, function (module, exports, _types, _accessor) {
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
      for (var a = 0; a < dstAttrsLen; a++) {
        var dstAttr = dstAttrs[a];
        var dstAttrName = dstAttr.name;
        var dstAttrValue = (0, _accessor.getAccessor)(dst, dstAttrName);
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

    var types = _interopRequireWildcard(_types);

    function _interopRequireWildcard(obj) {
      if (obj && obj.__esModule) {
        return obj;
      } else {
        var newObj = {};

        if (obj != null) {
          for (var key in obj) {
            if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key];
          }
        }

        newObj.default = obj;
        return newObj;
      }
    }

    module.exports = exports['default'];
  });
  });

  var require$$1$6 = (attributes && typeof attributes === 'object' && 'default' in attributes ? attributes['default'] : attributes);

  var element$1 = __commonjs(function (module, exports, global) {
  (function (global, factory) {
    if (typeof define === "function" && define.amd) {
      define(['module', 'exports', './attributes', './events'], factory);
    } else if (typeof exports !== "undefined") {
      factory(module, exports, require$$1$6, require$$0$13);
    } else {
      var mod = {
        exports: {}
      };
      factory(mod, mod.exports, global.attributes, global.events);
      global.element = mod.exports;
    }
  })(__commonjs_global, function (module, exports, _attributes, _events) {
    'use strict';

    Object.defineProperty(exports, "__esModule", {
      value: true
    });

    exports.default = function (src, dst) {
      if (src.tagName === dst.tagName) {
        return (0, _attributes2.default)(src, dst).concat((0, _events2.default)(src, dst));
      }
    };

    var _attributes2 = _interopRequireDefault(_attributes);

    var _events2 = _interopRequireDefault(_events);

    function _interopRequireDefault(obj) {
      return obj && obj.__esModule ? obj : {
        default: obj
      };
    }

    module.exports = exports['default'];
  });
  });

  var require$$2$3 = (element$1 && typeof element$1 === 'object' && 'default' in element$1 ? element$1['default'] : element$1);

  var node = __commonjs(function (module, exports, global) {
  (function (global, factory) {
    if (typeof define === "function" && define.amd) {
      define(['module', 'exports', './element', './text', './comment'], factory);
    } else if (typeof exports !== "undefined") {
      factory(module, exports, require$$2$3, require$$0$12, require$$0$11);
    } else {
      var mod = {
        exports: {}
      };
      factory(mod, mod.exports, global.element, global.text, global.comment);
      global.node = mod.exports;
    }
  })(__commonjs_global, function (module, exports, _element, _text, _comment) {
    'use strict';

    Object.defineProperty(exports, "__esModule", {
      value: true
    });

    exports.default = function (src, dst) {
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
        return (0, _element2.default)(src, dst);
      } else if (dstType === NODE_TEXT) {
        return (0, _text2.default)(src, dst);
      } else if (dstType === NODE_COMMENT) {
        return (0, _comment2.default)(src, dst);
      }
    };

    var _element2 = _interopRequireDefault(_element);

    var _text2 = _interopRequireDefault(_text);

    var _comment2 = _interopRequireDefault(_comment);

    function _interopRequireDefault(obj) {
      return obj && obj.__esModule ? obj : {
        default: obj
      };
    }

    var NODE_COMMENT = 8;
    var NODE_ELEMENT = 1;
    var NODE_TEXT = 3;
    module.exports = exports['default'];
  });
  });

  var require$$2$2 = (node && typeof node === 'object' && 'default' in node ? node['default'] : node);

  var diff = __commonjs(function (module, exports, global) {
  (function (global, factory) {
    if (typeof define === "function" && define.amd) {
      define(['module', 'exports', './types', './compare/node', './util/real-node', './util/real-node-map'], factory);
    } else if (typeof exports !== "undefined") {
      factory(module, exports, require$$1$1, require$$2$2, require$$1$5, require$$0$8);
    } else {
      var mod = {
        exports: {}
      };
      factory(mod, mod.exports, global.types, global.node, global.realNode, global.realNodeMap);
      global.diff = mod.exports;
    }
  })(__commonjs_global, function (module, exports, _types, _node, _realNode, _realNodeMap) {
    'use strict';

    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    exports.default = diff;

    var types = _interopRequireWildcard(_types);

    var _node2 = _interopRequireDefault(_node);

    var _realNode2 = _interopRequireDefault(_realNode);

    var _realNodeMap2 = _interopRequireDefault(_realNodeMap);

    function _interopRequireDefault(obj) {
      return obj && obj.__esModule ? obj : {
        default: obj
      };
    }

    function _interopRequireWildcard(obj) {
      if (obj && obj.__esModule) {
        return obj;
      } else {
        var newObj = {};

        if (obj != null) {
          for (var key in obj) {
            if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key];
          }
        }

        newObj.default = obj;
        return newObj;
      }
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

        if (!curSrc) {
          instructions.push({
            destination: dstChs[a],
            source: src,
            type: types.APPEND_CHILD
          });
          continue;
        } else {
          if (!(curDst instanceof Node)) {
            _realNodeMap2.default.set(curDst, (0, _realNode2.default)(curSrc));
          }
        }

        var nodeInstructions = (0, _node2.default)(curSrc, curDst);

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
  });
  });

  var require$$1$3 = (diff && typeof diff === 'object' && 'default' in diff ? diff['default'] : diff);

  var merge = __commonjs(function (module, exports, global) {
  (function (global, factory) {
    if (typeof define === "function" && define.amd) {
      define(['module', 'exports', './diff', './patch'], factory);
    } else if (typeof exports !== "undefined") {
      factory(module, exports, require$$1$3, require$$0$2);
    } else {
      var mod = {
        exports: {}
      };
      factory(mod, mod.exports, global.diff, global.patch);
      global.merge = mod.exports;
    }
  })(__commonjs_global, function (module, exports, _diff, _patch) {
    'use strict';

    Object.defineProperty(exports, "__esModule", {
      value: true
    });

    exports.default = function (opts) {
      var inst = (0, _diff2.default)(opts);
      (0, _patch2.default)(inst);
      return inst;
    };

    var _diff2 = _interopRequireDefault(_diff);

    var _patch2 = _interopRequireDefault(_patch);

    function _interopRequireDefault(obj) {
      return obj && obj.__esModule ? obj : {
        default: obj
      };
    }

    module.exports = exports['default'];
  });
  });

  var require$$1$2 = (merge && typeof merge === 'object' && 'default' in merge ? merge['default'] : merge);

  var render = __commonjs(function (module, exports, global) {
  (function (global, factory) {
    if (typeof define === "function" && define.amd) {
      define(['module', 'exports', './util/weak-map', './vdom/element', './merge', './vdom/mount'], factory);
    } else if (typeof exports !== "undefined") {
      factory(module, exports, require$$0$6, require$$2, require$$1$2, require$$0$4);
    } else {
      var mod = {
        exports: {}
      };
      factory(mod, mod.exports, global.weakMap, global.element, global.merge, global.mount);
      global.render = mod.exports;
    }
  })(__commonjs_global, function (module, exports, _weakMap, _element, _merge, _mount) {
    'use strict';

    Object.defineProperty(exports, "__esModule", {
      value: true
    });

    exports.default = function (render) {
      return function (elem) {
        elem = elem instanceof Node ? elem : this;

        if (!elem instanceof Node) {
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

    var _weakMap2 = _interopRequireDefault(_weakMap);

    var _element2 = _interopRequireDefault(_element);

    var _merge2 = _interopRequireDefault(_merge);

    var _mount2 = _interopRequireDefault(_mount);

    function _interopRequireDefault(obj) {
      return obj && obj.__esModule ? obj : {
        default: obj
      };
    }

    var _window = window;
    var Node = _window.Node;
    var oldTreeMap = new _weakMap2.default();
    module.exports = exports['default'];
  });
  });

  var require$$3 = (render && typeof render === 'object' && 'default' in render ? render['default'] : render);

  var index = __commonjs(function (module, exports, global) {
  (function (global, factory) {
    if (typeof define === "function" && define.amd) {
      define(['module', 'exports', './diff', './merge', './patch', './render', './types', './vdom', './version'], factory);
    } else if (typeof exports !== "undefined") {
      factory(module, exports, require$$1$3, require$$1$2, require$$0$2, require$$3, require$$1$1, require$$1, require$$0$1);
    } else {
      var mod = {
        exports: {}
      };
      factory(mod, mod.exports, global.diff, global.merge, global.patch, global.render, global.types, global.vdom, global.version);
      global.index = mod.exports;
    }
  })(__commonjs_global, function (module, exports, _diff, _merge, _patch, _render, _types, _vdom, _version) {
    'use strict';

    Object.defineProperty(exports, "__esModule", {
      value: true
    });

    var _diff2 = _interopRequireDefault(_diff);

    var _merge2 = _interopRequireDefault(_merge);

    var _patch2 = _interopRequireDefault(_patch);

    var _render2 = _interopRequireDefault(_render);

    var types = _interopRequireWildcard(_types);

    var _vdom2 = _interopRequireDefault(_vdom);

    var _version2 = _interopRequireDefault(_version);

    function _interopRequireWildcard(obj) {
      if (obj && obj.__esModule) {
        return obj;
      } else {
        var newObj = {};

        if (obj != null) {
          for (var key in obj) {
            if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key];
          }
        }

        newObj.default = obj;
        return newObj;
      }
    }

    function _interopRequireDefault(obj) {
      return obj && obj.__esModule ? obj : {
        default: obj
      };
    }

    exports.default = {
      diff: _diff2.default,
      merge: _merge2.default,
      patch: _patch2.default,
      render: _render2.default,
      types: types,
      vdom: _vdom2.default,
      version: _version2.default
    };
    module.exports = exports['default'];
  });
  });

  var require$$0 = (index && typeof index === 'object' && 'default' in index ? index['default'] : index);

  var global = __commonjs(function (module, exports, global) {
  (function (global, factory) {
    if (typeof define === "function" && define.amd) {
      define(['module', 'exports', '../lib/index.js'], factory);
    } else if (typeof exports !== "undefined") {
      factory(module, exports, require$$0);
    } else {
      var mod = {
        exports: {}
      };
      factory(mod, mod.exports, global.index);
      global.global = mod.exports;
    }
  })(__commonjs_global, function (module, exports, _index) {
    'use strict';

    Object.defineProperty(exports, "__esModule", {
      value: true
    });

    var _index2 = _interopRequireDefault(_index);

    function _interopRequireDefault(obj) {
      return obj && obj.__esModule ? obj : {
        default: obj
      };
    }

    var previousGlobal = window.skatejsDomDiff;

    _index2.default.noConflict = function noConflict() {
      window.skatejsDomDiff = previousGlobal;
      return this;
    };

    window.skatejsDomDiff = _index2.default;
    exports.default = _index2.default;
    module.exports = exports['default'];
  });
  });

  var global$1 = (global && typeof global === 'object' && 'default' in global ? global['default'] : global);

  return global$1;

}));
//# sourceMappingURL=index.js.map