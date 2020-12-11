import Component from 'ShopUi/models/component';

/**
 * TODO: move this logic for scanner to a separate molecule
 */
export default class ContainerToShelfForm extends Component {

    form: HTMLFormElement;

    protected barcodePrefix: string = '/x11';

    protected readyCallback(): void {
        this.form = <HTMLFormElement>this.getElementsByTagName('form')[0];

        this.form.addEventListener('keypress', (event: KeyboardEvent) => this.formKeyPressHandler(event));

        this.mapEventsForInputs();
    }

    protected mapEventsForInputs(): void {
        let formItems = <HTMLElement[]> Array.from(document.getElementsByTagName('input'));

        formItems.forEach((element: HTMLInputElement) => {
            element.addEventListener('input', (event: KeyboardEvent) => this.onFormItemChange(event));
        });
    }

    protected onFormItemChange(event: KeyboardEvent): void {
        let originalValue = (<HTMLInputElement>event.target).value;

        // force removing of barcode prefix
        (<HTMLInputElement>event.target).value = originalValue.replace(this.barcodePrefix, '');
    }

    protected formKeyPressHandler(event: KeyboardEvent): void {
        // Enter key forces the whole form to submit, we want to prevent that for barcode scanner
        if (event.key == 'Enter') {
            event.preventDefault();
        }
    }
}
