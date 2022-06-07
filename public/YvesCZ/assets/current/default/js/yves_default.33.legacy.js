(window["webpackJsonp_yves_default"] = window["webpackJsonp_yves_default"] || []).push([[33],{

/***/ "./src/Pyz/Yves/ShopUi/Theme/default/components/molecules/popup-age-confirmation/popup-age-confirmation.ts":
/*!*****************************************************************************************************************!*\
  !*** ./src/Pyz/Yves/ShopUi/Theme/default/components/molecules/popup-age-confirmation/popup-age-confirmation.ts ***!
  \*****************************************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return PopupAgeConfirmation; });
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
/* harmony import */ var jquery_dist_jquery__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! jquery/dist/jquery */ "./node_modules/jquery/dist/jquery.js");
/* harmony import */ var jquery_dist_jquery__WEBPACK_IMPORTED_MODULE_6___default = /*#__PURE__*/__webpack_require__.n(jquery_dist_jquery__WEBPACK_IMPORTED_MODULE_6__);






function _createSuper(Derived) { return function () { var Super = _babel_runtime_helpers_getPrototypeOf__WEBPACK_IMPORTED_MODULE_2___default()(Derived), result; if (_isNativeReflectConstruct()) { var NewTarget = _babel_runtime_helpers_getPrototypeOf__WEBPACK_IMPORTED_MODULE_2___default()(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _babel_runtime_helpers_possibleConstructorReturn__WEBPACK_IMPORTED_MODULE_1___default()(this, result); }; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Date.prototype.toString.call(Reflect.construct(Date, [], function () {})); return true; } catch (e) { return false; } }




var PopupAgeConfirmation = /*#__PURE__*/function (_Component) {
  _babel_runtime_helpers_inheritsLoose__WEBPACK_IMPORTED_MODULE_3___default()(PopupAgeConfirmation, _Component);

  var _super = _createSuper(PopupAgeConfirmation);

  function PopupAgeConfirmation() {
    var _this;

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this = _Component.call.apply(_Component, [this].concat(args)) || this;

    _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_4___default()(_babel_runtime_helpers_assertThisInitialized__WEBPACK_IMPORTED_MODULE_0___default()(_this), "$this", jquery_dist_jquery__WEBPACK_IMPORTED_MODULE_6___default()(_babel_runtime_helpers_assertThisInitialized__WEBPACK_IMPORTED_MODULE_0___default()(_this)));

    _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_4___default()(_babel_runtime_helpers_assertThisInitialized__WEBPACK_IMPORTED_MODULE_0___default()(_this), "ageRestrictionInfo", void 0);

    _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_4___default()(_babel_runtime_helpers_assertThisInitialized__WEBPACK_IMPORTED_MODULE_0___default()(_this), "ageConfirmationNeeded", void 0);

    _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_4___default()(_babel_runtime_helpers_assertThisInitialized__WEBPACK_IMPORTED_MODULE_0___default()(_this), "ageConfirmedYesButton", void 0);

    _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_4___default()(_babel_runtime_helpers_assertThisInitialized__WEBPACK_IMPORTED_MODULE_0___default()(_this), "ageConfirmedNoButton", void 0);

    return _this;
  }

  var _proto = PopupAgeConfirmation.prototype;

  _proto.readyCallback = function readyCallback() {
    this.ageConfirmedYesButton = document.getElementById('age-confirmation-yes-button');
    this.ageConfirmedNoButton = document.getElementById('age-confirmation-no-button');
    this.ageRestrictionInfo = document.getElementById('age-restriction');
    this.ageConfirmationNeeded = this.ageRestrictionInfo.value;

    try {
      if (this.ageConfirmationNeeded === '18') {
        this.openModal();
      }
    } catch (e) {}

    this.mapEvents();
  };

  _proto.mapEvents = function mapEvents() {
    var _this2 = this;

    this.ageConfirmedYesButton.addEventListener('click', function () {
      _this2.closeModal(_this2.$this);
    });
    this.ageConfirmedNoButton.addEventListener('click', function () {
      _this2.redirectToBackPage();
    });
  };

  _proto.openModal = function openModal() {
    this.$this.addClass(this.name + "--show");
  };

  _proto.closeModal = function closeModal(className) {
    className.removeClass(this.name + "--show");
  };

  _proto.redirectToBackPage = function redirectToBackPage() {
    !history.length ? location.href = '/' : history.back();
  };

  return PopupAgeConfirmation;
}(ShopUi_models_component__WEBPACK_IMPORTED_MODULE_5__["default"]);



/***/ })

}]);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vLi9zcmMvUHl6L1l2ZXMvU2hvcFVpL1RoZW1lL2RlZmF1bHQvY29tcG9uZW50cy9tb2xlY3VsZXMvcG9wdXAtYWdlLWNvbmZpcm1hdGlvbi9wb3B1cC1hZ2UtY29uZmlybWF0aW9uLnRzIl0sIm5hbWVzIjpbIlBvcHVwQWdlQ29uZmlybWF0aW9uIiwiJCIsInJlYWR5Q2FsbGJhY2siLCJhZ2VDb25maXJtZWRZZXNCdXR0b24iLCJkb2N1bWVudCIsImdldEVsZW1lbnRCeUlkIiwiYWdlQ29uZmlybWVkTm9CdXR0b24iLCJhZ2VSZXN0cmljdGlvbkluZm8iLCJhZ2VDb25maXJtYXRpb25OZWVkZWQiLCJ2YWx1ZSIsIm9wZW5Nb2RhbCIsImUiLCJtYXBFdmVudHMiLCJhZGRFdmVudExpc3RlbmVyIiwiY2xvc2VNb2RhbCIsIiR0aGlzIiwicmVkaXJlY3RUb0JhY2tQYWdlIiwiYWRkQ2xhc3MiLCJuYW1lIiwiY2xhc3NOYW1lIiwicmVtb3ZlQ2xhc3MiLCJoaXN0b3J5IiwibGVuZ3RoIiwibG9jYXRpb24iLCJocmVmIiwiYmFjayIsIkNvbXBvbmVudCJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQTtBQUNBOztJQUVxQkEsb0I7Ozs7Ozs7Ozs7Ozs7O3NMQUNJQyx5REFBQyxDQUFDLDJGOzs7Ozs7Ozs7Ozs7Ozs7U0FNYkMsYSxHQUFWLHlCQUEwQjtBQUN0QixTQUFLQyxxQkFBTCxHQUFpREMsUUFBUSxDQUFDQyxjQUFULENBQXdCLDZCQUF4QixDQUFqRDtBQUNBLFNBQUtDLG9CQUFMLEdBQWdERixRQUFRLENBQUNDLGNBQVQsQ0FBd0IsNEJBQXhCLENBQWhEO0FBQ0EsU0FBS0Usa0JBQUwsR0FBNENILFFBQVEsQ0FBQ0MsY0FBVCxDQUF3QixpQkFBeEIsQ0FBNUM7QUFDQSxTQUFLRyxxQkFBTCxHQUE2QixLQUFLRCxrQkFBTCxDQUF3QkUsS0FBckQ7O0FBQ0EsUUFBRztBQUNDLFVBQUksS0FBS0QscUJBQUwsS0FBK0IsSUFBbkMsRUFBd0M7QUFDcEMsYUFBS0UsU0FBTDtBQUNIO0FBQ0osS0FKRCxDQUlFLE9BQU9DLENBQVAsRUFBVSxDQUNYOztBQUNELFNBQUtDLFNBQUw7QUFDSCxHOztTQUVTQSxTLEdBQVYscUJBQXFCO0FBQUE7O0FBQ2pCLFNBQUtULHFCQUFMLENBQTJCVSxnQkFBM0IsQ0FBNEMsT0FBNUMsRUFBcUQsWUFBTTtBQUN2RCxZQUFJLENBQUNDLFVBQUwsQ0FBZ0IsTUFBSSxDQUFDQyxLQUFyQjtBQUNILEtBRkQ7QUFHQSxTQUFLVCxvQkFBTCxDQUEwQk8sZ0JBQTFCLENBQTJDLE9BQTNDLEVBQW9ELFlBQU07QUFDdEQsWUFBSSxDQUFDRyxrQkFBTDtBQUNILEtBRkQ7QUFHSCxHOztTQUVTTixTLEdBQVYscUJBQ0E7QUFDSSxTQUFLSyxLQUFMLENBQVdFLFFBQVgsQ0FBdUIsS0FBS0MsSUFBNUI7QUFDSCxHOztTQUNTSixVLEdBQVYsb0JBQXFCSyxTQUFyQixFQUFxQztBQUNqQ0EsYUFBUyxDQUFDQyxXQUFWLENBQXlCLEtBQUtGLElBQTlCO0FBQ0gsRzs7U0FFU0Ysa0IsR0FBViw4QkFBcUM7QUFDakMsS0FBQ0ssT0FBTyxDQUFDQyxNQUFULEdBQWtCQyxRQUFRLENBQUNDLElBQVQsR0FBZ0IsR0FBbEMsR0FBd0NILE9BQU8sQ0FBQ0ksSUFBUixFQUF4QztBQUNILEc7OztFQXhDNkNDLCtEIiwiZmlsZSI6Ii4vanMveXZlc19kZWZhdWx0LjMzLmxlZ2FjeS5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBDb21wb25lbnQgZnJvbSAnU2hvcFVpL21vZGVscy9jb21wb25lbnQnO1xuaW1wb3J0ICQgZnJvbSAnanF1ZXJ5L2Rpc3QvanF1ZXJ5JztcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgUG9wdXBBZ2VDb25maXJtYXRpb24gZXh0ZW5kcyBDb21wb25lbnR7XG4gICAgcHJvdGVjdGVkICR0aGlzOiAkID0gJCh0aGlzKTtcbiAgICBwcm90ZWN0ZWQgYWdlUmVzdHJpY3Rpb25JbmZvOiBIVE1MRm9ybUVsZW1lbnQ7XG4gICAgcHJvdGVjdGVkIGFnZUNvbmZpcm1hdGlvbk5lZWRlZDogc3RyaW5nO1xuICAgIHByb3RlY3RlZCBhZ2VDb25maXJtZWRZZXNCdXR0b246IEhUTUxCdXR0b25FbGVtZW50O1xuICAgIHByb3RlY3RlZCBhZ2VDb25maXJtZWROb0J1dHRvbjogSFRNTEJ1dHRvbkVsZW1lbnQ7XG5cbiAgICBwcm90ZWN0ZWQgcmVhZHlDYWxsYmFjaygpIHtcbiAgICAgICAgdGhpcy5hZ2VDb25maXJtZWRZZXNCdXR0b24gPSA8SFRNTEJ1dHRvbkVsZW1lbnQ+IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdhZ2UtY29uZmlybWF0aW9uLXllcy1idXR0b24nKTtcbiAgICAgICAgdGhpcy5hZ2VDb25maXJtZWROb0J1dHRvbiA9IDxIVE1MQnV0dG9uRWxlbWVudD4gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2FnZS1jb25maXJtYXRpb24tbm8tYnV0dG9uJyk7XG4gICAgICAgIHRoaXMuYWdlUmVzdHJpY3Rpb25JbmZvID0gPEhUTUxGb3JtRWxlbWVudD4gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2FnZS1yZXN0cmljdGlvbicpO1xuICAgICAgICB0aGlzLmFnZUNvbmZpcm1hdGlvbk5lZWRlZCA9IHRoaXMuYWdlUmVzdHJpY3Rpb25JbmZvLnZhbHVlO1xuICAgICAgICB0cnl7XG4gICAgICAgICAgICBpZiAodGhpcy5hZ2VDb25maXJtYXRpb25OZWVkZWQgPT09ICcxOCcpe1xuICAgICAgICAgICAgICAgIHRoaXMub3Blbk1vZGFsKCk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0gY2F0Y2ggKGUpIHtcbiAgICAgICAgfVxuICAgICAgICB0aGlzLm1hcEV2ZW50cygpO1xuICAgIH1cblxuICAgIHByb3RlY3RlZCBtYXBFdmVudHMoKXtcbiAgICAgICAgdGhpcy5hZ2VDb25maXJtZWRZZXNCdXR0b24uYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCAoKSA9PiB7XG4gICAgICAgICAgICB0aGlzLmNsb3NlTW9kYWwodGhpcy4kdGhpcyk7XG4gICAgICAgIH0pO1xuICAgICAgICB0aGlzLmFnZUNvbmZpcm1lZE5vQnV0dG9uLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgKCkgPT4ge1xuICAgICAgICAgICAgdGhpcy5yZWRpcmVjdFRvQmFja1BhZ2UoKTtcbiAgICAgICAgfSk7XG4gICAgfVxuXG4gICAgcHJvdGVjdGVkIG9wZW5Nb2RhbCgpOiB2b2lkXG4gICAge1xuICAgICAgICB0aGlzLiR0aGlzLmFkZENsYXNzKGAke3RoaXMubmFtZX0tLXNob3dgKTtcbiAgICB9XG4gICAgcHJvdGVjdGVkIGNsb3NlTW9kYWwoY2xhc3NOYW1lKTogdm9pZHtcbiAgICAgICAgY2xhc3NOYW1lLnJlbW92ZUNsYXNzKGAke3RoaXMubmFtZX0tLXNob3dgKTtcbiAgICB9XG5cbiAgICBwcm90ZWN0ZWQgcmVkaXJlY3RUb0JhY2tQYWdlKCk6IHZvaWQge1xuICAgICAgICAhaGlzdG9yeS5sZW5ndGggPyBsb2NhdGlvbi5ocmVmID0gJy8nIDogaGlzdG9yeS5iYWNrKCk7XG4gICAgfVxufVxuIl0sInNvdXJjZVJvb3QiOiIifQ==