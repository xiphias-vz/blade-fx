(window["webpackJsonp_yves_default"] = window["webpackJsonp_yves_default"] || []).push([["password-field"],{

/***/ "./vendor/spryker-shop/shop-ui/src/SprykerShop/Yves/ShopUi/Theme/default/components/molecules/password-field/password-field.ts":
/*!*************************************************************************************************************************************!*\
  !*** ./vendor/spryker-shop/shop-ui/src/SprykerShop/Yves/ShopUi/Theme/default/components/molecules/password-field/password-field.ts ***!
  \*************************************************************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return PasswordField; });
/* harmony import */ var ShopUi_models_component__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ShopUi/models/component */ "./vendor/spryker-shop/shop-ui/src/SprykerShop/Yves/ShopUi/Theme/default/models/component.ts");
function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }


class PasswordField extends ShopUi_models_component__WEBPACK_IMPORTED_MODULE_0__["default"] {
  constructor() {
    super(...arguments);

    _defineProperty(this, "isPasswordShown", false);

    _defineProperty(this, "button", void 0);

    _defineProperty(this, "input", void 0);
  }

  readyCallback() {}

  init() {
    this.button = this.getElementsByClassName(this.buttonClassName)[0];
    this.input = this.getElementsByClassName(this.jsName + "__input")[0];
    this.mapEvents();
  }

  mapEvents() {
    this.mapButtonClickEvent();
  }

  mapButtonClickEvent() {
    this.button.addEventListener('click', () => this.onClick());
  }

  onClick() {
    this.isPasswordShown = !this.isPasswordShown;
    this.toggleInputType();
    this.toggleButtonClass();
  }

  toggleInputType() {
    this.input.setAttribute('type', this.isPasswordShown ? 'text' : 'password');
  }

  toggleButtonClass() {
    this.button.classList.toggle(this.buttonToggleClassName, this.isPasswordShown);
  }

  get buttonClassName() {
    return this.getAttribute('button-class-name');
  }

  get buttonToggleClassName() {
    return this.getAttribute('button-toggle-class-name');
  }

}

/***/ })

}]);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vLi92ZW5kb3Ivc3ByeWtlci1zaG9wL3Nob3AtdWkvc3JjL1NwcnlrZXJTaG9wL1l2ZXMvU2hvcFVpL1RoZW1lL2RlZmF1bHQvY29tcG9uZW50cy9tb2xlY3VsZXMvcGFzc3dvcmQtZmllbGQvcGFzc3dvcmQtZmllbGQudHMiXSwibmFtZXMiOlsiUGFzc3dvcmRGaWVsZCIsIkNvbXBvbmVudCIsInJlYWR5Q2FsbGJhY2siLCJpbml0IiwiYnV0dG9uIiwiZ2V0RWxlbWVudHNCeUNsYXNzTmFtZSIsImJ1dHRvbkNsYXNzTmFtZSIsImlucHV0IiwianNOYW1lIiwibWFwRXZlbnRzIiwibWFwQnV0dG9uQ2xpY2tFdmVudCIsImFkZEV2ZW50TGlzdGVuZXIiLCJvbkNsaWNrIiwiaXNQYXNzd29yZFNob3duIiwidG9nZ2xlSW5wdXRUeXBlIiwidG9nZ2xlQnV0dG9uQ2xhc3MiLCJzZXRBdHRyaWJ1dGUiLCJjbGFzc0xpc3QiLCJ0b2dnbGUiLCJidXR0b25Ub2dnbGVDbGFzc05hbWUiLCJnZXRBdHRyaWJ1dGUiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7OztBQUFBO0FBRWUsTUFBTUEsYUFBTixTQUE0QkMsK0RBQTVCLENBQXNDO0FBQUE7QUFBQTs7QUFBQSw2Q0FDckIsS0FEcUI7O0FBQUE7O0FBQUE7QUFBQTs7QUFLdkNDLGVBQVYsR0FBZ0MsQ0FBRTs7QUFFeEJDLE1BQVYsR0FBdUI7QUFDbkIsU0FBS0MsTUFBTCxHQUEyQixLQUFLQyxzQkFBTCxDQUE0QixLQUFLQyxlQUFqQyxFQUFrRCxDQUFsRCxDQUEzQjtBQUNBLFNBQUtDLEtBQUwsR0FBK0IsS0FBS0Ysc0JBQUwsQ0FBK0IsS0FBS0csTUFBcEMsY0FBcUQsQ0FBckQsQ0FBL0I7QUFFQSxTQUFLQyxTQUFMO0FBQ0g7O0FBRVNBLFdBQVYsR0FBNEI7QUFDeEIsU0FBS0MsbUJBQUw7QUFDSDs7QUFFU0EscUJBQVYsR0FBc0M7QUFDbEMsU0FBS04sTUFBTCxDQUFZTyxnQkFBWixDQUE2QixPQUE3QixFQUFzQyxNQUFNLEtBQUtDLE9BQUwsRUFBNUM7QUFDSDs7QUFFU0EsU0FBVixHQUEwQjtBQUN0QixTQUFLQyxlQUFMLEdBQXVCLENBQUMsS0FBS0EsZUFBN0I7QUFFQSxTQUFLQyxlQUFMO0FBQ0EsU0FBS0MsaUJBQUw7QUFDSDs7QUFFU0QsaUJBQVYsR0FBa0M7QUFDOUIsU0FBS1AsS0FBTCxDQUFXUyxZQUFYLENBQXdCLE1BQXhCLEVBQWdDLEtBQUtILGVBQUwsR0FBdUIsTUFBdkIsR0FBZ0MsVUFBaEU7QUFDSDs7QUFFU0UsbUJBQVYsR0FBb0M7QUFDaEMsU0FBS1gsTUFBTCxDQUFZYSxTQUFaLENBQXNCQyxNQUF0QixDQUE2QixLQUFLQyxxQkFBbEMsRUFBeUQsS0FBS04sZUFBOUQ7QUFDSDs7QUFFRCxNQUFjUCxlQUFkLEdBQXdDO0FBQ3BDLFdBQU8sS0FBS2MsWUFBTCxDQUFrQixtQkFBbEIsQ0FBUDtBQUNIOztBQUVELE1BQWNELHFCQUFkLEdBQThDO0FBQzFDLFdBQU8sS0FBS0MsWUFBTCxDQUFrQiwwQkFBbEIsQ0FBUDtBQUNIOztBQTNDZ0QsQyIsImZpbGUiOiIuL2pzL3l2ZXNfZGVmYXVsdC5wYXNzd29yZC1maWVsZC5lc20uanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgQ29tcG9uZW50IGZyb20gJ1Nob3BVaS9tb2RlbHMvY29tcG9uZW50JztcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgUGFzc3dvcmRGaWVsZCBleHRlbmRzIENvbXBvbmVudCB7XG4gICAgcHJvdGVjdGVkIGlzUGFzc3dvcmRTaG93biA9IGZhbHNlO1xuICAgIHByb3RlY3RlZCBidXR0b246IEhUTUxFbGVtZW50O1xuICAgIHByb3RlY3RlZCBpbnB1dDogSFRNTElucHV0RWxlbWVudDtcblxuICAgIHByb3RlY3RlZCByZWFkeUNhbGxiYWNrKCk6IHZvaWQge31cblxuICAgIHByb3RlY3RlZCBpbml0KCk6IHZvaWQge1xuICAgICAgICB0aGlzLmJ1dHRvbiA9IDxIVE1MRWxlbWVudD50aGlzLmdldEVsZW1lbnRzQnlDbGFzc05hbWUodGhpcy5idXR0b25DbGFzc05hbWUpWzBdO1xuICAgICAgICB0aGlzLmlucHV0ID0gPEhUTUxJbnB1dEVsZW1lbnQ+dGhpcy5nZXRFbGVtZW50c0J5Q2xhc3NOYW1lKGAke3RoaXMuanNOYW1lfV9faW5wdXRgKVswXTtcblxuICAgICAgICB0aGlzLm1hcEV2ZW50cygpO1xuICAgIH1cblxuICAgIHByb3RlY3RlZCBtYXBFdmVudHMoKTogdm9pZCB7XG4gICAgICAgIHRoaXMubWFwQnV0dG9uQ2xpY2tFdmVudCgpO1xuICAgIH1cblxuICAgIHByb3RlY3RlZCBtYXBCdXR0b25DbGlja0V2ZW50KCk6IHZvaWQge1xuICAgICAgICB0aGlzLmJ1dHRvbi5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsICgpID0+IHRoaXMub25DbGljaygpKTtcbiAgICB9XG5cbiAgICBwcm90ZWN0ZWQgb25DbGljaygpOiB2b2lkIHtcbiAgICAgICAgdGhpcy5pc1Bhc3N3b3JkU2hvd24gPSAhdGhpcy5pc1Bhc3N3b3JkU2hvd247XG5cbiAgICAgICAgdGhpcy50b2dnbGVJbnB1dFR5cGUoKTtcbiAgICAgICAgdGhpcy50b2dnbGVCdXR0b25DbGFzcygpO1xuICAgIH1cblxuICAgIHByb3RlY3RlZCB0b2dnbGVJbnB1dFR5cGUoKTogdm9pZCB7XG4gICAgICAgIHRoaXMuaW5wdXQuc2V0QXR0cmlidXRlKCd0eXBlJywgdGhpcy5pc1Bhc3N3b3JkU2hvd24gPyAndGV4dCcgOiAncGFzc3dvcmQnKTtcbiAgICB9XG5cbiAgICBwcm90ZWN0ZWQgdG9nZ2xlQnV0dG9uQ2xhc3MoKTogdm9pZCB7XG4gICAgICAgIHRoaXMuYnV0dG9uLmNsYXNzTGlzdC50b2dnbGUodGhpcy5idXR0b25Ub2dnbGVDbGFzc05hbWUsIHRoaXMuaXNQYXNzd29yZFNob3duKTtcbiAgICB9XG5cbiAgICBwcm90ZWN0ZWQgZ2V0IGJ1dHRvbkNsYXNzTmFtZSgpOiBzdHJpbmcge1xuICAgICAgICByZXR1cm4gdGhpcy5nZXRBdHRyaWJ1dGUoJ2J1dHRvbi1jbGFzcy1uYW1lJyk7XG4gICAgfVxuXG4gICAgcHJvdGVjdGVkIGdldCBidXR0b25Ub2dnbGVDbGFzc05hbWUoKTogc3RyaW5nIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuZ2V0QXR0cmlidXRlKCdidXR0b24tdG9nZ2xlLWNsYXNzLW5hbWUnKTtcbiAgICB9XG59XG4iXSwic291cmNlUm9vdCI6IiJ9