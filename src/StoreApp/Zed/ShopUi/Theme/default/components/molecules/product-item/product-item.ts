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
    protected barcodeAndWeightContainer = 0;
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
    bawContainerButton: HTMLElement;
    private weightMax: number;
    private weightMin: number;
    private $pricePerKg = 0;

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
        this.btnSubmitPick = <HTMLElement>document.querySelector('#btnSubmitPick');
        this.bawContainerButton = <HTMLElement>document.querySelector('.bawContainerButton');
        this.mapEvents();
        this.focusFirstEanField();
        this.boldLastThreeEanNumbers();
        this.$pricePerKg = $('#ean').data('priceperkg');
    }

    protected mapEvents(): void {

        this.$minusButton.on('click', () => this.clickCounterHandler());
        this.$plusButton.on('click', () => this.clickCounterHandler(true));
        this.$acceptButton.on('click', () =>
        {
            if(this.$pricePerKg > 0) {
                if (!this.validateWeightInput())
                {
                    this.$weightField.focus();
                    return;
                }
            }
            this.acceptClickHandler();
        });
        this.$declineButton.on('click', () => {
            if (this.isAccepted || this.isDeclined || this.isNotFullyAccepted) {
                this.revertView();

                return;
            }

            this.declineClickHandler();
        });
        this.btnSubmitPick.addEventListener('click', evt => this.onSubmitClick(evt));
    }

    protected onSubmitClick(event: MouseEvent) {
        const items = Number((<HTMLInputElement>document.getElementsByName('itemsCount')[0]).value);
        const count = Number((<HTMLInputElement>document.getElementsByName('counter')[0]).value);
        if (items === count) {
            const pickedElement = <HTMLElement>document.querySelector('.js-pick-products__picked.pop');
            const notPickedElement = <HTMLElement>document.querySelector('.js-pick-products__not-picked.pop');
            const containerCountElement = <HTMLElement>document.querySelector('.js-pick-products__bags.pop');
            const containerCount = (<HTMLInputElement>document.getElementsByName('containerCount')[0]).value;
            let pickedItemsCount = Number((<HTMLInputElement>document.getElementsByName('pickedItemsCount')[0]).value);
            let notPickedItemsCount = Number((<HTMLInputElement>document.getElementsByName('notPickedItemsCount')[0]).value);
            pickedItemsCount = pickedItemsCount + this.currentValue;
            notPickedItemsCount = notPickedItemsCount + this.maxQuantity - this.currentValue;
            pickedElement.innerText = (pickedItemsCount).toString();
            notPickedElement.innerText = (notPickedItemsCount).toString();
            containerCountElement.innerText = containerCount;
            document.querySelector('.popup-ui').classList.add('popup-ui--show');
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
            const $formattedScanInput = $inputValue.replace('/x11', '').replace('/X11', '');
            if($formattedScanInput.length != 13){
                alert("Der Barcode sollte 13 Zeichen lang sein");
            }
            else
            {
                const $eanPrefix = Number($formattedScanInput.substr(0,2));
                const $plu = $formattedScanInput.substr(2,4);  //Check with ean
                const $gewichtFromScan = $formattedScanInput.substr(7,5);

                const $pricePerKg = $('#ean').data('priceperkg');
                const $ean = $('#ean').data('ean');

                let $alernativeEan = $('#alternativeEan').data('altean');
                if  ($alernativeEan == null) {
                    $alernativeEan = '';
                }
                let $altEansArr = $alernativeEan.toString().split(',');
                if($alernativeEan === undefined){
                    $alernativeEan = [];
                }

                const $selForWeightElement = $(".js-product-item__weight");
                let valueOfWeightElement = $selForWeightElement.val();

                const $selForQuantityElement = $(".js-product-item__quantity");
                let valueOfQuantityElement = $selForQuantityElement.val();

                let calculatedWeight = 0;

                if($eanPrefix <= 24 && $eanPrefix >= 21){
                    calculatedWeight = Math.round((Number($gewichtFromScan) / Number($pricePerKg)) * 1000);
                }
                else if($eanPrefix <= 29 && $eanPrefix >= 25) {
                    calculatedWeight = Math.round(Number($gewichtFromScan));
                }
                if($eanPrefix <= 29 && $eanPrefix >= 21 && $pricePerKg > 0) {
                    if(this.barcodeAndWeightContainer < this.maxQuantity) {
                        if (Number(this.barcodeAndWeightContainer) === 0) {
                            $selForWeightElement.val(calculatedWeight);
                            this.step20($selForQuantityElement, $formattedScanInput, Number(calculatedWeight), valueOfQuantityElement);
                        } else {
                            let val = Number(calculatedWeight) + Number(valueOfWeightElement);
                            if(val < 0) val = 0;
                            $selForWeightElement.val(val);
                            this.step20($selForQuantityElement, $formattedScanInput, Number(calculatedWeight), valueOfQuantityElement);
                        }
                    } else {
                        alert("Zu viele Stücke!");
                        (<HTMLInputElement>document.getElementById('txt_ean_scannen')).value = '';
                        this.focusFirstEanField();
                    }
                }
                else
                {
                    if(Number($formattedScanInput) === $ean){
                        this.step30();
                    }
                    else
                    {
                        const inputHasAlternateEan = $altEansArr.some(function(v){ return v.indexOf($formattedScanInput) >= 0; });
                        if(inputHasAlternateEan){
                            this.step30();
                        }
                        else{
                            const element = <HTMLInputElement>document.getElementById('txt_ean_scannen');
                            alert("Error");
                            element.value = "";
                            this.focusFirstEanField();
                        }
                    }
                }
            }

        }
    }

    protected step20(quantityElement, scannedBarcodeValue, calculatedWeight, valueOfQuantityElement): void {
        let id = "barcodeAndWeightContainer_" + this.barcodeAndWeightContainer;
        $(  '<div id="' + id + '" class="barcodeAndWeightContainer">' +
            '<div class="col--md-8 float-left">' +
            '<div><span>Barcode: <span class="scannedBarcode_' + this.barcodeAndWeightContainer + '">' + scannedBarcodeValue + '</span></span></div>' +
            '<div><span>Weight: <span class="weight_' + this.barcodeAndWeightContainer + '">' + Math.round(calculatedWeight) + '</span></span></div>' +
            '</div>' +
            '<div class="bawContainerRemove_' + this.barcodeAndWeightContainer + ' col--md-3 float-right text-right"><button id="bawContainerButton_' + this.barcodeAndWeightContainer + '" class="bawContainerButton" type="button">X</button></div>' +
            '</div>').appendTo($(".product-item__info"));

        document.querySelector('#' + id).addEventListener('click', evt => this.onRemoveContainerClick(evt, calculatedWeight));

        this.barcodeAndWeightContainer++;
        this.step30();
    }

    protected step30(): void {
        this.clickCounterHandler(true);
        const element = <HTMLInputElement>document.getElementById('txt_ean_scannen');
        element.value = "";
        this.focusFirstEanField();
    }

    protected boldLastThreeEanNumbers(): void {

        let eanSpan = document.getElementsByClassName('product-item__ean');
        if(eanSpan.length > 0){
            let lastThreeDigits = 3;
            let html = eanSpan[0].innerHTML;
            eanSpan[0].innerHTML = html.substr(0, html.length-lastThreeDigits)
                    + "<span class='lastThreeDigits'>"
                    + eanSpan[0].innerHTML.substr(-lastThreeDigits)
                    + "</span>";
        }

    }

    protected onRemoveContainerClick(event: MouseEvent, valueOfWeightElement) {
            this.clickCounterHandler();
            document.getElementById(event.target.id).parentElement.parentElement.remove();
            this.barcodeAndWeightContainer--;
            $(".js-product-item__weight").val(Math.round(Number(Number($(".js-product-item__weight").val()) - Number(valueOfWeightElement))));

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
        this.$weightField.attr('required', 'required');

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

    get currentQuantity(): number {
        return Number(document.getElementsByClassName("js-product-item__quantity")[0].value);
    }

    get sku(): string {
        return String(this.$this.find(`div.product-item__card`).attr('data-sku'));
    }
}
