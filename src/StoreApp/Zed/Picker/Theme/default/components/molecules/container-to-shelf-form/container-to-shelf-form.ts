import Component from 'ShopUi/models/component';
import $ from 'jquery/dist/jquery';

/**
 * TODO: move this logic for scanner to a separate molecule
 */
export default class ContainerToShelfForm extends Component {

    fullForm: HTMLFormElement;
    addSubmitFormButton: HTMLButtonElement;
    containerId: HTMLInputElement;
    shelfId: HTMLInputElement;
    shelfCheck: HTMLInputElement;
    firstLetter: HTMLInputElement;
    containerIDNotEmpty: HTMLInputElement;
    shelfIDNotEmpty: HTMLInputElement;
    protected barcodePrefix: string = '/x11';

    protected readyCallback(): void {
        //this.form = <HTMLFormElement>this.getElementsByTagName('form')[0];
        this.popUpUiError = this.parentElement.previousElementSibling;
        this.addSubmitFormButton = <HTMLButtonElement>document.getElementById(`submitContainerToShelf`);
        this.fullForm = <HTMLFormElement>document.getElementById('container_to_shelf_form');
        this.firstLetter = <HTMLInputElement>document.querySelector('#first_letter');
        this.containerIDNotEmpty = <HTMLInputElement>document.querySelector('#containerID_not_empty');
        this.shelfIDNotEmpty = <HTMLInputElement>document.querySelector('#shelfID_not_empty');
        let isTestSucces = document.querySelector('.js-is-succes').getAttribute('isSuccess');
        if (isTestSucces) {
            this.clearInputFields();
        }

        this.containerId = <HTMLInputElement>document.getElementById('container_to_shelf_form_container_code');
        this.shelfId = <HTMLInputElement>document.getElementById('container_to_shelf_form_shelf_code');
        this.shelfCheck = <HTMLInputElement>document.getElementById('shelfCheck');
        this.fullForm.addEventListener('keypress', (event: KeyboardEvent) => this.formKeyPressHandler(event));
        this.mapEventsForButtons();
        this.mapEventsForInputs();

        let isTestUpdated = document.querySelector('.js-is-updated').getAttribute('isUpdated');
        if (isTestUpdated){
            this.focusShelfId();
        }
        else {
            this.focusFirstContainerID();
        }

    }

    protected clearInputFields() {
        let formItems = <HTMLElement[]> Array.from(document.getElementsByTagName('input'));

        formItems.forEach((element: HTMLInputElement) => {
            if (element.id != 'container_to_shelf_form__token'){
                element.value = "";
            }
        });
    }
    protected mapEventsForButtons(): void {
        this.addSubmitFormButton.addEventListener('click', () => this.onTriggerSubmitFormButtonClick());
    }
    protected mapEventsForInputs(): void {
        let formItems = <HTMLElement[]> Array.from(document.getElementsByTagName('input'));

        formItems.forEach((element: HTMLInputElement) => {
            element.addEventListener('input', (event: KeyboardEvent) => this.onFormItemChange(event));
            if (element.id == 'container_to_shelf_form_container_code'){
                element.addEventListener('focusout', (event: FocusEvent) => this.formFocusOutHandler(event));
            }
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

        if(replacedValue != "" && (<HTMLInputElement>event.target).id == 'container_to_shelf_form_shelf_code' && !regTest)
        {
            (<HTMLInputElement>event.target).value = "";
            alert(this.firstLetter.value);
        }

    }

    protected formKeyPressHandler(event: KeyboardEvent): void {
        // Enter key forces the whole form to submit, we want to prevent that for barcode scanner
        if (event.key == 'Enter') {
            event.preventDefault();

            this.focusShelfId();
            this.checkContainerId();
        }
    }

    protected formFocusOutHandler(event: FocusEvent): void {
        //event to trigger check Container Id code on focus out
        if (event.type == 'focusout' && event.currentTarget.id == 'container_to_shelf_form_container_code'){
            this.checkContainerId();
        }
    }

    protected checkContainerId(): void
    {
        let isMatchByOrder = [];
        const $searchFields = <$>$(document).find(this.searchItemsListSelector);
        const $inputValue = (<HTMLInputElement>document.getElementById('container_to_shelf_form_container_code')).value;
        if ($inputValue != "") {
            $searchFields.each((index: number, searchItem: HTMLElement) => {
                const $searchItem = $(searchItem);
                isMatchByOrder = $searchItem.data('listofcontainers');
            });
            let flag = 0;
            $.each(isMatchByOrder, function(i, val) {
                if (val['ContainerCode'] == $inputValue && $inputValue != "") {
                    flag = 1;
                    return;
                }
            });
            if (flag == 0) {
                this.popUpUiError.classList.add('popup-ui-error--show');
                this.clearInputFields();
            }
            if (flag == 0) {
                let element = document.getElementById('container_to_shelf_form_container_code');
                element.focus();
            } else {
                let element = document.getElementById('container_to_shelf_form_shelf_code');
                element.focus();
            }
        }
    }

    protected onTriggerSubmitFormButtonClick(): void {
        let containerId = this.containerId.value;
        let shelfId = this.shelfId.value;
        let shelfCheck = this.shelfCheck.value;
        //control for inputted values for containerId and ShelfId before submitting the form data
        if (containerId == '' || containerId == null)
        {
            this.popUpUiError.querySelector("#firstBlock").innerHTML = this.containerIDNotEmpty.value;
            this.popUpUiError.classList.add('popup-ui-error--show');
        }
        else if ((shelfId == '' || shelfId == null) && shelfCheck == 1)
        {
            this.popUpUiError.querySelector("#firstBlock").innerHTML = this.shelfIDNotEmpty.value;
            this.popUpUiError.classList.add('popup-ui-error--show');
        }
        else{
            this.fullForm.submit();
        }
    }

    protected focusFirstContainerID(): void
    {
        let element = document.getElementById('container_to_shelf_form_container_code');
        element.focus();
    }

    protected focusShelfId(): void {
        let element = document.getElementById('container_to_shelf_form_shelf_code');
        element.focus();
        element.inputMode = 'none';
        element.addEventListener('touchstart',  () => {
            element.inputMode = 'text';
        });
    }

    get getIsSuccess(): string {
        return `.${this.getAttribute('isSuccess')}`;
    }

    get searchItemsListSelector(): string {
        return `.${this.getAttribute('search-item-class')}`;
    }
}
