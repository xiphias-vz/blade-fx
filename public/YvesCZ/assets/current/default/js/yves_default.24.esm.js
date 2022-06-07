(window["webpackJsonp_yves_default"] = window["webpackJsonp_yves_default"] || []).push([[24],{

/***/ "./src/Pyz/Yves/ShopUi/Theme/default/components/molecules/form-dynamic-submitter/form-dynamic-submitter.ts":
/*!*****************************************************************************************************************!*\
  !*** ./src/Pyz/Yves/ShopUi/Theme/default/components/molecules/form-dynamic-submitter/form-dynamic-submitter.ts ***!
  \*****************************************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return FormDynamicSubmitter; });
/* harmony import */ var ShopUi_models_component__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ShopUi/models/component */ "./vendor/spryker-shop/shop-ui/src/SprykerShop/Yves/ShopUi/Theme/default/models/component.ts");
function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }


class FormDynamicSubmitter extends ShopUi_models_component__WEBPACK_IMPORTED_MODULE_0__["default"] {
  constructor() {
    super(...arguments);

    _defineProperty(this, "triggers", void 0);

    _defineProperty(this, "form", void 0);

    _defineProperty(this, "tokenInput", void 0);
  }

  readyCallback() {}

  init() {
    this.triggers = Array.from(document.getElementsByClassName(this.triggerClassName));
    this.form = this.getElementsByTagName('form')[0];
    this.tokenInput = this.getElementsByClassName(this.tokenInputClassName)[0];
    this.mapEvents();
  }

  mapEvents() {
    this.triggers.forEach(trigger => {
      trigger.addEventListener('click', event => this.linkClickHandler(event, trigger));
    });
  }

  linkClickHandler(event, link) {
    event.preventDefault();
    this.submitForm(link.href, link.dataset.csrfToken);
  }

  submitForm(url, token) {
    this.form.action = url;
    this.tokenInput.value = token;
    this.form.submit();
  }

  get triggerClassName() {
    return this.getAttribute('trigger-class-name');
  }

  get tokenInputClassName() {
    return this.jsName + "__input-token";
  }

}

/***/ })

}]);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vLi9zcmMvUHl6L1l2ZXMvU2hvcFVpL1RoZW1lL2RlZmF1bHQvY29tcG9uZW50cy9tb2xlY3VsZXMvZm9ybS1keW5hbWljLXN1Ym1pdHRlci9mb3JtLWR5bmFtaWMtc3VibWl0dGVyLnRzIl0sIm5hbWVzIjpbIkZvcm1EeW5hbWljU3VibWl0dGVyIiwiQ29tcG9uZW50IiwicmVhZHlDYWxsYmFjayIsImluaXQiLCJ0cmlnZ2VycyIsIkFycmF5IiwiZnJvbSIsImRvY3VtZW50IiwiZ2V0RWxlbWVudHNCeUNsYXNzTmFtZSIsInRyaWdnZXJDbGFzc05hbWUiLCJmb3JtIiwiZ2V0RWxlbWVudHNCeVRhZ05hbWUiLCJ0b2tlbklucHV0IiwidG9rZW5JbnB1dENsYXNzTmFtZSIsIm1hcEV2ZW50cyIsImZvckVhY2giLCJ0cmlnZ2VyIiwiYWRkRXZlbnRMaXN0ZW5lciIsImV2ZW50IiwibGlua0NsaWNrSGFuZGxlciIsImxpbmsiLCJwcmV2ZW50RGVmYXVsdCIsInN1Ym1pdEZvcm0iLCJocmVmIiwiZGF0YXNldCIsImNzcmZUb2tlbiIsInVybCIsInRva2VuIiwiYWN0aW9uIiwidmFsdWUiLCJzdWJtaXQiLCJnZXRBdHRyaWJ1dGUiLCJqc05hbWUiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7OztBQUFBO0FBRWUsTUFBTUEsb0JBQU4sU0FBbUNDLCtEQUFuQyxDQUE2QztBQUFBO0FBQUE7O0FBQUE7O0FBQUE7O0FBQUE7QUFBQTs7QUFLOUNDLGVBQVYsR0FBZ0MsQ0FBRTs7QUFFeEJDLE1BQVYsR0FBdUI7QUFDbkIsU0FBS0MsUUFBTCxHQUFtQ0MsS0FBSyxDQUFDQyxJQUFOLENBQVdDLFFBQVEsQ0FBQ0Msc0JBQVQsQ0FBZ0MsS0FBS0MsZ0JBQXJDLENBQVgsQ0FBbkM7QUFDQSxTQUFLQyxJQUFMLEdBQTZCLEtBQUtDLG9CQUFMLENBQTBCLE1BQTFCLEVBQWtDLENBQWxDLENBQTdCO0FBQ0EsU0FBS0MsVUFBTCxHQUFvQyxLQUFLSixzQkFBTCxDQUE0QixLQUFLSyxtQkFBakMsRUFBc0QsQ0FBdEQsQ0FBcEM7QUFFQSxTQUFLQyxTQUFMO0FBQ0g7O0FBRVNBLFdBQVYsR0FBNEI7QUFDeEIsU0FBS1YsUUFBTCxDQUFjVyxPQUFkLENBQXVCQyxPQUFELElBQThCO0FBQ2hEQSxhQUFPLENBQUNDLGdCQUFSLENBQXlCLE9BQXpCLEVBQW1DQyxLQUFELElBQWtCLEtBQUtDLGdCQUFMLENBQXNCRCxLQUF0QixFQUE2QkYsT0FBN0IsQ0FBcEQ7QUFDSCxLQUZEO0FBR0g7O0FBRVNHLGtCQUFWLENBQTJCRCxLQUEzQixFQUF5Q0UsSUFBekMsRUFBc0U7QUFDbEVGLFNBQUssQ0FBQ0csY0FBTjtBQUNBLFNBQUtDLFVBQUwsQ0FBZ0JGLElBQUksQ0FBQ0csSUFBckIsRUFBMkJILElBQUksQ0FBQ0ksT0FBTCxDQUFhQyxTQUF4QztBQUNIOztBQUVTSCxZQUFWLENBQXFCSSxHQUFyQixFQUFrQ0MsS0FBbEMsRUFBdUQ7QUFDbkQsU0FBS2pCLElBQUwsQ0FBVWtCLE1BQVYsR0FBbUJGLEdBQW5CO0FBQ0EsU0FBS2QsVUFBTCxDQUFnQmlCLEtBQWhCLEdBQXdCRixLQUF4QjtBQUNBLFNBQUtqQixJQUFMLENBQVVvQixNQUFWO0FBQ0g7O0FBRUQsTUFBY3JCLGdCQUFkLEdBQXlDO0FBQ3JDLFdBQU8sS0FBS3NCLFlBQUwsQ0FBa0Isb0JBQWxCLENBQVA7QUFDSDs7QUFFRCxNQUFjbEIsbUJBQWQsR0FBNEM7QUFDeEMsV0FBVSxLQUFLbUIsTUFBZjtBQUNIOztBQXRDdUQsQyIsImZpbGUiOiIuL2pzL3l2ZXNfZGVmYXVsdC4yNC5lc20uanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgQ29tcG9uZW50IGZyb20gJ1Nob3BVaS9tb2RlbHMvY29tcG9uZW50JztcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgRm9ybUR5bmFtaWNTdWJtaXR0ZXIgZXh0ZW5kcyBDb21wb25lbnQge1xuICAgIHByb3RlY3RlZCB0cmlnZ2VyczogSFRNTExpbmtFbGVtZW50W107XG4gICAgcHJvdGVjdGVkIGZvcm06IEhUTUxGb3JtRWxlbWVudDtcbiAgICBwcm90ZWN0ZWQgdG9rZW5JbnB1dDogSFRNTElucHV0RWxlbWVudDtcblxuICAgIHByb3RlY3RlZCByZWFkeUNhbGxiYWNrKCk6IHZvaWQge31cblxuICAgIHByb3RlY3RlZCBpbml0KCk6IHZvaWQge1xuICAgICAgICB0aGlzLnRyaWdnZXJzID0gPEhUTUxMaW5rRWxlbWVudFtdPkFycmF5LmZyb20oZG9jdW1lbnQuZ2V0RWxlbWVudHNCeUNsYXNzTmFtZSh0aGlzLnRyaWdnZXJDbGFzc05hbWUpKTtcbiAgICAgICAgdGhpcy5mb3JtID0gPEhUTUxGb3JtRWxlbWVudD50aGlzLmdldEVsZW1lbnRzQnlUYWdOYW1lKCdmb3JtJylbMF07XG4gICAgICAgIHRoaXMudG9rZW5JbnB1dCA9IDxIVE1MSW5wdXRFbGVtZW50PnRoaXMuZ2V0RWxlbWVudHNCeUNsYXNzTmFtZSh0aGlzLnRva2VuSW5wdXRDbGFzc05hbWUpWzBdO1xuXG4gICAgICAgIHRoaXMubWFwRXZlbnRzKCk7XG4gICAgfVxuXG4gICAgcHJvdGVjdGVkIG1hcEV2ZW50cygpOiB2b2lkIHtcbiAgICAgICAgdGhpcy50cmlnZ2Vycy5mb3JFYWNoKCh0cmlnZ2VyOiBIVE1MTGlua0VsZW1lbnQpID0+IHtcbiAgICAgICAgICAgIHRyaWdnZXIuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCAoZXZlbnQ6IEV2ZW50KSA9PiB0aGlzLmxpbmtDbGlja0hhbmRsZXIoZXZlbnQsIHRyaWdnZXIpKTtcbiAgICAgICAgfSk7XG4gICAgfVxuXG4gICAgcHJvdGVjdGVkIGxpbmtDbGlja0hhbmRsZXIoZXZlbnQ6IEV2ZW50LCBsaW5rOiBIVE1MTGlua0VsZW1lbnQpOiB2b2lkIHtcbiAgICAgICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcbiAgICAgICAgdGhpcy5zdWJtaXRGb3JtKGxpbmsuaHJlZiwgbGluay5kYXRhc2V0LmNzcmZUb2tlbik7XG4gICAgfVxuXG4gICAgcHJvdGVjdGVkIHN1Ym1pdEZvcm0odXJsOiBzdHJpbmcsIHRva2VuOiBzdHJpbmcpOiB2b2lkIHtcbiAgICAgICAgdGhpcy5mb3JtLmFjdGlvbiA9IHVybDtcbiAgICAgICAgdGhpcy50b2tlbklucHV0LnZhbHVlID0gdG9rZW47XG4gICAgICAgIHRoaXMuZm9ybS5zdWJtaXQoKTtcbiAgICB9XG5cbiAgICBwcm90ZWN0ZWQgZ2V0IHRyaWdnZXJDbGFzc05hbWUoKTogc3RyaW5nIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuZ2V0QXR0cmlidXRlKCd0cmlnZ2VyLWNsYXNzLW5hbWUnKTtcbiAgICB9XG5cbiAgICBwcm90ZWN0ZWQgZ2V0IHRva2VuSW5wdXRDbGFzc05hbWUoKTogc3RyaW5nIHtcbiAgICAgICAgcmV0dXJuIGAke3RoaXMuanNOYW1lfV9faW5wdXQtdG9rZW5gO1xuICAgIH1cbn1cbiJdLCJzb3VyY2VSb290IjoiIn0=