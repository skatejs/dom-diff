(function (global, factory) {
  if (typeof define === 'function' && define.amd) {
    define(['exports', 'module', '../util/real-node'], factory);
  } else if (typeof exports !== 'undefined' && typeof module !== 'undefined') {
    factory(exports, module, require('../util/real-node'));
  } else {
    var mod = {
      exports: {}
    };
    factory(mod.exports, mod, global.realNode);
    global.setEvent = mod.exports;
  }
})(this, function (exports, module, _utilRealNode) {
  'use strict';

  function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

  var _realNode = _interopRequireDefault(_utilRealNode);

  module.exports = function (src, dst, data) {
    var node = (0, _realNode['default'])(src);
    var name = data.name;
    var func = data.value;

    // This is a hack as described in the vDOM -> DOM creation function but we
    // need to be able to unbind the previous event handler otherwise events may
    // stack causing major issues.
    var temp = '__events_' + name;
    node.removeEventListener(name, node[temp]);
    node.addEventListener(name, node[temp] = func);
  };
});