// src/types.js
__451dfb926e8c1ee4d08e6924e69a3ccb = (function () {
  var module = {
    exports: {}
  };
  var exports = module.exports;
  
  'use strict';
  
  Object.defineProperty(exports, '__esModule', {
    value: true
  });
  var APPEND_CHILD = 0;
  exports.APPEND_CHILD = APPEND_CHILD;
  var INSERT_BEFORE = 1;
  exports.INSERT_BEFORE = INSERT_BEFORE;
  var REMOVE_CHILD = 2;
  exports.REMOVE_CHILD = REMOVE_CHILD;
  var REPLACE_CHILD = 3;
  exports.REPLACE_CHILD = REPLACE_CHILD;
  var TEXT_CONTENT = 4;
  exports.TEXT_CONTENT = TEXT_CONTENT;
  
  return module.exports;
}).call(this);

// src/diff.js
__6197b6cfa6b1333b68978d9741c150d4 = (function () {
  var module = {
    exports: {}
  };
  var exports = module.exports;
  
  'use strict';
  
  Object.defineProperty(exports, '__esModule', {
    value: true
  });
  exports['default'] = diff;
  
  function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj['default'] = obj; return newObj; } }
  
  var _types = __451dfb926e8c1ee4d08e6924e69a3ccb;
  
  var types = _interopRequireWildcard(_types);
  
  var NODE_COMMENT = 8;
  var NODE_ELEMENT = 1;
  var NODE_TEXT = 3;
  var KEY_SAME_AS_DESTINATION = Symbol();
  
  function compareNodeElement(src, dst) {
    if (src.tagName !== dst.tagName) {
      return false;
    }
  }
  
  function compareNodeText(src, dst) {
    if (src.textContent !== dst.textContent) {
      return false;
    }
  }
  
  function compareNodeComment(src, dst) {
    if (src.textContent !== dst.textContent) {
      return false;
    }
  }
  
  function isSameNode(src, dst) {
    var dstType = undefined,
        srcType = undefined;
  
    if (!dst || !src) {
      return false;
    }
  
    dstType = dst.nodeType;
    srcType = src.nodeType;
  
    if (dstType !== srcType) {
      return false;
    }
  
    if (dstType === NODE_ELEMENT) {
      return compareNodeElement(src, dst);
    }
  
    if (dstType === NODE_TEXT) {
      return compareNodeText(src, dst);
    }
  
    if (dstType === NODE_COMMENT) {
      return compareNodeComment(src, dst);
    }
  
    // We don't really care about incurring the cost of compareing anything else
    // so by returning true we just assume they're the same.
    return true;
  }
  
  function indexOfNode(childNodes, child) {
    var childNodesLength = childNodes.length;
    for (var a = 0; a < childNodesLength; a++) {
      if (isSameNode(childNodes[a], child)) {
        return a;
      }
    }
    return -1;
  }
  
  function diff(src, dst) {
    var instructions = [];
  
    if (!dst) {
      return [];
    }
  
    var dstChs = dst.childNodes;
    var dstChsLen = dstChs.length;
    var dstInSrcMap = [];
    var srcChs = src.childNodes;
    var srcChsLen = srcChs.length;
    var srcInDstMap = [];
  
    // If there's only one child in both source and destination, we can check to
    // see if they're the same, or replace the source with the destination if not
    // and simply return from here without doing any further operations.
    if (dstChsLen === 1 && srcChsLen === 1) {
      var dstCh = dstChs[0];
      var srcCh = srcChs[0];
  
      if (isSameNode(srcCh, dstCh)) {
        return [];
      } else {
        return [{
          destination: dstCh,
          source: srcCh,
          type: types.REPLACE_CHILD
        }];
      }
    }
  
    // Add nodes that don't exist in the source.
    for (var a = 0; a < dstChsLen; a++) {
      var dstCh = dstChs[a];
      var index = indexOfNode(srcChs, dstCh);
  
      // If they exist in the source, then mark that source node.
      if (index > -1) {
        dstInSrcMap.push(dstCh);
        srcInDstMap.push(srcChs[index]);
        srcChs[index][KEY_SAME_AS_DESTINATION] = true;
      }
  
      // If there are same nodes, we take the last node that we found and insert
      // after that one. This ensures destination nodes get placed where they're
      // supposed to be rather than just appended.
      else if (srcInDstMap.length) {
          instructions.push({
            destination: dstCh,
            source: srcInDstMap[srcInDstMap.length - 1],
            type: types.INSERT_BEFORE
          });
        }
  
        // If the destination node doesn't exist in the source node and there are
        // no overlaps yet, we simply append.
        else {
            instructions.push({
              destination: dstCh,
              source: src,
              type: types.APPEND_CHILD
            });
          }
    }
  
    // Remove any nodes in the source that don't exist in the destination.
    for (var a = 0; a < srcChsLen; a++) {
      var srcCh = srcChs[a];
  
      // If the source is in the destination, keep it but cleanup the property
      // we added to store some data.
      if (srcCh[KEY_SAME_AS_DESTINATION]) {
        delete srcCh[KEY_SAME_AS_DESTINATION];
      }
  
      // If the source does not exist in the destination, remove it.
      else {
          instructions.push({
            destination: null,
            source: srcCh,
            type: types.REMOVE_CHILD
          });
        }
    }
  
    // For the nodes that exist in both diff objects, we diff thier trees.
    var dstInSrcMapLen = dstInSrcMap.length;
    for (var a = 0; a < dstInSrcMapLen; a++) {
      instructions = instructions.concat(diff(srcInDstMap[a], dstInSrcMap[a]));
    }
  
    return instructions;
  }
  
  module.exports = exports['default'];
  
  return module.exports;
}).call(this);

// src/patch.js
__8615174fa038c8ae72fb164ae5f35e0f = (function () {
  var module = {
    exports: {}
  };
  var exports = module.exports;
  
  'use strict';
  
  Object.defineProperty(exports, '__esModule', {
    value: true
  });
  
  function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj['default'] = obj; return newObj; } }
  
  var _types = __451dfb926e8c1ee4d08e6924e69a3ccb;
  
  var types = _interopRequireWildcard(_types);
  
  var patchers = {};
  patchers[types.APPEND_CHILD] = function (src, dst) {
    src.appendChild(dst);
  };
  patchers[types.INSERT_BEFORE] = function (src, dst) {
    src.parentNode.insertBefore(dst, src);
  };
  patchers[types.REMOVE_CHILD] = function (src) {
    src.parentNode.removeChild(src);
  };
  patchers[types.REPLACE_CHILD] = function (src, dst) {
    src.parentNode.replaceChild(dst, src);
  };
  patchers[types.TEXT_CONTENT] = function (src, dst) {
    src.textContent = dst.textContent;
  };
  
  function patch(instruction) {
    patchers[instruction.type](instruction.source, instruction.destination);
  }
  
  exports['default'] = function (instructions) {
    instructions.forEach(patch);
  };
  
  module.exports = exports['default'];
  
  return module.exports;
}).call(this);

// test/lib/test.js
__dd27f1aa9620386958596959cdee4272 = (function () {
  var module = {
    exports: {}
  };
  var exports = module.exports;
  
  'use strict';
  
  Object.defineProperty(exports, '__esModule', {
    value: true
  });
  var queue = [];
  
  function test(name, func) {
    queue.push([name, func]);
    return test;
  }
  
  test.equal = function (left, right) {
    var message = arguments.length <= 2 || arguments[2] === undefined ? 'equal: ' : arguments[2];
  
    this.ok(left === right, message + ': expected "' + left + '" to equal "' + right + '"');
  };
  
  test.ok = function (expr) {
    var message = arguments.length <= 1 || arguments[1] === undefined ? 'Assertion failed.' : arguments[1];
  
    if (!expr) {
      throw new Error(message);
    }
  };
  
  test.run = function () {
    var index = -1;
    var failures = [];
  
    function done() {
      ++index;
      var data = queue[index];
  
      if (!data) {
        return console.log('# ' + (failures ? 'fail ' + failures.length : 'ok'));
      }
  
      var desc = data[0];
      var func = data[1];
  
      try {
        (function () {
          var async = false;
          var pass = function pass() {
            console.log('ok ' + (index + 1) + ' - ' + desc);
            done();
          };
  
          func(function () {
            async = true;
            return pass;
          });
  
          if (!async) {
            pass();
          }
        })();
      } catch (e) {
        console.log('not ok ' + (index + 1) + ' - ' + desc);
        console.error('# ' + e.stack.split('\n').join('\n #'));
        failures.push(e);
        done();
      }
    }
  
    console.log('1..' + queue.length);
    done();
  };
  
  if (document) {
    document.addEventListener('DOMContentLoaded', test.run);
  }
  
  exports['default'] = test;
  module.exports = exports['default'];
  
  return module.exports;
}).call(this);

// test/unit.js
__8a6b3d8e91c0ca037465764bc31b218c = (function () {
  var module = {
    exports: {}
  };
  var exports = module.exports;
  
  'use strict';
  
  function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }
  
  function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj['default'] = obj; return newObj; } }
  
  var _srcTypes = __451dfb926e8c1ee4d08e6924e69a3ccb;
  
  var types = _interopRequireWildcard(_srcTypes);
  
  var _srcDiff = __6197b6cfa6b1333b68978d9741c150d4;
  
  var _srcDiff2 = _interopRequireDefault(_srcDiff);
  
  var _srcPatch = __8615174fa038c8ae72fb164ae5f35e0f;
  
  var _srcPatch2 = _interopRequireDefault(_srcPatch);
  
  var _libTest = __dd27f1aa9620386958596959cdee4272;
  
  var _libTest2 = _interopRequireDefault(_libTest);
  
  function elem(name, html) {
    var el = document.createElement(name);
    el.innerHTML = html;
    return el;
  }
  
  var div = elem.bind(null, 'div');
  
  function testPatch(srcHtml, dstHtml) {
    (0, _libTest2['default'])('patching "' + srcHtml + '" with "' + dstHtml + '"', function () {
      var src = div(srcHtml);
      var dst = div(dstHtml);
      (0, _srcPatch2['default'])((0, _srcDiff2['default'])(src, dst));
      _libTest2['default'].equal(src.innerHTML, dstHtml);
    });
  }
  
  (0, _libTest2['default'])('diff instructions array', function () {
    var diffed = (0, _srcDiff2['default'])(div(), div());
    _libTest2['default'].ok(Array.isArray(diffed));
  });
  
  (0, _libTest2['default'])('diff instruction object', function () {
    var src = div('<span></span>');
    var dst = div('<a></a>');
    var instructions = (0, _srcDiff2['default'])(src, dst);
    _libTest2['default'].equal(instructions.length, 1, 'instruction length');
    _libTest2['default'].equal(instructions[0].destination.tagName, 'A', 'destination tagName');
    _libTest2['default'].equal(instructions[0].source.tagName, 'SPAN', 'source tagName');
    _libTest2['default'].equal(instructions[0].type, types.REPLACE_CHILD, 'type');
  });
  
  (0, _libTest2['default'])('patching host should not change', function () {
    var src = div('<span></span>');
    var dst = div('<a></a>');
    var instructions = (0, _srcDiff2['default'])(src, dst);
    (0, _srcPatch2['default'])(instructions);
    _libTest2['default'].equal(src.tagName, 'DIV');
  });
  
  testPatch('<span></span>', '<a></a>');
  testPatch('<span></span>', '<span></span><a></a>');
  testPatch('<span></span>', '<a></a><span></span>');
  testPatch('<span></span>', '<span></span><a></a><span></span>');
  
  return module.exports;
}).call(this);