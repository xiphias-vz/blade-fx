(window["webpackJsonp_yves_default"] = window["webpackJsonp_yves_default"] || []).push([["validate-next-checkout-step"],{

/***/ "./vendor/spryker-shop/checkout-page/src/SprykerShop/Yves/CheckoutPage/Theme/default/components/molecules/validate-next-checkout-step/validate-next-checkout-step.ts":
/*!***************************************************************************************************************************************************************************!*\
  !*** ./vendor/spryker-shop/checkout-page/src/SprykerShop/Yves/CheckoutPage/Theme/default/components/molecules/validate-next-checkout-step/validate-next-checkout-step.ts ***!
  \***************************************************************************************************************************************************************************/
/*! exports provided: EVENT_INIT, default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "EVENT_INIT", function() { return EVENT_INIT; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return ValidateNextCheckoutStep; });
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


var EVENT_INIT = 'afterInit';
/**
 * @event afterInit An event emitted when the component has been initialized.
 */

var ValidateNextCheckoutStep = /*#__PURE__*/function (_Component) {
  _babel_runtime_helpers_inheritsLoose__WEBPACK_IMPORTED_MODULE_4___default()(ValidateNextCheckoutStep, _Component);

  var _super = _createSuper(ValidateNextCheckoutStep);

  function ValidateNextCheckoutStep() {
    var _this;

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this = _Component.call.apply(_Component, [this].concat(args)) || this;

    _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_5___default()(_babel_runtime_helpers_assertThisInitialized__WEBPACK_IMPORTED_MODULE_1___default()(_this), "containers", void 0);

    _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_5___default()(_babel_runtime_helpers_assertThisInitialized__WEBPACK_IMPORTED_MODULE_1___default()(_this), "triggers", void 0);

    _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_5___default()(_babel_runtime_helpers_assertThisInitialized__WEBPACK_IMPORTED_MODULE_1___default()(_this), "target", void 0);

    _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_5___default()(_babel_runtime_helpers_assertThisInitialized__WEBPACK_IMPORTED_MODULE_1___default()(_this), "dropdownTriggers", void 0);

    _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_5___default()(_babel_runtime_helpers_assertThisInitialized__WEBPACK_IMPORTED_MODULE_1___default()(_this), "parentTarget", void 0);

    _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_5___default()(_babel_runtime_helpers_assertThisInitialized__WEBPACK_IMPORTED_MODULE_1___default()(_this), "requiredFormFieldSelectors", 'select[required], input[required]');

    return _this;
  }

  var _proto = ValidateNextCheckoutStep.prototype;

  _proto.readyCallback = function readyCallback() {};

  _proto.init = function init() {
    this.containers = Array.from(document.querySelectorAll(this.containerSelector));
    this.target = document.querySelector(this.targetSelector);
    this.dropdownTriggers = Array.from(document.querySelectorAll(this.dropdownTriggerSelector));

    if (this.parentTargetClassName) {
      this.parentTarget = document.getElementsByClassName(this.parentTargetClassName)[0];
    }

    if (this.isTriggerEnabled) {
      this.initTriggerState();
    }

    this.dispatchCustomEvent(EVENT_INIT);
  };

  _proto.mapEvents = function mapEvents() {
    var _this2 = this;

    this.mapTriggerEvents();
    this.dropdownTriggers.forEach(function (element) {
      element.addEventListener('change', function () {
        return _this2.onDropdownTriggerChange();
      });
    });

    if (this.parentTarget) {
      this.parentTarget.addEventListener('toggleForm', function () {
        return _this2.onDropdownTriggerChange();
      });
    }
  };

  _proto.mapTriggerEvents = function mapTriggerEvents() {
    var _this3 = this;

    if (this.triggers) {
      this.triggers.forEach(function (element) {
        element.addEventListener('input', function () {
          return _this3.onTriggerInput();
        });
      });
    }
  }
  /**
   * Init the methods, which fill the collection of form fields and toggle disabling of button.
   */
  ;

  _proto.initTriggerState = function initTriggerState() {
    this.fillFormFieldsCollection();
    this.toggleDisablingNextStepButton();
    this.mapEvents();
  };

  _proto.fillFormFieldsCollection = function fillFormFieldsCollection() {
    var _this4 = this;

    this.triggers = [];

    if (!this.containers) {
      return;
    }

    this.triggers = this.containers.reduce(function (collection, element) {
      if (!element.classList.contains(_this4.classToToggle)) {
        collection.push.apply(collection, Array.from(element.querySelectorAll(_this4.requiredFormFieldSelectors)));
      }

      return collection;
    }, []);
  };

  _proto.onTriggerInput = function onTriggerInput() {
    this.fillFormFieldsCollection();
    this.toggleDisablingNextStepButton();
  };

  _proto.onDropdownTriggerChange = function onDropdownTriggerChange() {
    this.onTriggerInput();
    this.mapTriggerEvents();
  };

  _proto.toggleDisablingNextStepButton = function toggleDisablingNextStepButton() {
    if (!this.target) {
      return;
    }

    if (this.isFormFieldsEmpty || this.isDropdownTriggerPreSelected) {
      this.disableNextStepButton(true);
      return;
    }

    this.disableNextStepButton(false);
  }
  /**
   * Removes/Sets the disabled attribute for target element.
   */
  ;

  _proto.disableNextStepButton = function disableNextStepButton(isDisabled) {
    if (this.target) {
      this.target.disabled = isDisabled;
    }
  };

  _babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_0___default()(ValidateNextCheckoutStep, [{
    key: "isDropdownTriggerPreSelected",
    get: function get() {
      return this.dropdownTriggers.some(function (element) {
        return !element.value;
      });
    }
    /**
     * Checks if the form fields are empty.
     */

  }, {
    key: "isFormFieldsEmpty",
    get: function get() {
      return this.triggers.some(function (element) {
        return !element.value;
      });
    }
    /**
     * Gets a querySelector name of the target element.
     */

  }, {
    key: "targetSelector",
    get: function get() {
      return this.getAttribute('target-selector');
    }
    /**
     * Gets a querySelector name of the form element.
     */

  }, {
    key: "containerSelector",
    get: function get() {
      return this.getAttribute('container-selector');
    }
    /**
     * Gets a querySelector name of the dropdown trigger element.
     */

  }, {
    key: "dropdownTriggerSelector",
    get: function get() {
      return this.getAttribute('dropdown-trigger-selector');
    }
    /**
     * Checks if the trigger element is enabled.
     */

  }, {
    key: "isTriggerEnabled",
    get: function get() {
      return this.hasAttribute('is-enable');
    }
    /**
     * Gets a class name for the toggle action.
     */

  }, {
    key: "classToToggle",
    get: function get() {
      return this.getAttribute('class-to-toggle');
    }
  }, {
    key: "parentTargetClassName",
    get: function get() {
      return this.getAttribute('parent-target-class-name');
    }
  }]);

  return ValidateNextCheckoutStep;
}(ShopUi_models_component__WEBPACK_IMPORTED_MODULE_6__["default"]);



/***/ })

}]);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vLi92ZW5kb3Ivc3ByeWtlci1zaG9wL2NoZWNrb3V0LXBhZ2Uvc3JjL1NwcnlrZXJTaG9wL1l2ZXMvQ2hlY2tvdXRQYWdlL1RoZW1lL2RlZmF1bHQvY29tcG9uZW50cy9tb2xlY3VsZXMvdmFsaWRhdGUtbmV4dC1jaGVja291dC1zdGVwL3ZhbGlkYXRlLW5leHQtY2hlY2tvdXQtc3RlcC50cyJdLCJuYW1lcyI6WyJFVkVOVF9JTklUIiwiVmFsaWRhdGVOZXh0Q2hlY2tvdXRTdGVwIiwicmVhZHlDYWxsYmFjayIsImluaXQiLCJjb250YWluZXJzIiwiQXJyYXkiLCJmcm9tIiwiZG9jdW1lbnQiLCJxdWVyeVNlbGVjdG9yQWxsIiwiY29udGFpbmVyU2VsZWN0b3IiLCJ0YXJnZXQiLCJxdWVyeVNlbGVjdG9yIiwidGFyZ2V0U2VsZWN0b3IiLCJkcm9wZG93blRyaWdnZXJzIiwiZHJvcGRvd25UcmlnZ2VyU2VsZWN0b3IiLCJwYXJlbnRUYXJnZXRDbGFzc05hbWUiLCJwYXJlbnRUYXJnZXQiLCJnZXRFbGVtZW50c0J5Q2xhc3NOYW1lIiwiaXNUcmlnZ2VyRW5hYmxlZCIsImluaXRUcmlnZ2VyU3RhdGUiLCJkaXNwYXRjaEN1c3RvbUV2ZW50IiwibWFwRXZlbnRzIiwibWFwVHJpZ2dlckV2ZW50cyIsImZvckVhY2giLCJlbGVtZW50IiwiYWRkRXZlbnRMaXN0ZW5lciIsIm9uRHJvcGRvd25UcmlnZ2VyQ2hhbmdlIiwidHJpZ2dlcnMiLCJvblRyaWdnZXJJbnB1dCIsImZpbGxGb3JtRmllbGRzQ29sbGVjdGlvbiIsInRvZ2dsZURpc2FibGluZ05leHRTdGVwQnV0dG9uIiwicmVkdWNlIiwiY29sbGVjdGlvbiIsImNsYXNzTGlzdCIsImNvbnRhaW5zIiwiY2xhc3NUb1RvZ2dsZSIsInB1c2giLCJyZXF1aXJlZEZvcm1GaWVsZFNlbGVjdG9ycyIsImlzRm9ybUZpZWxkc0VtcHR5IiwiaXNEcm9wZG93blRyaWdnZXJQcmVTZWxlY3RlZCIsImRpc2FibGVOZXh0U3RlcEJ1dHRvbiIsImlzRGlzYWJsZWQiLCJkaXNhYmxlZCIsInNvbWUiLCJ2YWx1ZSIsImdldEF0dHJpYnV0ZSIsImhhc0F0dHJpYnV0ZSIsIkNvbXBvbmVudCJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUFBO0FBRU8sSUFBTUEsVUFBVSxHQUFHLFdBQW5CO0FBRVA7Ozs7SUFHcUJDLHdCOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Mk1BTXVDLG1DOzs7Ozs7O1NBRTlDQyxhLEdBQVYseUJBQWdDLENBQUUsQzs7U0FFeEJDLEksR0FBVixnQkFBdUI7QUFDbkIsU0FBS0MsVUFBTCxHQUFpQ0MsS0FBSyxDQUFDQyxJQUFOLENBQVdDLFFBQVEsQ0FBQ0MsZ0JBQVQsQ0FBMEIsS0FBS0MsaUJBQS9CLENBQVgsQ0FBakM7QUFDQSxTQUFLQyxNQUFMLEdBQWlDSCxRQUFRLENBQUNJLGFBQVQsQ0FBdUIsS0FBS0MsY0FBNUIsQ0FBakM7QUFDQSxTQUFLQyxnQkFBTCxHQUNJUixLQUFLLENBQUNDLElBQU4sQ0FBV0MsUUFBUSxDQUFDQyxnQkFBVCxDQUEwQixLQUFLTSx1QkFBL0IsQ0FBWCxDQURKOztBQUlBLFFBQUksS0FBS0MscUJBQVQsRUFBZ0M7QUFDNUIsV0FBS0MsWUFBTCxHQUFpQ1QsUUFBUSxDQUFDVSxzQkFBVCxDQUFnQyxLQUFLRixxQkFBckMsRUFBNEQsQ0FBNUQsQ0FBakM7QUFDSDs7QUFFRCxRQUFJLEtBQUtHLGdCQUFULEVBQTJCO0FBQ3ZCLFdBQUtDLGdCQUFMO0FBQ0g7O0FBRUQsU0FBS0MsbUJBQUwsQ0FBeUJwQixVQUF6QjtBQUNILEc7O1NBRVNxQixTLEdBQVYscUJBQTRCO0FBQUE7O0FBQ3hCLFNBQUtDLGdCQUFMO0FBRUEsU0FBS1QsZ0JBQUwsQ0FBc0JVLE9BQXRCLENBQThCLFVBQUNDLE9BQUQsRUFBZ0M7QUFDMURBLGFBQU8sQ0FBQ0MsZ0JBQVIsQ0FBeUIsUUFBekIsRUFBbUM7QUFBQSxlQUFNLE1BQUksQ0FBQ0Ms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QkFHZ0M7QUFDNUIsYUFBTyxLQUFLQyxZQUFMLENBQWtCLFdBQWxCLENBQVA7QUFDSDtBQUVEOzs7Ozs7d0JBRzRCO0FBQ3hCLGFBQU8sS0FBS0QsWUFBTCxDQUFrQixpQkFBbEIsQ0FBUDtBQUNIOzs7d0JBRTZDO0FBQzFDLGFBQU8sS0FBS0EsWUFBTCxDQUFrQiwwQkFBbEIsQ0FBUDtBQUNIOzs7O0VBNUppREUsK0QiLCJmaWxlIjoiLi9qcy95dmVzX2RlZmF1bHQudmFsaWRhdGUtbmV4dC1jaGVja291dC1zdGVwLmxlZ2FjeS5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBDb21wb25lbnQgZnJvbSAnU2hvcFVpL21vZGVscy9jb21wb25lbnQnO1xuXG5leHBvcnQgY29uc3QgRVZFTlRfSU5JVCA9ICdhZnRlckluaXQnO1xuXG4vKipcbiAqIEBldmVudCBhZnRlckluaXQgQW4gZXZlbnQgZW1pdHRlZCB3aGVuIHRoZSBjb21wb25lbnQgaGFzIGJlZW4gaW5pdGlhbGl6ZWQuXG4gKi9cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIFZhbGlkYXRlTmV4dENoZWNrb3V0U3RlcCBleHRlbmRzIENvbXBvbmVudCB7XG4gICAgcHJvdGVjdGVkIGNvbnRhaW5lcnM6IEhUTUxFbGVtZW50W107XG4gICAgcHJvdGVjdGVkIHRyaWdnZXJzOiBIVE1MRm9ybUVsZW1lbnRbXTtcbiAgICBwcm90ZWN0ZWQgdGFyZ2V0OiBIVE1MQnV0dG9uRWxlbWVudDtcbiAgICBwcm90ZWN0ZWQgZHJvcGRvd25UcmlnZ2VyczogSFRNTFNlbGVjdEVsZW1lbnRbXTtcbiAgICBwcm90ZWN0ZWQgcGFyZW50VGFyZ2V0OiBIVE1MRWxlbWVudDtcbiAgICBwcm90ZWN0ZWQgcmVhZG9ubHkgcmVxdWlyZWRGb3JtRmllbGRTZWxlY3RvcnM6IHN0cmluZyA9ICdzZWxlY3RbcmVxdWlyZWRdLCBpbnB1dFtyZXF1aXJlZF0nO1xuXG4gICAgcHJvdGVjdGVkIHJlYWR5Q2FsbGJhY2soKTogdm9pZCB7fVxuXG4gICAgcHJvdGVjdGVkIGluaXQoKTogdm9pZCB7XG4gICAgICAgIHRoaXMuY29udGFpbmVycyA9IDxIVE1MRWxlbWVudFtdPkFycmF5LmZyb20oZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbCh0aGlzLmNvbnRhaW5lclNlbGVjdG9yKSk7XG4gICAgICAgIHRoaXMudGFyZ2V0ID0gPEhUTUxCdXR0b25FbGVtZW50PmRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IodGhpcy50YXJnZXRTZWxlY3Rvcik7XG4gICAgICAgIHRoaXMuZHJvcGRvd25UcmlnZ2VycyA9IDxIVE1MU2VsZWN0RWxlbWVudFtdPihcbiAgICAgICAgICAgIEFycmF5LmZyb20oZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbCh0aGlzLmRyb3Bkb3duVHJpZ2dlclNlbGVjdG9yKSlcbiAgICAgICAgKTtcblxuICAgICAgICBpZiAodGhpcy5wYXJlbnRUYXJnZXRDbGFzc05hbWUpIHtcbiAgICAgICAgICAgIHRoaXMucGFyZW50VGFyZ2V0ID0gPEhUTUxFbGVtZW50PmRvY3VtZW50LmdldEVsZW1lbnRzQnlDbGFzc05hbWUodGhpcy5wYXJlbnRUYXJnZXRDbGFzc05hbWUpWzBdO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKHRoaXMuaXNUcmlnZ2VyRW5hYmxlZCkge1xuICAgICAgICAgICAgdGhpcy5pbml0VHJpZ2dlclN0YXRlKCk7XG4gICAgICAgIH1cblxuICAgICAgICB0aGlzLmRpc3BhdGNoQ3VzdG9tRXZlbnQoRVZFTlRfSU5JVCk7XG4gICAgfVxuXG4gICAgcHJvdGVjdGVkIG1hcEV2ZW50cygpOiB2b2lkIHtcbiAgICAgICAgdGhpcy5tYXBUcmlnZ2VyRXZlbnRzKCk7XG5cbiAgICAgICAgdGhpcy5kcm9wZG93blRyaWdnZXJzLmZvckVhY2goKGVsZW1lbnQ6IEhUTUxTZWxlY3RFbGVtZW50KSA9PiB7XG4gICAgICAgICAgICBlbGVtZW50LmFkZEV2ZW50TGlzdGVuZXIoJ2NoYW5nZScsICgpID0+IHRoaXMub25Ecm9wZG93blRyaWdnZXJDaGFuZ2UoKSk7XG4gICAgICAgIH0pO1xuXG4gICAgICAgIGlmICh0aGlzLnBhcmVudFRhcmdldCkge1xuICAgICAgICAgICAgdGhpcy5wYXJlbnRUYXJnZXQuYWRkRXZlbnRMaXN0ZW5lcigndG9nZ2xlRm9ybScsICgpID0+IHRoaXMub25Ecm9wZG93blRyaWdnZXJDaGFuZ2UoKSk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBwcm90ZWN0ZWQgbWFwVHJpZ2dlckV2ZW50cygpOiB2b2lkIHtcbiAgICAgICAgaWYgKHRoaXMudHJpZ2dlcnMpIHtcbiAgICAgICAgICAgIHRoaXMudHJpZ2dlcnMuZm9yRWFjaCgoZWxlbWVudDogSFRNTEZvcm1FbGVtZW50KSA9PiB7XG4gICAgICAgICAgICAgICAgZWxlbWVudC5hZGRFdmVudExpc3RlbmVyKCdpbnB1dCcsICgpID0+IHRoaXMub25UcmlnZ2VySW5wdXQoKSk7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIC8qKlxuICAgICAqIEluaXQgdGhlIG1ldGhvZHMsIHdoaWNoIGZpbGwgdGhlIGNvbGxlY3Rpb24gb2YgZm9ybSBmaWVsZHMgYW5kIHRvZ2dsZSBkaXNhYmxpbmcgb2YgYnV0dG9uLlxuICAgICAqL1xuICAgIGluaXRUcmlnZ2VyU3RhdGUoKTogdm9pZCB7XG4gICAgICAgIHRoaXMuZmlsbEZvcm1GaWVsZHNDb2xsZWN0aW9uKCk7XG4gICAgICAgIHRoaXMudG9nZ2xlRGlzYWJsaW5nTmV4dFN0ZXBCdXR0b24oKTtcbiAgICAgICAgdGhpcy5tYXBFdmVudHMoKTtcbiAgICB9XG5cbiAgICBwcm90ZWN0ZWQgZmlsbEZvcm1GaWVsZHNDb2xsZWN0aW9uKCk6IHZvaWQge1xuICAgICAgICB0aGlzLnRyaWdnZXJzID0gW107XG5cbiAgICAgICAgaWYgKCF0aGlzLmNvbnRhaW5lcnMpIHtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuXG4gICAgICAgIHRoaXMudHJpZ2dlcnMgPSA8SFRNTEZvcm1FbGVtZW50W10+dGhpcy5jb250YWluZXJzLnJlZHVjZSgoY29sbGVjdGlvbjogSFRNTEVsZW1lbnRbXSwgZWxlbWVudDogSFRNTEVsZW1lbnQpID0+IHtcbiAgICAgICAgICAgIGlmICghZWxlbWVudC5jbGFzc0xpc3QuY29udGFpbnModGhpcy5jbGFzc1RvVG9nZ2xlKSkge1xuICAgICAgICAgICAgICAgIGNvbGxlY3Rpb24ucHVzaChcbiAgICAgICAgICAgICAgICAgICAgLi4uKDxIVE1MRm9ybUVsZW1lbnRbXT5BcnJheS5mcm9tKGVsZW1lbnQucXVlcnlTZWxlY3RvckFsbCh0aGlzLnJlcXVpcmVkRm9ybUZpZWxkU2VsZWN0b3JzKSkpLFxuICAgICAgICAgICAgICAgICk7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIHJldHVybiBjb2xsZWN0aW9uO1xuICAgICAgICB9LCBbXSk7XG4gICAgfVxuXG4gICAgcHJvdGVjdGVkIG9uVHJpZ2dlcklucHV0KCk6IHZvaWQge1xuICAgICAgICB0aGlzLmZpbGxGb3JtRmllbGRzQ29sbGVjdGlvbigpO1xuICAgICAgICB0aGlzLnRvZ2dsZURpc2FibGluZ05leHRTdGVwQnV0dG9uKCk7XG4gICAgfVxuXG4gICAgcHJvdGVjdGVkIG9uRHJvcGRvd25UcmlnZ2VyQ2hhbmdlKCk6IHZvaWQge1xuICAgICAgICB0aGlzLm9uVHJpZ2dlcklucHV0KCk7XG4gICAgICAgIHRoaXMubWFwVHJpZ2dlckV2ZW50cygpO1xuICAgIH1cblxuICAgIHByb3RlY3RlZCB0b2dnbGVEaXNhYmxpbmdOZXh0U3RlcEJ1dHRvbigpOiB2b2lkIHtcbiAgICAgICAgaWYgKCF0aGlzLnRhcmdldCkge1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKHRoaXMuaXNGb3JtRmllbGRzRW1wdHkgfHwgdGhpcy5pc0Ryb3Bkb3duVHJpZ2dlclByZVNlbGVjdGVkKSB7XG4gICAgICAgICAgICB0aGlzLmRpc2FibGVOZXh0U3RlcEJ1dHRvbih0cnVlKTtcblxuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG5cbiAgICAgICAgdGhpcy5kaXNhYmxlTmV4dFN0ZXBCdXR0b24oZmFsc2UpO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIFJlbW92ZXMvU2V0cyB0aGUgZGlzYWJsZWQgYXR0cmlidXRlIGZvciB0YXJnZXQgZWxlbWVudC5cbiAgICAgKi9cbiAgICBkaXNhYmxlTmV4dFN0ZXBCdXR0b24oaXNEaXNhYmxlZDogYm9vbGVhbik6IHZvaWQge1xuICAgICAgICBpZiAodGhpcy50YXJnZXQpIHtcbiAgICAgICAgICAgIHRoaXMudGFyZ2V0LmRpc2FibGVkID0gaXNEaXNhYmxlZDtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIHByb3RlY3RlZCBnZXQgaXNEcm9wZG93blRyaWdnZXJQcmVTZWxlY3RlZCgpOiBib29sZWFuIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuZHJvcGRvd25UcmlnZ2Vycy5zb21lKChlbGVtZW50OiBIVE1MU2VsZWN0RWxlbWVudCkgPT4gIWVsZW1lbnQudmFsdWUpO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIENoZWNrcyBpZiB0aGUgZm9ybSBmaWVsZHMgYXJlIGVtcHR5LlxuICAgICAqL1xuICAgIGdldCBpc0Zvcm1GaWVsZHNFbXB0eSgpOiBib29sZWFuIHtcbiAgICAgICAgcmV0dXJuIHRoaXMudHJpZ2dlcnMuc29tZSgoZWxlbWVudDogSFRNTEZvcm1FbGVtZW50KSA9PiAhZWxlbWVudC52YWx1ZSk7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogR2V0cyBhIHF1ZXJ5U2VsZWN0b3IgbmFtZSBvZiB0aGUgdGFyZ2V0IGVsZW1lbnQuXG4gICAgICovXG4gICAgZ2V0IHRhcmdldFNlbGVjdG9yKCk6IHN0cmluZyB7XG4gICAgICAgIHJldHVybiB0aGlzLmdldEF0dHJpYnV0ZSgndGFyZ2V0LXNlbGVjdG9yJyk7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogR2V0cyBhIHF1ZXJ5U2VsZWN0b3IgbmFtZSBvZiB0aGUgZm9ybSBlbGVtZW50LlxuICAgICAqL1xuICAgIGdldCBjb250YWluZXJTZWxlY3RvcigpOiBzdHJpbmcge1xuICAgICAgICByZXR1cm4gdGhpcy5nZXRBdHRyaWJ1dGUoJ2NvbnRhaW5lci1zZWxlY3RvcicpO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIEdldHMgYSBxdWVyeVNlbGVjdG9yIG5hbWUgb2YgdGhlIGRyb3Bkb3duIHRyaWdnZXIgZWxlbWVudC5cbiAgICAgKi9cbiAgICBnZXQgZHJvcGRvd25UcmlnZ2VyU2VsZWN0b3IoKTogc3RyaW5nIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuZ2V0QXR0cmlidXRlKCdkcm9wZG93bi10cmlnZ2VyLXNlbGVjdG9yJyk7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogQ2hlY2tzIGlmIHRoZSB0cmlnZ2VyIGVsZW1lbnQgaXMgZW5hYmxlZC5cbiAgICAgKi9cbiAgICBnZXQgaXNUcmlnZ2VyRW5hYmxlZCgpOiBib29sZWFuIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuaGFzQXR0cmlidXRlKCdpcy1lbmFibGUnKTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBHZXRzIGEgY2xhc3MgbmFtZSBmb3IgdGhlIHRvZ2dsZSBhY3Rpb24uXG4gICAgICovXG4gICAgZ2V0IGNsYXNzVG9Ub2dnbGUoKTogc3RyaW5nIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuZ2V0QXR0cmlidXRlKCdjbGFzcy10by10b2dnbGUnKTtcbiAgICB9XG5cbiAgICBwcm90ZWN0ZWQgZ2V0IHBhcmVudFRhcmdldENsYXNzTmFtZSgpOiBzdHJpbmcge1xuICAgICAgICByZXR1cm4gdGhpcy5nZXRBdHRyaWJ1dGUoJ3BhcmVudC10YXJnZXQtY2xhc3MtbmFtZScpO1xuICAgIH1cbn1cbiJdLCJzb3VyY2VSb290IjoiIn0=