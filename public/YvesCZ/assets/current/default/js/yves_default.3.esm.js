(window["webpackJsonp_yves_default"] = window["webpackJsonp_yves_default"] || []).push([[3],{

/***/ "./src/Pyz/Yves/CustomerReorderWidget/Theme/default/components/molecules/customer-reorder-form/customer-reorder-form.ts":
/*!******************************************************************************************************************************!*\
  !*** ./src/Pyz/Yves/CustomerReorderWidget/Theme/default/components/molecules/customer-reorder-form/customer-reorder-form.ts ***!
  \******************************************************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return CustomerReorderForm; });
/* harmony import */ var CustomerReorderWidget_components_molecules_customer_reorder_form_customer_reorder_form__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! CustomerReorderWidget/components/molecules/customer-reorder-form/customer-reorder-form */ "./vendor/spryker-shop/customer-reorder-widget/src/SprykerShop/Yves/CustomerReorderWidget/Theme/default/components/molecules/customer-reorder-form/customer-reorder-form.ts");
function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }


class CustomerReorderForm extends CustomerReorderWidget_components_molecules_customer_reorder_form_customer_reorder_form__WEBPACK_IMPORTED_MODULE_0__["default"] {
  constructor() {
    super();

    _defineProperty(this, "triggers", void 0);

    this.triggers = Array.from(this.getElementsByClassName(this.jsName + "__trigger"));
  }

  enableTrigger(isEnabled) {
    this.triggers.forEach(trigger => {
      trigger.disabled = !isEnabled;
    });
  }

}

/***/ }),

/***/ "./vendor/spryker-shop/customer-reorder-widget/src/SprykerShop/Yves/CustomerReorderWidget/Theme/default/components/molecules/customer-reorder-form/customer-reorder-form.ts":
/*!**********************************************************************************************************************************************************************************!*\
  !*** ./vendor/spryker-shop/customer-reorder-widget/src/SprykerShop/Yves/CustomerReorderWidget/Theme/default/components/molecules/customer-reorder-form/customer-reorder-form.ts ***!
  \**********************************************************************************************************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return CustomerReorderForm; });
/* harmony import */ var ShopUi_models_component__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ShopUi/models/component */ "./vendor/spryker-shop/shop-ui/src/SprykerShop/Yves/ShopUi/Theme/default/models/component.ts");
function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }


class CustomerReorderForm extends ShopUi_models_component__WEBPACK_IMPORTED_MODULE_0__["default"] {
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
   * Sets/removes the disabled attribute from the trigger button element, which if not disabled, on click can
   * reorder selected orders.
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vLi9zcmMvUHl6L1l2ZXMvQ3VzdG9tZXJSZW9yZGVyV2lkZ2V0L1RoZW1lL2RlZmF1bHQvY29tcG9uZW50cy9tb2xlY3VsZXMvY3VzdG9tZXItcmVvcmRlci1mb3JtL2N1c3RvbWVyLXJlb3JkZXItZm9ybS50cyIsIndlYnBhY2s6Ly8vLi92ZW5kb3Ivc3ByeWtlci1zaG9wL2N1c3RvbWVyLXJlb3JkZXItd2lkZ2V0L3NyYy9TcHJ5a2VyU2hvcC9ZdmVzL0N1c3RvbWVyUmVvcmRlcldpZGdldC9UaGVtZS9kZWZhdWx0L2NvbXBvbmVudHMvbW9sZWN1bGVzL2N1c3RvbWVyLXJlb3JkZXItZm9ybS9jdXN0b21lci1yZW9yZGVyLWZvcm0udHMiXSwibmFtZXMiOlsiQ3VzdG9tZXJSZW9yZGVyRm9ybSIsIkN1c3RvbWVyUmVvcmRlckZvcm1Db3JlIiwiY29uc3RydWN0b3IiLCJ0cmlnZ2VycyIsIkFycmF5IiwiZnJvbSIsImdldEVsZW1lbnRzQnlDbGFzc05hbWUiLCJqc05hbWUiLCJlbmFibGVUcmlnZ2VyIiwiaXNFbmFibGVkIiwiZm9yRWFjaCIsInRyaWdnZXIiLCJkaXNhYmxlZCIsIkNvbXBvbmVudCIsInNlbGVjdGlvbnMiLCJyZWFkeUNhbGxiYWNrIiwibWFwRXZlbnRzIiwic2VsZWN0aW9uIiwiYWRkRXZlbnRMaXN0ZW5lciIsImV2ZW50Iiwib25TZWxlY3Rpb25DaGFuZ2UiLCJzb21lIiwiY2hlY2tlZCIsInJlbW92ZUF0dHJpYnV0ZSIsInNldEF0dHJpYnV0ZSJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7O0FBQUE7QUFFZSxNQUFNQSxtQkFBTixTQUFrQ0MsOEhBQWxDLENBQTBEO0FBR3JFQyxhQUFXLEdBQUc7QUFDVjs7QUFEVTs7QUFFVixTQUFLQyxRQUFMLEdBQStCQyxLQUFLLENBQUNDLElBQU4sQ0FBVyxLQUFLQyxzQkFBTCxDQUErQixLQUFLQyxNQUFwQyxlQUFYLENBQS9CO0FBQ0g7O0FBRURDLGVBQWEsQ0FBQ0MsU0FBRCxFQUEyQjtBQUNwQyxTQUFLTixRQUFMLENBQWNPLE9BQWQsQ0FBdUJDLE9BQUQsSUFBK0I7QUFDakRBLGFBQU8sQ0FBQ0MsUUFBUixHQUFtQixDQUFDSCxTQUFwQjtBQUNILEtBRkQ7QUFHSDs7QUFab0UsQzs7Ozs7Ozs7Ozs7Ozs7Ozs7QUNGekU7QUFFZSxNQUFNVCxtQkFBTixTQUFrQ2EsK0RBQWxDLENBQTRDO0FBSXZEWCxhQUFXLEdBQUc7QUFDVjs7QUFEVTs7QUFBQTs7QUFFVixTQUFLWSxVQUFMLEdBQXNDVixLQUFLLENBQUNDLElBQU4sQ0FBVyxLQUFLQyxzQkFBTCxDQUErQixLQUFLQyxNQUFwQyxpQkFBWCxDQUF0QztBQUNBLFNBQUtJLE9BQUwsR0FBNEIsS0FBS0wsc0JBQUwsQ0FBK0IsS0FBS0MsTUFBcEMsZ0JBQXVELENBQXZELENBQTVCO0FBQ0g7O0FBRVNRLGVBQVYsR0FBZ0M7QUFDNUIsU0FBS0MsU0FBTDtBQUNIOztBQUVTQSxXQUFWLEdBQTRCO0FBQ3hCLFNBQUtGLFVBQUwsQ0FBZ0JKLE9BQWhCLENBQXlCTyxTQUFELElBQ3BCQSxTQUFTLENBQUNDLGdCQUFWLENBQTJCLFFBQTNCLEVBQXNDQyxLQUFELElBQWtCLEtBQUtDLGlCQUFMLENBQXVCRCxLQUF2QixDQUF2RCxDQURKO0FBR0g7O0FBRVNDLG1CQUFWLENBQTRCRCxLQUE1QixFQUFnRDtBQUM1QyxRQUFNVixTQUFTLEdBQUcsS0FBS0ssVUFBTCxDQUFnQk8sSUFBaEIsQ0FBc0JKLFNBQUQsSUFBaUNBLFNBQVMsQ0FBQ0ssT0FBaEUsQ0FBbEI7QUFDQSxTQUFLZCxhQUFMLENBQW1CQyxTQUFuQjtBQUNIO0FBRUQ7Ozs7Ozs7QUFLQUQsZUFBYSxDQUFDQyxTQUFELEVBQTJCO0FBQ3BDLFFBQUlBLFNBQUosRUFBZTtBQUNYLFdBQUtFLE9BQUwsQ0FBYVksZUFBYixDQUE2QixVQUE3QjtBQUVBO0FBQ0g7O0FBRUQsU0FBS1osT0FBTCxDQUFhYSxZQUFiLENBQTBCLFVBQTFCLEVBQXNDLFVBQXRDO0FBQ0g7O0FBdENzRCxDIiwiZmlsZSI6Ii4vanMveXZlc19kZWZhdWx0LjMuZXNtLmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IEN1c3RvbWVyUmVvcmRlckZvcm1Db3JlIGZyb20gJ0N1c3RvbWVyUmVvcmRlcldpZGdldC9jb21wb25lbnRzL21vbGVjdWxlcy9jdXN0b21lci1yZW9yZGVyLWZvcm0vY3VzdG9tZXItcmVvcmRlci1mb3JtJztcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgQ3VzdG9tZXJSZW9yZGVyRm9ybSBleHRlbmRzIEN1c3RvbWVyUmVvcmRlckZvcm1Db3JlIHtcbiAgICBwcm90ZWN0ZWQgcmVhZG9ubHkgdHJpZ2dlcnM6IEhUTUxFbGVtZW50W107XG5cbiAgICBjb25zdHJ1Y3RvcigpIHtcbiAgICAgICAgc3VwZXIoKTtcbiAgICAgICAgdGhpcy50cmlnZ2VycyA9IDxIVE1MRWxlbWVudFtdPkFycmF5LmZyb20odGhpcy5nZXRFbGVtZW50c0J5Q2xhc3NOYW1lKGAke3RoaXMuanNOYW1lfV9fdHJpZ2dlcmApKTtcbiAgICB9XG5cbiAgICBlbmFibGVUcmlnZ2VyKGlzRW5hYmxlZDogYm9vbGVhbik6IHZvaWQge1xuICAgICAgICB0aGlzLnRyaWdnZXJzLmZvckVhY2goKHRyaWdnZXI6IEhUTUxJbnB1dEVsZW1lbnQpID0+IHtcbiAgICAgICAgICAgIHRyaWdnZXIuZGlzYWJsZWQgPSAhaXNFbmFibGVkO1xuICAgICAgICB9KTtcbiAgICB9XG59XG4iLCJpbXBvcnQgQ29tcG9uZW50IGZyb20gJ1Nob3BVaS9tb2RlbHMvY29tcG9uZW50JztcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgQ3VzdG9tZXJSZW9yZGVyRm9ybSBleHRlbmRzIENvbXBvbmVudCB7XG4gICAgcHJvdGVjdGVkIHJlYWRvbmx5IHNlbGVjdGlvbnM6IEhUTUxJbnB1dEVsZW1lbnRbXTtcbiAgICBwcm90ZWN0ZWQgcmVhZG9ubHkgdHJpZ2dlcjogSFRNTEVsZW1lbnQ7XG5cbiAgICBjb25zdHJ1Y3RvcigpIHtcbiAgICAgICAgc3VwZXIoKTtcbiAgICAgICAgdGhpcy5zZWxlY3Rpb25zID0gPEhUTUxJbnB1dEVsZW1lbnRbXT5BcnJheS5mcm9tKHRoaXMuZ2V0RWxlbWVudHNCeUNsYXNzTmFtZShgJHt0aGlzLmpzTmFtZX1fX3NlbGVjdGlvbmApKTtcbiAgICAgICAgdGhpcy50cmlnZ2VyID0gPEhUTUxFbGVtZW50PnRoaXMuZ2V0RWxlbWVudHNCeUNsYXNzTmFtZShgJHt0aGlzLmpzTmFtZX1fX3RyaWdnZXJgKVswXTtcbiAgICB9XG5cbiAgICBwcm90ZWN0ZWQgcmVhZHlDYWxsYmFjaygpOiB2b2lkIHtcbiAgICAgICAgdGhpcy5tYXBFdmVudHMoKTtcbiAgICB9XG5cbiAgICBwcm90ZWN0ZWQgbWFwRXZlbnRzKCk6IHZvaWQge1xuICAgICAgICB0aGlzLnNlbGVjdGlvbnMuZm9yRWFjaCgoc2VsZWN0aW9uOiBIVE1MSW5wdXRFbGVtZW50KSA9PlxuICAgICAgICAgICAgc2VsZWN0aW9uLmFkZEV2ZW50TGlzdGVuZXIoJ2NoYW5nZScsIChldmVudDogRXZlbnQpID0+IHRoaXMub25TZWxlY3Rpb25DaGFuZ2UoZXZlbnQpKSxcbiAgICAgICAgKTtcbiAgICB9XG5cbiAgICBwcm90ZWN0ZWQgb25TZWxlY3Rpb25DaGFuZ2UoZXZlbnQ6IEV2ZW50KTogdm9pZCB7XG4gICAgICAgIGNvbnN0IGlzRW5hYmxlZCA9IHRoaXMuc2VsZWN0aW9ucy5zb21lKChzZWxlY3Rpb246IEhUTUxJbnB1dEVsZW1lbnQpID0+IHNlbGVjdGlvbi5jaGVja2VkKTtcbiAgICAgICAgdGhpcy5lbmFibGVUcmlnZ2VyKGlzRW5hYmxlZCk7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogU2V0cy9yZW1vdmVzIHRoZSBkaXNhYmxlZCBhdHRyaWJ1dGUgZnJvbSB0aGUgdHJpZ2dlciBidXR0b24gZWxlbWVudCwgd2hpY2ggaWYgbm90IGRpc2FibGVkLCBvbiBjbGljayBjYW5cbiAgICAgKiByZW9yZGVyIHNlbGVjdGVkIG9yZGVycy5cbiAgICAgKiBAcGFyYW0gZW5hYmxlIEEgYm9vbGVhbiB2YWx1ZSBmb3IgY2hlY2tpbmcgaWYgdGhlIHRyaWdnZXIgaXMgYXZhaWxhYmxlIGZvciBjaGFuZ2luZy5cbiAgICAgKi9cbiAgICBlbmFibGVUcmlnZ2VyKGlzRW5hYmxlZDogYm9vbGVhbik6IHZvaWQge1xuICAgICAgICBpZiAoaXNFbmFibGVkKSB7XG4gICAgICAgICAgICB0aGlzLnRyaWdnZXIucmVtb3ZlQXR0cmlidXRlKCdkaXNhYmxlZCcpO1xuXG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cblxuICAgICAgICB0aGlzLnRyaWdnZXIuc2V0QXR0cmlidXRlKCdkaXNhYmxlZCcsICdkaXNhYmxlZCcpO1xuICAgIH1cbn1cbiJdLCJzb3VyY2VSb290IjoiIn0=