(window["webpackJsonp_yves_default"] = window["webpackJsonp_yves_default"] || []).push([["script-loader"],{

/***/ "./vendor/spryker-shop/shop-ui/src/SprykerShop/Yves/ShopUi/Theme/default/components/molecules/script-loader/script-loader.ts":
/*!***********************************************************************************************************************************!*\
  !*** ./vendor/spryker-shop/shop-ui/src/SprykerShop/Yves/ShopUi/Theme/default/components/molecules/script-loader/script-loader.ts ***!
  \***********************************************************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return ScriptLoader; });
/* harmony import */ var _models_component__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../../models/component */ "./vendor/spryker-shop/shop-ui/src/SprykerShop/Yves/ShopUi/Theme/default/models/component.ts");
/* harmony import */ var _app_logger__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../../app/logger */ "./vendor/spryker-shop/shop-ui/src/SprykerShop/Yves/ShopUi/Theme/default/app/logger.ts");
function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }



var EVENT_SCRIPT_LOAD = 'scriptload';
var defaultIgnoredAttributes = ['class', 'data-qa'];
/**
 * @event scriptload An event which is triggered when a script is loaded.
 */

class ScriptLoader extends _models_component__WEBPACK_IMPORTED_MODULE_0__["default"] {
  constructor() {
    super(...arguments);

    _defineProperty(this, "head", void 0);

    _defineProperty(this, "script", void 0);
  }

  readyCallback() {
    this.script = document.querySelector("script[src=\"" + this.src + "\"]");

    if (!!this.script) {
      this.mapEvents();
      Object(_app_logger__WEBPACK_IMPORTED_MODULE_1__["debug"])(this.name + ": \"" + this.src + "\" is already in the DOM");
      return;
    }

    this.head = document.getElementsByTagName('head')[0];
    this.script = document.createElement('script');
    this.mapEvents();
    this.setScriptAttributes();
    this.appendScriptTag();
  }

  mapEvents() {
    this.script.addEventListener('load', event => this.onScriptLoad(event), {
      once: true
    });
  }

  onScriptLoad(event) {
    this.dispatchCustomEvent(EVENT_SCRIPT_LOAD);
  }

  setScriptAttributes() {
    Array.prototype.forEach.call(this.attributes, attribute => {
      if (!this.isAttributeIgnored(attribute.name)) {
        this.script.setAttribute(attribute.name, attribute.value);
      }
    });
  }

  appendScriptTag() {
    this.head.appendChild(this.script);
    Object(_app_logger__WEBPACK_IMPORTED_MODULE_1__["debug"])(this.name + ": \"" + this.src + "\" added to the DOM");
  }

  isAttributeIgnored(attributeName) {
    return this.ignoredAttributes.indexOf(attributeName) !== -1;
  }
  /**
   * Gets the array of ignored attributes that are not copied from the current component
   * to the script tag when created.
   */


  get ignoredAttributes() {
    return [...defaultIgnoredAttributes];
  }
  /**
   * Gets if the script already exists in DOM.
   */


  get isScriptAlreadyInDOM() {
    return !!document.querySelector("script[src=\"" + this.src + "\"]");
  }
  /**
   * Gets the url endpoint used to load the script.
   */


  get src() {
    return this.getAttribute('src');
  }

}

/***/ })

}]);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vLi92ZW5kb3Ivc3ByeWtlci1zaG9wL3Nob3AtdWkvc3JjL1NwcnlrZXJTaG9wL1l2ZXMvU2hvcFVpL1RoZW1lL2RlZmF1bHQvY29tcG9uZW50cy9tb2xlY3VsZXMvc2NyaXB0LWxvYWRlci9zY3JpcHQtbG9hZGVyLnRzIl0sIm5hbWVzIjpbIkVWRU5UX1NDUklQVF9MT0FEIiwiZGVmYXVsdElnbm9yZWRBdHRyaWJ1dGVzIiwiU2NyaXB0TG9hZGVyIiwiQ29tcG9uZW50IiwicmVhZHlDYWxsYmFjayIsInNjcmlwdCIsImRvY3VtZW50IiwicXVlcnlTZWxlY3RvciIsInNyYyIsIm1hcEV2ZW50cyIsImRlYnVnIiwibmFtZSIsImhlYWQiLCJnZXRFbGVtZW50c0J5VGFnTmFtZSIsImNyZWF0ZUVsZW1lbnQiLCJzZXRTY3JpcHRBdHRyaWJ1dGVzIiwiYXBwZW5kU2NyaXB0VGFnIiwiYWRkRXZlbnRMaXN0ZW5lciIsImV2ZW50Iiwib25TY3JpcHRMb2FkIiwib25jZSIsImRpc3BhdGNoQ3VzdG9tRXZlbnQiLCJBcnJheSIsInByb3RvdHlwZSIsImZvckVhY2giLCJjYWxsIiwiYXR0cmlidXRlcyIsImF0dHJpYnV0ZSIsImlzQXR0cmlidXRlSWdub3JlZCIsInNldEF0dHJpYnV0ZSIsInZhbHVlIiwiYXBwZW5kQ2hpbGQiLCJhdHRyaWJ1dGVOYW1lIiwiaWdub3JlZEF0dHJpYnV0ZXMiLCJpbmRleE9mIiwiaXNTY3JpcHRBbHJlYWR5SW5ET00iLCJnZXRBdHRyaWJ1dGUiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQTtBQUNBO0FBRUEsSUFBTUEsaUJBQWlCLEdBQUcsWUFBMUI7QUFDQSxJQUFNQyx3QkFBd0IsR0FBRyxDQUFDLE9BQUQsRUFBVSxTQUFWLENBQWpDO0FBRUE7Ozs7QUFHZSxNQUFNQyxZQUFOLFNBQTJCQyx5REFBM0IsQ0FBcUM7QUFBQTtBQUFBOztBQUFBOztBQUFBO0FBQUE7O0FBV3RDQyxlQUFWLEdBQWdDO0FBQzVCLFNBQUtDLE1BQUwsR0FBaUNDLFFBQVEsQ0FBQ0MsYUFBVCxtQkFBc0MsS0FBS0MsR0FBM0MsU0FBakM7O0FBRUEsUUFBSSxDQUFDLENBQUMsS0FBS0gsTUFBWCxFQUFtQjtBQUNmLFdBQUtJLFNBQUw7QUFDQUMsK0RBQUssQ0FBSSxLQUFLQyxJQUFULFlBQW1CLEtBQUtILEdBQXhCLDhCQUFMO0FBRUE7QUFDSDs7QUFFRCxTQUFLSSxJQUFMLEdBQTZCTixRQUFRLENBQUNPLG9CQUFULENBQThCLE1BQTlCLEVBQXNDLENBQXRDLENBQTdCO0FBQ0EsU0FBS1IsTUFBTCxHQUFpQ0MsUUFBUSxDQUFDUSxhQUFULENBQXVCLFFBQXZCLENBQWpDO0FBRUEsU0FBS0wsU0FBTDtBQUNBLFNBQUtNLG1CQUFMO0FBQ0EsU0FBS0MsZUFBTDtBQUNIOztBQUVTUCxXQUFWLEdBQTRCO0FBQ3hCLFNBQUtKLE1BQUwsQ0FBWVksZ0JBQVosQ0FBNkIsTUFBN0IsRUFBc0NDLEtBQUQsSUFBa0IsS0FBS0MsWUFBTCxDQUFrQkQsS0FBbEIsQ0FBdkQsRUFBaUY7QUFBRUUsVUFBSSxFQUFFO0FBQVIsS0FBakY7QUFDSDs7QUFFU0QsY0FBVixDQUF1QkQsS0FBdkIsRUFBMkM7QUFDdkMsU0FBS0csbUJBQUwsQ0FBeUJyQixpQkFBekI7QUFDSDs7QUFFU2UscUJBQVYsR0FBc0M7QUFDbENPLFNBQUssQ0FBQ0MsU0FBTixDQUFnQkMsT0FBaEIsQ0FBd0JDLElBQXhCLENBQTZCLEtBQUtDLFVBQWxDLEVBQStDQyxTQUFELElBQXFCO0FBQy9ELFVBQUksQ0FBQyxLQUFLQyxrQkFBTCxDQUF3QkQsU0FBUyxDQUFDaEIsSUFBbEMsQ0FBTCxFQUE4QztBQUMxQyxhQUFLTixNQUFMLENBQVl3QixZQUFaLENBQXlCRixTQUFTLENBQUNoQixJQUFuQyxFQUF5Q2dCLFNBQVMsQ0FBQ0csS0FBbkQ7QUFDSDtBQUNKLEtBSkQ7QUFLSDs7QUFFU2QsaUJBQVYsR0FBa0M7QUFDOUIsU0FBS0osSUFBTCxDQUFVbUIsV0FBVixDQUFzQixLQUFLMUIsTUFBM0I7QUFDQUssNkRBQUssQ0FBSSxLQUFLQyxJQUFULFlBQW1CLEtBQUtILEdBQXhCLHlCQUFMO0FBQ0g7O0FBRVNvQixvQkFBVixDQUE2QkksYUFBN0IsRUFBNkQ7QUFDekQsV0FBTyxLQUFLQyxpQkFBTCxDQUF1QkMsT0FBdkIsQ0FBK0JGLGFBQS9CLE1BQWtELENBQUMsQ0FBMUQ7QUFDSDtBQUVEOzs7Ozs7QUFJQSxNQUFJQyxpQkFBSixHQUFrQztBQUM5QixXQUFPLENBQUMsR0FBR2hDLHdCQUFKLENBQVA7QUFDSDtBQUVEOzs7OztBQUdBLE1BQUlrQyxvQkFBSixHQUFvQztBQUNoQyxXQUFPLENBQUMsQ0FBQzdCLFFBQVEsQ0FBQ0MsYUFBVCxtQkFBc0MsS0FBS0MsR0FBM0MsU0FBVDtBQUNIO0FBRUQ7Ozs7O0FBR0EsTUFBSUEsR0FBSixHQUFrQjtBQUNkLFdBQU8sS0FBSzRCLFlBQUwsQ0FBa0IsS0FBbEIsQ0FBUDtBQUNIOztBQTFFK0MsQyIsImZpbGUiOiIuL2pzL3l2ZXNfZGVmYXVsdC5zY3JpcHQtbG9hZGVyLmVzbS5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBDb21wb25lbnQgZnJvbSAnLi4vLi4vLi4vbW9kZWxzL2NvbXBvbmVudCc7XG5pbXBvcnQgeyBkZWJ1ZyB9IGZyb20gJy4uLy4uLy4uL2FwcC9sb2dnZXInO1xuXG5jb25zdCBFVkVOVF9TQ1JJUFRfTE9BRCA9ICdzY3JpcHRsb2FkJztcbmNvbnN0IGRlZmF1bHRJZ25vcmVkQXR0cmlidXRlcyA9IFsnY2xhc3MnLCAnZGF0YS1xYSddO1xuXG4vKipcbiAqIEBldmVudCBzY3JpcHRsb2FkIEFuIGV2ZW50IHdoaWNoIGlzIHRyaWdnZXJlZCB3aGVuIGEgc2NyaXB0IGlzIGxvYWRlZC5cbiAqL1xuZXhwb3J0IGRlZmF1bHQgY2xhc3MgU2NyaXB0TG9hZGVyIGV4dGVuZHMgQ29tcG9uZW50IHtcbiAgICAvKipcbiAgICAgKiBUaGUgPGhlYWQ+IHRhZyBvbiB0aGUgcGFnZS5cbiAgICAgKi9cbiAgICBoZWFkOiBIVE1MSGVhZEVsZW1lbnQ7XG5cbiAgICAvKipcbiAgICAgKiBUaGUgPHNjcmlwdD4gdGFnIG8gdGhlIHBhZ2UuXG4gICAgICovXG4gICAgc2NyaXB0OiBIVE1MU2NyaXB0RWxlbWVudDtcblxuICAgIHByb3RlY3RlZCByZWFkeUNhbGxiYWNrKCk6IHZvaWQge1xuICAgICAgICB0aGlzLnNjcmlwdCA9IDxIVE1MU2NyaXB0RWxlbWVudD5kb2N1bWVudC5xdWVyeVNlbGVjdG9yKGBzY3JpcHRbc3JjPVwiJHt0aGlzLnNyY31cIl1gKTtcblxuICAgICAgICBpZiAoISF0aGlzLnNjcmlwdCkge1xuICAgICAgICAgICAgdGhpcy5tYXBFdmVudHMoKTtcbiAgICAgICAgICAgIGRlYnVnKGAke3RoaXMubmFtZX06IFwiJHt0aGlzLnNyY31cIiBpcyBhbHJlYWR5IGluIHRoZSBET01gKTtcblxuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG5cbiAgICAgICAgdGhpcy5oZWFkID0gPEhUTUxIZWFkRWxlbWVudD5kb2N1bWVudC5nZXRFbGVtZW50c0J5VGFnTmFtZSgnaGVhZCcpWzBdO1xuICAgICAgICB0aGlzLnNjcmlwdCA9IDxIVE1MU2NyaXB0RWxlbWVudD5kb2N1bWVudC5jcmVhdGVFbGVtZW50KCdzY3JpcHQnKTtcblxuICAgICAgICB0aGlzLm1hcEV2ZW50cygpO1xuICAgICAgICB0aGlzLnNldFNjcmlwdEF0dHJpYnV0ZXMoKTtcbiAgICAgICAgdGhpcy5hcHBlbmRTY3JpcHRUYWcoKTtcbiAgICB9XG5cbiAgICBwcm90ZWN0ZWQgbWFwRXZlbnRzKCk6IHZvaWQge1xuICAgICAgICB0aGlzLnNjcmlwdC5hZGRFdmVudExpc3RlbmVyKCdsb2FkJywgKGV2ZW50OiBFdmVudCkgPT4gdGhpcy5vblNjcmlwdExvYWQoZXZlbnQpLCB7IG9uY2U6IHRydWUgfSk7XG4gICAgfVxuXG4gICAgcHJvdGVjdGVkIG9uU2NyaXB0TG9hZChldmVudDogRXZlbnQpOiB2b2lkIHtcbiAgICAgICAgdGhpcy5kaXNwYXRjaEN1c3RvbUV2ZW50KEVWRU5UX1NDUklQVF9MT0FEKTtcbiAgICB9XG5cbiAgICBwcm90ZWN0ZWQgc2V0U2NyaXB0QXR0cmlidXRlcygpOiB2b2lkIHtcbiAgICAgICAgQXJyYXkucHJvdG90eXBlLmZvckVhY2guY2FsbCh0aGlzLmF0dHJpYnV0ZXMsIChhdHRyaWJ1dGU6IEF0dHIpID0+IHtcbiAgICAgICAgICAgIGlmICghdGhpcy5pc0F0dHJpYnV0ZUlnbm9yZWQoYXR0cmlidXRlLm5hbWUpKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5zY3JpcHQuc2V0QXR0cmlidXRlKGF0dHJpYnV0ZS5uYW1lLCBhdHRyaWJ1dGUudmFsdWUpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcbiAgICB9XG5cbiAgICBwcm90ZWN0ZWQgYXBwZW5kU2NyaXB0VGFnKCk6IHZvaWQge1xuICAgICAgICB0aGlzLmhlYWQuYXBwZW5kQ2hpbGQodGhpcy5zY3JpcHQpO1xuICAgICAgICBkZWJ1ZyhgJHt0aGlzLm5hbWV9OiBcIiR7dGhpcy5zcmN9XCIgYWRkZWQgdG8gdGhlIERPTWApO1xuICAgIH1cblxuICAgIHByb3RlY3RlZCBpc0F0dHJpYnV0ZUlnbm9yZWQoYXR0cmlidXRlTmFtZTogc3RyaW5nKTogYm9vbGVhbiB7XG4gICAgICAgIHJldHVybiB0aGlzLmlnbm9yZWRBdHRyaWJ1dGVzLmluZGV4T2YoYXR0cmlidXRlTmFtZSkgIT09IC0xO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIEdldHMgdGhlIGFycmF5IG9mIGlnbm9yZWQgYXR0cmlidXRlcyB0aGF0IGFyZSBub3QgY29waWVkIGZyb20gdGhlIGN1cnJlbnQgY29tcG9uZW50XG4gICAgICogdG8gdGhlIHNjcmlwdCB0YWcgd2hlbiBjcmVhdGVkLlxuICAgICAqL1xuICAgIGdldCBpZ25vcmVkQXR0cmlidXRlcygpOiBzdHJpbmdbXSB7XG4gICAgICAgIHJldHVybiBbLi4uZGVmYXVsdElnbm9yZWRBdHRyaWJ1dGVzXTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBHZXRzIGlmIHRoZSBzY3JpcHQgYWxyZWFkeSBleGlzdHMgaW4gRE9NLlxuICAgICAqL1xuICAgIGdldCBpc1NjcmlwdEFscmVhZHlJbkRPTSgpOiBib29sZWFuIHtcbiAgICAgICAgcmV0dXJuICEhZG9jdW1lbnQucXVlcnlTZWxlY3Rvcihgc2NyaXB0W3NyYz1cIiR7dGhpcy5zcmN9XCJdYCk7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogR2V0cyB0aGUgdXJsIGVuZHBvaW50IHVzZWQgdG8gbG9hZCB0aGUgc2NyaXB0LlxuICAgICAqL1xuICAgIGdldCBzcmMoKTogc3RyaW5nIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuZ2V0QXR0cmlidXRlKCdzcmMnKTtcbiAgICB9XG59XG4iXSwic291cmNlUm9vdCI6IiJ9