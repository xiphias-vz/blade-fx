(window["webpackJsonp_yves_default"] = window["webpackJsonp_yves_default"] || []).push([[18],{

/***/ "./src/Pyz/Yves/ProductDetailPage/Theme/default/components/molecules/variant-resetter/variant-resetter.ts":
/*!****************************************************************************************************************!*\
  !*** ./src/Pyz/Yves/ProductDetailPage/Theme/default/components/molecules/variant-resetter/variant-resetter.ts ***!
  \****************************************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return VariantResetter; });
/* harmony import */ var ShopUi_models_component__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ShopUi/models/component */ "./vendor/spryker-shop/shop-ui/src/SprykerShop/Yves/ShopUi/Theme/default/models/component.ts");
function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }


class VariantResetter extends ShopUi_models_component__WEBPACK_IMPORTED_MODULE_0__["default"] {
  constructor() {
    super(...arguments);

    _defineProperty(this, "trigger", void 0);

    _defineProperty(this, "target", void 0);
  }

  readyCallback() {}

  init() {
    this.trigger = this.getElementsByClassName(this.jsName + "__trigger")[0];
    this.target = this.getElementsByClassName(this.jsName + "__target")[0];
    this.mapEvents();
  }

  mapEvents() {
    this.trigger.addEventListener('click', event => this.onClick(event));
  }

  onClick(event) {
    event.preventDefault();
    this.target.value = '';
    this.target.closest('form').submit();
  }

}

/***/ })

}]);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vLi9zcmMvUHl6L1l2ZXMvUHJvZHVjdERldGFpbFBhZ2UvVGhlbWUvZGVmYXVsdC9jb21wb25lbnRzL21vbGVjdWxlcy92YXJpYW50LXJlc2V0dGVyL3ZhcmlhbnQtcmVzZXR0ZXIudHMiXSwibmFtZXMiOlsiVmFyaWFudFJlc2V0dGVyIiwiQ29tcG9uZW50IiwicmVhZHlDYWxsYmFjayIsImluaXQiLCJ0cmlnZ2VyIiwiZ2V0RWxlbWVudHNCeUNsYXNzTmFtZSIsImpzTmFtZSIsInRhcmdldCIsIm1hcEV2ZW50cyIsImFkZEV2ZW50TGlzdGVuZXIiLCJldmVudCIsIm9uQ2xpY2siLCJwcmV2ZW50RGVmYXVsdCIsInZhbHVlIiwiY2xvc2VzdCIsInN1Ym1pdCJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7O0FBQUE7QUFFZSxNQUFNQSxlQUFOLFNBQThCQywrREFBOUIsQ0FBd0M7QUFBQTtBQUFBOztBQUFBOztBQUFBO0FBQUE7O0FBSXpDQyxlQUFWLEdBQWdDLENBQUU7O0FBRXhCQyxNQUFWLEdBQXVCO0FBQ25CLFNBQUtDLE9BQUwsR0FBNEIsS0FBS0Msc0JBQUwsQ0FBK0IsS0FBS0MsTUFBcEMsZ0JBQXVELENBQXZELENBQTVCO0FBQ0EsU0FBS0MsTUFBTCxHQUFnQyxLQUFLRixzQkFBTCxDQUErQixLQUFLQyxNQUFwQyxlQUFzRCxDQUF0RCxDQUFoQztBQUVBLFNBQUtFLFNBQUw7QUFDSDs7QUFFU0EsV0FBVixHQUE0QjtBQUN4QixTQUFLSixPQUFMLENBQWFLLGdCQUFiLENBQThCLE9BQTlCLEVBQXdDQyxLQUFELElBQWtCLEtBQUtDLE9BQUwsQ0FBYUQsS0FBYixDQUF6RDtBQUNIOztBQUVTQyxTQUFWLENBQWtCRCxLQUFsQixFQUFzQztBQUNsQ0EsU0FBSyxDQUFDRSxjQUFOO0FBQ0EsU0FBS0wsTUFBTCxDQUFZTSxLQUFaLEdBQW9CLEVBQXBCO0FBQ0EsU0FBS04sTUFBTCxDQUFZTyxPQUFaLENBQW9CLE1BQXBCLEVBQTRCQyxNQUE1QjtBQUNIOztBQXJCa0QsQyIsImZpbGUiOiIuL2pzL3l2ZXNfZGVmYXVsdC4xOC5lc20uanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgQ29tcG9uZW50IGZyb20gJ1Nob3BVaS9tb2RlbHMvY29tcG9uZW50JztcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgVmFyaWFudFJlc2V0dGVyIGV4dGVuZHMgQ29tcG9uZW50IHtcbiAgICBwcm90ZWN0ZWQgdHJpZ2dlcjogSFRNTEVsZW1lbnQ7XG4gICAgcHJvdGVjdGVkIHRhcmdldDogSFRNTElucHV0RWxlbWVudDtcblxuICAgIHByb3RlY3RlZCByZWFkeUNhbGxiYWNrKCk6IHZvaWQge31cblxuICAgIHByb3RlY3RlZCBpbml0KCk6IHZvaWQge1xuICAgICAgICB0aGlzLnRyaWdnZXIgPSA8SFRNTEVsZW1lbnQ+dGhpcy5nZXRFbGVtZW50c0J5Q2xhc3NOYW1lKGAke3RoaXMuanNOYW1lfV9fdHJpZ2dlcmApWzBdO1xuICAgICAgICB0aGlzLnRhcmdldCA9IDxIVE1MSW5wdXRFbGVtZW50PnRoaXMuZ2V0RWxlbWVudHNCeUNsYXNzTmFtZShgJHt0aGlzLmpzTmFtZX1fX3RhcmdldGApWzBdO1xuXG4gICAgICAgIHRoaXMubWFwRXZlbnRzKCk7XG4gICAgfVxuXG4gICAgcHJvdGVjdGVkIG1hcEV2ZW50cygpOiB2b2lkIHtcbiAgICAgICAgdGhpcy50cmlnZ2VyLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgKGV2ZW50OiBFdmVudCkgPT4gdGhpcy5vbkNsaWNrKGV2ZW50KSk7XG4gICAgfVxuXG4gICAgcHJvdGVjdGVkIG9uQ2xpY2soZXZlbnQ6IEV2ZW50KTogdm9pZCB7XG4gICAgICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG4gICAgICAgIHRoaXMudGFyZ2V0LnZhbHVlID0gJyc7XG4gICAgICAgIHRoaXMudGFyZ2V0LmNsb3Nlc3QoJ2Zvcm0nKS5zdWJtaXQoKTtcbiAgICB9XG59XG4iXSwic291cmNlUm9vdCI6IiJ9