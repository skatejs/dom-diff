(function (global, factory) {
  if (typeof define === "function" && define.amd) {
    define(['module', 'exports', './util/weak-map', './vdom/element', './merge', './vdom/mount'], factory);
  } else if (typeof exports !== "undefined") {
    factory(module, exports, require('./util/weak-map'), require('./vdom/element'), require('./merge'), require('./vdom/mount'));
  } else {
    var mod = {
      exports: {}
    };
    factory(mod, mod.exports, global.weakMap, global.element, global.merge, global.mount);
    global.render = mod.exports;
  }
})(this, function (module, exports, _weakMap, _element, _merge, _mount) {
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