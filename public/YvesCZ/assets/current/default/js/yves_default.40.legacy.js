(window["webpackJsonp_yves_default"] = window["webpackJsonp_yves_default"] || []).push([[40],{

/***/ "./src/Pyz/Yves/ShopUi/Theme/default/components/molecules/quantity-counter/quantity-counter.ts":
/*!*****************************************************************************************************!*\
  !*** ./src/Pyz/Yves/ShopUi/Theme/default/components/molecules/quantity-counter/quantity-counter.ts ***!
  \*****************************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return QuantityCounter; });
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


var MIN_DECREMENT_VALUE = 2;

var QuantityCounter = /*#__PURE__*/function (_Component) {
  _babel_runtime_helpers_inheritsLoose__WEBPACK_IMPORTED_MODULE_4___default()(QuantityCounter, _Component);

  var _super = _createSuper(QuantityCounter);

  function QuantityCounter() {
    var _this;

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this = _Component.call.apply(_Component, [this].concat(args)) || this;

    _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_5___default()(_babel_runtime_helpers_assertThisInitialized__WEBPACK_IMPORTED_MODULE_1___default()(_this), "quantityInput", void 0);

    _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_5___default()(_babel_runtime_helpers_assertThisInitialized__WEBPACK_IMPORTED_MODULE_1___default()(_this), "decrButton", void 0);

    _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_5___default()(_babel_runtime_helpers_assertThisInitialized__WEBPACK_IMPORTED_MODULE_1___default()(_this), "incrButton", void 0);

    _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_5___default()(_babel_runtime_helpers_assertThisInitialized__WEBPACK_IMPORTED_MODULE_1___default()(_this), "value", void 0);

    _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_5___default()(_babel_runtime_helpers_assertThisInitialized__WEBPACK_IMPORTED_MODULE_1___default()(_this), "duration", 1000);

    _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_5___default()(_babel_runtime_helpers_assertThisInitialized__WEBPACK_IMPORTED_MODULE_1___default()(_this), "timeout", 0);

    _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_5___default()(_babel_runtime_helpers_assertThisInitialized__WEBPACK_IMPORTED_MODULE_1___default()(_this), "inputChange", new Event('input'));

    return _this;
  }

  var _proto = QuantityCounter.prototype;

  _proto.readyCallback = function readyCallback() {};

  _proto.init = function init() {
    this.quantityInput = this.getElementsByClassName(this.jsName + "__input")[0];
    this.decrButton = this.getElementsByClassName(this.jsName + "__decr")[0];
    this.incrButton = this.getElementsByClassName(this.jsName + "__incr")[0];
    this.value = this.getValue;
    this.mapEvents();
    this.setMaxQuantityToInfinity();
  };

  _proto.mapEvents = function mapEvents() {
    var _this2 = this;

    this.quantityInput.addEventListener('change', function () {
      return _this2.autoUpdateOnChange();
    });
    this.decrButton.addEventListener('click', function () {
      return _this2.onDecrementButtonClick();
    });
    this.incrButton.addEventListener('click', function () {
      return _this2.onIncrementButtonClick();
    });
  };

  _proto.onDecrementButtonClick = function onDecrementButtonClick() {
    var value = Number(this.quantityInput.value);

    if (value > this.minQuantity) {
      this.quantityInput.value = (value - 1).toString();
    }

    if (this.isRemovalUrlAllowed && value === this.minQuantity) {
      this.quantityInput.form.action = this.removeUrl;
    }

    if (value <= MIN_DECREMENT_VALUE) {
      this.decrButton.classList.add('button--disabled');
    }

    this.autoUpdateOnChange();
    this.triggerInputEvent();
  };

  _proto.onIncrementButtonClick = function onIncrementButtonClick() {
    var value = Number(this.quantityInput.value);

    if (value >= 1) {
      this.decrButton.classList.remove('button--disabled');
    }

    if (value < this.maxQuantity) {
      this.quantityInput.value = (value + 1).toString();
      this.autoUpdateOnChange();
      this.triggerInputEvent();
    }
  };

  _proto.autoUpdateOnChange = function autoUpdateOnChange() {
    if (this.autoUpdate) {
      this.timer();
    }
  };

  _proto.triggerInputEvent = function triggerInputEvent() {
    this.quantityInput.dispatchEvent(this.inputChange);
  };

  _proto.timer = function timer() {
    var _this3 = this;

    clearTimeout(this.timeout);
    this.timeout = window.setTimeout(function () {
      if (_this3.value !== _this3.getValue || _this3.isRemovalUrlAllowed) {
        _this3.quantityInput.form.submit();
      }
    }, this.duration);
  };

  _proto.setMaxQuantityToInfinity = function setMaxQuantityToInfinity() {
    if (!this.maxQuantity) {
      this.quantityInput.setAttribute('data-max-quantity', 'Infinity');
    }
  };

  _babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_0___default()(QuantityCounter, [{
    key: "maxQuantity",
    get: function get() {
      return +this.quantityInput.getAttribute('data-max-quantity');
    }
  }, {
    key: "minQuantity",
    get: function get() {
      return +this.quantityInput.getAttribute('data-min-quantity');
    }
  }, {
    key: "removeUrl",
    get: function get() {
      return this.quantityInput.getAttribute('data-remove-url');
    }
  }, {
    key: "isRemovalUrlAllowed",
    get: function get() {
      return this.removeUrl !== null;
    }
  }, {
    key: "autoUpdate",
    get: function get() {
      return this.quantityInput.getAttribute('data-auto-update');
    }
  }, {
    key: "getValue",
    get: function get() {
      return +this.quantityInput.value;
    }
  }]);

  return QuantityCounter;
}(ShopUi_models_component__WEBPACK_IMPORTED_MODULE_6__["default"]);



/***/ })

}]);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vLi9zcmMvUHl6L1l2ZXMvU2hvcFVpL1RoZW1lL2RlZmF1bHQvY29tcG9uZW50cy9tb2xlY3VsZXMvcXVhbnRpdHktY291bnRlci9xdWFudGl0eS1jb3VudGVyLnRzIl0sIm5hbWVzIjpbIk1JTl9ERUNSRU1FTlRfVkFMVUUiLCJRdWFudGl0eUNvdW50ZXIiLCJFdmVudCIsInJlYWR5Q2FsbGJhY2siLCJpbml0IiwicXVhbnRpdHlJbnB1dCIsImdldEVsZW1lbnRzQnlDbGFzc05hbWUiLCJqc05hbWUiLCJkZWNyQnV0dG9uIiwiaW5jckJ1dHRvbiIsInZhbHVlIiwiZ2V0VmFsdWUiLCJtYXBFdmVudHMiLCJzZXRNYXhRdWFudGl0eVRvSW5maW5pdHkiLCJhZGRFdmVudExpc3RlbmVyIiwiYXV0b1VwZGF0ZU9uQ2hhbmdlIiwib25EZWNyZW1lbnRCdXR0b25DbGljayIsIm9uSW5jcmVtZW50QnV0dG9uQ2xpY2siLCJOdW1iZXIiLCJtaW5RdWFudGl0eSIsInRvU3RyaW5nIiwiaXNSZW1vdmFsVXJsQWxsb3dlZCIsImZvcm0iLCJhY3Rpb24iLCJyZW1vdmVVcmwiLCJjbGFzc0xpc3QiLCJhZGQiLCJ0cmlnZ2VySW5wdXRFdmVudCIsInJlbW92ZSIsIm1heFF1YW50aXR5IiwiYXV0b1VwZGF0ZSIsInRpbWVyIiwiZGlzcGF0Y2hFdmVudCIsImlucHV0Q2hhbmdlIiwiY2xlYXJUaW1lb3V0IiwidGltZW91dCIsIndpbmRvdyIsInNldFRpbWVvdXQiLCJzdWJtaXQiLCJkdXJhdGlvbiIsInNldEF0dHJpYnV0ZSIsImdldEF0dHJpYnV0ZSIsIkNvbXBvbmVudCJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUE7QUFFQSxJQUFNQSxtQkFBbUIsR0FBRyxDQUE1Qjs7SUFFcUJDLGU7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7eUxBS1ksSTs7d0xBQ0QsQzs7NExBQ0csSUFBSUMsS0FBSixDQUFVLE9BQVYsQzs7Ozs7OztTQUVyQkMsYSxHQUFWLHlCQUFnQyxDQUFFLEM7O1NBRXhCQyxJLEdBQVYsZ0JBQXVCO0FBQ25CLFNBQUtDLGFBQUwsR0FBdUMsS0FBS0Msc0JBQUwsQ0FBK0IsS0FBS0MsTUFBcEMsY0FBcUQsQ0FBckQsQ0FBdkM7QUFDQSxTQUFLQyxVQUFMLEdBQXFDLEtBQUtGLHNCQUFMLENBQStCLEtBQUtDLE1BQXBDLGFBQW9ELENBQXBELENBQXJDO0FBQ0EsU0FBS0UsVUFBTCxHQUFxQyxLQUFLSCxzQkFBTCxDQUErQixLQUFLQyxNQUFwQyxhQUFvRCxDQUFwRCxDQUFyQztBQUNBLFNBQUtHLEtBQUwsR0FBYSxLQUFLQyxRQUFsQjtBQUVBLFNBQUtDLFNBQUw7QUFDQSxTQUFLQyx3QkFBTDtBQUNILEc7O1NBRVNELFMsR0FBVixxQkFBNEI7QUFBQTs7QUFDeEIsU0FBS1AsYUFBTCxDQUFtQlMsZ0JBQW5CLENBQW9DLFFBQXBDLEVBQThDO0FBQUEsYUFBTSxNQUFJLENBQUNDLGtCQUFMLEVBQU47QUFBQSxLQUE5QztBQUNBLFNBQUtQLFVBQUwsQ0FBZ0JNLGdCQUFoQixDQUFpQyxPQUFqQyxFQUEwQztBQUFBLGFBQU0sTUFBSSxDQUFDRSxzQkFBTCxFQUFOO0FBQUEsS0FBMUM7QUFDQSxTQUFLUCxVQUFMLENBQWdCSyxnQkFBaEIsQ0FBaUMsT0FBakMsRUFBMEM7QUFBQSxhQUFNLE1BQUksQ0FBQ0csc0JBQUwsRUFBTjtBQUFBLEtBQTFDO0FBQ0gsRzs7U0FFU0Qsc0IsR0FBVixrQ0FBeUM7QUFDckMsUUFBTU4sS0FBYSxHQUFHUSxNQUFNLENBQUMsS0FBS2IsYUFBTCxDQUFtQkssS0FBcEIsQ0FBNUI7O0FBRUEsUUFBSUEsS0FBSyxHQUFHLEtBQUtTLFdBQWpCLEVBQThCO0FBQzFCLFdBQUtkLGFBQUwsQ0FBbUJLLEtBQW5CLEdBQTJCLENBQUNBLEtBQUssR0FBRyxDQUFULEVBQVlVLFFBQVosRUFBM0I7QUFDSDs7QUFFRCxRQUFJLEtBQUtDLG1CQUFMLElBQTRCWCxLQUFLLEtBQUssS0FBS1MsV0FBL0MsRUFBNEQ7QUFDeEQsV0FBS2QsYUFBTCxDQUFtQmlCLElBQW5CLENBQXdCQyxNQUF4QixHQUFpQyxLQUFLQyxTQUF0QztBQUNIOztBQUVELFFBQUlkLEtBQUssSUFBSVYsbUJBQWIsRUFBa0M7QUFDOUIsV0FBS1EsVUFBTCxDQUFnQmlCLFNBQWhCLENBQTBCQyxHQUExQixDQUE4QixrQkFBOUI7QUFDSDs7QUFFRCxTQUFLWCxrQkFBTDtBQUNBLFNBQUtZLGlCQUFMO0FBQ0gsRzs7U0FFU1Ysc0IsR0FBVixrQ0FBeUM7QUFDckMsUUFBTVAsS0FBYSxHQUFHUSxNQUFNLENBQUMsS0FBS2IsYUFBTCxDQUFtQkssS0FBcEIsQ0FBNUI7O0FBRUEsUUFBSUEsS0FBSyxJQUFJLENBQWIsRUFBZ0I7QUFDWixXQUFLRixVQUFMLENBQWdCaUIsU0FBaEIsQ0FBMEJHLE1BQTFCLENBQWlDLGtCQUFqQztBQUNIOztBQUVELFFBQUlsQixLQUFLLEdBQUcsS0FBS21CLFdBQWpCLEVBQThCO0FBQzFCLFdBQUt4QixhQUFMLENBQW1CSyxLQUFuQixHQUEyQixDQUFDQSxLQUFLLEdBQUcsQ0FBVCxFQUFZVSxRQUFaLEVBQTNCO0FBRUEsV0FBS0wsa0JBQUw7QUFDQSxXQUFLWSxpQkFBTDtBQUNIO0FBQ0osRzs7U0FFU1osa0IsR0FBViw4QkFBcUM7QUFDakMsUUFBSSxLQUFLZSxVQUFULEVBQXFCO0FBQ2pCLFdBQUtDLEtBQUw7QUFDSDtBQUNKLEc7O1NBRVNKLGlCLEdBQVYsNkJBQW9DO0FBQ2hDLFNBQUt0QixhQUFMLENBQW1CMkIsYUFBbkIsQ0FBaUMsS0FBS0MsV0FBdEM7QUFDSCxHOztTQUVTRixLLEdBQVYsaUJBQXdCO0FBQUE7O0FBQ3BCRyxnQkFBWSxDQUFDLEtBQUtDLE9BQU4sQ0FBWjtBQUNBLFNBQUtBLE9BQUwsR0FBZUMsTUFBTSxDQUFDQyxVQUFQLENBQWtCLFlBQU07QUFDbkMsVUFBSSxNQUFJLENBQUMzQixLQUFMLEtBQWUsTUFBSSxDQUFDQyxRQUFwQixJQUFnQyxNQUFJLENBQUNVLG1CQUF6QyxFQUE4RDtBQUMxRCxjQUFJLENBQUNoQixhQUFMLENBQW1CaUIsSUFBbkIsQ0FBd0JnQixNQUF4QjtBQUNIO0FBQ0osS0FKYyxFQUlaLEtBQUtDLFFBSk8sQ0FBZjtBQUtILEc7O1NBRVMxQix3QixHQUFWLG9DQUEyQztBQUN2QyxRQUFJLENBQUMsS0FBS2dCLFdBQVYsRUFBdUI7QUFDbkIsV0FBS3hCLGFBQUwsQ0FBbUJtQyxZQUFuQixDQUFnQyxtQkFBaEMsRUFBcUQsVUFBckQ7QUFDSDtBQUNKLEc7Ozs7d0JBRW1DO0FBQ2hDLGFBQU8sQ0FBQyxLQUFLbkMsYUFBTCxDQUFtQm9DLFlBQW5CLENBQWdDLG1CQUFoQyxDQUFSO0FBQ0g7Ozt3QkFFbUM7QUFDaEMsYUFBTyxDQUFDLEtBQUtwQyxhQUFMLENBQW1Cb0MsWUFBbkIsQ0FBZ0MsbUJBQWhDLENBQVI7QUFDSDs7O3dCQUVpQztBQUM5QixhQUFPLEtBQUtwQyxhQUFMLENBQW1Cb0MsWUFBbkIsQ0FBZ0MsaUJBQWhDLENBQVA7QUFDSDs7O3dCQUU0QztBQUN6QyxhQUFPLEtBQUtqQixTQUFMLEtBQW1CLElBQTFCO0FBQ0g7Ozt3QkFFa0M7QUFDL0IsYUFBTyxLQUFLbkIsYUFBTCxDQUFtQm9DLFlBQW5CLENBQWdDLGtCQUFoQyxDQUFQO0FBQ0g7Ozt3QkFFZ0M7QUFDN0IsYUFBTyxDQUFDLEtBQUtwQyxhQUFMLENBQW1CSyxLQUEzQjtBQUNIOzs7O0VBNUd3Q2dDLCtEIiwiZmlsZSI6Ii4vanMveXZlc19kZWZhdWx0LjQwLmxlZ2FjeS5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBDb21wb25lbnQgZnJvbSAnU2hvcFVpL21vZGVscy9jb21wb25lbnQnO1xuXG5jb25zdCBNSU5fREVDUkVNRU5UX1ZBTFVFID0gMjtcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgUXVhbnRpdHlDb3VudGVyIGV4dGVuZHMgQ29tcG9uZW50IHtcbiAgICBwcm90ZWN0ZWQgcXVhbnRpdHlJbnB1dDogSFRNTElucHV0RWxlbWVudDtcbiAgICBwcm90ZWN0ZWQgZGVjckJ1dHRvbjogSFRNTEJ1dHRvbkVsZW1lbnQ7XG4gICAgcHJvdGVjdGVkIGluY3JCdXR0b246IEhUTUxCdXR0b25FbGVtZW50O1xuICAgIHByb3RlY3RlZCB2YWx1ZTogbnVtYmVyO1xuICAgIHByb3RlY3RlZCBkdXJhdGlvbjogbnVtYmVyID0gMTAwMDtcbiAgICBwcm90ZWN0ZWQgdGltZW91dDogbnVtYmVyID0gMDtcbiAgICBwcm90ZWN0ZWQgaW5wdXRDaGFuZ2U6IEV2ZW50ID0gbmV3IEV2ZW50KCdpbnB1dCcpO1xuXG4gICAgcHJvdGVjdGVkIHJlYWR5Q2FsbGJhY2soKTogdm9pZCB7fVxuXG4gICAgcHJvdGVjdGVkIGluaXQoKTogdm9pZCB7XG4gICAgICAgIHRoaXMucXVhbnRpdHlJbnB1dCA9IDxIVE1MSW5wdXRFbGVtZW50PnRoaXMuZ2V0RWxlbWVudHNCeUNsYXNzTmFtZShgJHt0aGlzLmpzTmFtZX1fX2lucHV0YClbMF07XG4gICAgICAgIHRoaXMuZGVjckJ1dHRvbiA9IDxIVE1MQnV0dG9uRWxlbWVudD50aGlzLmdldEVsZW1lbnRzQnlDbGFzc05hbWUoYCR7dGhpcy5qc05hbWV9X19kZWNyYClbMF07XG4gICAgICAgIHRoaXMuaW5jckJ1dHRvbiA9IDxIVE1MQnV0dG9uRWxlbWVudD50aGlzLmdldEVsZW1lbnRzQnlDbGFzc05hbWUoYCR7dGhpcy5qc05hbWV9X19pbmNyYClbMF07XG4gICAgICAgIHRoaXMudmFsdWUgPSB0aGlzLmdldFZhbHVlO1xuXG4gICAgICAgIHRoaXMubWFwRXZlbnRzKCk7XG4gICAgICAgIHRoaXMuc2V0TWF4UXVhbnRpdHlUb0luZmluaXR5KCk7XG4gICAgfVxuXG4gICAgcHJvdGVjdGVkIG1hcEV2ZW50cygpOiB2b2lkIHtcbiAgICAgICAgdGhpcy5xdWFudGl0eUlucHV0LmFkZEV2ZW50TGlzdGVuZXIoJ2NoYW5nZScsICgpID0+IHRoaXMuYXV0b1VwZGF0ZU9uQ2hhbmdlKCkpO1xuICAgICAgICB0aGlzLmRlY3JCdXR0b24uYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCAoKSA9PiB0aGlzLm9uRGVjcmVtZW50QnV0dG9uQ2xpY2soKSk7XG4gICAgICAgIHRoaXMuaW5jckJ1dHRvbi5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsICgpID0+IHRoaXMub25JbmNyZW1lbnRCdXR0b25DbGljaygpKTtcbiAgICB9XG5cbiAgICBwcm90ZWN0ZWQgb25EZWNyZW1lbnRCdXR0b25DbGljaygpOiB2b2lkIHtcbiAgICAgICAgY29uc3QgdmFsdWU6IG51bWJlciA9IE51bWJlcih0aGlzLnF1YW50aXR5SW5wdXQudmFsdWUpO1xuXG4gICAgICAgIGlmICh2YWx1ZSA+IHRoaXMubWluUXVhbnRpdHkpIHtcbiAgICAgICAgICAgIHRoaXMucXVhbnRpdHlJbnB1dC52YWx1ZSA9ICh2YWx1ZSAtIDEpLnRvU3RyaW5nKCk7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAodGhpcy5pc1JlbW92YWxVcmxBbGxvd2VkICYmIHZhbHVlID09PSB0aGlzLm1pblF1YW50aXR5KSB7XG4gICAgICAgICAgICB0aGlzLnF1YW50aXR5SW5wdXQuZm9ybS5hY3Rpb24gPSB0aGlzLnJlbW92ZVVybDtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmICh2YWx1ZSA8PSBNSU5fREVDUkVNRU5UX1ZBTFVFKSB7XG4gICAgICAgICAgICB0aGlzLmRlY3JCdXR0b24uY2xhc3NMaXN0LmFkZCgnYnV0dG9uLS1kaXNhYmxlZCcpO1xuICAgICAgICB9XG5cbiAgICAgICAgdGhpcy5hdXRvVXBkYXRlT25DaGFuZ2UoKTtcbiAgICAgICAgdGhpcy50cmlnZ2VySW5wdXRFdmVudCgpO1xuICAgIH1cblxuICAgIHByb3RlY3RlZCBvbkluY3JlbWVudEJ1dHRvbkNsaWNrKCk6IHZvaWQge1xuICAgICAgICBjb25zdCB2YWx1ZTogbnVtYmVyID0gTnVtYmVyKHRoaXMucXVhbnRpdHlJbnB1dC52YWx1ZSk7XG5cbiAgICAgICAgaWYgKHZhbHVlID49IDEpIHtcbiAgICAgICAgICAgIHRoaXMuZGVjckJ1dHRvbi5jbGFzc0xpc3QucmVtb3ZlKCdidXR0b24tLWRpc2FibGVkJyk7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAodmFsdWUgPCB0aGlzLm1heFF1YW50aXR5KSB7XG4gICAgICAgICAgICB0aGlzLnF1YW50aXR5SW5wdXQudmFsdWUgPSAodmFsdWUgKyAxKS50b1N0cmluZygpO1xuXG4gICAgICAgICAgICB0aGlzLmF1dG9VcGRhdGVPbkNoYW5nZSgpO1xuICAgICAgICAgICAgdGhpcy50cmlnZ2VySW5wdXRFdmVudCgpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgcHJvdGVjdGVkIGF1dG9VcGRhdGVPbkNoYW5nZSgpOiB2b2lkIHtcbiAgICAgICAgaWYgKHRoaXMuYXV0b1VwZGF0ZSkge1xuICAgICAgICAgICAgdGhpcy50aW1lcigpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgcHJvdGVjdGVkIHRyaWdnZXJJbnB1dEV2ZW50KCk6IHZvaWQge1xuICAgICAgICB0aGlzLnF1YW50aXR5SW5wdXQuZGlzcGF0Y2hFdmVudCh0aGlzLmlucHV0Q2hhbmdlKTtcbiAgICB9XG5cbiAgICBwcm90ZWN0ZWQgdGltZXIoKTogdm9pZCB7XG4gICAgICAgIGNsZWFyVGltZW91dCh0aGlzLnRpbWVvdXQpO1xuICAgICAgICB0aGlzLnRpbWVvdXQgPSB3aW5kb3cuc2V0VGltZW91dCgoKSA9PiB7XG4gICAgICAgICAgICBpZiAodGhpcy52YWx1ZSAhPT0gdGhpcy5nZXRWYWx1ZSB8fCB0aGlzLmlzUmVtb3ZhbFVybEFsbG93ZWQpIHtcbiAgICAgICAgICAgICAgICB0aGlzLnF1YW50aXR5SW5wdXQuZm9ybS5zdWJtaXQoKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSwgdGhpcy5kdXJhdGlvbik7XG4gICAgfVxuXG4gICAgcHJvdGVjdGVkIHNldE1heFF1YW50aXR5VG9JbmZpbml0eSgpOiB2b2lkIHtcbiAgICAgICAgaWYgKCF0aGlzLm1heFF1YW50aXR5KSB7XG4gICAgICAgICAgICB0aGlzLnF1YW50aXR5SW5wdXQuc2V0QXR0cmlidXRlKCdkYXRhLW1heC1xdWFudGl0eScsICdJbmZpbml0eScpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgcHJvdGVjdGVkIGdldCBtYXhRdWFudGl0eSgpOiBudW1iZXIge1xuICAgICAgICByZXR1cm4gK3RoaXMucXVhbnRpdHlJbnB1dC5nZXRBdHRyaWJ1dGUoJ2RhdGEtbWF4LXF1YW50aXR5Jyk7XG4gICAgfVxuXG4gICAgcHJvdGVjdGVkIGdldCBtaW5RdWFudGl0eSgpOiBudW1iZXIge1xuICAgICAgICByZXR1cm4gK3RoaXMucXVhbnRpdHlJbnB1dC5nZXRBdHRyaWJ1dGUoJ2RhdGEtbWluLXF1YW50aXR5Jyk7XG4gICAgfVxuXG4gICAgcHJvdGVjdGVkIGdldCByZW1vdmVVcmwoKTogc3RyaW5nIHtcbiAgICAgICAgcmV0dXJuIHRoaXMucXVhbnRpdHlJbnB1dC5nZXRBdHRyaWJ1dGUoJ2RhdGEtcmVtb3ZlLXVybCcpO1xuICAgIH1cblxuICAgIHByb3RlY3RlZCBnZXQgaXNSZW1vdmFsVXJsQWxsb3dlZCgpOiBib29sZWFuIHtcbiAgICAgICAgcmV0dXJuIHRoaXMucmVtb3ZlVXJsICE9PSBudWxsO1xuICAgIH1cblxuICAgIHByb3RlY3RlZCBnZXQgYXV0b1VwZGF0ZSgpOiBzdHJpbmcge1xuICAgICAgICByZXR1cm4gdGhpcy5xdWFudGl0eUlucHV0LmdldEF0dHJpYnV0ZSgnZGF0YS1hdXRvLXVwZGF0ZScpO1xuICAgIH1cblxuICAgIHByb3RlY3RlZCBnZXQgZ2V0VmFsdWUoKTogbnVtYmVyIHtcbiAgICAgICAgcmV0dXJuICt0aGlzLnF1YW50aXR5SW5wdXQudmFsdWU7XG4gICAgfVxufVxuIl0sInNvdXJjZVJvb3QiOiIifQ==