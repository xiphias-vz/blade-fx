(window["webpackJsonp_yves_default"] = window["webpackJsonp_yves_default"] || []).push([["collapsible-list"],{

/***/ "./vendor/spryker-shop/shop-ui/src/SprykerShop/Yves/ShopUi/Theme/default/components/molecules/collapsible-list/collapsible-list.ts":
/*!*****************************************************************************************************************************************!*\
  !*** ./vendor/spryker-shop/shop-ui/src/SprykerShop/Yves/ShopUi/Theme/default/components/molecules/collapsible-list/collapsible-list.ts ***!
  \*****************************************************************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return CollapsibleList; });
/* harmony import */ var _models_component__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../../models/component */ "./vendor/spryker-shop/shop-ui/src/SprykerShop/Yves/ShopUi/Theme/default/models/component.ts");
function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }


class CollapsibleList extends _models_component__WEBPACK_IMPORTED_MODULE_0__["default"] {
  constructor() {
    super(...arguments);

    _defineProperty(this, "triggerButton", void 0);

    _defineProperty(this, "targetList", void 0);
  }

  readyCallback() {}

  init() {
    this.triggerButton = this.getElementsByClassName(this.jsName + "__button")[0];
    this.targetList = this.getElementsByClassName(this.jsName + "__list")[0];
    this.mapEvents();
  }

  mapEvents() {
    this.mapClickEvent();
  }

  mapClickEvent() {
    if (!this.triggerButton) {
      return;
    }

    this.triggerButton.addEventListener('click', () => this.onClick());
  }

  onClick() {
    this.targetList.classList.toggle(this.listTriggerClass);
    this.triggerButton.classList.toggle(this.buttonTriggerClass);
  }

  get listTriggerClass() {
    return this.getAttribute('list-trigger-class');
  }

  get buttonTriggerClass() {
    return this.getAttribute('button-trigger-class');
  }

}

/***/ })

}]);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vLi92ZW5kb3Ivc3ByeWtlci1zaG9wL3Nob3AtdWkvc3JjL1NwcnlrZXJTaG9wL1l2ZXMvU2hvcFVpL1RoZW1lL2RlZmF1bHQvY29tcG9uZW50cy9tb2xlY3VsZXMvY29sbGFwc2libGUtbGlzdC9jb2xsYXBzaWJsZS1saXN0LnRzIl0sIm5hbWVzIjpbIkNvbGxhcHNpYmxlTGlzdCIsIkNvbXBvbmVudCIsInJlYWR5Q2FsbGJhY2siLCJpbml0IiwidHJpZ2dlckJ1dHRvbiIsImdldEVsZW1lbnRzQnlDbGFzc05hbWUiLCJqc05hbWUiLCJ0YXJnZXRMaXN0IiwibWFwRXZlbnRzIiwibWFwQ2xpY2tFdmVudCIsImFkZEV2ZW50TGlzdGVuZXIiLCJvbkNsaWNrIiwiY2xhc3NMaXN0IiwidG9nZ2xlIiwibGlzdFRyaWdnZXJDbGFzcyIsImJ1dHRvblRyaWdnZXJDbGFzcyIsImdldEF0dHJpYnV0ZSJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7O0FBQUE7QUFFZSxNQUFNQSxlQUFOLFNBQThCQyx5REFBOUIsQ0FBd0M7QUFBQTtBQUFBOztBQUFBOztBQUFBO0FBQUE7O0FBSXpDQyxlQUFWLEdBQTBCLENBQUU7O0FBRWxCQyxNQUFWLEdBQWlCO0FBQ2IsU0FBS0MsYUFBTCxHQUF3QyxLQUFLQyxzQkFBTCxDQUErQixLQUFLQyxNQUFwQyxlQUFzRCxDQUF0RCxDQUF4QztBQUNBLFNBQUtDLFVBQUwsR0FBK0IsS0FBS0Ysc0JBQUwsQ0FBK0IsS0FBS0MsTUFBcEMsYUFBb0QsQ0FBcEQsQ0FBL0I7QUFFQSxTQUFLRSxTQUFMO0FBQ0g7O0FBRVNBLFdBQVYsR0FBNEI7QUFDeEIsU0FBS0MsYUFBTDtBQUNIOztBQUVTQSxlQUFWLEdBQWdDO0FBQzVCLFFBQUksQ0FBQyxLQUFLTCxhQUFWLEVBQXlCO0FBQ3JCO0FBQ0g7O0FBRUQsU0FBS0EsYUFBTCxDQUFtQk0sZ0JBQW5CLENBQW9DLE9BQXBDLEVBQTZDLE1BQU0sS0FBS0MsT0FBTCxFQUFuRDtBQUNIOztBQUVTQSxTQUFWLEdBQTBCO0FBQ3RCLFNBQUtKLFVBQUwsQ0FBZ0JLLFNBQWhCLENBQTBCQyxNQUExQixDQUFpQyxLQUFLQyxnQkFBdEM7QUFDQSxTQUFLVixhQUFMLENBQW1CUSxTQUFuQixDQUE2QkMsTUFBN0IsQ0FBb0MsS0FBS0Usa0JBQXpDO0FBQ0g7O0FBRUQsTUFBY0QsZ0JBQWQsR0FBeUM7QUFDckMsV0FBTyxLQUFLRSxZQUFMLENBQWtCLG9CQUFsQixDQUFQO0FBQ0g7O0FBRUQsTUFBY0Qsa0JBQWQsR0FBMkM7QUFDdkMsV0FBTyxLQUFLQyxZQUFMLENBQWtCLHNCQUFsQixDQUFQO0FBQ0g7O0FBcENrRCxDIiwiZmlsZSI6Ii4vanMveXZlc19kZWZhdWx0LmNvbGxhcHNpYmxlLWxpc3QuZXNtLmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IENvbXBvbmVudCBmcm9tICcuLi8uLi8uLi9tb2RlbHMvY29tcG9uZW50JztcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgQ29sbGFwc2libGVMaXN0IGV4dGVuZHMgQ29tcG9uZW50IHtcbiAgICBwcm90ZWN0ZWQgdHJpZ2dlckJ1dHRvbjogSFRNTEJ1dHRvbkVsZW1lbnQ7XG4gICAgcHJvdGVjdGVkIHRhcmdldExpc3Q6IEhUTUxFbGVtZW50O1xuXG4gICAgcHJvdGVjdGVkIHJlYWR5Q2FsbGJhY2soKSB7fVxuXG4gICAgcHJvdGVjdGVkIGluaXQoKSB7XG4gICAgICAgIHRoaXMudHJpZ2dlckJ1dHRvbiA9IDxIVE1MQnV0dG9uRWxlbWVudD50aGlzLmdldEVsZW1lbnRzQnlDbGFzc05hbWUoYCR7dGhpcy5qc05hbWV9X19idXR0b25gKVswXTtcbiAgICAgICAgdGhpcy50YXJnZXRMaXN0ID0gPEhUTUxFbGVtZW50PnRoaXMuZ2V0RWxlbWVudHNCeUNsYXNzTmFtZShgJHt0aGlzLmpzTmFtZX1fX2xpc3RgKVswXTtcblxuICAgICAgICB0aGlzLm1hcEV2ZW50cygpO1xuICAgIH1cblxuICAgIHByb3RlY3RlZCBtYXBFdmVudHMoKTogdm9pZCB7XG4gICAgICAgIHRoaXMubWFwQ2xpY2tFdmVudCgpO1xuICAgIH1cblxuICAgIHByb3RlY3RlZCBtYXBDbGlja0V2ZW50KCk6IHZvaWQge1xuICAgICAgICBpZiAoIXRoaXMudHJpZ2dlckJ1dHRvbikge1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG5cbiAgICAgICAgdGhpcy50cmlnZ2VyQnV0dG9uLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgKCkgPT4gdGhpcy5vbkNsaWNrKCkpO1xuICAgIH1cblxuICAgIHByb3RlY3RlZCBvbkNsaWNrKCk6IHZvaWQge1xuICAgICAgICB0aGlzLnRhcmdldExpc3QuY2xhc3NMaXN0LnRvZ2dsZSh0aGlzLmxpc3RUcmlnZ2VyQ2xhc3MpO1xuICAgICAgICB0aGlzLnRyaWdnZXJCdXR0b24uY2xhc3NMaXN0LnRvZ2dsZSh0aGlzLmJ1dHRvblRyaWdnZXJDbGFzcyk7XG4gICAgfVxuXG4gICAgcHJvdGVjdGVkIGdldCBsaXN0VHJpZ2dlckNsYXNzKCk6IHN0cmluZyB7XG4gICAgICAgIHJldHVybiB0aGlzLmdldEF0dHJpYnV0ZSgnbGlzdC10cmlnZ2VyLWNsYXNzJyk7XG4gICAgfVxuXG4gICAgcHJvdGVjdGVkIGdldCBidXR0b25UcmlnZ2VyQ2xhc3MoKTogc3RyaW5nIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuZ2V0QXR0cmlidXRlKCdidXR0b24tdHJpZ2dlci1jbGFzcycpO1xuICAgIH1cbn1cbiJdLCJzb3VyY2VSb290IjoiIn0=