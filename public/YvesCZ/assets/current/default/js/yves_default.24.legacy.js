(window["webpackJsonp_yves_default"] = window["webpackJsonp_yves_default"] || []).push([[24],{

/***/ "./src/Pyz/Yves/ShopUi/Theme/default/components/molecules/form-dynamic-submitter/form-dynamic-submitter.ts":
/*!*****************************************************************************************************************!*\
  !*** ./src/Pyz/Yves/ShopUi/Theme/default/components/molecules/form-dynamic-submitter/form-dynamic-submitter.ts ***!
  \*****************************************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return FormDynamicSubmitter; });
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
/* harmony import */ var ShopUi_models_component__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ShopUi/models/component */ "./vendor/spryker-shop/shop-ui/src/SprykerShop/Yves/ShopUi/Theme/default/models/component.ts");







function _createSuper(Derived) { return function () { var Super = _babel_runtime_helpers_getPrototypeOf__WEBPACK_IMPORTED_MODULE_3___default()(Derived), result; if (_isNativeReflectConstruct()) { var NewTarget = _babel_runtime_helpers_getPrototypeOf__WEBPACK_IMPORTED_MODULE_3___default()(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _babel_runtime_helpers_possibleConstructorReturn__WEBPACK_IMPORTED_MODULE_2___default()(this, result); }; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Date.prototype.toString.call(Reflect.construct(Date, [], function () {})); return true; } catch (e) { return false; } }



var FormDynamicSubmitter = /*#__PURE__*/function (_Component) {
  _babel_runtime_helpers_inheritsLoose__WEBPACK_IMPORTED_MODULE_4___default()(FormDynamicSubmitter, _Component);

  var _super = _createSuper(FormDynamicSubmitter);

  function FormDynamicSubmitter() {
    var _this;

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this = _Component.call.apply(_Component, [this].concat(args)) || this;

    _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_5___default()(_babel_runtime_helpers_assertThisInitialized__WEBPACK_IMPORTED_MODULE_1___default()(_this), "triggers", void 0);

    _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_5___default()(_babel_runtime_helpers_assertThisInitialized__WEBPACK_IMPORTED_MODULE_1___default()(_this), "form", void 0);

    _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_5___default()(_babel_runtime_helpers_assertThisInitialized__WEBPACK_IMPORTED_MODULE_1___default()(_this), "tokenInput", void 0);

    return _this;
  }

  var _proto = FormDynamicSubmitter.prototype;

  _proto.readyCallback = function readyCallback() {};

  _proto.init = function init() {
    this.triggers = Array.from(document.getElementsByClassName(this.triggerClassName));
    this.form = this.getElementsByTagName('form')[0];
    this.tokenInput = this.getElementsByClassName(this.tokenInputClassName)[0];
    this.mapEvents();
  };

  _proto.mapEvents = function mapEvents() {
    var _this2 = this;

    this.triggers.forEach(function (trigger) {
      trigger.addEventListener('click', function (event) {
        return _this2.linkClickHandler(event, trigger);
      });
    });
  };

  _proto.linkClickHandler = function linkClickHandler(event, link) {
    event.preventDefault();
    this.submitForm(link.href, link.dataset.csrfToken);
  };

  _proto.submitForm = function submitForm(url, token) {
    this.form.action = url;
    this.tokenInput.value = token;
    this.form.submit();
  };

  _babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_0___default()(FormDynamicSubmitter, [{
    key: "triggerClassName",
    get: function get() {
      return this.getAttribute('trigger-class-name');
    }
  }, {
    key: "tokenInputClassName",
    get: function get() {
      return this.jsName + "__input-token";
    }
  }]);

  return FormDynamicSubmitter;
}(ShopUi_models_component__WEBPACK_IMPORTED_MODULE_6__["default"]);



/***/ })

}]);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vLi9zcmMvUHl6L1l2ZXMvU2hvcFVpL1RoZW1lL2RlZmF1bHQvY29tcG9uZW50cy9tb2xlY3VsZXMvZm9ybS1keW5hbWljLXN1Ym1pdHRlci9mb3JtLWR5bmFtaWMtc3VibWl0dGVyLnRzIl0sIm5hbWVzIjpbIkZvcm1EeW5hbWljU3VibWl0dGVyIiwicmVhZHlDYWxsYmFjayIsImluaXQiLCJ0cmlnZ2VycyIsIkFycmF5IiwiZnJvbSIsImRvY3VtZW50IiwiZ2V0RWxlbWVudHNCeUNsYXNzTmFtZSIsInRyaWdnZXJDbGFzc05hbWUiLCJmb3JtIiwiZ2V0RWxlbWVudHNCeVRhZ05hbWUiLCJ0b2tlbklucHV0IiwidG9rZW5JbnB1dENsYXNzTmFtZSIsIm1hcEV2ZW50cyIsImZvckVhY2giLCJ0cmlnZ2VyIiwiYWRkRXZlbnRMaXN0ZW5lciIsImV2ZW50IiwibGlua0NsaWNrSGFuZGxlciIsImxpbmsiLCJwcmV2ZW50RGVmYXVsdCIsInN1Ym1pdEZvcm0iLCJocmVmIiwiZGF0YXNldCIsImNzcmZUb2tlbiIsInVybCIsInRva2VuIiwiYWN0aW9uIiwidmFsdWUiLCJzdWJtaXQiLCJnZXRBdHRyaWJ1dGUiLCJqc05hbWUiLCJDb21wb25lbnQiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUFBOztJQUVxQkEsb0I7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7U0FLUEMsYSxHQUFWLHlCQUFnQyxDQUFFLEM7O1NBRXhCQyxJLEdBQVYsZ0JBQXVCO0FBQ25CLFNBQUtDLFFBQUwsR0FBbUNDLEtBQUssQ0FBQ0MsSUFBTixDQUFXQyxRQUFRLENBQUNDLHNCQUFULENBQWdDLEtBQUtDLGdCQUFyQyxDQUFYLENBQW5DO0FBQ0EsU0FBS0MsSUFBTCxHQUE2QixLQUFLQyxvQkFBTCxDQUEwQixNQUExQixFQUFrQyxDQUFsQyxDQUE3QjtBQUNBLFNBQUtDLFVBQUwsR0FBb0MsS0FBS0osc0JBQUwsQ0FBNEIsS0FBS0ssbUJBQWpDLEVBQXNELENBQXRELENBQXBDO0FBRUEsU0FBS0MsU0FBTDtBQUNILEc7O1NBRVNBLFMsR0FBVixxQkFBNEI7QUFBQTs7QUFDeEIsU0FBS1YsUUFBTCxDQUFjVyxPQUFkLENBQXNCLFVBQUNDLE9BQUQsRUFBOEI7QUFDaERBLGFBQU8sQ0FBQ0MsZ0JBQVIsQ0FBeUIsT0FBekIsRUFBa0MsVUFBQ0MsS0FBRDtBQUFBLGVBQWtCLE1BQUksQ0FBQ0MsZ0JBQUwsQ0FBc0JELEtBQXRCLEVBQTZCRixPQUE3QixDQUFsQjtBQUFBLE9BQWxDO0FBQ0gsS0FGRDtBQUdILEc7O1NBRVNHLGdCLEdBQVYsMEJBQTJCRCxLQUEzQixFQUF5Q0UsSUFBekMsRUFBc0U7QUFDbEVGLFNBQUssQ0FBQ0csY0FBTjtBQUNBLFNBQUtDLFVBQUwsQ0FBZ0JGLElBQUksQ0FBQ0csSUFBckIsRUFBMkJILElBQUksQ0FBQ0ksT0FBTCxDQUFhQyxTQUF4QztBQUNILEc7O1NBRVNILFUsR0FBVixvQkFBcUJJLEdBQXJCLEVBQWtDQyxLQUFsQyxFQUF1RDtBQUNuRCxTQUFLakIsSUFBTCxDQUFVa0IsTUFBVixHQUFtQkYsR0FBbkI7QUFDQSxTQUFLZCxVQUFMLENBQWdCaUIsS0FBaEIsR0FBd0JGLEtBQXhCO0FBQ0EsU0FBS2pCLElBQUwsQ0FBVW9CLE1BQVY7QUFDSCxHOzs7O3dCQUV3QztBQUNyQyxhQUFPLEtBQUtDLFlBQUwsQ0FBa0Isb0JBQWxCLENBQVA7QUFDSDs7O3dCQUUyQztBQUN4QyxhQUFVLEtBQUtDLE1BQWY7QUFDSDs7OztFQXRDNkNDLCtEIiwiZmlsZSI6Ii4vanMveXZlc19kZWZhdWx0LjI0LmxlZ2FjeS5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBDb21wb25lbnQgZnJvbSAnU2hvcFVpL21vZGVscy9jb21wb25lbnQnO1xuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBGb3JtRHluYW1pY1N1Ym1pdHRlciBleHRlbmRzIENvbXBvbmVudCB7XG4gICAgcHJvdGVjdGVkIHRyaWdnZXJzOiBIVE1MTGlua0VsZW1lbnRbXTtcbiAgICBwcm90ZWN0ZWQgZm9ybTogSFRNTEZvcm1FbGVtZW50O1xuICAgIHByb3RlY3RlZCB0b2tlbklucHV0OiBIVE1MSW5wdXRFbGVtZW50O1xuXG4gICAgcHJvdGVjdGVkIHJlYWR5Q2FsbGJhY2soKTogdm9pZCB7fVxuXG4gICAgcHJvdGVjdGVkIGluaXQoKTogdm9pZCB7XG4gICAgICAgIHRoaXMudHJpZ2dlcnMgPSA8SFRNTExpbmtFbGVtZW50W10+QXJyYXkuZnJvbShkb2N1bWVudC5nZXRFbGVtZW50c0J5Q2xhc3NOYW1lKHRoaXMudHJpZ2dlckNsYXNzTmFtZSkpO1xuICAgICAgICB0aGlzLmZvcm0gPSA8SFRNTEZvcm1FbGVtZW50PnRoaXMuZ2V0RWxlbWVudHNCeVRhZ05hbWUoJ2Zvcm0nKVswXTtcbiAgICAgICAgdGhpcy50b2tlbklucHV0ID0gPEhUTUxJbnB1dEVsZW1lbnQ+dGhpcy5nZXRFbGVtZW50c0J5Q2xhc3NOYW1lKHRoaXMudG9rZW5JbnB1dENsYXNzTmFtZSlbMF07XG5cbiAgICAgICAgdGhpcy5tYXBFdmVudHMoKTtcbiAgICB9XG5cbiAgICBwcm90ZWN0ZWQgbWFwRXZlbnRzKCk6IHZvaWQge1xuICAgICAgICB0aGlzLnRyaWdnZXJzLmZvckVhY2goKHRyaWdnZXI6IEhUTUxMaW5rRWxlbWVudCkgPT4ge1xuICAgICAgICAgICAgdHJpZ2dlci5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIChldmVudDogRXZlbnQpID0+IHRoaXMubGlua0NsaWNrSGFuZGxlcihldmVudCwgdHJpZ2dlcikpO1xuICAgICAgICB9KTtcbiAgICB9XG5cbiAgICBwcm90ZWN0ZWQgbGlua0NsaWNrSGFuZGxlcihldmVudDogRXZlbnQsIGxpbms6IEhUTUxMaW5rRWxlbWVudCk6IHZvaWQge1xuICAgICAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgICB0aGlzLnN1Ym1pdEZvcm0obGluay5ocmVmLCBsaW5rLmRhdGFzZXQuY3NyZlRva2VuKTtcbiAgICB9XG5cbiAgICBwcm90ZWN0ZWQgc3VibWl0Rm9ybSh1cmw6IHN0cmluZywgdG9rZW46IHN0cmluZyk6IHZvaWQge1xuICAgICAgICB0aGlzLmZvcm0uYWN0aW9uID0gdXJsO1xuICAgICAgICB0aGlzLnRva2VuSW5wdXQudmFsdWUgPSB0b2tlbjtcbiAgICAgICAgdGhpcy5mb3JtLnN1Ym1pdCgpO1xuICAgIH1cblxuICAgIHByb3RlY3RlZCBnZXQgdHJpZ2dlckNsYXNzTmFtZSgpOiBzdHJpbmcge1xuICAgICAgICByZXR1cm4gdGhpcy5nZXRBdHRyaWJ1dGUoJ3RyaWdnZXItY2xhc3MtbmFtZScpO1xuICAgIH1cblxuICAgIHByb3RlY3RlZCBnZXQgdG9rZW5JbnB1dENsYXNzTmFtZSgpOiBzdHJpbmcge1xuICAgICAgICByZXR1cm4gYCR7dGhpcy5qc05hbWV9X19pbnB1dC10b2tlbmA7XG4gICAgfVxufVxuIl0sInNvdXJjZVJvb3QiOiIifQ==