(window["webpackJsonp_yves_default"] = window["webpackJsonp_yves_default"] || []).push([[21],{

/***/ "./src/Pyz/Yves/ShopUi/Theme/default/components/molecules/cms-page-collapse-block/cms-page-collapse-block.ts":
/*!*******************************************************************************************************************!*\
  !*** ./src/Pyz/Yves/ShopUi/Theme/default/components/molecules/cms-page-collapse-block/cms-page-collapse-block.ts ***!
  \*******************************************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return CmsPageCollapseBlock; });
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



var CmsPageCollapseBlock = /*#__PURE__*/function (_Component) {
  _babel_runtime_helpers_inheritsLoose__WEBPACK_IMPORTED_MODULE_4___default()(CmsPageCollapseBlock, _Component);

  var _super = _createSuper(CmsPageCollapseBlock);

  function CmsPageCollapseBlock() {
    var _this;

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this = _Component.call.apply(_Component, [this].concat(args)) || this;

    _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_5___default()(_babel_runtime_helpers_assertThisInitialized__WEBPACK_IMPORTED_MODULE_1___default()(_this), "container", void 0);

    _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_5___default()(_babel_runtime_helpers_assertThisInitialized__WEBPACK_IMPORTED_MODULE_1___default()(_this), "collapsibleHeaders", void 0);

    return _this;
  }

  var _proto = CmsPageCollapseBlock.prototype;

  _proto.readyCallback = function readyCallback() {};

  _proto.init = function init() {
    this.container = document.getElementsByClassName(this.collapseContainerClassName)[0];
    this.collapsibleHeaders = Array.from(this.container.querySelectorAll("." + this.collapseHeaderClassName));
    this.initCollapsible();
  };

  _proto.initCollapsible = function initCollapsible() {
    var _this2 = this;

    this.collapsibleHeaders.map(function (item) {
      item.addEventListener('click', function (event) {
        event.preventDefault();
        var targetElement = event.target;
        targetElement.toggleAttribute('aria-expanded');
        var targetAttribute = targetElement.getAttribute('href');

        _this2.container.querySelector(targetAttribute).classList.toggle(_this2.collapseContentInactiveClassName);

        _this2.container.querySelector(targetAttribute).classList.toggle(_this2.collapseContentActiveClassName);
      });
    });
  };

  _babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_0___default()(CmsPageCollapseBlock, [{
    key: "collapseContainerClassName",
    get: function get() {
      return this.getAttribute('collapsible-container');
    }
  }, {
    key: "collapseHeaderClassName",
    get: function get() {
      return this.getAttribute('collapsible-header');
    }
  }, {
    key: "collapseContentActiveClassName",
    get: function get() {
      return this.getAttribute('collapsible-block-active-class');
    }
  }, {
    key: "collapseContentInactiveClassName",
    get: function get() {
      return this.getAttribute('collapsible-block-inactive-class');
    }
  }]);

  return CmsPageCollapseBlock;
}(ShopUi_models_component__WEBPACK_IMPORTED_MODULE_6__["default"]);



/***/ })

}]);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vLi9zcmMvUHl6L1l2ZXMvU2hvcFVpL1RoZW1lL2RlZmF1bHQvY29tcG9uZW50cy9tb2xlY3VsZXMvY21zLXBhZ2UtY29sbGFwc2UtYmxvY2svY21zLXBhZ2UtY29sbGFwc2UtYmxvY2sudHMiXSwibmFtZXMiOlsiQ21zUGFnZUNvbGxhcHNlQmxvY2siLCJyZWFkeUNhbGxiYWNrIiwiaW5pdCIsImNvbnRhaW5lciIsImRvY3VtZW50IiwiZ2V0RWxlbWVudHNCeUNsYXNzTmFtZSIsImNvbGxhcHNlQ29udGFpbmVyQ2xhc3NOYW1lIiwiY29sbGFwc2libGVIZWFkZXJzIiwiQXJyYXkiLCJmcm9tIiwicXVlcnlTZWxlY3RvckFsbCIsImNvbGxhcHNlSGVhZGVyQ2xhc3NOYW1lIiwiaW5pdENvbGxhcHNpYmxlIiwibWFwIiwiaXRlbSIsImFkZEV2ZW50TGlzdGVuZXIiLCJldmVudCIsInByZXZlbnREZWZhdWx0IiwidGFyZ2V0RWxlbWVudCIsInRhcmdldCIsInRvZ2dsZUF0dHJpYnV0ZSIsInRhcmdldEF0dHJpYnV0ZSIsImdldEF0dHJpYnV0ZSIsInF1ZXJ5U2VsZWN0b3IiLCJjbGFzc0xpc3QiLCJ0b2dnbGUiLCJjb2xsYXBzZUNvbnRlbnRJbmFjdGl2ZUNsYXNzTmFtZSIsImNvbGxhcHNlQ29udGVudEFjdGl2ZUNsYXNzTmFtZSIsIkNvbXBvbmVudCJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUE7O0lBRXFCQSxvQjs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7U0FJUEMsYSxHQUFWLHlCQUFnQyxDQUFFLEM7O1NBRXhCQyxJLEdBQVYsZ0JBQXVCO0FBQ25CLFNBQUtDLFNBQUwsR0FBOEJDLFFBQVEsQ0FBQ0Msc0JBQVQsQ0FBZ0MsS0FBS0MsMEJBQXJDLEVBQWlFLENBQWpFLENBQTlCO0FBQ0EsU0FBS0Msa0JBQUwsR0FBMEJDLEtBQUssQ0FBQ0MsSUFBTixDQUFXLEtBQUtOLFNBQUwsQ0FBZU8sZ0JBQWYsT0FBb0MsS0FBS0MsdUJBQXpDLENBQVgsQ0FBMUI7QUFDQSxTQUFLQyxlQUFMO0FBQ0gsRzs7U0FFU0EsZSxHQUFWLDJCQUFrQztBQUFBOztBQUM5QixTQUFLTCxrQkFBTCxDQUF3Qk0sR0FBeEIsQ0FBNEIsVUFBQUMsSUFBSSxFQUFJO0FBQ2hDQSxVQUFJLENBQUNDLGdCQUFMLENBQXNCLE9BQXRCLEVBQStCLFVBQUNDLEtBQUQsRUFBa0I7QUFDN0NBLGFBQUssQ0FBQ0MsY0FBTjtBQUNBLFlBQU1DLGFBQTBCLEdBQWdCRixLQUFLLENBQUNHLE1BQXREO0FBQ0FELHFCQUFhLENBQUNFLGVBQWQsQ0FBOEIsZUFBOUI7QUFDQSxZQUFNQyxlQUFlLEdBQUdILGFBQWEsQ0FBQ0ksWUFBZCxDQUEyQixNQUEzQixDQUF4Qjs7QUFDQSxjQUFJLENBQUNuQixTQUFMLENBQWVvQixhQUFmLENBQTZCRixlQUE3QixFQUE4Q0csU0FBOUMsQ0FBd0RDLE1BQXhELENBQStELE1BQUksQ0FBQ0MsZ0NBQXBFOztBQUNBLGNBQUksQ0FBQ3ZCLFNBQUwsQ0FBZW9CLGFBQWYsQ0FBNkJGLGVBQTdCLEVBQThDRyxTQUE5QyxDQUF3REMsTUFBeEQsQ0FBK0QsTUFBSSxDQUFDRSw4QkFBcEU7QUFDSCxPQVBEO0FBUUgsS0FURDtBQVVILEc7Ozs7d0JBRWtEO0FBQy9DLGFBQU8sS0FBS0wsWUFBTCxDQUFrQix1QkFBbEIsQ0FBUDtBQUNIOzs7d0JBRStDO0FBQzVDLGFBQU8sS0FBS0EsWUFBTCxDQUFrQixvQkFBbEIsQ0FBUDtBQUNIOzs7d0JBRXNEO0FBQ25ELGFBQU8sS0FBS0EsWUFBTCxDQUFrQixnQ0FBbEIsQ0FBUDtBQUNIOzs7d0JBRXdEO0FBQ3JELGFBQU8sS0FBS0EsWUFBTCxDQUFrQixrQ0FBbEIsQ0FBUDtBQUNIOzs7O0VBdkM2Q00sK0QiLCJmaWxlIjoiLi9qcy95dmVzX2RlZmF1bHQuMjEubGVnYWN5LmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IENvbXBvbmVudCBmcm9tICdTaG9wVWkvbW9kZWxzL2NvbXBvbmVudCc7XG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIENtc1BhZ2VDb2xsYXBzZUJsb2NrIGV4dGVuZHMgQ29tcG9uZW50IHtcbiAgICBwcm90ZWN0ZWQgY29udGFpbmVyOiBIVE1MRWxlbWVudDtcbiAgICBwcm90ZWN0ZWQgY29sbGFwc2libGVIZWFkZXJzOiBIVE1MRWxlbWVudFtdO1xuXG4gICAgcHJvdGVjdGVkIHJlYWR5Q2FsbGJhY2soKTogdm9pZCB7fVxuXG4gICAgcHJvdGVjdGVkIGluaXQoKTogdm9pZCB7XG4gICAgICAgIHRoaXMuY29udGFpbmVyID0gPEhUTUxFbGVtZW50PmRvY3VtZW50LmdldEVsZW1lbnRzQnlDbGFzc05hbWUodGhpcy5jb2xsYXBzZUNvbnRhaW5lckNsYXNzTmFtZSlbMF07XG4gICAgICAgIHRoaXMuY29sbGFwc2libGVIZWFkZXJzID0gQXJyYXkuZnJvbSh0aGlzLmNvbnRhaW5lci5xdWVyeVNlbGVjdG9yQWxsKGAuJHt0aGlzLmNvbGxhcHNlSGVhZGVyQ2xhc3NOYW1lfWApKTtcbiAgICAgICAgdGhpcy5pbml0Q29sbGFwc2libGUoKTtcbiAgICB9XG5cbiAgICBwcm90ZWN0ZWQgaW5pdENvbGxhcHNpYmxlKCk6IHZvaWQge1xuICAgICAgICB0aGlzLmNvbGxhcHNpYmxlSGVhZGVycy5tYXAoaXRlbSA9PiB7XG4gICAgICAgICAgICBpdGVtLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgKGV2ZW50OiBFdmVudCkgPT4ge1xuICAgICAgICAgICAgICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG4gICAgICAgICAgICAgICAgY29uc3QgdGFyZ2V0RWxlbWVudDogSFRNTEVsZW1lbnQgPSA8SFRNTEVsZW1lbnQ+ZXZlbnQudGFyZ2V0O1xuICAgICAgICAgICAgICAgIHRhcmdldEVsZW1lbnQudG9nZ2xlQXR0cmlidXRlKCdhcmlhLWV4cGFuZGVkJyk7XG4gICAgICAgICAgICAgICAgY29uc3QgdGFyZ2V0QXR0cmlidXRlID0gdGFyZ2V0RWxlbWVudC5nZXRBdHRyaWJ1dGUoJ2hyZWYnKTtcbiAgICAgICAgICAgICAgICB0aGlzLmNvbnRhaW5lci5xdWVyeVNlbGVjdG9yKHRhcmdldEF0dHJpYnV0ZSkuY2xhc3NMaXN0LnRvZ2dsZSh0aGlzLmNvbGxhcHNlQ29udGVudEluYWN0aXZlQ2xhc3NOYW1lKTtcbiAgICAgICAgICAgICAgICB0aGlzLmNvbnRhaW5lci5xdWVyeVNlbGVjdG9yKHRhcmdldEF0dHJpYnV0ZSkuY2xhc3NMaXN0LnRvZ2dsZSh0aGlzLmNvbGxhcHNlQ29udGVudEFjdGl2ZUNsYXNzTmFtZSk7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfSk7XG4gICAgfVxuXG4gICAgcHJvdGVjdGVkIGdldCBjb2xsYXBzZUNvbnRhaW5lckNsYXNzTmFtZSgpOiBzdHJpbmcge1xuICAgICAgICByZXR1cm4gdGhpcy5nZXRBdHRyaWJ1dGUoJ2NvbGxhcHNpYmxlLWNvbnRhaW5lcicpO1xuICAgIH1cblxuICAgIHByb3RlY3RlZCBnZXQgY29sbGFwc2VIZWFkZXJDbGFzc05hbWUoKTogc3RyaW5nIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuZ2V0QXR0cmlidXRlKCdjb2xsYXBzaWJsZS1oZWFkZXInKTtcbiAgICB9XG5cbiAgICBwcm90ZWN0ZWQgZ2V0IGNvbGxhcHNlQ29udGVudEFjdGl2ZUNsYXNzTmFtZSgpOiBzdHJpbmcge1xuICAgICAgICByZXR1cm4gdGhpcy5nZXRBdHRyaWJ1dGUoJ2NvbGxhcHNpYmxlLWJsb2NrLWFjdGl2ZS1jbGFzcycpO1xuICAgIH1cblxuICAgIHByb3RlY3RlZCBnZXQgY29sbGFwc2VDb250ZW50SW5hY3RpdmVDbGFzc05hbWUoKTogc3RyaW5nIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuZ2V0QXR0cmlidXRlKCdjb2xsYXBzaWJsZS1ibG9jay1pbmFjdGl2ZS1jbGFzcycpO1xuICAgIH1cbn1cbiJdLCJzb3VyY2VSb290IjoiIn0=