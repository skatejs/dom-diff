(function (global, factory) {
  if (typeof define === 'function' && define.amd) {
    define(['exports', 'module'], factory);
  } else if (typeof exports !== 'undefined' && typeof module !== 'undefined') {
    factory(exports, module);
  } else {
    var mod = {
      exports: {}
    };
    factory(mod.exports, mod);
    global.dom = mod.exports;
  }
})(this, function (exports, module) {
  'use strict';

  module.exports = render;
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
});