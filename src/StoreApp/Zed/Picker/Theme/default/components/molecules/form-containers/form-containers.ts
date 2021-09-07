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
    addedContainersInputField: HTMLInputElement;
    addedContainers: [];
    formItemCandidate: string;
    formIndex: number;
    form: HTMLFormElement;
    fullForm: HTMLFormElement;
    orderId: HTMLInputElement;
    containerEighthCharactersSet: HTMLInputElement;
    containerEighthCharacters: HTMLInputElement;
    containerCountData: string;
    containerCount: number;
    countInputedContainers: number = 0;
    countSigns: number = 0;
    inputPress: number = 0;
    protected barcodePrefix: string = '/x11';
    protected savedInputValue: string = '';
    protected savedInputId: string = '';

    protected readyCallback(): void {
        this.popUpUiError = <HTMLElement>document.getElementsByClassName('popup-ui-error')[0];
        this.popUpUiInfo = <HTMLElement>document.getElementsByClassName('popup-ui-info')[0];
        this.addedContainers = [];
        this.addedContainersInputField = <HTMLInputElement>document.querySelector('input[name=addedContainers]');
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
        this.containerEighthCharactersSet = <HTMLInputElement>document.querySelector('#containerID_eighth_characters_set,');
        this.containerEighthCharacters = <HTMLInputElement>document.querySelector('#containerID_eighth_characters');

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
            this.validateAndAddNewContainerField(this.savedInputValue, this.savedInputId, this.inputPress)
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
            this.validateAndAddNewContainerField(this.savedInputValue, this.savedInputId, this.inputPress);
        }
        else if (this.countSigns == 0 && (this.containerCount > 0 || this.countInputedContainers > 0 ))
        {
            this.fullForm.submit();
        }
        else
        {
            this.popUpUiError.querySelector("#firstBlock").innerHTML = this.containerEighthCharactersSet.value;
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
            this.validateAndAddNewContainerField(inputValue, inputId, this.inputPress);
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

    protected validateAndAddNewContainerField(inputValue, inputId, inputPress): void
    {
        if (inputValue.length != 8)
        {
            this.popUpUiError.querySelector("#firstBlock").innerHTML = this.containerEighthCharacters.value;
            this.popUpUiError.querySelector("#secondBlock").innerHTML = ``;
            this.popUpUiError.classList.add('popup-ui-error--show');
        } else{
            if (inputValue !== '') {
                if (this.countSigns === 8 && inputPress === 2) {
                    this.fullForm.submit();

                }else {
                    this.countInputedContainers = this.countInputedContainers +1;
                    this.addedContainers.push(inputValue);
                    this.addedContainersInputField.value = JSON.stringify(this.addedContainers);
                    this.addNewContainerForm();
                }
            }
        }
    }

    protected focusFirstContainerInputElement(): void
    {
        const element = document.getElementById('order_item_selection_form_field_sales_order_containers_0_container_code');
        element.focus();
    }

    get searchItemsListSelector(): string {
        return `.${this.getAttribute('used-container-search-class')}`;
    }
}
