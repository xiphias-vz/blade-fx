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

    _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_4___default()(_babel_runtime_helpers_assertThisInitialized__WEBPACK_IMPORTED_MODULE_0___default()(_this), "classData", {
      'Fachtmetzgerei': 'icon-butcher-md',
      'Süßes & Salziges': 'icon-sweet-and-savoury-md',
      'Wurst & Käse': 'icon-sausage-and-cheese-md',
      'Bäckerei': 'icon-baker-md',
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

  return NavigationHeader;
}(ShopUi_models_component__WEBPACK_IMPORTED_MODULE_5__["default"]);



/***/ })

}]);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vLi9zcmMvUHl6L1l2ZXMvQ29udGVudE5hdmlnYXRpb25XaWRnZXQvVGhlbWUvZGVmYXVsdC92aWV3cy9uYXZpZ2F0aW9uLWhlYWRlci9uYXZpZ2F0aW9uLWhlYWRlci50cyJdLCJuYW1lcyI6WyJOYXZpZ2F0aW9uSGVhZGVyIiwiaW5pdCIsIm1hcCIsIk1hcCIsIk9iamVjdCIsImVudHJpZXMiLCJjbGFzc0RhdGEiLCJkb2N1bWVudCIsInJlYWR5U3RhdGUiLCJ3aW5kb3ciLCJhZGRFdmVudExpc3RlbmVyIiwibm9kZUluc2VydGVkRXZlbnQiLCJyZWxhdGVkTm9kZSIsImxvY2FsTmFtZSIsImFuY2hvciIsInF1ZXJ5U2VsZWN0b3IiLCJ1bmRlZmluZWQiLCJjbGFzc05hbWUiLCJnZXRDbGFzc05hbWUiLCJpbm5lclRleHQiLCJ0cmltIiwiaGFzQXR0cmlidXRlIiwiZ2V0QXR0cmlidXRlIiwiYWRkQ2xhc3NlcyIsInJlYWR5Q2FsbGJhY2siLCJ0ZXh0IiwiZ2V0IiwibGVuZ3RoIiwiZGVmYXVsdENsYXNzTmFtZSIsImVsZW1lbnQiLCJmbGFnIiwiY2xhc3NMaXN0IiwiYWRkIiwiY2F0ZWdvcnlDbGFzc0RpdiIsImNhdGVnb3J5Q2xhc3MiLCJDb21wb25lbnQiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUFBOztJQUVxQkEsZ0I7Ozs7Ozs7Ozs7Ozs7Ozs7aU1BR2tCLDZCOzs4TEFDSCx1Qjs7aU1BQ0csMkI7OzBMQUNiO0FBQ2xCLHdCQUFrQixpQkFEQTtBQUVsQiwwQkFBb0IsMkJBRkY7QUFHbEIsc0JBQWdCLDRCQUhFO0FBSWxCLGtCQUFZLGVBSk07QUFLbEIsd0JBQWtCLDRCQUxBO0FBTWxCLGtCQUFZLHFCQU5NO0FBT2xCLGtCQUFZLGVBUE07QUFRbEIsdUJBQWlCLDhCQVJDO0FBU2xCLCtCQUF5QixlQVRQO0FBVWxCLDhCQUF3QixlQVZOO0FBV2xCLGlDQUEyQixtQkFYVDtBQVlsQiwwQkFBb0IsdUJBWkY7QUFhbEIsd0JBQWtCLGdCQWJBO0FBY2xCLCtCQUF5QixpQkFkUDtBQWVsQixnQ0FBMEIsY0FmUjtBQWdCbEIsb0JBQWMscUJBaEJJO0FBaUJsQiwwQkFBb0IsaUJBakJGO0FBa0JsQixrQkFBWSxnQkFsQk07QUFtQmxCLG1DQUE2QixxQkFuQlg7QUFvQmxCLHlCQUFtQixjQXBCRDtBQXFCbEIsa0JBQVk7QUFyQk0sSzs7Ozs7Ozs7O1NBeUJaQyxJLEdBQVYsZ0JBQWlCO0FBQUE7O0FBQ2IseUJBQU1BLElBQU47O0FBQ0EsU0FBS0MsR0FBTCxHQUFXLElBQUlDLEdBQUosQ0FBd0JDLE1BQU0sQ0FBQ0MsT0FBUCxDQUFlLEtBQUtDLFNBQXBCLENBQXhCLENBQVg7O0FBRUEsUUFBSUMsUUFBUSxDQUFDQyxVQUFULEtBQXdCLGFBQXhCLElBQXlDRCxRQUFRLENBQUNDLFVBQVQsS0FBd0IsVUFBckUsRUFBaUY7QUFDN0VDLFlBQU0sQ0FBQ0MsZ0JBQVAsQ0FBd0IsaUJBQXhCLEVBQTJDLFVBQUFDLGlCQUFpQixFQUFJO0FBQzVELFlBQUlBLGlCQUFpQixDQUFDQyxXQUFsQixDQUE4QkMsU0FBOUIsS0FBNEMsb0JBQWhELEVBQXNFO0FBQ2xFLGNBQUlDLE1BQU0sR0FBR0gsaUJBQWlCLENBQUNDLFdBQWxCLENBQThCRyxhQUE5QixDQUE0QyxrQkFBNUMsQ0FBYjs7QUFDQSxjQUFJRCxNQUFNLEtBQUtFLFNBQVgsSUFBd0JGLE1BQU0sS0FBSyxJQUF2QyxFQUE2QztBQUN6QyxnQkFBTUcsU0FBUyxHQUFHLE1BQUksQ0FBQ0MsWUFBTCxDQUFrQkosTUFBTSxDQUFDSyxTQUFQLENBQWlCQyxJQUFqQixFQUFsQixDQUFsQjs7QUFDQSxnQkFBSVQsaUJBQWlCLENBQUNDLFdBQWxCLENBQThCUyxZQUE5QixDQUEyQyxlQUEzQyxDQUFKLEVBQWlFO0FBQzdELGtCQUFJVixpQkFBaUIsQ0FBQ0MsV0FBbEIsQ0FBOEJVLFlBQTlCLENBQTJDLGVBQTNDLE1BQWdFLEdBQXBFLEVBQXlFO0FBQ3JFLHNCQUFJLENBQUNDLFVBQUwsQ0FBZ0JULE1BQWhCLEVBQXdCRyxTQUF4QixFQUFtQyxNQUFuQztBQUNIO0FBQ0o7QUFDSjtBQUNKO0FBQ0osT0FaRDtBQWFIO0FBQ0osRzs7U0FFU08sYSxHQUFWLHlCQUEwQixDQUFFLEM7O1NBRXBCTixZLEdBQVIsc0JBQXFCTyxJQUFyQixFQUFtQztBQUMvQkEsUUFBSSxHQUFHQSxJQUFJLENBQUNMLElBQUwsRUFBUDtBQUNBLFFBQUlILFNBQVMsR0FBRyxLQUFLZixHQUFMLENBQVN3QixHQUFULENBQWFELElBQWIsQ0FBaEI7O0FBQ0EsUUFBSVIsU0FBUyxLQUFLRCxTQUFkLElBQTJCQyxTQUFTLEtBQUssSUFBekMsSUFBaURBLFNBQVMsQ0FBQ1UsTUFBVixHQUFtQixDQUF4RSxFQUEyRTtBQUN2RVYsZUFBUyxHQUFHLEtBQUtXLGdCQUFqQjtBQUNIOztBQUVELFdBQU9YLFNBQVA7QUFDSCxHOztTQUVPTSxVLEdBQVIsb0JBQW1CTSxPQUFuQixFQUF5Q1osU0FBekMsRUFBNERhLElBQTVELEVBQTBFO0FBQ3RFRCxXQUFPLENBQUNFLFNBQVIsQ0FBa0JDLEdBQWxCLENBQXNCZixTQUF0Qjs7QUFDQSxRQUFJYSxJQUFJLEtBQUssS0FBYixFQUFvQjtBQUNoQkQsYUFBTyxDQUFDRSxTQUFSLENBQWtCQyxHQUFsQixDQUFzQixLQUFLQyxnQkFBM0I7QUFDSCxLQUZELE1BRU87QUFDSEosYUFBTyxDQUFDRSxTQUFSLENBQWtCQyxHQUFsQixDQUFzQixLQUFLRSxhQUEzQjtBQUNIO0FBQ0osRzs7O0VBdkV5Q0MsK0QiLCJmaWxlIjoiLi9qcy95dmVzX2RlZmF1bHQuMTQubGVnYWN5LmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IENvbXBvbmVudCBmcm9tICdTaG9wVWkvbW9kZWxzL2NvbXBvbmVudCc7XG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIE5hdmlnYXRpb25IZWFkZXIgZXh0ZW5kcyBDb21wb25lbnRcbntcbiAgICBwcm90ZWN0ZWQgYXNuUHJpY2U6IEhUTUxFbGVtZW50O1xuICAgIHByaXZhdGUgZGVmYXVsdENsYXNzTmFtZTogc3RyaW5nID0gJ2ljb24tZ2xvYnVzLWxlYWYtZGVmYXVsdC1tZCc7XG4gICAgcHJpdmF0ZSBjYXRlZ29yeUNsYXNzOiBzdHJpbmcgPSAnY2F0ZWdvcnktZmlsdGVyLXN0eWxlJztcbiAgICBwcml2YXRlIGNhdGVnb3J5Q2xhc3NEaXY6IHN0cmluZyA9ICdjYXRlZ29yeS1maWx0ZXItc3R5bGUtZGl2JztcbiAgICBwcm90ZWN0ZWQgY2xhc3NEYXRhID0ge1xuICAgICAgICAnRmFjaHRtZXR6Z2VyZWknOiAnaWNvbi1idXRjaGVyLW1kJyxcbiAgICAgICAgJ1PDvMOfZXMgJiBTYWx6aWdlcyc6ICdpY29uLXN3ZWV0LWFuZC1zYXZvdXJ5LW1kJyxcbiAgICAgICAgJ1d1cnN0ICYgS8Okc2UnOiAnaWNvbi1zYXVzYWdlLWFuZC1jaGVlc2UtbWQnLFxuICAgICAgICAnQsOkY2tlcmVpJzogJ2ljb24tYmFrZXItbWQnLFxuICAgICAgICAnRmxlaWNoICYgRmlzY2gnOiAnaWNvbi1tZWF0LXNhdXNhZ2VzLWZpc2gtbWQnLFxuICAgICAgICAnVGllZmvDvGhsJzogJ2ljb24tcmVhZHktbWVhbHMtbWQnLFxuICAgICAgICAnQW5nZWJvdGUnOiAnaWNvbi1vZmZlci1tZCcsXG4gICAgICAgICdPYnN0ICYgR2Vtw7xzZSc6ICdpY29uLWZydWl0LWFuZC12ZWdldGFibGVzLW1kJyxcbiAgICAgICAgJ1NwaWVsLSAmIFNjaHJlaWJ3YXJlbic6ICdpY29uLWdhbWVzLW1kJyxcbiAgICAgICAgJ1NwaWVsICYgU2NocmVpYndhcmVuJzogJ2ljb24tZ2FtZXMtbWQnLFxuICAgICAgICAnS8O2cnBlcnBmbGVnZSAmIEtvc21ldGlrJzogJ2ljb24tY29zbWV0aWNzLW1kJyxcbiAgICAgICAgJ0ZyaXNjaGUgUHJvZHVrdGUnOiAnaWNvbi1mcmVzaC1wcm9kdWN0LW1kJyxcbiAgICAgICAgJ1ZvcnJhdHNzY2hyYW5rJzogJ2ljb24tcGFudHJ5LW1kJyxcbiAgICAgICAgJ0ZyZWl6ZWl0LCBUaWVyICYgQXV0byc6ICdpY29uLWFuaW1hbHMtbWQnLFxuICAgICAgICAnQmFieSAmIFNjaHdhbmdlcnNjaGFmdCc6ICdpY29uLWJhYnktbWQnLFxuICAgICAgICAnRWxla3Ryb25payc6ICdpY29uLWVsZWN0cm9uaWNzLW1kJyxcbiAgICAgICAgJ1RleHRpbCAmIFNjaG11Y2snOiAnaWNvbi1jbG90aGVzLW1kJyxcbiAgICAgICAgJ0dldHLDpG5rZSc6ICdpY29uLWRyaW5rcy1tZCcsXG4gICAgICAgICdGZXJ0aWdnZXJpY2h0ZSAmIFRpZWZrw7xobCc6ICdpY29uLXJlYWR5LW1lYWxzLW1kJyxcbiAgICAgICAgJ0Zpc2NoICYgRmxlaXNjaCc6ICdpY29uLW1lYXQtbWQnLFxuICAgICAgICAnSGF1c2hhbHQnOiAnaWNvbi1ob3VzZWhvbGQtbWQnXG4gICAgfTtcbiAgICBwcm90ZWN0ZWQgbWFwOiBNYXA8c3RyaW5nLCBzdHJpbmc+O1xuXG4gICAgcHJvdGVjdGVkIGluaXQoKSB7XG4gICAgICAgIHN1cGVyLmluaXQoKTtcbiAgICAgICAgdGhpcy5tYXAgPSBuZXcgTWFwPHN0cmluZywgc3RyaW5nPihPYmplY3QuZW50cmllcyh0aGlzLmNsYXNzRGF0YSkpO1xuXG4gICAgICAgIGlmIChkb2N1bWVudC5yZWFkeVN0YXRlID09PSAnaW50ZXJhY3RpdmUnIHx8IGRvY3VtZW50LnJlYWR5U3RhdGUgPT09ICdjb21wbGV0ZScpIHtcbiAgICAgICAgICAgIHdpbmRvdy5hZGRFdmVudExpc3RlbmVyKCdET01Ob2RlSW5zZXJ0ZWQnLCBub2RlSW5zZXJ0ZWRFdmVudCA9PiB7XG4gICAgICAgICAgICAgICAgaWYgKG5vZGVJbnNlcnRlZEV2ZW50LnJlbGF0ZWROb2RlLmxvY2FsTmFtZSA9PT0gJ2ZmLW5hdmlnYXRpb24taXRlbScpIHtcbiAgICAgICAgICAgICAgICAgICAgbGV0IGFuY2hvciA9IG5vZGVJbnNlcnRlZEV2ZW50LnJlbGF0ZWROb2RlLnF1ZXJ5U2VsZWN0b3IoJy5uYXZpZ2F0aW9uLWljb24nKTtcbiAgICAgICAgICAgICAgICAgICAgaWYgKGFuY2hvciAhPT0gdW5kZWZpbmVkICYmIGFuY2hvciAhPT0gbnVsbCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgY29uc3QgY2xhc3NOYW1lID0gdGhpcy5nZXRDbGFzc05hbWUoYW5jaG9yLmlubmVyVGV4dC50cmltKCkpO1xuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKG5vZGVJbnNlcnRlZEV2ZW50LnJlbGF0ZWROb2RlLmhhc0F0dHJpYnV0ZSgnY2x1c3Rlci1sZXZlbCcpKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKG5vZGVJbnNlcnRlZEV2ZW50LnJlbGF0ZWROb2RlLmdldEF0dHJpYnV0ZSgnY2x1c3Rlci1sZXZlbCcpID09PSAnMCcpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5hZGRDbGFzc2VzKGFuY2hvciwgY2xhc3NOYW1lLCAnc3BhbicpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgcHJvdGVjdGVkIHJlYWR5Q2FsbGJhY2soKSB7fVxuXG4gICAgcHJpdmF0ZSBnZXRDbGFzc05hbWUodGV4dDogc3RyaW5nKSB7XG4gICAgICAgIHRleHQgPSB0ZXh0LnRyaW0oKTtcbiAgICAgICAgbGV0IGNsYXNzTmFtZSA9IHRoaXMubWFwLmdldCh0ZXh0KTtcbiAgICAgICAgaWYgKGNsYXNzTmFtZSA9PT0gdW5kZWZpbmVkIHx8IGNsYXNzTmFtZSA9PT0gbnVsbCB8fCBjbGFzc05hbWUubGVuZ3RoIDwgMSkge1xuICAgICAgICAgICAgY2xhc3NOYW1lID0gdGhpcy5kZWZhdWx0Q2xhc3NOYW1lO1xuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIGNsYXNzTmFtZTtcbiAgICB9XG5cbiAgICBwcml2YXRlIGFkZENsYXNzZXMoZWxlbWVudDogSFRNTEVsZW1lbnQsIGNsYXNzTmFtZTogc3RyaW5nLCBmbGFnOiBzdHJpbmcpIHtcbiAgICAgICAgZWxlbWVudC5jbGFzc0xpc3QuYWRkKGNsYXNzTmFtZSk7XG4gICAgICAgIGlmIChmbGFnID09PSAnZGl2Jykge1xuICAgICAgICAgICAgZWxlbWVudC5jbGFzc0xpc3QuYWRkKHRoaXMuY2F0ZWdvcnlDbGFzc0Rpdik7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBlbGVtZW50LmNsYXNzTGlzdC5hZGQodGhpcy5jYXRlZ29yeUNsYXNzKTtcbiAgICAgICAgfVxuICAgIH1cbn1cbiJdLCJzb3VyY2VSb290IjoiIn0=