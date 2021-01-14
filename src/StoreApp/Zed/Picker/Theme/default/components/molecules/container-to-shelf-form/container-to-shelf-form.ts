import Component from 'ShopUi/models/component';
import $ from 'jquery/dist/jquery';

/**
 * TODO: move this logic for scanner to a separate molecule
 */
export default class ContainerToShelfForm extends Component {

    form: HTMLFormElement;
    //protected $searchContanierList: $;
    protected barcodePrefix: string = '/x11';

    protected readyCallback(): void {
        this.form = <HTMLFormElement>this.getElementsByTagName('form')[0];

        this.form.addEventListener('keypress', (event: KeyboardEvent) => this.formKeyPressHandler(event));
        this.$isSuccess = this.querySelector('.box').getAttribute('isSuccess');

        if(this.$isSuccess == '1') {
            this.clearInputFields();
        }
        this.mapEventsForInputs();
        this.focusFirstContainerID();
    }

    // protected init(): void {
    //     this.$searchContanierList = <$>$(document).find(this.searchItemsListSelector);
    // }

    protected clearInputFields() {
        let formItems = <HTMLElement[]> Array.from(document.getElementsByTagName('input'));

        formItems.forEach((element: HTMLInputElement) => {
            element.value = "";
        });
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

            let isMatchByOrder = [];
            const $searchFields = <$>$(document).find(this.searchItemsListSelector)
            const $inputValue = (<HTMLInputElement>event.target).value;
            $searchFields.each((index: number, searchItem: HTMLElement) => {
                const $searchItem = $(searchItem);
                isMatchByOrder = $searchItem.data('listofcontainers');
            });
            let flag = 0;
            $.each(isMatchByOrder, function(i, val){
                if (val['ContainerCode'] ==  $inputValue)
                {
                    flag = 1;
                    return;
                }
            });
            if (flag == 0)
            {
                alert('Container ID nicht bekannt');
            }

            let element = document.getElementById('container_to_shelf_form_shelf_code');
            element.focus();
        }
    }

    protected focusFirstContainerID(): void
    {
        let element = document.getElementById('container_to_shelf_form_container_code');
        element.focus();
    }

    get searchItemsListSelector(): string {
        return `.${this.getAttribute('search-item-class')}`;
    }
}
