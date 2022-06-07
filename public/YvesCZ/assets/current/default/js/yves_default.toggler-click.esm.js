(window["webpackJsonp_yves_default"] = window["webpackJsonp_yves_default"] || []).push([["toggler-click"],{

/***/ "./vendor/spryker-shop/shop-ui/src/SprykerShop/Yves/ShopUi/Theme/default/components/molecules/toggler-click/toggler-click.ts":
/*!***********************************************************************************************************************************!*\
  !*** ./vendor/spryker-shop/shop-ui/src/SprykerShop/Yves/ShopUi/Theme/default/components/molecules/toggler-click/toggler-click.ts ***!
  \***********************************************************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return TogglerClick; });
/* harmony import */ var _models_component__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../../models/component */ "./vendor/spryker-shop/shop-ui/src/SprykerShop/Yves/ShopUi/Theme/default/models/component.ts");
function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }


class TogglerClick extends _models_component__WEBPACK_IMPORTED_MODULE_0__["default"] {
  constructor() {
    super(...arguments);

    _defineProperty(this, "triggers", void 0);

    _defineProperty(this, "triggersList", void 0);

    _defineProperty(this, "targets", void 0);

    _defineProperty(this, "targetsList", void 0);
  }

  readyCallback() {}

  init() {
    /* tslint:disable: deprecation */
    this.triggersList = Array.from(this.triggerClassName ? document.getElementsByClassName(this.triggerClassName) : document.querySelectorAll(this.triggerSelector));
    this.targetsList = Array.from(this.targetClassName ? document.getElementsByClassName(this.targetClassName) : document.querySelectorAll(this.targetSelector));
    [this.triggers, this.targets] = [this.triggersList, this.targetsList];
    /* tslint:enable: deprecation */

    this.mapEvents();
  }

  mapEvents() {
    this.triggersList.forEach(trigger => {
      trigger.addEventListener('click', event => this.onTriggerClick(event));
    });
  }

  onTriggerClick(event) {
    event.preventDefault();
    this.toggle();
  }
  /**
   * Toggles the class names in the target elements.
   */


  toggle() {
    this.targetsList.forEach(target => {
      var addClass = !target.classList.contains(this.classToToggle);
      target.classList.toggle(this.classToToggle, addClass);
    });
  }
  /**
   * Gets a querySelector of the trigger element.
   *
   * @deprecated Use triggerClassName() instead.
   */


  get triggerSelector() {
    return this.getAttribute('trigger-selector');
  }

  get triggerClassName() {
    return this.getAttribute('trigger-class-name');
  }
  /**
   * Gets a querySelector of the target element.
   *
   * @deprecated Use targetClassName() instead.
   */


  get targetSelector() {
    return this.getAttribute('target-selector');
  }

  get targetClassName() {
    return this.getAttribute('target-class-name');
  }
  /**
   * Gets a class name for the toggle action.
   */


  get classToToggle() {
    return this.getAttribute('class-to-toggle');
  }

}

/***/ })

}]);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vLi92ZW5kb3Ivc3ByeWtlci1zaG9wL3Nob3AtdWkvc3JjL1NwcnlrZXJTaG9wL1l2ZXMvU2hvcFVpL1RoZW1lL2RlZmF1bHQvY29tcG9uZW50cy9tb2xlY3VsZXMvdG9nZ2xlci1jbGljay90b2dnbGVyLWNsaWNrLnRzIl0sIm5hbWVzIjpbIlRvZ2dsZXJDbGljayIsIkNvbXBvbmVudCIsInJlYWR5Q2FsbGJhY2siLCJpbml0IiwidHJpZ2dlcnNMaXN0IiwiQXJyYXkiLCJmcm9tIiwidHJpZ2dlckNsYXNzTmFtZSIsImRvY3VtZW50IiwiZ2V0RWxlbWVudHNCeUNsYXNzTmFtZSIsInF1ZXJ5U2VsZWN0b3JBbGwiLCJ0cmlnZ2VyU2VsZWN0b3IiLCJ0YXJnZXRzTGlzdCIsInRhcmdldENsYXNzTmFtZSIsInRhcmdldFNlbGVjdG9yIiwidHJpZ2dlcnMiLCJ0YXJnZXRzIiwibWFwRXZlbnRzIiwiZm9yRWFjaCIsInRyaWdnZXIiLCJhZGRFdmVudExpc3RlbmVyIiwiZXZlbnQiLCJvblRyaWdnZXJDbGljayIsInByZXZlbnREZWZhdWx0IiwidG9nZ2xlIiwidGFyZ2V0IiwiYWRkQ2xhc3MiLCJjbGFzc0xpc3QiLCJjb250YWlucyIsImNsYXNzVG9Ub2dnbGUiLCJnZXRBdHRyaWJ1dGUiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7OztBQUFBO0FBRWUsTUFBTUEsWUFBTixTQUEyQkMseURBQTNCLENBQXFDO0FBQUE7QUFBQTs7QUFBQTs7QUFBQTs7QUFBQTs7QUFBQTtBQUFBOztBQWlCdENDLGVBQVYsR0FBZ0MsQ0FBRTs7QUFFeEJDLE1BQVYsR0FBdUI7QUFDbkI7QUFDQSxTQUFLQyxZQUFMLEdBQ0lDLEtBQUssQ0FBQ0MsSUFBTixDQUNJLEtBQUtDLGdCQUFMLEdBQ01DLFFBQVEsQ0FBQ0Msc0JBQVQsQ0FBZ0MsS0FBS0YsZ0JBQXJDLENBRE4sR0FFTUMsUUFBUSxDQUFDRSxnQkFBVCxDQUEwQixLQUFLQyxlQUEvQixDQUhWLENBREo7QUFPQSxTQUFLQyxXQUFMLEdBQ0lQLEtBQUssQ0FBQ0MsSUFBTixDQUNJLEtBQUtPLGVBQUwsR0FDTUwsUUFBUSxDQUFDQyxzQkFBVCxDQUFnQyxLQUFLSSxlQUFyQyxDQUROLEdBRU1MLFFBQVEsQ0FBQ0UsZ0JBQVQsQ0FBMEIsS0FBS0ksY0FBL0IsQ0FIVixDQURKO0FBT0EsS0FBQyxLQUFLQyxRQUFOLEVBQWdCLEtBQUtDLE9BQXJCLElBQWdDLENBQUMsS0FBS1osWUFBTixFQUFvQixLQUFLUSxXQUF6QixDQUFoQztBQUNBOztBQUVBLFNBQUtLLFNBQUw7QUFDSDs7QUFFU0EsV0FBVixHQUE0QjtBQUN4QixTQUFLYixZQUFMLENBQWtCYyxPQUFsQixDQUEyQkMsT0FBRCxJQUEwQjtBQUNoREEsYUFBTyxDQUFDQyxnQkFBUixDQUF5QixPQUF6QixFQUFtQ0MsS0FBRCxJQUFrQixLQUFLQyxjQUFMLENBQW9CRCxLQUFwQixDQUFwRDtBQUNILEtBRkQ7QUFHSDs7QUFFU0MsZ0JBQVYsQ0FBeUJELEtBQXpCLEVBQTZDO0FBQ3pDQSxTQUFLLENBQUNFLGNBQU47QUFDQSxTQUFLQyxNQUFMO0FBQ0g7QUFFRDs7Ozs7QUFHQUEsUUFBTSxHQUFTO0FBQ1gsU0FBS1osV0FBTCxDQUFpQk0sT0FBakIsQ0FBMEJPLE1BQUQsSUFBeUI7QUFDOUMsVUFBTUMsUUFBUSxHQUFHLENBQUNELE1BQU0sQ0FBQ0UsU0FBUCxDQUFpQkMsUUFBakIsQ0FBMEIsS0FBS0MsYUFBL0IsQ0FBbEI7QUFDQUosWUFBTSxDQUFDRSxTQUFQLENBQWlCSCxNQUFqQixDQUF3QixLQUFLSyxhQUE3QixFQUE0Q0gsUUFBNUM7QUFDSCxLQUhEO0FBSUg7QUFFRDs7Ozs7OztBQUtBLE1BQUlmLGVBQUosR0FBOEI7QUFDMUIsV0FBTyxLQUFLbUIsWUFBTCxDQUFrQixrQkFBbEIsQ0FBUDtBQUNIOztBQUNELE1BQWN2QixnQkFBZCxHQUF5QztBQUNyQyxXQUFPLEtBQUt1QixZQUFMLENBQWtCLG9CQUFsQixDQUFQO0FBQ0g7QUFFRDs7Ozs7OztBQUtBLE1BQUloQixjQUFKLEdBQTZCO0FBQ3pCLFdBQU8sS0FBS2dCLFlBQUwsQ0FBa0IsaUJBQWxCLENBQVA7QUFDSDs7QUFDRCxNQUFjakIsZUFBZCxHQUF3QztBQUNwQyxXQUFPLEtBQUtpQixZQUFMLENBQWtCLG1CQUFsQixDQUFQO0FBQ0g7QUFFRDs7Ozs7QUFHQSxNQUFJRCxhQUFKLEdBQTRCO0FBQ3hCLFdBQU8sS0FBS0MsWUFBTCxDQUFrQixpQkFBbEIsQ0FBUDtBQUNIOztBQTNGK0MsQyIsImZpbGUiOiIuL2pzL3l2ZXNfZGVmYXVsdC50b2dnbGVyLWNsaWNrLmVzbS5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBDb21wb25lbnQgZnJvbSAnLi4vLi4vLi4vbW9kZWxzL2NvbXBvbmVudCc7XG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIFRvZ2dsZXJDbGljayBleHRlbmRzIENvbXBvbmVudCB7XG4gICAgLyoqXG4gICAgICogRWxlbWVudHMgdHJpZ2dlcmluZyB0aGUgdG9nZ2xlIGFjdGlvbi5cbiAgICAgKlxuICAgICAqIEBkZXByZWNhdGVkIFVzZSB0cmlnZ2Vyc0xpc3QgaW5zdGVhZC5cbiAgICAgKi9cbiAgICB0cmlnZ2VyczogSFRNTEVsZW1lbnRbXTtcbiAgICBwcm90ZWN0ZWQgdHJpZ2dlcnNMaXN0OiBIVE1MRWxlbWVudFtdO1xuXG4gICAgLyoqXG4gICAgICogRWxlbWVudHMgdGFyZ2V0ZWQgYnkgdGhlIHRvZ2dsZSBhY3Rpb24uXG4gICAgICpcbiAgICAgKiBAZGVwcmVjYXRlZCBVc2UgdGFyZ2V0c0xpc3QgaW5zdGVhZC5cbiAgICAgKi9cbiAgICB0YXJnZXRzOiBIVE1MRWxlbWVudFtdO1xuICAgIHByb3RlY3RlZCB0YXJnZXRzTGlzdDogSFRNTEVsZW1lbnRbXTtcblxuICAgIHByb3RlY3RlZCByZWFkeUNhbGxiYWNrKCk6IHZvaWQge31cblxuICAgIHByb3RlY3RlZCBpbml0KCk6IHZvaWQge1xuICAgICAgICAvKiB0c2xpbnQ6ZGlzYWJsZTogZGVwcmVjYXRpb24gKi9cbiAgICAgICAgdGhpcy50cmlnZ2Vyc0xpc3QgPSA8SFRNTEVsZW1lbnRbXT4oXG4gICAgICAgICAgICBBcnJheS5mcm9tKFxuICAgICAgICAgICAgICAgIHRoaXMudHJpZ2dlckNsYXNzTmFtZVxuICAgICAgICAgICAgICAgICAgICA/IGRvY3VtZW50LmdldEVsZW1lbnRzQnlDbGFzc05hbWUodGhpcy50cmlnZ2VyQ2xhc3NOYW1lKVxuICAgICAgICAgICAgICAgICAgICA6IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwodGhpcy50cmlnZ2VyU2VsZWN0b3IpLFxuICAgICAgICAgICAgKVxuICAgICAgICApO1xuICAgICAgICB0aGlzLnRhcmdldHNMaXN0ID0gPEhUTUxFbGVtZW50W10+KFxuICAgICAgICAgICAgQXJyYXkuZnJvbShcbiAgICAgICAgICAgICAgICB0aGlzLnRhcmdldENsYXNzTmFtZVxuICAgICAgICAgICAgICAgICAgICA/IGRvY3VtZW50LmdldEVsZW1lbnRzQnlDbGFzc05hbWUodGhpcy50YXJnZXRDbGFzc05hbWUpXG4gICAgICAgICAgICAgICAgICAgIDogZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbCh0aGlzLnRhcmdldFNlbGVjdG9yKSxcbiAgICAgICAgICAgIClcbiAgICAgICAgKTtcbiAgICAgICAgW3RoaXMudHJpZ2dlcnMsIHRoaXMudGFyZ2V0c10gPSBbdGhpcy50cmlnZ2Vyc0xpc3QsIHRoaXMudGFyZ2V0c0xpc3RdO1xuICAgICAgICAvKiB0c2xpbnQ6ZW5hYmxlOiBkZXByZWNhdGlvbiAqL1xuXG4gICAgICAgIHRoaXMubWFwRXZlbnRzKCk7XG4gICAgfVxuXG4gICAgcHJvdGVjdGVkIG1hcEV2ZW50cygpOiB2b2lkIHtcbiAgICAgICAgdGhpcy50cmlnZ2Vyc0xpc3QuZm9yRWFjaCgodHJpZ2dlcjogSFRNTEVsZW1lbnQpID0+IHtcbiAgICAgICAgICAgIHRyaWdnZXIuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCAoZXZlbnQ6IEV2ZW50KSA9PiB0aGlzLm9uVHJpZ2dlckNsaWNrKGV2ZW50KSk7XG4gICAgICAgIH0pO1xuICAgIH1cblxuICAgIHByb3RlY3RlZCBvblRyaWdnZXJDbGljayhldmVudDogRXZlbnQpOiB2b2lkIHtcbiAgICAgICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcbiAgICAgICAgdGhpcy50b2dnbGUoKTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBUb2dnbGVzIHRoZSBjbGFzcyBuYW1lcyBpbiB0aGUgdGFyZ2V0IGVsZW1lbnRzLlxuICAgICAqL1xuICAgIHRvZ2dsZSgpOiB2b2lkIHtcbiAgICAgICAgdGhpcy50YXJnZXRzTGlzdC5mb3JFYWNoKCh0YXJnZXQ6IEhUTUxFbGVtZW50KSA9PiB7XG4gICAgICAgICAgICBjb25zdCBhZGRDbGFzcyA9ICF0YXJnZXQuY2xhc3NMaXN0LmNvbnRhaW5zKHRoaXMuY2xhc3NUb1RvZ2dsZSk7XG4gICAgICAgICAgICB0YXJnZXQuY2xhc3NMaXN0LnRvZ2dsZSh0aGlzLmNsYXNzVG9Ub2dnbGUsIGFkZENsYXNzKTtcbiAgICAgICAgfSk7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogR2V0cyBhIHF1ZXJ5U2VsZWN0b3Igb2YgdGhlIHRyaWdnZXIgZWxlbWVudC5cbiAgICAgKlxuICAgICAqIEBkZXByZWNhdGVkIFVzZSB0cmlnZ2VyQ2xhc3NOYW1lKCkgaW5zdGVhZC5cbiAgICAgKi9cbiAgICBnZXQgdHJpZ2dlclNlbGVjdG9yKCk6IHN0cmluZyB7XG4gICAgICAgIHJldHVybiB0aGlzLmdldEF0dHJpYnV0ZSgndHJpZ2dlci1zZWxlY3RvcicpO1xuICAgIH1cbiAgICBwcm90ZWN0ZWQgZ2V0IHRyaWdnZXJDbGFzc05hbWUoKTogc3RyaW5nIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuZ2V0QXR0cmlidXRlKCd0cmlnZ2VyLWNsYXNzLW5hbWUnKTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBHZXRzIGEgcXVlcnlTZWxlY3RvciBvZiB0aGUgdGFyZ2V0IGVsZW1lbnQuXG4gICAgICpcbiAgICAgKiBAZGVwcmVjYXRlZCBVc2UgdGFyZ2V0Q2xhc3NOYW1lKCkgaW5zdGVhZC5cbiAgICAgKi9cbiAgICBnZXQgdGFyZ2V0U2VsZWN0b3IoKTogc3RyaW5nIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuZ2V0QXR0cmlidXRlKCd0YXJnZXQtc2VsZWN0b3InKTtcbiAgICB9XG4gICAgcHJvdGVjdGVkIGdldCB0YXJnZXRDbGFzc05hbWUoKTogc3RyaW5nIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuZ2V0QXR0cmlidXRlKCd0YXJnZXQtY2xhc3MtbmFtZScpO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIEdldHMgYSBjbGFzcyBuYW1lIGZvciB0aGUgdG9nZ2xlIGFjdGlvbi5cbiAgICAgKi9cbiAgICBnZXQgY2xhc3NUb1RvZ2dsZSgpOiBzdHJpbmcge1xuICAgICAgICByZXR1cm4gdGhpcy5nZXRBdHRyaWJ1dGUoJ2NsYXNzLXRvLXRvZ2dsZScpO1xuICAgIH1cbn1cbiJdLCJzb3VyY2VSb290IjoiIn0=