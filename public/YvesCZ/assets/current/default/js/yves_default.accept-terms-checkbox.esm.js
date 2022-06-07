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
/* harmony import */ var ShopUi_models_component__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ShopUi/models/component */ "./vendor/spryker-shop/shop-ui/src/SprykerShop/Yves/ShopUi/Theme/default/models/component.ts");
function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }


class AcceptTermsCheckbox extends ShopUi_models_component__WEBPACK_IMPORTED_MODULE_0__["default"] {
  constructor() {
    super(...arguments);

    _defineProperty(this, "trigger", void 0);

    _defineProperty(this, "target", void 0);
  }

  readyCallback() {}

  init() {
    this.trigger = this.getElementsByClassName(this.jsName + "__trigger")[0];
    this.target = document.getElementsByClassName(this.targetClassName)[0];
    this.toggleTargetDisabling();
    this.mapEvents();
  }

  mapEvents() {
    this.mapTriggerChangeEvent();
  }

  mapTriggerChangeEvent() {
    this.trigger.addEventListener('change', () => this.onTriggerChange());
  }

  onTriggerChange() {
    this.toggleTargetDisabling();
  }

  toggleTargetDisabling() {
    if (!this.target) {
      return;
    }

    if (!this.trigger.checked) {
      this.target.disabled = true;
      return;
    }

    this.target.disabled = false;
  }

  get targetClassName() {
    return this.getAttribute('target-class-name');
  }

}

/***/ })

}]);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vLi92ZW5kb3Ivc3ByeWtlci1zaG9wL2NoZWNrb3V0LXBhZ2Uvc3JjL1NwcnlrZXJTaG9wL1l2ZXMvQ2hlY2tvdXRQYWdlL1RoZW1lL2RlZmF1bHQvY29tcG9uZW50cy9tb2xlY3VsZXMvYWNjZXB0LXRlcm1zLWNoZWNrYm94L2FjY2VwdC10ZXJtcy1jaGVja2JveC50cyJdLCJuYW1lcyI6WyJBY2NlcHRUZXJtc0NoZWNrYm94IiwiQ29tcG9uZW50IiwicmVhZHlDYWxsYmFjayIsImluaXQiLCJ0cmlnZ2VyIiwiZ2V0RWxlbWVudHNCeUNsYXNzTmFtZSIsImpzTmFtZSIsInRhcmdldCIsImRvY3VtZW50IiwidGFyZ2V0Q2xhc3NOYW1lIiwidG9nZ2xlVGFyZ2V0RGlzYWJsaW5nIiwibWFwRXZlbnRzIiwibWFwVHJpZ2dlckNoYW5nZUV2ZW50IiwiYWRkRXZlbnRMaXN0ZW5lciIsIm9uVHJpZ2dlckNoYW5nZSIsImNoZWNrZWQiLCJkaXNhYmxlZCIsImdldEF0dHJpYnV0ZSJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7O0FBQUE7QUFFZSxNQUFNQSxtQkFBTixTQUFrQ0MsK0RBQWxDLENBQTRDO0FBQUE7QUFBQTs7QUFBQTs7QUFBQTtBQUFBOztBQUk3Q0MsZUFBVixHQUFnQyxDQUFFOztBQUV4QkMsTUFBVixHQUF1QjtBQUNuQixTQUFLQyxPQUFMLEdBQWlDLEtBQUtDLHNCQUFMLENBQStCLEtBQUtDLE1BQXBDLGdCQUF1RCxDQUF2RCxDQUFqQztBQUNBLFNBQUtDLE1BQUwsR0FBaUNDLFFBQVEsQ0FBQ0gsc0JBQVQsQ0FBZ0MsS0FBS0ksZUFBckMsRUFBc0QsQ0FBdEQsQ0FBakM7QUFFQSxTQUFLQyxxQkFBTDtBQUNBLFNBQUtDLFNBQUw7QUFDSDs7QUFFU0EsV0FBVixHQUE0QjtBQUN4QixTQUFLQyxxQkFBTDtBQUNIOztBQUVTQSx1QkFBVixHQUF3QztBQUNwQyxTQUFLUixPQUFMLENBQWFTLGdCQUFiLENBQThCLFFBQTlCLEVBQXdDLE1BQU0sS0FBS0MsZUFBTCxFQUE5QztBQUNIOztBQUVTQSxpQkFBVixHQUFrQztBQUM5QixTQUFLSixxQkFBTDtBQUNIOztBQUVTQSx1QkFBVixHQUF3QztBQUNwQyxRQUFJLENBQUMsS0FBS0gsTUFBVixFQUFrQjtBQUNkO0FBQ0g7O0FBRUQsUUFBSSxDQUFDLEtBQUtILE9BQUwsQ0FBYVcsT0FBbEIsRUFBMkI7QUFDdkIsV0FBS1IsTUFBTCxDQUFZUyxRQUFaLEdBQXVCLElBQXZCO0FBRUE7QUFDSDs7QUFFRCxTQUFLVCxNQUFMLENBQVlTLFFBQVosR0FBdUIsS0FBdkI7QUFDSDs7QUFFRCxNQUFjUCxlQUFkLEdBQXdDO0FBQ3BDLFdBQU8sS0FBS1EsWUFBTCxDQUFrQixtQkFBbEIsQ0FBUDtBQUNIOztBQTFDc0QsQyIsImZpbGUiOiIuL2pzL3l2ZXNfZGVmYXVsdC5hY2NlcHQtdGVybXMtY2hlY2tib3guZXNtLmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IENvbXBvbmVudCBmcm9tICdTaG9wVWkvbW9kZWxzL2NvbXBvbmVudCc7XG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIEFjY2VwdFRlcm1zQ2hlY2tib3ggZXh0ZW5kcyBDb21wb25lbnQge1xuICAgIHByb3RlY3RlZCB0cmlnZ2VyOiBIVE1MSW5wdXRFbGVtZW50O1xuICAgIHByb3RlY3RlZCB0YXJnZXQ6IEhUTUxCdXR0b25FbGVtZW50O1xuXG4gICAgcHJvdGVjdGVkIHJlYWR5Q2FsbGJhY2soKTogdm9pZCB7fVxuXG4gICAgcHJvdGVjdGVkIGluaXQoKTogdm9pZCB7XG4gICAgICAgIHRoaXMudHJpZ2dlciA9IDxIVE1MSW5wdXRFbGVtZW50PnRoaXMuZ2V0RWxlbWVudHNCeUNsYXNzTmFtZShgJHt0aGlzLmpzTmFtZX1fX3RyaWdnZXJgKVswXTtcbiAgICAgICAgdGhpcy50YXJnZXQgPSA8SFRNTEJ1dHRvbkVsZW1lbnQ+ZG9jdW1lbnQuZ2V0RWxlbWVudHNCeUNsYXNzTmFtZSh0aGlzLnRhcmdldENsYXNzTmFtZSlbMF07XG5cbiAgICAgICAgdGhpcy50b2dnbGVUYXJnZXREaXNhYmxpbmcoKTtcbiAgICAgICAgdGhpcy5tYXBFdmVudHMoKTtcbiAgICB9XG5cbiAgICBwcm90ZWN0ZWQgbWFwRXZlbnRzKCk6IHZvaWQge1xuICAgICAgICB0aGlzLm1hcFRyaWdnZXJDaGFuZ2VFdmVudCgpO1xuICAgIH1cblxuICAgIHByb3RlY3RlZCBtYXBUcmlnZ2VyQ2hhbmdlRXZlbnQoKTogdm9pZCB7XG4gICAgICAgIHRoaXMudHJpZ2dlci5hZGRFdmVudExpc3RlbmVyKCdjaGFuZ2UnLCAoKSA9PiB0aGlzLm9uVHJpZ2dlckNoYW5nZSgpKTtcbiAgICB9XG5cbiAgICBwcm90ZWN0ZWQgb25UcmlnZ2VyQ2hhbmdlKCk6IHZvaWQge1xuICAgICAgICB0aGlzLnRvZ2dsZVRhcmdldERpc2FibGluZygpO1xuICAgIH1cblxuICAgIHByb3RlY3RlZCB0b2dnbGVUYXJnZXREaXNhYmxpbmcoKTogdm9pZCB7XG4gICAgICAgIGlmICghdGhpcy50YXJnZXQpIHtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmICghdGhpcy50cmlnZ2VyLmNoZWNrZWQpIHtcbiAgICAgICAgICAgIHRoaXMudGFyZ2V0LmRpc2FibGVkID0gdHJ1ZTtcblxuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG5cbiAgICAgICAgdGhpcy50YXJnZXQuZGlzYWJsZWQgPSBmYWxzZTtcbiAgICB9XG5cbiAgICBwcm90ZWN0ZWQgZ2V0IHRhcmdldENsYXNzTmFtZSgpOiBzdHJpbmcge1xuICAgICAgICByZXR1cm4gdGhpcy5nZXRBdHRyaWJ1dGUoJ3RhcmdldC1jbGFzcy1uYW1lJyk7XG4gICAgfVxufVxuIl0sInNvdXJjZVJvb3QiOiIifQ==