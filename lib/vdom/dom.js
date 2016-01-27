(function (global, factory) {
  if (typeof define === "function" && define.amd) {
    define(['module', 'exports', '../util/accessor', '../util/event-map', '../util/real-node-map'], factory);
  } else if (typeof exports !== "undefined") {
    factory(module, exports, require('../util/accessor'), require('../util/event-map'), require('../util/real-node-map'));
  } else {
    var mod = {
      exports: {}
    };
    factory(mod, mod.exports, global.accessor, global.eventMap, global.realNodeMap);
    global.dom = mod.exports;
  }
})(this, function (module, exports, _accessor, _eventMap, _realNodeMap) {
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