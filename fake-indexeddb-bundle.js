window["FakeIndexedDB"] =
/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 141);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

var global    = __webpack_require__(2)
  , core      = __webpack_require__(14)
  , hide      = __webpack_require__(15)
  , redefine  = __webpack_require__(16)
  , ctx       = __webpack_require__(24)
  , PROTOTYPE = 'prototype';

var $export = function(type, name, source){
  var IS_FORCED = type & $export.F
    , IS_GLOBAL = type & $export.G
    , IS_STATIC = type & $export.S
    , IS_PROTO  = type & $export.P
    , IS_BIND   = type & $export.B
    , target    = IS_GLOBAL ? global : IS_STATIC ? global[name] || (global[name] = {}) : (global[name] || {})[PROTOTYPE]
    , exports   = IS_GLOBAL ? core : core[name] || (core[name] = {})
    , expProto  = exports[PROTOTYPE] || (exports[PROTOTYPE] = {})
    , key, own, out, exp;
  if(IS_GLOBAL)source = name;
  for(key in source){
    // contains in native
    own = !IS_FORCED && target && target[key] !== undefined;
    // export native or passed
    out = (own ? target : source)[key];
    // bind timers to global for call from export context
    exp = IS_BIND && own ? ctx(out, global) : IS_PROTO && typeof out == 'function' ? ctx(Function.call, out) : out;
    // extend global
    if(target)redefine(target, key, out, type & $export.U);
    // export
    if(exports[key] != out)hide(exports, key, exp);
    if(IS_PROTO && expProto[key] != out)expProto[key] = out;
  }
};
global.core = core;
// type bitmap
$export.F = 1;   // forced
$export.G = 2;   // global
$export.S = 4;   // static
$export.P = 8;   // proto
$export.B = 16;  // bind
$export.W = 32;  // wrap
$export.U = 64;  // safe
$export.R = 128; // real proto method for `library` 
module.exports = $export;

/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

var isObject = __webpack_require__(4);
module.exports = function(it){
  if(!isObject(it))throw TypeError(it + ' is not an object!');
  return it;
};

/***/ }),
/* 2 */
/***/ (function(module, exports) {

// https://github.com/zloirock/core-js/issues/86#issuecomment-115759028
var global = module.exports = typeof window != 'undefined' && window.Math == Math
  ? window : typeof self != 'undefined' && self.Math == Math ? self : Function('return this')();
if(typeof __g == 'number')__g = global; // eslint-disable-line no-undef

/***/ }),
/* 3 */
/***/ (function(module, exports) {

module.exports = function(exec){
  try {
    return !!exec();
  } catch(e){
    return true;
  }
};

/***/ }),
/* 4 */
/***/ (function(module, exports) {

module.exports = function(it){
  return typeof it === 'object' ? it !== null : typeof it === 'function';
};

/***/ }),
/* 5 */
/***/ (function(module, exports, __webpack_require__) {

var store      = __webpack_require__(52)('wks')
  , uid        = __webpack_require__(35)
  , Symbol     = __webpack_require__(2).Symbol
  , USE_SYMBOL = typeof Symbol == 'function';

var $exports = module.exports = function(name){
  return store[name] || (store[name] =
    USE_SYMBOL && Symbol[name] || (USE_SYMBOL ? Symbol : uid)('Symbol.' + name));
};

$exports.store = store;

/***/ }),
/* 6 */
/***/ (function(module, exports, __webpack_require__) {

var anObject       = __webpack_require__(1)
  , IE8_DOM_DEFINE = __webpack_require__(103)
  , toPrimitive    = __webpack_require__(23)
  , dP             = Object.defineProperty;

exports.f = __webpack_require__(7) ? Object.defineProperty : function defineProperty(O, P, Attributes){
  anObject(O);
  P = toPrimitive(P, true);
  anObject(Attributes);
  if(IE8_DOM_DEFINE)try {
    return dP(O, P, Attributes);
  } catch(e){ /* empty */ }
  if('get' in Attributes || 'set' in Attributes)throw TypeError('Accessors not supported!');
  if('value' in Attributes)O[P] = Attributes.value;
  return O;
};

/***/ }),
/* 7 */
/***/ (function(module, exports, __webpack_require__) {

// Thank's IE8 for his funny defineProperty
module.exports = !__webpack_require__(3)(function(){
  return Object.defineProperty({}, 'a', {get: function(){ return 7; }}).a != 7;
});

/***/ }),
/* 8 */
/***/ (function(module, exports, __webpack_require__) {

// 7.1.15 ToLength
var toInteger = __webpack_require__(33)
  , min       = Math.min;
module.exports = function(it){
  return it > 0 ? min(toInteger(it), 0x1fffffffffffff) : 0; // pow(2, 53) - 1 == 9007199254740991
};

/***/ }),
/* 9 */
/***/ (function(module, exports, __webpack_require__) {

// 7.1.13 ToObject(argument)
var defined = __webpack_require__(21);
module.exports = function(it){
  return Object(defined(it));
};

/***/ }),
/* 10 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

/* tslint:disable: max-classes-per-file max-line-length */
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var messages = {
    AbortError: "A request was aborted, for example through a call to IDBTransaction.abort.",
    ConstraintError: "A mutation operation in the transaction failed because a constraint was not satisfied. For example, an object such as an object store or index already exists and a request attempted to create a new one.",
    DataCloneError: "The data being stored could not be cloned by the internal structured cloning algorithm.",
    DataError: "Data provided to an operation does not meet requirements.",
    InvalidAccessError: "An invalid operation was performed on an object. For example transaction creation attempt was made, but an empty scope was provided.",
    InvalidStateError: "An operation was called on an object on which it is not allowed or at a time when it is not allowed. Also occurs if a request is made on a source object that has been deleted or removed. Use TransactionInactiveError or ReadOnlyError when possible, as they are more specific variations of InvalidStateError.",
    NotFoundError: "The operation failed because the requested database object could not be found. For example, an object store did not exist but was being opened.",
    ReadOnlyError: 'The mutating operation was attempted in a "readonly" transaction.',
    TransactionInactiveError: "A request was placed against a transaction which is currently not active, or which is finished.",
    VersionError: "An attempt was made to open a database using a lower version than the existing version.",
};
var AbortError = (function (_super) {
    __extends(AbortError, _super);
    function AbortError(message) {
        if (message === void 0) { message = messages.AbortError; }
        var _this = _super.call(this) || this;
        _this.name = "AbortError";
        _this.message = message;
        return _this;
    }
    return AbortError;
}(Error));
exports.AbortError = AbortError;
var ConstraintError = (function (_super) {
    __extends(ConstraintError, _super);
    function ConstraintError(message) {
        if (message === void 0) { message = messages.ConstraintError; }
        var _this = _super.call(this) || this;
        _this.name = "ConstraintError";
        _this.message = message;
        return _this;
    }
    return ConstraintError;
}(Error));
exports.ConstraintError = ConstraintError;
var DataCloneError = (function (_super) {
    __extends(DataCloneError, _super);
    function DataCloneError(message) {
        if (message === void 0) { message = messages.DataCloneError; }
        var _this = _super.call(this) || this;
        _this.name = "DataCloneError";
        _this.message = message;
        return _this;
    }
    return DataCloneError;
}(Error));
exports.DataCloneError = DataCloneError;
var DataError = (function (_super) {
    __extends(DataError, _super);
    function DataError(message) {
        if (message === void 0) { message = messages.DataError; }
        var _this = _super.call(this) || this;
        _this.name = "DataError";
        _this.message = message;
        return _this;
    }
    return DataError;
}(Error));
exports.DataError = DataError;
var InvalidAccessError = (function (_super) {
    __extends(InvalidAccessError, _super);
    function InvalidAccessError(message) {
        if (message === void 0) { message = messages.InvalidAccessError; }
        var _this = _super.call(this) || this;
        _this.name = "InvalidAccessError";
        _this.message = message;
        return _this;
    }
    return InvalidAccessError;
}(Error));
exports.InvalidAccessError = InvalidAccessError;
var InvalidStateError = (function (_super) {
    __extends(InvalidStateError, _super);
    function InvalidStateError(message) {
        if (message === void 0) { message = messages.InvalidStateError; }
        var _this = _super.call(this) || this;
        _this.name = "InvalidStateError";
        _this.message = message;
        return _this;
    }
    return InvalidStateError;
}(Error));
exports.InvalidStateError = InvalidStateError;
var NotFoundError = (function (_super) {
    __extends(NotFoundError, _super);
    function NotFoundError(message) {
        if (message === void 0) { message = messages.NotFoundError; }
        var _this = _super.call(this) || this;
        _this.name = "NotFoundError";
        _this.message = message;
        return _this;
    }
    return NotFoundError;
}(Error));
exports.NotFoundError = NotFoundError;
var ReadOnlyError = (function (_super) {
    __extends(ReadOnlyError, _super);
    function ReadOnlyError(message) {
        if (message === void 0) { message = messages.ReadOnlyError; }
        var _this = _super.call(this) || this;
        _this.name = "ReadOnlyError";
        _this.message = message;
        return _this;
    }
    return ReadOnlyError;
}(Error));
exports.ReadOnlyError = ReadOnlyError;
var TransactionInactiveError = (function (_super) {
    __extends(TransactionInactiveError, _super);
    function TransactionInactiveError(message) {
        if (message === void 0) { message = messages.TransactionInactiveError; }
        var _this = _super.call(this) || this;
        _this.name = "TransactionInactiveError";
        _this.message = message;
        return _this;
    }
    return TransactionInactiveError;
}(Error));
exports.TransactionInactiveError = TransactionInactiveError;
var VersionError = (function (_super) {
    __extends(VersionError, _super);
    function VersionError(message) {
        if (message === void 0) { message = messages.VersionError; }
        var _this = _super.call(this) || this;
        _this.name = "VersionError";
        _this.message = message;
        return _this;
    }
    return VersionError;
}(Error));
exports.VersionError = VersionError;


/***/ }),
/* 11 */
/***/ (function(module, exports) {

var hasOwnProperty = {}.hasOwnProperty;
module.exports = function(it, key){
  return hasOwnProperty.call(it, key);
};

/***/ }),
/* 12 */
/***/ (function(module, exports, __webpack_require__) {

// to indexed object, toObject with fallback for non-array-like ES3 strings
var IObject = __webpack_require__(48)
  , defined = __webpack_require__(21);
module.exports = function(it){
  return IObject(defined(it));
};

/***/ }),
/* 13 */
/***/ (function(module, exports) {

module.exports = function(it){
  if(typeof it != 'function')throw TypeError(it + ' is not a function!');
  return it;
};

/***/ }),
/* 14 */
/***/ (function(module, exports) {

var core = module.exports = {version: '2.4.0'};
if(typeof __e == 'number')__e = core; // eslint-disable-line no-undef

/***/ }),
/* 15 */
/***/ (function(module, exports, __webpack_require__) {

var dP         = __webpack_require__(6)
  , createDesc = __webpack_require__(27);
module.exports = __webpack_require__(7) ? function(object, key, value){
  return dP.f(object, key, createDesc(1, value));
} : function(object, key, value){
  object[key] = value;
  return object;
};

/***/ }),
/* 16 */
/***/ (function(module, exports, __webpack_require__) {

var global    = __webpack_require__(2)
  , hide      = __webpack_require__(15)
  , has       = __webpack_require__(11)
  , SRC       = __webpack_require__(35)('src')
  , TO_STRING = 'toString'
  , $toString = Function[TO_STRING]
  , TPL       = ('' + $toString).split(TO_STRING);

__webpack_require__(14).inspectSource = function(it){
  return $toString.call(it);
};

(module.exports = function(O, key, val, safe){
  var isFunction = typeof val == 'function';
  if(isFunction)has(val, 'name') || hide(val, 'name', key);
  if(O[key] === val)return;
  if(isFunction)has(val, SRC) || hide(val, SRC, O[key] ? '' + O[key] : TPL.join(String(key)));
  if(O === global){
    O[key] = val;
  } else {
    if(!safe){
      delete O[key];
      hide(O, key, val);
    } else {
      if(O[key])O[key] = val;
      else hide(O, key, val);
    }
  }
// add fake Function#toString for correct work wrapped methods / constructors with methods like LoDash isNative
})(Function.prototype, TO_STRING, function toString(){
  return typeof this == 'function' && this[SRC] || $toString.call(this);
});

/***/ }),
/* 17 */
/***/ (function(module, exports, __webpack_require__) {

var pIE            = __webpack_require__(49)
  , createDesc     = __webpack_require__(27)
  , toIObject      = __webpack_require__(12)
  , toPrimitive    = __webpack_require__(23)
  , has            = __webpack_require__(11)
  , IE8_DOM_DEFINE = __webpack_require__(103)
  , gOPD           = Object.getOwnPropertyDescriptor;

exports.f = __webpack_require__(7) ? gOPD : function getOwnPropertyDescriptor(O, P){
  O = toIObject(O);
  P = toPrimitive(P, true);
  if(IE8_DOM_DEFINE)try {
    return gOPD(O, P);
  } catch(e){ /* empty */ }
  if(has(O, P))return createDesc(!pIE.f.call(O, P), O[P]);
};

/***/ }),
/* 18 */
/***/ (function(module, exports, __webpack_require__) {

// 19.1.2.9 / 15.2.3.2 Object.getPrototypeOf(O)
var has         = __webpack_require__(11)
  , toObject    = __webpack_require__(9)
  , IE_PROTO    = __webpack_require__(73)('IE_PROTO')
  , ObjectProto = Object.prototype;

module.exports = Object.getPrototypeOf || function(O){
  O = toObject(O);
  if(has(O, IE_PROTO))return O[IE_PROTO];
  if(typeof O.constructor == 'function' && O instanceof O.constructor){
    return O.constructor.prototype;
  } return O instanceof Object ? ObjectProto : null;
};

/***/ }),
/* 19 */
/***/ (function(module, exports, __webpack_require__) {

var $export = __webpack_require__(0)
  , fails   = __webpack_require__(3)
  , defined = __webpack_require__(21)
  , quot    = /"/g;
// B.2.3.2.1 CreateHTML(string, tag, attribute, value)
var createHTML = function(string, tag, attribute, value) {
  var S  = String(defined(string))
    , p1 = '<' + tag;
  if(attribute !== '')p1 += ' ' + attribute + '="' + String(value).replace(quot, '&quot;') + '"';
  return p1 + '>' + S + '</' + tag + '>';
};
module.exports = function(NAME, exec){
  var O = {};
  O[NAME] = exec(createHTML);
  $export($export.P + $export.F * fails(function(){
    var test = ''[NAME]('"');
    return test !== test.toLowerCase() || test.split('"').length > 3;
  }), 'String', O);
};

/***/ }),
/* 20 */
/***/ (function(module, exports) {

var toString = {}.toString;

module.exports = function(it){
  return toString.call(it).slice(8, -1);
};

/***/ }),
/* 21 */
/***/ (function(module, exports) {

// 7.2.1 RequireObjectCoercible(argument)
module.exports = function(it){
  if(it == undefined)throw TypeError("Can't call method on  " + it);
  return it;
};

/***/ }),
/* 22 */
/***/ (function(module, exports, __webpack_require__) {

var fails = __webpack_require__(3);

module.exports = function(method, arg){
  return !!method && fails(function(){
    arg ? method.call(null, function(){}, 1) : method.call(null);
  });
};

/***/ }),
/* 23 */
/***/ (function(module, exports, __webpack_require__) {

// 7.1.1 ToPrimitive(input [, PreferredType])
var isObject = __webpack_require__(4);
// instead of the ES6 spec version, we didn't implement @@toPrimitive case
// and the second argument - flag - preferred type is a string
module.exports = function(it, S){
  if(!isObject(it))return it;
  var fn, val;
  if(S && typeof (fn = it.toString) == 'function' && !isObject(val = fn.call(it)))return val;
  if(typeof (fn = it.valueOf) == 'function' && !isObject(val = fn.call(it)))return val;
  if(!S && typeof (fn = it.toString) == 'function' && !isObject(val = fn.call(it)))return val;
  throw TypeError("Can't convert object to primitive value");
};

/***/ }),
/* 24 */
/***/ (function(module, exports, __webpack_require__) {

// optional / simple context binding
var aFunction = __webpack_require__(13);
module.exports = function(fn, that, length){
  aFunction(fn);
  if(that === undefined)return fn;
  switch(length){
    case 1: return function(a){
      return fn.call(that, a);
    };
    case 2: return function(a, b){
      return fn.call(that, a, b);
    };
    case 3: return function(a, b, c){
      return fn.call(that, a, b, c);
    };
  }
  return function(/* ...args */){
    return fn.apply(that, arguments);
  };
};

/***/ }),
/* 25 */
/***/ (function(module, exports, __webpack_require__) {

// most Object methods by ES6 should accept primitives
var $export = __webpack_require__(0)
  , core    = __webpack_require__(14)
  , fails   = __webpack_require__(3);
module.exports = function(KEY, exec){
  var fn  = (core.Object || {})[KEY] || Object[KEY]
    , exp = {};
  exp[KEY] = exec(fn);
  $export($export.S + $export.F * fails(function(){ fn(1); }), 'Object', exp);
};

/***/ }),
/* 26 */
/***/ (function(module, exports, __webpack_require__) {

// 0 -> Array#forEach
// 1 -> Array#map
// 2 -> Array#filter
// 3 -> Array#some
// 4 -> Array#every
// 5 -> Array#find
// 6 -> Array#findIndex
var ctx      = __webpack_require__(24)
  , IObject  = __webpack_require__(48)
  , toObject = __webpack_require__(9)
  , toLength = __webpack_require__(8)
  , asc      = __webpack_require__(232);
module.exports = function(TYPE, $create){
  var IS_MAP        = TYPE == 1
    , IS_FILTER     = TYPE == 2
    , IS_SOME       = TYPE == 3
    , IS_EVERY      = TYPE == 4
    , IS_FIND_INDEX = TYPE == 6
    , NO_HOLES      = TYPE == 5 || IS_FIND_INDEX
    , create        = $create || asc;
  return function($this, callbackfn, that){
    var O      = toObject($this)
      , self   = IObject(O)
      , f      = ctx(callbackfn, that, 3)
      , length = toLength(self.length)
      , index  = 0
      , result = IS_MAP ? create($this, length) : IS_FILTER ? create($this, 0) : undefined
      , val, res;
    for(;length > index; index++)if(NO_HOLES || index in self){
      val = self[index];
      res = f(val, index, O);
      if(TYPE){
        if(IS_MAP)result[index] = res;            // map
        else if(res)switch(TYPE){
          case 3: return true;                    // some
          case 5: return val;                     // find
          case 6: return index;                   // findIndex
          case 2: result.push(val);               // filter
        } else if(IS_EVERY)return false;          // every
      }
    }
    return IS_FIND_INDEX ? -1 : IS_SOME || IS_EVERY ? IS_EVERY : result;
  };
};

/***/ }),
/* 27 */
/***/ (function(module, exports) {

module.exports = function(bitmap, value){
  return {
    enumerable  : !(bitmap & 1),
    configurable: !(bitmap & 2),
    writable    : !(bitmap & 4),
    value       : value
  };
};

/***/ }),
/* 28 */
/***/ (function(module, exports, __webpack_require__) {

// 19.1.2.2 / 15.2.3.5 Object.create(O [, Properties])
var anObject    = __webpack_require__(1)
  , dPs         = __webpack_require__(107)
  , enumBugKeys = __webpack_require__(74)
  , IE_PROTO    = __webpack_require__(73)('IE_PROTO')
  , Empty       = function(){ /* empty */ }
  , PROTOTYPE   = 'prototype';

// Create object with fake `null` prototype: use iframe Object with cleared prototype
var createDict = function(){
  // Thrash, waste and sodomy: IE GC bug
  var iframe = __webpack_require__(71)('iframe')
    , i      = enumBugKeys.length
    , lt     = '<'
    , gt     = '>'
    , iframeDocument;
  iframe.style.display = 'none';
  __webpack_require__(76).appendChild(iframe);
  iframe.src = 'javascript:'; // eslint-disable-line no-script-url
  // createDict = iframe.contentWindow.Object;
  // html.removeChild(iframe);
  iframeDocument = iframe.contentWindow.document;
  iframeDocument.open();
  iframeDocument.write(lt + 'script' + gt + 'document.F=Object' + lt + '/script' + gt);
  iframeDocument.close();
  createDict = iframeDocument.F;
  while(i--)delete createDict[PROTOTYPE][enumBugKeys[i]];
  return createDict();
};

module.exports = Object.create || function create(O, Properties){
  var result;
  if(O !== null){
    Empty[PROTOTYPE] = anObject(O);
    result = new Empty;
    Empty[PROTOTYPE] = null;
    // add "__proto__" for Object.getPrototypeOf polyfill
    result[IE_PROTO] = O;
  } else result = createDict();
  return Properties === undefined ? result : dPs(result, Properties);
};


/***/ }),
/* 29 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

if(__webpack_require__(7)){
  var LIBRARY             = __webpack_require__(36)
    , global              = __webpack_require__(2)
    , fails               = __webpack_require__(3)
    , $export             = __webpack_require__(0)
    , $typed              = __webpack_require__(63)
    , $buffer             = __webpack_require__(95)
    , ctx                 = __webpack_require__(24)
    , anInstance          = __webpack_require__(42)
    , propertyDesc        = __webpack_require__(27)
    , hide                = __webpack_require__(15)
    , redefineAll         = __webpack_require__(44)
    , toInteger           = __webpack_require__(33)
    , toLength            = __webpack_require__(8)
    , toIndex             = __webpack_require__(37)
    , toPrimitive         = __webpack_require__(23)
    , has                 = __webpack_require__(11)
    , same                = __webpack_require__(109)
    , classof             = __webpack_require__(39)
    , isObject            = __webpack_require__(4)
    , toObject            = __webpack_require__(9)
    , isArrayIter         = __webpack_require__(87)
    , create              = __webpack_require__(28)
    , getPrototypeOf      = __webpack_require__(18)
    , gOPN                = __webpack_require__(38).f
    , getIterFn           = __webpack_require__(50)
    , uid                 = __webpack_require__(35)
    , wks                 = __webpack_require__(5)
    , createArrayMethod   = __webpack_require__(26)
    , createArrayIncludes = __webpack_require__(53)
    , speciesConstructor  = __webpack_require__(92)
    , ArrayIterators      = __webpack_require__(90)
    , Iterators           = __webpack_require__(40)
    , $iterDetect         = __webpack_require__(59)
    , setSpecies          = __webpack_require__(41)
    , arrayFill           = __webpack_require__(89)
    , arrayCopyWithin     = __webpack_require__(118)
    , $DP                 = __webpack_require__(6)
    , $GOPD               = __webpack_require__(17)
    , dP                  = $DP.f
    , gOPD                = $GOPD.f
    , RangeError          = global.RangeError
    , TypeError           = global.TypeError
    , Uint8Array          = global.Uint8Array
    , ARRAY_BUFFER        = 'ArrayBuffer'
    , SHARED_BUFFER       = 'Shared' + ARRAY_BUFFER
    , BYTES_PER_ELEMENT   = 'BYTES_PER_ELEMENT'
    , PROTOTYPE           = 'prototype'
    , ArrayProto          = Array[PROTOTYPE]
    , $ArrayBuffer        = $buffer.ArrayBuffer
    , $DataView           = $buffer.DataView
    , arrayForEach        = createArrayMethod(0)
    , arrayFilter         = createArrayMethod(2)
    , arraySome           = createArrayMethod(3)
    , arrayEvery          = createArrayMethod(4)
    , arrayFind           = createArrayMethod(5)
    , arrayFindIndex      = createArrayMethod(6)
    , arrayIncludes       = createArrayIncludes(true)
    , arrayIndexOf        = createArrayIncludes(false)
    , arrayValues         = ArrayIterators.values
    , arrayKeys           = ArrayIterators.keys
    , arrayEntries        = ArrayIterators.entries
    , arrayLastIndexOf    = ArrayProto.lastIndexOf
    , arrayReduce         = ArrayProto.reduce
    , arrayReduceRight    = ArrayProto.reduceRight
    , arrayJoin           = ArrayProto.join
    , arraySort           = ArrayProto.sort
    , arraySlice          = ArrayProto.slice
    , arrayToString       = ArrayProto.toString
    , arrayToLocaleString = ArrayProto.toLocaleString
    , ITERATOR            = wks('iterator')
    , TAG                 = wks('toStringTag')
    , TYPED_CONSTRUCTOR   = uid('typed_constructor')
    , DEF_CONSTRUCTOR     = uid('def_constructor')
    , ALL_CONSTRUCTORS    = $typed.CONSTR
    , TYPED_ARRAY         = $typed.TYPED
    , VIEW                = $typed.VIEW
    , WRONG_LENGTH        = 'Wrong length!';

  var $map = createArrayMethod(1, function(O, length){
    return allocate(speciesConstructor(O, O[DEF_CONSTRUCTOR]), length);
  });

  var LITTLE_ENDIAN = fails(function(){
    return new Uint8Array(new Uint16Array([1]).buffer)[0] === 1;
  });

  var FORCED_SET = !!Uint8Array && !!Uint8Array[PROTOTYPE].set && fails(function(){
    new Uint8Array(1).set({});
  });

  var strictToLength = function(it, SAME){
    if(it === undefined)throw TypeError(WRONG_LENGTH);
    var number = +it
      , length = toLength(it);
    if(SAME && !same(number, length))throw RangeError(WRONG_LENGTH);
    return length;
  };

  var toOffset = function(it, BYTES){
    var offset = toInteger(it);
    if(offset < 0 || offset % BYTES)throw RangeError('Wrong offset!');
    return offset;
  };

  var validate = function(it){
    if(isObject(it) && TYPED_ARRAY in it)return it;
    throw TypeError(it + ' is not a typed array!');
  };

  var allocate = function(C, length){
    if(!(isObject(C) && TYPED_CONSTRUCTOR in C)){
      throw TypeError('It is not a typed array constructor!');
    } return new C(length);
  };

  var speciesFromList = function(O, list){
    return fromList(speciesConstructor(O, O[DEF_CONSTRUCTOR]), list);
  };

  var fromList = function(C, list){
    var index  = 0
      , length = list.length
      , result = allocate(C, length);
    while(length > index)result[index] = list[index++];
    return result;
  };

  var addGetter = function(it, key, internal){
    dP(it, key, {get: function(){ return this._d[internal]; }});
  };

  var $from = function from(source /*, mapfn, thisArg */){
    var O       = toObject(source)
      , aLen    = arguments.length
      , mapfn   = aLen > 1 ? arguments[1] : undefined
      , mapping = mapfn !== undefined
      , iterFn  = getIterFn(O)
      , i, length, values, result, step, iterator;
    if(iterFn != undefined && !isArrayIter(iterFn)){
      for(iterator = iterFn.call(O), values = [], i = 0; !(step = iterator.next()).done; i++){
        values.push(step.value);
      } O = values;
    }
    if(mapping && aLen > 2)mapfn = ctx(mapfn, arguments[2], 2);
    for(i = 0, length = toLength(O.length), result = allocate(this, length); length > i; i++){
      result[i] = mapping ? mapfn(O[i], i) : O[i];
    }
    return result;
  };

  var $of = function of(/*...items*/){
    var index  = 0
      , length = arguments.length
      , result = allocate(this, length);
    while(length > index)result[index] = arguments[index++];
    return result;
  };

  // iOS Safari 6.x fails here
  var TO_LOCALE_BUG = !!Uint8Array && fails(function(){ arrayToLocaleString.call(new Uint8Array(1)); });

  var $toLocaleString = function toLocaleString(){
    return arrayToLocaleString.apply(TO_LOCALE_BUG ? arraySlice.call(validate(this)) : validate(this), arguments);
  };

  var proto = {
    copyWithin: function copyWithin(target, start /*, end */){
      return arrayCopyWithin.call(validate(this), target, start, arguments.length > 2 ? arguments[2] : undefined);
    },
    every: function every(callbackfn /*, thisArg */){
      return arrayEvery(validate(this), callbackfn, arguments.length > 1 ? arguments[1] : undefined);
    },
    fill: function fill(value /*, start, end */){ // eslint-disable-line no-unused-vars
      return arrayFill.apply(validate(this), arguments);
    },
    filter: function filter(callbackfn /*, thisArg */){
      return speciesFromList(this, arrayFilter(validate(this), callbackfn,
        arguments.length > 1 ? arguments[1] : undefined));
    },
    find: function find(predicate /*, thisArg */){
      return arrayFind(validate(this), predicate, arguments.length > 1 ? arguments[1] : undefined);
    },
    findIndex: function findIndex(predicate /*, thisArg */){
      return arrayFindIndex(validate(this), predicate, arguments.length > 1 ? arguments[1] : undefined);
    },
    forEach: function forEach(callbackfn /*, thisArg */){
      arrayForEach(validate(this), callbackfn, arguments.length > 1 ? arguments[1] : undefined);
    },
    indexOf: function indexOf(searchElement /*, fromIndex */){
      return arrayIndexOf(validate(this), searchElement, arguments.length > 1 ? arguments[1] : undefined);
    },
    includes: function includes(searchElement /*, fromIndex */){
      return arrayIncludes(validate(this), searchElement, arguments.length > 1 ? arguments[1] : undefined);
    },
    join: function join(separator){ // eslint-disable-line no-unused-vars
      return arrayJoin.apply(validate(this), arguments);
    },
    lastIndexOf: function lastIndexOf(searchElement /*, fromIndex */){ // eslint-disable-line no-unused-vars
      return arrayLastIndexOf.apply(validate(this), arguments);
    },
    map: function map(mapfn /*, thisArg */){
      return $map(validate(this), mapfn, arguments.length > 1 ? arguments[1] : undefined);
    },
    reduce: function reduce(callbackfn /*, initialValue */){ // eslint-disable-line no-unused-vars
      return arrayReduce.apply(validate(this), arguments);
    },
    reduceRight: function reduceRight(callbackfn /*, initialValue */){ // eslint-disable-line no-unused-vars
      return arrayReduceRight.apply(validate(this), arguments);
    },
    reverse: function reverse(){
      var that   = this
        , length = validate(that).length
        , middle = Math.floor(length / 2)
        , index  = 0
        , value;
      while(index < middle){
        value         = that[index];
        that[index++] = that[--length];
        that[length]  = value;
      } return that;
    },
    some: function some(callbackfn /*, thisArg */){
      return arraySome(validate(this), callbackfn, arguments.length > 1 ? arguments[1] : undefined);
    },
    sort: function sort(comparefn){
      return arraySort.call(validate(this), comparefn);
    },
    subarray: function subarray(begin, end){
      var O      = validate(this)
        , length = O.length
        , $begin = toIndex(begin, length);
      return new (speciesConstructor(O, O[DEF_CONSTRUCTOR]))(
        O.buffer,
        O.byteOffset + $begin * O.BYTES_PER_ELEMENT,
        toLength((end === undefined ? length : toIndex(end, length)) - $begin)
      );
    }
  };

  var $slice = function slice(start, end){
    return speciesFromList(this, arraySlice.call(validate(this), start, end));
  };

  var $set = function set(arrayLike /*, offset */){
    validate(this);
    var offset = toOffset(arguments[1], 1)
      , length = this.length
      , src    = toObject(arrayLike)
      , len    = toLength(src.length)
      , index  = 0;
    if(len + offset > length)throw RangeError(WRONG_LENGTH);
    while(index < len)this[offset + index] = src[index++];
  };

  var $iterators = {
    entries: function entries(){
      return arrayEntries.call(validate(this));
    },
    keys: function keys(){
      return arrayKeys.call(validate(this));
    },
    values: function values(){
      return arrayValues.call(validate(this));
    }
  };

  var isTAIndex = function(target, key){
    return isObject(target)
      && target[TYPED_ARRAY]
      && typeof key != 'symbol'
      && key in target
      && String(+key) == String(key);
  };
  var $getDesc = function getOwnPropertyDescriptor(target, key){
    return isTAIndex(target, key = toPrimitive(key, true))
      ? propertyDesc(2, target[key])
      : gOPD(target, key);
  };
  var $setDesc = function defineProperty(target, key, desc){
    if(isTAIndex(target, key = toPrimitive(key, true))
      && isObject(desc)
      && has(desc, 'value')
      && !has(desc, 'get')
      && !has(desc, 'set')
      // TODO: add validation descriptor w/o calling accessors
      && !desc.configurable
      && (!has(desc, 'writable') || desc.writable)
      && (!has(desc, 'enumerable') || desc.enumerable)
    ){
      target[key] = desc.value;
      return target;
    } else return dP(target, key, desc);
  };

  if(!ALL_CONSTRUCTORS){
    $GOPD.f = $getDesc;
    $DP.f   = $setDesc;
  }

  $export($export.S + $export.F * !ALL_CONSTRUCTORS, 'Object', {
    getOwnPropertyDescriptor: $getDesc,
    defineProperty:           $setDesc
  });

  if(fails(function(){ arrayToString.call({}); })){
    arrayToString = arrayToLocaleString = function toString(){
      return arrayJoin.call(this);
    }
  }

  var $TypedArrayPrototype$ = redefineAll({}, proto);
  redefineAll($TypedArrayPrototype$, $iterators);
  hide($TypedArrayPrototype$, ITERATOR, $iterators.values);
  redefineAll($TypedArrayPrototype$, {
    slice:          $slice,
    set:            $set,
    constructor:    function(){ /* noop */ },
    toString:       arrayToString,
    toLocaleString: $toLocaleString
  });
  addGetter($TypedArrayPrototype$, 'buffer', 'b');
  addGetter($TypedArrayPrototype$, 'byteOffset', 'o');
  addGetter($TypedArrayPrototype$, 'byteLength', 'l');
  addGetter($TypedArrayPrototype$, 'length', 'e');
  dP($TypedArrayPrototype$, TAG, {
    get: function(){ return this[TYPED_ARRAY]; }
  });

  module.exports = function(KEY, BYTES, wrapper, CLAMPED){
    CLAMPED = !!CLAMPED;
    var NAME       = KEY + (CLAMPED ? 'Clamped' : '') + 'Array'
      , ISNT_UINT8 = NAME != 'Uint8Array'
      , GETTER     = 'get' + KEY
      , SETTER     = 'set' + KEY
      , TypedArray = global[NAME]
      , Base       = TypedArray || {}
      , TAC        = TypedArray && getPrototypeOf(TypedArray)
      , FORCED     = !TypedArray || !$typed.ABV
      , O          = {}
      , TypedArrayPrototype = TypedArray && TypedArray[PROTOTYPE];
    var getter = function(that, index){
      var data = that._d;
      return data.v[GETTER](index * BYTES + data.o, LITTLE_ENDIAN);
    };
    var setter = function(that, index, value){
      var data = that._d;
      if(CLAMPED)value = (value = Math.round(value)) < 0 ? 0 : value > 0xff ? 0xff : value & 0xff;
      data.v[SETTER](index * BYTES + data.o, value, LITTLE_ENDIAN);
    };
    var addElement = function(that, index){
      dP(that, index, {
        get: function(){
          return getter(this, index);
        },
        set: function(value){
          return setter(this, index, value);
        },
        enumerable: true
      });
    };
    if(FORCED){
      TypedArray = wrapper(function(that, data, $offset, $length){
        anInstance(that, TypedArray, NAME, '_d');
        var index  = 0
          , offset = 0
          , buffer, byteLength, length, klass;
        if(!isObject(data)){
          length     = strictToLength(data, true)
          byteLength = length * BYTES;
          buffer     = new $ArrayBuffer(byteLength);
        } else if(data instanceof $ArrayBuffer || (klass = classof(data)) == ARRAY_BUFFER || klass == SHARED_BUFFER){
          buffer = data;
          offset = toOffset($offset, BYTES);
          var $len = data.byteLength;
          if($length === undefined){
            if($len % BYTES)throw RangeError(WRONG_LENGTH);
            byteLength = $len - offset;
            if(byteLength < 0)throw RangeError(WRONG_LENGTH);
          } else {
            byteLength = toLength($length) * BYTES;
            if(byteLength + offset > $len)throw RangeError(WRONG_LENGTH);
          }
          length = byteLength / BYTES;
        } else if(TYPED_ARRAY in data){
          return fromList(TypedArray, data);
        } else {
          return $from.call(TypedArray, data);
        }
        hide(that, '_d', {
          b: buffer,
          o: offset,
          l: byteLength,
          e: length,
          v: new $DataView(buffer)
        });
        while(index < length)addElement(that, index++);
      });
      TypedArrayPrototype = TypedArray[PROTOTYPE] = create($TypedArrayPrototype$);
      hide(TypedArrayPrototype, 'constructor', TypedArray);
    } else if(!$iterDetect(function(iter){
      // V8 works with iterators, but fails in many other cases
      // https://code.google.com/p/v8/issues/detail?id=4552
      new TypedArray(null); // eslint-disable-line no-new
      new TypedArray(iter); // eslint-disable-line no-new
    }, true)){
      TypedArray = wrapper(function(that, data, $offset, $length){
        anInstance(that, TypedArray, NAME);
        var klass;
        // `ws` module bug, temporarily remove validation length for Uint8Array
        // https://github.com/websockets/ws/pull/645
        if(!isObject(data))return new Base(strictToLength(data, ISNT_UINT8));
        if(data instanceof $ArrayBuffer || (klass = classof(data)) == ARRAY_BUFFER || klass == SHARED_BUFFER){
          return $length !== undefined
            ? new Base(data, toOffset($offset, BYTES), $length)
            : $offset !== undefined
              ? new Base(data, toOffset($offset, BYTES))
              : new Base(data);
        }
        if(TYPED_ARRAY in data)return fromList(TypedArray, data);
        return $from.call(TypedArray, data);
      });
      arrayForEach(TAC !== Function.prototype ? gOPN(Base).concat(gOPN(TAC)) : gOPN(Base), function(key){
        if(!(key in TypedArray))hide(TypedArray, key, Base[key]);
      });
      TypedArray[PROTOTYPE] = TypedArrayPrototype;
      if(!LIBRARY)TypedArrayPrototype.constructor = TypedArray;
    }
    var $nativeIterator   = TypedArrayPrototype[ITERATOR]
      , CORRECT_ITER_NAME = !!$nativeIterator && ($nativeIterator.name == 'values' || $nativeIterator.name == undefined)
      , $iterator         = $iterators.values;
    hide(TypedArray, TYPED_CONSTRUCTOR, true);
    hide(TypedArrayPrototype, TYPED_ARRAY, NAME);
    hide(TypedArrayPrototype, VIEW, true);
    hide(TypedArrayPrototype, DEF_CONSTRUCTOR, TypedArray);

    if(CLAMPED ? new TypedArray(1)[TAG] != NAME : !(TAG in TypedArrayPrototype)){
      dP(TypedArrayPrototype, TAG, {
        get: function(){ return NAME; }
      });
    }

    O[NAME] = TypedArray;

    $export($export.G + $export.W + $export.F * (TypedArray != Base), O);

    $export($export.S, NAME, {
      BYTES_PER_ELEMENT: BYTES,
      from: $from,
      of: $of
    });

    if(!(BYTES_PER_ELEMENT in TypedArrayPrototype))hide(TypedArrayPrototype, BYTES_PER_ELEMENT, BYTES);

    $export($export.P, NAME, proto);

    setSpecies(NAME);

    $export($export.P + $export.F * FORCED_SET, NAME, {set: $set});

    $export($export.P + $export.F * !CORRECT_ITER_NAME, NAME, $iterators);

    $export($export.P + $export.F * (TypedArrayPrototype.toString != arrayToString), NAME, {toString: arrayToString});

    $export($export.P + $export.F * fails(function(){
      new TypedArray(1).slice();
    }), NAME, {slice: $slice});

    $export($export.P + $export.F * (fails(function(){
      return [1, 2].toLocaleString() != new TypedArray([1, 2]).toLocaleString()
    }) || !fails(function(){
      TypedArrayPrototype.toLocaleString.call([1, 2]);
    })), NAME, {toLocaleString: $toLocaleString});

    Iterators[NAME] = CORRECT_ITER_NAME ? $nativeIterator : $iterator;
    if(!LIBRARY && !CORRECT_ITER_NAME)hide(TypedArrayPrototype, ITERATOR, $iterator);
  };
} else module.exports = function(){ /* empty */ };

/***/ }),
/* 30 */
/***/ (function(module, exports, __webpack_require__) {

var Map     = __webpack_require__(120)
  , $export = __webpack_require__(0)
  , shared  = __webpack_require__(52)('metadata')
  , store   = shared.store || (shared.store = new (__webpack_require__(123)));

var getOrCreateMetadataMap = function(target, targetKey, create){
  var targetMetadata = store.get(target);
  if(!targetMetadata){
    if(!create)return undefined;
    store.set(target, targetMetadata = new Map);
  }
  var keyMetadata = targetMetadata.get(targetKey);
  if(!keyMetadata){
    if(!create)return undefined;
    targetMetadata.set(targetKey, keyMetadata = new Map);
  } return keyMetadata;
};
var ordinaryHasOwnMetadata = function(MetadataKey, O, P){
  var metadataMap = getOrCreateMetadataMap(O, P, false);
  return metadataMap === undefined ? false : metadataMap.has(MetadataKey);
};
var ordinaryGetOwnMetadata = function(MetadataKey, O, P){
  var metadataMap = getOrCreateMetadataMap(O, P, false);
  return metadataMap === undefined ? undefined : metadataMap.get(MetadataKey);
};
var ordinaryDefineOwnMetadata = function(MetadataKey, MetadataValue, O, P){
  getOrCreateMetadataMap(O, P, true).set(MetadataKey, MetadataValue);
};
var ordinaryOwnMetadataKeys = function(target, targetKey){
  var metadataMap = getOrCreateMetadataMap(target, targetKey, false)
    , keys        = [];
  if(metadataMap)metadataMap.forEach(function(_, key){ keys.push(key); });
  return keys;
};
var toMetaKey = function(it){
  return it === undefined || typeof it == 'symbol' ? it : String(it);
};
var exp = function(O){
  $export($export.S, 'Reflect', O);
};

module.exports = {
  store: store,
  map: getOrCreateMetadataMap,
  has: ordinaryHasOwnMetadata,
  get: ordinaryGetOwnMetadata,
  set: ordinaryDefineOwnMetadata,
  keys: ordinaryOwnMetadataKeys,
  key: toMetaKey,
  exp: exp
};

/***/ }),
/* 31 */
/***/ (function(module, exports, __webpack_require__) {

var META     = __webpack_require__(35)('meta')
  , isObject = __webpack_require__(4)
  , has      = __webpack_require__(11)
  , setDesc  = __webpack_require__(6).f
  , id       = 0;
var isExtensible = Object.isExtensible || function(){
  return true;
};
var FREEZE = !__webpack_require__(3)(function(){
  return isExtensible(Object.preventExtensions({}));
});
var setMeta = function(it){
  setDesc(it, META, {value: {
    i: 'O' + ++id, // object ID
    w: {}          // weak collections IDs
  }});
};
var fastKey = function(it, create){
  // return primitive with prefix
  if(!isObject(it))return typeof it == 'symbol' ? it : (typeof it == 'string' ? 'S' : 'P') + it;
  if(!has(it, META)){
    // can't set metadata to uncaught frozen object
    if(!isExtensible(it))return 'F';
    // not necessary to add metadata
    if(!create)return 'E';
    // add missing metadata
    setMeta(it);
  // return object ID
  } return it[META].i;
};
var getWeak = function(it, create){
  if(!has(it, META)){
    // can't set metadata to uncaught frozen object
    if(!isExtensible(it))return true;
    // not necessary to add metadata
    if(!create)return false;
    // add missing metadata
    setMeta(it);
  // return hash weak collections IDs
  } return it[META].w;
};
// add metadata on freeze-family methods calling
var onFreeze = function(it){
  if(FREEZE && meta.NEED && isExtensible(it) && !has(it, META))setMeta(it);
  return it;
};
var meta = module.exports = {
  KEY:      META,
  NEED:     false,
  fastKey:  fastKey,
  getWeak:  getWeak,
  onFreeze: onFreeze
};

/***/ }),
/* 32 */
/***/ (function(module, exports, __webpack_require__) {

// 19.1.2.14 / 15.2.3.14 Object.keys(O)
var $keys       = __webpack_require__(106)
  , enumBugKeys = __webpack_require__(74);

module.exports = Object.keys || function keys(O){
  return $keys(O, enumBugKeys);
};

/***/ }),
/* 33 */
/***/ (function(module, exports) {

// 7.1.4 ToInteger
var ceil  = Math.ceil
  , floor = Math.floor;
module.exports = function(it){
  return isNaN(it = +it) ? 0 : (it > 0 ? floor : ceil)(it);
};

/***/ }),
/* 34 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var errors_1 = __webpack_require__(10);
// https://w3c.github.io/IndexedDB/#convert-a-value-to-a-input
var valueToKey = function (input, seen) {
    if (typeof input === "number") {
        if (isNaN(input)) {
            throw new errors_1.DataError();
        }
        return input;
    }
    else if (input instanceof Date) {
        var ms = input.valueOf();
        if (isNaN(ms)) {
            throw new errors_1.DataError();
        }
        return new Date(ms);
    }
    else if (typeof input === "string") {
        return input;
    }
    else if ((input instanceof ArrayBuffer) ||
        (typeof ArrayBuffer !== "undefined" && ArrayBuffer.isView && ArrayBuffer.isView(input))) {
        if (input instanceof ArrayBuffer) {
            return new Uint8Array(input).buffer;
        }
        return new Uint8Array(input.buffer).buffer;
    }
    else if (Array.isArray(input)) {
        if (seen === undefined) {
            seen = new Set();
        }
        else if (seen.has(input)) {
            throw new errors_1.DataError();
        }
        seen.add(input);
        var keys = [];
        for (var i = 0; i < input.length; i++) {
            var hop = input.hasOwnProperty(i);
            if (!hop) {
                throw new errors_1.DataError();
            }
            var entry = input[i];
            var key = valueToKey(entry, seen);
            keys.push(key);
        }
        return keys;
    }
    else {
        throw new errors_1.DataError();
    }
};
exports.default = valueToKey;


/***/ }),
/* 35 */
/***/ (function(module, exports) {

var id = 0
  , px = Math.random();
module.exports = function(key){
  return 'Symbol('.concat(key === undefined ? '' : key, ')_', (++id + px).toString(36));
};

/***/ }),
/* 36 */
/***/ (function(module, exports) {

module.exports = false;

/***/ }),
/* 37 */
/***/ (function(module, exports, __webpack_require__) {

var toInteger = __webpack_require__(33)
  , max       = Math.max
  , min       = Math.min;
module.exports = function(index, length){
  index = toInteger(index);
  return index < 0 ? max(index + length, 0) : min(index, length);
};

/***/ }),
/* 38 */
/***/ (function(module, exports, __webpack_require__) {

// 19.1.2.7 / 15.2.3.4 Object.getOwnPropertyNames(O)
var $keys      = __webpack_require__(106)
  , hiddenKeys = __webpack_require__(74).concat('length', 'prototype');

exports.f = Object.getOwnPropertyNames || function getOwnPropertyNames(O){
  return $keys(O, hiddenKeys);
};

/***/ }),
/* 39 */
/***/ (function(module, exports, __webpack_require__) {

// getting tag from 19.1.3.6 Object.prototype.toString()
var cof = __webpack_require__(20)
  , TAG = __webpack_require__(5)('toStringTag')
  // ES3 wrong here
  , ARG = cof(function(){ return arguments; }()) == 'Arguments';

// fallback for IE11 Script Access Denied error
var tryGet = function(it, key){
  try {
    return it[key];
  } catch(e){ /* empty */ }
};

module.exports = function(it){
  var O, T, B;
  return it === undefined ? 'Undefined' : it === null ? 'Null'
    // @@toStringTag case
    : typeof (T = tryGet(O = Object(it), TAG)) == 'string' ? T
    // builtinTag case
    : ARG ? cof(O)
    // ES3 arguments fallback
    : (B = cof(O)) == 'Object' && typeof O.callee == 'function' ? 'Arguments' : B;
};

/***/ }),
/* 40 */
/***/ (function(module, exports) {

module.exports = {};

/***/ }),
/* 41 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var global      = __webpack_require__(2)
  , dP          = __webpack_require__(6)
  , DESCRIPTORS = __webpack_require__(7)
  , SPECIES     = __webpack_require__(5)('species');

module.exports = function(KEY){
  var C = global[KEY];
  if(DESCRIPTORS && C && !C[SPECIES])dP.f(C, SPECIES, {
    configurable: true,
    get: function(){ return this; }
  });
};

/***/ }),
/* 42 */
/***/ (function(module, exports) {

module.exports = function(it, Constructor, name, forbiddenField){
  if(!(it instanceof Constructor) || (forbiddenField !== undefined && forbiddenField in it)){
    throw TypeError(name + ': incorrect invocation!');
  } return it;
};

/***/ }),
/* 43 */
/***/ (function(module, exports, __webpack_require__) {

var ctx         = __webpack_require__(24)
  , call        = __webpack_require__(116)
  , isArrayIter = __webpack_require__(87)
  , anObject    = __webpack_require__(1)
  , toLength    = __webpack_require__(8)
  , getIterFn   = __webpack_require__(50)
  , BREAK       = {}
  , RETURN      = {};
var exports = module.exports = function(iterable, entries, fn, that, ITERATOR){
  var iterFn = ITERATOR ? function(){ return iterable; } : getIterFn(iterable)
    , f      = ctx(fn, that, entries ? 2 : 1)
    , index  = 0
    , length, step, iterator, result;
  if(typeof iterFn != 'function')throw TypeError(iterable + ' is not iterable!');
  // fast case for arrays with default iterator
  if(isArrayIter(iterFn))for(length = toLength(iterable.length); length > index; index++){
    result = entries ? f(anObject(step = iterable[index])[0], step[1]) : f(iterable[index]);
    if(result === BREAK || result === RETURN)return result;
  } else for(iterator = iterFn.call(iterable); !(step = iterator.next()).done; ){
    result = call(iterator, f, step.value, entries);
    if(result === BREAK || result === RETURN)return result;
  }
};
exports.BREAK  = BREAK;
exports.RETURN = RETURN;

/***/ }),
/* 44 */
/***/ (function(module, exports, __webpack_require__) {

var redefine = __webpack_require__(16);
module.exports = function(target, src, safe){
  for(var key in src)redefine(target, key, src[key], safe);
  return target;
};

/***/ }),
/* 45 */
/***/ (function(module, exports, __webpack_require__) {

var def = __webpack_require__(6).f
  , has = __webpack_require__(11)
  , TAG = __webpack_require__(5)('toStringTag');

module.exports = function(it, tag, stat){
  if(it && !has(it = stat ? it : it.prototype, TAG))def(it, TAG, {configurable: true, value: tag});
};

/***/ }),
/* 46 */
/***/ (function(module, exports, __webpack_require__) {

var $export = __webpack_require__(0)
  , defined = __webpack_require__(21)
  , fails   = __webpack_require__(3)
  , spaces  = __webpack_require__(79)
  , space   = '[' + spaces + ']'
  , non     = '\u200b\u0085'
  , ltrim   = RegExp('^' + space + space + '*')
  , rtrim   = RegExp(space + space + '*$');

var exporter = function(KEY, exec, ALIAS){
  var exp   = {};
  var FORCE = fails(function(){
    return !!spaces[KEY]() || non[KEY]() != non;
  });
  var fn = exp[KEY] = FORCE ? exec(trim) : spaces[KEY];
  if(ALIAS)exp[ALIAS] = fn;
  $export($export.P + $export.F * FORCE, 'String', exp);
};

// 1 -> String#trimLeft
// 2 -> String#trimRight
// 3 -> String#trim
var trim = exporter.trim = function(string, TYPE){
  string = String(defined(string));
  if(TYPE & 1)string = string.replace(ltrim, '');
  if(TYPE & 2)string = string.replace(rtrim, '');
  return string;
};

module.exports = exporter;

/***/ }),
/* 47 */
/***/ (function(module, exports, __webpack_require__) {

// 22.1.3.31 Array.prototype[@@unscopables]
var UNSCOPABLES = __webpack_require__(5)('unscopables')
  , ArrayProto  = Array.prototype;
if(ArrayProto[UNSCOPABLES] == undefined)__webpack_require__(15)(ArrayProto, UNSCOPABLES, {});
module.exports = function(key){
  ArrayProto[UNSCOPABLES][key] = true;
};

/***/ }),
/* 48 */
/***/ (function(module, exports, __webpack_require__) {

// fallback for non-array-like ES3 and non-enumerable old V8 strings
var cof = __webpack_require__(20);
module.exports = Object('z').propertyIsEnumerable(0) ? Object : function(it){
  return cof(it) == 'String' ? it.split('') : Object(it);
};

/***/ }),
/* 49 */
/***/ (function(module, exports) {

exports.f = {}.propertyIsEnumerable;

/***/ }),
/* 50 */
/***/ (function(module, exports, __webpack_require__) {

var classof   = __webpack_require__(39)
  , ITERATOR  = __webpack_require__(5)('iterator')
  , Iterators = __webpack_require__(40);
module.exports = __webpack_require__(14).getIteratorMethod = function(it){
  if(it != undefined)return it[ITERATOR]
    || it['@@iterator']
    || Iterators[classof(it)];
};

/***/ }),
/* 51 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var cmp_1 = __webpack_require__(66);
var errors_1 = __webpack_require__(10);
var valueToKey_1 = __webpack_require__(34);
// http://www.w3.org/TR/2015/REC-IndexedDB-20150108/#range-concept
var FDBKeyRange = (function () {
    function FDBKeyRange(lower, upper, lowerOpen, upperOpen) {
        this.lower = lower;
        this.upper = upper;
        this.lowerOpen = lowerOpen;
        this.upperOpen = upperOpen;
    }
    FDBKeyRange.only = function (value) {
        if (arguments.length === 0) {
            throw new TypeError();
        }
        value = valueToKey_1.default(value);
        return new FDBKeyRange(value, value, false, false);
    };
    FDBKeyRange.lowerBound = function (lower, open) {
        if (open === void 0) { open = false; }
        if (arguments.length === 0) {
            throw new TypeError();
        }
        lower = valueToKey_1.default(lower);
        return new FDBKeyRange(lower, undefined, open, true);
    };
    FDBKeyRange.upperBound = function (upper, open) {
        if (open === void 0) { open = false; }
        if (arguments.length === 0) {
            throw new TypeError();
        }
        upper = valueToKey_1.default(upper);
        return new FDBKeyRange(undefined, upper, true, open);
    };
    FDBKeyRange.bound = function (lower, upper, lowerOpen, upperOpen) {
        if (lowerOpen === void 0) { lowerOpen = false; }
        if (upperOpen === void 0) { upperOpen = false; }
        if (arguments.length < 2) {
            throw new TypeError();
        }
        var cmpResult = cmp_1.default(lower, upper);
        if (cmpResult === 1 || (cmpResult === 0 && (lowerOpen || upperOpen))) {
            throw new errors_1.DataError();
        }
        lower = valueToKey_1.default(lower);
        upper = valueToKey_1.default(upper);
        return new FDBKeyRange(lower, upper, lowerOpen, upperOpen);
    };
    // https://w3c.github.io/IndexedDB/#dom-idbkeyrange-includes
    FDBKeyRange.prototype.includes = function (key) {
        if (arguments.length === 0) {
            throw new TypeError();
        }
        key = valueToKey_1.default(key);
        if (this.lower !== undefined) {
            var cmpResult = cmp_1.default(this.lower, key);
            if (cmpResult === 1 || (cmpResult === 0 && this.lowerOpen)) {
                return false;
            }
        }
        if (this.upper !== undefined) {
            var cmpResult = cmp_1.default(this.upper, key);
            if (cmpResult === -1 || (cmpResult === 0 && this.upperOpen)) {
                return false;
            }
        }
        return true;
    };
    FDBKeyRange.prototype.toString = function () {
        return "[object IDBKeyRange]";
    };
    return FDBKeyRange;
}());
exports.default = FDBKeyRange;


/***/ }),
/* 52 */
/***/ (function(module, exports, __webpack_require__) {

var global = __webpack_require__(2)
  , SHARED = '__core-js_shared__'
  , store  = global[SHARED] || (global[SHARED] = {});
module.exports = function(key){
  return store[key] || (store[key] = {});
};

/***/ }),
/* 53 */
/***/ (function(module, exports, __webpack_require__) {

// false -> Array#indexOf
// true  -> Array#includes
var toIObject = __webpack_require__(12)
  , toLength  = __webpack_require__(8)
  , toIndex   = __webpack_require__(37);
module.exports = function(IS_INCLUDES){
  return function($this, el, fromIndex){
    var O      = toIObject($this)
      , length = toLength(O.length)
      , index  = toIndex(fromIndex, length)
      , value;
    // Array#includes uses SameValueZero equality algorithm
    if(IS_INCLUDES && el != el)while(length > index){
      value = O[index++];
      if(value != value)return true;
    // Array#toIndex ignores holes, Array#includes - not
    } else for(;length > index; index++)if(IS_INCLUDES || index in O){
      if(O[index] === el)return IS_INCLUDES || index || 0;
    } return !IS_INCLUDES && -1;
  };
};

/***/ }),
/* 54 */
/***/ (function(module, exports) {

exports.f = Object.getOwnPropertySymbols;

/***/ }),
/* 55 */
/***/ (function(module, exports) {

// fast apply, http://jsperf.lnkit.com/fast-apply/5
module.exports = function(fn, args, that){
  var un = that === undefined;
  switch(args.length){
    case 0: return un ? fn()
                      : fn.call(that);
    case 1: return un ? fn(args[0])
                      : fn.call(that, args[0]);
    case 2: return un ? fn(args[0], args[1])
                      : fn.call(that, args[0], args[1]);
    case 3: return un ? fn(args[0], args[1], args[2])
                      : fn.call(that, args[0], args[1], args[2]);
    case 4: return un ? fn(args[0], args[1], args[2], args[3])
                      : fn.call(that, args[0], args[1], args[2], args[3]);
  } return              fn.apply(that, args);
};

/***/ }),
/* 56 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var LIBRARY        = __webpack_require__(36)
  , $export        = __webpack_require__(0)
  , redefine       = __webpack_require__(16)
  , hide           = __webpack_require__(15)
  , has            = __webpack_require__(11)
  , Iterators      = __webpack_require__(40)
  , $iterCreate    = __webpack_require__(57)
  , setToStringTag = __webpack_require__(45)
  , getPrototypeOf = __webpack_require__(18)
  , ITERATOR       = __webpack_require__(5)('iterator')
  , BUGGY          = !([].keys && 'next' in [].keys()) // Safari has buggy iterators w/o `next`
  , FF_ITERATOR    = '@@iterator'
  , KEYS           = 'keys'
  , VALUES         = 'values';

var returnThis = function(){ return this; };

module.exports = function(Base, NAME, Constructor, next, DEFAULT, IS_SET, FORCED){
  $iterCreate(Constructor, NAME, next);
  var getMethod = function(kind){
    if(!BUGGY && kind in proto)return proto[kind];
    switch(kind){
      case KEYS: return function keys(){ return new Constructor(this, kind); };
      case VALUES: return function values(){ return new Constructor(this, kind); };
    } return function entries(){ return new Constructor(this, kind); };
  };
  var TAG        = NAME + ' Iterator'
    , DEF_VALUES = DEFAULT == VALUES
    , VALUES_BUG = false
    , proto      = Base.prototype
    , $native    = proto[ITERATOR] || proto[FF_ITERATOR] || DEFAULT && proto[DEFAULT]
    , $default   = $native || getMethod(DEFAULT)
    , $entries   = DEFAULT ? !DEF_VALUES ? $default : getMethod('entries') : undefined
    , $anyNative = NAME == 'Array' ? proto.entries || $native : $native
    , methods, key, IteratorPrototype;
  // Fix native
  if($anyNative){
    IteratorPrototype = getPrototypeOf($anyNative.call(new Base));
    if(IteratorPrototype !== Object.prototype){
      // Set @@toStringTag to native iterators
      setToStringTag(IteratorPrototype, TAG, true);
      // fix for some old engines
      if(!LIBRARY && !has(IteratorPrototype, ITERATOR))hide(IteratorPrototype, ITERATOR, returnThis);
    }
  }
  // fix Array#{values, @@iterator}.name in V8 / FF
  if(DEF_VALUES && $native && $native.name !== VALUES){
    VALUES_BUG = true;
    $default = function values(){ return $native.call(this); };
  }
  // Define iterator
  if((!LIBRARY || FORCED) && (BUGGY || VALUES_BUG || !proto[ITERATOR])){
    hide(proto, ITERATOR, $default);
  }
  // Plug for library
  Iterators[NAME] = $default;
  Iterators[TAG]  = returnThis;
  if(DEFAULT){
    methods = {
      values:  DEF_VALUES ? $default : getMethod(VALUES),
      keys:    IS_SET     ? $default : getMethod(KEYS),
      entries: $entries
    };
    if(FORCED)for(key in methods){
      if(!(key in proto))redefine(proto, key, methods[key]);
    } else $export($export.P + $export.F * (BUGGY || VALUES_BUG), NAME, methods);
  }
  return methods;
};

/***/ }),
/* 57 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var create         = __webpack_require__(28)
  , descriptor     = __webpack_require__(27)
  , setToStringTag = __webpack_require__(45)
  , IteratorPrototype = {};

// 25.1.2.1.1 %IteratorPrototype%[@@iterator]()
__webpack_require__(15)(IteratorPrototype, __webpack_require__(5)('iterator'), function(){ return this; });

module.exports = function(Constructor, NAME, next){
  Constructor.prototype = create(IteratorPrototype, {next: descriptor(1, next)});
  setToStringTag(Constructor, NAME + ' Iterator');
};

/***/ }),
/* 58 */
/***/ (function(module, exports, __webpack_require__) {

// 7.2.8 IsRegExp(argument)
var isObject = __webpack_require__(4)
  , cof      = __webpack_require__(20)
  , MATCH    = __webpack_require__(5)('match');
module.exports = function(it){
  var isRegExp;
  return isObject(it) && ((isRegExp = it[MATCH]) !== undefined ? !!isRegExp : cof(it) == 'RegExp');
};

/***/ }),
/* 59 */
/***/ (function(module, exports, __webpack_require__) {

var ITERATOR     = __webpack_require__(5)('iterator')
  , SAFE_CLOSING = false;

try {
  var riter = [7][ITERATOR]();
  riter['return'] = function(){ SAFE_CLOSING = true; };
  Array.from(riter, function(){ throw 2; });
} catch(e){ /* empty */ }

module.exports = function(exec, skipClosing){
  if(!skipClosing && !SAFE_CLOSING)return false;
  var safe = false;
  try {
    var arr  = [7]
      , iter = arr[ITERATOR]();
    iter.next = function(){ return {done: safe = true}; };
    arr[ITERATOR] = function(){ return iter; };
    exec(arr);
  } catch(e){ /* empty */ }
  return safe;
};

/***/ }),
/* 60 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

// 21.2.5.3 get RegExp.prototype.flags
var anObject = __webpack_require__(1);
module.exports = function(){
  var that   = anObject(this)
    , result = '';
  if(that.global)     result += 'g';
  if(that.ignoreCase) result += 'i';
  if(that.multiline)  result += 'm';
  if(that.unicode)    result += 'u';
  if(that.sticky)     result += 'y';
  return result;
};

/***/ }),
/* 61 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var hide     = __webpack_require__(15)
  , redefine = __webpack_require__(16)
  , fails    = __webpack_require__(3)
  , defined  = __webpack_require__(21)
  , wks      = __webpack_require__(5);

module.exports = function(KEY, length, exec){
  var SYMBOL   = wks(KEY)
    , fns      = exec(defined, SYMBOL, ''[KEY])
    , strfn    = fns[0]
    , rxfn     = fns[1];
  if(fails(function(){
    var O = {};
    O[SYMBOL] = function(){ return 7; };
    return ''[KEY](O) != 7;
  })){
    redefine(String.prototype, KEY, strfn);
    hide(RegExp.prototype, SYMBOL, length == 2
      // 21.2.5.8 RegExp.prototype[@@replace](string, replaceValue)
      // 21.2.5.11 RegExp.prototype[@@split](string, limit)
      ? function(string, arg){ return rxfn.call(string, this, arg); }
      // 21.2.5.6 RegExp.prototype[@@match](string)
      // 21.2.5.9 RegExp.prototype[@@search](string)
      : function(string){ return rxfn.call(string, this); }
    );
  }
};

/***/ }),
/* 62 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var global            = __webpack_require__(2)
  , $export           = __webpack_require__(0)
  , redefine          = __webpack_require__(16)
  , redefineAll       = __webpack_require__(44)
  , meta              = __webpack_require__(31)
  , forOf             = __webpack_require__(43)
  , anInstance        = __webpack_require__(42)
  , isObject          = __webpack_require__(4)
  , fails             = __webpack_require__(3)
  , $iterDetect       = __webpack_require__(59)
  , setToStringTag    = __webpack_require__(45)
  , inheritIfRequired = __webpack_require__(80);

module.exports = function(NAME, wrapper, methods, common, IS_MAP, IS_WEAK){
  var Base  = global[NAME]
    , C     = Base
    , ADDER = IS_MAP ? 'set' : 'add'
    , proto = C && C.prototype
    , O     = {};
  var fixMethod = function(KEY){
    var fn = proto[KEY];
    redefine(proto, KEY,
      KEY == 'delete' ? function(a){
        return IS_WEAK && !isObject(a) ? false : fn.call(this, a === 0 ? 0 : a);
      } : KEY == 'has' ? function has(a){
        return IS_WEAK && !isObject(a) ? false : fn.call(this, a === 0 ? 0 : a);
      } : KEY == 'get' ? function get(a){
        return IS_WEAK && !isObject(a) ? undefined : fn.call(this, a === 0 ? 0 : a);
      } : KEY == 'add' ? function add(a){ fn.call(this, a === 0 ? 0 : a); return this; }
        : function set(a, b){ fn.call(this, a === 0 ? 0 : a, b); return this; }
    );
  };
  if(typeof C != 'function' || !(IS_WEAK || proto.forEach && !fails(function(){
    new C().entries().next();
  }))){
    // create collection constructor
    C = common.getConstructor(wrapper, NAME, IS_MAP, ADDER);
    redefineAll(C.prototype, methods);
    meta.NEED = true;
  } else {
    var instance             = new C
      // early implementations not supports chaining
      , HASNT_CHAINING       = instance[ADDER](IS_WEAK ? {} : -0, 1) != instance
      // V8 ~  Chromium 40- weak-collections throws on primitives, but should return false
      , THROWS_ON_PRIMITIVES = fails(function(){ instance.has(1); })
      // most early implementations doesn't supports iterables, most modern - not close it correctly
      , ACCEPT_ITERABLES     = $iterDetect(function(iter){ new C(iter); }) // eslint-disable-line no-new
      // for early implementations -0 and +0 not the same
      , BUGGY_ZERO = !IS_WEAK && fails(function(){
        // V8 ~ Chromium 42- fails only with 5+ elements
        var $instance = new C()
          , index     = 5;
        while(index--)$instance[ADDER](index, index);
        return !$instance.has(-0);
      });
    if(!ACCEPT_ITERABLES){ 
      C = wrapper(function(target, iterable){
        anInstance(target, C, NAME);
        var that = inheritIfRequired(new Base, target, C);
        if(iterable != undefined)forOf(iterable, IS_MAP, that[ADDER], that);
        return that;
      });
      C.prototype = proto;
      proto.constructor = C;
    }
    if(THROWS_ON_PRIMITIVES || BUGGY_ZERO){
      fixMethod('delete');
      fixMethod('has');
      IS_MAP && fixMethod('get');
    }
    if(BUGGY_ZERO || HASNT_CHAINING)fixMethod(ADDER);
    // weak collections should not contains .clear method
    if(IS_WEAK && proto.clear)delete proto.clear;
  }

  setToStringTag(C, NAME);

  O[NAME] = C;
  $export($export.G + $export.W + $export.F * (C != Base), O);

  if(!IS_WEAK)common.setStrong(C, NAME, IS_MAP);

  return C;
};

/***/ }),
/* 63 */
/***/ (function(module, exports, __webpack_require__) {

var global = __webpack_require__(2)
  , hide   = __webpack_require__(15)
  , uid    = __webpack_require__(35)
  , TYPED  = uid('typed_array')
  , VIEW   = uid('view')
  , ABV    = !!(global.ArrayBuffer && global.DataView)
  , CONSTR = ABV
  , i = 0, l = 9, Typed;

var TypedArrayConstructors = (
  'Int8Array,Uint8Array,Uint8ClampedArray,Int16Array,Uint16Array,Int32Array,Uint32Array,Float32Array,Float64Array'
).split(',');

while(i < l){
  if(Typed = global[TypedArrayConstructors[i++]]){
    hide(Typed.prototype, TYPED, true);
    hide(Typed.prototype, VIEW, true);
  } else CONSTR = false;
}

module.exports = {
  ABV:    ABV,
  CONSTR: CONSTR,
  TYPED:  TYPED,
  VIEW:   VIEW
};

/***/ }),
/* 64 */
/***/ (function(module, exports, __webpack_require__) {

// Forced replacement prototype accessors methods
module.exports = __webpack_require__(36)|| !__webpack_require__(3)(function(){
  var K = Math.random();
  // In FF throws only define methods
  __defineSetter__.call(null, K, function(){ /* empty */});
  delete __webpack_require__(2)[K];
});

/***/ }),
/* 65 */
/***/ (function(module, exports, __webpack_require__) {

var apply = Function.prototype.apply;

// DOM APIs, for completeness

exports.setTimeout = function() {
  return new Timeout(apply.call(setTimeout, window, arguments), clearTimeout);
};
exports.setInterval = function() {
  return new Timeout(apply.call(setInterval, window, arguments), clearInterval);
};
exports.clearTimeout =
exports.clearInterval = function(timeout) {
  if (timeout) {
    timeout.close();
  }
};

function Timeout(id, clearFn) {
  this._id = id;
  this._clearFn = clearFn;
}
Timeout.prototype.unref = Timeout.prototype.ref = function() {};
Timeout.prototype.close = function() {
  this._clearFn.call(window, this._id);
};

// Does not start the time, just sets up the members needed.
exports.enroll = function(item, msecs) {
  clearTimeout(item._idleTimeoutId);
  item._idleTimeout = msecs;
};

exports.unenroll = function(item) {
  clearTimeout(item._idleTimeoutId);
  item._idleTimeout = -1;
};

exports._unrefActive = exports.active = function(item) {
  clearTimeout(item._idleTimeoutId);

  var msecs = item._idleTimeout;
  if (msecs >= 0) {
    item._idleTimeoutId = setTimeout(function onTimeout() {
      if (item._onTimeout)
        item._onTimeout();
    }, msecs);
  }
};

// setimmediate attaches itself to the global object
__webpack_require__(132);
exports.setImmediate = setImmediate;
exports.clearImmediate = clearImmediate;


/***/ }),
/* 66 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var errors_1 = __webpack_require__(10);
var valueToKey_1 = __webpack_require__(34);
var getType = function (x) {
    if (typeof x === "number") {
        return "Number";
    }
    if (x instanceof Date) {
        return "Date";
    }
    if (Array.isArray(x)) {
        return "Array";
    }
    if (typeof x === "string") {
        return "String";
    }
    if (x instanceof ArrayBuffer) {
        return "Binary";
    }
    throw new errors_1.DataError();
};
// https://w3c.github.io/IndexedDB/#compare-two-keys
var cmp = function (first, second) {
    if (second === undefined) {
        throw new TypeError();
    }
    first = valueToKey_1.default(first);
    second = valueToKey_1.default(second);
    var t1 = getType(first);
    var t2 = getType(second);
    if (t1 !== t2) {
        if (t1 === "Array") {
            return 1;
        }
        if (t1 === "Binary" && (t2 === "String" || t2 === "Date" || t2 === "Number")) {
            return 1;
        }
        if (t1 === "String" && (t2 === "Date" || t2 === "Number")) {
            return 1;
        }
        if (t1 === "Date" && t2 === "Number") {
            return 1;
        }
        return -1;
    }
    if (t1 === "Binary") {
        first = new Uint8Array(first);
        second = new Uint8Array(second);
    }
    if (t1 === "Array" || t1 === "Binary") {
        var length_1 = Math.min(first.length, second.length);
        for (var i = 0; i < length_1; i++) {
            var result = cmp(first[i], second[i]);
            if (result !== 0) {
                return result;
            }
        }
        if (first.length > second.length) {
            return 1;
        }
        if (first.length < second.length) {
            return -1;
        }
        return 0;
    }
    if (t1 === "Date") {
        if (first.getTime() === second.getTime()) {
            return 0;
        }
    }
    else {
        if (first === second) {
            return 0;
        }
    }
    return first > second ? 1 : -1;
};
exports.default = cmp;


/***/ }),
/* 67 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __values = (this && this.__values) || function (o) {
    var m = typeof Symbol === "function" && o[Symbol.iterator], i = 0;
    if (m) return m.call(o);
    return {
        next: function () {
            if (o && i >= o.length) o = void 0;
            return { value: o && o[i++], done: !o };
        }
    };
};
Object.defineProperty(exports, "__esModule", { value: true });
var valueToKey_1 = __webpack_require__(34);
// http://www.w3.org/TR/2015/REC-IndexedDB-20150108/#dfn-steps-for-extracting-a-key-from-a-value-using-a-key-path
var extractKey = function (keyPath, value) {
    if (Array.isArray(keyPath)) {
        var result = [];
        try {
            for (var keyPath_1 = __values(keyPath), keyPath_1_1 = keyPath_1.next(); !keyPath_1_1.done; keyPath_1_1 = keyPath_1.next()) {
                var item = keyPath_1_1.value;
                // This doesn't make sense to me based on the spec, but it is needed to pass the W3C KeyPath tests (see same
                // comment in validateKeyPath)
                if (item !== undefined && item !== null && typeof item !== "string" && item.toString) {
                    item = item.toString();
                }
                result.push(valueToKey_1.default(extractKey(item, value)));
            }
        }
        catch (e_1_1) { e_1 = { error: e_1_1 }; }
        finally {
            try {
                if (keyPath_1_1 && !keyPath_1_1.done && (_a = keyPath_1.return)) _a.call(keyPath_1);
            }
            finally { if (e_1) throw e_1.error; }
        }
        return result;
    }
    if (keyPath === "") {
        return value;
    }
    var remainingKeyPath = keyPath;
    var object = value;
    while (remainingKeyPath !== null) {
        var identifier = void 0;
        var i = remainingKeyPath.indexOf(".");
        if (i >= 0) {
            identifier = remainingKeyPath.slice(0, i);
            remainingKeyPath = remainingKeyPath.slice(i + 1);
        }
        else {
            identifier = remainingKeyPath;
            remainingKeyPath = null;
        }
        if (!object.hasOwnProperty(identifier)) {
            return;
        }
        object = object[identifier];
    }
    return object;
    var e_1, _a;
};
exports.default = extractKey;


/***/ }),
/* 68 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var realisticStructuredClone = __webpack_require__(334); // tslint:disable-line no-var-requires
var errors_1 = __webpack_require__(10);
var structuredClone = function (input) {
    try {
        return realisticStructuredClone(input);
    }
    catch (err) {
        throw new errors_1.DataCloneError();
    }
};
exports.default = structuredClone;


/***/ }),
/* 69 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var errors_1 = __webpack_require__(10);
var FakeEventTarget_1 = __webpack_require__(100);
var FDBRequest = (function (_super) {
    __extends(FDBRequest, _super);
    function FDBRequest() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this._result = null;
        _this._error = null;
        _this.source = null;
        _this.transaction = null;
        _this.readyState = "pending";
        _this.onsuccess = null;
        _this.onerror = null;
        return _this;
    }
    Object.defineProperty(FDBRequest.prototype, "error", {
        get: function () {
            if (this.readyState === "pending") {
                throw new errors_1.InvalidStateError();
            }
            return this._error;
        },
        set: function (value) {
            this._error = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(FDBRequest.prototype, "result", {
        get: function () {
            if (this.readyState === "pending") {
                throw new errors_1.InvalidStateError();
            }
            return this._result;
        },
        set: function (value) {
            this._result = value;
        },
        enumerable: true,
        configurable: true
    });
    FDBRequest.prototype.toString = function () {
        return "[object IDBRequest]";
    };
    return FDBRequest;
}(FakeEventTarget_1.default));
exports.default = FDBRequest;


/***/ }),
/* 70 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
// Would be nicer to sublcass Array, but I'd have to sacrifice Node 4 support to do that.
var fakeDOMStringList = function (arr) {
    var arr2 = arr.slice();
    Object.defineProperty(arr2, "contains", {
        // tslint:disable-next-line object-literal-shorthand
        value: function (value) { return arr2.indexOf(value) >= 0; },
    });
    Object.defineProperty(arr2, "item", {
        // tslint:disable-next-line object-literal-shorthand
        value: function (i) { return arr2[i]; },
    });
    return arr2;
};
exports.default = fakeDOMStringList;


/***/ }),
/* 71 */
/***/ (function(module, exports, __webpack_require__) {

var isObject = __webpack_require__(4)
  , document = __webpack_require__(2).document
  // in old IE typeof document.createElement is 'object'
  , is = isObject(document) && isObject(document.createElement);
module.exports = function(it){
  return is ? document.createElement(it) : {};
};

/***/ }),
/* 72 */
/***/ (function(module, exports, __webpack_require__) {

var global         = __webpack_require__(2)
  , core           = __webpack_require__(14)
  , LIBRARY        = __webpack_require__(36)
  , wksExt         = __webpack_require__(104)
  , defineProperty = __webpack_require__(6).f;
module.exports = function(name){
  var $Symbol = core.Symbol || (core.Symbol = LIBRARY ? {} : global.Symbol || {});
  if(name.charAt(0) != '_' && !(name in $Symbol))defineProperty($Symbol, name, {value: wksExt.f(name)});
};

/***/ }),
/* 73 */
/***/ (function(module, exports, __webpack_require__) {

var shared = __webpack_require__(52)('keys')
  , uid    = __webpack_require__(35);
module.exports = function(key){
  return shared[key] || (shared[key] = uid(key));
};

/***/ }),
/* 74 */
/***/ (function(module, exports) {

// IE 8- don't enum bug keys
module.exports = (
  'constructor,hasOwnProperty,isPrototypeOf,propertyIsEnumerable,toLocaleString,toString,valueOf'
).split(',');

/***/ }),
/* 75 */
/***/ (function(module, exports, __webpack_require__) {

// 7.2.2 IsArray(argument)
var cof = __webpack_require__(20);
module.exports = Array.isArray || function isArray(arg){
  return cof(arg) == 'Array';
};

/***/ }),
/* 76 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(2).document && document.documentElement;

/***/ }),
/* 77 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

// 19.1.2.1 Object.assign(target, source, ...)
var getKeys  = __webpack_require__(32)
  , gOPS     = __webpack_require__(54)
  , pIE      = __webpack_require__(49)
  , toObject = __webpack_require__(9)
  , IObject  = __webpack_require__(48)
  , $assign  = Object.assign;

// should work with symbols and should have deterministic property order (V8 bug)
module.exports = !$assign || __webpack_require__(3)(function(){
  var A = {}
    , B = {}
    , S = Symbol()
    , K = 'abcdefghijklmnopqrst';
  A[S] = 7;
  K.split('').forEach(function(k){ B[k] = k; });
  return $assign({}, A)[S] != 7 || Object.keys($assign({}, B)).join('') != K;
}) ? function assign(target, source){ // eslint-disable-line no-unused-vars
  var T     = toObject(target)
    , aLen  = arguments.length
    , index = 1
    , getSymbols = gOPS.f
    , isEnum     = pIE.f;
  while(aLen > index){
    var S      = IObject(arguments[index++])
      , keys   = getSymbols ? getKeys(S).concat(getSymbols(S)) : getKeys(S)
      , length = keys.length
      , j      = 0
      , key;
    while(length > j)if(isEnum.call(S, key = keys[j++]))T[key] = S[key];
  } return T;
} : $assign;

/***/ }),
/* 78 */
/***/ (function(module, exports, __webpack_require__) {

// Works with __proto__ only. Old v8 can't work with null proto objects.
/* eslint-disable no-proto */
var isObject = __webpack_require__(4)
  , anObject = __webpack_require__(1);
var check = function(O, proto){
  anObject(O);
  if(!isObject(proto) && proto !== null)throw TypeError(proto + ": can't set as prototype!");
};
module.exports = {
  set: Object.setPrototypeOf || ('__proto__' in {} ? // eslint-disable-line
    function(test, buggy, set){
      try {
        set = __webpack_require__(24)(Function.call, __webpack_require__(17).f(Object.prototype, '__proto__').set, 2);
        set(test, []);
        buggy = !(test instanceof Array);
      } catch(e){ buggy = true; }
      return function setPrototypeOf(O, proto){
        check(O, proto);
        if(buggy)O.__proto__ = proto;
        else set(O, proto);
        return O;
      };
    }({}, false) : undefined),
  check: check
};

/***/ }),
/* 79 */
/***/ (function(module, exports) {

module.exports = '\x09\x0A\x0B\x0C\x0D\x20\xA0\u1680\u180E\u2000\u2001\u2002\u2003' +
  '\u2004\u2005\u2006\u2007\u2008\u2009\u200A\u202F\u205F\u3000\u2028\u2029\uFEFF';

/***/ }),
/* 80 */
/***/ (function(module, exports, __webpack_require__) {

var isObject       = __webpack_require__(4)
  , setPrototypeOf = __webpack_require__(78).set;
module.exports = function(that, target, C){
  var P, S = target.constructor;
  if(S !== C && typeof S == 'function' && (P = S.prototype) !== C.prototype && isObject(P) && setPrototypeOf){
    setPrototypeOf(that, P);
  } return that;
};

/***/ }),
/* 81 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var toInteger = __webpack_require__(33)
  , defined   = __webpack_require__(21);

module.exports = function repeat(count){
  var str = String(defined(this))
    , res = ''
    , n   = toInteger(count);
  if(n < 0 || n == Infinity)throw RangeError("Count can't be negative");
  for(;n > 0; (n >>>= 1) && (str += str))if(n & 1)res += str;
  return res;
};

/***/ }),
/* 82 */
/***/ (function(module, exports) {

// 20.2.2.28 Math.sign(x)
module.exports = Math.sign || function sign(x){
  return (x = +x) == 0 || x != x ? x : x < 0 ? -1 : 1;
};

/***/ }),
/* 83 */
/***/ (function(module, exports) {

// 20.2.2.14 Math.expm1(x)
var $expm1 = Math.expm1;
module.exports = (!$expm1
  // Old FF bug
  || $expm1(10) > 22025.465794806719 || $expm1(10) < 22025.4657948067165168
  // Tor Browser bug
  || $expm1(-2e-17) != -2e-17
) ? function expm1(x){
  return (x = +x) == 0 ? x : x > -1e-6 && x < 1e-6 ? x + x * x / 2 : Math.exp(x) - 1;
} : $expm1;

/***/ }),
/* 84 */
/***/ (function(module, exports, __webpack_require__) {

var toInteger = __webpack_require__(33)
  , defined   = __webpack_require__(21);
// true  -> String#at
// false -> String#codePointAt
module.exports = function(TO_STRING){
  return function(that, pos){
    var s = String(defined(that))
      , i = toInteger(pos)
      , l = s.length
      , a, b;
    if(i < 0 || i >= l)return TO_STRING ? '' : undefined;
    a = s.charCodeAt(i);
    return a < 0xd800 || a > 0xdbff || i + 1 === l || (b = s.charCodeAt(i + 1)) < 0xdc00 || b > 0xdfff
      ? TO_STRING ? s.charAt(i) : a
      : TO_STRING ? s.slice(i, i + 2) : (a - 0xd800 << 10) + (b - 0xdc00) + 0x10000;
  };
};

/***/ }),
/* 85 */
/***/ (function(module, exports, __webpack_require__) {

// helper for String#{startsWith, endsWith, includes}
var isRegExp = __webpack_require__(58)
  , defined  = __webpack_require__(21);

module.exports = function(that, searchString, NAME){
  if(isRegExp(searchString))throw TypeError('String#' + NAME + " doesn't accept regex!");
  return String(defined(that));
};

/***/ }),
/* 86 */
/***/ (function(module, exports, __webpack_require__) {

var MATCH = __webpack_require__(5)('match');
module.exports = function(KEY){
  var re = /./;
  try {
    '/./'[KEY](re);
  } catch(e){
    try {
      re[MATCH] = false;
      return !'/./'[KEY](re);
    } catch(f){ /* empty */ }
  } return true;
};

/***/ }),
/* 87 */
/***/ (function(module, exports, __webpack_require__) {

// check on default Array iterator
var Iterators  = __webpack_require__(40)
  , ITERATOR   = __webpack_require__(5)('iterator')
  , ArrayProto = Array.prototype;

module.exports = function(it){
  return it !== undefined && (Iterators.Array === it || ArrayProto[ITERATOR] === it);
};

/***/ }),
/* 88 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var $defineProperty = __webpack_require__(6)
  , createDesc      = __webpack_require__(27);

module.exports = function(object, index, value){
  if(index in object)$defineProperty.f(object, index, createDesc(0, value));
  else object[index] = value;
};

/***/ }),
/* 89 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
// 22.1.3.6 Array.prototype.fill(value, start = 0, end = this.length)

var toObject = __webpack_require__(9)
  , toIndex  = __webpack_require__(37)
  , toLength = __webpack_require__(8);
module.exports = function fill(value /*, start = 0, end = @length */){
  var O      = toObject(this)
    , length = toLength(O.length)
    , aLen   = arguments.length
    , index  = toIndex(aLen > 1 ? arguments[1] : undefined, length)
    , end    = aLen > 2 ? arguments[2] : undefined
    , endPos = end === undefined ? length : toIndex(end, length);
  while(endPos > index)O[index++] = value;
  return O;
};

/***/ }),
/* 90 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var addToUnscopables = __webpack_require__(47)
  , step             = __webpack_require__(91)
  , Iterators        = __webpack_require__(40)
  , toIObject        = __webpack_require__(12);

// 22.1.3.4 Array.prototype.entries()
// 22.1.3.13 Array.prototype.keys()
// 22.1.3.29 Array.prototype.values()
// 22.1.3.30 Array.prototype[@@iterator]()
module.exports = __webpack_require__(56)(Array, 'Array', function(iterated, kind){
  this._t = toIObject(iterated); // target
  this._i = 0;                   // next index
  this._k = kind;                // kind
// 22.1.5.2.1 %ArrayIteratorPrototype%.next()
}, function(){
  var O     = this._t
    , kind  = this._k
    , index = this._i++;
  if(!O || index >= O.length){
    this._t = undefined;
    return step(1);
  }
  if(kind == 'keys'  )return step(0, index);
  if(kind == 'values')return step(0, O[index]);
  return step(0, [index, O[index]]);
}, 'values');

// argumentsList[@@iterator] is %ArrayProto_values% (9.4.4.6, 9.4.4.7)
Iterators.Arguments = Iterators.Array;

addToUnscopables('keys');
addToUnscopables('values');
addToUnscopables('entries');

/***/ }),
/* 91 */
/***/ (function(module, exports) {

module.exports = function(done, value){
  return {value: value, done: !!done};
};

/***/ }),
/* 92 */
/***/ (function(module, exports, __webpack_require__) {

// 7.3.20 SpeciesConstructor(O, defaultConstructor)
var anObject  = __webpack_require__(1)
  , aFunction = __webpack_require__(13)
  , SPECIES   = __webpack_require__(5)('species');
module.exports = function(O, D){
  var C = anObject(O).constructor, S;
  return C === undefined || (S = anObject(C)[SPECIES]) == undefined ? D : aFunction(S);
};

/***/ }),
/* 93 */
/***/ (function(module, exports, __webpack_require__) {

var ctx                = __webpack_require__(24)
  , invoke             = __webpack_require__(55)
  , html               = __webpack_require__(76)
  , cel                = __webpack_require__(71)
  , global             = __webpack_require__(2)
  , process            = global.process
  , setTask            = global.setImmediate
  , clearTask          = global.clearImmediate
  , MessageChannel     = global.MessageChannel
  , counter            = 0
  , queue              = {}
  , ONREADYSTATECHANGE = 'onreadystatechange'
  , defer, channel, port;
var run = function(){
  var id = +this;
  if(queue.hasOwnProperty(id)){
    var fn = queue[id];
    delete queue[id];
    fn();
  }
};
var listener = function(event){
  run.call(event.data);
};
// Node.js 0.9+ & IE10+ has setImmediate, otherwise:
if(!setTask || !clearTask){
  setTask = function setImmediate(fn){
    var args = [], i = 1;
    while(arguments.length > i)args.push(arguments[i++]);
    queue[++counter] = function(){
      invoke(typeof fn == 'function' ? fn : Function(fn), args);
    };
    defer(counter);
    return counter;
  };
  clearTask = function clearImmediate(id){
    delete queue[id];
  };
  // Node.js 0.8-
  if(__webpack_require__(20)(process) == 'process'){
    defer = function(id){
      process.nextTick(ctx(run, id, 1));
    };
  // Browsers with MessageChannel, includes WebWorkers
  } else if(MessageChannel){
    channel = new MessageChannel;
    port    = channel.port2;
    channel.port1.onmessage = listener;
    defer = ctx(port.postMessage, port, 1);
  // Browsers with postMessage, skip WebWorkers
  // IE8 has postMessage, but it's sync & typeof its postMessage is 'object'
  } else if(global.addEventListener && typeof postMessage == 'function' && !global.importScripts){
    defer = function(id){
      global.postMessage(id + '', '*');
    };
    global.addEventListener('message', listener, false);
  // IE8-
  } else if(ONREADYSTATECHANGE in cel('script')){
    defer = function(id){
      html.appendChild(cel('script'))[ONREADYSTATECHANGE] = function(){
        html.removeChild(this);
        run.call(id);
      };
    };
  // Rest old browsers
  } else {
    defer = function(id){
      setTimeout(ctx(run, id, 1), 0);
    };
  }
}
module.exports = {
  set:   setTask,
  clear: clearTask
};

/***/ }),
/* 94 */
/***/ (function(module, exports, __webpack_require__) {

var global    = __webpack_require__(2)
  , macrotask = __webpack_require__(93).set
  , Observer  = global.MutationObserver || global.WebKitMutationObserver
  , process   = global.process
  , Promise   = global.Promise
  , isNode    = __webpack_require__(20)(process) == 'process';

module.exports = function(){
  var head, last, notify;

  var flush = function(){
    var parent, fn;
    if(isNode && (parent = process.domain))parent.exit();
    while(head){
      fn   = head.fn;
      head = head.next;
      try {
        fn();
      } catch(e){
        if(head)notify();
        else last = undefined;
        throw e;
      }
    } last = undefined;
    if(parent)parent.enter();
  };

  // Node.js
  if(isNode){
    notify = function(){
      process.nextTick(flush);
    };
  // browsers with MutationObserver
  } else if(Observer){
    var toggle = true
      , node   = document.createTextNode('');
    new Observer(flush).observe(node, {characterData: true}); // eslint-disable-line no-new
    notify = function(){
      node.data = toggle = !toggle;
    };
  // environments with maybe non-completely correct, but existent Promise
  } else if(Promise && Promise.resolve){
    var promise = Promise.resolve();
    notify = function(){
      promise.then(flush);
    };
  // for other environments - macrotask based on:
  // - setImmediate
  // - MessageChannel
  // - window.postMessag
  // - onreadystatechange
  // - setTimeout
  } else {
    notify = function(){
      // strange IE + webpack dev server bug - use .call(global)
      macrotask.call(global, flush);
    };
  }

  return function(fn){
    var task = {fn: fn, next: undefined};
    if(last)last.next = task;
    if(!head){
      head = task;
      notify();
    } last = task;
  };
};

/***/ }),
/* 95 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var global         = __webpack_require__(2)
  , DESCRIPTORS    = __webpack_require__(7)
  , LIBRARY        = __webpack_require__(36)
  , $typed         = __webpack_require__(63)
  , hide           = __webpack_require__(15)
  , redefineAll    = __webpack_require__(44)
  , fails          = __webpack_require__(3)
  , anInstance     = __webpack_require__(42)
  , toInteger      = __webpack_require__(33)
  , toLength       = __webpack_require__(8)
  , gOPN           = __webpack_require__(38).f
  , dP             = __webpack_require__(6).f
  , arrayFill      = __webpack_require__(89)
  , setToStringTag = __webpack_require__(45)
  , ARRAY_BUFFER   = 'ArrayBuffer'
  , DATA_VIEW      = 'DataView'
  , PROTOTYPE      = 'prototype'
  , WRONG_LENGTH   = 'Wrong length!'
  , WRONG_INDEX    = 'Wrong index!'
  , $ArrayBuffer   = global[ARRAY_BUFFER]
  , $DataView      = global[DATA_VIEW]
  , Math           = global.Math
  , RangeError     = global.RangeError
  , Infinity       = global.Infinity
  , BaseBuffer     = $ArrayBuffer
  , abs            = Math.abs
  , pow            = Math.pow
  , floor          = Math.floor
  , log            = Math.log
  , LN2            = Math.LN2
  , BUFFER         = 'buffer'
  , BYTE_LENGTH    = 'byteLength'
  , BYTE_OFFSET    = 'byteOffset'
  , $BUFFER        = DESCRIPTORS ? '_b' : BUFFER
  , $LENGTH        = DESCRIPTORS ? '_l' : BYTE_LENGTH
  , $OFFSET        = DESCRIPTORS ? '_o' : BYTE_OFFSET;

// IEEE754 conversions based on https://github.com/feross/ieee754
var packIEEE754 = function(value, mLen, nBytes){
  var buffer = Array(nBytes)
    , eLen   = nBytes * 8 - mLen - 1
    , eMax   = (1 << eLen) - 1
    , eBias  = eMax >> 1
    , rt     = mLen === 23 ? pow(2, -24) - pow(2, -77) : 0
    , i      = 0
    , s      = value < 0 || value === 0 && 1 / value < 0 ? 1 : 0
    , e, m, c;
  value = abs(value)
  if(value != value || value === Infinity){
    m = value != value ? 1 : 0;
    e = eMax;
  } else {
    e = floor(log(value) / LN2);
    if(value * (c = pow(2, -e)) < 1){
      e--;
      c *= 2;
    }
    if(e + eBias >= 1){
      value += rt / c;
    } else {
      value += rt * pow(2, 1 - eBias);
    }
    if(value * c >= 2){
      e++;
      c /= 2;
    }
    if(e + eBias >= eMax){
      m = 0;
      e = eMax;
    } else if(e + eBias >= 1){
      m = (value * c - 1) * pow(2, mLen);
      e = e + eBias;
    } else {
      m = value * pow(2, eBias - 1) * pow(2, mLen);
      e = 0;
    }
  }
  for(; mLen >= 8; buffer[i++] = m & 255, m /= 256, mLen -= 8);
  e = e << mLen | m;
  eLen += mLen;
  for(; eLen > 0; buffer[i++] = e & 255, e /= 256, eLen -= 8);
  buffer[--i] |= s * 128;
  return buffer;
};
var unpackIEEE754 = function(buffer, mLen, nBytes){
  var eLen  = nBytes * 8 - mLen - 1
    , eMax  = (1 << eLen) - 1
    , eBias = eMax >> 1
    , nBits = eLen - 7
    , i     = nBytes - 1
    , s     = buffer[i--]
    , e     = s & 127
    , m;
  s >>= 7;
  for(; nBits > 0; e = e * 256 + buffer[i], i--, nBits -= 8);
  m = e & (1 << -nBits) - 1;
  e >>= -nBits;
  nBits += mLen;
  for(; nBits > 0; m = m * 256 + buffer[i], i--, nBits -= 8);
  if(e === 0){
    e = 1 - eBias;
  } else if(e === eMax){
    return m ? NaN : s ? -Infinity : Infinity;
  } else {
    m = m + pow(2, mLen);
    e = e - eBias;
  } return (s ? -1 : 1) * m * pow(2, e - mLen);
};

var unpackI32 = function(bytes){
  return bytes[3] << 24 | bytes[2] << 16 | bytes[1] << 8 | bytes[0];
};
var packI8 = function(it){
  return [it & 0xff];
};
var packI16 = function(it){
  return [it & 0xff, it >> 8 & 0xff];
};
var packI32 = function(it){
  return [it & 0xff, it >> 8 & 0xff, it >> 16 & 0xff, it >> 24 & 0xff];
};
var packF64 = function(it){
  return packIEEE754(it, 52, 8);
};
var packF32 = function(it){
  return packIEEE754(it, 23, 4);
};

var addGetter = function(C, key, internal){
  dP(C[PROTOTYPE], key, {get: function(){ return this[internal]; }});
};

var get = function(view, bytes, index, isLittleEndian){
  var numIndex = +index
    , intIndex = toInteger(numIndex);
  if(numIndex != intIndex || intIndex < 0 || intIndex + bytes > view[$LENGTH])throw RangeError(WRONG_INDEX);
  var store = view[$BUFFER]._b
    , start = intIndex + view[$OFFSET]
    , pack  = store.slice(start, start + bytes);
  return isLittleEndian ? pack : pack.reverse();
};
var set = function(view, bytes, index, conversion, value, isLittleEndian){
  var numIndex = +index
    , intIndex = toInteger(numIndex);
  if(numIndex != intIndex || intIndex < 0 || intIndex + bytes > view[$LENGTH])throw RangeError(WRONG_INDEX);
  var store = view[$BUFFER]._b
    , start = intIndex + view[$OFFSET]
    , pack  = conversion(+value);
  for(var i = 0; i < bytes; i++)store[start + i] = pack[isLittleEndian ? i : bytes - i - 1];
};

var validateArrayBufferArguments = function(that, length){
  anInstance(that, $ArrayBuffer, ARRAY_BUFFER);
  var numberLength = +length
    , byteLength   = toLength(numberLength);
  if(numberLength != byteLength)throw RangeError(WRONG_LENGTH);
  return byteLength;
};

if(!$typed.ABV){
  $ArrayBuffer = function ArrayBuffer(length){
    var byteLength = validateArrayBufferArguments(this, length);
    this._b       = arrayFill.call(Array(byteLength), 0);
    this[$LENGTH] = byteLength;
  };

  $DataView = function DataView(buffer, byteOffset, byteLength){
    anInstance(this, $DataView, DATA_VIEW);
    anInstance(buffer, $ArrayBuffer, DATA_VIEW);
    var bufferLength = buffer[$LENGTH]
      , offset       = toInteger(byteOffset);
    if(offset < 0 || offset > bufferLength)throw RangeError('Wrong offset!');
    byteLength = byteLength === undefined ? bufferLength - offset : toLength(byteLength);
    if(offset + byteLength > bufferLength)throw RangeError(WRONG_LENGTH);
    this[$BUFFER] = buffer;
    this[$OFFSET] = offset;
    this[$LENGTH] = byteLength;
  };

  if(DESCRIPTORS){
    addGetter($ArrayBuffer, BYTE_LENGTH, '_l');
    addGetter($DataView, BUFFER, '_b');
    addGetter($DataView, BYTE_LENGTH, '_l');
    addGetter($DataView, BYTE_OFFSET, '_o');
  }

  redefineAll($DataView[PROTOTYPE], {
    getInt8: function getInt8(byteOffset){
      return get(this, 1, byteOffset)[0] << 24 >> 24;
    },
    getUint8: function getUint8(byteOffset){
      return get(this, 1, byteOffset)[0];
    },
    getInt16: function getInt16(byteOffset /*, littleEndian */){
      var bytes = get(this, 2, byteOffset, arguments[1]);
      return (bytes[1] << 8 | bytes[0]) << 16 >> 16;
    },
    getUint16: function getUint16(byteOffset /*, littleEndian */){
      var bytes = get(this, 2, byteOffset, arguments[1]);
      return bytes[1] << 8 | bytes[0];
    },
    getInt32: function getInt32(byteOffset /*, littleEndian */){
      return unpackI32(get(this, 4, byteOffset, arguments[1]));
    },
    getUint32: function getUint32(byteOffset /*, littleEndian */){
      return unpackI32(get(this, 4, byteOffset, arguments[1])) >>> 0;
    },
    getFloat32: function getFloat32(byteOffset /*, littleEndian */){
      return unpackIEEE754(get(this, 4, byteOffset, arguments[1]), 23, 4);
    },
    getFloat64: function getFloat64(byteOffset /*, littleEndian */){
      return unpackIEEE754(get(this, 8, byteOffset, arguments[1]), 52, 8);
    },
    setInt8: function setInt8(byteOffset, value){
      set(this, 1, byteOffset, packI8, value);
    },
    setUint8: function setUint8(byteOffset, value){
      set(this, 1, byteOffset, packI8, value);
    },
    setInt16: function setInt16(byteOffset, value /*, littleEndian */){
      set(this, 2, byteOffset, packI16, value, arguments[2]);
    },
    setUint16: function setUint16(byteOffset, value /*, littleEndian */){
      set(this, 2, byteOffset, packI16, value, arguments[2]);
    },
    setInt32: function setInt32(byteOffset, value /*, littleEndian */){
      set(this, 4, byteOffset, packI32, value, arguments[2]);
    },
    setUint32: function setUint32(byteOffset, value /*, littleEndian */){
      set(this, 4, byteOffset, packI32, value, arguments[2]);
    },
    setFloat32: function setFloat32(byteOffset, value /*, littleEndian */){
      set(this, 4, byteOffset, packF32, value, arguments[2]);
    },
    setFloat64: function setFloat64(byteOffset, value /*, littleEndian */){
      set(this, 8, byteOffset, packF64, value, arguments[2]);
    }
  });
} else {
  if(!fails(function(){
    new $ArrayBuffer;     // eslint-disable-line no-new
  }) || !fails(function(){
    new $ArrayBuffer(.5); // eslint-disable-line no-new
  })){
    $ArrayBuffer = function ArrayBuffer(length){
      return new BaseBuffer(validateArrayBufferArguments(this, length));
    };
    var ArrayBufferProto = $ArrayBuffer[PROTOTYPE] = BaseBuffer[PROTOTYPE];
    for(var keys = gOPN(BaseBuffer), j = 0, key; keys.length > j; ){
      if(!((key = keys[j++]) in $ArrayBuffer))hide($ArrayBuffer, key, BaseBuffer[key]);
    };
    if(!LIBRARY)ArrayBufferProto.constructor = $ArrayBuffer;
  }
  // iOS Safari 7.x bug
  var view = new $DataView(new $ArrayBuffer(2))
    , $setInt8 = $DataView[PROTOTYPE].setInt8;
  view.setInt8(0, 2147483648);
  view.setInt8(1, 2147483649);
  if(view.getInt8(0) || !view.getInt8(1))redefineAll($DataView[PROTOTYPE], {
    setInt8: function setInt8(byteOffset, value){
      $setInt8.call(this, byteOffset, value << 24 >> 24);
    },
    setUint8: function setUint8(byteOffset, value){
      $setInt8.call(this, byteOffset, value << 24 >> 24);
    }
  }, true);
}
setToStringTag($ArrayBuffer, ARRAY_BUFFER);
setToStringTag($DataView, DATA_VIEW);
hide($DataView[PROTOTYPE], $typed.VIEW, true);
exports[ARRAY_BUFFER] = $ArrayBuffer;
exports[DATA_VIEW] = $DataView;

/***/ }),
/* 96 */
/***/ (function(module, exports, __webpack_require__) {

// all object keys, includes non-enumerable and symbols
var gOPN     = __webpack_require__(38)
  , gOPS     = __webpack_require__(54)
  , anObject = __webpack_require__(1)
  , Reflect  = __webpack_require__(2).Reflect;
module.exports = Reflect && Reflect.ownKeys || function ownKeys(it){
  var keys       = gOPN.f(anObject(it))
    , getSymbols = gOPS.f;
  return getSymbols ? keys.concat(getSymbols(it)) : keys;
};

/***/ }),
/* 97 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var path      = __webpack_require__(129)
  , invoke    = __webpack_require__(55)
  , aFunction = __webpack_require__(13);
module.exports = function(/* ...pargs */){
  var fn     = aFunction(this)
    , length = arguments.length
    , pargs  = Array(length)
    , i      = 0
    , _      = path._
    , holder = false;
  while(length > i)if((pargs[i] = arguments[i++]) === _)holder = true;
  return function(/* ...args */){
    var that = this
      , aLen = arguments.length
      , j = 0, k = 0, args;
    if(!holder && !aLen)return invoke(fn, pargs, that);
    args = pargs.slice();
    if(holder)for(;length > j; j++)if(args[j] === _)args[j] = arguments[k++];
    while(aLen > k)args.push(arguments[k++]);
    return invoke(fn, args, that);
  };
};

/***/ }),
/* 98 */
/***/ (function(module, exports) {

module.exports = function(regExp, replace){
  var replacer = replace === Object(replace) ? function(part){
    return replace[part];
  } : replace;
  return function(it){
    return String(it).replace(regExp, replacer);
  };
};

/***/ }),
/* 99 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __values = (this && this.__values) || function (o) {
    var m = typeof Symbol === "function" && o[Symbol.iterator], i = 0;
    if (m) return m.call(o);
    return {
        next: function () {
            if (o && i >= o.length) o = void 0;
            return { value: o && o[i++], done: !o };
        }
    };
};
Object.defineProperty(exports, "__esModule", { value: true });
var FDBKeyRange_1 = __webpack_require__(51);
var FDBObjectStore_1 = __webpack_require__(135);
var cmp_1 = __webpack_require__(66);
var errors_1 = __webpack_require__(10);
var extractKey_1 = __webpack_require__(67);
var structuredClone_1 = __webpack_require__(68);
var valueToKey_1 = __webpack_require__(34);
var getEffectiveObjectStore = function (cursor) {
    if (cursor.source instanceof FDBObjectStore_1.default) {
        return cursor.source;
    }
    return cursor.source.objectStore;
};
// This takes a key range, a list of lower bounds, and a list of upper bounds and combines them all into a single key
// range. It does not handle gt/gte distinctions, because it doesn't really matter much anyway, since for next/prev
// cursor iteration it'd also have to look at values to be precise, which would be complicated. This should get us 99%
// of the way there.
var makeKeyRange = function (range, lowers, uppers) {
    // Start with bounds from range
    var lower = range !== undefined ? range.lower : undefined;
    var upper = range !== undefined ? range.upper : undefined;
    try {
        // Augment with values from lowers and uppers
        for (var lowers_1 = __values(lowers), lowers_1_1 = lowers_1.next(); !lowers_1_1.done; lowers_1_1 = lowers_1.next()) {
            var lowerTemp = lowers_1_1.value;
            if (lowerTemp === undefined) {
                continue;
            }
            if (lower === undefined || cmp_1.default(lower, lowerTemp) === 1) {
                lower = lowerTemp;
            }
        }
    }
    catch (e_1_1) { e_1 = { error: e_1_1 }; }
    finally {
        try {
            if (lowers_1_1 && !lowers_1_1.done && (_a = lowers_1.return)) _a.call(lowers_1);
        }
        finally { if (e_1) throw e_1.error; }
    }
    try {
        for (var uppers_1 = __values(uppers), uppers_1_1 = uppers_1.next(); !uppers_1_1.done; uppers_1_1 = uppers_1.next()) {
            var upperTemp = uppers_1_1.value;
            if (upperTemp === undefined) {
                continue;
            }
            if (upper === undefined || cmp_1.default(upper, upperTemp) === -1) {
                upper = upperTemp;
            }
        }
    }
    catch (e_2_1) { e_2 = { error: e_2_1 }; }
    finally {
        try {
            if (uppers_1_1 && !uppers_1_1.done && (_b = uppers_1.return)) _b.call(uppers_1);
        }
        finally { if (e_2) throw e_2.error; }
    }
    if (lower !== undefined && upper !== undefined) {
        return FDBKeyRange_1.default.bound(lower, upper);
    }
    if (lower !== undefined) {
        return FDBKeyRange_1.default.lowerBound(lower);
    }
    if (upper !== undefined) {
        return FDBKeyRange_1.default.upperBound(upper);
    }
    var e_1, _a, e_2, _b;
};
// http://www.w3.org/TR/2015/REC-IndexedDB-20150108/#cursor
var FDBCursor = (function () {
    function FDBCursor(source, range, direction, request, keyOnly) {
        if (direction === void 0) { direction = "next"; }
        if (keyOnly === void 0) { keyOnly = false; }
        this._gotValue = false;
        this._position = undefined; // Key of previously returned record
        this._objectStorePosition = undefined;
        this._keyOnly = false;
        this._key = undefined;
        this._primaryKey = undefined;
        this._range = range;
        this._source = source;
        this._direction = direction;
        this._request = request;
        this._keyOnly = keyOnly;
    }
    Object.defineProperty(FDBCursor.prototype, "source", {
        // Read only properties
        get: function () {
            return this._source;
        },
        set: function (val) { },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(FDBCursor.prototype, "direction", {
        get: function () {
            return this._direction;
        },
        set: function (val) { },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(FDBCursor.prototype, "key", {
        get: function () {
            return this._key;
        },
        set: function (val) { },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(FDBCursor.prototype, "primaryKey", {
        get: function () {
            return this._primaryKey;
        },
        set: function (val) { },
        enumerable: true,
        configurable: true
    });
    // https://w3c.github.io/IndexedDB/#iterate-a-cursor
    FDBCursor.prototype._iterate = function (key, primaryKey) {
        var sourceIsObjectStore = this.source instanceof FDBObjectStore_1.default;
        var records;
        if (this.source instanceof FDBObjectStore_1.default) {
            records = this.source._rawObjectStore.records;
        }
        else {
            records = this.source._rawIndex.records;
        }
        var foundRecord;
        if (this.direction === "next") {
            var range = makeKeyRange(this._range, [key, this._position], []);
            try {
                for (var _a = __values(records.values(range)), _b = _a.next(); !_b.done; _b = _a.next()) {
                    var record = _b.value;
                    var cmpResultKey = key !== undefined ? cmp_1.default(record.key, key) : undefined;
                    var cmpResultPosition = this._position !== undefined ? cmp_1.default(record.key, this._position) : undefined;
                    if (key !== undefined) {
                        if (cmpResultKey === -1) {
                            continue;
                        }
                    }
                    if (primaryKey !== undefined) {
                        if (cmpResultKey === -1) {
                            continue;
                        }
                        var cmpResultPrimaryKey = cmp_1.default(record.value, primaryKey);
                        if (cmpResultKey === 0 && cmpResultPrimaryKey === -1) {
                            continue;
                        }
                    }
                    if (this._position !== undefined && sourceIsObjectStore) {
                        if (cmpResultPosition !== 1) {
                            continue;
                        }
                    }
                    if (this._position !== undefined && !sourceIsObjectStore) {
                        if (cmpResultPosition === -1) {
                            continue;
                        }
                        if (cmpResultPosition === 0 && cmp_1.default(record.value, this._objectStorePosition) !== 1) {
                            continue;
                        }
                    }
                    if (this._range !== undefined) {
                        if (!this._range.includes(record.key)) {
                            continue;
                        }
                    }
                    foundRecord = record;
                    break;
                }
            }
            catch (e_3_1) { e_3 = { error: e_3_1 }; }
            finally {
                try {
                    if (_b && !_b.done && (_c = _a.return)) _c.call(_a);
                }
                finally { if (e_3) throw e_3.error; }
            }
        }
        else if (this.direction === "nextunique") {
            // This could be done without iterating, if the range was defined slightly better (to handle gt/gte cases).
            // But the performance difference should be small, and that wouldn't work anyway for directions where the
            // value needs to be used (like next and prev).
            var range = makeKeyRange(this._range, [key, this._position], []);
            try {
                for (var _d = __values(records.values(range)), _e = _d.next(); !_e.done; _e = _d.next()) {
                    var record = _e.value;
                    if (key !== undefined) {
                        if (cmp_1.default(record.key, key) === -1) {
                            continue;
                        }
                    }
                    if (this._position !== undefined) {
                        if (cmp_1.default(record.key, this._position) !== 1) {
                            continue;
                        }
                    }
                    if (this._range !== undefined) {
                        if (!this._range.includes(record.key)) {
                            continue;
                        }
                    }
                    foundRecord = record;
                    break;
                }
            }
            catch (e_4_1) { e_4 = { error: e_4_1 }; }
            finally {
                try {
                    if (_e && !_e.done && (_f = _d.return)) _f.call(_d);
                }
                finally { if (e_4) throw e_4.error; }
            }
        }
        else if (this.direction === "prev") {
            var range = makeKeyRange(this._range, [], [key, this._position]);
            try {
                for (var _g = __values(records.values(range, "prev")), _h = _g.next(); !_h.done; _h = _g.next()) {
                    var record = _h.value;
                    var cmpResultKey = key !== undefined ? cmp_1.default(record.key, key) : undefined;
                    var cmpResultPosition = this._position !== undefined ? cmp_1.default(record.key, this._position) : undefined;
                    if (key !== undefined) {
                        if (cmpResultKey === 1) {
                            continue;
                        }
                    }
                    if (primaryKey !== undefined) {
                        if (cmpResultKey === 1) {
                            continue;
                        }
                        var cmpResultPrimaryKey = cmp_1.default(record.value, primaryKey);
                        if (cmpResultKey === 0 && cmpResultPrimaryKey === 1) {
                            continue;
                        }
                    }
                    if (this._position !== undefined && sourceIsObjectStore) {
                        if (cmpResultPosition !== -1) {
                            continue;
                        }
                    }
                    if (this._position !== undefined && !sourceIsObjectStore) {
                        if (cmpResultPosition === 1) {
                            continue;
                        }
                        if (cmpResultPosition === 0 && cmp_1.default(record.value, this._objectStorePosition) !== -1) {
                            continue;
                        }
                    }
                    if (this._range !== undefined) {
                        if (!this._range.includes(record.key)) {
                            continue;
                        }
                    }
                    foundRecord = record;
                    break;
                }
            }
            catch (e_5_1) { e_5 = { error: e_5_1 }; }
            finally {
                try {
                    if (_h && !_h.done && (_j = _g.return)) _j.call(_g);
                }
                finally { if (e_5) throw e_5.error; }
            }
        }
        else if (this.direction === "prevunique") {
            var tempRecord = void 0;
            var range = makeKeyRange(this._range, [], [key, this._position]);
            try {
                for (var _k = __values(records.values(range, "prev")), _l = _k.next(); !_l.done; _l = _k.next()) {
                    var record = _l.value;
                    if (key !== undefined) {
                        if (cmp_1.default(record.key, key) === 1) {
                            continue;
                        }
                    }
                    if (this._position !== undefined) {
                        if (cmp_1.default(record.key, this._position) !== -1) {
                            continue;
                        }
                    }
                    if (this._range !== undefined) {
                        if (!this._range.includes(record.key)) {
                            continue;
                        }
                    }
                    tempRecord = record;
                    break;
                }
            }
            catch (e_6_1) { e_6 = { error: e_6_1 }; }
            finally {
                try {
                    if (_l && !_l.done && (_m = _k.return)) _m.call(_k);
                }
                finally { if (e_6) throw e_6.error; }
            }
            if (tempRecord) {
                foundRecord = records.get(tempRecord.key);
            }
        }
        var result;
        if (!foundRecord) {
            this._key = undefined;
            if (!sourceIsObjectStore) {
                this._objectStorePosition = undefined;
            }
            // "this instanceof FDBCursorWithValue" would be better and not require (this as any), but causes runtime
            // error due to circular dependency.
            if (!this._keyOnly && this.constructor.name === "FDBCursorWithValue") {
                this.value = undefined;
            }
            result = null;
        }
        else {
            this._position = foundRecord.key;
            if (!sourceIsObjectStore) {
                this._objectStorePosition = foundRecord.value;
            }
            this._key = foundRecord.key;
            if (sourceIsObjectStore) {
                this._primaryKey = structuredClone_1.default(foundRecord.key);
                if (!this._keyOnly && this.constructor.name === "FDBCursorWithValue") {
                    this.value = structuredClone_1.default(foundRecord.value);
                }
            }
            else {
                this._primaryKey = structuredClone_1.default(foundRecord.value);
                if (!this._keyOnly && this.constructor.name === "FDBCursorWithValue") {
                    if (this.source instanceof FDBObjectStore_1.default) {
                        throw new Error("This should never happen");
                    }
                    var value = this.source.objectStore._rawObjectStore.getValue(foundRecord.value);
                    this.value = structuredClone_1.default(value);
                }
            }
            this._gotValue = true;
            result = this;
        }
        return result;
        var e_3, _c, e_4, _f, e_5, _j, e_6, _m;
    };
    // http://www.w3.org/TR/2015/REC-IndexedDB-20150108/#widl-IDBCursor-update-IDBRequest-any-value
    FDBCursor.prototype.update = function (value) {
        if (value === undefined) {
            throw new TypeError();
        }
        var effectiveObjectStore = getEffectiveObjectStore(this);
        var effectiveKey = this.source.hasOwnProperty("_rawIndex") ? this.primaryKey : this._position;
        var transaction = effectiveObjectStore.transaction;
        if (!transaction._active) {
            throw new errors_1.TransactionInactiveError();
        }
        if (transaction.mode === "readonly") {
            throw new errors_1.ReadOnlyError();
        }
        if (effectiveObjectStore._rawObjectStore.deleted) {
            throw new errors_1.InvalidStateError();
        }
        if (!(this.source instanceof FDBObjectStore_1.default) && this.source._rawIndex.deleted) {
            throw new errors_1.InvalidStateError();
        }
        if (!this._gotValue || !this.hasOwnProperty("value")) {
            throw new errors_1.InvalidStateError();
        }
        if (effectiveObjectStore.keyPath !== null) {
            var tempKey = void 0;
            try {
                tempKey = extractKey_1.default(effectiveObjectStore.keyPath, value);
            }
            catch (err) { }
            if (cmp_1.default(tempKey, effectiveKey) !== 0) {
                throw new errors_1.DataError();
            }
        }
        var record = {
            key: effectiveKey,
            value: structuredClone_1.default(value),
        };
        return transaction._execRequestAsync({
            operation: effectiveObjectStore._rawObjectStore.storeRecord.bind(effectiveObjectStore._rawObjectStore, record, false, transaction._rollbackLog),
            source: this,
        });
    };
    // http://www.w3.org/TR/2015/REC-IndexedDB-20150108/#widl-IDBCursor-advance-void-unsigned-long-count
    FDBCursor.prototype.advance = function (count) {
        var _this = this;
        if (!Number.isInteger(count) || count <= 0) {
            throw new TypeError();
        }
        var effectiveObjectStore = getEffectiveObjectStore(this);
        var transaction = effectiveObjectStore.transaction;
        if (!transaction._active) {
            throw new errors_1.TransactionInactiveError();
        }
        if (effectiveObjectStore._rawObjectStore.deleted) {
            throw new errors_1.InvalidStateError();
        }
        if (!(this.source instanceof FDBObjectStore_1.default) && this.source._rawIndex.deleted) {
            throw new errors_1.InvalidStateError();
        }
        if (!this._gotValue) {
            throw new errors_1.InvalidStateError();
        }
        if (this._request) {
            this._request.readyState = "pending";
        }
        transaction._execRequestAsync({
            operation: function () {
                var result;
                for (var i = 0; i < count; i++) {
                    result = _this._iterate();
                    // Not sure why this is needed
                    if (!result) {
                        break;
                    }
                }
                return result;
            },
            request: this._request,
            source: this.source,
        });
        this._gotValue = false;
    };
    // http://www.w3.org/TR/2015/REC-IndexedDB-20150108/#widl-IDBCursor-continue-void-any-key
    FDBCursor.prototype.continue = function (key) {
        var effectiveObjectStore = getEffectiveObjectStore(this);
        var transaction = effectiveObjectStore.transaction;
        if (!transaction._active) {
            throw new errors_1.TransactionInactiveError();
        }
        if (effectiveObjectStore._rawObjectStore.deleted) {
            throw new errors_1.InvalidStateError();
        }
        if (!(this.source instanceof FDBObjectStore_1.default) && this.source._rawIndex.deleted) {
            throw new errors_1.InvalidStateError();
        }
        if (!this._gotValue) {
            throw new errors_1.InvalidStateError();
        }
        if (key !== undefined) {
            key = valueToKey_1.default(key);
            var cmpResult = cmp_1.default(key, this._position);
            if ((cmpResult <= 0 && (this.direction === "next" || this.direction === "nextunique")) ||
                (cmpResult >= 0 && (this.direction === "prev" || this.direction === "prevunique"))) {
                throw new errors_1.DataError();
            }
        }
        if (this._request) {
            this._request.readyState = "pending";
        }
        transaction._execRequestAsync({
            operation: this._iterate.bind(this, key),
            request: this._request,
            source: this.source,
        });
        this._gotValue = false;
    };
    // hthttps://w3c.github.io/IndexedDB/#dom-idbcursor-continueprimarykey
    FDBCursor.prototype.continuePrimaryKey = function (key, primaryKey) {
        var effectiveObjectStore = getEffectiveObjectStore(this);
        var transaction = effectiveObjectStore.transaction;
        if (!transaction._active) {
            throw new errors_1.TransactionInactiveError();
        }
        if (effectiveObjectStore._rawObjectStore.deleted) {
            throw new errors_1.InvalidStateError();
        }
        if (!(this.source instanceof FDBObjectStore_1.default) && this.source._rawIndex.deleted) {
            throw new errors_1.InvalidStateError();
        }
        if (this.source instanceof FDBObjectStore_1.default || (this.direction !== "next" && this.direction !== "prev")) {
            throw new errors_1.InvalidAccessError();
        }
        if (!this._gotValue) {
            throw new errors_1.InvalidStateError();
        }
        // Not sure about this
        if (key === undefined || primaryKey === undefined) {
            throw new errors_1.DataError();
        }
        key = valueToKey_1.default(key);
        var cmpResult = cmp_1.default(key, this._position);
        if ((cmpResult === -1 && this.direction === "next") || (cmpResult === 1 && this.direction === "prev")) {
            throw new errors_1.DataError();
        }
        var cmpResult2 = cmp_1.default(primaryKey, this._objectStorePosition);
        if (cmpResult === 0) {
            if ((cmpResult2 <= 0 && this.direction === "next") || (cmpResult2 >= 0 && this.direction === "prev")) {
                throw new errors_1.DataError();
            }
        }
        if (this._request) {
            this._request.readyState = "pending";
        }
        transaction._execRequestAsync({
            operation: this._iterate.bind(this, key, primaryKey),
            request: this._request,
            source: this.source,
        });
        this._gotValue = false;
    };
    FDBCursor.prototype.delete = function () {
        var effectiveObjectStore = getEffectiveObjectStore(this);
        var effectiveKey = this.source.hasOwnProperty("_rawIndex") ? this.primaryKey : this._position;
        var transaction = effectiveObjectStore.transaction;
        if (!transaction._active) {
            throw new errors_1.TransactionInactiveError();
        }
        if (transaction.mode === "readonly") {
            throw new errors_1.ReadOnlyError();
        }
        if (effectiveObjectStore._rawObjectStore.deleted) {
            throw new errors_1.InvalidStateError();
        }
        if (!(this.source instanceof FDBObjectStore_1.default) && this.source._rawIndex.deleted) {
            throw new errors_1.InvalidStateError();
        }
        if (!this._gotValue || !this.hasOwnProperty("value")) {
            throw new errors_1.InvalidStateError();
        }
        return transaction._execRequestAsync({
            operation: effectiveObjectStore._rawObjectStore.deleteRecord.bind(effectiveObjectStore._rawObjectStore, effectiveKey, transaction._rollbackLog),
            source: this,
        });
    };
    FDBCursor.prototype.toString = function () {
        return "[object IDBCursor]";
    };
    return FDBCursor;
}());
exports.default = FDBCursor;


/***/ }),
/* 100 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __values = (this && this.__values) || function (o) {
    var m = typeof Symbol === "function" && o[Symbol.iterator], i = 0;
    if (m) return m.call(o);
    return {
        next: function () {
            if (o && i >= o.length) o = void 0;
            return { value: o && o[i++], done: !o };
        }
    };
};
Object.defineProperty(exports, "__esModule", { value: true });
var errors_1 = __webpack_require__(10);
var stopped = function (event, listener) {
    return (event.immediatePropagationStopped ||
        (event.eventPhase === event.CAPTURING_PHASE && listener.capture === false) ||
        (event.eventPhase === event.BUBBLING_PHASE && listener.capture === true));
};
// http://www.w3.org/TR/dom/#concept-event-listener-invoke
var invokeEventListeners = function (event, obj) {
    event.currentTarget = obj;
    try {
        for (var _a = __values(obj.listeners), _b = _a.next(); !_b.done; _b = _a.next()) {
            var listener = _b.value;
            if (event.type !== listener.type || stopped(event, listener)) {
                continue;
            }
            listener.callback.call(event.currentTarget, event);
        }
    }
    catch (e_1_1) { e_1 = { error: e_1_1 }; }
    finally {
        try {
            if (_b && !_b.done && (_c = _a.return)) _c.call(_a);
        }
        finally { if (e_1) throw e_1.error; }
    }
    var typeToProp = {
        abort: "onabort",
        blocked: "onblocked",
        complete: "oncomplete",
        error: "onerror",
        success: "onsuccess",
        upgradeneeded: "onupgradeneeded",
        versionchange: "onversionchange",
    };
    var prop = typeToProp[event.type];
    if (prop === undefined) {
        throw new Error("Unknown event type: \"" + event.type + "\"");
    }
    var callback = event.currentTarget[prop];
    if (callback) {
        var listener = {
            callback: callback,
            capture: false,
            type: event.type,
        };
        if (!stopped(event, listener)) {
            listener.callback.call(event.currentTarget, event);
        }
    }
    var e_1, _c;
};
var FakeEventTarget = (function () {
    function FakeEventTarget() {
        this.listeners = [];
    }
    FakeEventTarget.prototype.addEventListener = function (type, callback, capture) {
        if (capture === void 0) { capture = false; }
        this.listeners.push({
            callback: callback,
            capture: capture,
            type: type,
        });
    };
    FakeEventTarget.prototype.removeEventListener = function (type, callback, capture) {
        if (capture === void 0) { capture = false; }
        var i = this.listeners.findIndex(function (listener) {
            return listener.type === type &&
                listener.callback === callback &&
                listener.capture === capture;
        });
        this.listeners.splice(i, 1);
    };
    // http://www.w3.org/TR/dom/#dispatching-events
    FakeEventTarget.prototype.dispatchEvent = function (event) {
        if (event.dispatched || !event.initialized) {
            throw new errors_1.InvalidStateError("The object is in an invalid state.");
        }
        event.isTrusted = false;
        event.dispatched = true;
        event.target = this;
        // NOT SURE WHEN THIS SHOULD BE SET        event.eventPath = [];
        event.eventPhase = event.CAPTURING_PHASE;
        try {
            for (var _a = __values(event.eventPath), _b = _a.next(); !_b.done; _b = _a.next()) {
                var obj = _b.value;
                if (!event.propagationStopped) {
                    invokeEventListeners(event, obj);
                }
            }
        }
        catch (e_2_1) { e_2 = { error: e_2_1 }; }
        finally {
            try {
                if (_b && !_b.done && (_c = _a.return)) _c.call(_a);
            }
            finally { if (e_2) throw e_2.error; }
        }
        event.eventPhase = event.AT_TARGET;
        if (!event.propagationStopped) {
            invokeEventListeners(event, event.target);
        }
        if (event.bubbles) {
            event.eventPath.reverse();
            event.eventPhase = event.BUBBLING_PHASE;
            try {
                for (var _d = __values(event.eventPath), _e = _d.next(); !_e.done; _e = _d.next()) {
                    var obj = _e.value;
                    if (!event.propagationStopped) {
                        invokeEventListeners(event, obj);
                    }
                }
            }
            catch (e_3_1) { e_3 = { error: e_3_1 }; }
            finally {
                try {
                    if (_e && !_e.done && (_f = _d.return)) _f.call(_d);
                }
                finally { if (e_3) throw e_3.error; }
            }
        }
        event.dispatched = false;
        event.eventPhase = event.NONE;
        event.currentTarget = null;
        if (event.canceled) {
            return false;
        }
        return true;
        var e_2, _c, e_3, _f;
    };
    return FakeEventTarget;
}());
exports.default = FakeEventTarget;


/***/ }),
/* 101 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

// https://heycam.github.io/webidl/#EnforceRange
Object.defineProperty(exports, "__esModule", { value: true });
var enforceRange = function (num, type) {
    var min = 0;
    var max = type === "unsigned long" ? 4294967295 : 9007199254740991;
    if (isNaN(num) || num < min || num > max) {
        throw new TypeError();
    }
    if (num >= 0) {
        return Math.floor(num);
    }
};
exports.default = enforceRange;


/***/ }),
/* 102 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var Event = (function () {
    function Event(type, eventInitDict) {
        if (eventInitDict === void 0) { eventInitDict = {}; }
        this.eventPath = [];
        this.NONE = 0;
        this.CAPTURING_PHASE = 1;
        this.AT_TARGET = 2;
        this.BUBBLING_PHASE = 3;
        // Flags
        this.propagationStopped = false;
        this.immediatePropagationStopped = false;
        this.canceled = false;
        this.initialized = true;
        this.dispatched = false;
        this.target = null;
        this.currentTarget = null;
        this.eventPhase = 0;
        this.defaultPrevented = false;
        this.isTrusted = false;
        this.timestamp = Date.now();
        this.type = type;
        this.bubbles = eventInitDict.bubbles !== undefined ? eventInitDict.bubbles : false;
        this.cancelable = eventInitDict.cancelable !== undefined ? eventInitDict.cancelable : false;
    }
    Event.prototype.preventDefault = function () {
        if (this.cancelable) {
            this.canceled = true;
        }
    };
    Event.prototype.stopPropagation = function () {
        this.propagationStopped = true;
    };
    Event.prototype.stopImmediatePropagation = function () {
        this.propagationStopped = true;
        this.immediatePropagationStopped = true;
    };
    return Event;
}());
exports.default = Event;


/***/ }),
/* 103 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = !__webpack_require__(7) && !__webpack_require__(3)(function(){
  return Object.defineProperty(__webpack_require__(71)('div'), 'a', {get: function(){ return 7; }}).a != 7;
});

/***/ }),
/* 104 */
/***/ (function(module, exports, __webpack_require__) {

exports.f = __webpack_require__(5);

/***/ }),
/* 105 */
/***/ (function(module, exports, __webpack_require__) {

var getKeys   = __webpack_require__(32)
  , toIObject = __webpack_require__(12);
module.exports = function(object, el){
  var O      = toIObject(object)
    , keys   = getKeys(O)
    , length = keys.length
    , index  = 0
    , key;
  while(length > index)if(O[key = keys[index++]] === el)return key;
};

/***/ }),
/* 106 */
/***/ (function(module, exports, __webpack_require__) {

var has          = __webpack_require__(11)
  , toIObject    = __webpack_require__(12)
  , arrayIndexOf = __webpack_require__(53)(false)
  , IE_PROTO     = __webpack_require__(73)('IE_PROTO');

module.exports = function(object, names){
  var O      = toIObject(object)
    , i      = 0
    , result = []
    , key;
  for(key in O)if(key != IE_PROTO)has(O, key) && result.push(key);
  // Don't enum bug & hidden keys
  while(names.length > i)if(has(O, key = names[i++])){
    ~arrayIndexOf(result, key) || result.push(key);
  }
  return result;
};

/***/ }),
/* 107 */
/***/ (function(module, exports, __webpack_require__) {

var dP       = __webpack_require__(6)
  , anObject = __webpack_require__(1)
  , getKeys  = __webpack_require__(32);

module.exports = __webpack_require__(7) ? Object.defineProperties : function defineProperties(O, Properties){
  anObject(O);
  var keys   = getKeys(Properties)
    , length = keys.length
    , i = 0
    , P;
  while(length > i)dP.f(O, P = keys[i++], Properties[P]);
  return O;
};

/***/ }),
/* 108 */
/***/ (function(module, exports, __webpack_require__) {

// fallback for IE11 buggy Object.getOwnPropertyNames with iframe and window
var toIObject = __webpack_require__(12)
  , gOPN      = __webpack_require__(38).f
  , toString  = {}.toString;

var windowNames = typeof window == 'object' && window && Object.getOwnPropertyNames
  ? Object.getOwnPropertyNames(window) : [];

var getWindowNames = function(it){
  try {
    return gOPN(it);
  } catch(e){
    return windowNames.slice();
  }
};

module.exports.f = function getOwnPropertyNames(it){
  return windowNames && toString.call(it) == '[object Window]' ? getWindowNames(it) : gOPN(toIObject(it));
};


/***/ }),
/* 109 */
/***/ (function(module, exports) {

// 7.2.9 SameValue(x, y)
module.exports = Object.is || function is(x, y){
  return x === y ? x !== 0 || 1 / x === 1 / y : x != x && y != y;
};

/***/ }),
/* 110 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var aFunction  = __webpack_require__(13)
  , isObject   = __webpack_require__(4)
  , invoke     = __webpack_require__(55)
  , arraySlice = [].slice
  , factories  = {};

var construct = function(F, len, args){
  if(!(len in factories)){
    for(var n = [], i = 0; i < len; i++)n[i] = 'a[' + i + ']';
    factories[len] = Function('F,a', 'return new F(' + n.join(',') + ')');
  } return factories[len](F, args);
};

module.exports = Function.bind || function bind(that /*, args... */){
  var fn       = aFunction(this)
    , partArgs = arraySlice.call(arguments, 1);
  var bound = function(/* args... */){
    var args = partArgs.concat(arraySlice.call(arguments));
    return this instanceof bound ? construct(fn, args.length, args) : invoke(fn, args, that);
  };
  if(isObject(fn.prototype))bound.prototype = fn.prototype;
  return bound;
};

/***/ }),
/* 111 */
/***/ (function(module, exports, __webpack_require__) {

var $parseInt = __webpack_require__(2).parseInt
  , $trim     = __webpack_require__(46).trim
  , ws        = __webpack_require__(79)
  , hex       = /^[\-+]?0[xX]/;

module.exports = $parseInt(ws + '08') !== 8 || $parseInt(ws + '0x16') !== 22 ? function parseInt(str, radix){
  var string = $trim(String(str), 3);
  return $parseInt(string, (radix >>> 0) || (hex.test(string) ? 16 : 10));
} : $parseInt;

/***/ }),
/* 112 */
/***/ (function(module, exports, __webpack_require__) {

var $parseFloat = __webpack_require__(2).parseFloat
  , $trim       = __webpack_require__(46).trim;

module.exports = 1 / $parseFloat(__webpack_require__(79) + '-0') !== -Infinity ? function parseFloat(str){
  var string = $trim(String(str), 3)
    , result = $parseFloat(string);
  return result === 0 && string.charAt(0) == '-' ? -0 : result;
} : $parseFloat;

/***/ }),
/* 113 */
/***/ (function(module, exports, __webpack_require__) {

var cof = __webpack_require__(20);
module.exports = function(it, msg){
  if(typeof it != 'number' && cof(it) != 'Number')throw TypeError(msg);
  return +it;
};

/***/ }),
/* 114 */
/***/ (function(module, exports, __webpack_require__) {

// 20.1.2.3 Number.isInteger(number)
var isObject = __webpack_require__(4)
  , floor    = Math.floor;
module.exports = function isInteger(it){
  return !isObject(it) && isFinite(it) && floor(it) === it;
};

/***/ }),
/* 115 */
/***/ (function(module, exports) {

// 20.2.2.20 Math.log1p(x)
module.exports = Math.log1p || function log1p(x){
  return (x = +x) > -1e-8 && x < 1e-8 ? x - x * x / 2 : Math.log(1 + x);
};

/***/ }),
/* 116 */
/***/ (function(module, exports, __webpack_require__) {

// call something on iterator step with safe closing on error
var anObject = __webpack_require__(1);
module.exports = function(iterator, fn, value, entries){
  try {
    return entries ? fn(anObject(value)[0], value[1]) : fn(value);
  // 7.4.6 IteratorClose(iterator, completion)
  } catch(e){
    var ret = iterator['return'];
    if(ret !== undefined)anObject(ret.call(iterator));
    throw e;
  }
};

/***/ }),
/* 117 */
/***/ (function(module, exports, __webpack_require__) {

var aFunction = __webpack_require__(13)
  , toObject  = __webpack_require__(9)
  , IObject   = __webpack_require__(48)
  , toLength  = __webpack_require__(8);

module.exports = function(that, callbackfn, aLen, memo, isRight){
  aFunction(callbackfn);
  var O      = toObject(that)
    , self   = IObject(O)
    , length = toLength(O.length)
    , index  = isRight ? length - 1 : 0
    , i      = isRight ? -1 : 1;
  if(aLen < 2)for(;;){
    if(index in self){
      memo = self[index];
      index += i;
      break;
    }
    index += i;
    if(isRight ? index < 0 : length <= index){
      throw TypeError('Reduce of empty array with no initial value');
    }
  }
  for(;isRight ? index >= 0 : length > index; index += i)if(index in self){
    memo = callbackfn(memo, self[index], index, O);
  }
  return memo;
};

/***/ }),
/* 118 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
// 22.1.3.3 Array.prototype.copyWithin(target, start, end = this.length)

var toObject = __webpack_require__(9)
  , toIndex  = __webpack_require__(37)
  , toLength = __webpack_require__(8);

module.exports = [].copyWithin || function copyWithin(target/*= 0*/, start/*= 0, end = @length*/){
  var O     = toObject(this)
    , len   = toLength(O.length)
    , to    = toIndex(target, len)
    , from  = toIndex(start, len)
    , end   = arguments.length > 2 ? arguments[2] : undefined
    , count = Math.min((end === undefined ? len : toIndex(end, len)) - from, len - to)
    , inc   = 1;
  if(from < to && to < from + count){
    inc  = -1;
    from += count - 1;
    to   += count - 1;
  }
  while(count-- > 0){
    if(from in O)O[to] = O[from];
    else delete O[to];
    to   += inc;
    from += inc;
  } return O;
};

/***/ }),
/* 119 */
/***/ (function(module, exports, __webpack_require__) {

// 21.2.5.3 get RegExp.prototype.flags()
if(__webpack_require__(7) && /./g.flags != 'g')__webpack_require__(6).f(RegExp.prototype, 'flags', {
  configurable: true,
  get: __webpack_require__(60)
});

/***/ }),
/* 120 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var strong = __webpack_require__(121);

// 23.1 Map Objects
module.exports = __webpack_require__(62)('Map', function(get){
  return function Map(){ return get(this, arguments.length > 0 ? arguments[0] : undefined); };
}, {
  // 23.1.3.6 Map.prototype.get(key)
  get: function get(key){
    var entry = strong.getEntry(this, key);
    return entry && entry.v;
  },
  // 23.1.3.9 Map.prototype.set(key, value)
  set: function set(key, value){
    return strong.def(this, key === 0 ? 0 : key, value);
  }
}, strong, true);

/***/ }),
/* 121 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var dP          = __webpack_require__(6).f
  , create      = __webpack_require__(28)
  , redefineAll = __webpack_require__(44)
  , ctx         = __webpack_require__(24)
  , anInstance  = __webpack_require__(42)
  , defined     = __webpack_require__(21)
  , forOf       = __webpack_require__(43)
  , $iterDefine = __webpack_require__(56)
  , step        = __webpack_require__(91)
  , setSpecies  = __webpack_require__(41)
  , DESCRIPTORS = __webpack_require__(7)
  , fastKey     = __webpack_require__(31).fastKey
  , SIZE        = DESCRIPTORS ? '_s' : 'size';

var getEntry = function(that, key){
  // fast case
  var index = fastKey(key), entry;
  if(index !== 'F')return that._i[index];
  // frozen object case
  for(entry = that._f; entry; entry = entry.n){
    if(entry.k == key)return entry;
  }
};

module.exports = {
  getConstructor: function(wrapper, NAME, IS_MAP, ADDER){
    var C = wrapper(function(that, iterable){
      anInstance(that, C, NAME, '_i');
      that._i = create(null); // index
      that._f = undefined;    // first entry
      that._l = undefined;    // last entry
      that[SIZE] = 0;         // size
      if(iterable != undefined)forOf(iterable, IS_MAP, that[ADDER], that);
    });
    redefineAll(C.prototype, {
      // 23.1.3.1 Map.prototype.clear()
      // 23.2.3.2 Set.prototype.clear()
      clear: function clear(){
        for(var that = this, data = that._i, entry = that._f; entry; entry = entry.n){
          entry.r = true;
          if(entry.p)entry.p = entry.p.n = undefined;
          delete data[entry.i];
        }
        that._f = that._l = undefined;
        that[SIZE] = 0;
      },
      // 23.1.3.3 Map.prototype.delete(key)
      // 23.2.3.4 Set.prototype.delete(value)
      'delete': function(key){
        var that  = this
          , entry = getEntry(that, key);
        if(entry){
          var next = entry.n
            , prev = entry.p;
          delete that._i[entry.i];
          entry.r = true;
          if(prev)prev.n = next;
          if(next)next.p = prev;
          if(that._f == entry)that._f = next;
          if(that._l == entry)that._l = prev;
          that[SIZE]--;
        } return !!entry;
      },
      // 23.2.3.6 Set.prototype.forEach(callbackfn, thisArg = undefined)
      // 23.1.3.5 Map.prototype.forEach(callbackfn, thisArg = undefined)
      forEach: function forEach(callbackfn /*, that = undefined */){
        anInstance(this, C, 'forEach');
        var f = ctx(callbackfn, arguments.length > 1 ? arguments[1] : undefined, 3)
          , entry;
        while(entry = entry ? entry.n : this._f){
          f(entry.v, entry.k, this);
          // revert to the last existing entry
          while(entry && entry.r)entry = entry.p;
        }
      },
      // 23.1.3.7 Map.prototype.has(key)
      // 23.2.3.7 Set.prototype.has(value)
      has: function has(key){
        return !!getEntry(this, key);
      }
    });
    if(DESCRIPTORS)dP(C.prototype, 'size', {
      get: function(){
        return defined(this[SIZE]);
      }
    });
    return C;
  },
  def: function(that, key, value){
    var entry = getEntry(that, key)
      , prev, index;
    // change existing entry
    if(entry){
      entry.v = value;
    // create new entry
    } else {
      that._l = entry = {
        i: index = fastKey(key, true), // <- index
        k: key,                        // <- key
        v: value,                      // <- value
        p: prev = that._l,             // <- previous entry
        n: undefined,                  // <- next entry
        r: false                       // <- removed
      };
      if(!that._f)that._f = entry;
      if(prev)prev.n = entry;
      that[SIZE]++;
      // add to index
      if(index !== 'F')that._i[index] = entry;
    } return that;
  },
  getEntry: getEntry,
  setStrong: function(C, NAME, IS_MAP){
    // add .keys, .values, .entries, [@@iterator]
    // 23.1.3.4, 23.1.3.8, 23.1.3.11, 23.1.3.12, 23.2.3.5, 23.2.3.8, 23.2.3.10, 23.2.3.11
    $iterDefine(C, NAME, function(iterated, kind){
      this._t = iterated;  // target
      this._k = kind;      // kind
      this._l = undefined; // previous
    }, function(){
      var that  = this
        , kind  = that._k
        , entry = that._l;
      // revert to the last existing entry
      while(entry && entry.r)entry = entry.p;
      // get next entry
      if(!that._t || !(that._l = entry = entry ? entry.n : that._t._f)){
        // or finish the iteration
        that._t = undefined;
        return step(1);
      }
      // return step by kind
      if(kind == 'keys'  )return step(0, entry.k);
      if(kind == 'values')return step(0, entry.v);
      return step(0, [entry.k, entry.v]);
    }, IS_MAP ? 'entries' : 'values' , !IS_MAP, true);

    // add [@@species], 23.1.2.2, 23.2.2.2
    setSpecies(NAME);
  }
};

/***/ }),
/* 122 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var strong = __webpack_require__(121);

// 23.2 Set Objects
module.exports = __webpack_require__(62)('Set', function(get){
  return function Set(){ return get(this, arguments.length > 0 ? arguments[0] : undefined); };
}, {
  // 23.2.3.1 Set.prototype.add(value)
  add: function add(value){
    return strong.def(this, value = value === 0 ? 0 : value, value);
  }
}, strong);

/***/ }),
/* 123 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var each         = __webpack_require__(26)(0)
  , redefine     = __webpack_require__(16)
  , meta         = __webpack_require__(31)
  , assign       = __webpack_require__(77)
  , weak         = __webpack_require__(124)
  , isObject     = __webpack_require__(4)
  , getWeak      = meta.getWeak
  , isExtensible = Object.isExtensible
  , uncaughtFrozenStore = weak.ufstore
  , tmp          = {}
  , InternalMap;

var wrapper = function(get){
  return function WeakMap(){
    return get(this, arguments.length > 0 ? arguments[0] : undefined);
  };
};

var methods = {
  // 23.3.3.3 WeakMap.prototype.get(key)
  get: function get(key){
    if(isObject(key)){
      var data = getWeak(key);
      if(data === true)return uncaughtFrozenStore(this).get(key);
      return data ? data[this._i] : undefined;
    }
  },
  // 23.3.3.5 WeakMap.prototype.set(key, value)
  set: function set(key, value){
    return weak.def(this, key, value);
  }
};

// 23.3 WeakMap Objects
var $WeakMap = module.exports = __webpack_require__(62)('WeakMap', wrapper, methods, weak, true, true);

// IE11 WeakMap frozen keys fix
if(new $WeakMap().set((Object.freeze || Object)(tmp), 7).get(tmp) != 7){
  InternalMap = weak.getConstructor(wrapper);
  assign(InternalMap.prototype, methods);
  meta.NEED = true;
  each(['delete', 'has', 'get', 'set'], function(key){
    var proto  = $WeakMap.prototype
      , method = proto[key];
    redefine(proto, key, function(a, b){
      // store frozen objects on internal weakmap shim
      if(isObject(a) && !isExtensible(a)){
        if(!this._f)this._f = new InternalMap;
        var result = this._f[key](a, b);
        return key == 'set' ? this : result;
      // store all the rest on native weakmap
      } return method.call(this, a, b);
    });
  });
}

/***/ }),
/* 124 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var redefineAll       = __webpack_require__(44)
  , getWeak           = __webpack_require__(31).getWeak
  , anObject          = __webpack_require__(1)
  , isObject          = __webpack_require__(4)
  , anInstance        = __webpack_require__(42)
  , forOf             = __webpack_require__(43)
  , createArrayMethod = __webpack_require__(26)
  , $has              = __webpack_require__(11)
  , arrayFind         = createArrayMethod(5)
  , arrayFindIndex    = createArrayMethod(6)
  , id                = 0;

// fallback for uncaught frozen keys
var uncaughtFrozenStore = function(that){
  return that._l || (that._l = new UncaughtFrozenStore);
};
var UncaughtFrozenStore = function(){
  this.a = [];
};
var findUncaughtFrozen = function(store, key){
  return arrayFind(store.a, function(it){
    return it[0] === key;
  });
};
UncaughtFrozenStore.prototype = {
  get: function(key){
    var entry = findUncaughtFrozen(this, key);
    if(entry)return entry[1];
  },
  has: function(key){
    return !!findUncaughtFrozen(this, key);
  },
  set: function(key, value){
    var entry = findUncaughtFrozen(this, key);
    if(entry)entry[1] = value;
    else this.a.push([key, value]);
  },
  'delete': function(key){
    var index = arrayFindIndex(this.a, function(it){
      return it[0] === key;
    });
    if(~index)this.a.splice(index, 1);
    return !!~index;
  }
};

module.exports = {
  getConstructor: function(wrapper, NAME, IS_MAP, ADDER){
    var C = wrapper(function(that, iterable){
      anInstance(that, C, NAME, '_i');
      that._i = id++;      // collection id
      that._l = undefined; // leak store for uncaught frozen objects
      if(iterable != undefined)forOf(iterable, IS_MAP, that[ADDER], that);
    });
    redefineAll(C.prototype, {
      // 23.3.3.2 WeakMap.prototype.delete(key)
      // 23.4.3.3 WeakSet.prototype.delete(value)
      'delete': function(key){
        if(!isObject(key))return false;
        var data = getWeak(key);
        if(data === true)return uncaughtFrozenStore(this)['delete'](key);
        return data && $has(data, this._i) && delete data[this._i];
      },
      // 23.3.3.4 WeakMap.prototype.has(key)
      // 23.4.3.4 WeakSet.prototype.has(value)
      has: function has(key){
        if(!isObject(key))return false;
        var data = getWeak(key);
        if(data === true)return uncaughtFrozenStore(this).has(key);
        return data && $has(data, this._i);
      }
    });
    return C;
  },
  def: function(that, key, value){
    var data = getWeak(anObject(key), true);
    if(data === true)uncaughtFrozenStore(that).set(key, value);
    else data[that._i] = value;
    return that;
  },
  ufstore: uncaughtFrozenStore
};

/***/ }),
/* 125 */
/***/ (function(module, exports, __webpack_require__) {

// https://github.com/tc39/proposal-string-pad-start-end
var toLength = __webpack_require__(8)
  , repeat   = __webpack_require__(81)
  , defined  = __webpack_require__(21);

module.exports = function(that, maxLength, fillString, left){
  var S            = String(defined(that))
    , stringLength = S.length
    , fillStr      = fillString === undefined ? ' ' : String(fillString)
    , intMaxLength = toLength(maxLength);
  if(intMaxLength <= stringLength || fillStr == '')return S;
  var fillLen = intMaxLength - stringLength
    , stringFiller = repeat.call(fillStr, Math.ceil(fillLen / fillStr.length));
  if(stringFiller.length > fillLen)stringFiller = stringFiller.slice(0, fillLen);
  return left ? stringFiller + S : S + stringFiller;
};


/***/ }),
/* 126 */
/***/ (function(module, exports, __webpack_require__) {

var getKeys   = __webpack_require__(32)
  , toIObject = __webpack_require__(12)
  , isEnum    = __webpack_require__(49).f;
module.exports = function(isEntries){
  return function(it){
    var O      = toIObject(it)
      , keys   = getKeys(O)
      , length = keys.length
      , i      = 0
      , result = []
      , key;
    while(length > i)if(isEnum.call(O, key = keys[i++])){
      result.push(isEntries ? [key, O[key]] : O[key]);
    } return result;
  };
};

/***/ }),
/* 127 */
/***/ (function(module, exports, __webpack_require__) {

// https://github.com/DavidBruant/Map-Set.prototype.toJSON
var classof = __webpack_require__(39)
  , from    = __webpack_require__(128);
module.exports = function(NAME){
  return function toJSON(){
    if(classof(this) != NAME)throw TypeError(NAME + "#toJSON isn't generic");
    return from(this);
  };
};

/***/ }),
/* 128 */
/***/ (function(module, exports, __webpack_require__) {

var forOf = __webpack_require__(43);

module.exports = function(iter, ITERATOR){
  var result = [];
  forOf(iter, false, result.push, result, ITERATOR);
  return result;
};


/***/ }),
/* 129 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(2);

/***/ }),
/* 130 */
/***/ (function(module, exports, __webpack_require__) {

var classof   = __webpack_require__(39)
  , ITERATOR  = __webpack_require__(5)('iterator')
  , Iterators = __webpack_require__(40);
module.exports = __webpack_require__(14).isIterable = function(it){
  var O = Object(it);
  return O[ITERATOR] !== undefined
    || '@@iterator' in O
    || Iterators.hasOwnProperty(classof(O));
};

/***/ }),
/* 131 */
/***/ (function(module, exports, __webpack_require__) {

var dP        = __webpack_require__(6)
  , gOPD      = __webpack_require__(17)
  , ownKeys   = __webpack_require__(96)
  , toIObject = __webpack_require__(12);

module.exports = function define(target, mixin){
  var keys   = ownKeys(toIObject(mixin))
    , length = keys.length
    , i = 0, key;
  while(length > i)dP.f(target, key = keys[i++], gOPD.f(mixin, key));
  return target;
};

/***/ }),
/* 132 */
/***/ (function(module, exports, __webpack_require__) {

/* WEBPACK VAR INJECTION */(function(global, process) {(function (global, undefined) {
    "use strict";

    if (global.setImmediate) {
        return;
    }

    var nextHandle = 1; // Spec says greater than zero
    var tasksByHandle = {};
    var currentlyRunningATask = false;
    var doc = global.document;
    var registerImmediate;

    function setImmediate(callback) {
      // Callback can either be a function or a string
      if (typeof callback !== "function") {
        callback = new Function("" + callback);
      }
      // Copy function arguments
      var args = new Array(arguments.length - 1);
      for (var i = 0; i < args.length; i++) {
          args[i] = arguments[i + 1];
      }
      // Store and register the task
      var task = { callback: callback, args: args };
      tasksByHandle[nextHandle] = task;
      registerImmediate(nextHandle);
      return nextHandle++;
    }

    function clearImmediate(handle) {
        delete tasksByHandle[handle];
    }

    function run(task) {
        var callback = task.callback;
        var args = task.args;
        switch (args.length) {
        case 0:
            callback();
            break;
        case 1:
            callback(args[0]);
            break;
        case 2:
            callback(args[0], args[1]);
            break;
        case 3:
            callback(args[0], args[1], args[2]);
            break;
        default:
            callback.apply(undefined, args);
            break;
        }
    }

    function runIfPresent(handle) {
        // From the spec: "Wait until any invocations of this algorithm started before this one have completed."
        // So if we're currently running a task, we'll need to delay this invocation.
        if (currentlyRunningATask) {
            // Delay by doing a setTimeout. setImmediate was tried instead, but in Firefox 7 it generated a
            // "too much recursion" error.
            setTimeout(runIfPresent, 0, handle);
        } else {
            var task = tasksByHandle[handle];
            if (task) {
                currentlyRunningATask = true;
                try {
                    run(task);
                } finally {
                    clearImmediate(handle);
                    currentlyRunningATask = false;
                }
            }
        }
    }

    function installNextTickImplementation() {
        registerImmediate = function(handle) {
            process.nextTick(function () { runIfPresent(handle); });
        };
    }

    function canUsePostMessage() {
        // The test against `importScripts` prevents this implementation from being installed inside a web worker,
        // where `global.postMessage` means something completely different and can't be used for this purpose.
        if (global.postMessage && !global.importScripts) {
            var postMessageIsAsynchronous = true;
            var oldOnMessage = global.onmessage;
            global.onmessage = function() {
                postMessageIsAsynchronous = false;
            };
            global.postMessage("", "*");
            global.onmessage = oldOnMessage;
            return postMessageIsAsynchronous;
        }
    }

    function installPostMessageImplementation() {
        // Installs an event handler on `global` for the `message` event: see
        // * https://developer.mozilla.org/en/DOM/window.postMessage
        // * http://www.whatwg.org/specs/web-apps/current-work/multipage/comms.html#crossDocumentMessages

        var messagePrefix = "setImmediate$" + Math.random() + "$";
        var onGlobalMessage = function(event) {
            if (event.source === global &&
                typeof event.data === "string" &&
                event.data.indexOf(messagePrefix) === 0) {
                runIfPresent(+event.data.slice(messagePrefix.length));
            }
        };

        if (global.addEventListener) {
            global.addEventListener("message", onGlobalMessage, false);
        } else {
            global.attachEvent("onmessage", onGlobalMessage);
        }

        registerImmediate = function(handle) {
            global.postMessage(messagePrefix + handle, "*");
        };
    }

    function installMessageChannelImplementation() {
        var channel = new MessageChannel();
        channel.port1.onmessage = function(event) {
            var handle = event.data;
            runIfPresent(handle);
        };

        registerImmediate = function(handle) {
            channel.port2.postMessage(handle);
        };
    }

    function installReadyStateChangeImplementation() {
        var html = doc.documentElement;
        registerImmediate = function(handle) {
            // Create a <script> element; its readystatechange event will be fired asynchronously once it is inserted
            // into the document. Do so, thus queuing up the task. Remember to clean up once it's been called.
            var script = doc.createElement("script");
            script.onreadystatechange = function () {
                runIfPresent(handle);
                script.onreadystatechange = null;
                html.removeChild(script);
                script = null;
            };
            html.appendChild(script);
        };
    }

    function installSetTimeoutImplementation() {
        registerImmediate = function(handle) {
            setTimeout(runIfPresent, 0, handle);
        };
    }

    // If supported, we should attach to the prototype of global, since that is where setTimeout et al. live.
    var attachTo = Object.getPrototypeOf && Object.getPrototypeOf(global);
    attachTo = attachTo && attachTo.setTimeout ? attachTo : global;

    // Don't get fooled by e.g. browserify environments.
    if ({}.toString.call(global.process) === "[object process]") {
        // For Node.js before 0.9
        installNextTickImplementation();

    } else if (canUsePostMessage()) {
        // For non-IE10 modern browsers
        installPostMessageImplementation();

    } else if (global.MessageChannel) {
        // For web workers, where supported
        installMessageChannelImplementation();

    } else if (doc && "onreadystatechange" in doc.createElement("script")) {
        // For IE 6–8
        installReadyStateChangeImplementation();

    } else {
        // For older browsers
        installSetTimeoutImplementation();
    }

    attachTo.setImmediate = setImmediate;
    attachTo.clearImmediate = clearImmediate;
}(typeof self === "undefined" ? typeof global === "undefined" ? this : global : self));

/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(133), __webpack_require__(134)))

/***/ }),
/* 133 */
/***/ (function(module, exports) {

var g;

// This works in non-strict mode
g = (function() {
	return this;
})();

try {
	// This works if eval is allowed (see CSP)
	g = g || Function("return this")() || (1,eval)("this");
} catch(e) {
	// This works if the window reference is available
	if(typeof window === "object")
		g = window;
}

// g can still be undefined, but nothing to do about it...
// We return undefined, instead of nothing here, so it's
// easier to handle this case. if(!global) { ...}

module.exports = g;


/***/ }),
/* 134 */
/***/ (function(module, exports) {

// shim for using process in browser
var process = module.exports = {};

// cached from whatever global is present so that test runners that stub it
// don't break things.  But we need to wrap it in a try catch in case it is
// wrapped in strict mode code which doesn't define any globals.  It's inside a
// function because try/catches deoptimize in certain engines.

var cachedSetTimeout;
var cachedClearTimeout;

function defaultSetTimout() {
    throw new Error('setTimeout has not been defined');
}
function defaultClearTimeout () {
    throw new Error('clearTimeout has not been defined');
}
(function () {
    try {
        if (typeof setTimeout === 'function') {
            cachedSetTimeout = setTimeout;
        } else {
            cachedSetTimeout = defaultSetTimout;
        }
    } catch (e) {
        cachedSetTimeout = defaultSetTimout;
    }
    try {
        if (typeof clearTimeout === 'function') {
            cachedClearTimeout = clearTimeout;
        } else {
            cachedClearTimeout = defaultClearTimeout;
        }
    } catch (e) {
        cachedClearTimeout = defaultClearTimeout;
    }
} ())
function runTimeout(fun) {
    if (cachedSetTimeout === setTimeout) {
        //normal enviroments in sane situations
        return setTimeout(fun, 0);
    }
    // if setTimeout wasn't available but was latter defined
    if ((cachedSetTimeout === defaultSetTimout || !cachedSetTimeout) && setTimeout) {
        cachedSetTimeout = setTimeout;
        return setTimeout(fun, 0);
    }
    try {
        // when when somebody has screwed with setTimeout but no I.E. maddness
        return cachedSetTimeout(fun, 0);
    } catch(e){
        try {
            // When we are in I.E. but the script has been evaled so I.E. doesn't trust the global object when called normally
            return cachedSetTimeout.call(null, fun, 0);
        } catch(e){
            // same as above but when it's a version of I.E. that must have the global object for 'this', hopfully our context correct otherwise it will throw a global error
            return cachedSetTimeout.call(this, fun, 0);
        }
    }


}
function runClearTimeout(marker) {
    if (cachedClearTimeout === clearTimeout) {
        //normal enviroments in sane situations
        return clearTimeout(marker);
    }
    // if clearTimeout wasn't available but was latter defined
    if ((cachedClearTimeout === defaultClearTimeout || !cachedClearTimeout) && clearTimeout) {
        cachedClearTimeout = clearTimeout;
        return clearTimeout(marker);
    }
    try {
        // when when somebody has screwed with setTimeout but no I.E. maddness
        return cachedClearTimeout(marker);
    } catch (e){
        try {
            // When we are in I.E. but the script has been evaled so I.E. doesn't  trust the global object when called normally
            return cachedClearTimeout.call(null, marker);
        } catch (e){
            // same as above but when it's a version of I.E. that must have the global object for 'this', hopfully our context correct otherwise it will throw a global error.
            // Some versions of I.E. have different rules for clearTimeout vs setTimeout
            return cachedClearTimeout.call(this, marker);
        }
    }



}
var queue = [];
var draining = false;
var currentQueue;
var queueIndex = -1;

function cleanUpNextTick() {
    if (!draining || !currentQueue) {
        return;
    }
    draining = false;
    if (currentQueue.length) {
        queue = currentQueue.concat(queue);
    } else {
        queueIndex = -1;
    }
    if (queue.length) {
        drainQueue();
    }
}

function drainQueue() {
    if (draining) {
        return;
    }
    var timeout = runTimeout(cleanUpNextTick);
    draining = true;

    var len = queue.length;
    while(len) {
        currentQueue = queue;
        queue = [];
        while (++queueIndex < len) {
            if (currentQueue) {
                currentQueue[queueIndex].run();
            }
        }
        queueIndex = -1;
        len = queue.length;
    }
    currentQueue = null;
    draining = false;
    runClearTimeout(timeout);
}

process.nextTick = function (fun) {
    var args = new Array(arguments.length - 1);
    if (arguments.length > 1) {
        for (var i = 1; i < arguments.length; i++) {
            args[i - 1] = arguments[i];
        }
    }
    queue.push(new Item(fun, args));
    if (queue.length === 1 && !draining) {
        runTimeout(drainQueue);
    }
};

// v8 likes predictible objects
function Item(fun, array) {
    this.fun = fun;
    this.array = array;
}
Item.prototype.run = function () {
    this.fun.apply(null, this.array);
};
process.title = 'browser';
process.browser = true;
process.env = {};
process.argv = [];
process.version = ''; // empty string to avoid regexp issues
process.versions = {};

function noop() {}

process.on = noop;
process.addListener = noop;
process.once = noop;
process.off = noop;
process.removeListener = noop;
process.removeAllListeners = noop;
process.emit = noop;
process.prependListener = noop;
process.prependOnceListener = noop;

process.listeners = function (name) { return [] }

process.binding = function (name) {
    throw new Error('process.binding is not supported');
};

process.cwd = function () { return '/' };
process.chdir = function (dir) {
    throw new Error('process.chdir is not supported');
};
process.umask = function() { return 0; };


/***/ }),
/* 135 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var FDBCursor_1 = __webpack_require__(99);
var FDBCursorWithValue_1 = __webpack_require__(137);
var FDBIndex_1 = __webpack_require__(342);
var FDBKeyRange_1 = __webpack_require__(51);
var FDBRequest_1 = __webpack_require__(69);
var canInjectKey_1 = __webpack_require__(343);
var enforceRange_1 = __webpack_require__(101);
var errors_1 = __webpack_require__(10);
var extractKey_1 = __webpack_require__(67);
var fakeDOMStringList_1 = __webpack_require__(70);
var Index_1 = __webpack_require__(344);
var structuredClone_1 = __webpack_require__(68);
var validateKeyPath_1 = __webpack_require__(140);
var valueToKey_1 = __webpack_require__(34);
var valueToKeyRange_1 = __webpack_require__(138);
var confirmActiveTransaction = function (objectStore) {
    if (objectStore._rawObjectStore.deleted) {
        throw new errors_1.InvalidStateError();
    }
    if (!objectStore.transaction._active) {
        throw new errors_1.TransactionInactiveError();
    }
};
var buildRecordAddPut = function (objectStore, value, key) {
    confirmActiveTransaction(objectStore);
    if (objectStore.transaction.mode === "readonly") {
        throw new errors_1.ReadOnlyError();
    }
    if (objectStore.keyPath !== null) {
        if (key !== undefined) {
            throw new errors_1.DataError();
        }
    }
    var clone = structuredClone_1.default(value);
    if (objectStore.keyPath !== null) {
        var tempKey = extractKey_1.default(objectStore.keyPath, value);
        if (tempKey !== undefined) {
            valueToKey_1.default(tempKey);
        }
        else {
            if (!objectStore._rawObjectStore.keyGenerator) {
                throw new errors_1.DataError();
            }
            else if (!canInjectKey_1.default(objectStore.keyPath, clone)) {
                throw new errors_1.DataError();
            }
        }
    }
    if (objectStore.keyPath === null && objectStore._rawObjectStore.keyGenerator === null && key === undefined) {
        throw new errors_1.DataError();
    }
    if (key !== undefined) {
        key = valueToKey_1.default(key);
    }
    return {
        key: key,
        value: clone,
    };
};
// http://www.w3.org/TR/2015/REC-IndexedDB-20150108/#object-store
var FDBObjectStore = (function () {
    function FDBObjectStore(transaction, rawObjectStore) {
        this._indexesCache = new Map();
        this._rawObjectStore = rawObjectStore;
        this._name = rawObjectStore.name;
        this.keyPath = rawObjectStore.keyPath;
        this.autoIncrement = rawObjectStore.autoIncrement;
        this.transaction = transaction;
        this.indexNames = fakeDOMStringList_1.default(Array.from(rawObjectStore.rawIndexes.keys())).sort();
    }
    Object.defineProperty(FDBObjectStore.prototype, "name", {
        get: function () {
            return this._name;
        },
        // http://w3c.github.io/IndexedDB/#dom-idbobjectstore-name
        set: function (name) {
            var _this = this;
            var transaction = this.transaction;
            if (!transaction.db._runningVersionchangeTransaction) {
                throw new errors_1.InvalidStateError();
            }
            confirmActiveTransaction(this);
            name = String(name);
            if (name === this._name) {
                return;
            }
            if (this._rawObjectStore.rawDatabase.rawObjectStores.has(name)) {
                throw new errors_1.ConstraintError();
            }
            var oldName = this._name;
            var oldObjectStoreNames = transaction.db.objectStoreNames.slice();
            this._name = name;
            this._rawObjectStore.name = name;
            this.transaction._objectStoresCache.delete(oldName);
            this.transaction._objectStoresCache.set(name, this);
            this._rawObjectStore.rawDatabase.rawObjectStores.delete(oldName);
            this._rawObjectStore.rawDatabase.rawObjectStores.set(name, this._rawObjectStore);
            transaction.db.objectStoreNames = fakeDOMStringList_1.default(Array.from(this._rawObjectStore.rawDatabase.rawObjectStores.keys())
                .filter(function (objectStoreName) {
                var objectStore = _this._rawObjectStore.rawDatabase.rawObjectStores.get(objectStoreName);
                return objectStore && !objectStore.deleted;
            })).sort();
            var oldScope = new Set(transaction._scope);
            var oldTransactionObjectStoreNames = transaction.objectStoreNames.slice();
            this.transaction._scope.delete(oldName);
            transaction._scope.add(name);
            transaction.objectStoreNames = fakeDOMStringList_1.default(Array.from(transaction._scope).sort());
            transaction._rollbackLog.push(function () {
                _this._name = oldName;
                _this._rawObjectStore.name = oldName;
                _this.transaction._objectStoresCache.delete(name);
                _this.transaction._objectStoresCache.set(oldName, _this);
                _this._rawObjectStore.rawDatabase.rawObjectStores.delete(name);
                _this._rawObjectStore.rawDatabase.rawObjectStores.set(oldName, _this._rawObjectStore);
                transaction.db.objectStoreNames = fakeDOMStringList_1.default(oldObjectStoreNames);
                transaction._scope = oldScope;
                transaction.objectStoreNames = fakeDOMStringList_1.default(oldTransactionObjectStoreNames);
            });
        },
        enumerable: true,
        configurable: true
    });
    FDBObjectStore.prototype.put = function (value, key) {
        if (arguments.length === 0) {
            throw new TypeError();
        }
        var record = buildRecordAddPut(this, value, key);
        return this.transaction._execRequestAsync({
            operation: this._rawObjectStore.storeRecord.bind(this._rawObjectStore, record, false, this.transaction._rollbackLog),
            source: this,
        });
    };
    FDBObjectStore.prototype.add = function (value, key) {
        if (arguments.length === 0) {
            throw new TypeError();
        }
        var record = buildRecordAddPut(this, value, key);
        return this.transaction._execRequestAsync({
            operation: this._rawObjectStore.storeRecord.bind(this._rawObjectStore, record, true, this.transaction._rollbackLog),
            source: this,
        });
    };
    FDBObjectStore.prototype.delete = function (key) {
        if (arguments.length === 0) {
            throw new TypeError();
        }
        confirmActiveTransaction(this);
        if (this.transaction.mode === "readonly") {
            throw new errors_1.ReadOnlyError();
        }
        if (!(key instanceof FDBKeyRange_1.default)) {
            key = valueToKey_1.default(key);
        }
        return this.transaction._execRequestAsync({
            operation: this._rawObjectStore.deleteRecord.bind(this._rawObjectStore, key, this.transaction._rollbackLog),
            source: this,
        });
    };
    FDBObjectStore.prototype.get = function (key) {
        if (arguments.length === 0) {
            throw new TypeError();
        }
        confirmActiveTransaction(this);
        if (!(key instanceof FDBKeyRange_1.default)) {
            key = valueToKey_1.default(key);
        }
        return this.transaction._execRequestAsync({
            operation: this._rawObjectStore.getValue.bind(this._rawObjectStore, key),
            source: this,
        });
    };
    // http://w3c.github.io/IndexedDB/#dom-idbobjectstore-getall
    FDBObjectStore.prototype.getAll = function (query, count) {
        if (arguments.length > 1 && count !== undefined) {
            count = enforceRange_1.default(count, "unsigned long");
        }
        confirmActiveTransaction(this);
        var range = valueToKeyRange_1.default(query);
        return this.transaction._execRequestAsync({
            operation: this._rawObjectStore.getAllValues.bind(this._rawObjectStore, range, count),
            source: this,
        });
    };
    // http://w3c.github.io/IndexedDB/#dom-idbobjectstore-getkey
    FDBObjectStore.prototype.getKey = function (key) {
        if (arguments.length === 0) {
            throw new TypeError();
        }
        confirmActiveTransaction(this);
        if (!(key instanceof FDBKeyRange_1.default)) {
            key = valueToKey_1.default(key);
        }
        return this.transaction._execRequestAsync({
            operation: this._rawObjectStore.getKey.bind(this._rawObjectStore, key),
            source: this,
        });
    };
    // http://w3c.github.io/IndexedDB/#dom-idbobjectstore-getallkeys
    FDBObjectStore.prototype.getAllKeys = function (query, count) {
        if (arguments.length > 1 && count !== undefined) {
            count = enforceRange_1.default(count, "unsigned long");
        }
        confirmActiveTransaction(this);
        var range = valueToKeyRange_1.default(query);
        return this.transaction._execRequestAsync({
            operation: this._rawObjectStore.getAllKeys.bind(this._rawObjectStore, range, count),
            source: this,
        });
    };
    FDBObjectStore.prototype.clear = function () {
        confirmActiveTransaction(this);
        if (this.transaction.mode === "readonly") {
            throw new errors_1.ReadOnlyError();
        }
        return this.transaction._execRequestAsync({
            operation: this._rawObjectStore.clear.bind(this._rawObjectStore, this.transaction._rollbackLog),
            source: this,
        });
    };
    FDBObjectStore.prototype.openCursor = function (range, direction) {
        confirmActiveTransaction(this);
        if (range === null) {
            range = undefined;
        }
        if (range !== undefined && !(range instanceof FDBKeyRange_1.default)) {
            range = FDBKeyRange_1.default.only(valueToKey_1.default(range));
        }
        var request = new FDBRequest_1.default();
        request.source = this;
        request.transaction = this.transaction;
        var cursor = new FDBCursorWithValue_1.default(this, range, direction, request);
        return this.transaction._execRequestAsync({
            operation: cursor._iterate.bind(cursor),
            request: request,
            source: this,
        });
    };
    FDBObjectStore.prototype.openKeyCursor = function (range, direction) {
        confirmActiveTransaction(this);
        if (range === null) {
            range = undefined;
        }
        if (range !== undefined && !(range instanceof FDBKeyRange_1.default)) {
            range = FDBKeyRange_1.default.only(valueToKey_1.default(range));
        }
        var request = new FDBRequest_1.default();
        request.source = this;
        request.transaction = this.transaction;
        var cursor = new FDBCursor_1.default(this, range, direction, request, true);
        return this.transaction._execRequestAsync({
            operation: cursor._iterate.bind(cursor),
            request: request,
            source: this,
        });
    };
    // tslint:disable-next-line max-line-length
    // http://www.w3.org/TR/2015/REC-IndexedDB-20150108/#widl-IDBObjectStore-createIndex-IDBIndex-DOMString-name-DOMString-sequence-DOMString--keyPath-IDBIndexParameters-optionalParameters
    FDBObjectStore.prototype.createIndex = function (name, keyPath, optionalParameters) {
        var _this = this;
        if (optionalParameters === void 0) { optionalParameters = {}; }
        if (arguments.length < 2) {
            throw new TypeError();
        }
        var multiEntry = optionalParameters.multiEntry !== undefined ? optionalParameters.multiEntry : false;
        var unique = optionalParameters.unique !== undefined ? optionalParameters.unique : false;
        if (this.transaction.mode !== "versionchange") {
            throw new errors_1.InvalidStateError();
        }
        confirmActiveTransaction(this);
        if (this.indexNames.indexOf(name) >= 0) {
            throw new errors_1.ConstraintError();
        }
        validateKeyPath_1.default(keyPath);
        if (Array.isArray(keyPath) && multiEntry) {
            throw new errors_1.InvalidAccessError();
        }
        // The index that is requested to be created can contain constraints on the data allowed in the index's
        // referenced object store, such as requiring uniqueness of the values referenced by the index's keyPath. If the
        // referenced object store already contains data which violates these constraints, this MUST NOT cause the
        // implementation of createIndex to throw an exception or affect what it returns. The implementation MUST still
        // create and return an IDBIndex object. Instead the implementation must queue up an operation to abort the
        // "versionchange" transaction which was used for the createIndex call.
        var indexNames = this.indexNames.slice();
        this.transaction._rollbackLog.push(function () {
            var index = _this._rawObjectStore.rawIndexes.get(name);
            if (index) {
                index.deleted = true;
            }
            _this.indexNames = fakeDOMStringList_1.default(indexNames);
            _this._rawObjectStore.rawIndexes.delete(name);
        });
        var index = new Index_1.default(this._rawObjectStore, name, keyPath, multiEntry, unique);
        this.indexNames.push(name);
        this.indexNames.sort();
        this._rawObjectStore.rawIndexes.set(name, index);
        index.initialize(this.transaction); // This is async by design
        return new FDBIndex_1.default(this, index);
    };
    // https://w3c.github.io/IndexedDB/#dom-idbobjectstore-index
    FDBObjectStore.prototype.index = function (name) {
        if (arguments.length === 0) {
            throw new TypeError();
        }
        if (this._rawObjectStore.deleted || this.transaction._finished) {
            throw new errors_1.InvalidStateError();
        }
        var index = this._indexesCache.get(name);
        if (index !== undefined) {
            return index;
        }
        var rawIndex = this._rawObjectStore.rawIndexes.get(name);
        if (this.indexNames.indexOf(name) < 0 || rawIndex === undefined) {
            throw new errors_1.NotFoundError();
        }
        var index2 = new FDBIndex_1.default(this, rawIndex);
        this._indexesCache.set(name, index2);
        return index2;
    };
    FDBObjectStore.prototype.deleteIndex = function (name) {
        var _this = this;
        if (arguments.length === 0) {
            throw new TypeError();
        }
        if (this.transaction.mode !== "versionchange") {
            throw new errors_1.InvalidStateError();
        }
        confirmActiveTransaction(this);
        var rawIndex = this._rawObjectStore.rawIndexes.get(name);
        if (rawIndex === undefined) {
            throw new errors_1.NotFoundError();
        }
        this.transaction._rollbackLog.push(function () {
            rawIndex.deleted = false;
            _this._rawObjectStore.rawIndexes.set(name, rawIndex);
            _this.indexNames.push(name);
            _this.indexNames.sort();
        });
        this.indexNames = fakeDOMStringList_1.default(this.indexNames.filter(function (indexName) {
            return indexName !== name;
        }));
        rawIndex.deleted = true; // Not sure if this is supposed to happen synchronously
        this.transaction._execRequestAsync({
            operation: function () {
                var rawIndex2 = _this._rawObjectStore.rawIndexes.get(name);
                // Hack in case another index is given this name before this async request is processed. It'd be better
                // to have a real unique ID for each index.
                if (rawIndex === rawIndex2) {
                    _this._rawObjectStore.rawIndexes.delete(name);
                }
            },
            source: this,
        });
    };
    // http://www.w3.org/TR/2015/REC-IndexedDB-20150108/#widl-IDBObjectStore-count-IDBRequest-any-key
    FDBObjectStore.prototype.count = function (key) {
        var _this = this;
        confirmActiveTransaction(this);
        if (key === null) {
            key = undefined;
        }
        if (key !== undefined && !(key instanceof FDBKeyRange_1.default)) {
            key = FDBKeyRange_1.default.only(valueToKey_1.default(key));
        }
        return this.transaction._execRequestAsync({
            operation: function () {
                var count = 0;
                var cursor = new FDBCursor_1.default(_this, key);
                while (cursor._iterate() !== null) {
                    count += 1;
                }
                return count;
            },
            source: this,
        });
    };
    FDBObjectStore.prototype.toString = function () {
        return "[object IDBObjectStore]";
    };
    return FDBObjectStore;
}());
exports.default = FDBObjectStore;


/***/ }),
/* 136 */
/***/ (function(module, exports) {

/**
 * lodash (Custom Build) <https://lodash.com/>
 * Build: `lodash modularize exports="npm" -o ./`
 * Copyright jQuery Foundation and other contributors <https://jquery.org/>
 * Released under MIT license <https://lodash.com/license>
 * Based on Underscore.js 1.8.3 <http://underscorejs.org/LICENSE>
 * Copyright Jeremy Ashkenas, DocumentCloud and Investigative Reporters & Editors
 */

/** Used as references for various `Number` constants. */
var MAX_SAFE_INTEGER = 9007199254740991;

/** `Object#toString` result references. */
var argsTag = '[object Arguments]',
    funcTag = '[object Function]',
    genTag = '[object GeneratorFunction]';

/** Used for built-in method references. */
var objectProto = Object.prototype;

/** Used to check objects for own properties. */
var hasOwnProperty = objectProto.hasOwnProperty;

/**
 * Used to resolve the
 * [`toStringTag`](http://ecma-international.org/ecma-262/7.0/#sec-object.prototype.tostring)
 * of values.
 */
var objectToString = objectProto.toString;

/** Built-in value references. */
var propertyIsEnumerable = objectProto.propertyIsEnumerable;

/**
 * Checks if `value` is likely an `arguments` object.
 *
 * @static
 * @memberOf _
 * @since 0.1.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is an `arguments` object,
 *  else `false`.
 * @example
 *
 * _.isArguments(function() { return arguments; }());
 * // => true
 *
 * _.isArguments([1, 2, 3]);
 * // => false
 */
function isArguments(value) {
  // Safari 8.1 makes `arguments.callee` enumerable in strict mode.
  return isArrayLikeObject(value) && hasOwnProperty.call(value, 'callee') &&
    (!propertyIsEnumerable.call(value, 'callee') || objectToString.call(value) == argsTag);
}

/**
 * Checks if `value` is array-like. A value is considered array-like if it's
 * not a function and has a `value.length` that's an integer greater than or
 * equal to `0` and less than or equal to `Number.MAX_SAFE_INTEGER`.
 *
 * @static
 * @memberOf _
 * @since 4.0.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is array-like, else `false`.
 * @example
 *
 * _.isArrayLike([1, 2, 3]);
 * // => true
 *
 * _.isArrayLike(document.body.children);
 * // => true
 *
 * _.isArrayLike('abc');
 * // => true
 *
 * _.isArrayLike(_.noop);
 * // => false
 */
function isArrayLike(value) {
  return value != null && isLength(value.length) && !isFunction(value);
}

/**
 * This method is like `_.isArrayLike` except that it also checks if `value`
 * is an object.
 *
 * @static
 * @memberOf _
 * @since 4.0.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is an array-like object,
 *  else `false`.
 * @example
 *
 * _.isArrayLikeObject([1, 2, 3]);
 * // => true
 *
 * _.isArrayLikeObject(document.body.children);
 * // => true
 *
 * _.isArrayLikeObject('abc');
 * // => false
 *
 * _.isArrayLikeObject(_.noop);
 * // => false
 */
function isArrayLikeObject(value) {
  return isObjectLike(value) && isArrayLike(value);
}

/**
 * Checks if `value` is classified as a `Function` object.
 *
 * @static
 * @memberOf _
 * @since 0.1.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is a function, else `false`.
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
  // in Safari 8-9 which returns 'object' for typed array and other constructors.
  var tag = isObject(value) ? objectToString.call(value) : '';
  return tag == funcTag || tag == genTag;
}

/**
 * Checks if `value` is a valid array-like length.
 *
 * **Note:** This method is loosely based on
 * [`ToLength`](http://ecma-international.org/ecma-262/7.0/#sec-tolength).
 *
 * @static
 * @memberOf _
 * @since 4.0.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is a valid length, else `false`.
 * @example
 *
 * _.isLength(3);
 * // => true
 *
 * _.isLength(Number.MIN_VALUE);
 * // => false
 *
 * _.isLength(Infinity);
 * // => false
 *
 * _.isLength('3');
 * // => false
 */
function isLength(value) {
  return typeof value == 'number' &&
    value > -1 && value % 1 == 0 && value <= MAX_SAFE_INTEGER;
}

/**
 * Checks if `value` is the
 * [language type](http://www.ecma-international.org/ecma-262/7.0/#sec-ecmascript-language-types)
 * of `Object`. (e.g. arrays, functions, objects, regexes, `new Number(0)`, and `new String('')`)
 *
 * @static
 * @memberOf _
 * @since 0.1.0
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
 * _.isObject(_.noop);
 * // => true
 *
 * _.isObject(null);
 * // => false
 */
function isObject(value) {
  var type = typeof value;
  return !!value && (type == 'object' || type == 'function');
}

/**
 * Checks if `value` is object-like. A value is object-like if it's not `null`
 * and has a `typeof` result of "object".
 *
 * @static
 * @memberOf _
 * @since 4.0.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is object-like, else `false`.
 * @example
 *
 * _.isObjectLike({});
 * // => true
 *
 * _.isObjectLike([1, 2, 3]);
 * // => true
 *
 * _.isObjectLike(_.noop);
 * // => false
 *
 * _.isObjectLike(null);
 * // => false
 */
function isObjectLike(value) {
  return !!value && typeof value == 'object';
}

module.exports = isArguments;


/***/ }),
/* 137 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var FDBCursor_1 = __webpack_require__(99);
var FDBCursorWithValue = (function (_super) {
    __extends(FDBCursorWithValue, _super);
    function FDBCursorWithValue(source, range, direction, request) {
        var _this = _super.call(this, source, range, direction, request) || this;
        _this.value = undefined;
        return _this;
    }
    FDBCursorWithValue.prototype.toString = function () {
        return "[object IDBCursorWithValue]";
    };
    return FDBCursorWithValue;
}(FDBCursor_1.default));
exports.default = FDBCursorWithValue;


/***/ }),
/* 138 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var FDBKeyRange_1 = __webpack_require__(51);
var errors_1 = __webpack_require__(10);
var valueToKey_1 = __webpack_require__(34);
// http://w3c.github.io/IndexedDB/#convert-a-value-to-a-key-range
var valueToKeyRange = function (value, nullDisallowedFlag) {
    if (nullDisallowedFlag === void 0) { nullDisallowedFlag = false; }
    if (value instanceof FDBKeyRange_1.default) {
        return value;
    }
    if (value === null || value === undefined) {
        if (nullDisallowedFlag) {
            throw new errors_1.DataError();
        }
        return new FDBKeyRange_1.default(undefined, undefined, false, false);
    }
    var key = valueToKey_1.default(value);
    return FDBKeyRange_1.default.only(key);
};
exports.default = valueToKeyRange;


/***/ }),
/* 139 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var FDBKeyRange_1 = __webpack_require__(51);
var cmp_1 = __webpack_require__(66);
var RecordStore = (function () {
    function RecordStore() {
        this.records = [];
    }
    RecordStore.prototype.get = function (key) {
        if (key instanceof FDBKeyRange_1.default) {
            return this.records.find(function (record) {
                return key.includes(record.key);
            });
        }
        return this.records.find(function (record) {
            return cmp_1.default(record.key, key) === 0;
        });
    };
    RecordStore.prototype.add = function (newRecord) {
        // Find where to put it so it's sorted by key
        var i;
        if (this.records.length === 0) {
            i = 0;
        }
        else {
            i = this.records.findIndex(function (record) {
                // cmp will only return 0 for an index. For an object store, any matching key has already been deleted,
                // but we still need to look for cmp = 1 to find where to insert.
                return cmp_1.default(record.key, newRecord.key) >= 0;
            });
            if (i === -1) {
                // If no matching key, add to end
                i = this.records.length;
            }
            else {
                // If matching key, advance to appropriate position based on value (used in indexes)
                while (i < this.records.length && cmp_1.default(this.records[i].key, newRecord.key) === 0) {
                    if (cmp_1.default(this.records[i].value, newRecord.value) !== -1) {
                        // Record value >= newRecord value, so insert here
                        break;
                    }
                    i += 1; // Look at next record
                }
            }
        }
        this.records.splice(i, 0, newRecord);
    };
    RecordStore.prototype.delete = function (key) {
        var range = key instanceof FDBKeyRange_1.default ? key : FDBKeyRange_1.default.only(key);
        var deletedRecords = [];
        this.records = this.records.filter(function (record) {
            var shouldDelete = range.includes(record.key);
            if (shouldDelete) {
                deletedRecords.push(record);
            }
            return !shouldDelete;
        });
        return deletedRecords;
    };
    RecordStore.prototype.deleteByValue = function (key) {
        var range = key instanceof FDBKeyRange_1.default ? key : FDBKeyRange_1.default.only(key);
        var deletedRecords = [];
        this.records = this.records.filter(function (record) {
            var shouldDelete = range.includes(record.value);
            if (shouldDelete) {
                deletedRecords.push(record);
            }
            return !shouldDelete;
        });
        return deletedRecords;
    };
    RecordStore.prototype.clear = function () {
        var deletedRecords = this.records.slice();
        this.records = [];
        return deletedRecords;
    };
    RecordStore.prototype.values = function (range, direction) {
        var _this = this;
        if (direction === void 0) { direction = "next"; }
        return _a = {},
            _a[Symbol.iterator] = function () {
                var i;
                if (direction === "next") {
                    i = 0;
                    if (range !== undefined && range.lower !== undefined) {
                        while (_this.records[i] !== undefined) {
                            var cmpResult = cmp_1.default(_this.records[i].key, range.lower);
                            if (cmpResult === 1 || (cmpResult === 0 && !range.lowerOpen)) {
                                break;
                            }
                            i += 1;
                        }
                    }
                }
                else {
                    i = _this.records.length - 1;
                    if (range !== undefined && range.upper !== undefined) {
                        while (_this.records[i] !== undefined) {
                            var cmpResult = cmp_1.default(_this.records[i].key, range.upper);
                            if (cmpResult === -1 || (cmpResult === 0 && !range.upperOpen)) {
                                break;
                            }
                            i -= 1;
                        }
                    }
                }
                return {
                    next: function () {
                        var done;
                        var value;
                        if (direction === "next") {
                            value = _this.records[i];
                            done = i >= _this.records.length;
                            i += 1;
                            if (!done && range !== undefined && range.upper !== undefined) {
                                var cmpResult = cmp_1.default(value.key, range.upper);
                                done = cmpResult === 1 || (cmpResult === 0 && range.upperOpen);
                                if (done) {
                                    value = undefined;
                                }
                            }
                        }
                        else {
                            value = _this.records[i];
                            done = i < 0;
                            i -= 1;
                            if (!done && range !== undefined && range.lower !== undefined) {
                                var cmpResult = cmp_1.default(value.key, range.lower);
                                done = cmpResult === -1 || (cmpResult === 0 && range.lowerOpen);
                                if (done) {
                                    value = undefined;
                                }
                            }
                        }
                        // The weird "as IteratorResult<Record>" is needed because of
                        // https://github.com/Microsoft/TypeScript/issues/11375 and
                        // https://github.com/Microsoft/TypeScript/issues/2983
                        // tslint:disable-next-line no-object-literal-type-assertion
                        return {
                            value: value,
                            done: done,
                        };
                    },
                };
            },
            _a;
        var _a;
    };
    return RecordStore;
}());
exports.default = RecordStore;


/***/ }),
/* 140 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __values = (this && this.__values) || function (o) {
    var m = typeof Symbol === "function" && o[Symbol.iterator], i = 0;
    if (m) return m.call(o);
    return {
        next: function () {
            if (o && i >= o.length) o = void 0;
            return { value: o && o[i++], done: !o };
        }
    };
};
Object.defineProperty(exports, "__esModule", { value: true });
// http://www.w3.org/TR/2015/REC-IndexedDB-20150108/#dfn-valid-key-path
var validateKeyPath = function (keyPath, parent) {
    // This doesn't make sense to me based on the spec, but it is needed to pass the W3C KeyPath tests (see same
    // comment in extractKey)
    if (keyPath !== undefined &&
        keyPath !== null &&
        typeof keyPath !== "string" &&
        keyPath.toString &&
        (parent === "array" || !Array.isArray(keyPath))) {
        keyPath = keyPath.toString();
    }
    if (typeof keyPath === "string") {
        if (keyPath === "" && parent !== "string") {
            return;
        }
        try {
            // https://mathiasbynens.be/demo/javascript-identifier-regex for ECMAScript 5.1 / Unicode v7.0.0, with
            // reserved words at beginning removed
            // tslint:disable-next-line max-line-length
            var validIdentifierRegex = /^(?:[\$A-Z_a-z\xAA\xB5\xBA\xC0-\xD6\xD8-\xF6\xF8-\u02C1\u02C6-\u02D1\u02E0-\u02E4\u02EC\u02EE\u0370-\u0374\u0376\u0377\u037A-\u037D\u037F\u0386\u0388-\u038A\u038C\u038E-\u03A1\u03A3-\u03F5\u03F7-\u0481\u048A-\u052F\u0531-\u0556\u0559\u0561-\u0587\u05D0-\u05EA\u05F0-\u05F2\u0620-\u064A\u066E\u066F\u0671-\u06D3\u06D5\u06E5\u06E6\u06EE\u06EF\u06FA-\u06FC\u06FF\u0710\u0712-\u072F\u074D-\u07A5\u07B1\u07CA-\u07EA\u07F4\u07F5\u07FA\u0800-\u0815\u081A\u0824\u0828\u0840-\u0858\u08A0-\u08B2\u0904-\u0939\u093D\u0950\u0958-\u0961\u0971-\u0980\u0985-\u098C\u098F\u0990\u0993-\u09A8\u09AA-\u09B0\u09B2\u09B6-\u09B9\u09BD\u09CE\u09DC\u09DD\u09DF-\u09E1\u09F0\u09F1\u0A05-\u0A0A\u0A0F\u0A10\u0A13-\u0A28\u0A2A-\u0A30\u0A32\u0A33\u0A35\u0A36\u0A38\u0A39\u0A59-\u0A5C\u0A5E\u0A72-\u0A74\u0A85-\u0A8D\u0A8F-\u0A91\u0A93-\u0AA8\u0AAA-\u0AB0\u0AB2\u0AB3\u0AB5-\u0AB9\u0ABD\u0AD0\u0AE0\u0AE1\u0B05-\u0B0C\u0B0F\u0B10\u0B13-\u0B28\u0B2A-\u0B30\u0B32\u0B33\u0B35-\u0B39\u0B3D\u0B5C\u0B5D\u0B5F-\u0B61\u0B71\u0B83\u0B85-\u0B8A\u0B8E-\u0B90\u0B92-\u0B95\u0B99\u0B9A\u0B9C\u0B9E\u0B9F\u0BA3\u0BA4\u0BA8-\u0BAA\u0BAE-\u0BB9\u0BD0\u0C05-\u0C0C\u0C0E-\u0C10\u0C12-\u0C28\u0C2A-\u0C39\u0C3D\u0C58\u0C59\u0C60\u0C61\u0C85-\u0C8C\u0C8E-\u0C90\u0C92-\u0CA8\u0CAA-\u0CB3\u0CB5-\u0CB9\u0CBD\u0CDE\u0CE0\u0CE1\u0CF1\u0CF2\u0D05-\u0D0C\u0D0E-\u0D10\u0D12-\u0D3A\u0D3D\u0D4E\u0D60\u0D61\u0D7A-\u0D7F\u0D85-\u0D96\u0D9A-\u0DB1\u0DB3-\u0DBB\u0DBD\u0DC0-\u0DC6\u0E01-\u0E30\u0E32\u0E33\u0E40-\u0E46\u0E81\u0E82\u0E84\u0E87\u0E88\u0E8A\u0E8D\u0E94-\u0E97\u0E99-\u0E9F\u0EA1-\u0EA3\u0EA5\u0EA7\u0EAA\u0EAB\u0EAD-\u0EB0\u0EB2\u0EB3\u0EBD\u0EC0-\u0EC4\u0EC6\u0EDC-\u0EDF\u0F00\u0F40-\u0F47\u0F49-\u0F6C\u0F88-\u0F8C\u1000-\u102A\u103F\u1050-\u1055\u105A-\u105D\u1061\u1065\u1066\u106E-\u1070\u1075-\u1081\u108E\u10A0-\u10C5\u10C7\u10CD\u10D0-\u10FA\u10FC-\u1248\u124A-\u124D\u1250-\u1256\u1258\u125A-\u125D\u1260-\u1288\u128A-\u128D\u1290-\u12B0\u12B2-\u12B5\u12B8-\u12BE\u12C0\u12C2-\u12C5\u12C8-\u12D6\u12D8-\u1310\u1312-\u1315\u1318-\u135A\u1380-\u138F\u13A0-\u13F4\u1401-\u166C\u166F-\u167F\u1681-\u169A\u16A0-\u16EA\u16EE-\u16F8\u1700-\u170C\u170E-\u1711\u1720-\u1731\u1740-\u1751\u1760-\u176C\u176E-\u1770\u1780-\u17B3\u17D7\u17DC\u1820-\u1877\u1880-\u18A8\u18AA\u18B0-\u18F5\u1900-\u191E\u1950-\u196D\u1970-\u1974\u1980-\u19AB\u19C1-\u19C7\u1A00-\u1A16\u1A20-\u1A54\u1AA7\u1B05-\u1B33\u1B45-\u1B4B\u1B83-\u1BA0\u1BAE\u1BAF\u1BBA-\u1BE5\u1C00-\u1C23\u1C4D-\u1C4F\u1C5A-\u1C7D\u1CE9-\u1CEC\u1CEE-\u1CF1\u1CF5\u1CF6\u1D00-\u1DBF\u1E00-\u1F15\u1F18-\u1F1D\u1F20-\u1F45\u1F48-\u1F4D\u1F50-\u1F57\u1F59\u1F5B\u1F5D\u1F5F-\u1F7D\u1F80-\u1FB4\u1FB6-\u1FBC\u1FBE\u1FC2-\u1FC4\u1FC6-\u1FCC\u1FD0-\u1FD3\u1FD6-\u1FDB\u1FE0-\u1FEC\u1FF2-\u1FF4\u1FF6-\u1FFC\u2071\u207F\u2090-\u209C\u2102\u2107\u210A-\u2113\u2115\u2119-\u211D\u2124\u2126\u2128\u212A-\u212D\u212F-\u2139\u213C-\u213F\u2145-\u2149\u214E\u2160-\u2188\u2C00-\u2C2E\u2C30-\u2C5E\u2C60-\u2CE4\u2CEB-\u2CEE\u2CF2\u2CF3\u2D00-\u2D25\u2D27\u2D2D\u2D30-\u2D67\u2D6F\u2D80-\u2D96\u2DA0-\u2DA6\u2DA8-\u2DAE\u2DB0-\u2DB6\u2DB8-\u2DBE\u2DC0-\u2DC6\u2DC8-\u2DCE\u2DD0-\u2DD6\u2DD8-\u2DDE\u2E2F\u3005-\u3007\u3021-\u3029\u3031-\u3035\u3038-\u303C\u3041-\u3096\u309D-\u309F\u30A1-\u30FA\u30FC-\u30FF\u3105-\u312D\u3131-\u318E\u31A0-\u31BA\u31F0-\u31FF\u3400-\u4DB5\u4E00-\u9FCC\uA000-\uA48C\uA4D0-\uA4FD\uA500-\uA60C\uA610-\uA61F\uA62A\uA62B\uA640-\uA66E\uA67F-\uA69D\uA6A0-\uA6EF\uA717-\uA71F\uA722-\uA788\uA78B-\uA78E\uA790-\uA7AD\uA7B0\uA7B1\uA7F7-\uA801\uA803-\uA805\uA807-\uA80A\uA80C-\uA822\uA840-\uA873\uA882-\uA8B3\uA8F2-\uA8F7\uA8FB\uA90A-\uA925\uA930-\uA946\uA960-\uA97C\uA984-\uA9B2\uA9CF\uA9E0-\uA9E4\uA9E6-\uA9EF\uA9FA-\uA9FE\uAA00-\uAA28\uAA40-\uAA42\uAA44-\uAA4B\uAA60-\uAA76\uAA7A\uAA7E-\uAAAF\uAAB1\uAAB5\uAAB6\uAAB9-\uAABD\uAAC0\uAAC2\uAADB-\uAADD\uAAE0-\uAAEA\uAAF2-\uAAF4\uAB01-\uAB06\uAB09-\uAB0E\uAB11-\uAB16\uAB20-\uAB26\uAB28-\uAB2E\uAB30-\uAB5A\uAB5C-\uAB5F\uAB64\uAB65\uABC0-\uABE2\uAC00-\uD7A3\uD7B0-\uD7C6\uD7CB-\uD7FB\uF900-\uFA6D\uFA70-\uFAD9\uFB00-\uFB06\uFB13-\uFB17\uFB1D\uFB1F-\uFB28\uFB2A-\uFB36\uFB38-\uFB3C\uFB3E\uFB40\uFB41\uFB43\uFB44\uFB46-\uFBB1\uFBD3-\uFD3D\uFD50-\uFD8F\uFD92-\uFDC7\uFDF0-\uFDFB\uFE70-\uFE74\uFE76-\uFEFC\uFF21-\uFF3A\uFF41-\uFF5A\uFF66-\uFFBE\uFFC2-\uFFC7\uFFCA-\uFFCF\uFFD2-\uFFD7\uFFDA-\uFFDC])(?:[\$0-9A-Z_a-z\xAA\xB5\xBA\xC0-\xD6\xD8-\xF6\xF8-\u02C1\u02C6-\u02D1\u02E0-\u02E4\u02EC\u02EE\u0300-\u0374\u0376\u0377\u037A-\u037D\u037F\u0386\u0388-\u038A\u038C\u038E-\u03A1\u03A3-\u03F5\u03F7-\u0481\u0483-\u0487\u048A-\u052F\u0531-\u0556\u0559\u0561-\u0587\u0591-\u05BD\u05BF\u05C1\u05C2\u05C4\u05C5\u05C7\u05D0-\u05EA\u05F0-\u05F2\u0610-\u061A\u0620-\u0669\u066E-\u06D3\u06D5-\u06DC\u06DF-\u06E8\u06EA-\u06FC\u06FF\u0710-\u074A\u074D-\u07B1\u07C0-\u07F5\u07FA\u0800-\u082D\u0840-\u085B\u08A0-\u08B2\u08E4-\u0963\u0966-\u096F\u0971-\u0983\u0985-\u098C\u098F\u0990\u0993-\u09A8\u09AA-\u09B0\u09B2\u09B6-\u09B9\u09BC-\u09C4\u09C7\u09C8\u09CB-\u09CE\u09D7\u09DC\u09DD\u09DF-\u09E3\u09E6-\u09F1\u0A01-\u0A03\u0A05-\u0A0A\u0A0F\u0A10\u0A13-\u0A28\u0A2A-\u0A30\u0A32\u0A33\u0A35\u0A36\u0A38\u0A39\u0A3C\u0A3E-\u0A42\u0A47\u0A48\u0A4B-\u0A4D\u0A51\u0A59-\u0A5C\u0A5E\u0A66-\u0A75\u0A81-\u0A83\u0A85-\u0A8D\u0A8F-\u0A91\u0A93-\u0AA8\u0AAA-\u0AB0\u0AB2\u0AB3\u0AB5-\u0AB9\u0ABC-\u0AC5\u0AC7-\u0AC9\u0ACB-\u0ACD\u0AD0\u0AE0-\u0AE3\u0AE6-\u0AEF\u0B01-\u0B03\u0B05-\u0B0C\u0B0F\u0B10\u0B13-\u0B28\u0B2A-\u0B30\u0B32\u0B33\u0B35-\u0B39\u0B3C-\u0B44\u0B47\u0B48\u0B4B-\u0B4D\u0B56\u0B57\u0B5C\u0B5D\u0B5F-\u0B63\u0B66-\u0B6F\u0B71\u0B82\u0B83\u0B85-\u0B8A\u0B8E-\u0B90\u0B92-\u0B95\u0B99\u0B9A\u0B9C\u0B9E\u0B9F\u0BA3\u0BA4\u0BA8-\u0BAA\u0BAE-\u0BB9\u0BBE-\u0BC2\u0BC6-\u0BC8\u0BCA-\u0BCD\u0BD0\u0BD7\u0BE6-\u0BEF\u0C00-\u0C03\u0C05-\u0C0C\u0C0E-\u0C10\u0C12-\u0C28\u0C2A-\u0C39\u0C3D-\u0C44\u0C46-\u0C48\u0C4A-\u0C4D\u0C55\u0C56\u0C58\u0C59\u0C60-\u0C63\u0C66-\u0C6F\u0C81-\u0C83\u0C85-\u0C8C\u0C8E-\u0C90\u0C92-\u0CA8\u0CAA-\u0CB3\u0CB5-\u0CB9\u0CBC-\u0CC4\u0CC6-\u0CC8\u0CCA-\u0CCD\u0CD5\u0CD6\u0CDE\u0CE0-\u0CE3\u0CE6-\u0CEF\u0CF1\u0CF2\u0D01-\u0D03\u0D05-\u0D0C\u0D0E-\u0D10\u0D12-\u0D3A\u0D3D-\u0D44\u0D46-\u0D48\u0D4A-\u0D4E\u0D57\u0D60-\u0D63\u0D66-\u0D6F\u0D7A-\u0D7F\u0D82\u0D83\u0D85-\u0D96\u0D9A-\u0DB1\u0DB3-\u0DBB\u0DBD\u0DC0-\u0DC6\u0DCA\u0DCF-\u0DD4\u0DD6\u0DD8-\u0DDF\u0DE6-\u0DEF\u0DF2\u0DF3\u0E01-\u0E3A\u0E40-\u0E4E\u0E50-\u0E59\u0E81\u0E82\u0E84\u0E87\u0E88\u0E8A\u0E8D\u0E94-\u0E97\u0E99-\u0E9F\u0EA1-\u0EA3\u0EA5\u0EA7\u0EAA\u0EAB\u0EAD-\u0EB9\u0EBB-\u0EBD\u0EC0-\u0EC4\u0EC6\u0EC8-\u0ECD\u0ED0-\u0ED9\u0EDC-\u0EDF\u0F00\u0F18\u0F19\u0F20-\u0F29\u0F35\u0F37\u0F39\u0F3E-\u0F47\u0F49-\u0F6C\u0F71-\u0F84\u0F86-\u0F97\u0F99-\u0FBC\u0FC6\u1000-\u1049\u1050-\u109D\u10A0-\u10C5\u10C7\u10CD\u10D0-\u10FA\u10FC-\u1248\u124A-\u124D\u1250-\u1256\u1258\u125A-\u125D\u1260-\u1288\u128A-\u128D\u1290-\u12B0\u12B2-\u12B5\u12B8-\u12BE\u12C0\u12C2-\u12C5\u12C8-\u12D6\u12D8-\u1310\u1312-\u1315\u1318-\u135A\u135D-\u135F\u1380-\u138F\u13A0-\u13F4\u1401-\u166C\u166F-\u167F\u1681-\u169A\u16A0-\u16EA\u16EE-\u16F8\u1700-\u170C\u170E-\u1714\u1720-\u1734\u1740-\u1753\u1760-\u176C\u176E-\u1770\u1772\u1773\u1780-\u17D3\u17D7\u17DC\u17DD\u17E0-\u17E9\u180B-\u180D\u1810-\u1819\u1820-\u1877\u1880-\u18AA\u18B0-\u18F5\u1900-\u191E\u1920-\u192B\u1930-\u193B\u1946-\u196D\u1970-\u1974\u1980-\u19AB\u19B0-\u19C9\u19D0-\u19D9\u1A00-\u1A1B\u1A20-\u1A5E\u1A60-\u1A7C\u1A7F-\u1A89\u1A90-\u1A99\u1AA7\u1AB0-\u1ABD\u1B00-\u1B4B\u1B50-\u1B59\u1B6B-\u1B73\u1B80-\u1BF3\u1C00-\u1C37\u1C40-\u1C49\u1C4D-\u1C7D\u1CD0-\u1CD2\u1CD4-\u1CF6\u1CF8\u1CF9\u1D00-\u1DF5\u1DFC-\u1F15\u1F18-\u1F1D\u1F20-\u1F45\u1F48-\u1F4D\u1F50-\u1F57\u1F59\u1F5B\u1F5D\u1F5F-\u1F7D\u1F80-\u1FB4\u1FB6-\u1FBC\u1FBE\u1FC2-\u1FC4\u1FC6-\u1FCC\u1FD0-\u1FD3\u1FD6-\u1FDB\u1FE0-\u1FEC\u1FF2-\u1FF4\u1FF6-\u1FFC\u200C\u200D\u203F\u2040\u2054\u2071\u207F\u2090-\u209C\u20D0-\u20DC\u20E1\u20E5-\u20F0\u2102\u2107\u210A-\u2113\u2115\u2119-\u211D\u2124\u2126\u2128\u212A-\u212D\u212F-\u2139\u213C-\u213F\u2145-\u2149\u214E\u2160-\u2188\u2C00-\u2C2E\u2C30-\u2C5E\u2C60-\u2CE4\u2CEB-\u2CF3\u2D00-\u2D25\u2D27\u2D2D\u2D30-\u2D67\u2D6F\u2D7F-\u2D96\u2DA0-\u2DA6\u2DA8-\u2DAE\u2DB0-\u2DB6\u2DB8-\u2DBE\u2DC0-\u2DC6\u2DC8-\u2DCE\u2DD0-\u2DD6\u2DD8-\u2DDE\u2DE0-\u2DFF\u2E2F\u3005-\u3007\u3021-\u302F\u3031-\u3035\u3038-\u303C\u3041-\u3096\u3099\u309A\u309D-\u309F\u30A1-\u30FA\u30FC-\u30FF\u3105-\u312D\u3131-\u318E\u31A0-\u31BA\u31F0-\u31FF\u3400-\u4DB5\u4E00-\u9FCC\uA000-\uA48C\uA4D0-\uA4FD\uA500-\uA60C\uA610-\uA62B\uA640-\uA66F\uA674-\uA67D\uA67F-\uA69D\uA69F-\uA6F1\uA717-\uA71F\uA722-\uA788\uA78B-\uA78E\uA790-\uA7AD\uA7B0\uA7B1\uA7F7-\uA827\uA840-\uA873\uA880-\uA8C4\uA8D0-\uA8D9\uA8E0-\uA8F7\uA8FB\uA900-\uA92D\uA930-\uA953\uA960-\uA97C\uA980-\uA9C0\uA9CF-\uA9D9\uA9E0-\uA9FE\uAA00-\uAA36\uAA40-\uAA4D\uAA50-\uAA59\uAA60-\uAA76\uAA7A-\uAAC2\uAADB-\uAADD\uAAE0-\uAAEF\uAAF2-\uAAF6\uAB01-\uAB06\uAB09-\uAB0E\uAB11-\uAB16\uAB20-\uAB26\uAB28-\uAB2E\uAB30-\uAB5A\uAB5C-\uAB5F\uAB64\uAB65\uABC0-\uABEA\uABEC\uABED\uABF0-\uABF9\uAC00-\uD7A3\uD7B0-\uD7C6\uD7CB-\uD7FB\uF900-\uFA6D\uFA70-\uFAD9\uFB00-\uFB06\uFB13-\uFB17\uFB1D-\uFB28\uFB2A-\uFB36\uFB38-\uFB3C\uFB3E\uFB40\uFB41\uFB43\uFB44\uFB46-\uFBB1\uFBD3-\uFD3D\uFD50-\uFD8F\uFD92-\uFDC7\uFDF0-\uFDFB\uFE00-\uFE0F\uFE20-\uFE2D\uFE33\uFE34\uFE4D-\uFE4F\uFE70-\uFE74\uFE76-\uFEFC\uFF10-\uFF19\uFF21-\uFF3A\uFF3F\uFF41-\uFF5A\uFF66-\uFFBE\uFFC2-\uFFC7\uFFCA-\uFFCF\uFFD2-\uFFD7\uFFDA-\uFFDC])*$/;
            if (keyPath.length >= 1 && validIdentifierRegex.test(keyPath)) {
                return;
            }
        }
        catch (err) {
            throw new SyntaxError(err.message);
        }
        if (keyPath.indexOf(" ") >= 0) {
            throw new SyntaxError("The keypath argument contains an invalid key path (no spaces allowed).");
        }
    }
    if (Array.isArray(keyPath) && keyPath.length > 0) {
        if (parent) {
            // No nested arrays
            throw new SyntaxError("The keypath argument contains an invalid key path (nested arrays).");
        }
        try {
            for (var keyPath_1 = __values(keyPath), keyPath_1_1 = keyPath_1.next(); !keyPath_1_1.done; keyPath_1_1 = keyPath_1.next()) {
                var part = keyPath_1_1.value;
                validateKeyPath(part, "array");
            }
        }
        catch (e_1_1) { e_1 = { error: e_1_1 }; }
        finally {
            try {
                if (keyPath_1_1 && !keyPath_1_1.done && (_a = keyPath_1.return)) _a.call(keyPath_1);
            }
            finally { if (e_1) throw e_1.error; }
        }
        return;
    }
    else if (typeof keyPath === "string" && keyPath.indexOf(".") >= 0) {
        keyPath = keyPath.split(".");
        try {
            for (var keyPath_2 = __values(keyPath), keyPath_2_1 = keyPath_2.next(); !keyPath_2_1.done; keyPath_2_1 = keyPath_2.next()) {
                var part = keyPath_2_1.value;
                validateKeyPath(part, "string");
            }
        }
        catch (e_2_1) { e_2 = { error: e_2_1 }; }
        finally {
            try {
                if (keyPath_2_1 && !keyPath_2_1.done && (_b = keyPath_2.return)) _b.call(keyPath_2);
            }
            finally { if (e_2) throw e_2.error; }
        }
        return;
    }
    throw new SyntaxError();
    var e_1, _a, e_2, _b;
};
exports.default = validateKeyPath;


/***/ }),
/* 141 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
__webpack_require__(142);
var fakeIndexedDB_1 = __webpack_require__(330);
module.exports = fakeIndexedDB_1.default;


/***/ }),
/* 142 */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(143);
__webpack_require__(318);
__webpack_require__(50);
__webpack_require__(319);
__webpack_require__(130);
__webpack_require__(320);
__webpack_require__(321);
__webpack_require__(322);
__webpack_require__(323);
__webpack_require__(324);
__webpack_require__(325);
__webpack_require__(326);
__webpack_require__(327);
__webpack_require__(328);
__webpack_require__(329);
module.exports = __webpack_require__(14);

/***/ }),
/* 143 */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(144);
__webpack_require__(146);
__webpack_require__(147);
__webpack_require__(148);
__webpack_require__(149);
__webpack_require__(150);
__webpack_require__(151);
__webpack_require__(152);
__webpack_require__(153);
__webpack_require__(154);
__webpack_require__(155);
__webpack_require__(156);
__webpack_require__(157);
__webpack_require__(158);
__webpack_require__(159);
__webpack_require__(160);
__webpack_require__(161);
__webpack_require__(162);
__webpack_require__(163);
__webpack_require__(164);
__webpack_require__(165);
__webpack_require__(166);
__webpack_require__(167);
__webpack_require__(168);
__webpack_require__(169);
__webpack_require__(170);
__webpack_require__(171);
__webpack_require__(172);
__webpack_require__(173);
__webpack_require__(174);
__webpack_require__(175);
__webpack_require__(176);
__webpack_require__(177);
__webpack_require__(178);
__webpack_require__(179);
__webpack_require__(180);
__webpack_require__(181);
__webpack_require__(182);
__webpack_require__(183);
__webpack_require__(184);
__webpack_require__(185);
__webpack_require__(186);
__webpack_require__(187);
__webpack_require__(188);
__webpack_require__(189);
__webpack_require__(190);
__webpack_require__(191);
__webpack_require__(192);
__webpack_require__(193);
__webpack_require__(194);
__webpack_require__(195);
__webpack_require__(196);
__webpack_require__(197);
__webpack_require__(198);
__webpack_require__(199);
__webpack_require__(200);
__webpack_require__(201);
__webpack_require__(202);
__webpack_require__(203);
__webpack_require__(204);
__webpack_require__(205);
__webpack_require__(206);
__webpack_require__(207);
__webpack_require__(208);
__webpack_require__(209);
__webpack_require__(210);
__webpack_require__(211);
__webpack_require__(212);
__webpack_require__(213);
__webpack_require__(214);
__webpack_require__(215);
__webpack_require__(216);
__webpack_require__(217);
__webpack_require__(218);
__webpack_require__(219);
__webpack_require__(220);
__webpack_require__(221);
__webpack_require__(222);
__webpack_require__(223);
__webpack_require__(225);
__webpack_require__(226);
__webpack_require__(227);
__webpack_require__(228);
__webpack_require__(229);
__webpack_require__(230);
__webpack_require__(231);
__webpack_require__(234);
__webpack_require__(235);
__webpack_require__(236);
__webpack_require__(237);
__webpack_require__(238);
__webpack_require__(239);
__webpack_require__(240);
__webpack_require__(241);
__webpack_require__(242);
__webpack_require__(243);
__webpack_require__(244);
__webpack_require__(245);
__webpack_require__(246);
__webpack_require__(90);
__webpack_require__(247);
__webpack_require__(248);
__webpack_require__(119);
__webpack_require__(249);
__webpack_require__(250);
__webpack_require__(251);
__webpack_require__(252);
__webpack_require__(253);
__webpack_require__(120);
__webpack_require__(122);
__webpack_require__(123);
__webpack_require__(254);
__webpack_require__(255);
__webpack_require__(256);
__webpack_require__(257);
__webpack_require__(258);
__webpack_require__(259);
__webpack_require__(260);
__webpack_require__(261);
__webpack_require__(262);
__webpack_require__(263);
__webpack_require__(264);
__webpack_require__(265);
__webpack_require__(266);
__webpack_require__(267);
__webpack_require__(268);
__webpack_require__(269);
__webpack_require__(270);
__webpack_require__(271);
__webpack_require__(272);
__webpack_require__(273);
__webpack_require__(274);
__webpack_require__(275);
__webpack_require__(276);
__webpack_require__(277);
__webpack_require__(278);
__webpack_require__(279);
__webpack_require__(280);
__webpack_require__(281);
__webpack_require__(282);
__webpack_require__(283);
__webpack_require__(284);
__webpack_require__(285);
__webpack_require__(286);
__webpack_require__(287);
__webpack_require__(288);
__webpack_require__(289);
__webpack_require__(290);
__webpack_require__(291);
__webpack_require__(292);
__webpack_require__(293);
__webpack_require__(294);
__webpack_require__(295);
__webpack_require__(296);
__webpack_require__(297);
__webpack_require__(298);
__webpack_require__(299);
__webpack_require__(300);
__webpack_require__(301);
__webpack_require__(302);
__webpack_require__(303);
__webpack_require__(304);
__webpack_require__(305);
__webpack_require__(306);
__webpack_require__(307);
__webpack_require__(308);
__webpack_require__(309);
__webpack_require__(310);
__webpack_require__(311);
__webpack_require__(312);
__webpack_require__(313);
__webpack_require__(314);
__webpack_require__(315);
__webpack_require__(316);
__webpack_require__(317);
module.exports = __webpack_require__(14);

/***/ }),
/* 144 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

// ECMAScript 6 symbols shim
var global         = __webpack_require__(2)
  , has            = __webpack_require__(11)
  , DESCRIPTORS    = __webpack_require__(7)
  , $export        = __webpack_require__(0)
  , redefine       = __webpack_require__(16)
  , META           = __webpack_require__(31).KEY
  , $fails         = __webpack_require__(3)
  , shared         = __webpack_require__(52)
  , setToStringTag = __webpack_require__(45)
  , uid            = __webpack_require__(35)
  , wks            = __webpack_require__(5)
  , wksExt         = __webpack_require__(104)
  , wksDefine      = __webpack_require__(72)
  , keyOf          = __webpack_require__(105)
  , enumKeys       = __webpack_require__(145)
  , isArray        = __webpack_require__(75)
  , anObject       = __webpack_require__(1)
  , toIObject      = __webpack_require__(12)
  , toPrimitive    = __webpack_require__(23)
  , createDesc     = __webpack_require__(27)
  , _create        = __webpack_require__(28)
  , gOPNExt        = __webpack_require__(108)
  , $GOPD          = __webpack_require__(17)
  , $DP            = __webpack_require__(6)
  , $keys          = __webpack_require__(32)
  , gOPD           = $GOPD.f
  , dP             = $DP.f
  , gOPN           = gOPNExt.f
  , $Symbol        = global.Symbol
  , $JSON          = global.JSON
  , _stringify     = $JSON && $JSON.stringify
  , PROTOTYPE      = 'prototype'
  , HIDDEN         = wks('_hidden')
  , TO_PRIMITIVE   = wks('toPrimitive')
  , isEnum         = {}.propertyIsEnumerable
  , SymbolRegistry = shared('symbol-registry')
  , AllSymbols     = shared('symbols')
  , OPSymbols      = shared('op-symbols')
  , ObjectProto    = Object[PROTOTYPE]
  , USE_NATIVE     = typeof $Symbol == 'function'
  , QObject        = global.QObject;
// Don't use setters in Qt Script, https://github.com/zloirock/core-js/issues/173
var setter = !QObject || !QObject[PROTOTYPE] || !QObject[PROTOTYPE].findChild;

// fallback for old Android, https://code.google.com/p/v8/issues/detail?id=687
var setSymbolDesc = DESCRIPTORS && $fails(function(){
  return _create(dP({}, 'a', {
    get: function(){ return dP(this, 'a', {value: 7}).a; }
  })).a != 7;
}) ? function(it, key, D){
  var protoDesc = gOPD(ObjectProto, key);
  if(protoDesc)delete ObjectProto[key];
  dP(it, key, D);
  if(protoDesc && it !== ObjectProto)dP(ObjectProto, key, protoDesc);
} : dP;

var wrap = function(tag){
  var sym = AllSymbols[tag] = _create($Symbol[PROTOTYPE]);
  sym._k = tag;
  return sym;
};

var isSymbol = USE_NATIVE && typeof $Symbol.iterator == 'symbol' ? function(it){
  return typeof it == 'symbol';
} : function(it){
  return it instanceof $Symbol;
};

var $defineProperty = function defineProperty(it, key, D){
  if(it === ObjectProto)$defineProperty(OPSymbols, key, D);
  anObject(it);
  key = toPrimitive(key, true);
  anObject(D);
  if(has(AllSymbols, key)){
    if(!D.enumerable){
      if(!has(it, HIDDEN))dP(it, HIDDEN, createDesc(1, {}));
      it[HIDDEN][key] = true;
    } else {
      if(has(it, HIDDEN) && it[HIDDEN][key])it[HIDDEN][key] = false;
      D = _create(D, {enumerable: createDesc(0, false)});
    } return setSymbolDesc(it, key, D);
  } return dP(it, key, D);
};
var $defineProperties = function defineProperties(it, P){
  anObject(it);
  var keys = enumKeys(P = toIObject(P))
    , i    = 0
    , l = keys.length
    , key;
  while(l > i)$defineProperty(it, key = keys[i++], P[key]);
  return it;
};
var $create = function create(it, P){
  return P === undefined ? _create(it) : $defineProperties(_create(it), P);
};
var $propertyIsEnumerable = function propertyIsEnumerable(key){
  var E = isEnum.call(this, key = toPrimitive(key, true));
  if(this === ObjectProto && has(AllSymbols, key) && !has(OPSymbols, key))return false;
  return E || !has(this, key) || !has(AllSymbols, key) || has(this, HIDDEN) && this[HIDDEN][key] ? E : true;
};
var $getOwnPropertyDescriptor = function getOwnPropertyDescriptor(it, key){
  it  = toIObject(it);
  key = toPrimitive(key, true);
  if(it === ObjectProto && has(AllSymbols, key) && !has(OPSymbols, key))return;
  var D = gOPD(it, key);
  if(D && has(AllSymbols, key) && !(has(it, HIDDEN) && it[HIDDEN][key]))D.enumerable = true;
  return D;
};
var $getOwnPropertyNames = function getOwnPropertyNames(it){
  var names  = gOPN(toIObject(it))
    , result = []
    , i      = 0
    , key;
  while(names.length > i){
    if(!has(AllSymbols, key = names[i++]) && key != HIDDEN && key != META)result.push(key);
  } return result;
};
var $getOwnPropertySymbols = function getOwnPropertySymbols(it){
  var IS_OP  = it === ObjectProto
    , names  = gOPN(IS_OP ? OPSymbols : toIObject(it))
    , result = []
    , i      = 0
    , key;
  while(names.length > i){
    if(has(AllSymbols, key = names[i++]) && (IS_OP ? has(ObjectProto, key) : true))result.push(AllSymbols[key]);
  } return result;
};

// 19.4.1.1 Symbol([description])
if(!USE_NATIVE){
  $Symbol = function Symbol(){
    if(this instanceof $Symbol)throw TypeError('Symbol is not a constructor!');
    var tag = uid(arguments.length > 0 ? arguments[0] : undefined);
    var $set = function(value){
      if(this === ObjectProto)$set.call(OPSymbols, value);
      if(has(this, HIDDEN) && has(this[HIDDEN], tag))this[HIDDEN][tag] = false;
      setSymbolDesc(this, tag, createDesc(1, value));
    };
    if(DESCRIPTORS && setter)setSymbolDesc(ObjectProto, tag, {configurable: true, set: $set});
    return wrap(tag);
  };
  redefine($Symbol[PROTOTYPE], 'toString', function toString(){
    return this._k;
  });

  $GOPD.f = $getOwnPropertyDescriptor;
  $DP.f   = $defineProperty;
  __webpack_require__(38).f = gOPNExt.f = $getOwnPropertyNames;
  __webpack_require__(49).f  = $propertyIsEnumerable;
  __webpack_require__(54).f = $getOwnPropertySymbols;

  if(DESCRIPTORS && !__webpack_require__(36)){
    redefine(ObjectProto, 'propertyIsEnumerable', $propertyIsEnumerable, true);
  }

  wksExt.f = function(name){
    return wrap(wks(name));
  }
}

$export($export.G + $export.W + $export.F * !USE_NATIVE, {Symbol: $Symbol});

for(var symbols = (
  // 19.4.2.2, 19.4.2.3, 19.4.2.4, 19.4.2.6, 19.4.2.8, 19.4.2.9, 19.4.2.10, 19.4.2.11, 19.4.2.12, 19.4.2.13, 19.4.2.14
  'hasInstance,isConcatSpreadable,iterator,match,replace,search,species,split,toPrimitive,toStringTag,unscopables'
).split(','), i = 0; symbols.length > i; )wks(symbols[i++]);

for(var symbols = $keys(wks.store), i = 0; symbols.length > i; )wksDefine(symbols[i++]);

$export($export.S + $export.F * !USE_NATIVE, 'Symbol', {
  // 19.4.2.1 Symbol.for(key)
  'for': function(key){
    return has(SymbolRegistry, key += '')
      ? SymbolRegistry[key]
      : SymbolRegistry[key] = $Symbol(key);
  },
  // 19.4.2.5 Symbol.keyFor(sym)
  keyFor: function keyFor(key){
    if(isSymbol(key))return keyOf(SymbolRegistry, key);
    throw TypeError(key + ' is not a symbol!');
  },
  useSetter: function(){ setter = true; },
  useSimple: function(){ setter = false; }
});

$export($export.S + $export.F * !USE_NATIVE, 'Object', {
  // 19.1.2.2 Object.create(O [, Properties])
  create: $create,
  // 19.1.2.4 Object.defineProperty(O, P, Attributes)
  defineProperty: $defineProperty,
  // 19.1.2.3 Object.defineProperties(O, Properties)
  defineProperties: $defineProperties,
  // 19.1.2.6 Object.getOwnPropertyDescriptor(O, P)
  getOwnPropertyDescriptor: $getOwnPropertyDescriptor,
  // 19.1.2.7 Object.getOwnPropertyNames(O)
  getOwnPropertyNames: $getOwnPropertyNames,
  // 19.1.2.8 Object.getOwnPropertySymbols(O)
  getOwnPropertySymbols: $getOwnPropertySymbols
});

// 24.3.2 JSON.stringify(value [, replacer [, space]])
$JSON && $export($export.S + $export.F * (!USE_NATIVE || $fails(function(){
  var S = $Symbol();
  // MS Edge converts symbol values to JSON as {}
  // WebKit converts symbol values to JSON as null
  // V8 throws on boxed symbols
  return _stringify([S]) != '[null]' || _stringify({a: S}) != '{}' || _stringify(Object(S)) != '{}';
})), 'JSON', {
  stringify: function stringify(it){
    if(it === undefined || isSymbol(it))return; // IE8 returns string on undefined
    var args = [it]
      , i    = 1
      , replacer, $replacer;
    while(arguments.length > i)args.push(arguments[i++]);
    replacer = args[1];
    if(typeof replacer == 'function')$replacer = replacer;
    if($replacer || !isArray(replacer))replacer = function(key, value){
      if($replacer)value = $replacer.call(this, key, value);
      if(!isSymbol(value))return value;
    };
    args[1] = replacer;
    return _stringify.apply($JSON, args);
  }
});

// 19.4.3.4 Symbol.prototype[@@toPrimitive](hint)
$Symbol[PROTOTYPE][TO_PRIMITIVE] || __webpack_require__(15)($Symbol[PROTOTYPE], TO_PRIMITIVE, $Symbol[PROTOTYPE].valueOf);
// 19.4.3.5 Symbol.prototype[@@toStringTag]
setToStringTag($Symbol, 'Symbol');
// 20.2.1.9 Math[@@toStringTag]
setToStringTag(Math, 'Math', true);
// 24.3.3 JSON[@@toStringTag]
setToStringTag(global.JSON, 'JSON', true);

/***/ }),
/* 145 */
/***/ (function(module, exports, __webpack_require__) {

// all enumerable object keys, includes symbols
var getKeys = __webpack_require__(32)
  , gOPS    = __webpack_require__(54)
  , pIE     = __webpack_require__(49);
module.exports = function(it){
  var result     = getKeys(it)
    , getSymbols = gOPS.f;
  if(getSymbols){
    var symbols = getSymbols(it)
      , isEnum  = pIE.f
      , i       = 0
      , key;
    while(symbols.length > i)if(isEnum.call(it, key = symbols[i++]))result.push(key);
  } return result;
};

/***/ }),
/* 146 */
/***/ (function(module, exports, __webpack_require__) {

var $export = __webpack_require__(0)
// 19.1.2.2 / 15.2.3.5 Object.create(O [, Properties])
$export($export.S, 'Object', {create: __webpack_require__(28)});

/***/ }),
/* 147 */
/***/ (function(module, exports, __webpack_require__) {

var $export = __webpack_require__(0);
// 19.1.2.4 / 15.2.3.6 Object.defineProperty(O, P, Attributes)
$export($export.S + $export.F * !__webpack_require__(7), 'Object', {defineProperty: __webpack_require__(6).f});

/***/ }),
/* 148 */
/***/ (function(module, exports, __webpack_require__) {

var $export = __webpack_require__(0);
// 19.1.2.3 / 15.2.3.7 Object.defineProperties(O, Properties)
$export($export.S + $export.F * !__webpack_require__(7), 'Object', {defineProperties: __webpack_require__(107)});

/***/ }),
/* 149 */
/***/ (function(module, exports, __webpack_require__) {

// 19.1.2.6 Object.getOwnPropertyDescriptor(O, P)
var toIObject                 = __webpack_require__(12)
  , $getOwnPropertyDescriptor = __webpack_require__(17).f;

__webpack_require__(25)('getOwnPropertyDescriptor', function(){
  return function getOwnPropertyDescriptor(it, key){
    return $getOwnPropertyDescriptor(toIObject(it), key);
  };
});

/***/ }),
/* 150 */
/***/ (function(module, exports, __webpack_require__) {

// 19.1.2.9 Object.getPrototypeOf(O)
var toObject        = __webpack_require__(9)
  , $getPrototypeOf = __webpack_require__(18);

__webpack_require__(25)('getPrototypeOf', function(){
  return function getPrototypeOf(it){
    return $getPrototypeOf(toObject(it));
  };
});

/***/ }),
/* 151 */
/***/ (function(module, exports, __webpack_require__) {

// 19.1.2.14 Object.keys(O)
var toObject = __webpack_require__(9)
  , $keys    = __webpack_require__(32);

__webpack_require__(25)('keys', function(){
  return function keys(it){
    return $keys(toObject(it));
  };
});

/***/ }),
/* 152 */
/***/ (function(module, exports, __webpack_require__) {

// 19.1.2.7 Object.getOwnPropertyNames(O)
__webpack_require__(25)('getOwnPropertyNames', function(){
  return __webpack_require__(108).f;
});

/***/ }),
/* 153 */
/***/ (function(module, exports, __webpack_require__) {

// 19.1.2.5 Object.freeze(O)
var isObject = __webpack_require__(4)
  , meta     = __webpack_require__(31).onFreeze;

__webpack_require__(25)('freeze', function($freeze){
  return function freeze(it){
    return $freeze && isObject(it) ? $freeze(meta(it)) : it;
  };
});

/***/ }),
/* 154 */
/***/ (function(module, exports, __webpack_require__) {

// 19.1.2.17 Object.seal(O)
var isObject = __webpack_require__(4)
  , meta     = __webpack_require__(31).onFreeze;

__webpack_require__(25)('seal', function($seal){
  return function seal(it){
    return $seal && isObject(it) ? $seal(meta(it)) : it;
  };
});

/***/ }),
/* 155 */
/***/ (function(module, exports, __webpack_require__) {

// 19.1.2.15 Object.preventExtensions(O)
var isObject = __webpack_require__(4)
  , meta     = __webpack_require__(31).onFreeze;

__webpack_require__(25)('preventExtensions', function($preventExtensions){
  return function preventExtensions(it){
    return $preventExtensions && isObject(it) ? $preventExtensions(meta(it)) : it;
  };
});

/***/ }),
/* 156 */
/***/ (function(module, exports, __webpack_require__) {

// 19.1.2.12 Object.isFrozen(O)
var isObject = __webpack_require__(4);

__webpack_require__(25)('isFrozen', function($isFrozen){
  return function isFrozen(it){
    return isObject(it) ? $isFrozen ? $isFrozen(it) : false : true;
  };
});

/***/ }),
/* 157 */
/***/ (function(module, exports, __webpack_require__) {

// 19.1.2.13 Object.isSealed(O)
var isObject = __webpack_require__(4);

__webpack_require__(25)('isSealed', function($isSealed){
  return function isSealed(it){
    return isObject(it) ? $isSealed ? $isSealed(it) : false : true;
  };
});

/***/ }),
/* 158 */
/***/ (function(module, exports, __webpack_require__) {

// 19.1.2.11 Object.isExtensible(O)
var isObject = __webpack_require__(4);

__webpack_require__(25)('isExtensible', function($isExtensible){
  return function isExtensible(it){
    return isObject(it) ? $isExtensible ? $isExtensible(it) : true : false;
  };
});

/***/ }),
/* 159 */
/***/ (function(module, exports, __webpack_require__) {

// 19.1.3.1 Object.assign(target, source)
var $export = __webpack_require__(0);

$export($export.S + $export.F, 'Object', {assign: __webpack_require__(77)});

/***/ }),
/* 160 */
/***/ (function(module, exports, __webpack_require__) {

// 19.1.3.10 Object.is(value1, value2)
var $export = __webpack_require__(0);
$export($export.S, 'Object', {is: __webpack_require__(109)});

/***/ }),
/* 161 */
/***/ (function(module, exports, __webpack_require__) {

// 19.1.3.19 Object.setPrototypeOf(O, proto)
var $export = __webpack_require__(0);
$export($export.S, 'Object', {setPrototypeOf: __webpack_require__(78).set});

/***/ }),
/* 162 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

// 19.1.3.6 Object.prototype.toString()
var classof = __webpack_require__(39)
  , test    = {};
test[__webpack_require__(5)('toStringTag')] = 'z';
if(test + '' != '[object z]'){
  __webpack_require__(16)(Object.prototype, 'toString', function toString(){
    return '[object ' + classof(this) + ']';
  }, true);
}

/***/ }),
/* 163 */
/***/ (function(module, exports, __webpack_require__) {

// 19.2.3.2 / 15.3.4.5 Function.prototype.bind(thisArg, args...)
var $export = __webpack_require__(0);

$export($export.P, 'Function', {bind: __webpack_require__(110)});

/***/ }),
/* 164 */
/***/ (function(module, exports, __webpack_require__) {

var dP         = __webpack_require__(6).f
  , createDesc = __webpack_require__(27)
  , has        = __webpack_require__(11)
  , FProto     = Function.prototype
  , nameRE     = /^\s*function ([^ (]*)/
  , NAME       = 'name';

var isExtensible = Object.isExtensible || function(){
  return true;
};

// 19.2.4.2 name
NAME in FProto || __webpack_require__(7) && dP(FProto, NAME, {
  configurable: true,
  get: function(){
    try {
      var that = this
        , name = ('' + that).match(nameRE)[1];
      has(that, NAME) || !isExtensible(that) || dP(that, NAME, createDesc(5, name));
      return name;
    } catch(e){
      return '';
    }
  }
});

/***/ }),
/* 165 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var isObject       = __webpack_require__(4)
  , getPrototypeOf = __webpack_require__(18)
  , HAS_INSTANCE   = __webpack_require__(5)('hasInstance')
  , FunctionProto  = Function.prototype;
// 19.2.3.6 Function.prototype[@@hasInstance](V)
if(!(HAS_INSTANCE in FunctionProto))__webpack_require__(6).f(FunctionProto, HAS_INSTANCE, {value: function(O){
  if(typeof this != 'function' || !isObject(O))return false;
  if(!isObject(this.prototype))return O instanceof this;
  // for environment w/o native `@@hasInstance` logic enough `instanceof`, but add this:
  while(O = getPrototypeOf(O))if(this.prototype === O)return true;
  return false;
}});

/***/ }),
/* 166 */
/***/ (function(module, exports, __webpack_require__) {

var $export   = __webpack_require__(0)
  , $parseInt = __webpack_require__(111);
// 18.2.5 parseInt(string, radix)
$export($export.G + $export.F * (parseInt != $parseInt), {parseInt: $parseInt});

/***/ }),
/* 167 */
/***/ (function(module, exports, __webpack_require__) {

var $export     = __webpack_require__(0)
  , $parseFloat = __webpack_require__(112);
// 18.2.4 parseFloat(string)
$export($export.G + $export.F * (parseFloat != $parseFloat), {parseFloat: $parseFloat});

/***/ }),
/* 168 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var global            = __webpack_require__(2)
  , has               = __webpack_require__(11)
  , cof               = __webpack_require__(20)
  , inheritIfRequired = __webpack_require__(80)
  , toPrimitive       = __webpack_require__(23)
  , fails             = __webpack_require__(3)
  , gOPN              = __webpack_require__(38).f
  , gOPD              = __webpack_require__(17).f
  , dP                = __webpack_require__(6).f
  , $trim             = __webpack_require__(46).trim
  , NUMBER            = 'Number'
  , $Number           = global[NUMBER]
  , Base              = $Number
  , proto             = $Number.prototype
  // Opera ~12 has broken Object#toString
  , BROKEN_COF        = cof(__webpack_require__(28)(proto)) == NUMBER
  , TRIM              = 'trim' in String.prototype;

// 7.1.3 ToNumber(argument)
var toNumber = function(argument){
  var it = toPrimitive(argument, false);
  if(typeof it == 'string' && it.length > 2){
    it = TRIM ? it.trim() : $trim(it, 3);
    var first = it.charCodeAt(0)
      , third, radix, maxCode;
    if(first === 43 || first === 45){
      third = it.charCodeAt(2);
      if(third === 88 || third === 120)return NaN; // Number('+0x1') should be NaN, old V8 fix
    } else if(first === 48){
      switch(it.charCodeAt(1)){
        case 66 : case 98  : radix = 2; maxCode = 49; break; // fast equal /^0b[01]+$/i
        case 79 : case 111 : radix = 8; maxCode = 55; break; // fast equal /^0o[0-7]+$/i
        default : return +it;
      }
      for(var digits = it.slice(2), i = 0, l = digits.length, code; i < l; i++){
        code = digits.charCodeAt(i);
        // parseInt parses a string to a first unavailable symbol
        // but ToNumber should return NaN if a string contains unavailable symbols
        if(code < 48 || code > maxCode)return NaN;
      } return parseInt(digits, radix);
    }
  } return +it;
};

if(!$Number(' 0o1') || !$Number('0b1') || $Number('+0x1')){
  $Number = function Number(value){
    var it = arguments.length < 1 ? 0 : value
      , that = this;
    return that instanceof $Number
      // check on 1..constructor(foo) case
      && (BROKEN_COF ? fails(function(){ proto.valueOf.call(that); }) : cof(that) != NUMBER)
        ? inheritIfRequired(new Base(toNumber(it)), that, $Number) : toNumber(it);
  };
  for(var keys = __webpack_require__(7) ? gOPN(Base) : (
    // ES3:
    'MAX_VALUE,MIN_VALUE,NaN,NEGATIVE_INFINITY,POSITIVE_INFINITY,' +
    // ES6 (in case, if modules with ES6 Number statics required before):
    'EPSILON,isFinite,isInteger,isNaN,isSafeInteger,MAX_SAFE_INTEGER,' +
    'MIN_SAFE_INTEGER,parseFloat,parseInt,isInteger'
  ).split(','), j = 0, key; keys.length > j; j++){
    if(has(Base, key = keys[j]) && !has($Number, key)){
      dP($Number, key, gOPD(Base, key));
    }
  }
  $Number.prototype = proto;
  proto.constructor = $Number;
  __webpack_require__(16)(global, NUMBER, $Number);
}

/***/ }),
/* 169 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var $export      = __webpack_require__(0)
  , toInteger    = __webpack_require__(33)
  , aNumberValue = __webpack_require__(113)
  , repeat       = __webpack_require__(81)
  , $toFixed     = 1..toFixed
  , floor        = Math.floor
  , data         = [0, 0, 0, 0, 0, 0]
  , ERROR        = 'Number.toFixed: incorrect invocation!'
  , ZERO         = '0';

var multiply = function(n, c){
  var i  = -1
    , c2 = c;
  while(++i < 6){
    c2 += n * data[i];
    data[i] = c2 % 1e7;
    c2 = floor(c2 / 1e7);
  }
};
var divide = function(n){
  var i = 6
    , c = 0;
  while(--i >= 0){
    c += data[i];
    data[i] = floor(c / n);
    c = (c % n) * 1e7;
  }
};
var numToString = function(){
  var i = 6
    , s = '';
  while(--i >= 0){
    if(s !== '' || i === 0 || data[i] !== 0){
      var t = String(data[i]);
      s = s === '' ? t : s + repeat.call(ZERO, 7 - t.length) + t;
    }
  } return s;
};
var pow = function(x, n, acc){
  return n === 0 ? acc : n % 2 === 1 ? pow(x, n - 1, acc * x) : pow(x * x, n / 2, acc);
};
var log = function(x){
  var n  = 0
    , x2 = x;
  while(x2 >= 4096){
    n += 12;
    x2 /= 4096;
  }
  while(x2 >= 2){
    n  += 1;
    x2 /= 2;
  } return n;
};

$export($export.P + $export.F * (!!$toFixed && (
  0.00008.toFixed(3) !== '0.000' ||
  0.9.toFixed(0) !== '1' ||
  1.255.toFixed(2) !== '1.25' ||
  1000000000000000128..toFixed(0) !== '1000000000000000128'
) || !__webpack_require__(3)(function(){
  // V8 ~ Android 4.3-
  $toFixed.call({});
})), 'Number', {
  toFixed: function toFixed(fractionDigits){
    var x = aNumberValue(this, ERROR)
      , f = toInteger(fractionDigits)
      , s = ''
      , m = ZERO
      , e, z, j, k;
    if(f < 0 || f > 20)throw RangeError(ERROR);
    if(x != x)return 'NaN';
    if(x <= -1e21 || x >= 1e21)return String(x);
    if(x < 0){
      s = '-';
      x = -x;
    }
    if(x > 1e-21){
      e = log(x * pow(2, 69, 1)) - 69;
      z = e < 0 ? x * pow(2, -e, 1) : x / pow(2, e, 1);
      z *= 0x10000000000000;
      e = 52 - e;
      if(e > 0){
        multiply(0, z);
        j = f;
        while(j >= 7){
          multiply(1e7, 0);
          j -= 7;
        }
        multiply(pow(10, j, 1), 0);
        j = e - 1;
        while(j >= 23){
          divide(1 << 23);
          j -= 23;
        }
        divide(1 << j);
        multiply(1, 1);
        divide(2);
        m = numToString();
      } else {
        multiply(0, z);
        multiply(1 << -e, 0);
        m = numToString() + repeat.call(ZERO, f);
      }
    }
    if(f > 0){
      k = m.length;
      m = s + (k <= f ? '0.' + repeat.call(ZERO, f - k) + m : m.slice(0, k - f) + '.' + m.slice(k - f));
    } else {
      m = s + m;
    } return m;
  }
});

/***/ }),
/* 170 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var $export      = __webpack_require__(0)
  , $fails       = __webpack_require__(3)
  , aNumberValue = __webpack_require__(113)
  , $toPrecision = 1..toPrecision;

$export($export.P + $export.F * ($fails(function(){
  // IE7-
  return $toPrecision.call(1, undefined) !== '1';
}) || !$fails(function(){
  // V8 ~ Android 4.3-
  $toPrecision.call({});
})), 'Number', {
  toPrecision: function toPrecision(precision){
    var that = aNumberValue(this, 'Number#toPrecision: incorrect invocation!');
    return precision === undefined ? $toPrecision.call(that) : $toPrecision.call(that, precision); 
  }
});

/***/ }),
/* 171 */
/***/ (function(module, exports, __webpack_require__) {

// 20.1.2.1 Number.EPSILON
var $export = __webpack_require__(0);

$export($export.S, 'Number', {EPSILON: Math.pow(2, -52)});

/***/ }),
/* 172 */
/***/ (function(module, exports, __webpack_require__) {

// 20.1.2.2 Number.isFinite(number)
var $export   = __webpack_require__(0)
  , _isFinite = __webpack_require__(2).isFinite;

$export($export.S, 'Number', {
  isFinite: function isFinite(it){
    return typeof it == 'number' && _isFinite(it);
  }
});

/***/ }),
/* 173 */
/***/ (function(module, exports, __webpack_require__) {

// 20.1.2.3 Number.isInteger(number)
var $export = __webpack_require__(0);

$export($export.S, 'Number', {isInteger: __webpack_require__(114)});

/***/ }),
/* 174 */
/***/ (function(module, exports, __webpack_require__) {

// 20.1.2.4 Number.isNaN(number)
var $export = __webpack_require__(0);

$export($export.S, 'Number', {
  isNaN: function isNaN(number){
    return number != number;
  }
});

/***/ }),
/* 175 */
/***/ (function(module, exports, __webpack_require__) {

// 20.1.2.5 Number.isSafeInteger(number)
var $export   = __webpack_require__(0)
  , isInteger = __webpack_require__(114)
  , abs       = Math.abs;

$export($export.S, 'Number', {
  isSafeInteger: function isSafeInteger(number){
    return isInteger(number) && abs(number) <= 0x1fffffffffffff;
  }
});

/***/ }),
/* 176 */
/***/ (function(module, exports, __webpack_require__) {

// 20.1.2.6 Number.MAX_SAFE_INTEGER
var $export = __webpack_require__(0);

$export($export.S, 'Number', {MAX_SAFE_INTEGER: 0x1fffffffffffff});

/***/ }),
/* 177 */
/***/ (function(module, exports, __webpack_require__) {

// 20.1.2.10 Number.MIN_SAFE_INTEGER
var $export = __webpack_require__(0);

$export($export.S, 'Number', {MIN_SAFE_INTEGER: -0x1fffffffffffff});

/***/ }),
/* 178 */
/***/ (function(module, exports, __webpack_require__) {

var $export     = __webpack_require__(0)
  , $parseFloat = __webpack_require__(112);
// 20.1.2.12 Number.parseFloat(string)
$export($export.S + $export.F * (Number.parseFloat != $parseFloat), 'Number', {parseFloat: $parseFloat});

/***/ }),
/* 179 */
/***/ (function(module, exports, __webpack_require__) {

var $export   = __webpack_require__(0)
  , $parseInt = __webpack_require__(111);
// 20.1.2.13 Number.parseInt(string, radix)
$export($export.S + $export.F * (Number.parseInt != $parseInt), 'Number', {parseInt: $parseInt});

/***/ }),
/* 180 */
/***/ (function(module, exports, __webpack_require__) {

// 20.2.2.3 Math.acosh(x)
var $export = __webpack_require__(0)
  , log1p   = __webpack_require__(115)
  , sqrt    = Math.sqrt
  , $acosh  = Math.acosh;

$export($export.S + $export.F * !($acosh
  // V8 bug: https://code.google.com/p/v8/issues/detail?id=3509
  && Math.floor($acosh(Number.MAX_VALUE)) == 710
  // Tor Browser bug: Math.acosh(Infinity) -> NaN 
  && $acosh(Infinity) == Infinity
), 'Math', {
  acosh: function acosh(x){
    return (x = +x) < 1 ? NaN : x > 94906265.62425156
      ? Math.log(x) + Math.LN2
      : log1p(x - 1 + sqrt(x - 1) * sqrt(x + 1));
  }
});

/***/ }),
/* 181 */
/***/ (function(module, exports, __webpack_require__) {

// 20.2.2.5 Math.asinh(x)
var $export = __webpack_require__(0)
  , $asinh  = Math.asinh;

function asinh(x){
  return !isFinite(x = +x) || x == 0 ? x : x < 0 ? -asinh(-x) : Math.log(x + Math.sqrt(x * x + 1));
}

// Tor Browser bug: Math.asinh(0) -> -0 
$export($export.S + $export.F * !($asinh && 1 / $asinh(0) > 0), 'Math', {asinh: asinh});

/***/ }),
/* 182 */
/***/ (function(module, exports, __webpack_require__) {

// 20.2.2.7 Math.atanh(x)
var $export = __webpack_require__(0)
  , $atanh  = Math.atanh;

// Tor Browser bug: Math.atanh(-0) -> 0 
$export($export.S + $export.F * !($atanh && 1 / $atanh(-0) < 0), 'Math', {
  atanh: function atanh(x){
    return (x = +x) == 0 ? x : Math.log((1 + x) / (1 - x)) / 2;
  }
});

/***/ }),
/* 183 */
/***/ (function(module, exports, __webpack_require__) {

// 20.2.2.9 Math.cbrt(x)
var $export = __webpack_require__(0)
  , sign    = __webpack_require__(82);

$export($export.S, 'Math', {
  cbrt: function cbrt(x){
    return sign(x = +x) * Math.pow(Math.abs(x), 1 / 3);
  }
});

/***/ }),
/* 184 */
/***/ (function(module, exports, __webpack_require__) {

// 20.2.2.11 Math.clz32(x)
var $export = __webpack_require__(0);

$export($export.S, 'Math', {
  clz32: function clz32(x){
    return (x >>>= 0) ? 31 - Math.floor(Math.log(x + 0.5) * Math.LOG2E) : 32;
  }
});

/***/ }),
/* 185 */
/***/ (function(module, exports, __webpack_require__) {

// 20.2.2.12 Math.cosh(x)
var $export = __webpack_require__(0)
  , exp     = Math.exp;

$export($export.S, 'Math', {
  cosh: function cosh(x){
    return (exp(x = +x) + exp(-x)) / 2;
  }
});

/***/ }),
/* 186 */
/***/ (function(module, exports, __webpack_require__) {

// 20.2.2.14 Math.expm1(x)
var $export = __webpack_require__(0)
  , $expm1  = __webpack_require__(83);

$export($export.S + $export.F * ($expm1 != Math.expm1), 'Math', {expm1: $expm1});

/***/ }),
/* 187 */
/***/ (function(module, exports, __webpack_require__) {

// 20.2.2.16 Math.fround(x)
var $export   = __webpack_require__(0)
  , sign      = __webpack_require__(82)
  , pow       = Math.pow
  , EPSILON   = pow(2, -52)
  , EPSILON32 = pow(2, -23)
  , MAX32     = pow(2, 127) * (2 - EPSILON32)
  , MIN32     = pow(2, -126);

var roundTiesToEven = function(n){
  return n + 1 / EPSILON - 1 / EPSILON;
};


$export($export.S, 'Math', {
  fround: function fround(x){
    var $abs  = Math.abs(x)
      , $sign = sign(x)
      , a, result;
    if($abs < MIN32)return $sign * roundTiesToEven($abs / MIN32 / EPSILON32) * MIN32 * EPSILON32;
    a = (1 + EPSILON32 / EPSILON) * $abs;
    result = a - (a - $abs);
    if(result > MAX32 || result != result)return $sign * Infinity;
    return $sign * result;
  }
});

/***/ }),
/* 188 */
/***/ (function(module, exports, __webpack_require__) {

// 20.2.2.17 Math.hypot([value1[, value2[, … ]]])
var $export = __webpack_require__(0)
  , abs     = Math.abs;

$export($export.S, 'Math', {
  hypot: function hypot(value1, value2){ // eslint-disable-line no-unused-vars
    var sum  = 0
      , i    = 0
      , aLen = arguments.length
      , larg = 0
      , arg, div;
    while(i < aLen){
      arg = abs(arguments[i++]);
      if(larg < arg){
        div  = larg / arg;
        sum  = sum * div * div + 1;
        larg = arg;
      } else if(arg > 0){
        div  = arg / larg;
        sum += div * div;
      } else sum += arg;
    }
    return larg === Infinity ? Infinity : larg * Math.sqrt(sum);
  }
});

/***/ }),
/* 189 */
/***/ (function(module, exports, __webpack_require__) {

// 20.2.2.18 Math.imul(x, y)
var $export = __webpack_require__(0)
  , $imul   = Math.imul;

// some WebKit versions fails with big numbers, some has wrong arity
$export($export.S + $export.F * __webpack_require__(3)(function(){
  return $imul(0xffffffff, 5) != -5 || $imul.length != 2;
}), 'Math', {
  imul: function imul(x, y){
    var UINT16 = 0xffff
      , xn = +x
      , yn = +y
      , xl = UINT16 & xn
      , yl = UINT16 & yn;
    return 0 | xl * yl + ((UINT16 & xn >>> 16) * yl + xl * (UINT16 & yn >>> 16) << 16 >>> 0);
  }
});

/***/ }),
/* 190 */
/***/ (function(module, exports, __webpack_require__) {

// 20.2.2.21 Math.log10(x)
var $export = __webpack_require__(0);

$export($export.S, 'Math', {
  log10: function log10(x){
    return Math.log(x) / Math.LN10;
  }
});

/***/ }),
/* 191 */
/***/ (function(module, exports, __webpack_require__) {

// 20.2.2.20 Math.log1p(x)
var $export = __webpack_require__(0);

$export($export.S, 'Math', {log1p: __webpack_require__(115)});

/***/ }),
/* 192 */
/***/ (function(module, exports, __webpack_require__) {

// 20.2.2.22 Math.log2(x)
var $export = __webpack_require__(0);

$export($export.S, 'Math', {
  log2: function log2(x){
    return Math.log(x) / Math.LN2;
  }
});

/***/ }),
/* 193 */
/***/ (function(module, exports, __webpack_require__) {

// 20.2.2.28 Math.sign(x)
var $export = __webpack_require__(0);

$export($export.S, 'Math', {sign: __webpack_require__(82)});

/***/ }),
/* 194 */
/***/ (function(module, exports, __webpack_require__) {

// 20.2.2.30 Math.sinh(x)
var $export = __webpack_require__(0)
  , expm1   = __webpack_require__(83)
  , exp     = Math.exp;

// V8 near Chromium 38 has a problem with very small numbers
$export($export.S + $export.F * __webpack_require__(3)(function(){
  return !Math.sinh(-2e-17) != -2e-17;
}), 'Math', {
  sinh: function sinh(x){
    return Math.abs(x = +x) < 1
      ? (expm1(x) - expm1(-x)) / 2
      : (exp(x - 1) - exp(-x - 1)) * (Math.E / 2);
  }
});

/***/ }),
/* 195 */
/***/ (function(module, exports, __webpack_require__) {

// 20.2.2.33 Math.tanh(x)
var $export = __webpack_require__(0)
  , expm1   = __webpack_require__(83)
  , exp     = Math.exp;

$export($export.S, 'Math', {
  tanh: function tanh(x){
    var a = expm1(x = +x)
      , b = expm1(-x);
    return a == Infinity ? 1 : b == Infinity ? -1 : (a - b) / (exp(x) + exp(-x));
  }
});

/***/ }),
/* 196 */
/***/ (function(module, exports, __webpack_require__) {

// 20.2.2.34 Math.trunc(x)
var $export = __webpack_require__(0);

$export($export.S, 'Math', {
  trunc: function trunc(it){
    return (it > 0 ? Math.floor : Math.ceil)(it);
  }
});

/***/ }),
/* 197 */
/***/ (function(module, exports, __webpack_require__) {

var $export        = __webpack_require__(0)
  , toIndex        = __webpack_require__(37)
  , fromCharCode   = String.fromCharCode
  , $fromCodePoint = String.fromCodePoint;

// length should be 1, old FF problem
$export($export.S + $export.F * (!!$fromCodePoint && $fromCodePoint.length != 1), 'String', {
  // 21.1.2.2 String.fromCodePoint(...codePoints)
  fromCodePoint: function fromCodePoint(x){ // eslint-disable-line no-unused-vars
    var res  = []
      , aLen = arguments.length
      , i    = 0
      , code;
    while(aLen > i){
      code = +arguments[i++];
      if(toIndex(code, 0x10ffff) !== code)throw RangeError(code + ' is not a valid code point');
      res.push(code < 0x10000
        ? fromCharCode(code)
        : fromCharCode(((code -= 0x10000) >> 10) + 0xd800, code % 0x400 + 0xdc00)
      );
    } return res.join('');
  }
});

/***/ }),
/* 198 */
/***/ (function(module, exports, __webpack_require__) {

var $export   = __webpack_require__(0)
  , toIObject = __webpack_require__(12)
  , toLength  = __webpack_require__(8);

$export($export.S, 'String', {
  // 21.1.2.4 String.raw(callSite, ...substitutions)
  raw: function raw(callSite){
    var tpl  = toIObject(callSite.raw)
      , len  = toLength(tpl.length)
      , aLen = arguments.length
      , res  = []
      , i    = 0;
    while(len > i){
      res.push(String(tpl[i++]));
      if(i < aLen)res.push(String(arguments[i]));
    } return res.join('');
  }
});

/***/ }),
/* 199 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

// 21.1.3.25 String.prototype.trim()
__webpack_require__(46)('trim', function($trim){
  return function trim(){
    return $trim(this, 3);
  };
});

/***/ }),
/* 200 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var $at  = __webpack_require__(84)(true);

// 21.1.3.27 String.prototype[@@iterator]()
__webpack_require__(56)(String, 'String', function(iterated){
  this._t = String(iterated); // target
  this._i = 0;                // next index
// 21.1.5.2.1 %StringIteratorPrototype%.next()
}, function(){
  var O     = this._t
    , index = this._i
    , point;
  if(index >= O.length)return {value: undefined, done: true};
  point = $at(O, index);
  this._i += point.length;
  return {value: point, done: false};
});

/***/ }),
/* 201 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var $export = __webpack_require__(0)
  , $at     = __webpack_require__(84)(false);
$export($export.P, 'String', {
  // 21.1.3.3 String.prototype.codePointAt(pos)
  codePointAt: function codePointAt(pos){
    return $at(this, pos);
  }
});

/***/ }),
/* 202 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
// 21.1.3.6 String.prototype.endsWith(searchString [, endPosition])

var $export   = __webpack_require__(0)
  , toLength  = __webpack_require__(8)
  , context   = __webpack_require__(85)
  , ENDS_WITH = 'endsWith'
  , $endsWith = ''[ENDS_WITH];

$export($export.P + $export.F * __webpack_require__(86)(ENDS_WITH), 'String', {
  endsWith: function endsWith(searchString /*, endPosition = @length */){
    var that = context(this, searchString, ENDS_WITH)
      , endPosition = arguments.length > 1 ? arguments[1] : undefined
      , len    = toLength(that.length)
      , end    = endPosition === undefined ? len : Math.min(toLength(endPosition), len)
      , search = String(searchString);
    return $endsWith
      ? $endsWith.call(that, search, end)
      : that.slice(end - search.length, end) === search;
  }
});

/***/ }),
/* 203 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
// 21.1.3.7 String.prototype.includes(searchString, position = 0)

var $export  = __webpack_require__(0)
  , context  = __webpack_require__(85)
  , INCLUDES = 'includes';

$export($export.P + $export.F * __webpack_require__(86)(INCLUDES), 'String', {
  includes: function includes(searchString /*, position = 0 */){
    return !!~context(this, searchString, INCLUDES)
      .indexOf(searchString, arguments.length > 1 ? arguments[1] : undefined);
  }
});

/***/ }),
/* 204 */
/***/ (function(module, exports, __webpack_require__) {

var $export = __webpack_require__(0);

$export($export.P, 'String', {
  // 21.1.3.13 String.prototype.repeat(count)
  repeat: __webpack_require__(81)
});

/***/ }),
/* 205 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
// 21.1.3.18 String.prototype.startsWith(searchString [, position ])

var $export     = __webpack_require__(0)
  , toLength    = __webpack_require__(8)
  , context     = __webpack_require__(85)
  , STARTS_WITH = 'startsWith'
  , $startsWith = ''[STARTS_WITH];

$export($export.P + $export.F * __webpack_require__(86)(STARTS_WITH), 'String', {
  startsWith: function startsWith(searchString /*, position = 0 */){
    var that   = context(this, searchString, STARTS_WITH)
      , index  = toLength(Math.min(arguments.length > 1 ? arguments[1] : undefined, that.length))
      , search = String(searchString);
    return $startsWith
      ? $startsWith.call(that, search, index)
      : that.slice(index, index + search.length) === search;
  }
});

/***/ }),
/* 206 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

// B.2.3.2 String.prototype.anchor(name)
__webpack_require__(19)('anchor', function(createHTML){
  return function anchor(name){
    return createHTML(this, 'a', 'name', name);
  }
});

/***/ }),
/* 207 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

// B.2.3.3 String.prototype.big()
__webpack_require__(19)('big', function(createHTML){
  return function big(){
    return createHTML(this, 'big', '', '');
  }
});

/***/ }),
/* 208 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

// B.2.3.4 String.prototype.blink()
__webpack_require__(19)('blink', function(createHTML){
  return function blink(){
    return createHTML(this, 'blink', '', '');
  }
});

/***/ }),
/* 209 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

// B.2.3.5 String.prototype.bold()
__webpack_require__(19)('bold', function(createHTML){
  return function bold(){
    return createHTML(this, 'b', '', '');
  }
});

/***/ }),
/* 210 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

// B.2.3.6 String.prototype.fixed()
__webpack_require__(19)('fixed', function(createHTML){
  return function fixed(){
    return createHTML(this, 'tt', '', '');
  }
});

/***/ }),
/* 211 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

// B.2.3.7 String.prototype.fontcolor(color)
__webpack_require__(19)('fontcolor', function(createHTML){
  return function fontcolor(color){
    return createHTML(this, 'font', 'color', color);
  }
});

/***/ }),
/* 212 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

// B.2.3.8 String.prototype.fontsize(size)
__webpack_require__(19)('fontsize', function(createHTML){
  return function fontsize(size){
    return createHTML(this, 'font', 'size', size);
  }
});

/***/ }),
/* 213 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

// B.2.3.9 String.prototype.italics()
__webpack_require__(19)('italics', function(createHTML){
  return function italics(){
    return createHTML(this, 'i', '', '');
  }
});

/***/ }),
/* 214 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

// B.2.3.10 String.prototype.link(url)
__webpack_require__(19)('link', function(createHTML){
  return function link(url){
    return createHTML(this, 'a', 'href', url);
  }
});

/***/ }),
/* 215 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

// B.2.3.11 String.prototype.small()
__webpack_require__(19)('small', function(createHTML){
  return function small(){
    return createHTML(this, 'small', '', '');
  }
});

/***/ }),
/* 216 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

// B.2.3.12 String.prototype.strike()
__webpack_require__(19)('strike', function(createHTML){
  return function strike(){
    return createHTML(this, 'strike', '', '');
  }
});

/***/ }),
/* 217 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

// B.2.3.13 String.prototype.sub()
__webpack_require__(19)('sub', function(createHTML){
  return function sub(){
    return createHTML(this, 'sub', '', '');
  }
});

/***/ }),
/* 218 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

// B.2.3.14 String.prototype.sup()
__webpack_require__(19)('sup', function(createHTML){
  return function sup(){
    return createHTML(this, 'sup', '', '');
  }
});

/***/ }),
/* 219 */
/***/ (function(module, exports, __webpack_require__) {

// 20.3.3.1 / 15.9.4.4 Date.now()
var $export = __webpack_require__(0);

$export($export.S, 'Date', {now: function(){ return new Date().getTime(); }});

/***/ }),
/* 220 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var $export     = __webpack_require__(0)
  , toObject    = __webpack_require__(9)
  , toPrimitive = __webpack_require__(23);

$export($export.P + $export.F * __webpack_require__(3)(function(){
  return new Date(NaN).toJSON() !== null || Date.prototype.toJSON.call({toISOString: function(){ return 1; }}) !== 1;
}), 'Date', {
  toJSON: function toJSON(key){
    var O  = toObject(this)
      , pv = toPrimitive(O);
    return typeof pv == 'number' && !isFinite(pv) ? null : O.toISOString();
  }
});

/***/ }),
/* 221 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

// 20.3.4.36 / 15.9.5.43 Date.prototype.toISOString()
var $export = __webpack_require__(0)
  , fails   = __webpack_require__(3)
  , getTime = Date.prototype.getTime;

var lz = function(num){
  return num > 9 ? num : '0' + num;
};

// PhantomJS / old WebKit has a broken implementations
$export($export.P + $export.F * (fails(function(){
  return new Date(-5e13 - 1).toISOString() != '0385-07-25T07:06:39.999Z';
}) || !fails(function(){
  new Date(NaN).toISOString();
})), 'Date', {
  toISOString: function toISOString(){
    if(!isFinite(getTime.call(this)))throw RangeError('Invalid time value');
    var d = this
      , y = d.getUTCFullYear()
      , m = d.getUTCMilliseconds()
      , s = y < 0 ? '-' : y > 9999 ? '+' : '';
    return s + ('00000' + Math.abs(y)).slice(s ? -6 : -4) +
      '-' + lz(d.getUTCMonth() + 1) + '-' + lz(d.getUTCDate()) +
      'T' + lz(d.getUTCHours()) + ':' + lz(d.getUTCMinutes()) +
      ':' + lz(d.getUTCSeconds()) + '.' + (m > 99 ? m : '0' + lz(m)) + 'Z';
  }
});

/***/ }),
/* 222 */
/***/ (function(module, exports, __webpack_require__) {

var DateProto    = Date.prototype
  , INVALID_DATE = 'Invalid Date'
  , TO_STRING    = 'toString'
  , $toString    = DateProto[TO_STRING]
  , getTime      = DateProto.getTime;
if(new Date(NaN) + '' != INVALID_DATE){
  __webpack_require__(16)(DateProto, TO_STRING, function toString(){
    var value = getTime.call(this);
    return value === value ? $toString.call(this) : INVALID_DATE;
  });
}

/***/ }),
/* 223 */
/***/ (function(module, exports, __webpack_require__) {

var TO_PRIMITIVE = __webpack_require__(5)('toPrimitive')
  , proto        = Date.prototype;

if(!(TO_PRIMITIVE in proto))__webpack_require__(15)(proto, TO_PRIMITIVE, __webpack_require__(224));

/***/ }),
/* 224 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var anObject    = __webpack_require__(1)
  , toPrimitive = __webpack_require__(23)
  , NUMBER      = 'number';

module.exports = function(hint){
  if(hint !== 'string' && hint !== NUMBER && hint !== 'default')throw TypeError('Incorrect hint');
  return toPrimitive(anObject(this), hint != NUMBER);
};

/***/ }),
/* 225 */
/***/ (function(module, exports, __webpack_require__) {

// 22.1.2.2 / 15.4.3.2 Array.isArray(arg)
var $export = __webpack_require__(0);

$export($export.S, 'Array', {isArray: __webpack_require__(75)});

/***/ }),
/* 226 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var ctx            = __webpack_require__(24)
  , $export        = __webpack_require__(0)
  , toObject       = __webpack_require__(9)
  , call           = __webpack_require__(116)
  , isArrayIter    = __webpack_require__(87)
  , toLength       = __webpack_require__(8)
  , createProperty = __webpack_require__(88)
  , getIterFn      = __webpack_require__(50);

$export($export.S + $export.F * !__webpack_require__(59)(function(iter){ Array.from(iter); }), 'Array', {
  // 22.1.2.1 Array.from(arrayLike, mapfn = undefined, thisArg = undefined)
  from: function from(arrayLike/*, mapfn = undefined, thisArg = undefined*/){
    var O       = toObject(arrayLike)
      , C       = typeof this == 'function' ? this : Array
      , aLen    = arguments.length
      , mapfn   = aLen > 1 ? arguments[1] : undefined
      , mapping = mapfn !== undefined
      , index   = 0
      , iterFn  = getIterFn(O)
      , length, result, step, iterator;
    if(mapping)mapfn = ctx(mapfn, aLen > 2 ? arguments[2] : undefined, 2);
    // if object isn't iterable or it's array with default iterator - use simple case
    if(iterFn != undefined && !(C == Array && isArrayIter(iterFn))){
      for(iterator = iterFn.call(O), result = new C; !(step = iterator.next()).done; index++){
        createProperty(result, index, mapping ? call(iterator, mapfn, [step.value, index], true) : step.value);
      }
    } else {
      length = toLength(O.length);
      for(result = new C(length); length > index; index++){
        createProperty(result, index, mapping ? mapfn(O[index], index) : O[index]);
      }
    }
    result.length = index;
    return result;
  }
});


/***/ }),
/* 227 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var $export        = __webpack_require__(0)
  , createProperty = __webpack_require__(88);

// WebKit Array.of isn't generic
$export($export.S + $export.F * __webpack_require__(3)(function(){
  function F(){}
  return !(Array.of.call(F) instanceof F);
}), 'Array', {
  // 22.1.2.3 Array.of( ...items)
  of: function of(/* ...args */){
    var index  = 0
      , aLen   = arguments.length
      , result = new (typeof this == 'function' ? this : Array)(aLen);
    while(aLen > index)createProperty(result, index, arguments[index++]);
    result.length = aLen;
    return result;
  }
});

/***/ }),
/* 228 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

// 22.1.3.13 Array.prototype.join(separator)
var $export   = __webpack_require__(0)
  , toIObject = __webpack_require__(12)
  , arrayJoin = [].join;

// fallback for not array-like strings
$export($export.P + $export.F * (__webpack_require__(48) != Object || !__webpack_require__(22)(arrayJoin)), 'Array', {
  join: function join(separator){
    return arrayJoin.call(toIObject(this), separator === undefined ? ',' : separator);
  }
});

/***/ }),
/* 229 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var $export    = __webpack_require__(0)
  , html       = __webpack_require__(76)
  , cof        = __webpack_require__(20)
  , toIndex    = __webpack_require__(37)
  , toLength   = __webpack_require__(8)
  , arraySlice = [].slice;

// fallback for not array-like ES3 strings and DOM objects
$export($export.P + $export.F * __webpack_require__(3)(function(){
  if(html)arraySlice.call(html);
}), 'Array', {
  slice: function slice(begin, end){
    var len   = toLength(this.length)
      , klass = cof(this);
    end = end === undefined ? len : end;
    if(klass == 'Array')return arraySlice.call(this, begin, end);
    var start  = toIndex(begin, len)
      , upTo   = toIndex(end, len)
      , size   = toLength(upTo - start)
      , cloned = Array(size)
      , i      = 0;
    for(; i < size; i++)cloned[i] = klass == 'String'
      ? this.charAt(start + i)
      : this[start + i];
    return cloned;
  }
});

/***/ }),
/* 230 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var $export   = __webpack_require__(0)
  , aFunction = __webpack_require__(13)
  , toObject  = __webpack_require__(9)
  , fails     = __webpack_require__(3)
  , $sort     = [].sort
  , test      = [1, 2, 3];

$export($export.P + $export.F * (fails(function(){
  // IE8-
  test.sort(undefined);
}) || !fails(function(){
  // V8 bug
  test.sort(null);
  // Old WebKit
}) || !__webpack_require__(22)($sort)), 'Array', {
  // 22.1.3.25 Array.prototype.sort(comparefn)
  sort: function sort(comparefn){
    return comparefn === undefined
      ? $sort.call(toObject(this))
      : $sort.call(toObject(this), aFunction(comparefn));
  }
});

/***/ }),
/* 231 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var $export  = __webpack_require__(0)
  , $forEach = __webpack_require__(26)(0)
  , STRICT   = __webpack_require__(22)([].forEach, true);

$export($export.P + $export.F * !STRICT, 'Array', {
  // 22.1.3.10 / 15.4.4.18 Array.prototype.forEach(callbackfn [, thisArg])
  forEach: function forEach(callbackfn /* , thisArg */){
    return $forEach(this, callbackfn, arguments[1]);
  }
});

/***/ }),
/* 232 */
/***/ (function(module, exports, __webpack_require__) {

// 9.4.2.3 ArraySpeciesCreate(originalArray, length)
var speciesConstructor = __webpack_require__(233);

module.exports = function(original, length){
  return new (speciesConstructor(original))(length);
};

/***/ }),
/* 233 */
/***/ (function(module, exports, __webpack_require__) {

var isObject = __webpack_require__(4)
  , isArray  = __webpack_require__(75)
  , SPECIES  = __webpack_require__(5)('species');

module.exports = function(original){
  var C;
  if(isArray(original)){
    C = original.constructor;
    // cross-realm fallback
    if(typeof C == 'function' && (C === Array || isArray(C.prototype)))C = undefined;
    if(isObject(C)){
      C = C[SPECIES];
      if(C === null)C = undefined;
    }
  } return C === undefined ? Array : C;
};

/***/ }),
/* 234 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var $export = __webpack_require__(0)
  , $map    = __webpack_require__(26)(1);

$export($export.P + $export.F * !__webpack_require__(22)([].map, true), 'Array', {
  // 22.1.3.15 / 15.4.4.19 Array.prototype.map(callbackfn [, thisArg])
  map: function map(callbackfn /* , thisArg */){
    return $map(this, callbackfn, arguments[1]);
  }
});

/***/ }),
/* 235 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var $export = __webpack_require__(0)
  , $filter = __webpack_require__(26)(2);

$export($export.P + $export.F * !__webpack_require__(22)([].filter, true), 'Array', {
  // 22.1.3.7 / 15.4.4.20 Array.prototype.filter(callbackfn [, thisArg])
  filter: function filter(callbackfn /* , thisArg */){
    return $filter(this, callbackfn, arguments[1]);
  }
});

/***/ }),
/* 236 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var $export = __webpack_require__(0)
  , $some   = __webpack_require__(26)(3);

$export($export.P + $export.F * !__webpack_require__(22)([].some, true), 'Array', {
  // 22.1.3.23 / 15.4.4.17 Array.prototype.some(callbackfn [, thisArg])
  some: function some(callbackfn /* , thisArg */){
    return $some(this, callbackfn, arguments[1]);
  }
});

/***/ }),
/* 237 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var $export = __webpack_require__(0)
  , $every  = __webpack_require__(26)(4);

$export($export.P + $export.F * !__webpack_require__(22)([].every, true), 'Array', {
  // 22.1.3.5 / 15.4.4.16 Array.prototype.every(callbackfn [, thisArg])
  every: function every(callbackfn /* , thisArg */){
    return $every(this, callbackfn, arguments[1]);
  }
});

/***/ }),
/* 238 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var $export = __webpack_require__(0)
  , $reduce = __webpack_require__(117);

$export($export.P + $export.F * !__webpack_require__(22)([].reduce, true), 'Array', {
  // 22.1.3.18 / 15.4.4.21 Array.prototype.reduce(callbackfn [, initialValue])
  reduce: function reduce(callbackfn /* , initialValue */){
    return $reduce(this, callbackfn, arguments.length, arguments[1], false);
  }
});

/***/ }),
/* 239 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var $export = __webpack_require__(0)
  , $reduce = __webpack_require__(117);

$export($export.P + $export.F * !__webpack_require__(22)([].reduceRight, true), 'Array', {
  // 22.1.3.19 / 15.4.4.22 Array.prototype.reduceRight(callbackfn [, initialValue])
  reduceRight: function reduceRight(callbackfn /* , initialValue */){
    return $reduce(this, callbackfn, arguments.length, arguments[1], true);
  }
});

/***/ }),
/* 240 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var $export       = __webpack_require__(0)
  , $indexOf      = __webpack_require__(53)(false)
  , $native       = [].indexOf
  , NEGATIVE_ZERO = !!$native && 1 / [1].indexOf(1, -0) < 0;

$export($export.P + $export.F * (NEGATIVE_ZERO || !__webpack_require__(22)($native)), 'Array', {
  // 22.1.3.11 / 15.4.4.14 Array.prototype.indexOf(searchElement [, fromIndex])
  indexOf: function indexOf(searchElement /*, fromIndex = 0 */){
    return NEGATIVE_ZERO
      // convert -0 to +0
      ? $native.apply(this, arguments) || 0
      : $indexOf(this, searchElement, arguments[1]);
  }
});

/***/ }),
/* 241 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var $export       = __webpack_require__(0)
  , toIObject     = __webpack_require__(12)
  , toInteger     = __webpack_require__(33)
  , toLength      = __webpack_require__(8)
  , $native       = [].lastIndexOf
  , NEGATIVE_ZERO = !!$native && 1 / [1].lastIndexOf(1, -0) < 0;

$export($export.P + $export.F * (NEGATIVE_ZERO || !__webpack_require__(22)($native)), 'Array', {
  // 22.1.3.14 / 15.4.4.15 Array.prototype.lastIndexOf(searchElement [, fromIndex])
  lastIndexOf: function lastIndexOf(searchElement /*, fromIndex = @[*-1] */){
    // convert -0 to +0
    if(NEGATIVE_ZERO)return $native.apply(this, arguments) || 0;
    var O      = toIObject(this)
      , length = toLength(O.length)
      , index  = length - 1;
    if(arguments.length > 1)index = Math.min(index, toInteger(arguments[1]));
    if(index < 0)index = length + index;
    for(;index >= 0; index--)if(index in O)if(O[index] === searchElement)return index || 0;
    return -1;
  }
});

/***/ }),
/* 242 */
/***/ (function(module, exports, __webpack_require__) {

// 22.1.3.3 Array.prototype.copyWithin(target, start, end = this.length)
var $export = __webpack_require__(0);

$export($export.P, 'Array', {copyWithin: __webpack_require__(118)});

__webpack_require__(47)('copyWithin');

/***/ }),
/* 243 */
/***/ (function(module, exports, __webpack_require__) {

// 22.1.3.6 Array.prototype.fill(value, start = 0, end = this.length)
var $export = __webpack_require__(0);

$export($export.P, 'Array', {fill: __webpack_require__(89)});

__webpack_require__(47)('fill');

/***/ }),
/* 244 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

// 22.1.3.8 Array.prototype.find(predicate, thisArg = undefined)
var $export = __webpack_require__(0)
  , $find   = __webpack_require__(26)(5)
  , KEY     = 'find'
  , forced  = true;
// Shouldn't skip holes
if(KEY in [])Array(1)[KEY](function(){ forced = false; });
$export($export.P + $export.F * forced, 'Array', {
  find: function find(callbackfn/*, that = undefined */){
    return $find(this, callbackfn, arguments.length > 1 ? arguments[1] : undefined);
  }
});
__webpack_require__(47)(KEY);

/***/ }),
/* 245 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

// 22.1.3.9 Array.prototype.findIndex(predicate, thisArg = undefined)
var $export = __webpack_require__(0)
  , $find   = __webpack_require__(26)(6)
  , KEY     = 'findIndex'
  , forced  = true;
// Shouldn't skip holes
if(KEY in [])Array(1)[KEY](function(){ forced = false; });
$export($export.P + $export.F * forced, 'Array', {
  findIndex: function findIndex(callbackfn/*, that = undefined */){
    return $find(this, callbackfn, arguments.length > 1 ? arguments[1] : undefined);
  }
});
__webpack_require__(47)(KEY);

/***/ }),
/* 246 */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(41)('Array');

/***/ }),
/* 247 */
/***/ (function(module, exports, __webpack_require__) {

var global            = __webpack_require__(2)
  , inheritIfRequired = __webpack_require__(80)
  , dP                = __webpack_require__(6).f
  , gOPN              = __webpack_require__(38).f
  , isRegExp          = __webpack_require__(58)
  , $flags            = __webpack_require__(60)
  , $RegExp           = global.RegExp
  , Base              = $RegExp
  , proto             = $RegExp.prototype
  , re1               = /a/g
  , re2               = /a/g
  // "new" creates a new object, old webkit buggy here
  , CORRECT_NEW       = new $RegExp(re1) !== re1;

if(__webpack_require__(7) && (!CORRECT_NEW || __webpack_require__(3)(function(){
  re2[__webpack_require__(5)('match')] = false;
  // RegExp constructor can alter flags and IsRegExp works correct with @@match
  return $RegExp(re1) != re1 || $RegExp(re2) == re2 || $RegExp(re1, 'i') != '/a/i';
}))){
  $RegExp = function RegExp(p, f){
    var tiRE = this instanceof $RegExp
      , piRE = isRegExp(p)
      , fiU  = f === undefined;
    return !tiRE && piRE && p.constructor === $RegExp && fiU ? p
      : inheritIfRequired(CORRECT_NEW
        ? new Base(piRE && !fiU ? p.source : p, f)
        : Base((piRE = p instanceof $RegExp) ? p.source : p, piRE && fiU ? $flags.call(p) : f)
      , tiRE ? this : proto, $RegExp);
  };
  var proxy = function(key){
    key in $RegExp || dP($RegExp, key, {
      configurable: true,
      get: function(){ return Base[key]; },
      set: function(it){ Base[key] = it; }
    });
  };
  for(var keys = gOPN(Base), i = 0; keys.length > i; )proxy(keys[i++]);
  proto.constructor = $RegExp;
  $RegExp.prototype = proto;
  __webpack_require__(16)(global, 'RegExp', $RegExp);
}

__webpack_require__(41)('RegExp');

/***/ }),
/* 248 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

__webpack_require__(119);
var anObject    = __webpack_require__(1)
  , $flags      = __webpack_require__(60)
  , DESCRIPTORS = __webpack_require__(7)
  , TO_STRING   = 'toString'
  , $toString   = /./[TO_STRING];

var define = function(fn){
  __webpack_require__(16)(RegExp.prototype, TO_STRING, fn, true);
};

// 21.2.5.14 RegExp.prototype.toString()
if(__webpack_require__(3)(function(){ return $toString.call({source: 'a', flags: 'b'}) != '/a/b'; })){
  define(function toString(){
    var R = anObject(this);
    return '/'.concat(R.source, '/',
      'flags' in R ? R.flags : !DESCRIPTORS && R instanceof RegExp ? $flags.call(R) : undefined);
  });
// FF44- RegExp#toString has a wrong name
} else if($toString.name != TO_STRING){
  define(function toString(){
    return $toString.call(this);
  });
}

/***/ }),
/* 249 */
/***/ (function(module, exports, __webpack_require__) {

// @@match logic
__webpack_require__(61)('match', 1, function(defined, MATCH, $match){
  // 21.1.3.11 String.prototype.match(regexp)
  return [function match(regexp){
    'use strict';
    var O  = defined(this)
      , fn = regexp == undefined ? undefined : regexp[MATCH];
    return fn !== undefined ? fn.call(regexp, O) : new RegExp(regexp)[MATCH](String(O));
  }, $match];
});

/***/ }),
/* 250 */
/***/ (function(module, exports, __webpack_require__) {

// @@replace logic
__webpack_require__(61)('replace', 2, function(defined, REPLACE, $replace){
  // 21.1.3.14 String.prototype.replace(searchValue, replaceValue)
  return [function replace(searchValue, replaceValue){
    'use strict';
    var O  = defined(this)
      , fn = searchValue == undefined ? undefined : searchValue[REPLACE];
    return fn !== undefined
      ? fn.call(searchValue, O, replaceValue)
      : $replace.call(String(O), searchValue, replaceValue);
  }, $replace];
});

/***/ }),
/* 251 */
/***/ (function(module, exports, __webpack_require__) {

// @@search logic
__webpack_require__(61)('search', 1, function(defined, SEARCH, $search){
  // 21.1.3.15 String.prototype.search(regexp)
  return [function search(regexp){
    'use strict';
    var O  = defined(this)
      , fn = regexp == undefined ? undefined : regexp[SEARCH];
    return fn !== undefined ? fn.call(regexp, O) : new RegExp(regexp)[SEARCH](String(O));
  }, $search];
});

/***/ }),
/* 252 */
/***/ (function(module, exports, __webpack_require__) {

// @@split logic
__webpack_require__(61)('split', 2, function(defined, SPLIT, $split){
  'use strict';
  var isRegExp   = __webpack_require__(58)
    , _split     = $split
    , $push      = [].push
    , $SPLIT     = 'split'
    , LENGTH     = 'length'
    , LAST_INDEX = 'lastIndex';
  if(
    'abbc'[$SPLIT](/(b)*/)[1] == 'c' ||
    'test'[$SPLIT](/(?:)/, -1)[LENGTH] != 4 ||
    'ab'[$SPLIT](/(?:ab)*/)[LENGTH] != 2 ||
    '.'[$SPLIT](/(.?)(.?)/)[LENGTH] != 4 ||
    '.'[$SPLIT](/()()/)[LENGTH] > 1 ||
    ''[$SPLIT](/.?/)[LENGTH]
  ){
    var NPCG = /()??/.exec('')[1] === undefined; // nonparticipating capturing group
    // based on es5-shim implementation, need to rework it
    $split = function(separator, limit){
      var string = String(this);
      if(separator === undefined && limit === 0)return [];
      // If `separator` is not a regex, use native split
      if(!isRegExp(separator))return _split.call(string, separator, limit);
      var output = [];
      var flags = (separator.ignoreCase ? 'i' : '') +
                  (separator.multiline ? 'm' : '') +
                  (separator.unicode ? 'u' : '') +
                  (separator.sticky ? 'y' : '');
      var lastLastIndex = 0;
      var splitLimit = limit === undefined ? 4294967295 : limit >>> 0;
      // Make `global` and avoid `lastIndex` issues by working with a copy
      var separatorCopy = new RegExp(separator.source, flags + 'g');
      var separator2, match, lastIndex, lastLength, i;
      // Doesn't need flags gy, but they don't hurt
      if(!NPCG)separator2 = new RegExp('^' + separatorCopy.source + '$(?!\\s)', flags);
      while(match = separatorCopy.exec(string)){
        // `separatorCopy.lastIndex` is not reliable cross-browser
        lastIndex = match.index + match[0][LENGTH];
        if(lastIndex > lastLastIndex){
          output.push(string.slice(lastLastIndex, match.index));
          // Fix browsers whose `exec` methods don't consistently return `undefined` for NPCG
          if(!NPCG && match[LENGTH] > 1)match[0].replace(separator2, function(){
            for(i = 1; i < arguments[LENGTH] - 2; i++)if(arguments[i] === undefined)match[i] = undefined;
          });
          if(match[LENGTH] > 1 && match.index < string[LENGTH])$push.apply(output, match.slice(1));
          lastLength = match[0][LENGTH];
          lastLastIndex = lastIndex;
          if(output[LENGTH] >= splitLimit)break;
        }
        if(separatorCopy[LAST_INDEX] === match.index)separatorCopy[LAST_INDEX]++; // Avoid an infinite loop
      }
      if(lastLastIndex === string[LENGTH]){
        if(lastLength || !separatorCopy.test(''))output.push('');
      } else output.push(string.slice(lastLastIndex));
      return output[LENGTH] > splitLimit ? output.slice(0, splitLimit) : output;
    };
  // Chakra, V8
  } else if('0'[$SPLIT](undefined, 0)[LENGTH]){
    $split = function(separator, limit){
      return separator === undefined && limit === 0 ? [] : _split.call(this, separator, limit);
    };
  }
  // 21.1.3.17 String.prototype.split(separator, limit)
  return [function split(separator, limit){
    var O  = defined(this)
      , fn = separator == undefined ? undefined : separator[SPLIT];
    return fn !== undefined ? fn.call(separator, O, limit) : $split.call(String(O), separator, limit);
  }, $split];
});

/***/ }),
/* 253 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var LIBRARY            = __webpack_require__(36)
  , global             = __webpack_require__(2)
  , ctx                = __webpack_require__(24)
  , classof            = __webpack_require__(39)
  , $export            = __webpack_require__(0)
  , isObject           = __webpack_require__(4)
  , aFunction          = __webpack_require__(13)
  , anInstance         = __webpack_require__(42)
  , forOf              = __webpack_require__(43)
  , speciesConstructor = __webpack_require__(92)
  , task               = __webpack_require__(93).set
  , microtask          = __webpack_require__(94)()
  , PROMISE            = 'Promise'
  , TypeError          = global.TypeError
  , process            = global.process
  , $Promise           = global[PROMISE]
  , process            = global.process
  , isNode             = classof(process) == 'process'
  , empty              = function(){ /* empty */ }
  , Internal, GenericPromiseCapability, Wrapper;

var USE_NATIVE = !!function(){
  try {
    // correct subclassing with @@species support
    var promise     = $Promise.resolve(1)
      , FakePromise = (promise.constructor = {})[__webpack_require__(5)('species')] = function(exec){ exec(empty, empty); };
    // unhandled rejections tracking support, NodeJS Promise without it fails @@species test
    return (isNode || typeof PromiseRejectionEvent == 'function') && promise.then(empty) instanceof FakePromise;
  } catch(e){ /* empty */ }
}();

// helpers
var sameConstructor = function(a, b){
  // with library wrapper special case
  return a === b || a === $Promise && b === Wrapper;
};
var isThenable = function(it){
  var then;
  return isObject(it) && typeof (then = it.then) == 'function' ? then : false;
};
var newPromiseCapability = function(C){
  return sameConstructor($Promise, C)
    ? new PromiseCapability(C)
    : new GenericPromiseCapability(C);
};
var PromiseCapability = GenericPromiseCapability = function(C){
  var resolve, reject;
  this.promise = new C(function($$resolve, $$reject){
    if(resolve !== undefined || reject !== undefined)throw TypeError('Bad Promise constructor');
    resolve = $$resolve;
    reject  = $$reject;
  });
  this.resolve = aFunction(resolve);
  this.reject  = aFunction(reject);
};
var perform = function(exec){
  try {
    exec();
  } catch(e){
    return {error: e};
  }
};
var notify = function(promise, isReject){
  if(promise._n)return;
  promise._n = true;
  var chain = promise._c;
  microtask(function(){
    var value = promise._v
      , ok    = promise._s == 1
      , i     = 0;
    var run = function(reaction){
      var handler = ok ? reaction.ok : reaction.fail
        , resolve = reaction.resolve
        , reject  = reaction.reject
        , domain  = reaction.domain
        , result, then;
      try {
        if(handler){
          if(!ok){
            if(promise._h == 2)onHandleUnhandled(promise);
            promise._h = 1;
          }
          if(handler === true)result = value;
          else {
            if(domain)domain.enter();
            result = handler(value);
            if(domain)domain.exit();
          }
          if(result === reaction.promise){
            reject(TypeError('Promise-chain cycle'));
          } else if(then = isThenable(result)){
            then.call(result, resolve, reject);
          } else resolve(result);
        } else reject(value);
      } catch(e){
        reject(e);
      }
    };
    while(chain.length > i)run(chain[i++]); // variable length - can't use forEach
    promise._c = [];
    promise._n = false;
    if(isReject && !promise._h)onUnhandled(promise);
  });
};
var onUnhandled = function(promise){
  task.call(global, function(){
    var value = promise._v
      , abrupt, handler, console;
    if(isUnhandled(promise)){
      abrupt = perform(function(){
        if(isNode){
          process.emit('unhandledRejection', value, promise);
        } else if(handler = global.onunhandledrejection){
          handler({promise: promise, reason: value});
        } else if((console = global.console) && console.error){
          console.error('Unhandled promise rejection', value);
        }
      });
      // Browsers should not trigger `rejectionHandled` event if it was handled here, NodeJS - should
      promise._h = isNode || isUnhandled(promise) ? 2 : 1;
    } promise._a = undefined;
    if(abrupt)throw abrupt.error;
  });
};
var isUnhandled = function(promise){
  if(promise._h == 1)return false;
  var chain = promise._a || promise._c
    , i     = 0
    , reaction;
  while(chain.length > i){
    reaction = chain[i++];
    if(reaction.fail || !isUnhandled(reaction.promise))return false;
  } return true;
};
var onHandleUnhandled = function(promise){
  task.call(global, function(){
    var handler;
    if(isNode){
      process.emit('rejectionHandled', promise);
    } else if(handler = global.onrejectionhandled){
      handler({promise: promise, reason: promise._v});
    }
  });
};
var $reject = function(value){
  var promise = this;
  if(promise._d)return;
  promise._d = true;
  promise = promise._w || promise; // unwrap
  promise._v = value;
  promise._s = 2;
  if(!promise._a)promise._a = promise._c.slice();
  notify(promise, true);
};
var $resolve = function(value){
  var promise = this
    , then;
  if(promise._d)return;
  promise._d = true;
  promise = promise._w || promise; // unwrap
  try {
    if(promise === value)throw TypeError("Promise can't be resolved itself");
    if(then = isThenable(value)){
      microtask(function(){
        var wrapper = {_w: promise, _d: false}; // wrap
        try {
          then.call(value, ctx($resolve, wrapper, 1), ctx($reject, wrapper, 1));
        } catch(e){
          $reject.call(wrapper, e);
        }
      });
    } else {
      promise._v = value;
      promise._s = 1;
      notify(promise, false);
    }
  } catch(e){
    $reject.call({_w: promise, _d: false}, e); // wrap
  }
};

// constructor polyfill
if(!USE_NATIVE){
  // 25.4.3.1 Promise(executor)
  $Promise = function Promise(executor){
    anInstance(this, $Promise, PROMISE, '_h');
    aFunction(executor);
    Internal.call(this);
    try {
      executor(ctx($resolve, this, 1), ctx($reject, this, 1));
    } catch(err){
      $reject.call(this, err);
    }
  };
  Internal = function Promise(executor){
    this._c = [];             // <- awaiting reactions
    this._a = undefined;      // <- checked in isUnhandled reactions
    this._s = 0;              // <- state
    this._d = false;          // <- done
    this._v = undefined;      // <- value
    this._h = 0;              // <- rejection state, 0 - default, 1 - handled, 2 - unhandled
    this._n = false;          // <- notify
  };
  Internal.prototype = __webpack_require__(44)($Promise.prototype, {
    // 25.4.5.3 Promise.prototype.then(onFulfilled, onRejected)
    then: function then(onFulfilled, onRejected){
      var reaction    = newPromiseCapability(speciesConstructor(this, $Promise));
      reaction.ok     = typeof onFulfilled == 'function' ? onFulfilled : true;
      reaction.fail   = typeof onRejected == 'function' && onRejected;
      reaction.domain = isNode ? process.domain : undefined;
      this._c.push(reaction);
      if(this._a)this._a.push(reaction);
      if(this._s)notify(this, false);
      return reaction.promise;
    },
    // 25.4.5.1 Promise.prototype.catch(onRejected)
    'catch': function(onRejected){
      return this.then(undefined, onRejected);
    }
  });
  PromiseCapability = function(){
    var promise  = new Internal;
    this.promise = promise;
    this.resolve = ctx($resolve, promise, 1);
    this.reject  = ctx($reject, promise, 1);
  };
}

$export($export.G + $export.W + $export.F * !USE_NATIVE, {Promise: $Promise});
__webpack_require__(45)($Promise, PROMISE);
__webpack_require__(41)(PROMISE);
Wrapper = __webpack_require__(14)[PROMISE];

// statics
$export($export.S + $export.F * !USE_NATIVE, PROMISE, {
  // 25.4.4.5 Promise.reject(r)
  reject: function reject(r){
    var capability = newPromiseCapability(this)
      , $$reject   = capability.reject;
    $$reject(r);
    return capability.promise;
  }
});
$export($export.S + $export.F * (LIBRARY || !USE_NATIVE), PROMISE, {
  // 25.4.4.6 Promise.resolve(x)
  resolve: function resolve(x){
    // instanceof instead of internal slot check because we should fix it without replacement native Promise core
    if(x instanceof $Promise && sameConstructor(x.constructor, this))return x;
    var capability = newPromiseCapability(this)
      , $$resolve  = capability.resolve;
    $$resolve(x);
    return capability.promise;
  }
});
$export($export.S + $export.F * !(USE_NATIVE && __webpack_require__(59)(function(iter){
  $Promise.all(iter)['catch'](empty);
})), PROMISE, {
  // 25.4.4.1 Promise.all(iterable)
  all: function all(iterable){
    var C          = this
      , capability = newPromiseCapability(C)
      , resolve    = capability.resolve
      , reject     = capability.reject;
    var abrupt = perform(function(){
      var values    = []
        , index     = 0
        , remaining = 1;
      forOf(iterable, false, function(promise){
        var $index        = index++
          , alreadyCalled = false;
        values.push(undefined);
        remaining++;
        C.resolve(promise).then(function(value){
          if(alreadyCalled)return;
          alreadyCalled  = true;
          values[$index] = value;
          --remaining || resolve(values);
        }, reject);
      });
      --remaining || resolve(values);
    });
    if(abrupt)reject(abrupt.error);
    return capability.promise;
  },
  // 25.4.4.4 Promise.race(iterable)
  race: function race(iterable){
    var C          = this
      , capability = newPromiseCapability(C)
      , reject     = capability.reject;
    var abrupt = perform(function(){
      forOf(iterable, false, function(promise){
        C.resolve(promise).then(capability.resolve, reject);
      });
    });
    if(abrupt)reject(abrupt.error);
    return capability.promise;
  }
});

/***/ }),
/* 254 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var weak = __webpack_require__(124);

// 23.4 WeakSet Objects
__webpack_require__(62)('WeakSet', function(get){
  return function WeakSet(){ return get(this, arguments.length > 0 ? arguments[0] : undefined); };
}, {
  // 23.4.3.1 WeakSet.prototype.add(value)
  add: function add(value){
    return weak.def(this, value, true);
  }
}, weak, false, true);

/***/ }),
/* 255 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var $export      = __webpack_require__(0)
  , $typed       = __webpack_require__(63)
  , buffer       = __webpack_require__(95)
  , anObject     = __webpack_require__(1)
  , toIndex      = __webpack_require__(37)
  , toLength     = __webpack_require__(8)
  , isObject     = __webpack_require__(4)
  , ArrayBuffer  = __webpack_require__(2).ArrayBuffer
  , speciesConstructor = __webpack_require__(92)
  , $ArrayBuffer = buffer.ArrayBuffer
  , $DataView    = buffer.DataView
  , $isView      = $typed.ABV && ArrayBuffer.isView
  , $slice       = $ArrayBuffer.prototype.slice
  , VIEW         = $typed.VIEW
  , ARRAY_BUFFER = 'ArrayBuffer';

$export($export.G + $export.W + $export.F * (ArrayBuffer !== $ArrayBuffer), {ArrayBuffer: $ArrayBuffer});

$export($export.S + $export.F * !$typed.CONSTR, ARRAY_BUFFER, {
  // 24.1.3.1 ArrayBuffer.isView(arg)
  isView: function isView(it){
    return $isView && $isView(it) || isObject(it) && VIEW in it;
  }
});

$export($export.P + $export.U + $export.F * __webpack_require__(3)(function(){
  return !new $ArrayBuffer(2).slice(1, undefined).byteLength;
}), ARRAY_BUFFER, {
  // 24.1.4.3 ArrayBuffer.prototype.slice(start, end)
  slice: function slice(start, end){
    if($slice !== undefined && end === undefined)return $slice.call(anObject(this), start); // FF fix
    var len    = anObject(this).byteLength
      , first  = toIndex(start, len)
      , final  = toIndex(end === undefined ? len : end, len)
      , result = new (speciesConstructor(this, $ArrayBuffer))(toLength(final - first))
      , viewS  = new $DataView(this)
      , viewT  = new $DataView(result)
      , index  = 0;
    while(first < final){
      viewT.setUint8(index++, viewS.getUint8(first++));
    } return result;
  }
});

__webpack_require__(41)(ARRAY_BUFFER);

/***/ }),
/* 256 */
/***/ (function(module, exports, __webpack_require__) {

var $export = __webpack_require__(0);
$export($export.G + $export.W + $export.F * !__webpack_require__(63).ABV, {
  DataView: __webpack_require__(95).DataView
});

/***/ }),
/* 257 */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(29)('Int8', 1, function(init){
  return function Int8Array(data, byteOffset, length){
    return init(this, data, byteOffset, length);
  };
});

/***/ }),
/* 258 */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(29)('Uint8', 1, function(init){
  return function Uint8Array(data, byteOffset, length){
    return init(this, data, byteOffset, length);
  };
});

/***/ }),
/* 259 */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(29)('Uint8', 1, function(init){
  return function Uint8ClampedArray(data, byteOffset, length){
    return init(this, data, byteOffset, length);
  };
}, true);

/***/ }),
/* 260 */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(29)('Int16', 2, function(init){
  return function Int16Array(data, byteOffset, length){
    return init(this, data, byteOffset, length);
  };
});

/***/ }),
/* 261 */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(29)('Uint16', 2, function(init){
  return function Uint16Array(data, byteOffset, length){
    return init(this, data, byteOffset, length);
  };
});

/***/ }),
/* 262 */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(29)('Int32', 4, function(init){
  return function Int32Array(data, byteOffset, length){
    return init(this, data, byteOffset, length);
  };
});

/***/ }),
/* 263 */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(29)('Uint32', 4, function(init){
  return function Uint32Array(data, byteOffset, length){
    return init(this, data, byteOffset, length);
  };
});

/***/ }),
/* 264 */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(29)('Float32', 4, function(init){
  return function Float32Array(data, byteOffset, length){
    return init(this, data, byteOffset, length);
  };
});

/***/ }),
/* 265 */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(29)('Float64', 8, function(init){
  return function Float64Array(data, byteOffset, length){
    return init(this, data, byteOffset, length);
  };
});

/***/ }),
/* 266 */
/***/ (function(module, exports, __webpack_require__) {

// 26.1.1 Reflect.apply(target, thisArgument, argumentsList)
var $export   = __webpack_require__(0)
  , aFunction = __webpack_require__(13)
  , anObject  = __webpack_require__(1)
  , rApply    = (__webpack_require__(2).Reflect || {}).apply
  , fApply    = Function.apply;
// MS Edge argumentsList argument is optional
$export($export.S + $export.F * !__webpack_require__(3)(function(){
  rApply(function(){});
}), 'Reflect', {
  apply: function apply(target, thisArgument, argumentsList){
    var T = aFunction(target)
      , L = anObject(argumentsList);
    return rApply ? rApply(T, thisArgument, L) : fApply.call(T, thisArgument, L);
  }
});

/***/ }),
/* 267 */
/***/ (function(module, exports, __webpack_require__) {

// 26.1.2 Reflect.construct(target, argumentsList [, newTarget])
var $export    = __webpack_require__(0)
  , create     = __webpack_require__(28)
  , aFunction  = __webpack_require__(13)
  , anObject   = __webpack_require__(1)
  , isObject   = __webpack_require__(4)
  , fails      = __webpack_require__(3)
  , bind       = __webpack_require__(110)
  , rConstruct = (__webpack_require__(2).Reflect || {}).construct;

// MS Edge supports only 2 arguments and argumentsList argument is optional
// FF Nightly sets third argument as `new.target`, but does not create `this` from it
var NEW_TARGET_BUG = fails(function(){
  function F(){}
  return !(rConstruct(function(){}, [], F) instanceof F);
});
var ARGS_BUG = !fails(function(){
  rConstruct(function(){});
});

$export($export.S + $export.F * (NEW_TARGET_BUG || ARGS_BUG), 'Reflect', {
  construct: function construct(Target, args /*, newTarget*/){
    aFunction(Target);
    anObject(args);
    var newTarget = arguments.length < 3 ? Target : aFunction(arguments[2]);
    if(ARGS_BUG && !NEW_TARGET_BUG)return rConstruct(Target, args, newTarget);
    if(Target == newTarget){
      // w/o altered newTarget, optimization for 0-4 arguments
      switch(args.length){
        case 0: return new Target;
        case 1: return new Target(args[0]);
        case 2: return new Target(args[0], args[1]);
        case 3: return new Target(args[0], args[1], args[2]);
        case 4: return new Target(args[0], args[1], args[2], args[3]);
      }
      // w/o altered newTarget, lot of arguments case
      var $args = [null];
      $args.push.apply($args, args);
      return new (bind.apply(Target, $args));
    }
    // with altered newTarget, not support built-in constructors
    var proto    = newTarget.prototype
      , instance = create(isObject(proto) ? proto : Object.prototype)
      , result   = Function.apply.call(Target, instance, args);
    return isObject(result) ? result : instance;
  }
});

/***/ }),
/* 268 */
/***/ (function(module, exports, __webpack_require__) {

// 26.1.3 Reflect.defineProperty(target, propertyKey, attributes)
var dP          = __webpack_require__(6)
  , $export     = __webpack_require__(0)
  , anObject    = __webpack_require__(1)
  , toPrimitive = __webpack_require__(23);

// MS Edge has broken Reflect.defineProperty - throwing instead of returning false
$export($export.S + $export.F * __webpack_require__(3)(function(){
  Reflect.defineProperty(dP.f({}, 1, {value: 1}), 1, {value: 2});
}), 'Reflect', {
  defineProperty: function defineProperty(target, propertyKey, attributes){
    anObject(target);
    propertyKey = toPrimitive(propertyKey, true);
    anObject(attributes);
    try {
      dP.f(target, propertyKey, attributes);
      return true;
    } catch(e){
      return false;
    }
  }
});

/***/ }),
/* 269 */
/***/ (function(module, exports, __webpack_require__) {

// 26.1.4 Reflect.deleteProperty(target, propertyKey)
var $export  = __webpack_require__(0)
  , gOPD     = __webpack_require__(17).f
  , anObject = __webpack_require__(1);

$export($export.S, 'Reflect', {
  deleteProperty: function deleteProperty(target, propertyKey){
    var desc = gOPD(anObject(target), propertyKey);
    return desc && !desc.configurable ? false : delete target[propertyKey];
  }
});

/***/ }),
/* 270 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

// 26.1.5 Reflect.enumerate(target)
var $export  = __webpack_require__(0)
  , anObject = __webpack_require__(1);
var Enumerate = function(iterated){
  this._t = anObject(iterated); // target
  this._i = 0;                  // next index
  var keys = this._k = []       // keys
    , key;
  for(key in iterated)keys.push(key);
};
__webpack_require__(57)(Enumerate, 'Object', function(){
  var that = this
    , keys = that._k
    , key;
  do {
    if(that._i >= keys.length)return {value: undefined, done: true};
  } while(!((key = keys[that._i++]) in that._t));
  return {value: key, done: false};
});

$export($export.S, 'Reflect', {
  enumerate: function enumerate(target){
    return new Enumerate(target);
  }
});

/***/ }),
/* 271 */
/***/ (function(module, exports, __webpack_require__) {

// 26.1.6 Reflect.get(target, propertyKey [, receiver])
var gOPD           = __webpack_require__(17)
  , getPrototypeOf = __webpack_require__(18)
  , has            = __webpack_require__(11)
  , $export        = __webpack_require__(0)
  , isObject       = __webpack_require__(4)
  , anObject       = __webpack_require__(1);

function get(target, propertyKey/*, receiver*/){
  var receiver = arguments.length < 3 ? target : arguments[2]
    , desc, proto;
  if(anObject(target) === receiver)return target[propertyKey];
  if(desc = gOPD.f(target, propertyKey))return has(desc, 'value')
    ? desc.value
    : desc.get !== undefined
      ? desc.get.call(receiver)
      : undefined;
  if(isObject(proto = getPrototypeOf(target)))return get(proto, propertyKey, receiver);
}

$export($export.S, 'Reflect', {get: get});

/***/ }),
/* 272 */
/***/ (function(module, exports, __webpack_require__) {

// 26.1.7 Reflect.getOwnPropertyDescriptor(target, propertyKey)
var gOPD     = __webpack_require__(17)
  , $export  = __webpack_require__(0)
  , anObject = __webpack_require__(1);

$export($export.S, 'Reflect', {
  getOwnPropertyDescriptor: function getOwnPropertyDescriptor(target, propertyKey){
    return gOPD.f(anObject(target), propertyKey);
  }
});

/***/ }),
/* 273 */
/***/ (function(module, exports, __webpack_require__) {

// 26.1.8 Reflect.getPrototypeOf(target)
var $export  = __webpack_require__(0)
  , getProto = __webpack_require__(18)
  , anObject = __webpack_require__(1);

$export($export.S, 'Reflect', {
  getPrototypeOf: function getPrototypeOf(target){
    return getProto(anObject(target));
  }
});

/***/ }),
/* 274 */
/***/ (function(module, exports, __webpack_require__) {

// 26.1.9 Reflect.has(target, propertyKey)
var $export = __webpack_require__(0);

$export($export.S, 'Reflect', {
  has: function has(target, propertyKey){
    return propertyKey in target;
  }
});

/***/ }),
/* 275 */
/***/ (function(module, exports, __webpack_require__) {

// 26.1.10 Reflect.isExtensible(target)
var $export       = __webpack_require__(0)
  , anObject      = __webpack_require__(1)
  , $isExtensible = Object.isExtensible;

$export($export.S, 'Reflect', {
  isExtensible: function isExtensible(target){
    anObject(target);
    return $isExtensible ? $isExtensible(target) : true;
  }
});

/***/ }),
/* 276 */
/***/ (function(module, exports, __webpack_require__) {

// 26.1.11 Reflect.ownKeys(target)
var $export = __webpack_require__(0);

$export($export.S, 'Reflect', {ownKeys: __webpack_require__(96)});

/***/ }),
/* 277 */
/***/ (function(module, exports, __webpack_require__) {

// 26.1.12 Reflect.preventExtensions(target)
var $export            = __webpack_require__(0)
  , anObject           = __webpack_require__(1)
  , $preventExtensions = Object.preventExtensions;

$export($export.S, 'Reflect', {
  preventExtensions: function preventExtensions(target){
    anObject(target);
    try {
      if($preventExtensions)$preventExtensions(target);
      return true;
    } catch(e){
      return false;
    }
  }
});

/***/ }),
/* 278 */
/***/ (function(module, exports, __webpack_require__) {

// 26.1.13 Reflect.set(target, propertyKey, V [, receiver])
var dP             = __webpack_require__(6)
  , gOPD           = __webpack_require__(17)
  , getPrototypeOf = __webpack_require__(18)
  , has            = __webpack_require__(11)
  , $export        = __webpack_require__(0)
  , createDesc     = __webpack_require__(27)
  , anObject       = __webpack_require__(1)
  , isObject       = __webpack_require__(4);

function set(target, propertyKey, V/*, receiver*/){
  var receiver = arguments.length < 4 ? target : arguments[3]
    , ownDesc  = gOPD.f(anObject(target), propertyKey)
    , existingDescriptor, proto;
  if(!ownDesc){
    if(isObject(proto = getPrototypeOf(target))){
      return set(proto, propertyKey, V, receiver);
    }
    ownDesc = createDesc(0);
  }
  if(has(ownDesc, 'value')){
    if(ownDesc.writable === false || !isObject(receiver))return false;
    existingDescriptor = gOPD.f(receiver, propertyKey) || createDesc(0);
    existingDescriptor.value = V;
    dP.f(receiver, propertyKey, existingDescriptor);
    return true;
  }
  return ownDesc.set === undefined ? false : (ownDesc.set.call(receiver, V), true);
}

$export($export.S, 'Reflect', {set: set});

/***/ }),
/* 279 */
/***/ (function(module, exports, __webpack_require__) {

// 26.1.14 Reflect.setPrototypeOf(target, proto)
var $export  = __webpack_require__(0)
  , setProto = __webpack_require__(78);

if(setProto)$export($export.S, 'Reflect', {
  setPrototypeOf: function setPrototypeOf(target, proto){
    setProto.check(target, proto);
    try {
      setProto.set(target, proto);
      return true;
    } catch(e){
      return false;
    }
  }
});

/***/ }),
/* 280 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

// https://github.com/tc39/Array.prototype.includes
var $export   = __webpack_require__(0)
  , $includes = __webpack_require__(53)(true);

$export($export.P, 'Array', {
  includes: function includes(el /*, fromIndex = 0 */){
    return $includes(this, el, arguments.length > 1 ? arguments[1] : undefined);
  }
});

__webpack_require__(47)('includes');

/***/ }),
/* 281 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

// https://github.com/mathiasbynens/String.prototype.at
var $export = __webpack_require__(0)
  , $at     = __webpack_require__(84)(true);

$export($export.P, 'String', {
  at: function at(pos){
    return $at(this, pos);
  }
});

/***/ }),
/* 282 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

// https://github.com/tc39/proposal-string-pad-start-end
var $export = __webpack_require__(0)
  , $pad    = __webpack_require__(125);

$export($export.P, 'String', {
  padStart: function padStart(maxLength /*, fillString = ' ' */){
    return $pad(this, maxLength, arguments.length > 1 ? arguments[1] : undefined, true);
  }
});

/***/ }),
/* 283 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

// https://github.com/tc39/proposal-string-pad-start-end
var $export = __webpack_require__(0)
  , $pad    = __webpack_require__(125);

$export($export.P, 'String', {
  padEnd: function padEnd(maxLength /*, fillString = ' ' */){
    return $pad(this, maxLength, arguments.length > 1 ? arguments[1] : undefined, false);
  }
});

/***/ }),
/* 284 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

// https://github.com/sebmarkbage/ecmascript-string-left-right-trim
__webpack_require__(46)('trimLeft', function($trim){
  return function trimLeft(){
    return $trim(this, 1);
  };
}, 'trimStart');

/***/ }),
/* 285 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

// https://github.com/sebmarkbage/ecmascript-string-left-right-trim
__webpack_require__(46)('trimRight', function($trim){
  return function trimRight(){
    return $trim(this, 2);
  };
}, 'trimEnd');

/***/ }),
/* 286 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

// https://tc39.github.io/String.prototype.matchAll/
var $export     = __webpack_require__(0)
  , defined     = __webpack_require__(21)
  , toLength    = __webpack_require__(8)
  , isRegExp    = __webpack_require__(58)
  , getFlags    = __webpack_require__(60)
  , RegExpProto = RegExp.prototype;

var $RegExpStringIterator = function(regexp, string){
  this._r = regexp;
  this._s = string;
};

__webpack_require__(57)($RegExpStringIterator, 'RegExp String', function next(){
  var match = this._r.exec(this._s);
  return {value: match, done: match === null};
});

$export($export.P, 'String', {
  matchAll: function matchAll(regexp){
    defined(this);
    if(!isRegExp(regexp))throw TypeError(regexp + ' is not a regexp!');
    var S     = String(this)
      , flags = 'flags' in RegExpProto ? String(regexp.flags) : getFlags.call(regexp)
      , rx    = new RegExp(regexp.source, ~flags.indexOf('g') ? flags : 'g' + flags);
    rx.lastIndex = toLength(regexp.lastIndex);
    return new $RegExpStringIterator(rx, S);
  }
});

/***/ }),
/* 287 */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(72)('asyncIterator');

/***/ }),
/* 288 */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(72)('observable');

/***/ }),
/* 289 */
/***/ (function(module, exports, __webpack_require__) {

// https://github.com/tc39/proposal-object-getownpropertydescriptors
var $export        = __webpack_require__(0)
  , ownKeys        = __webpack_require__(96)
  , toIObject      = __webpack_require__(12)
  , gOPD           = __webpack_require__(17)
  , createProperty = __webpack_require__(88);

$export($export.S, 'Object', {
  getOwnPropertyDescriptors: function getOwnPropertyDescriptors(object){
    var O       = toIObject(object)
      , getDesc = gOPD.f
      , keys    = ownKeys(O)
      , result  = {}
      , i       = 0
      , key;
    while(keys.length > i)createProperty(result, key = keys[i++], getDesc(O, key));
    return result;
  }
});

/***/ }),
/* 290 */
/***/ (function(module, exports, __webpack_require__) {

// https://github.com/tc39/proposal-object-values-entries
var $export = __webpack_require__(0)
  , $values = __webpack_require__(126)(false);

$export($export.S, 'Object', {
  values: function values(it){
    return $values(it);
  }
});

/***/ }),
/* 291 */
/***/ (function(module, exports, __webpack_require__) {

// https://github.com/tc39/proposal-object-values-entries
var $export  = __webpack_require__(0)
  , $entries = __webpack_require__(126)(true);

$export($export.S, 'Object', {
  entries: function entries(it){
    return $entries(it);
  }
});

/***/ }),
/* 292 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var $export         = __webpack_require__(0)
  , toObject        = __webpack_require__(9)
  , aFunction       = __webpack_require__(13)
  , $defineProperty = __webpack_require__(6);

// B.2.2.2 Object.prototype.__defineGetter__(P, getter)
__webpack_require__(7) && $export($export.P + __webpack_require__(64), 'Object', {
  __defineGetter__: function __defineGetter__(P, getter){
    $defineProperty.f(toObject(this), P, {get: aFunction(getter), enumerable: true, configurable: true});
  }
});

/***/ }),
/* 293 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var $export         = __webpack_require__(0)
  , toObject        = __webpack_require__(9)
  , aFunction       = __webpack_require__(13)
  , $defineProperty = __webpack_require__(6);

// B.2.2.3 Object.prototype.__defineSetter__(P, setter)
__webpack_require__(7) && $export($export.P + __webpack_require__(64), 'Object', {
  __defineSetter__: function __defineSetter__(P, setter){
    $defineProperty.f(toObject(this), P, {set: aFunction(setter), enumerable: true, configurable: true});
  }
});

/***/ }),
/* 294 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var $export                  = __webpack_require__(0)
  , toObject                 = __webpack_require__(9)
  , toPrimitive              = __webpack_require__(23)
  , getPrototypeOf           = __webpack_require__(18)
  , getOwnPropertyDescriptor = __webpack_require__(17).f;

// B.2.2.4 Object.prototype.__lookupGetter__(P)
__webpack_require__(7) && $export($export.P + __webpack_require__(64), 'Object', {
  __lookupGetter__: function __lookupGetter__(P){
    var O = toObject(this)
      , K = toPrimitive(P, true)
      , D;
    do {
      if(D = getOwnPropertyDescriptor(O, K))return D.get;
    } while(O = getPrototypeOf(O));
  }
});

/***/ }),
/* 295 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var $export                  = __webpack_require__(0)
  , toObject                 = __webpack_require__(9)
  , toPrimitive              = __webpack_require__(23)
  , getPrototypeOf           = __webpack_require__(18)
  , getOwnPropertyDescriptor = __webpack_require__(17).f;

// B.2.2.5 Object.prototype.__lookupSetter__(P)
__webpack_require__(7) && $export($export.P + __webpack_require__(64), 'Object', {
  __lookupSetter__: function __lookupSetter__(P){
    var O = toObject(this)
      , K = toPrimitive(P, true)
      , D;
    do {
      if(D = getOwnPropertyDescriptor(O, K))return D.set;
    } while(O = getPrototypeOf(O));
  }
});

/***/ }),
/* 296 */
/***/ (function(module, exports, __webpack_require__) {

// https://github.com/DavidBruant/Map-Set.prototype.toJSON
var $export  = __webpack_require__(0);

$export($export.P + $export.R, 'Map', {toJSON: __webpack_require__(127)('Map')});

/***/ }),
/* 297 */
/***/ (function(module, exports, __webpack_require__) {

// https://github.com/DavidBruant/Map-Set.prototype.toJSON
var $export  = __webpack_require__(0);

$export($export.P + $export.R, 'Set', {toJSON: __webpack_require__(127)('Set')});

/***/ }),
/* 298 */
/***/ (function(module, exports, __webpack_require__) {

// https://github.com/ljharb/proposal-global
var $export = __webpack_require__(0);

$export($export.S, 'System', {global: __webpack_require__(2)});

/***/ }),
/* 299 */
/***/ (function(module, exports, __webpack_require__) {

// https://github.com/ljharb/proposal-is-error
var $export = __webpack_require__(0)
  , cof     = __webpack_require__(20);

$export($export.S, 'Error', {
  isError: function isError(it){
    return cof(it) === 'Error';
  }
});

/***/ }),
/* 300 */
/***/ (function(module, exports, __webpack_require__) {

// https://gist.github.com/BrendanEich/4294d5c212a6d2254703
var $export = __webpack_require__(0);

$export($export.S, 'Math', {
  iaddh: function iaddh(x0, x1, y0, y1){
    var $x0 = x0 >>> 0
      , $x1 = x1 >>> 0
      , $y0 = y0 >>> 0;
    return $x1 + (y1 >>> 0) + (($x0 & $y0 | ($x0 | $y0) & ~($x0 + $y0 >>> 0)) >>> 31) | 0;
  }
});

/***/ }),
/* 301 */
/***/ (function(module, exports, __webpack_require__) {

// https://gist.github.com/BrendanEich/4294d5c212a6d2254703
var $export = __webpack_require__(0);

$export($export.S, 'Math', {
  isubh: function isubh(x0, x1, y0, y1){
    var $x0 = x0 >>> 0
      , $x1 = x1 >>> 0
      , $y0 = y0 >>> 0;
    return $x1 - (y1 >>> 0) - ((~$x0 & $y0 | ~($x0 ^ $y0) & $x0 - $y0 >>> 0) >>> 31) | 0;
  }
});

/***/ }),
/* 302 */
/***/ (function(module, exports, __webpack_require__) {

// https://gist.github.com/BrendanEich/4294d5c212a6d2254703
var $export = __webpack_require__(0);

$export($export.S, 'Math', {
  imulh: function imulh(u, v){
    var UINT16 = 0xffff
      , $u = +u
      , $v = +v
      , u0 = $u & UINT16
      , v0 = $v & UINT16
      , u1 = $u >> 16
      , v1 = $v >> 16
      , t  = (u1 * v0 >>> 0) + (u0 * v0 >>> 16);
    return u1 * v1 + (t >> 16) + ((u0 * v1 >>> 0) + (t & UINT16) >> 16);
  }
});

/***/ }),
/* 303 */
/***/ (function(module, exports, __webpack_require__) {

// https://gist.github.com/BrendanEich/4294d5c212a6d2254703
var $export = __webpack_require__(0);

$export($export.S, 'Math', {
  umulh: function umulh(u, v){
    var UINT16 = 0xffff
      , $u = +u
      , $v = +v
      , u0 = $u & UINT16
      , v0 = $v & UINT16
      , u1 = $u >>> 16
      , v1 = $v >>> 16
      , t  = (u1 * v0 >>> 0) + (u0 * v0 >>> 16);
    return u1 * v1 + (t >>> 16) + ((u0 * v1 >>> 0) + (t & UINT16) >>> 16);
  }
});

/***/ }),
/* 304 */
/***/ (function(module, exports, __webpack_require__) {

var metadata                  = __webpack_require__(30)
  , anObject                  = __webpack_require__(1)
  , toMetaKey                 = metadata.key
  , ordinaryDefineOwnMetadata = metadata.set;

metadata.exp({defineMetadata: function defineMetadata(metadataKey, metadataValue, target, targetKey){
  ordinaryDefineOwnMetadata(metadataKey, metadataValue, anObject(target), toMetaKey(targetKey));
}});

/***/ }),
/* 305 */
/***/ (function(module, exports, __webpack_require__) {

var metadata               = __webpack_require__(30)
  , anObject               = __webpack_require__(1)
  , toMetaKey              = metadata.key
  , getOrCreateMetadataMap = metadata.map
  , store                  = metadata.store;

metadata.exp({deleteMetadata: function deleteMetadata(metadataKey, target /*, targetKey */){
  var targetKey   = arguments.length < 3 ? undefined : toMetaKey(arguments[2])
    , metadataMap = getOrCreateMetadataMap(anObject(target), targetKey, false);
  if(metadataMap === undefined || !metadataMap['delete'](metadataKey))return false;
  if(metadataMap.size)return true;
  var targetMetadata = store.get(target);
  targetMetadata['delete'](targetKey);
  return !!targetMetadata.size || store['delete'](target);
}});

/***/ }),
/* 306 */
/***/ (function(module, exports, __webpack_require__) {

var metadata               = __webpack_require__(30)
  , anObject               = __webpack_require__(1)
  , getPrototypeOf         = __webpack_require__(18)
  , ordinaryHasOwnMetadata = metadata.has
  , ordinaryGetOwnMetadata = metadata.get
  , toMetaKey              = metadata.key;

var ordinaryGetMetadata = function(MetadataKey, O, P){
  var hasOwn = ordinaryHasOwnMetadata(MetadataKey, O, P);
  if(hasOwn)return ordinaryGetOwnMetadata(MetadataKey, O, P);
  var parent = getPrototypeOf(O);
  return parent !== null ? ordinaryGetMetadata(MetadataKey, parent, P) : undefined;
};

metadata.exp({getMetadata: function getMetadata(metadataKey, target /*, targetKey */){
  return ordinaryGetMetadata(metadataKey, anObject(target), arguments.length < 3 ? undefined : toMetaKey(arguments[2]));
}});

/***/ }),
/* 307 */
/***/ (function(module, exports, __webpack_require__) {

var Set                     = __webpack_require__(122)
  , from                    = __webpack_require__(128)
  , metadata                = __webpack_require__(30)
  , anObject                = __webpack_require__(1)
  , getPrototypeOf          = __webpack_require__(18)
  , ordinaryOwnMetadataKeys = metadata.keys
  , toMetaKey               = metadata.key;

var ordinaryMetadataKeys = function(O, P){
  var oKeys  = ordinaryOwnMetadataKeys(O, P)
    , parent = getPrototypeOf(O);
  if(parent === null)return oKeys;
  var pKeys  = ordinaryMetadataKeys(parent, P);
  return pKeys.length ? oKeys.length ? from(new Set(oKeys.concat(pKeys))) : pKeys : oKeys;
};

metadata.exp({getMetadataKeys: function getMetadataKeys(target /*, targetKey */){
  return ordinaryMetadataKeys(anObject(target), arguments.length < 2 ? undefined : toMetaKey(arguments[1]));
}});

/***/ }),
/* 308 */
/***/ (function(module, exports, __webpack_require__) {

var metadata               = __webpack_require__(30)
  , anObject               = __webpack_require__(1)
  , ordinaryGetOwnMetadata = metadata.get
  , toMetaKey              = metadata.key;

metadata.exp({getOwnMetadata: function getOwnMetadata(metadataKey, target /*, targetKey */){
  return ordinaryGetOwnMetadata(metadataKey, anObject(target)
    , arguments.length < 3 ? undefined : toMetaKey(arguments[2]));
}});

/***/ }),
/* 309 */
/***/ (function(module, exports, __webpack_require__) {

var metadata                = __webpack_require__(30)
  , anObject                = __webpack_require__(1)
  , ordinaryOwnMetadataKeys = metadata.keys
  , toMetaKey               = metadata.key;

metadata.exp({getOwnMetadataKeys: function getOwnMetadataKeys(target /*, targetKey */){
  return ordinaryOwnMetadataKeys(anObject(target), arguments.length < 2 ? undefined : toMetaKey(arguments[1]));
}});

/***/ }),
/* 310 */
/***/ (function(module, exports, __webpack_require__) {

var metadata               = __webpack_require__(30)
  , anObject               = __webpack_require__(1)
  , getPrototypeOf         = __webpack_require__(18)
  , ordinaryHasOwnMetadata = metadata.has
  , toMetaKey              = metadata.key;

var ordinaryHasMetadata = function(MetadataKey, O, P){
  var hasOwn = ordinaryHasOwnMetadata(MetadataKey, O, P);
  if(hasOwn)return true;
  var parent = getPrototypeOf(O);
  return parent !== null ? ordinaryHasMetadata(MetadataKey, parent, P) : false;
};

metadata.exp({hasMetadata: function hasMetadata(metadataKey, target /*, targetKey */){
  return ordinaryHasMetadata(metadataKey, anObject(target), arguments.length < 3 ? undefined : toMetaKey(arguments[2]));
}});

/***/ }),
/* 311 */
/***/ (function(module, exports, __webpack_require__) {

var metadata               = __webpack_require__(30)
  , anObject               = __webpack_require__(1)
  , ordinaryHasOwnMetadata = metadata.has
  , toMetaKey              = metadata.key;

metadata.exp({hasOwnMetadata: function hasOwnMetadata(metadataKey, target /*, targetKey */){
  return ordinaryHasOwnMetadata(metadataKey, anObject(target)
    , arguments.length < 3 ? undefined : toMetaKey(arguments[2]));
}});

/***/ }),
/* 312 */
/***/ (function(module, exports, __webpack_require__) {

var metadata                  = __webpack_require__(30)
  , anObject                  = __webpack_require__(1)
  , aFunction                 = __webpack_require__(13)
  , toMetaKey                 = metadata.key
  , ordinaryDefineOwnMetadata = metadata.set;

metadata.exp({metadata: function metadata(metadataKey, metadataValue){
  return function decorator(target, targetKey){
    ordinaryDefineOwnMetadata(
      metadataKey, metadataValue,
      (targetKey !== undefined ? anObject : aFunction)(target),
      toMetaKey(targetKey)
    );
  };
}});

/***/ }),
/* 313 */
/***/ (function(module, exports, __webpack_require__) {

// https://github.com/rwaldron/tc39-notes/blob/master/es6/2014-09/sept-25.md#510-globalasap-for-enqueuing-a-microtask
var $export   = __webpack_require__(0)
  , microtask = __webpack_require__(94)()
  , process   = __webpack_require__(2).process
  , isNode    = __webpack_require__(20)(process) == 'process';

$export($export.G, {
  asap: function asap(fn){
    var domain = isNode && process.domain;
    microtask(domain ? domain.bind(fn) : fn);
  }
});

/***/ }),
/* 314 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

// https://github.com/zenparsing/es-observable
var $export     = __webpack_require__(0)
  , global      = __webpack_require__(2)
  , core        = __webpack_require__(14)
  , microtask   = __webpack_require__(94)()
  , OBSERVABLE  = __webpack_require__(5)('observable')
  , aFunction   = __webpack_require__(13)
  , anObject    = __webpack_require__(1)
  , anInstance  = __webpack_require__(42)
  , redefineAll = __webpack_require__(44)
  , hide        = __webpack_require__(15)
  , forOf       = __webpack_require__(43)
  , RETURN      = forOf.RETURN;

var getMethod = function(fn){
  return fn == null ? undefined : aFunction(fn);
};

var cleanupSubscription = function(subscription){
  var cleanup = subscription._c;
  if(cleanup){
    subscription._c = undefined;
    cleanup();
  }
};

var subscriptionClosed = function(subscription){
  return subscription._o === undefined;
};

var closeSubscription = function(subscription){
  if(!subscriptionClosed(subscription)){
    subscription._o = undefined;
    cleanupSubscription(subscription);
  }
};

var Subscription = function(observer, subscriber){
  anObject(observer);
  this._c = undefined;
  this._o = observer;
  observer = new SubscriptionObserver(this);
  try {
    var cleanup      = subscriber(observer)
      , subscription = cleanup;
    if(cleanup != null){
      if(typeof cleanup.unsubscribe === 'function')cleanup = function(){ subscription.unsubscribe(); };
      else aFunction(cleanup);
      this._c = cleanup;
    }
  } catch(e){
    observer.error(e);
    return;
  } if(subscriptionClosed(this))cleanupSubscription(this);
};

Subscription.prototype = redefineAll({}, {
  unsubscribe: function unsubscribe(){ closeSubscription(this); }
});

var SubscriptionObserver = function(subscription){
  this._s = subscription;
};

SubscriptionObserver.prototype = redefineAll({}, {
  next: function next(value){
    var subscription = this._s;
    if(!subscriptionClosed(subscription)){
      var observer = subscription._o;
      try {
        var m = getMethod(observer.next);
        if(m)return m.call(observer, value);
      } catch(e){
        try {
          closeSubscription(subscription);
        } finally {
          throw e;
        }
      }
    }
  },
  error: function error(value){
    var subscription = this._s;
    if(subscriptionClosed(subscription))throw value;
    var observer = subscription._o;
    subscription._o = undefined;
    try {
      var m = getMethod(observer.error);
      if(!m)throw value;
      value = m.call(observer, value);
    } catch(e){
      try {
        cleanupSubscription(subscription);
      } finally {
        throw e;
      }
    } cleanupSubscription(subscription);
    return value;
  },
  complete: function complete(value){
    var subscription = this._s;
    if(!subscriptionClosed(subscription)){
      var observer = subscription._o;
      subscription._o = undefined;
      try {
        var m = getMethod(observer.complete);
        value = m ? m.call(observer, value) : undefined;
      } catch(e){
        try {
          cleanupSubscription(subscription);
        } finally {
          throw e;
        }
      } cleanupSubscription(subscription);
      return value;
    }
  }
});

var $Observable = function Observable(subscriber){
  anInstance(this, $Observable, 'Observable', '_f')._f = aFunction(subscriber);
};

redefineAll($Observable.prototype, {
  subscribe: function subscribe(observer){
    return new Subscription(observer, this._f);
  },
  forEach: function forEach(fn){
    var that = this;
    return new (core.Promise || global.Promise)(function(resolve, reject){
      aFunction(fn);
      var subscription = that.subscribe({
        next : function(value){
          try {
            return fn(value);
          } catch(e){
            reject(e);
            subscription.unsubscribe();
          }
        },
        error: reject,
        complete: resolve
      });
    });
  }
});

redefineAll($Observable, {
  from: function from(x){
    var C = typeof this === 'function' ? this : $Observable;
    var method = getMethod(anObject(x)[OBSERVABLE]);
    if(method){
      var observable = anObject(method.call(x));
      return observable.constructor === C ? observable : new C(function(observer){
        return observable.subscribe(observer);
      });
    }
    return new C(function(observer){
      var done = false;
      microtask(function(){
        if(!done){
          try {
            if(forOf(x, false, function(it){
              observer.next(it);
              if(done)return RETURN;
            }) === RETURN)return;
          } catch(e){
            if(done)throw e;
            observer.error(e);
            return;
          } observer.complete();
        }
      });
      return function(){ done = true; };
    });
  },
  of: function of(){
    for(var i = 0, l = arguments.length, items = Array(l); i < l;)items[i] = arguments[i++];
    return new (typeof this === 'function' ? this : $Observable)(function(observer){
      var done = false;
      microtask(function(){
        if(!done){
          for(var i = 0; i < items.length; ++i){
            observer.next(items[i]);
            if(done)return;
          } observer.complete();
        }
      });
      return function(){ done = true; };
    });
  }
});

hide($Observable.prototype, OBSERVABLE, function(){ return this; });

$export($export.G, {Observable: $Observable});

__webpack_require__(41)('Observable');

/***/ }),
/* 315 */
/***/ (function(module, exports, __webpack_require__) {

// ie9- setTimeout & setInterval additional parameters fix
var global     = __webpack_require__(2)
  , $export    = __webpack_require__(0)
  , invoke     = __webpack_require__(55)
  , partial    = __webpack_require__(97)
  , navigator  = global.navigator
  , MSIE       = !!navigator && /MSIE .\./.test(navigator.userAgent); // <- dirty ie9- check
var wrap = function(set){
  return MSIE ? function(fn, time /*, ...args */){
    return set(invoke(
      partial,
      [].slice.call(arguments, 2),
      typeof fn == 'function' ? fn : Function(fn)
    ), time);
  } : set;
};
$export($export.G + $export.B + $export.F * MSIE, {
  setTimeout:  wrap(global.setTimeout),
  setInterval: wrap(global.setInterval)
});

/***/ }),
/* 316 */
/***/ (function(module, exports, __webpack_require__) {

var $export = __webpack_require__(0)
  , $task   = __webpack_require__(93);
$export($export.G + $export.B, {
  setImmediate:   $task.set,
  clearImmediate: $task.clear
});

/***/ }),
/* 317 */
/***/ (function(module, exports, __webpack_require__) {

var $iterators    = __webpack_require__(90)
  , redefine      = __webpack_require__(16)
  , global        = __webpack_require__(2)
  , hide          = __webpack_require__(15)
  , Iterators     = __webpack_require__(40)
  , wks           = __webpack_require__(5)
  , ITERATOR      = wks('iterator')
  , TO_STRING_TAG = wks('toStringTag')
  , ArrayValues   = Iterators.Array;

for(var collections = ['NodeList', 'DOMTokenList', 'MediaList', 'StyleSheetList', 'CSSRuleList'], i = 0; i < 5; i++){
  var NAME       = collections[i]
    , Collection = global[NAME]
    , proto      = Collection && Collection.prototype
    , key;
  if(proto){
    if(!proto[ITERATOR])hide(proto, ITERATOR, ArrayValues);
    if(!proto[TO_STRING_TAG])hide(proto, TO_STRING_TAG, NAME);
    Iterators[NAME] = ArrayValues;
    for(key in $iterators)if(!proto[key])redefine(proto, key, $iterators[key], true);
  }
}

/***/ }),
/* 318 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var ctx            = __webpack_require__(24)
  , $export        = __webpack_require__(0)
  , createDesc     = __webpack_require__(27)
  , assign         = __webpack_require__(77)
  , create         = __webpack_require__(28)
  , getPrototypeOf = __webpack_require__(18)
  , getKeys        = __webpack_require__(32)
  , dP             = __webpack_require__(6)
  , keyOf          = __webpack_require__(105)
  , aFunction      = __webpack_require__(13)
  , forOf          = __webpack_require__(43)
  , isIterable     = __webpack_require__(130)
  , $iterCreate    = __webpack_require__(57)
  , step           = __webpack_require__(91)
  , isObject       = __webpack_require__(4)
  , toIObject      = __webpack_require__(12)
  , DESCRIPTORS    = __webpack_require__(7)
  , has            = __webpack_require__(11);

// 0 -> Dict.forEach
// 1 -> Dict.map
// 2 -> Dict.filter
// 3 -> Dict.some
// 4 -> Dict.every
// 5 -> Dict.find
// 6 -> Dict.findKey
// 7 -> Dict.mapPairs
var createDictMethod = function(TYPE){
  var IS_MAP   = TYPE == 1
    , IS_EVERY = TYPE == 4;
  return function(object, callbackfn, that /* = undefined */){
    var f      = ctx(callbackfn, that, 3)
      , O      = toIObject(object)
      , result = IS_MAP || TYPE == 7 || TYPE == 2
          ? new (typeof this == 'function' ? this : Dict) : undefined
      , key, val, res;
    for(key in O)if(has(O, key)){
      val = O[key];
      res = f(val, key, object);
      if(TYPE){
        if(IS_MAP)result[key] = res;            // map
        else if(res)switch(TYPE){
          case 2: result[key] = val; break;     // filter
          case 3: return true;                  // some
          case 5: return val;                   // find
          case 6: return key;                   // findKey
          case 7: result[res[0]] = res[1];      // mapPairs
        } else if(IS_EVERY)return false;        // every
      }
    }
    return TYPE == 3 || IS_EVERY ? IS_EVERY : result;
  };
};
var findKey = createDictMethod(6);

var createDictIter = function(kind){
  return function(it){
    return new DictIterator(it, kind);
  };
};
var DictIterator = function(iterated, kind){
  this._t = toIObject(iterated); // target
  this._a = getKeys(iterated);   // keys
  this._i = 0;                   // next index
  this._k = kind;                // kind
};
$iterCreate(DictIterator, 'Dict', function(){
  var that = this
    , O    = that._t
    , keys = that._a
    , kind = that._k
    , key;
  do {
    if(that._i >= keys.length){
      that._t = undefined;
      return step(1);
    }
  } while(!has(O, key = keys[that._i++]));
  if(kind == 'keys'  )return step(0, key);
  if(kind == 'values')return step(0, O[key]);
  return step(0, [key, O[key]]);
});

function Dict(iterable){
  var dict = create(null);
  if(iterable != undefined){
    if(isIterable(iterable)){
      forOf(iterable, true, function(key, value){
        dict[key] = value;
      });
    } else assign(dict, iterable);
  }
  return dict;
}
Dict.prototype = null;

function reduce(object, mapfn, init){
  aFunction(mapfn);
  var O      = toIObject(object)
    , keys   = getKeys(O)
    , length = keys.length
    , i      = 0
    , memo, key;
  if(arguments.length < 3){
    if(!length)throw TypeError('Reduce of empty object with no initial value');
    memo = O[keys[i++]];
  } else memo = Object(init);
  while(length > i)if(has(O, key = keys[i++])){
    memo = mapfn(memo, O[key], key, object);
  }
  return memo;
}

function includes(object, el){
  return (el == el ? keyOf(object, el) : findKey(object, function(it){
    return it != it;
  })) !== undefined;
}

function get(object, key){
  if(has(object, key))return object[key];
}
function set(object, key, value){
  if(DESCRIPTORS && key in Object)dP.f(object, key, createDesc(0, value));
  else object[key] = value;
  return object;
}

function isDict(it){
  return isObject(it) && getPrototypeOf(it) === Dict.prototype;
}

$export($export.G + $export.F, {Dict: Dict});

$export($export.S, 'Dict', {
  keys:     createDictIter('keys'),
  values:   createDictIter('values'),
  entries:  createDictIter('entries'),
  forEach:  createDictMethod(0),
  map:      createDictMethod(1),
  filter:   createDictMethod(2),
  some:     createDictMethod(3),
  every:    createDictMethod(4),
  find:     createDictMethod(5),
  findKey:  findKey,
  mapPairs: createDictMethod(7),
  reduce:   reduce,
  keyOf:    keyOf,
  includes: includes,
  has:      has,
  get:      get,
  set:      set,
  isDict:   isDict
});

/***/ }),
/* 319 */
/***/ (function(module, exports, __webpack_require__) {

var anObject = __webpack_require__(1)
  , get      = __webpack_require__(50);
module.exports = __webpack_require__(14).getIterator = function(it){
  var iterFn = get(it);
  if(typeof iterFn != 'function')throw TypeError(it + ' is not iterable!');
  return anObject(iterFn.call(it));
};

/***/ }),
/* 320 */
/***/ (function(module, exports, __webpack_require__) {

var global  = __webpack_require__(2)
  , core    = __webpack_require__(14)
  , $export = __webpack_require__(0)
  , partial = __webpack_require__(97);
// https://esdiscuss.org/topic/promise-returning-delay-function
$export($export.G + $export.F, {
  delay: function delay(time){
    return new (core.Promise || global.Promise)(function(resolve){
      setTimeout(partial.call(resolve, true), time);
    });
  }
});

/***/ }),
/* 321 */
/***/ (function(module, exports, __webpack_require__) {

var path    = __webpack_require__(129)
  , $export = __webpack_require__(0);

// Placeholder
__webpack_require__(14)._ = path._ = path._ || {};

$export($export.P + $export.F, 'Function', {part: __webpack_require__(97)});

/***/ }),
/* 322 */
/***/ (function(module, exports, __webpack_require__) {

var $export = __webpack_require__(0);

$export($export.S + $export.F, 'Object', {isObject: __webpack_require__(4)});

/***/ }),
/* 323 */
/***/ (function(module, exports, __webpack_require__) {

var $export = __webpack_require__(0);

$export($export.S + $export.F, 'Object', {classof: __webpack_require__(39)});

/***/ }),
/* 324 */
/***/ (function(module, exports, __webpack_require__) {

var $export = __webpack_require__(0)
  , define  = __webpack_require__(131);

$export($export.S + $export.F, 'Object', {define: define});

/***/ }),
/* 325 */
/***/ (function(module, exports, __webpack_require__) {

var $export = __webpack_require__(0)
  , define  = __webpack_require__(131)
  , create  = __webpack_require__(28);

$export($export.S + $export.F, 'Object', {
  make: function(proto, mixin){
    return define(create(proto), mixin);
  }
});

/***/ }),
/* 326 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

__webpack_require__(56)(Number, 'Number', function(iterated){
  this._l = +iterated;
  this._i = 0;
}, function(){
  var i    = this._i++
    , done = !(i < this._l);
  return {done: done, value: done ? undefined : i};
});

/***/ }),
/* 327 */
/***/ (function(module, exports, __webpack_require__) {

// https://github.com/benjamingr/RexExp.escape
var $export = __webpack_require__(0)
  , $re     = __webpack_require__(98)(/[\\^$*+?.()|[\]{}]/g, '\\$&');

$export($export.S, 'RegExp', {escape: function escape(it){ return $re(it); }});


/***/ }),
/* 328 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var $export = __webpack_require__(0);
var $re = __webpack_require__(98)(/[&<>"']/g, {
  '&': '&amp;',
  '<': '&lt;',
  '>': '&gt;',
  '"': '&quot;',
  "'": '&apos;'
});

$export($export.P + $export.F, 'String', {escapeHTML: function escapeHTML(){ return $re(this); }});

/***/ }),
/* 329 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var $export = __webpack_require__(0);
var $re = __webpack_require__(98)(/&(?:amp|lt|gt|quot|apos);/g, {
  '&amp;':  '&',
  '&lt;':   '<',
  '&gt;':   '>',
  '&quot;': '"',
  '&apos;': "'"
});

$export($export.P + $export.F, 'String', {unescapeHTML:  function unescapeHTML(){ return $re(this); }});

/***/ }),
/* 330 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var FDBFactory_1 = __webpack_require__(331);
var fakeIndexedDB = new FDBFactory_1.default();
exports.default = fakeIndexedDB;


/***/ }),
/* 331 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(setImmediate) {
var __values = (this && this.__values) || function (o) {
    var m = typeof Symbol === "function" && o[Symbol.iterator], i = 0;
    if (m) return m.call(o);
    return {
        next: function () {
            if (o && i >= o.length) o = void 0;
            return { value: o && o[i++], done: !o };
        }
    };
};
Object.defineProperty(exports, "__esModule", { value: true });
__webpack_require__(132);
var FDBDatabase_1 = __webpack_require__(332);
var FDBOpenDBRequest_1 = __webpack_require__(347);
var FDBVersionChangeEvent_1 = __webpack_require__(348);
var cmp_1 = __webpack_require__(66);
var Database_1 = __webpack_require__(349);
var enforceRange_1 = __webpack_require__(101);
var errors_1 = __webpack_require__(10);
var FakeEvent_1 = __webpack_require__(102);
var waitForOthersClosedDelete = function (databases, name, openDatabases, cb) {
    var anyOpen = openDatabases.some(function (openDatabase) {
        return !openDatabase._closed;
    });
    if (anyOpen) {
        setImmediate(function () { return waitForOthersClosedDelete(databases, name, openDatabases, cb); });
        return;
    }
    databases.delete(name);
    cb(null);
};
// http://www.w3.org/TR/2015/REC-IndexedDB-20150108/#dfn-steps-for-deleting-a-database
var deleteDatabase = function (databases, name, request, cb) {
    try {
        var db = databases.get(name);
        if (db === undefined) {
            cb(null);
            return;
        }
        db.deletePending = true;
        var openDatabases = db.connections.filter(function (connection) {
            return !connection._closed;
        });
        try {
            for (var openDatabases_1 = __values(openDatabases), openDatabases_1_1 = openDatabases_1.next(); !openDatabases_1_1.done; openDatabases_1_1 = openDatabases_1.next()) {
                var openDatabase_1 = openDatabases_1_1.value;
                if (!openDatabase_1._closePending) {
                    var event_1 = new FDBVersionChangeEvent_1.default("versionchange", {
                        newVersion: null,
                        oldVersion: db.version,
                    });
                    openDatabase_1.dispatchEvent(event_1);
                }
            }
        }
        catch (e_1_1) { e_1 = { error: e_1_1 }; }
        finally {
            try {
                if (openDatabases_1_1 && !openDatabases_1_1.done && (_a = openDatabases_1.return)) _a.call(openDatabases_1);
            }
            finally { if (e_1) throw e_1.error; }
        }
        var anyOpen = openDatabases.some(function (openDatabase) {
            return !openDatabase._closed;
        });
        if (request && anyOpen) {
            var event_2 = new FDBVersionChangeEvent_1.default("blocked", {
                newVersion: null,
                oldVersion: db.version,
            });
            request.dispatchEvent(event_2);
        }
        waitForOthersClosedDelete(databases, name, openDatabases, cb);
    }
    catch (err) {
        cb(err);
    }
    var e_1, _a;
};
// http://www.w3.org/TR/2015/REC-IndexedDB-20150108/#dfn-steps-for-running-a-versionchange-transaction
var runVersionchangeTransaction = function (connection, version, request, cb) {
    connection._runningVersionchangeTransaction = true;
    var oldVersion = connection.version;
    var openDatabases = connection._rawDatabase.connections.filter(function (otherDatabase) {
        return connection !== otherDatabase;
    });
    try {
        for (var openDatabases_2 = __values(openDatabases), openDatabases_2_1 = openDatabases_2.next(); !openDatabases_2_1.done; openDatabases_2_1 = openDatabases_2.next()) {
            var openDatabase_2 = openDatabases_2_1.value;
            if (!openDatabase_2._closed) {
                var event_3 = new FDBVersionChangeEvent_1.default("versionchange", {
                    oldVersion: oldVersion,
                    newVersion: version,
                });
                openDatabase_2.dispatchEvent(event_3);
            }
        }
    }
    catch (e_2_1) { e_2 = { error: e_2_1 }; }
    finally {
        try {
            if (openDatabases_2_1 && !openDatabases_2_1.done && (_a = openDatabases_2.return)) _a.call(openDatabases_2);
        }
        finally { if (e_2) throw e_2.error; }
    }
    var anyOpen = openDatabases.some(function (openDatabase) {
        return !openDatabase._closed;
    });
    if (anyOpen) {
        var event_4 = new FDBVersionChangeEvent_1.default("blocked", {
            newVersion: version,
            oldVersion: oldVersion,
        });
        request.dispatchEvent(event_4);
    }
    var waitForOthersClosed = function () {
        var anyOpen2 = openDatabases.some(function (openDatabase) {
            return !openDatabase._closed;
        });
        if (anyOpen2) {
            setImmediate(waitForOthersClosed);
            return;
        }
        // Set the version of database to version. This change is considered part of the transaction, and so if the
        // transaction is aborted, this change is reverted.
        connection._rawDatabase.version = version;
        connection.version = version;
        // Get rid of this setImmediate?
        var transaction = connection.transaction(connection.objectStoreNames, "versionchange");
        request.result = connection;
        request.readyState = "done";
        request.transaction = transaction;
        transaction._rollbackLog.push(function () {
            connection._rawDatabase.version = oldVersion;
            connection.version = oldVersion;
        });
        var event = new FDBVersionChangeEvent_1.default("upgradeneeded", {
            newVersion: version,
            oldVersion: oldVersion,
        });
        request.dispatchEvent(event);
        transaction.addEventListener("error", function () {
            connection._runningVersionchangeTransaction = false;
            // throw arguments[0].target.error;
            // console.log("error in versionchange transaction - not sure if anything needs to be done here", e.target.error.name);
        });
        transaction.addEventListener("abort", function () {
            connection._runningVersionchangeTransaction = false;
            request.transaction = null;
            setImmediate(function () {
                cb(new errors_1.AbortError());
            });
        });
        transaction.addEventListener("complete", function () {
            connection._runningVersionchangeTransaction = false;
            request.transaction = null;
            // Let other complete event handlers run before continuing
            setImmediate(function () {
                if (connection._closePending) {
                    cb(new errors_1.AbortError());
                }
                else {
                    cb(null);
                }
            });
        });
    };
    waitForOthersClosed();
    var e_2, _a;
};
// http://www.w3.org/TR/2015/REC-IndexedDB-20150108/#dfn-steps-for-opening-a-database
var openDatabase = function (databases, name, version, request, cb) {
    var db = databases.get(name);
    if (db === undefined) {
        db = new Database_1.default(name, 0);
        databases.set(name, db);
    }
    if (version === undefined) {
        version = db.version !== 0 ? db.version : 1;
    }
    if (db.version > version) {
        return cb(new errors_1.VersionError());
    }
    var connection = new FDBDatabase_1.default(db);
    if (db.version < version) {
        runVersionchangeTransaction(connection, version, request, function (err) {
            if (err) {
                // DO THIS HERE: ensure that connection is closed by running the steps for closing a database connection before these
                // steps are aborted.
                return cb(err);
            }
            cb(null, connection);
        });
    }
    else {
        cb(null, connection);
    }
};
var FDBFactory = (function () {
    function FDBFactory() {
        this.cmp = cmp_1.default;
        this._databases = new Map();
    }
    // http://www.w3.org/TR/2015/REC-IndexedDB-20150108/#widl-IDBFactory-deleteDatabase-IDBOpenDBRequest-DOMString-name
    FDBFactory.prototype.deleteDatabase = function (name) {
        var _this = this;
        var request = new FDBOpenDBRequest_1.default();
        request.source = null;
        setImmediate(function () {
            var db = _this._databases.get(name);
            var oldVersion = db !== undefined ? db.version : 0;
            deleteDatabase(_this._databases, name, request, function (err) {
                if (err) {
                    request.error = new Error();
                    request.error.name = err.name;
                    request.readyState = "done";
                    var event_5 = new FakeEvent_1.default("error", {
                        bubbles: true,
                        cancelable: true,
                    });
                    event_5.eventPath = [];
                    request.dispatchEvent(event_5);
                    return;
                }
                request.result = undefined;
                request.readyState = "done";
                var event = new FDBVersionChangeEvent_1.default("success", {
                    newVersion: null,
                    oldVersion: oldVersion,
                });
                request.dispatchEvent(event);
            });
        });
        return request;
    };
    // tslint:disable-next-line max-line-length
    // http://www.w3.org/TR/2015/REC-IndexedDB-20150108/#widl-IDBFactory-open-IDBOpenDBRequest-DOMString-name-unsigned-long-long-version
    FDBFactory.prototype.open = function (name, version) {
        var _this = this;
        if (arguments.length > 1 && version !== undefined) {
            // Based on spec, not sure why "MAX_SAFE_INTEGER" instead of "unsigned long long", but it's needed to pass
            // tests
            version = enforceRange_1.default(version, "MAX_SAFE_INTEGER");
        }
        if (version === 0) {
            throw new TypeError();
        }
        var request = new FDBOpenDBRequest_1.default();
        request.source = null;
        setImmediate(function () {
            openDatabase(_this._databases, name, version, request, function (err, connection) {
                if (err) {
                    request.result = undefined;
                    request.readyState = "done";
                    request.error = new Error();
                    request.error.name = err.name;
                    var event_6 = new FakeEvent_1.default("error", {
                        bubbles: true,
                        cancelable: true,
                    });
                    event_6.eventPath = [];
                    request.dispatchEvent(event_6);
                    return;
                }
                request.result = connection;
                request.readyState = "done";
                var event = new FakeEvent_1.default("success");
                event.eventPath = [];
                request.dispatchEvent(event);
            });
        });
        return request;
    };
    FDBFactory.prototype.toString = function () {
        return "[object IDBFactory]";
    };
    return FDBFactory;
}());
exports.default = FDBFactory;

/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(65).setImmediate))

/***/ }),
/* 332 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(setImmediate) {
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __values = (this && this.__values) || function (o) {
    var m = typeof Symbol === "function" && o[Symbol.iterator], i = 0;
    if (m) return m.call(o);
    return {
        next: function () {
            if (o && i >= o.length) o = void 0;
            return { value: o && o[i++], done: !o };
        }
    };
};
Object.defineProperty(exports, "__esModule", { value: true });
var FDBTransaction_1 = __webpack_require__(333);
var errors_1 = __webpack_require__(10);
var fakeDOMStringList_1 = __webpack_require__(70);
var FakeEventTarget_1 = __webpack_require__(100);
var ObjectStore_1 = __webpack_require__(345);
var validateKeyPath_1 = __webpack_require__(140);
var confirmActiveVersionchangeTransaction = function (database) {
    if (!database._runningVersionchangeTransaction) {
        throw new errors_1.InvalidStateError();
    }
    // Find the latest versionchange transaction
    var transactions = database._rawDatabase.transactions.filter(function (tx) {
        return tx.mode === "versionchange";
    });
    var transaction = transactions[transactions.length - 1];
    if (!transaction || transaction._finished) {
        throw new errors_1.InvalidStateError();
    }
    if (!transaction._active) {
        throw new errors_1.TransactionInactiveError();
    }
    return transaction;
};
// http://www.w3.org/TR/2015/REC-IndexedDB-20150108/#database-closing-steps
var closeConnection = function (connection) {
    connection._closePending = true;
    var transactionsComplete = connection._rawDatabase.transactions.every(function (transaction) {
        return transaction._finished;
    });
    if (transactionsComplete) {
        connection._closed = true;
        connection._rawDatabase.connections = connection._rawDatabase.connections.filter(function (otherConnection) {
            return connection !== otherConnection;
        });
    }
    else {
        setImmediate(function () {
            closeConnection(connection);
        });
    }
};
// http://www.w3.org/TR/2015/REC-IndexedDB-20150108/#database-interface
var FDBDatabase = (function (_super) {
    __extends(FDBDatabase, _super);
    function FDBDatabase(rawDatabase) {
        var _this = _super.call(this) || this;
        _this._closePending = false;
        _this._closed = false;
        _this._runningVersionchangeTransaction = false;
        _this._rawDatabase = rawDatabase;
        _this._rawDatabase.connections.push(_this);
        _this.name = rawDatabase.name;
        _this.version = rawDatabase.version;
        _this.objectStoreNames = fakeDOMStringList_1.default(Array.from(rawDatabase.rawObjectStores.keys())).sort();
        return _this;
    }
    // http://w3c.github.io/IndexedDB/#dom-idbdatabase-createobjectstore
    FDBDatabase.prototype.createObjectStore = function (name, options) {
        var _this = this;
        if (options === void 0) { options = {}; }
        if (name === undefined) {
            throw new TypeError();
        }
        var transaction = confirmActiveVersionchangeTransaction(this);
        var keyPath = options !== null && options.keyPath !== undefined ? options.keyPath : null;
        var autoIncrement = options !== null && options.autoIncrement !== undefined ? options.autoIncrement : false;
        if (keyPath !== null) {
            validateKeyPath_1.default(keyPath);
        }
        if (this._rawDatabase.rawObjectStores.has(name)) {
            throw new errors_1.ConstraintError();
        }
        if (autoIncrement && (keyPath === "" || Array.isArray(keyPath))) {
            throw new errors_1.InvalidAccessError();
        }
        var objectStoreNames = this.objectStoreNames.slice();
        transaction._rollbackLog.push(function () {
            var objectStore = _this._rawDatabase.rawObjectStores.get(name);
            if (objectStore) {
                objectStore.deleted = true;
            }
            _this.objectStoreNames = fakeDOMStringList_1.default(objectStoreNames);
            transaction._scope.delete(name);
            _this._rawDatabase.rawObjectStores.delete(name);
        });
        var rawObjectStore = new ObjectStore_1.default(this._rawDatabase, name, keyPath, autoIncrement);
        this.objectStoreNames.push(name);
        this.objectStoreNames.sort();
        transaction._scope.add(name);
        this._rawDatabase.rawObjectStores.set(name, rawObjectStore);
        transaction.objectStoreNames = fakeDOMStringList_1.default(this.objectStoreNames.slice());
        return transaction.objectStore(name);
    };
    FDBDatabase.prototype.deleteObjectStore = function (name) {
        var _this = this;
        if (name === undefined) {
            throw new TypeError();
        }
        var transaction = confirmActiveVersionchangeTransaction(this);
        var store = this._rawDatabase.rawObjectStores.get(name);
        if (store === undefined) {
            throw new errors_1.NotFoundError();
        }
        this.objectStoreNames = fakeDOMStringList_1.default(this.objectStoreNames.filter(function (objectStoreName) {
            return objectStoreName !== name;
        }));
        transaction.objectStoreNames = fakeDOMStringList_1.default(this.objectStoreNames.slice());
        transaction._rollbackLog.push(function () {
            store.deleted = false;
            _this._rawDatabase.rawObjectStores.set(name, store);
            _this.objectStoreNames.push(name);
            _this.objectStoreNames.sort();
        });
        store.deleted = true;
        this._rawDatabase.rawObjectStores.delete(name);
        transaction._objectStoresCache.delete(name);
    };
    FDBDatabase.prototype.transaction = function (storeNames, mode) {
        mode = mode !== undefined ? mode : "readonly";
        if (mode !== "readonly" && mode !== "readwrite" && mode !== "versionchange") {
            throw new TypeError("Invalid mode: " + mode);
        }
        var hasActiveVersionchange = this._rawDatabase.transactions.some(function (transaction) {
            return transaction._active && transaction.mode === "versionchange";
        });
        if (hasActiveVersionchange) {
            throw new errors_1.InvalidStateError();
        }
        if (this._closePending) {
            throw new errors_1.InvalidStateError();
        }
        if (!Array.isArray(storeNames)) {
            storeNames = [storeNames];
        }
        if (storeNames.length === 0 && mode !== "versionchange") {
            throw new errors_1.InvalidAccessError();
        }
        try {
            for (var storeNames_1 = __values(storeNames), storeNames_1_1 = storeNames_1.next(); !storeNames_1_1.done; storeNames_1_1 = storeNames_1.next()) {
                var storeName = storeNames_1_1.value;
                if (this.objectStoreNames.indexOf(storeName) < 0) {
                    throw new errors_1.NotFoundError("No objectStore named " + storeName + " in this database");
                }
            }
        }
        catch (e_1_1) { e_1 = { error: e_1_1 }; }
        finally {
            try {
                if (storeNames_1_1 && !storeNames_1_1.done && (_a = storeNames_1.return)) _a.call(storeNames_1);
            }
            finally { if (e_1) throw e_1.error; }
        }
        var tx = new FDBTransaction_1.default(storeNames, mode, this);
        this._rawDatabase.transactions.push(tx);
        this._rawDatabase.processTransactions(); // See if can start right away (async)
        return tx;
        var e_1, _a;
    };
    FDBDatabase.prototype.close = function () {
        closeConnection(this);
    };
    FDBDatabase.prototype.toString = function () {
        return "[object IDBDatabase]";
    };
    return FDBDatabase;
}(FakeEventTarget_1.default));
exports.default = FDBDatabase;

/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(65).setImmediate))

/***/ }),
/* 333 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(setImmediate) {
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __values = (this && this.__values) || function (o) {
    var m = typeof Symbol === "function" && o[Symbol.iterator], i = 0;
    if (m) return m.call(o);
    return {
        next: function () {
            if (o && i >= o.length) o = void 0;
            return { value: o && o[i++], done: !o };
        }
    };
};
Object.defineProperty(exports, "__esModule", { value: true });
var FDBObjectStore_1 = __webpack_require__(135);
var FDBRequest_1 = __webpack_require__(69);
var errors_1 = __webpack_require__(10);
var fakeDOMStringList_1 = __webpack_require__(70);
var FakeEvent_1 = __webpack_require__(102);
var FakeEventTarget_1 = __webpack_require__(100);
// http://www.w3.org/TR/2015/REC-IndexedDB-20150108/#transaction
var FDBTransaction = (function (_super) {
    __extends(FDBTransaction, _super);
    function FDBTransaction(storeNames, mode, db) {
        var _this = _super.call(this) || this;
        _this._started = false;
        _this._active = true;
        _this._finished = false; // Set true after commit or abort
        _this._rollbackLog = [];
        _this._objectStoresCache = new Map();
        _this.error = null;
        _this.onabort = null;
        _this.oncomplete = null;
        _this.onerror = null;
        _this._requests = [];
        _this._scope = new Set(storeNames);
        _this.mode = mode;
        _this.db = db;
        _this.objectStoreNames = fakeDOMStringList_1.default(Array.from(_this._scope).sort());
        return _this;
    }
    // http://www.w3.org/TR/2015/REC-IndexedDB-20150108/#dfn-steps-for-aborting-a-transaction
    FDBTransaction.prototype._abort = function (errName) {
        var _this = this;
        try {
            for (var _a = __values(this._rollbackLog.reverse()), _b = _a.next(); !_b.done; _b = _a.next()) {
                var f = _b.value;
                f();
            }
        }
        catch (e_1_1) { e_1 = { error: e_1_1 }; }
        finally {
            try {
                if (_b && !_b.done && (_c = _a.return)) _c.call(_a);
            }
            finally { if (e_1) throw e_1.error; }
        }
        if (errName !== null) {
            var e = new Error();
            e.name = errName;
            this.error = e;
        }
        try {
            // Should this directly remove from _requests?
            for (var _d = __values(this._requests), _e = _d.next(); !_e.done; _e = _d.next()) {
                var request = _e.value.request;
                if (request.readyState !== "done") {
                    request.readyState = "done"; // This will cancel execution of this request's operation
                    if (request.source) {
                        request.result = undefined;
                        request.error = new errors_1.AbortError();
                        var event_1 = new FakeEvent_1.default("error", {
                            bubbles: true,
                            cancelable: true,
                        });
                        event_1.eventPath = [this.db, this];
                        request.dispatchEvent(event_1);
                    }
                }
            }
        }
        catch (e_2_1) { e_2 = { error: e_2_1 }; }
        finally {
            try {
                if (_e && !_e.done && (_f = _d.return)) _f.call(_d);
            }
            finally { if (e_2) throw e_2.error; }
        }
        setImmediate(function () {
            var event = new FakeEvent_1.default("abort", {
                bubbles: true,
                cancelable: false,
            });
            event.eventPath = [_this.db];
            _this.dispatchEvent(event);
        });
        this._finished = true;
        var e_1, _c, e_2, _f;
    };
    FDBTransaction.prototype.abort = function () {
        if (this._finished) {
            throw new errors_1.InvalidStateError();
        }
        this._active = false;
        this._abort(null);
    };
    // http://w3c.github.io/IndexedDB/#dom-idbtransaction-objectstore
    FDBTransaction.prototype.objectStore = function (name) {
        if (!this._active) {
            throw new errors_1.InvalidStateError();
        }
        var objectStore = this._objectStoresCache.get(name);
        if (objectStore !== undefined) {
            return objectStore;
        }
        var rawObjectStore = this.db._rawDatabase.rawObjectStores.get(name);
        if (!this._scope.has(name) || rawObjectStore === undefined) {
            throw new errors_1.NotFoundError();
        }
        var objectStore2 = new FDBObjectStore_1.default(this, rawObjectStore);
        this._objectStoresCache.set(name, objectStore2);
        return objectStore2;
    };
    // http://www.w3.org/TR/2015/REC-IndexedDB-20150108/#dfn-steps-for-asynchronously-executing-a-request
    FDBTransaction.prototype._execRequestAsync = function (obj) {
        var source = obj.source;
        var operation = obj.operation;
        var request = obj.hasOwnProperty("request") ? obj.request : null;
        if (!this._active) {
            throw new errors_1.TransactionInactiveError();
        }
        // Request should only be passed for cursors
        if (!request) {
            if (!source) {
                // Special requests like indexes that just need to run some code
                request = new FDBRequest_1.default();
            }
            else {
                request = new FDBRequest_1.default();
                request.source = source;
                request.transaction = source.transaction;
            }
        }
        this._requests.push({
            request: request,
            operation: operation,
        });
        return request;
    };
    FDBTransaction.prototype._start = function () {
        this._started = true;
        // Remove from request queue - cursor ones will be added back if necessary by cursor.continue and such
        var operation;
        var request;
        while (this._requests.length > 0) {
            var r = this._requests.shift();
            // This should only be false if transaction was aborted
            if (r && r.request.readyState !== "done") {
                request = r.request;
                operation = r.operation;
                break;
            }
        }
        if (request && operation) {
            if (!request.source) {
                // Special requests like indexes that just need to run some code, with error handling already built into
                // operation
                operation();
            }
            else {
                var defaultAction = void 0;
                var event_2;
                try {
                    var result = operation();
                    request.readyState = "done";
                    request.result = result;
                    request.error = undefined;
                    // http://www.w3.org/TR/2015/REC-IndexedDB-20150108/#dfn-fire-a-success-event
                    this._active = true;
                    event_2 = new FakeEvent_1.default("success", {
                        bubbles: false,
                        cancelable: false,
                    });
                }
                catch (err) {
                    request.readyState = "done";
                    request.result = undefined;
                    request.error = err;
                    // http://www.w3.org/TR/2015/REC-IndexedDB-20150108/#dfn-fire-an-error-event
                    this._active = true;
                    event_2 = new FakeEvent_1.default("error", {
                        bubbles: true,
                        cancelable: true,
                    });
                    defaultAction = this._abort.bind(this, err.name);
                }
                try {
                    event_2.eventPath = [this.db, this];
                    request.dispatchEvent(event_2);
                    // You're supposed to set this._active to false here, but I'm skipping that.
                    // Why? Because scheduling gets tricky when promises are involved. I know that
                    // promises and IndexedDB transactions in general are tricky
                    // https://lists.w3.org/Archives/Public/public-webapps/2015AprJun/0126.html but
                    // for some reason I still tend to do it. So this line is commented out for me,
                    // and for any other masochists who do similar things. It doesn't seem to break
                    // any tests or functionality, and in fact if I uncomment this line it does make
                    // transaction/promise interactions wonky.
                    // this._active = false;
                }
                catch (err) {
                    // console.error(err);
                    this._abort("AbortError");
                    throw err;
                }
                // Default action of event
                if (!event_2.canceled) {
                    if (defaultAction) {
                        defaultAction();
                    }
                }
            }
            // On to the next one
            if (this._requests.length > 0) {
                this._start();
            }
            else {
                // Give it another chance for new handlers to be set before finishing
                setImmediate(this._start.bind(this));
            }
            return;
        }
        // Check if transaction complete event needs to be fired
        if (!this._finished) {
            this._active = false;
            this._finished = true;
            if (!this.error) {
                var event_3 = new FakeEvent_1.default("complete");
                this.dispatchEvent(event_3);
            }
        }
    };
    FDBTransaction.prototype.toString = function () {
        return "[object IDBRequest]";
    };
    return FDBTransaction;
}(FakeEventTarget_1.default));
exports.default = FDBTransaction;

/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(65).setImmediate))

/***/ }),
/* 334 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var util = __webpack_require__(335);
var isPlainObject = __webpack_require__(338);

function DataCloneError(message) {
    this.name = this.constructor.name;
    this.message = message;
    if (Error.captureStackTrace) {
        Error.captureStackTrace(this, DataCloneError);
    }
}
util.inherits(DataCloneError, Error);

// https://html.spec.whatwg.org/multipage/infrastructure.html#structuredclone
function structuredClone(input, memory) {
    memory = memory !== undefined ? memory : new Map();

    if (memory.has(input)) {
        return memory.get(input);
    }

    var type = typeof input;
    var output;

    if (type === 'string' || type === 'number' || type === 'boolean' || type === 'undefined' || input === null) {
        return input;
    }

    if (type === 'symbol') {
        throw new DataCloneError('Value could not be cloned: ' + input.toString() + ' is a Symbol');
    }

    var deepClone = 'none';

    if (input instanceof Boolean || input instanceof Number || input instanceof String || input instanceof Date) {
        output = new input.constructor(input.valueOf());
    } else if (input instanceof RegExp) {
        output = new RegExp(input.source, input.flags);
    } else if (input instanceof ArrayBuffer) {
        output = input.slice();
    } else if (typeof ArrayBuffer !== 'undefined' && ArrayBuffer.isView && ArrayBuffer.isView(input)) {
        var outputBuffer = structuredClone(input.buffer, memory);
        if (input instanceof DataView) {
            output = new DataView(outputBuffer, input.byteOffset, input.byteLength);
        } else {
            output = new input.constructor(outputBuffer, input.byteOffset, input.length);
        }
    } else if (input instanceof Map) {
        output = new Map();
        deepClone = 'map';
    } else if (input instanceof Set) {
        output = new Set();
        deepClone = 'set';
    } else if (typeof Blob !== 'undefined' && input instanceof Blob) {
        output = input.slice(0, input.size, input.type);
    } else if (Array.isArray(input)) {
        output = new Array(input.length);
        deepClone = 'own';
    } else if (typeof input === 'function') {
        throw new DataCloneError('Object could not be cloned: ' + input.name + ' is a function');
    } else if (!isPlainObject(input)) {
        // This is way too restrictive. Should be able to clone any object that isn't
        // a platform object with an internal slot other than [[Prototype]] or [[Extensible]].
        // But need to reject all platform objects, except those whitelisted for cloning
        // (ie, those with a [[Clone]] internal method), and this errs on the side of caution
        // for now.

        // Supposed to also handle FileList, ImageData, ImageBitmap, but fuck it
        throw new DataCloneError();
    } else {
        output = {};
        deepClone = 'own';
    }

    memory.set(input, output);

    if (deepClone === 'map') {
        input.forEach(function (v, k) {
            output.set(structuredClone(k, memory), structuredClone(v, memory));
        });
    } else if (deepClone === 'set') {
        input.forEach(function (v) {
            output.add(structuredClone(v, memory));
        });
    } else if (deepClone === 'own') {
        for (var name in input) {
            if (input.hasOwnProperty(name)) {
                var sourceValue = input[name];
                var clonedValue = structuredClone(sourceValue, memory);
                output[name] = clonedValue;
            }
        }
    }

    return output;
}

module.exports = structuredClone;


/***/ }),
/* 335 */
/***/ (function(module, exports, __webpack_require__) {

/* WEBPACK VAR INJECTION */(function(global, process) {// Copyright Joyent, Inc. and other Node contributors.
//
// Permission is hereby granted, free of charge, to any person obtaining a
// copy of this software and associated documentation files (the
// "Software"), to deal in the Software without restriction, including
// without limitation the rights to use, copy, modify, merge, publish,
// distribute, sublicense, and/or sell copies of the Software, and to permit
// persons to whom the Software is furnished to do so, subject to the
// following conditions:
//
// The above copyright notice and this permission notice shall be included
// in all copies or substantial portions of the Software.
//
// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS
// OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
// MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN
// NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM,
// DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR
// OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE
// USE OR OTHER DEALINGS IN THE SOFTWARE.

var formatRegExp = /%[sdj%]/g;
exports.format = function(f) {
  if (!isString(f)) {
    var objects = [];
    for (var i = 0; i < arguments.length; i++) {
      objects.push(inspect(arguments[i]));
    }
    return objects.join(' ');
  }

  var i = 1;
  var args = arguments;
  var len = args.length;
  var str = String(f).replace(formatRegExp, function(x) {
    if (x === '%%') return '%';
    if (i >= len) return x;
    switch (x) {
      case '%s': return String(args[i++]);
      case '%d': return Number(args[i++]);
      case '%j':
        try {
          return JSON.stringify(args[i++]);
        } catch (_) {
          return '[Circular]';
        }
      default:
        return x;
    }
  });
  for (var x = args[i]; i < len; x = args[++i]) {
    if (isNull(x) || !isObject(x)) {
      str += ' ' + x;
    } else {
      str += ' ' + inspect(x);
    }
  }
  return str;
};


// Mark that a method should not be used.
// Returns a modified function which warns once by default.
// If --no-deprecation is set, then it is a no-op.
exports.deprecate = function(fn, msg) {
  // Allow for deprecating things in the process of starting up.
  if (isUndefined(global.process)) {
    return function() {
      return exports.deprecate(fn, msg).apply(this, arguments);
    };
  }

  if (process.noDeprecation === true) {
    return fn;
  }

  var warned = false;
  function deprecated() {
    if (!warned) {
      if (process.throwDeprecation) {
        throw new Error(msg);
      } else if (process.traceDeprecation) {
        console.trace(msg);
      } else {
        console.error(msg);
      }
      warned = true;
    }
    return fn.apply(this, arguments);
  }

  return deprecated;
};


var debugs = {};
var debugEnviron;
exports.debuglog = function(set) {
  if (isUndefined(debugEnviron))
    debugEnviron = process.env.NODE_DEBUG || '';
  set = set.toUpperCase();
  if (!debugs[set]) {
    if (new RegExp('\\b' + set + '\\b', 'i').test(debugEnviron)) {
      var pid = process.pid;
      debugs[set] = function() {
        var msg = exports.format.apply(exports, arguments);
        console.error('%s %d: %s', set, pid, msg);
      };
    } else {
      debugs[set] = function() {};
    }
  }
  return debugs[set];
};


/**
 * Echos the value of a value. Trys to print the value out
 * in the best way possible given the different types.
 *
 * @param {Object} obj The object to print out.
 * @param {Object} opts Optional options object that alters the output.
 */
/* legacy: obj, showHidden, depth, colors*/
function inspect(obj, opts) {
  // default options
  var ctx = {
    seen: [],
    stylize: stylizeNoColor
  };
  // legacy...
  if (arguments.length >= 3) ctx.depth = arguments[2];
  if (arguments.length >= 4) ctx.colors = arguments[3];
  if (isBoolean(opts)) {
    // legacy...
    ctx.showHidden = opts;
  } else if (opts) {
    // got an "options" object
    exports._extend(ctx, opts);
  }
  // set default options
  if (isUndefined(ctx.showHidden)) ctx.showHidden = false;
  if (isUndefined(ctx.depth)) ctx.depth = 2;
  if (isUndefined(ctx.colors)) ctx.colors = false;
  if (isUndefined(ctx.customInspect)) ctx.customInspect = true;
  if (ctx.colors) ctx.stylize = stylizeWithColor;
  return formatValue(ctx, obj, ctx.depth);
}
exports.inspect = inspect;


// http://en.wikipedia.org/wiki/ANSI_escape_code#graphics
inspect.colors = {
  'bold' : [1, 22],
  'italic' : [3, 23],
  'underline' : [4, 24],
  'inverse' : [7, 27],
  'white' : [37, 39],
  'grey' : [90, 39],
  'black' : [30, 39],
  'blue' : [34, 39],
  'cyan' : [36, 39],
  'green' : [32, 39],
  'magenta' : [35, 39],
  'red' : [31, 39],
  'yellow' : [33, 39]
};

// Don't use 'blue' not visible on cmd.exe
inspect.styles = {
  'special': 'cyan',
  'number': 'yellow',
  'boolean': 'yellow',
  'undefined': 'grey',
  'null': 'bold',
  'string': 'green',
  'date': 'magenta',
  // "name": intentionally not styling
  'regexp': 'red'
};


function stylizeWithColor(str, styleType) {
  var style = inspect.styles[styleType];

  if (style) {
    return '\u001b[' + inspect.colors[style][0] + 'm' + str +
           '\u001b[' + inspect.colors[style][1] + 'm';
  } else {
    return str;
  }
}


function stylizeNoColor(str, styleType) {
  return str;
}


function arrayToHash(array) {
  var hash = {};

  array.forEach(function(val, idx) {
    hash[val] = true;
  });

  return hash;
}


function formatValue(ctx, value, recurseTimes) {
  // Provide a hook for user-specified inspect functions.
  // Check that value is an object with an inspect function on it
  if (ctx.customInspect &&
      value &&
      isFunction(value.inspect) &&
      // Filter out the util module, it's inspect function is special
      value.inspect !== exports.inspect &&
      // Also filter out any prototype objects using the circular check.
      !(value.constructor && value.constructor.prototype === value)) {
    var ret = value.inspect(recurseTimes, ctx);
    if (!isString(ret)) {
      ret = formatValue(ctx, ret, recurseTimes);
    }
    return ret;
  }

  // Primitive types cannot have properties
  var primitive = formatPrimitive(ctx, value);
  if (primitive) {
    return primitive;
  }

  // Look up the keys of the object.
  var keys = Object.keys(value);
  var visibleKeys = arrayToHash(keys);

  if (ctx.showHidden) {
    keys = Object.getOwnPropertyNames(value);
  }

  // IE doesn't make error fields non-enumerable
  // http://msdn.microsoft.com/en-us/library/ie/dww52sbt(v=vs.94).aspx
  if (isError(value)
      && (keys.indexOf('message') >= 0 || keys.indexOf('description') >= 0)) {
    return formatError(value);
  }

  // Some type of object without properties can be shortcutted.
  if (keys.length === 0) {
    if (isFunction(value)) {
      var name = value.name ? ': ' + value.name : '';
      return ctx.stylize('[Function' + name + ']', 'special');
    }
    if (isRegExp(value)) {
      return ctx.stylize(RegExp.prototype.toString.call(value), 'regexp');
    }
    if (isDate(value)) {
      return ctx.stylize(Date.prototype.toString.call(value), 'date');
    }
    if (isError(value)) {
      return formatError(value);
    }
  }

  var base = '', array = false, braces = ['{', '}'];

  // Make Array say that they are Array
  if (isArray(value)) {
    array = true;
    braces = ['[', ']'];
  }

  // Make functions say that they are functions
  if (isFunction(value)) {
    var n = value.name ? ': ' + value.name : '';
    base = ' [Function' + n + ']';
  }

  // Make RegExps say that they are RegExps
  if (isRegExp(value)) {
    base = ' ' + RegExp.prototype.toString.call(value);
  }

  // Make dates with properties first say the date
  if (isDate(value)) {
    base = ' ' + Date.prototype.toUTCString.call(value);
  }

  // Make error with message first say the error
  if (isError(value)) {
    base = ' ' + formatError(value);
  }

  if (keys.length === 0 && (!array || value.length == 0)) {
    return braces[0] + base + braces[1];
  }

  if (recurseTimes < 0) {
    if (isRegExp(value)) {
      return ctx.stylize(RegExp.prototype.toString.call(value), 'regexp');
    } else {
      return ctx.stylize('[Object]', 'special');
    }
  }

  ctx.seen.push(value);

  var output;
  if (array) {
    output = formatArray(ctx, value, recurseTimes, visibleKeys, keys);
  } else {
    output = keys.map(function(key) {
      return formatProperty(ctx, value, recurseTimes, visibleKeys, key, array);
    });
  }

  ctx.seen.pop();

  return reduceToSingleString(output, base, braces);
}


function formatPrimitive(ctx, value) {
  if (isUndefined(value))
    return ctx.stylize('undefined', 'undefined');
  if (isString(value)) {
    var simple = '\'' + JSON.stringify(value).replace(/^"|"$/g, '')
                                             .replace(/'/g, "\\'")
                                             .replace(/\\"/g, '"') + '\'';
    return ctx.stylize(simple, 'string');
  }
  if (isNumber(value))
    return ctx.stylize('' + value, 'number');
  if (isBoolean(value))
    return ctx.stylize('' + value, 'boolean');
  // For some reason typeof null is "object", so special case here.
  if (isNull(value))
    return ctx.stylize('null', 'null');
}


function formatError(value) {
  return '[' + Error.prototype.toString.call(value) + ']';
}


function formatArray(ctx, value, recurseTimes, visibleKeys, keys) {
  var output = [];
  for (var i = 0, l = value.length; i < l; ++i) {
    if (hasOwnProperty(value, String(i))) {
      output.push(formatProperty(ctx, value, recurseTimes, visibleKeys,
          String(i), true));
    } else {
      output.push('');
    }
  }
  keys.forEach(function(key) {
    if (!key.match(/^\d+$/)) {
      output.push(formatProperty(ctx, value, recurseTimes, visibleKeys,
          key, true));
    }
  });
  return output;
}


function formatProperty(ctx, value, recurseTimes, visibleKeys, key, array) {
  var name, str, desc;
  desc = Object.getOwnPropertyDescriptor(value, key) || { value: value[key] };
  if (desc.get) {
    if (desc.set) {
      str = ctx.stylize('[Getter/Setter]', 'special');
    } else {
      str = ctx.stylize('[Getter]', 'special');
    }
  } else {
    if (desc.set) {
      str = ctx.stylize('[Setter]', 'special');
    }
  }
  if (!hasOwnProperty(visibleKeys, key)) {
    name = '[' + key + ']';
  }
  if (!str) {
    if (ctx.seen.indexOf(desc.value) < 0) {
      if (isNull(recurseTimes)) {
        str = formatValue(ctx, desc.value, null);
      } else {
        str = formatValue(ctx, desc.value, recurseTimes - 1);
      }
      if (str.indexOf('\n') > -1) {
        if (array) {
          str = str.split('\n').map(function(line) {
            return '  ' + line;
          }).join('\n').substr(2);
        } else {
          str = '\n' + str.split('\n').map(function(line) {
            return '   ' + line;
          }).join('\n');
        }
      }
    } else {
      str = ctx.stylize('[Circular]', 'special');
    }
  }
  if (isUndefined(name)) {
    if (array && key.match(/^\d+$/)) {
      return str;
    }
    name = JSON.stringify('' + key);
    if (name.match(/^"([a-zA-Z_][a-zA-Z_0-9]*)"$/)) {
      name = name.substr(1, name.length - 2);
      name = ctx.stylize(name, 'name');
    } else {
      name = name.replace(/'/g, "\\'")
                 .replace(/\\"/g, '"')
                 .replace(/(^"|"$)/g, "'");
      name = ctx.stylize(name, 'string');
    }
  }

  return name + ': ' + str;
}


function reduceToSingleString(output, base, braces) {
  var numLinesEst = 0;
  var length = output.reduce(function(prev, cur) {
    numLinesEst++;
    if (cur.indexOf('\n') >= 0) numLinesEst++;
    return prev + cur.replace(/\u001b\[\d\d?m/g, '').length + 1;
  }, 0);

  if (length > 60) {
    return braces[0] +
           (base === '' ? '' : base + '\n ') +
           ' ' +
           output.join(',\n  ') +
           ' ' +
           braces[1];
  }

  return braces[0] + base + ' ' + output.join(', ') + ' ' + braces[1];
}


// NOTE: These type checking functions intentionally don't use `instanceof`
// because it is fragile and can be easily faked with `Object.create()`.
function isArray(ar) {
  return Array.isArray(ar);
}
exports.isArray = isArray;

function isBoolean(arg) {
  return typeof arg === 'boolean';
}
exports.isBoolean = isBoolean;

function isNull(arg) {
  return arg === null;
}
exports.isNull = isNull;

function isNullOrUndefined(arg) {
  return arg == null;
}
exports.isNullOrUndefined = isNullOrUndefined;

function isNumber(arg) {
  return typeof arg === 'number';
}
exports.isNumber = isNumber;

function isString(arg) {
  return typeof arg === 'string';
}
exports.isString = isString;

function isSymbol(arg) {
  return typeof arg === 'symbol';
}
exports.isSymbol = isSymbol;

function isUndefined(arg) {
  return arg === void 0;
}
exports.isUndefined = isUndefined;

function isRegExp(re) {
  return isObject(re) && objectToString(re) === '[object RegExp]';
}
exports.isRegExp = isRegExp;

function isObject(arg) {
  return typeof arg === 'object' && arg !== null;
}
exports.isObject = isObject;

function isDate(d) {
  return isObject(d) && objectToString(d) === '[object Date]';
}
exports.isDate = isDate;

function isError(e) {
  return isObject(e) &&
      (objectToString(e) === '[object Error]' || e instanceof Error);
}
exports.isError = isError;

function isFunction(arg) {
  return typeof arg === 'function';
}
exports.isFunction = isFunction;

function isPrimitive(arg) {
  return arg === null ||
         typeof arg === 'boolean' ||
         typeof arg === 'number' ||
         typeof arg === 'string' ||
         typeof arg === 'symbol' ||  // ES6 symbol
         typeof arg === 'undefined';
}
exports.isPrimitive = isPrimitive;

exports.isBuffer = __webpack_require__(336);

function objectToString(o) {
  return Object.prototype.toString.call(o);
}


function pad(n) {
  return n < 10 ? '0' + n.toString(10) : n.toString(10);
}


var months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep',
              'Oct', 'Nov', 'Dec'];

// 26 Feb 16:19:34
function timestamp() {
  var d = new Date();
  var time = [pad(d.getHours()),
              pad(d.getMinutes()),
              pad(d.getSeconds())].join(':');
  return [d.getDate(), months[d.getMonth()], time].join(' ');
}


// log is just a thin wrapper to console.log that prepends a timestamp
exports.log = function() {
  console.log('%s - %s', timestamp(), exports.format.apply(exports, arguments));
};


/**
 * Inherit the prototype methods from one constructor into another.
 *
 * The Function.prototype.inherits from lang.js rewritten as a standalone
 * function (not on Function.prototype). NOTE: If this file is to be loaded
 * during bootstrapping this function needs to be rewritten using some native
 * functions as prototype setup using normal JavaScript does not work as
 * expected during bootstrapping (see mirror.js in r114903).
 *
 * @param {function} ctor Constructor function which needs to inherit the
 *     prototype.
 * @param {function} superCtor Constructor function to inherit prototype from.
 */
exports.inherits = __webpack_require__(337);

exports._extend = function(origin, add) {
  // Don't do anything if add isn't an object
  if (!add || !isObject(add)) return origin;

  var keys = Object.keys(add);
  var i = keys.length;
  while (i--) {
    origin[keys[i]] = add[keys[i]];
  }
  return origin;
};

function hasOwnProperty(obj, prop) {
  return Object.prototype.hasOwnProperty.call(obj, prop);
}

/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(133), __webpack_require__(134)))

/***/ }),
/* 336 */
/***/ (function(module, exports) {

module.exports = function isBuffer(arg) {
  return arg && typeof arg === 'object'
    && typeof arg.copy === 'function'
    && typeof arg.fill === 'function'
    && typeof arg.readUInt8 === 'function';
}

/***/ }),
/* 337 */
/***/ (function(module, exports) {

if (typeof Object.create === 'function') {
  // implementation from standard node.js 'util' module
  module.exports = function inherits(ctor, superCtor) {
    ctor.super_ = superCtor
    ctor.prototype = Object.create(superCtor.prototype, {
      constructor: {
        value: ctor,
        enumerable: false,
        writable: true,
        configurable: true
      }
    });
  };
} else {
  // old school shim for old browsers
  module.exports = function inherits(ctor, superCtor) {
    ctor.super_ = superCtor
    var TempCtor = function () {}
    TempCtor.prototype = superCtor.prototype
    ctor.prototype = new TempCtor()
    ctor.prototype.constructor = ctor
  }
}


/***/ }),
/* 338 */
/***/ (function(module, exports, __webpack_require__) {

/**
 * lodash 3.2.0 (Custom Build) <https://lodash.com/>
 * Build: `lodash modern modularize exports="npm" -o ./`
 * Copyright 2012-2015 The Dojo Foundation <http://dojofoundation.org/>
 * Based on Underscore.js 1.8.3 <http://underscorejs.org/LICENSE>
 * Copyright 2009-2015 Jeremy Ashkenas, DocumentCloud and Investigative Reporters & Editors
 * Available under MIT license <https://lodash.com/license>
 */
var baseFor = __webpack_require__(339),
    isArguments = __webpack_require__(136),
    keysIn = __webpack_require__(340);

/** `Object#toString` result references. */
var objectTag = '[object Object]';

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

/** Used for native method references. */
var objectProto = Object.prototype;

/** Used to check objects for own properties. */
var hasOwnProperty = objectProto.hasOwnProperty;

/**
 * Used to resolve the [`toStringTag`](http://ecma-international.org/ecma-262/6.0/#sec-object.prototype.tostring)
 * of values.
 */
var objToString = objectProto.toString;

/**
 * The base implementation of `_.forIn` without support for callback
 * shorthands and `this` binding.
 *
 * @private
 * @param {Object} object The object to iterate over.
 * @param {Function} iteratee The function invoked per iteration.
 * @returns {Object} Returns `object`.
 */
function baseForIn(object, iteratee) {
  return baseFor(object, iteratee, keysIn);
}

/**
 * Checks if `value` is a plain object, that is, an object created by the
 * `Object` constructor or one with a `[[Prototype]]` of `null`.
 *
 * **Note:** This method assumes objects created by the `Object` constructor
 * have no inherited enumerable properties.
 *
 * @static
 * @memberOf _
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is a plain object, else `false`.
 * @example
 *
 * function Foo() {
 *   this.a = 1;
 * }
 *
 * _.isPlainObject(new Foo);
 * // => false
 *
 * _.isPlainObject([1, 2, 3]);
 * // => false
 *
 * _.isPlainObject({ 'x': 0, 'y': 0 });
 * // => true
 *
 * _.isPlainObject(Object.create(null));
 * // => true
 */
function isPlainObject(value) {
  var Ctor;

  // Exit early for non `Object` objects.
  if (!(isObjectLike(value) && objToString.call(value) == objectTag && !isArguments(value)) ||
      (!hasOwnProperty.call(value, 'constructor') && (Ctor = value.constructor, typeof Ctor == 'function' && !(Ctor instanceof Ctor)))) {
    return false;
  }
  // IE < 9 iterates inherited properties before own properties. If the first
  // iterated property is an object's own property then there are no inherited
  // enumerable properties.
  var result;
  // In most environments an object's own properties are iterated before
  // its inherited properties. If the last iterated property is an object's
  // own property then there are no inherited enumerable properties.
  baseForIn(value, function(subValue, key) {
    result = key;
  });
  return result === undefined || hasOwnProperty.call(value, result);
}

module.exports = isPlainObject;


/***/ }),
/* 339 */
/***/ (function(module, exports) {

/**
 * lodash 3.0.3 (Custom Build) <https://lodash.com/>
 * Build: `lodash modularize exports="npm" -o ./`
 * Copyright 2012-2016 The Dojo Foundation <http://dojofoundation.org/>
 * Based on Underscore.js 1.8.3 <http://underscorejs.org/LICENSE>
 * Copyright 2009-2016 Jeremy Ashkenas, DocumentCloud and Investigative Reporters & Editors
 * Available under MIT license <https://lodash.com/license>
 */

/**
 * The base implementation of `baseForIn` and `baseForOwn` which iterates
 * over `object` properties returned by `keysFunc` invoking `iteratee` for
 * each property. Iteratee functions may exit iteration early by explicitly
 * returning `false`.
 *
 * @private
 * @param {Object} object The object to iterate over.
 * @param {Function} iteratee The function invoked per iteration.
 * @param {Function} keysFunc The function to get the keys of `object`.
 * @returns {Object} Returns `object`.
 */
var baseFor = createBaseFor();

/**
 * Creates a base function for methods like `_.forIn`.
 *
 * @private
 * @param {boolean} [fromRight] Specify iterating from right to left.
 * @returns {Function} Returns the new base function.
 */
function createBaseFor(fromRight) {
  return function(object, iteratee, keysFunc) {
    var index = -1,
        iterable = Object(object),
        props = keysFunc(object),
        length = props.length;

    while (length--) {
      var key = props[fromRight ? length : ++index];
      if (iteratee(iterable[key], key, iterable) === false) {
        break;
      }
    }
    return object;
  };
}

module.exports = baseFor;


/***/ }),
/* 340 */
/***/ (function(module, exports, __webpack_require__) {

/**
 * lodash 3.0.8 (Custom Build) <https://lodash.com/>
 * Build: `lodash modern modularize exports="npm" -o ./`
 * Copyright 2012-2015 The Dojo Foundation <http://dojofoundation.org/>
 * Based on Underscore.js 1.8.3 <http://underscorejs.org/LICENSE>
 * Copyright 2009-2015 Jeremy Ashkenas, DocumentCloud and Investigative Reporters & Editors
 * Available under MIT license <https://lodash.com/license>
 */
var isArguments = __webpack_require__(136),
    isArray = __webpack_require__(341);

/** Used to detect unsigned integer values. */
var reIsUint = /^\d+$/;

/** Used for native method references. */
var objectProto = Object.prototype;

/** Used to check objects for own properties. */
var hasOwnProperty = objectProto.hasOwnProperty;

/**
 * Used as the [maximum length](https://people.mozilla.org/~jorendorff/es6-draft.html#sec-number.max_safe_integer)
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
  value = (typeof value == 'number' || reIsUint.test(value)) ? +value : -1;
  length = length == null ? MAX_SAFE_INTEGER : length;
  return value > -1 && value % 1 == 0 && value < length;
}

/**
 * Checks if `value` is a valid array-like length.
 *
 * **Note:** This function is based on [`ToLength`](https://people.mozilla.org/~jorendorff/es6-draft.html#sec-tolength).
 *
 * @private
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is a valid length, else `false`.
 */
function isLength(value) {
  return typeof value == 'number' && value > -1 && value % 1 == 0 && value <= MAX_SAFE_INTEGER;
}

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
  length = (length && isLength(length) &&
    (isArray(object) || isArguments(object)) && length) || 0;

  var Ctor = object.constructor,
      index = -1,
      isProto = typeof Ctor == 'function' && Ctor.prototype === object,
      result = Array(length),
      skipIndexes = length > 0;

  while (++index < length) {
    result[index] = (index + '');
  }
  for (var key in object) {
    if (!(skipIndexes && isIndex(key, length)) &&
        !(key == 'constructor' && (isProto || !hasOwnProperty.call(object, key)))) {
      result.push(key);
    }
  }
  return result;
}

module.exports = keysIn;


/***/ }),
/* 341 */
/***/ (function(module, exports) {

/**
 * lodash 3.0.4 (Custom Build) <https://lodash.com/>
 * Build: `lodash modern modularize exports="npm" -o ./`
 * Copyright 2012-2015 The Dojo Foundation <http://dojofoundation.org/>
 * Based on Underscore.js 1.8.3 <http://underscorejs.org/LICENSE>
 * Copyright 2009-2015 Jeremy Ashkenas, DocumentCloud and Investigative Reporters & Editors
 * Available under MIT license <https://lodash.com/license>
 */

/** `Object#toString` result references. */
var arrayTag = '[object Array]',
    funcTag = '[object Function]';

/** Used to detect host constructors (Safari > 5). */
var reIsHostCtor = /^\[object .+?Constructor\]$/;

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

/** Used for native method references. */
var objectProto = Object.prototype;

/** Used to resolve the decompiled source of functions. */
var fnToString = Function.prototype.toString;

/** Used to check objects for own properties. */
var hasOwnProperty = objectProto.hasOwnProperty;

/**
 * Used to resolve the [`toStringTag`](http://ecma-international.org/ecma-262/6.0/#sec-object.prototype.tostring)
 * of values.
 */
var objToString = objectProto.toString;

/** Used to detect if a method is native. */
var reIsNative = RegExp('^' +
  fnToString.call(hasOwnProperty).replace(/[\\^$.*+?()[\]{}|]/g, '\\$&')
  .replace(/hasOwnProperty|(function).*?(?=\\\()| for .+?(?=\\\])/g, '$1.*?') + '$'
);

/* Native method references for those with the same name as other `lodash` methods. */
var nativeIsArray = getNative(Array, 'isArray');

/**
 * Used as the [maximum length](http://ecma-international.org/ecma-262/6.0/#sec-number.max_safe_integer)
 * of an array-like value.
 */
var MAX_SAFE_INTEGER = 9007199254740991;

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
var isArray = nativeIsArray || function(value) {
  return isObjectLike(value) && isLength(value.length) && objToString.call(value) == arrayTag;
};

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
  // and Safari 8 equivalents which return 'object' for typed array constructors.
  return isObject(value) && objToString.call(value) == funcTag;
}

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

module.exports = isArray;


/***/ }),
/* 342 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var FDBCursor_1 = __webpack_require__(99);
var FDBCursorWithValue_1 = __webpack_require__(137);
var FDBKeyRange_1 = __webpack_require__(51);
var FDBRequest_1 = __webpack_require__(69);
var enforceRange_1 = __webpack_require__(101);
var errors_1 = __webpack_require__(10);
var fakeDOMStringList_1 = __webpack_require__(70);
var valueToKey_1 = __webpack_require__(34);
var valueToKeyRange_1 = __webpack_require__(138);
var confirmActiveTransaction = function (index) {
    if (index._rawIndex.deleted || index.objectStore._rawObjectStore.deleted) {
        throw new errors_1.InvalidStateError();
    }
    if (!index.objectStore.transaction._active) {
        throw new errors_1.TransactionInactiveError();
    }
};
// http://www.w3.org/TR/2015/REC-IndexedDB-20150108/#idl-def-IDBIndex
var FDBIndex = (function () {
    function FDBIndex(objectStore, rawIndex) {
        this._rawIndex = rawIndex;
        this._name = rawIndex.name;
        this.objectStore = objectStore;
        this.keyPath = rawIndex.keyPath;
        this.multiEntry = rawIndex.multiEntry;
        this.unique = rawIndex.unique;
    }
    Object.defineProperty(FDBIndex.prototype, "name", {
        get: function () {
            return this._name;
        },
        // https://w3c.github.io/IndexedDB/#dom-idbindex-name
        set: function (name) {
            var _this = this;
            var transaction = this.objectStore.transaction;
            if (!transaction.db._runningVersionchangeTransaction) {
                throw new errors_1.InvalidStateError();
            }
            if (!transaction._active) {
                throw new errors_1.TransactionInactiveError();
            }
            if (this._rawIndex.deleted || this.objectStore._rawObjectStore.deleted) {
                throw new errors_1.InvalidStateError();
            }
            name = String(name);
            if (name === this._name) {
                return;
            }
            if (this.objectStore.indexNames.indexOf(name) >= 0) {
                throw new errors_1.ConstraintError();
            }
            var oldName = this._name;
            var oldIndexNames = this.objectStore.indexNames.slice();
            this._name = name;
            this._rawIndex.name = name;
            this.objectStore._indexesCache.delete(oldName);
            this.objectStore._indexesCache.set(name, this);
            this.objectStore._rawObjectStore.rawIndexes.delete(oldName);
            this.objectStore._rawObjectStore.rawIndexes.set(name, this._rawIndex);
            this.objectStore.indexNames = fakeDOMStringList_1.default(Array.from(this.objectStore._rawObjectStore.rawIndexes.keys())
                .filter(function (indexName) {
                var index = _this.objectStore._rawObjectStore.rawIndexes.get(indexName);
                return index && !index.deleted;
            })).sort();
            transaction._rollbackLog.push(function () {
                _this._name = oldName;
                _this._rawIndex.name = oldName;
                _this.objectStore._indexesCache.delete(name);
                _this.objectStore._indexesCache.set(oldName, _this);
                _this.objectStore._rawObjectStore.rawIndexes.delete(name);
                _this.objectStore._rawObjectStore.rawIndexes.set(oldName, _this._rawIndex);
                _this.objectStore.indexNames = fakeDOMStringList_1.default(oldIndexNames);
            });
        },
        enumerable: true,
        configurable: true
    });
    // tslint:disable-next-line max-line-length
    // http://www.w3.org/TR/2015/REC-IndexedDB-20150108/#widl-IDBIndex-openCursor-IDBRequest-any-range-IDBCursorDirection-direction
    FDBIndex.prototype.openCursor = function (range, direction) {
        confirmActiveTransaction(this);
        if (range === null) {
            range = undefined;
        }
        if (range !== undefined && !(range instanceof FDBKeyRange_1.default)) {
            range = FDBKeyRange_1.default.only(valueToKey_1.default(range));
        }
        var request = new FDBRequest_1.default();
        request.source = this;
        request.transaction = this.objectStore.transaction;
        var cursor = new FDBCursorWithValue_1.default(this, range, direction, request);
        return this.objectStore.transaction._execRequestAsync({
            operation: cursor._iterate.bind(cursor),
            request: request,
            source: this,
        });
    };
    // tslint:disable-next-line max-line-length
    // http://www.w3.org/TR/2015/REC-IndexedDB-20150108/#widl-IDBIndex-openKeyCursor-IDBRequest-any-range-IDBCursorDirection-direction
    FDBIndex.prototype.openKeyCursor = function (range, direction) {
        confirmActiveTransaction(this);
        if (range === null) {
            range = undefined;
        }
        if (range !== undefined && !(range instanceof FDBKeyRange_1.default)) {
            range = FDBKeyRange_1.default.only(valueToKey_1.default(range));
        }
        var request = new FDBRequest_1.default();
        request.source = this;
        request.transaction = this.objectStore.transaction;
        var cursor = new FDBCursor_1.default(this, range, direction, request, true);
        return this.objectStore.transaction._execRequestAsync({
            operation: cursor._iterate.bind(cursor),
            request: request,
            source: this,
        });
    };
    FDBIndex.prototype.get = function (key) {
        confirmActiveTransaction(this);
        if (!(key instanceof FDBKeyRange_1.default)) {
            key = valueToKey_1.default(key);
        }
        return this.objectStore.transaction._execRequestAsync({
            operation: this._rawIndex.getValue.bind(this._rawIndex, key),
            source: this,
        });
    };
    // http://w3c.github.io/IndexedDB/#dom-idbindex-getall
    FDBIndex.prototype.getAll = function (query, count) {
        if (arguments.length > 1 && count !== undefined) {
            count = enforceRange_1.default(count, "unsigned long");
        }
        confirmActiveTransaction(this);
        var range = valueToKeyRange_1.default(query);
        return this.objectStore.transaction._execRequestAsync({
            operation: this._rawIndex.getAllValues.bind(this._rawIndex, range, count),
            source: this,
        });
    };
    // http://www.w3.org/TR/2015/REC-IndexedDB-20150108/#widl-IDBIndex-getKey-IDBRequest-any-key
    FDBIndex.prototype.getKey = function (key) {
        confirmActiveTransaction(this);
        if (!(key instanceof FDBKeyRange_1.default)) {
            key = valueToKey_1.default(key);
        }
        return this.objectStore.transaction._execRequestAsync({
            operation: this._rawIndex.getKey.bind(this._rawIndex, key),
            source: this,
        });
    };
    // http://w3c.github.io/IndexedDB/#dom-idbindex-getallkeys
    FDBIndex.prototype.getAllKeys = function (query, count) {
        if (arguments.length > 1 && count !== undefined) {
            count = enforceRange_1.default(count, "unsigned long");
        }
        confirmActiveTransaction(this);
        var range = valueToKeyRange_1.default(query);
        return this.objectStore.transaction._execRequestAsync({
            operation: this._rawIndex.getAllKeys.bind(this._rawIndex, range, count),
            source: this,
        });
    };
    // http://www.w3.org/TR/2015/REC-IndexedDB-20150108/#widl-IDBIndex-count-IDBRequest-any-key
    FDBIndex.prototype.count = function (key) {
        var _this = this;
        confirmActiveTransaction(this);
        if (key === null) {
            key = undefined;
        }
        if (key !== undefined && !(key instanceof FDBKeyRange_1.default)) {
            key = FDBKeyRange_1.default.only(valueToKey_1.default(key));
        }
        return this.objectStore.transaction._execRequestAsync({
            operation: function () {
                var count = 0;
                var cursor = new FDBCursor_1.default(_this, key);
                while (cursor._iterate() !== null) {
                    count += 1;
                }
                return count;
            },
            source: this,
        });
    };
    FDBIndex.prototype.toString = function () {
        return "[object IDBIndex]";
    };
    return FDBIndex;
}());
exports.default = FDBIndex;


/***/ }),
/* 343 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __values = (this && this.__values) || function (o) {
    var m = typeof Symbol === "function" && o[Symbol.iterator], i = 0;
    if (m) return m.call(o);
    return {
        next: function () {
            if (o && i >= o.length) o = void 0;
            return { value: o && o[i++], done: !o };
        }
    };
};
Object.defineProperty(exports, "__esModule", { value: true });
// http://w3c.github.io/IndexedDB/#check-that-a-key-could-be-injected-into-a-value
var canInjectKey = function (keyPath, value) {
    if (Array.isArray(keyPath)) {
        // tslint:disable-next-line max-line-length
        throw new Error("The key paths used in this section are always strings and never sequences, since it is not possible to create a object store which has a key generator and also has a key path that is a sequence.");
    }
    var identifiers = keyPath.split(".");
    if (identifiers.length === 0) {
        throw new Error("Assert: identifiers is not empty");
    }
    identifiers.pop();
    try {
        for (var identifiers_1 = __values(identifiers), identifiers_1_1 = identifiers_1.next(); !identifiers_1_1.done; identifiers_1_1 = identifiers_1.next()) {
            var identifier = identifiers_1_1.value;
            if (typeof value !== "object" && !Array.isArray(value)) {
                return false;
            }
            var hop = value.hasOwnProperty(identifier);
            if (!hop) {
                return true;
            }
            value = value[identifier];
        }
    }
    catch (e_1_1) { e_1 = { error: e_1_1 }; }
    finally {
        try {
            if (identifiers_1_1 && !identifiers_1_1.done && (_a = identifiers_1.return)) _a.call(identifiers_1);
        }
        finally { if (e_1) throw e_1.error; }
    }
    return typeof value === "object" || Array.isArray(value);
    var e_1, _a;
};
exports.default = canInjectKey;


/***/ }),
/* 344 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __values = (this && this.__values) || function (o) {
    var m = typeof Symbol === "function" && o[Symbol.iterator], i = 0;
    if (m) return m.call(o);
    return {
        next: function () {
            if (o && i >= o.length) o = void 0;
            return { value: o && o[i++], done: !o };
        }
    };
};
Object.defineProperty(exports, "__esModule", { value: true });
var errors_1 = __webpack_require__(10);
var extractKey_1 = __webpack_require__(67);
var RecordStore_1 = __webpack_require__(139);
var structuredClone_1 = __webpack_require__(68);
var valueToKey_1 = __webpack_require__(34);
// http://www.w3.org/TR/2015/REC-IndexedDB-20150108/#dfn-index
var Index = (function () {
    function Index(rawObjectStore, name, keyPath, multiEntry, unique) {
        this.deleted = false;
        // Initialized should be used to decide whether to throw an error or abort the versionchange transaction when there is a
        // constraint
        this.initialized = false;
        this.records = new RecordStore_1.default();
        this.rawObjectStore = rawObjectStore;
        this.name = name;
        this.keyPath = keyPath;
        this.multiEntry = multiEntry;
        this.unique = unique;
    }
    // http://www.w3.org/TR/2015/REC-IndexedDB-20150108/#dfn-steps-for-retrieving-a-value-from-an-index
    Index.prototype.getKey = function (key) {
        var record = this.records.get(key);
        return record !== undefined ? record.value : undefined;
    };
    // http://w3c.github.io/IndexedDB/#retrieve-multiple-referenced-values-from-an-index
    Index.prototype.getAllKeys = function (range, count) {
        if (count === undefined || count === 0) {
            count = Infinity;
        }
        var records = [];
        try {
            for (var _a = __values(this.records.values(range)), _b = _a.next(); !_b.done; _b = _a.next()) {
                var record = _b.value;
                records.push(structuredClone_1.default(record.value));
                if (records.length >= count) {
                    break;
                }
            }
        }
        catch (e_1_1) { e_1 = { error: e_1_1 }; }
        finally {
            try {
                if (_b && !_b.done && (_c = _a.return)) _c.call(_a);
            }
            finally { if (e_1) throw e_1.error; }
        }
        return records;
        var e_1, _c;
    };
    // http://www.w3.org/TR/2015/REC-IndexedDB-20150108/#index-referenced-value-retrieval-operation
    Index.prototype.getValue = function (key) {
        var record = this.records.get(key);
        return record !== undefined ? this.rawObjectStore.getValue(record.value) : undefined;
    };
    // http://w3c.github.io/IndexedDB/#retrieve-multiple-referenced-values-from-an-index
    Index.prototype.getAllValues = function (range, count) {
        if (count === undefined || count === 0) {
            count = Infinity;
        }
        var records = [];
        try {
            for (var _a = __values(this.records.values(range)), _b = _a.next(); !_b.done; _b = _a.next()) {
                var record = _b.value;
                records.push(this.rawObjectStore.getValue(record.value));
                if (records.length >= count) {
                    break;
                }
            }
        }
        catch (e_2_1) { e_2 = { error: e_2_1 }; }
        finally {
            try {
                if (_b && !_b.done && (_c = _a.return)) _c.call(_a);
            }
            finally { if (e_2) throw e_2.error; }
        }
        return records;
        var e_2, _c;
    };
    // http://www.w3.org/TR/2015/REC-IndexedDB-20150108/#dfn-steps-for-storing-a-record-into-an-object-store (step 7)
    Index.prototype.storeRecord = function (newRecord) {
        var indexKey;
        try {
            indexKey = extractKey_1.default(this.keyPath, newRecord.value);
        }
        catch (err) {
            if (err.name === "DataError") {
                // Invalid key is not an actual error, just means we do not store an entry in this index
                return;
            }
            throw err;
        }
        if (!this.multiEntry || !Array.isArray(indexKey)) {
            try {
                valueToKey_1.default(indexKey);
            }
            catch (e) {
                return;
            }
        }
        else {
            // remove any elements from index key that are not valid keys and remove any duplicate elements from index
            // key such that only one instance of the duplicate value remains.
            var keep = [];
            try {
                for (var indexKey_1 = __values(indexKey), indexKey_1_1 = indexKey_1.next(); !indexKey_1_1.done; indexKey_1_1 = indexKey_1.next()) {
                    var part = indexKey_1_1.value;
                    if (keep.indexOf(part) < 0) {
                        try {
                            keep.push(valueToKey_1.default(part));
                        }
                        catch (err) { }
                    }
                }
            }
            catch (e_3_1) { e_3 = { error: e_3_1 }; }
            finally {
                try {
                    if (indexKey_1_1 && !indexKey_1_1.done && (_a = indexKey_1.return)) _a.call(indexKey_1);
                }
                finally { if (e_3) throw e_3.error; }
            }
            indexKey = keep;
        }
        if (!this.multiEntry || !Array.isArray(indexKey)) {
            if (this.unique) {
                var existingRecord = this.records.get(indexKey);
                if (existingRecord) {
                    throw new errors_1.ConstraintError();
                }
            }
        }
        else {
            if (this.unique) {
                try {
                    for (var indexKey_2 = __values(indexKey), indexKey_2_1 = indexKey_2.next(); !indexKey_2_1.done; indexKey_2_1 = indexKey_2.next()) {
                        var individualIndexKey = indexKey_2_1.value;
                        var existingRecord = this.records.get(individualIndexKey);
                        if (existingRecord) {
                            throw new errors_1.ConstraintError();
                        }
                    }
                }
                catch (e_4_1) { e_4 = { error: e_4_1 }; }
                finally {
                    try {
                        if (indexKey_2_1 && !indexKey_2_1.done && (_b = indexKey_2.return)) _b.call(indexKey_2);
                    }
                    finally { if (e_4) throw e_4.error; }
                }
            }
        }
        if (!this.multiEntry || !Array.isArray(indexKey)) {
            this.records.add({
                key: indexKey,
                value: newRecord.key,
            });
        }
        else {
            try {
                for (var indexKey_3 = __values(indexKey), indexKey_3_1 = indexKey_3.next(); !indexKey_3_1.done; indexKey_3_1 = indexKey_3.next()) {
                    var individualIndexKey = indexKey_3_1.value;
                    this.records.add({
                        key: individualIndexKey,
                        value: newRecord.key,
                    });
                }
            }
            catch (e_5_1) { e_5 = { error: e_5_1 }; }
            finally {
                try {
                    if (indexKey_3_1 && !indexKey_3_1.done && (_c = indexKey_3.return)) _c.call(indexKey_3);
                }
                finally { if (e_5) throw e_5.error; }
            }
        }
        var e_3, _a, e_4, _b, e_5, _c;
    };
    Index.prototype.initialize = function (transaction) {
        var _this = this;
        if (this.initialized) {
            throw new Error("Index already initialized");
        }
        transaction._execRequestAsync({
            operation: function () {
                try {
                    try {
                        // Create index based on current value of objectstore
                        for (var _a = __values(_this.rawObjectStore.records.values()), _b = _a.next(); !_b.done; _b = _a.next()) {
                            var record = _b.value;
                            _this.storeRecord(record);
                        }
                    }
                    catch (e_6_1) { e_6 = { error: e_6_1 }; }
                    finally {
                        try {
                            if (_b && !_b.done && (_c = _a.return)) _c.call(_a);
                        }
                        finally { if (e_6) throw e_6.error; }
                    }
                    _this.initialized = true;
                }
                catch (err) {
                    // console.error(err);
                    transaction._abort(err.name);
                }
                var e_6, _c;
            },
            source: null,
        });
    };
    return Index;
}());
exports.default = Index;


/***/ }),
/* 345 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __values = (this && this.__values) || function (o) {
    var m = typeof Symbol === "function" && o[Symbol.iterator], i = 0;
    if (m) return m.call(o);
    return {
        next: function () {
            if (o && i >= o.length) o = void 0;
            return { value: o && o[i++], done: !o };
        }
    };
};
Object.defineProperty(exports, "__esModule", { value: true });
var errors_1 = __webpack_require__(10);
var extractKey_1 = __webpack_require__(67);
var KeyGenerator_1 = __webpack_require__(346);
var RecordStore_1 = __webpack_require__(139);
var structuredClone_1 = __webpack_require__(68);
// http://www.w3.org/TR/2015/REC-IndexedDB-20150108/#dfn-object-store
var ObjectStore = (function () {
    function ObjectStore(rawDatabase, name, keyPath, autoIncrement) {
        this.deleted = false;
        this.records = new RecordStore_1.default();
        this.rawIndexes = new Map();
        this.rawDatabase = rawDatabase;
        this.keyGenerator = autoIncrement === true ? new KeyGenerator_1.default() : null;
        this.deleted = false;
        this.name = name;
        this.keyPath = keyPath;
        this.autoIncrement = autoIncrement;
    }
    // http://www.w3.org/TR/2015/REC-IndexedDB-20150108/#dfn-steps-for-retrieving-a-value-from-an-object-store
    ObjectStore.prototype.getKey = function (key) {
        var record = this.records.get(key);
        return record !== undefined ? structuredClone_1.default(record.key) : undefined;
    };
    // http://w3c.github.io/IndexedDB/#retrieve-multiple-keys-from-an-object-store
    ObjectStore.prototype.getAllKeys = function (range, count) {
        if (count === undefined || count === 0) {
            count = Infinity;
        }
        var records = [];
        try {
            for (var _a = __values(this.records.values(range)), _b = _a.next(); !_b.done; _b = _a.next()) {
                var record = _b.value;
                records.push(structuredClone_1.default(record.key));
                if (records.length >= count) {
                    break;
                }
            }
        }
        catch (e_1_1) { e_1 = { error: e_1_1 }; }
        finally {
            try {
                if (_b && !_b.done && (_c = _a.return)) _c.call(_a);
            }
            finally { if (e_1) throw e_1.error; }
        }
        return records;
        var e_1, _c;
    };
    // http://www.w3.org/TR/2015/REC-IndexedDB-20150108/#dfn-steps-for-retrieving-a-value-from-an-object-store
    ObjectStore.prototype.getValue = function (key) {
        var record = this.records.get(key);
        return record !== undefined ? structuredClone_1.default(record.value) : undefined;
    };
    // http://w3c.github.io/IndexedDB/#retrieve-multiple-values-from-an-object-store
    ObjectStore.prototype.getAllValues = function (range, count) {
        if (count === undefined || count === 0) {
            count = Infinity;
        }
        var records = [];
        try {
            for (var _a = __values(this.records.values(range)), _b = _a.next(); !_b.done; _b = _a.next()) {
                var record = _b.value;
                records.push(structuredClone_1.default(record.value));
                if (records.length >= count) {
                    break;
                }
            }
        }
        catch (e_2_1) { e_2 = { error: e_2_1 }; }
        finally {
            try {
                if (_b && !_b.done && (_c = _a.return)) _c.call(_a);
            }
            finally { if (e_2) throw e_2.error; }
        }
        return records;
        var e_2, _c;
    };
    // http://www.w3.org/TR/2015/REC-IndexedDB-20150108/#dfn-steps-for-storing-a-record-into-an-object-store
    ObjectStore.prototype.storeRecord = function (newRecord, noOverwrite, rollbackLog) {
        var _this = this;
        if (this.keyPath !== null) {
            var key = extractKey_1.default(this.keyPath, newRecord.value);
            if (key !== undefined) {
                newRecord.key = key;
            }
        }
        if (this.keyGenerator !== null && newRecord.key === undefined) {
            if (rollbackLog) {
                var keyGeneratorBefore_1 = this.keyGenerator.num;
                rollbackLog.push(function () {
                    if (_this.keyGenerator) {
                        _this.keyGenerator.num = keyGeneratorBefore_1;
                    }
                });
            }
            newRecord.key = this.keyGenerator.next();
            // Set in value if keyPath defiend but led to no key
            // http://www.w3.org/TR/2015/REC-IndexedDB-20150108/#dfn-steps-to-assign-a-key-to-a-value-using-a-key-path
            if (this.keyPath !== null) {
                if (Array.isArray(this.keyPath)) {
                    throw new Error("Cannot have an array key path in an object store with a key generator");
                }
                var remainingKeyPath = this.keyPath;
                var object = newRecord.value;
                var identifier = void 0;
                var i = 0; // Just to run the loop at least once
                while (i >= 0) {
                    if (typeof object !== "object") {
                        throw new errors_1.DataError();
                    }
                    i = remainingKeyPath.indexOf(".");
                    if (i >= 0) {
                        identifier = remainingKeyPath.slice(0, i);
                        remainingKeyPath = remainingKeyPath.slice(i + 1);
                        if (!object.hasOwnProperty(identifier)) {
                            object[identifier] = {};
                        }
                        object = object[identifier];
                    }
                }
                identifier = remainingKeyPath;
                object[identifier] = newRecord.key;
            }
        }
        else if (this.keyGenerator !== null && typeof newRecord.key === "number") {
            this.keyGenerator.setIfLarger(newRecord.key);
        }
        var existingRecord = this.records.get(newRecord.key);
        if (existingRecord) {
            if (noOverwrite) {
                throw new errors_1.ConstraintError();
            }
            this.deleteRecord(newRecord.key, rollbackLog);
        }
        this.records.add(newRecord);
        try {
            // Update indexes
            for (var _a = __values(this.rawIndexes.values()), _b = _a.next(); !_b.done; _b = _a.next()) {
                var rawIndex = _b.value;
                if (rawIndex.initialized) {
                    rawIndex.storeRecord(newRecord);
                }
            }
        }
        catch (e_3_1) { e_3 = { error: e_3_1 }; }
        finally {
            try {
                if (_b && !_b.done && (_c = _a.return)) _c.call(_a);
            }
            finally { if (e_3) throw e_3.error; }
        }
        if (rollbackLog) {
            rollbackLog.push(this.deleteRecord.bind(this, newRecord.key));
        }
        return newRecord.key;
        var e_3, _c;
    };
    // http://www.w3.org/TR/2015/REC-IndexedDB-20150108/#dfn-steps-for-deleting-records-from-an-object-store
    ObjectStore.prototype.deleteRecord = function (key, rollbackLog) {
        var deletedRecords = this.records.delete(key);
        if (rollbackLog) {
            try {
                for (var deletedRecords_1 = __values(deletedRecords), deletedRecords_1_1 = deletedRecords_1.next(); !deletedRecords_1_1.done; deletedRecords_1_1 = deletedRecords_1.next()) {
                    var record = deletedRecords_1_1.value;
                    rollbackLog.push(this.storeRecord.bind(this, record, true));
                }
            }
            catch (e_4_1) { e_4 = { error: e_4_1 }; }
            finally {
                try {
                    if (deletedRecords_1_1 && !deletedRecords_1_1.done && (_a = deletedRecords_1.return)) _a.call(deletedRecords_1);
                }
                finally { if (e_4) throw e_4.error; }
            }
        }
        try {
            for (var _b = __values(this.rawIndexes.values()), _c = _b.next(); !_c.done; _c = _b.next()) {
                var rawIndex = _c.value;
                rawIndex.records.deleteByValue(key);
            }
        }
        catch (e_5_1) { e_5 = { error: e_5_1 }; }
        finally {
            try {
                if (_c && !_c.done && (_d = _b.return)) _d.call(_b);
            }
            finally { if (e_5) throw e_5.error; }
        }
        var e_4, _a, e_5, _d;
    };
    // http://www.w3.org/TR/2015/REC-IndexedDB-20150108/#dfn-steps-for-clearing-an-object-store
    ObjectStore.prototype.clear = function (rollbackLog) {
        var deletedRecords = this.records.clear();
        if (rollbackLog) {
            try {
                for (var deletedRecords_2 = __values(deletedRecords), deletedRecords_2_1 = deletedRecords_2.next(); !deletedRecords_2_1.done; deletedRecords_2_1 = deletedRecords_2.next()) {
                    var record = deletedRecords_2_1.value;
                    rollbackLog.push(this.storeRecord.bind(this, record, true));
                }
            }
            catch (e_6_1) { e_6 = { error: e_6_1 }; }
            finally {
                try {
                    if (deletedRecords_2_1 && !deletedRecords_2_1.done && (_a = deletedRecords_2.return)) _a.call(deletedRecords_2);
                }
                finally { if (e_6) throw e_6.error; }
            }
        }
        try {
            for (var _b = __values(this.rawIndexes.values()), _c = _b.next(); !_c.done; _c = _b.next()) {
                var rawIndex = _c.value;
                rawIndex.records.clear();
            }
        }
        catch (e_7_1) { e_7 = { error: e_7_1 }; }
        finally {
            try {
                if (_c && !_c.done && (_d = _b.return)) _d.call(_b);
            }
            finally { if (e_7) throw e_7.error; }
        }
        var e_6, _a, e_7, _d;
    };
    return ObjectStore;
}());
exports.default = ObjectStore;


/***/ }),
/* 346 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var errors_1 = __webpack_require__(10);
var MAX_KEY = 9007199254740992;
var KeyGenerator = (function () {
    function KeyGenerator() {
        // This is kind of wrong. Should start at 1 and increment only after record is saved
        this.num = 0;
    }
    KeyGenerator.prototype.next = function () {
        if (this.num >= MAX_KEY) {
            throw new errors_1.ConstraintError();
        }
        this.num += 1;
        return this.num;
    };
    // https://w3c.github.io/IndexedDB/#possibly-update-the-key-generator
    KeyGenerator.prototype.setIfLarger = function (num) {
        var value = Math.floor(Math.min(num, MAX_KEY)) - 1;
        if (value >= this.num) {
            this.num = value + 1;
        }
    };
    return KeyGenerator;
}());
exports.default = KeyGenerator;


/***/ }),
/* 347 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var FDBRequest_1 = __webpack_require__(69);
var FDBOpenDBRequest = (function (_super) {
    __extends(FDBOpenDBRequest, _super);
    function FDBOpenDBRequest() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.onupgradeneeded = null;
        _this.onblocked = null;
        return _this;
    }
    FDBOpenDBRequest.prototype.toString = function () {
        return "[object IDBOpenDBRequest]";
    };
    return FDBOpenDBRequest;
}(FDBRequest_1.default));
exports.default = FDBOpenDBRequest;


/***/ }),
/* 348 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var FakeEvent_1 = __webpack_require__(102);
var FDBVersionChangeEvent = (function (_super) {
    __extends(FDBVersionChangeEvent, _super);
    function FDBVersionChangeEvent(type, parameters) {
        if (parameters === void 0) { parameters = {}; }
        var _this = _super.call(this, type) || this;
        _this.newVersion = parameters.newVersion !== undefined ? parameters.newVersion : null;
        _this.oldVersion = parameters.oldVersion !== undefined ? parameters.oldVersion : 0;
        return _this;
    }
    FDBVersionChangeEvent.prototype.toString = function () {
        return "[object IDBVersionChangeEvent]";
    };
    return FDBVersionChangeEvent;
}(FakeEvent_1.default));
exports.default = FDBVersionChangeEvent;


/***/ }),
/* 349 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(setImmediate) {
Object.defineProperty(exports, "__esModule", { value: true });
// http://www.w3.org/TR/2015/REC-IndexedDB-20150108/#dfn-database
var Database = (function () {
    function Database(name, version) {
        this.deletePending = false;
        this.transactions = [];
        this.rawObjectStores = new Map();
        this.connections = [];
        this.name = name;
        this.version = version;
        this.processTransactions = this.processTransactions.bind(this);
    }
    Database.prototype.processTransactions = function () {
        var _this = this;
        setImmediate(function () {
            var anyRunning = _this.transactions.some(function (transaction) {
                return transaction._started && !transaction._finished;
            });
            if (!anyRunning) {
                var next = _this.transactions.find(function (transaction) {
                    return !transaction._started && !transaction._finished;
                });
                if (next) {
                    next._start();
                    next.addEventListener("complete", _this.processTransactions);
                    next.addEventListener("abort", _this.processTransactions);
                }
            }
        });
    };
    return Database;
}());
exports.default = Database;

/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(65).setImmediate))

/***/ })
/******/ ]);