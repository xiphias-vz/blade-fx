(window["webpackJsonp_yves_default"] = window["webpackJsonp_yves_default"] || []).push([["password-complexity-indicator"],{

/***/ "./node_modules/password-validator/src/constants.js":
/*!**********************************************************!*\
  !*** ./node_modules/password-validator/src/constants.js ***!
  \**********************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = {
  error: {
    length: 'Length should be a valid positive number',
    password: 'Password should be a valid string'
  },
  regex: {
    digits: '(\\d.*)',
    letters: '([a-zA-Z].*)',
    symbols: '([`~\\!@#\\$%\\^\\&\\*\\(\\)\\-_\\=\\+\\[\\\{\\}\\]\\\\\|;:\\\'",<.>\\/\\?€£¥₹§±].*)',
    spaces: '([\\s].*)'
  }
};


/***/ }),

/***/ "./node_modules/password-validator/src/index.js":
/*!******************************************************!*\
  !*** ./node_modules/password-validator/src/index.js ***!
  \******************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var lib = __webpack_require__(/*! ./lib */ "./node_modules/password-validator/src/lib.js");
var error = __webpack_require__(/*! ./constants */ "./node_modules/password-validator/src/constants.js").error;

/**
 * Validates that a number is a valid length (positive number)
 *
 * @private
 * @param {number} num - Number to validate
 */
function _validateLength(num) {
  const len = Number(num);
  if (isNaN(len) || !Number.isInteger(len) || len < 1) {
    throw new Error(error.length);
  }
}

/**
 * Tests a validation and return the result
 *
 * @private
 * @param {string} property - Property to validate
 * @return {boolean} Boolean value indicting the validity
 *           of the password against the property
 */
function _isPasswordValidFor(property) {
  return lib[property.method].apply(this, property.arguments);
}

/**
 * Registers the properties of a password-validation schema object
 *
 * @private
 * @param {string} func - Property name
 * @param {array} args - arguments for the func property
 */
function _register(func, args) {
  // Add property to the schema
  this.properties.push({ method: func, arguments: args });
  return this;
}

class PasswordValidator {
  /**
   * Creates a password-validator schema
   *
   * @constructor
   */
  constructor() {
    this.properties = [];
  }

  /**
   * Method to validate the password against schema
   *
   * @param {string} pwd - password to valdiate
   * @param {object} options - optional options to configure validation
   * @param {boolean} [options.list] - asks for a list of validation
   *           failures instead of just true/false
   * @return {boolean|array} Boolean value indicting the validity
   *           of the password as per schema, if 'options.list'
   *           is not set. Otherwise, it returns an array of
   *           property names which failed validations
   */
  validate(pwd, options) {
    this.list = Boolean(options && options.list);
    this.password = String(pwd);

    this.positive = true;

    if (this.list) {
      return this.properties.reduce((errorList, property) => {
        // Applies all validations defined in lib one by one
        if (!_isPasswordValidFor.call(this, property)) {
          // If the validation for a property fails,
          // add it to the error list
          return errorList.concat(property.method);
        }
        return errorList;
      }, []);
    }
    return this.properties.every(_isPasswordValidFor.bind(this));
  }

  /**
   * Rule to mandate the presence of letters in the password
   *
   * @param {number} [count] - minimum number of letters required
   */
  letters(count) {
    count && _validateLength(count);
    return _register.call(this, 'letters', arguments);
  }

  /**
   * Rule to mandate the presence of digits in the password
   *
   * @param {number} [count] - minimum number of digits required
   */
  digits(count) {
    count && _validateLength(count);
    return _register.call(this, 'digits', arguments);
  }

  /**
   * Rule to mandate the presence of symbols in the password
   *
   * @param {number} [count] - minimum number of symbols required
   */
  symbols(count) {
    count && _validateLength(count);
    return _register.call(this, 'symbols', arguments);
  }

  /**
   * Rule to specify a minimum length of the password
   *
   * @param {number} num - minimum length
   */
  min(num) {
    _validateLength(num);
    return _register.call(this, 'min', arguments);
  }

  /**
   * Rule to specify a maximum length of the password
   *
   * @param {number} num - maximum length
   */
  max(num) {
    _validateLength(num);
    return _register.call(this, 'max', arguments);
  }

  /**
   * Rule to mandate the presence of lowercase letters in the password
   *
   * @param {number} [count] - minimum number of lowercase letters required
   */
  lowercase(count) {
    count && _validateLength(count);
    return _register.call(this, 'lowercase', arguments);
  }

  /**
   * Rule to mandate the presence of uppercase letters in the password
   *
   * @param {number} [count] - minimum number of uppercase letters required
   */
  uppercase(count) {
    count && _validateLength(count);
    return _register.call(this, 'uppercase', arguments);
  }

  /**
   * Rule to mandate the presence of space in the password
   * It can be used along with 'not' to not allow spaces
   * in the password
   *
   * @param {number} [count] - minimum number of spaces required
   */
  spaces(count) {
    count && _validateLength(count);
    return _register.call(this, 'spaces', arguments);
  }

  /**
   * Rule to invert the effects of 'not'
   * Apart from that, 'has' is also used
   * to make the api readable and chainable
   */
  has() {
    return _register.call(this, 'has', arguments);
  }

  /**
   * Rule to invert the next applied rules.
   * All the rules applied after 'not' will have opposite effect,
   * until 'has' rule is applied
   */
  not() {
    return _register.call(this, 'not', arguments);
  }

  /**
   * Rule to invert the effects of 'not'
   * Apart from that, 'is' is also used
   * to make the api readable and chainable
   */
  is() {
    return _register.call(this, 'is', arguments);
  }

  /**
   * Rule to whitelist words to be used as password
   *
   * @param {array} list - list of values allowed
   */
  oneOf() {
    return _register.call(this, 'oneOf', arguments);
  }
}

module.exports = PasswordValidator;


/***/ }),

/***/ "./node_modules/password-validator/src/lib.js":
/*!****************************************************!*\
  !*** ./node_modules/password-validator/src/lib.js ***!
  \****************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

/**
 * Generic method to test regex
 *
 * @private
 * @param {string} regex - regex to test
 *                           with password
 */
var regex = __webpack_require__(/*! ./constants */ "./node_modules/password-validator/src/constants.js").regex;

function _process(regexp, repeat) {
  if (repeat && repeat > 1) {
    const parsedRepeat = parseInt(repeat, 10);
    return new RegExp(regexp + '{' + parsedRepeat + ',}').test(this.password) === this.positive;
  }
  return new RegExp(regexp).test(this.password) === this.positive;
}

module.exports = {

  /**
   * Method to invert the next validations
   *
   * @param {RegExp} [symbol] - custom Regex which should not be present
   */
  not: function not(symbol) {
    this.positive = false;
    if (symbol) {
      return _process.call(this, symbol);
    }
    return true;
  },

  /**
   * Method to invert the effects of not()
   *
   * @param {RegExp} [symbol] - custom Regex which should be present
   */
  has: function has(symbol) {
    this.positive = true;
    if (symbol) {
      return _process.call(this, symbol);
    }
    return true;
  },

  /**
   * Method to invert the effects of not() and
   * to make the api readable and chainable
   *
   */
  is: function is() {
    this.positive = true;
    return true;
  },

  /**
   * Method to specify a minimum length
   *
   * @param {number} num - minimum length
   */
  min: function min(num) {
    return this.password.length >= num;
  },

  /**
   * Method to specify a maximum length
   *
   * @param {number} num - maximum length
   */
  max: function max(num) {
    return this.password.length <= num;
  },

  /**
   * Method to validate the presence of digits
   *
   * @param {number} repeat - count of required digits
   */
  digits: function digits(repeat) {
    return _process.call(this, regex.digits, repeat);
  },

  /**
   * Method to validate the presence of letters
   *
   * @param {number} repeat - count of required letters
   */
  letters: function letters(repeat) {
    return _process.call(this, regex.letters, repeat);
  },

  /**
   * Method to validate the presence of uppercase letters
   *
   * @param {number} repeat - count of required uppercase letters
   */
  uppercase: function uppercase(repeat) {
    if (repeat && repeat > 1) {
      let characterIndex = 0;
      let upperCaseLetters = 0;

      while ((upperCaseLetters < repeat) && (characterIndex < this.password.length)) {
        const currentLetter = this.password.charAt(characterIndex);
        if (currentLetter !== currentLetter.toLowerCase()) {
          upperCaseLetters++;
        }
        characterIndex++;
      }

      return (upperCaseLetters === repeat) === this.positive;
    }
    return (this.password !== this.password.toLowerCase()) === this.positive;
  },

  /**
   * Method to validate the presence of lowercase letters
   *
   * @param {number} repeat - count of required lowercase letters
   */
  lowercase: function lowercase(repeat) {
    if (repeat && repeat > 1) {
      let characterIndex = 0;
      let lowerCaseLetters = 0;

      while ((lowerCaseLetters < repeat) && (characterIndex < this.password.length)) {
        const currentLetter = this.password.charAt(characterIndex);
        if (currentLetter !== currentLetter.toUpperCase()) {
          lowerCaseLetters++;
        }
        characterIndex++;
      }

      return (lowerCaseLetters === repeat) === this.positive;
    }
    return (this.password !== this.password.toUpperCase()) === this.positive;
  },

  /**
   * Method to validate the presence of symbols
   *
   * @param {number} repeat - count of required symbols
   */
  symbols: function symbols(repeat) {
    return _process.call(this, regex.symbols, repeat);
  },

  /**
   * Method to validate the presence of space
   *
   * @param {number} repeat - count of required spaces
   */
  spaces: function spaces(repeat) {
    return _process.call(this, regex.spaces, repeat);
  },

  /**
   * Method to provide pre-defined values for password
   *
   * @param {array} list - list of values allowed
   */
  oneOf: function oneOf(list) {
    return list.indexOf(this.password) >= 0 === this.positive;
  }
};


/***/ }),

/***/ "./vendor/spryker-shop/shop-ui/src/SprykerShop/Yves/ShopUi/Theme/default/components/molecules/password-complexity-indicator/password-complexity-indicator.ts":
/*!*******************************************************************************************************************************************************************!*\
  !*** ./vendor/spryker-shop/shop-ui/src/SprykerShop/Yves/ShopUi/Theme/default/components/molecules/password-complexity-indicator/password-complexity-indicator.ts ***!
  \*******************************************************************************************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return PasswordComplexityIndicator; });
/* harmony import */ var _babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @babel/runtime/helpers/createClass */ "./node_modules/@babel/runtime/helpers/createClass.js");
/* harmony import */ var _babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _babel_runtime_helpers_assertThisInitialized__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @babel/runtime/helpers/assertThisInitialized */ "./node_modules/@babel/runtime/helpers/assertThisInitialized.js");
/* harmony import */ var _babel_runtime_helpers_assertThisInitialized__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_assertThisInitialized__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _babel_runtime_helpers_possibleConstructorReturn__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @babel/runtime/helpers/possibleConstructorReturn */ "./node_modules/@babel/runtime/helpers/possibleConstructorReturn.js");
/* harmony import */ var _babel_runtime_helpers_possibleConstructorReturn__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_possibleConstructorReturn__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _babel_runtime_helpers_getPrototypeOf__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @babel/runtime/helpers/getPrototypeOf */ "./node_modules/@babel/runtime/helpers/getPrototypeOf.js");
/* harmony import */ var _babel_runtime_helpers_getPrototypeOf__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_getPrototypeOf__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _babel_runtime_helpers_inheritsLoose__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @babel/runtime/helpers/inheritsLoose */ "./node_modules/@babel/runtime/helpers/inheritsLoose.js");
/* harmony import */ var _babel_runtime_helpers_inheritsLoose__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_inheritsLoose__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @babel/runtime/helpers/defineProperty */ "./node_modules/@babel/runtime/helpers/defineProperty.js");
/* harmony import */ var _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_5__);
/* harmony import */ var ShopUi_models_component__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ShopUi/models/component */ "./vendor/spryker-shop/shop-ui/src/SprykerShop/Yves/ShopUi/Theme/default/models/component.ts");
/* harmony import */ var lodash_es_debounce__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! lodash-es/debounce */ "./node_modules/lodash-es/debounce.js");
/* harmony import */ var password_validator__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! password-validator */ "./node_modules/password-validator/src/index.js");
/* harmony import */ var password_validator__WEBPACK_IMPORTED_MODULE_8___default = /*#__PURE__*/__webpack_require__.n(password_validator__WEBPACK_IMPORTED_MODULE_8__);







function _createSuper(Derived) { return function () { var Super = _babel_runtime_helpers_getPrototypeOf__WEBPACK_IMPORTED_MODULE_3___default()(Derived), result; if (_isNativeReflectConstruct()) { var NewTarget = _babel_runtime_helpers_getPrototypeOf__WEBPACK_IMPORTED_MODULE_3___default()(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _babel_runtime_helpers_possibleConstructorReturn__WEBPACK_IMPORTED_MODULE_2___default()(this, result); }; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Date.prototype.toString.call(Reflect.construct(Date, [], function () {})); return true; } catch (e) { return false; } }




var ComplexityWeight;

(function (ComplexityWeight) {
  ComplexityWeight[ComplexityWeight["lowercase"] = 10] = "lowercase";
  ComplexityWeight[ComplexityWeight["digits"] = 15] = "digits";
  ComplexityWeight[ComplexityWeight["uppercase"] = 20] = "uppercase";
  ComplexityWeight[ComplexityWeight["symbols"] = 30] = "symbols";
  ComplexityWeight[ComplexityWeight["min"] = 25] = "min";
})(ComplexityWeight || (ComplexityWeight = {}));

var PasswordComplexityIndicator = /*#__PURE__*/function (_Component) {
  _babel_runtime_helpers_inheritsLoose__WEBPACK_IMPORTED_MODULE_4___default()(PasswordComplexityIndicator, _Component);

  var _super = _createSuper(PasswordComplexityIndicator);

  function PasswordComplexityIndicator() {
    var _this;

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this = _Component.call.apply(_Component, [this].concat(args)) || this;

    _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_5___default()(_babel_runtime_helpers_assertThisInitialized__WEBPACK_IMPORTED_MODULE_1___default()(_this), "availableProperties", ['min', 'lowercase', 'uppercase', 'digits', 'symbols']);

    _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_5___default()(_babel_runtime_helpers_assertThisInitialized__WEBPACK_IMPORTED_MODULE_1___default()(_this), "complexityGradation", new Map([['weak', 0], ['medium', 25], ['strong', 50], ['very-strong', 75]]));

    _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_5___default()(_babel_runtime_helpers_assertThisInitialized__WEBPACK_IMPORTED_MODULE_1___default()(_this), "currentComplexity", '');

    _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_5___default()(_babel_runtime_helpers_assertThisInitialized__WEBPACK_IMPORTED_MODULE_1___default()(_this), "maxPasswordComplexity", 0);

    _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_5___default()(_babel_runtime_helpers_assertThisInitialized__WEBPACK_IMPORTED_MODULE_1___default()(_this), "factor", 100);

    _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_5___default()(_babel_runtime_helpers_assertThisInitialized__WEBPACK_IMPORTED_MODULE_1___default()(_this), "inputElement", void 0);

    _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_5___default()(_babel_runtime_helpers_assertThisInitialized__WEBPACK_IMPORTED_MODULE_1___default()(_this), "notificationElement", void 0);

    _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_5___default()(_babel_runtime_helpers_assertThisInitialized__WEBPACK_IMPORTED_MODULE_1___default()(_this), "indicatorListElement", void 0);

    _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_5___default()(_babel_runtime_helpers_assertThisInitialized__WEBPACK_IMPORTED_MODULE_1___default()(_this), "schema", void 0);

    return _this;
  }

  var _proto = PasswordComplexityIndicator.prototype;

  _proto.readyCallback = function readyCallback() {};

  _proto.init = function init() {
    this.inputElement = document.getElementsByClassName(this.inputClassName)[0];
    this.indicatorListElement = this.getElementsByClassName(this.indicatorListClassName)[0];
    this.notificationElement = this.getElementsByClassName(this.additionalMessageClassName)[0];
    this.schema = new password_validator__WEBPACK_IMPORTED_MODULE_8___default.a();
    this.initValidator();
    this.mapEvents();
  };

  _proto.mapEvents = function mapEvents() {
    this.mapInputElementKeyUpEvent();
  };

  _proto.mapInputElementKeyUpEvent = function mapInputElementKeyUpEvent() {
    var _this2 = this;

    this.inputElement.addEventListener('keyup', Object(lodash_es_debounce__WEBPACK_IMPORTED_MODULE_7__["default"])(function () {
      return _this2.onInputKeyUp();
    }, this.debounceDelay));
  };

  _proto.initValidator = function initValidator() {
    var _this3 = this;

    this.availableProperties.forEach(function (property) {
      _this3.setValidation(property);

      _this3.increaseMaxPasswordComplexity(property);
    });
  };

  _proto.increaseMaxPasswordComplexity = function increaseMaxPasswordComplexity(property) {
    this.maxPasswordComplexity += ComplexityWeight[property];
  };

  _proto.setValidation = function setValidation(property) {
    var propertyValue = this[property];

    if (property === 'min') {
      this.setIsValidationType(property, propertyValue);
      return;
    }

    this.setHasValidationType(property, propertyValue);
  };

  _proto.setHasValidationType = function setHasValidationType(property, value) {
    this.schema.has()[property](value);
  };

  _proto.setIsValidationType = function setIsValidationType(property, value) {
    this.schema.is()[property](value);
  };

  _proto.onInputKeyUp = function onInputKeyUp() {
    var inputValue = this.inputElement.value;
    var failsList = this.schema.validate(inputValue, {
      list: true
    });
    var passwordValidatorMark = this.maxPasswordComplexity;
    failsList.forEach(function (property) {
      passwordValidatorMark -= ComplexityWeight[property];
    });
    this.validatePassword(passwordValidatorMark);
  };

  _proto.validatePassword = function validatePassword(passwordValidatorMark) {
    var _this4 = this;

    var passwordComplexity = passwordValidatorMark / this.maxPasswordComplexity * this.factor;
    this.complexityGradation.forEach(function (value, key) {
      if (passwordComplexity >= value) {
        _this4.updateValidation(key);
      }
    });
  };

  _proto.updateValidation = function updateValidation(complexityModifier) {
    this.updateModifier(this.indicatorListElement, this.indicatorListClassName, complexityModifier);
    this.updateModifier(this.notificationElement, this.additionalMessageClassName, complexityModifier);
    this.currentComplexity = complexityModifier;
  };

  _proto.updateModifier = function updateModifier(element, className, complexityModifier) {
    var classList = element.classList;
    classList.remove(className + "--" + this.currentComplexity);
    classList.add(className + "--" + complexityModifier);
  };

  _babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_0___default()(PasswordComplexityIndicator, [{
    key: "inputClassName",
    get: function get() {
      return this.getAttribute('input-class-name');
    }
  }, {
    key: "indicatorListClassName",
    get: function get() {
      return this.name + "__indicator-list";
    }
  }, {
    key: "additionalMessageClassName",
    get: function get() {
      return this.name + "__additional-message";
    }
  }, {
    key: "debounceDelay",
    get: function get() {
      return Number(this.getAttribute('debounce-delay'));
    }
  }, {
    key: "min",
    get: function get() {
      return Number(this.getAttribute('min'));
    }
  }, {
    key: "lowercase",
    get: function get() {
      return Number(this.getAttribute('lowercase'));
    }
  }, {
    key: "uppercase",
    get: function get() {
      return Number(this.getAttribute('uppercase'));
    }
  }, {
    key: "digits",
    get: function get() {
      return Number(this.getAttribute('digits'));
    }
  }, {
    key: "symbols",
    get: function get() {
      return Number(this.getAttribute('symbols'));
    }
  }]);

  return PasswordComplexityIndicator;
}(ShopUi_models_component__WEBPACK_IMPORTED_MODULE_6__["default"]);



/***/ })

}]);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvcGFzc3dvcmQtdmFsaWRhdG9yL3NyYy9jb25zdGFudHMuanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL3Bhc3N3b3JkLXZhbGlkYXRvci9zcmMvaW5kZXguanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL3Bhc3N3b3JkLXZhbGlkYXRvci9zcmMvbGliLmpzIiwid2VicGFjazovLy8uL3ZlbmRvci9zcHJ5a2VyLXNob3Avc2hvcC11aS9zcmMvU3ByeWtlclNob3AvWXZlcy9TaG9wVWkvVGhlbWUvZGVmYXVsdC9jb21wb25lbnRzL21vbGVjdWxlcy9wYXNzd29yZC1jb21wbGV4aXR5LWluZGljYXRvci9wYXNzd29yZC1jb21wbGV4aXR5LWluZGljYXRvci50cyJdLCJuYW1lcyI6WyJDb21wbGV4aXR5V2VpZ2h0IiwiUGFzc3dvcmRDb21wbGV4aXR5SW5kaWNhdG9yIiwiTWFwIiwicmVhZHlDYWxsYmFjayIsImluaXQiLCJpbnB1dEVsZW1lbnQiLCJkb2N1bWVudCIsImdldEVsZW1lbnRzQnlDbGFzc05hbWUiLCJpbnB1dENsYXNzTmFtZSIsImluZGljYXRvckxpc3RFbGVtZW50IiwiaW5kaWNhdG9yTGlzdENsYXNzTmFtZSIsIm5vdGlmaWNhdGlvbkVsZW1lbnQiLCJhZGRpdGlvbmFsTWVzc2FnZUNsYXNzTmFtZSIsInNjaGVtYSIsIlBhc3N3b3JkVmFsaWRhdG9yIiwiaW5pdFZhbGlkYXRvciIsIm1hcEV2ZW50cyIsIm1hcElucHV0RWxlbWVudEtleVVwRXZlbnQiLCJhZGRFdmVudExpc3RlbmVyIiwiZGVib3VuY2UiLCJvbklucHV0S2V5VXAiLCJkZWJvdW5jZURlbGF5IiwiYXZhaWxhYmxlUHJvcGVydGllcyIsImZvckVhY2giLCJwcm9wZXJ0eSIsInNldFZhbGlkYXRpb24iLCJpbmNyZWFzZU1heFBhc3N3b3JkQ29tcGxleGl0eSIsIm1heFBhc3N3b3JkQ29tcGxleGl0eSIsInByb3BlcnR5VmFsdWUiLCJzZXRJc1ZhbGlkYXRpb25UeXBlIiwic2V0SGFzVmFsaWRhdGlvblR5cGUiLCJ2YWx1ZSIsImhhcyIsImlzIiwiaW5wdXRWYWx1ZSIsImZhaWxzTGlzdCIsInZhbGlkYXRlIiwibGlzdCIsInBhc3N3b3JkVmFsaWRhdG9yTWFyayIsInZhbGlkYXRlUGFzc3dvcmQiLCJwYXNzd29yZENvbXBsZXhpdHkiLCJmYWN0b3IiLCJjb21wbGV4aXR5R3JhZGF0aW9uIiwia2V5IiwidXBkYXRlVmFsaWRhdGlvbiIsImNvbXBsZXhpdHlNb2RpZmllciIsInVwZGF0ZU1vZGlmaWVyIiwiY3VycmVudENvbXBsZXhpdHkiLCJlbGVtZW50IiwiY2xhc3NOYW1lIiwiY2xhc3NMaXN0IiwicmVtb3ZlIiwiYWRkIiwiZ2V0QXR0cmlidXRlIiwibmFtZSIsIk51bWJlciIsIkNvbXBvbmVudCJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7O0FBQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQSxHQUFHO0FBQ0g7QUFDQTtBQUNBO0FBQ0EsMkRBQTJELEdBQUcsVUFBVTtBQUN4RTtBQUNBO0FBQ0E7Ozs7Ozs7Ozs7OztBQ1hBLFVBQVUsbUJBQU8sQ0FBQywyREFBTztBQUN6QixZQUFZLG1CQUFPLENBQUMsdUVBQWE7O0FBRWpDO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsV0FBVyxPQUFPO0FBQ2xCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsV0FBVyxPQUFPO0FBQ2xCLFlBQVksUUFBUTtBQUNwQjtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsV0FBVyxPQUFPO0FBQ2xCLFdBQVcsTUFBTTtBQUNqQjtBQUNBO0FBQ0E7QUFDQSx3QkFBd0IsZ0NBQWdDO0FBQ3hEO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLGFBQWEsT0FBTztBQUNwQixhQUFhLE9BQU87QUFD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Q0UsR0FBVixDQUFpQkgsU0FBakIsVUFBK0JKLGtCQUEvQjtBQUNILEc7Ozs7d0JBRXNDO0FBQ25DLGFBQU8sS0FBS1EsWUFBTCxDQUFrQixrQkFBbEIsQ0FBUDtBQUNIOzs7d0JBRThDO0FBQzNDLGFBQVUsS0FBS0MsSUFBZjtBQUNIOzs7d0JBRWtEO0FBQy9DLGFBQVUsS0FBS0EsSUFBZjtBQUNIOzs7d0JBRXFDO0FBQ2xDLGFBQU9DLE1BQU0sQ0FBQyxLQUFLRixZQUFMLENBQWtCLGdCQUFsQixDQUFELENBQWI7QUFDSDs7O3dCQUUyQjtBQUN4QixhQUFPRSxNQUFNLENBQUMsS0FBS0YsWUFBTCxDQUFrQixLQUFsQixDQUFELENBQWI7QUFDSDs7O3dCQUVpQztBQUM5QixhQUFPRSxNQUFNLENBQUMsS0FBS0YsWUFBTCxDQUFrQixXQUFsQixDQUFELENBQWI7QUFDSDs7O3dCQUVpQztBQUM5QixhQUFPRSxNQUFNLENBQUMsS0FBS0YsWUFBTCxDQUFrQixXQUFsQixDQUFELENBQWI7QUFDSDs7O3dCQUU4QjtBQUMzQixhQUFPRSxNQUFNLENBQUMsS0FBS0YsWUFBTCxDQUFrQixRQUFsQixDQUFELENBQWI7QUFDSDs7O3dCQUUrQjtBQUM1QixhQUFPRSxNQUFNLENBQUMsS0FBS0YsWUFBTCxDQUFrQixTQUFsQixDQUFELENBQWI7QUFDSDs7OztFQTlJb0RHLCtEIiwiZmlsZSI6Ii4vanMveXZlc19kZWZhdWx0LnBhc3N3b3JkLWNvbXBsZXhpdHktaW5kaWNhdG9yLmxlZ2FjeS5qcyIsInNvdXJjZXNDb250ZW50IjpbIm1vZHVsZS5leHBvcnRzID0ge1xuICBlcnJvcjoge1xuICAgIGxlbmd0aDogJ0xlbmd0aCBzaG91bGQgYmUgYSB2YWxpZCBwb3NpdGl2ZSBudW1iZXInLFxuICAgIHBhc3N3b3JkOiAnUGFzc3dvcmQgc2hvdWxkIGJlIGEgdmFsaWQgc3RyaW5nJ1xuICB9LFxuICByZWdleDoge1xuICAgIGRpZ2l0czogJyhcXFxcZC4qKScsXG4gICAgbGV0dGVyczogJyhbYS16QS1aXS4qKScsXG4gICAgc3ltYm9sczogJyhbYH5cXFxcIUAjXFxcXCQlXFxcXF5cXFxcJlxcXFwqXFxcXChcXFxcKVxcXFwtX1xcXFw9XFxcXCtcXFxcW1xcXFxcXHtcXFxcfVxcXFxdXFxcXFxcXFxcXHw7OlxcXFxcXCdcIiw8Lj5cXFxcL1xcXFw/4oKswqPCpeKCucKnwrFdLiopJyxcbiAgICBzcGFjZXM6ICcoW1xcXFxzXS4qKSdcbiAgfVxufTtcbiIsInZhciBsaWIgPSByZXF1aXJlKCcuL2xpYicpO1xudmFyIGVycm9yID0gcmVxdWlyZSgnLi9jb25zdGFudHMnKS5lcnJvcjtcblxuLyoqXG4gKiBWYWxpZGF0ZXMgdGhhdCBhIG51bWJlciBpcyBhIHZhbGlkIGxlbmd0aCAocG9zaXRpdmUgbnVtYmVyKVxuICpcbiAqIEBwcml2YXRlXG4gKiBAcGFyYW0ge251bWJlcn0gbnVtIC0gTnVtYmVyIHRvIHZhbGlkYXRlXG4gKi9cbmZ1bmN0aW9uIF92YWxpZGF0ZUxlbmd0aChudW0pIHtcbiAgY29uc3QgbGVuID0gTnVtYmVyKG51bSk7XG4gIGlmIChpc05hTihsZW4pIHx8ICFOdW1iZXIuaXNJbnRlZ2VyKGxlbikgfHwgbGVuIDwgMSkge1xuICAgIHRocm93IG5ldyBFcnJvcihlcnJvci5sZW5ndGgpO1xuICB9XG59XG5cbi8qKlxuICogVGVzdHMgYSB2YWxpZGF0aW9uIGFuZCByZXR1cm4gdGhlIHJlc3VsdFxuICpcbiAqIEBwcml2YXRlXG4gKiBAcGFyYW0ge3N0cmluZ30gcHJvcGVydHkgLSBQcm9wZXJ0eSB0byB2YWxpZGF0ZVxuICogQHJldHVybiB7Ym9vbGVhbn0gQm9vbGVhbiB2YWx1ZSBpbmRpY3RpbmcgdGhlIHZhbGlkaXR5XG4gKiAgICAgICAgICAgb2YgdGhlIHBhc3N3b3JkIGFnYWluc3QgdGhlIHByb3BlcnR5XG4gKi9cbmZ1bmN0aW9uIF9pc1Bhc3N3b3JkVmFsaWRGb3IocHJvcGVydHkpIHtcbiAgcmV0dXJuIGxpYltwcm9wZXJ0eS5tZXRob2RdLmFwcGx5KHRoaXMsIHByb3BlcnR5LmFyZ3VtZW50cyk7XG59XG5cbi8qKlxuICogUmVnaXN0ZXJzIHRoZSBwcm9wZXJ0aWVzIG9mIGEgcGFzc3dvcmQtdmFsaWRhdGlvbiBzY2hlbWEgb2JqZWN0XG4gKlxuICogQHByaXZhdGVcbiAqIEBwYXJhbSB7c3RyaW5nfSBmdW5jIC0gUHJvcGVydHkgbmFtZVxuICogQHBhcmFtIHthcnJheX0gYXJncyAtIGFyZ3VtZW50cyBmb3IgdGhlIGZ1bmMgcHJvcGVydHlcbiAqL1xuZnVuY3Rpb24gX3JlZ2lzdGVyKGZ1bmMsIGFyZ3MpIHtcbiAgLy8gQWRkIHByb3BlcnR5IHRvIHRoZSBzY2hlbWFcbiAgdGhpcy5wcm9wZXJ0aWVzLnB1c2goeyBtZXRob2Q6IGZ1bmMsIGFyZ3VtZW50czogYXJncyB9KTtcbiAgcmV0dXJuIHRoaXM7XG59XG5cbmNsYXNzIFBhc3N3b3JkVmFsaWRhdG9yIHtcbiAgLyoqXG4gICAqIENyZWF0ZXMgYSBwYXNzd29yZC12YWxpZGF0b3Igc2NoZW1hXG4gICAqXG4gICAqIEBjb25zdHJ1Y3RvclxuICAgKi9cbiAgY29uc3RydWN0b3IoKSB7XG4gICAgdGhpcy5wcm9wZXJ0aWVzID0gW107XG4gIH1cblxuICAvKipcbiAgICogTWV0aG9kIHRvIHZhbGlkYXRlIHRoZSBwYXNzd29yZCBhZ2FpbnN0IHNjaGVtYVxuICAgKlxuICAgKiBAcGFyYW0ge3N0cmluZ30gcHdkIC0gcGFzc3dvcmQgdG8gdmFsZGlhdGVcbiAgICogQHBhcmFtIHtvYmplY3R9IG9wdGlvbnMgLSBvcHRpb25hbCBvcHRpb25zIHRvIGNvbmZpZ3VyZSB2YWxpZGF0aW9uXG4gICAqIEBwYXJhbSB7Ym9vbGVhbn0gW29wdGlvbnMubGlzdF0gLSBhc2tzIGZvciBhIGxpc3Qgb2YgdmFsaWRhdGlvblxuICAgKiAgICAgICAgICAgZmFpbHVyZXMgaW5zdGVhZCBvZiBqdXN0IHRydWUvZmFsc2VcbiAgICogQHJldHVybiB7Ym9vbGVhbnxhcnJheX0gQm9vbGVhbiB2YWx1ZSBpbmRpY3RpbmcgdGhlIHZhbGlkaXR5XG4gICAqICAgICAgICAgICBvZiB0aGUgcGFzc3dvcmQgYXMgcGVyIHNjaGVtYSwgaWYgJ29wdGlvbnMubGlzdCdcbiAgICogICAgICAgICAgIGlzIG5vdCBzZXQuIE90aGVyd2lzZSwgaXQgcmV0dXJucyBhbiBhcnJheSBvZlxuICAgKiAgICAgICAgICAgcHJvcGVydHkgbmFtZXMgd2hpY2ggZmFpbGVkIHZhbGlkYXRpb25zXG4gICAqL1xuICB2YWxpZGF0ZShwd2QsIG9wdGlvbnMpIHtcbiAgICB0aGlzLmxpc3QgPSBCb29sZWFuKG9wdGlvbnMgJiYgb3B0aW9ucy5saXN0KTtcbiAgICB0aGlzLnBhc3N3b3JkID0gU3RyaW5nKHB3ZCk7XG5cbiAgICB0aGlzLnBvc2l0aXZlID0gdHJ1ZTtcblxuICAgIGlmICh0aGlzLmxpc3QpIHtcbiAgICAgIHJldHVybiB0aGlzLnByb3BlcnRpZXMucmVkdWNlKChlcnJvckxpc3QsIHByb3BlcnR5KSA9PiB7XG4gICAgICAgIC8vIEFwcGxpZXMgYWxsIHZhbGlkYXRpb25zIGRlZmluZWQgaW4gbGliIG9uZSBieSBvbmVcbiAgICAgICAgaWYgKCFfaXNQYXNzd29yZFZhbGlkRm9yLmNhbGwodGhpcywgcHJvcGVydHkpKSB7XG4gICAgICAgICAgLy8gSWYgdGhlIHZhbGlkYXRpb24gZm9yIGEgcHJvcGVydHkgZmFpbHMsXG4gICAgICAgICAgLy8gYWRkIGl0IHRvIHRoZSBlcnJvciBsaXN0XG4gICAgICAgICAgcmV0dXJuIGVycm9yTGlzdC5jb25jYXQocHJvcGVydHkubWV0aG9kKTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gZXJyb3JMaXN0O1xuICAgICAgfSwgW10pO1xuICAgIH1cbiAgICByZXR1cm4gdGhpcy5wcm9wZXJ0aWVzLmV2ZXJ5KF9pc1Bhc3N3b3JkVmFsaWRGb3IuYmluZCh0aGlzKSk7XG4gIH1cblxuICAvKipcbiAgICogUnVsZSB0byBtYW5kYXRlIHRoZSBwcmVzZW5jZSBvZiBsZXR0ZXJzIGluIHRoZSBwYXNzd29yZFxuICAgKlxuICAgKiBAcGFyYW0ge251bWJlcn0gW2NvdW50XSAtIG1pbmltdW0gbnVtYmVyIG9mIGxldHRlcnMgcmVxdWlyZWRcbiAgICovXG4gIGxldHRlcnMoY291bnQpIHtcbiAgICBjb3VudCAmJiBfdmFsaWRhdGVMZW5ndGgoY291bnQpO1xuICAgIHJldHVybiBfcmVnaXN0ZXIuY2FsbCh0aGlzLCAnbGV0dGVycycsIGFyZ3VtZW50cyk7XG4gIH1cblxuICAvKipcbiAgICogUnVsZSB0byBtYW5kYXRlIHRoZSBwcmVzZW5jZSBvZiBkaWdpdHMgaW4gdGhlIHBhc3N3b3JkXG4gICAqXG4gICAqIEBwYXJhbSB7bnVtYmVyfSBbY291bnRdIC0gbWluaW11bSBudW1iZXIgb2YgZGlnaXRzIHJlcXVpcmVkXG4gICAqL1xuICBkaWdpdHMoY291bnQpIHtcbiAgICBjb3VudCAmJiBfdmFsaWRhdGVMZW5ndGgoY291bnQpO1xuICAgIHJldHVybiBfcmVnaXN0ZXIuY2FsbCh0aGlzLCAnZGlnaXRzJywgYXJndW1lbnRzKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBSdWxlIHRvIG1hbmRhdGUgdGhlIHByZXNlbmNlIG9mIHN5bWJvbHMgaW4gdGhlIHBhc3N3b3JkXG4gICAqXG4gICAqIEBwYXJhbSB7bnVtYmVyfSBbY291bnRdIC0gbWluaW11bSBudW1iZXIgb2Ygc3ltYm9scyByZXF1aXJlZFxuICAgKi9cbiAgc3ltYm9scyhjb3VudCkge1xuICAgIGNvdW50ICYmIF92YWxpZGF0ZUxlbmd0aChjb3VudCk7XG4gICAgcmV0dXJuIF9yZWdpc3Rlci5jYWxsKHRoaXMsICdzeW1ib2xzJywgYXJndW1lbnRzKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBSdWxlIHRvIHNwZWNpZnkgYSBtaW5pbXVtIGxlbmd0aCBvZiB0aGUgcGFzc3dvcmRcbiAgICpcbiAgICogQHBhcmFtIHtudW1iZXJ9IG51bSAtIG1pbmltdW0gbGVuZ3RoXG4gICAqL1xuICBtaW4obnVtKSB7XG4gICAgX3ZhbGlkYXRlTGVuZ3RoKG51bSk7XG4gICAgcmV0dXJuIF9yZWdpc3Rlci5jYWxsKHRoaXMsICdtaW4nLCBhcmd1bWVudHMpO1xuICB9XG5cbiAgLyoqXG4gICAqIFJ1bGUgdG8gc3BlY2lmeSBhIG1heGltdW0gbGVuZ3RoIG9mIHRoZSBwYXNzd29yZFxuICAgKlxuICAgKiBAcGFyYW0ge251bWJlcn0gbnVtIC0gbWF4aW11bSBsZW5ndGhcbiAgICovXG4gIG1heChudW0pIHtcbiAgICBfdmFsaWRhdGVMZW5ndGgobnVtKTtcbiAgICByZXR1cm4gX3JlZ2lzdGVyLmNhbGwodGhpcywgJ21heCcsIGFyZ3VtZW50cyk7XG4gIH1cblxuICAvKipcbiAgICogUnVsZSB0byBtYW5kYXRlIHRoZSBwcmVzZW5jZSBvZiBsb3dlcmNhc2UgbGV0dGVycyBpbiB0aGUgcGFzc3dvcmRcbiAgICpcbiAgICogQHBhcmFtIHtudW1iZXJ9IFtjb3VudF0gLSBtaW5pbXVtIG51bWJlciBvZiBsb3dlcmNhc2UgbGV0dGVycyByZXF1aXJlZFxuICAgKi9cbiAgbG93ZXJjYXNlKGNvdW50KSB7XG4gICAgY291bnQgJiYgX3ZhbGlkYXRlTGVuZ3RoKGNvdW50KTtcbiAgICByZXR1cm4gX3JlZ2lzdGVyLmNhbGwodGhpcywgJ2xvd2VyY2FzZScsIGFyZ3VtZW50cyk7XG4gIH1cblxuICAvKipcbiAgICogUnVsZSB0byBtYW5kYXRlIHRoZSBwcmVzZW5jZSBvZiB1cHBlcmNhc2UgbGV0dGVycyBpbiB0aGUgcGFzc3dvcmRcbiAgICpcbiAgICogQHBhcmFtIHtudW1iZXJ9IFtjb3VudF0gLSBtaW5pbXVtIG51bWJlciBvZiB1cHBlcmNhc2UgbGV0dGVycyByZXF1aXJlZFxuICAgKi9cbiAgdXBwZXJjYXNlKGNvdW50KSB7XG4gICAgY291bnQgJiYgX3ZhbGlkYXRlTGVuZ3RoKGNvdW50KTtcbiAgICByZXR1cm4gX3JlZ2lzdGVyLmNhbGwodGhpcywgJ3VwcGVyY2FzZScsIGFyZ3VtZW50cyk7XG4gIH1cblxuICAvKipcbiAgICogUnVsZSB0byBtYW5kYXRlIHRoZSBwcmVzZW5jZSBvZiBzcGFjZSBpbiB0aGUgcGFzc3dvcmRcbiAgICogSXQgY2FuIGJlIHVzZWQgYWxvbmcgd2l0aCAnbm90JyB0byBub3QgYWxsb3cgc3BhY2VzXG4gICAqIGluIHRoZSBwYXNzd29yZFxuICAgKlxuICAgKiBAcGFyYW0ge251bWJlcn0gW2NvdW50XSAtIG1pbmltdW0gbnVtYmVyIG9mIHNwYWNlcyByZXF1aXJlZFxuICAgKi9cbiAgc3BhY2VzKGNvdW50KSB7XG4gICAgY291bnQgJiYgX3ZhbGlkYXRlTGVuZ3RoKGNvdW50KTtcbiAgICByZXR1cm4gX3JlZ2lzdGVyLmNhbGwodGhpcywgJ3NwYWNlcycsIGFyZ3VtZW50cyk7XG4gIH1cblxuICAvKipcbiAgICogUnVsZSB0byBpbnZlcnQgdGhlIGVmZmVjdHMgb2YgJ25vdCdcbiAgICogQXBhcnQgZnJvbSB0aGF0LCAnaGFzJyBpcyBhbHNvIHVzZWRcbiAgICogdG8gbWFrZSB0aGUgYXBpIHJlYWRhYmxlIGFuZCBjaGFpbmFibGVcbiAgICovXG4gIGhhcygpIHtcbiAgICByZXR1cm4gX3JlZ2lzdGVyLmNhbGwodGhpcywgJ2hhcycsIGFyZ3VtZW50cyk7XG4gIH1cblxuICAvKipcbiAgICogUnVsZSB0byBpbnZlcnQgdGhlIG5leHQgYXBwbGllZCBydWxlcy5cbiAgICogQWxsIHRoZSBydWxlcyBhcHBsaWVkIGFmdGVyICdub3QnIHdpbGwgaGF2ZSBvcHBvc2l0ZSBlZmZlY3QsXG4gICAqIHVudGlsICdoYXMnIHJ1bGUgaXMgYXBwbGllZFxuICAgKi9cbiAgbm90KCkge1xuICAgIHJldHVybiBfcmVnaXN0ZXIuY2FsbCh0aGlzLCAnbm90JywgYXJndW1lbnRzKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBSdWxlIHRvIGludmVydCB0aGUgZWZmZWN0cyBvZiAnbm90J1xuICAgKiBBcGFydCBmcm9tIHRoYXQsICdpcycgaXMgYWxzbyB1c2VkXG4gICAqIHRvIG1ha2UgdGhlIGFwaSByZWFkYWJsZSBhbmQgY2hhaW5hYmxlXG4gICAqL1xuICBpcygpIHtcbiAgICByZXR1cm4gX3JlZ2lzdGVyLmNhbGwodGhpcywgJ2lzJywgYXJndW1lbnRzKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBSdWxlIHRvIHdoaXRlbGlzdCB3b3JkcyB0byBiZSB1c2VkIGFzIHBhc3N3b3JkXG4gICAqXG4gICAqIEBwYXJhbSB7YXJyYXl9IGxpc3QgLSBsaXN0IG9mIHZhbHVlcyBhbGxvd2VkXG4gICAqL1xuICBvbmVPZigpIHtcbiAgICByZXR1cm4gX3JlZ2lzdGVyLmNhbGwodGhpcywgJ29uZU9mJywgYXJndW1lbnRzKTtcbiAgfVxufVxuXG5tb2R1bGUuZXhwb3J0cyA9IFBhc3N3b3JkVmFsaWRhdG9yO1xuIiwiLyoqXG4gKiBHZW5lcmljIG1ldGhvZCB0byB0ZXN0IHJlZ2V4XG4gKlxuICogQHByaXZhdGVcbiAqIEBwYXJhbSB7c3RyaW5nfSByZWdleCAtIHJlZ2V4IHRvIHRlc3RcbiAqICAgICAgICAgICAgICAgICAgICAgICAgICAgd2l0aCBwYXNzd29yZFxuICovXG52YXIgcmVnZXggPSByZXF1aXJlKCcuL2NvbnN0YW50cycpLnJlZ2V4O1xuXG5mdW5jdGlvbiBfcHJvY2VzcyhyZWdleHAsIHJlcGVhdCkge1xuICBpZiAocmVwZWF0ICYmIHJlcGVhdCA+IDEpIHtcbiAgICBjb25zdCBwYXJzZWRSZXBlYXQgPSBwYXJzZUludChyZXBlYXQsIDEwKTtcbiAgICByZXR1cm4gbmV3IFJlZ0V4cChyZWdleHAgKyAneycgKyBwYXJzZWRSZXBlYXQgKyAnLH0nKS50ZXN0KHRoaXMucGFzc3dvcmQpID09PSB0aGlzLnBvc2l0aXZlO1xuICB9XG4gIHJldHVybiBuZXcgUmVnRXhwKHJlZ2V4cCkudGVzdCh0aGlzLnBhc3N3b3JkKSA9PT0gdGhpcy5wb3NpdGl2ZTtcbn1cblxubW9kdWxlLmV4cG9ydHMgPSB7XG5cbiAgLyoqXG4gICAqIE1ldGhvZCB0byBpbnZlcnQgdGhlIG5leHQgdmFsaWRhdGlvbnNcbiAgICpcbiAgICogQHBhcmFtIHtSZWdFeHB9IFtzeW1ib2xdIC0gY3VzdG9tIFJlZ2V4IHdoaWNoIHNob3VsZCBub3QgYmUgcHJlc2VudFxuICAgKi9cbiAgbm90OiBmdW5jdGlvbiBub3Qoc3ltYm9sKSB7XG4gICAgdGhpcy5wb3NpdGl2ZSA9IGZhbHNlO1xuICAgIGlmIChzeW1ib2wpIHtcbiAgICAgIHJldHVybiBfcHJvY2Vzcy5jYWxsKHRoaXMsIHN5bWJvbCk7XG4gICAgfVxuICAgIHJldHVybiB0cnVlO1xuICB9LFxuXG4gIC8qKlxuICAgKiBNZXRob2QgdG8gaW52ZXJ0IHRoZSBlZmZlY3RzIG9mIG5vdCgpXG4gICAqXG4gICAqIEBwYXJhbSB7UmVnRXhwfSBbc3ltYm9sXSAtIGN1c3RvbSBSZWdleCB3aGljaCBzaG91bGQgYmUgcHJlc2VudFxuICAgKi9cbiAgaGFzOiBmdW5jdGlvbiBoYXMoc3ltYm9sKSB7XG4gICAgdGhpcy5wb3NpdGl2ZSA9IHRydWU7XG4gICAgaWYgKHN5bWJvbCkge1xuICAgICAgcmV0dXJuIF9wcm9jZXNzLmNhbGwodGhpcywgc3ltYm9sKTtcbiAgICB9XG4gICAgcmV0dXJuIHRydWU7XG4gIH0sXG5cbiAgLyoqXG4gICAqIE1ldGhvZCB0byBpbnZlcnQgdGhlIGVmZmVjdHMgb2Ygbm90KCkgYW5kXG4gICAqIHRvIG1ha2UgdGhlIGFwaSByZWFkYWJsZSBhbmQgY2hhaW5hYmxlXG4gICAqXG4gICAqL1xuICBpczogZnVuY3Rpb24gaXMoKSB7XG4gICAgdGhpcy5wb3NpdGl2ZSA9IHRydWU7XG4gICAgcmV0dXJuIHRydWU7XG4gIH0sXG5cbiAgLyoqXG4gICAqIE1ldGhvZCB0byBzcGVjaWZ5IGEgbWluaW11bSBsZW5ndGhcbiAgICpcbiAgICogQHBhcmFtIHtudW1iZXJ9IG51bSAtIG1pbmltdW0gbGVuZ3RoXG4gICAqL1xuICBtaW46IGZ1bmN0aW9uIG1pbihudW0pIHtcbiAgICByZXR1cm4gdGhpcy5wYXNzd29yZC5sZW5ndGggPj0gbnVtO1xuICB9LFxuXG4gIC8qKlxuICAgKiBNZXRob2QgdG8gc3BlY2lmeSBhIG1heGltdW0gbGVuZ3RoXG4gICAqXG4gICAqIEBwYXJhbSB7bnVtYmVyfSBudW0gLSBtYXhpbXVtIGxlbmd0aFxuICAgKi9cbiAgbWF4OiBmdW5jdGlvbiBtYXgobnVtKSB7XG4gICAgcmV0dXJuIHRoaXMucGFzc3dvcmQubGVuZ3RoIDw9IG51bTtcbiAgfSxcblxuICAvKipcbiAgICogTWV0aG9kIHRvIHZhbGlkYXRlIHRoZSBwcmVzZW5jZSBvZiBkaWdpdHNcbiAgICpcbiAgICogQHBhcmFtIHtudW1iZXJ9IHJlcGVhdCAtIGNvdW50IG9mIHJlcXVpcmVkIGRpZ2l0c1xuICAgKi9cbiAgZGlnaXRzOiBmdW5jdGlvbiBkaWdpdHMocmVwZWF0KSB7XG4gICAgcmV0dXJuIF9wcm9jZXNzLmNhbGwodGhpcywgcmVnZXguZGlnaXRzLCByZXBlYXQpO1xuICB9LFxuXG4gIC8qKlxuICAgKiBNZXRob2QgdG8gdmFsaWRhdGUgdGhlIHByZXNlbmNlIG9mIGxldHRlcnNcbiAgICpcbiAgICogQHBhcmFtIHtudW1iZXJ9IHJlcGVhdCAtIGNvdW50IG9mIHJlcXVpcmVkIGxldHRlcnNcbiAgICovXG4gIGxldHRlcnM6IGZ1bmN0aW9uIGxldHRlcnMocmVwZWF0KSB7XG4gICAgcmV0dXJuIF9wcm9jZXNzLmNhbGwodGhpcywgcmVnZXgubGV0dGVycywgcmVwZWF0KTtcbiAgfSxcblxuICAvKipcbiAgICogTWV0aG9kIHRvIHZhbGlkYXRlIHRoZSBwcmVzZW5jZSBvZiB1cHBlcmNhc2UgbGV0dGVyc1xuICAgKlxuICAgKiBAcGFyYW0ge251bWJlcn0gcmVwZWF0IC0gY291bnQgb2YgcmVxdWlyZWQgdXBwZXJjYXNlIGxldHRlcnNcbiAgICovXG4gIHVwcGVyY2FzZTogZnVuY3Rpb24gdXBwZXJjYXNlKHJlcGVhdCkge1xuICAgIGlmIChyZXBlYXQgJiYgcmVwZWF0ID4gMSkge1xuICAgICAgbGV0IGNoYXJhY3RlckluZGV4ID0gMDtcbiAgICAgIGxldCB1cHBlckNhc2VMZXR0ZXJzID0gMDtcblxuICAgICAgd2hpbGUgKCh1cHBlckNhc2VMZXR0ZXJzIDwgcmVwZWF0KSAmJiAoY2hhcmFjdGVySW5kZXggPCB0aGlzLnBhc3N3b3JkLmxlbmd0aCkpIHtcbiAgICAgICAgY29uc3QgY3VycmVudExldHRlciA9IHRoaXMucGFzc3dvcmQuY2hhckF0KGNoYXJhY3RlckluZGV4KTtcbiAgICAgICAgaWYgKGN1cnJlbnRMZXR0ZXIgIT09IGN1cnJlbnRMZXR0ZXIudG9Mb3dlckNhc2UoKSkge1xuICAgICAgICAgIHVwcGVyQ2FzZUxldHRlcnMrKztcbiAgICAgICAgfVxuICAgICAgICBjaGFyYWN0ZXJJbmRleCsrO1xuICAgICAgfVxuXG4gICAgICByZXR1cm4gKHVwcGVyQ2FzZUxldHRlcnMgPT09IHJlcGVhdCkgPT09IHRoaXMucG9zaXRpdmU7XG4gICAgfVxuICAgIHJldHVybiAodGhpcy5wYXNzd29yZCAhPT0gdGhpcy5wYXNzd29yZC50b0xvd2VyQ2FzZSgpKSA9PT0gdGhpcy5wb3NpdGl2ZTtcbiAgfSxcblxuICAvKipcbiAgICogTWV0aG9kIHRvIHZhbGlkYXRlIHRoZSBwcmVzZW5jZSBvZiBsb3dlcmNhc2UgbGV0dGVyc1xuICAgKlxuICAgKiBAcGFyYW0ge251bWJlcn0gcmVwZWF0IC0gY291bnQgb2YgcmVxdWlyZWQgbG93ZXJjYXNlIGxldHRlcnNcbiAgICovXG4gIGxvd2VyY2FzZTogZnVuY3Rpb24gbG93ZXJjYXNlKHJlcGVhdCkge1xuICAgIGlmIChyZXBlYXQgJiYgcmVwZWF0ID4gMSkge1xuICAgICAgbGV0IGNoYXJhY3RlckluZGV4ID0gMDtcbiAgICAgIGxldCBsb3dlckNhc2VMZXR0ZXJzID0gMDtcblxuICAgICAgd2hpbGUgKChsb3dlckNhc2VMZXR0ZXJzIDwgcmVwZWF0KSAmJiAoY2hhcmFjdGVySW5kZXggPCB0aGlzLnBhc3N3b3JkLmxlbmd0aCkpIHtcbiAgICAgICAgY29uc3QgY3VycmVudExldHRlciA9IHRoaXMucGFzc3dvcmQuY2hhckF0KGNoYXJhY3RlckluZGV4KTtcbiAgICAgICAgaWYgKGN1cnJlbnRMZXR0ZXIgIT09IGN1cnJlbnRMZXR0ZXIudG9VcHBlckNhc2UoKSkge1xuICAgICAgICAgIGxvd2VyQ2FzZUxldHRlcnMrKztcbiAgICAgICAgfVxuICAgICAgICBjaGFyYWN0ZXJJbmRleCsrO1xuICAgICAgfVxuXG4gICAgICByZXR1cm4gKGxvd2VyQ2FzZUxldHRlcnMgPT09IHJlcGVhdCkgPT09IHRoaXMucG9zaXRpdmU7XG4gICAgfVxuICAgIHJldHVybiAodGhpcy5wYXNzd29yZCAhPT0gdGhpcy5wYXNzd29yZC50b1VwcGVyQ2FzZSgpKSA9PT0gdGhpcy5wb3NpdGl2ZTtcbiAgfSxcblxuICAvKipcbiAgICogTWV0aG9kIHRvIHZhbGlkYXRlIHRoZSBwcmVzZW5jZSBvZiBzeW1ib2xzXG4gICAqXG4gICAqIEBwYXJhbSB7bnVtYmVyfSByZXBlYXQgLSBjb3VudCBvZiByZXF1aXJlZCBzeW1ib2xzXG4gICAqL1xuICBzeW1ib2xzOiBmdW5jdGlvbiBzeW1ib2xzKHJlcGVhdCkge1xuICAgIHJldHVybiBfcHJvY2Vzcy5jYWxsKHRoaXMsIHJlZ2V4LnN5bWJvbHMsIHJlcGVhdCk7XG4gIH0sXG5cbiAgLyoqXG4gICAqIE1ldGhvZCB0byB2YWxpZGF0ZSB0aGUgcHJlc2VuY2Ugb2Ygc3BhY2VcbiAgICpcbiAgICogQHBhcmFtIHtudW1iZXJ9IHJlcGVhdCAtIGNvdW50IG9mIHJlcXVpcmVkIHNwYWNlc1xuICAgKi9cbiAgc3BhY2VzOiBmdW5jdGlvbiBzcGFjZXMocmVwZWF0KSB7XG4gICAgcmV0dXJuIF9wcm9jZXNzLmNhbGwodGhpcywgcmVnZXguc3BhY2VzLCByZXBlYXQpO1xuICB9LFxuXG4gIC8qKlxuICAgKiBNZXRob2QgdG8gcHJvdmlkZSBwcmUtZGVmaW5lZCB2YWx1ZXMgZm9yIHBhc3N3b3JkXG4gICAqXG4gICAqIEBwYXJhbSB7YXJyYXl9IGxpc3QgLSBsaXN0IG9mIHZhbHVlcyBhbGxvd2VkXG4gICAqL1xuICBvbmVPZjogZnVuY3Rpb24gb25lT2YobGlzdCkge1xuICAgIHJldHVybiBsaXN0LmluZGV4T2YodGhpcy5wYXNzd29yZCkgPj0gMCA9PT0gdGhpcy5wb3NpdGl2ZTtcbiAgfVxufTtcbiIsImltcG9ydCBDb21wb25lbnQgZnJvbSAnU2hvcFVpL21vZGVscy9jb21wb25lbnQnO1xuaW1wb3J0IGRlYm91bmNlIGZyb20gJ2xvZGFzaC1lcy9kZWJvdW5jZSc7XG5pbXBvcnQgUGFzc3dvcmRWYWxpZGF0b3IgZnJvbSAncGFzc3dvcmQtdmFsaWRhdG9yJztcblxuZW51bSBDb21wbGV4aXR5V2VpZ2h0IHtcbiAgICBsb3dlcmNhc2UgPSAxMCxcbiAgICBkaWdpdHMgPSAxNSxcbiAgICB1cHBlcmNhc2UgPSAyMCxcbiAgICBzeW1ib2xzID0gMzAsXG4gICAgbWluID0gMjUsXG59XG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIFBhc3N3b3JkQ29tcGxleGl0eUluZGljYXRvciBleHRlbmRzIENvbXBvbmVudCB7XG4gICAgcHJvdGVjdGVkIGF2YWlsYWJsZVByb3BlcnRpZXMgPSBbJ21pbicsICdsb3dlcmNhc2UnLCAndXBwZXJjYXNlJywgJ2RpZ2l0cycsICdzeW1ib2xzJ107XG4gICAgLyogdHNsaW50OmRpc2FibGU6IG5vLW1hZ2ljLW51bWJlcnMgKi9cbiAgICBwcm90ZWN0ZWQgY29tcGxleGl0eUdyYWRhdGlvbiA9IG5ldyBNYXAoW1xuICAgICAgICBbJ3dlYWsnLCAwXSxcbiAgICAgICAgWydtZWRpdW0nLCAyNV0sXG4gICAgICAgIFsnc3Ryb25nJywgNTBdLFxuICAgICAgICBbJ3Zlcnktc3Ryb25nJywgNzVdLFxuICAgIF0pO1xuICAgIC8qIHRzbGludDplbmFibGUgKi9cbiAgICBwcm90ZWN0ZWQgY3VycmVudENvbXBsZXhpdHkgPSAnJztcbiAgICBwcm90ZWN0ZWQgbWF4UGFzc3dvcmRDb21wbGV4aXR5ID0gMDtcbiAgICBwcm90ZWN0ZWQgZmFjdG9yID0gMTAwO1xuICAgIHByb3RlY3RlZCBpbnB1dEVsZW1lbnQ6IEhUTUxJbnB1dEVsZW1lbnQ7XG4gICAgcHJvdGVjdGVkIG5vdGlmaWNhdGlvbkVsZW1lbnQ6IEhUTUxFbGVtZW50O1xuICAgIHByb3RlY3RlZCBpbmRpY2F0b3JMaXN0RWxlbWVudDogSFRNTEVsZW1lbnQ7XG4gICAgcHJvdGVjdGVkIHNjaGVtYTogUGFzc3dvcmRWYWxpZGF0b3I7XG5cbiAgICBwcm90ZWN0ZWQgcmVhZHlDYWxsYmFjaygpOiB2b2lkIHt9XG5cbiAgICBwcm90ZWN0ZWQgaW5pdCgpOiB2b2lkIHtcbiAgICAgICAgdGhpcy5pbnB1dEVsZW1lbnQgPSA8SFRNTElucHV0RWxlbWVudD5kb2N1bWVudC5nZXRFbGVtZW50c0J5Q2xhc3NOYW1lKHRoaXMuaW5wdXRDbGFzc05hbWUpWzBdO1xuICAgICAgICB0aGlzLmluZGljYXRvckxpc3RFbGVtZW50ID0gPEhUTUxFbGVtZW50PnRoaXMuZ2V0RWxlbWVudHNCeUNsYXNzTmFtZSh0aGlzLmluZGljYXRvckxpc3RDbGFzc05hbWUpWzBdO1xuICAgICAgICB0aGlzLm5vdGlmaWNhdGlvbkVsZW1lbnQgPSA8SFRNTEVsZW1lbnQ+dGhpcy5nZXRFbGVtZW50c0J5Q2xhc3NOYW1lKHRoaXMuYWRkaXRpb25hbE1lc3NhZ2VDbGFzc05hbWUpWzBdO1xuICAgICAgICB0aGlzLnNjaGVtYSA9IG5ldyBQYXNzd29yZFZhbGlkYXRvcigpO1xuXG4gICAgICAgIHRoaXMuaW5pdFZhbGlkYXRvcigpO1xuICAgICAgICB0aGlzLm1hcEV2ZW50cygpO1xuICAgIH1cblxuICAgIHByb3RlY3RlZCBtYXBFdmVudHMoKTogdm9pZCB7XG4gICAgICAgIHRoaXMubWFwSW5wdXRFbGVtZW50S2V5VXBFdmVudCgpO1xuICAgIH1cblxuICAgIHByb3RlY3RlZCBtYXBJbnB1dEVsZW1lbnRLZXlVcEV2ZW50KCk6IHZvaWQge1xuICAgICAgICB0aGlzLmlucHV0RWxlbWVudC5hZGRFdmVudExpc3RlbmVyKFxuICAgICAgICAgICAgJ2tleXVwJyxcbiAgICAgICAgICAgIGRlYm91bmNlKCgpID0+IHRoaXMub25JbnB1dEtleVVwKCksIHRoaXMuZGVib3VuY2VEZWxheSksXG4gICAgICAgICk7XG4gICAgfVxuXG4gICAgcHJvdGVjdGVkIGluaXRWYWxpZGF0b3IoKTogdm9pZCB7XG4gICAgICAgIHRoaXMuYXZhaWxhYmxlUHJvcGVydGllcy5mb3JFYWNoKChwcm9wZXJ0eTogc3RyaW5nKSA9PiB7XG4gICAgICAgICAgICB0aGlzLnNldFZhbGlkYXRpb24ocHJvcGVydHkpO1xuICAgICAgICAgICAgdGhpcy5pbmNyZWFzZU1heFBhc3N3b3JkQ29tcGxleGl0eShwcm9wZXJ0eSk7XG4gICAgICAgIH0pO1xuICAgIH1cblxuICAgIHByb3RlY3RlZCBpbmNyZWFzZU1heFBhc3N3b3JkQ29tcGxleGl0eShwcm9wZXJ0eTogc3RyaW5nKTogdm9pZCB7XG4gICAgICAgIHRoaXMubWF4UGFzc3dvcmRDb21wbGV4aXR5ICs9IENvbXBsZXhpdHlXZWlnaHRbcHJvcGVydHldO1xuICAgIH1cblxuICAgIHByb3RlY3RlZCBzZXRWYWxpZGF0aW9uKHByb3BlcnR5OiBzdHJpbmcpOiB2b2lkIHtcbiAgICAgICAgY29uc3QgcHJvcGVydHlWYWx1ZSA9IHRoaXNbcHJvcGVydHldO1xuXG4gICAgICAgIGlmIChwcm9wZXJ0eSA9PT0gJ21pbicpIHtcbiAgICAgICAgICAgIHRoaXMuc2V0SXNWYWxpZGF0aW9uVHlwZShwcm9wZXJ0eSwgcHJvcGVydHlWYWx1ZSk7XG5cbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuXG4gICAgICAgIHRoaXMuc2V0SGFzVmFsaWRhdGlvblR5cGUocHJvcGVydHksIHByb3BlcnR5VmFsdWUpO1xuICAgIH1cblxuICAgIHByb3RlY3RlZCBzZXRIYXNWYWxpZGF0aW9uVHlwZShwcm9wZXJ0eTogc3RyaW5nLCB2YWx1ZTogbnVtYmVyKTogdm9pZCB7XG4gICAgICAgIHRoaXMuc2NoZW1hLmhhcygpW3Byb3BlcnR5XSh2YWx1ZSk7XG4gICAgfVxuXG4gICAgcHJvdGVjdGVkIHNldElzVmFsaWRhdGlvblR5cGUocHJvcGVydHk6IHN0cmluZywgdmFsdWU6IG51bWJlcik6IHZvaWQge1xuICAgICAgICB0aGlzLnNjaGVtYS5pcygpW3Byb3BlcnR5XSh2YWx1ZSk7XG4gICAgfVxuXG4gICAgcHJvdGVjdGVkIG9uSW5wdXRLZXlVcCgpOiB2b2lkIHtcbiAgICAgICAgY29uc3QgaW5wdXRWYWx1ZSA9IHRoaXMuaW5wdXRFbGVtZW50LnZhbHVlO1xuICAgICAgICBjb25zdCBmYWlsc0xpc3QgPSB0aGlzLnNjaGVtYS52YWxpZGF0ZShpbnB1dFZhbHVlLCB7IGxpc3Q6IHRydWUgfSk7XG4gICAgICAgIGxldCBwYXNzd29yZFZhbGlkYXRvck1hcmsgPSB0aGlzLm1heFBhc3N3b3JkQ29tcGxleGl0eTtcblxuICAgICAgICBmYWlsc0xpc3QuZm9yRWFjaCgocHJvcGVydHk6IHN0cmluZykgPT4ge1xuICAgICAgICAgICAgcGFzc3dvcmRWYWxpZGF0b3JNYXJrIC09IENvbXBsZXhpdHlXZWlnaHRbcHJvcGVydHldO1xuICAgICAgICB9KTtcblxuICAgICAgICB0aGlzLnZhbGlkYXRlUGFzc3dvcmQocGFzc3dvcmRWYWxpZGF0b3JNYXJrKTtcbiAgICB9XG5cbiAgICBwcm90ZWN0ZWQgdmFsaWRhdGVQYXNzd29yZChwYXNzd29yZFZhbGlkYXRvck1hcms6IG51bWJlcik6IHZvaWQge1xuICAgICAgICBjb25zdCBwYXNzd29yZENvbXBsZXhpdHkgPSAocGFzc3dvcmRWYWxpZGF0b3JNYXJrIC8gdGhpcy5tYXhQYXNzd29yZENvbXBsZXhpdHkpICogdGhpcy5mYWN0b3I7XG5cbiAgICAgICAgdGhpcy5jb21wbGV4aXR5R3JhZGF0aW9uLmZvckVhY2goKHZhbHVlOiBudW1iZXIsIGtleTogc3RyaW5nKSA9PiB7XG4gICAgICAgICAgICBpZiAocGFzc3dvcmRDb21wbGV4aXR5ID49IHZhbHVlKSB7XG4gICAgICAgICAgICAgICAgdGhpcy51cGRhdGVWYWxpZGF0aW9uKGtleSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuICAgIH1cblxuICAgIHByb3RlY3RlZCB1cGRhdGVWYWxpZGF0aW9uKGNvbXBsZXhpdHlNb2RpZmllcjogc3RyaW5nKTogdm9pZCB7XG4gICAgICAgIHRoaXMudXBkYXRlTW9kaWZpZXIodGhpcy5pbmRpY2F0b3JMaXN0RWxlbWVudCwgdGhpcy5pbmRpY2F0b3JMaXN0Q2xhc3NOYW1lLCBjb21wbGV4aXR5TW9kaWZpZXIpO1xuICAgICAgICB0aGlzLnVwZGF0ZU1vZGlmaWVyKHRoaXMubm90aWZpY2F0aW9uRWxlbWVudCwgdGhpcy5hZGRpdGlvbmFsTWVzc2FnZUNsYXNzTmFtZSwgY29tcGxleGl0eU1vZGlmaWVyKTtcblxuICAgICAgICB0aGlzLmN1cnJlbnRDb21wbGV4aXR5ID0gY29tcGxleGl0eU1vZGlmaWVyO1xuICAgIH1cblxuICAgIHByb3RlY3RlZCB1cGRhdGVNb2RpZmllcihlbGVtZW50OiBFbGVtZW50LCBjbGFzc05hbWU6IHN0cmluZywgY29tcGxleGl0eU1vZGlmaWVyOiBzdHJpbmcpOiB2b2lkIHtcbiAgICAgICAgY29uc3QgY2xhc3NMaXN0ID0gZWxlbWVudC5jbGFzc0xpc3Q7XG5cbiAgICAgICAgY2xhc3NMaXN0LnJlbW92ZShgJHtjbGFzc05hbWV9LS0ke3RoaXMuY3VycmVudENvbXBsZXhpdHl9YCk7XG4gICAgICAgIGNsYXNzTGlzdC5hZGQoYCR7Y2xhc3NOYW1lfS0tJHtjb21wbGV4aXR5TW9kaWZpZXJ9YCk7XG4gICAgfVxuXG4gICAgcHJvdGVjdGVkIGdldCBpbnB1dENsYXNzTmFtZSgpOiBzdHJpbmcge1xuICAgICAgICByZXR1cm4gdGhpcy5nZXRBdHRyaWJ1dGUoJ2lucHV0LWNsYXNzLW5hbWUnKTtcbiAgICB9XG5cbiAgICBwcm90ZWN0ZWQgZ2V0IGluZGljYXRvckxpc3RDbGFzc05hbWUoKTogc3RyaW5nIHtcbiAgICAgICAgcmV0dXJuIGAke3RoaXMubmFtZX1fX2luZGljYXRvci1saXN0YDtcbiAgICB9XG5cbiAgICBwcm90ZWN0ZWQgZ2V0IGFkZGl0aW9uYWxNZXNzYWdlQ2xhc3NOYW1lKCk6IHN0cmluZyB7XG4gICAgICAgIHJldHVybiBgJHt0aGlzLm5hbWV9X19hZGRpdGlvbmFsLW1lc3NhZ2VgO1xuICAgIH1cblxuICAgIHByb3RlY3RlZCBnZXQgZGVib3VuY2VEZWxheSgpOiBudW1iZXIge1xuICAgICAgICByZXR1cm4gTnVtYmVyKHRoaXMuZ2V0QXR0cmlidXRlKCdkZWJvdW5jZS1kZWxheScpKTtcbiAgICB9XG5cbiAgICBwcm90ZWN0ZWQgZ2V0IG1pbigpOiBudW1iZXIge1xuICAgICAgICByZXR1cm4gTnVtYmVyKHRoaXMuZ2V0QXR0cmlidXRlKCdtaW4nKSk7XG4gICAgfVxuXG4gICAgcHJvdGVjdGVkIGdldCBsb3dlcmNhc2UoKTogbnVtYmVyIHtcbiAgICAgICAgcmV0dXJuIE51bWJlcih0aGlzLmdldEF0dHJpYnV0ZSgnbG93ZXJjYXNlJykpO1xuICAgIH1cblxuICAgIHByb3RlY3RlZCBnZXQgdXBwZXJjYXNlKCk6IG51bWJlciB7XG4gICAgICAgIHJldHVybiBOdW1iZXIodGhpcy5nZXRBdHRyaWJ1dGUoJ3VwcGVyY2FzZScpKTtcbiAgICB9XG5cbiAgICBwcm90ZWN0ZWQgZ2V0IGRpZ2l0cygpOiBudW1iZXIge1xuICAgICAgICByZXR1cm4gTnVtYmVyKHRoaXMuZ2V0QXR0cmlidXRlKCdkaWdpdHMnKSk7XG4gICAgfVxuXG4gICAgcHJvdGVjdGVkIGdldCBzeW1ib2xzKCk6IG51bWJlciB7XG4gICAgICAgIHJldHVybiBOdW1iZXIodGhpcy5nZXRBdHRyaWJ1dGUoJ3N5bWJvbHMnKSk7XG4gICAgfVxufVxuIl0sInNvdXJjZVJvb3QiOiIifQ==