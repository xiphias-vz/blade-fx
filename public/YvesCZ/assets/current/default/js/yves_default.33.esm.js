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
/* harmony import */ var ShopUi_models_component__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ShopUi/models/component */ "./vendor/spryker-shop/shop-ui/src/SprykerShop/Yves/ShopUi/Theme/default/models/component.ts");
/* harmony import */ var jquery_dist_jquery__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! jquery/dist/jquery */ "./node_modules/jquery/dist/jquery.js");
/* harmony import */ var jquery_dist_jquery__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(jquery_dist_jquery__WEBPACK_IMPORTED_MODULE_1__);
function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }



class PopupAgeConfirmation extends ShopUi_models_component__WEBPACK_IMPORTED_MODULE_0__["default"] {
  constructor() {
    super(...arguments);

    _defineProperty(this, "$this", jquery_dist_jquery__WEBPACK_IMPORTED_MODULE_1___default()(this));

    _defineProperty(this, "ageRestrictionInfo", void 0);

    _defineProperty(this, "ageConfirmationNeeded", void 0);

    _defineProperty(this, "ageConfirmedYesButton", void 0);

    _defineProperty(this, "ageConfirmedNoButton", void 0);
  }

  readyCallback() {
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
  }

  mapEvents() {
    this.ageConfirmedYesButton.addEventListener('click', () => {
      this.closeModal(this.$this);
    });
    this.ageConfirmedNoButton.addEventListener('click', () => {
      this.redirectToBackPage();
    });
  }

  openModal() {
    this.$this.addClass(this.name + "--show");
  }

  closeModal(className) {
    className.removeClass(this.name + "--show");
  }

  redirectToBackPage() {
    !history.length ? location.href = '/' : history.back();
  }

}

/***/ })

}]);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vLi9zcmMvUHl6L1l2ZXMvU2hvcFVpL1RoZW1lL2RlZmF1bHQvY29tcG9uZW50cy9tb2xlY3VsZXMvcG9wdXAtYWdlLWNvbmZpcm1hdGlvbi9wb3B1cC1hZ2UtY29uZmlybWF0aW9uLnRzIl0sIm5hbWVzIjpbIlBvcHVwQWdlQ29uZmlybWF0aW9uIiwiQ29tcG9uZW50IiwiJCIsInJlYWR5Q2FsbGJhY2siLCJhZ2VDb25maXJtZWRZZXNCdXR0b24iLCJkb2N1bWVudCIsImdldEVsZW1lbnRCeUlkIiwiYWdlQ29uZmlybWVkTm9CdXR0b24iLCJhZ2VSZXN0cmljdGlvbkluZm8iLCJhZ2VDb25maXJtYXRpb25OZWVkZWQiLCJ2YWx1ZSIsIm9wZW5Nb2RhbCIsImUiLCJtYXBFdmVudHMiLCJhZGRFdmVudExpc3RlbmVyIiwiY2xvc2VNb2RhbCIsIiR0aGlzIiwicmVkaXJlY3RUb0JhY2tQYWdlIiwiYWRkQ2xhc3MiLCJuYW1lIiwiY2xhc3NOYW1lIiwicmVtb3ZlQ2xhc3MiLCJoaXN0b3J5IiwibGVuZ3RoIiwibG9jYXRpb24iLCJocmVmIiwiYmFjayJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQTtBQUNBO0FBRWUsTUFBTUEsb0JBQU4sU0FBbUNDLCtEQUFuQyxDQUE0QztBQUFBO0FBQUE7O0FBQUEsbUNBQ2xDQyx5REFBQyxDQUFDLElBQUQsQ0FEaUM7O0FBQUE7O0FBQUE7O0FBQUE7O0FBQUE7QUFBQTs7QUFPN0NDLGVBQVYsR0FBMEI7QUFDdEIsU0FBS0MscUJBQUwsR0FBaURDLFFBQVEsQ0FBQ0MsY0FBVCxDQUF3Qiw2QkFBeEIsQ0FBakQ7QUFDQSxTQUFLQyxvQkFBTCxHQUFnREYsUUFBUSxDQUFDQyxjQUFULENBQXdCLDRCQUF4QixDQUFoRDtBQUNBLFNBQUtFLGtCQUFMLEdBQTRDSCxRQUFRLENBQUNDLGNBQVQsQ0FBd0IsaUJBQXhCLENBQTVDO0FBQ0EsU0FBS0cscUJBQUwsR0FBNkIsS0FBS0Qsa0JBQUwsQ0FBd0JFLEtBQXJEOztBQUNBLFFBQUc7QUFDQyxVQUFJLEtBQUtELHFCQUFMLEtBQStCLElBQW5DLEVBQXdDO0FBQ3BDLGFBQUtFLFNBQUw7QUFDSDtBQUNKLEtBSkQsQ0FJRSxPQUFPQyxDQUFQLEVBQVUsQ0FDWDs7QUFDRCxTQUFLQyxTQUFMO0FBQ0g7O0FBRVNBLFdBQVYsR0FBcUI7QUFDakIsU0FBS1QscUJBQUwsQ0FBMkJVLGdCQUEzQixDQUE0QyxPQUE1QyxFQUFxRCxNQUFNO0FBQ3ZELFdBQUtDLFVBQUwsQ0FBZ0IsS0FBS0MsS0FBckI7QUFDSCxLQUZEO0FBR0EsU0FBS1Qsb0JBQUwsQ0FBMEJPLGdCQUExQixDQUEyQyxPQUEzQyxFQUFvRCxNQUFNO0FBQ3RELFdBQUtHLGtCQUFMO0FBQ0gsS0FGRDtBQUdIOztBQUVTTixXQUFWLEdBQ0E7QUFDSSxTQUFLSyxLQUFMLENBQVdFLFFBQVgsQ0FBdUIsS0FBS0MsSUFBNUI7QUFDSDs7QUFDU0osWUFBVixDQUFxQkssU0FBckIsRUFBcUM7QUFDakNBLGFBQVMsQ0FBQ0MsV0FBVixDQUF5QixLQUFLRixJQUE5QjtBQUNIOztBQUVTRixvQkFBVixHQUFxQztBQUNqQyxLQUFDSyxPQUFPLENBQUNDLE1BQVQsR0FBa0JDLFFBQVEsQ0FBQ0MsSUFBVCxHQUFnQixHQUFsQyxHQUF3Q0gsT0FBTyxDQUFDSSxJQUFSLEVBQXhDO0FBQ0g7O0FBeENzRCxDIiwiZmlsZSI6Ii4vanMveXZlc19kZWZhdWx0LjMzLmVzbS5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBDb21wb25lbnQgZnJvbSAnU2hvcFVpL21vZGVscy9jb21wb25lbnQnO1xuaW1wb3J0ICQgZnJvbSAnanF1ZXJ5L2Rpc3QvanF1ZXJ5JztcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgUG9wdXBBZ2VDb25maXJtYXRpb24gZXh0ZW5kcyBDb21wb25lbnR7XG4gICAgcHJvdGVjdGVkICR0aGlzOiAkID0gJCh0aGlzKTtcbiAgICBwcm90ZWN0ZWQgYWdlUmVzdHJpY3Rpb25JbmZvOiBIVE1MRm9ybUVsZW1lbnQ7XG4gICAgcHJvdGVjdGVkIGFnZUNvbmZpcm1hdGlvbk5lZWRlZDogc3RyaW5nO1xuICAgIHByb3RlY3RlZCBhZ2VDb25maXJtZWRZZXNCdXR0b246IEhUTUxCdXR0b25FbGVtZW50O1xuICAgIHByb3RlY3RlZCBhZ2VDb25maXJtZWROb0J1dHRvbjogSFRNTEJ1dHRvbkVsZW1lbnQ7XG5cbiAgICBwcm90ZWN0ZWQgcmVhZHlDYWxsYmFjaygpIHtcbiAgICAgICAgdGhpcy5hZ2VDb25maXJtZWRZZXNCdXR0b24gPSA8SFRNTEJ1dHRvbkVsZW1lbnQ+IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdhZ2UtY29uZmlybWF0aW9uLXllcy1idXR0b24nKTtcbiAgICAgICAgdGhpcy5hZ2VDb25maXJtZWROb0J1dHRvbiA9IDxIVE1MQnV0dG9uRWxlbWVudD4gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2FnZS1jb25maXJtYXRpb24tbm8tYnV0dG9uJyk7XG4gICAgICAgIHRoaXMuYWdlUmVzdHJpY3Rpb25JbmZvID0gPEhUTUxGb3JtRWxlbWVudD4gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2FnZS1yZXN0cmljdGlvbicpO1xuICAgICAgICB0aGlzLmFnZUNvbmZpcm1hdGlvbk5lZWRlZCA9IHRoaXMuYWdlUmVzdHJpY3Rpb25JbmZvLnZhbHVlO1xuICAgICAgICB0cnl7XG4gICAgICAgICAgICBpZiAodGhpcy5hZ2VDb25maXJtYXRpb25OZWVkZWQgPT09ICcxOCcpe1xuICAgICAgICAgICAgICAgIHRoaXMub3Blbk1vZGFsKCk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0gY2F0Y2ggKGUpIHtcbiAgICAgICAgfVxuICAgICAgICB0aGlzLm1hcEV2ZW50cygpO1xuICAgIH1cblxuICAgIHByb3RlY3RlZCBtYXBFdmVudHMoKXtcbiAgICAgICAgdGhpcy5hZ2VDb25maXJtZWRZZXNCdXR0b24uYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCAoKSA9PiB7XG4gICAgICAgICAgICB0aGlzLmNsb3NlTW9kYWwodGhpcy4kdGhpcyk7XG4gICAgICAgIH0pO1xuICAgICAgICB0aGlzLmFnZUNvbmZpcm1lZE5vQnV0dG9uLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgKCkgPT4ge1xuICAgICAgICAgICAgdGhpcy5yZWRpcmVjdFRvQmFja1BhZ2UoKTtcbiAgICAgICAgfSk7XG4gICAgfVxuXG4gICAgcHJvdGVjdGVkIG9wZW5Nb2RhbCgpOiB2b2lkXG4gICAge1xuICAgICAgICB0aGlzLiR0aGlzLmFkZENsYXNzKGAke3RoaXMubmFtZX0tLXNob3dgKTtcbiAgICB9XG4gICAgcHJvdGVjdGVkIGNsb3NlTW9kYWwoY2xhc3NOYW1lKTogdm9pZHtcbiAgICAgICAgY2xhc3NOYW1lLnJlbW92ZUNsYXNzKGAke3RoaXMubmFtZX0tLXNob3dgKTtcbiAgICB9XG5cbiAgICBwcm90ZWN0ZWQgcmVkaXJlY3RUb0JhY2tQYWdlKCk6IHZvaWQge1xuICAgICAgICAhaGlzdG9yeS5sZW5ndGggPyBsb2NhdGlvbi5ocmVmID0gJy8nIDogaGlzdG9yeS5iYWNrKCk7XG4gICAgfVxufVxuIl0sInNvdXJjZVJvb3QiOiIifQ==