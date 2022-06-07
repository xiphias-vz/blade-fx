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
              var className = _this2.getClassName(span.innerText.trim());

              if (!nodeInsertedEvent.relatedNode.classList.contains('clusterLevel1') && !nodeInsertedEvent.relatedNode.classList.contains('clusterLevel2') && !nodeInsertedEvent.relatedNode.classList.contains('clusterLevel3')) {
                _this2.addClasses(span, className, 'span');
              }
            }
          } else {
            if (nodeInsertedEvent.relatedNode.hasAttribute('selected') && !nodeInsertedEvent.relatedNode.classList.contains('clusterLevel1') && !nodeInsertedEvent.relatedNode.classList.contains('clusterLevel2') && !nodeInsertedEvent.relatedNode.classList.contains('clusterLevel3')) {
              var parentDiv = nodeInsertedEvent.relatedNode.querySelector('div[slot=selected]');

              if (parentDiv !== undefined && parentDiv !== null) {
                var _className = _this2.getClassName(parentDiv.innerText.trim());

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vLi9zcmMvUHl6L1l2ZXMvRmFjdEZpbmRlcldlYkNvbXBvbmVudHMvVGhlbWUvZGVmYXVsdC9jb21wb25lbnRzL21vbGVjdWxlcy9mYWNldHMtYXNuL2ZhY2V0cy1hc24udHMiXSwibmFtZXMiOlsiRmFjZXRzQXNuIiwiaW5pdCIsIm1hcCIsIk1hcCIsIk9iamVjdCIsImVudHJpZXMiLCJjbGFzc0RhdGEiLCJkb2N1bWVudCIsInJlYWR5U3RhdGUiLCJ3aW5kb3ciLCJhZGRFdmVudExpc3RlbmVyIiwibm9kZUluc2VydGVkRXZlbnQiLCJyZWxhdGVkTm9kZSIsImxvY2FsTmFtZSIsInNwYW4iLCJxdWVyeVNlbGVjdG9yIiwidW5kZWZpbmVkIiwiY2xhc3NMaXN0IiwiY29udGFpbnMiLCJjbGFzc05hbWUiLCJnZXRDbGFzc05hbWUiLCJpbm5lclRleHQiLCJ0cmltIiwiYWRkQ2xhc3NlcyIsImhhc0F0dHJpYnV0ZSIsInBhcmVudERpdiIsInJlYWR5Q2FsbGJhY2siLCJ0ZXh0IiwiZ2V0IiwibGVuZ3RoIiwiZGVmYXVsdENsYXNzTmFtZSIsImVsZW1lbnQiLCJmbGFnIiwiYWRkIiwiY2F0ZWdvcnlDbGFzc0RpdiIsImNhdGVnb3J5Q2xhc3MiLCJDb21wb25lbnQiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUFBOztJQUVxQkEsUzs7Ozs7Ozs7Ozs7Ozs7OztpTUFHa0IsNkI7OzhMQUNILHVCOztpTUFDRywyQjs7MExBQ2I7QUFDbEIsd0JBQWtCLGlCQURBO0FBRWxCLHVCQUFpQixpQkFGQztBQUdsQiwwQkFBb0IsMkJBSEY7QUFJbEIsc0JBQWdCLDRCQUpFO0FBS2xCLGtCQUFZLGVBTE07QUFNbEIseUJBQW1CLGVBTkQ7QUFPbEIsd0JBQWtCLDRCQVBBO0FBUWxCLGtCQUFZLHFCQVJNO0FBU2xCLGtCQUFZLGVBVE07QUFVbEIsdUJBQWlCLDhCQVZDO0FBV2xCLCtCQUF5QixlQVhQO0FBWWxCLDhC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QVYseUJBQTBCLENBQUUsQzs7U0FFcEJOLFksR0FBUixzQkFBcUJPLElBQXJCLEVBQW1DO0FBQy9CQSxRQUFJLEdBQUdBLElBQUksQ0FBQ0wsSUFBTCxFQUFQO0FBQ0EsUUFBSUgsU0FBUyxHQUFHLEtBQUtqQixHQUFMLENBQVMwQixHQUFULENBQWFELElBQWIsQ0FBaEI7O0FBQ0EsUUFBSVIsU0FBUyxLQUFLSCxTQUFkLElBQTJCRyxTQUFTLEtBQUssSUFBekMsSUFBaURBLFNBQVMsQ0FBQ1UsTUFBVixHQUFtQixDQUF4RSxFQUEyRTtBQUN2RVYsZUFBUyxHQUFHLEtBQUtXLGdCQUFqQjtBQUNIOztBQUVELFdBQU9YLFNBQVA7QUFDSCxHOztTQUVPSSxVLEdBQVIsb0JBQW1CUSxPQUFuQixFQUF5Q1osU0FBekMsRUFBNERhLElBQTVELEVBQTBFO0FBQ3RFRCxXQUFPLENBQUNkLFNBQVIsQ0FBa0JnQixHQUFsQixDQUFzQmQsU0FBdEI7O0FBQ0EsUUFBSWEsSUFBSSxLQUFLLEtBQWIsRUFBb0I7QUFDaEJELGFBQU8sQ0FBQ2QsU0FBUixDQUFrQmdCLEdBQWxCLENBQXNCLEtBQUtDLGdCQUEzQjtBQUNILEtBRkQsTUFFTztBQUNISCxhQUFPLENBQUNkLFNBQVIsQ0FBa0JnQixHQUFsQixDQUFzQixLQUFLRSxhQUEzQjtBQUNIO0FBQ0osRzs7O0VBekZrQ0MsK0QiLCJmaWxlIjoiLi9qcy95dmVzX2RlZmF1bHQuMTYubGVnYWN5LmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IENvbXBvbmVudCBmcm9tICdTaG9wVWkvbW9kZWxzL2NvbXBvbmVudCc7XG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIEZhY2V0c0FzbiBleHRlbmRzIENvbXBvbmVudFxue1xuICAgIHByb3RlY3RlZCBhc25QcmljZTogSFRNTEVsZW1lbnQ7XG4gICAgcHJpdmF0ZSBkZWZhdWx0Q2xhc3NOYW1lOiBzdHJpbmcgPSAnaWNvbi1nbG9idXMtbGVhZi1kZWZhdWx0LW1kJztcbiAgICBwcml2YXRlIGNhdGVnb3J5Q2xhc3M6IHN0cmluZyA9ICdjYXRlZ29yeS1maWx0ZXItc3R5bGUnO1xuICAgIHByaXZhdGUgY2F0ZWdvcnlDbGFzc0Rpdjogc3RyaW5nID0gJ2NhdGVnb3J5LWZpbHRlci1zdHlsZS1kaXYnO1xuICAgIHByb3RlY3RlZCBjbGFzc0RhdGEgPSB7XG4gICAgICAgICdGYWNodG1ldHpnZXJlaSc6ICdpY29uLWJ1dGNoZXItbWQnLFxuICAgICAgICAnRmFjaG1ldHpnZXJlaSc6ICdpY29uLWJ1dGNoZXItbWQnLFxuICAgICAgICAnU8O8w59lcyAmIFNhbHppZ2VzJzogJ2ljb24tc3dlZXQtYW5kLXNhdm91cnktbWQnLFxuICAgICAgICAnV3Vyc3QgJiBLw6RzZSc6ICdpY29uLXNhdXNhZ2UtYW5kLWNoZWVzZS1tZCcsXG4gICAgICAgICdCw6Rja2VyZWknOiAnaWNvbi1iYWtlci1tZCcsXG4gICAgICAgICdNZWlzdGVyYsOkY2tlcmVpJzogJ2ljb24tYmFrZXItbWQnLFxuICAgICAgICAnRmxlaWNoICYgRmlzY2gnOiAnaWNvbi1tZWF0LXNhdXNhZ2VzLWZpc2gtbWQnLFxuICAgICAgICAnVGllZmvDvGhsJzogJ2ljb24tcmVhZHktbWVhbHMtbWQnLFxuICAgICAgICAnQW5nZWJvdGUnOiAnaWNvbi1vZmZlci1tZCcsXG4gICAgICAgICdPYnN0ICYgR2Vtw7xzZSc6ICdpY29uLWZydWl0LWFuZC12ZWdldGFibGVzLW1kJyxcbiAgICAgICAgJ1NwaWVsLSAmIFNjaHJlaWJ3YXJlbic6ICdpY29uLWdhbWVzLW1kJyxcbiAgICAgICAgJ1NwaWVsICYgU2NocmVpYndhcmVuJzogJ2ljb24tZ2FtZXMtbWQnLFxuICAgICAgICAnS8O2cnBlcnBmbGVnZSAmIEtvc21ldGlrJzogJ2ljb24tY29zbWV0aWNzLW1kJyxcbiAgICAgICAgJ0ZyaXNjaGUgUHJvZHVrdGUnOiAnaWNvbi1mcmVzaC1wcm9kdWN0LW1kJyxcbiAgICAgICAgJ1ZvcnJhdHNzY2hyYW5rJzogJ2ljb24tcGFudHJ5LW1kJyxcbiAgICAgICAgJ0ZyZWl6ZWl0LCBUaWVyICYgQXV0byc6ICdpY29uLWFuaW1hbHMtbWQnLFxuICAgICAgICAnQmFieSAmIFNjaHdhbmdlcnNjaGFmdCc6ICdpY29uLWJhYnktbWQnLFxuICAgICAgICAnRWxla3Ryb25payc6ICdpY29uLWVsZWN0cm9uaWNzLW1kJyxcbiAgICAgICAgJ1RleHRpbCAmIFNjaG11Y2snOiAnaWNvbi1jbG90aGVzLW1kJyxcbiAgICAgICAgJ0dldHLDpG5rZSc6ICdpY29uLWRyaW5rcy1tZCcsXG4gICAgICAgICdGZXJ0aWdnZXJpY2h0ZSAmIFRpZWZrw7xobCc6ICdpY29uLXJlYWR5LW1lYWxzLW1kJyxcbiAgICAgICAgJ0Zpc2NoICYgRmxlaXNjaCc6ICdpY29uLW1lYXQtbWQnLFxuICAgICAgICAnRmxlaXNjaCAmIEZpc2NoJzogJ2ljb24tbWVhdC1tZCcsXG4gICAgICAgICdIYXVzaGFsdCc6ICdpY29uLWhvdXNlaG9sZC1tZCdcbiAgICB9O1xuICAgIHByb3RlY3RlZCBtYXA6IE1hcDxzdHJpbmcsIHN0cmluZz47XG5cbiAgICBwcm90ZWN0ZWQgaW5pdCgpIHtcbiAgICAgICAgc3VwZXIuaW5pdCgpO1xuICAgICAgICB0aGlzLm1hcCA9IG5ldyBNYXA8c3RyaW5nLCBzdHJpbmc+KE9iamVjdC5lbnRyaWVzKHRoaXMuY2xhc3NEYXRhKSk7XG5cbiAgICAgICAgaWYgKGRvY3VtZW50LnJlYWR5U3RhdGUgPT09ICdpbnRlcmFjdGl2ZScgfHwgZG9jdW1lbnQucmVhZHlTdGF0ZSA9PT0gJ2NvbXBsZXRlJykge1xuICAgICAgICAgICAgd2luZG93LmFkZEV2ZW50TGlzdGVuZXIoJ0RPTU5vZGVJbnNlcnRlZCcsIG5vZGVJbnNlcnRlZEV2ZW50ID0+IHtcbiAgICAgICAgICAgICAgICBpZiAobm9kZUluc2VydGVkRXZlbnQucmVsYXRlZE5vZGUubG9jYWxOYW1lID09PSAnZmYtYXNuLWdyb3VwLWVsZW1lbnQnKSB7XG4gICAgICAgICAgICAgICAgICAgIGNvbnN0IHNwYW4gPSBub2RlSW5zZXJ0ZWRFdmVudC5yZWxhdGVkTm9kZS5xdWVyeVNlbGVjdG9yKCdzcGFuJyk7XG4gICAgICAgICAgICAgICAgICAgIGlmIChzcGFuICE9PSB1bmRlZmluZWQgJiYgc3BhbiAhPT0gbnVsbCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHNwYW4uY2xhc3NMaXN0LmNvbnRhaW5zKCdmaWx0ZXJOYW1lJykpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb25zdCBjbGFzc05hbWUgPSB0aGlzLmdldENsYXNzTmFtZShzcGFuLmlubmVyVGV4dC50cmltKCkpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmICghbm9kZUluc2VydGVkRXZlbnQucmVsYXRlZE5vZGUuY2xhc3NMaXN0LmNvbnRhaW5zKCdjbHVzdGVyTGV2ZWwxJykgJiZcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIW5vZGVJbnNlcnRlZEV2ZW50LnJlbGF0ZWROb2RlLmNsYXNzTGlzdC5jb250YWlucygnY2x1c3RlckxldmVsMicpICYmXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICFub2RlSW5zZXJ0ZWRFdmVudC5yZWxhdGVkTm9kZS5jbGFzc0xpc3QuY29udGFpbnMoJ2NsdXN0ZXJMZXZlbDMnKSlcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuYWRkQ2xhc3NlcyhzcGFuLCBjbGFzc05hbWUsICdzcGFuJyk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKG5vZGVJbnNlcnRlZEV2ZW50LnJlbGF0ZWROb2RlLmhhc0F0dHJpYnV0ZSgnc2VsZWN0ZWQnKSAmJlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICFub2RlSW5zZXJ0ZWRFdmVudC5yZWxhdGVkTm9kZS5jbGFzc0xpc3QuY29udGFpbnMoJ2NsdXN0ZXJMZXZlbDEnKSAmJlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICFub2RlSW5zZXJ0ZWRFdmVudC5yZWxhdGVkTm9kZS5jbGFzc0xpc3QuY29udGFpbnMoJ2NsdXN0ZXJMZXZlbDInKSAmJlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICFub2RlSW5zZXJ0ZWRFdmVudC5yZWxhdGVkTm9kZS5jbGFzc0xpc3QuY29udGFpbnMoJ2NsdXN0ZXJMZXZlbDMnKSlcbiAgICAgICAgICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb25zdCBwYXJlbnREaXYgPSBub2RlSW5zZXJ0ZWRFdmVudC5yZWxhdGVkTm9kZS5xdWVyeVNlbGVjdG9yKCdkaXZbc2xvdD1zZWxlY3RlZF0nKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAocGFyZW50RGl2ICE9PSB1bmRlZmluZWQgJiYgcGFyZW50RGl2ICE9PSBudWxsKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbnN0IGNsYXNzTmFtZSA9IHRoaXMuZ2V0Q2xhc3NOYW1lKHBhcmVudERpdi5pbm5lclRleHQudHJpbSgpKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5hZGRDbGFzc2VzKHBhcmVudERpdiwgY2xhc3NOYW1lLCAnZGl2Jyk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBwcm90ZWN0ZWQgcmVhZHlDYWxsYmFjaygpIHt9XG5cbiAgICBwcml2YXRlIGdldENsYXNzTmFtZSh0ZXh0OiBzdHJpbmcpIHtcbiAgICAgICAgdGV4dCA9IHRleHQudHJpbSgpO1xuICAgICAgICBsZXQgY2xhc3NOYW1lID0gdGhpcy5tYXAuZ2V0KHRleHQpO1xuICAgICAgICBpZiAoY2xhc3NOYW1lID09PSB1bmRlZmluZWQgfHwgY2xhc3NOYW1lID09PSBudWxsIHx8IGNsYXNzTmFtZS5sZW5ndGggPCAxKSB7XG4gICAgICAgICAgICBjbGFzc05hbWUgPSB0aGlzLmRlZmF1bHRDbGFzc05hbWU7XG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4gY2xhc3NOYW1lO1xuICAgIH1cblxuICAgIHByaXZhdGUgYWRkQ2xhc3NlcyhlbGVtZW50OiBIVE1MRWxlbWVudCwgY2xhc3NOYW1lOiBzdHJpbmcsIGZsYWc6IHN0cmluZykge1xuICAgICAgICBlbGVtZW50LmNsYXNzTGlzdC5hZGQoY2xhc3NOYW1lKTtcbiAgICAgICAgaWYgKGZsYWcgPT09ICdkaXYnKSB7XG4gICAgICAgICAgICBlbGVtZW50LmNsYXNzTGlzdC5hZGQodGhpcy5jYXRlZ29yeUNsYXNzRGl2KTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIGVsZW1lbnQuY2xhc3NMaXN0LmFkZCh0aGlzLmNhdGVnb3J5Q2xhc3MpO1xuICAgICAgICB9XG4gICAgfVxufVxuIl0sInNvdXJjZVJvb3QiOiIifQ==