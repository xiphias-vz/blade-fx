(window["webpackJsonp_yves_default"] = window["webpackJsonp_yves_default"] || []).push([[16],{

/***/ "./src/Pyz/Yves/FactFinderWebComponents/Theme/default/components/molecules/facets-asn/facets-asn.ts":
/*!**********************************************************************************************************!*\
  !*** ./src/Pyz/Yves/FactFinderWebComponents/Theme/default/components/molecules/facets-asn/facets-asn.ts ***!
  \**********************************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return FacetsAsn; });
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



var FacetsAsn = /*#__PURE__*/function (_Component) {
  _babel_runtime_helpers_inheritsLoose__WEBPACK_IMPORTED_MODULE_3___default()(FacetsAsn, _Component);

  var _super = _createSuper(FacetsAsn);

  function FacetsAsn() {
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

  var _proto = FacetsAsn.prototype;

  _proto.init = function init() {
    var _this2 = this;

    _Component.prototype.init.call(this);

    this.map = new Map(Object.entries(this.classData));

    if (document.readyState === 'interactive' || document.readyState === 'complete') {
      window.addEventListener('DOMNodeInserted', function (nodeInsertedEvent) {
        if (nodeInsertedEvent.relatedNode.localName === 'ff-asn-group-element') {
          var span = nodeInsertedEvent.relatedNode.querySelector('span');

          if (span !== undefined && span !== null) {
            if (span.classList.contains('filterName')) {
              var className = _this2.getClassName(span.innerText);

              if (!nodeInsertedEvent.relatedNode.classList.contains('clusterLevel1') && !nodeInsertedEvent.relatedNode.classList.contains('clusterLevel2') && !nodeInsertedEvent.relatedNode.classList.contains('clusterLevel3')) {
                _this2.addClasses(span, className, 'span');
              }
            }
          } else {
            if (nodeInsertedEvent.relatedNode.hasAttribute('selected')) {
              var parentDiv = nodeInsertedEvent.relatedNode.querySelector('div[slot=selected]');

              if (parentDiv !== undefined && parentDiv !== null) {
                var _className = _this2.getClassName(parentDiv.innerText);

                _this2.addClasses(parentDiv, _className, 'div');
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

  return FacetsAsn;
}(ShopUi_models_component__WEBPACK_IMPORTED_MODULE_5__["default"]);



/***/ })

}]);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vLi9zcmMvUHl6L1l2ZXMvRmFjdEZpbmRlcldlYkNvbXBvbmVudHMvVGhlbWUvZGVmYXVsdC9jb21wb25lbnRzL21vbGVjdWxlcy9mYWNldHMtYXNuL2ZhY2V0cy1hc24udHMiXSwibmFtZXMiOlsiRmFjZXRzQXNuIiwiaW5pdCIsIm1hcCIsIk1hcCIsIk9iamVjdCIsImVudHJpZXMiLCJjbGFzc0RhdGEiLCJkb2N1bWVudCIsInJlYWR5U3RhdGUiLCJ3aW5kb3ciLCJhZGRFdmVudExpc3RlbmVyIiwibm9kZUluc2VydGVkRXZlbnQiLCJyZWxhdGVkTm9kZSIsImxvY2FsTmFtZSIsInNwYW4iLCJxdWVyeVNlbGVjdG9yIiwidW5kZWZpbmVkIiwiY2xhc3NMaXN0IiwiY29udGFpbnMiLCJjbGFzc05hbWUiLCJnZXRDbGFzc05hbWUiLCJpbm5lclRleHQiLCJhZGRDbGFzc2VzIiwiaGFzQXR0cmlidXRlIiwicGFyZW50RGl2IiwicmVhZHlDYWxsYmFjayIsInRleHQiLCJ0cmltIiwiZ2V0IiwibGVuZ3RoIiwiZGVmYXVsdENsYXNzTmFtZSIsImVsZW1lbnQiLCJmbGFnIiwiYWRkIiwiY2F0ZWdvcnlDbGFzc0RpdiIsImNhdGVnb3J5Q2xhc3MiLCJDb21wb25lbnQiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUFBOztJQUVxQkEsUzs7Ozs7Ozs7Ozs7Ozs7OztpTUFHa0IsNkI7OzhMQUNILHVCOztpTUFDRywyQjs7MExBQ2I7QUFDbEIsd0JBQWtCLGlCQURBO0FBRWxCLDBCQUFvQiwyQkFGRjtBQUdsQixzQkFBZ0IsNEJBSEU7QUFJbEIsa0JBQVksZUFKTTtBQUtsQix3QkFBa0IsNEJBTEE7QUFNbEIsa0JBQVkscUJBTk07QUFPbEIsa0JBQVksZUFQTTtBQVFsQix1QkFBaUIsOEJBUkM7QUFTbEIsK0JBQXlCLGVBVFA7QUFVbEIsOEJBQXdCLGVBVk47QUFXbEIsaUNBQTJCLG1CQVhUO0FBWWxCLDBC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RU9HLFUsR0FBUixvQkFBbUJTLE9BQW5CLEVBQXlDWixTQUF6QyxFQUE0RGEsSUFBNUQsRUFBMEU7QUFDdEVELFdBQU8sQ0FBQ2QsU0FBUixDQUFrQmdCLEdBQWxCLENBQXNCZCxTQUF0Qjs7QUFDQSxRQUFJYSxJQUFJLEtBQUssS0FBYixFQUFvQjtBQUNoQkQsYUFBTyxDQUFDZCxTQUFSLENBQWtCZ0IsR0FBbEIsQ0FBc0IsS0FBS0MsZ0JBQTNCO0FBQ0gsS0FGRCxNQUVPO0FBQ0hILGFBQU8sQ0FBQ2QsU0FBUixDQUFrQmdCLEdBQWxCLENBQXNCLEtBQUtFLGFBQTNCO0FBQ0g7QUFDSixHOzs7RUFsRmtDQywrRCIsImZpbGUiOiIuL2pzL3l2ZXNfZGVmYXVsdC4xNi5sZWdhY3kuanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgQ29tcG9uZW50IGZyb20gJ1Nob3BVaS9tb2RlbHMvY29tcG9uZW50JztcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgRmFjZXRzQXNuIGV4dGVuZHMgQ29tcG9uZW50XG57XG4gICAgcHJvdGVjdGVkIGFzblByaWNlOiBIVE1MRWxlbWVudDtcbiAgICBwcml2YXRlIGRlZmF1bHRDbGFzc05hbWU6IHN0cmluZyA9ICdpY29uLWdsb2J1cy1sZWFmLWRlZmF1bHQtbWQnO1xuICAgIHByaXZhdGUgY2F0ZWdvcnlDbGFzczogc3RyaW5nID0gJ2NhdGVnb3J5LWZpbHRlci1zdHlsZSc7XG4gICAgcHJpdmF0ZSBjYXRlZ29yeUNsYXNzRGl2OiBzdHJpbmcgPSAnY2F0ZWdvcnktZmlsdGVyLXN0eWxlLWRpdic7XG4gICAgcHJvdGVjdGVkIGNsYXNzRGF0YSA9IHtcbiAgICAgICAgJ0ZhY2h0bWV0emdlcmVpJzogJ2ljb24tYnV0Y2hlci1tZCcsXG4gICAgICAgICdTw7zDn2VzICYgU2FsemlnZXMnOiAnaWNvbi1zd2VldC1hbmQtc2F2b3VyeS1tZCcsXG4gICAgICAgICdXdXJzdCAmIEvDpHNlJzogJ2ljb24tc2F1c2FnZS1hbmQtY2hlZXNlLW1kJyxcbiAgICAgICAgJ0LDpGNrZXJlaSc6ICdpY29uLWJha2VyLW1kJyxcbiAgICAgICAgJ0ZsZWljaCAmIEZpc2NoJzogJ2ljb24tbWVhdC1zYXVzYWdlcy1maXNoLW1kJyxcbiAgICAgICAgJ1RpZWZrw7xobCc6ICdpY29uLXJlYWR5LW1lYWxzLW1kJyxcbiAgICAgICAgJ0FuZ2Vib3RlJzogJ2ljb24tb2ZmZXItbWQnLFxuICAgICAgICAnT2JzdCAmIEdlbcO8c2UnOiAnaWNvbi1mcnVpdC1hbmQtdmVnZXRhYmxlcy1tZCcsXG4gICAgICAgICdTcGllbC0gJiBTY2hyZWlid2FyZW4nOiAnaWNvbi1nYW1lcy1tZCcsXG4gICAgICAgICdTcGllbCAmIFNjaHJlaWJ3YXJlbic6ICdpY29uLWdhbWVzLW1kJyxcbiAgICAgICAgJ0vDtnJwZXJwZmxlZ2UgJiBLb3NtZXRpayc6ICdpY29uLWNvc21ldGljcy1tZCcsXG4gICAgICAgICdGcmlzY2hlIFByb2R1a3RlJzogJ2ljb24tZnJlc2gtcHJvZHVjdC1tZCcsXG4gICAgICAgICdWb3JyYXRzc2NocmFuayc6ICdpY29uLXBhbnRyeS1tZCcsXG4gICAgICAgICdGcmVpemVpdCwgVGllciAmIEF1dG8nOiAnaWNvbi1hbmltYWxzLW1kJyxcbiAgICAgICAgJ0JhYnkgJiBTY2h3YW5nZXJzY2hhZnQnOiAnaWNvbi1iYWJ5LW1kJyxcbiAgICAgICAgJ0VsZWt0cm9uaWsnOiAnaWNvbi1lbGVjdHJvbmljcy1tZCcsXG4gICAgICAgICdUZXh0aWwgJiBTY2htdWNrJzogJ2ljb24tY2xvdGhlcy1tZCcsXG4gICAgICAgICdHZXRyw6Rua2UnOiAnaWNvbi1kcmlua3MtbWQnLFxuICAgICAgICAnRmVydGlnZ2VyaWNodGUgJiBUaWVma8O8aGwnOiAnaWNvbi1yZWFkeS1tZWFscy1tZCcsXG4gICAgICAgICdGaXNjaCAmIEZsZWlzY2gnOiAnaWNvbi1tZWF0LW1kJyxcbiAgICAgICAgJ0hhdXNoYWx0JzogJ2ljb24taG91c2Vob2xkLW1kJ1xuICAgIH07XG4gICAgcHJvdGVjdGVkIG1hcDogTWFwPHN0cmluZywgc3RyaW5nPjtcblxuICAgIHByb3RlY3RlZCBpbml0KCkge1xuICAgICAgICBzdXBlci5pbml0KCk7XG4gICAgICAgIHRoaXMubWFwID0gbmV3IE1hcDxzdHJpbmcsIHN0cmluZz4oT2JqZWN0LmVudHJpZXModGhpcy5jbGFzc0RhdGEpKTtcblxuICAgICAgICBpZiAoZG9jdW1lbnQucmVhZHlTdGF0ZSA9PT0gJ2ludGVyYWN0aXZlJyB8fCBkb2N1bWVudC5yZWFkeVN0YXRlID09PSAnY29tcGxldGUnKSB7XG4gICAgICAgICAgICB3aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcignRE9NTm9kZUluc2VydGVkJywgbm9kZUluc2VydGVkRXZlbnQgPT4ge1xuICAgICAgICAgICAgICAgIGlmIChub2RlSW5zZXJ0ZWRFdmVudC5yZWxhdGVkTm9kZS5sb2NhbE5hbWUgPT09ICdmZi1hc24tZ3JvdXAtZWxlbWVudCcpIHtcbiAgICAgICAgICAgICAgICAgICAgY29uc3Qgc3BhbiA9IG5vZGVJbnNlcnRlZEV2ZW50LnJlbGF0ZWROb2RlLnF1ZXJ5U2VsZWN0b3IoJ3NwYW4nKTtcbiAgICAgICAgICAgICAgICAgICAgaWYgKHNwYW4gIT09IHVuZGVmaW5lZCAmJiBzcGFuICE9PSBudWxsKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoc3Bhbi5jbGFzc0xpc3QuY29udGFpbnMoJ2ZpbHRlck5hbWUnKSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbnN0IGNsYXNzTmFtZSA9IHRoaXMuZ2V0Q2xhc3NOYW1lKHNwYW4uaW5uZXJUZXh0KTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAoIW5vZGVJbnNlcnRlZEV2ZW50LnJlbGF0ZWROb2RlLmNsYXNzTGlzdC5jb250YWlucygnY2x1c3RlckxldmVsMScpICYmXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICFub2RlSW5zZXJ0ZWRFdmVudC5yZWxhdGVkTm9kZS5jbGFzc0xpc3QuY29udGFpbnMoJ2NsdXN0ZXJMZXZlbDInKSAmJlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAhbm9kZUluc2VydGVkRXZlbnQucmVsYXRlZE5vZGUuY2xhc3NMaXN0LmNvbnRhaW5zKCdjbHVzdGVyTGV2ZWwzJykpXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmFkZENsYXNzZXMoc3BhbiwgY2xhc3NOYW1lLCAnc3BhbicpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmIChub2RlSW5zZXJ0ZWRFdmVudC5yZWxhdGVkTm9kZS5oYXNBdHRyaWJ1dGUoJ3NlbGVjdGVkJykpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb25zdCBwYXJlbnREaXYgPSBub2RlSW5zZXJ0ZWRFdmVudC5yZWxhdGVkTm9kZS5xdWVyeVNlbGVjdG9yKCdkaXZbc2xvdD1zZWxlY3RlZF0nKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAocGFyZW50RGl2ICE9PSB1bmRlZmluZWQgJiYgcGFyZW50RGl2ICE9PSBudWxsKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbnN0IGNsYXNzTmFtZSA9IHRoaXMuZ2V0Q2xhc3NOYW1lKHBhcmVudERpdi5pbm5lclRleHQpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmFkZENsYXNzZXMocGFyZW50RGl2LCBjbGFzc05hbWUsICdkaXYnKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIHByb3RlY3RlZCByZWFkeUNhbGxiYWNrKCkge31cblxuICAgIHByaXZhdGUgZ2V0Q2xhc3NOYW1lKHRleHQ6IHN0cmluZykge1xuICAgICAgICB0ZXh0ID0gdGV4dC50cmltKCk7XG4gICAgICAgIGxldCBjbGFzc05hbWUgPSB0aGlzLm1hcC5nZXQodGV4dCk7XG4gICAgICAgIGlmIChjbGFzc05hbWUgPT09IHVuZGVmaW5lZCB8fCBjbGFzc05hbWUgPT09IG51bGwgfHwgY2xhc3NOYW1lLmxlbmd0aCA8IDEpIHtcbiAgICAgICAgICAgIGNsYXNzTmFtZSA9IHRoaXMuZGVmYXVsdENsYXNzTmFtZTtcbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiBjbGFzc05hbWU7XG4gICAgfVxuXG4gICAgcHJpdmF0ZSBhZGRDbGFzc2VzKGVsZW1lbnQ6IEhUTUxFbGVtZW50LCBjbGFzc05hbWU6IHN0cmluZywgZmxhZzogc3RyaW5nKSB7XG4gICAgICAgIGVsZW1lbnQuY2xhc3NMaXN0LmFkZChjbGFzc05hbWUpO1xuICAgICAgICBpZiAoZmxhZyA9PT0gJ2RpdicpIHtcbiAgICAgICAgICAgIGVsZW1lbnQuY2xhc3NMaXN0LmFkZCh0aGlzLmNhdGVnb3J5Q2xhc3NEaXYpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgZWxlbWVudC5jbGFzc0xpc3QuYWRkKHRoaXMuY2F0ZWdvcnlDbGFzcyk7XG4gICAgICAgIH1cbiAgICB9XG59XG4iXSwic291cmNlUm9vdCI6IiJ9