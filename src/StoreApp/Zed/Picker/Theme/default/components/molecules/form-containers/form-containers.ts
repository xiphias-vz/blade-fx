import Component from 'ShopUi/models/component';
import $ from 'jquery/dist/jquery';

/**
 * TODO: move the logic for scanner to a separate molecule
 */
export default class FormContainers extends Component {
    containerFormsWrapper: HTMLElement;
    addFormButton: HTMLButtonElement;
    closeButtonError: HTMLButtonElement;
    submitButtonContainers: HTMLButtonElement;
    formItemCandidate: string;
    formIndex: number;
    form: HTMLFormElement;
    fullForm: HTMLFormElement;
    orderId: HTMLInputElement;
    containerCountData: string;
    containerCount: number;
    countInputedContainers: number = 0;
    countSigns: number = 0;
    inputPress: number = 0;
    protected barcodePrefix: string = '/x11';
    protected savedInputValue: string = "";
    protected savedInputId: string = "";

    protected readyCallback(): void {
        this.popUpUiError = <HTMLElement>document.getElementsByClassName('popup-ui-error')[0];
        this.popUpUiInfo = <HTMLElement>document.getElementsByClassName('popup-ui-info')[0];
        this.orderId = <HTMLInputElement>document.getElementById('idOrder');
        this.containerFormsWrapper = <HTMLElement>document.getElementById('order_item_selection_form_field_sales_order_containers');
        this.addFormButton = <HTMLButtonElement>this.getElementsByClassName(`${this.jsName}__add-container`)[0];
        this.closeButtonError = <HTMLButtonElement>this.getElementsByClassName(`js-popup-ui-error__close`)[0];
        this.formItemCandidate = this.containerFormsWrapper.dataset.prototype;
        this.formIndex = 0;
        this.fullForm = <HTMLFormElement>document.getElementById('containersSelectForm');
        this.form = <HTMLFormElement>document.getElementsByClassName('submit-form-handler')[0];
        this.containerCountData = document.querySelector('.js-container-count');
        this.containerCount = this.containerCountData.dataset.containerCount;
        this.submitButtonContainers = <HTMLButtonElement>document.getElementById('submitSelectedContainers');

        if (this.containerFormsWrapper.innerHTML === "") {
            this.addFormItem();
        }

        this.focusFirstContainerInputElement();
        this.mapEvents();
        this.mapEventsForItems();
    }

    protected mapEvents(): void {
        this.addFormButton.addEventListener('click', () => this.onTriggerAddFormButtonClick());
        this.closeButtonError.addEventListener('click', () => this.onTriggerSetFocusErrorButtonClick());
        this.submitButtonContainers.addEventListener('click', () => this.onTriggerSubmitButtonClick());
        this.containerFormsWrapper.addEventListener('click', (event: Event) => this.deleteFormItem(event));
        this.form.addEventListener('keypress', (event: KeyboardEvent) => this.formKeyPressHandler(event));
    }

    protected onTriggerAddFormButtonClick(): void {
        this.inputPress = 3;
        if (this.savedInputValue != ""){
            this.checkContainerId(this.savedInputValue, this.savedInputId, this.inputPress)
        }
    }

    protected onTriggerSetFocusErrorButtonClick(): void {
        if (this.savedInputId != "")
        {
        let element = document.getElementById(this.savedInputId);
        element.focus();
        }
    }

    protected onTriggerSubmitButtonClick(): void {
        this.inputPress = 2;
        this.countSigns = this.savedInputValue.length;
        if (this.countSigns == 8)
        {
            this.checkContainerId(this.savedInputValue, this.savedInputId, this.inputPress);
        }
        else if (this.countSigns == 0 && (this.containerCount > 0 || this.countInputedContainers > 0 ))
        {
            this.fullForm.submit();
        }
        else
        {
            this.popUpUiError.querySelector("#firstBlock").innerHTML = `Container-ID muss eingestellt werden und 8 Zeichen haben`;
            this.popUpUiError.querySelector("#secondBlock").innerHTML = ``;
            this.popUpUiError.classList.add('popup-ui-error--show');
        }
    }

    protected addNewContainerForm(): void {
        this.savedInputValue = "";
        this.savedInputId = "";
        this.addFormItem();
        this.mapEventsForItems();
    }

    protected deleteFormItem(event: Event): void {
        const eventTarget = <HTMLElement>event.target;

        if (eventTarget.classList.contains(`${this.jsName}__delete`)) {
            eventTarget
                .closest(`.${this.jsName}__form-item`)
                .remove();
        }
        else if(eventTarget.classList.contains(`${this.jsName}__add`)) {
            eventTarget
                .closest(`.${this.jsName}__form-item`);
                this.onTriggerAddFormButtonClick();
        }
    }

    protected addFormItem(): void {
        let formItem: string = this.formItemCandidate.replace(/__container_name__/g, String(this.formIndex));
        formItem = `<div class="${this.jsName}__form-item ${this.name}__form-item">${formItem}</div>`;

        this.containerFormsWrapper.insertAdjacentHTML('beforeend', formItem);
        this.formIndex += 1;
        this.containerFormsWrapper.dataset.index = String(this.formIndex);
        this.decorateAdditionalForm();
    }

    protected mapEventsForItems(): void {
        let formItems = <HTMLElement[]> Array.from(document.getElementsByClassName(`${this.jsName}__form-item`));

        formItems.forEach((element: HTMLInputElement) => {
            element.addEventListener('input', (event: KeyboardEvent) => this.onFormItemChange(event));
            element.addEventListener('keypress', (event: KeyboardEvent) => this.formKeyPressHandler(event));
        });
    }

    protected formKeyPressHandler(event: KeyboardEvent): void {
        // Enter key forces the whole form to submit, we want to prevent that for barcode scanner
        if (event.key == 'Enter') {
            this.inputPress = 1;
            event.preventDefault();
            let inputValue = (<HTMLInputElement>event.target).value;
            let inputId = (<HTMLInputElement>event.target).id;
            this.checkContainerId(inputValue, inputId, this.inputPress);
        }
    }

    protected onFormItemChange(event: KeyboardEvent): void {
        let originalValue = (<HTMLInputElement>event.target).value;

        // force removing of barcode prefix
        (<HTMLInputElement>event.target).value = originalValue.replace(this.barcodePrefix, '');
        this.savedInputValue = originalValue;
        this.savedInputId = (<HTMLInputElement>event.target).id;
    }

    protected decorateAdditionalForm(): void {
        const formItems = <HTMLInputElement[]>Array.from(this.containerFormsWrapper.getElementsByTagName('input'));
        const formLastItem = <HTMLInputElement>formItems[formItems.length - 1];
        const formLastItemWrapper = <HTMLElement>formLastItem.closest('div');
        const deleteButton:string = `<button type="button" class="${this.jsName}__delete button button--delete button--delete-bigger button--circle button--grey col"><svg class="icon button__icon"><use xlink:href="#:close"></use></svg></button>`;
        const plusButton:string =  `<button type="button"  class="${this.jsName}__add button button--delete-bigger button--circle col"><svg class="icon button__icon"><use xlink:href="#:add"></use></svg></button>`;

        formLastItem.classList.add('input-with-remove');
        formLastItemWrapper.classList.add('grid');
        formLastItemWrapper.classList.add('grid--justify');
        formLastItemWrapper.insertAdjacentHTML('beforeend', plusButton);
        formLastItemWrapper.insertAdjacentHTML('beforeend', deleteButton);
        formLastItem.focus();
    }

    protected containerIsOK(): void
    {
        const formItems = <HTMLInputElement[]>Array.from(this.containerFormsWrapper.getElementsByTagName('input'));
        const formLastItem = <HTMLInputElement>formItems[formItems.length - 1];
        const formLastItemWrapper = <HTMLElement>formLastItem.closest('div');
        const deleteButton:string = `<button type="button" class="${this.jsName}__delete button button--delete button--delete-bigger button--circle button--grey col"><svg class="icon button__icon"><use xlink:href="#:close"></use></svg></button>`;
        const checkButton:string =  `<button type="button"  class="${this.jsName}__check button button--delete-bigger button--circle col"><svg class="icon button__icon"><use xlink:href="#:check"></use></svg></button>`;

        formLastItem.classList.add('input-with-remove');
        formLastItemWrapper.classList.add('grid');
        formLastItemWrapper.classList.add('grid--justify');
        formLastItemWrapper.insertAdjacentHTML('beforeend', checkButton);
        formLastItemWrapper.insertAdjacentHTML('beforeend', deleteButton);
        formLastItem.focus();
    }

    protected checkContainerId(inputValue, inputId, inputPress): void
    {
        if (inputValue.length != 8)
        {
            this.popUpUiError.querySelector("#firstBlock").innerHTML = `Container-ID muss 8 Zeichen haben`;
            this.popUpUiError.querySelector("#secondBlock").innerHTML = ``;
            this.popUpUiError.classList.add('popup-ui-error--show');
        }
        else{
        let checkCurrentOrderId = this.orderId.value;
        let isMatchByOrder = [];
        const $searchFields = <$>$(document).find(this.searchItemsListSelector);
        const $inputValue = inputValue;
        if ($inputValue != "") {
            $searchFields.each((index: number, searchItem: HTMLElement) => {
                const $searchItem = $(searchItem);
                isMatchByOrder = $searchItem.data('listofusedcontainers');
            });
            let flag = 0;
            let valueFirstBlock = "";
            let valueSecondBlock = "";
            let valueSecondBlockOrderNumber = "";
            let valueContainerOnCustomer = "";
            $.each(isMatchByOrder, function(i, val) {
                if (val['ContainerCode'] == $inputValue && $inputValue != "" && val["FkSalesOrder"] != checkCurrentOrderId) {
                    valueFirstBlock = val['ContainerCode'];
                    valueSecondBlock = val['FkSalesOrder'];
                    valueContainerOnCustomer = "";
                    flag = 1;
                    return;
                }
                else if (val['ContainerCode'] == $inputValue && $inputValue != "" && val["FkSalesOrder"] == checkCurrentOrderId) {
                    valueFirstBlock = val['ContainerCode'];
                    valueSecondBlock = val['ShelfCode'];
                    valueSecondBlockOrderNumber = val['FkSalesOrder'];
                    flag = 2;
                    return;
                }
            });
             if (flag == 1) {
                 document.getElementById(inputId).value = "";
                 this.popUpUiError.querySelector("#firstBlock").innerHTML = `Container: <strong>${ valueFirstBlock }</strong>`;
                 this.popUpUiError.querySelector("#secondBlock").innerHTML = `Bereits Für Kunde <strong>${ valueContainerOnCustomer }</strong> <br> Bestellung: <strong>${ valueSecondBlock }</strong> genutzt`;
                 this.popUpUiError.classList.add('popup-ui-error--show');
             }
             else if (flag == 2){
                 document.getElementById(inputId).value = "";
                 this.popUpUiInfo.querySelector("#firstBlock").innerHTML = `Container: <strong>${ valueFirstBlock }</strong>`;
                 this.popUpUiInfo.querySelector("#secondBlock").innerHTML = `Lagerplatz: <strong>${ valueSecondBlock }</strong> <br> Bestellnummer: <strong>${ valueSecondBlockOrderNumber }</strong>`;
                 this.popUpUiInfo.classList.add('popup-ui-info--show');
                 setTimeout(() => {
                     this.popUpUiInfo.classList.remove('popup-ui-info--show');
                 }, 5000)
             }
             else {
                 if (this.countSigns == 8 && inputPress == 2)
                 {
                     this.fullForm.submit();
                 }
                 else {
                     this.countInputedContainers = this.countInputedContainers +1;
                     this.addNewContainerForm();
                 }
             }
        }
        }
    }

    protected focusFirstContainerInputElement(): void
    {
        let element = document.getElementById('order_item_selection_form_field_sales_order_containers_0_container_code');
        element.focus();
    }

    get searchItemsListSelector(): string {
        return `.${this.getAttribute('used-container-search-class')}`;
    }
}
