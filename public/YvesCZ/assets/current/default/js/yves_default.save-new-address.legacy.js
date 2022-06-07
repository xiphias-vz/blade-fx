(window["webpackJsonp_yves_default"] = window["webpackJsonp_yves_default"] || []).push([["save-new-address"],{

/***/ "./vendor/spryker-shop/customer-page/src/SprykerShop/Yves/CustomerPage/Theme/default/components/molecules/save-new-address/save-new-address.ts":
/*!*****************************************************************************************************************************************************!*\
  !*** ./vendor/spryker-shop/customer-page/src/SprykerShop/Yves/CustomerPage/Theme/default/components/molecules/save-new-address/save-new-address.ts ***!
  \*****************************************************************************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return SaveNewAddress; });
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

/* tslint:disable */

var EVENT_ADD_NEW_ADDRESS = 'add-new-address';

var SaveNewAddress = /*#__PURE__*/function (_Component) {
  _babel_runtime_helpers_inheritsLoose__WEBPACK_IMPORTED_MODULE_4___default()(SaveNewAddress, _Component);

  var _super = _createSuper(SaveNewAddress);

  function SaveNewAddress() {
    var _this;

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this = _Component.call.apply(_Component, [this].concat(args)) || this;

    _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_5___default()(_babel_runtime_helpers_assertThisInitialized__WEBPACK_IMPORTED_MODULE_1___default()(_this), "customerShippingAddresses", void 0);

    _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_5___default()(_babel_runtime_helpers_assertThisInitialized__WEBPACK_IMPORTED_MODULE_1___default()(_this), "customerBillingAddresses", void 0);

    _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_5___default()(_babel_runtime_helpers_assertThisInitialized__WEBPACK_IMPORTED_MODULE_1___default()(_this), "saveNewAddressToggler", void 0);

    _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_5___default()(_babel_runtime_helpers_assertThisInitialized__WEBPACK_IMPORTED_MODULE_1___default()(_this), "sameAsShippingToggler", void 0);

    _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_5___default()(_babel_runtime_helpers_assertThisInitialized__WEBPACK_IMPORTED_MODULE_1___default()(_this), "addNewShippingAddress", void 0);

    _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_5___default()(_babel_runtime_helpers_assertThisInitialized__WEBPACK_IMPORTED_MODULE_1___default()(_this), "addNewBillingAddress", void 0);

    _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_5___default()(_babel_runtime_helpers_assertThisInitialized__WEBPACK_IMPORTED_MODULE_1___default()(_this), "newShippingAddressChecked", false);

    _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_5___default()(_babel_runtime_helpers_assertThisInitialized__WEBPACK_IMPORTED_MODULE_1___default()(_this), "newBillingAddressChecked", false);

    _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_5___default()(_babel_runtime_helpers_assertThisInitialized__WEBPACK_IMPORTED_MODULE_1___default()(_this), "hideClass", 'is-hidden');

    return _this;
  }

  var _proto = SaveNewAddress.prototype;

  _proto.readyCallback = function readyCallback() {
    if (this.shippingAddressTogglerSelector && this.billingAddressTogglerSelector) {
      this.customerShippingAddresses = document.querySelector(this.shippingAddressTogglerSelector);
      this.customerBillingAddresses = document.querySelector(this.billingAddressTogglerSelector);
    }

    if (this.addNewShippingAddressSelector && this.addNewBillingAddressSelector) {
      this.addNewShippingAddress = document.querySelector(this.addNewShippingAddressSelector);
      this.addNewBillingAddress = document.querySelector(this.addNewBillingAddressSelector);
    }

    this.saveNewAddressToggler = document.querySelector(this.saveAddressTogglerSelector);
    this.sameAsShippingToggler = document.querySelector(this.billingSameAsShippingAddressTogglerSelector);
    this.customerAddressesExists();
  };

  _proto.customerAddressesExists = function customerAddressesExists() {
    if (!this.customerShippingAddresses) {
      this.showSaveNewAddress();
      return;
    }

    this.mapEvents();
    this.initSaveNewAddressState();
  };

  _proto.mapEvents = function mapEvents() {
    var _this2 = this;

    if (this.addNewShippingAddress && this.addNewBillingAddress) {
      this.addNewShippingAddress.addEventListener(EVENT_ADD_NEW_ADDRESS, function () {
        return _this2.shippingTogglerOnChange();
      });
      this.addNewBillingAddress.addEventListener(EVENT_ADD_NEW_ADDRESS, function () {
        return _this2.billingTogglerOnChange();
      });
    }

    this.customerShippingAddresses.addEventListener('change', function () {
      return _this2.shippingTogglerOnChange();
    });
    this.customerBillingAddresses.addEventListener('change', function () {
      return _this2.billingTogglerOnChange();
    });
    this.sameAsShippingToggler.addEventListener('change', function () {
      return _this2.toggleSaveNewAddress();
    });
  };

  _proto.shippingTogglerOnChange = function shippingTogglerOnChange() {
    this.newShippingAddressChecked = this.addressTogglerChange(this.customerShippingAddresses);
    this.toggleSaveNewAddress();
  };

  _proto.billingTogglerOnChange = function billingTogglerOnChange() {
    this.newBillingAddressChecked = this.addressTogglerChange(this.customerBillingAddresses);
    this.toggleSaveNewAddress();
  };

  _proto.initSaveNewAddressState = function initSaveNewAddressState() {
    this.newShippingAddressChecked = this.isSaveNewAddressOptionSelected(this.customerShippingAddresses);
    this.newBillingAddressChecked = this.isSaveNewAddressOptionSelected(this.customerBillingAddresses);
    this.toggleSaveNewAddress();
  };

  _proto.addressTogglerChange = function addressTogglerChange(toggler) {
    return this.isSaveNewAddressOptionSelected(toggler);
  };

  _proto.isSaveNewAddressOptionSelected = function isSaveNewAddressOptionSelected(toggler) {
    return !toggler.value;
  };

  _proto.toggleSaveNewAddress = function toggleSaveNewAddress() {
    if (this.newShippingAddressChecked || this.newBillingAddressChecked && !this.sameAsShippingChecked) {
      this.showSaveNewAddress();
      return;
    }

    this.hideSaveNewAddress();
  };

  _proto.hideSaveNewAddress = function hideSaveNewAddress() {
    this.classList.add(this.hideClass);
    this.saveNewAddressToggler.disabled = true;
  };

  _proto.showSaveNewAddress = function showSaveNewAddress() {
    this.classList.remove(this.hideClass);
    this.saveNewAddressToggler.disabled = false;
  };

  _babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_0___default()(SaveNewAddress, [{
    key: "sameAsShippingChecked",
    get: function get() {
      return this.sameAsShippingToggler.checked;
    }
  }, {
    key: "shippingAddressTogglerSelector",
    get: function get() {
      return this.getAttribute('shipping-address-toggler-selector');
    }
  }, {
    key: "billingAddressTogglerSelector",
    get: function get() {
      return this.getAttribute('billing-address-toggler-selector');
    }
  }, {
    key: "addNewShippingAddressSelector",
    get: function get() {
      return this.getAttribute('add-new-shipping-address-selector');
    }
  }, {
    key: "addNewBillingAddressSelector",
    get: function get() {
      return this.getAttribute('add-new-billing-address-selector');
    }
  }, {
    key: "billingSameAsShippingAddressTogglerSelector",
    get: function get() {
      return this.getAttribute('billing-same-as-shipping-toggler-selector');
    }
  }, {
    key: "saveAddressTogglerSelector",
    get: function get() {
      return this.getAttribute('save-address-toggler-selector');
    }
  }]);

  return SaveNewAddress;
}(ShopUi_models_component__WEBPACK_IMPORTED_MODULE_6__["default"]);



/***/ })

}]);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vLi92ZW5kb3Ivc3ByeWtlci1zaG9wL2N1c3RvbWVyLXBhZ2Uvc3JjL1NwcnlrZXJTaG9wL1l2ZXMvQ3VzdG9tZXJQYWdlL1RoZW1lL2RlZmF1bHQvY29tcG9uZW50cy9tb2xlY3VsZXMvc2F2ZS1uZXctYWRkcmVzcy9zYXZlLW5ldy1hZGRyZXNzLnRzIl0sIm5hbWVzIjpbIkVWRU5UX0FERF9ORVdfQUREUkVTUyIsIlNhdmVOZXdBZGRyZXNzIiwicmVhZHlDYWxsYmFjayIsInNoaXBwaW5nQWRkcmVzc1RvZ2dsZXJTZWxlY3RvciIsImJpbGxpbmdBZGRyZXNzVG9nZ2xlclNlbGVjdG9yIiwiY3VzdG9tZXJTaGlwcGluZ0FkZHJlc3NlcyIsImRvY3VtZW50IiwicXVlcnlTZWxlY3RvciIsImN1c3RvbWVyQmlsbGluZ0FkZHJlc3NlcyIsImFkZE5ld1NoaXBwaW5nQWRkcmVzc1NlbGVjdG9yIiwiYWRkTmV3QmlsbGluZ0FkZHJlc3NTZWxlY3RvciIsImFkZE5ld1NoaXBwaW5nQWRkcmVzcyIsImFkZE5ld0JpbGxpbmdBZGRyZXNzIiwic2F2ZU5ld0FkZHJlc3NUb2dnbGVyIiwic2F2ZUFkZHJlc3NUb2dnbGVyU2VsZWN0b3IiLCJzYW1lQXNTaGlwcGluZ1RvZ2dsZXIiLCJiaWxsaW5nU2FtZUFzU2hpcHBpbmdBZGRyZXNzVG9nZ2xlclNlbGVjdG9yIiwiY3VzdG9tZXJBZGRyZXNzZXNFeGlzdHMiLCJzaG93U2F2ZU5ld0FkZHJlc3MiLCJtYXBFdmVudHMiLCJpbml0U2F2ZU5ld0FkZHJlc3NTdGF0ZSIsImFkZEV2ZW50TGlzdGVuZXIiLCJzaGlwcGluZ1RvZ2dsZXJPbkNoYW5nZSIsImJpbGxpbmdUb2dnbGVyT25DaGFuZ2UiLCJ0b2dnbGVTYXZlTmV3QWRkcmVzcyIsIm5ld1NoaXBwaW5nQWRkcmVzc0NoZWNrZWQiLCJhZGRyZXNzVG9nZ2xlckNoYW5nZSIsIm5ld0JpbGxpbmdBZGRyZXNzQ2hlY2tlZCIsImlzU2F2ZU5ld0FkZHJlc3NPcHRpb25TZWxlY3RlZCIsInRvZ2dsZXIiLCJ2YWx1ZSIsInNhbWVBc1NoaXBwaW5nQ2hlY2tlZCIsImhpZGVTYXZlTmV3QWRkcmVzcyIsImNsYXNzTGlzdCIsImFkZCIsImhpZGVDbGFzcyIsImRpc2FibGVkIiwicmVtb3ZlIiwiY2hlY2tlZCIsImdldEF0dHJpYnV0ZSIsIkNvbXBvbmVudCJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUE7QUFDQTtBQUVBLElBQU1BLHFCQUFxQixHQUFHLGlCQUE5Qjs7SUFFcUJDLGM7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OzBNQVFvQixLOzt5TUFDRCxLOzswTEFDUCxXOzs7Ozs7O1NBRW5CQyxhLEdBQVYseUJBQWdDO0FBQzVCLFFBQUksS0FBS0MsOEJBQUwsSUFBdUMsS0FBS0MsNkJBQWhELEVBQStFO0FBQzNFLFdBQUtDLHlCQUFMLEdBQ0lDLFFBQVEsQ0FBQ0MsYUFBVCxDQUF1QixLQUFLSiw4QkFBNUIsQ0FESjtBQUdBLFdBQUtLLHdCQUFMLEdBQWlERixRQUFRLENBQUNDLGFBQVQsQ0FBdUIsS0FBS0gsNkJBQTVCLENBQWpEO0FBQ0g7O0FBRUQsUUFBSSxLQUFLSyw2QkFBTCxJQUFzQyxLQUFLQyw0QkFBL0MsRUFBNkU7QUFDekUsV0FBS0MscUJBQUwsR0FBZ0RMLFFBQVEsQ0FBQ0MsYUFBVCxDQUF1QixLQUFLRSw2QkFBNUIsQ0FBaEQ7QUFDQSxXQUFLRyxvQkFBTCxHQUErQ04sUUFBUSxDQUFDQyxhQUFULENBQXVCLEtBQUtHLDRCQUE1QixDQUEvQztBQUNIOztBQUVELFNBQUtHLHFCQUFMLEdBQStDUCxRQUFRLENBQUNDLGFBQVQsQ0FBdUIsS0FBS08sMEJBQTVCLENBQS9DO0FBQ0EsU0FBS0MscUJBQUwsR0FDSVQsUUFBUSxDQUFDQyxhQUFULENBQXVCLEtBQUtTLDJDQUE1QixDQURKO0FBSUEsU0FBS0MsdUJBQUw7QUFDSCxHOztTQUVTQSx1QixHQUFWLG1DQUEwQztBQUN0QyxRQUFJLENBQUMs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MEM7QUFDdkMsYUFBTyxLQUFLQSxZQUFMLENBQWtCLGtDQUFsQixDQUFQO0FBQ0g7Ozt3QkFFeUQ7QUFDdEQsYUFBTyxLQUFLQSxZQUFMLENBQWtCLDJDQUFsQixDQUFQO0FBQ0g7Ozt3QkFFd0M7QUFDckMsYUFBTyxLQUFLQSxZQUFMLENBQWtCLCtCQUFsQixDQUFQO0FBQ0g7Ozs7RUEzSHVDQywrRCIsImZpbGUiOiIuL2pzL3l2ZXNfZGVmYXVsdC5zYXZlLW5ldy1hZGRyZXNzLmxlZ2FjeS5qcyIsInNvdXJjZXNDb250ZW50IjpbIi8qIHRzbGludDpkaXNhYmxlICovXG5pbXBvcnQgQ29tcG9uZW50IGZyb20gJ1Nob3BVaS9tb2RlbHMvY29tcG9uZW50JztcblxuY29uc3QgRVZFTlRfQUREX05FV19BRERSRVNTID0gJ2FkZC1uZXctYWRkcmVzcyc7XG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIFNhdmVOZXdBZGRyZXNzIGV4dGVuZHMgQ29tcG9uZW50IHtcbiAgICBjdXN0b21lclNoaXBwaW5nQWRkcmVzc2VzOiBIVE1MRm9ybUVsZW1lbnQ7XG4gICAgY3VzdG9tZXJCaWxsaW5nQWRkcmVzc2VzOiBIVE1MRm9ybUVsZW1lbnQ7XG4gICAgc2F2ZU5ld0FkZHJlc3NUb2dnbGVyOiBIVE1MSW5wdXRFbGVtZW50O1xuICAgIHNhbWVBc1NoaXBwaW5nVG9nZ2xlcjogSFRNTElucHV0RWxlbWVudDtcbiAgICBhZGROZXdTaGlwcGluZ0FkZHJlc3M6IEhUTUxCdXR0b25FbGVtZW50O1xuICAgIGFkZE5ld0JpbGxpbmdBZGRyZXNzOiBIVE1MQnV0dG9uRWxlbWVudDtcblxuICAgIG5ld1NoaXBwaW5nQWRkcmVzc0NoZWNrZWQ6IGJvb2xlYW4gPSBmYWxzZTtcbiAgICBuZXdCaWxsaW5nQWRkcmVzc0NoZWNrZWQ6IGJvb2xlYW4gPSBmYWxzZTtcbiAgICByZWFkb25seSBoaWRlQ2xhc3M6IHN0cmluZyA9ICdpcy1oaWRkZW4nO1xuXG4gICAgcHJvdGVjdGVkIHJlYWR5Q2FsbGJhY2soKTogdm9pZCB7XG4gICAgICAgIGlmICh0aGlzLnNoaXBwaW5nQWRkcmVzc1RvZ2dsZXJTZWxlY3RvciAmJiB0aGlzLmJpbGxpbmdBZGRyZXNzVG9nZ2xlclNlbGVjdG9yKSB7XG4gICAgICAgICAgICB0aGlzLmN1c3RvbWVyU2hpcHBpbmdBZGRyZXNzZXMgPSA8SFRNTEZvcm1FbGVtZW50PihcbiAgICAgICAgICAgICAgICBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKHRoaXMuc2hpcHBpbmdBZGRyZXNzVG9nZ2xlclNlbGVjdG9yKVxuICAgICAgICAgICAgKTtcbiAgICAgICAgICAgIHRoaXMuY3VzdG9tZXJCaWxsaW5nQWRkcmVzc2VzID0gPEhUTUxGb3JtRWxlbWVudD5kb2N1bWVudC5xdWVyeVNlbGVjdG9yKHRoaXMuYmlsbGluZ0FkZHJlc3NUb2dnbGVyU2VsZWN0b3IpO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKHRoaXMuYWRkTmV3U2hpcHBpbmdBZGRyZXNzU2VsZWN0b3IgJiYgdGhpcy5hZGROZXdCaWxsaW5nQWRkcmVzc1NlbGVjdG9yKSB7XG4gICAgICAgICAgICB0aGlzLmFkZE5ld1NoaXBwaW5nQWRkcmVzcyA9IDxIVE1MQnV0dG9uRWxlbWVudD5kb2N1bWVudC5xdWVyeVNlbGVjdG9yKHRoaXMuYWRkTmV3U2hpcHBpbmdBZGRyZXNzU2VsZWN0b3IpO1xuICAgICAgICAgICAgdGhpcy5hZGROZXdCaWxsaW5nQWRkcmVzcyA9IDxIVE1MQnV0dG9uRWxlbWVudD5kb2N1bWVudC5xdWVyeVNlbGVjdG9yKHRoaXMuYWRkTmV3QmlsbGluZ0FkZHJlc3NTZWxlY3Rvcik7XG4gICAgICAgIH1cblxuICAgICAgICB0aGlzLnNhdmVOZXdBZGRyZXNzVG9nZ2xlciA9IDxIVE1MSW5wdXRFbGVtZW50PmRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IodGhpcy5zYXZlQWRkcmVzc1RvZ2dsZXJTZWxlY3Rvcik7XG4gICAgICAgIHRoaXMuc2FtZUFzU2hpcHBpbmdUb2dnbGVyID0gPEhUTUxJbnB1dEVsZW1lbnQ+KFxuICAgICAgICAgICAgZG9jdW1lbnQucXVlcnlTZWxlY3Rvcih0aGlzLmJpbGxpbmdTYW1lQXNTaGlwcGluZ0FkZHJlc3NUb2dnbGVyU2VsZWN0b3IpXG4gICAgICAgICk7XG5cbiAgICAgICAgdGhpcy5jdXN0b21lckFkZHJlc3Nlc0V4aXN0cygpO1xuICAgIH1cblxuICAgIHByb3RlY3RlZCBjdXN0b21lckFkZHJlc3Nlc0V4aXN0cygpOiB2b2lkIHtcbiAgICAgICAgaWYgKCF0aGlzLmN1c3RvbWVyU2hpcHBpbmdBZGRyZXNzZXMpIHtcbiAgICAgICAgICAgIHRoaXMuc2hvd1NhdmVOZXdBZGRyZXNzKCk7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cblxuICAgICAgICB0aGlzLm1hcEV2ZW50cygpO1xuICAgICAgICB0aGlzLmluaXRTYXZlTmV3QWRkcmVzc1N0YXRlKCk7XG4gICAgfVxuXG4gICAgcHJvdGVjdGVkIG1hcEV2ZW50cygpOiB2b2lkIHtcbiAgICAgICAgaWYgKHRoaXMuYWRkTmV3U2hpcHBpbmdBZGRyZXNzICYmIHRoaXMuYWRkTmV3QmlsbGluZ0FkZHJlc3MpIHtcbiAgICAgICAgICAgIHRoaXMuYWRkTmV3U2hpcHBpbmdBZGRyZXNzLmFkZEV2ZW50TGlzdGVuZXIoRVZFTlRfQUREX05FV19BRERSRVNTLCAoKSA9PiB0aGlzLnNoaXBwaW5nVG9nZ2xlck9uQ2hhbmdlKCkpO1xuICAgICAgICAgICAgdGhpcy5hZGROZXdCaWxsaW5nQWRkcmVzcy5hZGRFdmVudExpc3RlbmVyKEVWRU5UX0FERF9ORVdfQUREUkVTUywgKCkgPT4gdGhpcy5iaWxsaW5nVG9nZ2xlck9uQ2hhbmdlKCkpO1xuICAgICAgICB9XG5cbiAgICAgICAgdGhpcy5jdXN0b21lclNoaXBwaW5nQWRkcmVzc2VzLmFkZEV2ZW50TGlzdGVuZXIoJ2NoYW5nZScsICgpID0+IHRoaXMuc2hpcHBpbmdUb2dnbGVyT25DaGFuZ2UoKSk7XG4gICAgICAgIHRoaXMuY3VzdG9tZXJCaWxsaW5nQWRkcmVzc2VzLmFkZEV2ZW50TGlzdGVuZXIoJ2NoYW5nZScsICgpID0+IHRoaXMuYmlsbGluZ1RvZ2dsZXJPbkNoYW5nZSgpKTtcbiAgICAgICAgdGhpcy5zYW1lQXNTaGlwcGluZ1RvZ2dsZXIuYWRkRXZlbnRMaXN0ZW5lcignY2hhbmdlJywgKCkgPT4gdGhpcy50b2dnbGVTYXZlTmV3QWRkcmVzcygpKTtcbiAgICB9XG5cbiAgICBwcm90ZWN0ZWQgc2hpcHBpbmdUb2dnbGVyT25DaGFuZ2UoKTogdm9pZCB7XG4gICAgICAgIHRoaXMubmV3U2hpcHBpbmdBZGRyZXNzQ2hlY2tlZCA9IHRoaXMuYWRkcmVzc1RvZ2dsZXJDaGFuZ2UodGhpcy5jdXN0b21lclNoaXBwaW5nQWRkcmVzc2VzKTtcbiAgICAgICAgdGhpcy50b2dnbGVTYXZlTmV3QWRkcmVzcygpO1xuICAgIH1cblxuICAgIHByb3RlY3RlZCBiaWxsaW5nVG9nZ2xlck9uQ2hhbmdlKCk6IHZvaWQge1xuICAgICAgICB0aGlzLm5ld0JpbGxpbmdBZGRyZXNzQ2hlY2tlZCA9IHRoaXMuYWRkcmVzc1RvZ2dsZXJDaGFuZ2UodGhpcy5jdXN0b21lckJpbGxpbmdBZGRyZXNzZXMpO1xuICAgICAgICB0aGlzLnRvZ2dsZVNhdmVOZXdBZGRyZXNzKCk7XG4gICAgfVxuXG4gICAgcHJvdGVjdGVkIGluaXRTYXZlTmV3QWRkcmVzc1N0YXRlKCk6IHZvaWQge1xuICAgICAgICB0aGlzLm5ld1NoaXBwaW5nQWRkcmVzc0NoZWNrZWQgPSB0aGlzLmlzU2F2ZU5ld0FkZHJlc3NPcHRpb25TZWxlY3RlZCh0aGlzLmN1c3RvbWVyU2hpcHBpbmdBZGRyZXNzZXMpO1xuICAgICAgICB0aGlzLm5ld0JpbGxpbmdBZGRyZXNzQ2hlY2tlZCA9IHRoaXMuaXNTYXZlTmV3QWRkcmVzc09wdGlvblNlbGVjdGVkKHRoaXMuY3VzdG9tZXJCaWxsaW5nQWRkcmVzc2VzKTtcbiAgICAgICAgdGhpcy50b2dnbGVTYXZlTmV3QWRkcmVzcygpO1xuICAgIH1cblxuICAgIHByb3RlY3RlZCBhZGRyZXNzVG9nZ2xlckNoYW5nZSh0b2dnbGVyKTogYm9vbGVhbiB7XG4gICAgICAgIHJldHVybiB0aGlzLmlzU2F2ZU5ld0FkZHJlc3NPcHRpb25TZWxlY3RlZCh0b2dnbGVyKTtcbiAgICB9XG5cbiAgICBwcm90ZWN0ZWQgaXNTYXZlTmV3QWRkcmVzc09wdGlvblNlbGVjdGVkKHRvZ2dsZXI6IEhUTUxGb3JtRWxlbWVudCk6IGJvb2xlYW4ge1xuICAgICAgICByZXR1cm4gIXRvZ2dsZXIudmFsdWU7XG4gICAgfVxuXG4gICAgdG9nZ2xlU2F2ZU5ld0FkZHJlc3MoKTogdm9pZCB7XG4gICAgICAgIGlmICh0aGlzLm5ld1NoaXBwaW5nQWRkcmVzc0NoZWNrZWQgfHwgKHRoaXMubmV3QmlsbGluZ0FkZHJlc3NDaGVja2VkICYmICF0aGlzLnNhbWVBc1NoaXBwaW5nQ2hlY2tlZCkpIHtcbiAgICAgICAgICAgIHRoaXMuc2hvd1NhdmVOZXdBZGRyZXNzKCk7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cblxuICAgICAgICB0aGlzLmhpZGVTYXZlTmV3QWRkcmVzcygpO1xuICAgIH1cblxuICAgIGhpZGVTYXZlTmV3QWRkcmVzcygpOiB2b2lkIHtcbiAgICAgICAgdGhpcy5jbGFzc0xpc3QuYWRkKHRoaXMuaGlkZUNsYXNzKTtcbiAgICAgICAgdGhpcy5zYXZlTmV3QWRkcmVzc1RvZ2dsZXIuZGlzYWJsZWQgPSB0cnVlO1xuICAgIH1cblxuICAgIHNob3dTYXZlTmV3QWRkcmVzcygpOiB2b2lkIHtcbiAgICAgICAgdGhpcy5jbGFzc0xpc3QucmVtb3ZlKHRoaXMuaGlkZUNsYXNzKTtcbiAgICAgICAgdGhpcy5zYXZlTmV3QWRkcmVzc1RvZ2dsZXIuZGlzYWJsZWQgPSBmYWxzZTtcbiAgICB9XG5cbiAgICBnZXQgc2FtZUFzU2hpcHBpbmdDaGVja2VkKCk6IGJvb2xlYW4ge1xuICAgICAgICByZXR1cm4gdGhpcy5zYW1lQXNTaGlwcGluZ1RvZ2dsZXIuY2hlY2tlZDtcbiAgICB9XG5cbiAgICBnZXQgc2hpcHBpbmdBZGRyZXNzVG9nZ2xlclNlbGVjdG9yKCk6IHN0cmluZyB7XG4gICAgICAgIHJldHVybiB0aGlzLmdldEF0dHJpYnV0ZSgnc2hpcHBpbmctYWRkcmVzcy10b2dnbGVyLXNlbGVjdG9yJyk7XG4gICAgfVxuXG4gICAgZ2V0IGJpbGxpbmdBZGRyZXNzVG9nZ2xlclNlbGVjdG9yKCk6IHN0cmluZyB7XG4gICAgICAgIHJldHVybiB0aGlzLmdldEF0dHJpYnV0ZSgnYmlsbGluZy1hZGRyZXNzLXRvZ2dsZXItc2VsZWN0b3InKTtcbiAgICB9XG5cbiAgICBnZXQgYWRkTmV3U2hpcHBpbmdBZGRyZXNzU2VsZWN0b3IoKTogc3RyaW5nIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuZ2V0QXR0cmlidXRlKCdhZGQtbmV3LXNoaXBwaW5nLWFkZHJlc3Mtc2VsZWN0b3InKTtcbiAgICB9XG5cbiAgICBnZXQgYWRkTmV3QmlsbGluZ0FkZHJlc3NTZWxlY3RvcigpOiBzdHJpbmcge1xuICAgICAgICByZXR1cm4gdGhpcy5nZXRBdHRyaWJ1dGUoJ2FkZC1uZXctYmlsbGluZy1hZGRyZXNzLXNlbGVjdG9yJyk7XG4gICAgfVxuXG4gICAgZ2V0IGJpbGxpbmdTYW1lQXNTaGlwcGluZ0FkZHJlc3NUb2dnbGVyU2VsZWN0b3IoKTogc3RyaW5nIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuZ2V0QXR0cmlidXRlKCdiaWxsaW5nLXNhbWUtYXMtc2hpcHBpbmctdG9nZ2xlci1zZWxlY3RvcicpO1xuICAgIH1cblxuICAgIGdldCBzYXZlQWRkcmVzc1RvZ2dsZXJTZWxlY3RvcigpOiBzdHJpbmcge1xuICAgICAgICByZXR1cm4gdGhpcy5nZXRBdHRyaWJ1dGUoJ3NhdmUtYWRkcmVzcy10b2dnbGVyLXNlbGVjdG9yJyk7XG4gICAgfVxufVxuIl0sInNvdXJjZVJvb3QiOiIifQ==