(window["webpackJsonp_yves_default"] = window["webpackJsonp_yves_default"] || []).push([["accept-terms-checkbox"],{

/***/ "./vendor/spryker-shop/checkout-page/src/SprykerShop/Yves/CheckoutPage/Theme/default/components/molecules/accept-terms-checkbox/accept-terms-checkbox.ts":
/*!***************************************************************************************************************************************************************!*\
  !*** ./vendor/spryker-shop/checkout-page/src/SprykerShop/Yves/CheckoutPage/Theme/default/components/molecules/accept-terms-checkbox/accept-terms-checkbox.ts ***!
  \***************************************************************************************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return AcceptTermsCheckbox; });
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



var AcceptTermsCheckbox = /*#__PURE__*/function (_Component) {
  _babel_runtime_helpers_inheritsLoose__WEBPACK_IMPORTED_MODULE_4___default()(AcceptTermsCheckbox, _Component);

  var _super = _createSuper(AcceptTermsCheckbox);

  function AcceptTermsCheckbox() {
    var _this;

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this = _Component.call.apply(_Component, [this].concat(args)) || this;

    _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_5___default()(_babel_runtime_helpers_assertThisInitialized__WEBPACK_IMPORTED_MODULE_1___default()(_this), "trigger", void 0);

    _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_5___default()(_babel_runtime_helpers_assertThisInitialized__WEBPACK_IMPORTED_MODULE_1___default()(_this), "target", void 0);

    return _this;
  }

  var _proto = AcceptTermsCheckbox.prototype;

  _proto.readyCallback = function readyCallback() {};

  _proto.init = function init() {
    this.trigger = this.getElementsByClassName(this.jsName + "__trigger")[0];
    this.target = document.getElementsByClassName(this.targetClassName)[0];
    this.toggleTargetDisabling();
    this.mapEvents();
  };

  _proto.mapEvents = function mapEvents() {
    this.mapTriggerChangeEvent();
  };

  _proto.mapTriggerChangeEvent = function mapTriggerChangeEvent() {
    var _this2 = this;

    this.trigger.addEventListener('change', function () {
      return _this2.onTriggerChange();
    });
  };

  _proto.onTriggerChange = function onTriggerChange() {
    this.toggleTargetDisabling();
  };

  _proto.toggleTargetDisabling = function toggleTargetDisabling() {
    if (!this.target) {
      return;
    }

    if (!this.trigger.checked) {
      this.target.disabled = true;
      return;
    }

    this.target.disabled = false;
  };

  _babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_0___default()(AcceptTermsCheckbox, [{
    key: "targetClassName",
    get: function get() {
      return this.getAttribute('target-class-name');
    }
  }]);

  return AcceptTermsCheckbox;
}(ShopUi_models_component__WEBPACK_IMPORTED_MODULE_6__["default"]);



/***/ })

}]);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vLi92ZW5kb3Ivc3ByeWtlci1zaG9wL2NoZWNrb3V0LXBhZ2Uvc3JjL1NwcnlrZXJTaG9wL1l2ZXMvQ2hlY2tvdXRQYWdlL1RoZW1lL2RlZmF1bHQvY29tcG9uZW50cy9tb2xlY3VsZXMvYWNjZXB0LXRlcm1zLWNoZWNrYm94L2FjY2VwdC10ZXJtcy1jaGVja2JveC50cyJdLCJuYW1lcyI6WyJBY2NlcHRUZXJtc0NoZWNrYm94IiwicmVhZHlDYWxsYmFjayIsImluaXQiLCJ0cmlnZ2VyIiwiZ2V0RWxlbWVudHNCeUNsYXNzTmFtZSIsImpzTmFtZSIsInRhcmdldCIsImRvY3VtZW50IiwidGFyZ2V0Q2xhc3NOYW1lIiwidG9nZ2xlVGFyZ2V0RGlzYWJsaW5nIiwibWFwRXZlbnRzIiwibWFwVHJpZ2dlckNoYW5nZUV2ZW50IiwiYWRkRXZlbnRMaXN0ZW5lciIsIm9uVHJpZ2dlckNoYW5nZSIsImNoZWNrZWQiLCJkaXNhYmxlZCIsImdldEF0dHJpYnV0ZSIsIkNvbXBvbmVudCJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUE7O0lBRXFCQSxtQjs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7U0FJUEMsYSxHQUFWLHlCQUFnQyxDQUFFLEM7O1NBRXhCQyxJLEdBQVYsZ0JBQXVCO0FBQ25CLFNBQUtDLE9BQUwsR0FBaUMsS0FBS0Msc0JBQUwsQ0FBK0IsS0FBS0MsTUFBcEMsZ0JBQXVELENBQXZELENBQWpDO0FBQ0EsU0FBS0MsTUFBTCxHQUFpQ0MsUUFBUSxDQUFDSCxzQkFBVCxDQUFnQyxLQUFLSSxlQUFyQyxFQUFzRCxDQUF0RCxDQUFqQztBQUVBLFNBQUtDLHFCQUFMO0FBQ0EsU0FBS0MsU0FBTDtBQUNILEc7O1NBRVNBLFMsR0FBVixxQkFBNEI7QUFDeEIsU0FBS0MscUJBQUw7QUFDSCxHOztTQUVTQSxxQixHQUFWLGlDQUF3QztBQUFBOztBQUNwQyxTQUFLUixPQUFMLENBQWFTLGdCQUFiLENBQThCLFFBQTlCLEVBQXdDO0FBQUEsYUFBTSxNQUFJLENBQUNDLGVBQUwsRUFBTjtBQUFBLEtBQXhDO0FBQ0gsRzs7U0FFU0EsZSxHQUFWLDJCQUFrQztBQUM5QixTQUFLSixxQkFBTDtBQUNILEc7O1NBRVNBLHFCLEdBQVYsaUNBQXdDO0FBQ3BDLFFBQUksQ0FBQyxLQUFLSCxNQUFWLEVBQWtCO0FBQ2Q7QUFDSDs7QUFFRCxRQUFJLENBQUMsS0FBS0gsT0FBTCxDQUFhVyxPQUFsQixFQUEyQjtBQUN2QixXQUFLUixNQUFMLENBQVlTLFFBQVosR0FBdUIsSUFBdkI7QUFFQTtBQUNIOztBQUVELFNBQUtULE1BQUwsQ0FBWVMsUUFBWixHQUF1QixLQUF2QjtBQUNILEc7Ozs7d0JBRXVDO0FBQ3BDLGFBQU8sS0FBS0MsWUFBTCxDQUFrQixtQkFBbEIsQ0FBUDtBQUNIOzs7O0VBMUM0Q0MsK0QiLCJmaWxlIjoiLi9qcy95dmVzX2RlZmF1bHQuYWNjZXB0LXRlcm1zLWNoZWNrYm94LmxlZ2FjeS5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBDb21wb25lbnQgZnJvbSAnU2hvcFVpL21vZGVscy9jb21wb25lbnQnO1xuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBBY2NlcHRUZXJtc0NoZWNrYm94IGV4dGVuZHMgQ29tcG9uZW50IHtcbiAgICBwcm90ZWN0ZWQgdHJpZ2dlcjogSFRNTElucHV0RWxlbWVudDtcbiAgICBwcm90ZWN0ZWQgdGFyZ2V0OiBIVE1MQnV0dG9uRWxlbWVudDtcblxuICAgIHByb3RlY3RlZCByZWFkeUNhbGxiYWNrKCk6IHZvaWQge31cblxuICAgIHByb3RlY3RlZCBpbml0KCk6IHZvaWQge1xuICAgICAgICB0aGlzLnRyaWdnZXIgPSA8SFRNTElucHV0RWxlbWVudD50aGlzLmdldEVsZW1lbnRzQnlDbGFzc05hbWUoYCR7dGhpcy5qc05hbWV9X190cmlnZ2VyYClbMF07XG4gICAgICAgIHRoaXMudGFyZ2V0ID0gPEhUTUxCdXR0b25FbGVtZW50PmRvY3VtZW50LmdldEVsZW1lbnRzQnlDbGFzc05hbWUodGhpcy50YXJnZXRDbGFzc05hbWUpWzBdO1xuXG4gICAgICAgIHRoaXMudG9nZ2xlVGFyZ2V0RGlzYWJsaW5nKCk7XG4gICAgICAgIHRoaXMubWFwRXZlbnRzKCk7XG4gICAgfVxuXG4gICAgcHJvdGVjdGVkIG1hcEV2ZW50cygpOiB2b2lkIHtcbiAgICAgICAgdGhpcy5tYXBUcmlnZ2VyQ2hhbmdlRXZlbnQoKTtcbiAgICB9XG5cbiAgICBwcm90ZWN0ZWQgbWFwVHJpZ2dlckNoYW5nZUV2ZW50KCk6IHZvaWQge1xuICAgICAgICB0aGlzLnRyaWdnZXIuYWRkRXZlbnRMaXN0ZW5lcignY2hhbmdlJywgKCkgPT4gdGhpcy5vblRyaWdnZXJDaGFuZ2UoKSk7XG4gICAgfVxuXG4gICAgcHJvdGVjdGVkIG9uVHJpZ2dlckNoYW5nZSgpOiB2b2lkIHtcbiAgICAgICAgdGhpcy50b2dnbGVUYXJnZXREaXNhYmxpbmcoKTtcbiAgICB9XG5cbiAgICBwcm90ZWN0ZWQgdG9nZ2xlVGFyZ2V0RGlzYWJsaW5nKCk6IHZvaWQge1xuICAgICAgICBpZiAoIXRoaXMudGFyZ2V0KSB7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cblxuICAgICAgICBpZiAoIXRoaXMudHJpZ2dlci5jaGVja2VkKSB7XG4gICAgICAgICAgICB0aGlzLnRhcmdldC5kaXNhYmxlZCA9IHRydWU7XG5cbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuXG4gICAgICAgIHRoaXMudGFyZ2V0LmRpc2FibGVkID0gZmFsc2U7XG4gICAgfVxuXG4gICAgcHJvdGVjdGVkIGdldCB0YXJnZXRDbGFzc05hbWUoKTogc3RyaW5nIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuZ2V0QXR0cmlidXRlKCd0YXJnZXQtY2xhc3MtbmFtZScpO1xuICAgIH1cbn1cbiJdLCJzb3VyY2VSb290IjoiIn0=