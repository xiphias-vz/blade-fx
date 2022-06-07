(window["webpackJsonp_yves_default"] = window["webpackJsonp_yves_default"] || []).push([["clipboard-copy"],{

/***/ "./vendor/spryker-shop/shop-ui/src/SprykerShop/Yves/ShopUi/Theme/default/components/molecules/clipboard-copy/clipboard-copy.ts":
/*!*************************************************************************************************************************************!*\
  !*** ./vendor/spryker-shop/shop-ui/src/SprykerShop/Yves/ShopUi/Theme/default/components/molecules/clipboard-copy/clipboard-copy.ts ***!
  \*************************************************************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return ClipboardCopy; });
/* harmony import */ var ShopUi_models_component__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ShopUi/models/component */ "./vendor/spryker-shop/shop-ui/src/SprykerShop/Yves/ShopUi/Theme/default/models/component.ts");
function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }


var EVENT_COPY = 'copyToClipboard';
/**
 * @event copyToClipboard An event emitted when the component performs a copy.
 */

class ClipboardCopy extends ShopUi_models_component__WEBPACK_IMPORTED_MODULE_0__["default"] {
  constructor() {
    super(...arguments);

    _defineProperty(this, "target", void 0);

    _defineProperty(this, "trigger", void 0);

    _defineProperty(this, "successCopyMessage", void 0);

    _defineProperty(this, "errorCopyMessage", void 0);

    _defineProperty(this, "durationTimeoutId", void 0);

    _defineProperty(this, "defaultDuration", 5000);
  }

  readyCallback() {
    /* tslint:disable: deprecation */
    this.trigger = this.triggerClassName ? document.getElementsByClassName(this.triggerClassName)[0] : document.querySelector(this.triggerSelector);
    this.target = this.targetClassName ? document.getElementsByClassName(this.targetClassName)[0] : document.querySelector(this.targetSelector);
    /* tslint:enable: deprecation */

    this.successCopyMessage = this.getElementsByClassName(this.jsName + "__success-message")[0];
    this.errorCopyMessage = this.getElementsByClassName(this.jsName + "__error-message")[0];
    this.mapEvents();
  }

  mapEvents() {
    this.trigger.addEventListener('click', event => this.onClick(event));
  }

  onClick(event) {
    this.copyToClipboard();
  }
  /**
   * Performs the copy to the clipboard and tells the component to show the message.
   */


  copyToClipboard() {
    if (!this.isCopyCommandSupported) {
      this.showMessage(this.errorCopyMessage, this.defaultDuration);
      return;
    }

    this.target.select();
    document.execCommand('copy');
    this.showMessage(this.successCopyMessage, this.defaultDuration);
    this.dispatchCustomEvent(EVENT_COPY);
  }
  /**
   * Shows the message during the time set.
   * @param message A HTMLElement which contains the text message.
   * @param duration A number value which defines the period of time for which the message is shown.
   */


  showMessage(message, duration) {
    message.classList.remove(this.hideClassName);
    this.durationTimeoutId = window.setTimeout(() => this.hideMessage(message), duration);
  }
  /**
   * Hides the message.
   * @param message A HTMLElement which contains the text message.
   */


  hideMessage(message) {
    clearTimeout(this.durationTimeoutId);
    message.classList.add(this.hideClassName);
  }
  /**
   * Gets a css query selector to address the html element that will trigger the copy to clipboard.
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
   * Gets a css query selector to address the html element containing the text to copy.
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
   * Gets if a browser supports the automatically copy to clipboard feature.
   */


  get isCopyCommandSupported() {
    return document.queryCommandSupported('copy');
  }
  /**
   * Gets a css class name for toggling an element.
   */


  get hideClassName() {
    return this.getAttribute('class-to-toggle');
  }

}

/***/ })

}]);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vLi92ZW5kb3Ivc3ByeWtlci1zaG9wL3Nob3AtdWkvc3JjL1NwcnlrZXJTaG9wL1l2ZXMvU2hvcFVpL1RoZW1lL2RlZmF1bHQvY29tcG9uZW50cy9tb2xlY3VsZXMvY2xpcGJvYXJkLWNvcHkvY2xpcGJvYXJkLWNvcHkudHMiXSwibmFtZXMiOlsiRVZFTlRfQ09QWSIsIkNsaXBib2FyZENvcHkiLCJDb21wb25lbnQiLCJyZWFkeUNhbGxiYWNrIiwidHJpZ2dlciIsInRyaWdnZXJDbGFzc05hbWUiLCJkb2N1bWVudCIsImdldEVsZW1lbnRzQnlDbGFzc05hbWUiLCJxdWVyeVNlbGVjdG9yIiwidHJpZ2dlclNlbGVjdG9yIiwidGFyZ2V0IiwidGFyZ2V0Q2xhc3NOYW1lIiwidGFyZ2V0U2VsZWN0b3IiLCJzdWNjZXNzQ29weU1lc3NhZ2UiLCJqc05hbWUiLCJlcnJvckNvcHlNZXNzYWdlIiwibWFwRXZlbnRzIiwiYWRkRXZlbnRMaXN0ZW5lciIsImV2ZW50Iiwib25DbGljayIsImNvcHlUb0NsaXBib2FyZCIsImlzQ29weUNvbW1hbmRTdXBwb3J0ZWQiLCJzaG93TWVzc2FnZSIsImRlZmF1bHREdXJhdGlvbiIsInNlbGVjdCIsImV4ZWNDb21tYW5kIiwiZGlzcGF0Y2hDdXN0b21FdmVudCIsIm1lc3NhZ2UiLCJkdXJhdGlvbiIsImNsYXNzTGlzdCIsInJlbW92ZSIsImhpZGVDbGFzc05hbWUiLCJkdXJhdGlvblRpbWVvdXRJZCIsIndpbmRvdyIsInNldFRpbWVvdXQiLCJoaWRlTWVzc2FnZSIsImNsZWFyVGltZW91dCIsImFkZCIsImdldEF0dHJpYnV0ZSIsInF1ZXJ5Q29tbWFuZFN1cHBvcnRlZCJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7O0FBQUE7QUFFQSxJQUFNQSxVQUFVLEdBQUcsaUJBQW5CO0FBRUE7Ozs7QUFHZSxNQUFNQyxhQUFOLFNBQTRCQywrREFBNUIsQ0FBc0M7QUFBQTtBQUFBOztBQUFBOztBQUFBOztBQUFBOztB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LmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IENvbXBvbmVudCBmcm9tICdTaG9wVWkvbW9kZWxzL2NvbXBvbmVudCc7XG5cbmNvbnN0IEVWRU5UX0NPUFkgPSAnY29weVRvQ2xpcGJvYXJkJztcblxuLyoqXG4gKiBAZXZlbnQgY29weVRvQ2xpcGJvYXJkIEFuIGV2ZW50IGVtaXR0ZWQgd2hlbiB0aGUgY29tcG9uZW50IHBlcmZvcm1zIGEgY29weS5cbiAqL1xuZXhwb3J0IGRlZmF1bHQgY2xhc3MgQ2xpcGJvYXJkQ29weSBleHRlbmRzIENvbXBvbmVudCB7XG4gICAgcHJvdGVjdGVkIHRhcmdldDogSFRNTElucHV0RWxlbWVudCB8IEhUTUxUZXh0QXJlYUVsZW1lbnQ7XG4gICAgcHJvdGVjdGVkIHRyaWdnZXI6IEhUTUxCdXR0b25FbGVtZW50O1xuICAgIHByb3RlY3RlZCBzdWNjZXNzQ29weU1lc3NhZ2U6IEhUTUxFbGVtZW50O1xuICAgIHByb3RlY3RlZCBlcnJvckNvcHlNZXNzYWdlOiBIVE1MRWxlbWVudDtcbiAgICBwcm90ZWN0ZWQgZHVyYXRpb25UaW1lb3V0SWQ6IG51bWJlcjtcblxuICAgIC8qKlxuICAgICAqIERlZmF1bHQgbWVzc2FnZSBzaG93IGR1cmF0aW9uLlxuICAgICAqL1xuICAgIHJlYWRvbmx5IGRlZmF1bHREdXJhdGlvbjogbnVtYmVyID0gNTAwMDtcblxuICAgIHByb3RlY3RlZCByZWFkeUNhbGxiYWNrKCk6IHZvaWQge1xuICAgICAgICAvKiB0c2xpbnQ6ZGlzYWJsZTogZGVwcmVjYXRpb24gKi9cbiAgICAgICAgdGhpcy50cmlnZ2VyID0gPEhUTUxCdXR0b25FbGVtZW50PihcbiAgICAgICAgICAgICh0aGlzLnRyaWdnZXJDbGFzc05hbWVcbiAgICAgICAgICAgICAgICA/IGRvY3VtZW50LmdldEVsZW1lbnRzQnlDbGFzc05hbWUodGhpcy50cmlnZ2VyQ2xhc3NOYW1lKVswXVxuICAgICAgICAgICAgICAgIDogZG9jdW1lbnQucXVlcnlTZWxlY3Rvcih0aGlzLnRyaWdnZXJTZWxlY3RvcikpXG4gICAgICAgICk7XG4gICAgICAgIHRoaXMudGFyZ2V0ID0gPEhUTUxJbnB1dEVsZW1lbnQgfCBIVE1MVGV4dEFyZWFFbGVtZW50PihcbiAgICAgICAgICAgICh0aGlzLnRhcmdldENsYXNzTmFtZVxuICAgICAgICAgICAgICAgID8gZG9jdW1lbnQuZ2V0RWxlbWVudHNCeUNsYXNzTmFtZSh0aGlzLnRhcmdldENsYXNzTmFtZSlbMF1cbiAgICAgICAgICAgICAgICA6IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IodGhpcy50YXJnZXRTZWxlY3RvcikpXG4gICAgICAgICk7XG4gICAgICAgIC8qIHRzbGludDplbmFibGU6IGRlcHJlY2F0aW9uICovXG4gICAgICAgIHRoaXMuc3VjY2Vzc0NvcHlNZXNzYWdlID0gPEhUTUxFbGVtZW50PnRoaXMuZ2V0RWxlbWVudHNCeUNsYXNzTmFtZShgJHt0aGlzLmpzTmFtZX1fX3N1Y2Nlc3MtbWVzc2FnZWApWzBdO1xuICAgICAgICB0aGlzLmVycm9yQ29weU1lc3NhZ2UgPSA8SFRNTEVsZW1lbnQ+dGhpcy5nZXRFbGVtZW50c0J5Q2xhc3NOYW1lKGAke3RoaXMuanNOYW1lfV9fZXJyb3ItbWVzc2FnZWApWzBdO1xuICAgICAgICB0aGlzLm1hcEV2ZW50cygpO1xuICAgIH1cblxuICAgIHByb3RlY3RlZCBtYXBFdmVudHMoKTogdm9pZCB7XG4gICAgICAgIHRoaXMudHJpZ2dlci5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIChldmVudDogRXZlbnQpID0+IHRoaXMub25DbGljayhldmVudCkpO1xuICAgIH1cblxuICAgIHByb3RlY3RlZCBvbkNsaWNrKGV2ZW50OiBFdmVudCk6IHZvaWQge1xuICAgICAgICB0aGlzLmNvcHlUb0NsaXBib2FyZCgpO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIFBlcmZvcm1zIHRoZSBjb3B5IHRvIHRoZSBjbGlwYm9hcmQgYW5kIHRlbGxzIHRoZSBjb21wb25lbnQgdG8gc2hvdyB0aGUgbWVzc2FnZS5cbiAgICAgKi9cbiAgICBjb3B5VG9DbGlwYm9hcmQoKTogdm9pZCB7XG4gICAgICAgIGlmICghdGhpcy5pc0NvcHlDb21tYW5kU3VwcG9ydGVkKSB7XG4gICAgICAgICAgICB0aGlzLnNob3dNZXNzYWdlKHRoaXMuZXJyb3JDb3B5TWVzc2FnZSwgdGhpcy5kZWZhdWx0RHVyYXRpb24pO1xuXG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cblxuICAgICAgICB0aGlzLnRhcmdldC5zZWxlY3QoKTtcbiAgICAgICAgZG9jdW1lbnQuZXhlY0NvbW1hbmQoJ2NvcHknKTtcbiAgICAgICAgdGhpcy5zaG93TWVzc2FnZSh0aGlzLnN1Y2Nlc3NDb3B5TWVzc2FnZSwgdGhpcy5kZWZhdWx0RHVyYXRpb24pO1xuICAgICAgICB0aGlzLmRpc3BhdGNoQ3VzdG9tRXZlbnQoRVZFTlRfQ09QWSk7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogU2hvd3MgdGhlIG1lc3NhZ2UgZHVyaW5nIHRoZSB0aW1lIHNldC5cbiAgICAgKiBAcGFyYW0gbWVzc2FnZSBBIEhUTUxFbGVtZW50IHdoaWNoIGNvbnRhaW5zIHRoZSB0ZXh0IG1lc3NhZ2UuXG4gICAgICogQHBhcmFtIGR1cmF0aW9uIEEgbnVtYmVyIHZhbHVlIHdoaWNoIGRlZmluZXMgdGhlIHBlcmlvZCBvZiB0aW1lIGZvciB3aGljaCB0aGUgbWVzc2FnZSBpcyBzaG93bi5cbiAgICAgKi9cbiAgICBzaG93TWVzc2FnZShtZXNzYWdlOiBIVE1MRWxlbWVudCwgZHVyYXRpb246IG51bWJlcik6IHZvaWQge1xuICAgICAgICBtZXNzYWdlLmNsYXNzTGlzdC5yZW1vdmUodGhpcy5oaWRlQ2xhc3NOYW1lKTtcbiAgICAgICAgdGhpcy5kdXJhdGlvblRpbWVvdXRJZCA9IHdpbmRvdy5zZXRUaW1lb3V0KCgpID0+IHRoaXMuaGlkZU1lc3NhZ2UobWVzc2FnZSksIGR1cmF0aW9uKTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBIaWRlcyB0aGUgbWVzc2FnZS5cbiAgICAgKiBAcGFyYW0gbWVzc2FnZSBBIEhUTUxFbGVtZW50IHdoaWNoIGNvbnRhaW5zIHRoZSB0ZXh0IG1lc3NhZ2UuXG4gICAgICovXG4gICAgaGlkZU1lc3NhZ2UobWVzc2FnZTogSFRNTEVsZW1lbnQpOiB2b2lkIHtcbiAgICAgICAgY2xlYXJUaW1lb3V0KHRoaXMuZHVyYXRpb25UaW1lb3V0SWQpO1xuICAgICAgICBtZXNzYWdlLmNsYXNzTGlzdC5hZGQodGhpcy5oaWRlQ2xhc3NOYW1lKTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBHZXRzIGEgY3NzIHF1ZXJ5IHNlbGVjdG9yIHRvIGFkZHJlc3MgdGhlIGh0bWwgZWxlbWVudCB0aGF0IHdpbGwgdHJpZ2dlciB0aGUgY29weSB0byBjbGlwYm9hcmQuXG4gICAgICpcbiAgICAgKiBAZGVwcmVjYXRlZCBVc2UgdHJpZ2dlckNsYXNzTmFtZSgpIGluc3RlYWQuXG4gICAgICovXG4gICAgZ2V0IHRyaWdnZXJTZWxlY3RvcigpOiBzdHJpbmcge1xuICAgICAgICByZXR1cm4gdGhpcy5nZXRBdHRyaWJ1dGUoJ3RyaWdnZXItc2VsZWN0b3InKTtcbiAgICB9XG4gICAgcHJvdGVjdGVkIGdldCB0cmlnZ2VyQ2xhc3NOYW1lKCk6IHN0cmluZyB7XG4gICAgICAgIHJldHVybiB0aGlzLmdldEF0dHJpYnV0ZSgndHJpZ2dlci1jbGFzcy1uYW1lJyk7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogR2V0cyBhIGNzcyBxdWVyeSBzZWxlY3RvciB0byBhZGRyZXNzIHRoZSBodG1sIGVsZW1lbnQgY29udGFpbmluZyB0aGUgdGV4dCB0byBjb3B5LlxuICAgICAqXG4gICAgICogQGRlcHJlY2F0ZWQgVXNlIHRhcmdldENsYXNzTmFtZSgpIGluc3RlYWQuXG4gICAgICovXG4gICAgZ2V0IHRhcmdldFNlbGVjdG9yKCk6IHN0cmluZyB7XG4gICAgICAgIHJldHVybiB0aGlzLmdldEF0dHJpYnV0ZSgndGFyZ2V0LXNlbGVjdG9yJyk7XG4gICAgfVxuICAgIHByb3RlY3RlZCBnZXQgdGFyZ2V0Q2xhc3NOYW1lKCk6IHN0cmluZyB7XG4gICAgICAgIHJldHVybiB0aGlzLmdldEF0dHJpYnV0ZSgndGFyZ2V0LWNsYXNzLW5hbWUnKTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBHZXRzIGlmIGEgYnJvd3NlciBzdXBwb3J0cyB0aGUgYXV0b21hdGljYWxseSBjb3B5IHRvIGNsaXBib2FyZCBmZWF0dXJlLlxuICAgICAqL1xuICAgIGdldCBpc0NvcHlDb21tYW5kU3VwcG9ydGVkKCk6IGJvb2xlYW4ge1xuICAgICAgICByZXR1cm4gZG9jdW1lbnQucXVlcnlDb21tYW5kU3VwcG9ydGVkKCdjb3B5Jyk7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogR2V0cyBhIGNzcyBjbGFzcyBuYW1lIGZvciB0b2dnbGluZyBhbiBlbGVtZW50LlxuICAgICAqL1xuICAgIGdldCBoaWRlQ2xhc3NOYW1lKCk6IHN0cmluZyB7XG4gICAgICAgIHJldHVybiB0aGlzLmdldEF0dHJpYnV0ZSgnY2xhc3MtdG8tdG9nZ2xlJyk7XG4gICAgfVxufVxuIl0sInNvdXJjZVJvb3QiOiIifQ==