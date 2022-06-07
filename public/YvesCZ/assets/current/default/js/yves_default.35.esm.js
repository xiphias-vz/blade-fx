(window["webpackJsonp_yves_default"] = window["webpackJsonp_yves_default"] || []).push([[35],{

/***/ "./src/Pyz/Yves/ShopUi/Theme/default/components/molecules/popup-ui-login-form-cz/popup-ui-login-form-cz.ts":
/*!*****************************************************************************************************************!*\
  !*** ./src/Pyz/Yves/ShopUi/Theme/default/components/molecules/popup-ui-login-form-cz/popup-ui-login-form-cz.ts ***!
  \*****************************************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return PopupUiLoginFormCz; });
/* harmony import */ var ShopUi_models_component__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ShopUi/models/component */ "./vendor/spryker-shop/shop-ui/src/SprykerShop/Yves/ShopUi/Theme/default/models/component.ts");
/* harmony import */ var jquery_dist_jquery__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! jquery/dist/jquery */ "./node_modules/jquery/dist/jquery.js");
/* harmony import */ var jquery_dist_jquery__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(jquery_dist_jquery__WEBPACK_IMPORTED_MODULE_1__);
function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }



class PopupUiLoginFormCz extends ShopUi_models_component__WEBPACK_IMPORTED_MODULE_0__["default"] {
  constructor() {
    super(...arguments);

    _defineProperty(this, "$this", jquery_dist_jquery__WEBPACK_IMPORTED_MODULE_1___default()(this));

    _defineProperty(this, "linkToLoginModal", void 0);

    _defineProperty(this, "linkToLoginModalMobile", void 0);

    _defineProperty(this, "closeModalBtn", void 0);
  }

  readyCallback() {
    this.linkToLoginModalMobile = document.getElementsByClassName(this.getLinkToLoginModal)[0];
    this.linkToLoginModal = document.getElementById(this.getLinkToLoginModal);
    this.closeModalBtn = this.$this.find(this.closeButtonSelector);
    this.mapEvents();
  }

  mapEvents() {
    if (this.linkToLoginModalMobile != undefined) {
      this.linkToLoginModalMobile.addEventListener('click', () => {
        this.$this.addClass(this.name + "--show");
      });
    }

    if (this.linkToLoginModal != undefined) {
      this.linkToLoginModal.addEventListener('click', () => {
        this.$this.addClass(this.name + "--show");
      });
    }

    this.closeModalBtn.on('click', () => {
      this.$this.toggleClass(this.showClass);
    });
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

  get closeButtonSelector() {
    return "." + this.name + "__close";
  }

  get getLinkToLoginModal() {
    return "link-to-login-modal";
  }

  get getIsUserLoggedIn() {
    return 'is_user_logged_in';
  }

}

/***/ })

}]);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vLi9zcmMvUHl6L1l2ZXMvU2hvcFVpL1RoZW1lL2RlZmF1bHQvY29tcG9uZW50cy9tb2xlY3VsZXMvcG9wdXAtdWktbG9naW4tZm9ybS1jei9wb3B1cC11aS1sb2dpbi1mb3JtLWN6LnRzIl0sIm5hbWVzIjpbIlBvcHVwVWlMb2dpbkZvcm1DeiIsIkNvbXBvbmVudCIsIiQiLCJyZWFkeUNhbGxiYWNrIiwibGlua1RvTG9naW5Nb2RhbE1vYmlsZSIsImRvY3VtZW50IiwiZ2V0RWxlbWVudHNCeUNsYXNzTmFtZSIsImdldExpbmtUb0xvZ2luTW9kYWwiLCJsaW5rVG9Mb2dpbk1vZGFsIiwiZ2V0RWxlbWVudEJ5SWQiLCJjbG9zZU1vZGFsQnRuIiwiJHRoaXMiLCJmaW5kIiwiY2xvc2VCdXR0b25TZWxlY3RvciIsIm1hcEV2ZW50cyIsInVuZGVmaW5lZCIsImFkZEV2ZW50TGlzdGVuZXIiLCJhZGRDbGFzcyIsIm5hbWUiLCJvbiIsInRvZ2dsZUNsYXNzIiwic2hvd0NsYXNzIiwidHJpZ2dlclBvcHVwIiwiZXZlbnQiLCJwcmV2ZW50RGVmYXVsdCIsImdldElzVXNlckxvZ2dlZEluIl0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7OztBQUFBO0FBQ0E7QUFFZSxNQUFNQSxrQkFBTixTQUFpQ0MsK0RBQWpDLENBQTJDO0FBQUE7QUFBQTs7QUFBQSxtQ0FDakNDLHlEQUFDLENBQUMsSUFBRCxDQURnQzs7QUFBQTs7QUFBQTs7QUFBQTtBQUFBOztBQU01Q0MsZUFBVixHQUFnQztBQUM1QixTQUFLQyxzQkFBTCxHQUE4QkMsUUFBUSxDQUFDQyxzQkFBVCxDQUFnQyxLQUFLQyxtQkFBckMsRUFBMEQsQ0FBMUQsQ0FBOUI7QUFDQSxTQUFLQyxnQkFBTCxHQUF3QkgsUUFBUSxDQUFDSSxjQUFULENBQXdCLEtBQUtGLG1CQUE3QixDQUF4QjtBQUNBLFNBQUtHLGFBQUwsR0FBcUIsS0FBS0MsS0FBTCxDQUFXQyxJQUFYLENBQWdCLEtBQUtDLG1CQUFyQixDQUFyQjtBQUNBLFNBQUtDLFNBQUw7QUFDSDs7QUFFU0EsV0FBVixHQUE0QjtBQUV4QixRQUFJLEtBQUtWLHNCQUFMLElBQStCVyxTQUFuQyxFQUE2QztBQUN6QyxXQUFLWCxzQkFBTCxDQUE0QlksZ0JBQTVCLENBQTZDLE9BQTdDLEVBQXNELE1BQU07QUFDeEQsYUFBS0wsS0FBTCxDQUFXTSxRQUFYLENBQXVCLEtBQUtDLElBQTVCO0FBQ0gsT0FGRDtBQUdIOztBQUVELFFBQUksS0FBS1YsZ0JBQUwsSUFBeUJPLFNBQTdCLEVBQXVDO0FBQ25DLFdBQUtQLGdCQUFMLENBQXNCUSxnQkFBdEIsQ0FBdUMsT0FBdkMsRUFBZ0QsTUFBTTtBQUNsRCxhQUFLTCxLQUFMLENBQVdNLFFBQVgsQ0FBdUIsS0FBS0MsSUFBNUI7QUFDSCxPQUZEO0FBR0g7O0FBRUQsU0FBS1IsYUFBTCxDQUFtQlMsRUFBbkIsQ0FBc0IsT0FBdEIsRUFBK0IsTUFBTTtBQUNqQyxXQUFLUixLQUFMLENBQVdTLFdBQVgsQ0FBdUIsS0FBS0MsU0FBNUI7QUFDSCxLQUZEO0FBSUg7O0FBRURDLGNBQVksQ0FBQ0MsS0FBRCxFQUFzQjtBQUM5QixRQUFJQSxLQUFKLEVBQVc7QUFDUEEsV0FBSyxDQUFDQyxjQUFOO0FBQ0g7O0FBRUQsU0FBS2IsS0FBTCxDQUFXUyxXQUFYLENBQXVCLEtBQUtDLFNBQTVCO0FBQ0g7O0FBRUQsTUFBSUEsU0FBSixHQUF3QjtBQUNwQixXQUFVLEtBQUtILElBQWY7QUFDSDs7QUFFRCxNQUFJTCxtQkFBSixHQUFrQztBQUM5QixpQkFBVyxLQUFLSyxJQUFoQjtBQUNIOztBQUVELE1BQUlYLG1CQUFKLEdBQWtDO0FBQzlCO0FBQ0g7O0FBRUQsTUFBSWtCLGlCQUFKLEdBQWdDO0FBQzVCLFdBQU8sbUJBQVA7QUFDSDs7QUF2RHFELEMiLCJmaWxlIjoiLi9qcy95dmVzX2RlZmF1bHQuMzUuZXNtLmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IENvbXBvbmVudCBmcm9tICdTaG9wVWkvbW9kZWxzL2NvbXBvbmVudCc7XG5pbXBvcnQgJCBmcm9tICdqcXVlcnkvZGlzdC9qcXVlcnknO1xuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBQb3B1cFVpTG9naW5Gb3JtQ3ogZXh0ZW5kcyBDb21wb25lbnQge1xuICAgIHByb3RlY3RlZCAkdGhpczogJCA9ICQodGhpcyk7XG4gICAgcHJvdGVjdGVkIGxpbmtUb0xvZ2luTW9kYWw7XG4gICAgcHJvdGVjdGVkIGxpbmtUb0xvZ2luTW9kYWxNb2JpbGU7XG4gICAgcHJvdGVjdGVkIGNsb3NlTW9kYWxCdG47XG5cbiAgICBwcm90ZWN0ZWQgcmVhZHlDYWxsYmFjaygpOiB2b2lkIHtcbiAgICAgICAgdGhpcy5saW5rVG9Mb2dpbk1vZGFsTW9iaWxlID0gZG9jdW1lbnQuZ2V0RWxlbWVudHNCeUNsYXNzTmFtZSh0aGlzLmdldExpbmtUb0xvZ2luTW9kYWwpWzBdO1xuICAgICAgICB0aGlzLmxpbmtUb0xvZ2luTW9kYWwgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCh0aGlzLmdldExpbmtUb0xvZ2luTW9kYWwpO1xuICAgICAgICB0aGlzLmNsb3NlTW9kYWxCdG4gPSB0aGlzLiR0aGlzLmZpbmQodGhpcy5jbG9zZUJ1dHRvblNlbGVjdG9yKTtcbiAgICAgICAgdGhpcy5tYXBFdmVudHMoKTtcbiAgICB9XG5cbiAgICBwcm90ZWN0ZWQgbWFwRXZlbnRzKCk6IHZvaWQge1xuXG4gICAgICAgIGlmICh0aGlzLmxpbmtUb0xvZ2luTW9kYWxNb2JpbGUgIT0gdW5kZWZpbmVkKXtcbiAgICAgICAgICAgIHRoaXMubGlua1RvTG9naW5Nb2RhbE1vYmlsZS5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsICgpID0+IHtcbiAgICAgICAgICAgICAgICB0aGlzLiR0aGlzLmFkZENsYXNzKGAke3RoaXMubmFtZX0tLXNob3dgKTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKHRoaXMubGlua1RvTG9naW5Nb2RhbCAhPSB1bmRlZmluZWQpe1xuICAgICAgICAgICAgdGhpcy5saW5rVG9Mb2dpbk1vZGFsLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgKCkgPT4ge1xuICAgICAgICAgICAgICAgIHRoaXMuJHRoaXMuYWRkQ2xhc3MoYCR7dGhpcy5uYW1lfS0tc2hvd2ApO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgIH1cblxuICAgICAgICB0aGlzLmNsb3NlTW9kYWxCdG4ub24oJ2NsaWNrJywgKCkgPT4ge1xuICAgICAgICAgICAgdGhpcy4kdGhpcy50b2dnbGVDbGFzcyh0aGlzLnNob3dDbGFzcyk7XG4gICAgICAgIH0pO1xuXG4gICAgfVxuXG4gICAgdHJpZ2dlclBvcHVwKGV2ZW50PzogRXZlbnQpOiB2b2lkIHtcbiAgICAgICAgaWYgKGV2ZW50KSB7XG4gICAgICAgICAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgICB9XG5cbiAgICAgICAgdGhpcy4kdGhpcy50b2dnbGVDbGFzcyh0aGlzLnNob3dDbGFzcyk7XG4gICAgfVxuXG4gICAgZ2V0IHNob3dDbGFzcygpOiBzdHJpbmcge1xuICAgICAgICByZXR1cm4gYCR7dGhpcy5uYW1lfS0tc2hvd2A7XG4gICAgfVxuXG4gICAgZ2V0IGNsb3NlQnV0dG9uU2VsZWN0b3IoKTogc3RyaW5nIHtcbiAgICAgICAgcmV0dXJuIGAuJHt0aGlzLm5hbWV9X19jbG9zZWA7XG4gICAgfVxuXG4gICAgZ2V0IGdldExpbmtUb0xvZ2luTW9kYWwoKTogc3RyaW5nIHtcbiAgICAgICAgcmV0dXJuIGBsaW5rLXRvLWxvZ2luLW1vZGFsYDtcbiAgICB9XG5cbiAgICBnZXQgZ2V0SXNVc2VyTG9nZ2VkSW4oKTogc3RyaW5nIHtcbiAgICAgICAgcmV0dXJuICdpc191c2VyX2xvZ2dlZF9pbic7XG4gICAgfVxufVxuIl0sInNvdXJjZVJvb3QiOiIifQ==