(window["webpackJsonp_yves_default"] = window["webpackJsonp_yves_default"] || []).push([[28],{

/***/ "./src/Pyz/Yves/ShopUi/Theme/default/components/molecules/list-switches/list-switches.ts":
/*!***********************************************************************************************!*\
  !*** ./src/Pyz/Yves/ShopUi/Theme/default/components/molecules/list-switches/list-switches.ts ***!
  \***********************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return ListSwitches; });
/* harmony import */ var ShopUi_models_component__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ShopUi/models/component */ "./vendor/spryker-shop/shop-ui/src/SprykerShop/Yves/ShopUi/Theme/default/models/component.ts");
function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }


var EVENT_TOGGLE_FORM = 'toggleForm';
class ListSwitches extends ShopUi_models_component__WEBPACK_IMPORTED_MODULE_0__["default"] {
  constructor() {
    super(...arguments);

    _defineProperty(this, "triggers", void 0);
  }

  readyCallback() {}

  init() {
    this.triggers = Array.from(this.getElementsByClassName(this.jsName + "__item"));
    this.mapEvents();
  }

  mapEvents() {
    this.triggers.forEach(trigger => {
      trigger.addEventListener('click', event => this.createCustomEvent(event));
    });
  }

  createCustomEvent(event) {
    var target = event.currentTarget;
    this.dispatchCustomEvent(EVENT_TOGGLE_FORM, {
      targetClass: target.dataset.targetClass
    });
  }

}

/***/ })

}]);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vLi9zcmMvUHl6L1l2ZXMvU2hvcFVpL1RoZW1lL2RlZmF1bHQvY29tcG9uZW50cy9tb2xlY3VsZXMvbGlzdC1zd2l0Y2hlcy9saXN0LXN3aXRjaGVzLnRzIl0sIm5hbWVzIjpbIkVWRU5UX1RPR0dMRV9GT1JNIiwiTGlzdFN3aXRjaGVzIiwiQ29tcG9uZW50IiwicmVhZHlDYWxsYmFjayIsImluaXQiLCJ0cmlnZ2VycyIsIkFycmF5IiwiZnJvbSIsImdldEVsZW1lbnRzQnlDbGFzc05hbWUiLCJqc05hbWUiLCJtYXBFdmVudHMiLCJmb3JFYWNoIiwidHJpZ2dlciIsImFkZEV2ZW50TGlzdGVuZXIiLCJldmVudCIsImNyZWF0ZUN1c3RvbUV2ZW50IiwidGFyZ2V0IiwiY3VycmVudFRhcmdldCIsImRpc3BhdGNoQ3VzdG9tRXZlbnQiLCJ0YXJnZXRDbGFzcyIsImRhdGFzZXQiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7OztBQUFBO0FBRUEsSUFBTUEsaUJBQWlCLEdBQUcsWUFBMUI7QUFFZSxNQUFNQyxZQUFOLFNBQTJCQywrREFBM0IsQ0FBcUM7QUFBQTtBQUFBOztBQUFBO0FBQUE7O0FBR3RDQyxlQUFWLEdBQWdDLENBQUU7O0FBRXhCQyxNQUFWLEdBQXVCO0FBQ25CLFNBQUtDLFFBQUwsR0FBK0JDLEtBQUssQ0FBQ0MsSUFBTixDQUFXLEtBQUtDLHNCQUFMLENBQStCLEtBQUtDLE1BQXBDLFlBQVgsQ0FBL0I7QUFFQSxTQUFLQyxTQUFMO0FBQ0g7O0FBRVNBLFdBQVYsR0FBNEI7QUFDeEIsU0FBS0wsUUFBTCxDQUFjTSxPQUFkLENBQXNCQyxPQUFPLElBQUk7QUFDN0JBLGFBQU8sQ0FBQ0MsZ0JBQVIsQ0FBeUIsT0FBekIsRUFBbUNDLEtBQUQsSUFBa0IsS0FBS0MsaUJBQUwsQ0FBdUJELEtBQXZCLENBQXBEO0FBQ0gsS0FGRDtBQUdIOztBQUVEQyxtQkFBaUIsQ0FBQ0QsS0FBRCxFQUFxQjtBQUNsQyxRQUFNRSxNQUFNLEdBQUdGLEtBQUssQ0FBQ0csYUFBckI7QUFDQSxTQUFLQyxtQkFBTCxDQUF5QmxCLGlCQUF6QixFQUE0QztBQUFDbUIsaUJBQVcsRUFBRUgsTUFBTSxDQUFDSSxPQUFQLENBQWVEO0FBQTdCLEtBQTVDO0FBQ0g7O0FBcEIrQyxDIiwiZmlsZSI6Ii4vanMveXZlc19kZWZhdWx0LjI4LmVzbS5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBDb21wb25lbnQgZnJvbSAnU2hvcFVpL21vZGVscy9jb21wb25lbnQnO1xuXG5jb25zdCBFVkVOVF9UT0dHTEVfRk9STSA9ICd0b2dnbGVGb3JtJztcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgTGlzdFN3aXRjaGVzIGV4dGVuZHMgQ29tcG9uZW50IHtcbiAgICBwcm90ZWN0ZWQgdHJpZ2dlcnM6IEhUTUxFbGVtZW50W107XG5cbiAgICBwcm90ZWN0ZWQgcmVhZHlDYWxsYmFjaygpOiB2b2lkIHt9XG5cbiAgICBwcm90ZWN0ZWQgaW5pdCgpOiB2b2lkIHtcbiAgICAgICAgdGhpcy50cmlnZ2VycyA9IDxIVE1MRWxlbWVudFtdPkFycmF5LmZyb20odGhpcy5nZXRFbGVtZW50c0J5Q2xhc3NOYW1lKGAke3RoaXMuanNOYW1lfV9faXRlbWApKTtcblxuICAgICAgICB0aGlzLm1hcEV2ZW50cygpO1xuICAgIH1cblxuICAgIHByb3RlY3RlZCBtYXBFdmVudHMoKTogdm9pZCB7XG4gICAgICAgIHRoaXMudHJpZ2dlcnMuZm9yRWFjaCh0cmlnZ2VyID0+IHtcbiAgICAgICAgICAgIHRyaWdnZXIuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCAoZXZlbnQ6IEV2ZW50KSA9PiB0aGlzLmNyZWF0ZUN1c3RvbUV2ZW50KGV2ZW50KSk7XG4gICAgICAgIH0pO1xuICAgIH1cblxuICAgIGNyZWF0ZUN1c3RvbUV2ZW50KGV2ZW50OiBFdmVudCk6IHZvaWQge1xuICAgICAgICBjb25zdCB0YXJnZXQgPSBldmVudC5jdXJyZW50VGFyZ2V0O1xuICAgICAgICB0aGlzLmRpc3BhdGNoQ3VzdG9tRXZlbnQoRVZFTlRfVE9HR0xFX0ZPUk0sIHt0YXJnZXRDbGFzczogdGFyZ2V0LmRhdGFzZXQudGFyZ2V0Q2xhc3N9KTtcbiAgICB9XG59XG4iXSwic291cmNlUm9vdCI6IiJ9