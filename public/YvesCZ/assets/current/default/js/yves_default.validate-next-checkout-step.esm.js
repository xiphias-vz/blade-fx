(window["webpackJsonp_yves_default"] = window["webpackJsonp_yves_default"] || []).push([["validate-next-checkout-step"],{

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vLi92ZW5kb3Ivc3ByeWtlci1zaG9wL2NoZWNrb3V0LXBhZ2Uvc3JjL1NwcnlrZXJTaG9wL1l2ZXMvQ2hlY2tvdXRQYWdlL1RoZW1lL2RlZmF1bHQvY29tcG9uZW50cy9tb2xlY3VsZXMvdmFsaWRhdGUtbmV4dC1jaGVja291dC1zdGVwL3ZhbGlkYXRlLW5leHQtY2hlY2tvdXQtc3RlcC50cyJdLCJuYW1lcyI6WyJFVkVOVF9JTklUIiwiVmFsaWRhdGVOZXh0Q2hlY2tvdXRTdGVwIiwiQ29tcG9uZW50IiwicmVhZHlDYWxsYmFjayIsImluaXQiLCJjb250YWluZXJzIiwiQXJyYXkiLCJmcm9tIiwiZG9jdW1lbnQiLCJxdWVyeVNlbGVjdG9yQWxsIiwiY29udGFpbmVyU2VsZWN0b3IiLCJ0YXJnZXQiLCJxdWVyeVNlbGVjdG9yIiwidGFyZ2V0U2VsZWN0b3IiLCJkcm9wZG93blRyaWdnZXJzIiwiZHJvcGRvd25UcmlnZ2VyU2VsZWN0b3IiLCJwYXJlbnRUYXJnZXRDbGFzc05hbWUiLCJwYXJlbnRUYXJnZXQiLCJnZXRFbGVtZW50c0J5Q2xhc3NOYW1lIiwiaXNUcmlnZ2VyRW5hYmxlZCIsImluaXRUcmlnZ2VyU3RhdGUiLCJkaXNwYXRjaEN1c3RvbUV2ZW50IiwibWFwRXZlbnRzIiwibWFwVHJpZ2dlckV2ZW50cyIsImZvckVhY2giLCJlbGVtZW50IiwiYWRkRXZlbnRMaXN0ZW5lciIsIm9uRHJvcGRvd25UcmlnZ2VyQ2hhbmdlIiwidHJpZ2dlcnMiLCJvblRyaWdnZXJJbnB1dCIsImZpbGxGb3JtRmllbGRzQ29sbGVjdGlvbiIsInRvZ2dsZURpc2FibGluZ05leHRTdGVwQnV0dG9uIiwicmVkdWNlIiwiY29sbGVjdGlvbiIsImNsYXNzTGlzdCIsImNvbnRhaW5zIiwiY2xhc3NUb1RvZ2dsZSIsInB1c2giLCJyZXF1aXJlZEZvcm1GaWVsZFNlbGVjdG9ycyIsImlzRm9ybUZpZWxkc0VtcHR5IiwiaXNEcm9wZG93blRyaWdnZXJQcmVTZWxlY3RlZCIsImRpc2FibGVOZXh0U3RlcEJ1dHRvbiIsImlzRGlzYWJsZWQiLCJkaXNhYmxlZCIsInNvbWUiLCJ2YWx1ZSIsImdldEF0dHJpYnV0ZSIsImhhc0F0dHJpYnV0ZSJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7OztBQUFBO0FBRU8sSUFBTUEsVUFBVSxHQUFHLFdBQW5CO0FBRVA7Ozs7QUFHZSxNQUFNQyx3QkFBTixTQUF1Q0MsK0RBQXZDLENBQWlEO0FBQUE7QUFBQTs7QUFBQTs7QUFBQTs7QUFBQTs7QUFBQTs7QUFBQTs7QUFBQSx3REFNSixtQ0FOSTtBQUFBOztBQVFsREMsZUFBVixHQUFnQyxDQUFFOztBQUV4QkMsTUFBVixHQUF1QjtBQUNuQixTQUFLQyxVQUFMLEdBQWlDQyxLQUFLLENBQUNDLElBQU4sQ0FBV0MsUUFBUSxDQUFDQyxnQkFBVCxDQUEwQixLQUFLQyxpQkFBL0IsQ0FBWCxDQUFqQztBQUNBLFNBQUtDLE1BQUwsR0FBaUNILFFBQVEsQ0FBQ0ksYUFBVCxDQUF1QixLQUFLQyxjQUE1QixDQUFqQztBQUNBLFNBQUtDLGdCQUFMLEdBQ0lSLEtBQUssQ0FBQ0MsSUFBTixDQUFXQyxRQUFRLENBQUNDLGdCQUFULENBQTBCLEtBQUtNLHVCQUEvQixDQUFYLENBREo7O0FBSUEsUUFBSSxLQUFLQyxxQkFBVCxFQUFnQztBQUM1QixXQUFLQyxZQUFMLEdBQWlDVCxRQUFRLENBQUNVLHNCQUFULENBQWdDLEtBQUtGLHFCQUFyQyxFQUE0RCxDQUE1RCxDQUFqQztBQUNIOztBQUVELFFBQUksS0FBS0csZ0JBQVQsRUFBMkI7QUFDdkIsV0FBS0MsZ0JBQUw7QUFDSDs7QUFFRCxTQUFLQyxtQkFBTCxDQUF5QnJCLFVBQXpCO0FBQ0g7O0FBRVNzQixXQUFWLEdBQTRCO0FBQ3hCLFNBQUtDLGdCQUFMO0FBRUEsU0FBS1QsZ0JBQUwsQ0FBc0JVLE9BQXRCLENBQStCQyxPQUFELElBQWdDO0FBQzFEQSxhQUFPLENBQUNDLGdCQUFSLENBQXlCLFFBQXpCLEVBQW1DLE1BQU0sS0FBS0MsdUJB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QUosR0FBNEI7QUFDeEIsV0FBTyxLQUFLVSxZQUFMLENBQWtCLGlCQUFsQixDQUFQO0FBQ0g7O0FBRUQsTUFBYzlCLHFCQUFkLEdBQThDO0FBQzFDLFdBQU8sS0FBSzhCLFlBQUwsQ0FBa0IsMEJBQWxCLENBQVA7QUFDSDs7QUE1SjJELEMiLCJmaWxlIjoiLi9qcy95dmVzX2RlZmF1bHQudmFsaWRhdGUtbmV4dC1jaGVja291dC1zdGVwLmVzbS5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBDb21wb25lbnQgZnJvbSAnU2hvcFVpL21vZGVscy9jb21wb25lbnQnO1xuXG5leHBvcnQgY29uc3QgRVZFTlRfSU5JVCA9ICdhZnRlckluaXQnO1xuXG4vKipcbiAqIEBldmVudCBhZnRlckluaXQgQW4gZXZlbnQgZW1pdHRlZCB3aGVuIHRoZSBjb21wb25lbnQgaGFzIGJlZW4gaW5pdGlhbGl6ZWQuXG4gKi9cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIFZhbGlkYXRlTmV4dENoZWNrb3V0U3RlcCBleHRlbmRzIENvbXBvbmVudCB7XG4gICAgcHJvdGVjdGVkIGNvbnRhaW5lcnM6IEhUTUxFbGVtZW50W107XG4gICAgcHJvdGVjdGVkIHRyaWdnZXJzOiBIVE1MRm9ybUVsZW1lbnRbXTtcbiAgICBwcm90ZWN0ZWQgdGFyZ2V0OiBIVE1MQnV0dG9uRWxlbWVudDtcbiAgICBwcm90ZWN0ZWQgZHJvcGRvd25UcmlnZ2VyczogSFRNTFNlbGVjdEVsZW1lbnRbXTtcbiAgICBwcm90ZWN0ZWQgcGFyZW50VGFyZ2V0OiBIVE1MRWxlbWVudDtcbiAgICBwcm90ZWN0ZWQgcmVhZG9ubHkgcmVxdWlyZWRGb3JtRmllbGRTZWxlY3RvcnM6IHN0cmluZyA9ICdzZWxlY3RbcmVxdWlyZWRdLCBpbnB1dFtyZXF1aXJlZF0nO1xuXG4gICAgcHJvdGVjdGVkIHJlYWR5Q2FsbGJhY2soKTogdm9pZCB7fVxuXG4gICAgcHJvdGVjdGVkIGluaXQoKTogdm9pZCB7XG4gICAgICAgIHRoaXMuY29udGFpbmVycyA9IDxIVE1MRWxlbWVudFtdPkFycmF5LmZyb20oZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbCh0aGlzLmNvbnRhaW5lclNlbGVjdG9yKSk7XG4gICAgICAgIHRoaXMudGFyZ2V0ID0gPEhUTUxCdXR0b25FbGVtZW50PmRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IodGhpcy50YXJnZXRTZWxlY3Rvcik7XG4gICAgICAgIHRoaXMuZHJvcGRvd25UcmlnZ2VycyA9IDxIVE1MU2VsZWN0RWxlbWVudFtdPihcbiAgICAgICAgICAgIEFycmF5LmZyb20oZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbCh0aGlzLmRyb3Bkb3duVHJpZ2dlclNlbGVjdG9yKSlcbiAgICAgICAgKTtcblxuICAgICAgICBpZiAodGhpcy5wYXJlbnRUYXJnZXRDbGFzc05hbWUpIHtcbiAgICAgICAgICAgIHRoaXMucGFyZW50VGFyZ2V0ID0gPEhUTUxFbGVtZW50PmRvY3VtZW50LmdldEVsZW1lbnRzQnlDbGFzc05hbWUodGhpcy5wYXJlbnRUYXJnZXRDbGFzc05hbWUpWzBdO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKHRoaXMuaXNUcmlnZ2VyRW5hYmxlZCkge1xuICAgICAgICAgICAgdGhpcy5pbml0VHJpZ2dlclN0YXRlKCk7XG4gICAgICAgIH1cblxuICAgICAgICB0aGlzLmRpc3BhdGNoQ3VzdG9tRXZlbnQoRVZFTlRfSU5JVCk7XG4gICAgfVxuXG4gICAgcHJvdGVjdGVkIG1hcEV2ZW50cygpOiB2b2lkIHtcbiAgICAgICAgdGhpcy5tYXBUcmlnZ2VyRXZlbnRzKCk7XG5cbiAgICAgICAgdGhpcy5kcm9wZG93blRyaWdnZXJzLmZvckVhY2goKGVsZW1lbnQ6IEhUTUxTZWxlY3RFbGVtZW50KSA9PiB7XG4gICAgICAgICAgICBlbGVtZW50LmFkZEV2ZW50TGlzdGVuZXIoJ2NoYW5nZScsICgpID0+IHRoaXMub25Ecm9wZG93blRyaWdnZXJDaGFuZ2UoKSk7XG4gICAgICAgIH0pO1xuXG4gICAgICAgIGlmICh0aGlzLnBhcmVudFRhcmdldCkge1xuICAgICAgICAgICAgdGhpcy5wYXJlbnRUYXJnZXQuYWRkRXZlbnRMaXN0ZW5lcigndG9nZ2xlRm9ybScsICgpID0+IHRoaXMub25Ecm9wZG93blRyaWdnZXJDaGFuZ2UoKSk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBwcm90ZWN0ZWQgbWFwVHJpZ2dlckV2ZW50cygpOiB2b2lkIHtcbiAgICAgICAgaWYgKHRoaXMudHJpZ2dlcnMpIHtcbiAgICAgICAgICAgIHRoaXMudHJpZ2dlcnMuZm9yRWFjaCgoZWxlbWVudDogSFRNTEZvcm1FbGVtZW50KSA9PiB7XG4gICAgICAgICAgICAgICAgZWxlbWVudC5hZGRFdmVudExpc3RlbmVyKCdpbnB1dCcsICgpID0+IHRoaXMub25UcmlnZ2VySW5wdXQoKSk7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIC8qKlxuICAgICAqIEluaXQgdGhlIG1ldGhvZHMsIHdoaWNoIGZpbGwgdGhlIGNvbGxlY3Rpb24gb2YgZm9ybSBmaWVsZHMgYW5kIHRvZ2dsZSBkaXNhYmxpbmcgb2YgYnV0dG9uLlxuICAgICAqL1xuICAgIGluaXRUcmlnZ2VyU3RhdGUoKTogdm9pZCB7XG4gICAgICAgIHRoaXMuZmlsbEZvcm1GaWVsZHNDb2xsZWN0aW9uKCk7XG4gICAgICAgIHRoaXMudG9nZ2xlRGlzYWJsaW5nTmV4dFN0ZXBCdXR0b24oKTtcbiAgICAgICAgdGhpcy5tYXBFdmVudHMoKTtcbiAgICB9XG5cbiAgICBwcm90ZWN0ZWQgZmlsbEZvcm1GaWVsZHNDb2xsZWN0aW9uKCk6IHZvaWQge1xuICAgICAgICB0aGlzLnRyaWdnZXJzID0gW107XG5cbiAgICAgICAgaWYgKCF0aGlzLmNvbnRhaW5lcnMpIHtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuXG4gICAgICAgIHRoaXMudHJpZ2dlcnMgPSA8SFRNTEZvcm1FbGVtZW50W10+dGhpcy5jb250YWluZXJzLnJlZHVjZSgoY29sbGVjdGlvbjogSFRNTEVsZW1lbnRbXSwgZWxlbWVudDogSFRNTEVsZW1lbnQpID0+IHtcbiAgICAgICAgICAgIGlmICghZWxlbWVudC5jbGFzc0xpc3QuY29udGFpbnModGhpcy5jbGFzc1RvVG9nZ2xlKSkge1xuICAgICAgICAgICAgICAgIGNvbGxlY3Rpb24ucHVzaChcbiAgICAgICAgICAgICAgICAgICAgLi4uKDxIVE1MRm9ybUVsZW1lbnRbXT5BcnJheS5mcm9tKGVsZW1lbnQucXVlcnlTZWxlY3RvckFsbCh0aGlzLnJlcXVpcmVkRm9ybUZpZWxkU2VsZWN0b3JzKSkpLFxuICAgICAgICAgICAgICAgICk7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIHJldHVybiBjb2xsZWN0aW9uO1xuICAgICAgICB9LCBbXSk7XG4gICAgfVxuXG4gICAgcHJvdGVjdGVkIG9uVHJpZ2dlcklucHV0KCk6IHZvaWQge1xuICAgICAgICB0aGlzLmZpbGxGb3JtRmllbGRzQ29sbGVjdGlvbigpO1xuICAgICAgICB0aGlzLnRvZ2dsZURpc2FibGluZ05leHRTdGVwQnV0dG9uKCk7XG4gICAgfVxuXG4gICAgcHJvdGVjdGVkIG9uRHJvcGRvd25UcmlnZ2VyQ2hhbmdlKCk6IHZvaWQge1xuICAgICAgICB0aGlzLm9uVHJpZ2dlcklucHV0KCk7XG4gICAgICAgIHRoaXMubWFwVHJpZ2dlckV2ZW50cygpO1xuICAgIH1cblxuICAgIHByb3RlY3RlZCB0b2dnbGVEaXNhYmxpbmdOZXh0U3RlcEJ1dHRvbigpOiB2b2lkIHtcbiAgICAgICAgaWYgKCF0aGlzLnRhcmdldCkge1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKHRoaXMuaXNGb3JtRmllbGRzRW1wdHkgfHwgdGhpcy5pc0Ryb3Bkb3duVHJpZ2dlclByZVNlbGVjdGVkKSB7XG4gICAgICAgICAgICB0aGlzLmRpc2FibGVOZXh0U3RlcEJ1dHRvbih0cnVlKTtcblxuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG5cbiAgICAgICAgdGhpcy5kaXNhYmxlTmV4dFN0ZXBCdXR0b24oZmFsc2UpO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIFJlbW92ZXMvU2V0cyB0aGUgZGlzYWJsZWQgYXR0cmlidXRlIGZvciB0YXJnZXQgZWxlbWVudC5cbiAgICAgKi9cbiAgICBkaXNhYmxlTmV4dFN0ZXBCdXR0b24oaXNEaXNhYmxlZDogYm9vbGVhbik6IHZvaWQge1xuICAgICAgICBpZiAodGhpcy50YXJnZXQpIHtcbiAgICAgICAgICAgIHRoaXMudGFyZ2V0LmRpc2FibGVkID0gaXNEaXNhYmxlZDtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIHByb3RlY3RlZCBnZXQgaXNEcm9wZG93blRyaWdnZXJQcmVTZWxlY3RlZCgpOiBib29sZWFuIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuZHJvcGRvd25UcmlnZ2Vycy5zb21lKChlbGVtZW50OiBIVE1MU2VsZWN0RWxlbWVudCkgPT4gIWVsZW1lbnQudmFsdWUpO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIENoZWNrcyBpZiB0aGUgZm9ybSBmaWVsZHMgYXJlIGVtcHR5LlxuICAgICAqL1xuICAgIGdldCBpc0Zvcm1GaWVsZHNFbXB0eSgpOiBib29sZWFuIHtcbiAgICAgICAgcmV0dXJuIHRoaXMudHJpZ2dlcnMuc29tZSgoZWxlbWVudDogSFRNTEZvcm1FbGVtZW50KSA9PiAhZWxlbWVudC52YWx1ZSk7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogR2V0cyBhIHF1ZXJ5U2VsZWN0b3IgbmFtZSBvZiB0aGUgdGFyZ2V0IGVsZW1lbnQuXG4gICAgICovXG4gICAgZ2V0IHRhcmdldFNlbGVjdG9yKCk6IHN0cmluZyB7XG4gICAgICAgIHJldHVybiB0aGlzLmdldEF0dHJpYnV0ZSgndGFyZ2V0LXNlbGVjdG9yJyk7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogR2V0cyBhIHF1ZXJ5U2VsZWN0b3IgbmFtZSBvZiB0aGUgZm9ybSBlbGVtZW50LlxuICAgICAqL1xuICAgIGdldCBjb250YWluZXJTZWxlY3RvcigpOiBzdHJpbmcge1xuICAgICAgICByZXR1cm4gdGhpcy5nZXRBdHRyaWJ1dGUoJ2NvbnRhaW5lci1zZWxlY3RvcicpO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIEdldHMgYSBxdWVyeVNlbGVjdG9yIG5hbWUgb2YgdGhlIGRyb3Bkb3duIHRyaWdnZXIgZWxlbWVudC5cbiAgICAgKi9cbiAgICBnZXQgZHJvcGRvd25UcmlnZ2VyU2VsZWN0b3IoKTogc3RyaW5nIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuZ2V0QXR0cmlidXRlKCdkcm9wZG93bi10cmlnZ2VyLXNlbGVjdG9yJyk7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogQ2hlY2tzIGlmIHRoZSB0cmlnZ2VyIGVsZW1lbnQgaXMgZW5hYmxlZC5cbiAgICAgKi9cbiAgICBnZXQgaXNUcmlnZ2VyRW5hYmxlZCgpOiBib29sZWFuIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuaGFzQXR0cmlidXRlKCdpcy1lbmFibGUnKTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBHZXRzIGEgY2xhc3MgbmFtZSBmb3IgdGhlIHRvZ2dsZSBhY3Rpb24uXG4gICAgICovXG4gICAgZ2V0IGNsYXNzVG9Ub2dnbGUoKTogc3RyaW5nIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuZ2V0QXR0cmlidXRlKCdjbGFzcy10by10b2dnbGUnKTtcbiAgICB9XG5cbiAgICBwcm90ZWN0ZWQgZ2V0IHBhcmVudFRhcmdldENsYXNzTmFtZSgpOiBzdHJpbmcge1xuICAgICAgICByZXR1cm4gdGhpcy5nZXRBdHRyaWJ1dGUoJ3BhcmVudC10YXJnZXQtY2xhc3MtbmFtZScpO1xuICAgIH1cbn1cbiJdLCJzb3VyY2VSb290IjoiIn0=