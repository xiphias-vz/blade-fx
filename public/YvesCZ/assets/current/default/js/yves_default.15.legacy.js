(window["webpackJsonp_yves_default"] = window["webpackJsonp_yves_default"] || []).push([[15],{

/***/ "./src/Pyz/Yves/CustomerConfirmationPage/Theme/default/components/molecules/customer-confirmation-form/customer-confirmation-form.ts":
/*!*******************************************************************************************************************************************!*\
  !*** ./src/Pyz/Yves/CustomerConfirmationPage/Theme/default/components/molecules/customer-confirmation-form/customer-confirmation-form.ts ***!
  \*******************************************************************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return CustomerConfirmationForm; });
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







function _createSuper(Derived) { return function () { var Super = _babel_runtime_helpers_getPrototypeOf__WEBPACK_IMPORTED_MODULE_3___default()(Derived), result; if (_isNativeReflectConstruct()) { var NewTarget = _babel_runtime_helpers_getPrototypeOf__WEBPACK_IMPORTED_MODULE_3___default()(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _babel_runtime_helpers_possibleConstructorReturn__WEBPACK_IMPORTED_MODULE_2___default()(this, result); }; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Date.prototype.toString.call(Reflect.construct(Date, [], function () {})); return true; } catch (e) { return false; } }


var HIDDEN_CLASS_NAME = 'is-hidden';

var CustomerConfirmationForm = /*#__PURE__*/function (_Component) {
  _babel_runtime_helpers_inheritsLoose__WEBPACK_IMPORTED_MODULE_4___default()(CustomerConfirmationForm, _Component);

  var _super = _createSuper(CustomerConfirmationForm);

  function CustomerConfirmationForm() {
    var _this;

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this = _Component.call.apply(_Component, [this].concat(args)) || this;

    _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_5___default()(_babel_runtime_helpers_assertThisInitialized__WEBPACK_IMPORTED_MODULE_1___default()(_this), "newPasswordInput", void 0);

    _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_5___default()(_babel_runtime_helpers_assertThisInitialized__WEBPACK_IMPORTED_MODULE_1___default()(_this), "phoneInput", void 0);

    _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_5___default()(_babel_runtime_helpers_assertThisInitialized__WEBPACK_IMPORTED_MODULE_1___default()(_this), "passwordHintHolder", void 0);

    _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_5___default()(_babel_runtime_helpers_assertThisInitialized__WEBPACK_IMPORTED_MODULE_1___default()(_this), "phoneHintHolder", void 0);

    _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_5___default()(_babel_runtime_helpers_assertThisInitialized__WEBPACK_IMPORTED_MODULE_1___default()(_this), "phoneErrorMessage", void 0);

    _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_5___default()(_babel_runtime_helpers_assertThisInitialized__WEBPACK_IMPORTED_MODULE_1___default()(_this), "submitButton", void 0);

    _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_5___default()(_babel_runtime_helpers_assertThisInitialized__WEBPACK_IMPORTED_MODULE_1___default()(_this), "customerConfirmationForm", void 0);

    _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_5___default()(_babel_runtime_helpers_assertThisInitialized__WEBPACK_IMPORTED_MODULE_1___default()(_this), "thirdPartyRegistration", void 0);

    _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_5___default()(_babel_runtime_helpers_assertThisInitialized__WEBPACK_IMPORTED_MODULE_1___default()(_this), "phonePrefix", void 0);

    _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_5___default()(_babel_runtime_helpers_assertThisInitialized__WEBPACK_IMPORTED_MODULE_1___default()(_this), "mobilePrefix", void 0);

    _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_5___default()(_babel_runtime_helpers_assertThisInitialized__WEBPACK_IMPORTED_MODULE_1___default()(_this), "mobileInput", void 0);

    return _this;
  }

  var _proto = CustomerConfirmationForm.prototype;

  _proto.readyCallback = function readyCallback() {};

  _proto.init = function init() {
    this.newPasswordInput = this.querySelector(this.newPasswordSelector);
    this.phoneInput = this.querySelector(this.phoneSelector);
    this.passwordHintHolder = this.getElementsByClassName(this.jsName + "__password-criteria")[0];
    this.phoneHintHolder = this.getElementsByClassName(this.jsName + "__phone-criteria")[0];
    this.phoneErrorMessage = this.getElementsByClassName(this.jsName + "__phone-error")[0];
    this.submitButton = this.getElementsByClassName(this.jsName + "__submit-button")[0];
    this.thirdPartyRegistration = document.getElementsByName("registerForm[third_party_registration]")[1];
    this.customerConfirmationForm = this.getElementsByClassName(this.jsName + "__form")[0].children[0];
    this.phonePrefix = document.getElementById("registerForm_phone_prefix");
    this.mobilePrefix = document.getElementById("registerForm_mobile_phone_prefix");
    this.mobileInput = document.getElementById("registerForm_phone");
    this.mapEvents();
  };

  _proto.mapEvents = function mapEvents() {
    var _this2 = this;

    if (this.newPasswordInput) {
      this.newPasswordInput.addEventListener('focus', function () {
        return _this2.showElement(_this2.passwordHintHolder);
      });
      this.newPasswordInput.addEventListener('blur', function () {
        return _this2.hideElement(_this2.passwordHintHolder);
      });
    }

    if (this.phoneInput) {
      this.phoneInput.addEventListener('focus', function () {
        return _this2.showElement(_this2.phoneHintHolder);
      });
      this.phoneInput.addEventListener('blur', function (event) {
        return _this2.phoneBlur(event);
      });
      this.phoneInput.addEventListener('input', function () {
        return _this2.hideElement(_this2.phoneErrorMessage);
      });
    }

    if (this.mobileInput) {
      this.mobileInput.addEventListener('blur', function (event) {
        return _this2.phoneBlur(event);
      });
    }

    if (this.submitButton) {
      this.submitButton.addEventListener('click', function (event) {
        return _this2.submitCustomerConfirmationForm(event);
      });
    }
  };

  _proto.showElement = function showElement(element) {
    element.classList.remove(HIDDEN_CLASS_NAME);
  };

  _proto.hideElement = function hideElement(element) {
    element.classList.add(HIDDEN_CLASS_NAME);
  };

  _proto.isPhoneNumberValid = function isPhoneNumberValid() {
    var pattern = /^[+ 0-9]+$/;
    var phoneNumber = this.phoneInput.value;
    return pattern.test(phoneNumber);
  };

  _proto.submitCustomerConfirmationForm = function submitCustomerConfirmationForm(event) {
    var isPhoneNumberValid = this.isPhoneNumberValid();

    if (isPhoneNumberValid && this.thirdPartyRegistration.checked) {
      this.customerConfirmationForm.submit();
      return;
    }

    event.preventDefault();
    this.showElement(this.phoneErrorMessage);
  };

  _proto.phoneBlur = function phoneBlur(event) {
    this.hideElement(this.phoneHintHolder);
    var target = event.target;
    var prefix = target.id.includes("mobile") ? this.phonePrefix : this.mobilePrefix;

    if (prefix !== undefined && prefix !== null) {
      if (prefix.value.length > 0 && target.value.length > 0 && !target.value.startsWith(prefix.value)) target.value = prefix.value + target.value;
    }
  };

  _babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_0___default()(CustomerConfirmationForm, [{
    key: "formName",
    get: function get() {
      return this.getAttribute('form-name');
    }
  }, {
    key: "newPasswordSelector",
    get: function get() {
      return this.getAttribute('new-password-selector');
    }
  }, {
    key: "phoneSelector",
    get: function get() {
      return this.getAttribute('phone-selector');
    }
  }]);

  return CustomerConfirmationForm;
}(ShopUi_models_component__WEBPACK_IMPORTED_MODULE_6__["default"]);



/***/ })

}]);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vLi9zcmMvUHl6L1l2ZXMvQ3VzdG9tZXJDb25maXJtYXRpb25QYWdlL1RoZW1lL2RlZmF1bHQvY29tcG9uZW50cy9tb2xlY3VsZXMvY3VzdG9tZXItY29uZmlybWF0aW9uLWZvcm0vY3VzdG9tZXItY29uZmlybWF0aW9uLWZvcm0udHMiXSwibmFtZXMiOlsiSElEREVOX0NMQVNTX05BTUUiLCJDdXN0b21lckNvbmZpcm1hdGlvbkZvcm0iLCJyZWFkeUNhbGxiYWNrIiwiaW5pdCIsIm5ld1Bhc3N3b3JkSW5wdXQiLCJxdWVyeVNlbGVjdG9yIiwibmV3UGFzc3dvcmRTZWxlY3RvciIsInBob25lSW5wdXQiLCJwaG9uZVNlbGVjdG9yIiwicGFzc3dvcmRIaW50SG9sZGVyIiwiZ2V0RWxlbWVudHNCeUNsYXNzTmFtZSIsImpzTmFtZSIsInBob25lSGludEhvbGRlciIsInBob25lRXJyb3JNZXNzYWdlIiwic3VibWl0QnV0dG9uIiwidGhpcmRQYXJ0eVJlZ2lzdHJhdGlvbiIsImRvY3VtZW50IiwiZ2V0RWxlbWVudHNCeU5hbWUiLCJjdXN0b21lckNvbmZpcm1hdGlvbkZvcm0iLCJjaGlsZHJlbiIsInBob25lUHJlZml4IiwiZ2V0RWxlbWVudEJ5SWQiLCJtb2JpbGVQcmVmaXgiLCJtb2JpbGVJbnB1dCIsIm1hcEV2ZW50cyIsImFkZEV2ZW50TGlzdGVuZXIiLCJzaG93RWxlbWVudCIsImhpZGVFbGVtZW50IiwiZXZlbnQiLCJwaG9uZUJsdXIiLCJzdWJtaXRDdXN0b21lckNvbmZpcm1hdGlvbkZvcm0iLCJlbGVtZW50IiwiY2xhc3NMaXN0IiwicmVtb3ZlIiwiYWRkIiwiaXNQaG9uZU51bWJlclZhbGlkIiwicGF0dGVybiIsInBob25lTnVtYmVyIiwidmFsdWUiLCJ0ZXN0IiwiY2hlY2tlZCIsInN1Ym1pdCIsInByZXZlbnREZWZhdWx0IiwidGFyZ2V0IiwicHJlZml4IiwiaWQiLCJpbmNsdWRlcyIsInVuZGVmaW5lZCIsImxlbmd0aCIsInN0YXJ0c1dpdGgiLCJnZXRBdHRyaWJ1dGUiLCJDb21wb25lbnQiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUFBO0FBRUEsSUFBTUEsaUJBQWlCLEdBQUcsV0FBMUI7O0lBRXFCQyx3Qjs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7U0FhUEMsYSxHQUFWLHlCQUFnQyxDQUFFLEM7O1NBRXhCQyxJLEdBQVYsZ0JBQXVCO0FBQ25CLFNBQUtDLGdCQUFMLEdBQTBDLEtBQUtDLGFBQUwsQ0FBbUIsS0FBS0MsbUJBQXhCLENBQTFDO0FBQ0EsU0FBS0MsVUFBTCxHQUFvQyxLQUFLRixhQUFMLENBQW1CLEtBQUtHLGFBQXhCLENBQXBDO0FBQ0EsU0FBS0Msa0JBQUwsR0FBdUMsS0FBS0Msc0JBQUwsQ0FBK0IsS0FBS0MsTUFBcEMsMEJBQWlFLENBQWpFLENBQXZDO0FBQ0EsU0FBS0MsZUFBTCxHQUFvQyxLQUFLRixzQkFBTCxDQUErQixLQUFLQyxNQUFwQyx1QkFBOEQsQ0FBOUQsQ0FBcEM7QUFDQSxTQUFLRSxpQkFBTCxHQUFzQyxLQUFLSCxzQkFBTCxDQUErQixLQUFLQyxNQUFwQyxvQkFBMkQsQ0FBM0QsQ0FBdEM7QUFDQSxTQUFLRyxZQUFMLEdBQXVDLEtBQUtKLHNCQUFMLENBQStCLEtBQUtDLE1BQXBDLHNCQUE2RCxDQUE3RCxDQUF2QztBQUNBLFNBQUtJLHNCQUFMLEdBQWdEQyxRQUFRLENBQUNDLGlCQUFULENBQTJCLHdDQUEzQixFQUFxRSxDQUFyRSxDQUFoRDtBQUNBLFNBQUtDLHdCQUFMLEdBQWlELEtBQUtSLHNCQUFMLENBQStCLEtBQUtDLE1BQXBDLGFBQW9ELENBQXBELEVBQXVEUSxRQUF2RCxDQUFnRSxDQUFoRSxDQUFqRDtBQUNBLFNBQUtDLFdBQUwsR0FBc0NKLFFBQVEsQ0FBQ0ssY0FBVCxDQUF3QiwyQkFBeEIsQ0FBdEM7QUFDQSxTQUFLQyxZQUFMLEdBQXVDTixRQUFRLENBQUNLLGNBQVQsQ0FBd0Isa0NBQXhCLENBQXZDO0FBQ0EsU0FBS0UsV0FBTCxHQUFxQ1AsUUFBUSxDQUFDSyxjQUFULENBQXdCLG9CQUF4QixDQUFyQztBQUNBLFNBQUtHLFNBQUw7QUFDSCxHOztTQUVTQSxTLEdBQVYscUJBQTRCO0FBQUE7O0FBQ3hCLFFBQUksS0FBS3BCLGdCQUFULEVBQTJCO0FBQ3ZCLFdBQUtBLGdCQUFMLENBQXNCcUIsZ0JBQXRCLENBQXVDLE9BQXZDLEVBQWdEO0FBQUEsZUFBTSxNQUFJLENBQUNDLFdBQUwsQ0FBaUIsTUFBSSxDQUFDakIsa0JBQXRCLENBQU47QUFBQSxPQUFoRDtBQUNBLFdBQUtMLGdCQUFMLENBQXNCcUIsZ0JBQXRCLENBQXVDLE1BQXZDLEVBQStDO0FBQUEsZUFBTSxNQUFJLENBQUNFLFdBQUwsQ0FBaUIsTUFBSSxDQUFDbEIsa0JBQXRCLENBQU47QUFBQSxPQUEvQztBQUNIOztBQUVELFFBQUksS0FBS0YsVUFBVCxFQUFxQjtBQUNqQixXQUFLQSxVQUFMLENBQWdCa0IsZ0JBQWhCLENBQWlDLE9BQWpDLEVBQTBDO0FBQUEsZUFBTSxNQUFJLENBQUNDLFdBQUwsQ0FBaUIsTUFBSSxDQUFDZCxlQUF0QixDQUFOO0FBQUEsT0FBMUM7QUFDQSxXQUFLTCxVQUFMLENBQWdCa0IsZ0JBQWhCLENBQWlDLE1BQWpDLEVBQXlDLFVBQUNHLEtBQUQ7QUFBQSxlQUFrQixNQUFJLENBQUNDLFNBQUwsQ0FBZUQsS0FBZixDQUFsQjtBQUFBLE9BQXpDO0FBQ0EsV0FBS3JCLFVBQUwsQ0FBZ0JrQixnQkFBaEIsQ0FBaUMsT0FBakMsRUFBMEM7QUFBQSxlQUFNLE1BQUksQ0FBQ0UsV0FBTCxDQUFpQixNQUFJLENBQUNkLGlCQUF0QixDQUFOO0FBQUEsT0FBMUM7QUFDSDs7QUFDRCxRQUFJLEtBQUtVLFdBQVQsRUFBc0I7QUFDbEIsV0FBS0EsV0FBTCxDQUFpQkUsZ0JBQWpCLENBQWtDLE1BQWxDLEVBQTBDLFVBQUNHLEtBQUQ7QUFBQSxlQUFrQixNQUFJLENBQUNDLFNBQUwsQ0FBZUQsS0FBZixDQUFsQjtBQUFBLE9BQTFDO0FBQ0g7O0FBRUQsUUFBSSxLQUFLZCxZQUFULEVBQXVCO0FBQ25CLFdBQUtBLFlBQUwsQ0FBa0JXLGdCQUFsQixDQUFtQyxPQUFuQyxFQUE0QyxVQUFDRyxLQUFEO0FBQUEsZUFBa0IsTUFBSSxDQUFDRSw4QkFBTCxDQUFvQ0YsS0FBcEMsQ0FBbEI7QUFBQSxPQUE1QztBQUNIO0FBRUosRzs7U0FFU0YsVyxHQUFWLHFCQUFzQkssT0FBdEIsRUFBa0Q7QUFDOUNBLFdBQU8sQ0FBQ0MsU0FBUixDQUFrQkMsTUFBbEIsQ0FBeUJqQyxpQkFBekI7QUFDSCxHOztTQUVTMkIsVyxHQUFWLHFCQUFzQkksT0FBdEIsRUFBa0Q7QUFDOUNBLFdBQU8sQ0FBQ0MsU0FBUixDQUFrQkUsR0FBbEIsQ0FBc0JsQyxpQkFBdEI7QUFDSCxHOztTQUVTbUMsa0IsR0FBViw4QkFBd0M7QUFDcEMsUUFBTUMsT0FBTyxHQUFHLFlBQWhCO0FBQ0EsUUFBTUMsV0FBVyxHQUFHLEtBQUs5QixVQUFMLENBQWdCK0IsS0FBcEM7QUFFQSxXQUFPRixPQUFPLENBQUNHLElBQVIsQ0FBYUYsV0FBYixDQUFQO0FBQ0gsRzs7U0FFU1AsOEIsR0FBVix3Q0FBeUNGLEtBQXpDLEVBQTZEO0FBQ3pELFFBQU1PLGtCQUFrQixHQUFHLEtBQUtBLGtCQUFMLEVBQTNCOztBQUNBLFFBQUlBLGtCQUFrQixJQUFJLEtBQUtwQixzQkFBTCxDQUE0QnlCLE9BQXRELEVBQStEO0FBQzNELFdBQUt0Qix3QkFBTCxDQUE4QnVCLE1BQTlCO0FBRUE7QUFDSDs7QUFFRGIsU0FBSyxDQUFDYyxjQUFOO0FBQ0EsU0FBS2hCLFdBQUwsQ0FBaUIsS0FBS2IsaUJBQXRCO0FBQ0gsRzs7U0FjU2dCLFMsR0FBVixtQkFBb0JELEtBQXBCLEVBQXdDO0FBQ3BDLFNBQUtELFdBQUwsQ0FBaUIsS0FBS2YsZUFBdEI7QUFDQSxRQUFJK0IsTUFBTSxHQUFJZixLQUFLLENBQUNlLE1BQXBCO0FBQ0EsUUFBSUMsTUFBeUIsR0FBR0QsTUFBTSxDQUFDRSxFQUFQLENBQVVDLFFBQVYsQ0FBbUIsUUFBbkIsSUFBK0IsS0FBSzFCLFdBQXBDLEdBQWtELEtBQUtFLFlBQXZGOztBQUNBLFFBQUlzQixNQUFNLEtBQUtHLFNBQVgsSUFBd0JILE1BQU0sS0FBSyxJQUF2QyxFQUE2QztBQUN6QyxVQUFHQSxNQUFNLENBQUNOLEtBQVAsQ0FBYVUsTUFBYixHQUFzQixDQUF0QixJQUEyQkwsTUFBTSxDQUFDTCxLQUFQLENBQWFVLE1BQWIsR0FBc0IsQ0FBakQsSUFBc0QsQ0FBQ0wsTUFBTSxDQUFDTCxLQUFQLENBQWFXLFVBQWIsQ0FBd0JMLE1BQU0sQ0FBQ04sS0FBL0IsQ0FBMUQsRUFDSUssTUFBTSxDQUFDTCxLQUFQLEdBQWVNLE1BQU0sQ0FBQ04sS0FBUCxHQUFlSyxNQUFNLENBQUNMLEtBQXJDO0FBQ1A7QUFDSixHOzs7O3dCQXBCZ0M7QUFDN0IsYUFBTyxLQUFLWSxZQUFMLENBQWtCLFdBQWxCLENBQVA7QUFDSDs7O3dCQUUyQztBQUN4QyxhQUFPLEtBQUtBLFlBQUwsQ0FBa0IsdUJBQWxCLENBQVA7QUFDSDs7O3dCQUVxQztBQUNsQyxhQUFPLEtBQUtBLFlBQUwsQ0FBa0IsZ0JBQWxCLENBQVA7QUFDSDs7OztFQXhGaURDLCtEIiwiZmlsZSI6Ii4vanMveXZlc19kZWZhdWx0LjE1LmxlZ2FjeS5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBDb21wb25lbnQgZnJvbSAnU2hvcFVpL21vZGVscy9jb21wb25lbnQnO1xuXG5jb25zdCBISURERU5fQ0xBU1NfTkFNRSA9ICdpcy1oaWRkZW4nO1xuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBDdXN0b21lckNvbmZpcm1hdGlvbkZvcm0gZXh0ZW5kcyBDb21wb25lbnQge1xuICAgIHByb3RlY3RlZCBuZXdQYXNzd29yZElucHV0OiBIVE1MSW5wdXRFbGVtZW50O1xuICAgIHByb3RlY3RlZCBwaG9uZUlucHV0OiBIVE1MSW5wdXRFbGVtZW50O1xuICAgIHByb3RlY3RlZCBwYXNzd29yZEhpbnRIb2xkZXI6IEhUTUxFbGVtZW50O1xuICAgIHByb3RlY3RlZCBwaG9uZUhpbnRIb2xkZXI6IEhUTUxFbGVtZW50O1xuICAgIHByb3RlY3RlZCBwaG9uZUVycm9yTWVzc2FnZTogSFRNTEVsZW1lbnQ7XG4gICAgcHJvdGVjdGVkIHN1Ym1pdEJ1dHRvbjogSFRNTEJ1dHRvbkVsZW1lbnQ7XG4gICAgcHJvdGVjdGVkIGN1c3RvbWVyQ29uZmlybWF0aW9uRm9ybTogSFRNTEZvcm1FbGVtZW50O1xuICAgIHByb3RlY3RlZCB0aGlyZFBhcnR5UmVnaXN0cmF0aW9uOiBIVE1MSW5wdXRFbGVtZW50O1xuICAgIHByb3RlY3RlZCBwaG9uZVByZWZpeDogSFRNTFNlbGVjdEVsZW1lbnQ7XG4gICAgcHJvdGVjdGVkIG1vYmlsZVByZWZpeDogSFRNTFNlbGVjdEVsZW1lbnQ7XG4gICAgcHJvdGVjdGVkIG1vYmlsZUlucHV0OiBIVE1MSW5wdXRFbGVtZW50O1xuXG4gICAgcHJvdGVjdGVkIHJlYWR5Q2FsbGJhY2soKTogdm9pZCB7fVxuXG4gICAgcHJvdGVjdGVkIGluaXQoKTogdm9pZCB7XG4gICAgICAgIHRoaXMubmV3UGFzc3dvcmRJbnB1dCA9IDxIVE1MSW5wdXRFbGVtZW50PnRoaXMucXVlcnlTZWxlY3Rvcih0aGlzLm5ld1Bhc3N3b3JkU2VsZWN0b3IpO1xuICAgICAgICB0aGlzLnBob25lSW5wdXQgPSA8SFRNTElucHV0RWxlbWVudD50aGlzLnF1ZXJ5U2VsZWN0b3IodGhpcy5waG9uZVNlbGVjdG9yKTtcbiAgICAgICAgdGhpcy5wYXNzd29yZEhpbnRIb2xkZXIgPSA8SFRNTEVsZW1lbnQ+dGhpcy5nZXRFbGVtZW50c0J5Q2xhc3NOYW1lKGAke3RoaXMuanNOYW1lfV9fcGFzc3dvcmQtY3JpdGVyaWFgKVswXTtcbiAgICAgICAgdGhpcy5waG9uZUhpbnRIb2xkZXIgPSA8SFRNTEVsZW1lbnQ+dGhpcy5nZXRFbGVtZW50c0J5Q2xhc3NOYW1lKGAke3RoaXMuanNOYW1lfV9fcGhvbmUtY3JpdGVyaWFgKVswXTtcbiAgICAgICAgdGhpcy5waG9uZUVycm9yTWVzc2FnZSA9IDxIVE1MRWxlbWVudD50aGlzLmdldEVsZW1lbnRzQnlDbGFzc05hbWUoYCR7dGhpcy5qc05hbWV9X19waG9uZS1lcnJvcmApWzBdO1xuICAgICAgICB0aGlzLnN1Ym1pdEJ1dHRvbiA9IDxIVE1MQnV0dG9uRWxlbWVudD50aGlzLmdldEVsZW1lbnRzQnlDbGFzc05hbWUoYCR7dGhpcy5qc05hbWV9X19zdWJtaXQtYnV0dG9uYClbMF07XG4gICAgICAgIHRoaXMudGhpcmRQYXJ0eVJlZ2lzdHJhdGlvbiA9IDxIVE1MSW5wdXRFbGVtZW50PmRvY3VtZW50LmdldEVsZW1lbnRzQnlOYW1lKFwicmVnaXN0ZXJGb3JtW3RoaXJkX3BhcnR5X3JlZ2lzdHJhdGlvbl1cIilbMV07XG4gICAgICAgIHRoaXMuY3VzdG9tZXJDb25maXJtYXRpb25Gb3JtID0gPEhUTUxGb3JtRWxlbWVudD50aGlzLmdldEVsZW1lbnRzQnlDbGFzc05hbWUoYCR7dGhpcy5qc05hbWV9X19mb3JtYClbMF0uY2hpbGRyZW5bMF07XG4gICAgICAgIHRoaXMucGhvbmVQcmVmaXggPSA8SFRNTFNlbGVjdEVsZW1lbnQ+ZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJyZWdpc3RlckZvcm1fcGhvbmVfcHJlZml4XCIpO1xuICAgICAgICB0aGlzLm1vYmlsZVByZWZpeCA9IDxIVE1MU2VsZWN0RWxlbWVudD5kb2N1bWVudC5nZXRFbGVtZW50QnlJZChcInJlZ2lzdGVyRm9ybV9tb2JpbGVfcGhvbmVfcHJlZml4XCIpO1xuICAgICAgICB0aGlzLm1vYmlsZUlucHV0ID0gPEhUTUxJbnB1dEVsZW1lbnQ+ZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJyZWdpc3RlckZvcm1fcGhvbmVcIik7XG4gICAgICAgIHRoaXMubWFwRXZlbnRzKCk7XG4gICAgfVxuXG4gICAgcHJvdGVjdGVkIG1hcEV2ZW50cygpOiB2b2lkIHtcbiAgICAgICAgaWYgKHRoaXMubmV3UGFzc3dvcmRJbnB1dCkge1xuICAgICAgICAgICAgdGhpcy5uZXdQYXNzd29yZElucHV0LmFkZEV2ZW50TGlzdGVuZXIoJ2ZvY3VzJywgKCkgPT4gdGhpcy5zaG93RWxlbWVudCh0aGlzLnBhc3N3b3JkSGludEhvbGRlcikpO1xuICAgICAgICAgICAgdGhpcy5uZXdQYXNzd29yZElucHV0LmFkZEV2ZW50TGlzdGVuZXIoJ2JsdXInLCAoKSA9PiB0aGlzLmhpZGVFbGVtZW50KHRoaXMucGFzc3dvcmRIaW50SG9sZGVyKSk7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAodGhpcy5waG9uZUlucHV0KSB7XG4gICAgICAgICAgICB0aGlzLnBob25lSW5wdXQuYWRkRXZlbnRMaXN0ZW5lcignZm9jdXMnLCAoKSA9PiB0aGlzLnNob3dFbGVtZW50KHRoaXMucGhvbmVIaW50SG9sZGVyKSk7XG4gICAgICAgICAgICB0aGlzLnBob25lSW5wdXQuYWRkRXZlbnRMaXN0ZW5lcignYmx1cicsIChldmVudDogRXZlbnQpID0+IHRoaXMucGhvbmVCbHVyKGV2ZW50KSk7XG4gICAgICAgICAgICB0aGlzLnBob25lSW5wdXQuYWRkRXZlbnRMaXN0ZW5lcignaW5wdXQnLCAoKSA9PiB0aGlzLmhpZGVFbGVtZW50KHRoaXMucGhvbmVFcnJvck1lc3NhZ2UpKTtcbiAgICAgICAgfVxuICAgICAgICBpZiAodGhpcy5tb2JpbGVJbnB1dCkge1xuICAgICAgICAgICAgdGhpcy5tb2JpbGVJbnB1dC5hZGRFdmVudExpc3RlbmVyKCdibHVyJywgKGV2ZW50OiBFdmVudCkgPT4gdGhpcy5waG9uZUJsdXIoZXZlbnQpKTtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmICh0aGlzLnN1Ym1pdEJ1dHRvbikge1xuICAgICAgICAgICAgdGhpcy5zdWJtaXRCdXR0b24uYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCAoZXZlbnQ6IEV2ZW50KSA9PiB0aGlzLnN1Ym1pdEN1c3RvbWVyQ29uZmlybWF0aW9uRm9ybShldmVudCkpO1xuICAgICAgICB9XG5cbiAgICB9XG5cbiAgICBwcm90ZWN0ZWQgc2hvd0VsZW1lbnQoZWxlbWVudDogSFRNTEVsZW1lbnQpOiB2b2lkIHtcbiAgICAgICAgZWxlbWVudC5jbGFzc0xpc3QucmVtb3ZlKEhJRERFTl9DTEFTU19OQU1FKTtcbiAgICB9XG5cbiAgICBwcm90ZWN0ZWQgaGlkZUVsZW1lbnQoZWxlbWVudDogSFRNTEVsZW1lbnQpOiB2b2lkIHtcbiAgICAgICAgZWxlbWVudC5jbGFzc0xpc3QuYWRkKEhJRERFTl9DTEFTU19OQU1FKTtcbiAgICB9XG5cbiAgICBwcm90ZWN0ZWQgaXNQaG9uZU51bWJlclZhbGlkKCk6IGJvb2xlYW4ge1xuICAgICAgICBjb25zdCBwYXR0ZXJuID0gL15bKyAwLTldKyQvO1xuICAgICAgICBjb25zdCBwaG9uZU51bWJlciA9IHRoaXMucGhvbmVJbnB1dC52YWx1ZTtcblxuICAgICAgICByZXR1cm4gcGF0dGVybi50ZXN0KHBob25lTnVtYmVyKTtcbiAgICB9XG5cbiAgICBwcm90ZWN0ZWQgc3VibWl0Q3VzdG9tZXJDb25maXJtYXRpb25Gb3JtKGV2ZW50OiBFdmVudCk6IHZvaWQge1xuICAgICAgICBjb25zdCBpc1Bob25lTnVtYmVyVmFsaWQgPSB0aGlzLmlzUGhvbmVOdW1iZXJWYWxpZCgpO1xuICAgICAgICBpZiAoaXNQaG9uZU51bWJlclZhbGlkICYmIHRoaXMudGhpcmRQYXJ0eVJlZ2lzdHJhdGlvbi5jaGVja2VkKSB7XG4gICAgICAgICAgICB0aGlzLmN1c3RvbWVyQ29uZmlybWF0aW9uRm9ybS5zdWJtaXQoKTtcblxuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG5cbiAgICAgICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcbiAgICAgICAgdGhpcy5zaG93RWxlbWVudCh0aGlzLnBob25lRXJyb3JNZXNzYWdlKTtcbiAgICB9XG5cbiAgICBwcm90ZWN0ZWQgZ2V0IGZvcm1OYW1lKCk6IHN0cmluZyB7XG4gICAgICAgIHJldHVybiB0aGlzLmdldEF0dHJpYnV0ZSgnZm9ybS1uYW1lJyk7XG4gICAgfVxuXG4gICAgcHJvdGVjdGVkIGdldCBuZXdQYXNzd29yZFNlbGVjdG9yKCk6IHN0cmluZyB7XG4gICAgICAgIHJldHVybiB0aGlzLmdldEF0dHJpYnV0ZSgnbmV3LXBhc3N3b3JkLXNlbGVjdG9yJyk7XG4gICAgfVxuXG4gICAgcHJvdGVjdGVkIGdldCBwaG9uZVNlbGVjdG9yKCk6IHN0cmluZyB7XG4gICAgICAgIHJldHVybiB0aGlzLmdldEF0dHJpYnV0ZSgncGhvbmUtc2VsZWN0b3InKTtcbiAgICB9XG5cbiAgICBwcm90ZWN0ZWQgcGhvbmVCbHVyKGV2ZW50OiBFdmVudCk6IHZvaWQge1xuICAgICAgICB0aGlzLmhpZGVFbGVtZW50KHRoaXMucGhvbmVIaW50SG9sZGVyKTtcbiAgICAgICAgbGV0IHRhcmdldCA9IChldmVudC50YXJnZXQgYXMgSFRNTElucHV0RWxlbWVudCk7XG4gICAgICAgIGxldCBwcmVmaXg6IEhUTUxTZWxlY3RFbGVtZW50ID0gdGFyZ2V0LmlkLmluY2x1ZGVzKFwibW9iaWxlXCIpID8gdGhpcy5waG9uZVByZWZpeCA6IHRoaXMubW9iaWxlUHJlZml4O1xuICAgICAgICBpZiAocHJlZml4ICE9PSB1bmRlZmluZWQgJiYgcHJlZml4ICE9PSBudWxsKSB7XG4gICAgICAgICAgICBpZihwcmVmaXgudmFsdWUubGVuZ3RoID4gMCAmJiB0YXJnZXQudmFsdWUubGVuZ3RoID4gMCAmJiAhdGFyZ2V0LnZhbHVlLnN0YXJ0c1dpdGgocHJlZml4LnZhbHVlKSlcbiAgICAgICAgICAgICAgICB0YXJnZXQudmFsdWUgPSBwcmVmaXgudmFsdWUgKyB0YXJnZXQudmFsdWU7XG4gICAgICAgIH1cbiAgICB9XG59XG4iXSwic291cmNlUm9vdCI6IiJ9