import CustomerReorderFormCore from 'CustomerReorderWidget/components/molecules/customer-reorder-form/customer-reorder-form';

export default class CustomerReorderForm extends CustomerReorderFormCore {
    protected readonly triggers: HTMLElement[];

    constructor() {
        super();
        this.triggers = <HTMLElement[]>Array.from(this.getElementsByClassName(`${this.jsName}__trigger`));
    }

    enableTrigger(isEnabled: boolean): void {
        this.triggers.forEach((trigger: HTMLInputElement) => {
            trigger.disabled = !isEnabled;
        });
    }
}
