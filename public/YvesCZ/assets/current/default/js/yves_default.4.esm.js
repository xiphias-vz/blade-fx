(window["webpackJsonp_yves_default"] = window["webpackJsonp_yves_default"] || []).push([[4],{

/***/ "./src/Pyz/Yves/Payone/Theme/default/components/molecules/payone-credit-card/payone-credit-card.ts":
/*!*********************************************************************************************************!*\
  !*** ./src/Pyz/Yves/Payone/Theme/default/components/molecules/payone-credit-card/payone-credit-card.ts ***!
  \*********************************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return PayoneCreditCard; });
/* harmony import */ var Payone_components_molecules_payone_credit_card_payone_credit_card__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! Payone/components/molecules/payone-credit-card/payone-credit-card */ "./vendor/spryker-eco/payone/src/SprykerEco/Yves/Payone/Theme/default/components/molecules/payone-credit-card/payone-credit-card.ts");
function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

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
class PayoneCreditCard extends Payone_components_molecules_payone_credit_card_payone_credit_card__WEBPACK_IMPORTED_MODULE_0__["default"] {
  constructor() {
    super(...arguments);

    _defineProperty(this, "submitButton", void 0);
  }

  readyCallback() {
    this.scriptLoader = this.querySelector('script-loader');
    this.form = document.querySelector(this.formSelector);
    this.cardHolderInput = this.querySelector(this.cardHolderSelector);
    this.clientApiConfigInput = this.querySelector(this.clientApiConfigSelector);
    this.languageInput = this.querySelector(this.languageSelector);
    this.pseudoCardPanInput = this.querySelector(this.pseudoCardPanSelector);
    this.errorElement = this.querySelector(this.errorContainer);
    this.mapEvents();
    this.submitButton = Array.from(document.getElementsByClassName(this.jsName + "__submit"));
    this.submitButton.forEach(button => {
      button.addEventListener('click', event => this.onSubmit(event));
    });
  }

  mapEvents() {
    this.scriptLoader.addEventListener('scriptload', event => this.onScriptLoad(event));
    this.form.addEventListener('submit', event => this.onSubmit(event));
  }

  enableSubmit() {
    this.submitButton.forEach(button => {
      button.removeAttribute('disabled');
    });
  }

  loadPayoneIFrame() {
    this.hostedIFramesApi = new Payone.ClientApi.HostedIFrames(this.hostedIFramesConfig, this.clientApiConfig);
    Payone.ClientApi.Language.de.placeholders.cardpan = '_ _ _ _  _ _ _ _  _ _ _ _  _ _ _ _';
    Payone.ClientApi.Language.de.placeholders.cvc = '• • •';
  }

  get hostedIFramesConfig() {
    return _extends({}, defaultHostedIFramesConfig, {
      language: this.language
    });
  }

  onSubmit(event) {
    event.preventDefault();

    if (typeof this.isCurrentPaymentMethod === 'undefined') {
      this.enableSubmit();
      return;
    }

    if (!this.isCurrentPaymentMethod || this.isPaymentValid) {
      this.form.submit();
    }

    this.checkCreditCard();
  }

  checkCreditCard() {
    if (this.hostedIFramesApi.isComplete() && this.cardHolderInput.value) {
      this.hostedIFramesApi.creditCardCheck(CHECK_CALLBACK_ID);
      return;
    }

    this.errorElement.innerHTML = this.hostedIFramesConfig.language.transactionRejected;
    this.enableSubmit();
  }
  /* tslint:disable: no-any */


  checkCallback(response) {
    var _this = this;

    return _asyncToGenerator(function* () {
      /* tslint:enable: no-any */
      if (response.status !== VALID_RESPONSE_STATUS) {
        _this.enableSubmit();

        return;
      }

      _this.pseudoCardPanInput.value = yield Promise.resolve(response.pseudocardpan);

      _this.setPaymentToValid();

      _this.form.submit();
    })();
  }

  get isCurrentPaymentMethod() {
    var currentPaymentMethodInput = document.querySelector(this.currentPaymentMethodSelector);
    return (currentPaymentMethodInput == null ? void 0 : currentPaymentMethodInput.value) ? currentPaymentMethodInput.value === CURRENT_PAYMENT_METHOD : undefined;
  }

}

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
/* harmony import */ var ShopUi_models_component__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ShopUi/models/component */ "./vendor/spryker-shop/shop-ui/src/SprykerShop/Yves/ShopUi/Theme/default/models/component.ts");
function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

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
class PayoneCreditCard extends ShopUi_models_component__WEBPACK_IMPORTED_MODULE_0__["default"] {
  constructor() {
    super(...arguments);

    _defineProperty(this, "scriptLoader", void 0);

    _defineProperty(this, "form", void 0);

    _defineProperty(this, "hostedIFramesApi", void 0);

    _defineProperty(this, "cardTypeInput", void 0);

    _defineProperty(this, "cardHolderInput", void 0);

    _defineProperty(this, "clientApiConfigInput", void 0);

    _defineProperty(this, "languageInput", void 0);

    _defineProperty(this, "pseudoCardPanInput", void 0);

    _defineProperty(this, "errorElement", void 0);

    _defineProperty(this, "isPaymentValid", false);

    _defineProperty(this, "submitButton", void 0);
  }

  readyCallback() {}

  init() {
    this.scriptLoader = this.querySelector('script-loader');
    this.form = document.querySelector(this.formSelector);
    this.cardHolderInput = this.querySelector(this.cardHolderSelector);
    this.clientApiConfigInput = this.querySelector(this.clientApiConfigSelector);
    this.languageInput = this.querySelector(this.languageSelector);
    this.pseudoCardPanInput = this.querySelector(this.pseudoCardPanSelector);
    this.errorElement = this.querySelector(this.errorContainer);
    this.submitButton = Array.from(document.getElementsByClassName(this.jsName + "__submit"));
    this.mapEvents();
  }

  mapEvents() {
    this.scriptLoader.addEventListener('scriptload', event => this.onScriptLoad(event));
    this.form.addEventListener('submit', event => this.onSubmit(event));
  }

  onScriptLoad(event) {
    this.addCheckCallbackToGlobalScope();
    this.loadPayoneIFrame();
  }

  onSubmit(event) {
    if (!this.isCurrentPaymentMethod) {
      return;
    }

    event.preventDefault();

    if (this.isPaymentValid) {
      this.form.submit();
    }

    this.checkCreditCard();
  }

  addCheckCallbackToGlobalScope() {
    window[CHECK_CALLBACK_ID] = this.checkCallback.bind(this);
  }

  checkCallback(response) {
    var _this = this;

    return _asyncToGenerator(function* () {
      if (response.status !== CHECK_CALLBACK_VALID_RESPONSE_STATUS) {
        setTimeout(() => _this.enableSubmit(), 0);
        return;
      }

      _this.pseudoCardPanInput.value = yield Promise.resolve(response.pseudocardpan);

      _this.setPaymentToValid();

      _this.form.submit();
    })();
  }

  checkCreditCard() {
    if (this.hostedIFramesApi.isComplete() && this.cardHolderInput.value) {
      this.hostedIFramesApi.creditCardCheck(CHECK_CALLBACK_ID);
      return;
    }

    this.errorElement.innerHTML = this.hostedIFramesConfig.language.transactionRejected;
    setTimeout(() => this.enableSubmit(), 0);
  }

  enableSubmit() {
    if (this.submitButton.length) {
      this.submitButton.forEach(button => {
        button.removeAttribute('disabled');
      });
      return;
    }

    var buttons = Array.from(this.form.getElementsByTagName('button'));
    buttons.forEach(button => {
      button.removeAttribute('disabled');
    });
  }

  loadPayoneIFrame() {
    this.hostedIFramesApi = new Payone.ClientApi.HostedIFrames(this.hostedIFramesConfig, this.clientApiConfig);
    Payone.ClientApi.Language.de.placeholders.cardpan = '_ _ _ _  _ _ _ _  _ _ _ _  _ _ _ _';
    Payone.ClientApi.Language.de.placeholders.cvc = '• • •';
  }

  setPaymentToValid() {
    this.isPaymentValid = true;
  }

  get isCurrentPaymentMethod() {
    var currentPaymentMethodInput = document.querySelector(this.currentPaymentMethodSelector);
    return (currentPaymentMethodInput == null ? void 0 : currentPaymentMethodInput.value) ? currentPaymentMethodInput.value === CURRENT_PAYMENT_METHOD : null;
  }

  get language() {
    var languageCodeLenght = 2;
    var languageCode = !!this.languageInput.value ? this.languageInput.value.substr(0, languageCodeLenght) : 'de';
    return Payone.ClientApi.Language[languageCode] || Payone.ClientApi.Language.de;
  }

  get hostedIFramesConfig() {
    return _extends({}, defaultHostedIFramesConfig, {
      language: this.language
    });
  }

  get clientApiConfig() {
    return JSON.parse(this.clientApiConfigInput.value);
  }

  get formSelector() {
    return this.getAttribute('form-selector');
  }

  get clientApiConfigSelector() {
    return this.getAttribute('client-api-config-selector');
  }

  get languageSelector() {
    return this.getAttribute('language-selector');
  }

  get cardTypeSelector() {
    return this.getAttribute('card-type-selector');
  }

  get cardHolderSelector() {
    return this.getAttribute('card-holder-selector');
  }

  get pseudoCardPanSelector() {
    return this.getAttribute('pseudo-card-pan-selector');
  }

  get errorContainer() {
    return this.getAttribute('error-container-selector');
  }

  get currentPaymentMethodSelector() {
    return this.getAttribute('current-payment-method-selector');
  }

}

/***/ })

}]);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vLi9zcmMvUHl6L1l2ZXMvUGF5b25lL1RoZW1lL2RlZmF1bHQvY29tcG9uZW50cy9tb2xlY3VsZXMvcGF5b25lLWNyZWRpdC1jYXJkL3BheW9uZS1jcmVkaXQtY2FyZC50cyIsIndlYnBhY2s6Ly8vLi92ZW5kb3Ivc3ByeWtlci1lY28vcGF5b25lL3NyYy9TcHJ5a2VyRWNvL1l2ZXMvUGF5b25lL1RoZW1lL2RlZmF1bHQvY29tcG9uZW50cy9tb2xlY3VsZXMvcGF5b25lLWNyZWRpdC1jYXJkL3BheW9uZS1jcmVkaXQtY2FyZC50cyJdLCJuYW1lcyI6WyJWQUxJRF9SRVNQT05TRV9TVEFUVVMiLCJDSEVDS19DQUxMQkFDS19JRCIsIkNVUlJFTlRfUEFZTUVOVF9NRVRIT0QiLCJkZWZhdWx0SG9zdGVkSUZyYW1lc0NvbmZpZyIsImZpZWxkcyIsImNhcmR0eXBlIiwic2VsZWN0b3IiLCJjYXJkdHlwZXMiLCJjYXJkcGFuIiwidHlwZSIsImNhcmRjdmMyIiwic2l6ZSIsIm1heGxlbmd0aCIsImxlbmd0aCIsIlYiLCJNIiwiY2FyZGV4cGlyZW1vbnRoIiwiaWZyYW1lIiwid2lkdGgiLCJjYXJkZXhwaXJleWVhciIsImRlZmF1bHRTdHlsZSIsImlucHV0IiwiaW5wdXRGb2N1cyIsInNlbGVjdCIsInNlbGVjdEZvY3VzIiwiaGVpZ2h0IiwibWFyZ2luIiwiZXJyb3IiLCJQYXlvbmVDcmVkaXRDYXJkIiwiRWNvUGF5b25lQ3JlZGl0Q2FyZCIsInJlYWR5Q2FsbGJhY2siLCJzY3JpcHRMb2FkZXIiLCJxdWVyeVNlbGVjdG9yIiwiZm9ybSIsImRvY3VtZW50IiwiZm9ybVNlbGVjdG9yIiwiY2FyZEhvbGRlcklucHV0IiwiY2FyZEhvbGRlclNlbGVjdG9yIiwiY2xpZW50QXBpQ29uZmlnSW5wdXQiLCJjbGllbnRBcGlDb25maWdTZWxlY3RvciIsImxhbmd1YWdlSW5wdXQiLCJsYW5ndWFnZVNlbGVjdG9yIiwicHNldWRvQ2FyZFBhbklucHV0IiwicHNldWRvQ2FyZFBhblNlbGVjdG9yIiwiZXJyb3JFbGVtZW50IiwiZXJyb3JDb250YWluZXIiLCJtYXBFdmVudHMiLCJzdWJtaXRCdXR0b24iLCJBcnJheSIsImZyb20iLCJnZXRFbGVtZW50c0J5Q2xhc3NOYW1lIiwianNOYW1lIiwiZm9yRWFjaCIsImJ1dHRvbiIsImFkZEV2ZW50TGlzdGVuZXIiLCJldmVudCIsIm9uU3VibWl0Iiwib25TY3JpcHRMb2FkIiwiZW5hYmxlU3VibWl0IiwicmVtb3ZlQXR0cmlidXRlIiwibG9hZFBheW9uZUlGcmFtZSIsImhvc3RlZElGcmFtZXNBcGkiLCJQYXlvbmUiLCJDbGllbnRBcGkiLCJIb3N0ZWRJRnJhbWVzIiwiaG9zdGVkSUZyYW1lc0NvbmZpZyIsImNsaWVudEFwaUNvbmZpZyIsIkxhbmd1YWdlIiwiZGUiLCJwbGFjZWhvbGRlcnMiLCJjdmMiLCJsYW5ndWFnZSIsInByZXZlbnREZWZhdWx0IiwiaXNDdXJyZW50UGF5bWVudE1ldGhvZCIsImlzUGF5bWVudFZhbGlkIiwic3VibWl0IiwiY2hlY2tDcmVkaXRDYXJkIiwiaXNDb21wbGV0ZSIsInZhbHVlIiwiY3JlZGl0Q2FyZENoZWNrIiwiaW5uZXJIVE1MIiwidHJhbnNhY3Rpb25SZWplY3RlZCIsImNoZWNrQ2FsbGJhY2siLCJyZXNwb25zZSIsInN0YXR1cyIsIlByb21pc2UiLCJyZXNvbHZlIiwicHNldWRvY2FyZHBhbiIsInNldFBheW1lbnRUb1ZhbGlkIiwiY3VycmVudFBheW1lbnRNZXRob2RJbnB1dCIsImN1cnJlbnRQYXltZW50TWV0aG9kU2VsZWN0b3IiLCJ1bmRlZmluZWQiLCJDSEVDS19DQUxMQkFDS19WQUxJRF9SRVNQT05TRV9TVEFUVVMiLCJDb21wb25lbnQiLCJpbml0IiwiYWRkQ2hlY2tDYWxsYmFja1RvR2xvYmFsU2NvcGUiLCJ3aW5kb3ciLCJiaW5kIiwic2V0VGltZW91dCIsImJ1dHRvbnMiLCJnZXRFbGVtZW50c0J5VGFnTmFtZSIsImxhbmd1YWdlQ29kZUxlbmdodCIsImxhbmd1YWdl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LEdBQTZCO0FBQ3pCLFdBQU8sS0FBSzZELFlBQUwsQ0FBa0IsMEJBQWxCLENBQVA7QUFDSDs7QUFFRCxNQUFJaEIsNEJBQUosR0FBMkM7QUFDdkMsV0FBTyxLQUFLZ0IsWUFBTCxDQUFrQixpQ0FBbEIsQ0FBUDtBQUNIOztBQXBLbUQsQyIsImZpbGUiOiIuL2pzL3l2ZXNfZGVmYXVsdC40LmVzbS5qcyIsInNvdXJjZXNDb250ZW50IjpbIi8qIHRzbGludDpkaXNhYmxlOiBuby1hbnkgKi9cbmRlY2xhcmUgdmFyIFBheW9uZTogYW55O1xuLyogdHNsaW50OmVuYWJsZTogbm8tYW55ICovXG5pbXBvcnQgRWNvUGF5b25lQ3JlZGl0Q2FyZCBmcm9tICdQYXlvbmUvY29tcG9uZW50cy9tb2xlY3VsZXMvcGF5b25lLWNyZWRpdC1jYXJkL3BheW9uZS1jcmVkaXQtY2FyZCc7XG5pbXBvcnQgU2NyaXB0TG9hZGVyIGZyb20gJ1Nob3BVaS9jb21wb25lbnRzL21vbGVjdWxlcy9zY3JpcHQtbG9hZGVyL3NjcmlwdC1sb2FkZXInO1xuXG5jb25zdCBWQUxJRF9SRVNQT05TRV9TVEFUVVMgPSAnVkFMSUQnO1xuY29uc3QgQ0hFQ0tfQ0FMTEJBQ0tfSUQgPSAnY2hlY2tDYWxsYmFjayc7XG5jb25zdCBDVVJSRU5UX1BBWU1FTlRfTUVUSE9EID0gJ3BheW9uZUNyZWRpdENhcmQnO1xuXG5jb25zdCBkZWZhdWx0SG9zdGVkSUZyYW1lc0NvbmZpZyA9IHtcbiAgICBmaWVsZHM6IHtcbiAgICAgICAgY2FyZHR5cGU6IHtcbiAgICAgICAgICAgIHNlbGVjdG9yOiAnY2FyZHR5cGUnLFxuICAgICAgICAgICAgY2FyZHR5cGVzOiBbJ1YnLCAnTSddLFxuICAgICAgICB9LFxuICAgICAgICBjYXJkcGFuOiB7XG4gICAgICAgICAgICBzZWxlY3RvcjogJ2NhcmRwYW4nLFxuICAgICAgICAgICAgdHlwZTogJ3RleHQnLFxuICAgICAgICB9LFxuICAgICAgICBjYXJkY3ZjMjoge1xuICAgICAgICAgICAgc2VsZWN0b3I6ICdjYXJkY3ZjMicsXG4gICAgICAgICAgICB0eXBlOiAncGFzc3dvcmQnLFxuICAgICAgICAgICAgc2l6ZTogJzMnLFxuICAgICAgICAgICAgbWF4bGVuZ3RoOiAnMycsXG4gICAgICAgICAgICBsZW5ndGg6IHtWOiAzLCBNOiAzfSxcbiAgICAgICAgfSxcbiAgICAgICAgY2FyZGV4cGlyZW1vbnRoOiB7XG4gICAgICAgICAgICBzZWxlY3RvcjogJ2NhcmRleHBpcmVtb250aCcsXG4gICAgICAgICAgICB0eXBlOiAnc2VsZWN0JyxcbiAgICAgICAgICAgIHNpemU6ICcyJyxcbiAgICAgICAgICAgIG1heGxlbmd0aDogJzInLFxuICAgICAgICAgICAgaWZyYW1lOiB7XG4gICAgICAgICAgICAgICAgd2lkdGg6ICcxMDAlJyxcbiAgICAgICAgICAgIH0sXG4gICAgICAgIH0sXG4gICAgICAgIGNhcmRleHBpcmV5ZWFyOiB7XG4gICAgICAgICAgICBzZWxlY3RvcjogJ2NhcmRleHBpcmV5ZWFyJyxcbiAgICAgICAgICAgIHR5cGU6ICdzZWxlY3QnLFxuICAgICAgICAgICAgaWZyYW1lOiB7XG4gICAgICAgICAgICAgICAgd2lkdGg6ICcxMDAlJyxcbiAgICAgICAgICAgIH0sXG4gICAgICAgIH0sXG4gICAgfSxcblxuICAgIGRlZmF1bHRTdHlsZToge1xuICAgICAgICBpbnB1dDogYFxuICAgICAgICAgICAgbWFyZ2luOiAwO1xuICAgICAgICAgICAgZm9udC1zaXplOiAwLjkzNzVyZW07XG4gICAgICAgICAgICBmb250LXdlaWdodDogNzAwO1xuICAgICAgICAgICAgbGluZS1oZWlnaHQ6IDEuMTI1cmVtO1xuICAgICAgICAgICAgZm9udC1mYW1pbHk6IHNhbnMtc2VyaWY7XG4gICAgICAgICAgICBoZWlnaHQ6IDUwcHg7XG4gICAgICAgICAgICB3aWR0aDogMTAwJTtcbiAgICAgICAgICAgIGJvcmRlcjogMC4wNjI1cmVtIHNvbGlkICNkY2UwZTU7XG4gICAgICAgICAgICBwYWRkaW5nOiAwLjVyZW0gMC41cmVtIDAuNzVyZW07XG4gICAgICAgICAgICBjb2xvcjogIzRhNGE0YTtcbiAgICAgICAgICAgIGJvcmRlci1yYWRpdXM6IDAuMTI1cmVtO1xuICAgICAgICBgLFxuICAgICAgICBpbnB1dEZvY3VzOiBgXG4gICAgICAgICAgICBtYXJnaW46IDA7XG4gICAgICAgICAgICBmb250LXNpemU6IDAuOTM3NXJlbTtcbiAgICAgICAgICAgIGZvbnQtd2VpZ2h0OiA3MDA7XG4gICAgICAgICAgICBsaW5lLWhlaWdodDogMS4xMjVyZW07XG4gICAgICAgICAgICBmb250LWZhbWlseTogc2Fucy1zZXJpZjtcbiAgICAgICAgICAgIGhlaWdodDogNTBweDtcbiAgICAgICAgICAgIHdpZHRoOiAxMDAlO1xuICAgICAgICAgICAgYm9yZGVyOiAwLjA2MjVyZW0gc29saWQgI2RjZTBlNTtcbiAgICAgICAgICAgIHBhZGRpbmc6IDAuNXJlbSAwLjVyZW0gMC43NXJlbTtcbiAgICAgICAgICAgIGNvbG9yOiAjNGE0YTRhO1xuICAgICAgICAgICAgYm9yZGVyLXJhZGl1czogMC4xMjVyZW07XG4gICAgICAgICAgICBvdXRsaW5lOiAwO1xuICAgICAgICBgLFxuICAgICAgICBzZWxlY3Q6IGBcbiAgICAgICAgICAgIG1hcmdpbjogMDtcbiAgICAgICAgICAgIGZvbnQtc2l6ZTogMC44NzVlbTtcbiAgICAgICAgICAgIGhlaWdodDogNTBweDtcbiAgICAgICAgICAgIHdpZHRoOiAxMDAlO1xuICAgICAgICAgICAgYm9yZGVyOiAwLjA2MjVyZW0gc29saWQgI2RjZTBlNTtcbiAgICAgICAgICAgIGJvcmRlci1yYWRpdXM6IDAuMTI1cmVtO1xuICAgICAgICAgICAgYmFja2dyb3VuZC1jb2xvcjogI2ZlZmVmZTtcbiAgICAgICAgYCxcbiAgICAgICAgc2VsZWN0Rm9jdXM6IGBcbiAgICAgICAgICAgIG1hcmdpbjogMDtcbiAgICAgICAgICAgIGZvbnQtc2l6ZTogMC44NzVlbTtcbiAgICAgICAgICAgIGhlaWdodDogNTBweDtcbiAgICAgICAgICAgIHdpZHRoOiAxMDAlO1xuICAgICAgICAgICAgYm9yZGVyOiAwLjA2MjVyZW0gc29saWQgI2RjZTBlNTtcbiAgICAgICAgICAgIGJvcmRlci1yYWRpdXM6IDAuMTI1cmVtO1xuICAgICAgICAgICAgYmFja2dyb3VuZC1jb2xvcjogI2ZlZmVmZTtcbiAgICAgICAgICAgIG91dGxpbmU6IDA7XG4gICAgICAgIGAsXG4gICAgICAgIGlmcmFtZToge1xuICAgICAgICAgICAgaGVpZ2h0OiAnNTZweCcsXG4gICAgICAgICAgICB3aWR0aDogJzEwMCUnLFxuICAgICAgICAgICAgbWFyZ2luOiAwLFxuICAgICAgICB9LFxuICAgIH0sXG5cbiAgICBlcnJvcjogJ2Vycm9yT3V0cHV0Jyxcbn07XG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIFBheW9uZUNyZWRpdENhcmQgZXh0ZW5kcyBFY29QYXlvbmVDcmVkaXRDYXJkIHtcbiAgICBwcm90ZWN0ZWQgc3VibWl0QnV0dG9uOiBIVE1MQnV0dG9uRWxlbWVudFtdO1xuXG4gICAgcHJvdGVjdGVkIHJlYWR5Q2FsbGJhY2soKTogdm9pZCB7XG4gICAgICAgIHRoaXMuc2NyaXB0TG9hZGVyID0gPFNjcmlwdExvYWRlcj50aGlzLnF1ZXJ5U2VsZWN0b3IoJ3NjcmlwdC1sb2FkZXInKTtcbiAgICAgICAgdGhpcy5mb3JtID0gPEhUTUxGb3JtRWxlbWVudD5kb2N1bWVudC5xdWVyeVNlbGVjdG9yKHRoaXMuZm9ybVNlbGVjdG9yKTtcbiAgICAgICAgdGhpcy5jYXJkSG9sZGVySW5wdXQgPSA8SFRNTElucHV0RWxlbWVudD50aGlzLnF1ZXJ5U2VsZWN0b3IodGhpcy5jYXJkSG9sZGVyU2VsZWN0b3IpO1xuICAgICAgICB0aGlzLmNsaWVudEFwaUNvbmZpZ0lucHV0ID0gPEhUTUxJbnB1dEVsZW1lbnQ+dGhpcy5xdWVyeVNlbGVjdG9yKHRoaXMuY2xpZW50QXBpQ29uZmlnU2VsZWN0b3IpO1xuICAgICAgICB0aGlzLmxhbmd1YWdlSW5wdXQgPSA8SFRNTElucHV0RWxlbWVudD50aGlzLnF1ZXJ5U2VsZWN0b3IodGhpcy5sYW5ndWFnZVNlbGVjdG9yKTtcbiAgICAgICAgdGhpcy5wc2V1ZG9DYXJkUGFuSW5wdXQgPSA8SFRNTElucHV0RWxlbWVudD50aGlzLnF1ZXJ5U2VsZWN0b3IodGhpcy5wc2V1ZG9DYXJkUGFuU2VsZWN0b3IpO1xuICAgICAgICB0aGlzLmVycm9yRWxlbWVudCA9IHRoaXMucXVlcnlTZWxlY3Rvcih0aGlzLmVycm9yQ29udGFpbmVyKTtcblxuICAgICAgICB0aGlzLm1hcEV2ZW50cygpO1xuXG4gICAgICAgIHRoaXMuc3VibWl0QnV0dG9uID0gPEhUTUxCdXR0b25FbGVtZW50W10+QXJyYXkuZnJvbShcbiAgICAgICAgICAgIGRvY3VtZW50LmdldEVsZW1lbnRzQnlDbGFzc05hbWUoYCR7dGhpcy5qc05hbWV9X19zdWJtaXRgKVxuICAgICAgICApO1xuXG4gICAgICAgIHRoaXMuc3VibWl0QnV0dG9uLmZvckVhY2goYnV0dG9uID0+IHtcbiAgICAgICAgICAgIGJ1dHRvbi5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIChldmVudDogRXZlbnQpID0+IHRoaXMub25TdWJtaXQoZXZlbnQpKTtcbiAgICAgICAgfSk7XG4gICAgfVxuXG4gICAgcHJvdGVjdGVkIG1hcEV2ZW50cygpOiB2b2lkIHtcbiAgICAgICAgdGhpcy5zY3JpcHRMb2FkZXIuYWRkRXZlbnRMaXN0ZW5lcignc2NyaXB0bG9hZCcsIChldmVudDogRXZlbnQpID0+IHRoaXMub25TY3JpcHRMb2FkKGV2ZW50KSk7XG4gICAgICAgIHRoaXMuZm9ybS5hZGRFdmVudExpc3RlbmVyKCdzdWJtaXQnLCAoZXZlbnQ6IEV2ZW50KSA9PiB0aGlzLm9uU3VibWl0KGV2ZW50KSk7XG4gICAgfVxuXG4gICAgcHJvdGVjdGVkIGVuYWJsZVN1Ym1pdCgpOiB2b2lkIHtcbiAgICAgICAgdGhpcy5zdWJtaXRCdXR0b24uZm9yRWFjaChidXR0b24gPT4ge1xuICAgICAgICAgICAgYnV0dG9uLnJlbW92ZUF0dHJpYnV0ZSgnZGlzYWJsZWQnKTtcbiAgICAgICAgfSk7XG4gICAgfVxuXG4gICAgcHJvdGVjdGVkIGxvYWRQYXlvbmVJRnJhbWUoKTogdm9pZCB7XG4gICAgICAgIHRoaXMuaG9zdGVkSUZyYW1lc0FwaSA9IG5ldyBQYXlvbmUuQ2xpZW50QXBpLkhvc3RlZElGcmFtZXModGhpcy5ob3N0ZWRJRnJhbWVzQ29uZmlnLCB0aGlzLmNsaWVudEFwaUNvbmZpZyk7XG5cbiAgICAgICAgUGF5b25lLkNsaWVudEFwaS5MYW5ndWFnZS5kZS5wbGFjZWhvbGRlcnMuY2FyZHBhbiA9ICdfIF8gXyBfICBfIF8gXyBfICBfIF8gXyBfICBfIF8gXyBfJztcbiAgICAgICAgUGF5b25lLkNsaWVudEFwaS5MYW5ndWFnZS5kZS5wbGFjZWhvbGRlcnMuY3ZjID0gJ+KAoiDigKIg4oCiJztcbiAgICB9XG5cbiAgICBnZXQgaG9zdGVkSUZyYW1lc0NvbmZpZygpOiBPYmplY3Qge1xuICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgLi4uZGVmYXVsdEhvc3RlZElGcmFtZXNDb25maWcsXG4gICAgICAgICAgICBsYW5ndWFnZTogdGhpcy5sYW5ndWFnZVxuICAgICAgICB9O1xuICAgIH1cblxuICAgIHByb3RlY3RlZCBvblN1Ym1pdChldmVudDogRXZlbnQpOiB2b2lkIHtcbiAgICAgICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcblxuICAgICAgICBpZiAodHlwZW9mIHRoaXMuaXNDdXJyZW50UGF5bWVudE1ldGhvZCA9PT0gJ3VuZGVmaW5lZCcpIHtcbiAgICAgICAgICAgIHRoaXMuZW5hYmxlU3VibWl0KCk7XG5cbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmICghdGhpcy5pc0N1cnJlbnRQYXltZW50TWV0aG9kIHx8IHRoaXMuaXNQYXltZW50VmFsaWQpIHtcbiAgICAgICAgICAgIHRoaXMuZm9ybS5zdWJtaXQoKTtcbiAgICAgICAgfVxuXG4gICAgICAgIHRoaXMuY2hlY2tDcmVkaXRDYXJkKCk7XG4gICAgfVxuXG4gICAgcHJvdGVjdGVkIGNoZWNrQ3JlZGl0Q2FyZCgpOiB2b2lkIHtcbiAgICAgICAgaWYgKHRoaXMuaG9zdGVkSUZyYW1lc0FwaS5pc0NvbXBsZXRlKCkgJiYgdGhpcy5jYXJkSG9sZGVySW5wdXQudmFsdWUpIHtcbiAgICAgICAgICAgIHRoaXMuaG9zdGVkSUZyYW1lc0FwaS5jcmVkaXRDYXJkQ2hlY2soQ0hFQ0tfQ0FMTEJBQ0tfSUQpO1xuXG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cblxuICAgICAgICB0aGlzLmVycm9yRWxlbWVudC5pbm5lckhUTUwgPSB0aGlzLmhvc3RlZElGcmFtZXNDb25maWcubGFuZ3VhZ2UudHJhbnNhY3Rpb25SZWplY3RlZDtcbiAgICAgICAgdGhpcy5lbmFibGVTdWJtaXQoKTtcbiAgICB9XG5cbiAgICAvKiB0c2xpbnQ6ZGlzYWJsZTogbm8tYW55ICovXG4gICAgcHJvdGVjdGVkIGFzeW5jIGNoZWNrQ2FsbGJhY2socmVzcG9uc2U6IGFueSk6IFByb21pc2U8dm9pZD4ge1xuICAgICAgICAvKiB0c2xpbnQ6ZW5hYmxlOiBuby1hbnkgKi9cbiAgICAgICAgaWYgKHJlc3BvbnNlLnN0YXR1cyAhPT0gVkFMSURfUkVTUE9OU0VfU1RBVFVTKSB7XG4gICAgICAgICAgICB0aGlzLmVuYWJsZVN1Ym1pdCgpO1xuXG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cblxuICAgICAgICB0aGlzLnBzZXVkb0NhcmRQYW5JbnB1dC52YWx1ZSA9IGF3YWl0IFByb21pc2UucmVzb2x2ZShyZXNwb25zZS5wc2V1ZG9jYXJkcGFuKTtcbiAgICAgICAgdGhpcy5zZXRQYXltZW50VG9WYWxpZCgpO1xuICAgICAgICB0aGlzLmZvcm0uc3VibWl0KCk7XG4gICAgfVxuXG4gICAgZ2V0IGlzQ3VycmVudFBheW1lbnRNZXRob2QoKTogYm9vbGVhbiB8IHVuZGVmaW5lZCB7XG4gICAgICAgIGNvbnN0IGN1cnJlbnRQYXltZW50TWV0aG9kSW5wdXQgPSA8SFRNTElucHV0RWxlbWVudD5kb2N1bWVudC5xdWVyeVNlbGVjdG9yKHRoaXMuY3VycmVudFBheW1lbnRNZXRob2RTZWxlY3Rvcik7XG5cbiAgICAgICAgcmV0dXJuIGN1cnJlbnRQYXltZW50TWV0aG9kSW5wdXQ/LnZhbHVlXG4gICAgICAgICAgICA/IGN1cnJlbnRQYXltZW50TWV0aG9kSW5wdXQudmFsdWUgPT09IENVUlJFTlRfUEFZTUVOVF9NRVRIT0RcbiAgICAgICAgICAgIDogdW5kZWZpbmVkO1xuICAgIH1cbn1cbiIsIi8qIHRzbGludDpkaXNhYmxlOiBuby1hbnkgKi9cbi8qIHRzbGludDpkaXNhYmxlOiBtYXgtZmlsZS1saW5lLWNvdW50ICovXG5kZWNsYXJlIHZhciBQYXlvbmU6IGFueTtcblxuaW1wb3J0IENvbXBvbmVudCBmcm9tICdTaG9wVWkvbW9kZWxzL2NvbXBvbmVudCc7XG5pbXBvcnQgU2NyaXB0TG9hZGVyIGZyb20gJ1Nob3BVaS9jb21wb25lbnRzL21vbGVjdWxlcy9zY3JpcHQtbG9hZGVyL3NjcmlwdC1sb2FkZXInO1xuXG5jb25zdCBDVVJSRU5UX1BBWU1FTlRfTUVUSE9EID0gJ3BheW9uZUNyZWRpdENhcmQnO1xuY29uc3QgQ0hFQ0tfQ0FMTEJBQ0tfSUQgPSAnY2hlY2tDYWxsYmFjayc7XG5jb25zdCBDSEVDS19DQUxMQkFDS19WQUxJRF9SRVNQT05TRV9TVEFUVVMgPSAnVkFMSUQnO1xuXG4vLyBjb25maWd1cmF0aW9uIGZvciBIb3N0ZWQgSWZyYW1lLlxuLy8gaHR0cHM6Ly9naXRodWIuY29tL2ZqYmVuZGVyL3NpbXBsZS1waHAtaW50ZWdyYXRpb24jYnVpbGQtdGhlLWZvcm1cbmNvbnN0IGRlZmF1bHRIb3N0ZWRJRnJhbWVzQ29uZmlnID0ge1xuICAgIGZpZWxkczoge1xuICAgICAgICBjYXJkdHlwZToge1xuICAgICAgICAgICAgc2VsZWN0b3I6ICdjYXJkdHlwZScsXG4gICAgICAgICAgICBjYXJkdHlwZXM6IFsnVicsICdNJ10sXG4gICAgICAgIH0sXG4gICAgICAgIGNhcmRwYW46IHtcbiAgICAgICAgICAgIHNlbGVjdG9yOiAnY2FyZHBhbicsXG4gICAgICAgICAgICB0eXBlOiAndGV4dCcsXG4gICAgICAgIH0sXG4gICAgICAgIGNhcmRjdmMyOiB7XG4gICAgICAgICAgICBzZWxlY3RvcjogJ2NhcmRjdmMyJyxcbiAgICAgICAgICAgIHR5cGU6ICdwYXNzd29yZCcsXG4gICAgICAgICAgICBzaXplOiAnMycsXG4gICAgICAgICAgICBtYXhsZW5ndGg6ICczJyxcbiAgICAgICAgICAgIGxlbmd0aDogeyBWOiAzLCBNOiAzIH0sXG4gICAgICAgIH0sXG4gICAgICAgIGNhcmRleHBpcmVtb250aDoge1xuICAgICAgICAgICAgc2VsZWN0b3I6ICdjYXJkZXhwaXJlbW9udGgnLFxuICAgICAgICAgICAgdHlwZTogJ3NlbGVjdCcsXG4gICAgICAgICAgICBzaXplOiAnMicsXG4gICAgICAgICAgICBtYXhsZW5ndGg6ICcyJyxcbiAgICAgICAgICAgIGlmcmFtZToge1xuICAgICAgICAgICAgICAgIHdpZHRoOiAnMTAwJScsXG4gICAgICAgICAgICB9LFxuICAgICAgICB9LFxuICAgICAgICBjYXJkZXhwaXJleWVhcjoge1xuICAgICAgICAgICAgc2VsZWN0b3I6ICdjYXJkZXhwaXJleWVhcicsXG4gICAgICAgICAgICB0eXBlOiAnc2VsZWN0JyxcbiAgICAgICAgICAgIGlmcmFtZToge1xuICAgICAgICAgICAgICAgIHdpZHRoOiAnMTAwJScsXG4gICAgICAgICAgICB9LFxuICAgICAgICB9LFxuICAgIH0sXG5cbiAgICBkZWZhdWx0U3R5bGU6IHtcbiAgICAgICAgaW5wdXQ6IGBmb250LXNpemU6IDAuODc1ZW07IGhlaWdodDogMnJlbTsgd2lkdGg6IDEwMCU7IGJvcmRlcjogMDsgb3V0bGluZTogMXB4IHNvbGlkICNkYWRhZGE7IG91dGxpbmUtb2Zmc2V0OiAtMXB4O2AsXG4gICAgICAgIHNlbGVjdDogYGZvbnQtc2l6ZTogMC44NzVlbTsgaGVpZ2h0OiAycmVtOyB3aWR0aDogMTAwJTsgYm9yZGVyOiAwOyBvdXRsaW5lOiAxcHggc29saWQgI2RhZGFkYTsgb3V0bGluZS1vZmZzZXQ6IC0xcHg7IGJhY2tncm91bmQtY29sb3I6ICNmZWZlZmU7YCxcbiAgICAgICAgaWZyYW1lOiB7XG4gICAgICAgICAgICBoZWlnaHQ6ICczNXB4JyxcbiAgICAgICAgICAgIHdpZHRoOiAnMTAwJScsXG4gICAgICAgIH0sXG4gICAgfSxcblxuICAgIGVycm9yOiAnZXJyb3JPdXRwdXQnLFxufTtcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgUGF5b25lQ3JlZGl0Q2FyZCBleHRlbmRzIENvbXBvbmVudCB7XG4gICAgc2NyaXB0TG9hZGVyOiBTY3JpcHRMb2FkZXI7XG4gICAgZm9ybTogSFRNTEZvcm1FbGVtZW50O1xuICAgIGhvc3RlZElGcmFtZXNBcGk6IGFueTtcbiAgICBjYXJkVHlwZUlucHV0OiBIVE1MSW5wdXRFbGVtZW50O1xuICAgIGNhcmRIb2xkZXJJbnB1dDogSFRNTElucHV0RWxlbWVudDtcbiAgICBjbGllbnRBcGlDb25maWdJbnB1dDogSFRNTElucHV0RWxlbWVudDtcbiAgICBsYW5ndWFnZUlucHV0OiBIVE1MSW5wdXRFbGVtZW50O1xuICAgIHBzZXVkb0NhcmRQYW5JbnB1dDogSFRNTElucHV0RWxlbWVudDtcbiAgICBlcnJvckVsZW1lbnQ6IEhUTUxFbGVtZW50O1xuICAgIHByb3RlY3RlZCBpc1BheW1lbnRWYWxpZDogYm9vbGVhbiA9IGZhbHNlO1xuXG4gICAgcHJvdGVjdGVkIHN1Ym1pdEJ1dHRvbjogSFRNTEJ1dHRvbkVsZW1lbnRbXTtcblxuICAgIHByb3RlY3RlZCByZWFkeUNhbGxiYWNrKCk6IHZvaWQge31cblxuICAgIHByb3RlY3RlZCBpbml0KCk6IHZvaWQge1xuICAgICAgICB0aGlzLnNjcmlwdExvYWRlciA9IDxTY3JpcHRMb2FkZXI+dGhpcy5xdWVyeVNlbGVjdG9yKCdzY3JpcHQtbG9hZGVyJyk7XG4gICAgICAgIHRoaXMuZm9ybSA9IDxIVE1MRm9ybUVsZW1lbnQ+ZG9jdW1lbnQucXVlcnlTZWxlY3Rvcih0aGlzLmZvcm1TZWxlY3Rvcik7XG4gICAgICAgIHRoaXMuY2FyZEhvbGRlcklucHV0ID0gPEhUTUxJbnB1dEVsZW1lbnQ+dGhpcy5xdWVyeVNlbGVjdG9yKHRoaXMuY2FyZEhvbGRlclNlbGVjdG9yKTtcbiAgICAgICAgdGhpcy5jbGllbnRBcGlDb25maWdJbnB1dCA9IDxIVE1MSW5wdXRFbGVtZW50PnRoaXMucXVlcnlTZWxlY3Rvcih0aGlzLmNsaWVudEFwaUNvbmZpZ1NlbGVjdG9yKTtcbiAgICAgICAgdGhpcy5sYW5ndWFnZUlucHV0ID0gPEhUTUxJbnB1dEVsZW1lbnQ+dGhpcy5xdWVyeVNlbGVjdG9yKHRoaXMubGFuZ3VhZ2VTZWxlY3Rvcik7XG4gICAgICAgIHRoaXMucHNldWRvQ2FyZFBhbklucHV0ID0gPEhUTUxJbnB1dEVsZW1lbnQ+dGhpcy5xdWVyeVNlbGVjdG9yKHRoaXMucHNldWRvQ2FyZFBhblNlbGVjdG9yKTtcbiAgICAgICAgdGhpcy5lcnJvckVsZW1lbnQgPSB0aGlzLnF1ZXJ5U2VsZWN0b3IodGhpcy5lcnJvckNvbnRhaW5lcik7XG4gICAgICAgIHRoaXMuc3VibWl0QnV0dG9uID0gPEhUTUxCdXR0b25FbGVtZW50W10+QXJyYXkuZnJvbShcbiAgICAgICAgICAgIGRvY3VtZW50LmdldEVsZW1lbnRzQnlDbGFzc05hbWUoYCR7dGhpcy5qc05hbWV9X19zdWJtaXRgKVxuICAgICAgICApO1xuXG4gICAgICAgIHRoaXMubWFwRXZlbnRzKCk7XG4gICAgfVxuXG4gICAgcHJvdGVjdGVkIG1hcEV2ZW50cygpOiB2b2lkIHtcbiAgICAgICAgdGhpcy5zY3JpcHRMb2FkZXIuYWRkRXZlbnRMaXN0ZW5lcignc2NyaXB0bG9hZCcsIChldmVudDogRXZlbnQpID0+IHRoaXMub25TY3JpcHRMb2FkKGV2ZW50KSk7XG4gICAgICAgIHRoaXMuZm9ybS5hZGRFdmVudExpc3RlbmVyKCdzdWJtaXQnLCAoZXZlbnQ6IEV2ZW50KSA9PiB0aGlzLm9uU3VibWl0KGV2ZW50KSk7XG4gICAgfVxuXG4gICAgcHJvdGVjdGVkIG9uU2NyaXB0TG9hZChldmVudDogRXZlbnQpOiB2b2lkIHtcbiAgICAgICAgdGhpcy5hZGRDaGVja0NhbGxiYWNrVG9HbG9iYWxTY29wZSgpO1xuICAgICAgICB0aGlzLmxvYWRQYXlvbmVJRnJhbWUoKTtcbiAgICB9XG5cbiAgICBwcm90ZWN0ZWQgb25TdWJtaXQoZXZlbnQ6IEV2ZW50KTogdm9pZCB7XG4gICAgICAgIGlmICghdGhpcy5pc0N1cnJlbnRQYXltZW50TWV0aG9kKSB7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cblxuICAgICAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuXG4gICAgICAgIGlmICh0aGlzLmlzUGF5bWVudFZhbGlkKSB7XG4gICAgICAgICAgICB0aGlzLmZvcm0uc3VibWl0KCk7XG4gICAgICAgIH1cblxuICAgICAgICB0aGlzLmNoZWNrQ3JlZGl0Q2FyZCgpO1xuICAgIH1cblxuICAgIHByb3RlY3RlZCBhZGRDaGVja0NhbGxiYWNrVG9HbG9iYWxTY29wZSgpOiB2b2lkIHtcbiAgICAgICAgd2luZG93W0NIRUNLX0NBTExCQUNLX0lEXSA9IHRoaXMuY2hlY2tDYWxsYmFjay5iaW5kKHRoaXMpO1xuICAgIH1cblxuICAgIHByb3RlY3RlZCBhc3luYyBjaGVja0NhbGxiYWNrKHJlc3BvbnNlOiBhbnkpOiBQcm9taXNlPHZvaWQ+IHtcbiAgICAgICAgaWYgKHJlc3BvbnNlLnN0YXR1cyAhPT0gQ0hFQ0tfQ0FMTEJBQ0tfVkFMSURfUkVTUE9OU0VfU1RBVFVTKSB7XG4gICAgICAgICAgICBzZXRUaW1lb3V0KCgpID0+IHRoaXMuZW5hYmxlU3VibWl0KCksIDApO1xuXG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cblxuICAgICAgICB0aGlzLnBzZXVkb0NhcmRQYW5JbnB1dC52YWx1ZSA9IGF3YWl0IFByb21pc2UucmVzb2x2ZShyZXNwb25zZS5wc2V1ZG9jYXJkcGFuKTtcbiAgICAgICAgdGhpcy5zZXRQYXltZW50VG9WYWxpZCgpO1xuICAgICAgICB0aGlzLmZvcm0uc3VibWl0KCk7XG4gICAgfVxuXG4gICAgcHJvdGVjdGVkIGNoZWNrQ3JlZGl0Q2FyZCgpOiB2b2lkIHtcbiAgICAgICAgaWYgKHRoaXMuaG9zdGVkSUZyYW1lc0FwaS5pc0NvbXBsZXRlKCkgJiYgdGhpcy5jYXJkSG9sZGVySW5wdXQudmFsdWUpIHtcbiAgICAgICAgICAgIHRoaXMuaG9zdGVkSUZyYW1lc0FwaS5jcmVkaXRDYXJkQ2hlY2soQ0hFQ0tfQ0FMTEJBQ0tfSUQpO1xuXG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cblxuICAgICAgICB0aGlzLmVycm9yRWxlbWVudC5pbm5lckhUTUwgPSB0aGlzLmhvc3RlZElGcmFtZXNDb25maWcubGFuZ3VhZ2UudHJhbnNhY3Rpb25SZWplY3RlZDtcbiAgICAgICAgc2V0VGltZW91dCgoKSA9PiB0aGlzLmVuYWJsZVN1Ym1pdCgpLCAwKTtcbiAgICB9XG5cbiAgICBwcm90ZWN0ZWQgZW5hYmxlU3VibWl0KCk6IHZvaWQge1xuICAgICAgICBpZiAodGhpcy5zdWJtaXRCdXR0b24ubGVuZ3RoKSB7XG4gICAgICAgICAgICB0aGlzLnN1Ym1pdEJ1dHRvbi5mb3JFYWNoKGJ1dHRvbiA9PiB7XG4gICAgICAgICAgICAgICAgYnV0dG9uLnJlbW92ZUF0dHJpYnV0ZSgnZGlzYWJsZWQnKTtcbiAgICAgICAgICAgIH0pO1xuXG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cblxuICAgICAgICBjb25zdCBidXR0b25zID0gPEhUTUxCdXR0b25FbGVtZW50W10+QXJyYXkuZnJvbSh0aGlzLmZvcm0uZ2V0RWxlbWVudHNCeVRhZ05hbWUoJ2J1dHRvbicpKTtcbiAgICAgICAgYnV0dG9ucy5mb3JFYWNoKGJ1dHRvbiA9PiB7XG4gICAgICAgICAgICBidXR0b24ucmVtb3ZlQXR0cmlidXRlKCdkaXNhYmxlZCcpO1xuICAgICAgICB9KTtcbiAgICB9XG5cbiAgICBwcm90ZWN0ZWQgbG9hZFBheW9uZUlGcmFtZSgpOiB2b2lkIHtcbiAgICAgICAgdGhpcy5ob3N0ZWRJRnJhbWVzQXBpID0gbmV3IFBheW9uZS5DbGllbnRBcGkuSG9zdGVkSUZyYW1lcyh0aGlzLmhvc3RlZElGcmFtZXNDb25maWcsIHRoaXMuY2xpZW50QXBpQ29uZmlnKTtcblxuICAgICAgICBQYXlvbmUuQ2xpZW50QXBpLkxhbmd1YWdlLmRlLnBsYWNlaG9sZGVycy5jYXJkcGFuID0gJ18gXyBfIF8gIF8gXyBfIF8gIF8gXyBfIF8gIF8gXyBfIF8nO1xuICAgICAgICBQYXlvbmUuQ2xpZW50QXBpLkxhbmd1YWdlLmRlLnBsYWNlaG9sZGVycy5jdmMgPSAn4oCiIOKAoiDigKInO1xuICAgIH1cblxuICAgIHByb3RlY3RlZCBzZXRQYXltZW50VG9WYWxpZCgpOiB2b2lkIHtcbiAgICAgICAgdGhpcy5pc1BheW1lbnRWYWxpZCA9IHRydWU7XG4gICAgfVxuXG4gICAgZ2V0IGlzQ3VycmVudFBheW1lbnRNZXRob2QoKTogYm9vbGVhbiB8IG51bGwge1xuICAgICAgICBjb25zdCBjdXJyZW50UGF5bWVudE1ldGhvZElucHV0ID0gPEhUTUxJbnB1dEVsZW1lbnQ+ZG9jdW1lbnQucXVlcnlTZWxlY3Rvcih0aGlzLmN1cnJlbnRQYXltZW50TWV0aG9kU2VsZWN0b3IpO1xuXG4gICAgICAgIHJldHVybiBjdXJyZW50UGF5bWVudE1ldGhvZElucHV0Py52YWx1ZVxuICAgICAgICAgICAgPyBjdXJyZW50UGF5bWVudE1ldGhvZElucHV0LnZhbHVlID09PSBDVVJSRU5UX1BBWU1FTlRfTUVUSE9EXG4gICAgICAgICAgICA6IG51bGw7XG4gICAgfVxuXG4gICAgZ2V0IGxhbmd1YWdlKCk6IHN0cmluZyB7XG4gICAgICAgIGNvbnN0IGxhbmd1YWdlQ29kZUxlbmdodCA9IDI7XG4gICAgICAgIGNvbnN0IGxhbmd1YWdlQ29kZSA9ICEhdGhpcy5sYW5ndWFnZUlucHV0LnZhbHVlID8gdGhpcy5sYW5ndWFnZUlucHV0LnZhbHVlLnN1YnN0cigwLCBsYW5ndWFnZUNvZGVMZW5naHQpIDogJ2RlJztcblxuICAgICAgICByZXR1cm4gUGF5b25lLkNsaWVudEFwaS5MYW5ndWFnZVtsYW5ndWFnZUNvZGVdIHx8IFBheW9uZS5DbGllbnRBcGkuTGFuZ3VhZ2UuZGU7XG4gICAgfVxuXG4gICAgZ2V0IGhvc3RlZElGcmFtZXNDb25maWcoKTogYW55IHtcbiAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgIC4uLmRlZmF1bHRIb3N0ZWRJRnJhbWVzQ29uZmlnLFxuICAgICAgICAgICAgbGFuZ3VhZ2U6IHRoaXMubGFuZ3VhZ2VcbiAgICAgICAgfTtcbiAgICB9XG5cbiAgICBnZXQgY2xpZW50QXBpQ29uZmlnKCk6IGFueSB7XG4gICAgICAgIHJldHVybiBKU09OLnBhcnNlKHRoaXMuY2xpZW50QXBpQ29uZmlnSW5wdXQudmFsdWUpO1xuICAgIH1cblxuICAgIGdldCBmb3JtU2VsZWN0b3IoKTogc3RyaW5nIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuZ2V0QXR0cmlidXRlKCdmb3JtLXNlbGVjdG9yJyk7XG4gICAgfVxuXG4gICAgZ2V0IGNsaWVudEFwaUNvbmZpZ1NlbGVjdG9yKCk6IHN0cmluZyB7XG4gICAgICAgIHJldHVybiB0aGlzLmdldEF0dHJpYnV0ZSgnY2xpZW50LWFwaS1jb25maWctc2VsZWN0b3InKTtcbiAgICB9XG5cbiAgICBnZXQgbGFuZ3VhZ2VTZWxlY3RvcigpOiBzdHJpbmcge1xuICAgICAgICByZXR1cm4gdGhpcy5nZXRBdHRyaWJ1dGUoJ2xhbmd1YWdlLXNlbGVjdG9yJyk7XG4gICAgfVxuXG4gICAgZ2V0IGNhcmRUeXBlU2VsZWN0b3IoKTogc3RyaW5nIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuZ2V0QXR0cmlidXRlKCdjYXJkLXR5cGUtc2VsZWN0b3InKTtcbiAgICB9XG5cbiAgICBnZXQgY2FyZEhvbGRlclNlbGVjdG9yKCk6IHN0cmluZyB7XG4gICAgICAgIHJldHVybiB0aGlzLmdldEF0dHJpYnV0ZSgnY2FyZC1ob2xkZXItc2VsZWN0b3InKTtcbiAgICB9XG5cbiAgICBnZXQgcHNldWRvQ2FyZFBhblNlbGVjdG9yKCk6IHN0cmluZyB7XG4gICAgICAgIHJldHVybiB0aGlzLmdldEF0dHJpYnV0ZSgncHNldWRvLWNhcmQtcGFuLXNlbGVjdG9yJyk7XG4gICAgfVxuXG4gICAgZ2V0IGVycm9yQ29udGFpbmVyKCk6IHN0cmluZyB7XG4gICAgICAgIHJldHVybiB0aGlzLmdldEF0dHJpYnV0ZSgnZXJyb3ItY29udGFpbmVyLXNlbGVjdG9yJyk7XG4gICAgfVxuXG4gICAgZ2V0IGN1cnJlbnRQYXltZW50TWV0aG9kU2VsZWN0b3IoKTogc3RyaW5nIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuZ2V0QXR0cmlidXRlKCdjdXJyZW50LXBheW1lbnQtbWV0aG9kLXNlbGVjdG9yJyk7XG4gICAgfVxufVxuIl0sInNvdXJjZVJvb3QiOiIifQ==