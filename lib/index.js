(function (global, factory) {
  if (typeof define === "function" && define.amd) {
    define(['module', 'exports', './diff', './merge', './patch', './render', './types', './vdom', './version'], factory);
  } else if (typeof exports !== "undefined") {
    factory(module, exports, require('./diff'), require('./merge'), require('./patch'), require('./render'), require('./types'), require('./vdom'), require('./version'));
  } else {
    var mod = {
      exports: {}
    };
    factory(mod, mod.exports, global.diff, global.merge, global.patch, global.render, global.types, global.vdom, global.version);
    global.index = mod.exports;
  }
})(this, function (module, exports, _diff, _merge, _patch, _render, _types, _vdom, _version) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });

  var _diff2 = _interopRequireDefault(_diff);

  var _merge2 = _interopRequireDefault(_merge);

  var _patch2 = _interopRequireDefault(_patch);

  var _render2 = _interopRequireDefault(_render);

  var types = _interopRequireWildcard(_types);

  var _vdom2 = _interopRequireDefault(_vdom);

  var _version2 = _interopRequireDefault(_version);

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

  function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : {
      default: obj
    };
  }

  exports.default = {
    diff: _diff2.default,
    merge: _merge2.default,
    patch: _patch2.default,
    render: _render2.default,
    types: types,
    vdom: _vdom2.default,
    version: _version2.default
  };
  module.exports = exports['default'];
});