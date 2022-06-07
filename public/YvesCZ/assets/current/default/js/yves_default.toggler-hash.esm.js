(window["webpackJsonp_yves_default"] = window["webpackJsonp_yves_default"] || []).push([["toggler-hash"],{

/***/ "./vendor/spryker-shop/shop-ui/src/SprykerShop/Yves/ShopUi/Theme/default/components/molecules/toggler-hash/toggler-hash.ts":
/*!*********************************************************************************************************************************!*\
  !*** ./vendor/spryker-shop/shop-ui/src/SprykerShop/Yves/ShopUi/Theme/default/components/molecules/toggler-hash/toggler-hash.ts ***!
  \*********************************************************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return TogglerHash; });
/* harmony import */ var _models_component__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../../models/component */ "./vendor/spryker-shop/shop-ui/src/SprykerShop/Yves/ShopUi/Theme/default/models/component.ts");
function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }


class TogglerHash extends _models_component__WEBPACK_IMPORTED_MODULE_0__["default"] {
  /**
   * Elements targeted by the toggle action.
   */
  constructor() {
    super();
    /* tslint:disable: deprecation */

    _defineProperty(this, "targets", void 0);

    this.targets = Array.from(this.targetClassName ? document.getElementsByClassName(this.targetClassName) : document.querySelectorAll(this.targetSelector));
    /* tslint:enable: deprecation */
  }

  readyCallback() {
    this.checkHash();
    this.mapEvents();
  }

  mapEvents() {
    window.addEventListener('hashchange', event => this.onHashChange(event));
  }

  onHashChange(event) {
    this.checkHash();
  }
  /**
   * Checks the hash and triggers the flexible toggle action.
   */


  checkHash() {
    if (this.triggerHash === this.hash) {
      this.toggle(this.addClassWhenHashInUrl);
      return;
    }

    this.toggle(!this.addClassWhenHashInUrl);
  }
  /**
   * Toggles the class names in the target elements.
   * @param addClass A boolean value for a more flexible toggling action.
   */


  toggle(addClass) {
    this.targets.forEach(target => target.classList.toggle(this.classToToggle, addClass));
  }
  /**
   * Gets the current page url.
   */


  get hash() {
    return window.location.hash;
  }
  /**
   * Gets the trigger hash.
   */


  get triggerHash() {
    return this.getAttribute('trigger-hash');
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
  /**
   * Gets if the element should add the class when in blur.
   */


  get addClassWhenHashInUrl() {
    return this.hasAttribute('add-class-when-hash-in-url');
  }

}

/***/ })

}]);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vLi92ZW5kb3Ivc3ByeWtlci1zaG9wL3Nob3AtdWkvc3JjL1NwcnlrZXJTaG9wL1l2ZXMvU2hvcFVpL1RoZW1lL2RlZmF1bHQvY29tcG9uZW50cy9tb2xlY3VsZXMvdG9nZ2xlci1oYXNoL3RvZ2dsZXItaGFzaC50cyJdLCJuYW1lcyI6WyJUb2dnbGVySGFzaCIsIkNvbXBvbmVudCIsImNvbnN0cnVjdG9yIiwidGFyZ2V0cyIsIkFycmF5IiwiZnJvbSIsInRhcmdldENsYXNzTmFtZSIsImRvY3VtZW50IiwiZ2V0RWxlbWVudHNCeUNsYXNzTmFtZSIsInF1ZXJ5U2VsZWN0b3JBbGwiLCJ0YXJnZXRTZWxlY3RvciIsInJlYWR5Q2FsbGJhY2siLCJjaGVja0hhc2giLCJtYXBFdmVudHMiLCJ3aW5kb3ciLCJhZGRFdmVudExpc3RlbmVyIiwiZXZlbnQiLCJvbkhhc2hDaGFuZ2UiLCJ0cmlnZ2VySGFzaCIsImhhc2giLCJ0b2dnbGUiLCJhZGRDbGFzc1doZW5IYXNoSW5VcmwiLCJhZGRDbGFzcyIsImZvckVhY2giLCJ0YXJnZXQiLCJjbGFzc0xpc3QiLCJjbGFzc1RvVG9nZ2xlIiwibG9jYXRpb24iLCJnZXRBdHRyaWJ1dGUiLCJoYXNBdHRyaWJ1dGUiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7OztBQUFBO0FBRWUsTUFBTUEsV0FBTixTQUEwQkMseURBQTFCLENBQW9DO0FBQy9DOzs7QUFLQUMsYUFBVyxHQUFHO0FBQ1Y7QUFDQTs7QUFGVTs7QUFHVixTQUFLQyxPQUFMLEdBQ0lDLEtBQUssQ0FBQ0MsSUFBTixDQUNJLEtBQUtDLGVBQUwsR0FDTUMsUUFBUSxDQUFDQyxzQkFBVCxDQUFnQyxLQUFLRixlQUFyQyxDQUROLEdBRU1DLFFBQVEsQ0FBQ0UsZ0JBQVQsQ0FBMEIsS0FBS0MsY0FBL0IsQ0FIVixDQURKO0FBT0E7QUFDSDs7QUFFU0MsZUFBVixHQUFnQztBQUM1QixTQUFLQyxTQUFMO0FBQ0EsU0FBS0MsU0FBTDtBQUNIOztBQUVTQSxXQUFWLEdBQTRCO0FBQ3hCQyxVQUFNLENBQUNDLGdCQUFQLENBQXdCLFlBQXhCLEVBQXVDQyxLQUFELElBQWtCLEtBQUtDLFlBQUwsQ0FBa0JELEtBQWxCLENBQXhEO0FBQ0g7O0FBRVNDLGNBQVYsQ0FBdUJELEtBQXZCLEVBQTJDO0FBQ3ZDLFNBQUtKLFNBQUw7QUFDSDtBQUVEOzs7OztBQUdBQSxXQUFTLEdBQVM7QUFDZCxRQUFJLEtBQUtNLFdBQUwsS0FBcUIsS0FBS0MsSUFBOUIsRUFBb0M7QUFDaEMsV0FBS0MsTUFBTCxDQUFZLEtBQUtDLHFCQUFqQjtBQUVBO0FBQ0g7O0FBRUQsU0FBS0QsTUFBTCxDQUFZLENBQUMsS0FBS0MscUJBQWxCO0FBQ0g7QUFFRDs7Ozs7O0FBSUFELFFBQU0sQ0FBQ0UsUUFBRCxFQUEwQjtBQUM1QixTQUFLbkIsT0FBTCxDQUFhb0IsT0FBYixDQUFzQkMsTUFBRCxJQUF5QkEsTUFBTSxDQUFDQyxTQUFQLENBQWlCTCxNQUFqQixDQUF3QixLQUFLTSxhQUE3QixFQUE0Q0osUUFBNUMsQ0FBOUM7QUFDSDtBQUVEOzs7OztBQUdBLE1BQUlILElBQUosR0FBbUI7QUFDZixXQUFPTCxNQUFNLENBQUNhLFFBQVAsQ0FBZ0JSLElBQXZCO0FBQ0g7QUFFRDs7Ozs7QUFHQSxNQUFJRCxXQUFKLEdBQTBCO0FBQ3RCLFdBQU8sS0FBS1UsWUFBTCxDQUFrQixjQUFsQixDQUFQO0FBQ0g7QUFFRDs7Ozs7OztBQUtBLE1BQUlsQixjQUFKLEdBQTZCO0FBQ3pCLFdBQU8sS0FBS2tCLFlBQUwsQ0FBa0IsaUJBQWxCLENBQVA7QUFDSDs7QUFDRCxNQUFjdEIsZUFBZCxHQUF3QztBQUNwQyxXQUFPLEtBQUtzQixZQUFMLENBQWtCLG1CQUFsQixDQUFQO0FBQ0g7QUFFRDs7Ozs7QUFHQSxNQUFJRixhQUFKLEdBQTRCO0FBQ3hCLFdBQU8sS0FBS0UsWUFBTCxDQUFrQixpQkFBbEIsQ0FBUDtBQUNIO0FBRUQ7Ozs7O0FBR0EsTUFBSVAscUJBQUosR0FBcUM7QUFDakMsV0FBTyxLQUFLUSxZQUFMLENBQWtCLDRCQUFsQixDQUFQO0FBQ0g7O0FBM0Y4QyxDIiwiZmlsZSI6Ii4vanMveXZlc19kZWZhdWx0LnRvZ2dsZXItaGFzaC5lc20uanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgQ29tcG9uZW50IGZyb20gJy4uLy4uLy4uL21vZGVscy9jb21wb25lbnQnO1xuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBUb2dnbGVySGFzaCBleHRlbmRzIENvbXBvbmVudCB7XG4gICAgLyoqXG4gICAgICogRWxlbWVudHMgdGFyZ2V0ZWQgYnkgdGhlIHRvZ2dsZSBhY3Rpb24uXG4gICAgICovXG4gICAgcmVhZG9ubHkgdGFyZ2V0czogSFRNTEVsZW1lbnRbXTtcblxuICAgIGNvbnN0cnVjdG9yKCkge1xuICAgICAgICBzdXBlcigpO1xuICAgICAgICAvKiB0c2xpbnQ6ZGlzYWJsZTogZGVwcmVjYXRpb24gKi9cbiAgICAgICAgdGhpcy50YXJnZXRzID0gPEhUTUxFbGVtZW50W10+KFxuICAgICAgICAgICAgQXJyYXkuZnJvbShcbiAgICAgICAgICAgICAgICB0aGlzLnRhcmdldENsYXNzTmFtZVxuICAgICAgICAgICAgICAgICAgICA/IGRvY3VtZW50LmdldEVsZW1lbnRzQnlDbGFzc05hbWUodGhpcy50YXJnZXRDbGFzc05hbWUpXG4gICAgICAgICAgICAgICAgICAgIDogZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbCh0aGlzLnRhcmdldFNlbGVjdG9yKSxcbiAgICAgICAgICAgIClcbiAgICAgICAgKTtcbiAgICAgICAgLyogdHNsaW50OmVuYWJsZTogZGVwcmVjYXRpb24gKi9cbiAgICB9XG5cbiAgICBwcm90ZWN0ZWQgcmVhZHlDYWxsYmFjaygpOiB2b2lkIHtcbiAgICAgICAgdGhpcy5jaGVja0hhc2goKTtcbiAgICAgICAgdGhpcy5tYXBFdmVudHMoKTtcbiAgICB9XG5cbiAgICBwcm90ZWN0ZWQgbWFwRXZlbnRzKCk6IHZvaWQge1xuICAgICAgICB3aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcignaGFzaGNoYW5nZScsIChldmVudDogRXZlbnQpID0+IHRoaXMub25IYXNoQ2hhbmdlKGV2ZW50KSk7XG4gICAgfVxuXG4gICAgcHJvdGVjdGVkIG9uSGFzaENoYW5nZShldmVudDogRXZlbnQpOiB2b2lkIHtcbiAgICAgICAgdGhpcy5jaGVja0hhc2goKTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBDaGVja3MgdGhlIGhhc2ggYW5kIHRyaWdnZXJzIHRoZSBmbGV4aWJsZSB0b2dnbGUgYWN0aW9uLlxuICAgICAqL1xuICAgIGNoZWNrSGFzaCgpOiB2b2lkIHtcbiAgICAgICAgaWYgKHRoaXMudHJpZ2dlckhhc2ggPT09IHRoaXMuaGFzaCkge1xuICAgICAgICAgICAgdGhpcy50b2dnbGUodGhpcy5hZGRDbGFzc1doZW5IYXNoSW5VcmwpO1xuXG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cblxuICAgICAgICB0aGlzLnRvZ2dsZSghdGhpcy5hZGRDbGFzc1doZW5IYXNoSW5VcmwpO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIFRvZ2dsZXMgdGhlIGNsYXNzIG5hbWVzIGluIHRoZSB0YXJnZXQgZWxlbWVudHMuXG4gICAgICogQHBhcmFtIGFkZENsYXNzIEEgYm9vbGVhbiB2YWx1ZSBmb3IgYSBtb3JlIGZsZXhpYmxlIHRvZ2dsaW5nIGFjdGlvbi5cbiAgICAgKi9cbiAgICB0b2dnbGUoYWRkQ2xhc3M6IGJvb2xlYW4pOiB2b2lkIHtcbiAgICAgICAgdGhpcy50YXJnZXRzLmZvckVhY2goKHRhcmdldDogSFRNTEVsZW1lbnQpID0+IHRhcmdldC5jbGFzc0xpc3QudG9nZ2xlKHRoaXMuY2xhc3NUb1RvZ2dsZSwgYWRkQ2xhc3MpKTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBHZXRzIHRoZSBjdXJyZW50IHBhZ2UgdXJsLlxuICAgICAqL1xuICAgIGdldCBoYXNoKCk6IHN0cmluZyB7XG4gICAgICAgIHJldHVybiB3aW5kb3cubG9jYXRpb24uaGFzaDtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBHZXRzIHRoZSB0cmlnZ2VyIGhhc2guXG4gICAgICovXG4gICAgZ2V0IHRyaWdnZXJIYXNoKCk6IHN0cmluZyB7XG4gICAgICAgIHJldHVybiB0aGlzLmdldEF0dHJpYnV0ZSgndHJpZ2dlci1oYXNoJyk7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogR2V0cyBhIHF1ZXJ5U2VsZWN0b3Igb2YgdGhlIHRhcmdldCBlbGVtZW50LlxuICAgICAqXG4gICAgICogQGRlcHJlY2F0ZWQgVXNlIHRhcmdldENsYXNzTmFtZSgpIGluc3RlYWQuXG4gICAgICovXG4gICAgZ2V0IHRhcmdldFNlbGVjdG9yKCk6IHN0cmluZyB7XG4gICAgICAgIHJldHVybiB0aGlzLmdldEF0dHJpYnV0ZSgndGFyZ2V0LXNlbGVjdG9yJyk7XG4gICAgfVxuICAgIHByb3RlY3RlZCBnZXQgdGFyZ2V0Q2xhc3NOYW1lKCk6IHN0cmluZyB7XG4gICAgICAgIHJldHVybiB0aGlzLmdldEF0dHJpYnV0ZSgndGFyZ2V0LWNsYXNzLW5hbWUnKTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBHZXRzIGEgY2xhc3MgbmFtZSBmb3IgdGhlIHRvZ2dsZSBhY3Rpb24uXG4gICAgICovXG4gICAgZ2V0IGNsYXNzVG9Ub2dnbGUoKTogc3RyaW5nIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuZ2V0QXR0cmlidXRlKCdjbGFzcy10by10b2dnbGUnKTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBHZXRzIGlmIHRoZSBlbGVtZW50IHNob3VsZCBhZGQgdGhlIGNsYXNzIHdoZW4gaW4gYmx1ci5cbiAgICAgKi9cbiAgICBnZXQgYWRkQ2xhc3NXaGVuSGFzaEluVXJsKCk6IGJvb2xlYW4ge1xuICAgICAgICByZXR1cm4gdGhpcy5oYXNBdHRyaWJ1dGUoJ2FkZC1jbGFzcy13aGVuLWhhc2gtaW4tdXJsJyk7XG4gICAgfVxufVxuIl0sInNvdXJjZVJvb3QiOiIifQ==