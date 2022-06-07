(window["webpackJsonp_yves_default"] = window["webpackJsonp_yves_default"] || []).push([["remote-form-submit"],{

/***/ "./vendor/spryker-shop/shop-ui/src/SprykerShop/Yves/ShopUi/Theme/default/components/molecules/remote-form-submit/remote-form-submit.ts":
/*!*********************************************************************************************************************************************!*\
  !*** ./vendor/spryker-shop/shop-ui/src/SprykerShop/Yves/ShopUi/Theme/default/components/molecules/remote-form-submit/remote-form-submit.ts ***!
  \*********************************************************************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return RemoteFormSubmit; });
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



var RemoteFormSubmit = /*#__PURE__*/function (_Component) {
  _babel_runtime_helpers_inheritsLoose__WEBPACK_IMPORTED_MODULE_4___default()(RemoteFormSubmit, _Component);

  var _super = _createSuper(RemoteFormSubmit);

  function RemoteFormSubmit() {
    var _this;

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this = _Component.call.apply(_Component, [this].concat(args)) || this;

    _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_5___default()(_babel_runtime_helpers_assertThisInitialized__WEBPACK_IMPORTED_MODULE_1___default()(_this), "formHolder", void 0);

    _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_5___default()(_babel_runtime_helpers_assertThisInitialized__WEBPACK_IMPORTED_MODULE_1___default()(_this), "fieldsContainer", void 0);

    _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_5___default()(_babel_runtime_helpers_assertThisInitialized__WEBPACK_IMPORTED_MODULE_1___default()(_this), "submitButton", void 0);

    return _this;
  }

  var _proto = RemoteFormSubmit.prototype;

  _proto.readyCallback = function readyCallback() {};

  _proto.init = function init() {
    this.fieldsContainer = this.getElementsByClassName(this.jsName + "__container")[0];
    this.submitButton = this.getElementsByClassName(this.jsName + "__submit")[0];
    this.getFormHolder();
    this.createForm();
    this.removeFieldsContainer();
    this.mapEvents();
  };

  _proto.mapEvents = function mapEvents() {
    this.mapSubmitButtonClickEvent();
  };

  _proto.mapSubmitButtonClickEvent = function mapSubmitButtonClickEvent() {
    var _this2 = this;

    this.submitButton.addEventListener('click', function () {
      return _this2.submitTargetForm();
    });
  };

  _proto.submitTargetForm = function submitTargetForm() {
    var form = document.getElementById(this.formName);

    if (this.submitButton.dataset.formAction) {
      form.action = this.submitButton.dataset.formAction;
    }

    form.submit();
  };

  _proto.getFormHolder = function getFormHolder() {
    if (this.formHolderClassName) {
      this.formHolder = document.getElementsByClassName(this.formHolderClassName)[0];
      return;
    }

    this.formHolder = document.body;
  };

  _proto.createForm = function createForm() {
    if (document.getElementById(this.formName)) {
      return;
    }

    var formTemplate = "\n            <form id=\"" + this.formName + "\" class=\"is-hidden\" name=\"" + this.formName + "\" method=\"post\" action=\"" + this.formAction + "\">\n                " + this.fieldsContainer.innerHTML + "\n            </form>\n        ";
    this.formHolder.insertAdjacentHTML('beforeend', formTemplate);
  };

  _proto.removeFieldsContainer = function removeFieldsContainer() {
    this.fieldsContainer.remove();
  };

  _babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_0___default()(RemoteFormSubmit, [{
    key: "formHolderClassName",
    get: function get() {
      return this.getAttribute('form-holder-class-name');
    }
  }, {
    key: "formName",
    get: function get() {
      return this.getAttribute('form-name');
    }
  }, {
    key: "formAction",
    get: function get() {
      return this.getAttribute('form-action');
    }
  }]);

  return RemoteFormSubmit;
}(ShopUi_models_component__WEBPACK_IMPORTED_MODULE_6__["default"]);



/***/ })

}]);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vLi92ZW5kb3Ivc3ByeWtlci1zaG9wL3Nob3AtdWkvc3JjL1NwcnlrZXJTaG9wL1l2ZXMvU2hvcFVpL1RoZW1lL2RlZmF1bHQvY29tcG9uZW50cy9tb2xlY3VsZXMvcmVtb3RlLWZvcm0tc3VibWl0L3JlbW90ZS1mb3JtLXN1Ym1pdC50cyJdLCJuYW1lcyI6WyJSZW1vdGVGb3JtU3VibWl0IiwicmVhZHlDYWxsYmFjayIsImluaXQiLCJmaWVsZHNDb250YWluZXIiLCJnZXRFbGVtZW50c0J5Q2xhc3NOYW1lIiwianNOYW1lIiwic3VibWl0QnV0dG9uIiwiZ2V0Rm9ybUhvbGRlciIsImNyZWF0ZUZvcm0iLCJyZW1vdmVGaWVsZHNDb250YWluZXIiLCJtYXBFdmVudHMiLCJtYXBTdWJtaXRCdXR0b25DbGlja0V2ZW50IiwiYWRkRXZlbnRMaXN0ZW5lciIsInN1Ym1pdFRhcmdldEZvcm0iLCJmb3JtIiwiZG9jdW1lbnQiLCJnZXRFbGVtZW50QnlJZCIsImZvcm1OYW1lIiwiZGF0YXNldCIsImZvcm1BY3Rpb24iLCJhY3Rpb24iLCJzdWJtaXQiLCJmb3JtSG9sZGVyQ2xhc3NOYW1lIiwiZm9ybUhvbGRlciIsImJvZHkiLCJmb3JtVGVtcGxhdGUiLCJpbm5lckhUTUwiLCJpbnNlcnRBZGphY2VudEhUTUwiLCJyZW1vdmUiLCJnZXRBdHRyaWJ1dGUiLCJDb21wb25lbnQiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUFBOztJQUVxQkEsZ0I7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7U0FLUEMsYSxHQUFWLHlCQUFnQyxDQUFFLEM7O1NBRXhCQyxJLEdBQVYsZ0JBQXVCO0FBQ25CLFNBQUtDLGVBQUwsR0FBb0MsS0FBS0Msc0JBQUwsQ0FBK0IsS0FBS0MsTUFBcEMsa0JBQXlELENBQXpELENBQXBDO0FBQ0EsU0FBS0MsWUFBTCxHQUF1QyxLQUFLRixzQkFBTCxDQUErQixLQUFLQyxNQUFwQyxlQUFzRCxDQUF0RCxDQUF2QztBQUVBLFNBQUtFLGFBQUw7QUFDQSxTQUFLQyxVQUFMO0FBQ0EsU0FBS0MscUJBQUw7QUFDQSxTQUFLQyxTQUFMO0FBQ0gsRzs7U0FFU0EsUyxHQUFWLHFCQUE0QjtBQUN4QixTQUFLQyx5QkFBTDtBQUNILEc7O1NBRVNBLHlCLEdBQVYscUNBQTRDO0FBQUE7O0FBQ3hDLFNBQUtMLFlBQUwsQ0FBa0JNLGdCQUFsQixDQUFtQyxPQUFuQyxFQUE0QztBQUFBLGFBQU0sTUFBSSxDQUFDQyxnQkFBTCxFQUFOO0FBQUEsS0FBNUM7QUFDSCxHOztTQUVTQSxnQixHQUFWLDRCQUFtQztBQUMvQixRQUFNQyxJQUFJLEdBQW9CQyxRQUFRLENBQUNDLGNBQVQsQ0FBd0IsS0FBS0MsUUFBN0IsQ0FBOUI7O0FBRUEsUUFBSSxLQUFLWCxZQUFMLENBQWtCWSxPQUFsQixDQUEwQkMsVUFBOUIsRUFBMEM7QUFDdENMLFVBQUksQ0FBQ00sTUFBTCxHQUFjLEtBQUtkLFlBQUwsQ0FBa0JZLE9BQWxCLENBQTBCQyxVQUF4QztBQUNIOztBQUVETCxRQUFJLENBQUNPLE1BQUw7QUFDSCxHOztTQUVTZCxhLEdBQVYseUJBQWdDO0FBQzVCLFFBQUksS0FBS2UsbUJBQVQsRUFBOEI7QUFDMUIsV0FBS0MsVUFBTCxHQUErQlIsUUFBUSxDQUFDWCxzQkFBVCxDQUFnQyxLQUFLa0IsbUJBQXJDLEVBQTBELENBQTFELENBQS9CO0FBRUE7QUFDSDs7QUFFRCxTQUFLQyxVQUFMLEdBQWtCUixRQUFRLENBQUNTLElBQTNCO0FBQ0gsRzs7U0FFU2hCLFUsR0FBVixzQkFBNkI7QUFDekIsUUFBSU8sUUFBUSxDQUFDQyxjQUFULENBQXdCLEtBQUtDLFFBQTdCLENBQUosRUFBNEM7QUFDeEM7QUFDSDs7QUFFRCxRQUFNUSxZQUFZLGlDQUNGLEtBQUtSLFFBREgsc0NBQ3dDLEtBQUtBLFFBRDdDLG9DQUNnRixLQUFLRSxVQURyRiw2QkFFUixLQUFLaEIsZUFBTCxDQUFxQnVCLFNBRmIsb0NBQWxCO0FBS0EsU0FBS0gsVUFBTCxDQUFnQkksa0JBQWhCLENBQW1DLFdBQW5DLEVBQWdERixZQUFoRDtBQUNILEc7O1NBRVNoQixxQixHQUFWLGlDQUF3QztBQUNwQyxTQUFLTixlQUFMLENBQXFCeUIsTUFBckI7QUFDSCxHOzs7O3dCQUUyQztBQUN4QyxhQUFPLEtBQUtDLFlBQUwsQ0FBa0Isd0JBQWxCLENBQVA7QUFDSDs7O3dCQUVnQztBQUM3QixhQUFPLEtBQUtBLFlBQUwsQ0FBa0IsV0FBbEIsQ0FBUDtBQUNIOzs7d0JBRWtDO0FBQy9CLGFBQU8sS0FBS0EsWUFBTCxDQUFrQixhQUFsQixDQUFQO0FBQ0g7Ozs7RUF4RXlDQywrRCIsImZpbGUiOiIuL2pzL3l2ZXNfZGVmYXVsdC5yZW1vdGUtZm9ybS1zdWJtaXQubGVnYWN5LmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IENvbXBvbmVudCBmcm9tICdTaG9wVWkvbW9kZWxzL2NvbXBvbmVudCc7XG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIFJlbW90ZUZvcm1TdWJtaXQgZXh0ZW5kcyBDb21wb25lbnQge1xuICAgIHByb3RlY3RlZCBmb3JtSG9sZGVyOiBIVE1MRWxlbWVudDtcbiAgICBwcm90ZWN0ZWQgZmllbGRzQ29udGFpbmVyOiBIVE1MRWxlbWVudDtcbiAgICBwcm90ZWN0ZWQgc3VibWl0QnV0dG9uOiBIVE1MQnV0dG9uRWxlbWVudDtcblxuICAgIHByb3RlY3RlZCByZWFkeUNhbGxiYWNrKCk6IHZvaWQge31cblxuICAgIHByb3RlY3RlZCBpbml0KCk6IHZvaWQge1xuICAgICAgICB0aGlzLmZpZWxkc0NvbnRhaW5lciA9IDxIVE1MRWxlbWVudD50aGlzLmdldEVsZW1lbnRzQnlDbGFzc05hbWUoYCR7dGhpcy5qc05hbWV9X19jb250YWluZXJgKVswXTtcbiAgICAgICAgdGhpcy5zdWJtaXRCdXR0b24gPSA8SFRNTEJ1dHRvbkVsZW1lbnQ+dGhpcy5nZXRFbGVtZW50c0J5Q2xhc3NOYW1lKGAke3RoaXMuanNOYW1lfV9fc3VibWl0YClbMF07XG5cbiAgICAgICAgdGhpcy5nZXRGb3JtSG9sZGVyKCk7XG4gICAgICAgIHRoaXMuY3JlYXRlRm9ybSgpO1xuICAgICAgICB0aGlzLnJlbW92ZUZpZWxkc0NvbnRhaW5lcigpO1xuICAgICAgICB0aGlzLm1hcEV2ZW50cygpO1xuICAgIH1cblxuICAgIHByb3RlY3RlZCBtYXBFdmVudHMoKTogdm9pZCB7XG4gICAgICAgIHRoaXMubWFwU3VibWl0QnV0dG9uQ2xpY2tFdmVudCgpO1xuICAgIH1cblxuICAgIHByb3RlY3RlZCBtYXBTdWJtaXRCdXR0b25DbGlja0V2ZW50KCk6IHZvaWQge1xuICAgICAgICB0aGlzLnN1Ym1pdEJ1dHRvbi5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsICgpID0+IHRoaXMuc3VibWl0VGFyZ2V0Rm9ybSgpKTtcbiAgICB9XG5cbiAgICBwcm90ZWN0ZWQgc3VibWl0VGFyZ2V0Rm9ybSgpOiB2b2lkIHtcbiAgICAgICAgY29uc3QgZm9ybSA9IDxIVE1MRm9ybUVsZW1lbnQ+ZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQodGhpcy5mb3JtTmFtZSk7XG5cbiAgICAgICAgaWYgKHRoaXMuc3VibWl0QnV0dG9uLmRhdGFzZXQuZm9ybUFjdGlvbikge1xuICAgICAgICAgICAgZm9ybS5hY3Rpb24gPSB0aGlzLnN1Ym1pdEJ1dHRvbi5kYXRhc2V0LmZvcm1BY3Rpb247XG4gICAgICAgIH1cblxuICAgICAgICBmb3JtLnN1Ym1pdCgpO1xuICAgIH1cblxuICAgIHByb3RlY3RlZCBnZXRGb3JtSG9sZGVyKCk6IHZvaWQge1xuICAgICAgICBpZiAodGhpcy5mb3JtSG9sZGVyQ2xhc3NOYW1lKSB7XG4gICAgICAgICAgICB0aGlzLmZvcm1Ib2xkZXIgPSA8SFRNTEVsZW1lbnQ+ZG9jdW1lbnQuZ2V0RWxlbWVudHNCeUNsYXNzTmFtZSh0aGlzLmZvcm1Ib2xkZXJDbGFzc05hbWUpWzBdO1xuXG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cblxuICAgICAgICB0aGlzLmZvcm1Ib2xkZXIgPSBkb2N1bWVudC5ib2R5O1xuICAgIH1cblxuICAgIHByb3RlY3RlZCBjcmVhdGVGb3JtKCk6IHZvaWQge1xuICAgICAgICBpZiAoZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQodGhpcy5mb3JtTmFtZSkpIHtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuXG4gICAgICAgIGNvbnN0IGZvcm1UZW1wbGF0ZSA9IGBcbiAgICAgICAgICAgIDxmb3JtIGlkPVwiJHt0aGlzLmZvcm1OYW1lfVwiIGNsYXNzPVwiaXMtaGlkZGVuXCIgbmFtZT1cIiR7dGhpcy5mb3JtTmFtZX1cIiBtZXRob2Q9XCJwb3N0XCIgYWN0aW9uPVwiJHt0aGlzLmZvcm1BY3Rpb259XCI+XG4gICAgICAgICAgICAgICAgJHt0aGlzLmZpZWxkc0NvbnRhaW5lci5pbm5lckhUTUx9XG4gICAgICAgICAgICA8L2Zvcm0+XG4gICAgICAgIGA7XG4gICAgICAgIHRoaXMuZm9ybUhvbGRlci5pbnNlcnRBZGphY2VudEhUTUwoJ2JlZm9yZWVuZCcsIGZvcm1UZW1wbGF0ZSk7XG4gICAgfVxuXG4gICAgcHJvdGVjdGVkIHJlbW92ZUZpZWxkc0NvbnRhaW5lcigpOiB2b2lkIHtcbiAgICAgICAgdGhpcy5maWVsZHNDb250YWluZXIucmVtb3ZlKCk7XG4gICAgfVxuXG4gICAgcHJvdGVjdGVkIGdldCBmb3JtSG9sZGVyQ2xhc3NOYW1lKCk6IHN0cmluZyB7XG4gICAgICAgIHJldHVybiB0aGlzLmdldEF0dHJpYnV0ZSgnZm9ybS1ob2xkZXItY2xhc3MtbmFtZScpO1xuICAgIH1cblxuICAgIHByb3RlY3RlZCBnZXQgZm9ybU5hbWUoKTogc3RyaW5nIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuZ2V0QXR0cmlidXRlKCdmb3JtLW5hbWUnKTtcbiAgICB9XG5cbiAgICBwcm90ZWN0ZWQgZ2V0IGZvcm1BY3Rpb24oKTogc3RyaW5nIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuZ2V0QXR0cmlidXRlKCdmb3JtLWFjdGlvbicpO1xuICAgIH1cbn1cbiJdLCJzb3VyY2VSb290IjoiIn0=