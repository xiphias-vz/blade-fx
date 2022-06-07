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
/* harmony import */ var _babel_runtime_helpers_possibleConstructorReturn__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @babel/runtime/helpers/possibleConstructorReturn */ "./node_modules/@babel/runtime/helpers/possibleConstructorReturn.js");
/* harmony import */ var _babel_runtime_helpers_possibleConstructorReturn__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_possibleConstructorReturn__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _babel_runtime_helpers_getPrototypeOf__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @babel/runtime/helpers/getPrototypeOf */ "./node_modules/@babel/runtime/helpers/getPrototypeOf.js");
/* harmony import */ var _babel_runtime_helpers_getPrototypeOf__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_getPrototypeOf__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _babel_runtime_helpers_inheritsLoose__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @babel/runtime/helpers/inheritsLoose */ "./node_modules/@babel/runtime/helpers/inheritsLoose.js");
/* harmony import */ var _babel_runtime_helpers_inheritsLoose__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_inheritsLoose__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var ShopUi_components_molecules_ajax_renderer_ajax_renderer__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ShopUi/components/molecules/ajax-renderer/ajax-renderer */ "./vendor/spryker-shop/shop-ui/src/SprykerShop/Yves/ShopUi/Theme/default/components/molecules/ajax-renderer/ajax-renderer.ts");
/* harmony import */ var ShopUi_app__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ShopUi/app */ "./vendor/spryker-shop/shop-ui/src/SprykerShop/Yves/ShopUi/Theme/default/app/index.ts");




function _createSuper(Derived) { return function () { var Super = _babel_runtime_helpers_getPrototypeOf__WEBPACK_IMPORTED_MODULE_1___default()(Derived), result; if (_isNativeReflectConstruct()) { var NewTarget = _babel_runtime_helpers_getPrototypeOf__WEBPACK_IMPORTED_MODULE_1___default()(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _babel_runtime_helpers_possibleConstructorReturn__WEBPACK_IMPORTED_MODULE_0___default()(this, result); }; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Date.prototype.toString.call(Reflect.construct(Date, [], function () {})); return true; } catch (e) { return false; } }




var AjaxRendererExtended = /*#__PURE__*/function (_AjaxRenderer) {
  _babel_runtime_helpers_inheritsLoose__WEBPACK_IMPORTED_MODULE_2___default()(AjaxRendererExtended, _AjaxRenderer);

  var _super = _createSuper(AjaxRendererExtended);

  function AjaxRendererExtended() {
    return _AjaxRenderer.apply(this, arguments) || this;
  }

  var _proto = AjaxRendererExtended.prototype;

  _proto.onFetched = function onFetched(event) {
    _AjaxRenderer.prototype.onFetched.call(this, event);

    if (this.mountAfterRender) {
      Object(ShopUi_app__WEBPACK_IMPORTED_MODULE_4__["mount"])();
    }
  };

  return AjaxRendererExtended;
}(ShopUi_components_molecules_ajax_renderer_ajax_renderer__WEBPACK_IMPORTED_MODULE_3__["default"]);



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
/* harmony import */ var _babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @babel/runtime/helpers/createClass */ "./node_modules/@babel/runtime/helpers/createClass.js");
/* harmony import */ var _babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _babel_runtime_helpers_assertThisInitialized__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @babel/runtime/helpers/assertThisInitialized */ "./node_modules/@babel/runtime/helpers/assertThisInitialized.js");
/* harmony import */ var _babel_runtime_helpers_assertThisInitialized__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_assertThisInitialized__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _babel_runtime_helpers_possibleConstructorReturn__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @babel/runtime/helpers/possibleConstructorReturn */ "./node_modules/@babel/runtime/helpers/possibleConstructorReturn.js");
/* harmony import */ var _babel_runtime_helpers_possibleConstructorReturn__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_possibleConstructorReturn__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _babel_runtime_helpers_getPrototypeOf__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @babel/runtime/helpers/getPrototypeOf */ "./node_modules/@babel/runtime/helpers/getPrototypeOf.js");
/* harmony import */ var _babel_runtime_helpers_getPrototypeOf__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_getPrototypeOf__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _babel_runtime_helpers_inheritsLoose__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @babel/runtime/helpers/inheritsLoose */ "./node_modules/@babel/runtime/helpers/inheritsLoose.js");
/* harmony import */ var _babel_runtime_helpers_inheritsLoose__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_inheritsLoose__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @babel/runtime/helpers/defineProperty */ "./node_modules/@babel/runtime/helpers/defineProperty.js");
/* harmony import */ var _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_5__);
/* harmony import */ var _models_component__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../../../models/component */ "./vendor/spryker-shop/shop-ui/src/SprykerShop/Yves/ShopUi/Theme/default/models/component.ts");
/* harmony import */ var ShopUi_app__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ShopUi/app */ "./vendor/spryker-shop/shop-ui/src/SprykerShop/Yves/ShopUi/Theme/default/app/index.ts");







function _createSuper(Derived) { return function () { var Super = _babel_runtime_helpers_getPrototypeOf__WEBPACK_IMPORTED_MODULE_3___default()(Derived), result; if (_isNativeReflectConstruct()) { var NewTarget = _babel_runtime_helpers_getPrototypeOf__WEBPACK_IMPORTED_MODULE_3___default()(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _babel_runtime_helpers_possibleConstructorReturn__WEBPACK_IMPORTED_MODULE_2___default()(this, result); }; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Date.prototype.toString.call(Reflect.construct(Date, [], function () {})); return true; } catch (e) { return false; } }




var AjaxRenderer = /*#__PURE__*/function (_Component) {
  _babel_runtime_helpers_inheritsLoose__WEBPACK_IMPORTED_MODULE_4___default()(AjaxRenderer, _Component);

  var _super = _createSuper(AjaxRenderer);

  function AjaxRenderer() {
    var _this;

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this = _Component.call.apply(_Component, [this].concat(args)) || this;

    _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_5___default()(_babel_runtime_helpers_assertThisInitialized__WEBPACK_IMPORTED_MODULE_1___default()(_this), "provider", void 0);

    _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_5___default()(_babel_runtime_helpers_assertThisInitialized__WEBPACK_IMPORTED_MODULE_1___default()(_this), "target", void 0);

    return _this;
  }

  var _proto = AjaxRenderer.prototype;

  _proto.readyCallback = function readyCallback() {
    /* tslint:disable: deprecation */
    this.provider = this.providerClassName ? document.getElementsByClassName(this.providerClassName)[0] : document.querySelector(this.providerSelector);
    this.target = this.targetClassName ? document.getElementsByClassName(this.targetClassName)[0] : document.querySelector(this.targetSelector ? this.targetSelector : undefined);
    /* tslint:enable: deprecation */

    this.mapEvents();
  };

  _proto.mapEvents = function mapEvents() {
    var _this2 = this;

    this.provider.addEventListener('fetched', function (event) {
      return _this2.onFetched(event);
    });
  };

  _proto.onFetched = function onFetched(event) {
    this.render();
  }
  /**
   * Gets a response from the server and renders it on the page.
   */
  ;

  _proto.render = function render() {
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
      Object(ShopUi_app__WEBPACK_IMPORTED_MODULE_7__["mount"])();
    }
  }
  /**
   * Gets a querySelector name of the provider element.
   *
   * @deprecated Use providerClassName() instead.
   */
  ;

  _babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_0___default()(AjaxRenderer, [{
    key: "providerSelector",
    get: function get() {
      return this.getAttribute('provider-selector');
    }
  }, {
    key: "providerClassName",
    get: function get() {
      return this.getAttribute('provider-class-name');
    }
    /**
     * Gets a querySelector name of the target element.
     *
     * @deprecated Use targetClassName() instead.
     */

  }, {
    key: "targetSelector",
    get: function get() {
      return this.getAttribute('target-selector');
    }
  }, {
    key: "targetClassName",
    get: function get() {
      return this.getAttribute('target-class-name');
    }
    /**
     * Gets if the response from the server is empty.
     */

  }, {
    key: "renderIfResponseIsEmpty",
    get: function get() {
      return this.hasAttribute('render-if-response-is-empty');
    }
    /**
     * Gets if the component is mounted after rendering.
     */

  }, {
    key: "mountAfterRender",
    get: function get() {
      return this.hasAttribute('mount-after-render');
    }
  }]);

  return AjaxRenderer;
}(_models_component__WEBPACK_IMPORTED_MODULE_6__["default"]);



/***/ })

}]);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vLi9zcmMvUHl6L1l2ZXMvU2hvcFVpL1RoZW1lL2RlZmF1bHQvY29tcG9uZW50cy9tb2xlY3VsZXMvYWpheC1yZW5kZXJlci9hamF4LXJlbmRlcmVyLWV4dGVuZGVkLnRzIiwid2VicGFjazovLy8uL3ZlbmRvci9zcHJ5a2VyLXNob3Avc2hvcC11aS9zcmMvU3ByeWtlclNob3AvWXZlcy9TaG9wVWkvVGhlbWUvZGVmYXVsdC9jb21wb25lbnRzL21vbGVjdWxlcy9hamF4LXJlbmRlcmVyL2FqYXgtcmVuZGVyZXIudHMiXSwibmFtZXMiOlsiQWpheFJlbmRlcmVyRXh0ZW5kZWQiLCJvbkZldGNoZWQiLCJldmVudCIsIm1vdW50QWZ0ZXJSZW5kZXIiLCJtb3VudCIsIkFqYXhSZW5kZXJlciIsInJlYWR5Q2FsbGJhY2siLCJwcm92aWRlciIsInByb3ZpZGVyQ2xhc3NOYW1lIiwiZG9jdW1lbnQiLCJnZXRFbGVtZW50c0J5Q2xhc3NOYW1lIiwicXVlcnlTZWxlY3RvciIsInByb3ZpZGVyU2VsZWN0b3IiLCJ0YXJnZXQiLCJ0YXJnZXRDbGFzc05hbWUiLCJ0YXJnZXRTZWxlY3RvciIsInVuZGVmaW5lZCIsIm1hcEV2ZW50cyIsImFkZEV2ZW50TGlzdGVuZXIiLCJyZW5kZXIiLCJyZXNwb25zZSIsInhociIsInJlbmRlcklmUmVzcG9uc2VJc0VtcHR5IiwiaW5uZXJIVE1MIiwiZ2V0QXR0cmlidXRlIiwiaGFzQXR0cmlidXRlIiwiQ29tcG9uZW50Il0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUE7QUFDQTs7SUFFcUJBLG9COzs7Ozs7Ozs7OztTQUNQQyxTLEdBQVYsbUJBQW9CQyxLQUFwQixFQUF3QztBQUNwQyw0QkFBTUQsU0FBTixZQUFnQkMsS0FBaEI7O0FBRUEsUUFBSSxLQUFLQyxnQkFBVCxFQUEyQjtBQUN2QkMsOERBQUs7QUFDUjtBQUNKLEc7OztFQVA2Q0MsK0Y7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FDSGxEO0FBRUE7O0lBRXFCQSxZOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztTQUlQQyxhLEdBQVYseUJBQWdDO0FBQzVCO0FBQ0EsU0FBS0MsUUFBTCxHQUNLLEtBQUtDLGlCQUFMLEdBQ0tDLFFBQVEsQ0FBQ0Msc0JBQVQsQ0FBZ0MsS0FBS0YsaUJBQXJDLEVBQXdELENBQXhELENBREwsR0FFS0MsUUFBUSxDQUFDRSxhQUFULENBQXVCLEtBQUtDLGdCQUE1QixDQUhWO0FBS0EsU0FBS0MsTUFBTCxHQUNLLEtBQUtDLGVBQUwsR0FDS0wsUUFBUSxDQUFDQyxzQkFBVCxDQUFnQyxLQUFLSSxlQUFyQyxFQUFzRCxDQUF0RCxDQURMLEdBRUtMLFFBQVEsQ0FBQ0UsYUFBVCxDQUF1QixLQUFLSSxjQUFMLEdBQXNCLEtBQUtBLGNBQTNCLEdBQTRDQyxTQUFuRSxDQUhWO0FBS0E7O0FBQ0EsU0FBS0MsU0FBTDtBQUNILEc7O1NBRVNBLFMsR0FBVixxQkFBNEI7QUFBQTs7QUFDeEIsU0FBS1YsUUFBTCxDQUFjVyxnQkFBZCxDQUErQixTQUEvQixFQUEwQyxVQUFDaEIsS0FBRDtBQUFBLGFBQWtCLE1BQUksQ0FBQ0QsU0FBTCxDQUFlQyxLQUFmLENBQWxCO0FBQUEsS0FBMUM7QUFDSCxHOztTQUVTRCxTLEdBQVYsbUJBQW9CQyxLQUFwQixFQUF3QztBQUNwQyxTQUFLaUIsTUFBTDtBQUNIO0FBRUQ7Ozs7O1NBR0FBLE0sR0FBQSxrQkFBZTtBQUNYLFFBQU1DLFFBQVEsR0FBRyxLQUFLYixRQUFMLENBQWNjLEdBQWQsQ0FBa0JELFFBQW5DOztBQUVBLFFBQUksQ0FBQ0EsUUFBRCxJQUFhLENBQUMsS0FBS0UsdUJBQXZCLEVBQWdEO0FBQzVDO0FBQ0g7O0FBRUQsUUFBSSxLQUFLVCxNQUFULEVBQWlCO0FBQ2IsV0FBS0EsTUFBTCxDQUFZVSxTQUFaLEdBQXdCSCxRQUF4QjtBQUNILEtBRkQsTUFFTztBQUNILFdBQUtHLFNBQUwsR0FBaUJILFFBQWpCO0FBQ0g7O0FBRUQsUUFBSSxLQUFLakIsZ0JBQVQsRUFBMkI7QUFDdkJDLDhEQUFLO0FBQ1I7QUFDSjtBQUVEOzs7Ozs7Ozs7d0JBSytCO0FBQzNCLGFBQU8sS0FBS29CLFlBQUwsQ0FBa0IsbUJBQWxCLENBQVA7QUFDSDs7O3dCQUN5QztBQUN0QyxhQUFPLEtBQUtBLFlBQUwsQ0FBa0IscUJBQWxCLENBQVA7QUFDSDtBQUVEOzs7Ozs7Ozt3QkFLNkI7QUFDekIsYUFBTyxLQUFLQSxZQUFMLENBQWtCLGlCQUFsQixDQUFQO0FBQ0g7Ozt3QkFDdUM7QUFDcEMsYUFBTyxLQUFLQSxZQUFMLENBQWtCLG1CQUFsQixDQUFQO0FBQ0g7QUFFRDs7Ozs7O3dCQUd1QztBQUNuQyxhQUFPLEtBQUtDLFlBQUwsQ0FBa0IsNkJBQWxCLENBQVA7QUFDSDtBQUVEOzs7Ozs7d0JBR2dDO0FBQzVCLGFBQU8sS0FBS0EsWUFBTCxDQUFrQixvQkFBbEIsQ0FBUDtBQUNIOzs7O0VBckZxQ0MseUQiLCJmaWxlIjoiLi9qcy95dmVzX2RlZmF1bHQuNi5sZWdhY3kuanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgQWpheFJlbmRlcmVyIGZyb20gJ1Nob3BVaS9jb21wb25lbnRzL21vbGVjdWxlcy9hamF4LXJlbmRlcmVyL2FqYXgtcmVuZGVyZXInO1xuaW1wb3J0IHsgbW91bnQgfSBmcm9tICdTaG9wVWkvYXBwJztcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgQWpheFJlbmRlcmVyRXh0ZW5kZWQgZXh0ZW5kcyBBamF4UmVuZGVyZXIge1xuICAgIHByb3RlY3RlZCBvbkZldGNoZWQoZXZlbnQ6IEV2ZW50KTogdm9pZCB7XG4gICAgICAgIHN1cGVyLm9uRmV0Y2hlZChldmVudCk7XG5cbiAgICAgICAgaWYgKHRoaXMubW91bnRBZnRlclJlbmRlcikge1xuICAgICAgICAgICAgbW91bnQoKTtcbiAgICAgICAgfVxuICAgIH1cbn1cbiIsImltcG9ydCBDb21wb25lbnQgZnJvbSAnLi4vLi4vLi4vbW9kZWxzL2NvbXBvbmVudCc7XG5pbXBvcnQgQWpheFByb3ZpZGVyIGZyb20gJy4uL2FqYXgtcHJvdmlkZXIvYWpheC1wcm92aWRlcic7XG5pbXBvcnQgeyBtb3VudCB9IGZyb20gJ1Nob3BVaS9hcHAnO1xuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBBamF4UmVuZGVyZXIgZXh0ZW5kcyBDb21wb25lbnQge1xuICAgIHByb3RlY3RlZCBwcm92aWRlcjogQWpheFByb3ZpZGVyO1xuICAgIHByb3RlY3RlZCB0YXJnZXQ6IEhUTUxFbGVtZW50O1xuXG4gICAgcHJvdGVjdGVkIHJlYWR5Q2FsbGJhY2soKTogdm9pZCB7XG4gICAgICAgIC8qIHRzbGludDpkaXNhYmxlOiBkZXByZWNhdGlvbiAqL1xuICAgICAgICB0aGlzLnByb3ZpZGVyID0gPEFqYXhQcm92aWRlcj4oXG4gICAgICAgICAgICAodGhpcy5wcm92aWRlckNsYXNzTmFtZVxuICAgICAgICAgICAgICAgID8gZG9jdW1lbnQuZ2V0RWxlbWVudHNCeUNsYXNzTmFtZSh0aGlzLnByb3ZpZGVyQ2xhc3NOYW1lKVswXVxuICAgICAgICAgICAgICAgIDogZG9jdW1lbnQucXVlcnlTZWxlY3Rvcih0aGlzLnByb3ZpZGVyU2VsZWN0b3IpKVxuICAgICAgICApO1xuICAgICAgICB0aGlzLnRhcmdldCA9IDxIVE1MRWxlbWVudD4oXG4gICAgICAgICAgICAodGhpcy50YXJnZXRDbGFzc05hbWVcbiAgICAgICAgICAgICAgICA/IGRvY3VtZW50LmdldEVsZW1lbnRzQnlDbGFzc05hbWUodGhpcy50YXJnZXRDbGFzc05hbWUpWzBdXG4gICAgICAgICAgICAgICAgOiBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKHRoaXMudGFyZ2V0U2VsZWN0b3IgPyB0aGlzLnRhcmdldFNlbGVjdG9yIDogdW5kZWZpbmVkKSlcbiAgICAgICAgKTtcbiAgICAgICAgLyogdHNsaW50OmVuYWJsZTogZGVwcmVjYXRpb24gKi9cbiAgICAgICAgdGhpcy5tYXBFdmVudHMoKTtcbiAgICB9XG5cbiAgICBwcm90ZWN0ZWQgbWFwRXZlbnRzKCk6IHZvaWQge1xuICAgICAgICB0aGlzLnByb3ZpZGVyLmFkZEV2ZW50TGlzdGVuZXIoJ2ZldGNoZWQnLCAoZXZlbnQ6IEV2ZW50KSA9PiB0aGlzLm9uRmV0Y2hlZChldmVudCkpO1xuICAgIH1cblxuICAgIHByb3RlY3RlZCBvbkZldGNoZWQoZXZlbnQ6IEV2ZW50KTogdm9pZCB7XG4gICAgICAgIHRoaXMucmVuZGVyKCk7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogR2V0cyBhIHJlc3BvbnNlIGZyb20gdGhlIHNlcnZlciBhbmQgcmVuZGVycyBpdCBvbiB0aGUgcGFnZS5cbiAgICAgKi9cbiAgICByZW5kZXIoKTogdm9pZCB7XG4gICAgICAgIGNvbnN0IHJlc3BvbnNlID0gdGhpcy5wcm92aWRlci54aHIucmVzcG9uc2U7XG5cbiAgICAgICAgaWYgKCFyZXNwb25zZSAmJiAhdGhpcy5yZW5kZXJJZlJlc3BvbnNlSXNFbXB0eSkge1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKHRoaXMudGFyZ2V0KSB7XG4gICAgICAgICAgICB0aGlzLnRhcmdldC5pbm5lckhUTUwgPSByZXNwb25zZTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHRoaXMuaW5uZXJIVE1MID0gcmVzcG9uc2U7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAodGhpcy5tb3VudEFmdGVyUmVuZGVyKSB7XG4gICAgICAgICAgICBtb3VudCgpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogR2V0cyBhIHF1ZXJ5U2VsZWN0b3IgbmFtZSBvZiB0aGUgcHJvdmlkZXIgZWxlbWVudC5cbiAgICAgKlxuICAgICAqIEBkZXByZWNhdGVkIFVzZSBwcm92aWRlckNsYXNzTmFtZSgpIGluc3RlYWQuXG4gICAgICovXG4gICAgZ2V0IHByb3ZpZGVyU2VsZWN0b3IoKTogc3RyaW5nIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuZ2V0QXR0cmlidXRlKCdwcm92aWRlci1zZWxlY3RvcicpO1xuICAgIH1cbiAgICBwcm90ZWN0ZWQgZ2V0IHByb3ZpZGVyQ2xhc3NOYW1lKCk6IHN0cmluZyB7XG4gICAgICAgIHJldHVybiB0aGlzLmdldEF0dHJpYnV0ZSgncHJvdmlkZXItY2xhc3MtbmFtZScpO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIEdldHMgYSBxdWVyeVNlbGVjdG9yIG5hbWUgb2YgdGhlIHRhcmdldCBlbGVtZW50LlxuICAgICAqXG4gICAgICogQGRlcHJlY2F0ZWQgVXNlIHRhcmdldENsYXNzTmFtZSgpIGluc3RlYWQuXG4gICAgICovXG4gICAgZ2V0IHRhcmdldFNlbGVjdG9yKCk6IHN0cmluZyB7XG4gICAgICAgIHJldHVybiB0aGlzLmdldEF0dHJpYnV0ZSgndGFyZ2V0LXNlbGVjdG9yJyk7XG4gICAgfVxuICAgIHByb3RlY3RlZCBnZXQgdGFyZ2V0Q2xhc3NOYW1lKCk6IHN0cmluZyB7XG4gICAgICAgIHJldHVybiB0aGlzLmdldEF0dHJpYnV0ZSgndGFyZ2V0LWNsYXNzLW5hbWUnKTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBHZXRzIGlmIHRoZSByZXNwb25zZSBmcm9tIHRoZSBzZXJ2ZXIgaXMgZW1wdHkuXG4gICAgICovXG4gICAgZ2V0IHJlbmRlcklmUmVzcG9uc2VJc0VtcHR5KCk6IGJvb2xlYW4ge1xuICAgICAgICByZXR1cm4gdGhpcy5oYXNBdHRyaWJ1dGUoJ3JlbmRlci1pZi1yZXNwb25zZS1pcy1lbXB0eScpO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIEdldHMgaWYgdGhlIGNvbXBvbmVudCBpcyBtb3VudGVkIGFmdGVyIHJlbmRlcmluZy5cbiAgICAgKi9cbiAgICBnZXQgbW91bnRBZnRlclJlbmRlcigpOiBib29sZWFuIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuaGFzQXR0cmlidXRlKCdtb3VudC1hZnRlci1yZW5kZXInKTtcbiAgICB9XG59XG4iXSwic291cmNlUm9vdCI6IiJ9