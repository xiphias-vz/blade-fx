(window["webpackJsonp_yves_default"] = window["webpackJsonp_yves_default"] || []).push([[29],{

/***/ "./src/Pyz/Yves/ShopUi/Theme/default/components/molecules/matomo-popup-ui-corrector/matomo-popup-ui-corrector.ts":
/*!***********************************************************************************************************************!*\
  !*** ./src/Pyz/Yves/ShopUi/Theme/default/components/molecules/matomo-popup-ui-corrector/matomo-popup-ui-corrector.ts ***!
  \***********************************************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return MatomoPopupUiCorrector; });
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


var INTERVAL_TIMEOUT = 200;
var MAX_TIMEOUT = 5000;

var MatomoPopupUiCorrector = /*#__PURE__*/function (_Component) {
  _babel_runtime_helpers_inheritsLoose__WEBPACK_IMPORTED_MODULE_3___default()(MatomoPopupUiCorrector, _Component);

  var _super = _createSuper(MatomoPopupUiCorrector);

  function MatomoPopupUiCorrector() {
    var _this;

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this = _Component.call.apply(_Component, [this].concat(args)) || this;

    _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_4___default()(_babel_runtime_helpers_assertThisInitialized__WEBPACK_IMPORTED_MODULE_0___default()(_this), "interval", void 0);

    _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_4___default()(_babel_runtime_helpers_assertThisInitialized__WEBPACK_IMPORTED_MODULE_0___default()(_this), "popupHolder", void 0);

    _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_4___default()(_babel_runtime_helpers_assertThisInitialized__WEBPACK_IMPORTED_MODULE_0___default()(_this), "pageBody", void 0);

    return _this;
  }

  var _proto = MatomoPopupUiCorrector.prototype;

  _proto.readyCallback = function readyCallback() {};

  _proto.init = function init() {
    this.pageBody = document.getElementsByTagName('body')[0];
    window.setTimeout(this.clearCurrentInterval.bind(this), MAX_TIMEOUT);
    this.interval = window.setInterval(this.removeScrollOnOverlay.bind(this), INTERVAL_TIMEOUT);
  };

  _proto.clearCurrentInterval = function clearCurrentInterval() {
    window.clearInterval(this.interval);
  };

  _proto.removeScrollOnOverlay = function removeScrollOnOverlay() {
    this.popupHolder = document.querySelector('[id^="ppms_cm_consent_popup"]');

    if (!this.popupHolder) {
      return;
    }

    this.pageBody.classList.add('no-scroll');
    this.initModalButtons();
    this.removeDisagreeButton();
    this.clearCurrentInterval();
  };

  _proto.initModalButtons = function initModalButtons() {
    var _this2 = this;

    var buttons = [];
    buttons.push(document.getElementsByClassName('ppms_cm_close_popup')[0]);
    buttons.push(document.getElementsByClassName('ppms_cm_button_primary')[0]);
    buttons.push(document.getElementsByClassName('ppms_cm_button')[0]);
    buttons.map(function (button) {
      button.addEventListener('click', function () {
        _this2.pageBody.classList.remove('no-scroll');
      });
    });
  };

  _proto.removeDisagreeButton = function removeDisagreeButton() {
    var disagreeButton = document.getElementById('ppms_cm_disagree');

    if (!disagreeButton) {
      return;
    }

    disagreeButton.remove();
  };

  return MatomoPopupUiCorrector;
}(ShopUi_models_component__WEBPACK_IMPORTED_MODULE_5__["default"]);



/***/ })

}]);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vLi9zcmMvUHl6L1l2ZXMvU2hvcFVpL1RoZW1lL2RlZmF1bHQvY29tcG9uZW50cy9tb2xlY3VsZXMvbWF0b21vLXBvcHVwLXVpLWNvcnJlY3Rvci9tYXRvbW8tcG9wdXAtdWktY29ycmVjdG9yLnRzIl0sIm5hbWVzIjpbIklOVEVSVkFMX1RJTUVPVVQiLCJNQVhfVElNRU9VVCIsIk1hdG9tb1BvcHVwVWlDb3JyZWN0b3IiLCJyZWFkeUNhbGxiYWNrIiwiaW5pdCIsInBhZ2VCb2R5IiwiZG9jdW1lbnQiLCJnZXRFbGVtZW50c0J5VGFnTmFtZSIsIndpbmRvdyIsInNldFRpbWVvdXQiLCJjbGVhckN1cnJlbnRJbnRlcnZhbCIsImJpbmQiLCJpbnRlcnZhbCIsInNldEludGVydmFsIiwicmVtb3ZlU2Nyb2xsT25PdmVybGF5IiwiY2xlYXJJbnRlcnZhbCIsInBvcHVwSG9sZGVyIiwicXVlcnlTZWxlY3RvciIsImNsYXNzTGlzdCIsImFkZCIsImluaXRNb2RhbEJ1dHRvbnMiLCJyZW1vdmVEaXNhZ3JlZUJ1dHRvbiIsImJ1dHRvbnMiLCJwdXNoIiwiZ2V0RWxlbWVudHNCeUNsYXNzTmFtZSIsIm1hcCIsImJ1dHRvbiIsImFkZEV2ZW50TGlzdGVuZXIiLCJyZW1vdmUiLCJkaXNhZ3JlZUJ1dHRvbiIsImdldEVsZW1lbnRCeUlkIiwiQ29tcG9uZW50Il0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQTtBQUVBLElBQU1BLGdCQUFnQixHQUFHLEdBQXpCO0FBQ0EsSUFBTUMsV0FBVyxHQUFHLElBQXBCOztJQUVxQkMsc0I7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7U0FLUEMsYSxHQUFWLHlCQUFnQyxDQUFFLEM7O1NBRXhCQyxJLEdBQVYsZ0JBQXVCO0FBQ25CLFNBQUtDLFFBQUwsR0FBZ0JDLFFBQVEsQ0FBQ0Msb0JBQVQsQ0FBOEIsTUFBOUIsRUFBc0MsQ0FBdEMsQ0FBaEI7QUFDQUMsVUFBTSxDQUFDQyxVQUFQLENBQWtCLEtBQUtDLG9CQUFMLENBQTBCQyxJQUExQixDQUErQixJQUEvQixDQUFsQixFQUF3RFYsV0FBeEQ7QUFDQSxTQUFLVyxRQUFMLEdBQWdCSixNQUFNLENBQUNLLFdBQVAsQ0FBbUIsS0FBS0MscUJBQUwsQ0FBMkJILElBQTNCLENBQWdDLElBQWhDLENBQW5CLEVBQTBEWCxnQkFBMUQsQ0FBaEI7QUFDSCxHOztTQUVTVSxvQixHQUFWLGdDQUF1QztBQUNuQ0YsVUFBTSxDQUFDTyxhQUFQLENBQXFCLEtBQUtILFFBQTFCO0FBQ0gsRzs7U0FFU0UscUIsR0FBVixpQ0FBa0M7QUFDOUIsU0FBS0UsV0FBTCxHQUFtQlYsUUFBUSxDQUFDVyxhQUFULENBQXVCLCtCQUF2QixDQUFuQjs7QUFDQSxRQUFJLENBQUMsS0FBS0QsV0FBVixFQUF1QjtBQUNuQjtBQUNIOztBQUNELFNBQUtYLFFBQUwsQ0FBY2EsU0FBZCxDQUF3QkMsR0FBeEIsQ0FBNEIsV0FBNUI7QUFDQSxTQUFLQyxnQkFBTDtBQUNBLFNBQUtDLG9CQUFMO0FBQ0EsU0FBS1gsb0JBQUw7QUFDSCxHOztTQUVTVSxnQixHQUFWLDRCQUFtQztBQUFBOztBQUMvQixRQUFNRSxPQUFzQixHQUFHLEVBQS9CO0FBQ0FBLFdBQU8sQ0FBQ0MsSUFBUixDQUEwQmpCLFFBQVEsQ0FBQ2tCLHNCQUFULENBQWdDLHFCQUFoQyxFQUF1RCxDQUF2RCxDQUExQjtBQUNBRixXQUFPLENBQUNDLElBQVIsQ0FBMEJqQixRQUFRLENBQUNrQixzQkFBVCxDQUFnQyx3QkFBaEMsRUFBMEQsQ0FBMUQsQ0FBMUI7QUFDQUYsV0FBTyxDQUFDQyxJQUFSLENBQTBCakIsUUFBUSxDQUFDa0Isc0JBQVQsQ0FBZ0MsZ0JBQWhDLEVBQWtELENBQWxELENBQTFCO0FBQ0FGLFdBQU8sQ0FBQ0csR0FBUixDQUFZLFVBQUFDLE1BQU0sRUFBSTtBQUNsQkEsWUFBTSxDQUFDQyxnQkFBUCxDQUF3QixPQUF4QixFQUFpQyxZQUFNO0FBQ25DLGNBQUksQ0FBQ3RCLFFBQUwsQ0FBY2EsU0FBZCxDQUF3QlUsTUFBeEIsQ0FBK0IsV0FBL0I7QUFDSCxPQUZEO0FBR0gsS0FKRDtBQUtILEc7O1NBRVNQLG9CLEdBQVYsZ0NBQXVDO0FBQ25DLFFBQU1RLGNBQWMsR0FBc0J2QixRQUFRLENBQUN3QixjQUFULENBQXdCLGtCQUF4QixDQUExQzs7QUFDQSxRQUFJLENBQUNELGNBQUwsRUFBb0I7QUFDaEI7QUFDSDs7QUFDREEsa0JBQWMsQ0FBQ0QsTUFBZjtBQUNILEc7OztFQTlDK0NHLCtEIiwiZmlsZSI6Ii4vanMveXZlc19kZWZhdWx0LjI5LmxlZ2FjeS5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBDb21wb25lbnQgZnJvbSAnU2hvcFVpL21vZGVscy9jb21wb25lbnQnO1xuXG5jb25zdCBJTlRFUlZBTF9USU1FT1VUID0gMjAwO1xuY29uc3QgTUFYX1RJTUVPVVQgPSA1MDAwO1xuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBNYXRvbW9Qb3B1cFVpQ29ycmVjdG9yIGV4dGVuZHMgQ29tcG9uZW50IHtcbiAgICBwcm90ZWN0ZWQgaW50ZXJ2YWw6IG51bWJlcjtcbiAgICBwcm90ZWN0ZWQgcG9wdXBIb2xkZXI6IEhUTUxFbGVtZW50O1xuICAgIHByb3RlY3RlZCBwYWdlQm9keTogSFRNTEVsZW1lbnQ7XG5cbiAgICBwcm90ZWN0ZWQgcmVhZHlDYWxsYmFjaygpOiB2b2lkIHt9XG5cbiAgICBwcm90ZWN0ZWQgaW5pdCgpOiB2b2lkIHtcbiAgICAgICAgdGhpcy5wYWdlQm9keSA9IGRvY3VtZW50LmdldEVsZW1lbnRzQnlUYWdOYW1lKCdib2R5JylbMF07XG4gICAgICAgIHdpbmRvdy5zZXRUaW1lb3V0KHRoaXMuY2xlYXJDdXJyZW50SW50ZXJ2YWwuYmluZCh0aGlzKSwgTUFYX1RJTUVPVVQpO1xuICAgICAgICB0aGlzLmludGVydmFsID0gd2luZG93LnNldEludGVydmFsKHRoaXMucmVtb3ZlU2Nyb2xsT25PdmVybGF5LmJpbmQodGhpcyksIElOVEVSVkFMX1RJTUVPVVQpO1xuICAgIH1cblxuICAgIHByb3RlY3RlZCBjbGVhckN1cnJlbnRJbnRlcnZhbCgpOiB2b2lkIHtcbiAgICAgICAgd2luZG93LmNsZWFySW50ZXJ2YWwodGhpcy5pbnRlcnZhbCk7XG4gICAgfVxuXG4gICAgcHJvdGVjdGVkIHJlbW92ZVNjcm9sbE9uT3ZlcmxheSgpIHtcbiAgICAgICAgdGhpcy5wb3B1cEhvbGRlciA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJ1tpZF49XCJwcG1zX2NtX2NvbnNlbnRfcG9wdXBcIl0nKTtcbiAgICAgICAgaWYgKCF0aGlzLnBvcHVwSG9sZGVyKSB7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cbiAgICAgICAgdGhpcy5wYWdlQm9keS5jbGFzc0xpc3QuYWRkKCduby1zY3JvbGwnKTtcbiAgICAgICAgdGhpcy5pbml0TW9kYWxCdXR0b25zKCk7XG4gICAgICAgIHRoaXMucmVtb3ZlRGlzYWdyZWVCdXR0b24oKTtcbiAgICAgICAgdGhpcy5jbGVhckN1cnJlbnRJbnRlcnZhbCgpO1xuICAgIH1cblxuICAgIHByb3RlY3RlZCBpbml0TW9kYWxCdXR0b25zKCk6IHZvaWQge1xuICAgICAgICBjb25zdCBidXR0b25zOiBIVE1MRWxlbWVudFtdID0gW107XG4gICAgICAgIGJ1dHRvbnMucHVzaCg8SFRNTEVsZW1lbnQ+ZG9jdW1lbnQuZ2V0RWxlbWVudHNCeUNsYXNzTmFtZSgncHBtc19jbV9jbG9zZV9wb3B1cCcpWzBdKTtcbiAgICAgICAgYnV0dG9ucy5wdXNoKDxIVE1MRWxlbWVudD5kb2N1bWVudC5nZXRFbGVtZW50c0J5Q2xhc3NOYW1lKCdwcG1zX2NtX2J1dHRvbl9wcmltYXJ5JylbMF0pO1xuICAgICAgICBidXR0b25zLnB1c2goPEhUTUxFbGVtZW50PmRvY3VtZW50LmdldEVsZW1lbnRzQnlDbGFzc05hbWUoJ3BwbXNfY21fYnV0dG9uJylbMF0pO1xuICAgICAgICBidXR0b25zLm1hcChidXR0b24gPT4ge1xuICAgICAgICAgICAgYnV0dG9uLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgKCkgPT4ge1xuICAgICAgICAgICAgICAgIHRoaXMucGFnZUJvZHkuY2xhc3NMaXN0LnJlbW92ZSgnbm8tc2Nyb2xsJyk7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfSk7XG4gICAgfVxuXG4gICAgcHJvdGVjdGVkIHJlbW92ZURpc2FncmVlQnV0dG9uKCk6IHZvaWQge1xuICAgICAgICBjb25zdCBkaXNhZ3JlZUJ1dHRvbiA9IDxIVE1MQnV0dG9uRWxlbWVudD5kb2N1bWVudC5nZXRFbGVtZW50QnlJZCgncHBtc19jbV9kaXNhZ3JlZScpO1xuICAgICAgICBpZiAoIWRpc2FncmVlQnV0dG9uKXtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuICAgICAgICBkaXNhZ3JlZUJ1dHRvbi5yZW1vdmUoKTtcbiAgICB9XG59XG4iXSwic291cmNlUm9vdCI6IiJ9