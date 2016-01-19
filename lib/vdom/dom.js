(function (global, factory) {
  if (typeof define === 'function' && define.amd) {
    define(['exports', 'module', '../util/accessor', '../util/event-map', '../util/real-node-map'], factory);
  } else if (typeof exports !== 'undefined' && typeof module !== 'undefined') {
    factory(exports, module, require('../util/accessor'), require('../util/event-map'), require('../util/real-node-map'));
  } else {
    var mod = {
      exports: {}
    };
    factory(mod.exports, mod, global.accessor, global.eventMap, global.realNodeMap);
    global.dom = mod.exports;
  }
})(this, function (exports, module, _utilAccessor, _utilEventMap, _utilRealNodeMap) {
  'use strict';

  module.exports = render;

  function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

  var _eventMap = _interopRequireDefault(_utilEventMap);

  var _realNodeMap = _interopRequireDefault(_utilRealNodeMap);

  function createElement(el) {
    var realNode = document.createElement(el.tagName);
    var attributes = el.attributes;
    var events = el.events;
    var eventHandlers = (0, _eventMap['default'])(realNode);
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
    _realNodeMap['default'].set(el, realNode);
    return realNode;
  }
});