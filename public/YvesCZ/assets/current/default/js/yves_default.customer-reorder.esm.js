(window["webpackJsonp_yves_default"] = window["webpackJsonp_yves_default"] || []).push([["customer-reorder"],{

/***/ "./vendor/spryker-shop/customer-reorder-widget/src/SprykerShop/Yves/CustomerReorderWidget/Theme/default/views/customer-reorder/customer-reorder.ts":
/*!*********************************************************************************************************************************************************!*\
  !*** ./vendor/spryker-shop/customer-reorder-widget/src/SprykerShop/Yves/CustomerReorderWidget/Theme/default/views/customer-reorder/customer-reorder.ts ***!
  \*********************************************************************************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return CustomerReorder; });
/* harmony import */ var ShopUi_models_component__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ShopUi/models/component */ "./vendor/spryker-shop/shop-ui/src/SprykerShop/Yves/ShopUi/Theme/default/models/component.ts");
function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }


class CustomerReorder extends ShopUi_models_component__WEBPACK_IMPORTED_MODULE_0__["default"] {
  /**
   * Elements enabling/disabling the trigger.
   */

  /**
   * Element enabled/disabled by selections changes.
   */
  constructor() {
    super();

    _defineProperty(this, "selections", void 0);

    _defineProperty(this, "trigger", void 0);

    this.selections = Array.from(this.getElementsByClassName(this.jsName + "__selection"));
    this.trigger = this.getElementsByClassName(this.jsName + "__trigger")[0];
  }

  readyCallback() {
    this.mapEvents();
  }

  mapEvents() {
    this.selections.forEach(selection => selection.addEventListener('change', event => this.onSelectionChange(event)));
  }

  onSelectionChange(event) {
    var isEnabled = this.selections.some(selection => selection.checked);
    this.enableTrigger(isEnabled);
  }
  /**
   * Sets or removes the disabled attribute from the trigger element.
   * @param enable A boolean value for checking if the trigger is available for changing.
   */


  enableTrigger(isEnabled) {
    if (isEnabled) {
      this.trigger.removeAttribute('disabled');
      return;
    }

    this.trigger.setAttribute('disabled', 'disabled');
  }

}

/***/ })

}]);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vLi92ZW5kb3Ivc3ByeWtlci1zaG9wL2N1c3RvbWVyLXJlb3JkZXItd2lkZ2V0L3NyYy9TcHJ5a2VyU2hvcC9ZdmVzL0N1c3RvbWVyUmVvcmRlcldpZGdldC9UaGVtZS9kZWZhdWx0L3ZpZXdzL2N1c3RvbWVyLXJlb3JkZXIvY3VzdG9tZXItcmVvcmRlci50cyJdLCJuYW1lcyI6WyJDdXN0b21lclJlb3JkZXIiLCJDb21wb25lbnQiLCJjb25zdHJ1Y3RvciIsInNlbGVjdGlvbnMiLCJBcnJheSIsImZyb20iLCJnZXRFbGVtZW50c0J5Q2xhc3NOYW1lIiwianNOYW1lIiwidHJpZ2dlciIsInJlYWR5Q2FsbGJhY2siLCJtYXBFdmVudHMiLCJmb3JFYWNoIiwic2VsZWN0aW9uIiwiYWRkRXZlbnRMaXN0ZW5lciIsImV2ZW50Iiwib25TZWxlY3Rpb25DaGFuZ2UiLCJpc0VuYWJsZWQiLCJzb21lIiwiY2hlY2tlZCIsImVuYWJsZVRyaWdnZXIiLCJyZW1vdmVBdHRyaWJ1dGUiLCJzZXRBdHRyaWJ1dGUiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7OztBQUFBO0FBRWUsTUFBTUEsZUFBTixTQUE4QkMsK0RBQTlCLENBQXdDO0FBQ25EOzs7O0FBS0E7OztBQUtBQyxhQUFXLEdBQUc7QUFDVjs7QUFEVTs7QUFBQTs7QUFFVixTQUFLQyxVQUFMLEdBQXNDQyxLQUFLLENBQUNDLElBQU4sQ0FBVyxLQUFLQyxzQkFBTCxDQUErQixLQUFLQyxNQUFwQyxpQkFBWCxDQUF0QztBQUNBLFNBQUtDLE9BQUwsR0FBNEIsS0FBS0Ysc0JBQUwsQ0FBK0IsS0FBS0MsTUFBcEMsZ0JBQXVELENBQXZELENBQTVCO0FBQ0g7O0FBRVNFLGVBQVYsR0FBZ0M7QUFDNUIsU0FBS0MsU0FBTDtBQUNIOztBQUVTQSxXQUFWLEdBQTRCO0FBQ3hCLFNBQUtQLFVBQUwsQ0FBZ0JRLE9BQWhCLENBQXlCQyxTQUFELElBQ3BCQSxTQUFTLENBQUNDLGdCQUFWLENBQTJCLFFBQTNCLEVBQXNDQyxLQUFELElBQWtCLEtBQUtDLGlCQUFMLENBQXVCRCxLQUF2QixDQUF2RCxDQURKO0FBR0g7O0FBRVNDLG1CQUFWLENBQTRCRCxLQUE1QixFQUFnRDtBQUM1QyxRQUFNRSxTQUFTLEdBQUcsS0FBS2IsVUFBTCxDQUFnQmMsSUFBaEIsQ0FBc0JMLFNBQUQsSUFBaUNBLFNBQVMsQ0FBQ00sT0FBaEUsQ0FBbEI7QUFDQSxTQUFLQyxhQUFMLENBQW1CSCxTQUFuQjtBQUNIO0FBRUQ7Ozs7OztBQUlBRyxlQUFhLENBQUNILFNBQUQsRUFBMkI7QUFDcEMsUUFBSUEsU0FBSixFQUFlO0FBQ1gsV0FBS1IsT0FBTCxDQUFhWSxlQUFiLENBQTZCLFVBQTdCO0FBRUE7QUFDSDs7QUFFRCxTQUFLWixPQUFMLENBQWFhLFlBQWIsQ0FBMEIsVUFBMUIsRUFBc0MsVUFBdEM7QUFDSDs7QUE1Q2tELEMiLCJmaWxlIjoiLi9qcy95dmVzX2RlZmF1bHQuY3VzdG9tZXItcmVvcmRlci5lc20uanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgQ29tcG9uZW50IGZyb20gJ1Nob3BVaS9tb2RlbHMvY29tcG9uZW50JztcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgQ3VzdG9tZXJSZW9yZGVyIGV4dGVuZHMgQ29tcG9uZW50IHtcbiAgICAvKipcbiAgICAgKiBFbGVtZW50cyBlbmFibGluZy9kaXNhYmxpbmcgdGhlIHRyaWdnZXIuXG4gICAgICovXG4gICAgcmVhZG9ubHkgc2VsZWN0aW9uczogSFRNTElucHV0RWxlbWVudFtdO1xuXG4gICAgLyoqXG4gICAgICogRWxlbWVudCBlbmFibGVkL2Rpc2FibGVkIGJ5IHNlbGVjdGlvbnMgY2hhbmdlcy5cbiAgICAgKi9cbiAgICByZWFkb25seSB0cmlnZ2VyOiBIVE1MRWxlbWVudDtcblxuICAgIGNvbnN0cnVjdG9yKCkge1xuICAgICAgICBzdXBlcigpO1xuICAgICAgICB0aGlzLnNlbGVjdGlvbnMgPSA8SFRNTElucHV0RWxlbWVudFtdPkFycmF5LmZyb20odGhpcy5nZXRFbGVtZW50c0J5Q2xhc3NOYW1lKGAke3RoaXMuanNOYW1lfV9fc2VsZWN0aW9uYCkpO1xuICAgICAgICB0aGlzLnRyaWdnZXIgPSA8SFRNTEVsZW1lbnQ+dGhpcy5nZXRFbGVtZW50c0J5Q2xhc3NOYW1lKGAke3RoaXMuanNOYW1lfV9fdHJpZ2dlcmApWzBdO1xuICAgIH1cblxuICAgIHByb3RlY3RlZCByZWFkeUNhbGxiYWNrKCk6IHZvaWQge1xuICAgICAgICB0aGlzLm1hcEV2ZW50cygpO1xuICAgIH1cblxuICAgIHByb3RlY3RlZCBtYXBFdmVudHMoKTogdm9pZCB7XG4gICAgICAgIHRoaXMuc2VsZWN0aW9ucy5mb3JFYWNoKChzZWxlY3Rpb246IEhUTUxJbnB1dEVsZW1lbnQpID0+XG4gICAgICAgICAgICBzZWxlY3Rpb24uYWRkRXZlbnRMaXN0ZW5lcignY2hhbmdlJywgKGV2ZW50OiBFdmVudCkgPT4gdGhpcy5vblNlbGVjdGlvbkNoYW5nZShldmVudCkpLFxuICAgICAgICApO1xuICAgIH1cblxuICAgIHByb3RlY3RlZCBvblNlbGVjdGlvbkNoYW5nZShldmVudDogRXZlbnQpOiB2b2lkIHtcbiAgICAgICAgY29uc3QgaXNFbmFibGVkID0gdGhpcy5zZWxlY3Rpb25zLnNvbWUoKHNlbGVjdGlvbjogSFRNTElucHV0RWxlbWVudCkgPT4gc2VsZWN0aW9uLmNoZWNrZWQpO1xuICAgICAgICB0aGlzLmVuYWJsZVRyaWdnZXIoaXNFbmFibGVkKTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBTZXRzIG9yIHJlbW92ZXMgdGhlIGRpc2FibGVkIGF0dHJpYnV0ZSBmcm9tIHRoZSB0cmlnZ2VyIGVsZW1lbnQuXG4gICAgICogQHBhcmFtIGVuYWJsZSBBIGJvb2xlYW4gdmFsdWUgZm9yIGNoZWNraW5nIGlmIHRoZSB0cmlnZ2VyIGlzIGF2YWlsYWJsZSBmb3IgY2hhbmdpbmcuXG4gICAgICovXG4gICAgZW5hYmxlVHJpZ2dlcihpc0VuYWJsZWQ6IGJvb2xlYW4pOiB2b2lkIHtcbiAgICAgICAgaWYgKGlzRW5hYmxlZCkge1xuICAgICAgICAgICAgdGhpcy50cmlnZ2VyLnJlbW92ZUF0dHJpYnV0ZSgnZGlzYWJsZWQnKTtcblxuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG5cbiAgICAgICAgdGhpcy50cmlnZ2VyLnNldEF0dHJpYnV0ZSgnZGlzYWJsZWQnLCAnZGlzYWJsZWQnKTtcbiAgICB9XG59XG4iXSwic291cmNlUm9vdCI6IiJ9