(function (global, factory) {
  if (typeof define === "function" && define.amd) {
    define(['exports', '../types'], factory);
  } else if (typeof exports !== "undefined") {
    factory(exports, require('../types'));
  } else {
    var mod = {
      exports: {}
    };
    factory(mod.exports, global.types);
    global.text = mod.exports;
  }
})(this, function (exports, _types) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });

  exports.default = function (src, dst) {
    if (src.textContent === dst.textContent) {
      return [];
    }

    return [{
      destination: dst,
      source: src,
      type: types.TEXT_CONTENT
    }];
  };

  var types = _interopRequireWildcard(_types);

  function _interopRequireWildcard(obj) {
    if (obj && obj.__esModule) {
      return obj;
    } else {
      var newObj = {};

      if (obj != null) {
        for (var key in obj) {
          if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key];
        }
      }

      newObj.default = obj;
      return newObj;
    }
  }
});