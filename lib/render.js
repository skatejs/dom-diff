(function (global, factory) {
  if (typeof define === 'function' && define.amd) {
    define(['exports', 'module', 'weakmap', './vdom/element', './merge', './vdom/mount'], factory);
  } else if (typeof exports !== 'undefined' && typeof module !== 'undefined') {
    factory(exports, module, require('weakmap'), require('./vdom/element'), require('./merge'), require('./vdom/mount'));
  } else {
    var mod = {
      exports: {}
    };
    factory(mod.exports, mod, global.weakmap, global.createElement, global.merge, global.mount);
    global.render = mod.exports;
  }
})(this, function (exports, module, _weakmap, _vdomElement, _merge, _vdomMount) {
  'use strict';

  function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

  var _createElement = _interopRequireDefault(_vdomElement);

  var _merge2 = _interopRequireDefault(_merge);

  var _mount = _interopRequireDefault(_vdomMount);

  var Node = window.Node;
  var WeakMap = window.WeakMap;

  var oldTreeMap = new WeakMap();

  module.exports = function (render) {
    return function (elem) {
      elem = elem instanceof Node ? elem : this;

      if (!elem instanceof Node) {
        throw new Error('No node provided to diff renderer as either the first argument or the context.');
      }

      // Create a new element to house the new tree since we diff fragments.
      var newTree = (0, _createElement['default'])('div', null, render(elem, { createElement: _createElement['default'] }));
      var oldTree = oldTreeMap.get(elem);

      if (oldTree) {
        (0, _merge2['default'])({
          destination: newTree,
          source: oldTree
        });
      } else {
        (0, _mount['default'])(elem, newTree.childNodes[0]);
      }

      oldTreeMap.set(elem, newTree);
    };
  };
});