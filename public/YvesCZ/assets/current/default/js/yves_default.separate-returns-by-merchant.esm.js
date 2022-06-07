(window["webpackJsonp_yves_default"] = window["webpackJsonp_yves_default"] || []).push([["separate-returns-by-merchant"],{

/***/ "./vendor/spryker-shop/merchant-sales-return-widget/src/SprykerShop/Yves/MerchantSalesReturnWidget/Theme/default/components/molecules/separate-returns-by-merchant/separate-returns-by-merchant.ts":
/*!*********************************************************************************************************************************************************************************************************!*\
  !*** ./vendor/spryker-shop/merchant-sales-return-widget/src/SprykerShop/Yves/MerchantSalesReturnWidget/Theme/default/components/molecules/separate-returns-by-merchant/separate-returns-by-merchant.ts ***!
  \*********************************************************************************************************************************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return SeparateReturnsByMerchant; });
/* harmony import */ var ShopUi_models_component__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ShopUi/models/component */ "./vendor/spryker-shop/shop-ui/src/SprykerShop/Yves/ShopUi/Theme/default/models/component.ts");
function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }


class SeparateReturnsByMerchant extends ShopUi_models_component__WEBPACK_IMPORTED_MODULE_0__["default"] {
  constructor() {
    super(...arguments);

    _defineProperty(this, "checkboxes", void 0);

    _defineProperty(this, "merchantReferenceName", void 0);

    _defineProperty(this, "checkedItems", void 0);

    _defineProperty(this, "checkboxComponentClassname", void 0);

    _defineProperty(this, "checkboxDisabledComponentClassname", void 0);
  }

  readyCallback() {}

  init() {
    this.checkedItems = [];
    this.merchantReferenceName = this.merchantReference;
    this.checkboxes = Array.from(document.getElementsByClassName(this.checkboxClassname));
    this.checkboxComponentClassname = this.checkboxComponentClass;
    this.checkboxDisabledComponentClassname = this.checkboxDisabledComponentClass;
    this.mapEvents();
  }

  mapEvents() {
    this.checkboxToggleAction();
  }

  checkboxToggleAction() {
    this.checkboxes.map(checkbox => {
      checkbox.addEventListener('change', event => {
        var target = event.target;
        target.checked ? this.onAddCheckedItem(target) : this.onRemoveCheckedItems();
      });
    });
  }

  onAddCheckedItem(item) {
    this.checkedItems.push(item);
    this.disableItem(item);
  }

  onRemoveCheckedItems() {
    this.checkedItems = this.checkedItems.filter(item => {
      return item.checked;
    });

    if (this.checkedItems.length) {
      return;
    }

    this.enableAllItems();
  }

  getCheckedItems(target) {
    this.checkedItems = this.checkboxes.filter(checkbox => {
      return checkbox.checked;
    });
  }

  disableItem(target) {
    var currentMerchantReference = target.getAttribute(this.merchantReference);
    var checkboxesToDisable = this.checkboxes.filter(checkbox => {
      return checkbox.getAttribute(this.merchantReference) !== currentMerchantReference;
    });
    checkboxesToDisable.map(checkbox => {
      checkbox.disabled = true;
      checkbox.closest("." + this.checkboxComponentClassname).classList.add("." + this.checkboxDisabledComponentClassname);
    });
  }

  enableAllItems() {
    this.checkboxes.map(checkbox => {
      if (!checkbox.hasAttribute(this.isReturnable)) {
        return;
      }

      checkbox.disabled = false;
      checkbox.closest("." + this.checkboxComponentClassname).classList.remove("." + this.checkboxDisabledComponentClassname);
    });
  }

  get merchantReference() {
    return this.getAttribute('merchant-reference-attribute-name');
  }

  get checkboxClassname() {
    return this.getAttribute('checkbox-classname');
  }

  get productItemClassname() {
    return this.getAttribute('product-item-classname');
  }

  get checkboxComponentClass() {
    return this.getAttribute('checkbox-component-classname');
  }

  get checkboxDisabledComponentClass() {
    return this.getAttribute('checkbox-disabled-component-classname');
  }

  get isReturnable() {
    return this.getAttribute('is-returnable-attribute-name');
  }

}

/***/ })

}]);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vLi92ZW5kb3Ivc3ByeWtlci1zaG9wL21lcmNoYW50LXNhbGVzLXJldHVybi13aWRnZXQvc3JjL1NwcnlrZXJTaG9wL1l2ZXMvTWVyY2hhbnRTYWxlc1JldHVybldpZGdldC9UaGVtZS9kZWZhdWx0L2NvbXBvbmVudHMvbW9sZWN1bGVzL3NlcGFyYXRlLXJldHVybnMtYnktbWVyY2hhbnQvc2VwYXJhdGUtcmV0dXJucy1ieS1tZXJjaGFudC50cyJdLCJuYW1lcyI6WyJTZXBhcmF0ZVJldHVybnNCeU1lcmNoYW50IiwiQ29tcG9uZW50IiwicmVhZHlDYWxsYmFjayIsImluaXQiLCJjaGVja2VkSXRlbXMiLCJtZXJjaGFudFJlZmVyZW5jZU5hbWUiLCJtZXJjaGFudFJlZmVyZW5jZSIsImNoZWNrYm94ZXMiLCJBcnJheSIsImZyb20iLCJkb2N1bWVudCIsImdldEVsZW1lbnRzQnlDbGFzc05hbWUiLCJjaGVja2JveENsYXNzbmFtZSIsImNoZWNrYm94Q29tcG9uZW50Q2xhc3NuYW1lIiwiY2hlY2tib3hDb21wb25lbnRDbGFzcyIsImNoZWNrYm94RGlzYWJsZWRDb21wb25lbnRDbGFzc25hbWUiLCJjaGVja2JveERpc2FibGVkQ29tcG9uZW50Q2xhc3MiLCJtYXBFdmVudHMiLCJjaGVja2JveFRvZ2dsZUFjdGlvbiIsIm1hcCIsImNoZWNrYm94IiwiYWRkRXZlbnRMaXN0ZW5lciIsImV2ZW50IiwidGFyZ2V0IiwiY2hlY2tlZCIsIm9uQWRkQ2hlY2tlZEl0ZW0iLCJvblJlbW92ZUNoZWNrZWRJdGVtcyIsIml0ZW0iLCJwdXNoIiwiZGlzYWJsZUl0ZW0iLCJmaWx0ZXIiLCJsZW5ndGgiLCJlbmFibGVBbGxJdGVtcyIsImdldENoZWNrZWRJdGVtcyIsImN1cnJlbnRNZXJjaGFudFJlZmVyZW5jZSIsImdldEF0dHJpYnV0ZSIsImNoZWNrYm94ZXNUb0Rpc2FibGUiLCJkaXNhYmxlZCIsImNsb3Nlc3QiLCJjbGFzc0xpc3QiLCJhZGQiLCJoYXNB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QztBQUNIOztBQUVEdEIsY0FBUSxDQUFDaUIsUUFBVCxHQUFvQixLQUFwQjtBQUNBakIsY0FBUSxDQUNIa0IsT0FETCxPQUNpQixLQUFLekIsMEJBRHRCLEVBRUswQixTQUZMLENBRWVJLE1BRmYsT0FFMEIsS0FBSzVCLGtDQUYvQjtBQUdILEtBVEQ7QUFVSDs7QUFFRCxNQUFjVCxpQkFBZCxHQUEwQztBQUN0QyxXQUFPLEtBQUs2QixZQUFMLENBQWtCLG1DQUFsQixDQUFQO0FBQ0g7O0FBRUQsTUFBY3ZCLGlCQUFkLEdBQTBDO0FBQ3RDLFdBQU8sS0FBS3VCLFlBQUwsQ0FBa0Isb0JBQWxCLENBQVA7QUFDSDs7QUFFRCxNQUFjUyxvQkFBZCxHQUE2QztBQUN6QyxXQUFPLEtBQUtULFlBQUwsQ0FBa0Isd0JBQWxCLENBQVA7QUFDSDs7QUFFRCxNQUFjckIsc0JBQWQsR0FBK0M7QUFDM0MsV0FBTyxLQUFLcUIsWUFBTCxDQUFrQiw4QkFBbEIsQ0FBUDtBQUNIOztBQUVELE1BQWNuQiw4QkFBZCxHQUF1RDtBQUNuRCxXQUFPLEtBQUttQixZQUFMLENBQWtCLHVDQUFsQixDQUFQO0FBQ0g7O0FBRUQsTUFBY08sWUFBZCxHQUFxQztBQUNqQyxXQUFPLEtBQUtQLFlBQUwsQ0FBa0IsOEJBQWxCLENBQVA7QUFDSDs7QUF6RzRELEMiLCJmaWxlIjoiLi9qcy95dmVzX2RlZmF1bHQuc2VwYXJhdGUtcmV0dXJucy1ieS1tZXJjaGFudC5lc20uanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgQ29tcG9uZW50IGZyb20gJ1Nob3BVaS9tb2RlbHMvY29tcG9uZW50JztcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgU2VwYXJhdGVSZXR1cm5zQnlNZXJjaGFudCBleHRlbmRzIENvbXBvbmVudCB7XG4gICAgcHJvdGVjdGVkIGNoZWNrYm94ZXM6IEhUTUxJbnB1dEVsZW1lbnRbXTtcbiAgICBwcm90ZWN0ZWQgbWVyY2hhbnRSZWZlcmVuY2VOYW1lOiBzdHJpbmc7XG4gICAgcHJvdGVjdGVkIGNoZWNrZWRJdGVtczogSFRNTElucHV0RWxlbWVudFtdO1xuICAgIHByb3RlY3RlZCBjaGVja2JveENvbXBvbmVudENsYXNzbmFtZTogc3RyaW5nO1xuICAgIHByb3RlY3RlZCBjaGVja2JveERpc2FibGVkQ29tcG9uZW50Q2xhc3NuYW1lOiBzdHJpbmc7XG5cbiAgICBwcm90ZWN0ZWQgcmVhZHlDYWxsYmFjaygpIHt9XG5cbiAgICBwcm90ZWN0ZWQgaW5pdCgpIHtcbiAgICAgICAgdGhpcy5jaGVja2VkSXRlbXMgPSBbXTtcbiAgICAgICAgdGhpcy5tZXJjaGFudFJlZmVyZW5jZU5hbWUgPSB0aGlzLm1lcmNoYW50UmVmZXJlbmNlO1xuICAgICAgICB0aGlzLmNoZWNrYm94ZXMgPSA8SFRNTElucHV0RWxlbWVudFtdPkFycmF5LmZyb20oZG9jdW1lbnQuZ2V0RWxlbWVudHNCeUNsYXNzTmFtZSh0aGlzLmNoZWNrYm94Q2xhc3NuYW1lKSk7XG4gICAgICAgIHRoaXMuY2hlY2tib3hDb21wb25lbnRDbGFzc25hbWUgPSB0aGlzLmNoZWNrYm94Q29tcG9uZW50Q2xhc3M7XG4gICAgICAgIHRoaXMuY2hlY2tib3hEaXNhYmxlZENvbXBvbmVudENsYXNzbmFtZSA9IHRoaXMuY2hlY2tib3hEaXNhYmxlZENvbXBvbmVudENsYXNzO1xuXG4gICAgICAgIHRoaXMubWFwRXZlbnRzKCk7XG4gICAgfVxuXG4gICAgcHJvdGVjdGVkIG1hcEV2ZW50cygpOiB2b2lkIHtcbiAgICAgICAgdGhpcy5jaGVja2JveFRvZ2dsZUFjdGlvbigpO1xuICAgIH1cblxuICAgIHByb3RlY3RlZCBjaGVja2JveFRvZ2dsZUFjdGlvbigpOiB2b2lkIHtcbiAgICAgICAgdGhpcy5jaGVja2JveGVzLm1hcCgoY2hlY2tib3gpID0+IHtcbiAgICAgICAgICAgIGNoZWNrYm94LmFkZEV2ZW50TGlzdGVuZXIoJ2NoYW5nZScsIChldmVudCkgPT4ge1xuICAgICAgICAgICAgICAgIGNvbnN0IHRhcmdldCA9IDxIVE1MSW5wdXRFbGVtZW50PmV2ZW50LnRhcmdldDtcbiAgICAgICAgICAgICAgICB0YXJnZXQuY2hlY2tlZCA/IHRoaXMub25BZGRDaGVja2VkSXRlbSh0YXJnZXQpIDogdGhpcy5vblJlbW92ZUNoZWNrZWRJdGVtcygpO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgIH0pO1xuICAgIH1cblxuICAgIHByb3RlY3RlZCBvbkFkZENoZWNrZWRJdGVtKGl0ZW06IEhUTUxJbnB1dEVsZW1lbnQpOiB2b2lkIHtcbiAgICAgICAgdGhpcy5jaGVja2VkSXRlbXMucHVzaChpdGVtKTtcbiAgICAgICAgdGhpcy5kaXNhYmxlSXRlbShpdGVtKTtcbiAgICB9XG5cbiAgICBwcm90ZWN0ZWQgb25SZW1vdmVDaGVja2VkSXRlbXMoKTogdm9pZCB7XG4gICAgICAgIHRoaXMuY2hlY2tlZEl0ZW1zID0gdGhpcy5jaGVja2VkSXRlbXMuZmlsdGVyKChpdGVtKSA9PiB7XG4gICAgICAgICAgICByZXR1cm4gaXRlbS5jaGVja2VkO1xuICAgICAgICB9KTtcblxuICAgICAgICBpZiAodGhpcy5jaGVja2VkSXRlbXMubGVuZ3RoKSB7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cblxuICAgICAgICB0aGlzLmVuYWJsZUFsbEl0ZW1zKCk7XG4gICAgfVxuXG4gICAgcHJvdGVjdGVkIGdldENoZWNrZWRJdGVtcyh0YXJnZXQ6IEhUTUxJbnB1dEVsZW1lbnQpOiB2b2lkIHtcbiAgICAgICAgdGhpcy5jaGVja2VkSXRlbXMgPSB0aGlzLmNoZWNrYm94ZXMuZmlsdGVyKChjaGVja2JveCkgPT4ge1xuICAgICAgICAgICAgcmV0dXJuIGNoZWNrYm94LmNoZWNrZWQ7XG4gICAgICAgIH0pO1xuICAgIH1cblxuICAgIHByb3RlY3RlZCBkaXNhYmxlSXRlbSh0YXJnZXQ6IEhUTUxJbnB1dEVsZW1lbnQpOiB2b2lkIHtcbiAgICAgICAgY29uc3QgY3VycmVudE1lcmNoYW50UmVmZXJlbmNlID0gdGFyZ2V0LmdldEF0dHJpYnV0ZSh0aGlzLm1lcmNoYW50UmVmZXJlbmNlKTtcblxuICAgICAgICBjb25zdCBjaGVja2JveGVzVG9EaXNhYmxlID0gdGhpcy5jaGVja2JveGVzLmZpbHRlcigoY2hlY2tib3gpID0+IHtcbiAgICAgICAgICAgIHJldHVybiBjaGVja2JveC5nZXRBdHRyaWJ1dGUodGhpcy5tZXJjaGFudFJlZmVyZW5jZSkgIT09IGN1cnJlbnRNZXJjaGFudFJlZmVyZW5jZTtcbiAgICAgICAgfSk7XG5cbiAgICAgICAgY2hlY2tib3hlc1RvRGlzYWJsZS5tYXAoKGNoZWNrYm94KSA9PiB7XG4gICAgICAgICAgICBjaGVja2JveC5kaXNhYmxlZCA9IHRydWU7XG4gICAgICAgICAgICBjaGVja2JveFxuICAgICAgICAgICAgICAgIC5jbG9zZXN0KGAuJHt0aGlzLmNoZWNrYm94Q29tcG9uZW50Q2xhc3NuYW1lfWApXG4gICAgICAgICAgICAgICAgLmNsYXNzTGlzdC5hZGQoYC4ke3RoaXMuY2hlY2tib3hEaXNhYmxlZENvbXBvbmVudENsYXNzbmFtZX1gKTtcbiAgICAgICAgfSk7XG4gICAgfVxuXG4gICAgcHJvdGVjdGVkIGVuYWJsZUFsbEl0ZW1zKCk6IHZvaWQge1xuICAgICAgICB0aGlzLmNoZWNrYm94ZXMubWFwKChjaGVja2JveCkgPT4ge1xuICAgICAgICAgICAgaWYgKCFjaGVja2JveC5oYXNBdHRyaWJ1dGUodGhpcy5pc1JldHVybmFibGUpKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBjaGVja2JveC5kaXNhYmxlZCA9IGZhbHNlO1xuICAgICAgICAgICAgY2hlY2tib3hcbiAgICAgICAgICAgICAgICAuY2xvc2VzdChgLiR7dGhpcy5jaGVja2JveENvbXBvbmVudENsYXNzbmFtZX1gKVxuICAgICAgICAgICAgICAgIC5jbGFzc0xpc3QucmVtb3ZlKGAuJHt0aGlzLmNoZWNrYm94RGlzYWJsZWRDb21wb25lbnRDbGFzc25hbWV9YCk7XG4gICAgICAgIH0pO1xuICAgIH1cblxuICAgIHByb3RlY3RlZCBnZXQgbWVyY2hhbnRSZWZlcmVuY2UoKTogc3RyaW5nIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuZ2V0QXR0cmlidXRlKCdtZXJjaGFudC1yZWZlcmVuY2UtYXR0cmlidXRlLW5hbWUnKTtcbiAgICB9XG5cbiAgICBwcm90ZWN0ZWQgZ2V0IGNoZWNrYm94Q2xhc3NuYW1lKCk6IHN0cmluZyB7XG4gICAgICAgIHJldHVybiB0aGlzLmdldEF0dHJpYnV0ZSgnY2hlY2tib3gtY2xhc3NuYW1lJyk7XG4gICAgfVxuXG4gICAgcHJvdGVjdGVkIGdldCBwcm9kdWN0SXRlbUNsYXNzbmFtZSgpOiBzdHJpbmcge1xuICAgICAgICByZXR1cm4gdGhpcy5nZXRBdHRyaWJ1dGUoJ3Byb2R1Y3QtaXRlbS1jbGFzc25hbWUnKTtcbiAgICB9XG5cbiAgICBwcm90ZWN0ZWQgZ2V0IGNoZWNrYm94Q29tcG9uZW50Q2xhc3MoKTogc3RyaW5nIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuZ2V0QXR0cmlidXRlKCdjaGVja2JveC1jb21wb25lbnQtY2xhc3NuYW1lJyk7XG4gICAgfVxuXG4gICAgcHJvdGVjdGVkIGdldCBjaGVja2JveERpc2FibGVkQ29tcG9uZW50Q2xhc3MoKTogc3RyaW5nIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuZ2V0QXR0cmlidXRlKCdjaGVja2JveC1kaXNhYmxlZC1jb21wb25lbnQtY2xhc3NuYW1lJyk7XG4gICAgfVxuXG4gICAgcHJvdGVjdGVkIGdldCBpc1JldHVybmFibGUoKTogc3RyaW5nIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuZ2V0QXR0cmlidXRlKCdpcy1yZXR1cm5hYmxlLWF0dHJpYnV0ZS1uYW1lJyk7XG4gICAgfVxufVxuIl0sInNvdXJjZVJvb3QiOiIifQ==