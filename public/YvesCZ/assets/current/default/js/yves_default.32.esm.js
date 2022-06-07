(window["webpackJsonp_yves_default"] = window["webpackJsonp_yves_default"] || []).push([[32],{

/***/ "./src/Pyz/Yves/ShopUi/Theme/default/components/molecules/pass-reset-flash-message/pass-reset-flash-message.ts":
/*!*********************************************************************************************************************!*\
  !*** ./src/Pyz/Yves/ShopUi/Theme/default/components/molecules/pass-reset-flash-message/pass-reset-flash-message.ts ***!
  \*********************************************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return PassResetFlashMessage; });
/* harmony import */ var ShopUi_models_component__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ShopUi/models/component */ "./vendor/spryker-shop/shop-ui/src/SprykerShop/Yves/ShopUi/Theme/default/models/component.ts");
/* harmony import */ var jquery_dist_jquery__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! jquery/dist/jquery */ "./node_modules/jquery/dist/jquery.js");
/* harmony import */ var jquery_dist_jquery__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(jquery_dist_jquery__WEBPACK_IMPORTED_MODULE_1__);
function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }



class PassResetFlashMessage extends ShopUi_models_component__WEBPACK_IMPORTED_MODULE_0__["default"] {
  constructor() {
    super(...arguments);

    _defineProperty(this, "$this", jquery_dist_jquery__WEBPACK_IMPORTED_MODULE_1___default()(this));

    _defineProperty(this, "flashMessage", void 0);

    _defineProperty(this, "meinKonto", void 0);

    _defineProperty(this, "passwordForgetLink", void 0);
  }

  readyCallback() {
    this.flashMessage = document.getElementById(this.getFlashMessage);
    this.meinKonto = document.getElementById(this.getLinkToLoginModal);
    this.passwordForgetLink = document.getElementById(this.getPasswordForgetLink);
    this.mapEvents();
  }

  mapEvents() {
    if (this.meinKonto != undefined) {
      this.meinKonto.addEventListener('click', event => {});
    }
  }

  triggerPopup(event) {
    if (event) {
      event.preventDefault();
    }

    this.$this.toggleClass(this.showClass);
  }

  get showClass() {
    return this.name + "--show";
  }

  get getFlashMessage() {
    return 'pass_reset_flash_message';
  }

  get getLinkToLoginModal() {
    return 'link-to-login-modal';
  }

  get getPasswordForgetLink() {
    return 'password-forget-link-my';
  }

  get getFlashMessageStaticLink() {
    return 'flash-message-static-link';
  }

}

/***/ })

}]);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vLi9zcmMvUHl6L1l2ZXMvU2hvcFVpL1RoZW1lL2RlZmF1bHQvY29tcG9uZW50cy9tb2xlY3VsZXMvcGFzcy1yZXNldC1mbGFzaC1tZXNzYWdlL3Bhc3MtcmVzZXQtZmxhc2gtbWVzc2FnZS50cyJdLCJuYW1lcyI6WyJQYXNzUmVzZXRGbGFzaE1lc3NhZ2UiLCJDb21wb25lbnQiLCIkIiwicmVhZHlDYWxsYmFjayIsImZsYXNoTWVzc2FnZSIsImRvY3VtZW50IiwiZ2V0RWxlbWVudEJ5SWQiLCJnZXRGbGFzaE1lc3NhZ2UiLCJtZWluS29udG8iLCJnZXRMaW5rVG9Mb2dpbk1vZGFsIiwicGFzc3dvcmRGb3JnZXRMaW5rIiwiZ2V0UGFzc3dvcmRGb3JnZXRMaW5rIiwibWFwRXZlbnRzIiwidW5kZWZpbmVkIiwiYWRkRXZlbnRMaXN0ZW5lciIsImV2ZW50IiwidHJpZ2dlclBvcHVwIiwicHJldmVudERlZmF1bHQiLCIkdGhpcyIsInRvZ2dsZUNsYXNzIiwic2hvd0NsYXNzIiwibmFtZSIsImdldEZsYXNoTWVzc2FnZVN0YXRpY0xpbmsiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUE7QUFDQTtBQUVlLE1BQU1BLHFCQUFOLFNBQW9DQywrREFBcEMsQ0FBOEM7QUFBQTtBQUFBOztBQUFBLG1DQUNwQ0MseURBQUMsQ0FBQyxJQUFELENBRG1DOztBQUFBOztBQUFBOztBQUFBO0FBQUE7O0FBTS9DQyxlQUFWLEdBQWdDO0FBQzVCLFNBQUtDLFlBQUwsR0FBb0JDLFFBQVEsQ0FBQ0MsY0FBVCxDQUF3QixLQUFLQyxlQUE3QixDQUFwQjtBQUNBLFNBQUtDLFNBQUwsR0FBaUJILFFBQVEsQ0FBQ0MsY0FBVCxDQUF3QixLQUFLRyxtQkFBN0IsQ0FBakI7QUFDQSxTQUFLQyxrQkFBTCxHQUEwQkwsUUFBUSxDQUFDQyxjQUFULENBQXdCLEtBQUtLLHFCQUE3QixDQUExQjtBQUVBLFNBQUtDLFNBQUw7QUFDSDs7QUFFU0EsV0FBVixHQUE0QjtBQUN4QixRQUFJLEtBQUtKLFNBQUwsSUFBa0JLLFNBQXRCLEVBQWlDO0FBQzdCLFdBQUtMLFNBQUwsQ0FBZU0sZ0JBQWYsQ0FBZ0MsT0FBaEMsRUFBd0NDLEtBQUssSUFBSSxDQUNoRCxDQUREO0FBRUg7QUFDSjs7QUFFREMsY0FBWSxDQUFDRCxLQUFELEVBQXNCO0FBQzlCLFFBQUlBLEtBQUosRUFBVztBQUNQQSxXQUFLLENBQUNFLGNBQU47QUFDSDs7QUFFRCxTQUFLQyxLQUFMLENBQVdDLFdBQVgsQ0FBdUIsS0FBS0MsU0FBNUI7QUFDSDs7QUFFRCxNQUFJQSxTQUFKLEdBQXdCO0FBQ3BCLFdBQVUsS0FBS0MsSUFBZjtBQUNIOztBQUVELE1BQUlkLGVBQUosR0FBOEI7QUFDMUIsV0FBTywwQkFBUDtBQUNIOztBQUVELE1BQUlFLG1CQUFKLEdBQWtDO0FBQzlCLFdBQU8scUJBQVA7QUFDSDs7QUFFRCxNQUFJRSxxQkFBSixHQUFvQztBQUNoQyxXQUFPLHlCQUFQO0FBQ0g7O0FBRUQsTUFBSVcseUJBQUosR0FBd0M7QUFDcEMsV0FBTywyQkFBUDtBQUNIOztBQS9Dd0QsQyIsImZpbGUiOiIuL2pzL3l2ZXNfZGVmYXVsdC4zMi5lc20uanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgQ29tcG9uZW50IGZyb20gJ1Nob3BVaS9tb2RlbHMvY29tcG9uZW50JztcbmltcG9ydCAkIGZyb20gJ2pxdWVyeS9kaXN0L2pxdWVyeSc7XG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIFBhc3NSZXNldEZsYXNoTWVzc2FnZSBleHRlbmRzIENvbXBvbmVudCB7XG4gICAgcHJvdGVjdGVkICR0aGlzOiAkID0gJCh0aGlzKTtcbiAgICBwcm90ZWN0ZWQgZmxhc2hNZXNzYWdlO1xuICAgIHByb3RlY3RlZCBtZWluS29udG87XG4gICAgcHJvdGVjdGVkIHBhc3N3b3JkRm9yZ2V0TGluaztcblxuICAgIHByb3RlY3RlZCByZWFkeUNhbGxiYWNrKCk6IHZvaWQge1xuICAgICAgICB0aGlzLmZsYXNoTWVzc2FnZSA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKHRoaXMuZ2V0Rmxhc2hNZXNzYWdlKTtcbiAgICAgICAgdGhpcy5tZWluS29udG8gPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCh0aGlzLmdldExpbmtUb0xvZ2luTW9kYWwpO1xuICAgICAgICB0aGlzLnBhc3N3b3JkRm9yZ2V0TGluayA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKHRoaXMuZ2V0UGFzc3dvcmRGb3JnZXRMaW5rKTtcblxuICAgICAgICB0aGlzLm1hcEV2ZW50cygpO1xuICAgIH1cblxuICAgIHByb3RlY3RlZCBtYXBFdmVudHMoKTogdm9pZCB7XG4gICAgICAgIGlmICh0aGlzLm1laW5Lb250byAhPSB1bmRlZmluZWQpIHtcbiAgICAgICAgICAgIHRoaXMubWVpbktvbnRvLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJyxldmVudCA9PiB7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIHRyaWdnZXJQb3B1cChldmVudD86IEV2ZW50KTogdm9pZCB7XG4gICAgICAgIGlmIChldmVudCkge1xuICAgICAgICAgICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcbiAgICAgICAgfVxuXG4gICAgICAgIHRoaXMuJHRoaXMudG9nZ2xlQ2xhc3ModGhpcy5zaG93Q2xhc3MpO1xuICAgIH1cblxuICAgIGdldCBzaG93Q2xhc3MoKTogc3RyaW5nIHtcbiAgICAgICAgcmV0dXJuIGAke3RoaXMubmFtZX0tLXNob3dgO1xuICAgIH1cblxuICAgIGdldCBnZXRGbGFzaE1lc3NhZ2UoKTogc3RyaW5nIHtcbiAgICAgICAgcmV0dXJuICdwYXNzX3Jlc2V0X2ZsYXNoX21lc3NhZ2UnO1xuICAgIH1cblxuICAgIGdldCBnZXRMaW5rVG9Mb2dpbk1vZGFsKCk6IHN0cmluZyB7XG4gICAgICAgIHJldHVybiAnbGluay10by1sb2dpbi1tb2RhbCc7XG4gICAgfVxuXG4gICAgZ2V0IGdldFBhc3N3b3JkRm9yZ2V0TGluaygpOiBzdHJpbmcge1xuICAgICAgICByZXR1cm4gJ3Bhc3N3b3JkLWZvcmdldC1saW5rLW15JztcbiAgICB9XG5cbiAgICBnZXQgZ2V0Rmxhc2hNZXNzYWdlU3RhdGljTGluaygpOiBzdHJpbmcge1xuICAgICAgICByZXR1cm4gJ2ZsYXNoLW1lc3NhZ2Utc3RhdGljLWxpbmsnO1xuICAgIH1cbn1cbiJdLCJzb3VyY2VSb290IjoiIn0=