(window["webpackJsonp_yves_default"] = window["webpackJsonp_yves_default"] || []).push([[31],{

/***/ "./src/Pyz/Yves/ShopUi/Theme/default/components/molecules/navigation-top-mobile/navigation-top-mobile.ts":
/*!***************************************************************************************************************!*\
  !*** ./src/Pyz/Yves/ShopUi/Theme/default/components/molecules/navigation-top-mobile/navigation-top-mobile.ts ***!
  \***************************************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return NavigationTopMobile; });
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
/* harmony import */ var ShopUi_models_component__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ShopUi/models/component */ "./vendor/spryker-shop/shop-ui/src/SprykerShop/Yves/ShopUi/Theme/default/models/component.ts");







function _createSuper(Derived) { return function () { var Super = _babel_runtime_helpers_getPrototypeOf__WEBPACK_IMPORTED_MODULE_3___default()(Derived), result; if (_isNativeReflectConstruct()) { var NewTarget = _babel_runtime_helpers_getPrototypeOf__WEBPACK_IMPORTED_MODULE_3___default()(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _babel_runtime_helpers_possibleConstructorReturn__WEBPACK_IMPORTED_MODULE_2___default()(this, result); }; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Date.prototype.toString.call(Reflect.construct(Date, [], function () {})); return true; } catch (e) { return false; } }



var NavigationTopMobile = /*#__PURE__*/function (_Component) {
  _babel_runtime_helpers_inheritsLoose__WEBPACK_IMPORTED_MODULE_4___default()(NavigationTopMobile, _Component);

  var _super = _createSuper(NavigationTopMobile);

  function NavigationTopMobile() {
    var _this;

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this = _Component.call.apply(_Component, [this].concat(args)) || this;

    _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_5___default()(_babel_runtime_helpers_assertThisInitialized__WEBPACK_IMPORTED_MODULE_1___default()(_this), "mobileSearchTriggerButton", void 0);

    _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_5___default()(_babel_runtime_helpers_assertThisInitialized__WEBPACK_IMPORTED_MODULE_1___default()(_this), "mobileNavTriggerButton", void 0);

    _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_5___default()(_babel_runtime_helpers_assertThisInitialized__WEBPACK_IMPORTED_MODULE_1___default()(_this), "isMobileSearchVisible", void 0);

    _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_5___default()(_babel_runtime_helpers_assertThisInitialized__WEBPACK_IMPORTED_MODULE_1___default()(_this), "isMobileNavVisible", void 0);

    return _this;
  }

  var _proto = NavigationTopMobile.prototype;

  _proto.readyCallback = function readyCallback() {};

  _proto.init = function init() {
    this.mobileSearchTriggerButton = this.querySelector("." + this.navTriggerButtonClassName);
    this.mobileNavTriggerButton = Array.from(this.querySelectorAll("." + this.mobileNavigationClassName));
    this.isMobileSearchVisible = false;
    this.isMobileNavVisible = false;
    this.mapEvents();
  };

  _proto.mapEvents = function mapEvents() {
    var _this2 = this;

    this.mobileSearchTriggerButton.addEventListener('click', function (event) {
      return _this2.closeNavIfSearch(event);
    });
    this.mobileNavTriggerButton.map(function (button) {
      button.addEventListener('click', function (event) {
        return _this2.closeSearchIfNav(event);
      });
    });
  };

  _proto.closeNavIfSearch = function closeNavIfSearch(event) {
    this.isMobileSearchVisible = !this.isMobileSearchVisible;

    if (!this.isMobileNavVisible) {
      return;
    }

    this.mobileNavTriggerButton.map(function (button) {
      if (button.classList.contains('is-hidden')) {
        return;
      }

      button.click();
    });
    var target = event.target;
    target.click();
  };

  _proto.closeSearchIfNav = function closeSearchIfNav(event) {
    this.isMobileNavVisible = !this.isMobileNavVisible;

    if (!this.isMobileSearchVisible) {
      return;
    }

    this.mobileSearchTriggerButton.click();
    var target = event.target;
    target.click();
  };

  _babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_0___default()(NavigationTopMobile, [{
    key: "navTriggerButtonClassName",
    get: function get() {
      return this.getAttribute('mobile-search-trigger-button');
    }
  }, {
    key: "mobileNavigationClassName",
    get: function get() {
      return this.getAttribute('mobile-nav-trigger-button');
    }
  }]);

  return NavigationTopMobile;
}(ShopUi_models_component__WEBPACK_IMPORTED_MODULE_6__["default"]);



/***/ })

}]);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vLi9zcmMvUHl6L1l2ZXMvU2hvcFVpL1RoZW1lL2RlZmF1bHQvY29tcG9uZW50cy9tb2xlY3VsZXMvbmF2aWdhdGlvbi10b3AtbW9iaWxlL25hdmlnYXRpb24tdG9wLW1vYmlsZS50cyJdLCJuYW1lcyI6WyJOYXZpZ2F0aW9uVG9wTW9iaWxlIiwicmVhZHlDYWxsYmFjayIsImluaXQiLCJtb2JpbGVTZWFyY2hUcmlnZ2VyQnV0dG9uIiwicXVlcnlTZWxlY3RvciIsIm5hdlRyaWdnZXJCdXR0b25DbGFzc05hbWUiLCJtb2JpbGVOYXZUcmlnZ2VyQnV0dG9uIiwiQXJyYXkiLCJmcm9tIiwicXVlcnlTZWxlY3RvckFsbCIsIm1vYmlsZU5hdmlnYXRpb25DbGFzc05hbWUiLCJpc01vYmlsZVNlYXJjaFZpc2libGUiLCJpc01vYmlsZU5hdlZpc2libGUiLCJtYXBFdmVudHMiLCJhZGRFdmVudExpc3RlbmVyIiwiZXZlbnQiLCJjbG9zZU5hdklmU2VhcmNoIiwibWFwIiwiYnV0dG9uIiwiY2xvc2VTZWFyY2hJZk5hdiIsImNsYXNzTGlzdCIsImNvbnRhaW5zIiwiY2xpY2siLCJ0YXJnZXQiLCJnZXRBdHRyaWJ1dGUiLCJDb21wb25lbnQiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUFBOztJQUVxQkEsbUI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztTQU1QQyxhLEdBQVYseUJBQWdDLENBQUUsQzs7U0FFeEJDLEksR0FBVixnQkFBdUI7QUFDbkIsU0FBS0MseUJBQUwsR0FBaUMsS0FBS0MsYUFBTCxPQUF1QixLQUFLQyx5QkFBNUIsQ0FBakM7QUFDQSxTQUFLQyxzQkFBTCxHQUE4QkMsS0FBSyxDQUFDQyxJQUFOLENBQVcsS0FBS0MsZ0JBQUwsT0FBMEIsS0FBS0MseUJBQS9CLENBQVgsQ0FBOUI7QUFDQSxTQUFLQyxxQkFBTCxHQUE2QixLQUE3QjtBQUNBLFNBQUtDLGtCQUFMLEdBQTBCLEtBQTFCO0FBQ0EsU0FBS0MsU0FBTDtBQUNILEc7O1NBRVNBLFMsR0FBVixxQkFBNEI7QUFBQTs7QUFDeEIsU0FBS1YseUJBQUwsQ0FBK0JXLGdCQUEvQixDQUFnRCxPQUFoRCxFQUF5RCxVQUFDQyxLQUFEO0FBQUEsYUFBa0IsTUFBSSxDQUFDQyxnQkFBTCxDQUFzQkQsS0FBdEIsQ0FBbEI7QUFBQSxLQUF6RDtBQUNBLFNBQUtULHNCQUFMLENBQTRCVyxHQUE1QixDQUFnQyxVQUFBQyxNQUFNLEVBQUk7QUFDdENBLFlBQU0sQ0FBQ0osZ0JBQVAsQ0FBd0IsT0FBeEIsRUFBaUMsVUFBQ0MsS0FBRDtBQUFBLGVBQWtCLE1BQUksQ0FBQ0ksZ0JBQUwsQ0FBc0JKLEtBQXRCLENBQWxCO0FBQUEsT0FBakM7QUFDSCxLQUZEO0FBR0gsRzs7U0FFU0MsZ0IsR0FBViwwQkFBMkJELEtBQTNCLEVBQStDO0FBQzNDLFNBQUtKLHFCQUFMLEdBQTZCLENBQUMsS0FBS0EscUJBQW5DOztBQUNBLFFBQUksQ0FBQyxLQUFLQyxrQkFBVixFQUE4QjtBQUMxQjtBQUNIOztBQUVELFNBQUtOLHNCQUFMLENBQTRCVyxHQUE1QixDQUFnQyxVQUFBQyxNQUFNLEVBQUk7QUFDdEMsVUFBSUEsTUFBTSxDQUFDRSxTQUFQLENBQWlCQyxRQUFqQixDQUEwQixXQUExQixDQUFKLEVBQTRDO0FBQ3hDO0FBQ0g7O0FBQ0RILFlBQU0sQ0FBQ0ksS0FBUDtBQUNILEtBTEQ7QUFPQSxRQUFNQyxNQUFNLEdBQWdCUixLQUFLLENBQUNRLE1BQWxDO0FBQ0FBLFVBQU0sQ0FBQ0QsS0FBUDtBQUNILEc7O1NBRVNILGdCLEdBQVYsMEJBQTJCSixLQUEzQixFQUErQztBQUMzQyxTQUFLSCxrQkFBTCxHQUEwQixDQUFDLEtBQUtBLGtCQUFoQzs7QUFDQSxRQUFJLENBQUMsS0FBS0QscUJBQVYsRUFBaUM7QUFDN0I7QUFDSDs7QUFFRCxTQUFLUix5QkFBTCxDQUErQm1CLEtBQS9CO0FBQ0EsUUFBTUMsTUFBTSxHQUFnQlIsS0FBSyxDQUFDUSxNQUFsQztBQUNBQSxVQUFNLENBQUNELEtBQVA7QUFDSCxHOzs7O3dCQUVpRDtBQUM5QyxhQUFPLEtBQUtFLFlBQUwsQ0FBa0IsOEJBQWxCLENBQVA7QUFDSDs7O3dCQUVpRDtBQUM5QyxhQUFPLEtBQUtBLFlBQUwsQ0FBa0IsMkJBQWxCLENBQVA7QUFDSDs7OztFQXpENENDLCtEIiwiZmlsZSI6Ii4vanMveXZlc19kZWZhdWx0LjMxLmxlZ2FjeS5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBDb21wb25lbnQgZnJvbSAnU2hvcFVpL21vZGVscy9jb21wb25lbnQnO1xuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBOYXZpZ2F0aW9uVG9wTW9iaWxlIGV4dGVuZHMgQ29tcG9uZW50IHtcbiAgICBwcm90ZWN0ZWQgbW9iaWxlU2VhcmNoVHJpZ2dlckJ1dHRvbjogSFRNTEJ1dHRvbkVsZW1lbnQ7XG4gICAgcHJvdGVjdGVkIG1vYmlsZU5hdlRyaWdnZXJCdXR0b246IEhUTUxFbGVtZW50W107XG4gICAgcHJvdGVjdGVkIGlzTW9iaWxlU2VhcmNoVmlzaWJsZTogQm9vbGVhbjtcbiAgICBwcm90ZWN0ZWQgaXNNb2JpbGVOYXZWaXNpYmxlOiBCb29sZWFuO1xuXG4gICAgcHJvdGVjdGVkIHJlYWR5Q2FsbGJhY2soKTogdm9pZCB7fVxuXG4gICAgcHJvdGVjdGVkIGluaXQoKTogdm9pZCB7XG4gICAgICAgIHRoaXMubW9iaWxlU2VhcmNoVHJpZ2dlckJ1dHRvbiA9IHRoaXMucXVlcnlTZWxlY3RvcihgLiR7dGhpcy5uYXZUcmlnZ2VyQnV0dG9uQ2xhc3NOYW1lfWApO1xuICAgICAgICB0aGlzLm1vYmlsZU5hdlRyaWdnZXJCdXR0b24gPSBBcnJheS5mcm9tKHRoaXMucXVlcnlTZWxlY3RvckFsbChgLiR7dGhpcy5tb2JpbGVOYXZpZ2F0aW9uQ2xhc3NOYW1lfWApKTtcbiAgICAgICAgdGhpcy5pc01vYmlsZVNlYXJjaFZpc2libGUgPSBmYWxzZTtcbiAgICAgICAgdGhpcy5pc01vYmlsZU5hdlZpc2libGUgPSBmYWxzZTtcbiAgICAgICAgdGhpcy5tYXBFdmVudHMoKTtcbiAgICB9XG5cbiAgICBwcm90ZWN0ZWQgbWFwRXZlbnRzKCk6IHZvaWQge1xuICAgICAgICB0aGlzLm1vYmlsZVNlYXJjaFRyaWdnZXJCdXR0b24uYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCAoZXZlbnQ6IEV2ZW50KSA9PiB0aGlzLmNsb3NlTmF2SWZTZWFyY2goZXZlbnQpKTtcbiAgICAgICAgdGhpcy5tb2JpbGVOYXZUcmlnZ2VyQnV0dG9uLm1hcChidXR0b24gPT4ge1xuICAgICAgICAgICAgYnV0dG9uLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgKGV2ZW50OiBFdmVudCkgPT4gdGhpcy5jbG9zZVNlYXJjaElmTmF2KGV2ZW50KSk7XG4gICAgICAgIH0pO1xuICAgIH1cblxuICAgIHByb3RlY3RlZCBjbG9zZU5hdklmU2VhcmNoKGV2ZW50OiBFdmVudCk6IHZvaWQge1xuICAgICAgICB0aGlzLmlzTW9iaWxlU2VhcmNoVmlzaWJsZSA9ICF0aGlzLmlzTW9iaWxlU2VhcmNoVmlzaWJsZTtcbiAgICAgICAgaWYgKCF0aGlzLmlzTW9iaWxlTmF2VmlzaWJsZSkge1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG5cbiAgICAgICAgdGhpcy5tb2JpbGVOYXZUcmlnZ2VyQnV0dG9uLm1hcChidXR0b24gPT4ge1xuICAgICAgICAgICAgaWYgKGJ1dHRvbi5jbGFzc0xpc3QuY29udGFpbnMoJ2lzLWhpZGRlbicpKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgYnV0dG9uLmNsaWNrKCk7XG4gICAgICAgIH0pO1xuXG4gICAgICAgIGNvbnN0IHRhcmdldCA9IDxIVE1MRWxlbWVudD5ldmVudC50YXJnZXQ7XG4gICAgICAgIHRhcmdldC5jbGljaygpO1xuICAgIH1cblxuICAgIHByb3RlY3RlZCBjbG9zZVNlYXJjaElmTmF2KGV2ZW50OiBFdmVudCk6IHZvaWQge1xuICAgICAgICB0aGlzLmlzTW9iaWxlTmF2VmlzaWJsZSA9ICF0aGlzLmlzTW9iaWxlTmF2VmlzaWJsZTtcbiAgICAgICAgaWYgKCF0aGlzLmlzTW9iaWxlU2VhcmNoVmlzaWJsZSkge1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG5cbiAgICAgICAgdGhpcy5tb2JpbGVTZWFyY2hUcmlnZ2VyQnV0dG9uLmNsaWNrKCk7XG4gICAgICAgIGNvbnN0IHRhcmdldCA9IDxIVE1MRWxlbWVudD5ldmVudC50YXJnZXQ7XG4gICAgICAgIHRhcmdldC5jbGljaygpO1xuICAgIH1cblxuICAgIHByb3RlY3RlZCBnZXQgbmF2VHJpZ2dlckJ1dHRvbkNsYXNzTmFtZSgpOiBzdHJpbmcge1xuICAgICAgICByZXR1cm4gdGhpcy5nZXRBdHRyaWJ1dGUoJ21vYmlsZS1zZWFyY2gtdHJpZ2dlci1idXR0b24nKTtcbiAgICB9XG5cbiAgICBwcm90ZWN0ZWQgZ2V0IG1vYmlsZU5hdmlnYXRpb25DbGFzc05hbWUoKTogc3RyaW5nIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuZ2V0QXR0cmlidXRlKCdtb2JpbGUtbmF2LXRyaWdnZXItYnV0dG9uJyk7XG4gICAgfVxufVxuIl0sInNvdXJjZVJvb3QiOiIifQ==