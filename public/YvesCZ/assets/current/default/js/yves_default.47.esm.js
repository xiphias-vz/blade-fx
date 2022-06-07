(window["webpackJsonp_yves_default"] = window["webpackJsonp_yves_default"] || []).push([[47],{

/***/ "./src/Pyz/Yves/ShopUi/Theme/default/components/molecules/toggler-accordion/toggler-accordion.ts":
/*!*******************************************************************************************************!*\
  !*** ./src/Pyz/Yves/ShopUi/Theme/default/components/molecules/toggler-accordion/toggler-accordion.ts ***!
  \*******************************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return TogglerAccordion; });
/* harmony import */ var ShopUi_models_component__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ShopUi/models/component */ "./vendor/spryker-shop/shop-ui/src/SprykerShop/Yves/ShopUi/Theme/default/models/component.ts");
function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }


class TogglerAccordion extends ShopUi_models_component__WEBPACK_IMPORTED_MODULE_0__["default"] {
  constructor() {
    super(...arguments);

    _defineProperty(this, "triggers", void 0);
  }

  readyCallback() {}

  init() {
    this.triggers = Array.from(document.getElementsByClassName(this.triggerClassName));
    this.mapEvents();
  }

  mapEvents() {
    this.triggers.forEach(trigger => {
      var eventFunction = e => this.triggerHandler(trigger, e);

      trigger.addEventListener('click', eventFunction.bind(this));
    });
  }

  triggerHandler(trigger, event) {
    event.stopImmediatePropagation();
    var togglerContent = document.getElementsByClassName(trigger.getAttribute('data-toggle-target-class-name'))[0];
    trigger.classList.toggle(this.activeClass);
    togglerContent.classList.toggle(this.toggleClass);
  }

  get triggerClassName() {
    return this.getAttribute('trigger-class-name');
  }

  get toggleClass() {
    return this.getAttribute('class-to-toggle');
  }

  get activeClass() {
    return this.getAttribute('active-class');
  }

}

/***/ })

}]);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vLi9zcmMvUHl6L1l2ZXMvU2hvcFVpL1RoZW1lL2RlZmF1bHQvY29tcG9uZW50cy9tb2xlY3VsZXMvdG9nZ2xlci1hY2NvcmRpb24vdG9nZ2xlci1hY2NvcmRpb24udHMiXSwibmFtZXMiOlsiVG9nZ2xlckFjY29yZGlvbiIsIkNvbXBvbmVudCIsInJlYWR5Q2FsbGJhY2siLCJpbml0IiwidHJpZ2dlcnMiLCJBcnJheSIsImZyb20iLCJkb2N1bWVudCIsImdldEVsZW1lbnRzQnlDbGFzc05hbWUiLCJ0cmlnZ2VyQ2xhc3NOYW1lIiwibWFwRXZlbnRzIiwiZm9yRWFjaCIsInRyaWdnZXIiLCJldmVudEZ1bmN0aW9uIiwiZSIsInRyaWdnZXJIYW5kbGVyIiwiYWRkRXZlbnRMaXN0ZW5lciIsImJpbmQiLCJldmVudCIsInN0b3BJbW1lZGlhdGVQcm9wYWdhdGlvbiIsInRvZ2dsZXJDb250ZW50IiwiZ2V0QXR0cmlidXRlIiwiY2xhc3NMaXN0IiwidG9nZ2xlIiwiYWN0aXZlQ2xhc3MiLCJ0b2dnbGVDbGFzcyJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7O0FBQUE7QUFJZSxNQUFNQSxnQkFBTixTQUErQkMsK0RBQS9CLENBQXlDO0FBQUE7QUFBQTs7QUFBQTtBQUFBOztBQUcxQ0MsZUFBVixHQUFnQyxDQUFFOztBQUV4QkMsTUFBVixHQUF1QjtBQUNuQixTQUFLQyxRQUFMLEdBQStCQyxLQUFLLENBQUNDLElBQU4sQ0FBV0MsUUFBUSxDQUFDQyxzQkFBVCxDQUFnQyxLQUFLQyxnQkFBckMsQ0FBWCxDQUEvQjtBQUNBLFNBQUtDLFNBQUw7QUFDSDs7QUFFU0EsV0FBVixHQUE0QjtBQUN4QixTQUFLTixRQUFMLENBQWNPLE9BQWQsQ0FBc0JDLE9BQU8sSUFBSTtBQUM3QixVQUFNQyxhQUFhLEdBQUlDLENBQUQsSUFBYyxLQUFLQyxjQUFMLENBQW9CSCxPQUFwQixFQUE2QkUsQ0FBN0IsQ0FBcEM7O0FBQ0FGLGFBQU8sQ0FBQ0ksZ0JBQVIsQ0FBeUIsT0FBekIsRUFBa0NILGFBQWEsQ0FBQ0ksSUFBZCxDQUFtQixJQUFuQixDQUFsQztBQUNILEtBSEQ7QUFJSDs7QUFFU0YsZ0JBQVYsQ0FBeUJILE9BQXpCLEVBQStDTSxLQUEvQyxFQUFtRTtBQUMvREEsU0FBSyxDQUFDQyx3QkFBTjtBQUNBLFFBQU1DLGNBQWMsR0FBR2IsUUFBUSxDQUFDQyxzQkFBVCxDQUNuQkksT0FBTyxDQUFDUyxZQUFSLENBQXFCLCtCQUFyQixDQURtQixFQUVyQixDQUZxQixDQUF2QjtBQUdBVCxXQUFPLENBQUNVLFNBQVIsQ0FBa0JDLE1BQWxCLENBQXlCLEtBQUtDLFdBQTlCO0FBQ0FKLGtCQUFjLENBQUNFLFNBQWYsQ0FBeUJDLE1BQXpCLENBQWdDLEtBQUtFLFdBQXJDO0FBQ0g7O0FBRUQsTUFBY2hCLGdCQUFkLEdBQXlDO0FBQ3JDLFdBQU8sS0FBS1ksWUFBTCxDQUFrQixvQkFBbEIsQ0FBUDtBQUNIOztBQUVELE1BQWNJLFdBQWQsR0FBb0M7QUFDaEMsV0FBTyxLQUFLSixZQUFMLENBQWtCLGlCQUFsQixDQUFQO0FBQ0g7O0FBRUQsTUFBY0csV0FBZCxHQUFvQztBQUNoQyxXQUFPLEtBQUtILFlBQUwsQ0FBa0IsY0FBbEIsQ0FBUDtBQUNIOztBQXBDbUQsQyIsImZpbGUiOiIuL2pzL3l2ZXNfZGVmYXVsdC40Ny5lc20uanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgQ29tcG9uZW50IGZyb20gJ1Nob3BVaS9tb2RlbHMvY29tcG9uZW50JztcbmltcG9ydCB7ZXZlbnROYW1lc30gZnJvbSAnY29tbWFuZGVyJztcbmltcG9ydCB7YXJyYXl9IGZyb20gJ2Zhc3QtZ2xvYi9vdXQvdXRpbHMnO1xuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBUb2dnbGVyQWNjb3JkaW9uIGV4dGVuZHMgQ29tcG9uZW50IHtcbiAgICBwcm90ZWN0ZWQgdHJpZ2dlcnM6IEhUTUxFbGVtZW50W107XG5cbiAgICBwcm90ZWN0ZWQgcmVhZHlDYWxsYmFjaygpOiB2b2lkIHt9XG5cbiAgICBwcm90ZWN0ZWQgaW5pdCgpOiB2b2lkIHtcbiAgICAgICAgdGhpcy50cmlnZ2VycyA9IDxIVE1MRWxlbWVudFtdPkFycmF5LmZyb20oZG9jdW1lbnQuZ2V0RWxlbWVudHNCeUNsYXNzTmFtZSh0aGlzLnRyaWdnZXJDbGFzc05hbWUpKTtcbiAgICAgICAgdGhpcy5tYXBFdmVudHMoKTtcbiAgICB9XG5cbiAgICBwcm90ZWN0ZWQgbWFwRXZlbnRzKCk6IHZvaWQge1xuICAgICAgICB0aGlzLnRyaWdnZXJzLmZvckVhY2godHJpZ2dlciA9PiB7XG4gICAgICAgICAgICBjb25zdCBldmVudEZ1bmN0aW9uID0gKGU6IEV2ZW50KSA9PiB0aGlzLnRyaWdnZXJIYW5kbGVyKHRyaWdnZXIsIGUpO1xuICAgICAgICAgICAgdHJpZ2dlci5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIGV2ZW50RnVuY3Rpb24uYmluZCh0aGlzKSk7XG4gICAgICAgIH0pO1xuICAgIH1cblxuICAgIHByb3RlY3RlZCB0cmlnZ2VySGFuZGxlcih0cmlnZ2VyOiBIVE1MRWxlbWVudCwgZXZlbnQ6IEV2ZW50KTogdm9pZCB7XG4gICAgICAgIGV2ZW50LnN0b3BJbW1lZGlhdGVQcm9wYWdhdGlvbigpO1xuICAgICAgICBjb25zdCB0b2dnbGVyQ29udGVudCA9IGRvY3VtZW50LmdldEVsZW1lbnRzQnlDbGFzc05hbWUoXG4gICAgICAgICAgICB0cmlnZ2VyLmdldEF0dHJpYnV0ZSgnZGF0YS10b2dnbGUtdGFyZ2V0LWNsYXNzLW5hbWUnKVxuICAgICAgICApWzBdO1xuICAgICAgICB0cmlnZ2VyLmNsYXNzTGlzdC50b2dnbGUodGhpcy5hY3RpdmVDbGFzcyk7XG4gICAgICAgIHRvZ2dsZXJDb250ZW50LmNsYXNzTGlzdC50b2dnbGUodGhpcy50b2dnbGVDbGFzcyk7XG4gICAgfVxuXG4gICAgcHJvdGVjdGVkIGdldCB0cmlnZ2VyQ2xhc3NOYW1lKCk6IHN0cmluZyB7XG4gICAgICAgIHJldHVybiB0aGlzLmdldEF0dHJpYnV0ZSgndHJpZ2dlci1jbGFzcy1uYW1lJyk7XG4gICAgfVxuXG4gICAgcHJvdGVjdGVkIGdldCB0b2dnbGVDbGFzcygpOiBzdHJpbmcge1xuICAgICAgICByZXR1cm4gdGhpcy5nZXRBdHRyaWJ1dGUoJ2NsYXNzLXRvLXRvZ2dsZScpO1xuICAgIH1cblxuICAgIHByb3RlY3RlZCBnZXQgYWN0aXZlQ2xhc3MoKTogc3RyaW5nIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuZ2V0QXR0cmlidXRlKCdhY3RpdmUtY2xhc3MnKTtcbiAgICB9XG59XG4iXSwic291cmNlUm9vdCI6IiJ9