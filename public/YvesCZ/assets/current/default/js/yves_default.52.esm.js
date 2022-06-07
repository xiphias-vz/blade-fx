(window["webpackJsonp_yves_default"] = window["webpackJsonp_yves_default"] || []).push([[52],{

/***/ "./vendor/spryker-shop/shop-ui/src/SprykerShop/Yves/ShopUi/Theme/default/components/molecules/toggler-checkbox/toggler-checkbox.ts":
/*!*****************************************************************************************************************************************!*\
  !*** ./vendor/spryker-shop/shop-ui/src/SprykerShop/Yves/ShopUi/Theme/default/components/molecules/toggler-checkbox/toggler-checkbox.ts ***!
  \*****************************************************************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return TogglerCheckbox; });
/* harmony import */ var _models_component__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../../models/component */ "./vendor/spryker-shop/shop-ui/src/SprykerShop/Yves/ShopUi/Theme/default/models/component.ts");
function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }


/**
 * @event toggle An event which is triggered when the trigger element is changed.
 */

class TogglerCheckbox extends _models_component__WEBPACK_IMPORTED_MODULE_0__["default"] {
  /**
   * Element triggering the toggle action.
   */

  /**
   * Elements targeted by the toggle action.
   */
  constructor() {
    super();

    _defineProperty(this, "trigger", void 0);

    _defineProperty(this, "targets", void 0);

    _defineProperty(this, "event", void 0);

    this.trigger = this.getElementsByClassName(this.jsName + "__trigger")[0];
    /* tslint:disable: deprecation */

    this.targets = Array.from(this.targetClassName ? document.getElementsByClassName(this.targetClassName) : document.querySelectorAll(this.targetSelector));
    /* tslint:enable: deprecation */
  }

  readyCallback() {
    this.toggle();
    this.fireToggleEvent();
    this.mapEvents();
  }

  mapEvents() {
    this.trigger.addEventListener('change', event => this.onTriggerClick(event));
  }

  onTriggerClick(event) {
    event.preventDefault();
    this.toggle();
    this.fireToggleEvent();
  }
  /**
   * Toggles the class names in the target elements.
   * @param addClass A boolean value which checks if the trigger is checked.
   */


  toggle(addClass) {
    if (addClass === void 0) {
      addClass = this.addClass;
    }

    this.targets.forEach(element => element.classList.toggle(this.classToToggle, addClass));
  }
  /**
   *  Creates an instance of the custom toggle event and triggers it.
   */


  fireToggleEvent() {
    this.event = new CustomEvent('toggle');
    this.dispatchEvent(this.event);
  }
  /**
   * Gets if the trigger element is checked.
   */


  get addClass() {
    return this.addClassWhenChecked ? this.trigger.checked : !this.trigger.checked;
  }
  /**
   * Gets a querySelector of the target element.
   *
   * @deprecated Use targetClassName() instead.
   */


  get targetSelector() {
    return this.trigger.getAttribute('target-selector');
  }

  get targetClassName() {
    return this.trigger.getAttribute('target-class-name');
  }
  /**
   * Gets a class name for the toggle action.
   */


  get classToToggle() {
    return this.trigger.getAttribute('class-to-toggle');
  }
  /**
   * Gets if the element should add the class when checked.
   */


  get addClassWhenChecked() {
    return this.trigger.hasAttribute('add-class-when-checked');
  }

}

/***/ })

}]);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vLi92ZW5kb3Ivc3ByeWtlci1zaG9wL3Nob3AtdWkvc3JjL1NwcnlrZXJTaG9wL1l2ZXMvU2hvcFVpL1RoZW1lL2RlZmF1bHQvY29tcG9uZW50cy9tb2xlY3VsZXMvdG9nZ2xlci1jaGVja2JveC90b2dnbGVyLWNoZWNrYm94LnRzIl0sIm5hbWVzIjpbIlRvZ2dsZXJDaGVja2JveCIsIkNvbXBvbmVudCIsImNvbnN0cnVjdG9yIiwidHJpZ2dlciIsImdldEVsZW1lbnRzQnlDbGFzc05hbWUiLCJqc05hbWUiLCJ0YXJnZXRzIiwiQXJyYXkiLCJmcm9tIiwidGFyZ2V0Q2xhc3NOYW1lIiwiZG9jdW1lbnQiLCJxdWVyeVNlbGVjdG9yQWxsIiwidGFyZ2V0U2VsZWN0b3IiLCJyZWFkeUNhbGxiYWNrIiwidG9nZ2xlIiwiZmlyZVRvZ2dsZUV2ZW50IiwibWFwRXZlbnRzIiwiYWRkRXZlbnRMaXN0ZW5lciIsImV2ZW50Iiwib25UcmlnZ2VyQ2xpY2siLCJwcmV2ZW50RGVmYXVsdCIsImFkZENsYXNzIiwiZm9yRWFjaCIsImVsZW1lbnQiLCJjbGFzc0xpc3QiLCJjbGFzc1RvVG9nZ2xlIiwiQ3VzdG9tRXZlbnQiLCJkaXNwYXRjaEV2ZW50IiwiYWRkQ2xhc3NXaGVuQ2hlY2tlZCIsImNoZWNrZWQiLCJnZXRBdHRyaWJ1dGUiLCJoYXNBdHRyaWJ1dGUiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7OztBQUFBO0FBRUE7Ozs7QUFHZSxNQUFNQSxlQUFOLFNBQThCQyx5REFBOUIsQ0FBd0M7QUFDbkQ7Ozs7QUFLQTs7O0FBTUFDLGFBQVcsR0FBRztBQUNWOztBQURVOztBQUFBOztBQUFBOztBQUVWLFNBQUtDLE9BQUwsR0FBaUMsS0FBS0Msc0JBQUwsQ0FBK0IsS0FBS0MsTUFBcEMsZ0JBQXVELENBQXZELENBQWpDO0FBQ0E7O0FBQ0EsU0FBS0MsT0FBTCxHQUNJQyxLQUFLLENBQUNDLElBQU4sQ0FDSSxLQUFLQyxlQUFMLEdBQ01DLFFBQVEsQ0FBQ04sc0JBQVQsQ0FBZ0MsS0FBS0ssZUFBckMsQ0FETixHQUVNQyxRQUFRLENBQUNDLGdCQUFULENBQTBCLEtBQUtDLGNBQS9CLENBSFYsQ0FESjtBQU9BO0FBQ0g7O0FBRVNDLGVBQVYsR0FBZ0M7QUFDNUIsU0FBS0MsTUFBTDtBQUNBLFNBQUtDLGVBQUw7QUFDQSxTQUFLQyxTQUFMO0FBQ0g7O0FBRVNBLFdBQVYsR0FBNEI7QUFDeEIsU0FBS2IsT0FBTCxDQUFhYyxnQkFBYixDQUE4QixRQUE5QixFQUF5Q0MsS0FBRCxJQUFrQixLQUFLQyxjQUFMLENBQW9CRCxLQUFwQixDQUExRDtBQUNIOztBQUVTQyxnQkFBVixDQUF5QkQsS0FBekIsRUFBNkM7QUFDekNBLFNBQUssQ0FBQ0UsY0FBTjtBQUNBLFNBQUtOLE1BQUw7QUFDQSxTQUFLQyxlQUFMO0FBQ0g7QUFFRDs7Ozs7O0FBSUFELFFBQU0sQ0FBQ08sUUFBRCxFQUEwQztBQUFBLFFBQXpDQSxRQUF5QztBQUF6Q0EsY0FBeUMsR0FBckIsS0FBS0EsUUFBZ0I7QUFBQTs7QUFDNUMsU0FBS2YsT0FBTCxDQUFhZ0IsT0FBYixDQUFzQkMsT0FBRCxJQUEwQkEsT0FBTyxDQUFDQyxTQUFSLENBQWtCVixNQUFsQixDQUF5QixLQUFLVyxhQUE5QixFQUE2Q0osUUFBN0MsQ0FBL0M7QUFDSDtBQUVEOzs7OztBQUdBTixpQkFBZSxHQUFTO0FBQ3BCLFNBQUtHLEtBQUwsR0FBYSxJQUFJUSxXQUFKLENBQWdCLFFBQWhCLENBQWI7QUFDQSxTQUFLQyxhQUFMLENBQW1CLEtBQUtULEtBQXhCO0FBQ0g7QUFFRDs7Ozs7QUFHQSxNQUFJRyxRQUFKLEdBQXdCO0FBQ3BCLFdBQU8sS0FBS08sbUJBQUwsR0FBMkIsS0FBS3pCLE9BQUwsQ0FBYTBCLE9BQXhDLEdBQWtELENBQUMsS0FBSzFCLE9BQUwsQ0FBYTBCLE9BQXZFO0FBQ0g7QUFFRDs7Ozs7OztBQUtBLE1BQUlqQixjQUFKLEdBQTZCO0FBQ3pCLFdBQU8sS0FBS1QsT0FBTCxDQUFhMkIsWUFBYixDQUEwQixpQkFBMUIsQ0FBUDtBQUNIOztBQUNELE1BQWNyQixlQUFkLEdBQXdDO0FBQ3BDLFdBQU8sS0FBS04sT0FBTCxDQUFhMkIsWUFBYixDQUEwQixtQkFBMUIsQ0FBUDtBQUNIO0FBRUQ7Ozs7O0FBR0EsTUFBSUwsYUFBSixHQUE0QjtBQUN4QixXQUFPLEtBQUt0QixPQUFMLENBQWEyQixZQUFiLENBQTBCLGlCQUExQixDQUFQO0FBQ0g7QUFFRDs7Ozs7QUFHQSxNQUFJRixtQkFBSixHQUFtQztBQUMvQixXQUFPLEtBQUt6QixPQUFMLENBQWE0QixZQUFiLENBQTBCLHdCQUExQixDQUFQO0FBQ0g7O0FBekZrRCxDIiwiZmlsZSI6Ii4vanMveXZlc19kZWZhdWx0LjUyLmVzbS5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBDb21wb25lbnQgZnJvbSAnLi4vLi4vLi4vbW9kZWxzL2NvbXBvbmVudCc7XG5cbi8qKlxuICogQGV2ZW50IHRvZ2dsZSBBbiBldmVudCB3aGljaCBpcyB0cmlnZ2VyZWQgd2hlbiB0aGUgdHJpZ2dlciBlbGVtZW50IGlzIGNoYW5nZWQuXG4gKi9cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIFRvZ2dsZXJDaGVja2JveCBleHRlbmRzIENvbXBvbmVudCB7XG4gICAgLyoqXG4gICAgICogRWxlbWVudCB0cmlnZ2VyaW5nIHRoZSB0b2dnbGUgYWN0aW9uLlxuICAgICAqL1xuICAgIHJlYWRvbmx5IHRyaWdnZXI6IEhUTUxJbnB1dEVsZW1lbnQ7XG5cbiAgICAvKipcbiAgICAgKiBFbGVtZW50cyB0YXJnZXRlZCBieSB0aGUgdG9nZ2xlIGFjdGlvbi5cbiAgICAgKi9cbiAgICByZWFkb25seSB0YXJnZXRzOiBIVE1MRWxlbWVudFtdO1xuICAgIHByb3RlY3RlZCBldmVudDogQ3VzdG9tRXZlbnQ7XG5cbiAgICBjb25zdHJ1Y3RvcigpIHtcbiAgICAgICAgc3VwZXIoKTtcbiAgICAgICAgdGhpcy50cmlnZ2VyID0gPEhUTUxJbnB1dEVsZW1lbnQ+dGhpcy5nZXRFbGVtZW50c0J5Q2xhc3NOYW1lKGAke3RoaXMuanNOYW1lfV9fdHJpZ2dlcmApWzBdO1xuICAgICAgICAvKiB0c2xpbnQ6ZGlzYWJsZTogZGVwcmVjYXRpb24gKi9cbiAgICAgICAgdGhpcy50YXJnZXRzID0gPEhUTUxFbGVtZW50W10+KFxuICAgICAgICAgICAgQXJyYXkuZnJvbShcbiAgICAgICAgICAgICAgICB0aGlzLnRhcmdldENsYXNzTmFtZVxuICAgICAgICAgICAgICAgICAgICA/IGRvY3VtZW50LmdldEVsZW1lbnRzQnlDbGFzc05hbWUodGhpcy50YXJnZXRDbGFzc05hbWUpXG4gICAgICAgICAgICAgICAgICAgIDogZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbCh0aGlzLnRhcmdldFNlbGVjdG9yKSxcbiAgICAgICAgICAgIClcbiAgICAgICAgKTtcbiAgICAgICAgLyogdHNsaW50OmVuYWJsZTogZGVwcmVjYXRpb24gKi9cbiAgICB9XG5cbiAgICBwcm90ZWN0ZWQgcmVhZHlDYWxsYmFjaygpOiB2b2lkIHtcbiAgICAgICAgdGhpcy50b2dnbGUoKTtcbiAgICAgICAgdGhpcy5maXJlVG9nZ2xlRXZlbnQoKTtcbiAgICAgICAgdGhpcy5tYXBFdmVudHMoKTtcbiAgICB9XG5cbiAgICBwcm90ZWN0ZWQgbWFwRXZlbnRzKCk6IHZvaWQge1xuICAgICAgICB0aGlzLnRyaWdnZXIuYWRkRXZlbnRMaXN0ZW5lcignY2hhbmdlJywgKGV2ZW50OiBFdmVudCkgPT4gdGhpcy5vblRyaWdnZXJDbGljayhldmVudCkpO1xuICAgIH1cblxuICAgIHByb3RlY3RlZCBvblRyaWdnZXJDbGljayhldmVudDogRXZlbnQpOiB2b2lkIHtcbiAgICAgICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcbiAgICAgICAgdGhpcy50b2dnbGUoKTtcbiAgICAgICAgdGhpcy5maXJlVG9nZ2xlRXZlbnQoKTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBUb2dnbGVzIHRoZSBjbGFzcyBuYW1lcyBpbiB0aGUgdGFyZ2V0IGVsZW1lbnRzLlxuICAgICAqIEBwYXJhbSBhZGRDbGFzcyBBIGJvb2xlYW4gdmFsdWUgd2hpY2ggY2hlY2tzIGlmIHRoZSB0cmlnZ2VyIGlzIGNoZWNrZWQuXG4gICAgICovXG4gICAgdG9nZ2xlKGFkZENsYXNzOiBib29sZWFuID0gdGhpcy5hZGRDbGFzcyk6IHZvaWQge1xuICAgICAgICB0aGlzLnRhcmdldHMuZm9yRWFjaCgoZWxlbWVudDogSFRNTEVsZW1lbnQpID0+IGVsZW1lbnQuY2xhc3NMaXN0LnRvZ2dsZSh0aGlzLmNsYXNzVG9Ub2dnbGUsIGFkZENsYXNzKSk7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogIENyZWF0ZXMgYW4gaW5zdGFuY2Ugb2YgdGhlIGN1c3RvbSB0b2dnbGUgZXZlbnQgYW5kIHRyaWdnZXJzIGl0LlxuICAgICAqL1xuICAgIGZpcmVUb2dnbGVFdmVudCgpOiB2b2lkIHtcbiAgICAgICAgdGhpcy5ldmVudCA9IG5ldyBDdXN0b21FdmVudCgndG9nZ2xlJyk7XG4gICAgICAgIHRoaXMuZGlzcGF0Y2hFdmVudCh0aGlzLmV2ZW50KTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBHZXRzIGlmIHRoZSB0cmlnZ2VyIGVsZW1lbnQgaXMgY2hlY2tlZC5cbiAgICAgKi9cbiAgICBnZXQgYWRkQ2xhc3MoKTogYm9vbGVhbiB7XG4gICAgICAgIHJldHVybiB0aGlzLmFkZENsYXNzV2hlbkNoZWNrZWQgPyB0aGlzLnRyaWdnZXIuY2hlY2tlZCA6ICF0aGlzLnRyaWdnZXIuY2hlY2tlZDtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBHZXRzIGEgcXVlcnlTZWxlY3RvciBvZiB0aGUgdGFyZ2V0IGVsZW1lbnQuXG4gICAgICpcbiAgICAgKiBAZGVwcmVjYXRlZCBVc2UgdGFyZ2V0Q2xhc3NOYW1lKCkgaW5zdGVhZC5cbiAgICAgKi9cbiAgICBnZXQgdGFyZ2V0U2VsZWN0b3IoKTogc3RyaW5nIHtcbiAgICAgICAgcmV0dXJuIHRoaXMudHJpZ2dlci5nZXRBdHRyaWJ1dGUoJ3RhcmdldC1zZWxlY3RvcicpO1xuICAgIH1cbiAgICBwcm90ZWN0ZWQgZ2V0IHRhcmdldENsYXNzTmFtZSgpOiBzdHJpbmcge1xuICAgICAgICByZXR1cm4gdGhpcy50cmlnZ2VyLmdldEF0dHJpYnV0ZSgndGFyZ2V0LWNsYXNzLW5hbWUnKTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBHZXRzIGEgY2xhc3MgbmFtZSBmb3IgdGhlIHRvZ2dsZSBhY3Rpb24uXG4gICAgICovXG4gICAgZ2V0IGNsYXNzVG9Ub2dnbGUoKTogc3RyaW5nIHtcbiAgICAgICAgcmV0dXJuIHRoaXMudHJpZ2dlci5nZXRBdHRyaWJ1dGUoJ2NsYXNzLXRvLXRvZ2dsZScpO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIEdldHMgaWYgdGhlIGVsZW1lbnQgc2hvdWxkIGFkZCB0aGUgY2xhc3Mgd2hlbiBjaGVja2VkLlxuICAgICAqL1xuICAgIGdldCBhZGRDbGFzc1doZW5DaGVja2VkKCk6IGJvb2xlYW4ge1xuICAgICAgICByZXR1cm4gdGhpcy50cmlnZ2VyLmhhc0F0dHJpYnV0ZSgnYWRkLWNsYXNzLXdoZW4tY2hlY2tlZCcpO1xuICAgIH1cbn1cbiJdLCJzb3VyY2VSb290IjoiIn0=