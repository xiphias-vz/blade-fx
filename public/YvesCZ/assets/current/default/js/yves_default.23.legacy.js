(window["webpackJsonp_yves_default"] = window["webpackJsonp_yves_default"] || []).push([[23],{

/***/ "./src/Pyz/Yves/ShopUi/Theme/default/components/molecules/content-renderer/content-renderer.ts":
/*!*****************************************************************************************************!*\
  !*** ./src/Pyz/Yves/ShopUi/Theme/default/components/molecules/content-renderer/content-renderer.ts ***!
  \*****************************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return ContentRenderer; });
/* harmony import */ var _babel_runtime_helpers_possibleConstructorReturn__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @babel/runtime/helpers/possibleConstructorReturn */ "./node_modules/@babel/runtime/helpers/possibleConstructorReturn.js");
/* harmony import */ var _babel_runtime_helpers_possibleConstructorReturn__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_possibleConstructorReturn__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _babel_runtime_helpers_getPrototypeOf__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @babel/runtime/helpers/getPrototypeOf */ "./node_modules/@babel/runtime/helpers/getPrototypeOf.js");
/* harmony import */ var _babel_runtime_helpers_getPrototypeOf__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_getPrototypeOf__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _babel_runtime_helpers_inheritsLoose__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @babel/runtime/helpers/inheritsLoose */ "./node_modules/@babel/runtime/helpers/inheritsLoose.js");
/* harmony import */ var _babel_runtime_helpers_inheritsLoose__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_inheritsLoose__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var ShopUi_models_component__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ShopUi/models/component */ "./vendor/spryker-shop/shop-ui/src/SprykerShop/Yves/ShopUi/Theme/default/models/component.ts");




function _createSuper(Derived) { return function () { var Super = _babel_runtime_helpers_getPrototypeOf__WEBPACK_IMPORTED_MODULE_1___default()(Derived), result; if (_isNativeReflectConstruct()) { var NewTarget = _babel_runtime_helpers_getPrototypeOf__WEBPACK_IMPORTED_MODULE_1___default()(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _babel_runtime_helpers_possibleConstructorReturn__WEBPACK_IMPORTED_MODULE_0___default()(this, result); }; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Date.prototype.toString.call(Reflect.construct(Date, [], function () {})); return true; } catch (e) { return false; } }



var ContentRenderer = /*#__PURE__*/function (_Component) {
  _babel_runtime_helpers_inheritsLoose__WEBPACK_IMPORTED_MODULE_2___default()(ContentRenderer, _Component);

  var _super = _createSuper(ContentRenderer);

  function ContentRenderer() {
    return _Component.apply(this, arguments) || this;
  }

  var _proto = ContentRenderer.prototype;

  _proto.readyCallback = function readyCallback() {
    this.load();
  };

  _proto.load = function load() {
    var _this = this;

    window.addEventListener('load', function () {
      _this.parentElement.classList.remove('hide');
    });
  };

  return ContentRenderer;
}(ShopUi_models_component__WEBPACK_IMPORTED_MODULE_3__["default"]);



/***/ })

}]);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vLi9zcmMvUHl6L1l2ZXMvU2hvcFVpL1RoZW1lL2RlZmF1bHQvY29tcG9uZW50cy9tb2xlY3VsZXMvY29udGVudC1yZW5kZXJlci9jb250ZW50LXJlbmRlcmVyLnRzIl0sIm5hbWVzIjpbIkNvbnRlbnRSZW5kZXJlciIsInJlYWR5Q2FsbGJhY2siLCJsb2FkIiwid2luZG93IiwiYWRkRXZlbnRMaXN0ZW5lciIsInBhcmVudEVsZW1lbnQiLCJjbGFzc0xpc3QiLCJyZW1vdmUiLCJDb21wb25lbnQiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUFBOztJQUdxQkEsZTs7Ozs7Ozs7Ozs7U0FFUEMsYSxHQUFWLHlCQUFnQztBQUM1QixTQUFLQyxJQUFMO0FBQ0gsRzs7U0FFU0EsSSxHQUFWLGdCQUFpQjtBQUFBOztBQUNiQyxVQUFNLENBQUNDLGdCQUFQLENBQXdCLE1BQXhCLEVBQWdDLFlBQU07QUFDbEMsV0FBSSxDQUFDQyxhQUFMLENBQW1CQyxTQUFuQixDQUE2QkMsTUFBN0IsQ0FBb0MsTUFBcEM7QUFDSCxLQUZEO0FBR0gsRzs7O0VBVndDQywrRCIsImZpbGUiOiIuL2pzL3l2ZXNfZGVmYXVsdC4yMy5sZWdhY3kuanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgQ29tcG9uZW50IGZyb20gJ1Nob3BVaS9tb2RlbHMvY29tcG9uZW50JztcblxuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBDb250ZW50UmVuZGVyZXIgZXh0ZW5kcyBDb21wb25lbnQge1xuXG4gICAgcHJvdGVjdGVkIHJlYWR5Q2FsbGJhY2soKTogdm9pZCB7XG4gICAgICAgIHRoaXMubG9hZCgpO1xuICAgIH1cblxuICAgIHByb3RlY3RlZCBsb2FkKCkge1xuICAgICAgICB3aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcignbG9hZCcsICgpID0+IHtcbiAgICAgICAgICAgIHRoaXMucGFyZW50RWxlbWVudC5jbGFzc0xpc3QucmVtb3ZlKCdoaWRlJyk7XG4gICAgICAgIH0pXG4gICAgfVxufVxuIl0sInNvdXJjZVJvb3QiOiIifQ==