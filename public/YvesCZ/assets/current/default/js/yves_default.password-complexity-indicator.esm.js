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
/* harmony import */ var ShopUi_models_component__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ShopUi/models/component */ "./vendor/spryker-shop/shop-ui/src/SprykerShop/Yves/ShopUi/Theme/default/models/component.ts");
/* harmony import */ var lodash_es_debounce__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! lodash-es/debounce */ "./node_modules/lodash-es/debounce.js");
/* harmony import */ var password_validator__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! password-validator */ "./node_modules/password-validator/src/index.js");
/* harmony import */ var password_validator__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(password_validator__WEBPACK_IMPORTED_MODULE_2__);
function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }




var ComplexityWeight;

(function (ComplexityWeight) {
  ComplexityWeight[ComplexityWeight["lowercase"] = 10] = "lowercase";
  ComplexityWeight[ComplexityWeight["digits"] = 15] = "digits";
  ComplexityWeight[ComplexityWeight["uppercase"] = 20] = "uppercase";
  ComplexityWeight[ComplexityWeight["symbols"] = 30] = "symbols";
  ComplexityWeight[ComplexityWeight["min"] = 25] = "min";
})(ComplexityWeight || (ComplexityWeight = {}));

class PasswordComplexityIndicator extends ShopUi_models_component__WEBPACK_IMPORTED_MODULE_0__["default"] {
  constructor() {
    super(...arguments);

    _defineProperty(this, "availableProperties", ['min', 'lowercase', 'uppercase', 'digits', 'symbols']);

    _defineProperty(this, "complexityGradation", new Map([['weak', 0], ['medium', 25], ['strong', 50], ['very-strong', 75]]));

    _defineProperty(this, "currentComplexity", '');

    _defineProperty(this, "maxPasswordComplexity", 0);

    _defineProperty(this, "factor", 100);

    _defineProperty(this, "inputElement", void 0);

    _defineProperty(this, "notificationElement", void 0);

    _defineProperty(this, "indicatorListElement", void 0);

    _defineProperty(this, "schema", void 0);
  }

  readyCallback() {}

  init() {
    this.inputElement = document.getElementsByClassName(this.inputClassName)[0];
    this.indicatorListElement = this.getElementsByClassName(this.indicatorListClassName)[0];
    this.notificationElement = this.getElementsByClassName(this.additionalMessageClassName)[0];
    this.schema = new password_validator__WEBPACK_IMPORTED_MODULE_2___default.a();
    this.initValidator();
    this.mapEvents();
  }

  mapEvents() {
    this.mapInputElementKeyUpEvent();
  }

  mapInputElementKeyUpEvent() {
    this.inputElement.addEventListener('keyup', Object(lodash_es_debounce__WEBPACK_IMPORTED_MODULE_1__["default"])(() => this.onInputKeyUp(), this.debounceDelay));
  }

  initValidator() {
    this.availableProperties.forEach(property => {
      this.setValidation(property);
      this.increaseMaxPasswordComplexity(property);
    });
  }

  increaseMaxPasswordComplexity(property) {
    this.maxPasswordComplexity += ComplexityWeight[property];
  }

  setValidation(property) {
    var propertyValue = this[property];

    if (property === 'min') {
      this.setIsValidationType(property, propertyValue);
      return;
    }

    this.setHasValidationType(property, propertyValue);
  }

  setHasValidationType(property, value) {
    this.schema.has()[property](value);
  }

  setIsValidationType(property, value) {
    this.schema.is()[property](value);
  }

  onInputKeyUp() {
    var inputValue = this.inputElement.value;
    var failsList = this.schema.validate(inputValue, {
      list: true
    });
    var passwordValidatorMark = this.maxPasswordComplexity;
    failsList.forEach(property => {
      passwordValidatorMark -= ComplexityWeight[property];
    });
    this.validatePassword(passwordValidatorMark);
  }

  validatePassword(passwordValidatorMark) {
    var passwordComplexity = passwordValidatorMark / this.maxPasswordComplexity * this.factor;
    this.complexityGradation.forEach((value, key) => {
      if (passwordComplexity >= value) {
        this.updateValidation(key);
      }
    });
  }

  updateValidation(complexityModifier) {
    this.updateModifier(this.indicatorListElement, this.indicatorListClassName, complexityModifier);
    this.updateModifier(this.notificationElement, this.additionalMessageClassName, complexityModifier);
    this.currentComplexity = complexityModifier;
  }

  updateModifier(element, className, complexityModifier) {
    var classList = element.classList;
    classList.remove(className + "--" + this.currentComplexity);
    classList.add(className + "--" + complexityModifier);
  }

  get inputClassName() {
    return this.getAttribute('input-class-name');
  }

  get indicatorListClassName() {
    return this.name + "__indicator-list";
  }

  get additionalMessageClassName() {
    return this.name + "__additional-message";
  }

  get debounceDelay() {
    return Number(this.getAttribute('debounce-delay'));
  }

  get min() {
    return Number(this.getAttribute('min'));
  }

  get lowercase() {
    return Number(this.getAttribute('lowercase'));
  }

  get uppercase() {
    return Number(this.getAttribute('uppercase'));
  }

  get digits() {
    return Number(this.getAttribute('digits'));
  }

  get symbols() {
    return Number(this.getAttribute('symbols'));
  }

}

/***/ })

}]);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvcGFzc3dvcmQtdmFsaWRhdG9yL3NyYy9jb25zdGFudHMuanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL3Bhc3N3b3JkLXZhbGlkYXRvci9zcmMvaW5kZXguanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL3Bhc3N3b3JkLXZhbGlkYXRvci9zcmMvbGliLmpzIiwid2VicGFjazovLy8uL3ZlbmRvci9zcHJ5a2VyLXNob3Avc2hvcC11aS9zcmMvU3ByeWtlclNob3AvWXZlcy9TaG9wVWkvVGhlbWUvZGVmYXVsdC9jb21wb25lbnRzL21vbGVjdWxlcy9wYXNzd29yZC1jb21wbGV4aXR5LWluZGljYXRvci9wYXNzd29yZC1jb21wbGV4aXR5LWluZGljYXRvci50cyJdLCJuYW1lcyI6WyJDb21wbGV4aXR5V2VpZ2h0IiwiUGFzc3dvcmRDb21wbGV4aXR5SW5kaWNhdG9yIiwiQ29tcG9uZW50IiwiTWFwIiwicmVhZHlDYWxsYmFjayIsImluaXQiLCJpbnB1dEVsZW1lbnQiLCJkb2N1bWVudCIsImdldEVsZW1lbnRzQnlDbGFzc05hbWUiLCJpbnB1dENsYXNzTmFtZSIsImluZGljYXRvckxpc3RFbGVtZW50IiwiaW5kaWNhdG9yTGlzdENsYXNzTmFtZSIsIm5vdGlmaWNhdGlvbkVsZW1lbnQiLCJhZGRpdGlvbmFsTWVzc2FnZUNsYXNzTmFtZSIsInNjaGVtYSIsIlBhc3N3b3JkVmFsaWRhdG9yIiwiaW5pdFZhbGlkYXRvciIsIm1hcEV2ZW50cyIsIm1hcElucHV0RWxlbWVudEtleVVwRXZlbnQiLCJhZGRFdmVudExpc3RlbmVyIiwiZGVib3VuY2UiLCJvbklucHV0S2V5VXAiLCJkZWJvdW5jZURlbGF5IiwiYXZhaWxhYmxlUHJvcGVydGllcyIsImZvckVhY2giLCJwcm9wZXJ0eSIsInNldFZhbGlkYXRpb24iLCJpbmNyZWFzZU1heFBhc3N3b3JkQ29tcGxleGl0eSIsIm1heFBhc3N3b3JkQ29tcGxleGl0eSIsInByb3BlcnR5VmFsdWUiLCJzZXRJc1ZhbGlkYXRpb25UeXBlIiwic2V0SGFzVmFsaWRhdGlvblR5cGUiLCJ2YWx1ZSIsImhhcyIsImlzIiwiaW5wdXRWYWx1ZSIsImZhaWxzTGlzdCIsInZhbGlkYXRlIiwibGlzdCIsInBhc3N3b3JkVmFsaWRhdG9yTWFyayIsInZhbGlkYXRlUGFzc3dvcmQiLCJwYXNzd29yZENvbXBsZXhpdHkiLCJmYWN0b3IiLCJjb21wbGV4aXR5R3JhZGF0aW9uIiwia2V5IiwidXBkYXRlVmFsaWRhdGlvbiIsImNvbXBsZXhpdHlNb2RpZmllciIsInVwZGF0ZU1vZGlmaWVyIiwiY3VycmVudENvbXBsZXhpdHkiLCJlbGVtZW50IiwiY2xhc3NOYW1lIiwiY2xhc3NMaXN0IiwicmVtb3ZlIiwiYWRkIiwiZ2V0QXR0cmlidXRlIiwibmFtZSIsIk51bWJlciIsIm1pbiIsImxvd2VyY2FzZSIsInVwcGVyY2FzZSIsImRpZ2l0cyIsInN5bWJvbHMiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7OztBQUFBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsR0FBRztBQUNIO0FBQ0E7QUFDQTtBQUNBLDJEQUEyRCxHQUFHLFVBQVU7QUFDeEU7QUFDQTtBQUNBOzs7Ozs7Ozs7Ozs7QUNYQSxVQUFVLG1CQUFPLENBQUMsMkRBQU87QUFDekIsWUFBWSxtQkFBTyxDQUFDLHVFQUFhOztBQUVqQztBQUNBO0FBQ0E7QUFDQTtBQUNBLFdBQVcsT0FBTztBQUNsQjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFdBQVcsT0FBTztBQUNsQixZQUFZLFFBQVE7QUFDcEI7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFdBQVcsT0FBTztBQUNsQixXQUFXLE1BQU07QUFDakI7QUFDQTtBQUNBO0FBQ0Esd0JBQXdCLGdDQUFnQztBQUN4RDtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxhQUFhLE9BQU87QUFDcEIsYUFBYSxPQUFPO0FBQ3BCLGFBQWEsUUFBUTtBQUNyQjtBQUNBLGNBQWMsY0FBYztBQUM1QjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxPQUFPO0FBQ1A7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLGFBQWEsT0FBTztBQUNwQjtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLGFBQWEsT0FBTztBQUNwQjtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLGFBQWEsT0FBTztBQUNwQjtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLGFBQWEsT0FBTztBQUNwQjtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLGFBQWEsT0FBTztBQUNwQjtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLGFBQWEsT0FBTztBQUNwQjtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLGFBQWEsT0FBTztBQUNwQjtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxhQUFhLE9BQU87QUFDcEI7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxhQUFhLE1BQU07QUFDbkI7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7Ozs7Ozs7Ozs7O0FDMU1BO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsV0FBVyxPQUFPO0FBQ2xCO0FBQ0E7QUFDQSxZQUFZLG1CQUFPLENBQUMsdUVBQWE7O0FBRWpDO0FBQ0E7QUFDQTtBQUNBLGlDQUFpQyxzQkFBc0I7QUFDdkQ7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLGFBQWEsT0FBTztBQUNwQjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEdBQUc7O0FBRUg7QUFDQTtBQUNBO0FBQ0EsYUFBYSxPQUFPO0FBQ3BCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsR0FBRzs7QUFFSDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsR0FBRzs7QUFFSDtBQUNBO0FBQ0E7QUFDQSxhQUFhLE9BQU87QUFDcEI7QUFDQTtBQUNBO0FBQ0EsR0FBRzs7QUFFSDtBQUNBO0FBQ0E7QUFDQSxhQUFhLE9BQU87QUFDcEI7QUFDQTtBQUNBO0FBQ0EsR0FBRzs7QUFFSDtBQUNBO0FBQ0E7QUFDQSxhQUFhLE9BQU87QUFDcEI7QUFDQTtBQUNBO0FBQ0EsR0FBRzs7QUFFSDtBQUNBO0FBQ0E7QUFDQSxhQUFhLE9BQU87QUFDcEI7QUFDQTtBQUNBO0FBQ0EsR0FBRzs7QUFFSDtBQUNBO0FBQ0E7QUFDQSxhQUFhLE9BQU87QUFDcEI7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxHQUFHOztBQUVIO0FBQ0E7QUFDQTtBQUNBLGFBQWEsT0FBTztBQUNwQjtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLEdBQUc7O0FBRUg7QUFDQTtBQUNBO0FBQ0EsYUFBYSxPQUFPO0FBQ3BCO0FBQ0E7QUFDQTtBQUNBLEdBQUc7O0FBRUg7QUFDQTtBQUNBO0FBQ0EsYUFBYSxPQUFPO0FBQ3BCO0FBQ0E7QUFDQTtBQUNBLEdBQUc7O0FBRUg7QUFDQTtBQUNBO0FBQ0EsYUFBYSxNQUFNO0FBQ25CO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQ25LQTtBQUNBO0FBQ0E7SUFFS0EsZ0I7O1dBQUFBLGdCO0FBQUFBLGtCLENBQUFBLGdCO0FBQUFBLGtCLENBQUFBLGdCO0FBQUFBLGtCLENBQUFBLGdCO0FBQUFBLGtCLENBQUFBLGdCO0FBQUFBLGtCLENBQUFBLGdCO0dBQUFBLGdCLEtBQUFBLGdCOztBQVFVLE1BQU1DLDJCQUFOLFNBQTBDQywrREFBMUMsQ0FBb0Q7QUFBQTtBQUFBOztBQUFBLGlEQUMvQixDQUFDLEtBQUQsRUFBUSxXQUFSLEVBQXFCLFdBQXJCLEVBQWtDLFFBQWxDLEVBQTRDLFNBQTVDLENBRCtCOztBQUFBLGlEQUcvQixJQUFJQyxHQUFKLENBQVEsQ0FDcEMsQ0FBQyxNQUFELEVBQVMsQ0FBVCxDQURvQyxFQUVwQyxDQUFDLFFBQUQsRUFBVyxFQUFYLENBRm9DLEVBR3BDLENBQUMsUUFBRCxFQUFXLEVBQVgsQ0FIb0MsRUFJcEMsQ0FBQyxhQUFELEVBQWdCLEVBQWhCLENBSm9DLENBQVIsQ0FIK0I7O0FBQUEsK0NBVWpDLEVBVmlDOztBQUFBLG1EQVc3QixDQVg2Qjs7QUFBQSxvQ0FZNUMsR0FaNEM7O0FBQUE7O0FBQUE7O0FBQUE7O0FBQUE7QUFBQTs7QUFrQnJEQyxlQUFWLEdBQWdDLENBQUU7O0FBRXhCQyxNQUFWLEdBQXVCO0FBQ25CLFNBQUtDLFlBQUwsR0FBc0NDLFFBQVEsQ0FBQ0Msc0JBQVQsQ0FBZ0MsS0FBS0MsY0FBckMsRUFBcUQsQ0FBckQsQ0FBdEM7QUFDQSxTQUFLQyxvQkFBTCxHQUF5QyxLQUFLRixzQkFBTCxDQUE0QixLQUFLRyxzQkFBakMsRUFBeUQsQ0FBekQsQ0FBekM7QUFDQSxTQUFLQyxtQkFBTCxHQUF3QyxLQUFLSixzQkFBTCxDQUE0QixLQUFLSywwQkFBakMsRUFBNkQsQ0FBN0QsQ0FBeEM7QUFDQSxTQUFLQyxNQUFMLEdBQWMsSUFBSUMseURBQUosRUFBZDtBQUVBLFNBQUtDLGFBQUw7QUFDQSxTQUFLQyxTQUFMO0FBQ0g7O0FBRVNBLFdBQVYsR0FBNEI7QUFDeEIsU0FBS0MseUJBQUw7QUFDSDs7QUFFU0EsMkJBQVYsR0FBNEM7QUFDeEMsU0FBS1osWUFBTCxDQUFrQmEsZ0JBQWxCLENBQ0ksT0FESixFQUVJQyxrRUFBUSxDQUFDLE1BQU0sS0FBS0MsWUFBTCxFQUFQLEVBQTRCLEtBQUtDLGFBQWpDLENBRlo7QUFJSDs7QUFFU04sZUFBVixHQUFnQztBQUM1QixTQUFLTyxtQkFBTCxDQUF5QkMsT0FBekIsQ0FBa0NDLFFBQUQsSUFBc0I7QUFDbkQsV0FBS0MsYUFBTCxDQUFtQkQsUUFBbkI7QUFDQSxXQUFLRSw2QkFBTCxDQUFtQ0YsUUFBbkM7QUFDSCxLQUhEO0FBSUg7O0FBRVNFLCtCQUFWLENBQXdDRixRQUF4QyxFQUFnRTtBQUM1RCxTQUFLRyxxQkFBTCxJQUE4QjVCLGdCQUFnQixDQUFDeUIsUUFBRCxDQUE5QztBQUNIOztBQUVTQyxlQUFWLENBQXdCRCxRQUF4QixFQUFnRDtBQUM1QyxRQUFNSSxhQUFhLEdBQUcsS0FBS0osUUFBTCxDQUF0Qjs7QUFFQSxRQUFJQSxRQUFRLEtBQUssS0FBakIsRUFBd0I7QUFDcEIsV0FBS0ssbUJBQUwsQ0FBeUJMLFFBQXpCLEVBQW1DSSxhQUFuQztBQUVBO0FBQ0g7O0FBRUQsU0FBS0Usb0JBQUwsQ0FBMEJOLFFBQTFCLEVBQW9DSSxhQUFwQztBQUNIOztBQUVTRSxzQkFBVixDQUErQk4sUUFBL0IsRUFBaURPLEtBQWpELEVBQXNFO0FBQ2xFLFNBQUtsQixNQUFMLENBQVltQixHQUFaLEdBQWtCUixRQUFsQixFQUE0Qk8sS0FBNUI7QUFDSDs7QUFFU0YscUJBQVYsQ0FBOEJMLFFBQTlCLEVBQWdETyxLQUFoRCxFQUFxRTtBQUNqRSxTQUFLbEIsTUFBTCxDQUFZb0IsRUFBWixHQUFpQlQsUUFBakIsRUFBMkJPLEtBQTNCO0FBQ0g7O0FBRVNYLGNBQVYsR0FBK0I7QUFDM0IsUUFBTWMsVUFBVSxHQUFHLEtBQUs3QixZQUFMLENBQWtCMEIsS0FBckM7QUFDQSxRQUFNSSxTQUFTLEdBQUcsS0FBS3RCLE1BQUwsQ0FBWXVCLFFBQVosQ0FBcUJGLFVBQXJCLEVBQWlDO0FBQUVHLFVBQUksRUFBRTtBQUFSLEtBQWpDLENBQWxCO0FBQ0EsUUFBSUMscUJBQXFCLEdBQUcsS0FBS1gscUJBQWpDO0FBRUFRLGFBQVMsQ0FBQ1osT0FBVixDQUFtQkMsUUFBRCxJQUFzQjtBQUNwQ2MsMkJBQXFCLElBQUl2QyxnQkFBZ0IsQ0FBQ3lCLFFBQUQsQ0FBekM7QUFDSCxLQUZEO0FBSUEsU0FBS2UsZ0JBQUwsQ0FBc0JELHFCQUF0QjtBQUNIOztBQUVTQyxrQkFBVixDQUEyQkQscUJBQTNCLEVBQWdFO0FBQzVELFFBQU1FLGtCQUFrQixHQUFJRixxQkFBcUIsR0FBRyxLQUFLWCxxQkFBOUIsR0FBdUQsS0FBS2MsTUFBdkY7QUFFQSxTQUFLQyxtQkFBTCxDQUF5Qm5CLE9BQXpCLENBQWlDLENBQUNRLEtBQUQsRUFBZ0JZLEdBQWhCLEtBQWdDO0FBQzdELFVBQUlILGtCQUFrQixJQUFJVCxLQUExQixFQUFpQztBQUM3QixhQUFLYSxnQkFBTCxDQUFzQkQsR0FBdEI7QUFDSDtBQUNKLEtBSkQ7QUFLSDs7QUFFU0Msa0JBQVYsQ0FBMkJDLGtCQUEzQixFQUE2RDtBQUN6RCxTQUFLQyxjQUFMLENBQW9CLEtBQUtyQyxvQkFBekIsRUFBK0MsS0FBS0Msc0JBQXBELEVBQTRFbUMsa0JBQTVFO0FBQ0EsU0FBS0MsY0FBTCxDQUFvQixLQUFLbkMsbUJBQXpCLEVBQThDLEtBQUtDLDBCQUFuRCxFQUErRWlDLGtCQUEvRTtBQUVBLFNBQUtFLGlCQUFMLEdBQXlCRixrQkFBekI7QUFDSDs7QUFFU0MsZ0JBQVYsQ0FBeUJFLE9BQXpCLEVBQTJDQyxTQUEzQyxFQUE4REosa0JBQTlELEVBQWdHO0FBQzVGLFFBQU1LLFNBQVMsR0FBR0YsT0FBTyxDQUFDRSxTQUExQjtBQUVBQSxhQUFTLENBQUNDLE1BQVYsQ0FBb0JGLFNBQXBCLFVBQWtDLEtBQUtGLGlCQUF2QztBQUNBRyxhQUFTLENBQUNFLEdBQVYsQ0FBaUJILFNBQWpCLFVBQStCSixrQkFBL0I7QUFDSDs7QUFFRCxNQUFjckMsY0FBZCxHQUF1QztBQUNuQyxXQUFPLEtBQUs2QyxZQUFMLENBQWtCLGtCQUFsQixDQUFQO0FBQ0g7O0FBRUQsTUFBYzNDLHNCQUFkLEdBQStDO0FBQzNDLFdBQVUsS0FBSzRDLElBQWY7QUFDSDs7QUFFRCxNQUFjMUMsMEJBQWQsR0FBbUQ7QUFDL0MsV0FBVSxLQUFLMEMsSUFBZjtBQUNIOztBQUVELE1BQWNqQyxhQUFkLEdBQXNDO0FBQ2xDLFdBQU9rQyxNQUFNLENBQUMsS0FBS0YsWUFBTCxDQUFrQixnQkFBbEIsQ0FBRCxDQUFiO0FBQ0g7O0FBRUQsTUFBY0csR0FBZCxHQUE0QjtBQUN4QixXQUFPRCxNQUFNLENBQUMsS0FBS0YsWUFBTCxDQUFrQixLQUFsQixDQUFELENBQWI7QUFDSDs7QUFFRCxNQUFjSSxTQUFkLEdBQWtDO0FBQzlCLFdBQU9GLE1BQU0sQ0FBQyxLQUFLRixZQUFMLENBQWtCLFdBQWxCLENBQUQsQ0FBYjtBQUNIOztBQUVELE1BQWNLLFNBQWQsR0FBa0M7QUFDOUIsV0FBT0gsTUFBTSxDQUFDLEtBQUtGLFlBQUwsQ0FBa0IsV0FBbEIsQ0FBRCxDQUFiO0FBQ0g7O0FBRUQsTUFBY00sTUFBZCxHQUErQjtBQUMzQixXQUFPSixNQUFNLENBQUMsS0FBS0YsWUFBTCxDQUFrQixRQUFsQixDQUFELENBQWI7QUFDSDs7QUFFRCxNQUFjTyxPQUFkLEdBQWdDO0FBQzVCLFdBQU9MLE1BQU0sQ0FBQyxLQUFLRixZQUFMLENBQWtCLFNBQWxCLENBQUQsQ0FBYjtBQUNIOztBQTlJOEQsQyIsImZpbGUiOiIuL2pzL3l2ZXNfZGVmYXVsdC5wYXNzd29yZC1jb21wbGV4aXR5LWluZGljYXRvci5lc20uanMiLCJzb3VyY2VzQ29udGVudCI6WyJtb2R1bGUuZXhwb3J0cyA9IHtcbiAgZXJyb3I6IHtcbiAgICBsZW5ndGg6ICdMZW5ndGggc2hvdWxkIGJlIGEgdmFsaWQgcG9zaXRpdmUgbnVtYmVyJyxcbiAgICBwYXNzd29yZDogJ1Bhc3N3b3JkIHNob3VsZCBiZSBhIHZhbGlkIHN0cmluZydcbiAgfSxcbiAgcmVnZXg6IHtcbiAgICBkaWdpdHM6ICcoXFxcXGQuKiknLFxuICAgIGxldHRlcnM6ICcoW2EtekEtWl0uKiknLFxuICAgIHN5bWJvbHM6ICcoW2B+XFxcXCFAI1xcXFwkJVxcXFxeXFxcXCZcXFxcKlxcXFwoXFxcXClcXFxcLV9cXFxcPVxcXFwrXFxcXFtcXFxcXFx7XFxcXH1cXFxcXVxcXFxcXFxcXFx8OzpcXFxcXFwnXCIsPC4+XFxcXC9cXFxcP+KCrMKjwqXigrnCp8KxXS4qKScsXG4gICAgc3BhY2VzOiAnKFtcXFxcc10uKiknXG4gIH1cbn07XG4iLCJ2YXIgbGliID0gcmVxdWlyZSgnLi9saWInKTtcbnZhciBlcnJvciA9IHJlcXVpcmUoJy4vY29uc3RhbnRzJykuZXJyb3I7XG5cbi8qKlxuICogVmFsaWRhdGVzIHRoYXQgYSBudW1iZXIgaXMgYSB2YWxpZCBsZW5ndGggKHBvc2l0aXZlIG51bWJlcilcbiAqXG4gKiBAcHJpdmF0ZVxuICogQHBhcmFtIHtudW1iZXJ9IG51bSAtIE51bWJlciB0byB2YWxpZGF0ZVxuICovXG5mdW5jdGlvbiBfdmFsaWRhdGVMZW5ndGgobnVtKSB7XG4gIGNvbnN0IGxlbiA9IE51bWJlcihudW0pO1xuICBpZiAoaXNOYU4obGVuKSB8fCAhTnVtYmVyLmlzSW50ZWdlcihsZW4pIHx8IGxlbiA8IDEpIHtcbiAgICB0aHJvdyBuZXcgRXJyb3IoZXJyb3IubGVuZ3RoKTtcbiAgfVxufVxuXG4vKipcbiAqIFRlc3RzIGEgdmFsaWRhdGlvbiBhbmQgcmV0dXJuIHRoZSByZXN1bHRcbiAqXG4gKiBAcHJpdmF0ZVxuICogQHBhcmFtIHtzdHJpbmd9IHByb3BlcnR5IC0gUHJvcGVydHkgdG8gdmFsaWRhdGVcbiAqIEByZXR1cm4ge2Jvb2xlYW59IEJvb2xlYW4gdmFsdWUgaW5kaWN0aW5nIHRoZSB2YWxpZGl0eVxuICogICAgICAgICAgIG9mIHRoZSBwYXNzd29yZCBhZ2FpbnN0IHRoZSBwcm9wZXJ0eVxuICovXG5mdW5jdGlvbiBfaXNQYXNzd29yZFZhbGlkRm9yKHByb3BlcnR5KSB7XG4gIHJldHVybiBsaWJbcHJvcGVydHkubWV0aG9kXS5hcHBseSh0aGlzLCBwcm9wZXJ0eS5hcmd1bWVudHMpO1xufVxuXG4vKipcbiAqIFJlZ2lzdGVycyB0aGUgcHJvcGVydGllcyBvZiBhIHBhc3N3b3JkLXZhbGlkYXRpb24gc2NoZW1hIG9iamVjdFxuICpcbiAqIEBwcml2YXRlXG4gKiBAcGFyYW0ge3N0cmluZ30gZnVuYyAtIFByb3BlcnR5IG5hbWVcbiAqIEBwYXJhbSB7YXJyYXl9IGFyZ3MgLSBhcmd1bWVudHMgZm9yIHRoZSBmdW5jIHByb3BlcnR5XG4gKi9cbmZ1bmN0aW9uIF9yZWdpc3RlcihmdW5jLCBhcmdzKSB7XG4gIC8vIEFkZCBwcm9wZXJ0eSB0byB0aGUgc2NoZW1hXG4gIHRoaXMucHJvcGVydGllcy5wdXNoKHsgbWV0aG9kOiBmdW5jLCBhcmd1bWVudHM6IGFyZ3MgfSk7XG4gIHJldHVybiB0aGlzO1xufVxuXG5jbGFzcyBQYXNzd29yZFZhbGlkYXRvciB7XG4gIC8qKlxuICAgKiBDcmVhdGVzIGEgcGFzc3dvcmQtdmFsaWRhdG9yIHNjaGVtYVxuICAgKlxuICAgKiBAY29uc3RydWN0b3JcbiAgICovXG4gIGNvbnN0cnVjdG9yKCkge1xuICAgIHRoaXMucHJvcGVydGllcyA9IFtdO1xuICB9XG5cbiAgLyoqXG4gICAqIE1ldGhvZCB0byB2YWxpZGF0ZSB0aGUgcGFzc3dvcmQgYWdhaW5zdCBzY2hlbWFcbiAgICpcbiAgICogQHBhcmFtIHtzdHJpbmd9IHB3ZCAtIHBhc3N3b3JkIHRvIHZhbGRpYXRlXG4gICAqIEBwYXJhbSB7b2JqZWN0fSBvcHRpb25zIC0gb3B0aW9uYWwgb3B0aW9ucyB0byBjb25maWd1cmUgdmFsaWRhdGlvblxuICAgKiBAcGFyYW0ge2Jvb2xlYW59IFtvcHRpb25zLmxpc3RdIC0gYXNrcyBmb3IgYSBsaXN0IG9mIHZhbGlkYXRpb25cbiAgICogICAgICAgICAgIGZhaWx1cmVzIGluc3RlYWQgb2YganVzdCB0cnVlL2ZhbHNlXG4gICAqIEByZXR1cm4ge2Jvb2xlYW58YXJyYXl9IEJvb2xlYW4gdmFsdWUgaW5kaWN0aW5nIHRoZSB2YWxpZGl0eVxuICAgKiAgICAgICAgICAgb2YgdGhlIHBhc3N3b3JkIGFzIHBlciBzY2hlbWEsIGlmICdvcHRpb25zLmxpc3QnXG4gICAqICAgICAgICAgICBpcyBub3Qgc2V0LiBPdGhlcndpc2UsIGl0IHJldHVybnMgYW4gYXJyYXkgb2ZcbiAgICogICAgICAgICAgIHByb3BlcnR5IG5hbWVzIHdoaWNoIGZhaWxlZCB2YWxpZGF0aW9uc1xuICAgKi9cbiAgdmFsaWRhdGUocHdkLCBvcHRpb25zKSB7XG4gICAgdGhpcy5saXN0ID0gQm9vbGVhbihvcHRpb25zICYmIG9wdGlvbnMubGlzdCk7XG4gICAgdGhpcy5wYXNzd29yZCA9IFN0cmluZyhwd2QpO1xuXG4gICAgdGhpcy5wb3NpdGl2ZSA9IHRydWU7XG5cbiAgICBpZiAodGhpcy5saXN0KSB7XG4gICAgICByZXR1cm4gdGhpcy5wcm9wZXJ0aWVzLnJlZHVjZSgoZXJyb3JMaXN0LCBwcm9wZXJ0eSkgPT4ge1xuICAgICAgICAvLyBBcHBsaWVzIGFsbCB2YWxpZGF0aW9ucyBkZWZpbmVkIGluIGxpYiBvbmUgYnkgb25lXG4gICAgICAgIGlmICghX2lzUGFzc3dvcmRWYWxpZEZvci5jYWxsKHRoaXMsIHByb3BlcnR5KSkge1xuICAgICAgICAgIC8vIElmIHRoZSB2YWxpZGF0aW9uIGZvciBhIHByb3BlcnR5IGZhaWxzLFxuICAgICAgICAgIC8vIGFkZCBpdCB0byB0aGUgZXJyb3IgbGlzdFxuICAgICAgICAgIHJldHVybiBlcnJvckxpc3QuY29uY2F0KHByb3BlcnR5Lm1ldGhvZCk7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIGVycm9yTGlzdDtcbiAgICAgIH0sIFtdKTtcbiAgICB9XG4gICAgcmV0dXJuIHRoaXMucHJvcGVydGllcy5ldmVyeShfaXNQYXNzd29yZFZhbGlkRm9yLmJpbmQodGhpcykpO1xuICB9XG5cbiAgLyoqXG4gICAqIFJ1bGUgdG8gbWFuZGF0ZSB0aGUgcHJlc2VuY2Ugb2YgbGV0dGVycyBpbiB0aGUgcGFzc3dvcmRcbiAgICpcbiAgICogQHBhcmFtIHtudW1iZXJ9IFtjb3VudF0gLSBtaW5pbXVtIG51bWJlciBvZiBsZXR0ZXJzIHJlcXVpcmVkXG4gICAqL1xuICBsZXR0ZXJzKGNvdW50KSB7XG4gICAgY291bnQgJiYgX3ZhbGlkYXRlTGVuZ3RoKGNvdW50KTtcbiAgICByZXR1cm4gX3JlZ2lzdGVyLmNhbGwodGhpcywgJ2xldHRlcnMnLCBhcmd1bWVudHMpO1xuICB9XG5cbiAgLyoqXG4gICAqIFJ1bGUgdG8gbWFuZGF0ZSB0aGUgcHJlc2VuY2Ugb2YgZGlnaXRzIGluIHRoZSBwYXNzd29yZFxuICAgKlxuICAgKiBAcGFyYW0ge251bWJlcn0gW2NvdW50XSAtIG1pbmltdW0gbnVtYmVyIG9mIGRpZ2l0cyByZXF1aXJlZFxuICAgKi9cbiAgZGlnaXRzKGNvdW50KSB7XG4gICAgY291bnQgJiYgX3ZhbGlkYXRlTGVuZ3RoKGNvdW50KTtcbiAgICByZXR1cm4gX3JlZ2lzdGVyLmNhbGwodGhpcywgJ2RpZ2l0cycsIGFyZ3VtZW50cyk7XG4gIH1cblxuICAvKipcbiAgICogUnVsZSB0byBtYW5kYXRlIHRoZSBwcmVzZW5jZSBvZiBzeW1ib2xzIGluIHRoZSBwYXNzd29yZFxuICAgKlxuICAgKiBAcGFyYW0ge251bWJlcn0gW2NvdW50XSAtIG1pbmltdW0gbnVtYmVyIG9mIHN5bWJvbHMgcmVxdWlyZWRcbiAgICovXG4gIHN5bWJvbHMoY291bnQpIHtcbiAgICBjb3VudCAmJiBfdmFsaWRhdGVMZW5ndGgoY291bnQpO1xuICAgIHJldHVybiBfcmVnaXN0ZXIuY2FsbCh0aGlzLCAnc3ltYm9scycsIGFyZ3VtZW50cyk7XG4gIH1cblxuICAvKipcbiAgICogUnVsZSB0byBzcGVjaWZ5IGEgbWluaW11bSBsZW5ndGggb2YgdGhlIHBhc3N3b3JkXG4gICAqXG4gICAqIEBwYXJhbSB7bnVtYmVyfSBudW0gLSBtaW5pbXVtIGxlbmd0aFxuICAgKi9cbiAgbWluKG51bSkge1xuICAgIF92YWxpZGF0ZUxlbmd0aChudW0pO1xuICAgIHJldHVybiBfcmVnaXN0ZXIuY2FsbCh0aGlzLCAnbWluJywgYXJndW1lbnRzKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBSdWxlIHRvIHNwZWNpZnkgYSBtYXhpbXVtIGxlbmd0aCBvZiB0aGUgcGFzc3dvcmRcbiAgICpcbiAgICogQHBhcmFtIHtudW1iZXJ9IG51bSAtIG1heGltdW0gbGVuZ3RoXG4gICAqL1xuICBtYXgobnVtKSB7XG4gICAgX3ZhbGlkYXRlTGVuZ3RoKG51bSk7XG4gICAgcmV0dXJuIF9yZWdpc3Rlci5jYWxsKHRoaXMsICdtYXgnLCBhcmd1bWVudHMpO1xuICB9XG5cbiAgLyoqXG4gICAqIFJ1bGUgdG8gbWFuZGF0ZSB0aGUgcHJlc2VuY2Ugb2YgbG93ZXJjYXNlIGxldHRlcnMgaW4gdGhlIHBhc3N3b3JkXG4gICAqXG4gICAqIEBwYXJhbSB7bnVtYmVyfSBbY291bnRdIC0gbWluaW11bSBudW1iZXIgb2YgbG93ZXJjYXNlIGxldHRlcnMgcmVxdWlyZWRcbiAgICovXG4gIGxvd2VyY2FzZShjb3VudCkge1xuICAgIGNvdW50ICYmIF92YWxpZGF0ZUxlbmd0aChjb3VudCk7XG4gICAgcmV0dXJuIF9yZWdpc3Rlci5jYWxsKHRoaXMsICdsb3dlcmNhc2UnLCBhcmd1bWVudHMpO1xuICB9XG5cbiAgLyoqXG4gICAqIFJ1bGUgdG8gbWFuZGF0ZSB0aGUgcHJlc2VuY2Ugb2YgdXBwZXJjYXNlIGxldHRlcnMgaW4gdGhlIHBhc3N3b3JkXG4gICAqXG4gICAqIEBwYXJhbSB7bnVtYmVyfSBbY291bnRdIC0gbWluaW11bSBudW1iZXIgb2YgdXBwZXJjYXNlIGxldHRlcnMgcmVxdWlyZWRcbiAgICovXG4gIHVwcGVyY2FzZShjb3VudCkge1xuICAgIGNvdW50ICYmIF92YWxpZGF0ZUxlbmd0aChjb3VudCk7XG4gICAgcmV0dXJuIF9yZWdpc3Rlci5jYWxsKHRoaXMsICd1cHBlcmNhc2UnLCBhcmd1bWVudHMpO1xuICB9XG5cbiAgLyoqXG4gICAqIFJ1bGUgdG8gbWFuZGF0ZSB0aGUgcHJlc2VuY2Ugb2Ygc3BhY2UgaW4gdGhlIHBhc3N3b3JkXG4gICAqIEl0IGNhbiBiZSB1c2VkIGFsb25nIHdpdGggJ25vdCcgdG8gbm90IGFsbG93IHNwYWNlc1xuICAgKiBpbiB0aGUgcGFzc3dvcmRcbiAgICpcbiAgICogQHBhcmFtIHtudW1iZXJ9IFtjb3VudF0gLSBtaW5pbXVtIG51bWJlciBvZiBzcGFjZXMgcmVxdWlyZWRcbiAgICovXG4gIHNwYWNlcyhjb3VudCkge1xuICAgIGNvdW50ICYmIF92YWxpZGF0ZUxlbmd0aChjb3VudCk7XG4gICAgcmV0dXJuIF9yZWdpc3Rlci5jYWxsKHRoaXMsICdzcGFjZXMnLCBhcmd1bWVudHMpO1xuICB9XG5cbiAgLyoqXG4gICAqIFJ1bGUgdG8gaW52ZXJ0IHRoZSBlZmZlY3RzIG9mICdub3QnXG4gICAqIEFwYXJ0IGZyb20gdGhhdCwgJ2hhcycgaXMgYWxzbyB1c2VkXG4gICAqIHRvIG1ha2UgdGhlIGFwaSByZWFkYWJsZSBhbmQgY2hhaW5hYmxlXG4gICAqL1xuICBoYXMoKSB7XG4gICAgcmV0dXJuIF9yZWdpc3Rlci5jYWxsKHRoaXMsICdoYXMnLCBhcmd1bWVudHMpO1xuICB9XG5cbiAgLyoqXG4gICAqIFJ1bGUgdG8gaW52ZXJ0IHRoZSBuZXh0IGFwcGxpZWQgcnVsZXMuXG4gICAqIEFsbCB0aGUgcnVsZXMgYXBwbGllZCBhZnRlciAnbm90JyB3aWxsIGhhdmUgb3Bwb3NpdGUgZWZmZWN0LFxuICAgKiB1bnRpbCAnaGFzJyBydWxlIGlzIGFwcGxpZWRcbiAgICovXG4gIG5vdCgpIHtcbiAgICByZXR1cm4gX3JlZ2lzdGVyLmNhbGwodGhpcywgJ25vdCcsIGFyZ3VtZW50cyk7XG4gIH1cblxuICAvKipcbiAgICogUnVsZSB0byBpbnZlcnQgdGhlIGVmZmVjdHMgb2YgJ25vdCdcbiAgICogQXBhcnQgZnJvbSB0aGF0LCAnaXMnIGlzIGFsc28gdXNlZFxuICAgKiB0byBtYWtlIHRoZSBhcGkgcmVhZGFibGUgYW5kIGNoYWluYWJsZVxuICAgKi9cbiAgaXMoKSB7XG4gICAgcmV0dXJuIF9yZWdpc3Rlci5jYWxsKHRoaXMsICdpcycsIGFyZ3VtZW50cyk7XG4gIH1cblxuICAvKipcbiAgICogUnVsZSB0byB3aGl0ZWxpc3Qgd29yZHMgdG8gYmUgdXNlZCBhcyBwYXNzd29yZFxuICAgKlxuICAgKiBAcGFyYW0ge2FycmF5fSBsaXN0IC0gbGlzdCBvZiB2YWx1ZXMgYWxsb3dlZFxuICAgKi9cbiAgb25lT2YoKSB7XG4gICAgcmV0dXJuIF9yZWdpc3Rlci5jYWxsKHRoaXMsICdvbmVPZicsIGFyZ3VtZW50cyk7XG4gIH1cbn1cblxubW9kdWxlLmV4cG9ydHMgPSBQYXNzd29yZFZhbGlkYXRvcjtcbiIsIi8qKlxuICogR2VuZXJpYyBtZXRob2QgdG8gdGVzdCByZWdleFxuICpcbiAqIEBwcml2YXRlXG4gKiBAcGFyYW0ge3N0cmluZ30gcmVnZXggLSByZWdleCB0byB0ZXN0XG4gKiAgICAgICAgICAgICAgICAgICAgICAgICAgIHdpdGggcGFzc3dvcmRcbiAqL1xudmFyIHJlZ2V4ID0gcmVxdWlyZSgnLi9jb25zdGFudHMnKS5yZWdleDtcblxuZnVuY3Rpb24gX3Byb2Nlc3MocmVnZXhwLCByZXBlYXQpIHtcbiAgaWYgKHJlcGVhdCAmJiByZXBlYXQgPiAxKSB7XG4gICAgY29uc3QgcGFyc2VkUmVwZWF0ID0gcGFyc2VJbnQocmVwZWF0LCAxMCk7XG4gICAgcmV0dXJuIG5ldyBSZWdFeHAocmVnZXhwICsgJ3snICsgcGFyc2VkUmVwZWF0ICsgJyx9JykudGVzdCh0aGlzLnBhc3N3b3JkKSA9PT0gdGhpcy5wb3NpdGl2ZTtcbiAgfVxuICByZXR1cm4gbmV3IFJlZ0V4cChyZWdleHApLnRlc3QodGhpcy5wYXNzd29yZCkgPT09IHRoaXMucG9zaXRpdmU7XG59XG5cbm1vZHVsZS5leHBvcnRzID0ge1xuXG4gIC8qKlxuICAgKiBNZXRob2QgdG8gaW52ZXJ0IHRoZSBuZXh0IHZhbGlkYXRpb25zXG4gICAqXG4gICAqIEBwYXJhbSB7UmVnRXhwfSBbc3ltYm9sXSAtIGN1c3RvbSBSZWdleCB3aGljaCBzaG91bGQgbm90IGJlIHByZXNlbnRcbiAgICovXG4gIG5vdDogZnVuY3Rpb24gbm90KHN5bWJvbCkge1xuICAgIHRoaXMucG9zaXRpdmUgPSBmYWxzZTtcbiAgICBpZiAoc3ltYm9sKSB7XG4gICAgICByZXR1cm4gX3Byb2Nlc3MuY2FsbCh0aGlzLCBzeW1ib2wpO1xuICAgIH1cbiAgICByZXR1cm4gdHJ1ZTtcbiAgfSxcblxuICAvKipcbiAgICogTWV0aG9kIHRvIGludmVydCB0aGUgZWZmZWN0cyBvZiBub3QoKVxuICAgKlxuICAgKiBAcGFyYW0ge1JlZ0V4cH0gW3N5bWJvbF0gLSBjdXN0b20gUmVnZXggd2hpY2ggc2hvdWxkIGJlIHByZXNlbnRcbiAgICovXG4gIGhhczogZnVuY3Rpb24gaGFzKHN5bWJvbCkge1xuICAgIHRoaXMucG9zaXRpdmUgPSB0cnVlO1xuICAgIGlmIChzeW1ib2wpIHtcbiAgICAgIHJldHVybiBfcHJvY2Vzcy5jYWxsKHRoaXMsIHN5bWJvbCk7XG4gICAgfVxuICAgIHJldHVybiB0cnVlO1xuICB9LFxuXG4gIC8qKlxuICAgKiBNZXRob2QgdG8gaW52ZXJ0IHRoZSBlZmZlY3RzIG9mIG5vdCgpIGFuZFxuICAgKiB0byBtYWtlIHRoZSBhcGkgcmVhZGFibGUgYW5kIGNoYWluYWJsZVxuICAgKlxuICAgKi9cbiAgaXM6IGZ1bmN0aW9uIGlzKCkge1xuICAgIHRoaXMucG9zaXRpdmUgPSB0cnVlO1xuICAgIHJldHVybiB0cnVlO1xuICB9LFxuXG4gIC8qKlxuICAgKiBNZXRob2QgdG8gc3BlY2lmeSBhIG1pbmltdW0gbGVuZ3RoXG4gICAqXG4gICAqIEBwYXJhbSB7bnVtYmVyfSBudW0gLSBtaW5pbXVtIGxlbmd0aFxuICAgKi9cbiAgbWluOiBmdW5jdGlvbiBtaW4obnVtKSB7XG4gICAgcmV0dXJuIHRoaXMucGFzc3dvcmQubGVuZ3RoID49IG51bTtcbiAgfSxcblxuICAvKipcbiAgICogTWV0aG9kIHRvIHNwZWNpZnkgYSBtYXhpbXVtIGxlbmd0aFxuICAgKlxuICAgKiBAcGFyYW0ge251bWJlcn0gbnVtIC0gbWF4aW11bSBsZW5ndGhcbiAgICovXG4gIG1heDogZnVuY3Rpb24gbWF4KG51bSkge1xuICAgIHJldHVybiB0aGlzLnBhc3N3b3JkLmxlbmd0aCA8PSBudW07XG4gIH0sXG5cbiAgLyoqXG4gICAqIE1ldGhvZCB0byB2YWxpZGF0ZSB0aGUgcHJlc2VuY2Ugb2YgZGlnaXRzXG4gICAqXG4gICAqIEBwYXJhbSB7bnVtYmVyfSByZXBlYXQgLSBjb3VudCBvZiByZXF1aXJlZCBkaWdpdHNcbiAgICovXG4gIGRpZ2l0czogZnVuY3Rpb24gZGlnaXRzKHJlcGVhdCkge1xuICAgIHJldHVybiBfcHJvY2Vzcy5jYWxsKHRoaXMsIHJlZ2V4LmRpZ2l0cywgcmVwZWF0KTtcbiAgfSxcblxuICAvKipcbiAgICogTWV0aG9kIHRvIHZhbGlkYXRlIHRoZSBwcmVzZW5jZSBvZiBsZXR0ZXJzXG4gICAqXG4gICAqIEBwYXJhbSB7bnVtYmVyfSByZXBlYXQgLSBjb3VudCBvZiByZXF1aXJlZCBsZXR0ZXJzXG4gICAqL1xuICBsZXR0ZXJzOiBmdW5jdGlvbiBsZXR0ZXJzKHJlcGVhdCkge1xuICAgIHJldHVybiBfcHJvY2Vzcy5jYWxsKHRoaXMsIHJlZ2V4LmxldHRlcnMsIHJlcGVhdCk7XG4gIH0sXG5cbiAgLyoqXG4gICAqIE1ldGhvZCB0byB2YWxpZGF0ZSB0aGUgcHJlc2VuY2Ugb2YgdXBwZXJjYXNlIGxldHRlcnNcbiAgICpcbiAgICogQHBhcmFtIHtudW1iZXJ9IHJlcGVhdCAtIGNvdW50IG9mIHJlcXVpcmVkIHVwcGVyY2FzZSBsZXR0ZXJzXG4gICAqL1xuICB1cHBlcmNhc2U6IGZ1bmN0aW9uIHVwcGVyY2FzZShyZXBlYXQpIHtcbiAgICBpZiAocmVwZWF0ICYmIHJlcGVhdCA+IDEpIHtcbiAgICAgIGxldCBjaGFyYWN0ZXJJbmRleCA9IDA7XG4gICAgICBsZXQgdXBwZXJDYXNlTGV0dGVycyA9IDA7XG5cbiAgICAgIHdoaWxlICgodXBwZXJDYXNlTGV0dGVycyA8IHJlcGVhdCkgJiYgKGNoYXJhY3RlckluZGV4IDwgdGhpcy5wYXNzd29yZC5sZW5ndGgpKSB7XG4gICAgICAgIGNvbnN0IGN1cnJlbnRMZXR0ZXIgPSB0aGlzLnBhc3N3b3JkLmNoYXJBdChjaGFyYWN0ZXJJbmRleCk7XG4gICAgICAgIGlmIChjdXJyZW50TGV0dGVyICE9PSBjdXJyZW50TGV0dGVyLnRvTG93ZXJDYXNlKCkpIHtcbiAgICAgICAgICB1cHBlckNhc2VMZXR0ZXJzKys7XG4gICAgICAgIH1cbiAgICAgICAgY2hhcmFjdGVySW5kZXgrKztcbiAgICAgIH1cblxuICAgICAgcmV0dXJuICh1cHBlckNhc2VMZXR0ZXJzID09PSByZXBlYXQpID09PSB0aGlzLnBvc2l0aXZlO1xuICAgIH1cbiAgICByZXR1cm4gKHRoaXMucGFzc3dvcmQgIT09IHRoaXMucGFzc3dvcmQudG9Mb3dlckNhc2UoKSkgPT09IHRoaXMucG9zaXRpdmU7XG4gIH0sXG5cbiAgLyoqXG4gICAqIE1ldGhvZCB0byB2YWxpZGF0ZSB0aGUgcHJlc2VuY2Ugb2YgbG93ZXJjYXNlIGxldHRlcnNcbiAgICpcbiAgICogQHBhcmFtIHtudW1iZXJ9IHJlcGVhdCAtIGNvdW50IG9mIHJlcXVpcmVkIGxvd2VyY2FzZSBsZXR0ZXJzXG4gICAqL1xuICBsb3dlcmNhc2U6IGZ1bmN0aW9uIGxvd2VyY2FzZShyZXBlYXQpIHtcbiAgICBpZiAocmVwZWF0ICYmIHJlcGVhdCA+IDEpIHtcbiAgICAgIGxldCBjaGFyYWN0ZXJJbmRleCA9IDA7XG4gICAgICBsZXQgbG93ZXJDYXNlTGV0dGVycyA9IDA7XG5cbiAgICAgIHdoaWxlICgobG93ZXJDYXNlTGV0dGVycyA8IHJlcGVhdCkgJiYgKGNoYXJhY3RlckluZGV4IDwgdGhpcy5wYXNzd29yZC5sZW5ndGgpKSB7XG4gICAgICAgIGNvbnN0IGN1cnJlbnRMZXR0ZXIgPSB0aGlzLnBhc3N3b3JkLmNoYXJBdChjaGFyYWN0ZXJJbmRleCk7XG4gICAgICAgIGlmIChjdXJyZW50TGV0dGVyICE9PSBjdXJyZW50TGV0dGVyLnRvVXBwZXJDYXNlKCkpIHtcbiAgICAgICAgICBsb3dlckNhc2VMZXR0ZXJzKys7XG4gICAgICAgIH1cbiAgICAgICAgY2hhcmFjdGVySW5kZXgrKztcbiAgICAgIH1cblxuICAgICAgcmV0dXJuIChsb3dlckNhc2VMZXR0ZXJzID09PSByZXBlYXQpID09PSB0aGlzLnBvc2l0aXZlO1xuICAgIH1cbiAgICByZXR1cm4gKHRoaXMucGFzc3dvcmQgIT09IHRoaXMucGFzc3dvcmQudG9VcHBlckNhc2UoKSkgPT09IHRoaXMucG9zaXRpdmU7XG4gIH0sXG5cbiAgLyoqXG4gICAqIE1ldGhvZCB0byB2YWxpZGF0ZSB0aGUgcHJlc2VuY2Ugb2Ygc3ltYm9sc1xuICAgKlxuICAgKiBAcGFyYW0ge251bWJlcn0gcmVwZWF0IC0gY291bnQgb2YgcmVxdWlyZWQgc3ltYm9sc1xuICAgKi9cbiAgc3ltYm9sczogZnVuY3Rpb24gc3ltYm9scyhyZXBlYXQpIHtcbiAgICByZXR1cm4gX3Byb2Nlc3MuY2FsbCh0aGlzLCByZWdleC5zeW1ib2xzLCByZXBlYXQpO1xuICB9LFxuXG4gIC8qKlxuICAgKiBNZXRob2QgdG8gdmFsaWRhdGUgdGhlIHByZXNlbmNlIG9mIHNwYWNlXG4gICAqXG4gICAqIEBwYXJhbSB7bnVtYmVyfSByZXBlYXQgLSBjb3VudCBvZiByZXF1aXJlZCBzcGFjZXNcbiAgICovXG4gIHNwYWNlczogZnVuY3Rpb24gc3BhY2VzKHJlcGVhdCkge1xuICAgIHJldHVybiBfcHJvY2Vzcy5jYWxsKHRoaXMsIHJlZ2V4LnNwYWNlcywgcmVwZWF0KTtcbiAgfSxcblxuICAvKipcbiAgICogTWV0aG9kIHRvIHByb3ZpZGUgcHJlLWRlZmluZWQgdmFsdWVzIGZvciBwYXNzd29yZFxuICAgKlxuICAgKiBAcGFyYW0ge2FycmF5fSBsaXN0IC0gbGlzdCBvZiB2YWx1ZXMgYWxsb3dlZFxuICAgKi9cbiAgb25lT2Y6IGZ1bmN0aW9uIG9uZU9mKGxpc3QpIHtcbiAgICByZXR1cm4gbGlzdC5pbmRleE9mKHRoaXMucGFzc3dvcmQpID49IDAgPT09IHRoaXMucG9zaXRpdmU7XG4gIH1cbn07XG4iLCJpbXBvcnQgQ29tcG9uZW50IGZyb20gJ1Nob3BVaS9tb2RlbHMvY29tcG9uZW50JztcbmltcG9ydCBkZWJvdW5jZSBmcm9tICdsb2Rhc2gtZXMvZGVib3VuY2UnO1xuaW1wb3J0IFBhc3N3b3JkVmFsaWRhdG9yIGZyb20gJ3Bhc3N3b3JkLXZhbGlkYXRvcic7XG5cbmVudW0gQ29tcGxleGl0eVdlaWdodCB7XG4gICAgbG93ZXJjYXNlID0gMTAsXG4gICAgZGlnaXRzID0gMTUsXG4gICAgdXBwZXJjYXNlID0gMjAsXG4gICAgc3ltYm9scyA9IDMwLFxuICAgIG1pbiA9IDI1LFxufVxuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBQYXNzd29yZENvbXBsZXhpdHlJbmRpY2F0b3IgZXh0ZW5kcyBDb21wb25lbnQge1xuICAgIHByb3RlY3RlZCBhdmFpbGFibGVQcm9wZXJ0aWVzID0gWydtaW4nLCAnbG93ZXJjYXNlJywgJ3VwcGVyY2FzZScsICdkaWdpdHMnLCAnc3ltYm9scyddO1xuICAgIC8qIHRzbGludDpkaXNhYmxlOiBuby1tYWdpYy1udW1iZXJzICovXG4gICAgcHJvdGVjdGVkIGNvbXBsZXhpdHlHcmFkYXRpb24gPSBuZXcgTWFwKFtcbiAgICAgICAgWyd3ZWFrJywgMF0sXG4gICAgICAgIFsnbWVkaXVtJywgMjVdLFxuICAgICAgICBbJ3N0cm9uZycsIDUwXSxcbiAgICAgICAgWyd2ZXJ5LXN0cm9uZycsIDc1XSxcbiAgICBdKTtcbiAgICAvKiB0c2xpbnQ6ZW5hYmxlICovXG4gICAgcHJvdGVjdGVkIGN1cnJlbnRDb21wbGV4aXR5ID0gJyc7XG4gICAgcHJvdGVjdGVkIG1heFBhc3N3b3JkQ29tcGxleGl0eSA9IDA7XG4gICAgcHJvdGVjdGVkIGZhY3RvciA9IDEwMDtcbiAgICBwcm90ZWN0ZWQgaW5wdXRFbGVtZW50OiBIVE1MSW5wdXRFbGVtZW50O1xuICAgIHByb3RlY3RlZCBub3RpZmljYXRpb25FbGVtZW50OiBIVE1MRWxlbWVudDtcbiAgICBwcm90ZWN0ZWQgaW5kaWNhdG9yTGlzdEVsZW1lbnQ6IEhUTUxFbGVtZW50O1xuICAgIHByb3RlY3RlZCBzY2hlbWE6IFBhc3N3b3JkVmFsaWRhdG9yO1xuXG4gICAgcHJvdGVjdGVkIHJlYWR5Q2FsbGJhY2soKTogdm9pZCB7fVxuXG4gICAgcHJvdGVjdGVkIGluaXQoKTogdm9pZCB7XG4gICAgICAgIHRoaXMuaW5wdXRFbGVtZW50ID0gPEhUTUxJbnB1dEVsZW1lbnQ+ZG9jdW1lbnQuZ2V0RWxlbWVudHNCeUNsYXNzTmFtZSh0aGlzLmlucHV0Q2xhc3NOYW1lKVswXTtcbiAgICAgICAgdGhpcy5pbmRpY2F0b3JMaXN0RWxlbWVudCA9IDxIVE1MRWxlbWVudD50aGlzLmdldEVsZW1lbnRzQnlDbGFzc05hbWUodGhpcy5pbmRpY2F0b3JMaXN0Q2xhc3NOYW1lKVswXTtcbiAgICAgICAgdGhpcy5ub3RpZmljYXRpb25FbGVtZW50ID0gPEhUTUxFbGVtZW50PnRoaXMuZ2V0RWxlbWVudHNCeUNsYXNzTmFtZSh0aGlzLmFkZGl0aW9uYWxNZXNzYWdlQ2xhc3NOYW1lKVswXTtcbiAgICAgICAgdGhpcy5zY2hlbWEgPSBuZXcgUGFzc3dvcmRWYWxpZGF0b3IoKTtcblxuICAgICAgICB0aGlzLmluaXRWYWxpZGF0b3IoKTtcbiAgICAgICAgdGhpcy5tYXBFdmVudHMoKTtcbiAgICB9XG5cbiAgICBwcm90ZWN0ZWQgbWFwRXZlbnRzKCk6IHZvaWQge1xuICAgICAgICB0aGlzLm1hcElucHV0RWxlbWVudEtleVVwRXZlbnQoKTtcbiAgICB9XG5cbiAgICBwcm90ZWN0ZWQgbWFwSW5wdXRFbGVtZW50S2V5VXBFdmVudCgpOiB2b2lkIHtcbiAgICAgICAgdGhpcy5pbnB1dEVsZW1lbnQuYWRkRXZlbnRMaXN0ZW5lcihcbiAgICAgICAgICAgICdrZXl1cCcsXG4gICAgICAgICAgICBkZWJvdW5jZSgoKSA9PiB0aGlzLm9uSW5wdXRLZXlVcCgpLCB0aGlzLmRlYm91bmNlRGVsYXkpLFxuICAgICAgICApO1xuICAgIH1cblxuICAgIHByb3RlY3RlZCBpbml0VmFsaWRhdG9yKCk6IHZvaWQge1xuICAgICAgICB0aGlzLmF2YWlsYWJsZVByb3BlcnRpZXMuZm9yRWFjaCgocHJvcGVydHk6IHN0cmluZykgPT4ge1xuICAgICAgICAgICAgdGhpcy5zZXRWYWxpZGF0aW9uKHByb3BlcnR5KTtcbiAgICAgICAgICAgIHRoaXMuaW5jcmVhc2VNYXhQYXNzd29yZENvbXBsZXhpdHkocHJvcGVydHkpO1xuICAgICAgICB9KTtcbiAgICB9XG5cbiAgICBwcm90ZWN0ZWQgaW5jcmVhc2VNYXhQYXNzd29yZENvbXBsZXhpdHkocHJvcGVydHk6IHN0cmluZyk6IHZvaWQge1xuICAgICAgICB0aGlzLm1heFBhc3N3b3JkQ29tcGxleGl0eSArPSBDb21wbGV4aXR5V2VpZ2h0W3Byb3BlcnR5XTtcbiAgICB9XG5cbiAgICBwcm90ZWN0ZWQgc2V0VmFsaWRhdGlvbihwcm9wZXJ0eTogc3RyaW5nKTogdm9pZCB7XG4gICAgICAgIGNvbnN0IHByb3BlcnR5VmFsdWUgPSB0aGlzW3Byb3BlcnR5XTtcblxuICAgICAgICBpZiAocHJvcGVydHkgPT09ICdtaW4nKSB7XG4gICAgICAgICAgICB0aGlzLnNldElzVmFsaWRhdGlvblR5cGUocHJvcGVydHksIHByb3BlcnR5VmFsdWUpO1xuXG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cblxuICAgICAgICB0aGlzLnNldEhhc1ZhbGlkYXRpb25UeXBlKHByb3BlcnR5LCBwcm9wZXJ0eVZhbHVlKTtcbiAgICB9XG5cbiAgICBwcm90ZWN0ZWQgc2V0SGFzVmFsaWRhdGlvblR5cGUocHJvcGVydHk6IHN0cmluZywgdmFsdWU6IG51bWJlcik6IHZvaWQge1xuICAgICAgICB0aGlzLnNjaGVtYS5oYXMoKVtwcm9wZXJ0eV0odmFsdWUpO1xuICAgIH1cblxuICAgIHByb3RlY3RlZCBzZXRJc1ZhbGlkYXRpb25UeXBlKHByb3BlcnR5OiBzdHJpbmcsIHZhbHVlOiBudW1iZXIpOiB2b2lkIHtcbiAgICAgICAgdGhpcy5zY2hlbWEuaXMoKVtwcm9wZXJ0eV0odmFsdWUpO1xuICAgIH1cblxuICAgIHByb3RlY3RlZCBvbklucHV0S2V5VXAoKTogdm9pZCB7XG4gICAgICAgIGNvbnN0IGlucHV0VmFsdWUgPSB0aGlzLmlucHV0RWxlbWVudC52YWx1ZTtcbiAgICAgICAgY29uc3QgZmFpbHNMaXN0ID0gdGhpcy5zY2hlbWEudmFsaWRhdGUoaW5wdXRWYWx1ZSwgeyBsaXN0OiB0cnVlIH0pO1xuICAgICAgICBsZXQgcGFzc3dvcmRWYWxpZGF0b3JNYXJrID0gdGhpcy5tYXhQYXNzd29yZENvbXBsZXhpdHk7XG5cbiAgICAgICAgZmFpbHNMaXN0LmZvckVhY2goKHByb3BlcnR5OiBzdHJpbmcpID0+IHtcbiAgICAgICAgICAgIHBhc3N3b3JkVmFsaWRhdG9yTWFyayAtPSBDb21wbGV4aXR5V2VpZ2h0W3Byb3BlcnR5XTtcbiAgICAgICAgfSk7XG5cbiAgICAgICAgdGhpcy52YWxpZGF0ZVBhc3N3b3JkKHBhc3N3b3JkVmFsaWRhdG9yTWFyayk7XG4gICAgfVxuXG4gICAgcHJvdGVjdGVkIHZhbGlkYXRlUGFzc3dvcmQocGFzc3dvcmRWYWxpZGF0b3JNYXJrOiBudW1iZXIpOiB2b2lkIHtcbiAgICAgICAgY29uc3QgcGFzc3dvcmRDb21wbGV4aXR5ID0gKHBhc3N3b3JkVmFsaWRhdG9yTWFyayAvIHRoaXMubWF4UGFzc3dvcmRDb21wbGV4aXR5KSAqIHRoaXMuZmFjdG9yO1xuXG4gICAgICAgIHRoaXMuY29tcGxleGl0eUdyYWRhdGlvbi5mb3JFYWNoKCh2YWx1ZTogbnVtYmVyLCBrZXk6IHN0cmluZykgPT4ge1xuICAgICAgICAgICAgaWYgKHBhc3N3b3JkQ29tcGxleGl0eSA+PSB2YWx1ZSkge1xuICAgICAgICAgICAgICAgIHRoaXMudXBkYXRlVmFsaWRhdGlvbihrZXkpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcbiAgICB9XG5cbiAgICBwcm90ZWN0ZWQgdXBkYXRlVmFsaWRhdGlvbihjb21wbGV4aXR5TW9kaWZpZXI6IHN0cmluZyk6IHZvaWQge1xuICAgICAgICB0aGlzLnVwZGF0ZU1vZGlmaWVyKHRoaXMuaW5kaWNhdG9yTGlzdEVsZW1lbnQsIHRoaXMuaW5kaWNhdG9yTGlzdENsYXNzTmFtZSwgY29tcGxleGl0eU1vZGlmaWVyKTtcbiAgICAgICAgdGhpcy51cGRhdGVNb2RpZmllcih0aGlzLm5vdGlmaWNhdGlvbkVsZW1lbnQsIHRoaXMuYWRkaXRpb25hbE1lc3NhZ2VDbGFzc05hbWUsIGNvbXBsZXhpdHlNb2RpZmllcik7XG5cbiAgICAgICAgdGhpcy5jdXJyZW50Q29tcGxleGl0eSA9IGNvbXBsZXhpdHlNb2RpZmllcjtcbiAgICB9XG5cbiAgICBwcm90ZWN0ZWQgdXBkYXRlTW9kaWZpZXIoZWxlbWVudDogRWxlbWVudCwgY2xhc3NOYW1lOiBzdHJpbmcsIGNvbXBsZXhpdHlNb2RpZmllcjogc3RyaW5nKTogdm9pZCB7XG4gICAgICAgIGNvbnN0IGNsYXNzTGlzdCA9IGVsZW1lbnQuY2xhc3NMaXN0O1xuXG4gICAgICAgIGNsYXNzTGlzdC5yZW1vdmUoYCR7Y2xhc3NOYW1lfS0tJHt0aGlzLmN1cnJlbnRDb21wbGV4aXR5fWApO1xuICAgICAgICBjbGFzc0xpc3QuYWRkKGAke2NsYXNzTmFtZX0tLSR7Y29tcGxleGl0eU1vZGlmaWVyfWApO1xuICAgIH1cblxuICAgIHByb3RlY3RlZCBnZXQgaW5wdXRDbGFzc05hbWUoKTogc3RyaW5nIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuZ2V0QXR0cmlidXRlKCdpbnB1dC1jbGFzcy1uYW1lJyk7XG4gICAgfVxuXG4gICAgcHJvdGVjdGVkIGdldCBpbmRpY2F0b3JMaXN0Q2xhc3NOYW1lKCk6IHN0cmluZyB7XG4gICAgICAgIHJldHVybiBgJHt0aGlzLm5hbWV9X19pbmRpY2F0b3ItbGlzdGA7XG4gICAgfVxuXG4gICAgcHJvdGVjdGVkIGdldCBhZGRpdGlvbmFsTWVzc2FnZUNsYXNzTmFtZSgpOiBzdHJpbmcge1xuICAgICAgICByZXR1cm4gYCR7dGhpcy5uYW1lfV9fYWRkaXRpb25hbC1tZXNzYWdlYDtcbiAgICB9XG5cbiAgICBwcm90ZWN0ZWQgZ2V0IGRlYm91bmNlRGVsYXkoKTogbnVtYmVyIHtcbiAgICAgICAgcmV0dXJuIE51bWJlcih0aGlzLmdldEF0dHJpYnV0ZSgnZGVib3VuY2UtZGVsYXknKSk7XG4gICAgfVxuXG4gICAgcHJvdGVjdGVkIGdldCBtaW4oKTogbnVtYmVyIHtcbiAgICAgICAgcmV0dXJuIE51bWJlcih0aGlzLmdldEF0dHJpYnV0ZSgnbWluJykpO1xuICAgIH1cblxuICAgIHByb3RlY3RlZCBnZXQgbG93ZXJjYXNlKCk6IG51bWJlciB7XG4gICAgICAgIHJldHVybiBOdW1iZXIodGhpcy5nZXRBdHRyaWJ1dGUoJ2xvd2VyY2FzZScpKTtcbiAgICB9XG5cbiAgICBwcm90ZWN0ZWQgZ2V0IHVwcGVyY2FzZSgpOiBudW1iZXIge1xuICAgICAgICByZXR1cm4gTnVtYmVyKHRoaXMuZ2V0QXR0cmlidXRlKCd1cHBlcmNhc2UnKSk7XG4gICAgfVxuXG4gICAgcHJvdGVjdGVkIGdldCBkaWdpdHMoKTogbnVtYmVyIHtcbiAgICAgICAgcmV0dXJuIE51bWJlcih0aGlzLmdldEF0dHJpYnV0ZSgnZGlnaXRzJykpO1xuICAgIH1cblxuICAgIHByb3RlY3RlZCBnZXQgc3ltYm9scygpOiBudW1iZXIge1xuICAgICAgICByZXR1cm4gTnVtYmVyKHRoaXMuZ2V0QXR0cmlidXRlKCdzeW1ib2xzJykpO1xuICAgIH1cbn1cbiJdLCJzb3VyY2VSb290IjoiIn0=