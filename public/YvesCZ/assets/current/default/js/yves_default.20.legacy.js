(window["webpackJsonp_yves_default"] = window["webpackJsonp_yves_default"] || []).push([[20],{

/***/ "./src/Pyz/Yves/ShopUi/Theme/default/components/molecules/breadcrumb-step/breadcrumb-step.ts":
/*!***************************************************************************************************!*\
  !*** ./src/Pyz/Yves/ShopUi/Theme/default/components/molecules/breadcrumb-step/breadcrumb-step.ts ***!
  \***************************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return BreadcrumbStep; });
/* harmony import */ var _babel_runtime_helpers_possibleConstructorReturn__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @babel/runtime/helpers/possibleConstructorReturn */ "./node_modules/@babel/runtime/helpers/possibleConstructorReturn.js");
/* harmony import */ var _babel_runtime_helpers_possibleConstructorReturn__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_possibleConstructorReturn__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _babel_runtime_helpers_getPrototypeOf__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @babel/runtime/helpers/getPrototypeOf */ "./node_modules/@babel/runtime/helpers/getPrototypeOf.js");
/* harmony import */ var _babel_runtime_helpers_getPrototypeOf__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_getPrototypeOf__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _babel_runtime_helpers_inheritsLoose__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @babel/runtime/helpers/inheritsLoose */ "./node_modules/@babel/runtime/helpers/inheritsLoose.js");
/* harmony import */ var _babel_runtime_helpers_inheritsLoose__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_inheritsLoose__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var ShopUi_models_component__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ShopUi/models/component */ "./vendor/spryker-shop/shop-ui/src/SprykerShop/Yves/ShopUi/Theme/default/models/component.ts");




function _createSuper(Derived) { return function () { var Super = _babel_runtime_helpers_getPrototypeOf__WEBPACK_IMPORTED_MODULE_1___default()(Derived), result; if (_isNativeReflectConstruct()) { var NewTarget = _babel_runtime_helpers_getPrototypeOf__WEBPACK_IMPORTED_MODULE_1___default()(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _babel_runtime_helpers_possibleConstructorReturn__WEBPACK_IMPORTED_MODULE_0___default()(this, result); }; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Date.prototype.toString.call(Reflect.construct(Date, [], function () {})); return true; } catch (e) { return false; } }



var BreadcrumbStep = /*#__PURE__*/function (_Component) {
  _babel_runtime_helpers_inheritsLoose__WEBPACK_IMPORTED_MODULE_2___default()(BreadcrumbStep, _Component);

  var _super = _createSuper(BreadcrumbStep);

  function BreadcrumbStep() {
    return _Component.apply(this, arguments) || this;
  }

  var _proto = BreadcrumbStep.prototype;

  _proto.readyCallback = function readyCallback() {};

  _proto.init = function init() {
    this.removeLinkToForwardedBreadCrumbs();
  };

  _proto.removeLinkToForwardedBreadCrumbs = function removeLinkToForwardedBreadCrumbs() {
    var breadCrumbHolder = this.parentElement;
    var activeBreadCrumb = breadCrumbHolder.querySelector('.breadcrumb-step--active');
    if (!activeBreadCrumb) return;
    var nextSibling = activeBreadCrumb.nextElementSibling;

    while (nextSibling) {
      var breadCrumbLink = nextSibling.querySelector('a');

      if (breadCrumbLink !== null) {
        breadCrumbLink.removeAttribute('href');
        breadCrumbLink.style.cursor = 'auto';
      }

      nextSibling = nextSibling.nextElementSibling;
    }
  };

  return BreadcrumbStep;
}(ShopUi_models_component__WEBPACK_IMPORTED_MODULE_3__["default"]);



/***/ })

}]);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vLi9zcmMvUHl6L1l2ZXMvU2hvcFVpL1RoZW1lL2RlZmF1bHQvY29tcG9uZW50cy9tb2xlY3VsZXMvYnJlYWRjcnVtYi1zdGVwL2JyZWFkY3J1bWItc3RlcC50cyJdLCJuYW1lcyI6WyJCcmVhZGNydW1iU3RlcCIsInJlYWR5Q2FsbGJhY2siLCJpbml0IiwicmVtb3ZlTGlua1RvRm9yd2FyZGVkQnJlYWRDcnVtYnMiLCJicmVhZENydW1iSG9sZGVyIiwicGFyZW50RWxlbWVudCIsImFjdGl2ZUJyZWFkQ3J1bWIiLCJxdWVyeVNlbGVjdG9yIiwibmV4dFNpYmxpbmciLCJuZXh0RWxlbWVudFNpYmxpbmciLCJicmVhZENydW1iTGluayIsInJlbW92ZUF0dHJpYnV0ZSIsInN0eWxlIiwiY3Vyc29yIiwiQ29tcG9uZW50Il0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQTs7SUFFcUJBLGM7Ozs7Ozs7Ozs7O1NBQ1BDLGEsR0FBVix5QkFBZ0MsQ0FDL0IsQzs7U0FFU0MsSSxHQUFWLGdCQUFpQjtBQUNiLFNBQUtDLGdDQUFMO0FBQ0gsRzs7U0FFU0EsZ0MsR0FBViw0Q0FBNkM7QUFDekMsUUFBSUMsZ0JBQWdCLEdBQUcsS0FBS0MsYUFBNUI7QUFDQSxRQUFJQyxnQkFBZ0IsR0FBR0YsZ0JBQWdCLENBQUNHLGFBQWpCLENBQStCLDBCQUEvQixDQUF2QjtBQUNBLFFBQUcsQ0FBQ0QsZ0JBQUosRUFDSTtBQUVKLFFBQUlFLFdBQVcsR0FBR0YsZ0JBQWdCLENBQUNHLGtCQUFuQzs7QUFDQSxXQUFPRCxXQUFQLEVBQW9CO0FBQ2hCLFVBQUlFLGNBQWMsR0FBR0YsV0FBVyxDQUFDRCxhQUFaLENBQTBCLEdBQTFCLENBQXJCOztBQUNBLFVBQUdHLGNBQWMsS0FBSyxJQUF0QixFQUE0QjtBQUN4QkEsc0JBQWMsQ0FBQ0MsZUFBZixDQUErQixNQUEvQjtBQUNBRCxzQkFBYyxDQUFDRSxLQUFmLENBQXFCQyxNQUFyQixHQUE4QixNQUE5QjtBQUNIOztBQUNETCxpQkFBVyxHQUFHQSxXQUFXLENBQUNDLGtCQUExQjtBQUNIO0FBRUosRzs7O0VBeEJ3Q0ssK0QiLCJmaWxlIjoiLi9qcy95dmVzX2RlZmF1bHQuMjAubGVnYWN5LmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IENvbXBvbmVudCBmcm9tICdTaG9wVWkvbW9kZWxzL2NvbXBvbmVudCc7XG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIEJyZWFkY3J1bWJTdGVwIGV4dGVuZHMgIENvbXBvbmVudCB7XG4gICAgcHJvdGVjdGVkIHJlYWR5Q2FsbGJhY2soKTogdm9pZCB7XG4gICAgfVxuXG4gICAgcHJvdGVjdGVkIGluaXQoKSB7XG4gICAgICAgIHRoaXMucmVtb3ZlTGlua1RvRm9yd2FyZGVkQnJlYWRDcnVtYnMoKTtcbiAgICB9XG5cbiAgICBwcm90ZWN0ZWQgcmVtb3ZlTGlua1RvRm9yd2FyZGVkQnJlYWRDcnVtYnMoKSB7XG4gICAgICAgIGxldCBicmVhZENydW1iSG9sZGVyID0gdGhpcy5wYXJlbnRFbGVtZW50O1xuICAgICAgICBsZXQgYWN0aXZlQnJlYWRDcnVtYiA9IGJyZWFkQ3J1bWJIb2xkZXIucXVlcnlTZWxlY3RvcignLmJyZWFkY3J1bWItc3RlcC0tYWN0aXZlJyk7XG4gICAgICAgIGlmKCFhY3RpdmVCcmVhZENydW1iKVxuICAgICAgICAgICAgcmV0dXJuXG5cbiAgICAgICAgbGV0IG5leHRTaWJsaW5nID0gYWN0aXZlQnJlYWRDcnVtYi5uZXh0RWxlbWVudFNpYmxpbmc7XG4gICAgICAgIHdoaWxlIChuZXh0U2libGluZykge1xuICAgICAgICAgICAgbGV0IGJyZWFkQ3J1bWJMaW5rID0gbmV4dFNpYmxpbmcucXVlcnlTZWxlY3RvcignYScpO1xuICAgICAgICAgICAgaWYoYnJlYWRDcnVtYkxpbmsgIT09IG51bGwpIHtcbiAgICAgICAgICAgICAgICBicmVhZENydW1iTGluay5yZW1vdmVBdHRyaWJ1dGUoJ2hyZWYnKTtcbiAgICAgICAgICAgICAgICBicmVhZENydW1iTGluay5zdHlsZS5jdXJzb3IgPSAnYXV0byc7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBuZXh0U2libGluZyA9IG5leHRTaWJsaW5nLm5leHRFbGVtZW50U2libGluZztcbiAgICAgICAgfVxuXG4gICAgfVxuXG59XG4iXSwic291cmNlUm9vdCI6IiJ9