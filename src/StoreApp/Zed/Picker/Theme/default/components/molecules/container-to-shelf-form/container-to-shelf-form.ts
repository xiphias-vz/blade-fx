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
        this.focusFirstContainerID();
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
        let replacedValue = originalValue.replace(this.barcodePrefix, '');
        (<HTMLInputElement>event.target).value = replacedValue;

        //check if shelf Id starts with capital letter
        let firstChar = (replacedValue.charAt(0));
        let reg = new RegExp (/^[A-Z]+$/g);
        let regTest = reg.test(firstChar);

        if((<HTMLInputElement>event.target).id == 'container_to_shelf_form_shelf_code' && !regTest)
        {
            (<HTMLInputElement>event.target).value = "";
            alert('Der erste Buchstabe muss Großbuchstaben sein');
        }
    }

    protected formKeyPressHandler(event: KeyboardEvent): void {
        // Enter key forces the whole form to submit, we want to prevent that for barcode scanner
        if (event.key == 'Enter') {
            event.preventDefault();
        }
    }

    protected focusFirstContainerID(): void
    {
        let element = document.getElementById('container_to_shelf_form_container_code');
        element.focus();
    }
}
