(window["webpackJsonp_yves_default"] = window["webpackJsonp_yves_default"] || []).push([["form-clear"],{

/***/ "./vendor/spryker-shop/shop-ui/src/SprykerShop/Yves/ShopUi/Theme/default/components/molecules/form-clear/form-clear.ts":
/*!*****************************************************************************************************************************!*\
  !*** ./vendor/spryker-shop/shop-ui/src/SprykerShop/Yves/ShopUi/Theme/default/components/molecules/form-clear/form-clear.ts ***!
  \*****************************************************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return FormClear; });
/* harmony import */ var _models_component__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../../models/component */ "./vendor/spryker-shop/shop-ui/src/SprykerShop/Yves/ShopUi/Theme/default/models/component.ts");
function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }


/**
 * @event formFieldsClearAfter An event which is triggered after the form fields are cleared.
 */

class FormClear extends _models_component__WEBPACK_IMPORTED_MODULE_0__["default"] {
  constructor() {
    super(...arguments);

    _defineProperty(this, "form", void 0);

    _defineProperty(this, "triggers", void 0);

    _defineProperty(this, "targets", void 0);

    _defineProperty(this, "ignoreElements", void 0);

    _defineProperty(this, "filterElements", void 0);

    _defineProperty(this, "formFieldsClearAfter", void 0);
  }

  readyCallback() {
    /* tslint:disable: deprecation */
    this.triggers = Array.from(this.triggerClassName ? document.getElementsByClassName(this.triggerClassName) : document.querySelectorAll(this.triggerSelector));
    this.form = this.formClassName ? document.getElementsByClassName(this.formClassName)[0] : document.querySelector(this.formSelector);
    this.ignoreElements = Array.from(this.ignoreClassName ? this.form.getElementsByClassName(this.ignoreClassName) : this.form.querySelectorAll(this.ignoreSelector));
    /* tslint:enable: deprecation */

    var formInputs = Array.from(this.form.getElementsByTagName('input'));
    var formSelects = Array.from(this.form.getElementsByTagName('select'));
    this.targets = [...formInputs, ...formSelects];
    this.filterElements = this.targets.filter(element => !this.ignoreElements.includes(element));
    this.mapEvents();
  }

  mapEvents() {
    this.createCustomEvents();
    this.triggers.forEach(input => {
      input.addEventListener('change', () => this.onChange(input));
    });
  }

  onChange(input) {
    var isChecked = input.checked;

    if (isChecked) {
      this.clearFormValues();
    }
  }
  /**
   * Clears an array of the form elements and triggers the custom event formFieldsClearAfter.
   * @param element HTMLFormElement is the element for clear action.
   */


  clearFormValues() {
    this.filterElements.forEach(element => {
      this.clearFormField(element);
    });
    this.dispatchEvent(this.formFieldsClearAfter);
  }
  /**
   * Clears current form field.
   * @param element HTMLFormElement is the element for clear action.
   */


  clearFormField(element) {
    var tagName = this.getTagName(element);

    if (tagName === 'INPUT') {
      var inputType = element.type;

      if (inputType === 'text' || inputType === 'hidden') {
        element.value = '';
      }

      if (inputType === 'checkbox' || inputType === 'radio') {
        element.checked = false;
      }
    }

    if (tagName === 'SELECT') {
      element.selectedIndex = 0;
    }
  }
  /**
   * Gets a tag name of the current element.
   */


  getTagName(element) {
    return element.tagName.toUpperCase();
  }

  createCustomEvents() {
    this.formFieldsClearAfter = new CustomEvent('form-fields-clear-after');
  }
  /**
   * Gets a querySelector name of the form.
   *
   * @deprecated Use formClassName() instead.
   */


  get formSelector() {
    return this.getAttribute('form-selector');
  }

  get formClassName() {
    return this.getAttribute('form-class-name');
  }
  /**
   * Gets a querySelector name of the trigger element.
   *
   * @deprecated Use triggerClassName() instead.
   */


  get triggerSelector() {
    return this.getAttribute('trigger-selector');
  }

  get triggerClassName() {
    return this.getAttribute('trigger-class-name');
  }
  /**
   * Gets a querySelector name of the ignore element.
   *
   * @deprecated Use ignoreClassName() instead.
   */


  get ignoreSelector() {
    return this.getAttribute('ignore-selector');
  }

  get ignoreClassName() {
    return this.getAttribute('ignore-class-name');
  }

}

/***/ })

}]);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vLi92ZW5kb3Ivc3ByeWtlci1zaG9wL3Nob3AtdWkvc3JjL1NwcnlrZXJTaG9wL1l2ZXMvU2hvcFVpL1RoZW1lL2RlZmF1bHQvY29tcG9uZW50cy9tb2xlY3VsZXMvZm9ybS1jbGVhci9mb3JtLWNsZWFyLnRzIl0sIm5hbWVzIjpbIkZvcm1DbGVhciIsIkNvbXBvbmVudCIsInJlYWR5Q2FsbGJhY2siLCJ0cmlnZ2VycyIsIkFycmF5IiwiZnJvbSIsInRyaWdnZXJDbGFzc05hbWUiLCJkb2N1bWVudCIsImdldEVsZW1lbnRzQnlDbGFzc05hbWUiLCJxdWVyeVNlbGVjdG9yQWxsIiwidHJpZ2dlclNlbGVjdG9yIiwiZm9ybSIsImZvcm1DbGFzc05hbWUiLCJxdWVyeVNlbGVjdG9yIiwiZm9ybVNlbGVjdG9yIiwiaWdub3JlRWxlbWVudHMiLCJpZ25vcmVDbGFzc05hbWUiLCJpZ25vcmVTZWxlY3RvciIsImZvcm1JbnB1dHMiLCJnZXRFbGVtZW50c0J5VGFnTmFtZSIsImZvcm1TZWxlY3RzIiwidGFyZ2V0cyIsImZpbHRlckVsZW1lbnRzIiwiZmlsdGVyIiwiZWxlbWVudCIsImluY2x1ZGVzIiwibWFwRXZlbnRzIiwiY3JlYXRlQ3VzdG9tRXZlbnRzIiwiZm9yRWFjaCIsImlucHV0IiwiYWRkRXZlbnRMaXN0ZW5lciIsIm9uQ2hhbmdlIiwiaXNDaGVja2VkIiwiY2hlY2tlZCIsImNsZWFyRm9ybVZhbHVlcyIsImNsZWFyRm9ybUZpZWxkIiwiZGlzcGF0Y2hFdmVudCIsImZvcm1GaWVsZHNDbGVhckFmdGVyIiwidGFnTmFtZSIsImdldFRhZ05hbWUiLCJpbnB1dFR5cGUiLCJ0eXBlIiwidmFsdWUiLCJzZWxlY3RlZEluZGV4IiwidG9VcHBlckNhc2UiLCJDdXN0b21FdmVudCIsImdldEF0dHJpYnV0ZSJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7O0FBQUE7QUFFQTs7OztBQUdlLE1BQU1BLFNBQU4sU0FBd0JDLHlEQUF4QixDQUFrQztB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QUNKO0FBRUQ7Ozs7O0FBR0FKLFlBQVUsQ0FBQ2YsT0FBRCxFQUErQjtBQUNyQyxXQUFPQSxPQUFPLENBQUNjLE9BQVIsQ0FBZ0JNLFdBQWhCLEVBQVA7QUFDSDs7QUFFU2pCLG9CQUFWLEdBQXFDO0FBQ2pDLFNBQUtVLG9CQUFMLEdBQXlDLElBQUlRLFdBQUosQ0FBZ0IseUJBQWhCLENBQXpDO0FBQ0g7QUFFRDs7Ozs7OztBQUtBLE1BQUkvQixZQUFKLEdBQTJCO0FBQ3ZCLFdBQU8sS0FBS2dDLFlBQUwsQ0FBa0IsZUFBbEIsQ0FBUDtBQUNIOztBQUNELE1BQWNsQyxhQUFkLEdBQXNDO0FBQ2xDLFdBQU8sS0FBS2tDLFlBQUwsQ0FBa0IsaUJBQWxCLENBQVA7QUFDSDtBQUVEOzs7Ozs7O0FBS0EsTUFBSXBDLGVBQUosR0FBOEI7QUFDMUIsV0FBTyxLQUFLb0MsWUFBTCxDQUFrQixrQkFBbEIsQ0FBUDtBQUNIOztBQUNELE1BQWN4QyxnQkFBZCxHQUF5QztBQUNyQyxXQUFPLEtBQUt3QyxZQUFMLENBQWtCLG9CQUFsQixDQUFQO0FBQ0g7QUFFRDs7Ozs7OztBQUtBLE1BQUk3QixjQUFKLEdBQTZCO0FBQ3pCLFdBQU8sS0FBSzZCLFlBQUwsQ0FBa0IsaUJBQWxCLENBQVA7QUFDSDs7QUFDRCxNQUFjOUIsZUFBZCxHQUF3QztBQUNwQyxXQUFPLEtBQUs4QixZQUFMLENBQWtCLG1CQUFsQixDQUFQO0FBQ0g7O0FBMUo0QyxDIiwiZmlsZSI6Ii4vanMveXZlc19kZWZhdWx0LmZvcm0tY2xlYXIuZXNtLmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IENvbXBvbmVudCBmcm9tICcuLi8uLi8uLi9tb2RlbHMvY29tcG9uZW50JztcblxuLyoqXG4gKiBAZXZlbnQgZm9ybUZpZWxkc0NsZWFyQWZ0ZXIgQW4gZXZlbnQgd2hpY2ggaXMgdHJpZ2dlcmVkIGFmdGVyIHRoZSBmb3JtIGZpZWxkcyBhcmUgY2xlYXJlZC5cbiAqL1xuZXhwb3J0IGRlZmF1bHQgY2xhc3MgRm9ybUNsZWFyIGV4dGVuZHMgQ29tcG9uZW50IHtcbiAgICAvKipcbiAgICAgKiBUaGUgY3VycmVudCBmb3JtLlxuICAgICAqL1xuICAgIGZvcm06IEhUTUxFbGVtZW50O1xuXG4gICAgLyoqXG4gICAgICogQ29sbGVjdGlvbiBvZiB0aGUgdHJpZ2dlcnMgZWxlbWVudHMuXG4gICAgICovXG4gICAgdHJpZ2dlcnM6IEhUTUxFbGVtZW50W107XG5cbiAgICAvKipcbiAgICAgKiBDb2xsZWN0aW9uIG9mIHRoZSBmb3JtIGVsZW1lbmV0cy5cbiAgICAgKi9cbiAgICB0YXJnZXRzOiBIVE1MRWxlbWVudFtdO1xuXG4gICAgLyoqXG4gICAgICogQ29sbGVjdGlvbiBvZiB0aGUgdGFyZ2V0cyBlbGVtZW50cyB3aGljaCBzaG91bGQgYmUgaWdub3JlZCB3aGlsZSBjb2xsZWN0aW9uIHRoZSBmaWx0ZXJzLlxuICAgICAqL1xuICAgIGlnbm9yZUVsZW1lbnRzOiBIVE1MRWxlbWVudFtdO1xuXG4gICAgLyoqXG4gICAgICogQ29sbGVjdGlvbiBvZiB0aGUgZmlsdGVyIGVsZW1lbnRzLlxuICAgICAqL1xuICAgIGZpbHRlckVsZW1lbnRzOiBIVE1MRWxlbWVudFtdO1xuXG4gICAgLyoqXG4gICAgICogVGhlIGN1c3RvbSBldmVudC5cbiAgICAgKi9cbiAgICBmb3JtRmllbGRzQ2xlYXJBZnRlcjogQ3VzdG9tRXZlbnQ7XG5cbiAgICBwcm90ZWN0ZWQgcmVhZHlDYWxsYmFjaygpOiB2b2lkIHtcbiAgICAgICAgLyogdHNsaW50OmRpc2FibGU6IGRlcHJlY2F0aW9uICovXG4gICAgICAgIHRoaXMudHJpZ2dlcnMgPSA8SFRNTEVsZW1lbnRbXT4oXG4gICAgICAgICAgICBBcnJheS5mcm9tKFxuICAgICAgICAgICAgICAgIHRoaXMudHJpZ2dlckNsYXNzTmFtZVxuICAgICAgICAgICAgICAgICAgICA/IGRvY3VtZW50LmdldEVsZW1lbnRzQnlDbGFzc05hbWUodGhpcy50cmlnZ2VyQ2xhc3NOYW1lKVxuICAgICAgICAgICAgICAgICAgICA6IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwodGhpcy50cmlnZ2VyU2VsZWN0b3IpLFxuICAgICAgICAgICAgKVxuICAgICAgICApO1xuICAgICAgICB0aGlzLmZvcm0gPSA8SFRNTEVsZW1lbnQ+KFxuICAgICAgICAgICAgKHRoaXMuZm9ybUNsYXNzTmFtZVxuICAgICAgICAgICAgICAgID8gZG9jdW1lbnQuZ2V0RWxlbWVudHNCeUNsYXNzTmFtZSh0aGlzLmZvcm1DbGFzc05hbWUpWzBdXG4gICAgICAgICAgICAgICAgOiBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKHRoaXMuZm9ybVNlbGVjdG9yKSlcbiAgICAgICAgKTtcbiAgICAgICAgdGhpcy5pZ25vcmVFbGVtZW50cyA9IDxIVE1MRWxlbWVudFtdPihcbiAgICAgICAgICAgIEFycmF5LmZyb20oXG4gICAgICAgICAgICAgICAgdGhpcy5pZ25vcmVDbGFzc05hbWVcbiAgICAgICAgICAgICAgICAgICAgPyB0aGlzLmZvcm0uZ2V0RWxlbWVudHNCeUNsYXNzTmFtZSh0aGlzLmlnbm9yZUNsYXNzTmFtZSlcbiAgICAgICAgICAgICAgICAgICAgOiB0aGlzLmZvcm0ucXVlcnlTZWxlY3RvckFsbCh0aGlzLmlnbm9yZVNlbGVjdG9yKSxcbiAgICAgICAgICAgIClcbiAgICAgICAgKTtcbiAgICAgICAgLyogdHNsaW50OmVuYWJsZTogZGVwcmVjYXRpb24gKi9cbiAgICAgICAgY29uc3QgZm9ybUlucHV0cyA9IDxIVE1MRWxlbWVudFtdPkFycmF5LmZyb20odGhpcy5mb3JtLmdldEVsZW1lbnRzQnlUYWdOYW1lKCdpbnB1dCcpKTtcbiAgICAgICAgY29uc3QgZm9ybVNlbGVjdHMgPSA8SFRNTEVsZW1lbnRbXT5BcnJheS5mcm9tKHRoaXMuZm9ybS5nZXRFbGVtZW50c0J5VGFnTmFtZSgnc2VsZWN0JykpO1xuICAgICAgICB0aGlzLnRhcmdldHMgPSBbLi4uZm9ybUlucHV0cywgLi4uZm9ybVNlbGVjdHNdO1xuICAgICAgICB0aGlzLmZpbHRlckVsZW1lbnRzID0gdGhpcy50YXJnZXRzLmZpbHRlcigoZWxlbWVudCkgPT4gIXRoaXMuaWdub3JlRWxlbWVudHMuaW5jbHVkZXMoZWxlbWVudCkpO1xuXG4gICAgICAgIHRoaXMubWFwRXZlbnRzKCk7XG4gICAgfVxuXG4gICAgcHJvdGVjdGVkIG1hcEV2ZW50cygpOiB2b2lkIHtcbiAgICAgICAgdGhpcy5jcmVhdGVDdXN0b21FdmVudHMoKTtcbiAgICAgICAgdGhpcy50cmlnZ2Vycy5mb3JFYWNoKChpbnB1dCkgPT4ge1xuICAgICAgICAgICAgaW5wdXQuYWRkRXZlbnRMaXN0ZW5lcignY2hhbmdlJywgKCkgPT4gdGhpcy5vbkNoYW5nZShpbnB1dCkpO1xuICAgICAgICB9KTtcbiAgICB9XG5cbiAgICBwcm90ZWN0ZWQgb25DaGFuZ2UoaW5wdXQ6IEhUTUxFbGVtZW50KTogdm9pZCB7XG4gICAgICAgIGNvbnN0IGlzQ2hlY2tlZCA9ICg8SFRNTElucHV0RWxlbWVudD5pbnB1dCkuY2hlY2tlZDtcbiAgICAgICAgaWYgKGlzQ2hlY2tlZCkge1xuICAgICAgICAgICAgdGhpcy5jbGVhckZvcm1WYWx1ZXMoKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIC8qKlxuICAgICAqIENsZWFycyBhbiBhcnJheSBvZiB0aGUgZm9ybSBlbGVtZW50cyBhbmQgdHJpZ2dlcnMgdGhlIGN1c3RvbSBldmVudCBmb3JtRmllbGRzQ2xlYXJBZnRlci5cbiAgICAgKiBAcGFyYW0gZWxlbWVudCBIVE1MRm9ybUVsZW1lbnQgaXMgdGhlIGVsZW1lbnQgZm9yIGNsZWFyIGFjdGlvbi5cbiAgICAgKi9cbiAgICBjbGVhckZvcm1WYWx1ZXMoKTogdm9pZCB7XG4gICAgICAgIHRoaXMuZmlsdGVyRWxlbWVudHMuZm9yRWFjaCgoZWxlbWVudDogSFRNTEZvcm1FbGVtZW50KSA9PiB7XG4gICAgICAgICAgICB0aGlzLmNsZWFyRm9ybUZpZWxkKGVsZW1lbnQpO1xuICAgICAgICB9KTtcblxuICAgICAgICB0aGlzLmRpc3BhdGNoRXZlbnQodGhpcy5mb3JtRmllbGRzQ2xlYXJBZnRlcik7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogQ2xlYXJzIGN1cnJlbnQgZm9ybSBmaWVsZC5cbiAgICAgKiBAcGFyYW0gZWxlbWVudCBIVE1MRm9ybUVsZW1lbnQgaXMgdGhlIGVsZW1lbnQgZm9yIGNsZWFyIGFjdGlvbi5cbiAgICAgKi9cbiAgICBjbGVhckZvcm1GaWVsZChlbGVtZW50OiBIVE1MRm9ybUVsZW1lbnQpOiB2b2lkIHtcbiAgICAgICAgY29uc3QgdGFnTmFtZSA9IHRoaXMuZ2V0VGFnTmFtZShlbGVtZW50KTtcbiAgICAgICAgaWYgKHRhZ05hbWUgPT09ICdJTlBVVCcpIHtcbiAgICAgICAgICAgIGNvbnN0IGlucHV0VHlwZSA9IGVsZW1lbnQudHlwZTtcblxuICAgICAgICAgICAgaWYgKGlucHV0VHlwZSA9PT0gJ3RleHQnIHx8IGlucHV0VHlwZSA9PT0gJ2hpZGRlbicpIHtcbiAgICAgICAgICAgICAgICBlbGVtZW50LnZhbHVlID0gJyc7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBpZiAoaW5wdXRUeXBlID09PSAnY2hlY2tib3gnIHx8IGlucHV0VHlwZSA9PT0gJ3JhZGlvJykge1xuICAgICAgICAgICAgICAgIGVsZW1lbnQuY2hlY2tlZCA9IGZhbHNlO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgaWYgKHRhZ05hbWUgPT09ICdTRUxFQ1QnKSB7XG4gICAgICAgICAgICBlbGVtZW50LnNlbGVjdGVkSW5kZXggPSAwO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogR2V0cyBhIHRhZyBuYW1lIG9mIHRoZSBjdXJyZW50IGVsZW1lbnQuXG4gICAgICovXG4gICAgZ2V0VGFnTmFtZShlbGVtZW50OiBIVE1MRWxlbWVudCk6IHN0cmluZyB7XG4gICAgICAgIHJldHVybiBlbGVtZW50LnRhZ05hbWUudG9VcHBlckNhc2UoKTtcbiAgICB9XG5cbiAgICBwcm90ZWN0ZWQgY3JlYXRlQ3VzdG9tRXZlbnRzKCk6IHZvaWQge1xuICAgICAgICB0aGlzLmZvcm1GaWVsZHNDbGVhckFmdGVyID0gPEN1c3RvbUV2ZW50Pm5ldyBDdXN0b21FdmVudCgnZm9ybS1maWVsZHMtY2xlYXItYWZ0ZXInKTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBHZXRzIGEgcXVlcnlTZWxlY3RvciBuYW1lIG9mIHRoZSBmb3JtLlxuICAgICAqXG4gICAgICogQGRlcHJlY2F0ZWQgVXNlIGZvcm1DbGFzc05hbWUoKSBpbnN0ZWFkLlxuICAgICAqL1xuICAgIGdldCBmb3JtU2VsZWN0b3IoKTogc3RyaW5nIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuZ2V0QXR0cmlidXRlKCdmb3JtLXNlbGVjdG9yJyk7XG4gICAgfVxuICAgIHByb3RlY3RlZCBnZXQgZm9ybUNsYXNzTmFtZSgpOiBzdHJpbmcge1xuICAgICAgICByZXR1cm4gdGhpcy5nZXRBdHRyaWJ1dGUoJ2Zvcm0tY2xhc3MtbmFtZScpO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIEdldHMgYSBxdWVyeVNlbGVjdG9yIG5hbWUgb2YgdGhlIHRyaWdnZXIgZWxlbWVudC5cbiAgICAgKlxuICAgICAqIEBkZXByZWNhdGVkIFVzZSB0cmlnZ2VyQ2xhc3NOYW1lKCkgaW5zdGVhZC5cbiAgICAgKi9cbiAgICBnZXQgdHJpZ2dlclNlbGVjdG9yKCk6IHN0cmluZyB7XG4gICAgICAgIHJldHVybiB0aGlzLmdldEF0dHJpYnV0ZSgndHJpZ2dlci1zZWxlY3RvcicpO1xuICAgIH1cbiAgICBwcm90ZWN0ZWQgZ2V0IHRyaWdnZXJDbGFzc05hbWUoKTogc3RyaW5nIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuZ2V0QXR0cmlidXRlKCd0cmlnZ2VyLWNsYXNzLW5hbWUnKTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBHZXRzIGEgcXVlcnlTZWxlY3RvciBuYW1lIG9mIHRoZSBpZ25vcmUgZWxlbWVudC5cbiAgICAgKlxuICAgICAqIEBkZXByZWNhdGVkIFVzZSBpZ25vcmVDbGFzc05hbWUoKSBpbnN0ZWFkLlxuICAgICAqL1xuICAgIGdldCBpZ25vcmVTZWxlY3RvcigpOiBzdHJpbmcge1xuICAgICAgICByZXR1cm4gdGhpcy5nZXRBdHRyaWJ1dGUoJ2lnbm9yZS1zZWxlY3RvcicpO1xuICAgIH1cbiAgICBwcm90ZWN0ZWQgZ2V0IGlnbm9yZUNsYXNzTmFtZSgpOiBzdHJpbmcge1xuICAgICAgICByZXR1cm4gdGhpcy5nZXRBdHRyaWJ1dGUoJ2lnbm9yZS1jbGFzcy1uYW1lJyk7XG4gICAgfVxufVxuIl0sInNvdXJjZVJvb3QiOiIifQ==