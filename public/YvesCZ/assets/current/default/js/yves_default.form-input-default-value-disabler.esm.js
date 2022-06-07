(window["webpackJsonp_yves_default"] = window["webpackJsonp_yves_default"] || []).push([["form-input-default-value-disabler"],{

/***/ "./vendor/spryker-shop/shop-ui/src/SprykerShop/Yves/ShopUi/Theme/default/components/molecules/form-input-default-value-disabler/form-input-default-value-disabler.ts":
/*!***************************************************************************************************************************************************************************!*\
  !*** ./vendor/spryker-shop/shop-ui/src/SprykerShop/Yves/ShopUi/Theme/default/components/molecules/form-input-default-value-disabler/form-input-default-value-disabler.ts ***!
  \***************************************************************************************************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return FormInputDefaultValueDisabler; });
/* harmony import */ var _models_component__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../../models/component */ "./vendor/spryker-shop/shop-ui/src/SprykerShop/Yves/ShopUi/Theme/default/models/component.ts");
function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }


class FormInputDefaultValueDisabler extends _models_component__WEBPACK_IMPORTED_MODULE_0__["default"] {
  constructor() {
    super(...arguments);

    _defineProperty(this, "forms", void 0);
  }

  readyCallback() {
    this.forms = Array.from(document.querySelectorAll(this.formSelector));
    this.mapEvents();
  }

  mapEvents() {
    this.forms.forEach(form => {
      form.addEventListener('submit', event => this.onFormSubmit(event));
    });
  }

  onFormSubmit(event) {
    event.preventDefault();
    var form = event.currentTarget;
    this.disableInputsWithDefaultValues(form);
  }
  /**
   * Toggles the disabled attribute and submits the form.
   * @param form HTMLFormElement is the element for submit event.
   */


  disableInputsWithDefaultValues(form) {
    var inputs = Array.from(form.querySelectorAll(this.inputSelector));
    inputs.forEach(input => {
      var defaultValue = input.getAttribute(this.defaultValueAttribute);

      if (defaultValue === input.value) {
        input.setAttribute('disabled', 'disabled');
        return;
      }

      input.removeAttribute('disabled');
    });
    form.submit();
  }
  /**
   * Gets a querySelector name of the form element.
   */


  get formSelector() {
    return this.getAttribute('form-selector');
  }
  /**
   * Gets a querySelector name of the input element.
   */


  get inputSelector() {
    return this.getAttribute('input-selector');
  }
  /**
   * Gets a name of the default value attribute.
   */


  get defaultValueAttribute() {
    return this.getAttribute('default-value-attribute');
  }

}

/***/ })

}]);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vLi92ZW5kb3Ivc3ByeWtlci1zaG9wL3Nob3AtdWkvc3JjL1NwcnlrZXJTaG9wL1l2ZXMvU2hvcFVpL1RoZW1lL2RlZmF1bHQvY29tcG9uZW50cy9tb2xlY3VsZXMvZm9ybS1pbnB1dC1kZWZhdWx0LXZhbHVlLWRpc2FibGVyL2Zvcm0taW5wdXQtZGVmYXVsdC12YWx1ZS1kaXNhYmxlci50cyJdLCJuYW1lcyI6WyJGb3JtSW5wdXREZWZhdWx0VmFsdWVEaXNhYmxlciIsIkNvbXBvbmVudCIsInJlYWR5Q2FsbGJhY2siLCJmb3JtcyIsIkFycmF5IiwiZnJvbSIsImRvY3VtZW50IiwicXVlcnlTZWxlY3RvckFsbCIsImZvcm1TZWxlY3RvciIsIm1hcEV2ZW50cyIsImZvckVhY2giLCJmb3JtIiwiYWRkRXZlbnRMaXN0ZW5lciIsImV2ZW50Iiwib25Gb3JtU3VibWl0IiwicHJldmVudERlZmF1bHQiLCJjdXJyZW50VGFyZ2V0IiwiZGlzYWJsZUlucHV0c1dpdGhEZWZhdWx0VmFsdWVzIiwiaW5wdXRzIiwiaW5wdXRTZWxlY3RvciIsImlucHV0IiwiZGVmYXVsdFZhbHVlIiwiZ2V0QXR0cmlidXRlIiwiZGVmYXVsdFZhbHVlQXR0cmlidXRlIiwidmFsdWUiLCJzZXRBdHRyaWJ1dGUiLCJyZW1vdmVBdHRyaWJ1dGUiLCJzdWJtaXQiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7OztBQUFBO0FBRWUsTUFBTUEsNkJBQU4sU0FBNENDLHlEQUE1QyxDQUFzRDtBQUFBO0FBQUE7O0FBQUE7QUFBQTs7QUFNdkRDLGVBQVYsR0FBZ0M7QUFDNUIsU0FBS0MsS0FBTCxHQUFnQ0MsS0FBSyxDQUFDQyxJQUFOLENBQVdDLFFBQVEsQ0FBQ0MsZ0JBQVQsQ0FBMEIsS0FBS0MsWUFBL0IsQ0FBWCxDQUFoQztBQUNBLFNBQUtDLFNBQUw7QUFDSDs7QUFFU0EsV0FBVixHQUE0QjtBQUN4QixTQUFLTixLQUFMLENBQVdPLE9BQVgsQ0FBb0JDLElBQUQsSUFBdUI7QUFDdENBLFVBQUksQ0FBQ0MsZ0JBQUwsQ0FBc0IsUUFBdEIsRUFBaUNDLEtBQUQsSUFBa0IsS0FBS0MsWUFBTCxDQUFrQkQsS0FBbEIsQ0FBbEQ7QUFDSCxLQUZEO0FBR0g7O0FBRVNDLGNBQVYsQ0FBdUJELEtBQXZCLEVBQTJDO0FBQ3ZDQSxTQUFLLENBQUNFLGNBQU47QUFDQSxRQUFNSixJQUFJLEdBQW9CRSxLQUFLLENBQUNHLGFBQXBDO0FBQ0EsU0FBS0MsOEJBQUwsQ0FBb0NOLElBQXBDO0FBQ0g7QUFFRDs7Ozs7O0FBSUFNLGdDQUE4QixDQUFDTixJQUFELEVBQXdCO0FBQ2xELFFBQU1PLE1BQU0sR0FBdUJkLEtBQUssQ0FBQ0MsSUFBTixDQUFXTSxJQUFJLENBQUNKLGdCQUFMLENBQXNCLEtBQUtZLGFBQTNCLENBQVgsQ0FBbkM7QUFFQUQsVUFBTSxDQUFDUixPQUFQLENBQWdCVSxLQUFELElBQTZCO0FBQ3hDLFVBQU1DLFlBQVksR0FBR0QsS0FBSyxDQUFDRSxZQUFOLENBQW1CLEtBQUtDLHFCQUF4QixDQUFyQjs7QUFFQSxVQUFJRixZQUFZLEtBQUtELEtBQUssQ0FBQ0ksS0FBM0IsRUFBa0M7QUFDOUJKLGFBQUssQ0FBQ0ssWUFBTixDQUFtQixVQUFuQixFQUErQixVQUEvQjtBQUVBO0FBQ0g7O0FBRURMLFdBQUssQ0FBQ00sZUFBTixDQUFzQixVQUF0QjtBQUNILEtBVkQ7QUFZQWYsUUFBSSxDQUFDZ0IsTUFBTDtBQUNIO0FBRUQ7Ozs7O0FBR0EsTUFBSW5CLFlBQUosR0FBMkI7QUFDdkIsV0FBTyxLQUFLYyxZQUFMLENBQWtCLGVBQWxCLENBQVA7QUFDSDtBQUVEOzs7OztBQUdBLE1BQUlILGFBQUosR0FBNEI7QUFDeEIsV0FBTyxLQUFLRyxZQUFMLENBQWtCLGdCQUFsQixDQUFQO0FBQ0g7QUFFRDs7Ozs7QUFHQSxNQUFJQyxxQkFBSixHQUFvQztBQUNoQyxXQUFPLEtBQUtELFlBQUwsQ0FBa0IseUJBQWxCLENBQVA7QUFDSDs7QUFoRWdFLEMiLCJmaWxlIjoiLi9qcy95dmVzX2RlZmF1bHQuZm9ybS1pbnB1dC1kZWZhdWx0LXZhbHVlLWRpc2FibGVyLmVzbS5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBDb21wb25lbnQgZnJvbSAnLi4vLi4vLi4vbW9kZWxzL2NvbXBvbmVudCc7XG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIEZvcm1JbnB1dERlZmF1bHRWYWx1ZURpc2FibGVyIGV4dGVuZHMgQ29tcG9uZW50IHtcbiAgICAvKipcbiAgICAgKiBDb2xsZWN0aW9uIG9mIHRoZSBmb3Jtcy5cbiAgICAgKi9cbiAgICBmb3JtczogSFRNTEZvcm1FbGVtZW50W107XG5cbiAgICBwcm90ZWN0ZWQgcmVhZHlDYWxsYmFjaygpOiB2b2lkIHtcbiAgICAgICAgdGhpcy5mb3JtcyA9IDxIVE1MRm9ybUVsZW1lbnRbXT5BcnJheS5mcm9tKGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwodGhpcy5mb3JtU2VsZWN0b3IpKTtcbiAgICAgICAgdGhpcy5tYXBFdmVudHMoKTtcbiAgICB9XG5cbiAgICBwcm90ZWN0ZWQgbWFwRXZlbnRzKCk6IHZvaWQge1xuICAgICAgICB0aGlzLmZvcm1zLmZvckVhY2goKGZvcm06IEhUTUxFbGVtZW50KSA9PiB7XG4gICAgICAgICAgICBmb3JtLmFkZEV2ZW50TGlzdGVuZXIoJ3N1Ym1pdCcsIChldmVudDogRXZlbnQpID0+IHRoaXMub25Gb3JtU3VibWl0KGV2ZW50KSk7XG4gICAgICAgIH0pO1xuICAgIH1cblxuICAgIHByb3RlY3RlZCBvbkZvcm1TdWJtaXQoZXZlbnQ6IEV2ZW50KTogdm9pZCB7XG4gICAgICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG4gICAgICAgIGNvbnN0IGZvcm0gPSA8SFRNTEZvcm1FbGVtZW50PmV2ZW50LmN1cnJlbnRUYXJnZXQ7XG4gICAgICAgIHRoaXMuZGlzYWJsZUlucHV0c1dpdGhEZWZhdWx0VmFsdWVzKGZvcm0pO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIFRvZ2dsZXMgdGhlIGRpc2FibGVkIGF0dHJpYnV0ZSBhbmQgc3VibWl0cyB0aGUgZm9ybS5cbiAgICAgKiBAcGFyYW0gZm9ybSBIVE1MRm9ybUVsZW1lbnQgaXMgdGhlIGVsZW1lbnQgZm9yIHN1Ym1pdCBldmVudC5cbiAgICAgKi9cbiAgICBkaXNhYmxlSW5wdXRzV2l0aERlZmF1bHRWYWx1ZXMoZm9ybTogSFRNTEZvcm1FbGVtZW50KSB7XG4gICAgICAgIGNvbnN0IGlucHV0cyA9IDxIVE1MSW5wdXRFbGVtZW50W10+QXJyYXkuZnJvbShmb3JtLnF1ZXJ5U2VsZWN0b3JBbGwodGhpcy5pbnB1dFNlbGVjdG9yKSk7XG5cbiAgICAgICAgaW5wdXRzLmZvckVhY2goKGlucHV0OiBIVE1MSW5wdXRFbGVtZW50KSA9PiB7XG4gICAgICAgICAgICBjb25zdCBkZWZhdWx0VmFsdWUgPSBpbnB1dC5nZXRBdHRyaWJ1dGUodGhpcy5kZWZhdWx0VmFsdWVBdHRyaWJ1dGUpO1xuXG4gICAgICAgICAgICBpZiAoZGVmYXVsdFZhbHVlID09PSBpbnB1dC52YWx1ZSkge1xuICAgICAgICAgICAgICAgIGlucHV0LnNldEF0dHJpYnV0ZSgnZGlzYWJsZWQnLCAnZGlzYWJsZWQnKTtcblxuICAgICAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgaW5wdXQucmVtb3ZlQXR0cmlidXRlKCdkaXNhYmxlZCcpO1xuICAgICAgICB9KTtcblxuICAgICAgICBmb3JtLnN1Ym1pdCgpO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIEdldHMgYSBxdWVyeVNlbGVjdG9yIG5hbWUgb2YgdGhlIGZvcm0gZWxlbWVudC5cbiAgICAgKi9cbiAgICBnZXQgZm9ybVNlbGVjdG9yKCk6IHN0cmluZyB7XG4gICAgICAgIHJldHVybiB0aGlzLmdldEF0dHJpYnV0ZSgnZm9ybS1zZWxlY3RvcicpO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIEdldHMgYSBxdWVyeVNlbGVjdG9yIG5hbWUgb2YgdGhlIGlucHV0IGVsZW1lbnQuXG4gICAgICovXG4gICAgZ2V0IGlucHV0U2VsZWN0b3IoKTogc3RyaW5nIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuZ2V0QXR0cmlidXRlKCdpbnB1dC1zZWxlY3RvcicpO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIEdldHMgYSBuYW1lIG9mIHRoZSBkZWZhdWx0IHZhbHVlIGF0dHJpYnV0ZS5cbiAgICAgKi9cbiAgICBnZXQgZGVmYXVsdFZhbHVlQXR0cmlidXRlKCk6IHN0cmluZyB7XG4gICAgICAgIHJldHVybiB0aGlzLmdldEF0dHJpYnV0ZSgnZGVmYXVsdC12YWx1ZS1hdHRyaWJ1dGUnKTtcbiAgICB9XG59XG4iXSwic291cmNlUm9vdCI6IiJ9