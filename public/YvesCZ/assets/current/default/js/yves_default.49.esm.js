(window["webpackJsonp_yves_default"] = window["webpackJsonp_yves_default"] || []).push([[49],{

/***/ "./vendor/spryker-eco/fact-finder-web-components/src/SprykerEco/Yves/FactFinderWebComponents/Theme/default/components/molecules/recommendation-products/recommendation-products.ts":
/*!*****************************************************************************************************************************************************************************************!*\
  !*** ./vendor/spryker-eco/fact-finder-web-components/src/SprykerEco/Yves/FactFinderWebComponents/Theme/default/components/molecules/recommendation-products/recommendation-products.ts ***!
  \*****************************************************************************************************************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return RecommendationProducts; });
/* harmony import */ var ShopUi_models_component__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ShopUi/models/component */ "./vendor/spryker-shop/shop-ui/src/SprykerShop/Yves/ShopUi/Theme/default/models/component.ts");
function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }


class RecommendationProducts extends ShopUi_models_component__WEBPACK_IMPORTED_MODULE_0__["default"] {
  constructor() {
    super(...arguments);

    _defineProperty(this, "recommendationElement", void 0);
  }

  readyCallback() {
    this.recommendationElement = this.querySelector("." + this.jsName + "__holder");
    this.recommendationElement.setAttribute('record-id', this.recordId);
  }

  get recordId() {
    return this.getAttribute('recordId');
  }

}

/***/ })

}]);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vLi92ZW5kb3Ivc3ByeWtlci1lY28vZmFjdC1maW5kZXItd2ViLWNvbXBvbmVudHMvc3JjL1NwcnlrZXJFY28vWXZlcy9GYWN0RmluZGVyV2ViQ29tcG9uZW50cy9UaGVtZS9kZWZhdWx0L2NvbXBvbmVudHMvbW9sZWN1bGVzL3JlY29tbWVuZGF0aW9uLXByb2R1Y3RzL3JlY29tbWVuZGF0aW9uLXByb2R1Y3RzLnRzIl0sIm5hbWVzIjpbIlJlY29tbWVuZGF0aW9uUHJvZHVjdHMiLCJDb21wb25lbnQiLCJyZWFkeUNhbGxiYWNrIiwicmVjb21tZW5kYXRpb25FbGVtZW50IiwicXVlcnlTZWxlY3RvciIsImpzTmFtZSIsInNldEF0dHJpYnV0ZSIsInJlY29yZElkIiwiZ2V0QXR0cmlidXRlIl0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7QUFBQTtBQUVlLE1BQU1BLHNCQUFOLFNBQXFDQywrREFBckMsQ0FBK0M7QUFBQTtBQUFBOztBQUFBO0FBQUE7O0FBR2hEQyxlQUFWLEdBQWdDO0FBQzVCLFNBQUtDLHFCQUFMLEdBQTBDLEtBQUtDLGFBQUwsT0FBdUIsS0FBS0MsTUFBNUIsY0FBMUM7QUFDQSxTQUFLRixxQkFBTCxDQUEyQkcsWUFBM0IsQ0FBd0MsV0FBeEMsRUFBcUQsS0FBS0MsUUFBMUQ7QUFDSDs7QUFFRCxNQUFJQSxRQUFKLEdBQXVCO0FBQ25CLFdBQU8sS0FBS0MsWUFBTCxDQUFrQixVQUFsQixDQUFQO0FBQ0g7O0FBVnlELEMiLCJmaWxlIjoiLi9qcy95dmVzX2RlZmF1bHQuNDkuZXNtLmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IENvbXBvbmVudCBmcm9tICdTaG9wVWkvbW9kZWxzL2NvbXBvbmVudCc7XG4gXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBSZWNvbW1lbmRhdGlvblByb2R1Y3RzIGV4dGVuZHMgQ29tcG9uZW50IHtcbiAgICBwcml2YXRlIHJlY29tbWVuZGF0aW9uRWxlbWVudDogSFRNTEVsZW1lbnQ7XG5cbiAgICBwcm90ZWN0ZWQgcmVhZHlDYWxsYmFjaygpOiB2b2lkIHtcbiAgICAgICAgdGhpcy5yZWNvbW1lbmRhdGlvbkVsZW1lbnQgPSA8SFRNTEVsZW1lbnQ+dGhpcy5xdWVyeVNlbGVjdG9yKGAuJHt0aGlzLmpzTmFtZX1fX2hvbGRlcmApO1xuICAgICAgICB0aGlzLnJlY29tbWVuZGF0aW9uRWxlbWVudC5zZXRBdHRyaWJ1dGUoJ3JlY29yZC1pZCcsIHRoaXMucmVjb3JkSWQpO1xuICAgIH1cblxuICAgIGdldCByZWNvcmRJZCgpOiBzdHJpbmcge1xuICAgICAgICByZXR1cm4gdGhpcy5nZXRBdHRyaWJ1dGUoJ3JlY29yZElkJyk7XG4gICAgfVxufVxuIl0sInNvdXJjZVJvb3QiOiIifQ==