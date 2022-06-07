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
/* harmony import */ var ShopUi_models_component__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ShopUi/models/component */ "./vendor/spryker-shop/shop-ui/src/SprykerShop/Yves/ShopUi/Theme/default/models/component.ts");
function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }


class NavigationHeader extends ShopUi_models_component__WEBPACK_IMPORTED_MODULE_0__["default"] {
  constructor() {
    super(...arguments);

    _defineProperty(this, "asnPrice", void 0);

    _defineProperty(this, "defaultClassName", 'icon-globus-leaf-default-md');

    _defineProperty(this, "categoryClass", 'category-filter-style');

    _defineProperty(this, "categoryClassDiv", 'category-filter-style-div');

    _defineProperty(this, "navigationButton", void 0);

    _defineProperty(this, "navigationContainer", void 0);

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
        if (nodeInsertedEvent.relatedNode.localName === 'ff-navigation-item') {
          var anchor = nodeInsertedEvent.relatedNode.querySelector('.navigation-icon');

          if (anchor !== undefined && anchor !== null) {
            var className = this.getClassName(anchor.innerText.trim());

            if (nodeInsertedEvent.relatedNode.hasAttribute('cluster-level')) {
              if (nodeInsertedEvent.relatedNode.getAttribute('cluster-level') === '0') {
                this.addClasses(anchor, className, 'span');
              }
            }
          }
        }
      });
      this.navigationButton = document.getElementsByClassName('button__all-products')[0];
      this.navigationContainer = document.getElementsByClassName('js-header__navigation-target')[0];
      this.addButtonEventListener();
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

  addButtonEventListener() {
    if (this.navigationButton !== undefined && this.navigationContainer !== undefined) {
      this.navigationButton.addEventListener('mouseover', () => {
        if (this.navigationContainer.classList.contains('is-hidden')) {
          this.navigationContainer.classList.remove('is-hidden');
        }
      });
      this.navigationContainer.addEventListener('mouseleave', () => {
        if (!this.navigationContainer.classList.contains('is-hidden')) {
          this.navigationContainer.classList.add('is-hidden');
        }
      });
    }
  }

}

/***/ })

}]);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vLi9zcmMvUHl6L1l2ZXMvQ29udGVudE5hdmlnYXRpb25XaWRnZXQvVGhlbWUvZGVmYXVsdC92aWV3cy9uYXZpZ2F0aW9uLWhlYWRlci9uYXZpZ2F0aW9uLWhlYWRlci50cyJdLCJuYW1lcyI6WyJOYXZpZ2F0aW9uSGVhZGVyIiwiQ29tcG9uZW50IiwiaW5pdCIsIm1hcCIsIk1hcCIsIk9iamVjdCIsImVudHJpZXMiLCJjbGFzc0RhdGEiLCJkb2N1bWVudCIsInJlYWR5U3RhdGUiLCJ3aW5kb3ciLCJhZGRFdmVudExpc3RlbmVyIiwibm9kZUluc2VydGVkRXZlbnQiLCJyZWxhdGVkTm9kZSIsImxvY2FsTmFtZSIsImFuY2hvciIsInF1ZXJ5U2VsZWN0b3IiLCJ1bmRlZmluZWQiLCJjbGFzc05hbWUiLCJnZXRDbGFzc05hbWUiLCJpbm5lclRleHQiLCJ0cmltIiwiaGFzQXR0cmlidXRlIiwiZ2V0QXR0cmlidXRlIiwiYWRkQ2xhc3NlcyIsIm5hdmlnYXRpb25CdXR0b24iLCJnZXRFbGVtZW50c0J5Q2xhc3NOYW1lIiwibmF2aWdhdGlvbkNvbnRhaW5lciIsImFkZEJ1dHRvbkV2ZW50TGlzdGVuZXIiLCJyZWFkeUNhbGxiYWNrIiwidGV4dCIsImdldCIsImxlbmd0aCIsImRlZmF1bHRDbGFzc05hbWUiLCJlbGVtZW50IiwiZmxhZyIsImNsYXNzTGlzdCIsImFkZCIsImNhdGVnb3J5Q2xhc3NEaXYiLCJjYXRlZ29yeUNsYXNzIiwiY29udGFpbnMiLCJyZW1vdmUiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7OztBQUFBO0FBRWUsTUFBTUEsZ0JBQU4sU0FBK0JDLCtEQUEvQixDQUNmO0FBQUE7QUFBQTs7QUFBQTs7QUFBQSw4Q0FFdUMsNkJBRnZDOztBQUFBLDJDQUdvQyx1QkFIcEM7O0FBQUEsOENBSXVDLDJCQUp2Qzs7QUFBQTs7QUFBQTs7QUFBQSx1Q0FRMEI7QUFDbEIsd0JBQWtCLGlCQURBO0FBRWxCLHVCQUFpQixpQkFGQztBQUds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QUFLLEtBQWIsRUFBb0I7QUFDaEJELGFBQU8sQ0FBQ0UsU0FBUixDQUFrQkMsR0FBbEIsQ0FBc0IsS0FBS0MsZ0JBQTNCO0FBQ0gsS0FGRCxNQUVPO0FBQ0hKLGFBQU8sQ0FBQ0UsU0FBUixDQUFrQkMsR0FBbEIsQ0FBc0IsS0FBS0UsYUFBM0I7QUFDSDtBQUNKOztBQUVPWCx3QkFBUixHQUFnQztBQUM1QixRQUFHLEtBQUtILGdCQUFMLEtBQTBCUixTQUExQixJQUF1QyxLQUFLVSxtQkFBTCxLQUE2QlYsU0FBdkUsRUFBaUY7QUFDN0UsV0FBS1EsZ0JBQUwsQ0FBc0JkLGdCQUF0QixDQUF1QyxXQUF2QyxFQUFvRCxNQUFNO0FBQ3RELFlBQUcsS0FBS2dCLG1CQUFMLENBQXlCUyxTQUF6QixDQUFtQ0ksUUFBbkMsQ0FBNEMsV0FBNUMsQ0FBSCxFQUE0RDtBQUN4RCxlQUFLYixtQkFBTCxDQUF5QlMsU0FBekIsQ0FBbUNLLE1BQW5DLENBQTBDLFdBQTFDO0FBQ0g7QUFDSixPQUpEO0FBTUEsV0FBS2QsbUJBQUwsQ0FBeUJoQixnQkFBekIsQ0FBMEMsWUFBMUMsRUFBd0QsTUFBTTtBQUMxRCxZQUFHLENBQUMsS0FBS2dCLG1CQUFMLENBQXlCUyxTQUF6QixDQUFtQ0ksUUFBbkMsQ0FBNEMsV0FBNUMsQ0FBSixFQUE2RDtBQUN6RCxlQUFLYixtQkFBTCxDQUF5QlMsU0FBekIsQ0FBbUNDLEdBQW5DLENBQXVDLFdBQXZDO0FBQ0g7QUFDSixPQUpEO0FBS0g7QUFDSjs7QUFsR0wsQyIsImZpbGUiOiIuL2pzL3l2ZXNfZGVmYXVsdC4xNC5lc20uanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgQ29tcG9uZW50IGZyb20gJ1Nob3BVaS9tb2RlbHMvY29tcG9uZW50JztcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgTmF2aWdhdGlvbkhlYWRlciBleHRlbmRzIENvbXBvbmVudFxue1xuICAgIHByb3RlY3RlZCBhc25QcmljZTogSFRNTEVsZW1lbnQ7XG4gICAgcHJpdmF0ZSBkZWZhdWx0Q2xhc3NOYW1lOiBzdHJpbmcgPSAnaWNvbi1nbG9idXMtbGVhZi1kZWZhdWx0LW1kJztcbiAgICBwcml2YXRlIGNhdGVnb3J5Q2xhc3M6IHN0cmluZyA9ICdjYXRlZ29yeS1maWx0ZXItc3R5bGUnO1xuICAgIHByaXZhdGUgY2F0ZWdvcnlDbGFzc0Rpdjogc3RyaW5nID0gJ2NhdGVnb3J5LWZpbHRlci1zdHlsZS1kaXYnO1xuICAgIHByaXZhdGUgbmF2aWdhdGlvbkJ1dHRvbjogSFRNTEJ1dHRvbkVsZW1lbnQ7XG4gICAgcHJpdmF0ZSBuYXZpZ2F0aW9uQ29udGFpbmVyOiBIVE1MRWxlbWVudDtcblxuICAgIHByb3RlY3RlZCBjbGFzc0RhdGEgPSB7XG4gICAgICAgICdGYWNodG1ldHpnZXJlaSc6ICdpY29uLWJ1dGNoZXItbWQnLFxuICAgICAgICAnRmFjaG1ldHpnZXJlaSc6ICdpY29uLWJ1dGNoZXItbWQnLFxuICAgICAgICAnU8O8w59lcyAmIFNhbHppZ2VzJzogJ2ljb24tc3dlZXQtYW5kLXNhdm91cnktbWQnLFxuICAgICAgICAnV3Vyc3QgJiBLw6RzZSc6ICdpY29uLXNhdXNhZ2UtYW5kLWNoZWVzZS1tZCcsXG4gICAgICAgICdCw6Rja2VyZWknOiAnaWNvbi1iYWtlci1tZCcsXG4gICAgICAgICdNZWlzdGVyYsOkY2tlcmVpJzogJ2ljb24tYmFrZXItbWQnLFxuICAgICAgICAnRmxlaWNoICYgRmlzY2gnOiAnaWNvbi1tZWF0LXNhdXNhZ2VzLWZpc2gtbWQnLFxuICAgICAgICAnVGllZmvDvGhsJzogJ2ljb24tcmVhZHktbWVhbHMtbWQnLFxuICAgICAgICAnQW5nZWJvdGUnOiAnaWNvbi1vZmZlci1tZCcsXG4gICAgICAgICdPYnN0ICYgR2Vtw7xzZSc6ICdpY29uLWZydWl0LWFuZC12ZWdldGFibGVzLW1kJyxcbiAgICAgICAgJ1NwaWVsLSAmIFNjaHJlaWJ3YXJlbic6ICdpY29uLWdhbWVzLW1kJyxcbiAgICAgICAgJ1NwaWVsICYgU2NocmVpYndhcmVuJzogJ2ljb24tZ2FtZXMtbWQnLFxuICAgICAgICAnS8O2cnBlcnBmbGVnZSAmIEtvc21ldGlrJzogJ2ljb24tY29zbWV0aWNzLW1kJyxcbiAgICAgICAgJ0ZyaXNjaGUgUHJvZHVrdGUnOiAnaWNvbi1mcmVzaC1wcm9kdWN0LW1kJyxcbiAgICAgICAgJ1ZvcnJhdHNzY2hyYW5rJzogJ2ljb24tcGFudHJ5LW1kJyxcbiAgICAgICAgJ0ZyZWl6ZWl0LCBUaWVyICYgQXV0byc6ICdpY29uLWFuaW1hbHMtbWQnLFxuICAgICAgICAnQmFieSAmIFNjaHdhbmdlcnNjaGFmdCc6ICdpY29uLWJhYnktbWQnLFxuICAgICAgICAnRWxla3Ryb25payc6ICdpY29uLWVsZWN0cm9uaWNzLW1kJyxcbiAgICAgICAgJ1RleHRpbCAmIFNjaG11Y2snOiAnaWNvbi1jbG90aGVzLW1kJyxcbiAgICAgICAgJ0dldHLDpG5rZSc6ICdpY29uLWRyaW5rcy1tZCcsXG4gICAgICAgICdGZXJ0aWdnZXJpY2h0ZSAmIFRpZWZrw7xobCc6ICdpY29uLXJlYWR5LW1lYWxzLW1kJyxcbiAgICAgICAgJ0Zpc2NoICYgRmxlaXNjaCc6ICdpY29uLW1lYXQtbWQnLFxuICAgICAgICAnRmxlaXNjaCAmIEZpc2NoJzogJ2ljb24tbWVhdC1tZCcsXG4gICAgICAgICdIYXVzaGFsdCc6ICdpY29uLWhvdXNlaG9sZC1tZCdcbiAgICB9O1xuICAgIHByb3RlY3RlZCBtYXA6IE1hcDxzdHJpbmcsIHN0cmluZz47XG5cbiAgICBwcm90ZWN0ZWQgaW5pdCgpIHtcbiAgICAgICAgc3VwZXIuaW5pdCgpO1xuXG4gICAgICAgIHRoaXMubWFwID0gbmV3IE1hcDxzdHJpbmcsIHN0cmluZz4oT2JqZWN0LmVudHJpZXModGhpcy5jbGFzc0RhdGEpKTtcblxuICAgICAgICBpZiAoZG9jdW1lbnQucmVhZHlTdGF0ZSA9PT0gJ2ludGVyYWN0aXZlJyB8fCBkb2N1bWVudC5yZWFkeVN0YXRlID09PSAnY29tcGxldGUnKSB7XG4gICAgICAgICAgICB3aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcignRE9NTm9kZUluc2VydGVkJywgbm9kZUluc2VydGVkRXZlbnQgPT4ge1xuICAgICAgICAgICAgICAgIGlmIChub2RlSW5zZXJ0ZWRFdmVudC5yZWxhdGVkTm9kZS5sb2NhbE5hbWUgPT09ICdmZi1uYXZpZ2F0aW9uLWl0ZW0nKSB7XG4gICAgICAgICAgICAgICAgICAgIGxldCBhbmNob3IgPSBub2RlSW5zZXJ0ZWRFdmVudC5yZWxhdGVkTm9kZS5xdWVyeVNlbGVjdG9yKCcubmF2aWdhdGlvbi1pY29uJyk7XG4gICAgICAgICAgICAgICAgICAgIGlmIChhbmNob3IgIT09IHVuZGVmaW5lZCAmJiBhbmNob3IgIT09IG51bGwpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbnN0IGNsYXNzTmFtZSA9IHRoaXMuZ2V0Q2xhc3NOYW1lKGFuY2hvci5pbm5lclRleHQudHJpbSgpKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmIChub2RlSW5zZXJ0ZWRFdmVudC5yZWxhdGVkTm9kZS5oYXNBdHRyaWJ1dGUoJ2NsdXN0ZXItbGV2ZWwnKSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmIChub2RlSW5zZXJ0ZWRFdmVudC5yZWxhdGVkTm9kZS5nZXRBdHRyaWJ1dGUoJ2NsdXN0ZXItbGV2ZWwnKSA9PT0gJzAnKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuYWRkQ2xhc3NlcyhhbmNob3IsIGNsYXNzTmFtZSwgJ3NwYW4nKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIHRoaXMubmF2aWdhdGlvbkJ1dHRvbiA9IDxIVE1MQnV0dG9uRWxlbWVudD5kb2N1bWVudC5nZXRFbGVtZW50c0J5Q2xhc3NOYW1lKCdidXR0b25fX2FsbC1wcm9kdWN0cycpWzBdO1xuICAgICAgICAgICAgdGhpcy5uYXZpZ2F0aW9uQ29udGFpbmVyID0gZG9jdW1lbnQuZ2V0RWxlbWVudHNCeUNsYXNzTmFtZSgnanMtaGVhZGVyX19uYXZpZ2F0aW9uLXRhcmdldCcpWzBdO1xuICAgICAgICAgICAgdGhpcy5hZGRCdXR0b25FdmVudExpc3RlbmVyKCk7XG4gICAgICAgIH1cblxuXG4gICAgfVxuXG4gICAgcHJvdGVjdGVkIHJlYWR5Q2FsbGJhY2soKSB7fVxuXG4gICAgcHJpdmF0ZSBnZXRDbGFzc05hbWUodGV4dDogc3RyaW5nKSB7XG4gICAgICAgIHRleHQgPSB0ZXh0LnRyaW0oKTtcbiAgICAgICAgbGV0IGNsYXNzTmFtZSA9IHRoaXMubWFwLmdldCh0ZXh0KTtcbiAgICAgICAgaWYgKGNsYXNzTmFtZSA9PT0gdW5kZWZpbmVkIHx8IGNsYXNzTmFtZSA9PT0gbnVsbCB8fCBjbGFzc05hbWUubGVuZ3RoIDwgMSkge1xuICAgICAgICAgICAgY2xhc3NOYW1lID0gdGhpcy5kZWZhdWx0Q2xhc3NOYW1lO1xuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIGNsYXNzTmFtZTtcbiAgICB9XG5cbiAgICBwcml2YXRlIGFkZENsYXNzZXMoZWxlbWVudDogSFRNTEVsZW1lbnQsIGNsYXNzTmFtZTogc3RyaW5nLCBmbGFnOiBzdHJpbmcpIHtcbiAgICAgICAgZWxlbWVudC5jbGFzc0xpc3QuYWRkKGNsYXNzTmFtZSk7XG4gICAgICAgIGlmIChmbGFnID09PSAnZGl2Jykge1xuICAgICAgICAgICAgZWxlbWVudC5jbGFzc0xpc3QuYWRkKHRoaXMuY2F0ZWdvcnlDbGFzc0Rpdik7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBlbGVtZW50LmNsYXNzTGlzdC5hZGQodGhpcy5jYXRlZ29yeUNsYXNzKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIHByaXZhdGUgYWRkQnV0dG9uRXZlbnRMaXN0ZW5lcigpe1xuICAgICAgICBpZih0aGlzLm5hdmlnYXRpb25CdXR0b24gIT09IHVuZGVmaW5lZCAmJiB0aGlzLm5hdmlnYXRpb25Db250YWluZXIgIT09IHVuZGVmaW5lZCl7XG4gICAgICAgICAgICB0aGlzLm5hdmlnYXRpb25CdXR0b24uYWRkRXZlbnRMaXN0ZW5lcignbW91c2VvdmVyJywgKCkgPT4ge1xuICAgICAgICAgICAgICAgIGlmKHRoaXMubmF2aWdhdGlvbkNvbnRhaW5lci5jbGFzc0xpc3QuY29udGFpbnMoJ2lzLWhpZGRlbicpKXtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5uYXZpZ2F0aW9uQ29udGFpbmVyLmNsYXNzTGlzdC5yZW1vdmUoJ2lzLWhpZGRlbicpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0pXG5cbiAgICAgICAgICAgIHRoaXMubmF2aWdhdGlvbkNvbnRhaW5lci5hZGRFdmVudExpc3RlbmVyKCdtb3VzZWxlYXZlJywgKCkgPT4ge1xuICAgICAgICAgICAgICAgIGlmKCF0aGlzLm5hdmlnYXRpb25Db250YWluZXIuY2xhc3NMaXN0LmNvbnRhaW5zKCdpcy1oaWRkZW4nKSl7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMubmF2aWdhdGlvbkNvbnRhaW5lci5jbGFzc0xpc3QuYWRkKCdpcy1oaWRkZW4nKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9KVxuICAgICAgICB9XG4gICAgfVxuXG5cbn1cbiJdLCJzb3VyY2VSb290IjoiIn0=