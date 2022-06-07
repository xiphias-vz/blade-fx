(window["webpackJsonp_yves_default"] = window["webpackJsonp_yves_default"] || []).push([[8],{

/***/ "./src/Pyz/Yves/ShopUi/Theme/default/components/molecules/form-submitter/form-submitter.ts":
/*!*************************************************************************************************!*\
  !*** ./src/Pyz/Yves/ShopUi/Theme/default/components/molecules/form-submitter/form-submitter.ts ***!
  \*************************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return FormSubmitter; });
/* harmony import */ var ShopUi_components_molecules_form_submitter_form_submitter__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ShopUi/components/molecules/form-submitter/form-submitter */ "./vendor/spryker-shop/shop-ui/src/SprykerShop/Yves/ShopUi/Theme/default/components/molecules/form-submitter/form-submitter.ts");

var TAG_NAME = 'form';
class FormSubmitter extends ShopUi_components_molecules_form_submitter_form_submitter__WEBPACK_IMPORTED_MODULE_0__["default"] {
  onEvent(event) {
    var trigger = event.currentTarget;
    var form = trigger.closest(TAG_NAME);

    if (!form) {
      return;
    }

    var submit = form.querySelector('[type="submit"]') || form.querySelector('button:not([type="button"])');

    if (submit) {
      submit.click();
    }

    form.submit();
  }

}

/***/ }),

/***/ "./vendor/spryker-shop/shop-ui/src/SprykerShop/Yves/ShopUi/Theme/default/components/molecules/form-submitter/form-submitter.ts":
/*!*************************************************************************************************************************************!*\
  !*** ./vendor/spryker-shop/shop-ui/src/SprykerShop/Yves/ShopUi/Theme/default/components/molecules/form-submitter/form-submitter.ts ***!
  \*************************************************************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return FormSubmitter; });
/* harmony import */ var ShopUi_models_component__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ShopUi/models/component */ "./vendor/spryker-shop/shop-ui/src/SprykerShop/Yves/ShopUi/Theme/default/models/component.ts");
function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }


var TAG_NAME = 'form';
class FormSubmitter extends ShopUi_models_component__WEBPACK_IMPORTED_MODULE_0__["default"] {
  constructor() {
    super(...arguments);

    _defineProperty(this, "triggers", void 0);
  }

  readyCallback() {}

  init() {
    this.triggers = Array.from(document.querySelectorAll(this.triggerSelector));
    this.mapEvents();
  }

  mapEvents() {
    this.triggers.forEach(trigger => trigger.addEventListener(this.eventName, event => this.onEvent(event)));
  }

  onEvent(event) {
    var trigger = event.currentTarget;
    var form = trigger.closest(TAG_NAME);

    if (!form) {
      return;
    }

    var submit = form.querySelector('[type="submit"]') || form.querySelector('button');

    if (submit) {
      submit.click();
    }

    form.submit();
  }

  get triggerSelector() {
    return this.getAttribute('trigger-selector');
  }

  get eventName() {
    return this.getAttribute('event');
  }

}

/***/ })

}]);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vLi9zcmMvUHl6L1l2ZXMvU2hvcFVpL1RoZW1lL2RlZmF1bHQvY29tcG9uZW50cy9tb2xlY3VsZXMvZm9ybS1zdWJtaXR0ZXIvZm9ybS1zdWJtaXR0ZXIudHMiLCJ3ZWJwYWNrOi8vLy4vdmVuZG9yL3NwcnlrZXItc2hvcC9zaG9wLXVpL3NyYy9TcHJ5a2VyU2hvcC9ZdmVzL1Nob3BVaS9UaGVtZS9kZWZhdWx0L2NvbXBvbmVudHMvbW9sZWN1bGVzL2Zvcm0tc3VibWl0dGVyL2Zvcm0tc3VibWl0dGVyLnRzIl0sIm5hbWVzIjpbIlRBR19OQU1FIiwiRm9ybVN1Ym1pdHRlciIsIkZvcm1TdWJtaXR0ZXJDb3JlIiwib25FdmVudCIsImV2ZW50IiwidHJpZ2dlciIsImN1cnJlbnRUYXJnZXQiLCJmb3JtIiwiY2xvc2VzdCIsInN1Ym1pdCIsInF1ZXJ5U2VsZWN0b3IiLCJjbGljayIsIkNvbXBvbmVudCIsInJlYWR5Q2FsbGJhY2siLCJpbml0IiwidHJpZ2dlcnMiLCJBcnJheSIsImZyb20iLCJkb2N1bWVudCIsInF1ZXJ5U2VsZWN0b3JBbGwiLCJ0cmlnZ2VyU2VsZWN0b3IiLCJtYXBFdmVudHMiLCJmb3JFYWNoIiwiYWRkRXZlbnRMaXN0ZW5lciIsImV2ZW50TmFtZSIsImdldEF0dHJpYnV0ZSJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7OztBQUFBO0FBQUE7QUFBQTtBQUFBO0FBRUEsSUFBTUEsUUFBUSxHQUFHLE1BQWpCO0FBRWUsTUFBTUMsYUFBTixTQUE0QkMsaUdBQTVCLENBQThDO0FBQy9DQyxTQUFWLENBQWtCQyxLQUFsQixFQUFzQztBQUNsQyxRQUFNQyxPQUFPLEdBQW9CRCxLQUFLLENBQUNFLGFBQXZDO0FBQ0EsUUFBTUMsSUFBSSxHQUFvQkYsT0FBTyxDQUFDRyxPQUFSLENBQWdCUixRQUFoQixDQUE5Qjs7QUFFQSxRQUFJLENBQUNPLElBQUwsRUFBVztBQUNQO0FBQ0g7O0FBRUQsUUFBTUUsTUFBTSxHQUF5Q0YsSUFBSSxDQUFDRyxhQUFMLENBQW1CLGlCQUFuQixDQUF0QyxJQUNXSCxJQUFJLENBQUNHLGFBQUwsQ0FBbUIsNkJBQW5CLENBRDFCOztBQUdBLFFBQUlELE1BQUosRUFBWTtBQUNSQSxZQUFNLENBQUNFLEtBQVA7QUFDSDs7QUFFREosUUFBSSxDQUFDRSxNQUFMO0FBQ0g7O0FBakJ3RCxDOzs7Ozs7Ozs7Ozs7Ozs7OztBQ0o3RDtBQUVBLElBQU1ULFFBQVEsR0FBRyxNQUFqQjtBQUVlLE1BQU1DLGFBQU4sU0FBNEJXLCtEQUE1QixDQUFzQztBQUFBO0FBQUE7O0FBQUE7QUFBQTs7QUFHdkNDLGVBQVYsR0FBZ0MsQ0FBRTs7QUFFeEJDLE1BQVYsR0FBdUI7QUFDbkIsU0FBS0MsUUFBTCxHQUErQkMsS0FBSyxDQUFDQyxJQUFOLENBQVdDLFFBQVEsQ0FBQ0MsZ0JBQVQsQ0FBMEIsS0FBS0MsZUFBL0IsQ0FBWCxDQUEvQjtBQUNBLFNBQUtDLFNBQUw7QUFDSDs7QUFFU0EsV0FBVixHQUE0QjtBQUN4QixTQUFLTixRQUFMLENBQWNPLE9BQWQsQ0FBdUJqQixPQUFELElBQ2xCQSxPQUFPLENBQUNrQixnQkFBUixDQUF5QixLQUFLQyxTQUE5QixFQUEwQ3BCLEtBQUQsSUFBa0IsS0FBS0QsT0FBTCxDQUFhQyxLQUFiLENBQTNELENBREo7QUFHSDs7QUFFU0QsU0FBVixDQUFrQkMsS0FBbEIsRUFBc0M7QUFDbEMsUUFBTUMsT0FBTyxHQUFvQkQsS0FBSyxDQUFDRSxhQUF2QztBQUNBLFFBQU1DLElBQUksR0FBb0JGLE9BQU8sQ0FBQ0csT0FBUixDQUFnQlIsUUFBaEIsQ0FBOUI7O0FBRUEsUUFBSSxDQUFDTyxJQUFMLEVBQVc7QUFDUDtBQUNIOztBQUVELFFBQU1FLE1BQU0sR0FDOEJGLElBQUksQ0FBQ0csYUFBTCxDQUFtQixpQkFBbkIsQ0FBdEMsSUFDbUJILElBQUksQ0FBQ0csYUFBTCxDQUFtQixRQUFuQixDQUZ2Qjs7QUFJQSxRQUFJRCxNQUFKLEVBQVk7QUFDUkEsWUFBTSxDQUFDRSxLQUFQO0FBQ0g7O0FBRURKLFFBQUksQ0FBQ0UsTUFBTDtBQUNIOztBQUVELE1BQWNXLGVBQWQsR0FBd0M7QUFDcEMsV0FBTyxLQUFLSyxZQUFMLENBQWtCLGtCQUFsQixDQUFQO0FBQ0g7O0FBRUQsTUFBY0QsU0FBZCxHQUFrQztBQUM5QixXQUFPLEtBQUtDLFlBQUwsQ0FBa0IsT0FBbEIsQ0FBUDtBQUNIOztBQXpDZ0QsQyIsImZpbGUiOiIuL2pzL3l2ZXNfZGVmYXVsdC44LmVzbS5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBGb3JtU3VibWl0dGVyQ29yZSBmcm9tICdTaG9wVWkvY29tcG9uZW50cy9tb2xlY3VsZXMvZm9ybS1zdWJtaXR0ZXIvZm9ybS1zdWJtaXR0ZXInO1xuXG5jb25zdCBUQUdfTkFNRSA9ICdmb3JtJztcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgRm9ybVN1Ym1pdHRlciBleHRlbmRzIEZvcm1TdWJtaXR0ZXJDb3JlIHtcbiAgICBwcm90ZWN0ZWQgb25FdmVudChldmVudDogRXZlbnQpOiB2b2lkIHtcbiAgICAgICAgY29uc3QgdHJpZ2dlciA9IDxIVE1MRm9ybUVsZW1lbnQ+ZXZlbnQuY3VycmVudFRhcmdldDtcbiAgICAgICAgY29uc3QgZm9ybSA9IDxIVE1MRm9ybUVsZW1lbnQ+dHJpZ2dlci5jbG9zZXN0KFRBR19OQU1FKTtcblxuICAgICAgICBpZiAoIWZvcm0pIHtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuXG4gICAgICAgIGNvbnN0IHN1Ym1pdCA9IDxIVE1MQnV0dG9uRWxlbWVudCB8IEhUTUxJbnB1dEVsZW1lbnQ+Zm9ybS5xdWVyeVNlbGVjdG9yKCdbdHlwZT1cInN1Ym1pdFwiXScpXG4gICAgICAgICAgICB8fCA8SFRNTEJ1dHRvbkVsZW1lbnQ+Zm9ybS5xdWVyeVNlbGVjdG9yKCdidXR0b246bm90KFt0eXBlPVwiYnV0dG9uXCJdKScpO1xuXG4gICAgICAgIGlmIChzdWJtaXQpIHtcbiAgICAgICAgICAgIHN1Ym1pdC5jbGljaygpO1xuICAgICAgICB9XG5cbiAgICAgICAgZm9ybS5zdWJtaXQoKTtcbiAgICB9XG59XG4iLCJpbXBvcnQgQ29tcG9uZW50IGZyb20gJ1Nob3BVaS9tb2RlbHMvY29tcG9uZW50JztcblxuY29uc3QgVEFHX05BTUUgPSAnZm9ybSc7XG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIEZvcm1TdWJtaXR0ZXIgZXh0ZW5kcyBDb21wb25lbnQge1xuICAgIHByb3RlY3RlZCB0cmlnZ2VyczogSFRNTEVsZW1lbnRbXTtcblxuICAgIHByb3RlY3RlZCByZWFkeUNhbGxiYWNrKCk6IHZvaWQge31cblxuICAgIHByb3RlY3RlZCBpbml0KCk6IHZvaWQge1xuICAgICAgICB0aGlzLnRyaWdnZXJzID0gPEhUTUxFbGVtZW50W10+QXJyYXkuZnJvbShkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKHRoaXMudHJpZ2dlclNlbGVjdG9yKSk7XG4gICAgICAgIHRoaXMubWFwRXZlbnRzKCk7XG4gICAgfVxuXG4gICAgcHJvdGVjdGVkIG1hcEV2ZW50cygpOiB2b2lkIHtcbiAgICAgICAgdGhpcy50cmlnZ2Vycy5mb3JFYWNoKCh0cmlnZ2VyKSA9PlxuICAgICAgICAgICAgdHJpZ2dlci5hZGRFdmVudExpc3RlbmVyKHRoaXMuZXZlbnROYW1lLCAoZXZlbnQ6IEV2ZW50KSA9PiB0aGlzLm9uRXZlbnQoZXZlbnQpKSxcbiAgICAgICAgKTtcbiAgICB9XG5cbiAgICBwcm90ZWN0ZWQgb25FdmVudChldmVudDogRXZlbnQpOiB2b2lkIHtcbiAgICAgICAgY29uc3QgdHJpZ2dlciA9IDxIVE1MRm9ybUVsZW1lbnQ+ZXZlbnQuY3VycmVudFRhcmdldDtcbiAgICAgICAgY29uc3QgZm9ybSA9IDxIVE1MRm9ybUVsZW1lbnQ+dHJpZ2dlci5jbG9zZXN0KFRBR19OQU1FKTtcblxuICAgICAgICBpZiAoIWZvcm0pIHtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuXG4gICAgICAgIGNvbnN0IHN1Ym1pdCA9XG4gICAgICAgICAgICA8SFRNTEJ1dHRvbkVsZW1lbnQgfCBIVE1MSW5wdXRFbGVtZW50PmZvcm0ucXVlcnlTZWxlY3RvcignW3R5cGU9XCJzdWJtaXRcIl0nKSB8fFxuICAgICAgICAgICAgPEhUTUxCdXR0b25FbGVtZW50PmZvcm0ucXVlcnlTZWxlY3RvcignYnV0dG9uJyk7XG5cbiAgICAgICAgaWYgKHN1Ym1pdCkge1xuICAgICAgICAgICAgc3VibWl0LmNsaWNrKCk7XG4gICAgICAgIH1cblxuICAgICAgICBmb3JtLnN1Ym1pdCgpO1xuICAgIH1cblxuICAgIHByb3RlY3RlZCBnZXQgdHJpZ2dlclNlbGVjdG9yKCk6IHN0cmluZyB7XG4gICAgICAgIHJldHVybiB0aGlzLmdldEF0dHJpYnV0ZSgndHJpZ2dlci1zZWxlY3RvcicpO1xuICAgIH1cblxuICAgIHByb3RlY3RlZCBnZXQgZXZlbnROYW1lKCk6IHN0cmluZyB7XG4gICAgICAgIHJldHVybiB0aGlzLmdldEF0dHJpYnV0ZSgnZXZlbnQnKTtcbiAgICB9XG59XG4iXSwic291cmNlUm9vdCI6IiJ9