(function (global, factory) {
  if (typeof define === 'function' && define.amd) {
    define(['exports', 'module', './real-node'], factory);
  } else if (typeof exports !== 'undefined' && typeof module !== 'undefined') {
    factory(exports, module, require('./real-node'));
  } else {
    var mod = {
      exports: {}
    };
    factory(mod.exports, mod, global.realNode);
    global.contentNode = mod.exports;
  }
})(this, function (exports, module, _realNode) {
  'use strict';

  function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

  var _realNode2 = _interopRequireDefault(_realNode);

  module.exports = function (node) {
    var tmp = (0, _realNode2['default'])(node);
    var contentNode = tmp.content;
    return contentNode && contentNode.appendChild ? contentNode : tmp;
  };
});