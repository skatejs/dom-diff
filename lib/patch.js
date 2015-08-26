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
  patchers[_types.MOVE_TO] = function (src, dstIndex) {
    var dst = src.parentNode.childNodes[dstIndex];

    if (dst === src) {
      return;
    }

    console.log(dstIndex + ': ' + src.parentNode.innerHTML);

    if (dst) {
      console.log(src.outerHTML + ' will go before ' + dst.outerHTML);
      src.parentNode.insertBefore(src, dst);
    } else {
      console.log(src.outerHTML + ' will be appended');
      src.parentNode.appendChild(src);
    }
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