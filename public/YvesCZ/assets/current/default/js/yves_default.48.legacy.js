(window["webpackJsonp_yves_default"] = window["webpackJsonp_yves_default"] || []).push([[48],{

/***/ "./src/Pyz/Yves/StoreSwitcherWidget/Theme/default/components/molecules/store-switcher/store-switcher.ts":
/*!**************************************************************************************************************!*\
  !*** ./src/Pyz/Yves/StoreSwitcherWidget/Theme/default/components/molecules/store-switcher/store-switcher.ts ***!
  \**************************************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return StoreSwitcher; });
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



var StoreSwitcher = /*#__PURE__*/function (_Component) {
  _babel_runtime_helpers_inheritsLoose__WEBPACK_IMPORTED_MODULE_3___default()(StoreSwitcher, _Component);

  var _super = _createSuper(StoreSwitcher);

  function StoreSwitcher() {
    var _this;

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this = _Component.call.apply(_Component, [this].concat(args)) || this;

    _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_4___default()(_babel_runtime_helpers_assertThisInitialized__WEBPACK_IMPORTED_MODULE_0___default()(_this), "select", void 0);

    _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_4___default()(_babel_runtime_helpers_assertThisInitialized__WEBPACK_IMPORTED_MODULE_0___default()(_this), "storeSwitcherFormText", void 0);

    _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_4___default()(_babel_runtime_helpers_assertThisInitialized__WEBPACK_IMPORTED_MODULE_0___default()(_this), "storeSwitcherDropDown", void 0);

    _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_4___default()(_babel_runtime_helpers_assertThisInitialized__WEBPACK_IMPORTED_MODULE_0___default()(_this), "storeSwitcherPassword", void 0);

    _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_4___default()(_babel_runtime_helpers_assertThisInitialized__WEBPACK_IMPORTED_MODULE_0___default()(_this), "storeSwitcherUrl", void 0);

    _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_4___default()(_babel_runtime_helpers_assertThisInitialized__WEBPACK_IMPORTED_MODULE_0___default()(_this), "selectModalSwitcherDropDown", void 0);

    _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_4___default()(_babel_runtime_helpers_assertThisInitialized__WEBPACK_IMPORTED_MODULE_0___default()(_this), "selectModalSwitcherSpan", void 0);

    return _this;
  }

  var _proto = StoreSwitcher.prototype;

  _proto.readyCallback = function readyCallback() {};

  _proto.init = function init() {
    this.select = this.getElementsByClassName(this.jsName + "__select_store")[0];
    this.storeSwitcherFormText = document.getElementsByClassName('form-text--shop-switcher')[0];
    this.storeSwitcherDropDown = document.getElementsByClassName('form-dropdown--shop-switcher')[0];
    this.selectModalSwitcherDropDown = document.getElementsByClassName('js-store-switcher__select_store')[0];
    this.selectModalSwitcherSpan = document.querySelector('.select2-selection__rendered');
    this.storeSwitcherPassword = document.getElementById('form-password-shop-switcher');
    this.storeSwitcherUrl = document.getElementById('form-url-shop-switcher');
    this.mapEvents();
  };

  _proto.mapEvents = function mapEvents() {
    var _this2 = this;

    this.select.addEventListener('change', function (event) {
      return _this2.onTriggerChange(event);
    });
  };

  _proto.onTriggerChange = function onTriggerChange(event) {
    var destinationTarget = this.selectModalSwitcherDropDown;
    var selectTarget = event.currentTarget;
    var elementFromModal = selectTarget.parentElement.offsetParent.className;
    var is_pwd_protected = selectTarget.options[selectTarget.selectedIndex].getAttribute("is_password_protected");

    if (this.hasUrl(selectTarget)) {
      var url = this.currentSelectValue(selectTarget);
      var convertedUrl = url;

      if (url.includes("-&-")) {
        convertedUrl = url.replace("-&-", "AND");
      }

      if (is_pwd_protected == 1) {
        this.storeSwitcherFormText.classList.add('is-hidden');
        this.storeSwitcherPassword.classList.remove('is-hidden');
        this.storeSwitcherUrl.value = convertedUrl;

        if (elementFromModal !== 'popup-ui-store-switcher__overlay') {
          document.getElementsByTagName('popup-ui-store-switcher')[0].classList.add('popup-ui-store-switcher--show');

          for (var i = 0; i < destinationTarget.options.length; ++i) {
            if (destinationTarget.options[i].value === url) {
              var text = " " + destinationTarget.options[i].text;
              destinationTarget.options[i].setAttribute("selected", true);
              this.selectModalSwitcherSpan.textContent = text;
            }
          }
        }
      } else {
        window.location.href = convertedUrl;
      }
    }
  };

  _proto.currentSelectValue = function currentSelectValue(select) {
    return select.options[select.selectedIndex].value;
  };

  _proto.hasUrl = function hasUrl(select) {
    return !!select.value;
  };

  return StoreSwitcher;
}(ShopUi_models_component__WEBPACK_IMPORTED_MODULE_5__["default"]);



/***/ })

}]);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vLi9zcmMvUHl6L1l2ZXMvU3RvcmVTd2l0Y2hlcldpZGdldC9UaGVtZS9kZWZhdWx0L2NvbXBvbmVudHMvbW9sZWN1bGVzL3N0b3JlLXN3aXRjaGVyL3N0b3JlLXN3aXRjaGVyLnRzIl0sIm5hbWVzIjpbIlN0b3JlU3dpdGNoZXIiLCJyZWFkeUNhbGxiYWNrIiwiaW5pdCIsInNlbGVjdCIsImdldEVsZW1lbnRzQnlDbGFzc05hbWUiLCJqc05hbWUiLCJzdG9yZVN3aXRjaGVyRm9ybVRleHQiLCJkb2N1bWVudCIsInN0b3JlU3dpdGNoZXJEcm9wRG93biIsInNlbGVjdE1vZGFsU3dpdGNoZXJEcm9wRG93biIsInNlbGVjdE1vZGFsU3dpdGNoZXJTcGFuIiwicXVlcnlTZWxlY3RvciIsInN0b3JlU3dpdGNoZXJQYXNzd29yZCIsImdldEVsZW1lbnRCeUlkIiwic3RvcmVTd2l0Y2hlclVybCIsIm1hcEV2ZW50cyIsImFkZEV2ZW50TGlzdGVuZXIiLCJldmVudCIsIm9uVHJpZ2dlckNoYW5nZSIsImRlc3RpbmF0aW9uVGFyZ2V0Iiwic2VsZWN0VGFyZ2V0IiwiY3VycmVudFRhcmdldCIsImVsZW1lbnRGcm9tTW9kYWwiLCJwYXJlbnRFbGVtZW50Iiwib2Zmc2V0UGFyZW50IiwiY2xhc3NOYW1lIiwiaXNfcHdkX3Byb3RlY3RlZCIsIm9wdGlvbnMiLCJzZWxlY3RlZEluZGV4IiwiZ2V0QXR0cmlidXRlIiwiaGFzVXJsIiwidXJsIiwiY3VycmVudFNlbGVjdFZhbHVlIiwiY29udmVydGVkVXJsIiwiaW5jbHVkZXMiLCJyZXBsYWNlIiwiY2xhc3NMaXN0IiwiYWRkIiwicmVtb3ZlIiwidmFsdWUiLCJnZXRFbGVtZW50c0J5VGFnTmFtZSIsImkiLCJsZW5ndGgiLCJ0ZXh0Iiwic2V0QXR0cmlidXRlIiwidGV4dENvbnRlbnQiLCJ3aW5kb3ciLCJsb2NhdGlvbiIsImhyZWYiLCJDb21wb25lbnQiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUFBOztJQUVxQkEsYTs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O1NBU1BDLGEsR0FBVix5QkFBZ0MsQ0FBRSxDOztTQUV4QkMsSSxHQUFWLGdCQUF1QjtBQUNuQixTQUFLQyxNQUFMLEdBQWlDLEtBQUtDLHNCQUFMLENBQStCLEtBQUtDLE1BQXBDLHFCQUE0RCxDQUE1RCxDQUFqQztBQUNBLFNBQUtDLHFCQUFMLEdBQTZCQyxRQUFRLENBQUNILHNCQUFULENBQWdDLDBCQUFoQyxFQUE0RCxDQUE1RCxDQUE3QjtBQUNBLFNBQUtJLHFCQUFMLEdBQTZCRCxRQUFRLENBQUNILHNCQUFULENBQWdDLDhCQUFoQyxFQUFnRSxDQUFoRSxDQUE3QjtBQUNBLFNBQUtLLDJCQUFMLEdBQW1DRixRQUFRLENBQUNILHNCQUFULENBQWdDLGlDQUFoQyxFQUFtRSxDQUFuRSxDQUFuQztBQUNBLFNBQUtNLHVCQUFMLEdBQStCSCxRQUFRLENBQUNJLGFBQVQsQ0FBdUIsOEJBQXZCLENBQS9CO0FBQ0EsU0FBS0MscUJBQUwsR0FBNkJMLFFBQVEsQ0FBQ00sY0FBVCxDQUF3Qiw2QkFBeEIsQ0FBN0I7QUFDQSxTQUFLQyxnQkFBTCxHQUF3QlAsUUFBUSxDQUFDTSxjQUFULENBQXdCLHdCQUF4QixDQUF4QjtBQUNBLFNBQUtFLFNBQUw7QUFDSCxHOztTQUVTQSxTLEdBQVYscUJBQTRCO0FBQUE7O0FBQ3hCLFNBQUtaLE1BQUwsQ0FBWWEsZ0JBQVosQ0FBNkIsUUFBN0IsRUFBdUMsVUFBQ0MsS0FBRDtBQUFBLGFBQWtCLE1BQUksQ0FBQ0MsZUFBTCxDQUFxQkQsS0FBckIsQ0FBbEI7QUFBQSxLQUF2QztBQUNILEc7O1NBRVNDLGUsR0FBVix5QkFBMEJELEtBQTFCLEVBQThDO0FBQzFDLFFBQU1FLGlCQUFpQixHQUFHLEtBQUtWLDJCQUEvQjtBQUNBLFFBQU1XLFlBQVksR0FBc0JILEtBQUssQ0FBQ0ksYUFBOUM7QUFDQSxRQUFNQyxnQkFBZ0IsR0FBR0YsWUFBWSxDQUFDRyxhQUFiLENBQTJCQyxZQUEzQixDQUF3Q0MsU0FBakU7QUFDQSxRQUFNQyxnQkFBZ0IsR0FBR04sWUFBWSxDQUFDTyxPQUFiLENBQXFCUCxZQUFZLENBQUNRLGFBQWxDLEVBQWlEQyxZQUFqRCxDQUE4RCx1QkFBOUQsQ0FBekI7O0FBRUEsUUFBSSxLQUFLQyxNQUFMLENBQVlWLFlBQVosQ0FBSixFQUErQjtBQUMzQixVQUFJVyxHQUFHLEdBQUcsS0FBS0Msa0JBQUwsQ0FBd0JaLFlBQXhCLENBQVY7QUFDQSxVQUFJYSxZQUFZLEdBQUdGLEdBQW5COztBQUNBLFVBQUlBLEdBQUcsQ0FBQ0csUUFBSixDQUFhLEtBQWIsQ0FBSixFQUF5QjtBQUNyQkQsb0JBQVksR0FBR0YsR0FBRyxDQUFDSSxPQUFKLENBQVksS0FBWixFQUFtQixLQUFuQixDQUFmO0FBQ0g7O0FBQ0QsVUFBSVQsZ0JBQWdCLElBQUksQ0FBeEIsRUFBMkI7QUFDdkIsYUFBS3BCLHFCQUFMLENBQTJCOEIsU0FBM0IsQ0FBcUNDLEdBQXJDLENBQXlDLFdBQXpDO0FBQ0EsYUFBS3pCLHFCQUFMLENBQTJCd0IsU0FBM0IsQ0FBcUNFLE1BQXJDLENBQTRDLFdBQTVDO0FBQ0EsYUFBS3hCLGdCQUFMLENBQXNCeUIsS0FBdEIsR0FBOEJOLFlBQTlCOztBQUNGLFlBQUlYLGdCQUFnQixLQUFLLGtDQUF6QixFQUE2RDtBQUN6RGYsa0JBQVEsQ0FBQ2lDLG9CQUFULENBQThCLHlCQUE5QixFQUF5RCxDQUF6RCxFQUE0REosU0FBNUQsQ0FBc0VDLEdBQXRFLENBQTBFLCtCQUExRTs7QUFDQSxlQUFLLElBQUlJLENBQUMsR0FBRyxDQUFiLEVBQWdCQSxDQUFDLEdBQUd0QixpQkFBaUIsQ0FBQ1EsT0FBbEIsQ0FBMEJlLE1BQTlDLEVBQXNELEVBQUVELENBQXhELEVBQTBEO0FBQ3RELGdCQUFJdEIsaUJBQWlCLENBQUNRLE9BQWxCLENBQTBCYyxDQUExQixFQUE2QkYsS0FBN0IsS0FBdUNSLEdBQTNDLEVBQStDO0FBQzNDLGtCQUFJWSxJQUFJLEdBQUcsTUFBTXhCLGlCQUFpQixDQUFDUSxPQUFsQixDQUEwQmMsQ0FBMUIsRUFBNkJFLElBQTlDO0FBQ0F4QiwrQkFBaUIsQ0FBQ1EsT0FBbEIsQ0FBMEJjLENBQTFCLEVBQTZCRyxZQUE3QixDQUEwQyxVQUExQyxFQUFzRCxJQUF0RDtBQUNBLG1CQUFLbEMsdUJBQUwsQ0FBNkJtQyxXQUE3QixHQUEyQ0YsSUFBM0M7QUFDSDtBQUNKO0FBQ0o7QUFDRixPQWRELE1BY087QUFDSEcsY0FBTSxDQUFDQyxRQUFQLENBQWdCQyxJQUFoQixHQUF1QmYsWUFBdkI7QUFDSDtBQUNKO0FBQ0osRzs7U0FFU0Qsa0IsR0FBViw0QkFBNkI3QixNQUE3QixFQUFnRTtBQUM1RCxXQUFPQSxNQUFNLENBQUN3QixPQUFQLENBQWV4QixNQUFNLENBQUN5QixhQUF0QixFQUFxQ1csS0FBNUM7QUFDSCxHOztTQUVTVCxNLEdBQVYsZ0JBQWlCM0IsTUFBakIsRUFBcUQ7QUFDakQsV0FBTyxDQUFDLENBQUNBLE1BQU0sQ0FBQ29DLEtBQWhCO0FBQ0gsRzs7O0VBaEVzQ1UsK0QiLCJmaWxlIjoiLi9qcy95dmVzX2RlZmF1bHQuNDgubGVnYWN5LmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IENvbXBvbmVudCBmcm9tICdTaG9wVWkvbW9kZWxzL2NvbXBvbmVudCc7XG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIFN0b3JlU3dpdGNoZXIgZXh0ZW5kcyBDb21wb25lbnQge1xuICAgIHByb3RlY3RlZCBzZWxlY3Q6IEhUTUxTZWxlY3RFbGVtZW50O1xuICAgIHByb3RlY3RlZCBzdG9yZVN3aXRjaGVyRm9ybVRleHQ7XG4gICAgcHJvdGVjdGVkIHN0b3JlU3dpdGNoZXJEcm9wRG93bjtcbiAgICBwcm90ZWN0ZWQgc3RvcmVTd2l0Y2hlclBhc3N3b3JkO1xuICAgIHByb3RlY3RlZCBzdG9yZVN3aXRjaGVyVXJsO1xuICAgIHByb3RlY3RlZCBzZWxlY3RNb2RhbFN3aXRjaGVyRHJvcERvd247XG4gICAgcHJvdGVjdGVkIHNlbGVjdE1vZGFsU3dpdGNoZXJTcGFuO1xuXG4gICAgcHJvdGVjdGVkIHJlYWR5Q2FsbGJhY2soKTogdm9pZCB7fVxuXG4gICAgcHJvdGVjdGVkIGluaXQoKTogdm9pZCB7XG4gICAgICAgIHRoaXMuc2VsZWN0ID0gPEhUTUxTZWxlY3RFbGVtZW50PnRoaXMuZ2V0RWxlbWVudHNCeUNsYXNzTmFtZShgJHt0aGlzLmpzTmFtZX1fX3NlbGVjdF9zdG9yZWApWzBdO1xuICAgICAgICB0aGlzLnN0b3JlU3dpdGNoZXJGb3JtVGV4dCA9IGRvY3VtZW50LmdldEVsZW1lbnRzQnlDbGFzc05hbWUoJ2Zvcm0tdGV4dC0tc2hvcC1zd2l0Y2hlcicpWzBdO1xuICAgICAgICB0aGlzLnN0b3JlU3dpdGNoZXJEcm9wRG93biA9IGRvY3VtZW50LmdldEVsZW1lbnRzQnlDbGFzc05hbWUoJ2Zvcm0tZHJvcGRvd24tLXNob3Atc3dpdGNoZXInKVswXTtcbiAgICAgICAgdGhpcy5zZWxlY3RNb2RhbFN3aXRjaGVyRHJvcERvd24gPSBkb2N1bWVudC5nZXRFbGVtZW50c0J5Q2xhc3NOYW1lKCdqcy1zdG9yZS1zd2l0Y2hlcl9fc2VsZWN0X3N0b3JlJylbMF07XG4gICAgICAgIHRoaXMuc2VsZWN0TW9kYWxTd2l0Y2hlclNwYW4gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuc2VsZWN0Mi1zZWxlY3Rpb25fX3JlbmRlcmVkJyk7XG4gICAgICAgIHRoaXMuc3RvcmVTd2l0Y2hlclBhc3N3b3JkID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2Zvcm0tcGFzc3dvcmQtc2hvcC1zd2l0Y2hlcicpO1xuICAgICAgICB0aGlzLnN0b3JlU3dpdGNoZXJVcmwgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnZm9ybS11cmwtc2hvcC1zd2l0Y2hlcicpO1xuICAgICAgICB0aGlzLm1hcEV2ZW50cygpO1xuICAgIH1cblxuICAgIHByb3RlY3RlZCBtYXBFdmVudHMoKTogdm9pZCB7XG4gICAgICAgIHRoaXMuc2VsZWN0LmFkZEV2ZW50TGlzdGVuZXIoJ2NoYW5nZScsIChldmVudDogRXZlbnQpID0+IHRoaXMub25UcmlnZ2VyQ2hhbmdlKGV2ZW50KSk7XG4gICAgfVxuXG4gICAgcHJvdGVjdGVkIG9uVHJpZ2dlckNoYW5nZShldmVudDogRXZlbnQpOiB2b2lkIHtcbiAgICAgICAgY29uc3QgZGVzdGluYXRpb25UYXJnZXQgPSB0aGlzLnNlbGVjdE1vZGFsU3dpdGNoZXJEcm9wRG93bjtcbiAgICAgICAgY29uc3Qgc2VsZWN0VGFyZ2V0ID0gPEhUTUxTZWxlY3RFbGVtZW50PmV2ZW50LmN1cnJlbnRUYXJnZXQ7XG4gICAgICAgIGNvbnN0IGVsZW1lbnRGcm9tTW9kYWwgPSBzZWxlY3RUYXJnZXQucGFyZW50RWxlbWVudC5vZmZzZXRQYXJlbnQuY2xhc3NOYW1lO1xuICAgICAgICBjb25zdCBpc19wd2RfcHJvdGVjdGVkID0gc2VsZWN0VGFyZ2V0Lm9wdGlvbnNbc2VsZWN0VGFyZ2V0LnNlbGVjdGVkSW5kZXhdLmdldEF0dHJpYnV0ZShcImlzX3Bhc3N3b3JkX3Byb3RlY3RlZFwiKTtcblxuICAgICAgICBpZiAodGhpcy5oYXNVcmwoc2VsZWN0VGFyZ2V0KSkge1xuICAgICAgICAgICAgbGV0IHVybCA9IHRoaXMuY3VycmVudFNlbGVjdFZhbHVlKHNlbGVjdFRhcmdldCk7XG4gICAgICAgICAgICBsZXQgY29udmVydGVkVXJsID0gdXJsO1xuICAgICAgICAgICAgaWYgKHVybC5pbmNsdWRlcyhcIi0mLVwiKSkge1xuICAgICAgICAgICAgICAgIGNvbnZlcnRlZFVybCA9IHVybC5yZXBsYWNlKFwiLSYtXCIsIFwiQU5EXCIpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaWYgKGlzX3B3ZF9wcm90ZWN0ZWQgPT0gMSkge1xuICAgICAgICAgICAgICAgIHRoaXMuc3RvcmVTd2l0Y2hlckZvcm1UZXh0LmNsYXNzTGlzdC5hZGQoJ2lzLWhpZGRlbicpO1xuICAgICAgICAgICAgICAgIHRoaXMuc3RvcmVTd2l0Y2hlclBhc3N3b3JkLmNsYXNzTGlzdC5yZW1vdmUoJ2lzLWhpZGRlbicpO1xuICAgICAgICAgICAgICAgIHRoaXMuc3RvcmVTd2l0Y2hlclVybC52YWx1ZSA9IGNvbnZlcnRlZFVybDtcbiAgICAgICAgICAgICAgaWYgKGVsZW1lbnRGcm9tTW9kYWwgIT09ICdwb3B1cC11aS1zdG9yZS1zd2l0Y2hlcl9fb3ZlcmxheScpIHtcbiAgICAgICAgICAgICAgICAgIGRvY3VtZW50LmdldEVsZW1lbnRzQnlUYWdOYW1lKCdwb3B1cC11aS1zdG9yZS1zd2l0Y2hlcicpWzBdLmNsYXNzTGlzdC5hZGQoJ3BvcHVwLXVpLXN0b3JlLXN3aXRjaGVyLS1zaG93Jyk7XG4gICAgICAgICAgICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IGRlc3RpbmF0aW9uVGFyZ2V0Lm9wdGlvbnMubGVuZ3RoOyArK2kpe1xuICAgICAgICAgICAgICAgICAgICAgIGlmIChkZXN0aW5hdGlvblRhcmdldC5vcHRpb25zW2ldLnZhbHVlID09PSB1cmwpe1xuICAgICAgICAgICAgICAgICAgICAgICAgICBsZXQgdGV4dCA9IFwiIFwiICsgZGVzdGluYXRpb25UYXJnZXQub3B0aW9uc1tpXS50ZXh0O1xuICAgICAgICAgICAgICAgICAgICAgICAgICBkZXN0aW5hdGlvblRhcmdldC5vcHRpb25zW2ldLnNldEF0dHJpYnV0ZShcInNlbGVjdGVkXCIsIHRydWUpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLnNlbGVjdE1vZGFsU3dpdGNoZXJTcGFuLnRleHRDb250ZW50ID0gdGV4dDtcbiAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgd2luZG93LmxvY2F0aW9uLmhyZWYgPSBjb252ZXJ0ZWRVcmw7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBwcm90ZWN0ZWQgY3VycmVudFNlbGVjdFZhbHVlKHNlbGVjdDogSFRNTFNlbGVjdEVsZW1lbnQpOiBzdHJpbmcge1xuICAgICAgICByZXR1cm4gc2VsZWN0Lm9wdGlvbnNbc2VsZWN0LnNlbGVjdGVkSW5kZXhdLnZhbHVlO1xuICAgIH1cblxuICAgIHByb3RlY3RlZCBoYXNVcmwoc2VsZWN0OiBIVE1MU2VsZWN0RWxlbWVudCk6IGJvb2xlYW4ge1xuICAgICAgICByZXR1cm4gISFzZWxlY3QudmFsdWU7XG4gICAgfVxufVxuIl0sInNvdXJjZVJvb3QiOiIifQ==