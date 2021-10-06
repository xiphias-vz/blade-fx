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
    private deleteAllFilter : HTMLElement;
    private filterEnumerationListForSupplier: HTMLElement;
    private filterEnumerationListForProductAttributes: HTMLElement;
    private listSuppliersChecked: Array<string>;
    private listProductAttributesChecked: Array<string>;
    private listSalesChecked: Array<string>;
    protected readyCallback(): void {
    }

    protected init() {
        this.filterSection = this.parentElement.parentElement.parentElement;
        this.catalogTargetEnumeration = this.parentElement;
        this.filterEnumerationList = <HTMLElement>this.catalogTargetEnumeration.querySelectorAll('.filter-enumeration');

        this.deleteFilterCategoryProductAttribute = <HTMLElement>this.catalogTargetEnumeration.querySelector('.delete-category-filter-product-attributes')
        this.deleteFilterCategoryProductSupplier = <HTMLElement>this.catalogTargetEnumeration.querySelector('.delete-category-filter-supplier');
        this.deleteSalesProductCategory = <HTMLElement>this.catalogTargetEnumeration.querySelector('.delete-category-filter-sales')
        this.deleteAllFilter = <HTMLElement>this.catalogTargetEnumeration.querySelector('.delete-all-filter')

        this.submitActionFilterButton = <HTMLElement>this.filterSection.querySelector('#submitFilterActionButton');
        this.submitActionFilterButtonToTrigger = <HTMLElement>this.filterSection.querySelector('#submitFilterActionButtonToTrigger .js-catalog__trigger');

        this.listSuppliersChecked = [];
        this.listProductAttributesChecked = [];
        this.listSalesChecked = [];

        this.checkIfAnyFilterIsSelectedAndDisplayDeleteFilterButtons();
        this.mapEvents();
    }

    protected mapEvents() {
        this.submitActionFilterButton.addEventListener('click', this.triggerFilterAction.bind(this));
        if(this.deleteFilterCategoryProductSupplier !== null) {
            this.deleteFilterCategoryProductSupplier.addEventListener('click', this.deleteFiltersForSupplier.bind(this));
        }
        if(this.deleteFilterCategoryProductAttribute !== null) {
            this.deleteFilterCategoryProductAttribute.addEventListener('click', this.deleteFiltersForProductAttributes.bind(this));
        }
        if(this.deleteSalesProductCategory !== null) {
            this.deleteSalesProductCategory.addEventListener('click', this.deleteSalesCategory.bind(this))
        }
        if(this.deleteAllFilter !== null) {
            this.deleteAllFilter.addEventListener('click', this.deleteAllFilters.bind(this));
        }
    }

    protected checkIfAnyFilterIsSelectedAndDisplayDeleteFilterButtons() {
        let countCategoryType = [];
        for(let i = 0; i < this.filterEnumerationList.length; i++) {
            let currentEnumeration = this.filterEnumerationList[i];
            let filterAttribute = this.filterEnumerationList[i].getAttribute('filter');
            let checkBoxes = currentEnumeration.querySelectorAll('.checkbox__input');
            let isAnyCheckboxChecked = this.checkIfAnyCheckboxIsChecked(checkBoxes);
            if(filterAttribute ==='supplier__filter' && isAnyCheckboxChecked) {
              this.deleteFilterCategoryProductSupplier?.classList.remove('is-hidden');
              if(!countCategoryType.includes('supplier')) {
                  countCategoryType.push('supplier');
              }
              this.listSuppliersChecked.push('checked');

            } else if ((filterAttribute === 'bio__filter'
                || filterAttribute === 'vegan__filter'
                || filterAttribute === 'laktosefrei__filter'
                || filterAttribute === 'glutenfrei__filter'
                || filterAttribute === 'vegetarisch__filter'
                || filterAttribute === 'fairtrade__filter')
                && isAnyCheckboxChecked === true

            ) {
                this.deleteFilterCategoryProductAttribute?.classList.remove('is-hidden');
                if(!countCategoryType.includes('productAttributes')) {
                    countCategoryType.push('productAttributes');
                }
                this.listProductAttributesChecked.push('checked');
            }

            else if (filterAttribute === 'label__filter' && isAnyCheckboxChecked === true){
                this.deleteSalesProductCategory.classList.remove('is-hidden');
                if(!countCategoryType.includes('label')) {
                    countCategoryType.push('label');
                }
                this.listSalesChecked.push('checked');
            }
            this.bindEventsInCheckBoxes(checkBoxes);
        }

        let isOneCategoryChecked = countCategoryType.length >= 1;
        if (isOneCategoryChecked) {
            this.deleteAllFilter.classList.remove('is-hidden');
        }
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

                } else {
                    this.listSuppliersChecked.pop();
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
                } else {
                    this.listProductAttributesChecked.pop();
                }
                break;

            case 'label':
                if (isChecked) {
                    this.listSalesChecked.push('checked');

                } else {
                    this.listSalesChecked.pop();
                }
        }

        this.removeDeleteFilterButtonIfListInCategoryIsEmpty();
        this.toggleDeleteAllFilterButton();
    }

    protected removeDeleteFilterButtonIfListInCategoryIsEmpty() {

        if (this.listSuppliersChecked.length === 0) {
            this.deleteFilterCategoryProductSupplier?.classList.add('is-hidden');
        } else {
            this.deleteFilterCategoryProductSupplier?.classList.remove('is-hidden');
        }
        if (this.listProductAttributesChecked.length === 0) {
            this.deleteFilterCategoryProductAttribute?.classList.add('is-hidden');
        } else {
            this.deleteFilterCategoryProductAttribute?.classList.remove('is-hidden');
        }
        if (this.listSalesChecked.length === 0) {
            this.deleteSalesProductCategory?.classList.add('is-hidden');
        } else {
            this.deleteSalesProductCategory?.classList.remove('is-hidden');
        }
    }

    protected toggleDeleteAllFilterButton() {
        let isSupplierListNotEmpty = this.isNonEmptyArray(this.listSuppliersChecked);
        let isProductAttributeNotEmpty = this.isNonEmptyArray(this.listProductAttributesChecked);
        let isSalesListCheckedNotEmpty = this.isNonEmptyArray(this.listSalesChecked);
        if (isSupplierListNotEmpty || isProductAttributeNotEmpty || isSalesListCheckedNotEmpty) {
            this.deleteAllFilter.classList.remove('is-hidden');
        } else {
            this.deleteAllFilter.classList.add('is-hidden');
        }
    }

    protected deleteFiltersForSupplier() {
        this.filterEnumerationListForSupplier = <HTMLElement>this.catalogTargetEnumeration.querySelectorAll(".filter-enumeration[filter=supplier__filter]");
        this.uncheckFilters(this.filterEnumerationListForSupplier);
        this.listSuppliersChecked = [];
        this.deleteFilterCategoryProductSupplier?.classList.add('is-hidden');
        this.deleteAllFilter.classList.add('is-hidden');
        this.toggleDeleteAllFilterButton();

    }

    protected deleteFiltersForProductAttributes() {
        this.filterEnumerationListForProductAttributes = <HTMLElement>this.catalogTargetEnumeration.querySelectorAll(".filter-enumeration:not([filter=supplier__filter]):not([filter=label__filter])");
        this.uncheckFilters(this.filterEnumerationListForProductAttributes);
        this.listProductAttributesChecked = [];
        this.deleteFilterCategoryProductAttribute?.classList.add('is-hidden');
        this.toggleDeleteAllFilterButton();
    }

    protected deleteSalesCategory() {
        this.filterEnumerationListForSupplier = <HTMLElement>this.catalogTargetEnumeration.querySelectorAll(".filter-enumeration[filter=label__filter]");
        this.uncheckFilters(this.filterEnumerationListForSupplier);
        this.listSalesChecked = [];
        this.deleteSalesProductCategory?.classList.add('is-hidden');
        this.toggleDeleteAllFilterButton();
    }

    protected deleteAllFilters() {
        this.filterEnumerationList = <HTMLElement>this.catalogTargetEnumeration.querySelectorAll(".filter-enumeration");
        this.uncheckFilters(this.filterEnumerationList);
        this.listProductAttributesChecked = [];
        this.listSuppliersChecked = [];
        this.listSalesChecked = [];
        this.toggleDeleteAllFilterButton();
        this.deleteFilterCategoryProductSupplier?.classList.add('is-hidden');
        this.deleteFilterCategoryProductAttribute?.classList.add('is-hidden');
        this.deleteSalesProductCategory?.classList.add('is-hidden');
    }

    protected uncheckFilters(filterEnumerationList) {
        for(let i = 0; i < filterEnumerationList.length; i++) {
            let checkBoxes = filterEnumerationList[i].querySelectorAll('.checkbox__input');
            for (let j = 0; j < checkBoxes.length; j++) {
                checkBoxes[j].checked = false;
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
