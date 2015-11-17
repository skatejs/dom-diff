(function (global, factory) {
  if (typeof define === 'function' && define.amd) {
    define(['exports', 'module', 'debounce', './vdom/element', './merge', './vdom/mount'], factory);
  } else if (typeof exports !== 'undefined' && typeof module !== 'undefined') {
    factory(exports, module, require('debounce'), require('./vdom/element'), require('./merge'), require('./vdom/mount'));
  } else {
    var mod = {
      exports: {}
    };
    factory(mod.exports, mod, global.debounce, global.createElement, global.merge, global.mount);
    global.render = mod.exports;
  }
})(this, function (exports, module, _debounce, _vdomElement, _merge, _vdomMount) {
  'use strict';

  function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

  var _debounce2 = _interopRequireDefault(_debounce);

  var _createElement = _interopRequireDefault(_vdomElement);

  var _merge2 = _interopRequireDefault(_merge);

  var _mount = _interopRequireDefault(_vdomMount);

  module.exports = function (render) {
    return function (elem) {
      elem = elem || this;
      if (!elem.__debouncedRender) {
        elem.__debouncedRender = (0, _debounce2['default'])(function (elem) {
          var newTree = render(elem, { createElement: _createElement['default'] });
          if (elem.__oldTree) {
            (0, _merge2['default'])({
              destination: newTree,
              source: elem.__oldTree
            });
          } else {
            (0, _mount['default'])(elem, newTree);
          }
          elem.__oldTree = newTree;
        });
      }
      elem.__debouncedRender(elem);
    };
  };
});