(window["webpackJsonp_yves_default"] = window["webpackJsonp_yves_default"] || []).push([["form-clear"],{

/***/ "./vendor/spryker-shop/shop-ui/src/SprykerShop/Yves/ShopUi/Theme/default/components/molecules/form-clear/form-clear.ts":
/*!*****************************************************************************************************************************!*\
  !*** ./vendor/spryker-shop/shop-ui/src/SprykerShop/Yves/ShopUi/Theme/default/components/molecules/form-clear/form-clear.ts ***!
  \*****************************************************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return FormClear; });
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
 * @event formFieldsClearAfter An event which is triggered after the form fields are cleared.
 */

var FormClear = /*#__PURE__*/function (_Component) {
  _babel_runtime_helpers_inheritsLoose__WEBPACK_IMPORTED_MODULE_4___default()(FormClear, _Component);

  var _super = _createSuper(FormClear);

  function FormClear() {
    var _this;

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this = _Component.call.apply(_Component, [this].concat(args)) || this;

    _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_5___default()(_babel_runtime_helpers_assertThisInitialized__WEBPACK_IMPORTED_MODULE_1___default()(_this), "form", void 0);

    _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_5___default()(_babel_runtime_helpers_assertThisInitialized__WEBPACK_IMPORTED_MODULE_1___default()(_this), "triggers", void 0);

    _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_5___default()(_babel_runtime_helpers_assertThisInitialized__WEBPACK_IMPORTED_MODULE_1___default()(_this), "targets", void 0);

    _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_5___default()(_babel_runtime_helpers_assertThisInitialized__WEBPACK_IMPORTED_MODULE_1___default()(_this), "ignoreElements", void 0);

    _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_5___default()(_babel_runtime_helpers_assertThisInitialized__WEBPACK_IMPORTED_MODULE_1___default()(_this), "filterElements", void 0);

    _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_5___default()(_babel_runtime_helpers_assertThisInitialized__WEBPACK_IMPORTED_MODULE_1___default()(_this), "formFieldsClearAfter", void 0);

    return _this;
  }

  var _proto = FormClear.prototype;

  _proto.readyCallback = function readyCallback() {
    var _this2 = this;

    /* tslint:disable: deprecation */
    this.triggers = Array.from(this.triggerClassName ? document.getElementsByClassName(this.triggerClassName) : document.querySelectorAll(this.triggerSelector));
    this.form = this.formClassName ? document.getElementsByClassName(this.formClassName)[0] : document.querySelector(this.formSelector);
    this.ignoreElements = Array.from(this.ignoreClassName ? this.form.getElementsByClassName(this.ignoreClassName) : this.form.querySelectorAll(this.ignoreSelector));
    /* tslint:enable: deprecation */

    var formInputs = Array.from(this.form.getElementsByTagName('input'));
    var formSelects = Array.from(this.form.getElementsByTagName('select'));
    this.targets = [].concat(formInputs, formSelects);
    this.filterElements = this.targets.filter(function (element) {
      return !_this2.ignoreElements.includes(element);
    });
    this.mapEvents();
  };

  _proto.mapEvents = function mapEvents() {
    var _this3 = this;

    this.createCustomEvents();
    this.triggers.forEach(function (input) {
      input.addEventListener('change', function () {
        return _this3.onChange(input);
      });
    });
  };

  _proto.onChange = function onChange(input) {
    var isChecked = input.checked;

    if (isChecked) {
      this.clearFormValues();
    }
  }
  /**
   * Clears an array of the form elements and triggers the custom event formFieldsClearAfter.
   * @param element HTMLFormElement is the element for clear action.
   */
  ;

  _proto.clearFormValues = function clearFormValues() {
    var _this4 = this;

    this.filterElements.forEach(function (element) {
      _this4.clearFormField(element);
    });
    this.dispatchEvent(this.formFieldsClearAfter);
  }
  /**
   * Clears current form field.
   * @param element HTMLFormElement is the element for clear action.
   */
  ;

  _proto.clearFormField = function clearFormField(element) {
    var tagName = this.getTagName(element);

    if (tagName === 'INPUT') {
      var inputType = element.type;

      if (inputType === 'text' || inputType === 'hidden') {
        element.value = '';
      }

      if (inputType === 'checkbox' || inputType === 'radio') {
        element.checked = false;
      }
    }

    if (tagName === 'SELECT') {
      element.selectedIndex = 0;
    }
  }
  /**
   * Gets a tag name of the current element.
   */
  ;

  _proto.getTagName = function getTagName(element) {
    return element.tagName.toUpperCase();
  };

  _proto.createCustomEvents = function createCustomEvents() {
    this.formFieldsClearAfter = new CustomEvent('form-fields-clear-after');
  }
  /**
   * Gets a querySelector name of the form.
   *
   * @deprecated Use formClassName() instead.
   */
  ;

  _babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_0___default()(FormClear, [{
    key: "formSelector",
    get: function get() {
      return this.getAttribute('form-selector');
    }
  }, {
    key: "formClassName",
    get: function get() {
      return this.getAttribute('form-class-name');
    }
    /**
     * Gets a querySelector name of the trigger element.
     *
     * @deprecated Use triggerClassName() instead.
     */

  }, {
    key: "triggerSelector",
    get: function get() {
      return this.getAttribute('trigger-selector');
    }
  }, {
    key: "triggerClassName",
    get: function get() {
      return this.getAttribute('trigger-class-name');
    }
    /**
     * Gets a querySelector name of the ignore element.
     *
     * @deprecated Use ignoreClassName() instead.
     */

  }, {
    key: "ignoreSelector",
    get: function get() {
      return this.getAttribute('ignore-selector');
    }
  }, {
    key: "ignoreClassName",
    get: function get() {
      return this.getAttribute('ignore-class-name');
    }
  }]);

  return FormClear;
}(_models_component__WEBPACK_IMPORTED_MODULE_6__["default"]);



/***/ })

}]);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vLi92ZW5kb3Ivc3ByeWtlci1zaG9wL3Nob3AtdWkvc3JjL1NwcnlrZXJTaG9wL1l2ZXMvU2hvcFVpL1RoZW1lL2RlZmF1bHQvY29tcG9uZW50cy9tb2xlY3VsZXMvZm9ybS1jbGVhci9mb3JtLWNsZWFyLnRzIl0sIm5hbWVzIjpbIkZvcm1DbGVhciIsInJlYWR5Q2FsbGJhY2siLCJ0cmlnZ2VycyIsIkFycmF5IiwiZnJvbSIsInRyaWdnZXJDbGFzc05hbWUiLCJkb2N1bWVudCIsImdldEVsZW1lbnRzQnlDbGFzc05hbWUiLCJxdWVyeVNlbGVjdG9yQWxsIiwidHJpZ2dlclNlbGVjdG9yIiwiZm9ybSIsImZvcm1DbGFzc05hbWUiLCJxdWVyeVNlbGVjdG9yIiwiZm9ybVNlbGVjdG9yIiwiaWdub3JlRWxlbWVudHMiLCJpZ25vcmVDbGFzc05hbWUiLCJpZ25vcmVTZWxlY3RvciIsImZvcm1JbnB1dHMiLCJnZXRFbGVtZW50c0J5VGFnTmFtZSIsImZvcm1TZWxlY3RzIiwidGFyZ2V0cyIsImZpbHRlckVsZW1lbnRzIiwiZmlsdGVyIiwiZWxlbWVudCIsImluY2x1ZGVzIiwibWFwRXZlbnRzIiwiY3JlYXRlQ3VzdG9tRXZlbnRzIiwiZm9yRWFjaCIsImlucHV0IiwiYWRkRXZlbnRMaXN0ZW5lciIsIm9uQ2hhbmdlIiwiaXNDaGVja2VkIiwiY2hlY2tlZCIsImNsZWFyRm9ybVZhbHVlcyIsImNsZWFyRm9ybUZpZWxkIiwiZGlzcGF0Y2hFdmVudCIsImZvcm1GaWVsZHNDbGVhckFmdGVyIiwidGFnTmFtZSIsImdldFRhZ05hbWUiLCJpbnB1dFR5cGUiLCJ0eXBlIiwidmFsdWUiLCJzZWxlY3RlZEluZGV4IiwidG9VcHBlckNhc2UiLCJDdXN0b21FdmVudCIsImdldEF0dHJpYnV0ZSIsIkNvbXBvbmVudCJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUE7QUFFQTs7OztJQUdxQkEsUzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztTQStCUEMsYSxHQUFWLHlCQUFnQztBQUFBOztBQUM1QjtBQUNBLFNBQUtDLFFBQUwsR0FDSUMsS0FBSyxDQUFDQyxJQUFOLENBQ0ksS0FBS0MsZ0JBQUwsR0FDTUMsUUFBUSxDQUFDQyxzQkFBVCxDQUFnQyxLQUFLRixnQkFBckMsQ0FETixHQUVNQyxRQUFRLENBQUNFLGdCQUFULENBQTBCLEtBQUtDLGVBQS9CLENBSFYsQ0FESjtBQU9BLFNBQUtDLElBQUwsR0FDSyxLQUFLQyxhQUFMLEdBQ0tMLFFBQVEsQ0FBQ0Msc0JBQVQsQ0FBZ0MsS0FBS0ksYUFBckMsRUFBb0QsQ0FBcEQsQ0FETCxHQUVLTCxRQUFRLENBQUNNLGFBQVQsQ0FBdUIsS0FBS0MsWUFBNUIsQ0FIVjtBQUtBLFNBQUtDLGNBQUwsR0FDSVgsS0FBSyxDQUFDQyxJQUFOLENBQ0ksS0FBS1csZUFBTCxHQUNNLEtBQUtMLElBQUwsQ0FBVUgsc0JBQVYsQ0FBaUMsS0FBS1EsZUFBdEMsQ0FETixHQUVNLEtBQUtMLElBQUwsQ0FBVUYsZ0JBQVYsQ0FBMkIsS0FBS1EsY0FBaEMsQ0FIVixDQURKO0FBT0E7O0FBQ0EsUUFBTUMsVUFBVSxHQUFrQmQsS0FBSyxDQUFDQyxJQUFOLENBQVcsS0FBS00sSUFBTCxDQUFVUSxvQkFBVixDQUErQixPQUEvQixDQUFYLENBQWxDO0FBQ0EsUUFBTUMsV0FBVyxHQUFrQmhCLEtBQUssQ0FBQ0MsSUFBTixDQUFXLEtBQUtNLElBQUwsQ0FBVVEsb0JBQVYsQ0FBK0IsUUFBL0IsQ0FBWCxDQUFuQztBQUNBLFNBQUtFLE9BQUwsYUFBbUJILFVBQW5CLEVBQWtDRSxXQUFsQztBQUNBLFNBQUtFLGNBQUwsR0FBc0IsS0FBS0QsT0FBTCxDQUFhRSxNQUFiLENBQW9CLFVBQUNDLE9BQUQ7QUFBQSxhQUFhLENBQUMsTUFBSSxDQUFDVCxjQUFMLENBQW9CVSxRQUFwQixDQUE2QkQsT0FBN0IsQ0FBZDtBQUFBLEtBQXBCLENBQXRCO0FBRUEsU0FBS0UsU0FBTDtBQUNILEc7O1NBRVNBLFMsR0FBVixxQkFBNEI7QUFBQTs7QUFDeEIsU0FBS0Msa0JBQUw7QUFDQSxTQUFLeEIsUUFBTCxDQUFjeUIsT0FBZCxDQUFzQixVQUFDQyxLQUFELEVBQVc7QUFDN0JBLFdBQUssQ0FBQ0MsZ0JBQU4sQ0FBdUIsUUFBdkIsRUFBaUM7QUFBQSxlQUFNLE1BQUksQ0FBQ0MsUUFBTCxDQUFjRixLQUFkLENBQU47QUFBQSxPQUFqQztBQUNILEtBRkQ7QUFHSCxHOztTQUVTRSxRLEdBQVYsa0JBQW1CRixLQUFuQixFQUE2QztBQUN6QyxRQUFNRyxTQUFTLEdBQXNCSCxLQUFuQixDQUEwQkksT0FBNUM7O0FBQ0EsUUFBSUQsU0FBSixFQUFlO0FBQ1gsV0FBS0UsZUFBTDtBQUNIO0FBQ0o7QUFFRDs7Ozs7O1NBSUFBLGUsR0FBQSwyQkFBd0I7QUFBQTs7QUFDcEIsU0FBS1osY0FBTCxDQUFvQk0sT0FBcEIsQ0FBNEIsVUFBQ0osT0FBRCxFQUE4QjtBQUN0RCxZQUFJLENBQUNXLGNBQUwsQ0FBb0JYLE9BQXBCO0FBQ0gsS0FGRDtBQUlBLFNBQUtZLGFBQUwsQ0FBbUIsS0FBS0Msb0JBQXhCO0FBQ0g7QUFFRDs7Ozs7O1NBSUFGLGMsR0FBQSx3QkFBZVgsT0FBZixFQUErQztBQUMzQyxRQUFNYyxPQUFPLEdBQUcsS0FBS0MsVUFBTCxDQUFnQmYsT0FBaEIsQ0FBaEI7O0FBQ0EsUUFBSWMsT0FBTyxLQUFLLE9BQWhCLEVBQXlCO0FBQ3JCLFVBQU1FLFNBQVMsR0FBR2hCLE9BQU8sQ0FBQ2lCLElBQTFCOztBQUVBLFVBQUlELFNBQVMsS0FBSyxNQUFkLElBQXdCQSxTQUFTLEtBQUssUUFBMUMsRUFBb0Q7QUFDaERoQixlQUFPLENBQUNrQixLQUFSLEdBQWdCLEVBQWhCO0FBQ0g7O0FBQ0QsVUFBSUYsU0FBUyxLQUFLLFVBQWQsSUFBNEJBLFNBQVMsS0FBSyxPQUE5QyxFQUF1RDtBQUNuRGhCLGVBQU8sQ0FBQ1MsT0FBUixHQUFrQixLQUFsQjtBQUNIO0FBQ0o7O0FBRUQsUUFBSUssT0FBTyxLQUFLLFFBQWhCLEVBQTBCO0FBQ3RCZCxhQUFPLENBQUNtQixhQUFSLEdBQXdCLENBQXhCO0FBQ0g7QUFDSjtBQUVEOzs7OztTQUdBSixVLEdBQUEsb0JBQVdmLE9BQVgsRUFBeUM7QUFDckMsV0FBT0EsT0FBTyxDQUFDYyxPQUFSLENBQWdCTSxXQUFoQixFQUFQO0FBQ0gsRzs7U0FFU2pCLGtCLEdBQVYsOEJBQXFDO0FBQ2pDLFNBQUtVLG9CQUFMLEdBQXlDLElBQUlRLFdBQUosQ0FBZ0IseUJBQWhCLENBQXpDO0FBQ0g7QUFFRDs7Ozs7Ozs7O3dCQUsyQjtBQUN2QixhQUFPLEtBQUtDLFlBQUwsQ0FBa0IsZUFBbEIsQ0FBUDtBQUNIOzs7d0JBQ3FDO0FBQ2xDLGFBQU8sS0FBS0EsWUFBTCxDQUFrQixpQkFBbEIsQ0FBUDtBQUNIO0FBRUQ7Ozs7Ozs7O3dCQUs4QjtBQUMxQixhQUFPLEtBQUtBLFlBQUwsQ0FBa0Isa0JBQWxCLENBQVA7QUFDSDs7O3dCQUN3QztBQUNyQyxhQUFPLEtBQUtBLFlBQUwsQ0FBa0Isb0JBQWxCLENBQVA7QUFDSDtBQUVEOzs7Ozs7Ozt3QkFLNkI7QUFDekIsYUFBTyxLQUFLQSxZQUFMLENBQWtCLGlCQUFsQixDQUFQO0FBQ0g7Ozt3QkFDdUM7QUFDcEMsYUFBTyxLQUFLQSxZQUFMLENBQWtCLG1CQUFsQixDQUFQO0FBQ0g7Ozs7RUExSmtDQyx5RCIsImZpbGUiOiIuL2pzL3l2ZXNfZGVmYXVsdC5mb3JtLWNsZWFyLmxlZ2FjeS5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBDb21wb25lbnQgZnJvbSAnLi4vLi4vLi4vbW9kZWxzL2NvbXBvbmVudCc7XG5cbi8qKlxuICogQGV2ZW50IGZvcm1GaWVsZHNDbGVhckFmdGVyIEFuIGV2ZW50IHdoaWNoIGlzIHRyaWdnZXJlZCBhZnRlciB0aGUgZm9ybSBmaWVsZHMgYXJlIGNsZWFyZWQuXG4gKi9cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIEZvcm1DbGVhciBleHRlbmRzIENvbXBvbmVudCB7XG4gICAgLyoqXG4gICAgICogVGhlIGN1cnJlbnQgZm9ybS5cbiAgICAgKi9cbiAgICBmb3JtOiBIVE1MRWxlbWVudDtcblxuICAgIC8qKlxuICAgICAqIENvbGxlY3Rpb24gb2YgdGhlIHRyaWdnZXJzIGVsZW1lbnRzLlxuICAgICAqL1xuICAgIHRyaWdnZXJzOiBIVE1MRWxlbWVudFtdO1xuXG4gICAgLyoqXG4gICAgICogQ29sbGVjdGlvbiBvZiB0aGUgZm9ybSBlbGVtZW5ldHMuXG4gICAgICovXG4gICAgdGFyZ2V0czogSFRNTEVsZW1lbnRbXTtcblxuICAgIC8qKlxuICAgICAqIENvbGxlY3Rpb24gb2YgdGhlIHRhcmdldHMgZWxlbWVudHMgd2hpY2ggc2hvdWxkIGJlIGlnbm9yZWQgd2hpbGUgY29sbGVjdGlvbiB0aGUgZmlsdGVycy5cbiAgICAgKi9cbiAgICBpZ25vcmVFbGVtZW50czogSFRNTEVsZW1lbnRbXTtcblxuICAgIC8qKlxuICAgICAqIENvbGxlY3Rpb24gb2YgdGhlIGZpbHRlciBlbGVtZW50cy5cbiAgICAgKi9cbiAgICBmaWx0ZXJFbGVtZW50czogSFRNTEVsZW1lbnRbXTtcblxuICAgIC8qKlxuICAgICAqIFRoZSBjdXN0b20gZXZlbnQuXG4gICAgICovXG4gICAgZm9ybUZpZWxkc0NsZWFyQWZ0ZXI6IEN1c3RvbUV2ZW50O1xuXG4gICAgcHJvdGVjdGVkIHJlYWR5Q2FsbGJhY2soKTogdm9pZCB7XG4gICAgICAgIC8qIHRzbGludDpkaXNhYmxlOiBkZXByZWNhdGlvbiAqL1xuICAgICAgICB0aGlzLnRyaWdnZXJzID0gPEhUTUxFbGVtZW50W10+KFxuICAgICAgICAgICAgQXJyYXkuZnJvbShcbiAgICAgICAgICAgICAgICB0aGlzLnRyaWdnZXJDbGFzc05hbWVcbiAgICAgICAgICAgICAgICAgICAgPyBkb2N1bWVudC5nZXRFbGVtZW50c0J5Q2xhc3NOYW1lKHRoaXMudHJpZ2dlckNsYXNzTmFtZSlcbiAgICAgICAgICAgICAgICAgICAgOiBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKHRoaXMudHJpZ2dlclNlbGVjdG9yKSxcbiAgICAgICAgICAgIClcbiAgICAgICAgKTtcbiAgICAgICAgdGhpcy5mb3JtID0gPEhUTUxFbGVtZW50PihcbiAgICAgICAgICAgICh0aGlzLmZvcm1DbGFzc05hbWVcbiAgICAgICAgICAgICAgICA/IGRvY3VtZW50LmdldEVsZW1lbnRzQnlDbGFzc05hbWUodGhpcy5mb3JtQ2xhc3NOYW1lKVswXVxuICAgICAgICAgICAgICAgIDogZG9jdW1lbnQucXVlcnlTZWxlY3Rvcih0aGlzLmZvcm1TZWxlY3RvcikpXG4gICAgICAgICk7XG4gICAgICAgIHRoaXMuaWdub3JlRWxlbWVudHMgPSA8SFRNTEVsZW1lbnRbXT4oXG4gICAgICAgICAgICBBcnJheS5mcm9tKFxuICAgICAgICAgICAgICAgIHRoaXMuaWdub3JlQ2xhc3NOYW1lXG4gICAgICAgICAgICAgICAgICAgID8gdGhpcy5mb3JtLmdldEVsZW1lbnRzQnlDbGFzc05hbWUodGhpcy5pZ25vcmVDbGFzc05hbWUpXG4gICAgICAgICAgICAgICAgICAgIDogdGhpcy5mb3JtLnF1ZXJ5U2VsZWN0b3JBbGwodGhpcy5pZ25vcmVTZWxlY3RvciksXG4gICAgICAgICAgICApXG4gICAgICAgICk7XG4gICAgICAgIC8qIHRzbGludDplbmFibGU6IGRlcHJlY2F0aW9uICovXG4gICAgICAgIGNvbnN0IGZvcm1JbnB1dHMgPSA8SFRNTEVsZW1lbnRbXT5BcnJheS5mcm9tKHRoaXMuZm9ybS5nZXRFbGVtZW50c0J5VGFnTmFtZSgnaW5wdXQnKSk7XG4gICAgICAgIGNvbnN0IGZvcm1TZWxlY3RzID0gPEhUTUxFbGVtZW50W10+QXJyYXkuZnJvbSh0aGlzLmZvcm0uZ2V0RWxlbWVudHNCeVRhZ05hbWUoJ3NlbGVjdCcpKTtcbiAgICAgICAgdGhpcy50YXJnZXRzID0gWy4uLmZvcm1JbnB1dHMsIC4uLmZvcm1TZWxlY3RzXTtcbiAgICAgICAgdGhpcy5maWx0ZXJFbGVtZW50cyA9IHRoaXMudGFyZ2V0cy5maWx0ZXIoKGVsZW1lbnQpID0+ICF0aGlzLmlnbm9yZUVsZW1lbnRzLmluY2x1ZGVzKGVsZW1lbnQpKTtcblxuICAgICAgICB0aGlzLm1hcEV2ZW50cygpO1xuICAgIH1cblxuICAgIHByb3RlY3RlZCBtYXBFdmVudHMoKTogdm9pZCB7XG4gICAgICAgIHRoaXMuY3JlYXRlQ3VzdG9tRXZlbnRzKCk7XG4gICAgICAgIHRoaXMudHJpZ2dlcnMuZm9yRWFjaCgoaW5wdXQpID0+IHtcbiAgICAgICAgICAgIGlucHV0LmFkZEV2ZW50TGlzdGVuZXIoJ2NoYW5nZScsICgpID0+IHRoaXMub25DaGFuZ2UoaW5wdXQpKTtcbiAgICAgICAgfSk7XG4gICAgfVxuXG4gICAgcHJvdGVjdGVkIG9uQ2hhbmdlKGlucHV0OiBIVE1MRWxlbWVudCk6IHZvaWQge1xuICAgICAgICBjb25zdCBpc0NoZWNrZWQgPSAoPEhUTUxJbnB1dEVsZW1lbnQ+aW5wdXQpLmNoZWNrZWQ7XG4gICAgICAgIGlmIChpc0NoZWNrZWQpIHtcbiAgICAgICAgICAgIHRoaXMuY2xlYXJGb3JtVmFsdWVzKCk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBDbGVhcnMgYW4gYXJyYXkgb2YgdGhlIGZvcm0gZWxlbWVudHMgYW5kIHRyaWdnZXJzIHRoZSBjdXN0b20gZXZlbnQgZm9ybUZpZWxkc0NsZWFyQWZ0ZXIuXG4gICAgICogQHBhcmFtIGVsZW1lbnQgSFRNTEZvcm1FbGVtZW50IGlzIHRoZSBlbGVtZW50IGZvciBjbGVhciBhY3Rpb24uXG4gICAgICovXG4gICAgY2xlYXJGb3JtVmFsdWVzKCk6IHZvaWQge1xuICAgICAgICB0aGlzLmZpbHRlckVsZW1lbnRzLmZvckVhY2goKGVsZW1lbnQ6IEhUTUxGb3JtRWxlbWVudCkgPT4ge1xuICAgICAgICAgICAgdGhpcy5jbGVhckZvcm1GaWVsZChlbGVtZW50KTtcbiAgICAgICAgfSk7XG5cbiAgICAgICAgdGhpcy5kaXNwYXRjaEV2ZW50KHRoaXMuZm9ybUZpZWxkc0NsZWFyQWZ0ZXIpO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIENsZWFycyBjdXJyZW50IGZvcm0gZmllbGQuXG4gICAgICogQHBhcmFtIGVsZW1lbnQgSFRNTEZvcm1FbGVtZW50IGlzIHRoZSBlbGVtZW50IGZvciBjbGVhciBhY3Rpb24uXG4gICAgICovXG4gICAgY2xlYXJGb3JtRmllbGQoZWxlbWVudDogSFRNTEZvcm1FbGVtZW50KTogdm9pZCB7XG4gICAgICAgIGNvbnN0IHRhZ05hbWUgPSB0aGlzLmdldFRhZ05hbWUoZWxlbWVudCk7XG4gICAgICAgIGlmICh0YWdOYW1lID09PSAnSU5QVVQnKSB7XG4gICAgICAgICAgICBjb25zdCBpbnB1dFR5cGUgPSBlbGVtZW50LnR5cGU7XG5cbiAgICAgICAgICAgIGlmIChpbnB1dFR5cGUgPT09ICd0ZXh0JyB8fCBpbnB1dFR5cGUgPT09ICdoaWRkZW4nKSB7XG4gICAgICAgICAgICAgICAgZWxlbWVudC52YWx1ZSA9ICcnO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaWYgKGlucHV0VHlwZSA9PT0gJ2NoZWNrYm94JyB8fCBpbnB1dFR5cGUgPT09ICdyYWRpbycpIHtcbiAgICAgICAgICAgICAgICBlbGVtZW50LmNoZWNrZWQgPSBmYWxzZTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgIGlmICh0YWdOYW1lID09PSAnU0VMRUNUJykge1xuICAgICAgICAgICAgZWxlbWVudC5zZWxlY3RlZEluZGV4ID0gMDtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIC8qKlxuICAgICAqIEdldHMgYSB0YWcgbmFtZSBvZiB0aGUgY3VycmVudCBlbGVtZW50LlxuICAgICAqL1xuICAgIGdldFRhZ05hbWUoZWxlbWVudDogSFRNTEVsZW1lbnQpOiBzdHJpbmcge1xuICAgICAgICByZXR1cm4gZWxlbWVudC50YWdOYW1lLnRvVXBwZXJDYXNlKCk7XG4gICAgfVxuXG4gICAgcHJvdGVjdGVkIGNyZWF0ZUN1c3RvbUV2ZW50cygpOiB2b2lkIHtcbiAgICAgICAgdGhpcy5mb3JtRmllbGRzQ2xlYXJBZnRlciA9IDxDdXN0b21FdmVudD5uZXcgQ3VzdG9tRXZlbnQoJ2Zvcm0tZmllbGRzLWNsZWFyLWFmdGVyJyk7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogR2V0cyBhIHF1ZXJ5U2VsZWN0b3IgbmFtZSBvZiB0aGUgZm9ybS5cbiAgICAgKlxuICAgICAqIEBkZXByZWNhdGVkIFVzZSBmb3JtQ2xhc3NOYW1lKCkgaW5zdGVhZC5cbiAgICAgKi9cbiAgICBnZXQgZm9ybVNlbGVjdG9yKCk6IHN0cmluZyB7XG4gICAgICAgIHJldHVybiB0aGlzLmdldEF0dHJpYnV0ZSgnZm9ybS1zZWxlY3RvcicpO1xuICAgIH1cbiAgICBwcm90ZWN0ZWQgZ2V0IGZvcm1DbGFzc05hbWUoKTogc3RyaW5nIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuZ2V0QXR0cmlidXRlKCdmb3JtLWNsYXNzLW5hbWUnKTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBHZXRzIGEgcXVlcnlTZWxlY3RvciBuYW1lIG9mIHRoZSB0cmlnZ2VyIGVsZW1lbnQuXG4gICAgICpcbiAgICAgKiBAZGVwcmVjYXRlZCBVc2UgdHJpZ2dlckNsYXNzTmFtZSgpIGluc3RlYWQuXG4gICAgICovXG4gICAgZ2V0IHRyaWdnZXJTZWxlY3RvcigpOiBzdHJpbmcge1xuICAgICAgICByZXR1cm4gdGhpcy5nZXRBdHRyaWJ1dGUoJ3RyaWdnZXItc2VsZWN0b3InKTtcbiAgICB9XG4gICAgcHJvdGVjdGVkIGdldCB0cmlnZ2VyQ2xhc3NOYW1lKCk6IHN0cmluZyB7XG4gICAgICAgIHJldHVybiB0aGlzLmdldEF0dHJpYnV0ZSgndHJpZ2dlci1jbGFzcy1uYW1lJyk7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogR2V0cyBhIHF1ZXJ5U2VsZWN0b3IgbmFtZSBvZiB0aGUgaWdub3JlIGVsZW1lbnQuXG4gICAgICpcbiAgICAgKiBAZGVwcmVjYXRlZCBVc2UgaWdub3JlQ2xhc3NOYW1lKCkgaW5zdGVhZC5cbiAgICAgKi9cbiAgICBnZXQgaWdub3JlU2VsZWN0b3IoKTogc3RyaW5nIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuZ2V0QXR0cmlidXRlKCdpZ25vcmUtc2VsZWN0b3InKTtcbiAgICB9XG4gICAgcHJvdGVjdGVkIGdldCBpZ25vcmVDbGFzc05hbWUoKTogc3RyaW5nIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuZ2V0QXR0cmlidXRlKCdpZ25vcmUtY2xhc3MtbmFtZScpO1xuICAgIH1cbn1cbiJdLCJzb3VyY2VSb290IjoiIn0=