import Component from 'ShopUi/models/component';

export default class FormContainers extends Component {
    containerFormsWrapper: HTMLElement;
    addFormButton: HTMLButtonElement;
    formItemCandidate: string;
    formIndex: number;
    form: HTMLFormElement;

    protected barcodePrefix: string = '/x11';

    protected readyCallback(): void {
        this.containerFormsWrapper = <HTMLElement>document.getElementById('order_item_selection_form_field_sales_order_containers');
        this.addFormButton = <HTMLButtonElement>this.getElementsByClassName(`${this.jsName}__add-container`)[0];
        this.formItemCandidate = this.containerFormsWrapper.dataset.prototype;
        this.formIndex = 0;
        this.form = <HTMLFormElement>document.getElementsByClassName('js-submit-form-handler__form')[0];

        if (this.containerFormsWrapper.innerHTML === "") {
            this.addFormItem();
        }
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
        this.decorateAdditionalForm();
    }

    protected deleteFormItem(event: Event): void {
        const eventTarget = <HTMLElement>event.target;

        if (eventTarget.classList.contains(`${this.jsName}__delete`)) {
            eventTarget
                .closest(`.${this.jsName}__form-item`)
                .remove();
        }
    }

    protected addFormItem(): void {
        let formItem: string = this.formItemCandidate.replace(/__container_name__/g, String(this.formIndex));
        formItem = `<div class="${this.jsName}__form-item ${this.name}__form-item">${formItem}</div>`;
        this.containerFormsWrapper.insertAdjacentHTML('beforeend', formItem);
        this.formIndex += 1;
        this.containerFormsWrapper.dataset.index = String(this.formIndex);
    }

    protected mapEventsForItems(): void {
        let formItems = <HTMLElement[]> Array.from(document.getElementsByClassName(`${this.jsName}__form-item`));

        formItems.forEach((element: HTMLInputElement) => {
            element.addEventListener('input', (event: KeyboardEvent) => this.onFormItemChange(event));
        });
    }

    protected formKeyPressHandler(event: KeyboardEvent): void {
        // Enter key forces the whole form to submit, we want to prevent that for barcode scanner
        if (event.key == 'Enter') {
            event.preventDefault();
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
        const deleteButton:string = `<button type="button" class="${this.jsName}__delete button button--delete button--delete-bigger col"><svg class="icon button__icon"><use xlink:href="#:close"></use></svg></button>`;

        formLastItem.classList.add('input-with-remove');
        formLastItemWrapper.classList.add('grid');
        formLastItemWrapper.classList.add('grid--justify');
        formLastItemWrapper.insertAdjacentHTML('beforeend', deleteButton);
    }
}
