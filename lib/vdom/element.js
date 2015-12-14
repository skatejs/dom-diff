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

  function separateData(obj) {
    var attrs = {};
    var events = {};
    var props = {};
    var attrIdx = 0;

    for (var _name in obj) {
      var value = obj[_name];

      if (typeof value === 'string') {
        attrs[attrIdx++] = attrs[_name] = { name: _name, value: value };
      } else if (_name.indexOf('on') === 0) {
        events[_name.substring(2)] = value;
      } else {
        props[_name] = value;
      }
    }

    attrs.length = attrIdx;
    return { attrs: attrs, events: events, props: props };
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
    var attrs = arguments.length <= 1 || arguments[1] === undefined ? {} : arguments[1];

    var data = separateData(attrs);

    for (var _len = arguments.length, chren = Array(_len > 2 ? _len - 2 : 0), _key = 2; _key < _len; _key++) {
      chren[_key - 2] = arguments[_key];
    }

    return {
      nodeType: 1,
      tagName: ensureTagName(name),
      attributes: data.attrs,
      events: data.events,
      properties: data.props,
      childNodes: ensureNodes(chren)
    };
  };
});