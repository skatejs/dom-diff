// src/types.js
(typeof window === 'undefined' ? global : window).__0ca807667308490ecea534df3b4369b8 = (function () {
  var module = {
    exports: {}
  };
  var exports = module.exports;
  
  "use strict";
  
  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  var APPEND_CHILD = 1;
  exports.APPEND_CHILD = APPEND_CHILD;
  var REMOVE_CHILD = 2;
  exports.REMOVE_CHILD = REMOVE_CHILD;
  var REMOVE_ATTRIBUTE = 3;
  exports.REMOVE_ATTRIBUTE = REMOVE_ATTRIBUTE;
  var REPLACE_CHILD = 4;
  exports.REPLACE_CHILD = REPLACE_CHILD;
  var SET_ATTRIBUTE = 5;
  exports.SET_ATTRIBUTE = SET_ATTRIBUTE;
  var SET_EVENT = 6;
  exports.SET_EVENT = SET_EVENT;
  var SET_PROPERTY = 7;
  exports.SET_PROPERTY = SET_PROPERTY;
  var TEXT_CONTENT = 8;
  exports.TEXT_CONTENT = TEXT_CONTENT;
  
  return module.exports;
}).call(this);
// src/util/accessor.js
(typeof window === 'undefined' ? global : window).__c1565a66d0c7d169b4ad86c2905cfafc = (function () {
  var module = {
    exports: {}
  };
  var exports = module.exports;
  
  'use strict';
  
  Object.defineProperty(exports, '__esModule', {
    value: true
  });
  exports.getAccessor = getAccessor;
  exports.mapAccessor = mapAccessor;
  exports.removeAccessor = removeAccessor;
  exports.setAccessor = setAccessor;
  
  function getAccessor(node, name) {
    if (name === 'class') {
      return node.className;
    } else if (name === 'style') {
      return node.style.cssText;
    } else if (name !== 'type' && name in node) {
      return node[name];
    } else if (node.getAttribute) {
      return node.getAttribute(name);
    } else if (node.attributes && node.attributes[name]) {
      return node.attributes[name].value;
    }
  }
  
  function mapAccessor(node, name, value) {
    if (name === 'class') {
      node.className = value;
    } else if (name === 'style') {
      node.style = { cssText: value };
    }
  }
  
  function removeAccessor(node, name) {
    if (name === 'class') {
      node.className = '';
    } else if (name === 'style') {
      node.style.cssText = '';
    } else if (name !== 'type' && name in node) {
      node[name] = '';
    } else if (node.removeAttribute) {
      node.removeAttribute(name);
    } else if (node.attributes) {
      delete node.attributes[name];
    }
  }
  
  function setAccessor(node, name, value) {
    if (name === 'class') {
      node.className = value;
    } else if (name === 'style') {
      node.style.cssText = value;
    } else if (name !== 'type' && name in node) {
      node[name] = value;
    } else if (node.setAttribute) {
      node.setAttribute(name, value);
    } else if (node.attributes) {
      node.attributes[node.attributes.length] = node.attributes[name] = { name: name, value: value };
    }
  }
  
  return module.exports;
}).call(this);
// src/compare/attributes.js
(typeof window === 'undefined' ? global : window).__bad2e851182eb57480d47d0d1303f9cd = (function () {
  var module = {
    exports: {}
  };
  var exports = module.exports;
  
  'use strict';
  
  Object.defineProperty(exports, '__esModule', {
    value: true
  });
  
  function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj['default'] = obj; return newObj; } }
  
  var _types = __0ca807667308490ecea534df3b4369b8;
  
  var types = _interopRequireWildcard(_types);
  
  var _utilAccessor = __c1565a66d0c7d169b4ad86c2905cfafc;
  
  exports['default'] = function (src, dst) {
    var srcAttrs = src.attributes;
    var dstAttrs = dst.attributes;
    var srcAttrsLen = (srcAttrs || 0) && srcAttrs.length;
    var dstAttrsLen = (dstAttrs || 0) && dstAttrs.length;
    var instructions = [];
  
    // Bail early if possible.
    if (!srcAttrsLen && !dstAttrsLen) {
      return instructions;
    }
  
    // Merge attributes that exist in source with destination's.
    for (var a = 0; a < srcAttrsLen; a++) {
      var srcAttr = srcAttrs[a];
      var srcAttrName = srcAttr.name;
      var srcAttrValue = (0, _utilAccessor.getAccessor)(src, srcAttrName);
      var dstAttr = dstAttrs[srcAttrName];
      var dstAttrValue = (0, _utilAccessor.getAccessor)(dst, srcAttrName);
  
      if (!dstAttr) {
        instructions.push({
          data: { name: srcAttrName },
          destination: dst,
          source: src,
          type: types.REMOVE_ATTRIBUTE
        });
      } else if (srcAttrValue !== dstAttrValue) {
        instructions.push({
          data: { name: srcAttrName, value: dstAttrValue },
          destination: dst,
          source: src,
          type: types.SET_ATTRIBUTE
        });
      }
    }
  
    // We only need to worry about setting attributes that don't already exist
    // in the source.
    for (var a = 0; a < dstAttrsLen; a++) {
      var dstAttr = dstAttrs[a];
      var dstAttrName = dstAttr.name;
      var dstAttrValue = (0, _utilAccessor.getAccessor)(dst, dstAttrName);
      var srcAttr = srcAttrs[dstAttrName];
  
      if (!srcAttr) {
        instructions.push({
          data: { name: dstAttrName, value: dstAttrValue },
          destination: dst,
          source: src,
          type: types.SET_ATTRIBUTE
        });
      }
    }
  
    return instructions;
  };
  
  module.exports = exports['default'];
  
  return module.exports;
}).call(this);
// node_modules/weakmap/weakmap.js
(typeof window === 'undefined' ? global : window).__99ae6500534ecca2cc3945bfe4109057 = (function () {
  var module = {
    exports: {}
  };
  var exports = module.exports;
  var defineDependencies = {
    "module": module,
    "exports": exports
  };
  var define = function defineReplacementWrapper(generatedModuleName) {
    return function defineReplacement(name, deps, func) {
      var root = (typeof window === 'undefined' ? global : window);
      var defineGlobal = root.define;
      var rval;
      var type;
  
      func = [func, deps, name].filter(function (cur) {
        return typeof cur === 'function';
      })[0];
      deps = [deps, name, []].filter(Array.isArray)[0];
      rval = func.apply(null, deps.map(function (value) {
        return defineDependencies[value];
      }));
      type = typeof rval;
  
      // Support existing AMD libs.
      if (typeof defineGlobal === 'function') {
        // Almond always expects a name so resolve one (#29).
        defineGlobal(typeof name === 'string' ? name : generatedModuleName, deps, func);
      }
  
      // Some processors like Babel don't check to make sure that the module value
      // is not a primitive before calling Object.defineProperty() on it. We ensure
      // it is an instance so that it can.
      if (type === 'string') {
        rval = String(rval);
      } else if (type === 'number') {
        rval = Number(rval);
      } else if (type === 'boolean') {
        rval = Boolean(rval);
      }
  
      // Reset the exports to the defined module. This is how we convert AMD to
      // CommonJS and ensures both can either co-exist, or be used separately. We
      // only set it if it is not defined because there is no object representation
      // of undefined, thus calling Object.defineProperty() on it would fail.
      if (rval !== undefined) {
        exports = module.exports = rval;
      }
    };
  }("__99ae6500534ecca2cc3945bfe4109057");
  define.amd = true;
  
  /* (The MIT License)
   *
   * Copyright (c) 2012 Brandon Benvie <http://bbenvie.com>
   *
   * Permission is hereby granted, free of charge, to any person obtaining a copy of this software and
   * associated documentation files (the 'Software'), to deal in the Software without restriction,
   * including without limitation the rights to use, copy, modify, merge, publish, distribute,
   * sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is
   * furnished to do so, subject to the following conditions:
   *
   * The above copyright notice and this permission notice shall be included with all copies or
   * substantial portions of the Software.
   *
   * THE SOFTWARE IS PROVIDED 'AS IS', WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING
   * BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND
   * NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY  CLAIM,
   * DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
   * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
   */
  
  // Original WeakMap implementation by Gozala @ https://gist.github.com/1269991
  // Updated and bugfixed by Raynos @ https://gist.github.com/1638059
  // Expanded by Benvie @ https://github.com/Benvie/harmony-collections
  
  void function(global, undefined_, undefined){
    var getProps = Object.getOwnPropertyNames,
        defProp  = Object.defineProperty,
        toSource = Function.prototype.toString,
        create   = Object.create,
        hasOwn   = Object.prototype.hasOwnProperty,
        funcName = /^\n?function\s?(\w*)?_?\(/;
  
  
    function define(object, key, value){
      if (typeof key === 'function') {
        value = key;
        key = nameOf(value).replace(/_$/, '');
      }
      return defProp(object, key, { configurable: true, writable: true, value: value });
    }
  
    function nameOf(func){
      return typeof func !== 'function'
            ? '' : 'name' in func
            ? func.name : toSource.call(func).match(funcName)[1];
    }
  
    // ############
    // ### Data ###
    // ############
  
    var Data = (function(){
      var dataDesc = { value: { writable: true, value: undefined } },
          datalock = 'return function(k){if(k===s)return l}',
          uids     = create(null),
  
          createUID = function(){
            var key = Math.random().toString(36).slice(2);
            return key in uids ? createUID() : uids[key] = key;
          },
  
          globalID = createUID(),
  
          storage = function(obj){
            if (hasOwn.call(obj, globalID))
              return obj[globalID];
  
            if (!Object.isExtensible(obj))
              throw new TypeError("Object must be extensible");
  
            var store = create(null);
            defProp(obj, globalID, { value: store });
            return store;
          };
  
      // common per-object storage area made visible by patching getOwnPropertyNames'
      define(Object, function getOwnPropertyNames(obj){
        var props = getProps(obj);
        if (hasOwn.call(obj, globalID))
          props.splice(props.indexOf(globalID), 1);
        return props;
      });
  
      function Data(){
        var puid = createUID(),
            secret = {};
  
        this.unlock = function(obj){
          var store = storage(obj);
          if (hasOwn.call(store, puid))
            return store[puid](secret);
  
          var data = create(null, dataDesc);
          defProp(store, puid, {
            value: new Function('s', 'l', datalock)(secret, data)
          });
          return data;
        }
      }
  
      define(Data.prototype, function get(o){ return this.unlock(o).value });
      define(Data.prototype, function set(o, v){ this.unlock(o).value = v });
  
      return Data;
    }());
  
  
    var WM = (function(data){
      var validate = function(key){
        if (key == null || typeof key !== 'object' && typeof key !== 'function')
          throw new TypeError("Invalid WeakMap key");
      }
  
      var wrap = function(collection, value){
        var store = data.unlock(collection);
        if (store.value)
          throw new TypeError("Object is already a WeakMap");
        store.value = value;
      }
  
      var unwrap = function(collection){
        var storage = data.unlock(collection).value;
        if (!storage)
          throw new TypeError("WeakMap is not generic");
        return storage;
      }
  
      var initialize = function(weakmap, iterable){
        if (iterable !== null && typeof iterable === 'object' && typeof iterable.forEach === 'function') {
          iterable.forEach(function(item, i){
            if (item instanceof Array && item.length === 2)
              set.call(weakmap, iterable[i][0], iterable[i][1]);
          });
        }
      }
  
  
      function WeakMap(iterable){
        if (this === global || this == null || this === WeakMap.prototype)
          return new WeakMap(iterable);
  
        wrap(this, new Data);
        initialize(this, iterable);
      }
  
      function get(key){
        validate(key);
        var value = unwrap(this).get(key);
        return value === undefined_ ? undefined : value;
      }
  
      function set(key, value){
        validate(key);
        // store a token for explicit undefined so that "has" works correctly
        unwrap(this).set(key, value === undefined ? undefined_ : value);
      }
  
      function has(key){
        validate(key);
        return unwrap(this).get(key) !== undefined;
      }
  
      function delete_(key){
        validate(key);
        var data = unwrap(this),
            had = data.get(key) !== undefined;
        data.set(key, undefined);
        return had;
      }
  
      function toString(){
        unwrap(this);
        return '[object WeakMap]';
      }
  
      try {
        var src = ('return '+delete_).replace('e_', '\\u0065'),
            del = new Function('unwrap', 'validate', src)(unwrap, validate);
      } catch (e) {
        var del = delete_;
      }
  
      var src = (''+Object).split('Object');
      var stringifier = function toString(){
        return src[0] + nameOf(this) + src[1];
      };
  
      define(stringifier, stringifier);
  
      var prep = { __proto__: [] } instanceof Array
        ? function(f){ f.__proto__ = stringifier }
        : function(f){ define(f, stringifier) };
  
      prep(WeakMap);
  
      [toString, get, set, has, del].forEach(function(method){
        define(WeakMap.prototype, method);
        prep(method);
      });
  
      return WeakMap;
    }(new Data));
  
    var defaultCreator = Object.create
      ? function(){ return Object.create(null) }
      : function(){ return {} };
  
    function createStorage(creator){
      var weakmap = new WM;
      creator || (creator = defaultCreator);
  
      function storage(object, value){
        if (value || arguments.length === 2) {
          weakmap.set(object, value);
        } else {
          value = weakmap.get(object);
          if (value === undefined) {
            value = creator(object);
            weakmap.set(object, value);
          }
        }
        return value;
      }
  
      return storage;
    }
  
  
    if (typeof module !== 'undefined') {
      module.exports = WM;
    } else if (typeof exports !== 'undefined') {
      exports.WeakMap = WM;
    } else if (!('WeakMap' in global)) {
      global.WeakMap = WM;
    }
  
    WM.createStorage = createStorage;
    if (global.WeakMap)
      global.WeakMap.createStorage = createStorage;
  }((0, eval)('this'));
  
  
  return module.exports;
}).call(this);
// src/util/event-map.js
(typeof window === 'undefined' ? global : window).__179de9e26da518d139b95b2fb8e0e553 = (function () {
  var module = {
    exports: {}
  };
  var exports = module.exports;
  
  'use strict';
  
  Object.defineProperty(exports, '__esModule', {
    value: true
  });
  
  __99ae6500534ecca2cc3945bfe4109057;
  
  var WeakMap = window.WeakMap;
  
  var map = new WeakMap();
  
  exports['default'] = function (elem) {
    var events = map.get(elem);
    events || map.set(elem, events = {});
    return events;
  };
  
  module.exports = exports['default'];
  
  return module.exports;
}).call(this);
// src/compare/events.js
(typeof window === 'undefined' ? global : window).__34fcf97edbfdec192096e8fcd1833156 = (function () {
  var module = {
    exports: {}
  };
  var exports = module.exports;
  
  'use strict';
  
  Object.defineProperty(exports, '__esModule', {
    value: true
  });
  
  function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }
  
  function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj['default'] = obj; return newObj; } }
  
  var _types = __0ca807667308490ecea534df3b4369b8;
  
  var types = _interopRequireWildcard(_types);
  
  var _utilEventMap = __179de9e26da518d139b95b2fb8e0e553;
  
  var _utilEventMap2 = _interopRequireDefault(_utilEventMap);
  
  exports['default'] = function (src, dst) {
    var eventHandlers = (0, _utilEventMap2['default'])(src);
    var dstEvents = dst.events;
    var instructions = [];
  
    // Remove all handlers not being set.
    for (var _name in eventHandlers) {
      if (!dstEvents || !(_name in dstEvents)) {
        var value = null;
        instructions.push({
          data: { name: _name, value: value },
          destination: dst,
          source: src,
          type: types.SET_EVENT
        });
      }
    }
  
    // Add new handlers, not changing existing ones.
    if (dstEvents) {
      for (var _name2 in dstEvents) {
        var value = dstEvents[_name2];
        if (eventHandlers[_name2] !== value) {
          instructions.push({
            data: { name: _name2, value: value },
            destination: dst,
            source: src,
            type: types.SET_EVENT
          });
        }
      }
    }
  
    return instructions;
  };
  
  module.exports = exports['default'];
  
  return module.exports;
}).call(this);
// src/compare/element.js
(typeof window === 'undefined' ? global : window).__8a4ddda1ca8be7b0c056814a3966d1ca = (function () {
  var module = {
    exports: {}
  };
  var exports = module.exports;
  
  'use strict';
  
  Object.defineProperty(exports, '__esModule', {
    value: true
  });
  
  function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }
  
  var _attributes = __bad2e851182eb57480d47d0d1303f9cd;
  
  var _attributes2 = _interopRequireDefault(_attributes);
  
  var _events = __34fcf97edbfdec192096e8fcd1833156;
  
  var _events2 = _interopRequireDefault(_events);
  
  exports['default'] = function (src, dst) {
    if (src.tagName === dst.tagName) {
      return (0, _attributes2['default'])(src, dst).concat((0, _events2['default'])(src, dst));
    }
  };
  
  module.exports = exports['default'];
  
  return module.exports;
}).call(this);
// src/compare/text.js
(typeof window === 'undefined' ? global : window).__6be3dfb2c966cc1cf98fbc28ab388768 = (function () {
  var module = {
    exports: {}
  };
  var exports = module.exports;
  
  'use strict';
  
  Object.defineProperty(exports, '__esModule', {
    value: true
  });
  
  function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj['default'] = obj; return newObj; } }
  
  var _types = __0ca807667308490ecea534df3b4369b8;
  
  var types = _interopRequireWildcard(_types);
  
  exports['default'] = function (src, dst) {
    if (src.textContent === dst.textContent) {
      return [];
    }
  
    return [{
      destination: dst,
      source: src,
      type: types.TEXT_CONTENT
    }];
  };
  
  module.exports = exports['default'];
  
  return module.exports;
}).call(this);
// src/compare/comment.js
(typeof window === 'undefined' ? global : window).__b61b794da4779d6fe0fb5684b9f98c70 = (function () {
  var module = {
    exports: {}
  };
  var exports = module.exports;
  
  'use strict';
  
  Object.defineProperty(exports, '__esModule', {
    value: true
  });
  
  function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }
  
  var _text = __6be3dfb2c966cc1cf98fbc28ab388768;
  
  var _text2 = _interopRequireDefault(_text);
  
  exports['default'] = _text2['default'];
  module.exports = exports['default'];
  
  return module.exports;
}).call(this);
// src/compare/node.js
(typeof window === 'undefined' ? global : window).__d1a542bf52dea3e669dda0475c050479 = (function () {
  var module = {
    exports: {}
  };
  var exports = module.exports;
  
  'use strict';
  
  Object.defineProperty(exports, '__esModule', {
    value: true
  });
  
  function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }
  
  var _element = __8a4ddda1ca8be7b0c056814a3966d1ca;
  
  var _element2 = _interopRequireDefault(_element);
  
  var _text = __6be3dfb2c966cc1cf98fbc28ab388768;
  
  var _text2 = _interopRequireDefault(_text);
  
  var _comment = __b61b794da4779d6fe0fb5684b9f98c70;
  
  var _comment2 = _interopRequireDefault(_comment);
  
  var NODE_COMMENT = 8;
  var NODE_ELEMENT = 1;
  var NODE_TEXT = 3;
  
  exports['default'] = function (src, dst) {
    var dstType = undefined,
        srcType = undefined;
  
    if (!dst || !src) {
      return;
    }
  
    dstType = dst.nodeType;
    srcType = src.nodeType;
  
    if (dstType !== srcType) {
      return;
    } else if (dstType === NODE_ELEMENT) {
      return (0, _element2['default'])(src, dst);
    } else if (dstType === NODE_TEXT) {
      return (0, _text2['default'])(src, dst);
    } else if (dstType === NODE_COMMENT) {
      return (0, _comment2['default'])(src, dst);
    }
  };
  
  module.exports = exports['default'];
  
  return module.exports;
}).call(this);
// src/util/real-node-map.js
(typeof window === 'undefined' ? global : window).__9474e90f826080a0598483aba75ba887 = (function () {
  var module = {
    exports: {}
  };
  var exports = module.exports;
  
  'use strict';
  
  Object.defineProperty(exports, '__esModule', {
    value: true
  });
  
  __99ae6500534ecca2cc3945bfe4109057;
  
  var WeakMap = window.WeakMap;
  exports['default'] = new WeakMap();
  module.exports = exports['default'];
  
  return module.exports;
}).call(this);
// src/util/real-node.js
(typeof window === 'undefined' ? global : window).__5867064010dd8ce98a03e6d693c0b368 = (function () {
  var module = {
    exports: {}
  };
  var exports = module.exports;
  
  'use strict';
  
  Object.defineProperty(exports, '__esModule', {
    value: true
  });
  
  function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }
  
  var _realNodeMap = __9474e90f826080a0598483aba75ba887;
  
  var _realNodeMap2 = _interopRequireDefault(_realNodeMap);
  
  var Node = window.Node;
  
  exports['default'] = function (node) {
    return node instanceof Node ? node : _realNodeMap2['default'].get(node);
  };
  
  module.exports = exports['default'];
  
  return module.exports;
}).call(this);
// src/diff.js
(typeof window === 'undefined' ? global : window).__22dce1b31df73fb8f06bda10d9498f07 = (function () {
  var module = {
    exports: {}
  };
  var exports = module.exports;
  
  'use strict';
  
  Object.defineProperty(exports, '__esModule', {
    value: true
  });
  exports['default'] = diff;
  
  function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }
  
  function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj['default'] = obj; return newObj; } }
  
  var _types = __0ca807667308490ecea534df3b4369b8;
  
  var types = _interopRequireWildcard(_types);
  
  var _compareNode = __d1a542bf52dea3e669dda0475c050479;
  
  var _compareNode2 = _interopRequireDefault(_compareNode);
  
  var _utilRealNode = __5867064010dd8ce98a03e6d693c0b368;
  
  var _utilRealNode2 = _interopRequireDefault(_utilRealNode);
  
  var _utilRealNodeMap = __9474e90f826080a0598483aba75ba887;
  
  var _utilRealNodeMap2 = _interopRequireDefault(_utilRealNodeMap);
  
  function diff() {
    var opts = arguments.length <= 0 || arguments[0] === undefined ? {} : arguments[0];
  
    var src = opts.source;
    var dst = opts.destination;
    var instructions = [];
  
    if (!src || !dst) {
      return [];
    }
  
    var srcChs = src.childNodes;
    var dstChs = dst.childNodes;
    var srcChsLen = srcChs ? srcChs.length : 0;
    var dstChsLen = dstChs ? dstChs.length : 0;
  
    for (var a = 0; a < dstChsLen; a++) {
      var curSrc = srcChs[a];
      var curDst = dstChs[a];
  
      // If there is no matching destination node it means we need to remove the
      // current source node from the source.
      if (!curSrc) {
        instructions.push({
          destination: dstChs[a],
          source: src,
          type: types.APPEND_CHILD
        });
        continue;
      } else {
        // Ensure the real node is carried over even if the destination isn't used.
        // This is used in the render() function to keep track of the real node
        // that corresponds to a virtual node if a virtual tree is being used.
        if (!(curDst instanceof Node)) {
          _utilRealNodeMap2['default'].set(curDst, (0, _utilRealNode2['default'])(curSrc));
        }
      }
  
      var nodeInstructions = (0, _compareNode2['default'])(curSrc, curDst);
  
      // If there are instructions (even an empty array) it means the node can be
      // diffed and doesn't have to be replaced. If the instructions are falsy
      // it means that the nodes are not similar (cannot be changed) and must be
      // replaced instead.
      if (nodeInstructions) {
        var newOpts = opts;
        newOpts.destination = curDst;
        newOpts.source = curSrc;
        instructions = instructions.concat(nodeInstructions, diff(newOpts));
      } else {
        instructions.push({
          destination: curDst,
          source: curSrc,
          type: types.REPLACE_CHILD
        });
      }
    }
  
    if (dstChsLen < srcChsLen) {
      for (var a = dstChsLen; a < srcChsLen; a++) {
        instructions.push({
          destination: srcChs[a],
          source: src,
          type: types.REMOVE_CHILD
        });
      }
    }
  
    return instructions;
  }
  
  module.exports = exports['default'];
  
  return module.exports;
}).call(this);
// src/util/content-node.js
(typeof window === 'undefined' ? global : window).__3e012eccf6c20915a9e6a53685db63fd = (function () {
  var module = {
    exports: {}
  };
  var exports = module.exports;
  
  'use strict';
  
  Object.defineProperty(exports, '__esModule', {
    value: true
  });
  
  function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }
  
  var _realNode = __5867064010dd8ce98a03e6d693c0b368;
  
  var _realNode2 = _interopRequireDefault(_realNode);
  
  exports['default'] = function (node) {
    var tmp = (0, _realNode2['default'])(node);
    var contentNode = tmp.content;
    return contentNode && contentNode.appendChild ? contentNode : tmp;
  };
  
  module.exports = exports['default'];
  
  return module.exports;
}).call(this);
// src/vdom/dom.js
(typeof window === 'undefined' ? global : window).__c672b2ab009d1b5af8a22c830a9d5ab6 = (function () {
  var module = {
    exports: {}
  };
  var exports = module.exports;
  
  'use strict';
  
  Object.defineProperty(exports, '__esModule', {
    value: true
  });
  exports['default'] = render;
  
  function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }
  
  var _utilAccessor = __c1565a66d0c7d169b4ad86c2905cfafc;
  
  var _utilEventMap = __179de9e26da518d139b95b2fb8e0e553;
  
  var _utilEventMap2 = _interopRequireDefault(_utilEventMap);
  
  var _utilRealNodeMap = __9474e90f826080a0598483aba75ba887;
  
  var _utilRealNodeMap2 = _interopRequireDefault(_utilRealNodeMap);
  
  function createElement(el) {
    var realNode = document.createElement(el.tagName);
    var attributes = el.attributes;
    var events = el.events;
    var eventHandlers = (0, _utilEventMap2['default'])(realNode);
    var children = el.childNodes;
  
    if (attributes) {
      var attributesLen = attributes.length;
      for (var a = 0; a < attributesLen; a++) {
        var attr = attributes[a];
        (0, _utilAccessor.setAccessor)(realNode, attr.name, attr.value);
      }
    }
  
    if (events) {
      for (var _name in events) {
        realNode.addEventListener(_name, eventHandlers[_name] = events[_name]);
      }
    }
  
    if (children) {
      var content = realNode.content || realNode;
      var docfrag = document.createDocumentFragment();
      var childrenLen = children.length;
  
      for (var a = 0; a < childrenLen; a++) {
        var ch = children[a];
        ch && docfrag.appendChild(render(ch));
      }
  
      if (content.appendChild) {
        content.appendChild(docfrag);
      }
    }
  
    return realNode;
  }
  
  function createText(el) {
    return document.createTextNode(el.textContent);
  }
  
  function render(el) {
    if (el instanceof Node) {
      return el;
    }
    var realNode = el.tagName ? createElement(el) : createText(el);
    _utilRealNodeMap2['default'].set(el, realNode);
    return realNode;
  }
  
  module.exports = exports['default'];
  
  return module.exports;
}).call(this);
// src/patch/append-child.js
(typeof window === 'undefined' ? global : window).__3ed6aa44bf4d6b9365bed745b80029cf = (function () {
  var module = {
    exports: {}
  };
  var exports = module.exports;
  
  'use strict';
  
  Object.defineProperty(exports, '__esModule', {
    value: true
  });
  
  function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }
  
  var _utilContentNode = __3e012eccf6c20915a9e6a53685db63fd;
  
  var _utilContentNode2 = _interopRequireDefault(_utilContentNode);
  
  var _vdomDom = __c672b2ab009d1b5af8a22c830a9d5ab6;
  
  var _vdomDom2 = _interopRequireDefault(_vdomDom);
  
  exports['default'] = function (src, dst) {
    (0, _utilContentNode2['default'])(src).appendChild((0, _vdomDom2['default'])(dst));
  };
  
  module.exports = exports['default'];
  
  return module.exports;
}).call(this);
// src/patch/remove-attribute.js
(typeof window === 'undefined' ? global : window).__9bbe6d2e49edcd9d91aac0c352f01bb0 = (function () {
  var module = {
    exports: {}
  };
  var exports = module.exports;
  
  'use strict';
  
  Object.defineProperty(exports, '__esModule', {
    value: true
  });
  
  function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }
  
  var _utilAccessor = __c1565a66d0c7d169b4ad86c2905cfafc;
  
  var _utilRealNode = __5867064010dd8ce98a03e6d693c0b368;
  
  var _utilRealNode2 = _interopRequireDefault(_utilRealNode);
  
  exports['default'] = function (src, dst, data) {
    (0, _utilAccessor.removeAccessor)((0, _utilRealNode2['default'])(src), data.name);
  };
  
  module.exports = exports['default'];
  
  return module.exports;
}).call(this);
// src/patch/remove-child.js
(typeof window === 'undefined' ? global : window).__b306d2b34b0fbb399cbb13b5dc7dd96a = (function () {
  var module = {
    exports: {}
  };
  var exports = module.exports;
  
  'use strict';
  
  Object.defineProperty(exports, '__esModule', {
    value: true
  });
  
  function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }
  
  var _utilRealNode = __5867064010dd8ce98a03e6d693c0b368;
  
  var _utilRealNode2 = _interopRequireDefault(_utilRealNode);
  
  exports['default'] = function (src, dst) {
    var realDst = (0, _utilRealNode2['default'])(dst);
    realDst.parentNode.removeChild(realDst);
  };
  
  module.exports = exports['default'];
  
  return module.exports;
}).call(this);
// src/patch/replace-child.js
(typeof window === 'undefined' ? global : window).__36e2ac600d355b297d4888bed8e557b1 = (function () {
  var module = {
    exports: {}
  };
  var exports = module.exports;
  
  'use strict';
  
  Object.defineProperty(exports, '__esModule', {
    value: true
  });
  
  function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }
  
  var _vdomDom = __c672b2ab009d1b5af8a22c830a9d5ab6;
  
  var _vdomDom2 = _interopRequireDefault(_vdomDom);
  
  var _utilRealNode = __5867064010dd8ce98a03e6d693c0b368;
  
  var _utilRealNode2 = _interopRequireDefault(_utilRealNode);
  
  exports['default'] = function (src, dst) {
    var realSrc = (0, _utilRealNode2['default'])(src);
    realSrc && realSrc.parentNode && realSrc.parentNode.replaceChild((0, _vdomDom2['default'])(dst), realSrc);
  };
  
  module.exports = exports['default'];
  
  return module.exports;
}).call(this);
// src/patch/set-attribute.js
(typeof window === 'undefined' ? global : window).__3a0f75dfacfe0f1a25269b7ec38195ba = (function () {
  var module = {
    exports: {}
  };
  var exports = module.exports;
  
  'use strict';
  
  Object.defineProperty(exports, '__esModule', {
    value: true
  });
  
  function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }
  
  var _utilAccessor = __c1565a66d0c7d169b4ad86c2905cfafc;
  
  var _utilRealNode = __5867064010dd8ce98a03e6d693c0b368;
  
  var _utilRealNode2 = _interopRequireDefault(_utilRealNode);
  
  exports['default'] = function (src, dst, data) {
    (0, _utilAccessor.setAccessor)((0, _utilRealNode2['default'])(src), data.name, data.value);
  };
  
  module.exports = exports['default'];
  
  return module.exports;
}).call(this);
// src/patch/set-event.js
(typeof window === 'undefined' ? global : window).__9ec9c3aabc290894371d127fb1088492 = (function () {
  var module = {
    exports: {}
  };
  var exports = module.exports;
  
  'use strict';
  
  Object.defineProperty(exports, '__esModule', {
    value: true
  });
  
  function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }
  
  var _utilEventMap = __179de9e26da518d139b95b2fb8e0e553;
  
  var _utilEventMap2 = _interopRequireDefault(_utilEventMap);
  
  var _utilRealNode = __5867064010dd8ce98a03e6d693c0b368;
  
  var _utilRealNode2 = _interopRequireDefault(_utilRealNode);
  
  exports['default'] = function (src, dst, data) {
    var realSrc = (0, _utilRealNode2['default'])(src);
    var eventHandlers = (0, _utilEventMap2['default'])(realSrc);
    var name = data.name;
    var prevHandler = eventHandlers[name];
    var nextHandler = data.value;
  
    if (typeof prevHandler === 'function') {
      realSrc.removeEventListener(name, prevHandler);
    }
  
    if (typeof nextHandler === 'function') {
      eventHandlers[name] = nextHandler;
      realSrc.addEventListener(name, nextHandler);
    }
  };
  
  module.exports = exports['default'];
  
  return module.exports;
}).call(this);
// src/patch/text-content.js
(typeof window === 'undefined' ? global : window).__2ecd35541218022de8f33fe72ae13c79 = (function () {
  var module = {
    exports: {}
  };
  var exports = module.exports;
  
  'use strict';
  
  Object.defineProperty(exports, '__esModule', {
    value: true
  });
  
  function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }
  
  var _utilContentNode = __3e012eccf6c20915a9e6a53685db63fd;
  
  var _utilContentNode2 = _interopRequireDefault(_utilContentNode);
  
  exports['default'] = function (src, dst) {
    (0, _utilContentNode2['default'])(src).textContent = dst.textContent;
  };
  
  module.exports = exports['default'];
  
  return module.exports;
}).call(this);
// src/patch.js
(typeof window === 'undefined' ? global : window).__d49832510105705a679155ef252b6786 = (function () {
  var module = {
    exports: {}
  };
  var exports = module.exports;
  
  'use strict';
  
  Object.defineProperty(exports, '__esModule', {
    value: true
  });
  
  function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }
  
  function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj['default'] = obj; return newObj; } }
  
  var _types = __0ca807667308490ecea534df3b4369b8;
  
  var types = _interopRequireWildcard(_types);
  
  var _patchAppendChild = __3ed6aa44bf4d6b9365bed745b80029cf;
  
  var _patchAppendChild2 = _interopRequireDefault(_patchAppendChild);
  
  var _patchRemoveAttribute = __9bbe6d2e49edcd9d91aac0c352f01bb0;
  
  var _patchRemoveAttribute2 = _interopRequireDefault(_patchRemoveAttribute);
  
  var _patchRemoveChild = __b306d2b34b0fbb399cbb13b5dc7dd96a;
  
  var _patchRemoveChild2 = _interopRequireDefault(_patchRemoveChild);
  
  var _patchReplaceChild = __36e2ac600d355b297d4888bed8e557b1;
  
  var _patchReplaceChild2 = _interopRequireDefault(_patchReplaceChild);
  
  var _patchSetAttribute = __3a0f75dfacfe0f1a25269b7ec38195ba;
  
  var _patchSetAttribute2 = _interopRequireDefault(_patchSetAttribute);
  
  var _patchSetEvent = __9ec9c3aabc290894371d127fb1088492;
  
  var _patchSetEvent2 = _interopRequireDefault(_patchSetEvent);
  
  var _patchTextContent = __2ecd35541218022de8f33fe72ae13c79;
  
  var _patchTextContent2 = _interopRequireDefault(_patchTextContent);
  
  var patchers = {};
  patchers[types.APPEND_CHILD] = _patchAppendChild2['default'];
  patchers[types.REMOVE_ATTRIBUTE] = _patchRemoveAttribute2['default'];
  patchers[types.REMOVE_CHILD] = _patchRemoveChild2['default'];
  patchers[types.REPLACE_CHILD] = _patchReplaceChild2['default'];
  patchers[types.SET_ATTRIBUTE] = _patchSetAttribute2['default'];
  patchers[types.SET_EVENT] = _patchSetEvent2['default'];
  patchers[types.TEXT_CONTENT] = _patchTextContent2['default'];
  
  function patch(instruction) {
    patchers[instruction.type](instruction.source, instruction.destination, instruction.data);
  }
  
  exports['default'] = function (instructions) {
    instructions.forEach(patch);
  };
  
  module.exports = exports['default'];
  
  return module.exports;
}).call(this);
// src/merge.js
(typeof window === 'undefined' ? global : window).__397f1a21725eb3fd4fbf51ee69fe1006 = (function () {
  var module = {
    exports: {}
  };
  var exports = module.exports;
  
  'use strict';
  
  Object.defineProperty(exports, '__esModule', {
    value: true
  });
  
  function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }
  
  var _diff = __22dce1b31df73fb8f06bda10d9498f07;
  
  var _diff2 = _interopRequireDefault(_diff);
  
  var _patch = __d49832510105705a679155ef252b6786;
  
  var _patch2 = _interopRequireDefault(_patch);
  
  exports['default'] = function (opts) {
    var inst = (0, _diff2['default'])(opts);
    (0, _patch2['default'])(inst);
    return inst;
  };
  
  module.exports = exports['default'];
  
  return module.exports;
}).call(this);
// src/vdom/text.js
(typeof window === 'undefined' ? global : window).__a6dacf85b92d2d194c29d40bfdfc8927 = (function () {
  var module = {
    exports: {}
  };
  var exports = module.exports;
  
  "use strict";
  
  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports["default"] = createTextNode;
  
  function createTextNode(item) {
    return {
      nodeType: 3,
      textContent: item
    };
  }
  
  module.exports = exports["default"];
  
  return module.exports;
}).call(this);
// src/vdom/element.js
(typeof window === 'undefined' ? global : window).__90cd00536bcb3b42d1659021f5337f5f = (function () {
  var module = {
    exports: {}
  };
  var exports = module.exports;
  
  'use strict';
  
  Object.defineProperty(exports, '__esModule', {
    value: true
  });
  
  function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }
  
  var _utilAccessor = __c1565a66d0c7d169b4ad86c2905cfafc;
  
  var _text = __a6dacf85b92d2d194c29d40bfdfc8927;
  
  var _text2 = _interopRequireDefault(_text);
  
  function separateData(obj) {
    var attrs = {};
    var events = {};
    var node = {};
    var attrIdx = 0;
  
    for (var _name in obj) {
      var value = obj[_name];
  
      if (_name.indexOf('on') === 0) {
        events[_name.substring(2)] = value;
      } else {
        attrs[attrIdx++] = attrs[_name] = { name: _name, value: value };
        (0, _utilAccessor.mapAccessor)(node, _name, value);
      }
    }
  
    attrs.length = attrIdx;
    return { attrs: attrs, events: events, node: node };
  }
  
  function ensureNodes(arr) {
    var out = [];
    arr.filter(Boolean).forEach(function (item) {
      if (Array.isArray(item)) {
        out = out.concat(ensureNodes(item));
      } else if (typeof item === 'object') {
        out.push(item);
      } else {
        out.push((0, _text2['default'])(item));
      }
    });
    return out;
  }
  
  function ensureTagName(name) {
    return (typeof name === 'function' ? name.id || name.name : name).toUpperCase();
  }
  
  exports['default'] = function (name) {
    var attrs = arguments.length <= 1 || arguments[1] === undefined ? {} : arguments[1];
  
    var data = separateData(attrs);
    var node = data.node;
    node.nodeType = 1;
    node.tagName = ensureTagName(name);
    node.attributes = data.attrs;
    node.events = data.events;
  
    for (var _len = arguments.length, chren = Array(_len > 2 ? _len - 2 : 0), _key = 2; _key < _len; _key++) {
      chren[_key - 2] = arguments[_key];
    }
  
    node.childNodes = ensureNodes(chren);
    return node;
  };
  
  module.exports = exports['default'];
  
  return module.exports;
}).call(this);
// src/vdom/mount.js
(typeof window === 'undefined' ? global : window).__64984ff90aff8eb27308803984d99dfd = (function () {
  var module = {
    exports: {}
  };
  var exports = module.exports;
  
  'use strict';
  
  Object.defineProperty(exports, '__esModule', {
    value: true
  });
  
  function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }
  
  var _utilContentNode = __3e012eccf6c20915a9e6a53685db63fd;
  
  var _utilContentNode2 = _interopRequireDefault(_utilContentNode);
  
  var _dom = __c672b2ab009d1b5af8a22c830a9d5ab6;
  
  var _dom2 = _interopRequireDefault(_dom);
  
  exports['default'] = function (elem, tree) {
    var content = elem;
    while (content.firstChild) {
      content.firstChild.remove();
    }
    content.appendChild((0, _dom2['default'])(tree));
  };
  
  module.exports = exports['default'];
  
  return module.exports;
}).call(this);
// src/render.js
(typeof window === 'undefined' ? global : window).__7716f1488710dcad35ac89f2ee13769f = (function () {
  var module = {
    exports: {}
  };
  var exports = module.exports;
  
  'use strict';
  
  Object.defineProperty(exports, '__esModule', {
    value: true
  });
  
  function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }
  
  __99ae6500534ecca2cc3945bfe4109057;
  
  var _vdomElement = __90cd00536bcb3b42d1659021f5337f5f;
  
  var _vdomElement2 = _interopRequireDefault(_vdomElement);
  
  var _merge = __397f1a21725eb3fd4fbf51ee69fe1006;
  
  var _merge2 = _interopRequireDefault(_merge);
  
  var _vdomMount = __64984ff90aff8eb27308803984d99dfd;
  
  var _vdomMount2 = _interopRequireDefault(_vdomMount);
  
  var Node = window.Node;
  var WeakMap = window.WeakMap;
  
  var oldTreeMap = new WeakMap();
  
  exports['default'] = function (render) {
    return function (elem) {
      elem = elem instanceof Node ? elem : this;
  
      if (!elem instanceof Node) {
        throw new Error('No node provided to diff renderer as either the first argument or the context.');
      }
  
      // Create a new element to house the new tree since we diff fragments.
      var newTree = (0, _vdomElement2['default'])('div', null, render(elem, { createElement: _vdomElement2['default'] }));
      var oldTree = oldTreeMap.get(elem);
  
      if (oldTree) {
        (0, _merge2['default'])({
          destination: newTree,
          source: oldTree
        });
      } else {
        (0, _vdomMount2['default'])(elem, newTree.childNodes[0]);
      }
  
      oldTreeMap.set(elem, newTree);
    };
  };
  
  module.exports = exports['default'];
  
  return module.exports;
}).call(this);
// src/vdom/index.js
(typeof window === 'undefined' ? global : window).__1642ccd4766a5b54382caa2ba439f592 = (function () {
  var module = {
    exports: {}
  };
  var exports = module.exports;
  
  'use strict';
  
  Object.defineProperty(exports, '__esModule', {
    value: true
  });
  
  function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }
  
  var _dom = __c672b2ab009d1b5af8a22c830a9d5ab6;
  
  var _dom2 = _interopRequireDefault(_dom);
  
  var _element = __90cd00536bcb3b42d1659021f5337f5f;
  
  var _element2 = _interopRequireDefault(_element);
  
  var _mount = __64984ff90aff8eb27308803984d99dfd;
  
  var _mount2 = _interopRequireDefault(_mount);
  
  var _text = __a6dacf85b92d2d194c29d40bfdfc8927;
  
  var _text2 = _interopRequireDefault(_text);
  
  exports['default'] = {
    dom: _dom2['default'],
    element: _element2['default'],
    mount: _mount2['default'],
    text: _text2['default']
  };
  module.exports = exports['default'];
  
  return module.exports;
}).call(this);
// src/index.js
(typeof window === 'undefined' ? global : window).__d0534c9e7312e01df51511bab04ed9e4 = (function () {
  var module = {
    exports: {}
  };
  var exports = module.exports;
  
  'use strict';
  
  Object.defineProperty(exports, '__esModule', {
    value: true
  });
  
  function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }
  
  var _diff = __22dce1b31df73fb8f06bda10d9498f07;
  
  var _diff2 = _interopRequireDefault(_diff);
  
  var _merge = __397f1a21725eb3fd4fbf51ee69fe1006;
  
  var _merge2 = _interopRequireDefault(_merge);
  
  var _patch = __d49832510105705a679155ef252b6786;
  
  var _patch2 = _interopRequireDefault(_patch);
  
  var _render = __7716f1488710dcad35ac89f2ee13769f;
  
  var _render2 = _interopRequireDefault(_render);
  
  var _types = __0ca807667308490ecea534df3b4369b8;
  
  var _types2 = _interopRequireDefault(_types);
  
  var _vdom = __1642ccd4766a5b54382caa2ba439f592;
  
  var _vdom2 = _interopRequireDefault(_vdom);
  
  exports['default'] = {
    diff: _diff2['default'],
    merge: _merge2['default'],
    patch: _patch2['default'],
    render: _render2['default'],
    types: _types2['default'],
    vdom: _vdom2['default']
  };
  module.exports = exports['default'];
  
  return module.exports;
}).call(this);
// src/global.js
(typeof window === 'undefined' ? global : window).__a072583ef3bdddb0fc56ec2a2194ea95 = (function () {
  var module = {
    exports: {}
  };
  var exports = module.exports;
  
  'use strict';
  
  function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }
  
  var _index = __d0534c9e7312e01df51511bab04ed9e4;
  
  var _index2 = _interopRequireDefault(_index);
  
  window.skateDomDiff = _index2['default'];
  
  return module.exports;
}).call(this);