(function (global, factory) {
  if (typeof define === 'function' && define.amd) {
    define(['exports', 'module', './types', './patch/append-child', './patch/remove-attribute', './patch/remove-child', './patch/replace-child', './patch/set-attribute', './patch/text-content'], factory);
  } else if (typeof exports !== 'undefined' && typeof module !== 'undefined') {
    factory(exports, module, require('./types'), require('./patch/append-child'), require('./patch/remove-attribute'), require('./patch/remove-child'), require('./patch/replace-child'), require('./patch/set-attribute'), require('./patch/text-content'));
  } else {
    var mod = {
      exports: {}
    };
    factory(mod.exports, mod, global.types, global.appendChild, global.removeAttribute, global.removeChild, global.replaceChild, global.setAttribute, global.textContent);
    global.patch = mod.exports;
  }
})(this, function (exports, module, _types, _patchAppendChild, _patchRemoveAttribute, _patchRemoveChild, _patchReplaceChild, _patchSetAttribute, _patchTextContent) {
  'use strict';

  function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

  var _appendChild = _interopRequireDefault(_patchAppendChild);

  var _removeAttribute = _interopRequireDefault(_patchRemoveAttribute);

  var _removeChild = _interopRequireDefault(_patchRemoveChild);

  var _replaceChild = _interopRequireDefault(_patchReplaceChild);

  var _setAttribute = _interopRequireDefault(_patchSetAttribute);

  var _textContent = _interopRequireDefault(_patchTextContent);

  var patchers = {};
  patchers[_types.APPEND_CHILD] = _appendChild['default'];
  patchers[_types.REMOVE_ATTRIBUTE] = _removeAttribute['default'];
  patchers[_types.REMOVE_CHILD] = _removeChild['default'];
  patchers[_types.REPLACE_CHILD] = _replaceChild['default'];
  patchers[_types.SET_ATTRIBUTE] = _setAttribute['default'];
  patchers[_types.TEXT_CONTENT] = _textContent['default'];

  function patch(instruction) {
    patchers[instruction.type](instruction.source, instruction.destination, instruction.data);
  }

  module.exports = function (instructions) {
    instructions.forEach(patch);
  };
});