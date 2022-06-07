(window["webpackJsonp_yves_default"] = window["webpackJsonp_yves_default"] || []).push([[50],{

/***/ "./vendor/spryker-eco/fact-finder-web-components/src/SprykerEco/Yves/FactFinderWebComponents/Theme/default/components/molecules/similar-products/similar-products.ts":
/*!***************************************************************************************************************************************************************************!*\
  !*** ./vendor/spryker-eco/fact-finder-web-components/src/SprykerEco/Yves/FactFinderWebComponents/Theme/default/components/molecules/similar-products/similar-products.ts ***!
  \***************************************************************************************************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return SimilarProducts; });
/* harmony import */ var ShopUi_models_component__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ShopUi/models/component */ "./vendor/spryker-shop/shop-ui/src/SprykerShop/Yves/ShopUi/Theme/default/models/component.ts");
function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }


class SimilarProducts extends ShopUi_models_component__WEBPACK_IMPORTED_MODULE_0__["default"] {
  constructor() {
    super(...arguments);

    _defineProperty(this, "similarProductsElement", void 0);
  }

  readyCallback() {
    this.similarProductsElement = this.querySelector("." + this.jsName + "__holder");
    this.similarProductsElement.setAttribute('record-id', this.recordId);
  }

  get recordId() {
    return this.getAttribute('recordId');
  }

}

/***/ })

}]);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vLi92ZW5kb3Ivc3ByeWtlci1lY28vZmFjdC1maW5kZXItd2ViLWNvbXBvbmVudHMvc3JjL1NwcnlrZXJFY28vWXZlcy9GYWN0RmluZGVyV2ViQ29tcG9uZW50cy9UaGVtZS9kZWZhdWx0L2NvbXBvbmVudHMvbW9sZWN1bGVzL3NpbWlsYXItcHJvZHVjdHMvc2ltaWxhci1wcm9kdWN0cy50cyJdLCJuYW1lcyI6WyJTaW1pbGFyUHJvZHVjdHMiLCJDb21wb25lbnQiLCJyZWFkeUNhbGxiYWNrIiwic2ltaWxhclByb2R1Y3RzRWxlbWVudCIsInF1ZXJ5U2VsZWN0b3IiLCJqc05hbWUiLCJzZXRBdHRyaWJ1dGUiLCJyZWNvcmRJZCIsImdldEF0dHJpYnV0ZSJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7O0FBQUE7QUFFZSxNQUFNQSxlQUFOLFNBQThCQywrREFBOUIsQ0FBd0M7QUFBQTtBQUFBOztBQUFBO0FBQUE7O0FBR3pDQyxlQUFWLEdBQWdDO0FBQzVCLFNBQUtDLHNCQUFMLEdBQTJDLEtBQUtDLGFBQUwsT0FBdUIsS0FBS0MsTUFBNUIsY0FBM0M7QUFDQSxTQUFLRixzQkFBTCxDQUE0QkcsWUFBNUIsQ0FBeUMsV0FBekMsRUFBc0QsS0FBS0MsUUFBM0Q7QUFDSDs7QUFFRCxNQUFJQSxRQUFKLEdBQXVCO0FBQ25CLFdBQU8sS0FBS0MsWUFBTCxDQUFrQixVQUFsQixDQUFQO0FBQ0g7O0FBVmtELEMiLCJmaWxlIjoiLi9qcy95dmVzX2RlZmF1bHQuNTAuZXNtLmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IENvbXBvbmVudCBmcm9tICdTaG9wVWkvbW9kZWxzL2NvbXBvbmVudCc7XG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIFNpbWlsYXJQcm9kdWN0cyBleHRlbmRzIENvbXBvbmVudCB7XG4gICAgcHJpdmF0ZSBzaW1pbGFyUHJvZHVjdHNFbGVtZW50OiBIVE1MRWxlbWVudDtcbiAgICBcbiAgICBwcm90ZWN0ZWQgcmVhZHlDYWxsYmFjaygpOiB2b2lkIHtcbiAgICAgICAgdGhpcy5zaW1pbGFyUHJvZHVjdHNFbGVtZW50ID0gPEhUTUxFbGVtZW50PnRoaXMucXVlcnlTZWxlY3RvcihgLiR7dGhpcy5qc05hbWV9X19ob2xkZXJgKTtcbiAgICAgICAgdGhpcy5zaW1pbGFyUHJvZHVjdHNFbGVtZW50LnNldEF0dHJpYnV0ZSgncmVjb3JkLWlkJywgdGhpcy5yZWNvcmRJZCk7XG4gICAgfVxuICAgIFxuICAgIGdldCByZWNvcmRJZCgpOiBzdHJpbmcge1xuICAgICAgICByZXR1cm4gdGhpcy5nZXRBdHRyaWJ1dGUoJ3JlY29yZElkJyk7XG4gICAgfVxufVxuIl0sInNvdXJjZVJvb3QiOiIifQ==