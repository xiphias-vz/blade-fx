(window["webpackJsonp_yves_default"] = window["webpackJsonp_yves_default"] || []).push([[22],{

/***/ "./src/Pyz/Yves/ShopUi/Theme/default/components/molecules/confirmation-modal/confirmation-modal.ts":
/*!*********************************************************************************************************!*\
  !*** ./src/Pyz/Yves/ShopUi/Theme/default/components/molecules/confirmation-modal/confirmation-modal.ts ***!
  \*********************************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return ConfirmationModal; });
/* harmony import */ var ShopUi_models_component__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ShopUi/models/component */ "./vendor/spryker-shop/shop-ui/src/SprykerShop/Yves/ShopUi/Theme/default/models/component.ts");
function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }


class ConfirmationModal extends ShopUi_models_component__WEBPACK_IMPORTED_MODULE_0__["default"] {
  constructor() {
    super(...arguments);

    _defineProperty(this, "triggers", void 0);

    _defineProperty(this, "closeTriggers", void 0);
  }

  readyCallback() {
    this.triggers = Array.from(document.getElementsByClassName(this.triggerClass));
    this.closeTriggers = Array.from(this.getElementsByClassName(this.closeTriggerClass));
    this.mapEvents();
  }

  mapEvents() {
    this.triggers.forEach(trigger => {
      trigger.addEventListener('click', event => this.showModal(event));
    });
    this.closeTriggers.forEach(trigger => {
      trigger.addEventListener('click', () => this.closeModal());
    });
  }

  showModal(event) {
    event.preventDefault();
    this.classList.add(this.activeClass);
    document.body.classList.add('is-not-scrollable');
  }

  closeModal() {
    this.classList.remove(this.activeClass);
    document.body.classList.remove('is-not-scrollable');
  }

  get triggerClass() {
    return this.getAttribute('trigger-class');
  }

  get closeTriggerClass() {
    return this.jsName + "__close";
  }

  get activeClass() {
    return this.name + "--is-open";
  }

}

/***/ })

}]);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vLi9zcmMvUHl6L1l2ZXMvU2hvcFVpL1RoZW1lL2RlZmF1bHQvY29tcG9uZW50cy9tb2xlY3VsZXMvY29uZmlybWF0aW9uLW1vZGFsL2NvbmZpcm1hdGlvbi1tb2RhbC50cyJdLCJuYW1lcyI6WyJDb25maXJtYXRpb25Nb2RhbCIsIkNvbXBvbmVudCIsInJlYWR5Q2FsbGJhY2siLCJ0cmlnZ2VycyIsIkFycmF5IiwiZnJvbSIsImRvY3VtZW50IiwiZ2V0RWxlbWVudHNCeUNsYXNzTmFtZSIsInRyaWdnZXJDbGFzcyIsImNsb3NlVHJpZ2dlcnMiLCJjbG9zZVRyaWdnZXJDbGFzcyIsIm1hcEV2ZW50cyIsImZvckVhY2giLCJ0cmlnZ2VyIiwiYWRkRXZlbnRMaXN0ZW5lciIsImV2ZW50Iiwic2hvd01vZGFsIiwiY2xvc2VNb2RhbCIsInByZXZlbnREZWZhdWx0IiwiY2xhc3NMaXN0IiwiYWRkIiwiYWN0aXZlQ2xhc3MiLCJib2R5IiwicmVtb3ZlIiwiZ2V0QXR0cmlidXRlIiwianNOYW1lIiwibmFtZSJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7O0FBQUE7QUFFZSxNQUFNQSxpQkFBTixTQUFnQ0MsK0RBQWhDLENBQTBDO0FBQUE7QUFBQTs7QUFBQTs7QUFBQTtBQUFBOztBQUkzQ0MsZUFBVixHQUFnQztBQUM1QixTQUFLQyxRQUFMLEdBQStCQyxLQUFLLENBQUNDLElBQU4sQ0FBV0MsUUFBUSxDQUFDQyxzQkFBVCxDQUFnQyxLQUFLQyxZQUFyQyxDQUFYLENBQS9CO0FBQ0EsU0FBS0MsYUFBTCxHQUFvQ0wsS0FBSyxDQUFDQyxJQUFOLENBQVcsS0FBS0Usc0JBQUwsQ0FBNEIsS0FBS0csaUJBQWpDLENBQVgsQ0FBcEM7QUFFQSxTQUFLQyxTQUFMO0FBQ0g7O0FBRVNBLFdBQVYsR0FBNEI7QUFDeEIsU0FBS1IsUUFBTCxDQUFjUyxPQUFkLENBQXNCQyxPQUFPLElBQUk7QUFDN0JBLGFBQU8sQ0FBQ0MsZ0JBQVIsQ0FBeUIsT0FBekIsRUFBbUNDLEtBQUQsSUFBa0IsS0FBS0MsU0FBTCxDQUFlRCxLQUFmLENBQXBEO0FBQ0gsS0FGRDtBQUdBLFNBQUtOLGFBQUwsQ0FBbUJHLE9BQW5CLENBQTJCQyxPQUFPLElBQUk7QUFDbENBLGFBQU8sQ0FBQ0MsZ0JBQVIsQ0FBeUIsT0FBekIsRUFBa0MsTUFBTSxLQUFLRyxVQUFMLEVBQXhDO0FBQ0gsS0FGRDtBQUdIOztBQUVTRCxXQUFWLENBQW9CRCxLQUFwQixFQUFrQztBQUM5QkEsU0FBSyxDQUFDRyxjQUFOO0FBQ0EsU0FBS0MsU0FBTCxDQUFlQyxHQUFmLENBQW1CLEtBQUtDLFdBQXhCO0FBQ0FmLFlBQVEsQ0FBQ2dCLElBQVQsQ0FBY0gsU0FBZCxDQUF3QkMsR0FBeEIsQ0FBNEIsbUJBQTVCO0FBQ0g7O0FBRVNILFlBQVYsR0FBdUI7QUFDbkIsU0FBS0UsU0FBTCxDQUFlSSxNQUFmLENBQXNCLEtBQUtGLFdBQTNCO0FBQ0FmLFlBQVEsQ0FBQ2dCLElBQVQsQ0FBY0gsU0FBZCxDQUF3QkksTUFBeEIsQ0FBK0IsbUJBQS9CO0FBQ0g7O0FBRUQsTUFBY2YsWUFBZCxHQUFxQztBQUNqQyxXQUFPLEtBQUtnQixZQUFMLENBQWtCLGVBQWxCLENBQVA7QUFDSDs7QUFFRCxNQUFjZCxpQkFBZCxHQUEwQztBQUN0QyxXQUFVLEtBQUtlLE1BQWY7QUFDSDs7QUFFRCxNQUFjSixXQUFkLEdBQW9DO0FBQ2hDLFdBQVUsS0FBS0ssSUFBZjtBQUNIOztBQXpDb0QsQyIsImZpbGUiOiIuL2pzL3l2ZXNfZGVmYXVsdC4yMi5lc20uanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgQ29tcG9uZW50IGZyb20gJ1Nob3BVaS9tb2RlbHMvY29tcG9uZW50JztcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgQ29uZmlybWF0aW9uTW9kYWwgZXh0ZW5kcyBDb21wb25lbnQge1xuICAgIHByb3RlY3RlZCB0cmlnZ2VyczogSFRNTEVsZW1lbnRbXTtcbiAgICBwcm90ZWN0ZWQgY2xvc2VUcmlnZ2VyczogSFRNTEVsZW1lbnRbXTtcblxuICAgIHByb3RlY3RlZCByZWFkeUNhbGxiYWNrKCk6IHZvaWQge1xuICAgICAgICB0aGlzLnRyaWdnZXJzID0gPEhUTUxFbGVtZW50W10+QXJyYXkuZnJvbShkb2N1bWVudC5nZXRFbGVtZW50c0J5Q2xhc3NOYW1lKHRoaXMudHJpZ2dlckNsYXNzKSk7XG4gICAgICAgIHRoaXMuY2xvc2VUcmlnZ2VycyA9IDxIVE1MRWxlbWVudFtdPkFycmF5LmZyb20odGhpcy5nZXRFbGVtZW50c0J5Q2xhc3NOYW1lKHRoaXMuY2xvc2VUcmlnZ2VyQ2xhc3MpKTtcblxuICAgICAgICB0aGlzLm1hcEV2ZW50cygpO1xuICAgIH1cblxuICAgIHByb3RlY3RlZCBtYXBFdmVudHMoKTogdm9pZCB7XG4gICAgICAgIHRoaXMudHJpZ2dlcnMuZm9yRWFjaCh0cmlnZ2VyID0+IHtcbiAgICAgICAgICAgIHRyaWdnZXIuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCAoZXZlbnQ6IEV2ZW50KSA9PiB0aGlzLnNob3dNb2RhbChldmVudCkpO1xuICAgICAgICB9KTtcbiAgICAgICAgdGhpcy5jbG9zZVRyaWdnZXJzLmZvckVhY2godHJpZ2dlciA9PiB7XG4gICAgICAgICAgICB0cmlnZ2VyLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgKCkgPT4gdGhpcy5jbG9zZU1vZGFsKCkpO1xuICAgICAgICB9KTtcbiAgICB9XG5cbiAgICBwcm90ZWN0ZWQgc2hvd01vZGFsKGV2ZW50OiBFdmVudCkge1xuICAgICAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgICB0aGlzLmNsYXNzTGlzdC5hZGQodGhpcy5hY3RpdmVDbGFzcyk7XG4gICAgICAgIGRvY3VtZW50LmJvZHkuY2xhc3NMaXN0LmFkZCgnaXMtbm90LXNjcm9sbGFibGUnKTtcbiAgICB9XG5cbiAgICBwcm90ZWN0ZWQgY2xvc2VNb2RhbCgpIHtcbiAgICAgICAgdGhpcy5jbGFzc0xpc3QucmVtb3ZlKHRoaXMuYWN0aXZlQ2xhc3MpO1xuICAgICAgICBkb2N1bWVudC5ib2R5LmNsYXNzTGlzdC5yZW1vdmUoJ2lzLW5vdC1zY3JvbGxhYmxlJyk7XG4gICAgfVxuXG4gICAgcHJvdGVjdGVkIGdldCB0cmlnZ2VyQ2xhc3MoKTogc3RyaW5nIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuZ2V0QXR0cmlidXRlKCd0cmlnZ2VyLWNsYXNzJyk7XG4gICAgfVxuXG4gICAgcHJvdGVjdGVkIGdldCBjbG9zZVRyaWdnZXJDbGFzcygpOiBzdHJpbmcge1xuICAgICAgICByZXR1cm4gYCR7dGhpcy5qc05hbWV9X19jbG9zZWA7XG4gICAgfVxuXG4gICAgcHJvdGVjdGVkIGdldCBhY3RpdmVDbGFzcygpOiBzdHJpbmcge1xuICAgICAgICByZXR1cm4gYCR7dGhpcy5uYW1lfS0taXMtb3BlbmA7XG4gICAgfVxufVxuIl0sInNvdXJjZVJvb3QiOiIifQ==