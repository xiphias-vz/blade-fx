(window["webpackJsonp_yves_default"] = window["webpackJsonp_yves_default"] || []).push([[6],{

/***/ "./src/Pyz/Yves/ShopUi/Theme/default/components/molecules/ajax-renderer/ajax-renderer-extended.ts":
/*!********************************************************************************************************!*\
  !*** ./src/Pyz/Yves/ShopUi/Theme/default/components/molecules/ajax-renderer/ajax-renderer-extended.ts ***!
  \********************************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return AjaxRendererExtended; });
/* harmony import */ var ShopUi_components_molecules_ajax_renderer_ajax_renderer__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ShopUi/components/molecules/ajax-renderer/ajax-renderer */ "./vendor/spryker-shop/shop-ui/src/SprykerShop/Yves/ShopUi/Theme/default/components/molecules/ajax-renderer/ajax-renderer.ts");
/* harmony import */ var ShopUi_app__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ShopUi/app */ "./vendor/spryker-shop/shop-ui/src/SprykerShop/Yves/ShopUi/Theme/default/app/index.ts");


class AjaxRendererExtended extends ShopUi_components_molecules_ajax_renderer_ajax_renderer__WEBPACK_IMPORTED_MODULE_0__["default"] {
  onFetched(event) {
    super.onFetched(event);

    if (this.mountAfterRender) {
      Object(ShopUi_app__WEBPACK_IMPORTED_MODULE_1__["mount"])();
    }
  }

}

/***/ }),

/***/ "./vendor/spryker-shop/shop-ui/src/SprykerShop/Yves/ShopUi/Theme/default/components/molecules/ajax-renderer/ajax-renderer.ts":
/*!***********************************************************************************************************************************!*\
  !*** ./vendor/spryker-shop/shop-ui/src/SprykerShop/Yves/ShopUi/Theme/default/components/molecules/ajax-renderer/ajax-renderer.ts ***!
  \***********************************************************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return AjaxRenderer; });
/* harmony import */ var _models_component__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../../models/component */ "./vendor/spryker-shop/shop-ui/src/SprykerShop/Yves/ShopUi/Theme/default/models/component.ts");
/* harmony import */ var ShopUi_app__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ShopUi/app */ "./vendor/spryker-shop/shop-ui/src/SprykerShop/Yves/ShopUi/Theme/default/app/index.ts");
function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }



class AjaxRenderer extends _models_component__WEBPACK_IMPORTED_MODULE_0__["default"] {
  constructor() {
    super(...arguments);

    _defineProperty(this, "provider", void 0);

    _defineProperty(this, "target", void 0);
  }

  readyCallback() {
    /* tslint:disable: deprecation */
    this.provider = this.providerClassName ? document.getElementsByClassName(this.providerClassName)[0] : document.querySelector(this.providerSelector);
    this.target = this.targetClassName ? document.getElementsByClassName(this.targetClassName)[0] : document.querySelector(this.targetSelector ? this.targetSelector : undefined);
    /* tslint:enable: deprecation */

    this.mapEvents();
  }

  mapEvents() {
    this.provider.addEventListener('fetched', event => this.onFetched(event));
  }

  onFetched(event) {
    this.render();
  }
  /**
   * Gets a response from the server and renders it on the page.
   */


  render() {
    var response = this.provider.xhr.response;

    if (!response && !this.renderIfResponseIsEmpty) {
      return;
    }

    if (this.target) {
      this.target.innerHTML = response;
    } else {
      this.innerHTML = response;
    }

    if (this.mountAfterRender) {
      Object(ShopUi_app__WEBPACK_IMPORTED_MODULE_1__["mount"])();
    }
  }
  /**
   * Gets a querySelector name of the provider element.
   *
   * @deprecated Use providerClassName() instead.
   */


  get providerSelector() {
    return this.getAttribute('provider-selector');
  }

  get providerClassName() {
    return this.getAttribute('provider-class-name');
  }
  /**
   * Gets a querySelector name of the target element.
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
   * Gets if the response from the server is empty.
   */


  get renderIfResponseIsEmpty() {
    return this.hasAttribute('render-if-response-is-empty');
  }
  /**
   * Gets if the component is mounted after rendering.
   */


  get mountAfterRender() {
    return this.hasAttribute('mount-after-render');
  }

}

/***/ })

}]);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vLi9zcmMvUHl6L1l2ZXMvU2hvcFVpL1RoZW1lL2RlZmF1bHQvY29tcG9uZW50cy9tb2xlY3VsZXMvYWpheC1yZW5kZXJlci9hamF4LXJlbmRlcmVyLWV4dGVuZGVkLnRzIiwid2VicGFjazovLy8uL3ZlbmRvci9zcHJ5a2VyLXNob3Avc2hvcC11aS9zcmMvU3ByeWtlclNob3AvWXZlcy9TaG9wVWkvVGhlbWUvZGVmYXVsdC9jb21wb25lbnRzL21vbGVjdWxlcy9hamF4LXJlbmRlcmVyL2FqYXgtcmVuZGVyZXIudHMiXSwibmFtZXMiOlsiQWpheFJlbmRlcmVyRXh0ZW5kZWQiLCJBamF4UmVuZGVyZXIiLCJvbkZldGNoZWQiLCJldmVudCIsIm1vdW50QWZ0ZXJSZW5kZXIiLCJtb3VudCIsIkNvbXBvbmVudCIsInJlYWR5Q2FsbGJhY2siLCJwcm92aWRlciIsInByb3ZpZGVyQ2xhc3NOYW1lIiwiZG9jdW1lbnQiLCJnZXRFbGVtZW50c0J5Q2xhc3NOYW1lIiwicXVlcnlTZWxlY3RvciIsInByb3ZpZGVyU2VsZWN0b3IiLCJ0YXJnZXQiLCJ0YXJnZXRDbGFzc05hbWUiLCJ0YXJnZXRTZWxlY3RvciIsInVuZGVmaW5lZCIsIm1hcEV2ZW50cyIsImFkZEV2ZW50TGlzdGVuZXIiLCJyZW5kZXIiLCJyZXNwb25zZSIsInhociIsInJlbmRlcklmUmVzcG9uc2VJc0VtcHR5IiwiaW5uZXJIVE1MIiwiZ2V0QXR0cmlidXRlIiwiaGFzQXR0cmlidXRlIl0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7O0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUNBO0FBRWUsTUFBTUEsb0JBQU4sU0FBbUNDLCtGQUFuQyxDQUFnRDtBQUNqREMsV0FBVixDQUFvQkMsS0FBcEIsRUFBd0M7QUFDcEMsVUFBTUQsU0FBTixDQUFnQkMsS0FBaEI7O0FBRUEsUUFBSSxLQUFLQyxnQkFBVCxFQUEyQjtBQUN2QkMsOERBQUs7QUFDUjtBQUNKOztBQVAwRCxDOzs7Ozs7Ozs7Ozs7Ozs7Ozs7QUNIL0Q7QUFFQTtBQUVlLE1BQU1KLFlBQU4sU0FBMkJLLHlEQUEzQixDQUFxQztBQUFBO0FBQUE7O0FBQUE7O0FBQUE7QUFBQTs7QUFJdENDLGVBQVYsR0FBZ0M7QUFDNUI7QUFDQSxTQUFLQyxRQUFMLEdBQ0ssS0FBS0MsaUJBQUwsR0FDS0MsUUFBUSxDQUFDQyxzQkFBVCxDQUFnQyxLQUFLRixpQkFBckMsRUFBd0QsQ0FBeEQsQ0FETCxHQUVLQyxRQUFRLENBQUNFLGFBQVQsQ0FBdUIsS0FBS0MsZ0JBQTVCLENBSFY7QUFLQSxTQUFLQyxNQUFMLEdBQ0ssS0FBS0MsZUFBTCxHQUNLTCxRQUFRLENBQUNDLHNCQUFULENBQWdDLEtBQUtJLGVBQXJDLEVBQXNELENBQXRELENBREwsR0FFS0wsUUFBUSxDQUFDRSxhQUFULENBQXVCLEtBQUtJLGNBQUwsR0FBc0IsS0FBS0EsY0FBM0IsR0FBNENDLFNBQW5FLENBSFY7QUFLQTs7QUFDQSxTQUFLQyxTQUFMO0FBQ0g7O0FBRVNBLFdBQVYsR0FBNEI7QUFDeEIsU0FBS1YsUUFBTCxDQUFjVyxnQkFBZCxDQUErQixTQUEvQixFQUEyQ2hCLEtBQUQsSUFBa0IsS0FBS0QsU0FBTCxDQUFlQyxLQUFmLENBQTVEO0FBQ0g7O0FBRVNELFdBQVYsQ0FBb0JDLEtBQXBCLEVBQXdDO0FBQ3BDLFNBQUtpQixNQUFMO0FBQ0g7QUFFRDs7Ozs7QUFHQUEsUUFBTSxHQUFTO0FBQ1gsUUFBTUMsUUFBUSxHQUFHLEtBQUtiLFFBQUwsQ0FBY2MsR0FBZCxDQUFrQkQsUUFBbkM7O0FBRUEsUUFBSSxDQUFDQSxRQUFELElBQWEsQ0FBQyxLQUFLRSx1QkFBdkIsRUFBZ0Q7QUFDNUM7QUFDSDs7QUFFRCxRQUFJLEtBQUtULE1BQVQsRUFBaUI7QUFDYixXQUFLQSxNQUFMLENBQVlVLFNBQVosR0FBd0JILFFBQXhCO0FBQ0gsS0FGRCxNQUVPO0FBQ0gsV0FBS0csU0FBTCxHQUFpQkgsUUFBakI7QUFDSDs7QUFFRCxRQUFJLEtBQUtqQixnQkFBVCxFQUEyQjtBQUN2QkMsOERBQUs7QUFDUjtBQUNKO0FBRUQ7Ozs7Ozs7QUFLQSxNQUFJUSxnQkFBSixHQUErQjtBQUMzQixXQUFPLEtBQUtZLFlBQUwsQ0FBa0IsbUJBQWxCLENBQVA7QUFDSDs7QUFDRCxNQUFjaEIsaUJBQWQsR0FBMEM7QUFDdEMsV0FBTyxLQUFLZ0IsWUFBTCxDQUFrQixxQkFBbEIsQ0FBUDtBQUNIO0FBRUQ7Ozs7Ozs7QUFLQSxNQUFJVCxjQUFKLEdBQTZCO0FBQ3pCLFdBQU8sS0FBS1MsWUFBTCxDQUFrQixpQkFBbEIsQ0FBUDtBQUNIOztBQUNELE1BQWNWLGVBQWQsR0FBd0M7QUFDcEMsV0FBTyxLQUFLVSxZQUFMLENBQWtCLG1CQUFsQixDQUFQO0FBQ0g7QUFFRDs7Ozs7QUFHQSxNQUFJRix1QkFBSixHQUF1QztBQUNuQyxXQUFPLEtBQUtHLFlBQUwsQ0FBa0IsNkJBQWxCLENBQVA7QUFDSDtBQUVEOzs7OztBQUdBLE1BQUl0QixnQkFBSixHQUFnQztBQUM1QixXQUFPLEtBQUtzQixZQUFMLENBQWtCLG9CQUFsQixDQUFQO0FBQ0g7O0FBckYrQyxDIiwiZmlsZSI6Ii4vanMveXZlc19kZWZhdWx0LjYuZXNtLmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IEFqYXhSZW5kZXJlciBmcm9tICdTaG9wVWkvY29tcG9uZW50cy9tb2xlY3VsZXMvYWpheC1yZW5kZXJlci9hamF4LXJlbmRlcmVyJztcbmltcG9ydCB7IG1vdW50IH0gZnJvbSAnU2hvcFVpL2FwcCc7XG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIEFqYXhSZW5kZXJlckV4dGVuZGVkIGV4dGVuZHMgQWpheFJlbmRlcmVyIHtcbiAgICBwcm90ZWN0ZWQgb25GZXRjaGVkKGV2ZW50OiBFdmVudCk6IHZvaWQge1xuICAgICAgICBzdXBlci5vbkZldGNoZWQoZXZlbnQpO1xuXG4gICAgICAgIGlmICh0aGlzLm1vdW50QWZ0ZXJSZW5kZXIpIHtcbiAgICAgICAgICAgIG1vdW50KCk7XG4gICAgICAgIH1cbiAgICB9XG59XG4iLCJpbXBvcnQgQ29tcG9uZW50IGZyb20gJy4uLy4uLy4uL21vZGVscy9jb21wb25lbnQnO1xuaW1wb3J0IEFqYXhQcm92aWRlciBmcm9tICcuLi9hamF4LXByb3ZpZGVyL2FqYXgtcHJvdmlkZXInO1xuaW1wb3J0IHsgbW91bnQgfSBmcm9tICdTaG9wVWkvYXBwJztcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgQWpheFJlbmRlcmVyIGV4dGVuZHMgQ29tcG9uZW50IHtcbiAgICBwcm90ZWN0ZWQgcHJvdmlkZXI6IEFqYXhQcm92aWRlcjtcbiAgICBwcm90ZWN0ZWQgdGFyZ2V0OiBIVE1MRWxlbWVudDtcblxuICAgIHByb3RlY3RlZCByZWFkeUNhbGxiYWNrKCk6IHZvaWQge1xuICAgICAgICAvKiB0c2xpbnQ6ZGlzYWJsZTogZGVwcmVjYXRpb24gKi9cbiAgICAgICAgdGhpcy5wcm92aWRlciA9IDxBamF4UHJvdmlkZXI+KFxuICAgICAgICAgICAgKHRoaXMucHJvdmlkZXJDbGFzc05hbWVcbiAgICAgICAgICAgICAgICA/IGRvY3VtZW50LmdldEVsZW1lbnRzQnlDbGFzc05hbWUodGhpcy5wcm92aWRlckNsYXNzTmFtZSlbMF1cbiAgICAgICAgICAgICAgICA6IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IodGhpcy5wcm92aWRlclNlbGVjdG9yKSlcbiAgICAgICAgKTtcbiAgICAgICAgdGhpcy50YXJnZXQgPSA8SFRNTEVsZW1lbnQ+KFxuICAgICAgICAgICAgKHRoaXMudGFyZ2V0Q2xhc3NOYW1lXG4gICAgICAgICAgICAgICAgPyBkb2N1bWVudC5nZXRFbGVtZW50c0J5Q2xhc3NOYW1lKHRoaXMudGFyZ2V0Q2xhc3NOYW1lKVswXVxuICAgICAgICAgICAgICAgIDogZG9jdW1lbnQucXVlcnlTZWxlY3Rvcih0aGlzLnRhcmdldFNlbGVjdG9yID8gdGhpcy50YXJnZXRTZWxlY3RvciA6IHVuZGVmaW5lZCkpXG4gICAgICAgICk7XG4gICAgICAgIC8qIHRzbGludDplbmFibGU6IGRlcHJlY2F0aW9uICovXG4gICAgICAgIHRoaXMubWFwRXZlbnRzKCk7XG4gICAgfVxuXG4gICAgcHJvdGVjdGVkIG1hcEV2ZW50cygpOiB2b2lkIHtcbiAgICAgICAgdGhpcy5wcm92aWRlci5hZGRFdmVudExpc3RlbmVyKCdmZXRjaGVkJywgKGV2ZW50OiBFdmVudCkgPT4gdGhpcy5vbkZldGNoZWQoZXZlbnQpKTtcbiAgICB9XG5cbiAgICBwcm90ZWN0ZWQgb25GZXRjaGVkKGV2ZW50OiBFdmVudCk6IHZvaWQge1xuICAgICAgICB0aGlzLnJlbmRlcigpO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIEdldHMgYSByZXNwb25zZSBmcm9tIHRoZSBzZXJ2ZXIgYW5kIHJlbmRlcnMgaXQgb24gdGhlIHBhZ2UuXG4gICAgICovXG4gICAgcmVuZGVyKCk6IHZvaWQge1xuICAgICAgICBjb25zdCByZXNwb25zZSA9IHRoaXMucHJvdmlkZXIueGhyLnJlc3BvbnNlO1xuXG4gICAgICAgIGlmICghcmVzcG9uc2UgJiYgIXRoaXMucmVuZGVySWZSZXNwb25zZUlzRW1wdHkpIHtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmICh0aGlzLnRhcmdldCkge1xuICAgICAgICAgICAgdGhpcy50YXJnZXQuaW5uZXJIVE1MID0gcmVzcG9uc2U7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICB0aGlzLmlubmVySFRNTCA9IHJlc3BvbnNlO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKHRoaXMubW91bnRBZnRlclJlbmRlcikge1xuICAgICAgICAgICAgbW91bnQoKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIC8qKlxuICAgICAqIEdldHMgYSBxdWVyeVNlbGVjdG9yIG5hbWUgb2YgdGhlIHByb3ZpZGVyIGVsZW1lbnQuXG4gICAgICpcbiAgICAgKiBAZGVwcmVjYXRlZCBVc2UgcHJvdmlkZXJDbGFzc05hbWUoKSBpbnN0ZWFkLlxuICAgICAqL1xuICAgIGdldCBwcm92aWRlclNlbGVjdG9yKCk6IHN0cmluZyB7XG4gICAgICAgIHJldHVybiB0aGlzLmdldEF0dHJpYnV0ZSgncHJvdmlkZXItc2VsZWN0b3InKTtcbiAgICB9XG4gICAgcHJvdGVjdGVkIGdldCBwcm92aWRlckNsYXNzTmFtZSgpOiBzdHJpbmcge1xuICAgICAgICByZXR1cm4gdGhpcy5nZXRBdHRyaWJ1dGUoJ3Byb3ZpZGVyLWNsYXNzLW5hbWUnKTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBHZXRzIGEgcXVlcnlTZWxlY3RvciBuYW1lIG9mIHRoZSB0YXJnZXQgZWxlbWVudC5cbiAgICAgKlxuICAgICAqIEBkZXByZWNhdGVkIFVzZSB0YXJnZXRDbGFzc05hbWUoKSBpbnN0ZWFkLlxuICAgICAqL1xuICAgIGdldCB0YXJnZXRTZWxlY3RvcigpOiBzdHJpbmcge1xuICAgICAgICByZXR1cm4gdGhpcy5nZXRBdHRyaWJ1dGUoJ3RhcmdldC1zZWxlY3RvcicpO1xuICAgIH1cbiAgICBwcm90ZWN0ZWQgZ2V0IHRhcmdldENsYXNzTmFtZSgpOiBzdHJpbmcge1xuICAgICAgICByZXR1cm4gdGhpcy5nZXRBdHRyaWJ1dGUoJ3RhcmdldC1jbGFzcy1uYW1lJyk7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogR2V0cyBpZiB0aGUgcmVzcG9uc2UgZnJvbSB0aGUgc2VydmVyIGlzIGVtcHR5LlxuICAgICAqL1xuICAgIGdldCByZW5kZXJJZlJlc3BvbnNlSXNFbXB0eSgpOiBib29sZWFuIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuaGFzQXR0cmlidXRlKCdyZW5kZXItaWYtcmVzcG9uc2UtaXMtZW1wdHknKTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBHZXRzIGlmIHRoZSBjb21wb25lbnQgaXMgbW91bnRlZCBhZnRlciByZW5kZXJpbmcuXG4gICAgICovXG4gICAgZ2V0IG1vdW50QWZ0ZXJSZW5kZXIoKTogYm9vbGVhbiB7XG4gICAgICAgIHJldHVybiB0aGlzLmhhc0F0dHJpYnV0ZSgnbW91bnQtYWZ0ZXItcmVuZGVyJyk7XG4gICAgfVxufVxuIl0sInNvdXJjZVJvb3QiOiIifQ==