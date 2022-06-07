(window["webpackJsonp_yves_default"] = window["webpackJsonp_yves_default"] || []).push([[39],{

/***/ "./src/Pyz/Yves/ShopUi/Theme/default/components/molecules/popup-ui-store-switcher/popup-ui-store-switcher.ts":
/*!*******************************************************************************************************************!*\
  !*** ./src/Pyz/Yves/ShopUi/Theme/default/components/molecules/popup-ui-store-switcher/popup-ui-store-switcher.ts ***!
  \*******************************************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return PopupUiStoreSwitcher; });
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




var PopupUiStoreSwitcher = /*#__PURE__*/function (_Component) {
  _babel_runtime_helpers_inheritsLoose__WEBPACK_IMPORTED_MODULE_3___default()(PopupUiStoreSwitcher, _Component);

  var _super = _createSuper(PopupUiStoreSwitcher);

  function PopupUiStoreSwitcher() {
    var _this;

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this = _Component.call.apply(_Component, [this].concat(args)) || this;

    _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_4___default()(_babel_runtime_helpers_assertThisInitialized__WEBPACK_IMPORTED_MODULE_0___default()(_this), "$this", jquery_dist_jquery__WEBPACK_IMPORTED_MODULE_6___default()(_babel_runtime_helpers_assertThisInitialized__WEBPACK_IMPORTED_MODULE_0___default()(_this)));

    _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_4___default()(_babel_runtime_helpers_assertThisInitialized__WEBPACK_IMPORTED_MODULE_0___default()(_this), "linkToStoreSwitcher", void 0);

    _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_4___default()(_babel_runtime_helpers_assertThisInitialized__WEBPACK_IMPORTED_MODULE_0___default()(_this), "currentStoreValue", void 0);

    _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_4___default()(_babel_runtime_helpers_assertThisInitialized__WEBPACK_IMPORTED_MODULE_0___default()(_this), "buttonForStoreSwitcher", void 0);

    _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_4___default()(_babel_runtime_helpers_assertThisInitialized__WEBPACK_IMPORTED_MODULE_0___default()(_this), "storeSwitcherPassword", void 0);

    _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_4___default()(_babel_runtime_helpers_assertThisInitialized__WEBPACK_IMPORTED_MODULE_0___default()(_this), "storeSwitcherPasswordLabel", void 0);

    _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_4___default()(_babel_runtime_helpers_assertThisInitialized__WEBPACK_IMPORTED_MODULE_0___default()(_this), "storeSwitcherErrorMessage", void 0);

    _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_4___default()(_babel_runtime_helpers_assertThisInitialized__WEBPACK_IMPORTED_MODULE_0___default()(_this), "storeSwitcherUrl", void 0);

    _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_4___default()(_babel_runtime_helpers_assertThisInitialized__WEBPACK_IMPORTED_MODULE_0___default()(_this), "selectStore", void 0);

    return _this;
  }

  var _proto = PopupUiStoreSwitcher.prototype;

  _proto.readyCallback = function readyCallback() {
    this.linkToStoreSwitcher = document.getElementById('current_store_cookie');
    this.currentStoreValue = this.linkToStoreSwitcher.value;
    this.selectStore = document.getElementsByClassName('js-store-switcher__select_store')[0];
    this.buttonForStoreSwitcher = document.getElementById('popup-ui-store-switcher-button-save');
    this.storeSwitcherPassword = document.getElementById('popup-ui-store-switcher-password');
    this.mapEvents();
  };

  _proto.mapEvents = function mapEvents() {
    var _this2 = this;

    var store_value = this.currentStoreValue;
    var store_value_exist = false;
    Array.from(this.selectStore).forEach(function (option_element) {
      if (store_value != "" && store_value != null) {
        if (option_element.value.includes(store_value)) {
          store_value_exist = true;
        }
      }
    });
    this.buttonForStoreSwitcher.addEventListener('click', this.onClickButtonSave);
    this.storeSwitcherPassword.addEventListener('keypress', function (event) {
      return _this2.checkIfPressEnter(event);
    });

    if (this.currentStoreValue == null || this.currentStoreValue == "" || store_value_exist == false) {
      this.openModal();
    }
  };

  _proto.checkIfPressEnter = function checkIfPressEnter(event) {
    if (event.key === 'Enter') {
      this.onClickButtonSave();
    }
  };

  _proto.openModal = function openModal() {
    this.$this.addClass(this.name + "--show");
  };

  _proto.onClickButtonSave = function onClickButtonSave() {
    this.storeSwitcherUrl = document.getElementById('form-url-shop-switcher');
    this.storeSwitcherPasswordLabel = document.querySelectorAll('label[for="popup-ui-store-switcher-password"]')[0];
    this.storeSwitcherPasswordLabel.setAttribute('style', '');
    this.storeSwitcherErrorMessage = document.getElementById('popup-ui-store-switcher-error-message');
    this.storeSwitcherErrorMessage.innerHTML = '';
    this.storeSwitcherPassword = document.getElementById('popup-ui-store-switcher-password');

    if (this.storeSwitcherPassword.value === '') {
      this.storeSwitcherPasswordLabel.setAttribute('style', 'color:red');
    } else {
      var This = this;
      jquery_dist_jquery__WEBPACK_IMPORTED_MODULE_6___default.a.ajax({
        type: "POST",
        url: window.location.origin + '/store/checkStore',
        data: {
          'password': this.storeSwitcherPassword.value,
          'url': this.storeSwitcherUrl.value
        },
        success: function success(res) {
          if (res.success == true) {
            window.location.href = res.url;
          } else {
            This.storeSwitcherErrorMessage.innerHTML = res.message;
          }
        }
      });
    }
  };

  return PopupUiStoreSwitcher;
}(ShopUi_models_component__WEBPACK_IMPORTED_MODULE_5__["default"]);



/***/ })

}]);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vLi9zcmMvUHl6L1l2ZXMvU2hvcFVpL1RoZW1lL2RlZmF1bHQvY29tcG9uZW50cy9tb2xlY3VsZXMvcG9wdXAtdWktc3RvcmUtc3dpdGNoZXIvcG9wdXAtdWktc3RvcmUtc3dpdGNoZXIudHMiXSwibmFtZXMiOlsiUG9wdXBVaVN0b3JlU3dpdGNoZXIiLCIkIiwicmVhZHlDYWxsYmFjayIsImxpbmtUb1N0b3JlU3dpdGNoZXIiLCJkb2N1bWVudCIsImdldEVsZW1lbnRCeUlkIiwiY3VycmVudFN0b3JlVmFsdWUiLCJ2YWx1ZSIsInNlbGVjdFN0b3JlIiwiZ2V0RWxlbWVudHNCeUNsYXNzTmFtZSIsImJ1dHRvbkZvclN0b3JlU3dpdGNoZXIiLCJzdG9yZVN3aXRjaGVyUGFzc3dvcmQiLCJtYXBFdmVudHMiLCJzdG9yZV92YWx1ZSIsInN0b3JlX3ZhbHVlX2V4aXN0IiwiQXJyYXkiLCJmcm9tIiwiZm9yRWFjaCIsIm9wdGlvbl9lbGVtZW50IiwiaW5jbHVkZXMiLCJhZGRFdmVudExpc3RlbmVyIiwib25DbGlja0J1dHRvblNhdmUiLCJldmVudCIsImNoZWNrSWZQcmVzc0VudGVyIiwib3Blbk1vZGFsIiwia2V5IiwiJHRoaXMiLCJhZGRDbGFzcyIsIm5hbWUiLCJzdG9yZVN3aXRjaGVyVXJsIiwic3RvcmVTd2l0Y2hlclBhc3N3b3JkTGFiZWwiLCJxdWVyeVNlbGVjdG9yQWxsIiwic2V0QXR0cmlidXRlIiwic3RvcmVTd2l0Y2hlckVycm9yTWVzc2FnZSIsImlubmVySFRNTCIsIlRoaXMiLCJhamF4IiwidHlwZSIsInVybCIsIndpbmRvdyIsImxvY2F0aW9uIiwib3JpZ2luIiwiZGF0YSIsInN1Y2Nlc3MiLCJyZXMiLCJocmVmIiwibWVzc2FnZSIsIkNvbXBvbmVudCJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQTtBQUNBOztJQUVxQkEsb0I7Ozs7Ozs7Ozs7Ozs7O3NMQUNJQyx5REFBQyxD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QyxNQUFoQixHQUF5QixtQkFGN0I7QUFHSEMsWUFBSSxFQUFHO0FBQUUsc0JBQVksS0FBSy9CLHFCQUFMLENBQTJCSixLQUF6QztBQUFnRCxpQkFBTyxLQUFLc0IsZ0JBQUwsQ0FBc0J0QjtBQUE3RSxTQUhKO0FBSUhvQyxlQUFPLEVBQUUsaUJBQVVDLEdBQVYsRUFBZTtBQUNwQixjQUFJQSxHQUFHLENBQUNELE9BQUosSUFBZSxJQUFuQixFQUF5QjtBQUNyQkosa0JBQU0sQ0FBQ0MsUUFBUCxDQUFnQkssSUFBaEIsR0FBdUJELEdBQUcsQ0FBQ04sR0FBM0I7QUFDSCxXQUZELE1BRU87QUFDSEgsZ0JBQUksQ0FBQ0YseUJBQUwsQ0FBK0JDLFNBQS9CLEdBQTJDVSxHQUFHLENBQUNFLE9BQS9DO0FBQ0g7QUFDSjtBQVZFLE9BQVA7QUFZSDtBQUNKLEc7OztFQTFFNkNDLCtEIiwiZmlsZSI6Ii4vanMveXZlc19kZWZhdWx0LjM5LmxlZ2FjeS5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBDb21wb25lbnQgZnJvbSAnU2hvcFVpL21vZGVscy9jb21wb25lbnQnO1xuaW1wb3J0ICQgZnJvbSAnanF1ZXJ5L2Rpc3QvanF1ZXJ5JztcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgUG9wdXBVaVN0b3JlU3dpdGNoZXIgZXh0ZW5kcyBDb21wb25lbnR7XG4gICAgcHJvdGVjdGVkICR0aGlzOiAkID0gJCh0aGlzKTtcbiAgICBwcm90ZWN0ZWQgbGlua1RvU3RvcmVTd2l0Y2hlcjogSFRNTEZvcm1FbGVtZW50O1xuICAgIHByb3RlY3RlZCBjdXJyZW50U3RvcmVWYWx1ZTogc3RyaW5nO1xuICAgIHByb3RlY3RlZCBidXR0b25Gb3JTdG9yZVN3aXRjaGVyOiBIVE1MQnV0dG9uRWxlbWVudDtcbiAgICBwcm90ZWN0ZWQgc3RvcmVTd2l0Y2hlclBhc3N3b3JkO1xuICAgIHByb3RlY3RlZCBzdG9yZVN3aXRjaGVyUGFzc3dvcmRMYWJlbDtcbiAgICBwcm90ZWN0ZWQgc3RvcmVTd2l0Y2hlckVycm9yTWVzc2FnZTtcbiAgICBwcm90ZWN0ZWQgc3RvcmVTd2l0Y2hlclVybDtcbiAgICBwcm90ZWN0ZWQgc2VsZWN0U3RvcmU7XG5cbiAgICBwcm90ZWN0ZWQgcmVhZHlDYWxsYmFjaygpIHtcbiAgICAgICAgdGhpcy5saW5rVG9TdG9yZVN3aXRjaGVyID0gPEhUTUxGb3JtRWxlbWVudD4gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2N1cnJlbnRfc3RvcmVfY29va2llJyk7XG4gICAgICAgIHRoaXMuY3VycmVudFN0b3JlVmFsdWUgPSB0aGlzLmxpbmtUb1N0b3JlU3dpdGNoZXIudmFsdWU7XG4gICAgICAgIHRoaXMuc2VsZWN0U3RvcmUgPSBkb2N1bWVudC5nZXRFbGVtZW50c0J5Q2xhc3NOYW1lKCdqcy1zdG9yZS1zd2l0Y2hlcl9fc2VsZWN0X3N0b3JlJylbMF07XG4gICAgICAgIHRoaXMuYnV0dG9uRm9yU3RvcmVTd2l0Y2hlciA9IDxIVE1MQnV0dG9uRWxlbWVudD4gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ3BvcHVwLXVpLXN0b3JlLXN3aXRjaGVyLWJ1dHRvbi1zYXZlJyk7XG4gICAgICAgIHRoaXMuc3RvcmVTd2l0Y2hlclBhc3N3b3JkID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ3BvcHVwLXVpLXN0b3JlLXN3aXRjaGVyLXBhc3N3b3JkJyk7XG4gICAgICAgIHRoaXMubWFwRXZlbnRzKCk7XG4gICAgfVxuXG4gICAgcHJvdGVjdGVkIG1hcEV2ZW50cygpOiB2b2lkIHtcbiAgICAgICAgbGV0IHN0b3JlX3ZhbHVlID0gdGhpcy5jdXJyZW50U3RvcmVWYWx1ZTtcbiAgICAgICAgbGV0IHN0b3JlX3ZhbHVlX2V4aXN0ID0gZmFsc2U7XG4gICAgICAgIEFycmF5LmZyb20odGhpcy5zZWxlY3RTdG9yZSkuZm9yRWFjaChmdW5jdGlvbihvcHRpb25fZWxlbWVudCkge1xuICAgICAgICAgICAgaWYoc3RvcmVfdmFsdWUgIT0gXCJcIiAmJiBzdG9yZV92YWx1ZSAhPSBudWxsKXtcbiAgICAgICAgICAgICAgICBpZihvcHRpb25fZWxlbWVudC52YWx1ZS5pbmNsdWRlcyhzdG9yZV92YWx1ZSkpIHtcbiAgICAgICAgICAgICAgICAgICAgc3RvcmVfdmFsdWVfZXhpc3QgPSB0cnVlO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG4gICAgICAgIHRoaXMuYnV0dG9uRm9yU3RvcmVTd2l0Y2hlci5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIHRoaXMub25DbGlja0J1dHRvblNhdmUpO1xuICAgICAgICB0aGlzLnN0b3JlU3dpdGNoZXJQYXNzd29yZC5hZGRFdmVudExpc3RlbmVyKCdrZXlwcmVzcycsIGV2ZW50ID0+IHRoaXMuY2hlY2tJZlByZXNzRW50ZXIoZXZlbnQpKTtcblxuICAgICAgICBpZiAodGhpcy5jdXJyZW50U3RvcmVWYWx1ZSA9PSBudWxsIHx8IHRoaXMuY3VycmVudFN0b3JlVmFsdWUgPT0gXCJcIiB8fCBzdG9yZV92YWx1ZV9leGlzdCA9PSBmYWxzZSl7XG4gICAgICAgICAgICB0aGlzLm9wZW5Nb2RhbCgpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgcHJvdGVjdGVkIGNoZWNrSWZQcmVzc0VudGVyKGV2ZW50KTogdm9pZCB7XG4gICAgICAgIGlmKGV2ZW50LmtleSA9PT0gJ0VudGVyJykge1xuICAgICAgICAgICAgdGhpcy5vbkNsaWNrQnV0dG9uU2F2ZSgpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgcHJvdGVjdGVkIG9wZW5Nb2RhbCgpOiB2b2lkXG4gICAge1xuICAgICAgICB0aGlzLiR0aGlzLmFkZENsYXNzKGAke3RoaXMubmFtZX0tLXNob3dgKTtcbiAgICB9XG5cbiAgICBwcm90ZWN0ZWQgb25DbGlja0J1dHRvblNhdmUoKTogdm9pZFxuICAgIHtcbiAgICAgICAgdGhpcy5zdG9yZVN3aXRjaGVyVXJsID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2Zvcm0tdXJsLXNob3Atc3dpdGNoZXInKTtcbiAgICAgICAgdGhpcy5zdG9yZVN3aXRjaGVyUGFzc3dvcmRMYWJlbCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoJ2xhYmVsW2Zvcj1cInBvcHVwLXVpLXN0b3JlLXN3aXRjaGVyLXBhc3N3b3JkXCJdJylbMF07XG4gICAgICAgIHRoaXMuc3RvcmVTd2l0Y2hlclBhc3N3b3JkTGFiZWwuc2V0QXR0cmlidXRlKCdzdHlsZScsICcnKTtcbiAgICAgICAgdGhpcy5zdG9yZVN3aXRjaGVyRXJyb3JNZXNzYWdlID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ3BvcHVwLXVpLXN0b3JlLXN3aXRjaGVyLWVycm9yLW1lc3NhZ2UnKTtcbiAgICAgICAgdGhpcy5zdG9yZVN3aXRjaGVyRXJyb3JNZXNzYWdlLmlubmVySFRNTCA9ICcnO1xuICAgICAgICB0aGlzLnN0b3JlU3dpdGNoZXJQYXNzd29yZCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdwb3B1cC11aS1zdG9yZS1zd2l0Y2hlci1wYXNzd29yZCcpO1xuICAgICAgICBpZiAodGhpcy5zdG9yZVN3aXRjaGVyUGFzc3dvcmQudmFsdWUgPT09ICcnKSB7XG4gICAgICAgICAgICB0aGlzLnN0b3JlU3dpdGNoZXJQYXNzd29yZExhYmVsLnNldEF0dHJpYnV0ZSgnc3R5bGUnLCAnY29sb3I6cmVkJyk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBsZXQgVGhpcyA9IHRoaXM7XG4gICAgICAgICAgICAkLmFqYXgoe1xuICAgICAgICAgICAgICAgIHR5cGUgOiBcIlBPU1RcIixcbiAgICAgICAgICAgICAgICB1cmwgIDogd2luZG93LmxvY2F0aW9uLm9yaWdpbiArICcvc3RvcmUvY2hlY2tTdG9yZScsXG4gICAgICAgICAgICAgICAgZGF0YSA6IHsgJ3Bhc3N3b3JkJzogdGhpcy5zdG9yZVN3aXRjaGVyUGFzc3dvcmQudmFsdWUsICd1cmwnOiB0aGlzLnN0b3JlU3dpdGNoZXJVcmwudmFsdWUgfSxcbiAgICAgICAgICAgICAgICBzdWNjZXNzOiBmdW5jdGlvbiAocmVzKSB7XG4gICAgICAgICAgICAgICAgICAgIGlmIChyZXMuc3VjY2VzcyA9PSB0cnVlKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICB3aW5kb3cubG9jYXRpb24uaHJlZiA9IHJlcy51cmw7XG4gICAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBUaGlzLnN0b3JlU3dpdGNoZXJFcnJvck1lc3NhZ2UuaW5uZXJIVE1MID0gcmVzLm1lc3NhZ2U7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfVxuICAgIH1cbn1cbiJdLCJzb3VyY2VSb290IjoiIn0=