import Component from 'ShopUi/models/component';

export default class FormContainers extends Component {
    containerFormsWrapper: HTMLElement;
    addFormButton: HTMLButtonElement;
    formItemCandidate: string;
    formIndex: number;

    protected readyCallback(): void {
        this.containerFormsWrapper = <HTMLElement>document.getElementById('order_item_selection_form_field_sales_order_containers');
        this.addFormButton = <HTMLButtonElement>this.getElementsByClassName(`${this.jsName}__add-container`)[0];
        this.formItemCandidate = this.containerFormsWrapper.dataset.prototype;
        this.formIndex = 0;

        if (this.containerFormsWrapper.innerHTML === "") {
            this.addFormItem();
        }
        this.mapEvents();
    }

    protected mapEvents(): void {
        this.addFormButton.addEventListener('click', () => this.onTriggerClick());
        this.containerFormsWrapper.addEventListener('click', (event: Event) => this.deleteFormItem(event));
    }

    protected onTriggerClick(): void {
        this.addFormItem();
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
