(window["webpackJsonp_yves_default"] = window["webpackJsonp_yves_default"] || []).push([[17],{

/***/ "./src/Pyz/Yves/LanguageSwitcherWidget/Theme/default/components/molecules/language-switcher/language-switcher.ts":
/*!***********************************************************************************************************************!*\
  !*** ./src/Pyz/Yves/LanguageSwitcherWidget/Theme/default/components/molecules/language-switcher/language-switcher.ts ***!
  \***********************************************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return LanguageSwitcher; });
/* harmony import */ var _babel_runtime_helpers_assertThisInitialized__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @babel/runtime/helpers/assertThisInitialized */ "./node_modules/@babel/runtime/helpers/assertThisInitialized.js");
/* harmony import */ var _babel_runtime_helpers_assertThisInitialized__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_assertThisInitialized__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _babel_runtime_helpers_possibleConstructorReturn__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @babel/runtime/helpers/possibleConstructorReturn */ "./node_modules/@babel/runtime/helpers/possibleConstructorReturn.js");
/* harmony import */ var _babel_runtime_helpers_possibleConstructorReturn__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_possibleConstructorReturn__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _babel_runtime_helpers_getPrototypeOf__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @babel/runtime/helpers/getPrototypeOf */ "./node_modules/@babel/runtime/helpers/getPrototypeOf.js");
/* harmony import */ var _babel_runtime_helpers_getPrototypeOf__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_getPrototypeOf__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _babel_runtime_helpers_inheritsLoose__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @babel/runtime/helpers/inheritsLoose */ "./node_modules/@babel/runtime/helpers/inheritsLoose.js");
/* harmony import */ var _babel_runtime_helpers_inheritsLoose__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_inheritsLoose__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @babel/runtime/helpers/defineProperty */ "./node_modules/@babel/runtime/helpers/defineProperty.js");
/* harmony import */ var _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var ShopUi_models_component__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ShopUi/models/component */ "./vendor/spryker-shop/shop-ui/src/SprykerShop/Yves/ShopUi/Theme/default/models/component.ts");






function _createSuper(Derived) { return function () { var Super = _babel_runtime_helpers_getPrototypeOf__WEBPACK_IMPORTED_MODULE_2___default()(Derived), result; if (_isNativeReflectConstruct()) { var NewTarget = _babel_runtime_helpers_getPrototypeOf__WEBPACK_IMPORTED_MODULE_2___default()(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _babel_runtime_helpers_possibleConstructorReturn__WEBPACK_IMPORTED_MODULE_1___default()(this, result); }; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Date.prototype.toString.call(Reflect.construct(Date, [], function () {})); return true; } catch (e) { return false; } }



var LanguageSwitcher = /*#__PURE__*/function (_Component) {
  _babel_runtime_helpers_inheritsLoose__WEBPACK_IMPORTED_MODULE_3___default()(LanguageSwitcher, _Component);

  var _super = _createSuper(LanguageSwitcher);

  function LanguageSwitcher() {
    var _this;

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this = _Component.call.apply(_Component, [this].concat(args)) || this;

    _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_4___default()(_babel_runtime_helpers_assertThisInitialized__WEBPACK_IMPORTED_MODULE_0___default()(_this), "select", void 0);

    return _this;
  }

  var _proto = LanguageSwitcher.prototype;

  _proto.readyCallback = function readyCallback() {};

  _proto.init = function init() {
    this.select = this.getElementsByClassName(this.jsName + "__select")[0];
    this.mapEvents();
  };

  _proto.mapEvents = function mapEvents() {
    var _this2 = this;

    this.select.addEventListener('change', function (event) {
      return _this2.onTriggerChange(event);
    });
  };

  _proto.onTriggerChange = function onTriggerChange(event) {
    var selectTarget = event.currentTarget;

    if (this.hasUrl(selectTarget)) {
      window.location.assign(this.currentSelectValue(selectTarget));
    }
  };

  _proto.currentSelectValue = function currentSelectValue(select) {
    return select.options[select.selectedIndex].value;
  };

  _proto.hasUrl = function hasUrl(select) {
    return !!select.value;
  };

  return LanguageSwitcher;
}(ShopUi_models_component__WEBPACK_IMPORTED_MODULE_5__["default"]);



/***/ })

}]);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vLi9zcmMvUHl6L1l2ZXMvTGFuZ3VhZ2VTd2l0Y2hlcldpZGdldC9UaGVtZS9kZWZhdWx0L2NvbXBvbmVudHMvbW9sZWN1bGVzL2xhbmd1YWdlLXN3aXRjaGVyL2xhbmd1YWdlLXN3aXRjaGVyLnRzIl0sIm5hbWVzIjpbIkxhbmd1YWdlU3dpdGNoZXIiLCJyZWFkeUNhbGxiYWNrIiwiaW5pdCIsInNlbGVjdCIsImdldEVsZW1lbnRzQnlDbGFzc05hbWUiLCJqc05hbWUiLCJtYXBFdmVudHMiLCJhZGRFdmVudExpc3RlbmVyIiwiZXZlbnQiLCJvblRyaWdnZXJDaGFuZ2UiLCJzZWxlY3RUYXJnZXQiLCJjdXJyZW50VGFyZ2V0IiwiaGFzVXJsIiwid2luZG93IiwibG9jYXRpb24iLCJhc3NpZ24iLCJjdXJyZW50U2VsZWN0VmFsdWUiLCJvcHRpb25zIiwic2VsZWN0ZWRJbmRleCIsInZhbHVlIiwiQ29tcG9uZW50Il0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQTs7SUFFcUJBLGdCOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7U0FHUEMsYSxHQUFWLHlCQUFnQyxDQUFFLEM7O1NBRXhCQyxJLEdBQVYsZ0JBQXVCO0FBQ25CLFNBQUtDLE1BQUwsR0FBaUMsS0FBS0Msc0JBQUwsQ0FBK0IsS0FBS0MsTUFBcEMsZUFBc0QsQ0FBdEQsQ0FBakM7QUFDQSxTQUFLQyxTQUFMO0FBQ0gsRzs7U0FFU0EsUyxHQUFWLHFCQUE0QjtBQUFBOztBQUN4QixTQUFLSCxNQUFMLENBQVlJLGdCQUFaLENBQTZCLFFBQTdCLEVBQXVDLFVBQUNDLEtBQUQ7QUFBQSxhQUFrQixNQUFJLENBQUNDLGVBQUwsQ0FBcUJELEtBQXJCLENBQWxCO0FBQUEsS0FBdkM7QUFDSCxHOztTQUVTQyxlLEdBQVYseUJBQTBCRCxLQUExQixFQUE4QztBQUMxQyxRQUFNRSxZQUFZLEdBQXNCRixLQUFLLENBQUNHLGFBQTlDOztBQUVBLFFBQUksS0FBS0MsTUFBTCxDQUFZRixZQUFaLENBQUosRUFBK0I7QUFDM0JHLFlBQU0sQ0FBQ0MsUUFBUCxDQUFnQkMsTUFBaEIsQ0FBdUIsS0FBS0Msa0JBQUwsQ0FBd0JOLFlBQXhCLENBQXZCO0FBQ0g7QUFDSixHOztTQUVTTSxrQixHQUFWLDRCQUE2QmIsTUFBN0IsRUFBZ0U7QUFDNUQsV0FBT0EsTUFBTSxDQUFDYyxPQUFQLENBQWVkLE1BQU0sQ0FBQ2UsYUFBdEIsRUFBcUNDLEtBQTVDO0FBQ0gsRzs7U0FFU1AsTSxHQUFWLGdCQUFpQlQsTUFBakIsRUFBcUQ7QUFDakQsV0FBTyxDQUFDLENBQUNBLE1BQU0sQ0FBQ2dCLEtBQWhCO0FBQ0gsRzs7O0VBNUJ5Q0MsK0QiLCJmaWxlIjoiLi9qcy95dmVzX2RlZmF1bHQuMTcubGVnYWN5LmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IENvbXBvbmVudCBmcm9tICdTaG9wVWkvbW9kZWxzL2NvbXBvbmVudCc7XG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIExhbmd1YWdlU3dpdGNoZXIgZXh0ZW5kcyBDb21wb25lbnQge1xuICAgIHByb3RlY3RlZCBzZWxlY3Q6IEhUTUxTZWxlY3RFbGVtZW50O1xuXG4gICAgcHJvdGVjdGVkIHJlYWR5Q2FsbGJhY2soKTogdm9pZCB7fVxuXG4gICAgcHJvdGVjdGVkIGluaXQoKTogdm9pZCB7XG4gICAgICAgIHRoaXMuc2VsZWN0ID0gPEhUTUxTZWxlY3RFbGVtZW50PnRoaXMuZ2V0RWxlbWVudHNCeUNsYXNzTmFtZShgJHt0aGlzLmpzTmFtZX1fX3NlbGVjdGApWzBdO1xuICAgICAgICB0aGlzLm1hcEV2ZW50cygpO1xuICAgIH1cblxuICAgIHByb3RlY3RlZCBtYXBFdmVudHMoKTogdm9pZCB7XG4gICAgICAgIHRoaXMuc2VsZWN0LmFkZEV2ZW50TGlzdGVuZXIoJ2NoYW5nZScsIChldmVudDogRXZlbnQpID0+IHRoaXMub25UcmlnZ2VyQ2hhbmdlKGV2ZW50KSk7XG4gICAgfVxuXG4gICAgcHJvdGVjdGVkIG9uVHJpZ2dlckNoYW5nZShldmVudDogRXZlbnQpOiB2b2lkIHtcbiAgICAgICAgY29uc3Qgc2VsZWN0VGFyZ2V0ID0gPEhUTUxTZWxlY3RFbGVtZW50PmV2ZW50LmN1cnJlbnRUYXJnZXQ7XG5cbiAgICAgICAgaWYgKHRoaXMuaGFzVXJsKHNlbGVjdFRhcmdldCkpIHtcbiAgICAgICAgICAgIHdpbmRvdy5sb2NhdGlvbi5hc3NpZ24odGhpcy5jdXJyZW50U2VsZWN0VmFsdWUoc2VsZWN0VGFyZ2V0KSk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBwcm90ZWN0ZWQgY3VycmVudFNlbGVjdFZhbHVlKHNlbGVjdDogSFRNTFNlbGVjdEVsZW1lbnQpOiBzdHJpbmcge1xuICAgICAgICByZXR1cm4gc2VsZWN0Lm9wdGlvbnNbc2VsZWN0LnNlbGVjdGVkSW5kZXhdLnZhbHVlO1xuICAgIH1cblxuICAgIHByb3RlY3RlZCBoYXNVcmwoc2VsZWN0OiBIVE1MU2VsZWN0RWxlbWVudCk6IGJvb2xlYW4ge1xuICAgICAgICByZXR1cm4gISFzZWxlY3QudmFsdWU7XG4gICAgfVxufVxuIl0sInNvdXJjZVJvb3QiOiIifQ==