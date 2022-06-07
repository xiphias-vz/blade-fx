(window["webpackJsonp_yves_default"] = window["webpackJsonp_yves_default"] || []).push([["separate-returns-by-merchant"],{

/***/ "./vendor/spryker-shop/merchant-sales-return-widget/src/SprykerShop/Yves/MerchantSalesReturnWidget/Theme/default/components/molecules/separate-returns-by-merchant/separate-returns-by-merchant.ts":
/*!*********************************************************************************************************************************************************************************************************!*\
  !*** ./vendor/spryker-shop/merchant-sales-return-widget/src/SprykerShop/Yves/MerchantSalesReturnWidget/Theme/default/components/molecules/separate-returns-by-merchant/separate-returns-by-merchant.ts ***!
  \*********************************************************************************************************************************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return SeparateReturnsByMerchant; });
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



var SeparateReturnsByMerchant = /*#__PURE__*/function (_Component) {
  _babel_runtime_helpers_inheritsLoose__WEBPACK_IMPORTED_MODULE_4___default()(SeparateReturnsByMerchant, _Component);

  var _super = _createSuper(SeparateReturnsByMerchant);

  function SeparateReturnsByMerchant() {
    var _this;

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this = _Component.call.apply(_Component, [this].concat(args)) || this;

    _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_5___default()(_babel_runtime_helpers_assertThisInitialized__WEBPACK_IMPORTED_MODULE_1___default()(_this), "checkboxes", void 0);

    _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_5___default()(_babel_runtime_helpers_assertThisInitialized__WEBPACK_IMPORTED_MODULE_1___default()(_this), "merchantReferenceName", void 0);

    _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_5___default()(_babel_runtime_helpers_assertThisInitialized__WEBPACK_IMPORTED_MODULE_1___default()(_this), "checkedItems", void 0);

    _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_5___default()(_babel_runtime_helpers_assertThisInitialized__WEBPACK_IMPORTED_MODULE_1___default()(_this), "checkboxComponentClassname", void 0);

    _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_5___default()(_babel_runtime_helpers_assertThisInitialized__WEBPACK_IMPORTED_MODULE_1___default()(_this), "checkboxDisabledComponentClassname", void 0);

    return _this;
  }

  var _proto = SeparateReturnsByMerchant.prototype;

  _proto.readyCallback = function readyCallback() {};

  _proto.init = function init() {
    this.checkedItems = [];
    this.merchantReferenceName = this.merchantReference;
    this.checkboxes = Array.from(document.getElementsByClassName(this.checkboxClassname));
    this.checkboxComponentClassname = this.checkboxComponentClass;
    this.checkboxDisabledComponentClassname = this.checkboxDisabledComponentClass;
    this.mapEvents();
  };

  _proto.mapEvents = function mapEvents() {
    this.checkboxToggleAction();
  };

  _proto.checkboxToggleAction = function checkboxToggleAction() {
    var _this2 = this;

    this.checkboxes.map(function (checkbox) {
      checkbox.addEventListener('change', function (event) {
        var target = event.target;
        target.checked ? _this2.onAddCheckedItem(target) : _this2.onRemoveCheckedItems();
      });
    });
  };

  _proto.onAddCheckedItem = function onAddCheckedItem(item) {
    this.checkedItems.push(item);
    this.disableItem(item);
  };

  _proto.onRemoveCheckedItems = function onRemoveCheckedItems() {
    this.checkedItems = this.checkedItems.filter(function (item) {
      return item.checked;
    });

    if (this.checkedItems.length) {
      return;
    }

    this.enableAllItems();
  };

  _proto.getCheckedItems = function getCheckedItems(target) {
    this.checkedItems = this.checkboxes.filter(function (checkbox) {
      return checkbox.checked;
    });
  };

  _proto.disableItem = function disableItem(target) {
    var _this3 = this;

    var currentMerchantReference = target.getAttribute(this.merchantReference);
    var checkboxesToDisable = this.checkboxes.filter(function (checkbox) {
      return checkbox.getAttribute(_this3.merchantReference) !== currentMerchantReference;
    });
    checkboxesToDisable.map(function (checkbox) {
      checkbox.disabled = true;
      checkbox.closest("." + _this3.checkboxComponentClassname).classList.add("." + _this3.checkboxDisabledComponentClassname);
    });
  };

  _proto.enableAllItems = function enableAllItems() {
    var _this4 = this;

    this.checkboxes.map(function (checkbox) {
      if (!checkbox.hasAttribute(_this4.isReturnable)) {
        return;
      }

      checkbox.disabled = false;
      checkbox.closest("." + _this4.checkboxComponentClassname).classList.remove("." + _this4.checkboxDisabledComponentClassname);
    });
  };

  _babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_0___default()(SeparateReturnsByMerchant, [{
    key: "merchantReference",
    get: function get() {
      return this.getAttribute('merchant-reference-attribute-name');
    }
  }, {
    key: "checkboxClassname",
    get: function get() {
      return this.getAttribute('checkbox-classname');
    }
  }, {
    key: "productItemClassname",
    get: function get() {
      return this.getAttribute('product-item-classname');
    }
  }, {
    key: "checkboxComponentClass",
    get: function get() {
      return this.getAttribute('checkbox-component-classname');
    }
  }, {
    key: "checkboxDisabledComponentClass",
    get: function get() {
      return this.getAttribute('checkbox-disabled-component-classname');
    }
  }, {
    key: "isReturnable",
    get: function get() {
      return this.getAttribute('is-returnable-attribute-name');
    }
  }]);

  return SeparateReturnsByMerchant;
}(ShopUi_models_component__WEBPACK_IMPORTED_MODULE_6__["default"]);



/***/ })

}]);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vLi92ZW5kb3Ivc3ByeWtlci1zaG9wL21lcmNoYW50LXNhbGVzLXJldHVybi13aWRnZXQvc3JjL1NwcnlrZXJTaG9wL1l2ZXMvTWVyY2hhbnRTYWxlc1JldHVybldpZGdldC9UaGVtZS9kZWZhdWx0L2NvbXBvbmVudHMvbW9sZWN1bGVzL3NlcGFyYXRlLXJldHVybnMtYnktbWVyY2hhbnQvc2VwYXJhdGUtcmV0dXJucy1ieS1tZXJjaGFudC50cyJdLCJuYW1lcyI6WyJTZXBhcmF0ZVJldHVybnNCeU1lcmNoYW50IiwicmVhZHlDYWxsYmFjayIsImluaXQiLCJjaGVja2VkSXRlbXMiLCJtZXJjaGFudFJlZmVyZW5jZU5hbWUiLCJtZXJjaGFudFJlZmVyZW5jZSIsImNoZWNrYm94ZXMiLCJBcnJheSIsImZyb20iLCJkb2N1bWVudCIsImdldEVsZW1lbnRzQnlDbGFzc05hbWUiLCJjaGVja2JveENsYXNzbmFtZSIsImNoZWNrYm94Q29tcG9uZW50Q2xhc3NuYW1lIiwiY2hlY2tib3hDb21wb25lbnRDbGFzcyIsImNoZWNrYm94RGlzYWJsZWRDb21wb25lbnRDbGFzc25hbWUiLCJjaGVja2JveERpc2FibGVkQ29tcG9uZW50Q2xhc3MiLCJtYXBFdmVudHMiLCJjaGVja2JveFRvZ2dsZUFjdGlvbiIsIm1hcCIsImNoZWNrYm94IiwiYWRkRXZlbnRMaXN0ZW5lciIsImV2ZW50IiwidGFyZ2V0IiwiY2hlY2tlZCIsIm9uQWRkQ2hlY2tlZEl0ZW0iLCJvblJlbW92ZUNoZWNrZWRJdGVtcyIsIml0ZW0iLCJwdXNoIiwiZGlzYWJsZUl0ZW0iLCJmaWx0ZXIiLCJsZW5ndGgiLCJlbmFibGVBbGxJdGVtcyIsImdldENoZWNrZWRJdGVtcyIsImN1cnJlbnRNZXJjaGFudFJlZmVyZW5jZSIsImdldEF0dHJpYnV0ZSIsImNoZWNrYm94ZXNUb0Rpc2FibGUiLCJkaXNhYmxlZCIsImNsb3Nlc3QiLCJjbGFzc0xpc3QiLCJhZGQiLCJoYXNBdHRyaWJ1dGUiLCJpc1JldHVybmFibGUiLCJyZW1vdmUiLCJDb21wb25lbnQiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUFBOztJQUVxQkEseUI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O1NBT1BDLGEsR0FBVix5QkFBMEIsQ0FBRSxDOztTQUVsQkMsSSxHQUFWLGdCQUFpQjtBQUNiLFNBQUtDLFlBQUwsR0FBb0IsRUFBcEI7QUFDQSxTQUFLQyxxQkFBTCxHQUE2QixLQUFLQyxpQkFBbEM7QUFDQSxTQUFLQyxVQUFMLEdBQXNDQyxLQUFLLENBQUNDLElBQU4sQ0FBV0MsUUFBUSxDQUFDQyxzQkFBVCxDQUFnQyxLQUFLQyxpQkFBckMsQ0FBWCxDQUF0QztBQUNBLFNBQUtDLDBCQUFMLEdBQWtDLEtBQUtDLHNCQUF2QztBQUNBLFNBQUtDLGtDQUFMLEdBQTBDLEtBQUtDLDhCQUEvQztBQUVBLFNBQUtDLFNBQUw7QUFDSCxHOztTQUVTQSxTLEdBQVYscUJBQTRCO0FBQ3hCLFNBQUtDLG9CQUFMO0FBQ0gsRzs7U0FFU0Esb0IsR0FBVixnQ0FBdUM7QUFBQTs7QUFDbkMsU0FBS1gsVUFBTCxDQUFnQlksR0FBaEIsQ0FBb0IsVUFBQ0MsUUFBRCxFQUFjO0FBQzlCQSxjQUFRLENBQUNDLGdCQUFULENBQTBCLFFBQTFCLEVBQW9DLFVBQUNDLEtBQUQsRUFBVztBQUMzQyxZQUFNQyxNQUFNLEdBQXFCRCxLQUFLLENBQUNDLE1BQXZDO0FBQ0FBLGNBQU0sQ0FBQ0MsT0FBUCxHQUFpQixNQUFJLENBQUNDLGdCQUFMLENBQXNCRixNQUF0QixDQUFqQixHQUFpRCxNQUFJLENBQUNHLG9CQUFMLEVBQWpEO0FBQ0gsT0FIRDtBQUlILEtBTEQ7QUFNSCxHOztTQUVTRCxnQixHQUFWLDBCQUEyQkUsSUFBM0IsRUFBeUQ7QUFDckQsU0FBS3ZCLFlBQUwsQ0FBa0J3QixJQUFsQixDQUF1QkQsSUFBdkI7QUFDQSxTQUFLRSxXQUFMLENBQWlCRixJQUFqQjtBQUNILEc7O1NBRVNELG9CLEdBQVYsZ0NBQXVDO0FBQ25DLFNBQUt0QixZQUFMLEdBQW9CLEtBQUtBLFlBQUwsQ0FBa0IwQixNQUFsQixDQUF5QixVQUFDSCxJQUFELEVBQVU7QUFDbkQsYUFBT0EsSUFBSSxDQUFDSCxPQUFaO0FBQ0gsS0FGbUIsQ0FBcEI7O0FBSUEsUUFBSSxLQUFLcEIsWUFBTCxDQUFrQjJCLE1BQXRCLEVBQThCO0FBQzFCO0FBQ0g7O0FBRUQsU0FBS0MsY0FBTDtBQUNILEc7O1NBRVNDLGUsR0FBVix5QkFBMEJWLE1BQTFCLEVBQTBEO0FBQ3RELFNBQUtuQixZQUFMLEdBQW9CLEtBQUtHLFVBQUwsQ0FBZ0J1QixNQUFoQixDQUF1QixVQUFDVixRQUFELEVBQWM7QUFDckQsYUFBT0EsUUFBUSxDQUFDSSxPQUFoQjtBQUNILEtBRm1CLENBQXBCO0FBR0gsRzs7U0FFU0ssVyxHQUFWLHFCQUFzQk4sTUFBdEIsRUFBc0Q7QUFBQTs7QUFDbEQsUUFBTVcsd0JBQXdCLEdBQUdYLE1BQU0sQ0FBQ1ksWUFBUCxDQUFvQixLQUFLN0IsaUJBQXpCLENBQWpDO0FBRUEsUUFBTThCLG1CQUFtQixHQUFHLEtBQUs3QixVQUFMLENBQWdCdUIsTUFBaEIsQ0FBdUIsVUFBQ1YsUUFBRCxFQUFjO0FBQzdELGFBQU9BLFFBQVEsQ0FBQ2UsWUFBVCxDQUFzQixNQUFJLENBQUM3QixpQkFBM0IsTUFBa0Q0Qix3QkFBekQ7QUFDSCxLQUYyQixDQUE1QjtBQUlBRSx1QkFBbUIsQ0FBQ2pCLEdBQXBCLENBQXdCLFVBQUNDLFFBQUQsRUFBYztBQUNsQ0EsY0FBUSxDQUFDaUIsUUFBVCxHQUFvQixJQUFwQjtBQUNBakIsY0FBUSxDQUNIa0IsT0FETCxPQUNpQixNQUFJLENBQUN6QiwwQkFEdEIsRUFFSzBCLFNBRkwsQ0FFZUMsR0FGZixPQUV1QixNQUFJLENBQUN6QixrQ0FGNUI7QUFHSCxLQUxEO0FBTUgsRzs7U0FFU2lCLGMsR0FBViwwQkFBaUM7QUFBQTs7QUFDN0IsU0FBS3pCLFVBQUwsQ0FBZ0JZLEdBQWhCLENBQW9CLFVBQUNDLFFBQUQsRUFBYztBQUM5QixVQUFJLENBQUNBLFFBQVEsQ0FBQ3FCLFlBQVQsQ0FBc0IsTUFBSSxDQUFDQyxZQUEzQixDQUFMLEVBQStDO0FBQzNDO0FBQ0g7O0FBRUR0QixjQUFRLENBQUNpQixRQUFULEdBQW9CLEtBQXBCO0FBQ0FqQixjQUFRLENBQ0hrQixPQURMLE9BQ2lCLE1BQUksQ0FBQ3pCLDBCQUR0QixFQUVLMEIsU0FGTCxDQUVlSSxNQUZmLE9BRTBCLE1BQUksQ0FBQzVCLGtDQUYvQjtBQUdILEtBVEQ7QUFVSCxHOzs7O3dCQUV5QztBQUN0QyxhQUFPLEtBQUtvQixZQUFMLENBQWtCLG1DQUFsQixDQUFQO0FBQ0g7Ozt3QkFFeUM7QUFDdEMsYUFBTyxLQUFLQSxZQUFMLENBQWtCLG9CQUFsQixDQUFQO0FBQ0g7Ozt3QkFFNEM7QUFDekMsYUFBTyxLQUFLQSxZQUFMLENBQWtCLHdCQUFsQixDQUFQO0FBQ0g7Ozt3QkFFOEM7QUFDM0MsYUFBTyxLQUFLQSxZQUFMLENBQWtCLDhCQUFsQixDQUFQO0FBQ0g7Ozt3QkFFc0Q7QUFDbkQsYUFBTyxLQUFLQSxZQUFMLENBQWtCLHVDQUFsQixDQUFQO0FBQ0g7Ozt3QkFFb0M7QUFDakMsYUFBTyxLQUFLQSxZQUFMLENBQWtCLDhCQUFsQixDQUFQO0FBQ0g7Ozs7RUF6R2tEUywrRCIsImZpbGUiOiIuL2pzL3l2ZXNfZGVmYXVsdC5zZXBhcmF0ZS1yZXR1cm5zLWJ5LW1lcmNoYW50LmxlZ2FjeS5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBDb21wb25lbnQgZnJvbSAnU2hvcFVpL21vZGVscy9jb21wb25lbnQnO1xuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBTZXBhcmF0ZVJldHVybnNCeU1lcmNoYW50IGV4dGVuZHMgQ29tcG9uZW50IHtcbiAgICBwcm90ZWN0ZWQgY2hlY2tib3hlczogSFRNTElucHV0RWxlbWVudFtdO1xuICAgIHByb3RlY3RlZCBtZXJjaGFudFJlZmVyZW5jZU5hbWU6IHN0cmluZztcbiAgICBwcm90ZWN0ZWQgY2hlY2tlZEl0ZW1zOiBIVE1MSW5wdXRFbGVtZW50W107XG4gICAgcHJvdGVjdGVkIGNoZWNrYm94Q29tcG9uZW50Q2xhc3NuYW1lOiBzdHJpbmc7XG4gICAgcHJvdGVjdGVkIGNoZWNrYm94RGlzYWJsZWRDb21wb25lbnRDbGFzc25hbWU6IHN0cmluZztcblxuICAgIHByb3RlY3RlZCByZWFkeUNhbGxiYWNrKCkge31cblxuICAgIHByb3RlY3RlZCBpbml0KCkge1xuICAgICAgICB0aGlzLmNoZWNrZWRJdGVtcyA9IFtdO1xuICAgICAgICB0aGlzLm1lcmNoYW50UmVmZXJlbmNlTmFtZSA9IHRoaXMubWVyY2hhbnRSZWZlcmVuY2U7XG4gICAgICAgIHRoaXMuY2hlY2tib3hlcyA9IDxIVE1MSW5wdXRFbGVtZW50W10+QXJyYXkuZnJvbShkb2N1bWVudC5nZXRFbGVtZW50c0J5Q2xhc3NOYW1lKHRoaXMuY2hlY2tib3hDbGFzc25hbWUpKTtcbiAgICAgICAgdGhpcy5jaGVja2JveENvbXBvbmVudENsYXNzbmFtZSA9IHRoaXMuY2hlY2tib3hDb21wb25lbnRDbGFzcztcbiAgICAgICAgdGhpcy5jaGVja2JveERpc2FibGVkQ29tcG9uZW50Q2xhc3NuYW1lID0gdGhpcy5jaGVja2JveERpc2FibGVkQ29tcG9uZW50Q2xhc3M7XG5cbiAgICAgICAgdGhpcy5tYXBFdmVudHMoKTtcbiAgICB9XG5cbiAgICBwcm90ZWN0ZWQgbWFwRXZlbnRzKCk6IHZvaWQge1xuICAgICAgICB0aGlzLmNoZWNrYm94VG9nZ2xlQWN0aW9uKCk7XG4gICAgfVxuXG4gICAgcHJvdGVjdGVkIGNoZWNrYm94VG9nZ2xlQWN0aW9uKCk6IHZvaWQge1xuICAgICAgICB0aGlzLmNoZWNrYm94ZXMubWFwKChjaGVja2JveCkgPT4ge1xuICAgICAgICAgICAgY2hlY2tib3guYWRkRXZlbnRMaXN0ZW5lcignY2hhbmdlJywgKGV2ZW50KSA9PiB7XG4gICAgICAgICAgICAgICAgY29uc3QgdGFyZ2V0ID0gPEhUTUxJbnB1dEVsZW1lbnQ+ZXZlbnQudGFyZ2V0O1xuICAgICAgICAgICAgICAgIHRhcmdldC5jaGVja2VkID8gdGhpcy5vbkFkZENoZWNrZWRJdGVtKHRhcmdldCkgOiB0aGlzLm9uUmVtb3ZlQ2hlY2tlZEl0ZW1zKCk7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfSk7XG4gICAgfVxuXG4gICAgcHJvdGVjdGVkIG9uQWRkQ2hlY2tlZEl0ZW0oaXRlbTogSFRNTElucHV0RWxlbWVudCk6IHZvaWQge1xuICAgICAgICB0aGlzLmNoZWNrZWRJdGVtcy5wdXNoKGl0ZW0pO1xuICAgICAgICB0aGlzLmRpc2FibGVJdGVtKGl0ZW0pO1xuICAgIH1cblxuICAgIHByb3RlY3RlZCBvblJlbW92ZUNoZWNrZWRJdGVtcygpOiB2b2lkIHtcbiAgICAgICAgdGhpcy5jaGVja2VkSXRlbXMgPSB0aGlzLmNoZWNrZWRJdGVtcy5maWx0ZXIoKGl0ZW0pID0+IHtcbiAgICAgICAgICAgIHJldHVybiBpdGVtLmNoZWNrZWQ7XG4gICAgICAgIH0pO1xuXG4gICAgICAgIGlmICh0aGlzLmNoZWNrZWRJdGVtcy5sZW5ndGgpIHtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuXG4gICAgICAgIHRoaXMuZW5hYmxlQWxsSXRlbXMoKTtcbiAgICB9XG5cbiAgICBwcm90ZWN0ZWQgZ2V0Q2hlY2tlZEl0ZW1zKHRhcmdldDogSFRNTElucHV0RWxlbWVudCk6IHZvaWQge1xuICAgICAgICB0aGlzLmNoZWNrZWRJdGVtcyA9IHRoaXMuY2hlY2tib3hlcy5maWx0ZXIoKGNoZWNrYm94KSA9PiB7XG4gICAgICAgICAgICByZXR1cm4gY2hlY2tib3guY2hlY2tlZDtcbiAgICAgICAgfSk7XG4gICAgfVxuXG4gICAgcHJvdGVjdGVkIGRpc2FibGVJdGVtKHRhcmdldDogSFRNTElucHV0RWxlbWVudCk6IHZvaWQge1xuICAgICAgICBjb25zdCBjdXJyZW50TWVyY2hhbnRSZWZlcmVuY2UgPSB0YXJnZXQuZ2V0QXR0cmlidXRlKHRoaXMubWVyY2hhbnRSZWZlcmVuY2UpO1xuXG4gICAgICAgIGNvbnN0IGNoZWNrYm94ZXNUb0Rpc2FibGUgPSB0aGlzLmNoZWNrYm94ZXMuZmlsdGVyKChjaGVja2JveCkgPT4ge1xuICAgICAgICAgICAgcmV0dXJuIGNoZWNrYm94LmdldEF0dHJpYnV0ZSh0aGlzLm1lcmNoYW50UmVmZXJlbmNlKSAhPT0gY3VycmVudE1lcmNoYW50UmVmZXJlbmNlO1xuICAgICAgICB9KTtcblxuICAgICAgICBjaGVja2JveGVzVG9EaXNhYmxlLm1hcCgoY2hlY2tib3gpID0+IHtcbiAgICAgICAgICAgIGNoZWNrYm94LmRpc2FibGVkID0gdHJ1ZTtcbiAgICAgICAgICAgIGNoZWNrYm94XG4gICAgICAgICAgICAgICAgLmNsb3Nlc3QoYC4ke3RoaXMuY2hlY2tib3hDb21wb25lbnRDbGFzc25hbWV9YClcbiAgICAgICAgICAgICAgICAuY2xhc3NMaXN0LmFkZChgLiR7dGhpcy5jaGVja2JveERpc2FibGVkQ29tcG9uZW50Q2xhc3NuYW1lfWApO1xuICAgICAgICB9KTtcbiAgICB9XG5cbiAgICBwcm90ZWN0ZWQgZW5hYmxlQWxsSXRlbXMoKTogdm9pZCB7XG4gICAgICAgIHRoaXMuY2hlY2tib3hlcy5tYXAoKGNoZWNrYm94KSA9PiB7XG4gICAgICAgICAgICBpZiAoIWNoZWNrYm94Lmhhc0F0dHJpYnV0ZSh0aGlzLmlzUmV0dXJuYWJsZSkpIHtcbiAgICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIGNoZWNrYm94LmRpc2FibGVkID0gZmFsc2U7XG4gICAgICAgICAgICBjaGVja2JveFxuICAgICAgICAgICAgICAgIC5jbG9zZXN0KGAuJHt0aGlzLmNoZWNrYm94Q29tcG9uZW50Q2xhc3NuYW1lfWApXG4gICAgICAgICAgICAgICAgLmNsYXNzTGlzdC5yZW1vdmUoYC4ke3RoaXMuY2hlY2tib3hEaXNhYmxlZENvbXBvbmVudENsYXNzbmFtZX1gKTtcbiAgICAgICAgfSk7XG4gICAgfVxuXG4gICAgcHJvdGVjdGVkIGdldCBtZXJjaGFudFJlZmVyZW5jZSgpOiBzdHJpbmcge1xuICAgICAgICByZXR1cm4gdGhpcy5nZXRBdHRyaWJ1dGUoJ21lcmNoYW50LXJlZmVyZW5jZS1hdHRyaWJ1dGUtbmFtZScpO1xuICAgIH1cblxuICAgIHByb3RlY3RlZCBnZXQgY2hlY2tib3hDbGFzc25hbWUoKTogc3RyaW5nIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuZ2V0QXR0cmlidXRlKCdjaGVja2JveC1jbGFzc25hbWUnKTtcbiAgICB9XG5cbiAgICBwcm90ZWN0ZWQgZ2V0IHByb2R1Y3RJdGVtQ2xhc3NuYW1lKCk6IHN0cmluZyB7XG4gICAgICAgIHJldHVybiB0aGlzLmdldEF0dHJpYnV0ZSgncHJvZHVjdC1pdGVtLWNsYXNzbmFtZScpO1xuICAgIH1cblxuICAgIHByb3RlY3RlZCBnZXQgY2hlY2tib3hDb21wb25lbnRDbGFzcygpOiBzdHJpbmcge1xuICAgICAgICByZXR1cm4gdGhpcy5nZXRBdHRyaWJ1dGUoJ2NoZWNrYm94LWNvbXBvbmVudC1jbGFzc25hbWUnKTtcbiAgICB9XG5cbiAgICBwcm90ZWN0ZWQgZ2V0IGNoZWNrYm94RGlzYWJsZWRDb21wb25lbnRDbGFzcygpOiBzdHJpbmcge1xuICAgICAgICByZXR1cm4gdGhpcy5nZXRBdHRyaWJ1dGUoJ2NoZWNrYm94LWRpc2FibGVkLWNvbXBvbmVudC1jbGFzc25hbWUnKTtcbiAgICB9XG5cbiAgICBwcm90ZWN0ZWQgZ2V0IGlzUmV0dXJuYWJsZSgpOiBzdHJpbmcge1xuICAgICAgICByZXR1cm4gdGhpcy5nZXRBdHRyaWJ1dGUoJ2lzLXJldHVybmFibGUtYXR0cmlidXRlLW5hbWUnKTtcbiAgICB9XG59XG4iXSwic291cmNlUm9vdCI6IiJ9