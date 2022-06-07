(window["webpackJsonp_yves_default"] = window["webpackJsonp_yves_default"] || []).push([["payone-direct-debit"],{

/***/ "./vendor/spryker-eco/payone/src/SprykerEco/Yves/Payone/Theme/default/components/molecules/payone-direct-debit/payone-direct-debit.ts":
/*!********************************************************************************************************************************************!*\
  !*** ./vendor/spryker-eco/payone/src/SprykerEco/Yves/Payone/Theme/default/components/molecules/payone-direct-debit/payone-direct-debit.ts ***!
  \********************************************************************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return PayoneDirectDebit; });
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


var BANK_ACCOUNT_MODE_BBAN = 'BBAN';

var PayoneDirectDebit = /*#__PURE__*/function (_Component) {
  _babel_runtime_helpers_inheritsLoose__WEBPACK_IMPORTED_MODULE_4___default()(PayoneDirectDebit, _Component);

  var _super = _createSuper(PayoneDirectDebit);

  function PayoneDirectDebit() {
    var _this;

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this = _Component.call.apply(_Component, [this].concat(args)) || this;

    _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_5___default()(_babel_runtime_helpers_assertThisInitialized__WEBPACK_IMPORTED_MODULE_1___default()(_this), "form", void 0);

    _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_5___default()(_babel_runtime_helpers_assertThisInitialized__WEBPACK_IMPORTED_MODULE_1___default()(_this), "bankAccountModeInputs", void 0);

    _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_5___default()(_babel_runtime_helpers_assertThisInitialized__WEBPACK_IMPORTED_MODULE_1___default()(_this), "bankAccountInput", void 0);

    _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_5___default()(_babel_runtime_helpers_assertThisInitialized__WEBPACK_IMPORTED_MODULE_1___default()(_this), "bankCodeInput", void 0);

    _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_5___default()(_babel_runtime_helpers_assertThisInitialized__WEBPACK_IMPORTED_MODULE_1___default()(_this), "ibanInput", void 0);

    _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_5___default()(_babel_runtime_helpers_assertThisInitialized__WEBPACK_IMPORTED_MODULE_1___default()(_this), "bicInput", void 0);

    return _this;
  }

  var _proto = PayoneDirectDebit.prototype;

  _proto.readyCallback = function readyCallback() {
    this.bankAccountModeInputs = Array.from(this.querySelectorAll(this.bankAccountModeSelector));
    this.bankAccountInput = this.querySelector(this.bankAccountSelector);
    this.bankCodeInput = this.querySelector(this.bankCodeSelector);
    this.ibanInput = this.querySelector(this.ibanSelector);
    this.bicInput = this.querySelector(this.bicSelector);
    this.mapEvents();
    this.toggleInputsStatus();
  };

  _proto.mapEvents = function mapEvents() {
    var _this2 = this;

    this.bankAccountModeInputs.forEach(function (input) {
      input.addEventListener('change', function (event) {
        return _this2.onModeChange(event);
      });
    });
  };

  _proto.onModeChange = function onModeChange(event) {
    this.toggleInputsStatus();
  };

  _proto.toggleInputStatus = function toggleInputStatus(input, enable) {
    if (enable) {
      input.removeAttribute('disabled');
      return;
    }

    input.setAttribute('disabled', 'disabled');
  };

  _proto.toggleInputsStatus = function toggleInputsStatus() {
    if (!this.bankAccountMode) {
      return;
    }

    this.toggleInputStatus(this.bankAccountInput, this.isBBANBankAccountMode);
    this.toggleInputStatus(this.bankCodeInput, this.isBBANBankAccountMode);
    this.toggleInputStatus(this.ibanInput, !this.isBBANBankAccountMode);
    this.toggleInputStatus(this.bicInput, !this.isBBANBankAccountMode);
  };

  _babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_0___default()(PayoneDirectDebit, [{
    key: "isBBANBankAccountMode",
    get: function get() {
      return this.bankAccountMode === BANK_ACCOUNT_MODE_BBAN;
    }
  }, {
    key: "bankAccountMode",
    get: function get() {
      var selectedInput = this.bankAccountModeInputs.find(function (input) {
        return input.checked;
      });
      return !!selectedInput ? selectedInput.value : '';
    }
  }, {
    key: "bankAccountModeSelector",
    get: function get() {
      return this.getAttribute('bank-account-mode-selector');
    }
  }, {
    key: "bankAccountSelector",
    get: function get() {
      return this.getAttribute('bank-account-selector');
    }
  }, {
    key: "bankCodeSelector",
    get: function get() {
      return this.getAttribute('bank-code-selector');
    }
  }, {
    key: "ibanSelector",
    get: function get() {
      return this.getAttribute('iban-selector');
    }
  }, {
    key: "bicSelector",
    get: function get() {
      return this.getAttribute('bic-selector');
    }
  }]);

  return PayoneDirectDebit;
}(ShopUi_models_component__WEBPACK_IMPORTED_MODULE_6__["default"]);



/***/ })

}]);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vLi92ZW5kb3Ivc3ByeWtlci1lY28vcGF5b25lL3NyYy9TcHJ5a2VyRWNvL1l2ZXMvUGF5b25lL1RoZW1lL2RlZmF1bHQvY29tcG9uZW50cy9tb2xlY3VsZXMvcGF5b25lLWRpcmVjdC1kZWJpdC9wYXlvbmUtZGlyZWN0LWRlYml0LnRzIl0sIm5hbWVzIjpbIkJBTktfQUNDT1VOVF9NT0RFX0JCQU4iLCJQYXlvbmVEaXJlY3REZWJpdCIsInJlYWR5Q2FsbGJhY2siLCJiYW5rQWNjb3VudE1vZGVJbnB1dHMiLCJBcnJheSIsImZyb20iLCJxdWVyeVNlbGVjdG9yQWxsIiwiYmFua0FjY291bnRNb2RlU2VsZWN0b3IiLCJiYW5rQWNjb3VudElucHV0IiwicXVlcnlTZWxlY3RvciIsImJhbmtBY2NvdW50U2VsZWN0b3IiLCJiYW5rQ29kZUlucHV0IiwiYmFua0NvZGVTZWxlY3RvciIsImliYW5JbnB1dCIsImliYW5TZWxlY3RvciIsImJpY0lucHV0IiwiYmljU2VsZWN0b3IiLCJtYXBFdmVudHMiLCJ0b2dnbGVJbnB1dHNTdGF0dXMiLCJmb3JFYWNoIiwiaW5wdXQiLCJhZGRFdmVudExpc3RlbmVyIiwiZXZlbnQiLCJvbk1vZGVDaGFuZ2UiLCJ0b2dnbGVJbnB1dFN0YXR1cyIsImVuYWJsZSIsInJlbW92ZUF0dHJpYnV0ZSIsInNldEF0dHJpYnV0ZSIsImJhbmtBY2NvdW50TW9kZSIsImlzQkJBTkJhbmtBY2NvdW50TW9kZSIsInNlbGVjdGVkSW5wdXQiLCJmaW5kIiwiY2hlY2tlZCIsInZhbHVlIiwiZ2V0QXR0cmlidXRlIiwiQ29tcG9uZW50Il0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQTtBQUVBLElBQU1BLHNCQUFzQixHQUFHLE1BQS9COztJQUVxQkMsaUI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7U0FRUEMsYSxHQUFWLHlCQUFnQztBQUM1QixTQUFLQyxxQkFBTCxHQUFpREMsS0FBSyxDQUFDQyxJQUFOLENBQzdDLEtBQUtDLGdCQUFMLENBQXNCLEtBQUtDLHVCQUEzQixDQUQ2QyxDQUFqRDtBQUdBLFNBQUtDLGdCQUFMLEdBQTBDLEtBQUtDLGFBQUwsQ0FBbUIsS0FBS0MsbUJBQXhCLENBQTFDO0FBQ0EsU0FBS0MsYUFBTCxHQUF1QyxLQUFLRixhQUFMLENBQW1CLEtBQUtHLGdCQUF4QixDQUF2QztBQUNBLFNBQUtDLFNBQUwsR0FBbUMsS0FBS0osYUFBTCxDQUFtQixLQUFLSyxZQUF4QixDQUFuQztBQUNBLFNBQUtDLFFBQUwsR0FBa0MsS0FBS04sYUFBTCxDQUFtQixLQUFLTyxXQUF4QixDQUFsQztBQUVBLFNBQUtDLFNBQUw7QUFDQSxTQUFLQyxrQkFBTDtBQUNILEc7O1NBRVNELFMsR0FBVixxQkFBNEI7QUFBQTs7QUFDeEIsU0FBS2QscUJBQUwsQ0FBMkJnQixPQUEzQixDQUFtQyxVQUFDQyxLQUFELEVBQTZCO0FBQzVEQSxXQUFLLENBQUNDLGdCQUFOLENBQXVCLFFBQXZCLEVBQWlDLFVBQUNDLEtBQUQ7QUFBQSxlQUFrQixNQUFJLENBQUNDLFlBQUwsQ0FBa0JELEtBQWxCLENBQWxCO0FBQUEsT0FBakM7QUFDSCxLQUZEO0FBR0gsRzs7U0FFU0MsWSxHQUFWLHNCQUF1QkQsS0FBdkIsRUFBMkM7QUFDdkMsU0FBS0osa0JBQUw7QUFDSCxHOztTQUVTTSxpQixHQUFWLDJCQUE0QkosS0FBNUIsRUFBcURLLE1BQXJELEVBQTRFO0FBQ3hFLFFBQUlBLE1BQUosRUFBWTtBQUNSTCxXQUFLLENBQUNNLGVBQU4sQ0FBc0IsVUFBdEI7QUFFQTtBQUNIOztBQUVETixTQUFLLENBQUNPLFlBQU4sQ0FBbUIsVUFBbkIsRUFBK0IsVUFBL0I7QUFDSCxHOztTQUVEVCxrQixHQUFBLDhCQUEyQjtBQUN2QixRQUFJLENBQUMsS0FBS1UsZUFBVixFQUEyQjtBQUN2QjtBQUNIOztBQUVELFNBQUtKLGlCQUFMLENBQXVCLEtBQUtoQixnQkFBNUIsRUFBOEMsS0FBS3FCLHFCQUFuRDtBQUNBLFNBQUtMLGlCQUFMLENBQXVCLEtBQUtiLGFBQTVCLEVBQTJDLEtBQUtrQixxQkFBaEQ7QUFDQSxTQUFLTCxpQkFBTCxDQUF1QixLQUFLWCxTQUE1QixFQUF1QyxDQUFDLEtBQUtnQixxQkFBN0M7QUFDQSxTQUFLTCxpQkFBTCxDQUF1QixLQUFLVCxRQUE1QixFQUFzQyxDQUFDLEtBQUtjLHFCQUE1QztBQUNILEc7Ozs7d0JBRW9DO0FBQ2pDLGFBQU8sS0FBS0QsZUFBTCxLQUF5QjVCLHNCQUFoQztBQUNIOzs7d0JBRTZCO0FBQzFCLFVBQU04QixhQUFhLEdBQUcsS0FBSzNCLHFCQUFMLENBQTJCNEIsSUFBM0IsQ0FBZ0MsVUFBQ1gsS0FBRDtBQUFBLGVBQTZCQSxLQUFLLENBQUNZLE9BQW5DO0FBQUEsT0FBaEMsQ0FBdEI7QUFFQSxhQUFPLENBQUMsQ0FBQ0YsYUFBRixHQUFrQkEsYUFBYSxDQUFDRyxLQUFoQyxHQUF3QyxFQUEvQztBQUNIOzs7d0JBRXFDO0FBQ2xDLGFBQU8sS0FBS0MsWUFBTCxDQUFrQiw0QkFBbEIsQ0FBUDtBQUNIOzs7d0JBRWlDO0FBQzlCLGFBQU8sS0FBS0EsWUFBTCxDQUFrQix1QkFBbEIsQ0FBUDtBQUNIOzs7d0JBRThCO0FBQzNCLGFBQU8sS0FBS0EsWUFBTCxDQUFrQixvQkFBbEIsQ0FBUDtBQUNIOzs7d0JBRTBCO0FBQ3ZCLGFBQU8sS0FBS0EsWUFBTCxDQUFrQixlQUFsQixDQUFQO0FBQ0g7Ozt3QkFFeUI7QUFDdEIsYUFBTyxLQUFLQSxZQUFMLENBQWtCLGNBQWxCLENBQVA7QUFDSDs7OztFQWhGMENDLCtEIiwiZmlsZSI6Ii4vanMveXZlc19kZWZhdWx0LnBheW9uZS1kaXJlY3QtZGViaXQubGVnYWN5LmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IENvbXBvbmVudCBmcm9tICdTaG9wVWkvbW9kZWxzL2NvbXBvbmVudCc7XG5cbmNvbnN0IEJBTktfQUNDT1VOVF9NT0RFX0JCQU4gPSAnQkJBTic7XG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIFBheW9uZURpcmVjdERlYml0IGV4dGVuZHMgQ29tcG9uZW50IHtcbiAgICBmb3JtOiBIVE1MRm9ybUVsZW1lbnQ7XG4gICAgYmFua0FjY291bnRNb2RlSW5wdXRzOiBIVE1MSW5wdXRFbGVtZW50W107XG4gICAgYmFua0FjY291bnRJbnB1dDogSFRNTElucHV0RWxlbWVudDtcbiAgICBiYW5rQ29kZUlucHV0OiBIVE1MSW5wdXRFbGVtZW50O1xuICAgIGliYW5JbnB1dDogSFRNTElucHV0RWxlbWVudDtcbiAgICBiaWNJbnB1dDogSFRNTElucHV0RWxlbWVudDtcblxuICAgIHByb3RlY3RlZCByZWFkeUNhbGxiYWNrKCk6IHZvaWQge1xuICAgICAgICB0aGlzLmJhbmtBY2NvdW50TW9kZUlucHV0cyA9IDxIVE1MSW5wdXRFbGVtZW50W10+QXJyYXkuZnJvbShcbiAgICAgICAgICAgIHRoaXMucXVlcnlTZWxlY3RvckFsbCh0aGlzLmJhbmtBY2NvdW50TW9kZVNlbGVjdG9yKVxuICAgICAgICApO1xuICAgICAgICB0aGlzLmJhbmtBY2NvdW50SW5wdXQgPSA8SFRNTElucHV0RWxlbWVudD50aGlzLnF1ZXJ5U2VsZWN0b3IodGhpcy5iYW5rQWNjb3VudFNlbGVjdG9yKTtcbiAgICAgICAgdGhpcy5iYW5rQ29kZUlucHV0ID0gPEhUTUxJbnB1dEVsZW1lbnQ+dGhpcy5xdWVyeVNlbGVjdG9yKHRoaXMuYmFua0NvZGVTZWxlY3Rvcik7XG4gICAgICAgIHRoaXMuaWJhbklucHV0ID0gPEhUTUxJbnB1dEVsZW1lbnQ+dGhpcy5xdWVyeVNlbGVjdG9yKHRoaXMuaWJhblNlbGVjdG9yKTtcbiAgICAgICAgdGhpcy5iaWNJbnB1dCA9IDxIVE1MSW5wdXRFbGVtZW50PnRoaXMucXVlcnlTZWxlY3Rvcih0aGlzLmJpY1NlbGVjdG9yKTtcblxuICAgICAgICB0aGlzLm1hcEV2ZW50cygpO1xuICAgICAgICB0aGlzLnRvZ2dsZUlucHV0c1N0YXR1cygpO1xuICAgIH1cblxuICAgIHByb3RlY3RlZCBtYXBFdmVudHMoKTogdm9pZCB7XG4gICAgICAgIHRoaXMuYmFua0FjY291bnRNb2RlSW5wdXRzLmZvckVhY2goKGlucHV0OiBIVE1MSW5wdXRFbGVtZW50KSA9PiB7XG4gICAgICAgICAgICBpbnB1dC5hZGRFdmVudExpc3RlbmVyKCdjaGFuZ2UnLCAoZXZlbnQ6IEV2ZW50KSA9PiB0aGlzLm9uTW9kZUNoYW5nZShldmVudCkpO1xuICAgICAgICB9KTtcbiAgICB9XG5cbiAgICBwcm90ZWN0ZWQgb25Nb2RlQ2hhbmdlKGV2ZW50OiBFdmVudCk6IHZvaWQge1xuICAgICAgICB0aGlzLnRvZ2dsZUlucHV0c1N0YXR1cygpO1xuICAgIH1cblxuICAgIHByb3RlY3RlZCB0b2dnbGVJbnB1dFN0YXR1cyhpbnB1dDogSFRNTElucHV0RWxlbWVudCwgZW5hYmxlOiBib29sZWFuKTogdm9pZCB7XG4gICAgICAgIGlmIChlbmFibGUpIHtcbiAgICAgICAgICAgIGlucHV0LnJlbW92ZUF0dHJpYnV0ZSgnZGlzYWJsZWQnKTtcblxuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG5cbiAgICAgICAgaW5wdXQuc2V0QXR0cmlidXRlKCdkaXNhYmxlZCcsICdkaXNhYmxlZCcpO1xuICAgIH1cblxuICAgIHRvZ2dsZUlucHV0c1N0YXR1cygpOiB2b2lkIHtcbiAgICAgICAgaWYgKCF0aGlzLmJhbmtBY2NvdW50TW9kZSkge1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG5cbiAgICAgICAgdGhpcy50b2dnbGVJbnB1dFN0YXR1cyh0aGlzLmJhbmtBY2NvdW50SW5wdXQsIHRoaXMuaXNCQkFOQmFua0FjY291bnRNb2RlKTtcbiAgICAgICAgdGhpcy50b2dnbGVJbnB1dFN0YXR1cyh0aGlzLmJhbmtDb2RlSW5wdXQsIHRoaXMuaXNCQkFOQmFua0FjY291bnRNb2RlKTtcbiAgICAgICAgdGhpcy50b2dnbGVJbnB1dFN0YXR1cyh0aGlzLmliYW5JbnB1dCwgIXRoaXMuaXNCQkFOQmFua0FjY291bnRNb2RlKTtcbiAgICAgICAgdGhpcy50b2dnbGVJbnB1dFN0YXR1cyh0aGlzLmJpY0lucHV0LCAhdGhpcy5pc0JCQU5CYW5rQWNjb3VudE1vZGUpO1xuICAgIH1cblxuICAgIGdldCBpc0JCQU5CYW5rQWNjb3VudE1vZGUoKTogYm9vbGVhbiB7XG4gICAgICAgIHJldHVybiB0aGlzLmJhbmtBY2NvdW50TW9kZSA9PT0gQkFOS19BQ0NPVU5UX01PREVfQkJBTjtcbiAgICB9XG5cbiAgICBnZXQgYmFua0FjY291bnRNb2RlKCk6IHN0cmluZyB7XG4gICAgICAgIGNvbnN0IHNlbGVjdGVkSW5wdXQgPSB0aGlzLmJhbmtBY2NvdW50TW9kZUlucHV0cy5maW5kKChpbnB1dDogSFRNTElucHV0RWxlbWVudCkgPT4gaW5wdXQuY2hlY2tlZCk7XG5cbiAgICAgICAgcmV0dXJuICEhc2VsZWN0ZWRJbnB1dCA/IHNlbGVjdGVkSW5wdXQudmFsdWUgOiAnJztcbiAgICB9XG5cbiAgICBnZXQgYmFua0FjY291bnRNb2RlU2VsZWN0b3IoKTogc3RyaW5nIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuZ2V0QXR0cmlidXRlKCdiYW5rLWFjY291bnQtbW9kZS1zZWxlY3RvcicpO1xuICAgIH1cblxuICAgIGdldCBiYW5rQWNjb3VudFNlbGVjdG9yKCk6IHN0cmluZyB7XG4gICAgICAgIHJldHVybiB0aGlzLmdldEF0dHJpYnV0ZSgnYmFuay1hY2NvdW50LXNlbGVjdG9yJyk7XG4gICAgfVxuXG4gICAgZ2V0IGJhbmtDb2RlU2VsZWN0b3IoKTogc3RyaW5nIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuZ2V0QXR0cmlidXRlKCdiYW5rLWNvZGUtc2VsZWN0b3InKTtcbiAgICB9XG5cbiAgICBnZXQgaWJhblNlbGVjdG9yKCk6IHN0cmluZyB7XG4gICAgICAgIHJldHVybiB0aGlzLmdldEF0dHJpYnV0ZSgnaWJhbi1zZWxlY3RvcicpO1xuICAgIH1cblxuICAgIGdldCBiaWNTZWxlY3RvcigpOiBzdHJpbmcge1xuICAgICAgICByZXR1cm4gdGhpcy5nZXRBdHRyaWJ1dGUoJ2JpYy1zZWxlY3RvcicpO1xuICAgIH1cbn1cbiJdLCJzb3VyY2VSb290IjoiIn0=