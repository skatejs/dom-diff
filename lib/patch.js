(function (global, factory) {
  if (typeof define === "function" && define.amd) {
    define(['module', 'exports', './types', './patch/append-child', './patch/remove-attribute', './patch/remove-child', './patch/replace-child', './patch/set-attribute', './patch/set-event', './patch/text-content'], factory);
  } else if (typeof exports !== "undefined") {
    factory(module, exports, require('./types'), require('./patch/append-child'), require('./patch/remove-attribute'), require('./patch/remove-child'), require('./patch/replace-child'), require('./patch/set-attribute'), require('./patch/set-event'), require('./patch/text-content'));
  } else {
    var mod = {
      exports: {}
    };
    factory(mod, mod.exports, global.types, global.appendChild, global.removeAttribute, global.removeChild, global.replaceChild, global.setAttribute, global.setEvent, global.textContent);
    global.patch = mod.exports;
  }
})(this, function (module, exports, _types, _appendChild, _removeAttribute, _removeChild, _replaceChild, _setAttribute, _setEvent, _textContent) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });

  exports.default = function (instructions) {
    instructions.forEach(patch);
  };

  var types = _interopRequireWildcard(_types);

  var _appendChild2 = _interopRequireDefault(_appendChild);

  var _removeAttribute2 = _interopRequireDefault(_removeAttribute);

  var _removeChild2 = _interopRequireDefault(_removeChild);

  var _replaceChild2 = _interopRequireDefault(_replaceChild);

  var _setAttribute2 = _interopRequireDefault(_setAttribute);

  var _setEvent2 = _interopRequireDefault(_setEvent);

  var _textContent2 = _interopRequireDefault(_textContent);

  function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : {
      default: obj
    };
  }

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

  var patchers = {};
  patchers[types.APPEND_CHILD] = _appendChild2.default;
  patchers[types.REMOVE_ATTRIBUTE] = _removeAttribute2.default;
  patchers[types.REMOVE_CHILD] = _removeChild2.default;
  patchers[types.REPLACE_CHILD] = _replaceChild2.default;
  patchers[types.SET_ATTRIBUTE] = _setAttribute2.default;
  patchers[types.SET_EVENT] = _setEvent2.default;
  patchers[types.TEXT_CONTENT] = _textContent2.default;

  function patch(instruction) {
    patchers[instruction.type](instruction.source, instruction.destination, instruction.data);
  }

  module.exports = exports['default'];
});