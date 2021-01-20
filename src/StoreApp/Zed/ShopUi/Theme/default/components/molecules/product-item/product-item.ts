import Component from 'ShopUi/models/component';
import $ from 'jquery/dist/jquery';
import PickProducts from '../pick-products/pick-products';

interface StorageItem {
    isAccepted: boolean;
    isNotFullyAccepted: boolean;
    isDeclined: boolean;
    count: number;
}

export default class ProductItem extends Component {
    $this: $ = $(this);
    currentValue = 0;
    isAccepted = false;
    isNotFullyAccepted = false;
    isDeclined = false;
    protected debounceDelay = 300;
    protected pickProducts: PickProducts;
    protected $minusButton: $;
    protected $plusButton: $;
    protected $acceptButton: $;
    protected $declineButton: $;
    protected $quantityField: $;
    protected $quantityOutput: $;
    protected $weightField: $;
    eanInputFieldWrapper: HTMLElement;
    popUp: HTMLElement;
    btnSubmitPick: HTMLElement;


    protected readyCallback(): void {
    }

    protected init(): void {
        this.pickProducts = <PickProducts>document.getElementsByTagName('pick-products')[0];
        this.$minusButton = this.$this.find(this.minusButtonSelector);
        this.$plusButton = this.$this.find(this.plusButtonSelector);
        this.$acceptButton = this.$this.find(this.acceptButtonSelector);
        this.$declineButton = this.$this.find(this.declineButtonSelector);
        this.$quantityField = this.$this.find(this.quantityFieldSelector);
        this.$weightField = this.$this.find(this.weightInputFieldSelector);
        this.$quantityOutput = this.$this.find(this.quantityOutputSelector);
        this.weightMax = Number(this.$weightField.attr('max'));
        this.weightMin = Number(this.$weightField.attr('min'));
        this.eanInputFieldWrapper = <HTMLElement>document.getElementById('eanScannenDiv');
        this.eanInputFieldWrapper.addEventListener('keypress', (event: KeyboardEvent) => this.formKeyPressHandler(event));
        this.popUp = <HTMLElement>document.getElementsByClassName('popup-ui')[0];
        this.btnSubmitPick = <HTMLElement>document.getElementById('btnSubmitPick');
        this.mapEvents();
        this.focusFirstEanField();
    }

    protected mapEvents(): void {
        let checkIfWeightCorrect = true;
        this.$weightField.on('focusout', () =>
        {
            checkIfWeightCorrect = this.validateWeightInput();
            if (!checkIfWeightCorrect) {
                this.$weightField.val(this.$weightField.attr('value'));
                this.$weightField.focus();
            }
        });
        this.$minusButton.on('click', () => this.clickCounterHandler());
        this.$plusButton.on('click', () => this.clickCounterHandler(true));
        this.$acceptButton.on('click', () =>
        {
            if (checkIfWeightCorrect) {
                this.acceptClickHandler();
            }
        });
        this.$declineButton.on('click', () => {
            if (this.isAccepted || this.isDeclined || this.isNotFullyAccepted) {
                this.revertView();

                return;
            }

            this.declineClickHandler();
        });
        this.btnSubmitPick.onclick = this._onSubmitClick;
    }
    _onSubmitClick(event: MouseEvent) {
        const items = Number((<HTMLInputElement>document.getElementsByName("itemsCount")[0]).value);
        const count = Number((<HTMLInputElement>document.getElementsByName("counter")[0]).value);
        if(items === count) {
            event.view.document.querySelector('popup-ui').classList.add('popup-ui--show');
        } else {
            event.view.document.forms['order_item_selection_form'].submit();
        }
    }

    async updateItem(item: StorageItem): Promise<void> {
        await this.updateQuantityInput(item.count);

        if (item.isAccepted || item.isNotFullyAccepted) {
            this.acceptClickHandler();
        }

        if (item.isDeclined) {
            this.declineClickHandler();
        }
    }

    protected clickCounterHandler(isPicked: boolean = false): void {
        let inputValue = Number(this.$quantityField.val());

        if (isPicked) {
            inputValue += 1;
        } else {
            inputValue -= 1;
        }

        if (!this.isValueInRange(inputValue)) {
            return;
        }

        this.updateQuantityInput(inputValue);
        this.pickProducts.updateStorageItem(this);
    }

    protected validateWeightInput(): boolean {
        const inputWeightValue = Number(this.$weightField.val());
        const inputWeightMax = Number(this.$weightField.attr('max'));
        const inputWeightMin = Number(this.$weightField.attr('min'));

        if (inputWeightValue > inputWeightMax) {
            alert(`Der Eingabewert sollte nicht größer als ${inputWeightMax} sein`);

            return false;
        }
        if (inputWeightValue < inputWeightMin) {
            alert(`Der Eingabewert sollte nicht kleiner als ${inputWeightMin} sein`);

            return false;
        }else {

            return true;
        }
    }

    protected formKeyPressHandler(event: KeyboardEvent): void {
        // enter key forces the whole form to submit, we want to prevent that for barcode scanner

        if (event.key == 'Enter') {
            event.preventDefault();
            const $inputValue = (<HTMLInputElement>document.getElementById('txt_ean_scannen')).value;
            const $eanPrefix = Number($inputValue.substr(0,2));

            const $pricePerKg = $('#ean').data('priceperkg');
            const $ean = $('#ean').data('ean');

            const $selForWeightElement = $(".js-product-item__weight");
            let valueOfWeightElement = $selForWeightElement.val();

            const $selForQuantityElement = $(".js-product-item__quantity");
            let valueOfQuantityElement = $selForQuantityElement.val();

            if(Number($inputValue) === $ean){
                this.step30();
            }
            else {
                    alert("Error");
                    const element = <HTMLInputElement>document.getElementById('txt_ean_scannen');
                    element.value = "";
                    this.focusFirstEanField();
            }

            if($eanPrefix <= 24 && $eanPrefix >= 21){
                let priceOfProduct = $inputValue.substr(7,4);
                let calculatedPrice = priceOfProduct / $pricePerKg;
                $(".js-product-item__weight").val(calculatedPrice);

                this.step20($selForQuantityElement, $inputValue, valueOfWeightElement, valueOfQuantityElement);
            }
            else if($eanPrefix <= 29 && $eanPrefix >= 25){
                let priceWeightOfProduct = $inputValue.substr(7,4);
                $selForWeightElement.val(valueOfWeightElement + priceWeightOfProduct);

                this.step20($selForQuantityElement, $inputValue, valueOfWeightElement, valueOfQuantityElement);
            }
            else{
                this.step30();
            }

        }
    }

    protected step20(quantityElement, scannedBarcodeValue, valueOfWeightElement, valueOfQuantityElement): void {
        this.step30();
    }

    protected step30(): void {
        this.clickCounterHandler(true);
        const element = <HTMLInputElement>document.getElementById('txt_ean_scannen');
        element.value = "";
        this.focusFirstEanField();
    }

    protected updateQuantityInput(value: number): void {
        this.currentValue = value;
        this.$quantityField.val(value);
        this.$quantityOutput.html(value);
    }

    protected acceptClickHandler(): void {

        this.$weightField.removeAttr('min');
        this.$weightField.removeAttr('max');
        this.$weightField.removeAttr('required');

        if (this.currentValue === 0) {
            this.updateQuantityInput(this.maxQuantity);
        }

        if (this.currentValue === this.maxQuantity) {
            this.isAccepted = true;

            this.$this.addClass(this.pickedCLass);

            this.pickProducts.update();

            return;
        }

        this.$this.addClass(this.pickedNotFullyCLass);
        this.isNotFullyAccepted = true;
        this.pickProducts.update();
    }

    protected declineClickHandler(): void {
        this.isDeclined = true;
        this.updateQuantityInput(0);
        this.$this.addClass(this.notPickedCLass);
        this.pickProducts.update();

        this.$weightField.removeAttr('min');
        this.$weightField.removeAttr('max');
        this.$weightField.removeAttr('required');

    }

    protected revertView(): void {

        this.$weightField.attr('min', this.weightMin);
        this.$weightField.attr('max', this.weightMax);
        this.$weightField.attr('required', "required");

        this.isAccepted = false;
        this.isDeclined = false;
        this.isNotFullyAccepted = false;

        this.$this.removeClass(`${this.notPickedCLass} ${this.pickedCLass} ${this.pickedNotFullyCLass}`);
        this.pickProducts.update();
    }

    protected isValueInRange(inputValue: number): boolean {
        return inputValue <= this.maxQuantity && inputValue >= 0;
    }

    protected focusFirstEanField(): void
    {
        const element = <HTMLInputElement>document.getElementById('txt_ean_scannen');
        element.focus();
    }

    protected get minusButtonSelector(): string {
        return `.${this.jsName}__minus`;
    }

    protected get plusButtonSelector(): string {
        return `.${this.jsName}__plus`;
    }

    protected get acceptButtonSelector(): string {
        return `.${this.jsName}__accept`;
    }

    protected get declineButtonSelector(): string {
        return `.${this.jsName}__decline`;
    }

    protected get quantityFieldSelector(): string {
        return `input[type="number"].js-product-item__quantity`;
    }

    protected get quantityOutputSelector(): string {
        return `.${this.jsName}__quantity-output`;
    }

    protected get weightInputFieldSelector(): string {
        return `input[type="number"].js-product-item__weight`;
    }

    protected get pickedCLass(): string {
        return `${this.name}--picked`;
    }

    protected get pickedNotFullyCLass(): string {
        return `${this.name}--picked-not-fully`;
    }

    protected get notPickedCLass(): string {
        return `${this.name}--not-picked`;
    }

    get maxQuantity(): number {
        return Number(this.$quantityField.prop('max'));
    }

    get sku(): string {
        return String(this.$this.find(`div.product-item__card`).attr('data-sku'));
    }
}
