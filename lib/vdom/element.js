(function (global, factory) {
  if (typeof define === 'function' && define.amd) {
    define(['exports', 'module', './text'], factory);
  } else if (typeof exports !== 'undefined' && typeof module !== 'undefined') {
    factory(exports, module, require('./text'));
  } else {
    var mod = {
      exports: {}
    };
    factory(mod.exports, mod, global.createTextNode);
    global.element = mod.exports;
  }
})(this, function (exports, module, _text) {
  'use strict';

  function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

  var _createTextNode = _interopRequireDefault(_text);

  function ensureAttributes(obj) {
    var map = {};
    var index = 0;
    for (var a in obj) {
      var val = obj[a];

      // Take boolean attributes into account.
      if (val === false) {
        continue;
      }

      map[index++] = map[a] = {
        name: a,
        value: val
      };
    }
    map.length = index;
    return map;
  }

  function ensureNodes(arr) {
    var out = [];
    arr.filter(Boolean).forEach(function (item) {
      if (Array.isArray(item)) {
        out = out.concat(ensureNodes(item));
      } else if (typeof item === 'object') {
        out.push(item);
      } else {
        out.push((0, _createTextNode['default'])(item));
      }
    });
    return out;
  }

  function ensureTagName(name) {
    return (typeof name === 'function' ? name.id || name.name : name).toUpperCase();
  }

  module.exports = function (name) {
    var props = arguments.length <= 1 || arguments[1] === undefined ? {} : arguments[1];

    for (var _len = arguments.length, chren = Array(_len > 2 ? _len - 2 : 0), _key = 2; _key < _len; _key++) {
      chren[_key - 2] = arguments[_key];
    }

    return {
      tagName: ensureTagName(name),
      nodeType: 1,
      attributes: ensureAttributes(props),
      childNodes: ensureNodes(chren)
    };
  };
});