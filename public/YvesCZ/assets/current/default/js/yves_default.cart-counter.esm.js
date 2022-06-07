(window["webpackJsonp_yves_default"] = window["webpackJsonp_yves_default"] || []).push([["cart-counter"],{

/***/ "./vendor/spryker-shop/shop-ui/src/SprykerShop/Yves/ShopUi/Theme/default/components/molecules/cart-counter/cart-counter.ts":
/*!*********************************************************************************************************************************!*\
  !*** ./vendor/spryker-shop/shop-ui/src/SprykerShop/Yves/ShopUi/Theme/default/components/molecules/cart-counter/cart-counter.ts ***!
  \*********************************************************************************************************************************/
/*! exports provided: EVENT_UPDATE_CART_QUANTITY, default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "EVENT_UPDATE_CART_QUANTITY", function() { return EVENT_UPDATE_CART_QUANTITY; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return CartCounter; });
/* harmony import */ var _models_component__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../../models/component */ "./vendor/spryker-shop/shop-ui/src/SprykerShop/Yves/ShopUi/Theme/default/models/component.ts");
function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }



/**
 * @event updateCartQuantity An event emitted when need to update cart quantity.
 */
var EVENT_UPDATE_CART_QUANTITY = 'updateCartQuantity';
class CartCounter extends _models_component__WEBPACK_IMPORTED_MODULE_0__["default"] {
  constructor() {
    super(...arguments);

    _defineProperty(this, "quantity", void 0);
  }

  readyCallback() {}

  init() {
    this.quantity = this.getElementsByClassName(this.jsName + "__quantity")[0];
    this.mapEvents();
  }

  mapEvents() {
    this.mapTriggerCustomUpdateQuantityEvent();
  }

  mapTriggerCustomUpdateQuantityEvent() {
    document.addEventListener(EVENT_UPDATE_CART_QUANTITY, event => this.updateQuantity(Number(event.detail)));
  }

  updateQuantity(quantity) {
    if (!quantity) {
      return;
    }

    this.quantity.textContent = String(quantity);
    this.quantity.classList.toggle(this.hiddenQuantityClassName, !quantity);
  }

  get hiddenQuantityClassName() {
    return this.getAttribute('hidden-quantity-class-name');
  }

}

/***/ })

}]);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vLi92ZW5kb3Ivc3ByeWtlci1zaG9wL3Nob3AtdWkvc3JjL1NwcnlrZXJTaG9wL1l2ZXMvU2hvcFVpL1RoZW1lL2RlZmF1bHQvY29tcG9uZW50cy9tb2xlY3VsZXMvY2FydC1jb3VudGVyL2NhcnQtY291bnRlci50cyJdLCJuYW1lcyI6WyJFVkVOVF9VUERBVEVfQ0FSVF9RVUFOVElUWSIsIkNhcnRDb3VudGVyIiwiQ29tcG9uZW50IiwicmVhZHlDYWxsYmFjayIsImluaXQiLCJxdWFudGl0eSIsImdldEVsZW1lbnRzQnlDbGFzc05hbWUiLCJqc05hbWUiLCJtYXBFdmVudHMiLCJtYXBUcmlnZ2VyQ3VzdG9tVXBkYXRlUXVhbnRpdHlFdmVudCIsImRvY3VtZW50IiwiYWRkRXZlbnRMaXN0ZW5lciIsImV2ZW50IiwidXBkYXRlUXVhbnRpdHkiLCJOdW1iZXIiLCJkZXRhaWwiLCJ0ZXh0Q29udGVudCIsIlN0cmluZyIsImNsYXNzTGlzdCIsInRvZ2dsZSIsImhpZGRlblF1YW50aXR5Q2xhc3NOYW1lIiwiZ2V0QXR0cmlidXRlIl0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7O0FBQUE7O0FBR0E7OztBQUdPLElBQU1BLDBCQUEwQixHQUFHLG9CQUFuQztBQUVRLE1BQU1DLFdBQU4sU0FBMEJDLHlEQUExQixDQUFvQztBQUFBO0FBQUE7O0FBQUE7QUFBQTs7QUFHckNDLGVBQVYsR0FBZ0MsQ0FBRTs7QUFFeEJDLE1BQVYsR0FBdUI7QUFDbkIsU0FBS0MsUUFBTCxHQUE2QixLQUFLQyxzQkFBTCxDQUErQixLQUFLQyxNQUFwQyxpQkFBd0QsQ0FBeEQsQ0FBN0I7QUFDQSxTQUFLQyxTQUFMO0FBQ0g7O0FBRVNBLFdBQVYsR0FBNEI7QUFDeEIsU0FBS0MsbUNBQUw7QUFDSDs7QUFFU0EscUNBQVYsR0FBc0Q7QUFDbERDLFlBQVEsQ0FBQ0MsZ0JBQVQsQ0FBMEJYLDBCQUExQixFQUF1RFksS0FBRCxJQUNsRCxLQUFLQyxjQUFMLENBQW9CQyxNQUFNLENBQUNGLEtBQUssQ0FBQ0csTUFBUCxDQUExQixDQURKO0FBR0g7O0FBRVNGLGdCQUFWLENBQXlCUixRQUF6QixFQUFpRDtBQUM3QyxRQUFJLENBQUNBLFFBQUwsRUFBZTtBQUNYO0FBQ0g7O0FBQ0QsU0FBS0EsUUFBTCxDQUFjVyxXQUFkLEdBQTRCQyxNQUFNLENBQUNaLFFBQUQsQ0FBbEM7QUFDQSxTQUFLQSxRQUFMLENBQWNhLFNBQWQsQ0FBd0JDLE1BQXhCLENBQStCLEtBQUtDLHVCQUFwQyxFQUE2RCxDQUFDZixRQUE5RDtBQUNIOztBQUVELE1BQWNlLHVCQUFkLEdBQWdEO0FBQzVDLFdBQU8sS0FBS0MsWUFBTCxDQUFrQiw0QkFBbEIsQ0FBUDtBQUNIOztBQTlCOEMsQyIsImZpbGUiOiIuL2pzL3l2ZXNfZGVmYXVsdC5jYXJ0LWNvdW50ZXIuZXNtLmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IENvbXBvbmVudCBmcm9tICcuLi8uLi8uLi9tb2RlbHMvY29tcG9uZW50JztcbmltcG9ydCB7IEVWRU5UX1VQREFURV9EWU5BTUlDX01FU1NBR0VTIH0gZnJvbSAnU2hvcFVpL2NvbXBvbmVudHMvb3JnYW5pc21zL2R5bmFtaWMtbm90aWZpY2F0aW9uLWFyZWEvZHluYW1pYy1ub3RpZmljYXRpb24tYXJlYSc7XG5cbi8qKlxuICogQGV2ZW50IHVwZGF0ZUNhcnRRdWFudGl0eSBBbiBldmVudCBlbWl0dGVkIHdoZW4gbmVlZCB0byB1cGRhdGUgY2FydCBxdWFudGl0eS5cbiAqL1xuZXhwb3J0IGNvbnN0IEVWRU5UX1VQREFURV9DQVJUX1FVQU5USVRZID0gJ3VwZGF0ZUNhcnRRdWFudGl0eSc7XG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIENhcnRDb3VudGVyIGV4dGVuZHMgQ29tcG9uZW50IHtcbiAgICBwcm90ZWN0ZWQgcXVhbnRpdHk6IEhUTUxFbGVtZW50O1xuXG4gICAgcHJvdGVjdGVkIHJlYWR5Q2FsbGJhY2soKTogdm9pZCB7fVxuXG4gICAgcHJvdGVjdGVkIGluaXQoKTogdm9pZCB7XG4gICAgICAgIHRoaXMucXVhbnRpdHkgPSA8SFRNTEVsZW1lbnQ+dGhpcy5nZXRFbGVtZW50c0J5Q2xhc3NOYW1lKGAke3RoaXMuanNOYW1lfV9fcXVhbnRpdHlgKVswXTtcbiAgICAgICAgdGhpcy5tYXBFdmVudHMoKTtcbiAgICB9XG5cbiAgICBwcm90ZWN0ZWQgbWFwRXZlbnRzKCk6IHZvaWQge1xuICAgICAgICB0aGlzLm1hcFRyaWdnZXJDdXN0b21VcGRhdGVRdWFudGl0eUV2ZW50KCk7XG4gICAgfVxuXG4gICAgcHJvdGVjdGVkIG1hcFRyaWdnZXJDdXN0b21VcGRhdGVRdWFudGl0eUV2ZW50KCk6IHZvaWQge1xuICAgICAgICBkb2N1bWVudC5hZGRFdmVudExpc3RlbmVyKEVWRU5UX1VQREFURV9DQVJUX1FVQU5USVRZLCAoZXZlbnQ6IEN1c3RvbUV2ZW50KSA9PlxuICAgICAgICAgICAgdGhpcy51cGRhdGVRdWFudGl0eShOdW1iZXIoZXZlbnQuZGV0YWlsKSksXG4gICAgICAgICk7XG4gICAgfVxuXG4gICAgcHJvdGVjdGVkIHVwZGF0ZVF1YW50aXR5KHF1YW50aXR5OiBudW1iZXIpOiB2b2lkIHtcbiAgICAgICAgaWYgKCFxdWFudGl0eSkge1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG4gICAgICAgIHRoaXMucXVhbnRpdHkudGV4dENvbnRlbnQgPSBTdHJpbmcocXVhbnRpdHkpO1xuICAgICAgICB0aGlzLnF1YW50aXR5LmNsYXNzTGlzdC50b2dnbGUodGhpcy5oaWRkZW5RdWFudGl0eUNsYXNzTmFtZSwgIXF1YW50aXR5KTtcbiAgICB9XG5cbiAgICBwcm90ZWN0ZWQgZ2V0IGhpZGRlblF1YW50aXR5Q2xhc3NOYW1lKCk6IHN0cmluZyB7XG4gICAgICAgIHJldHVybiB0aGlzLmdldEF0dHJpYnV0ZSgnaGlkZGVuLXF1YW50aXR5LWNsYXNzLW5hbWUnKTtcbiAgICB9XG59XG4iXSwic291cmNlUm9vdCI6IiJ9