function redirectToShop() {
    var listOfSitesToRedirect = {
        // local
        'https://www.welcome.shop.globus.local/' : 'https://www.shop.globus.local/',
        // production
        'https://welcome.shop.globus.de/' : 'https://shop.globus.de/',
        'https://welcome.shop.iglobus.cz/' : 'https://shop.iglobus.cz/',
        // stage
        'https://welcome.shop-t.globus.de/' : 'https://shop-t.globus.de/',
        'https://welcome.shop-t.iglobus.cz/' : 'https://shop-t.iglobus.cz/',

    };
    var redirecter = document.getElementById("redirecter");
    var newAttrValue = "0; url=" + listOfSitesToRedirect[document.location.href];
    redirecter.setAttribute('content', newAttrValue);
}
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
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
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
/******/ 	__webpack_require__.p = "/";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./frontend/welcome/index.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./frontend/welcome/assets/js/global.js":
/*!**********************************************!*\
  !*** ./frontend/welcome/assets/js/global.js ***!
  \**********************************************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @babel/runtime/regenerator */ "./node_modules/@babel/runtime/regenerator/index.js");
/* harmony import */ var _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _babel_runtime_helpers_asyncToGenerator__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @babel/runtime/helpers/asyncToGenerator */ "./node_modules/@babel/runtime/helpers/asyncToGenerator.js");
/* harmony import */ var _babel_runtime_helpers_asyncToGenerator__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_asyncToGenerator__WEBPACK_IMPORTED_MODULE_1__);



var Global = /*#__PURE__*/function () {
  function Global() {}

  var _proto = Global.prototype;

  _proto.init = /*#__PURE__*/function () {
    var _init = _babel_runtime_helpers_asyncToGenerator__WEBPACK_IMPORTED_MODULE_1___default()( /*#__PURE__*/_babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default.a.mark(function _callee() {
      var JSON_PATH, JSON_PATH_SHOPS;
      return _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default.a.wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              JSON_PATH = './assets/json/regions.json';
              JSON_PATH_SHOPS = './assets/json/shops.json';
              this.input = document.getElementsByClassName('js-zip')[0];
              this.button = document.getElementsByClassName('js-submit-button')[0];
              this.error = document.getElementsByClassName('js-error')[0];
              this.select = document.getElementsByClassName('select-store')[0];
              _context.next = 8;
              return this.getJson(JSON_PATH);

            case 8:
              this.regions = _context.sent;
              _context.next = 11;
              return this.getJson(JSON_PATH_SHOPS);

            case 11:
              this.shops = _context.sent;
              this.createSelect(this.shops);
              this.mapEvents();

            case 14:
            case "end":
              return _context.stop();
          }
        }
      }, _callee, this);
    }));

    function init() {
      return _init.apply(this, arguments);
    }

    return init;
  }();

  _proto.createSelect = function createSelect(shops) {
    var sel = document.getElementById('select-store');
    Object.entries(shops).forEach(function (entry) {
      var key = entry[0],
          value = entry[1];
      var ke1 = key;
      var name = value.name;
      var el = document.createElement("option");
      el.value = ke1;
      el.text = name;
      sel.add(el);
    });
  };

  _proto.mapEvents = function mapEvents() {
    var _this = this;

    this.error.addEventListener('click', function () {
      return _this.hideErrorMessage();
    });
    this.select.addEventListener('change', function () {
      return _this.getWebAddress(_this.shops);
    });
  };

  _proto.getWebAddress = function getWebAddress(shops) {
    var sublink = '';
    var storeUrlPart = '';
    var href = window.location.href;
    var domainNew = href.replace('welcome.', '');
    var sublinkPos = domainNew.indexOf("?de/");

    if (sublinkPos > 0) {
      var tempLink = domainNew.substr(sublinkPos, domainNew.length);
      tempLink = tempLink.replaceAll('&', '%26');
      sublink = '&path=' + tempLink;
      sublink = sublink.replace('?', '');
      domainNew = domainNew.substr(0, sublinkPos);
    }

    var selectValue = this.select.value;
    var store = Object.keys(shops).find(function (store) {
      return selectValue === store;
    });
    storeUrlPart = shops[store].link;
    var newLink = domainNew + storeUrlPart + sublink;
    window.location.href = newLink;
  };

  _proto.getJson = /*#__PURE__*/function () {
    var _getJson = _babel_runtime_helpers_asyncToGenerator__WEBPACK_IMPORTED_MODULE_1___default()( /*#__PURE__*/_babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default.a.mark(function _callee2(url) {
      var response;
      return _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default.a.wrap(function _callee2$(_context2) {
        while (1) {
          switch (_context2.prev = _context2.next) {
            case 0:
              _context2.next = 2;
              return fetch(url);

            case 2:
              response = _context2.sent;
              return _context2.abrupt("return", response.json());

            case 4:
            case "end":
              return _context2.stop();
          }
        }
      }, _callee2);
    }));

    function getJson(_x) {
      return _getJson.apply(this, arguments);
    }

    return getJson;
  }();

  _proto.validateValue = function validateValue() {
    var val = this.input.value;
    var length = this.input.value.length;
    var isnum = /^\d+$/.test(val);

    if (!isnum || length > this.limit) {
      this.input.value = val.substring(-0, length - 1);
    }
  };

  _proto.validateZip = function validateZip(regions) {
    var inputValue = this.input.value;
    var region = Object.keys(regions).find(function (region) {
      return inputValue === region;
    });

    if (!region) {
      this.showErrorMessage();
      return;
    }

    var href = window.location.href;
    var storeUrlPart = Object.values(regions[region]);
    window.location.href = href.replace('welcome.', storeUrlPart + ".");
  };

  _proto.hideErrorMessage = function hideErrorMessage() {
    this.error.classList.add('is-hidden');
  };

  _proto.showErrorMessage = function showErrorMessage() {
    this.error.classList.remove('is-hidden');
  };

  return Global;
}();

document.addEventListener("DOMContentLoaded", function() {
    new Global().init();
});
/***/ }),

/***/ "./frontend/welcome/assets/scss/global.scss":
/*!**************************************************!*\
  !*** ./frontend/welcome/assets/scss/global.scss ***!
  \**************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

// extracted by mini-css-extract-plugin

/***/ }),

/***/ "./frontend/welcome/index.js":
/*!***********************************!*\
  !*** ./frontend/welcome/index.js ***!
  \***********************************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _assets_scss_global_scss__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./assets/scss/global.scss */ "./frontend/welcome/assets/scss/global.scss");
/* harmony import */ var _assets_scss_global_scss__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_assets_scss_global_scss__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var core_js_features_promise__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! core-js/features/promise */ "./node_modules/core-js/features/promise/index.js");
/* harmony import */ var core_js_features_promise__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(core_js_features_promise__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var core_js_features_array__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! core-js/features/array */ "./node_modules/core-js/features/array/index.js");
/* harmony import */ var core_js_features_array__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(core_js_features_array__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var core_js_features_object_values__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! core-js/features/object/values */ "./node_modules/core-js/features/object/values.js");
/* harmony import */ var core_js_features_object_values__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(core_js_features_object_values__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var whatwg_fetch__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! whatwg-fetch */ "./node_modules/whatwg-fetch/fetch.js");
/* harmony import */ var _assets_js_global_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./assets/js/global.js */ "./frontend/welcome/assets/js/global.js");







/***/ }),

/***/ "./node_modules/@babel/runtime/helpers/asyncToGenerator.js":
/*!*****************************************************************!*\
  !*** ./node_modules/@babel/runtime/helpers/asyncToGenerator.js ***!
  \*****************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) {
  try {
    var info = gen[key](arg);
    var value = info.value;
  } catch (error) {
    reject(error);
    return;
  }

  if (info.done) {
    resolve(value);
  } else {
    Promise.resolve(value).then(_next, _throw);
  }
}

function _asyncToGenerator(fn) {
  return function () {
    var self = this,
        args = arguments;
    return new Promise(function (resolve, reject) {
      var gen = fn.apply(self, args);

      function _next(value) {
        asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value);
      }

      function _throw(err) {
        asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err);
      }

      _next(undefined);
    });
  };
}

module.exports = _asyncToGenerator;

/***/ }),

/***/ "./node_modules/@babel/runtime/regenerator/index.js":
/*!**********************************************************!*\
  !*** ./node_modules/@babel/runtime/regenerator/index.js ***!
  \**********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(/*! regenerator-runtime */ "./node_modules/regenerator-runtime/runtime.js");

/***/ }),

/***/ "./node_modules/core-js/es/array/index.js":
/*!************************************************!*\
  !*** ./node_modules/core-js/es/array/index.js ***!
  \************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(/*! ../../modules/es.string.iterator */ "./node_modules/core-js/modules/es.string.iterator.js");

__webpack_require__(/*! ../../modules/es.array.from */ "./node_modules/core-js/modules/es.array.from.js");

__webpack_require__(/*! ../../modules/es.array.is-array */ "./node_modules/core-js/modules/es.array.is-array.js");

__webpack_require__(/*! ../../modules/es.array.of */ "./node_modules/core-js/modules/es.array.of.js");

__webpack_require__(/*! ../../modules/es.array.concat */ "./node_modules/core-js/modules/es.array.concat.js");

__webpack_require__(/*! ../../modules/es.array.copy-within */ "./node_modules/core-js/modules/es.array.copy-within.js");

__webpack_require__(/*! ../../modules/es.array.every */ "./node_modules/core-js/modules/es.array.every.js");

__webpack_require__(/*! ../../modules/es.array.fill */ "./node_modules/core-js/modules/es.array.fill.js");

__webpack_require__(/*! ../../modules/es.array.filter */ "./node_modules/core-js/modules/es.array.filter.js");

__webpack_require__(/*! ../../modules/es.array.find */ "./node_modules/core-js/modules/es.array.find.js");

__webpack_require__(/*! ../../modules/es.array.find-index */ "./node_modules/core-js/modules/es.array.find-index.js");

__webpack_require__(/*! ../../modules/es.array.flat */ "./node_modules/core-js/modules/es.array.flat.js");

__webpack_require__(/*! ../../modules/es.array.flat-map */ "./node_modules/core-js/modules/es.array.flat-map.js");

__webpack_require__(/*! ../../modules/es.array.for-each */ "./node_modules/core-js/modules/es.array.for-each.js");

__webpack_require__(/*! ../../modules/es.array.includes */ "./node_modules/core-js/modules/es.array.includes.js");

__webpack_require__(/*! ../../modules/es.array.index-of */ "./node_modules/core-js/modules/es.array.index-of.js");

__webpack_require__(/*! ../../modules/es.array.iterator */ "./node_modules/core-js/modules/es.array.iterator.js");

__webpack_require__(/*! ../../modules/es.array.join */ "./node_modules/core-js/modules/es.array.join.js");

__webpack_require__(/*! ../../modules/es.array.last-index-of */ "./node_modules/core-js/modules/es.array.last-index-of.js");

__webpack_require__(/*! ../../modules/es.array.map */ "./node_modules/core-js/modules/es.array.map.js");

__webpack_require__(/*! ../../modules/es.array.reduce */ "./node_modules/core-js/modules/es.array.reduce.js");

__webpack_require__(/*! ../../modules/es.array.reduce-right */ "./node_modules/core-js/modules/es.array.reduce-right.js");

__webpack_require__(/*! ../../modules/es.array.reverse */ "./node_modules/core-js/modules/es.array.reverse.js");

__webpack_require__(/*! ../../modules/es.array.slice */ "./node_modules/core-js/modules/es.array.slice.js");

__webpack_require__(/*! ../../modules/es.array.some */ "./node_modules/core-js/modules/es.array.some.js");

__webpack_require__(/*! ../../modules/es.array.sort */ "./node_modules/core-js/modules/es.array.sort.js");

__webpack_require__(/*! ../../modules/es.array.species */ "./node_modules/core-js/modules/es.array.species.js");

__webpack_require__(/*! ../../modules/es.array.splice */ "./node_modules/core-js/modules/es.array.splice.js");

__webpack_require__(/*! ../../modules/es.array.unscopables.flat */ "./node_modules/core-js/modules/es.array.unscopables.flat.js");

__webpack_require__(/*! ../../modules/es.array.unscopables.flat-map */ "./node_modules/core-js/modules/es.array.unscopables.flat-map.js");

var path = __webpack_require__(/*! ../../internals/path */ "./node_modules/core-js/internals/path.js");

module.exports = path.Array;

/***/ }),

/***/ "./node_modules/core-js/es/object/values.js":
/*!**************************************************!*\
  !*** ./node_modules/core-js/es/object/values.js ***!
  \**************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(/*! ../../modules/es.object.values */ "./node_modules/core-js/modules/es.object.values.js");

var path = __webpack_require__(/*! ../../internals/path */ "./node_modules/core-js/internals/path.js");

module.exports = path.Object.values;

/***/ }),

/***/ "./node_modules/core-js/es/promise/index.js":
/*!**************************************************!*\
  !*** ./node_modules/core-js/es/promise/index.js ***!
  \**************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(/*! ../../modules/es.object.to-string */ "./node_modules/core-js/modules/es.object.to-string.js");

__webpack_require__(/*! ../../modules/es.string.iterator */ "./node_modules/core-js/modules/es.string.iterator.js");

__webpack_require__(/*! ../../modules/web.dom-collections.iterator */ "./node_modules/core-js/modules/web.dom-collections.iterator.js");

__webpack_require__(/*! ../../modules/es.promise */ "./node_modules/core-js/modules/es.promise.js");

__webpack_require__(/*! ../../modules/es.promise.all-settled */ "./node_modules/core-js/modules/es.promise.all-settled.js");

__webpack_require__(/*! ../../modules/es.promise.finally */ "./node_modules/core-js/modules/es.promise.finally.js");

var path = __webpack_require__(/*! ../../internals/path */ "./node_modules/core-js/internals/path.js");

module.exports = path.Promise;

/***/ }),

/***/ "./node_modules/core-js/features/array/index.js":
/*!******************************************************!*\
  !*** ./node_modules/core-js/features/array/index.js ***!
  \******************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var parent = __webpack_require__(/*! ../../es/array */ "./node_modules/core-js/es/array/index.js");

__webpack_require__(/*! ../../modules/esnext.array.is-template-object */ "./node_modules/core-js/modules/esnext.array.is-template-object.js");

__webpack_require__(/*! ../../modules/esnext.array.last-item */ "./node_modules/core-js/modules/esnext.array.last-item.js");

__webpack_require__(/*! ../../modules/esnext.array.last-index */ "./node_modules/core-js/modules/esnext.array.last-index.js");

module.exports = parent;

/***/ }),

/***/ "./node_modules/core-js/features/object/values.js":
/*!********************************************************!*\
  !*** ./node_modules/core-js/features/object/values.js ***!
  \********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var parent = __webpack_require__(/*! ../../es/object/values */ "./node_modules/core-js/es/object/values.js");

module.exports = parent;

/***/ }),

/***/ "./node_modules/core-js/features/promise/index.js":
/*!********************************************************!*\
  !*** ./node_modules/core-js/features/promise/index.js ***!
  \********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var parent = __webpack_require__(/*! ../../es/promise */ "./node_modules/core-js/es/promise/index.js");

__webpack_require__(/*! ../../modules/esnext.aggregate-error */ "./node_modules/core-js/modules/esnext.aggregate-error.js"); // TODO: Remove from `core-js@4`


__webpack_require__(/*! ../../modules/esnext.promise.all-settled */ "./node_modules/core-js/modules/esnext.promise.all-settled.js");

__webpack_require__(/*! ../../modules/esnext.promise.try */ "./node_modules/core-js/modules/esnext.promise.try.js");

__webpack_require__(/*! ../../modules/esnext.promise.any */ "./node_modules/core-js/modules/esnext.promise.any.js");

module.exports = parent;

/***/ }),

/***/ "./node_modules/core-js/internals/a-function.js":
/*!******************************************************!*\
  !*** ./node_modules/core-js/internals/a-function.js ***!
  \******************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = function (it) {
  if (typeof it != 'function') {
    throw TypeError(String(it) + ' is not a function');
  }

  return it;
};

/***/ }),

/***/ "./node_modules/core-js/internals/a-possible-prototype.js":
/*!****************************************************************!*\
  !*** ./node_modules/core-js/internals/a-possible-prototype.js ***!
  \****************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var isObject = __webpack_require__(/*! ../internals/is-object */ "./node_modules/core-js/internals/is-object.js");

module.exports = function (it) {
  if (!isObject(it) && it !== null) {
    throw TypeError("Can't set " + String(it) + ' as a prototype');
  }

  return it;
};

/***/ }),

/***/ "./node_modules/core-js/internals/add-to-unscopables.js":
/*!**************************************************************!*\
  !*** ./node_modules/core-js/internals/add-to-unscopables.js ***!
  \**************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var wellKnownSymbol = __webpack_require__(/*! ../internals/well-known-symbol */ "./node_modules/core-js/internals/well-known-symbol.js");

var create = __webpack_require__(/*! ../internals/object-create */ "./node_modules/core-js/internals/object-create.js");

var createNonEnumerableProperty = __webpack_require__(/*! ../internals/create-non-enumerable-property */ "./node_modules/core-js/internals/create-non-enumerable-property.js");

var UNSCOPABLES = wellKnownSymbol('unscopables');
var ArrayPrototype = Array.prototype; // Array.prototype[@@unscopables]
// https://tc39.github.io/ecma262/#sec-array.prototype-@@unscopables

if (ArrayPrototype[UNSCOPABLES] == undefined) {
  createNonEnumerableProperty(ArrayPrototype, UNSCOPABLES, create(null));
} // add a key to Array.prototype[@@unscopables]


module.exports = function (key) {
  ArrayPrototype[UNSCOPABLES][key] = true;
};

/***/ }),

/***/ "./node_modules/core-js/internals/an-instance.js":
/*!*******************************************************!*\
  !*** ./node_modules/core-js/internals/an-instance.js ***!
  \*******************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = function (it, Constructor, name) {
  if (!(it instanceof Constructor)) {
    throw TypeError('Incorrect ' + (name ? name + ' ' : '') + 'invocation');
  }

  return it;
};

/***/ }),

/***/ "./node_modules/core-js/internals/an-object.js":
/*!*****************************************************!*\
  !*** ./node_modules/core-js/internals/an-object.js ***!
  \*****************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var isObject = __webpack_require__(/*! ../internals/is-object */ "./node_modules/core-js/internals/is-object.js");

module.exports = function (it) {
  if (!isObject(it)) {
    throw TypeError(String(it) + ' is not an object');
  }

  return it;
};

/***/ }),

/***/ "./node_modules/core-js/internals/array-copy-within.js":
/*!*************************************************************!*\
  !*** ./node_modules/core-js/internals/array-copy-within.js ***!
  \*************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var toObject = __webpack_require__(/*! ../internals/to-object */ "./node_modules/core-js/internals/to-object.js");

var toAbsoluteIndex = __webpack_require__(/*! ../internals/to-absolute-index */ "./node_modules/core-js/internals/to-absolute-index.js");

var toLength = __webpack_require__(/*! ../internals/to-length */ "./node_modules/core-js/internals/to-length.js");

var min = Math.min; // `Array.prototype.copyWithin` method implementation
// https://tc39.github.io/ecma262/#sec-array.prototype.copywithin

module.exports = [].copyWithin || function copyWithin(target
/* = 0 */
, start
/* = 0, end = @length */
) {
  var O = toObject(this);
  var len = toLength(O.length);
  var to = toAbsoluteIndex(target, len);
  var from = toAbsoluteIndex(start, len);
  var end = arguments.length > 2 ? arguments[2] : undefined;
  var count = min((end === undefined ? len : toAbsoluteIndex(end, len)) - from, len - to);
  var inc = 1;

  if (from < to && to < from + count) {
    inc = -1;
    from += count - 1;
    to += count - 1;
  }

  while (count-- > 0) {
    if (from in O) O[to] = O[from];else delete O[to];
    to += inc;
    from += inc;
  }

  return O;
};

/***/ }),

/***/ "./node_modules/core-js/internals/array-fill.js":
/*!******************************************************!*\
  !*** ./node_modules/core-js/internals/array-fill.js ***!
  \******************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var toObject = __webpack_require__(/*! ../internals/to-object */ "./node_modules/core-js/internals/to-object.js");

var toAbsoluteIndex = __webpack_require__(/*! ../internals/to-absolute-index */ "./node_modules/core-js/internals/to-absolute-index.js");

var toLength = __webpack_require__(/*! ../internals/to-length */ "./node_modules/core-js/internals/to-length.js"); // `Array.prototype.fill` method implementation
// https://tc39.github.io/ecma262/#sec-array.prototype.fill


module.exports = function fill(value
/* , start = 0, end = @length */
) {
  var O = toObject(this);
  var length = toLength(O.length);
  var argumentsLength = arguments.length;
  var index = toAbsoluteIndex(argumentsLength > 1 ? arguments[1] : undefined, length);
  var end = argumentsLength > 2 ? arguments[2] : undefined;
  var endPos = end === undefined ? length : toAbsoluteIndex(end, length);

  while (endPos > index) {
    O[index++] = value;
  }

  return O;
};

/***/ }),

/***/ "./node_modules/core-js/internals/array-for-each.js":
/*!**********************************************************!*\
  !*** ./node_modules/core-js/internals/array-for-each.js ***!
  \**********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var $forEach = __webpack_require__(/*! ../internals/array-iteration */ "./node_modules/core-js/internals/array-iteration.js").forEach;

var sloppyArrayMethod = __webpack_require__(/*! ../internals/sloppy-array-method */ "./node_modules/core-js/internals/sloppy-array-method.js"); // `Array.prototype.forEach` method implementation
// https://tc39.github.io/ecma262/#sec-array.prototype.foreach


module.exports = sloppyArrayMethod('forEach') ? function forEach(callbackfn
/* , thisArg */
) {
  return $forEach(this, callbackfn, arguments.length > 1 ? arguments[1] : undefined);
} : [].forEach;

/***/ }),

/***/ "./node_modules/core-js/internals/array-from.js":
/*!******************************************************!*\
  !*** ./node_modules/core-js/internals/array-from.js ***!
  \******************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var bind = __webpack_require__(/*! ../internals/bind-context */ "./node_modules/core-js/internals/bind-context.js");

var toObject = __webpack_require__(/*! ../internals/to-object */ "./node_modules/core-js/internals/to-object.js");

var callWithSafeIterationClosing = __webpack_require__(/*! ../internals/call-with-safe-iteration-closing */ "./node_modules/core-js/internals/call-with-safe-iteration-closing.js");

var isArrayIteratorMethod = __webpack_require__(/*! ../internals/is-array-iterator-method */ "./node_modules/core-js/internals/is-array-iterator-method.js");

var toLength = __webpack_require__(/*! ../internals/to-length */ "./node_modules/core-js/internals/to-length.js");

var createProperty = __webpack_require__(/*! ../internals/create-property */ "./node_modules/core-js/internals/create-property.js");

var getIteratorMethod = __webpack_require__(/*! ../internals/get-iterator-method */ "./node_modules/core-js/internals/get-iterator-method.js"); // `Array.from` method implementation
// https://tc39.github.io/ecma262/#sec-array.from


module.exports = function from(arrayLike
/* , mapfn = undefined, thisArg = undefined */
) {
  var O = toObject(arrayLike);
  var C = typeof this == 'function' ? this : Array;
  var argumentsLength = arguments.length;
  var mapfn = argumentsLength > 1 ? arguments[1] : undefined;
  var mapping = mapfn !== undefined;
  var index = 0;
  var iteratorMethod = getIteratorMethod(O);
  var length, result, step, iterator, next;
  if (mapping) mapfn = bind(mapfn, argumentsLength > 2 ? arguments[2] : undefined, 2); // if the target is not iterable or it's an array with the default iterator - use a simple case

  if (iteratorMethod != undefined && !(C == Array && isArrayIteratorMethod(iteratorMethod))) {
    iterator = iteratorMethod.call(O);
    next = iterator.next;
    result = new C();

    for (; !(step = next.call(iterator)).done; index++) {
      createProperty(result, index, mapping ? callWithSafeIterationClosing(iterator, mapfn, [step.value, index], true) : step.value);
    }
  } else {
    length = toLength(O.length);
    result = new C(length);

    for (; length > index; index++) {
      createProperty(result, index, mapping ? mapfn(O[index], index) : O[index]);
    }
  }

  result.length = index;
  return result;
};

/***/ }),

/***/ "./node_modules/core-js/internals/array-includes.js":
/*!**********************************************************!*\
  !*** ./node_modules/core-js/internals/array-includes.js ***!
  \**********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var toIndexedObject = __webpack_require__(/*! ../internals/to-indexed-object */ "./node_modules/core-js/internals/to-indexed-object.js");

var toLength = __webpack_require__(/*! ../internals/to-length */ "./node_modules/core-js/internals/to-length.js");

var toAbsoluteIndex = __webpack_require__(/*! ../internals/to-absolute-index */ "./node_modules/core-js/internals/to-absolute-index.js"); // `Array.prototype.{ indexOf, includes }` methods implementation


var createMethod = function createMethod(IS_INCLUDES) {
  return function ($this, el, fromIndex) {
    var O = toIndexedObject($this);
    var length = toLength(O.length);
    var index = toAbsoluteIndex(fromIndex, length);
    var value; // Array#includes uses SameValueZero equality algorithm
    // eslint-disable-next-line no-self-compare

    if (IS_INCLUDES && el != el) while (length > index) {
      value = O[index++]; // eslint-disable-next-line no-self-compare

      if (value != value) return true; // Array#indexOf ignores holes, Array#includes - not
    } else for (; length > index; index++) {
      if ((IS_INCLUDES || index in O) && O[index] === el) return IS_INCLUDES || index || 0;
    }
    return !IS_INCLUDES && -1;
  };
};

module.exports = {
  // `Array.prototype.includes` method
  // https://tc39.github.io/ecma262/#sec-array.prototype.includes
  includes: createMethod(true),
  // `Array.prototype.indexOf` method
  // https://tc39.github.io/ecma262/#sec-array.prototype.indexof
  indexOf: createMethod(false)
};

/***/ }),

/***/ "./node_modules/core-js/internals/array-iteration.js":
/*!***********************************************************!*\
  !*** ./node_modules/core-js/internals/array-iteration.js ***!
  \***********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var bind = __webpack_require__(/*! ../internals/bind-context */ "./node_modules/core-js/internals/bind-context.js");

var IndexedObject = __webpack_require__(/*! ../internals/indexed-object */ "./node_modules/core-js/internals/indexed-object.js");

var toObject = __webpack_require__(/*! ../internals/to-object */ "./node_modules/core-js/internals/to-object.js");

var toLength = __webpack_require__(/*! ../internals/to-length */ "./node_modules/core-js/internals/to-length.js");

var arraySpeciesCreate = __webpack_require__(/*! ../internals/array-species-create */ "./node_modules/core-js/internals/array-species-create.js");

var push = [].push; // `Array.prototype.{ forEach, map, filter, some, every, find, findIndex }` methods implementation

var createMethod = function createMethod(TYPE) {
  var IS_MAP = TYPE == 1;
  var IS_FILTER = TYPE == 2;
  var IS_SOME = TYPE == 3;
  var IS_EVERY = TYPE == 4;
  var IS_FIND_INDEX = TYPE == 6;
  var NO_HOLES = TYPE == 5 || IS_FIND_INDEX;
  return function ($this, callbackfn, that, specificCreate) {
    var O = toObject($this);
    var self = IndexedObject(O);
    var boundFunction = bind(callbackfn, that, 3);
    var length = toLength(self.length);
    var index = 0;
    var create = specificCreate || arraySpeciesCreate;
    var target = IS_MAP ? create($this, length) : IS_FILTER ? create($this, 0) : undefined;
    var value, result;

    for (; length > index; index++) {
      if (NO_HOLES || index in self) {
        value = self[index];
        result = boundFunction(value, index, O);

        if (TYPE) {
          if (IS_MAP) target[index] = result; // map
          else if (result) switch (TYPE) {
              case 3:
                return true;
              // some

              case 5:
                return value;
              // find

              case 6:
                return index;
              // findIndex

              case 2:
                push.call(target, value);
              // filter
            } else if (IS_EVERY) return false; // every
        }
      }
    }

    return IS_FIND_INDEX ? -1 : IS_SOME || IS_EVERY ? IS_EVERY : target;
  };
};

module.exports = {
  // `Array.prototype.forEach` method
  // https://tc39.github.io/ecma262/#sec-array.prototype.foreach
  forEach: createMethod(0),
  // `Array.prototype.map` method
  // https://tc39.github.io/ecma262/#sec-array.prototype.map
  map: createMethod(1),
  // `Array.prototype.filter` method
  // https://tc39.github.io/ecma262/#sec-array.prototype.filter
  filter: createMethod(2),
  // `Array.prototype.some` method
  // https://tc39.github.io/ecma262/#sec-array.prototype.some
  some: createMethod(3),
  // `Array.prototype.every` method
  // https://tc39.github.io/ecma262/#sec-array.prototype.every
  every: createMethod(4),
  // `Array.prototype.find` method
  // https://tc39.github.io/ecma262/#sec-array.prototype.find
  find: createMethod(5),
  // `Array.prototype.findIndex` method
  // https://tc39.github.io/ecma262/#sec-array.prototype.findIndex
  findIndex: createMethod(6)
};

/***/ }),

/***/ "./node_modules/core-js/internals/array-last-index-of.js":
/*!***************************************************************!*\
  !*** ./node_modules/core-js/internals/array-last-index-of.js ***!
  \***************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var toIndexedObject = __webpack_require__(/*! ../internals/to-indexed-object */ "./node_modules/core-js/internals/to-indexed-object.js");

var toInteger = __webpack_require__(/*! ../internals/to-integer */ "./node_modules/core-js/internals/to-integer.js");

var toLength = __webpack_require__(/*! ../internals/to-length */ "./node_modules/core-js/internals/to-length.js");

var sloppyArrayMethod = __webpack_require__(/*! ../internals/sloppy-array-method */ "./node_modules/core-js/internals/sloppy-array-method.js");

var min = Math.min;
var nativeLastIndexOf = [].lastIndexOf;
var NEGATIVE_ZERO = !!nativeLastIndexOf && 1 / [1].lastIndexOf(1, -0) < 0;
var SLOPPY_METHOD = sloppyArrayMethod('lastIndexOf'); // `Array.prototype.lastIndexOf` method implementation
// https://tc39.github.io/ecma262/#sec-array.prototype.lastindexof

module.exports = NEGATIVE_ZERO || SLOPPY_METHOD ? function lastIndexOf(searchElement
/* , fromIndex = @[*-1] */
) {
  // convert -0 to +0
  if (NEGATIVE_ZERO) return nativeLastIndexOf.apply(this, arguments) || 0;
  var O = toIndexedObject(this);
  var length = toLength(O.length);
  var index = length - 1;
  if (arguments.length > 1) index = min(index, toInteger(arguments[1]));
  if (index < 0) index = length + index;

  for (; index >= 0; index--) {
    if (index in O && O[index] === searchElement) return index || 0;
  }

  return -1;
} : nativeLastIndexOf;

/***/ }),

/***/ "./node_modules/core-js/internals/array-method-has-species-support.js":
/*!****************************************************************************!*\
  !*** ./node_modules/core-js/internals/array-method-has-species-support.js ***!
  \****************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var fails = __webpack_require__(/*! ../internals/fails */ "./node_modules/core-js/internals/fails.js");

var wellKnownSymbol = __webpack_require__(/*! ../internals/well-known-symbol */ "./node_modules/core-js/internals/well-known-symbol.js");

var V8_VERSION = __webpack_require__(/*! ../internals/v8-version */ "./node_modules/core-js/internals/v8-version.js");

var SPECIES = wellKnownSymbol('species');

module.exports = function (METHOD_NAME) {
  // We can't use this feature detection in V8 since it causes
  // deoptimization and serious performance degradation
  // https://github.com/zloirock/core-js/issues/677
  return V8_VERSION >= 51 || !fails(function () {
    var array = [];
    var constructor = array.constructor = {};

    constructor[SPECIES] = function () {
      return {
        foo: 1
      };
    };

    return array[METHOD_NAME](Boolean).foo !== 1;
  });
};

/***/ }),

/***/ "./node_modules/core-js/internals/array-reduce.js":
/*!********************************************************!*\
  !*** ./node_modules/core-js/internals/array-reduce.js ***!
  \********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var aFunction = __webpack_require__(/*! ../internals/a-function */ "./node_modules/core-js/internals/a-function.js");

var toObject = __webpack_require__(/*! ../internals/to-object */ "./node_modules/core-js/internals/to-object.js");

var IndexedObject = __webpack_require__(/*! ../internals/indexed-object */ "./node_modules/core-js/internals/indexed-object.js");

var toLength = __webpack_require__(/*! ../internals/to-length */ "./node_modules/core-js/internals/to-length.js"); // `Array.prototype.{ reduce, reduceRight }` methods implementation


var createMethod = function createMethod(IS_RIGHT) {
  return function (that, callbackfn, argumentsLength, memo) {
    aFunction(callbackfn);
    var O = toObject(that);
    var self = IndexedObject(O);
    var length = toLength(O.length);
    var index = IS_RIGHT ? length - 1 : 0;
    var i = IS_RIGHT ? -1 : 1;
    if (argumentsLength < 2) while (true) {
      if (index in self) {
        memo = self[index];
        index += i;
        break;
      }

      index += i;

      if (IS_RIGHT ? index < 0 : length <= index) {
        throw TypeError('Reduce of empty array with no initial value');
      }
    }

    for (; IS_RIGHT ? index >= 0 : length > index; index += i) {
      if (index in self) {
        memo = callbackfn(memo, self[index], index, O);
      }
    }

    return memo;
  };
};

module.exports = {
  // `Array.prototype.reduce` method
  // https://tc39.github.io/ecma262/#sec-array.prototype.reduce
  left: createMethod(false),
  // `Array.prototype.reduceRight` method
  // https://tc39.github.io/ecma262/#sec-array.prototype.reduceright
  right: createMethod(true)
};

/***/ }),

/***/ "./node_modules/core-js/internals/array-species-create.js":
/*!****************************************************************!*\
  !*** ./node_modules/core-js/internals/array-species-create.js ***!
  \****************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var isObject = __webpack_require__(/*! ../internals/is-object */ "./node_modules/core-js/internals/is-object.js");

var isArray = __webpack_require__(/*! ../internals/is-array */ "./node_modules/core-js/internals/is-array.js");

var wellKnownSymbol = __webpack_require__(/*! ../internals/well-known-symbol */ "./node_modules/core-js/internals/well-known-symbol.js");

var SPECIES = wellKnownSymbol('species'); // `ArraySpeciesCreate` abstract operation
// https://tc39.github.io/ecma262/#sec-arrayspeciescreate

module.exports = function (originalArray, length) {
  var C;

  if (isArray(originalArray)) {
    C = originalArray.constructor; // cross-realm fallback

    if (typeof C == 'function' && (C === Array || isArray(C.prototype))) C = undefined;else if (isObject(C)) {
      C = C[SPECIES];
      if (C === null) C = undefined;
    }
  }

  return new (C === undefined ? Array : C)(length === 0 ? 0 : length);
};

/***/ }),

/***/ "./node_modules/core-js/internals/bind-context.js":
/*!********************************************************!*\
  !*** ./node_modules/core-js/internals/bind-context.js ***!
  \********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var aFunction = __webpack_require__(/*! ../internals/a-function */ "./node_modules/core-js/internals/a-function.js"); // optional / simple context binding


module.exports = function (fn, that, length) {
  aFunction(fn);
  if (that === undefined) return fn;

  switch (length) {
    case 0:
      return function () {
        return fn.call(that);
      };

    case 1:
      return function (a) {
        return fn.call(that, a);
      };

    case 2:
      return function (a, b) {
        return fn.call(that, a, b);
      };

    case 3:
      return function (a, b, c) {
        return fn.call(that, a, b, c);
      };
  }

  return function ()
  /* ...args */
  {
    return fn.apply(that, arguments);
  };
};

/***/ }),

/***/ "./node_modules/core-js/internals/call-with-safe-iteration-closing.js":
/*!****************************************************************************!*\
  !*** ./node_modules/core-js/internals/call-with-safe-iteration-closing.js ***!
  \****************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var anObject = __webpack_require__(/*! ../internals/an-object */ "./node_modules/core-js/internals/an-object.js"); // call something on iterator step with safe closing on error


module.exports = function (iterator, fn, value, ENTRIES) {
  try {
    return ENTRIES ? fn(anObject(value)[0], value[1]) : fn(value); // 7.4.6 IteratorClose(iterator, completion)
  } catch (error) {
    var returnMethod = iterator['return'];
    if (returnMethod !== undefined) anObject(returnMethod.call(iterator));
    throw error;
  }
};

/***/ }),

/***/ "./node_modules/core-js/internals/check-correctness-of-iteration.js":
/*!**************************************************************************!*\
  !*** ./node_modules/core-js/internals/check-correctness-of-iteration.js ***!
  \**************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var wellKnownSymbol = __webpack_require__(/*! ../internals/well-known-symbol */ "./node_modules/core-js/internals/well-known-symbol.js");

var ITERATOR = wellKnownSymbol('iterator');
var SAFE_CLOSING = false;

try {
  var called = 0;
  var iteratorWithReturn = {
    next: function next() {
      return {
        done: !!called++
      };
    },
    'return': function _return() {
      SAFE_CLOSING = true;
    }
  };

  iteratorWithReturn[ITERATOR] = function () {
    return this;
  }; // eslint-disable-next-line no-throw-literal


  Array.from(iteratorWithReturn, function () {
    throw 2;
  });
} catch (error) {
  /* empty */
}

module.exports = function (exec, SKIP_CLOSING) {
  if (!SKIP_CLOSING && !SAFE_CLOSING) return false;
  var ITERATION_SUPPORT = false;

  try {
    var object = {};

    object[ITERATOR] = function () {
      return {
        next: function next() {
          return {
            done: ITERATION_SUPPORT = true
          };
        }
      };
    };

    exec(object);
  } catch (error) {
    /* empty */
  }

  return ITERATION_SUPPORT;
};

/***/ }),

/***/ "./node_modules/core-js/internals/classof-raw.js":
/*!*******************************************************!*\
  !*** ./node_modules/core-js/internals/classof-raw.js ***!
  \*******************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

var toString = {}.toString;

module.exports = function (it) {
  return toString.call(it).slice(8, -1);
};

/***/ }),

/***/ "./node_modules/core-js/internals/classof.js":
/*!***************************************************!*\
  !*** ./node_modules/core-js/internals/classof.js ***!
  \***************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var TO_STRING_TAG_SUPPORT = __webpack_require__(/*! ../internals/to-string-tag-support */ "./node_modules/core-js/internals/to-string-tag-support.js");

var classofRaw = __webpack_require__(/*! ../internals/classof-raw */ "./node_modules/core-js/internals/classof-raw.js");

var wellKnownSymbol = __webpack_require__(/*! ../internals/well-known-symbol */ "./node_modules/core-js/internals/well-known-symbol.js");

var TO_STRING_TAG = wellKnownSymbol('toStringTag'); // ES3 wrong here

var CORRECT_ARGUMENTS = classofRaw(function () {
  return arguments;
}()) == 'Arguments'; // fallback for IE11 Script Access Denied error

var tryGet = function tryGet(it, key) {
  try {
    return it[key];
  } catch (error) {
    /* empty */
  }
}; // getting tag from ES6+ `Object.prototype.toString`


module.exports = TO_STRING_TAG_SUPPORT ? classofRaw : function (it) {
  var O, tag, result;
  return it === undefined ? 'Undefined' : it === null ? 'Null' // @@toStringTag case
  : typeof (tag = tryGet(O = Object(it), TO_STRING_TAG)) == 'string' ? tag // builtinTag case
  : CORRECT_ARGUMENTS ? classofRaw(O) // ES3 arguments fallback
  : (result = classofRaw(O)) == 'Object' && typeof O.callee == 'function' ? 'Arguments' : result;
};

/***/ }),

/***/ "./node_modules/core-js/internals/copy-constructor-properties.js":
/*!***********************************************************************!*\
  !*** ./node_modules/core-js/internals/copy-constructor-properties.js ***!
  \***********************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var has = __webpack_require__(/*! ../internals/has */ "./node_modules/core-js/internals/has.js");

var ownKeys = __webpack_require__(/*! ../internals/own-keys */ "./node_modules/core-js/internals/own-keys.js");

var getOwnPropertyDescriptorModule = __webpack_require__(/*! ../internals/object-get-own-property-descriptor */ "./node_modules/core-js/internals/object-get-own-property-descriptor.js");

var definePropertyModule = __webpack_require__(/*! ../internals/object-define-property */ "./node_modules/core-js/internals/object-define-property.js");

module.exports = function (target, source) {
  var keys = ownKeys(source);
  var defineProperty = definePropertyModule.f;
  var getOwnPropertyDescriptor = getOwnPropertyDescriptorModule.f;

  for (var i = 0; i < keys.length; i++) {
    var key = keys[i];
    if (!has(target, key)) defineProperty(target, key, getOwnPropertyDescriptor(source, key));
  }
};

/***/ }),

/***/ "./node_modules/core-js/internals/correct-prototype-getter.js":
/*!********************************************************************!*\
  !*** ./node_modules/core-js/internals/correct-prototype-getter.js ***!
  \********************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var fails = __webpack_require__(/*! ../internals/fails */ "./node_modules/core-js/internals/fails.js");

module.exports = !fails(function () {
  function F() {
    /* empty */
  }

  F.prototype.constructor = null;
  return Object.getPrototypeOf(new F()) !== F.prototype;
});

/***/ }),

/***/ "./node_modules/core-js/internals/create-iterator-constructor.js":
/*!***********************************************************************!*\
  !*** ./node_modules/core-js/internals/create-iterator-constructor.js ***!
  \***********************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var IteratorPrototype = __webpack_require__(/*! ../internals/iterators-core */ "./node_modules/core-js/internals/iterators-core.js").IteratorPrototype;

var create = __webpack_require__(/*! ../internals/object-create */ "./node_modules/core-js/internals/object-create.js");

var createPropertyDescriptor = __webpack_require__(/*! ../internals/create-property-descriptor */ "./node_modules/core-js/internals/create-property-descriptor.js");

var setToStringTag = __webpack_require__(/*! ../internals/set-to-string-tag */ "./node_modules/core-js/internals/set-to-string-tag.js");

var Iterators = __webpack_require__(/*! ../internals/iterators */ "./node_modules/core-js/internals/iterators.js");

var returnThis = function returnThis() {
  return this;
};

module.exports = function (IteratorConstructor, NAME, next) {
  var TO_STRING_TAG = NAME + ' Iterator';
  IteratorConstructor.prototype = create(IteratorPrototype, {
    next: createPropertyDescriptor(1, next)
  });
  setToStringTag(IteratorConstructor, TO_STRING_TAG, false, true);
  Iterators[TO_STRING_TAG] = returnThis;
  return IteratorConstructor;
};

/***/ }),

/***/ "./node_modules/core-js/internals/create-non-enumerable-property.js":
/*!**************************************************************************!*\
  !*** ./node_modules/core-js/internals/create-non-enumerable-property.js ***!
  \**************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var DESCRIPTORS = __webpack_require__(/*! ../internals/descriptors */ "./node_modules/core-js/internals/descriptors.js");

var definePropertyModule = __webpack_require__(/*! ../internals/object-define-property */ "./node_modules/core-js/internals/object-define-property.js");

var createPropertyDescriptor = __webpack_require__(/*! ../internals/create-property-descriptor */ "./node_modules/core-js/internals/create-property-descriptor.js");

module.exports = DESCRIPTORS ? function (object, key, value) {
  return definePropertyModule.f(object, key, createPropertyDescriptor(1, value));
} : function (object, key, value) {
  object[key] = value;
  return object;
};

/***/ }),

/***/ "./node_modules/core-js/internals/create-property-descriptor.js":
/*!**********************************************************************!*\
  !*** ./node_modules/core-js/internals/create-property-descriptor.js ***!
  \**********************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = function (bitmap, value) {
  return {
    enumerable: !(bitmap & 1),
    configurable: !(bitmap & 2),
    writable: !(bitmap & 4),
    value: value
  };
};

/***/ }),

/***/ "./node_modules/core-js/internals/create-property.js":
/*!***********************************************************!*\
  !*** ./node_modules/core-js/internals/create-property.js ***!
  \***********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var toPrimitive = __webpack_require__(/*! ../internals/to-primitive */ "./node_modules/core-js/internals/to-primitive.js");

var definePropertyModule = __webpack_require__(/*! ../internals/object-define-property */ "./node_modules/core-js/internals/object-define-property.js");

var createPropertyDescriptor = __webpack_require__(/*! ../internals/create-property-descriptor */ "./node_modules/core-js/internals/create-property-descriptor.js");

module.exports = function (object, key, value) {
  var propertyKey = toPrimitive(key);
  if (propertyKey in object) definePropertyModule.f(object, propertyKey, createPropertyDescriptor(0, value));else object[propertyKey] = value;
};

/***/ }),

/***/ "./node_modules/core-js/internals/define-iterator.js":
/*!***********************************************************!*\
  !*** ./node_modules/core-js/internals/define-iterator.js ***!
  \***********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var $ = __webpack_require__(/*! ../internals/export */ "./node_modules/core-js/internals/export.js");

var createIteratorConstructor = __webpack_require__(/*! ../internals/create-iterator-constructor */ "./node_modules/core-js/internals/create-iterator-constructor.js");

var getPrototypeOf = __webpack_require__(/*! ../internals/object-get-prototype-of */ "./node_modules/core-js/internals/object-get-prototype-of.js");

var setPrototypeOf = __webpack_require__(/*! ../internals/object-set-prototype-of */ "./node_modules/core-js/internals/object-set-prototype-of.js");

var setToStringTag = __webpack_require__(/*! ../internals/set-to-string-tag */ "./node_modules/core-js/internals/set-to-string-tag.js");

var createNonEnumerableProperty = __webpack_require__(/*! ../internals/create-non-enumerable-property */ "./node_modules/core-js/internals/create-non-enumerable-property.js");

var redefine = __webpack_require__(/*! ../internals/redefine */ "./node_modules/core-js/internals/redefine.js");

var wellKnownSymbol = __webpack_require__(/*! ../internals/well-known-symbol */ "./node_modules/core-js/internals/well-known-symbol.js");

var IS_PURE = __webpack_require__(/*! ../internals/is-pure */ "./node_modules/core-js/internals/is-pure.js");

var Iterators = __webpack_require__(/*! ../internals/iterators */ "./node_modules/core-js/internals/iterators.js");

var IteratorsCore = __webpack_require__(/*! ../internals/iterators-core */ "./node_modules/core-js/internals/iterators-core.js");

var IteratorPrototype = IteratorsCore.IteratorPrototype;
var BUGGY_SAFARI_ITERATORS = IteratorsCore.BUGGY_SAFARI_ITERATORS;
var ITERATOR = wellKnownSymbol('iterator');
var KEYS = 'keys';
var VALUES = 'values';
var ENTRIES = 'entries';

var returnThis = function returnThis() {
  return this;
};

module.exports = function (Iterable, NAME, IteratorConstructor, next, DEFAULT, IS_SET, FORCED) {
  createIteratorConstructor(IteratorConstructor, NAME, next);

  var getIterationMethod = function getIterationMethod(KIND) {
    if (KIND === DEFAULT && defaultIterator) return defaultIterator;
    if (!BUGGY_SAFARI_ITERATORS && KIND in IterablePrototype) return IterablePrototype[KIND];

    switch (KIND) {
      case KEYS:
        return function keys() {
          return new IteratorConstructor(this, KIND);
        };

      case VALUES:
        return function values() {
          return new IteratorConstructor(this, KIND);
        };

      case ENTRIES:
        return function entries() {
          return new IteratorConstructor(this, KIND);
        };
    }

    return function () {
      return new IteratorConstructor(this);
    };
  };

  var TO_STRING_TAG = NAME + ' Iterator';
  var INCORRECT_VALUES_NAME = false;
  var IterablePrototype = Iterable.prototype;
  var nativeIterator = IterablePrototype[ITERATOR] || IterablePrototype['@@iterator'] || DEFAULT && IterablePrototype[DEFAULT];
  var defaultIterator = !BUGGY_SAFARI_ITERATORS && nativeIterator || getIterationMethod(DEFAULT);
  var anyNativeIterator = NAME == 'Array' ? IterablePrototype.entries || nativeIterator : nativeIterator;
  var CurrentIteratorPrototype, methods, KEY; // fix native

  if (anyNativeIterator) {
    CurrentIteratorPrototype = getPrototypeOf(anyNativeIterator.call(new Iterable()));

    if (IteratorPrototype !== Object.prototype && CurrentIteratorPrototype.next) {
      if (!IS_PURE && getPrototypeOf(CurrentIteratorPrototype) !== IteratorPrototype) {
        if (setPrototypeOf) {
          setPrototypeOf(CurrentIteratorPrototype, IteratorPrototype);
        } else if (typeof CurrentIteratorPrototype[ITERATOR] != 'function') {
          createNonEnumerableProperty(CurrentIteratorPrototype, ITERATOR, returnThis);
        }
      } // Set @@toStringTag to native iterators


      setToStringTag(CurrentIteratorPrototype, TO_STRING_TAG, true, true);
      if (IS_PURE) Iterators[TO_STRING_TAG] = returnThis;
    }
  } // fix Array#{values, @@iterator}.name in V8 / FF


  if (DEFAULT == VALUES && nativeIterator && nativeIterator.name !== VALUES) {
    INCORRECT_VALUES_NAME = true;

    defaultIterator = function values() {
      return nativeIterator.call(this);
    };
  } // define iterator


  if ((!IS_PURE || FORCED) && IterablePrototype[ITERATOR] !== defaultIterator) {
    createNonEnumerableProperty(IterablePrototype, ITERATOR, defaultIterator);
  }

  Iterators[NAME] = defaultIterator; // export additional methods

  if (DEFAULT) {
    methods = {
      values: getIterationMethod(VALUES),
      keys: IS_SET ? defaultIterator : getIterationMethod(KEYS),
      entries: getIterationMethod(ENTRIES)
    };
    if (FORCED) for (KEY in methods) {
      if (BUGGY_SAFARI_ITERATORS || INCORRECT_VALUES_NAME || !(KEY in IterablePrototype)) {
        redefine(IterablePrototype, KEY, methods[KEY]);
      }
    } else $({
      target: NAME,
      proto: true,
      forced: BUGGY_SAFARI_ITERATORS || INCORRECT_VALUES_NAME
    }, methods);
  }

  return methods;
};

/***/ }),

/***/ "./node_modules/core-js/internals/descriptors.js":
/*!*******************************************************!*\
  !*** ./node_modules/core-js/internals/descriptors.js ***!
  \*******************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var fails = __webpack_require__(/*! ../internals/fails */ "./node_modules/core-js/internals/fails.js"); // Thank's IE8 for his funny defineProperty


module.exports = !fails(function () {
  return Object.defineProperty({}, 'a', {
    get: function get() {
      return 7;
    }
  }).a != 7;
});

/***/ }),

/***/ "./node_modules/core-js/internals/document-create-element.js":
/*!*******************************************************************!*\
  !*** ./node_modules/core-js/internals/document-create-element.js ***!
  \*******************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var global = __webpack_require__(/*! ../internals/global */ "./node_modules/core-js/internals/global.js");

var isObject = __webpack_require__(/*! ../internals/is-object */ "./node_modules/core-js/internals/is-object.js");

var document = global.document; // typeof document.createElement is 'object' in old IE

var EXISTS = isObject(document) && isObject(document.createElement);

module.exports = function (it) {
  return EXISTS ? document.createElement(it) : {};
};

/***/ }),

/***/ "./node_modules/core-js/internals/dom-iterables.js":
/*!*********************************************************!*\
  !*** ./node_modules/core-js/internals/dom-iterables.js ***!
  \*********************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

// iterable DOM collections
// flag - `iterable` interface - 'entries', 'keys', 'values', 'forEach' methods
module.exports = {
  CSSRuleList: 0,
  CSSStyleDeclaration: 0,
  CSSValueList: 0,
  ClientRectList: 0,
  DOMRectList: 0,
  DOMStringList: 0,
  DOMTokenList: 1,
  DataTransferItemList: 0,
  FileList: 0,
  HTMLAllCollection: 0,
  HTMLCollection: 0,
  HTMLFormElement: 0,
  HTMLSelectElement: 0,
  MediaList: 0,
  MimeTypeArray: 0,
  NamedNodeMap: 0,
  NodeList: 1,
  PaintRequestList: 0,
  Plugin: 0,
  PluginArray: 0,
  SVGLengthList: 0,
  SVGNumberList: 0,
  SVGPathSegList: 0,
  SVGPointList: 0,
  SVGStringList: 0,
  SVGTransformList: 0,
  SourceBufferList: 0,
  StyleSheetList: 0,
  TextTrackCueList: 0,
  TextTrackList: 0,
  TouchList: 0
};

/***/ }),

/***/ "./node_modules/core-js/internals/enum-bug-keys.js":
/*!*********************************************************!*\
  !*** ./node_modules/core-js/internals/enum-bug-keys.js ***!
  \*********************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

// IE8- don't enum bug keys
module.exports = ['constructor', 'hasOwnProperty', 'isPrototypeOf', 'propertyIsEnumerable', 'toLocaleString', 'toString', 'valueOf'];

/***/ }),

/***/ "./node_modules/core-js/internals/export.js":
/*!**************************************************!*\
  !*** ./node_modules/core-js/internals/export.js ***!
  \**************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var global = __webpack_require__(/*! ../internals/global */ "./node_modules/core-js/internals/global.js");

var getOwnPropertyDescriptor = __webpack_require__(/*! ../internals/object-get-own-property-descriptor */ "./node_modules/core-js/internals/object-get-own-property-descriptor.js").f;

var createNonEnumerableProperty = __webpack_require__(/*! ../internals/create-non-enumerable-property */ "./node_modules/core-js/internals/create-non-enumerable-property.js");

var redefine = __webpack_require__(/*! ../internals/redefine */ "./node_modules/core-js/internals/redefine.js");

var setGlobal = __webpack_require__(/*! ../internals/set-global */ "./node_modules/core-js/internals/set-global.js");

var copyConstructorProperties = __webpack_require__(/*! ../internals/copy-constructor-properties */ "./node_modules/core-js/internals/copy-constructor-properties.js");

var isForced = __webpack_require__(/*! ../internals/is-forced */ "./node_modules/core-js/internals/is-forced.js");
/*
  options.target      - name of the target object
  options.global      - target is the global object
  options.stat        - export as static methods of target
  options.proto       - export as prototype methods of target
  options.real        - real prototype method for the `pure` version
  options.forced      - export even if the native feature is available
  options.bind        - bind methods to the target, required for the `pure` version
  options.wrap        - wrap constructors to preventing global pollution, required for the `pure` version
  options.unsafe      - use the simple assignment of property instead of delete + defineProperty
  options.sham        - add a flag to not completely full polyfills
  options.enumerable  - export as enumerable property
  options.noTargetGet - prevent calling a getter on target
*/


module.exports = function (options, source) {
  var TARGET = options.target;
  var GLOBAL = options.global;
  var STATIC = options.stat;
  var FORCED, target, key, targetProperty, sourceProperty, descriptor;

  if (GLOBAL) {
    target = global;
  } else if (STATIC) {
    target = global[TARGET] || setGlobal(TARGET, {});
  } else {
    target = (global[TARGET] || {}).prototype;
  }

  if (target) for (key in source) {
    sourceProperty = source[key];

    if (options.noTargetGet) {
      descriptor = getOwnPropertyDescriptor(target, key);
      targetProperty = descriptor && descriptor.value;
    } else targetProperty = target[key];

    FORCED = isForced(GLOBAL ? key : TARGET + (STATIC ? '.' : '#') + key, options.forced); // contained in target

    if (!FORCED && targetProperty !== undefined) {
      if (typeof sourceProperty === typeof targetProperty) continue;
      copyConstructorProperties(sourceProperty, targetProperty);
    } // add a flag to not completely full polyfills


    if (options.sham || targetProperty && targetProperty.sham) {
      createNonEnumerableProperty(sourceProperty, 'sham', true);
    } // extend global


    redefine(target, key, sourceProperty, options);
  }
};

/***/ }),

/***/ "./node_modules/core-js/internals/fails.js":
/*!*************************************************!*\
  !*** ./node_modules/core-js/internals/fails.js ***!
  \*************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = function (exec) {
  try {
    return !!exec();
  } catch (error) {
    return true;
  }
};

/***/ }),

/***/ "./node_modules/core-js/internals/flatten-into-array.js":
/*!**************************************************************!*\
  !*** ./node_modules/core-js/internals/flatten-into-array.js ***!
  \**************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var isArray = __webpack_require__(/*! ../internals/is-array */ "./node_modules/core-js/internals/is-array.js");

var toLength = __webpack_require__(/*! ../internals/to-length */ "./node_modules/core-js/internals/to-length.js");

var bind = __webpack_require__(/*! ../internals/bind-context */ "./node_modules/core-js/internals/bind-context.js"); // `FlattenIntoArray` abstract operation
// https://tc39.github.io/proposal-flatMap/#sec-FlattenIntoArray


var flattenIntoArray = function flattenIntoArray(target, original, source, sourceLen, start, depth, mapper, thisArg) {
  var targetIndex = start;
  var sourceIndex = 0;
  var mapFn = mapper ? bind(mapper, thisArg, 3) : false;
  var element;

  while (sourceIndex < sourceLen) {
    if (sourceIndex in source) {
      element = mapFn ? mapFn(source[sourceIndex], sourceIndex, original) : source[sourceIndex];

      if (depth > 0 && isArray(element)) {
        targetIndex = flattenIntoArray(target, original, element, toLength(element.length), targetIndex, depth - 1) - 1;
      } else {
        if (targetIndex >= 0x1FFFFFFFFFFFFF) throw TypeError('Exceed the acceptable array length');
        target[targetIndex] = element;
      }

      targetIndex++;
    }

    sourceIndex++;
  }

  return targetIndex;
};

module.exports = flattenIntoArray;

/***/ }),

/***/ "./node_modules/core-js/internals/get-built-in.js":
/*!********************************************************!*\
  !*** ./node_modules/core-js/internals/get-built-in.js ***!
  \********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var path = __webpack_require__(/*! ../internals/path */ "./node_modules/core-js/internals/path.js");

var global = __webpack_require__(/*! ../internals/global */ "./node_modules/core-js/internals/global.js");

var aFunction = function aFunction(variable) {
  return typeof variable == 'function' ? variable : undefined;
};

module.exports = function (namespace, method) {
  return arguments.length < 2 ? aFunction(path[namespace]) || aFunction(global[namespace]) : path[namespace] && path[namespace][method] || global[namespace] && global[namespace][method];
};

/***/ }),

/***/ "./node_modules/core-js/internals/get-iterator-method.js":
/*!***************************************************************!*\
  !*** ./node_modules/core-js/internals/get-iterator-method.js ***!
  \***************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var classof = __webpack_require__(/*! ../internals/classof */ "./node_modules/core-js/internals/classof.js");

var Iterators = __webpack_require__(/*! ../internals/iterators */ "./node_modules/core-js/internals/iterators.js");

var wellKnownSymbol = __webpack_require__(/*! ../internals/well-known-symbol */ "./node_modules/core-js/internals/well-known-symbol.js");

var ITERATOR = wellKnownSymbol('iterator');

module.exports = function (it) {
  if (it != undefined) return it[ITERATOR] || it['@@iterator'] || Iterators[classof(it)];
};

/***/ }),

/***/ "./node_modules/core-js/internals/global.js":
/*!**************************************************!*\
  !*** ./node_modules/core-js/internals/global.js ***!
  \**************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

/* WEBPACK VAR INJECTION */(function(global) {var check = function check(it) {
  return it && it.Math == Math && it;
}; // https://github.com/zloirock/core-js/issues/86#issuecomment-115759028


module.exports = // eslint-disable-next-line no-undef
check(typeof globalThis == 'object' && globalThis) || check(typeof window == 'object' && window) || check(typeof self == 'object' && self) || check(typeof global == 'object' && global) || // eslint-disable-next-line no-new-func
Function('return this')();
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./../../webpack/buildin/global.js */ "./node_modules/webpack/buildin/global.js")))

/***/ }),

/***/ "./node_modules/core-js/internals/has.js":
/*!***********************************************!*\
  !*** ./node_modules/core-js/internals/has.js ***!
  \***********************************************/
/*! no static exports found */
/***/ (function(module, exports) {

var hasOwnProperty = {}.hasOwnProperty;

module.exports = function (it, key) {
  return hasOwnProperty.call(it, key);
};

/***/ }),

/***/ "./node_modules/core-js/internals/hidden-keys.js":
/*!*******************************************************!*\
  !*** ./node_modules/core-js/internals/hidden-keys.js ***!
  \*******************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = {};

/***/ }),

/***/ "./node_modules/core-js/internals/host-report-errors.js":
/*!**************************************************************!*\
  !*** ./node_modules/core-js/internals/host-report-errors.js ***!
  \**************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var global = __webpack_require__(/*! ../internals/global */ "./node_modules/core-js/internals/global.js");

module.exports = function (a, b) {
  var console = global.console;

  if (console && console.error) {
    arguments.length === 1 ? console.error(a) : console.error(a, b);
  }
};

/***/ }),

/***/ "./node_modules/core-js/internals/html.js":
/*!************************************************!*\
  !*** ./node_modules/core-js/internals/html.js ***!
  \************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var getBuiltIn = __webpack_require__(/*! ../internals/get-built-in */ "./node_modules/core-js/internals/get-built-in.js");

module.exports = getBuiltIn('document', 'documentElement');

/***/ }),

/***/ "./node_modules/core-js/internals/ie8-dom-define.js":
/*!**********************************************************!*\
  !*** ./node_modules/core-js/internals/ie8-dom-define.js ***!
  \**********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var DESCRIPTORS = __webpack_require__(/*! ../internals/descriptors */ "./node_modules/core-js/internals/descriptors.js");

var fails = __webpack_require__(/*! ../internals/fails */ "./node_modules/core-js/internals/fails.js");

var createElement = __webpack_require__(/*! ../internals/document-create-element */ "./node_modules/core-js/internals/document-create-element.js"); // Thank's IE8 for his funny defineProperty


module.exports = !DESCRIPTORS && !fails(function () {
  return Object.defineProperty(createElement('div'), 'a', {
    get: function get() {
      return 7;
    }
  }).a != 7;
});

/***/ }),

/***/ "./node_modules/core-js/internals/indexed-object.js":
/*!**********************************************************!*\
  !*** ./node_modules/core-js/internals/indexed-object.js ***!
  \**********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var fails = __webpack_require__(/*! ../internals/fails */ "./node_modules/core-js/internals/fails.js");

var classof = __webpack_require__(/*! ../internals/classof-raw */ "./node_modules/core-js/internals/classof-raw.js");

var split = ''.split; // fallback for non-array-like ES3 and non-enumerable old V8 strings

module.exports = fails(function () {
  // throws an error in rhino, see https://github.com/mozilla/rhino/issues/346
  // eslint-disable-next-line no-prototype-builtins
  return !Object('z').propertyIsEnumerable(0);
}) ? function (it) {
  return classof(it) == 'String' ? split.call(it, '') : Object(it);
} : Object;

/***/ }),

/***/ "./node_modules/core-js/internals/inspect-source.js":
/*!**********************************************************!*\
  !*** ./node_modules/core-js/internals/inspect-source.js ***!
  \**********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var store = __webpack_require__(/*! ../internals/shared-store */ "./node_modules/core-js/internals/shared-store.js");

var functionToString = Function.toString; // this helper broken in `3.4.1-3.4.4`, so we can't use `shared` helper

if (typeof store.inspectSource != 'function') {
  store.inspectSource = function (it) {
    return functionToString.call(it);
  };
}

module.exports = store.inspectSource;

/***/ }),

/***/ "./node_modules/core-js/internals/internal-state.js":
/*!**********************************************************!*\
  !*** ./node_modules/core-js/internals/internal-state.js ***!
  \**********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var NATIVE_WEAK_MAP = __webpack_require__(/*! ../internals/native-weak-map */ "./node_modules/core-js/internals/native-weak-map.js");

var global = __webpack_require__(/*! ../internals/global */ "./node_modules/core-js/internals/global.js");

var isObject = __webpack_require__(/*! ../internals/is-object */ "./node_modules/core-js/internals/is-object.js");

var createNonEnumerableProperty = __webpack_require__(/*! ../internals/create-non-enumerable-property */ "./node_modules/core-js/internals/create-non-enumerable-property.js");

var objectHas = __webpack_require__(/*! ../internals/has */ "./node_modules/core-js/internals/has.js");

var sharedKey = __webpack_require__(/*! ../internals/shared-key */ "./node_modules/core-js/internals/shared-key.js");

var hiddenKeys = __webpack_require__(/*! ../internals/hidden-keys */ "./node_modules/core-js/internals/hidden-keys.js");

var WeakMap = global.WeakMap;
var set, get, has;

var enforce = function enforce(it) {
  return has(it) ? get(it) : set(it, {});
};

var getterFor = function getterFor(TYPE) {
  return function (it) {
    var state;

    if (!isObject(it) || (state = get(it)).type !== TYPE) {
      throw TypeError('Incompatible receiver, ' + TYPE + ' required');
    }

    return state;
  };
};

if (NATIVE_WEAK_MAP) {
  var store = new WeakMap();
  var wmget = store.get;
  var wmhas = store.has;
  var wmset = store.set;

  set = function set(it, metadata) {
    wmset.call(store, it, metadata);
    return metadata;
  };

  get = function get(it) {
    return wmget.call(store, it) || {};
  };

  has = function has(it) {
    return wmhas.call(store, it);
  };
} else {
  var STATE = sharedKey('state');
  hiddenKeys[STATE] = true;

  set = function set(it, metadata) {
    createNonEnumerableProperty(it, STATE, metadata);
    return metadata;
  };

  get = function get(it) {
    return objectHas(it, STATE) ? it[STATE] : {};
  };

  has = function has(it) {
    return objectHas(it, STATE);
  };
}

module.exports = {
  set: set,
  get: get,
  has: has,
  enforce: enforce,
  getterFor: getterFor
};

/***/ }),

/***/ "./node_modules/core-js/internals/is-array-iterator-method.js":
/*!********************************************************************!*\
  !*** ./node_modules/core-js/internals/is-array-iterator-method.js ***!
  \********************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var wellKnownSymbol = __webpack_require__(/*! ../internals/well-known-symbol */ "./node_modules/core-js/internals/well-known-symbol.js");

var Iterators = __webpack_require__(/*! ../internals/iterators */ "./node_modules/core-js/internals/iterators.js");

var ITERATOR = wellKnownSymbol('iterator');
var ArrayPrototype = Array.prototype; // check on default Array iterator

module.exports = function (it) {
  return it !== undefined && (Iterators.Array === it || ArrayPrototype[ITERATOR] === it);
};

/***/ }),

/***/ "./node_modules/core-js/internals/is-array.js":
/*!****************************************************!*\
  !*** ./node_modules/core-js/internals/is-array.js ***!
  \****************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var classof = __webpack_require__(/*! ../internals/classof-raw */ "./node_modules/core-js/internals/classof-raw.js"); // `IsArray` abstract operation
// https://tc39.github.io/ecma262/#sec-isarray


module.exports = Array.isArray || function isArray(arg) {
  return classof(arg) == 'Array';
};

/***/ }),

/***/ "./node_modules/core-js/internals/is-forced.js":
/*!*****************************************************!*\
  !*** ./node_modules/core-js/internals/is-forced.js ***!
  \*****************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var fails = __webpack_require__(/*! ../internals/fails */ "./node_modules/core-js/internals/fails.js");

var replacement = /#|\.prototype\./;

var isForced = function isForced(feature, detection) {
  var value = data[normalize(feature)];
  return value == POLYFILL ? true : value == NATIVE ? false : typeof detection == 'function' ? fails(detection) : !!detection;
};

var normalize = isForced.normalize = function (string) {
  return String(string).replace(replacement, '.').toLowerCase();
};

var data = isForced.data = {};
var NATIVE = isForced.NATIVE = 'N';
var POLYFILL = isForced.POLYFILL = 'P';
module.exports = isForced;

/***/ }),

/***/ "./node_modules/core-js/internals/is-ios.js":
/*!**************************************************!*\
  !*** ./node_modules/core-js/internals/is-ios.js ***!
  \**************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var userAgent = __webpack_require__(/*! ../internals/user-agent */ "./node_modules/core-js/internals/user-agent.js");

module.exports = /(iphone|ipod|ipad).*applewebkit/i.test(userAgent);

/***/ }),

/***/ "./node_modules/core-js/internals/is-object.js":
/*!*****************************************************!*\
  !*** ./node_modules/core-js/internals/is-object.js ***!
  \*****************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = function (it) {
  return typeof it === 'object' ? it !== null : typeof it === 'function';
};

/***/ }),

/***/ "./node_modules/core-js/internals/is-pure.js":
/*!***************************************************!*\
  !*** ./node_modules/core-js/internals/is-pure.js ***!
  \***************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = false;

/***/ }),

/***/ "./node_modules/core-js/internals/iterate.js":
/*!***************************************************!*\
  !*** ./node_modules/core-js/internals/iterate.js ***!
  \***************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var anObject = __webpack_require__(/*! ../internals/an-object */ "./node_modules/core-js/internals/an-object.js");

var isArrayIteratorMethod = __webpack_require__(/*! ../internals/is-array-iterator-method */ "./node_modules/core-js/internals/is-array-iterator-method.js");

var toLength = __webpack_require__(/*! ../internals/to-length */ "./node_modules/core-js/internals/to-length.js");

var bind = __webpack_require__(/*! ../internals/bind-context */ "./node_modules/core-js/internals/bind-context.js");

var getIteratorMethod = __webpack_require__(/*! ../internals/get-iterator-method */ "./node_modules/core-js/internals/get-iterator-method.js");

var callWithSafeIterationClosing = __webpack_require__(/*! ../internals/call-with-safe-iteration-closing */ "./node_modules/core-js/internals/call-with-safe-iteration-closing.js");

var Result = function Result(stopped, result) {
  this.stopped = stopped;
  this.result = result;
};

var iterate = module.exports = function (iterable, fn, that, AS_ENTRIES, IS_ITERATOR) {
  var boundFunction = bind(fn, that, AS_ENTRIES ? 2 : 1);
  var iterator, iterFn, index, length, result, next, step;

  if (IS_ITERATOR) {
    iterator = iterable;
  } else {
    iterFn = getIteratorMethod(iterable);
    if (typeof iterFn != 'function') throw TypeError('Target is not iterable'); // optimisation for array iterators

    if (isArrayIteratorMethod(iterFn)) {
      for (index = 0, length = toLength(iterable.length); length > index; index++) {
        result = AS_ENTRIES ? boundFunction(anObject(step = iterable[index])[0], step[1]) : boundFunction(iterable[index]);
        if (result && result instanceof Result) return result;
      }

      return new Result(false);
    }

    iterator = iterFn.call(iterable);
  }

  next = iterator.next;

  while (!(step = next.call(iterator)).done) {
    result = callWithSafeIterationClosing(iterator, boundFunction, step.value, AS_ENTRIES);
    if (typeof result == 'object' && result && result instanceof Result) return result;
  }

  return new Result(false);
};

iterate.stop = function (result) {
  return new Result(true, result);
};

/***/ }),

/***/ "./node_modules/core-js/internals/iterators-core.js":
/*!**********************************************************!*\
  !*** ./node_modules/core-js/internals/iterators-core.js ***!
  \**********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var getPrototypeOf = __webpack_require__(/*! ../internals/object-get-prototype-of */ "./node_modules/core-js/internals/object-get-prototype-of.js");

var createNonEnumerableProperty = __webpack_require__(/*! ../internals/create-non-enumerable-property */ "./node_modules/core-js/internals/create-non-enumerable-property.js");

var has = __webpack_require__(/*! ../internals/has */ "./node_modules/core-js/internals/has.js");

var wellKnownSymbol = __webpack_require__(/*! ../internals/well-known-symbol */ "./node_modules/core-js/internals/well-known-symbol.js");

var IS_PURE = __webpack_require__(/*! ../internals/is-pure */ "./node_modules/core-js/internals/is-pure.js");

var ITERATOR = wellKnownSymbol('iterator');
var BUGGY_SAFARI_ITERATORS = false;

var returnThis = function returnThis() {
  return this;
}; // `%IteratorPrototype%` object
// https://tc39.github.io/ecma262/#sec-%iteratorprototype%-object


var IteratorPrototype, PrototypeOfArrayIteratorPrototype, arrayIterator;

if ([].keys) {
  arrayIterator = [].keys(); // Safari 8 has buggy iterators w/o `next`

  if (!('next' in arrayIterator)) BUGGY_SAFARI_ITERATORS = true;else {
    PrototypeOfArrayIteratorPrototype = getPrototypeOf(getPrototypeOf(arrayIterator));
    if (PrototypeOfArrayIteratorPrototype !== Object.prototype) IteratorPrototype = PrototypeOfArrayIteratorPrototype;
  }
}

if (IteratorPrototype == undefined) IteratorPrototype = {}; // 25.1.2.1.1 %IteratorPrototype%[@@iterator]()

if (!IS_PURE && !has(IteratorPrototype, ITERATOR)) {
  createNonEnumerableProperty(IteratorPrototype, ITERATOR, returnThis);
}

module.exports = {
  IteratorPrototype: IteratorPrototype,
  BUGGY_SAFARI_ITERATORS: BUGGY_SAFARI_ITERATORS
};

/***/ }),

/***/ "./node_modules/core-js/internals/iterators.js":
/*!*****************************************************!*\
  !*** ./node_modules/core-js/internals/iterators.js ***!
  \*****************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = {};

/***/ }),

/***/ "./node_modules/core-js/internals/microtask.js":
/*!*****************************************************!*\
  !*** ./node_modules/core-js/internals/microtask.js ***!
  \*****************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var global = __webpack_require__(/*! ../internals/global */ "./node_modules/core-js/internals/global.js");

var getOwnPropertyDescriptor = __webpack_require__(/*! ../internals/object-get-own-property-descriptor */ "./node_modules/core-js/internals/object-get-own-property-descriptor.js").f;

var classof = __webpack_require__(/*! ../internals/classof-raw */ "./node_modules/core-js/internals/classof-raw.js");

var macrotask = __webpack_require__(/*! ../internals/task */ "./node_modules/core-js/internals/task.js").set;

var IS_IOS = __webpack_require__(/*! ../internals/is-ios */ "./node_modules/core-js/internals/is-ios.js");

var MutationObserver = global.MutationObserver || global.WebKitMutationObserver;
var process = global.process;
var Promise = global.Promise;
var IS_NODE = classof(process) == 'process'; // Node.js 11 shows ExperimentalWarning on getting `queueMicrotask`

var queueMicrotaskDescriptor = getOwnPropertyDescriptor(global, 'queueMicrotask');
var queueMicrotask = queueMicrotaskDescriptor && queueMicrotaskDescriptor.value;
var flush, head, last, notify, toggle, node, promise, then; // modern engines have queueMicrotask method

if (!queueMicrotask) {
  flush = function flush() {
    var parent, fn;
    if (IS_NODE && (parent = process.domain)) parent.exit();

    while (head) {
      fn = head.fn;
      head = head.next;

      try {
        fn();
      } catch (error) {
        if (head) notify();else last = undefined;
        throw error;
      }
    }

    last = undefined;
    if (parent) parent.enter();
  }; // Node.js


  if (IS_NODE) {
    notify = function notify() {
      process.nextTick(flush);
    }; // browsers with MutationObserver, except iOS - https://github.com/zloirock/core-js/issues/339

  } else if (MutationObserver && !IS_IOS) {
    toggle = true;
    node = document.createTextNode('');
    new MutationObserver(flush).observe(node, {
      characterData: true
    });

    notify = function notify() {
      node.data = toggle = !toggle;
    }; // environments with maybe non-completely correct, but existent Promise

  } else if (Promise && Promise.resolve) {
    // Promise.resolve without an argument throws an error in LG WebOS 2
    promise = Promise.resolve(undefined);
    then = promise.then;

    notify = function notify() {
      then.call(promise, flush);
    }; // for other environments - macrotask based on:
    // - setImmediate
    // - MessageChannel
    // - window.postMessag
    // - onreadystatechange
    // - setTimeout

  } else {
    notify = function notify() {
      // strange IE + webpack dev server bug - use .call(global)
      macrotask.call(global, flush);
    };
  }
}

module.exports = queueMicrotask || function (fn) {
  var task = {
    fn: fn,
    next: undefined
  };
  if (last) last.next = task;

  if (!head) {
    head = task;
    notify();
  }

  last = task;
};

/***/ }),

/***/ "./node_modules/core-js/internals/native-promise-constructor.js":
/*!**********************************************************************!*\
  !*** ./node_modules/core-js/internals/native-promise-constructor.js ***!
  \**********************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var global = __webpack_require__(/*! ../internals/global */ "./node_modules/core-js/internals/global.js");

module.exports = global.Promise;

/***/ }),

/***/ "./node_modules/core-js/internals/native-symbol.js":
/*!*********************************************************!*\
  !*** ./node_modules/core-js/internals/native-symbol.js ***!
  \*********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var fails = __webpack_require__(/*! ../internals/fails */ "./node_modules/core-js/internals/fails.js");

module.exports = !!Object.getOwnPropertySymbols && !fails(function () {
  // Chrome 38 Symbol has incorrect toString conversion
  // eslint-disable-next-line no-undef
  return !String(Symbol());
});

/***/ }),

/***/ "./node_modules/core-js/internals/native-weak-map.js":
/*!***********************************************************!*\
  !*** ./node_modules/core-js/internals/native-weak-map.js ***!
  \***********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var global = __webpack_require__(/*! ../internals/global */ "./node_modules/core-js/internals/global.js");

var inspectSource = __webpack_require__(/*! ../internals/inspect-source */ "./node_modules/core-js/internals/inspect-source.js");

var WeakMap = global.WeakMap;
module.exports = typeof WeakMap === 'function' && /native code/.test(inspectSource(WeakMap));

/***/ }),

/***/ "./node_modules/core-js/internals/new-promise-capability.js":
/*!******************************************************************!*\
  !*** ./node_modules/core-js/internals/new-promise-capability.js ***!
  \******************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var aFunction = __webpack_require__(/*! ../internals/a-function */ "./node_modules/core-js/internals/a-function.js");

var PromiseCapability = function PromiseCapability(C) {
  var resolve, reject;
  this.promise = new C(function ($$resolve, $$reject) {
    if (resolve !== undefined || reject !== undefined) throw TypeError('Bad Promise constructor');
    resolve = $$resolve;
    reject = $$reject;
  });
  this.resolve = aFunction(resolve);
  this.reject = aFunction(reject);
}; // 25.4.1.5 NewPromiseCapability(C)


module.exports.f = function (C) {
  return new PromiseCapability(C);
};

/***/ }),

/***/ "./node_modules/core-js/internals/object-create.js":
/*!*********************************************************!*\
  !*** ./node_modules/core-js/internals/object-create.js ***!
  \*********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var anObject = __webpack_require__(/*! ../internals/an-object */ "./node_modules/core-js/internals/an-object.js");

var defineProperties = __webpack_require__(/*! ../internals/object-define-properties */ "./node_modules/core-js/internals/object-define-properties.js");

var enumBugKeys = __webpack_require__(/*! ../internals/enum-bug-keys */ "./node_modules/core-js/internals/enum-bug-keys.js");

var hiddenKeys = __webpack_require__(/*! ../internals/hidden-keys */ "./node_modules/core-js/internals/hidden-keys.js");

var html = __webpack_require__(/*! ../internals/html */ "./node_modules/core-js/internals/html.js");

var documentCreateElement = __webpack_require__(/*! ../internals/document-create-element */ "./node_modules/core-js/internals/document-create-element.js");

var sharedKey = __webpack_require__(/*! ../internals/shared-key */ "./node_modules/core-js/internals/shared-key.js");

var IE_PROTO = sharedKey('IE_PROTO');
var PROTOTYPE = 'prototype';

var Empty = function Empty() {
  /* empty */
}; // Create object with fake `null` prototype: use iframe Object with cleared prototype


var _createDict = function createDict() {
  // Thrash, waste and sodomy: IE GC bug
  var iframe = documentCreateElement('iframe');
  var length = enumBugKeys.length;
  var lt = '<';
  var script = 'script';
  var gt = '>';
  var js = 'java' + script + ':';
  var iframeDocument;
  iframe.style.display = 'none';
  html.appendChild(iframe);
  iframe.src = String(js);
  iframeDocument = iframe.contentWindow.document;
  iframeDocument.open();
  iframeDocument.write(lt + script + gt + 'document.F=Object' + lt + '/' + script + gt);
  iframeDocument.close();
  _createDict = iframeDocument.F;

  while (length--) {
    delete _createDict[PROTOTYPE][enumBugKeys[length]];
  }

  return _createDict();
}; // `Object.create` method
// https://tc39.github.io/ecma262/#sec-object.create


module.exports = Object.create || function create(O, Properties) {
  var result;

  if (O !== null) {
    Empty[PROTOTYPE] = anObject(O);
    result = new Empty();
    Empty[PROTOTYPE] = null; // add "__proto__" for Object.getPrototypeOf polyfill

    result[IE_PROTO] = O;
  } else result = _createDict();

  return Properties === undefined ? result : defineProperties(result, Properties);
};

hiddenKeys[IE_PROTO] = true;

/***/ }),

/***/ "./node_modules/core-js/internals/object-define-properties.js":
/*!********************************************************************!*\
  !*** ./node_modules/core-js/internals/object-define-properties.js ***!
  \********************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var DESCRIPTORS = __webpack_require__(/*! ../internals/descriptors */ "./node_modules/core-js/internals/descriptors.js");

var definePropertyModule = __webpack_require__(/*! ../internals/object-define-property */ "./node_modules/core-js/internals/object-define-property.js");

var anObject = __webpack_require__(/*! ../internals/an-object */ "./node_modules/core-js/internals/an-object.js");

var objectKeys = __webpack_require__(/*! ../internals/object-keys */ "./node_modules/core-js/internals/object-keys.js"); // `Object.defineProperties` method
// https://tc39.github.io/ecma262/#sec-object.defineproperties


module.exports = DESCRIPTORS ? Object.defineProperties : function defineProperties(O, Properties) {
  anObject(O);
  var keys = objectKeys(Properties);
  var length = keys.length;
  var index = 0;
  var key;

  while (length > index) {
    definePropertyModule.f(O, key = keys[index++], Properties[key]);
  }

  return O;
};

/***/ }),

/***/ "./node_modules/core-js/internals/object-define-property.js":
/*!******************************************************************!*\
  !*** ./node_modules/core-js/internals/object-define-property.js ***!
  \******************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var DESCRIPTORS = __webpack_require__(/*! ../internals/descriptors */ "./node_modules/core-js/internals/descriptors.js");

var IE8_DOM_DEFINE = __webpack_require__(/*! ../internals/ie8-dom-define */ "./node_modules/core-js/internals/ie8-dom-define.js");

var anObject = __webpack_require__(/*! ../internals/an-object */ "./node_modules/core-js/internals/an-object.js");

var toPrimitive = __webpack_require__(/*! ../internals/to-primitive */ "./node_modules/core-js/internals/to-primitive.js");

var nativeDefineProperty = Object.defineProperty; // `Object.defineProperty` method
// https://tc39.github.io/ecma262/#sec-object.defineproperty

exports.f = DESCRIPTORS ? nativeDefineProperty : function defineProperty(O, P, Attributes) {
  anObject(O);
  P = toPrimitive(P, true);
  anObject(Attributes);
  if (IE8_DOM_DEFINE) try {
    return nativeDefineProperty(O, P, Attributes);
  } catch (error) {
    /* empty */
  }
  if ('get' in Attributes || 'set' in Attributes) throw TypeError('Accessors not supported');
  if ('value' in Attributes) O[P] = Attributes.value;
  return O;
};

/***/ }),

/***/ "./node_modules/core-js/internals/object-get-own-property-descriptor.js":
/*!******************************************************************************!*\
  !*** ./node_modules/core-js/internals/object-get-own-property-descriptor.js ***!
  \******************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var DESCRIPTORS = __webpack_require__(/*! ../internals/descriptors */ "./node_modules/core-js/internals/descriptors.js");

var propertyIsEnumerableModule = __webpack_require__(/*! ../internals/object-property-is-enumerable */ "./node_modules/core-js/internals/object-property-is-enumerable.js");

var createPropertyDescriptor = __webpack_require__(/*! ../internals/create-property-descriptor */ "./node_modules/core-js/internals/create-property-descriptor.js");

var toIndexedObject = __webpack_require__(/*! ../internals/to-indexed-object */ "./node_modules/core-js/internals/to-indexed-object.js");

var toPrimitive = __webpack_require__(/*! ../internals/to-primitive */ "./node_modules/core-js/internals/to-primitive.js");

var has = __webpack_require__(/*! ../internals/has */ "./node_modules/core-js/internals/has.js");

var IE8_DOM_DEFINE = __webpack_require__(/*! ../internals/ie8-dom-define */ "./node_modules/core-js/internals/ie8-dom-define.js");

var nativeGetOwnPropertyDescriptor = Object.getOwnPropertyDescriptor; // `Object.getOwnPropertyDescriptor` method
// https://tc39.github.io/ecma262/#sec-object.getownpropertydescriptor

exports.f = DESCRIPTORS ? nativeGetOwnPropertyDescriptor : function getOwnPropertyDescriptor(O, P) {
  O = toIndexedObject(O);
  P = toPrimitive(P, true);
  if (IE8_DOM_DEFINE) try {
    return nativeGetOwnPropertyDescriptor(O, P);
  } catch (error) {
    /* empty */
  }
  if (has(O, P)) return createPropertyDescriptor(!propertyIsEnumerableModule.f.call(O, P), O[P]);
};

/***/ }),

/***/ "./node_modules/core-js/internals/object-get-own-property-names.js":
/*!*************************************************************************!*\
  !*** ./node_modules/core-js/internals/object-get-own-property-names.js ***!
  \*************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var internalObjectKeys = __webpack_require__(/*! ../internals/object-keys-internal */ "./node_modules/core-js/internals/object-keys-internal.js");

var enumBugKeys = __webpack_require__(/*! ../internals/enum-bug-keys */ "./node_modules/core-js/internals/enum-bug-keys.js");

var hiddenKeys = enumBugKeys.concat('length', 'prototype'); // `Object.getOwnPropertyNames` method
// https://tc39.github.io/ecma262/#sec-object.getownpropertynames

exports.f = Object.getOwnPropertyNames || function getOwnPropertyNames(O) {
  return internalObjectKeys(O, hiddenKeys);
};

/***/ }),

/***/ "./node_modules/core-js/internals/object-get-own-property-symbols.js":
/*!***************************************************************************!*\
  !*** ./node_modules/core-js/internals/object-get-own-property-symbols.js ***!
  \***************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

exports.f = Object.getOwnPropertySymbols;

/***/ }),

/***/ "./node_modules/core-js/internals/object-get-prototype-of.js":
/*!*******************************************************************!*\
  !*** ./node_modules/core-js/internals/object-get-prototype-of.js ***!
  \*******************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var has = __webpack_require__(/*! ../internals/has */ "./node_modules/core-js/internals/has.js");

var toObject = __webpack_require__(/*! ../internals/to-object */ "./node_modules/core-js/internals/to-object.js");

var sharedKey = __webpack_require__(/*! ../internals/shared-key */ "./node_modules/core-js/internals/shared-key.js");

var CORRECT_PROTOTYPE_GETTER = __webpack_require__(/*! ../internals/correct-prototype-getter */ "./node_modules/core-js/internals/correct-prototype-getter.js");

var IE_PROTO = sharedKey('IE_PROTO');
var ObjectPrototype = Object.prototype; // `Object.getPrototypeOf` method
// https://tc39.github.io/ecma262/#sec-object.getprototypeof

module.exports = CORRECT_PROTOTYPE_GETTER ? Object.getPrototypeOf : function (O) {
  O = toObject(O);
  if (has(O, IE_PROTO)) return O[IE_PROTO];

  if (typeof O.constructor == 'function' && O instanceof O.constructor) {
    return O.constructor.prototype;
  }

  return O instanceof Object ? ObjectPrototype : null;
};

/***/ }),

/***/ "./node_modules/core-js/internals/object-keys-internal.js":
/*!****************************************************************!*\
  !*** ./node_modules/core-js/internals/object-keys-internal.js ***!
  \****************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var has = __webpack_require__(/*! ../internals/has */ "./node_modules/core-js/internals/has.js");

var toIndexedObject = __webpack_require__(/*! ../internals/to-indexed-object */ "./node_modules/core-js/internals/to-indexed-object.js");

var indexOf = __webpack_require__(/*! ../internals/array-includes */ "./node_modules/core-js/internals/array-includes.js").indexOf;

var hiddenKeys = __webpack_require__(/*! ../internals/hidden-keys */ "./node_modules/core-js/internals/hidden-keys.js");

module.exports = function (object, names) {
  var O = toIndexedObject(object);
  var i = 0;
  var result = [];
  var key;

  for (key in O) {
    !has(hiddenKeys, key) && has(O, key) && result.push(key);
  } // Don't enum bug & hidden keys


  while (names.length > i) {
    if (has(O, key = names[i++])) {
      ~indexOf(result, key) || result.push(key);
    }
  }

  return result;
};

/***/ }),

/***/ "./node_modules/core-js/internals/object-keys.js":
/*!*******************************************************!*\
  !*** ./node_modules/core-js/internals/object-keys.js ***!
  \*******************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var internalObjectKeys = __webpack_require__(/*! ../internals/object-keys-internal */ "./node_modules/core-js/internals/object-keys-internal.js");

var enumBugKeys = __webpack_require__(/*! ../internals/enum-bug-keys */ "./node_modules/core-js/internals/enum-bug-keys.js"); // `Object.keys` method
// https://tc39.github.io/ecma262/#sec-object.keys


module.exports = Object.keys || function keys(O) {
  return internalObjectKeys(O, enumBugKeys);
};

/***/ }),

/***/ "./node_modules/core-js/internals/object-property-is-enumerable.js":
/*!*************************************************************************!*\
  !*** ./node_modules/core-js/internals/object-property-is-enumerable.js ***!
  \*************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var nativePropertyIsEnumerable = {}.propertyIsEnumerable;
var getOwnPropertyDescriptor = Object.getOwnPropertyDescriptor; // Nashorn ~ JDK8 bug

var NASHORN_BUG = getOwnPropertyDescriptor && !nativePropertyIsEnumerable.call({
  1: 2
}, 1); // `Object.prototype.propertyIsEnumerable` method implementation
// https://tc39.github.io/ecma262/#sec-object.prototype.propertyisenumerable

exports.f = NASHORN_BUG ? function propertyIsEnumerable(V) {
  var descriptor = getOwnPropertyDescriptor(this, V);
  return !!descriptor && descriptor.enumerable;
} : nativePropertyIsEnumerable;

/***/ }),

/***/ "./node_modules/core-js/internals/object-set-prototype-of.js":
/*!*******************************************************************!*\
  !*** ./node_modules/core-js/internals/object-set-prototype-of.js ***!
  \*******************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var anObject = __webpack_require__(/*! ../internals/an-object */ "./node_modules/core-js/internals/an-object.js");

var aPossiblePrototype = __webpack_require__(/*! ../internals/a-possible-prototype */ "./node_modules/core-js/internals/a-possible-prototype.js"); // `Object.setPrototypeOf` method
// https://tc39.github.io/ecma262/#sec-object.setprototypeof
// Works with __proto__ only. Old v8 can't work with null proto objects.

/* eslint-disable no-proto */


module.exports = Object.setPrototypeOf || ('__proto__' in {} ? function () {
  var CORRECT_SETTER = false;
  var test = {};
  var setter;

  try {
    setter = Object.getOwnPropertyDescriptor(Object.prototype, '__proto__').set;
    setter.call(test, []);
    CORRECT_SETTER = test instanceof Array;
  } catch (error) {
    /* empty */
  }

  return function setPrototypeOf(O, proto) {
    anObject(O);
    aPossiblePrototype(proto);
    if (CORRECT_SETTER) setter.call(O, proto);else O.__proto__ = proto;
    return O;
  };
}() : undefined);

/***/ }),

/***/ "./node_modules/core-js/internals/object-to-array.js":
/*!***********************************************************!*\
  !*** ./node_modules/core-js/internals/object-to-array.js ***!
  \***********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var DESCRIPTORS = __webpack_require__(/*! ../internals/descriptors */ "./node_modules/core-js/internals/descriptors.js");

var objectKeys = __webpack_require__(/*! ../internals/object-keys */ "./node_modules/core-js/internals/object-keys.js");

var toIndexedObject = __webpack_require__(/*! ../internals/to-indexed-object */ "./node_modules/core-js/internals/to-indexed-object.js");

var propertyIsEnumerable = __webpack_require__(/*! ../internals/object-property-is-enumerable */ "./node_modules/core-js/internals/object-property-is-enumerable.js").f; // `Object.{ entries, values }` methods implementation


var createMethod = function createMethod(TO_ENTRIES) {
  return function (it) {
    var O = toIndexedObject(it);
    var keys = objectKeys(O);
    var length = keys.length;
    var i = 0;
    var result = [];
    var key;

    while (length > i) {
      key = keys[i++];

      if (!DESCRIPTORS || propertyIsEnumerable.call(O, key)) {
        result.push(TO_ENTRIES ? [key, O[key]] : O[key]);
      }
    }

    return result;
  };
};

module.exports = {
  // `Object.entries` method
  // https://tc39.github.io/ecma262/#sec-object.entries
  entries: createMethod(true),
  // `Object.values` method
  // https://tc39.github.io/ecma262/#sec-object.values
  values: createMethod(false)
};

/***/ }),

/***/ "./node_modules/core-js/internals/object-to-string.js":
/*!************************************************************!*\
  !*** ./node_modules/core-js/internals/object-to-string.js ***!
  \************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var TO_STRING_TAG_SUPPORT = __webpack_require__(/*! ../internals/to-string-tag-support */ "./node_modules/core-js/internals/to-string-tag-support.js");

var classof = __webpack_require__(/*! ../internals/classof */ "./node_modules/core-js/internals/classof.js"); // `Object.prototype.toString` method implementation
// https://tc39.github.io/ecma262/#sec-object.prototype.tostring


module.exports = TO_STRING_TAG_SUPPORT ? {}.toString : function toString() {
  return '[object ' + classof(this) + ']';
};

/***/ }),

/***/ "./node_modules/core-js/internals/own-keys.js":
/*!****************************************************!*\
  !*** ./node_modules/core-js/internals/own-keys.js ***!
  \****************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var getBuiltIn = __webpack_require__(/*! ../internals/get-built-in */ "./node_modules/core-js/internals/get-built-in.js");

var getOwnPropertyNamesModule = __webpack_require__(/*! ../internals/object-get-own-property-names */ "./node_modules/core-js/internals/object-get-own-property-names.js");

var getOwnPropertySymbolsModule = __webpack_require__(/*! ../internals/object-get-own-property-symbols */ "./node_modules/core-js/internals/object-get-own-property-symbols.js");

var anObject = __webpack_require__(/*! ../internals/an-object */ "./node_modules/core-js/internals/an-object.js"); // all object keys, includes non-enumerable and symbols


module.exports = getBuiltIn('Reflect', 'ownKeys') || function ownKeys(it) {
  var keys = getOwnPropertyNamesModule.f(anObject(it));
  var getOwnPropertySymbols = getOwnPropertySymbolsModule.f;
  return getOwnPropertySymbols ? keys.concat(getOwnPropertySymbols(it)) : keys;
};

/***/ }),

/***/ "./node_modules/core-js/internals/path.js":
/*!************************************************!*\
  !*** ./node_modules/core-js/internals/path.js ***!
  \************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var global = __webpack_require__(/*! ../internals/global */ "./node_modules/core-js/internals/global.js");

module.exports = global;

/***/ }),

/***/ "./node_modules/core-js/internals/perform.js":
/*!***************************************************!*\
  !*** ./node_modules/core-js/internals/perform.js ***!
  \***************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = function (exec) {
  try {
    return {
      error: false,
      value: exec()
    };
  } catch (error) {
    return {
      error: true,
      value: error
    };
  }
};

/***/ }),

/***/ "./node_modules/core-js/internals/promise-resolve.js":
/*!***********************************************************!*\
  !*** ./node_modules/core-js/internals/promise-resolve.js ***!
  \***********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var anObject = __webpack_require__(/*! ../internals/an-object */ "./node_modules/core-js/internals/an-object.js");

var isObject = __webpack_require__(/*! ../internals/is-object */ "./node_modules/core-js/internals/is-object.js");

var newPromiseCapability = __webpack_require__(/*! ../internals/new-promise-capability */ "./node_modules/core-js/internals/new-promise-capability.js");

module.exports = function (C, x) {
  anObject(C);
  if (isObject(x) && x.constructor === C) return x;
  var promiseCapability = newPromiseCapability.f(C);
  var resolve = promiseCapability.resolve;
  resolve(x);
  return promiseCapability.promise;
};

/***/ }),

/***/ "./node_modules/core-js/internals/redefine-all.js":
/*!********************************************************!*\
  !*** ./node_modules/core-js/internals/redefine-all.js ***!
  \********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var redefine = __webpack_require__(/*! ../internals/redefine */ "./node_modules/core-js/internals/redefine.js");

module.exports = function (target, src, options) {
  for (var key in src) {
    redefine(target, key, src[key], options);
  }

  return target;
};

/***/ }),

/***/ "./node_modules/core-js/internals/redefine.js":
/*!****************************************************!*\
  !*** ./node_modules/core-js/internals/redefine.js ***!
  \****************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var global = __webpack_require__(/*! ../internals/global */ "./node_modules/core-js/internals/global.js");

var createNonEnumerableProperty = __webpack_require__(/*! ../internals/create-non-enumerable-property */ "./node_modules/core-js/internals/create-non-enumerable-property.js");

var has = __webpack_require__(/*! ../internals/has */ "./node_modules/core-js/internals/has.js");

var setGlobal = __webpack_require__(/*! ../internals/set-global */ "./node_modules/core-js/internals/set-global.js");

var inspectSource = __webpack_require__(/*! ../internals/inspect-source */ "./node_modules/core-js/internals/inspect-source.js");

var InternalStateModule = __webpack_require__(/*! ../internals/internal-state */ "./node_modules/core-js/internals/internal-state.js");

var getInternalState = InternalStateModule.get;
var enforceInternalState = InternalStateModule.enforce;
var TEMPLATE = String(String).split('String');
(module.exports = function (O, key, value, options) {
  var unsafe = options ? !!options.unsafe : false;
  var simple = options ? !!options.enumerable : false;
  var noTargetGet = options ? !!options.noTargetGet : false;

  if (typeof value == 'function') {
    if (typeof key == 'string' && !has(value, 'name')) createNonEnumerableProperty(value, 'name', key);
    enforceInternalState(value).source = TEMPLATE.join(typeof key == 'string' ? key : '');
  }

  if (O === global) {
    if (simple) O[key] = value;else setGlobal(key, value);
    return;
  } else if (!unsafe) {
    delete O[key];
  } else if (!noTargetGet && O[key]) {
    simple = true;
  }

  if (simple) O[key] = value;else createNonEnumerableProperty(O, key, value); // add fake Function#toString for correct work wrapped methods / constructors with methods like LoDash isNative
})(Function.prototype, 'toString', function toString() {
  return typeof this == 'function' && getInternalState(this).source || inspectSource(this);
});

/***/ }),

/***/ "./node_modules/core-js/internals/require-object-coercible.js":
/*!********************************************************************!*\
  !*** ./node_modules/core-js/internals/require-object-coercible.js ***!
  \********************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

// `RequireObjectCoercible` abstract operation
// https://tc39.github.io/ecma262/#sec-requireobjectcoercible
module.exports = function (it) {
  if (it == undefined) throw TypeError("Can't call method on " + it);
  return it;
};

/***/ }),

/***/ "./node_modules/core-js/internals/set-global.js":
/*!******************************************************!*\
  !*** ./node_modules/core-js/internals/set-global.js ***!
  \******************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var global = __webpack_require__(/*! ../internals/global */ "./node_modules/core-js/internals/global.js");

var createNonEnumerableProperty = __webpack_require__(/*! ../internals/create-non-enumerable-property */ "./node_modules/core-js/internals/create-non-enumerable-property.js");

module.exports = function (key, value) {
  try {
    createNonEnumerableProperty(global, key, value);
  } catch (error) {
    global[key] = value;
  }

  return value;
};

/***/ }),

/***/ "./node_modules/core-js/internals/set-species.js":
/*!*******************************************************!*\
  !*** ./node_modules/core-js/internals/set-species.js ***!
  \*******************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var getBuiltIn = __webpack_require__(/*! ../internals/get-built-in */ "./node_modules/core-js/internals/get-built-in.js");

var definePropertyModule = __webpack_require__(/*! ../internals/object-define-property */ "./node_modules/core-js/internals/object-define-property.js");

var wellKnownSymbol = __webpack_require__(/*! ../internals/well-known-symbol */ "./node_modules/core-js/internals/well-known-symbol.js");

var DESCRIPTORS = __webpack_require__(/*! ../internals/descriptors */ "./node_modules/core-js/internals/descriptors.js");

var SPECIES = wellKnownSymbol('species');

module.exports = function (CONSTRUCTOR_NAME) {
  var Constructor = getBuiltIn(CONSTRUCTOR_NAME);
  var defineProperty = definePropertyModule.f;

  if (DESCRIPTORS && Constructor && !Constructor[SPECIES]) {
    defineProperty(Constructor, SPECIES, {
      configurable: true,
      get: function get() {
        return this;
      }
    });
  }
};

/***/ }),

/***/ "./node_modules/core-js/internals/set-to-string-tag.js":
/*!*************************************************************!*\
  !*** ./node_modules/core-js/internals/set-to-string-tag.js ***!
  \*************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var defineProperty = __webpack_require__(/*! ../internals/object-define-property */ "./node_modules/core-js/internals/object-define-property.js").f;

var has = __webpack_require__(/*! ../internals/has */ "./node_modules/core-js/internals/has.js");

var wellKnownSymbol = __webpack_require__(/*! ../internals/well-known-symbol */ "./node_modules/core-js/internals/well-known-symbol.js");

var TO_STRING_TAG = wellKnownSymbol('toStringTag');

module.exports = function (it, TAG, STATIC) {
  if (it && !has(it = STATIC ? it : it.prototype, TO_STRING_TAG)) {
    defineProperty(it, TO_STRING_TAG, {
      configurable: true,
      value: TAG
    });
  }
};

/***/ }),

/***/ "./node_modules/core-js/internals/shared-key.js":
/*!******************************************************!*\
  !*** ./node_modules/core-js/internals/shared-key.js ***!
  \******************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var shared = __webpack_require__(/*! ../internals/shared */ "./node_modules/core-js/internals/shared.js");

var uid = __webpack_require__(/*! ../internals/uid */ "./node_modules/core-js/internals/uid.js");

var keys = shared('keys');

module.exports = function (key) {
  return keys[key] || (keys[key] = uid(key));
};

/***/ }),

/***/ "./node_modules/core-js/internals/shared-store.js":
/*!********************************************************!*\
  !*** ./node_modules/core-js/internals/shared-store.js ***!
  \********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var global = __webpack_require__(/*! ../internals/global */ "./node_modules/core-js/internals/global.js");

var setGlobal = __webpack_require__(/*! ../internals/set-global */ "./node_modules/core-js/internals/set-global.js");

var SHARED = '__core-js_shared__';
var store = global[SHARED] || setGlobal(SHARED, {});
module.exports = store;

/***/ }),

/***/ "./node_modules/core-js/internals/shared.js":
/*!**************************************************!*\
  !*** ./node_modules/core-js/internals/shared.js ***!
  \**************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var IS_PURE = __webpack_require__(/*! ../internals/is-pure */ "./node_modules/core-js/internals/is-pure.js");

var store = __webpack_require__(/*! ../internals/shared-store */ "./node_modules/core-js/internals/shared-store.js");

(module.exports = function (key, value) {
  return store[key] || (store[key] = value !== undefined ? value : {});
})('versions', []).push({
  version: '3.4.8',
  mode: IS_PURE ? 'pure' : 'global',
  copyright: '© 2019 Denis Pushkarev (zloirock.ru)'
});

/***/ }),

/***/ "./node_modules/core-js/internals/sloppy-array-method.js":
/*!***************************************************************!*\
  !*** ./node_modules/core-js/internals/sloppy-array-method.js ***!
  \***************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var fails = __webpack_require__(/*! ../internals/fails */ "./node_modules/core-js/internals/fails.js");

module.exports = function (METHOD_NAME, argument) {
  var method = [][METHOD_NAME];
  return !method || !fails(function () {
    // eslint-disable-next-line no-useless-call,no-throw-literal
    method.call(null, argument || function () {
      throw 1;
    }, 1);
  });
};

/***/ }),

/***/ "./node_modules/core-js/internals/species-constructor.js":
/*!***************************************************************!*\
  !*** ./node_modules/core-js/internals/species-constructor.js ***!
  \***************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var anObject = __webpack_require__(/*! ../internals/an-object */ "./node_modules/core-js/internals/an-object.js");

var aFunction = __webpack_require__(/*! ../internals/a-function */ "./node_modules/core-js/internals/a-function.js");

var wellKnownSymbol = __webpack_require__(/*! ../internals/well-known-symbol */ "./node_modules/core-js/internals/well-known-symbol.js");

var SPECIES = wellKnownSymbol('species'); // `SpeciesConstructor` abstract operation
// https://tc39.github.io/ecma262/#sec-speciesconstructor

module.exports = function (O, defaultConstructor) {
  var C = anObject(O).constructor;
  var S;
  return C === undefined || (S = anObject(C)[SPECIES]) == undefined ? defaultConstructor : aFunction(S);
};

/***/ }),

/***/ "./node_modules/core-js/internals/string-multibyte.js":
/*!************************************************************!*\
  !*** ./node_modules/core-js/internals/string-multibyte.js ***!
  \************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var toInteger = __webpack_require__(/*! ../internals/to-integer */ "./node_modules/core-js/internals/to-integer.js");

var requireObjectCoercible = __webpack_require__(/*! ../internals/require-object-coercible */ "./node_modules/core-js/internals/require-object-coercible.js"); // `String.prototype.{ codePointAt, at }` methods implementation


var createMethod = function createMethod(CONVERT_TO_STRING) {
  return function ($this, pos) {
    var S = String(requireObjectCoercible($this));
    var position = toInteger(pos);
    var size = S.length;
    var first, second;
    if (position < 0 || position >= size) return CONVERT_TO_STRING ? '' : undefined;
    first = S.charCodeAt(position);
    return first < 0xD800 || first > 0xDBFF || position + 1 === size || (second = S.charCodeAt(position + 1)) < 0xDC00 || second > 0xDFFF ? CONVERT_TO_STRING ? S.charAt(position) : first : CONVERT_TO_STRING ? S.slice(position, position + 2) : (first - 0xD800 << 10) + (second - 0xDC00) + 0x10000;
  };
};

module.exports = {
  // `String.prototype.codePointAt` method
  // https://tc39.github.io/ecma262/#sec-string.prototype.codepointat
  codeAt: createMethod(false),
  // `String.prototype.at` method
  // https://github.com/mathiasbynens/String.prototype.at
  charAt: createMethod(true)
};

/***/ }),

/***/ "./node_modules/core-js/internals/task.js":
/*!************************************************!*\
  !*** ./node_modules/core-js/internals/task.js ***!
  \************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var global = __webpack_require__(/*! ../internals/global */ "./node_modules/core-js/internals/global.js");

var fails = __webpack_require__(/*! ../internals/fails */ "./node_modules/core-js/internals/fails.js");

var classof = __webpack_require__(/*! ../internals/classof-raw */ "./node_modules/core-js/internals/classof-raw.js");

var bind = __webpack_require__(/*! ../internals/bind-context */ "./node_modules/core-js/internals/bind-context.js");

var html = __webpack_require__(/*! ../internals/html */ "./node_modules/core-js/internals/html.js");

var createElement = __webpack_require__(/*! ../internals/document-create-element */ "./node_modules/core-js/internals/document-create-element.js");

var IS_IOS = __webpack_require__(/*! ../internals/is-ios */ "./node_modules/core-js/internals/is-ios.js");

var location = global.location;
var set = global.setImmediate;
var clear = global.clearImmediate;
var process = global.process;
var MessageChannel = global.MessageChannel;
var Dispatch = global.Dispatch;
var counter = 0;
var queue = {};
var ONREADYSTATECHANGE = 'onreadystatechange';
var defer, channel, port;

var run = function run(id) {
  // eslint-disable-next-line no-prototype-builtins
  if (queue.hasOwnProperty(id)) {
    var fn = queue[id];
    delete queue[id];
    fn();
  }
};

var runner = function runner(id) {
  return function () {
    run(id);
  };
};

var listener = function listener(event) {
  run(event.data);
};

var post = function post(id) {
  // old engines have not location.origin
  global.postMessage(id + '', location.protocol + '//' + location.host);
}; // Node.js 0.9+ & IE10+ has setImmediate, otherwise:


if (!set || !clear) {
  set = function setImmediate(fn) {
    var args = [];
    var i = 1;

    while (arguments.length > i) {
      args.push(arguments[i++]);
    }

    queue[++counter] = function () {
      // eslint-disable-next-line no-new-func
      (typeof fn == 'function' ? fn : Function(fn)).apply(undefined, args);
    };

    defer(counter);
    return counter;
  };

  clear = function clearImmediate(id) {
    delete queue[id];
  }; // Node.js 0.8-


  if (classof(process) == 'process') {
    defer = function defer(id) {
      process.nextTick(runner(id));
    }; // Sphere (JS game engine) Dispatch API

  } else if (Dispatch && Dispatch.now) {
    defer = function defer(id) {
      Dispatch.now(runner(id));
    }; // Browsers with MessageChannel, includes WebWorkers
    // except iOS - https://github.com/zloirock/core-js/issues/624

  } else if (MessageChannel && !IS_IOS) {
    channel = new MessageChannel();
    port = channel.port2;
    channel.port1.onmessage = listener;
    defer = bind(port.postMessage, port, 1); // Browsers with postMessage, skip WebWorkers
    // IE8 has postMessage, but it's sync & typeof its postMessage is 'object'
  } else if (global.addEventListener && typeof postMessage == 'function' && !global.importScripts && !fails(post)) {
    defer = post;
    global.addEventListener('message', listener, false); // IE8-
  } else if (ONREADYSTATECHANGE in createElement('script')) {
    defer = function defer(id) {
      html.appendChild(createElement('script'))[ONREADYSTATECHANGE] = function () {
        html.removeChild(this);
        run(id);
      };
    }; // Rest old browsers

  } else {
    defer = function defer(id) {
      setTimeout(runner(id), 0);
    };
  }
}

module.exports = {
  set: set,
  clear: clear
};

/***/ }),

/***/ "./node_modules/core-js/internals/to-absolute-index.js":
/*!*************************************************************!*\
  !*** ./node_modules/core-js/internals/to-absolute-index.js ***!
  \*************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var toInteger = __webpack_require__(/*! ../internals/to-integer */ "./node_modules/core-js/internals/to-integer.js");

var max = Math.max;
var min = Math.min; // Helper for a popular repeating case of the spec:
// Let integer be ? ToInteger(index).
// If integer < 0, let result be max((length + integer), 0); else let result be min(integer, length).

module.exports = function (index, length) {
  var integer = toInteger(index);
  return integer < 0 ? max(integer + length, 0) : min(integer, length);
};

/***/ }),

/***/ "./node_modules/core-js/internals/to-indexed-object.js":
/*!*************************************************************!*\
  !*** ./node_modules/core-js/internals/to-indexed-object.js ***!
  \*************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

// toObject with fallback for non-array-like ES3 strings
var IndexedObject = __webpack_require__(/*! ../internals/indexed-object */ "./node_modules/core-js/internals/indexed-object.js");

var requireObjectCoercible = __webpack_require__(/*! ../internals/require-object-coercible */ "./node_modules/core-js/internals/require-object-coercible.js");

module.exports = function (it) {
  return IndexedObject(requireObjectCoercible(it));
};

/***/ }),

/***/ "./node_modules/core-js/internals/to-integer.js":
/*!******************************************************!*\
  !*** ./node_modules/core-js/internals/to-integer.js ***!
  \******************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

var ceil = Math.ceil;
var floor = Math.floor; // `ToInteger` abstract operation
// https://tc39.github.io/ecma262/#sec-tointeger

module.exports = function (argument) {
  return isNaN(argument = +argument) ? 0 : (argument > 0 ? floor : ceil)(argument);
};

/***/ }),

/***/ "./node_modules/core-js/internals/to-length.js":
/*!*****************************************************!*\
  !*** ./node_modules/core-js/internals/to-length.js ***!
  \*****************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var toInteger = __webpack_require__(/*! ../internals/to-integer */ "./node_modules/core-js/internals/to-integer.js");

var min = Math.min; // `ToLength` abstract operation
// https://tc39.github.io/ecma262/#sec-tolength

module.exports = function (argument) {
  return argument > 0 ? min(toInteger(argument), 0x1FFFFFFFFFFFFF) : 0; // 2 ** 53 - 1 == 9007199254740991
};

/***/ }),

/***/ "./node_modules/core-js/internals/to-object.js":
/*!*****************************************************!*\
  !*** ./node_modules/core-js/internals/to-object.js ***!
  \*****************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var requireObjectCoercible = __webpack_require__(/*! ../internals/require-object-coercible */ "./node_modules/core-js/internals/require-object-coercible.js"); // `ToObject` abstract operation
// https://tc39.github.io/ecma262/#sec-toobject


module.exports = function (argument) {
  return Object(requireObjectCoercible(argument));
};

/***/ }),

/***/ "./node_modules/core-js/internals/to-primitive.js":
/*!********************************************************!*\
  !*** ./node_modules/core-js/internals/to-primitive.js ***!
  \********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var isObject = __webpack_require__(/*! ../internals/is-object */ "./node_modules/core-js/internals/is-object.js"); // `ToPrimitive` abstract operation
// https://tc39.github.io/ecma262/#sec-toprimitive
// instead of the ES6 spec version, we didn't implement @@toPrimitive case
// and the second argument - flag - preferred type is a string


module.exports = function (input, PREFERRED_STRING) {
  if (!isObject(input)) return input;
  var fn, val;
  if (PREFERRED_STRING && typeof (fn = input.toString) == 'function' && !isObject(val = fn.call(input))) return val;
  if (typeof (fn = input.valueOf) == 'function' && !isObject(val = fn.call(input))) return val;
  if (!PREFERRED_STRING && typeof (fn = input.toString) == 'function' && !isObject(val = fn.call(input))) return val;
  throw TypeError("Can't convert object to primitive value");
};

/***/ }),

/***/ "./node_modules/core-js/internals/to-string-tag-support.js":
/*!*****************************************************************!*\
  !*** ./node_modules/core-js/internals/to-string-tag-support.js ***!
  \*****************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var wellKnownSymbol = __webpack_require__(/*! ../internals/well-known-symbol */ "./node_modules/core-js/internals/well-known-symbol.js");

var TO_STRING_TAG = wellKnownSymbol('toStringTag');
var test = {};
test[TO_STRING_TAG] = 'z';
module.exports = String(test) === '[object z]';

/***/ }),

/***/ "./node_modules/core-js/internals/uid.js":
/*!***********************************************!*\
  !*** ./node_modules/core-js/internals/uid.js ***!
  \***********************************************/
/*! no static exports found */
/***/ (function(module, exports) {

var id = 0;
var postfix = Math.random();

module.exports = function (key) {
  return 'Symbol(' + String(key === undefined ? '' : key) + ')_' + (++id + postfix).toString(36);
};

/***/ }),

/***/ "./node_modules/core-js/internals/use-symbol-as-uid.js":
/*!*************************************************************!*\
  !*** ./node_modules/core-js/internals/use-symbol-as-uid.js ***!
  \*************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var NATIVE_SYMBOL = __webpack_require__(/*! ../internals/native-symbol */ "./node_modules/core-js/internals/native-symbol.js");

module.exports = NATIVE_SYMBOL // eslint-disable-next-line no-undef
&& !Symbol.sham // eslint-disable-next-line no-undef
&& typeof Symbol() == 'symbol';

/***/ }),

/***/ "./node_modules/core-js/internals/user-agent.js":
/*!******************************************************!*\
  !*** ./node_modules/core-js/internals/user-agent.js ***!
  \******************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var getBuiltIn = __webpack_require__(/*! ../internals/get-built-in */ "./node_modules/core-js/internals/get-built-in.js");

module.exports = getBuiltIn('navigator', 'userAgent') || '';

/***/ }),

/***/ "./node_modules/core-js/internals/v8-version.js":
/*!******************************************************!*\
  !*** ./node_modules/core-js/internals/v8-version.js ***!
  \******************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var global = __webpack_require__(/*! ../internals/global */ "./node_modules/core-js/internals/global.js");

var userAgent = __webpack_require__(/*! ../internals/user-agent */ "./node_modules/core-js/internals/user-agent.js");

var process = global.process;
var versions = process && process.versions;
var v8 = versions && versions.v8;
var match, version;

if (v8) {
  match = v8.split('.');
  version = match[0] + match[1];
} else if (userAgent) {
  match = userAgent.match(/Edge\/(\d+)/);

  if (!match || match[1] >= 74) {
    match = userAgent.match(/Chrome\/(\d+)/);
    if (match) version = match[1];
  }
}

module.exports = version && +version;

/***/ }),

/***/ "./node_modules/core-js/internals/well-known-symbol.js":
/*!*************************************************************!*\
  !*** ./node_modules/core-js/internals/well-known-symbol.js ***!
  \*************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var global = __webpack_require__(/*! ../internals/global */ "./node_modules/core-js/internals/global.js");

var shared = __webpack_require__(/*! ../internals/shared */ "./node_modules/core-js/internals/shared.js");

var has = __webpack_require__(/*! ../internals/has */ "./node_modules/core-js/internals/has.js");

var uid = __webpack_require__(/*! ../internals/uid */ "./node_modules/core-js/internals/uid.js");

var NATIVE_SYMBOL = __webpack_require__(/*! ../internals/native-symbol */ "./node_modules/core-js/internals/native-symbol.js");

var USE_SYMBOL_AS_UID = __webpack_require__(/*! ../internals/use-symbol-as-uid */ "./node_modules/core-js/internals/use-symbol-as-uid.js");

var WellKnownSymbolsStore = shared('wks');
var Symbol = global.Symbol;
var createWellKnownSymbol = USE_SYMBOL_AS_UID ? Symbol : uid;

module.exports = function (name) {
  if (!has(WellKnownSymbolsStore, name)) {
    if (NATIVE_SYMBOL && has(Symbol, name)) WellKnownSymbolsStore[name] = Symbol[name];else WellKnownSymbolsStore[name] = createWellKnownSymbol('Symbol.' + name);
  }

  return WellKnownSymbolsStore[name];
};

/***/ }),

/***/ "./node_modules/core-js/modules/es.array.concat.js":
/*!*********************************************************!*\
  !*** ./node_modules/core-js/modules/es.array.concat.js ***!
  \*********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var $ = __webpack_require__(/*! ../internals/export */ "./node_modules/core-js/internals/export.js");

var fails = __webpack_require__(/*! ../internals/fails */ "./node_modules/core-js/internals/fails.js");

var isArray = __webpack_require__(/*! ../internals/is-array */ "./node_modules/core-js/internals/is-array.js");

var isObject = __webpack_require__(/*! ../internals/is-object */ "./node_modules/core-js/internals/is-object.js");

var toObject = __webpack_require__(/*! ../internals/to-object */ "./node_modules/core-js/internals/to-object.js");

var toLength = __webpack_require__(/*! ../internals/to-length */ "./node_modules/core-js/internals/to-length.js");

var createProperty = __webpack_require__(/*! ../internals/create-property */ "./node_modules/core-js/internals/create-property.js");

var arraySpeciesCreate = __webpack_require__(/*! ../internals/array-species-create */ "./node_modules/core-js/internals/array-species-create.js");

var arrayMethodHasSpeciesSupport = __webpack_require__(/*! ../internals/array-method-has-species-support */ "./node_modules/core-js/internals/array-method-has-species-support.js");

var wellKnownSymbol = __webpack_require__(/*! ../internals/well-known-symbol */ "./node_modules/core-js/internals/well-known-symbol.js");

var V8_VERSION = __webpack_require__(/*! ../internals/v8-version */ "./node_modules/core-js/internals/v8-version.js");

var IS_CONCAT_SPREADABLE = wellKnownSymbol('isConcatSpreadable');
var MAX_SAFE_INTEGER = 0x1FFFFFFFFFFFFF;
var MAXIMUM_ALLOWED_INDEX_EXCEEDED = 'Maximum allowed index exceeded'; // We can't use this feature detection in V8 since it causes
// deoptimization and serious performance degradation
// https://github.com/zloirock/core-js/issues/679

var IS_CONCAT_SPREADABLE_SUPPORT = V8_VERSION >= 51 || !fails(function () {
  var array = [];
  array[IS_CONCAT_SPREADABLE] = false;
  return array.concat()[0] !== array;
});
var SPECIES_SUPPORT = arrayMethodHasSpeciesSupport('concat');

var isConcatSpreadable = function isConcatSpreadable(O) {
  if (!isObject(O)) return false;
  var spreadable = O[IS_CONCAT_SPREADABLE];
  return spreadable !== undefined ? !!spreadable : isArray(O);
};

var FORCED = !IS_CONCAT_SPREADABLE_SUPPORT || !SPECIES_SUPPORT; // `Array.prototype.concat` method
// https://tc39.github.io/ecma262/#sec-array.prototype.concat
// with adding support of @@isConcatSpreadable and @@species

$({
  target: 'Array',
  proto: true,
  forced: FORCED
}, {
  concat: function concat(arg) {
    // eslint-disable-line no-unused-vars
    var O = toObject(this);
    var A = arraySpeciesCreate(O, 0);
    var n = 0;
    var i, k, length, len, E;

    for (i = -1, length = arguments.length; i < length; i++) {
      E = i === -1 ? O : arguments[i];

      if (isConcatSpreadable(E)) {
        len = toLength(E.length);
        if (n + len > MAX_SAFE_INTEGER) throw TypeError(MAXIMUM_ALLOWED_INDEX_EXCEEDED);

        for (k = 0; k < len; k++, n++) {
          if (k in E) createProperty(A, n, E[k]);
        }
      } else {
        if (n >= MAX_SAFE_INTEGER) throw TypeError(MAXIMUM_ALLOWED_INDEX_EXCEEDED);
        createProperty(A, n++, E);
      }
    }

    A.length = n;
    return A;
  }
});

/***/ }),

/***/ "./node_modules/core-js/modules/es.array.copy-within.js":
/*!**************************************************************!*\
  !*** ./node_modules/core-js/modules/es.array.copy-within.js ***!
  \**************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var $ = __webpack_require__(/*! ../internals/export */ "./node_modules/core-js/internals/export.js");

var copyWithin = __webpack_require__(/*! ../internals/array-copy-within */ "./node_modules/core-js/internals/array-copy-within.js");

var addToUnscopables = __webpack_require__(/*! ../internals/add-to-unscopables */ "./node_modules/core-js/internals/add-to-unscopables.js"); // `Array.prototype.copyWithin` method
// https://tc39.github.io/ecma262/#sec-array.prototype.copywithin


$({
  target: 'Array',
  proto: true
}, {
  copyWithin: copyWithin
}); // https://tc39.github.io/ecma262/#sec-array.prototype-@@unscopables

addToUnscopables('copyWithin');

/***/ }),

/***/ "./node_modules/core-js/modules/es.array.every.js":
/*!********************************************************!*\
  !*** ./node_modules/core-js/modules/es.array.every.js ***!
  \********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var $ = __webpack_require__(/*! ../internals/export */ "./node_modules/core-js/internals/export.js");

var $every = __webpack_require__(/*! ../internals/array-iteration */ "./node_modules/core-js/internals/array-iteration.js").every;

var sloppyArrayMethod = __webpack_require__(/*! ../internals/sloppy-array-method */ "./node_modules/core-js/internals/sloppy-array-method.js"); // `Array.prototype.every` method
// https://tc39.github.io/ecma262/#sec-array.prototype.every


$({
  target: 'Array',
  proto: true,
  forced: sloppyArrayMethod('every')
}, {
  every: function every(callbackfn
  /* , thisArg */
  ) {
    return $every(this, callbackfn, arguments.length > 1 ? arguments[1] : undefined);
  }
});

/***/ }),

/***/ "./node_modules/core-js/modules/es.array.fill.js":
/*!*******************************************************!*\
  !*** ./node_modules/core-js/modules/es.array.fill.js ***!
  \*******************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var $ = __webpack_require__(/*! ../internals/export */ "./node_modules/core-js/internals/export.js");

var fill = __webpack_require__(/*! ../internals/array-fill */ "./node_modules/core-js/internals/array-fill.js");

var addToUnscopables = __webpack_require__(/*! ../internals/add-to-unscopables */ "./node_modules/core-js/internals/add-to-unscopables.js"); // `Array.prototype.fill` method
// https://tc39.github.io/ecma262/#sec-array.prototype.fill


$({
  target: 'Array',
  proto: true
}, {
  fill: fill
}); // https://tc39.github.io/ecma262/#sec-array.prototype-@@unscopables

addToUnscopables('fill');

/***/ }),

/***/ "./node_modules/core-js/modules/es.array.filter.js":
/*!*********************************************************!*\
  !*** ./node_modules/core-js/modules/es.array.filter.js ***!
  \*********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var $ = __webpack_require__(/*! ../internals/export */ "./node_modules/core-js/internals/export.js");

var $filter = __webpack_require__(/*! ../internals/array-iteration */ "./node_modules/core-js/internals/array-iteration.js").filter;

var fails = __webpack_require__(/*! ../internals/fails */ "./node_modules/core-js/internals/fails.js");

var arrayMethodHasSpeciesSupport = __webpack_require__(/*! ../internals/array-method-has-species-support */ "./node_modules/core-js/internals/array-method-has-species-support.js");

var HAS_SPECIES_SUPPORT = arrayMethodHasSpeciesSupport('filter'); // Edge 14- issue

var USES_TO_LENGTH = HAS_SPECIES_SUPPORT && !fails(function () {
  [].filter.call({
    length: -1,
    0: 1
  }, function (it) {
    throw it;
  });
}); // `Array.prototype.filter` method
// https://tc39.github.io/ecma262/#sec-array.prototype.filter
// with adding support of @@species

$({
  target: 'Array',
  proto: true,
  forced: !HAS_SPECIES_SUPPORT || !USES_TO_LENGTH
}, {
  filter: function filter(callbackfn
  /* , thisArg */
  ) {
    return $filter(this, callbackfn, arguments.length > 1 ? arguments[1] : undefined);
  }
});

/***/ }),

/***/ "./node_modules/core-js/modules/es.array.find-index.js":
/*!*************************************************************!*\
  !*** ./node_modules/core-js/modules/es.array.find-index.js ***!
  \*************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var $ = __webpack_require__(/*! ../internals/export */ "./node_modules/core-js/internals/export.js");

var $findIndex = __webpack_require__(/*! ../internals/array-iteration */ "./node_modules/core-js/internals/array-iteration.js").findIndex;

var addToUnscopables = __webpack_require__(/*! ../internals/add-to-unscopables */ "./node_modules/core-js/internals/add-to-unscopables.js");

var FIND_INDEX = 'findIndex';
var SKIPS_HOLES = true; // Shouldn't skip holes

if (FIND_INDEX in []) Array(1)[FIND_INDEX](function () {
  SKIPS_HOLES = false;
}); // `Array.prototype.findIndex` method
// https://tc39.github.io/ecma262/#sec-array.prototype.findindex

$({
  target: 'Array',
  proto: true,
  forced: SKIPS_HOLES
}, {
  findIndex: function findIndex(callbackfn
  /* , that = undefined */
  ) {
    return $findIndex(this, callbackfn, arguments.length > 1 ? arguments[1] : undefined);
  }
}); // https://tc39.github.io/ecma262/#sec-array.prototype-@@unscopables

addToUnscopables(FIND_INDEX);

/***/ }),

/***/ "./node_modules/core-js/modules/es.array.find.js":
/*!*******************************************************!*\
  !*** ./node_modules/core-js/modules/es.array.find.js ***!
  \*******************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var $ = __webpack_require__(/*! ../internals/export */ "./node_modules/core-js/internals/export.js");

var $find = __webpack_require__(/*! ../internals/array-iteration */ "./node_modules/core-js/internals/array-iteration.js").find;

var addToUnscopables = __webpack_require__(/*! ../internals/add-to-unscopables */ "./node_modules/core-js/internals/add-to-unscopables.js");

var FIND = 'find';
var SKIPS_HOLES = true; // Shouldn't skip holes

if (FIND in []) Array(1)[FIND](function () {
  SKIPS_HOLES = false;
}); // `Array.prototype.find` method
// https://tc39.github.io/ecma262/#sec-array.prototype.find

$({
  target: 'Array',
  proto: true,
  forced: SKIPS_HOLES
}, {
  find: function find(callbackfn
  /* , that = undefined */
  ) {
    return $find(this, callbackfn, arguments.length > 1 ? arguments[1] : undefined);
  }
}); // https://tc39.github.io/ecma262/#sec-array.prototype-@@unscopables

addToUnscopables(FIND);

/***/ }),

/***/ "./node_modules/core-js/modules/es.array.flat-map.js":
/*!***********************************************************!*\
  !*** ./node_modules/core-js/modules/es.array.flat-map.js ***!
  \***********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var $ = __webpack_require__(/*! ../internals/export */ "./node_modules/core-js/internals/export.js");

var flattenIntoArray = __webpack_require__(/*! ../internals/flatten-into-array */ "./node_modules/core-js/internals/flatten-into-array.js");

var toObject = __webpack_require__(/*! ../internals/to-object */ "./node_modules/core-js/internals/to-object.js");

var toLength = __webpack_require__(/*! ../internals/to-length */ "./node_modules/core-js/internals/to-length.js");

var aFunction = __webpack_require__(/*! ../internals/a-function */ "./node_modules/core-js/internals/a-function.js");

var arraySpeciesCreate = __webpack_require__(/*! ../internals/array-species-create */ "./node_modules/core-js/internals/array-species-create.js"); // `Array.prototype.flatMap` method
// https://github.com/tc39/proposal-flatMap


$({
  target: 'Array',
  proto: true
}, {
  flatMap: function flatMap(callbackfn
  /* , thisArg */
  ) {
    var O = toObject(this);
    var sourceLen = toLength(O.length);
    var A;
    aFunction(callbackfn);
    A = arraySpeciesCreate(O, 0);
    A.length = flattenIntoArray(A, O, O, sourceLen, 0, 1, callbackfn, arguments.length > 1 ? arguments[1] : undefined);
    return A;
  }
});

/***/ }),

/***/ "./node_modules/core-js/modules/es.array.flat.js":
/*!*******************************************************!*\
  !*** ./node_modules/core-js/modules/es.array.flat.js ***!
  \*******************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var $ = __webpack_require__(/*! ../internals/export */ "./node_modules/core-js/internals/export.js");

var flattenIntoArray = __webpack_require__(/*! ../internals/flatten-into-array */ "./node_modules/core-js/internals/flatten-into-array.js");

var toObject = __webpack_require__(/*! ../internals/to-object */ "./node_modules/core-js/internals/to-object.js");

var toLength = __webpack_require__(/*! ../internals/to-length */ "./node_modules/core-js/internals/to-length.js");

var toInteger = __webpack_require__(/*! ../internals/to-integer */ "./node_modules/core-js/internals/to-integer.js");

var arraySpeciesCreate = __webpack_require__(/*! ../internals/array-species-create */ "./node_modules/core-js/internals/array-species-create.js"); // `Array.prototype.flat` method
// https://github.com/tc39/proposal-flatMap


$({
  target: 'Array',
  proto: true
}, {
  flat: function flat()
  /* depthArg = 1 */
  {
    var depthArg = arguments.length ? arguments[0] : undefined;
    var O = toObject(this);
    var sourceLen = toLength(O.length);
    var A = arraySpeciesCreate(O, 0);
    A.length = flattenIntoArray(A, O, O, sourceLen, 0, depthArg === undefined ? 1 : toInteger(depthArg));
    return A;
  }
});

/***/ }),

/***/ "./node_modules/core-js/modules/es.array.for-each.js":
/*!***********************************************************!*\
  !*** ./node_modules/core-js/modules/es.array.for-each.js ***!
  \***********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var $ = __webpack_require__(/*! ../internals/export */ "./node_modules/core-js/internals/export.js");

var forEach = __webpack_require__(/*! ../internals/array-for-each */ "./node_modules/core-js/internals/array-for-each.js"); // `Array.prototype.forEach` method
// https://tc39.github.io/ecma262/#sec-array.prototype.foreach


$({
  target: 'Array',
  proto: true,
  forced: [].forEach != forEach
}, {
  forEach: forEach
});

/***/ }),

/***/ "./node_modules/core-js/modules/es.array.from.js":
/*!*******************************************************!*\
  !*** ./node_modules/core-js/modules/es.array.from.js ***!
  \*******************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var $ = __webpack_require__(/*! ../internals/export */ "./node_modules/core-js/internals/export.js");

var from = __webpack_require__(/*! ../internals/array-from */ "./node_modules/core-js/internals/array-from.js");

var checkCorrectnessOfIteration = __webpack_require__(/*! ../internals/check-correctness-of-iteration */ "./node_modules/core-js/internals/check-correctness-of-iteration.js");

var INCORRECT_ITERATION = !checkCorrectnessOfIteration(function (iterable) {
  Array.from(iterable);
}); // `Array.from` method
// https://tc39.github.io/ecma262/#sec-array.from

$({
  target: 'Array',
  stat: true,
  forced: INCORRECT_ITERATION
}, {
  from: from
});

/***/ }),

/***/ "./node_modules/core-js/modules/es.array.includes.js":
/*!***********************************************************!*\
  !*** ./node_modules/core-js/modules/es.array.includes.js ***!
  \***********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var $ = __webpack_require__(/*! ../internals/export */ "./node_modules/core-js/internals/export.js");

var $includes = __webpack_require__(/*! ../internals/array-includes */ "./node_modules/core-js/internals/array-includes.js").includes;

var addToUnscopables = __webpack_require__(/*! ../internals/add-to-unscopables */ "./node_modules/core-js/internals/add-to-unscopables.js"); // `Array.prototype.includes` method
// https://tc39.github.io/ecma262/#sec-array.prototype.includes


$({
  target: 'Array',
  proto: true
}, {
  includes: function includes(el
  /* , fromIndex = 0 */
  ) {
    return $includes(this, el, arguments.length > 1 ? arguments[1] : undefined);
  }
}); // https://tc39.github.io/ecma262/#sec-array.prototype-@@unscopables

addToUnscopables('includes');

/***/ }),

/***/ "./node_modules/core-js/modules/es.array.index-of.js":
/*!***********************************************************!*\
  !*** ./node_modules/core-js/modules/es.array.index-of.js ***!
  \***********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var $ = __webpack_require__(/*! ../internals/export */ "./node_modules/core-js/internals/export.js");

var $indexOf = __webpack_require__(/*! ../internals/array-includes */ "./node_modules/core-js/internals/array-includes.js").indexOf;

var sloppyArrayMethod = __webpack_require__(/*! ../internals/sloppy-array-method */ "./node_modules/core-js/internals/sloppy-array-method.js");

var nativeIndexOf = [].indexOf;
var NEGATIVE_ZERO = !!nativeIndexOf && 1 / [1].indexOf(1, -0) < 0;
var SLOPPY_METHOD = sloppyArrayMethod('indexOf'); // `Array.prototype.indexOf` method
// https://tc39.github.io/ecma262/#sec-array.prototype.indexof

$({
  target: 'Array',
  proto: true,
  forced: NEGATIVE_ZERO || SLOPPY_METHOD
}, {
  indexOf: function indexOf(searchElement
  /* , fromIndex = 0 */
  ) {
    return NEGATIVE_ZERO // convert -0 to +0
    ? nativeIndexOf.apply(this, arguments) || 0 : $indexOf(this, searchElement, arguments.length > 1 ? arguments[1] : undefined);
  }
});

/***/ }),

/***/ "./node_modules/core-js/modules/es.array.is-array.js":
/*!***********************************************************!*\
  !*** ./node_modules/core-js/modules/es.array.is-array.js ***!
  \***********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var $ = __webpack_require__(/*! ../internals/export */ "./node_modules/core-js/internals/export.js");

var isArray = __webpack_require__(/*! ../internals/is-array */ "./node_modules/core-js/internals/is-array.js"); // `Array.isArray` method
// https://tc39.github.io/ecma262/#sec-array.isarray


$({
  target: 'Array',
  stat: true
}, {
  isArray: isArray
});

/***/ }),

/***/ "./node_modules/core-js/modules/es.array.iterator.js":
/*!***********************************************************!*\
  !*** ./node_modules/core-js/modules/es.array.iterator.js ***!
  \***********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var toIndexedObject = __webpack_require__(/*! ../internals/to-indexed-object */ "./node_modules/core-js/internals/to-indexed-object.js");

var addToUnscopables = __webpack_require__(/*! ../internals/add-to-unscopables */ "./node_modules/core-js/internals/add-to-unscopables.js");

var Iterators = __webpack_require__(/*! ../internals/iterators */ "./node_modules/core-js/internals/iterators.js");

var InternalStateModule = __webpack_require__(/*! ../internals/internal-state */ "./node_modules/core-js/internals/internal-state.js");

var defineIterator = __webpack_require__(/*! ../internals/define-iterator */ "./node_modules/core-js/internals/define-iterator.js");

var ARRAY_ITERATOR = 'Array Iterator';
var setInternalState = InternalStateModule.set;
var getInternalState = InternalStateModule.getterFor(ARRAY_ITERATOR); // `Array.prototype.entries` method
// https://tc39.github.io/ecma262/#sec-array.prototype.entries
// `Array.prototype.keys` method
// https://tc39.github.io/ecma262/#sec-array.prototype.keys
// `Array.prototype.values` method
// https://tc39.github.io/ecma262/#sec-array.prototype.values
// `Array.prototype[@@iterator]` method
// https://tc39.github.io/ecma262/#sec-array.prototype-@@iterator
// `CreateArrayIterator` internal method
// https://tc39.github.io/ecma262/#sec-createarrayiterator

module.exports = defineIterator(Array, 'Array', function (iterated, kind) {
  setInternalState(this, {
    type: ARRAY_ITERATOR,
    target: toIndexedObject(iterated),
    // target
    index: 0,
    // next index
    kind: kind // kind

  }); // `%ArrayIteratorPrototype%.next` method
  // https://tc39.github.io/ecma262/#sec-%arrayiteratorprototype%.next
}, function () {
  var state = getInternalState(this);
  var target = state.target;
  var kind = state.kind;
  var index = state.index++;

  if (!target || index >= target.length) {
    state.target = undefined;
    return {
      value: undefined,
      done: true
    };
  }

  if (kind == 'keys') return {
    value: index,
    done: false
  };
  if (kind == 'values') return {
    value: target[index],
    done: false
  };
  return {
    value: [index, target[index]],
    done: false
  };
}, 'values'); // argumentsList[@@iterator] is %ArrayProto_values%
// https://tc39.github.io/ecma262/#sec-createunmappedargumentsobject
// https://tc39.github.io/ecma262/#sec-createmappedargumentsobject

Iterators.Arguments = Iterators.Array; // https://tc39.github.io/ecma262/#sec-array.prototype-@@unscopables

addToUnscopables('keys');
addToUnscopables('values');
addToUnscopables('entries');

/***/ }),

/***/ "./node_modules/core-js/modules/es.array.join.js":
/*!*******************************************************!*\
  !*** ./node_modules/core-js/modules/es.array.join.js ***!
  \*******************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var $ = __webpack_require__(/*! ../internals/export */ "./node_modules/core-js/internals/export.js");

var IndexedObject = __webpack_require__(/*! ../internals/indexed-object */ "./node_modules/core-js/internals/indexed-object.js");

var toIndexedObject = __webpack_require__(/*! ../internals/to-indexed-object */ "./node_modules/core-js/internals/to-indexed-object.js");

var sloppyArrayMethod = __webpack_require__(/*! ../internals/sloppy-array-method */ "./node_modules/core-js/internals/sloppy-array-method.js");

var nativeJoin = [].join;
var ES3_STRINGS = IndexedObject != Object;
var SLOPPY_METHOD = sloppyArrayMethod('join', ','); // `Array.prototype.join` method
// https://tc39.github.io/ecma262/#sec-array.prototype.join

$({
  target: 'Array',
  proto: true,
  forced: ES3_STRINGS || SLOPPY_METHOD
}, {
  join: function join(separator) {
    return nativeJoin.call(toIndexedObject(this), separator === undefined ? ',' : separator);
  }
});

/***/ }),

/***/ "./node_modules/core-js/modules/es.array.last-index-of.js":
/*!****************************************************************!*\
  !*** ./node_modules/core-js/modules/es.array.last-index-of.js ***!
  \****************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var $ = __webpack_require__(/*! ../internals/export */ "./node_modules/core-js/internals/export.js");

var lastIndexOf = __webpack_require__(/*! ../internals/array-last-index-of */ "./node_modules/core-js/internals/array-last-index-of.js"); // `Array.prototype.lastIndexOf` method
// https://tc39.github.io/ecma262/#sec-array.prototype.lastindexof


$({
  target: 'Array',
  proto: true,
  forced: lastIndexOf !== [].lastIndexOf
}, {
  lastIndexOf: lastIndexOf
});

/***/ }),

/***/ "./node_modules/core-js/modules/es.array.map.js":
/*!******************************************************!*\
  !*** ./node_modules/core-js/modules/es.array.map.js ***!
  \******************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var $ = __webpack_require__(/*! ../internals/export */ "./node_modules/core-js/internals/export.js");

var $map = __webpack_require__(/*! ../internals/array-iteration */ "./node_modules/core-js/internals/array-iteration.js").map;

var fails = __webpack_require__(/*! ../internals/fails */ "./node_modules/core-js/internals/fails.js");

var arrayMethodHasSpeciesSupport = __webpack_require__(/*! ../internals/array-method-has-species-support */ "./node_modules/core-js/internals/array-method-has-species-support.js");

var HAS_SPECIES_SUPPORT = arrayMethodHasSpeciesSupport('map'); // FF49- issue

var USES_TO_LENGTH = HAS_SPECIES_SUPPORT && !fails(function () {
  [].map.call({
    length: -1,
    0: 1
  }, function (it) {
    throw it;
  });
}); // `Array.prototype.map` method
// https://tc39.github.io/ecma262/#sec-array.prototype.map
// with adding support of @@species

$({
  target: 'Array',
  proto: true,
  forced: !HAS_SPECIES_SUPPORT || !USES_TO_LENGTH
}, {
  map: function map(callbackfn
  /* , thisArg */
  ) {
    return $map(this, callbackfn, arguments.length > 1 ? arguments[1] : undefined);
  }
});

/***/ }),

/***/ "./node_modules/core-js/modules/es.array.of.js":
/*!*****************************************************!*\
  !*** ./node_modules/core-js/modules/es.array.of.js ***!
  \*****************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var $ = __webpack_require__(/*! ../internals/export */ "./node_modules/core-js/internals/export.js");

var fails = __webpack_require__(/*! ../internals/fails */ "./node_modules/core-js/internals/fails.js");

var createProperty = __webpack_require__(/*! ../internals/create-property */ "./node_modules/core-js/internals/create-property.js");

var ISNT_GENERIC = fails(function () {
  function F() {
    /* empty */
  }

  return !(Array.of.call(F) instanceof F);
}); // `Array.of` method
// https://tc39.github.io/ecma262/#sec-array.of
// WebKit Array.of isn't generic

$({
  target: 'Array',
  stat: true,
  forced: ISNT_GENERIC
}, {
  of: function of()
  /* ...args */
  {
    var index = 0;
    var argumentsLength = arguments.length;
    var result = new (typeof this == 'function' ? this : Array)(argumentsLength);

    while (argumentsLength > index) {
      createProperty(result, index, arguments[index++]);
    }

    result.length = argumentsLength;
    return result;
  }
});

/***/ }),

/***/ "./node_modules/core-js/modules/es.array.reduce-right.js":
/*!***************************************************************!*\
  !*** ./node_modules/core-js/modules/es.array.reduce-right.js ***!
  \***************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var $ = __webpack_require__(/*! ../internals/export */ "./node_modules/core-js/internals/export.js");

var $reduceRight = __webpack_require__(/*! ../internals/array-reduce */ "./node_modules/core-js/internals/array-reduce.js").right;

var sloppyArrayMethod = __webpack_require__(/*! ../internals/sloppy-array-method */ "./node_modules/core-js/internals/sloppy-array-method.js"); // `Array.prototype.reduceRight` method
// https://tc39.github.io/ecma262/#sec-array.prototype.reduceright


$({
  target: 'Array',
  proto: true,
  forced: sloppyArrayMethod('reduceRight')
}, {
  reduceRight: function reduceRight(callbackfn
  /* , initialValue */
  ) {
    return $reduceRight(this, callbackfn, arguments.length, arguments.length > 1 ? arguments[1] : undefined);
  }
});

/***/ }),

/***/ "./node_modules/core-js/modules/es.array.reduce.js":
/*!*********************************************************!*\
  !*** ./node_modules/core-js/modules/es.array.reduce.js ***!
  \*********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var $ = __webpack_require__(/*! ../internals/export */ "./node_modules/core-js/internals/export.js");

var $reduce = __webpack_require__(/*! ../internals/array-reduce */ "./node_modules/core-js/internals/array-reduce.js").left;

var sloppyArrayMethod = __webpack_require__(/*! ../internals/sloppy-array-method */ "./node_modules/core-js/internals/sloppy-array-method.js"); // `Array.prototype.reduce` method
// https://tc39.github.io/ecma262/#sec-array.prototype.reduce


$({
  target: 'Array',
  proto: true,
  forced: sloppyArrayMethod('reduce')
}, {
  reduce: function reduce(callbackfn
  /* , initialValue */
  ) {
    return $reduce(this, callbackfn, arguments.length, arguments.length > 1 ? arguments[1] : undefined);
  }
});

/***/ }),

/***/ "./node_modules/core-js/modules/es.array.reverse.js":
/*!**********************************************************!*\
  !*** ./node_modules/core-js/modules/es.array.reverse.js ***!
  \**********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var $ = __webpack_require__(/*! ../internals/export */ "./node_modules/core-js/internals/export.js");

var isArray = __webpack_require__(/*! ../internals/is-array */ "./node_modules/core-js/internals/is-array.js");

var nativeReverse = [].reverse;
var test = [1, 2]; // `Array.prototype.reverse` method
// https://tc39.github.io/ecma262/#sec-array.prototype.reverse
// fix for Safari 12.0 bug
// https://bugs.webkit.org/show_bug.cgi?id=188794

$({
  target: 'Array',
  proto: true,
  forced: String(test) === String(test.reverse())
}, {
  reverse: function reverse() {
    // eslint-disable-next-line no-self-assign
    if (isArray(this)) this.length = this.length;
    return nativeReverse.call(this);
  }
});

/***/ }),

/***/ "./node_modules/core-js/modules/es.array.slice.js":
/*!********************************************************!*\
  !*** ./node_modules/core-js/modules/es.array.slice.js ***!
  \********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var $ = __webpack_require__(/*! ../internals/export */ "./node_modules/core-js/internals/export.js");

var isObject = __webpack_require__(/*! ../internals/is-object */ "./node_modules/core-js/internals/is-object.js");

var isArray = __webpack_require__(/*! ../internals/is-array */ "./node_modules/core-js/internals/is-array.js");

var toAbsoluteIndex = __webpack_require__(/*! ../internals/to-absolute-index */ "./node_modules/core-js/internals/to-absolute-index.js");

var toLength = __webpack_require__(/*! ../internals/to-length */ "./node_modules/core-js/internals/to-length.js");

var toIndexedObject = __webpack_require__(/*! ../internals/to-indexed-object */ "./node_modules/core-js/internals/to-indexed-object.js");

var createProperty = __webpack_require__(/*! ../internals/create-property */ "./node_modules/core-js/internals/create-property.js");

var arrayMethodHasSpeciesSupport = __webpack_require__(/*! ../internals/array-method-has-species-support */ "./node_modules/core-js/internals/array-method-has-species-support.js");

var wellKnownSymbol = __webpack_require__(/*! ../internals/well-known-symbol */ "./node_modules/core-js/internals/well-known-symbol.js");

var SPECIES = wellKnownSymbol('species');
var nativeSlice = [].slice;
var max = Math.max; // `Array.prototype.slice` method
// https://tc39.github.io/ecma262/#sec-array.prototype.slice
// fallback for not array-like ES3 strings and DOM objects

$({
  target: 'Array',
  proto: true,
  forced: !arrayMethodHasSpeciesSupport('slice')
}, {
  slice: function slice(start, end) {
    var O = toIndexedObject(this);
    var length = toLength(O.length);
    var k = toAbsoluteIndex(start, length);
    var fin = toAbsoluteIndex(end === undefined ? length : end, length); // inline `ArraySpeciesCreate` for usage native `Array#slice` where it's possible

    var Constructor, result, n;

    if (isArray(O)) {
      Constructor = O.constructor; // cross-realm fallback

      if (typeof Constructor == 'function' && (Constructor === Array || isArray(Constructor.prototype))) {
        Constructor = undefined;
      } else if (isObject(Constructor)) {
        Constructor = Constructor[SPECIES];
        if (Constructor === null) Constructor = undefined;
      }

      if (Constructor === Array || Constructor === undefined) {
        return nativeSlice.call(O, k, fin);
      }
    }

    result = new (Constructor === undefined ? Array : Constructor)(max(fin - k, 0));

    for (n = 0; k < fin; k++, n++) {
      if (k in O) createProperty(result, n, O[k]);
    }

    result.length = n;
    return result;
  }
});

/***/ }),

/***/ "./node_modules/core-js/modules/es.array.some.js":
/*!*******************************************************!*\
  !*** ./node_modules/core-js/modules/es.array.some.js ***!
  \*******************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var $ = __webpack_require__(/*! ../internals/export */ "./node_modules/core-js/internals/export.js");

var $some = __webpack_require__(/*! ../internals/array-iteration */ "./node_modules/core-js/internals/array-iteration.js").some;

var sloppyArrayMethod = __webpack_require__(/*! ../internals/sloppy-array-method */ "./node_modules/core-js/internals/sloppy-array-method.js"); // `Array.prototype.some` method
// https://tc39.github.io/ecma262/#sec-array.prototype.some


$({
  target: 'Array',
  proto: true,
  forced: sloppyArrayMethod('some')
}, {
  some: function some(callbackfn
  /* , thisArg */
  ) {
    return $some(this, callbackfn, arguments.length > 1 ? arguments[1] : undefined);
  }
});

/***/ }),

/***/ "./node_modules/core-js/modules/es.array.sort.js":
/*!*******************************************************!*\
  !*** ./node_modules/core-js/modules/es.array.sort.js ***!
  \*******************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var $ = __webpack_require__(/*! ../internals/export */ "./node_modules/core-js/internals/export.js");

var aFunction = __webpack_require__(/*! ../internals/a-function */ "./node_modules/core-js/internals/a-function.js");

var toObject = __webpack_require__(/*! ../internals/to-object */ "./node_modules/core-js/internals/to-object.js");

var fails = __webpack_require__(/*! ../internals/fails */ "./node_modules/core-js/internals/fails.js");

var sloppyArrayMethod = __webpack_require__(/*! ../internals/sloppy-array-method */ "./node_modules/core-js/internals/sloppy-array-method.js");

var test = [];
var nativeSort = test.sort; // IE8-

var FAILS_ON_UNDEFINED = fails(function () {
  test.sort(undefined);
}); // V8 bug

var FAILS_ON_NULL = fails(function () {
  test.sort(null);
}); // Old WebKit

var SLOPPY_METHOD = sloppyArrayMethod('sort');
var FORCED = FAILS_ON_UNDEFINED || !FAILS_ON_NULL || SLOPPY_METHOD; // `Array.prototype.sort` method
// https://tc39.github.io/ecma262/#sec-array.prototype.sort

$({
  target: 'Array',
  proto: true,
  forced: FORCED
}, {
  sort: function sort(comparefn) {
    return comparefn === undefined ? nativeSort.call(toObject(this)) : nativeSort.call(toObject(this), aFunction(comparefn));
  }
});

/***/ }),

/***/ "./node_modules/core-js/modules/es.array.species.js":
/*!**********************************************************!*\
  !*** ./node_modules/core-js/modules/es.array.species.js ***!
  \**********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var setSpecies = __webpack_require__(/*! ../internals/set-species */ "./node_modules/core-js/internals/set-species.js"); // `Array[@@species]` getter
// https://tc39.github.io/ecma262/#sec-get-array-@@species


setSpecies('Array');

/***/ }),

/***/ "./node_modules/core-js/modules/es.array.splice.js":
/*!*********************************************************!*\
  !*** ./node_modules/core-js/modules/es.array.splice.js ***!
  \*********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var $ = __webpack_require__(/*! ../internals/export */ "./node_modules/core-js/internals/export.js");

var toAbsoluteIndex = __webpack_require__(/*! ../internals/to-absolute-index */ "./node_modules/core-js/internals/to-absolute-index.js");

var toInteger = __webpack_require__(/*! ../internals/to-integer */ "./node_modules/core-js/internals/to-integer.js");

var toLength = __webpack_require__(/*! ../internals/to-length */ "./node_modules/core-js/internals/to-length.js");

var toObject = __webpack_require__(/*! ../internals/to-object */ "./node_modules/core-js/internals/to-object.js");

var arraySpeciesCreate = __webpack_require__(/*! ../internals/array-species-create */ "./node_modules/core-js/internals/array-species-create.js");

var createProperty = __webpack_require__(/*! ../internals/create-property */ "./node_modules/core-js/internals/create-property.js");

var arrayMethodHasSpeciesSupport = __webpack_require__(/*! ../internals/array-method-has-species-support */ "./node_modules/core-js/internals/array-method-has-species-support.js");

var max = Math.max;
var min = Math.min;
var MAX_SAFE_INTEGER = 0x1FFFFFFFFFFFFF;
var MAXIMUM_ALLOWED_LENGTH_EXCEEDED = 'Maximum allowed length exceeded'; // `Array.prototype.splice` method
// https://tc39.github.io/ecma262/#sec-array.prototype.splice
// with adding support of @@species

$({
  target: 'Array',
  proto: true,
  forced: !arrayMethodHasSpeciesSupport('splice')
}, {
  splice: function splice(start, deleteCount
  /* , ...items */
  ) {
    var O = toObject(this);
    var len = toLength(O.length);
    var actualStart = toAbsoluteIndex(start, len);
    var argumentsLength = arguments.length;
    var insertCount, actualDeleteCount, A, k, from, to;

    if (argumentsLength === 0) {
      insertCount = actualDeleteCount = 0;
    } else if (argumentsLength === 1) {
      insertCount = 0;
      actualDeleteCount = len - actualStart;
    } else {
      insertCount = argumentsLength - 2;
      actualDeleteCount = min(max(toInteger(deleteCount), 0), len - actualStart);
    }

    if (len + insertCount - actualDeleteCount > MAX_SAFE_INTEGER) {
      throw TypeError(MAXIMUM_ALLOWED_LENGTH_EXCEEDED);
    }

    A = arraySpeciesCreate(O, actualDeleteCount);

    for (k = 0; k < actualDeleteCount; k++) {
      from = actualStart + k;
      if (from in O) createProperty(A, k, O[from]);
    }

    A.length = actualDeleteCount;

    if (insertCount < actualDeleteCount) {
      for (k = actualStart; k < len - actualDeleteCount; k++) {
        from = k + actualDeleteCount;
        to = k + insertCount;
        if (from in O) O[to] = O[from];else delete O[to];
      }

      for (k = len; k > len - actualDeleteCount + insertCount; k--) {
        delete O[k - 1];
      }
    } else if (insertCount > actualDeleteCount) {
      for (k = len - actualDeleteCount; k > actualStart; k--) {
        from = k + actualDeleteCount - 1;
        to = k + insertCount - 1;
        if (from in O) O[to] = O[from];else delete O[to];
      }
    }

    for (k = 0; k < insertCount; k++) {
      O[k + actualStart] = arguments[k + 2];
    }

    O.length = len - actualDeleteCount + insertCount;
    return A;
  }
});

/***/ }),

/***/ "./node_modules/core-js/modules/es.array.unscopables.flat-map.js":
/*!***********************************************************************!*\
  !*** ./node_modules/core-js/modules/es.array.unscopables.flat-map.js ***!
  \***********************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

// this method was added to unscopables after implementation
// in popular engines, so it's moved to a separate module
var addToUnscopables = __webpack_require__(/*! ../internals/add-to-unscopables */ "./node_modules/core-js/internals/add-to-unscopables.js");

addToUnscopables('flatMap');

/***/ }),

/***/ "./node_modules/core-js/modules/es.array.unscopables.flat.js":
/*!*******************************************************************!*\
  !*** ./node_modules/core-js/modules/es.array.unscopables.flat.js ***!
  \*******************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

// this method was added to unscopables after implementation
// in popular engines, so it's moved to a separate module
var addToUnscopables = __webpack_require__(/*! ../internals/add-to-unscopables */ "./node_modules/core-js/internals/add-to-unscopables.js");

addToUnscopables('flat');

/***/ }),

/***/ "./node_modules/core-js/modules/es.object.to-string.js":
/*!*************************************************************!*\
  !*** ./node_modules/core-js/modules/es.object.to-string.js ***!
  \*************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var TO_STRING_TAG_SUPPORT = __webpack_require__(/*! ../internals/to-string-tag-support */ "./node_modules/core-js/internals/to-string-tag-support.js");

var redefine = __webpack_require__(/*! ../internals/redefine */ "./node_modules/core-js/internals/redefine.js");

var toString = __webpack_require__(/*! ../internals/object-to-string */ "./node_modules/core-js/internals/object-to-string.js"); // `Object.prototype.toString` method
// https://tc39.github.io/ecma262/#sec-object.prototype.tostring


if (!TO_STRING_TAG_SUPPORT) {
  redefine(Object.prototype, 'toString', toString, {
    unsafe: true
  });
}

/***/ }),

/***/ "./node_modules/core-js/modules/es.object.values.js":
/*!**********************************************************!*\
  !*** ./node_modules/core-js/modules/es.object.values.js ***!
  \**********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var $ = __webpack_require__(/*! ../internals/export */ "./node_modules/core-js/internals/export.js");

var $values = __webpack_require__(/*! ../internals/object-to-array */ "./node_modules/core-js/internals/object-to-array.js").values; // `Object.values` method
// https://tc39.github.io/ecma262/#sec-object.values


$({
  target: 'Object',
  stat: true
}, {
  values: function values(O) {
    return $values(O);
  }
});

/***/ }),

/***/ "./node_modules/core-js/modules/es.promise.all-settled.js":
/*!****************************************************************!*\
  !*** ./node_modules/core-js/modules/es.promise.all-settled.js ***!
  \****************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var $ = __webpack_require__(/*! ../internals/export */ "./node_modules/core-js/internals/export.js");

var aFunction = __webpack_require__(/*! ../internals/a-function */ "./node_modules/core-js/internals/a-function.js");

var newPromiseCapabilityModule = __webpack_require__(/*! ../internals/new-promise-capability */ "./node_modules/core-js/internals/new-promise-capability.js");

var perform = __webpack_require__(/*! ../internals/perform */ "./node_modules/core-js/internals/perform.js");

var iterate = __webpack_require__(/*! ../internals/iterate */ "./node_modules/core-js/internals/iterate.js"); // `Promise.allSettled` method
// https://github.com/tc39/proposal-promise-allSettled


$({
  target: 'Promise',
  stat: true
}, {
  allSettled: function allSettled(iterable) {
    var C = this;
    var capability = newPromiseCapabilityModule.f(C);
    var resolve = capability.resolve;
    var reject = capability.reject;
    var result = perform(function () {
      var promiseResolve = aFunction(C.resolve);
      var values = [];
      var counter = 0;
      var remaining = 1;
      iterate(iterable, function (promise) {
        var index = counter++;
        var alreadyCalled = false;
        values.push(undefined);
        remaining++;
        promiseResolve.call(C, promise).then(function (value) {
          if (alreadyCalled) return;
          alreadyCalled = true;
          values[index] = {
            status: 'fulfilled',
            value: value
          };
          --remaining || resolve(values);
        }, function (e) {
          if (alreadyCalled) return;
          alreadyCalled = true;
          values[index] = {
            status: 'rejected',
            reason: e
          };
          --remaining || resolve(values);
        });
      });
      --remaining || resolve(values);
    });
    if (result.error) reject(result.value);
    return capability.promise;
  }
});

/***/ }),

/***/ "./node_modules/core-js/modules/es.promise.finally.js":
/*!************************************************************!*\
  !*** ./node_modules/core-js/modules/es.promise.finally.js ***!
  \************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var $ = __webpack_require__(/*! ../internals/export */ "./node_modules/core-js/internals/export.js");

var IS_PURE = __webpack_require__(/*! ../internals/is-pure */ "./node_modules/core-js/internals/is-pure.js");

var NativePromise = __webpack_require__(/*! ../internals/native-promise-constructor */ "./node_modules/core-js/internals/native-promise-constructor.js");

var fails = __webpack_require__(/*! ../internals/fails */ "./node_modules/core-js/internals/fails.js");

var getBuiltIn = __webpack_require__(/*! ../internals/get-built-in */ "./node_modules/core-js/internals/get-built-in.js");

var speciesConstructor = __webpack_require__(/*! ../internals/species-constructor */ "./node_modules/core-js/internals/species-constructor.js");

var promiseResolve = __webpack_require__(/*! ../internals/promise-resolve */ "./node_modules/core-js/internals/promise-resolve.js");

var redefine = __webpack_require__(/*! ../internals/redefine */ "./node_modules/core-js/internals/redefine.js"); // Safari bug https://bugs.webkit.org/show_bug.cgi?id=200829


var NON_GENERIC = !!NativePromise && fails(function () {
  NativePromise.prototype['finally'].call({
    then: function then() {
      /* empty */
    }
  }, function () {
    /* empty */
  });
}); // `Promise.prototype.finally` method
// https://tc39.github.io/ecma262/#sec-promise.prototype.finally

$({
  target: 'Promise',
  proto: true,
  real: true,
  forced: NON_GENERIC
}, {
  'finally': function _finally(onFinally) {
    var C = speciesConstructor(this, getBuiltIn('Promise'));
    var isFunction = typeof onFinally == 'function';
    return this.then(isFunction ? function (x) {
      return promiseResolve(C, onFinally()).then(function () {
        return x;
      });
    } : onFinally, isFunction ? function (e) {
      return promiseResolve(C, onFinally()).then(function () {
        throw e;
      });
    } : onFinally);
  }
}); // patch native Promise.prototype for native async functions

if (!IS_PURE && typeof NativePromise == 'function' && !NativePromise.prototype['finally']) {
  redefine(NativePromise.prototype, 'finally', getBuiltIn('Promise').prototype['finally']);
}

/***/ }),

/***/ "./node_modules/core-js/modules/es.promise.js":
/*!****************************************************!*\
  !*** ./node_modules/core-js/modules/es.promise.js ***!
  \****************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var $ = __webpack_require__(/*! ../internals/export */ "./node_modules/core-js/internals/export.js");

var IS_PURE = __webpack_require__(/*! ../internals/is-pure */ "./node_modules/core-js/internals/is-pure.js");

var global = __webpack_require__(/*! ../internals/global */ "./node_modules/core-js/internals/global.js");

var getBuiltIn = __webpack_require__(/*! ../internals/get-built-in */ "./node_modules/core-js/internals/get-built-in.js");

var NativePromise = __webpack_require__(/*! ../internals/native-promise-constructor */ "./node_modules/core-js/internals/native-promise-constructor.js");

var redefine = __webpack_require__(/*! ../internals/redefine */ "./node_modules/core-js/internals/redefine.js");

var redefineAll = __webpack_require__(/*! ../internals/redefine-all */ "./node_modules/core-js/internals/redefine-all.js");

var setToStringTag = __webpack_require__(/*! ../internals/set-to-string-tag */ "./node_modules/core-js/internals/set-to-string-tag.js");

var setSpecies = __webpack_require__(/*! ../internals/set-species */ "./node_modules/core-js/internals/set-species.js");

var isObject = __webpack_require__(/*! ../internals/is-object */ "./node_modules/core-js/internals/is-object.js");

var aFunction = __webpack_require__(/*! ../internals/a-function */ "./node_modules/core-js/internals/a-function.js");

var anInstance = __webpack_require__(/*! ../internals/an-instance */ "./node_modules/core-js/internals/an-instance.js");

var classof = __webpack_require__(/*! ../internals/classof-raw */ "./node_modules/core-js/internals/classof-raw.js");

var inspectSource = __webpack_require__(/*! ../internals/inspect-source */ "./node_modules/core-js/internals/inspect-source.js");

var iterate = __webpack_require__(/*! ../internals/iterate */ "./node_modules/core-js/internals/iterate.js");

var checkCorrectnessOfIteration = __webpack_require__(/*! ../internals/check-correctness-of-iteration */ "./node_modules/core-js/internals/check-correctness-of-iteration.js");

var speciesConstructor = __webpack_require__(/*! ../internals/species-constructor */ "./node_modules/core-js/internals/species-constructor.js");

var task = __webpack_require__(/*! ../internals/task */ "./node_modules/core-js/internals/task.js").set;

var microtask = __webpack_require__(/*! ../internals/microtask */ "./node_modules/core-js/internals/microtask.js");

var promiseResolve = __webpack_require__(/*! ../internals/promise-resolve */ "./node_modules/core-js/internals/promise-resolve.js");

var hostReportErrors = __webpack_require__(/*! ../internals/host-report-errors */ "./node_modules/core-js/internals/host-report-errors.js");

var newPromiseCapabilityModule = __webpack_require__(/*! ../internals/new-promise-capability */ "./node_modules/core-js/internals/new-promise-capability.js");

var perform = __webpack_require__(/*! ../internals/perform */ "./node_modules/core-js/internals/perform.js");

var InternalStateModule = __webpack_require__(/*! ../internals/internal-state */ "./node_modules/core-js/internals/internal-state.js");

var isForced = __webpack_require__(/*! ../internals/is-forced */ "./node_modules/core-js/internals/is-forced.js");

var wellKnownSymbol = __webpack_require__(/*! ../internals/well-known-symbol */ "./node_modules/core-js/internals/well-known-symbol.js");

var V8_VERSION = __webpack_require__(/*! ../internals/v8-version */ "./node_modules/core-js/internals/v8-version.js");

var SPECIES = wellKnownSymbol('species');
var PROMISE = 'Promise';
var getInternalState = InternalStateModule.get;
var setInternalState = InternalStateModule.set;
var getInternalPromiseState = InternalStateModule.getterFor(PROMISE);
var PromiseConstructor = NativePromise;
var TypeError = global.TypeError;
var document = global.document;
var process = global.process;
var $fetch = getBuiltIn('fetch');
var newPromiseCapability = newPromiseCapabilityModule.f;
var newGenericPromiseCapability = newPromiseCapability;
var IS_NODE = classof(process) == 'process';
var DISPATCH_EVENT = !!(document && document.createEvent && global.dispatchEvent);
var UNHANDLED_REJECTION = 'unhandledrejection';
var REJECTION_HANDLED = 'rejectionhandled';
var PENDING = 0;
var FULFILLED = 1;
var REJECTED = 2;
var HANDLED = 1;
var UNHANDLED = 2;
var Internal, OwnPromiseCapability, PromiseWrapper, nativeThen;
var FORCED = isForced(PROMISE, function () {
  var GLOBAL_CORE_JS_PROMISE = inspectSource(PromiseConstructor) !== String(PromiseConstructor);

  if (!GLOBAL_CORE_JS_PROMISE) {
    // V8 6.6 (Node 10 and Chrome 66) have a bug with resolving custom thenables
    // https://bugs.chromium.org/p/chromium/issues/detail?id=830565
    // We can't detect it synchronously, so just check versions
    if (V8_VERSION === 66) return true; // Unhandled rejections tracking support, NodeJS Promise without it fails @@species test

    if (!IS_NODE && typeof PromiseRejectionEvent != 'function') return true;
  } // We need Promise#finally in the pure version for preventing prototype pollution


  if (IS_PURE && !PromiseConstructor.prototype['finally']) return true; // We can't use @@species feature detection in V8 since it causes
  // deoptimization and performance degradation
  // https://github.com/zloirock/core-js/issues/679

  if (V8_VERSION >= 51 && /native code/.test(PromiseConstructor)) return false; // Detect correctness of subclassing with @@species support

  var promise = PromiseConstructor.resolve(1);

  var FakePromise = function FakePromise(exec) {
    exec(function () {
      /* empty */
    }, function () {
      /* empty */
    });
  };

  var constructor = promise.constructor = {};
  constructor[SPECIES] = FakePromise;
  return !(promise.then(function () {
    /* empty */
  }) instanceof FakePromise);
});
var INCORRECT_ITERATION = FORCED || !checkCorrectnessOfIteration(function (iterable) {
  PromiseConstructor.all(iterable)['catch'](function () {
    /* empty */
  });
}); // helpers

var isThenable = function isThenable(it) {
  var then;
  return isObject(it) && typeof (then = it.then) == 'function' ? then : false;
};

var notify = function notify(promise, state, isReject) {
  if (state.notified) return;
  state.notified = true;
  var chain = state.reactions;
  microtask(function () {
    var value = state.value;
    var ok = state.state == FULFILLED;
    var index = 0; // variable length - can't use forEach

    while (chain.length > index) {
      var reaction = chain[index++];
      var handler = ok ? reaction.ok : reaction.fail;
      var resolve = reaction.resolve;
      var reject = reaction.reject;
      var domain = reaction.domain;
      var result, then, exited;

      try {
        if (handler) {
          if (!ok) {
            if (state.rejection === UNHANDLED) onHandleUnhandled(promise, state);
            state.rejection = HANDLED;
          }

          if (handler === true) result = value;else {
            if (domain) domain.enter();
            result = handler(value); // can throw

            if (domain) {
              domain.exit();
              exited = true;
            }
          }

          if (result === reaction.promise) {
            reject(TypeError('Promise-chain cycle'));
          } else if (then = isThenable(result)) {
            then.call(result, resolve, reject);
          } else resolve(result);
        } else reject(value);
      } catch (error) {
        if (domain && !exited) domain.exit();
        reject(error);
      }
    }

    state.reactions = [];
    state.notified = false;
    if (isReject && !state.rejection) onUnhandled(promise, state);
  });
};

var dispatchEvent = function dispatchEvent(name, promise, reason) {
  var event, handler;

  if (DISPATCH_EVENT) {
    event = document.createEvent('Event');
    event.promise = promise;
    event.reason = reason;
    event.initEvent(name, false, true);
    global.dispatchEvent(event);
  } else event = {
    promise: promise,
    reason: reason
  };

  if (handler = global['on' + name]) handler(event);else if (name === UNHANDLED_REJECTION) hostReportErrors('Unhandled promise rejection', reason);
};

var onUnhandled = function onUnhandled(promise, state) {
  task.call(global, function () {
    var value = state.value;
    var IS_UNHANDLED = isUnhandled(state);
    var result;

    if (IS_UNHANDLED) {
      result = perform(function () {
        if (IS_NODE) {
          process.emit('unhandledRejection', value, promise);
        } else dispatchEvent(UNHANDLED_REJECTION, promise, value);
      }); // Browsers should not trigger `rejectionHandled` event if it was handled here, NodeJS - should

      state.rejection = IS_NODE || isUnhandled(state) ? UNHANDLED : HANDLED;
      if (result.error) throw result.value;
    }
  });
};

var isUnhandled = function isUnhandled(state) {
  return state.rejection !== HANDLED && !state.parent;
};

var onHandleUnhandled = function onHandleUnhandled(promise, state) {
  task.call(global, function () {
    if (IS_NODE) {
      process.emit('rejectionHandled', promise);
    } else dispatchEvent(REJECTION_HANDLED, promise, state.value);
  });
};

var bind = function bind(fn, promise, state, unwrap) {
  return function (value) {
    fn(promise, state, value, unwrap);
  };
};

var internalReject = function internalReject(promise, state, value, unwrap) {
  if (state.done) return;
  state.done = true;
  if (unwrap) state = unwrap;
  state.value = value;
  state.state = REJECTED;
  notify(promise, state, true);
};

var internalResolve = function internalResolve(promise, state, value, unwrap) {
  if (state.done) return;
  state.done = true;
  if (unwrap) state = unwrap;

  try {
    if (promise === value) throw TypeError("Promise can't be resolved itself");
    var then = isThenable(value);

    if (then) {
      microtask(function () {
        var wrapper = {
          done: false
        };

        try {
          then.call(value, bind(internalResolve, promise, wrapper, state), bind(internalReject, promise, wrapper, state));
        } catch (error) {
          internalReject(promise, wrapper, error, state);
        }
      });
    } else {
      state.value = value;
      state.state = FULFILLED;
      notify(promise, state, false);
    }
  } catch (error) {
    internalReject(promise, {
      done: false
    }, error, state);
  }
}; // constructor polyfill


if (FORCED) {
  // 25.4.3.1 Promise(executor)
  PromiseConstructor = function Promise(executor) {
    anInstance(this, PromiseConstructor, PROMISE);
    aFunction(executor);
    Internal.call(this);
    var state = getInternalState(this);

    try {
      executor(bind(internalResolve, this, state), bind(internalReject, this, state));
    } catch (error) {
      internalReject(this, state, error);
    }
  }; // eslint-disable-next-line no-unused-vars


  Internal = function Promise(executor) {
    setInternalState(this, {
      type: PROMISE,
      done: false,
      notified: false,
      parent: false,
      reactions: [],
      rejection: false,
      state: PENDING,
      value: undefined
    });
  };

  Internal.prototype = redefineAll(PromiseConstructor.prototype, {
    // `Promise.prototype.then` method
    // https://tc39.github.io/ecma262/#sec-promise.prototype.then
    then: function then(onFulfilled, onRejected) {
      var state = getInternalPromiseState(this);
      var reaction = newPromiseCapability(speciesConstructor(this, PromiseConstructor));
      reaction.ok = typeof onFulfilled == 'function' ? onFulfilled : true;
      reaction.fail = typeof onRejected == 'function' && onRejected;
      reaction.domain = IS_NODE ? process.domain : undefined;
      state.parent = true;
      state.reactions.push(reaction);
      if (state.state != PENDING) notify(this, state, false);
      return reaction.promise;
    },
    // `Promise.prototype.catch` method
    // https://tc39.github.io/ecma262/#sec-promise.prototype.catch
    'catch': function _catch(onRejected) {
      return this.then(undefined, onRejected);
    }
  });

  OwnPromiseCapability = function OwnPromiseCapability() {
    var promise = new Internal();
    var state = getInternalState(promise);
    this.promise = promise;
    this.resolve = bind(internalResolve, promise, state);
    this.reject = bind(internalReject, promise, state);
  };

  newPromiseCapabilityModule.f = newPromiseCapability = function newPromiseCapability(C) {
    return C === PromiseConstructor || C === PromiseWrapper ? new OwnPromiseCapability(C) : newGenericPromiseCapability(C);
  };

  if (!IS_PURE && typeof NativePromise == 'function') {
    nativeThen = NativePromise.prototype.then; // wrap native Promise#then for native async functions

    redefine(NativePromise.prototype, 'then', function then(onFulfilled, onRejected) {
      var that = this;
      return new PromiseConstructor(function (resolve, reject) {
        nativeThen.call(that, resolve, reject);
      }).then(onFulfilled, onRejected); // https://github.com/zloirock/core-js/issues/640
    }, {
      unsafe: true
    }); // wrap fetch result

    if (typeof $fetch == 'function') $({
      global: true,
      enumerable: true,
      forced: true
    }, {
      // eslint-disable-next-line no-unused-vars
      fetch: function fetch(input
      /* , init */
      ) {
        return promiseResolve(PromiseConstructor, $fetch.apply(global, arguments));
      }
    });
  }
}

$({
  global: true,
  wrap: true,
  forced: FORCED
}, {
  Promise: PromiseConstructor
});
setToStringTag(PromiseConstructor, PROMISE, false, true);
setSpecies(PROMISE);
PromiseWrapper = getBuiltIn(PROMISE); // statics

$({
  target: PROMISE,
  stat: true,
  forced: FORCED
}, {
  // `Promise.reject` method
  // https://tc39.github.io/ecma262/#sec-promise.reject
  reject: function reject(r) {
    var capability = newPromiseCapability(this);
    capability.reject.call(undefined, r);
    return capability.promise;
  }
});
$({
  target: PROMISE,
  stat: true,
  forced: IS_PURE || FORCED
}, {
  // `Promise.resolve` method
  // https://tc39.github.io/ecma262/#sec-promise.resolve
  resolve: function resolve(x) {
    return promiseResolve(IS_PURE && this === PromiseWrapper ? PromiseConstructor : this, x);
  }
});
$({
  target: PROMISE,
  stat: true,
  forced: INCORRECT_ITERATION
}, {
  // `Promise.all` method
  // https://tc39.github.io/ecma262/#sec-promise.all
  all: function all(iterable) {
    var C = this;
    var capability = newPromiseCapability(C);
    var resolve = capability.resolve;
    var reject = capability.reject;
    var result = perform(function () {
      var $promiseResolve = aFunction(C.resolve);
      var values = [];
      var counter = 0;
      var remaining = 1;
      iterate(iterable, function (promise) {
        var index = counter++;
        var alreadyCalled = false;
        values.push(undefined);
        remaining++;
        $promiseResolve.call(C, promise).then(function (value) {
          if (alreadyCalled) return;
          alreadyCalled = true;
          values[index] = value;
          --remaining || resolve(values);
        }, reject);
      });
      --remaining || resolve(values);
    });
    if (result.error) reject(result.value);
    return capability.promise;
  },
  // `Promise.race` method
  // https://tc39.github.io/ecma262/#sec-promise.race
  race: function race(iterable) {
    var C = this;
    var capability = newPromiseCapability(C);
    var reject = capability.reject;
    var result = perform(function () {
      var $promiseResolve = aFunction(C.resolve);
      iterate(iterable, function (promise) {
        $promiseResolve.call(C, promise).then(capability.resolve, reject);
      });
    });
    if (result.error) reject(result.value);
    return capability.promise;
  }
});

/***/ }),

/***/ "./node_modules/core-js/modules/es.string.iterator.js":
/*!************************************************************!*\
  !*** ./node_modules/core-js/modules/es.string.iterator.js ***!
  \************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var charAt = __webpack_require__(/*! ../internals/string-multibyte */ "./node_modules/core-js/internals/string-multibyte.js").charAt;

var InternalStateModule = __webpack_require__(/*! ../internals/internal-state */ "./node_modules/core-js/internals/internal-state.js");

var defineIterator = __webpack_require__(/*! ../internals/define-iterator */ "./node_modules/core-js/internals/define-iterator.js");

var STRING_ITERATOR = 'String Iterator';
var setInternalState = InternalStateModule.set;
var getInternalState = InternalStateModule.getterFor(STRING_ITERATOR); // `String.prototype[@@iterator]` method
// https://tc39.github.io/ecma262/#sec-string.prototype-@@iterator

defineIterator(String, 'String', function (iterated) {
  setInternalState(this, {
    type: STRING_ITERATOR,
    string: String(iterated),
    index: 0
  }); // `%StringIteratorPrototype%.next` method
  // https://tc39.github.io/ecma262/#sec-%stringiteratorprototype%.next
}, function next() {
  var state = getInternalState(this);
  var string = state.string;
  var index = state.index;
  var point;
  if (index >= string.length) return {
    value: undefined,
    done: true
  };
  point = charAt(string, index);
  state.index += point.length;
  return {
    value: point,
    done: false
  };
});

/***/ }),

/***/ "./node_modules/core-js/modules/esnext.aggregate-error.js":
/*!****************************************************************!*\
  !*** ./node_modules/core-js/modules/esnext.aggregate-error.js ***!
  \****************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var $ = __webpack_require__(/*! ../internals/export */ "./node_modules/core-js/internals/export.js");

var DESCRIPTORS = __webpack_require__(/*! ../internals/descriptors */ "./node_modules/core-js/internals/descriptors.js");

var getPrototypeOf = __webpack_require__(/*! ../internals/object-get-prototype-of */ "./node_modules/core-js/internals/object-get-prototype-of.js");

var setPrototypeOf = __webpack_require__(/*! ../internals/object-set-prototype-of */ "./node_modules/core-js/internals/object-set-prototype-of.js");

var create = __webpack_require__(/*! ../internals/object-create */ "./node_modules/core-js/internals/object-create.js");

var defineProperty = __webpack_require__(/*! ../internals/object-define-property */ "./node_modules/core-js/internals/object-define-property.js");

var createPropertyDescriptor = __webpack_require__(/*! ../internals/create-property-descriptor */ "./node_modules/core-js/internals/create-property-descriptor.js");

var iterate = __webpack_require__(/*! ../internals/iterate */ "./node_modules/core-js/internals/iterate.js");

var createNonEnumerableProperty = __webpack_require__(/*! ../internals/create-non-enumerable-property */ "./node_modules/core-js/internals/create-non-enumerable-property.js");

var InternalStateModule = __webpack_require__(/*! ../internals/internal-state */ "./node_modules/core-js/internals/internal-state.js");

var setInternalState = InternalStateModule.set;
var getInternalAggregateErrorState = InternalStateModule.getterFor('AggregateError');

var $AggregateError = function AggregateError(errors, message) {
  var that = this;
  if (!(that instanceof $AggregateError)) return new $AggregateError(errors, message);

  if (setPrototypeOf) {
    that = setPrototypeOf(new Error(message), getPrototypeOf(that));
  }

  var errorsArray = [];
  iterate(errors, errorsArray.push, errorsArray);
  if (DESCRIPTORS) setInternalState(that, {
    errors: errorsArray,
    type: 'AggregateError'
  });else that.errors = errorsArray;
  if (message !== undefined) createNonEnumerableProperty(that, 'message', String(message));
  return that;
};

$AggregateError.prototype = create(Error.prototype, {
  constructor: createPropertyDescriptor(5, $AggregateError),
  message: createPropertyDescriptor(5, ''),
  name: createPropertyDescriptor(5, 'AggregateError')
});
if (DESCRIPTORS) defineProperty.f($AggregateError.prototype, 'errors', {
  get: function get() {
    return getInternalAggregateErrorState(this).errors;
  },
  configurable: true
});
$({
  global: true
}, {
  AggregateError: $AggregateError
});

/***/ }),

/***/ "./node_modules/core-js/modules/esnext.array.is-template-object.js":
/*!*************************************************************************!*\
  !*** ./node_modules/core-js/modules/esnext.array.is-template-object.js ***!
  \*************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var $ = __webpack_require__(/*! ../internals/export */ "./node_modules/core-js/internals/export.js");

var isArray = __webpack_require__(/*! ../internals/is-array */ "./node_modules/core-js/internals/is-array.js");

var isFrozen = Object.isFrozen;

var isFrozenStringArray = function isFrozenStringArray(array, allowUndefined) {
  if (!isFrozen || !isArray(array) || !isFrozen(array)) return false;
  var index = 0;
  var length = array.length;
  var element;

  while (index < length) {
    element = array[index++];

    if (!(typeof element === 'string' || allowUndefined && typeof element === 'undefined')) {
      return false;
    }
  }

  return length !== 0;
}; // `Array.isTemplateObject` method
// https://github.com/tc39/proposal-array-is-template-object


$({
  target: 'Array',
  stat: true
}, {
  isTemplateObject: function isTemplateObject(value) {
    if (!isFrozenStringArray(value, true)) return false;
    var raw = value.raw;
    if (raw.length !== value.length || !isFrozenStringArray(raw, false)) return false;
    return true;
  }
});

/***/ }),

/***/ "./node_modules/core-js/modules/esnext.array.last-index.js":
/*!*****************************************************************!*\
  !*** ./node_modules/core-js/modules/esnext.array.last-index.js ***!
  \*****************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var DESCRIPTORS = __webpack_require__(/*! ../internals/descriptors */ "./node_modules/core-js/internals/descriptors.js");

var addToUnscopables = __webpack_require__(/*! ../internals/add-to-unscopables */ "./node_modules/core-js/internals/add-to-unscopables.js");

var toObject = __webpack_require__(/*! ../internals/to-object */ "./node_modules/core-js/internals/to-object.js");

var toLength = __webpack_require__(/*! ../internals/to-length */ "./node_modules/core-js/internals/to-length.js");

var defineProperty = __webpack_require__(/*! ../internals/object-define-property */ "./node_modules/core-js/internals/object-define-property.js").f; // `Array.prototype.lastIndex` getter
// https://github.com/keithamus/proposal-array-last


if (DESCRIPTORS && !('lastIndex' in [])) {
  defineProperty(Array.prototype, 'lastIndex', {
    configurable: true,
    get: function lastIndex() {
      var O = toObject(this);
      var len = toLength(O.length);
      return len == 0 ? 0 : len - 1;
    }
  });
  addToUnscopables('lastIndex');
}

/***/ }),

/***/ "./node_modules/core-js/modules/esnext.array.last-item.js":
/*!****************************************************************!*\
  !*** ./node_modules/core-js/modules/esnext.array.last-item.js ***!
  \****************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var DESCRIPTORS = __webpack_require__(/*! ../internals/descriptors */ "./node_modules/core-js/internals/descriptors.js");

var addToUnscopables = __webpack_require__(/*! ../internals/add-to-unscopables */ "./node_modules/core-js/internals/add-to-unscopables.js");

var toObject = __webpack_require__(/*! ../internals/to-object */ "./node_modules/core-js/internals/to-object.js");

var toLength = __webpack_require__(/*! ../internals/to-length */ "./node_modules/core-js/internals/to-length.js");

var defineProperty = __webpack_require__(/*! ../internals/object-define-property */ "./node_modules/core-js/internals/object-define-property.js").f; // `Array.prototype.lastIndex` accessor
// https://github.com/keithamus/proposal-array-last


if (DESCRIPTORS && !('lastItem' in [])) {
  defineProperty(Array.prototype, 'lastItem', {
    configurable: true,
    get: function lastItem() {
      var O = toObject(this);
      var len = toLength(O.length);
      return len == 0 ? undefined : O[len - 1];
    },
    set: function lastItem(value) {
      var O = toObject(this);
      var len = toLength(O.length);
      return O[len == 0 ? 0 : len - 1] = value;
    }
  });
  addToUnscopables('lastItem');
}

/***/ }),

/***/ "./node_modules/core-js/modules/esnext.promise.all-settled.js":
/*!********************************************************************!*\
  !*** ./node_modules/core-js/modules/esnext.promise.all-settled.js ***!
  \********************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

// TODO: Remove from `core-js@4`
__webpack_require__(/*! ./es.promise.all-settled.js */ "./node_modules/core-js/modules/es.promise.all-settled.js");

/***/ }),

/***/ "./node_modules/core-js/modules/esnext.promise.any.js":
/*!************************************************************!*\
  !*** ./node_modules/core-js/modules/esnext.promise.any.js ***!
  \************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var $ = __webpack_require__(/*! ../internals/export */ "./node_modules/core-js/internals/export.js");

var aFunction = __webpack_require__(/*! ../internals/a-function */ "./node_modules/core-js/internals/a-function.js");

var getBuiltIn = __webpack_require__(/*! ../internals/get-built-in */ "./node_modules/core-js/internals/get-built-in.js");

var newPromiseCapabilityModule = __webpack_require__(/*! ../internals/new-promise-capability */ "./node_modules/core-js/internals/new-promise-capability.js");

var perform = __webpack_require__(/*! ../internals/perform */ "./node_modules/core-js/internals/perform.js");

var iterate = __webpack_require__(/*! ../internals/iterate */ "./node_modules/core-js/internals/iterate.js");

var PROMISE_ANY_ERROR = 'No one promise resolved'; // `Promise.any` method
// https://github.com/tc39/proposal-promise-any

$({
  target: 'Promise',
  stat: true
}, {
  any: function any(iterable) {
    var C = this;
    var capability = newPromiseCapabilityModule.f(C);
    var resolve = capability.resolve;
    var reject = capability.reject;
    var result = perform(function () {
      var promiseResolve = aFunction(C.resolve);
      var errors = [];
      var counter = 0;
      var remaining = 1;
      var alreadyResolved = false;
      iterate(iterable, function (promise) {
        var index = counter++;
        var alreadyRejected = false;
        errors.push(undefined);
        remaining++;
        promiseResolve.call(C, promise).then(function (value) {
          if (alreadyRejected || alreadyResolved) return;
          alreadyResolved = true;
          resolve(value);
        }, function (e) {
          if (alreadyRejected || alreadyResolved) return;
          alreadyRejected = true;
          errors[index] = e;
          --remaining || reject(new (getBuiltIn('AggregateError'))(errors, PROMISE_ANY_ERROR));
        });
      });
      --remaining || reject(new (getBuiltIn('AggregateError'))(errors, PROMISE_ANY_ERROR));
    });
    if (result.error) reject(result.value);
    return capability.promise;
  }
});

/***/ }),

/***/ "./node_modules/core-js/modules/esnext.promise.try.js":
/*!************************************************************!*\
  !*** ./node_modules/core-js/modules/esnext.promise.try.js ***!
  \************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var $ = __webpack_require__(/*! ../internals/export */ "./node_modules/core-js/internals/export.js");

var newPromiseCapabilityModule = __webpack_require__(/*! ../internals/new-promise-capability */ "./node_modules/core-js/internals/new-promise-capability.js");

var perform = __webpack_require__(/*! ../internals/perform */ "./node_modules/core-js/internals/perform.js"); // `Promise.try` method
// https://github.com/tc39/proposal-promise-try


$({
  target: 'Promise',
  stat: true
}, {
  'try': function _try(callbackfn) {
    var promiseCapability = newPromiseCapabilityModule.f(this);
    var result = perform(callbackfn);
    (result.error ? promiseCapability.reject : promiseCapability.resolve)(result.value);
    return promiseCapability.promise;
  }
});

/***/ }),

/***/ "./node_modules/core-js/modules/web.dom-collections.iterator.js":
/*!**********************************************************************!*\
  !*** ./node_modules/core-js/modules/web.dom-collections.iterator.js ***!
  \**********************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var global = __webpack_require__(/*! ../internals/global */ "./node_modules/core-js/internals/global.js");

var DOMIterables = __webpack_require__(/*! ../internals/dom-iterables */ "./node_modules/core-js/internals/dom-iterables.js");

var ArrayIteratorMethods = __webpack_require__(/*! ../modules/es.array.iterator */ "./node_modules/core-js/modules/es.array.iterator.js");

var createNonEnumerableProperty = __webpack_require__(/*! ../internals/create-non-enumerable-property */ "./node_modules/core-js/internals/create-non-enumerable-property.js");

var wellKnownSymbol = __webpack_require__(/*! ../internals/well-known-symbol */ "./node_modules/core-js/internals/well-known-symbol.js");

var ITERATOR = wellKnownSymbol('iterator');
var TO_STRING_TAG = wellKnownSymbol('toStringTag');
var ArrayValues = ArrayIteratorMethods.values;

for (var COLLECTION_NAME in DOMIterables) {
  var Collection = global[COLLECTION_NAME];
  var CollectionPrototype = Collection && Collection.prototype;

  if (CollectionPrototype) {
    // some Chrome versions have non-configurable methods on DOMTokenList
    if (CollectionPrototype[ITERATOR] !== ArrayValues) try {
      createNonEnumerableProperty(CollectionPrototype, ITERATOR, ArrayValues);
    } catch (error) {
      CollectionPrototype[ITERATOR] = ArrayValues;
    }

    if (!CollectionPrototype[TO_STRING_TAG]) {
      createNonEnumerableProperty(CollectionPrototype, TO_STRING_TAG, COLLECTION_NAME);
    }

    if (DOMIterables[COLLECTION_NAME]) for (var METHOD_NAME in ArrayIteratorMethods) {
      // some Chrome versions have non-configurable methods on DOMTokenList
      if (CollectionPrototype[METHOD_NAME] !== ArrayIteratorMethods[METHOD_NAME]) try {
        createNonEnumerableProperty(CollectionPrototype, METHOD_NAME, ArrayIteratorMethods[METHOD_NAME]);
      } catch (error) {
        CollectionPrototype[METHOD_NAME] = ArrayIteratorMethods[METHOD_NAME];
      }
    }
  }
}

/***/ }),

/***/ "./node_modules/regenerator-runtime/runtime.js":
/*!*****************************************************!*\
  !*** ./node_modules/regenerator-runtime/runtime.js ***!
  \*****************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

/**
 * Copyright (c) 2014-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
var runtime = function (exports) {
  "use strict";

  var Op = Object.prototype;
  var hasOwn = Op.hasOwnProperty;
  var undefined; // More compressible than void 0.

  var $Symbol = typeof Symbol === "function" ? Symbol : {};
  var iteratorSymbol = $Symbol.iterator || "@@iterator";
  var asyncIteratorSymbol = $Symbol.asyncIterator || "@@asyncIterator";
  var toStringTagSymbol = $Symbol.toStringTag || "@@toStringTag";

  function wrap(innerFn, outerFn, self, tryLocsList) {
    // If outerFn provided and outerFn.prototype is a Generator, then outerFn.prototype instanceof Generator.
    var protoGenerator = outerFn && outerFn.prototype instanceof Generator ? outerFn : Generator;
    var generator = Object.create(protoGenerator.prototype);
    var context = new Context(tryLocsList || []); // The ._invoke method unifies the implementations of the .next,
    // .throw, and .return methods.

    generator._invoke = makeInvokeMethod(innerFn, self, context);
    return generator;
  }

  exports.wrap = wrap; // Try/catch helper to minimize deoptimizations. Returns a completion
  // record like context.tryEntries[i].completion. This interface could
  // have been (and was previously) designed to take a closure to be
  // invoked without arguments, but in all the cases we care about we
  // already have an existing method we want to call, so there's no need
  // to create a new function object. We can even get away with assuming
  // the method takes exactly one argument, since that happens to be true
  // in every case, so we don't have to touch the arguments object. The
  // only additional allocation required is the completion record, which
  // has a stable shape and so hopefully should be cheap to allocate.

  function tryCatch(fn, obj, arg) {
    try {
      return {
        type: "normal",
        arg: fn.call(obj, arg)
      };
    } catch (err) {
      return {
        type: "throw",
        arg: err
      };
    }
  }

  var GenStateSuspendedStart = "suspendedStart";
  var GenStateSuspendedYield = "suspendedYield";
  var GenStateExecuting = "executing";
  var GenStateCompleted = "completed"; // Returning this object from the innerFn has the same effect as
  // breaking out of the dispatch switch statement.

  var ContinueSentinel = {}; // Dummy constructor functions that we use as the .constructor and
  // .constructor.prototype properties for functions that return Generator
  // objects. For full spec compliance, you may wish to configure your
  // minifier not to mangle the names of these two functions.

  function Generator() {}

  function GeneratorFunction() {}

  function GeneratorFunctionPrototype() {} // This is a polyfill for %IteratorPrototype% for environments that
  // don't natively support it.


  var IteratorPrototype = {};

  IteratorPrototype[iteratorSymbol] = function () {
    return this;
  };

  var getProto = Object.getPrototypeOf;
  var NativeIteratorPrototype = getProto && getProto(getProto(values([])));

  if (NativeIteratorPrototype && NativeIteratorPrototype !== Op && hasOwn.call(NativeIteratorPrototype, iteratorSymbol)) {
    // This environment has a native %IteratorPrototype%; use it instead
    // of the polyfill.
    IteratorPrototype = NativeIteratorPrototype;
  }

  var Gp = GeneratorFunctionPrototype.prototype = Generator.prototype = Object.create(IteratorPrototype);
  GeneratorFunction.prototype = Gp.constructor = GeneratorFunctionPrototype;
  GeneratorFunctionPrototype.constructor = GeneratorFunction;
  GeneratorFunctionPrototype[toStringTagSymbol] = GeneratorFunction.displayName = "GeneratorFunction"; // Helper for defining the .next, .throw, and .return methods of the
  // Iterator interface in terms of a single ._invoke method.

  function defineIteratorMethods(prototype) {
    ["next", "throw", "return"].forEach(function (method) {
      prototype[method] = function (arg) {
        return this._invoke(method, arg);
      };
    });
  }

  exports.isGeneratorFunction = function (genFun) {
    var ctor = typeof genFun === "function" && genFun.constructor;
    return ctor ? ctor === GeneratorFunction || // For the native GeneratorFunction constructor, the best we can
    // do is to check its .name property.
    (ctor.displayName || ctor.name) === "GeneratorFunction" : false;
  };

  exports.mark = function (genFun) {
    if (Object.setPrototypeOf) {
      Object.setPrototypeOf(genFun, GeneratorFunctionPrototype);
    } else {
      genFun.__proto__ = GeneratorFunctionPrototype;

      if (!(toStringTagSymbol in genFun)) {
        genFun[toStringTagSymbol] = "GeneratorFunction";
      }
    }

    genFun.prototype = Object.create(Gp);
    return genFun;
  }; // Within the body of any async function, `await x` is transformed to
  // `yield regeneratorRuntime.awrap(x)`, so that the runtime can test
  // `hasOwn.call(value, "__await")` to determine if the yielded value is
  // meant to be awaited.


  exports.awrap = function (arg) {
    return {
      __await: arg
    };
  };

  function AsyncIterator(generator) {
    function invoke(method, arg, resolve, reject) {
      var record = tryCatch(generator[method], generator, arg);

      if (record.type === "throw") {
        reject(record.arg);
      } else {
        var result = record.arg;
        var value = result.value;

        if (value && typeof value === "object" && hasOwn.call(value, "__await")) {
          return Promise.resolve(value.__await).then(function (value) {
            invoke("next", value, resolve, reject);
          }, function (err) {
            invoke("throw", err, resolve, reject);
          });
        }

        return Promise.resolve(value).then(function (unwrapped) {
          // When a yielded Promise is resolved, its final value becomes
          // the .value of the Promise<{value,done}> result for the
          // current iteration.
          result.value = unwrapped;
          resolve(result);
        }, function (error) {
          // If a rejected Promise was yielded, throw the rejection back
          // into the async generator function so it can be handled there.
          return invoke("throw", error, resolve, reject);
        });
      }
    }

    var previousPromise;

    function enqueue(method, arg) {
      function callInvokeWithMethodAndArg() {
        return new Promise(function (resolve, reject) {
          invoke(method, arg, resolve, reject);
        });
      }

      return previousPromise = // If enqueue has been called before, then we want to wait until
      // all previous Promises have been resolved before calling invoke,
      // so that results are always delivered in the correct order. If
      // enqueue has not been called before, then it is important to
      // call invoke immediately, without waiting on a callback to fire,
      // so that the async generator function has the opportunity to do
      // any necessary setup in a predictable way. This predictability
      // is why the Promise constructor synchronously invokes its
      // executor callback, and why async functions synchronously
      // execute code before the first await. Since we implement simple
      // async functions in terms of async generators, it is especially
      // important to get this right, even though it requires care.
      previousPromise ? previousPromise.then(callInvokeWithMethodAndArg, // Avoid propagating failures to Promises returned by later
      // invocations of the iterator.
      callInvokeWithMethodAndArg) : callInvokeWithMethodAndArg();
    } // Define the unified helper method that is used to implement .next,
    // .throw, and .return (see defineIteratorMethods).


    this._invoke = enqueue;
  }

  defineIteratorMethods(AsyncIterator.prototype);

  AsyncIterator.prototype[asyncIteratorSymbol] = function () {
    return this;
  };

  exports.AsyncIterator = AsyncIterator; // Note that simple async functions are implemented on top of
  // AsyncIterator objects; they just return a Promise for the value of
  // the final result produced by the iterator.

  exports.async = function (innerFn, outerFn, self, tryLocsList) {
    var iter = new AsyncIterator(wrap(innerFn, outerFn, self, tryLocsList));
    return exports.isGeneratorFunction(outerFn) ? iter // If outerFn is a generator, return the full iterator.
    : iter.next().then(function (result) {
      return result.done ? result.value : iter.next();
    });
  };

  function makeInvokeMethod(innerFn, self, context) {
    var state = GenStateSuspendedStart;
    return function invoke(method, arg) {
      if (state === GenStateExecuting) {
        throw new Error("Generator is already running");
      }

      if (state === GenStateCompleted) {
        if (method === "throw") {
          throw arg;
        } // Be forgiving, per 25.3.3.3.3 of the spec:
        // https://people.mozilla.org/~jorendorff/es6-draft.html#sec-generatorresume


        return doneResult();
      }

      context.method = method;
      context.arg = arg;

      while (true) {
        var delegate = context.delegate;

        if (delegate) {
          var delegateResult = maybeInvokeDelegate(delegate, context);

          if (delegateResult) {
            if (delegateResult === ContinueSentinel) continue;
            return delegateResult;
          }
        }

        if (context.method === "next") {
          // Setting context._sent for legacy support of Babel's
          // function.sent implementation.
          context.sent = context._sent = context.arg;
        } else if (context.method === "throw") {
          if (state === GenStateSuspendedStart) {
            state = GenStateCompleted;
            throw context.arg;
          }

          context.dispatchException(context.arg);
        } else if (context.method === "return") {
          context.abrupt("return", context.arg);
        }

        state = GenStateExecuting;
        var record = tryCatch(innerFn, self, context);

        if (record.type === "normal") {
          // If an exception is thrown from innerFn, we leave state ===
          // GenStateExecuting and loop back for another invocation.
          state = context.done ? GenStateCompleted : GenStateSuspendedYield;

          if (record.arg === ContinueSentinel) {
            continue;
          }

          return {
            value: record.arg,
            done: context.done
          };
        } else if (record.type === "throw") {
          state = GenStateCompleted; // Dispatch the exception by looping back around to the
          // context.dispatchException(context.arg) call above.

          context.method = "throw";
          context.arg = record.arg;
        }
      }
    };
  } // Call delegate.iterator[context.method](context.arg) and handle the
  // result, either by returning a { value, done } result from the
  // delegate iterator, or by modifying context.method and context.arg,
  // setting context.delegate to null, and returning the ContinueSentinel.


  function maybeInvokeDelegate(delegate, context) {
    var method = delegate.iterator[context.method];

    if (method === undefined) {
      // A .throw or .return when the delegate iterator has no .throw
      // method always terminates the yield* loop.
      context.delegate = null;

      if (context.method === "throw") {
        // Note: ["return"] must be used for ES3 parsing compatibility.
        if (delegate.iterator["return"]) {
          // If the delegate iterator has a return method, give it a
          // chance to clean up.
          context.method = "return";
          context.arg = undefined;
          maybeInvokeDelegate(delegate, context);

          if (context.method === "throw") {
            // If maybeInvokeDelegate(context) changed context.method from
            // "return" to "throw", let that override the TypeError below.
            return ContinueSentinel;
          }
        }

        context.method = "throw";
        context.arg = new TypeError("The iterator does not provide a 'throw' method");
      }

      return ContinueSentinel;
    }

    var record = tryCatch(method, delegate.iterator, context.arg);

    if (record.type === "throw") {
      context.method = "throw";
      context.arg = record.arg;
      context.delegate = null;
      return ContinueSentinel;
    }

    var info = record.arg;

    if (!info) {
      context.method = "throw";
      context.arg = new TypeError("iterator result is not an object");
      context.delegate = null;
      return ContinueSentinel;
    }

    if (info.done) {
      // Assign the result of the finished delegate to the temporary
      // variable specified by delegate.resultName (see delegateYield).
      context[delegate.resultName] = info.value; // Resume execution at the desired location (see delegateYield).

      context.next = delegate.nextLoc; // If context.method was "throw" but the delegate handled the
      // exception, let the outer generator proceed normally. If
      // context.method was "next", forget context.arg since it has been
      // "consumed" by the delegate iterator. If context.method was
      // "return", allow the original .return call to continue in the
      // outer generator.

      if (context.method !== "return") {
        context.method = "next";
        context.arg = undefined;
      }
    } else {
      // Re-yield the result returned by the delegate method.
      return info;
    } // The delegate iterator is finished, so forget it and continue with
    // the outer generator.


    context.delegate = null;
    return ContinueSentinel;
  } // Define Generator.prototype.{next,throw,return} in terms of the
  // unified ._invoke helper method.


  defineIteratorMethods(Gp);
  Gp[toStringTagSymbol] = "Generator"; // A Generator should always return itself as the iterator object when the
  // @@iterator function is called on it. Some browsers' implementations of the
  // iterator prototype chain incorrectly implement this, causing the Generator
  // object to not be returned from this call. This ensures that doesn't happen.
  // See https://github.com/facebook/regenerator/issues/274 for more details.

  Gp[iteratorSymbol] = function () {
    return this;
  };

  Gp.toString = function () {
    return "[object Generator]";
  };

  function pushTryEntry(locs) {
    var entry = {
      tryLoc: locs[0]
    };

    if (1 in locs) {
      entry.catchLoc = locs[1];
    }

    if (2 in locs) {
      entry.finallyLoc = locs[2];
      entry.afterLoc = locs[3];
    }

    this.tryEntries.push(entry);
  }

  function resetTryEntry(entry) {
    var record = entry.completion || {};
    record.type = "normal";
    delete record.arg;
    entry.completion = record;
  }

  function Context(tryLocsList) {
    // The root entry object (effectively a try statement without a catch
    // or a finally block) gives us a place to store values thrown from
    // locations where there is no enclosing try statement.
    this.tryEntries = [{
      tryLoc: "root"
    }];
    tryLocsList.forEach(pushTryEntry, this);
    this.reset(true);
  }

  exports.keys = function (object) {
    var keys = [];

    for (var key in object) {
      keys.push(key);
    }

    keys.reverse(); // Rather than returning an object with a next method, we keep
    // things simple and return the next function itself.

    return function next() {
      while (keys.length) {
        var key = keys.pop();

        if (key in object) {
          next.value = key;
          next.done = false;
          return next;
        }
      } // To avoid creating an additional object, we just hang the .value
      // and .done properties off the next function object itself. This
      // also ensures that the minifier will not anonymize the function.


      next.done = true;
      return next;
    };
  };

  function values(iterable) {
    if (iterable) {
      var iteratorMethod = iterable[iteratorSymbol];

      if (iteratorMethod) {
        return iteratorMethod.call(iterable);
      }

      if (typeof iterable.next === "function") {
        return iterable;
      }

      if (!isNaN(iterable.length)) {
        var i = -1,
            next = function next() {
          while (++i < iterable.length) {
            if (hasOwn.call(iterable, i)) {
              next.value = iterable[i];
              next.done = false;
              return next;
            }
          }

          next.value = undefined;
          next.done = true;
          return next;
        };

        return next.next = next;
      }
    } // Return an iterator with no values.


    return {
      next: doneResult
    };
  }

  exports.values = values;

  function doneResult() {
    return {
      value: undefined,
      done: true
    };
  }

  Context.prototype = {
    constructor: Context,
    reset: function reset(skipTempReset) {
      this.prev = 0;
      this.next = 0; // Resetting context._sent for legacy support of Babel's
      // function.sent implementation.

      this.sent = this._sent = undefined;
      this.done = false;
      this.delegate = null;
      this.method = "next";
      this.arg = undefined;
      this.tryEntries.forEach(resetTryEntry);

      if (!skipTempReset) {
        for (var name in this) {
          // Not sure about the optimal order of these conditions:
          if (name.charAt(0) === "t" && hasOwn.call(this, name) && !isNaN(+name.slice(1))) {
            this[name] = undefined;
          }
        }
      }
    },
    stop: function stop() {
      this.done = true;
      var rootEntry = this.tryEntries[0];
      var rootRecord = rootEntry.completion;

      if (rootRecord.type === "throw") {
        throw rootRecord.arg;
      }

      return this.rval;
    },
    dispatchException: function dispatchException(exception) {
      if (this.done) {
        throw exception;
      }

      var context = this;

      function handle(loc, caught) {
        record.type = "throw";
        record.arg = exception;
        context.next = loc;

        if (caught) {
          // If the dispatched exception was caught by a catch block,
          // then let that catch block handle the exception normally.
          context.method = "next";
          context.arg = undefined;
        }

        return !!caught;
      }

      for (var i = this.tryEntries.length - 1; i >= 0; --i) {
        var entry = this.tryEntries[i];
        var record = entry.completion;

        if (entry.tryLoc === "root") {
          // Exception thrown outside of any try block that could handle
          // it, so set the completion value of the entire function to
          // throw the exception.
          return handle("end");
        }

        if (entry.tryLoc <= this.prev) {
          var hasCatch = hasOwn.call(entry, "catchLoc");
          var hasFinally = hasOwn.call(entry, "finallyLoc");

          if (hasCatch && hasFinally) {
            if (this.prev < entry.catchLoc) {
              return handle(entry.catchLoc, true);
            } else if (this.prev < entry.finallyLoc) {
              return handle(entry.finallyLoc);
            }
          } else if (hasCatch) {
            if (this.prev < entry.catchLoc) {
              return handle(entry.catchLoc, true);
            }
          } else if (hasFinally) {
            if (this.prev < entry.finallyLoc) {
              return handle(entry.finallyLoc);
            }
          } else {
            throw new Error("try statement without catch or finally");
          }
        }
      }
    },
    abrupt: function abrupt(type, arg) {
      for (var i = this.tryEntries.length - 1; i >= 0; --i) {
        var entry = this.tryEntries[i];

        if (entry.tryLoc <= this.prev && hasOwn.call(entry, "finallyLoc") && this.prev < entry.finallyLoc) {
          var finallyEntry = entry;
          break;
        }
      }

      if (finallyEntry && (type === "break" || type === "continue") && finallyEntry.tryLoc <= arg && arg <= finallyEntry.finallyLoc) {
        // Ignore the finally entry if control is not jumping to a
        // location outside the try/catch block.
        finallyEntry = null;
      }

      var record = finallyEntry ? finallyEntry.completion : {};
      record.type = type;
      record.arg = arg;

      if (finallyEntry) {
        this.method = "next";
        this.next = finallyEntry.finallyLoc;
        return ContinueSentinel;
      }

      return this.complete(record);
    },
    complete: function complete(record, afterLoc) {
      if (record.type === "throw") {
        throw record.arg;
      }

      if (record.type === "break" || record.type === "continue") {
        this.next = record.arg;
      } else if (record.type === "return") {
        this.rval = this.arg = record.arg;
        this.method = "return";
        this.next = "end";
      } else if (record.type === "normal" && afterLoc) {
        this.next = afterLoc;
      }

      return ContinueSentinel;
    },
    finish: function finish(finallyLoc) {
      for (var i = this.tryEntries.length - 1; i >= 0; --i) {
        var entry = this.tryEntries[i];

        if (entry.finallyLoc === finallyLoc) {
          this.complete(entry.completion, entry.afterLoc);
          resetTryEntry(entry);
          return ContinueSentinel;
        }
      }
    },
    "catch": function _catch(tryLoc) {
      for (var i = this.tryEntries.length - 1; i >= 0; --i) {
        var entry = this.tryEntries[i];

        if (entry.tryLoc === tryLoc) {
          var record = entry.completion;

          if (record.type === "throw") {
            var thrown = record.arg;
            resetTryEntry(entry);
          }

          return thrown;
        }
      } // The context.catch method must only be called with a location
      // argument that corresponds to a known catch block.


      throw new Error("illegal catch attempt");
    },
    delegateYield: function delegateYield(iterable, resultName, nextLoc) {
      this.delegate = {
        iterator: values(iterable),
        resultName: resultName,
        nextLoc: nextLoc
      };

      if (this.method === "next") {
        // Deliberately forget the last sent value so that we don't
        // accidentally pass it on to the delegate.
        this.arg = undefined;
      }

      return ContinueSentinel;
    }
  }; // Regardless of whether this script is executing as a CommonJS module
  // or not, return the runtime object so that we can declare the variable
  // regeneratorRuntime in the outer scope, which allows this module to be
  // injected easily by `bin/regenerator --include-runtime script.js`.

  return exports;
}( // If this script is executing as a CommonJS module, use module.exports
// as the regeneratorRuntime namespace. Otherwise create a new empty
// object. Either way, the resulting object will be used to initialize
// the regeneratorRuntime variable at the top of this file.
 true ? module.exports : undefined);

try {
  regeneratorRuntime = runtime;
} catch (accidentalStrictMode) {
  // This module should not be running in strict mode, so the above
  // assignment should always work unless something is misconfigured. Just
  // in case runtime.js accidentally runs in strict mode, we can escape
  // strict mode using a global Function call. This could conceivably fail
  // if a Content Security Policy forbids using Function, but in that case
  // the proper solution is to fix the accidental strict mode problem. If
  // you've misconfigured your bundler to force strict mode and applied a
  // CSP to forbid Function, and you're not willing to fix either of those
  // problems, please detail your unique predicament in a GitHub issue.
  Function("r", "regeneratorRuntime = r")(runtime);
}

/***/ }),

/***/ "./node_modules/webpack/buildin/global.js":
/*!***********************************!*\
  !*** (webpack)/buildin/global.js ***!
  \***********************************/
/*! no static exports found */
/***/ (function(module, exports) {

var g; // This works in non-strict mode

g = function () {
  return this;
}();

try {
  // This works if eval is allowed (see CSP)
  g = g || new Function("return this")();
} catch (e) {
  // This works if the window reference is available
  if (typeof window === "object") g = window;
} // g can still be undefined, but nothing to do about it...
// We return undefined, instead of nothing here, so it's
// easier to handle this case. if(!global) { ...}


module.exports = g;

/***/ }),

/***/ "./node_modules/whatwg-fetch/fetch.js":
/*!********************************************!*\
  !*** ./node_modules/whatwg-fetch/fetch.js ***!
  \********************************************/
/*! exports provided: Headers, Request, Response, DOMException, fetch */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Headers", function() { return Headers; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Request", function() { return Request; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Response", function() { return Response; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "DOMException", function() { return DOMException; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "fetch", function() { return fetch; });
var support = {
  searchParams: 'URLSearchParams' in self,
  iterable: 'Symbol' in self && 'iterator' in Symbol,
  blob: 'FileReader' in self && 'Blob' in self && function () {
    try {
      new Blob();
      return true;
    } catch (e) {
      return false;
    }
  }(),
  formData: 'FormData' in self,
  arrayBuffer: 'ArrayBuffer' in self
};

function isDataView(obj) {
  return obj && DataView.prototype.isPrototypeOf(obj);
}

if (support.arrayBuffer) {
  var viewClasses = ['[object Int8Array]', '[object Uint8Array]', '[object Uint8ClampedArray]', '[object Int16Array]', '[object Uint16Array]', '[object Int32Array]', '[object Uint32Array]', '[object Float32Array]', '[object Float64Array]'];

  var isArrayBufferView = ArrayBuffer.isView || function (obj) {
    return obj && viewClasses.indexOf(Object.prototype.toString.call(obj)) > -1;
  };
}

function normalizeName(name) {
  if (typeof name !== 'string') {
    name = String(name);
  }

  if (/[^a-z0-9\-#$%&'*+.^_`|~]/i.test(name)) {
    throw new TypeError('Invalid character in header field name');
  }

  return name.toLowerCase();
}

function normalizeValue(value) {
  if (typeof value !== 'string') {
    value = String(value);
  }

  return value;
} // Build a destructive iterator for the value list


function iteratorFor(items) {
  var iterator = {
    next: function next() {
      var value = items.shift();
      return {
        done: value === undefined,
        value: value
      };
    }
  };

  if (support.iterable) {
    iterator[Symbol.iterator] = function () {
      return iterator;
    };
  }

  return iterator;
}

function Headers(headers) {
  this.map = {};

  if (headers instanceof Headers) {
    headers.forEach(function (value, name) {
      this.append(name, value);
    }, this);
  } else if (Array.isArray(headers)) {
    headers.forEach(function (header) {
      this.append(header[0], header[1]);
    }, this);
  } else if (headers) {
    Object.getOwnPropertyNames(headers).forEach(function (name) {
      this.append(name, headers[name]);
    }, this);
  }
}

Headers.prototype.append = function (name, value) {
  name = normalizeName(name);
  value = normalizeValue(value);
  var oldValue = this.map[name];
  this.map[name] = oldValue ? oldValue + ', ' + value : value;
};

Headers.prototype['delete'] = function (name) {
  delete this.map[normalizeName(name)];
};

Headers.prototype.get = function (name) {
  name = normalizeName(name);
  return this.has(name) ? this.map[name] : null;
};

Headers.prototype.has = function (name) {
  return this.map.hasOwnProperty(normalizeName(name));
};

Headers.prototype.set = function (name, value) {
  this.map[normalizeName(name)] = normalizeValue(value);
};

Headers.prototype.forEach = function (callback, thisArg) {
  for (var name in this.map) {
    if (this.map.hasOwnProperty(name)) {
      callback.call(thisArg, this.map[name], name, this);
    }
  }
};

Headers.prototype.keys = function () {
  var items = [];
  this.forEach(function (value, name) {
    items.push(name);
  });
  return iteratorFor(items);
};

Headers.prototype.values = function () {
  var items = [];
  this.forEach(function (value) {
    items.push(value);
  });
  return iteratorFor(items);
};

Headers.prototype.entries = function () {
  var items = [];
  this.forEach(function (value, name) {
    items.push([name, value]);
  });
  return iteratorFor(items);
};

if (support.iterable) {
  Headers.prototype[Symbol.iterator] = Headers.prototype.entries;
}

function consumed(body) {
  if (body.bodyUsed) {
    return Promise.reject(new TypeError('Already read'));
  }

  body.bodyUsed = true;
}

function fileReaderReady(reader) {
  return new Promise(function (resolve, reject) {
    reader.onload = function () {
      resolve(reader.result);
    };

    reader.onerror = function () {
      reject(reader.error);
    };
  });
}

function readBlobAsArrayBuffer(blob) {
  var reader = new FileReader();
  var promise = fileReaderReady(reader);
  reader.readAsArrayBuffer(blob);
  return promise;
}

function readBlobAsText(blob) {
  var reader = new FileReader();
  var promise = fileReaderReady(reader);
  reader.readAsText(blob);
  return promise;
}

function readArrayBufferAsText(buf) {
  var view = new Uint8Array(buf);
  var chars = new Array(view.length);

  for (var i = 0; i < view.length; i++) {
    chars[i] = String.fromCharCode(view[i]);
  }

  return chars.join('');
}

function bufferClone(buf) {
  if (buf.slice) {
    return buf.slice(0);
  } else {
    var view = new Uint8Array(buf.byteLength);
    view.set(new Uint8Array(buf));
    return view.buffer;
  }
}

function Body() {
  this.bodyUsed = false;

  this._initBody = function (body) {
    this._bodyInit = body;

    if (!body) {
      this._bodyText = '';
    } else if (typeof body === 'string') {
      this._bodyText = body;
    } else if (support.blob && Blob.prototype.isPrototypeOf(body)) {
      this._bodyBlob = body;
    } else if (support.formData && FormData.prototype.isPrototypeOf(body)) {
      this._bodyFormData = body;
    } else if (support.searchParams && URLSearchParams.prototype.isPrototypeOf(body)) {
      this._bodyText = body.toString();
    } else if (support.arrayBuffer && support.blob && isDataView(body)) {
      this._bodyArrayBuffer = bufferClone(body.buffer); // IE 10-11 can't handle a DataView body.

      this._bodyInit = new Blob([this._bodyArrayBuffer]);
    } else if (support.arrayBuffer && (ArrayBuffer.prototype.isPrototypeOf(body) || isArrayBufferView(body))) {
      this._bodyArrayBuffer = bufferClone(body);
    } else {
      this._bodyText = body = Object.prototype.toString.call(body);
    }

    if (!this.headers.get('content-type')) {
      if (typeof body === 'string') {
        this.headers.set('content-type', 'text/plain;charset=UTF-8');
      } else if (this._bodyBlob && this._bodyBlob.type) {
        this.headers.set('content-type', this._bodyBlob.type);
      } else if (support.searchParams && URLSearchParams.prototype.isPrototypeOf(body)) {
        this.headers.set('content-type', 'application/x-www-form-urlencoded;charset=UTF-8');
      }
    }
  };

  if (support.blob) {
    this.blob = function () {
      var rejected = consumed(this);

      if (rejected) {
        return rejected;
      }

      if (this._bodyBlob) {
        return Promise.resolve(this._bodyBlob);
      } else if (this._bodyArrayBuffer) {
        return Promise.resolve(new Blob([this._bodyArrayBuffer]));
      } else if (this._bodyFormData) {
        throw new Error('could not read FormData body as blob');
      } else {
        return Promise.resolve(new Blob([this._bodyText]));
      }
    };

    this.arrayBuffer = function () {
      if (this._bodyArrayBuffer) {
        return consumed(this) || Promise.resolve(this._bodyArrayBuffer);
      } else {
        return this.blob().then(readBlobAsArrayBuffer);
      }
    };
  }

  this.text = function () {
    var rejected = consumed(this);

    if (rejected) {
      return rejected;
    }

    if (this._bodyBlob) {
      return readBlobAsText(this._bodyBlob);
    } else if (this._bodyArrayBuffer) {
      return Promise.resolve(readArrayBufferAsText(this._bodyArrayBuffer));
    } else if (this._bodyFormData) {
      throw new Error('could not read FormData body as text');
    } else {
      return Promise.resolve(this._bodyText);
    }
  };

  if (support.formData) {
    this.formData = function () {
      return this.text().then(decode);
    };
  }

  this.json = function () {
    return this.text().then(JSON.parse);
  };

  return this;
} // HTTP methods whose capitalization should be normalized


var methods = ['DELETE', 'GET', 'HEAD', 'OPTIONS', 'POST', 'PUT'];

function normalizeMethod(method) {
  var upcased = method.toUpperCase();
  return methods.indexOf(upcased) > -1 ? upcased : method;
}

function Request(input, options) {
  options = options || {};
  var body = options.body;

  if (input instanceof Request) {
    if (input.bodyUsed) {
      throw new TypeError('Already read');
    }

    this.url = input.url;
    this.credentials = input.credentials;

    if (!options.headers) {
      this.headers = new Headers(input.headers);
    }

    this.method = input.method;
    this.mode = input.mode;
    this.signal = input.signal;

    if (!body && input._bodyInit != null) {
      body = input._bodyInit;
      input.bodyUsed = true;
    }
  } else {
    this.url = String(input);
  }

  this.credentials = options.credentials || this.credentials || 'same-origin';

  if (options.headers || !this.headers) {
    this.headers = new Headers(options.headers);
  }

  this.method = normalizeMethod(options.method || this.method || 'GET');
  this.mode = options.mode || this.mode || null;
  this.signal = options.signal || this.signal;
  this.referrer = null;

  if ((this.method === 'GET' || this.method === 'HEAD') && body) {
    throw new TypeError('Body not allowed for GET or HEAD requests');
  }

  this._initBody(body);
}

Request.prototype.clone = function () {
  return new Request(this, {
    body: this._bodyInit
  });
};

function decode(body) {
  var form = new FormData();
  body.trim().split('&').forEach(function (bytes) {
    if (bytes) {
      var split = bytes.split('=');
      var name = split.shift().replace(/\+/g, ' ');
      var value = split.join('=').replace(/\+/g, ' ');
      form.append(decodeURIComponent(name), decodeURIComponent(value));
    }
  });
  return form;
}

function parseHeaders(rawHeaders) {
  var headers = new Headers(); // Replace instances of \r\n and \n followed by at least one space or horizontal tab with a space
  // https://tools.ietf.org/html/rfc7230#section-3.2

  var preProcessedHeaders = rawHeaders.replace(/\r?\n[\t ]+/g, ' ');
  preProcessedHeaders.split(/\r?\n/).forEach(function (line) {
    var parts = line.split(':');
    var key = parts.shift().trim();

    if (key) {
      var value = parts.join(':').trim();
      headers.append(key, value);
    }
  });
  return headers;
}

Body.call(Request.prototype);
function Response(bodyInit, options) {
  if (!options) {
    options = {};
  }

  this.type = 'default';
  this.status = options.status === undefined ? 200 : options.status;
  this.ok = this.status >= 200 && this.status < 300;
  this.statusText = 'statusText' in options ? options.statusText : 'OK';
  this.headers = new Headers(options.headers);
  this.url = options.url || '';

  this._initBody(bodyInit);
}
Body.call(Response.prototype);

Response.prototype.clone = function () {
  return new Response(this._bodyInit, {
    status: this.status,
    statusText: this.statusText,
    headers: new Headers(this.headers),
    url: this.url
  });
};

Response.error = function () {
  var response = new Response(null, {
    status: 0,
    statusText: ''
  });
  response.type = 'error';
  return response;
};

var redirectStatuses = [301, 302, 303, 307, 308];

Response.redirect = function (url, status) {
  if (redirectStatuses.indexOf(status) === -1) {
    throw new RangeError('Invalid status code');
  }

  return new Response(null, {
    status: status,
    headers: {
      location: url
    }
  });
};

var DOMException = self.DOMException;

try {
  new DOMException();
} catch (err) {
  DOMException = function DOMException(message, name) {
    this.message = message;
    this.name = name;
    var error = Error(message);
    this.stack = error.stack;
  };

  DOMException.prototype = Object.create(Error.prototype);
  DOMException.prototype.constructor = DOMException;
}

function fetch(input, init) {
  return new Promise(function (resolve, reject) {
    var request = new Request(input, init);

    if (request.signal && request.signal.aborted) {
      return reject(new DOMException('Aborted', 'AbortError'));
    }

    var xhr = new XMLHttpRequest();

    function abortXhr() {
      xhr.abort();
    }

    xhr.onload = function () {
      var options = {
        status: xhr.status,
        statusText: xhr.statusText,
        headers: parseHeaders(xhr.getAllResponseHeaders() || '')
      };
      options.url = 'responseURL' in xhr ? xhr.responseURL : options.headers.get('X-Request-URL');
      var body = 'response' in xhr ? xhr.response : xhr.responseText;
      resolve(new Response(body, options));
    };

    xhr.onerror = function () {
      reject(new TypeError('Network request failed'));
    };

    xhr.ontimeout = function () {
      reject(new TypeError('Network request failed'));
    };

    xhr.onabort = function () {
      reject(new DOMException('Aborted', 'AbortError'));
    };

    xhr.open(request.method, request.url, true);

    if (request.credentials === 'include') {
      xhr.withCredentials = true;
    } else if (request.credentials === 'omit') {
      xhr.withCredentials = false;
    }

    if ('responseType' in xhr && support.blob) {
      xhr.responseType = 'blob';
    }

    request.headers.forEach(function (value, name) {
      xhr.setRequestHeader(name, value);
    });

    if (request.signal) {
      request.signal.addEventListener('abort', abortXhr);

      xhr.onreadystatechange = function () {
        // DONE (success or failure)
        if (xhr.readyState === 4) {
          request.signal.removeEventListener('abort', abortXhr);
        }
      };
    }

    xhr.send(typeof request._bodyInit === 'undefined' ? null : request._bodyInit);
  });
}
fetch.polyfill = true;

if (!self.fetch) {
  self.fetch = fetch;
  self.Headers = Headers;
  self.Request = Request;
  self.Response = Response;
}

/***/ })

/******/ });
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vLy4vZnJvbnRlbmQvd2VsY29tZS9hc3NldHMvanMvZ2xvYmFsLmpzIiwid2VicGFjazovLy8uL2Zyb250ZW5kL3dlbGNvbWUvYXNzZXRzL3Njc3MvZ2xvYmFsLnNjc3MiLCJ3ZWJwYWNrOi8vLy4vZnJvbnRlbmQvd2VsY29tZS9pbmRleC5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvQGJhYmVsL3J1bnRpbWUvaGVscGVycy9hc3luY1RvR2VuZXJhdG9yLmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9AYmFiZWwvcnVudGltZS9yZWdlbmVyYXRvci9pbmRleC5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvY29yZS1qcy9lcy9hcnJheS9pbmRleC5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvY29yZS1qcy9lcy9vYmplY3QvdmFsdWVzLmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9jb3JlLWpzL2VzL3Byb21pc2UvaW5kZXguanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL2NvcmUtanMvZmVhdHVyZXMvYXJyYXkvaW5kZXguanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL2NvcmUtanMvZmVhdHVyZXMvb2JqZWN0L3ZhbHVlcy5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvY29yZS1qcy9mZWF0dXJlcy9wcm9taXNlL2luZGV4LmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9jb3JlLWpzL2ludGVybmFscy9hLWZ1bmN0aW9uLmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9jb3JlLWpzL2ludGVybmFscy9hLXBvc3NpYmxlLXByb3RvdHlwZS5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvY29yZS1qcy9pbnRlcm5hbHMvYWRkLXRvLXVuc2NvcGFibGVzLmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9jb3JlLWpzL2ludGVybmFscy9hbi1pbnN0YW5jZS5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvY29yZS1qcy9pbnRlcm5hbHMvYW4tb2JqZWN0LmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9jb3JlLWpzL2ludGVybmFscy9hcnJheS1jb3B5LXdpdGhpbi5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvY29yZS1qcy9pbnRlcm5hbHMvYXJyYXktZmlsbC5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvY29yZS1qcy9pbnRlcm5hbHMvYXJyYXktZm9yLWVhY2guanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL2NvcmUtanMvaW50ZXJuYWxzL2FycmF5LWZyb20uanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL2NvcmUtanMvaW50ZXJuYWxzL2FycmF5LWluY2x1ZGVzLmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9jb3JlLWpzL2ludGVybmFscy9hcnJheS1pdGVyYXRpb24uanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL2NvcmUtanMvaW50ZXJuYWxzL2FycmF5LWxhc3QtaW5kZXgtb2YuanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL2NvcmUtanMvaW50ZXJuYWxzL2FycmF5LW1ldGhvZC1oYXMtc3BlY2llcy1zdXBwb3J0LmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9jb3JlLWpzL2ludGVybmFscy9hcnJheS1yZWR1Y2UuanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL2NvcmUtanMvaW50ZXJuYWxzL2FycmF5LXNwZWNpZXMtY3JlYXRlLmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9jb3JlLWpzL2ludGVybmFscy9iaW5kLWNvbnRleHQuanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL2NvcmUtanMvaW50ZXJuYWxzL2NhbGwtd2l0aC1zYWZlLWl0ZXJhdGlvbi1jbG9zaW5nLmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9jb3JlLWpzL2ludGVybmFscy9jaGVjay1jb3JyZWN0bmVzcy1vZi1pdGVyYXRpb24uanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL2NvcmUtanMvaW50ZXJuYWxzL2NsYXNzb2YtcmF3LmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9jb3JlLWpzL2ludGVybmFscy9jbGFzc29mLmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9jb3JlLWpzL2ludGVybmFscy9jb3B5LWNvbnN0cnVjdG9yLXByb3BlcnRpZXMuanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL2NvcmUtanMvaW50ZXJuYWxzL2NvcnJlY3QtcHJvdG90eXBlLWdldHRlci5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvY29yZS1qcy9pbnRlcm5hbHMvY3JlYXRlLWl0ZXJhdG9yLWNvbnN0cnVjdG9yLmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9jb3JlLWpzL2ludGVybmFscy9jcmVhdGUtbm9uLWVudW1lcmFibGUtcHJvcGVydHkuanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL2NvcmUtanMvaW50ZXJuYWxzL2NyZWF0ZS1wcm9wZXJ0eS1kZXNjcmlwdG9yLmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9jb3JlLWpzL2ludGVybmFscy9jcmVhdGUtcHJvcGVydHkuanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL2NvcmUtanMvaW50ZXJuYWxzL2RlZmluZS1pdGVyYXRvci5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvY29yZS1qcy9pbnRlcm5hbHMvZGVzY3JpcHRvcnMuanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL2NvcmUtanMvaW50ZXJuYWxzL2RvY3VtZW50LWNyZWF0ZS1lbGVtZW50LmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9jb3JlLWpzL2ludGVybmFscy9kb20taXRlcmFibGVzLmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9jb3JlLWpzL2ludGVybmFscy9lbnVtLWJ1Zy1rZXlzLmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9jb3JlLWpzL2ludGVybmFscy9leHBvcnQuanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL2NvcmUtanMvaW50ZXJuYWxzL2ZhaWxzLmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9jb3JlLWpzL2ludGVybmFscy9mbGF0dGVuLWludG8tYXJyYXkuanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL2NvcmUtanMvaW50ZXJuYWxzL2dldC1idWlsdC1pbi5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvY29yZS1qcy9pbnRlcm5hbHMvZ2V0LWl0ZXJhdG9yLW1ldGhvZC5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvY29yZS1qcy9pbnRlcm5hbHMvZ2xvYmFsLmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9jb3JlLWpzL2ludGVybmFscy9oYXMuanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL2NvcmUtanMvaW50ZXJuYWxzL2hpZGRlbi1rZXlzLmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9jb3JlLWpzL2ludGVybmFscy9ob3N0LXJlcG9ydC1lcnJvcnMuanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL2NvcmUtanMvaW50ZXJuYWxzL2h0bWwuanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL2NvcmUtanMvaW50ZXJuYWxzL2llOC1kb20tZGVmaW5lLmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9jb3JlLWpzL2ludGVybmFscy9pbmRleGVkLW9iamVjdC5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvY29yZS1qcy9pbnRlcm5hbHMvaW5zcGVjdC1zb3VyY2UuanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL2NvcmUtanMvaW50ZXJuYWxzL2ludGVybmFsLXN0YXRlLmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9jb3JlLWpzL2ludGVybmFscy9pcy1hcnJheS1pdGVyYXRvci1tZXRob2QuanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL2NvcmUtanMvaW50ZXJuYWxzL2lzLWFycmF5LmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9jb3JlLWpzL2ludGVybmFscy9pcy1mb3JjZWQuanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL2NvcmUtanMvaW50ZXJuYWxzL2lzLWlvcy5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvY29yZS1qcy9pbnRlcm5hbHMvaXMtb2JqZWN0LmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9jb3JlLWpzL2ludGVybmFscy9pcy1wdXJlLmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9jb3JlLWpzL2ludGVybmFscy9pdGVyYXRlLmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9jb3JlLWpzL2ludGVybmFscy9pdGVyYXRvcnMtY29yZS5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvY29yZS1qcy9pbnRlcm5hbHMvaXRlcmF0b3JzLmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9jb3JlLWpzL2ludGVybmFscy9taWNyb3Rhc2suanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL2NvcmUtanMvaW50ZXJuYWxzL25hdGl2ZS1wcm9taXNlLWNvbnN0cnVjdG9yLmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9jb3JlLWpzL2ludGVybmFscy9uYXRpdmUtc3ltYm9sLmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9jb3JlLWpzL2ludGVybmFscy9uYXRpdmUtd2Vhay1tYXAuanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL2NvcmUtanMvaW50ZXJuYWxzL25ldy1wcm9taXNlLWNhcGFiaWxpdHkuanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL2NvcmUtanMvaW50ZXJuYWxzL29iamVjdC1jcmVhdGUuanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL2NvcmUtanMvaW50ZXJuYWxzL29iamVjdC1kZWZpbmUtcHJvcGVydGllcy5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvY29yZS1qcy9pbnRlcm5hbHMvb2JqZWN0LWRlZmluZS1wcm9wZXJ0eS5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvY29yZS1qcy9pbnRlcm5hbHMvb2JqZWN0LWdldC1vd24tcHJvcGVydHktZGVzY3JpcHRvci5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvY29yZS1qcy9pbnRlcm5hbHMvb2JqZWN0LWdldC1vd24tcHJvcGVydHktbmFtZXMuanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL2NvcmUtanMvaW50ZXJuYWxzL29iamVjdC1nZXQtb3duLXByb3BlcnR5LXN5bWJvbHMuanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL2NvcmUtanMvaW50ZXJuYWxzL29iamVjdC1nZXQtcHJvdG90eXBlLW9mLmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9jb3JlLWpzL2ludGVybmFscy9vYmplY3Qta2V5cy1pbnRlcm5hbC5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvY29yZS1qcy9pbnRlcm5hbHMvb2JqZWN0LWtleXMuanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL2NvcmUtanMvaW50ZXJuYWxzL29iamVjdC1wcm9wZXJ0eS1pcy1lbnVtZXJhYmxlLmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9jb3JlLWpzL2ludGVybmFscy9vYmplY3Qtc2V0LXByb3RvdHlwZS1vZi5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvY29yZS1qcy9pbnRlcm5hbHMvb2JqZWN0LXRvLWFycmF5LmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9jb3JlLWpzL2ludGVybmFscy9vYmplY3QtdG8tc3RyaW5nLmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9jb3JlLWpzL2ludGVybmFscy9vd24ta2V5cy5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvY29yZS1qcy9pbnRlcm5hbHMvcGF0aC5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvY29yZS1qcy9pbnRlcm5hbHMvcGVyZm9ybS5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvY29yZS1qcy9pbnRlcm5hbHMvcHJvbWlzZS1yZXNvbHZlLmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9jb3JlLWpzL2ludGVybmFscy9yZWRlZmluZS1hbGwuanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL2NvcmUtanMvaW50ZXJuYWxzL3JlZGVmaW5lLmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9jb3JlLWpzL2ludGVybmFscy9yZXF1aXJlLW9iamVjdC1jb2VyY2libGUuanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL2NvcmUtanMvaW50ZXJuYWxzL3NldC1nbG9iYWwuanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL2NvcmUtanMvaW50ZXJuYWxzL3NldC1zcGVjaWVzLmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9jb3JlLWpzL2ludGVybmFscy9zZXQtdG8tc3RyaW5nLXRhZy5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvY29yZS1qcy9pbnRlcm5hbHMvc2hhcmVkLWtleS5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvY29yZS1qcy9pbnRlcm5hbHMvc2hhcmVkLXN0b3JlLmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9jb3JlLWpzL2ludGVybmFscy9zaGFyZWQuanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL2NvcmUtanMvaW50ZXJuYWxzL3Nsb3BweS1hcnJheS1tZXRob2QuanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL2NvcmUtanMvaW50ZXJuYWxzL3NwZWNpZXMtY29uc3RydWN0b3IuanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL2NvcmUtanMvaW50ZXJuYWxzL3N0cmluZy1tdWx0aWJ5dGUuanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL2NvcmUtanMvaW50ZXJuYWxzL3Rhc2suanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL2NvcmUtanMvaW50ZXJuYWxzL3RvLWFic29sdXRlLWluZGV4LmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9jb3JlLWpzL2ludGVybmFscy90by1pbmRleGVkLW9iamVjdC5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvY29yZS1qcy9pbnRlcm5hbHMvdG8taW50ZWdlci5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvY29yZS1qcy9pbnRlcm5hbHMvdG8tbGVuZ3RoLmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9jb3JlLWpzL2ludGVybmFscy90by1vYmplY3QuanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL2NvcmUtanMvaW50ZXJuYWxzL3RvLXByaW1pdGl2ZS5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvY29yZS1qcy9pbnRlcm5hbHMvdG8tc3RyaW5nLXRhZy1zdXBwb3J0LmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9jb3JlLWpzL2ludGVybmFscy91aWQuanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL2NvcmUtanMvaW50ZXJuYWxzL3VzZS1zeW1ib2wtYXMtdWlkLmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9jb3JlLWpzL2ludGVybmFscy91c2VyLWFnZW50LmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9jb3JlLWpzL2ludGVybmFscy92OC12ZXJzaW9uLmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9jb3JlLWpzL2ludGVybmFscy93ZWxsLWtub3duLXN5bWJvbC5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvY29yZS1qcy9tb2R1bGVzL2VzLmFycmF5LmNvbmNhdC5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvY29yZS1qcy9tb2R1bGVzL2VzLmFycmF5LmNvcHktd2l0aGluLmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9jb3JlLWpzL21vZHVsZXMvZXMuYXJyYXkuZXZlcnkuanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL2NvcmUtanMvbW9kdWxlcy9lcy5hcnJheS5maWxsLmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9jb3JlLWpzL21vZHVsZXMvZXMuYXJyYXkuZmlsdGVyLmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9jb3JlLWpzL21vZHVsZXMvZXMuYXJyYXkuZmluZC1pbmRleC5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvY29yZS1qcy9tb2R1bGVzL2VzLmFycmF5LmZpbmQuanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL2NvcmUtanMvbW9kdWxlcy9lcy5hcnJheS5mbGF0LW1hcC5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvY29yZS1qcy9tb2R1bGVzL2VzLmFycmF5LmZsYXQuanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL2NvcmUtanMvbW9kdWxlcy9lcy5hcnJheS5mb3ItZWFjaC5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvY29yZS1qcy9tb2R1bGVzL2VzLmFycmF5LmZyb20uanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL2NvcmUtanMvbW9kdWxlcy9lcy5hcnJheS5pbmNsdWRlcy5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvY29yZS1qcy9tb2R1bGVzL2VzLmFycmF5LmluZGV4LW9mLmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9jb3JlLWpzL21vZHVsZXMvZXMuYXJyYXkuaXMtYXJyYXkuanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL2NvcmUtanMvbW9kdWxlcy9lcy5hcnJheS5pdGVyYXRvci5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvY29yZS1qcy9tb2R1bGVzL2VzLmFycmF5LmpvaW4uanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL2NvcmUtanMvbW9kdWxlcy9lcy5hcnJheS5sYXN0LWluZGV4LW9mLmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9jb3JlLWpzL21vZHVsZXMvZXMuYXJyYXkubWFwLmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9jb3JlLWpzL21vZHVsZXMvZXMuYXJyYXkub2YuanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL2NvcmUtanMvbW9kdWxlcy9lcy5hcnJheS5yZWR1Y2UtcmlnaHQuanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL2NvcmUtanMvbW9kdWxlcy9lcy5hcnJheS5yZWR1Y2UuanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL2NvcmUtanMvbW9kdWxlcy9lcy5hcnJheS5yZXZlcnNlLmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9jb3JlLWpzL21vZHVsZXMvZXMuYXJyYXkuc2xpY2UuanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL2NvcmUtanMvbW9kdWxlcy9lcy5hcnJheS5zb21lLmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9jb3JlLWpzL21vZHVsZXMvZXMuYXJyYXkuc29ydC5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvY29yZS1qcy9tb2R1bGVzL2VzLmFycmF5LnNwZWNpZXMuanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL2NvcmUtanMvbW9kdWxlcy9lcy5hcnJheS5zcGxpY2UuanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL2NvcmUtanMvbW9kdWxlcy9lcy5hcnJheS51bnNjb3BhYmxlcy5mbGF0LW1hcC5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvY29yZS1qcy9tb2R1bGVzL2VzLmFycmF5LnVuc2NvcGFibGVzLmZsYXQuanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL2NvcmUtanMvbW9kdWxlcy9lcy5vYmplY3QudG8tc3RyaW5nLmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9jb3JlLWpzL21vZHVsZXMvZXMub2JqZWN0LnZhbHVlcy5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvY29yZS1qcy9tb2R1bGVzL2VzLnByb21pc2UuYWxsLXNldHRsZWQuanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL2NvcmUtanMvbW9kdWxlcy9lcy5wcm9taXNlLmZpbmFsbHkuanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL2NvcmUtanMvbW9kdWxlcy9lcy5wcm9taXNlLmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9jb3JlLWpzL21vZHVsZXMvZXMuc3RyaW5nLml0ZXJhdG9yLmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9jb3JlLWpzL21vZHVsZXMvZXNuZXh0LmFnZ3JlZ2F0ZS1lcnJvci5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvY29yZS1qcy9tb2R1bGVzL2VzbmV4dC5hcnJheS5pcy10ZW1wbGF0ZS1vYmplY3QuanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL2NvcmUtanMvbW9kdWxlcy9lc25leHQuYXJyYXkubGFzdC1pbmRleC5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvY29yZS1qcy9tb2R1bGVzL2VzbmV4dC5hcnJheS5sYXN0LWl0ZW0uanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL2NvcmUtanMvbW9kdWxlcy9lc25leHQucHJvbWlzZS5hbGwtc2V0dGxlZC5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvY29yZS1qcy9tb2R1bGVzL2VzbmV4dC5wcm9taXNlLmFueS5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvY29yZS1qcy9tb2R1bGVzL2VzbmV4dC5wcm9taXNlLnRyeS5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvY29yZS1qcy9tb2R1bGVzL3dlYi5kb20tY29sbGVjdGlvbnMuaXRlcmF0b3IuanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL3JlZ2VuZXJhdG9yLXJ1bnRpbWUvcnVudGltZS5qcyIsIndlYnBhY2s6Ly8vKHdlYnBhY2spL2J1aWxkaW4vZ2xvYmFsLmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy93aGF0d2ctZmV0Y2gvZmV0Y2guanMiXSwibmFtZXMiOlsiR2xvYmFsIiwiaW5pdCIsIkpTT05fUEFUSCIsIkpTT05fUEFUSF9TSE9QUyIsImlucHV0IiwiZG9jdW1lbnQiLCJnZXRFbGVtZW50c0J5Q2xhc3NOYW1lIiwiYnV0dG9uIiwiZXJyb3IiLCJzZWxlY3QiLCJnZXRKc29uIiwicmVnaW9ucyIsInNob3BzIiwiY3JlYXRlU2VsZWN0IiwibWFwRXZlbnRzIiwic2VsIiwiZ2V0RWxlbWVudEJ5SWQiLCJPYmplY3QiLCJlbnRyaWVzIiwiZm9yRWFjaCIsImVudHJ5Iiwia2V5IiwidmFsdWUiLCJrZTEiLCJuYW1lIiwiZWwiLCJjcmVhdGVFbGVtZW50IiwidGV4dCIsImFkZCIsImFkZEV2ZW50TGlzdGVuZXIiLCJoaWRlRXJyb3JNZXNzYWdlIiwiZ2V0V2ViQWRkcmVzcyIsInN1YmxpbmsiLCJzdG9yZVVybFBhcnQiLCJocmVmIiwid2luZG93IiwibG9jYXRpb24iLCJkb21haW5OZXciLCJyZXBsYWNlIiwic3VibGlua1BvcyIsImluZGV4T2YiLCJ0ZW1wTGluayIsInN1YnN0ciIsImxlbmd0aCIsInNlbGVjdFZhbHVlIiwic3RvcmUiLCJrZXlzIiwiZmluZCIsImxpbmsiLCJuZXdMaW5rIiwidXJsIiwiZmV0Y2giLCJyZXNwb25zZSIsImpzb24iLCJ2YWxpZGF0ZVZhbHVlIiwidmFsIiwiaXNudW0iLCJ0ZXN0IiwibGltaXQiLCJzdWJzdHJpbmciLCJ2YWxpZGF0ZVppcCIsImlucHV0VmFsdWUiLCJyZWdpb24iLCJzaG93RXJyb3JNZXNzYWdlIiwidmFsdWVzIiwiY2xhc3NMaXN0IiwicmVtb3ZlIiwiYXN5bmNHZW5lcmF0b3JTdGVwIiwiZ2VuIiwicmVzb2x2ZSIsInJlamVjdCIsIl9uZXh0IiwiX3Rocm93IiwiYXJnIiwiaW5mbyIsImRvbmUiLCJQcm9taXNlIiwidGhlbiIsIl9hc3luY1RvR2VuZXJhdG9yIiwiZm4iLCJzZWxmIiwiYXJncyIsImFyZ3VtZW50cyIsImFwcGx5IiwiZXJyIiwidW5kZWZpbmVkIiwibW9kdWxlIiwiZXhwb3J0cyIsInJlcXVpcmUiLCJwYXRoIiwiQXJyYXkiLCJwYXJlbnQiLCJpdCIsIlR5cGVFcnJvciIsIlN0cmluZyIsImlzT2JqZWN0Iiwid2VsbEtub3duU3ltYm9sIiwiY3JlYXRlIiwiY3JlYXRlTm9uRW51bWVyYWJsZVByb3BlcnR5IiwiVU5TQ09QQUJMRVMiLCJBcnJheVByb3RvdHlwZSIsInByb3RvdHlwZSIsIkNvbnN0cnVjdG9yIiwidG9PYmplY3QiLCJ0b0Fic29sdXRlSW5kZXgiLCJ0b0xlbmd0aCIsIm1pbiIsIk1hdGgiLCJjb3B5V2l0aGluIiwidGFyZ2V0Iiwic3RhcnQiLCJPIiwibGVuIiwidG8iLCJmcm9tIiwiZW5kIiwiY291bnQiLCJpbmMiLCJmaWxsIiwiYXJndW1lbnRzTGVuZ3RoIiwiaW5kZXgiLCJlbmRQb3MiLCIkZm9yRWFjaCIsInNsb3BweUFycmF5TWV0aG9kIiwiY2FsbGJhY2tmbiIsImJpbmQiLCJjYWxsV2l0aFNhZmVJdGVyYXRpb25DbG9zaW5nIiwiaXNBcnJheUl0ZXJhdG9yTWV0aG9kIiwiY3JlYXRlUHJvcGVydHkiLCJnZXRJdGVyYXRvck1ldGhvZCIsImFycmF5TGlrZSIsIkMiLCJtYXBmbiIsIm1hcHBpbmciLCJpdGVyYXRvck1ldGhvZCIsInJlc3VsdCIsInN0ZXAiLCJpdGVyYXRvciIsIm5leHQiLCJjYWxsIiwidG9JbmRleGVkT2JqZWN0IiwiY3JlYXRlTWV0aG9kIiwiSVNfSU5DTFVERVMiLCIkdGhpcyIsImZyb21JbmRleCIsImluY2x1ZGVzIiwiSW5kZXhlZE9iamVjdCIsImFycmF5U3BlY2llc0NyZWF0ZSIsInB1c2giLCJUWVBFIiwiSVNfTUFQIiwiSVNfRklMVEVSIiwiSVNfU09NRSIsIklTX0VWRVJZIiwiSVNfRklORF9JTkRFWCIsIk5PX0hPTEVTIiwidGhhdCIsInNwZWNpZmljQ3JlYXRlIiwiYm91bmRGdW5jdGlvbiIsIm1hcCIsImZpbHRlciIsInNvbWUiLCJldmVyeSIsImZpbmRJbmRleCIsInRvSW50ZWdlciIsIm5hdGl2ZUxhc3RJbmRleE9mIiwibGFzdEluZGV4T2YiLCJORUdBVElWRV9aRVJPIiwiU0xPUFBZX01FVEhPRCIsInNlYXJjaEVsZW1lbnQiLCJmYWlscyIsIlY4X1ZFUlNJT04iLCJTUEVDSUVTIiwiTUVUSE9EX05BTUUiLCJhcnJheSIsImNvbnN0cnVjdG9yIiwiZm9vIiwiQm9vbGVhbiIsImFGdW5jdGlvbiIsIklTX1JJR0hUIiwibWVtbyIsImkiLCJsZWZ0IiwicmlnaHQiLCJpc0FycmF5Iiwib3JpZ2luYWxBcnJheSIsImEiLCJiIiwiYyIsImFuT2JqZWN0IiwiRU5UUklFUyIsInJldHVybk1ldGhvZCIsIklURVJBVE9SIiwiU0FGRV9DTE9TSU5HIiwiY2FsbGVkIiwiaXRlcmF0b3JXaXRoUmV0dXJuIiwiZXhlYyIsIlNLSVBfQ0xPU0lORyIsIklURVJBVElPTl9TVVBQT1JUIiwib2JqZWN0IiwidG9TdHJpbmciLCJzbGljZSIsIlRPX1NUUklOR19UQUdfU1VQUE9SVCIsImNsYXNzb2ZSYXciLCJUT19TVFJJTkdfVEFHIiwiQ09SUkVDVF9BUkdVTUVOVFMiLCJ0cnlHZXQiLCJ0YWciLCJjYWxsZWUiLCJoYXMiLCJvd25LZXlzIiwiZ2V0T3duUHJvcGVydHlEZXNjcmlwdG9yTW9kdWxlIiwiZGVmaW5lUHJvcGVydHlNb2R1bGUiLCJzb3VyY2UiLCJkZWZpbmVQcm9wZXJ0eSIsImYiLCJnZXRPd25Qcm9wZXJ0eURlc2NyaXB0b3IiLCJGIiwiZ2V0UHJvdG90eXBlT2YiLCJJdGVyYXRvclByb3RvdHlwZSIsImNyZWF0ZVByb3BlcnR5RGVzY3JpcHRvciIsInNldFRvU3RyaW5nVGFnIiwiSXRlcmF0b3JzIiwicmV0dXJuVGhpcyIsIkl0ZXJhdG9yQ29uc3RydWN0b3IiLCJOQU1FIiwiREVTQ1JJUFRPUlMiLCJiaXRtYXAiLCJlbnVtZXJhYmxlIiwiY29uZmlndXJhYmxlIiwid3JpdGFibGUiLCJ0b1ByaW1pdGl2ZSIsInByb3BlcnR5S2V5IiwiJCIsImNyZWF0ZUl0ZXJhdG9yQ29uc3RydWN0b3IiLCJzZXRQcm90b3R5cGVPZiIsInJlZGVmaW5lIiwiSVNfUFVSRSIsIkl0ZXJhdG9yc0NvcmUiLCJCVUdHWV9TQUZBUklfSVRFUkFUT1JTIiwiS0VZUyIsIlZBTFVFUyIsIkl0ZXJhYmxlIiwiREVGQVVMVCIsIklTX1NFVCIsIkZPUkNFRCIsImdldEl0ZXJhdGlvbk1ldGhvZCIsIktJTkQiLCJkZWZhdWx0SXRlcmF0b3IiLCJJdGVyYWJsZVByb3RvdHlwZSIsIklOQ09SUkVDVF9WQUxVRVNfTkFNRSIsIm5hdGl2ZUl0ZXJhdG9yIiwiYW55TmF0aXZlSXRlcmF0b3IiLCJDdXJyZW50SXRlcmF0b3JQcm90b3R5cGUiLCJtZXRob2RzIiwiS0VZIiwicHJvdG8iLCJmb3JjZWQiLCJnZXQiLCJnbG9iYWwiLCJFWElTVFMiLCJDU1NSdWxlTGlzdCIsIkNTU1N0eWxlRGVjbGFyYXRpb24iLCJDU1NWYWx1ZUxpc3QiLCJDbGllbnRSZWN0TGlzdCIsIkRPTVJlY3RMaXN0IiwiRE9NU3RyaW5nTGlzdCIsIkRPTVRva2VuTGlzdCIsIkRhdGFUcmFuc2Zlckl0ZW1MaXN0IiwiRmlsZUxpc3QiLCJIVE1MQWxsQ29sbGVjdGlvbiIsIkhUTUxDb2xsZWN0aW9uIiwiSFRNTEZvcm1FbGVtZW50IiwiSFRNTFNlbGVjdEVsZW1lbnQiLCJNZWRpYUxpc3QiLCJNaW1lVHlwZUFycmF5IiwiTmFtZWROb2RlTWFwIiwiTm9kZUxpc3QiLCJQYWludFJlcXVlc3RMaXN0IiwiUGx1Z2luIiwiUGx1Z2luQXJyYXkiLCJTVkdMZW5ndGhMaXN0IiwiU1ZHTnVtYmVyTGlzdCIsIlNWR1BhdGhTZWdMaXN0IiwiU1ZHUG9pbnRMaXN0IiwiU1ZHU3RyaW5nTGlzdCIsIlNWR1RyYW5zZm9ybUxpc3QiLCJTb3VyY2VCdWZmZXJMaXN0IiwiU3R5bGVTaGVldExpc3QiLCJUZXh0VHJhY2tDdWVMaXN0IiwiVGV4dFRyYWNrTGlzdCIsIlRvdWNoTGlzdCIsInNldEdsb2JhbCIsImNvcHlDb25zdHJ1Y3RvclByb3BlcnRpZXMiLCJpc0ZvcmNlZCIsIm9wdGlvbnMiLCJUQVJHRVQiLCJHTE9CQUwiLCJTVEFUSUMiLCJzdGF0IiwidGFyZ2V0UHJvcGVydHkiLCJzb3VyY2VQcm9wZXJ0eSIsImRlc2NyaXB0b3IiLCJub1RhcmdldEdldCIsInNoYW0iLCJmbGF0dGVuSW50b0FycmF5Iiwib3JpZ2luYWwiLCJzb3VyY2VMZW4iLCJkZXB0aCIsIm1hcHBlciIsInRoaXNBcmciLCJ0YXJnZXRJbmRleCIsInNvdXJjZUluZGV4IiwibWFwRm4iLCJlbGVtZW50IiwidmFyaWFibGUiLCJuYW1lc3BhY2UiLCJtZXRob2QiLCJjbGFzc29mIiwiY2hlY2siLCJnbG9iYWxUaGlzIiwiRnVuY3Rpb24iLCJoYXNPd25Qcm9wZXJ0eSIsImNvbnNvbGUiLCJnZXRCdWlsdEluIiwic3BsaXQiLCJwcm9wZXJ0eUlzRW51bWVyYWJsZSIsImZ1bmN0aW9uVG9TdHJpbmciLCJpbnNwZWN0U291cmNlIiwiTkFUSVZFX1dFQUtfTUFQIiwib2JqZWN0SGFzIiwic2hhcmVkS2V5IiwiaGlkZGVuS2V5cyIsIldlYWtNYXAiLCJzZXQiLCJlbmZvcmNlIiwiZ2V0dGVyRm9yIiwic3RhdGUiLCJ0eXBlIiwid21nZXQiLCJ3bWhhcyIsIndtc2V0IiwibWV0YWRhdGEiLCJTVEFURSIsInJlcGxhY2VtZW50IiwiZmVhdHVyZSIsImRldGVjdGlvbiIsImRhdGEiLCJub3JtYWxpemUiLCJQT0xZRklMTCIsIk5BVElWRSIsInN0cmluZyIsInRvTG93ZXJDYXNlIiwidXNlckFnZW50IiwiUmVzdWx0Iiwic3RvcHBlZCIsIml0ZXJhdGUiLCJpdGVyYWJsZSIsIkFTX0VOVFJJRVMiLCJJU19JVEVSQVRPUiIsIml0ZXJGbiIsInN0b3AiLCJQcm90b3R5cGVPZkFycmF5SXRlcmF0b3JQcm90b3R5cGUiLCJhcnJheUl0ZXJhdG9yIiwibWFjcm90YXNrIiwiSVNfSU9TIiwiTXV0YXRpb25PYnNlcnZlciIsIldlYktpdE11dGF0aW9uT2JzZXJ2ZXIiLCJwcm9jZXNzIiwiSVNfTk9ERSIsInF1ZXVlTWljcm90YXNrRGVzY3JpcHRvciIsInF1ZXVlTWljcm90YXNrIiwiZmx1c2giLCJoZWFkIiwibGFzdCIsIm5vdGlmeSIsInRvZ2dsZSIsIm5vZGUiLCJwcm9taXNlIiwiZG9tYWluIiwiZXhpdCIsImVudGVyIiwibmV4dFRpY2siLCJjcmVhdGVUZXh0Tm9kZSIsIm9ic2VydmUiLCJjaGFyYWN0ZXJEYXRhIiwidGFzayIsImdldE93blByb3BlcnR5U3ltYm9scyIsIlN5bWJvbCIsIlByb21pc2VDYXBhYmlsaXR5IiwiJCRyZXNvbHZlIiwiJCRyZWplY3QiLCJkZWZpbmVQcm9wZXJ0aWVzIiwiZW51bUJ1Z0tleXMiLCJodG1sIiwiZG9jdW1lbnRDcmVhdGVFbGVtZW50IiwiSUVfUFJPVE8iLCJQUk9UT1RZUEUiLCJFbXB0eSIsImNyZWF0ZURpY3QiLCJpZnJhbWUiLCJsdCIsInNjcmlwdCIsImd0IiwianMiLCJpZnJhbWVEb2N1bWVudCIsInN0eWxlIiwiZGlzcGxheSIsImFwcGVuZENoaWxkIiwic3JjIiwiY29udGVudFdpbmRvdyIsIm9wZW4iLCJ3cml0ZSIsImNsb3NlIiwiUHJvcGVydGllcyIsIm9iamVjdEtleXMiLCJJRThfRE9NX0RFRklORSIsIm5hdGl2ZURlZmluZVByb3BlcnR5IiwiUCIsIkF0dHJpYnV0ZXMiLCJwcm9wZXJ0eUlzRW51bWVyYWJsZU1vZHVsZSIsIm5hdGl2ZUdldE93blByb3BlcnR5RGVzY3JpcHRvciIsImludGVybmFsT2JqZWN0S2V5cyIsImNvbmNhdCIsImdldE93blByb3BlcnR5TmFtZXMiLCJDT1JSRUNUX1BST1RPVFlQRV9HRVRURVIiLCJPYmplY3RQcm90b3R5cGUiLCJuYW1lcyIsIm5hdGl2ZVByb3BlcnR5SXNFbnVtZXJhYmxlIiwiTkFTSE9STl9CVUciLCJWIiwiYVBvc3NpYmxlUHJvdG90eXBlIiwiQ09SUkVDVF9TRVRURVIiLCJzZXR0ZXIiLCJfX3Byb3RvX18iLCJUT19FTlRSSUVTIiwiZ2V0T3duUHJvcGVydHlOYW1lc01vZHVsZSIsImdldE93blByb3BlcnR5U3ltYm9sc01vZHVsZSIsIm5ld1Byb21pc2VDYXBhYmlsaXR5IiwieCIsInByb21pc2VDYXBhYmlsaXR5IiwiSW50ZXJuYWxTdGF0ZU1vZHVsZSIsImdldEludGVybmFsU3RhdGUiLCJlbmZvcmNlSW50ZXJuYWxTdGF0ZSIsIlRFTVBMQVRFIiwidW5zYWZlIiwic2ltcGxlIiwiam9pbiIsIkNPTlNUUlVDVE9SX05BTUUiLCJUQUciLCJzaGFyZWQiLCJ1aWQiLCJTSEFSRUQiLCJ2ZXJzaW9uIiwibW9kZSIsImNvcHlyaWdodCIsImFyZ3VtZW50IiwiZGVmYXVsdENvbnN0cnVjdG9yIiwiUyIsInJlcXVpcmVPYmplY3RDb2VyY2libGUiLCJDT05WRVJUX1RPX1NUUklORyIsInBvcyIsInBvc2l0aW9uIiwic2l6ZSIsImZpcnN0Iiwic2Vjb25kIiwiY2hhckNvZGVBdCIsImNoYXJBdCIsImNvZGVBdCIsInNldEltbWVkaWF0ZSIsImNsZWFyIiwiY2xlYXJJbW1lZGlhdGUiLCJNZXNzYWdlQ2hhbm5lbCIsIkRpc3BhdGNoIiwiY291bnRlciIsInF1ZXVlIiwiT05SRUFEWVNUQVRFQ0hBTkdFIiwiZGVmZXIiLCJjaGFubmVsIiwicG9ydCIsInJ1biIsImlkIiwicnVubmVyIiwibGlzdGVuZXIiLCJldmVudCIsInBvc3QiLCJwb3N0TWVzc2FnZSIsInByb3RvY29sIiwiaG9zdCIsIm5vdyIsInBvcnQyIiwicG9ydDEiLCJvbm1lc3NhZ2UiLCJpbXBvcnRTY3JpcHRzIiwicmVtb3ZlQ2hpbGQiLCJzZXRUaW1lb3V0IiwibWF4IiwiaW50ZWdlciIsImNlaWwiLCJmbG9vciIsImlzTmFOIiwiUFJFRkVSUkVEX1NUUklORyIsInZhbHVlT2YiLCJwb3N0Zml4IiwicmFuZG9tIiwiTkFUSVZFX1NZTUJPTCIsInZlcnNpb25zIiwidjgiLCJtYXRjaCIsIlVTRV9TWU1CT0xfQVNfVUlEIiwiV2VsbEtub3duU3ltYm9sc1N0b3JlIiwiY3JlYXRlV2VsbEtub3duU3ltYm9sIiwiYXJyYXlNZXRob2RIYXNTcGVjaWVzU3VwcG9ydCIsIklTX0NPTkNBVF9TUFJFQURBQkxFIiwiTUFYX1NBRkVfSU5URUdFUiIsIk1BWElNVU1fQUxMT1dFRF9JTkRFWF9FWENFRURFRCIsIklTX0NPTkNBVF9TUFJFQURBQkxFX1NVUFBPUlQiLCJTUEVDSUVTX1NVUFBPUlQiLCJpc0NvbmNhdFNwcmVhZGFibGUiLCJzcHJlYWRhYmxlIiwiQSIsIm4iLCJrIiwiRSIsImFkZFRvVW5zY29wYWJsZXMiLCIkZXZlcnkiLCIkZmlsdGVyIiwiSEFTX1NQRUNJRVNfU1VQUE9SVCIsIlVTRVNfVE9fTEVOR1RIIiwiJGZpbmRJbmRleCIsIkZJTkRfSU5ERVgiLCJTS0lQU19IT0xFUyIsIiRmaW5kIiwiRklORCIsImZsYXRNYXAiLCJmbGF0IiwiZGVwdGhBcmciLCJjaGVja0NvcnJlY3RuZXNzT2ZJdGVyYXRpb24iLCJJTkNPUlJFQ1RfSVRFUkFUSU9OIiwiJGluY2x1ZGVzIiwiJGluZGV4T2YiLCJuYXRpdmVJbmRleE9mIiwiZGVmaW5lSXRlcmF0b3IiLCJBUlJBWV9JVEVSQVRPUiIsInNldEludGVybmFsU3RhdGUiLCJpdGVyYXRlZCIsImtpbmQiLCJBcmd1bWVudHMiLCJuYXRpdmVKb2luIiwiRVMzX1NUUklOR1MiLCJzZXBhcmF0b3IiLCIkbWFwIiwiSVNOVF9HRU5FUklDIiwib2YiLCIkcmVkdWNlUmlnaHQiLCJyZWR1Y2VSaWdodCIsIiRyZWR1Y2UiLCJyZWR1Y2UiLCJuYXRpdmVSZXZlcnNlIiwicmV2ZXJzZSIsIm5hdGl2ZVNsaWNlIiwiZmluIiwiJHNvbWUiLCJuYXRpdmVTb3J0Iiwic29ydCIsIkZBSUxTX09OX1VOREVGSU5FRCIsIkZBSUxTX09OX05VTEwiLCJjb21wYXJlZm4iLCJzZXRTcGVjaWVzIiwiTUFYSU1VTV9BTExPV0VEX0xFTkdUSF9FWENFRURFRCIsInNwbGljZSIsImRlbGV0ZUNvdW50IiwiYWN0dWFsU3RhcnQiLCJpbnNlcnRDb3VudCIsImFjdHVhbERlbGV0ZUNvdW50IiwiJHZhbHVlcyIsIm5ld1Byb21pc2VDYXBhYmlsaXR5TW9kdWxlIiwicGVyZm9ybSIsImFsbFNldHRsZWQiLCJjYXBhYmlsaXR5IiwicHJvbWlzZVJlc29sdmUiLCJyZW1haW5pbmciLCJhbHJlYWR5Q2FsbGVkIiwic3RhdHVzIiwiZSIsInJlYXNvbiIsIk5hdGl2ZVByb21pc2UiLCJzcGVjaWVzQ29uc3RydWN0b3IiLCJOT05fR0VORVJJQyIsInJlYWwiLCJvbkZpbmFsbHkiLCJpc0Z1bmN0aW9uIiwicmVkZWZpbmVBbGwiLCJhbkluc3RhbmNlIiwibWljcm90YXNrIiwiaG9zdFJlcG9ydEVycm9ycyIsIlBST01JU0UiLCJnZXRJbnRlcm5hbFByb21pc2VTdGF0ZSIsIlByb21pc2VDb25zdHJ1Y3RvciIsIiRmZXRjaCIsIm5ld0dlbmVyaWNQcm9taXNlQ2FwYWJpbGl0eSIsIkRJU1BBVENIX0VWRU5UIiwiY3JlYXRlRXZlbnQiLCJkaXNwYXRjaEV2ZW50IiwiVU5IQU5ETEVEX1JFSkVDVElPTiIsIlJFSkVDVElPTl9IQU5ETEVEIiwiUEVORElORyIsIkZVTEZJTExFRCIsIlJFSkVDVEVEIiwiSEFORExFRCIsIlVOSEFORExFRCIsIkludGVybmFsIiwiT3duUHJvbWlzZUNhcGFiaWxpdHkiLCJQcm9taXNlV3JhcHBlciIsIm5hdGl2ZVRoZW4iLCJHTE9CQUxfQ09SRV9KU19QUk9NSVNFIiwiUHJvbWlzZVJlamVjdGlvbkV2ZW50IiwiRmFrZVByb21pc2UiLCJhbGwiLCJpc1RoZW5hYmxlIiwiaXNSZWplY3QiLCJub3RpZmllZCIsImNoYWluIiwicmVhY3Rpb25zIiwib2siLCJyZWFjdGlvbiIsImhhbmRsZXIiLCJmYWlsIiwiZXhpdGVkIiwicmVqZWN0aW9uIiwib25IYW5kbGVVbmhhbmRsZWQiLCJvblVuaGFuZGxlZCIsImluaXRFdmVudCIsIklTX1VOSEFORExFRCIsImlzVW5oYW5kbGVkIiwiZW1pdCIsInVud3JhcCIsImludGVybmFsUmVqZWN0IiwiaW50ZXJuYWxSZXNvbHZlIiwid3JhcHBlciIsImV4ZWN1dG9yIiwib25GdWxmaWxsZWQiLCJvblJlamVjdGVkIiwid3JhcCIsInIiLCIkcHJvbWlzZVJlc29sdmUiLCJyYWNlIiwiU1RSSU5HX0lURVJBVE9SIiwicG9pbnQiLCJnZXRJbnRlcm5hbEFnZ3JlZ2F0ZUVycm9yU3RhdGUiLCIkQWdncmVnYXRlRXJyb3IiLCJBZ2dyZWdhdGVFcnJvciIsImVycm9ycyIsIm1lc3NhZ2UiLCJFcnJvciIsImVycm9yc0FycmF5IiwiaXNGcm96ZW4iLCJpc0Zyb3plblN0cmluZ0FycmF5IiwiYWxsb3dVbmRlZmluZWQiLCJpc1RlbXBsYXRlT2JqZWN0IiwicmF3IiwibGFzdEluZGV4IiwibGFzdEl0ZW0iLCJQUk9NSVNFX0FOWV9FUlJPUiIsImFueSIsImFscmVhZHlSZXNvbHZlZCIsImFscmVhZHlSZWplY3RlZCIsIkRPTUl0ZXJhYmxlcyIsIkFycmF5SXRlcmF0b3JNZXRob2RzIiwiQXJyYXlWYWx1ZXMiLCJDT0xMRUNUSU9OX05BTUUiLCJDb2xsZWN0aW9uIiwiQ29sbGVjdGlvblByb3RvdHlwZSIsInJ1bnRpbWUiLCJPcCIsImhhc093biIsIiRTeW1ib2wiLCJpdGVyYXRvclN5bWJvbCIsImFzeW5jSXRlcmF0b3JTeW1ib2wiLCJhc3luY0l0ZXJhdG9yIiwidG9TdHJpbmdUYWdTeW1ib2wiLCJ0b1N0cmluZ1RhZyIsImlubmVyRm4iLCJvdXRlckZuIiwidHJ5TG9jc0xpc3QiLCJwcm90b0dlbmVyYXRvciIsIkdlbmVyYXRvciIsImdlbmVyYXRvciIsImNvbnRleHQiLCJDb250ZXh0IiwiX2ludm9rZSIsIm1ha2VJbnZva2VNZXRob2QiLCJ0cnlDYXRjaCIsIm9iaiIsIkdlblN0YXRlU3VzcGVuZGVkU3RhcnQiLCJHZW5TdGF0ZVN1c3BlbmRlZFlpZWxkIiwiR2VuU3RhdGVFeGVjdXRpbmciLCJHZW5TdGF0ZUNvbXBsZXRlZCIsIkNvbnRpbnVlU2VudGluZWwiLCJHZW5lcmF0b3JGdW5jdGlvbiIsIkdlbmVyYXRvckZ1bmN0aW9uUHJvdG90eXBlIiwiZ2V0UHJvdG8iLCJOYXRpdmVJdGVyYXRvclByb3RvdHlwZSIsIkdwIiwiZGlzcGxheU5hbWUiLCJkZWZpbmVJdGVyYXRvck1ldGhvZHMiLCJpc0dlbmVyYXRvckZ1bmN0aW9uIiwiZ2VuRnVuIiwiY3RvciIsIm1hcmsiLCJhd3JhcCIsIl9fYXdhaXQiLCJBc3luY0l0ZXJhdG9yIiwiaW52b2tlIiwicmVjb3JkIiwidW53cmFwcGVkIiwicHJldmlvdXNQcm9taXNlIiwiZW5xdWV1ZSIsImNhbGxJbnZva2VXaXRoTWV0aG9kQW5kQXJnIiwiYXN5bmMiLCJpdGVyIiwiZG9uZVJlc3VsdCIsImRlbGVnYXRlIiwiZGVsZWdhdGVSZXN1bHQiLCJtYXliZUludm9rZURlbGVnYXRlIiwic2VudCIsIl9zZW50IiwiZGlzcGF0Y2hFeGNlcHRpb24iLCJhYnJ1cHQiLCJyZXN1bHROYW1lIiwibmV4dExvYyIsInB1c2hUcnlFbnRyeSIsImxvY3MiLCJ0cnlMb2MiLCJjYXRjaExvYyIsImZpbmFsbHlMb2MiLCJhZnRlckxvYyIsInRyeUVudHJpZXMiLCJyZXNldFRyeUVudHJ5IiwiY29tcGxldGlvbiIsInJlc2V0IiwicG9wIiwic2tpcFRlbXBSZXNldCIsInByZXYiLCJyb290RW50cnkiLCJyb290UmVjb3JkIiwicnZhbCIsImV4Y2VwdGlvbiIsImhhbmRsZSIsImxvYyIsImNhdWdodCIsImhhc0NhdGNoIiwiaGFzRmluYWxseSIsImZpbmFsbHlFbnRyeSIsImNvbXBsZXRlIiwiZmluaXNoIiwidGhyb3duIiwiZGVsZWdhdGVZaWVsZCIsInJlZ2VuZXJhdG9yUnVudGltZSIsImFjY2lkZW50YWxTdHJpY3RNb2RlIiwiZyIsInN1cHBvcnQiLCJzZWFyY2hQYXJhbXMiLCJibG9iIiwiQmxvYiIsImZvcm1EYXRhIiwiYXJyYXlCdWZmZXIiLCJpc0RhdGFWaWV3IiwiRGF0YVZpZXciLCJpc1Byb3RvdHlwZU9mIiwidmlld0NsYXNzZXMiLCJpc0FycmF5QnVmZmVyVmlldyIsIkFycmF5QnVmZmVyIiwiaXNWaWV3Iiwibm9ybWFsaXplTmFtZSIsIm5vcm1hbGl6ZVZhbHVlIiwiaXRlcmF0b3JGb3IiLCJpdGVtcyIsInNoaWZ0IiwiSGVhZGVycyIsImhlYWRlcnMiLCJhcHBlbmQiLCJoZWFkZXIiLCJvbGRWYWx1ZSIsImNhbGxiYWNrIiwiY29uc3VtZWQiLCJib2R5IiwiYm9keVVzZWQiLCJmaWxlUmVhZGVyUmVhZHkiLCJyZWFkZXIiLCJvbmxvYWQiLCJvbmVycm9yIiwicmVhZEJsb2JBc0FycmF5QnVmZmVyIiwiRmlsZVJlYWRlciIsInJlYWRBc0FycmF5QnVmZmVyIiwicmVhZEJsb2JBc1RleHQiLCJyZWFkQXNUZXh0IiwicmVhZEFycmF5QnVmZmVyQXNUZXh0IiwiYnVmIiwidmlldyIsIlVpbnQ4QXJyYXkiLCJjaGFycyIsImZyb21DaGFyQ29kZSIsImJ1ZmZlckNsb25lIiwiYnl0ZUxlbmd0aCIsImJ1ZmZlciIsIkJvZHkiLCJfaW5pdEJvZHkiLCJfYm9keUluaXQiLCJfYm9keVRleHQiLCJfYm9keUJsb2IiLCJGb3JtRGF0YSIsIl9ib2R5Rm9ybURhdGEiLCJVUkxTZWFyY2hQYXJhbXMiLCJfYm9keUFycmF5QnVmZmVyIiwicmVqZWN0ZWQiLCJkZWNvZGUiLCJKU09OIiwicGFyc2UiLCJub3JtYWxpemVNZXRob2QiLCJ1cGNhc2VkIiwidG9VcHBlckNhc2UiLCJSZXF1ZXN0IiwiY3JlZGVudGlhbHMiLCJzaWduYWwiLCJyZWZlcnJlciIsImNsb25lIiwiZm9ybSIsInRyaW0iLCJieXRlcyIsImRlY29kZVVSSUNvbXBvbmVudCIsInBhcnNlSGVhZGVycyIsInJhd0hlYWRlcnMiLCJwcmVQcm9jZXNzZWRIZWFkZXJzIiwibGluZSIsInBhcnRzIiwiUmVzcG9uc2UiLCJib2R5SW5pdCIsInN0YXR1c1RleHQiLCJyZWRpcmVjdFN0YXR1c2VzIiwicmVkaXJlY3QiLCJSYW5nZUVycm9yIiwiRE9NRXhjZXB0aW9uIiwic3RhY2siLCJyZXF1ZXN0IiwiYWJvcnRlZCIsInhociIsIlhNTEh0dHBSZXF1ZXN0IiwiYWJvcnRYaHIiLCJhYm9ydCIsImdldEFsbFJlc3BvbnNlSGVhZGVycyIsInJlc3BvbnNlVVJMIiwicmVzcG9uc2VUZXh0Iiwib250aW1lb3V0Iiwib25hYm9ydCIsIndpdGhDcmVkZW50aWFscyIsInJlc3BvbnNlVHlwZSIsInNldFJlcXVlc3RIZWFkZXIiLCJvbnJlYWR5c3RhdGVjaGFuZ2UiLCJyZWFkeVN0YXRlIiwicmVtb3ZlRXZlbnRMaXN0ZW5lciIsInNlbmQiLCJwb2x5ZmlsbCJdLCJtYXBwaW5ncyI6IjtRQUFBO1FBQ0E7O1FBRUE7UUFDQTs7UUFFQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTs7UUFFQTtRQUNBOztRQUVBO1FBQ0E7O1FBRUE7UUFDQTtRQUNBOzs7UUFHQTtRQUNBOztRQUVBO1FBQ0E7O1FBRUE7UUFDQTtRQUNBO1FBQ0EsMENBQTBDLGdDQUFnQztRQUMxRTtRQUNBOztRQUVBO1FBQ0E7UUFDQTtRQUNBLHdEQUF3RCxrQkFBa0I7UUFDMUU7UUFDQSxpREFBaUQsY0FBYztRQUMvRDs7UUFFQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0EseUNBQXlDLGlDQUFpQztRQUMxRSxnSEFBZ0gsbUJBQW1CLEVBQUU7UUFDckk7UUFDQTs7UUFFQTtRQUNBO1FBQ0E7UUFDQSwyQkFBMkIsMEJBQTBC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TUFBbkI7QUFDRDs7QUFFRFosV0FBTyxDQUFDaEUsT0FBUixDQUFnQnp2QixPQUFoQixDQUF3QixVQUFTRyxLQUFULEVBQWdCRSxJQUFoQixFQUFzQjtBQUM1Q3N6QixTQUFHLENBQUNXLGdCQUFKLENBQXFCajBCLElBQXJCLEVBQTJCRixLQUEzQjtBQUNELEtBRkQ7O0FBSUEsUUFBSXN6QixPQUFPLENBQUNwQixNQUFaLEVBQW9CO0FBQ2xCb0IsYUFBTyxDQUFDcEIsTUFBUixDQUFlM3hCLGdCQUFmLENBQWdDLE9BQWhDLEVBQXlDbXpCLFFBQXpDOztBQUVBRixTQUFHLENBQUNZLGtCQUFKLEdBQXlCLFlBQVc7QUFDbEM7QUFDQSxZQUFJWixHQUFHLENBQUNhLFVBQUosS0FBbUIsQ0FBdkIsRUFBMEI7QUFDeEJmLGlCQUFPLENBQUNwQixNQUFSLENBQWVvQyxtQkFBZixDQUFtQyxPQUFuQyxFQUE0Q1osUUFBNUM7QUFDRDtBQUNGLE9BTEQ7QUFNRDs7QUFFREYsT0FBRyxDQUFDZSxJQUFKLENBQVMsT0FBT2pCLE9BQU8sQ0FBQ3BDLFNBQWYsS0FBNkIsV0FBN0IsR0FBMkMsSUFBM0MsR0FBa0RvQyxPQUFPLENBQUNwQyxTQUFuRTtBQUNELEdBaEVNLENBQVA7QUFpRUQ7QUFFRHJ2QixLQUFLLENBQUMyeUIsUUFBTixHQUFpQixJQUFqQjs7QUFFQSxJQUFJLENBQUM5d0IsSUFBSSxDQUFDN0IsS0FBVixFQUFpQjtBQUNmNkIsTUFBSSxDQUFDN0IsS0FBTCxHQUFhQSxLQUFiO0FBQ0E2QixNQUFJLENBQUMyckIsT0FBTCxHQUFlQSxPQUFmO0FBQ0EzckIsTUFBSSxDQUFDc3VCLE9BQUwsR0FBZUEsT0FBZjtBQUNBdHVCLE1BQUksQ0FBQ292QixRQUFMLEdBQWdCQSxRQUFoQjtBQUNELEMiLCJmaWxlIjoiYXNzZXRzL2pzL2J1bmRsZS5qcyIsInNvdXJjZXNDb250ZW50IjpbIiBcdC8vIFRoZSBtb2R1bGUgY2FjaGVcbiBcdHZhciBpbnN0YWxsZWRNb2R1bGVzID0ge307XG5cbiBcdC8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG4gXHRmdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cbiBcdFx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG4gXHRcdGlmKGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdKSB7XG4gXHRcdFx0cmV0dXJuIGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdLmV4cG9ydHM7XG4gXHRcdH1cbiBcdFx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcbiBcdFx0dmFyIG1vZHVsZSA9IGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdID0ge1xuIFx0XHRcdGk6IG1vZHVsZUlkLFxuIFx0XHRcdGw6IGZhbHNlLFxuIFx0XHRcdGV4cG9ydHM6IHt9XG4gXHRcdH07XG5cbiBcdFx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG4gXHRcdG1vZHVsZXNbbW9kdWxlSWRdLmNhbGwobW9kdWxlLmV4cG9ydHMsIG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG4gXHRcdC8vIEZsYWcgdGhlIG1vZHVsZSBhcyBsb2FkZWRcbiBcdFx0bW9kdWxlLmwgPSB0cnVlO1xuXG4gXHRcdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG4gXHRcdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbiBcdH1cblxuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZXMgb2JqZWN0IChfX3dlYnBhY2tfbW9kdWxlc19fKVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5tID0gbW9kdWxlcztcblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGUgY2FjaGVcbiBcdF9fd2VicGFja19yZXF1aXJlX18uYyA9IGluc3RhbGxlZE1vZHVsZXM7XG5cbiBcdC8vIGRlZmluZSBnZXR0ZXIgZnVuY3Rpb24gZm9yIGhhcm1vbnkgZXhwb3J0c1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5kID0gZnVuY3Rpb24oZXhwb3J0cywgbmFtZSwgZ2V0dGVyKSB7XG4gXHRcdGlmKCFfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZXhwb3J0cywgbmFtZSkpIHtcbiBcdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgbmFtZSwgeyBlbnVtZXJhYmxlOiB0cnVlLCBnZXQ6IGdldHRlciB9KTtcbiBcdFx0fVxuIFx0fTtcblxuIFx0Ly8gZGVmaW5lIF9fZXNNb2R1bGUgb24gZXhwb3J0c1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5yID0gZnVuY3Rpb24oZXhwb3J0cykge1xuIFx0XHRpZih0eXBlb2YgU3ltYm9sICE9PSAndW5kZWZpbmVkJyAmJiBTeW1ib2wudG9TdHJpbmdUYWcpIHtcbiBcdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgU3ltYm9sLnRvU3RyaW5nVGFnLCB7IHZhbHVlOiAnTW9kdWxlJyB9KTtcbiBcdFx0fVxuIFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgJ19fZXNNb2R1bGUnLCB7IHZhbHVlOiB0cnVlIH0pO1xuIFx0fTtcblxuIFx0Ly8gY3JlYXRlIGEgZmFrZSBuYW1lc3BhY2Ugb2JqZWN0XG4gXHQvLyBtb2RlICYgMTogdmFsdWUgaXMgYSBtb2R1bGUgaWQsIHJlcXVpcmUgaXRcbiBcdC8vIG1vZGUgJiAyOiBtZXJnZSBhbGwgcHJvcGVydGllcyBvZiB2YWx1ZSBpbnRvIHRoZSBuc1xuIFx0Ly8gbW9kZSAmIDQ6IHJldHVybiB2YWx1ZSB3aGVuIGFscmVhZHkgbnMgb2JqZWN0XG4gXHQvLyBtb2RlICYgOHwxOiBiZWhhdmUgbGlrZSByZXF1aXJlXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnQgPSBmdW5jdGlvbih2YWx1ZSwgbW9kZSkge1xuIFx0XHRpZihtb2RlICYgMSkgdmFsdWUgPSBfX3dlYnBhY2tfcmVxdWlyZV9fKHZhbHVlKTtcbiBcdFx0aWYobW9kZSAmIDgpIHJldHVybiB2YWx1ZTtcbiBcdFx0aWYoKG1vZGUgJiA0KSAmJiB0eXBlb2YgdmFsdWUgPT09ICdvYmplY3QnICYmIHZhbHVlICYmIHZhbHVlLl9fZXNNb2R1bGUpIHJldHVybiB2YWx1ZTtcbiBcdFx0dmFyIG5zID0gT2JqZWN0LmNyZWF0ZShudWxsKTtcbiBcdFx0X193ZWJwYWNrX3JlcXVpcmVfXy5yKG5zKTtcbiBcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KG5zLCAnZGVmYXVsdCcsIHsgZW51bWVyYWJsZTogdHJ1ZSwgdmFsdWU6IHZhbHVlIH0pO1xuIFx0XHRpZihtb2RlICYgMiAmJiB0eXBlb2YgdmFsdWUgIT0gJ3N0cmluZycpIGZvcih2YXIga2V5IGluIHZhbHVlKSBfX3dlYnBhY2tfcmVxdWlyZV9fLmQobnMsIGtleSwgZnVuY3Rpb24oa2V5KSB7IHJldHVybiB2YWx1ZVtrZXldOyB9LmJpbmQobnVsbCwga2V5KSk7XG4gXHRcdHJldHVybiBucztcbiBcdH07XG5cbiBcdC8vIGdldERlZmF1bHRFeHBvcnQgZnVuY3Rpb24gZm9yIGNvbXBhdGliaWxpdHkgd2l0aCBub24taGFybW9ueSBtb2R1bGVzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm4gPSBmdW5jdGlvbihtb2R1bGUpIHtcbiBcdFx0dmFyIGdldHRlciA9IG1vZHVsZSAmJiBtb2R1bGUuX19lc01vZHVsZSA/XG4gXHRcdFx0ZnVuY3Rpb24gZ2V0RGVmYXVsdCgpIHsgcmV0dXJuIG1vZHVsZVsnZGVmYXVsdCddOyB9IDpcbiBcdFx0XHRmdW5jdGlvbiBnZXRNb2R1bGVFeHBvcnRzKCkgeyByZXR1cm4gbW9kdWxlOyB9O1xuIFx0XHRfX3dlYnBhY2tfcmVxdWlyZV9fLmQoZ2V0dGVyLCAnYScsIGdldHRlcik7XG4gXHRcdHJldHVybiBnZXR0ZXI7XG4gXHR9O1xuXG4gXHQvLyBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGxcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubyA9IGZ1bmN0aW9uKG9iamVjdCwgcHJvcGVydHkpIHsgcmV0dXJuIE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvYmplY3QsIHByb3BlcnR5KTsgfTtcblxuIFx0Ly8gX193ZWJwYWNrX3B1YmxpY19wYXRoX19cbiBcdF9fd2VicGFja19yZXF1aXJlX18ucCA9IFwiL1wiO1xuXG5cbiBcdC8vIExvYWQgZW50cnkgbW9kdWxlIGFuZCByZXR1cm4gZXhwb3J0c1xuIFx0cmV0dXJuIF9fd2VicGFja19yZXF1aXJlX18oX193ZWJwYWNrX3JlcXVpcmVfXy5zID0gXCIuL2Zyb250ZW5kL3dlbGNvbWUvaW5kZXguanNcIik7XG4iLCJjbGFzcyBHbG9iYWwge1xuICAgIGFzeW5jIGluaXQoKSB7XG4gICAgICAgIGNvbnN0IEpTT05fUEFUSCA9ICcuL2Fzc2V0cy9qc29uL3JlZ2lvbnMuanNvbic7XG4gICAgICAgIGNvbnN0IEpTT05fUEFUSF9TSE9QUyA9ICcuL2Fzc2V0cy9qc29uL3Nob3BzLmpzb24nO1xuICAgICAgICB0aGlzLmlucHV0ID0gZG9jdW1lbnQuZ2V0RWxlbWVudHNCeUNsYXNzTmFtZSgnanMtemlwJylbMF07XG4gICAgICAgIHRoaXMuYnV0dG9uID0gZG9jdW1lbnQuZ2V0RWxlbWVudHNCeUNsYXNzTmFtZSgnanMtc3VibWl0LWJ1dHRvbicpWzBdO1xuICAgICAgICB0aGlzLmVycm9yID0gZG9jdW1lbnQuZ2V0RWxlbWVudHNCeUNsYXNzTmFtZSgnanMtZXJyb3InKVswXTtcbiAgICAgICAgdGhpcy5zZWxlY3QgPSBkb2N1bWVudC5nZXRFbGVtZW50c0J5Q2xhc3NOYW1lKCdzZWxlY3Qtc3RvcmUnKVswXTtcbiAgICAgICAgdGhpcy5yZWdpb25zID0gYXdhaXQgdGhpcy5nZXRKc29uKEpTT05fUEFUSCk7XG4gICAgICAgIHRoaXMuc2hvcHMgPSBhd2FpdCB0aGlzLmdldEpzb24oSlNPTl9QQVRIX1NIT1BTKTtcblxuICAgICAgICB0aGlzLmNyZWF0ZVNlbGVjdCh0aGlzLnNob3BzKTtcbiAgICAgICAgdGhpcy5tYXBFdmVudHMoKTtcbiAgICB9XG5cbiAgICBjcmVhdGVTZWxlY3Qoc2hvcHMpIHtcbiAgICAgICBjb25zdCBzZWwgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnc2VsZWN0LXN0b3JlJyk7XG5cbiAgICAgICBPYmplY3QuZW50cmllcyhzaG9wcykuZm9yRWFjaChlbnRyeSA9PiB7XG4gICAgICAgICAgIGNvbnN0IFtrZXksIHZhbHVlXSA9IGVudHJ5O1xuICAgICAgICAgICBjb25zdCBrZTEgPSBrZXk7XG4gICAgICAgICAgIGNvbnN0IG5hbWUgPSB2YWx1ZS5uYW1lO1xuICAgICAgICAgICBjb25zdCBlbCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJvcHRpb25cIik7XG4gICAgICAgICAgIGVsLnZhbHVlID0ga2UxO1xuICAgICAgICAgICBlbC50ZXh0ID0gbmFtZTtcblxuICAgICAgICAgICBzZWwuYWRkKGVsKTtcbiAgICAgICAgfSk7XG4gICAgfVxuXG4gICAgbWFwRXZlbnRzKCkge1xuICAgICAgICB0aGlzLmVycm9yLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgKCkgPT4gdGhpcy5oaWRlRXJyb3JNZXNzYWdlKCkpO1xuICAgICAgICB0aGlzLnNlbGVjdC5hZGRFdmVudExpc3RlbmVyKCdjaGFuZ2UnLCAoKSA9PiB0aGlzLmdldFdlYkFkZHJlc3ModGhpcy5zaG9wcykpO1xuICAgIH1cblxuICAgIGdldFdlYkFkZHJlc3Moc2hvcHMpIHtcbiAgICAgICAgbGV0IHN1YmxpbmsgPSAnJztcbiAgICAgICAgbGV0IHN0b3JlVXJsUGFydCA9ICcnO1xuXG4gICAgICAgIGNvbnN0IGhyZWYgPSB3aW5kb3cubG9jYXRpb24uaHJlZjtcbiAgICAgICAgbGV0IGRvbWFpbk5ldyA9IGhyZWYucmVwbGFjZSgnd2VsY29tZS4nLCAnJyk7XG4gICAgICAgIGxldCBzdWJsaW5rUG9zID0gZG9tYWluTmV3LmluZGV4T2YoXCI/ZGUvXCIpO1xuICAgICAgICBpZiAoc3VibGlua1BvcyA+IDApIHtcbiAgICAgICAgICAgIGxldCB0ZW1wTGluayA9IGRvbWFpbk5ldy5zdWJzdHIoc3VibGlua1BvcywgZG9tYWluTmV3Lmxlbmd0aCk7XG4gICAgICAgICAgICB0ZW1wTGluayA9IHRlbXBMaW5rLnJlcGxhY2UoJyYnLCAnJTI2Jyk7XG4gICAgICAgICAgICBzdWJsaW5rID0gJyZwYXRoPScgKyB0ZW1wTGluaztcbiAgICAgICAgICAgIHN1YmxpbmsgPSBzdWJsaW5rLnJlcGxhY2UoJz8nLCAnJyk7XG4gICAgICAgICAgICBkb21haW5OZXcgPSBkb21haW5OZXcuc3Vic3RyKDAsIHN1YmxpbmtQb3MpO1xuICAgICAgICB9XG4gICAgICAgIGNvbnN0IHNlbGVjdFZhbHVlID0gdGhpcy5zZWxlY3QudmFsdWU7XG4gICAgICAgIGNvbnN0IHN0b3JlID0gT2JqZWN0LmtleXMoc2hvcHMpLmZpbmQoc3RvcmUgPT4gc2VsZWN0VmFsdWUgPT09IHN0b3JlKTtcbiAgICAgICAgc3RvcmVVcmxQYXJ0ID0gc2hvcHNbc3RvcmVdLmxpbms7XG4gICAgICAgIGNvbnN0IG5ld0xpbmsgPSBkb21haW5OZXcrc3RvcmVVcmxQYXJ0K3N1Ymxpbms7XG4gICAgICAgIHdpbmRvdy5sb2NhdGlvbi5ocmVmID0gbmV3TGluaztcbiAgICB9XG5cbiAgICBhc3luYyBnZXRKc29uKHVybCkge1xuICAgICAgICBjb25zdCByZXNwb25zZSA9IGF3YWl0IGZldGNoKHVybCk7XG5cbiAgICAgICAgcmV0dXJuIHJlc3BvbnNlLmpzb24oKTtcbiAgICB9XG5cbiAgICB2YWxpZGF0ZVZhbHVlKCkge1xuICAgICAgICBjb25zdCB2YWwgPSB0aGlzLmlucHV0LnZhbHVlO1xuICAgICAgICBjb25zdCBsZW5ndGggPSB0aGlzLmlucHV0LnZhbHVlLmxlbmd0aDtcbiAgICAgICAgY29uc3QgaXNudW0gPSAvXlxcZCskLy50ZXN0KHZhbCk7XG4gICAgICAgIGlmKCFpc251bSB8fCBsZW5ndGggPiB0aGlzLmxpbWl0KSB7XG4gICAgICAgICAgICB0aGlzLmlucHV0LnZhbHVlID0gdmFsLnN1YnN0cmluZygtMCwgbGVuZ3RoIC0gMSk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICB2YWxpZGF0ZVppcChyZWdpb25zKSB7XG4gICAgICAgIGNvbnN0IGlucHV0VmFsdWUgPSB0aGlzLmlucHV0LnZhbHVlO1xuICAgICAgICBjb25zdCByZWdpb24gPSBPYmplY3Qua2V5cyhyZWdpb25zKS5maW5kKHJlZ2lvbiA9PiBpbnB1dFZhbHVlID09PSByZWdpb24pO1xuXG4gICAgICAgIGlmICghcmVnaW9uKSB7XG4gICAgICAgICAgICB0aGlzLnNob3dFcnJvck1lc3NhZ2UoKTtcblxuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG5cbiAgICAgICAgY29uc3QgaHJlZiA9IHdpbmRvdy5sb2NhdGlvbi5ocmVmO1xuICAgICAgICBjb25zdCBzdG9yZVVybFBhcnQgPSBPYmplY3QudmFsdWVzKHJlZ2lvbnNbcmVnaW9uXSk7XG4gICAgICAgIHdpbmRvdy5sb2NhdGlvbi5ocmVmID0gaHJlZi5yZXBsYWNlKCd3ZWxjb21lLicsIGAke3N0b3JlVXJsUGFydH0uYCk7XG4gICAgfVxuXG4gICAgaGlkZUVycm9yTWVzc2FnZSgpIHtcbiAgICAgICAgdGhpcy5lcnJvci5jbGFzc0xpc3QuYWRkKCdpcy1oaWRkZW4nKTtcbiAgICB9XG5cbiAgICBzaG93RXJyb3JNZXNzYWdlKCkge1xuICAgICAgICB0aGlzLmVycm9yLmNsYXNzTGlzdC5yZW1vdmUoJ2lzLWhpZGRlbicpO1xuICAgIH1cbn1cblxuZG9jdW1lbnQuYWRkRXZlbnRMaXN0ZW5lcihcIkRPTUNvbnRlbnRMb2FkZWRcIiwgbmV3IEdsb2JhbCgpLmluaXQoKSk7XG4iLCIvLyBleHRyYWN0ZWQgYnkgbWluaS1jc3MtZXh0cmFjdC1wbHVnaW4iLCJpbXBvcnQgJy4vYXNzZXRzL3Njc3MvZ2xvYmFsLnNjc3MnO1xuaW1wb3J0ICdjb3JlLWpzL2ZlYXR1cmVzL3Byb21pc2UnO1xuaW1wb3J0ICdjb3JlLWpzL2ZlYXR1cmVzL2FycmF5JztcbmltcG9ydCAnY29yZS1qcy9mZWF0dXJlcy9vYmplY3QvdmFsdWVzJztcbmltcG9ydCAnd2hhdHdnLWZldGNoJztcbmltcG9ydCAnLi9hc3NldHMvanMvZ2xvYmFsLmpzJztcbiIsImZ1bmN0aW9uIGFzeW5jR2VuZXJhdG9yU3RlcChnZW4sIHJlc29sdmUsIHJlamVjdCwgX25leHQsIF90aHJvdywga2V5LCBhcmcpIHtcbiAgdHJ5IHtcbiAgICB2YXIgaW5mbyA9IGdlbltrZXldKGFyZyk7XG4gICAgdmFyIHZhbHVlID0gaW5mby52YWx1ZTtcbiAgfSBjYXRjaCAoZXJyb3IpIHtcbiAgICByZWplY3QoZXJyb3IpO1xuICAgIHJldHVybjtcbiAgfVxuXG4gIGlmIChpbmZvLmRvbmUpIHtcbiAgICByZXNvbHZlKHZhbHVlKTtcbiAgfSBlbHNlIHtcbiAgICBQcm9taXNlLnJlc29sdmUodmFsdWUpLnRoZW4oX25leHQsIF90aHJvdyk7XG4gIH1cbn1cblxuZnVuY3Rpb24gX2FzeW5jVG9HZW5lcmF0b3IoZm4pIHtcbiAgcmV0dXJuIGZ1bmN0aW9uICgpIHtcbiAgICB2YXIgc2VsZiA9IHRoaXMsXG4gICAgICAgIGFyZ3MgPSBhcmd1bWVudHM7XG4gICAgcmV0dXJuIG5ldyBQcm9taXNlKGZ1bmN0aW9uIChyZXNvbHZlLCByZWplY3QpIHtcbiAgICAgIHZhciBnZW4gPSBmbi5hcHBseShzZWxmLCBhcmdzKTtcblxuICAgICAgZnVuY3Rpb24gX25leHQodmFsdWUpIHtcbiAgICAgICAgYXN5bmNHZW5lcmF0b3JTdGVwKGdlbiwgcmVzb2x2ZSwgcmVqZWN0LCBfbmV4dCwgX3Rocm93LCBcIm5leHRcIiwgdmFsdWUpO1xuICAgICAgfVxuXG4gICAgICBmdW5jdGlvbiBfdGhyb3coZXJyKSB7XG4gICAgICAgIGFzeW5jR2VuZXJhdG9yU3RlcChnZW4sIHJlc29sdmUsIHJlamVjdCwgX25leHQsIF90aHJvdywgXCJ0aHJvd1wiLCBlcnIpO1xuICAgICAgfVxuXG4gICAgICBfbmV4dCh1bmRlZmluZWQpO1xuICAgIH0pO1xuICB9O1xufVxuXG5tb2R1bGUuZXhwb3J0cyA9IF9hc3luY1RvR2VuZXJhdG9yOyIsIm1vZHVsZS5leHBvcnRzID0gcmVxdWlyZShcInJlZ2VuZXJhdG9yLXJ1bnRpbWVcIik7XG4iLCJyZXF1aXJlKCcuLi8uLi9tb2R1bGVzL2VzLnN0cmluZy5pdGVyYXRvcicpO1xucmVxdWlyZSgnLi4vLi4vbW9kdWxlcy9lcy5hcnJheS5mcm9tJyk7XG5yZXF1aXJlKCcuLi8uLi9tb2R1bGVzL2VzLmFycmF5LmlzLWFycmF5Jyk7XG5yZXF1aXJlKCcuLi8uLi9tb2R1bGVzL2VzLmFycmF5Lm9mJyk7XG5yZXF1aXJlKCcuLi8uLi9tb2R1bGVzL2VzLmFycmF5LmNvbmNhdCcpO1xucmVxdWlyZSgnLi4vLi4vbW9kdWxlcy9lcy5hcnJheS5jb3B5LXdpdGhpbicpO1xucmVxdWlyZSgnLi4vLi4vbW9kdWxlcy9lcy5hcnJheS5ldmVyeScpO1xucmVxdWlyZSgnLi4vLi4vbW9kdWxlcy9lcy5hcnJheS5maWxsJyk7XG5yZXF1aXJlKCcuLi8uLi9tb2R1bGVzL2VzLmFycmF5LmZpbHRlcicpO1xucmVxdWlyZSgnLi4vLi4vbW9kdWxlcy9lcy5hcnJheS5maW5kJyk7XG5yZXF1aXJlKCcuLi8uLi9tb2R1bGVzL2VzLmFycmF5LmZpbmQtaW5kZXgnKTtcbnJlcXVpcmUoJy4uLy4uL21vZHVsZXMvZXMuYXJyYXkuZmxhdCcpO1xucmVxdWlyZSgnLi4vLi4vbW9kdWxlcy9lcy5hcnJheS5mbGF0LW1hcCcpO1xucmVxdWlyZSgnLi4vLi4vbW9kdWxlcy9lcy5hcnJheS5mb3ItZWFjaCcpO1xucmVxdWlyZSgnLi4vLi4vbW9kdWxlcy9lcy5hcnJheS5pbmNsdWRlcycpO1xucmVxdWlyZSgnLi4vLi4vbW9kdWxlcy9lcy5hcnJheS5pbmRleC1vZicpO1xucmVxdWlyZSgnLi4vLi4vbW9kdWxlcy9lcy5hcnJheS5pdGVyYXRvcicpO1xucmVxdWlyZSgnLi4vLi4vbW9kdWxlcy9lcy5hcnJheS5qb2luJyk7XG5yZXF1aXJlKCcuLi8uLi9tb2R1bGVzL2VzLmFycmF5Lmxhc3QtaW5kZXgtb2YnKTtcbnJlcXVpcmUoJy4uLy4uL21vZHVsZXMvZXMuYXJyYXkubWFwJyk7XG5yZXF1aXJlKCcuLi8uLi9tb2R1bGVzL2VzLmFycmF5LnJlZHVjZScpO1xucmVxdWlyZSgnLi4vLi4vbW9kdWxlcy9lcy5hcnJheS5yZWR1Y2UtcmlnaHQnKTtcbnJlcXVpcmUoJy4uLy4uL21vZHVsZXMvZXMuYXJyYXkucmV2ZXJzZScpO1xucmVxdWlyZSgnLi4vLi4vbW9kdWxlcy9lcy5hcnJheS5zbGljZScpO1xucmVxdWlyZSgnLi4vLi4vbW9kdWxlcy9lcy5hcnJheS5zb21lJyk7XG5yZXF1aXJlKCcuLi8uLi9tb2R1bGVzL2VzLmFycmF5LnNvcnQnKTtcbnJlcXVpcmUoJy4uLy4uL21vZHVsZXMvZXMuYXJyYXkuc3BlY2llcycpO1xucmVxdWlyZSgnLi4vLi4vbW9kdWxlcy9lcy5hcnJheS5zcGxpY2UnKTtcbnJlcXVpcmUoJy4uLy4uL21vZHVsZXMvZXMuYXJyYXkudW5zY29wYWJsZXMuZmxhdCcpO1xucmVxdWlyZSgnLi4vLi4vbW9kdWxlcy9lcy5hcnJheS51bnNjb3BhYmxlcy5mbGF0LW1hcCcpO1xudmFyIHBhdGggPSByZXF1aXJlKCcuLi8uLi9pbnRlcm5hbHMvcGF0aCcpO1xuXG5tb2R1bGUuZXhwb3J0cyA9IHBhdGguQXJyYXk7XG4iLCJyZXF1aXJlKCcuLi8uLi9tb2R1bGVzL2VzLm9iamVjdC52YWx1ZXMnKTtcbnZhciBwYXRoID0gcmVxdWlyZSgnLi4vLi4vaW50ZXJuYWxzL3BhdGgnKTtcblxubW9kdWxlLmV4cG9ydHMgPSBwYXRoLk9iamVjdC52YWx1ZXM7XG4iLCJyZXF1aXJlKCcuLi8uLi9tb2R1bGVzL2VzLm9iamVjdC50by1zdHJpbmcnKTtcbnJlcXVpcmUoJy4uLy4uL21vZHVsZXMvZXMuc3RyaW5nLml0ZXJhdG9yJyk7XG5yZXF1aXJlKCcuLi8uLi9tb2R1bGVzL3dlYi5kb20tY29sbGVjdGlvbnMuaXRlcmF0b3InKTtcbnJlcXVpcmUoJy4uLy4uL21vZHVsZXMvZXMucHJvbWlzZScpO1xucmVxdWlyZSgnLi4vLi4vbW9kdWxlcy9lcy5wcm9taXNlLmFsbC1zZXR0bGVkJyk7XG5yZXF1aXJlKCcuLi8uLi9tb2R1bGVzL2VzLnByb21pc2UuZmluYWxseScpO1xudmFyIHBhdGggPSByZXF1aXJlKCcuLi8uLi9pbnRlcm5hbHMvcGF0aCcpO1xuXG5tb2R1bGUuZXhwb3J0cyA9IHBhdGguUHJvbWlzZTtcbiIsInZhciBwYXJlbnQgPSByZXF1aXJlKCcuLi8uLi9lcy9hcnJheScpO1xucmVxdWlyZSgnLi4vLi4vbW9kdWxlcy9lc25leHQuYXJyYXkuaXMtdGVtcGxhdGUtb2JqZWN0Jyk7XG5yZXF1aXJlKCcuLi8uLi9tb2R1bGVzL2VzbmV4dC5hcnJheS5sYXN0LWl0ZW0nKTtcbnJlcXVpcmUoJy4uLy4uL21vZHVsZXMvZXNuZXh0LmFycmF5Lmxhc3QtaW5kZXgnKTtcblxubW9kdWxlLmV4cG9ydHMgPSBwYXJlbnQ7XG4iLCJ2YXIgcGFyZW50ID0gcmVxdWlyZSgnLi4vLi4vZXMvb2JqZWN0L3ZhbHVlcycpO1xuXG5tb2R1bGUuZXhwb3J0cyA9IHBhcmVudDtcbiIsInZhciBwYXJlbnQgPSByZXF1aXJlKCcuLi8uLi9lcy9wcm9taXNlJyk7XG5yZXF1aXJlKCcuLi8uLi9tb2R1bGVzL2VzbmV4dC5hZ2dyZWdhdGUtZXJyb3InKTtcbi8vIFRPRE86IFJlbW92ZSBmcm9tIGBjb3JlLWpzQDRgXG5yZXF1aXJlKCcuLi8uLi9tb2R1bGVzL2VzbmV4dC5wcm9taXNlLmFsbC1zZXR0bGVkJyk7XG5yZXF1aXJlKCcuLi8uLi9tb2R1bGVzL2VzbmV4dC5wcm9taXNlLnRyeScpO1xucmVxdWlyZSgnLi4vLi4vbW9kdWxlcy9lc25leHQucHJvbWlzZS5hbnknKTtcblxubW9kdWxlLmV4cG9ydHMgPSBwYXJlbnQ7XG4iLCJtb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIChpdCkge1xuICBpZiAodHlwZW9mIGl0ICE9ICdmdW5jdGlvbicpIHtcbiAgICB0aHJvdyBUeXBlRXJyb3IoU3RyaW5nKGl0KSArICcgaXMgbm90IGEgZnVuY3Rpb24nKTtcbiAgfSByZXR1cm4gaXQ7XG59O1xuIiwidmFyIGlzT2JqZWN0ID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL2lzLW9iamVjdCcpO1xuXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIChpdCkge1xuICBpZiAoIWlzT2JqZWN0KGl0KSAmJiBpdCAhPT0gbnVsbCkge1xuICAgIHRocm93IFR5cGVFcnJvcihcIkNhbid0IHNldCBcIiArIFN0cmluZyhpdCkgKyAnIGFzIGEgcHJvdG90eXBlJyk7XG4gIH0gcmV0dXJuIGl0O1xufTtcbiIsInZhciB3ZWxsS25vd25TeW1ib2wgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvd2VsbC1rbm93bi1zeW1ib2wnKTtcbnZhciBjcmVhdGUgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvb2JqZWN0LWNyZWF0ZScpO1xudmFyIGNyZWF0ZU5vbkVudW1lcmFibGVQcm9wZXJ0eSA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9jcmVhdGUtbm9uLWVudW1lcmFibGUtcHJvcGVydHknKTtcblxudmFyIFVOU0NPUEFCTEVTID0gd2VsbEtub3duU3ltYm9sKCd1bnNjb3BhYmxlcycpO1xudmFyIEFycmF5UHJvdG90eXBlID0gQXJyYXkucHJvdG90eXBlO1xuXG4vLyBBcnJheS5wcm90b3R5cGVbQEB1bnNjb3BhYmxlc11cbi8vIGh0dHBzOi8vdGMzOS5naXRodWIuaW8vZWNtYTI2Mi8jc2VjLWFycmF5LnByb3RvdHlwZS1AQHVuc2NvcGFibGVzXG5pZiAoQXJyYXlQcm90b3R5cGVbVU5TQ09QQUJMRVNdID09IHVuZGVmaW5lZCkge1xuICBjcmVhdGVOb25FbnVtZXJhYmxlUHJvcGVydHkoQXJyYXlQcm90b3R5cGUsIFVOU0NPUEFCTEVTLCBjcmVhdGUobnVsbCkpO1xufVxuXG4vLyBhZGQgYSBrZXkgdG8gQXJyYXkucHJvdG90eXBlW0BAdW5zY29wYWJsZXNdXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIChrZXkpIHtcbiAgQXJyYXlQcm90b3R5cGVbVU5TQ09QQUJMRVNdW2tleV0gPSB0cnVlO1xufTtcbiIsIm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gKGl0LCBDb25zdHJ1Y3RvciwgbmFtZSkge1xuICBpZiAoIShpdCBpbnN0YW5jZW9mIENvbnN0cnVjdG9yKSkge1xuICAgIHRocm93IFR5cGVFcnJvcignSW5jb3JyZWN0ICcgKyAobmFtZSA/IG5hbWUgKyAnICcgOiAnJykgKyAnaW52b2NhdGlvbicpO1xuICB9IHJldHVybiBpdDtcbn07XG4iLCJ2YXIgaXNPYmplY3QgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvaXMtb2JqZWN0Jyk7XG5cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gKGl0KSB7XG4gIGlmICghaXNPYmplY3QoaXQpKSB7XG4gICAgdGhyb3cgVHlwZUVycm9yKFN0cmluZyhpdCkgKyAnIGlzIG5vdCBhbiBvYmplY3QnKTtcbiAgfSByZXR1cm4gaXQ7XG59O1xuIiwiJ3VzZSBzdHJpY3QnO1xudmFyIHRvT2JqZWN0ID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL3RvLW9iamVjdCcpO1xudmFyIHRvQWJzb2x1dGVJbmRleCA9IHJlcXVpcmUoJy4uL2ludGVybmFscy90by1hYnNvbHV0ZS1pbmRleCcpO1xudmFyIHRvTGVuZ3RoID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL3RvLWxlbmd0aCcpO1xuXG52YXIgbWluID0gTWF0aC5taW47XG5cbi8vIGBBcnJheS5wcm90b3R5cGUuY29weVdpdGhpbmAgbWV0aG9kIGltcGxlbWVudGF0aW9uXG4vLyBodHRwczovL3RjMzkuZ2l0aHViLmlvL2VjbWEyNjIvI3NlYy1hcnJheS5wcm90b3R5cGUuY29weXdpdGhpblxubW9kdWxlLmV4cG9ydHMgPSBbXS5jb3B5V2l0aGluIHx8IGZ1bmN0aW9uIGNvcHlXaXRoaW4odGFyZ2V0IC8qID0gMCAqLywgc3RhcnQgLyogPSAwLCBlbmQgPSBAbGVuZ3RoICovKSB7XG4gIHZhciBPID0gdG9PYmplY3QodGhpcyk7XG4gIHZhciBsZW4gPSB0b0xlbmd0aChPLmxlbmd0aCk7XG4gIHZhciB0byA9IHRvQWJzb2x1dGVJbmRleCh0YXJnZXQsIGxlbik7XG4gIHZhciBmcm9tID0gdG9BYnNvbHV0ZUluZGV4KHN0YXJ0LCBsZW4pO1xuICB2YXIgZW5kID0gYXJndW1lbnRzLmxlbmd0aCA+IDIgPyBhcmd1bWVudHNbMl0gOiB1bmRlZmluZWQ7XG4gIHZhciBjb3VudCA9IG1pbigoZW5kID09PSB1bmRlZmluZWQgPyBsZW4gOiB0b0Fic29sdXRlSW5kZXgoZW5kLCBsZW4pKSAtIGZyb20sIGxlbiAtIHRvKTtcbiAgdmFyIGluYyA9IDE7XG4gIGlmIChmcm9tIDwgdG8gJiYgdG8gPCBmcm9tICsgY291bnQpIHtcbiAgICBpbmMgPSAtMTtcbiAgICBmcm9tICs9IGNvdW50IC0gMTtcbiAgICB0byArPSBjb3VudCAtIDE7XG4gIH1cbiAgd2hpbGUgKGNvdW50LS0gPiAwKSB7XG4gICAgaWYgKGZyb20gaW4gTykgT1t0b10gPSBPW2Zyb21dO1xuICAgIGVsc2UgZGVsZXRlIE9bdG9dO1xuICAgIHRvICs9IGluYztcbiAgICBmcm9tICs9IGluYztcbiAgfSByZXR1cm4gTztcbn07XG4iLCIndXNlIHN0cmljdCc7XG52YXIgdG9PYmplY3QgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvdG8tb2JqZWN0Jyk7XG52YXIgdG9BYnNvbHV0ZUluZGV4ID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL3RvLWFic29sdXRlLWluZGV4Jyk7XG52YXIgdG9MZW5ndGggPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvdG8tbGVuZ3RoJyk7XG5cbi8vIGBBcnJheS5wcm90b3R5cGUuZmlsbGAgbWV0aG9kIGltcGxlbWVudGF0aW9uXG4vLyBodHRwczovL3RjMzkuZ2l0aHViLmlvL2VjbWEyNjIvI3NlYy1hcnJheS5wcm90b3R5cGUuZmlsbFxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiBmaWxsKHZhbHVlIC8qICwgc3RhcnQgPSAwLCBlbmQgPSBAbGVuZ3RoICovKSB7XG4gIHZhciBPID0gdG9PYmplY3QodGhpcyk7XG4gIHZhciBsZW5ndGggPSB0b0xlbmd0aChPLmxlbmd0aCk7XG4gIHZhciBhcmd1bWVudHNMZW5ndGggPSBhcmd1bWVudHMubGVuZ3RoO1xuICB2YXIgaW5kZXggPSB0b0Fic29sdXRlSW5kZXgoYXJndW1lbnRzTGVuZ3RoID4gMSA/IGFyZ3VtZW50c1sxXSA6IHVuZGVmaW5lZCwgbGVuZ3RoKTtcbiAgdmFyIGVuZCA9IGFyZ3VtZW50c0xlbmd0aCA+IDIgPyBhcmd1bWVudHNbMl0gOiB1bmRlZmluZWQ7XG4gIHZhciBlbmRQb3MgPSBlbmQgPT09IHVuZGVmaW5lZCA/IGxlbmd0aCA6IHRvQWJzb2x1dGVJbmRleChlbmQsIGxlbmd0aCk7XG4gIHdoaWxlIChlbmRQb3MgPiBpbmRleCkgT1tpbmRleCsrXSA9IHZhbHVlO1xuICByZXR1cm4gTztcbn07XG4iLCIndXNlIHN0cmljdCc7XG52YXIgJGZvckVhY2ggPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvYXJyYXktaXRlcmF0aW9uJykuZm9yRWFjaDtcbnZhciBzbG9wcHlBcnJheU1ldGhvZCA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9zbG9wcHktYXJyYXktbWV0aG9kJyk7XG5cbi8vIGBBcnJheS5wcm90b3R5cGUuZm9yRWFjaGAgbWV0aG9kIGltcGxlbWVudGF0aW9uXG4vLyBodHRwczovL3RjMzkuZ2l0aHViLmlvL2VjbWEyNjIvI3NlYy1hcnJheS5wcm90b3R5cGUuZm9yZWFjaFxubW9kdWxlLmV4cG9ydHMgPSBzbG9wcHlBcnJheU1ldGhvZCgnZm9yRWFjaCcpID8gZnVuY3Rpb24gZm9yRWFjaChjYWxsYmFja2ZuIC8qICwgdGhpc0FyZyAqLykge1xuICByZXR1cm4gJGZvckVhY2godGhpcywgY2FsbGJhY2tmbiwgYXJndW1lbnRzLmxlbmd0aCA+IDEgPyBhcmd1bWVudHNbMV0gOiB1bmRlZmluZWQpO1xufSA6IFtdLmZvckVhY2g7XG4iLCIndXNlIHN0cmljdCc7XG52YXIgYmluZCA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9iaW5kLWNvbnRleHQnKTtcbnZhciB0b09iamVjdCA9IHJlcXVpcmUoJy4uL2ludGVybmFscy90by1vYmplY3QnKTtcbnZhciBjYWxsV2l0aFNhZmVJdGVyYXRpb25DbG9zaW5nID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL2NhbGwtd2l0aC1zYWZlLWl0ZXJhdGlvbi1jbG9zaW5nJyk7XG52YXIgaXNBcnJheUl0ZXJhdG9yTWV0aG9kID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL2lzLWFycmF5LWl0ZXJhdG9yLW1ldGhvZCcpO1xudmFyIHRvTGVuZ3RoID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL3RvLWxlbmd0aCcpO1xudmFyIGNyZWF0ZVByb3BlcnR5ID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL2NyZWF0ZS1wcm9wZXJ0eScpO1xudmFyIGdldEl0ZXJhdG9yTWV0aG9kID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL2dldC1pdGVyYXRvci1tZXRob2QnKTtcblxuLy8gYEFycmF5LmZyb21gIG1ldGhvZCBpbXBsZW1lbnRhdGlvblxuLy8gaHR0cHM6Ly90YzM5LmdpdGh1Yi5pby9lY21hMjYyLyNzZWMtYXJyYXkuZnJvbVxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiBmcm9tKGFycmF5TGlrZSAvKiAsIG1hcGZuID0gdW5kZWZpbmVkLCB0aGlzQXJnID0gdW5kZWZpbmVkICovKSB7XG4gIHZhciBPID0gdG9PYmplY3QoYXJyYXlMaWtlKTtcbiAgdmFyIEMgPSB0eXBlb2YgdGhpcyA9PSAnZnVuY3Rpb24nID8gdGhpcyA6IEFycmF5O1xuICB2YXIgYXJndW1lbnRzTGVuZ3RoID0gYXJndW1lbnRzLmxlbmd0aDtcbiAgdmFyIG1hcGZuID0gYXJndW1lbnRzTGVuZ3RoID4gMSA/IGFyZ3VtZW50c1sxXSA6IHVuZGVmaW5lZDtcbiAgdmFyIG1hcHBpbmcgPSBtYXBmbiAhPT0gdW5kZWZpbmVkO1xuICB2YXIgaW5kZXggPSAwO1xuICB2YXIgaXRlcmF0b3JNZXRob2QgPSBnZXRJdGVyYXRvck1ldGhvZChPKTtcbiAgdmFyIGxlbmd0aCwgcmVzdWx0LCBzdGVwLCBpdGVyYXRvciwgbmV4dDtcbiAgaWYgKG1hcHBpbmcpIG1hcGZuID0gYmluZChtYXBmbiwgYXJndW1lbnRzTGVuZ3RoID4gMiA/IGFyZ3VtZW50c1syXSA6IHVuZGVmaW5lZCwgMik7XG4gIC8vIGlmIHRoZSB0YXJnZXQgaXMgbm90IGl0ZXJhYmxlIG9yIGl0J3MgYW4gYXJyYXkgd2l0aCB0aGUgZGVmYXVsdCBpdGVyYXRvciAtIHVzZSBhIHNpbXBsZSBjYXNlXG4gIGlmIChpdGVyYXRvck1ldGhvZCAhPSB1bmRlZmluZWQgJiYgIShDID09IEFycmF5ICYmIGlzQXJyYXlJdGVyYXRvck1ldGhvZChpdGVyYXRvck1ldGhvZCkpKSB7XG4gICAgaXRlcmF0b3IgPSBpdGVyYXRvck1ldGhvZC5jYWxsKE8pO1xuICAgIG5leHQgPSBpdGVyYXRvci5uZXh0O1xuICAgIHJlc3VsdCA9IG5ldyBDKCk7XG4gICAgZm9yICg7IShzdGVwID0gbmV4dC5jYWxsKGl0ZXJhdG9yKSkuZG9uZTsgaW5kZXgrKykge1xuICAgICAgY3JlYXRlUHJvcGVydHkocmVzdWx0LCBpbmRleCwgbWFwcGluZ1xuICAgICAgICA/IGNhbGxXaXRoU2FmZUl0ZXJhdGlvbkNsb3NpbmcoaXRlcmF0b3IsIG1hcGZuLCBbc3RlcC52YWx1ZSwgaW5kZXhdLCB0cnVlKVxuICAgICAgICA6IHN0ZXAudmFsdWVcbiAgICAgICk7XG4gICAgfVxuICB9IGVsc2Uge1xuICAgIGxlbmd0aCA9IHRvTGVuZ3RoKE8ubGVuZ3RoKTtcbiAgICByZXN1bHQgPSBuZXcgQyhsZW5ndGgpO1xuICAgIGZvciAoO2xlbmd0aCA+IGluZGV4OyBpbmRleCsrKSB7XG4gICAgICBjcmVhdGVQcm9wZXJ0eShyZXN1bHQsIGluZGV4LCBtYXBwaW5nID8gbWFwZm4oT1tpbmRleF0sIGluZGV4KSA6IE9baW5kZXhdKTtcbiAgICB9XG4gIH1cbiAgcmVzdWx0Lmxlbmd0aCA9IGluZGV4O1xuICByZXR1cm4gcmVzdWx0O1xufTtcbiIsInZhciB0b0luZGV4ZWRPYmplY3QgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvdG8taW5kZXhlZC1vYmplY3QnKTtcbnZhciB0b0xlbmd0aCA9IHJlcXVpcmUoJy4uL2ludGVybmFscy90by1sZW5ndGgnKTtcbnZhciB0b0Fic29sdXRlSW5kZXggPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvdG8tYWJzb2x1dGUtaW5kZXgnKTtcblxuLy8gYEFycmF5LnByb3RvdHlwZS57IGluZGV4T2YsIGluY2x1ZGVzIH1gIG1ldGhvZHMgaW1wbGVtZW50YXRpb25cbnZhciBjcmVhdGVNZXRob2QgPSBmdW5jdGlvbiAoSVNfSU5DTFVERVMpIHtcbiAgcmV0dXJuIGZ1bmN0aW9uICgkdGhpcywgZWwsIGZyb21JbmRleCkge1xuICAgIHZhciBPID0gdG9JbmRleGVkT2JqZWN0KCR0aGlzKTtcbiAgICB2YXIgbGVuZ3RoID0gdG9MZW5ndGgoTy5sZW5ndGgpO1xuICAgIHZhciBpbmRleCA9IHRvQWJzb2x1dGVJbmRleChmcm9tSW5kZXgsIGxlbmd0aCk7XG4gICAgdmFyIHZhbHVlO1xuICAgIC8vIEFycmF5I2luY2x1ZGVzIHVzZXMgU2FtZVZhbHVlWmVybyBlcXVhbGl0eSBhbGdvcml0aG1cbiAgICAvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgbm8tc2VsZi1jb21wYXJlXG4gICAgaWYgKElTX0lOQ0xVREVTICYmIGVsICE9IGVsKSB3aGlsZSAobGVuZ3RoID4gaW5kZXgpIHtcbiAgICAgIHZhbHVlID0gT1tpbmRleCsrXTtcbiAgICAgIC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBuby1zZWxmLWNvbXBhcmVcbiAgICAgIGlmICh2YWx1ZSAhPSB2YWx1ZSkgcmV0dXJuIHRydWU7XG4gICAgLy8gQXJyYXkjaW5kZXhPZiBpZ25vcmVzIGhvbGVzLCBBcnJheSNpbmNsdWRlcyAtIG5vdFxuICAgIH0gZWxzZSBmb3IgKDtsZW5ndGggPiBpbmRleDsgaW5kZXgrKykge1xuICAgICAgaWYgKChJU19JTkNMVURFUyB8fCBpbmRleCBpbiBPKSAmJiBPW2luZGV4XSA9PT0gZWwpIHJldHVybiBJU19JTkNMVURFUyB8fCBpbmRleCB8fCAwO1xuICAgIH0gcmV0dXJuICFJU19JTkNMVURFUyAmJiAtMTtcbiAgfTtcbn07XG5cbm1vZHVsZS5leHBvcnRzID0ge1xuICAvLyBgQXJyYXkucHJvdG90eXBlLmluY2x1ZGVzYCBtZXRob2RcbiAgLy8gaHR0cHM6Ly90YzM5LmdpdGh1Yi5pby9lY21hMjYyLyNzZWMtYXJyYXkucHJvdG90eXBlLmluY2x1ZGVzXG4gIGluY2x1ZGVzOiBjcmVhdGVNZXRob2QodHJ1ZSksXG4gIC8vIGBBcnJheS5wcm90b3R5cGUuaW5kZXhPZmAgbWV0aG9kXG4gIC8vIGh0dHBzOi8vdGMzOS5naXRodWIuaW8vZWNtYTI2Mi8jc2VjLWFycmF5LnByb3RvdHlwZS5pbmRleG9mXG4gIGluZGV4T2Y6IGNyZWF0ZU1ldGhvZChmYWxzZSlcbn07XG4iLCJ2YXIgYmluZCA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9iaW5kLWNvbnRleHQnKTtcbnZhciBJbmRleGVkT2JqZWN0ID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL2luZGV4ZWQtb2JqZWN0Jyk7XG52YXIgdG9PYmplY3QgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvdG8tb2JqZWN0Jyk7XG52YXIgdG9MZW5ndGggPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvdG8tbGVuZ3RoJyk7XG52YXIgYXJyYXlTcGVjaWVzQ3JlYXRlID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL2FycmF5LXNwZWNpZXMtY3JlYXRlJyk7XG5cbnZhciBwdXNoID0gW10ucHVzaDtcblxuLy8gYEFycmF5LnByb3RvdHlwZS57IGZvckVhY2gsIG1hcCwgZmlsdGVyLCBzb21lLCBldmVyeSwgZmluZCwgZmluZEluZGV4IH1gIG1ldGhvZHMgaW1wbGVtZW50YXRpb25cbnZhciBjcmVhdGVNZXRob2QgPSBmdW5jdGlvbiAoVFlQRSkge1xuICB2YXIgSVNfTUFQID0gVFlQRSA9PSAxO1xuICB2YXIgSVNfRklMVEVSID0gVFlQRSA9PSAyO1xuICB2YXIgSVNfU09NRSA9IFRZUEUgPT0gMztcbiAgdmFyIElTX0VWRVJZID0gVFlQRSA9PSA0O1xuICB2YXIgSVNfRklORF9JTkRFWCA9IFRZUEUgPT0gNjtcbiAgdmFyIE5PX0hPTEVTID0gVFlQRSA9PSA1IHx8IElTX0ZJTkRfSU5ERVg7XG4gIHJldHVybiBmdW5jdGlvbiAoJHRoaXMsIGNhbGxiYWNrZm4sIHRoYXQsIHNwZWNpZmljQ3JlYXRlKSB7XG4gICAgdmFyIE8gPSB0b09iamVjdCgkdGhpcyk7XG4gICAgdmFyIHNlbGYgPSBJbmRleGVkT2JqZWN0KE8pO1xuICAgIHZhciBib3VuZEZ1bmN0aW9uID0gYmluZChjYWxsYmFja2ZuLCB0aGF0LCAzKTtcbiAgICB2YXIgbGVuZ3RoID0gdG9MZW5ndGgoc2VsZi5sZW5ndGgpO1xuICAgIHZhciBpbmRleCA9IDA7XG4gICAgdmFyIGNyZWF0ZSA9IHNwZWNpZmljQ3JlYXRlIHx8IGFycmF5U3BlY2llc0NyZWF0ZTtcbiAgICB2YXIgdGFyZ2V0ID0gSVNfTUFQID8gY3JlYXRlKCR0aGlzLCBsZW5ndGgpIDogSVNfRklMVEVSID8gY3JlYXRlKCR0aGlzLCAwKSA6IHVuZGVmaW5lZDtcbiAgICB2YXIgdmFsdWUsIHJlc3VsdDtcbiAgICBmb3IgKDtsZW5ndGggPiBpbmRleDsgaW5kZXgrKykgaWYgKE5PX0hPTEVTIHx8IGluZGV4IGluIHNlbGYpIHtcbiAgICAgIHZhbHVlID0gc2VsZltpbmRleF07XG4gICAgICByZXN1bHQgPSBib3VuZEZ1bmN0aW9uKHZhbHVlLCBpbmRleCwgTyk7XG4gICAgICBpZiAoVFlQRSkge1xuICAgICAgICBpZiAoSVNfTUFQKSB0YXJnZXRbaW5kZXhdID0gcmVzdWx0OyAvLyBtYXBcbiAgICAgICAgZWxzZSBpZiAocmVzdWx0KSBzd2l0Y2ggKFRZUEUpIHtcbiAgICAgICAgICBjYXNlIDM6IHJldHVybiB0cnVlOyAgICAgICAgICAgICAgLy8gc29tZVxuICAgICAgICAgIGNhc2UgNTogcmV0dXJuIHZhbHVlOyAgICAgICAgICAgICAvLyBmaW5kXG4gICAgICAgICAgY2FzZSA2OiByZXR1cm4gaW5kZXg7ICAgICAgICAgICAgIC8vIGZpbmRJbmRleFxuICAgICAgICAgIGNhc2UgMjogcHVzaC5jYWxsKHRhcmdldCwgdmFsdWUpOyAvLyBmaWx0ZXJcbiAgICAgICAgfSBlbHNlIGlmIChJU19FVkVSWSkgcmV0dXJuIGZhbHNlOyAgLy8gZXZlcnlcbiAgICAgIH1cbiAgICB9XG4gICAgcmV0dXJuIElTX0ZJTkRfSU5ERVggPyAtMSA6IElTX1NPTUUgfHwgSVNfRVZFUlkgPyBJU19FVkVSWSA6IHRhcmdldDtcbiAgfTtcbn07XG5cbm1vZHVsZS5leHBvcnRzID0ge1xuICAvLyBgQXJyYXkucHJvdG90eXBlLmZvckVhY2hgIG1ldGhvZFxuICAvLyBodHRwczovL3RjMzkuZ2l0aHViLmlvL2VjbWEyNjIvI3NlYy1hcnJheS5wcm90b3R5cGUuZm9yZWFjaFxuICBmb3JFYWNoOiBjcmVhdGVNZXRob2QoMCksXG4gIC8vIGBBcnJheS5wcm90b3R5cGUubWFwYCBtZXRob2RcbiAgLy8gaHR0cHM6Ly90YzM5LmdpdGh1Yi5pby9lY21hMjYyLyNzZWMtYXJyYXkucHJvdG90eXBlLm1hcFxuICBtYXA6IGNyZWF0ZU1ldGhvZCgxKSxcbiAgLy8gYEFycmF5LnByb3RvdHlwZS5maWx0ZXJgIG1ldGhvZFxuICAvLyBodHRwczovL3RjMzkuZ2l0aHViLmlvL2VjbWEyNjIvI3NlYy1hcnJheS5wcm90b3R5cGUuZmlsdGVyXG4gIGZpbHRlcjogY3JlYXRlTWV0aG9kKDIpLFxuICAvLyBgQXJyYXkucHJvdG90eXBlLnNvbWVgIG1ldGhvZFxuICAvLyBodHRwczovL3RjMzkuZ2l0aHViLmlvL2VjbWEyNjIvI3NlYy1hcnJheS5wcm90b3R5cGUuc29tZVxuICBzb21lOiBjcmVhdGVNZXRob2QoMyksXG4gIC8vIGBBcnJheS5wcm90b3R5cGUuZXZlcnlgIG1ldGhvZFxuICAvLyBodHRwczovL3RjMzkuZ2l0aHViLmlvL2VjbWEyNjIvI3NlYy1hcnJheS5wcm90b3R5cGUuZXZlcnlcbiAgZXZlcnk6IGNyZWF0ZU1ldGhvZCg0KSxcbiAgLy8gYEFycmF5LnByb3RvdHlwZS5maW5kYCBtZXRob2RcbiAgLy8gaHR0cHM6Ly90YzM5LmdpdGh1Yi5pby9lY21hMjYyLyNzZWMtYXJyYXkucHJvdG90eXBlLmZpbmRcbiAgZmluZDogY3JlYXRlTWV0aG9kKDUpLFxuICAvLyBgQXJyYXkucHJvdG90eXBlLmZpbmRJbmRleGAgbWV0aG9kXG4gIC8vIGh0dHBzOi8vdGMzOS5naXRodWIuaW8vZWNtYTI2Mi8jc2VjLWFycmF5LnByb3RvdHlwZS5maW5kSW5kZXhcbiAgZmluZEluZGV4OiBjcmVhdGVNZXRob2QoNilcbn07XG4iLCIndXNlIHN0cmljdCc7XG52YXIgdG9JbmRleGVkT2JqZWN0ID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL3RvLWluZGV4ZWQtb2JqZWN0Jyk7XG52YXIgdG9JbnRlZ2VyID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL3RvLWludGVnZXInKTtcbnZhciB0b0xlbmd0aCA9IHJlcXVpcmUoJy4uL2ludGVybmFscy90by1sZW5ndGgnKTtcbnZhciBzbG9wcHlBcnJheU1ldGhvZCA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9zbG9wcHktYXJyYXktbWV0aG9kJyk7XG5cbnZhciBtaW4gPSBNYXRoLm1pbjtcbnZhciBuYXRpdmVMYXN0SW5kZXhPZiA9IFtdLmxhc3RJbmRleE9mO1xudmFyIE5FR0FUSVZFX1pFUk8gPSAhIW5hdGl2ZUxhc3RJbmRleE9mICYmIDEgLyBbMV0ubGFzdEluZGV4T2YoMSwgLTApIDwgMDtcbnZhciBTTE9QUFlfTUVUSE9EID0gc2xvcHB5QXJyYXlNZXRob2QoJ2xhc3RJbmRleE9mJyk7XG5cbi8vIGBBcnJheS5wcm90b3R5cGUubGFzdEluZGV4T2ZgIG1ldGhvZCBpbXBsZW1lbnRhdGlvblxuLy8gaHR0cHM6Ly90YzM5LmdpdGh1Yi5pby9lY21hMjYyLyNzZWMtYXJyYXkucHJvdG90eXBlLmxhc3RpbmRleG9mXG5tb2R1bGUuZXhwb3J0cyA9IChORUdBVElWRV9aRVJPIHx8IFNMT1BQWV9NRVRIT0QpID8gZnVuY3Rpb24gbGFzdEluZGV4T2Yoc2VhcmNoRWxlbWVudCAvKiAsIGZyb21JbmRleCA9IEBbKi0xXSAqLykge1xuICAvLyBjb252ZXJ0IC0wIHRvICswXG4gIGlmIChORUdBVElWRV9aRVJPKSByZXR1cm4gbmF0aXZlTGFzdEluZGV4T2YuYXBwbHkodGhpcywgYXJndW1lbnRzKSB8fCAwO1xuICB2YXIgTyA9IHRvSW5kZXhlZE9iamVjdCh0aGlzKTtcbiAgdmFyIGxlbmd0aCA9IHRvTGVuZ3RoKE8ubGVuZ3RoKTtcbiAgdmFyIGluZGV4ID0gbGVuZ3RoIC0gMTtcbiAgaWYgKGFyZ3VtZW50cy5sZW5ndGggPiAxKSBpbmRleCA9IG1pbihpbmRleCwgdG9JbnRlZ2VyKGFyZ3VtZW50c1sxXSkpO1xuICBpZiAoaW5kZXggPCAwKSBpbmRleCA9IGxlbmd0aCArIGluZGV4O1xuICBmb3IgKDtpbmRleCA+PSAwOyBpbmRleC0tKSBpZiAoaW5kZXggaW4gTyAmJiBPW2luZGV4XSA9PT0gc2VhcmNoRWxlbWVudCkgcmV0dXJuIGluZGV4IHx8IDA7XG4gIHJldHVybiAtMTtcbn0gOiBuYXRpdmVMYXN0SW5kZXhPZjtcbiIsInZhciBmYWlscyA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9mYWlscycpO1xudmFyIHdlbGxLbm93blN5bWJvbCA9IHJlcXVpcmUoJy4uL2ludGVybmFscy93ZWxsLWtub3duLXN5bWJvbCcpO1xudmFyIFY4X1ZFUlNJT04gPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvdjgtdmVyc2lvbicpO1xuXG52YXIgU1BFQ0lFUyA9IHdlbGxLbm93blN5bWJvbCgnc3BlY2llcycpO1xuXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIChNRVRIT0RfTkFNRSkge1xuICAvLyBXZSBjYW4ndCB1c2UgdGhpcyBmZWF0dXJlIGRldGVjdGlvbiBpbiBWOCBzaW5jZSBpdCBjYXVzZXNcbiAgLy8gZGVvcHRpbWl6YXRpb24gYW5kIHNlcmlvdXMgcGVyZm9ybWFuY2UgZGVncmFkYXRpb25cbiAgLy8gaHR0cHM6Ly9naXRodWIuY29tL3psb2lyb2NrL2NvcmUtanMvaXNzdWVzLzY3N1xuICByZXR1cm4gVjhfVkVSU0lPTiA+PSA1MSB8fCAhZmFpbHMoZnVuY3Rpb24gKCkge1xuICAgIHZhciBhcnJheSA9IFtdO1xuICAgIHZhciBjb25zdHJ1Y3RvciA9IGFycmF5LmNvbnN0cnVjdG9yID0ge307XG4gICAgY29uc3RydWN0b3JbU1BFQ0lFU10gPSBmdW5jdGlvbiAoKSB7XG4gICAgICByZXR1cm4geyBmb286IDEgfTtcbiAgICB9O1xuICAgIHJldHVybiBhcnJheVtNRVRIT0RfTkFNRV0oQm9vbGVhbikuZm9vICE9PSAxO1xuICB9KTtcbn07XG4iLCJ2YXIgYUZ1bmN0aW9uID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL2EtZnVuY3Rpb24nKTtcbnZhciB0b09iamVjdCA9IHJlcXVpcmUoJy4uL2ludGVybmFscy90by1vYmplY3QnKTtcbnZhciBJbmRleGVkT2JqZWN0ID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL2luZGV4ZWQtb2JqZWN0Jyk7XG52YXIgdG9MZW5ndGggPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvdG8tbGVuZ3RoJyk7XG5cbi8vIGBBcnJheS5wcm90b3R5cGUueyByZWR1Y2UsIHJlZHVjZVJpZ2h0IH1gIG1ldGhvZHMgaW1wbGVtZW50YXRpb25cbnZhciBjcmVhdGVNZXRob2QgPSBmdW5jdGlvbiAoSVNfUklHSFQpIHtcbiAgcmV0dXJuIGZ1bmN0aW9uICh0aGF0LCBjYWxsYmFja2ZuLCBhcmd1bWVudHNMZW5ndGgsIG1lbW8pIHtcbiAgICBhRnVuY3Rpb24oY2FsbGJhY2tmbik7XG4gICAgdmFyIE8gPSB0b09iamVjdCh0aGF0KTtcbiAgICB2YXIgc2VsZiA9IEluZGV4ZWRPYmplY3QoTyk7XG4gICAgdmFyIGxlbmd0aCA9IHRvTGVuZ3RoKE8ubGVuZ3RoKTtcbiAgICB2YXIgaW5kZXggPSBJU19SSUdIVCA/IGxlbmd0aCAtIDEgOiAwO1xuICAgIHZhciBpID0gSVNfUklHSFQgPyAtMSA6IDE7XG4gICAgaWYgKGFyZ3VtZW50c0xlbmd0aCA8IDIpIHdoaWxlICh0cnVlKSB7XG4gICAgICBpZiAoaW5kZXggaW4gc2VsZikge1xuICAgICAgICBtZW1vID0gc2VsZltpbmRleF07XG4gICAgICAgIGluZGV4ICs9IGk7XG4gICAgICAgIGJyZWFrO1xuICAgICAgfVxuICAgICAgaW5kZXggKz0gaTtcbiAgICAgIGlmIChJU19SSUdIVCA/IGluZGV4IDwgMCA6IGxlbmd0aCA8PSBpbmRleCkge1xuICAgICAgICB0aHJvdyBUeXBlRXJyb3IoJ1JlZHVjZSBvZiBlbXB0eSBhcnJheSB3aXRoIG5vIGluaXRpYWwgdmFsdWUnKTtcbiAgICAgIH1cbiAgICB9XG4gICAgZm9yICg7SVNfUklHSFQgPyBpbmRleCA+PSAwIDogbGVuZ3RoID4gaW5kZXg7IGluZGV4ICs9IGkpIGlmIChpbmRleCBpbiBzZWxmKSB7XG4gICAgICBtZW1vID0gY2FsbGJhY2tmbihtZW1vLCBzZWxmW2luZGV4XSwgaW5kZXgsIE8pO1xuICAgIH1cbiAgICByZXR1cm4gbWVtbztcbiAgfTtcbn07XG5cbm1vZHVsZS5leHBvcnRzID0ge1xuICAvLyBgQXJyYXkucHJvdG90eXBlLnJlZHVjZWAgbWV0aG9kXG4gIC8vIGh0dHBzOi8vdGMzOS5naXRodWIuaW8vZWNtYTI2Mi8jc2VjLWFycmF5LnByb3RvdHlwZS5yZWR1Y2VcbiAgbGVmdDogY3JlYXRlTWV0aG9kKGZhbHNlKSxcbiAgLy8gYEFycmF5LnByb3RvdHlwZS5yZWR1Y2VSaWdodGAgbWV0aG9kXG4gIC8vIGh0dHBzOi8vdGMzOS5naXRodWIuaW8vZWNtYTI2Mi8jc2VjLWFycmF5LnByb3RvdHlwZS5yZWR1Y2VyaWdodFxuICByaWdodDogY3JlYXRlTWV0aG9kKHRydWUpXG59O1xuIiwidmFyIGlzT2JqZWN0ID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL2lzLW9iamVjdCcpO1xudmFyIGlzQXJyYXkgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvaXMtYXJyYXknKTtcbnZhciB3ZWxsS25vd25TeW1ib2wgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvd2VsbC1rbm93bi1zeW1ib2wnKTtcblxudmFyIFNQRUNJRVMgPSB3ZWxsS25vd25TeW1ib2woJ3NwZWNpZXMnKTtcblxuLy8gYEFycmF5U3BlY2llc0NyZWF0ZWAgYWJzdHJhY3Qgb3BlcmF0aW9uXG4vLyBodHRwczovL3RjMzkuZ2l0aHViLmlvL2VjbWEyNjIvI3NlYy1hcnJheXNwZWNpZXNjcmVhdGVcbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gKG9yaWdpbmFsQXJyYXksIGxlbmd0aCkge1xuICB2YXIgQztcbiAgaWYgKGlzQXJyYXkob3JpZ2luYWxBcnJheSkpIHtcbiAgICBDID0gb3JpZ2luYWxBcnJheS5jb25zdHJ1Y3RvcjtcbiAgICAvLyBjcm9zcy1yZWFsbSBmYWxsYmFja1xuICAgIGlmICh0eXBlb2YgQyA9PSAnZnVuY3Rpb24nICYmIChDID09PSBBcnJheSB8fCBpc0FycmF5KEMucHJvdG90eXBlKSkpIEMgPSB1bmRlZmluZWQ7XG4gICAgZWxzZSBpZiAoaXNPYmplY3QoQykpIHtcbiAgICAgIEMgPSBDW1NQRUNJRVNdO1xuICAgICAgaWYgKEMgPT09IG51bGwpIEMgPSB1bmRlZmluZWQ7XG4gICAgfVxuICB9IHJldHVybiBuZXcgKEMgPT09IHVuZGVmaW5lZCA/IEFycmF5IDogQykobGVuZ3RoID09PSAwID8gMCA6IGxlbmd0aCk7XG59O1xuIiwidmFyIGFGdW5jdGlvbiA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9hLWZ1bmN0aW9uJyk7XG5cbi8vIG9wdGlvbmFsIC8gc2ltcGxlIGNvbnRleHQgYmluZGluZ1xubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiAoZm4sIHRoYXQsIGxlbmd0aCkge1xuICBhRnVuY3Rpb24oZm4pO1xuICBpZiAodGhhdCA9PT0gdW5kZWZpbmVkKSByZXR1cm4gZm47XG4gIHN3aXRjaCAobGVuZ3RoKSB7XG4gICAgY2FzZSAwOiByZXR1cm4gZnVuY3Rpb24gKCkge1xuICAgICAgcmV0dXJuIGZuLmNhbGwodGhhdCk7XG4gICAgfTtcbiAgICBjYXNlIDE6IHJldHVybiBmdW5jdGlvbiAoYSkge1xuICAgICAgcmV0dXJuIGZuLmNhbGwodGhhdCwgYSk7XG4gICAgfTtcbiAgICBjYXNlIDI6IHJldHVybiBmdW5jdGlvbiAoYSwgYikge1xuICAgICAgcmV0dXJuIGZuLmNhbGwodGhhdCwgYSwgYik7XG4gICAgfTtcbiAgICBjYXNlIDM6IHJldHVybiBmdW5jdGlvbiAoYSwgYiwgYykge1xuICAgICAgcmV0dXJuIGZuLmNhbGwodGhhdCwgYSwgYiwgYyk7XG4gICAgfTtcbiAgfVxuICByZXR1cm4gZnVuY3Rpb24gKC8qIC4uLmFyZ3MgKi8pIHtcbiAgICByZXR1cm4gZm4uYXBwbHkodGhhdCwgYXJndW1lbnRzKTtcbiAgfTtcbn07XG4iLCJ2YXIgYW5PYmplY3QgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvYW4tb2JqZWN0Jyk7XG5cbi8vIGNhbGwgc29tZXRoaW5nIG9uIGl0ZXJhdG9yIHN0ZXAgd2l0aCBzYWZlIGNsb3Npbmcgb24gZXJyb3Jcbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gKGl0ZXJhdG9yLCBmbiwgdmFsdWUsIEVOVFJJRVMpIHtcbiAgdHJ5IHtcbiAgICByZXR1cm4gRU5UUklFUyA/IGZuKGFuT2JqZWN0KHZhbHVlKVswXSwgdmFsdWVbMV0pIDogZm4odmFsdWUpO1xuICAvLyA3LjQuNiBJdGVyYXRvckNsb3NlKGl0ZXJhdG9yLCBjb21wbGV0aW9uKVxuICB9IGNhdGNoIChlcnJvcikge1xuICAgIHZhciByZXR1cm5NZXRob2QgPSBpdGVyYXRvclsncmV0dXJuJ107XG4gICAgaWYgKHJldHVybk1ldGhvZCAhPT0gdW5kZWZpbmVkKSBhbk9iamVjdChyZXR1cm5NZXRob2QuY2FsbChpdGVyYXRvcikpO1xuICAgIHRocm93IGVycm9yO1xuICB9XG59O1xuIiwidmFyIHdlbGxLbm93blN5bWJvbCA9IHJlcXVpcmUoJy4uL2ludGVybmFscy93ZWxsLWtub3duLXN5bWJvbCcpO1xuXG52YXIgSVRFUkFUT1IgPSB3ZWxsS25vd25TeW1ib2woJ2l0ZXJhdG9yJyk7XG52YXIgU0FGRV9DTE9TSU5HID0gZmFsc2U7XG5cbnRyeSB7XG4gIHZhciBjYWxsZWQgPSAwO1xuICB2YXIgaXRlcmF0b3JXaXRoUmV0dXJuID0ge1xuICAgIG5leHQ6IGZ1bmN0aW9uICgpIHtcbiAgICAgIHJldHVybiB7IGRvbmU6ICEhY2FsbGVkKysgfTtcbiAgICB9LFxuICAgICdyZXR1cm4nOiBmdW5jdGlvbiAoKSB7XG4gICAgICBTQUZFX0NMT1NJTkcgPSB0cnVlO1xuICAgIH1cbiAgfTtcbiAgaXRlcmF0b3JXaXRoUmV0dXJuW0lURVJBVE9SXSA9IGZ1bmN0aW9uICgpIHtcbiAgICByZXR1cm4gdGhpcztcbiAgfTtcbiAgLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIG5vLXRocm93LWxpdGVyYWxcbiAgQXJyYXkuZnJvbShpdGVyYXRvcldpdGhSZXR1cm4sIGZ1bmN0aW9uICgpIHsgdGhyb3cgMjsgfSk7XG59IGNhdGNoIChlcnJvcikgeyAvKiBlbXB0eSAqLyB9XG5cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gKGV4ZWMsIFNLSVBfQ0xPU0lORykge1xuICBpZiAoIVNLSVBfQ0xPU0lORyAmJiAhU0FGRV9DTE9TSU5HKSByZXR1cm4gZmFsc2U7XG4gIHZhciBJVEVSQVRJT05fU1VQUE9SVCA9IGZhbHNlO1xuICB0cnkge1xuICAgIHZhciBvYmplY3QgPSB7fTtcbiAgICBvYmplY3RbSVRFUkFUT1JdID0gZnVuY3Rpb24gKCkge1xuICAgICAgcmV0dXJuIHtcbiAgICAgICAgbmV4dDogZnVuY3Rpb24gKCkge1xuICAgICAgICAgIHJldHVybiB7IGRvbmU6IElURVJBVElPTl9TVVBQT1JUID0gdHJ1ZSB9O1xuICAgICAgICB9XG4gICAgICB9O1xuICAgIH07XG4gICAgZXhlYyhvYmplY3QpO1xuICB9IGNhdGNoIChlcnJvcikgeyAvKiBlbXB0eSAqLyB9XG4gIHJldHVybiBJVEVSQVRJT05fU1VQUE9SVDtcbn07XG4iLCJ2YXIgdG9TdHJpbmcgPSB7fS50b1N0cmluZztcblxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiAoaXQpIHtcbiAgcmV0dXJuIHRvU3RyaW5nLmNhbGwoaXQpLnNsaWNlKDgsIC0xKTtcbn07XG4iLCJ2YXIgVE9fU1RSSU5HX1RBR19TVVBQT1JUID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL3RvLXN0cmluZy10YWctc3VwcG9ydCcpO1xudmFyIGNsYXNzb2ZSYXcgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvY2xhc3NvZi1yYXcnKTtcbnZhciB3ZWxsS25vd25TeW1ib2wgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvd2VsbC1rbm93bi1zeW1ib2wnKTtcblxudmFyIFRPX1NUUklOR19UQUcgPSB3ZWxsS25vd25TeW1ib2woJ3RvU3RyaW5nVGFnJyk7XG4vLyBFUzMgd3JvbmcgaGVyZVxudmFyIENPUlJFQ1RfQVJHVU1FTlRTID0gY2xhc3NvZlJhdyhmdW5jdGlvbiAoKSB7IHJldHVybiBhcmd1bWVudHM7IH0oKSkgPT0gJ0FyZ3VtZW50cyc7XG5cbi8vIGZhbGxiYWNrIGZvciBJRTExIFNjcmlwdCBBY2Nlc3MgRGVuaWVkIGVycm9yXG52YXIgdHJ5R2V0ID0gZnVuY3Rpb24gKGl0LCBrZXkpIHtcbiAgdHJ5IHtcbiAgICByZXR1cm4gaXRba2V5XTtcbiAgfSBjYXRjaCAoZXJyb3IpIHsgLyogZW1wdHkgKi8gfVxufTtcblxuLy8gZ2V0dGluZyB0YWcgZnJvbSBFUzYrIGBPYmplY3QucHJvdG90eXBlLnRvU3RyaW5nYFxubW9kdWxlLmV4cG9ydHMgPSBUT19TVFJJTkdfVEFHX1NVUFBPUlQgPyBjbGFzc29mUmF3IDogZnVuY3Rpb24gKGl0KSB7XG4gIHZhciBPLCB0YWcsIHJlc3VsdDtcbiAgcmV0dXJuIGl0ID09PSB1bmRlZmluZWQgPyAnVW5kZWZpbmVkJyA6IGl0ID09PSBudWxsID8gJ051bGwnXG4gICAgLy8gQEB0b1N0cmluZ1RhZyBjYXNlXG4gICAgOiB0eXBlb2YgKHRhZyA9IHRyeUdldChPID0gT2JqZWN0KGl0KSwgVE9fU1RSSU5HX1RBRykpID09ICdzdHJpbmcnID8gdGFnXG4gICAgLy8gYnVpbHRpblRhZyBjYXNlXG4gICAgOiBDT1JSRUNUX0FSR1VNRU5UUyA/IGNsYXNzb2ZSYXcoTylcbiAgICAvLyBFUzMgYXJndW1lbnRzIGZhbGxiYWNrXG4gICAgOiAocmVzdWx0ID0gY2xhc3NvZlJhdyhPKSkgPT0gJ09iamVjdCcgJiYgdHlwZW9mIE8uY2FsbGVlID09ICdmdW5jdGlvbicgPyAnQXJndW1lbnRzJyA6IHJlc3VsdDtcbn07XG4iLCJ2YXIgaGFzID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL2hhcycpO1xudmFyIG93bktleXMgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvb3duLWtleXMnKTtcbnZhciBnZXRPd25Qcm9wZXJ0eURlc2NyaXB0b3JNb2R1bGUgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvb2JqZWN0LWdldC1vd24tcHJvcGVydHktZGVzY3JpcHRvcicpO1xudmFyIGRlZmluZVByb3BlcnR5TW9kdWxlID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL29iamVjdC1kZWZpbmUtcHJvcGVydHknKTtcblxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiAodGFyZ2V0LCBzb3VyY2UpIHtcbiAgdmFyIGtleXMgPSBvd25LZXlzKHNvdXJjZSk7XG4gIHZhciBkZWZpbmVQcm9wZXJ0eSA9IGRlZmluZVByb3BlcnR5TW9kdWxlLmY7XG4gIHZhciBnZXRPd25Qcm9wZXJ0eURlc2NyaXB0b3IgPSBnZXRPd25Qcm9wZXJ0eURlc2NyaXB0b3JNb2R1bGUuZjtcbiAgZm9yICh2YXIgaSA9IDA7IGkgPCBrZXlzLmxlbmd0aDsgaSsrKSB7XG4gICAgdmFyIGtleSA9IGtleXNbaV07XG4gICAgaWYgKCFoYXModGFyZ2V0LCBrZXkpKSBkZWZpbmVQcm9wZXJ0eSh0YXJnZXQsIGtleSwgZ2V0T3duUHJvcGVydHlEZXNjcmlwdG9yKHNvdXJjZSwga2V5KSk7XG4gIH1cbn07XG4iLCJ2YXIgZmFpbHMgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvZmFpbHMnKTtcblxubW9kdWxlLmV4cG9ydHMgPSAhZmFpbHMoZnVuY3Rpb24gKCkge1xuICBmdW5jdGlvbiBGKCkgeyAvKiBlbXB0eSAqLyB9XG4gIEYucHJvdG90eXBlLmNvbnN0cnVjdG9yID0gbnVsbDtcbiAgcmV0dXJuIE9iamVjdC5nZXRQcm90b3R5cGVPZihuZXcgRigpKSAhPT0gRi5wcm90b3R5cGU7XG59KTtcbiIsIid1c2Ugc3RyaWN0JztcbnZhciBJdGVyYXRvclByb3RvdHlwZSA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9pdGVyYXRvcnMtY29yZScpLkl0ZXJhdG9yUHJvdG90eXBlO1xudmFyIGNyZWF0ZSA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9vYmplY3QtY3JlYXRlJyk7XG52YXIgY3JlYXRlUHJvcGVydHlEZXNjcmlwdG9yID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL2NyZWF0ZS1wcm9wZXJ0eS1kZXNjcmlwdG9yJyk7XG52YXIgc2V0VG9TdHJpbmdUYWcgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvc2V0LXRvLXN0cmluZy10YWcnKTtcbnZhciBJdGVyYXRvcnMgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvaXRlcmF0b3JzJyk7XG5cbnZhciByZXR1cm5UaGlzID0gZnVuY3Rpb24gKCkgeyByZXR1cm4gdGhpczsgfTtcblxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiAoSXRlcmF0b3JDb25zdHJ1Y3RvciwgTkFNRSwgbmV4dCkge1xuICB2YXIgVE9fU1RSSU5HX1RBRyA9IE5BTUUgKyAnIEl0ZXJhdG9yJztcbiAgSXRlcmF0b3JDb25zdHJ1Y3Rvci5wcm90b3R5cGUgPSBjcmVhdGUoSXRlcmF0b3JQcm90b3R5cGUsIHsgbmV4dDogY3JlYXRlUHJvcGVydHlEZXNjcmlwdG9yKDEsIG5leHQpIH0pO1xuICBzZXRUb1N0cmluZ1RhZyhJdGVyYXRvckNvbnN0cnVjdG9yLCBUT19TVFJJTkdfVEFHLCBmYWxzZSwgdHJ1ZSk7XG4gIEl0ZXJhdG9yc1tUT19TVFJJTkdfVEFHXSA9IHJldHVyblRoaXM7XG4gIHJldHVybiBJdGVyYXRvckNvbnN0cnVjdG9yO1xufTtcbiIsInZhciBERVNDUklQVE9SUyA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9kZXNjcmlwdG9ycycpO1xudmFyIGRlZmluZVByb3BlcnR5TW9kdWxlID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL29iamVjdC1kZWZpbmUtcHJvcGVydHknKTtcbnZhciBjcmVhdGVQcm9wZXJ0eURlc2NyaXB0b3IgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvY3JlYXRlLXByb3BlcnR5LWRlc2NyaXB0b3InKTtcblxubW9kdWxlLmV4cG9ydHMgPSBERVNDUklQVE9SUyA/IGZ1bmN0aW9uIChvYmplY3QsIGtleSwgdmFsdWUpIHtcbiAgcmV0dXJuIGRlZmluZVByb3BlcnR5TW9kdWxlLmYob2JqZWN0LCBrZXksIGNyZWF0ZVByb3BlcnR5RGVzY3JpcHRvcigxLCB2YWx1ZSkpO1xufSA6IGZ1bmN0aW9uIChvYmplY3QsIGtleSwgdmFsdWUpIHtcbiAgb2JqZWN0W2tleV0gPSB2YWx1ZTtcbiAgcmV0dXJuIG9iamVjdDtcbn07XG4iLCJtb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIChiaXRtYXAsIHZhbHVlKSB7XG4gIHJldHVybiB7XG4gICAgZW51bWVyYWJsZTogIShiaXRtYXAgJiAxKSxcbiAgICBjb25maWd1cmFibGU6ICEoYml0bWFwICYgMiksXG4gICAgd3JpdGFibGU6ICEoYml0bWFwICYgNCksXG4gICAgdmFsdWU6IHZhbHVlXG4gIH07XG59O1xuIiwiJ3VzZSBzdHJpY3QnO1xudmFyIHRvUHJpbWl0aXZlID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL3RvLXByaW1pdGl2ZScpO1xudmFyIGRlZmluZVByb3BlcnR5TW9kdWxlID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL29iamVjdC1kZWZpbmUtcHJvcGVydHknKTtcbnZhciBjcmVhdGVQcm9wZXJ0eURlc2NyaXB0b3IgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvY3JlYXRlLXByb3BlcnR5LWRlc2NyaXB0b3InKTtcblxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiAob2JqZWN0LCBrZXksIHZhbHVlKSB7XG4gIHZhciBwcm9wZXJ0eUtleSA9IHRvUHJpbWl0aXZlKGtleSk7XG4gIGlmIChwcm9wZXJ0eUtleSBpbiBvYmplY3QpIGRlZmluZVByb3BlcnR5TW9kdWxlLmYob2JqZWN0LCBwcm9wZXJ0eUtleSwgY3JlYXRlUHJvcGVydHlEZXNjcmlwdG9yKDAsIHZhbHVlKSk7XG4gIGVsc2Ugb2JqZWN0W3Byb3BlcnR5S2V5XSA9IHZhbHVlO1xufTtcbiIsIid1c2Ugc3RyaWN0JztcbnZhciAkID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL2V4cG9ydCcpO1xudmFyIGNyZWF0ZUl0ZXJhdG9yQ29uc3RydWN0b3IgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvY3JlYXRlLWl0ZXJhdG9yLWNvbnN0cnVjdG9yJyk7XG52YXIgZ2V0UHJvdG90eXBlT2YgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvb2JqZWN0LWdldC1wcm90b3R5cGUtb2YnKTtcbnZhciBzZXRQcm90b3R5cGVPZiA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9vYmplY3Qtc2V0LXByb3RvdHlwZS1vZicpO1xudmFyIHNldFRvU3RyaW5nVGFnID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL3NldC10by1zdHJpbmctdGFnJyk7XG52YXIgY3JlYXRlTm9uRW51bWVyYWJsZVByb3BlcnR5ID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL2NyZWF0ZS1ub24tZW51bWVyYWJsZS1wcm9wZXJ0eScpO1xudmFyIHJlZGVmaW5lID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL3JlZGVmaW5lJyk7XG52YXIgd2VsbEtub3duU3ltYm9sID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL3dlbGwta25vd24tc3ltYm9sJyk7XG52YXIgSVNfUFVSRSA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9pcy1wdXJlJyk7XG52YXIgSXRlcmF0b3JzID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL2l0ZXJhdG9ycycpO1xudmFyIEl0ZXJhdG9yc0NvcmUgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvaXRlcmF0b3JzLWNvcmUnKTtcblxudmFyIEl0ZXJhdG9yUHJvdG90eXBlID0gSXRlcmF0b3JzQ29yZS5JdGVyYXRvclByb3RvdHlwZTtcbnZhciBCVUdHWV9TQUZBUklfSVRFUkFUT1JTID0gSXRlcmF0b3JzQ29yZS5CVUdHWV9TQUZBUklfSVRFUkFUT1JTO1xudmFyIElURVJBVE9SID0gd2VsbEtub3duU3ltYm9sKCdpdGVyYXRvcicpO1xudmFyIEtFWVMgPSAna2V5cyc7XG52YXIgVkFMVUVTID0gJ3ZhbHVlcyc7XG52YXIgRU5UUklFUyA9ICdlbnRyaWVzJztcblxudmFyIHJldHVyblRoaXMgPSBmdW5jdGlvbiAoKSB7IHJldHVybiB0aGlzOyB9O1xuXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIChJdGVyYWJsZSwgTkFNRSwgSXRlcmF0b3JDb25zdHJ1Y3RvciwgbmV4dCwgREVGQVVMVCwgSVNfU0VULCBGT1JDRUQpIHtcbiAgY3JlYXRlSXRlcmF0b3JDb25zdHJ1Y3RvcihJdGVyYXRvckNvbnN0cnVjdG9yLCBOQU1FLCBuZXh0KTtcblxuICB2YXIgZ2V0SXRlcmF0aW9uTWV0aG9kID0gZnVuY3Rpb24gKEtJTkQpIHtcbiAgICBpZiAoS0lORCA9PT0gREVGQVVMVCAmJiBkZWZhdWx0SXRlcmF0b3IpIHJldHVybiBkZWZhdWx0SXRlcmF0b3I7XG4gICAgaWYgKCFCVUdHWV9TQUZBUklfSVRFUkFUT1JTICYmIEtJTkQgaW4gSXRlcmFibGVQcm90b3R5cGUpIHJldHVybiBJdGVyYWJsZVByb3RvdHlwZVtLSU5EXTtcbiAgICBzd2l0Y2ggKEtJTkQpIHtcbiAgICAgIGNhc2UgS0VZUzogcmV0dXJuIGZ1bmN0aW9uIGtleXMoKSB7IHJldHVybiBuZXcgSXRlcmF0b3JDb25zdHJ1Y3Rvcih0aGlzLCBLSU5EKTsgfTtcbiAgICAgIGNhc2UgVkFMVUVTOiByZXR1cm4gZnVuY3Rpb24gdmFsdWVzKCkgeyByZXR1cm4gbmV3IEl0ZXJhdG9yQ29uc3RydWN0b3IodGhpcywgS0lORCk7IH07XG4gICAgICBjYXNlIEVOVFJJRVM6IHJldHVybiBmdW5jdGlvbiBlbnRyaWVzKCkgeyByZXR1cm4gbmV3IEl0ZXJhdG9yQ29uc3RydWN0b3IodGhpcywgS0lORCk7IH07XG4gICAgfSByZXR1cm4gZnVuY3Rpb24gKCkgeyByZXR1cm4gbmV3IEl0ZXJhdG9yQ29uc3RydWN0b3IodGhpcyk7IH07XG4gIH07XG5cbiAgdmFyIFRPX1NUUklOR19UQUcgPSBOQU1FICsgJyBJdGVyYXRvcic7XG4gIHZhciBJTkNPUlJFQ1RfVkFMVUVTX05BTUUgPSBmYWxzZTtcbiAgdmFyIEl0ZXJhYmxlUHJvdG90eXBlID0gSXRlcmFibGUucHJvdG90eXBlO1xuICB2YXIgbmF0aXZlSXRlcmF0b3IgPSBJdGVyYWJsZVByb3RvdHlwZVtJVEVSQVRPUl1cbiAgICB8fCBJdGVyYWJsZVByb3RvdHlwZVsnQEBpdGVyYXRvciddXG4gICAgfHwgREVGQVVMVCAmJiBJdGVyYWJsZVByb3RvdHlwZVtERUZBVUxUXTtcbiAgdmFyIGRlZmF1bHRJdGVyYXRvciA9ICFCVUdHWV9TQUZBUklfSVRFUkFUT1JTICYmIG5hdGl2ZUl0ZXJhdG9yIHx8IGdldEl0ZXJhdGlvbk1ldGhvZChERUZBVUxUKTtcbiAgdmFyIGFueU5hdGl2ZUl0ZXJhdG9yID0gTkFNRSA9PSAnQXJyYXknID8gSXRlcmFibGVQcm90b3R5cGUuZW50cmllcyB8fCBuYXRpdmVJdGVyYXRvciA6IG5hdGl2ZUl0ZXJhdG9yO1xuICB2YXIgQ3VycmVudEl0ZXJhdG9yUHJvdG90eXBlLCBtZXRob2RzLCBLRVk7XG5cbiAgLy8gZml4IG5hdGl2ZVxuICBpZiAoYW55TmF0aXZlSXRlcmF0b3IpIHtcbiAgICBDdXJyZW50SXRlcmF0b3JQcm90b3R5cGUgPSBnZXRQcm90b3R5cGVPZihhbnlOYXRpdmVJdGVyYXRvci5jYWxsKG5ldyBJdGVyYWJsZSgpKSk7XG4gICAgaWYgKEl0ZXJhdG9yUHJvdG90eXBlICE9PSBPYmplY3QucHJvdG90eXBlICYmIEN1cnJlbnRJdGVyYXRvclByb3RvdHlwZS5uZXh0KSB7XG4gICAgICBpZiAoIUlTX1BVUkUgJiYgZ2V0UHJvdG90eXBlT2YoQ3VycmVudEl0ZXJhdG9yUHJvdG90eXBlKSAhPT0gSXRlcmF0b3JQcm90b3R5cGUpIHtcbiAgICAgICAgaWYgKHNldFByb3RvdHlwZU9mKSB7XG4gICAgICAgICAgc2V0UHJvdG90eXBlT2YoQ3VycmVudEl0ZXJhdG9yUHJvdG90eXBlLCBJdGVyYXRvclByb3RvdHlwZSk7XG4gICAgICAgIH0gZWxzZSBpZiAodHlwZW9mIEN1cnJlbnRJdGVyYXRvclByb3RvdHlwZVtJVEVSQVRPUl0gIT0gJ2Z1bmN0aW9uJykge1xuICAgICAgICAgIGNyZWF0ZU5vbkVudW1lcmFibGVQcm9wZXJ0eShDdXJyZW50SXRlcmF0b3JQcm90b3R5cGUsIElURVJBVE9SLCByZXR1cm5UaGlzKTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgICAgLy8gU2V0IEBAdG9TdHJpbmdUYWcgdG8gbmF0aXZlIGl0ZXJhdG9yc1xuICAgICAgc2V0VG9TdHJpbmdUYWcoQ3VycmVudEl0ZXJhdG9yUHJvdG90eXBlLCBUT19TVFJJTkdfVEFHLCB0cnVlLCB0cnVlKTtcbiAgICAgIGlmIChJU19QVVJFKSBJdGVyYXRvcnNbVE9fU1RSSU5HX1RBR10gPSByZXR1cm5UaGlzO1xuICAgIH1cbiAgfVxuXG4gIC8vIGZpeCBBcnJheSN7dmFsdWVzLCBAQGl0ZXJhdG9yfS5uYW1lIGluIFY4IC8gRkZcbiAgaWYgKERFRkFVTFQgPT0gVkFMVUVTICYmIG5hdGl2ZUl0ZXJhdG9yICYmIG5hdGl2ZUl0ZXJhdG9yLm5hbWUgIT09IFZBTFVFUykge1xuICAgIElOQ09SUkVDVF9WQUxVRVNfTkFNRSA9IHRydWU7XG4gICAgZGVmYXVsdEl0ZXJhdG9yID0gZnVuY3Rpb24gdmFsdWVzKCkgeyByZXR1cm4gbmF0aXZlSXRlcmF0b3IuY2FsbCh0aGlzKTsgfTtcbiAgfVxuXG4gIC8vIGRlZmluZSBpdGVyYXRvclxuICBpZiAoKCFJU19QVVJFIHx8IEZPUkNFRCkgJiYgSXRlcmFibGVQcm90b3R5cGVbSVRFUkFUT1JdICE9PSBkZWZhdWx0SXRlcmF0b3IpIHtcbiAgICBjcmVhdGVOb25FbnVtZXJhYmxlUHJvcGVydHkoSXRlcmFibGVQcm90b3R5cGUsIElURVJBVE9SLCBkZWZhdWx0SXRlcmF0b3IpO1xuICB9XG4gIEl0ZXJhdG9yc1tOQU1FXSA9IGRlZmF1bHRJdGVyYXRvcjtcblxuICAvLyBleHBvcnQgYWRkaXRpb25hbCBtZXRob2RzXG4gIGlmIChERUZBVUxUKSB7XG4gICAgbWV0aG9kcyA9IHtcbiAgICAgIHZhbHVlczogZ2V0SXRlcmF0aW9uTWV0aG9kKFZBTFVFUyksXG4gICAgICBrZXlzOiBJU19TRVQgPyBkZWZhdWx0SXRlcmF0b3IgOiBnZXRJdGVyYXRpb25NZXRob2QoS0VZUyksXG4gICAgICBlbnRyaWVzOiBnZXRJdGVyYXRpb25NZXRob2QoRU5UUklFUylcbiAgICB9O1xuICAgIGlmIChGT1JDRUQpIGZvciAoS0VZIGluIG1ldGhvZHMpIHtcbiAgICAgIGlmIChCVUdHWV9TQUZBUklfSVRFUkFUT1JTIHx8IElOQ09SUkVDVF9WQUxVRVNfTkFNRSB8fCAhKEtFWSBpbiBJdGVyYWJsZVByb3RvdHlwZSkpIHtcbiAgICAgICAgcmVkZWZpbmUoSXRlcmFibGVQcm90b3R5cGUsIEtFWSwgbWV0aG9kc1tLRVldKTtcbiAgICAgIH1cbiAgICB9IGVsc2UgJCh7IHRhcmdldDogTkFNRSwgcHJvdG86IHRydWUsIGZvcmNlZDogQlVHR1lfU0FGQVJJX0lURVJBVE9SUyB8fCBJTkNPUlJFQ1RfVkFMVUVTX05BTUUgfSwgbWV0aG9kcyk7XG4gIH1cblxuICByZXR1cm4gbWV0aG9kcztcbn07XG4iLCJ2YXIgZmFpbHMgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvZmFpbHMnKTtcblxuLy8gVGhhbmsncyBJRTggZm9yIGhpcyBmdW5ueSBkZWZpbmVQcm9wZXJ0eVxubW9kdWxlLmV4cG9ydHMgPSAhZmFpbHMoZnVuY3Rpb24gKCkge1xuICByZXR1cm4gT2JqZWN0LmRlZmluZVByb3BlcnR5KHt9LCAnYScsIHsgZ2V0OiBmdW5jdGlvbiAoKSB7IHJldHVybiA3OyB9IH0pLmEgIT0gNztcbn0pO1xuIiwidmFyIGdsb2JhbCA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9nbG9iYWwnKTtcbnZhciBpc09iamVjdCA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9pcy1vYmplY3QnKTtcblxudmFyIGRvY3VtZW50ID0gZ2xvYmFsLmRvY3VtZW50O1xuLy8gdHlwZW9mIGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQgaXMgJ29iamVjdCcgaW4gb2xkIElFXG52YXIgRVhJU1RTID0gaXNPYmplY3QoZG9jdW1lbnQpICYmIGlzT2JqZWN0KGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQpO1xuXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIChpdCkge1xuICByZXR1cm4gRVhJU1RTID8gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChpdCkgOiB7fTtcbn07XG4iLCIvLyBpdGVyYWJsZSBET00gY29sbGVjdGlvbnNcbi8vIGZsYWcgLSBgaXRlcmFibGVgIGludGVyZmFjZSAtICdlbnRyaWVzJywgJ2tleXMnLCAndmFsdWVzJywgJ2ZvckVhY2gnIG1ldGhvZHNcbm1vZHVsZS5leHBvcnRzID0ge1xuICBDU1NSdWxlTGlzdDogMCxcbiAgQ1NTU3R5bGVEZWNsYXJhdGlvbjogMCxcbiAgQ1NTVmFsdWVMaXN0OiAwLFxuICBDbGllbnRSZWN0TGlzdDogMCxcbiAgRE9NUmVjdExpc3Q6IDAsXG4gIERPTVN0cmluZ0xpc3Q6IDAsXG4gIERPTVRva2VuTGlzdDogMSxcbiAgRGF0YVRyYW5zZmVySXRlbUxpc3Q6IDAsXG4gIEZpbGVMaXN0OiAwLFxuICBIVE1MQWxsQ29sbGVjdGlvbjogMCxcbiAgSFRNTENvbGxlY3Rpb246IDAsXG4gIEhUTUxGb3JtRWxlbWVudDogMCxcbiAgSFRNTFNlbGVjdEVsZW1lbnQ6IDAsXG4gIE1lZGlhTGlzdDogMCxcbiAgTWltZVR5cGVBcnJheTogMCxcbiAgTmFtZWROb2RlTWFwOiAwLFxuICBOb2RlTGlzdDogMSxcbiAgUGFpbnRSZXF1ZXN0TGlzdDogMCxcbiAgUGx1Z2luOiAwLFxuICBQbHVnaW5BcnJheTogMCxcbiAgU1ZHTGVuZ3RoTGlzdDogMCxcbiAgU1ZHTnVtYmVyTGlzdDogMCxcbiAgU1ZHUGF0aFNlZ0xpc3Q6IDAsXG4gIFNWR1BvaW50TGlzdDogMCxcbiAgU1ZHU3RyaW5nTGlzdDogMCxcbiAgU1ZHVHJhbnNmb3JtTGlzdDogMCxcbiAgU291cmNlQnVmZmVyTGlzdDogMCxcbiAgU3R5bGVTaGVldExpc3Q6IDAsXG4gIFRleHRUcmFja0N1ZUxpc3Q6IDAsXG4gIFRleHRUcmFja0xpc3Q6IDAsXG4gIFRvdWNoTGlzdDogMFxufTtcbiIsIi8vIElFOC0gZG9uJ3QgZW51bSBidWcga2V5c1xubW9kdWxlLmV4cG9ydHMgPSBbXG4gICdjb25zdHJ1Y3RvcicsXG4gICdoYXNPd25Qcm9wZXJ0eScsXG4gICdpc1Byb3RvdHlwZU9mJyxcbiAgJ3Byb3BlcnR5SXNFbnVtZXJhYmxlJyxcbiAgJ3RvTG9jYWxlU3RyaW5nJyxcbiAgJ3RvU3RyaW5nJyxcbiAgJ3ZhbHVlT2YnXG5dO1xuIiwidmFyIGdsb2JhbCA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9nbG9iYWwnKTtcbnZhciBnZXRPd25Qcm9wZXJ0eURlc2NyaXB0b3IgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvb2JqZWN0LWdldC1vd24tcHJvcGVydHktZGVzY3JpcHRvcicpLmY7XG52YXIgY3JlYXRlTm9uRW51bWVyYWJsZVByb3BlcnR5ID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL2NyZWF0ZS1ub24tZW51bWVyYWJsZS1wcm9wZXJ0eScpO1xudmFyIHJlZGVmaW5lID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL3JlZGVmaW5lJyk7XG52YXIgc2V0R2xvYmFsID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL3NldC1nbG9iYWwnKTtcbnZhciBjb3B5Q29uc3RydWN0b3JQcm9wZXJ0aWVzID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL2NvcHktY29uc3RydWN0b3ItcHJvcGVydGllcycpO1xudmFyIGlzRm9yY2VkID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL2lzLWZvcmNlZCcpO1xuXG4vKlxuICBvcHRpb25zLnRhcmdldCAgICAgIC0gbmFtZSBvZiB0aGUgdGFyZ2V0IG9iamVjdFxuICBvcHRpb25zLmdsb2JhbCAgICAgIC0gdGFyZ2V0IGlzIHRoZSBnbG9iYWwgb2JqZWN0XG4gIG9wdGlvbnMuc3RhdCAgICAgICAgLSBleHBvcnQgYXMgc3RhdGljIG1ldGhvZHMgb2YgdGFyZ2V0XG4gIG9wdGlvbnMucHJvdG8gICAgICAgLSBleHBvcnQgYXMgcHJvdG90eXBlIG1ldGhvZHMgb2YgdGFyZ2V0XG4gIG9wdGlvbnMucmVhbCAgICAgICAgLSByZWFsIHByb3RvdHlwZSBtZXRob2QgZm9yIHRoZSBgcHVyZWAgdmVyc2lvblxuICBvcHRpb25zLmZvcmNlZCAgICAgIC0gZXhwb3J0IGV2ZW4gaWYgdGhlIG5hdGl2ZSBmZWF0dXJlIGlzIGF2YWlsYWJsZVxuICBvcHRpb25zLmJpbmQgICAgICAgIC0gYmluZCBtZXRob2RzIHRvIHRoZSB0YXJnZXQsIHJlcXVpcmVkIGZvciB0aGUgYHB1cmVgIHZlcnNpb25cbiAgb3B0aW9ucy53cmFwICAgICAgICAtIHdyYXAgY29uc3RydWN0b3JzIHRvIHByZXZlbnRpbmcgZ2xvYmFsIHBvbGx1dGlvbiwgcmVxdWlyZWQgZm9yIHRoZSBgcHVyZWAgdmVyc2lvblxuICBvcHRpb25zLnVuc2FmZSAgICAgIC0gdXNlIHRoZSBzaW1wbGUgYXNzaWdubWVudCBvZiBwcm9wZXJ0eSBpbnN0ZWFkIG9mIGRlbGV0ZSArIGRlZmluZVByb3BlcnR5XG4gIG9wdGlvbnMuc2hhbSAgICAgICAgLSBhZGQgYSBmbGFnIHRvIG5vdCBjb21wbGV0ZWx5IGZ1bGwgcG9seWZpbGxzXG4gIG9wdGlvbnMuZW51bWVyYWJsZSAgLSBleHBvcnQgYXMgZW51bWVyYWJsZSBwcm9wZXJ0eVxuICBvcHRpb25zLm5vVGFyZ2V0R2V0IC0gcHJldmVudCBjYWxsaW5nIGEgZ2V0dGVyIG9uIHRhcmdldFxuKi9cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gKG9wdGlvbnMsIHNvdXJjZSkge1xuICB2YXIgVEFSR0VUID0gb3B0aW9ucy50YXJnZXQ7XG4gIHZhciBHTE9CQUwgPSBvcHRpb25zLmdsb2JhbDtcbiAgdmFyIFNUQVRJQyA9IG9wdGlvbnMuc3RhdDtcbiAgdmFyIEZPUkNFRCwgdGFyZ2V0LCBrZXksIHRhcmdldFByb3BlcnR5LCBzb3VyY2VQcm9wZXJ0eSwgZGVzY3JpcHRvcjtcbiAgaWYgKEdMT0JBTCkge1xuICAgIHRhcmdldCA9IGdsb2JhbDtcbiAgfSBlbHNlIGlmIChTVEFUSUMpIHtcbiAgICB0YXJnZXQgPSBnbG9iYWxbVEFSR0VUXSB8fCBzZXRHbG9iYWwoVEFSR0VULCB7fSk7XG4gIH0gZWxzZSB7XG4gICAgdGFyZ2V0ID0gKGdsb2JhbFtUQVJHRVRdIHx8IHt9KS5wcm90b3R5cGU7XG4gIH1cbiAgaWYgKHRhcmdldCkgZm9yIChrZXkgaW4gc291cmNlKSB7XG4gICAgc291cmNlUHJvcGVydHkgPSBzb3VyY2Vba2V5XTtcbiAgICBpZiAob3B0aW9ucy5ub1RhcmdldEdldCkge1xuICAgICAgZGVzY3JpcHRvciA9IGdldE93blByb3BlcnR5RGVzY3JpcHRvcih0YXJnZXQsIGtleSk7XG4gICAgICB0YXJnZXRQcm9wZXJ0eSA9IGRlc2NyaXB0b3IgJiYgZGVzY3JpcHRvci52YWx1ZTtcbiAgICB9IGVsc2UgdGFyZ2V0UHJvcGVydHkgPSB0YXJnZXRba2V5XTtcbiAgICBGT1JDRUQgPSBpc0ZvcmNlZChHTE9CQUwgPyBrZXkgOiBUQVJHRVQgKyAoU1RBVElDID8gJy4nIDogJyMnKSArIGtleSwgb3B0aW9ucy5mb3JjZWQpO1xuICAgIC8vIGNvbnRhaW5lZCBpbiB0YXJnZXRcbiAgICBpZiAoIUZPUkNFRCAmJiB0YXJnZXRQcm9wZXJ0eSAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICBpZiAodHlwZW9mIHNvdXJjZVByb3BlcnR5ID09PSB0eXBlb2YgdGFyZ2V0UHJvcGVydHkpIGNvbnRpbnVlO1xuICAgICAgY29weUNvbnN0cnVjdG9yUHJvcGVydGllcyhzb3VyY2VQcm9wZXJ0eSwgdGFyZ2V0UHJvcGVydHkpO1xuICAgIH1cbiAgICAvLyBhZGQgYSBmbGFnIHRvIG5vdCBjb21wbGV0ZWx5IGZ1bGwgcG9seWZpbGxzXG4gICAgaWYgKG9wdGlvbnMuc2hhbSB8fCAodGFyZ2V0UHJvcGVydHkgJiYgdGFyZ2V0UHJvcGVydHkuc2hhbSkpIHtcbiAgICAgIGNyZWF0ZU5vbkVudW1lcmFibGVQcm9wZXJ0eShzb3VyY2VQcm9wZXJ0eSwgJ3NoYW0nLCB0cnVlKTtcbiAgICB9XG4gICAgLy8gZXh0ZW5kIGdsb2JhbFxuICAgIHJlZGVmaW5lKHRhcmdldCwga2V5LCBzb3VyY2VQcm9wZXJ0eSwgb3B0aW9ucyk7XG4gIH1cbn07XG4iLCJtb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIChleGVjKSB7XG4gIHRyeSB7XG4gICAgcmV0dXJuICEhZXhlYygpO1xuICB9IGNhdGNoIChlcnJvcikge1xuICAgIHJldHVybiB0cnVlO1xuICB9XG59O1xuIiwiJ3VzZSBzdHJpY3QnO1xudmFyIGlzQXJyYXkgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvaXMtYXJyYXknKTtcbnZhciB0b0xlbmd0aCA9IHJlcXVpcmUoJy4uL2ludGVybmFscy90by1sZW5ndGgnKTtcbnZhciBiaW5kID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL2JpbmQtY29udGV4dCcpO1xuXG4vLyBgRmxhdHRlbkludG9BcnJheWAgYWJzdHJhY3Qgb3BlcmF0aW9uXG4vLyBodHRwczovL3RjMzkuZ2l0aHViLmlvL3Byb3Bvc2FsLWZsYXRNYXAvI3NlYy1GbGF0dGVuSW50b0FycmF5XG52YXIgZmxhdHRlbkludG9BcnJheSA9IGZ1bmN0aW9uICh0YXJnZXQsIG9yaWdpbmFsLCBzb3VyY2UsIHNvdXJjZUxlbiwgc3RhcnQsIGRlcHRoLCBtYXBwZXIsIHRoaXNBcmcpIHtcbiAgdmFyIHRhcmdldEluZGV4ID0gc3RhcnQ7XG4gIHZhciBzb3VyY2VJbmRleCA9IDA7XG4gIHZhciBtYXBGbiA9IG1hcHBlciA/IGJpbmQobWFwcGVyLCB0aGlzQXJnLCAzKSA6IGZhbHNlO1xuICB2YXIgZWxlbWVudDtcblxuICB3aGlsZSAoc291cmNlSW5kZXggPCBzb3VyY2VMZW4pIHtcbiAgICBpZiAoc291cmNlSW5kZXggaW4gc291cmNlKSB7XG4gICAgICBlbGVtZW50ID0gbWFwRm4gPyBtYXBGbihzb3VyY2Vbc291cmNlSW5kZXhdLCBzb3VyY2VJbmRleCwgb3JpZ2luYWwpIDogc291cmNlW3NvdXJjZUluZGV4XTtcblxuICAgICAgaWYgKGRlcHRoID4gMCAmJiBpc0FycmF5KGVsZW1lbnQpKSB7XG4gICAgICAgIHRhcmdldEluZGV4ID0gZmxhdHRlbkludG9BcnJheSh0YXJnZXQsIG9yaWdpbmFsLCBlbGVtZW50LCB0b0xlbmd0aChlbGVtZW50Lmxlbmd0aCksIHRhcmdldEluZGV4LCBkZXB0aCAtIDEpIC0gMTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIGlmICh0YXJnZXRJbmRleCA+PSAweDFGRkZGRkZGRkZGRkZGKSB0aHJvdyBUeXBlRXJyb3IoJ0V4Y2VlZCB0aGUgYWNjZXB0YWJsZSBhcnJheSBsZW5ndGgnKTtcbiAgICAgICAgdGFyZ2V0W3RhcmdldEluZGV4XSA9IGVsZW1lbnQ7XG4gICAgICB9XG5cbiAgICAgIHRhcmdldEluZGV4Kys7XG4gICAgfVxuICAgIHNvdXJjZUluZGV4Kys7XG4gIH1cbiAgcmV0dXJuIHRhcmdldEluZGV4O1xufTtcblxubW9kdWxlLmV4cG9ydHMgPSBmbGF0dGVuSW50b0FycmF5O1xuIiwidmFyIHBhdGggPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvcGF0aCcpO1xudmFyIGdsb2JhbCA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9nbG9iYWwnKTtcblxudmFyIGFGdW5jdGlvbiA9IGZ1bmN0aW9uICh2YXJpYWJsZSkge1xuICByZXR1cm4gdHlwZW9mIHZhcmlhYmxlID09ICdmdW5jdGlvbicgPyB2YXJpYWJsZSA6IHVuZGVmaW5lZDtcbn07XG5cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gKG5hbWVzcGFjZSwgbWV0aG9kKSB7XG4gIHJldHVybiBhcmd1bWVudHMubGVuZ3RoIDwgMiA/IGFGdW5jdGlvbihwYXRoW25hbWVzcGFjZV0pIHx8IGFGdW5jdGlvbihnbG9iYWxbbmFtZXNwYWNlXSlcbiAgICA6IHBhdGhbbmFtZXNwYWNlXSAmJiBwYXRoW25hbWVzcGFjZV1bbWV0aG9kXSB8fCBnbG9iYWxbbmFtZXNwYWNlXSAmJiBnbG9iYWxbbmFtZXNwYWNlXVttZXRob2RdO1xufTtcbiIsInZhciBjbGFzc29mID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL2NsYXNzb2YnKTtcbnZhciBJdGVyYXRvcnMgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvaXRlcmF0b3JzJyk7XG52YXIgd2VsbEtub3duU3ltYm9sID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL3dlbGwta25vd24tc3ltYm9sJyk7XG5cbnZhciBJVEVSQVRPUiA9IHdlbGxLbm93blN5bWJvbCgnaXRlcmF0b3InKTtcblxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiAoaXQpIHtcbiAgaWYgKGl0ICE9IHVuZGVmaW5lZCkgcmV0dXJuIGl0W0lURVJBVE9SXVxuICAgIHx8IGl0WydAQGl0ZXJhdG9yJ11cbiAgICB8fCBJdGVyYXRvcnNbY2xhc3NvZihpdCldO1xufTtcbiIsInZhciBjaGVjayA9IGZ1bmN0aW9uIChpdCkge1xuICByZXR1cm4gaXQgJiYgaXQuTWF0aCA9PSBNYXRoICYmIGl0O1xufTtcblxuLy8gaHR0cHM6Ly9naXRodWIuY29tL3psb2lyb2NrL2NvcmUtanMvaXNzdWVzLzg2I2lzc3VlY29tbWVudC0xMTU3NTkwMjhcbm1vZHVsZS5leHBvcnRzID1cbiAgLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIG5vLXVuZGVmXG4gIGNoZWNrKHR5cGVvZiBnbG9iYWxUaGlzID09ICdvYmplY3QnICYmIGdsb2JhbFRoaXMpIHx8XG4gIGNoZWNrKHR5cGVvZiB3aW5kb3cgPT0gJ29iamVjdCcgJiYgd2luZG93KSB8fFxuICBjaGVjayh0eXBlb2Ygc2VsZiA9PSAnb2JqZWN0JyAmJiBzZWxmKSB8fFxuICBjaGVjayh0eXBlb2YgZ2xvYmFsID09ICdvYmplY3QnICYmIGdsb2JhbCkgfHxcbiAgLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIG5vLW5ldy1mdW5jXG4gIEZ1bmN0aW9uKCdyZXR1cm4gdGhpcycpKCk7XG4iLCJ2YXIgaGFzT3duUHJvcGVydHkgPSB7fS5oYXNPd25Qcm9wZXJ0eTtcblxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiAoaXQsIGtleSkge1xuICByZXR1cm4gaGFzT3duUHJvcGVydHkuY2FsbChpdCwga2V5KTtcbn07XG4iLCJtb2R1bGUuZXhwb3J0cyA9IHt9O1xuIiwidmFyIGdsb2JhbCA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9nbG9iYWwnKTtcblxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiAoYSwgYikge1xuICB2YXIgY29uc29sZSA9IGdsb2JhbC5jb25zb2xlO1xuICBpZiAoY29uc29sZSAmJiBjb25zb2xlLmVycm9yKSB7XG4gICAgYXJndW1lbnRzLmxlbmd0aCA9PT0gMSA/IGNvbnNvbGUuZXJyb3IoYSkgOiBjb25zb2xlLmVycm9yKGEsIGIpO1xuICB9XG59O1xuIiwidmFyIGdldEJ1aWx0SW4gPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvZ2V0LWJ1aWx0LWluJyk7XG5cbm1vZHVsZS5leHBvcnRzID0gZ2V0QnVpbHRJbignZG9jdW1lbnQnLCAnZG9jdW1lbnRFbGVtZW50Jyk7XG4iLCJ2YXIgREVTQ1JJUFRPUlMgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvZGVzY3JpcHRvcnMnKTtcbnZhciBmYWlscyA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9mYWlscycpO1xudmFyIGNyZWF0ZUVsZW1lbnQgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvZG9jdW1lbnQtY3JlYXRlLWVsZW1lbnQnKTtcblxuLy8gVGhhbmsncyBJRTggZm9yIGhpcyBmdW5ueSBkZWZpbmVQcm9wZXJ0eVxubW9kdWxlLmV4cG9ydHMgPSAhREVTQ1JJUFRPUlMgJiYgIWZhaWxzKGZ1bmN0aW9uICgpIHtcbiAgcmV0dXJuIE9iamVjdC5kZWZpbmVQcm9wZXJ0eShjcmVhdGVFbGVtZW50KCdkaXYnKSwgJ2EnLCB7XG4gICAgZ2V0OiBmdW5jdGlvbiAoKSB7IHJldHVybiA3OyB9XG4gIH0pLmEgIT0gNztcbn0pO1xuIiwidmFyIGZhaWxzID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL2ZhaWxzJyk7XG52YXIgY2xhc3NvZiA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9jbGFzc29mLXJhdycpO1xuXG52YXIgc3BsaXQgPSAnJy5zcGxpdDtcblxuLy8gZmFsbGJhY2sgZm9yIG5vbi1hcnJheS1saWtlIEVTMyBhbmQgbm9uLWVudW1lcmFibGUgb2xkIFY4IHN0cmluZ3Ncbm1vZHVsZS5leHBvcnRzID0gZmFpbHMoZnVuY3Rpb24gKCkge1xuICAvLyB0aHJvd3MgYW4gZXJyb3IgaW4gcmhpbm8sIHNlZSBodHRwczovL2dpdGh1Yi5jb20vbW96aWxsYS9yaGluby9pc3N1ZXMvMzQ2XG4gIC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBuby1wcm90b3R5cGUtYnVpbHRpbnNcbiAgcmV0dXJuICFPYmplY3QoJ3onKS5wcm9wZXJ0eUlzRW51bWVyYWJsZSgwKTtcbn0pID8gZnVuY3Rpb24gKGl0KSB7XG4gIHJldHVybiBjbGFzc29mKGl0KSA9PSAnU3RyaW5nJyA/IHNwbGl0LmNhbGwoaXQsICcnKSA6IE9iamVjdChpdCk7XG59IDogT2JqZWN0O1xuIiwidmFyIHN0b3JlID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL3NoYXJlZC1zdG9yZScpO1xuXG52YXIgZnVuY3Rpb25Ub1N0cmluZyA9IEZ1bmN0aW9uLnRvU3RyaW5nO1xuXG4vLyB0aGlzIGhlbHBlciBicm9rZW4gaW4gYDMuNC4xLTMuNC40YCwgc28gd2UgY2FuJ3QgdXNlIGBzaGFyZWRgIGhlbHBlclxuaWYgKHR5cGVvZiBzdG9yZS5pbnNwZWN0U291cmNlICE9ICdmdW5jdGlvbicpIHtcbiAgc3RvcmUuaW5zcGVjdFNvdXJjZSA9IGZ1bmN0aW9uIChpdCkge1xuICAgIHJldHVybiBmdW5jdGlvblRvU3RyaW5nLmNhbGwoaXQpO1xuICB9O1xufVxuXG5tb2R1bGUuZXhwb3J0cyA9IHN0b3JlLmluc3BlY3RTb3VyY2U7XG4iLCJ2YXIgTkFUSVZFX1dFQUtfTUFQID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL25hdGl2ZS13ZWFrLW1hcCcpO1xudmFyIGdsb2JhbCA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9nbG9iYWwnKTtcbnZhciBpc09iamVjdCA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9pcy1vYmplY3QnKTtcbnZhciBjcmVhdGVOb25FbnVtZXJhYmxlUHJvcGVydHkgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvY3JlYXRlLW5vbi1lbnVtZXJhYmxlLXByb3BlcnR5Jyk7XG52YXIgb2JqZWN0SGFzID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL2hhcycpO1xudmFyIHNoYXJlZEtleSA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9zaGFyZWQta2V5Jyk7XG52YXIgaGlkZGVuS2V5cyA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9oaWRkZW4ta2V5cycpO1xuXG52YXIgV2Vha01hcCA9IGdsb2JhbC5XZWFrTWFwO1xudmFyIHNldCwgZ2V0LCBoYXM7XG5cbnZhciBlbmZvcmNlID0gZnVuY3Rpb24gKGl0KSB7XG4gIHJldHVybiBoYXMoaXQpID8gZ2V0KGl0KSA6IHNldChpdCwge30pO1xufTtcblxudmFyIGdldHRlckZvciA9IGZ1bmN0aW9uIChUWVBFKSB7XG4gIHJldHVybiBmdW5jdGlvbiAoaXQpIHtcbiAgICB2YXIgc3RhdGU7XG4gICAgaWYgKCFpc09iamVjdChpdCkgfHwgKHN0YXRlID0gZ2V0KGl0KSkudHlwZSAhPT0gVFlQRSkge1xuICAgICAgdGhyb3cgVHlwZUVycm9yKCdJbmNvbXBhdGlibGUgcmVjZWl2ZXIsICcgKyBUWVBFICsgJyByZXF1aXJlZCcpO1xuICAgIH0gcmV0dXJuIHN0YXRlO1xuICB9O1xufTtcblxuaWYgKE5BVElWRV9XRUFLX01BUCkge1xuICB2YXIgc3RvcmUgPSBuZXcgV2Vha01hcCgpO1xuICB2YXIgd21nZXQgPSBzdG9yZS5nZXQ7XG4gIHZhciB3bWhhcyA9IHN0b3JlLmhhcztcbiAgdmFyIHdtc2V0ID0gc3RvcmUuc2V0O1xuICBzZXQgPSBmdW5jdGlvbiAoaXQsIG1ldGFkYXRhKSB7XG4gICAgd21zZXQuY2FsbChzdG9yZSwgaXQsIG1ldGFkYXRhKTtcbiAgICByZXR1cm4gbWV0YWRhdGE7XG4gIH07XG4gIGdldCA9IGZ1bmN0aW9uIChpdCkge1xuICAgIHJldHVybiB3bWdldC5jYWxsKHN0b3JlLCBpdCkgfHwge307XG4gIH07XG4gIGhhcyA9IGZ1bmN0aW9uIChpdCkge1xuICAgIHJldHVybiB3bWhhcy5jYWxsKHN0b3JlLCBpdCk7XG4gIH07XG59IGVsc2Uge1xuICB2YXIgU1RBVEUgPSBzaGFyZWRLZXkoJ3N0YXRlJyk7XG4gIGhpZGRlbktleXNbU1RBVEVdID0gdHJ1ZTtcbiAgc2V0ID0gZnVuY3Rpb24gKGl0LCBtZXRhZGF0YSkge1xuICAgIGNyZWF0ZU5vbkVudW1lcmFibGVQcm9wZXJ0eShpdCwgU1RBVEUsIG1ldGFkYXRhKTtcbiAgICByZXR1cm4gbWV0YWRhdGE7XG4gIH07XG4gIGdldCA9IGZ1bmN0aW9uIChpdCkge1xuICAgIHJldHVybiBvYmplY3RIYXMoaXQsIFNUQVRFKSA/IGl0W1NUQVRFXSA6IHt9O1xuICB9O1xuICBoYXMgPSBmdW5jdGlvbiAoaXQpIHtcbiAgICByZXR1cm4gb2JqZWN0SGFzKGl0LCBTVEFURSk7XG4gIH07XG59XG5cbm1vZHVsZS5leHBvcnRzID0ge1xuICBzZXQ6IHNldCxcbiAgZ2V0OiBnZXQsXG4gIGhhczogaGFzLFxuICBlbmZvcmNlOiBlbmZvcmNlLFxuICBnZXR0ZXJGb3I6IGdldHRlckZvclxufTtcbiIsInZhciB3ZWxsS25vd25TeW1ib2wgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvd2VsbC1rbm93bi1zeW1ib2wnKTtcbnZhciBJdGVyYXRvcnMgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvaXRlcmF0b3JzJyk7XG5cbnZhciBJVEVSQVRPUiA9IHdlbGxLbm93blN5bWJvbCgnaXRlcmF0b3InKTtcbnZhciBBcnJheVByb3RvdHlwZSA9IEFycmF5LnByb3RvdHlwZTtcblxuLy8gY2hlY2sgb24gZGVmYXVsdCBBcnJheSBpdGVyYXRvclxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiAoaXQpIHtcbiAgcmV0dXJuIGl0ICE9PSB1bmRlZmluZWQgJiYgKEl0ZXJhdG9ycy5BcnJheSA9PT0gaXQgfHwgQXJyYXlQcm90b3R5cGVbSVRFUkFUT1JdID09PSBpdCk7XG59O1xuIiwidmFyIGNsYXNzb2YgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvY2xhc3NvZi1yYXcnKTtcblxuLy8gYElzQXJyYXlgIGFic3RyYWN0IG9wZXJhdGlvblxuLy8gaHR0cHM6Ly90YzM5LmdpdGh1Yi5pby9lY21hMjYyLyNzZWMtaXNhcnJheVxubW9kdWxlLmV4cG9ydHMgPSBBcnJheS5pc0FycmF5IHx8IGZ1bmN0aW9uIGlzQXJyYXkoYXJnKSB7XG4gIHJldHVybiBjbGFzc29mKGFyZykgPT0gJ0FycmF5Jztcbn07XG4iLCJ2YXIgZmFpbHMgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvZmFpbHMnKTtcblxudmFyIHJlcGxhY2VtZW50ID0gLyN8XFwucHJvdG90eXBlXFwuLztcblxudmFyIGlzRm9yY2VkID0gZnVuY3Rpb24gKGZlYXR1cmUsIGRldGVjdGlvbikge1xuICB2YXIgdmFsdWUgPSBkYXRhW25vcm1hbGl6ZShmZWF0dXJlKV07XG4gIHJldHVybiB2YWx1ZSA9PSBQT0xZRklMTCA/IHRydWVcbiAgICA6IHZhbHVlID09IE5BVElWRSA/IGZhbHNlXG4gICAgOiB0eXBlb2YgZGV0ZWN0aW9uID09ICdmdW5jdGlvbicgPyBmYWlscyhkZXRlY3Rpb24pXG4gICAgOiAhIWRldGVjdGlvbjtcbn07XG5cbnZhciBub3JtYWxpemUgPSBpc0ZvcmNlZC5ub3JtYWxpemUgPSBmdW5jdGlvbiAoc3RyaW5nKSB7XG4gIHJldHVybiBTdHJpbmcoc3RyaW5nKS5yZXBsYWNlKHJlcGxhY2VtZW50LCAnLicpLnRvTG93ZXJDYXNlKCk7XG59O1xuXG52YXIgZGF0YSA9IGlzRm9yY2VkLmRhdGEgPSB7fTtcbnZhciBOQVRJVkUgPSBpc0ZvcmNlZC5OQVRJVkUgPSAnTic7XG52YXIgUE9MWUZJTEwgPSBpc0ZvcmNlZC5QT0xZRklMTCA9ICdQJztcblxubW9kdWxlLmV4cG9ydHMgPSBpc0ZvcmNlZDtcbiIsInZhciB1c2VyQWdlbnQgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvdXNlci1hZ2VudCcpO1xuXG5tb2R1bGUuZXhwb3J0cyA9IC8oaXBob25lfGlwb2R8aXBhZCkuKmFwcGxld2Via2l0L2kudGVzdCh1c2VyQWdlbnQpO1xuIiwibW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiAoaXQpIHtcbiAgcmV0dXJuIHR5cGVvZiBpdCA9PT0gJ29iamVjdCcgPyBpdCAhPT0gbnVsbCA6IHR5cGVvZiBpdCA9PT0gJ2Z1bmN0aW9uJztcbn07XG4iLCJtb2R1bGUuZXhwb3J0cyA9IGZhbHNlO1xuIiwidmFyIGFuT2JqZWN0ID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL2FuLW9iamVjdCcpO1xudmFyIGlzQXJyYXlJdGVyYXRvck1ldGhvZCA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9pcy1hcnJheS1pdGVyYXRvci1tZXRob2QnKTtcbnZhciB0b0xlbmd0aCA9IHJlcXVpcmUoJy4uL2ludGVybmFscy90by1sZW5ndGgnKTtcbnZhciBiaW5kID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL2JpbmQtY29udGV4dCcpO1xudmFyIGdldEl0ZXJhdG9yTWV0aG9kID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL2dldC1pdGVyYXRvci1tZXRob2QnKTtcbnZhciBjYWxsV2l0aFNhZmVJdGVyYXRpb25DbG9zaW5nID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL2NhbGwtd2l0aC1zYWZlLWl0ZXJhdGlvbi1jbG9zaW5nJyk7XG5cbnZhciBSZXN1bHQgPSBmdW5jdGlvbiAoc3RvcHBlZCwgcmVzdWx0KSB7XG4gIHRoaXMuc3RvcHBlZCA9IHN0b3BwZWQ7XG4gIHRoaXMucmVzdWx0ID0gcmVzdWx0O1xufTtcblxudmFyIGl0ZXJhdGUgPSBtb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIChpdGVyYWJsZSwgZm4sIHRoYXQsIEFTX0VOVFJJRVMsIElTX0lURVJBVE9SKSB7XG4gIHZhciBib3VuZEZ1bmN0aW9uID0gYmluZChmbiwgdGhhdCwgQVNfRU5UUklFUyA/IDIgOiAxKTtcbiAgdmFyIGl0ZXJhdG9yLCBpdGVyRm4sIGluZGV4LCBsZW5ndGgsIHJlc3VsdCwgbmV4dCwgc3RlcDtcblxuICBpZiAoSVNfSVRFUkFUT1IpIHtcbiAgICBpdGVyYXRvciA9IGl0ZXJhYmxlO1xuICB9IGVsc2Uge1xuICAgIGl0ZXJGbiA9IGdldEl0ZXJhdG9yTWV0aG9kKGl0ZXJhYmxlKTtcbiAgICBpZiAodHlwZW9mIGl0ZXJGbiAhPSAnZnVuY3Rpb24nKSB0aHJvdyBUeXBlRXJyb3IoJ1RhcmdldCBpcyBub3QgaXRlcmFibGUnKTtcbiAgICAvLyBvcHRpbWlzYXRpb24gZm9yIGFycmF5IGl0ZXJhdG9yc1xuICAgIGlmIChpc0FycmF5SXRlcmF0b3JNZXRob2QoaXRlckZuKSkge1xuICAgICAgZm9yIChpbmRleCA9IDAsIGxlbmd0aCA9IHRvTGVuZ3RoKGl0ZXJhYmxlLmxlbmd0aCk7IGxlbmd0aCA+IGluZGV4OyBpbmRleCsrKSB7XG4gICAgICAgIHJlc3VsdCA9IEFTX0VOVFJJRVNcbiAgICAgICAgICA/IGJvdW5kRnVuY3Rpb24oYW5PYmplY3Qoc3RlcCA9IGl0ZXJhYmxlW2luZGV4XSlbMF0sIHN0ZXBbMV0pXG4gICAgICAgICAgOiBib3VuZEZ1bmN0aW9uKGl0ZXJhYmxlW2luZGV4XSk7XG4gICAgICAgIGlmIChyZXN1bHQgJiYgcmVzdWx0IGluc3RhbmNlb2YgUmVzdWx0KSByZXR1cm4gcmVzdWx0O1xuICAgICAgfSByZXR1cm4gbmV3IFJlc3VsdChmYWxzZSk7XG4gICAgfVxuICAgIGl0ZXJhdG9yID0gaXRlckZuLmNhbGwoaXRlcmFibGUpO1xuICB9XG5cbiAgbmV4dCA9IGl0ZXJhdG9yLm5leHQ7XG4gIHdoaWxlICghKHN0ZXAgPSBuZXh0LmNhbGwoaXRlcmF0b3IpKS5kb25lKSB7XG4gICAgcmVzdWx0ID0gY2FsbFdpdGhTYWZlSXRlcmF0aW9uQ2xvc2luZyhpdGVyYXRvciwgYm91bmRGdW5jdGlvbiwgc3RlcC52YWx1ZSwgQVNfRU5UUklFUyk7XG4gICAgaWYgKHR5cGVvZiByZXN1bHQgPT0gJ29iamVjdCcgJiYgcmVzdWx0ICYmIHJlc3VsdCBpbnN0YW5jZW9mIFJlc3VsdCkgcmV0dXJuIHJlc3VsdDtcbiAgfSByZXR1cm4gbmV3IFJlc3VsdChmYWxzZSk7XG59O1xuXG5pdGVyYXRlLnN0b3AgPSBmdW5jdGlvbiAocmVzdWx0KSB7XG4gIHJldHVybiBuZXcgUmVzdWx0KHRydWUsIHJlc3VsdCk7XG59O1xuIiwiJ3VzZSBzdHJpY3QnO1xudmFyIGdldFByb3RvdHlwZU9mID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL29iamVjdC1nZXQtcHJvdG90eXBlLW9mJyk7XG52YXIgY3JlYXRlTm9uRW51bWVyYWJsZVByb3BlcnR5ID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL2NyZWF0ZS1ub24tZW51bWVyYWJsZS1wcm9wZXJ0eScpO1xudmFyIGhhcyA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9oYXMnKTtcbnZhciB3ZWxsS25vd25TeW1ib2wgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvd2VsbC1rbm93bi1zeW1ib2wnKTtcbnZhciBJU19QVVJFID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL2lzLXB1cmUnKTtcblxudmFyIElURVJBVE9SID0gd2VsbEtub3duU3ltYm9sKCdpdGVyYXRvcicpO1xudmFyIEJVR0dZX1NBRkFSSV9JVEVSQVRPUlMgPSBmYWxzZTtcblxudmFyIHJldHVyblRoaXMgPSBmdW5jdGlvbiAoKSB7IHJldHVybiB0aGlzOyB9O1xuXG4vLyBgJUl0ZXJhdG9yUHJvdG90eXBlJWAgb2JqZWN0XG4vLyBodHRwczovL3RjMzkuZ2l0aHViLmlvL2VjbWEyNjIvI3NlYy0laXRlcmF0b3Jwcm90b3R5cGUlLW9iamVjdFxudmFyIEl0ZXJhdG9yUHJvdG90eXBlLCBQcm90b3R5cGVPZkFycmF5SXRlcmF0b3JQcm90b3R5cGUsIGFycmF5SXRlcmF0b3I7XG5cbmlmIChbXS5rZXlzKSB7XG4gIGFycmF5SXRlcmF0b3IgPSBbXS5rZXlzKCk7XG4gIC8vIFNhZmFyaSA4IGhhcyBidWdneSBpdGVyYXRvcnMgdy9vIGBuZXh0YFxuICBpZiAoISgnbmV4dCcgaW4gYXJyYXlJdGVyYXRvcikpIEJVR0dZX1NBRkFSSV9JVEVSQVRPUlMgPSB0cnVlO1xuICBlbHNlIHtcbiAgICBQcm90b3R5cGVPZkFycmF5SXRlcmF0b3JQcm90b3R5cGUgPSBnZXRQcm90b3R5cGVPZihnZXRQcm90b3R5cGVPZihhcnJheUl0ZXJhdG9yKSk7XG4gICAgaWYgKFByb3RvdHlwZU9mQXJyYXlJdGVyYXRvclByb3RvdHlwZSAhPT0gT2JqZWN0LnByb3RvdHlwZSkgSXRlcmF0b3JQcm90b3R5cGUgPSBQcm90b3R5cGVPZkFycmF5SXRlcmF0b3JQcm90b3R5cGU7XG4gIH1cbn1cblxuaWYgKEl0ZXJhdG9yUHJvdG90eXBlID09IHVuZGVmaW5lZCkgSXRlcmF0b3JQcm90b3R5cGUgPSB7fTtcblxuLy8gMjUuMS4yLjEuMSAlSXRlcmF0b3JQcm90b3R5cGUlW0BAaXRlcmF0b3JdKClcbmlmICghSVNfUFVSRSAmJiAhaGFzKEl0ZXJhdG9yUHJvdG90eXBlLCBJVEVSQVRPUikpIHtcbiAgY3JlYXRlTm9uRW51bWVyYWJsZVByb3BlcnR5KEl0ZXJhdG9yUHJvdG90eXBlLCBJVEVSQVRPUiwgcmV0dXJuVGhpcyk7XG59XG5cbm1vZHVsZS5leHBvcnRzID0ge1xuICBJdGVyYXRvclByb3RvdHlwZTogSXRlcmF0b3JQcm90b3R5cGUsXG4gIEJVR0dZX1NBRkFSSV9JVEVSQVRPUlM6IEJVR0dZX1NBRkFSSV9JVEVSQVRPUlNcbn07XG4iLCJtb2R1bGUuZXhwb3J0cyA9IHt9O1xuIiwidmFyIGdsb2JhbCA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9nbG9iYWwnKTtcbnZhciBnZXRPd25Qcm9wZXJ0eURlc2NyaXB0b3IgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvb2JqZWN0LWdldC1vd24tcHJvcGVydHktZGVzY3JpcHRvcicpLmY7XG52YXIgY2xhc3NvZiA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9jbGFzc29mLXJhdycpO1xudmFyIG1hY3JvdGFzayA9IHJlcXVpcmUoJy4uL2ludGVybmFscy90YXNrJykuc2V0O1xudmFyIElTX0lPUyA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9pcy1pb3MnKTtcblxudmFyIE11dGF0aW9uT2JzZXJ2ZXIgPSBnbG9iYWwuTXV0YXRpb25PYnNlcnZlciB8fCBnbG9iYWwuV2ViS2l0TXV0YXRpb25PYnNlcnZlcjtcbnZhciBwcm9jZXNzID0gZ2xvYmFsLnByb2Nlc3M7XG52YXIgUHJvbWlzZSA9IGdsb2JhbC5Qcm9taXNlO1xudmFyIElTX05PREUgPSBjbGFzc29mKHByb2Nlc3MpID09ICdwcm9jZXNzJztcbi8vIE5vZGUuanMgMTEgc2hvd3MgRXhwZXJpbWVudGFsV2FybmluZyBvbiBnZXR0aW5nIGBxdWV1ZU1pY3JvdGFza2BcbnZhciBxdWV1ZU1pY3JvdGFza0Rlc2NyaXB0b3IgPSBnZXRPd25Qcm9wZXJ0eURlc2NyaXB0b3IoZ2xvYmFsLCAncXVldWVNaWNyb3Rhc2snKTtcbnZhciBxdWV1ZU1pY3JvdGFzayA9IHF1ZXVlTWljcm90YXNrRGVzY3JpcHRvciAmJiBxdWV1ZU1pY3JvdGFza0Rlc2NyaXB0b3IudmFsdWU7XG5cbnZhciBmbHVzaCwgaGVhZCwgbGFzdCwgbm90aWZ5LCB0b2dnbGUsIG5vZGUsIHByb21pc2UsIHRoZW47XG5cbi8vIG1vZGVybiBlbmdpbmVzIGhhdmUgcXVldWVNaWNyb3Rhc2sgbWV0aG9kXG5pZiAoIXF1ZXVlTWljcm90YXNrKSB7XG4gIGZsdXNoID0gZnVuY3Rpb24gKCkge1xuICAgIHZhciBwYXJlbnQsIGZuO1xuICAgIGlmIChJU19OT0RFICYmIChwYXJlbnQgPSBwcm9jZXNzLmRvbWFpbikpIHBhcmVudC5leGl0KCk7XG4gICAgd2hpbGUgKGhlYWQpIHtcbiAgICAgIGZuID0gaGVhZC5mbjtcbiAgICAgIGhlYWQgPSBoZWFkLm5leHQ7XG4gICAgICB0cnkge1xuICAgICAgICBmbigpO1xuICAgICAgfSBjYXRjaCAoZXJyb3IpIHtcbiAgICAgICAgaWYgKGhlYWQpIG5vdGlmeSgpO1xuICAgICAgICBlbHNlIGxhc3QgPSB1bmRlZmluZWQ7XG4gICAgICAgIHRocm93IGVycm9yO1xuICAgICAgfVxuICAgIH0gbGFzdCA9IHVuZGVmaW5lZDtcbiAgICBpZiAocGFyZW50KSBwYXJlbnQuZW50ZXIoKTtcbiAgfTtcblxuICAvLyBOb2RlLmpzXG4gIGlmIChJU19OT0RFKSB7XG4gICAgbm90aWZ5ID0gZnVuY3Rpb24gKCkge1xuICAgICAgcHJvY2Vzcy5uZXh0VGljayhmbHVzaCk7XG4gICAgfTtcbiAgLy8gYnJvd3NlcnMgd2l0aCBNdXRhdGlvbk9ic2VydmVyLCBleGNlcHQgaU9TIC0gaHR0cHM6Ly9naXRodWIuY29tL3psb2lyb2NrL2NvcmUtanMvaXNzdWVzLzMzOVxuICB9IGVsc2UgaWYgKE11dGF0aW9uT2JzZXJ2ZXIgJiYgIUlTX0lPUykge1xuICAgIHRvZ2dsZSA9IHRydWU7XG4gICAgbm9kZSA9IGRvY3VtZW50LmNyZWF0ZVRleHROb2RlKCcnKTtcbiAgICBuZXcgTXV0YXRpb25PYnNlcnZlcihmbHVzaCkub2JzZXJ2ZShub2RlLCB7IGNoYXJhY3RlckRhdGE6IHRydWUgfSk7XG4gICAgbm90aWZ5ID0gZnVuY3Rpb24gKCkge1xuICAgICAgbm9kZS5kYXRhID0gdG9nZ2xlID0gIXRvZ2dsZTtcbiAgICB9O1xuICAvLyBlbnZpcm9ubWVudHMgd2l0aCBtYXliZSBub24tY29tcGxldGVseSBjb3JyZWN0LCBidXQgZXhpc3RlbnQgUHJvbWlzZVxuICB9IGVsc2UgaWYgKFByb21pc2UgJiYgUHJvbWlzZS5yZXNvbHZlKSB7XG4gICAgLy8gUHJvbWlzZS5yZXNvbHZlIHdpdGhvdXQgYW4gYXJndW1lbnQgdGhyb3dzIGFuIGVycm9yIGluIExHIFdlYk9TIDJcbiAgICBwcm9taXNlID0gUHJvbWlzZS5yZXNvbHZlKHVuZGVmaW5lZCk7XG4gICAgdGhlbiA9IHByb21pc2UudGhlbjtcbiAgICBub3RpZnkgPSBmdW5jdGlvbiAoKSB7XG4gICAgICB0aGVuLmNhbGwocHJvbWlzZSwgZmx1c2gpO1xuICAgIH07XG4gIC8vIGZvciBvdGhlciBlbnZpcm9ubWVudHMgLSBtYWNyb3Rhc2sgYmFzZWQgb246XG4gIC8vIC0gc2V0SW1tZWRpYXRlXG4gIC8vIC0gTWVzc2FnZUNoYW5uZWxcbiAgLy8gLSB3aW5kb3cucG9zdE1lc3NhZ1xuICAvLyAtIG9ucmVhZHlzdGF0ZWNoYW5nZVxuICAvLyAtIHNldFRpbWVvdXRcbiAgfSBlbHNlIHtcbiAgICBub3RpZnkgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAvLyBzdHJhbmdlIElFICsgd2VicGFjayBkZXYgc2VydmVyIGJ1ZyAtIHVzZSAuY2FsbChnbG9iYWwpXG4gICAgICBtYWNyb3Rhc2suY2FsbChnbG9iYWwsIGZsdXNoKTtcbiAgICB9O1xuICB9XG59XG5cbm1vZHVsZS5leHBvcnRzID0gcXVldWVNaWNyb3Rhc2sgfHwgZnVuY3Rpb24gKGZuKSB7XG4gIHZhciB0YXNrID0geyBmbjogZm4sIG5leHQ6IHVuZGVmaW5lZCB9O1xuICBpZiAobGFzdCkgbGFzdC5uZXh0ID0gdGFzaztcbiAgaWYgKCFoZWFkKSB7XG4gICAgaGVhZCA9IHRhc2s7XG4gICAgbm90aWZ5KCk7XG4gIH0gbGFzdCA9IHRhc2s7XG59O1xuIiwidmFyIGdsb2JhbCA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9nbG9iYWwnKTtcblxubW9kdWxlLmV4cG9ydHMgPSBnbG9iYWwuUHJvbWlzZTtcbiIsInZhciBmYWlscyA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9mYWlscycpO1xuXG5tb2R1bGUuZXhwb3J0cyA9ICEhT2JqZWN0LmdldE93blByb3BlcnR5U3ltYm9scyAmJiAhZmFpbHMoZnVuY3Rpb24gKCkge1xuICAvLyBDaHJvbWUgMzggU3ltYm9sIGhhcyBpbmNvcnJlY3QgdG9TdHJpbmcgY29udmVyc2lvblxuICAvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgbm8tdW5kZWZcbiAgcmV0dXJuICFTdHJpbmcoU3ltYm9sKCkpO1xufSk7XG4iLCJ2YXIgZ2xvYmFsID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL2dsb2JhbCcpO1xudmFyIGluc3BlY3RTb3VyY2UgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvaW5zcGVjdC1zb3VyY2UnKTtcblxudmFyIFdlYWtNYXAgPSBnbG9iYWwuV2Vha01hcDtcblxubW9kdWxlLmV4cG9ydHMgPSB0eXBlb2YgV2Vha01hcCA9PT0gJ2Z1bmN0aW9uJyAmJiAvbmF0aXZlIGNvZGUvLnRlc3QoaW5zcGVjdFNvdXJjZShXZWFrTWFwKSk7XG4iLCIndXNlIHN0cmljdCc7XG52YXIgYUZ1bmN0aW9uID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL2EtZnVuY3Rpb24nKTtcblxudmFyIFByb21pc2VDYXBhYmlsaXR5ID0gZnVuY3Rpb24gKEMpIHtcbiAgdmFyIHJlc29sdmUsIHJlamVjdDtcbiAgdGhpcy5wcm9taXNlID0gbmV3IEMoZnVuY3Rpb24gKCQkcmVzb2x2ZSwgJCRyZWplY3QpIHtcbiAgICBpZiAocmVzb2x2ZSAhPT0gdW5kZWZpbmVkIHx8IHJlamVjdCAhPT0gdW5kZWZpbmVkKSB0aHJvdyBUeXBlRXJyb3IoJ0JhZCBQcm9taXNlIGNvbnN0cnVjdG9yJyk7XG4gICAgcmVzb2x2ZSA9ICQkcmVzb2x2ZTtcbiAgICByZWplY3QgPSAkJHJlamVjdDtcbiAgfSk7XG4gIHRoaXMucmVzb2x2ZSA9IGFGdW5jdGlvbihyZXNvbHZlKTtcbiAgdGhpcy5yZWplY3QgPSBhRnVuY3Rpb24ocmVqZWN0KTtcbn07XG5cbi8vIDI1LjQuMS41IE5ld1Byb21pc2VDYXBhYmlsaXR5KEMpXG5tb2R1bGUuZXhwb3J0cy5mID0gZnVuY3Rpb24gKEMpIHtcbiAgcmV0dXJuIG5ldyBQcm9taXNlQ2FwYWJpbGl0eShDKTtcbn07XG4iLCJ2YXIgYW5PYmplY3QgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvYW4tb2JqZWN0Jyk7XG52YXIgZGVmaW5lUHJvcGVydGllcyA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9vYmplY3QtZGVmaW5lLXByb3BlcnRpZXMnKTtcbnZhciBlbnVtQnVnS2V5cyA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9lbnVtLWJ1Zy1rZXlzJyk7XG52YXIgaGlkZGVuS2V5cyA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9oaWRkZW4ta2V5cycpO1xudmFyIGh0bWwgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvaHRtbCcpO1xudmFyIGRvY3VtZW50Q3JlYXRlRWxlbWVudCA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9kb2N1bWVudC1jcmVhdGUtZWxlbWVudCcpO1xudmFyIHNoYXJlZEtleSA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9zaGFyZWQta2V5Jyk7XG52YXIgSUVfUFJPVE8gPSBzaGFyZWRLZXkoJ0lFX1BST1RPJyk7XG5cbnZhciBQUk9UT1RZUEUgPSAncHJvdG90eXBlJztcbnZhciBFbXB0eSA9IGZ1bmN0aW9uICgpIHsgLyogZW1wdHkgKi8gfTtcblxuLy8gQ3JlYXRlIG9iamVjdCB3aXRoIGZha2UgYG51bGxgIHByb3RvdHlwZTogdXNlIGlmcmFtZSBPYmplY3Qgd2l0aCBjbGVhcmVkIHByb3RvdHlwZVxudmFyIGNyZWF0ZURpY3QgPSBmdW5jdGlvbiAoKSB7XG4gIC8vIFRocmFzaCwgd2FzdGUgYW5kIHNvZG9teTogSUUgR0MgYnVnXG4gIHZhciBpZnJhbWUgPSBkb2N1bWVudENyZWF0ZUVsZW1lbnQoJ2lmcmFtZScpO1xuICB2YXIgbGVuZ3RoID0gZW51bUJ1Z0tleXMubGVuZ3RoO1xuICB2YXIgbHQgPSAnPCc7XG4gIHZhciBzY3JpcHQgPSAnc2NyaXB0JztcbiAgdmFyIGd0ID0gJz4nO1xuICB2YXIganMgPSAnamF2YScgKyBzY3JpcHQgKyAnOic7XG4gIHZhciBpZnJhbWVEb2N1bWVudDtcbiAgaWZyYW1lLnN0eWxlLmRpc3BsYXkgPSAnbm9uZSc7XG4gIGh0bWwuYXBwZW5kQ2hpbGQoaWZyYW1lKTtcbiAgaWZyYW1lLnNyYyA9IFN0cmluZyhqcyk7XG4gIGlmcmFtZURvY3VtZW50ID0gaWZyYW1lLmNvbnRlbnRXaW5kb3cuZG9jdW1lbnQ7XG4gIGlmcmFtZURvY3VtZW50Lm9wZW4oKTtcbiAgaWZyYW1lRG9jdW1lbnQud3JpdGUobHQgKyBzY3JpcHQgKyBndCArICdkb2N1bWVudC5GPU9iamVjdCcgKyBsdCArICcvJyArIHNjcmlwdCArIGd0KTtcbiAgaWZyYW1lRG9jdW1lbnQuY2xvc2UoKTtcbiAgY3JlYXRlRGljdCA9IGlmcmFtZURvY3VtZW50LkY7XG4gIHdoaWxlIChsZW5ndGgtLSkgZGVsZXRlIGNyZWF0ZURpY3RbUFJPVE9UWVBFXVtlbnVtQnVnS2V5c1tsZW5ndGhdXTtcbiAgcmV0dXJuIGNyZWF0ZURpY3QoKTtcbn07XG5cbi8vIGBPYmplY3QuY3JlYXRlYCBtZXRob2Rcbi8vIGh0dHBzOi8vdGMzOS5naXRodWIuaW8vZWNtYTI2Mi8jc2VjLW9iamVjdC5jcmVhdGVcbm1vZHVsZS5leHBvcnRzID0gT2JqZWN0LmNyZWF0ZSB8fCBmdW5jdGlvbiBjcmVhdGUoTywgUHJvcGVydGllcykge1xuICB2YXIgcmVzdWx0O1xuICBpZiAoTyAhPT0gbnVsbCkge1xuICAgIEVtcHR5W1BST1RPVFlQRV0gPSBhbk9iamVjdChPKTtcbiAgICByZXN1bHQgPSBuZXcgRW1wdHkoKTtcbiAgICBFbXB0eVtQUk9UT1RZUEVdID0gbnVsbDtcbiAgICAvLyBhZGQgXCJfX3Byb3RvX19cIiBmb3IgT2JqZWN0LmdldFByb3RvdHlwZU9mIHBvbHlmaWxsXG4gICAgcmVzdWx0W0lFX1BST1RPXSA9IE87XG4gIH0gZWxzZSByZXN1bHQgPSBjcmVhdGVEaWN0KCk7XG4gIHJldHVybiBQcm9wZXJ0aWVzID09PSB1bmRlZmluZWQgPyByZXN1bHQgOiBkZWZpbmVQcm9wZXJ0aWVzKHJlc3VsdCwgUHJvcGVydGllcyk7XG59O1xuXG5oaWRkZW5LZXlzW0lFX1BST1RPXSA9IHRydWU7XG4iLCJ2YXIgREVTQ1JJUFRPUlMgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvZGVzY3JpcHRvcnMnKTtcbnZhciBkZWZpbmVQcm9wZXJ0eU1vZHVsZSA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9vYmplY3QtZGVmaW5lLXByb3BlcnR5Jyk7XG52YXIgYW5PYmplY3QgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvYW4tb2JqZWN0Jyk7XG52YXIgb2JqZWN0S2V5cyA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9vYmplY3Qta2V5cycpO1xuXG4vLyBgT2JqZWN0LmRlZmluZVByb3BlcnRpZXNgIG1ldGhvZFxuLy8gaHR0cHM6Ly90YzM5LmdpdGh1Yi5pby9lY21hMjYyLyNzZWMtb2JqZWN0LmRlZmluZXByb3BlcnRpZXNcbm1vZHVsZS5leHBvcnRzID0gREVTQ1JJUFRPUlMgPyBPYmplY3QuZGVmaW5lUHJvcGVydGllcyA6IGZ1bmN0aW9uIGRlZmluZVByb3BlcnRpZXMoTywgUHJvcGVydGllcykge1xuICBhbk9iamVjdChPKTtcbiAgdmFyIGtleXMgPSBvYmplY3RLZXlzKFByb3BlcnRpZXMpO1xuICB2YXIgbGVuZ3RoID0ga2V5cy5sZW5ndGg7XG4gIHZhciBpbmRleCA9IDA7XG4gIHZhciBrZXk7XG4gIHdoaWxlIChsZW5ndGggPiBpbmRleCkgZGVmaW5lUHJvcGVydHlNb2R1bGUuZihPLCBrZXkgPSBrZXlzW2luZGV4KytdLCBQcm9wZXJ0aWVzW2tleV0pO1xuICByZXR1cm4gTztcbn07XG4iLCJ2YXIgREVTQ1JJUFRPUlMgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvZGVzY3JpcHRvcnMnKTtcbnZhciBJRThfRE9NX0RFRklORSA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9pZTgtZG9tLWRlZmluZScpO1xudmFyIGFuT2JqZWN0ID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL2FuLW9iamVjdCcpO1xudmFyIHRvUHJpbWl0aXZlID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL3RvLXByaW1pdGl2ZScpO1xuXG52YXIgbmF0aXZlRGVmaW5lUHJvcGVydHkgPSBPYmplY3QuZGVmaW5lUHJvcGVydHk7XG5cbi8vIGBPYmplY3QuZGVmaW5lUHJvcGVydHlgIG1ldGhvZFxuLy8gaHR0cHM6Ly90YzM5LmdpdGh1Yi5pby9lY21hMjYyLyNzZWMtb2JqZWN0LmRlZmluZXByb3BlcnR5XG5leHBvcnRzLmYgPSBERVNDUklQVE9SUyA/IG5hdGl2ZURlZmluZVByb3BlcnR5IDogZnVuY3Rpb24gZGVmaW5lUHJvcGVydHkoTywgUCwgQXR0cmlidXRlcykge1xuICBhbk9iamVjdChPKTtcbiAgUCA9IHRvUHJpbWl0aXZlKFAsIHRydWUpO1xuICBhbk9iamVjdChBdHRyaWJ1dGVzKTtcbiAgaWYgKElFOF9ET01fREVGSU5FKSB0cnkge1xuICAgIHJldHVybiBuYXRpdmVEZWZpbmVQcm9wZXJ0eShPLCBQLCBBdHRyaWJ1dGVzKTtcbiAgfSBjYXRjaCAoZXJyb3IpIHsgLyogZW1wdHkgKi8gfVxuICBpZiAoJ2dldCcgaW4gQXR0cmlidXRlcyB8fCAnc2V0JyBpbiBBdHRyaWJ1dGVzKSB0aHJvdyBUeXBlRXJyb3IoJ0FjY2Vzc29ycyBub3Qgc3VwcG9ydGVkJyk7XG4gIGlmICgndmFsdWUnIGluIEF0dHJpYnV0ZXMpIE9bUF0gPSBBdHRyaWJ1dGVzLnZhbHVlO1xuICByZXR1cm4gTztcbn07XG4iLCJ2YXIgREVTQ1JJUFRPUlMgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvZGVzY3JpcHRvcnMnKTtcbnZhciBwcm9wZXJ0eUlzRW51bWVyYWJsZU1vZHVsZSA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9vYmplY3QtcHJvcGVydHktaXMtZW51bWVyYWJsZScpO1xudmFyIGNyZWF0ZVByb3BlcnR5RGVzY3JpcHRvciA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9jcmVhdGUtcHJvcGVydHktZGVzY3JpcHRvcicpO1xudmFyIHRvSW5kZXhlZE9iamVjdCA9IHJlcXVpcmUoJy4uL2ludGVybmFscy90by1pbmRleGVkLW9iamVjdCcpO1xudmFyIHRvUHJpbWl0aXZlID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL3RvLXByaW1pdGl2ZScpO1xudmFyIGhhcyA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9oYXMnKTtcbnZhciBJRThfRE9NX0RFRklORSA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9pZTgtZG9tLWRlZmluZScpO1xuXG52YXIgbmF0aXZlR2V0T3duUHJvcGVydHlEZXNjcmlwdG9yID0gT2JqZWN0LmdldE93blByb3BlcnR5RGVzY3JpcHRvcjtcblxuLy8gYE9iamVjdC5nZXRPd25Qcm9wZXJ0eURlc2NyaXB0b3JgIG1ldGhvZFxuLy8gaHR0cHM6Ly90YzM5LmdpdGh1Yi5pby9lY21hMjYyLyNzZWMtb2JqZWN0LmdldG93bnByb3BlcnR5ZGVzY3JpcHRvclxuZXhwb3J0cy5mID0gREVTQ1JJUFRPUlMgPyBuYXRpdmVHZXRPd25Qcm9wZXJ0eURlc2NyaXB0b3IgOiBmdW5jdGlvbiBnZXRPd25Qcm9wZXJ0eURlc2NyaXB0b3IoTywgUCkge1xuICBPID0gdG9JbmRleGVkT2JqZWN0KE8pO1xuICBQID0gdG9QcmltaXRpdmUoUCwgdHJ1ZSk7XG4gIGlmIChJRThfRE9NX0RFRklORSkgdHJ5IHtcbiAgICByZXR1cm4gbmF0aXZlR2V0T3duUHJvcGVydHlEZXNjcmlwdG9yKE8sIFApO1xuICB9IGNhdGNoIChlcnJvcikgeyAvKiBlbXB0eSAqLyB9XG4gIGlmIChoYXMoTywgUCkpIHJldHVybiBjcmVhdGVQcm9wZXJ0eURlc2NyaXB0b3IoIXByb3BlcnR5SXNFbnVtZXJhYmxlTW9kdWxlLmYuY2FsbChPLCBQKSwgT1tQXSk7XG59O1xuIiwidmFyIGludGVybmFsT2JqZWN0S2V5cyA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9vYmplY3Qta2V5cy1pbnRlcm5hbCcpO1xudmFyIGVudW1CdWdLZXlzID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL2VudW0tYnVnLWtleXMnKTtcblxudmFyIGhpZGRlbktleXMgPSBlbnVtQnVnS2V5cy5jb25jYXQoJ2xlbmd0aCcsICdwcm90b3R5cGUnKTtcblxuLy8gYE9iamVjdC5nZXRPd25Qcm9wZXJ0eU5hbWVzYCBtZXRob2Rcbi8vIGh0dHBzOi8vdGMzOS5naXRodWIuaW8vZWNtYTI2Mi8jc2VjLW9iamVjdC5nZXRvd25wcm9wZXJ0eW5hbWVzXG5leHBvcnRzLmYgPSBPYmplY3QuZ2V0T3duUHJvcGVydHlOYW1lcyB8fCBmdW5jdGlvbiBnZXRPd25Qcm9wZXJ0eU5hbWVzKE8pIHtcbiAgcmV0dXJuIGludGVybmFsT2JqZWN0S2V5cyhPLCBoaWRkZW5LZXlzKTtcbn07XG4iLCJleHBvcnRzLmYgPSBPYmplY3QuZ2V0T3duUHJvcGVydHlTeW1ib2xzO1xuIiwidmFyIGhhcyA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9oYXMnKTtcbnZhciB0b09iamVjdCA9IHJlcXVpcmUoJy4uL2ludGVybmFscy90by1vYmplY3QnKTtcbnZhciBzaGFyZWRLZXkgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvc2hhcmVkLWtleScpO1xudmFyIENPUlJFQ1RfUFJPVE9UWVBFX0dFVFRFUiA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9jb3JyZWN0LXByb3RvdHlwZS1nZXR0ZXInKTtcblxudmFyIElFX1BST1RPID0gc2hhcmVkS2V5KCdJRV9QUk9UTycpO1xudmFyIE9iamVjdFByb3RvdHlwZSA9IE9iamVjdC5wcm90b3R5cGU7XG5cbi8vIGBPYmplY3QuZ2V0UHJvdG90eXBlT2ZgIG1ldGhvZFxuLy8gaHR0cHM6Ly90YzM5LmdpdGh1Yi5pby9lY21hMjYyLyNzZWMtb2JqZWN0LmdldHByb3RvdHlwZW9mXG5tb2R1bGUuZXhwb3J0cyA9IENPUlJFQ1RfUFJPVE9UWVBFX0dFVFRFUiA/IE9iamVjdC5nZXRQcm90b3R5cGVPZiA6IGZ1bmN0aW9uIChPKSB7XG4gIE8gPSB0b09iamVjdChPKTtcbiAgaWYgKGhhcyhPLCBJRV9QUk9UTykpIHJldHVybiBPW0lFX1BST1RPXTtcbiAgaWYgKHR5cGVvZiBPLmNvbnN0cnVjdG9yID09ICdmdW5jdGlvbicgJiYgTyBpbnN0YW5jZW9mIE8uY29uc3RydWN0b3IpIHtcbiAgICByZXR1cm4gTy5jb25zdHJ1Y3Rvci5wcm90b3R5cGU7XG4gIH0gcmV0dXJuIE8gaW5zdGFuY2VvZiBPYmplY3QgPyBPYmplY3RQcm90b3R5cGUgOiBudWxsO1xufTtcbiIsInZhciBoYXMgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvaGFzJyk7XG52YXIgdG9JbmRleGVkT2JqZWN0ID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL3RvLWluZGV4ZWQtb2JqZWN0Jyk7XG52YXIgaW5kZXhPZiA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9hcnJheS1pbmNsdWRlcycpLmluZGV4T2Y7XG52YXIgaGlkZGVuS2V5cyA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9oaWRkZW4ta2V5cycpO1xuXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIChvYmplY3QsIG5hbWVzKSB7XG4gIHZhciBPID0gdG9JbmRleGVkT2JqZWN0KG9iamVjdCk7XG4gIHZhciBpID0gMDtcbiAgdmFyIHJlc3VsdCA9IFtdO1xuICB2YXIga2V5O1xuICBmb3IgKGtleSBpbiBPKSAhaGFzKGhpZGRlbktleXMsIGtleSkgJiYgaGFzKE8sIGtleSkgJiYgcmVzdWx0LnB1c2goa2V5KTtcbiAgLy8gRG9uJ3QgZW51bSBidWcgJiBoaWRkZW4ga2V5c1xuICB3aGlsZSAobmFtZXMubGVuZ3RoID4gaSkgaWYgKGhhcyhPLCBrZXkgPSBuYW1lc1tpKytdKSkge1xuICAgIH5pbmRleE9mKHJlc3VsdCwga2V5KSB8fCByZXN1bHQucHVzaChrZXkpO1xuICB9XG4gIHJldHVybiByZXN1bHQ7XG59O1xuIiwidmFyIGludGVybmFsT2JqZWN0S2V5cyA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9vYmplY3Qta2V5cy1pbnRlcm5hbCcpO1xudmFyIGVudW1CdWdLZXlzID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL2VudW0tYnVnLWtleXMnKTtcblxuLy8gYE9iamVjdC5rZXlzYCBtZXRob2Rcbi8vIGh0dHBzOi8vdGMzOS5naXRodWIuaW8vZWNtYTI2Mi8jc2VjLW9iamVjdC5rZXlzXG5tb2R1bGUuZXhwb3J0cyA9IE9iamVjdC5rZXlzIHx8IGZ1bmN0aW9uIGtleXMoTykge1xuICByZXR1cm4gaW50ZXJuYWxPYmplY3RLZXlzKE8sIGVudW1CdWdLZXlzKTtcbn07XG4iLCIndXNlIHN0cmljdCc7XG52YXIgbmF0aXZlUHJvcGVydHlJc0VudW1lcmFibGUgPSB7fS5wcm9wZXJ0eUlzRW51bWVyYWJsZTtcbnZhciBnZXRPd25Qcm9wZXJ0eURlc2NyaXB0b3IgPSBPYmplY3QuZ2V0T3duUHJvcGVydHlEZXNjcmlwdG9yO1xuXG4vLyBOYXNob3JuIH4gSkRLOCBidWdcbnZhciBOQVNIT1JOX0JVRyA9IGdldE93blByb3BlcnR5RGVzY3JpcHRvciAmJiAhbmF0aXZlUHJvcGVydHlJc0VudW1lcmFibGUuY2FsbCh7IDE6IDIgfSwgMSk7XG5cbi8vIGBPYmplY3QucHJvdG90eXBlLnByb3BlcnR5SXNFbnVtZXJhYmxlYCBtZXRob2QgaW1wbGVtZW50YXRpb25cbi8vIGh0dHBzOi8vdGMzOS5naXRodWIuaW8vZWNtYTI2Mi8jc2VjLW9iamVjdC5wcm90b3R5cGUucHJvcGVydHlpc2VudW1lcmFibGVcbmV4cG9ydHMuZiA9IE5BU0hPUk5fQlVHID8gZnVuY3Rpb24gcHJvcGVydHlJc0VudW1lcmFibGUoVikge1xuICB2YXIgZGVzY3JpcHRvciA9IGdldE93blByb3BlcnR5RGVzY3JpcHRvcih0aGlzLCBWKTtcbiAgcmV0dXJuICEhZGVzY3JpcHRvciAmJiBkZXNjcmlwdG9yLmVudW1lcmFibGU7XG59IDogbmF0aXZlUHJvcGVydHlJc0VudW1lcmFibGU7XG4iLCJ2YXIgYW5PYmplY3QgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvYW4tb2JqZWN0Jyk7XG52YXIgYVBvc3NpYmxlUHJvdG90eXBlID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL2EtcG9zc2libGUtcHJvdG90eXBlJyk7XG5cbi8vIGBPYmplY3Quc2V0UHJvdG90eXBlT2ZgIG1ldGhvZFxuLy8gaHR0cHM6Ly90YzM5LmdpdGh1Yi5pby9lY21hMjYyLyNzZWMtb2JqZWN0LnNldHByb3RvdHlwZW9mXG4vLyBXb3JrcyB3aXRoIF9fcHJvdG9fXyBvbmx5LiBPbGQgdjggY2FuJ3Qgd29yayB3aXRoIG51bGwgcHJvdG8gb2JqZWN0cy5cbi8qIGVzbGludC1kaXNhYmxlIG5vLXByb3RvICovXG5tb2R1bGUuZXhwb3J0cyA9IE9iamVjdC5zZXRQcm90b3R5cGVPZiB8fCAoJ19fcHJvdG9fXycgaW4ge30gPyBmdW5jdGlvbiAoKSB7XG4gIHZhciBDT1JSRUNUX1NFVFRFUiA9IGZhbHNlO1xuICB2YXIgdGVzdCA9IHt9O1xuICB2YXIgc2V0dGVyO1xuICB0cnkge1xuICAgIHNldHRlciA9IE9iamVjdC5nZXRPd25Qcm9wZXJ0eURlc2NyaXB0b3IoT2JqZWN0LnByb3RvdHlwZSwgJ19fcHJvdG9fXycpLnNldDtcbiAgICBzZXR0ZXIuY2FsbCh0ZXN0LCBbXSk7XG4gICAgQ09SUkVDVF9TRVRURVIgPSB0ZXN0IGluc3RhbmNlb2YgQXJyYXk7XG4gIH0gY2F0Y2ggKGVycm9yKSB7IC8qIGVtcHR5ICovIH1cbiAgcmV0dXJuIGZ1bmN0aW9uIHNldFByb3RvdHlwZU9mKE8sIHByb3RvKSB7XG4gICAgYW5PYmplY3QoTyk7XG4gICAgYVBvc3NpYmxlUHJvdG90eXBlKHByb3RvKTtcbiAgICBpZiAoQ09SUkVDVF9TRVRURVIpIHNldHRlci5jYWxsKE8sIHByb3RvKTtcbiAgICBlbHNlIE8uX19wcm90b19fID0gcHJvdG87XG4gICAgcmV0dXJuIE87XG4gIH07XG59KCkgOiB1bmRlZmluZWQpO1xuIiwidmFyIERFU0NSSVBUT1JTID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL2Rlc2NyaXB0b3JzJyk7XG52YXIgb2JqZWN0S2V5cyA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9vYmplY3Qta2V5cycpO1xudmFyIHRvSW5kZXhlZE9iamVjdCA9IHJlcXVpcmUoJy4uL2ludGVybmFscy90by1pbmRleGVkLW9iamVjdCcpO1xudmFyIHByb3BlcnR5SXNFbnVtZXJhYmxlID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL29iamVjdC1wcm9wZXJ0eS1pcy1lbnVtZXJhYmxlJykuZjtcblxuLy8gYE9iamVjdC57IGVudHJpZXMsIHZhbHVlcyB9YCBtZXRob2RzIGltcGxlbWVudGF0aW9uXG52YXIgY3JlYXRlTWV0aG9kID0gZnVuY3Rpb24gKFRPX0VOVFJJRVMpIHtcbiAgcmV0dXJuIGZ1bmN0aW9uIChpdCkge1xuICAgIHZhciBPID0gdG9JbmRleGVkT2JqZWN0KGl0KTtcbiAgICB2YXIga2V5cyA9IG9iamVjdEtleXMoTyk7XG4gICAgdmFyIGxlbmd0aCA9IGtleXMubGVuZ3RoO1xuICAgIHZhciBpID0gMDtcbiAgICB2YXIgcmVzdWx0ID0gW107XG4gICAgdmFyIGtleTtcbiAgICB3aGlsZSAobGVuZ3RoID4gaSkge1xuICAgICAga2V5ID0ga2V5c1tpKytdO1xuICAgICAgaWYgKCFERVNDUklQVE9SUyB8fCBwcm9wZXJ0eUlzRW51bWVyYWJsZS5jYWxsKE8sIGtleSkpIHtcbiAgICAgICAgcmVzdWx0LnB1c2goVE9fRU5UUklFUyA/IFtrZXksIE9ba2V5XV0gOiBPW2tleV0pO1xuICAgICAgfVxuICAgIH1cbiAgICByZXR1cm4gcmVzdWx0O1xuICB9O1xufTtcblxubW9kdWxlLmV4cG9ydHMgPSB7XG4gIC8vIGBPYmplY3QuZW50cmllc2AgbWV0aG9kXG4gIC8vIGh0dHBzOi8vdGMzOS5naXRodWIuaW8vZWNtYTI2Mi8jc2VjLW9iamVjdC5lbnRyaWVzXG4gIGVudHJpZXM6IGNyZWF0ZU1ldGhvZCh0cnVlKSxcbiAgLy8gYE9iamVjdC52YWx1ZXNgIG1ldGhvZFxuICAvLyBodHRwczovL3RjMzkuZ2l0aHViLmlvL2VjbWEyNjIvI3NlYy1vYmplY3QudmFsdWVzXG4gIHZhbHVlczogY3JlYXRlTWV0aG9kKGZhbHNlKVxufTtcbiIsIid1c2Ugc3RyaWN0JztcbnZhciBUT19TVFJJTkdfVEFHX1NVUFBPUlQgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvdG8tc3RyaW5nLXRhZy1zdXBwb3J0Jyk7XG52YXIgY2xhc3NvZiA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9jbGFzc29mJyk7XG5cbi8vIGBPYmplY3QucHJvdG90eXBlLnRvU3RyaW5nYCBtZXRob2QgaW1wbGVtZW50YXRpb25cbi8vIGh0dHBzOi8vdGMzOS5naXRodWIuaW8vZWNtYTI2Mi8jc2VjLW9iamVjdC5wcm90b3R5cGUudG9zdHJpbmdcbm1vZHVsZS5leHBvcnRzID0gVE9fU1RSSU5HX1RBR19TVVBQT1JUID8ge30udG9TdHJpbmcgOiBmdW5jdGlvbiB0b1N0cmluZygpIHtcbiAgcmV0dXJuICdbb2JqZWN0ICcgKyBjbGFzc29mKHRoaXMpICsgJ10nO1xufTtcbiIsInZhciBnZXRCdWlsdEluID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL2dldC1idWlsdC1pbicpO1xudmFyIGdldE93blByb3BlcnR5TmFtZXNNb2R1bGUgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvb2JqZWN0LWdldC1vd24tcHJvcGVydHktbmFtZXMnKTtcbnZhciBnZXRPd25Qcm9wZXJ0eVN5bWJvbHNNb2R1bGUgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvb2JqZWN0LWdldC1vd24tcHJvcGVydHktc3ltYm9scycpO1xudmFyIGFuT2JqZWN0ID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL2FuLW9iamVjdCcpO1xuXG4vLyBhbGwgb2JqZWN0IGtleXMsIGluY2x1ZGVzIG5vbi1lbnVtZXJhYmxlIGFuZCBzeW1ib2xzXG5tb2R1bGUuZXhwb3J0cyA9IGdldEJ1aWx0SW4oJ1JlZmxlY3QnLCAnb3duS2V5cycpIHx8IGZ1bmN0aW9uIG93bktleXMoaXQpIHtcbiAgdmFyIGtleXMgPSBnZXRPd25Qcm9wZXJ0eU5hbWVzTW9kdWxlLmYoYW5PYmplY3QoaXQpKTtcbiAgdmFyIGdldE93blByb3BlcnR5U3ltYm9scyA9IGdldE93blByb3BlcnR5U3ltYm9sc01vZHVsZS5mO1xuICByZXR1cm4gZ2V0T3duUHJvcGVydHlTeW1ib2xzID8ga2V5cy5jb25jYXQoZ2V0T3duUHJvcGVydHlTeW1ib2xzKGl0KSkgOiBrZXlzO1xufTtcbiIsInZhciBnbG9iYWwgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvZ2xvYmFsJyk7XG5cbm1vZHVsZS5leHBvcnRzID0gZ2xvYmFsO1xuIiwibW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiAoZXhlYykge1xuICB0cnkge1xuICAgIHJldHVybiB7IGVycm9yOiBmYWxzZSwgdmFsdWU6IGV4ZWMoKSB9O1xuICB9IGNhdGNoIChlcnJvcikge1xuICAgIHJldHVybiB7IGVycm9yOiB0cnVlLCB2YWx1ZTogZXJyb3IgfTtcbiAgfVxufTtcbiIsInZhciBhbk9iamVjdCA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9hbi1vYmplY3QnKTtcbnZhciBpc09iamVjdCA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9pcy1vYmplY3QnKTtcbnZhciBuZXdQcm9taXNlQ2FwYWJpbGl0eSA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9uZXctcHJvbWlzZS1jYXBhYmlsaXR5Jyk7XG5cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gKEMsIHgpIHtcbiAgYW5PYmplY3QoQyk7XG4gIGlmIChpc09iamVjdCh4KSAmJiB4LmNvbnN0cnVjdG9yID09PSBDKSByZXR1cm4geDtcbiAgdmFyIHByb21pc2VDYXBhYmlsaXR5ID0gbmV3UHJvbWlzZUNhcGFiaWxpdHkuZihDKTtcbiAgdmFyIHJlc29sdmUgPSBwcm9taXNlQ2FwYWJpbGl0eS5yZXNvbHZlO1xuICByZXNvbHZlKHgpO1xuICByZXR1cm4gcHJvbWlzZUNhcGFiaWxpdHkucHJvbWlzZTtcbn07XG4iLCJ2YXIgcmVkZWZpbmUgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvcmVkZWZpbmUnKTtcblxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiAodGFyZ2V0LCBzcmMsIG9wdGlvbnMpIHtcbiAgZm9yICh2YXIga2V5IGluIHNyYykgcmVkZWZpbmUodGFyZ2V0LCBrZXksIHNyY1trZXldLCBvcHRpb25zKTtcbiAgcmV0dXJuIHRhcmdldDtcbn07XG4iLCJ2YXIgZ2xvYmFsID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL2dsb2JhbCcpO1xudmFyIGNyZWF0ZU5vbkVudW1lcmFibGVQcm9wZXJ0eSA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9jcmVhdGUtbm9uLWVudW1lcmFibGUtcHJvcGVydHknKTtcbnZhciBoYXMgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvaGFzJyk7XG52YXIgc2V0R2xvYmFsID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL3NldC1nbG9iYWwnKTtcbnZhciBpbnNwZWN0U291cmNlID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL2luc3BlY3Qtc291cmNlJyk7XG52YXIgSW50ZXJuYWxTdGF0ZU1vZHVsZSA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9pbnRlcm5hbC1zdGF0ZScpO1xuXG52YXIgZ2V0SW50ZXJuYWxTdGF0ZSA9IEludGVybmFsU3RhdGVNb2R1bGUuZ2V0O1xudmFyIGVuZm9yY2VJbnRlcm5hbFN0YXRlID0gSW50ZXJuYWxTdGF0ZU1vZHVsZS5lbmZvcmNlO1xudmFyIFRFTVBMQVRFID0gU3RyaW5nKFN0cmluZykuc3BsaXQoJ1N0cmluZycpO1xuXG4obW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiAoTywga2V5LCB2YWx1ZSwgb3B0aW9ucykge1xuICB2YXIgdW5zYWZlID0gb3B0aW9ucyA/ICEhb3B0aW9ucy51bnNhZmUgOiBmYWxzZTtcbiAgdmFyIHNpbXBsZSA9IG9wdGlvbnMgPyAhIW9wdGlvbnMuZW51bWVyYWJsZSA6IGZhbHNlO1xuICB2YXIgbm9UYXJnZXRHZXQgPSBvcHRpb25zID8gISFvcHRpb25zLm5vVGFyZ2V0R2V0IDogZmFsc2U7XG4gIGlmICh0eXBlb2YgdmFsdWUgPT0gJ2Z1bmN0aW9uJykge1xuICAgIGlmICh0eXBlb2Yga2V5ID09ICdzdHJpbmcnICYmICFoYXModmFsdWUsICduYW1lJykpIGNyZWF0ZU5vbkVudW1lcmFibGVQcm9wZXJ0eSh2YWx1ZSwgJ25hbWUnLCBrZXkpO1xuICAgIGVuZm9yY2VJbnRlcm5hbFN0YXRlKHZhbHVlKS5zb3VyY2UgPSBURU1QTEFURS5qb2luKHR5cGVvZiBrZXkgPT0gJ3N0cmluZycgPyBrZXkgOiAnJyk7XG4gIH1cbiAgaWYgKE8gPT09IGdsb2JhbCkge1xuICAgIGlmIChzaW1wbGUpIE9ba2V5XSA9IHZhbHVlO1xuICAgIGVsc2Ugc2V0R2xvYmFsKGtleSwgdmFsdWUpO1xuICAgIHJldHVybjtcbiAgfSBlbHNlIGlmICghdW5zYWZlKSB7XG4gICAgZGVsZXRlIE9ba2V5XTtcbiAgfSBlbHNlIGlmICghbm9UYXJnZXRHZXQgJiYgT1trZXldKSB7XG4gICAgc2ltcGxlID0gdHJ1ZTtcbiAgfVxuICBpZiAoc2ltcGxlKSBPW2tleV0gPSB2YWx1ZTtcbiAgZWxzZSBjcmVhdGVOb25FbnVtZXJhYmxlUHJvcGVydHkoTywga2V5LCB2YWx1ZSk7XG4vLyBhZGQgZmFrZSBGdW5jdGlvbiN0b1N0cmluZyBmb3IgY29ycmVjdCB3b3JrIHdyYXBwZWQgbWV0aG9kcyAvIGNvbnN0cnVjdG9ycyB3aXRoIG1ldGhvZHMgbGlrZSBMb0Rhc2ggaXNOYXRpdmVcbn0pKEZ1bmN0aW9uLnByb3RvdHlwZSwgJ3RvU3RyaW5nJywgZnVuY3Rpb24gdG9TdHJpbmcoKSB7XG4gIHJldHVybiB0eXBlb2YgdGhpcyA9PSAnZnVuY3Rpb24nICYmIGdldEludGVybmFsU3RhdGUodGhpcykuc291cmNlIHx8IGluc3BlY3RTb3VyY2UodGhpcyk7XG59KTtcbiIsIi8vIGBSZXF1aXJlT2JqZWN0Q29lcmNpYmxlYCBhYnN0cmFjdCBvcGVyYXRpb25cbi8vIGh0dHBzOi8vdGMzOS5naXRodWIuaW8vZWNtYTI2Mi8jc2VjLXJlcXVpcmVvYmplY3Rjb2VyY2libGVcbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gKGl0KSB7XG4gIGlmIChpdCA9PSB1bmRlZmluZWQpIHRocm93IFR5cGVFcnJvcihcIkNhbid0IGNhbGwgbWV0aG9kIG9uIFwiICsgaXQpO1xuICByZXR1cm4gaXQ7XG59O1xuIiwidmFyIGdsb2JhbCA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9nbG9iYWwnKTtcbnZhciBjcmVhdGVOb25FbnVtZXJhYmxlUHJvcGVydHkgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvY3JlYXRlLW5vbi1lbnVtZXJhYmxlLXByb3BlcnR5Jyk7XG5cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gKGtleSwgdmFsdWUpIHtcbiAgdHJ5IHtcbiAgICBjcmVhdGVOb25FbnVtZXJhYmxlUHJvcGVydHkoZ2xvYmFsLCBrZXksIHZhbHVlKTtcbiAgfSBjYXRjaCAoZXJyb3IpIHtcbiAgICBnbG9iYWxba2V5XSA9IHZhbHVlO1xuICB9IHJldHVybiB2YWx1ZTtcbn07XG4iLCIndXNlIHN0cmljdCc7XG52YXIgZ2V0QnVpbHRJbiA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9nZXQtYnVpbHQtaW4nKTtcbnZhciBkZWZpbmVQcm9wZXJ0eU1vZHVsZSA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9vYmplY3QtZGVmaW5lLXByb3BlcnR5Jyk7XG52YXIgd2VsbEtub3duU3ltYm9sID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL3dlbGwta25vd24tc3ltYm9sJyk7XG52YXIgREVTQ1JJUFRPUlMgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvZGVzY3JpcHRvcnMnKTtcblxudmFyIFNQRUNJRVMgPSB3ZWxsS25vd25TeW1ib2woJ3NwZWNpZXMnKTtcblxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiAoQ09OU1RSVUNUT1JfTkFNRSkge1xuICB2YXIgQ29uc3RydWN0b3IgPSBnZXRCdWlsdEluKENPTlNUUlVDVE9SX05BTUUpO1xuICB2YXIgZGVmaW5lUHJvcGVydHkgPSBkZWZpbmVQcm9wZXJ0eU1vZHVsZS5mO1xuXG4gIGlmIChERVNDUklQVE9SUyAmJiBDb25zdHJ1Y3RvciAmJiAhQ29uc3RydWN0b3JbU1BFQ0lFU10pIHtcbiAgICBkZWZpbmVQcm9wZXJ0eShDb25zdHJ1Y3RvciwgU1BFQ0lFUywge1xuICAgICAgY29uZmlndXJhYmxlOiB0cnVlLFxuICAgICAgZ2V0OiBmdW5jdGlvbiAoKSB7IHJldHVybiB0aGlzOyB9XG4gICAgfSk7XG4gIH1cbn07XG4iLCJ2YXIgZGVmaW5lUHJvcGVydHkgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvb2JqZWN0LWRlZmluZS1wcm9wZXJ0eScpLmY7XG52YXIgaGFzID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL2hhcycpO1xudmFyIHdlbGxLbm93blN5bWJvbCA9IHJlcXVpcmUoJy4uL2ludGVybmFscy93ZWxsLWtub3duLXN5bWJvbCcpO1xuXG52YXIgVE9fU1RSSU5HX1RBRyA9IHdlbGxLbm93blN5bWJvbCgndG9TdHJpbmdUYWcnKTtcblxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiAoaXQsIFRBRywgU1RBVElDKSB7XG4gIGlmIChpdCAmJiAhaGFzKGl0ID0gU1RBVElDID8gaXQgOiBpdC5wcm90b3R5cGUsIFRPX1NUUklOR19UQUcpKSB7XG4gICAgZGVmaW5lUHJvcGVydHkoaXQsIFRPX1NUUklOR19UQUcsIHsgY29uZmlndXJhYmxlOiB0cnVlLCB2YWx1ZTogVEFHIH0pO1xuICB9XG59O1xuIiwidmFyIHNoYXJlZCA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9zaGFyZWQnKTtcbnZhciB1aWQgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvdWlkJyk7XG5cbnZhciBrZXlzID0gc2hhcmVkKCdrZXlzJyk7XG5cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gKGtleSkge1xuICByZXR1cm4ga2V5c1trZXldIHx8IChrZXlzW2tleV0gPSB1aWQoa2V5KSk7XG59O1xuIiwidmFyIGdsb2JhbCA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9nbG9iYWwnKTtcbnZhciBzZXRHbG9iYWwgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvc2V0LWdsb2JhbCcpO1xuXG52YXIgU0hBUkVEID0gJ19fY29yZS1qc19zaGFyZWRfXyc7XG52YXIgc3RvcmUgPSBnbG9iYWxbU0hBUkVEXSB8fCBzZXRHbG9iYWwoU0hBUkVELCB7fSk7XG5cbm1vZHVsZS5leHBvcnRzID0gc3RvcmU7XG4iLCJ2YXIgSVNfUFVSRSA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9pcy1wdXJlJyk7XG52YXIgc3RvcmUgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvc2hhcmVkLXN0b3JlJyk7XG5cbihtb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIChrZXksIHZhbHVlKSB7XG4gIHJldHVybiBzdG9yZVtrZXldIHx8IChzdG9yZVtrZXldID0gdmFsdWUgIT09IHVuZGVmaW5lZCA/IHZhbHVlIDoge30pO1xufSkoJ3ZlcnNpb25zJywgW10pLnB1c2goe1xuICB2ZXJzaW9uOiAnMy40LjgnLFxuICBtb2RlOiBJU19QVVJFID8gJ3B1cmUnIDogJ2dsb2JhbCcsXG4gIGNvcHlyaWdodDogJ8KpIDIwMTkgRGVuaXMgUHVzaGthcmV2ICh6bG9pcm9jay5ydSknXG59KTtcbiIsIid1c2Ugc3RyaWN0JztcbnZhciBmYWlscyA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9mYWlscycpO1xuXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIChNRVRIT0RfTkFNRSwgYXJndW1lbnQpIHtcbiAgdmFyIG1ldGhvZCA9IFtdW01FVEhPRF9OQU1FXTtcbiAgcmV0dXJuICFtZXRob2QgfHwgIWZhaWxzKGZ1bmN0aW9uICgpIHtcbiAgICAvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgbm8tdXNlbGVzcy1jYWxsLG5vLXRocm93LWxpdGVyYWxcbiAgICBtZXRob2QuY2FsbChudWxsLCBhcmd1bWVudCB8fCBmdW5jdGlvbiAoKSB7IHRocm93IDE7IH0sIDEpO1xuICB9KTtcbn07XG4iLCJ2YXIgYW5PYmplY3QgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvYW4tb2JqZWN0Jyk7XG52YXIgYUZ1bmN0aW9uID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL2EtZnVuY3Rpb24nKTtcbnZhciB3ZWxsS25vd25TeW1ib2wgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvd2VsbC1rbm93bi1zeW1ib2wnKTtcblxudmFyIFNQRUNJRVMgPSB3ZWxsS25vd25TeW1ib2woJ3NwZWNpZXMnKTtcblxuLy8gYFNwZWNpZXNDb25zdHJ1Y3RvcmAgYWJzdHJhY3Qgb3BlcmF0aW9uXG4vLyBodHRwczovL3RjMzkuZ2l0aHViLmlvL2VjbWEyNjIvI3NlYy1zcGVjaWVzY29uc3RydWN0b3Jcbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gKE8sIGRlZmF1bHRDb25zdHJ1Y3Rvcikge1xuICB2YXIgQyA9IGFuT2JqZWN0KE8pLmNvbnN0cnVjdG9yO1xuICB2YXIgUztcbiAgcmV0dXJuIEMgPT09IHVuZGVmaW5lZCB8fCAoUyA9IGFuT2JqZWN0KEMpW1NQRUNJRVNdKSA9PSB1bmRlZmluZWQgPyBkZWZhdWx0Q29uc3RydWN0b3IgOiBhRnVuY3Rpb24oUyk7XG59O1xuIiwidmFyIHRvSW50ZWdlciA9IHJlcXVpcmUoJy4uL2ludGVybmFscy90by1pbnRlZ2VyJyk7XG52YXIgcmVxdWlyZU9iamVjdENvZXJjaWJsZSA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9yZXF1aXJlLW9iamVjdC1jb2VyY2libGUnKTtcblxuLy8gYFN0cmluZy5wcm90b3R5cGUueyBjb2RlUG9pbnRBdCwgYXQgfWAgbWV0aG9kcyBpbXBsZW1lbnRhdGlvblxudmFyIGNyZWF0ZU1ldGhvZCA9IGZ1bmN0aW9uIChDT05WRVJUX1RPX1NUUklORykge1xuICByZXR1cm4gZnVuY3Rpb24gKCR0aGlzLCBwb3MpIHtcbiAgICB2YXIgUyA9IFN0cmluZyhyZXF1aXJlT2JqZWN0Q29lcmNpYmxlKCR0aGlzKSk7XG4gICAgdmFyIHBvc2l0aW9uID0gdG9JbnRlZ2VyKHBvcyk7XG4gICAgdmFyIHNpemUgPSBTLmxlbmd0aDtcbiAgICB2YXIgZmlyc3QsIHNlY29uZDtcbiAgICBpZiAocG9zaXRpb24gPCAwIHx8IHBvc2l0aW9uID49IHNpemUpIHJldHVybiBDT05WRVJUX1RPX1NUUklORyA/ICcnIDogdW5kZWZpbmVkO1xuICAgIGZpcnN0ID0gUy5jaGFyQ29kZUF0KHBvc2l0aW9uKTtcbiAgICByZXR1cm4gZmlyc3QgPCAweEQ4MDAgfHwgZmlyc3QgPiAweERCRkYgfHwgcG9zaXRpb24gKyAxID09PSBzaXplXG4gICAgICB8fCAoc2Vjb25kID0gUy5jaGFyQ29kZUF0KHBvc2l0aW9uICsgMSkpIDwgMHhEQzAwIHx8IHNlY29uZCA+IDB4REZGRlxuICAgICAgICA/IENPTlZFUlRfVE9fU1RSSU5HID8gUy5jaGFyQXQocG9zaXRpb24pIDogZmlyc3RcbiAgICAgICAgOiBDT05WRVJUX1RPX1NUUklORyA/IFMuc2xpY2UocG9zaXRpb24sIHBvc2l0aW9uICsgMikgOiAoZmlyc3QgLSAweEQ4MDAgPDwgMTApICsgKHNlY29uZCAtIDB4REMwMCkgKyAweDEwMDAwO1xuICB9O1xufTtcblxubW9kdWxlLmV4cG9ydHMgPSB7XG4gIC8vIGBTdHJpbmcucHJvdG90eXBlLmNvZGVQb2ludEF0YCBtZXRob2RcbiAgLy8gaHR0cHM6Ly90YzM5LmdpdGh1Yi5pby9lY21hMjYyLyNzZWMtc3RyaW5nLnByb3RvdHlwZS5jb2RlcG9pbnRhdFxuICBjb2RlQXQ6IGNyZWF0ZU1ldGhvZChmYWxzZSksXG4gIC8vIGBTdHJpbmcucHJvdG90eXBlLmF0YCBtZXRob2RcbiAgLy8gaHR0cHM6Ly9naXRodWIuY29tL21hdGhpYXNieW5lbnMvU3RyaW5nLnByb3RvdHlwZS5hdFxuICBjaGFyQXQ6IGNyZWF0ZU1ldGhvZCh0cnVlKVxufTtcbiIsInZhciBnbG9iYWwgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvZ2xvYmFsJyk7XG52YXIgZmFpbHMgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvZmFpbHMnKTtcbnZhciBjbGFzc29mID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL2NsYXNzb2YtcmF3Jyk7XG52YXIgYmluZCA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9iaW5kLWNvbnRleHQnKTtcbnZhciBodG1sID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL2h0bWwnKTtcbnZhciBjcmVhdGVFbGVtZW50ID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL2RvY3VtZW50LWNyZWF0ZS1lbGVtZW50Jyk7XG52YXIgSVNfSU9TID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL2lzLWlvcycpO1xuXG52YXIgbG9jYXRpb24gPSBnbG9iYWwubG9jYXRpb247XG52YXIgc2V0ID0gZ2xvYmFsLnNldEltbWVkaWF0ZTtcbnZhciBjbGVhciA9IGdsb2JhbC5jbGVhckltbWVkaWF0ZTtcbnZhciBwcm9jZXNzID0gZ2xvYmFsLnByb2Nlc3M7XG52YXIgTWVzc2FnZUNoYW5uZWwgPSBnbG9iYWwuTWVzc2FnZUNoYW5uZWw7XG52YXIgRGlzcGF0Y2ggPSBnbG9iYWwuRGlzcGF0Y2g7XG52YXIgY291bnRlciA9IDA7XG52YXIgcXVldWUgPSB7fTtcbnZhciBPTlJFQURZU1RBVEVDSEFOR0UgPSAnb25yZWFkeXN0YXRlY2hhbmdlJztcbnZhciBkZWZlciwgY2hhbm5lbCwgcG9ydDtcblxudmFyIHJ1biA9IGZ1bmN0aW9uIChpZCkge1xuICAvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgbm8tcHJvdG90eXBlLWJ1aWx0aW5zXG4gIGlmIChxdWV1ZS5oYXNPd25Qcm9wZXJ0eShpZCkpIHtcbiAgICB2YXIgZm4gPSBxdWV1ZVtpZF07XG4gICAgZGVsZXRlIHF1ZXVlW2lkXTtcbiAgICBmbigpO1xuICB9XG59O1xuXG52YXIgcnVubmVyID0gZnVuY3Rpb24gKGlkKSB7XG4gIHJldHVybiBmdW5jdGlvbiAoKSB7XG4gICAgcnVuKGlkKTtcbiAgfTtcbn07XG5cbnZhciBsaXN0ZW5lciA9IGZ1bmN0aW9uIChldmVudCkge1xuICBydW4oZXZlbnQuZGF0YSk7XG59O1xuXG52YXIgcG9zdCA9IGZ1bmN0aW9uIChpZCkge1xuICAvLyBvbGQgZW5naW5lcyBoYXZlIG5vdCBsb2NhdGlvbi5vcmlnaW5cbiAgZ2xvYmFsLnBvc3RNZXNzYWdlKGlkICsgJycsIGxvY2F0aW9uLnByb3RvY29sICsgJy8vJyArIGxvY2F0aW9uLmhvc3QpO1xufTtcblxuLy8gTm9kZS5qcyAwLjkrICYgSUUxMCsgaGFzIHNldEltbWVkaWF0ZSwgb3RoZXJ3aXNlOlxuaWYgKCFzZXQgfHwgIWNsZWFyKSB7XG4gIHNldCA9IGZ1bmN0aW9uIHNldEltbWVkaWF0ZShmbikge1xuICAgIHZhciBhcmdzID0gW107XG4gICAgdmFyIGkgPSAxO1xuICAgIHdoaWxlIChhcmd1bWVudHMubGVuZ3RoID4gaSkgYXJncy5wdXNoKGFyZ3VtZW50c1tpKytdKTtcbiAgICBxdWV1ZVsrK2NvdW50ZXJdID0gZnVuY3Rpb24gKCkge1xuICAgICAgLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIG5vLW5ldy1mdW5jXG4gICAgICAodHlwZW9mIGZuID09ICdmdW5jdGlvbicgPyBmbiA6IEZ1bmN0aW9uKGZuKSkuYXBwbHkodW5kZWZpbmVkLCBhcmdzKTtcbiAgICB9O1xuICAgIGRlZmVyKGNvdW50ZXIpO1xuICAgIHJldHVybiBjb3VudGVyO1xuICB9O1xuICBjbGVhciA9IGZ1bmN0aW9uIGNsZWFySW1tZWRpYXRlKGlkKSB7XG4gICAgZGVsZXRlIHF1ZXVlW2lkXTtcbiAgfTtcbiAgLy8gTm9kZS5qcyAwLjgtXG4gIGlmIChjbGFzc29mKHByb2Nlc3MpID09ICdwcm9jZXNzJykge1xuICAgIGRlZmVyID0gZnVuY3Rpb24gKGlkKSB7XG4gICAgICBwcm9jZXNzLm5leHRUaWNrKHJ1bm5lcihpZCkpO1xuICAgIH07XG4gIC8vIFNwaGVyZSAoSlMgZ2FtZSBlbmdpbmUpIERpc3BhdGNoIEFQSVxuICB9IGVsc2UgaWYgKERpc3BhdGNoICYmIERpc3BhdGNoLm5vdykge1xuICAgIGRlZmVyID0gZnVuY3Rpb24gKGlkKSB7XG4gICAgICBEaXNwYXRjaC5ub3cocnVubmVyKGlkKSk7XG4gICAgfTtcbiAgLy8gQnJvd3NlcnMgd2l0aCBNZXNzYWdlQ2hhbm5lbCwgaW5jbHVkZXMgV2ViV29ya2Vyc1xuICAvLyBleGNlcHQgaU9TIC0gaHR0cHM6Ly9naXRodWIuY29tL3psb2lyb2NrL2NvcmUtanMvaXNzdWVzLzYyNFxuICB9IGVsc2UgaWYgKE1lc3NhZ2VDaGFubmVsICYmICFJU19JT1MpIHtcbiAgICBjaGFubmVsID0gbmV3IE1lc3NhZ2VDaGFubmVsKCk7XG4gICAgcG9ydCA9IGNoYW5uZWwucG9ydDI7XG4gICAgY2hhbm5lbC5wb3J0MS5vbm1lc3NhZ2UgPSBsaXN0ZW5lcjtcbiAgICBkZWZlciA9IGJpbmQocG9ydC5wb3N0TWVzc2FnZSwgcG9ydCwgMSk7XG4gIC8vIEJyb3dzZXJzIHdpdGggcG9zdE1lc3NhZ2UsIHNraXAgV2ViV29ya2Vyc1xuICAvLyBJRTggaGFzIHBvc3RNZXNzYWdlLCBidXQgaXQncyBzeW5jICYgdHlwZW9mIGl0cyBwb3N0TWVzc2FnZSBpcyAnb2JqZWN0J1xuICB9IGVsc2UgaWYgKGdsb2JhbC5hZGRFdmVudExpc3RlbmVyICYmIHR5cGVvZiBwb3N0TWVzc2FnZSA9PSAnZnVuY3Rpb24nICYmICFnbG9iYWwuaW1wb3J0U2NyaXB0cyAmJiAhZmFpbHMocG9zdCkpIHtcbiAgICBkZWZlciA9IHBvc3Q7XG4gICAgZ2xvYmFsLmFkZEV2ZW50TGlzdGVuZXIoJ21lc3NhZ2UnLCBsaXN0ZW5lciwgZmFsc2UpO1xuICAvLyBJRTgtXG4gIH0gZWxzZSBpZiAoT05SRUFEWVNUQVRFQ0hBTkdFIGluIGNyZWF0ZUVsZW1lbnQoJ3NjcmlwdCcpKSB7XG4gICAgZGVmZXIgPSBmdW5jdGlvbiAoaWQpIHtcbiAgICAgIGh0bWwuYXBwZW5kQ2hpbGQoY3JlYXRlRWxlbWVudCgnc2NyaXB0JykpW09OUkVBRFlTVEFURUNIQU5HRV0gPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgIGh0bWwucmVtb3ZlQ2hpbGQodGhpcyk7XG4gICAgICAgIHJ1bihpZCk7XG4gICAgICB9O1xuICAgIH07XG4gIC8vIFJlc3Qgb2xkIGJyb3dzZXJzXG4gIH0gZWxzZSB7XG4gICAgZGVmZXIgPSBmdW5jdGlvbiAoaWQpIHtcbiAgICAgIHNldFRpbWVvdXQocnVubmVyKGlkKSwgMCk7XG4gICAgfTtcbiAgfVxufVxuXG5tb2R1bGUuZXhwb3J0cyA9IHtcbiAgc2V0OiBzZXQsXG4gIGNsZWFyOiBjbGVhclxufTtcbiIsInZhciB0b0ludGVnZXIgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvdG8taW50ZWdlcicpO1xuXG52YXIgbWF4ID0gTWF0aC5tYXg7XG52YXIgbWluID0gTWF0aC5taW47XG5cbi8vIEhlbHBlciBmb3IgYSBwb3B1bGFyIHJlcGVhdGluZyBjYXNlIG9mIHRoZSBzcGVjOlxuLy8gTGV0IGludGVnZXIgYmUgPyBUb0ludGVnZXIoaW5kZXgpLlxuLy8gSWYgaW50ZWdlciA8IDAsIGxldCByZXN1bHQgYmUgbWF4KChsZW5ndGggKyBpbnRlZ2VyKSwgMCk7IGVsc2UgbGV0IHJlc3VsdCBiZSBtaW4oaW50ZWdlciwgbGVuZ3RoKS5cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gKGluZGV4LCBsZW5ndGgpIHtcbiAgdmFyIGludGVnZXIgPSB0b0ludGVnZXIoaW5kZXgpO1xuICByZXR1cm4gaW50ZWdlciA8IDAgPyBtYXgoaW50ZWdlciArIGxlbmd0aCwgMCkgOiBtaW4oaW50ZWdlciwgbGVuZ3RoKTtcbn07XG4iLCIvLyB0b09iamVjdCB3aXRoIGZhbGxiYWNrIGZvciBub24tYXJyYXktbGlrZSBFUzMgc3RyaW5nc1xudmFyIEluZGV4ZWRPYmplY3QgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvaW5kZXhlZC1vYmplY3QnKTtcbnZhciByZXF1aXJlT2JqZWN0Q29lcmNpYmxlID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL3JlcXVpcmUtb2JqZWN0LWNvZXJjaWJsZScpO1xuXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIChpdCkge1xuICByZXR1cm4gSW5kZXhlZE9iamVjdChyZXF1aXJlT2JqZWN0Q29lcmNpYmxlKGl0KSk7XG59O1xuIiwidmFyIGNlaWwgPSBNYXRoLmNlaWw7XG52YXIgZmxvb3IgPSBNYXRoLmZsb29yO1xuXG4vLyBgVG9JbnRlZ2VyYCBhYnN0cmFjdCBvcGVyYXRpb25cbi8vIGh0dHBzOi8vdGMzOS5naXRodWIuaW8vZWNtYTI2Mi8jc2VjLXRvaW50ZWdlclxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiAoYXJndW1lbnQpIHtcbiAgcmV0dXJuIGlzTmFOKGFyZ3VtZW50ID0gK2FyZ3VtZW50KSA/IDAgOiAoYXJndW1lbnQgPiAwID8gZmxvb3IgOiBjZWlsKShhcmd1bWVudCk7XG59O1xuIiwidmFyIHRvSW50ZWdlciA9IHJlcXVpcmUoJy4uL2ludGVybmFscy90by1pbnRlZ2VyJyk7XG5cbnZhciBtaW4gPSBNYXRoLm1pbjtcblxuLy8gYFRvTGVuZ3RoYCBhYnN0cmFjdCBvcGVyYXRpb25cbi8vIGh0dHBzOi8vdGMzOS5naXRodWIuaW8vZWNtYTI2Mi8jc2VjLXRvbGVuZ3RoXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIChhcmd1bWVudCkge1xuICByZXR1cm4gYXJndW1lbnQgPiAwID8gbWluKHRvSW50ZWdlcihhcmd1bWVudCksIDB4MUZGRkZGRkZGRkZGRkYpIDogMDsgLy8gMiAqKiA1MyAtIDEgPT0gOTAwNzE5OTI1NDc0MDk5MVxufTtcbiIsInZhciByZXF1aXJlT2JqZWN0Q29lcmNpYmxlID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL3JlcXVpcmUtb2JqZWN0LWNvZXJjaWJsZScpO1xuXG4vLyBgVG9PYmplY3RgIGFic3RyYWN0IG9wZXJhdGlvblxuLy8gaHR0cHM6Ly90YzM5LmdpdGh1Yi5pby9lY21hMjYyLyNzZWMtdG9vYmplY3Rcbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gKGFyZ3VtZW50KSB7XG4gIHJldHVybiBPYmplY3QocmVxdWlyZU9iamVjdENvZXJjaWJsZShhcmd1bWVudCkpO1xufTtcbiIsInZhciBpc09iamVjdCA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9pcy1vYmplY3QnKTtcblxuLy8gYFRvUHJpbWl0aXZlYCBhYnN0cmFjdCBvcGVyYXRpb25cbi8vIGh0dHBzOi8vdGMzOS5naXRodWIuaW8vZWNtYTI2Mi8jc2VjLXRvcHJpbWl0aXZlXG4vLyBpbnN0ZWFkIG9mIHRoZSBFUzYgc3BlYyB2ZXJzaW9uLCB3ZSBkaWRuJ3QgaW1wbGVtZW50IEBAdG9QcmltaXRpdmUgY2FzZVxuLy8gYW5kIHRoZSBzZWNvbmQgYXJndW1lbnQgLSBmbGFnIC0gcHJlZmVycmVkIHR5cGUgaXMgYSBzdHJpbmdcbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gKGlucHV0LCBQUkVGRVJSRURfU1RSSU5HKSB7XG4gIGlmICghaXNPYmplY3QoaW5wdXQpKSByZXR1cm4gaW5wdXQ7XG4gIHZhciBmbiwgdmFsO1xuICBpZiAoUFJFRkVSUkVEX1NUUklORyAmJiB0eXBlb2YgKGZuID0gaW5wdXQudG9TdHJpbmcpID09ICdmdW5jdGlvbicgJiYgIWlzT2JqZWN0KHZhbCA9IGZuLmNhbGwoaW5wdXQpKSkgcmV0dXJuIHZhbDtcbiAgaWYgKHR5cGVvZiAoZm4gPSBpbnB1dC52YWx1ZU9mKSA9PSAnZnVuY3Rpb24nICYmICFpc09iamVjdCh2YWwgPSBmbi5jYWxsKGlucHV0KSkpIHJldHVybiB2YWw7XG4gIGlmICghUFJFRkVSUkVEX1NUUklORyAmJiB0eXBlb2YgKGZuID0gaW5wdXQudG9TdHJpbmcpID09ICdmdW5jdGlvbicgJiYgIWlzT2JqZWN0KHZhbCA9IGZuLmNhbGwoaW5wdXQpKSkgcmV0dXJuIHZhbDtcbiAgdGhyb3cgVHlwZUVycm9yKFwiQ2FuJ3QgY29udmVydCBvYmplY3QgdG8gcHJpbWl0aXZlIHZhbHVlXCIpO1xufTtcbiIsInZhciB3ZWxsS25vd25TeW1ib2wgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvd2VsbC1rbm93bi1zeW1ib2wnKTtcblxudmFyIFRPX1NUUklOR19UQUcgPSB3ZWxsS25vd25TeW1ib2woJ3RvU3RyaW5nVGFnJyk7XG52YXIgdGVzdCA9IHt9O1xuXG50ZXN0W1RPX1NUUklOR19UQUddID0gJ3onO1xuXG5tb2R1bGUuZXhwb3J0cyA9IFN0cmluZyh0ZXN0KSA9PT0gJ1tvYmplY3Qgel0nO1xuIiwidmFyIGlkID0gMDtcbnZhciBwb3N0Zml4ID0gTWF0aC5yYW5kb20oKTtcblxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiAoa2V5KSB7XG4gIHJldHVybiAnU3ltYm9sKCcgKyBTdHJpbmcoa2V5ID09PSB1bmRlZmluZWQgPyAnJyA6IGtleSkgKyAnKV8nICsgKCsraWQgKyBwb3N0Zml4KS50b1N0cmluZygzNik7XG59O1xuIiwidmFyIE5BVElWRV9TWU1CT0wgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvbmF0aXZlLXN5bWJvbCcpO1xuXG5tb2R1bGUuZXhwb3J0cyA9IE5BVElWRV9TWU1CT0xcbiAgLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIG5vLXVuZGVmXG4gICYmICFTeW1ib2wuc2hhbVxuICAvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgbm8tdW5kZWZcbiAgJiYgdHlwZW9mIFN5bWJvbCgpID09ICdzeW1ib2wnO1xuIiwidmFyIGdldEJ1aWx0SW4gPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvZ2V0LWJ1aWx0LWluJyk7XG5cbm1vZHVsZS5leHBvcnRzID0gZ2V0QnVpbHRJbignbmF2aWdhdG9yJywgJ3VzZXJBZ2VudCcpIHx8ICcnO1xuIiwidmFyIGdsb2JhbCA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9nbG9iYWwnKTtcbnZhciB1c2VyQWdlbnQgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvdXNlci1hZ2VudCcpO1xuXG52YXIgcHJvY2VzcyA9IGdsb2JhbC5wcm9jZXNzO1xudmFyIHZlcnNpb25zID0gcHJvY2VzcyAmJiBwcm9jZXNzLnZlcnNpb25zO1xudmFyIHY4ID0gdmVyc2lvbnMgJiYgdmVyc2lvbnMudjg7XG52YXIgbWF0Y2gsIHZlcnNpb247XG5cbmlmICh2OCkge1xuICBtYXRjaCA9IHY4LnNwbGl0KCcuJyk7XG4gIHZlcnNpb24gPSBtYXRjaFswXSArIG1hdGNoWzFdO1xufSBlbHNlIGlmICh1c2VyQWdlbnQpIHtcbiAgbWF0Y2ggPSB1c2VyQWdlbnQubWF0Y2goL0VkZ2VcXC8oXFxkKykvKTtcbiAgaWYgKCFtYXRjaCB8fCBtYXRjaFsxXSA+PSA3NCkge1xuICAgIG1hdGNoID0gdXNlckFnZW50Lm1hdGNoKC9DaHJvbWVcXC8oXFxkKykvKTtcbiAgICBpZiAobWF0Y2gpIHZlcnNpb24gPSBtYXRjaFsxXTtcbiAgfVxufVxuXG5tb2R1bGUuZXhwb3J0cyA9IHZlcnNpb24gJiYgK3ZlcnNpb247XG4iLCJ2YXIgZ2xvYmFsID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL2dsb2JhbCcpO1xudmFyIHNoYXJlZCA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9zaGFyZWQnKTtcbnZhciBoYXMgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvaGFzJyk7XG52YXIgdWlkID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL3VpZCcpO1xudmFyIE5BVElWRV9TWU1CT0wgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvbmF0aXZlLXN5bWJvbCcpO1xudmFyIFVTRV9TWU1CT0xfQVNfVUlEID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL3VzZS1zeW1ib2wtYXMtdWlkJyk7XG5cbnZhciBXZWxsS25vd25TeW1ib2xzU3RvcmUgPSBzaGFyZWQoJ3drcycpO1xudmFyIFN5bWJvbCA9IGdsb2JhbC5TeW1ib2w7XG52YXIgY3JlYXRlV2VsbEtub3duU3ltYm9sID0gVVNFX1NZTUJPTF9BU19VSUQgPyBTeW1ib2wgOiB1aWQ7XG5cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gKG5hbWUpIHtcbiAgaWYgKCFoYXMoV2VsbEtub3duU3ltYm9sc1N0b3JlLCBuYW1lKSkge1xuICAgIGlmIChOQVRJVkVfU1lNQk9MICYmIGhhcyhTeW1ib2wsIG5hbWUpKSBXZWxsS25vd25TeW1ib2xzU3RvcmVbbmFtZV0gPSBTeW1ib2xbbmFtZV07XG4gICAgZWxzZSBXZWxsS25vd25TeW1ib2xzU3RvcmVbbmFtZV0gPSBjcmVhdGVXZWxsS25vd25TeW1ib2woJ1N5bWJvbC4nICsgbmFtZSk7XG4gIH0gcmV0dXJuIFdlbGxLbm93blN5bWJvbHNTdG9yZVtuYW1lXTtcbn07XG4iLCIndXNlIHN0cmljdCc7XG52YXIgJCA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9leHBvcnQnKTtcbnZhciBmYWlscyA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9mYWlscycpO1xudmFyIGlzQXJyYXkgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvaXMtYXJyYXknKTtcbnZhciBpc09iamVjdCA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9pcy1vYmplY3QnKTtcbnZhciB0b09iamVjdCA9IHJlcXVpcmUoJy4uL2ludGVybmFscy90by1vYmplY3QnKTtcbnZhciB0b0xlbmd0aCA9IHJlcXVpcmUoJy4uL2ludGVybmFscy90by1sZW5ndGgnKTtcbnZhciBjcmVhdGVQcm9wZXJ0eSA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9jcmVhdGUtcHJvcGVydHknKTtcbnZhciBhcnJheVNwZWNpZXNDcmVhdGUgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvYXJyYXktc3BlY2llcy1jcmVhdGUnKTtcbnZhciBhcnJheU1ldGhvZEhhc1NwZWNpZXNTdXBwb3J0ID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL2FycmF5LW1ldGhvZC1oYXMtc3BlY2llcy1zdXBwb3J0Jyk7XG52YXIgd2VsbEtub3duU3ltYm9sID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL3dlbGwta25vd24tc3ltYm9sJyk7XG52YXIgVjhfVkVSU0lPTiA9IHJlcXVpcmUoJy4uL2ludGVybmFscy92OC12ZXJzaW9uJyk7XG5cbnZhciBJU19DT05DQVRfU1BSRUFEQUJMRSA9IHdlbGxLbm93blN5bWJvbCgnaXNDb25jYXRTcHJlYWRhYmxlJyk7XG52YXIgTUFYX1NBRkVfSU5URUdFUiA9IDB4MUZGRkZGRkZGRkZGRkY7XG52YXIgTUFYSU1VTV9BTExPV0VEX0lOREVYX0VYQ0VFREVEID0gJ01heGltdW0gYWxsb3dlZCBpbmRleCBleGNlZWRlZCc7XG5cbi8vIFdlIGNhbid0IHVzZSB0aGlzIGZlYXR1cmUgZGV0ZWN0aW9uIGluIFY4IHNpbmNlIGl0IGNhdXNlc1xuLy8gZGVvcHRpbWl6YXRpb24gYW5kIHNlcmlvdXMgcGVyZm9ybWFuY2UgZGVncmFkYXRpb25cbi8vIGh0dHBzOi8vZ2l0aHViLmNvbS96bG9pcm9jay9jb3JlLWpzL2lzc3Vlcy82NzlcbnZhciBJU19DT05DQVRfU1BSRUFEQUJMRV9TVVBQT1JUID0gVjhfVkVSU0lPTiA+PSA1MSB8fCAhZmFpbHMoZnVuY3Rpb24gKCkge1xuICB2YXIgYXJyYXkgPSBbXTtcbiAgYXJyYXlbSVNfQ09OQ0FUX1NQUkVBREFCTEVdID0gZmFsc2U7XG4gIHJldHVybiBhcnJheS5jb25jYXQoKVswXSAhPT0gYXJyYXk7XG59KTtcblxudmFyIFNQRUNJRVNfU1VQUE9SVCA9IGFycmF5TWV0aG9kSGFzU3BlY2llc1N1cHBvcnQoJ2NvbmNhdCcpO1xuXG52YXIgaXNDb25jYXRTcHJlYWRhYmxlID0gZnVuY3Rpb24gKE8pIHtcbiAgaWYgKCFpc09iamVjdChPKSkgcmV0dXJuIGZhbHNlO1xuICB2YXIgc3ByZWFkYWJsZSA9IE9bSVNfQ09OQ0FUX1NQUkVBREFCTEVdO1xuICByZXR1cm4gc3ByZWFkYWJsZSAhPT0gdW5kZWZpbmVkID8gISFzcHJlYWRhYmxlIDogaXNBcnJheShPKTtcbn07XG5cbnZhciBGT1JDRUQgPSAhSVNfQ09OQ0FUX1NQUkVBREFCTEVfU1VQUE9SVCB8fCAhU1BFQ0lFU19TVVBQT1JUO1xuXG4vLyBgQXJyYXkucHJvdG90eXBlLmNvbmNhdGAgbWV0aG9kXG4vLyBodHRwczovL3RjMzkuZ2l0aHViLmlvL2VjbWEyNjIvI3NlYy1hcnJheS5wcm90b3R5cGUuY29uY2F0XG4vLyB3aXRoIGFkZGluZyBzdXBwb3J0IG9mIEBAaXNDb25jYXRTcHJlYWRhYmxlIGFuZCBAQHNwZWNpZXNcbiQoeyB0YXJnZXQ6ICdBcnJheScsIHByb3RvOiB0cnVlLCBmb3JjZWQ6IEZPUkNFRCB9LCB7XG4gIGNvbmNhdDogZnVuY3Rpb24gY29uY2F0KGFyZykgeyAvLyBlc2xpbnQtZGlzYWJsZS1saW5lIG5vLXVudXNlZC12YXJzXG4gICAgdmFyIE8gPSB0b09iamVjdCh0aGlzKTtcbiAgICB2YXIgQSA9IGFycmF5U3BlY2llc0NyZWF0ZShPLCAwKTtcbiAgICB2YXIgbiA9IDA7XG4gICAgdmFyIGksIGssIGxlbmd0aCwgbGVuLCBFO1xuICAgIGZvciAoaSA9IC0xLCBsZW5ndGggPSBhcmd1bWVudHMubGVuZ3RoOyBpIDwgbGVuZ3RoOyBpKyspIHtcbiAgICAgIEUgPSBpID09PSAtMSA/IE8gOiBhcmd1bWVudHNbaV07XG4gICAgICBpZiAoaXNDb25jYXRTcHJlYWRhYmxlKEUpKSB7XG4gICAgICAgIGxlbiA9IHRvTGVuZ3RoKEUubGVuZ3RoKTtcbiAgICAgICAgaWYgKG4gKyBsZW4gPiBNQVhfU0FGRV9JTlRFR0VSKSB0aHJvdyBUeXBlRXJyb3IoTUFYSU1VTV9BTExPV0VEX0lOREVYX0VYQ0VFREVEKTtcbiAgICAgICAgZm9yIChrID0gMDsgayA8IGxlbjsgaysrLCBuKyspIGlmIChrIGluIEUpIGNyZWF0ZVByb3BlcnR5KEEsIG4sIEVba10pO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgaWYgKG4gPj0gTUFYX1NBRkVfSU5URUdFUikgdGhyb3cgVHlwZUVycm9yKE1BWElNVU1fQUxMT1dFRF9JTkRFWF9FWENFRURFRCk7XG4gICAgICAgIGNyZWF0ZVByb3BlcnR5KEEsIG4rKywgRSk7XG4gICAgICB9XG4gICAgfVxuICAgIEEubGVuZ3RoID0gbjtcbiAgICByZXR1cm4gQTtcbiAgfVxufSk7XG4iLCJ2YXIgJCA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9leHBvcnQnKTtcbnZhciBjb3B5V2l0aGluID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL2FycmF5LWNvcHktd2l0aGluJyk7XG52YXIgYWRkVG9VbnNjb3BhYmxlcyA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9hZGQtdG8tdW5zY29wYWJsZXMnKTtcblxuLy8gYEFycmF5LnByb3RvdHlwZS5jb3B5V2l0aGluYCBtZXRob2Rcbi8vIGh0dHBzOi8vdGMzOS5naXRodWIuaW8vZWNtYTI2Mi8jc2VjLWFycmF5LnByb3RvdHlwZS5jb3B5d2l0aGluXG4kKHsgdGFyZ2V0OiAnQXJyYXknLCBwcm90bzogdHJ1ZSB9LCB7XG4gIGNvcHlXaXRoaW46IGNvcHlXaXRoaW5cbn0pO1xuXG4vLyBodHRwczovL3RjMzkuZ2l0aHViLmlvL2VjbWEyNjIvI3NlYy1hcnJheS5wcm90b3R5cGUtQEB1bnNjb3BhYmxlc1xuYWRkVG9VbnNjb3BhYmxlcygnY29weVdpdGhpbicpO1xuIiwiJ3VzZSBzdHJpY3QnO1xudmFyICQgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvZXhwb3J0Jyk7XG52YXIgJGV2ZXJ5ID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL2FycmF5LWl0ZXJhdGlvbicpLmV2ZXJ5O1xudmFyIHNsb3BweUFycmF5TWV0aG9kID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL3Nsb3BweS1hcnJheS1tZXRob2QnKTtcblxuLy8gYEFycmF5LnByb3RvdHlwZS5ldmVyeWAgbWV0aG9kXG4vLyBodHRwczovL3RjMzkuZ2l0aHViLmlvL2VjbWEyNjIvI3NlYy1hcnJheS5wcm90b3R5cGUuZXZlcnlcbiQoeyB0YXJnZXQ6ICdBcnJheScsIHByb3RvOiB0cnVlLCBmb3JjZWQ6IHNsb3BweUFycmF5TWV0aG9kKCdldmVyeScpIH0sIHtcbiAgZXZlcnk6IGZ1bmN0aW9uIGV2ZXJ5KGNhbGxiYWNrZm4gLyogLCB0aGlzQXJnICovKSB7XG4gICAgcmV0dXJuICRldmVyeSh0aGlzLCBjYWxsYmFja2ZuLCBhcmd1bWVudHMubGVuZ3RoID4gMSA/IGFyZ3VtZW50c1sxXSA6IHVuZGVmaW5lZCk7XG4gIH1cbn0pO1xuIiwidmFyICQgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvZXhwb3J0Jyk7XG52YXIgZmlsbCA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9hcnJheS1maWxsJyk7XG52YXIgYWRkVG9VbnNjb3BhYmxlcyA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9hZGQtdG8tdW5zY29wYWJsZXMnKTtcblxuLy8gYEFycmF5LnByb3RvdHlwZS5maWxsYCBtZXRob2Rcbi8vIGh0dHBzOi8vdGMzOS5naXRodWIuaW8vZWNtYTI2Mi8jc2VjLWFycmF5LnByb3RvdHlwZS5maWxsXG4kKHsgdGFyZ2V0OiAnQXJyYXknLCBwcm90bzogdHJ1ZSB9LCB7XG4gIGZpbGw6IGZpbGxcbn0pO1xuXG4vLyBodHRwczovL3RjMzkuZ2l0aHViLmlvL2VjbWEyNjIvI3NlYy1hcnJheS5wcm90b3R5cGUtQEB1bnNjb3BhYmxlc1xuYWRkVG9VbnNjb3BhYmxlcygnZmlsbCcpO1xuIiwiJ3VzZSBzdHJpY3QnO1xudmFyICQgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvZXhwb3J0Jyk7XG52YXIgJGZpbHRlciA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9hcnJheS1pdGVyYXRpb24nKS5maWx0ZXI7XG52YXIgZmFpbHMgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvZmFpbHMnKTtcbnZhciBhcnJheU1ldGhvZEhhc1NwZWNpZXNTdXBwb3J0ID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL2FycmF5LW1ldGhvZC1oYXMtc3BlY2llcy1zdXBwb3J0Jyk7XG5cbnZhciBIQVNfU1BFQ0lFU19TVVBQT1JUID0gYXJyYXlNZXRob2RIYXNTcGVjaWVzU3VwcG9ydCgnZmlsdGVyJyk7XG4vLyBFZGdlIDE0LSBpc3N1ZVxudmFyIFVTRVNfVE9fTEVOR1RIID0gSEFTX1NQRUNJRVNfU1VQUE9SVCAmJiAhZmFpbHMoZnVuY3Rpb24gKCkge1xuICBbXS5maWx0ZXIuY2FsbCh7IGxlbmd0aDogLTEsIDA6IDEgfSwgZnVuY3Rpb24gKGl0KSB7IHRocm93IGl0OyB9KTtcbn0pO1xuXG4vLyBgQXJyYXkucHJvdG90eXBlLmZpbHRlcmAgbWV0aG9kXG4vLyBodHRwczovL3RjMzkuZ2l0aHViLmlvL2VjbWEyNjIvI3NlYy1hcnJheS5wcm90b3R5cGUuZmlsdGVyXG4vLyB3aXRoIGFkZGluZyBzdXBwb3J0IG9mIEBAc3BlY2llc1xuJCh7IHRhcmdldDogJ0FycmF5JywgcHJvdG86IHRydWUsIGZvcmNlZDogIUhBU19TUEVDSUVTX1NVUFBPUlQgfHwgIVVTRVNfVE9fTEVOR1RIIH0sIHtcbiAgZmlsdGVyOiBmdW5jdGlvbiBmaWx0ZXIoY2FsbGJhY2tmbiAvKiAsIHRoaXNBcmcgKi8pIHtcbiAgICByZXR1cm4gJGZpbHRlcih0aGlzLCBjYWxsYmFja2ZuLCBhcmd1bWVudHMubGVuZ3RoID4gMSA/IGFyZ3VtZW50c1sxXSA6IHVuZGVmaW5lZCk7XG4gIH1cbn0pO1xuIiwiJ3VzZSBzdHJpY3QnO1xudmFyICQgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvZXhwb3J0Jyk7XG52YXIgJGZpbmRJbmRleCA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9hcnJheS1pdGVyYXRpb24nKS5maW5kSW5kZXg7XG52YXIgYWRkVG9VbnNjb3BhYmxlcyA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9hZGQtdG8tdW5zY29wYWJsZXMnKTtcblxudmFyIEZJTkRfSU5ERVggPSAnZmluZEluZGV4JztcbnZhciBTS0lQU19IT0xFUyA9IHRydWU7XG5cbi8vIFNob3VsZG4ndCBza2lwIGhvbGVzXG5pZiAoRklORF9JTkRFWCBpbiBbXSkgQXJyYXkoMSlbRklORF9JTkRFWF0oZnVuY3Rpb24gKCkgeyBTS0lQU19IT0xFUyA9IGZhbHNlOyB9KTtcblxuLy8gYEFycmF5LnByb3RvdHlwZS5maW5kSW5kZXhgIG1ldGhvZFxuLy8gaHR0cHM6Ly90YzM5LmdpdGh1Yi5pby9lY21hMjYyLyNzZWMtYXJyYXkucHJvdG90eXBlLmZpbmRpbmRleFxuJCh7IHRhcmdldDogJ0FycmF5JywgcHJvdG86IHRydWUsIGZvcmNlZDogU0tJUFNfSE9MRVMgfSwge1xuICBmaW5kSW5kZXg6IGZ1bmN0aW9uIGZpbmRJbmRleChjYWxsYmFja2ZuIC8qICwgdGhhdCA9IHVuZGVmaW5lZCAqLykge1xuICAgIHJldHVybiAkZmluZEluZGV4KHRoaXMsIGNhbGxiYWNrZm4sIGFyZ3VtZW50cy5sZW5ndGggPiAxID8gYXJndW1lbnRzWzFdIDogdW5kZWZpbmVkKTtcbiAgfVxufSk7XG5cbi8vIGh0dHBzOi8vdGMzOS5naXRodWIuaW8vZWNtYTI2Mi8jc2VjLWFycmF5LnByb3RvdHlwZS1AQHVuc2NvcGFibGVzXG5hZGRUb1Vuc2NvcGFibGVzKEZJTkRfSU5ERVgpO1xuIiwiJ3VzZSBzdHJpY3QnO1xudmFyICQgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvZXhwb3J0Jyk7XG52YXIgJGZpbmQgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvYXJyYXktaXRlcmF0aW9uJykuZmluZDtcbnZhciBhZGRUb1Vuc2NvcGFibGVzID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL2FkZC10by11bnNjb3BhYmxlcycpO1xuXG52YXIgRklORCA9ICdmaW5kJztcbnZhciBTS0lQU19IT0xFUyA9IHRydWU7XG5cbi8vIFNob3VsZG4ndCBza2lwIGhvbGVzXG5pZiAoRklORCBpbiBbXSkgQXJyYXkoMSlbRklORF0oZnVuY3Rpb24gKCkgeyBTS0lQU19IT0xFUyA9IGZhbHNlOyB9KTtcblxuLy8gYEFycmF5LnByb3RvdHlwZS5maW5kYCBtZXRob2Rcbi8vIGh0dHBzOi8vdGMzOS5naXRodWIuaW8vZWNtYTI2Mi8jc2VjLWFycmF5LnByb3RvdHlwZS5maW5kXG4kKHsgdGFyZ2V0OiAnQXJyYXknLCBwcm90bzogdHJ1ZSwgZm9yY2VkOiBTS0lQU19IT0xFUyB9LCB7XG4gIGZpbmQ6IGZ1bmN0aW9uIGZpbmQoY2FsbGJhY2tmbiAvKiAsIHRoYXQgPSB1bmRlZmluZWQgKi8pIHtcbiAgICByZXR1cm4gJGZpbmQodGhpcywgY2FsbGJhY2tmbiwgYXJndW1lbnRzLmxlbmd0aCA+IDEgPyBhcmd1bWVudHNbMV0gOiB1bmRlZmluZWQpO1xuICB9XG59KTtcblxuLy8gaHR0cHM6Ly90YzM5LmdpdGh1Yi5pby9lY21hMjYyLyNzZWMtYXJyYXkucHJvdG90eXBlLUBAdW5zY29wYWJsZXNcbmFkZFRvVW5zY29wYWJsZXMoRklORCk7XG4iLCIndXNlIHN0cmljdCc7XG52YXIgJCA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9leHBvcnQnKTtcbnZhciBmbGF0dGVuSW50b0FycmF5ID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL2ZsYXR0ZW4taW50by1hcnJheScpO1xudmFyIHRvT2JqZWN0ID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL3RvLW9iamVjdCcpO1xudmFyIHRvTGVuZ3RoID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL3RvLWxlbmd0aCcpO1xudmFyIGFGdW5jdGlvbiA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9hLWZ1bmN0aW9uJyk7XG52YXIgYXJyYXlTcGVjaWVzQ3JlYXRlID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL2FycmF5LXNwZWNpZXMtY3JlYXRlJyk7XG5cbi8vIGBBcnJheS5wcm90b3R5cGUuZmxhdE1hcGAgbWV0aG9kXG4vLyBodHRwczovL2dpdGh1Yi5jb20vdGMzOS9wcm9wb3NhbC1mbGF0TWFwXG4kKHsgdGFyZ2V0OiAnQXJyYXknLCBwcm90bzogdHJ1ZSB9LCB7XG4gIGZsYXRNYXA6IGZ1bmN0aW9uIGZsYXRNYXAoY2FsbGJhY2tmbiAvKiAsIHRoaXNBcmcgKi8pIHtcbiAgICB2YXIgTyA9IHRvT2JqZWN0KHRoaXMpO1xuICAgIHZhciBzb3VyY2VMZW4gPSB0b0xlbmd0aChPLmxlbmd0aCk7XG4gICAgdmFyIEE7XG4gICAgYUZ1bmN0aW9uKGNhbGxiYWNrZm4pO1xuICAgIEEgPSBhcnJheVNwZWNpZXNDcmVhdGUoTywgMCk7XG4gICAgQS5sZW5ndGggPSBmbGF0dGVuSW50b0FycmF5KEEsIE8sIE8sIHNvdXJjZUxlbiwgMCwgMSwgY2FsbGJhY2tmbiwgYXJndW1lbnRzLmxlbmd0aCA+IDEgPyBhcmd1bWVudHNbMV0gOiB1bmRlZmluZWQpO1xuICAgIHJldHVybiBBO1xuICB9XG59KTtcbiIsIid1c2Ugc3RyaWN0JztcbnZhciAkID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL2V4cG9ydCcpO1xudmFyIGZsYXR0ZW5JbnRvQXJyYXkgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvZmxhdHRlbi1pbnRvLWFycmF5Jyk7XG52YXIgdG9PYmplY3QgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvdG8tb2JqZWN0Jyk7XG52YXIgdG9MZW5ndGggPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvdG8tbGVuZ3RoJyk7XG52YXIgdG9JbnRlZ2VyID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL3RvLWludGVnZXInKTtcbnZhciBhcnJheVNwZWNpZXNDcmVhdGUgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvYXJyYXktc3BlY2llcy1jcmVhdGUnKTtcblxuLy8gYEFycmF5LnByb3RvdHlwZS5mbGF0YCBtZXRob2Rcbi8vIGh0dHBzOi8vZ2l0aHViLmNvbS90YzM5L3Byb3Bvc2FsLWZsYXRNYXBcbiQoeyB0YXJnZXQ6ICdBcnJheScsIHByb3RvOiB0cnVlIH0sIHtcbiAgZmxhdDogZnVuY3Rpb24gZmxhdCgvKiBkZXB0aEFyZyA9IDEgKi8pIHtcbiAgICB2YXIgZGVwdGhBcmcgPSBhcmd1bWVudHMubGVuZ3RoID8gYXJndW1lbnRzWzBdIDogdW5kZWZpbmVkO1xuICAgIHZhciBPID0gdG9PYmplY3QodGhpcyk7XG4gICAgdmFyIHNvdXJjZUxlbiA9IHRvTGVuZ3RoKE8ubGVuZ3RoKTtcbiAgICB2YXIgQSA9IGFycmF5U3BlY2llc0NyZWF0ZShPLCAwKTtcbiAgICBBLmxlbmd0aCA9IGZsYXR0ZW5JbnRvQXJyYXkoQSwgTywgTywgc291cmNlTGVuLCAwLCBkZXB0aEFyZyA9PT0gdW5kZWZpbmVkID8gMSA6IHRvSW50ZWdlcihkZXB0aEFyZykpO1xuICAgIHJldHVybiBBO1xuICB9XG59KTtcbiIsIid1c2Ugc3RyaWN0JztcbnZhciAkID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL2V4cG9ydCcpO1xudmFyIGZvckVhY2ggPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvYXJyYXktZm9yLWVhY2gnKTtcblxuLy8gYEFycmF5LnByb3RvdHlwZS5mb3JFYWNoYCBtZXRob2Rcbi8vIGh0dHBzOi8vdGMzOS5naXRodWIuaW8vZWNtYTI2Mi8jc2VjLWFycmF5LnByb3RvdHlwZS5mb3JlYWNoXG4kKHsgdGFyZ2V0OiAnQXJyYXknLCBwcm90bzogdHJ1ZSwgZm9yY2VkOiBbXS5mb3JFYWNoICE9IGZvckVhY2ggfSwge1xuICBmb3JFYWNoOiBmb3JFYWNoXG59KTtcbiIsInZhciAkID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL2V4cG9ydCcpO1xudmFyIGZyb20gPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvYXJyYXktZnJvbScpO1xudmFyIGNoZWNrQ29ycmVjdG5lc3NPZkl0ZXJhdGlvbiA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9jaGVjay1jb3JyZWN0bmVzcy1vZi1pdGVyYXRpb24nKTtcblxudmFyIElOQ09SUkVDVF9JVEVSQVRJT04gPSAhY2hlY2tDb3JyZWN0bmVzc09mSXRlcmF0aW9uKGZ1bmN0aW9uIChpdGVyYWJsZSkge1xuICBBcnJheS5mcm9tKGl0ZXJhYmxlKTtcbn0pO1xuXG4vLyBgQXJyYXkuZnJvbWAgbWV0aG9kXG4vLyBodHRwczovL3RjMzkuZ2l0aHViLmlvL2VjbWEyNjIvI3NlYy1hcnJheS5mcm9tXG4kKHsgdGFyZ2V0OiAnQXJyYXknLCBzdGF0OiB0cnVlLCBmb3JjZWQ6IElOQ09SUkVDVF9JVEVSQVRJT04gfSwge1xuICBmcm9tOiBmcm9tXG59KTtcbiIsIid1c2Ugc3RyaWN0JztcbnZhciAkID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL2V4cG9ydCcpO1xudmFyICRpbmNsdWRlcyA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9hcnJheS1pbmNsdWRlcycpLmluY2x1ZGVzO1xudmFyIGFkZFRvVW5zY29wYWJsZXMgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvYWRkLXRvLXVuc2NvcGFibGVzJyk7XG5cbi8vIGBBcnJheS5wcm90b3R5cGUuaW5jbHVkZXNgIG1ldGhvZFxuLy8gaHR0cHM6Ly90YzM5LmdpdGh1Yi5pby9lY21hMjYyLyNzZWMtYXJyYXkucHJvdG90eXBlLmluY2x1ZGVzXG4kKHsgdGFyZ2V0OiAnQXJyYXknLCBwcm90bzogdHJ1ZSB9LCB7XG4gIGluY2x1ZGVzOiBmdW5jdGlvbiBpbmNsdWRlcyhlbCAvKiAsIGZyb21JbmRleCA9IDAgKi8pIHtcbiAgICByZXR1cm4gJGluY2x1ZGVzKHRoaXMsIGVsLCBhcmd1bWVudHMubGVuZ3RoID4gMSA/IGFyZ3VtZW50c1sxXSA6IHVuZGVmaW5lZCk7XG4gIH1cbn0pO1xuXG4vLyBodHRwczovL3RjMzkuZ2l0aHViLmlvL2VjbWEyNjIvI3NlYy1hcnJheS5wcm90b3R5cGUtQEB1bnNjb3BhYmxlc1xuYWRkVG9VbnNjb3BhYmxlcygnaW5jbHVkZXMnKTtcbiIsIid1c2Ugc3RyaWN0JztcbnZhciAkID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL2V4cG9ydCcpO1xudmFyICRpbmRleE9mID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL2FycmF5LWluY2x1ZGVzJykuaW5kZXhPZjtcbnZhciBzbG9wcHlBcnJheU1ldGhvZCA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9zbG9wcHktYXJyYXktbWV0aG9kJyk7XG5cbnZhciBuYXRpdmVJbmRleE9mID0gW10uaW5kZXhPZjtcblxudmFyIE5FR0FUSVZFX1pFUk8gPSAhIW5hdGl2ZUluZGV4T2YgJiYgMSAvIFsxXS5pbmRleE9mKDEsIC0wKSA8IDA7XG52YXIgU0xPUFBZX01FVEhPRCA9IHNsb3BweUFycmF5TWV0aG9kKCdpbmRleE9mJyk7XG5cbi8vIGBBcnJheS5wcm90b3R5cGUuaW5kZXhPZmAgbWV0aG9kXG4vLyBodHRwczovL3RjMzkuZ2l0aHViLmlvL2VjbWEyNjIvI3NlYy1hcnJheS5wcm90b3R5cGUuaW5kZXhvZlxuJCh7IHRhcmdldDogJ0FycmF5JywgcHJvdG86IHRydWUsIGZvcmNlZDogTkVHQVRJVkVfWkVSTyB8fCBTTE9QUFlfTUVUSE9EIH0sIHtcbiAgaW5kZXhPZjogZnVuY3Rpb24gaW5kZXhPZihzZWFyY2hFbGVtZW50IC8qICwgZnJvbUluZGV4ID0gMCAqLykge1xuICAgIHJldHVybiBORUdBVElWRV9aRVJPXG4gICAgICAvLyBjb252ZXJ0IC0wIHRvICswXG4gICAgICA/IG5hdGl2ZUluZGV4T2YuYXBwbHkodGhpcywgYXJndW1lbnRzKSB8fCAwXG4gICAgICA6ICRpbmRleE9mKHRoaXMsIHNlYXJjaEVsZW1lbnQsIGFyZ3VtZW50cy5sZW5ndGggPiAxID8gYXJndW1lbnRzWzFdIDogdW5kZWZpbmVkKTtcbiAgfVxufSk7XG4iLCJ2YXIgJCA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9leHBvcnQnKTtcbnZhciBpc0FycmF5ID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL2lzLWFycmF5Jyk7XG5cbi8vIGBBcnJheS5pc0FycmF5YCBtZXRob2Rcbi8vIGh0dHBzOi8vdGMzOS5naXRodWIuaW8vZWNtYTI2Mi8jc2VjLWFycmF5LmlzYXJyYXlcbiQoeyB0YXJnZXQ6ICdBcnJheScsIHN0YXQ6IHRydWUgfSwge1xuICBpc0FycmF5OiBpc0FycmF5XG59KTtcbiIsIid1c2Ugc3RyaWN0JztcbnZhciB0b0luZGV4ZWRPYmplY3QgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvdG8taW5kZXhlZC1vYmplY3QnKTtcbnZhciBhZGRUb1Vuc2NvcGFibGVzID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL2FkZC10by11bnNjb3BhYmxlcycpO1xudmFyIEl0ZXJhdG9ycyA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9pdGVyYXRvcnMnKTtcbnZhciBJbnRlcm5hbFN0YXRlTW9kdWxlID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL2ludGVybmFsLXN0YXRlJyk7XG52YXIgZGVmaW5lSXRlcmF0b3IgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvZGVmaW5lLWl0ZXJhdG9yJyk7XG5cbnZhciBBUlJBWV9JVEVSQVRPUiA9ICdBcnJheSBJdGVyYXRvcic7XG52YXIgc2V0SW50ZXJuYWxTdGF0ZSA9IEludGVybmFsU3RhdGVNb2R1bGUuc2V0O1xudmFyIGdldEludGVybmFsU3RhdGUgPSBJbnRlcm5hbFN0YXRlTW9kdWxlLmdldHRlckZvcihBUlJBWV9JVEVSQVRPUik7XG5cbi8vIGBBcnJheS5wcm90b3R5cGUuZW50cmllc2AgbWV0aG9kXG4vLyBodHRwczovL3RjMzkuZ2l0aHViLmlvL2VjbWEyNjIvI3NlYy1hcnJheS5wcm90b3R5cGUuZW50cmllc1xuLy8gYEFycmF5LnByb3RvdHlwZS5rZXlzYCBtZXRob2Rcbi8vIGh0dHBzOi8vdGMzOS5naXRodWIuaW8vZWNtYTI2Mi8jc2VjLWFycmF5LnByb3RvdHlwZS5rZXlzXG4vLyBgQXJyYXkucHJvdG90eXBlLnZhbHVlc2AgbWV0aG9kXG4vLyBodHRwczovL3RjMzkuZ2l0aHViLmlvL2VjbWEyNjIvI3NlYy1hcnJheS5wcm90b3R5cGUudmFsdWVzXG4vLyBgQXJyYXkucHJvdG90eXBlW0BAaXRlcmF0b3JdYCBtZXRob2Rcbi8vIGh0dHBzOi8vdGMzOS5naXRodWIuaW8vZWNtYTI2Mi8jc2VjLWFycmF5LnByb3RvdHlwZS1AQGl0ZXJhdG9yXG4vLyBgQ3JlYXRlQXJyYXlJdGVyYXRvcmAgaW50ZXJuYWwgbWV0aG9kXG4vLyBodHRwczovL3RjMzkuZ2l0aHViLmlvL2VjbWEyNjIvI3NlYy1jcmVhdGVhcnJheWl0ZXJhdG9yXG5tb2R1bGUuZXhwb3J0cyA9IGRlZmluZUl0ZXJhdG9yKEFycmF5LCAnQXJyYXknLCBmdW5jdGlvbiAoaXRlcmF0ZWQsIGtpbmQpIHtcbiAgc2V0SW50ZXJuYWxTdGF0ZSh0aGlzLCB7XG4gICAgdHlwZTogQVJSQVlfSVRFUkFUT1IsXG4gICAgdGFyZ2V0OiB0b0luZGV4ZWRPYmplY3QoaXRlcmF0ZWQpLCAvLyB0YXJnZXRcbiAgICBpbmRleDogMCwgICAgICAgICAgICAgICAgICAgICAgICAgIC8vIG5leHQgaW5kZXhcbiAgICBraW5kOiBraW5kICAgICAgICAgICAgICAgICAgICAgICAgIC8vIGtpbmRcbiAgfSk7XG4vLyBgJUFycmF5SXRlcmF0b3JQcm90b3R5cGUlLm5leHRgIG1ldGhvZFxuLy8gaHR0cHM6Ly90YzM5LmdpdGh1Yi5pby9lY21hMjYyLyNzZWMtJWFycmF5aXRlcmF0b3Jwcm90b3R5cGUlLm5leHRcbn0sIGZ1bmN0aW9uICgpIHtcbiAgdmFyIHN0YXRlID0gZ2V0SW50ZXJuYWxTdGF0ZSh0aGlzKTtcbiAgdmFyIHRhcmdldCA9IHN0YXRlLnRhcmdldDtcbiAgdmFyIGtpbmQgPSBzdGF0ZS5raW5kO1xuICB2YXIgaW5kZXggPSBzdGF0ZS5pbmRleCsrO1xuICBpZiAoIXRhcmdldCB8fCBpbmRleCA+PSB0YXJnZXQubGVuZ3RoKSB7XG4gICAgc3RhdGUudGFyZ2V0ID0gdW5kZWZpbmVkO1xuICAgIHJldHVybiB7IHZhbHVlOiB1bmRlZmluZWQsIGRvbmU6IHRydWUgfTtcbiAgfVxuICBpZiAoa2luZCA9PSAna2V5cycpIHJldHVybiB7IHZhbHVlOiBpbmRleCwgZG9uZTogZmFsc2UgfTtcbiAgaWYgKGtpbmQgPT0gJ3ZhbHVlcycpIHJldHVybiB7IHZhbHVlOiB0YXJnZXRbaW5kZXhdLCBkb25lOiBmYWxzZSB9O1xuICByZXR1cm4geyB2YWx1ZTogW2luZGV4LCB0YXJnZXRbaW5kZXhdXSwgZG9uZTogZmFsc2UgfTtcbn0sICd2YWx1ZXMnKTtcblxuLy8gYXJndW1lbnRzTGlzdFtAQGl0ZXJhdG9yXSBpcyAlQXJyYXlQcm90b192YWx1ZXMlXG4vLyBodHRwczovL3RjMzkuZ2l0aHViLmlvL2VjbWEyNjIvI3NlYy1jcmVhdGV1bm1hcHBlZGFyZ3VtZW50c29iamVjdFxuLy8gaHR0cHM6Ly90YzM5LmdpdGh1Yi5pby9lY21hMjYyLyNzZWMtY3JlYXRlbWFwcGVkYXJndW1lbnRzb2JqZWN0XG5JdGVyYXRvcnMuQXJndW1lbnRzID0gSXRlcmF0b3JzLkFycmF5O1xuXG4vLyBodHRwczovL3RjMzkuZ2l0aHViLmlvL2VjbWEyNjIvI3NlYy1hcnJheS5wcm90b3R5cGUtQEB1bnNjb3BhYmxlc1xuYWRkVG9VbnNjb3BhYmxlcygna2V5cycpO1xuYWRkVG9VbnNjb3BhYmxlcygndmFsdWVzJyk7XG5hZGRUb1Vuc2NvcGFibGVzKCdlbnRyaWVzJyk7XG4iLCIndXNlIHN0cmljdCc7XG52YXIgJCA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9leHBvcnQnKTtcbnZhciBJbmRleGVkT2JqZWN0ID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL2luZGV4ZWQtb2JqZWN0Jyk7XG52YXIgdG9JbmRleGVkT2JqZWN0ID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL3RvLWluZGV4ZWQtb2JqZWN0Jyk7XG52YXIgc2xvcHB5QXJyYXlNZXRob2QgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvc2xvcHB5LWFycmF5LW1ldGhvZCcpO1xuXG52YXIgbmF0aXZlSm9pbiA9IFtdLmpvaW47XG5cbnZhciBFUzNfU1RSSU5HUyA9IEluZGV4ZWRPYmplY3QgIT0gT2JqZWN0O1xudmFyIFNMT1BQWV9NRVRIT0QgPSBzbG9wcHlBcnJheU1ldGhvZCgnam9pbicsICcsJyk7XG5cbi8vIGBBcnJheS5wcm90b3R5cGUuam9pbmAgbWV0aG9kXG4vLyBodHRwczovL3RjMzkuZ2l0aHViLmlvL2VjbWEyNjIvI3NlYy1hcnJheS5wcm90b3R5cGUuam9pblxuJCh7IHRhcmdldDogJ0FycmF5JywgcHJvdG86IHRydWUsIGZvcmNlZDogRVMzX1NUUklOR1MgfHwgU0xPUFBZX01FVEhPRCB9LCB7XG4gIGpvaW46IGZ1bmN0aW9uIGpvaW4oc2VwYXJhdG9yKSB7XG4gICAgcmV0dXJuIG5hdGl2ZUpvaW4uY2FsbCh0b0luZGV4ZWRPYmplY3QodGhpcyksIHNlcGFyYXRvciA9PT0gdW5kZWZpbmVkID8gJywnIDogc2VwYXJhdG9yKTtcbiAgfVxufSk7XG4iLCJ2YXIgJCA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9leHBvcnQnKTtcbnZhciBsYXN0SW5kZXhPZiA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9hcnJheS1sYXN0LWluZGV4LW9mJyk7XG5cbi8vIGBBcnJheS5wcm90b3R5cGUubGFzdEluZGV4T2ZgIG1ldGhvZFxuLy8gaHR0cHM6Ly90YzM5LmdpdGh1Yi5pby9lY21hMjYyLyNzZWMtYXJyYXkucHJvdG90eXBlLmxhc3RpbmRleG9mXG4kKHsgdGFyZ2V0OiAnQXJyYXknLCBwcm90bzogdHJ1ZSwgZm9yY2VkOiBsYXN0SW5kZXhPZiAhPT0gW10ubGFzdEluZGV4T2YgfSwge1xuICBsYXN0SW5kZXhPZjogbGFzdEluZGV4T2Zcbn0pO1xuIiwiJ3VzZSBzdHJpY3QnO1xudmFyICQgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvZXhwb3J0Jyk7XG52YXIgJG1hcCA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9hcnJheS1pdGVyYXRpb24nKS5tYXA7XG52YXIgZmFpbHMgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvZmFpbHMnKTtcbnZhciBhcnJheU1ldGhvZEhhc1NwZWNpZXNTdXBwb3J0ID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL2FycmF5LW1ldGhvZC1oYXMtc3BlY2llcy1zdXBwb3J0Jyk7XG5cbnZhciBIQVNfU1BFQ0lFU19TVVBQT1JUID0gYXJyYXlNZXRob2RIYXNTcGVjaWVzU3VwcG9ydCgnbWFwJyk7XG4vLyBGRjQ5LSBpc3N1ZVxudmFyIFVTRVNfVE9fTEVOR1RIID0gSEFTX1NQRUNJRVNfU1VQUE9SVCAmJiAhZmFpbHMoZnVuY3Rpb24gKCkge1xuICBbXS5tYXAuY2FsbCh7IGxlbmd0aDogLTEsIDA6IDEgfSwgZnVuY3Rpb24gKGl0KSB7IHRocm93IGl0OyB9KTtcbn0pO1xuXG4vLyBgQXJyYXkucHJvdG90eXBlLm1hcGAgbWV0aG9kXG4vLyBodHRwczovL3RjMzkuZ2l0aHViLmlvL2VjbWEyNjIvI3NlYy1hcnJheS5wcm90b3R5cGUubWFwXG4vLyB3aXRoIGFkZGluZyBzdXBwb3J0IG9mIEBAc3BlY2llc1xuJCh7IHRhcmdldDogJ0FycmF5JywgcHJvdG86IHRydWUsIGZvcmNlZDogIUhBU19TUEVDSUVTX1NVUFBPUlQgfHwgIVVTRVNfVE9fTEVOR1RIIH0sIHtcbiAgbWFwOiBmdW5jdGlvbiBtYXAoY2FsbGJhY2tmbiAvKiAsIHRoaXNBcmcgKi8pIHtcbiAgICByZXR1cm4gJG1hcCh0aGlzLCBjYWxsYmFja2ZuLCBhcmd1bWVudHMubGVuZ3RoID4gMSA/IGFyZ3VtZW50c1sxXSA6IHVuZGVmaW5lZCk7XG4gIH1cbn0pO1xuIiwiJ3VzZSBzdHJpY3QnO1xudmFyICQgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvZXhwb3J0Jyk7XG52YXIgZmFpbHMgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvZmFpbHMnKTtcbnZhciBjcmVhdGVQcm9wZXJ0eSA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9jcmVhdGUtcHJvcGVydHknKTtcblxudmFyIElTTlRfR0VORVJJQyA9IGZhaWxzKGZ1bmN0aW9uICgpIHtcbiAgZnVuY3Rpb24gRigpIHsgLyogZW1wdHkgKi8gfVxuICByZXR1cm4gIShBcnJheS5vZi5jYWxsKEYpIGluc3RhbmNlb2YgRik7XG59KTtcblxuLy8gYEFycmF5Lm9mYCBtZXRob2Rcbi8vIGh0dHBzOi8vdGMzOS5naXRodWIuaW8vZWNtYTI2Mi8jc2VjLWFycmF5Lm9mXG4vLyBXZWJLaXQgQXJyYXkub2YgaXNuJ3QgZ2VuZXJpY1xuJCh7IHRhcmdldDogJ0FycmF5Jywgc3RhdDogdHJ1ZSwgZm9yY2VkOiBJU05UX0dFTkVSSUMgfSwge1xuICBvZjogZnVuY3Rpb24gb2YoLyogLi4uYXJncyAqLykge1xuICAgIHZhciBpbmRleCA9IDA7XG4gICAgdmFyIGFyZ3VtZW50c0xlbmd0aCA9IGFyZ3VtZW50cy5sZW5ndGg7XG4gICAgdmFyIHJlc3VsdCA9IG5ldyAodHlwZW9mIHRoaXMgPT0gJ2Z1bmN0aW9uJyA/IHRoaXMgOiBBcnJheSkoYXJndW1lbnRzTGVuZ3RoKTtcbiAgICB3aGlsZSAoYXJndW1lbnRzTGVuZ3RoID4gaW5kZXgpIGNyZWF0ZVByb3BlcnR5KHJlc3VsdCwgaW5kZXgsIGFyZ3VtZW50c1tpbmRleCsrXSk7XG4gICAgcmVzdWx0Lmxlbmd0aCA9IGFyZ3VtZW50c0xlbmd0aDtcbiAgICByZXR1cm4gcmVzdWx0O1xuICB9XG59KTtcbiIsIid1c2Ugc3RyaWN0JztcbnZhciAkID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL2V4cG9ydCcpO1xudmFyICRyZWR1Y2VSaWdodCA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9hcnJheS1yZWR1Y2UnKS5yaWdodDtcbnZhciBzbG9wcHlBcnJheU1ldGhvZCA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9zbG9wcHktYXJyYXktbWV0aG9kJyk7XG5cbi8vIGBBcnJheS5wcm90b3R5cGUucmVkdWNlUmlnaHRgIG1ldGhvZFxuLy8gaHR0cHM6Ly90YzM5LmdpdGh1Yi5pby9lY21hMjYyLyNzZWMtYXJyYXkucHJvdG90eXBlLnJlZHVjZXJpZ2h0XG4kKHsgdGFyZ2V0OiAnQXJyYXknLCBwcm90bzogdHJ1ZSwgZm9yY2VkOiBzbG9wcHlBcnJheU1ldGhvZCgncmVkdWNlUmlnaHQnKSB9LCB7XG4gIHJlZHVjZVJpZ2h0OiBmdW5jdGlvbiByZWR1Y2VSaWdodChjYWxsYmFja2ZuIC8qICwgaW5pdGlhbFZhbHVlICovKSB7XG4gICAgcmV0dXJuICRyZWR1Y2VSaWdodCh0aGlzLCBjYWxsYmFja2ZuLCBhcmd1bWVudHMubGVuZ3RoLCBhcmd1bWVudHMubGVuZ3RoID4gMSA/IGFyZ3VtZW50c1sxXSA6IHVuZGVmaW5lZCk7XG4gIH1cbn0pO1xuIiwiJ3VzZSBzdHJpY3QnO1xudmFyICQgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvZXhwb3J0Jyk7XG52YXIgJHJlZHVjZSA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9hcnJheS1yZWR1Y2UnKS5sZWZ0O1xudmFyIHNsb3BweUFycmF5TWV0aG9kID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL3Nsb3BweS1hcnJheS1tZXRob2QnKTtcblxuLy8gYEFycmF5LnByb3RvdHlwZS5yZWR1Y2VgIG1ldGhvZFxuLy8gaHR0cHM6Ly90YzM5LmdpdGh1Yi5pby9lY21hMjYyLyNzZWMtYXJyYXkucHJvdG90eXBlLnJlZHVjZVxuJCh7IHRhcmdldDogJ0FycmF5JywgcHJvdG86IHRydWUsIGZvcmNlZDogc2xvcHB5QXJyYXlNZXRob2QoJ3JlZHVjZScpIH0sIHtcbiAgcmVkdWNlOiBmdW5jdGlvbiByZWR1Y2UoY2FsbGJhY2tmbiAvKiAsIGluaXRpYWxWYWx1ZSAqLykge1xuICAgIHJldHVybiAkcmVkdWNlKHRoaXMsIGNhbGxiYWNrZm4sIGFyZ3VtZW50cy5sZW5ndGgsIGFyZ3VtZW50cy5sZW5ndGggPiAxID8gYXJndW1lbnRzWzFdIDogdW5kZWZpbmVkKTtcbiAgfVxufSk7XG4iLCIndXNlIHN0cmljdCc7XG52YXIgJCA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9leHBvcnQnKTtcbnZhciBpc0FycmF5ID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL2lzLWFycmF5Jyk7XG5cbnZhciBuYXRpdmVSZXZlcnNlID0gW10ucmV2ZXJzZTtcbnZhciB0ZXN0ID0gWzEsIDJdO1xuXG4vLyBgQXJyYXkucHJvdG90eXBlLnJldmVyc2VgIG1ldGhvZFxuLy8gaHR0cHM6Ly90YzM5LmdpdGh1Yi5pby9lY21hMjYyLyNzZWMtYXJyYXkucHJvdG90eXBlLnJldmVyc2Vcbi8vIGZpeCBmb3IgU2FmYXJpIDEyLjAgYnVnXG4vLyBodHRwczovL2J1Z3Mud2Via2l0Lm9yZy9zaG93X2J1Zy5jZ2k/aWQ9MTg4Nzk0XG4kKHsgdGFyZ2V0OiAnQXJyYXknLCBwcm90bzogdHJ1ZSwgZm9yY2VkOiBTdHJpbmcodGVzdCkgPT09IFN0cmluZyh0ZXN0LnJldmVyc2UoKSkgfSwge1xuICByZXZlcnNlOiBmdW5jdGlvbiByZXZlcnNlKCkge1xuICAgIC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBuby1zZWxmLWFzc2lnblxuICAgIGlmIChpc0FycmF5KHRoaXMpKSB0aGlzLmxlbmd0aCA9IHRoaXMubGVuZ3RoO1xuICAgIHJldHVybiBuYXRpdmVSZXZlcnNlLmNhbGwodGhpcyk7XG4gIH1cbn0pO1xuIiwiJ3VzZSBzdHJpY3QnO1xudmFyICQgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvZXhwb3J0Jyk7XG52YXIgaXNPYmplY3QgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvaXMtb2JqZWN0Jyk7XG52YXIgaXNBcnJheSA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9pcy1hcnJheScpO1xudmFyIHRvQWJzb2x1dGVJbmRleCA9IHJlcXVpcmUoJy4uL2ludGVybmFscy90by1hYnNvbHV0ZS1pbmRleCcpO1xudmFyIHRvTGVuZ3RoID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL3RvLWxlbmd0aCcpO1xudmFyIHRvSW5kZXhlZE9iamVjdCA9IHJlcXVpcmUoJy4uL2ludGVybmFscy90by1pbmRleGVkLW9iamVjdCcpO1xudmFyIGNyZWF0ZVByb3BlcnR5ID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL2NyZWF0ZS1wcm9wZXJ0eScpO1xudmFyIGFycmF5TWV0aG9kSGFzU3BlY2llc1N1cHBvcnQgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvYXJyYXktbWV0aG9kLWhhcy1zcGVjaWVzLXN1cHBvcnQnKTtcbnZhciB3ZWxsS25vd25TeW1ib2wgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvd2VsbC1rbm93bi1zeW1ib2wnKTtcblxudmFyIFNQRUNJRVMgPSB3ZWxsS25vd25TeW1ib2woJ3NwZWNpZXMnKTtcbnZhciBuYXRpdmVTbGljZSA9IFtdLnNsaWNlO1xudmFyIG1heCA9IE1hdGgubWF4O1xuXG4vLyBgQXJyYXkucHJvdG90eXBlLnNsaWNlYCBtZXRob2Rcbi8vIGh0dHBzOi8vdGMzOS5naXRodWIuaW8vZWNtYTI2Mi8jc2VjLWFycmF5LnByb3RvdHlwZS5zbGljZVxuLy8gZmFsbGJhY2sgZm9yIG5vdCBhcnJheS1saWtlIEVTMyBzdHJpbmdzIGFuZCBET00gb2JqZWN0c1xuJCh7IHRhcmdldDogJ0FycmF5JywgcHJvdG86IHRydWUsIGZvcmNlZDogIWFycmF5TWV0aG9kSGFzU3BlY2llc1N1cHBvcnQoJ3NsaWNlJykgfSwge1xuICBzbGljZTogZnVuY3Rpb24gc2xpY2Uoc3RhcnQsIGVuZCkge1xuICAgIHZhciBPID0gdG9JbmRleGVkT2JqZWN0KHRoaXMpO1xuICAgIHZhciBsZW5ndGggPSB0b0xlbmd0aChPLmxlbmd0aCk7XG4gICAgdmFyIGsgPSB0b0Fic29sdXRlSW5kZXgoc3RhcnQsIGxlbmd0aCk7XG4gICAgdmFyIGZpbiA9IHRvQWJzb2x1dGVJbmRleChlbmQgPT09IHVuZGVmaW5lZCA/IGxlbmd0aCA6IGVuZCwgbGVuZ3RoKTtcbiAgICAvLyBpbmxpbmUgYEFycmF5U3BlY2llc0NyZWF0ZWAgZm9yIHVzYWdlIG5hdGl2ZSBgQXJyYXkjc2xpY2VgIHdoZXJlIGl0J3MgcG9zc2libGVcbiAgICB2YXIgQ29uc3RydWN0b3IsIHJlc3VsdCwgbjtcbiAgICBpZiAoaXNBcnJheShPKSkge1xuICAgICAgQ29uc3RydWN0b3IgPSBPLmNvbnN0cnVjdG9yO1xuICAgICAgLy8gY3Jvc3MtcmVhbG0gZmFsbGJhY2tcbiAgICAgIGlmICh0eXBlb2YgQ29uc3RydWN0b3IgPT0gJ2Z1bmN0aW9uJyAmJiAoQ29uc3RydWN0b3IgPT09IEFycmF5IHx8IGlzQXJyYXkoQ29uc3RydWN0b3IucHJvdG90eXBlKSkpIHtcbiAgICAgICAgQ29uc3RydWN0b3IgPSB1bmRlZmluZWQ7XG4gICAgICB9IGVsc2UgaWYgKGlzT2JqZWN0KENvbnN0cnVjdG9yKSkge1xuICAgICAgICBDb25zdHJ1Y3RvciA9IENvbnN0cnVjdG9yW1NQRUNJRVNdO1xuICAgICAgICBpZiAoQ29uc3RydWN0b3IgPT09IG51bGwpIENvbnN0cnVjdG9yID0gdW5kZWZpbmVkO1xuICAgICAgfVxuICAgICAgaWYgKENvbnN0cnVjdG9yID09PSBBcnJheSB8fCBDb25zdHJ1Y3RvciA9PT0gdW5kZWZpbmVkKSB7XG4gICAgICAgIHJldHVybiBuYXRpdmVTbGljZS5jYWxsKE8sIGssIGZpbik7XG4gICAgICB9XG4gICAgfVxuICAgIHJlc3VsdCA9IG5ldyAoQ29uc3RydWN0b3IgPT09IHVuZGVmaW5lZCA/IEFycmF5IDogQ29uc3RydWN0b3IpKG1heChmaW4gLSBrLCAwKSk7XG4gICAgZm9yIChuID0gMDsgayA8IGZpbjsgaysrLCBuKyspIGlmIChrIGluIE8pIGNyZWF0ZVByb3BlcnR5KHJlc3VsdCwgbiwgT1trXSk7XG4gICAgcmVzdWx0Lmxlbmd0aCA9IG47XG4gICAgcmV0dXJuIHJlc3VsdDtcbiAgfVxufSk7XG4iLCIndXNlIHN0cmljdCc7XG52YXIgJCA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9leHBvcnQnKTtcbnZhciAkc29tZSA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9hcnJheS1pdGVyYXRpb24nKS5zb21lO1xudmFyIHNsb3BweUFycmF5TWV0aG9kID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL3Nsb3BweS1hcnJheS1tZXRob2QnKTtcblxuLy8gYEFycmF5LnByb3RvdHlwZS5zb21lYCBtZXRob2Rcbi8vIGh0dHBzOi8vdGMzOS5naXRodWIuaW8vZWNtYTI2Mi8jc2VjLWFycmF5LnByb3RvdHlwZS5zb21lXG4kKHsgdGFyZ2V0OiAnQXJyYXknLCBwcm90bzogdHJ1ZSwgZm9yY2VkOiBzbG9wcHlBcnJheU1ldGhvZCgnc29tZScpIH0sIHtcbiAgc29tZTogZnVuY3Rpb24gc29tZShjYWxsYmFja2ZuIC8qICwgdGhpc0FyZyAqLykge1xuICAgIHJldHVybiAkc29tZSh0aGlzLCBjYWxsYmFja2ZuLCBhcmd1bWVudHMubGVuZ3RoID4gMSA/IGFyZ3VtZW50c1sxXSA6IHVuZGVmaW5lZCk7XG4gIH1cbn0pO1xuIiwiJ3VzZSBzdHJpY3QnO1xudmFyICQgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvZXhwb3J0Jyk7XG52YXIgYUZ1bmN0aW9uID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL2EtZnVuY3Rpb24nKTtcbnZhciB0b09iamVjdCA9IHJlcXVpcmUoJy4uL2ludGVybmFscy90by1vYmplY3QnKTtcbnZhciBmYWlscyA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9mYWlscycpO1xudmFyIHNsb3BweUFycmF5TWV0aG9kID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL3Nsb3BweS1hcnJheS1tZXRob2QnKTtcblxudmFyIHRlc3QgPSBbXTtcbnZhciBuYXRpdmVTb3J0ID0gdGVzdC5zb3J0O1xuXG4vLyBJRTgtXG52YXIgRkFJTFNfT05fVU5ERUZJTkVEID0gZmFpbHMoZnVuY3Rpb24gKCkge1xuICB0ZXN0LnNvcnQodW5kZWZpbmVkKTtcbn0pO1xuLy8gVjggYnVnXG52YXIgRkFJTFNfT05fTlVMTCA9IGZhaWxzKGZ1bmN0aW9uICgpIHtcbiAgdGVzdC5zb3J0KG51bGwpO1xufSk7XG4vLyBPbGQgV2ViS2l0XG52YXIgU0xPUFBZX01FVEhPRCA9IHNsb3BweUFycmF5TWV0aG9kKCdzb3J0Jyk7XG5cbnZhciBGT1JDRUQgPSBGQUlMU19PTl9VTkRFRklORUQgfHwgIUZBSUxTX09OX05VTEwgfHwgU0xPUFBZX01FVEhPRDtcblxuLy8gYEFycmF5LnByb3RvdHlwZS5zb3J0YCBtZXRob2Rcbi8vIGh0dHBzOi8vdGMzOS5naXRodWIuaW8vZWNtYTI2Mi8jc2VjLWFycmF5LnByb3RvdHlwZS5zb3J0XG4kKHsgdGFyZ2V0OiAnQXJyYXknLCBwcm90bzogdHJ1ZSwgZm9yY2VkOiBGT1JDRUQgfSwge1xuICBzb3J0OiBmdW5jdGlvbiBzb3J0KGNvbXBhcmVmbikge1xuICAgIHJldHVybiBjb21wYXJlZm4gPT09IHVuZGVmaW5lZFxuICAgICAgPyBuYXRpdmVTb3J0LmNhbGwodG9PYmplY3QodGhpcykpXG4gICAgICA6IG5hdGl2ZVNvcnQuY2FsbCh0b09iamVjdCh0aGlzKSwgYUZ1bmN0aW9uKGNvbXBhcmVmbikpO1xuICB9XG59KTtcbiIsInZhciBzZXRTcGVjaWVzID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL3NldC1zcGVjaWVzJyk7XG5cbi8vIGBBcnJheVtAQHNwZWNpZXNdYCBnZXR0ZXJcbi8vIGh0dHBzOi8vdGMzOS5naXRodWIuaW8vZWNtYTI2Mi8jc2VjLWdldC1hcnJheS1AQHNwZWNpZXNcbnNldFNwZWNpZXMoJ0FycmF5Jyk7XG4iLCIndXNlIHN0cmljdCc7XG52YXIgJCA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9leHBvcnQnKTtcbnZhciB0b0Fic29sdXRlSW5kZXggPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvdG8tYWJzb2x1dGUtaW5kZXgnKTtcbnZhciB0b0ludGVnZXIgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvdG8taW50ZWdlcicpO1xudmFyIHRvTGVuZ3RoID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL3RvLWxlbmd0aCcpO1xudmFyIHRvT2JqZWN0ID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL3RvLW9iamVjdCcpO1xudmFyIGFycmF5U3BlY2llc0NyZWF0ZSA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9hcnJheS1zcGVjaWVzLWNyZWF0ZScpO1xudmFyIGNyZWF0ZVByb3BlcnR5ID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL2NyZWF0ZS1wcm9wZXJ0eScpO1xudmFyIGFycmF5TWV0aG9kSGFzU3BlY2llc1N1cHBvcnQgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvYXJyYXktbWV0aG9kLWhhcy1zcGVjaWVzLXN1cHBvcnQnKTtcblxudmFyIG1heCA9IE1hdGgubWF4O1xudmFyIG1pbiA9IE1hdGgubWluO1xudmFyIE1BWF9TQUZFX0lOVEVHRVIgPSAweDFGRkZGRkZGRkZGRkZGO1xudmFyIE1BWElNVU1fQUxMT1dFRF9MRU5HVEhfRVhDRUVERUQgPSAnTWF4aW11bSBhbGxvd2VkIGxlbmd0aCBleGNlZWRlZCc7XG5cbi8vIGBBcnJheS5wcm90b3R5cGUuc3BsaWNlYCBtZXRob2Rcbi8vIGh0dHBzOi8vdGMzOS5naXRodWIuaW8vZWNtYTI2Mi8jc2VjLWFycmF5LnByb3RvdHlwZS5zcGxpY2Vcbi8vIHdpdGggYWRkaW5nIHN1cHBvcnQgb2YgQEBzcGVjaWVzXG4kKHsgdGFyZ2V0OiAnQXJyYXknLCBwcm90bzogdHJ1ZSwgZm9yY2VkOiAhYXJyYXlNZXRob2RIYXNTcGVjaWVzU3VwcG9ydCgnc3BsaWNlJykgfSwge1xuICBzcGxpY2U6IGZ1bmN0aW9uIHNwbGljZShzdGFydCwgZGVsZXRlQ291bnQgLyogLCAuLi5pdGVtcyAqLykge1xuICAgIHZhciBPID0gdG9PYmplY3QodGhpcyk7XG4gICAgdmFyIGxlbiA9IHRvTGVuZ3RoKE8ubGVuZ3RoKTtcbiAgICB2YXIgYWN0dWFsU3RhcnQgPSB0b0Fic29sdXRlSW5kZXgoc3RhcnQsIGxlbik7XG4gICAgdmFyIGFyZ3VtZW50c0xlbmd0aCA9IGFyZ3VtZW50cy5sZW5ndGg7XG4gICAgdmFyIGluc2VydENvdW50LCBhY3R1YWxEZWxldGVDb3VudCwgQSwgaywgZnJvbSwgdG87XG4gICAgaWYgKGFyZ3VtZW50c0xlbmd0aCA9PT0gMCkge1xuICAgICAgaW5zZXJ0Q291bnQgPSBhY3R1YWxEZWxldGVDb3VudCA9IDA7XG4gICAgfSBlbHNlIGlmIChhcmd1bWVudHNMZW5ndGggPT09IDEpIHtcbiAgICAgIGluc2VydENvdW50ID0gMDtcbiAgICAgIGFjdHVhbERlbGV0ZUNvdW50ID0gbGVuIC0gYWN0dWFsU3RhcnQ7XG4gICAgfSBlbHNlIHtcbiAgICAgIGluc2VydENvdW50ID0gYXJndW1lbnRzTGVuZ3RoIC0gMjtcbiAgICAgIGFjdHVhbERlbGV0ZUNvdW50ID0gbWluKG1heCh0b0ludGVnZXIoZGVsZXRlQ291bnQpLCAwKSwgbGVuIC0gYWN0dWFsU3RhcnQpO1xuICAgIH1cbiAgICBpZiAobGVuICsgaW5zZXJ0Q291bnQgLSBhY3R1YWxEZWxldGVDb3VudCA+IE1BWF9TQUZFX0lOVEVHRVIpIHtcbiAgICAgIHRocm93IFR5cGVFcnJvcihNQVhJTVVNX0FMTE9XRURfTEVOR1RIX0VYQ0VFREVEKTtcbiAgICB9XG4gICAgQSA9IGFycmF5U3BlY2llc0NyZWF0ZShPLCBhY3R1YWxEZWxldGVDb3VudCk7XG4gICAgZm9yIChrID0gMDsgayA8IGFjdHVhbERlbGV0ZUNvdW50OyBrKyspIHtcbiAgICAgIGZyb20gPSBhY3R1YWxTdGFydCArIGs7XG4gICAgICBpZiAoZnJvbSBpbiBPKSBjcmVhdGVQcm9wZXJ0eShBLCBrLCBPW2Zyb21dKTtcbiAgICB9XG4gICAgQS5sZW5ndGggPSBhY3R1YWxEZWxldGVDb3VudDtcbiAgICBpZiAoaW5zZXJ0Q291bnQgPCBhY3R1YWxEZWxldGVDb3VudCkge1xuICAgICAgZm9yIChrID0gYWN0dWFsU3RhcnQ7IGsgPCBsZW4gLSBhY3R1YWxEZWxldGVDb3VudDsgaysrKSB7XG4gICAgICAgIGZyb20gPSBrICsgYWN0dWFsRGVsZXRlQ291bnQ7XG4gICAgICAgIHRvID0gayArIGluc2VydENvdW50O1xuICAgICAgICBpZiAoZnJvbSBpbiBPKSBPW3RvXSA9IE9bZnJvbV07XG4gICAgICAgIGVsc2UgZGVsZXRlIE9bdG9dO1xuICAgICAgfVxuICAgICAgZm9yIChrID0gbGVuOyBrID4gbGVuIC0gYWN0dWFsRGVsZXRlQ291bnQgKyBpbnNlcnRDb3VudDsgay0tKSBkZWxldGUgT1trIC0gMV07XG4gICAgfSBlbHNlIGlmIChpbnNlcnRDb3VudCA+IGFjdHVhbERlbGV0ZUNvdW50KSB7XG4gICAgICBmb3IgKGsgPSBsZW4gLSBhY3R1YWxEZWxldGVDb3VudDsgayA+IGFjdHVhbFN0YXJ0OyBrLS0pIHtcbiAgICAgICAgZnJvbSA9IGsgKyBhY3R1YWxEZWxldGVDb3VudCAtIDE7XG4gICAgICAgIHRvID0gayArIGluc2VydENvdW50IC0gMTtcbiAgICAgICAgaWYgKGZyb20gaW4gTykgT1t0b10gPSBPW2Zyb21dO1xuICAgICAgICBlbHNlIGRlbGV0ZSBPW3RvXTtcbiAgICAgIH1cbiAgICB9XG4gICAgZm9yIChrID0gMDsgayA8IGluc2VydENvdW50OyBrKyspIHtcbiAgICAgIE9bayArIGFjdHVhbFN0YXJ0XSA9IGFyZ3VtZW50c1trICsgMl07XG4gICAgfVxuICAgIE8ubGVuZ3RoID0gbGVuIC0gYWN0dWFsRGVsZXRlQ291bnQgKyBpbnNlcnRDb3VudDtcbiAgICByZXR1cm4gQTtcbiAgfVxufSk7XG4iLCIvLyB0aGlzIG1ldGhvZCB3YXMgYWRkZWQgdG8gdW5zY29wYWJsZXMgYWZ0ZXIgaW1wbGVtZW50YXRpb25cbi8vIGluIHBvcHVsYXIgZW5naW5lcywgc28gaXQncyBtb3ZlZCB0byBhIHNlcGFyYXRlIG1vZHVsZVxudmFyIGFkZFRvVW5zY29wYWJsZXMgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvYWRkLXRvLXVuc2NvcGFibGVzJyk7XG5cbmFkZFRvVW5zY29wYWJsZXMoJ2ZsYXRNYXAnKTtcbiIsIi8vIHRoaXMgbWV0aG9kIHdhcyBhZGRlZCB0byB1bnNjb3BhYmxlcyBhZnRlciBpbXBsZW1lbnRhdGlvblxuLy8gaW4gcG9wdWxhciBlbmdpbmVzLCBzbyBpdCdzIG1vdmVkIHRvIGEgc2VwYXJhdGUgbW9kdWxlXG52YXIgYWRkVG9VbnNjb3BhYmxlcyA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9hZGQtdG8tdW5zY29wYWJsZXMnKTtcblxuYWRkVG9VbnNjb3BhYmxlcygnZmxhdCcpO1xuIiwidmFyIFRPX1NUUklOR19UQUdfU1VQUE9SVCA9IHJlcXVpcmUoJy4uL2ludGVybmFscy90by1zdHJpbmctdGFnLXN1cHBvcnQnKTtcbnZhciByZWRlZmluZSA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9yZWRlZmluZScpO1xudmFyIHRvU3RyaW5nID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL29iamVjdC10by1zdHJpbmcnKTtcblxuLy8gYE9iamVjdC5wcm90b3R5cGUudG9TdHJpbmdgIG1ldGhvZFxuLy8gaHR0cHM6Ly90YzM5LmdpdGh1Yi5pby9lY21hMjYyLyNzZWMtb2JqZWN0LnByb3RvdHlwZS50b3N0cmluZ1xuaWYgKCFUT19TVFJJTkdfVEFHX1NVUFBPUlQpIHtcbiAgcmVkZWZpbmUoT2JqZWN0LnByb3RvdHlwZSwgJ3RvU3RyaW5nJywgdG9TdHJpbmcsIHsgdW5zYWZlOiB0cnVlIH0pO1xufVxuIiwidmFyICQgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvZXhwb3J0Jyk7XG52YXIgJHZhbHVlcyA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9vYmplY3QtdG8tYXJyYXknKS52YWx1ZXM7XG5cbi8vIGBPYmplY3QudmFsdWVzYCBtZXRob2Rcbi8vIGh0dHBzOi8vdGMzOS5naXRodWIuaW8vZWNtYTI2Mi8jc2VjLW9iamVjdC52YWx1ZXNcbiQoeyB0YXJnZXQ6ICdPYmplY3QnLCBzdGF0OiB0cnVlIH0sIHtcbiAgdmFsdWVzOiBmdW5jdGlvbiB2YWx1ZXMoTykge1xuICAgIHJldHVybiAkdmFsdWVzKE8pO1xuICB9XG59KTtcbiIsIid1c2Ugc3RyaWN0JztcbnZhciAkID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL2V4cG9ydCcpO1xudmFyIGFGdW5jdGlvbiA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9hLWZ1bmN0aW9uJyk7XG52YXIgbmV3UHJvbWlzZUNhcGFiaWxpdHlNb2R1bGUgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvbmV3LXByb21pc2UtY2FwYWJpbGl0eScpO1xudmFyIHBlcmZvcm0gPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvcGVyZm9ybScpO1xudmFyIGl0ZXJhdGUgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvaXRlcmF0ZScpO1xuXG4vLyBgUHJvbWlzZS5hbGxTZXR0bGVkYCBtZXRob2Rcbi8vIGh0dHBzOi8vZ2l0aHViLmNvbS90YzM5L3Byb3Bvc2FsLXByb21pc2UtYWxsU2V0dGxlZFxuJCh7IHRhcmdldDogJ1Byb21pc2UnLCBzdGF0OiB0cnVlIH0sIHtcbiAgYWxsU2V0dGxlZDogZnVuY3Rpb24gYWxsU2V0dGxlZChpdGVyYWJsZSkge1xuICAgIHZhciBDID0gdGhpcztcbiAgICB2YXIgY2FwYWJpbGl0eSA9IG5ld1Byb21pc2VDYXBhYmlsaXR5TW9kdWxlLmYoQyk7XG4gICAgdmFyIHJlc29sdmUgPSBjYXBhYmlsaXR5LnJlc29sdmU7XG4gICAgdmFyIHJlamVjdCA9IGNhcGFiaWxpdHkucmVqZWN0O1xuICAgIHZhciByZXN1bHQgPSBwZXJmb3JtKGZ1bmN0aW9uICgpIHtcbiAgICAgIHZhciBwcm9taXNlUmVzb2x2ZSA9IGFGdW5jdGlvbihDLnJlc29sdmUpO1xuICAgICAgdmFyIHZhbHVlcyA9IFtdO1xuICAgICAgdmFyIGNvdW50ZXIgPSAwO1xuICAgICAgdmFyIHJlbWFpbmluZyA9IDE7XG4gICAgICBpdGVyYXRlKGl0ZXJhYmxlLCBmdW5jdGlvbiAocHJvbWlzZSkge1xuICAgICAgICB2YXIgaW5kZXggPSBjb3VudGVyKys7XG4gICAgICAgIHZhciBhbHJlYWR5Q2FsbGVkID0gZmFsc2U7XG4gICAgICAgIHZhbHVlcy5wdXNoKHVuZGVmaW5lZCk7XG4gICAgICAgIHJlbWFpbmluZysrO1xuICAgICAgICBwcm9taXNlUmVzb2x2ZS5jYWxsKEMsIHByb21pc2UpLnRoZW4oZnVuY3Rpb24gKHZhbHVlKSB7XG4gICAgICAgICAgaWYgKGFscmVhZHlDYWxsZWQpIHJldHVybjtcbiAgICAgICAgICBhbHJlYWR5Q2FsbGVkID0gdHJ1ZTtcbiAgICAgICAgICB2YWx1ZXNbaW5kZXhdID0geyBzdGF0dXM6ICdmdWxmaWxsZWQnLCB2YWx1ZTogdmFsdWUgfTtcbiAgICAgICAgICAtLXJlbWFpbmluZyB8fCByZXNvbHZlKHZhbHVlcyk7XG4gICAgICAgIH0sIGZ1bmN0aW9uIChlKSB7XG4gICAgICAgICAgaWYgKGFscmVhZHlDYWxsZWQpIHJldHVybjtcbiAgICAgICAgICBhbHJlYWR5Q2FsbGVkID0gdHJ1ZTtcbiAgICAgICAgICB2YWx1ZXNbaW5kZXhdID0geyBzdGF0dXM6ICdyZWplY3RlZCcsIHJlYXNvbjogZSB9O1xuICAgICAgICAgIC0tcmVtYWluaW5nIHx8IHJlc29sdmUodmFsdWVzKTtcbiAgICAgICAgfSk7XG4gICAgICB9KTtcbiAgICAgIC0tcmVtYWluaW5nIHx8IHJlc29sdmUodmFsdWVzKTtcbiAgICB9KTtcbiAgICBpZiAocmVzdWx0LmVycm9yKSByZWplY3QocmVzdWx0LnZhbHVlKTtcbiAgICByZXR1cm4gY2FwYWJpbGl0eS5wcm9taXNlO1xuICB9XG59KTtcbiIsIid1c2Ugc3RyaWN0JztcbnZhciAkID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL2V4cG9ydCcpO1xudmFyIElTX1BVUkUgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvaXMtcHVyZScpO1xudmFyIE5hdGl2ZVByb21pc2UgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvbmF0aXZlLXByb21pc2UtY29uc3RydWN0b3InKTtcbnZhciBmYWlscyA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9mYWlscycpO1xudmFyIGdldEJ1aWx0SW4gPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvZ2V0LWJ1aWx0LWluJyk7XG52YXIgc3BlY2llc0NvbnN0cnVjdG9yID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL3NwZWNpZXMtY29uc3RydWN0b3InKTtcbnZhciBwcm9taXNlUmVzb2x2ZSA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9wcm9taXNlLXJlc29sdmUnKTtcbnZhciByZWRlZmluZSA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9yZWRlZmluZScpO1xuXG4vLyBTYWZhcmkgYnVnIGh0dHBzOi8vYnVncy53ZWJraXQub3JnL3Nob3dfYnVnLmNnaT9pZD0yMDA4MjlcbnZhciBOT05fR0VORVJJQyA9ICEhTmF0aXZlUHJvbWlzZSAmJiBmYWlscyhmdW5jdGlvbiAoKSB7XG4gIE5hdGl2ZVByb21pc2UucHJvdG90eXBlWydmaW5hbGx5J10uY2FsbCh7IHRoZW46IGZ1bmN0aW9uICgpIHsgLyogZW1wdHkgKi8gfSB9LCBmdW5jdGlvbiAoKSB7IC8qIGVtcHR5ICovIH0pO1xufSk7XG5cbi8vIGBQcm9taXNlLnByb3RvdHlwZS5maW5hbGx5YCBtZXRob2Rcbi8vIGh0dHBzOi8vdGMzOS5naXRodWIuaW8vZWNtYTI2Mi8jc2VjLXByb21pc2UucHJvdG90eXBlLmZpbmFsbHlcbiQoeyB0YXJnZXQ6ICdQcm9taXNlJywgcHJvdG86IHRydWUsIHJlYWw6IHRydWUsIGZvcmNlZDogTk9OX0dFTkVSSUMgfSwge1xuICAnZmluYWxseSc6IGZ1bmN0aW9uIChvbkZpbmFsbHkpIHtcbiAgICB2YXIgQyA9IHNwZWNpZXNDb25zdHJ1Y3Rvcih0aGlzLCBnZXRCdWlsdEluKCdQcm9taXNlJykpO1xuICAgIHZhciBpc0Z1bmN0aW9uID0gdHlwZW9mIG9uRmluYWxseSA9PSAnZnVuY3Rpb24nO1xuICAgIHJldHVybiB0aGlzLnRoZW4oXG4gICAgICBpc0Z1bmN0aW9uID8gZnVuY3Rpb24gKHgpIHtcbiAgICAgICAgcmV0dXJuIHByb21pc2VSZXNvbHZlKEMsIG9uRmluYWxseSgpKS50aGVuKGZ1bmN0aW9uICgpIHsgcmV0dXJuIHg7IH0pO1xuICAgICAgfSA6IG9uRmluYWxseSxcbiAgICAgIGlzRnVuY3Rpb24gPyBmdW5jdGlvbiAoZSkge1xuICAgICAgICByZXR1cm4gcHJvbWlzZVJlc29sdmUoQywgb25GaW5hbGx5KCkpLnRoZW4oZnVuY3Rpb24gKCkgeyB0aHJvdyBlOyB9KTtcbiAgICAgIH0gOiBvbkZpbmFsbHlcbiAgICApO1xuICB9XG59KTtcblxuLy8gcGF0Y2ggbmF0aXZlIFByb21pc2UucHJvdG90eXBlIGZvciBuYXRpdmUgYXN5bmMgZnVuY3Rpb25zXG5pZiAoIUlTX1BVUkUgJiYgdHlwZW9mIE5hdGl2ZVByb21pc2UgPT0gJ2Z1bmN0aW9uJyAmJiAhTmF0aXZlUHJvbWlzZS5wcm90b3R5cGVbJ2ZpbmFsbHknXSkge1xuICByZWRlZmluZShOYXRpdmVQcm9taXNlLnByb3RvdHlwZSwgJ2ZpbmFsbHknLCBnZXRCdWlsdEluKCdQcm9taXNlJykucHJvdG90eXBlWydmaW5hbGx5J10pO1xufVxuIiwiJ3VzZSBzdHJpY3QnO1xudmFyICQgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvZXhwb3J0Jyk7XG52YXIgSVNfUFVSRSA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9pcy1wdXJlJyk7XG52YXIgZ2xvYmFsID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL2dsb2JhbCcpO1xudmFyIGdldEJ1aWx0SW4gPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvZ2V0LWJ1aWx0LWluJyk7XG52YXIgTmF0aXZlUHJvbWlzZSA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9uYXRpdmUtcHJvbWlzZS1jb25zdHJ1Y3RvcicpO1xudmFyIHJlZGVmaW5lID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL3JlZGVmaW5lJyk7XG52YXIgcmVkZWZpbmVBbGwgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvcmVkZWZpbmUtYWxsJyk7XG52YXIgc2V0VG9TdHJpbmdUYWcgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvc2V0LXRvLXN0cmluZy10YWcnKTtcbnZhciBzZXRTcGVjaWVzID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL3NldC1zcGVjaWVzJyk7XG52YXIgaXNPYmplY3QgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvaXMtb2JqZWN0Jyk7XG52YXIgYUZ1bmN0aW9uID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL2EtZnVuY3Rpb24nKTtcbnZhciBhbkluc3RhbmNlID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL2FuLWluc3RhbmNlJyk7XG52YXIgY2xhc3NvZiA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9jbGFzc29mLXJhdycpO1xudmFyIGluc3BlY3RTb3VyY2UgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvaW5zcGVjdC1zb3VyY2UnKTtcbnZhciBpdGVyYXRlID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL2l0ZXJhdGUnKTtcbnZhciBjaGVja0NvcnJlY3RuZXNzT2ZJdGVyYXRpb24gPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvY2hlY2stY29ycmVjdG5lc3Mtb2YtaXRlcmF0aW9uJyk7XG52YXIgc3BlY2llc0NvbnN0cnVjdG9yID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL3NwZWNpZXMtY29uc3RydWN0b3InKTtcbnZhciB0YXNrID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL3Rhc2snKS5zZXQ7XG52YXIgbWljcm90YXNrID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL21pY3JvdGFzaycpO1xudmFyIHByb21pc2VSZXNvbHZlID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL3Byb21pc2UtcmVzb2x2ZScpO1xudmFyIGhvc3RSZXBvcnRFcnJvcnMgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvaG9zdC1yZXBvcnQtZXJyb3JzJyk7XG52YXIgbmV3UHJvbWlzZUNhcGFiaWxpdHlNb2R1bGUgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvbmV3LXByb21pc2UtY2FwYWJpbGl0eScpO1xudmFyIHBlcmZvcm0gPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvcGVyZm9ybScpO1xudmFyIEludGVybmFsU3RhdGVNb2R1bGUgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvaW50ZXJuYWwtc3RhdGUnKTtcbnZhciBpc0ZvcmNlZCA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9pcy1mb3JjZWQnKTtcbnZhciB3ZWxsS25vd25TeW1ib2wgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvd2VsbC1rbm93bi1zeW1ib2wnKTtcbnZhciBWOF9WRVJTSU9OID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL3Y4LXZlcnNpb24nKTtcblxudmFyIFNQRUNJRVMgPSB3ZWxsS25vd25TeW1ib2woJ3NwZWNpZXMnKTtcbnZhciBQUk9NSVNFID0gJ1Byb21pc2UnO1xudmFyIGdldEludGVybmFsU3RhdGUgPSBJbnRlcm5hbFN0YXRlTW9kdWxlLmdldDtcbnZhciBzZXRJbnRlcm5hbFN0YXRlID0gSW50ZXJuYWxTdGF0ZU1vZHVsZS5zZXQ7XG52YXIgZ2V0SW50ZXJuYWxQcm9taXNlU3RhdGUgPSBJbnRlcm5hbFN0YXRlTW9kdWxlLmdldHRlckZvcihQUk9NSVNFKTtcbnZhciBQcm9taXNlQ29uc3RydWN0b3IgPSBOYXRpdmVQcm9taXNlO1xudmFyIFR5cGVFcnJvciA9IGdsb2JhbC5UeXBlRXJyb3I7XG52YXIgZG9jdW1lbnQgPSBnbG9iYWwuZG9jdW1lbnQ7XG52YXIgcHJvY2VzcyA9IGdsb2JhbC5wcm9jZXNzO1xudmFyICRmZXRjaCA9IGdldEJ1aWx0SW4oJ2ZldGNoJyk7XG52YXIgbmV3UHJvbWlzZUNhcGFiaWxpdHkgPSBuZXdQcm9taXNlQ2FwYWJpbGl0eU1vZHVsZS5mO1xudmFyIG5ld0dlbmVyaWNQcm9taXNlQ2FwYWJpbGl0eSA9IG5ld1Byb21pc2VDYXBhYmlsaXR5O1xudmFyIElTX05PREUgPSBjbGFzc29mKHByb2Nlc3MpID09ICdwcm9jZXNzJztcbnZhciBESVNQQVRDSF9FVkVOVCA9ICEhKGRvY3VtZW50ICYmIGRvY3VtZW50LmNyZWF0ZUV2ZW50ICYmIGdsb2JhbC5kaXNwYXRjaEV2ZW50KTtcbnZhciBVTkhBTkRMRURfUkVKRUNUSU9OID0gJ3VuaGFuZGxlZHJlamVjdGlvbic7XG52YXIgUkVKRUNUSU9OX0hBTkRMRUQgPSAncmVqZWN0aW9uaGFuZGxlZCc7XG52YXIgUEVORElORyA9IDA7XG52YXIgRlVMRklMTEVEID0gMTtcbnZhciBSRUpFQ1RFRCA9IDI7XG52YXIgSEFORExFRCA9IDE7XG52YXIgVU5IQU5ETEVEID0gMjtcbnZhciBJbnRlcm5hbCwgT3duUHJvbWlzZUNhcGFiaWxpdHksIFByb21pc2VXcmFwcGVyLCBuYXRpdmVUaGVuO1xuXG52YXIgRk9SQ0VEID0gaXNGb3JjZWQoUFJPTUlTRSwgZnVuY3Rpb24gKCkge1xuICB2YXIgR0xPQkFMX0NPUkVfSlNfUFJPTUlTRSA9IGluc3BlY3RTb3VyY2UoUHJvbWlzZUNvbnN0cnVjdG9yKSAhPT0gU3RyaW5nKFByb21pc2VDb25zdHJ1Y3Rvcik7XG4gIGlmICghR0xPQkFMX0NPUkVfSlNfUFJPTUlTRSkge1xuICAgIC8vIFY4IDYuNiAoTm9kZSAxMCBhbmQgQ2hyb21lIDY2KSBoYXZlIGEgYnVnIHdpdGggcmVzb2x2aW5nIGN1c3RvbSB0aGVuYWJsZXNcbiAgICAvLyBodHRwczovL2J1Z3MuY2hyb21pdW0ub3JnL3AvY2hyb21pdW0vaXNzdWVzL2RldGFpbD9pZD04MzA1NjVcbiAgICAvLyBXZSBjYW4ndCBkZXRlY3QgaXQgc3luY2hyb25vdXNseSwgc28ganVzdCBjaGVjayB2ZXJzaW9uc1xuICAgIGlmIChWOF9WRVJTSU9OID09PSA2NikgcmV0dXJuIHRydWU7XG4gICAgLy8gVW5oYW5kbGVkIHJlamVjdGlvbnMgdHJhY2tpbmcgc3VwcG9ydCwgTm9kZUpTIFByb21pc2Ugd2l0aG91dCBpdCBmYWlscyBAQHNwZWNpZXMgdGVzdFxuICAgIGlmICghSVNfTk9ERSAmJiB0eXBlb2YgUHJvbWlzZVJlamVjdGlvbkV2ZW50ICE9ICdmdW5jdGlvbicpIHJldHVybiB0cnVlO1xuICB9XG4gIC8vIFdlIG5lZWQgUHJvbWlzZSNmaW5hbGx5IGluIHRoZSBwdXJlIHZlcnNpb24gZm9yIHByZXZlbnRpbmcgcHJvdG90eXBlIHBvbGx1dGlvblxuICBpZiAoSVNfUFVSRSAmJiAhUHJvbWlzZUNvbnN0cnVjdG9yLnByb3RvdHlwZVsnZmluYWxseSddKSByZXR1cm4gdHJ1ZTtcbiAgLy8gV2UgY2FuJ3QgdXNlIEBAc3BlY2llcyBmZWF0dXJlIGRldGVjdGlvbiBpbiBWOCBzaW5jZSBpdCBjYXVzZXNcbiAgLy8gZGVvcHRpbWl6YXRpb24gYW5kIHBlcmZvcm1hbmNlIGRlZ3JhZGF0aW9uXG4gIC8vIGh0dHBzOi8vZ2l0aHViLmNvbS96bG9pcm9jay9jb3JlLWpzL2lzc3Vlcy82NzlcbiAgaWYgKFY4X1ZFUlNJT04gPj0gNTEgJiYgL25hdGl2ZSBjb2RlLy50ZXN0KFByb21pc2VDb25zdHJ1Y3RvcikpIHJldHVybiBmYWxzZTtcbiAgLy8gRGV0ZWN0IGNvcnJlY3RuZXNzIG9mIHN1YmNsYXNzaW5nIHdpdGggQEBzcGVjaWVzIHN1cHBvcnRcbiAgdmFyIHByb21pc2UgPSBQcm9taXNlQ29uc3RydWN0b3IucmVzb2x2ZSgxKTtcbiAgdmFyIEZha2VQcm9taXNlID0gZnVuY3Rpb24gKGV4ZWMpIHtcbiAgICBleGVjKGZ1bmN0aW9uICgpIHsgLyogZW1wdHkgKi8gfSwgZnVuY3Rpb24gKCkgeyAvKiBlbXB0eSAqLyB9KTtcbiAgfTtcbiAgdmFyIGNvbnN0cnVjdG9yID0gcHJvbWlzZS5jb25zdHJ1Y3RvciA9IHt9O1xuICBjb25zdHJ1Y3RvcltTUEVDSUVTXSA9IEZha2VQcm9taXNlO1xuICByZXR1cm4gIShwcm9taXNlLnRoZW4oZnVuY3Rpb24gKCkgeyAvKiBlbXB0eSAqLyB9KSBpbnN0YW5jZW9mIEZha2VQcm9taXNlKTtcbn0pO1xuXG52YXIgSU5DT1JSRUNUX0lURVJBVElPTiA9IEZPUkNFRCB8fCAhY2hlY2tDb3JyZWN0bmVzc09mSXRlcmF0aW9uKGZ1bmN0aW9uIChpdGVyYWJsZSkge1xuICBQcm9taXNlQ29uc3RydWN0b3IuYWxsKGl0ZXJhYmxlKVsnY2F0Y2gnXShmdW5jdGlvbiAoKSB7IC8qIGVtcHR5ICovIH0pO1xufSk7XG5cbi8vIGhlbHBlcnNcbnZhciBpc1RoZW5hYmxlID0gZnVuY3Rpb24gKGl0KSB7XG4gIHZhciB0aGVuO1xuICByZXR1cm4gaXNPYmplY3QoaXQpICYmIHR5cGVvZiAodGhlbiA9IGl0LnRoZW4pID09ICdmdW5jdGlvbicgPyB0aGVuIDogZmFsc2U7XG59O1xuXG52YXIgbm90aWZ5ID0gZnVuY3Rpb24gKHByb21pc2UsIHN0YXRlLCBpc1JlamVjdCkge1xuICBpZiAoc3RhdGUubm90aWZpZWQpIHJldHVybjtcbiAgc3RhdGUubm90aWZpZWQgPSB0cnVlO1xuICB2YXIgY2hhaW4gPSBzdGF0ZS5yZWFjdGlvbnM7XG4gIG1pY3JvdGFzayhmdW5jdGlvbiAoKSB7XG4gICAgdmFyIHZhbHVlID0gc3RhdGUudmFsdWU7XG4gICAgdmFyIG9rID0gc3RhdGUuc3RhdGUgPT0gRlVMRklMTEVEO1xuICAgIHZhciBpbmRleCA9IDA7XG4gICAgLy8gdmFyaWFibGUgbGVuZ3RoIC0gY2FuJ3QgdXNlIGZvckVhY2hcbiAgICB3aGlsZSAoY2hhaW4ubGVuZ3RoID4gaW5kZXgpIHtcbiAgICAgIHZhciByZWFjdGlvbiA9IGNoYWluW2luZGV4KytdO1xuICAgICAgdmFyIGhhbmRsZXIgPSBvayA/IHJlYWN0aW9uLm9rIDogcmVhY3Rpb24uZmFpbDtcbiAgICAgIHZhciByZXNvbHZlID0gcmVhY3Rpb24ucmVzb2x2ZTtcbiAgICAgIHZhciByZWplY3QgPSByZWFjdGlvbi5yZWplY3Q7XG4gICAgICB2YXIgZG9tYWluID0gcmVhY3Rpb24uZG9tYWluO1xuICAgICAgdmFyIHJlc3VsdCwgdGhlbiwgZXhpdGVkO1xuICAgICAgdHJ5IHtcbiAgICAgICAgaWYgKGhhbmRsZXIpIHtcbiAgICAgICAgICBpZiAoIW9rKSB7XG4gICAgICAgICAgICBpZiAoc3RhdGUucmVqZWN0aW9uID09PSBVTkhBTkRMRUQpIG9uSGFuZGxlVW5oYW5kbGVkKHByb21pc2UsIHN0YXRlKTtcbiAgICAgICAgICAgIHN0YXRlLnJlamVjdGlvbiA9IEhBTkRMRUQ7XG4gICAgICAgICAgfVxuICAgICAgICAgIGlmIChoYW5kbGVyID09PSB0cnVlKSByZXN1bHQgPSB2YWx1ZTtcbiAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgIGlmIChkb21haW4pIGRvbWFpbi5lbnRlcigpO1xuICAgICAgICAgICAgcmVzdWx0ID0gaGFuZGxlcih2YWx1ZSk7IC8vIGNhbiB0aHJvd1xuICAgICAgICAgICAgaWYgKGRvbWFpbikge1xuICAgICAgICAgICAgICBkb21haW4uZXhpdCgpO1xuICAgICAgICAgICAgICBleGl0ZWQgPSB0cnVlO1xuICAgICAgICAgICAgfVxuICAgICAgICAgIH1cbiAgICAgICAgICBpZiAocmVzdWx0ID09PSByZWFjdGlvbi5wcm9taXNlKSB7XG4gICAgICAgICAgICByZWplY3QoVHlwZUVycm9yKCdQcm9taXNlLWNoYWluIGN5Y2xlJykpO1xuICAgICAgICAgIH0gZWxzZSBpZiAodGhlbiA9IGlzVGhlbmFibGUocmVzdWx0KSkge1xuICAgICAgICAgICAgdGhlbi5jYWxsKHJlc3VsdCwgcmVzb2x2ZSwgcmVqZWN0KTtcbiAgICAgICAgICB9IGVsc2UgcmVzb2x2ZShyZXN1bHQpO1xuICAgICAgICB9IGVsc2UgcmVqZWN0KHZhbHVlKTtcbiAgICAgIH0gY2F0Y2ggKGVycm9yKSB7XG4gICAgICAgIGlmIChkb21haW4gJiYgIWV4aXRlZCkgZG9tYWluLmV4aXQoKTtcbiAgICAgICAgcmVqZWN0KGVycm9yKTtcbiAgICAgIH1cbiAgICB9XG4gICAgc3RhdGUucmVhY3Rpb25zID0gW107XG4gICAgc3RhdGUubm90aWZpZWQgPSBmYWxzZTtcbiAgICBpZiAoaXNSZWplY3QgJiYgIXN0YXRlLnJlamVjdGlvbikgb25VbmhhbmRsZWQocHJvbWlzZSwgc3RhdGUpO1xuICB9KTtcbn07XG5cbnZhciBkaXNwYXRjaEV2ZW50ID0gZnVuY3Rpb24gKG5hbWUsIHByb21pc2UsIHJlYXNvbikge1xuICB2YXIgZXZlbnQsIGhhbmRsZXI7XG4gIGlmIChESVNQQVRDSF9FVkVOVCkge1xuICAgIGV2ZW50ID0gZG9jdW1lbnQuY3JlYXRlRXZlbnQoJ0V2ZW50Jyk7XG4gICAgZXZlbnQucHJvbWlzZSA9IHByb21pc2U7XG4gICAgZXZlbnQucmVhc29uID0gcmVhc29uO1xuICAgIGV2ZW50LmluaXRFdmVudChuYW1lLCBmYWxzZSwgdHJ1ZSk7XG4gICAgZ2xvYmFsLmRpc3BhdGNoRXZlbnQoZXZlbnQpO1xuICB9IGVsc2UgZXZlbnQgPSB7IHByb21pc2U6IHByb21pc2UsIHJlYXNvbjogcmVhc29uIH07XG4gIGlmIChoYW5kbGVyID0gZ2xvYmFsWydvbicgKyBuYW1lXSkgaGFuZGxlcihldmVudCk7XG4gIGVsc2UgaWYgKG5hbWUgPT09IFVOSEFORExFRF9SRUpFQ1RJT04pIGhvc3RSZXBvcnRFcnJvcnMoJ1VuaGFuZGxlZCBwcm9taXNlIHJlamVjdGlvbicsIHJlYXNvbik7XG59O1xuXG52YXIgb25VbmhhbmRsZWQgPSBmdW5jdGlvbiAocHJvbWlzZSwgc3RhdGUpIHtcbiAgdGFzay5jYWxsKGdsb2JhbCwgZnVuY3Rpb24gKCkge1xuICAgIHZhciB2YWx1ZSA9IHN0YXRlLnZhbHVlO1xuICAgIHZhciBJU19VTkhBTkRMRUQgPSBpc1VuaGFuZGxlZChzdGF0ZSk7XG4gICAgdmFyIHJlc3VsdDtcbiAgICBpZiAoSVNfVU5IQU5ETEVEKSB7XG4gICAgICByZXN1bHQgPSBwZXJmb3JtKGZ1bmN0aW9uICgpIHtcbiAgICAgICAgaWYgKElTX05PREUpIHtcbiAgICAgICAgICBwcm9jZXNzLmVtaXQoJ3VuaGFuZGxlZFJlamVjdGlvbicsIHZhbHVlLCBwcm9taXNlKTtcbiAgICAgICAgfSBlbHNlIGRpc3BhdGNoRXZlbnQoVU5IQU5ETEVEX1JFSkVDVElPTiwgcHJvbWlzZSwgdmFsdWUpO1xuICAgICAgfSk7XG4gICAgICAvLyBCcm93c2VycyBzaG91bGQgbm90IHRyaWdnZXIgYHJlamVjdGlvbkhhbmRsZWRgIGV2ZW50IGlmIGl0IHdhcyBoYW5kbGVkIGhlcmUsIE5vZGVKUyAtIHNob3VsZFxuICAgICAgc3RhdGUucmVqZWN0aW9uID0gSVNfTk9ERSB8fCBpc1VuaGFuZGxlZChzdGF0ZSkgPyBVTkhBTkRMRUQgOiBIQU5ETEVEO1xuICAgICAgaWYgKHJlc3VsdC5lcnJvcikgdGhyb3cgcmVzdWx0LnZhbHVlO1xuICAgIH1cbiAgfSk7XG59O1xuXG52YXIgaXNVbmhhbmRsZWQgPSBmdW5jdGlvbiAoc3RhdGUpIHtcbiAgcmV0dXJuIHN0YXRlLnJlamVjdGlvbiAhPT0gSEFORExFRCAmJiAhc3RhdGUucGFyZW50O1xufTtcblxudmFyIG9uSGFuZGxlVW5oYW5kbGVkID0gZnVuY3Rpb24gKHByb21pc2UsIHN0YXRlKSB7XG4gIHRhc2suY2FsbChnbG9iYWwsIGZ1bmN0aW9uICgpIHtcbiAgICBpZiAoSVNfTk9ERSkge1xuICAgICAgcHJvY2Vzcy5lbWl0KCdyZWplY3Rpb25IYW5kbGVkJywgcHJvbWlzZSk7XG4gICAgfSBlbHNlIGRpc3BhdGNoRXZlbnQoUkVKRUNUSU9OX0hBTkRMRUQsIHByb21pc2UsIHN0YXRlLnZhbHVlKTtcbiAgfSk7XG59O1xuXG52YXIgYmluZCA9IGZ1bmN0aW9uIChmbiwgcHJvbWlzZSwgc3RhdGUsIHVud3JhcCkge1xuICByZXR1cm4gZnVuY3Rpb24gKHZhbHVlKSB7XG4gICAgZm4ocHJvbWlzZSwgc3RhdGUsIHZhbHVlLCB1bndyYXApO1xuICB9O1xufTtcblxudmFyIGludGVybmFsUmVqZWN0ID0gZnVuY3Rpb24gKHByb21pc2UsIHN0YXRlLCB2YWx1ZSwgdW53cmFwKSB7XG4gIGlmIChzdGF0ZS5kb25lKSByZXR1cm47XG4gIHN0YXRlLmRvbmUgPSB0cnVlO1xuICBpZiAodW53cmFwKSBzdGF0ZSA9IHVud3JhcDtcbiAgc3RhdGUudmFsdWUgPSB2YWx1ZTtcbiAgc3RhdGUuc3RhdGUgPSBSRUpFQ1RFRDtcbiAgbm90aWZ5KHByb21pc2UsIHN0YXRlLCB0cnVlKTtcbn07XG5cbnZhciBpbnRlcm5hbFJlc29sdmUgPSBmdW5jdGlvbiAocHJvbWlzZSwgc3RhdGUsIHZhbHVlLCB1bndyYXApIHtcbiAgaWYgKHN0YXRlLmRvbmUpIHJldHVybjtcbiAgc3RhdGUuZG9uZSA9IHRydWU7XG4gIGlmICh1bndyYXApIHN0YXRlID0gdW53cmFwO1xuICB0cnkge1xuICAgIGlmIChwcm9taXNlID09PSB2YWx1ZSkgdGhyb3cgVHlwZUVycm9yKFwiUHJvbWlzZSBjYW4ndCBiZSByZXNvbHZlZCBpdHNlbGZcIik7XG4gICAgdmFyIHRoZW4gPSBpc1RoZW5hYmxlKHZhbHVlKTtcbiAgICBpZiAodGhlbikge1xuICAgICAgbWljcm90YXNrKGZ1bmN0aW9uICgpIHtcbiAgICAgICAgdmFyIHdyYXBwZXIgPSB7IGRvbmU6IGZhbHNlIH07XG4gICAgICAgIHRyeSB7XG4gICAgICAgICAgdGhlbi5jYWxsKHZhbHVlLFxuICAgICAgICAgICAgYmluZChpbnRlcm5hbFJlc29sdmUsIHByb21pc2UsIHdyYXBwZXIsIHN0YXRlKSxcbiAgICAgICAgICAgIGJpbmQoaW50ZXJuYWxSZWplY3QsIHByb21pc2UsIHdyYXBwZXIsIHN0YXRlKVxuICAgICAgICAgICk7XG4gICAgICAgIH0gY2F0Y2ggKGVycm9yKSB7XG4gICAgICAgICAgaW50ZXJuYWxSZWplY3QocHJvbWlzZSwgd3JhcHBlciwgZXJyb3IsIHN0YXRlKTtcbiAgICAgICAgfVxuICAgICAgfSk7XG4gICAgfSBlbHNlIHtcbiAgICAgIHN0YXRlLnZhbHVlID0gdmFsdWU7XG4gICAgICBzdGF0ZS5zdGF0ZSA9IEZVTEZJTExFRDtcbiAgICAgIG5vdGlmeShwcm9taXNlLCBzdGF0ZSwgZmFsc2UpO1xuICAgIH1cbiAgfSBjYXRjaCAoZXJyb3IpIHtcbiAgICBpbnRlcm5hbFJlamVjdChwcm9taXNlLCB7IGRvbmU6IGZhbHNlIH0sIGVycm9yLCBzdGF0ZSk7XG4gIH1cbn07XG5cbi8vIGNvbnN0cnVjdG9yIHBvbHlmaWxsXG5pZiAoRk9SQ0VEKSB7XG4gIC8vIDI1LjQuMy4xIFByb21pc2UoZXhlY3V0b3IpXG4gIFByb21pc2VDb25zdHJ1Y3RvciA9IGZ1bmN0aW9uIFByb21pc2UoZXhlY3V0b3IpIHtcbiAgICBhbkluc3RhbmNlKHRoaXMsIFByb21pc2VDb25zdHJ1Y3RvciwgUFJPTUlTRSk7XG4gICAgYUZ1bmN0aW9uKGV4ZWN1dG9yKTtcbiAgICBJbnRlcm5hbC5jYWxsKHRoaXMpO1xuICAgIHZhciBzdGF0ZSA9IGdldEludGVybmFsU3RhdGUodGhpcyk7XG4gICAgdHJ5IHtcbiAgICAgIGV4ZWN1dG9yKGJpbmQoaW50ZXJuYWxSZXNvbHZlLCB0aGlzLCBzdGF0ZSksIGJpbmQoaW50ZXJuYWxSZWplY3QsIHRoaXMsIHN0YXRlKSk7XG4gICAgfSBjYXRjaCAoZXJyb3IpIHtcbiAgICAgIGludGVybmFsUmVqZWN0KHRoaXMsIHN0YXRlLCBlcnJvcik7XG4gICAgfVxuICB9O1xuICAvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgbm8tdW51c2VkLXZhcnNcbiAgSW50ZXJuYWwgPSBmdW5jdGlvbiBQcm9taXNlKGV4ZWN1dG9yKSB7XG4gICAgc2V0SW50ZXJuYWxTdGF0ZSh0aGlzLCB7XG4gICAgICB0eXBlOiBQUk9NSVNFLFxuICAgICAgZG9uZTogZmFsc2UsXG4gICAgICBub3RpZmllZDogZmFsc2UsXG4gICAgICBwYXJlbnQ6IGZhbHNlLFxuICAgICAgcmVhY3Rpb25zOiBbXSxcbiAgICAgIHJlamVjdGlvbjogZmFsc2UsXG4gICAgICBzdGF0ZTogUEVORElORyxcbiAgICAgIHZhbHVlOiB1bmRlZmluZWRcbiAgICB9KTtcbiAgfTtcbiAgSW50ZXJuYWwucHJvdG90eXBlID0gcmVkZWZpbmVBbGwoUHJvbWlzZUNvbnN0cnVjdG9yLnByb3RvdHlwZSwge1xuICAgIC8vIGBQcm9taXNlLnByb3RvdHlwZS50aGVuYCBtZXRob2RcbiAgICAvLyBodHRwczovL3RjMzkuZ2l0aHViLmlvL2VjbWEyNjIvI3NlYy1wcm9taXNlLnByb3RvdHlwZS50aGVuXG4gICAgdGhlbjogZnVuY3Rpb24gdGhlbihvbkZ1bGZpbGxlZCwgb25SZWplY3RlZCkge1xuICAgICAgdmFyIHN0YXRlID0gZ2V0SW50ZXJuYWxQcm9taXNlU3RhdGUodGhpcyk7XG4gICAgICB2YXIgcmVhY3Rpb24gPSBuZXdQcm9taXNlQ2FwYWJpbGl0eShzcGVjaWVzQ29uc3RydWN0b3IodGhpcywgUHJvbWlzZUNvbnN0cnVjdG9yKSk7XG4gICAgICByZWFjdGlvbi5vayA9IHR5cGVvZiBvbkZ1bGZpbGxlZCA9PSAnZnVuY3Rpb24nID8gb25GdWxmaWxsZWQgOiB0cnVlO1xuICAgICAgcmVhY3Rpb24uZmFpbCA9IHR5cGVvZiBvblJlamVjdGVkID09ICdmdW5jdGlvbicgJiYgb25SZWplY3RlZDtcbiAgICAgIHJlYWN0aW9uLmRvbWFpbiA9IElTX05PREUgPyBwcm9jZXNzLmRvbWFpbiA6IHVuZGVmaW5lZDtcbiAgICAgIHN0YXRlLnBhcmVudCA9IHRydWU7XG4gICAgICBzdGF0ZS5yZWFjdGlvbnMucHVzaChyZWFjdGlvbik7XG4gICAgICBpZiAoc3RhdGUuc3RhdGUgIT0gUEVORElORykgbm90aWZ5KHRoaXMsIHN0YXRlLCBmYWxzZSk7XG4gICAgICByZXR1cm4gcmVhY3Rpb24ucHJvbWlzZTtcbiAgICB9LFxuICAgIC8vIGBQcm9taXNlLnByb3RvdHlwZS5jYXRjaGAgbWV0aG9kXG4gICAgLy8gaHR0cHM6Ly90YzM5LmdpdGh1Yi5pby9lY21hMjYyLyNzZWMtcHJvbWlzZS5wcm90b3R5cGUuY2F0Y2hcbiAgICAnY2F0Y2gnOiBmdW5jdGlvbiAob25SZWplY3RlZCkge1xuICAgICAgcmV0dXJuIHRoaXMudGhlbih1bmRlZmluZWQsIG9uUmVqZWN0ZWQpO1xuICAgIH1cbiAgfSk7XG4gIE93blByb21pc2VDYXBhYmlsaXR5ID0gZnVuY3Rpb24gKCkge1xuICAgIHZhciBwcm9taXNlID0gbmV3IEludGVybmFsKCk7XG4gICAgdmFyIHN0YXRlID0gZ2V0SW50ZXJuYWxTdGF0ZShwcm9taXNlKTtcbiAgICB0aGlzLnByb21pc2UgPSBwcm9taXNlO1xuICAgIHRoaXMucmVzb2x2ZSA9IGJpbmQoaW50ZXJuYWxSZXNvbHZlLCBwcm9taXNlLCBzdGF0ZSk7XG4gICAgdGhpcy5yZWplY3QgPSBiaW5kKGludGVybmFsUmVqZWN0LCBwcm9taXNlLCBzdGF0ZSk7XG4gIH07XG4gIG5ld1Byb21pc2VDYXBhYmlsaXR5TW9kdWxlLmYgPSBuZXdQcm9taXNlQ2FwYWJpbGl0eSA9IGZ1bmN0aW9uIChDKSB7XG4gICAgcmV0dXJuIEMgPT09IFByb21pc2VDb25zdHJ1Y3RvciB8fCBDID09PSBQcm9taXNlV3JhcHBlclxuICAgICAgPyBuZXcgT3duUHJvbWlzZUNhcGFiaWxpdHkoQylcbiAgICAgIDogbmV3R2VuZXJpY1Byb21pc2VDYXBhYmlsaXR5KEMpO1xuICB9O1xuXG4gIGlmICghSVNfUFVSRSAmJiB0eXBlb2YgTmF0aXZlUHJvbWlzZSA9PSAnZnVuY3Rpb24nKSB7XG4gICAgbmF0aXZlVGhlbiA9IE5hdGl2ZVByb21pc2UucHJvdG90eXBlLnRoZW47XG5cbiAgICAvLyB3cmFwIG5hdGl2ZSBQcm9taXNlI3RoZW4gZm9yIG5hdGl2ZSBhc3luYyBmdW5jdGlvbnNcbiAgICByZWRlZmluZShOYXRpdmVQcm9taXNlLnByb3RvdHlwZSwgJ3RoZW4nLCBmdW5jdGlvbiB0aGVuKG9uRnVsZmlsbGVkLCBvblJlamVjdGVkKSB7XG4gICAgICB2YXIgdGhhdCA9IHRoaXM7XG4gICAgICByZXR1cm4gbmV3IFByb21pc2VDb25zdHJ1Y3RvcihmdW5jdGlvbiAocmVzb2x2ZSwgcmVqZWN0KSB7XG4gICAgICAgIG5hdGl2ZVRoZW4uY2FsbCh0aGF0LCByZXNvbHZlLCByZWplY3QpO1xuICAgICAgfSkudGhlbihvbkZ1bGZpbGxlZCwgb25SZWplY3RlZCk7XG4gICAgLy8gaHR0cHM6Ly9naXRodWIuY29tL3psb2lyb2NrL2NvcmUtanMvaXNzdWVzLzY0MFxuICAgIH0sIHsgdW5zYWZlOiB0cnVlIH0pO1xuXG4gICAgLy8gd3JhcCBmZXRjaCByZXN1bHRcbiAgICBpZiAodHlwZW9mICRmZXRjaCA9PSAnZnVuY3Rpb24nKSAkKHsgZ2xvYmFsOiB0cnVlLCBlbnVtZXJhYmxlOiB0cnVlLCBmb3JjZWQ6IHRydWUgfSwge1xuICAgICAgLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIG5vLXVudXNlZC12YXJzXG4gICAgICBmZXRjaDogZnVuY3Rpb24gZmV0Y2goaW5wdXQgLyogLCBpbml0ICovKSB7XG4gICAgICAgIHJldHVybiBwcm9taXNlUmVzb2x2ZShQcm9taXNlQ29uc3RydWN0b3IsICRmZXRjaC5hcHBseShnbG9iYWwsIGFyZ3VtZW50cykpO1xuICAgICAgfVxuICAgIH0pO1xuICB9XG59XG5cbiQoeyBnbG9iYWw6IHRydWUsIHdyYXA6IHRydWUsIGZvcmNlZDogRk9SQ0VEIH0sIHtcbiAgUHJvbWlzZTogUHJvbWlzZUNvbnN0cnVjdG9yXG59KTtcblxuc2V0VG9TdHJpbmdUYWcoUHJvbWlzZUNvbnN0cnVjdG9yLCBQUk9NSVNFLCBmYWxzZSwgdHJ1ZSk7XG5zZXRTcGVjaWVzKFBST01JU0UpO1xuXG5Qcm9taXNlV3JhcHBlciA9IGdldEJ1aWx0SW4oUFJPTUlTRSk7XG5cbi8vIHN0YXRpY3NcbiQoeyB0YXJnZXQ6IFBST01JU0UsIHN0YXQ6IHRydWUsIGZvcmNlZDogRk9SQ0VEIH0sIHtcbiAgLy8gYFByb21pc2UucmVqZWN0YCBtZXRob2RcbiAgLy8gaHR0cHM6Ly90YzM5LmdpdGh1Yi5pby9lY21hMjYyLyNzZWMtcHJvbWlzZS5yZWplY3RcbiAgcmVqZWN0OiBmdW5jdGlvbiByZWplY3Qocikge1xuICAgIHZhciBjYXBhYmlsaXR5ID0gbmV3UHJvbWlzZUNhcGFiaWxpdHkodGhpcyk7XG4gICAgY2FwYWJpbGl0eS5yZWplY3QuY2FsbCh1bmRlZmluZWQsIHIpO1xuICAgIHJldHVybiBjYXBhYmlsaXR5LnByb21pc2U7XG4gIH1cbn0pO1xuXG4kKHsgdGFyZ2V0OiBQUk9NSVNFLCBzdGF0OiB0cnVlLCBmb3JjZWQ6IElTX1BVUkUgfHwgRk9SQ0VEIH0sIHtcbiAgLy8gYFByb21pc2UucmVzb2x2ZWAgbWV0aG9kXG4gIC8vIGh0dHBzOi8vdGMzOS5naXRodWIuaW8vZWNtYTI2Mi8jc2VjLXByb21pc2UucmVzb2x2ZVxuICByZXNvbHZlOiBmdW5jdGlvbiByZXNvbHZlKHgpIHtcbiAgICByZXR1cm4gcHJvbWlzZVJlc29sdmUoSVNfUFVSRSAmJiB0aGlzID09PSBQcm9taXNlV3JhcHBlciA/IFByb21pc2VDb25zdHJ1Y3RvciA6IHRoaXMsIHgpO1xuICB9XG59KTtcblxuJCh7IHRhcmdldDogUFJPTUlTRSwgc3RhdDogdHJ1ZSwgZm9yY2VkOiBJTkNPUlJFQ1RfSVRFUkFUSU9OIH0sIHtcbiAgLy8gYFByb21pc2UuYWxsYCBtZXRob2RcbiAgLy8gaHR0cHM6Ly90YzM5LmdpdGh1Yi5pby9lY21hMjYyLyNzZWMtcHJvbWlzZS5hbGxcbiAgYWxsOiBmdW5jdGlvbiBhbGwoaXRlcmFibGUpIHtcbiAgICB2YXIgQyA9IHRoaXM7XG4gICAgdmFyIGNhcGFiaWxpdHkgPSBuZXdQcm9taXNlQ2FwYWJpbGl0eShDKTtcbiAgICB2YXIgcmVzb2x2ZSA9IGNhcGFiaWxpdHkucmVzb2x2ZTtcbiAgICB2YXIgcmVqZWN0ID0gY2FwYWJpbGl0eS5yZWplY3Q7XG4gICAgdmFyIHJlc3VsdCA9IHBlcmZvcm0oZnVuY3Rpb24gKCkge1xuICAgICAgdmFyICRwcm9taXNlUmVzb2x2ZSA9IGFGdW5jdGlvbihDLnJlc29sdmUpO1xuICAgICAgdmFyIHZhbHVlcyA9IFtdO1xuICAgICAgdmFyIGNvdW50ZXIgPSAwO1xuICAgICAgdmFyIHJlbWFpbmluZyA9IDE7XG4gICAgICBpdGVyYXRlKGl0ZXJhYmxlLCBmdW5jdGlvbiAocHJvbWlzZSkge1xuICAgICAgICB2YXIgaW5kZXggPSBjb3VudGVyKys7XG4gICAgICAgIHZhciBhbHJlYWR5Q2FsbGVkID0gZmFsc2U7XG4gICAgICAgIHZhbHVlcy5wdXNoKHVuZGVmaW5lZCk7XG4gICAgICAgIHJlbWFpbmluZysrO1xuICAgICAgICAkcHJvbWlzZVJlc29sdmUuY2FsbChDLCBwcm9taXNlKS50aGVuKGZ1bmN0aW9uICh2YWx1ZSkge1xuICAgICAgICAgIGlmIChhbHJlYWR5Q2FsbGVkKSByZXR1cm47XG4gICAgICAgICAgYWxyZWFkeUNhbGxlZCA9IHRydWU7XG4gICAgICAgICAgdmFsdWVzW2luZGV4XSA9IHZhbHVlO1xuICAgICAgICAgIC0tcmVtYWluaW5nIHx8IHJlc29sdmUodmFsdWVzKTtcbiAgICAgICAgfSwgcmVqZWN0KTtcbiAgICAgIH0pO1xuICAgICAgLS1yZW1haW5pbmcgfHwgcmVzb2x2ZSh2YWx1ZXMpO1xuICAgIH0pO1xuICAgIGlmIChyZXN1bHQuZXJyb3IpIHJlamVjdChyZXN1bHQudmFsdWUpO1xuICAgIHJldHVybiBjYXBhYmlsaXR5LnByb21pc2U7XG4gIH0sXG4gIC8vIGBQcm9taXNlLnJhY2VgIG1ldGhvZFxuICAvLyBodHRwczovL3RjMzkuZ2l0aHViLmlvL2VjbWEyNjIvI3NlYy1wcm9taXNlLnJhY2VcbiAgcmFjZTogZnVuY3Rpb24gcmFjZShpdGVyYWJsZSkge1xuICAgIHZhciBDID0gdGhpcztcbiAgICB2YXIgY2FwYWJpbGl0eSA9IG5ld1Byb21pc2VDYXBhYmlsaXR5KEMpO1xuICAgIHZhciByZWplY3QgPSBjYXBhYmlsaXR5LnJlamVjdDtcbiAgICB2YXIgcmVzdWx0ID0gcGVyZm9ybShmdW5jdGlvbiAoKSB7XG4gICAgICB2YXIgJHByb21pc2VSZXNvbHZlID0gYUZ1bmN0aW9uKEMucmVzb2x2ZSk7XG4gICAgICBpdGVyYXRlKGl0ZXJhYmxlLCBmdW5jdGlvbiAocHJvbWlzZSkge1xuICAgICAgICAkcHJvbWlzZVJlc29sdmUuY2FsbChDLCBwcm9taXNlKS50aGVuKGNhcGFiaWxpdHkucmVzb2x2ZSwgcmVqZWN0KTtcbiAgICAgIH0pO1xuICAgIH0pO1xuICAgIGlmIChyZXN1bHQuZXJyb3IpIHJlamVjdChyZXN1bHQudmFsdWUpO1xuICAgIHJldHVybiBjYXBhYmlsaXR5LnByb21pc2U7XG4gIH1cbn0pO1xuIiwiJ3VzZSBzdHJpY3QnO1xudmFyIGNoYXJBdCA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9zdHJpbmctbXVsdGlieXRlJykuY2hhckF0O1xudmFyIEludGVybmFsU3RhdGVNb2R1bGUgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvaW50ZXJuYWwtc3RhdGUnKTtcbnZhciBkZWZpbmVJdGVyYXRvciA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9kZWZpbmUtaXRlcmF0b3InKTtcblxudmFyIFNUUklOR19JVEVSQVRPUiA9ICdTdHJpbmcgSXRlcmF0b3InO1xudmFyIHNldEludGVybmFsU3RhdGUgPSBJbnRlcm5hbFN0YXRlTW9kdWxlLnNldDtcbnZhciBnZXRJbnRlcm5hbFN0YXRlID0gSW50ZXJuYWxTdGF0ZU1vZHVsZS5nZXR0ZXJGb3IoU1RSSU5HX0lURVJBVE9SKTtcblxuLy8gYFN0cmluZy5wcm90b3R5cGVbQEBpdGVyYXRvcl1gIG1ldGhvZFxuLy8gaHR0cHM6Ly90YzM5LmdpdGh1Yi5pby9lY21hMjYyLyNzZWMtc3RyaW5nLnByb3RvdHlwZS1AQGl0ZXJhdG9yXG5kZWZpbmVJdGVyYXRvcihTdHJpbmcsICdTdHJpbmcnLCBmdW5jdGlvbiAoaXRlcmF0ZWQpIHtcbiAgc2V0SW50ZXJuYWxTdGF0ZSh0aGlzLCB7XG4gICAgdHlwZTogU1RSSU5HX0lURVJBVE9SLFxuICAgIHN0cmluZzogU3RyaW5nKGl0ZXJhdGVkKSxcbiAgICBpbmRleDogMFxuICB9KTtcbi8vIGAlU3RyaW5nSXRlcmF0b3JQcm90b3R5cGUlLm5leHRgIG1ldGhvZFxuLy8gaHR0cHM6Ly90YzM5LmdpdGh1Yi5pby9lY21hMjYyLyNzZWMtJXN0cmluZ2l0ZXJhdG9ycHJvdG90eXBlJS5uZXh0XG59LCBmdW5jdGlvbiBuZXh0KCkge1xuICB2YXIgc3RhdGUgPSBnZXRJbnRlcm5hbFN0YXRlKHRoaXMpO1xuICB2YXIgc3RyaW5nID0gc3RhdGUuc3RyaW5nO1xuICB2YXIgaW5kZXggPSBzdGF0ZS5pbmRleDtcbiAgdmFyIHBvaW50O1xuICBpZiAoaW5kZXggPj0gc3RyaW5nLmxlbmd0aCkgcmV0dXJuIHsgdmFsdWU6IHVuZGVmaW5lZCwgZG9uZTogdHJ1ZSB9O1xuICBwb2ludCA9IGNoYXJBdChzdHJpbmcsIGluZGV4KTtcbiAgc3RhdGUuaW5kZXggKz0gcG9pbnQubGVuZ3RoO1xuICByZXR1cm4geyB2YWx1ZTogcG9pbnQsIGRvbmU6IGZhbHNlIH07XG59KTtcbiIsIid1c2Ugc3RyaWN0JztcbnZhciAkID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL2V4cG9ydCcpO1xudmFyIERFU0NSSVBUT1JTID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL2Rlc2NyaXB0b3JzJyk7XG52YXIgZ2V0UHJvdG90eXBlT2YgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvb2JqZWN0LWdldC1wcm90b3R5cGUtb2YnKTtcbnZhciBzZXRQcm90b3R5cGVPZiA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9vYmplY3Qtc2V0LXByb3RvdHlwZS1vZicpO1xudmFyIGNyZWF0ZSA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9vYmplY3QtY3JlYXRlJyk7XG52YXIgZGVmaW5lUHJvcGVydHkgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvb2JqZWN0LWRlZmluZS1wcm9wZXJ0eScpO1xudmFyIGNyZWF0ZVByb3BlcnR5RGVzY3JpcHRvciA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9jcmVhdGUtcHJvcGVydHktZGVzY3JpcHRvcicpO1xudmFyIGl0ZXJhdGUgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvaXRlcmF0ZScpO1xudmFyIGNyZWF0ZU5vbkVudW1lcmFibGVQcm9wZXJ0eSA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9jcmVhdGUtbm9uLWVudW1lcmFibGUtcHJvcGVydHknKTtcbnZhciBJbnRlcm5hbFN0YXRlTW9kdWxlID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL2ludGVybmFsLXN0YXRlJyk7XG5cbnZhciBzZXRJbnRlcm5hbFN0YXRlID0gSW50ZXJuYWxTdGF0ZU1vZHVsZS5zZXQ7XG52YXIgZ2V0SW50ZXJuYWxBZ2dyZWdhdGVFcnJvclN0YXRlID0gSW50ZXJuYWxTdGF0ZU1vZHVsZS5nZXR0ZXJGb3IoJ0FnZ3JlZ2F0ZUVycm9yJyk7XG5cbnZhciAkQWdncmVnYXRlRXJyb3IgPSBmdW5jdGlvbiBBZ2dyZWdhdGVFcnJvcihlcnJvcnMsIG1lc3NhZ2UpIHtcbiAgdmFyIHRoYXQgPSB0aGlzO1xuICBpZiAoISh0aGF0IGluc3RhbmNlb2YgJEFnZ3JlZ2F0ZUVycm9yKSkgcmV0dXJuIG5ldyAkQWdncmVnYXRlRXJyb3IoZXJyb3JzLCBtZXNzYWdlKTtcbiAgaWYgKHNldFByb3RvdHlwZU9mKSB7XG4gICAgdGhhdCA9IHNldFByb3RvdHlwZU9mKG5ldyBFcnJvcihtZXNzYWdlKSwgZ2V0UHJvdG90eXBlT2YodGhhdCkpO1xuICB9XG4gIHZhciBlcnJvcnNBcnJheSA9IFtdO1xuICBpdGVyYXRlKGVycm9ycywgZXJyb3JzQXJyYXkucHVzaCwgZXJyb3JzQXJyYXkpO1xuICBpZiAoREVTQ1JJUFRPUlMpIHNldEludGVybmFsU3RhdGUodGhhdCwgeyBlcnJvcnM6IGVycm9yc0FycmF5LCB0eXBlOiAnQWdncmVnYXRlRXJyb3InIH0pO1xuICBlbHNlIHRoYXQuZXJyb3JzID0gZXJyb3JzQXJyYXk7XG4gIGlmIChtZXNzYWdlICE9PSB1bmRlZmluZWQpIGNyZWF0ZU5vbkVudW1lcmFibGVQcm9wZXJ0eSh0aGF0LCAnbWVzc2FnZScsIFN0cmluZyhtZXNzYWdlKSk7XG4gIHJldHVybiB0aGF0O1xufTtcblxuJEFnZ3JlZ2F0ZUVycm9yLnByb3RvdHlwZSA9IGNyZWF0ZShFcnJvci5wcm90b3R5cGUsIHtcbiAgY29uc3RydWN0b3I6IGNyZWF0ZVByb3BlcnR5RGVzY3JpcHRvcig1LCAkQWdncmVnYXRlRXJyb3IpLFxuICBtZXNzYWdlOiBjcmVhdGVQcm9wZXJ0eURlc2NyaXB0b3IoNSwgJycpLFxuICBuYW1lOiBjcmVhdGVQcm9wZXJ0eURlc2NyaXB0b3IoNSwgJ0FnZ3JlZ2F0ZUVycm9yJylcbn0pO1xuXG5pZiAoREVTQ1JJUFRPUlMpIGRlZmluZVByb3BlcnR5LmYoJEFnZ3JlZ2F0ZUVycm9yLnByb3RvdHlwZSwgJ2Vycm9ycycsIHtcbiAgZ2V0OiBmdW5jdGlvbiAoKSB7XG4gICAgcmV0dXJuIGdldEludGVybmFsQWdncmVnYXRlRXJyb3JTdGF0ZSh0aGlzKS5lcnJvcnM7XG4gIH0sXG4gIGNvbmZpZ3VyYWJsZTogdHJ1ZVxufSk7XG5cbiQoeyBnbG9iYWw6IHRydWUgfSwge1xuICBBZ2dyZWdhdGVFcnJvcjogJEFnZ3JlZ2F0ZUVycm9yXG59KTtcbiIsInZhciAkID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL2V4cG9ydCcpO1xudmFyIGlzQXJyYXkgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvaXMtYXJyYXknKTtcblxudmFyIGlzRnJvemVuID0gT2JqZWN0LmlzRnJvemVuO1xuXG52YXIgaXNGcm96ZW5TdHJpbmdBcnJheSA9IGZ1bmN0aW9uIChhcnJheSwgYWxsb3dVbmRlZmluZWQpIHtcbiAgaWYgKCFpc0Zyb3plbiB8fCAhaXNBcnJheShhcnJheSkgfHwgIWlzRnJvemVuKGFycmF5KSkgcmV0dXJuIGZhbHNlO1xuICB2YXIgaW5kZXggPSAwO1xuICB2YXIgbGVuZ3RoID0gYXJyYXkubGVuZ3RoO1xuICB2YXIgZWxlbWVudDtcbiAgd2hpbGUgKGluZGV4IDwgbGVuZ3RoKSB7XG4gICAgZWxlbWVudCA9IGFycmF5W2luZGV4KytdO1xuICAgIGlmICghKHR5cGVvZiBlbGVtZW50ID09PSAnc3RyaW5nJyB8fCAoYWxsb3dVbmRlZmluZWQgJiYgdHlwZW9mIGVsZW1lbnQgPT09ICd1bmRlZmluZWQnKSkpIHtcbiAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9XG4gIH0gcmV0dXJuIGxlbmd0aCAhPT0gMDtcbn07XG5cbi8vIGBBcnJheS5pc1RlbXBsYXRlT2JqZWN0YCBtZXRob2Rcbi8vIGh0dHBzOi8vZ2l0aHViLmNvbS90YzM5L3Byb3Bvc2FsLWFycmF5LWlzLXRlbXBsYXRlLW9iamVjdFxuJCh7IHRhcmdldDogJ0FycmF5Jywgc3RhdDogdHJ1ZSB9LCB7XG4gIGlzVGVtcGxhdGVPYmplY3Q6IGZ1bmN0aW9uIGlzVGVtcGxhdGVPYmplY3QodmFsdWUpIHtcbiAgICBpZiAoIWlzRnJvemVuU3RyaW5nQXJyYXkodmFsdWUsIHRydWUpKSByZXR1cm4gZmFsc2U7XG4gICAgdmFyIHJhdyA9IHZhbHVlLnJhdztcbiAgICBpZiAocmF3Lmxlbmd0aCAhPT0gdmFsdWUubGVuZ3RoIHx8ICFpc0Zyb3plblN0cmluZ0FycmF5KHJhdywgZmFsc2UpKSByZXR1cm4gZmFsc2U7XG4gICAgcmV0dXJuIHRydWU7XG4gIH1cbn0pO1xuIiwiJ3VzZSBzdHJpY3QnO1xudmFyIERFU0NSSVBUT1JTID0gcmVxdWlyZSgnLi4vaW50ZXJuYWxzL2Rlc2NyaXB0b3JzJyk7XG52YXIgYWRkVG9VbnNjb3BhYmxlcyA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9hZGQtdG8tdW5zY29wYWJsZXMnKTtcbnZhciB0b09iamVjdCA9IHJlcXVpcmUoJy4uL2ludGVybmFscy90by1vYmplY3QnKTtcbnZhciB0b0xlbmd0aCA9IHJlcXVpcmUoJy4uL2ludGVybmFscy90by1sZW5ndGgnKTtcbnZhciBkZWZpbmVQcm9wZXJ0eSA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9vYmplY3QtZGVmaW5lLXByb3BlcnR5JykuZjtcblxuLy8gYEFycmF5LnByb3RvdHlwZS5sYXN0SW5kZXhgIGdldHRlclxuLy8gaHR0cHM6Ly9naXRodWIuY29tL2tlaXRoYW11cy9wcm9wb3NhbC1hcnJheS1sYXN0XG5pZiAoREVTQ1JJUFRPUlMgJiYgISgnbGFzdEluZGV4JyBpbiBbXSkpIHtcbiAgZGVmaW5lUHJvcGVydHkoQXJyYXkucHJvdG90eXBlLCAnbGFzdEluZGV4Jywge1xuICAgIGNvbmZpZ3VyYWJsZTogdHJ1ZSxcbiAgICBnZXQ6IGZ1bmN0aW9uIGxhc3RJbmRleCgpIHtcbiAgICAgIHZhciBPID0gdG9PYmplY3QodGhpcyk7XG4gICAgICB2YXIgbGVuID0gdG9MZW5ndGgoTy5sZW5ndGgpO1xuICAgICAgcmV0dXJuIGxlbiA9PSAwID8gMCA6IGxlbiAtIDE7XG4gICAgfVxuICB9KTtcblxuICBhZGRUb1Vuc2NvcGFibGVzKCdsYXN0SW5kZXgnKTtcbn1cbiIsIid1c2Ugc3RyaWN0JztcbnZhciBERVNDUklQVE9SUyA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9kZXNjcmlwdG9ycycpO1xudmFyIGFkZFRvVW5zY29wYWJsZXMgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvYWRkLXRvLXVuc2NvcGFibGVzJyk7XG52YXIgdG9PYmplY3QgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvdG8tb2JqZWN0Jyk7XG52YXIgdG9MZW5ndGggPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvdG8tbGVuZ3RoJyk7XG52YXIgZGVmaW5lUHJvcGVydHkgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvb2JqZWN0LWRlZmluZS1wcm9wZXJ0eScpLmY7XG5cbi8vIGBBcnJheS5wcm90b3R5cGUubGFzdEluZGV4YCBhY2Nlc3NvclxuLy8gaHR0cHM6Ly9naXRodWIuY29tL2tlaXRoYW11cy9wcm9wb3NhbC1hcnJheS1sYXN0XG5pZiAoREVTQ1JJUFRPUlMgJiYgISgnbGFzdEl0ZW0nIGluIFtdKSkge1xuICBkZWZpbmVQcm9wZXJ0eShBcnJheS5wcm90b3R5cGUsICdsYXN0SXRlbScsIHtcbiAgICBjb25maWd1cmFibGU6IHRydWUsXG4gICAgZ2V0OiBmdW5jdGlvbiBsYXN0SXRlbSgpIHtcbiAgICAgIHZhciBPID0gdG9PYmplY3QodGhpcyk7XG4gICAgICB2YXIgbGVuID0gdG9MZW5ndGgoTy5sZW5ndGgpO1xuICAgICAgcmV0dXJuIGxlbiA9PSAwID8gdW5kZWZpbmVkIDogT1tsZW4gLSAxXTtcbiAgICB9LFxuICAgIHNldDogZnVuY3Rpb24gbGFzdEl0ZW0odmFsdWUpIHtcbiAgICAgIHZhciBPID0gdG9PYmplY3QodGhpcyk7XG4gICAgICB2YXIgbGVuID0gdG9MZW5ndGgoTy5sZW5ndGgpO1xuICAgICAgcmV0dXJuIE9bbGVuID09IDAgPyAwIDogbGVuIC0gMV0gPSB2YWx1ZTtcbiAgICB9XG4gIH0pO1xuXG4gIGFkZFRvVW5zY29wYWJsZXMoJ2xhc3RJdGVtJyk7XG59XG4iLCIvLyBUT0RPOiBSZW1vdmUgZnJvbSBgY29yZS1qc0A0YFxucmVxdWlyZSgnLi9lcy5wcm9taXNlLmFsbC1zZXR0bGVkLmpzJyk7XG4iLCIndXNlIHN0cmljdCc7XG52YXIgJCA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9leHBvcnQnKTtcbnZhciBhRnVuY3Rpb24gPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvYS1mdW5jdGlvbicpO1xudmFyIGdldEJ1aWx0SW4gPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvZ2V0LWJ1aWx0LWluJyk7XG52YXIgbmV3UHJvbWlzZUNhcGFiaWxpdHlNb2R1bGUgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvbmV3LXByb21pc2UtY2FwYWJpbGl0eScpO1xudmFyIHBlcmZvcm0gPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvcGVyZm9ybScpO1xudmFyIGl0ZXJhdGUgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvaXRlcmF0ZScpO1xuXG52YXIgUFJPTUlTRV9BTllfRVJST1IgPSAnTm8gb25lIHByb21pc2UgcmVzb2x2ZWQnO1xuXG4vLyBgUHJvbWlzZS5hbnlgIG1ldGhvZFxuLy8gaHR0cHM6Ly9naXRodWIuY29tL3RjMzkvcHJvcG9zYWwtcHJvbWlzZS1hbnlcbiQoeyB0YXJnZXQ6ICdQcm9taXNlJywgc3RhdDogdHJ1ZSB9LCB7XG4gIGFueTogZnVuY3Rpb24gYW55KGl0ZXJhYmxlKSB7XG4gICAgdmFyIEMgPSB0aGlzO1xuICAgIHZhciBjYXBhYmlsaXR5ID0gbmV3UHJvbWlzZUNhcGFiaWxpdHlNb2R1bGUuZihDKTtcbiAgICB2YXIgcmVzb2x2ZSA9IGNhcGFiaWxpdHkucmVzb2x2ZTtcbiAgICB2YXIgcmVqZWN0ID0gY2FwYWJpbGl0eS5yZWplY3Q7XG4gICAgdmFyIHJlc3VsdCA9IHBlcmZvcm0oZnVuY3Rpb24gKCkge1xuICAgICAgdmFyIHByb21pc2VSZXNvbHZlID0gYUZ1bmN0aW9uKEMucmVzb2x2ZSk7XG4gICAgICB2YXIgZXJyb3JzID0gW107XG4gICAgICB2YXIgY291bnRlciA9IDA7XG4gICAgICB2YXIgcmVtYWluaW5nID0gMTtcbiAgICAgIHZhciBhbHJlYWR5UmVzb2x2ZWQgPSBmYWxzZTtcbiAgICAgIGl0ZXJhdGUoaXRlcmFibGUsIGZ1bmN0aW9uIChwcm9taXNlKSB7XG4gICAgICAgIHZhciBpbmRleCA9IGNvdW50ZXIrKztcbiAgICAgICAgdmFyIGFscmVhZHlSZWplY3RlZCA9IGZhbHNlO1xuICAgICAgICBlcnJvcnMucHVzaCh1bmRlZmluZWQpO1xuICAgICAgICByZW1haW5pbmcrKztcbiAgICAgICAgcHJvbWlzZVJlc29sdmUuY2FsbChDLCBwcm9taXNlKS50aGVuKGZ1bmN0aW9uICh2YWx1ZSkge1xuICAgICAgICAgIGlmIChhbHJlYWR5UmVqZWN0ZWQgfHwgYWxyZWFkeVJlc29sdmVkKSByZXR1cm47XG4gICAgICAgICAgYWxyZWFkeVJlc29sdmVkID0gdHJ1ZTtcbiAgICAgICAgICByZXNvbHZlKHZhbHVlKTtcbiAgICAgICAgfSwgZnVuY3Rpb24gKGUpIHtcbiAgICAgICAgICBpZiAoYWxyZWFkeVJlamVjdGVkIHx8IGFscmVhZHlSZXNvbHZlZCkgcmV0dXJuO1xuICAgICAgICAgIGFscmVhZHlSZWplY3RlZCA9IHRydWU7XG4gICAgICAgICAgZXJyb3JzW2luZGV4XSA9IGU7XG4gICAgICAgICAgLS1yZW1haW5pbmcgfHwgcmVqZWN0KG5ldyAoZ2V0QnVpbHRJbignQWdncmVnYXRlRXJyb3InKSkoZXJyb3JzLCBQUk9NSVNFX0FOWV9FUlJPUikpO1xuICAgICAgICB9KTtcbiAgICAgIH0pO1xuICAgICAgLS1yZW1haW5pbmcgfHwgcmVqZWN0KG5ldyAoZ2V0QnVpbHRJbignQWdncmVnYXRlRXJyb3InKSkoZXJyb3JzLCBQUk9NSVNFX0FOWV9FUlJPUikpO1xuICAgIH0pO1xuICAgIGlmIChyZXN1bHQuZXJyb3IpIHJlamVjdChyZXN1bHQudmFsdWUpO1xuICAgIHJldHVybiBjYXBhYmlsaXR5LnByb21pc2U7XG4gIH1cbn0pO1xuIiwiJ3VzZSBzdHJpY3QnO1xudmFyICQgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvZXhwb3J0Jyk7XG52YXIgbmV3UHJvbWlzZUNhcGFiaWxpdHlNb2R1bGUgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvbmV3LXByb21pc2UtY2FwYWJpbGl0eScpO1xudmFyIHBlcmZvcm0gPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvcGVyZm9ybScpO1xuXG4vLyBgUHJvbWlzZS50cnlgIG1ldGhvZFxuLy8gaHR0cHM6Ly9naXRodWIuY29tL3RjMzkvcHJvcG9zYWwtcHJvbWlzZS10cnlcbiQoeyB0YXJnZXQ6ICdQcm9taXNlJywgc3RhdDogdHJ1ZSB9LCB7XG4gICd0cnknOiBmdW5jdGlvbiAoY2FsbGJhY2tmbikge1xuICAgIHZhciBwcm9taXNlQ2FwYWJpbGl0eSA9IG5ld1Byb21pc2VDYXBhYmlsaXR5TW9kdWxlLmYodGhpcyk7XG4gICAgdmFyIHJlc3VsdCA9IHBlcmZvcm0oY2FsbGJhY2tmbik7XG4gICAgKHJlc3VsdC5lcnJvciA/IHByb21pc2VDYXBhYmlsaXR5LnJlamVjdCA6IHByb21pc2VDYXBhYmlsaXR5LnJlc29sdmUpKHJlc3VsdC52YWx1ZSk7XG4gICAgcmV0dXJuIHByb21pc2VDYXBhYmlsaXR5LnByb21pc2U7XG4gIH1cbn0pO1xuIiwidmFyIGdsb2JhbCA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9nbG9iYWwnKTtcbnZhciBET01JdGVyYWJsZXMgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvZG9tLWl0ZXJhYmxlcycpO1xudmFyIEFycmF5SXRlcmF0b3JNZXRob2RzID0gcmVxdWlyZSgnLi4vbW9kdWxlcy9lcy5hcnJheS5pdGVyYXRvcicpO1xudmFyIGNyZWF0ZU5vbkVudW1lcmFibGVQcm9wZXJ0eSA9IHJlcXVpcmUoJy4uL2ludGVybmFscy9jcmVhdGUtbm9uLWVudW1lcmFibGUtcHJvcGVydHknKTtcbnZhciB3ZWxsS25vd25TeW1ib2wgPSByZXF1aXJlKCcuLi9pbnRlcm5hbHMvd2VsbC1rbm93bi1zeW1ib2wnKTtcblxudmFyIElURVJBVE9SID0gd2VsbEtub3duU3ltYm9sKCdpdGVyYXRvcicpO1xudmFyIFRPX1NUUklOR19UQUcgPSB3ZWxsS25vd25TeW1ib2woJ3RvU3RyaW5nVGFnJyk7XG52YXIgQXJyYXlWYWx1ZXMgPSBBcnJheUl0ZXJhdG9yTWV0aG9kcy52YWx1ZXM7XG5cbmZvciAodmFyIENPTExFQ1RJT05fTkFNRSBpbiBET01JdGVyYWJsZXMpIHtcbiAgdmFyIENvbGxlY3Rpb24gPSBnbG9iYWxbQ09MTEVDVElPTl9OQU1FXTtcbiAgdmFyIENvbGxlY3Rpb25Qcm90b3R5cGUgPSBDb2xsZWN0aW9uICYmIENvbGxlY3Rpb24ucHJvdG90eXBlO1xuICBpZiAoQ29sbGVjdGlvblByb3RvdHlwZSkge1xuICAgIC8vIHNvbWUgQ2hyb21lIHZlcnNpb25zIGhhdmUgbm9uLWNvbmZpZ3VyYWJsZSBtZXRob2RzIG9uIERPTVRva2VuTGlzdFxuICAgIGlmIChDb2xsZWN0aW9uUHJvdG90eXBlW0lURVJBVE9SXSAhPT0gQXJyYXlWYWx1ZXMpIHRyeSB7XG4gICAgICBjcmVhdGVOb25FbnVtZXJhYmxlUHJvcGVydHkoQ29sbGVjdGlvblByb3RvdHlwZSwgSVRFUkFUT1IsIEFycmF5VmFsdWVzKTtcbiAgICB9IGNhdGNoIChlcnJvcikge1xuICAgICAgQ29sbGVjdGlvblByb3RvdHlwZVtJVEVSQVRPUl0gPSBBcnJheVZhbHVlcztcbiAgICB9XG4gICAgaWYgKCFDb2xsZWN0aW9uUHJvdG90eXBlW1RPX1NUUklOR19UQUddKSB7XG4gICAgICBjcmVhdGVOb25FbnVtZXJhYmxlUHJvcGVydHkoQ29sbGVjdGlvblByb3RvdHlwZSwgVE9fU1RSSU5HX1RBRywgQ09MTEVDVElPTl9OQU1FKTtcbiAgICB9XG4gICAgaWYgKERPTUl0ZXJhYmxlc1tDT0xMRUNUSU9OX05BTUVdKSBmb3IgKHZhciBNRVRIT0RfTkFNRSBpbiBBcnJheUl0ZXJhdG9yTWV0aG9kcykge1xuICAgICAgLy8gc29tZSBDaHJvbWUgdmVyc2lvbnMgaGF2ZSBub24tY29uZmlndXJhYmxlIG1ldGhvZHMgb24gRE9NVG9rZW5MaXN0XG4gICAgICBpZiAoQ29sbGVjdGlvblByb3RvdHlwZVtNRVRIT0RfTkFNRV0gIT09IEFycmF5SXRlcmF0b3JNZXRob2RzW01FVEhPRF9OQU1FXSkgdHJ5IHtcbiAgICAgICAgY3JlYXRlTm9uRW51bWVyYWJsZVByb3BlcnR5KENvbGxlY3Rpb25Qcm90b3R5cGUsIE1FVEhPRF9OQU1FLCBBcnJheUl0ZXJhdG9yTWV0aG9kc1tNRVRIT0RfTkFNRV0pO1xuICAgICAgfSBjYXRjaCAoZXJyb3IpIHtcbiAgICAgICAgQ29sbGVjdGlvblByb3RvdHlwZVtNRVRIT0RfTkFNRV0gPSBBcnJheUl0ZXJhdG9yTWV0aG9kc1tNRVRIT0RfTkFNRV07XG4gICAgICB9XG4gICAgfVxuICB9XG59XG4iLCIvKipcbiAqIENvcHlyaWdodCAoYykgMjAxNC1wcmVzZW50LCBGYWNlYm9vaywgSW5jLlxuICpcbiAqIFRoaXMgc291cmNlIGNvZGUgaXMgbGljZW5zZWQgdW5kZXIgdGhlIE1JVCBsaWNlbnNlIGZvdW5kIGluIHRoZVxuICogTElDRU5TRSBmaWxlIGluIHRoZSByb290IGRpcmVjdG9yeSBvZiB0aGlzIHNvdXJjZSB0cmVlLlxuICovXG5cbnZhciBydW50aW1lID0gKGZ1bmN0aW9uIChleHBvcnRzKSB7XG4gIFwidXNlIHN0cmljdFwiO1xuXG4gIHZhciBPcCA9IE9iamVjdC5wcm90b3R5cGU7XG4gIHZhciBoYXNPd24gPSBPcC5oYXNPd25Qcm9wZXJ0eTtcbiAgdmFyIHVuZGVmaW5lZDsgLy8gTW9yZSBjb21wcmVzc2libGUgdGhhbiB2b2lkIDAuXG4gIHZhciAkU3ltYm9sID0gdHlwZW9mIFN5bWJvbCA9PT0gXCJmdW5jdGlvblwiID8gU3ltYm9sIDoge307XG4gIHZhciBpdGVyYXRvclN5bWJvbCA9ICRTeW1ib2wuaXRlcmF0b3IgfHwgXCJAQGl0ZXJhdG9yXCI7XG4gIHZhciBhc3luY0l0ZXJhdG9yU3ltYm9sID0gJFN5bWJvbC5hc3luY0l0ZXJhdG9yIHx8IFwiQEBhc3luY0l0ZXJhdG9yXCI7XG4gIHZhciB0b1N0cmluZ1RhZ1N5bWJvbCA9ICRTeW1ib2wudG9TdHJpbmdUYWcgfHwgXCJAQHRvU3RyaW5nVGFnXCI7XG5cbiAgZnVuY3Rpb24gd3JhcChpbm5lckZuLCBvdXRlckZuLCBzZWxmLCB0cnlMb2NzTGlzdCkge1xuICAgIC8vIElmIG91dGVyRm4gcHJvdmlkZWQgYW5kIG91dGVyRm4ucHJvdG90eXBlIGlzIGEgR2VuZXJhdG9yLCB0aGVuIG91dGVyRm4ucHJvdG90eXBlIGluc3RhbmNlb2YgR2VuZXJhdG9yLlxuICAgIHZhciBwcm90b0dlbmVyYXRvciA9IG91dGVyRm4gJiYgb3V0ZXJGbi5wcm90b3R5cGUgaW5zdGFuY2VvZiBHZW5lcmF0b3IgPyBvdXRlckZuIDogR2VuZXJhdG9yO1xuICAgIHZhciBnZW5lcmF0b3IgPSBPYmplY3QuY3JlYXRlKHByb3RvR2VuZXJhdG9yLnByb3RvdHlwZSk7XG4gICAgdmFyIGNvbnRleHQgPSBuZXcgQ29udGV4dCh0cnlMb2NzTGlzdCB8fCBbXSk7XG5cbiAgICAvLyBUaGUgLl9pbnZva2UgbWV0aG9kIHVuaWZpZXMgdGhlIGltcGxlbWVudGF0aW9ucyBvZiB0aGUgLm5leHQsXG4gICAgLy8gLnRocm93LCBhbmQgLnJldHVybiBtZXRob2RzLlxuICAgIGdlbmVyYXRvci5faW52b2tlID0gbWFrZUludm9rZU1ldGhvZChpbm5lckZuLCBzZWxmLCBjb250ZXh0KTtcblxuICAgIHJldHVybiBnZW5lcmF0b3I7XG4gIH1cbiAgZXhwb3J0cy53cmFwID0gd3JhcDtcblxuICAvLyBUcnkvY2F0Y2ggaGVscGVyIHRvIG1pbmltaXplIGRlb3B0aW1pemF0aW9ucy4gUmV0dXJucyBhIGNvbXBsZXRpb25cbiAgLy8gcmVjb3JkIGxpa2UgY29udGV4dC50cnlFbnRyaWVzW2ldLmNvbXBsZXRpb24uIFRoaXMgaW50ZXJmYWNlIGNvdWxkXG4gIC8vIGhhdmUgYmVlbiAoYW5kIHdhcyBwcmV2aW91c2x5KSBkZXNpZ25lZCB0byB0YWtlIGEgY2xvc3VyZSB0byBiZVxuICAvLyBpbnZva2VkIHdpdGhvdXQgYXJndW1lbnRzLCBidXQgaW4gYWxsIHRoZSBjYXNlcyB3ZSBjYXJlIGFib3V0IHdlXG4gIC8vIGFscmVhZHkgaGF2ZSBhbiBleGlzdGluZyBtZXRob2Qgd2Ugd2FudCB0byBjYWxsLCBzbyB0aGVyZSdzIG5vIG5lZWRcbiAgLy8gdG8gY3JlYXRlIGEgbmV3IGZ1bmN0aW9uIG9iamVjdC4gV2UgY2FuIGV2ZW4gZ2V0IGF3YXkgd2l0aCBhc3N1bWluZ1xuICAvLyB0aGUgbWV0aG9kIHRha2VzIGV4YWN0bHkgb25lIGFyZ3VtZW50LCBzaW5jZSB0aGF0IGhhcHBlbnMgdG8gYmUgdHJ1ZVxuICAvLyBpbiBldmVyeSBjYXNlLCBzbyB3ZSBkb24ndCBoYXZlIHRvIHRvdWNoIHRoZSBhcmd1bWVudHMgb2JqZWN0LiBUaGVcbiAgLy8gb25seSBhZGRpdGlvbmFsIGFsbG9jYXRpb24gcmVxdWlyZWQgaXMgdGhlIGNvbXBsZXRpb24gcmVjb3JkLCB3aGljaFxuICAvLyBoYXMgYSBzdGFibGUgc2hhcGUgYW5kIHNvIGhvcGVmdWxseSBzaG91bGQgYmUgY2hlYXAgdG8gYWxsb2NhdGUuXG4gIGZ1bmN0aW9uIHRyeUNhdGNoKGZuLCBvYmosIGFyZykge1xuICAgIHRyeSB7XG4gICAgICByZXR1cm4geyB0eXBlOiBcIm5vcm1hbFwiLCBhcmc6IGZuLmNhbGwob2JqLCBhcmcpIH07XG4gICAgfSBjYXRjaCAoZXJyKSB7XG4gICAgICByZXR1cm4geyB0eXBlOiBcInRocm93XCIsIGFyZzogZXJyIH07XG4gICAgfVxuICB9XG5cbiAgdmFyIEdlblN0YXRlU3VzcGVuZGVkU3RhcnQgPSBcInN1c3BlbmRlZFN0YXJ0XCI7XG4gIHZhciBHZW5TdGF0ZVN1c3BlbmRlZFlpZWxkID0gXCJzdXNwZW5kZWRZaWVsZFwiO1xuICB2YXIgR2VuU3RhdGVFeGVjdXRpbmcgPSBcImV4ZWN1dGluZ1wiO1xuICB2YXIgR2VuU3RhdGVDb21wbGV0ZWQgPSBcImNvbXBsZXRlZFwiO1xuXG4gIC8vIFJldHVybmluZyB0aGlzIG9iamVjdCBmcm9tIHRoZSBpbm5lckZuIGhhcyB0aGUgc2FtZSBlZmZlY3QgYXNcbiAgLy8gYnJlYWtpbmcgb3V0IG9mIHRoZSBkaXNwYXRjaCBzd2l0Y2ggc3RhdGVtZW50LlxuICB2YXIgQ29udGludWVTZW50aW5lbCA9IHt9O1xuXG4gIC8vIER1bW15IGNvbnN0cnVjdG9yIGZ1bmN0aW9ucyB0aGF0IHdlIHVzZSBhcyB0aGUgLmNvbnN0cnVjdG9yIGFuZFxuICAvLyAuY29uc3RydWN0b3IucHJvdG90eXBlIHByb3BlcnRpZXMgZm9yIGZ1bmN0aW9ucyB0aGF0IHJldHVybiBHZW5lcmF0b3JcbiAgLy8gb2JqZWN0cy4gRm9yIGZ1bGwgc3BlYyBjb21wbGlhbmNlLCB5b3UgbWF5IHdpc2ggdG8gY29uZmlndXJlIHlvdXJcbiAgLy8gbWluaWZpZXIgbm90IHRvIG1hbmdsZSB0aGUgbmFtZXMgb2YgdGhlc2UgdHdvIGZ1bmN0aW9ucy5cbiAgZnVuY3Rpb24gR2VuZXJhdG9yKCkge31cbiAgZnVuY3Rpb24gR2VuZXJhdG9yRnVuY3Rpb24oKSB7fVxuICBmdW5jdGlvbiBHZW5lcmF0b3JGdW5jdGlvblByb3RvdHlwZSgpIHt9XG5cbiAgLy8gVGhpcyBpcyBhIHBvbHlmaWxsIGZvciAlSXRlcmF0b3JQcm90b3R5cGUlIGZvciBlbnZpcm9ubWVudHMgdGhhdFxuICAvLyBkb24ndCBuYXRpdmVseSBzdXBwb3J0IGl0LlxuICB2YXIgSXRlcmF0b3JQcm90b3R5cGUgPSB7fTtcbiAgSXRlcmF0b3JQcm90b3R5cGVbaXRlcmF0b3JTeW1ib2xdID0gZnVuY3Rpb24gKCkge1xuICAgIHJldHVybiB0aGlzO1xuICB9O1xuXG4gIHZhciBnZXRQcm90byA9IE9iamVjdC5nZXRQcm90b3R5cGVPZjtcbiAgdmFyIE5hdGl2ZUl0ZXJhdG9yUHJvdG90eXBlID0gZ2V0UHJvdG8gJiYgZ2V0UHJvdG8oZ2V0UHJvdG8odmFsdWVzKFtdKSkpO1xuICBpZiAoTmF0aXZlSXRlcmF0b3JQcm90b3R5cGUgJiZcbiAgICAgIE5hdGl2ZUl0ZXJhdG9yUHJvdG90eXBlICE9PSBPcCAmJlxuICAgICAgaGFzT3duLmNhbGwoTmF0aXZlSXRlcmF0b3JQcm90b3R5cGUsIGl0ZXJhdG9yU3ltYm9sKSkge1xuICAgIC8vIFRoaXMgZW52aXJvbm1lbnQgaGFzIGEgbmF0aXZlICVJdGVyYXRvclByb3RvdHlwZSU7IHVzZSBpdCBpbnN0ZWFkXG4gICAgLy8gb2YgdGhlIHBvbHlmaWxsLlxuICAgIEl0ZXJhdG9yUHJvdG90eXBlID0gTmF0aXZlSXRlcmF0b3JQcm90b3R5cGU7XG4gIH1cblxuICB2YXIgR3AgPSBHZW5lcmF0b3JGdW5jdGlvblByb3RvdHlwZS5wcm90b3R5cGUgPVxuICAgIEdlbmVyYXRvci5wcm90b3R5cGUgPSBPYmplY3QuY3JlYXRlKEl0ZXJhdG9yUHJvdG90eXBlKTtcbiAgR2VuZXJhdG9yRnVuY3Rpb24ucHJvdG90eXBlID0gR3AuY29uc3RydWN0b3IgPSBHZW5lcmF0b3JGdW5jdGlvblByb3RvdHlwZTtcbiAgR2VuZXJhdG9yRnVuY3Rpb25Qcm90b3R5cGUuY29uc3RydWN0b3IgPSBHZW5lcmF0b3JGdW5jdGlvbjtcbiAgR2VuZXJhdG9yRnVuY3Rpb25Qcm90b3R5cGVbdG9TdHJpbmdUYWdTeW1ib2xdID1cbiAgICBHZW5lcmF0b3JGdW5jdGlvbi5kaXNwbGF5TmFtZSA9IFwiR2VuZXJhdG9yRnVuY3Rpb25cIjtcblxuICAvLyBIZWxwZXIgZm9yIGRlZmluaW5nIHRoZSAubmV4dCwgLnRocm93LCBhbmQgLnJldHVybiBtZXRob2RzIG9mIHRoZVxuICAvLyBJdGVyYXRvciBpbnRlcmZhY2UgaW4gdGVybXMgb2YgYSBzaW5nbGUgLl9pbnZva2UgbWV0aG9kLlxuICBmdW5jdGlvbiBkZWZpbmVJdGVyYXRvck1ldGhvZHMocHJvdG90eXBlKSB7XG4gICAgW1wibmV4dFwiLCBcInRocm93XCIsIFwicmV0dXJuXCJdLmZvckVhY2goZnVuY3Rpb24obWV0aG9kKSB7XG4gICAgICBwcm90b3R5cGVbbWV0aG9kXSA9IGZ1bmN0aW9uKGFyZykge1xuICAgICAgICByZXR1cm4gdGhpcy5faW52b2tlKG1ldGhvZCwgYXJnKTtcbiAgICAgIH07XG4gICAgfSk7XG4gIH1cblxuICBleHBvcnRzLmlzR2VuZXJhdG9yRnVuY3Rpb24gPSBmdW5jdGlvbihnZW5GdW4pIHtcbiAgICB2YXIgY3RvciA9IHR5cGVvZiBnZW5GdW4gPT09IFwiZnVuY3Rpb25cIiAmJiBnZW5GdW4uY29uc3RydWN0b3I7XG4gICAgcmV0dXJuIGN0b3JcbiAgICAgID8gY3RvciA9PT0gR2VuZXJhdG9yRnVuY3Rpb24gfHxcbiAgICAgICAgLy8gRm9yIHRoZSBuYXRpdmUgR2VuZXJhdG9yRnVuY3Rpb24gY29uc3RydWN0b3IsIHRoZSBiZXN0IHdlIGNhblxuICAgICAgICAvLyBkbyBpcyB0byBjaGVjayBpdHMgLm5hbWUgcHJvcGVydHkuXG4gICAgICAgIChjdG9yLmRpc3BsYXlOYW1lIHx8IGN0b3IubmFtZSkgPT09IFwiR2VuZXJhdG9yRnVuY3Rpb25cIlxuICAgICAgOiBmYWxzZTtcbiAgfTtcblxuICBleHBvcnRzLm1hcmsgPSBmdW5jdGlvbihnZW5GdW4pIHtcbiAgICBpZiAoT2JqZWN0LnNldFByb3RvdHlwZU9mKSB7XG4gICAgICBPYmplY3Quc2V0UHJvdG90eXBlT2YoZ2VuRnVuLCBHZW5lcmF0b3JGdW5jdGlvblByb3RvdHlwZSk7XG4gICAgfSBlbHNlIHtcbiAgICAgIGdlbkZ1bi5fX3Byb3RvX18gPSBHZW5lcmF0b3JGdW5jdGlvblByb3RvdHlwZTtcbiAgICAgIGlmICghKHRvU3RyaW5nVGFnU3ltYm9sIGluIGdlbkZ1bikpIHtcbiAgICAgICAgZ2VuRnVuW3RvU3RyaW5nVGFnU3ltYm9sXSA9IFwiR2VuZXJhdG9yRnVuY3Rpb25cIjtcbiAgICAgIH1cbiAgICB9XG4gICAgZ2VuRnVuLnByb3RvdHlwZSA9IE9iamVjdC5jcmVhdGUoR3ApO1xuICAgIHJldHVybiBnZW5GdW47XG4gIH07XG5cbiAgLy8gV2l0aGluIHRoZSBib2R5IG9mIGFueSBhc3luYyBmdW5jdGlvbiwgYGF3YWl0IHhgIGlzIHRyYW5zZm9ybWVkIHRvXG4gIC8vIGB5aWVsZCByZWdlbmVyYXRvclJ1bnRpbWUuYXdyYXAoeClgLCBzbyB0aGF0IHRoZSBydW50aW1lIGNhbiB0ZXN0XG4gIC8vIGBoYXNPd24uY2FsbCh2YWx1ZSwgXCJfX2F3YWl0XCIpYCB0byBkZXRlcm1pbmUgaWYgdGhlIHlpZWxkZWQgdmFsdWUgaXNcbiAgLy8gbWVhbnQgdG8gYmUgYXdhaXRlZC5cbiAgZXhwb3J0cy5hd3JhcCA9IGZ1bmN0aW9uKGFyZykge1xuICAgIHJldHVybiB7IF9fYXdhaXQ6IGFyZyB9O1xuICB9O1xuXG4gIGZ1bmN0aW9uIEFzeW5jSXRlcmF0b3IoZ2VuZXJhdG9yKSB7XG4gICAgZnVuY3Rpb24gaW52b2tlKG1ldGhvZCwgYXJnLCByZXNvbHZlLCByZWplY3QpIHtcbiAgICAgIHZhciByZWNvcmQgPSB0cnlDYXRjaChnZW5lcmF0b3JbbWV0aG9kXSwgZ2VuZXJhdG9yLCBhcmcpO1xuICAgICAgaWYgKHJlY29yZC50eXBlID09PSBcInRocm93XCIpIHtcbiAgICAgICAgcmVqZWN0KHJlY29yZC5hcmcpO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgdmFyIHJlc3VsdCA9IHJlY29yZC5hcmc7XG4gICAgICAgIHZhciB2YWx1ZSA9IHJlc3VsdC52YWx1ZTtcbiAgICAgICAgaWYgKHZhbHVlICYmXG4gICAgICAgICAgICB0eXBlb2YgdmFsdWUgPT09IFwib2JqZWN0XCIgJiZcbiAgICAgICAgICAgIGhhc093bi5jYWxsKHZhbHVlLCBcIl9fYXdhaXRcIikpIHtcbiAgICAgICAgICByZXR1cm4gUHJvbWlzZS5yZXNvbHZlKHZhbHVlLl9fYXdhaXQpLnRoZW4oZnVuY3Rpb24odmFsdWUpIHtcbiAgICAgICAgICAgIGludm9rZShcIm5leHRcIiwgdmFsdWUsIHJlc29sdmUsIHJlamVjdCk7XG4gICAgICAgICAgfSwgZnVuY3Rpb24oZXJyKSB7XG4gICAgICAgICAgICBpbnZva2UoXCJ0aHJvd1wiLCBlcnIsIHJlc29sdmUsIHJlamVjdCk7XG4gICAgICAgICAgfSk7XG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4gUHJvbWlzZS5yZXNvbHZlKHZhbHVlKS50aGVuKGZ1bmN0aW9uKHVud3JhcHBlZCkge1xuICAgICAgICAgIC8vIFdoZW4gYSB5aWVsZGVkIFByb21pc2UgaXMgcmVzb2x2ZWQsIGl0cyBmaW5hbCB2YWx1ZSBiZWNvbWVzXG4gICAgICAgICAgLy8gdGhlIC52YWx1ZSBvZiB0aGUgUHJvbWlzZTx7dmFsdWUsZG9uZX0+IHJlc3VsdCBmb3IgdGhlXG4gICAgICAgICAgLy8gY3VycmVudCBpdGVyYXRpb24uXG4gICAgICAgICAgcmVzdWx0LnZhbHVlID0gdW53cmFwcGVkO1xuICAgICAgICAgIHJlc29sdmUocmVzdWx0KTtcbiAgICAgICAgfSwgZnVuY3Rpb24oZXJyb3IpIHtcbiAgICAgICAgICAvLyBJZiBhIHJlamVjdGVkIFByb21pc2Ugd2FzIHlpZWxkZWQsIHRocm93IHRoZSByZWplY3Rpb24gYmFja1xuICAgICAgICAgIC8vIGludG8gdGhlIGFzeW5jIGdlbmVyYXRvciBmdW5jdGlvbiBzbyBpdCBjYW4gYmUgaGFuZGxlZCB0aGVyZS5cbiAgICAgICAgICByZXR1cm4gaW52b2tlKFwidGhyb3dcIiwgZXJyb3IsIHJlc29sdmUsIHJlamVjdCk7XG4gICAgICAgIH0pO1xuICAgICAgfVxuICAgIH1cblxuICAgIHZhciBwcmV2aW91c1Byb21pc2U7XG5cbiAgICBmdW5jdGlvbiBlbnF1ZXVlKG1ldGhvZCwgYXJnKSB7XG4gICAgICBmdW5jdGlvbiBjYWxsSW52b2tlV2l0aE1ldGhvZEFuZEFyZygpIHtcbiAgICAgICAgcmV0dXJuIG5ldyBQcm9taXNlKGZ1bmN0aW9uKHJlc29sdmUsIHJlamVjdCkge1xuICAgICAgICAgIGludm9rZShtZXRob2QsIGFyZywgcmVzb2x2ZSwgcmVqZWN0KTtcbiAgICAgICAgfSk7XG4gICAgICB9XG5cbiAgICAgIHJldHVybiBwcmV2aW91c1Byb21pc2UgPVxuICAgICAgICAvLyBJZiBlbnF1ZXVlIGhhcyBiZWVuIGNhbGxlZCBiZWZvcmUsIHRoZW4gd2Ugd2FudCB0byB3YWl0IHVudGlsXG4gICAgICAgIC8vIGFsbCBwcmV2aW91cyBQcm9taXNlcyBoYXZlIGJlZW4gcmVzb2x2ZWQgYmVmb3JlIGNhbGxpbmcgaW52b2tlLFxuICAgICAgICAvLyBzbyB0aGF0IHJlc3VsdHMgYXJlIGFsd2F5cyBkZWxpdmVyZWQgaW4gdGhlIGNvcnJlY3Qgb3JkZXIuIElmXG4gICAgICAgIC8vIGVucXVldWUgaGFzIG5vdCBiZWVuIGNhbGxlZCBiZWZvcmUsIHRoZW4gaXQgaXMgaW1wb3J0YW50IHRvXG4gICAgICAgIC8vIGNhbGwgaW52b2tlIGltbWVkaWF0ZWx5LCB3aXRob3V0IHdhaXRpbmcgb24gYSBjYWxsYmFjayB0byBmaXJlLFxuICAgICAgICAvLyBzbyB0aGF0IHRoZSBhc3luYyBnZW5lcmF0b3IgZnVuY3Rpb24gaGFzIHRoZSBvcHBvcnR1bml0eSB0byBkb1xuICAgICAgICAvLyBhbnkgbmVjZXNzYXJ5IHNldHVwIGluIGEgcHJlZGljdGFibGUgd2F5LiBUaGlzIHByZWRpY3RhYmlsaXR5XG4gICAgICAgIC8vIGlzIHdoeSB0aGUgUHJvbWlzZSBjb25zdHJ1Y3RvciBzeW5jaHJvbm91c2x5IGludm9rZXMgaXRzXG4gICAgICAgIC8vIGV4ZWN1dG9yIGNhbGxiYWNrLCBhbmQgd2h5IGFzeW5jIGZ1bmN0aW9ucyBzeW5jaHJvbm91c2x5XG4gICAgICAgIC8vIGV4ZWN1dGUgY29kZSBiZWZvcmUgdGhlIGZpcnN0IGF3YWl0LiBTaW5jZSB3ZSBpbXBsZW1lbnQgc2ltcGxlXG4gICAgICAgIC8vIGFzeW5jIGZ1bmN0aW9ucyBpbiB0ZXJtcyBvZiBhc3luYyBnZW5lcmF0b3JzLCBpdCBpcyBlc3BlY2lhbGx5XG4gICAgICAgIC8vIGltcG9ydGFudCB0byBnZXQgdGhpcyByaWdodCwgZXZlbiB0aG91Z2ggaXQgcmVxdWlyZXMgY2FyZS5cbiAgICAgICAgcHJldmlvdXNQcm9taXNlID8gcHJldmlvdXNQcm9taXNlLnRoZW4oXG4gICAgICAgICAgY2FsbEludm9rZVdpdGhNZXRob2RBbmRBcmcsXG4gICAgICAgICAgLy8gQXZvaWQgcHJvcGFnYXRpbmcgZmFpbHVyZXMgdG8gUHJvbWlzZXMgcmV0dXJuZWQgYnkgbGF0ZXJcbiAgICAgICAgICAvLyBpbnZvY2F0aW9ucyBvZiB0aGUgaXRlcmF0b3IuXG4gICAgICAgICAgY2FsbEludm9rZVdpdGhNZXRob2RBbmRBcmdcbiAgICAgICAgKSA6IGNhbGxJbnZva2VXaXRoTWV0aG9kQW5kQXJnKCk7XG4gICAgfVxuXG4gICAgLy8gRGVmaW5lIHRoZSB1bmlmaWVkIGhlbHBlciBtZXRob2QgdGhhdCBpcyB1c2VkIHRvIGltcGxlbWVudCAubmV4dCxcbiAgICAvLyAudGhyb3csIGFuZCAucmV0dXJuIChzZWUgZGVmaW5lSXRlcmF0b3JNZXRob2RzKS5cbiAgICB0aGlzLl9pbnZva2UgPSBlbnF1ZXVlO1xuICB9XG5cbiAgZGVmaW5lSXRlcmF0b3JNZXRob2RzKEFzeW5jSXRlcmF0b3IucHJvdG90eXBlKTtcbiAgQXN5bmNJdGVyYXRvci5wcm90b3R5cGVbYXN5bmNJdGVyYXRvclN5bWJvbF0gPSBmdW5jdGlvbiAoKSB7XG4gICAgcmV0dXJuIHRoaXM7XG4gIH07XG4gIGV4cG9ydHMuQXN5bmNJdGVyYXRvciA9IEFzeW5jSXRlcmF0b3I7XG5cbiAgLy8gTm90ZSB0aGF0IHNpbXBsZSBhc3luYyBmdW5jdGlvbnMgYXJlIGltcGxlbWVudGVkIG9uIHRvcCBvZlxuICAvLyBBc3luY0l0ZXJhdG9yIG9iamVjdHM7IHRoZXkganVzdCByZXR1cm4gYSBQcm9taXNlIGZvciB0aGUgdmFsdWUgb2ZcbiAgLy8gdGhlIGZpbmFsIHJlc3VsdCBwcm9kdWNlZCBieSB0aGUgaXRlcmF0b3IuXG4gIGV4cG9ydHMuYXN5bmMgPSBmdW5jdGlvbihpbm5lckZuLCBvdXRlckZuLCBzZWxmLCB0cnlMb2NzTGlzdCkge1xuICAgIHZhciBpdGVyID0gbmV3IEFzeW5jSXRlcmF0b3IoXG4gICAgICB3cmFwKGlubmVyRm4sIG91dGVyRm4sIHNlbGYsIHRyeUxvY3NMaXN0KVxuICAgICk7XG5cbiAgICByZXR1cm4gZXhwb3J0cy5pc0dlbmVyYXRvckZ1bmN0aW9uKG91dGVyRm4pXG4gICAgICA/IGl0ZXIgLy8gSWYgb3V0ZXJGbiBpcyBhIGdlbmVyYXRvciwgcmV0dXJuIHRoZSBmdWxsIGl0ZXJhdG9yLlxuICAgICAgOiBpdGVyLm5leHQoKS50aGVuKGZ1bmN0aW9uKHJlc3VsdCkge1xuICAgICAgICAgIHJldHVybiByZXN1bHQuZG9uZSA/IHJlc3VsdC52YWx1ZSA6IGl0ZXIubmV4dCgpO1xuICAgICAgICB9KTtcbiAgfTtcblxuICBmdW5jdGlvbiBtYWtlSW52b2tlTWV0aG9kKGlubmVyRm4sIHNlbGYsIGNvbnRleHQpIHtcbiAgICB2YXIgc3RhdGUgPSBHZW5TdGF0ZVN1c3BlbmRlZFN0YXJ0O1xuXG4gICAgcmV0dXJuIGZ1bmN0aW9uIGludm9rZShtZXRob2QsIGFyZykge1xuICAgICAgaWYgKHN0YXRlID09PSBHZW5TdGF0ZUV4ZWN1dGluZykge1xuICAgICAgICB0aHJvdyBuZXcgRXJyb3IoXCJHZW5lcmF0b3IgaXMgYWxyZWFkeSBydW5uaW5nXCIpO1xuICAgICAgfVxuXG4gICAgICBpZiAoc3RhdGUgPT09IEdlblN0YXRlQ29tcGxldGVkKSB7XG4gICAgICAgIGlmIChtZXRob2QgPT09IFwidGhyb3dcIikge1xuICAgICAgICAgIHRocm93IGFyZztcbiAgICAgICAgfVxuXG4gICAgICAgIC8vIEJlIGZvcmdpdmluZywgcGVyIDI1LjMuMy4zLjMgb2YgdGhlIHNwZWM6XG4gICAgICAgIC8vIGh0dHBzOi8vcGVvcGxlLm1vemlsbGEub3JnL35qb3JlbmRvcmZmL2VzNi1kcmFmdC5odG1sI3NlYy1nZW5lcmF0b3JyZXN1bWVcbiAgICAgICAgcmV0dXJuIGRvbmVSZXN1bHQoKTtcbiAgICAgIH1cblxuICAgICAgY29udGV4dC5tZXRob2QgPSBtZXRob2Q7XG4gICAgICBjb250ZXh0LmFyZyA9IGFyZztcblxuICAgICAgd2hpbGUgKHRydWUpIHtcbiAgICAgICAgdmFyIGRlbGVnYXRlID0gY29udGV4dC5kZWxlZ2F0ZTtcbiAgICAgICAgaWYgKGRlbGVnYXRlKSB7XG4gICAgICAgICAgdmFyIGRlbGVnYXRlUmVzdWx0ID0gbWF5YmVJbnZva2VEZWxlZ2F0ZShkZWxlZ2F0ZSwgY29udGV4dCk7XG4gICAgICAgICAgaWYgKGRlbGVnYXRlUmVzdWx0KSB7XG4gICAgICAgICAgICBpZiAoZGVsZWdhdGVSZXN1bHQgPT09IENvbnRpbnVlU2VudGluZWwpIGNvbnRpbnVlO1xuICAgICAgICAgICAgcmV0dXJuIGRlbGVnYXRlUmVzdWx0O1xuICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgIGlmIChjb250ZXh0Lm1ldGhvZCA9PT0gXCJuZXh0XCIpIHtcbiAgICAgICAgICAvLyBTZXR0aW5nIGNvbnRleHQuX3NlbnQgZm9yIGxlZ2FjeSBzdXBwb3J0IG9mIEJhYmVsJ3NcbiAgICAgICAgICAvLyBmdW5jdGlvbi5zZW50IGltcGxlbWVudGF0aW9uLlxuICAgICAgICAgIGNvbnRleHQuc2VudCA9IGNvbnRleHQuX3NlbnQgPSBjb250ZXh0LmFyZztcblxuICAgICAgICB9IGVsc2UgaWYgKGNvbnRleHQubWV0aG9kID09PSBcInRocm93XCIpIHtcbiAgICAgICAgICBpZiAoc3RhdGUgPT09IEdlblN0YXRlU3VzcGVuZGVkU3RhcnQpIHtcbiAgICAgICAgICAgIHN0YXRlID0gR2VuU3RhdGVDb21wbGV0ZWQ7XG4gICAgICAgICAgICB0aHJvdyBjb250ZXh0LmFyZztcbiAgICAgICAgICB9XG5cbiAgICAgICAgICBjb250ZXh0LmRpc3BhdGNoRXhjZXB0aW9uKGNvbnRleHQuYXJnKTtcblxuICAgICAgICB9IGVsc2UgaWYgKGNvbnRleHQubWV0aG9kID09PSBcInJldHVyblwiKSB7XG4gICAgICAgICAgY29udGV4dC5hYnJ1cHQoXCJyZXR1cm5cIiwgY29udGV4dC5hcmcpO1xuICAgICAgICB9XG5cbiAgICAgICAgc3RhdGUgPSBHZW5TdGF0ZUV4ZWN1dGluZztcblxuICAgICAgICB2YXIgcmVjb3JkID0gdHJ5Q2F0Y2goaW5uZXJGbiwgc2VsZiwgY29udGV4dCk7XG4gICAgICAgIGlmIChyZWNvcmQudHlwZSA9PT0gXCJub3JtYWxcIikge1xuICAgICAgICAgIC8vIElmIGFuIGV4Y2VwdGlvbiBpcyB0aHJvd24gZnJvbSBpbm5lckZuLCB3ZSBsZWF2ZSBzdGF0ZSA9PT1cbiAgICAgICAgICAvLyBHZW5TdGF0ZUV4ZWN1dGluZyBhbmQgbG9vcCBiYWNrIGZvciBhbm90aGVyIGludm9jYXRpb24uXG4gICAgICAgICAgc3RhdGUgPSBjb250ZXh0LmRvbmVcbiAgICAgICAgICAgID8gR2VuU3RhdGVDb21wbGV0ZWRcbiAgICAgICAgICAgIDogR2VuU3RhdGVTdXNwZW5kZWRZaWVsZDtcblxuICAgICAgICAgIGlmIChyZWNvcmQuYXJnID09PSBDb250aW51ZVNlbnRpbmVsKSB7XG4gICAgICAgICAgICBjb250aW51ZTtcbiAgICAgICAgICB9XG5cbiAgICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgdmFsdWU6IHJlY29yZC5hcmcsXG4gICAgICAgICAgICBkb25lOiBjb250ZXh0LmRvbmVcbiAgICAgICAgICB9O1xuXG4gICAgICAgIH0gZWxzZSBpZiAocmVjb3JkLnR5cGUgPT09IFwidGhyb3dcIikge1xuICAgICAgICAgIHN0YXRlID0gR2VuU3RhdGVDb21wbGV0ZWQ7XG4gICAgICAgICAgLy8gRGlzcGF0Y2ggdGhlIGV4Y2VwdGlvbiBieSBsb29waW5nIGJhY2sgYXJvdW5kIHRvIHRoZVxuICAgICAgICAgIC8vIGNvbnRleHQuZGlzcGF0Y2hFeGNlcHRpb24oY29udGV4dC5hcmcpIGNhbGwgYWJvdmUuXG4gICAgICAgICAgY29udGV4dC5tZXRob2QgPSBcInRocm93XCI7XG4gICAgICAgICAgY29udGV4dC5hcmcgPSByZWNvcmQuYXJnO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfTtcbiAgfVxuXG4gIC8vIENhbGwgZGVsZWdhdGUuaXRlcmF0b3JbY29udGV4dC5tZXRob2RdKGNvbnRleHQuYXJnKSBhbmQgaGFuZGxlIHRoZVxuICAvLyByZXN1bHQsIGVpdGhlciBieSByZXR1cm5pbmcgYSB7IHZhbHVlLCBkb25lIH0gcmVzdWx0IGZyb20gdGhlXG4gIC8vIGRlbGVnYXRlIGl0ZXJhdG9yLCBvciBieSBtb2RpZnlpbmcgY29udGV4dC5tZXRob2QgYW5kIGNvbnRleHQuYXJnLFxuICAvLyBzZXR0aW5nIGNvbnRleHQuZGVsZWdhdGUgdG8gbnVsbCwgYW5kIHJldHVybmluZyB0aGUgQ29udGludWVTZW50aW5lbC5cbiAgZnVuY3Rpb24gbWF5YmVJbnZva2VEZWxlZ2F0ZShkZWxlZ2F0ZSwgY29udGV4dCkge1xuICAgIHZhciBtZXRob2QgPSBkZWxlZ2F0ZS5pdGVyYXRvcltjb250ZXh0Lm1ldGhvZF07XG4gICAgaWYgKG1ldGhvZCA9PT0gdW5kZWZpbmVkKSB7XG4gICAgICAvLyBBIC50aHJvdyBvciAucmV0dXJuIHdoZW4gdGhlIGRlbGVnYXRlIGl0ZXJhdG9yIGhhcyBubyAudGhyb3dcbiAgICAgIC8vIG1ldGhvZCBhbHdheXMgdGVybWluYXRlcyB0aGUgeWllbGQqIGxvb3AuXG4gICAgICBjb250ZXh0LmRlbGVnYXRlID0gbnVsbDtcblxuICAgICAgaWYgKGNvbnRleHQubWV0aG9kID09PSBcInRocm93XCIpIHtcbiAgICAgICAgLy8gTm90ZTogW1wicmV0dXJuXCJdIG11c3QgYmUgdXNlZCBmb3IgRVMzIHBhcnNpbmcgY29tcGF0aWJpbGl0eS5cbiAgICAgICAgaWYgKGRlbGVnYXRlLml0ZXJhdG9yW1wicmV0dXJuXCJdKSB7XG4gICAgICAgICAgLy8gSWYgdGhlIGRlbGVnYXRlIGl0ZXJhdG9yIGhhcyBhIHJldHVybiBtZXRob2QsIGdpdmUgaXQgYVxuICAgICAgICAgIC8vIGNoYW5jZSB0byBjbGVhbiB1cC5cbiAgICAgICAgICBjb250ZXh0Lm1ldGhvZCA9IFwicmV0dXJuXCI7XG4gICAgICAgICAgY29udGV4dC5hcmcgPSB1bmRlZmluZWQ7XG4gICAgICAgICAgbWF5YmVJbnZva2VEZWxlZ2F0ZShkZWxlZ2F0ZSwgY29udGV4dCk7XG5cbiAgICAgICAgICBpZiAoY29udGV4dC5tZXRob2QgPT09IFwidGhyb3dcIikge1xuICAgICAgICAgICAgLy8gSWYgbWF5YmVJbnZva2VEZWxlZ2F0ZShjb250ZXh0KSBjaGFuZ2VkIGNvbnRleHQubWV0aG9kIGZyb21cbiAgICAgICAgICAgIC8vIFwicmV0dXJuXCIgdG8gXCJ0aHJvd1wiLCBsZXQgdGhhdCBvdmVycmlkZSB0aGUgVHlwZUVycm9yIGJlbG93LlxuICAgICAgICAgICAgcmV0dXJuIENvbnRpbnVlU2VudGluZWw7XG4gICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgY29udGV4dC5tZXRob2QgPSBcInRocm93XCI7XG4gICAgICAgIGNvbnRleHQuYXJnID0gbmV3IFR5cGVFcnJvcihcbiAgICAgICAgICBcIlRoZSBpdGVyYXRvciBkb2VzIG5vdCBwcm92aWRlIGEgJ3Rocm93JyBtZXRob2RcIik7XG4gICAgICB9XG5cbiAgICAgIHJldHVybiBDb250aW51ZVNlbnRpbmVsO1xuICAgIH1cblxuICAgIHZhciByZWNvcmQgPSB0cnlDYXRjaChtZXRob2QsIGRlbGVnYXRlLml0ZXJhdG9yLCBjb250ZXh0LmFyZyk7XG5cbiAgICBpZiAocmVjb3JkLnR5cGUgPT09IFwidGhyb3dcIikge1xuICAgICAgY29udGV4dC5tZXRob2QgPSBcInRocm93XCI7XG4gICAgICBjb250ZXh0LmFyZyA9IHJlY29yZC5hcmc7XG4gICAgICBjb250ZXh0LmRlbGVnYXRlID0gbnVsbDtcbiAgICAgIHJldHVybiBDb250aW51ZVNlbnRpbmVsO1xuICAgIH1cblxuICAgIHZhciBpbmZvID0gcmVjb3JkLmFyZztcblxuICAgIGlmICghIGluZm8pIHtcbiAgICAgIGNvbnRleHQubWV0aG9kID0gXCJ0aHJvd1wiO1xuICAgICAgY29udGV4dC5hcmcgPSBuZXcgVHlwZUVycm9yKFwiaXRlcmF0b3IgcmVzdWx0IGlzIG5vdCBhbiBvYmplY3RcIik7XG4gICAgICBjb250ZXh0LmRlbGVnYXRlID0gbnVsbDtcbiAgICAgIHJldHVybiBDb250aW51ZVNlbnRpbmVsO1xuICAgIH1cblxuICAgIGlmIChpbmZvLmRvbmUpIHtcbiAgICAgIC8vIEFzc2lnbiB0aGUgcmVzdWx0IG9mIHRoZSBmaW5pc2hlZCBkZWxlZ2F0ZSB0byB0aGUgdGVtcG9yYXJ5XG4gICAgICAvLyB2YXJpYWJsZSBzcGVjaWZpZWQgYnkgZGVsZWdhdGUucmVzdWx0TmFtZSAoc2VlIGRlbGVnYXRlWWllbGQpLlxuICAgICAgY29udGV4dFtkZWxlZ2F0ZS5yZXN1bHROYW1lXSA9IGluZm8udmFsdWU7XG5cbiAgICAgIC8vIFJlc3VtZSBleGVjdXRpb24gYXQgdGhlIGRlc2lyZWQgbG9jYXRpb24gKHNlZSBkZWxlZ2F0ZVlpZWxkKS5cbiAgICAgIGNvbnRleHQubmV4dCA9IGRlbGVnYXRlLm5leHRMb2M7XG5cbiAgICAgIC8vIElmIGNvbnRleHQubWV0aG9kIHdhcyBcInRocm93XCIgYnV0IHRoZSBkZWxlZ2F0ZSBoYW5kbGVkIHRoZVxuICAgICAgLy8gZXhjZXB0aW9uLCBsZXQgdGhlIG91dGVyIGdlbmVyYXRvciBwcm9jZWVkIG5vcm1hbGx5LiBJZlxuICAgICAgLy8gY29udGV4dC5tZXRob2Qgd2FzIFwibmV4dFwiLCBmb3JnZXQgY29udGV4dC5hcmcgc2luY2UgaXQgaGFzIGJlZW5cbiAgICAgIC8vIFwiY29uc3VtZWRcIiBieSB0aGUgZGVsZWdhdGUgaXRlcmF0b3IuIElmIGNvbnRleHQubWV0aG9kIHdhc1xuICAgICAgLy8gXCJyZXR1cm5cIiwgYWxsb3cgdGhlIG9yaWdpbmFsIC5yZXR1cm4gY2FsbCB0byBjb250aW51ZSBpbiB0aGVcbiAgICAgIC8vIG91dGVyIGdlbmVyYXRvci5cbiAgICAgIGlmIChjb250ZXh0Lm1ldGhvZCAhPT0gXCJyZXR1cm5cIikge1xuICAgICAgICBjb250ZXh0Lm1ldGhvZCA9IFwibmV4dFwiO1xuICAgICAgICBjb250ZXh0LmFyZyA9IHVuZGVmaW5lZDtcbiAgICAgIH1cblxuICAgIH0gZWxzZSB7XG4gICAgICAvLyBSZS15aWVsZCB0aGUgcmVzdWx0IHJldHVybmVkIGJ5IHRoZSBkZWxlZ2F0ZSBtZXRob2QuXG4gICAgICByZXR1cm4gaW5mbztcbiAgICB9XG5cbiAgICAvLyBUaGUgZGVsZWdhdGUgaXRlcmF0b3IgaXMgZmluaXNoZWQsIHNvIGZvcmdldCBpdCBhbmQgY29udGludWUgd2l0aFxuICAgIC8vIHRoZSBvdXRlciBnZW5lcmF0b3IuXG4gICAgY29udGV4dC5kZWxlZ2F0ZSA9IG51bGw7XG4gICAgcmV0dXJuIENvbnRpbnVlU2VudGluZWw7XG4gIH1cblxuICAvLyBEZWZpbmUgR2VuZXJhdG9yLnByb3RvdHlwZS57bmV4dCx0aHJvdyxyZXR1cm59IGluIHRlcm1zIG9mIHRoZVxuICAvLyB1bmlmaWVkIC5faW52b2tlIGhlbHBlciBtZXRob2QuXG4gIGRlZmluZUl0ZXJhdG9yTWV0aG9kcyhHcCk7XG5cbiAgR3BbdG9TdHJpbmdUYWdTeW1ib2xdID0gXCJHZW5lcmF0b3JcIjtcblxuICAvLyBBIEdlbmVyYXRvciBzaG91bGQgYWx3YXlzIHJldHVybiBpdHNlbGYgYXMgdGhlIGl0ZXJhdG9yIG9iamVjdCB3aGVuIHRoZVxuICAvLyBAQGl0ZXJhdG9yIGZ1bmN0aW9uIGlzIGNhbGxlZCBvbiBpdC4gU29tZSBicm93c2VycycgaW1wbGVtZW50YXRpb25zIG9mIHRoZVxuICAvLyBpdGVyYXRvciBwcm90b3R5cGUgY2hhaW4gaW5jb3JyZWN0bHkgaW1wbGVtZW50IHRoaXMsIGNhdXNpbmcgdGhlIEdlbmVyYXRvclxuICAvLyBvYmplY3QgdG8gbm90IGJlIHJldHVybmVkIGZyb20gdGhpcyBjYWxsLiBUaGlzIGVuc3VyZXMgdGhhdCBkb2Vzbid0IGhhcHBlbi5cbiAgLy8gU2VlIGh0dHBzOi8vZ2l0aHViLmNvbS9mYWNlYm9vay9yZWdlbmVyYXRvci9pc3N1ZXMvMjc0IGZvciBtb3JlIGRldGFpbHMuXG4gIEdwW2l0ZXJhdG9yU3ltYm9sXSA9IGZ1bmN0aW9uKCkge1xuICAgIHJldHVybiB0aGlzO1xuICB9O1xuXG4gIEdwLnRvU3RyaW5nID0gZnVuY3Rpb24oKSB7XG4gICAgcmV0dXJuIFwiW29iamVjdCBHZW5lcmF0b3JdXCI7XG4gIH07XG5cbiAgZnVuY3Rpb24gcHVzaFRyeUVudHJ5KGxvY3MpIHtcbiAgICB2YXIgZW50cnkgPSB7IHRyeUxvYzogbG9jc1swXSB9O1xuXG4gICAgaWYgKDEgaW4gbG9jcykge1xuICAgICAgZW50cnkuY2F0Y2hMb2MgPSBsb2NzWzFdO1xuICAgIH1cblxuICAgIGlmICgyIGluIGxvY3MpIHtcbiAgICAgIGVudHJ5LmZpbmFsbHlMb2MgPSBsb2NzWzJdO1xuICAgICAgZW50cnkuYWZ0ZXJMb2MgPSBsb2NzWzNdO1xuICAgIH1cblxuICAgIHRoaXMudHJ5RW50cmllcy5wdXNoKGVudHJ5KTtcbiAgfVxuXG4gIGZ1bmN0aW9uIHJlc2V0VHJ5RW50cnkoZW50cnkpIHtcbiAgICB2YXIgcmVjb3JkID0gZW50cnkuY29tcGxldGlvbiB8fCB7fTtcbiAgICByZWNvcmQudHlwZSA9IFwibm9ybWFsXCI7XG4gICAgZGVsZXRlIHJlY29yZC5hcmc7XG4gICAgZW50cnkuY29tcGxldGlvbiA9IHJlY29yZDtcbiAgfVxuXG4gIGZ1bmN0aW9uIENvbnRleHQodHJ5TG9jc0xpc3QpIHtcbiAgICAvLyBUaGUgcm9vdCBlbnRyeSBvYmplY3QgKGVmZmVjdGl2ZWx5IGEgdHJ5IHN0YXRlbWVudCB3aXRob3V0IGEgY2F0Y2hcbiAgICAvLyBvciBhIGZpbmFsbHkgYmxvY2spIGdpdmVzIHVzIGEgcGxhY2UgdG8gc3RvcmUgdmFsdWVzIHRocm93biBmcm9tXG4gICAgLy8gbG9jYXRpb25zIHdoZXJlIHRoZXJlIGlzIG5vIGVuY2xvc2luZyB0cnkgc3RhdGVtZW50LlxuICAgIHRoaXMudHJ5RW50cmllcyA9IFt7IHRyeUxvYzogXCJyb290XCIgfV07XG4gICAgdHJ5TG9jc0xpc3QuZm9yRWFjaChwdXNoVHJ5RW50cnksIHRoaXMpO1xuICAgIHRoaXMucmVzZXQodHJ1ZSk7XG4gIH1cblxuICBleHBvcnRzLmtleXMgPSBmdW5jdGlvbihvYmplY3QpIHtcbiAgICB2YXIga2V5cyA9IFtdO1xuICAgIGZvciAodmFyIGtleSBpbiBvYmplY3QpIHtcbiAgICAgIGtleXMucHVzaChrZXkpO1xuICAgIH1cbiAgICBrZXlzLnJldmVyc2UoKTtcblxuICAgIC8vIFJhdGhlciB0aGFuIHJldHVybmluZyBhbiBvYmplY3Qgd2l0aCBhIG5leHQgbWV0aG9kLCB3ZSBrZWVwXG4gICAgLy8gdGhpbmdzIHNpbXBsZSBhbmQgcmV0dXJuIHRoZSBuZXh0IGZ1bmN0aW9uIGl0c2VsZi5cbiAgICByZXR1cm4gZnVuY3Rpb24gbmV4dCgpIHtcbiAgICAgIHdoaWxlIChrZXlzLmxlbmd0aCkge1xuICAgICAgICB2YXIga2V5ID0ga2V5cy5wb3AoKTtcbiAgICAgICAgaWYgKGtleSBpbiBvYmplY3QpIHtcbiAgICAgICAgICBuZXh0LnZhbHVlID0ga2V5O1xuICAgICAgICAgIG5leHQuZG9uZSA9IGZhbHNlO1xuICAgICAgICAgIHJldHVybiBuZXh0O1xuICAgICAgICB9XG4gICAgICB9XG5cbiAgICAgIC8vIFRvIGF2b2lkIGNyZWF0aW5nIGFuIGFkZGl0aW9uYWwgb2JqZWN0LCB3ZSBqdXN0IGhhbmcgdGhlIC52YWx1ZVxuICAgICAgLy8gYW5kIC5kb25lIHByb3BlcnRpZXMgb2ZmIHRoZSBuZXh0IGZ1bmN0aW9uIG9iamVjdCBpdHNlbGYuIFRoaXNcbiAgICAgIC8vIGFsc28gZW5zdXJlcyB0aGF0IHRoZSBtaW5pZmllciB3aWxsIG5vdCBhbm9ueW1pemUgdGhlIGZ1bmN0aW9uLlxuICAgICAgbmV4dC5kb25lID0gdHJ1ZTtcbiAgICAgIHJldHVybiBuZXh0O1xuICAgIH07XG4gIH07XG5cbiAgZnVuY3Rpb24gdmFsdWVzKGl0ZXJhYmxlKSB7XG4gICAgaWYgKGl0ZXJhYmxlKSB7XG4gICAgICB2YXIgaXRlcmF0b3JNZXRob2QgPSBpdGVyYWJsZVtpdGVyYXRvclN5bWJvbF07XG4gICAgICBpZiAoaXRlcmF0b3JNZXRob2QpIHtcbiAgICAgICAgcmV0dXJuIGl0ZXJhdG9yTWV0aG9kLmNhbGwoaXRlcmFibGUpO1xuICAgICAgfVxuXG4gICAgICBpZiAodHlwZW9mIGl0ZXJhYmxlLm5leHQgPT09IFwiZnVuY3Rpb25cIikge1xuICAgICAgICByZXR1cm4gaXRlcmFibGU7XG4gICAgICB9XG5cbiAgICAgIGlmICghaXNOYU4oaXRlcmFibGUubGVuZ3RoKSkge1xuICAgICAgICB2YXIgaSA9IC0xLCBuZXh0ID0gZnVuY3Rpb24gbmV4dCgpIHtcbiAgICAgICAgICB3aGlsZSAoKytpIDwgaXRlcmFibGUubGVuZ3RoKSB7XG4gICAgICAgICAgICBpZiAoaGFzT3duLmNhbGwoaXRlcmFibGUsIGkpKSB7XG4gICAgICAgICAgICAgIG5leHQudmFsdWUgPSBpdGVyYWJsZVtpXTtcbiAgICAgICAgICAgICAgbmV4dC5kb25lID0gZmFsc2U7XG4gICAgICAgICAgICAgIHJldHVybiBuZXh0O1xuICAgICAgICAgICAgfVxuICAgICAgICAgIH1cblxuICAgICAgICAgIG5leHQudmFsdWUgPSB1bmRlZmluZWQ7XG4gICAgICAgICAgbmV4dC5kb25lID0gdHJ1ZTtcblxuICAgICAgICAgIHJldHVybiBuZXh0O1xuICAgICAgICB9O1xuXG4gICAgICAgIHJldHVybiBuZXh0Lm5leHQgPSBuZXh0O1xuICAgICAgfVxuICAgIH1cblxuICAgIC8vIFJldHVybiBhbiBpdGVyYXRvciB3aXRoIG5vIHZhbHVlcy5cbiAgICByZXR1cm4geyBuZXh0OiBkb25lUmVzdWx0IH07XG4gIH1cbiAgZXhwb3J0cy52YWx1ZXMgPSB2YWx1ZXM7XG5cbiAgZnVuY3Rpb24gZG9uZVJlc3VsdCgpIHtcbiAgICByZXR1cm4geyB2YWx1ZTogdW5kZWZpbmVkLCBkb25lOiB0cnVlIH07XG4gIH1cblxuICBDb250ZXh0LnByb3RvdHlwZSA9IHtcbiAgICBjb25zdHJ1Y3RvcjogQ29udGV4dCxcblxuICAgIHJlc2V0OiBmdW5jdGlvbihza2lwVGVtcFJlc2V0KSB7XG4gICAgICB0aGlzLnByZXYgPSAwO1xuICAgICAgdGhpcy5uZXh0ID0gMDtcbiAgICAgIC8vIFJlc2V0dGluZyBjb250ZXh0Ll9zZW50IGZvciBsZWdhY3kgc3VwcG9ydCBvZiBCYWJlbCdzXG4gICAgICAvLyBmdW5jdGlvbi5zZW50IGltcGxlbWVudGF0aW9uLlxuICAgICAgdGhpcy5zZW50ID0gdGhpcy5fc2VudCA9IHVuZGVmaW5lZDtcbiAgICAgIHRoaXMuZG9uZSA9IGZhbHNlO1xuICAgICAgdGhpcy5kZWxlZ2F0ZSA9IG51bGw7XG5cbiAgICAgIHRoaXMubWV0aG9kID0gXCJuZXh0XCI7XG4gICAgICB0aGlzLmFyZyA9IHVuZGVmaW5lZDtcblxuICAgICAgdGhpcy50cnlFbnRyaWVzLmZvckVhY2gocmVzZXRUcnlFbnRyeSk7XG5cbiAgICAgIGlmICghc2tpcFRlbXBSZXNldCkge1xuICAgICAgICBmb3IgKHZhciBuYW1lIGluIHRoaXMpIHtcbiAgICAgICAgICAvLyBOb3Qgc3VyZSBhYm91dCB0aGUgb3B0aW1hbCBvcmRlciBvZiB0aGVzZSBjb25kaXRpb25zOlxuICAgICAgICAgIGlmIChuYW1lLmNoYXJBdCgwKSA9PT0gXCJ0XCIgJiZcbiAgICAgICAgICAgICAgaGFzT3duLmNhbGwodGhpcywgbmFtZSkgJiZcbiAgICAgICAgICAgICAgIWlzTmFOKCtuYW1lLnNsaWNlKDEpKSkge1xuICAgICAgICAgICAgdGhpc1tuYW1lXSA9IHVuZGVmaW5lZDtcbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9LFxuXG4gICAgc3RvcDogZnVuY3Rpb24oKSB7XG4gICAgICB0aGlzLmRvbmUgPSB0cnVlO1xuXG4gICAgICB2YXIgcm9vdEVudHJ5ID0gdGhpcy50cnlFbnRyaWVzWzBdO1xuICAgICAgdmFyIHJvb3RSZWNvcmQgPSByb290RW50cnkuY29tcGxldGlvbjtcbiAgICAgIGlmIChyb290UmVjb3JkLnR5cGUgPT09IFwidGhyb3dcIikge1xuICAgICAgICB0aHJvdyByb290UmVjb3JkLmFyZztcbiAgICAgIH1cblxuICAgICAgcmV0dXJuIHRoaXMucnZhbDtcbiAgICB9LFxuXG4gICAgZGlzcGF0Y2hFeGNlcHRpb246IGZ1bmN0aW9uKGV4Y2VwdGlvbikge1xuICAgICAgaWYgKHRoaXMuZG9uZSkge1xuICAgICAgICB0aHJvdyBleGNlcHRpb247XG4gICAgICB9XG5cbiAgICAgIHZhciBjb250ZXh0ID0gdGhpcztcbiAgICAgIGZ1bmN0aW9uIGhhbmRsZShsb2MsIGNhdWdodCkge1xuICAgICAgICByZWNvcmQudHlwZSA9IFwidGhyb3dcIjtcbiAgICAgICAgcmVjb3JkLmFyZyA9IGV4Y2VwdGlvbjtcbiAgICAgICAgY29udGV4dC5uZXh0ID0gbG9jO1xuXG4gICAgICAgIGlmIChjYXVnaHQpIHtcbiAgICAgICAgICAvLyBJZiB0aGUgZGlzcGF0Y2hlZCBleGNlcHRpb24gd2FzIGNhdWdodCBieSBhIGNhdGNoIGJsb2NrLFxuICAgICAgICAgIC8vIHRoZW4gbGV0IHRoYXQgY2F0Y2ggYmxvY2sgaGFuZGxlIHRoZSBleGNlcHRpb24gbm9ybWFsbHkuXG4gICAgICAgICAgY29udGV4dC5tZXRob2QgPSBcIm5leHRcIjtcbiAgICAgICAgICBjb250ZXh0LmFyZyA9IHVuZGVmaW5lZDtcbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiAhISBjYXVnaHQ7XG4gICAgICB9XG5cbiAgICAgIGZvciAodmFyIGkgPSB0aGlzLnRyeUVudHJpZXMubGVuZ3RoIC0gMTsgaSA+PSAwOyAtLWkpIHtcbiAgICAgICAgdmFyIGVudHJ5ID0gdGhpcy50cnlFbnRyaWVzW2ldO1xuICAgICAgICB2YXIgcmVjb3JkID0gZW50cnkuY29tcGxldGlvbjtcblxuICAgICAgICBpZiAoZW50cnkudHJ5TG9jID09PSBcInJvb3RcIikge1xuICAgICAgICAgIC8vIEV4Y2VwdGlvbiB0aHJvd24gb3V0c2lkZSBvZiBhbnkgdHJ5IGJsb2NrIHRoYXQgY291bGQgaGFuZGxlXG4gICAgICAgICAgLy8gaXQsIHNvIHNldCB0aGUgY29tcGxldGlvbiB2YWx1ZSBvZiB0aGUgZW50aXJlIGZ1bmN0aW9uIHRvXG4gICAgICAgICAgLy8gdGhyb3cgdGhlIGV4Y2VwdGlvbi5cbiAgICAgICAgICByZXR1cm4gaGFuZGxlKFwiZW5kXCIpO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKGVudHJ5LnRyeUxvYyA8PSB0aGlzLnByZXYpIHtcbiAgICAgICAgICB2YXIgaGFzQ2F0Y2ggPSBoYXNPd24uY2FsbChlbnRyeSwgXCJjYXRjaExvY1wiKTtcbiAgICAgICAgICB2YXIgaGFzRmluYWxseSA9IGhhc093bi5jYWxsKGVudHJ5LCBcImZpbmFsbHlMb2NcIik7XG5cbiAgICAgICAgICBpZiAoaGFzQ2F0Y2ggJiYgaGFzRmluYWxseSkge1xuICAgICAgICAgICAgaWYgKHRoaXMucHJldiA8IGVudHJ5LmNhdGNoTG9jKSB7XG4gICAgICAgICAgICAgIHJldHVybiBoYW5kbGUoZW50cnkuY2F0Y2hMb2MsIHRydWUpO1xuICAgICAgICAgICAgfSBlbHNlIGlmICh0aGlzLnByZXYgPCBlbnRyeS5maW5hbGx5TG9jKSB7XG4gICAgICAgICAgICAgIHJldHVybiBoYW5kbGUoZW50cnkuZmluYWxseUxvYyk7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICB9IGVsc2UgaWYgKGhhc0NhdGNoKSB7XG4gICAgICAgICAgICBpZiAodGhpcy5wcmV2IDwgZW50cnkuY2F0Y2hMb2MpIHtcbiAgICAgICAgICAgICAgcmV0dXJuIGhhbmRsZShlbnRyeS5jYXRjaExvYywgdHJ1ZSk7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICB9IGVsc2UgaWYgKGhhc0ZpbmFsbHkpIHtcbiAgICAgICAgICAgIGlmICh0aGlzLnByZXYgPCBlbnRyeS5maW5hbGx5TG9jKSB7XG4gICAgICAgICAgICAgIHJldHVybiBoYW5kbGUoZW50cnkuZmluYWxseUxvYyk7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKFwidHJ5IHN0YXRlbWVudCB3aXRob3V0IGNhdGNoIG9yIGZpbmFsbHlcIik7XG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICB9XG4gICAgfSxcblxuICAgIGFicnVwdDogZnVuY3Rpb24odHlwZSwgYXJnKSB7XG4gICAgICBmb3IgKHZhciBpID0gdGhpcy50cnlFbnRyaWVzLmxlbmd0aCAtIDE7IGkgPj0gMDsgLS1pKSB7XG4gICAgICAgIHZhciBlbnRyeSA9IHRoaXMudHJ5RW50cmllc1tpXTtcbiAgICAgICAgaWYgKGVudHJ5LnRyeUxvYyA8PSB0aGlzLnByZXYgJiZcbiAgICAgICAgICAgIGhhc093bi5jYWxsKGVudHJ5LCBcImZpbmFsbHlMb2NcIikgJiZcbiAgICAgICAgICAgIHRoaXMucHJldiA8IGVudHJ5LmZpbmFsbHlMb2MpIHtcbiAgICAgICAgICB2YXIgZmluYWxseUVudHJ5ID0gZW50cnk7XG4gICAgICAgICAgYnJlYWs7XG4gICAgICAgIH1cbiAgICAgIH1cblxuICAgICAgaWYgKGZpbmFsbHlFbnRyeSAmJlxuICAgICAgICAgICh0eXBlID09PSBcImJyZWFrXCIgfHxcbiAgICAgICAgICAgdHlwZSA9PT0gXCJjb250aW51ZVwiKSAmJlxuICAgICAgICAgIGZpbmFsbHlFbnRyeS50cnlMb2MgPD0gYXJnICYmXG4gICAgICAgICAgYXJnIDw9IGZpbmFsbHlFbnRyeS5maW5hbGx5TG9jKSB7XG4gICAgICAgIC8vIElnbm9yZSB0aGUgZmluYWxseSBlbnRyeSBpZiBjb250cm9sIGlzIG5vdCBqdW1waW5nIHRvIGFcbiAgICAgICAgLy8gbG9jYXRpb24gb3V0c2lkZSB0aGUgdHJ5L2NhdGNoIGJsb2NrLlxuICAgICAgICBmaW5hbGx5RW50cnkgPSBudWxsO1xuICAgICAgfVxuXG4gICAgICB2YXIgcmVjb3JkID0gZmluYWxseUVudHJ5ID8gZmluYWxseUVudHJ5LmNvbXBsZXRpb24gOiB7fTtcbiAgICAgIHJlY29yZC50eXBlID0gdHlwZTtcbiAgICAgIHJlY29yZC5hcmcgPSBhcmc7XG5cbiAgICAgIGlmIChmaW5hbGx5RW50cnkpIHtcbiAgICAgICAgdGhpcy5tZXRob2QgPSBcIm5leHRcIjtcbiAgICAgICAgdGhpcy5uZXh0ID0gZmluYWxseUVudHJ5LmZpbmFsbHlMb2M7XG4gICAgICAgIHJldHVybiBDb250aW51ZVNlbnRpbmVsO1xuICAgICAgfVxuXG4gICAgICByZXR1cm4gdGhpcy5jb21wbGV0ZShyZWNvcmQpO1xuICAgIH0sXG5cbiAgICBjb21wbGV0ZTogZnVuY3Rpb24ocmVjb3JkLCBhZnRlckxvYykge1xuICAgICAgaWYgKHJlY29yZC50eXBlID09PSBcInRocm93XCIpIHtcbiAgICAgICAgdGhyb3cgcmVjb3JkLmFyZztcbiAgICAgIH1cblxuICAgICAgaWYgKHJlY29yZC50eXBlID09PSBcImJyZWFrXCIgfHxcbiAgICAgICAgICByZWNvcmQudHlwZSA9PT0gXCJjb250aW51ZVwiKSB7XG4gICAgICAgIHRoaXMubmV4dCA9IHJlY29yZC5hcmc7XG4gICAgICB9IGVsc2UgaWYgKHJlY29yZC50eXBlID09PSBcInJldHVyblwiKSB7XG4gICAgICAgIHRoaXMucnZhbCA9IHRoaXMuYXJnID0gcmVjb3JkLmFyZztcbiAgICAgICAgdGhpcy5tZXRob2QgPSBcInJldHVyblwiO1xuICAgICAgICB0aGlzLm5leHQgPSBcImVuZFwiO1xuICAgICAgfSBlbHNlIGlmIChyZWNvcmQudHlwZSA9PT0gXCJub3JtYWxcIiAmJiBhZnRlckxvYykge1xuICAgICAgICB0aGlzLm5leHQgPSBhZnRlckxvYztcbiAgICAgIH1cblxuICAgICAgcmV0dXJuIENvbnRpbnVlU2VudGluZWw7XG4gICAgfSxcblxuICAgIGZpbmlzaDogZnVuY3Rpb24oZmluYWxseUxvYykge1xuICAgICAgZm9yICh2YXIgaSA9IHRoaXMudHJ5RW50cmllcy5sZW5ndGggLSAxOyBpID49IDA7IC0taSkge1xuICAgICAgICB2YXIgZW50cnkgPSB0aGlzLnRyeUVudHJpZXNbaV07XG4gICAgICAgIGlmIChlbnRyeS5maW5hbGx5TG9jID09PSBmaW5hbGx5TG9jKSB7XG4gICAgICAgICAgdGhpcy5jb21wbGV0ZShlbnRyeS5jb21wbGV0aW9uLCBlbnRyeS5hZnRlckxvYyk7XG4gICAgICAgICAgcmVzZXRUcnlFbnRyeShlbnRyeSk7XG4gICAgICAgICAgcmV0dXJuIENvbnRpbnVlU2VudGluZWw7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9LFxuXG4gICAgXCJjYXRjaFwiOiBmdW5jdGlvbih0cnlMb2MpIHtcbiAgICAgIGZvciAodmFyIGkgPSB0aGlzLnRyeUVudHJpZXMubGVuZ3RoIC0gMTsgaSA+PSAwOyAtLWkpIHtcbiAgICAgICAgdmFyIGVudHJ5ID0gdGhpcy50cnlFbnRyaWVzW2ldO1xuICAgICAgICBpZiAoZW50cnkudHJ5TG9jID09PSB0cnlMb2MpIHtcbiAgICAgICAgICB2YXIgcmVjb3JkID0gZW50cnkuY29tcGxldGlvbjtcbiAgICAgICAgICBpZiAocmVjb3JkLnR5cGUgPT09IFwidGhyb3dcIikge1xuICAgICAgICAgICAgdmFyIHRocm93biA9IHJlY29yZC5hcmc7XG4gICAgICAgICAgICByZXNldFRyeUVudHJ5KGVudHJ5KTtcbiAgICAgICAgICB9XG4gICAgICAgICAgcmV0dXJuIHRocm93bjtcbiAgICAgICAgfVxuICAgICAgfVxuXG4gICAgICAvLyBUaGUgY29udGV4dC5jYXRjaCBtZXRob2QgbXVzdCBvbmx5IGJlIGNhbGxlZCB3aXRoIGEgbG9jYXRpb25cbiAgICAgIC8vIGFyZ3VtZW50IHRoYXQgY29ycmVzcG9uZHMgdG8gYSBrbm93biBjYXRjaCBibG9jay5cbiAgICAgIHRocm93IG5ldyBFcnJvcihcImlsbGVnYWwgY2F0Y2ggYXR0ZW1wdFwiKTtcbiAgICB9LFxuXG4gICAgZGVsZWdhdGVZaWVsZDogZnVuY3Rpb24oaXRlcmFibGUsIHJlc3VsdE5hbWUsIG5leHRMb2MpIHtcbiAgICAgIHRoaXMuZGVsZWdhdGUgPSB7XG4gICAgICAgIGl0ZXJhdG9yOiB2YWx1ZXMoaXRlcmFibGUpLFxuICAgICAgICByZXN1bHROYW1lOiByZXN1bHROYW1lLFxuICAgICAgICBuZXh0TG9jOiBuZXh0TG9jXG4gICAgICB9O1xuXG4gICAgICBpZiAodGhpcy5tZXRob2QgPT09IFwibmV4dFwiKSB7XG4gICAgICAgIC8vIERlbGliZXJhdGVseSBmb3JnZXQgdGhlIGxhc3Qgc2VudCB2YWx1ZSBzbyB0aGF0IHdlIGRvbid0XG4gICAgICAgIC8vIGFjY2lkZW50YWxseSBwYXNzIGl0IG9uIHRvIHRoZSBkZWxlZ2F0ZS5cbiAgICAgICAgdGhpcy5hcmcgPSB1bmRlZmluZWQ7XG4gICAgICB9XG5cbiAgICAgIHJldHVybiBDb250aW51ZVNlbnRpbmVsO1xuICAgIH1cbiAgfTtcblxuICAvLyBSZWdhcmRsZXNzIG9mIHdoZXRoZXIgdGhpcyBzY3JpcHQgaXMgZXhlY3V0aW5nIGFzIGEgQ29tbW9uSlMgbW9kdWxlXG4gIC8vIG9yIG5vdCwgcmV0dXJuIHRoZSBydW50aW1lIG9iamVjdCBzbyB0aGF0IHdlIGNhbiBkZWNsYXJlIHRoZSB2YXJpYWJsZVxuICAvLyByZWdlbmVyYXRvclJ1bnRpbWUgaW4gdGhlIG91dGVyIHNjb3BlLCB3aGljaCBhbGxvd3MgdGhpcyBtb2R1bGUgdG8gYmVcbiAgLy8gaW5qZWN0ZWQgZWFzaWx5IGJ5IGBiaW4vcmVnZW5lcmF0b3IgLS1pbmNsdWRlLXJ1bnRpbWUgc2NyaXB0LmpzYC5cbiAgcmV0dXJuIGV4cG9ydHM7XG5cbn0oXG4gIC8vIElmIHRoaXMgc2NyaXB0IGlzIGV4ZWN1dGluZyBhcyBhIENvbW1vbkpTIG1vZHVsZSwgdXNlIG1vZHVsZS5leHBvcnRzXG4gIC8vIGFzIHRoZSByZWdlbmVyYXRvclJ1bnRpbWUgbmFtZXNwYWNlLiBPdGhlcndpc2UgY3JlYXRlIGEgbmV3IGVtcHR5XG4gIC8vIG9iamVjdC4gRWl0aGVyIHdheSwgdGhlIHJlc3VsdGluZyBvYmplY3Qgd2lsbCBiZSB1c2VkIHRvIGluaXRpYWxpemVcbiAgLy8gdGhlIHJlZ2VuZXJhdG9yUnVudGltZSB2YXJpYWJsZSBhdCB0aGUgdG9wIG9mIHRoaXMgZmlsZS5cbiAgdHlwZW9mIG1vZHVsZSA9PT0gXCJvYmplY3RcIiA/IG1vZHVsZS5leHBvcnRzIDoge31cbikpO1xuXG50cnkge1xuICByZWdlbmVyYXRvclJ1bnRpbWUgPSBydW50aW1lO1xufSBjYXRjaCAoYWNjaWRlbnRhbFN0cmljdE1vZGUpIHtcbiAgLy8gVGhpcyBtb2R1bGUgc2hvdWxkIG5vdCBiZSBydW5uaW5nIGluIHN0cmljdCBtb2RlLCBzbyB0aGUgYWJvdmVcbiAgLy8gYXNzaWdubWVudCBzaG91bGQgYWx3YXlzIHdvcmsgdW5sZXNzIHNvbWV0aGluZyBpcyBtaXNjb25maWd1cmVkLiBKdXN0XG4gIC8vIGluIGNhc2UgcnVudGltZS5qcyBhY2NpZGVudGFsbHkgcnVucyBpbiBzdHJpY3QgbW9kZSwgd2UgY2FuIGVzY2FwZVxuICAvLyBzdHJpY3QgbW9kZSB1c2luZyBhIGdsb2JhbCBGdW5jdGlvbiBjYWxsLiBUaGlzIGNvdWxkIGNvbmNlaXZhYmx5IGZhaWxcbiAgLy8gaWYgYSBDb250ZW50IFNlY3VyaXR5IFBvbGljeSBmb3JiaWRzIHVzaW5nIEZ1bmN0aW9uLCBidXQgaW4gdGhhdCBjYXNlXG4gIC8vIHRoZSBwcm9wZXIgc29sdXRpb24gaXMgdG8gZml4IHRoZSBhY2NpZGVudGFsIHN0cmljdCBtb2RlIHByb2JsZW0uIElmXG4gIC8vIHlvdSd2ZSBtaXNjb25maWd1cmVkIHlvdXIgYnVuZGxlciB0byBmb3JjZSBzdHJpY3QgbW9kZSBhbmQgYXBwbGllZCBhXG4gIC8vIENTUCB0byBmb3JiaWQgRnVuY3Rpb24sIGFuZCB5b3UncmUgbm90IHdpbGxpbmcgdG8gZml4IGVpdGhlciBvZiB0aG9zZVxuICAvLyBwcm9ibGVtcywgcGxlYXNlIGRldGFpbCB5b3VyIHVuaXF1ZSBwcmVkaWNhbWVudCBpbiBhIEdpdEh1YiBpc3N1ZS5cbiAgRnVuY3Rpb24oXCJyXCIsIFwicmVnZW5lcmF0b3JSdW50aW1lID0gclwiKShydW50aW1lKTtcbn1cbiIsInZhciBnO1xuXG4vLyBUaGlzIHdvcmtzIGluIG5vbi1zdHJpY3QgbW9kZVxuZyA9IChmdW5jdGlvbigpIHtcblx0cmV0dXJuIHRoaXM7XG59KSgpO1xuXG50cnkge1xuXHQvLyBUaGlzIHdvcmtzIGlmIGV2YWwgaXMgYWxsb3dlZCAoc2VlIENTUClcblx0ZyA9IGcgfHwgbmV3IEZ1bmN0aW9uKFwicmV0dXJuIHRoaXNcIikoKTtcbn0gY2F0Y2ggKGUpIHtcblx0Ly8gVGhpcyB3b3JrcyBpZiB0aGUgd2luZG93IHJlZmVyZW5jZSBpcyBhdmFpbGFibGVcblx0aWYgKHR5cGVvZiB3aW5kb3cgPT09IFwib2JqZWN0XCIpIGcgPSB3aW5kb3c7XG59XG5cbi8vIGcgY2FuIHN0aWxsIGJlIHVuZGVmaW5lZCwgYnV0IG5vdGhpbmcgdG8gZG8gYWJvdXQgaXQuLi5cbi8vIFdlIHJldHVybiB1bmRlZmluZWQsIGluc3RlYWQgb2Ygbm90aGluZyBoZXJlLCBzbyBpdCdzXG4vLyBlYXNpZXIgdG8gaGFuZGxlIHRoaXMgY2FzZS4gaWYoIWdsb2JhbCkgeyAuLi59XG5cbm1vZHVsZS5leHBvcnRzID0gZztcbiIsInZhciBzdXBwb3J0ID0ge1xuICBzZWFyY2hQYXJhbXM6ICdVUkxTZWFyY2hQYXJhbXMnIGluIHNlbGYsXG4gIGl0ZXJhYmxlOiAnU3ltYm9sJyBpbiBzZWxmICYmICdpdGVyYXRvcicgaW4gU3ltYm9sLFxuICBibG9iOlxuICAgICdGaWxlUmVhZGVyJyBpbiBzZWxmICYmXG4gICAgJ0Jsb2InIGluIHNlbGYgJiZcbiAgICAoZnVuY3Rpb24oKSB7XG4gICAgICB0cnkge1xuICAgICAgICBuZXcgQmxvYigpXG4gICAgICAgIHJldHVybiB0cnVlXG4gICAgICB9IGNhdGNoIChlKSB7XG4gICAgICAgIHJldHVybiBmYWxzZVxuICAgICAgfVxuICAgIH0pKCksXG4gIGZvcm1EYXRhOiAnRm9ybURhdGEnIGluIHNlbGYsXG4gIGFycmF5QnVmZmVyOiAnQXJyYXlCdWZmZXInIGluIHNlbGZcbn1cblxuZnVuY3Rpb24gaXNEYXRhVmlldyhvYmopIHtcbiAgcmV0dXJuIG9iaiAmJiBEYXRhVmlldy5wcm90b3R5cGUuaXNQcm90b3R5cGVPZihvYmopXG59XG5cbmlmIChzdXBwb3J0LmFycmF5QnVmZmVyKSB7XG4gIHZhciB2aWV3Q2xhc3NlcyA9IFtcbiAgICAnW29iamVjdCBJbnQ4QXJyYXldJyxcbiAgICAnW29iamVjdCBVaW50OEFycmF5XScsXG4gICAgJ1tvYmplY3QgVWludDhDbGFtcGVkQXJyYXldJyxcbiAgICAnW29iamVjdCBJbnQxNkFycmF5XScsXG4gICAgJ1tvYmplY3QgVWludDE2QXJyYXldJyxcbiAgICAnW29iamVjdCBJbnQzMkFycmF5XScsXG4gICAgJ1tvYmplY3QgVWludDMyQXJyYXldJyxcbiAgICAnW29iamVjdCBGbG9hdDMyQXJyYXldJyxcbiAgICAnW29iamVjdCBGbG9hdDY0QXJyYXldJ1xuICBdXG5cbiAgdmFyIGlzQXJyYXlCdWZmZXJWaWV3ID1cbiAgICBBcnJheUJ1ZmZlci5pc1ZpZXcgfHxcbiAgICBmdW5jdGlvbihvYmopIHtcbiAgICAgIHJldHVybiBvYmogJiYgdmlld0NsYXNzZXMuaW5kZXhPZihPYmplY3QucHJvdG90eXBlLnRvU3RyaW5nLmNhbGwob2JqKSkgPiAtMVxuICAgIH1cbn1cblxuZnVuY3Rpb24gbm9ybWFsaXplTmFtZShuYW1lKSB7XG4gIGlmICh0eXBlb2YgbmFtZSAhPT0gJ3N0cmluZycpIHtcbiAgICBuYW1lID0gU3RyaW5nKG5hbWUpXG4gIH1cbiAgaWYgKC9bXmEtejAtOVxcLSMkJSYnKisuXl9gfH5dL2kudGVzdChuYW1lKSkge1xuICAgIHRocm93IG5ldyBUeXBlRXJyb3IoJ0ludmFsaWQgY2hhcmFjdGVyIGluIGhlYWRlciBmaWVsZCBuYW1lJylcbiAgfVxuICByZXR1cm4gbmFtZS50b0xvd2VyQ2FzZSgpXG59XG5cbmZ1bmN0aW9uIG5vcm1hbGl6ZVZhbHVlKHZhbHVlKSB7XG4gIGlmICh0eXBlb2YgdmFsdWUgIT09ICdzdHJpbmcnKSB7XG4gICAgdmFsdWUgPSBTdHJpbmcodmFsdWUpXG4gIH1cbiAgcmV0dXJuIHZhbHVlXG59XG5cbi8vIEJ1aWxkIGEgZGVzdHJ1Y3RpdmUgaXRlcmF0b3IgZm9yIHRoZSB2YWx1ZSBsaXN0XG5mdW5jdGlvbiBpdGVyYXRvckZvcihpdGVtcykge1xuICB2YXIgaXRlcmF0b3IgPSB7XG4gICAgbmV4dDogZnVuY3Rpb24oKSB7XG4gICAgICB2YXIgdmFsdWUgPSBpdGVtcy5zaGlmdCgpXG4gICAgICByZXR1cm4ge2RvbmU6IHZhbHVlID09PSB1bmRlZmluZWQsIHZhbHVlOiB2YWx1ZX1cbiAgICB9XG4gIH1cblxuICBpZiAoc3VwcG9ydC5pdGVyYWJsZSkge1xuICAgIGl0ZXJhdG9yW1N5bWJvbC5pdGVyYXRvcl0gPSBmdW5jdGlvbigpIHtcbiAgICAgIHJldHVybiBpdGVyYXRvclxuICAgIH1cbiAgfVxuXG4gIHJldHVybiBpdGVyYXRvclxufVxuXG5leHBvcnQgZnVuY3Rpb24gSGVhZGVycyhoZWFkZXJzKSB7XG4gIHRoaXMubWFwID0ge31cblxuICBpZiAoaGVhZGVycyBpbnN0YW5jZW9mIEhlYWRlcnMpIHtcbiAgICBoZWFkZXJzLmZvckVhY2goZnVuY3Rpb24odmFsdWUsIG5hbWUpIHtcbiAgICAgIHRoaXMuYXBwZW5kKG5hbWUsIHZhbHVlKVxuICAgIH0sIHRoaXMpXG4gIH0gZWxzZSBpZiAoQXJyYXkuaXNBcnJheShoZWFkZXJzKSkge1xuICAgIGhlYWRlcnMuZm9yRWFjaChmdW5jdGlvbihoZWFkZXIpIHtcbiAgICAgIHRoaXMuYXBwZW5kKGhlYWRlclswXSwgaGVhZGVyWzFdKVxuICAgIH0sIHRoaXMpXG4gIH0gZWxzZSBpZiAoaGVhZGVycykge1xuICAgIE9iamVjdC5nZXRPd25Qcm9wZXJ0eU5hbWVzKGhlYWRlcnMpLmZvckVhY2goZnVuY3Rpb24obmFtZSkge1xuICAgICAgdGhpcy5hcHBlbmQobmFtZSwgaGVhZGVyc1tuYW1lXSlcbiAgICB9LCB0aGlzKVxuICB9XG59XG5cbkhlYWRlcnMucHJvdG90eXBlLmFwcGVuZCA9IGZ1bmN0aW9uKG5hbWUsIHZhbHVlKSB7XG4gIG5hbWUgPSBub3JtYWxpemVOYW1lKG5hbWUpXG4gIHZhbHVlID0gbm9ybWFsaXplVmFsdWUodmFsdWUpXG4gIHZhciBvbGRWYWx1ZSA9IHRoaXMubWFwW25hbWVdXG4gIHRoaXMubWFwW25hbWVdID0gb2xkVmFsdWUgPyBvbGRWYWx1ZSArICcsICcgKyB2YWx1ZSA6IHZhbHVlXG59XG5cbkhlYWRlcnMucHJvdG90eXBlWydkZWxldGUnXSA9IGZ1bmN0aW9uKG5hbWUpIHtcbiAgZGVsZXRlIHRoaXMubWFwW25vcm1hbGl6ZU5hbWUobmFtZSldXG59XG5cbkhlYWRlcnMucHJvdG90eXBlLmdldCA9IGZ1bmN0aW9uKG5hbWUpIHtcbiAgbmFtZSA9IG5vcm1hbGl6ZU5hbWUobmFtZSlcbiAgcmV0dXJuIHRoaXMuaGFzKG5hbWUpID8gdGhpcy5tYXBbbmFtZV0gOiBudWxsXG59XG5cbkhlYWRlcnMucHJvdG90eXBlLmhhcyA9IGZ1bmN0aW9uKG5hbWUpIHtcbiAgcmV0dXJuIHRoaXMubWFwLmhhc093blByb3BlcnR5KG5vcm1hbGl6ZU5hbWUobmFtZSkpXG59XG5cbkhlYWRlcnMucHJvdG90eXBlLnNldCA9IGZ1bmN0aW9uKG5hbWUsIHZhbHVlKSB7XG4gIHRoaXMubWFwW25vcm1hbGl6ZU5hbWUobmFtZSldID0gbm9ybWFsaXplVmFsdWUodmFsdWUpXG59XG5cbkhlYWRlcnMucHJvdG90eXBlLmZvckVhY2ggPSBmdW5jdGlvbihjYWxsYmFjaywgdGhpc0FyZykge1xuICBmb3IgKHZhciBuYW1lIGluIHRoaXMubWFwKSB7XG4gICAgaWYgKHRoaXMubWFwLmhhc093blByb3BlcnR5KG5hbWUpKSB7XG4gICAgICBjYWxsYmFjay5jYWxsKHRoaXNBcmcsIHRoaXMubWFwW25hbWVdLCBuYW1lLCB0aGlzKVxuICAgIH1cbiAgfVxufVxuXG5IZWFkZXJzLnByb3RvdHlwZS5rZXlzID0gZnVuY3Rpb24oKSB7XG4gIHZhciBpdGVtcyA9IFtdXG4gIHRoaXMuZm9yRWFjaChmdW5jdGlvbih2YWx1ZSwgbmFtZSkge1xuICAgIGl0ZW1zLnB1c2gobmFtZSlcbiAgfSlcbiAgcmV0dXJuIGl0ZXJhdG9yRm9yKGl0ZW1zKVxufVxuXG5IZWFkZXJzLnByb3RvdHlwZS52YWx1ZXMgPSBmdW5jdGlvbigpIHtcbiAgdmFyIGl0ZW1zID0gW11cbiAgdGhpcy5mb3JFYWNoKGZ1bmN0aW9uKHZhbHVlKSB7XG4gICAgaXRlbXMucHVzaCh2YWx1ZSlcbiAgfSlcbiAgcmV0dXJuIGl0ZXJhdG9yRm9yKGl0ZW1zKVxufVxuXG5IZWFkZXJzLnByb3RvdHlwZS5lbnRyaWVzID0gZnVuY3Rpb24oKSB7XG4gIHZhciBpdGVtcyA9IFtdXG4gIHRoaXMuZm9yRWFjaChmdW5jdGlvbih2YWx1ZSwgbmFtZSkge1xuICAgIGl0ZW1zLnB1c2goW25hbWUsIHZhbHVlXSlcbiAgfSlcbiAgcmV0dXJuIGl0ZXJhdG9yRm9yKGl0ZW1zKVxufVxuXG5pZiAoc3VwcG9ydC5pdGVyYWJsZSkge1xuICBIZWFkZXJzLnByb3RvdHlwZVtTeW1ib2wuaXRlcmF0b3JdID0gSGVhZGVycy5wcm90b3R5cGUuZW50cmllc1xufVxuXG5mdW5jdGlvbiBjb25zdW1lZChib2R5KSB7XG4gIGlmIChib2R5LmJvZHlVc2VkKSB7XG4gICAgcmV0dXJuIFByb21pc2UucmVqZWN0KG5ldyBUeXBlRXJyb3IoJ0FscmVhZHkgcmVhZCcpKVxuICB9XG4gIGJvZHkuYm9keVVzZWQgPSB0cnVlXG59XG5cbmZ1bmN0aW9uIGZpbGVSZWFkZXJSZWFkeShyZWFkZXIpIHtcbiAgcmV0dXJuIG5ldyBQcm9taXNlKGZ1bmN0aW9uKHJlc29sdmUsIHJlamVjdCkge1xuICAgIHJlYWRlci5vbmxvYWQgPSBmdW5jdGlvbigpIHtcbiAgICAgIHJlc29sdmUocmVhZGVyLnJlc3VsdClcbiAgICB9XG4gICAgcmVhZGVyLm9uZXJyb3IgPSBmdW5jdGlvbigpIHtcbiAgICAgIHJlamVjdChyZWFkZXIuZXJyb3IpXG4gICAgfVxuICB9KVxufVxuXG5mdW5jdGlvbiByZWFkQmxvYkFzQXJyYXlCdWZmZXIoYmxvYikge1xuICB2YXIgcmVhZGVyID0gbmV3IEZpbGVSZWFkZXIoKVxuICB2YXIgcHJvbWlzZSA9IGZpbGVSZWFkZXJSZWFkeShyZWFkZXIpXG4gIHJlYWRlci5yZWFkQXNBcnJheUJ1ZmZlcihibG9iKVxuICByZXR1cm4gcHJvbWlzZVxufVxuXG5mdW5jdGlvbiByZWFkQmxvYkFzVGV4dChibG9iKSB7XG4gIHZhciByZWFkZXIgPSBuZXcgRmlsZVJlYWRlcigpXG4gIHZhciBwcm9taXNlID0gZmlsZVJlYWRlclJlYWR5KHJlYWRlcilcbiAgcmVhZGVyLnJlYWRBc1RleHQoYmxvYilcbiAgcmV0dXJuIHByb21pc2Vcbn1cblxuZnVuY3Rpb24gcmVhZEFycmF5QnVmZmVyQXNUZXh0KGJ1Zikge1xuICB2YXIgdmlldyA9IG5ldyBVaW50OEFycmF5KGJ1ZilcbiAgdmFyIGNoYXJzID0gbmV3IEFycmF5KHZpZXcubGVuZ3RoKVxuXG4gIGZvciAodmFyIGkgPSAwOyBpIDwgdmlldy5sZW5ndGg7IGkrKykge1xuICAgIGNoYXJzW2ldID0gU3RyaW5nLmZyb21DaGFyQ29kZSh2aWV3W2ldKVxuICB9XG4gIHJldHVybiBjaGFycy5qb2luKCcnKVxufVxuXG5mdW5jdGlvbiBidWZmZXJDbG9uZShidWYpIHtcbiAgaWYgKGJ1Zi5zbGljZSkge1xuICAgIHJldHVybiBidWYuc2xpY2UoMClcbiAgfSBlbHNlIHtcbiAgICB2YXIgdmlldyA9IG5ldyBVaW50OEFycmF5KGJ1Zi5ieXRlTGVuZ3RoKVxuICAgIHZpZXcuc2V0KG5ldyBVaW50OEFycmF5KGJ1ZikpXG4gICAgcmV0dXJuIHZpZXcuYnVmZmVyXG4gIH1cbn1cblxuZnVuY3Rpb24gQm9keSgpIHtcbiAgdGhpcy5ib2R5VXNlZCA9IGZhbHNlXG5cbiAgdGhpcy5faW5pdEJvZHkgPSBmdW5jdGlvbihib2R5KSB7XG4gICAgdGhpcy5fYm9keUluaXQgPSBib2R5XG4gICAgaWYgKCFib2R5KSB7XG4gICAgICB0aGlzLl9ib2R5VGV4dCA9ICcnXG4gICAgfSBlbHNlIGlmICh0eXBlb2YgYm9keSA9PT0gJ3N0cmluZycpIHtcbiAgICAgIHRoaXMuX2JvZHlUZXh0ID0gYm9keVxuICAgIH0gZWxzZSBpZiAoc3VwcG9ydC5ibG9iICYmIEJsb2IucHJvdG90eXBlLmlzUHJvdG90eXBlT2YoYm9keSkpIHtcbiAgICAgIHRoaXMuX2JvZHlCbG9iID0gYm9keVxuICAgIH0gZWxzZSBpZiAoc3VwcG9ydC5mb3JtRGF0YSAmJiBGb3JtRGF0YS5wcm90b3R5cGUuaXNQcm90b3R5cGVPZihib2R5KSkge1xuICAgICAgdGhpcy5fYm9keUZvcm1EYXRhID0gYm9keVxuICAgIH0gZWxzZSBpZiAoc3VwcG9ydC5zZWFyY2hQYXJhbXMgJiYgVVJMU2VhcmNoUGFyYW1zLnByb3RvdHlwZS5pc1Byb3RvdHlwZU9mKGJvZHkpKSB7XG4gICAgICB0aGlzLl9ib2R5VGV4dCA9IGJvZHkudG9TdHJpbmcoKVxuICAgIH0gZWxzZSBpZiAoc3VwcG9ydC5hcnJheUJ1ZmZlciAmJiBzdXBwb3J0LmJsb2IgJiYgaXNEYXRhVmlldyhib2R5KSkge1xuICAgICAgdGhpcy5fYm9keUFycmF5QnVmZmVyID0gYnVmZmVyQ2xvbmUoYm9keS5idWZmZXIpXG4gICAgICAvLyBJRSAxMC0xMSBjYW4ndCBoYW5kbGUgYSBEYXRhVmlldyBib2R5LlxuICAgICAgdGhpcy5fYm9keUluaXQgPSBuZXcgQmxvYihbdGhpcy5fYm9keUFycmF5QnVmZmVyXSlcbiAgICB9IGVsc2UgaWYgKHN1cHBvcnQuYXJyYXlCdWZmZXIgJiYgKEFycmF5QnVmZmVyLnByb3RvdHlwZS5pc1Byb3RvdHlwZU9mKGJvZHkpIHx8IGlzQXJyYXlCdWZmZXJWaWV3KGJvZHkpKSkge1xuICAgICAgdGhpcy5fYm9keUFycmF5QnVmZmVyID0gYnVmZmVyQ2xvbmUoYm9keSlcbiAgICB9IGVsc2Uge1xuICAgICAgdGhpcy5fYm9keVRleHQgPSBib2R5ID0gT2JqZWN0LnByb3RvdHlwZS50b1N0cmluZy5jYWxsKGJvZHkpXG4gICAgfVxuXG4gICAgaWYgKCF0aGlzLmhlYWRlcnMuZ2V0KCdjb250ZW50LXR5cGUnKSkge1xuICAgICAgaWYgKHR5cGVvZiBib2R5ID09PSAnc3RyaW5nJykge1xuICAgICAgICB0aGlzLmhlYWRlcnMuc2V0KCdjb250ZW50LXR5cGUnLCAndGV4dC9wbGFpbjtjaGFyc2V0PVVURi04JylcbiAgICAgIH0gZWxzZSBpZiAodGhpcy5fYm9keUJsb2IgJiYgdGhpcy5fYm9keUJsb2IudHlwZSkge1xuICAgICAgICB0aGlzLmhlYWRlcnMuc2V0KCdjb250ZW50LXR5cGUnLCB0aGlzLl9ib2R5QmxvYi50eXBlKVxuICAgICAgfSBlbHNlIGlmIChzdXBwb3J0LnNlYXJjaFBhcmFtcyAmJiBVUkxTZWFyY2hQYXJhbXMucHJvdG90eXBlLmlzUHJvdG90eXBlT2YoYm9keSkpIHtcbiAgICAgICAgdGhpcy5oZWFkZXJzLnNldCgnY29udGVudC10eXBlJywgJ2FwcGxpY2F0aW9uL3gtd3d3LWZvcm0tdXJsZW5jb2RlZDtjaGFyc2V0PVVURi04JylcbiAgICAgIH1cbiAgICB9XG4gIH1cblxuICBpZiAoc3VwcG9ydC5ibG9iKSB7XG4gICAgdGhpcy5ibG9iID0gZnVuY3Rpb24oKSB7XG4gICAgICB2YXIgcmVqZWN0ZWQgPSBjb25zdW1lZCh0aGlzKVxuICAgICAgaWYgKHJlamVjdGVkKSB7XG4gICAgICAgIHJldHVybiByZWplY3RlZFxuICAgICAgfVxuXG4gICAgICBpZiAodGhpcy5fYm9keUJsb2IpIHtcbiAgICAgICAgcmV0dXJuIFByb21pc2UucmVzb2x2ZSh0aGlzLl9ib2R5QmxvYilcbiAgICAgIH0gZWxzZSBpZiAodGhpcy5fYm9keUFycmF5QnVmZmVyKSB7XG4gICAgICAgIHJldHVybiBQcm9taXNlLnJlc29sdmUobmV3IEJsb2IoW3RoaXMuX2JvZHlBcnJheUJ1ZmZlcl0pKVxuICAgICAgfSBlbHNlIGlmICh0aGlzLl9ib2R5Rm9ybURhdGEpIHtcbiAgICAgICAgdGhyb3cgbmV3IEVycm9yKCdjb3VsZCBub3QgcmVhZCBGb3JtRGF0YSBib2R5IGFzIGJsb2InKVxuICAgICAgfSBlbHNlIHtcbiAgICAgICAgcmV0dXJuIFByb21pc2UucmVzb2x2ZShuZXcgQmxvYihbdGhpcy5fYm9keVRleHRdKSlcbiAgICAgIH1cbiAgICB9XG5cbiAgICB0aGlzLmFycmF5QnVmZmVyID0gZnVuY3Rpb24oKSB7XG4gICAgICBpZiAodGhpcy5fYm9keUFycmF5QnVmZmVyKSB7XG4gICAgICAgIHJldHVybiBjb25zdW1lZCh0aGlzKSB8fCBQcm9taXNlLnJlc29sdmUodGhpcy5fYm9keUFycmF5QnVmZmVyKVxuICAgICAgfSBlbHNlIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuYmxvYigpLnRoZW4ocmVhZEJsb2JBc0FycmF5QnVmZmVyKVxuICAgICAgfVxuICAgIH1cbiAgfVxuXG4gIHRoaXMudGV4dCA9IGZ1bmN0aW9uKCkge1xuICAgIHZhciByZWplY3RlZCA9IGNvbnN1bWVkKHRoaXMpXG4gICAgaWYgKHJlamVjdGVkKSB7XG4gICAgICByZXR1cm4gcmVqZWN0ZWRcbiAgICB9XG5cbiAgICBpZiAodGhpcy5fYm9keUJsb2IpIHtcbiAgICAgIHJldHVybiByZWFkQmxvYkFzVGV4dCh0aGlzLl9ib2R5QmxvYilcbiAgICB9IGVsc2UgaWYgKHRoaXMuX2JvZHlBcnJheUJ1ZmZlcikge1xuICAgICAgcmV0dXJuIFByb21pc2UucmVzb2x2ZShyZWFkQXJyYXlCdWZmZXJBc1RleHQodGhpcy5fYm9keUFycmF5QnVmZmVyKSlcbiAgICB9IGVsc2UgaWYgKHRoaXMuX2JvZHlGb3JtRGF0YSkge1xuICAgICAgdGhyb3cgbmV3IEVycm9yKCdjb3VsZCBub3QgcmVhZCBGb3JtRGF0YSBib2R5IGFzIHRleHQnKVxuICAgIH0gZWxzZSB7XG4gICAgICByZXR1cm4gUHJvbWlzZS5yZXNvbHZlKHRoaXMuX2JvZHlUZXh0KVxuICAgIH1cbiAgfVxuXG4gIGlmIChzdXBwb3J0LmZvcm1EYXRhKSB7XG4gICAgdGhpcy5mb3JtRGF0YSA9IGZ1bmN0aW9uKCkge1xuICAgICAgcmV0dXJuIHRoaXMudGV4dCgpLnRoZW4oZGVjb2RlKVxuICAgIH1cbiAgfVxuXG4gIHRoaXMuanNvbiA9IGZ1bmN0aW9uKCkge1xuICAgIHJldHVybiB0aGlzLnRleHQoKS50aGVuKEpTT04ucGFyc2UpXG4gIH1cblxuICByZXR1cm4gdGhpc1xufVxuXG4vLyBIVFRQIG1ldGhvZHMgd2hvc2UgY2FwaXRhbGl6YXRpb24gc2hvdWxkIGJlIG5vcm1hbGl6ZWRcbnZhciBtZXRob2RzID0gWydERUxFVEUnLCAnR0VUJywgJ0hFQUQnLCAnT1BUSU9OUycsICdQT1NUJywgJ1BVVCddXG5cbmZ1bmN0aW9uIG5vcm1hbGl6ZU1ldGhvZChtZXRob2QpIHtcbiAgdmFyIHVwY2FzZWQgPSBtZXRob2QudG9VcHBlckNhc2UoKVxuICByZXR1cm4gbWV0aG9kcy5pbmRleE9mKHVwY2FzZWQpID4gLTEgPyB1cGNhc2VkIDogbWV0aG9kXG59XG5cbmV4cG9ydCBmdW5jdGlvbiBSZXF1ZXN0KGlucHV0LCBvcHRpb25zKSB7XG4gIG9wdGlvbnMgPSBvcHRpb25zIHx8IHt9XG4gIHZhciBib2R5ID0gb3B0aW9ucy5ib2R5XG5cbiAgaWYgKGlucHV0IGluc3RhbmNlb2YgUmVxdWVzdCkge1xuICAgIGlmIChpbnB1dC5ib2R5VXNlZCkge1xuICAgICAgdGhyb3cgbmV3IFR5cGVFcnJvcignQWxyZWFkeSByZWFkJylcbiAgICB9XG4gICAgdGhpcy51cmwgPSBpbnB1dC51cmxcbiAgICB0aGlzLmNyZWRlbnRpYWxzID0gaW5wdXQuY3JlZGVudGlhbHNcbiAgICBpZiAoIW9wdGlvbnMuaGVhZGVycykge1xuICAgICAgdGhpcy5oZWFkZXJzID0gbmV3IEhlYWRlcnMoaW5wdXQuaGVhZGVycylcbiAgICB9XG4gICAgdGhpcy5tZXRob2QgPSBpbnB1dC5tZXRob2RcbiAgICB0aGlzLm1vZGUgPSBpbnB1dC5tb2RlXG4gICAgdGhpcy5zaWduYWwgPSBpbnB1dC5zaWduYWxcbiAgICBpZiAoIWJvZHkgJiYgaW5wdXQuX2JvZHlJbml0ICE9IG51bGwpIHtcbiAgICAgIGJvZHkgPSBpbnB1dC5fYm9keUluaXRcbiAgICAgIGlucHV0LmJvZHlVc2VkID0gdHJ1ZVxuICAgIH1cbiAgfSBlbHNlIHtcbiAgICB0aGlzLnVybCA9IFN0cmluZyhpbnB1dClcbiAgfVxuXG4gIHRoaXMuY3JlZGVudGlhbHMgPSBvcHRpb25zLmNyZWRlbnRpYWxzIHx8IHRoaXMuY3JlZGVudGlhbHMgfHwgJ3NhbWUtb3JpZ2luJ1xuICBpZiAob3B0aW9ucy5oZWFkZXJzIHx8ICF0aGlzLmhlYWRlcnMpIHtcbiAgICB0aGlzLmhlYWRlcnMgPSBuZXcgSGVhZGVycyhvcHRpb25zLmhlYWRlcnMpXG4gIH1cbiAgdGhpcy5tZXRob2QgPSBub3JtYWxpemVNZXRob2Qob3B0aW9ucy5tZXRob2QgfHwgdGhpcy5tZXRob2QgfHwgJ0dFVCcpXG4gIHRoaXMubW9kZSA9IG9wdGlvbnMubW9kZSB8fCB0aGlzLm1vZGUgfHwgbnVsbFxuICB0aGlzLnNpZ25hbCA9IG9wdGlvbnMuc2lnbmFsIHx8IHRoaXMuc2lnbmFsXG4gIHRoaXMucmVmZXJyZXIgPSBudWxsXG5cbiAgaWYgKCh0aGlzLm1ldGhvZCA9PT0gJ0dFVCcgfHwgdGhpcy5tZXRob2QgPT09ICdIRUFEJykgJiYgYm9keSkge1xuICAgIHRocm93IG5ldyBUeXBlRXJyb3IoJ0JvZHkgbm90IGFsbG93ZWQgZm9yIEdFVCBvciBIRUFEIHJlcXVlc3RzJylcbiAgfVxuICB0aGlzLl9pbml0Qm9keShib2R5KVxufVxuXG5SZXF1ZXN0LnByb3RvdHlwZS5jbG9uZSA9IGZ1bmN0aW9uKCkge1xuICByZXR1cm4gbmV3IFJlcXVlc3QodGhpcywge2JvZHk6IHRoaXMuX2JvZHlJbml0fSlcbn1cblxuZnVuY3Rpb24gZGVjb2RlKGJvZHkpIHtcbiAgdmFyIGZvcm0gPSBuZXcgRm9ybURhdGEoKVxuICBib2R5XG4gICAgLnRyaW0oKVxuICAgIC5zcGxpdCgnJicpXG4gICAgLmZvckVhY2goZnVuY3Rpb24oYnl0ZXMpIHtcbiAgICAgIGlmIChieXRlcykge1xuICAgICAgICB2YXIgc3BsaXQgPSBieXRlcy5zcGxpdCgnPScpXG4gICAgICAgIHZhciBuYW1lID0gc3BsaXQuc2hpZnQoKS5yZXBsYWNlKC9cXCsvZywgJyAnKVxuICAgICAgICB2YXIgdmFsdWUgPSBzcGxpdC5qb2luKCc9JykucmVwbGFjZSgvXFwrL2csICcgJylcbiAgICAgICAgZm9ybS5hcHBlbmQoZGVjb2RlVVJJQ29tcG9uZW50KG5hbWUpLCBkZWNvZGVVUklDb21wb25lbnQodmFsdWUpKVxuICAgICAgfVxuICAgIH0pXG4gIHJldHVybiBmb3JtXG59XG5cbmZ1bmN0aW9uIHBhcnNlSGVhZGVycyhyYXdIZWFkZXJzKSB7XG4gIHZhciBoZWFkZXJzID0gbmV3IEhlYWRlcnMoKVxuICAvLyBSZXBsYWNlIGluc3RhbmNlcyBvZiBcXHJcXG4gYW5kIFxcbiBmb2xsb3dlZCBieSBhdCBsZWFzdCBvbmUgc3BhY2Ugb3IgaG9yaXpvbnRhbCB0YWIgd2l0aCBhIHNwYWNlXG4gIC8vIGh0dHBzOi8vdG9vbHMuaWV0Zi5vcmcvaHRtbC9yZmM3MjMwI3NlY3Rpb24tMy4yXG4gIHZhciBwcmVQcm9jZXNzZWRIZWFkZXJzID0gcmF3SGVhZGVycy5yZXBsYWNlKC9cXHI/XFxuW1xcdCBdKy9nLCAnICcpXG4gIHByZVByb2Nlc3NlZEhlYWRlcnMuc3BsaXQoL1xccj9cXG4vKS5mb3JFYWNoKGZ1bmN0aW9uKGxpbmUpIHtcbiAgICB2YXIgcGFydHMgPSBsaW5lLnNwbGl0KCc6JylcbiAgICB2YXIga2V5ID0gcGFydHMuc2hpZnQoKS50cmltKClcbiAgICBpZiAoa2V5KSB7XG4gICAgICB2YXIgdmFsdWUgPSBwYXJ0cy5qb2luKCc6JykudHJpbSgpXG4gICAgICBoZWFkZXJzLmFwcGVuZChrZXksIHZhbHVlKVxuICAgIH1cbiAgfSlcbiAgcmV0dXJuIGhlYWRlcnNcbn1cblxuQm9keS5jYWxsKFJlcXVlc3QucHJvdG90eXBlKVxuXG5leHBvcnQgZnVuY3Rpb24gUmVzcG9uc2UoYm9keUluaXQsIG9wdGlvbnMpIHtcbiAgaWYgKCFvcHRpb25zKSB7XG4gICAgb3B0aW9ucyA9IHt9XG4gIH1cblxuICB0aGlzLnR5cGUgPSAnZGVmYXVsdCdcbiAgdGhpcy5zdGF0dXMgPSBvcHRpb25zLnN0YXR1cyA9PT0gdW5kZWZpbmVkID8gMjAwIDogb3B0aW9ucy5zdGF0dXNcbiAgdGhpcy5vayA9IHRoaXMuc3RhdHVzID49IDIwMCAmJiB0aGlzLnN0YXR1cyA8IDMwMFxuICB0aGlzLnN0YXR1c1RleHQgPSAnc3RhdHVzVGV4dCcgaW4gb3B0aW9ucyA/IG9wdGlvbnMuc3RhdHVzVGV4dCA6ICdPSydcbiAgdGhpcy5oZWFkZXJzID0gbmV3IEhlYWRlcnMob3B0aW9ucy5oZWFkZXJzKVxuICB0aGlzLnVybCA9IG9wdGlvbnMudXJsIHx8ICcnXG4gIHRoaXMuX2luaXRCb2R5KGJvZHlJbml0KVxufVxuXG5Cb2R5LmNhbGwoUmVzcG9uc2UucHJvdG90eXBlKVxuXG5SZXNwb25zZS5wcm90b3R5cGUuY2xvbmUgPSBmdW5jdGlvbigpIHtcbiAgcmV0dXJuIG5ldyBSZXNwb25zZSh0aGlzLl9ib2R5SW5pdCwge1xuICAgIHN0YXR1czogdGhpcy5zdGF0dXMsXG4gICAgc3RhdHVzVGV4dDogdGhpcy5zdGF0dXNUZXh0LFxuICAgIGhlYWRlcnM6IG5ldyBIZWFkZXJzKHRoaXMuaGVhZGVycyksXG4gICAgdXJsOiB0aGlzLnVybFxuICB9KVxufVxuXG5SZXNwb25zZS5lcnJvciA9IGZ1bmN0aW9uKCkge1xuICB2YXIgcmVzcG9uc2UgPSBuZXcgUmVzcG9uc2UobnVsbCwge3N0YXR1czogMCwgc3RhdHVzVGV4dDogJyd9KVxuICByZXNwb25zZS50eXBlID0gJ2Vycm9yJ1xuICByZXR1cm4gcmVzcG9uc2Vcbn1cblxudmFyIHJlZGlyZWN0U3RhdHVzZXMgPSBbMzAxLCAzMDIsIDMwMywgMzA3LCAzMDhdXG5cblJlc3BvbnNlLnJlZGlyZWN0ID0gZnVuY3Rpb24odXJsLCBzdGF0dXMpIHtcbiAgaWYgKHJlZGlyZWN0U3RhdHVzZXMuaW5kZXhPZihzdGF0dXMpID09PSAtMSkge1xuICAgIHRocm93IG5ldyBSYW5nZUVycm9yKCdJbnZhbGlkIHN0YXR1cyBjb2RlJylcbiAgfVxuXG4gIHJldHVybiBuZXcgUmVzcG9uc2UobnVsbCwge3N0YXR1czogc3RhdHVzLCBoZWFkZXJzOiB7bG9jYXRpb246IHVybH19KVxufVxuXG5leHBvcnQgdmFyIERPTUV4Y2VwdGlvbiA9IHNlbGYuRE9NRXhjZXB0aW9uXG50cnkge1xuICBuZXcgRE9NRXhjZXB0aW9uKClcbn0gY2F0Y2ggKGVycikge1xuICBET01FeGNlcHRpb24gPSBmdW5jdGlvbihtZXNzYWdlLCBuYW1lKSB7XG4gICAgdGhpcy5tZXNzYWdlID0gbWVzc2FnZVxuICAgIHRoaXMubmFtZSA9IG5hbWVcbiAgICB2YXIgZXJyb3IgPSBFcnJvcihtZXNzYWdlKVxuICAgIHRoaXMuc3RhY2sgPSBlcnJvci5zdGFja1xuICB9XG4gIERPTUV4Y2VwdGlvbi5wcm90b3R5cGUgPSBPYmplY3QuY3JlYXRlKEVycm9yLnByb3RvdHlwZSlcbiAgRE9NRXhjZXB0aW9uLnByb3RvdHlwZS5jb25zdHJ1Y3RvciA9IERPTUV4Y2VwdGlvblxufVxuXG5leHBvcnQgZnVuY3Rpb24gZmV0Y2goaW5wdXQsIGluaXQpIHtcbiAgcmV0dXJuIG5ldyBQcm9taXNlKGZ1bmN0aW9uKHJlc29sdmUsIHJlamVjdCkge1xuICAgIHZhciByZXF1ZXN0ID0gbmV3IFJlcXVlc3QoaW5wdXQsIGluaXQpXG5cbiAgICBpZiAocmVxdWVzdC5zaWduYWwgJiYgcmVxdWVzdC5zaWduYWwuYWJvcnRlZCkge1xuICAgICAgcmV0dXJuIHJlamVjdChuZXcgRE9NRXhjZXB0aW9uKCdBYm9ydGVkJywgJ0Fib3J0RXJyb3InKSlcbiAgICB9XG5cbiAgICB2YXIgeGhyID0gbmV3IFhNTEh0dHBSZXF1ZXN0KClcblxuICAgIGZ1bmN0aW9uIGFib3J0WGhyKCkge1xuICAgICAgeGhyLmFib3J0KClcbiAgICB9XG5cbiAgICB4aHIub25sb2FkID0gZnVuY3Rpb24oKSB7XG4gICAgICB2YXIgb3B0aW9ucyA9IHtcbiAgICAgICAgc3RhdHVzOiB4aHIuc3RhdHVzLFxuICAgICAgICBzdGF0dXNUZXh0OiB4aHIuc3RhdHVzVGV4dCxcbiAgICAgICAgaGVhZGVyczogcGFyc2VIZWFkZXJzKHhoci5nZXRBbGxSZXNwb25zZUhlYWRlcnMoKSB8fCAnJylcbiAgICAgIH1cbiAgICAgIG9wdGlvbnMudXJsID0gJ3Jlc3BvbnNlVVJMJyBpbiB4aHIgPyB4aHIucmVzcG9uc2VVUkwgOiBvcHRpb25zLmhlYWRlcnMuZ2V0KCdYLVJlcXVlc3QtVVJMJylcbiAgICAgIHZhciBib2R5ID0gJ3Jlc3BvbnNlJyBpbiB4aHIgPyB4aHIucmVzcG9uc2UgOiB4aHIucmVzcG9uc2VUZXh0XG4gICAgICByZXNvbHZlKG5ldyBSZXNwb25zZShib2R5LCBvcHRpb25zKSlcbiAgICB9XG5cbiAgICB4aHIub25lcnJvciA9IGZ1bmN0aW9uKCkge1xuICAgICAgcmVqZWN0KG5ldyBUeXBlRXJyb3IoJ05ldHdvcmsgcmVxdWVzdCBmYWlsZWQnKSlcbiAgICB9XG5cbiAgICB4aHIub250aW1lb3V0ID0gZnVuY3Rpb24oKSB7XG4gICAgICByZWplY3QobmV3IFR5cGVFcnJvcignTmV0d29yayByZXF1ZXN0IGZhaWxlZCcpKVxuICAgIH1cblxuICAgIHhoci5vbmFib3J0ID0gZnVuY3Rpb24oKSB7XG4gICAgICByZWplY3QobmV3IERPTUV4Y2VwdGlvbignQWJvcnRlZCcsICdBYm9ydEVycm9yJykpXG4gICAgfVxuXG4gICAgeGhyLm9wZW4ocmVxdWVzdC5tZXRob2QsIHJlcXVlc3QudXJsLCB0cnVlKVxuXG4gICAgaWYgKHJlcXVlc3QuY3JlZGVudGlhbHMgPT09ICdpbmNsdWRlJykge1xuICAgICAgeGhyLndpdGhDcmVkZW50aWFscyA9IHRydWVcbiAgICB9IGVsc2UgaWYgKHJlcXVlc3QuY3JlZGVudGlhbHMgPT09ICdvbWl0Jykge1xuICAgICAgeGhyLndpdGhDcmVkZW50aWFscyA9IGZhbHNlXG4gICAgfVxuXG4gICAgaWYgKCdyZXNwb25zZVR5cGUnIGluIHhociAmJiBzdXBwb3J0LmJsb2IpIHtcbiAgICAgIHhoci5yZXNwb25zZVR5cGUgPSAnYmxvYidcbiAgICB9XG5cbiAgICByZXF1ZXN0LmhlYWRlcnMuZm9yRWFjaChmdW5jdGlvbih2YWx1ZSwgbmFtZSkge1xuICAgICAgeGhyLnNldFJlcXVlc3RIZWFkZXIobmFtZSwgdmFsdWUpXG4gICAgfSlcblxuICAgIGlmIChyZXF1ZXN0LnNpZ25hbCkge1xuICAgICAgcmVxdWVzdC5zaWduYWwuYWRkRXZlbnRMaXN0ZW5lcignYWJvcnQnLCBhYm9ydFhocilcblxuICAgICAgeGhyLm9ucmVhZHlzdGF0ZWNoYW5nZSA9IGZ1bmN0aW9uKCkge1xuICAgICAgICAvLyBET05FIChzdWNjZXNzIG9yIGZhaWx1cmUpXG4gICAgICAgIGlmICh4aHIucmVhZHlTdGF0ZSA9PT0gNCkge1xuICAgICAgICAgIHJlcXVlc3Quc2lnbmFsLnJlbW92ZUV2ZW50TGlzdGVuZXIoJ2Fib3J0JywgYWJvcnRYaHIpXG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9XG5cbiAgICB4aHIuc2VuZCh0eXBlb2YgcmVxdWVzdC5fYm9keUluaXQgPT09ICd1bmRlZmluZWQnID8gbnVsbCA6IHJlcXVlc3QuX2JvZHlJbml0KVxuICB9KVxufVxuXG5mZXRjaC5wb2x5ZmlsbCA9IHRydWVcblxuaWYgKCFzZWxmLmZldGNoKSB7XG4gIHNlbGYuZmV0Y2ggPSBmZXRjaFxuICBzZWxmLkhlYWRlcnMgPSBIZWFkZXJzXG4gIHNlbGYuUmVxdWVzdCA9IFJlcXVlc3RcbiAgc2VsZi5SZXNwb25zZSA9IFJlc3BvbnNlXG59XG4iXSwic291cmNlUm9vdCI6IiJ9
