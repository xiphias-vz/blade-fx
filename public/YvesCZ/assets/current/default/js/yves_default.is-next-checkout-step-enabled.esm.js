(window["webpackJsonp_yves_default"] = window["webpackJsonp_yves_default"] || []).push([["is-next-checkout-step-enabled"],{

/***/ "./vendor/spryker-shop/checkout-page/src/SprykerShop/Yves/CheckoutPage/Theme/default/components/molecules/is-next-checkout-step-enabled/is-next-checkout-step-enabled.ts":
/*!*******************************************************************************************************************************************************************************!*\
  !*** ./vendor/spryker-shop/checkout-page/src/SprykerShop/Yves/CheckoutPage/Theme/default/components/molecules/is-next-checkout-step-enabled/is-next-checkout-step-enabled.ts ***!
  \*******************************************************************************************************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return IsNextCheckoutStepEnabled; });
/* harmony import */ var ShopUi_models_component__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ShopUi/models/component */ "./vendor/spryker-shop/shop-ui/src/SprykerShop/Yves/ShopUi/Theme/default/models/component.ts");
/* harmony import */ var _validate_next_checkout_step_validate_next_checkout_step__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../validate-next-checkout-step/validate-next-checkout-step */ "./vendor/spryker-shop/checkout-page/src/SprykerShop/Yves/CheckoutPage/Theme/default/components/molecules/validate-next-checkout-step/validate-next-checkout-step.ts");
function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }



class IsNextCheckoutStepEnabled extends ShopUi_models_component__WEBPACK_IMPORTED_MODULE_0__["default"] {
  constructor() {
    super(...arguments);

    _defineProperty(this, "trigger", void 0);

    _defineProperty(this, "target", void 0);
  }

  readyCallback() {
    if (this.triggerSelector) {
      this.trigger = document.querySelector(this.triggerSelector);
    }

    this.target = document.querySelector(this.targetSelector);

    if (this.trigger) {
      this.mapEvents();
    }
  }

  mapEvents() {
    this.trigger.addEventListener('change', () => this.onTriggerChange());
    this.target.addEventListener(_validate_next_checkout_step_validate_next_checkout_step__WEBPACK_IMPORTED_MODULE_1__["EVENT_INIT"], () => this.initTriggerState());
  }

  initTriggerState() {
    this.onTriggerChange();
  }

  onTriggerChange() {
    var currentValue = this.trigger.options[this.trigger.selectedIndex].value;

    if (currentValue === this.toggleOptionValue && this.target) {
      this.target.initTriggerState();
      return;
    }

    this.target.disableNextStepButton(false);
  }
  /**
   * Gets a querySelector name of the trigger element.
   */


  get triggerSelector() {
    return this.getAttribute('trigger-selector');
  }
  /**
   * Gets a querySelector name of the target element.
   */


  get targetSelector() {
    return this.getAttribute('target-selector');
  }
  /**
   * Gets an option value for comparison with chosen value from dropdown to enable 'validate-next-checkout-step'
   * component.
   */


  get toggleOptionValue() {
    return this.getAttribute('toggle-option-value');
  }

}

/***/ }),

/***/ "./vendor/spryker-shop/checkout-page/src/SprykerShop/Yves/CheckoutPage/Theme/default/components/molecules/validate-next-checkout-step/validate-next-checkout-step.ts":
/*!***************************************************************************************************************************************************************************!*\
  !*** ./vendor/spryker-shop/checkout-page/src/SprykerShop/Yves/CheckoutPage/Theme/default/components/molecules/validate-next-checkout-step/validate-next-checkout-step.ts ***!
  \***************************************************************************************************************************************************************************/
/*! exports provided: EVENT_INIT, default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "EVENT_INIT", function() { return EVENT_INIT; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return ValidateNextCheckoutStep; });
/* harmony import */ var ShopUi_models_component__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ShopUi/models/component */ "./vendor/spryker-shop/shop-ui/src/SprykerShop/Yves/ShopUi/Theme/default/models/component.ts");
function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }


var EVENT_INIT = 'afterInit';
/**
 * @event afterInit An event emitted when the component has been initialized.
 */

class ValidateNextCheckoutStep extends ShopUi_models_component__WEBPACK_IMPORTED_MODULE_0__["default"] {
  constructor() {
    super(...arguments);

    _defineProperty(this, "containers", void 0);

    _defineProperty(this, "triggers", void 0);

    _defineProperty(this, "target", void 0);

    _defineProperty(this, "dropdownTriggers", void 0);

    _defineProperty(this, "parentTarget", void 0);

    _defineProperty(this, "requiredFormFieldSelectors", 'select[required], input[required]');
  }

  readyCallback() {}

  init() {
    this.containers = Array.from(document.querySelectorAll(this.containerSelector));
    this.target = document.querySelector(this.targetSelector);
    this.dropdownTriggers = Array.from(document.querySelectorAll(this.dropdownTriggerSelector));

    if (this.parentTargetClassName) {
      this.parentTarget = document.getElementsByClassName(this.parentTargetClassName)[0];
    }

    if (this.isTriggerEnabled) {
      this.initTriggerState();
    }

    this.dispatchCustomEvent(EVENT_INIT);
  }

  mapEvents() {
    this.mapTriggerEvents();
    this.dropdownTriggers.forEach(element => {
      element.addEventListener('change', () => this.onDropdownTriggerChange());
    });

    if (this.parentTarget) {
      this.parentTarget.addEventListener('toggleForm', () => this.onDropdownTriggerChange());
    }
  }

  mapTriggerEvents() {
    if (this.triggers) {
      this.triggers.forEach(element => {
        element.addEventListener('input', () => this.onTriggerInput());
      });
    }
  }
  /**
   * Init the methods, which fill the collection of form fields and toggle disabling of button.
   */


  initTriggerState() {
    this.fillFormFieldsCollection();
    this.toggleDisablingNextStepButton();
    this.mapEvents();
  }

  fillFormFieldsCollection() {
    this.triggers = [];

    if (!this.containers) {
      return;
    }

    this.triggers = this.containers.reduce((collection, element) => {
      if (!element.classList.contains(this.classToToggle)) {
        collection.push(...Array.from(element.querySelectorAll(this.requiredFormFieldSelectors)));
      }

      return collection;
    }, []);
  }

  onTriggerInput() {
    this.fillFormFieldsCollection();
    this.toggleDisablingNextStepButton();
  }

  onDropdownTriggerChange() {
    this.onTriggerInput();
    this.mapTriggerEvents();
  }

  toggleDisablingNextStepButton() {
    if (!this.target) {
      return;
    }

    if (this.isFormFieldsEmpty || this.isDropdownTriggerPreSelected) {
      this.disableNextStepButton(true);
      return;
    }

    this.disableNextStepButton(false);
  }
  /**
   * Removes/Sets the disabled attribute for target element.
   */


  disableNextStepButton(isDisabled) {
    if (this.target) {
      this.target.disabled = isDisabled;
    }
  }

  get isDropdownTriggerPreSelected() {
    return this.dropdownTriggers.some(element => !element.value);
  }
  /**
   * Checks if the form fields are empty.
   */


  get isFormFieldsEmpty() {
    return this.triggers.some(element => !element.value);
  }
  /**
   * Gets a querySelector name of the target element.
   */


  get targetSelector() {
    return this.getAttribute('target-selector');
  }
  /**
   * Gets a querySelector name of the form element.
   */


  get containerSelector() {
    return this.getAttribute('container-selector');
  }
  /**
   * Gets a querySelector name of the dropdown trigger element.
   */


  get dropdownTriggerSelector() {
    return this.getAttribute('dropdown-trigger-selector');
  }
  /**
   * Checks if the trigger element is enabled.
   */


  get isTriggerEnabled() {
    return this.hasAttribute('is-enable');
  }
  /**
   * Gets a class name for the toggle action.
   */


  get classToToggle() {
    return this.getAttribute('class-to-toggle');
  }

  get parentTargetClassName() {
    return this.getAttribute('parent-target-class-name');
  }

}

/***/ })

}]);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vLi92ZW5kb3Ivc3ByeWtlci1zaG9wL2NoZWNrb3V0LXBhZ2Uvc3JjL1NwcnlrZXJTaG9wL1l2ZXMvQ2hlY2tvdXRQYWdlL1RoZW1lL2RlZmF1bHQvY29tcG9uZW50cy9tb2xlY3VsZXMvaXMtbmV4dC1jaGVja291dC1zdGVwLWVuYWJsZWQvaXMtbmV4dC1jaGVja291dC1zdGVwLWVuYWJsZWQudHMiLCJ3ZWJwYWNrOi8vLy4vdmVuZG9yL3NwcnlrZXItc2hvcC9jaGVja291dC1wYWdlL3NyYy9TcHJ5a2VyU2hvcC9ZdmVzL0NoZWNrb3V0UGFnZS9UaGVtZS9kZWZhdWx0L2NvbXBvbmVudHMvbW9sZWN1bGVzL3ZhbGlkYXRlLW5leHQtY2hlY2tvdXQtc3RlcC92YWxpZGF0ZS1uZXh0LWNoZWNrb3V0LXN0ZXAudHMiXSwibmFtZXMiOlsiSXNOZXh0Q2hlY2tvdXRTdGVwRW5hYmxlZCIsIkNvbXBvbmVudCIsInJlYWR5Q2FsbGJhY2siLCJ0cmlnZ2VyU2VsZWN0b3IiLCJ0cmlnZ2VyIiwiZG9jdW1lbnQiLCJxdWVyeVNlbGVjdG9yIiwidGFyZ2V0IiwidGFyZ2V0U2VsZWN0b3IiLCJtYXBFdmVudHMiLCJhZGRFdmVudExpc3RlbmVyIiwib25UcmlnZ2VyQ2hhbmdlIiwiRVZFTlRfSU5JVCIsImluaXRUcmlnZ2VyU3RhdGUiLCJjdXJyZW50VmFsdWUiLCJvcHRpb25zIiwic2VsZWN0ZWRJbmRleCIsInZhbHVlIiwidG9nZ2xlT3B0aW9uVmFsdWUiLCJkaXNhYmxlTmV4dFN0ZXBCdXR0b24iLCJnZXRBdHRyaWJ1dGUiLCJWYWxpZGF0ZU5leHRDaGVja291dFN0ZXAiLCJpbml0IiwiY29udGFpbmVycyIsIkFycmF5IiwiZnJvbSIsInF1ZXJ5U2VsZWN0b3JBbGwiLCJjb250YWluZXJTZWxlY3RvciIsImRyb3Bkb3duVHJpZ2dlcnMiLCJkcm9wZG93blRyaWdnZXJTZWxlY3RvciIsInBhcmVudFRhcmdldENsYXNzTmFtZSIsInBhcmVudFRhcmdldCIsImdldEVsZW1lbnRzQnlDbGFzc05hbWUiLCJpc1RyaWdnZXJFbmFibGVkIiwiZGlzcGF0Y2hDdXN0b21FdmVudCIsIm1hcFRyaWdnZXJFdmVudHMiLCJmb3JFYWNoIiwiZWxlbWVudCIsIm9uRHJvcGRvd25UcmlnZ2VyQ2hhbmdlIiwidHJpZ2dlcnMiLCJvblRyaWdnZXJJbnB1dCIsImZpbGxGb3JtRmllbGRzQ29sbGVjdGlvbiIsInRvZ2dsZURpc2FibGluZ05leHRTdGVwQnV0dG9uIiwicmVkdWNlIiwiY29sbGVjdGlvbiIsImNsYXNzTGlzdCIsImNvbnRhaW5zIiwiY2xhc3NUb1RvZ2dsZSIsInB1c2giLCJyZXF1aXJlZEZvcm1GaWVsZFNlbGVjdG9ycyIsImlzRm9ybUZpZWxkc0VtcHR5IiwiaXNEcm9wZG93blRyaWdnZXJQcmVTZWxlY3RlZCIsImlzRGlzYWJsZWQiLCJkaXNhYmxlZCIsInNvbWUiLCJoYXNBdHRyaWJ1dGUiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQTtBQUNBO0FBRWUsTUFBTUEseUJBQU4sU0FBd0NDLCtEQUF4QyxDQUFrRDtBQUFBO0FBQUE7O0FBQUE7O0FBQUE7QUFBQTs7QUFJbkRDLGVBQVYsR0FBZ0M7QUFDNUIsUUFBSSxLQUFLQyxlQUFULEVBQTBCO0FBQ3RCLFdBQUtDLE9BQUwsR0FBa0NDLFFBQVEsQ0FBQ0MsYUFBVCxDQUF1QixLQUFLSCxlQUE1QixDQUFsQztBQUNIOztBQUNELFNBQUtJLE1BQUwsR0FBd0NGLFFBQVEsQ0FBQ0MsYUFBVCxDQUF1QixLQUFLRSxjQUE1QixDQUF4Qzs7QUFFQSxRQUFJLEtBQUtKLE9BQVQsRUFBa0I7QUFDZCxXQUFLSyxTQUFMO0FBQ0g7QUFDSjs7QUFFU0EsV0FBVixHQUE0QjtBQUN4QixTQUFLTCxPQUFMLENBQWFNLGdCQUFiLENBQThCLFFBQTlCLEVBQXdDLE1BQU0sS0FBS0MsZUFBTCxFQUE5QztBQUNBLFNBQUtKLE1BQUwsQ0FBWUcsZ0JBQVosQ0FBNkJFLG1HQUE3QixFQUF5QyxNQUFNLEtBQUtDLGdC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QUNIO0FBRUQ7Ozs7O0FBR0EsTUFBSWlDLGlCQUFKLEdBQWlDO0FBQzdCLFdBQU8sS0FBS1gsUUFBTCxDQUFjZSxJQUFkLENBQW9CakIsT0FBRCxJQUE4QixDQUFDQSxPQUFPLENBQUNwQixLQUExRCxDQUFQO0FBQ0g7QUFFRDs7Ozs7QUFHQSxNQUFJVCxjQUFKLEdBQTZCO0FBQ3pCLFdBQU8sS0FBS1ksWUFBTCxDQUFrQixpQkFBbEIsQ0FBUDtBQUNIO0FBRUQ7Ozs7O0FBR0EsTUFBSU8saUJBQUosR0FBZ0M7QUFDNUIsV0FBTyxLQUFLUCxZQUFMLENBQWtCLG9CQUFsQixDQUFQO0FBQ0g7QUFFRDs7Ozs7QUFHQSxNQUFJUyx1QkFBSixHQUFzQztBQUNsQyxXQUFPLEtBQUtULFlBQUwsQ0FBa0IsMkJBQWxCLENBQVA7QUFDSDtBQUVEOzs7OztBQUdBLE1BQUlhLGdCQUFKLEdBQWdDO0FBQzVCLFdBQU8sS0FBS3NCLFlBQUwsQ0FBa0IsV0FBbEIsQ0FBUDtBQUNIO0FBRUQ7Ozs7O0FBR0EsTUFBSVIsYUFBSixHQUE0QjtBQUN4QixXQUFPLEtBQUszQixZQUFMLENBQWtCLGlCQUFsQixDQUFQO0FBQ0g7O0FBRUQsTUFBY1UscUJBQWQsR0FBOEM7QUFDMUMsV0FBTyxLQUFLVixZQUFMLENBQWtCLDBCQUFsQixDQUFQO0FBQ0g7O0FBNUoyRCxDIiwiZmlsZSI6Ii4vanMveXZlc19kZWZhdWx0LmlzLW5leHQtY2hlY2tvdXQtc3RlcC1lbmFibGVkLmVzbS5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBDb21wb25lbnQgZnJvbSAnU2hvcFVpL21vZGVscy9jb21wb25lbnQnO1xuaW1wb3J0IFZhbGlkYXRlTmV4dENoZWNrb3V0U3RlcCwgeyBFVkVOVF9JTklUIH0gZnJvbSAnLi4vdmFsaWRhdGUtbmV4dC1jaGVja291dC1zdGVwL3ZhbGlkYXRlLW5leHQtY2hlY2tvdXQtc3RlcCc7XG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIElzTmV4dENoZWNrb3V0U3RlcEVuYWJsZWQgZXh0ZW5kcyBDb21wb25lbnQge1xuICAgIHByb3RlY3RlZCB0cmlnZ2VyOiBIVE1MU2VsZWN0RWxlbWVudDtcbiAgICBwcm90ZWN0ZWQgdGFyZ2V0OiBWYWxpZGF0ZU5leHRDaGVja291dFN0ZXA7XG5cbiAgICBwcm90ZWN0ZWQgcmVhZHlDYWxsYmFjaygpOiB2b2lkIHtcbiAgICAgICAgaWYgKHRoaXMudHJpZ2dlclNlbGVjdG9yKSB7XG4gICAgICAgICAgICB0aGlzLnRyaWdnZXIgPSA8SFRNTFNlbGVjdEVsZW1lbnQ+ZG9jdW1lbnQucXVlcnlTZWxlY3Rvcih0aGlzLnRyaWdnZXJTZWxlY3Rvcik7XG4gICAgICAgIH1cbiAgICAgICAgdGhpcy50YXJnZXQgPSA8VmFsaWRhdGVOZXh0Q2hlY2tvdXRTdGVwPmRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IodGhpcy50YXJnZXRTZWxlY3Rvcik7XG5cbiAgICAgICAgaWYgKHRoaXMudHJpZ2dlcikge1xuICAgICAgICAgICAgdGhpcy5tYXBFdmVudHMoKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIHByb3RlY3RlZCBtYXBFdmVudHMoKTogdm9pZCB7XG4gICAgICAgIHRoaXMudHJpZ2dlci5hZGRFdmVudExpc3RlbmVyKCdjaGFuZ2UnLCAoKSA9PiB0aGlzLm9uVHJpZ2dlckNoYW5nZSgpKTtcbiAgICAgICAgdGhpcy50YXJnZXQuYWRkRXZlbnRMaXN0ZW5lcihFVkVOVF9JTklULCAoKSA9PiB0aGlzLmluaXRUcmlnZ2VyU3RhdGUoKSk7XG4gICAgfVxuXG4gICAgcHJvdGVjdGVkIGluaXRUcmlnZ2VyU3RhdGUoKTogdm9pZCB7XG4gICAgICAgIHRoaXMub25UcmlnZ2VyQ2hhbmdlKCk7XG4gICAgfVxuXG4gICAgcHJvdGVjdGVkIG9uVHJpZ2dlckNoYW5nZSgpOiB2b2lkIHtcbiAgICAgICAgY29uc3QgY3VycmVudFZhbHVlID0gdGhpcy50cmlnZ2VyLm9wdGlvbnNbdGhpcy50cmlnZ2VyLnNlbGVjdGVkSW5kZXhdLnZhbHVlO1xuXG4gICAgICAgIGlmIChjdXJyZW50VmFsdWUgPT09IHRoaXMudG9nZ2xlT3B0aW9uVmFsdWUgJiYgdGhpcy50YXJnZXQpIHtcbiAgICAgICAgICAgIHRoaXMudGFyZ2V0LmluaXRUcmlnZ2VyU3RhdGUoKTtcblxuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG5cbiAgICAgICAgdGhpcy50YXJnZXQuZGlzYWJsZU5leHRTdGVwQnV0dG9uKGZhbHNlKTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBHZXRzIGEgcXVlcnlTZWxlY3RvciBuYW1lIG9mIHRoZSB0cmlnZ2VyIGVsZW1lbnQuXG4gICAgICovXG4gICAgZ2V0IHRyaWdnZXJTZWxlY3RvcigpOiBzdHJpbmcge1xuICAgICAgICByZXR1cm4gdGhpcy5nZXRBdHRyaWJ1dGUoJ3RyaWdnZXItc2VsZWN0b3InKTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBHZXRzIGEgcXVlcnlTZWxlY3RvciBuYW1lIG9mIHRoZSB0YXJnZXQgZWxlbWVudC5cbiAgICAgKi9cbiAgICBnZXQgdGFyZ2V0U2VsZWN0b3IoKTogc3RyaW5nIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuZ2V0QXR0cmlidXRlKCd0YXJnZXQtc2VsZWN0b3InKTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBHZXRzIGFuIG9wdGlvbiB2YWx1ZSBmb3IgY29tcGFyaXNvbiB3aXRoIGNob3NlbiB2YWx1ZSBmcm9tIGRyb3Bkb3duIHRvIGVuYWJsZSAndmFsaWRhdGUtbmV4dC1jaGVja291dC1zdGVwJ1xuICAgICAqIGNvbXBvbmVudC5cbiAgICAgKi9cbiAgICBnZXQgdG9nZ2xlT3B0aW9uVmFsdWUoKTogc3RyaW5nIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuZ2V0QXR0cmlidXRlKCd0b2dnbGUtb3B0aW9uLXZhbHVlJyk7XG4gICAgfVxufVxuIiwiaW1wb3J0IENvbXBvbmVudCBmcm9tICdTaG9wVWkvbW9kZWxzL2NvbXBvbmVudCc7XG5cbmV4cG9ydCBjb25zdCBFVkVOVF9JTklUID0gJ2FmdGVySW5pdCc7XG5cbi8qKlxuICogQGV2ZW50IGFmdGVySW5pdCBBbiBldmVudCBlbWl0dGVkIHdoZW4gdGhlIGNvbXBvbmVudCBoYXMgYmVlbiBpbml0aWFsaXplZC5cbiAqL1xuZXhwb3J0IGRlZmF1bHQgY2xhc3MgVmFsaWRhdGVOZXh0Q2hlY2tvdXRTdGVwIGV4dGVuZHMgQ29tcG9uZW50IHtcbiAgICBwcm90ZWN0ZWQgY29udGFpbmVyczogSFRNTEVsZW1lbnRbXTtcbiAgICBwcm90ZWN0ZWQgdHJpZ2dlcnM6IEhUTUxGb3JtRWxlbWVudFtdO1xuICAgIHByb3RlY3RlZCB0YXJnZXQ6IEhUTUxCdXR0b25FbGVtZW50O1xuICAgIHByb3RlY3RlZCBkcm9wZG93blRyaWdnZXJzOiBIVE1MU2VsZWN0RWxlbWVudFtdO1xuICAgIHByb3RlY3RlZCBwYXJlbnRUYXJnZXQ6IEhUTUxFbGVtZW50O1xuICAgIHByb3RlY3RlZCByZWFkb25seSByZXF1aXJlZEZvcm1GaWVsZFNlbGVjdG9yczogc3RyaW5nID0gJ3NlbGVjdFtyZXF1aXJlZF0sIGlucHV0W3JlcXVpcmVkXSc7XG5cbiAgICBwcm90ZWN0ZWQgcmVhZHlDYWxsYmFjaygpOiB2b2lkIHt9XG5cbiAgICBwcm90ZWN0ZWQgaW5pdCgpOiB2b2lkIHtcbiAgICAgICAgdGhpcy5jb250YWluZXJzID0gPEhUTUxFbGVtZW50W10+QXJyYXkuZnJvbShkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKHRoaXMuY29udGFpbmVyU2VsZWN0b3IpKTtcbiAgICAgICAgdGhpcy50YXJnZXQgPSA8SFRNTEJ1dHRvbkVsZW1lbnQ+ZG9jdW1lbnQucXVlcnlTZWxlY3Rvcih0aGlzLnRhcmdldFNlbGVjdG9yKTtcbiAgICAgICAgdGhpcy5kcm9wZG93blRyaWdnZXJzID0gPEhUTUxTZWxlY3RFbGVtZW50W10+KFxuICAgICAgICAgICAgQXJyYXkuZnJvbShkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKHRoaXMuZHJvcGRvd25UcmlnZ2VyU2VsZWN0b3IpKVxuICAgICAgICApO1xuXG4gICAgICAgIGlmICh0aGlzLnBhcmVudFRhcmdldENsYXNzTmFtZSkge1xuICAgICAgICAgICAgdGhpcy5wYXJlbnRUYXJnZXQgPSA8SFRNTEVsZW1lbnQ+ZG9jdW1lbnQuZ2V0RWxlbWVudHNCeUNsYXNzTmFtZSh0aGlzLnBhcmVudFRhcmdldENsYXNzTmFtZSlbMF07XG4gICAgICAgIH1cblxuICAgICAgICBpZiAodGhpcy5pc1RyaWdnZXJFbmFibGVkKSB7XG4gICAgICAgICAgICB0aGlzLmluaXRUcmlnZ2VyU3RhdGUoKTtcbiAgICAgICAgfVxuXG4gICAgICAgIHRoaXMuZGlzcGF0Y2hDdXN0b21FdmVudChFVkVOVF9JTklUKTtcbiAgICB9XG5cbiAgICBwcm90ZWN0ZWQgbWFwRXZlbnRzKCk6IHZvaWQge1xuICAgICAgICB0aGlzLm1hcFRyaWdnZXJFdmVudHMoKTtcblxuICAgICAgICB0aGlzLmRyb3Bkb3duVHJpZ2dlcnMuZm9yRWFjaCgoZWxlbWVudDogSFRNTFNlbGVjdEVsZW1lbnQpID0+IHtcbiAgICAgICAgICAgIGVsZW1lbnQuYWRkRXZlbnRMaXN0ZW5lcignY2hhbmdlJywgKCkgPT4gdGhpcy5vbkRyb3Bkb3duVHJpZ2dlckNoYW5nZSgpKTtcbiAgICAgICAgfSk7XG5cbiAgICAgICAgaWYgKHRoaXMucGFyZW50VGFyZ2V0KSB7XG4gICAgICAgICAgICB0aGlzLnBhcmVudFRhcmdldC5hZGRFdmVudExpc3RlbmVyKCd0b2dnbGVGb3JtJywgKCkgPT4gdGhpcy5vbkRyb3Bkb3duVHJpZ2dlckNoYW5nZSgpKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIHByb3RlY3RlZCBtYXBUcmlnZ2VyRXZlbnRzKCk6IHZvaWQge1xuICAgICAgICBpZiAodGhpcy50cmlnZ2Vycykge1xuICAgICAgICAgICAgdGhpcy50cmlnZ2Vycy5mb3JFYWNoKChlbGVtZW50OiBIVE1MRm9ybUVsZW1lbnQpID0+IHtcbiAgICAgICAgICAgICAgICBlbGVtZW50LmFkZEV2ZW50TGlzdGVuZXIoJ2lucHV0JywgKCkgPT4gdGhpcy5vblRyaWdnZXJJbnB1dCgpKTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogSW5pdCB0aGUgbWV0aG9kcywgd2hpY2ggZmlsbCB0aGUgY29sbGVjdGlvbiBvZiBmb3JtIGZpZWxkcyBhbmQgdG9nZ2xlIGRpc2FibGluZyBvZiBidXR0b24uXG4gICAgICovXG4gICAgaW5pdFRyaWdnZXJTdGF0ZSgpOiB2b2lkIHtcbiAgICAgICAgdGhpcy5maWxsRm9ybUZpZWxkc0NvbGxlY3Rpb24oKTtcbiAgICAgICAgdGhpcy50b2dnbGVEaXNhYmxpbmdOZXh0U3RlcEJ1dHRvbigpO1xuICAgICAgICB0aGlzLm1hcEV2ZW50cygpO1xuICAgIH1cblxuICAgIHByb3RlY3RlZCBmaWxsRm9ybUZpZWxkc0NvbGxlY3Rpb24oKTogdm9pZCB7XG4gICAgICAgIHRoaXMudHJpZ2dlcnMgPSBbXTtcblxuICAgICAgICBpZiAoIXRoaXMuY29udGFpbmVycykge1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG5cbiAgICAgICAgdGhpcy50cmlnZ2VycyA9IDxIVE1MRm9ybUVsZW1lbnRbXT50aGlzLmNvbnRhaW5lcnMucmVkdWNlKChjb2xsZWN0aW9uOiBIVE1MRWxlbWVudFtdLCBlbGVtZW50OiBIVE1MRWxlbWVudCkgPT4ge1xuICAgICAgICAgICAgaWYgKCFlbGVtZW50LmNsYXNzTGlzdC5jb250YWlucyh0aGlzLmNsYXNzVG9Ub2dnbGUpKSB7XG4gICAgICAgICAgICAgICAgY29sbGVjdGlvbi5wdXNoKFxuICAgICAgICAgICAgICAgICAgICAuLi4oPEhUTUxGb3JtRWxlbWVudFtdPkFycmF5LmZyb20oZWxlbWVudC5xdWVyeVNlbGVjdG9yQWxsKHRoaXMucmVxdWlyZWRGb3JtRmllbGRTZWxlY3RvcnMpKSksXG4gICAgICAgICAgICAgICAgKTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgcmV0dXJuIGNvbGxlY3Rpb247XG4gICAgICAgIH0sIFtdKTtcbiAgICB9XG5cbiAgICBwcm90ZWN0ZWQgb25UcmlnZ2VySW5wdXQoKTogdm9pZCB7XG4gICAgICAgIHRoaXMuZmlsbEZvcm1GaWVsZHNDb2xsZWN0aW9uKCk7XG4gICAgICAgIHRoaXMudG9nZ2xlRGlzYWJsaW5nTmV4dFN0ZXBCdXR0b24oKTtcbiAgICB9XG5cbiAgICBwcm90ZWN0ZWQgb25Ecm9wZG93blRyaWdnZXJDaGFuZ2UoKTogdm9pZCB7XG4gICAgICAgIHRoaXMub25UcmlnZ2VySW5wdXQoKTtcbiAgICAgICAgdGhpcy5tYXBUcmlnZ2VyRXZlbnRzKCk7XG4gICAgfVxuXG4gICAgcHJvdGVjdGVkIHRvZ2dsZURpc2FibGluZ05leHRTdGVwQnV0dG9uKCk6IHZvaWQge1xuICAgICAgICBpZiAoIXRoaXMudGFyZ2V0KSB7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cblxuICAgICAgICBpZiAodGhpcy5pc0Zvcm1GaWVsZHNFbXB0eSB8fCB0aGlzLmlzRHJvcGRvd25UcmlnZ2VyUHJlU2VsZWN0ZWQpIHtcbiAgICAgICAgICAgIHRoaXMuZGlzYWJsZU5leHRTdGVwQnV0dG9uKHRydWUpO1xuXG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cblxuICAgICAgICB0aGlzLmRpc2FibGVOZXh0U3RlcEJ1dHRvbihmYWxzZSk7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogUmVtb3Zlcy9TZXRzIHRoZSBkaXNhYmxlZCBhdHRyaWJ1dGUgZm9yIHRhcmdldCBlbGVtZW50LlxuICAgICAqL1xuICAgIGRpc2FibGVOZXh0U3RlcEJ1dHRvbihpc0Rpc2FibGVkOiBib29sZWFuKTogdm9pZCB7XG4gICAgICAgIGlmICh0aGlzLnRhcmdldCkge1xuICAgICAgICAgICAgdGhpcy50YXJnZXQuZGlzYWJsZWQgPSBpc0Rpc2FibGVkO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgcHJvdGVjdGVkIGdldCBpc0Ryb3Bkb3duVHJpZ2dlclByZVNlbGVjdGVkKCk6IGJvb2xlYW4ge1xuICAgICAgICByZXR1cm4gdGhpcy5kcm9wZG93blRyaWdnZXJzLnNvbWUoKGVsZW1lbnQ6IEhUTUxTZWxlY3RFbGVtZW50KSA9PiAhZWxlbWVudC52YWx1ZSk7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogQ2hlY2tzIGlmIHRoZSBmb3JtIGZpZWxkcyBhcmUgZW1wdHkuXG4gICAgICovXG4gICAgZ2V0IGlzRm9ybUZpZWxkc0VtcHR5KCk6IGJvb2xlYW4ge1xuICAgICAgICByZXR1cm4gdGhpcy50cmlnZ2Vycy5zb21lKChlbGVtZW50OiBIVE1MRm9ybUVsZW1lbnQpID0+ICFlbGVtZW50LnZhbHVlKTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBHZXRzIGEgcXVlcnlTZWxlY3RvciBuYW1lIG9mIHRoZSB0YXJnZXQgZWxlbWVudC5cbiAgICAgKi9cbiAgICBnZXQgdGFyZ2V0U2VsZWN0b3IoKTogc3RyaW5nIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuZ2V0QXR0cmlidXRlKCd0YXJnZXQtc2VsZWN0b3InKTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBHZXRzIGEgcXVlcnlTZWxlY3RvciBuYW1lIG9mIHRoZSBmb3JtIGVsZW1lbnQuXG4gICAgICovXG4gICAgZ2V0IGNvbnRhaW5lclNlbGVjdG9yKCk6IHN0cmluZyB7XG4gICAgICAgIHJldHVybiB0aGlzLmdldEF0dHJpYnV0ZSgnY29udGFpbmVyLXNlbGVjdG9yJyk7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogR2V0cyBhIHF1ZXJ5U2VsZWN0b3IgbmFtZSBvZiB0aGUgZHJvcGRvd24gdHJpZ2dlciBlbGVtZW50LlxuICAgICAqL1xuICAgIGdldCBkcm9wZG93blRyaWdnZXJTZWxlY3RvcigpOiBzdHJpbmcge1xuICAgICAgICByZXR1cm4gdGhpcy5nZXRBdHRyaWJ1dGUoJ2Ryb3Bkb3duLXRyaWdnZXItc2VsZWN0b3InKTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBDaGVja3MgaWYgdGhlIHRyaWdnZXIgZWxlbWVudCBpcyBlbmFibGVkLlxuICAgICAqL1xuICAgIGdldCBpc1RyaWdnZXJFbmFibGVkKCk6IGJvb2xlYW4ge1xuICAgICAgICByZXR1cm4gdGhpcy5oYXNBdHRyaWJ1dGUoJ2lzLWVuYWJsZScpO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIEdldHMgYSBjbGFzcyBuYW1lIGZvciB0aGUgdG9nZ2xlIGFjdGlvbi5cbiAgICAgKi9cbiAgICBnZXQgY2xhc3NUb1RvZ2dsZSgpOiBzdHJpbmcge1xuICAgICAgICByZXR1cm4gdGhpcy5nZXRBdHRyaWJ1dGUoJ2NsYXNzLXRvLXRvZ2dsZScpO1xuICAgIH1cblxuICAgIHByb3RlY3RlZCBnZXQgcGFyZW50VGFyZ2V0Q2xhc3NOYW1lKCk6IHN0cmluZyB7XG4gICAgICAgIHJldHVybiB0aGlzLmdldEF0dHJpYnV0ZSgncGFyZW50LXRhcmdldC1jbGFzcy1uYW1lJyk7XG4gICAgfVxufVxuIl0sInNvdXJjZVJvb3QiOiIifQ==