(window["webpackJsonp_yves_default"] = window["webpackJsonp_yves_default"] || []).push([[32],{

/***/ "./src/Pyz/Yves/ShopUi/Theme/default/components/molecules/pass-reset-flash-message/pass-reset-flash-message.ts":
/*!*********************************************************************************************************************!*\
  !*** ./src/Pyz/Yves/ShopUi/Theme/default/components/molecules/pass-reset-flash-message/pass-reset-flash-message.ts ***!
  \*********************************************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return PassResetFlashMessage; });
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
/* harmony import */ var jquery_dist_jquery__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! jquery/dist/jquery */ "./node_modules/jquery/dist/jquery.js");
/* harmony import */ var jquery_dist_jquery__WEBPACK_IMPORTED_MODULE_7___default = /*#__PURE__*/__webpack_require__.n(jquery_dist_jquery__WEBPACK_IMPORTED_MODULE_7__);







function _createSuper(Derived) { return function () { var Super = _babel_runtime_helpers_getPrototypeOf__WEBPACK_IMPORTED_MODULE_3___default()(Derived), result; if (_isNativeReflectConstruct()) { var NewTarget = _babel_runtime_helpers_getPrototypeOf__WEBPACK_IMPORTED_MODULE_3___default()(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _babel_runtime_helpers_possibleConstructorReturn__WEBPACK_IMPORTED_MODULE_2___default()(this, result); }; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Date.prototype.toString.call(Reflect.construct(Date, [], function () {})); return true; } catch (e) { return false; } }




var PassResetFlashMessage = /*#__PURE__*/function (_Component) {
  _babel_runtime_helpers_inheritsLoose__WEBPACK_IMPORTED_MODULE_4___default()(PassResetFlashMessage, _Component);

  var _super = _createSuper(PassResetFlashMessage);

  function PassResetFlashMessage() {
    var _this;

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this = _Component.call.apply(_Component, [this].concat(args)) || this;

    _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_5___default()(_babel_runtime_helpers_assertThisInitialized__WEBPACK_IMPORTED_MODULE_1___default()(_this), "$this", jquery_dist_jquery__WEBPACK_IMPORTED_MODULE_7___default()(_babel_runtime_helpers_assertThisInitialized__WEBPACK_IMPORTED_MODULE_1___default()(_this)));

    _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_5___default()(_babel_runtime_helpers_assertThisInitialized__WEBPACK_IMPORTED_MODULE_1___default()(_this), "flashMessage", void 0);

    _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_5___default()(_babel_runtime_helpers_assertThisInitialized__WEBPACK_IMPORTED_MODULE_1___default()(_this), "meinKonto", void 0);

    _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_5___default()(_babel_runtime_helpers_assertThisInitialized__WEBPACK_IMPORTED_MODULE_1___default()(_this), "passwordForgetLink", void 0);

    return _this;
  }

  var _proto = PassResetFlashMessage.prototype;

  _proto.readyCallback = function readyCallback() {
    this.flashMessage = document.getElementById(this.getFlashMessage);
    this.meinKonto = document.getElementById(this.getLinkToLoginModal);
    this.passwordForgetLink = document.getElementById(this.getPasswordForgetLink);
    this.mapEvents();
  };

  _proto.mapEvents = function mapEvents() {
    if (this.meinKonto != undefined) {
      this.meinKonto.addEventListener('click', function (event) {});
    }
  };

  _proto.triggerPopup = function triggerPopup(event) {
    if (event) {
      event.preventDefault();
    }

    this.$this.toggleClass(this.showClass);
  };

  _babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_0___default()(PassResetFlashMessage, [{
    key: "showClass",
    get: function get() {
      return this.name + "--show";
    }
  }, {
    key: "getFlashMessage",
    get: function get() {
      return 'pass_reset_flash_message';
    }
  }, {
    key: "getLinkToLoginModal",
    get: function get() {
      return 'link-to-login-modal';
    }
  }, {
    key: "getPasswordForgetLink",
    get: function get() {
      return 'password-forget-link-my';
    }
  }, {
    key: "getFlashMessageStaticLink",
    get: function get() {
      return 'flash-message-static-link';
    }
  }]);

  return PassResetFlashMessage;
}(ShopUi_models_component__WEBPACK_IMPORTED_MODULE_6__["default"]);



/***/ })

}]);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vLi9zcmMvUHl6L1l2ZXMvU2hvcFVpL1RoZW1lL2RlZmF1bHQvY29tcG9uZW50cy9tb2xlY3VsZXMvcGFzcy1yZXNldC1mbGFzaC1tZXNzYWdlL3Bhc3MtcmVzZXQtZmxhc2gtbWVzc2FnZS50cyJdLCJuYW1lcyI6WyJQYXNzUmVzZXRGbGFzaE1lc3NhZ2UiLCIkIiwicmVhZHlDYWxsYmFjayIsImZsYXNoTWVzc2FnZSIsImRvY3VtZW50IiwiZ2V0RWxlbWVudEJ5SWQiLCJnZXRGbGFzaE1lc3NhZ2UiLCJtZWluS29udG8iLCJnZXRMaW5rVG9Mb2dpbk1vZGFsIiwicGFzc3dvcmRGb3JnZXRMaW5rIiwiZ2V0UGFzc3dvcmRGb3JnZXRMaW5rIiwibWFwRXZlbnRzIiwidW5kZWZpbmVkIiwiYWRkRXZlbnRMaXN0ZW5lciIsImV2ZW50IiwidHJpZ2dlclBvcHVwIiwicHJldmVudERlZmF1bHQiLCIkdGhpcyIsInRvZ2dsZUNsYXNzIiwic2hvd0NsYXNzIiwibmFtZSIsIkNvbXBvbmVudCJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQTtBQUNBOztJQUVxQkEscUI7Ozs7Ozs7Ozs7Ozs7O3NMQUNJQyx5REFBQyxDQUFDLDJGOzs7Ozs7Ozs7Ozs7O1NBS2JDLGEsR0FBVix5QkFBZ0M7QUFDNUIsU0FBS0MsWUFBTCxHQUFvQkMsUUFBUSxDQUFDQyxjQUFULENBQXdCLEtBQUtDLGVBQTdCLENBQXBCO0FBQ0EsU0FBS0MsU0FBTCxHQUFpQkgsUUFBUSxDQUFDQyxjQUFULENBQXdCLEtBQUtHLG1CQUE3QixDQUFqQjtBQUNBLFNBQUtDLGtCQUFMLEdBQTBCTCxRQUFRLENBQUNDLGNBQVQsQ0FBd0IsS0FBS0sscUJBQTdCLENBQTFCO0FBRUEsU0FBS0MsU0FBTDtBQUNILEc7O1NBRVNBLFMsR0FBVixxQkFBNEI7QUFDeEIsUUFBSSxLQUFLSixTQUFMLElBQWtCSyxTQUF0QixFQUFpQztBQUM3QixXQUFLTCxTQUFMLENBQWVNLGdCQUFmLENBQWdDLE9BQWhDLEVBQXdDLFVBQUFDLEtBQUssRUFBSSxDQUNoRCxDQUREO0FBRUg7QUFDSixHOztTQUVEQyxZLEdBQUEsc0JBQWFELEtBQWIsRUFBa0M7QUFDOUIsUUFBSUEsS0FBSixFQUFXO0FBQ1BBLFdBQUssQ0FBQ0UsY0FBTjtBQUNIOztBQUVELFNBQUtDLEtBQUwsQ0FBV0MsV0FBWCxDQUF1QixLQUFLQyxTQUE1QjtBQUNILEc7Ozs7d0JBRXVCO0FBQ3BCLGFBQVUsS0FBS0MsSUFBZjtBQUNIOzs7d0JBRTZCO0FBQzFCLGFBQU8sMEJBQVA7QUFDSDs7O3dCQUVpQztBQUM5QixhQUFPLHFCQUFQO0FBQ0g7Ozt3QkFFbUM7QUFDaEMsYUFBTyx5QkFBUDtBQUNIOzs7d0JBRXVDO0FBQ3BDLGFBQU8sMkJBQVA7QUFDSDs7OztFQS9DOENDLCtEIiwiZmlsZSI6Ii4vanMveXZlc19kZWZhdWx0LjMyLmxlZ2FjeS5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBDb21wb25lbnQgZnJvbSAnU2hvcFVpL21vZGVscy9jb21wb25lbnQnO1xuaW1wb3J0ICQgZnJvbSAnanF1ZXJ5L2Rpc3QvanF1ZXJ5JztcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgUGFzc1Jlc2V0Rmxhc2hNZXNzYWdlIGV4dGVuZHMgQ29tcG9uZW50IHtcbiAgICBwcm90ZWN0ZWQgJHRoaXM6ICQgPSAkKHRoaXMpO1xuICAgIHByb3RlY3RlZCBmbGFzaE1lc3NhZ2U7XG4gICAgcHJvdGVjdGVkIG1laW5Lb250bztcbiAgICBwcm90ZWN0ZWQgcGFzc3dvcmRGb3JnZXRMaW5rO1xuXG4gICAgcHJvdGVjdGVkIHJlYWR5Q2FsbGJhY2soKTogdm9pZCB7XG4gICAgICAgIHRoaXMuZmxhc2hNZXNzYWdlID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQodGhpcy5nZXRGbGFzaE1lc3NhZ2UpO1xuICAgICAgICB0aGlzLm1laW5Lb250byA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKHRoaXMuZ2V0TGlua1RvTG9naW5Nb2RhbCk7XG4gICAgICAgIHRoaXMucGFzc3dvcmRGb3JnZXRMaW5rID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQodGhpcy5nZXRQYXNzd29yZEZvcmdldExpbmspO1xuXG4gICAgICAgIHRoaXMubWFwRXZlbnRzKCk7XG4gICAgfVxuXG4gICAgcHJvdGVjdGVkIG1hcEV2ZW50cygpOiB2b2lkIHtcbiAgICAgICAgaWYgKHRoaXMubWVpbktvbnRvICE9IHVuZGVmaW5lZCkge1xuICAgICAgICAgICAgdGhpcy5tZWluS29udG8uYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLGV2ZW50ID0+IHtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgdHJpZ2dlclBvcHVwKGV2ZW50PzogRXZlbnQpOiB2b2lkIHtcbiAgICAgICAgaWYgKGV2ZW50KSB7XG4gICAgICAgICAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgICB9XG5cbiAgICAgICAgdGhpcy4kdGhpcy50b2dnbGVDbGFzcyh0aGlzLnNob3dDbGFzcyk7XG4gICAgfVxuXG4gICAgZ2V0IHNob3dDbGFzcygpOiBzdHJpbmcge1xuICAgICAgICByZXR1cm4gYCR7dGhpcy5uYW1lfS0tc2hvd2A7XG4gICAgfVxuXG4gICAgZ2V0IGdldEZsYXNoTWVzc2FnZSgpOiBzdHJpbmcge1xuICAgICAgICByZXR1cm4gJ3Bhc3NfcmVzZXRfZmxhc2hfbWVzc2FnZSc7XG4gICAgfVxuXG4gICAgZ2V0IGdldExpbmtUb0xvZ2luTW9kYWwoKTogc3RyaW5nIHtcbiAgICAgICAgcmV0dXJuICdsaW5rLXRvLWxvZ2luLW1vZGFsJztcbiAgICB9XG5cbiAgICBnZXQgZ2V0UGFzc3dvcmRGb3JnZXRMaW5rKCk6IHN0cmluZyB7XG4gICAgICAgIHJldHVybiAncGFzc3dvcmQtZm9yZ2V0LWxpbmstbXknO1xuICAgIH1cblxuICAgIGdldCBnZXRGbGFzaE1lc3NhZ2VTdGF0aWNMaW5rKCk6IHN0cmluZyB7XG4gICAgICAgIHJldHVybiAnZmxhc2gtbWVzc2FnZS1zdGF0aWMtbGluayc7XG4gICAgfVxufVxuIl0sInNvdXJjZVJvb3QiOiIifQ==