(function (global, factory) {
  if (typeof define === 'function' && define.amd) {
    define(['exports'], factory);
  } else if (typeof exports !== 'undefined') {
    factory(exports);
  } else {
    var mod = {
      exports: {}
    };
    factory(mod.exports);
    global.accessor = mod.exports;
  }
})(this, function (exports) {
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
    } else if (name !== 'type' && name in node) {
      node[name] = value;
    } else if (node.setAttribute) {
      node.setAttribute(name, value);
    } else if (node.attributes) {
      node.attributes[node.attributes.length] = node.attributes[name] = { name: name, value: value };
    }
  }
});