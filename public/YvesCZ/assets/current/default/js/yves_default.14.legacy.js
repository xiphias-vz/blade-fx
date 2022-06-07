(window["webpackJsonp_yves_default"] = window["webpackJsonp_yves_default"] || []).push([[14],{

/***/ "./src/Pyz/Yves/ContentNavigationWidget/Theme/default/views/navigation-header/navigation-header.ts":
/*!*********************************************************************************************************!*\
  !*** ./src/Pyz/Yves/ContentNavigationWidget/Theme/default/views/navigation-header/navigation-header.ts ***!
  \*********************************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return NavigationHeader; });
/* harmony import */ var _babel_runtime_helpers_assertThisInitialized__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @babel/runtime/helpers/assertThisInitialized */ "./node_modules/@babel/runtime/helpers/assertThisInitialized.js");
/* harmony import */ var _babel_runtime_helpers_assertThisInitialized__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_assertThisInitialized__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _babel_runtime_helpers_possibleConstructorReturn__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @babel/runtime/helpers/possibleConstructorReturn */ "./node_modules/@babel/runtime/helpers/possibleConstructorReturn.js");
/* harmony import */ var _babel_runtime_helpers_possibleConstructorReturn__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_possibleConstructorReturn__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _babel_runtime_helpers_getPrototypeOf__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @babel/runtime/helpers/getPrototypeOf */ "./node_modules/@babel/runtime/helpers/getPrototypeOf.js");
/* harmony import */ var _babel_runtime_helpers_getPrototypeOf__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_getPrototypeOf__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _babel_runtime_helpers_inheritsLoose__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @babel/runtime/helpers/inheritsLoose */ "./node_modules/@babel/runtime/helpers/inheritsLoose.js");
/* harmony import */ var _babel_runtime_helpers_inheritsLoose__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_inheritsLoose__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @babel/runtime/helpers/defineProperty */ "./node_modules/@babel/runtime/helpers/defineProperty.js");
/* harmony import */ var _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var ShopUi_models_component__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ShopUi/models/component */ "./vendor/spryker-shop/shop-ui/src/SprykerShop/Yves/ShopUi/Theme/default/models/component.ts");






function _createSuper(Derived) { return function () { var Super = _babel_runtime_helpers_getPrototypeOf__WEBPACK_IMPORTED_MODULE_2___default()(Derived), result; if (_isNativeReflectConstruct()) { var NewTarget = _babel_runtime_helpers_getPrototypeOf__WEBPACK_IMPORTED_MODULE_2___default()(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _babel_runtime_helpers_possibleConstructorReturn__WEBPACK_IMPORTED_MODULE_1___default()(this, result); }; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Date.prototype.toString.call(Reflect.construct(Date, [], function () {})); return true; } catch (e) { return false; } }



var NavigationHeader = /*#__PURE__*/function (_Component) {
  _babel_runtime_helpers_inheritsLoose__WEBPACK_IMPORTED_MODULE_3___default()(NavigationHeader, _Component);

  var _super = _createSuper(NavigationHeader);

  function NavigationHeader() {
    var _this;

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this = _Component.call.apply(_Component, [this].concat(args)) || this;

    _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_4___default()(_babel_runtime_helpers_assertThisInitialized__WEBPACK_IMPORTED_MODULE_0___default()(_this), "asnPrice", void 0);

    _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_4___default()(_babel_runtime_helpers_assertThisInitialized__WEBPACK_IMPORTED_MODULE_0___default()(_this), "defaultClassName", 'icon-globus-leaf-default-md');

    _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_4___default()(_babel_runtime_helpers_assertThisInitialized__WEBPACK_IMPORTED_MODULE_0___default()(_this), "categoryClass", 'category-filter-style');

    _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_4___default()(_babel_runtime_helpers_assertThisInitialized__WEBPACK_IMPORTED_MODULE_0___default()(_this), "categoryClassDiv", 'category-filter-style-div');

    _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_4___default()(_babel_runtime_helpers_assertThisInitialized__WEBPACK_IMPORTED_MODULE_0___default()(_this), "navigationButton", void 0);

    _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_4___default()(_babel_runtime_helpers_assertThisInitialized__WEBPACK_IMPORTED_MODULE_0___default()(_this), "navigationContainer", void 0);

    _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_4___default()(_babel_runtime_helpers_assertThisInitialized__WEBPACK_IMPORTED_MODULE_0___default()(_this), "classData", {
      'Fachtmetzgerei': 'icon-butcher-md',
      'Fachmetzgerei': 'icon-butcher-md',
      'Süßes & Salziges': 'icon-sweet-and-savoury-md',
      'Wurst & Käse': 'icon-sausage-and-cheese-md',
      'Bäckerei': 'icon-baker-md',
      'Meisterbäckerei': 'icon-baker-md',
      'Fleich & Fisch': 'icon-meat-sausages-fish-md',
      'Tiefkühl': 'icon-ready-meals-md',
      'Angebote': 'icon-offer-md',
      'Obst & Gemüse': 'icon-fruit-and-vegetables-md',
      'Spiel- & Schreibwaren': 'icon-games-md',
      'Spiel & Schreibwaren': 'icon-games-md',
      'Körperpflege & Kosmetik': 'icon-cosmetics-md',
      'Frische Produkte': 'icon-fresh-product-md',
      'Vorratsschrank': 'icon-pantry-md',
      'Freizeit, Tier & Auto': 'icon-animals-md',
      'Baby & Schwangerschaft': 'icon-baby-md',
      'Elektronik': 'icon-electronics-md',
      'Textil & Schmuck': 'icon-clothes-md',
      'Getränke': 'icon-drinks-md',
      'Fertiggerichte & Tiefkühl': 'icon-ready-meals-md',
      'Fisch & Fleisch': 'icon-meat-md',
      'Fleisch & Fisch': 'icon-meat-md',
      'Haushalt': 'icon-household-md'
    });

    _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_4___default()(_babel_runtime_helpers_assertThisInitialized__WEBPACK_IMPORTED_MODULE_0___default()(_this), "map", void 0);

    return _this;
  }

  var _proto = NavigationHeader.prototype;

  _proto.init = function init() {
    var _this2 = this;

    _Component.prototype.init.call(this);

    this.map = new Map(Object.entries(this.classData));

    if (document.readyState === 'interactive' || document.readyState === 'complete') {
      window.addEventListener('DOMNodeInserted', function (nodeInsertedEvent) {
        if (nodeInsertedEvent.relatedNode.localName === 'ff-navigation-item') {
          var anchor = nodeInsertedEvent.relatedNode.querySelector('.navigation-icon');

          if (anchor !== undefined && anchor !== null) {
            var className = _this2.getClassName(anchor.innerText.trim());

            if (nodeInsertedEvent.relatedNode.hasAttribute('cluster-level')) {
              if (nodeInsertedEvent.relatedNode.getAttribute('cluster-level') === '0') {
                _this2.addClasses(anchor, className, 'span');
              }
            }
          }
        }
      });
      this.navigationButton = document.getElementsByClassName('button__all-products')[0];
      this.navigationContainer = document.getElementsByClassName('js-header__navigation-target')[0];
      this.addButtonEventListener();
    }
  };

  _proto.readyCallback = function readyCallback() {};

  _proto.getClassName = function getClassName(text) {
    text = text.trim();
    var className = this.map.get(text);

    if (className === undefined || className === null || className.length < 1) {
      className = this.defaultClassName;
    }

    return className;
  };

  _proto.addClasses = function addClasses(element, className, flag) {
    element.classList.add(className);

    if (flag === 'div') {
      element.classList.add(this.categoryClassDiv);
    } else {
      element.classList.add(this.categoryClass);
    }
  };

  _proto.addButtonEventListener = function addButtonEventListener() {
    var _this3 = this;

    if (this.navigationButton !== undefined && this.navigationContainer !== undefined) {
      this.navigationButton.addEventListener('mouseover', function () {
        if (_this3.navigationContainer.classList.contains('is-hidden')) {
          _this3.navigationContainer.classList.remove('is-hidden');
        }
      });
      this.navigationContainer.addEventListener('mouseleave', function () {
        if (!_this3.navigationContainer.classList.contains('is-hidden')) {
          _this3.navigationContainer.classList.add('is-hidden');
        }
      });
    }
  };

  return NavigationHeader;
}(ShopUi_models_component__WEBPACK_IMPORTED_MODULE_5__["default"]);



/***/ })

}]);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vLi9zcmMvUHl6L1l2ZXMvQ29udGVudE5hdmlnYXRpb25XaWRnZXQvVGhlbWUvZGVmYXVsdC92aWV3cy9uYXZpZ2F0aW9uLWhlYWRlci9uYXZpZ2F0aW9uLWhlYWRlci50cyJdLCJuYW1lcyI6WyJOYXZpZ2F0aW9uSGVhZGVyIiwiaW5pdCIsIm1hcCIsIk1hcCIsIk9iamVjdCIsImVudHJpZXMiLCJjbGFzc0RhdGEiLCJkb2N1bWVudCIsInJlYWR5U3RhdGUiLCJ3aW5kb3ciLCJhZGRFdmVudExpc3RlbmVyIiwibm9kZUluc2VydGVkRXZlbnQiLCJyZWxhdGVkTm9kZSIsImxvY2FsTmFtZSIsImFuY2hvciIsInF1ZXJ5U2VsZWN0b3IiLCJ1bmRlZmluZWQiLCJjbGFzc05hbWUiLCJnZXRDbGFzc05hbWUiLCJpbm5lclRleHQiLCJ0cmltIiwiaGFzQXR0cmlidXRlIiwiZ2V0QXR0cmlidXRlIiwiYWRkQ2xhc3NlcyIsIm5hdmlnYXRpb25CdXR0b24iLCJnZXRFbGVtZW50c0J5Q2xhc3NOYW1lIiwibmF2aWdhdGlvbkNvbnRhaW5lciIsImFkZEJ1dHRvbkV2ZW50TGlzdGVuZXIiLCJyZWFkeUNhbGxiYWNrIiwidGV4dCIsImdldCIsImxlbmd0aCIsImRlZmF1bHRDbGFzc05hbWUiLCJlbGVtZW50IiwiZmxhZyIsImNsYXNzTGlzdCIsImFkZCIsImNhdGVnb3J5Q2xhc3NEaXYiLCJjYXRlZ29yeUNsYXNzIiwiY29udGFpbnMiLCJyZW1vdmUiLCJDb21wb25lbnQiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUFBOztJQUVxQkEsZ0I7Ozs7Ozs7Ozs7Ozs7Ozs7aU1BR2tCLDZCOzs4TEFDSCx1Qjs7aU1BQ0csMkI7Ozs7OzswTEFJYjtBQUNsQix3QkFBa0IsaUJBREE7QUFFbEIsdUJBQWlCLGlCQUZDO0FBR2xCLDBCQUFvQiwyQkFIRjtBQUlsQixzQkFBZ0IsNEJBSkU7QUFLbEIsa0JBQVksZUFMTTtB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QkQsYUFBTyxDQUFDRSxTQUFSLENBQWtCQyxHQUFsQixDQUFzQixLQUFLQyxnQkFBM0I7QUFDSCxLQUZELE1BRU87QUFDSEosYUFBTyxDQUFDRSxTQUFSLENBQWtCQyxHQUFsQixDQUFzQixLQUFLRSxhQUEzQjtBQUNIO0FBQ0osRzs7U0FFT1gsc0IsR0FBUixrQ0FBZ0M7QUFBQTs7QUFDNUIsUUFBRyxLQUFLSCxnQkFBTCxLQUEwQlIsU0FBMUIsSUFBdUMsS0FBS1UsbUJBQUwsS0FBNkJWLFNBQXZFLEVBQWlGO0FBQzdFLFdBQUtRLGdCQUFMLENBQXNCZCxnQkFBdEIsQ0FBdUMsV0FBdkMsRUFBb0QsWUFBTTtBQUN0RCxZQUFHLE1BQUksQ0FBQ2dCLG1CQUFMLENBQXlCUyxTQUF6QixDQUFtQ0ksUUFBbkMsQ0FBNEMsV0FBNUMsQ0FBSCxFQUE0RDtBQUN4RCxnQkFBSSxDQUFDYixtQkFBTCxDQUF5QlMsU0FBekIsQ0FBbUNLLE1BQW5DLENBQTBDLFdBQTFDO0FBQ0g7QUFDSixPQUpEO0FBTUEsV0FBS2QsbUJBQUwsQ0FBeUJoQixnQkFBekIsQ0FBMEMsWUFBMUMsRUFBd0QsWUFBTTtBQUMxRCxZQUFHLENBQUMsTUFBSSxDQUFDZ0IsbUJBQUwsQ0FBeUJTLFNBQXpCLENBQW1DSSxRQUFuQyxDQUE0QyxXQUE1QyxDQUFKLEVBQTZEO0FBQ3pELGdCQUFJLENBQUNiLG1CQUFMLENBQXlCUyxTQUF6QixDQUFtQ0MsR0FBbkMsQ0FBdUMsV0FBdkM7QUFDSDtBQUNKLE9BSkQ7QUFLSDtBQUNKLEc7OztFQW5HeUNLLCtEIiwiZmlsZSI6Ii4vanMveXZlc19kZWZhdWx0LjE0LmxlZ2FjeS5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBDb21wb25lbnQgZnJvbSAnU2hvcFVpL21vZGVscy9jb21wb25lbnQnO1xuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBOYXZpZ2F0aW9uSGVhZGVyIGV4dGVuZHMgQ29tcG9uZW50XG57XG4gICAgcHJvdGVjdGVkIGFzblByaWNlOiBIVE1MRWxlbWVudDtcbiAgICBwcml2YXRlIGRlZmF1bHRDbGFzc05hbWU6IHN0cmluZyA9ICdpY29uLWdsb2J1cy1sZWFmLWRlZmF1bHQtbWQnO1xuICAgIHByaXZhdGUgY2F0ZWdvcnlDbGFzczogc3RyaW5nID0gJ2NhdGVnb3J5LWZpbHRlci1zdHlsZSc7XG4gICAgcHJpdmF0ZSBjYXRlZ29yeUNsYXNzRGl2OiBzdHJpbmcgPSAnY2F0ZWdvcnktZmlsdGVyLXN0eWxlLWRpdic7XG4gICAgcHJpdmF0ZSBuYXZpZ2F0aW9uQnV0dG9uOiBIVE1MQnV0dG9uRWxlbWVudDtcbiAgICBwcml2YXRlIG5hdmlnYXRpb25Db250YWluZXI6IEhUTUxFbGVtZW50O1xuXG4gICAgcHJvdGVjdGVkIGNsYXNzRGF0YSA9IHtcbiAgICAgICAgJ0ZhY2h0bWV0emdlcmVpJzogJ2ljb24tYnV0Y2hlci1tZCcsXG4gICAgICAgICdGYWNobWV0emdlcmVpJzogJ2ljb24tYnV0Y2hlci1tZCcsXG4gICAgICAgICdTw7zDn2VzICYgU2FsemlnZXMnOiAnaWNvbi1zd2VldC1hbmQtc2F2b3VyeS1tZCcsXG4gICAgICAgICdXdXJzdCAmIEvDpHNlJzogJ2ljb24tc2F1c2FnZS1hbmQtY2hlZXNlLW1kJyxcbiAgICAgICAgJ0LDpGNrZXJlaSc6ICdpY29uLWJha2VyLW1kJyxcbiAgICAgICAgJ01laXN0ZXJiw6Rja2VyZWknOiAnaWNvbi1iYWtlci1tZCcsXG4gICAgICAgICdGbGVpY2ggJiBGaXNjaCc6ICdpY29uLW1lYXQtc2F1c2FnZXMtZmlzaC1tZCcsXG4gICAgICAgICdUaWVma8O8aGwnOiAnaWNvbi1yZWFkeS1tZWFscy1tZCcsXG4gICAgICAgICdBbmdlYm90ZSc6ICdpY29uLW9mZmVyLW1kJyxcbiAgICAgICAgJ09ic3QgJiBHZW3DvHNlJzogJ2ljb24tZnJ1aXQtYW5kLXZlZ2V0YWJsZXMtbWQnLFxuICAgICAgICAnU3BpZWwtICYgU2NocmVpYndhcmVuJzogJ2ljb24tZ2FtZXMtbWQnLFxuICAgICAgICAnU3BpZWwgJiBTY2hyZWlid2FyZW4nOiAnaWNvbi1nYW1lcy1tZCcsXG4gICAgICAgICdLw7ZycGVycGZsZWdlICYgS29zbWV0aWsnOiAnaWNvbi1jb3NtZXRpY3MtbWQnLFxuICAgICAgICAnRnJpc2NoZSBQcm9kdWt0ZSc6ICdpY29uLWZyZXNoLXByb2R1Y3QtbWQnLFxuICAgICAgICAnVm9ycmF0c3NjaHJhbmsnOiAnaWNvbi1wYW50cnktbWQnLFxuICAgICAgICAnRnJlaXplaXQsIFRpZXIgJiBBdXRvJzogJ2ljb24tYW5pbWFscy1tZCcsXG4gICAgICAgICdCYWJ5ICYgU2Nod2FuZ2Vyc2NoYWZ0JzogJ2ljb24tYmFieS1tZCcsXG4gICAgICAgICdFbGVrdHJvbmlrJzogJ2ljb24tZWxlY3Ryb25pY3MtbWQnLFxuICAgICAgICAnVGV4dGlsICYgU2NobXVjayc6ICdpY29uLWNsb3RoZXMtbWQnLFxuICAgICAgICAnR2V0csOkbmtlJzogJ2ljb24tZHJpbmtzLW1kJyxcbiAgICAgICAgJ0ZlcnRpZ2dlcmljaHRlICYgVGllZmvDvGhsJzogJ2ljb24tcmVhZHktbWVhbHMtbWQnLFxuICAgICAgICAnRmlzY2ggJiBGbGVpc2NoJzogJ2ljb24tbWVhdC1tZCcsXG4gICAgICAgICdGbGVpc2NoICYgRmlzY2gnOiAnaWNvbi1tZWF0LW1kJyxcbiAgICAgICAgJ0hhdXNoYWx0JzogJ2ljb24taG91c2Vob2xkLW1kJ1xuICAgIH07XG4gICAgcHJvdGVjdGVkIG1hcDogTWFwPHN0cmluZywgc3RyaW5nPjtcblxuICAgIHByb3RlY3RlZCBpbml0KCkge1xuICAgICAgICBzdXBlci5pbml0KCk7XG5cbiAgICAgICAgdGhpcy5tYXAgPSBuZXcgTWFwPHN0cmluZywgc3RyaW5nPihPYmplY3QuZW50cmllcyh0aGlzLmNsYXNzRGF0YSkpO1xuXG4gICAgICAgIGlmIChkb2N1bWVudC5yZWFkeVN0YXRlID09PSAnaW50ZXJhY3RpdmUnIHx8IGRvY3VtZW50LnJlYWR5U3RhdGUgPT09ICdjb21wbGV0ZScpIHtcbiAgICAgICAgICAgIHdpbmRvdy5hZGRFdmVudExpc3RlbmVyKCdET01Ob2RlSW5zZXJ0ZWQnLCBub2RlSW5zZXJ0ZWRFdmVudCA9PiB7XG4gICAgICAgICAgICAgICAgaWYgKG5vZGVJbnNlcnRlZEV2ZW50LnJlbGF0ZWROb2RlLmxvY2FsTmFtZSA9PT0gJ2ZmLW5hdmlnYXRpb24taXRlbScpIHtcbiAgICAgICAgICAgICAgICAgICAgbGV0IGFuY2hvciA9IG5vZGVJbnNlcnRlZEV2ZW50LnJlbGF0ZWROb2RlLnF1ZXJ5U2VsZWN0b3IoJy5uYXZpZ2F0aW9uLWljb24nKTtcbiAgICAgICAgICAgICAgICAgICAgaWYgKGFuY2hvciAhPT0gdW5kZWZpbmVkICYmIGFuY2hvciAhPT0gbnVsbCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgY29uc3QgY2xhc3NOYW1lID0gdGhpcy5nZXRDbGFzc05hbWUoYW5jaG9yLmlubmVyVGV4dC50cmltKCkpO1xuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKG5vZGVJbnNlcnRlZEV2ZW50LnJlbGF0ZWROb2RlLmhhc0F0dHJpYnV0ZSgnY2x1c3Rlci1sZXZlbCcpKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKG5vZGVJbnNlcnRlZEV2ZW50LnJlbGF0ZWROb2RlLmdldEF0dHJpYnV0ZSgnY2x1c3Rlci1sZXZlbCcpID09PSAnMCcpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5hZGRDbGFzc2VzKGFuY2hvciwgY2xhc3NOYW1lLCAnc3BhbicpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgdGhpcy5uYXZpZ2F0aW9uQnV0dG9uID0gPEhUTUxCdXR0b25FbGVtZW50PmRvY3VtZW50LmdldEVsZW1lbnRzQnlDbGFzc05hbWUoJ2J1dHRvbl9fYWxsLXByb2R1Y3RzJylbMF07XG4gICAgICAgICAgICB0aGlzLm5hdmlnYXRpb25Db250YWluZXIgPSBkb2N1bWVudC5nZXRFbGVtZW50c0J5Q2xhc3NOYW1lKCdqcy1oZWFkZXJfX25hdmlnYXRpb24tdGFyZ2V0JylbMF07XG4gICAgICAgICAgICB0aGlzLmFkZEJ1dHRvbkV2ZW50TGlzdGVuZXIoKTtcbiAgICAgICAgfVxuXG5cbiAgICB9XG5cbiAgICBwcm90ZWN0ZWQgcmVhZHlDYWxsYmFjaygpIHt9XG5cbiAgICBwcml2YXRlIGdldENsYXNzTmFtZSh0ZXh0OiBzdHJpbmcpIHtcbiAgICAgICAgdGV4dCA9IHRleHQudHJpbSgpO1xuICAgICAgICBsZXQgY2xhc3NOYW1lID0gdGhpcy5tYXAuZ2V0KHRleHQpO1xuICAgICAgICBpZiAoY2xhc3NOYW1lID09PSB1bmRlZmluZWQgfHwgY2xhc3NOYW1lID09PSBudWxsIHx8IGNsYXNzTmFtZS5sZW5ndGggPCAxKSB7XG4gICAgICAgICAgICBjbGFzc05hbWUgPSB0aGlzLmRlZmF1bHRDbGFzc05hbWU7XG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4gY2xhc3NOYW1lO1xuICAgIH1cblxuICAgIHByaXZhdGUgYWRkQ2xhc3NlcyhlbGVtZW50OiBIVE1MRWxlbWVudCwgY2xhc3NOYW1lOiBzdHJpbmcsIGZsYWc6IHN0cmluZykge1xuICAgICAgICBlbGVtZW50LmNsYXNzTGlzdC5hZGQoY2xhc3NOYW1lKTtcbiAgICAgICAgaWYgKGZsYWcgPT09ICdkaXYnKSB7XG4gICAgICAgICAgICBlbGVtZW50LmNsYXNzTGlzdC5hZGQodGhpcy5jYXRlZ29yeUNsYXNzRGl2KTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIGVsZW1lbnQuY2xhc3NMaXN0LmFkZCh0aGlzLmNhdGVnb3J5Q2xhc3MpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgcHJpdmF0ZSBhZGRCdXR0b25FdmVudExpc3RlbmVyKCl7XG4gICAgICAgIGlmKHRoaXMubmF2aWdhdGlvbkJ1dHRvbiAhPT0gdW5kZWZpbmVkICYmIHRoaXMubmF2aWdhdGlvbkNvbnRhaW5lciAhPT0gdW5kZWZpbmVkKXtcbiAgICAgICAgICAgIHRoaXMubmF2aWdhdGlvbkJ1dHRvbi5hZGRFdmVudExpc3RlbmVyKCdtb3VzZW92ZXInLCAoKSA9PiB7XG4gICAgICAgICAgICAgICAgaWYodGhpcy5uYXZpZ2F0aW9uQ29udGFpbmVyLmNsYXNzTGlzdC5jb250YWlucygnaXMtaGlkZGVuJykpe1xuICAgICAgICAgICAgICAgICAgICB0aGlzLm5hdmlnYXRpb25Db250YWluZXIuY2xhc3NMaXN0LnJlbW92ZSgnaXMtaGlkZGVuJyk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSlcblxuICAgICAgICAgICAgdGhpcy5uYXZpZ2F0aW9uQ29udGFpbmVyLmFkZEV2ZW50TGlzdGVuZXIoJ21vdXNlbGVhdmUnLCAoKSA9PiB7XG4gICAgICAgICAgICAgICAgaWYoIXRoaXMubmF2aWdhdGlvbkNvbnRhaW5lci5jbGFzc0xpc3QuY29udGFpbnMoJ2lzLWhpZGRlbicpKXtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5uYXZpZ2F0aW9uQ29udGFpbmVyLmNsYXNzTGlzdC5hZGQoJ2lzLWhpZGRlbicpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0pXG4gICAgICAgIH1cbiAgICB9XG5cblxufVxuIl0sInNvdXJjZVJvb3QiOiIifQ==