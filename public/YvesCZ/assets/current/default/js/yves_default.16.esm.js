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
              var className = this.getClassName(span.innerText.trim());

              if (!nodeInsertedEvent.relatedNode.classList.contains('clusterLevel1') && !nodeInsertedEvent.relatedNode.classList.contains('clusterLevel2') && !nodeInsertedEvent.relatedNode.classList.contains('clusterLevel3')) {
                this.addClasses(span, className, 'span');
              }
            }
          } else {
            if (nodeInsertedEvent.relatedNode.hasAttribute('selected') && !nodeInsertedEvent.relatedNode.classList.contains('clusterLevel1') && !nodeInsertedEvent.relatedNode.classList.contains('clusterLevel2') && !nodeInsertedEvent.relatedNode.classList.contains('clusterLevel3')) {
              var parentDiv = nodeInsertedEvent.relatedNode.querySelector('div[slot=selected]');

              if (parentDiv !== undefined && parentDiv !== null) {
                var _className = this.getClassName(parentDiv.innerText.trim());

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vLi9zcmMvUHl6L1l2ZXMvRmFjdEZpbmRlcldlYkNvbXBvbmVudHMvVGhlbWUvZGVmYXVsdC9jb21wb25lbnRzL21vbGVjdWxlcy9mYWNldHMtYXNuL2ZhY2V0cy1hc24udHMiXSwibmFtZXMiOlsiRmFjZXRzQXNuIiwiQ29tcG9uZW50IiwiaW5pdCIsIm1hcCIsIk1hcCIsIk9iamVjdCIsImVudHJpZXMiLCJjbGFzc0RhdGEiLCJkb2N1bWVudCIsInJlYWR5U3RhdGUiLCJ3aW5kb3ciLCJhZGRFdmVudExpc3RlbmVyIiwibm9kZUluc2VydGVkRXZlbnQiLCJyZWxhdGVkTm9kZSIsImxvY2FsTmFtZSIsInNwYW4iLCJxdWVyeVNlbGVjdG9yIiwidW5kZWZpbmVkIiwiY2xhc3NMaXN0IiwiY29udGFpbnMiLCJjbGFzc05hbWUiLCJnZXRDbGFzc05hbWUiLCJpbm5lclRleHQiLCJ0cmltIiwiYWRkQ2xhc3NlcyIsImhhc0F0dHJpYnV0ZSIsInBhcmVudERpdiIsInJlYWR5Q2FsbGJhY2siLCJ0ZXh0IiwiZ2V0IiwibGVuZ3RoIiwiZGVmYXVsdENsYXNzTmFtZSIsImVsZW1lbnQiLCJmbGFnIiwiYWRkIiwiY2F0ZWdvcnlDbGFzc0RpdiIsImNhdGVnb3J5Q2xhc3MiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7OztBQUFBO0FBRWUsTUFBTUEsU0FBTixTQUF3QkMsK0RBQXhCLENBQ2Y7QUFBQTtBQUFBOztBQUFBOztBQUFBLDhDQUV1Qyw2QkFGdkM7O0FBQUEsMkNBR29DLHVCQUhwQzs7QUFBQSw4Q0FJdUMsMkJBSnZDOztBQUFBLHVDQUswQjtBQUNsQix3QkFBa0IsaUJBREE7QUFFbEIsdUJBQWlCLGlCQUZDO0FBR2xCLDBCQUFvQiwyQkFIRjtBQUlsQixzQkFBZ0IsNEJBSkU7QUFLbEIsa0JBQVksZUFMTTtBQU1sQix5QkFBbUIsZUFORDtBQU9sQix3QkFBa0IsNEJBUEE7QUFRbEIsa0JBQVkscUJBUk07QUFTbEIsa0JBQVksZUFUTTtB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Q0o7O0FBRVNPLGVBQVYsR0FBMEIsQ0FBRTs7QUFFcEJOLGNBQVIsQ0FBcUJPLElBQXJCLEVBQW1DO0FBQy9CQSxRQUFJLEdBQUdBLElBQUksQ0FBQ0wsSUFBTCxFQUFQO0FBQ0EsUUFBSUgsU0FBUyxHQUFHLEtBQUtqQixHQUFMLENBQVMwQixHQUFULENBQWFELElBQWIsQ0FBaEI7O0FBQ0EsUUFBSVIsU0FBUyxLQUFLSCxTQUFkLElBQTJCRyxTQUFTLEtBQUssSUFBekMsSUFBaURBLFNBQVMsQ0FBQ1UsTUFBVixHQUFtQixDQUF4RSxFQUEyRTtBQUN2RVYsZUFBUyxHQUFHLEtBQUtXLGdCQUFqQjtBQUNIOztBQUVELFdBQU9YLFNBQVA7QUFDSDs7QUFFT0ksWUFBUixDQUFtQlEsT0FBbkIsRUFBeUNaLFNBQXpDLEVBQTREYSxJQUE1RCxFQUEwRTtBQUN0RUQsV0FBTyxDQUFDZCxTQUFSLENBQWtCZ0IsR0FBbEIsQ0FBc0JkLFNBQXRCOztBQUNBLFFBQUlhLElBQUksS0FBSyxLQUFiLEVBQW9CO0FBQ2hCRCxhQUFPLENBQUNkLFNBQVIsQ0FBa0JnQixHQUFsQixDQUFzQixLQUFLQyxnQkFBM0I7QUFDSCxLQUZELE1BRU87QUFDSEgsYUFBTyxDQUFDZCxTQUFSLENBQWtCZ0IsR0FBbEIsQ0FBc0IsS0FBS0UsYUFBM0I7QUFDSDtBQUNKOztBQXhGTCxDIiwiZmlsZSI6Ii4vanMveXZlc19kZWZhdWx0LjE2LmVzbS5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBDb21wb25lbnQgZnJvbSAnU2hvcFVpL21vZGVscy9jb21wb25lbnQnO1xuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBGYWNldHNBc24gZXh0ZW5kcyBDb21wb25lbnRcbntcbiAgICBwcm90ZWN0ZWQgYXNuUHJpY2U6IEhUTUxFbGVtZW50O1xuICAgIHByaXZhdGUgZGVmYXVsdENsYXNzTmFtZTogc3RyaW5nID0gJ2ljb24tZ2xvYnVzLWxlYWYtZGVmYXVsdC1tZCc7XG4gICAgcHJpdmF0ZSBjYXRlZ29yeUNsYXNzOiBzdHJpbmcgPSAnY2F0ZWdvcnktZmlsdGVyLXN0eWxlJztcbiAgICBwcml2YXRlIGNhdGVnb3J5Q2xhc3NEaXY6IHN0cmluZyA9ICdjYXRlZ29yeS1maWx0ZXItc3R5bGUtZGl2JztcbiAgICBwcm90ZWN0ZWQgY2xhc3NEYXRhID0ge1xuICAgICAgICAnRmFjaHRtZXR6Z2VyZWknOiAnaWNvbi1idXRjaGVyLW1kJyxcbiAgICAgICAgJ0ZhY2htZXR6Z2VyZWknOiAnaWNvbi1idXRjaGVyLW1kJyxcbiAgICAgICAgJ1PDvMOfZXMgJiBTYWx6aWdlcyc6ICdpY29uLXN3ZWV0LWFuZC1zYXZvdXJ5LW1kJyxcbiAgICAgICAgJ1d1cnN0ICYgS8Okc2UnOiAnaWNvbi1zYXVzYWdlLWFuZC1jaGVlc2UtbWQnLFxuICAgICAgICAnQsOkY2tlcmVpJzogJ2ljb24tYmFrZXItbWQnLFxuICAgICAgICAnTWVpc3RlcmLDpGNrZXJlaSc6ICdpY29uLWJha2VyLW1kJyxcbiAgICAgICAgJ0ZsZWljaCAmIEZpc2NoJzogJ2ljb24tbWVhdC1zYXVzYWdlcy1maXNoLW1kJyxcbiAgICAgICAgJ1RpZWZrw7xobCc6ICdpY29uLXJlYWR5LW1lYWxzLW1kJyxcbiAgICAgICAgJ0FuZ2Vib3RlJzogJ2ljb24tb2ZmZXItbWQnLFxuICAgICAgICAnT2JzdCAmIEdlbcO8c2UnOiAnaWNvbi1mcnVpdC1hbmQtdmVnZXRhYmxlcy1tZCcsXG4gICAgICAgICdTcGllbC0gJiBTY2hyZWlid2FyZW4nOiAnaWNvbi1nYW1lcy1tZCcsXG4gICAgICAgICdTcGllbCAmIFNjaHJlaWJ3YXJlbic6ICdpY29uLWdhbWVzLW1kJyxcbiAgICAgICAgJ0vDtnJwZXJwZmxlZ2UgJiBLb3NtZXRpayc6ICdpY29uLWNvc21ldGljcy1tZCcsXG4gICAgICAgICdGcmlzY2hlIFByb2R1a3RlJzogJ2ljb24tZnJlc2gtcHJvZHVjdC1tZCcsXG4gICAgICAgICdWb3JyYXRzc2NocmFuayc6ICdpY29uLXBhbnRyeS1tZCcsXG4gICAgICAgICdGcmVpemVpdCwgVGllciAmIEF1dG8nOiAnaWNvbi1hbmltYWxzLW1kJyxcbiAgICAgICAgJ0JhYnkgJiBTY2h3YW5nZXJzY2hhZnQnOiAnaWNvbi1iYWJ5LW1kJyxcbiAgICAgICAgJ0VsZWt0cm9uaWsnOiAnaWNvbi1lbGVjdHJvbmljcy1tZCcsXG4gICAgICAgICdUZXh0aWwgJiBTY2htdWNrJzogJ2ljb24tY2xvdGhlcy1tZCcsXG4gICAgICAgICdHZXRyw6Rua2UnOiAnaWNvbi1kcmlua3MtbWQnLFxuICAgICAgICAnRmVydGlnZ2VyaWNodGUgJiBUaWVma8O8aGwnOiAnaWNvbi1yZWFkeS1tZWFscy1tZCcsXG4gICAgICAgICdGaXNjaCAmIEZsZWlzY2gnOiAnaWNvbi1tZWF0LW1kJyxcbiAgICAgICAgJ0ZsZWlzY2ggJiBGaXNjaCc6ICdpY29uLW1lYXQtbWQnLFxuICAgICAgICAnSGF1c2hhbHQnOiAnaWNvbi1ob3VzZWhvbGQtbWQnXG4gICAgfTtcbiAgICBwcm90ZWN0ZWQgbWFwOiBNYXA8c3RyaW5nLCBzdHJpbmc+O1xuXG4gICAgcHJvdGVjdGVkIGluaXQoKSB7XG4gICAgICAgIHN1cGVyLmluaXQoKTtcbiAgICAgICAgdGhpcy5tYXAgPSBuZXcgTWFwPHN0cmluZywgc3RyaW5nPihPYmplY3QuZW50cmllcyh0aGlzLmNsYXNzRGF0YSkpO1xuXG4gICAgICAgIGlmIChkb2N1bWVudC5yZWFkeVN0YXRlID09PSAnaW50ZXJhY3RpdmUnIHx8IGRvY3VtZW50LnJlYWR5U3RhdGUgPT09ICdjb21wbGV0ZScpIHtcbiAgICAgICAgICAgIHdpbmRvdy5hZGRFdmVudExpc3RlbmVyKCdET01Ob2RlSW5zZXJ0ZWQnLCBub2RlSW5zZXJ0ZWRFdmVudCA9PiB7XG4gICAgICAgICAgICAgICAgaWYgKG5vZGVJbnNlcnRlZEV2ZW50LnJlbGF0ZWROb2RlLmxvY2FsTmFtZSA9PT0gJ2ZmLWFzbi1ncm91cC1lbGVtZW50Jykge1xuICAgICAgICAgICAgICAgICAgICBjb25zdCBzcGFuID0gbm9kZUluc2VydGVkRXZlbnQucmVsYXRlZE5vZGUucXVlcnlTZWxlY3Rvcignc3BhbicpO1xuICAgICAgICAgICAgICAgICAgICBpZiAoc3BhbiAhPT0gdW5kZWZpbmVkICYmIHNwYW4gIT09IG51bGwpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmIChzcGFuLmNsYXNzTGlzdC5jb250YWlucygnZmlsdGVyTmFtZScpKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY29uc3QgY2xhc3NOYW1lID0gdGhpcy5nZXRDbGFzc05hbWUoc3Bhbi5pbm5lclRleHQudHJpbSgpKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAoIW5vZGVJbnNlcnRlZEV2ZW50LnJlbGF0ZWROb2RlLmNsYXNzTGlzdC5jb250YWlucygnY2x1c3RlckxldmVsMScpICYmXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICFub2RlSW5zZXJ0ZWRFdmVudC5yZWxhdGVkTm9kZS5jbGFzc0xpc3QuY29udGFpbnMoJ2NsdXN0ZXJMZXZlbDInKSAmJlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAhbm9kZUluc2VydGVkRXZlbnQucmVsYXRlZE5vZGUuY2xhc3NMaXN0LmNvbnRhaW5zKCdjbHVzdGVyTGV2ZWwzJykpXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmFkZENsYXNzZXMoc3BhbiwgY2xhc3NOYW1lLCAnc3BhbicpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmIChub2RlSW5zZXJ0ZWRFdmVudC5yZWxhdGVkTm9kZS5oYXNBdHRyaWJ1dGUoJ3NlbGVjdGVkJykgJiZcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAhbm9kZUluc2VydGVkRXZlbnQucmVsYXRlZE5vZGUuY2xhc3NMaXN0LmNvbnRhaW5zKCdjbHVzdGVyTGV2ZWwxJykgJiZcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAhbm9kZUluc2VydGVkRXZlbnQucmVsYXRlZE5vZGUuY2xhc3NMaXN0LmNvbnRhaW5zKCdjbHVzdGVyTGV2ZWwyJykgJiZcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAhbm9kZUluc2VydGVkRXZlbnQucmVsYXRlZE5vZGUuY2xhc3NMaXN0LmNvbnRhaW5zKCdjbHVzdGVyTGV2ZWwzJykpXG4gICAgICAgICAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY29uc3QgcGFyZW50RGl2ID0gbm9kZUluc2VydGVkRXZlbnQucmVsYXRlZE5vZGUucXVlcnlTZWxlY3RvcignZGl2W3Nsb3Q9c2VsZWN0ZWRdJyk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHBhcmVudERpdiAhPT0gdW5kZWZpbmVkICYmIHBhcmVudERpdiAhPT0gbnVsbCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb25zdCBjbGFzc05hbWUgPSB0aGlzLmdldENsYXNzTmFtZShwYXJlbnREaXYuaW5uZXJUZXh0LnRyaW0oKSk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuYWRkQ2xhc3NlcyhwYXJlbnREaXYsIGNsYXNzTmFtZSwgJ2RpdicpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgcHJvdGVjdGVkIHJlYWR5Q2FsbGJhY2soKSB7fVxuXG4gICAgcHJpdmF0ZSBnZXRDbGFzc05hbWUodGV4dDogc3RyaW5nKSB7XG4gICAgICAgIHRleHQgPSB0ZXh0LnRyaW0oKTtcbiAgICAgICAgbGV0IGNsYXNzTmFtZSA9IHRoaXMubWFwLmdldCh0ZXh0KTtcbiAgICAgICAgaWYgKGNsYXNzTmFtZSA9PT0gdW5kZWZpbmVkIHx8IGNsYXNzTmFtZSA9PT0gbnVsbCB8fCBjbGFzc05hbWUubGVuZ3RoIDwgMSkge1xuICAgICAgICAgICAgY2xhc3NOYW1lID0gdGhpcy5kZWZhdWx0Q2xhc3NOYW1lO1xuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIGNsYXNzTmFtZTtcbiAgICB9XG5cbiAgICBwcml2YXRlIGFkZENsYXNzZXMoZWxlbWVudDogSFRNTEVsZW1lbnQsIGNsYXNzTmFtZTogc3RyaW5nLCBmbGFnOiBzdHJpbmcpIHtcbiAgICAgICAgZWxlbWVudC5jbGFzc0xpc3QuYWRkKGNsYXNzTmFtZSk7XG4gICAgICAgIGlmIChmbGFnID09PSAnZGl2Jykge1xuICAgICAgICAgICAgZWxlbWVudC5jbGFzc0xpc3QuYWRkKHRoaXMuY2F0ZWdvcnlDbGFzc0Rpdik7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBlbGVtZW50LmNsYXNzTGlzdC5hZGQodGhpcy5jYXRlZ29yeUNsYXNzKTtcbiAgICAgICAgfVxuICAgIH1cbn1cbiJdLCJzb3VyY2VSb290IjoiIn0=