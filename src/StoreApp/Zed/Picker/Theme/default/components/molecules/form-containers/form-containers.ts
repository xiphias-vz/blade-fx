import Component from 'ShopUi/models/component';
import $ from 'jquery/dist/jquery';

/**
 * TODO: move the logic for scanner to a separate molecule
 */
export default class FormContainers extends Component {
    containerFormsWrapper: HTMLElement;
    addFormButton: HTMLButtonElement;
    formItemCandidate: string;
    formIndex: number;
    form: HTMLFormElement;
    //public $popUpUiInfo: $;

    protected barcodePrefix: string = '/x11';

    protected readyCallback(): void {
        this.popUpUiError = <HTMLElement>document.getElementsByClassName('popup-ui-error')[0];
        this.popUpUiInfo = <HTMLElement>document.getElementsByClassName('popup-ui-info')[0];
        this.containerFormsWrapper = <HTMLElement>document.getElementById('order_item_selection_form_field_sales_order_containers');
        this.addFormButton = <HTMLButtonElement>this.getElementsByClassName(`${this.jsName}__add-container`)[0];
        this.formItemCandidate = this.containerFormsWrapper.dataset.prototype;
        this.formIndex = 0;
        this.form = <HTMLFormElement>document.getElementsByClassName('submit-form-handler')[0];

        if (this.containerFormsWrapper.innerHTML === "") {
            this.addFormItem();
        }


        this.focusFirstContainerInputElement();
        this.mapEvents();
        this.mapEventsForItems();
    }

    protected mapEvents(): void {
        this.addFormButton.addEventListener('click', () => this.onTriggerAddFormButtonClick());
        this.containerFormsWrapper.addEventListener('click', (event: Event) => this.deleteFormItem(event));
        this.form.addEventListener('keypress', (event: KeyboardEvent) => this.formKeyPressHandler(event));
    }

    protected onTriggerAddFormButtonClick(): void {
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

                //TODO:ADD EVENT
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
            event.preventDefault();
            let inputValue = (<HTMLInputElement>event.target).value;
            this.checkContainerId(inputValue);
        }
    }

    protected onFormItemChange(event: KeyboardEvent): void {
        let originalValue = (<HTMLInputElement>event.target).value;

        // force removing of barcode prefix
        (<HTMLInputElement>event.target).value = originalValue.replace(this.barcodePrefix, '');
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
    }

    protected checkContainerId(inputValue): void
    {
        let isMatchByOrder = [];
        const $searchFields = <$>$(document).find(this.searchItemsListSelector);
        //const $inputValue = (<HTMLInputElement>document.getElementById('container_to_shelf_form_container_code')).value;
        const $inputValue = inputValue;
        if ($inputValue != "") {
            $searchFields.each((index: number, searchItem: HTMLElement) => {
                const $searchItem = $(searchItem);
                isMatchByOrder = $searchItem.data('listofusedcontainers');
            });
            let flag = 0;
            let valueFirstBlock = "";
            let valueSecondBlock = "";
            $.each(isMatchByOrder, function(i, val) {
                if (val['ContainerCode'] == $inputValue && $inputValue != "") {
                    valueFirstBlock = val['ContainerCode'];
                    valueSecondBlock = val['ShelfCode'];
                    flag = 1;
                    return;
                }
            });
             if (flag == 1) {
                 this.popUpUiInfo.querySelector("#firstBlock").innerHTML = `Container: <strong>${ valueFirstBlock }</strong>`;
                 this.popUpUiInfo.querySelector("#secondBlock").innerHTML = `Lagerplatz: <strong>${ valueSecondBlock }</strong>`;
                 this.popUpUiInfo.classList.add('popup-ui-info--show');
                 setTimeout(() => {
                     this.popUpUiInfo.classList.remove('popup-ui-info--show');
                 }, 5000)
             }
             else {
                 this.onTriggerAddFormButtonClick();
             }

            // if (flag == 0) {
            //
            //     this.popUpUiError.querySelector("#firstBlock").innerHTML = `Container: 25011054`;
            //     this.popUpUiError.querySelector("#secondBlock").innerHTML = `Bereits Für Kunde Mihael Blažek <br> Bestellung: 654987 genutzt`;
            //     this.popUpUiError.classList.add('popup-ui-error--show');
            //
            //     let element = document.getElementById('container_to_shelf_form_container_code');
            //     element.focus();
            // } else {
            //     let element = document.getElementById('container_to_shelf_form_shelf_code');
            //     element.focus();
            // }
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
