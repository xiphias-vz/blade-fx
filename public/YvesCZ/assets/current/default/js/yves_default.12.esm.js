(window["webpackJsonp_yves_default"] = window["webpackJsonp_yves_default"] || []).push([[12],{

/***/ "./src/Pyz/Yves/CatalogPage/Theme/default/components/molecules/filter-enumeration/filter-enumeration.ts":
/*!**************************************************************************************************************!*\
  !*** ./src/Pyz/Yves/CatalogPage/Theme/default/components/molecules/filter-enumeration/filter-enumeration.ts ***!
  \**************************************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return FilterEnumeration; });
/* harmony import */ var ShopUi_models_component__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ShopUi/models/component */ "./vendor/spryker-shop/shop-ui/src/SprykerShop/Yves/ShopUi/Theme/default/models/component.ts");
function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }


class FilterEnumeration extends ShopUi_models_component__WEBPACK_IMPORTED_MODULE_0__["default"] {
  constructor() {
    super(...arguments);

    _defineProperty(this, "filterSection", void 0);

    _defineProperty(this, "catalogTargetEnumeration", void 0);

    _defineProperty(this, "filterEnumerationList", void 0);

    _defineProperty(this, "submitActionFilterButton", void 0);

    _defineProperty(this, "submitActionFilterButtonToTrigger", void 0);

    _defineProperty(this, "deleteFilterCategoryProductAttribute", void 0);

    _defineProperty(this, "deleteFilterCategoryProductSupplier", void 0);

    _defineProperty(this, "deleteSalesProductCategory", void 0);

    _defineProperty(this, "deleteCountryOrigin", void 0);

    _defineProperty(this, "deleteWineQuality", void 0);

    _defineProperty(this, "deleteAllFilter", void 0);

    _defineProperty(this, "listSuppliersChecked", void 0);

    _defineProperty(this, "listProductAttributesChecked", void 0);

    _defineProperty(this, "listCountryOriginChecked", void 0);

    _defineProperty(this, "listWineQualitiesChecked", void 0);

    _defineProperty(this, "listSalesChecked", void 0);
  }

  readyCallback() {}

  init() {
    this.filterSection = document.querySelector('.filter-section');
    this.catalogTargetEnumeration = this.parentElement;
    this.filterEnumerationList = this.catalogTargetEnumeration.querySelectorAll('.filter-enumeration');
    this.deleteFilterCategoryProductAttribute = this.catalogTargetEnumeration.querySelector('.delete-category-filter-product-attributes');
    this.deleteFilterCategoryProductSupplier = this.catalogTargetEnumeration.querySelector('.delete-category-filter-supplier');
    this.deleteSalesProductCategory = this.catalogTargetEnumeration.querySelector('.delete-category-filter-sales');
    this.deleteCountryOrigin = this.catalogTargetEnumeration.querySelector('.delete-category-filter-country-origin');
    this.deleteWineQuality = this.catalogTargetEnumeration.querySelector('.delete-category-filter-wine-quality');
    this.deleteAllFilter = this.catalogTargetEnumeration.querySelector('.delete-all-filter');
    this.submitActionFilterButton = this.filterSection.querySelector('#submitFilterActionButton');
    this.submitActionFilterButtonToTrigger = this.filterSection.querySelector('#submitFilterActionButtonToTrigger .js-catalog__trigger');
    this.listSuppliersChecked = [];
    this.listProductAttributesChecked = [];
    this.listSalesChecked = [];
    this.listCountryOriginChecked = [];
    this.listWineQualitiesChecked = [];
    this.checkIfAnyFilterIsSelectedAndDisplayDeleteFilterButtons();
    this.mapEvents();
  }

  mapEvents() {
    var _this$submitActionFil, _this$deleteFilterCat, _this$deleteFilterCat2, _this$deleteSalesProd, _this$deleteCountryOr, _this$deleteAllFilter, _this$deleteWineQuali;

    (_this$submitActionFil = this.submitActionFilterButton) == null ? void 0 : _this$submitActionFil.addEventListener('click', this.triggerFilterAction.bind(this));
    (_this$deleteFilterCat = this.deleteFilterCategoryProductSupplier) == null ? void 0 : _this$deleteFilterCat.addEventListener('click', () => this.performDeleteFilterOperation('.filter-enumeration[filter=supplier__filter]', 'supplier'));
    (_this$deleteFilterCat2 = this.deleteFilterCategoryProductAttribute) == null ? void 0 : _this$deleteFilterCat2.addEventListener('click', () => this.performDeleteFilterOperation('.filter-enumeration:not([filter=supplier__filter]):not([filter=label__filter])', 'productAttributes'));
    (_this$deleteSalesProd = this.deleteSalesProductCategory) == null ? void 0 : _this$deleteSalesProd.addEventListener('click', () => this.performDeleteFilterOperation('.filter-enumeration[filter=label__filter]', 'sales'));
    (_this$deleteCountryOr = this.deleteCountryOrigin) == null ? void 0 : _this$deleteCountryOr.addEventListener('click', () => this.performDeleteFilterOperation('.filter-enumeration[filter=herkunftsland__filter]', 'countryOrigin'));
    (_this$deleteAllFilter = this.deleteAllFilter) == null ? void 0 : _this$deleteAllFilter.addEventListener('click', () => this.performDeleteFilterOperation('.filter-enumeration', 'delete-all'));
    (_this$deleteWineQuali = this.deleteWineQuality) == null ? void 0 : _this$deleteWineQuali.addEventListener('click', () => this.performDeleteFilterOperation('filter-enumeration[filter=wine_quality_classification__filter]', 'wineQuality'));
  }

  checkIfAnyFilterIsSelectedAndDisplayDeleteFilterButtons() {
    var activeFiltersList = [];

    for (var i = 0; i < this.filterEnumerationList.length; i++) {
      var currentEnumeration = this.filterEnumerationList[i];
      var filterAttribute = this.filterEnumerationList[i].getAttribute('filter');
      var checkBoxes = currentEnumeration.querySelectorAll('.checkbox__input');
      var isAnyCheckboxChecked = this.checkIfAnyCheckboxIsChecked(checkBoxes);
      activeFiltersList = this.countActiveFilterCategories(filterAttribute, isAnyCheckboxChecked, activeFiltersList);
      this.bindEventsInCheckBoxes(checkBoxes);
    }

    var isAtLeastOneFilterActive = activeFiltersList.length >= 1;

    if (isAtLeastOneFilterActive) {
      this.deleteAllFilter.classList.remove('is-hidden');
    }
  }

  countActiveFilterCategories(filterAttribute, isAnyCheckboxChecked, activeFiltersList) {
    switch (filterAttribute) {
      case 'supplier__filter':
        if (isAnyCheckboxChecked) {
          var _this$deleteFilterCat3;

          (_this$deleteFilterCat3 = this.deleteFilterCategoryProductSupplier) == null ? void 0 : _this$deleteFilterCat3.classList.remove('is-hidden');
          this.listSuppliersChecked.push('checked');
          activeFiltersList = this.updateActiveFilterList(activeFiltersList, 'supplier');
        }

        return activeFiltersList;

      case 'bio__filter':
      case 'vegan__filter':
      case 'laktosefrei__filter':
      case 'glutenfrei__filter':
      case 'vegetarisch__filter':
      case 'fairtrade__filter':
        if (isAnyCheckboxChecked) {
          var _this$deleteFilterCat4;

          (_this$deleteFilterCat4 = this.deleteFilterCategoryProductAttribute) == null ? void 0 : _this$deleteFilterCat4.classList.remove('is-hidden');
          this.listProductAttributesChecked.push('checked');
          activeFiltersList = this.updateActiveFilterList(activeFiltersList, 'productAttributes');
        }

        return activeFiltersList;

      case 'label__filter':
        if (isAnyCheckboxChecked) {
          var _this$deleteSalesProd2;

          (_this$deleteSalesProd2 = this.deleteSalesProductCategory) == null ? void 0 : _this$deleteSalesProd2.classList.remove('is-hidden');
          this.listSalesChecked.push('checked');
          activeFiltersList = this.updateActiveFilterList(activeFiltersList, 'label');
        }

        return activeFiltersList;

      case 'wine_quality_classification__filter':
        if (isAnyCheckboxChecked) {
          var _this$deleteWineQuali2;

          (_this$deleteWineQuali2 = this.deleteWineQuality) == null ? void 0 : _this$deleteWineQuali2.classList.remove('is-hidden');
          this.listWineQualitiesChecked.push('checked');
          activeFiltersList = this.updateActiveFilterList(activeFiltersList, 'wine_quality_classification');
        }

        return activeFiltersList;

      case 'herkunftsland__filter':
        if (isAnyCheckboxChecked) {
          var _this$deleteCountryOr2;

          (_this$deleteCountryOr2 = this.deleteCountryOrigin) == null ? void 0 : _this$deleteCountryOr2.classList.remove('is-hidden');
          this.listCountryOriginChecked.push('checked');
          activeFiltersList = this.updateActiveFilterList(activeFiltersList, 'herkunftsland');
        }

        return activeFiltersList;
    }
  }

  updateActiveFilterList(activeFiltersList, filterType) {
    if (!activeFiltersList.includes(filterType)) {
      activeFiltersList.push(filterType);
    }

    return activeFiltersList;
  }

  checkIfAnyCheckboxIsChecked(checkboxes) {
    for (var i = 0; i < checkboxes.length; i++) {
      if (checkboxes[i].checked === true) {
        return true;
      }
    }

    return false;
  }

  bindEventsInCheckBoxes(checkboxes) {
    for (var i = 0; i < checkboxes.length; i++) {
      checkboxes[i].addEventListener('click', e => {
        var checkBox = e.target;
        var isChecked = checkBox.checked;
        var category = checkBox.getAttribute('category');
        this.toggleDeleteFilters(category, isChecked);
      });
    }
  }

  toggleDeleteFilters(category, isChecked) {
    switch (category) {
      case 'supplier':
        if (isChecked) {
          var _this$deleteFilterCat5;

          this.listSuppliersChecked.push('checked');
          (_this$deleteFilterCat5 = this.deleteFilterCategoryProductSupplier) == null ? void 0 : _this$deleteFilterCat5.classList.remove('is-hidden');
        } else {
          this.listSuppliersChecked.pop();

          if (this.listSuppliersChecked.length === 0) {
            var _this$deleteFilterCat6;

            (_this$deleteFilterCat6 = this.deleteFilterCategoryProductSupplier) == null ? void 0 : _this$deleteFilterCat6.classList.add('is-hidden');
          }
        }

        break;

      case 'bio':
      case 'vegan':
      case 'laktosefrei':
      case 'glutenfrei':
      case 'fairtrade':
      case 'vegetarisch':
        if (isChecked) {
          var _this$deleteFilterCat7;

          this.listProductAttributesChecked.push('checked');
          (_this$deleteFilterCat7 = this.deleteFilterCategoryProductAttribute) == null ? void 0 : _this$deleteFilterCat7.classList.remove('is-hidden');
        } else {
          this.listProductAttributesChecked.pop();

          if (this.listProductAttributesChecked.length === 0) {
            var _this$deleteFilterCat8;

            (_this$deleteFilterCat8 = this.deleteFilterCategoryProductAttribute) == null ? void 0 : _this$deleteFilterCat8.classList.add('is-hidden');
          }
        }

        break;

      case 'wine_quality_classification':
        if (isChecked) {
          var _this$deleteWineQuali3;

          this.listWineQualitiesChecked.push('checked');
          (_this$deleteWineQuali3 = this.deleteWineQuality) == null ? void 0 : _this$deleteWineQuali3.classList.remove('is-hidden');
        } else {
          this.listWineQualitiesChecked.pop();

          if (this.listWineQualitiesChecked.length === 0) {
            var _this$deleteWineQuali4;

            (_this$deleteWineQuali4 = this.deleteWineQuality) == null ? void 0 : _this$deleteWineQuali4.classList.add('is-hidden');
          }
        }

        break;

      case 'herkunftsland':
        if (isChecked) {
          var _this$deleteCountryOr3;

          this.listCountryOriginChecked.push('checked');
          (_this$deleteCountryOr3 = this.deleteCountryOrigin) == null ? void 0 : _this$deleteCountryOr3.classList.remove('is-hidden');
        } else {
          this.listCountryOriginChecked.pop();

          if (this.listCountryOriginChecked.length === 0) {
            var _this$deleteCountryOr4;

            (_this$deleteCountryOr4 = this.deleteCountryOrigin) == null ? void 0 : _this$deleteCountryOr4.classList.add('is-hidden');
          }
        }

        break;

      case 'label':
        if (isChecked) {
          var _this$deleteSalesProd3;

          this.listSalesChecked.push('checked');
          (_this$deleteSalesProd3 = this.deleteSalesProductCategory) == null ? void 0 : _this$deleteSalesProd3.classList.remove('is-hidden');
        } else {
          this.listSalesChecked.pop();

          if (this.listSalesChecked.length === 0) {
            var _this$deleteSalesProd4;

            (_this$deleteSalesProd4 = this.deleteSalesProductCategory) == null ? void 0 : _this$deleteSalesProd4.classList.add('is-hidden');
          }
        }

    }

    this.toggleDeleteAllFilterButton();
  }

  toggleDeleteAllFilterButton() {
    var isSupplierListNotEmpty = this.isNonEmptyArray(this.listSuppliersChecked);
    var isProductAttributeNotEmpty = this.isNonEmptyArray(this.listProductAttributesChecked);
    var isSalesListCheckedNotEmpty = this.isNonEmptyArray(this.listSalesChecked);
    var isCountryOriginCheckedNotEmpty = this.isNonEmptyArray(this.listCountryOriginChecked);
    var isWineQualityCheckedNotEmpty = this.isNonEmptyArray(this.listWineQualitiesChecked);

    if (isSupplierListNotEmpty || isProductAttributeNotEmpty || isSalesListCheckedNotEmpty || isCountryOriginCheckedNotEmpty || isWineQualityCheckedNotEmpty) {
      this.deleteAllFilter.classList.remove('is-hidden');
    } else {
      this.deleteAllFilter.classList.add('is-hidden');
    }
  }

  performDeleteFilterOperation(filterEnumeration, target) {
    var _this$deleteFilterCat9, _this$deleteSalesProd5, _this$deleteFilterCat10, _this$deleteCountryOr5, _this$deleteWineQuali5, _this$deleteFilterCat11, _this$deleteFilterCat12, _this$deleteCountryOr6, _this$deleteWineQuali6, _this$deleteSalesProd6, _this$deleteAllFilter2;

    this.filterEnumerationList = this.catalogTargetEnumeration.querySelectorAll(filterEnumeration);
    this.uncheckFilters(this.filterEnumerationList);

    switch (target) {
      case 'supplier':
        this.listSuppliersChecked = [];
        (_this$deleteFilterCat9 = this.deleteFilterCategoryProductSupplier) == null ? void 0 : _this$deleteFilterCat9.classList.add('is-hidden');
        break;

      case 'sales':
        this.listSalesChecked = [];
        (_this$deleteSalesProd5 = this.deleteSalesProductCategory) == null ? void 0 : _this$deleteSalesProd5.classList.add('is-hidden');
        break;

      case 'productAttributes':
        this.listProductAttributesChecked = [];
        (_this$deleteFilterCat10 = this.deleteFilterCategoryProductAttribute) == null ? void 0 : _this$deleteFilterCat10.classList.add('is-hidden');
        break;

      case 'countryOrigin':
        this.listCountryOriginChecked = [];
        (_this$deleteCountryOr5 = this.deleteCountryOrigin) == null ? void 0 : _this$deleteCountryOr5.classList.add('is-hidden');
        break;

      case 'wineQuality':
        this.listWineQualitiesChecked = [];
        (_this$deleteWineQuali5 = this.deleteWineQuality) == null ? void 0 : _this$deleteWineQuali5.classList.add('is-hidden');
        break;

      case 'delete-all':
        this.listSalesChecked = [];
        this.listSuppliersChecked = [];
        this.listProductAttributesChecked = [];
        this.listCountryOriginChecked = [];
        this.listWineQualitiesChecked = [];
        (_this$deleteFilterCat11 = this.deleteFilterCategoryProductAttribute) == null ? void 0 : _this$deleteFilterCat11.classList.add('is-hidden');
        (_this$deleteFilterCat12 = this.deleteFilterCategoryProductSupplier) == null ? void 0 : _this$deleteFilterCat12.classList.add('is-hidden');
        (_this$deleteCountryOr6 = this.deleteCountryOrigin) == null ? void 0 : _this$deleteCountryOr6.classList.add('is-hidden');
        (_this$deleteWineQuali6 = this.deleteWineQuality) == null ? void 0 : _this$deleteWineQuali6.classList.add('is-hidden');
        (_this$deleteSalesProd6 = this.deleteSalesProductCategory) == null ? void 0 : _this$deleteSalesProd6.classList.add('is-hidden');
        (_this$deleteAllFilter2 = this.deleteAllFilter) == null ? void 0 : _this$deleteAllFilter2.classList.add('is-hidden');
        break;
    }

    this.toggleDeleteAllFilterButton();
  }

  uncheckFilters(filterEnumerationList) {
    for (var i = 0; i < filterEnumerationList.length; i++) {
      var checkBoxes = filterEnumerationList[i].querySelectorAll('.checkbox__input');

      for (var _i = 0; _i < checkBoxes.length; _i++) {
        checkBoxes[_i].checked = false;
      }
    }
  }

  triggerFilterAction() {
    this.submitActionFilterButtonToTrigger.click();
  }

  isNonEmptyArray(arr) {
    return !!(Array.isArray(arr) && arr.length);
  }

}

/***/ })

}]);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vLi9zcmMvUHl6L1l2ZXMvQ2F0YWxvZ1BhZ2UvVGhlbWUvZGVmYXVsdC9jb21wb25lbnRzL21vbGVjdWxlcy9maWx0ZXItZW51bWVyYXRpb24vZmlsdGVyLWVudW1lcmF0aW9uLnRzIl0sIm5hbWVzIjpbIkZpbHRlckVudW1lcmF0aW9uIiwiQ29tcG9uZW50IiwicmVhZHlDYWxsYmFjayIsImluaXQiLCJmaWx0ZXJTZWN0aW9uIiwiZG9jdW1lbnQiLCJxdWVyeVNlbGVjdG9yIiwiY2F0YWxvZ1RhcmdldEVudW1lcmF0aW9uIiwicGFyZW50RWxlbWVudCIsImZpbHRlckVudW1lcmF0aW9uTGlzdCIsInF1ZXJ5U2VsZWN0b3JBbGwiLCJkZWxldGVGaWx0ZXJDYXRlZ29yeVByb2R1Y3RBdHRyaWJ1dGUiLCJkZWxldGVGaWx0ZXJDYXRlZ29yeVByb2R1Y3RTdXBwbGllciIsImRlbGV0ZVNhbGVzUHJvZHVjdENhdGVnb3J5IiwiZGVsZXRlQ291bnRyeU9yaWdpbiIsImRlbGV0ZVdpbmVRdWFsaXR5IiwiZGVsZXRlQWxsRmlsdGVyIiwic3VibWl0QWN0aW9uRmlsdGVyQnV0dG9uIiwic3VibWl0QWN0aW9uRmlsdGVyQnV0dG9uVG9UcmlnZ2VyIiwibGlzdFN1cHBsaWVyc0NoZWNrZWQiLCJsaXN0UHJvZHVjdEF0dHJpYnV0ZXNDaGVja2VkIiwibGlzdFNhbGVzQ2hlY2tlZCIsImxpc3RDb3VudHJ5T3JpZ2luQ2hlY2tlZCIsImxpc3RXaW5lUXVhbGl0aWVzQ2hlY2tlZCIsImNoZWNrSWZBbnlGaWx0ZXJJc1NlbGVjdGVkQW5kRGlzcGxheURlbGV0ZUZpbHRlckJ1dHRvbnMiLCJtYXBFdmVudHMiLCJhZGRFdmVudExpc3RlbmVyIiwidHJpZ2dlckZpbHRlckFjdGlvbiIsImJpbmQiLCJwZXJmb3JtRGVsZXRlRmlsdGVyT3BlcmF0aW9uIiwiYWN0aXZlRmlsdGVyc0xpc3QiLCJpIiwibGVuZ3RoIiwiY3VycmVudEVudW1lcmF0aW9uIiwiZmlsdGVyQXR0cmlidXRlIiwiZ2V0QXR0cmlidXRlIiwiY2hlY2tCb3hlcyIsImlzQW55Q2hlY2tib3hDaGVja2VkIiwiY2hlY2tJZkFueUNoZWNrYm94SXNDaGVja2VkIiwiY291bnRBY3RpdmVGaWx0ZXJDYXRlZ29yaWVzIiwiYmluZEV2ZW50c0luQ2hlY2tCb3hlcyIsImlzQXRMZWFzdE9uZUZpbHRlckFjdGl2ZSIsImNsYXNzTGlzdCIsInJlbW92ZSIsInB1c2giLCJ1cGRhdGVBY3RpdmVGaWx0ZXJMaXN0IiwiZmlsdGVyVHlwZSIsImluY2x1ZGVzIiwiY2hlY2tib3hlcyIsImNoZWNrZWQiLCJlIiwiY2hlY2tCb3giLCJ0YXJnZXQiLCJpc0NoZWNrZWQiLCJjYXRlZ29yeSIsInRvZ2dsZURlbGV0ZUZpbHRlcnMiLCJwb3AiLCJhZGQiLCJ0b2dnbGVEZWxldGVBbGxGaWx0ZXJCdXR0b24iLCJpc1N1cHBsaWVyTGlzdE5vdEVtcHR5IiwiaXNOb25FbXB0eUFycmF5IiwiaXNQcm9kdWN0QXR0cmlidXRlTm90RW1wdHkiLCJpc1NhbGVzTGlzdENoZWNrZWROb3RFbXB0eSIsImlzQ291bnRyeU9yaWdpbkNoZWNrZWROb3RFbXB0eSIsImlzV2luZVF1YWxpdHlDaGVja2VkTm90RW1wdHkiLCJmaWx0ZXJFbnVtZXJhdGlvbiIsInVuY2hlY2tGaWx0ZXJzIiwiY2xpY2siLCJhcnIiLCJBcnJheSIsImlzQXJyYXkiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7OztBQUFBO0FBRWUsTUFBTUEsaUJBQU4sU0FBZ0NDLCtEQUFoQyxDQUEwQztBQUFBO0FBQUE7O0FBQUE7O0FBQUE7O0FBQUE7O0FBQUE7O0FBQUE7O0FBQUE7O0FBQUE7O0FBQUE7O0FBQUE7O0FBQUE7O0FBQUE7O0FBQUE7O0FBQUE7O0FBQUE7O0FBQUE7O0FBQUE7QUFBQTs7QUFpQjNDQyxlQUFWLEdBQWdDLENBQy9COztBQUVTQyxNQUFWLEdBQWlCO0FBQ2IsU0FBS0MsYUFBTCxHQUFxQkMsUUFBUSxDQUFDQyxhQUFULENBQXVCLGlCQUF2QixDQUFyQjtBQUNBLFNBQUtDLHdCQUFMLEdBQWdDLEtBQUtDLGFBQXJDO0FBQ0EsU0FBS0MscUJBQUwsR0FBMEMsS0FBS0Ysd0JBQUwsQ0FBOEJHLGdCQUE5QixDQUErQyxxQkFBL0MsQ0FBMUM7QUFDQSxTQUFLQyxvQ0FBTCxHQUF5RCxLQUFLSix3QkFBTCxDQUE4QkQsYUFBOUIsQ0FBNEMsNENBQTVDLENBQXpEO0FBQ0EsU0FBS00sbUNBQUwsR0FBd0QsS0FBS0wsd0JBQUwsQ0FBOEJELGFBQTlCLENBQTRDLGtDQUE1QyxDQUF4RDtBQUNBLFNBQUtPLDBCQUFMLEdBQStDLEtBQUtOLHdCQUFMLENBQThCRCxhQUE5QixDQUE0QywrQkFBNUMsQ0FBL0M7QUFDQSxTQUFLUSxtQkFBTCxHQUF3QyxLQUFLUCx3QkFBTCxDQUE4QkQsYUFBOUIsQ0FBNEMsd0NBQTVDLENBQXhDO0FBQ0EsU0FBS1MsaUJBQUwsR0FBc0MsS0FBS1Isd0JBQUwsQ0FBOEJELGFBQTlCLENBQTRDLHNDQUE1QyxDQUF0QztBQUNBLFNBQUtVLGVBQUwsR0FBb0MsS0FBS1Qsd0JBQUwsQ0FBOEJELGFBQTlCLENBQTRDLG9CQUE1QyxDQUFwQztBQUVBLFNBQUtXLHdCQUFMLEdBQTZDLEtBQUtiLGFBQUwsQ0FBbUJFLGFBQW5CLENBQWlDLDJCQUFqQyxDQUE3QztBQUNBLFNBQUtZLGlDQUFMLEdBQXNELEtBQUtkLGFBQUwsQ0FBbUJFLGFBQW5CLENBQWlDLHlEQUFqQyxDQUF0RDtBQUVBLFNBQUthLG9CQUFMLEdBQTRCLEVBQTVCO0FBQ0EsU0FBS0MsNEJBQUwsR0FBb0MsRUFBcEM7QUFDQSxTQUFLQyxnQkFBTCxHQUF3QixFQUF4QjtBQUNBLFNBQUtDLHdCQUFMLEdBQWdDLEVBQWhDO0FBQ0EsU0FBS0Msd0JBQUwsR0FBZ0MsRUFBaEM7QUFFQSxTQUFLQyx1REFBTDtBQUNBLFNBQUtDLFNBQUw7QUFDSDs7QUFFU0EsV0FBVixHQUFzQjtBQUFBOztBQUNsQixrQ0FBS1Isd0JBQUwsMkNBQStCUyxnQkFBL0IsQ0FBZ0QsT0FBaEQsRUFBeUQsS0FBS0MsbUJBQUwsQ0FBeUJDLElBQXpCLENBQThCLElBQTlCLENBQXpEO0FBQ0Esa0NBQUtoQixtQ0FBTCwyQ0FBMENjLGdCQUExQyxDQUEyRCxPQUEzRCxFQUFvRSxNQUFNLEtBQUtHLDRCQUFMLENBQWtDLDhDQUFsQyxFQUFrRixVQUFsRixDQUExRTtBQUNBLG1DQUFLbEIsb0NBQUwsNENBQTJDZSxnQkFBM0MsQ0FBNEQsT0FBNUQsRUFBcUUsTUFBTSxLQUFLRyw0QkFBTCxDQUFrQyxnRkFBbEMsRUFBb0gsbUJBQXBILENBQTNFO0FBQ0Esa0NBQUtoQiwwQkFBTCwyQ0FBaUNhLGdCQUFqQyxDQUFrRCxPQUFsRCxFQUEyRCxNQUFNLEtBQUtHLDRCQUFMLENBQWtDLDJDQUFsQyxFQUErRSxPQUEvRSxDQUFqRTtBQUNBLGtDQUFLZixtQkFBTCwyQ0FBMEJZLGdCQUExQixDQUEyQyxPQUEzQyxFQUFvRCxNQUFNLEtBQUtHLDRCQUFMLENBQWtDLG1EQUFsQyxFQUF1RixlQUF2RixDQUExRDtBQUNBLGtDQUFLYixlQUFMLDJDQUFzQlUsZ0JBQXRCLENBQXVDLE9BQXZDLEVBQStDLE1BQU0sS0FBS0csNEJBQUwsQ0FBa0MscUJBQWxDLEVBQXlELFlBQXpELENBQXJEO0FBQ0Esa0NBQUtkLGlCQUFMLDJDQUF3QlcsZ0JBQXhCLENBQXlDLE9BQXpDLEVBQWtELE1BQU0sS0FBS0csNEJBQUwsQ0FBa0MsZ0VBQWxDLEVBQW9HLGFBQXBHLENBQXhEO0FBRUg7O0FBRVNMLHlEQUFWLEdBQW9FO0FBQ2hFLFFBQUlNLGlCQUFpQixHQUFHLEVBQXhCOztBQUNBLFNBQUksSUFBSUMsQ0FBQyxHQUFHLENBQVosRUFBZUEsQ0FBQyxHQUFHLEtBQUt0QixxQkFBTCxDQUEyQnVCLE1BQTlDLEVBQXNERCxDQUFDLEVBQXZELEVBQTJEO0FBQ3ZELFVBQUlFLGtCQUFrQixHQUFHLEtBQUt4QixxQkFBTCxDQUEyQnNCLENBQTNCLENBQXpCO0FBQ0EsVUFBSUcsZUFBZSxHQUFHLEtBQUt6QixxQkFBTCxDQUEyQnNCLENBQTNCLEVBQThCSSxZQUE5QixDQUEyQyxRQUEzQyxDQUF0QjtBQUNBLFVBQUlDLFVBQVUsR0FBR0gsa0JBQWtCLENBQUN2QixnQkFBbkIsQ0FBb0Msa0JBQXBDLENBQWpCO0FBQ0EsVUFBSTJCLG9CQUFvQixHQUFHLEtBQUtDLDJCQUFMLENBQWlDRixVQUFqQyxDQUEzQjtBQUNBTix1QkFBaUIsR0FBRyxLQUFLUywyQkFBTCxDQUFpQ0wsZUFBakMsRUFBa0RHLG9CQUFsRCxFQUF3RVAsaUJBQXhFLENBQXBCO0FBQ0EsV0FBS1Usc0JBQUwsQ0FBNEJKLFVBQTVCO0FBQ0g7O0FBRUQsUUFBSUssd0JBQXdCLEdBQUdYLGlCQUFpQixDQUFDRSxNQUFsQixJQUE0QixDQUEzRDs7QUFDQSxRQUFJUyx3QkFBSixFQUE4QjtBQUMxQixXQUFLekIsZUFBTCxDQUFxQjBCLFNBQXJCLENBQStCQyxNQUEvQixDQUFzQyxXQUF0QztBQUNIO0FBQ0o7O0FBRVNKLDZCQUFWLENBQXNDTCxlQUF0QyxFQUF1REcsb0JBQXZELEVBQTZFUCxpQkFBN0UsRUFBZ0c7QUFDNUYsWUFBUUksZUFBUjtBQUNJLFdBQUssa0JBQUw7QUFDSSxZQUFJRyxvQkFBSixFQUEwQjtBQUFBOztBQUN0Qix5Q0FBS3pCLG1DQUFMLDRDQUEwQzhCLFNBQTFDLENBQW9EQyxNQUFwRCxDQUEyRCxXQUEzRDtBQUNBLGVBQUt4QixvQkFBTCxDQUEwQnlCLElBQTFCLENBQStCLFNBQS9CO0FBQ0FkLDJCQUFpQixHQUFHLEtBQUtlLHNCQUFMLENBQTRCZixpQkFBNUIsRUFBOEMsVUFBOUMsQ0FBcEI7QUFDSDs7QUFDRCxlQUFPQSxpQkFBUDs7QUFFSixXQUFLLGFBQUw7QUFDQSxXQUFLLGVBQUw7QUFDQSxXQUFLLHFCQUFMO0FBQ0EsV0FBSyxvQkFBTDtBQUNBLFdBQUsscUJBQUw7QUFDQSxXQUFLLG1CQUFMO0FBQ0ksWUFBSU8sb0JBQUosRUFBMEI7QUFBQTs7QUFDdEIseUNBQUsxQixvQ0FBTCw0Q0FBMkMrQixTQUEzQyxDQUFxREMsTUFBckQsQ0FBNEQsV0FBNUQ7QUFDQSxlQUFLdkIsNEJBQUwsQ0FBa0N3QixJQUFsQyxDQUF1QyxTQUF2QztBQUNBZCwyQkFBaUIsR0FBRyxLQUFLZSxzQkFBTCxDQUE0QmYsaUJBQTVCLEVBQThDLG1CQUE5QyxDQUFwQjtBQUNIOztBQUNELGVBQU9BLGlCQUFQOztBQUNKLFdBQUssZUFBTDtBQUNJLFlBQUlPLG9CQUFKLEVBQTBCO0FBQUE7O0FBQ3RCLHlDQUFLeEIsMEJBQUwsNENBQWlDNkIsU0FBakMsQ0FBMkNDLE1BQTNDLENBQWtELFdBQWxEO0FBQ0EsZUFBS3RCLGdCQUFMLENBQXNCdUIsSUFBdEIsQ0FBMkIsU0FBM0I7QUFDQWQsMkJBQWlCLEdBQUcsS0FBS2Usc0JBQUwsQ0FBNEJmLGlCQUE1QixFQUE4QyxPQUE5QyxDQUFwQjtBQUNIOztBQUNELGVBQU9BLGlCQUFQOztBQUVKLFdBQUsscUNBQUw7QUFDSSxZQUFJTyxvQkFBSixFQUEwQjtBQUFBOztBQUN0Qix5Q0FBS3RCLGlCQUFMLDRDQUF3QjJCLFNBQXhCLENBQWtDQyxNQUFsQyxDQUF5QyxXQUF6QztBQUNBLGVBQUtwQix3QkFBTCxDQUE4QnFCLElBQTlCLENBQW1DLFNBQW5DO0FBQ0FkLDJCQUFpQixHQUFHLEtBQUtlLHNCQUFMLENBQTRCZixpQkFBNUIsRUFBOEMsNkJBQTlDLENBQXBCO0FBQ0g7O0FBQ0QsZUFBT0EsaUJBQVA7O0FBRUosV0FBSyx1QkFBTDtBQUNJLFlBQUlPLG9CQUFKLEVBQTBCO0FBQUE7O0FBQ3RCLHlDQUFLdkIsbUJBQUwsNENBQTBCNEIsU0FBMUIsQ0FBb0NDLE1BQXBDLENBQTJDLFdBQTNDO0FBQ0EsZUFBS3JCLHdCQUFMLENBQThCc0IsSUFBOUIsQ0FBbUMsU0FBbkM7QUFDQWQsMkJBQWlCLEdBQUcsS0FBS2Usc0JBQUwsQ0FBNEJmLGlCQUE1QixFQUE4QyxlQUE5QyxDQUFwQjtBQUNIOztBQUNELGVBQU9BLGlCQUFQO0FBM0NSO0FBNkNIOztBQUVTZSx3QkFBVixDQUFpQ2YsaUJBQWpDLEVBQW9EZ0IsVUFBcEQsRUFBZ0U7QUFDNUQsUUFBRyxDQUFDaEIsaUJBQWlCLENBQUNpQixRQUFsQixDQUEyQkQsVUFBM0IsQ0FBSixFQUE0QztBQUN4Q2hCLHVCQUFpQixDQUFDYyxJQUFsQixDQUF1QkUsVUFBdkI7QUFDSDs7QUFDRCxXQUFPaEIsaUJBQVA7QUFDSDs7QUFFU1EsNkJBQVYsQ0FBc0NVLFVBQXRDLEVBQTJEO0FBQ3ZELFNBQUksSUFBSWpCLENBQUMsR0FBRyxDQUFaLEVBQWVBLENBQUMsR0FBR2lCLFVBQVUsQ0FBQ2hCLE1BQTlCLEVBQXNDRCxDQUFDLEVBQXZDLEVBQTJDO0FBQ3ZDLFVBQUdpQixVQUFVLENBQUNqQixDQUFELENBQVYsQ0FBY2tCLE9BQWQsS0FBMEIsSUFBN0IsRUFBbUM7QUFDL0IsZUFBTyxJQUFQO0FBQ0g7QUFDSjs7QUFDRCxXQUFPLEtBQVA7QUFDSDs7QUFFU1Qsd0JBQVYsQ0FBaUNRLFVBQWpDLEVBQW9EO0FBQ2hELFNBQUksSUFBSWpCLENBQUMsR0FBRyxDQUFaLEVBQWVBLENBQUMsR0FBR2lCLFVBQVUsQ0FBQ2hCLE1BQTlCLEVBQXNDRCxDQUFDLEVBQXZDLEVBQTJDO0FBQ3ZDaUIsZ0JBQVUsQ0FBQ2pCLENBQUQsQ0FBVixDQUFjTCxnQkFBZCxDQUErQixPQUEvQixFQUF5Q3dCLENBQUQsSUFBTztBQUMzQyxZQUFJQyxRQUFRLEdBQUdELENBQUMsQ0FBQ0UsTUFBakI7QUFDQSxZQUFJQyxTQUFTLEdBQUdGLFFBQVEsQ0FBQ0YsT0FBekI7QUFDQSxZQUFJSyxRQUFRLEdBQUdILFFBQVEsQ0FBQ2hCLFlBQVQsQ0FBc0IsVUFBdEIsQ0FBZjtBQUNBLGFBQUtvQixtQkFBTCxDQUF5QkQsUUFBekIsRUFBbUNELFNBQW5DO0FBQ0gsT0FMRDtBQU1IO0FBQ0o7O0FBRVNFLHFCQUFWLENBQThCRCxRQUE5QixFQUF3Q0QsU0FBeEMsRUFBbUQ7QUFFL0MsWUFBUUMsUUFBUjtBQUNJLFdBQUssVUFBTDtBQUNJLFlBQUdELFNBQUgsRUFBYztBQUFBOztBQUNWLGVBQUtsQyxvQkFBTCxDQUEwQnlCLElBQTFCLENBQStCLFNBQS9CO0FBQ0EseUNBQUtoQyxtQ0FBTCw0Q0FBMEM4QixTQUExQyxDQUFvREMsTUFBcEQsQ0FBMkQsV0FBM0Q7QUFFSCxTQUpELE1BSU87QUFDSCxlQUFLeEIsb0JBQUwsQ0FBMEJxQyxHQUExQjs7QUFDQSxjQUFJLEtBQUtyQyxvQkFBTCxDQUEwQmEsTUFBMUIsS0FBcUMsQ0FBekMsRUFBNEM7QUFBQTs7QUFDeEMsMkNBQUtwQixtQ0FBTCw0Q0FBMEM4QixTQUExQyxDQUFvRGUsR0FBcEQsQ0FBd0QsV0FBeEQ7QUFDSDtBQUNKOztBQUNEOztBQUVKLFdBQUssS0FBTDtBQUNBLFdBQUssT0FBTDtBQUNBLFdBQUssYUFBTDtBQUNBLFdBQUssWUFBTDtBQUNBLFdBQUssV0FBTDtBQUNBLFdBQUssYUFBTDtBQUNJLFlBQUlKLFNBQUosRUFBZTtBQUFBOztBQUNYLGVBQUtqQyw0QkFBTCxDQUFrQ3dCLElBQWxDLENBQXVDLFNBQXZDO0FBQ0EseUNBQUtqQyxvQ0FBTCw0Q0FBMkMrQixTQUEzQyxDQUFxREMsTUFBckQsQ0FBNEQsV0FBNUQ7QUFFSCxTQUpELE1BSU87QUFDSCxlQUFLdkIsNEJBQUwsQ0FBa0NvQyxHQUFsQzs7QUFDQSxjQUFJLEtBQUtwQyw0QkFBTCxDQUFrQ1ksTUFBbEMsS0FBNkMsQ0FBakQsRUFBb0Q7QUFBQTs7QUFDaEQsMkNBQUtyQixvQ0FBTCw0Q0FBMkMrQixTQUEzQyxDQUFxRGUsR0FBckQsQ0FBeUQsV0FBekQ7QUFDSDtBQUNKOztBQUNEOztBQUNKLFdBQUssNkJBQUw7QUFDSSxZQUFJSixTQUFKLEVBQWU7QUFBQTs7QUFDWCxlQUFLOUIsd0JBQUwsQ0FBOEJxQixJQUE5QixDQUFtQyxTQUFuQztBQUNBLHlDQUFLN0IsaUJBQUwsNENBQXdCMkIsU0FBeEIsQ0FBa0NDLE1BQWxDLENBQXlDLFdBQXpDO0FBR0gsU0FMRCxNQUtPO0FBQ0gsZUFBS3BCLHdCQUFMLENBQThCaUMsR0FBOUI7O0FBQ0EsY0FBSSxLQUFLakMsd0JBQUwsQ0FBOEJTLE1BQTlCLEtBQXlDLENBQTdDLEVBQWdEO0FBQUE7O0FBQzVDLDJDQUFLakIsaUJBQUwsNENBQXdCMkIsU0FBeEIsQ0FBa0NlLEdBQWxDLENBQXNDLFdBQXRDO0FBQ0g7QUFDSjs7QUFDRDs7QUFDSixXQUFLLGVBQUw7QUFDSSxZQUFJSixTQUFKLEVBQWU7QUFBQTs7QUFDWCxlQUFLL0Isd0JBQUwsQ0FBOEJzQixJQUE5QixDQUFtQyxTQUFuQztBQUNBLHlDQUFLOUIsbUJBQUwsNENBQTBCNEIsU0FBMUIsQ0FBb0NDLE1BQXBDLENBQTJDLFdBQTNDO0FBRUgsU0FKRCxNQUlPO0FBQ0gsZUFBS3JCLHdCQUFMLENBQThCa0MsR0FBOUI7O0FBQ0EsY0FBSSxLQUFLbEMsd0JBQUwsQ0FBOEJVLE1BQTlCLEtBQXlDLENBQTdDLEVBQWdEO0FBQUE7O0FBQzVDLDJDQUFLbEIsbUJBQUwsNENBQTBCNEIsU0FBMUIsQ0FBb0NlLEdBQXBDLENBQXdDLFdBQXhDO0FBQ0g7QUFDSjs7QUFDRDs7QUFDSixXQUFLLE9BQUw7QUFDSSxZQUFJSixTQUFKLEVBQWU7QUFBQTs7QUFDWCxlQUFLaEMsZ0JBQUwsQ0FBc0J1QixJQUF0QixDQUEyQixTQUEzQjtBQUNBLHlDQUFLL0IsMEJBQUwsNENBQWlDNkIsU0FBakMsQ0FBMkNDLE1BQTNDLENBQWtELFdBQWxEO0FBRUgsU0FKRCxNQUlPO0FBQ0gsZUFBS3RCLGdCQUFMLENBQXNCbUMsR0FBdEI7O0FBQ0EsY0FBRyxLQUFLbkMsZ0JBQUwsQ0FBc0JXLE1BQXRCLEtBQWlDLENBQXBDLEVBQXVDO0FBQUE7O0FBQ25DLDJDQUFLbkIsMEJBQUwsNENBQWlDNkIsU0FBakMsQ0FBMkNlLEdBQTNDLENBQStDLFdBQS9DO0FBQ0g7QUFDSjs7QUFsRVQ7O0FBcUVBLFNBQUtDLDJCQUFMO0FBQ0g7O0FBRVNBLDZCQUFWLEdBQXdDO0FBQ3BDLFFBQUlDLHNCQUFzQixHQUFHLEtBQUtDLGVBQUwsQ0FBcUIsS0FBS3pDLG9CQUExQixDQUE3QjtBQUNBLFFBQUkwQywwQkFBMEIsR0FBRyxLQUFLRCxlQUFMLENBQXFCLEtBQUt4Qyw0QkFBMUIsQ0FBakM7QUFDQSxRQUFJMEMsMEJBQTBCLEdBQUcsS0FBS0YsZUFBTCxDQUFxQixLQUFLdkMsZ0JBQTFCLENBQWpDO0FBQ0EsUUFBSTBDLDhCQUE4QixHQUFHLEtBQUtILGVBQUwsQ0FBcUIsS0FBS3RDLHdCQUExQixDQUFyQztBQUNBLFFBQUkwQyw0QkFBNEIsR0FBRyxLQUFLSixlQUFMLENBQXFCLEtBQUtyQyx3QkFBMUIsQ0FBbkM7O0FBRUEsUUFBSW9DLHNCQUFzQixJQUFJRSwwQkFBMUIsSUFBd0RDLDBCQUF4RCxJQUFzRkMsOEJBQXRGLElBQXdIQyw0QkFBNUgsRUFBMEo7QUFDdEosV0FBS2hELGVBQUwsQ0FBcUIwQixTQUFyQixDQUErQkMsTUFBL0IsQ0FBc0MsV0FBdEM7QUFDSCxLQUZELE1BRU87QUFDSCxXQUFLM0IsZUFBTCxDQUFxQjBCLFNBQXJCLENBQStCZSxHQUEvQixDQUFtQyxXQUFuQztBQUNIO0FBQ0o7O0FBRVM1Qiw4QkFBVixDQUF1Q29DLGlCQUF2QyxFQUEwRGIsTUFBMUQsRUFBa0U7QUFBQTs7QUFDOUQsU0FBSzNDLHFCQUFMLEdBQTBDLEtBQUtGLHdCQUFMLENBQThCRyxnQkFBOUIsQ0FBK0N1RCxpQkFBL0MsQ0FBMUM7QUFDQSxTQUFLQyxjQUFMLENBQW9CLEtBQUt6RCxxQkFBekI7O0FBRUEsWUFBUTJDLE1BQVI7QUFDSSxXQUFLLFVBQUw7QUFDSSxhQUFLakMsb0JBQUwsR0FBNEIsRUFBNUI7QUFDQSx1Q0FBS1AsbUNBQUwsNENBQTBDOEIsU0FBMUMsQ0FBb0RlLEdBQXBELENBQXdELFdBQXhEO0FBQ0E7O0FBQ0osV0FBSyxPQUFMO0FBQ0ksYUFBS3BDLGdCQUFMLEdBQXdCLEVBQXhCO0FBQ0EsdUNBQUtSLDBCQUFMLDRDQUFpQzZCLFNBQWpDLENBQTJDZSxHQUEzQyxDQUErQyxXQUEvQztBQUNBOztBQUNKLFdBQUssbUJBQUw7QUFDSSxhQUFLckMsNEJBQUwsR0FBb0MsRUFBcEM7QUFDQSx3Q0FBS1Qsb0NBQUwsNkNBQTJDK0IsU0FBM0MsQ0FBcURlLEdBQXJELENBQXlELFdBQXpEO0FBQ0E7O0FBQ0osV0FBSyxlQUFMO0FBQ0ksYUFBS25DLHdCQUFMLEdBQWdDLEVBQWhDO0FBQ0EsdUNBQUtSLG1CQUFMLDRDQUEwQjRCLFNBQTFCLENBQW9DZSxHQUFwQyxDQUF3QyxXQUF4QztBQUNBOztBQUNKLFdBQUssYUFBTDtBQUNJLGFBQUtsQyx3QkFBTCxHQUFnQyxFQUFoQztBQUNBLHVDQUFLUixpQkFBTCw0Q0FBd0IyQixTQUF4QixDQUFrQ2UsR0FBbEMsQ0FBc0MsV0FBdEM7QUFDQTs7QUFFSixXQUFLLFlBQUw7QUFDSSxhQUFLcEMsZ0JBQUwsR0FBd0IsRUFBeEI7QUFDQSxhQUFLRixvQkFBTCxHQUE0QixFQUE1QjtBQUNBLGFBQUtDLDRCQUFMLEdBQW9DLEVBQXBDO0FBQ0EsYUFBS0Usd0JBQUwsR0FBZ0MsRUFBaEM7QUFDQSxhQUFLQyx3QkFBTCxHQUFnQyxFQUFoQztBQUNBLHdDQUFLWixvQ0FBTCw2Q0FBMkMrQixTQUEzQyxDQUFxRGUsR0FBckQsQ0FBeUQsV0FBekQ7QUFDQSx3Q0FBSzdDLG1DQUFMLDZDQUEwQzhCLFNBQTFDLENBQW9EZSxHQUFwRCxDQUF3RCxXQUF4RDtBQUNBLHVDQUFLM0MsbUJBQUwsNENBQTBCNEIsU0FBMUIsQ0FBb0NlLEdBQXBDLENBQXdDLFdBQXhDO0FBQ0EsdUNBQUsxQyxpQkFBTCw0Q0FBd0IyQixTQUF4QixDQUFrQ2UsR0FBbEMsQ0FBc0MsV0FBdEM7QUFDQSx1Q0FBSzVDLDBCQUFMLDRDQUFpQzZCLFNBQWpDLENBQTJDZSxHQUEzQyxDQUErQyxXQUEvQztBQUNBLHVDQUFLekMsZUFBTCw0Q0FBc0IwQixTQUF0QixDQUFnQ2UsR0FBaEMsQ0FBb0MsV0FBcEM7QUFDQTtBQWxDUjs7QUFvQ0EsU0FBS0MsMkJBQUw7QUFDSDs7QUFFU1EsZ0JBQVYsQ0FBeUJ6RCxxQkFBekIsRUFBZ0Q7QUFDNUMsU0FBSyxJQUFJc0IsQ0FBQyxHQUFHLENBQWIsRUFBZ0JBLENBQUMsR0FBR3RCLHFCQUFxQixDQUFDdUIsTUFBMUMsRUFBa0RELENBQUMsRUFBbkQsRUFBdUQ7QUFDbkQsVUFBSUssVUFBVSxHQUFHM0IscUJBQXFCLENBQUNzQixDQUFELENBQXJCLENBQXlCckIsZ0JBQXpCLENBQTBDLGtCQUExQyxDQUFqQjs7QUFDQSxXQUFJLElBQUlxQixFQUFDLEdBQUcsQ0FBWixFQUFlQSxFQUFDLEdBQUdLLFVBQVUsQ0FBQ0osTUFBOUIsRUFBc0NELEVBQUMsRUFBdkMsRUFBMkM7QUFDdkNLLGtCQUFVLENBQUNMLEVBQUQsQ0FBVixDQUFja0IsT0FBZCxHQUF3QixLQUF4QjtBQUNIO0FBQ0o7QUFDSjs7QUFFU3RCLHFCQUFWLEdBQWdDO0FBQzVCLFNBQUtULGlDQUFMLENBQXVDaUQsS0FBdkM7QUFDSDs7QUFFU1AsaUJBQVYsQ0FBMEJRLEdBQTFCLEVBQStCO0FBQzNCLFdBQU8sQ0FBQyxFQUFFQyxLQUFLLENBQUNDLE9BQU4sQ0FBY0YsR0FBZCxLQUFzQkEsR0FBRyxDQUFDcEMsTUFBNUIsQ0FBUjtBQUNIOztBQXJTb0QsQyIsImZpbGUiOiIuL2pzL3l2ZXNfZGVmYXVsdC4xMi5lc20uanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgQ29tcG9uZW50IGZyb20gJ1Nob3BVaS9tb2RlbHMvY29tcG9uZW50JztcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgRmlsdGVyRW51bWVyYXRpb24gZXh0ZW5kcyBDb21wb25lbnQge1xuICAgIHByaXZhdGUgZmlsdGVyU2VjdGlvbjogSFRNTEVsZW1lbnQ7XG4gICAgcHJpdmF0ZSBjYXRhbG9nVGFyZ2V0RW51bWVyYXRpb246IEhUTUxFbGVtZW50O1xuICAgIHByaXZhdGUgZmlsdGVyRW51bWVyYXRpb25MaXN0OiBIVE1MRWxlbWVudDtcbiAgICBwcml2YXRlIHN1Ym1pdEFjdGlvbkZpbHRlckJ1dHRvbjogSFRNTEVsZW1lbnQ7XG4gICAgcHJpdmF0ZSBzdWJtaXRBY3Rpb25GaWx0ZXJCdXR0b25Ub1RyaWdnZXI6IEhUTUxFbGVtZW50O1xuICAgIHByaXZhdGUgZGVsZXRlRmlsdGVyQ2F0ZWdvcnlQcm9kdWN0QXR0cmlidXRlOiBIVE1MRWxlbWVudDtcbiAgICBwcml2YXRlIGRlbGV0ZUZpbHRlckNhdGVnb3J5UHJvZHVjdFN1cHBsaWVyOiBIVE1MRWxlbWVudDtcbiAgICBwcml2YXRlIGRlbGV0ZVNhbGVzUHJvZHVjdENhdGVnb3J5OiBIVE1MRWxlbWVudDtcbiAgICBwcml2YXRlIGRlbGV0ZUNvdW50cnlPcmlnaW46IEhUTUxFbGVtZW50O1xuICAgIHByaXZhdGUgZGVsZXRlV2luZVF1YWxpdHk6IEhUTUxFbGVtZW50O1xuICAgIHByaXZhdGUgZGVsZXRlQWxsRmlsdGVyIDogSFRNTEVsZW1lbnQ7XG4gICAgcHJpdmF0ZSBsaXN0U3VwcGxpZXJzQ2hlY2tlZDogQXJyYXk8c3RyaW5nPjtcbiAgICBwcml2YXRlIGxpc3RQcm9kdWN0QXR0cmlidXRlc0NoZWNrZWQ6IEFycmF5PHN0cmluZz47XG4gICAgcHJpdmF0ZSBsaXN0Q291bnRyeU9yaWdpbkNoZWNrZWQ6IEFycmF5PHN0cmluZz47XG4gICAgcHJpdmF0ZSBsaXN0V2luZVF1YWxpdGllc0NoZWNrZWQ6IEFycmF5PHN0cmluZz47XG4gICAgcHJpdmF0ZSBsaXN0U2FsZXNDaGVja2VkOiBBcnJheTxzdHJpbmc+O1xuICAgIHByb3RlY3RlZCByZWFkeUNhbGxiYWNrKCk6IHZvaWQge1xuICAgIH1cblxuICAgIHByb3RlY3RlZCBpbml0KCkge1xuICAgICAgICB0aGlzLmZpbHRlclNlY3Rpb24gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuZmlsdGVyLXNlY3Rpb24nKTtcbiAgICAgICAgdGhpcy5jYXRhbG9nVGFyZ2V0RW51bWVyYXRpb24gPSB0aGlzLnBhcmVudEVsZW1lbnQ7XG4gICAgICAgIHRoaXMuZmlsdGVyRW51bWVyYXRpb25MaXN0ID0gPEhUTUxFbGVtZW50PnRoaXMuY2F0YWxvZ1RhcmdldEVudW1lcmF0aW9uLnF1ZXJ5U2VsZWN0b3JBbGwoJy5maWx0ZXItZW51bWVyYXRpb24nKTtcbiAgICAgICAgdGhpcy5kZWxldGVGaWx0ZXJDYXRlZ29yeVByb2R1Y3RBdHRyaWJ1dGUgPSA8SFRNTEVsZW1lbnQ+dGhpcy5jYXRhbG9nVGFyZ2V0RW51bWVyYXRpb24ucXVlcnlTZWxlY3RvcignLmRlbGV0ZS1jYXRlZ29yeS1maWx0ZXItcHJvZHVjdC1hdHRyaWJ1dGVzJylcbiAgICAgICAgdGhpcy5kZWxldGVGaWx0ZXJDYXRlZ29yeVByb2R1Y3RTdXBwbGllciA9IDxIVE1MRWxlbWVudD50aGlzLmNhdGFsb2dUYXJnZXRFbnVtZXJhdGlvbi5xdWVyeVNlbGVjdG9yKCcuZGVsZXRlLWNhdGVnb3J5LWZpbHRlci1zdXBwbGllcicpO1xuICAgICAgICB0aGlzLmRlbGV0ZVNhbGVzUHJvZHVjdENhdGVnb3J5ID0gPEhUTUxFbGVtZW50PnRoaXMuY2F0YWxvZ1RhcmdldEVudW1lcmF0aW9uLnF1ZXJ5U2VsZWN0b3IoJy5kZWxldGUtY2F0ZWdvcnktZmlsdGVyLXNhbGVzJyk7XG4gICAgICAgIHRoaXMuZGVsZXRlQ291bnRyeU9yaWdpbiA9IDxIVE1MRWxlbWVudD50aGlzLmNhdGFsb2dUYXJnZXRFbnVtZXJhdGlvbi5xdWVyeVNlbGVjdG9yKCcuZGVsZXRlLWNhdGVnb3J5LWZpbHRlci1jb3VudHJ5LW9yaWdpbicpO1xuICAgICAgICB0aGlzLmRlbGV0ZVdpbmVRdWFsaXR5ID0gPEhUTUxFbGVtZW50PnRoaXMuY2F0YWxvZ1RhcmdldEVudW1lcmF0aW9uLnF1ZXJ5U2VsZWN0b3IoJy5kZWxldGUtY2F0ZWdvcnktZmlsdGVyLXdpbmUtcXVhbGl0eScpO1xuICAgICAgICB0aGlzLmRlbGV0ZUFsbEZpbHRlciA9IDxIVE1MRWxlbWVudD50aGlzLmNhdGFsb2dUYXJnZXRFbnVtZXJhdGlvbi5xdWVyeVNlbGVjdG9yKCcuZGVsZXRlLWFsbC1maWx0ZXInKTtcblxuICAgICAgICB0aGlzLnN1Ym1pdEFjdGlvbkZpbHRlckJ1dHRvbiA9IDxIVE1MRWxlbWVudD50aGlzLmZpbHRlclNlY3Rpb24ucXVlcnlTZWxlY3RvcignI3N1Ym1pdEZpbHRlckFjdGlvbkJ1dHRvbicpO1xuICAgICAgICB0aGlzLnN1Ym1pdEFjdGlvbkZpbHRlckJ1dHRvblRvVHJpZ2dlciA9IDxIVE1MRWxlbWVudD50aGlzLmZpbHRlclNlY3Rpb24ucXVlcnlTZWxlY3RvcignI3N1Ym1pdEZpbHRlckFjdGlvbkJ1dHRvblRvVHJpZ2dlciAuanMtY2F0YWxvZ19fdHJpZ2dlcicpO1xuXG4gICAgICAgIHRoaXMubGlzdFN1cHBsaWVyc0NoZWNrZWQgPSBbXTtcbiAgICAgICAgdGhpcy5saXN0UHJvZHVjdEF0dHJpYnV0ZXNDaGVja2VkID0gW107XG4gICAgICAgIHRoaXMubGlzdFNhbGVzQ2hlY2tlZCA9IFtdO1xuICAgICAgICB0aGlzLmxpc3RDb3VudHJ5T3JpZ2luQ2hlY2tlZCA9IFtdO1xuICAgICAgICB0aGlzLmxpc3RXaW5lUXVhbGl0aWVzQ2hlY2tlZCA9IFtdO1xuXG4gICAgICAgIHRoaXMuY2hlY2tJZkFueUZpbHRlcklzU2VsZWN0ZWRBbmREaXNwbGF5RGVsZXRlRmlsdGVyQnV0dG9ucygpO1xuICAgICAgICB0aGlzLm1hcEV2ZW50cygpO1xuICAgIH1cblxuICAgIHByb3RlY3RlZCBtYXBFdmVudHMoKSB7XG4gICAgICAgIHRoaXMuc3VibWl0QWN0aW9uRmlsdGVyQnV0dG9uPy5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIHRoaXMudHJpZ2dlckZpbHRlckFjdGlvbi5iaW5kKHRoaXMpKTtcbiAgICAgICAgdGhpcy5kZWxldGVGaWx0ZXJDYXRlZ29yeVByb2R1Y3RTdXBwbGllcj8uYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCAoKSA9PiB0aGlzLnBlcmZvcm1EZWxldGVGaWx0ZXJPcGVyYXRpb24oJy5maWx0ZXItZW51bWVyYXRpb25bZmlsdGVyPXN1cHBsaWVyX19maWx0ZXJdJywgJ3N1cHBsaWVyJykpO1xuICAgICAgICB0aGlzLmRlbGV0ZUZpbHRlckNhdGVnb3J5UHJvZHVjdEF0dHJpYnV0ZT8uYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCAoKSA9PiB0aGlzLnBlcmZvcm1EZWxldGVGaWx0ZXJPcGVyYXRpb24oJy5maWx0ZXItZW51bWVyYXRpb246bm90KFtmaWx0ZXI9c3VwcGxpZXJfX2ZpbHRlcl0pOm5vdChbZmlsdGVyPWxhYmVsX19maWx0ZXJdKScsICdwcm9kdWN0QXR0cmlidXRlcycpKTtcbiAgICAgICAgdGhpcy5kZWxldGVTYWxlc1Byb2R1Y3RDYXRlZ29yeT8uYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCAoKSA9PiB0aGlzLnBlcmZvcm1EZWxldGVGaWx0ZXJPcGVyYXRpb24oJy5maWx0ZXItZW51bWVyYXRpb25bZmlsdGVyPWxhYmVsX19maWx0ZXJdJywgJ3NhbGVzJykpO1xuICAgICAgICB0aGlzLmRlbGV0ZUNvdW50cnlPcmlnaW4/LmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgKCkgPT4gdGhpcy5wZXJmb3JtRGVsZXRlRmlsdGVyT3BlcmF0aW9uKCcuZmlsdGVyLWVudW1lcmF0aW9uW2ZpbHRlcj1oZXJrdW5mdHNsYW5kX19maWx0ZXJdJywgJ2NvdW50cnlPcmlnaW4nKSk7XG4gICAgICAgIHRoaXMuZGVsZXRlQWxsRmlsdGVyPy5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsKCkgPT4gdGhpcy5wZXJmb3JtRGVsZXRlRmlsdGVyT3BlcmF0aW9uKCcuZmlsdGVyLWVudW1lcmF0aW9uJywgJ2RlbGV0ZS1hbGwnKSk7XG4gICAgICAgIHRoaXMuZGVsZXRlV2luZVF1YWxpdHk/LmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgKCkgPT4gdGhpcy5wZXJmb3JtRGVsZXRlRmlsdGVyT3BlcmF0aW9uKCdmaWx0ZXItZW51bWVyYXRpb25bZmlsdGVyPXdpbmVfcXVhbGl0eV9jbGFzc2lmaWNhdGlvbl9fZmlsdGVyXScsICd3aW5lUXVhbGl0eScpKTtcblxuICAgIH1cblxuICAgIHByb3RlY3RlZCBjaGVja0lmQW55RmlsdGVySXNTZWxlY3RlZEFuZERpc3BsYXlEZWxldGVGaWx0ZXJCdXR0b25zKCkge1xuICAgICAgICBsZXQgYWN0aXZlRmlsdGVyc0xpc3QgPSBbXTtcbiAgICAgICAgZm9yKGxldCBpID0gMDsgaSA8IHRoaXMuZmlsdGVyRW51bWVyYXRpb25MaXN0Lmxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgICBsZXQgY3VycmVudEVudW1lcmF0aW9uID0gdGhpcy5maWx0ZXJFbnVtZXJhdGlvbkxpc3RbaV07XG4gICAgICAgICAgICBsZXQgZmlsdGVyQXR0cmlidXRlID0gdGhpcy5maWx0ZXJFbnVtZXJhdGlvbkxpc3RbaV0uZ2V0QXR0cmlidXRlKCdmaWx0ZXInKTtcbiAgICAgICAgICAgIGxldCBjaGVja0JveGVzID0gY3VycmVudEVudW1lcmF0aW9uLnF1ZXJ5U2VsZWN0b3JBbGwoJy5jaGVja2JveF9faW5wdXQnKTtcbiAgICAgICAgICAgIGxldCBpc0FueUNoZWNrYm94Q2hlY2tlZCA9IHRoaXMuY2hlY2tJZkFueUNoZWNrYm94SXNDaGVja2VkKGNoZWNrQm94ZXMpO1xuICAgICAgICAgICAgYWN0aXZlRmlsdGVyc0xpc3QgPSB0aGlzLmNvdW50QWN0aXZlRmlsdGVyQ2F0ZWdvcmllcyhmaWx0ZXJBdHRyaWJ1dGUsIGlzQW55Q2hlY2tib3hDaGVja2VkLCBhY3RpdmVGaWx0ZXJzTGlzdCk7XG4gICAgICAgICAgICB0aGlzLmJpbmRFdmVudHNJbkNoZWNrQm94ZXMoY2hlY2tCb3hlcyk7XG4gICAgICAgIH1cblxuICAgICAgICBsZXQgaXNBdExlYXN0T25lRmlsdGVyQWN0aXZlID0gYWN0aXZlRmlsdGVyc0xpc3QubGVuZ3RoID49IDE7XG4gICAgICAgIGlmIChpc0F0TGVhc3RPbmVGaWx0ZXJBY3RpdmUpIHtcbiAgICAgICAgICAgIHRoaXMuZGVsZXRlQWxsRmlsdGVyLmNsYXNzTGlzdC5yZW1vdmUoJ2lzLWhpZGRlbicpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgcHJvdGVjdGVkIGNvdW50QWN0aXZlRmlsdGVyQ2F0ZWdvcmllcyhmaWx0ZXJBdHRyaWJ1dGUsIGlzQW55Q2hlY2tib3hDaGVja2VkLCBhY3RpdmVGaWx0ZXJzTGlzdCkge1xuICAgICAgICBzd2l0Y2ggKGZpbHRlckF0dHJpYnV0ZSkge1xuICAgICAgICAgICAgY2FzZSAnc3VwcGxpZXJfX2ZpbHRlcic6XG4gICAgICAgICAgICAgICAgaWYgKGlzQW55Q2hlY2tib3hDaGVja2VkKSB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuZGVsZXRlRmlsdGVyQ2F0ZWdvcnlQcm9kdWN0U3VwcGxpZXI/LmNsYXNzTGlzdC5yZW1vdmUoJ2lzLWhpZGRlbicpO1xuICAgICAgICAgICAgICAgICAgICB0aGlzLmxpc3RTdXBwbGllcnNDaGVja2VkLnB1c2goJ2NoZWNrZWQnKTtcbiAgICAgICAgICAgICAgICAgICAgYWN0aXZlRmlsdGVyc0xpc3QgPSB0aGlzLnVwZGF0ZUFjdGl2ZUZpbHRlckxpc3QoYWN0aXZlRmlsdGVyc0xpc3QsJ3N1cHBsaWVyJyk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIHJldHVybiBhY3RpdmVGaWx0ZXJzTGlzdDtcblxuICAgICAgICAgICAgY2FzZSAnYmlvX19maWx0ZXInOlxuICAgICAgICAgICAgY2FzZSAndmVnYW5fX2ZpbHRlcic6XG4gICAgICAgICAgICBjYXNlICdsYWt0b3NlZnJlaV9fZmlsdGVyJzpcbiAgICAgICAgICAgIGNhc2UgJ2dsdXRlbmZyZWlfX2ZpbHRlcic6XG4gICAgICAgICAgICBjYXNlICd2ZWdldGFyaXNjaF9fZmlsdGVyJzpcbiAgICAgICAgICAgIGNhc2UgJ2ZhaXJ0cmFkZV9fZmlsdGVyJzpcbiAgICAgICAgICAgICAgICBpZiAoaXNBbnlDaGVja2JveENoZWNrZWQpIHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5kZWxldGVGaWx0ZXJDYXRlZ29yeVByb2R1Y3RBdHRyaWJ1dGU/LmNsYXNzTGlzdC5yZW1vdmUoJ2lzLWhpZGRlbicpO1xuICAgICAgICAgICAgICAgICAgICB0aGlzLmxpc3RQcm9kdWN0QXR0cmlidXRlc0NoZWNrZWQucHVzaCgnY2hlY2tlZCcpO1xuICAgICAgICAgICAgICAgICAgICBhY3RpdmVGaWx0ZXJzTGlzdCA9IHRoaXMudXBkYXRlQWN0aXZlRmlsdGVyTGlzdChhY3RpdmVGaWx0ZXJzTGlzdCwncHJvZHVjdEF0dHJpYnV0ZXMnKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgcmV0dXJuIGFjdGl2ZUZpbHRlcnNMaXN0O1xuICAgICAgICAgICAgY2FzZSAnbGFiZWxfX2ZpbHRlcic6XG4gICAgICAgICAgICAgICAgaWYgKGlzQW55Q2hlY2tib3hDaGVja2VkKSB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuZGVsZXRlU2FsZXNQcm9kdWN0Q2F0ZWdvcnk/LmNsYXNzTGlzdC5yZW1vdmUoJ2lzLWhpZGRlbicpO1xuICAgICAgICAgICAgICAgICAgICB0aGlzLmxpc3RTYWxlc0NoZWNrZWQucHVzaCgnY2hlY2tlZCcpO1xuICAgICAgICAgICAgICAgICAgICBhY3RpdmVGaWx0ZXJzTGlzdCA9IHRoaXMudXBkYXRlQWN0aXZlRmlsdGVyTGlzdChhY3RpdmVGaWx0ZXJzTGlzdCwnbGFiZWwnKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgcmV0dXJuIGFjdGl2ZUZpbHRlcnNMaXN0O1xuXG4gICAgICAgICAgICBjYXNlICd3aW5lX3F1YWxpdHlfY2xhc3NpZmljYXRpb25fX2ZpbHRlcic6XG4gICAgICAgICAgICAgICAgaWYgKGlzQW55Q2hlY2tib3hDaGVja2VkKSB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuZGVsZXRlV2luZVF1YWxpdHk/LmNsYXNzTGlzdC5yZW1vdmUoJ2lzLWhpZGRlbicpO1xuICAgICAgICAgICAgICAgICAgICB0aGlzLmxpc3RXaW5lUXVhbGl0aWVzQ2hlY2tlZC5wdXNoKCdjaGVja2VkJyk7XG4gICAgICAgICAgICAgICAgICAgIGFjdGl2ZUZpbHRlcnNMaXN0ID0gdGhpcy51cGRhdGVBY3RpdmVGaWx0ZXJMaXN0KGFjdGl2ZUZpbHRlcnNMaXN0LCd3aW5lX3F1YWxpdHlfY2xhc3NpZmljYXRpb24nKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgcmV0dXJuIGFjdGl2ZUZpbHRlcnNMaXN0O1xuXG4gICAgICAgICAgICBjYXNlICdoZXJrdW5mdHNsYW5kX19maWx0ZXInOlxuICAgICAgICAgICAgICAgIGlmIChpc0FueUNoZWNrYm94Q2hlY2tlZCkge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLmRlbGV0ZUNvdW50cnlPcmlnaW4/LmNsYXNzTGlzdC5yZW1vdmUoJ2lzLWhpZGRlbicpO1xuICAgICAgICAgICAgICAgICAgICB0aGlzLmxpc3RDb3VudHJ5T3JpZ2luQ2hlY2tlZC5wdXNoKCdjaGVja2VkJyk7XG4gICAgICAgICAgICAgICAgICAgIGFjdGl2ZUZpbHRlcnNMaXN0ID0gdGhpcy51cGRhdGVBY3RpdmVGaWx0ZXJMaXN0KGFjdGl2ZUZpbHRlcnNMaXN0LCdoZXJrdW5mdHNsYW5kJyk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIHJldHVybiBhY3RpdmVGaWx0ZXJzTGlzdDtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIHByb3RlY3RlZCB1cGRhdGVBY3RpdmVGaWx0ZXJMaXN0KGFjdGl2ZUZpbHRlcnNMaXN0LCBmaWx0ZXJUeXBlKSB7XG4gICAgICAgIGlmKCFhY3RpdmVGaWx0ZXJzTGlzdC5pbmNsdWRlcyhmaWx0ZXJUeXBlKSkge1xuICAgICAgICAgICAgYWN0aXZlRmlsdGVyc0xpc3QucHVzaChmaWx0ZXJUeXBlKTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gYWN0aXZlRmlsdGVyc0xpc3Q7XG4gICAgfVxuXG4gICAgcHJvdGVjdGVkIGNoZWNrSWZBbnlDaGVja2JveElzQ2hlY2tlZChjaGVja2JveGVzKTogYm9vbGVhbiB7XG4gICAgICAgIGZvcihsZXQgaSA9IDA7IGkgPCBjaGVja2JveGVzLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgICBpZihjaGVja2JveGVzW2ldLmNoZWNrZWQgPT09IHRydWUpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gdHJ1ZVxuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9XG5cbiAgICBwcm90ZWN0ZWQgYmluZEV2ZW50c0luQ2hlY2tCb3hlcyhjaGVja2JveGVzKTogdm9pZCAge1xuICAgICAgICBmb3IobGV0IGkgPSAwOyBpIDwgY2hlY2tib3hlcy5sZW5ndGg7IGkrKykge1xuICAgICAgICAgICAgY2hlY2tib3hlc1tpXS5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIChlKSA9PiB7XG4gICAgICAgICAgICAgICAgbGV0IGNoZWNrQm94ID0gZS50YXJnZXQ7XG4gICAgICAgICAgICAgICAgbGV0IGlzQ2hlY2tlZCA9IGNoZWNrQm94LmNoZWNrZWQ7XG4gICAgICAgICAgICAgICAgbGV0IGNhdGVnb3J5ID0gY2hlY2tCb3guZ2V0QXR0cmlidXRlKCdjYXRlZ29yeScpO1xuICAgICAgICAgICAgICAgIHRoaXMudG9nZ2xlRGVsZXRlRmlsdGVycyhjYXRlZ29yeSwgaXNDaGVja2VkKTtcbiAgICAgICAgICAgIH0pXG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBwcm90ZWN0ZWQgdG9nZ2xlRGVsZXRlRmlsdGVycyhjYXRlZ29yeSwgaXNDaGVja2VkKSB7XG5cbiAgICAgICAgc3dpdGNoIChjYXRlZ29yeSkge1xuICAgICAgICAgICAgY2FzZSAnc3VwcGxpZXInOlxuICAgICAgICAgICAgICAgIGlmKGlzQ2hlY2tlZCkge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLmxpc3RTdXBwbGllcnNDaGVja2VkLnB1c2goJ2NoZWNrZWQnKTtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5kZWxldGVGaWx0ZXJDYXRlZ29yeVByb2R1Y3RTdXBwbGllcj8uY2xhc3NMaXN0LnJlbW92ZSgnaXMtaGlkZGVuJyk7XG5cbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLmxpc3RTdXBwbGllcnNDaGVja2VkLnBvcCgpO1xuICAgICAgICAgICAgICAgICAgICBpZiAodGhpcy5saXN0U3VwcGxpZXJzQ2hlY2tlZC5sZW5ndGggPT09IDApIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuZGVsZXRlRmlsdGVyQ2F0ZWdvcnlQcm9kdWN0U3VwcGxpZXI/LmNsYXNzTGlzdC5hZGQoJ2lzLWhpZGRlbicpO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGJyZWFrO1xuXG4gICAgICAgICAgICBjYXNlICdiaW8nOlxuICAgICAgICAgICAgY2FzZSAndmVnYW4nOlxuICAgICAgICAgICAgY2FzZSAnbGFrdG9zZWZyZWknOlxuICAgICAgICAgICAgY2FzZSAnZ2x1dGVuZnJlaSc6XG4gICAgICAgICAgICBjYXNlICdmYWlydHJhZGUnOlxuICAgICAgICAgICAgY2FzZSAndmVnZXRhcmlzY2gnOlxuICAgICAgICAgICAgICAgIGlmIChpc0NoZWNrZWQpIHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5saXN0UHJvZHVjdEF0dHJpYnV0ZXNDaGVja2VkLnB1c2goJ2NoZWNrZWQnKTtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5kZWxldGVGaWx0ZXJDYXRlZ29yeVByb2R1Y3RBdHRyaWJ1dGU/LmNsYXNzTGlzdC5yZW1vdmUoJ2lzLWhpZGRlbicpO1xuXG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5saXN0UHJvZHVjdEF0dHJpYnV0ZXNDaGVja2VkLnBvcCgpO1xuICAgICAgICAgICAgICAgICAgICBpZiAodGhpcy5saXN0UHJvZHVjdEF0dHJpYnV0ZXNDaGVja2VkLmxlbmd0aCA9PT0gMCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5kZWxldGVGaWx0ZXJDYXRlZ29yeVByb2R1Y3RBdHRyaWJ1dGU/LmNsYXNzTGlzdC5hZGQoJ2lzLWhpZGRlbicpO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgY2FzZSAnd2luZV9xdWFsaXR5X2NsYXNzaWZpY2F0aW9uJzpcbiAgICAgICAgICAgICAgICBpZiAoaXNDaGVja2VkKSB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMubGlzdFdpbmVRdWFsaXRpZXNDaGVja2VkLnB1c2goJ2NoZWNrZWQnKTtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5kZWxldGVXaW5lUXVhbGl0eT8uY2xhc3NMaXN0LnJlbW92ZSgnaXMtaGlkZGVuJyk7XG5cblxuICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMubGlzdFdpbmVRdWFsaXRpZXNDaGVja2VkLnBvcCgpO1xuICAgICAgICAgICAgICAgICAgICBpZiAodGhpcy5saXN0V2luZVF1YWxpdGllc0NoZWNrZWQubGVuZ3RoID09PSAwKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmRlbGV0ZVdpbmVRdWFsaXR5Py5jbGFzc0xpc3QuYWRkKCdpcy1oaWRkZW4nKTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIGNhc2UgJ2hlcmt1bmZ0c2xhbmQnOlxuICAgICAgICAgICAgICAgIGlmIChpc0NoZWNrZWQpIHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5saXN0Q291bnRyeU9yaWdpbkNoZWNrZWQucHVzaCgnY2hlY2tlZCcpO1xuICAgICAgICAgICAgICAgICAgICB0aGlzLmRlbGV0ZUNvdW50cnlPcmlnaW4/LmNsYXNzTGlzdC5yZW1vdmUoJ2lzLWhpZGRlbicpO1xuXG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5saXN0Q291bnRyeU9yaWdpbkNoZWNrZWQucG9wKCk7XG4gICAgICAgICAgICAgICAgICAgIGlmICh0aGlzLmxpc3RDb3VudHJ5T3JpZ2luQ2hlY2tlZC5sZW5ndGggPT09IDApIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuZGVsZXRlQ291bnRyeU9yaWdpbj8uY2xhc3NMaXN0LmFkZCgnaXMtaGlkZGVuJyk7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICBjYXNlICdsYWJlbCc6XG4gICAgICAgICAgICAgICAgaWYgKGlzQ2hlY2tlZCkge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLmxpc3RTYWxlc0NoZWNrZWQucHVzaCgnY2hlY2tlZCcpO1xuICAgICAgICAgICAgICAgICAgICB0aGlzLmRlbGV0ZVNhbGVzUHJvZHVjdENhdGVnb3J5Py5jbGFzc0xpc3QucmVtb3ZlKCdpcy1oaWRkZW4nKTtcblxuICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMubGlzdFNhbGVzQ2hlY2tlZC5wb3AoKTtcbiAgICAgICAgICAgICAgICAgICAgaWYodGhpcy5saXN0U2FsZXNDaGVja2VkLmxlbmd0aCA9PT0gMCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5kZWxldGVTYWxlc1Byb2R1Y3RDYXRlZ29yeT8uY2xhc3NMaXN0LmFkZCgnaXMtaGlkZGVuJyk7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgfVxuICAgICAgICB0aGlzLnRvZ2dsZURlbGV0ZUFsbEZpbHRlckJ1dHRvbigpO1xuICAgIH1cblxuICAgIHByb3RlY3RlZCB0b2dnbGVEZWxldGVBbGxGaWx0ZXJCdXR0b24oKSB7XG4gICAgICAgIGxldCBpc1N1cHBsaWVyTGlzdE5vdEVtcHR5ID0gdGhpcy5pc05vbkVtcHR5QXJyYXkodGhpcy5saXN0U3VwcGxpZXJzQ2hlY2tlZCk7XG4gICAgICAgIGxldCBpc1Byb2R1Y3RBdHRyaWJ1dGVOb3RFbXB0eSA9IHRoaXMuaXNOb25FbXB0eUFycmF5KHRoaXMubGlzdFByb2R1Y3RBdHRyaWJ1dGVzQ2hlY2tlZCk7XG4gICAgICAgIGxldCBpc1NhbGVzTGlzdENoZWNrZWROb3RFbXB0eSA9IHRoaXMuaXNOb25FbXB0eUFycmF5KHRoaXMubGlzdFNhbGVzQ2hlY2tlZCk7XG4gICAgICAgIGxldCBpc0NvdW50cnlPcmlnaW5DaGVja2VkTm90RW1wdHkgPSB0aGlzLmlzTm9uRW1wdHlBcnJheSh0aGlzLmxpc3RDb3VudHJ5T3JpZ2luQ2hlY2tlZCk7XG4gICAgICAgIGxldCBpc1dpbmVRdWFsaXR5Q2hlY2tlZE5vdEVtcHR5ID0gdGhpcy5pc05vbkVtcHR5QXJyYXkodGhpcy5saXN0V2luZVF1YWxpdGllc0NoZWNrZWQpO1xuXG4gICAgICAgIGlmIChpc1N1cHBsaWVyTGlzdE5vdEVtcHR5IHx8IGlzUHJvZHVjdEF0dHJpYnV0ZU5vdEVtcHR5IHx8IGlzU2FsZXNMaXN0Q2hlY2tlZE5vdEVtcHR5IHx8IGlzQ291bnRyeU9yaWdpbkNoZWNrZWROb3RFbXB0eSB8fCBpc1dpbmVRdWFsaXR5Q2hlY2tlZE5vdEVtcHR5KSB7XG4gICAgICAgICAgICB0aGlzLmRlbGV0ZUFsbEZpbHRlci5jbGFzc0xpc3QucmVtb3ZlKCdpcy1oaWRkZW4nKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHRoaXMuZGVsZXRlQWxsRmlsdGVyLmNsYXNzTGlzdC5hZGQoJ2lzLWhpZGRlbicpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgcHJvdGVjdGVkIHBlcmZvcm1EZWxldGVGaWx0ZXJPcGVyYXRpb24oZmlsdGVyRW51bWVyYXRpb24sIHRhcmdldCkge1xuICAgICAgICB0aGlzLmZpbHRlckVudW1lcmF0aW9uTGlzdCA9IDxIVE1MRWxlbWVudD50aGlzLmNhdGFsb2dUYXJnZXRFbnVtZXJhdGlvbi5xdWVyeVNlbGVjdG9yQWxsKGZpbHRlckVudW1lcmF0aW9uKVxuICAgICAgICB0aGlzLnVuY2hlY2tGaWx0ZXJzKHRoaXMuZmlsdGVyRW51bWVyYXRpb25MaXN0KTtcblxuICAgICAgICBzd2l0Y2ggKHRhcmdldCkge1xuICAgICAgICAgICAgY2FzZSAnc3VwcGxpZXInOlxuICAgICAgICAgICAgICAgIHRoaXMubGlzdFN1cHBsaWVyc0NoZWNrZWQgPSBbXTtcbiAgICAgICAgICAgICAgICB0aGlzLmRlbGV0ZUZpbHRlckNhdGVnb3J5UHJvZHVjdFN1cHBsaWVyPy5jbGFzc0xpc3QuYWRkKCdpcy1oaWRkZW4nKTtcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIGNhc2UgJ3NhbGVzJzpcbiAgICAgICAgICAgICAgICB0aGlzLmxpc3RTYWxlc0NoZWNrZWQgPSBbXTtcbiAgICAgICAgICAgICAgICB0aGlzLmRlbGV0ZVNhbGVzUHJvZHVjdENhdGVnb3J5Py5jbGFzc0xpc3QuYWRkKCdpcy1oaWRkZW4nKTtcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIGNhc2UgJ3Byb2R1Y3RBdHRyaWJ1dGVzJzpcbiAgICAgICAgICAgICAgICB0aGlzLmxpc3RQcm9kdWN0QXR0cmlidXRlc0NoZWNrZWQgPSBbXTtcbiAgICAgICAgICAgICAgICB0aGlzLmRlbGV0ZUZpbHRlckNhdGVnb3J5UHJvZHVjdEF0dHJpYnV0ZT8uY2xhc3NMaXN0LmFkZCgnaXMtaGlkZGVuJyk7XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICBjYXNlICdjb3VudHJ5T3JpZ2luJzpcbiAgICAgICAgICAgICAgICB0aGlzLmxpc3RDb3VudHJ5T3JpZ2luQ2hlY2tlZCA9IFtdO1xuICAgICAgICAgICAgICAgIHRoaXMuZGVsZXRlQ291bnRyeU9yaWdpbj8uY2xhc3NMaXN0LmFkZCgnaXMtaGlkZGVuJyk7XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICBjYXNlICd3aW5lUXVhbGl0eSc6XG4gICAgICAgICAgICAgICAgdGhpcy5saXN0V2luZVF1YWxpdGllc0NoZWNrZWQgPSBbXTtcbiAgICAgICAgICAgICAgICB0aGlzLmRlbGV0ZVdpbmVRdWFsaXR5Py5jbGFzc0xpc3QuYWRkKCdpcy1oaWRkZW4nKTtcbiAgICAgICAgICAgICAgICBicmVhaztcblxuICAgICAgICAgICAgY2FzZSAnZGVsZXRlLWFsbCc6XG4gICAgICAgICAgICAgICAgdGhpcy5saXN0U2FsZXNDaGVja2VkID0gW107XG4gICAgICAgICAgICAgICAgdGhpcy5saXN0U3VwcGxpZXJzQ2hlY2tlZCA9IFtdO1xuICAgICAgICAgICAgICAgIHRoaXMubGlzdFByb2R1Y3RBdHRyaWJ1dGVzQ2hlY2tlZCA9IFtdO1xuICAgICAgICAgICAgICAgIHRoaXMubGlzdENvdW50cnlPcmlnaW5DaGVja2VkID0gW107XG4gICAgICAgICAgICAgICAgdGhpcy5saXN0V2luZVF1YWxpdGllc0NoZWNrZWQgPSBbXTtcbiAgICAgICAgICAgICAgICB0aGlzLmRlbGV0ZUZpbHRlckNhdGVnb3J5UHJvZHVjdEF0dHJpYnV0ZT8uY2xhc3NMaXN0LmFkZCgnaXMtaGlkZGVuJyk7XG4gICAgICAgICAgICAgICAgdGhpcy5kZWxldGVGaWx0ZXJDYXRlZ29yeVByb2R1Y3RTdXBwbGllcj8uY2xhc3NMaXN0LmFkZCgnaXMtaGlkZGVuJyk7XG4gICAgICAgICAgICAgICAgdGhpcy5kZWxldGVDb3VudHJ5T3JpZ2luPy5jbGFzc0xpc3QuYWRkKCdpcy1oaWRkZW4nKTtcbiAgICAgICAgICAgICAgICB0aGlzLmRlbGV0ZVdpbmVRdWFsaXR5Py5jbGFzc0xpc3QuYWRkKCdpcy1oaWRkZW4nKTtcbiAgICAgICAgICAgICAgICB0aGlzLmRlbGV0ZVNhbGVzUHJvZHVjdENhdGVnb3J5Py5jbGFzc0xpc3QuYWRkKCdpcy1oaWRkZW4nKTtcbiAgICAgICAgICAgICAgICB0aGlzLmRlbGV0ZUFsbEZpbHRlcj8uY2xhc3NMaXN0LmFkZCgnaXMtaGlkZGVuJyk7XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgIH1cbiAgICAgICAgdGhpcy50b2dnbGVEZWxldGVBbGxGaWx0ZXJCdXR0b24oKTtcbiAgICB9XG5cbiAgICBwcm90ZWN0ZWQgdW5jaGVja0ZpbHRlcnMoZmlsdGVyRW51bWVyYXRpb25MaXN0KSB7XG4gICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgZmlsdGVyRW51bWVyYXRpb25MaXN0Lmxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgICBsZXQgY2hlY2tCb3hlcyA9IGZpbHRlckVudW1lcmF0aW9uTGlzdFtpXS5xdWVyeVNlbGVjdG9yQWxsKCcuY2hlY2tib3hfX2lucHV0Jyk7XG4gICAgICAgICAgICBmb3IobGV0IGkgPSAwOyBpIDwgY2hlY2tCb3hlcy5sZW5ndGg7IGkrKykge1xuICAgICAgICAgICAgICAgIGNoZWNrQm94ZXNbaV0uY2hlY2tlZCA9IGZhbHNlO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfVxuXG4gICAgcHJvdGVjdGVkIHRyaWdnZXJGaWx0ZXJBY3Rpb24oKSB7XG4gICAgICAgIHRoaXMuc3VibWl0QWN0aW9uRmlsdGVyQnV0dG9uVG9UcmlnZ2VyLmNsaWNrKCk7XG4gICAgfVxuXG4gICAgcHJvdGVjdGVkIGlzTm9uRW1wdHlBcnJheShhcnIpIHtcbiAgICAgICAgcmV0dXJuICEhKEFycmF5LmlzQXJyYXkoYXJyKSAmJiBhcnIubGVuZ3RoKTtcbiAgICB9XG59XG4iXSwic291cmNlUm9vdCI6IiJ9