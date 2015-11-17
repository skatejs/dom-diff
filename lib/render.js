(function (global, factory) {
  if (typeof define === 'function' && define.amd) {
    define(['exports', 'module', 'debounce', './vdom/element', './vdom/dom', './merge'], factory);
  } else if (typeof exports !== 'undefined' && typeof module !== 'undefined') {
    factory(exports, module, require('debounce'), require('./vdom/element'), require('./vdom/dom'), require('./merge'));
  } else {
    var mod = {
      exports: {}
    };
    factory(mod.exports, mod, global.debounce, global.createElement, global.dom, global.merge);
    global.render = mod.exports;
  }
})(this, function (exports, module, _debounce, _vdomElement, _vdomDom, _merge) {
  'use strict';

  function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

  var _debounce2 = _interopRequireDefault(_debounce);

  var _createElement = _interopRequireDefault(_vdomElement);

  var _dom = _interopRequireDefault(_vdomDom);

  var _merge2 = _interopRequireDefault(_merge);

  module.exports = function (render) {
    return function (elem) {
      if (!elem.__debouncedRender) {
        elem.__debouncedRender = (0, _debounce2['default'])(function (elem) {
          var newTree = render(elem, { createElement: _createElement['default'] });
          if (elem.__oldTree) {
            (0, _merge2['default'])({
              destination: newTree,
              source: elem.__oldTree
            });
          } else {
            while (elem.firstChild) elem.firstChild.remove();
            elem.appendChild((0, _dom['default'])(newTree));
          }
          elem.__oldTree = newTree;
        });
      }
      elem.__debouncedRender(elem);
    };
  };
});