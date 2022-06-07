(window["webpackJsonp_yves_default"] = window["webpackJsonp_yves_default"] || []).push([["address-form-toggler"],{

/***/ "./vendor/spryker-shop/customer-page/src/SprykerShop/Yves/CustomerPage/Theme/default/components/molecules/address-form-toggler/address-form-toggler.ts":
/*!*************************************************************************************************************************************************************!*\
  !*** ./vendor/spryker-shop/customer-page/src/SprykerShop/Yves/CustomerPage/Theme/default/components/molecules/address-form-toggler/address-form-toggler.ts ***!
  \*************************************************************************************************************************************************************/
/*! exports provided: EVENT_TOGGLE_FORM, default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "EVENT_TOGGLE_FORM", function() { return EVENT_TOGGLE_FORM; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return AddressFormToggler; });
/* harmony import */ var ShopUi_models_component__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ShopUi/models/component */ "./vendor/spryker-shop/shop-ui/src/SprykerShop/Yves/ShopUi/Theme/default/models/component.ts");
function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }


var EVENT_TOGGLE_FORM = 'toggleForm';
/**
 * @event toggleForm An event emitted when the component performs a toggle of form container.
 */

class AddressFormToggler extends ShopUi_models_component__WEBPACK_IMPORTED_MODULE_0__["default"] {
  constructor() {
    super(...arguments);

    _defineProperty(this, "toggler", void 0);

    _defineProperty(this, "form", void 0);

    _defineProperty(this, "subForm", void 0);

    _defineProperty(this, "containerBillingAddress", void 0);

    _defineProperty(this, "billingSameAsShipping", void 0);

    _defineProperty(this, "billingSameAsShippingToggler", void 0);

    _defineProperty(this, "parentTarget", void 0);

    _defineProperty(this, "eventToggleForm", new CustomEvent(EVENT_TOGGLE_FORM));

    _defineProperty(this, "togglerPlaceholderValue", '0');
  }

  readyCallback() {}

  init() {
    if (!this.triggerSelector) {
      return;
    }

    this.toggler = document.querySelector(this.triggerSelector);
    this.form = document.querySelector(this.targetSelector);
    this.containerBillingAddress = document.querySelector(this.containerBillingAddressSelector);
    this.billingSameAsShipping = document.querySelector(this.billingSameAsShippingSelector);
    this.billingSameAsShippingToggler = document.querySelector(this.billingSameAsShippingTogglerSelector);

    if (this.subTargetSelector) {
      this.subForm = document.querySelector(this.subTargetSelector);
    }

    if (this.parentTargetClassName) {
      this.parentTarget = document.getElementsByClassName(this.parentTargetClassName)[0];
    }

    this.onTogglerChange();
    this.setTriggerPreSelectedOption();
    this.mapEvents();
  }

  mapEvents() {
    this.toggler.addEventListener('change', () => this.onTogglerChange());
  }

  onTogglerChange() {
    var selectedOption = this.toggler.options[this.toggler.selectedIndex].value;

    if (selectedOption === this.optionValueDeliverToMultipleAddresses) {
      this.toggleSubForm();
    } else {
      this.toggleForm(selectedOption !== this.togglerPlaceholderValue);
    }
  }

  toggleSubForm() {
    this.form.classList.add(this.classToToggle);

    if (this.subForm) {
      this.subForm.classList.remove(this.classToToggle);
      this.containerBillingAddress.classList.remove(this.classToToggle);
      this.billingSameAsShipping.classList.add(this.classToToggle);
      this.billingSameAsShippingToggler.checked = false;
    }
  }

  toggleForm(isShown) {
    this.form.classList.toggle(this.classToToggle, isShown);

    if (this.subForm) {
      this.subForm.classList.add(this.classToToggle);
      this.billingSameAsShipping.classList.remove(this.classToToggle);
    }

    if (this.parentTarget) {
      this.parentTarget.dispatchEvent(this.eventToggleForm);
    }
  }

  setTriggerPreSelectedOption() {
    if (!this.isTriggerHasPreselectedOption) {
      return;
    }

    this.toggler.options[0].disabled = true;
    this.toggler.options[0].defaultSelected = true;
  }
  /**
   * Gets a querySelector of the trigger element.
   */


  get triggerSelector() {
    return this.getAttribute('trigger-selector');
  }
  /**
   * Gets a querySelector of the target element.
   */


  get targetSelector() {
    return this.getAttribute('target-selector');
  }
  /**
   * Gets a querySelector of the sub target element.
   */


  get subTargetSelector() {
    return this.getAttribute('sub-target-selector');
  }
  /**
   * Gets a querySelector of the billing address form element.
   */


  get containerBillingAddressSelector() {
    return this.getAttribute('container-billing-address-selector');
  }
  /**
   * Gets a querySelector of the 'billing same as shipping' element.
   */


  get billingSameAsShippingSelector() {
    return this.getAttribute('billing-same-as-shipping-selector');
  }
  /**
   * Gets a querySelector of the 'billing same as shipping' checkbox element.
   */


  get billingSameAsShippingTogglerSelector() {
    return this.getAttribute('billing-same-as-shipping-toggler-selector');
  }
  /**
   * Gets a class name for the toggle action.
   */


  get classToToggle() {
    return this.getAttribute('class-to-toggle');
  }
  /**
   * Gets if the split delivery form is defined.
   */


  get optionValueDeliverToMultipleAddresses() {
    return this.getAttribute('toggle-option-value');
  }

  get parentTargetClassName() {
    return this.getAttribute('parent-target-class-name');
  }

  get isTriggerHasPreselectedOption() {
    return this.hasAttribute('is-trigger-has-preselected-option');
  }

}

/***/ })

}]);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vLi92ZW5kb3Ivc3ByeWtlci1zaG9wL2N1c3RvbWVyLXBhZ2Uvc3JjL1NwcnlrZXJTaG9wL1l2ZXMvQ3VzdG9tZXJQYWdlL1RoZW1lL2RlZmF1bHQvY29tcG9uZW50cy9tb2xlY3VsZXMvYWRkcmVzcy1mb3JtLXRvZ2dsZXIvYWRkcmVzcy1mb3JtLXRvZ2dsZXIudHMiXSwibmFtZXMiOlsiRVZFTlRfVE9HR0xFX0ZPUk0iLCJBZGRyZXNzRm9ybVRvZ2dsZXIiLCJDb21wb25lbnQiLCJDdXN0b21FdmVudCIsInJlYWR5Q2FsbGJhY2siLCJpbml0IiwidHJpZ2dlclNlbGVjdG9yIiwidG9nZ2xlciIsImRvY3VtZW50IiwicXVlcnlTZWxlY3RvciIsImZvcm0iLCJ0YXJnZXRTZWxlY3RvciIsImNvbnRhaW5lckJpbGxpbmdBZGRyZXNzIiwiY29udGFpbmVyQmlsbGluZ0FkZHJlc3NTZWxlY3RvciIsImJpbGxpbmdTYW1lQXNTaGlwcGluZyIsImJpbGxpbmdTYW1lQXNTaGlwcGluZ1NlbGVjdG9yIiwiYmlsbGluZ1NhbWVBc1NoaXBwaW5nVG9nZ2xlciIsImJpbGxpbmdTYW1lQXNTaGlwcGluZ1RvZ2dsZXJTZWxlY3RvciIsInN1YlRhcmdldFNlbGVjdG9yIiwic3ViRm9ybSIsInBhcmVudFRhcmdldENsYXNzTmFtZSIsInBhcmVudFRhcmdldCIsImdldEVsZW1lbnRzQnlDbGFzc05hbWUiLCJvblRvZ2dsZXJDaGFuZ2UiLCJzZXRUcmlnZ2VyUHJlU2VsZWN0ZWRPcHRpb24iLCJtYXBFdmVudHMiLCJhZGRFdmVudExpc3RlbmVyIiwic2VsZWN0ZWRPcHRpb24iLCJvcHRpb25zIiwic2VsZWN0ZWRJbmRleCIsInZhbHVlIiwib3B0aW9uVmFsdWVEZWxpdmVyVG9NdWx0aXBsZUFkZHJlc3NlcyIsInRvZ2dsZVN1YkZvcm0iLCJ0b2dnbGVGb3JtIiwidG9nZ2xlclBsYWNlaG9sZGVyVmFsdWUiLCJjbGFzc0xpc3QiLCJhZGQiLCJjbGFzc1RvVG9nZ2xlIiwicmVtb3ZlIiwiY2hlY2tlZCIsImlzU2hvd24iLCJ0b2dnbGUiLCJkaXNwYXRjaEV2ZW50IiwiZXZlbnRUb2dnbGVGb3JtIiwiaXNUcmlnZ2VySGFzUHJlc2VsZWN0ZWRPcHRpb24iLCJkaXNhYmxlZCIsImRlZmF1bHRTZWxlY3RlZCIsImdldEF0dHJpYnV0ZSIsImhhc0F0dHJpYnV0ZSJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7OztBQUFBO0FBRU8sSUFBTUEsaUJBQWlCLEdBQUcsWUFBMUI7QUFFUDs7OztBQUdlLE1BQU1DLGtCQUFOLFNBQWlDQywrREFBakMsQ0FBMkM7QUFBQTtBQUFBOztBQUFBOztBQUFBOztBQUFBOztBQUFBOztBQUFBOztBQUFBOztBQUFBOztBQUFBLDZDQWViLElBQUlDLFdBQUosQ0FBZ0JILGlCQUFoQixDQWZhOztBQUFBLHFEQWdCRCxHQWhCQztBQUFBOztBQWtCNUNJLGVBQVYsR0FBZ0MsQ0FBRTs7QUFFeEJDLE1BQVYsR0FBdUI7QUFDbkIsUUFBSSxDQUFDLEtBQUtDLGVBQVYsRUFBMkI7QUFDdkI7QUFDSDs7QUFFRCxTQUFLQyxPQUFMLEdBQWtDQyxRQUFRLENBQUNDLGFBQVQsQ0FBdUIsS0FBS0gsZUFBNUIsQ0FBbEM7QUFDQSxTQUFLSSxJQUFMLEdBQTZCRixRQUFRLENBQUNDLGFBQVQsQ0FBdUIsS0FBS0UsY0FBNUIsQ0FBN0I7QUFDQSxTQUFLQyx1QkFBTCxHQUE0Q0osUUFBUSxDQUFDQyxhQUFULENBQXVCLEtBQUtJLCtCQUE1QixDQUE1QztBQUNBLFNBQUtDLHFCQUFMLEdBQTBDTixRQUFRLENBQUNDLGFBQVQsQ0FBdUIsS0FBS00sNkJBQTVCLENBQTFDO0FBQ0EsU0FBS0MsNEJBQUwsR0FDSVIsUUFBUSxDQUFDQyxhQUFULENBQXVCLEtBQUtRLG9DQUE1QixDQURKOztBQUlBLFFBQUksS0FBS0MsaUJBQVQsRUFBNEI7QUFDeEIsV0FBS0MsT0FBTCxHQUFnQ1gsUUFBUSxDQUFDQyxhQUFULENBQXVCLEtBQUtTLGlCQUE1QixDQUFoQztBQUNI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Ozs7O0FBR0EsTUFBSTlCLG9DQUFKLEdBQW1EO0FBQy9DLFdBQU8sS0FBSzhCLFlBQUwsQ0FBa0IsMkNBQWxCLENBQVA7QUFDSDtBQUVEOzs7OztBQUdBLE1BQUlWLGFBQUosR0FBNEI7QUFDeEIsV0FBTyxLQUFLVSxZQUFMLENBQWtCLGlCQUFsQixDQUFQO0FBQ0g7QUFFRDs7Ozs7QUFHQSxNQUFJaEIscUNBQUosR0FBb0Q7QUFDaEQsV0FBTyxLQUFLZ0IsWUFBTCxDQUFrQixxQkFBbEIsQ0FBUDtBQUNIOztBQUVELE1BQWMzQixxQkFBZCxHQUE4QztBQUMxQyxXQUFPLEtBQUsyQixZQUFMLENBQWtCLDBCQUFsQixDQUFQO0FBQ0g7O0FBRUQsTUFBY0gsNkJBQWQsR0FBdUQ7QUFDbkQsV0FBTyxLQUFLSSxZQUFMLENBQWtCLG1DQUFsQixDQUFQO0FBQ0g7O0FBM0pxRCxDIiwiZmlsZSI6Ii4vanMveXZlc19kZWZhdWx0LmFkZHJlc3MtZm9ybS10b2dnbGVyLmVzbS5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBDb21wb25lbnQgZnJvbSAnU2hvcFVpL21vZGVscy9jb21wb25lbnQnO1xuXG5leHBvcnQgY29uc3QgRVZFTlRfVE9HR0xFX0ZPUk0gPSAndG9nZ2xlRm9ybSc7XG5cbi8qKlxuICogQGV2ZW50IHRvZ2dsZUZvcm0gQW4gZXZlbnQgZW1pdHRlZCB3aGVuIHRoZSBjb21wb25lbnQgcGVyZm9ybXMgYSB0b2dnbGUgb2YgZm9ybSBjb250YWluZXIuXG4gKi9cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIEFkZHJlc3NGb3JtVG9nZ2xlciBleHRlbmRzIENvbXBvbmVudCB7XG4gICAgLyoqXG4gICAgICogRWxlbWVudCB0cmlnZ2VyaW5nIHRoZSB0b2dnbGUgYWN0aW9uLlxuICAgICAqL1xuICAgIHRvZ2dsZXI6IEhUTUxTZWxlY3RFbGVtZW50O1xuXG4gICAgLyoqXG4gICAgICogRWxlbWVudHMgdGFyZ2V0ZWQgYnkgdGhlIHRvZ2dsZSBhY3Rpb24uXG4gICAgICovXG4gICAgZm9ybTogSFRNTEZvcm1FbGVtZW50O1xuICAgIHByb3RlY3RlZCBzdWJGb3JtOiBIVE1MRm9ybUVsZW1lbnQ7XG4gICAgcHJvdGVjdGVkIGNvbnRhaW5lckJpbGxpbmdBZGRyZXNzOiBIVE1MRWxlbWVudDtcbiAgICBwcm90ZWN0ZWQgYmlsbGluZ1NhbWVBc1NoaXBwaW5nOiBIVE1MRWxlbWVudDtcbiAgICBwcm90ZWN0ZWQgYmlsbGluZ1NhbWVBc1NoaXBwaW5nVG9nZ2xlcjogSFRNTElucHV0RWxlbWVudDtcbiAgICBwcm90ZWN0ZWQgcGFyZW50VGFyZ2V0OiBIVE1MRWxlbWVudDtcbiAgICBwcm90ZWN0ZWQgZXZlbnRUb2dnbGVGb3JtOiBDdXN0b21FdmVudCA9IG5ldyBDdXN0b21FdmVudChFVkVOVF9UT0dHTEVfRk9STSk7XG4gICAgcHJvdGVjdGVkIHJlYWRvbmx5IHRvZ2dsZXJQbGFjZWhvbGRlclZhbHVlOiBzdHJpbmcgPSAnMCc7XG5cbiAgICBwcm90ZWN0ZWQgcmVhZHlDYWxsYmFjaygpOiB2b2lkIHt9XG5cbiAgICBwcm90ZWN0ZWQgaW5pdCgpOiB2b2lkIHtcbiAgICAgICAgaWYgKCF0aGlzLnRyaWdnZXJTZWxlY3Rvcikge1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG5cbiAgICAgICAgdGhpcy50b2dnbGVyID0gPEhUTUxTZWxlY3RFbGVtZW50PmRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IodGhpcy50cmlnZ2VyU2VsZWN0b3IpO1xuICAgICAgICB0aGlzLmZvcm0gPSA8SFRNTEZvcm1FbGVtZW50PmRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IodGhpcy50YXJnZXRTZWxlY3Rvcik7XG4gICAgICAgIHRoaXMuY29udGFpbmVyQmlsbGluZ0FkZHJlc3MgPSA8SFRNTEVsZW1lbnQ+ZG9jdW1lbnQucXVlcnlTZWxlY3Rvcih0aGlzLmNvbnRhaW5lckJpbGxpbmdBZGRyZXNzU2VsZWN0b3IpO1xuICAgICAgICB0aGlzLmJpbGxpbmdTYW1lQXNTaGlwcGluZyA9IDxIVE1MRWxlbWVudD5kb2N1bWVudC5xdWVyeVNlbGVjdG9yKHRoaXMuYmlsbGluZ1NhbWVBc1NoaXBwaW5nU2VsZWN0b3IpO1xuICAgICAgICB0aGlzLmJpbGxpbmdTYW1lQXNTaGlwcGluZ1RvZ2dsZXIgPSA8SFRNTElucHV0RWxlbWVudD4oXG4gICAgICAgICAgICBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKHRoaXMuYmlsbGluZ1NhbWVBc1NoaXBwaW5nVG9nZ2xlclNlbGVjdG9yKVxuICAgICAgICApO1xuXG4gICAgICAgIGlmICh0aGlzLnN1YlRhcmdldFNlbGVjdG9yKSB7XG4gICAgICAgICAgICB0aGlzLnN1YkZvcm0gPSA8SFRNTEZvcm1FbGVtZW50PmRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IodGhpcy5zdWJUYXJnZXRTZWxlY3Rvcik7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAodGhpcy5wYXJlbnRUYXJnZXRDbGFzc05hbWUpIHtcbiAgICAgICAgICAgIHRoaXMucGFyZW50VGFyZ2V0ID0gPEhUTUxFbGVtZW50PmRvY3VtZW50LmdldEVsZW1lbnRzQnlDbGFzc05hbWUodGhpcy5wYXJlbnRUYXJnZXRDbGFzc05hbWUpWzBdO1xuICAgICAgICB9XG5cbiAgICAgICAgdGhpcy5vblRvZ2dsZXJDaGFuZ2UoKTtcbiAgICAgICAgdGhpcy5zZXRUcmlnZ2VyUHJlU2VsZWN0ZWRPcHRpb24oKTtcbiAgICAgICAgdGhpcy5tYXBFdmVudHMoKTtcbiAgICB9XG5cbiAgICBwcm90ZWN0ZWQgbWFwRXZlbnRzKCk6IHZvaWQge1xuICAgICAgICB0aGlzLnRvZ2dsZXIuYWRkRXZlbnRMaXN0ZW5lcignY2hhbmdlJywgKCkgPT4gdGhpcy5vblRvZ2dsZXJDaGFuZ2UoKSk7XG4gICAgfVxuXG4gICAgcHJvdGVjdGVkIG9uVG9nZ2xlckNoYW5nZSgpOiB2b2lkIHtcbiAgICAgICAgY29uc3Qgc2VsZWN0ZWRPcHRpb24gPSA8c3RyaW5nPnRoaXMudG9nZ2xlci5vcHRpb25zW3RoaXMudG9nZ2xlci5zZWxlY3RlZEluZGV4XS52YWx1ZTtcblxuICAgICAgICBpZiAoc2VsZWN0ZWRPcHRpb24gPT09IHRoaXMub3B0aW9uVmFsdWVEZWxpdmVyVG9NdWx0aXBsZUFkZHJlc3Nlcykge1xuICAgICAgICAgICAgdGhpcy50b2dnbGVTdWJGb3JtKCk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICB0aGlzLnRvZ2dsZUZvcm0oc2VsZWN0ZWRPcHRpb24gIT09IHRoaXMudG9nZ2xlclBsYWNlaG9sZGVyVmFsdWUpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgcHJvdGVjdGVkIHRvZ2dsZVN1YkZvcm0oKTogdm9pZCB7XG4gICAgICAgIHRoaXMuZm9ybS5jbGFzc0xpc3QuYWRkKHRoaXMuY2xhc3NUb1RvZ2dsZSk7XG5cbiAgICAgICAgaWYgKHRoaXMuc3ViRm9ybSkge1xuICAgICAgICAgICAgdGhpcy5zdWJGb3JtLmNsYXNzTGlzdC5yZW1vdmUodGhpcy5jbGFzc1RvVG9nZ2xlKTtcbiAgICAgICAgICAgIHRoaXMuY29udGFpbmVyQmlsbGluZ0FkZHJlc3MuY2xhc3NMaXN0LnJlbW92ZSh0aGlzLmNsYXNzVG9Ub2dnbGUpO1xuICAgICAgICAgICAgdGhpcy5iaWxsaW5nU2FtZUFzU2hpcHBpbmcuY2xhc3NMaXN0LmFkZCh0aGlzLmNsYXNzVG9Ub2dnbGUpO1xuICAgICAgICAgICAgdGhpcy5iaWxsaW5nU2FtZUFzU2hpcHBpbmdUb2dnbGVyLmNoZWNrZWQgPSBmYWxzZTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIHByb3RlY3RlZCB0b2dnbGVGb3JtKGlzU2hvd246IGJvb2xlYW4pOiB2b2lkIHtcbiAgICAgICAgdGhpcy5mb3JtLmNsYXNzTGlzdC50b2dnbGUodGhpcy5jbGFzc1RvVG9nZ2xlLCBpc1Nob3duKTtcblxuICAgICAgICBpZiAodGhpcy5zdWJGb3JtKSB7XG4gICAgICAgICAgICB0aGlzLnN1YkZvcm0uY2xhc3NMaXN0LmFkZCh0aGlzLmNsYXNzVG9Ub2dnbGUpO1xuICAgICAgICAgICAgdGhpcy5iaWxsaW5nU2FtZUFzU2hpcHBpbmcuY2xhc3NMaXN0LnJlbW92ZSh0aGlzLmNsYXNzVG9Ub2dnbGUpO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKHRoaXMucGFyZW50VGFyZ2V0KSB7XG4gICAgICAgICAgICB0aGlzLnBhcmVudFRhcmdldC5kaXNwYXRjaEV2ZW50KHRoaXMuZXZlbnRUb2dnbGVGb3JtKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIHByb3RlY3RlZCBzZXRUcmlnZ2VyUHJlU2VsZWN0ZWRPcHRpb24oKTogdm9pZCB7XG4gICAgICAgIGlmICghdGhpcy5pc1RyaWdnZXJIYXNQcmVzZWxlY3RlZE9wdGlvbikge1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG5cbiAgICAgICAgdGhpcy50b2dnbGVyLm9wdGlvbnNbMF0uZGlzYWJsZWQgPSB0cnVlO1xuICAgICAgICB0aGlzLnRvZ2dsZXIub3B0aW9uc1swXS5kZWZhdWx0U2VsZWN0ZWQgPSB0cnVlO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIEdldHMgYSBxdWVyeVNlbGVjdG9yIG9mIHRoZSB0cmlnZ2VyIGVsZW1lbnQuXG4gICAgICovXG4gICAgZ2V0IHRyaWdnZXJTZWxlY3RvcigpOiBzdHJpbmcge1xuICAgICAgICByZXR1cm4gdGhpcy5nZXRBdHRyaWJ1dGUoJ3RyaWdnZXItc2VsZWN0b3InKTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBHZXRzIGEgcXVlcnlTZWxlY3RvciBvZiB0aGUgdGFyZ2V0IGVsZW1lbnQuXG4gICAgICovXG4gICAgZ2V0IHRhcmdldFNlbGVjdG9yKCk6IHN0cmluZyB7XG4gICAgICAgIHJldHVybiB0aGlzLmdldEF0dHJpYnV0ZSgndGFyZ2V0LXNlbGVjdG9yJyk7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogR2V0cyBhIHF1ZXJ5U2VsZWN0b3Igb2YgdGhlIHN1YiB0YXJnZXQgZWxlbWVudC5cbiAgICAgKi9cbiAgICBnZXQgc3ViVGFyZ2V0U2VsZWN0b3IoKTogc3RyaW5nIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuZ2V0QXR0cmlidXRlKCdzdWItdGFyZ2V0LXNlbGVjdG9yJyk7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogR2V0cyBhIHF1ZXJ5U2VsZWN0b3Igb2YgdGhlIGJpbGxpbmcgYWRkcmVzcyBmb3JtIGVsZW1lbnQuXG4gICAgICovXG4gICAgZ2V0IGNvbnRhaW5lckJpbGxpbmdBZGRyZXNzU2VsZWN0b3IoKTogc3RyaW5nIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuZ2V0QXR0cmlidXRlKCdjb250YWluZXItYmlsbGluZy1hZGRyZXNzLXNlbGVjdG9yJyk7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogR2V0cyBhIHF1ZXJ5U2VsZWN0b3Igb2YgdGhlICdiaWxsaW5nIHNhbWUgYXMgc2hpcHBpbmcnIGVsZW1lbnQuXG4gICAgICovXG4gICAgZ2V0IGJpbGxpbmdTYW1lQXNTaGlwcGluZ1NlbGVjdG9yKCk6IHN0cmluZyB7XG4gICAgICAgIHJldHVybiB0aGlzLmdldEF0dHJpYnV0ZSgnYmlsbGluZy1zYW1lLWFzLXNoaXBwaW5nLXNlbGVjdG9yJyk7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogR2V0cyBhIHF1ZXJ5U2VsZWN0b3Igb2YgdGhlICdiaWxsaW5nIHNhbWUgYXMgc2hpcHBpbmcnIGNoZWNrYm94IGVsZW1lbnQuXG4gICAgICovXG4gICAgZ2V0IGJpbGxpbmdTYW1lQXNTaGlwcGluZ1RvZ2dsZXJTZWxlY3RvcigpOiBzdHJpbmcge1xuICAgICAgICByZXR1cm4gdGhpcy5nZXRBdHRyaWJ1dGUoJ2JpbGxpbmctc2FtZS1hcy1zaGlwcGluZy10b2dnbGVyLXNlbGVjdG9yJyk7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogR2V0cyBhIGNsYXNzIG5hbWUgZm9yIHRoZSB0b2dnbGUgYWN0aW9uLlxuICAgICAqL1xuICAgIGdldCBjbGFzc1RvVG9nZ2xlKCk6IHN0cmluZyB7XG4gICAgICAgIHJldHVybiB0aGlzLmdldEF0dHJpYnV0ZSgnY2xhc3MtdG8tdG9nZ2xlJyk7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogR2V0cyBpZiB0aGUgc3BsaXQgZGVsaXZlcnkgZm9ybSBpcyBkZWZpbmVkLlxuICAgICAqL1xuICAgIGdldCBvcHRpb25WYWx1ZURlbGl2ZXJUb011bHRpcGxlQWRkcmVzc2VzKCk6IHN0cmluZyB7XG4gICAgICAgIHJldHVybiB0aGlzLmdldEF0dHJpYnV0ZSgndG9nZ2xlLW9wdGlvbi12YWx1ZScpO1xuICAgIH1cblxuICAgIHByb3RlY3RlZCBnZXQgcGFyZW50VGFyZ2V0Q2xhc3NOYW1lKCk6IHN0cmluZyB7XG4gICAgICAgIHJldHVybiB0aGlzLmdldEF0dHJpYnV0ZSgncGFyZW50LXRhcmdldC1jbGFzcy1uYW1lJyk7XG4gICAgfVxuXG4gICAgcHJvdGVjdGVkIGdldCBpc1RyaWdnZXJIYXNQcmVzZWxlY3RlZE9wdGlvbigpOiBib29sZWFuIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuaGFzQXR0cmlidXRlKCdpcy10cmlnZ2VyLWhhcy1wcmVzZWxlY3RlZC1vcHRpb24nKTtcbiAgICB9XG59XG4iXSwic291cmNlUm9vdCI6IiJ9