(function (global, factory) {
  if (typeof define === 'function' && define.amd) {
    define(['exports', 'module', './dom', './element', './mount', './text'], factory);
  } else if (typeof exports !== 'undefined' && typeof module !== 'undefined') {
    factory(exports, module, require('./dom'), require('./element'), require('./mount'), require('./text'));
  } else {
    var mod = {
      exports: {}
    };
    factory(mod.exports, mod, global.dom, global.element, global.mount, global.text);
    global.index = mod.exports;
  }
})(this, function (exports, module, _dom, _element, _mount, _text) {
  'use strict';

  function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

  var _dom2 = _interopRequireDefault(_dom);

  var _element2 = _interopRequireDefault(_element);

  var _mount2 = _interopRequireDefault(_mount);

  var _text2 = _interopRequireDefault(_text);

  module.exports = {
    dom: _dom2['default'],
    element: _element2['default'],
    mount: _mount2['default'],
    text: _text2['default']
  };
});