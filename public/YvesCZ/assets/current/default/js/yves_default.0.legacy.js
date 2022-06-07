(window["webpackJsonp_yves_default"] = window["webpackJsonp_yves_default"] || []).push([[0],{

/***/ "./node_modules/@babel/runtime/helpers/extends.js":
/*!********************************************************!*\
  !*** ./node_modules/@babel/runtime/helpers/extends.js ***!
  \********************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

function _extends() {
  module.exports = _extends = Object.assign || function (target) {
    for (var i = 1; i < arguments.length; i++) {
      var source = arguments[i];

      for (var key in source) {
        if (Object.prototype.hasOwnProperty.call(source, key)) {
          target[key] = source[key];
        }
      }
    }

    return target;
  };

  return _extends.apply(this, arguments);
}

module.exports = _extends;

/***/ }),

/***/ "./src/Pyz/Yves/Payone/Theme/default/components/molecules/payone-credit-card/payone-credit-card.ts":
/*!*********************************************************************************************************!*\
  !*** ./src/Pyz/Yves/Payone/Theme/default/components/molecules/payone-credit-card/payone-credit-card.ts ***!
  \*********************************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return PayoneCreditCard; });
/* harmony import */ var _babel_runtime_helpers_extends__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @babel/runtime/helpers/extends */ "./node_modules/@babel/runtime/helpers/extends.js");
/* harmony import */ var _babel_runtime_helpers_extends__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_extends__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @babel/runtime/regenerator */ "./node_modules/@babel/runtime/regenerator/index.js");
/* harmony import */ var _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _babel_runtime_helpers_asyncToGenerator__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @babel/runtime/helpers/asyncToGenerator */ "./node_modules/@babel/runtime/helpers/asyncToGenerator.js");
/* harmony import */ var _babel_runtime_helpers_asyncToGenerator__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_asyncToGenerator__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @babel/runtime/helpers/createClass */ "./node_modules/@babel/runtime/helpers/createClass.js");
/* harmony import */ var _babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _babel_runtime_helpers_assertThisInitialized__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @babel/runtime/helpers/assertThisInitialized */ "./node_modules/@babel/runtime/helpers/assertThisInitialized.js");
/* harmony import */ var _babel_runtime_helpers_assertThisInitialized__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_assertThisInitialized__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var _babel_runtime_helpers_possibleConstructorReturn__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @babel/runtime/helpers/possibleConstructorReturn */ "./node_modules/@babel/runtime/helpers/possibleConstructorReturn.js");
/* harmony import */ var _babel_runtime_helpers_possibleConstructorReturn__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_possibleConstructorReturn__WEBPACK_IMPORTED_MODULE_5__);
/* harmony import */ var _babel_runtime_helpers_getPrototypeOf__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @babel/runtime/helpers/getPrototypeOf */ "./node_modules/@babel/runtime/helpers/getPrototypeOf.js");
/* harmony import */ var _babel_runtime_helpers_getPrototypeOf__WEBPACK_IMPORTED_MODULE_6___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_getPrototypeOf__WEBPACK_IMPORTED_MODULE_6__);
/* harmony import */ var _babel_runtime_helpers_inheritsLoose__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! @babel/runtime/helpers/inheritsLoose */ "./node_modules/@babel/runtime/helpers/inheritsLoose.js");
/* harmony import */ var _babel_runtime_helpers_inheritsLoose__WEBPACK_IMPORTED_MODULE_7___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_inheritsLoose__WEBPACK_IMPORTED_MODULE_7__);
/* harmony import */ var _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! @babel/runtime/helpers/defineProperty */ "./node_modules/@babel/runtime/helpers/defineProperty.js");
/* harmony import */ var _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_8___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_8__);
/* harmony import */ var Payone_components_molecules_payone_credit_card_payone_credit_card__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! Payone/components/molecules/payone-credit-card/payone-credit-card */ "./vendor/spryker-eco/payone/src/SprykerEco/Yves/Payone/Theme/default/components/molecules/payone-credit-card/payone-credit-card.ts");










function _createSuper(Derived) { return function () { var Super = _babel_runtime_helpers_getPrototypeOf__WEBPACK_IMPORTED_MODULE_6___default()(Derived), result; if (_isNativeReflectConstruct()) { var NewTarget = _babel_runtime_helpers_getPrototypeOf__WEBPACK_IMPORTED_MODULE_6___default()(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _babel_runtime_helpers_possibleConstructorReturn__WEBPACK_IMPORTED_MODULE_5___default()(this, result); }; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Date.prototype.toString.call(Reflect.construct(Date, [], function () {})); return true; } catch (e) { return false; } }

/* tslint:disable: no-any */

/* tslint:enable: no-any */

var VALID_RESPONSE_STATUS = 'VALID';
var CHECK_CALLBACK_ID = 'checkCallback';
var CURRENT_PAYMENT_METHOD = 'payoneCreditCard';
var defaultHostedIFramesConfig = {
  fields: {
    cardtype: {
      selector: 'cardtype',
      cardtypes: ['V', 'M']
    },
    cardpan: {
      selector: 'cardpan',
      type: 'text'
    },
    cardcvc2: {
      selector: 'cardcvc2',
      type: 'password',
      size: '3',
      maxlength: '3',
      length: {
        V: 3,
        M: 3
      }
    },
    cardexpiremonth: {
      selector: 'cardexpiremonth',
      type: 'select',
      size: '2',
      maxlength: '2',
      iframe: {
        width: '100%'
      }
    },
    cardexpireyear: {
      selector: 'cardexpireyear',
      type: 'select',
      iframe: {
        width: '100%'
      }
    }
  },
  defaultStyle: {
    input: "\n            margin: 0;\n            font-size: 0.9375rem;\n            font-weight: 700;\n            line-height: 1.125rem;\n            font-family: sans-serif;\n            height: 50px;\n            width: 100%;\n            border: 0.0625rem solid #dce0e5;\n            padding: 0.5rem 0.5rem 0.75rem;\n            color: #4a4a4a;\n            border-radius: 0.125rem;\n        ",
    inputFocus: "\n            margin: 0;\n            font-size: 0.9375rem;\n            font-weight: 700;\n            line-height: 1.125rem;\n            font-family: sans-serif;\n            height: 50px;\n            width: 100%;\n            border: 0.0625rem solid #dce0e5;\n            padding: 0.5rem 0.5rem 0.75rem;\n            color: #4a4a4a;\n            border-radius: 0.125rem;\n            outline: 0;\n        ",
    select: "\n            margin: 0;\n            font-size: 0.875em;\n            height: 50px;\n            width: 100%;\n            border: 0.0625rem solid #dce0e5;\n            border-radius: 0.125rem;\n            background-color: #fefefe;\n        ",
    selectFocus: "\n            margin: 0;\n            font-size: 0.875em;\n            height: 50px;\n            width: 100%;\n            border: 0.0625rem solid #dce0e5;\n            border-radius: 0.125rem;\n            background-color: #fefefe;\n            outline: 0;\n        ",
    iframe: {
      height: '56px',
      width: '100%',
      margin: 0
    }
  },
  error: 'errorOutput'
};

var PayoneCreditCard = /*#__PURE__*/function (_EcoPayoneCreditCard) {
  _babel_runtime_helpers_inheritsLoose__WEBPACK_IMPORTED_MODULE_7___default()(PayoneCreditCard, _EcoPayoneCreditCard);

  var _super = _createSuper(PayoneCreditCard);

  function PayoneCreditCard() {
    var _this;

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this = _EcoPayoneCreditCard.call.apply(_EcoPayoneCreditCard, [this].concat(args)) || this;

    _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_8___default()(_babel_runtime_helpers_assertThisInitialized__WEBPACK_IMPORTED_MODULE_4___default()(_this), "submitButton", void 0);

    return _this;
  }

  var _proto = PayoneCreditCard.prototype;

  _proto.readyCallback = function readyCallback() {
    var _this2 = this;

    this.scriptLoader = this.querySelector('script-loader');
    this.form = document.querySelector(this.formSelector);
    this.cardHolderInput = this.querySelector(this.cardHolderSelector);
    this.clientApiConfigInput = this.querySelector(this.clientApiConfigSelector);
    this.languageInput = this.querySelector(this.languageSelector);
    this.pseudoCardPanInput = this.querySelector(this.pseudoCardPanSelector);
    this.errorElement = this.querySelector(this.errorContainer);
    this.mapEvents();
    this.submitButton = Array.from(document.getElementsByClassName(this.jsName + "__submit"));
    this.submitButton.forEach(function (button) {
      button.addEventListener('click', function (event) {
        return _this2.onSubmit(event);
      });
    });
  };

  _proto.mapEvents = function mapEvents() {
    var _this3 = this;

    this.scriptLoader.addEventListener('scriptload', function (event) {
      return _this3.onScriptLoad(event);
    });
    this.form.addEventListener('submit', function (event) {
      return _this3.onSubmit(event);
    });
  };

  _proto.enableSubmit = function enableSubmit() {
    this.submitButton.forEach(function (button) {
      button.removeAttribute('disabled');
    });
  };

  _proto.loadPayoneIFrame = function loadPayoneIFrame() {
    this.hostedIFramesApi = new Payone.ClientApi.HostedIFrames(this.hostedIFramesConfig, this.clientApiConfig);
    Payone.ClientApi.Language.de.placeholders.cardpan = '_ _ _ _  _ _ _ _  _ _ _ _  _ _ _ _';
    Payone.ClientApi.Language.de.placeholders.cvc = '• • •';
  };

  _proto.onSubmit = function onSubmit(event) {
    event.preventDefault();

    if (typeof this.isCurrentPaymentMethod === 'undefined') {
      this.enableSubmit();
      return;
    }

    if (!this.isCurrentPaymentMethod || this.isPaymentValid) {
      this.form.submit();
    }

    this.checkCreditCard();
  };

  _proto.checkCreditCard = function checkCreditCard() {
    if (this.hostedIFramesApi.isComplete() && this.cardHolderInput.value) {
      this.hostedIFramesApi.creditCardCheck(CHECK_CALLBACK_ID);
      return;
    }

    this.errorElement.innerHTML = this.hostedIFramesConfig.language.transactionRejected;
    this.enableSubmit();
  }
  /* tslint:disable: no-any */
  ;

  _proto.checkCallback =
  /*#__PURE__*/
  function () {
    var _checkCallback = _babel_runtime_helpers_asyncToGenerator__WEBPACK_IMPORTED_MODULE_2___default()( /*#__PURE__*/_babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_1___default.a.mark(function _callee(response) {
      return _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_1___default.a.wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              if (!(response.status !== VALID_RESPONSE_STATUS)) {
                _context.next = 3;
                break;
              }

              this.enableSubmit();
              return _context.abrupt("return");

            case 3:
              _context.next = 5;
              return Promise.resolve(response.pseudocardpan);

            case 5:
              this.pseudoCardPanInput.value = _context.sent;
              this.setPaymentToValid();
              this.form.submit();

            case 8:
            case "end":
              return _context.stop();
          }
        }
      }, _callee, this);
    }));

    function checkCallback(_x) {
      return _checkCallback.apply(this, arguments);
    }

    return checkCallback;
  }();

  _babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_3___default()(PayoneCreditCard, [{
    key: "hostedIFramesConfig",
    get: function get() {
      return _babel_runtime_helpers_extends__WEBPACK_IMPORTED_MODULE_0___default()({}, defaultHostedIFramesConfig, {
        language: this.language
      });
    }
  }, {
    key: "isCurrentPaymentMethod",
    get: function get() {
      var currentPaymentMethodInput = document.querySelector(this.currentPaymentMethodSelector);
      return (currentPaymentMethodInput == null ? void 0 : currentPaymentMethodInput.value) ? currentPaymentMethodInput.value === CURRENT_PAYMENT_METHOD : undefined;
    }
  }]);

  return PayoneCreditCard;
}(Payone_components_molecules_payone_credit_card_payone_credit_card__WEBPACK_IMPORTED_MODULE_9__["default"]);



/***/ }),

/***/ "./vendor/spryker-eco/payone/src/SprykerEco/Yves/Payone/Theme/default/components/molecules/payone-credit-card/payone-credit-card.ts":
/*!******************************************************************************************************************************************!*\
  !*** ./vendor/spryker-eco/payone/src/SprykerEco/Yves/Payone/Theme/default/components/molecules/payone-credit-card/payone-credit-card.ts ***!
  \******************************************************************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return PayoneCreditCard; });
/* harmony import */ var _babel_runtime_helpers_extends__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @babel/runtime/helpers/extends */ "./node_modules/@babel/runtime/helpers/extends.js");
/* harmony import */ var _babel_runtime_helpers_extends__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_extends__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @babel/runtime/regenerator */ "./node_modules/@babel/runtime/regenerator/index.js");
/* harmony import */ var _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _babel_runtime_helpers_asyncToGenerator__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @babel/runtime/helpers/asyncToGenerator */ "./node_modules/@babel/runtime/helpers/asyncToGenerator.js");
/* harmony import */ var _babel_runtime_helpers_asyncToGenerator__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_asyncToGenerator__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @babel/runtime/helpers/createClass */ "./node_modules/@babel/runtime/helpers/createClass.js");
/* harmony import */ var _babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _babel_runtime_helpers_assertThisInitialized__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @babel/runtime/helpers/assertThisInitialized */ "./node_modules/@babel/runtime/helpers/assertThisInitialized.js");
/* harmony import */ var _babel_runtime_helpers_assertThisInitialized__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_assertThisInitialized__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var _babel_runtime_helpers_possibleConstructorReturn__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @babel/runtime/helpers/possibleConstructorReturn */ "./node_modules/@babel/runtime/helpers/possibleConstructorReturn.js");
/* harmony import */ var _babel_runtime_helpers_possibleConstructorReturn__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_possibleConstructorReturn__WEBPACK_IMPORTED_MODULE_5__);
/* harmony import */ var _babel_runtime_helpers_getPrototypeOf__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @babel/runtime/helpers/getPrototypeOf */ "./node_modules/@babel/runtime/helpers/getPrototypeOf.js");
/* harmony import */ var _babel_runtime_helpers_getPrototypeOf__WEBPACK_IMPORTED_MODULE_6___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_getPrototypeOf__WEBPACK_IMPORTED_MODULE_6__);
/* harmony import */ var _babel_runtime_helpers_inheritsLoose__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! @babel/runtime/helpers/inheritsLoose */ "./node_modules/@babel/runtime/helpers/inheritsLoose.js");
/* harmony import */ var _babel_runtime_helpers_inheritsLoose__WEBPACK_IMPORTED_MODULE_7___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_inheritsLoose__WEBPACK_IMPORTED_MODULE_7__);
/* harmony import */ var _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! @babel/runtime/helpers/defineProperty */ "./node_modules/@babel/runtime/helpers/defineProperty.js");
/* harmony import */ var _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_8___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_8__);
/* harmony import */ var ShopUi_models_component__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ShopUi/models/component */ "./vendor/spryker-shop/shop-ui/src/SprykerShop/Yves/ShopUi/Theme/default/models/component.ts");










function _createSuper(Derived) { return function () { var Super = _babel_runtime_helpers_getPrototypeOf__WEBPACK_IMPORTED_MODULE_6___default()(Derived), result; if (_isNativeReflectConstruct()) { var NewTarget = _babel_runtime_helpers_getPrototypeOf__WEBPACK_IMPORTED_MODULE_6___default()(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _babel_runtime_helpers_possibleConstructorReturn__WEBPACK_IMPORTED_MODULE_5___default()(this, result); }; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Date.prototype.toString.call(Reflect.construct(Date, [], function () {})); return true; } catch (e) { return false; } }

/* tslint:disable: no-any */

/* tslint:disable: max-file-line-count */

var CURRENT_PAYMENT_METHOD = 'payoneCreditCard';
var CHECK_CALLBACK_ID = 'checkCallback';
var CHECK_CALLBACK_VALID_RESPONSE_STATUS = 'VALID'; // configuration for Hosted Iframe.
// https://github.com/fjbender/simple-php-integration#build-the-form

var defaultHostedIFramesConfig = {
  fields: {
    cardtype: {
      selector: 'cardtype',
      cardtypes: ['V', 'M']
    },
    cardpan: {
      selector: 'cardpan',
      type: 'text'
    },
    cardcvc2: {
      selector: 'cardcvc2',
      type: 'password',
      size: '3',
      maxlength: '3',
      length: {
        V: 3,
        M: 3
      }
    },
    cardexpiremonth: {
      selector: 'cardexpiremonth',
      type: 'select',
      size: '2',
      maxlength: '2',
      iframe: {
        width: '100%'
      }
    },
    cardexpireyear: {
      selector: 'cardexpireyear',
      type: 'select',
      iframe: {
        width: '100%'
      }
    }
  },
  defaultStyle: {
    input: "font-size: 0.875em; height: 2rem; width: 100%; border: 0; outline: 1px solid #dadada; outline-offset: -1px;",
    select: "font-size: 0.875em; height: 2rem; width: 100%; border: 0; outline: 1px solid #dadada; outline-offset: -1px; background-color: #fefefe;",
    iframe: {
      height: '35px',
      width: '100%'
    }
  },
  error: 'errorOutput'
};

var PayoneCreditCard = /*#__PURE__*/function (_Component) {
  _babel_runtime_helpers_inheritsLoose__WEBPACK_IMPORTED_MODULE_7___default()(PayoneCreditCard, _Component);

  var _super = _createSuper(PayoneCreditCard);

  function PayoneCreditCard() {
    var _this;

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this = _Component.call.apply(_Component, [this].concat(args)) || this;

    _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_8___default()(_babel_runtime_helpers_assertThisInitialized__WEBPACK_IMPORTED_MODULE_4___default()(_this), "scriptLoader", void 0);

    _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_8___default()(_babel_runtime_helpers_assertThisInitialized__WEBPACK_IMPORTED_MODULE_4___default()(_this), "form", void 0);

    _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_8___default()(_babel_runtime_helpers_assertThisInitialized__WEBPACK_IMPORTED_MODULE_4___default()(_this), "hostedIFramesApi", void 0);

    _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_8___default()(_babel_runtime_helpers_assertThisInitialized__WEBPACK_IMPORTED_MODULE_4___default()(_this), "cardTypeInput", void 0);

    _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_8___default()(_babel_runtime_helpers_assertThisInitialized__WEBPACK_IMPORTED_MODULE_4___default()(_this), "cardHolderInput", void 0);

    _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_8___default()(_babel_runtime_helpers_assertThisInitialized__WEBPACK_IMPORTED_MODULE_4___default()(_this), "clientApiConfigInput", void 0);

    _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_8___default()(_babel_runtime_helpers_assertThisInitialized__WEBPACK_IMPORTED_MODULE_4___default()(_this), "languageInput", void 0);

    _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_8___default()(_babel_runtime_helpers_assertThisInitialized__WEBPACK_IMPORTED_MODULE_4___default()(_this), "pseudoCardPanInput", void 0);

    _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_8___default()(_babel_runtime_helpers_assertThisInitialized__WEBPACK_IMPORTED_MODULE_4___default()(_this), "errorElement", void 0);

    _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_8___default()(_babel_runtime_helpers_assertThisInitialized__WEBPACK_IMPORTED_MODULE_4___default()(_this), "isPaymentValid", false);

    _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_8___default()(_babel_runtime_helpers_assertThisInitialized__WEBPACK_IMPORTED_MODULE_4___default()(_this), "submitButton", void 0);

    return _this;
  }

  var _proto = PayoneCreditCard.prototype;

  _proto.readyCallback = function readyCallback() {};

  _proto.init = function init() {
    this.scriptLoader = this.querySelector('script-loader');
    this.form = document.querySelector(this.formSelector);
    this.cardHolderInput = this.querySelector(this.cardHolderSelector);
    this.clientApiConfigInput = this.querySelector(this.clientApiConfigSelector);
    this.languageInput = this.querySelector(this.languageSelector);
    this.pseudoCardPanInput = this.querySelector(this.pseudoCardPanSelector);
    this.errorElement = this.querySelector(this.errorContainer);
    this.submitButton = Array.from(document.getElementsByClassName(this.jsName + "__submit"));
    this.mapEvents();
  };

  _proto.mapEvents = function mapEvents() {
    var _this2 = this;

    this.scriptLoader.addEventListener('scriptload', function (event) {
      return _this2.onScriptLoad(event);
    });
    this.form.addEventListener('submit', function (event) {
      return _this2.onSubmit(event);
    });
  };

  _proto.onScriptLoad = function onScriptLoad(event) {
    this.addCheckCallbackToGlobalScope();
    this.loadPayoneIFrame();
  };

  _proto.onSubmit = function onSubmit(event) {
    if (!this.isCurrentPaymentMethod) {
      return;
    }

    event.preventDefault();

    if (this.isPaymentValid) {
      this.form.submit();
    }

    this.checkCreditCard();
  };

  _proto.addCheckCallbackToGlobalScope = function addCheckCallbackToGlobalScope() {
    window[CHECK_CALLBACK_ID] = this.checkCallback.bind(this);
  };

  _proto.checkCallback = /*#__PURE__*/function () {
    var _checkCallback = _babel_runtime_helpers_asyncToGenerator__WEBPACK_IMPORTED_MODULE_2___default()( /*#__PURE__*/_babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_1___default.a.mark(function _callee(response) {
      var _this3 = this;

      return _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_1___default.a.wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              if (!(response.status !== CHECK_CALLBACK_VALID_RESPONSE_STATUS)) {
                _context.next = 3;
                break;
              }

              setTimeout(function () {
                return _this3.enableSubmit();
              }, 0);
              return _context.abrupt("return");

            case 3:
              _context.next = 5;
              return Promise.resolve(response.pseudocardpan);

            case 5:
              this.pseudoCardPanInput.value = _context.sent;
              this.setPaymentToValid();
              this.form.submit();

            case 8:
            case "end":
              return _context.stop();
          }
        }
      }, _callee, this);
    }));

    function checkCallback(_x) {
      return _checkCallback.apply(this, arguments);
    }

    return checkCallback;
  }();

  _proto.checkCreditCard = function checkCreditCard() {
    var _this4 = this;

    if (this.hostedIFramesApi.isComplete() && this.cardHolderInput.value) {
      this.hostedIFramesApi.creditCardCheck(CHECK_CALLBACK_ID);
      return;
    }

    this.errorElement.innerHTML = this.hostedIFramesConfig.language.transactionRejected;
    setTimeout(function () {
      return _this4.enableSubmit();
    }, 0);
  };

  _proto.enableSubmit = function enableSubmit() {
    if (this.submitButton.length) {
      this.submitButton.forEach(function (button) {
        button.removeAttribute('disabled');
      });
      return;
    }

    var buttons = Array.from(this.form.getElementsByTagName('button'));
    buttons.forEach(function (button) {
      button.removeAttribute('disabled');
    });
  };

  _proto.loadPayoneIFrame = function loadPayoneIFrame() {
    this.hostedIFramesApi = new Payone.ClientApi.HostedIFrames(this.hostedIFramesConfig, this.clientApiConfig);
    Payone.ClientApi.Language.de.placeholders.cardpan = '_ _ _ _  _ _ _ _  _ _ _ _  _ _ _ _';
    Payone.ClientApi.Language.de.placeholders.cvc = '• • •';
  };

  _proto.setPaymentToValid = function setPaymentToValid() {
    this.isPaymentValid = true;
  };

  _babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_3___default()(PayoneCreditCard, [{
    key: "isCurrentPaymentMethod",
    get: function get() {
      var currentPaymentMethodInput = document.querySelector(this.currentPaymentMethodSelector);
      return (currentPaymentMethodInput == null ? void 0 : currentPaymentMethodInput.value) ? currentPaymentMethodInput.value === CURRENT_PAYMENT_METHOD : null;
    }
  }, {
    key: "language",
    get: function get() {
      var languageCodeLenght = 2;
      var languageCode = !!this.languageInput.value ? this.languageInput.value.substr(0, languageCodeLenght) : 'de';
      return Payone.ClientApi.Language[languageCode] || Payone.ClientApi.Language.de;
    }
  }, {
    key: "hostedIFramesConfig",
    get: function get() {
      return _babel_runtime_helpers_extends__WEBPACK_IMPORTED_MODULE_0___default()({}, defaultHostedIFramesConfig, {
        language: this.language
      });
    }
  }, {
    key: "clientApiConfig",
    get: function get() {
      return JSON.parse(this.clientApiConfigInput.value);
    }
  }, {
    key: "formSelector",
    get: function get() {
      return this.getAttribute('form-selector');
    }
  }, {
    key: "clientApiConfigSelector",
    get: function get() {
      return this.getAttribute('client-api-config-selector');
    }
  }, {
    key: "languageSelector",
    get: function get() {
      return this.getAttribute('language-selector');
    }
  }, {
    key: "cardTypeSelector",
    get: function get() {
      return this.getAttribute('card-type-selector');
    }
  }, {
    key: "cardHolderSelector",
    get: function get() {
      return this.getAttribute('card-holder-selector');
    }
  }, {
    key: "pseudoCardPanSelector",
    get: function get() {
      return this.getAttribute('pseudo-card-pan-selector');
    }
  }, {
    key: "errorContainer",
    get: function get() {
      return this.getAttribute('error-container-selector');
    }
  }, {
    key: "currentPaymentMethodSelector",
    get: function get() {
      return this.getAttribute('current-payment-method-selector');
    }
  }]);

  return PayoneCreditCard;
}(ShopUi_models_component__WEBPACK_IMPORTED_MODULE_9__["default"]);



/***/ })

}]);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvQGJhYmVsL3J1bnRpbWUvaGVscGVycy9leHRlbmRzLmpzIiwid2VicGFjazovLy8uL3NyYy9QeXovWXZlcy9QYXlvbmUvVGhlbWUvZGVmYXVsdC9jb21wb25lbnRzL21vbGVjdWxlcy9wYXlvbmUtY3JlZGl0LWNhcmQvcGF5b25lLWNyZWRpdC1jYXJkLnRzIiwid2VicGFjazovLy8uL3ZlbmRvci9zcHJ5a2VyLWVjby9wYXlvbmUvc3JjL1NwcnlrZXJFY28vWXZlcy9QYXlvbmUvVGhlbWUvZGVmYXVsdC9jb21wb25lbnRzL21vbGVjdWxlcy9wYXlvbmUtY3JlZGl0LWNhcmQvcGF5b25lLWNyZWRpdC1jYXJkLnRzIl0sIm5hbWVzIjpbIlZBTElEX1JFU1BPTlNFX1NUQVRVUyIsIkNIRUNLX0NBTExCQUNLX0lEIiwiQ1VSUkVOVF9QQVlNRU5UX01FVEhPRCIsImRlZmF1bHRIb3N0ZWRJRnJhbWVzQ29uZmlnIiwiZmllbGRzIiwiY2FyZHR5cGUiLCJzZWxlY3RvciIsImNhcmR0eXBlcyIsImNhcmRwYW4iLCJ0eXBlIiwiY2FyZGN2YzIiLCJzaXplIiwibWF4bGVuZ3RoIiwibGVuZ3RoIiwiViIsIk0iLCJjYXJkZXhwaXJlbW9udGgiLCJpZnJhbWUiLCJ3aWR0aCIsImNhcmRleHBpcmV5ZWFyIiwiZGVmYXVsdFN0eWxlIiwiaW5wdXQiLCJpbnB1dEZvY3VzIiwic2VsZWN0Iiwic2VsZWN0Rm9jdXMiLCJoZWlnaHQiLCJtYXJnaW4iLCJlcnJvciIsIlBheW9uZUNyZWRpdENhcmQiLCJyZWFkeUNhbGxiYWNrIiwic2NyaXB0TG9hZGVyIiwicXVlcnlTZWxlY3RvciIsImZvcm0iLCJkb2N1bWVudCIsImZvcm1TZWxlY3RvciIsImNhcmRIb2xkZXJJbnB1dCIsImNhcmRIb2xkZXJTZWxlY3RvciIsImNsaWVudEFwaUNvbmZpZ0lucHV0IiwiY2xpZW50QXBpQ29uZmlnU2VsZWN0b3IiLCJsYW5ndWFnZUlucHV0IiwibGFuZ3VhZ2VTZWxlY3RvciIsInBzZXVkb0NhcmRQYW5JbnB1dCIsInBzZXVkb0NhcmRQYW5TZWxlY3RvciIsImVycm9yRWxlbWVudCIsImVycm9yQ29udGFpbmVyIiwibWFwRXZlbnRzIiwic3VibWl0QnV0dG9uIiwiQXJyYXkiLCJmcm9tIiwiZ2V0RWxlbWVudHNCeUNsYXNzTmFtZSIsImpzTmFtZSIsImZvckVhY2giLCJidXR0b24iLCJhZGRFdmVudExpc3RlbmVyIiwiZXZlbnQiLCJvblN1Ym1pdCIsIm9uU2NyaXB0TG9hZCIsImVuYWJsZVN1Ym1pdCIsInJlbW92ZUF0dHJpYnV0ZSIsImxvYWRQYXlvbmVJRnJhbWUiLCJob3N0ZWRJRnJhbWVzQXBpIiwiUGF5b25lIiwiQ2xpZW50QXBpIiwiSG9zdGVkSUZyYW1lcyIsImhvc3RlZElGcmFtZXNDb25maWciLCJjbGllbnRBcGlDb25maWciLCJMYW5ndWFnZSIsImRlIiwicGxhY2Vob2xkZXJzIiwiY3ZjIiwicHJldmVudERlZmF1bHQiLCJpc0N1cnJlbnRQYXltZW50TWV0aG9kIiwiaXNQYXltZW50VmFsaWQiLCJzdWJtaXQiLCJjaGVja0NyZWRpdENhcmQiLCJpc0NvbXBsZXRlIiwidmFsdWUiLCJjcmVkaXRDYXJkQ2hlY2siLCJpbm5lckhUTUwiLCJsYW5ndWFnZSIsInRyYW5zYWN0aW9uUmVqZWN0ZWQiLCJjaGVja0NhbGxiYWNrIiwicmVzcG9uc2UiLCJzdGF0dXMiLCJQcm9taXNlIiwicmVzb2x2ZSIsInBzZXVkb2NhcmRwYW4iLCJzZXRQYXltZW50VG9WYWxpZCIsImN1cnJlbnRQYXltZW50TWV0aG9kSW5wdXQiLCJjdXJyZW50UGF5bWVudE1ldGhvZFNlbGVjdG9yIiwidW5kZWZpbmVkIiwiRWNvUGF5b25lQ3JlZGl0Q2FyZCIsIkNIRUNLX0NBTExCQUNLX1ZBTElEX1JFU1BPTlNFX1NUQVRVUyIsImluaXQiLCJhZGRDaGVja0NhbGxiYWNrVG9HbG9iYWxTY29wZSIsIndpbmRvdyIsImJpbmQiLCJzZXRUaW1lb3V0IiwiYnV0dG9ucyIsImdldEVsZW1lbnRzQnlUYWdOYW1lIiwibGFuZ3VhZ2VDb2RlTGVuZ2h0IiwibGFuZ3VhZ2VDb2RlIiwic3Vic3RyIiwiSlNPTiIsInBhcnNlIiwiZ2V0QXR0cmlidXRlIiwiQ29tcG9uZW50Il0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7QUFBQTtBQUNBO0FBQ0EsbUJBQW1CLHNCQUFzQjtBQUN6Qzs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBLDBCOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQ2xCQTs7QUFFQTtBQUNBO0FBR0EsSUFBTUEscUJBQXFCLEdBQUcsT0FBOUI7QUFDQSxJQUFNQyxpQkFBaUIsR0FBRyxlQUExQjtBQUNBLElBQU1DLHNCQUFzQixHQUFHLGtCQUEvQjtBQUVBLElBQU1DLDBCQUEwQixHQUFHO0FBQy9CQyxRQUFNLEVBQUU7QUFDSkMsWUFBUSxFQUFFO0FBQ05DLGNBQVEsRUFBRSxVQURKO0FBRU5DLGVBQVMsRUFBRSxDQUFDLEdBQUQsRUFBTSxHQUFOO0FBRkwsS0FETjtBQUtKQyxXQUFPLEVBQUU7QUFDTEYsY0FBUSxFQUFFLFNBREw7QUFFTEcsVUFBSSxFQUFFO0FBRkQsS0FMTDtBQVNKQyxZQUFRLEVBQUU7QUFDTkosY0FBUSxFQUFFLFVBREo7QUFFTkcsVUFBSSxFQUFFLFVBRkE7QUFHTkUsVUFBSSxFQUFFLEdBSEE7QUFJTkMsZUFBUyxFQUFFLEdBSkw7QUFLTkMsWUFBTSxFQUFFO0FBQUNDLFNBQUMsRUFBRSxDQUFKO0FBQU9DLFNBQUMsRUFBRTtBQUFWO0FBTEYsS0FUTjtBQWdCSkMsbUJBQWUsRUFBRTtBQUNiVixjQUFRLEVBQUUsaUJBREc7QUFFYkcsVUFBSSxFQUFFLFFBRk87QUFHYkUsVUFBSSxFQUFFLEdBSE87QUFJYkMsZUFBUyxFQUFFLEdBSkU7QUFLYkssWUFBTSxFQUFFO0FBQ0pDLGFBQUssRUFBRTtBQURIO0FBTEssS0FoQmI7QUF5QkpDLGtCQUFjLEVBQUU7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QWtCLGVBQWxCLENBQVA7QUFDSDs7O3dCQUVxQztBQUNsQyxhQUFPLEtBQUtBLFlBQUwsQ0FBa0IsNEJBQWxCLENBQVA7QUFDSDs7O3dCQUU4QjtBQUMzQixhQUFPLEtBQUtBLFlBQUwsQ0FBa0IsbUJBQWxCLENBQVA7QUFDSDs7O3dCQUU4QjtBQUMzQixhQUFPLEtBQUtBLFlBQUwsQ0FBa0Isb0JBQWxCLENBQVA7QUFDSDs7O3dCQUVnQztBQUM3QixhQUFPLEtBQUtBLFlBQUwsQ0FBa0Isc0JBQWxCLENBQVA7QUFDSDs7O3dCQUVtQztBQUNoQyxhQUFPLEtBQUtBLFlBQUwsQ0FBa0IsMEJBQWxCLENBQVA7QUFDSDs7O3dCQUU0QjtBQUN6QixhQUFPLEtBQUtBLFlBQUwsQ0FBa0IsMEJBQWxCLENBQVA7QUFDSDs7O3dCQUUwQztBQUN2QyxhQUFPLEtBQUtBLFlBQUwsQ0FBa0IsaUNBQWxCLENBQVA7QUFDSDs7OztFQXBLeUNDLCtEIiwiZmlsZSI6Ii4vanMveXZlc19kZWZhdWx0LjAubGVnYWN5LmpzIiwic291cmNlc0NvbnRlbnQiOlsiZnVuY3Rpb24gX2V4dGVuZHMoKSB7XG4gIG1vZHVsZS5leHBvcnRzID0gX2V4dGVuZHMgPSBPYmplY3QuYXNzaWduIHx8IGZ1bmN0aW9uICh0YXJnZXQpIHtcbiAgICBmb3IgKHZhciBpID0gMTsgaSA8IGFyZ3VtZW50cy5sZW5ndGg7IGkrKykge1xuICAgICAgdmFyIHNvdXJjZSA9IGFyZ3VtZW50c1tpXTtcblxuICAgICAgZm9yICh2YXIga2V5IGluIHNvdXJjZSkge1xuICAgICAgICBpZiAoT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKHNvdXJjZSwga2V5KSkge1xuICAgICAgICAgIHRhcmdldFtrZXldID0gc291cmNlW2tleV07XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9XG5cbiAgICByZXR1cm4gdGFyZ2V0O1xuICB9O1xuXG4gIHJldHVybiBfZXh0ZW5kcy5hcHBseSh0aGlzLCBhcmd1bWVudHMpO1xufVxuXG5tb2R1bGUuZXhwb3J0cyA9IF9leHRlbmRzOyIsIi8qIHRzbGludDpkaXNhYmxlOiBuby1hbnkgKi9cbmRlY2xhcmUgdmFyIFBheW9uZTogYW55O1xuLyogdHNsaW50OmVuYWJsZTogbm8tYW55ICovXG5pbXBvcnQgRWNvUGF5b25lQ3JlZGl0Q2FyZCBmcm9tICdQYXlvbmUvY29tcG9uZW50cy9tb2xlY3VsZXMvcGF5b25lLWNyZWRpdC1jYXJkL3BheW9uZS1jcmVkaXQtY2FyZCc7XG5pbXBvcnQgU2NyaXB0TG9hZGVyIGZyb20gJ1Nob3BVaS9jb21wb25lbnRzL21vbGVjdWxlcy9zY3JpcHQtbG9hZGVyL3NjcmlwdC1sb2FkZXInO1xuXG5jb25zdCBWQUxJRF9SRVNQT05TRV9TVEFUVVMgPSAnVkFMSUQnO1xuY29uc3QgQ0hFQ0tfQ0FMTEJBQ0tfSUQgPSAnY2hlY2tDYWxsYmFjayc7XG5jb25zdCBDVVJSRU5UX1BBWU1FTlRfTUVUSE9EID0gJ3BheW9uZUNyZWRpdENhcmQnO1xuXG5jb25zdCBkZWZhdWx0SG9zdGVkSUZyYW1lc0NvbmZpZyA9IHtcbiAgICBmaWVsZHM6IHtcbiAgICAgICAgY2FyZHR5cGU6IHtcbiAgICAgICAgICAgIHNlbGVjdG9yOiAnY2FyZHR5cGUnLFxuICAgICAgICAgICAgY2FyZHR5cGVzOiBbJ1YnLCAnTSddLFxuICAgICAgICB9LFxuICAgICAgICBjYXJkcGFuOiB7XG4gICAgICAgICAgICBzZWxlY3RvcjogJ2NhcmRwYW4nLFxuICAgICAgICAgICAgdHlwZTogJ3RleHQnLFxuICAgICAgICB9LFxuICAgICAgICBjYXJkY3ZjMjoge1xuICAgICAgICAgICAgc2VsZWN0b3I6ICdjYXJkY3ZjMicsXG4gICAgICAgICAgICB0eXBlOiAncGFzc3dvcmQnLFxuICAgICAgICAgICAgc2l6ZTogJzMnLFxuICAgICAgICAgICAgbWF4bGVuZ3RoOiAnMycsXG4gICAgICAgICAgICBsZW5ndGg6IHtWOiAzLCBNOiAzfSxcbiAgICAgICAgfSxcbiAgICAgICAgY2FyZGV4cGlyZW1vbnRoOiB7XG4gICAgICAgICAgICBzZWxlY3RvcjogJ2NhcmRleHBpcmVtb250aCcsXG4gICAgICAgICAgICB0eXBlOiAnc2VsZWN0JyxcbiAgICAgICAgICAgIHNpemU6ICcyJyxcbiAgICAgICAgICAgIG1heGxlbmd0aDogJzInLFxuICAgICAgICAgICAgaWZyYW1lOiB7XG4gICAgICAgICAgICAgICAgd2lkdGg6ICcxMDAlJyxcbiAgICAgICAgICAgIH0sXG4gICAgICAgIH0sXG4gICAgICAgIGNhcmRleHBpcmV5ZWFyOiB7XG4gICAgICAgICAgICBzZWxlY3RvcjogJ2NhcmRleHBpcmV5ZWFyJyxcbiAgICAgICAgICAgIHR5cGU6ICdzZWxlY3QnLFxuICAgICAgICAgICAgaWZyYW1lOiB7XG4gICAgICAgICAgICAgICAgd2lkdGg6ICcxMDAlJyxcbiAgICAgICAgICAgIH0sXG4gICAgICAgIH0sXG4gICAgfSxcblxuICAgIGRlZmF1bHRTdHlsZToge1xuICAgICAgICBpbnB1dDogYFxuICAgICAgICAgICAgbWFyZ2luOiAwO1xuICAgICAgICAgICAgZm9udC1zaXplOiAwLjkzNzVyZW07XG4gICAgICAgICAgICBmb250LXdlaWdodDogNzAwO1xuICAgICAgICAgICAgbGluZS1oZWlnaHQ6IDEuMTI1cmVtO1xuICAgICAgICAgICAgZm9udC1mYW1pbHk6IHNhbnMtc2VyaWY7XG4gICAgICAgICAgICBoZWlnaHQ6IDUwcHg7XG4gICAgICAgICAgICB3aWR0aDogMTAwJTtcbiAgICAgICAgICAgIGJvcmRlcjogMC4wNjI1cmVtIHNvbGlkICNkY2UwZTU7XG4gICAgICAgICAgICBwYWRkaW5nOiAwLjVyZW0gMC41cmVtIDAuNzVyZW07XG4gICAgICAgICAgICBjb2xvcjogIzRhNGE0YTtcbiAgICAgICAgICAgIGJvcmRlci1yYWRpdXM6IDAuMTI1cmVtO1xuICAgICAgICBgLFxuICAgICAgICBpbnB1dEZvY3VzOiBgXG4gICAgICAgICAgICBtYXJnaW46IDA7XG4gICAgICAgICAgICBmb250LXNpemU6IDAuOTM3NXJlbTtcbiAgICAgICAgICAgIGZvbnQtd2VpZ2h0OiA3MDA7XG4gICAgICAgICAgICBsaW5lLWhlaWdodDogMS4xMjVyZW07XG4gICAgICAgICAgICBmb250LWZhbWlseTogc2Fucy1zZXJpZjtcbiAgICAgICAgICAgIGhlaWdodDogNTBweDtcbiAgICAgICAgICAgIHdpZHRoOiAxMDAlO1xuICAgICAgICAgICAgYm9yZGVyOiAwLjA2MjVyZW0gc29saWQgI2RjZTBlNTtcbiAgICAgICAgICAgIHBhZGRpbmc6IDAuNXJlbSAwLjVyZW0gMC43NXJlbTtcbiAgICAgICAgICAgIGNvbG9yOiAjNGE0YTRhO1xuICAgICAgICAgICAgYm9yZGVyLXJhZGl1czogMC4xMjVyZW07XG4gICAgICAgICAgICBvdXRsaW5lOiAwO1xuICAgICAgICBgLFxuICAgICAgICBzZWxlY3Q6IGBcbiAgICAgICAgICAgIG1hcmdpbjogMDtcbiAgICAgICAgICAgIGZvbnQtc2l6ZTogMC44NzVlbTtcbiAgICAgICAgICAgIGhlaWdodDogNTBweDtcbiAgICAgICAgICAgIHdpZHRoOiAxMDAlO1xuICAgICAgICAgICAgYm9yZGVyOiAwLjA2MjVyZW0gc29saWQgI2RjZTBlNTtcbiAgICAgICAgICAgIGJvcmRlci1yYWRpdXM6IDAuMTI1cmVtO1xuICAgICAgICAgICAgYmFja2dyb3VuZC1jb2xvcjogI2ZlZmVmZTtcbiAgICAgICAgYCxcbiAgICAgICAgc2VsZWN0Rm9jdXM6IGBcbiAgICAgICAgICAgIG1hcmdpbjogMDtcbiAgICAgICAgICAgIGZvbnQtc2l6ZTogMC44NzVlbTtcbiAgICAgICAgICAgIGhlaWdodDogNTBweDtcbiAgICAgICAgICAgIHdpZHRoOiAxMDAlO1xuICAgICAgICAgICAgYm9yZGVyOiAwLjA2MjVyZW0gc29saWQgI2RjZTBlNTtcbiAgICAgICAgICAgIGJvcmRlci1yYWRpdXM6IDAuMTI1cmVtO1xuICAgICAgICAgICAgYmFja2dyb3VuZC1jb2xvcjogI2ZlZmVmZTtcbiAgICAgICAgICAgIG91dGxpbmU6IDA7XG4gICAgICAgIGAsXG4gICAgICAgIGlmcmFtZToge1xuICAgICAgICAgICAgaGVpZ2h0OiAnNTZweCcsXG4gICAgICAgICAgICB3aWR0aDogJzEwMCUnLFxuICAgICAgICAgICAgbWFyZ2luOiAwLFxuICAgICAgICB9LFxuICAgIH0sXG5cbiAgICBlcnJvcjogJ2Vycm9yT3V0cHV0Jyxcbn07XG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIFBheW9uZUNyZWRpdENhcmQgZXh0ZW5kcyBFY29QYXlvbmVDcmVkaXRDYXJkIHtcbiAgICBwcm90ZWN0ZWQgc3VibWl0QnV0dG9uOiBIVE1MQnV0dG9uRWxlbWVudFtdO1xuXG4gICAgcHJvdGVjdGVkIHJlYWR5Q2FsbGJhY2soKTogdm9pZCB7XG4gICAgICAgIHRoaXMuc2NyaXB0TG9hZGVyID0gPFNjcmlwdExvYWRlcj50aGlzLnF1ZXJ5U2VsZWN0b3IoJ3NjcmlwdC1sb2FkZXInKTtcbiAgICAgICAgdGhpcy5mb3JtID0gPEhUTUxGb3JtRWxlbWVudD5kb2N1bWVudC5xdWVyeVNlbGVjdG9yKHRoaXMuZm9ybVNlbGVjdG9yKTtcbiAgICAgICAgdGhpcy5jYXJkSG9sZGVySW5wdXQgPSA8SFRNTElucHV0RWxlbWVudD50aGlzLnF1ZXJ5U2VsZWN0b3IodGhpcy5jYXJkSG9sZGVyU2VsZWN0b3IpO1xuICAgICAgICB0aGlzLmNsaWVudEFwaUNvbmZpZ0lucHV0ID0gPEhUTUxJbnB1dEVsZW1lbnQ+dGhpcy5xdWVyeVNlbGVjdG9yKHRoaXMuY2xpZW50QXBpQ29uZmlnU2VsZWN0b3IpO1xuICAgICAgICB0aGlzLmxhbmd1YWdlSW5wdXQgPSA8SFRNTElucHV0RWxlbWVudD50aGlzLnF1ZXJ5U2VsZWN0b3IodGhpcy5sYW5ndWFnZVNlbGVjdG9yKTtcbiAgICAgICAgdGhpcy5wc2V1ZG9DYXJkUGFuSW5wdXQgPSA8SFRNTElucHV0RWxlbWVudD50aGlzLnF1ZXJ5U2VsZWN0b3IodGhpcy5wc2V1ZG9DYXJkUGFuU2VsZWN0b3IpO1xuICAgICAgICB0aGlzLmVycm9yRWxlbWVudCA9IHRoaXMucXVlcnlTZWxlY3Rvcih0aGlzLmVycm9yQ29udGFpbmVyKTtcblxuICAgICAgICB0aGlzLm1hcEV2ZW50cygpO1xuXG4gICAgICAgIHRoaXMuc3VibWl0QnV0dG9uID0gPEhUTUxCdXR0b25FbGVtZW50W10+QXJyYXkuZnJvbShcbiAgICAgICAgICAgIGRvY3VtZW50LmdldEVsZW1lbnRzQnlDbGFzc05hbWUoYCR7dGhpcy5qc05hbWV9X19zdWJtaXRgKVxuICAgICAgICApO1xuXG4gICAgICAgIHRoaXMuc3VibWl0QnV0dG9uLmZvckVhY2goYnV0dG9uID0+IHtcbiAgICAgICAgICAgIGJ1dHRvbi5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIChldmVudDogRXZlbnQpID0+IHRoaXMub25TdWJtaXQoZXZlbnQpKTtcbiAgICAgICAgfSk7XG4gICAgfVxuXG4gICAgcHJvdGVjdGVkIG1hcEV2ZW50cygpOiB2b2lkIHtcbiAgICAgICAgdGhpcy5zY3JpcHRMb2FkZXIuYWRkRXZlbnRMaXN0ZW5lcignc2NyaXB0bG9hZCcsIChldmVudDogRXZlbnQpID0+IHRoaXMub25TY3JpcHRMb2FkKGV2ZW50KSk7XG4gICAgICAgIHRoaXMuZm9ybS5hZGRFdmVudExpc3RlbmVyKCdzdWJtaXQnLCAoZXZlbnQ6IEV2ZW50KSA9PiB0aGlzLm9uU3VibWl0KGV2ZW50KSk7XG4gICAgfVxuXG4gICAgcHJvdGVjdGVkIGVuYWJsZVN1Ym1pdCgpOiB2b2lkIHtcbiAgICAgICAgdGhpcy5zdWJtaXRCdXR0b24uZm9yRWFjaChidXR0b24gPT4ge1xuICAgICAgICAgICAgYnV0dG9uLnJlbW92ZUF0dHJpYnV0ZSgnZGlzYWJsZWQnKTtcbiAgICAgICAgfSk7XG4gICAgfVxuXG4gICAgcHJvdGVjdGVkIGxvYWRQYXlvbmVJRnJhbWUoKTogdm9pZCB7XG4gICAgICAgIHRoaXMuaG9zdGVkSUZyYW1lc0FwaSA9IG5ldyBQYXlvbmUuQ2xpZW50QXBpLkhvc3RlZElGcmFtZXModGhpcy5ob3N0ZWRJRnJhbWVzQ29uZmlnLCB0aGlzLmNsaWVudEFwaUNvbmZpZyk7XG5cbiAgICAgICAgUGF5b25lLkNsaWVudEFwaS5MYW5ndWFnZS5kZS5wbGFjZWhvbGRlcnMuY2FyZHBhbiA9ICdfIF8gXyBfICBfIF8gXyBfICBfIF8gXyBfICBfIF8gXyBfJztcbiAgICAgICAgUGF5b25lLkNsaWVudEFwaS5MYW5ndWFnZS5kZS5wbGFjZWhvbGRlcnMuY3ZjID0gJ+KAoiDigKIg4oCiJztcbiAgICB9XG5cbiAgICBnZXQgaG9zdGVkSUZyYW1lc0NvbmZpZygpOiBPYmplY3Qge1xuICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgLi4uZGVmYXVsdEhvc3RlZElGcmFtZXNDb25maWcsXG4gICAgICAgICAgICBsYW5ndWFnZTogdGhpcy5sYW5ndWFnZVxuICAgICAgICB9O1xuICAgIH1cblxuICAgIHByb3RlY3RlZCBvblN1Ym1pdChldmVudDogRXZlbnQpOiB2b2lkIHtcbiAgICAgICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcblxuICAgICAgICBpZiAodHlwZW9mIHRoaXMuaXNDdXJyZW50UGF5bWVudE1ldGhvZCA9PT0gJ3VuZGVmaW5lZCcpIHtcbiAgICAgICAgICAgIHRoaXMuZW5hYmxlU3VibWl0KCk7XG5cbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmICghdGhpcy5pc0N1cnJlbnRQYXltZW50TWV0aG9kIHx8IHRoaXMuaXNQYXltZW50VmFsaWQpIHtcbiAgICAgICAgICAgIHRoaXMuZm9ybS5zdWJtaXQoKTtcbiAgICAgICAgfVxuXG4gICAgICAgIHRoaXMuY2hlY2tDcmVkaXRDYXJkKCk7XG4gICAgfVxuXG4gICAgcHJvdGVjdGVkIGNoZWNrQ3JlZGl0Q2FyZCgpOiB2b2lkIHtcbiAgICAgICAgaWYgKHRoaXMuaG9zdGVkSUZyYW1lc0FwaS5pc0NvbXBsZXRlKCkgJiYgdGhpcy5jYXJkSG9sZGVySW5wdXQudmFsdWUpIHtcbiAgICAgICAgICAgIHRoaXMuaG9zdGVkSUZyYW1lc0FwaS5jcmVkaXRDYXJkQ2hlY2soQ0hFQ0tfQ0FMTEJBQ0tfSUQpO1xuXG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cblxuICAgICAgICB0aGlzLmVycm9yRWxlbWVudC5pbm5lckhUTUwgPSB0aGlzLmhvc3RlZElGcmFtZXNDb25maWcubGFuZ3VhZ2UudHJhbnNhY3Rpb25SZWplY3RlZDtcbiAgICAgICAgdGhpcy5lbmFibGVTdWJtaXQoKTtcbiAgICB9XG5cbiAgICAvKiB0c2xpbnQ6ZGlzYWJsZTogbm8tYW55ICovXG4gICAgcHJvdGVjdGVkIGFzeW5jIGNoZWNrQ2FsbGJhY2socmVzcG9uc2U6IGFueSk6IFByb21pc2U8dm9pZD4ge1xuICAgICAgICAvKiB0c2xpbnQ6ZW5hYmxlOiBuby1hbnkgKi9cbiAgICAgICAgaWYgKHJlc3BvbnNlLnN0YXR1cyAhPT0gVkFMSURfUkVTUE9OU0VfU1RBVFVTKSB7XG4gICAgICAgICAgICB0aGlzLmVuYWJsZVN1Ym1pdCgpO1xuXG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cblxuICAgICAgICB0aGlzLnBzZXVkb0NhcmRQYW5JbnB1dC52YWx1ZSA9IGF3YWl0IFByb21pc2UucmVzb2x2ZShyZXNwb25zZS5wc2V1ZG9jYXJkcGFuKTtcbiAgICAgICAgdGhpcy5zZXRQYXltZW50VG9WYWxpZCgpO1xuICAgICAgICB0aGlzLmZvcm0uc3VibWl0KCk7XG4gICAgfVxuXG4gICAgZ2V0IGlzQ3VycmVudFBheW1lbnRNZXRob2QoKTogYm9vbGVhbiB8IHVuZGVmaW5lZCB7XG4gICAgICAgIGNvbnN0IGN1cnJlbnRQYXltZW50TWV0aG9kSW5wdXQgPSA8SFRNTElucHV0RWxlbWVudD5kb2N1bWVudC5xdWVyeVNlbGVjdG9yKHRoaXMuY3VycmVudFBheW1lbnRNZXRob2RTZWxlY3Rvcik7XG5cbiAgICAgICAgcmV0dXJuIGN1cnJlbnRQYXltZW50TWV0aG9kSW5wdXQ/LnZhbHVlXG4gICAgICAgICAgICA/IGN1cnJlbnRQYXltZW50TWV0aG9kSW5wdXQudmFsdWUgPT09IENVUlJFTlRfUEFZTUVOVF9NRVRIT0RcbiAgICAgICAgICAgIDogdW5kZWZpbmVkO1xuICAgIH1cbn1cbiIsIi8qIHRzbGludDpkaXNhYmxlOiBuby1hbnkgKi9cbi8qIHRzbGludDpkaXNhYmxlOiBtYXgtZmlsZS1saW5lLWNvdW50ICovXG5kZWNsYXJlIHZhciBQYXlvbmU6IGFueTtcblxuaW1wb3J0IENvbXBvbmVudCBmcm9tICdTaG9wVWkvbW9kZWxzL2NvbXBvbmVudCc7XG5pbXBvcnQgU2NyaXB0TG9hZGVyIGZyb20gJ1Nob3BVaS9jb21wb25lbnRzL21vbGVjdWxlcy9zY3JpcHQtbG9hZGVyL3NjcmlwdC1sb2FkZXInO1xuXG5jb25zdCBDVVJSRU5UX1BBWU1FTlRfTUVUSE9EID0gJ3BheW9uZUNyZWRpdENhcmQnO1xuY29uc3QgQ0hFQ0tfQ0FMTEJBQ0tfSUQgPSAnY2hlY2tDYWxsYmFjayc7XG5jb25zdCBDSEVDS19DQUxMQkFDS19WQUxJRF9SRVNQT05TRV9TVEFUVVMgPSAnVkFMSUQnO1xuXG4vLyBjb25maWd1cmF0aW9uIGZvciBIb3N0ZWQgSWZyYW1lLlxuLy8gaHR0cHM6Ly9naXRodWIuY29tL2ZqYmVuZGVyL3NpbXBsZS1waHAtaW50ZWdyYXRpb24jYnVpbGQtdGhlLWZvcm1cbmNvbnN0IGRlZmF1bHRIb3N0ZWRJRnJhbWVzQ29uZmlnID0ge1xuICAgIGZpZWxkczoge1xuICAgICAgICBjYXJkdHlwZToge1xuICAgICAgICAgICAgc2VsZWN0b3I6ICdjYXJkdHlwZScsXG4gICAgICAgICAgICBjYXJkdHlwZXM6IFsnVicsICdNJ10sXG4gICAgICAgIH0sXG4gICAgICAgIGNhcmRwYW46IHtcbiAgICAgICAgICAgIHNlbGVjdG9yOiAnY2FyZHBhbicsXG4gICAgICAgICAgICB0eXBlOiAndGV4dCcsXG4gICAgICAgIH0sXG4gICAgICAgIGNhcmRjdmMyOiB7XG4gICAgICAgICAgICBzZWxlY3RvcjogJ2NhcmRjdmMyJyxcbiAgICAgICAgICAgIHR5cGU6ICdwYXNzd29yZCcsXG4gICAgICAgICAgICBzaXplOiAnMycsXG4gICAgICAgICAgICBtYXhsZW5ndGg6ICczJyxcbiAgICAgICAgICAgIGxlbmd0aDogeyBWOiAzLCBNOiAzIH0sXG4gICAgICAgIH0sXG4gICAgICAgIGNhcmRleHBpcmVtb250aDoge1xuICAgICAgICAgICAgc2VsZWN0b3I6ICdjYXJkZXhwaXJlbW9udGgnLFxuICAgICAgICAgICAgdHlwZTogJ3NlbGVjdCcsXG4gICAgICAgICAgICBzaXplOiAnMicsXG4gICAgICAgICAgICBtYXhsZW5ndGg6ICcyJyxcbiAgICAgICAgICAgIGlmcmFtZToge1xuICAgICAgICAgICAgICAgIHdpZHRoOiAnMTAwJScsXG4gICAgICAgICAgICB9LFxuICAgICAgICB9LFxuICAgICAgICBjYXJkZXhwaXJleWVhcjoge1xuICAgICAgICAgICAgc2VsZWN0b3I6ICdjYXJkZXhwaXJleWVhcicsXG4gICAgICAgICAgICB0eXBlOiAnc2VsZWN0JyxcbiAgICAgICAgICAgIGlmcmFtZToge1xuICAgICAgICAgICAgICAgIHdpZHRoOiAnMTAwJScsXG4gICAgICAgICAgICB9LFxuICAgICAgICB9LFxuICAgIH0sXG5cbiAgICBkZWZhdWx0U3R5bGU6IHtcbiAgICAgICAgaW5wdXQ6IGBmb250LXNpemU6IDAuODc1ZW07IGhlaWdodDogMnJlbTsgd2lkdGg6IDEwMCU7IGJvcmRlcjogMDsgb3V0bGluZTogMXB4IHNvbGlkICNkYWRhZGE7IG91dGxpbmUtb2Zmc2V0OiAtMXB4O2AsXG4gICAgICAgIHNlbGVjdDogYGZvbnQtc2l6ZTogMC44NzVlbTsgaGVpZ2h0OiAycmVtOyB3aWR0aDogMTAwJTsgYm9yZGVyOiAwOyBvdXRsaW5lOiAxcHggc29saWQgI2RhZGFkYTsgb3V0bGluZS1vZmZzZXQ6IC0xcHg7IGJhY2tncm91bmQtY29sb3I6ICNmZWZlZmU7YCxcbiAgICAgICAgaWZyYW1lOiB7XG4gICAgICAgICAgICBoZWlnaHQ6ICczNXB4JyxcbiAgICAgICAgICAgIHdpZHRoOiAnMTAwJScsXG4gICAgICAgIH0sXG4gICAgfSxcblxuICAgIGVycm9yOiAnZXJyb3JPdXRwdXQnLFxufTtcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgUGF5b25lQ3JlZGl0Q2FyZCBleHRlbmRzIENvbXBvbmVudCB7XG4gICAgc2NyaXB0TG9hZGVyOiBTY3JpcHRMb2FkZXI7XG4gICAgZm9ybTogSFRNTEZvcm1FbGVtZW50O1xuICAgIGhvc3RlZElGcmFtZXNBcGk6IGFueTtcbiAgICBjYXJkVHlwZUlucHV0OiBIVE1MSW5wdXRFbGVtZW50O1xuICAgIGNhcmRIb2xkZXJJbnB1dDogSFRNTElucHV0RWxlbWVudDtcbiAgICBjbGllbnRBcGlDb25maWdJbnB1dDogSFRNTElucHV0RWxlbWVudDtcbiAgICBsYW5ndWFnZUlucHV0OiBIVE1MSW5wdXRFbGVtZW50O1xuICAgIHBzZXVkb0NhcmRQYW5JbnB1dDogSFRNTElucHV0RWxlbWVudDtcbiAgICBlcnJvckVsZW1lbnQ6IEhUTUxFbGVtZW50O1xuICAgIHByb3RlY3RlZCBpc1BheW1lbnRWYWxpZDogYm9vbGVhbiA9IGZhbHNlO1xuXG4gICAgcHJvdGVjdGVkIHN1Ym1pdEJ1dHRvbjogSFRNTEJ1dHRvbkVsZW1lbnRbXTtcblxuICAgIHByb3RlY3RlZCByZWFkeUNhbGxiYWNrKCk6IHZvaWQge31cblxuICAgIHByb3RlY3RlZCBpbml0KCk6IHZvaWQge1xuICAgICAgICB0aGlzLnNjcmlwdExvYWRlciA9IDxTY3JpcHRMb2FkZXI+dGhpcy5xdWVyeVNlbGVjdG9yKCdzY3JpcHQtbG9hZGVyJyk7XG4gICAgICAgIHRoaXMuZm9ybSA9IDxIVE1MRm9ybUVsZW1lbnQ+ZG9jdW1lbnQucXVlcnlTZWxlY3Rvcih0aGlzLmZvcm1TZWxlY3Rvcik7XG4gICAgICAgIHRoaXMuY2FyZEhvbGRlcklucHV0ID0gPEhUTUxJbnB1dEVsZW1lbnQ+dGhpcy5xdWVyeVNlbGVjdG9yKHRoaXMuY2FyZEhvbGRlclNlbGVjdG9yKTtcbiAgICAgICAgdGhpcy5jbGllbnRBcGlDb25maWdJbnB1dCA9IDxIVE1MSW5wdXRFbGVtZW50PnRoaXMucXVlcnlTZWxlY3Rvcih0aGlzLmNsaWVudEFwaUNvbmZpZ1NlbGVjdG9yKTtcbiAgICAgICAgdGhpcy5sYW5ndWFnZUlucHV0ID0gPEhUTUxJbnB1dEVsZW1lbnQ+dGhpcy5xdWVyeVNlbGVjdG9yKHRoaXMubGFuZ3VhZ2VTZWxlY3Rvcik7XG4gICAgICAgIHRoaXMucHNldWRvQ2FyZFBhbklucHV0ID0gPEhUTUxJbnB1dEVsZW1lbnQ+dGhpcy5xdWVyeVNlbGVjdG9yKHRoaXMucHNldWRvQ2FyZFBhblNlbGVjdG9yKTtcbiAgICAgICAgdGhpcy5lcnJvckVsZW1lbnQgPSB0aGlzLnF1ZXJ5U2VsZWN0b3IodGhpcy5lcnJvckNvbnRhaW5lcik7XG4gICAgICAgIHRoaXMuc3VibWl0QnV0dG9uID0gPEhUTUxCdXR0b25FbGVtZW50W10+QXJyYXkuZnJvbShcbiAgICAgICAgICAgIGRvY3VtZW50LmdldEVsZW1lbnRzQnlDbGFzc05hbWUoYCR7dGhpcy5qc05hbWV9X19zdWJtaXRgKVxuICAgICAgICApO1xuXG4gICAgICAgIHRoaXMubWFwRXZlbnRzKCk7XG4gICAgfVxuXG4gICAgcHJvdGVjdGVkIG1hcEV2ZW50cygpOiB2b2lkIHtcbiAgICAgICAgdGhpcy5zY3JpcHRMb2FkZXIuYWRkRXZlbnRMaXN0ZW5lcignc2NyaXB0bG9hZCcsIChldmVudDogRXZlbnQpID0+IHRoaXMub25TY3JpcHRMb2FkKGV2ZW50KSk7XG4gICAgICAgIHRoaXMuZm9ybS5hZGRFdmVudExpc3RlbmVyKCdzdWJtaXQnLCAoZXZlbnQ6IEV2ZW50KSA9PiB0aGlzLm9uU3VibWl0KGV2ZW50KSk7XG4gICAgfVxuXG4gICAgcHJvdGVjdGVkIG9uU2NyaXB0TG9hZChldmVudDogRXZlbnQpOiB2b2lkIHtcbiAgICAgICAgdGhpcy5hZGRDaGVja0NhbGxiYWNrVG9HbG9iYWxTY29wZSgpO1xuICAgICAgICB0aGlzLmxvYWRQYXlvbmVJRnJhbWUoKTtcbiAgICB9XG5cbiAgICBwcm90ZWN0ZWQgb25TdWJtaXQoZXZlbnQ6IEV2ZW50KTogdm9pZCB7XG4gICAgICAgIGlmICghdGhpcy5pc0N1cnJlbnRQYXltZW50TWV0aG9kKSB7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cblxuICAgICAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuXG4gICAgICAgIGlmICh0aGlzLmlzUGF5bWVudFZhbGlkKSB7XG4gICAgICAgICAgICB0aGlzLmZvcm0uc3VibWl0KCk7XG4gICAgICAgIH1cblxuICAgICAgICB0aGlzLmNoZWNrQ3JlZGl0Q2FyZCgpO1xuICAgIH1cblxuICAgIHByb3RlY3RlZCBhZGRDaGVja0NhbGxiYWNrVG9HbG9iYWxTY29wZSgpOiB2b2lkIHtcbiAgICAgICAgd2luZG93W0NIRUNLX0NBTExCQUNLX0lEXSA9IHRoaXMuY2hlY2tDYWxsYmFjay5iaW5kKHRoaXMpO1xuICAgIH1cblxuICAgIHByb3RlY3RlZCBhc3luYyBjaGVja0NhbGxiYWNrKHJlc3BvbnNlOiBhbnkpOiBQcm9taXNlPHZvaWQ+IHtcbiAgICAgICAgaWYgKHJlc3BvbnNlLnN0YXR1cyAhPT0gQ0hFQ0tfQ0FMTEJBQ0tfVkFMSURfUkVTUE9OU0VfU1RBVFVTKSB7XG4gICAgICAgICAgICBzZXRUaW1lb3V0KCgpID0+IHRoaXMuZW5hYmxlU3VibWl0KCksIDApO1xuXG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cblxuICAgICAgICB0aGlzLnBzZXVkb0NhcmRQYW5JbnB1dC52YWx1ZSA9IGF3YWl0IFByb21pc2UucmVzb2x2ZShyZXNwb25zZS5wc2V1ZG9jYXJkcGFuKTtcbiAgICAgICAgdGhpcy5zZXRQYXltZW50VG9WYWxpZCgpO1xuICAgICAgICB0aGlzLmZvcm0uc3VibWl0KCk7XG4gICAgfVxuXG4gICAgcHJvdGVjdGVkIGNoZWNrQ3JlZGl0Q2FyZCgpOiB2b2lkIHtcbiAgICAgICAgaWYgKHRoaXMuaG9zdGVkSUZyYW1lc0FwaS5pc0NvbXBsZXRlKCkgJiYgdGhpcy5jYXJkSG9sZGVySW5wdXQudmFsdWUpIHtcbiAgICAgICAgICAgIHRoaXMuaG9zdGVkSUZyYW1lc0FwaS5jcmVkaXRDYXJkQ2hlY2soQ0hFQ0tfQ0FMTEJBQ0tfSUQpO1xuXG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cblxuICAgICAgICB0aGlzLmVycm9yRWxlbWVudC5pbm5lckhUTUwgPSB0aGlzLmhvc3RlZElGcmFtZXNDb25maWcubGFuZ3VhZ2UudHJhbnNhY3Rpb25SZWplY3RlZDtcbiAgICAgICAgc2V0VGltZW91dCgoKSA9PiB0aGlzLmVuYWJsZVN1Ym1pdCgpLCAwKTtcbiAgICB9XG5cbiAgICBwcm90ZWN0ZWQgZW5hYmxlU3VibWl0KCk6IHZvaWQge1xuICAgICAgICBpZiAodGhpcy5zdWJtaXRCdXR0b24ubGVuZ3RoKSB7XG4gICAgICAgICAgICB0aGlzLnN1Ym1pdEJ1dHRvbi5mb3JFYWNoKGJ1dHRvbiA9PiB7XG4gICAgICAgICAgICAgICAgYnV0dG9uLnJlbW92ZUF0dHJpYnV0ZSgnZGlzYWJsZWQnKTtcbiAgICAgICAgICAgIH0pO1xuXG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cblxuICAgICAgICBjb25zdCBidXR0b25zID0gPEhUTUxCdXR0b25FbGVtZW50W10+QXJyYXkuZnJvbSh0aGlzLmZvcm0uZ2V0RWxlbWVudHNCeVRhZ05hbWUoJ2J1dHRvbicpKTtcbiAgICAgICAgYnV0dG9ucy5mb3JFYWNoKGJ1dHRvbiA9PiB7XG4gICAgICAgICAgICBidXR0b24ucmVtb3ZlQXR0cmlidXRlKCdkaXNhYmxlZCcpO1xuICAgICAgICB9KTtcbiAgICB9XG5cbiAgICBwcm90ZWN0ZWQgbG9hZFBheW9uZUlGcmFtZSgpOiB2b2lkIHtcbiAgICAgICAgdGhpcy5ob3N0ZWRJRnJhbWVzQXBpID0gbmV3IFBheW9uZS5DbGllbnRBcGkuSG9zdGVkSUZyYW1lcyh0aGlzLmhvc3RlZElGcmFtZXNDb25maWcsIHRoaXMuY2xpZW50QXBpQ29uZmlnKTtcblxuICAgICAgICBQYXlvbmUuQ2xpZW50QXBpLkxhbmd1YWdlLmRlLnBsYWNlaG9sZGVycy5jYXJkcGFuID0gJ18gXyBfIF8gIF8gXyBfIF8gIF8gXyBfIF8gIF8gXyBfIF8nO1xuICAgICAgICBQYXlvbmUuQ2xpZW50QXBpLkxhbmd1YWdlLmRlLnBsYWNlaG9sZGVycy5jdmMgPSAn4oCiIOKAoiDigKInO1xuICAgIH1cblxuICAgIHByb3RlY3RlZCBzZXRQYXltZW50VG9WYWxpZCgpOiB2b2lkIHtcbiAgICAgICAgdGhpcy5pc1BheW1lbnRWYWxpZCA9IHRydWU7XG4gICAgfVxuXG4gICAgZ2V0IGlzQ3VycmVudFBheW1lbnRNZXRob2QoKTogYm9vbGVhbiB8IG51bGwge1xuICAgICAgICBjb25zdCBjdXJyZW50UGF5bWVudE1ldGhvZElucHV0ID0gPEhUTUxJbnB1dEVsZW1lbnQ+ZG9jdW1lbnQucXVlcnlTZWxlY3Rvcih0aGlzLmN1cnJlbnRQYXltZW50TWV0aG9kU2VsZWN0b3IpO1xuXG4gICAgICAgIHJldHVybiBjdXJyZW50UGF5bWVudE1ldGhvZElucHV0Py52YWx1ZVxuICAgICAgICAgICAgPyBjdXJyZW50UGF5bWVudE1ldGhvZElucHV0LnZhbHVlID09PSBDVVJSRU5UX1BBWU1FTlRfTUVUSE9EXG4gICAgICAgICAgICA6IG51bGw7XG4gICAgfVxuXG4gICAgZ2V0IGxhbmd1YWdlKCk6IHN0cmluZyB7XG4gICAgICAgIGNvbnN0IGxhbmd1YWdlQ29kZUxlbmdodCA9IDI7XG4gICAgICAgIGNvbnN0IGxhbmd1YWdlQ29kZSA9ICEhdGhpcy5sYW5ndWFnZUlucHV0LnZhbHVlID8gdGhpcy5sYW5ndWFnZUlucHV0LnZhbHVlLnN1YnN0cigwLCBsYW5ndWFnZUNvZGVMZW5naHQpIDogJ2RlJztcblxuICAgICAgICByZXR1cm4gUGF5b25lLkNsaWVudEFwaS5MYW5ndWFnZVtsYW5ndWFnZUNvZGVdIHx8IFBheW9uZS5DbGllbnRBcGkuTGFuZ3VhZ2UuZGU7XG4gICAgfVxuXG4gICAgZ2V0IGhvc3RlZElGcmFtZXNDb25maWcoKTogYW55IHtcbiAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgIC4uLmRlZmF1bHRIb3N0ZWRJRnJhbWVzQ29uZmlnLFxuICAgICAgICAgICAgbGFuZ3VhZ2U6IHRoaXMubGFuZ3VhZ2VcbiAgICAgICAgfTtcbiAgICB9XG5cbiAgICBnZXQgY2xpZW50QXBpQ29uZmlnKCk6IGFueSB7XG4gICAgICAgIHJldHVybiBKU09OLnBhcnNlKHRoaXMuY2xpZW50QXBpQ29uZmlnSW5wdXQudmFsdWUpO1xuICAgIH1cblxuICAgIGdldCBmb3JtU2VsZWN0b3IoKTogc3RyaW5nIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuZ2V0QXR0cmlidXRlKCdmb3JtLXNlbGVjdG9yJyk7XG4gICAgfVxuXG4gICAgZ2V0IGNsaWVudEFwaUNvbmZpZ1NlbGVjdG9yKCk6IHN0cmluZyB7XG4gICAgICAgIHJldHVybiB0aGlzLmdldEF0dHJpYnV0ZSgnY2xpZW50LWFwaS1jb25maWctc2VsZWN0b3InKTtcbiAgICB9XG5cbiAgICBnZXQgbGFuZ3VhZ2VTZWxlY3RvcigpOiBzdHJpbmcge1xuICAgICAgICByZXR1cm4gdGhpcy5nZXRBdHRyaWJ1dGUoJ2xhbmd1YWdlLXNlbGVjdG9yJyk7XG4gICAgfVxuXG4gICAgZ2V0IGNhcmRUeXBlU2VsZWN0b3IoKTogc3RyaW5nIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuZ2V0QXR0cmlidXRlKCdjYXJkLXR5cGUtc2VsZWN0b3InKTtcbiAgICB9XG5cbiAgICBnZXQgY2FyZEhvbGRlclNlbGVjdG9yKCk6IHN0cmluZyB7XG4gICAgICAgIHJldHVybiB0aGlzLmdldEF0dHJpYnV0ZSgnY2FyZC1ob2xkZXItc2VsZWN0b3InKTtcbiAgICB9XG5cbiAgICBnZXQgcHNldWRvQ2FyZFBhblNlbGVjdG9yKCk6IHN0cmluZyB7XG4gICAgICAgIHJldHVybiB0aGlzLmdldEF0dHJpYnV0ZSgncHNldWRvLWNhcmQtcGFuLXNlbGVjdG9yJyk7XG4gICAgfVxuXG4gICAgZ2V0IGVycm9yQ29udGFpbmVyKCk6IHN0cmluZyB7XG4gICAgICAgIHJldHVybiB0aGlzLmdldEF0dHJpYnV0ZSgnZXJyb3ItY29udGFpbmVyLXNlbGVjdG9yJyk7XG4gICAgfVxuXG4gICAgZ2V0IGN1cnJlbnRQYXltZW50TWV0aG9kU2VsZWN0b3IoKTogc3RyaW5nIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuZ2V0QXR0cmlidXRlKCdjdXJyZW50LXBheW1lbnQtbWV0aG9kLXNlbGVjdG9yJyk7XG4gICAgfVxufVxuIl0sInNvdXJjZVJvb3QiOiIifQ==