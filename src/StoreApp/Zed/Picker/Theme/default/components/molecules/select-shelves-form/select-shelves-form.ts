import Component from 'ShopUi/models/component';
import $ from 'jquery/dist/jquery';

/**
 * TODO: move this logic for scanner to a separate molecule
 */
export default class SelectShelvesForm extends Component {

    form: HTMLFormElement;
    btn: HTMLButtonElement;
    firstLetter: HTMLInputElement;
    notAllFields: HTMLInputElement;

    protected barcodePrefix: string = '/x11';

    protected readyCallback(): void {
        this.form = <HTMLFormElement>this.getElementsByTagName('form')[0];
        this.btn = <HTMLButtonElement>this.getElementsByClassName('btn-saveShelf')[0];

        this.form.addEventListener('keypress', (event: KeyboardEvent) => this.formKeyPressHandler(event));
        this.btn.addEventListener('click', (event: MouseEvent) => this.submitButtonHandler(event));
        this.firstLetter = <HTMLInputElement>document.querySelector('#first_letter');
        this.notAllFields = <HTMLInputElement>document.querySelector('#not_all_fields');

        this.mapEventsForInputs();
        this.focusInputElement();
        this.removeLogout();
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
        if(!regTest)
        {
            (<HTMLInputElement>event.target).value = "";
            alert(this.firstLetter.value);
        }
    }

    protected formKeyPressHandler(event: KeyboardEvent): void {
        // Enter key forces the whole form to submit, we want to prevent that for barcode scanner
        if (event.key == 'Enter') {
            event.preventDefault();
        }
    }

    protected removeLogout(): void
    {
        let btnDiv = $('.header__logout')[0];
        btnDiv.remove();
    }

    protected submitButtonHandler(event: MouseEvent): void {
        let formItems = <HTMLElement[]> Array.from(document.getElementsByTagName('input'));
        let counter = 0;
        formItems.forEach((element: HTMLInputElement) => {
            if(element.value == ""){
                event.preventDefault();
                counter++;
            }
        });

        if(counter > 0){
            alert(this.notAllFields.value);
        }
    }

    protected focusInputElement(): void
    {
        let formItems = <HTMLElement[]> Array.from(document.getElementsByTagName('input'));

        for (let element of formItems) {
            if (element.id.startsWith('shelves_selection_form_field_container_code')){
                element.focus();
            }
        }
    }
}
