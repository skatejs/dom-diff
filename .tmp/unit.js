// src/types.js
__0ca807667308490ecea534df3b4369b8 = (function () {
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
  var TEXT_CONTENT = 6;
  exports.TEXT_CONTENT = TEXT_CONTENT;
  
  return module.exports;
}).call(this);
// node_modules/lodash/lang/isObject.js
__d090a5391b68448883c553fd31d2eed1 = (function () {
  var module = {
    exports: {}
  };
  var exports = module.exports;
  
  /**
   * Checks if `value` is the [language type](https://es5.github.io/#x8) of `Object`.
   * (e.g. arrays, functions, objects, regexes, `new Number(0)`, and `new String('')`)
   *
   * @static
   * @memberOf _
   * @category Lang
   * @param {*} value The value to check.
   * @returns {boolean} Returns `true` if `value` is an object, else `false`.
   * @example
   *
   * _.isObject({});
   * // => true
   *
   * _.isObject([1, 2, 3]);
   * // => true
   *
   * _.isObject(1);
   * // => false
   */
  
  function isObject(value) {
    // Avoid a V8 JIT bug in Chrome 19-20.
    // See https://code.google.com/p/v8/issues/detail?id=2291 for more details.
    var type = typeof value;
    return !!value && (type == 'object' || type == 'function');
  }
  
  module.exports = isObject;
  
  return module.exports;
}).call(this);
// node_modules/lodash/lang/isFunction.js
__519f213cf9d0a872f49e7a136e7e120b = (function () {
  var module = {
    exports: {}
  };
  var exports = module.exports;
  
  'use strict';
  
  var isObject = __d090a5391b68448883c553fd31d2eed1;
  
  /** `Object#toString` result references. */
  var funcTag = '[object Function]';
  
  /** Used for native method references. */
  var objectProto = Object.prototype;
  
  /**
   * Used to resolve the [`toStringTag`](http://ecma-international.org/ecma-262/6.0/#sec-object.prototype.tostring)
   * of values.
   */
  var objToString = objectProto.toString;
  
  /**
   * Checks if `value` is classified as a `Function` object.
   *
   * @static
   * @memberOf _
   * @category Lang
   * @param {*} value The value to check.
   * @returns {boolean} Returns `true` if `value` is correctly classified, else `false`.
   * @example
   *
   * _.isFunction(_);
   * // => true
   *
   * _.isFunction(/abc/);
   * // => false
   */
  function isFunction(value) {
    // The use of `Object#toString` avoids issues with the `typeof` operator
    // in older versions of Chrome and Safari which return 'function' for regexes
    // and Safari 8 which returns 'object' for typed array constructors.
    return isObject(value) && objToString.call(value) == funcTag;
  }
  
  module.exports = isFunction;
  
  return module.exports;
}).call(this);
// node_modules/lodash/internal/isObjectLike.js
__da56e4b03597c36fe0d4caa10e88f389 = (function () {
  var module = {
    exports: {}
  };
  var exports = module.exports;
  
  /**
   * Checks if `value` is object-like.
   *
   * @private
   * @param {*} value The value to check.
   * @returns {boolean} Returns `true` if `value` is object-like, else `false`.
   */
  
  function isObjectLike(value) {
    return !!value && typeof value == 'object';
  }
  
  module.exports = isObjectLike;
  
  return module.exports;
}).call(this);
// node_modules/lodash/lang/isNative.js
__3aaa2a29f37013fd67778745f0091d04 = (function () {
  var module = {
    exports: {}
  };
  var exports = module.exports;
  
  'use strict';
  
  var isFunction = __519f213cf9d0a872f49e7a136e7e120b,
      isObjectLike = __da56e4b03597c36fe0d4caa10e88f389;
  
  /** Used to detect host constructors (Safari > 5). */
  var reIsHostCtor = /^\[object .+?Constructor\]$/;
  
  /** Used for native method references. */
  var objectProto = Object.prototype;
  
  /** Used to resolve the decompiled source of functions. */
  var fnToString = Function.prototype.toString;
  
  /** Used to check objects for own properties. */
  var hasOwnProperty = objectProto.hasOwnProperty;
  
  /** Used to detect if a method is native. */
  var reIsNative = RegExp('^' + fnToString.call(hasOwnProperty).replace(/[\\^$.*+?()[\]{}|]/g, '\\$&').replace(/hasOwnProperty|(function).*?(?=\\\()| for .+?(?=\\\])/g, '$1.*?') + '$');
  
  /**
   * Checks if `value` is a native function.
   *
   * @static
   * @memberOf _
   * @category Lang
   * @param {*} value The value to check.
   * @returns {boolean} Returns `true` if `value` is a native function, else `false`.
   * @example
   *
   * _.isNative(Array.prototype.push);
   * // => true
   *
   * _.isNative(_);
   * // => false
   */
  function isNative(value) {
    if (value == null) {
      return false;
    }
    if (isFunction(value)) {
      return reIsNative.test(fnToString.call(value));
    }
    return isObjectLike(value) && reIsHostCtor.test(value);
  }
  
  module.exports = isNative;
  
  return module.exports;
}).call(this);
// node_modules/lodash/internal/getNative.js
__14028a82ad68b5a9ac859f06dade363c = (function () {
  var module = {
    exports: {}
  };
  var exports = module.exports;
  
  'use strict';
  
  var isNative = __3aaa2a29f37013fd67778745f0091d04;
  
  /**
   * Gets the native function at `key` of `object`.
   *
   * @private
   * @param {Object} object The object to query.
   * @param {string} key The key of the method to get.
   * @returns {*} Returns the function if it's native, else `undefined`.
   */
  function getNative(object, key) {
    var value = object == null ? undefined : object[key];
    return isNative(value) ? value : undefined;
  }
  
  module.exports = getNative;
  
  return module.exports;
}).call(this);
// node_modules/lodash/internal/baseProperty.js
__91971f86812a4715464b46467809f075 = (function () {
  var module = {
    exports: {}
  };
  var exports = module.exports;
  
  /**
   * The base implementation of `_.property` without support for deep paths.
   *
   * @private
   * @param {string} key The key of the property to get.
   * @returns {Function} Returns the new function.
   */
  
  function baseProperty(key) {
    return function (object) {
      return object == null ? undefined : object[key];
    };
  }
  
  module.exports = baseProperty;
  
  return module.exports;
}).call(this);
// node_modules/lodash/internal/getLength.js
__b56aac530afc3e35148300bd1bceeeac = (function () {
  var module = {
    exports: {}
  };
  var exports = module.exports;
  
  'use strict';
  
  var baseProperty = __91971f86812a4715464b46467809f075;
  
  /**
   * Gets the "length" property value of `object`.
   *
   * **Note:** This function is used to avoid a [JIT bug](https://bugs.webkit.org/show_bug.cgi?id=142792)
   * that affects Safari on at least iOS 8.1-8.3 ARM64.
   *
   * @private
   * @param {Object} object The object to query.
   * @returns {*} Returns the "length" value.
   */
  var getLength = baseProperty('length');
  
  module.exports = getLength;
  
  return module.exports;
}).call(this);
// node_modules/lodash/internal/isLength.js
__1da05cc76c1107ac2eb0c2539439024e = (function () {
  var module = {
    exports: {}
  };
  var exports = module.exports;
  
  /**
   * Used as the [maximum length](http://ecma-international.org/ecma-262/6.0/#sec-number.max_safe_integer)
   * of an array-like value.
   */
  
  var MAX_SAFE_INTEGER = 9007199254740991;
  
  /**
   * Checks if `value` is a valid array-like length.
   *
   * **Note:** This function is based on [`ToLength`](http://ecma-international.org/ecma-262/6.0/#sec-tolength).
   *
   * @private
   * @param {*} value The value to check.
   * @returns {boolean} Returns `true` if `value` is a valid length, else `false`.
   */
  function isLength(value) {
    return typeof value == 'number' && value > -1 && value % 1 == 0 && value <= MAX_SAFE_INTEGER;
  }
  
  module.exports = isLength;
  
  return module.exports;
}).call(this);
// node_modules/lodash/internal/isArrayLike.js
__6c39cae38e01b1fafa042d873d07c352 = (function () {
  var module = {
    exports: {}
  };
  var exports = module.exports;
  
  'use strict';
  
  var getLength = __b56aac530afc3e35148300bd1bceeeac,
      isLength = __1da05cc76c1107ac2eb0c2539439024e;
  
  /**
   * Checks if `value` is array-like.
   *
   * @private
   * @param {*} value The value to check.
   * @returns {boolean} Returns `true` if `value` is array-like, else `false`.
   */
  function isArrayLike(value) {
    return value != null && isLength(getLength(value));
  }
  
  module.exports = isArrayLike;
  
  return module.exports;
}).call(this);
// node_modules/lodash/lang/isArguments.js
__682bbd774109234b665c8e2940ccc277 = (function () {
  var module = {
    exports: {}
  };
  var exports = module.exports;
  
  'use strict';
  
  var isArrayLike = __6c39cae38e01b1fafa042d873d07c352,
      isObjectLike = __da56e4b03597c36fe0d4caa10e88f389;
  
  /** Used for native method references. */
  var objectProto = Object.prototype;
  
  /** Used to check objects for own properties. */
  var hasOwnProperty = objectProto.hasOwnProperty;
  
  /** Native method references. */
  var propertyIsEnumerable = objectProto.propertyIsEnumerable;
  
  /**
   * Checks if `value` is classified as an `arguments` object.
   *
   * @static
   * @memberOf _
   * @category Lang
   * @param {*} value The value to check.
   * @returns {boolean} Returns `true` if `value` is correctly classified, else `false`.
   * @example
   *
   * _.isArguments(function() { return arguments; }());
   * // => true
   *
   * _.isArguments([1, 2, 3]);
   * // => false
   */
  function isArguments(value) {
      return isObjectLike(value) && isArrayLike(value) && hasOwnProperty.call(value, 'callee') && !propertyIsEnumerable.call(value, 'callee');
  }
  
  module.exports = isArguments;
  
  return module.exports;
}).call(this);
// node_modules/lodash/lang/isArray.js
__9efce1efdbad971f8c6281cbd2e9dd68 = (function () {
  var module = {
    exports: {}
  };
  var exports = module.exports;
  
  'use strict';
  
  var getNative = __14028a82ad68b5a9ac859f06dade363c,
      isLength = __1da05cc76c1107ac2eb0c2539439024e,
      isObjectLike = __da56e4b03597c36fe0d4caa10e88f389;
  
  /** `Object#toString` result references. */
  var arrayTag = '[object Array]';
  
  /** Used for native method references. */
  var objectProto = Object.prototype;
  
  /**
   * Used to resolve the [`toStringTag`](http://ecma-international.org/ecma-262/6.0/#sec-object.prototype.tostring)
   * of values.
   */
  var objToString = objectProto.toString;
  
  /* Native method references for those with the same name as other `lodash` methods. */
  var nativeIsArray = getNative(Array, 'isArray');
  
  /**
   * Checks if `value` is classified as an `Array` object.
   *
   * @static
   * @memberOf _
   * @category Lang
   * @param {*} value The value to check.
   * @returns {boolean} Returns `true` if `value` is correctly classified, else `false`.
   * @example
   *
   * _.isArray([1, 2, 3]);
   * // => true
   *
   * _.isArray(function() { return arguments; }());
   * // => false
   */
  var isArray = nativeIsArray || function (value) {
    return isObjectLike(value) && isLength(value.length) && objToString.call(value) == arrayTag;
  };
  
  module.exports = isArray;
  
  return module.exports;
}).call(this);
// node_modules/lodash/internal/isIndex.js
__6c18b20dde1aff73d15d122ec97ee1cc = (function () {
  var module = {
    exports: {}
  };
  var exports = module.exports;
  
  /** Used to detect unsigned integer values. */
  
  var reIsUint = /^\d+$/;
  
  /**
   * Used as the [maximum length](http://ecma-international.org/ecma-262/6.0/#sec-number.max_safe_integer)
   * of an array-like value.
   */
  var MAX_SAFE_INTEGER = 9007199254740991;
  
  /**
   * Checks if `value` is a valid array-like index.
   *
   * @private
   * @param {*} value The value to check.
   * @param {number} [length=MAX_SAFE_INTEGER] The upper bounds of a valid index.
   * @returns {boolean} Returns `true` if `value` is a valid index, else `false`.
   */
  function isIndex(value, length) {
    value = typeof value == 'number' || reIsUint.test(value) ? +value : -1;
    length = length == null ? MAX_SAFE_INTEGER : length;
    return value > -1 && value % 1 == 0 && value < length;
  }
  
  module.exports = isIndex;
  
  return module.exports;
}).call(this);
// node_modules/lodash/object/keysIn.js
__e4daadeb98f93522d9689667d66a87a2 = (function () {
  var module = {
    exports: {}
  };
  var exports = module.exports;
  
  'use strict';
  
  var isArguments = __682bbd774109234b665c8e2940ccc277,
      isArray = __9efce1efdbad971f8c6281cbd2e9dd68,
      isIndex = __6c18b20dde1aff73d15d122ec97ee1cc,
      isLength = __1da05cc76c1107ac2eb0c2539439024e,
      isObject = __d090a5391b68448883c553fd31d2eed1;
  
  /** Used for native method references. */
  var objectProto = Object.prototype;
  
  /** Used to check objects for own properties. */
  var hasOwnProperty = objectProto.hasOwnProperty;
  
  /**
   * Creates an array of the own and inherited enumerable property names of `object`.
   *
   * **Note:** Non-object values are coerced to objects.
   *
   * @static
   * @memberOf _
   * @category Object
   * @param {Object} object The object to query.
   * @returns {Array} Returns the array of property names.
   * @example
   *
   * function Foo() {
   *   this.a = 1;
   *   this.b = 2;
   * }
   *
   * Foo.prototype.c = 3;
   *
   * _.keysIn(new Foo);
   * // => ['a', 'b', 'c'] (iteration order is not guaranteed)
   */
  function keysIn(object) {
    if (object == null) {
      return [];
    }
    if (!isObject(object)) {
      object = Object(object);
    }
    var length = object.length;
    length = length && isLength(length) && (isArray(object) || isArguments(object)) && length || 0;
  
    var Ctor = object.constructor,
        index = -1,
        isProto = typeof Ctor == 'function' && Ctor.prototype === object,
        result = Array(length),
        skipIndexes = length > 0;
  
    while (++index < length) {
      result[index] = index + '';
    }
    for (var key in object) {
      if (!(skipIndexes && isIndex(key, length)) && !(key == 'constructor' && (isProto || !hasOwnProperty.call(object, key)))) {
        result.push(key);
      }
    }
    return result;
  }
  
  module.exports = keysIn;
  
  return module.exports;
}).call(this);
// node_modules/lodash/internal/shimKeys.js
__705a73cd49757d79277922ac6959adcc = (function () {
  var module = {
    exports: {}
  };
  var exports = module.exports;
  
  'use strict';
  
  var isArguments = __682bbd774109234b665c8e2940ccc277,
      isArray = __9efce1efdbad971f8c6281cbd2e9dd68,
      isIndex = __6c18b20dde1aff73d15d122ec97ee1cc,
      isLength = __1da05cc76c1107ac2eb0c2539439024e,
      keysIn = __e4daadeb98f93522d9689667d66a87a2;
  
  /** Used for native method references. */
  var objectProto = Object.prototype;
  
  /** Used to check objects for own properties. */
  var hasOwnProperty = objectProto.hasOwnProperty;
  
  /**
   * A fallback implementation of `Object.keys` which creates an array of the
   * own enumerable property names of `object`.
   *
   * @private
   * @param {Object} object The object to query.
   * @returns {Array} Returns the array of property names.
   */
  function shimKeys(object) {
    var props = keysIn(object),
        propsLength = props.length,
        length = propsLength && object.length;
  
    var allowIndexes = !!length && isLength(length) && (isArray(object) || isArguments(object));
  
    var index = -1,
        result = [];
  
    while (++index < propsLength) {
      var key = props[index];
      if (allowIndexes && isIndex(key, length) || hasOwnProperty.call(object, key)) {
        result.push(key);
      }
    }
    return result;
  }
  
  module.exports = shimKeys;
  
  return module.exports;
}).call(this);
// node_modules/lodash/object/keys.js
__97286f444f6ad80ab2a6598e06c63841 = (function () {
  var module = {
    exports: {}
  };
  var exports = module.exports;
  
  'use strict';
  
  var getNative = __14028a82ad68b5a9ac859f06dade363c,
      isArrayLike = __6c39cae38e01b1fafa042d873d07c352,
      isObject = __d090a5391b68448883c553fd31d2eed1,
      shimKeys = __705a73cd49757d79277922ac6959adcc;
  
  /* Native method references for those with the same name as other `lodash` methods. */
  var nativeKeys = getNative(Object, 'keys');
  
  /**
   * Creates an array of the own enumerable property names of `object`.
   *
   * **Note:** Non-object values are coerced to objects. See the
   * [ES spec](http://ecma-international.org/ecma-262/6.0/#sec-object.keys)
   * for more details.
   *
   * @static
   * @memberOf _
   * @category Object
   * @param {Object} object The object to query.
   * @returns {Array} Returns the array of property names.
   * @example
   *
   * function Foo() {
   *   this.a = 1;
   *   this.b = 2;
   * }
   *
   * Foo.prototype.c = 3;
   *
   * _.keys(new Foo);
   * // => ['a', 'b'] (iteration order is not guaranteed)
   *
   * _.keys('hi');
   * // => ['0', '1']
   */
  var keys = !nativeKeys ? shimKeys : function (object) {
    var Ctor = object == null ? undefined : object.constructor;
    if (typeof Ctor == 'function' && Ctor.prototype === object || typeof object != 'function' && isArrayLike(object)) {
      return shimKeys(object);
    }
    return isObject(object) ? nativeKeys(object) : [];
  };
  
  module.exports = keys;
  
  return module.exports;
}).call(this);
// node_modules/lodash/internal/assignWith.js
__72a66ffb401836dc5bb915c75e4b220a = (function () {
  var module = {
    exports: {}
  };
  var exports = module.exports;
  
  'use strict';
  
  var keys = __97286f444f6ad80ab2a6598e06c63841;
  
  /**
   * A specialized version of `_.assign` for customizing assigned values without
   * support for argument juggling, multiple sources, and `this` binding `customizer`
   * functions.
   *
   * @private
   * @param {Object} object The destination object.
   * @param {Object} source The source object.
   * @param {Function} customizer The function to customize assigned values.
   * @returns {Object} Returns `object`.
   */
  function assignWith(object, source, customizer) {
    var index = -1,
        props = keys(source),
        length = props.length;
  
    while (++index < length) {
      var key = props[index],
          value = object[key],
          result = customizer(value, source[key], key, object, source);
  
      if ((result === result ? result !== value : value === value) || value === undefined && !(key in object)) {
        object[key] = result;
      }
    }
    return object;
  }
  
  module.exports = assignWith;
  
  return module.exports;
}).call(this);
// node_modules/lodash/internal/baseCopy.js
__1d232492f7d7270978b2d9ff7b92da19 = (function () {
  var module = {
    exports: {}
  };
  var exports = module.exports;
  
  /**
   * Copies properties of `source` to `object`.
   *
   * @private
   * @param {Object} source The object to copy properties from.
   * @param {Array} props The property names to copy.
   * @param {Object} [object={}] The object to copy properties to.
   * @returns {Object} Returns `object`.
   */
  
  function baseCopy(source, props, object) {
    object || (object = {});
  
    var index = -1,
        length = props.length;
  
    while (++index < length) {
      var key = props[index];
      object[key] = source[key];
    }
    return object;
  }
  
  module.exports = baseCopy;
  
  return module.exports;
}).call(this);
// node_modules/lodash/internal/baseAssign.js
__00863adb38fee3e6cecf4e9681205cc0 = (function () {
  var module = {
    exports: {}
  };
  var exports = module.exports;
  
  'use strict';
  
  var baseCopy = __1d232492f7d7270978b2d9ff7b92da19,
      keys = __97286f444f6ad80ab2a6598e06c63841;
  
  /**
   * The base implementation of `_.assign` without support for argument juggling,
   * multiple sources, and `customizer` functions.
   *
   * @private
   * @param {Object} object The destination object.
   * @param {Object} source The source object.
   * @returns {Object} Returns `object`.
   */
  function baseAssign(object, source) {
      return source == null ? object : baseCopy(source, keys(source), object);
  }
  
  module.exports = baseAssign;
  
  return module.exports;
}).call(this);
// node_modules/lodash/utility/identity.js
__463b6229e4a1040a96a11ff85d06378d = (function () {
  var module = {
    exports: {}
  };
  var exports = module.exports;
  
  /**
   * This method returns the first argument provided to it.
   *
   * @static
   * @memberOf _
   * @category Utility
   * @param {*} value Any value.
   * @returns {*} Returns `value`.
   * @example
   *
   * var object = { 'user': 'fred' };
   *
   * _.identity(object) === object;
   * // => true
   */
  
  function identity(value) {
    return value;
  }
  
  module.exports = identity;
  
  return module.exports;
}).call(this);
// node_modules/lodash/internal/bindCallback.js
__47a732ea2bcf20acef137635018e6308 = (function () {
  var module = {
    exports: {}
  };
  var exports = module.exports;
  
  'use strict';
  
  var identity = __463b6229e4a1040a96a11ff85d06378d;
  
  /**
   * A specialized version of `baseCallback` which only supports `this` binding
   * and specifying the number of arguments to provide to `func`.
   *
   * @private
   * @param {Function} func The function to bind.
   * @param {*} thisArg The `this` binding of `func`.
   * @param {number} [argCount] The number of arguments to provide to `func`.
   * @returns {Function} Returns the callback.
   */
  function bindCallback(func, thisArg, argCount) {
    if (typeof func != 'function') {
      return identity;
    }
    if (thisArg === undefined) {
      return func;
    }
    switch (argCount) {
      case 1:
        return function (value) {
          return func.call(thisArg, value);
        };
      case 3:
        return function (value, index, collection) {
          return func.call(thisArg, value, index, collection);
        };
      case 4:
        return function (accumulator, value, index, collection) {
          return func.call(thisArg, accumulator, value, index, collection);
        };
      case 5:
        return function (value, other, key, object, source) {
          return func.call(thisArg, value, other, key, object, source);
        };
    }
    return function () {
      return func.apply(thisArg, arguments);
    };
  }
  
  module.exports = bindCallback;
  
  return module.exports;
}).call(this);
// node_modules/lodash/internal/isIterateeCall.js
__1fa6eb753b2f2b24c4bd14485a9e9b8f = (function () {
  var module = {
    exports: {}
  };
  var exports = module.exports;
  
  'use strict';
  
  var isArrayLike = __6c39cae38e01b1fafa042d873d07c352,
      isIndex = __6c18b20dde1aff73d15d122ec97ee1cc,
      isObject = __d090a5391b68448883c553fd31d2eed1;
  
  /**
   * Checks if the provided arguments are from an iteratee call.
   *
   * @private
   * @param {*} value The potential iteratee value argument.
   * @param {*} index The potential iteratee index or key argument.
   * @param {*} object The potential iteratee object argument.
   * @returns {boolean} Returns `true` if the arguments are from an iteratee call, else `false`.
   */
  function isIterateeCall(value, index, object) {
    if (!isObject(object)) {
      return false;
    }
    var type = typeof index;
    if (type == 'number' ? isArrayLike(object) && isIndex(index, object.length) : type == 'string' && index in object) {
      var other = object[index];
      return value === value ? value === other : other !== other;
    }
    return false;
  }
  
  module.exports = isIterateeCall;
  
  return module.exports;
}).call(this);
// node_modules/lodash/function/restParam.js
__0d5e12b83bfbc7a7086effb638f2bccb = (function () {
  var module = {
    exports: {}
  };
  var exports = module.exports;
  
  /** Used as the `TypeError` message for "Functions" methods. */
  
  var FUNC_ERROR_TEXT = 'Expected a function';
  
  /* Native method references for those with the same name as other `lodash` methods. */
  var nativeMax = Math.max;
  
  /**
   * Creates a function that invokes `func` with the `this` binding of the
   * created function and arguments from `start` and beyond provided as an array.
   *
   * **Note:** This method is based on the [rest parameter](https://developer.mozilla.org/Web/JavaScript/Reference/Functions/rest_parameters).
   *
   * @static
   * @memberOf _
   * @category Function
   * @param {Function} func The function to apply a rest parameter to.
   * @param {number} [start=func.length-1] The start position of the rest parameter.
   * @returns {Function} Returns the new function.
   * @example
   *
   * var say = _.restParam(function(what, names) {
   *   return what + ' ' + _.initial(names).join(', ') +
   *     (_.size(names) > 1 ? ', & ' : '') + _.last(names);
   * });
   *
   * say('hello', 'fred', 'barney', 'pebbles');
   * // => 'hello fred, barney, & pebbles'
   */
  function restParam(func, start) {
    if (typeof func != 'function') {
      throw new TypeError(FUNC_ERROR_TEXT);
    }
    start = nativeMax(start === undefined ? func.length - 1 : +start || 0, 0);
    return function () {
      var args = arguments,
          index = -1,
          length = nativeMax(args.length - start, 0),
          rest = Array(length);
  
      while (++index < length) {
        rest[index] = args[start + index];
      }
      switch (start) {
        case 0:
          return func.call(this, rest);
        case 1:
          return func.call(this, args[0], rest);
        case 2:
          return func.call(this, args[0], args[1], rest);
      }
      var otherArgs = Array(start + 1);
      index = -1;
      while (++index < start) {
        otherArgs[index] = args[index];
      }
      otherArgs[start] = rest;
      return func.apply(this, otherArgs);
    };
  }
  
  module.exports = restParam;
  
  return module.exports;
}).call(this);
// node_modules/lodash/internal/createAssigner.js
__968682ca547de6f4a9a9b20fae17ede9 = (function () {
  var module = {
    exports: {}
  };
  var exports = module.exports;
  
  'use strict';
  
  var bindCallback = __47a732ea2bcf20acef137635018e6308,
      isIterateeCall = __1fa6eb753b2f2b24c4bd14485a9e9b8f,
      restParam = __0d5e12b83bfbc7a7086effb638f2bccb;
  
  /**
   * Creates a `_.assign`, `_.defaults`, or `_.merge` function.
   *
   * @private
   * @param {Function} assigner The function to assign values.
   * @returns {Function} Returns the new assigner function.
   */
  function createAssigner(assigner) {
    return restParam(function (object, sources) {
      var index = -1,
          length = object == null ? 0 : sources.length,
          customizer = length > 2 ? sources[length - 2] : undefined,
          guard = length > 2 ? sources[2] : undefined,
          thisArg = length > 1 ? sources[length - 1] : undefined;
  
      if (typeof customizer == 'function') {
        customizer = bindCallback(customizer, thisArg, 5);
        length -= 2;
      } else {
        customizer = typeof thisArg == 'function' ? thisArg : undefined;
        length -= customizer ? 1 : 0;
      }
      if (guard && isIterateeCall(sources[0], sources[1], guard)) {
        customizer = length < 3 ? undefined : customizer;
        length = 1;
      }
      while (++index < length) {
        var source = sources[index];
        if (source) {
          assigner(object, source, customizer);
        }
      }
      return object;
    });
  }
  
  module.exports = createAssigner;
  
  return module.exports;
}).call(this);
// node_modules/lodash/object/assign.js
__00454a526be169c249acfe9f6e666c5d = (function () {
  var module = {
    exports: {}
  };
  var exports = module.exports;
  
  'use strict';
  
  var assignWith = __72a66ffb401836dc5bb915c75e4b220a,
      baseAssign = __00863adb38fee3e6cecf4e9681205cc0,
      createAssigner = __968682ca547de6f4a9a9b20fae17ede9;
  
  /**
   * Assigns own enumerable properties of source object(s) to the destination
   * object. Subsequent sources overwrite property assignments of previous sources.
   * If `customizer` is provided it's invoked to produce the assigned values.
   * The `customizer` is bound to `thisArg` and invoked with five arguments:
   * (objectValue, sourceValue, key, object, source).
   *
   * **Note:** This method mutates `object` and is based on
   * [`Object.assign`](http://ecma-international.org/ecma-262/6.0/#sec-object.assign).
   *
   * @static
   * @memberOf _
   * @alias extend
   * @category Object
   * @param {Object} object The destination object.
   * @param {...Object} [sources] The source objects.
   * @param {Function} [customizer] The function to customize assigned values.
   * @param {*} [thisArg] The `this` binding of `customizer`.
   * @returns {Object} Returns `object`.
   * @example
   *
   * _.assign({ 'user': 'barney' }, { 'age': 40 }, { 'user': 'fred' });
   * // => { 'user': 'fred', 'age': 40 }
   *
   * // using a customizer callback
   * var defaults = _.partialRight(_.assign, function(value, other) {
   *   return _.isUndefined(value) ? other : value;
   * });
   *
   * defaults({ 'user': 'barney' }, { 'age': 36 }, { 'user': 'fred' });
   * // => { 'user': 'barney', 'age': 36 }
   */
  var assign = createAssigner(function (object, source, customizer) {
      return customizer ? assignWith(object, source, customizer) : baseAssign(object, source);
  });
  
  module.exports = assign;
  
  return module.exports;
}).call(this);
// src/compare/attributes.js
__bad2e851182eb57480d47d0d1303f9cd = (function () {
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
    var srcAttrs = src.attributes;
    var dstAttrs = dst.attributes;
    var srcAttrsLen = (srcAttrs || 0) && srcAttrs.length;
    var dstAttrsLen = (dstAttrs || 0) && dstAttrs.length;
    var instructions = [];
  
    // Merge attributes that exist in source with destination's.
    for (var a = 0; a < srcAttrsLen; a++) {
      var srcAttr = srcAttrs[a];
      var dstAttr = dstAttrs[srcAttr.name];
  
      if (!dstAttr) {
        instructions.push({
          data: { name: srcAttr.name },
          destination: dst,
          source: src,
          type: types.REMOVE_ATTRIBUTE
        });
      } else if (srcAttr.value !== dstAttr.value) {
        instructions.push({
          data: { name: srcAttr.name },
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
      var srcAttr = srcAttrs[dstAttr.name];
  
      if (!srcAttr) {
        instructions.push({
          data: { name: dstAttr.name },
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
// src/compare/element.js
__8a4ddda1ca8be7b0c056814a3966d1ca = (function () {
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
  
  exports['default'] = function (src, dst) {
    if (src.tagName === dst.tagName) {
      return (0, _attributes2['default'])(src, dst);
    }
  };
  
  module.exports = exports['default'];
  
  return module.exports;
}).call(this);
// src/compare/text.js
__6be3dfb2c966cc1cf98fbc28ab388768 = (function () {
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
    if (src.textContent !== dst.textContent) {
      return [{
        destination: dst,
        source: src,
        type: types.TEXT_CONTENT
      }];
    }
  };
  
  module.exports = exports['default'];
  
  return module.exports;
}).call(this);
// src/compare/comment.js
__b61b794da4779d6fe0fb5684b9f98c70 = (function () {
  var module = {
    exports: {}
  };
  var exports = module.exports;
  
  "use strict";
  
  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  
  exports["default"] = function (src, dst) {};
  
  module.exports = exports["default"];
  
  return module.exports;
}).call(this);
// src/compare/node.js
__d1a542bf52dea3e669dda0475c050479 = (function () {
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
        srcType = undefined,
        ret = undefined;
  
    if (!dst || !src) {
      return;
    }
  
    dstType = dst.nodeType;
    srcType = src.nodeType;
  
    if (dstType !== srcType) {
      return;
    } else if (dstType === NODE_ELEMENT) {
      ret = (0, _element2['default'])(src, dst);
    } else if (dstType === NODE_TEXT) {
      ret = (0, _text2['default'])(src, dst);
    } else if (dstType === NODE_COMMENT) {
      ret = (0, _comment2['default'])(src, dst);
    }
  
    return ret;
  };
  
  module.exports = exports['default'];
  
  return module.exports;
}).call(this);
// src/diff.js
__22dce1b31df73fb8f06bda10d9498f07 = (function () {
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
  
  var _lodashObjectAssign = __00454a526be169c249acfe9f6e666c5d;
  
  var _lodashObjectAssign2 = _interopRequireDefault(_lodashObjectAssign);
  
  var _compareNode = __d1a542bf52dea3e669dda0475c050479;
  
  var _compareNode2 = _interopRequireDefault(_compareNode);
  
  function diff(opts) {
    if (opts.descend === undefined) {
      opts.descend = function () {
        return true;
      };
    }
  
    var src = opts.source;
    var dst = opts.destination;
    var instructions = [];
  
    if (!src || !dst) {
      return [];
    }
  
    var srcChs = src.childNodes;
    var dstChs = dst.childNodes;
    var srcChsLen = srcChs.length;
    var dstChsLen = dstChs.length;
  
    for (var a = 0; a < dstChsLen; a++) {
      var curSrc = srcChs[a];
      var curDst = dstChs[a];
      var nodeInstructions = (0, _compareNode2['default'])(curSrc, curDst);
  
      // If there is no matching destination node it means we need to remove the
      // current source node from the source.
      if (!curSrc) {
        instructions.push({
          destination: dstChs[a],
          source: src,
          type: types.APPEND_CHILD
        });
        continue;
      }
  
      // If there are instructions (even an empty array) it means the node can be
      // diffed and doesn't have to be replaced. If the instructions are falsy
      // it means that the nodes are not similar (cannot be changed) and must be
      // replaced instead.
      if (nodeInstructions) {
        instructions = instructions.concat(nodeInstructions);
        if (opts.descend(curSrc, curDst)) {
          instructions = instructions.concat(diff((0, _lodashObjectAssign2['default'])(opts, {
            destination: curDst,
            source: curSrc
          })));
        }
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
// src/patch/append-child.js
__3ed6aa44bf4d6b9365bed745b80029cf = (function () {
  var module = {
    exports: {}
  };
  var exports = module.exports;
  
  "use strict";
  
  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  
  exports["default"] = function (src, dst) {
    src.appendChild(dst);
  };
  
  module.exports = exports["default"];
  
  return module.exports;
}).call(this);
// src/patch/remove-attribute.js
__9bbe6d2e49edcd9d91aac0c352f01bb0 = (function () {
  var module = {
    exports: {}
  };
  var exports = module.exports;
  
  "use strict";
  
  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  
  exports["default"] = function (src, dst, data) {
    src.removeAttribute(data.name);
  };
  
  module.exports = exports["default"];
  
  return module.exports;
}).call(this);
// src/patch/remove-child.js
__b306d2b34b0fbb399cbb13b5dc7dd96a = (function () {
  var module = {
    exports: {}
  };
  var exports = module.exports;
  
  "use strict";
  
  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  
  exports["default"] = function (src, dst) {
    src.removeChild(dst);
  };
  
  module.exports = exports["default"];
  
  return module.exports;
}).call(this);
// src/patch/replace-child.js
__36e2ac600d355b297d4888bed8e557b1 = (function () {
  var module = {
    exports: {}
  };
  var exports = module.exports;
  
  "use strict";
  
  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  
  exports["default"] = function (src, dst) {
    src.parentNode.replaceChild(dst, src);
  };
  
  module.exports = exports["default"];
  
  return module.exports;
}).call(this);
// src/patch/set-attribute.js
__3a0f75dfacfe0f1a25269b7ec38195ba = (function () {
  var module = {
    exports: {}
  };
  var exports = module.exports;
  
  "use strict";
  
  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  
  exports["default"] = function (src, dst, data) {
    src.setAttribute(data.name, dst.getAttribute(data.name));
  };
  
  module.exports = exports["default"];
  
  return module.exports;
}).call(this);
// src/patch/text-content.js
__2ecd35541218022de8f33fe72ae13c79 = (function () {
  var module = {
    exports: {}
  };
  var exports = module.exports;
  
  "use strict";
  
  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  
  exports["default"] = function (src, dst) {
    src.textContent = dst.textContent;
  };
  
  module.exports = exports["default"];
  
  return module.exports;
}).call(this);
// src/patch.js
__d49832510105705a679155ef252b6786 = (function () {
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
  
  var _patchTextContent = __2ecd35541218022de8f33fe72ae13c79;
  
  var _patchTextContent2 = _interopRequireDefault(_patchTextContent);
  
  var patchers = {};
  patchers[types.APPEND_CHILD] = _patchAppendChild2['default'];
  patchers[types.REMOVE_ATTRIBUTE] = _patchRemoveAttribute2['default'];
  patchers[types.REMOVE_CHILD] = _patchRemoveChild2['default'];
  patchers[types.REPLACE_CHILD] = _patchReplaceChild2['default'];
  patchers[types.SET_ATTRIBUTE] = _patchSetAttribute2['default'];
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
__397f1a21725eb3fd4fbf51ee69fe1006 = (function () {
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
    (0, _patch2['default'])((0, _diff2['default'])(opts));
    return opts.source;
  };
  
  module.exports = exports['default'];
  
  return module.exports;
}).call(this);
// src/index.js
__d0534c9e7312e01df51511bab04ed9e4 = (function () {
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
  
  var _types = __0ca807667308490ecea534df3b4369b8;
  
  var _types2 = _interopRequireDefault(_types);
  
  exports['default'] = {
    diff: _diff2['default'],
    merge: _merge2['default'],
    patch: _patch2['default'],
    types: _types2['default']
  };
  module.exports = exports['default'];
  
  return module.exports;
}).call(this);
// test/unit.js
__e67241f81b0a4696dfa0260703be614f = (function () {
  var module = {
    exports: {}
  };
  var exports = module.exports;
  
  'use strict';
  
  function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }
  
  function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj['default'] = obj; return newObj; } }
  
  var _srcTypes = __0ca807667308490ecea534df3b4369b8;
  
  var types = _interopRequireWildcard(_srcTypes);
  
  var _srcIndex = __d0534c9e7312e01df51511bab04ed9e4;
  
  var _srcIndex2 = _interopRequireDefault(_srcIndex);
  
  function elem(name, html) {
    var el = document.createElement(name);
    el.innerHTML = html;
    return el;
  }
  
  var div = elem.bind(null, 'div');
  
  describe('diff', function () {
    it('instructions array', function () {
      var diffed = _srcIndex2['default'].diff({
        destination: div(),
        source: div()
      });
      assert.ok(Array.isArray(diffed));
    });
  
    it('instruction object', function () {
      var src = div('<span></span>');
      var dst = div('<a></a>');
      var instructions = _srcIndex2['default'].diff({
        destination: dst,
        source: src
      });
      assert.equal(instructions.length, 1, 'instruction length');
      assert.equal(instructions[0].destination.tagName, 'A', 'destination tagName');
      assert.equal(instructions[0].source.tagName, 'SPAN', 'source tagName');
      assert.equal(instructions[0].type, types.REPLACE_CHILD, 'type');
    });
  
    describe('descend', function () {
      it('on by default', function () {
        var src = div('<div stop><span></span></div>');
        var dst = div('<div stop><a></a></div>');
        var oldDiv = src.childNodes[0];
        var newA = dst.childNodes[0].childNodes[0];
        _srcIndex2['default'].merge({
          destination: dst,
          source: src
        });
        assert.equal(src.childNodes[0], oldDiv);
        assert.equal(src.childNodes[0].childNodes[0], newA);
      });
  
      it('user bypass', function () {
        var src = div('<div stop><span></span></div>');
        var dst = div('<div stop><a></a></div>');
        var oldDiv = src.childNodes[0];
        var oldSpan = oldDiv.childNodes[0];
        _srcIndex2['default'].merge({
          descend: function descend(src) {
            return !src.hasAttribute('stop');
          },
          destination: dst,
          source: src
        });
        assert.equal(src.childNodes[0], oldDiv);
        assert.equal(src.childNodes[0].childNodes[0], oldSpan);
      });
    });
  });
  
  describe('patch', function () {
    it('host should not change', function () {
      var src = div('<span></span>');
      var dst = div('<a></a>');
      var instructions = _srcIndex2['default'].diff({
        destination: dst,
        source: src
      });
      _srcIndex2['default'].patch(instructions);
      assert.equal(src.tagName, 'DIV');
    });
  
    it('same elements should not change', function () {
      var src = div('<span></span>');
      var dst = div('<span></span><a></a>');
      var instructions = _srcIndex2['default'].diff({
        destination: dst,
        source: src
      });
      var srcSpan = src.childNodes[0];
      _srcIndex2['default'].patch(instructions);
      assert.equal(src.childNodes[0], srcSpan);
    });
  
    it('only compares items at the same index', function () {
      var src = div('<span></span>');
      var dst = div('<a></a><span></span>');
      var instructions = _srcIndex2['default'].diff({
        destination: dst,
        source: src
      });
      var srcSpan = src.childNodes[0];
      _srcIndex2['default'].patch(instructions);
      assert.notEqual(src.childNodes[0], srcSpan);
      assert.notEqual(src.childNodes[1], srcSpan);
    });
  });
  
  return module.exports;
}).call(this);