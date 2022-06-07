(window["webpackJsonp_yves_default"] = window["webpackJsonp_yves_default"] || []).push([[51],{

/***/ "./vendor/spryker-shop/shop-ui/src/SprykerShop/Yves/ShopUi/Theme/default/components/molecules/flash-message/flash-message.ts":
/*!***********************************************************************************************************************************!*\
  !*** ./vendor/spryker-shop/shop-ui/src/SprykerShop/Yves/ShopUi/Theme/default/components/molecules/flash-message/flash-message.ts ***!
  \***********************************************************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return FlashMessage; });
/* harmony import */ var _models_component__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../../models/component */ "./vendor/spryker-shop/shop-ui/src/SprykerShop/Yves/ShopUi/Theme/default/models/component.ts");
function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }


class FlashMessage extends _models_component__WEBPACK_IMPORTED_MODULE_0__["default"] {
  constructor() {
    super(...arguments);

    _defineProperty(this, "defaultDuration", 5000);

    _defineProperty(this, "durationTimeoutId", void 0);
  }

  readyCallback() {
    this.mapEvents();
    window.setTimeout(() => this.showFor(this.defaultDuration));
  }

  mapEvents() {
    this.addEventListener('click', event => this.onClick(event));
  }

  onClick(event) {
    event.preventDefault();
    this.hide();
  }
  /**
   * Shows the flash message during the time set.
   * @param duration A number value which defines the period of time for which the flash message is shown.
   */


  showFor(duration) {
    this.classList.add(this.name + "--show");
    this.durationTimeoutId = window.setTimeout(() => this.hide(), duration);
  }
  /**
   * Hides the flash message.
   */


  hide() {
    clearTimeout(this.durationTimeoutId);
    this.classList.remove(this.name + "--show");
  }

}

/***/ })

}]);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vLi92ZW5kb3Ivc3ByeWtlci1zaG9wL3Nob3AtdWkvc3JjL1NwcnlrZXJTaG9wL1l2ZXMvU2hvcFVpL1RoZW1lL2RlZmF1bHQvY29tcG9uZW50cy9tb2xlY3VsZXMvZmxhc2gtbWVzc2FnZS9mbGFzaC1tZXNzYWdlLnRzIl0sIm5hbWVzIjpbIkZsYXNoTWVzc2FnZSIsIkNvbXBvbmVudCIsInJlYWR5Q2FsbGJhY2siLCJtYXBFdmVudHMiLCJ3aW5kb3ciLCJzZXRUaW1lb3V0Iiwic2hvd0ZvciIsImRlZmF1bHREdXJhdGlvbiIsImFkZEV2ZW50TGlzdGVuZXIiLCJldmVudCIsIm9uQ2xpY2siLCJwcmV2ZW50RGVmYXVsdCIsImhpZGUiLCJkdXJhdGlvbiIsImNsYXNzTGlzdCIsImFkZCIsIm5hbWUiLCJkdXJhdGlvblRpbWVvdXRJZCIsImNsZWFyVGltZW91dCIsInJlbW92ZSJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7O0FBQUE7QUFFZSxNQUFNQSxZQUFOLFNBQTJCQyx5REFBM0IsQ0FBcUM7QUFBQTtBQUFBOztBQUFBLDZDQUliLElBSmE7O0FBQUE7QUFBQTs7QUFXdENDLGVBQVYsR0FBZ0M7QUFDNUIsU0FBS0MsU0FBTDtBQUNBQyxVQUFNLENBQUNDLFVBQVAsQ0FBa0IsTUFBTSxLQUFLQyxPQUFMLENBQWEsS0FBS0MsZUFBbEIsQ0FBeEI7QUFDSDs7QUFFU0osV0FBVixHQUE0QjtBQUN4QixTQUFLSyxnQkFBTCxDQUFzQixPQUF0QixFQUFnQ0MsS0FBRCxJQUFrQixLQUFLQyxPQUFMLENBQWFELEtBQWIsQ0FBakQ7QUFDSDs7QUFFU0MsU0FBVixDQUFrQkQsS0FBbEIsRUFBc0M7QUFDbENBLFNBQUssQ0FBQ0UsY0FBTjtBQUNBLFNBQUtDLElBQUw7QUFDSDtBQUVEOzs7Ozs7QUFJQU4sU0FBTyxDQUFDTyxRQUFELEVBQW1CO0FBQ3RCLFNBQUtDLFNBQUwsQ0FBZUMsR0FBZixDQUFzQixLQUFLQyxJQUEzQjtBQUNBLFNBQUtDLGlCQUFMLEdBQXlCYixNQUFNLENBQUNDLFVBQVAsQ0FBa0IsTUFBTSxLQUFLTyxJQUFMLEVBQXhCLEVBQXFDQyxRQUFyQyxDQUF6QjtBQUNIO0FBRUQ7Ozs7O0FBR0FELE1BQUksR0FBRztBQUNITSxnQkFBWSxDQUFDLEtBQUtELGlCQUFOLENBQVo7QUFDQSxTQUFLSCxTQUFMLENBQWVLLE1BQWYsQ0FBeUIsS0FBS0gsSUFBOUI7QUFDSDs7QUF4QytDLEMiLCJmaWxlIjoiLi9qcy95dmVzX2RlZmF1bHQuNTEuZXNtLmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IENvbXBvbmVudCBmcm9tICcuLi8uLi8uLi9tb2RlbHMvY29tcG9uZW50JztcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgRmxhc2hNZXNzYWdlIGV4dGVuZHMgQ29tcG9uZW50IHtcbiAgICAvKipcbiAgICAgKiBEZWZhdWx0IGZsYXNoIG1lc3NhZ2Ugc2hvdyBkdXJhdGlvbi5cbiAgICAgKi9cbiAgICByZWFkb25seSBkZWZhdWx0RHVyYXRpb246IG51bWJlciA9IDUwMDA7XG5cbiAgICAvKipcbiAgICAgKiBUaGUgaWQgb2YgZmxhc2ggbWVzc2FnZSB0aW1lb3V0LlxuICAgICAqL1xuICAgIGR1cmF0aW9uVGltZW91dElkOiBudW1iZXI7XG5cbiAgICBwcm90ZWN0ZWQgcmVhZHlDYWxsYmFjaygpOiB2b2lkIHtcbiAgICAgICAgdGhpcy5tYXBFdmVudHMoKTtcbiAgICAgICAgd2luZG93LnNldFRpbWVvdXQoKCkgPT4gdGhpcy5zaG93Rm9yKHRoaXMuZGVmYXVsdER1cmF0aW9uKSk7XG4gICAgfVxuXG4gICAgcHJvdGVjdGVkIG1hcEV2ZW50cygpOiB2b2lkIHtcbiAgICAgICAgdGhpcy5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIChldmVudDogRXZlbnQpID0+IHRoaXMub25DbGljayhldmVudCkpO1xuICAgIH1cblxuICAgIHByb3RlY3RlZCBvbkNsaWNrKGV2ZW50OiBFdmVudCk6IHZvaWQge1xuICAgICAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgICB0aGlzLmhpZGUoKTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBTaG93cyB0aGUgZmxhc2ggbWVzc2FnZSBkdXJpbmcgdGhlIHRpbWUgc2V0LlxuICAgICAqIEBwYXJhbSBkdXJhdGlvbiBBIG51bWJlciB2YWx1ZSB3aGljaCBkZWZpbmVzIHRoZSBwZXJpb2Qgb2YgdGltZSBmb3Igd2hpY2ggdGhlIGZsYXNoIG1lc3NhZ2UgaXMgc2hvd24uXG4gICAgICovXG4gICAgc2hvd0ZvcihkdXJhdGlvbjogbnVtYmVyKSB7XG4gICAgICAgIHRoaXMuY2xhc3NMaXN0LmFkZChgJHt0aGlzLm5hbWV9LS1zaG93YCk7XG4gICAgICAgIHRoaXMuZHVyYXRpb25UaW1lb3V0SWQgPSB3aW5kb3cuc2V0VGltZW91dCgoKSA9PiB0aGlzLmhpZGUoKSwgZHVyYXRpb24pO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIEhpZGVzIHRoZSBmbGFzaCBtZXNzYWdlLlxuICAgICAqL1xuICAgIGhpZGUoKSB7XG4gICAgICAgIGNsZWFyVGltZW91dCh0aGlzLmR1cmF0aW9uVGltZW91dElkKTtcbiAgICAgICAgdGhpcy5jbGFzc0xpc3QucmVtb3ZlKGAke3RoaXMubmFtZX0tLXNob3dgKTtcbiAgICB9XG59XG4iXSwic291cmNlUm9vdCI6IiJ9