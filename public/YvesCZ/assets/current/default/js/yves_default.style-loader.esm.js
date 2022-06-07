(window["webpackJsonp_yves_default"] = window["webpackJsonp_yves_default"] || []).push([["style-loader"],{

/***/ "./vendor/spryker-shop/shop-ui/src/SprykerShop/Yves/ShopUi/Theme/default/components/molecules/style-loader/style-loader.ts":
/*!*********************************************************************************************************************************!*\
  !*** ./vendor/spryker-shop/shop-ui/src/SprykerShop/Yves/ShopUi/Theme/default/components/molecules/style-loader/style-loader.ts ***!
  \*********************************************************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return StyleLoader; });
/* harmony import */ var ShopUi_models_component__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ShopUi/models/component */ "./vendor/spryker-shop/shop-ui/src/SprykerShop/Yves/ShopUi/Theme/default/models/component.ts");
/* harmony import */ var ShopUi_app_logger__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ShopUi/app/logger */ "./vendor/spryker-shop/shop-ui/src/SprykerShop/Yves/ShopUi/Theme/default/app/logger.ts");


class StyleLoader extends ShopUi_models_component__WEBPACK_IMPORTED_MODULE_0__["default"] {
  readyCallback() {}

  init() {
    this.mapEvents();
  }

  mapEvents() {
    this.mapLoadEvent();
  }

  mapLoadEvent() {
    window.addEventListener('load', () => this.addCss());
  }

  addCss() {
    var linkTemplate = "<link rel=\"stylesheet\" href=\"" + this.pathToCSS + "\">";
    document.getElementsByTagName('head')[0].insertAdjacentHTML('beforeend', linkTemplate);
    Object(ShopUi_app_logger__WEBPACK_IMPORTED_MODULE_1__["debug"])("Style file " + this.pathToCSS + " has been loaded");
  }

  get pathToCSS() {
    return this.getAttribute('path-to-css');
  }

}

/***/ })

}]);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vLi92ZW5kb3Ivc3ByeWtlci1zaG9wL3Nob3AtdWkvc3JjL1NwcnlrZXJTaG9wL1l2ZXMvU2hvcFVpL1RoZW1lL2RlZmF1bHQvY29tcG9uZW50cy9tb2xlY3VsZXMvc3R5bGUtbG9hZGVyL3N0eWxlLWxvYWRlci50cyJdLCJuYW1lcyI6WyJTdHlsZUxvYWRlciIsIkNvbXBvbmVudCIsInJlYWR5Q2FsbGJhY2siLCJpbml0IiwibWFwRXZlbnRzIiwibWFwTG9hZEV2ZW50Iiwid2luZG93IiwiYWRkRXZlbnRMaXN0ZW5lciIsImFkZENzcyIsImxpbmtUZW1wbGF0ZSIsInBhdGhUb0NTUyIsImRvY3VtZW50IiwiZ2V0RWxlbWVudHNCeVRhZ05hbWUiLCJpbnNlcnRBZGphY2VudEhUTUwiLCJkZWJ1ZyIsImdldEF0dHJpYnV0ZSJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7OztBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFDQTtBQUVlLE1BQU1BLFdBQU4sU0FBMEJDLCtEQUExQixDQUFvQztBQUNyQ0MsZUFBVixHQUFnQyxDQUFFOztBQUV4QkMsTUFBVixHQUF1QjtBQUNuQixTQUFLQyxTQUFMO0FBQ0g7O0FBRVNBLFdBQVYsR0FBNEI7QUFDeEIsU0FBS0MsWUFBTDtBQUNIOztBQUVTQSxjQUFWLEdBQStCO0FBQzNCQyxVQUFNLENBQUNDLGdCQUFQLENBQXdCLE1BQXhCLEVBQWdDLE1BQU0sS0FBS0MsTUFBTCxFQUF0QztBQUNIOztBQUVTQSxRQUFWLEdBQXlCO0FBQ3JCLFFBQU1DLFlBQVksd0NBQW1DLEtBQUtDLFNBQXhDLFFBQWxCO0FBQ0FDLFlBQVEsQ0FBQ0Msb0JBQVQsQ0FBOEIsTUFBOUIsRUFBc0MsQ0FBdEMsRUFBeUNDLGtCQUF6QyxDQUE0RCxXQUE1RCxFQUF5RUosWUFBekU7QUFFQUssbUVBQUssaUJBQWUsS0FBS0osU0FBcEIsc0JBQUw7QUFDSDs7QUFFRCxNQUFjQSxTQUFkLEdBQWtDO0FBQzlCLFdBQU8sS0FBS0ssWUFBTCxDQUFrQixhQUFsQixDQUFQO0FBQ0g7O0FBeEI4QyxDIiwiZmlsZSI6Ii4vanMveXZlc19kZWZhdWx0LnN0eWxlLWxvYWRlci5lc20uanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgQ29tcG9uZW50IGZyb20gJ1Nob3BVaS9tb2RlbHMvY29tcG9uZW50JztcbmltcG9ydCB7IGRlYnVnIH0gZnJvbSAnU2hvcFVpL2FwcC9sb2dnZXInO1xuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBTdHlsZUxvYWRlciBleHRlbmRzIENvbXBvbmVudCB7XG4gICAgcHJvdGVjdGVkIHJlYWR5Q2FsbGJhY2soKTogdm9pZCB7fVxuXG4gICAgcHJvdGVjdGVkIGluaXQoKTogdm9pZCB7XG4gICAgICAgIHRoaXMubWFwRXZlbnRzKCk7XG4gICAgfVxuXG4gICAgcHJvdGVjdGVkIG1hcEV2ZW50cygpOiB2b2lkIHtcbiAgICAgICAgdGhpcy5tYXBMb2FkRXZlbnQoKTtcbiAgICB9XG5cbiAgICBwcm90ZWN0ZWQgbWFwTG9hZEV2ZW50KCk6IHZvaWQge1xuICAgICAgICB3aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcignbG9hZCcsICgpID0+IHRoaXMuYWRkQ3NzKCkpO1xuICAgIH1cblxuICAgIHByb3RlY3RlZCBhZGRDc3MoKTogdm9pZCB7XG4gICAgICAgIGNvbnN0IGxpbmtUZW1wbGF0ZSA9IGA8bGluayByZWw9XCJzdHlsZXNoZWV0XCIgaHJlZj1cIiR7dGhpcy5wYXRoVG9DU1N9XCI+YDtcbiAgICAgICAgZG9jdW1lbnQuZ2V0RWxlbWVudHNCeVRhZ05hbWUoJ2hlYWQnKVswXS5pbnNlcnRBZGphY2VudEhUTUwoJ2JlZm9yZWVuZCcsIGxpbmtUZW1wbGF0ZSk7XG5cbiAgICAgICAgZGVidWcoYFN0eWxlIGZpbGUgJHt0aGlzLnBhdGhUb0NTU30gaGFzIGJlZW4gbG9hZGVkYCk7XG4gICAgfVxuXG4gICAgcHJvdGVjdGVkIGdldCBwYXRoVG9DU1MoKTogc3RyaW5nIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuZ2V0QXR0cmlidXRlKCdwYXRoLXRvLWNzcycpO1xuICAgIH1cbn1cbiJdLCJzb3VyY2VSb290IjoiIn0=