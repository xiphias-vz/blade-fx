(window["webpackJsonp_yves_default"] = window["webpackJsonp_yves_default"] || []).push([[2],{

/***/ "./src/Pyz/Yves/CatalogPage/Theme/default/components/molecules/window-location-applicator/window-location-applicator.ts":
/*!******************************************************************************************************************************!*\
  !*** ./src/Pyz/Yves/CatalogPage/Theme/default/components/molecules/window-location-applicator/window-location-applicator.ts ***!
  \******************************************************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return WindowLocationApplicator; });
/* harmony import */ var CatalogPage_components_molecules_window_location_applicator_window_location_applicator__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! CatalogPage/components/molecules/window-location-applicator/window-location-applicator */ "./vendor/spryker-shop/catalog-page/src/SprykerShop/Yves/CatalogPage/Theme/default/components/molecules/window-location-applicator/window-location-applicator.ts");
function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }


class WindowLocationApplicator extends CatalogPage_components_molecules_window_location_applicator_window_location_applicator__WEBPACK_IMPORTED_MODULE_0__["default"] {
  constructor() {
    super(...arguments);

    _defineProperty(this, "sortTriggers", void 0);
  }

  init() {
    this.sortTriggers = Array.from(document.getElementsByClassName(this.sortTriggerClassName));
    super.init();
  }

  mapEvents() {
    this.sortTriggers.forEach(element => {
      element.addEventListener('change', event => this.onTriggerEvent(event));
    });
    super.mapEvents();
  }

  get sortTriggerClassName() {
    return this.getAttribute('sort-trigger-class-name');
  }

  getQueryString(categoryUrl) {
    if (categoryUrl === void 0) {
      categoryUrl = window.location.pathname;
    }

    var formData = new FormData(this.form);
    var data = new URLSearchParams(formData);
    formData.forEach((value, key) => {
      if (value.length) {
        return;
      }

      data.delete(key);
    });
    var handledData = data.toString();
    this.setWindowLocation(categoryUrl, handledData);
  }

}

/***/ }),

/***/ "./vendor/spryker-shop/catalog-page/src/SprykerShop/Yves/CatalogPage/Theme/default/components/molecules/window-location-applicator/window-location-applicator.ts":
/*!***********************************************************************************************************************************************************************!*\
  !*** ./vendor/spryker-shop/catalog-page/src/SprykerShop/Yves/CatalogPage/Theme/default/components/molecules/window-location-applicator/window-location-applicator.ts ***!
  \***********************************************************************************************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return WindowLocationApplicator; });
/* harmony import */ var ShopUi_models_component__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ShopUi/models/component */ "./vendor/spryker-shop/shop-ui/src/SprykerShop/Yves/ShopUi/Theme/default/models/component.ts");
function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }


class WindowLocationApplicator extends ShopUi_models_component__WEBPACK_IMPORTED_MODULE_0__["default"] {
  constructor() {
    super(...arguments);

    _defineProperty(this, "form", void 0);

    _defineProperty(this, "triggers", void 0);
  }

  readyCallback() {}

  init() {
    this.form = document.getElementsByClassName(this.formClassName)[0];
    this.triggers = Array.from(document.getElementsByClassName(this.triggerClassName));
    this.mapEvents();
  }

  mapEvents() {
    this.triggers.forEach(element => {
      element.addEventListener('click', event => this.onTriggerEvent(event));
    });
  }

  onTriggerEvent(event) {
    var categoryUrl = event.currentTarget.getAttribute('data-url');
    /* tslint:disable: no-unbound-method */

    var isFormData = typeof FormData !== 'undefined' && typeof FormData.prototype.get !== 'undefined';
    var isURLSearchParams = typeof URLSearchParams !== 'undefined' && typeof URLSearchParams.prototype.get !== 'undefined';
    /* tslint:enable: no-unbound-method */

    if (isFormData && isURLSearchParams) {
      this.getQueryString(categoryUrl ? categoryUrl : '');
      return;
    }

    this.getQueryStringAlternative(categoryUrl ? categoryUrl : '');
  }

  getQueryString(categoryUrl) {
    if (categoryUrl === void 0) {
      categoryUrl = window.location.pathname;
    }

    var formData = new FormData(this.form);
    var data = new URLSearchParams(formData);
    formData.forEach((value, key) => {
      if (value.length) {
        return;
      }

      data.delete(key);
    });
    this.setWindowLocation(categoryUrl, data.toString());
  }

  getQueryStringAlternative(categoryUrl) {
    if (categoryUrl === void 0) {
      categoryUrl = window.location.pathname;
    }

    var inputFields = Array.from(this.form.getElementsByTagName('input'));
    var selectFields = Array.from(this.form.getElementsByTagName('select'));
    var filteredInputFields = inputFields.filter(input => {
      return (input.checked || input.type === 'number' || input.type === 'hidden') && !input.disabled;
    });
    var formFields = [...filteredInputFields, ...selectFields];
    var data = formFields.reduce((accumulator, field) => {
      if (field.name && field.value) {
        accumulator += "&" + field.name + "=" + field.value;
      }

      return accumulator;
    }, '').slice(1);
    this.setWindowLocation(categoryUrl, encodeURI(data));
  }

  setWindowLocation(categoryUrl, data) {
    window.location.href = categoryUrl + "?" + data;
  }

  get formClassName() {
    return this.getAttribute('form-class-name');
  }

  get triggerClassName() {
    return this.getAttribute('trigger-class-name');
  }

}

/***/ })

}]);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vLi9zcmMvUHl6L1l2ZXMvQ2F0YWxvZ1BhZ2UvVGhlbWUvZGVmYXVsdC9jb21wb25lbnRzL21vbGVjdWxlcy93aW5kb3ctbG9jYXRpb24tYXBwbGljYXRvci93aW5kb3ctbG9jYXRpb24tYXBwbGljYXRvci50cyIsIndlYnBhY2s6Ly8vLi92ZW5kb3Ivc3ByeWtlci1zaG9wL2NhdGFsb2ctcGFnZS9zcmMvU3ByeWtlclNob3AvWXZlcy9DYXRhbG9nUGFnZS9UaGVtZS9kZWZhdWx0L2NvbXBvbmVudHMvbW9sZWN1bGVzL3dpbmRvdy1sb2NhdGlvbi1hcHBsaWNhdG9yL3dpbmRvdy1sb2NhdGlvbi1hcHBsaWNhdG9yLnRzIl0sIm5hbWVzIjpbIldpbmRvd0xvY2F0aW9uQXBwbGljYXRvciIsIldpbmRvd0xvY2F0aW9uQXBwbGljYXRvckNvcmUiLCJpbml0Iiwic29ydFRyaWdnZXJzIiwiQXJyYXkiLCJmcm9tIiwiZG9jdW1lbnQiLCJnZXRFbGVtZW50c0J5Q2xhc3NOYW1lIiwic29ydFRyaWdnZXJDbGFzc05hbWUiLCJtYXBFdmVudHMiLCJmb3JFYWNoIiwiZWxlbWVudCIsImFkZEV2ZW50TGlzdGVuZXIiLCJldmVudCIsIm9uVHJpZ2dlckV2ZW50IiwiZ2V0QXR0cmlidXRlIiwiZ2V0UXVlcnlTdHJpbmciLCJjYXRlZ29yeVVybCIsIndpbmRvdyIsImxvY2F0aW9uIiwicGF0aG5hbWUiLCJmb3JtRGF0YSIsIkZvcm1EYXRhIiwiZm9ybSIsImRhdGEiLCJVUkxTZWFyY2hQYXJhbXMiLCJ2YWx1ZSIsImtleSIsImxlbmd0aCIsImRlbGV0ZSIsImhhbmRsZWREYXRhIiwidG9TdHJpbmciLCJzZXRXaW5kb3dMb2NhdGlvbiIsIkNvbXBvbmVudCIsInJlYWR5Q2FsbGJhY2siLCJmb3JtQ2xhc3NOYW1lIiwidHJpZ2dlcnMiLCJ0cmlnZ2VyQ2xhc3NOYW1lIiwiY3VycmVudFRhcmdldCIsImlzRm9ybURhdGEiLCJwcm90b3R5cGUiLCJnZXQiLCJpc1VSTFNlYXJjaFBhcmFtcyIsImdldFF1ZXJ5U3RyaW5nQWx0ZXJuYXRpdmUiLCJpbnB1dEZpZWxkcyIsImdldEVsZW1lbnRzQnlUYWdOYW1lIiwic2VsZWN0RmllbGRzIiwiZmlsdGVyZWRJbnB1dEZpZWxkcyIsImZpbHRlciIsImlucHV0IiwiY2hlY2tlZCIsInR5cGUiLCJkaXNhYmxlZCIsImZvcm1GaWVsZHMiLCJyZWR1Y2UiLCJhY2N1bXVsYXRvciIsImZpZWxkIiwibmFtZSIsInNsaWNlIiwiZW5jb2RlVVJJIiwiaHJlZiJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7O0FBQUE7QUFFZSxNQUFNQSx3QkFBTixTQUF1Q0MsOEhBQXZDLENBQW9FO0FBQUE7QUFBQTs7QUFBQTtBQUFBOztBQUdyRUMsTUFBVixHQUF1QjtBQUNuQixTQUFLQyxZQUFMLEdBQXlDQyxLQUFLLENBQUNDLElBQU4sQ0FBV0MsUUFBUSxDQUFDQyxzQkFBVCxDQUFnQyxLQUFLQyxvQkFBckMsQ0FBWCxDQUF6QztBQUVBLFVBQU1OLElBQU47QUFDSDs7QUFFU08sV0FBVixHQUE0QjtBQUN4QixTQUFLTixZQUFMLENBQWtCTyxPQUFsQixDQUEyQkMsT0FBRCxJQUFnQztBQUN0REEsYUFBTyxDQUFDQyxnQkFBUixDQUF5QixRQUF6QixFQUFvQ0MsS0FBRCxJQUFrQixLQUFLQyxjQUFMLENBQW9CRCxLQUFwQixDQUFyRDtBQUNILEtBRkQ7QUFJQSxVQUFNSixTQUFOO0FBQ0g7O0FBRUQsTUFBY0Qsb0JBQWQsR0FBNkM7QUFDekMsV0FBTyxLQUFLTyxZQUFMLENBQWtCLHlCQUFsQixDQUFQO0FBQ0g7O0FBRVNDLGdCQUFWLENBQXlCQyxXQUF6QixFQUErRTtBQUFBLFFBQXREQSxXQUFzRDtBQUF0REEsaUJBQXNELEdBQWhDQyxNQUFNLENBQUNDLFFBQVAsQ0FBZ0JDLFFBQWdCO0FBQUE7O0FBQzNFLFFBQU1DLFFBQVEsR0FBRyxJQUFJQyxRQUFKLENBQWEsS0FBS0MsSUFBbEIsQ0FBakI7QUFDQSxRQUFNQyxJQUFJLEdBQUcs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LEdBQXNDO0FBQ2xDLFdBQU8sS0FBS3BCLFlBQUwsQ0FBa0IsaUJBQWxCLENBQVA7QUFDSDs7QUFFRCxNQUFjc0IsZ0JBQWQsR0FBeUM7QUFDckMsV0FBTyxLQUFLdEIsWUFBTCxDQUFrQixvQkFBbEIsQ0FBUDtBQUNIOztBQWxGMkQsQyIsImZpbGUiOiIuL2pzL3l2ZXNfZGVmYXVsdC4yLmVzbS5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBXaW5kb3dMb2NhdGlvbkFwcGxpY2F0b3JDb3JlIGZyb20gJ0NhdGFsb2dQYWdlL2NvbXBvbmVudHMvbW9sZWN1bGVzL3dpbmRvdy1sb2NhdGlvbi1hcHBsaWNhdG9yL3dpbmRvdy1sb2NhdGlvbi1hcHBsaWNhdG9yJztcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgV2luZG93TG9jYXRpb25BcHBsaWNhdG9yIGV4dGVuZHMgV2luZG93TG9jYXRpb25BcHBsaWNhdG9yQ29yZSB7XG4gICAgcHJvdGVjdGVkIHNvcnRUcmlnZ2VyczogSFRNTFNlbGVjdEVsZW1lbnRbXTtcblxuICAgIHByb3RlY3RlZCBpbml0KCk6IHZvaWQge1xuICAgICAgICB0aGlzLnNvcnRUcmlnZ2VycyA9IDxIVE1MU2VsZWN0RWxlbWVudFtdPkFycmF5LmZyb20oZG9jdW1lbnQuZ2V0RWxlbWVudHNCeUNsYXNzTmFtZSh0aGlzLnNvcnRUcmlnZ2VyQ2xhc3NOYW1lKSk7XG5cbiAgICAgICAgc3VwZXIuaW5pdCgpO1xuICAgIH1cblxuICAgIHByb3RlY3RlZCBtYXBFdmVudHMoKTogdm9pZCB7XG4gICAgICAgIHRoaXMuc29ydFRyaWdnZXJzLmZvckVhY2goKGVsZW1lbnQ6IEhUTUxTZWxlY3RFbGVtZW50KSA9PiB7XG4gICAgICAgICAgICBlbGVtZW50LmFkZEV2ZW50TGlzdGVuZXIoJ2NoYW5nZScsIChldmVudDogRXZlbnQpID0+IHRoaXMub25UcmlnZ2VyRXZlbnQoZXZlbnQpKTtcbiAgICAgICAgfSk7XG5cbiAgICAgICAgc3VwZXIubWFwRXZlbnRzKCk7XG4gICAgfVxuXG4gICAgcHJvdGVjdGVkIGdldCBzb3J0VHJpZ2dlckNsYXNzTmFtZSgpOiBzdHJpbmcge1xuICAgICAgICByZXR1cm4gdGhpcy5nZXRBdHRyaWJ1dGUoJ3NvcnQtdHJpZ2dlci1jbGFzcy1uYW1lJyk7XG4gICAgfVxuXG4gICAgcHJvdGVjdGVkIGdldFF1ZXJ5U3RyaW5nKGNhdGVnb3J5VXJsOiBzdHJpbmcgPSB3aW5kb3cubG9jYXRpb24ucGF0aG5hbWUpOiB2b2lkIHtcbiAgICAgICAgY29uc3QgZm9ybURhdGEgPSBuZXcgRm9ybURhdGEodGhpcy5mb3JtKTtcbiAgICAgICAgY29uc3QgZGF0YSA9IG5ldyBVUkxTZWFyY2hQYXJhbXMoPFVSTFNlYXJjaFBhcmFtcz5mb3JtRGF0YSk7XG4gICAgICAgIGZvcm1EYXRhLmZvckVhY2goKHZhbHVlOiBzdHJpbmcsIGtleTogc3RyaW5nKSA9PiB7XG4gICAgICAgICAgICBpZiAodmFsdWUubGVuZ3RoKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBkYXRhLmRlbGV0ZShrZXkpO1xuICAgICAgICB9KTtcbiAgICAgICAgdmFyIGhhbmRsZWREYXRhID0gZGF0YS50b1N0cmluZygpO1xuXG4gICAgICAgIHRoaXMuc2V0V2luZG93TG9jYXRpb24oY2F0ZWdvcnlVcmwsIGhhbmRsZWREYXRhKTtcblxuICAgIH1cbn1cbiIsImltcG9ydCBDb21wb25lbnQgZnJvbSAnU2hvcFVpL21vZGVscy9jb21wb25lbnQnO1xuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBXaW5kb3dMb2NhdGlvbkFwcGxpY2F0b3IgZXh0ZW5kcyBDb21wb25lbnQge1xuICAgIHByb3RlY3RlZCBmb3JtOiBIVE1MRm9ybUVsZW1lbnQ7XG4gICAgcHJvdGVjdGVkIHRyaWdnZXJzOiBIVE1MQnV0dG9uRWxlbWVudFtdO1xuXG4gICAgcHJvdGVjdGVkIHJlYWR5Q2FsbGJhY2soKTogdm9pZCB7fVxuXG4gICAgcHJvdGVjdGVkIGluaXQoKTogdm9pZCB7XG4gICAgICAgIHRoaXMuZm9ybSA9IDxIVE1MRm9ybUVsZW1lbnQ+ZG9jdW1lbnQuZ2V0RWxlbWVudHNCeUNsYXNzTmFtZSh0aGlzLmZvcm1DbGFzc05hbWUpWzBdO1xuICAgICAgICB0aGlzLnRyaWdnZXJzID0gPEhUTUxCdXR0b25FbGVtZW50W10+QXJyYXkuZnJvbShkb2N1bWVudC5nZXRFbGVtZW50c0J5Q2xhc3NOYW1lKHRoaXMudHJpZ2dlckNsYXNzTmFtZSkpO1xuXG4gICAgICAgIHRoaXMubWFwRXZlbnRzKCk7XG4gICAgfVxuXG4gICAgcHJvdGVjdGVkIG1hcEV2ZW50cygpOiB2b2lkIHtcbiAgICAgICAgdGhpcy50cmlnZ2Vycy5mb3JFYWNoKChlbGVtZW50OiBIVE1MQnV0dG9uRWxlbWVudCkgPT4ge1xuICAgICAgICAgICAgZWxlbWVudC5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIChldmVudDogRXZlbnQpID0+IHRoaXMub25UcmlnZ2VyRXZlbnQoZXZlbnQpKTtcbiAgICAgICAgfSk7XG4gICAgfVxuXG4gICAgcHJvdGVjdGVkIG9uVHJpZ2dlckV2ZW50KGV2ZW50OiBFdmVudCk6IHZvaWQge1xuICAgICAgICBjb25zdCBjYXRlZ29yeVVybCA9ICg8SFRNTEJ1dHRvbkVsZW1lbnQ+ZXZlbnQuY3VycmVudFRhcmdldCkuZ2V0QXR0cmlidXRlKCdkYXRhLXVybCcpO1xuICAgICAgICAvKiB0c2xpbnQ6ZGlzYWJsZTogbm8tdW5ib3VuZC1tZXRob2QgKi9cbiAgICAgICAgY29uc3QgaXNGb3JtRGF0YSA9IHR5cGVvZiBGb3JtRGF0YSAhPT0gJ3VuZGVmaW5lZCcgJiYgdHlwZW9mIEZvcm1EYXRhLnByb3RvdHlwZS5nZXQgIT09ICd1bmRlZmluZWQnO1xuICAgICAgICBjb25zdCBpc1VSTFNlYXJjaFBhcmFtcyA9XG4gICAgICAgICAgICB0eXBlb2YgVVJMU2VhcmNoUGFyYW1zICE9PSAndW5kZWZpbmVkJyAmJiB0eXBlb2YgVVJMU2VhcmNoUGFyYW1zLnByb3RvdHlwZS5nZXQgIT09ICd1bmRlZmluZWQnO1xuICAgICAgICAvKiB0c2xpbnQ6ZW5hYmxlOiBuby11bmJvdW5kLW1ldGhvZCAqL1xuXG4gICAgICAgIGlmIChpc0Zvcm1EYXRhICYmIGlzVVJMU2VhcmNoUGFyYW1zKSB7XG4gICAgICAgICAgICB0aGlzLmdldFF1ZXJ5U3RyaW5nKGNhdGVnb3J5VXJsID8gY2F0ZWdvcnlVcmwgOiAnJyk7XG5cbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuXG4gICAgICAgIHRoaXMuZ2V0UXVlcnlTdHJpbmdBbHRlcm5hdGl2ZShjYXRlZ29yeVVybCA/IGNhdGVnb3J5VXJsIDogJycpO1xuICAgIH1cblxuICAgIHByb3RlY3RlZCBnZXRRdWVyeVN0cmluZyhjYXRlZ29yeVVybDogc3RyaW5nID0gd2luZG93LmxvY2F0aW9uLnBhdGhuYW1lKTogdm9pZCB7XG4gICAgICAgIGNvbnN0IGZvcm1EYXRhID0gbmV3IEZvcm1EYXRhKHRoaXMuZm9ybSk7XG4gICAgICAgIGNvbnN0IGRhdGEgPSBuZXcgVVJMU2VhcmNoUGFyYW1zKDxVUkxTZWFyY2hQYXJhbXM+Zm9ybURhdGEpO1xuXG4gICAgICAgIGZvcm1EYXRhLmZvckVhY2goKHZhbHVlOiBzdHJpbmcsIGtleTogc3RyaW5nKSA9PiB7XG4gICAgICAgICAgICBpZiAodmFsdWUubGVuZ3RoKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBkYXRhLmRlbGV0ZShrZXkpO1xuICAgICAgICB9KTtcblxuICAgICAgICB0aGlzLnNldFdpbmRvd0xvY2F0aW9uKGNhdGVnb3J5VXJsLCBkYXRhLnRvU3RyaW5nKCkpO1xuICAgIH1cblxuICAgIHByb3RlY3RlZCBnZXRRdWVyeVN0cmluZ0FsdGVybmF0aXZlKGNhdGVnb3J5VXJsOiBzdHJpbmcgPSB3aW5kb3cubG9jYXRpb24ucGF0aG5hbWUpOiB2b2lkIHtcbiAgICAgICAgY29uc3QgaW5wdXRGaWVsZHMgPSA8SFRNTElucHV0RWxlbWVudFtdPkFycmF5LmZyb20odGhpcy5mb3JtLmdldEVsZW1lbnRzQnlUYWdOYW1lKCdpbnB1dCcpKTtcbiAgICAgICAgY29uc3Qgc2VsZWN0RmllbGRzID0gPEhUTUxTZWxlY3RFbGVtZW50W10+QXJyYXkuZnJvbSh0aGlzLmZvcm0uZ2V0RWxlbWVudHNCeVRhZ05hbWUoJ3NlbGVjdCcpKTtcblxuICAgICAgICBjb25zdCBmaWx0ZXJlZElucHV0RmllbGRzID0gaW5wdXRGaWVsZHMuZmlsdGVyKChpbnB1dDogSFRNTElucHV0RWxlbWVudCkgPT4ge1xuICAgICAgICAgICAgcmV0dXJuIChpbnB1dC5jaGVja2VkIHx8IGlucHV0LnR5cGUgPT09ICdudW1iZXInIHx8IGlucHV0LnR5cGUgPT09ICdoaWRkZW4nKSAmJiAhaW5wdXQuZGlzYWJsZWQ7XG4gICAgICAgIH0pO1xuICAgICAgICBjb25zdCBmb3JtRmllbGRzID0gWy4uLmZpbHRlcmVkSW5wdXRGaWVsZHMsIC4uLnNlbGVjdEZpZWxkc107XG4gICAgICAgIGNvbnN0IGRhdGE6IHN0cmluZyA9IGZvcm1GaWVsZHNcbiAgICAgICAgICAgIC5yZWR1Y2UoKGFjY3VtdWxhdG9yOiBzdHJpbmcsIGZpZWxkOiBIVE1MSW5wdXRFbGVtZW50IHwgSFRNTFNlbGVjdEVsZW1lbnQpID0+IHtcbiAgICAgICAgICAgICAgICBpZiAoZmllbGQubmFtZSAmJiBmaWVsZC52YWx1ZSkge1xuICAgICAgICAgICAgICAgICAgICBhY2N1bXVsYXRvciArPSBgJiR7ZmllbGQubmFtZX09JHtmaWVsZC52YWx1ZX1gO1xuICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgIHJldHVybiBhY2N1bXVsYXRvcjtcbiAgICAgICAgICAgIH0sICcnKVxuICAgICAgICAgICAgLnNsaWNlKDEpO1xuXG4gICAgICAgIHRoaXMuc2V0V2luZG93TG9jYXRpb24oY2F0ZWdvcnlVcmwsIGVuY29kZVVSSShkYXRhKSk7XG4gICAgfVxuXG4gICAgcHJvdGVjdGVkIHNldFdpbmRvd0xvY2F0aW9uKGNhdGVnb3J5VXJsOiBzdHJpbmcsIGRhdGE6IHN0cmluZyk6IHZvaWQge1xuICAgICAgICB3aW5kb3cubG9jYXRpb24uaHJlZiA9IGAke2NhdGVnb3J5VXJsfT8ke2RhdGF9YDtcbiAgICB9XG5cbiAgICBwcm90ZWN0ZWQgZ2V0IGZvcm1DbGFzc05hbWUoKTogc3RyaW5nIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuZ2V0QXR0cmlidXRlKCdmb3JtLWNsYXNzLW5hbWUnKTtcbiAgICB9XG5cbiAgICBwcm90ZWN0ZWQgZ2V0IHRyaWdnZXJDbGFzc05hbWUoKTogc3RyaW5nIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuZ2V0QXR0cmlidXRlKCd0cmlnZ2VyLWNsYXNzLW5hbWUnKTtcbiAgICB9XG59XG4iXSwic291cmNlUm9vdCI6IiJ9