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
/* harmony import */ var ShopUi_models_component__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ShopUi/models/component */ "./vendor/spryker-shop/shop-ui/src/SprykerShop/Yves/ShopUi/Theme/default/models/component.ts");
function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }


class LanguageSwitcher extends ShopUi_models_component__WEBPACK_IMPORTED_MODULE_0__["default"] {
  constructor() {
    super(...arguments);

    _defineProperty(this, "select", void 0);
  }

  readyCallback() {}

  init() {
    this.select = this.getElementsByClassName(this.jsName + "__select")[0];
    this.mapEvents();
  }

  mapEvents() {
    this.select.addEventListener('change', event => this.onTriggerChange(event));
  }

  onTriggerChange(event) {
    var selectTarget = event.currentTarget;

    if (this.hasUrl(selectTarget)) {
      window.location.assign(this.currentSelectValue(selectTarget));
    }
  }

  currentSelectValue(select) {
    return select.options[select.selectedIndex].value;
  }

  hasUrl(select) {
    return !!select.value;
  }

}

/***/ })

}]);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vLi9zcmMvUHl6L1l2ZXMvTGFuZ3VhZ2VTd2l0Y2hlcldpZGdldC9UaGVtZS9kZWZhdWx0L2NvbXBvbmVudHMvbW9sZWN1bGVzL2xhbmd1YWdlLXN3aXRjaGVyL2xhbmd1YWdlLXN3aXRjaGVyLnRzIl0sIm5hbWVzIjpbIkxhbmd1YWdlU3dpdGNoZXIiLCJDb21wb25lbnQiLCJyZWFkeUNhbGxiYWNrIiwiaW5pdCIsInNlbGVjdCIsImdldEVsZW1lbnRzQnlDbGFzc05hbWUiLCJqc05hbWUiLCJtYXBFdmVudHMiLCJhZGRFdmVudExpc3RlbmVyIiwiZXZlbnQiLCJvblRyaWdnZXJDaGFuZ2UiLCJzZWxlY3RUYXJnZXQiLCJjdXJyZW50VGFyZ2V0IiwiaGFzVXJsIiwid2luZG93IiwibG9jYXRpb24iLCJhc3NpZ24iLCJjdXJyZW50U2VsZWN0VmFsdWUiLCJvcHRpb25zIiwic2VsZWN0ZWRJbmRleCIsInZhbHVlIl0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7QUFBQTtBQUVlLE1BQU1BLGdCQUFOLFNBQStCQywrREFBL0IsQ0FBeUM7QUFBQTtBQUFBOztBQUFBO0FBQUE7O0FBRzFDQyxlQUFWLEdBQWdDLENBQUU7O0FBRXhCQyxNQUFWLEdBQXVCO0FBQ25CLFNBQUtDLE1BQUwsR0FBaUMsS0FBS0Msc0JBQUwsQ0FBK0IsS0FBS0MsTUFBcEMsZUFBc0QsQ0FBdEQsQ0FBakM7QUFDQSxTQUFLQyxTQUFMO0FBQ0g7O0FBRVNBLFdBQVYsR0FBNEI7QUFDeEIsU0FBS0gsTUFBTCxDQUFZSSxnQkFBWixDQUE2QixRQUE3QixFQUF3Q0MsS0FBRCxJQUFrQixLQUFLQyxlQUFMLENBQXFCRCxLQUFyQixDQUF6RDtBQUNIOztBQUVTQyxpQkFBVixDQUEwQkQsS0FBMUIsRUFBOEM7QUFDMUMsUUFBTUUsWUFBWSxHQUFzQkYsS0FBSyxDQUFDRyxhQUE5Qzs7QUFFQSxRQUFJLEtBQUtDLE1BQUwsQ0FBWUYsWUFBWixDQUFKLEVBQStCO0FBQzNCRyxZQUFNLENBQUNDLFFBQVAsQ0FBZ0JDLE1BQWhCLENBQXVCLEtBQUtDLGtCQUFMLENBQXdCTixZQUF4QixDQUF2QjtBQUNIO0FBQ0o7O0FBRVNNLG9CQUFWLENBQTZCYixNQUE3QixFQUFnRTtBQUM1RCxXQUFPQSxNQUFNLENBQUNjLE9BQVAsQ0FBZWQsTUFBTSxDQUFDZSxhQUF0QixFQUFxQ0MsS0FBNUM7QUFDSDs7QUFFU1AsUUFBVixDQUFpQlQsTUFBakIsRUFBcUQ7QUFDakQsV0FBTyxDQUFDLENBQUNBLE1BQU0sQ0FBQ2dCLEtBQWhCO0FBQ0g7O0FBNUJtRCxDIiwiZmlsZSI6Ii4vanMveXZlc19kZWZhdWx0LjE3LmVzbS5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBDb21wb25lbnQgZnJvbSAnU2hvcFVpL21vZGVscy9jb21wb25lbnQnO1xuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBMYW5ndWFnZVN3aXRjaGVyIGV4dGVuZHMgQ29tcG9uZW50IHtcbiAgICBwcm90ZWN0ZWQgc2VsZWN0OiBIVE1MU2VsZWN0RWxlbWVudDtcblxuICAgIHByb3RlY3RlZCByZWFkeUNhbGxiYWNrKCk6IHZvaWQge31cblxuICAgIHByb3RlY3RlZCBpbml0KCk6IHZvaWQge1xuICAgICAgICB0aGlzLnNlbGVjdCA9IDxIVE1MU2VsZWN0RWxlbWVudD50aGlzLmdldEVsZW1lbnRzQnlDbGFzc05hbWUoYCR7dGhpcy5qc05hbWV9X19zZWxlY3RgKVswXTtcbiAgICAgICAgdGhpcy5tYXBFdmVudHMoKTtcbiAgICB9XG5cbiAgICBwcm90ZWN0ZWQgbWFwRXZlbnRzKCk6IHZvaWQge1xuICAgICAgICB0aGlzLnNlbGVjdC5hZGRFdmVudExpc3RlbmVyKCdjaGFuZ2UnLCAoZXZlbnQ6IEV2ZW50KSA9PiB0aGlzLm9uVHJpZ2dlckNoYW5nZShldmVudCkpO1xuICAgIH1cblxuICAgIHByb3RlY3RlZCBvblRyaWdnZXJDaGFuZ2UoZXZlbnQ6IEV2ZW50KTogdm9pZCB7XG4gICAgICAgIGNvbnN0IHNlbGVjdFRhcmdldCA9IDxIVE1MU2VsZWN0RWxlbWVudD5ldmVudC5jdXJyZW50VGFyZ2V0O1xuXG4gICAgICAgIGlmICh0aGlzLmhhc1VybChzZWxlY3RUYXJnZXQpKSB7XG4gICAgICAgICAgICB3aW5kb3cubG9jYXRpb24uYXNzaWduKHRoaXMuY3VycmVudFNlbGVjdFZhbHVlKHNlbGVjdFRhcmdldCkpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgcHJvdGVjdGVkIGN1cnJlbnRTZWxlY3RWYWx1ZShzZWxlY3Q6IEhUTUxTZWxlY3RFbGVtZW50KTogc3RyaW5nIHtcbiAgICAgICAgcmV0dXJuIHNlbGVjdC5vcHRpb25zW3NlbGVjdC5zZWxlY3RlZEluZGV4XS52YWx1ZTtcbiAgICB9XG5cbiAgICBwcm90ZWN0ZWQgaGFzVXJsKHNlbGVjdDogSFRNTFNlbGVjdEVsZW1lbnQpOiBib29sZWFuIHtcbiAgICAgICAgcmV0dXJuICEhc2VsZWN0LnZhbHVlO1xuICAgIH1cbn1cbiJdLCJzb3VyY2VSb290IjoiIn0=