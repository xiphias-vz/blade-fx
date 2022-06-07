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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vLi9zcmMvUHl6L1l2ZXMvQ29udGVudE5hdmlnYXRpb25XaWRnZXQvVGhlbWUvZGVmYXVsdC92aWV3cy9uYXZpZ2F0aW9uLWhlYWRlci9uYXZpZ2F0aW9uLWhlYWRlci50cyJdLCJuYW1lcyI6WyJOYXZpZ2F0aW9uSGVhZGVyIiwiQ29tcG9uZW50IiwiaW5pdCIsIm1hcCIsIk1hcCIsIk9iamVjdCIsImVudHJpZXMiLCJjbGFzc0RhdGEiLCJkb2N1bWVudCIsInJlYWR5U3RhdGUiLCJ3aW5kb3ciLCJhZGRFdmVudExpc3RlbmVyIiwibm9kZUluc2VydGVkRXZlbnQiLCJyZWxhdGVkTm9kZSIsImxvY2FsTmFtZSIsImFuY2hvciIsInF1ZXJ5U2VsZWN0b3IiLCJ1bmRlZmluZWQiLCJjbGFzc05hbWUiLCJnZXRDbGFzc05hbWUiLCJpbm5lclRleHQiLCJ0cmltIiwiaGFzQXR0cmlidXRlIiwiZ2V0QXR0cmlidXRlIiwiYWRkQ2xhc3NlcyIsInJlYWR5Q2FsbGJhY2siLCJ0ZXh0IiwiZ2V0IiwibGVuZ3RoIiwiZGVmYXVsdENsYXNzTmFtZSIsImVsZW1lbnQiLCJmbGFnIiwiY2xhc3NMaXN0IiwiYWRkIiwiY2F0ZWdvcnlDbGFzc0RpdiIsImNhdGVnb3J5Q2xhc3MiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7OztBQUFBO0FBRWUsTUFBTUEsZ0JBQU4sU0FBK0JDLCtEQUEvQixDQUNmO0FBQUE7QUFBQTs7QUFBQTs7QUFBQSw4Q0FFdUMsNkJBRnZDOztBQUFBLDJDQUdvQyx1QkFIcEM7O0FBQUEsOENBSXVDLDJCQUp2Qzs7QUFBQSx1Q0FLMEI7QUFDbEIsd0JBQWtCLGlCQURBO0FBRWxCLDBCQUFvQiwyQkFGRjtBQUdsQixzQkFBZ0IsNEJBSEU7QUFJbEIsa0JBQVksZUFKTTtBQUtsQix3QkFBa0IsNEJBTEE7QUFNbEIsa0JBQVkscUJBTk07QUFPbEIsa0JBQVksZUFQTTtBQVFsQix1QkFBaUIsOEJBUkM7QUFTbEIsK0JBQXlCLGVBVFA7QUFVbEIsOEJBQXdCLGVBVk47QUFXbEIsaUNBQTJCLG1CQVhUO0FBWWxCLDBCQUFvQix1QkFaRjtBQWFsQix3QkFBa0IsZ0JBYkE7QUFjbEIsK0JBQXlCLGlCQWRQO0FBZWxCLGdDQUEwQixjQWZSO0FBZ0JsQixvQkFBYyxxQkFoQkk7QUFpQmxCLDBCQUFvQixpQkFqQkY7QUFrQmxCLGtCQUFZLGdCQWxCTTtBQW1CbEIsbUNBQTZCLHFCQW5CWDtBQW9CbEIseUJBQW1CLGNBcEJEO0FBcUJsQixrQkFBWTtBQXJCTSxLQUwxQjs7QUFBQTtBQUFBOztBQThCY0MsTUFBVixHQUFpQjtBQUNiLFVBQU1BLElBQU47QUFDQSxTQUFLQyxHQUFMLEdBQVcsSUFBSUMsR0FBSixDQUF3QkMsTUFBTSxDQUFDQyxPQUFQLENBQWUsS0FBS0MsU0FBcEIsQ0FBeEIsQ0FBWDs7QUFFQSxRQUFJQyxRQUFRLENBQUNDLFVBQVQsS0FBd0IsYUFBeEIsSUFBeUNELFFBQVEsQ0FBQ0MsVUFBVCxLQUF3QixVQUFyRSxFQUFpRjtBQUM3RUMsWUFBTSxDQUFDQyxnQkFBUCxDQUF3QixpQkFBeEIsRUFBMkNDLGlCQUFpQixJQUFJO0FBQzVELFlBQUlBLGlCQUFpQixDQUFDQyxXQUFsQixDQUE4QkMsU0FBOUIsS0FBNEMsb0JBQWhELEVBQXNFO0FBQ2xFLGNBQUlDLE1BQU0sR0FBR0gsaUJBQWlCLENBQUNDLFdBQWxCLENBQThCRyxhQUE5QixDQUE0QyxrQkFBNUMsQ0FBYjs7QUFDQSxjQUFJRCxNQUFNLEtBQUtFLFNBQVgsSUFBd0JGLE1BQU0sS0FBSyxJQUF2QyxFQUE2QztBQUN6QyxnQkFBTUcsU0FBUyxHQUFHLEtBQUtDLFlBQUwsQ0FBa0JKLE1BQU0sQ0FBQ0ssU0FBUCxDQUFpQkMsSUFBakIsRUFBbEIsQ0FBbEI7O0FBQ0EsZ0JBQUlULGlCQUFpQixDQUFDQyxXQUFsQixDQUE4QlMsWUFBOUIsQ0FBMkMsZUFBM0MsQ0FBSixFQUFpRTtBQUM3RCxrQkFBSVYsaUJBQWlCLENBQUNDLFdBQWxCLENBQThCVSxZQUE5QixDQUEyQyxlQUEzQyxNQUFnRSxHQUFwRSxFQUF5RTtBQUNyRSxxQkFBS0MsVUFBTCxDQUFnQlQsTUFBaEIsRUFBd0JHLFNBQXhCLEVBQW1DLE1BQW5DO0FBQ0g7QUFDSjtBQUNKO0FBQ0o7QUFDSixPQVpEO0FBYUg7QUFDSjs7QUFFU08sZUFBVixHQUEwQixDQUFFOztBQUVwQk4sY0FBUixDQUFxQk8sSUFBckIsRUFBbUM7QUFDL0JBLFFBQUksR0FBR0EsSUFBSSxDQUFDTCxJQUFMLEVBQVA7QUFDQSxRQUFJSCxTQUFTLEdBQUcsS0FBS2YsR0FBTCxDQUFTd0IsR0FBVCxDQUFhRCxJQUFiLENBQWhCOztBQUNBLFFBQUlSLFNBQVMsS0FBS0QsU0FBZCxJQUEyQkMsU0FBUyxLQUFLLElBQXpDLElBQWlEQSxTQUFTLENBQUNVLE1BQVYsR0FBbUIsQ0FBeEUsRUFBMkU7QUFDdkVWLGVBQVMsR0FBRyxLQUFLVyxnQkFBakI7QUFDSDs7QUFFRCxXQUFPWCxTQUFQO0FBQ0g7O0FBRU9NLFlBQVIsQ0FBbUJNLE9BQW5CLEVBQXlDWixTQUF6QyxFQUE0RGEsSUFBNUQsRUFBMEU7QUFDdEVELFdBQU8sQ0FBQ0UsU0FBUixDQUFrQkMsR0FBbEIsQ0FBc0JmLFNBQXRCOztBQUNBLFFBQUlhLElBQUksS0FBSyxLQUFiLEVBQW9CO0FBQ2hCRCxhQUFPLENBQUNFLFNBQVIsQ0FBa0JDLEdBQWxCLENBQXNCLEtBQUtDLGdCQUEzQjtBQUNILEtBRkQsTUFFTztBQUNISixhQUFPLENBQUNFLFNBQVIsQ0FBa0JDLEdBQWxCLENBQXNCLEtBQUtFLGFBQTNCO0FBQ0g7QUFDSjs7QUF0RUwsQyIsImZpbGUiOiIuL2pzL3l2ZXNfZGVmYXVsdC4xNC5lc20uanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgQ29tcG9uZW50IGZyb20gJ1Nob3BVaS9tb2RlbHMvY29tcG9uZW50JztcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgTmF2aWdhdGlvbkhlYWRlciBleHRlbmRzIENvbXBvbmVudFxue1xuICAgIHByb3RlY3RlZCBhc25QcmljZTogSFRNTEVsZW1lbnQ7XG4gICAgcHJpdmF0ZSBkZWZhdWx0Q2xhc3NOYW1lOiBzdHJpbmcgPSAnaWNvbi1nbG9idXMtbGVhZi1kZWZhdWx0LW1kJztcbiAgICBwcml2YXRlIGNhdGVnb3J5Q2xhc3M6IHN0cmluZyA9ICdjYXRlZ29yeS1maWx0ZXItc3R5bGUnO1xuICAgIHByaXZhdGUgY2F0ZWdvcnlDbGFzc0Rpdjogc3RyaW5nID0gJ2NhdGVnb3J5LWZpbHRlci1zdHlsZS1kaXYnO1xuICAgIHByb3RlY3RlZCBjbGFzc0RhdGEgPSB7XG4gICAgICAgICdGYWNodG1ldHpnZXJlaSc6ICdpY29uLWJ1dGNoZXItbWQnLFxuICAgICAgICAnU8O8w59lcyAmIFNhbHppZ2VzJzogJ2ljb24tc3dlZXQtYW5kLXNhdm91cnktbWQnLFxuICAgICAgICAnV3Vyc3QgJiBLw6RzZSc6ICdpY29uLXNhdXNhZ2UtYW5kLWNoZWVzZS1tZCcsXG4gICAgICAgICdCw6Rja2VyZWknOiAnaWNvbi1iYWtlci1tZCcsXG4gICAgICAgICdGbGVpY2ggJiBGaXNjaCc6ICdpY29uLW1lYXQtc2F1c2FnZXMtZmlzaC1tZCcsXG4gICAgICAgICdUaWVma8O8aGwnOiAnaWNvbi1yZWFkeS1tZWFscy1tZCcsXG4gICAgICAgICdBbmdlYm90ZSc6ICdpY29uLW9mZmVyLW1kJyxcbiAgICAgICAgJ09ic3QgJiBHZW3DvHNlJzogJ2ljb24tZnJ1aXQtYW5kLXZlZ2V0YWJsZXMtbWQnLFxuICAgICAgICAnU3BpZWwtICYgU2NocmVpYndhcmVuJzogJ2ljb24tZ2FtZXMtbWQnLFxuICAgICAgICAnU3BpZWwgJiBTY2hyZWlid2FyZW4nOiAnaWNvbi1nYW1lcy1tZCcsXG4gICAgICAgICdLw7ZycGVycGZsZWdlICYgS29zbWV0aWsnOiAnaWNvbi1jb3NtZXRpY3MtbWQnLFxuICAgICAgICAnRnJpc2NoZSBQcm9kdWt0ZSc6ICdpY29uLWZyZXNoLXByb2R1Y3QtbWQnLFxuICAgICAgICAnVm9ycmF0c3NjaHJhbmsnOiAnaWNvbi1wYW50cnktbWQnLFxuICAgICAgICAnRnJlaXplaXQsIFRpZXIgJiBBdXRvJzogJ2ljb24tYW5pbWFscy1tZCcsXG4gICAgICAgICdCYWJ5ICYgU2Nod2FuZ2Vyc2NoYWZ0JzogJ2ljb24tYmFieS1tZCcsXG4gICAgICAgICdFbGVrdHJvbmlrJzogJ2ljb24tZWxlY3Ryb25pY3MtbWQnLFxuICAgICAgICAnVGV4dGlsICYgU2NobXVjayc6ICdpY29uLWNsb3RoZXMtbWQnLFxuICAgICAgICAnR2V0csOkbmtlJzogJ2ljb24tZHJpbmtzLW1kJyxcbiAgICAgICAgJ0ZlcnRpZ2dlcmljaHRlICYgVGllZmvDvGhsJzogJ2ljb24tcmVhZHktbWVhbHMtbWQnLFxuICAgICAgICAnRmlzY2ggJiBGbGVpc2NoJzogJ2ljb24tbWVhdC1tZCcsXG4gICAgICAgICdIYXVzaGFsdCc6ICdpY29uLWhvdXNlaG9sZC1tZCdcbiAgICB9O1xuICAgIHByb3RlY3RlZCBtYXA6IE1hcDxzdHJpbmcsIHN0cmluZz47XG5cbiAgICBwcm90ZWN0ZWQgaW5pdCgpIHtcbiAgICAgICAgc3VwZXIuaW5pdCgpO1xuICAgICAgICB0aGlzLm1hcCA9IG5ldyBNYXA8c3RyaW5nLCBzdHJpbmc+KE9iamVjdC5lbnRyaWVzKHRoaXMuY2xhc3NEYXRhKSk7XG5cbiAgICAgICAgaWYgKGRvY3VtZW50LnJlYWR5U3RhdGUgPT09ICdpbnRlcmFjdGl2ZScgfHwgZG9jdW1lbnQucmVhZHlTdGF0ZSA9PT0gJ2NvbXBsZXRlJykge1xuICAgICAgICAgICAgd2luZG93LmFkZEV2ZW50TGlzdGVuZXIoJ0RPTU5vZGVJbnNlcnRlZCcsIG5vZGVJbnNlcnRlZEV2ZW50ID0+IHtcbiAgICAgICAgICAgICAgICBpZiAobm9kZUluc2VydGVkRXZlbnQucmVsYXRlZE5vZGUubG9jYWxOYW1lID09PSAnZmYtbmF2aWdhdGlvbi1pdGVtJykge1xuICAgICAgICAgICAgICAgICAgICBsZXQgYW5jaG9yID0gbm9kZUluc2VydGVkRXZlbnQucmVsYXRlZE5vZGUucXVlcnlTZWxlY3RvcignLm5hdmlnYXRpb24taWNvbicpO1xuICAgICAgICAgICAgICAgICAgICBpZiAoYW5jaG9yICE9PSB1bmRlZmluZWQgJiYgYW5jaG9yICE9PSBudWxsKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBjb25zdCBjbGFzc05hbWUgPSB0aGlzLmdldENsYXNzTmFtZShhbmNob3IuaW5uZXJUZXh0LnRyaW0oKSk7XG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAobm9kZUluc2VydGVkRXZlbnQucmVsYXRlZE5vZGUuaGFzQXR0cmlidXRlKCdjbHVzdGVyLWxldmVsJykpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAobm9kZUluc2VydGVkRXZlbnQucmVsYXRlZE5vZGUuZ2V0QXR0cmlidXRlKCdjbHVzdGVyLWxldmVsJykgPT09ICcwJykge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmFkZENsYXNzZXMoYW5jaG9yLCBjbGFzc05hbWUsICdzcGFuJyk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBwcm90ZWN0ZWQgcmVhZHlDYWxsYmFjaygpIHt9XG5cbiAgICBwcml2YXRlIGdldENsYXNzTmFtZSh0ZXh0OiBzdHJpbmcpIHtcbiAgICAgICAgdGV4dCA9IHRleHQudHJpbSgpO1xuICAgICAgICBsZXQgY2xhc3NOYW1lID0gdGhpcy5tYXAuZ2V0KHRleHQpO1xuICAgICAgICBpZiAoY2xhc3NOYW1lID09PSB1bmRlZmluZWQgfHwgY2xhc3NOYW1lID09PSBudWxsIHx8IGNsYXNzTmFtZS5sZW5ndGggPCAxKSB7XG4gICAgICAgICAgICBjbGFzc05hbWUgPSB0aGlzLmRlZmF1bHRDbGFzc05hbWU7XG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4gY2xhc3NOYW1lO1xuICAgIH1cblxuICAgIHByaXZhdGUgYWRkQ2xhc3NlcyhlbGVtZW50OiBIVE1MRWxlbWVudCwgY2xhc3NOYW1lOiBzdHJpbmcsIGZsYWc6IHN0cmluZykge1xuICAgICAgICBlbGVtZW50LmNsYXNzTGlzdC5hZGQoY2xhc3NOYW1lKTtcbiAgICAgICAgaWYgKGZsYWcgPT09ICdkaXYnKSB7XG4gICAgICAgICAgICBlbGVtZW50LmNsYXNzTGlzdC5hZGQodGhpcy5jYXRlZ29yeUNsYXNzRGl2KTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIGVsZW1lbnQuY2xhc3NMaXN0LmFkZCh0aGlzLmNhdGVnb3J5Q2xhc3MpO1xuICAgICAgICB9XG4gICAgfVxufVxuIl0sInNvdXJjZVJvb3QiOiIifQ==