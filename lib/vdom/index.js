(function (global, factory) {
  if (typeof define === "function" && define.amd) {
    define(['exports', './dom', './element', './mount', './text'], factory);
  } else if (typeof exports !== "undefined") {
    factory(exports, require('./dom'), require('./element'), require('./mount'), require('./text'));
  } else {
    var mod = {
      exports: {}
    };
    factory(mod.exports, global.dom, global.element, global.mount, global.text);
    global.index = mod.exports;
  }
})(this, function (exports, _dom, _element, _mount, _text) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });

  var _dom2 = _interopRequireDefault(_dom);

  var _element2 = _interopRequireDefault(_element);

  var _mount2 = _interopRequireDefault(_mount);

  var _text2 = _interopRequireDefault(_text);

  function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : {
      default: obj
    };
  }

  exports.default = {
    dom: _dom2.default,
    element: _element2.default,
    mount: _mount2.default,
    text: _text2.default
  };
});