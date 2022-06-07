(window["webpackJsonp_yves_default"] = window["webpackJsonp_yves_default"] || []).push([["remote-form-submit"],{

/***/ "./vendor/spryker-shop/shop-ui/src/SprykerShop/Yves/ShopUi/Theme/default/components/molecules/remote-form-submit/remote-form-submit.ts":
/*!*********************************************************************************************************************************************!*\
  !*** ./vendor/spryker-shop/shop-ui/src/SprykerShop/Yves/ShopUi/Theme/default/components/molecules/remote-form-submit/remote-form-submit.ts ***!
  \*********************************************************************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return RemoteFormSubmit; });
/* harmony import */ var ShopUi_models_component__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ShopUi/models/component */ "./vendor/spryker-shop/shop-ui/src/SprykerShop/Yves/ShopUi/Theme/default/models/component.ts");
function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }


class RemoteFormSubmit extends ShopUi_models_component__WEBPACK_IMPORTED_MODULE_0__["default"] {
  constructor() {
    super(...arguments);

    _defineProperty(this, "formHolder", void 0);

    _defineProperty(this, "fieldsContainer", void 0);

    _defineProperty(this, "submitButton", void 0);
  }

  readyCallback() {}

  init() {
    this.fieldsContainer = this.getElementsByClassName(this.jsName + "__container")[0];
    this.submitButton = this.getElementsByClassName(this.jsName + "__submit")[0];
    this.getFormHolder();
    this.createForm();
    this.removeFieldsContainer();
    this.mapEvents();
  }

  mapEvents() {
    this.mapSubmitButtonClickEvent();
  }

  mapSubmitButtonClickEvent() {
    this.submitButton.addEventListener('click', () => this.submitTargetForm());
  }

  submitTargetForm() {
    var form = document.getElementById(this.formName);

    if (this.submitButton.dataset.formAction) {
      form.action = this.submitButton.dataset.formAction;
    }

    form.submit();
  }

  getFormHolder() {
    if (this.formHolderClassName) {
      this.formHolder = document.getElementsByClassName(this.formHolderClassName)[0];
      return;
    }

    this.formHolder = document.body;
  }

  createForm() {
    if (document.getElementById(this.formName)) {
      return;
    }

    var formTemplate = "\n            <form id=\"" + this.formName + "\" class=\"is-hidden\" name=\"" + this.formName + "\" method=\"post\" action=\"" + this.formAction + "\">\n                " + this.fieldsContainer.innerHTML + "\n            </form>\n        ";
    this.formHolder.insertAdjacentHTML('beforeend', formTemplate);
  }

  removeFieldsContainer() {
    this.fieldsContainer.remove();
  }

  get formHolderClassName() {
    return this.getAttribute('form-holder-class-name');
  }

  get formName() {
    return this.getAttribute('form-name');
  }

  get formAction() {
    return this.getAttribute('form-action');
  }

}

/***/ })

}]);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vLi92ZW5kb3Ivc3ByeWtlci1zaG9wL3Nob3AtdWkvc3JjL1NwcnlrZXJTaG9wL1l2ZXMvU2hvcFVpL1RoZW1lL2RlZmF1bHQvY29tcG9uZW50cy9tb2xlY3VsZXMvcmVtb3RlLWZvcm0tc3VibWl0L3JlbW90ZS1mb3JtLXN1Ym1pdC50cyJdLCJuYW1lcyI6WyJSZW1vdGVGb3JtU3VibWl0IiwiQ29tcG9uZW50IiwicmVhZHlDYWxsYmFjayIsImluaXQiLCJmaWVsZHNDb250YWluZXIiLCJnZXRFbGVtZW50c0J5Q2xhc3NOYW1lIiwianNOYW1lIiwic3VibWl0QnV0dG9uIiwiZ2V0Rm9ybUhvbGRlciIsImNyZWF0ZUZvcm0iLCJyZW1vdmVGaWVsZHNDb250YWluZXIiLCJtYXBFdmVudHMiLCJtYXBTdWJtaXRCdXR0b25DbGlja0V2ZW50IiwiYWRkRXZlbnRMaXN0ZW5lciIsInN1Ym1pdFRhcmdldEZvcm0iLCJmb3JtIiwiZG9jdW1lbnQiLCJnZXRFbGVtZW50QnlJZCIsImZvcm1OYW1lIiwiZGF0YXNldCIsImZvcm1BY3Rpb24iLCJhY3Rpb24iLCJzdWJtaXQiLCJmb3JtSG9sZGVyQ2xhc3NOYW1lIiwiZm9ybUhvbGRlciIsImJvZHkiLCJmb3JtVGVtcGxhdGUiLCJpbm5lckhUTUwiLCJpbnNlcnRBZGphY2VudEhUTUwiLCJyZW1vdmUiLCJnZXRBdHRyaWJ1dGUiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7OztBQUFBO0FBRWUsTUFBTUEsZ0JBQU4sU0FBK0JDLCtEQUEvQixDQUF5QztBQUFBO0FBQUE7O0FBQUE7O0FBQUE7O0FBQUE7QUFBQTs7QUFLMUNDLGVBQVYsR0FBZ0MsQ0FBRTs7QUFFeEJDLE1BQVYsR0FBdUI7QUFDbkIsU0FBS0MsZUFBTCxHQUFvQyxLQUFLQyxzQkFBTCxDQUErQixLQUFLQyxNQUFwQyxrQkFBeUQsQ0FBekQsQ0FBcEM7QUFDQSxTQUFLQyxZQUFMLEdBQXVDLEtBQUtGLHNCQUFMLENBQStCLEtBQUtDLE1BQXBDLGVBQXNELENBQXRELENBQXZDO0FBRUEsU0FBS0UsYUFBTDtBQUNBLFNBQUtDLFVBQUw7QUFDQSxTQUFLQyxxQkFBTDtBQUNBLFNBQUtDLFNBQUw7QUFDSDs7QUFFU0EsV0FBVixHQUE0QjtBQUN4QixTQUFLQyx5QkFBTDtBQUNIOztBQUVTQSwyQkFBVixHQUE0QztBQUN4QyxTQUFLTCxZQUFMLENBQWtCTSxnQkFBbEIsQ0FBbUMsT0FBbkMsRUFBNEMsTUFBTSxLQUFLQyxnQkFBTCxFQUFsRDtBQUNIOztBQUVTQSxrQkFBVixHQUFtQztBQUMvQixRQUFNQyxJQUFJLEdBQW9CQyxRQUFRLENBQUNDLGNBQVQsQ0FBd0IsS0FBS0MsUUFBN0IsQ0FBOUI7O0FBRUEsUUFBSSxLQUFLWCxZQUFMLENBQWtCWSxPQUFsQixDQUEwQkMsVUFBOUIsRUFBMEM7QUFDdENMLFVBQUksQ0FBQ00sTUFBTCxHQUFjLEtBQUtkLFlBQUwsQ0FBa0JZLE9BQWxCLENBQTBCQyxVQUF4QztBQUNIOztBQUVETCxRQUFJLENBQUNPLE1BQUw7QUFDSDs7QUFFU2QsZUFBVixHQUFnQztBQUM1QixRQUFJLEtBQUtlLG1CQUFULEVBQThCO0FBQzFCLFdBQUtDLFVBQUwsR0FBK0JSLFFBQVEsQ0FBQ1gsc0JBQVQsQ0FBZ0MsS0FBS2tCLG1CQUFyQyxFQUEwRCxDQUExRCxDQUEvQjtBQUVBO0FBQ0g7O0FBRUQsU0FBS0MsVUFBTCxHQUFrQlIsUUFBUSxDQUFDUyxJQUEzQjtBQUNIOztBQUVTaEIsWUFBVixHQUE2QjtBQUN6QixRQUFJTyxRQUFRLENBQUNDLGNBQVQsQ0FBd0IsS0FBS0MsUUFBN0IsQ0FBSixFQUE0QztBQUN4QztBQUNIOztBQUVELFFBQU1RLFlBQVksaUNBQ0YsS0FBS1IsUUFESCxzQ0FDd0MsS0FBS0EsUUFEN0Msb0NBQ2dGLEtBQUtFLFVBRHJGLDZCQUVSLEtBQUtoQixlQUFMLENBQXFCdUIsU0FGYixvQ0FBbEI7QUFLQSxTQUFLSCxVQUFMLENBQWdCSSxrQkFBaEIsQ0FBbUMsV0FBbkMsRUFBZ0RGLFlBQWhEO0FBQ0g7O0FBRVNoQix1QkFBVixHQUF3QztBQUNwQyxTQUFLTixlQUFMLENBQXFCeUIsTUFBckI7QUFDSDs7QUFFRCxNQUFjTixtQkFBZCxHQUE0QztBQUN4QyxXQUFPLEtBQUtPLFlBQUwsQ0FBa0Isd0JBQWxCLENBQVA7QUFDSDs7QUFFRCxNQUFjWixRQUFkLEdBQWlDO0FBQzdCLFdBQU8sS0FBS1ksWUFBTCxDQUFrQixXQUFsQixDQUFQO0FBQ0g7O0FBRUQsTUFBY1YsVUFBZCxHQUFtQztBQUMvQixXQUFPLEtBQUtVLFlBQUwsQ0FBa0IsYUFBbEIsQ0FBUDtBQUNIOztBQXhFbUQsQyIsImZpbGUiOiIuL2pzL3l2ZXNfZGVmYXVsdC5yZW1vdGUtZm9ybS1zdWJtaXQuZXNtLmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IENvbXBvbmVudCBmcm9tICdTaG9wVWkvbW9kZWxzL2NvbXBvbmVudCc7XG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIFJlbW90ZUZvcm1TdWJtaXQgZXh0ZW5kcyBDb21wb25lbnQge1xuICAgIHByb3RlY3RlZCBmb3JtSG9sZGVyOiBIVE1MRWxlbWVudDtcbiAgICBwcm90ZWN0ZWQgZmllbGRzQ29udGFpbmVyOiBIVE1MRWxlbWVudDtcbiAgICBwcm90ZWN0ZWQgc3VibWl0QnV0dG9uOiBIVE1MQnV0dG9uRWxlbWVudDtcblxuICAgIHByb3RlY3RlZCByZWFkeUNhbGxiYWNrKCk6IHZvaWQge31cblxuICAgIHByb3RlY3RlZCBpbml0KCk6IHZvaWQge1xuICAgICAgICB0aGlzLmZpZWxkc0NvbnRhaW5lciA9IDxIVE1MRWxlbWVudD50aGlzLmdldEVsZW1lbnRzQnlDbGFzc05hbWUoYCR7dGhpcy5qc05hbWV9X19jb250YWluZXJgKVswXTtcbiAgICAgICAgdGhpcy5zdWJtaXRCdXR0b24gPSA8SFRNTEJ1dHRvbkVsZW1lbnQ+dGhpcy5nZXRFbGVtZW50c0J5Q2xhc3NOYW1lKGAke3RoaXMuanNOYW1lfV9fc3VibWl0YClbMF07XG5cbiAgICAgICAgdGhpcy5nZXRGb3JtSG9sZGVyKCk7XG4gICAgICAgIHRoaXMuY3JlYXRlRm9ybSgpO1xuICAgICAgICB0aGlzLnJlbW92ZUZpZWxkc0NvbnRhaW5lcigpO1xuICAgICAgICB0aGlzLm1hcEV2ZW50cygpO1xuICAgIH1cblxuICAgIHByb3RlY3RlZCBtYXBFdmVudHMoKTogdm9pZCB7XG4gICAgICAgIHRoaXMubWFwU3VibWl0QnV0dG9uQ2xpY2tFdmVudCgpO1xuICAgIH1cblxuICAgIHByb3RlY3RlZCBtYXBTdWJtaXRCdXR0b25DbGlja0V2ZW50KCk6IHZvaWQge1xuICAgICAgICB0aGlzLnN1Ym1pdEJ1dHRvbi5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsICgpID0+IHRoaXMuc3VibWl0VGFyZ2V0Rm9ybSgpKTtcbiAgICB9XG5cbiAgICBwcm90ZWN0ZWQgc3VibWl0VGFyZ2V0Rm9ybSgpOiB2b2lkIHtcbiAgICAgICAgY29uc3QgZm9ybSA9IDxIVE1MRm9ybUVsZW1lbnQ+ZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQodGhpcy5mb3JtTmFtZSk7XG5cbiAgICAgICAgaWYgKHRoaXMuc3VibWl0QnV0dG9uLmRhdGFzZXQuZm9ybUFjdGlvbikge1xuICAgICAgICAgICAgZm9ybS5hY3Rpb24gPSB0aGlzLnN1Ym1pdEJ1dHRvbi5kYXRhc2V0LmZvcm1BY3Rpb247XG4gICAgICAgIH1cblxuICAgICAgICBmb3JtLnN1Ym1pdCgpO1xuICAgIH1cblxuICAgIHByb3RlY3RlZCBnZXRGb3JtSG9sZGVyKCk6IHZvaWQge1xuICAgICAgICBpZiAodGhpcy5mb3JtSG9sZGVyQ2xhc3NOYW1lKSB7XG4gICAgICAgICAgICB0aGlzLmZvcm1Ib2xkZXIgPSA8SFRNTEVsZW1lbnQ+ZG9jdW1lbnQuZ2V0RWxlbWVudHNCeUNsYXNzTmFtZSh0aGlzLmZvcm1Ib2xkZXJDbGFzc05hbWUpWzBdO1xuXG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cblxuICAgICAgICB0aGlzLmZvcm1Ib2xkZXIgPSBkb2N1bWVudC5ib2R5O1xuICAgIH1cblxuICAgIHByb3RlY3RlZCBjcmVhdGVGb3JtKCk6IHZvaWQge1xuICAgICAgICBpZiAoZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQodGhpcy5mb3JtTmFtZSkpIHtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuXG4gICAgICAgIGNvbnN0IGZvcm1UZW1wbGF0ZSA9IGBcbiAgICAgICAgICAgIDxmb3JtIGlkPVwiJHt0aGlzLmZvcm1OYW1lfVwiIGNsYXNzPVwiaXMtaGlkZGVuXCIgbmFtZT1cIiR7dGhpcy5mb3JtTmFtZX1cIiBtZXRob2Q9XCJwb3N0XCIgYWN0aW9uPVwiJHt0aGlzLmZvcm1BY3Rpb259XCI+XG4gICAgICAgICAgICAgICAgJHt0aGlzLmZpZWxkc0NvbnRhaW5lci5pbm5lckhUTUx9XG4gICAgICAgICAgICA8L2Zvcm0+XG4gICAgICAgIGA7XG4gICAgICAgIHRoaXMuZm9ybUhvbGRlci5pbnNlcnRBZGphY2VudEhUTUwoJ2JlZm9yZWVuZCcsIGZvcm1UZW1wbGF0ZSk7XG4gICAgfVxuXG4gICAgcHJvdGVjdGVkIHJlbW92ZUZpZWxkc0NvbnRhaW5lcigpOiB2b2lkIHtcbiAgICAgICAgdGhpcy5maWVsZHNDb250YWluZXIucmVtb3ZlKCk7XG4gICAgfVxuXG4gICAgcHJvdGVjdGVkIGdldCBmb3JtSG9sZGVyQ2xhc3NOYW1lKCk6IHN0cmluZyB7XG4gICAgICAgIHJldHVybiB0aGlzLmdldEF0dHJpYnV0ZSgnZm9ybS1ob2xkZXItY2xhc3MtbmFtZScpO1xuICAgIH1cblxuICAgIHByb3RlY3RlZCBnZXQgZm9ybU5hbWUoKTogc3RyaW5nIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuZ2V0QXR0cmlidXRlKCdmb3JtLW5hbWUnKTtcbiAgICB9XG5cbiAgICBwcm90ZWN0ZWQgZ2V0IGZvcm1BY3Rpb24oKTogc3RyaW5nIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuZ2V0QXR0cmlidXRlKCdmb3JtLWFjdGlvbicpO1xuICAgIH1cbn1cbiJdLCJzb3VyY2VSb290IjoiIn0=