(window["webpackJsonp_yves_default"] = window["webpackJsonp_yves_default"] || []).push([[20],{

/***/ "./src/Pyz/Yves/ShopUi/Theme/default/components/molecules/breadcrumb-step/breadcrumb-step.ts":
/*!***************************************************************************************************!*\
  !*** ./src/Pyz/Yves/ShopUi/Theme/default/components/molecules/breadcrumb-step/breadcrumb-step.ts ***!
  \***************************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return BreadcrumbStep; });
/* harmony import */ var ShopUi_models_component__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ShopUi/models/component */ "./vendor/spryker-shop/shop-ui/src/SprykerShop/Yves/ShopUi/Theme/default/models/component.ts");

class BreadcrumbStep extends ShopUi_models_component__WEBPACK_IMPORTED_MODULE_0__["default"] {
  readyCallback() {}

  init() {
    this.removeLinkToForwardedBreadCrumbs();
  }

  removeLinkToForwardedBreadCrumbs() {
    var breadCrumbHolder = this.parentElement;
    var activeBreadCrumb = breadCrumbHolder.querySelector('.breadcrumb-step--active');
    if (!activeBreadCrumb) return;
    var nextSibling = activeBreadCrumb.nextElementSibling;

    while (nextSibling) {
      var breadCrumbLink = nextSibling.querySelector('a');

      if (breadCrumbLink !== null) {
        breadCrumbLink.removeAttribute('href');
        breadCrumbLink.style.cursor = 'auto';
      }

      nextSibling = nextSibling.nextElementSibling;
    }
  }

}

/***/ })

}]);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vLi9zcmMvUHl6L1l2ZXMvU2hvcFVpL1RoZW1lL2RlZmF1bHQvY29tcG9uZW50cy9tb2xlY3VsZXMvYnJlYWRjcnVtYi1zdGVwL2JyZWFkY3J1bWItc3RlcC50cyJdLCJuYW1lcyI6WyJCcmVhZGNydW1iU3RlcCIsIkNvbXBvbmVudCIsInJlYWR5Q2FsbGJhY2siLCJpbml0IiwicmVtb3ZlTGlua1RvRm9yd2FyZGVkQnJlYWRDcnVtYnMiLCJicmVhZENydW1iSG9sZGVyIiwicGFyZW50RWxlbWVudCIsImFjdGl2ZUJyZWFkQ3J1bWIiLCJxdWVyeVNlbGVjdG9yIiwibmV4dFNpYmxpbmciLCJuZXh0RWxlbWVudFNpYmxpbmciLCJicmVhZENydW1iTGluayIsInJlbW92ZUF0dHJpYnV0ZSIsInN0eWxlIiwiY3Vyc29yIl0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7O0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFFZSxNQUFNQSxjQUFOLFNBQThCQywrREFBOUIsQ0FBd0M7QUFDekNDLGVBQVYsR0FBZ0MsQ0FDL0I7O0FBRVNDLE1BQVYsR0FBaUI7QUFDYixTQUFLQyxnQ0FBTDtBQUNIOztBQUVTQSxrQ0FBVixHQUE2QztBQUN6QyxRQUFJQyxnQkFBZ0IsR0FBRyxLQUFLQyxhQUE1QjtBQUNBLFFBQUlDLGdCQUFnQixHQUFHRixnQkFBZ0IsQ0FBQ0csYUFBakIsQ0FBK0IsMEJBQS9CLENBQXZCO0FBQ0EsUUFBRyxDQUFDRCxnQkFBSixFQUNJO0FBRUosUUFBSUUsV0FBVyxHQUFHRixnQkFBZ0IsQ0FBQ0csa0JBQW5DOztBQUNBLFdBQU9ELFdBQVAsRUFBb0I7QUFDaEIsVUFBSUUsY0FBYyxHQUFHRixXQUFXLENBQUNELGFBQVosQ0FBMEIsR0FBMUIsQ0FBckI7O0FBQ0EsVUFBR0csY0FBYyxLQUFLLElBQXRCLEVBQTRCO0FBQ3hCQSxzQkFBYyxDQUFDQyxlQUFmLENBQStCLE1BQS9CO0FBQ0FELHNCQUFjLENBQUNFLEtBQWYsQ0FBcUJDLE1BQXJCLEdBQThCLE1BQTlCO0FBQ0g7O0FBQ0RMLGlCQUFXLEdBQUdBLFdBQVcsQ0FBQ0Msa0JBQTFCO0FBQ0g7QUFFSjs7QUF4QmtELEMiLCJmaWxlIjoiLi9qcy95dmVzX2RlZmF1bHQuMjAuZXNtLmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IENvbXBvbmVudCBmcm9tICdTaG9wVWkvbW9kZWxzL2NvbXBvbmVudCc7XG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIEJyZWFkY3J1bWJTdGVwIGV4dGVuZHMgIENvbXBvbmVudCB7XG4gICAgcHJvdGVjdGVkIHJlYWR5Q2FsbGJhY2soKTogdm9pZCB7XG4gICAgfVxuXG4gICAgcHJvdGVjdGVkIGluaXQoKSB7XG4gICAgICAgIHRoaXMucmVtb3ZlTGlua1RvRm9yd2FyZGVkQnJlYWRDcnVtYnMoKTtcbiAgICB9XG5cbiAgICBwcm90ZWN0ZWQgcmVtb3ZlTGlua1RvRm9yd2FyZGVkQnJlYWRDcnVtYnMoKSB7XG4gICAgICAgIGxldCBicmVhZENydW1iSG9sZGVyID0gdGhpcy5wYXJlbnRFbGVtZW50O1xuICAgICAgICBsZXQgYWN0aXZlQnJlYWRDcnVtYiA9IGJyZWFkQ3J1bWJIb2xkZXIucXVlcnlTZWxlY3RvcignLmJyZWFkY3J1bWItc3RlcC0tYWN0aXZlJyk7XG4gICAgICAgIGlmKCFhY3RpdmVCcmVhZENydW1iKVxuICAgICAgICAgICAgcmV0dXJuXG5cbiAgICAgICAgbGV0IG5leHRTaWJsaW5nID0gYWN0aXZlQnJlYWRDcnVtYi5uZXh0RWxlbWVudFNpYmxpbmc7XG4gICAgICAgIHdoaWxlIChuZXh0U2libGluZykge1xuICAgICAgICAgICAgbGV0IGJyZWFkQ3J1bWJMaW5rID0gbmV4dFNpYmxpbmcucXVlcnlTZWxlY3RvcignYScpO1xuICAgICAgICAgICAgaWYoYnJlYWRDcnVtYkxpbmsgIT09IG51bGwpIHtcbiAgICAgICAgICAgICAgICBicmVhZENydW1iTGluay5yZW1vdmVBdHRyaWJ1dGUoJ2hyZWYnKTtcbiAgICAgICAgICAgICAgICBicmVhZENydW1iTGluay5zdHlsZS5jdXJzb3IgPSAnYXV0byc7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBuZXh0U2libGluZyA9IG5leHRTaWJsaW5nLm5leHRFbGVtZW50U2libGluZztcbiAgICAgICAgfVxuXG4gICAgfVxuXG59XG4iXSwic291cmNlUm9vdCI6IiJ9