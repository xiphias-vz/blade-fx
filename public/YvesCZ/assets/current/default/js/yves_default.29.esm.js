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
/* harmony import */ var ShopUi_models_component__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ShopUi/models/component */ "./vendor/spryker-shop/shop-ui/src/SprykerShop/Yves/ShopUi/Theme/default/models/component.ts");
function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }


var INTERVAL_TIMEOUT = 200;
var MAX_TIMEOUT = 5000;
class MatomoPopupUiCorrector extends ShopUi_models_component__WEBPACK_IMPORTED_MODULE_0__["default"] {
  constructor() {
    super(...arguments);

    _defineProperty(this, "interval", void 0);

    _defineProperty(this, "popupHolder", void 0);

    _defineProperty(this, "pageBody", void 0);
  }

  readyCallback() {}

  init() {
    this.pageBody = document.getElementsByTagName('body')[0];
    window.setTimeout(this.clearCurrentInterval.bind(this), MAX_TIMEOUT);
    this.interval = window.setInterval(this.removeScrollOnOverlay.bind(this), INTERVAL_TIMEOUT);
  }

  clearCurrentInterval() {
    window.clearInterval(this.interval);
  }

  removeScrollOnOverlay() {
    this.popupHolder = document.querySelector('[id^="ppms_cm_consent_popup"]');

    if (!this.popupHolder) {
      return;
    }

    this.pageBody.classList.add('no-scroll');
    this.initModalButtons();
    this.removeDisagreeButton();
    this.clearCurrentInterval();
  }

  initModalButtons() {
    var buttons = [];
    buttons.push(document.getElementsByClassName('ppms_cm_close_popup')[0]);
    buttons.push(document.getElementsByClassName('ppms_cm_button_primary')[0]);
    buttons.push(document.getElementsByClassName('ppms_cm_button')[0]);
    buttons.map(button => {
      button.addEventListener('click', () => {
        this.pageBody.classList.remove('no-scroll');
      });
    });
  }

  removeDisagreeButton() {
    var disagreeButton = document.getElementById('ppms_cm_disagree');

    if (!disagreeButton) {
      return;
    }

    disagreeButton.remove();
  }

}

/***/ })

}]);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vLi9zcmMvUHl6L1l2ZXMvU2hvcFVpL1RoZW1lL2RlZmF1bHQvY29tcG9uZW50cy9tb2xlY3VsZXMvbWF0b21vLXBvcHVwLXVpLWNvcnJlY3Rvci9tYXRvbW8tcG9wdXAtdWktY29ycmVjdG9yLnRzIl0sIm5hbWVzIjpbIklOVEVSVkFMX1RJTUVPVVQiLCJNQVhfVElNRU9VVCIsIk1hdG9tb1BvcHVwVWlDb3JyZWN0b3IiLCJDb21wb25lbnQiLCJyZWFkeUNhbGxiYWNrIiwiaW5pdCIsInBhZ2VCb2R5IiwiZG9jdW1lbnQiLCJnZXRFbGVtZW50c0J5VGFnTmFtZSIsIndpbmRvdyIsInNldFRpbWVvdXQiLCJjbGVhckN1cnJlbnRJbnRlcnZhbCIsImJpbmQiLCJpbnRlcnZhbCIsInNldEludGVydmFsIiwicmVtb3ZlU2Nyb2xsT25PdmVybGF5IiwiY2xlYXJJbnRlcnZhbCIsInBvcHVwSG9sZGVyIiwicXVlcnlTZWxlY3RvciIsImNsYXNzTGlzdCIsImFkZCIsImluaXRNb2RhbEJ1dHRvbnMiLCJyZW1vdmVEaXNhZ3JlZUJ1dHRvbiIsImJ1dHRvbnMiLCJwdXNoIiwiZ2V0RWxlbWVudHNCeUNsYXNzTmFtZSIsIm1hcCIsImJ1dHRvbiIsImFkZEV2ZW50TGlzdGVuZXIiLCJyZW1vdmUiLCJkaXNhZ3JlZUJ1dHRvbiIsImdldEVsZW1lbnRCeUlkIl0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7QUFBQTtBQUVBLElBQU1BLGdCQUFnQixHQUFHLEdBQXpCO0FBQ0EsSUFBTUMsV0FBVyxHQUFHLElBQXBCO0FBRWUsTUFBTUMsc0JBQU4sU0FBcUNDLCtEQUFyQyxDQUErQztBQUFBO0FBQUE7O0FBQUE7O0FBQUE7O0FBQUE7QUFBQTs7QUFLaERDLGVBQVYsR0FBZ0MsQ0FBRTs7QUFFeEJDLE1BQVYsR0FBdUI7QUFDbkIsU0FBS0MsUUFBTCxHQUFnQkMsUUFBUSxDQUFDQyxvQkFBVCxDQUE4QixNQUE5QixFQUFzQyxDQUF0QyxDQUFoQjtBQUNBQyxVQUFNLENBQUNDLFVBQVAsQ0FBa0IsS0FBS0Msb0JBQUwsQ0FBMEJDLElBQTFCLENBQStCLElBQS9CLENBQWxCLEVBQXdEWCxXQUF4RDtBQUNBLFNBQUtZLFFBQUwsR0FBZ0JKLE1BQU0sQ0FBQ0ssV0FBUCxDQUFtQixLQUFLQyxxQkFBTCxDQUEyQkgsSUFBM0IsQ0FBZ0MsSUFBaEMsQ0FBbkIsRUFBMERaLGdCQUExRCxDQUFoQjtBQUNIOztBQUVTVyxzQkFBVixHQUF1QztBQUNuQ0YsVUFBTSxDQUFDTyxhQUFQLENBQXFCLEtBQUtILFFBQTFCO0FBQ0g7O0FBRVNFLHVCQUFWLEdBQWtDO0FBQzlCLFNBQUtFLFdBQUwsR0FBbUJWLFFBQVEsQ0FBQ1csYUFBVCxDQUF1QiwrQkFBdkIsQ0FBbkI7O0FBQ0EsUUFBSSxDQUFDLEtBQUtELFdBQVYsRUFBdUI7QUFDbkI7QUFDSDs7QUFDRCxTQUFLWCxRQUFMLENBQWNhLFNBQWQsQ0FBd0JDLEdBQXhCLENBQTRCLFdBQTVCO0FBQ0EsU0FBS0MsZ0JBQUw7QUFDQSxTQUFLQyxvQkFBTDtBQUNBLFNBQUtYLG9CQUFMO0FBQ0g7O0FBRVNVLGtCQUFWLEdBQW1DO0FBQy9CLFFBQU1FLE9BQXNCLEdBQUcsRUFBL0I7QUFDQUEsV0FBTyxDQUFDQyxJQUFSLENBQTBCakIsUUFBUSxDQUFDa0Isc0JBQVQsQ0FBZ0MscUJBQWhDLEVBQXVELENBQXZELENBQTFCO0FBQ0FGLFdBQU8sQ0FBQ0MsSUFBUixDQUEwQmpCLFFBQVEsQ0FBQ2tCLHNCQUFULENBQWdDLHdCQUFoQyxFQUEwRCxDQUExRCxDQUExQjtBQUNBRixXQUFPLENBQUNDLElBQVIsQ0FBMEJqQixRQUFRLENBQUNrQixzQkFBVCxDQUFnQyxnQkFBaEMsRUFBa0QsQ0FBbEQsQ0FBMUI7QUFDQUYsV0FBTyxDQUFDRyxHQUFSLENBQVlDLE1BQU0sSUFBSTtBQUNsQkEsWUFBTSxDQUFDQyxnQkFBUCxDQUF3QixPQUF4QixFQUFpQyxNQUFNO0FBQ25DLGFBQUt0QixRQUFMLENBQWNhLFNBQWQsQ0FBd0JVLE1BQXhCLENBQStCLFdBQS9CO0FBQ0gsT0FGRDtBQUdILEtBSkQ7QUFLSDs7QUFFU1Asc0JBQVYsR0FBdUM7QUFDbkMsUUFBTVEsY0FBYyxHQUFzQnZCLFFBQVEsQ0FBQ3dCLGNBQVQsQ0FBd0Isa0JBQXhCLENBQTFDOztBQUNBLFFBQUksQ0FBQ0QsY0FBTCxFQUFvQjtBQUNoQjtBQUNIOztBQUNEQSxrQkFBYyxDQUFDRCxNQUFmO0FBQ0g7O0FBOUN5RCxDIiwiZmlsZSI6Ii4vanMveXZlc19kZWZhdWx0LjI5LmVzbS5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBDb21wb25lbnQgZnJvbSAnU2hvcFVpL21vZGVscy9jb21wb25lbnQnO1xuXG5jb25zdCBJTlRFUlZBTF9USU1FT1VUID0gMjAwO1xuY29uc3QgTUFYX1RJTUVPVVQgPSA1MDAwO1xuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBNYXRvbW9Qb3B1cFVpQ29ycmVjdG9yIGV4dGVuZHMgQ29tcG9uZW50IHtcbiAgICBwcm90ZWN0ZWQgaW50ZXJ2YWw6IG51bWJlcjtcbiAgICBwcm90ZWN0ZWQgcG9wdXBIb2xkZXI6IEhUTUxFbGVtZW50O1xuICAgIHByb3RlY3RlZCBwYWdlQm9keTogSFRNTEVsZW1lbnQ7XG5cbiAgICBwcm90ZWN0ZWQgcmVhZHlDYWxsYmFjaygpOiB2b2lkIHt9XG5cbiAgICBwcm90ZWN0ZWQgaW5pdCgpOiB2b2lkIHtcbiAgICAgICAgdGhpcy5wYWdlQm9keSA9IGRvY3VtZW50LmdldEVsZW1lbnRzQnlUYWdOYW1lKCdib2R5JylbMF07XG4gICAgICAgIHdpbmRvdy5zZXRUaW1lb3V0KHRoaXMuY2xlYXJDdXJyZW50SW50ZXJ2YWwuYmluZCh0aGlzKSwgTUFYX1RJTUVPVVQpO1xuICAgICAgICB0aGlzLmludGVydmFsID0gd2luZG93LnNldEludGVydmFsKHRoaXMucmVtb3ZlU2Nyb2xsT25PdmVybGF5LmJpbmQodGhpcyksIElOVEVSVkFMX1RJTUVPVVQpO1xuICAgIH1cblxuICAgIHByb3RlY3RlZCBjbGVhckN1cnJlbnRJbnRlcnZhbCgpOiB2b2lkIHtcbiAgICAgICAgd2luZG93LmNsZWFySW50ZXJ2YWwodGhpcy5pbnRlcnZhbCk7XG4gICAgfVxuXG4gICAgcHJvdGVjdGVkIHJlbW92ZVNjcm9sbE9uT3ZlcmxheSgpIHtcbiAgICAgICAgdGhpcy5wb3B1cEhvbGRlciA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJ1tpZF49XCJwcG1zX2NtX2NvbnNlbnRfcG9wdXBcIl0nKTtcbiAgICAgICAgaWYgKCF0aGlzLnBvcHVwSG9sZGVyKSB7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cbiAgICAgICAgdGhpcy5wYWdlQm9keS5jbGFzc0xpc3QuYWRkKCduby1zY3JvbGwnKTtcbiAgICAgICAgdGhpcy5pbml0TW9kYWxCdXR0b25zKCk7XG4gICAgICAgIHRoaXMucmVtb3ZlRGlzYWdyZWVCdXR0b24oKTtcbiAgICAgICAgdGhpcy5jbGVhckN1cnJlbnRJbnRlcnZhbCgpO1xuICAgIH1cblxuICAgIHByb3RlY3RlZCBpbml0TW9kYWxCdXR0b25zKCk6IHZvaWQge1xuICAgICAgICBjb25zdCBidXR0b25zOiBIVE1MRWxlbWVudFtdID0gW107XG4gICAgICAgIGJ1dHRvbnMucHVzaCg8SFRNTEVsZW1lbnQ+ZG9jdW1lbnQuZ2V0RWxlbWVudHNCeUNsYXNzTmFtZSgncHBtc19jbV9jbG9zZV9wb3B1cCcpWzBdKTtcbiAgICAgICAgYnV0dG9ucy5wdXNoKDxIVE1MRWxlbWVudD5kb2N1bWVudC5nZXRFbGVtZW50c0J5Q2xhc3NOYW1lKCdwcG1zX2NtX2J1dHRvbl9wcmltYXJ5JylbMF0pO1xuICAgICAgICBidXR0b25zLnB1c2goPEhUTUxFbGVtZW50PmRvY3VtZW50LmdldEVsZW1lbnRzQnlDbGFzc05hbWUoJ3BwbXNfY21fYnV0dG9uJylbMF0pO1xuICAgICAgICBidXR0b25zLm1hcChidXR0b24gPT4ge1xuICAgICAgICAgICAgYnV0dG9uLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgKCkgPT4ge1xuICAgICAgICAgICAgICAgIHRoaXMucGFnZUJvZHkuY2xhc3NMaXN0LnJlbW92ZSgnbm8tc2Nyb2xsJyk7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfSk7XG4gICAgfVxuXG4gICAgcHJvdGVjdGVkIHJlbW92ZURpc2FncmVlQnV0dG9uKCk6IHZvaWQge1xuICAgICAgICBjb25zdCBkaXNhZ3JlZUJ1dHRvbiA9IDxIVE1MQnV0dG9uRWxlbWVudD5kb2N1bWVudC5nZXRFbGVtZW50QnlJZCgncHBtc19jbV9kaXNhZ3JlZScpO1xuICAgICAgICBpZiAoIWRpc2FncmVlQnV0dG9uKXtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuICAgICAgICBkaXNhZ3JlZUJ1dHRvbi5yZW1vdmUoKTtcbiAgICB9XG59XG4iXSwic291cmNlUm9vdCI6IiJ9