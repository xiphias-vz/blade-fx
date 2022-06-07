(window["webpackJsonp_yves_default"] = window["webpackJsonp_yves_default"] || []).push([["cart-counter"],{

/***/ "./vendor/spryker-shop/shop-ui/src/SprykerShop/Yves/ShopUi/Theme/default/components/molecules/cart-counter/cart-counter.ts":
/*!*********************************************************************************************************************************!*\
  !*** ./vendor/spryker-shop/shop-ui/src/SprykerShop/Yves/ShopUi/Theme/default/components/molecules/cart-counter/cart-counter.ts ***!
  \*********************************************************************************************************************************/
/*! exports provided: EVENT_UPDATE_CART_QUANTITY, default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "EVENT_UPDATE_CART_QUANTITY", function() { return EVENT_UPDATE_CART_QUANTITY; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return CartCounter; });
/* harmony import */ var _babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @babel/runtime/helpers/createClass */ "./node_modules/@babel/runtime/helpers/createClass.js");
/* harmony import */ var _babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _babel_runtime_helpers_assertThisInitialized__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @babel/runtime/helpers/assertThisInitialized */ "./node_modules/@babel/runtime/helpers/assertThisInitialized.js");
/* harmony import */ var _babel_runtime_helpers_assertThisInitialized__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_assertThisInitialized__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _babel_runtime_helpers_possibleConstructorReturn__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @babel/runtime/helpers/possibleConstructorReturn */ "./node_modules/@babel/runtime/helpers/possibleConstructorReturn.js");
/* harmony import */ var _babel_runtime_helpers_possibleConstructorReturn__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_possibleConstructorReturn__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _babel_runtime_helpers_getPrototypeOf__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @babel/runtime/helpers/getPrototypeOf */ "./node_modules/@babel/runtime/helpers/getPrototypeOf.js");
/* harmony import */ var _babel_runtime_helpers_getPrototypeOf__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_getPrototypeOf__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _babel_runtime_helpers_inheritsLoose__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @babel/runtime/helpers/inheritsLoose */ "./node_modules/@babel/runtime/helpers/inheritsLoose.js");
/* harmony import */ var _babel_runtime_helpers_inheritsLoose__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_inheritsLoose__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @babel/runtime/helpers/defineProperty */ "./node_modules/@babel/runtime/helpers/defineProperty.js");
/* harmony import */ var _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_5__);
/* harmony import */ var _models_component__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../../../models/component */ "./vendor/spryker-shop/shop-ui/src/SprykerShop/Yves/ShopUi/Theme/default/models/component.ts");







function _createSuper(Derived) { return function () { var Super = _babel_runtime_helpers_getPrototypeOf__WEBPACK_IMPORTED_MODULE_3___default()(Derived), result; if (_isNativeReflectConstruct()) { var NewTarget = _babel_runtime_helpers_getPrototypeOf__WEBPACK_IMPORTED_MODULE_3___default()(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _babel_runtime_helpers_possibleConstructorReturn__WEBPACK_IMPORTED_MODULE_2___default()(this, result); }; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Date.prototype.toString.call(Reflect.construct(Date, [], function () {})); return true; } catch (e) { return false; } }



/**
 * @event updateCartQuantity An event emitted when need to update cart quantity.
 */
var EVENT_UPDATE_CART_QUANTITY = 'updateCartQuantity';

var CartCounter = /*#__PURE__*/function (_Component) {
  _babel_runtime_helpers_inheritsLoose__WEBPACK_IMPORTED_MODULE_4___default()(CartCounter, _Component);

  var _super = _createSuper(CartCounter);

  function CartCounter() {
    var _this;

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this = _Component.call.apply(_Component, [this].concat(args)) || this;

    _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_5___default()(_babel_runtime_helpers_assertThisInitialized__WEBPACK_IMPORTED_MODULE_1___default()(_this), "quantity", void 0);

    return _this;
  }

  var _proto = CartCounter.prototype;

  _proto.readyCallback = function readyCallback() {};

  _proto.init = function init() {
    this.quantity = this.getElementsByClassName(this.jsName + "__quantity")[0];
    this.mapEvents();
  };

  _proto.mapEvents = function mapEvents() {
    this.mapTriggerCustomUpdateQuantityEvent();
  };

  _proto.mapTriggerCustomUpdateQuantityEvent = function mapTriggerCustomUpdateQuantityEvent() {
    var _this2 = this;

    document.addEventListener(EVENT_UPDATE_CART_QUANTITY, function (event) {
      return _this2.updateQuantity(Number(event.detail));
    });
  };

  _proto.updateQuantity = function updateQuantity(quantity) {
    if (!quantity) {
      return;
    }

    this.quantity.textContent = String(quantity);
    this.quantity.classList.toggle(this.hiddenQuantityClassName, !quantity);
  };

  _babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_0___default()(CartCounter, [{
    key: "hiddenQuantityClassName",
    get: function get() {
      return this.getAttribute('hidden-quantity-class-name');
    }
  }]);

  return CartCounter;
}(_models_component__WEBPACK_IMPORTED_MODULE_6__["default"]);



/***/ })

}]);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vLi92ZW5kb3Ivc3ByeWtlci1zaG9wL3Nob3AtdWkvc3JjL1NwcnlrZXJTaG9wL1l2ZXMvU2hvcFVpL1RoZW1lL2RlZmF1bHQvY29tcG9uZW50cy9tb2xlY3VsZXMvY2FydC1jb3VudGVyL2NhcnQtY291bnRlci50cyJdLCJuYW1lcyI6WyJFVkVOVF9VUERBVEVfQ0FSVF9RVUFOVElUWSIsIkNhcnRDb3VudGVyIiwicmVhZHlDYWxsYmFjayIsImluaXQiLCJxdWFudGl0eSIsImdldEVsZW1lbnRzQnlDbGFzc05hbWUiLCJqc05hbWUiLCJtYXBFdmVudHMiLCJtYXBUcmlnZ2VyQ3VzdG9tVXBkYXRlUXVhbnRpdHlFdmVudCIsImRvY3VtZW50IiwiYWRkRXZlbnRMaXN0ZW5lciIsImV2ZW50IiwidXBkYXRlUXVhbnRpdHkiLCJOdW1iZXIiLCJkZXRhaWwiLCJ0ZXh0Q29udGVudCIsIlN0cmluZyIsImNsYXNzTGlzdCIsInRvZ2dsZSIsImhpZGRlblF1YW50aXR5Q2xhc3NOYW1lIiwiZ2V0QXR0cmlidXRlIiwiQ29tcG9uZW50Il0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUE7O0FBR0E7OztBQUdPLElBQU1BLDBCQUEwQixHQUFHLG9CQUFuQzs7SUFFY0MsVzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O1NBR1BDLGEsR0FBVix5QkFBZ0MsQ0FBRSxDOztTQUV4QkMsSSxHQUFWLGdCQUF1QjtBQUNuQixTQUFLQyxRQUFMLEdBQTZCLEtBQUtDLHNCQUFMLENBQStCLEtBQUtDLE1BQXBDLGlCQUF3RCxDQUF4RCxDQUE3QjtBQUNBLFNBQUtDLFNBQUw7QUFDSCxHOztTQUVTQSxTLEdBQVYscUJBQTRCO0FBQ3hCLFNBQUtDLG1DQUFMO0FBQ0gsRzs7U0FFU0EsbUMsR0FBViwrQ0FBc0Q7QUFBQTs7QUFDbERDLFlBQVEsQ0FBQ0MsZ0JBQVQsQ0FBMEJWLDBCQUExQixFQUFzRCxVQUFDVyxLQUFEO0FBQUEsYUFDbEQsTUFBSSxDQUFDQyxjQUFMLENBQW9CQyxNQUFNLENBQUNGLEtBQUssQ0FBQ0csTUFBUCxDQUExQixDQURrRDtBQUFBLEtBQXREO0FBR0gsRzs7U0FFU0YsYyxHQUFWLHdCQUF5QlIsUUFBekIsRUFBaUQ7QUFDN0MsUUFBSSxDQUFDQSxRQUFMLEVBQWU7QUFDWDtBQUNIOztBQUNELFNBQUtBLFFBQUwsQ0FBY1csV0FBZCxHQUE0QkMsTUFBTSxDQUFDWixRQUFELENBQWxDO0FBQ0EsU0FBS0EsUUFBTCxDQUFjYSxTQUFkLENBQXdCQyxNQUF4QixDQUErQixLQUFLQyx1QkFBcEMsRUFBNkQsQ0FBQ2YsUUFBOUQ7QUFDSCxHOzs7O3dCQUUrQztBQUM1QyxhQUFPLEtBQUtnQixZQUFMLENBQWtCLDRCQUFsQixDQUFQO0FBQ0g7Ozs7RUE5Qm9DQyx5RCIsImZpbGUiOiIuL2pzL3l2ZXNfZGVmYXVsdC5jYXJ0LWNvdW50ZXIubGVnYWN5LmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IENvbXBvbmVudCBmcm9tICcuLi8uLi8uLi9tb2RlbHMvY29tcG9uZW50JztcbmltcG9ydCB7IEVWRU5UX1VQREFURV9EWU5BTUlDX01FU1NBR0VTIH0gZnJvbSAnU2hvcFVpL2NvbXBvbmVudHMvb3JnYW5pc21zL2R5bmFtaWMtbm90aWZpY2F0aW9uLWFyZWEvZHluYW1pYy1ub3RpZmljYXRpb24tYXJlYSc7XG5cbi8qKlxuICogQGV2ZW50IHVwZGF0ZUNhcnRRdWFudGl0eSBBbiBldmVudCBlbWl0dGVkIHdoZW4gbmVlZCB0byB1cGRhdGUgY2FydCBxdWFudGl0eS5cbiAqL1xuZXhwb3J0IGNvbnN0IEVWRU5UX1VQREFURV9DQVJUX1FVQU5USVRZID0gJ3VwZGF0ZUNhcnRRdWFudGl0eSc7XG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIENhcnRDb3VudGVyIGV4dGVuZHMgQ29tcG9uZW50IHtcbiAgICBwcm90ZWN0ZWQgcXVhbnRpdHk6IEhUTUxFbGVtZW50O1xuXG4gICAgcHJvdGVjdGVkIHJlYWR5Q2FsbGJhY2soKTogdm9pZCB7fVxuXG4gICAgcHJvdGVjdGVkIGluaXQoKTogdm9pZCB7XG4gICAgICAgIHRoaXMucXVhbnRpdHkgPSA8SFRNTEVsZW1lbnQ+dGhpcy5nZXRFbGVtZW50c0J5Q2xhc3NOYW1lKGAke3RoaXMuanNOYW1lfV9fcXVhbnRpdHlgKVswXTtcbiAgICAgICAgdGhpcy5tYXBFdmVudHMoKTtcbiAgICB9XG5cbiAgICBwcm90ZWN0ZWQgbWFwRXZlbnRzKCk6IHZvaWQge1xuICAgICAgICB0aGlzLm1hcFRyaWdnZXJDdXN0b21VcGRhdGVRdWFudGl0eUV2ZW50KCk7XG4gICAgfVxuXG4gICAgcHJvdGVjdGVkIG1hcFRyaWdnZXJDdXN0b21VcGRhdGVRdWFudGl0eUV2ZW50KCk6IHZvaWQge1xuICAgICAgICBkb2N1bWVudC5hZGRFdmVudExpc3RlbmVyKEVWRU5UX1VQREFURV9DQVJUX1FVQU5USVRZLCAoZXZlbnQ6IEN1c3RvbUV2ZW50KSA9PlxuICAgICAgICAgICAgdGhpcy51cGRhdGVRdWFudGl0eShOdW1iZXIoZXZlbnQuZGV0YWlsKSksXG4gICAgICAgICk7XG4gICAgfVxuXG4gICAgcHJvdGVjdGVkIHVwZGF0ZVF1YW50aXR5KHF1YW50aXR5OiBudW1iZXIpOiB2b2lkIHtcbiAgICAgICAgaWYgKCFxdWFudGl0eSkge1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG4gICAgICAgIHRoaXMucXVhbnRpdHkudGV4dENvbnRlbnQgPSBTdHJpbmcocXVhbnRpdHkpO1xuICAgICAgICB0aGlzLnF1YW50aXR5LmNsYXNzTGlzdC50b2dnbGUodGhpcy5oaWRkZW5RdWFudGl0eUNsYXNzTmFtZSwgIXF1YW50aXR5KTtcbiAgICB9XG5cbiAgICBwcm90ZWN0ZWQgZ2V0IGhpZGRlblF1YW50aXR5Q2xhc3NOYW1lKCk6IHN0cmluZyB7XG4gICAgICAgIHJldHVybiB0aGlzLmdldEF0dHJpYnV0ZSgnaGlkZGVuLXF1YW50aXR5LWNsYXNzLW5hbWUnKTtcbiAgICB9XG59XG4iXSwic291cmNlUm9vdCI6IiJ9