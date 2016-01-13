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
      // most things
    } else if (name !== 'type' && name in node) {
        return node[name];
        // real DOM elements
      } else if (node.getAttribute) {
          return node.getAttribute(name);
          // vDOM nodes
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
      // most things
    } else if (name !== 'type' && name in node) {
        node[name] = '';
        // real DOM elements
      } else if (node.removeAttribute) {
          node.removeAttribute(name);
          // vDOM nodes
        } else if (node.attributes) {
            delete node.attributes[name];
          }
  }
  
  function setAccessor(node, name, value) {
    if (name === 'class') {
      node.className = value;
    } else if (name === 'style') {
      node.style.cssText = value;
      // most things
    } else if (name !== 'type' && name in node || typeof value !== 'string' && name !== 'content') {
        // We check if it's undefined or null because IE throws "invalid argument"
        // errors for some types of properties. Essentially this is the same as
        // removing the accessor.
        node[name] = value == null ? '' : value;
        // real DOM elements
      } else if (node.setAttribute) {
          node.setAttribute(name, value);
          // vDOM nodes
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
// node_modules/es6-weak-map/is-implemented.js
(typeof window === 'undefined' ? global : window).__01ef85c19158aeaa2d1ae789a7d5005c = (function () {
  var module = {
    exports: {}
  };
  var exports = module.exports;
  
  'use strict';
  
  module.exports = function () {
  	var weakMap, x;
  	if (typeof WeakMap !== 'function') return false;
  	try {
  		// WebKit doesn't support arguments and crashes
  		weakMap = new WeakMap([[x = {}, 'one'], [{}, 'two'], [{}, 'three']]);
  	} catch (e) {
  		return false;
  	}
  	if (String(weakMap) !== '[object WeakMap]') return false;
  	if (typeof weakMap.set !== 'function') return false;
  	if (weakMap.set({}, 1) !== weakMap) return false;
  	if (typeof weakMap.delete !== 'function') return false;
  	if (typeof weakMap.has !== 'function') return false;
  	if (weakMap.get(x) !== 'one') return false;
  
  	return true;
  };
  
  
  return module.exports;
}).call(this);
// node_modules/es6-weak-map/node_modules/es5-ext/object/set-prototype-of/is-implemented.js
(typeof window === 'undefined' ? global : window).__cf45edd9b046379356c66bb73fb42e00 = (function () {
  var module = {
    exports: {}
  };
  var exports = module.exports;
  
  'use strict';
  
  var create = Object.create, getPrototypeOf = Object.getPrototypeOf
    , x = {};
  
  module.exports = function (/*customCreate*/) {
  	var setPrototypeOf = Object.setPrototypeOf
  	  , customCreate = arguments[0] || create;
  	if (typeof setPrototypeOf !== 'function') return false;
  	return getPrototypeOf(setPrototypeOf(customCreate(null), x)) === x;
  };
  
  
  return module.exports;
}).call(this);
// node_modules/es6-weak-map/node_modules/es5-ext/object/is-object.js
(typeof window === 'undefined' ? global : window).__6d80494240735bfa379a8d5e0352de43 = (function () {
  var module = {
    exports: {}
  };
  var exports = module.exports;
  
  'use strict';
  
  var map = { function: true, object: true };
  
  module.exports = function (x) {
  	return ((x != null) && map[typeof x]) || false;
  };
  
  
  return module.exports;
}).call(this);
// node_modules/es6-weak-map/node_modules/es5-ext/object/valid-value.js
(typeof window === 'undefined' ? global : window).__5389ea91fb7f4e144c936d87a8520636 = (function () {
  var module = {
    exports: {}
  };
  var exports = module.exports;
  
  'use strict';
  
  module.exports = function (value) {
  	if (value == null) throw new TypeError("Cannot use null or undefined");
  	return value;
  };
  
  
  return module.exports;
}).call(this);
// node_modules/es6-weak-map/node_modules/es5-ext/object/create.js
(typeof window === 'undefined' ? global : window).__cbab705091e54a965dd5dc0a3e7eb4dd = (function () {
  var module = {
    exports: {}
  };
  var exports = module.exports;
  
  // Workaround for http://code.google.com/p/v8/issues/detail?id=2804
  
  var create = Object.create, shim;
  
  if (!__cf45edd9b046379356c66bb73fb42e00()) {
  	shim = __20571213ab25ed89d7253ba5eb3cc198;
  }
  
  module.exports = (function () {
  	var nullObject, props, desc;
  	if (!shim) return create;
  	if (shim.level !== 1) return create;
  
  	nullObject = {};
  	props = {};
  	desc = { configurable: false, enumerable: false, writable: true,
  		value: undefined };
  	Object.getOwnPropertyNames(Object.prototype).forEach(function (name) {
  		if (name === '__proto__') {
  			props[name] = { configurable: true, enumerable: false, writable: true,
  				value: undefined };
  			return;
  		}
  		props[name] = desc;
  	});
  	Object.defineProperties(nullObject, props);
  
  	Object.defineProperty(shim, 'nullPolyfill', { configurable: false,
  		enumerable: false, writable: false, value: nullObject });
  
  	return function (prototype, props) {
  		return create((prototype === null) ? nullObject : prototype, props);
  	};
  }());
  
  
  return module.exports;
}).call(this);
// node_modules/es6-weak-map/node_modules/es5-ext/object/set-prototype-of/shim.js
(typeof window === 'undefined' ? global : window).__20571213ab25ed89d7253ba5eb3cc198 = (function () {
  var module = {
    exports: {}
  };
  var exports = module.exports;
  
  // Big thanks to @WebReflection for sorting this out
  // https://gist.github.com/WebReflection/5593554
  
  var isObject      = __6d80494240735bfa379a8d5e0352de43
    , value         = __5389ea91fb7f4e144c936d87a8520636
  
    , isPrototypeOf = Object.prototype.isPrototypeOf
    , defineProperty = Object.defineProperty
    , nullDesc = { configurable: true, enumerable: false, writable: true,
  		value: undefined }
    , validate;
  
  validate = function (obj, prototype) {
  	value(obj);
  	if ((prototype === null) || isObject(prototype)) return obj;
  	throw new TypeError('Prototype must be null or an object');
  };
  
  module.exports = (function (status) {
  	var fn, set;
  	if (!status) return null;
  	if (status.level === 2) {
  		if (status.set) {
  			set = status.set;
  			fn = function (obj, prototype) {
  				set.call(validate(obj, prototype), prototype);
  				return obj;
  			};
  		} else {
  			fn = function (obj, prototype) {
  				validate(obj, prototype).__proto__ = prototype;
  				return obj;
  			};
  		}
  	} else {
  		fn = function self(obj, prototype) {
  			var isNullBase;
  			validate(obj, prototype);
  			isNullBase = isPrototypeOf.call(self.nullPolyfill, obj);
  			if (isNullBase) delete self.nullPolyfill.__proto__;
  			if (prototype === null) prototype = self.nullPolyfill;
  			obj.__proto__ = prototype;
  			if (isNullBase) defineProperty(self.nullPolyfill, '__proto__', nullDesc);
  			return obj;
  		};
  	}
  	return Object.defineProperty(fn, 'level', { configurable: false,
  		enumerable: false, writable: false, value: status.level });
  }((function () {
  	var x = Object.create(null), y = {}, set
  	  , desc = Object.getOwnPropertyDescriptor(Object.prototype, '__proto__');
  
  	if (desc) {
  		try {
  			set = desc.set; // Opera crashes at this point
  			set.call(x, y);
  		} catch (ignore) { }
  		if (Object.getPrototypeOf(x) === y) return { set: set, level: 2 };
  	}
  
  	x.__proto__ = y;
  	if (Object.getPrototypeOf(x) === y) return { level: 2 };
  
  	x = {};
  	x.__proto__ = y;
  	if (Object.getPrototypeOf(x) === y) return { level: 1 };
  
  	return false;
  }())));
  
  __cbab705091e54a965dd5dc0a3e7eb4dd;
  
  
  return module.exports;
}).call(this);
// node_modules/es6-weak-map/node_modules/es5-ext/object/set-prototype-of/index.js
(typeof window === 'undefined' ? global : window).__cb5157478dc18a1ed241d499bbecdfcd = (function () {
  var module = {
    exports: {}
  };
  var exports = module.exports;
  
  'use strict';
  
  module.exports = __cf45edd9b046379356c66bb73fb42e00()
  	? Object.setPrototypeOf
  	: __20571213ab25ed89d7253ba5eb3cc198;
  
  
  return module.exports;
}).call(this);
// node_modules/es6-weak-map/node_modules/es5-ext/object/valid-object.js
(typeof window === 'undefined' ? global : window).__80f68642bf659b6350ce18754283add3 = (function () {
  var module = {
    exports: {}
  };
  var exports = module.exports;
  
  'use strict';
  
  var isObject = __6d80494240735bfa379a8d5e0352de43;
  
  module.exports = function (value) {
  	if (!isObject(value)) throw new TypeError(value + " is not an Object");
  	return value;
  };
  
  
  return module.exports;
}).call(this);
// node_modules/es6-weak-map/node_modules/es5-ext/string/random-uniq.js
(typeof window === 'undefined' ? global : window).__43561c9251238df7c2c71756cd967ae8 = (function () {
  var module = {
    exports: {}
  };
  var exports = module.exports;
  
  'use strict';
  
  var generated = Object.create(null)
  
    , random = Math.random;
  
  module.exports = function () {
  	var str;
  	do { str = random().toString(36).slice(2); } while (generated[str]);
  	return str;
  };
  
  
  return module.exports;
}).call(this);
// node_modules/es6-weak-map/node_modules/es5-ext/object/assign/is-implemented.js
(typeof window === 'undefined' ? global : window).__bc337776da60ce174c5563bc8f2fa2fd = (function () {
  var module = {
    exports: {}
  };
  var exports = module.exports;
  
  'use strict';
  
  module.exports = function () {
  	var assign = Object.assign, obj;
  	if (typeof assign !== 'function') return false;
  	obj = { foo: 'raz' };
  	assign(obj, { bar: 'dwa' }, { trzy: 'trzy' });
  	return (obj.foo + obj.bar + obj.trzy) === 'razdwatrzy';
  };
  
  
  return module.exports;
}).call(this);
// node_modules/es6-weak-map/node_modules/es5-ext/object/keys/is-implemented.js
(typeof window === 'undefined' ? global : window).__6825e17fa79eba1fb700aa4fc4ef4911 = (function () {
  var module = {
    exports: {}
  };
  var exports = module.exports;
  
  'use strict';
  
  module.exports = function () {
  	try {
  		Object.keys('primitive');
  		return true;
  	} catch (e) { return false; }
  };
  
  
  return module.exports;
}).call(this);
// node_modules/es6-weak-map/node_modules/es5-ext/object/keys/shim.js
(typeof window === 'undefined' ? global : window).__2035e2240e5f57c01a3b177c88922e93 = (function () {
  var module = {
    exports: {}
  };
  var exports = module.exports;
  
  'use strict';
  
  var keys = Object.keys;
  
  module.exports = function (object) {
  	return keys(object == null ? object : Object(object));
  };
  
  
  return module.exports;
}).call(this);
// node_modules/es6-weak-map/node_modules/es5-ext/object/keys/index.js
(typeof window === 'undefined' ? global : window).__d386ce72ddd1c00d43498322fc33065d = (function () {
  var module = {
    exports: {}
  };
  var exports = module.exports;
  
  'use strict';
  
  module.exports = __6825e17fa79eba1fb700aa4fc4ef4911()
  	? Object.keys
  	: __2035e2240e5f57c01a3b177c88922e93;
  
  
  return module.exports;
}).call(this);
// node_modules/es6-weak-map/node_modules/es5-ext/object/assign/shim.js
(typeof window === 'undefined' ? global : window).__6b22ae8978e6bd39c788ff7da6667d93 = (function () {
  var module = {
    exports: {}
  };
  var exports = module.exports;
  
  'use strict';
  
  var keys  = __d386ce72ddd1c00d43498322fc33065d
    , value = __5389ea91fb7f4e144c936d87a8520636
  
    , max = Math.max;
  
  module.exports = function (dest, src/*, …srcn*/) {
  	var error, i, l = max(arguments.length, 2), assign;
  	dest = Object(value(dest));
  	assign = function (key) {
  		try { dest[key] = src[key]; } catch (e) {
  			if (!error) error = e;
  		}
  	};
  	for (i = 1; i < l; ++i) {
  		src = arguments[i];
  		keys(src).forEach(assign);
  	}
  	if (error !== undefined) throw error;
  	return dest;
  };
  
  
  return module.exports;
}).call(this);
// node_modules/es6-weak-map/node_modules/es5-ext/object/assign/index.js
(typeof window === 'undefined' ? global : window).__f066108f808bda1a350b8841b5a87034 = (function () {
  var module = {
    exports: {}
  };
  var exports = module.exports;
  
  'use strict';
  
  module.exports = __bc337776da60ce174c5563bc8f2fa2fd()
  	? Object.assign
  	: __6b22ae8978e6bd39c788ff7da6667d93;
  
  
  return module.exports;
}).call(this);
// node_modules/es6-weak-map/node_modules/es5-ext/object/normalize-options.js
(typeof window === 'undefined' ? global : window).__d73c3b83cbb90a13677603e7ad1ad715 = (function () {
  var module = {
    exports: {}
  };
  var exports = module.exports;
  
  'use strict';
  
  var forEach = Array.prototype.forEach, create = Object.create;
  
  var process = function (src, obj) {
  	var key;
  	for (key in src) obj[key] = src[key];
  };
  
  module.exports = function (options/*, …options*/) {
  	var result = create(null);
  	forEach.call(arguments, function (options) {
  		if (options == null) return;
  		process(Object(options), result);
  	});
  	return result;
  };
  
  
  return module.exports;
}).call(this);
// node_modules/es6-weak-map/node_modules/es5-ext/object/is-callable.js
(typeof window === 'undefined' ? global : window).__b4e17a66523b43ec7d9ebfe513542295 = (function () {
  var module = {
    exports: {}
  };
  var exports = module.exports;
  
  // Deprecated
  
  module.exports = function (obj) { return typeof obj === 'function'; };
  
  
  return module.exports;
}).call(this);
// node_modules/es6-weak-map/node_modules/es5-ext/string/#/contains/is-implemented.js
(typeof window === 'undefined' ? global : window).__1c56d276c8e988bde618d883b09a9a5b = (function () {
  var module = {
    exports: {}
  };
  var exports = module.exports;
  
  'use strict';
  
  var str = 'razdwatrzy';
  
  module.exports = function () {
  	if (typeof str.contains !== 'function') return false;
  	return ((str.contains('dwa') === true) && (str.contains('foo') === false));
  };
  
  
  return module.exports;
}).call(this);
// node_modules/es6-weak-map/node_modules/es5-ext/string/#/contains/shim.js
(typeof window === 'undefined' ? global : window).__3c52a404322dd3ceaf1470008f1709ad = (function () {
  var module = {
    exports: {}
  };
  var exports = module.exports;
  
  'use strict';
  
  var indexOf = String.prototype.indexOf;
  
  module.exports = function (searchString/*, position*/) {
  	return indexOf.call(this, searchString, arguments[1]) > -1;
  };
  
  
  return module.exports;
}).call(this);
// node_modules/es6-weak-map/node_modules/es5-ext/string/#/contains/index.js
(typeof window === 'undefined' ? global : window).__afa296783cddde2f69814994784521b9 = (function () {
  var module = {
    exports: {}
  };
  var exports = module.exports;
  
  'use strict';
  
  module.exports = __1c56d276c8e988bde618d883b09a9a5b()
  	? String.prototype.contains
  	: __3c52a404322dd3ceaf1470008f1709ad;
  
  
  return module.exports;
}).call(this);
// node_modules/es6-weak-map/node_modules/d/index.js
(typeof window === 'undefined' ? global : window).__515c77a14b9d815d5880f7122dac11d5 = (function () {
  var module = {
    exports: {}
  };
  var exports = module.exports;
  
  'use strict';
  
  var assign        = __f066108f808bda1a350b8841b5a87034
    , normalizeOpts = __d73c3b83cbb90a13677603e7ad1ad715
    , isCallable    = __b4e17a66523b43ec7d9ebfe513542295
    , contains      = __afa296783cddde2f69814994784521b9
  
    , d;
  
  d = module.exports = function (dscr, value/*, options*/) {
  	var c, e, w, options, desc;
  	if ((arguments.length < 2) || (typeof dscr !== 'string')) {
  		options = value;
  		value = dscr;
  		dscr = null;
  	} else {
  		options = arguments[2];
  	}
  	if (dscr == null) {
  		c = w = true;
  		e = false;
  	} else {
  		c = contains.call(dscr, 'c');
  		e = contains.call(dscr, 'e');
  		w = contains.call(dscr, 'w');
  	}
  
  	desc = { value: value, configurable: c, enumerable: e, writable: w };
  	return !options ? desc : assign(normalizeOpts(options), desc);
  };
  
  d.gs = function (dscr, get, set/*, options*/) {
  	var c, e, options, desc;
  	if (typeof dscr !== 'string') {
  		options = set;
  		set = get;
  		get = dscr;
  		dscr = null;
  	} else {
  		options = arguments[3];
  	}
  	if (get == null) {
  		get = undefined;
  	} else if (!isCallable(get)) {
  		options = get;
  		get = set = undefined;
  	} else if (set == null) {
  		set = undefined;
  	} else if (!isCallable(set)) {
  		options = set;
  		set = undefined;
  	}
  	if (dscr == null) {
  		c = true;
  		e = false;
  	} else {
  		c = contains.call(dscr, 'c');
  		e = contains.call(dscr, 'e');
  	}
  
  	desc = { get: get, set: set, configurable: c, enumerable: e };
  	return !options ? desc : assign(normalizeOpts(options), desc);
  };
  
  
  return module.exports;
}).call(this);
// node_modules/es6-weak-map/node_modules/es5-ext/function/is-arguments.js
(typeof window === 'undefined' ? global : window).__b84a693ede15fb4409a0366a45e62898 = (function () {
  var module = {
    exports: {}
  };
  var exports = module.exports;
  
  'use strict';
  
  var toString = Object.prototype.toString
  
    , id = toString.call((function () { return arguments; }()));
  
  module.exports = function (x) { return (toString.call(x) === id); };
  
  
  return module.exports;
}).call(this);
// node_modules/es6-weak-map/node_modules/es5-ext/string/is-string.js
(typeof window === 'undefined' ? global : window).__ea8c8831224a5643e63923314dfe5295 = (function () {
  var module = {
    exports: {}
  };
  var exports = module.exports;
  
  'use strict';
  
  var toString = Object.prototype.toString
  
    , id = toString.call('');
  
  module.exports = function (x) {
  	return (typeof x === 'string') || (x && (typeof x === 'object') &&
  		((x instanceof String) || (toString.call(x) === id))) || false;
  };
  
  
  return module.exports;
}).call(this);
// node_modules/es6-weak-map/node_modules/es5-ext/array/#/clear.js
(typeof window === 'undefined' ? global : window).__d9f8de5b3536e3c9f2ad878f0953979f = (function () {
  var module = {
    exports: {}
  };
  var exports = module.exports;
  
  // Inspired by Google Closure:
  // http://closure-library.googlecode.com/svn/docs/
  // closure_goog_array_array.js.html#goog.array.clear
  
  var value = __5389ea91fb7f4e144c936d87a8520636;
  
  module.exports = function () {
  	value(this).length = 0;
  	return this;
  };
  
  
  return module.exports;
}).call(this);
// node_modules/es6-weak-map/node_modules/es5-ext/object/valid-callable.js
(typeof window === 'undefined' ? global : window).__d971ced8db5c2615328c78bcbe5f94c7 = (function () {
  var module = {
    exports: {}
  };
  var exports = module.exports;
  
  'use strict';
  
  module.exports = function (fn) {
  	if (typeof fn !== 'function') throw new TypeError(fn + " is not a function");
  	return fn;
  };
  
  
  return module.exports;
}).call(this);
// node_modules/es6-weak-map/node_modules/es5-ext/object/copy.js
(typeof window === 'undefined' ? global : window).__b5993cedebe327b8145d4ff54c40263f = (function () {
  var module = {
    exports: {}
  };
  var exports = module.exports;
  
  'use strict';
  
  var assign = __f066108f808bda1a350b8841b5a87034
    , value  = __5389ea91fb7f4e144c936d87a8520636;
  
  module.exports = function (obj) {
  	var copy = Object(value(obj));
  	if (copy !== obj) return copy;
  	return assign({}, obj);
  };
  
  
  return module.exports;
}).call(this);
// node_modules/es6-weak-map/node_modules/es5-ext/object/_iterate.js
(typeof window === 'undefined' ? global : window).__81a0b66ee148594ba41f3b6e33364a4f = (function () {
  var module = {
    exports: {}
  };
  var exports = module.exports;
  
  // Internal method, used by iteration functions.
  // Calls a function for each key-value pair found in object
  // Optionally takes compareFn to iterate object in specific order
  
  var callable = __d971ced8db5c2615328c78bcbe5f94c7
    , value    = __5389ea91fb7f4e144c936d87a8520636
  
    , bind = Function.prototype.bind, call = Function.prototype.call, keys = Object.keys
    , propertyIsEnumerable = Object.prototype.propertyIsEnumerable;
  
  module.exports = function (method, defVal) {
  	return function (obj, cb/*, thisArg, compareFn*/) {
  		var list, thisArg = arguments[2], compareFn = arguments[3];
  		obj = Object(value(obj));
  		callable(cb);
  
  		list = keys(obj);
  		if (compareFn) {
  			list.sort((typeof compareFn === 'function') ? bind.call(compareFn, obj) : undefined);
  		}
  		if (typeof method !== 'function') method = list[method];
  		return call.call(method, list, function (key, index) {
  			if (!propertyIsEnumerable.call(obj, key)) return defVal;
  			return call.call(cb, thisArg, obj[key], key, obj, index);
  		});
  	};
  };
  
  
  return module.exports;
}).call(this);
// node_modules/es6-weak-map/node_modules/es5-ext/object/for-each.js
(typeof window === 'undefined' ? global : window).__ef4526d327394e129b879c29ebc5a282 = (function () {
  var module = {
    exports: {}
  };
  var exports = module.exports;
  
  'use strict';
  
  module.exports = __81a0b66ee148594ba41f3b6e33364a4f('forEach');
  
  
  return module.exports;
}).call(this);
// node_modules/es6-weak-map/node_modules/es5-ext/object/map.js
(typeof window === 'undefined' ? global : window).__0366b918f4c88a8459556ea555684e84 = (function () {
  var module = {
    exports: {}
  };
  var exports = module.exports;
  
  'use strict';
  
  var callable = __d971ced8db5c2615328c78bcbe5f94c7
    , forEach  = __ef4526d327394e129b879c29ebc5a282
  
    , call = Function.prototype.call;
  
  module.exports = function (obj, cb/*, thisArg*/) {
  	var o = {}, thisArg = arguments[2];
  	callable(cb);
  	forEach(obj, function (value, key, obj, index) {
  		o[key] = call.call(cb, thisArg, value, key, obj, index);
  	});
  	return o;
  };
  
  
  return module.exports;
}).call(this);
// node_modules/es6-weak-map/node_modules/d/auto-bind.js
(typeof window === 'undefined' ? global : window).__ba5555711a1c46dac955267c6a732093 = (function () {
  var module = {
    exports: {}
  };
  var exports = module.exports;
  var defineDependencies = {
    "module": module,
    "exports": exports,
    "es5-ext/object/copy": __b5993cedebe327b8145d4ff54c40263f,
    "es5-ext/object/map": __0366b918f4c88a8459556ea555684e84,
    "es5-ext/object/valid-callable": __d971ced8db5c2615328c78bcbe5f94c7,
    "es5-ext/object/valid-value": __5389ea91fb7f4e144c936d87a8520636
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
  }("__ba5555711a1c46dac955267c6a732093");
  define.amd = true;
  
  'use strict';
  
  var copy       = __b5993cedebe327b8145d4ff54c40263f
    , map        = __0366b918f4c88a8459556ea555684e84
    , callable   = __d971ced8db5c2615328c78bcbe5f94c7
    , validValue = __5389ea91fb7f4e144c936d87a8520636
  
    , bind = Function.prototype.bind, defineProperty = Object.defineProperty
    , hasOwnProperty = Object.prototype.hasOwnProperty
    , define;
  
  define = function (name, desc, bindTo) {
  	var value = validValue(desc) && callable(desc.value), dgs;
  	dgs = copy(desc);
  	delete dgs.writable;
  	delete dgs.value;
  	dgs.get = function () {
  		if (hasOwnProperty.call(this, name)) return value;
  		desc.value = bind.call(value, (bindTo == null) ? this : this[bindTo]);
  		defineProperty(this, name, desc);
  		return this[name];
  	};
  	return dgs;
  };
  
  module.exports = function (props/*, bindTo*/) {
  	var bindTo = arguments[1];
  	return map(props, function (desc, name) {
  		return define(name, desc, bindTo);
  	});
  };
  
  
  return module.exports;
}).call(this);
// node_modules/es6-weak-map/node_modules/es6-symbol/is-implemented.js
(typeof window === 'undefined' ? global : window).__3d4f0d4bef6559d399508948fbf17f2a = (function () {
  var module = {
    exports: {}
  };
  var exports = module.exports;
  
  'use strict';
  
  module.exports = function () {
  	var symbol;
  	if (typeof Symbol !== 'function') return false;
  	symbol = Symbol('test symbol');
  	try { String(symbol); } catch (e) { return false; }
  	if (typeof Symbol.iterator === 'symbol') return true;
  
  	// Return 'true' for polyfills
  	if (typeof Symbol.isConcatSpreadable !== 'object') return false;
  	if (typeof Symbol.iterator !== 'object') return false;
  	if (typeof Symbol.toPrimitive !== 'object') return false;
  	if (typeof Symbol.toStringTag !== 'object') return false;
  	if (typeof Symbol.unscopables !== 'object') return false;
  
  	return true;
  };
  
  
  return module.exports;
}).call(this);
// node_modules/es6-weak-map/node_modules/es6-symbol/is-symbol.js
(typeof window === 'undefined' ? global : window).__e576354d16c4449dd35d08e7217ff3dc = (function () {
  var module = {
    exports: {}
  };
  var exports = module.exports;
  
  'use strict';
  
  module.exports = function (x) {
  	return (x && ((typeof x === 'symbol') || (x['@@toStringTag'] === 'Symbol'))) || false;
  };
  
  
  return module.exports;
}).call(this);
// node_modules/es6-weak-map/node_modules/es6-symbol/validate-symbol.js
(typeof window === 'undefined' ? global : window).__5679ec9826f0ac2230ec0295fb5093d8 = (function () {
  var module = {
    exports: {}
  };
  var exports = module.exports;
  
  'use strict';
  
  var isSymbol = __e576354d16c4449dd35d08e7217ff3dc;
  
  module.exports = function (value) {
  	if (!isSymbol(value)) throw new TypeError(value + " is not a symbol");
  	return value;
  };
  
  
  return module.exports;
}).call(this);
// node_modules/es6-weak-map/node_modules/es6-symbol/polyfill.js
(typeof window === 'undefined' ? global : window).__056af215af4152627c7c3bf23574ea54 = (function () {
  var module = {
    exports: {}
  };
  var exports = module.exports;
  
  // ES2015 Symbol polyfill for environments that do not support it (or partially support it_
  
  var d              = __515c77a14b9d815d5880f7122dac11d5
    , validateSymbol = __5679ec9826f0ac2230ec0295fb5093d8
  
    , create = Object.create, defineProperties = Object.defineProperties
    , defineProperty = Object.defineProperty, objPrototype = Object.prototype
    , NativeSymbol, SymbolPolyfill, HiddenSymbol, globalSymbols = create(null);
  
  if (typeof Symbol === 'function') NativeSymbol = Symbol;
  
  var generateName = (function () {
  	var created = create(null);
  	return function (desc) {
  		var postfix = 0, name, ie11BugWorkaround;
  		while (created[desc + (postfix || '')]) ++postfix;
  		desc += (postfix || '');
  		created[desc] = true;
  		name = '@@' + desc;
  		defineProperty(objPrototype, name, d.gs(null, function (value) {
  			// For IE11 issue see:
  			// https://connect.microsoft.com/IE/feedbackdetail/view/1928508/
  			//    ie11-broken-getters-on-dom-objects
  			// https://github.com/medikoo/es6-symbol/issues/12
  			if (ie11BugWorkaround) return;
  			ie11BugWorkaround = true;
  			defineProperty(this, name, d(value));
  			ie11BugWorkaround = false;
  		}));
  		return name;
  	};
  }());
  
  // Internal constructor (not one exposed) for creating Symbol instances.
  // This one is used to ensure that `someSymbol instanceof Symbol` always return false
  HiddenSymbol = function Symbol(description) {
  	if (this instanceof HiddenSymbol) throw new TypeError('TypeError: Symbol is not a constructor');
  	return SymbolPolyfill(description);
  };
  
  // Exposed `Symbol` constructor
  // (returns instances of HiddenSymbol)
  module.exports = SymbolPolyfill = function Symbol(description) {
  	var symbol;
  	if (this instanceof Symbol) throw new TypeError('TypeError: Symbol is not a constructor');
  	symbol = create(HiddenSymbol.prototype);
  	description = (description === undefined ? '' : String(description));
  	return defineProperties(symbol, {
  		__description__: d('', description),
  		__name__: d('', generateName(description))
  	});
  };
  defineProperties(SymbolPolyfill, {
  	for: d(function (key) {
  		if (globalSymbols[key]) return globalSymbols[key];
  		return (globalSymbols[key] = SymbolPolyfill(String(key)));
  	}),
  	keyFor: d(function (s) {
  		var key;
  		validateSymbol(s);
  		for (key in globalSymbols) if (globalSymbols[key] === s) return key;
  	}),
  
  	// If there's native implementation of given symbol, let's fallback to it
  	// to ensure proper interoperability with other native functions e.g. Array.from
  	hasInstance: d('', (NativeSymbol && NativeSymbol.hasInstance) || SymbolPolyfill('hasInstance')),
  	isConcatSpreadable: d('', (NativeSymbol && NativeSymbol.isConcatSpreadable) ||
  		SymbolPolyfill('isConcatSpreadable')),
  	iterator: d('', (NativeSymbol && NativeSymbol.iterator) || SymbolPolyfill('iterator')),
  	match: d('', (NativeSymbol && NativeSymbol.match) || SymbolPolyfill('match')),
  	replace: d('', (NativeSymbol && NativeSymbol.replace) || SymbolPolyfill('replace')),
  	search: d('', (NativeSymbol && NativeSymbol.search) || SymbolPolyfill('search')),
  	species: d('', (NativeSymbol && NativeSymbol.species) || SymbolPolyfill('species')),
  	split: d('', (NativeSymbol && NativeSymbol.split) || SymbolPolyfill('split')),
  	toPrimitive: d('', (NativeSymbol && NativeSymbol.toPrimitive) || SymbolPolyfill('toPrimitive')),
  	toStringTag: d('', (NativeSymbol && NativeSymbol.toStringTag) || SymbolPolyfill('toStringTag')),
  	unscopables: d('', (NativeSymbol && NativeSymbol.unscopables) || SymbolPolyfill('unscopables'))
  });
  
  // Internal tweaks for real symbol producer
  defineProperties(HiddenSymbol.prototype, {
  	constructor: d(SymbolPolyfill),
  	toString: d('', function () { return this.__name__; })
  });
  
  // Proper implementation of methods exposed on Symbol.prototype
  // They won't be accessible on produced symbol instances as they derive from HiddenSymbol.prototype
  defineProperties(SymbolPolyfill.prototype, {
  	toString: d(function () { return 'Symbol (' + validateSymbol(this).__description__ + ')'; }),
  	valueOf: d(function () { return validateSymbol(this); })
  });
  defineProperty(SymbolPolyfill.prototype, SymbolPolyfill.toPrimitive, d('',
  	function () { return validateSymbol(this); }));
  defineProperty(SymbolPolyfill.prototype, SymbolPolyfill.toStringTag, d('c', 'Symbol'));
  
  // Proper implementaton of toPrimitive and toStringTag for returned symbol instances
  defineProperty(HiddenSymbol.prototype, SymbolPolyfill.toStringTag,
  	d('c', SymbolPolyfill.prototype[SymbolPolyfill.toStringTag]));
  
  // Note: It's important to define `toPrimitive` as last one, as some implementations
  // implement `toPrimitive` natively without implementing `toStringTag` (or other specified symbols)
  // And that may invoke error in definition flow:
  // See: https://github.com/medikoo/es6-symbol/issues/13#issuecomment-164146149
  defineProperty(HiddenSymbol.prototype, SymbolPolyfill.toPrimitive,
  	d('c', SymbolPolyfill.prototype[SymbolPolyfill.toPrimitive]));
  
  
  return module.exports;
}).call(this);
// node_modules/es6-weak-map/node_modules/es6-symbol/index.js
(typeof window === 'undefined' ? global : window).__a28e555072f440f1fc9a2cc87bc6ddb3 = (function () {
  var module = {
    exports: {}
  };
  var exports = module.exports;
  
  'use strict';
  
  module.exports = __3d4f0d4bef6559d399508948fbf17f2a() ? Symbol : __056af215af4152627c7c3bf23574ea54;
  
  
  return module.exports;
}).call(this);
// node_modules/es6-weak-map/node_modules/es6-iterator/index.js
(typeof window === 'undefined' ? global : window).__8256a342509c0511d948e829ca59c15d = (function () {
  var module = {
    exports: {}
  };
  var exports = module.exports;
  
  'use strict';
  
  var clear    = __d9f8de5b3536e3c9f2ad878f0953979f
    , assign   = __f066108f808bda1a350b8841b5a87034
    , callable = __d971ced8db5c2615328c78bcbe5f94c7
    , value    = __5389ea91fb7f4e144c936d87a8520636
    , d        = __515c77a14b9d815d5880f7122dac11d5
    , autoBind = __ba5555711a1c46dac955267c6a732093
    , Symbol   = __a28e555072f440f1fc9a2cc87bc6ddb3
  
    , defineProperty = Object.defineProperty
    , defineProperties = Object.defineProperties
    , Iterator;
  
  module.exports = Iterator = function (list, context) {
  	if (!(this instanceof Iterator)) return new Iterator(list, context);
  	defineProperties(this, {
  		__list__: d('w', value(list)),
  		__context__: d('w', context),
  		__nextIndex__: d('w', 0)
  	});
  	if (!context) return;
  	callable(context.on);
  	context.on('_add', this._onAdd);
  	context.on('_delete', this._onDelete);
  	context.on('_clear', this._onClear);
  };
  
  defineProperties(Iterator.prototype, assign({
  	constructor: d(Iterator),
  	_next: d(function () {
  		var i;
  		if (!this.__list__) return;
  		if (this.__redo__) {
  			i = this.__redo__.shift();
  			if (i !== undefined) return i;
  		}
  		if (this.__nextIndex__ < this.__list__.length) return this.__nextIndex__++;
  		this._unBind();
  	}),
  	next: d(function () { return this._createResult(this._next()); }),
  	_createResult: d(function (i) {
  		if (i === undefined) return { done: true, value: undefined };
  		return { done: false, value: this._resolve(i) };
  	}),
  	_resolve: d(function (i) { return this.__list__[i]; }),
  	_unBind: d(function () {
  		this.__list__ = null;
  		delete this.__redo__;
  		if (!this.__context__) return;
  		this.__context__.off('_add', this._onAdd);
  		this.__context__.off('_delete', this._onDelete);
  		this.__context__.off('_clear', this._onClear);
  		this.__context__ = null;
  	}),
  	toString: d(function () { return '[object Iterator]'; })
  }, autoBind({
  	_onAdd: d(function (index) {
  		if (index >= this.__nextIndex__) return;
  		++this.__nextIndex__;
  		if (!this.__redo__) {
  			defineProperty(this, '__redo__', d('c', [index]));
  			return;
  		}
  		this.__redo__.forEach(function (redo, i) {
  			if (redo >= index) this.__redo__[i] = ++redo;
  		}, this);
  		this.__redo__.push(index);
  	}),
  	_onDelete: d(function (index) {
  		var i;
  		if (index >= this.__nextIndex__) return;
  		--this.__nextIndex__;
  		if (!this.__redo__) return;
  		i = this.__redo__.indexOf(index);
  		if (i !== -1) this.__redo__.splice(i, 1);
  		this.__redo__.forEach(function (redo, i) {
  			if (redo > index) this.__redo__[i] = --redo;
  		}, this);
  	}),
  	_onClear: d(function () {
  		if (this.__redo__) clear.call(this.__redo__);
  		this.__nextIndex__ = 0;
  	})
  })));
  
  defineProperty(Iterator.prototype, Symbol.iterator, d(function () {
  	return this;
  }));
  defineProperty(Iterator.prototype, Symbol.toStringTag, d('', 'Iterator'));
  
  
  return module.exports;
}).call(this);
// node_modules/es6-weak-map/node_modules/es6-iterator/array.js
(typeof window === 'undefined' ? global : window).__47293f69e690bcb5e981b0320906c22e = (function () {
  var module = {
    exports: {}
  };
  var exports = module.exports;
  
  'use strict';
  
  var setPrototypeOf = __cb5157478dc18a1ed241d499bbecdfcd
    , contains       = __afa296783cddde2f69814994784521b9
    , d              = __515c77a14b9d815d5880f7122dac11d5
    , Iterator       = __8256a342509c0511d948e829ca59c15d
  
    , defineProperty = Object.defineProperty
    , ArrayIterator;
  
  ArrayIterator = module.exports = function (arr, kind) {
  	if (!(this instanceof ArrayIterator)) return new ArrayIterator(arr, kind);
  	Iterator.call(this, arr);
  	if (!kind) kind = 'value';
  	else if (contains.call(kind, 'key+value')) kind = 'key+value';
  	else if (contains.call(kind, 'key')) kind = 'key';
  	else kind = 'value';
  	defineProperty(this, '__kind__', d('', kind));
  };
  if (setPrototypeOf) setPrototypeOf(ArrayIterator, Iterator);
  
  ArrayIterator.prototype = Object.create(Iterator.prototype, {
  	constructor: d(ArrayIterator),
  	_resolve: d(function (i) {
  		if (this.__kind__ === 'value') return this.__list__[i];
  		if (this.__kind__ === 'key+value') return [i, this.__list__[i]];
  		return i;
  	}),
  	toString: d(function () { return '[object Array Iterator]'; })
  });
  
  
  return module.exports;
}).call(this);
// node_modules/es6-weak-map/node_modules/es6-iterator/string.js
(typeof window === 'undefined' ? global : window).__843594400d0acc431a43c357c1b41d79 = (function () {
  var module = {
    exports: {}
  };
  var exports = module.exports;
  
  // Thanks @mathiasbynens
  // http://mathiasbynens.be/notes/javascript-unicode#iterating-over-symbols
  
  var setPrototypeOf = __cb5157478dc18a1ed241d499bbecdfcd
    , d              = __515c77a14b9d815d5880f7122dac11d5
    , Iterator       = __8256a342509c0511d948e829ca59c15d
  
    , defineProperty = Object.defineProperty
    , StringIterator;
  
  StringIterator = module.exports = function (str) {
  	if (!(this instanceof StringIterator)) return new StringIterator(str);
  	str = String(str);
  	Iterator.call(this, str);
  	defineProperty(this, '__length__', d('', str.length));
  
  };
  if (setPrototypeOf) setPrototypeOf(StringIterator, Iterator);
  
  StringIterator.prototype = Object.create(Iterator.prototype, {
  	constructor: d(StringIterator),
  	_next: d(function () {
  		if (!this.__list__) return;
  		if (this.__nextIndex__ < this.__length__) return this.__nextIndex__++;
  		this._unBind();
  	}),
  	_resolve: d(function (i) {
  		var char = this.__list__[i], code;
  		if (this.__nextIndex__ === this.__length__) return char;
  		code = char.charCodeAt(0);
  		if ((code >= 0xD800) && (code <= 0xDBFF)) return char + this.__list__[this.__nextIndex__++];
  		return char;
  	}),
  	toString: d(function () { return '[object String Iterator]'; })
  });
  
  
  return module.exports;
}).call(this);
// node_modules/es6-weak-map/node_modules/es6-iterator/is-iterable.js
(typeof window === 'undefined' ? global : window).__344df4794adab420d9ef6881f59415ec = (function () {
  var module = {
    exports: {}
  };
  var exports = module.exports;
  
  'use strict';
  
  var isArguments    = __b84a693ede15fb4409a0366a45e62898
    , isString       = __ea8c8831224a5643e63923314dfe5295
    , iteratorSymbol = __a28e555072f440f1fc9a2cc87bc6ddb3.iterator
  
    , isArray = Array.isArray;
  
  module.exports = function (value) {
  	if (value == null) return false;
  	if (isArray(value)) return true;
  	if (isString(value)) return true;
  	if (isArguments(value)) return true;
  	return (typeof value[iteratorSymbol] === 'function');
  };
  
  
  return module.exports;
}).call(this);
// node_modules/es6-weak-map/node_modules/es6-iterator/valid-iterable.js
(typeof window === 'undefined' ? global : window).__4845e1c873d1eb5cf1c648a6ddffd059 = (function () {
  var module = {
    exports: {}
  };
  var exports = module.exports;
  
  'use strict';
  
  var isIterable = __344df4794adab420d9ef6881f59415ec;
  
  module.exports = function (value) {
  	if (!isIterable(value)) throw new TypeError(value + " is not iterable");
  	return value;
  };
  
  
  return module.exports;
}).call(this);
// node_modules/es6-weak-map/node_modules/es6-iterator/get.js
(typeof window === 'undefined' ? global : window).__2c80d038ed887192c6575293081ef92c = (function () {
  var module = {
    exports: {}
  };
  var exports = module.exports;
  
  'use strict';
  
  var isArguments    = __b84a693ede15fb4409a0366a45e62898
    , isString       = __ea8c8831224a5643e63923314dfe5295
    , ArrayIterator  = __47293f69e690bcb5e981b0320906c22e
    , StringIterator = __843594400d0acc431a43c357c1b41d79
    , iterable       = __4845e1c873d1eb5cf1c648a6ddffd059
    , iteratorSymbol = __a28e555072f440f1fc9a2cc87bc6ddb3.iterator;
  
  module.exports = function (obj) {
  	if (typeof iterable(obj)[iteratorSymbol] === 'function') return obj[iteratorSymbol]();
  	if (isArguments(obj)) return new ArrayIterator(obj);
  	if (isString(obj)) return new StringIterator(obj);
  	return new ArrayIterator(obj);
  };
  
  
  return module.exports;
}).call(this);
// node_modules/es6-weak-map/node_modules/es6-iterator/for-of.js
(typeof window === 'undefined' ? global : window).__ec9ebd94efeab5f7fff08cee904be6d0 = (function () {
  var module = {
    exports: {}
  };
  var exports = module.exports;
  
  'use strict';
  
  var isArguments = __b84a693ede15fb4409a0366a45e62898
    , callable    = __d971ced8db5c2615328c78bcbe5f94c7
    , isString    = __ea8c8831224a5643e63923314dfe5295
    , get         = __2c80d038ed887192c6575293081ef92c
  
    , isArray = Array.isArray, call = Function.prototype.call
    , some = Array.prototype.some;
  
  module.exports = function (iterable, cb/*, thisArg*/) {
  	var mode, thisArg = arguments[2], result, doBreak, broken, i, l, char, code;
  	if (isArray(iterable) || isArguments(iterable)) mode = 'array';
  	else if (isString(iterable)) mode = 'string';
  	else iterable = get(iterable);
  
  	callable(cb);
  	doBreak = function () { broken = true; };
  	if (mode === 'array') {
  		some.call(iterable, function (value) {
  			call.call(cb, thisArg, value, doBreak);
  			if (broken) return true;
  		});
  		return;
  	}
  	if (mode === 'string') {
  		l = iterable.length;
  		for (i = 0; i < l; ++i) {
  			char = iterable[i];
  			if ((i + 1) < l) {
  				code = char.charCodeAt(0);
  				if ((code >= 0xD800) && (code <= 0xDBFF)) char += iterable[++i];
  			}
  			call.call(cb, thisArg, char, doBreak);
  			if (broken) break;
  		}
  		return;
  	}
  	result = iterable.next();
  
  	while (!result.done) {
  		call.call(cb, thisArg, result.value, doBreak);
  		if (broken) return;
  		result = iterable.next();
  	}
  };
  
  
  return module.exports;
}).call(this);
// node_modules/es6-weak-map/is-native-implemented.js
(typeof window === 'undefined' ? global : window).__76b3b3d13bb08dbbec1f37fca5f3bee6 = (function () {
  var module = {
    exports: {}
  };
  var exports = module.exports;
  
  // Exports true if environment provides native `WeakMap` implementation, whatever that is.
  
  module.exports = (function () {
  	if (typeof WeakMap !== 'function') return false;
  	return (Object.prototype.toString.call(new WeakMap()) === '[object WeakMap]');
  }());
  
  
  return module.exports;
}).call(this);
// node_modules/es6-weak-map/polyfill.js
(typeof window === 'undefined' ? global : window).__4be4acaae97fd516d61d0aced02127b6 = (function () {
  var module = {
    exports: {}
  };
  var exports = module.exports;
  
  'use strict';
  
  var setPrototypeOf    = __cb5157478dc18a1ed241d499bbecdfcd
    , object            = __80f68642bf659b6350ce18754283add3
    , value             = __5389ea91fb7f4e144c936d87a8520636
    , randomUniq        = __43561c9251238df7c2c71756cd967ae8
    , d                 = __515c77a14b9d815d5880f7122dac11d5
    , getIterator       = __2c80d038ed887192c6575293081ef92c
    , forOf             = __ec9ebd94efeab5f7fff08cee904be6d0
    , toStringTagSymbol = __a28e555072f440f1fc9a2cc87bc6ddb3.toStringTag
    , isNative          = __76b3b3d13bb08dbbec1f37fca5f3bee6
  
    , isArray = Array.isArray, defineProperty = Object.defineProperty
    , hasOwnProperty = Object.prototype.hasOwnProperty, getPrototypeOf = Object.getPrototypeOf
    , WeakMapPoly;
  
  module.exports = WeakMapPoly = function (/*iterable*/) {
  	var iterable = arguments[0], self;
  	if (!(this instanceof WeakMapPoly)) throw new TypeError('Constructor requires \'new\'');
  	if (isNative && setPrototypeOf && (WeakMap !== WeakMapPoly)) {
  		self = setPrototypeOf(new WeakMap(), getPrototypeOf(this));
  	} else {
  		self = this;
  	}
  	if (iterable != null) {
  		if (!isArray(iterable)) iterable = getIterator(iterable);
  	}
  	defineProperty(self, '__weakMapData__', d('c', '$weakMap$' + randomUniq()));
  	if (!iterable) return self;
  	forOf(iterable, function (val) {
  		value(val);
  		self.set(val[0], val[1]);
  	});
  	return self;
  };
  
  if (isNative) {
  	if (setPrototypeOf) setPrototypeOf(WeakMapPoly, WeakMap);
  	WeakMapPoly.prototype = Object.create(WeakMap.prototype, {
  		constructor: d(WeakMapPoly)
  	});
  }
  
  Object.defineProperties(WeakMapPoly.prototype, {
  	delete: d(function (key) {
  		if (hasOwnProperty.call(object(key), this.__weakMapData__)) {
  			delete key[this.__weakMapData__];
  			return true;
  		}
  		return false;
  	}),
  	get: d(function (key) {
  		if (hasOwnProperty.call(object(key), this.__weakMapData__)) {
  			return key[this.__weakMapData__];
  		}
  	}),
  	has: d(function (key) {
  		return hasOwnProperty.call(object(key), this.__weakMapData__);
  	}),
  	set: d(function (key, value) {
  		defineProperty(object(key), this.__weakMapData__, d('c', value));
  		return this;
  	}),
  	toString: d(function () { return '[object WeakMap]'; })
  });
  defineProperty(WeakMapPoly.prototype, toStringTagSymbol, d('c', 'WeakMap'));
  
  
  return module.exports;
}).call(this);
// node_modules/es6-weak-map/index.js
(typeof window === 'undefined' ? global : window).__a69736b439aceccd81e35c48b1eee091 = (function () {
  var module = {
    exports: {}
  };
  var exports = module.exports;
  
  'use strict';
  
  module.exports = __01ef85c19158aeaa2d1ae789a7d5005c() ? WeakMap : __4be4acaae97fd516d61d0aced02127b6;
  
  
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
  
  function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }
  
  var _es6WeakMap = __a69736b439aceccd81e35c48b1eee091;
  
  var _es6WeakMap2 = _interopRequireDefault(_es6WeakMap);
  
  var map = new _es6WeakMap2['default']();
  
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
    var dstEvents = dst.events;
    var srcEvents = (0, _utilEventMap2['default'])(src);
    var instructions = [];
  
    // Remove any source events that aren't in the source before seeing if we
    // need to add any from the destination.
    if (srcEvents) {
      for (var _name in srcEvents) {
        if (dstEvents[_name] !== srcEvents[_name]) {
          instructions.push({
            data: { name: _name, value: undefined },
            destination: dst,
            source: src,
            type: types.SET_EVENT
          });
        }
      }
    }
  
    // After instructing to remove any old events, we then can instruct to add
    // new events. This prevents the new events from being removed from earlier
    // instructions.
    if (dstEvents) {
      for (var _name2 in dstEvents) {
        var value = dstEvents[_name2];
        if (srcEvents[_name2] !== value) {
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
  
  function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }
  
  var _es6WeakMap = __a69736b439aceccd81e35c48b1eee091;
  
  var _es6WeakMap2 = _interopRequireDefault(_es6WeakMap);
  
  exports['default'] = new _es6WeakMap2['default']();
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
    if (Array.isArray(el)) {
      var _ret = (function () {
        var frag = document.createDocumentFragment();
        el.forEach(function (item) {
          return frag.appendChild(render(item));
        });
        return {
          v: frag
        };
      })();
  
      if (typeof _ret === 'object') return _ret.v;
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
      delete eventHandlers[name];
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
  
  var _dom = __c672b2ab009d1b5af8a22c830a9d5ab6;
  
  var _dom2 = _interopRequireDefault(_dom);
  
  function removeChildNodes(content) {
    while (content.firstChild) {
      var first = content.firstChild;
      first.parentNode.removeChild(first);
    }
  }
  
  exports['default'] = function (elem, tree) {
    var content = elem;
    removeChildNodes(content);
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
  
  var _es6WeakMap = __a69736b439aceccd81e35c48b1eee091;
  
  var _es6WeakMap2 = _interopRequireDefault(_es6WeakMap);
  
  var _vdomElement = __90cd00536bcb3b42d1659021f5337f5f;
  
  var _vdomElement2 = _interopRequireDefault(_vdomElement);
  
  var _merge = __397f1a21725eb3fd4fbf51ee69fe1006;
  
  var _merge2 = _interopRequireDefault(_merge);
  
  var _vdomMount = __64984ff90aff8eb27308803984d99dfd;
  
  var _vdomMount2 = _interopRequireDefault(_vdomMount);
  
  var Node = window.Node;
  
  var oldTreeMap = new _es6WeakMap2['default']();
  
  exports['default'] = function (render) {
    return function (elem) {
      elem = elem instanceof Node ? elem : this;
  
      if (!elem instanceof Node) {
        throw new Error('No node provided to diff renderer as either the first argument or the context.');
      }
  
      // Create a new element to house the new tree since we diff / mount fragments.
      var newTree = (0, _vdomElement2['default'])('div', null, render(elem, { createElement: _vdomElement2['default'] }));
      var oldTree = oldTreeMap.get(elem);
  
      if (oldTree) {
        (0, _merge2['default'])({
          destination: newTree,
          source: oldTree
        });
      } else {
        (0, _vdomMount2['default'])(elem, newTree.childNodes);
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