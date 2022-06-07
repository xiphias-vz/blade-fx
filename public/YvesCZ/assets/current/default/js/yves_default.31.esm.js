(window["webpackJsonp_yves_default"] = window["webpackJsonp_yves_default"] || []).push([[31],{

/***/ "./src/Pyz/Yves/ShopUi/Theme/default/components/molecules/navigation-top-mobile/navigation-top-mobile.ts":
/*!***************************************************************************************************************!*\
  !*** ./src/Pyz/Yves/ShopUi/Theme/default/components/molecules/navigation-top-mobile/navigation-top-mobile.ts ***!
  \***************************************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return NavigationTopMobile; });
/* harmony import */ var ShopUi_models_component__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ShopUi/models/component */ "./vendor/spryker-shop/shop-ui/src/SprykerShop/Yves/ShopUi/Theme/default/models/component.ts");
function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }


class NavigationTopMobile extends ShopUi_models_component__WEBPACK_IMPORTED_MODULE_0__["default"] {
  constructor() {
    super(...arguments);

    _defineProperty(this, "mobileSearchTriggerButton", void 0);

    _defineProperty(this, "mobileNavTriggerButton", void 0);

    _defineProperty(this, "isMobileSearchVisible", void 0);

    _defineProperty(this, "isMobileNavVisible", void 0);
  }

  readyCallback() {}

  init() {
    this.mobileSearchTriggerButton = this.querySelector("." + this.navTriggerButtonClassName);
    this.mobileNavTriggerButton = Array.from(this.querySelectorAll("." + this.mobileNavigationClassName));
    this.isMobileSearchVisible = false;
    this.isMobileNavVisible = false;
    this.mapEvents();
  }

  mapEvents() {
    this.mobileSearchTriggerButton.addEventListener('click', event => this.closeNavIfSearch(event));
    this.mobileNavTriggerButton.map(button => {
      button.addEventListener('click', event => this.closeSearchIfNav(event));
    });
  }

  closeNavIfSearch(event) {
    this.isMobileSearchVisible = !this.isMobileSearchVisible;

    if (!this.isMobileNavVisible) {
      return;
    }

    this.mobileNavTriggerButton.map(button => {
      if (button.classList.contains('is-hidden')) {
        return;
      }

      button.click();
    });
    var target = event.target;
    target.click();
  }

  closeSearchIfNav(event) {
    this.isMobileNavVisible = !this.isMobileNavVisible;

    if (!this.isMobileSearchVisible) {
      return;
    }

    this.mobileSearchTriggerButton.click();
    var target = event.target;
    target.click();
  }

  get navTriggerButtonClassName() {
    return this.getAttribute('mobile-search-trigger-button');
  }

  get mobileNavigationClassName() {
    return this.getAttribute('mobile-nav-trigger-button');
  }

}

/***/ })

}]);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vLi9zcmMvUHl6L1l2ZXMvU2hvcFVpL1RoZW1lL2RlZmF1bHQvY29tcG9uZW50cy9tb2xlY3VsZXMvbmF2aWdhdGlvbi10b3AtbW9iaWxlL25hdmlnYXRpb24tdG9wLW1vYmlsZS50cyJdLCJuYW1lcyI6WyJOYXZpZ2F0aW9uVG9wTW9iaWxlIiwiQ29tcG9uZW50IiwicmVhZHlDYWxsYmFjayIsImluaXQiLCJtb2JpbGVTZWFyY2hUcmlnZ2VyQnV0dG9uIiwicXVlcnlTZWxlY3RvciIsIm5hdlRyaWdnZXJCdXR0b25DbGFzc05hbWUiLCJtb2JpbGVOYXZUcmlnZ2VyQnV0dG9uIiwiQXJyYXkiLCJmcm9tIiwicXVlcnlTZWxlY3RvckFsbCIsIm1vYmlsZU5hdmlnYXRpb25DbGFzc05hbWUiLCJpc01vYmlsZVNlYXJjaFZpc2libGUiLCJpc01vYmlsZU5hdlZpc2libGUiLCJtYXBFdmVudHMiLCJhZGRFdmVudExpc3RlbmVyIiwiZXZlbnQiLCJjbG9zZU5hdklmU2VhcmNoIiwibWFwIiwiYnV0dG9uIiwiY2xvc2VTZWFyY2hJZk5hdiIsImNsYXNzTGlzdCIsImNvbnRhaW5zIiwiY2xpY2siLCJ0YXJnZXQiLCJnZXRBdHRyaWJ1dGUiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7OztBQUFBO0FBRWUsTUFBTUEsbUJBQU4sU0FBa0NDLCtEQUFsQyxDQUE0QztBQUFBO0FBQUE7O0FBQUE7O0FBQUE7O0FBQUE7O0FBQUE7QUFBQTs7QUFNN0NDLGVBQVYsR0FBZ0MsQ0FBRTs7QUFFeEJDLE1BQVYsR0FBdUI7QUFDbkIsU0FBS0MseUJBQUwsR0FBaUMsS0FBS0MsYUFBTCxPQUF1QixLQUFLQyx5QkFBNUIsQ0FBakM7QUFDQSxTQUFLQyxzQkFBTCxHQUE4QkMsS0FBSyxDQUFDQyxJQUFOLENBQVcsS0FBS0MsZ0JBQUwsT0FBMEIsS0FBS0MseUJBQS9CLENBQVgsQ0FBOUI7QUFDQSxTQUFLQyxxQkFBTCxHQUE2QixLQUE3QjtBQUNBLFNBQUtDLGtCQUFMLEdBQTBCLEtBQTFCO0FBQ0EsU0FBS0MsU0FBTDtBQUNIOztBQUVTQSxXQUFWLEdBQTRCO0FBQ3hCLFNBQUtWLHlCQUFMLENBQStCVyxnQkFBL0IsQ0FBZ0QsT0FBaEQsRUFBMERDLEtBQUQsSUFBa0IsS0FBS0MsZ0JBQUwsQ0FBc0JELEtBQXRCLENBQTNFO0FBQ0EsU0FBS1Qsc0JBQUwsQ0FBNEJXLEdBQTVCLENBQWdDQyxNQUFNLElBQUk7QUFDdENBLFlBQU0sQ0FBQ0osZ0JBQVAsQ0FBd0IsT0FBeEIsRUFBa0NDLEtBQUQsSUFBa0IsS0FBS0ksZ0JBQUwsQ0FBc0JKLEtBQXRCLENBQW5EO0FBQ0gsS0FGRDtBQUdIOztBQUVTQyxrQkFBVixDQUEyQkQsS0FBM0IsRUFBK0M7QUFDM0MsU0FBS0oscUJBQUwsR0FBNkIsQ0FBQyxLQUFLQSxxQkFBbkM7O0FBQ0EsUUFBSSxDQUFDLEtBQUtDLGtCQUFWLEVBQThCO0FBQzFCO0FBQ0g7O0FBRUQsU0FBS04sc0JBQUwsQ0FBNEJXLEdBQTVCLENBQWdDQyxNQUFNLElBQUk7QUFDdEMsVUFBSUEsTUFBTSxDQUFDRSxTQUFQLENBQWlCQyxRQUFqQixDQUEwQixXQUExQixDQUFKLEVBQTRDO0FBQ3hDO0FBQ0g7O0FBQ0RILFlBQU0sQ0FBQ0ksS0FBUDtBQUNILEtBTEQ7QUFPQSxRQUFNQyxNQUFNLEdBQWdCUixLQUFLLENBQUNRLE1BQWxDO0FBQ0FBLFVBQU0sQ0FBQ0QsS0FBUDtBQUNIOztBQUVTSCxrQkFBVixDQUEyQkosS0FBM0IsRUFBK0M7QUFDM0MsU0FBS0gsa0JBQUwsR0FBMEIsQ0FBQyxLQUFLQSxrQkFBaEM7O0FBQ0EsUUFBSSxDQUFDLEtBQUtELHFCQUFWLEVBQWlDO0FBQzdCO0FBQ0g7O0FBRUQsU0FBS1IseUJBQUwsQ0FBK0JtQixLQUEvQjtBQUNBLFFBQU1DLE1BQU0sR0FBZ0JSLEtBQUssQ0FBQ1EsTUFBbEM7QUFDQUEsVUFBTSxDQUFDRCxLQUFQO0FBQ0g7O0FBRUQsTUFBY2pCLHlCQUFkLEdBQWtEO0FBQzlDLFdBQU8sS0FBS21CLFlBQUwsQ0FBa0IsOEJBQWxCLENBQVA7QUFDSDs7QUFFRCxNQUFjZCx5QkFBZCxHQUFrRDtBQUM5QyxXQUFPLEtBQUtjLFlBQUwsQ0FBa0IsMkJBQWxCLENBQVA7QUFDSDs7QUF6RHNELEMiLCJmaWxlIjoiLi9qcy95dmVzX2RlZmF1bHQuMzEuZXNtLmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IENvbXBvbmVudCBmcm9tICdTaG9wVWkvbW9kZWxzL2NvbXBvbmVudCc7XG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIE5hdmlnYXRpb25Ub3BNb2JpbGUgZXh0ZW5kcyBDb21wb25lbnQge1xuICAgIHByb3RlY3RlZCBtb2JpbGVTZWFyY2hUcmlnZ2VyQnV0dG9uOiBIVE1MQnV0dG9uRWxlbWVudDtcbiAgICBwcm90ZWN0ZWQgbW9iaWxlTmF2VHJpZ2dlckJ1dHRvbjogSFRNTEVsZW1lbnRbXTtcbiAgICBwcm90ZWN0ZWQgaXNNb2JpbGVTZWFyY2hWaXNpYmxlOiBCb29sZWFuO1xuICAgIHByb3RlY3RlZCBpc01vYmlsZU5hdlZpc2libGU6IEJvb2xlYW47XG5cbiAgICBwcm90ZWN0ZWQgcmVhZHlDYWxsYmFjaygpOiB2b2lkIHt9XG5cbiAgICBwcm90ZWN0ZWQgaW5pdCgpOiB2b2lkIHtcbiAgICAgICAgdGhpcy5tb2JpbGVTZWFyY2hUcmlnZ2VyQnV0dG9uID0gdGhpcy5xdWVyeVNlbGVjdG9yKGAuJHt0aGlzLm5hdlRyaWdnZXJCdXR0b25DbGFzc05hbWV9YCk7XG4gICAgICAgIHRoaXMubW9iaWxlTmF2VHJpZ2dlckJ1dHRvbiA9IEFycmF5LmZyb20odGhpcy5xdWVyeVNlbGVjdG9yQWxsKGAuJHt0aGlzLm1vYmlsZU5hdmlnYXRpb25DbGFzc05hbWV9YCkpO1xuICAgICAgICB0aGlzLmlzTW9iaWxlU2VhcmNoVmlzaWJsZSA9IGZhbHNlO1xuICAgICAgICB0aGlzLmlzTW9iaWxlTmF2VmlzaWJsZSA9IGZhbHNlO1xuICAgICAgICB0aGlzLm1hcEV2ZW50cygpO1xuICAgIH1cblxuICAgIHByb3RlY3RlZCBtYXBFdmVudHMoKTogdm9pZCB7XG4gICAgICAgIHRoaXMubW9iaWxlU2VhcmNoVHJpZ2dlckJ1dHRvbi5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIChldmVudDogRXZlbnQpID0+IHRoaXMuY2xvc2VOYXZJZlNlYXJjaChldmVudCkpO1xuICAgICAgICB0aGlzLm1vYmlsZU5hdlRyaWdnZXJCdXR0b24ubWFwKGJ1dHRvbiA9PiB7XG4gICAgICAgICAgICBidXR0b24uYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCAoZXZlbnQ6IEV2ZW50KSA9PiB0aGlzLmNsb3NlU2VhcmNoSWZOYXYoZXZlbnQpKTtcbiAgICAgICAgfSk7XG4gICAgfVxuXG4gICAgcHJvdGVjdGVkIGNsb3NlTmF2SWZTZWFyY2goZXZlbnQ6IEV2ZW50KTogdm9pZCB7XG4gICAgICAgIHRoaXMuaXNNb2JpbGVTZWFyY2hWaXNpYmxlID0gIXRoaXMuaXNNb2JpbGVTZWFyY2hWaXNpYmxlO1xuICAgICAgICBpZiAoIXRoaXMuaXNNb2JpbGVOYXZWaXNpYmxlKSB7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cblxuICAgICAgICB0aGlzLm1vYmlsZU5hdlRyaWdnZXJCdXR0b24ubWFwKGJ1dHRvbiA9PiB7XG4gICAgICAgICAgICBpZiAoYnV0dG9uLmNsYXNzTGlzdC5jb250YWlucygnaXMtaGlkZGVuJykpIHtcbiAgICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBidXR0b24uY2xpY2soKTtcbiAgICAgICAgfSk7XG5cbiAgICAgICAgY29uc3QgdGFyZ2V0ID0gPEhUTUxFbGVtZW50PmV2ZW50LnRhcmdldDtcbiAgICAgICAgdGFyZ2V0LmNsaWNrKCk7XG4gICAgfVxuXG4gICAgcHJvdGVjdGVkIGNsb3NlU2VhcmNoSWZOYXYoZXZlbnQ6IEV2ZW50KTogdm9pZCB7XG4gICAgICAgIHRoaXMuaXNNb2JpbGVOYXZWaXNpYmxlID0gIXRoaXMuaXNNb2JpbGVOYXZWaXNpYmxlO1xuICAgICAgICBpZiAoIXRoaXMuaXNNb2JpbGVTZWFyY2hWaXNpYmxlKSB7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cblxuICAgICAgICB0aGlzLm1vYmlsZVNlYXJjaFRyaWdnZXJCdXR0b24uY2xpY2soKTtcbiAgICAgICAgY29uc3QgdGFyZ2V0ID0gPEhUTUxFbGVtZW50PmV2ZW50LnRhcmdldDtcbiAgICAgICAgdGFyZ2V0LmNsaWNrKCk7XG4gICAgfVxuXG4gICAgcHJvdGVjdGVkIGdldCBuYXZUcmlnZ2VyQnV0dG9uQ2xhc3NOYW1lKCk6IHN0cmluZyB7XG4gICAgICAgIHJldHVybiB0aGlzLmdldEF0dHJpYnV0ZSgnbW9iaWxlLXNlYXJjaC10cmlnZ2VyLWJ1dHRvbicpO1xuICAgIH1cblxuICAgIHByb3RlY3RlZCBnZXQgbW9iaWxlTmF2aWdhdGlvbkNsYXNzTmFtZSgpOiBzdHJpbmcge1xuICAgICAgICByZXR1cm4gdGhpcy5nZXRBdHRyaWJ1dGUoJ21vYmlsZS1uYXYtdHJpZ2dlci1idXR0b24nKTtcbiAgICB9XG59XG4iXSwic291cmNlUm9vdCI6IiJ9