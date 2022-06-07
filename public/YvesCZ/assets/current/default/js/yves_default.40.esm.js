(window["webpackJsonp_yves_default"] = window["webpackJsonp_yves_default"] || []).push([[40],{

/***/ "./src/Pyz/Yves/ShopUi/Theme/default/components/molecules/quantity-counter/quantity-counter.ts":
/*!*****************************************************************************************************!*\
  !*** ./src/Pyz/Yves/ShopUi/Theme/default/components/molecules/quantity-counter/quantity-counter.ts ***!
  \*****************************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return QuantityCounter; });
/* harmony import */ var ShopUi_models_component__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ShopUi/models/component */ "./vendor/spryker-shop/shop-ui/src/SprykerShop/Yves/ShopUi/Theme/default/models/component.ts");
function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }


var MIN_DECREMENT_VALUE = 2;
class QuantityCounter extends ShopUi_models_component__WEBPACK_IMPORTED_MODULE_0__["default"] {
  constructor() {
    super(...arguments);

    _defineProperty(this, "quantityInput", void 0);

    _defineProperty(this, "decrButton", void 0);

    _defineProperty(this, "incrButton", void 0);

    _defineProperty(this, "value", void 0);

    _defineProperty(this, "duration", 1000);

    _defineProperty(this, "timeout", 0);

    _defineProperty(this, "inputChange", new Event('input'));
  }

  readyCallback() {}

  init() {
    this.quantityInput = this.getElementsByClassName(this.jsName + "__input")[0];
    this.decrButton = this.getElementsByClassName(this.jsName + "__decr")[0];
    this.incrButton = this.getElementsByClassName(this.jsName + "__incr")[0];
    this.value = this.getValue;
    this.mapEvents();
    this.setMaxQuantityToInfinity();
  }

  mapEvents() {
    this.quantityInput.addEventListener('change', () => this.autoUpdateOnChange());
    this.decrButton.addEventListener('click', () => this.onDecrementButtonClick());
    this.incrButton.addEventListener('click', () => this.onIncrementButtonClick());
  }

  onDecrementButtonClick() {
    var value = Number(this.quantityInput.value);

    if (value > this.minQuantity) {
      this.quantityInput.value = (value - 1).toString();
    }

    if (this.isRemovalUrlAllowed && value === this.minQuantity) {
      this.quantityInput.form.action = this.removeUrl;
    }

    if (value <= MIN_DECREMENT_VALUE) {
      this.decrButton.classList.add('button--disabled');
    }

    this.autoUpdateOnChange();
    this.triggerInputEvent();
  }

  onIncrementButtonClick() {
    var value = Number(this.quantityInput.value);

    if (value >= 1) {
      this.decrButton.classList.remove('button--disabled');
    }

    if (value < this.maxQuantity) {
      this.quantityInput.value = (value + 1).toString();
      this.autoUpdateOnChange();
      this.triggerInputEvent();
    }
  }

  autoUpdateOnChange() {
    if (this.autoUpdate) {
      this.timer();
    }
  }

  triggerInputEvent() {
    this.quantityInput.dispatchEvent(this.inputChange);
  }

  timer() {
    clearTimeout(this.timeout);
    this.timeout = window.setTimeout(() => {
      if (this.value !== this.getValue || this.isRemovalUrlAllowed) {
        this.quantityInput.form.submit();
      }
    }, this.duration);
  }

  setMaxQuantityToInfinity() {
    if (!this.maxQuantity) {
      this.quantityInput.setAttribute('data-max-quantity', 'Infinity');
    }
  }

  get maxQuantity() {
    return +this.quantityInput.getAttribute('data-max-quantity');
  }

  get minQuantity() {
    return +this.quantityInput.getAttribute('data-min-quantity');
  }

  get removeUrl() {
    return this.quantityInput.getAttribute('data-remove-url');
  }

  get isRemovalUrlAllowed() {
    return this.removeUrl !== null;
  }

  get autoUpdate() {
    return this.quantityInput.getAttribute('data-auto-update');
  }

  get getValue() {
    return +this.quantityInput.value;
  }

}

/***/ })

}]);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vLi9zcmMvUHl6L1l2ZXMvU2hvcFVpL1RoZW1lL2RlZmF1bHQvY29tcG9uZW50cy9tb2xlY3VsZXMvcXVhbnRpdHktY291bnRlci9xdWFudGl0eS1jb3VudGVyLnRzIl0sIm5hbWVzIjpbIk1JTl9ERUNSRU1FTlRfVkFMVUUiLCJRdWFudGl0eUNvdW50ZXIiLCJDb21wb25lbnQiLCJFdmVudCIsInJlYWR5Q2FsbGJhY2siLCJpbml0IiwicXVhbnRpdHlJbnB1dCIsImdldEVsZW1lbnRzQnlDbGFzc05hbWUiLCJqc05hbWUiLCJkZWNyQnV0dG9uIiwiaW5jckJ1dHRvbiIsInZhbHVlIiwiZ2V0VmFsdWUiLCJtYXBFdmVudHMiLCJzZXRNYXhRdWFudGl0eVRvSW5maW5pdHkiLCJhZGRFdmVudExpc3RlbmVyIiwiYXV0b1VwZGF0ZU9uQ2hhbmdlIiwib25EZWNyZW1lbnRCdXR0b25DbGljayIsIm9uSW5jcmVtZW50QnV0dG9uQ2xpY2siLCJOdW1iZXIiLCJtaW5RdWFudGl0eSIsInRvU3RyaW5nIiwiaXNSZW1vdmFsVXJsQWxsb3dlZCIsImZvcm0iLCJhY3Rpb24iLCJyZW1vdmVVcmwiLCJjbGFzc0xpc3QiLCJhZGQiLCJ0cmlnZ2VySW5wdXRFdmVudCIsInJlbW92ZSIsIm1heFF1YW50aXR5IiwiYXV0b1VwZGF0ZSIsInRpbWVyIiwiZGlzcGF0Y2hFdmVudCIsImlucHV0Q2hhbmdlIiwiY2xlYXJUaW1lb3V0IiwidGltZW91dCIsIndpbmRvdyIsInNldFRpbWVvdXQiLCJzdWJtaXQiLCJkdXJhdGlvbiIsInNldEF0dHJpYnV0ZSIsImdldEF0dHJpYnV0ZSJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7O0FBQUE7QUFFQSxJQUFNQSxtQkFBbUIsR0FBRyxDQUE1QjtBQUVlLE1BQU1DLGVBQU4sU0FBOEJDLCtEQUE5QixDQUF3QztBQUFBO0FBQUE7O0FBQUE7O0FBQUE7O0FBQUE7O0FBQUE7O0FBQUEsc0NBS3RCLElBTHNCOztBQUFBLHFD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QUtDLFFBSk8sQ0FBZjtBQUtIOztBQUVTMUIsMEJBQVYsR0FBMkM7QUFDdkMsUUFBSSxDQUFDLEtBQUtnQixXQUFWLEVBQXVCO0FBQ25CLFdBQUt4QixhQUFMLENBQW1CbUMsWUFBbkIsQ0FBZ0MsbUJBQWhDLEVBQXFELFVBQXJEO0FBQ0g7QUFDSjs7QUFFRCxNQUFjWCxXQUFkLEdBQW9DO0FBQ2hDLFdBQU8sQ0FBQyxLQUFLeEIsYUFBTCxDQUFtQm9DLFlBQW5CLENBQWdDLG1CQUFoQyxDQUFSO0FBQ0g7O0FBRUQsTUFBY3RCLFdBQWQsR0FBb0M7QUFDaEMsV0FBTyxDQUFDLEtBQUtkLGFBQUwsQ0FBbUJvQyxZQUFuQixDQUFnQyxtQkFBaEMsQ0FBUjtBQUNIOztBQUVELE1BQWNqQixTQUFkLEdBQWtDO0FBQzlCLFdBQU8sS0FBS25CLGFBQUwsQ0FBbUJvQyxZQUFuQixDQUFnQyxpQkFBaEMsQ0FBUDtBQUNIOztBQUVELE1BQWNwQixtQkFBZCxHQUE2QztBQUN6QyxXQUFPLEtBQUtHLFNBQUwsS0FBbUIsSUFBMUI7QUFDSDs7QUFFRCxNQUFjTSxVQUFkLEdBQW1DO0FBQy9CLFdBQU8sS0FBS3pCLGFBQUwsQ0FBbUJvQyxZQUFuQixDQUFnQyxrQkFBaEMsQ0FBUDtBQUNIOztBQUVELE1BQWM5QixRQUFkLEdBQWlDO0FBQzdCLFdBQU8sQ0FBQyxLQUFLTixhQUFMLENBQW1CSyxLQUEzQjtBQUNIOztBQTVHa0QsQyIsImZpbGUiOiIuL2pzL3l2ZXNfZGVmYXVsdC40MC5lc20uanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgQ29tcG9uZW50IGZyb20gJ1Nob3BVaS9tb2RlbHMvY29tcG9uZW50JztcblxuY29uc3QgTUlOX0RFQ1JFTUVOVF9WQUxVRSA9IDI7XG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIFF1YW50aXR5Q291bnRlciBleHRlbmRzIENvbXBvbmVudCB7XG4gICAgcHJvdGVjdGVkIHF1YW50aXR5SW5wdXQ6IEhUTUxJbnB1dEVsZW1lbnQ7XG4gICAgcHJvdGVjdGVkIGRlY3JCdXR0b246IEhUTUxCdXR0b25FbGVtZW50O1xuICAgIHByb3RlY3RlZCBpbmNyQnV0dG9uOiBIVE1MQnV0dG9uRWxlbWVudDtcbiAgICBwcm90ZWN0ZWQgdmFsdWU6IG51bWJlcjtcbiAgICBwcm90ZWN0ZWQgZHVyYXRpb246IG51bWJlciA9IDEwMDA7XG4gICAgcHJvdGVjdGVkIHRpbWVvdXQ6IG51bWJlciA9IDA7XG4gICAgcHJvdGVjdGVkIGlucHV0Q2hhbmdlOiBFdmVudCA9IG5ldyBFdmVudCgnaW5wdXQnKTtcblxuICAgIHByb3RlY3RlZCByZWFkeUNhbGxiYWNrKCk6IHZvaWQge31cblxuICAgIHByb3RlY3RlZCBpbml0KCk6IHZvaWQge1xuICAgICAgICB0aGlzLnF1YW50aXR5SW5wdXQgPSA8SFRNTElucHV0RWxlbWVudD50aGlzLmdldEVsZW1lbnRzQnlDbGFzc05hbWUoYCR7dGhpcy5qc05hbWV9X19pbnB1dGApWzBdO1xuICAgICAgICB0aGlzLmRlY3JCdXR0b24gPSA8SFRNTEJ1dHRvbkVsZW1lbnQ+dGhpcy5nZXRFbGVtZW50c0J5Q2xhc3NOYW1lKGAke3RoaXMuanNOYW1lfV9fZGVjcmApWzBdO1xuICAgICAgICB0aGlzLmluY3JCdXR0b24gPSA8SFRNTEJ1dHRvbkVsZW1lbnQ+dGhpcy5nZXRFbGVtZW50c0J5Q2xhc3NOYW1lKGAke3RoaXMuanNOYW1lfV9faW5jcmApWzBdO1xuICAgICAgICB0aGlzLnZhbHVlID0gdGhpcy5nZXRWYWx1ZTtcblxuICAgICAgICB0aGlzLm1hcEV2ZW50cygpO1xuICAgICAgICB0aGlzLnNldE1heFF1YW50aXR5VG9JbmZpbml0eSgpO1xuICAgIH1cblxuICAgIHByb3RlY3RlZCBtYXBFdmVudHMoKTogdm9pZCB7XG4gICAgICAgIHRoaXMucXVhbnRpdHlJbnB1dC5hZGRFdmVudExpc3RlbmVyKCdjaGFuZ2UnLCAoKSA9PiB0aGlzLmF1dG9VcGRhdGVPbkNoYW5nZSgpKTtcbiAgICAgICAgdGhpcy5kZWNyQnV0dG9uLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgKCkgPT4gdGhpcy5vbkRlY3JlbWVudEJ1dHRvbkNsaWNrKCkpO1xuICAgICAgICB0aGlzLmluY3JCdXR0b24uYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCAoKSA9PiB0aGlzLm9uSW5jcmVtZW50QnV0dG9uQ2xpY2soKSk7XG4gICAgfVxuXG4gICAgcHJvdGVjdGVkIG9uRGVjcmVtZW50QnV0dG9uQ2xpY2soKTogdm9pZCB7XG4gICAgICAgIGNvbnN0IHZhbHVlOiBudW1iZXIgPSBOdW1iZXIodGhpcy5xdWFudGl0eUlucHV0LnZhbHVlKTtcblxuICAgICAgICBpZiAodmFsdWUgPiB0aGlzLm1pblF1YW50aXR5KSB7XG4gICAgICAgICAgICB0aGlzLnF1YW50aXR5SW5wdXQudmFsdWUgPSAodmFsdWUgLSAxKS50b1N0cmluZygpO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKHRoaXMuaXNSZW1vdmFsVXJsQWxsb3dlZCAmJiB2YWx1ZSA9PT0gdGhpcy5taW5RdWFudGl0eSkge1xuICAgICAgICAgICAgdGhpcy5xdWFudGl0eUlucHV0LmZvcm0uYWN0aW9uID0gdGhpcy5yZW1vdmVVcmw7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAodmFsdWUgPD0gTUlOX0RFQ1JFTUVOVF9WQUxVRSkge1xuICAgICAgICAgICAgdGhpcy5kZWNyQnV0dG9uLmNsYXNzTGlzdC5hZGQoJ2J1dHRvbi0tZGlzYWJsZWQnKTtcbiAgICAgICAgfVxuXG4gICAgICAgIHRoaXMuYXV0b1VwZGF0ZU9uQ2hhbmdlKCk7XG4gICAgICAgIHRoaXMudHJpZ2dlcklucHV0RXZlbnQoKTtcbiAgICB9XG5cbiAgICBwcm90ZWN0ZWQgb25JbmNyZW1lbnRCdXR0b25DbGljaygpOiB2b2lkIHtcbiAgICAgICAgY29uc3QgdmFsdWU6IG51bWJlciA9IE51bWJlcih0aGlzLnF1YW50aXR5SW5wdXQudmFsdWUpO1xuXG4gICAgICAgIGlmICh2YWx1ZSA+PSAxKSB7XG4gICAgICAgICAgICB0aGlzLmRlY3JCdXR0b24uY2xhc3NMaXN0LnJlbW92ZSgnYnV0dG9uLS1kaXNhYmxlZCcpO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKHZhbHVlIDwgdGhpcy5tYXhRdWFudGl0eSkge1xuICAgICAgICAgICAgdGhpcy5xdWFudGl0eUlucHV0LnZhbHVlID0gKHZhbHVlICsgMSkudG9TdHJpbmcoKTtcblxuICAgICAgICAgICAgdGhpcy5hdXRvVXBkYXRlT25DaGFuZ2UoKTtcbiAgICAgICAgICAgIHRoaXMudHJpZ2dlcklucHV0RXZlbnQoKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIHByb3RlY3RlZCBhdXRvVXBkYXRlT25DaGFuZ2UoKTogdm9pZCB7XG4gICAgICAgIGlmICh0aGlzLmF1dG9VcGRhdGUpIHtcbiAgICAgICAgICAgIHRoaXMudGltZXIoKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIHByb3RlY3RlZCB0cmlnZ2VySW5wdXRFdmVudCgpOiB2b2lkIHtcbiAgICAgICAgdGhpcy5xdWFudGl0eUlucHV0LmRpc3BhdGNoRXZlbnQodGhpcy5pbnB1dENoYW5nZSk7XG4gICAgfVxuXG4gICAgcHJvdGVjdGVkIHRpbWVyKCk6IHZvaWQge1xuICAgICAgICBjbGVhclRpbWVvdXQodGhpcy50aW1lb3V0KTtcbiAgICAgICAgdGhpcy50aW1lb3V0ID0gd2luZG93LnNldFRpbWVvdXQoKCkgPT4ge1xuICAgICAgICAgICAgaWYgKHRoaXMudmFsdWUgIT09IHRoaXMuZ2V0VmFsdWUgfHwgdGhpcy5pc1JlbW92YWxVcmxBbGxvd2VkKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5xdWFudGl0eUlucHV0LmZvcm0uc3VibWl0KCk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0sIHRoaXMuZHVyYXRpb24pO1xuICAgIH1cblxuICAgIHByb3RlY3RlZCBzZXRNYXhRdWFudGl0eVRvSW5maW5pdHkoKTogdm9pZCB7XG4gICAgICAgIGlmICghdGhpcy5tYXhRdWFudGl0eSkge1xuICAgICAgICAgICAgdGhpcy5xdWFudGl0eUlucHV0LnNldEF0dHJpYnV0ZSgnZGF0YS1tYXgtcXVhbnRpdHknLCAnSW5maW5pdHknKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIHByb3RlY3RlZCBnZXQgbWF4UXVhbnRpdHkoKTogbnVtYmVyIHtcbiAgICAgICAgcmV0dXJuICt0aGlzLnF1YW50aXR5SW5wdXQuZ2V0QXR0cmlidXRlKCdkYXRhLW1heC1xdWFudGl0eScpO1xuICAgIH1cblxuICAgIHByb3RlY3RlZCBnZXQgbWluUXVhbnRpdHkoKTogbnVtYmVyIHtcbiAgICAgICAgcmV0dXJuICt0aGlzLnF1YW50aXR5SW5wdXQuZ2V0QXR0cmlidXRlKCdkYXRhLW1pbi1xdWFudGl0eScpO1xuICAgIH1cblxuICAgIHByb3RlY3RlZCBnZXQgcmVtb3ZlVXJsKCk6IHN0cmluZyB7XG4gICAgICAgIHJldHVybiB0aGlzLnF1YW50aXR5SW5wdXQuZ2V0QXR0cmlidXRlKCdkYXRhLXJlbW92ZS11cmwnKTtcbiAgICB9XG5cbiAgICBwcm90ZWN0ZWQgZ2V0IGlzUmVtb3ZhbFVybEFsbG93ZWQoKTogYm9vbGVhbiB7XG4gICAgICAgIHJldHVybiB0aGlzLnJlbW92ZVVybCAhPT0gbnVsbDtcbiAgICB9XG5cbiAgICBwcm90ZWN0ZWQgZ2V0IGF1dG9VcGRhdGUoKTogc3RyaW5nIHtcbiAgICAgICAgcmV0dXJuIHRoaXMucXVhbnRpdHlJbnB1dC5nZXRBdHRyaWJ1dGUoJ2RhdGEtYXV0by11cGRhdGUnKTtcbiAgICB9XG5cbiAgICBwcm90ZWN0ZWQgZ2V0IGdldFZhbHVlKCk6IG51bWJlciB7XG4gICAgICAgIHJldHVybiArdGhpcy5xdWFudGl0eUlucHV0LnZhbHVlO1xuICAgIH1cbn1cbiJdLCJzb3VyY2VSb290IjoiIn0=