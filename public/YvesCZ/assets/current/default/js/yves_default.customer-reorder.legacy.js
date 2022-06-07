(window["webpackJsonp_yves_default"] = window["webpackJsonp_yves_default"] || []).push([["customer-reorder"],{

/***/ "./vendor/spryker-shop/customer-reorder-widget/src/SprykerShop/Yves/CustomerReorderWidget/Theme/default/views/customer-reorder/customer-reorder.ts":
/*!*********************************************************************************************************************************************************!*\
  !*** ./vendor/spryker-shop/customer-reorder-widget/src/SprykerShop/Yves/CustomerReorderWidget/Theme/default/views/customer-reorder/customer-reorder.ts ***!
  \*********************************************************************************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return CustomerReorder; });
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






function _createSuper(Derived) { return function () { var Super = _babel_runtime_helpers_getPrototypeOf__WEBPACK_IMPORTED_MODULE_2___default()(Derived), result; if (_isNativeReflectConstruct()) { var NewTarget = _babel_runtime_helpers_getPrototypeOf__WEBPACK_IMPORTED_MODULE_2___default()(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _babel_runtime_helpers_possibleConstructorReturn__WEBPACK_IMPORTED_MODULE_1___default()(this, result); }; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Date.prototype.toString.call(Reflect.construct(Date, [], function () {})); return true; } catch (e) { return false; } }



var CustomerReorder = /*#__PURE__*/function (_Component) {
  _babel_runtime_helpers_inheritsLoose__WEBPACK_IMPORTED_MODULE_3___default()(CustomerReorder, _Component);

  var _super = _createSuper(CustomerReorder);

  /**
   * Elements enabling/disabling the trigger.
   */

  /**
   * Element enabled/disabled by selections changes.
   */
  function CustomerReorder() {
    var _this;

    _this = _Component.call(this) || this;

    _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_4___default()(_babel_runtime_helpers_assertThisInitialized__WEBPACK_IMPORTED_MODULE_0___default()(_this), "selections", void 0);

    _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_4___default()(_babel_runtime_helpers_assertThisInitialized__WEBPACK_IMPORTED_MODULE_0___default()(_this), "trigger", void 0);

    _this.selections = Array.from(_this.getElementsByClassName(_this.jsName + "__selection"));
    _this.trigger = _this.getElementsByClassName(_this.jsName + "__trigger")[0];
    return _this;
  }

  var _proto = CustomerReorder.prototype;

  _proto.readyCallback = function readyCallback() {
    this.mapEvents();
  };

  _proto.mapEvents = function mapEvents() {
    var _this2 = this;

    this.selections.forEach(function (selection) {
      return selection.addEventListener('change', function (event) {
        return _this2.onSelectionChange(event);
      });
    });
  };

  _proto.onSelectionChange = function onSelectionChange(event) {
    var isEnabled = this.selections.some(function (selection) {
      return selection.checked;
    });
    this.enableTrigger(isEnabled);
  }
  /**
   * Sets or removes the disabled attribute from the trigger element.
   * @param enable A boolean value for checking if the trigger is available for changing.
   */
  ;

  _proto.enableTrigger = function enableTrigger(isEnabled) {
    if (isEnabled) {
      this.trigger.removeAttribute('disabled');
      return;
    }

    this.trigger.setAttribute('disabled', 'disabled');
  };

  return CustomerReorder;
}(ShopUi_models_component__WEBPACK_IMPORTED_MODULE_5__["default"]);



/***/ })

}]);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vLi92ZW5kb3Ivc3ByeWtlci1zaG9wL2N1c3RvbWVyLXJlb3JkZXItd2lkZ2V0L3NyYy9TcHJ5a2VyU2hvcC9ZdmVzL0N1c3RvbWVyUmVvcmRlcldpZGdldC9UaGVtZS9kZWZhdWx0L3ZpZXdzL2N1c3RvbWVyLXJlb3JkZXIvY3VzdG9tZXItcmVvcmRlci50cyJdLCJuYW1lcyI6WyJDdXN0b21lclJlb3JkZXIiLCJzZWxlY3Rpb25zIiwiQXJyYXkiLCJmcm9tIiwiZ2V0RWxlbWVudHNCeUNsYXNzTmFtZSIsImpzTmFtZSIsInRyaWdnZXIiLCJyZWFkeUNhbGxiYWNrIiwibWFwRXZlbnRzIiwiZm9yRWFjaCIsInNlbGVjdGlvbiIsImFkZEV2ZW50TGlzdGVuZXIiLCJldmVudCIsIm9uU2VsZWN0aW9uQ2hhbmdlIiwiaXNFbmFibGVkIiwic29tZSIsImNoZWNrZWQiLCJlbmFibGVUcmlnZ2VyIiwicmVtb3ZlQXR0cmlidXRlIiwic2V0QXR0cmlidXRlIiwiQ29tcG9uZW50Il0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQTs7SUFFcUJBLGU7Ozs7O0FBQ2pCOzs7O0FBS0E7OztBQUtBLDZCQUFjO0FBQUE7O0FBQ1Y7O0FBRFU7O0FBQUE7O0FBRVYsVUFBS0MsVUFBTCxHQUFzQ0MsS0FBSyxDQUFDQyxJQUFOLENBQVcsTUFBS0Msc0JBQUwsQ0FBK0IsTUFBS0MsTUFBcEMsaUJBQVgsQ0FBdEM7QUFDQSxVQUFLQyxPQUFMLEdBQTRCLE1BQUtGLHNCQUFMLENBQStCLE1BQUtDLE1BQXBDLGdCQUF1RCxDQUF2RCxDQUE1QjtBQUhVO0FBSWI7Ozs7U0FFU0UsYSxHQUFWLHlCQUFnQztBQUM1QixTQUFLQyxTQUFMO0FBQ0gsRzs7U0FFU0EsUyxHQUFWLHFCQUE0QjtBQUFBOztBQUN4QixTQUFLUCxVQUFMLENBQWdCUSxPQUFoQixDQUF3QixVQUFDQyxTQUFEO0FBQUEsYUFDcEJBLFNBQVMsQ0FBQ0MsZ0JBQVYsQ0FBMkIsUUFBM0IsRUFBcUMsVUFBQ0MsS0FBRDtBQUFBLGVBQWtCLE1BQUksQ0FBQ0MsaUJBQUwsQ0FBdUJELEtBQXZCLENBQWxCO0FBQUEsT0FBckMsQ0FEb0I7QUFBQSxLQUF4QjtBQUdILEc7O1NBRVNDLGlCLEdBQVYsMkJBQTRCRCxLQUE1QixFQUFnRDtBQUM1QyxRQUFNRSxTQUFTLEdBQUcsS0FBS2IsVUFBTCxDQUFnQmMsSUFBaEIsQ0FBcUIsVUFBQ0wsU0FBRDtBQUFBLGFBQWlDQSxTQUFTLENBQUNNLE9BQTNDO0FBQUEsS0FBckIsQ0FBbEI7QUFDQSxTQUFLQyxhQUFMLENBQW1CSCxTQUFuQjtBQUNIO0FBRUQ7Ozs7OztTQUlBRyxhLEdBQUEsdUJBQWNILFNBQWQsRUFBd0M7QUFDcEMsUUFBSUEsU0FBSixFQUFlO0FBQ1gsV0FBS1IsT0FBTCxDQUFhWSxlQUFiLENBQTZCLFVBQTdCO0FBRUE7QUFDSDs7QUFFRCxTQUFLWixPQUFMLENBQWFhLFlBQWIsQ0FBMEIsVUFBMUIsRUFBc0MsVUFBdEM7QUFDSCxHOzs7RUE1Q3dDQywrRCIsImZpbGUiOiIuL2pzL3l2ZXNfZGVmYXVsdC5jdXN0b21lci1yZW9yZGVyLmxlZ2FjeS5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBDb21wb25lbnQgZnJvbSAnU2hvcFVpL21vZGVscy9jb21wb25lbnQnO1xuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBDdXN0b21lclJlb3JkZXIgZXh0ZW5kcyBDb21wb25lbnQge1xuICAgIC8qKlxuICAgICAqIEVsZW1lbnRzIGVuYWJsaW5nL2Rpc2FibGluZyB0aGUgdHJpZ2dlci5cbiAgICAgKi9cbiAgICByZWFkb25seSBzZWxlY3Rpb25zOiBIVE1MSW5wdXRFbGVtZW50W107XG5cbiAgICAvKipcbiAgICAgKiBFbGVtZW50IGVuYWJsZWQvZGlzYWJsZWQgYnkgc2VsZWN0aW9ucyBjaGFuZ2VzLlxuICAgICAqL1xuICAgIHJlYWRvbmx5IHRyaWdnZXI6IEhUTUxFbGVtZW50O1xuXG4gICAgY29uc3RydWN0b3IoKSB7XG4gICAgICAgIHN1cGVyKCk7XG4gICAgICAgIHRoaXMuc2VsZWN0aW9ucyA9IDxIVE1MSW5wdXRFbGVtZW50W10+QXJyYXkuZnJvbSh0aGlzLmdldEVsZW1lbnRzQnlDbGFzc05hbWUoYCR7dGhpcy5qc05hbWV9X19zZWxlY3Rpb25gKSk7XG4gICAgICAgIHRoaXMudHJpZ2dlciA9IDxIVE1MRWxlbWVudD50aGlzLmdldEVsZW1lbnRzQnlDbGFzc05hbWUoYCR7dGhpcy5qc05hbWV9X190cmlnZ2VyYClbMF07XG4gICAgfVxuXG4gICAgcHJvdGVjdGVkIHJlYWR5Q2FsbGJhY2soKTogdm9pZCB7XG4gICAgICAgIHRoaXMubWFwRXZlbnRzKCk7XG4gICAgfVxuXG4gICAgcHJvdGVjdGVkIG1hcEV2ZW50cygpOiB2b2lkIHtcbiAgICAgICAgdGhpcy5zZWxlY3Rpb25zLmZvckVhY2goKHNlbGVjdGlvbjogSFRNTElucHV0RWxlbWVudCkgPT5cbiAgICAgICAgICAgIHNlbGVjdGlvbi5hZGRFdmVudExpc3RlbmVyKCdjaGFuZ2UnLCAoZXZlbnQ6IEV2ZW50KSA9PiB0aGlzLm9uU2VsZWN0aW9uQ2hhbmdlKGV2ZW50KSksXG4gICAgICAgICk7XG4gICAgfVxuXG4gICAgcHJvdGVjdGVkIG9uU2VsZWN0aW9uQ2hhbmdlKGV2ZW50OiBFdmVudCk6IHZvaWQge1xuICAgICAgICBjb25zdCBpc0VuYWJsZWQgPSB0aGlzLnNlbGVjdGlvbnMuc29tZSgoc2VsZWN0aW9uOiBIVE1MSW5wdXRFbGVtZW50KSA9PiBzZWxlY3Rpb24uY2hlY2tlZCk7XG4gICAgICAgIHRoaXMuZW5hYmxlVHJpZ2dlcihpc0VuYWJsZWQpO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIFNldHMgb3IgcmVtb3ZlcyB0aGUgZGlzYWJsZWQgYXR0cmlidXRlIGZyb20gdGhlIHRyaWdnZXIgZWxlbWVudC5cbiAgICAgKiBAcGFyYW0gZW5hYmxlIEEgYm9vbGVhbiB2YWx1ZSBmb3IgY2hlY2tpbmcgaWYgdGhlIHRyaWdnZXIgaXMgYXZhaWxhYmxlIGZvciBjaGFuZ2luZy5cbiAgICAgKi9cbiAgICBlbmFibGVUcmlnZ2VyKGlzRW5hYmxlZDogYm9vbGVhbik6IHZvaWQge1xuICAgICAgICBpZiAoaXNFbmFibGVkKSB7XG4gICAgICAgICAgICB0aGlzLnRyaWdnZXIucmVtb3ZlQXR0cmlidXRlKCdkaXNhYmxlZCcpO1xuXG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cblxuICAgICAgICB0aGlzLnRyaWdnZXIuc2V0QXR0cmlidXRlKCdkaXNhYmxlZCcsICdkaXNhYmxlZCcpO1xuICAgIH1cbn1cbiJdLCJzb3VyY2VSb290IjoiIn0=