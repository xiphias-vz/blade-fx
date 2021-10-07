import Component from 'ShopUi/models/component';

export default class FilterEnumeration extends Component {
    private filterSection: HTMLElement;
    private catalogTargetEnumeration: HTMLElement;
    private filterEnumerationList: HTMLElement;
    private submitActionFilterButton: HTMLElement;
    private submitActionFilterButtonToTrigger: HTMLElement;
    private deleteFilterCategoryProductAttribute: HTMLElement;
    private deleteFilterCategoryProductSupplier: HTMLElement;
    private deleteSalesProductCategory: HTMLElement;
    private deleteCountryOrigin: HTMLElement;
    private deleteWineQuality: HTMLElement;
    private deleteAllFilter : HTMLElement;
    private listSuppliersChecked: Array<string>;
    private listProductAttributesChecked: Array<string>;
    private listCountryOriginChecked: Array<string>;
    private listWineQualitiesChecked: Array<string>;
    private listSalesChecked: Array<string>;
    protected readyCallback(): void {
    }

    protected init() {
        this.filterSection = this.parentElement.parentElement.parentElement;
        this.catalogTargetEnumeration = this.parentElement;
        this.filterEnumerationList = <HTMLElement>this.catalogTargetEnumeration.querySelectorAll('.filter-enumeration');

        this.deleteFilterCategoryProductAttribute = <HTMLElement>this.catalogTargetEnumeration.querySelector('.delete-category-filter-product-attributes')
        this.deleteFilterCategoryProductSupplier = <HTMLElement>this.catalogTargetEnumeration.querySelector('.delete-category-filter-supplier');
        this.deleteSalesProductCategory = <HTMLElement>this.catalogTargetEnumeration.querySelector('.delete-category-filter-sales');
        this.deleteCountryOrigin = <HTMLElement>this.catalogTargetEnumeration.querySelector('.delete-category-filter-country-origin');
        this.deleteWineQuality = <HTMLElement>this.catalogTargetEnumeration.querySelector('.delete-category-filter-wine-quality');
        this.deleteAllFilter = <HTMLElement>this.catalogTargetEnumeration.querySelector('.delete-all-filter');

        this.submitActionFilterButton = <HTMLElement>this.filterSection.querySelector('#submitFilterActionButton');
        this.submitActionFilterButtonToTrigger = <HTMLElement>this.filterSection.querySelector('#submitFilterActionButtonToTrigger .js-catalog__trigger');

        this.listSuppliersChecked = [];
        this.listProductAttributesChecked = [];
        this.listSalesChecked = [];
        this.listCountryOriginChecked = [];
        this.listWineQualitiesChecked = [];

        this.checkIfAnyFilterIsSelectedAndDisplayDeleteFilterButtons();
        this.mapEvents();
    }

    protected mapEvents() {
        this.submitActionFilterButton?.addEventListener('click', this.triggerFilterAction.bind(this));
        this.deleteFilterCategoryProductSupplier?.addEventListener('click', () => this.performDeleteFilterOperation('.filter-enumeration[filter=supplier__filter]', 'supplier'));
        this.deleteFilterCategoryProductAttribute?.addEventListener('click', () => this.performDeleteFilterOperation('.filter-enumeration:not([filter=supplier__filter]):not([filter=label__filter])', 'productAttributes'));
        this.deleteSalesProductCategory?.addEventListener('click', () => this.performDeleteFilterOperation('.filter-enumeration[filter=label__filter]', 'sales'));
        this.deleteCountryOrigin?.addEventListener('click', () => this.performDeleteFilterOperation('.filter-enumeration[filter=herkunftsland__filter]', 'countryOrigin'));
        this.deleteAllFilter?.addEventListener('click',() => this.performDeleteFilterOperation('.filter-enumeration', 'delete-all'));
        this.deleteWineQuality?.addEventListener('click', () => this.performDeleteFilterOperation('filter-enumeration[filter=wine_quality_classification__filter]', 'wineQuality'));

    }

    protected checkIfAnyFilterIsSelectedAndDisplayDeleteFilterButtons() {
        let activeFiltersList = [];
        for(let i = 0; i < this.filterEnumerationList.length; i++) {
            let currentEnumeration = this.filterEnumerationList[i];
            let filterAttribute = this.filterEnumerationList[i].getAttribute('filter');
            let checkBoxes = currentEnumeration.querySelectorAll('.checkbox__input');
            let isAnyCheckboxChecked = this.checkIfAnyCheckboxIsChecked(checkBoxes);
            activeFiltersList = this.countActiveFilterCategories(filterAttribute, isAnyCheckboxChecked, activeFiltersList);
            this.bindEventsInCheckBoxes(checkBoxes);
        }

        let isAtLeastOneFilterActive = activeFiltersList.length >= 1;
        if (isAtLeastOneFilterActive) {
            this.deleteAllFilter.classList.remove('is-hidden');
        }
    }

    protected countActiveFilterCategories(filterAttribute, isAnyCheckboxChecked, activeFiltersList) {
        switch (filterAttribute) {
            case 'supplier__filter':
                if (isAnyCheckboxChecked) {
                    this.deleteFilterCategoryProductSupplier?.classList.remove('is-hidden');
                    this.listSuppliersChecked.push('checked');
                    activeFiltersList = this.updateActiveFilterList(activeFiltersList,'supplier');
                }
                return activeFiltersList;

            case 'bio__filter':
            case 'vegan__filter':
            case 'laktosefrei__filter':
            case 'glutenfrei__filter':
            case 'vegetarisch__filter':
            case 'fairtrade__filter':
                if (isAnyCheckboxChecked) {
                    this.deleteFilterCategoryProductAttribute?.classList.remove('is-hidden');
                    this.listProductAttributesChecked.push('checked');
                    activeFiltersList = this.updateActiveFilterList(activeFiltersList,'productAttributes');
                }
                return activeFiltersList;
            case 'label__filter':
                if (isAnyCheckboxChecked) {
                    this.deleteSalesProductCategory?.classList.remove('is-hidden');
                    this.listSalesChecked.push('checked');
                    activeFiltersList = this.updateActiveFilterList(activeFiltersList,'label');
                }
                return activeFiltersList;

            case 'wine_quality_classification__filter':
                if (isAnyCheckboxChecked) {
                    this.deleteWineQuality?.classList.remove('is-hidden');
                    this.listWineQualitiesChecked.push('checked');
                    activeFiltersList = this.updateActiveFilterList(activeFiltersList,'wine_quality_classification');
                }
                return activeFiltersList;

            case 'herkunftsland__filter':
                if (isAnyCheckboxChecked) {
                    this.deleteCountryOrigin?.classList.remove('is-hidden');
                    this.listCountryOriginChecked.push('checked');
                    activeFiltersList = this.updateActiveFilterList(activeFiltersList,'herkunftsland');
                }
                return activeFiltersList;
        }
    }

    protected updateActiveFilterList(activeFiltersList, filterType) {
        if(!activeFiltersList.includes(filterType)) {
            activeFiltersList.push(filterType);
        }
        return activeFiltersList;
    }

    protected checkIfAnyCheckboxIsChecked(checkboxes): boolean {
        for(let i = 0; i < checkboxes.length; i++) {
            if(checkboxes[i].checked === true) {
                return true
            }
        }
        return false;
    }

    protected bindEventsInCheckBoxes(checkboxes): void  {
        for(let i = 0; i < checkboxes.length; i++) {
            checkboxes[i].addEventListener('click', (e) => {
                let checkBox = e.target;
                let isChecked = checkBox.checked;
                let category = checkBox.getAttribute('category');
                this.toggleDeleteFilters(category, isChecked);
            })
        }
    }

    protected toggleDeleteFilters(category, isChecked) {

        switch (category) {
            case 'supplier':
                if(isChecked) {
                    this.listSuppliersChecked.push('checked');
                    this.deleteFilterCategoryProductSupplier?.classList.remove('is-hidden');

                } else {
                    this.listSuppliersChecked.pop();
                    if (this.listSuppliersChecked.length === 0) {
                        this.deleteFilterCategoryProductSupplier?.classList.add('is-hidden');
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
                    this.listProductAttributesChecked.push('checked');
                    this.deleteFilterCategoryProductAttribute?.classList.remove('is-hidden');

                } else {
                    this.listProductAttributesChecked.pop();
                    if (this.listProductAttributesChecked.length === 0) {
                        this.deleteFilterCategoryProductAttribute?.classList.add('is-hidden');
                    }
                }
                break;
            case 'wine_quality_classification':
                if (isChecked) {
                    this.listWineQualitiesChecked.push('checked');
                    this.deleteWineQuality?.classList.remove('is-hidden');


                } else {
                    this.listWineQualitiesChecked.pop();
                    if (this.listWineQualitiesChecked.length === 0) {
                        this.deleteWineQuality?.classList.add('is-hidden');
                    }
                }
                break;
            case 'herkunftsland':
                if (isChecked) {
                    this.listCountryOriginChecked.push('checked');
                    this.deleteCountryOrigin?.classList.remove('is-hidden');

                } else {
                    this.listCountryOriginChecked.pop();
                    if (this.listCountryOriginChecked.length === 0) {
                        this.deleteCountryOrigin?.classList.add('is-hidden');
                    }
                }
                break;
            case 'label':
                if (isChecked) {
                    this.listSalesChecked.push('checked');
                    this.deleteSalesProductCategory?.classList.remove('is-hidden');

                } else {
                    this.listSalesChecked.pop();
                    if(this.listSalesChecked.length === 0) {
                        this.deleteSalesProductCategory?.classList.add('is-hidden');
                    }
                }

        }
        this.toggleDeleteAllFilterButton();
    }

    protected toggleDeleteAllFilterButton() {
        let isSupplierListNotEmpty = this.isNonEmptyArray(this.listSuppliersChecked);
        let isProductAttributeNotEmpty = this.isNonEmptyArray(this.listProductAttributesChecked);
        let isSalesListCheckedNotEmpty = this.isNonEmptyArray(this.listSalesChecked);
        let isCountryOriginCheckedNotEmpty = this.isNonEmptyArray(this.listCountryOriginChecked);
        let isWineQualityCheckedNotEmpty = this.isNonEmptyArray(this.listWineQualitiesChecked);

        if (isSupplierListNotEmpty || isProductAttributeNotEmpty || isSalesListCheckedNotEmpty || isCountryOriginCheckedNotEmpty || isWineQualityCheckedNotEmpty) {
            this.deleteAllFilter.classList.remove('is-hidden');
        } else {
            this.deleteAllFilter.classList.add('is-hidden');
        }
    }

    protected performDeleteFilterOperation(filterEnumeration, target) {
        this.filterEnumerationList = <HTMLElement>this.catalogTargetEnumeration.querySelectorAll(filterEnumeration)
        this.uncheckFilters(this.filterEnumerationList);

        switch (target) {
            case 'supplier':
                this.listSuppliersChecked = [];
                this.deleteFilterCategoryProductSupplier?.classList.add('is-hidden');
                break;
            case 'sales':
                this.listSalesChecked = [];
                this.deleteSalesProductCategory?.classList.add('is-hidden');
                break;
            case 'productAttributes':
                this.listProductAttributesChecked = [];
                this.deleteFilterCategoryProductAttribute?.classList.add('is-hidden');
                break;
            case 'countryOrigin':
                this.listCountryOriginChecked = [];
                this.deleteCountryOrigin?.classList.add('is-hidden');
                break;
            case 'wineQuality':
                this.listWineQualitiesChecked = [];
                this.deleteWineQuality?.classList.add('is-hidden');
                break;

            case 'delete-all':
                this.listSalesChecked = [];
                this.listSuppliersChecked = [];
                this.listProductAttributesChecked = [];
                this.listCountryOriginChecked = [];
                this.listWineQualitiesChecked = [];
                this.deleteFilterCategoryProductAttribute?.classList.add('is-hidden');
                this.deleteFilterCategoryProductSupplier?.classList.add('is-hidden');
                this.deleteCountryOrigin?.classList.add('is-hidden');
                this.deleteWineQuality?.classList.add('is-hidden');
                this.deleteSalesProductCategory?.classList.add('is-hidden');
                this.deleteAllFilter?.classList.add('is-hidden');
                break;
        }
        this.toggleDeleteAllFilterButton();
    }

    protected uncheckFilters(filterEnumerationList) {
        for (let i = 0; i < filterEnumerationList.length; i++) {
            let checkBoxes = filterEnumerationList[i].querySelectorAll('.checkbox__input');
            for(let i = 0; i < checkBoxes.length; i++) {
                checkBoxes[i].checked = false;
            }
        }
    }

    protected triggerFilterAction() {
        this.submitActionFilterButtonToTrigger.click();
    }

    protected isNonEmptyArray(arr) {
        return !!(Array.isArray(arr) && arr.length);
    }
}
