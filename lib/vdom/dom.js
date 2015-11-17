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

    if (el.attributes) {
      for (var a = 0; a < el.attributes.length; a++) {
        var attr = el.attributes[a];
        var _name = attr.name;
        var value = attr.value;

        if (!value) {
          continue;
        }

        if (_name === 'content') {
          if (Array.isArray(value)) {
            value.forEach(function (ch) {
              return realNode.appendChild(render(ch));
            });
          } else {
            realNode.appendChild(render(value));
          }
        } else {
          realNode.setAttribute(_name, value);
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