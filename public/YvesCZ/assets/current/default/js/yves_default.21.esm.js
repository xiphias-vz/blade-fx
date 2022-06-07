(window["webpackJsonp_yves_default"] = window["webpackJsonp_yves_default"] || []).push([[21],{

/***/ "./src/Pyz/Yves/ShopUi/Theme/default/components/molecules/cms-page-collapse-block/cms-page-collapse-block.ts":
/*!*******************************************************************************************************************!*\
  !*** ./src/Pyz/Yves/ShopUi/Theme/default/components/molecules/cms-page-collapse-block/cms-page-collapse-block.ts ***!
  \*******************************************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return CmsPageCollapseBlock; });
/* harmony import */ var ShopUi_models_component__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ShopUi/models/component */ "./vendor/spryker-shop/shop-ui/src/SprykerShop/Yves/ShopUi/Theme/default/models/component.ts");
function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }


class CmsPageCollapseBlock extends ShopUi_models_component__WEBPACK_IMPORTED_MODULE_0__["default"] {
  constructor() {
    super(...arguments);

    _defineProperty(this, "container", void 0);

    _defineProperty(this, "collapsibleHeaders", void 0);
  }

  readyCallback() {}

  init() {
    this.container = document.getElementsByClassName(this.collapseContainerClassName)[0];
    this.collapsibleHeaders = Array.from(this.container.querySelectorAll("." + this.collapseHeaderClassName));
    this.initCollapsible();
  }

  initCollapsible() {
    this.collapsibleHeaders.map(item => {
      item.addEventListener('click', event => {
        event.preventDefault();
        var targetElement = event.target;
        targetElement.toggleAttribute('aria-expanded');
        var targetAttribute = targetElement.getAttribute('href');
        this.container.querySelector(targetAttribute).classList.toggle(this.collapseContentInactiveClassName);
        this.container.querySelector(targetAttribute).classList.toggle(this.collapseContentActiveClassName);
      });
    });
  }

  get collapseContainerClassName() {
    return this.getAttribute('collapsible-container');
  }

  get collapseHeaderClassName() {
    return this.getAttribute('collapsible-header');
  }

  get collapseContentActiveClassName() {
    return this.getAttribute('collapsible-block-active-class');
  }

  get collapseContentInactiveClassName() {
    return this.getAttribute('collapsible-block-inactive-class');
  }

}

/***/ })

}]);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vLi9zcmMvUHl6L1l2ZXMvU2hvcFVpL1RoZW1lL2RlZmF1bHQvY29tcG9uZW50cy9tb2xlY3VsZXMvY21zLXBhZ2UtY29sbGFwc2UtYmxvY2svY21zLXBhZ2UtY29sbGFwc2UtYmxvY2sudHMiXSwibmFtZXMiOlsiQ21zUGFnZUNvbGxhcHNlQmxvY2siLCJDb21wb25lbnQiLCJyZWFkeUNhbGxiYWNrIiwiaW5pdCIsImNvbnRhaW5lciIsImRvY3VtZW50IiwiZ2V0RWxlbWVudHNCeUNsYXNzTmFtZSIsImNvbGxhcHNlQ29udGFpbmVyQ2xhc3NOYW1lIiwiY29sbGFwc2libGVIZWFkZXJzIiwiQXJyYXkiLCJmcm9tIiwicXVlcnlTZWxlY3RvckFsbCIsImNvbGxhcHNlSGVhZGVyQ2xhc3NOYW1lIiwiaW5pdENvbGxhcHNpYmxlIiwibWFwIiwiaXRlbSIsImFkZEV2ZW50TGlzdGVuZXIiLCJldmVudCIsInByZXZlbnREZWZhdWx0IiwidGFyZ2V0RWxlbWVudCIsInRhcmdldCIsInRvZ2dsZUF0dHJpYnV0ZSIsInRhcmdldEF0dHJpYnV0ZSIsImdldEF0dHJpYnV0ZSIsInF1ZXJ5U2VsZWN0b3IiLCJjbGFzc0xpc3QiLCJ0b2dnbGUiLCJjb2xsYXBzZUNvbnRlbnRJbmFjdGl2ZUNsYXNzTmFtZSIsImNvbGxhcHNlQ29udGVudEFjdGl2ZUNsYXNzTmFtZSJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7O0FBQUE7QUFFZSxNQUFNQSxvQkFBTixTQUFtQ0MsK0RBQW5DLENBQTZDO0FBQUE7QUFBQTs7QUFBQTs7QUFBQTtBQUFBOztBQUk5Q0MsZUFBVixHQUFnQyxDQUFFOztBQUV4QkMsTUFBVixHQUF1QjtBQUNuQixTQUFLQyxTQUFMLEdBQThCQyxRQUFRLENBQUNDLHNCQUFULENBQWdDLEtBQUtDLDBCQUFyQyxFQUFpRSxDQUFqRSxDQUE5QjtBQUNBLFNBQUtDLGtCQUFMLEdBQTBCQyxLQUFLLENBQUNDLElBQU4sQ0FBVyxLQUFLTixTQUFMLENBQWVPLGdCQUFmLE9BQW9DLEtBQUtDLHVCQUF6QyxDQUFYLENBQTFCO0FBQ0EsU0FBS0MsZUFBTDtBQUNIOztBQUVTQSxpQkFBVixHQUFrQztBQUM5QixTQUFLTCxrQkFBTCxDQUF3Qk0sR0FBeEIsQ0FBNEJDLElBQUksSUFBSTtBQUNoQ0EsVUFBSSxDQUFDQyxnQkFBTCxDQUFzQixPQUF0QixFQUFnQ0MsS0FBRCxJQUFrQjtBQUM3Q0EsYUFBSyxDQUFDQyxjQUFOO0FBQ0EsWUFBTUMsYUFBMEIsR0FBZ0JGLEtBQUssQ0FBQ0csTUFBdEQ7QUFDQUQscUJBQWEsQ0FBQ0UsZUFBZCxDQUE4QixlQUE5QjtBQUNBLFlBQU1DLGVBQWUsR0FBR0gsYUFBYSxDQUFDSSxZQUFkLENBQTJCLE1BQTNCLENBQXhCO0FBQ0EsYUFBS25CLFNBQUwsQ0FBZW9CLGFBQWYsQ0FBNkJGLGVBQTdCLEVBQThDRyxTQUE5QyxDQUF3REMsTUFBeEQsQ0FBK0QsS0FBS0MsZ0NBQXBFO0FBQ0EsYUFBS3ZCLFNBQUwsQ0FBZW9CLGFBQWYsQ0FBNkJGLGVBQTdCLEVBQThDRyxTQUE5QyxDQUF3REMsTUFBeEQsQ0FBK0QsS0FBS0UsOEJBQXBFO0FBQ0gsT0FQRDtBQVFILEtBVEQ7QUFVSDs7QUFFRCxNQUFjckIsMEJBQWQsR0FBbUQ7QUFDL0MsV0FBTyxLQUFLZ0IsWUFBTCxDQUFrQix1QkFBbEIsQ0FBUDtBQUNIOztBQUVELE1BQWNYLHVCQUFkLEdBQWdEO0FBQzVDLFdBQU8sS0FBS1csWUFBTCxDQUFrQixvQkFBbEIsQ0FBUDtBQUNIOztBQUVELE1BQWNLLDhCQUFkLEdBQXVEO0FBQ25ELFdBQU8sS0FBS0wsWUFBTCxDQUFrQixnQ0FBbEIsQ0FBUDtBQUNIOztBQUVELE1BQWNJLGdDQUFkLEdBQXlEO0FBQ3JELFdBQU8sS0FBS0osWUFBTCxDQUFrQixrQ0FBbEIsQ0FBUDtBQUNIOztBQXZDdUQsQyIsImZpbGUiOiIuL2pzL3l2ZXNfZGVmYXVsdC4yMS5lc20uanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgQ29tcG9uZW50IGZyb20gJ1Nob3BVaS9tb2RlbHMvY29tcG9uZW50JztcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgQ21zUGFnZUNvbGxhcHNlQmxvY2sgZXh0ZW5kcyBDb21wb25lbnQge1xuICAgIHByb3RlY3RlZCBjb250YWluZXI6IEhUTUxFbGVtZW50O1xuICAgIHByb3RlY3RlZCBjb2xsYXBzaWJsZUhlYWRlcnM6IEhUTUxFbGVtZW50W107XG5cbiAgICBwcm90ZWN0ZWQgcmVhZHlDYWxsYmFjaygpOiB2b2lkIHt9XG5cbiAgICBwcm90ZWN0ZWQgaW5pdCgpOiB2b2lkIHtcbiAgICAgICAgdGhpcy5jb250YWluZXIgPSA8SFRNTEVsZW1lbnQ+ZG9jdW1lbnQuZ2V0RWxlbWVudHNCeUNsYXNzTmFtZSh0aGlzLmNvbGxhcHNlQ29udGFpbmVyQ2xhc3NOYW1lKVswXTtcbiAgICAgICAgdGhpcy5jb2xsYXBzaWJsZUhlYWRlcnMgPSBBcnJheS5mcm9tKHRoaXMuY29udGFpbmVyLnF1ZXJ5U2VsZWN0b3JBbGwoYC4ke3RoaXMuY29sbGFwc2VIZWFkZXJDbGFzc05hbWV9YCkpO1xuICAgICAgICB0aGlzLmluaXRDb2xsYXBzaWJsZSgpO1xuICAgIH1cblxuICAgIHByb3RlY3RlZCBpbml0Q29sbGFwc2libGUoKTogdm9pZCB7XG4gICAgICAgIHRoaXMuY29sbGFwc2libGVIZWFkZXJzLm1hcChpdGVtID0+IHtcbiAgICAgICAgICAgIGl0ZW0uYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCAoZXZlbnQ6IEV2ZW50KSA9PiB7XG4gICAgICAgICAgICAgICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcbiAgICAgICAgICAgICAgICBjb25zdCB0YXJnZXRFbGVtZW50OiBIVE1MRWxlbWVudCA9IDxIVE1MRWxlbWVudD5ldmVudC50YXJnZXQ7XG4gICAgICAgICAgICAgICAgdGFyZ2V0RWxlbWVudC50b2dnbGVBdHRyaWJ1dGUoJ2FyaWEtZXhwYW5kZWQnKTtcbiAgICAgICAgICAgICAgICBjb25zdCB0YXJnZXRBdHRyaWJ1dGUgPSB0YXJnZXRFbGVtZW50LmdldEF0dHJpYnV0ZSgnaHJlZicpO1xuICAgICAgICAgICAgICAgIHRoaXMuY29udGFpbmVyLnF1ZXJ5U2VsZWN0b3IodGFyZ2V0QXR0cmlidXRlKS5jbGFzc0xpc3QudG9nZ2xlKHRoaXMuY29sbGFwc2VDb250ZW50SW5hY3RpdmVDbGFzc05hbWUpO1xuICAgICAgICAgICAgICAgIHRoaXMuY29udGFpbmVyLnF1ZXJ5U2VsZWN0b3IodGFyZ2V0QXR0cmlidXRlKS5jbGFzc0xpc3QudG9nZ2xlKHRoaXMuY29sbGFwc2VDb250ZW50QWN0aXZlQ2xhc3NOYW1lKTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9KTtcbiAgICB9XG5cbiAgICBwcm90ZWN0ZWQgZ2V0IGNvbGxhcHNlQ29udGFpbmVyQ2xhc3NOYW1lKCk6IHN0cmluZyB7XG4gICAgICAgIHJldHVybiB0aGlzLmdldEF0dHJpYnV0ZSgnY29sbGFwc2libGUtY29udGFpbmVyJyk7XG4gICAgfVxuXG4gICAgcHJvdGVjdGVkIGdldCBjb2xsYXBzZUhlYWRlckNsYXNzTmFtZSgpOiBzdHJpbmcge1xuICAgICAgICByZXR1cm4gdGhpcy5nZXRBdHRyaWJ1dGUoJ2NvbGxhcHNpYmxlLWhlYWRlcicpO1xuICAgIH1cblxuICAgIHByb3RlY3RlZCBnZXQgY29sbGFwc2VDb250ZW50QWN0aXZlQ2xhc3NOYW1lKCk6IHN0cmluZyB7XG4gICAgICAgIHJldHVybiB0aGlzLmdldEF0dHJpYnV0ZSgnY29sbGFwc2libGUtYmxvY2stYWN0aXZlLWNsYXNzJyk7XG4gICAgfVxuXG4gICAgcHJvdGVjdGVkIGdldCBjb2xsYXBzZUNvbnRlbnRJbmFjdGl2ZUNsYXNzTmFtZSgpOiBzdHJpbmcge1xuICAgICAgICByZXR1cm4gdGhpcy5nZXRBdHRyaWJ1dGUoJ2NvbGxhcHNpYmxlLWJsb2NrLWluYWN0aXZlLWNsYXNzJyk7XG4gICAgfVxufVxuIl0sInNvdXJjZVJvb3QiOiIifQ==