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
/* harmony import */ var ShopUi_models_component__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ShopUi/models/component */ "./vendor/spryker-shop/shop-ui/src/SprykerShop/Yves/ShopUi/Theme/default/models/component.ts");
function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }


class FacetsAsn extends ShopUi_models_component__WEBPACK_IMPORTED_MODULE_0__["default"] {
  constructor() {
    super(...arguments);

    _defineProperty(this, "asnPrice", void 0);

    _defineProperty(this, "defaultClassName", 'icon-globus-leaf-default-md');

    _defineProperty(this, "categoryClass", 'category-filter-style');

    _defineProperty(this, "categoryClassDiv", 'category-filter-style-div');

    _defineProperty(this, "classData", {
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

    _defineProperty(this, "map", void 0);
  }

  init() {
    super.init();
    this.map = new Map(Object.entries(this.classData));

    if (document.readyState === 'interactive' || document.readyState === 'complete') {
      window.addEventListener('DOMNodeInserted', nodeInsertedEvent => {
        if (nodeInsertedEvent.relatedNode.localName === 'ff-asn-group-element') {
          var span = nodeInsertedEvent.relatedNode.querySelector('span');

          if (span !== undefined && span !== null) {
            if (span.classList.contains('filterName')) {
              var className = this.getClassName(span.innerText);

              if (!nodeInsertedEvent.relatedNode.classList.contains('clusterLevel1') && !nodeInsertedEvent.relatedNode.classList.contains('clusterLevel2') && !nodeInsertedEvent.relatedNode.classList.contains('clusterLevel3')) {
                this.addClasses(span, className, 'span');
              }
            }
          } else {
            if (nodeInsertedEvent.relatedNode.hasAttribute('selected')) {
              var parentDiv = nodeInsertedEvent.relatedNode.querySelector('div[slot=selected]');

              if (parentDiv !== undefined && parentDiv !== null) {
                var _className = this.getClassName(parentDiv.innerText);

                this.addClasses(parentDiv, _className, 'div');
              }
            }
          }
        }
      });
    }
  }

  readyCallback() {}

  getClassName(text) {
    text = text.trim();
    var className = this.map.get(text);

    if (className === undefined || className === null || className.length < 1) {
      className = this.defaultClassName;
    }

    return className;
  }

  addClasses(element, className, flag) {
    element.classList.add(className);

    if (flag === 'div') {
      element.classList.add(this.categoryClassDiv);
    } else {
      element.classList.add(this.categoryClass);
    }
  }

}

/***/ })

}]);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vLi9zcmMvUHl6L1l2ZXMvRmFjdEZpbmRlcldlYkNvbXBvbmVudHMvVGhlbWUvZGVmYXVsdC9jb21wb25lbnRzL21vbGVjdWxlcy9mYWNldHMtYXNuL2ZhY2V0cy1hc24udHMiXSwibmFtZXMiOlsiRmFjZXRzQXNuIiwiQ29tcG9uZW50IiwiaW5pdCIsIm1hcCIsIk1hcCIsIk9iamVjdCIsImVudHJpZXMiLCJjbGFzc0RhdGEiLCJkb2N1bWVudCIsInJlYWR5U3RhdGUiLCJ3aW5kb3ciLCJhZGRFdmVudExpc3RlbmVyIiwibm9kZUluc2VydGVkRXZlbnQiLCJyZWxhdGVkTm9kZSIsImxvY2FsTmFtZSIsInNwYW4iLCJxdWVyeVNlbGVjdG9yIiwidW5kZWZpbmVkIiwiY2xhc3NMaXN0IiwiY29udGFpbnMiLCJjbGFzc05hbWUiLCJnZXRDbGFzc05hbWUiLCJpbm5lclRleHQiLCJhZGRDbGFzc2VzIiwiaGFzQXR0cmlidXRlIiwicGFyZW50RGl2IiwicmVhZHlDYWxsYmFjayIsInRleHQiLCJ0cmltIiwiZ2V0IiwibGVuZ3RoIiwiZGVmYXVsdENsYXNzTmFtZSIsImVsZW1lbnQiLCJmbGFnIiwiYWRkIiwiY2F0ZWdvcnlDbGFzc0RpdiIsImNhdGVnb3J5Q2xhc3MiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7OztBQUFBO0FBRWUsTUFBTUEsU0FBTixTQUF3QkMsK0RBQXhCLENBQ2Y7QUFBQTtBQUFBOztBQUFBOztBQUFBLDhDQUV1Qyw2QkFGdkM7O0FBQUEsMkNBR29DLHVCQUhwQzs7QUFBQSw4Q0FJdUMsMkJBSnZDOztBQUFBLHVDQUswQjtBQUNsQix3QkFBa0IsaUJBREE7QUFFbEIsMEJBQW9CLDJCQUZGO0FBR2xCLHNCQUFnQiw0QkFIRTtBQUlsQixrQkFBWSxlQUpNO0FBS2xCLHdCQUFrQiw0QkFMQTtBQU1sQixrQkFBWSxxQkFOTTtBQU9sQixrQkFBWSxlQVBNO0FBUWxCLHVCQUFpQiw4QkFSQztBQVNsQiwrQkFBeUIsZUFUUDtB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OztBQUVPRyxZQUFSLENBQW1CUyxPQUFuQixFQUF5Q1osU0FBekMsRUFBNERhLElBQTVELEVBQTBFO0FBQ3RFRCxXQUFPLENBQUNkLFNBQVIsQ0FBa0JnQixHQUFsQixDQUFzQmQsU0FBdEI7O0FBQ0EsUUFBSWEsSUFBSSxLQUFLLEtBQWIsRUFBb0I7QUFDaEJELGFBQU8sQ0FBQ2QsU0FBUixDQUFrQmdCLEdBQWxCLENBQXNCLEtBQUtDLGdCQUEzQjtBQUNILEtBRkQsTUFFTztBQUNISCxhQUFPLENBQUNkLFNBQVIsQ0FBa0JnQixHQUFsQixDQUFzQixLQUFLRSxhQUEzQjtBQUNIO0FBQ0o7O0FBakZMLEMiLCJmaWxlIjoiLi9qcy95dmVzX2RlZmF1bHQuMTYuZXNtLmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IENvbXBvbmVudCBmcm9tICdTaG9wVWkvbW9kZWxzL2NvbXBvbmVudCc7XG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIEZhY2V0c0FzbiBleHRlbmRzIENvbXBvbmVudFxue1xuICAgIHByb3RlY3RlZCBhc25QcmljZTogSFRNTEVsZW1lbnQ7XG4gICAgcHJpdmF0ZSBkZWZhdWx0Q2xhc3NOYW1lOiBzdHJpbmcgPSAnaWNvbi1nbG9idXMtbGVhZi1kZWZhdWx0LW1kJztcbiAgICBwcml2YXRlIGNhdGVnb3J5Q2xhc3M6IHN0cmluZyA9ICdjYXRlZ29yeS1maWx0ZXItc3R5bGUnO1xuICAgIHByaXZhdGUgY2F0ZWdvcnlDbGFzc0Rpdjogc3RyaW5nID0gJ2NhdGVnb3J5LWZpbHRlci1zdHlsZS1kaXYnO1xuICAgIHByb3RlY3RlZCBjbGFzc0RhdGEgPSB7XG4gICAgICAgICdGYWNodG1ldHpnZXJlaSc6ICdpY29uLWJ1dGNoZXItbWQnLFxuICAgICAgICAnU8O8w59lcyAmIFNhbHppZ2VzJzogJ2ljb24tc3dlZXQtYW5kLXNhdm91cnktbWQnLFxuICAgICAgICAnV3Vyc3QgJiBLw6RzZSc6ICdpY29uLXNhdXNhZ2UtYW5kLWNoZWVzZS1tZCcsXG4gICAgICAgICdCw6Rja2VyZWknOiAnaWNvbi1iYWtlci1tZCcsXG4gICAgICAgICdGbGVpY2ggJiBGaXNjaCc6ICdpY29uLW1lYXQtc2F1c2FnZXMtZmlzaC1tZCcsXG4gICAgICAgICdUaWVma8O8aGwnOiAnaWNvbi1yZWFkeS1tZWFscy1tZCcsXG4gICAgICAgICdBbmdlYm90ZSc6ICdpY29uLW9mZmVyLW1kJyxcbiAgICAgICAgJ09ic3QgJiBHZW3DvHNlJzogJ2ljb24tZnJ1aXQtYW5kLXZlZ2V0YWJsZXMtbWQnLFxuICAgICAgICAnU3BpZWwtICYgU2NocmVpYndhcmVuJzogJ2ljb24tZ2FtZXMtbWQnLFxuICAgICAgICAnU3BpZWwgJiBTY2hyZWlid2FyZW4nOiAnaWNvbi1nYW1lcy1tZCcsXG4gICAgICAgICdLw7ZycGVycGZsZWdlICYgS29zbWV0aWsnOiAnaWNvbi1jb3NtZXRpY3MtbWQnLFxuICAgICAgICAnRnJpc2NoZSBQcm9kdWt0ZSc6ICdpY29uLWZyZXNoLXByb2R1Y3QtbWQnLFxuICAgICAgICAnVm9ycmF0c3NjaHJhbmsnOiAnaWNvbi1wYW50cnktbWQnLFxuICAgICAgICAnRnJlaXplaXQsIFRpZXIgJiBBdXRvJzogJ2ljb24tYW5pbWFscy1tZCcsXG4gICAgICAgICdCYWJ5ICYgU2Nod2FuZ2Vyc2NoYWZ0JzogJ2ljb24tYmFieS1tZCcsXG4gICAgICAgICdFbGVrdHJvbmlrJzogJ2ljb24tZWxlY3Ryb25pY3MtbWQnLFxuICAgICAgICAnVGV4dGlsICYgU2NobXVjayc6ICdpY29uLWNsb3RoZXMtbWQnLFxuICAgICAgICAnR2V0csOkbmtlJzogJ2ljb24tZHJpbmtzLW1kJyxcbiAgICAgICAgJ0ZlcnRpZ2dlcmljaHRlICYgVGllZmvDvGhsJzogJ2ljb24tcmVhZHktbWVhbHMtbWQnLFxuICAgICAgICAnRmlzY2ggJiBGbGVpc2NoJzogJ2ljb24tbWVhdC1tZCcsXG4gICAgICAgICdIYXVzaGFsdCc6ICdpY29uLWhvdXNlaG9sZC1tZCdcbiAgICB9O1xuICAgIHByb3RlY3RlZCBtYXA6IE1hcDxzdHJpbmcsIHN0cmluZz47XG5cbiAgICBwcm90ZWN0ZWQgaW5pdCgpIHtcbiAgICAgICAgc3VwZXIuaW5pdCgpO1xuICAgICAgICB0aGlzLm1hcCA9IG5ldyBNYXA8c3RyaW5nLCBzdHJpbmc+KE9iamVjdC5lbnRyaWVzKHRoaXMuY2xhc3NEYXRhKSk7XG5cbiAgICAgICAgaWYgKGRvY3VtZW50LnJlYWR5U3RhdGUgPT09ICdpbnRlcmFjdGl2ZScgfHwgZG9jdW1lbnQucmVhZHlTdGF0ZSA9PT0gJ2NvbXBsZXRlJykge1xuICAgICAgICAgICAgd2luZG93LmFkZEV2ZW50TGlzdGVuZXIoJ0RPTU5vZGVJbnNlcnRlZCcsIG5vZGVJbnNlcnRlZEV2ZW50ID0+IHtcbiAgICAgICAgICAgICAgICBpZiAobm9kZUluc2VydGVkRXZlbnQucmVsYXRlZE5vZGUubG9jYWxOYW1lID09PSAnZmYtYXNuLWdyb3VwLWVsZW1lbnQnKSB7XG4gICAgICAgICAgICAgICAgICAgIGNvbnN0IHNwYW4gPSBub2RlSW5zZXJ0ZWRFdmVudC5yZWxhdGVkTm9kZS5xdWVyeVNlbGVjdG9yKCdzcGFuJyk7XG4gICAgICAgICAgICAgICAgICAgIGlmIChzcGFuICE9PSB1bmRlZmluZWQgJiYgc3BhbiAhPT0gbnVsbCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHNwYW4uY2xhc3NMaXN0LmNvbnRhaW5zKCdmaWx0ZXJOYW1lJykpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb25zdCBjbGFzc05hbWUgPSB0aGlzLmdldENsYXNzTmFtZShzcGFuLmlubmVyVGV4dCk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKCFub2RlSW5zZXJ0ZWRFdmVudC5yZWxhdGVkTm9kZS5jbGFzc0xpc3QuY29udGFpbnMoJ2NsdXN0ZXJMZXZlbDEnKSAmJlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAhbm9kZUluc2VydGVkRXZlbnQucmVsYXRlZE5vZGUuY2xhc3NMaXN0LmNvbnRhaW5zKCdjbHVzdGVyTGV2ZWwyJykgJiZcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIW5vZGVJbnNlcnRlZEV2ZW50LnJlbGF0ZWROb2RlLmNsYXNzTGlzdC5jb250YWlucygnY2x1c3RlckxldmVsMycpKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5hZGRDbGFzc2VzKHNwYW4sIGNsYXNzTmFtZSwgJ3NwYW4nKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAobm9kZUluc2VydGVkRXZlbnQucmVsYXRlZE5vZGUuaGFzQXR0cmlidXRlKCdzZWxlY3RlZCcpKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY29uc3QgcGFyZW50RGl2ID0gbm9kZUluc2VydGVkRXZlbnQucmVsYXRlZE5vZGUucXVlcnlTZWxlY3RvcignZGl2W3Nsb3Q9c2VsZWN0ZWRdJyk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHBhcmVudERpdiAhPT0gdW5kZWZpbmVkICYmIHBhcmVudERpdiAhPT0gbnVsbCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb25zdCBjbGFzc05hbWUgPSB0aGlzLmdldENsYXNzTmFtZShwYXJlbnREaXYuaW5uZXJUZXh0KTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5hZGRDbGFzc2VzKHBhcmVudERpdiwgY2xhc3NOYW1lLCAnZGl2Jyk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBwcm90ZWN0ZWQgcmVhZHlDYWxsYmFjaygpIHt9XG5cbiAgICBwcml2YXRlIGdldENsYXNzTmFtZSh0ZXh0OiBzdHJpbmcpIHtcbiAgICAgICAgdGV4dCA9IHRleHQudHJpbSgpO1xuICAgICAgICBsZXQgY2xhc3NOYW1lID0gdGhpcy5tYXAuZ2V0KHRleHQpO1xuICAgICAgICBpZiAoY2xhc3NOYW1lID09PSB1bmRlZmluZWQgfHwgY2xhc3NOYW1lID09PSBudWxsIHx8IGNsYXNzTmFtZS5sZW5ndGggPCAxKSB7XG4gICAgICAgICAgICBjbGFzc05hbWUgPSB0aGlzLmRlZmF1bHRDbGFzc05hbWU7XG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4gY2xhc3NOYW1lO1xuICAgIH1cblxuICAgIHByaXZhdGUgYWRkQ2xhc3NlcyhlbGVtZW50OiBIVE1MRWxlbWVudCwgY2xhc3NOYW1lOiBzdHJpbmcsIGZsYWc6IHN0cmluZykge1xuICAgICAgICBlbGVtZW50LmNsYXNzTGlzdC5hZGQoY2xhc3NOYW1lKTtcbiAgICAgICAgaWYgKGZsYWcgPT09ICdkaXYnKSB7XG4gICAgICAgICAgICBlbGVtZW50LmNsYXNzTGlzdC5hZGQodGhpcy5jYXRlZ29yeUNsYXNzRGl2KTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIGVsZW1lbnQuY2xhc3NMaXN0LmFkZCh0aGlzLmNhdGVnb3J5Q2xhc3MpO1xuICAgICAgICB9XG4gICAgfVxufVxuIl0sInNvdXJjZVJvb3QiOiIifQ==