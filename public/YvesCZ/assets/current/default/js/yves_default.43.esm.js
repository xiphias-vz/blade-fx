(window["webpackJsonp_yves_default"] = window["webpackJsonp_yves_default"] || []).push([[43],{

/***/ "./src/Pyz/Yves/ShopUi/Theme/default/components/molecules/scroll-to-top/scroll-to-top.ts":
/*!***********************************************************************************************!*\
  !*** ./src/Pyz/Yves/ShopUi/Theme/default/components/molecules/scroll-to-top/scroll-to-top.ts ***!
  \***********************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return ScrollToTop; });
/* harmony import */ var ShopUi_models_component__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ShopUi/models/component */ "./vendor/spryker-shop/shop-ui/src/SprykerShop/Yves/ShopUi/Theme/default/models/component.ts");
/* harmony import */ var jquery_dist_jquery__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! jquery/dist/jquery */ "./node_modules/jquery/dist/jquery.js");
/* harmony import */ var jquery_dist_jquery__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(jquery_dist_jquery__WEBPACK_IMPORTED_MODULE_1__);
function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }



var ANIMATION_SPEED = 500;
var ANIMATION_TYPE = 'swing';
class ScrollToTop extends ShopUi_models_component__WEBPACK_IMPORTED_MODULE_0__["default"] {
  constructor() {
    super(...arguments);

    _defineProperty(this, "trigger", void 0);
  }

  readyCallback() {}

  init() {
    this.trigger = this.getElementsByClassName(this.jsName + "__trigger")[0];
    this.mapEvents();
  }

  mapEvents() {
    this.trigger.addEventListener('click', () => this.scrollToTop());
  }

  scrollToTop() {
    var $body = jquery_dist_jquery__WEBPACK_IMPORTED_MODULE_1___default()('html, body');
    $body.stop().animate({
      scrollTop: 0
    }, ANIMATION_SPEED, ANIMATION_TYPE);
  }

}

/***/ })

}]);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vLi9zcmMvUHl6L1l2ZXMvU2hvcFVpL1RoZW1lL2RlZmF1bHQvY29tcG9uZW50cy9tb2xlY3VsZXMvc2Nyb2xsLXRvLXRvcC9zY3JvbGwtdG8tdG9wLnRzIl0sIm5hbWVzIjpbIkFOSU1BVElPTl9TUEVFRCIsIkFOSU1BVElPTl9UWVBFIiwiU2Nyb2xsVG9Ub3AiLCJDb21wb25lbnQiLCJyZWFkeUNhbGxiYWNrIiwiaW5pdCIsInRyaWdnZXIiLCJnZXRFbGVtZW50c0J5Q2xhc3NOYW1lIiwianNOYW1lIiwibWFwRXZlbnRzIiwiYWRkRXZlbnRMaXN0ZW5lciIsInNjcm9sbFRvVG9wIiwiJGJvZHkiLCIkIiwic3RvcCIsImFuaW1hdGUiLCJzY3JvbGxUb3AiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUE7QUFDQTtBQUVBLElBQU1BLGVBQWUsR0FBRyxHQUF4QjtBQUNBLElBQU1DLGNBQWMsR0FBRyxPQUF2QjtBQUVlLE1BQU1DLFdBQU4sU0FBMEJDLCtEQUExQixDQUFvQztBQUFBO0FBQUE7O0FBQUE7QUFBQTs7QUFHckNDLGVBQVYsR0FBZ0MsQ0FBRTs7QUFFeEJDLE1BQVYsR0FBdUI7QUFDbkIsU0FBS0MsT0FBTCxHQUE0QixLQUFLQyxzQkFBTCxDQUErQixLQUFLQyxNQUFwQyxnQkFBdUQsQ0FBdkQsQ0FBNUI7QUFFQSxTQUFLQyxTQUFMO0FBQ0g7O0FBRVNBLFdBQVYsR0FBNEI7QUFDeEIsU0FBS0gsT0FBTCxDQUFhSSxnQkFBYixDQUE4QixPQUE5QixFQUF1QyxNQUFNLEtBQUtDLFdBQUwsRUFBN0M7QUFDSDs7QUFFREEsYUFBVyxHQUFTO0FBQ2hCLFFBQU1DLEtBQUssR0FBR0MseURBQUMsQ0FBQyxZQUFELENBQWY7QUFDQUQsU0FBSyxDQUFDRSxJQUFOLEdBQWFDLE9BQWIsQ0FBcUI7QUFBQ0MsZUFBUyxFQUFDO0FBQVgsS0FBckIsRUFBb0NoQixlQUFwQyxFQUFxREMsY0FBckQ7QUFDSDs7QUFsQjhDLEMiLCJmaWxlIjoiLi9qcy95dmVzX2RlZmF1bHQuNDMuZXNtLmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IENvbXBvbmVudCBmcm9tICdTaG9wVWkvbW9kZWxzL2NvbXBvbmVudCc7XG5pbXBvcnQgJCBmcm9tICdqcXVlcnkvZGlzdC9qcXVlcnknO1xuXG5jb25zdCBBTklNQVRJT05fU1BFRUQgPSA1MDA7XG5jb25zdCBBTklNQVRJT05fVFlQRSA9ICdzd2luZyc7XG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIFNjcm9sbFRvVG9wIGV4dGVuZHMgQ29tcG9uZW50IHtcbiAgICB0cmlnZ2VyOiBIVE1MRWxlbWVudDtcblxuICAgIHByb3RlY3RlZCByZWFkeUNhbGxiYWNrKCk6IHZvaWQge31cblxuICAgIHByb3RlY3RlZCBpbml0KCk6IHZvaWQge1xuICAgICAgICB0aGlzLnRyaWdnZXIgPSA8SFRNTEVsZW1lbnQ+dGhpcy5nZXRFbGVtZW50c0J5Q2xhc3NOYW1lKGAke3RoaXMuanNOYW1lfV9fdHJpZ2dlcmApWzBdO1xuXG4gICAgICAgIHRoaXMubWFwRXZlbnRzKCk7XG4gICAgfVxuXG4gICAgcHJvdGVjdGVkIG1hcEV2ZW50cygpOiB2b2lkIHtcbiAgICAgICAgdGhpcy50cmlnZ2VyLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgKCkgPT4gdGhpcy5zY3JvbGxUb1RvcCgpKTtcbiAgICB9XG5cbiAgICBzY3JvbGxUb1RvcCgpOiB2b2lkIHtcbiAgICAgICAgY29uc3QgJGJvZHkgPSAkKCdodG1sLCBib2R5Jyk7XG4gICAgICAgICRib2R5LnN0b3AoKS5hbmltYXRlKHtzY3JvbGxUb3A6MH0sIEFOSU1BVElPTl9TUEVFRCwgQU5JTUFUSU9OX1RZUEUpO1xuICAgIH1cbn1cbiJdLCJzb3VyY2VSb290IjoiIn0=