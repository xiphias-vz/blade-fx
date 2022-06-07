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
/* harmony import */ var ShopUi_models_component__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ShopUi/models/component */ "./vendor/spryker-shop/shop-ui/src/SprykerShop/Yves/ShopUi/Theme/default/models/component.ts");
function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }


class StoreSwitcher extends ShopUi_models_component__WEBPACK_IMPORTED_MODULE_0__["default"] {
  constructor() {
    super(...arguments);

    _defineProperty(this, "select", void 0);

    _defineProperty(this, "storeSwitcherFormText", void 0);

    _defineProperty(this, "storeSwitcherDropDown", void 0);

    _defineProperty(this, "storeSwitcherPassword", void 0);

    _defineProperty(this, "storeSwitcherUrl", void 0);

    _defineProperty(this, "selectModalSwitcherDropDown", void 0);

    _defineProperty(this, "selectModalSwitcherSpan", void 0);
  }

  readyCallback() {}

  init() {
    this.select = this.getElementsByClassName(this.jsName + "__select_store")[0];
    this.storeSwitcherFormText = document.getElementsByClassName('form-text--shop-switcher')[0];
    this.storeSwitcherDropDown = document.getElementsByClassName('form-dropdown--shop-switcher')[0];
    this.selectModalSwitcherDropDown = document.getElementsByClassName('js-store-switcher__select_store')[0];
    this.selectModalSwitcherSpan = document.querySelector('.select2-selection__rendered');
    this.storeSwitcherPassword = document.getElementById('form-password-shop-switcher');
    this.storeSwitcherUrl = document.getElementById('form-url-shop-switcher');
    this.mapEvents();
  }

  mapEvents() {
    this.select.addEventListener('change', event => this.onTriggerChange(event));
  }

  onTriggerChange(event) {
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
  }

  currentSelectValue(select) {
    return select.options[select.selectedIndex].value;
  }

  hasUrl(select) {
    return !!select.value;
  }

}

/***/ })

}]);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vLi9zcmMvUHl6L1l2ZXMvU3RvcmVTd2l0Y2hlcldpZGdldC9UaGVtZS9kZWZhdWx0L2NvbXBvbmVudHMvbW9sZWN1bGVzL3N0b3JlLXN3aXRjaGVyL3N0b3JlLXN3aXRjaGVyLnRzIl0sIm5hbWVzIjpbIlN0b3JlU3dpdGNoZXIiLCJDb21wb25lbnQiLCJyZWFkeUNhbGxiYWNrIiwiaW5pdCIsInNlbGVjdCIsImdldEVsZW1lbnRzQnlDbGFzc05hbWUiLCJqc05hbWUiLCJzdG9yZVN3aXRjaGVyRm9ybVRleHQiLCJkb2N1bWVudCIsInN0b3JlU3dpdGNoZXJEcm9wRG93biIsInNlbGVjdE1vZGFsU3dpdGNoZXJEcm9wRG93biIsInNlbGVjdE1vZGFsU3dpdGNoZXJTcGFuIiwicXVlcnlTZWxlY3RvciIsInN0b3JlU3dpdGNoZXJQYXNzd29yZCIsImdldEVsZW1lbnRCeUlkIiwic3RvcmVTd2l0Y2hlclVybCIsIm1hcEV2ZW50cyIsImFkZEV2ZW50TGlzdGVuZXIiLCJldmVudCIsIm9uVHJpZ2dlckNoYW5nZSIsImRlc3RpbmF0aW9uVGFyZ2V0Iiwic2VsZWN0VGFyZ2V0IiwiY3VycmVudFRhcmdldCIsImVsZW1lbnRGcm9tTW9kYWwiLCJwYXJlbnRFbGVtZW50Iiwib2Zmc2V0UGFyZW50IiwiY2xhc3NOYW1lIiwiaXNfcHdkX3Byb3RlY3RlZCIsIm9wdGlvbnMiLCJzZWxlY3RlZEluZGV4IiwiZ2V0QXR0cmlidXRlIiwiaGFzVXJsIiwidXJsIiwiY3VycmVudFNlbGVjdFZhbHVlIiwiY29udmVydGVkVXJsIiwiaW5jbHVkZXMiLCJyZXBsYWNlIiwiY2xhc3NMaXN0IiwiYWRkIiwicmVtb3ZlIiwidmFsdWUiLCJnZXRFbGVtZW50c0J5VGFnTmFtZSIsImkiLCJsZW5ndGgiLCJ0ZXh0Iiwic2V0QXR0cmlidXRlIiwidGV4dENvbnRlbnQiLCJ3aW5kb3ciLCJsb2NhdGlvbiIsImhyZWYiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7OztBQUFBO0FBRWUsTUFBTUEsYUFBTixTQUE0QkMsK0RBQTVCLENBQXNDO0FBQUE7QUFBQTs7QUFBQTs7QUFBQTs7QUFBQTs7QUFBQTs7QUFBQTs7QUFBQTs7QUFBQTtBQUFBOztBQVN2Q0MsZUFBVixHQUFnQyxDQUFFOztBQUV4QkMsTUFBVixHQUF1QjtBQUNuQixTQUFLQyxNQUFMLEdBQWlDLEtBQUtDLHNCQUFMLENBQStCLEtBQUtDLE1BQXBDLHFCQUE0RCxDQUE1RCxDQUFqQztBQUNBLFNBQUtDLHFCQUFMLEdBQTZCQyxRQUFRLENBQUNILHNCQUFULENBQWdDLDBCQUFoQyxFQUE0RCxDQUE1RCxDQUE3QjtBQUNBLFNBQUtJLHFCQUFMLEdBQTZCRCxRQUFRLENBQUNILHNCQUFULENBQWdDLDhCQUFoQyxFQUFnRSxDQUFoRSxDQUE3QjtBQUNBLFNBQUtLLDJCQUFMLEdBQW1DRixRQUFRLENBQUNILHNCQUFULENBQWdDLGlDQUFoQyxFQUFtRSxDQUFuRSxDQUFuQztBQUNBLFNBQUtNLHVCQUFMLEdBQStCSCxRQUFRLENBQUNJLGFBQVQsQ0FBdUIsOEJBQXZCLENBQS9CO0FBQ0EsU0FBS0MscUJBQUwsR0FBNkJMLFFBQVEsQ0FBQ00sY0FBVCxDQUF3Qiw2QkFBeEIsQ0FBN0I7QUFDQSxTQUFLQyxnQkFBTCxHQUF3QlAsUUFBUSxDQUFDTSxjQUFULENBQXdCLHdCQUF4QixDQUF4QjtBQUNBLFNBQUtFLFNBQUw7QUFDSDs7QUFFU0EsV0FBVixHQUE0QjtBQUN4QixTQUFLWixNQUFMLENBQVlhLGdCQUFaLENBQTZCLFFBQTdCLEVBQXdDQyxLQUFELElBQWtCLEtBQUtDLGVBQUwsQ0FBcUJELEtBQXJCLENBQXpEO0FBQ0g7O0FBRVNDLGlCQUFWLENBQTBCRCxLQUExQixFQUE4QztBQUMxQyxRQUFNRSxpQkFBaUIsR0FBRyxLQUFLViwyQkFBL0I7QUFDQSxRQUFNVyxZQUFZLEdBQXNCSCxLQUFLLENBQUNJLGFBQTlDO0FBQ0EsUUFBTUMsZ0JBQWdCLEdBQUdGLFlBQVksQ0FBQ0csYUFBYixDQUEyQkMsWUFBM0IsQ0FBd0NDLFNBQWpFO0FBQ0EsUUFBTUMsZ0JBQWdCLEdBQUdOLFlBQVksQ0FBQ08sT0FBYixDQUFxQlAsWUFBWSxDQUFDUSxhQUFsQyxFQUFpREMsWUFBakQsQ0FBOEQsdUJBQTlELENBQXpCOztBQUVBLFFBQUksS0FBS0MsTUFBTCxDQUFZVixZQUFaLENBQUosRUFBK0I7QUFDM0IsVUFBSVcsR0FBRyxHQUFHLEtBQUtDLGtCQUFMLENBQXdCWixZQUF4QixDQUFWO0FBQ0EsVUFBSWEsWUFBWSxHQUFHRixHQUFuQjs7QUFDQSxVQUFJQSxHQUFHLENBQUNHLFFBQUosQ0FBYSxLQUFiLENBQUosRUFBeUI7QUFDckJELG9CQUFZLEdBQUdGLEdBQUcsQ0FBQ0ksT0FBSixDQUFZLEtBQVosRUFBbUIsS0FBbkIsQ0FBZjtBQUNIOztBQUNELFVBQUlULGdCQUFnQixJQUFJLENBQXhCLEVBQTJCO0FBQ3ZCLGFBQUtwQixxQkFBTCxDQUEyQjhCLFNBQTNCLENBQXFDQyxHQUFyQyxDQUF5QyxXQUF6QztBQUNBLGFBQUt6QixxQkFBTCxDQUEyQndCLFNBQTNCLENBQXFDRSxNQUFyQyxDQUE0QyxXQUE1QztBQUNBLGFBQUt4QixnQkFBTCxDQUFzQnlCLEtBQXRCLEdBQThCTixZQUE5Qjs7QUFDRixZQUFJWCxnQkFBZ0IsS0FBSyxrQ0FBekIsRUFBNkQ7QUFDekRmLGtCQUFRLENBQUNpQyxvQkFBVCxDQUE4Qix5QkFBOUIsRUFBeUQsQ0FBekQsRUFBNERKLFNBQTVELENBQXNFQyxHQUF0RSxDQUEwRSwrQkFBMUU7O0FBQ0EsZUFBSyxJQUFJSSxDQUFDLEdBQUcsQ0FBYixFQUFnQkEsQ0FBQyxHQUFHdEIsaUJBQWlCLENBQUNRLE9BQWxCLENBQTBCZSxNQUE5QyxFQUFzRCxFQUFFRCxDQUF4RCxFQUEwRDtBQUN0RCxnQkFBSXRCLGlCQUFpQixDQUFDUSxPQUFsQixDQUEwQmMsQ0FBMUIsRUFBNkJGLEtBQTdCLEtBQXVDUixHQUEzQyxFQUErQztBQUMzQyxrQkFBSVksSUFBSSxHQUFHLE1BQU14QixpQkFBaUIsQ0FBQ1EsT0FBbEIsQ0FBMEJjLENBQTFCLEVBQTZCRSxJQUE5QztBQUNBeEIsK0JBQWlCLENBQUNRLE9BQWxCLENBQTBCYyxDQUExQixFQUE2QkcsWUFBN0IsQ0FBMEMsVUFBMUMsRUFBc0QsSUFBdEQ7QUFDQSxtQkFBS2xDLHVCQUFMLENBQTZCbUMsV0FBN0IsR0FBMkNGLElBQTNDO0FBQ0g7QUFDSjtBQUNKO0FBQ0YsT0FkRCxNQWNPO0FBQ0hHLGNBQU0sQ0FBQ0MsUUFBUCxDQUFnQkMsSUFBaEIsR0FBdUJmLFlBQXZCO0FBQ0g7QUFDSjtBQUNKOztBQUVTRCxvQkFBVixDQUE2QjdCLE1BQTdCLEVBQWdFO0FBQzVELFdBQU9BLE1BQU0sQ0FBQ3dCLE9BQVAsQ0FBZXhCLE1BQU0sQ0FBQ3lCLGFBQXRCLEVBQXFDVyxLQUE1QztBQUNIOztBQUVTVCxRQUFWLENBQWlCM0IsTUFBakIsRUFBcUQ7QUFDakQsV0FBTyxDQUFDLENBQUNBLE1BQU0sQ0FBQ29DLEtBQWhCO0FBQ0g7O0FBaEVnRCxDIiwiZmlsZSI6Ii4vanMveXZlc19kZWZhdWx0LjQ4LmVzbS5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBDb21wb25lbnQgZnJvbSAnU2hvcFVpL21vZGVscy9jb21wb25lbnQnO1xuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBTdG9yZVN3aXRjaGVyIGV4dGVuZHMgQ29tcG9uZW50IHtcbiAgICBwcm90ZWN0ZWQgc2VsZWN0OiBIVE1MU2VsZWN0RWxlbWVudDtcbiAgICBwcm90ZWN0ZWQgc3RvcmVTd2l0Y2hlckZvcm1UZXh0O1xuICAgIHByb3RlY3RlZCBzdG9yZVN3aXRjaGVyRHJvcERvd247XG4gICAgcHJvdGVjdGVkIHN0b3JlU3dpdGNoZXJQYXNzd29yZDtcbiAgICBwcm90ZWN0ZWQgc3RvcmVTd2l0Y2hlclVybDtcbiAgICBwcm90ZWN0ZWQgc2VsZWN0TW9kYWxTd2l0Y2hlckRyb3BEb3duO1xuICAgIHByb3RlY3RlZCBzZWxlY3RNb2RhbFN3aXRjaGVyU3BhbjtcblxuICAgIHByb3RlY3RlZCByZWFkeUNhbGxiYWNrKCk6IHZvaWQge31cblxuICAgIHByb3RlY3RlZCBpbml0KCk6IHZvaWQge1xuICAgICAgICB0aGlzLnNlbGVjdCA9IDxIVE1MU2VsZWN0RWxlbWVudD50aGlzLmdldEVsZW1lbnRzQnlDbGFzc05hbWUoYCR7dGhpcy5qc05hbWV9X19zZWxlY3Rfc3RvcmVgKVswXTtcbiAgICAgICAgdGhpcy5zdG9yZVN3aXRjaGVyRm9ybVRleHQgPSBkb2N1bWVudC5nZXRFbGVtZW50c0J5Q2xhc3NOYW1lKCdmb3JtLXRleHQtLXNob3Atc3dpdGNoZXInKVswXTtcbiAgICAgICAgdGhpcy5zdG9yZVN3aXRjaGVyRHJvcERvd24gPSBkb2N1bWVudC5nZXRFbGVtZW50c0J5Q2xhc3NOYW1lKCdmb3JtLWRyb3Bkb3duLS1zaG9wLXN3aXRjaGVyJylbMF07XG4gICAgICAgIHRoaXMuc2VsZWN0TW9kYWxTd2l0Y2hlckRyb3BEb3duID0gZG9jdW1lbnQuZ2V0RWxlbWVudHNCeUNsYXNzTmFtZSgnanMtc3RvcmUtc3dpdGNoZXJfX3NlbGVjdF9zdG9yZScpWzBdO1xuICAgICAgICB0aGlzLnNlbGVjdE1vZGFsU3dpdGNoZXJTcGFuID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLnNlbGVjdDItc2VsZWN0aW9uX19yZW5kZXJlZCcpO1xuICAgICAgICB0aGlzLnN0b3JlU3dpdGNoZXJQYXNzd29yZCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdmb3JtLXBhc3N3b3JkLXNob3Atc3dpdGNoZXInKTtcbiAgICAgICAgdGhpcy5zdG9yZVN3aXRjaGVyVXJsID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2Zvcm0tdXJsLXNob3Atc3dpdGNoZXInKTtcbiAgICAgICAgdGhpcy5tYXBFdmVudHMoKTtcbiAgICB9XG5cbiAgICBwcm90ZWN0ZWQgbWFwRXZlbnRzKCk6IHZvaWQge1xuICAgICAgICB0aGlzLnNlbGVjdC5hZGRFdmVudExpc3RlbmVyKCdjaGFuZ2UnLCAoZXZlbnQ6IEV2ZW50KSA9PiB0aGlzLm9uVHJpZ2dlckNoYW5nZShldmVudCkpO1xuICAgIH1cblxuICAgIHByb3RlY3RlZCBvblRyaWdnZXJDaGFuZ2UoZXZlbnQ6IEV2ZW50KTogdm9pZCB7XG4gICAgICAgIGNvbnN0IGRlc3RpbmF0aW9uVGFyZ2V0ID0gdGhpcy5zZWxlY3RNb2RhbFN3aXRjaGVyRHJvcERvd247XG4gICAgICAgIGNvbnN0IHNlbGVjdFRhcmdldCA9IDxIVE1MU2VsZWN0RWxlbWVudD5ldmVudC5jdXJyZW50VGFyZ2V0O1xuICAgICAgICBjb25zdCBlbGVtZW50RnJvbU1vZGFsID0gc2VsZWN0VGFyZ2V0LnBhcmVudEVsZW1lbnQub2Zmc2V0UGFyZW50LmNsYXNzTmFtZTtcbiAgICAgICAgY29uc3QgaXNfcHdkX3Byb3RlY3RlZCA9IHNlbGVjdFRhcmdldC5vcHRpb25zW3NlbGVjdFRhcmdldC5zZWxlY3RlZEluZGV4XS5nZXRBdHRyaWJ1dGUoXCJpc19wYXNzd29yZF9wcm90ZWN0ZWRcIik7XG5cbiAgICAgICAgaWYgKHRoaXMuaGFzVXJsKHNlbGVjdFRhcmdldCkpIHtcbiAgICAgICAgICAgIGxldCB1cmwgPSB0aGlzLmN1cnJlbnRTZWxlY3RWYWx1ZShzZWxlY3RUYXJnZXQpO1xuICAgICAgICAgICAgbGV0IGNvbnZlcnRlZFVybCA9IHVybDtcbiAgICAgICAgICAgIGlmICh1cmwuaW5jbHVkZXMoXCItJi1cIikpIHtcbiAgICAgICAgICAgICAgICBjb252ZXJ0ZWRVcmwgPSB1cmwucmVwbGFjZShcIi0mLVwiLCBcIkFORFwiKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGlmIChpc19wd2RfcHJvdGVjdGVkID09IDEpIHtcbiAgICAgICAgICAgICAgICB0aGlzLnN0b3JlU3dpdGNoZXJGb3JtVGV4dC5jbGFzc0xpc3QuYWRkKCdpcy1oaWRkZW4nKTtcbiAgICAgICAgICAgICAgICB0aGlzLnN0b3JlU3dpdGNoZXJQYXNzd29yZC5jbGFzc0xpc3QucmVtb3ZlKCdpcy1oaWRkZW4nKTtcbiAgICAgICAgICAgICAgICB0aGlzLnN0b3JlU3dpdGNoZXJVcmwudmFsdWUgPSBjb252ZXJ0ZWRVcmw7XG4gICAgICAgICAgICAgIGlmIChlbGVtZW50RnJvbU1vZGFsICE9PSAncG9wdXAtdWktc3RvcmUtc3dpdGNoZXJfX292ZXJsYXknKSB7XG4gICAgICAgICAgICAgICAgICBkb2N1bWVudC5nZXRFbGVtZW50c0J5VGFnTmFtZSgncG9wdXAtdWktc3RvcmUtc3dpdGNoZXInKVswXS5jbGFzc0xpc3QuYWRkKCdwb3B1cC11aS1zdG9yZS1zd2l0Y2hlci0tc2hvdycpO1xuICAgICAgICAgICAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBkZXN0aW5hdGlvblRhcmdldC5vcHRpb25zLmxlbmd0aDsgKytpKXtcbiAgICAgICAgICAgICAgICAgICAgICBpZiAoZGVzdGluYXRpb25UYXJnZXQub3B0aW9uc1tpXS52YWx1ZSA9PT0gdXJsKXtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgbGV0IHRleHQgPSBcIiBcIiArIGRlc3RpbmF0aW9uVGFyZ2V0Lm9wdGlvbnNbaV0udGV4dDtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgZGVzdGluYXRpb25UYXJnZXQub3B0aW9uc1tpXS5zZXRBdHRyaWJ1dGUoXCJzZWxlY3RlZFwiLCB0cnVlKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5zZWxlY3RNb2RhbFN3aXRjaGVyU3Bhbi50ZXh0Q29udGVudCA9IHRleHQ7XG4gICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIHdpbmRvdy5sb2NhdGlvbi5ocmVmID0gY29udmVydGVkVXJsO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfVxuXG4gICAgcHJvdGVjdGVkIGN1cnJlbnRTZWxlY3RWYWx1ZShzZWxlY3Q6IEhUTUxTZWxlY3RFbGVtZW50KTogc3RyaW5nIHtcbiAgICAgICAgcmV0dXJuIHNlbGVjdC5vcHRpb25zW3NlbGVjdC5zZWxlY3RlZEluZGV4XS52YWx1ZTtcbiAgICB9XG5cbiAgICBwcm90ZWN0ZWQgaGFzVXJsKHNlbGVjdDogSFRNTFNlbGVjdEVsZW1lbnQpOiBib29sZWFuIHtcbiAgICAgICAgcmV0dXJuICEhc2VsZWN0LnZhbHVlO1xuICAgIH1cbn1cbiJdLCJzb3VyY2VSb290IjoiIn0=