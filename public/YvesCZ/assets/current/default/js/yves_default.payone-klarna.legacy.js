(window["webpackJsonp_yves_default"] = window["webpackJsonp_yves_default"] || []).push([["payone-klarna"],{

/***/ "./vendor/spryker-eco/payone/src/SprykerEco/Yves/Payone/Theme/default/components/molecules/payone-klarna/payone-klarna.ts":
/*!********************************************************************************************************************************!*\
  !*** ./vendor/spryker-eco/payone/src/SprykerEco/Yves/Payone/Theme/default/components/molecules/payone-klarna/payone-klarna.ts ***!
  \********************************************************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return PayoneKlarna; });
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

/* tslint:disable: max-file-line-count */

var TOKEN_CONTAINER_ID = 'paymentForm_payoneKlarna_payMethodToken';
var IS_VALID_PARAM = 'is_valid';
var GET_TOKEN_URL = '/payone/get-token';
var CONTAINER_ID = '#klarna_container';

var PayoneKlarna = /*#__PURE__*/function (_Component) {
  _babel_runtime_helpers_inheritsLoose__WEBPACK_IMPORTED_MODULE_4___default()(PayoneKlarna, _Component);

  var _super = _createSuper(PayoneKlarna);

  function PayoneKlarna() {
    var _this;

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this = _Component.call.apply(_Component, [this].concat(args)) || this;

    _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_5___default()(_babel_runtime_helpers_assertThisInitialized__WEBPACK_IMPORTED_MODULE_1___default()(_this), "scriptLoader", void 0);

    _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_5___default()(_babel_runtime_helpers_assertThisInitialized__WEBPACK_IMPORTED_MODULE_1___default()(_this), "selectField", void 0);

    _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_5___default()(_babel_runtime_helpers_assertThisInitialized__WEBPACK_IMPORTED_MODULE_1___default()(_this), "availablePayment", void 0);

    _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_5___default()(_babel_runtime_helpers_assertThisInitialized__WEBPACK_IMPORTED_MODULE_1___default()(_this), "availablePaymentArray", []);

    _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_5___default()(_babel_runtime_helpers_assertThisInitialized__WEBPACK_IMPORTED_MODULE_1___default()(_this), "currentPaymentMethodCategory", void 0);

    _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_5___default()(_babel_runtime_helpers_assertThisInitialized__WEBPACK_IMPORTED_MODULE_1___default()(_this), "currentPaymentCompanyToken", void 0);

    _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_5___default()(_babel_runtime_helpers_assertThisInitialized__WEBPACK_IMPORTED_MODULE_1___default()(_this), "allKlarnaPayMethods", void 0);

    _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_5___default()(_babel_runtime_helpers_assertThisInitialized__WEBPACK_IMPORTED_MODULE_1___default()(_this), "addressData", {
      'given_name': _this.givenName,
      'family_name': _this.familyName,
      'email': _this.email,
      'street_address': _this.streetAddress,
      'postal_code': _this.postalCode,
      'city': _this.city,
      'country': _this.country,
      'phone': _this.phone
    });

    return _this;
  }

  var _proto = PayoneKlarna.prototype;

  _proto.readyCallback = function readyCallback() {};

  _proto.init = function init() {
    this.scriptLoader = this.getElementsByClassName(this.jsName + "__script-loader")[0];
    this.selectField = this.getElementsByClassName(this.jsName + "__select-field")[0];
    this.allKlarnaPayMethods = JSON.parse(this.klarnaPayMethods());
    this.mapEvents();
  };

  _proto.mapEvents = function mapEvents() {
    this.mapScriptLoadEvent();
    this.mapSelectChangeEvent();
  };

  _proto.mapScriptLoadEvent = function mapScriptLoadEvent() {
    var _this2 = this;

    this.scriptLoader.addEventListener('scriptload', function () {
      return _this2.getAvailablePaymentMethods();
    });
  };

  _proto.mapSelectChangeEvent = function mapSelectChangeEvent() {
    var _this3 = this;

    this.selectField.addEventListener('change', function () {
      return _this3.selectPaymentMethod();
    });
  };

  _proto.getAvailablePaymentMethods = function getAvailablePaymentMethods() {
    var _this4 = this;

    Array.from(this.selectField.options).forEach(function (option) {
      if (!option.value) {
        return;
      }

      var formData = new FormData();
      formData.append('pay_method', option.value);
      fetch(GET_TOKEN_URL, {
        method: 'POST',
        body: formData
      }).then(function (response) {
        return response.json();
      }).then(function (parsedResponse) {
        if (!parsedResponse[IS_VALID_PARAM]) {
          return;
        }

        _this4.availablePayment = {
          'pay_method': option.value,
          'client_token': parsedResponse.client_token
        };

        _this4.availablePaymentArray.push(_this4.availablePayment);

        option.removeAttribute('disabled');
      }).catch(function (error) {
        console.error(error.message);
      });
    });
  };

  _proto.selectPaymentMethod = function selectPaymentMethod() {
    var _this5 = this;

    var paymentMethod = this.availablePaymentArray.find(function (payment) {
      return payment.pay_method === _this5.selectField.value;
    });
    this.loadKlarna(paymentMethod);
  };

  _proto.loadKlarna = function loadKlarna(paymentData) {
    var _this6 = this;

    this.toggleSelectFieldDisable(true);
    Klarna.Payments.init({
      client_token: paymentData.client_token
    });
    Klarna.Payments.load({
      container: CONTAINER_ID,
      payment_method_category: this.allKlarnaPayMethods[paymentData.pay_method]
    }, function (response) {
      _this6.toggleSelectFieldDisable(false);

      Klarna.Payments.authorize({
        payment_method_category: _this6.allKlarnaPayMethods[paymentData.pay_method]
      }, {
        billing_address: _this6.addressData,
        customer: {
          date_of_birth: _this6.dateOfBirth
        }
      }, function (response) {
        var tokenContainer = document.getElementById(TOKEN_CONTAINER_ID);
        tokenContainer.value = response.authorization_token;
      });
    });
  };

  _proto.toggleSelectFieldDisable = function toggleSelectFieldDisable(isSelectDisabled) {
    this.selectField.disabled = isSelectDisabled;
  };

  _proto.klarnaPayMethods = function klarnaPayMethods() {
    return this.getAttribute('klarna-pay-methods');
  };

  _babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_0___default()(PayoneKlarna, [{
    key: "givenName",
    get: function get() {
      return this.getAttribute('given-name');
    }
  }, {
    key: "familyName",
    get: function get() {
      return this.getAttribute('family-name');
    }
  }, {
    key: "email",
    get: function get() {
      return this.getAttribute('email');
    }
  }, {
    key: "streetAddress",
    get: function get() {
      return this.getAttribute('street-address');
    }
  }, {
    key: "postalCode",
    get: function get() {
      return this.getAttribute('postal-code');
    }
  }, {
    key: "city",
    get: function get() {
      return this.getAttribute('city');
    }
  }, {
    key: "country",
    get: function get() {
      return this.getAttribute('country');
    }
  }, {
    key: "phone",
    get: function get() {
      return this.getAttribute('phone');
    }
  }, {
    key: "dateOfBirth",
    get: function get() {
      return this.getAttribute('date-of-birth');
    }
  }]);

  return PayoneKlarna;
}(ShopUi_models_component__WEBPACK_IMPORTED_MODULE_6__["default"]);



/***/ })

}]);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vLi92ZW5kb3Ivc3ByeWtlci1lY28vcGF5b25lL3NyYy9TcHJ5a2VyRWNvL1l2ZXMvUGF5b25lL1RoZW1lL2RlZmF1bHQvY29tcG9uZW50cy9tb2xlY3VsZXMvcGF5b25lLWtsYXJuYS9wYXlvbmUta2xhcm5hLnRzIl0sIm5hbWVzIjpbIlRPS0VOX0NPTlRBSU5FUl9JRCIsIklTX1ZBTElEX1BBUkFNIiwiR0VUX1RPS0VOX1VSTCIsIkNPTlRBSU5FUl9JRCIsIlBheW9uZUtsYXJuYSIsImdpdmVuTmFtZSIsImZhbWlseU5hbWUiLCJlbWFpbCIsInN0cmVldEFkZHJlc3MiLCJwb3N0YWxDb2RlIiwiY2l0eSIsImNvdW50cnkiLCJwaG9uZSIsInJlYWR5Q2FsbGJhY2siLCJpbml0Iiwic2NyaXB0TG9hZGVyIiwiZ2V0RWxlbWVudHNCeUNsYXNzTmFtZSIsImpzTmFtZSIsInNlbGVjdEZpZWxkIiwiYWxsS2xhcm5hUGF5TWV0aG9kcyIsIkpTT04iLCJwYXJzZSIsImtsYXJuYVBheU1ldGhvZHMiLCJtYXBFdmVudHMiLCJtYXBTY3JpcHRMb2FkRXZlbnQiLCJtYXBTZWxlY3RDaGFuZ2VFdmVudCIsImFkZEV2ZW50TGlzdGVuZXIiLCJnZXRBdmFpbGFibGVQYXltZW50TWV0aG9kcyIsInNlbGVjdFBheW1lbnRNZXRob2QiLCJBcnJheSIsImZyb20iLCJvcHRpb25zIiwiZm9yRWFjaCIsIm9wdGlvbiIsInZhbHVlIiwiZm9ybURhdGEiLCJGb3JtRGF0YSIsImFwcGVuZCIsImZldGNoIiwibWV0aG9kIiwiYm9keSIsInRoZW4iLCJyZXNwb25zZSIsImpzb24iLCJwYXJzZWRSZXNwb25zZSIsImF2YWlsYWJsZVBheW1lbnQiLCJjbGllbnRfdG9rZW4iLCJhdmFpbGFibGVQYXltZW50QXJyYXkiLCJwdXNoIiwicmVtb3ZlQXR0cmlidXRlIiwiY2F0Y2giLCJlcnJvciIsImNvbnNvbGUiLCJtZXNzYWdlIiwicGF5bWVudE1ldGhvZCIsImZpbmQiLCJwYXltZW50IiwicGF5X21ldGhvZCIsImxvYWRLbGFybmEiLCJwYXltZW50RGF0YSIsInRvZ2dsZVNlbGVjdEZpZWxkRGlzYWJsZSIsIktsYXJuYSIsIlBheW1lbnRzIiwibG9hZCIsImNvbnRhaW5lciIsInBheW1lbnRfbWV0aG9kX2NhdGVnb3J5IiwiYXV0aG9yaXplIiwiYmlsbGluZ19hZGRyZXNzIiwiYWRkcmVzc0RhdGEiLCJjdXN0b21lciIsImRhdGVfb2ZfYmlydGgiLCJkYXRlT2ZCaXJ0aCIsInRva2VuQ29udGFpbmVyIiwiZG9jdW1lbnQiLCJnZXRFbGVtZW50QnlJZCIsImF1dGhvcml6YXRpb25fdG9rZW4iLCJpc1NlbGVjdERpc2FibGVkIiwiZGlzYWJsZWQiLCJnZXRBdHRyaWJ1dGUiLCJDb21wb25lbnQiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUFBO0FBRUE7QUFJQSxJQUFNQSxrQkFBa0IsR0FBRyx5Q0FBM0I7QUFDQSxJQUFNQyxjQUFjLEdBQUcsVUFBdkI7QUFDQSxJQUFNQyxhQUFhLEdBQUcsbUJBQXRCO0FBQ0EsSUFBTUMsWUFBWSxHQUFHLG1CQUFyQjs7SUF3QnFCQyxZOzs7Ozs7Ozs7Ozs7Ozs7Ozs7OztzTUFJZ0MsRTs7Ozs7Ozs7NExBSVo7QUFDakMsb0JBQWMsTUFBS0MsU0FEYztBQUVqQyxxQkFBZSxNQUFLQyxVQUZhO0FBR2pDLGVBQVMsTUFBS0MsS0FIbUI7QUFJakMsd0JBQWtCLE1BQUtDLGFBSlU7QUFLakMscUJBQWUsTUFBS0MsVUFMYTtBQU1qQyxjQUFRLE1BQUtDLElBTm9CO0FBT2pDLGlCQUFXLE1BQUtDLE9BUGlCO0FBUWpDLGVBQVMsTUFBS0M7QUFSbUIsSzs7Ozs7OztTQVczQkMsYSxHQUFWLHlCQUFnQyxDQUFFLEM7O1NBRXhCQyxJLEdBQVYsZ0JBQXVCO0FBQ25CLFNBQUtDLFlBQUwsR0FBa0MsS0FBS0Msc0JBQUwsQ0FBK0IsS0FBS0MsTUFBcEMsc0JBQTZELENBQTdELENBQWxDO0FBQ0EsU0FBS0Ms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Ozs7d0JBRStCO0FBQzVCLGFBQU8sS0FBS0EsWUFBTCxDQUFrQixTQUFsQixDQUFQO0FBQ0g7Ozt3QkFFNkI7QUFDMUIsYUFBTyxLQUFLQSxZQUFMLENBQWtCLE9BQWxCLENBQVA7QUFDSDs7O3dCQUVtQztBQUNoQyxhQUFPLEtBQUtBLFlBQUwsQ0FBa0IsZUFBbEIsQ0FBUDtBQUNIOzs7O0VBMUlxQ0MsK0QiLCJmaWxlIjoiLi9qcy95dmVzX2RlZmF1bHQucGF5b25lLWtsYXJuYS5sZWdhY3kuanMiLCJzb3VyY2VzQ29udGVudCI6WyIvKiB0c2xpbnQ6ZGlzYWJsZTogbWF4LWZpbGUtbGluZS1jb3VudCAqL1xuXG5pbXBvcnQgQ29tcG9uZW50IGZyb20gJ1Nob3BVaS9tb2RlbHMvY29tcG9uZW50JztcbmltcG9ydCBTY3JpcHRMb2FkZXIgZnJvbSAnU2hvcFVpL2NvbXBvbmVudHMvbW9sZWN1bGVzL3NjcmlwdC1sb2FkZXIvc2NyaXB0LWxvYWRlcic7XG5cbmRlY2xhcmUgY29uc3QgS2xhcm5hO1xuY29uc3QgVE9LRU5fQ09OVEFJTkVSX0lEID0gJ3BheW1lbnRGb3JtX3BheW9uZUtsYXJuYV9wYXlNZXRob2RUb2tlbic7XG5jb25zdCBJU19WQUxJRF9QQVJBTSA9ICdpc192YWxpZCc7XG5jb25zdCBHRVRfVE9LRU5fVVJMID0gJy9wYXlvbmUvZ2V0LXRva2VuJztcbmNvbnN0IENPTlRBSU5FUl9JRCA9ICcja2xhcm5hX2NvbnRhaW5lcic7XG5cbmludGVyZmFjZSBQYXltZW50RGF0YSB7XG4gICAgJ2NsaWVudF90b2tlbic6IHN0cmluZztcbiAgICAncGF5X21ldGhvZCc6IHN0cmluZztcbn1cblxuaW50ZXJmYWNlIEtsYXJuYVBheU1ldGhvZHMge1xuICAgIEtERDogc3RyaW5nO1xuICAgIEtJUzogc3RyaW5nO1xuICAgIEtJVjogc3RyaW5nO1xufVxuXG5pbnRlcmZhY2UgQWRkcmVzc0RhdGEge1xuICAgICdnaXZlbl9uYW1lJzogc3RyaW5nO1xuICAgICdmYW1pbHlfbmFtZSc6IHN0cmluZztcbiAgICAnZW1haWwnOiBzdHJpbmc7XG4gICAgJ3N0cmVldF9hZGRyZXNzJzogc3RyaW5nO1xuICAgICdwb3N0YWxfY29kZSc6IHN0cmluZztcbiAgICAnY2l0eSc6IHN0cmluZztcbiAgICAnY291bnRyeSc6IHN0cmluZztcbiAgICAncGhvbmUnOiBzdHJpbmc7XG59XG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIFBheW9uZUtsYXJuYSBleHRlbmRzIENvbXBvbmVudCB7XG4gICAgcHJvdGVjdGVkIHNjcmlwdExvYWRlcjogU2NyaXB0TG9hZGVyO1xuICAgIHByb3RlY3RlZCBzZWxlY3RGaWVsZDogSFRNTFNlbGVjdEVsZW1lbnQ7XG4gICAgcHJvdGVjdGVkIGF2YWlsYWJsZVBheW1lbnQ6IFBheW1lbnREYXRhO1xuICAgIHByb3RlY3RlZCBhdmFpbGFibGVQYXltZW50QXJyYXk6IFBheW1lbnREYXRhW10gPSBbXTtcbiAgICBwcm90ZWN0ZWQgY3VycmVudFBheW1lbnRNZXRob2RDYXRlZ29yeTogc3RyaW5nO1xuICAgIHByb3RlY3RlZCBjdXJyZW50UGF5bWVudENvbXBhbnlUb2tlbjogc3RyaW5nO1xuICAgIHByb3RlY3RlZCBhbGxLbGFybmFQYXlNZXRob2RzOiBLbGFybmFQYXlNZXRob2RzO1xuICAgIHByb3RlY3RlZCBhZGRyZXNzRGF0YTogQWRkcmVzc0RhdGEgPSB7XG4gICAgICAgICdnaXZlbl9uYW1lJzogdGhpcy5naXZlbk5hbWUsXG4gICAgICAgICdmYW1pbHlfbmFtZSc6IHRoaXMuZmFtaWx5TmFtZSxcbiAgICAgICAgJ2VtYWlsJzogdGhpcy5lbWFpbCxcbiAgICAgICAgJ3N0cmVldF9hZGRyZXNzJzogdGhpcy5zdHJlZXRBZGRyZXNzLFxuICAgICAgICAncG9zdGFsX2NvZGUnOiB0aGlzLnBvc3RhbENvZGUsXG4gICAgICAgICdjaXR5JzogdGhpcy5jaXR5LFxuICAgICAgICAnY291bnRyeSc6IHRoaXMuY291bnRyeSxcbiAgICAgICAgJ3Bob25lJzogdGhpcy5waG9uZSxcbiAgICB9XG5cbiAgICBwcm90ZWN0ZWQgcmVhZHlDYWxsYmFjaygpOiB2b2lkIHt9XG5cbiAgICBwcm90ZWN0ZWQgaW5pdCgpOiB2b2lkIHtcbiAgICAgICAgdGhpcy5zY3JpcHRMb2FkZXIgPSA8U2NyaXB0TG9hZGVyPnRoaXMuZ2V0RWxlbWVudHNCeUNsYXNzTmFtZShgJHt0aGlzLmpzTmFtZX1fX3NjcmlwdC1sb2FkZXJgKVswXTtcbiAgICAgICAgdGhpcy5zZWxlY3RGaWVsZCA9IDxIVE1MU2VsZWN0RWxlbWVudD50aGlzLmdldEVsZW1lbnRzQnlDbGFzc05hbWUoYCR7dGhpcy5qc05hbWV9X19zZWxlY3QtZmllbGRgKVswXTtcbiAgICAgICAgdGhpcy5hbGxLbGFybmFQYXlNZXRob2RzID0gPEtsYXJuYVBheU1ldGhvZHM+SlNPTi5wYXJzZSh0aGlzLmtsYXJuYVBheU1ldGhvZHMoKSk7XG5cbiAgICAgICAgdGhpcy5tYXBFdmVudHMoKTtcbiAgICB9XG5cbiAgICBwcm90ZWN0ZWQgbWFwRXZlbnRzKCk6IHZvaWQge1xuICAgICAgICB0aGlzLm1hcFNjcmlwdExvYWRFdmVudCgpO1xuICAgICAgICB0aGlzLm1hcFNlbGVjdENoYW5nZUV2ZW50KCk7XG4gICAgfVxuXG4gICAgcHJvdGVjdGVkIG1hcFNjcmlwdExvYWRFdmVudCgpOiB2b2lkIHtcbiAgICAgICAgdGhpcy5zY3JpcHRMb2FkZXIuYWRkRXZlbnRMaXN0ZW5lcignc2NyaXB0bG9hZCcsICgpID0+IHRoaXMuZ2V0QXZhaWxhYmxlUGF5bWVudE1ldGhvZHMoKSk7XG4gICAgfVxuXG4gICAgcHJvdGVjdGVkIG1hcFNlbGVjdENoYW5nZUV2ZW50KCk6IHZvaWQge1xuICAgICAgICB0aGlzLnNlbGVjdEZpZWxkLmFkZEV2ZW50TGlzdGVuZXIoJ2NoYW5nZScsICgpID0+IHRoaXMuc2VsZWN0UGF5bWVudE1ldGhvZCgpKTtcbiAgICB9XG5cbiAgICBwcm90ZWN0ZWQgZ2V0QXZhaWxhYmxlUGF5bWVudE1ldGhvZHMoKTogdm9pZCB7XG4gICAgICAgIEFycmF5LmZyb20odGhpcy5zZWxlY3RGaWVsZC5vcHRpb25zKS5mb3JFYWNoKG9wdGlvbiA9PiB7XG4gICAgICAgICAgICBpZiAoIW9wdGlvbi52YWx1ZSkge1xuICAgICAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgY29uc3QgZm9ybURhdGEgPSBuZXcgRm9ybURhdGEoKTtcbiAgICAgICAgICAgIGZvcm1EYXRhLmFwcGVuZCgncGF5X21ldGhvZCcsIG9wdGlvbi52YWx1ZSk7XG5cbiAgICAgICAgICAgIGZldGNoKEdFVF9UT0tFTl9VUkwsIHttZXRob2Q6ICdQT1NUJywgYm9keTogZm9ybURhdGF9KVxuICAgICAgICAgICAgICAgIC50aGVuKHJlc3BvbnNlID0+IHJlc3BvbnNlLmpzb24oKSlcbiAgICAgICAgICAgICAgICAudGhlbihwYXJzZWRSZXNwb25zZSA9PiB7XG4gICAgICAgICAgICAgICAgICAgIGlmICghcGFyc2VkUmVzcG9uc2VbSVNfVkFMSURfUEFSQU1dKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgICAgICB0aGlzLmF2YWlsYWJsZVBheW1lbnQgPSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAncGF5X21ldGhvZCc6IG9wdGlvbi52YWx1ZSxcbiAgICAgICAgICAgICAgICAgICAgICAgICdjbGllbnRfdG9rZW4nOiBwYXJzZWRSZXNwb25zZS5jbGllbnRfdG9rZW4sXG4gICAgICAgICAgICAgICAgICAgIH07XG5cbiAgICAgICAgICAgICAgICAgICAgdGhpcy5hdmFpbGFibGVQYXltZW50QXJyYXkucHVzaCh0aGlzLmF2YWlsYWJsZVBheW1lbnQpO1xuICAgICAgICAgICAgICAgICAgICBvcHRpb24ucmVtb3ZlQXR0cmlidXRlKCdkaXNhYmxlZCcpO1xuICAgICAgICAgICAgICAgIH0pXG4gICAgICAgICAgICAgICAgLmNhdGNoKChlcnJvcjogRXJyb3IpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgY29uc29sZS5lcnJvcihlcnJvci5tZXNzYWdlKTtcbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgfSk7XG4gICAgfVxuXG4gICAgcHJvdGVjdGVkIHNlbGVjdFBheW1lbnRNZXRob2QoKTogdm9pZCB7XG4gICAgICAgIGNvbnN0IHBheW1lbnRNZXRob2QgPSB0aGlzLmF2YWlsYWJsZVBheW1lbnRBcnJheS5maW5kKHBheW1lbnQgPT4gcGF5bWVudC5wYXlfbWV0aG9kID09PSB0aGlzLnNlbGVjdEZpZWxkLnZhbHVlKTtcbiAgICAgICAgdGhpcy5sb2FkS2xhcm5hKHBheW1lbnRNZXRob2QpO1xuICAgIH1cblxuICAgIHByb3RlY3RlZCBsb2FkS2xhcm5hKHBheW1lbnREYXRhOiBQYXltZW50RGF0YSk6IHZvaWQge1xuICAgICAgICB0aGlzLnRvZ2dsZVNlbGVjdEZpZWxkRGlzYWJsZSh0cnVlKTtcblxuICAgICAgICBLbGFybmEuUGF5bWVudHMuaW5pdCh7IGNsaWVudF90b2tlbjogcGF5bWVudERhdGEuY2xpZW50X3Rva2VuIH0pO1xuICAgICAgICBLbGFybmEuUGF5bWVudHMubG9hZCh7XG4gICAgICAgICAgICBjb250YWluZXI6IENPTlRBSU5FUl9JRCxcbiAgICAgICAgICAgIHBheW1lbnRfbWV0aG9kX2NhdGVnb3J5OiB0aGlzLmFsbEtsYXJuYVBheU1ldGhvZHNbcGF5bWVudERhdGEucGF5X21ldGhvZF0sXG4gICAgICAgIH0sICByZXNwb25zZSA9PiB7XG4gICAgICAgICAgICB0aGlzLnRvZ2dsZVNlbGVjdEZpZWxkRGlzYWJsZShmYWxzZSk7XG4gICAgICAgICAgICBLbGFybmEuUGF5bWVudHMuYXV0aG9yaXplKHtcbiAgICAgICAgICAgICAgICBwYXltZW50X21ldGhvZF9jYXRlZ29yeTogdGhpcy5hbGxLbGFybmFQYXlNZXRob2RzW3BheW1lbnREYXRhLnBheV9tZXRob2RdLFxuICAgICAgICAgICAgfSwge1xuICAgICAgICAgICAgICAgIGJpbGxpbmdfYWRkcmVzczogdGhpcy5hZGRyZXNzRGF0YSxcbiAgICAgICAgICAgICAgICBjdXN0b21lcjoge1xuICAgICAgICAgICAgICAgICAgICBkYXRlX29mX2JpcnRoOiB0aGlzLmRhdGVPZkJpcnRoLFxuICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICB9LCByZXNwb25zZSA9PiB7XG4gICAgICAgICAgICAgICAgY29uc3QgdG9rZW5Db250YWluZXIgPSA8SFRNTElucHV0RWxlbWVudD5kb2N1bWVudC5nZXRFbGVtZW50QnlJZChUT0tFTl9DT05UQUlORVJfSUQpO1xuICAgICAgICAgICAgICAgIHRva2VuQ29udGFpbmVyLnZhbHVlID0gcmVzcG9uc2UuYXV0aG9yaXphdGlvbl90b2tlbjtcbiAgICAgICAgICAgIH0pXG4gICAgICAgIH0pXG4gICAgfVxuXG4gICAgcHJvdGVjdGVkIHRvZ2dsZVNlbGVjdEZpZWxkRGlzYWJsZShpc1NlbGVjdERpc2FibGVkOiBib29sZWFuKTogdm9pZCB7XG4gICAgICAgIHRoaXMuc2VsZWN0RmllbGQuZGlzYWJsZWQgPSBpc1NlbGVjdERpc2FibGVkO1xuICAgIH1cblxuICAgIHByb3RlY3RlZCBnZXQgZ2l2ZW5OYW1lKCk6IHN0cmluZyB7XG4gICAgICAgIHJldHVybiB0aGlzLmdldEF0dHJpYnV0ZSgnZ2l2ZW4tbmFtZScpO1xuICAgIH1cblxuICAgIHByb3RlY3RlZCBnZXQgZmFtaWx5TmFtZSgpOiBzdHJpbmcge1xuICAgICAgICByZXR1cm4gdGhpcy5nZXRBdHRyaWJ1dGUoJ2ZhbWlseS1uYW1lJyk7XG4gICAgfVxuXG4gICAgcHJvdGVjdGVkIGdldCBlbWFpbCgpOiBzdHJpbmcge1xuICAgICAgICByZXR1cm4gdGhpcy5nZXRBdHRyaWJ1dGUoJ2VtYWlsJyk7XG4gICAgfVxuXG4gICAgcHJvdGVjdGVkIGdldCBzdHJlZXRBZGRyZXNzKCk6IHN0cmluZyB7XG4gICAgICAgIHJldHVybiB0aGlzLmdldEF0dHJpYnV0ZSgnc3RyZWV0LWFkZHJlc3MnKTtcbiAgICB9XG5cbiAgICBwcm90ZWN0ZWQgZ2V0IHBvc3RhbENvZGUoKTogc3RyaW5nIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuZ2V0QXR0cmlidXRlKCdwb3N0YWwtY29kZScpO1xuICAgIH1cblxuICAgIHByb3RlY3RlZCBnZXQgY2l0eSgpOiBzdHJpbmcge1xuICAgICAgICByZXR1cm4gdGhpcy5nZXRBdHRyaWJ1dGUoJ2NpdHknKTtcbiAgICB9XG5cbiAgICBwcm90ZWN0ZWQgZ2V0IGNvdW50cnkoKTogc3RyaW5nIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuZ2V0QXR0cmlidXRlKCdjb3VudHJ5Jyk7XG4gICAgfVxuXG4gICAgcHJvdGVjdGVkIGdldCBwaG9uZSgpOiBzdHJpbmcge1xuICAgICAgICByZXR1cm4gdGhpcy5nZXRBdHRyaWJ1dGUoJ3Bob25lJyk7XG4gICAgfVxuXG4gICAgcHJvdGVjdGVkIGdldCBkYXRlT2ZCaXJ0aCgpOiBzdHJpbmcge1xuICAgICAgICByZXR1cm4gdGhpcy5nZXRBdHRyaWJ1dGUoJ2RhdGUtb2YtYmlydGgnKTtcbiAgICB9XG5cbiAgICBwcm90ZWN0ZWQga2xhcm5hUGF5TWV0aG9kcygpOiBzdHJpbmcge1xuICAgICAgICByZXR1cm4gdGhpcy5nZXRBdHRyaWJ1dGUoJ2tsYXJuYS1wYXktbWV0aG9kcycpO1xuICAgIH1cbn1cbiJdLCJzb3VyY2VSb290IjoiIn0=