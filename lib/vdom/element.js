(function (global, factory) {
  if (typeof define === "function" && define.amd) {
    define(['exports', '../util/accessor', './text'], factory);
  } else if (typeof exports !== "undefined") {
    factory(exports, require('../util/accessor'), require('./text'));
  } else {
    var mod = {
      exports: {}
    };
    factory(mod.exports, global.accessor, global.text);
    global.element = mod.exports;
  }
})(this, function (exports, _accessor, _text) {
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
    arr.filter(Boolean).forEach(function (item) {
      if (Array.isArray(item)) {
        out = out.concat(ensureNodes(item));
      } else if ((typeof item === 'undefined' ? 'undefined' : _typeof(item)) === 'object') {
        out.push(item);
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
    return arg && (typeof arg === 'string' || Array.isArray(arg) || typeof arg.nodeType === 'number');
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

  ['a', 'abbr', 'address', 'area', 'article', 'aside', 'audio', 'b', 'base', 'bdi', 'bdo', 'bgsound', 'blockquote', 'body', 'br', 'button', 'canvas', 'caption', 'cite', 'code', 'col', 'colgroup', 'command', 'content', 'data', 'datalist', 'dd', 'del', 'details', 'dfn', 'dialog', 'div', 'dl', 'dt', 'element', 'em', 'embed', 'fieldset', 'figcaption', 'figure', 'font', 'footer', 'form', 'h1', 'h2', 'h3', 'h4', 'h5', 'h6', 'head', 'header', 'hgroup', 'hr', 'html', 'i', 'iframe', 'image', 'img', 'input', 'ins', 'kbd', 'keygen', 'label', 'legend', 'li', 'link', 'main', 'map', 'mark', 'marquee', 'menu', 'menuitem', 'meta', 'meter', 'multicol', 'nav', 'nobr', 'noembed', 'noframes', 'noscript', 'object', 'ol', 'optgroup', 'option', 'output', 'p', 'param', 'picture', 'pre', 'progress', 'q', 'rp', 'rt', 'rtc', 'ruby', 's', 'samp', 'script', 'section', 'select', 'shadow', 'small', 'source', 'span', 'strong', 'style', 'sub', 'summary', 'sup', 'table', 'tbody', 'td', 'template', 'textarea', 'tfoot', 'th', 'thead', 'time', 'title', 'tr', 'track', 'u', 'ul', 'var', 'video', 'wbr'].forEach(function (tag) {
    element[tag] = element.bind(null, tag);
  });
});