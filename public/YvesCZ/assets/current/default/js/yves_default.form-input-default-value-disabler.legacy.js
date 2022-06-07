(window["webpackJsonp_yves_default"] = window["webpackJsonp_yves_default"] || []).push([["form-input-default-value-disabler"],{

/***/ "./vendor/spryker-shop/shop-ui/src/SprykerShop/Yves/ShopUi/Theme/default/components/molecules/form-input-default-value-disabler/form-input-default-value-disabler.ts":
/*!***************************************************************************************************************************************************************************!*\
  !*** ./vendor/spryker-shop/shop-ui/src/SprykerShop/Yves/ShopUi/Theme/default/components/molecules/form-input-default-value-disabler/form-input-default-value-disabler.ts ***!
  \***************************************************************************************************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return FormInputDefaultValueDisabler; });
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



var FormInputDefaultValueDisabler = /*#__PURE__*/function (_Component) {
  _babel_runtime_helpers_inheritsLoose__WEBPACK_IMPORTED_MODULE_4___default()(FormInputDefaultValueDisabler, _Component);

  var _super = _createSuper(FormInputDefaultValueDisabler);

  function FormInputDefaultValueDisabler() {
    var _this;

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this = _Component.call.apply(_Component, [this].concat(args)) || this;

    _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_5___default()(_babel_runtime_helpers_assertThisInitialized__WEBPACK_IMPORTED_MODULE_1___default()(_this), "forms", void 0);

    return _this;
  }

  var _proto = FormInputDefaultValueDisabler.prototype;

  _proto.readyCallback = function readyCallback() {
    this.forms = Array.from(document.querySelectorAll(this.formSelector));
    this.mapEvents();
  };

  _proto.mapEvents = function mapEvents() {
    var _this2 = this;

    this.forms.forEach(function (form) {
      form.addEventListener('submit', function (event) {
        return _this2.onFormSubmit(event);
      });
    });
  };

  _proto.onFormSubmit = function onFormSubmit(event) {
    event.preventDefault();
    var form = event.currentTarget;
    this.disableInputsWithDefaultValues(form);
  }
  /**
   * Toggles the disabled attribute and submits the form.
   * @param form HTMLFormElement is the element for submit event.
   */
  ;

  _proto.disableInputsWithDefaultValues = function disableInputsWithDefaultValues(form) {
    var _this3 = this;

    var inputs = Array.from(form.querySelectorAll(this.inputSelector));
    inputs.forEach(function (input) {
      var defaultValue = input.getAttribute(_this3.defaultValueAttribute);

      if (defaultValue === input.value) {
        input.setAttribute('disabled', 'disabled');
        return;
      }

      input.removeAttribute('disabled');
    });
    form.submit();
  }
  /**
   * Gets a querySelector name of the form element.
   */
  ;

  _babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_0___default()(FormInputDefaultValueDisabler, [{
    key: "formSelector",
    get: function get() {
      return this.getAttribute('form-selector');
    }
    /**
     * Gets a querySelector name of the input element.
     */

  }, {
    key: "inputSelector",
    get: function get() {
      return this.getAttribute('input-selector');
    }
    /**
     * Gets a name of the default value attribute.
     */

  }, {
    key: "defaultValueAttribute",
    get: function get() {
      return this.getAttribute('default-value-attribute');
    }
  }]);

  return FormInputDefaultValueDisabler;
}(_models_component__WEBPACK_IMPORTED_MODULE_6__["default"]);



/***/ })

}]);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vLi92ZW5kb3Ivc3ByeWtlci1zaG9wL3Nob3AtdWkvc3JjL1NwcnlrZXJTaG9wL1l2ZXMvU2hvcFVpL1RoZW1lL2RlZmF1bHQvY29tcG9uZW50cy9tb2xlY3VsZXMvZm9ybS1pbnB1dC1kZWZhdWx0LXZhbHVlLWRpc2FibGVyL2Zvcm0taW5wdXQtZGVmYXVsdC12YWx1ZS1kaXNhYmxlci50cyJdLCJuYW1lcyI6WyJGb3JtSW5wdXREZWZhdWx0VmFsdWVEaXNhYmxlciIsInJlYWR5Q2FsbGJhY2siLCJmb3JtcyIsIkFycmF5IiwiZnJvbSIsImRvY3VtZW50IiwicXVlcnlTZWxlY3RvckFsbCIsImZvcm1TZWxlY3RvciIsIm1hcEV2ZW50cyIsImZvckVhY2giLCJmb3JtIiwiYWRkRXZlbnRMaXN0ZW5lciIsImV2ZW50Iiwib25Gb3JtU3VibWl0IiwicHJldmVudERlZmF1bHQiLCJjdXJyZW50VGFyZ2V0IiwiZGlzYWJsZUlucHV0c1dpdGhEZWZhdWx0VmFsdWVzIiwiaW5wdXRzIiwiaW5wdXRTZWxlY3RvciIsImlucHV0IiwiZGVmYXVsdFZhbHVlIiwiZ2V0QXR0cmlidXRlIiwiZGVmYXVsdFZhbHVlQXR0cmlidXRlIiwidmFsdWUiLCJzZXRBdHRyaWJ1dGUiLCJyZW1vdmVBdHRyaWJ1dGUiLCJzdWJtaXQiLCJDb21wb25lbnQiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUFBOztJQUVxQkEsNkI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztTQU1QQyxhLEdBQVYseUJBQWdDO0FBQzVCLFNBQUtDLEtBQUwsR0FBZ0NDLEtBQUssQ0FBQ0MsSUFBTixDQUFXQyxRQUFRLENBQUNDLGdCQUFULENBQTBCLEtBQUtDLFlBQS9CLENBQVgsQ0FBaEM7QUFDQSxTQUFLQyxTQUFMO0FBQ0gsRzs7U0FFU0EsUyxHQUFWLHFCQUE0QjtBQUFBOztBQUN4QixTQUFLTixLQUFMLENBQVdPLE9BQVgsQ0FBbUIsVUFBQ0MsSUFBRCxFQUF1QjtBQUN0Q0EsVUFBSSxDQUFDQyxnQkFBTCxDQUFzQixRQUF0QixFQUFnQyxVQUFDQyxLQUFEO0FBQUEsZUFBa0IsTUFBSSxDQUFDQyxZQUFMLENBQWtCRCxLQUFsQixDQUFsQjtBQUFBLE9BQWhDO0FBQ0gsS0FGRDtBQUdILEc7O1NBRVNDLFksR0FBVixzQkFBdUJELEtBQXZCLEVBQTJDO0FBQ3ZDQSxTQUFLLENBQUNFLGNBQU47QUFDQSxRQUFNSixJQUFJLEdBQW9CRSxLQUFLLENBQUNHLGFBQXBDO0FBQ0EsU0FBS0MsOEJBQUwsQ0FBb0NOLElBQXBDO0FBQ0g7QUFFRDs7Ozs7O1NBSUFNLDhCLEdBQUEsd0NBQStCTixJQUEvQixFQUFzRDtBQUFBOztBQUNsRCxRQUFNTyxNQUFNLEdBQXVCZCxLQUFLLENBQUNDLElBQU4sQ0FBV00sSUFBSSxDQUFDSixnQkFBTCxDQUFzQixLQUFLWSxhQUEzQixDQUFYLENBQW5DO0FBRUFELFVBQU0sQ0FBQ1IsT0FBUCxDQUFlLFVBQUNVLEtBQUQsRUFBNkI7QUFDeEMsVUFBTUMsWUFBWSxHQUFHRCxLQUFLLENBQUNFLFlBQU4sQ0FBbUIsTUFBSSxDQUFDQyxxQkFBeEIsQ0FBckI7O0FBRUEsVUFBSUYsWUFBWSxLQUFLRCxLQUFLLENBQUNJLEtBQTNCLEVBQWtDO0FBQzlCSixhQUFLLENBQUNLLFlBQU4sQ0FBbUIsVUFBbkIsRUFBK0IsVUFBL0I7QUFFQTtBQUNIOztBQUVETCxXQUFLLENBQUNNLGVBQU4sQ0FBc0IsVUFBdEI7QUFDSCxLQVZEO0FBWUFmLFFBQUksQ0FBQ2dCLE1BQUw7QUFDSDtBQUVEOzs7Ozs7O3dCQUcyQjtBQUN2QixhQUFPLEtBQUtMLFlBQUwsQ0FBa0IsZUFBbEIsQ0FBUDtBQUNIO0FBRUQ7Ozs7Ozt3QkFHNEI7QUFDeEIsYUFBTyxLQUFLQSxZQUFMLENBQWtCLGdCQUFsQixDQUFQO0FBQ0g7QUFFRDs7Ozs7O3dCQUdvQztBQUNoQyxhQUFPLEtBQUtBLFlBQUwsQ0FBa0IseUJBQWxCLENBQVA7QUFDSDs7OztFQWhFc0RNLHlEIiwiZmlsZSI6Ii4vanMveXZlc19kZWZhdWx0LmZvcm0taW5wdXQtZGVmYXVsdC12YWx1ZS1kaXNhYmxlci5sZWdhY3kuanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgQ29tcG9uZW50IGZyb20gJy4uLy4uLy4uL21vZGVscy9jb21wb25lbnQnO1xuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBGb3JtSW5wdXREZWZhdWx0VmFsdWVEaXNhYmxlciBleHRlbmRzIENvbXBvbmVudCB7XG4gICAgLyoqXG4gICAgICogQ29sbGVjdGlvbiBvZiB0aGUgZm9ybXMuXG4gICAgICovXG4gICAgZm9ybXM6IEhUTUxGb3JtRWxlbWVudFtdO1xuXG4gICAgcHJvdGVjdGVkIHJlYWR5Q2FsbGJhY2soKTogdm9pZCB7XG4gICAgICAgIHRoaXMuZm9ybXMgPSA8SFRNTEZvcm1FbGVtZW50W10+QXJyYXkuZnJvbShkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKHRoaXMuZm9ybVNlbGVjdG9yKSk7XG4gICAgICAgIHRoaXMubWFwRXZlbnRzKCk7XG4gICAgfVxuXG4gICAgcHJvdGVjdGVkIG1hcEV2ZW50cygpOiB2b2lkIHtcbiAgICAgICAgdGhpcy5mb3Jtcy5mb3JFYWNoKChmb3JtOiBIVE1MRWxlbWVudCkgPT4ge1xuICAgICAgICAgICAgZm9ybS5hZGRFdmVudExpc3RlbmVyKCdzdWJtaXQnLCAoZXZlbnQ6IEV2ZW50KSA9PiB0aGlzLm9uRm9ybVN1Ym1pdChldmVudCkpO1xuICAgICAgICB9KTtcbiAgICB9XG5cbiAgICBwcm90ZWN0ZWQgb25Gb3JtU3VibWl0KGV2ZW50OiBFdmVudCk6IHZvaWQge1xuICAgICAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgICBjb25zdCBmb3JtID0gPEhUTUxGb3JtRWxlbWVudD5ldmVudC5jdXJyZW50VGFyZ2V0O1xuICAgICAgICB0aGlzLmRpc2FibGVJbnB1dHNXaXRoRGVmYXVsdFZhbHVlcyhmb3JtKTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBUb2dnbGVzIHRoZSBkaXNhYmxlZCBhdHRyaWJ1dGUgYW5kIHN1Ym1pdHMgdGhlIGZvcm0uXG4gICAgICogQHBhcmFtIGZvcm0gSFRNTEZvcm1FbGVtZW50IGlzIHRoZSBlbGVtZW50IGZvciBzdWJtaXQgZXZlbnQuXG4gICAgICovXG4gICAgZGlzYWJsZUlucHV0c1dpdGhEZWZhdWx0VmFsdWVzKGZvcm06IEhUTUxGb3JtRWxlbWVudCkge1xuICAgICAgICBjb25zdCBpbnB1dHMgPSA8SFRNTElucHV0RWxlbWVudFtdPkFycmF5LmZyb20oZm9ybS5xdWVyeVNlbGVjdG9yQWxsKHRoaXMuaW5wdXRTZWxlY3RvcikpO1xuXG4gICAgICAgIGlucHV0cy5mb3JFYWNoKChpbnB1dDogSFRNTElucHV0RWxlbWVudCkgPT4ge1xuICAgICAgICAgICAgY29uc3QgZGVmYXVsdFZhbHVlID0gaW5wdXQuZ2V0QXR0cmlidXRlKHRoaXMuZGVmYXVsdFZhbHVlQXR0cmlidXRlKTtcblxuICAgICAgICAgICAgaWYgKGRlZmF1bHRWYWx1ZSA9PT0gaW5wdXQudmFsdWUpIHtcbiAgICAgICAgICAgICAgICBpbnB1dC5zZXRBdHRyaWJ1dGUoJ2Rpc2FibGVkJywgJ2Rpc2FibGVkJyk7XG5cbiAgICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIGlucHV0LnJlbW92ZUF0dHJpYnV0ZSgnZGlzYWJsZWQnKTtcbiAgICAgICAgfSk7XG5cbiAgICAgICAgZm9ybS5zdWJtaXQoKTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBHZXRzIGEgcXVlcnlTZWxlY3RvciBuYW1lIG9mIHRoZSBmb3JtIGVsZW1lbnQuXG4gICAgICovXG4gICAgZ2V0IGZvcm1TZWxlY3RvcigpOiBzdHJpbmcge1xuICAgICAgICByZXR1cm4gdGhpcy5nZXRBdHRyaWJ1dGUoJ2Zvcm0tc2VsZWN0b3InKTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBHZXRzIGEgcXVlcnlTZWxlY3RvciBuYW1lIG9mIHRoZSBpbnB1dCBlbGVtZW50LlxuICAgICAqL1xuICAgIGdldCBpbnB1dFNlbGVjdG9yKCk6IHN0cmluZyB7XG4gICAgICAgIHJldHVybiB0aGlzLmdldEF0dHJpYnV0ZSgnaW5wdXQtc2VsZWN0b3InKTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBHZXRzIGEgbmFtZSBvZiB0aGUgZGVmYXVsdCB2YWx1ZSBhdHRyaWJ1dGUuXG4gICAgICovXG4gICAgZ2V0IGRlZmF1bHRWYWx1ZUF0dHJpYnV0ZSgpOiBzdHJpbmcge1xuICAgICAgICByZXR1cm4gdGhpcy5nZXRBdHRyaWJ1dGUoJ2RlZmF1bHQtdmFsdWUtYXR0cmlidXRlJyk7XG4gICAgfVxufVxuIl0sInNvdXJjZVJvb3QiOiIifQ==