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
/* harmony import */ var _babel_runtime_helpers_assertThisInitialized__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @babel/runtime/helpers/assertThisInitialized */ "./node_modules/@babel/runtime/helpers/assertThisInitialized.js");
/* harmony import */ var _babel_runtime_helpers_assertThisInitialized__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_assertThisInitialized__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _babel_runtime_helpers_possibleConstructorReturn__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @babel/runtime/helpers/possibleConstructorReturn */ "./node_modules/@babel/runtime/helpers/possibleConstructorReturn.js");
/* harmony import */ var _babel_runtime_helpers_possibleConstructorReturn__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_possibleConstructorReturn__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _babel_runtime_helpers_getPrototypeOf__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @babel/runtime/helpers/getPrototypeOf */ "./node_modules/@babel/runtime/helpers/getPrototypeOf.js");
/* harmony import */ var _babel_runtime_helpers_getPrototypeOf__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_getPrototypeOf__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _babel_runtime_helpers_inheritsLoose__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @babel/runtime/helpers/inheritsLoose */ "./node_modules/@babel/runtime/helpers/inheritsLoose.js");
/* harmony import */ var _babel_runtime_helpers_inheritsLoose__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_inheritsLoose__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @babel/runtime/helpers/defineProperty */ "./node_modules/@babel/runtime/helpers/defineProperty.js");
/* harmony import */ var _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var ShopUi_models_component__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ShopUi/models/component */ "./vendor/spryker-shop/shop-ui/src/SprykerShop/Yves/ShopUi/Theme/default/models/component.ts");
/* harmony import */ var jquery_dist_jquery__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! jquery/dist/jquery */ "./node_modules/jquery/dist/jquery.js");
/* harmony import */ var jquery_dist_jquery__WEBPACK_IMPORTED_MODULE_6___default = /*#__PURE__*/__webpack_require__.n(jquery_dist_jquery__WEBPACK_IMPORTED_MODULE_6__);






function _createSuper(Derived) { return function () { var Super = _babel_runtime_helpers_getPrototypeOf__WEBPACK_IMPORTED_MODULE_2___default()(Derived), result; if (_isNativeReflectConstruct()) { var NewTarget = _babel_runtime_helpers_getPrototypeOf__WEBPACK_IMPORTED_MODULE_2___default()(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _babel_runtime_helpers_possibleConstructorReturn__WEBPACK_IMPORTED_MODULE_1___default()(this, result); }; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Date.prototype.toString.call(Reflect.construct(Date, [], function () {})); return true; } catch (e) { return false; } }



var ANIMATION_SPEED = 500;
var ANIMATION_TYPE = 'swing';

var ScrollToTop = /*#__PURE__*/function (_Component) {
  _babel_runtime_helpers_inheritsLoose__WEBPACK_IMPORTED_MODULE_3___default()(ScrollToTop, _Component);

  var _super = _createSuper(ScrollToTop);

  function ScrollToTop() {
    var _this;

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this = _Component.call.apply(_Component, [this].concat(args)) || this;

    _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_4___default()(_babel_runtime_helpers_assertThisInitialized__WEBPACK_IMPORTED_MODULE_0___default()(_this), "trigger", void 0);

    return _this;
  }

  var _proto = ScrollToTop.prototype;

  _proto.readyCallback = function readyCallback() {};

  _proto.init = function init() {
    this.trigger = this.getElementsByClassName(this.jsName + "__trigger")[0];
    this.mapEvents();
  };

  _proto.mapEvents = function mapEvents() {
    var _this2 = this;

    this.trigger.addEventListener('click', function () {
      return _this2.scrollToTop();
    });
  };

  _proto.scrollToTop = function scrollToTop() {
    var $body = jquery_dist_jquery__WEBPACK_IMPORTED_MODULE_6___default()('html, body');
    $body.stop().animate({
      scrollTop: 0
    }, ANIMATION_SPEED, ANIMATION_TYPE);
  };

  return ScrollToTop;
}(ShopUi_models_component__WEBPACK_IMPORTED_MODULE_5__["default"]);



/***/ })

}]);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vLi9zcmMvUHl6L1l2ZXMvU2hvcFVpL1RoZW1lL2RlZmF1bHQvY29tcG9uZW50cy9tb2xlY3VsZXMvc2Nyb2xsLXRvLXRvcC9zY3JvbGwtdG8tdG9wLnRzIl0sIm5hbWVzIjpbIkFOSU1BVElPTl9TUEVFRCIsIkFOSU1BVElPTl9UWVBFIiwiU2Nyb2xsVG9Ub3AiLCJyZWFkeUNhbGxiYWNrIiwiaW5pdCIsInRyaWdnZXIiLCJnZXRFbGVtZW50c0J5Q2xhc3NOYW1lIiwianNOYW1lIiwibWFwRXZlbnRzIiwiYWRkRXZlbnRMaXN0ZW5lciIsInNjcm9sbFRvVG9wIiwiJGJvZHkiLCIkIiwic3RvcCIsImFuaW1hdGUiLCJzY3JvbGxUb3AiLCJDb21wb25lbnQiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUE7QUFDQTtBQUVBLElBQU1BLGVBQWUsR0FBRyxHQUF4QjtBQUNBLElBQU1DLGNBQWMsR0FBRyxPQUF2Qjs7SUFFcUJDLFc7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztTQUdQQyxhLEdBQVYseUJBQWdDLENBQUUsQzs7U0FFeEJDLEksR0FBVixnQkFBdUI7QUFDbkIsU0FBS0MsT0FBTCxHQUE0QixLQUFLQyxzQkFBTCxDQUErQixLQUFLQyxNQUFwQyxnQkFBdUQsQ0FBdkQsQ0FBNUI7QUFFQSxTQUFLQyxTQUFMO0FBQ0gsRzs7U0FFU0EsUyxHQUFWLHFCQUE0QjtBQUFBOztBQUN4QixTQUFLSCxPQUFMLENBQWFJLGdCQUFiLENBQThCLE9BQTlCLEVBQXVDO0FBQUEsYUFBTSxNQUFJLENBQUNDLFdBQUwsRUFBTjtBQUFBLEtBQXZDO0FBQ0gsRzs7U0FFREEsVyxHQUFBLHVCQUFvQjtBQUNoQixRQUFNQyxLQUFLLEdBQUdDLHlEQUFDLENBQUMsWUFBRCxDQUFmO0FBQ0FELFNBQUssQ0FBQ0UsSUFBTixHQUFhQyxPQUFiLENBQXFCO0FBQUNDLGVBQVMsRUFBQztBQUFYLEtBQXJCLEVBQW9DZixlQUFwQyxFQUFxREMsY0FBckQ7QUFDSCxHOzs7RUFsQm9DZSwrRCIsImZpbGUiOiIuL2pzL3l2ZXNfZGVmYXVsdC40My5sZWdhY3kuanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgQ29tcG9uZW50IGZyb20gJ1Nob3BVaS9tb2RlbHMvY29tcG9uZW50JztcbmltcG9ydCAkIGZyb20gJ2pxdWVyeS9kaXN0L2pxdWVyeSc7XG5cbmNvbnN0IEFOSU1BVElPTl9TUEVFRCA9IDUwMDtcbmNvbnN0IEFOSU1BVElPTl9UWVBFID0gJ3N3aW5nJztcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgU2Nyb2xsVG9Ub3AgZXh0ZW5kcyBDb21wb25lbnQge1xuICAgIHRyaWdnZXI6IEhUTUxFbGVtZW50O1xuXG4gICAgcHJvdGVjdGVkIHJlYWR5Q2FsbGJhY2soKTogdm9pZCB7fVxuXG4gICAgcHJvdGVjdGVkIGluaXQoKTogdm9pZCB7XG4gICAgICAgIHRoaXMudHJpZ2dlciA9IDxIVE1MRWxlbWVudD50aGlzLmdldEVsZW1lbnRzQnlDbGFzc05hbWUoYCR7dGhpcy5qc05hbWV9X190cmlnZ2VyYClbMF07XG5cbiAgICAgICAgdGhpcy5tYXBFdmVudHMoKTtcbiAgICB9XG5cbiAgICBwcm90ZWN0ZWQgbWFwRXZlbnRzKCk6IHZvaWQge1xuICAgICAgICB0aGlzLnRyaWdnZXIuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCAoKSA9PiB0aGlzLnNjcm9sbFRvVG9wKCkpO1xuICAgIH1cblxuICAgIHNjcm9sbFRvVG9wKCk6IHZvaWQge1xuICAgICAgICBjb25zdCAkYm9keSA9ICQoJ2h0bWwsIGJvZHknKTtcbiAgICAgICAgJGJvZHkuc3RvcCgpLmFuaW1hdGUoe3Njcm9sbFRvcDowfSwgQU5JTUFUSU9OX1NQRUVELCBBTklNQVRJT05fVFlQRSk7XG4gICAgfVxufVxuIl0sInNvdXJjZVJvb3QiOiIifQ==