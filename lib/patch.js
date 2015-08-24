(function (global, factory) {
  if (typeof define === 'function' && define.amd) {
    define(['exports', 'module', './types'], factory);
  } else if (typeof exports !== 'undefined' && typeof module !== 'undefined') {
    factory(exports, module, require('./types'));
  } else {
    var mod = {
      exports: {}
    };
    factory(mod.exports, mod, global.types);
    global.unknown = mod.exports;
  }
})(this, function (exports, module, _types) {
  'use strict';

  var patchers = {};
  patchers[_types.APPEND_CHILD] = function (src, dst) {
    src.appendChild(dst);
  };
  patchers[_types.INSERT_BEFORE] = function (src, dst) {
    src.parentNode.insertBefore(dst, src);
  };
  patchers[_types.REMOVE_CHILD] = function (src) {
    src.parentNode.removeChild(src);
  };
  patchers[_types.REPLACE_CHILD] = function (src, dst) {
    src.parentNode.replaceChild(dst, src);
  };
  patchers[_types.TEXT_CONTENT] = function (src, dst) {
    src.textContent = dst.textContent;
  };

  function patch(instruction) {
    patchers[instruction.type](instruction.source, instruction.destination);
  }

  module.exports = function (instructions) {
    instructions.forEach(patch);
  };
});