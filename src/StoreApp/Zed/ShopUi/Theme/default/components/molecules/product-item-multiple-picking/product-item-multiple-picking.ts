import Component from 'ShopUi/models/component';
import $ from 'jquery/dist/jquery';
import PickProducts from '../pick-products/pick-products';

interface StorageItem {
    isAccepted: boolean;
    isNotFullyAccepted: boolean;
    isDeclined: boolean;
    count: number;
    weight: number;
    showInfo: boolean;
    containerData: Array<BoxContainer>;
}

type ScanningBox = {
    id: number;
    scannedBarcode: number;
    scannedWeight: number;
    fullScannedId: string;
}

type BoxContainer = {
    [key:number]: ScanningBox;
}

export default class ProductItem extends Component {
    $this: $ = $(this);
    currentValue = 0;
    isAccepted = false;
    isNotFullyAccepted = false;
    isDeclined = false;
    isPaused = false;
    weight = 0;
    empty= '';
    showInfo = false;
    containerData = [];
    protected debounceDelay = 300;
    protected barcodeAndWeightContainer = 0;
    protected pickProducts: PickProducts;
    protected $minusButton: $;
    protected $plusButton: $;
    protected $acceptButton: $;
    protected $declineButton: $;
    protected $pauseButton: $;
    protected $quantityField: $;
    protected $quantityOutput: $;
    protected $weightField: $;
    protected $previousSku: $;
    protected $openModal: $;
    protected $containerScanConfirmation: $;
    protected popupUiError: HTMLElement;
    eanScanInputElements:HTMLInputElement;
    eanScanInputElement: HTMLInputElement;
    alternativeEanElement: HTMLInputElement;
    eanDivWrapper: HTMLElement;
    eanInputFieldWrapper: HTMLElement;
    eanInputData: HTMLElement;
    pricePerKgData: HTMLElement;
    pickingItemPosition: HTMLElement;
    lastPositionDataFromDiv: HTMLElement;
    popUp: HTMLElement;
    btnSubmitPick: HTMLElement;
    bawContainerButton: HTMLElement;
    productBlockWrapper: HTMLElement;
    private weightMax: number;
    private weightMin: number;

    protected readyCallback(): void {
    }

    protected init(): void {
        this.pickProducts = <PickProducts>document.getElementsByTagName('pick-products')[0];
        this.$minusButton = this.$this.find(this.minusButtonSelector);
        this.$plusButton = this.$this.find(this.plusButtonSelector);
        this.$acceptButton = this.$this.find(this.acceptButtonSelector);
        this.$declineButton = this.$this.find(this.declineButtonSelector);
        this.$pauseButton = this.$this.find(this.pauseButtonSelector);
        this.$quantityField = this.$this.find(this.quantityFieldSelector);
        this.$weightField = this.$this.find(this.weightInputFieldSelector);
        this.$quantityOutput = this.$this.find(this.quantityOutputSelector);
        this.eanDivWrapper = this.$this.find(this.eanScannenDivSelector);
        this.eanInputFieldWrapper = <HTMLElement>document.querySelector(this.eanScannenInputSelector);
        this.popupUiError = this.querySelector('.popup-ui-error');
        this.weightMax = Number(this.$weightField.attr('max'));
        this.weightMin = Number(this.$weightField.attr('min'));
        this.productBlockWrapper = <HTMLElement>document.getElementById('gridOfTheProduct');
        this.popUp = <HTMLElement>document.getElementsByClassName('popup-ui')[0];
        this.btnSubmitPick = <HTMLElement>document.querySelector('#btnSubmitPick');
        this.bawContainerButton = <HTMLElement>document.querySelector('.bawContainerButton');
        this.eanScanInputElements = <HTMLInputElement>document.querySelectorAll('.ean_scan_input');
        this.eanScanInputElement = <HTMLInputElement>this.$this.find('.ean_scan_input')[0];
        this.alternativeEanElement = <HTMLInputElement>this.$this.find('.alternativeEan')[0];
        this.eanInputData = $('.eanData').data('ean');
        this.pricePerKgData = $('.eanData').data('priceperkg');
        this.pickingItemPosition = $('#pickingItemPositionDiv').data('pickingitemposition');
        this.lastPositionDataFromDiv = $('#lastPositionDataDiv').data('lastpositiondata');
        this.mapEvents();
        this.boldLastThreeEanNumbers();
        this.$previousSku = $('#formPreviousSku').val();
        if(this.$previousSku == null || this.$previousSku == '')
        {
            this.focusFirstEanField();
        }

        this.$openModal = $('#idOpenModal').val();
        this.openModal(this.$openModal);



        this.removeTemporarilyReadOnlyAttributeForNonActiveFields();

        if(this.$previousSku == this.dataset.sku)
        {
            const elements = <HTMLInputElement>document.getElementsByClassName('ean_scan_input');
            for (let i=0; i< elements.length; i++)
            {
                const elementsArray = elements[i].id.split('__');
                const skuElement = elementsArray[1];
                if(this.$previousSku == skuElement)
                {
                    const elementForFocus = <HTMLInputElement>elements[i];
                    elementForFocus.focus();
                    break;
                }
            }
        }
    }

    protected removeTemporarilyReadOnlyAttributeForNonActiveFields() {
        for(let i = 1; i < this.eanScanInputElements.length; i++) {
            this.eanScanInputElements[i].addEventListener('click', () => {
                this.eanScanInputElements[i].readOnly = false;
            })
            this.eanScanInputElements[i].addEventListener('touchstart', () => {
                this.eanScanInputElements[i].readOnly = false;
            })
        }
    }

    protected openModal(openModal?: $): void{
        if(openModal == "true"){
            document.querySelector("#lastPickingPositionDialog .popup-ui-container-scan").classList.add('popup-ui-container-scan--show');
        }
    }

    protected mapEvents(): void {
        this.$minusButton.on('click', () => this.clickCounterHandler());
        this.$plusButton.on('click', () => this.clickCounterHandler(true));
        this.btnSubmitPick.addEventListener('click', evt => this.onSubmitClick(evt));
        if(this.eanScanInputElement != undefined){
            this.eanScanInputElement.addEventListener('keypress', (event: KeyboardEvent) => this.formKeyPressHandler(event));
        }
        this.$acceptButton.on('click', () =>
        {
            if(this.pricePerKgData > 0) {
                if (!this.validateWeightInput())
                {
                    this.$weightField.focus();
                    return;
                }
            }
            this.acceptClickHandler();
        });

        this.$declineButton.on('click', () => {
            if (this.isAccepted || this.isDeclined || this.isNotFullyAccepted || this.isPaused) {
                this.revertView();

                return;
            }
            else{
                this.$weightField.focus();
            }

            this.declineClickHandler();
        });

        this.$pauseButton.on('click', () => {
            this.pauseClickHandler();
        });
    }

    protected onSubmitClick(event: MouseEvent) {

        let pickingPosition = this.pickingItemPosition;
        let quantity = this.$quantityOutput.text();
        let weight = 0;
        if(this.$weightField.val() != 0){
            weight = this.$weightField.val();
        }

        let accepted = this.isAccepted;
        let paused = this.isPaused;
        let declined = this.isDeclined;

        let status = "";
        if(accepted === true){
            status = "accepted"
        }
        else if(paused === true){
            status = "paused"
        }
        else if(declined === true){
            status = "declined"
        }

        let isLastPosition = this.lastPositionDataFromDiv;

        const urlSave = window.location.origin + "/picker/multi-picking/multi-order-picking";

        if(declined === true){
            if(Boolean(isLastPosition) === true){
                // Show popup last position
                $("#lastPickingPositionDialog").css("display", "block");
                document.querySelector("#lastPickingPositionDialog .popup-ui-container-scan").classList.add('popup-ui-container-scan--show');
            }
            else{
                let form = $('<form action="' + urlSave + '" method="post">' +
                    '<input type="text" name="saveAndGoToNext" value="true" />' +
                    '<input type="text" name="position" value="' + pickingPosition + '" />' +
                    '<input type="text" name="quantity" value="' + quantity + '" />' +
                    '<input type="text" name="weight" value="' + weight + '" />' +
                    '<input type="text" name="status" value="' + status + '" />' +
                    '</form>');
                $('body').append(form);
                form.submit();
            }
        }
        else{
            document.querySelector('.popup-ui-container-scan').classList.add('popup-ui-container-scan--show');

            this.$containerScanConfirmation = document.getElementById(this.containerScanConfirmation);
            this.$containerScanConfirmation.addEventListener('keypress', (event: KeyboardEvent) => this.containerScanConfirmationKeyHandler(event));
            this.$containerScanConfirmation.focus();
            this.$containerScanConfirmation.value = "";
        }
    }

    async updateItem(item: StorageItem): Promise<void> {
        await this.updateQuantityInput(item.count);

        if(item.containerData.length > 0){
            item.containerData.forEach((value, index) => {
                this.initAddInfoBox(value);
                this.containerData = item.containerData;
            });

            if(this.currentWeight != NaN){
                this.weight = Number(item.weight);
                this.$weightField.val(Number(this.weight));
            }
        }

        if (item.isAccepted || item.isNotFullyAccepted) {
            this.acceptClickHandler();
        }

        if (item.isDeclined) {
            this.declineClickHandler();
        }
    }

    protected initAddInfoBox(item: BoxContainer): void {

        let elementToAdd = $(  '<div id="' + item.fullScannedId + '" class="barcodeAndWeightContainer">' +
            '<div class="col--md-8 float-left">' +
            '<div><span>Barcode: <span class="scannedBarcode_' + item.id + '">' + item.scannedBarcode + '</span></span></div>' +
            '<div><span>Weight: <span class="weight_' + item.id + '">' + Math.round(item.scannedWeight) + '</span></span></div>' +
            '</div>' +
            '<div class="bawContainerRemove_' + item.id + ' col--md-3 float-right text-right"><button id="bawContainerButton_' + item.id + '" class="bawContainerButton" type="button">X</button></div>' +
            '</div>');
        elementToAdd.appendTo(this.$this.find(".product-item__info"));

        document.querySelector('#' + item.fullScannedId).addEventListener('click', evt => this.onRemoveContainerClick(evt, item.scannedWeight));
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
            this.weight = inputWeightValue;

            return true;
        }
    }

    protected setQuantityToValue(quantity): void {
        this.updateQuantityInput(quantity);
        this.pickProducts.updateStorageItem(this);
    }

    protected containerScanConfirmationKeyHandler(event: KeyboardEvent): void {
        if (event.key == 'Enter') {
            event.preventDefault();

            let inputContainerID = this.$containerScanConfirmation.value;
            let pickingPosition = this.pickingItemPosition;
            let quantity = this.$quantityOutput.text();
            let weight = 0;
            if(this.$weightField.val() != 0){
                weight = this.$weightField.val();
            }

            let accepted = this.isAccepted;
            let paused = this.isPaused;
            let declined = this.isDeclined;

            let status = "";
            if(accepted === true){
                status = "accepted"
            }
            else if(paused === true){
                status = "paused"
            }
            else if(declined === true){
                status = "declined"
            }

            const urlSave = window.location.origin + "/picker/multi-picking/multi-order-picking";
            const urlCheck = window.location.origin + "/picker/multi-picking/check-container-id";

            fetch(urlCheck,
                {
                    method: 'POST',
                    headers: {'Content-Type':'application/x-www-form-urlencoded'},
                    body: 'scannedContainerID=' + inputContainerID + '&' + 'position=' + pickingPosition
                    // body: JSON.stringify({scannedContainerID: inputContainerID, position: pickingPosition})

                })
                .then(response => response.json())
                .then(parsedResponse => {

                    let checkedContainerValid = parsedResponse.containerCheck;
                    let errorMsg = parsedResponse.errorMessage;
                    let lastPosition = parsedResponse.isLastPosition;

                    if(JSON.parse(checkedContainerValid) === true){
                        if(JSON.parse(lastPosition) === true){
                            // Show popup last position
                            $("#lastPickingPositionDialog").css("display", "block");
                            document.querySelector("#lastPickingPositionDialog .popup-ui-container-scan").classList.add('popup-ui-container-scan--show');
                        }
                        else{
                            let form = $('<form action="' + urlSave + '" method="post">' +
                                '<input type="text" name="saveAndGoToNext" value="true" />' +
                                '<input type="text" name="position" value="' + pickingPosition + '" />' +
                                '<input type="text" name="quantity" value="' + quantity + '" />' +
                                '<input type="text" name="weight" value="' + weight + '" />' +
                                '<input type="text" name="status" value="' + status + '" />' +
                                '</form>');
                            $('body').append(form);
                            form.submit();
                        }
                    }
                    else{
                        $(".container-desc").text(errorMsg);
                        this.popupUiError.classList.add('popup-ui-error--show');
                    }

                })
                .catch(error => {
                    console.error(error);

                });
        }
    }

    protected formKeyPressHandler(event: KeyboardEvent): void {
        // enter key forces the whole form to submit, we want to prevent that for barcode scanner

        if (event.key == 'Enter') {
            event.preventDefault();

            const eanScanInput = this.eanScanInputElement;
            let $inputValue = eanScanInput.value;
            const $formattedScanInput = $inputValue.replace('/x11', '').replace('/X11', '');

            const $eanPrefix = Number($formattedScanInput.substr(0,2));
            const $plu = $formattedScanInput.substr(2,4);  //Check with ean
            const $gewichtFromScan = $formattedScanInput.substr(7,5);

            const $ean = this.eanInputData;

            let $alernativeEan = this.alternativeEanElement.getAttribute('data-altean');
            let $altEansArr = $alernativeEan.toString().split(',');

            if($formattedScanInput.length != 13 && $formattedScanInput.length != 8){
                alert("Der Barcode sollte 13 oder 8 Zeichen lang sein");
            }
            else if ($formattedScanInput.length == 8)
            {
                if(Number($formattedScanInput) === Number($ean)){
                    this.step30();
                }
                else
                {
                    const inputHasAlternateEan = $altEansArr.some(function(v){ return v.indexOf($formattedScanInput) >= 0; });
                    if(inputHasAlternateEan){
                        this.step30();
                    }
                    else{
                        alert("Error");
                        this.eanScanInputElement.value = "";
                        this.eanScanInputElement.focus();
                    }
                }
            }
            else
            {

                const $selForWeightElement = this.$this.find(".js-product-item-multiple-picking__weight");
                let valueOfWeightElement = $selForWeightElement.val();

                const $selForQuantityElement = this.querySelector(".js-product-item-multiple-picking__quantity");
                let valueOfQuantityElement = $selForQuantityElement.value;

                let calculatedWeight = 0;

                if($eanPrefix <= 24 && $eanPrefix >= 21){
                    calculatedWeight = Math.round((Number($gewichtFromScan) / Number(this.pricePerKgData)) * 1000);
                }
                else if($eanPrefix <= 29 && $eanPrefix >= 25) {
                    calculatedWeight = Math.round(Number($gewichtFromScan));
                }
                if($eanPrefix <= 29 && $eanPrefix >= 21 && this.pricePerKgData > 0) {

                    if (Number(this.barcodeAndWeightContainer) === 0) {
                        $selForWeightElement.val(calculatedWeight);
                        this.step20($selForQuantityElement, $formattedScanInput, Number(calculatedWeight), calculatedWeight);
                    } else {
                        let val = Number(calculatedWeight) + Number(valueOfWeightElement);
                        if(val < 0) val = 0;
                        $selForWeightElement.val(val);
                        this.step20($selForQuantityElement, $formattedScanInput, Number(calculatedWeight), val);
                    }

                    this.setQuantityToValue(1);
                    return;
                }
                else
                {
                    if(Number($formattedScanInput) === Number($ean)){
                        this.step30();
                    }
                    else
                    {
                        const inputHasAlternateEan = $altEansArr.some(function(v){ return v.indexOf($formattedScanInput) >= 0; });
                        if(inputHasAlternateEan){
                            this.step30();
                        }
                        else{
                            alert("Error");
                            this.eanScanInputElement.value = "";
                            this.eanScanInputElement.focus();
                        }
                    }
                }
            }

            if(Number(this.currentQuantity) === Number(this.maxQuantity)){
                this.acceptClickHandler();
            }

        }
    }

    protected step20(quantityElement, scannedBarcodeValue, calculatedWeight: number, valueOfWeightElement: number): void {
        const sku = this.dataset.sku;
        let id = "barcodeAndWeightContainer_" + sku + '_' + this.barcodeAndWeightContainer;
        let elementToAdd = $(  '<div id="' + id + '" class="barcodeAndWeightContainer">' +
            '<div class="col--md-8 float-left">' +
            '<div><span>Barcode: <span class="scannedBarcode_' + this.barcodeAndWeightContainer + '">' + scannedBarcodeValue + '</span></span></div>' +
            '<div><span>Weight: <span class="weight_' + this.barcodeAndWeightContainer + '">' + Math.round(calculatedWeight) + '</span></span></div>' +
            '</div>' +
            '<div class="bawContainerRemove_' + this.barcodeAndWeightContainer + ' col--md-3 float-right text-right"><button id="bawContainerButton_' + this.barcodeAndWeightContainer + '" class="bawContainerButton" type="button">X</button></div>' +
            '</div>');
        elementToAdd.appendTo(this.$this.find(".product-item__info"));

        document.querySelector('#' + id).addEventListener('click', evt => this.onRemoveContainerClick(evt, calculatedWeight));

        this.barcodeAndWeightContainer++;
        this.showInfo = true;
        this.weight = this.currentWeight;
        let scanBox = {} as ScanningBox
        scanBox.fullScannedId = id;
        scanBox.id = this.barcodeAndWeightContainer;
        scanBox.scannedBarcode = scannedBarcodeValue;
        scanBox.scannedWeight = Math.round(calculatedWeight);
        this.containerData.push(scanBox);

        const inputWeightMax = Number(this.$weightField.attr('max'));
        const inputWeightMin = Number(this.$weightField.attr('min'));
        if(valueOfWeightElement > inputWeightMin && valueOfWeightElement < inputWeightMax) {
            this.acceptClickHandler();
        } else {
            this.step30();
        }
    }

    protected step30(): void {
        this.clickCounterHandler(true);
        const element = this.eanScanInputElement;
        element.value = "";
    }

    protected boldLastThreeEanNumbers(): void {

        let eanSpan = this.$this.find('.product-item__toBold');
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
        this.findAncestor(event.target, "barcodeAndWeightContainer").remove();
        this.barcodeAndWeightContainer--;

        let weightInput = this.$this.find(".js-product-item-multiple-picking__weight");
        let calculatedWeight = Math.round(Number(Number(weightInput.val()) - Number(valueOfWeightElement)));
        weightInput.val(calculatedWeight);

        var myArray = this.containerData;
        var index = myArray.findIndex(x => x.fullScannedId === event.currentTarget.id);

        if (index > -1){
            myArray.splice(index, 1);
            this.weight = calculatedWeight;
            this.pickProducts.update();
        }

        let hasInfoBoxes = $(".barcodeAndWeightContainer");
        if(hasInfoBoxes == null){
            this.showInfo = false;
        }

        this.eanScanInputElement.value = '';
        this.eanScanInputElement.focus();
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
        const $selForWeightElementVal = Number(this.$this.find(".js-product-item-multiple-picking__weight").val());
        let elementForFocus: HTMLInputElement = null;
        if (Number(this.currentValue) === 0) {
            this.updateQuantityInput(this.maxQuantity);
        }
        if ((Number(this.currentValue) === Number(this.maxQuantity)) || $selForWeightElementVal > 0) {
            this.isAccepted = true;
            this.$this.addClass(this.pickedCLass);
            this.$this[0].$declineButton.addClass(this.addUndoCLass);
            this.pickProducts.update();
            const elements = <HTMLInputElement>document.getElementsByClassName('ean_scan_input');
            const sku = this.dataset.sku;
            for (let i=0; i< elements.length; i++)
            {
                const elementsArray = elements[i].id.split('__');
                const skuElement = elementsArray[1];
                if(sku == skuElement)
                {
                    if(i!= (elements.length -1))
                    {
                        elementForFocus = <HTMLInputElement>document.getElementsByClassName('ean_scan_input')[i+1];
                        break;
                    }
                }
            }
            if(elementForFocus != null) {
                elementForFocus.focus();
                setTimeout(() => {
                    elementForFocus.readOnly = false;
                }, 1000)

            }
            return;
        }
        this.$this.addClass(this.pickedNotFullyCLass);
        this.$this[0].$declineButton.addClass(this.addUndoCLass);
        this.isNotFullyAccepted = true;
        this.pickProducts.update();
    }

    protected declineClickHandler(): void {
        this.$weightField.removeAttr('min');
        this.$weightField.removeAttr('max');
        this.$weightField.removeAttr('required');

        this.isDeclined = true;
        this.updateQuantityInput(0);
        this.$this.addClass(this.notPickedCLass);
        this.$this[0].$declineButton.addClass(this.addUndoCLass);
        this.pickProducts.update();

        let elementForFocus: HTMLInputElement = null;
        const elements = <HTMLInputElement>document.getElementsByClassName('ean_scan_input');
        const sku = this.dataset.sku;
        for (let i=0; i< elements.length; i++)
        {
            const elementsArray = elements[i].id.split('__');
            const skuElement = elementsArray[1];
            if(sku == skuElement)
            {
                if(i!= (elements.length -1))
                {
                    elementForFocus = <HTMLInputElement>document.getElementsByClassName('ean_scan_input')[i+1];
                    break;
                }
            }
        }
        if(elementForFocus != null) elementForFocus.focus();

    }

    protected pauseClickHandler(): void {
        this.$weightField.removeAttr('min');
        this.$weightField.removeAttr('max');
        this.$weightField.removeAttr('required');

        this.$this.addClass(this.pausedClass);
        this.$this[0].$declineButton.addClass(this.addUndoCLass);
        this.isPaused = true;
        this.pickProducts.update();
    }

    protected revertView(): void {

        this.$weightField.attr('min', this.weightMin);
        this.$weightField.attr('max', this.weightMax);
        this.$weightField.attr('required', 'required');

        this.isAccepted = false;
        this.isPaused = false;
        this.isDeclined = false;
        this.isNotFullyAccepted = false;

        this.$this.removeClass(`${this.notPickedCLass} ${this.pickedCLass} ${this.pickedNotFullyCLass} ${this.pausedClass}`);
        this.$this[0].$declineButton.removeClass(this.addUndoCLass);
        this.pickProducts.update();
    }

    protected isValueInRange(inputValue: number): boolean {
        return inputValue <= this.maxQuantity && inputValue >= 0;
    }

    protected focusFirstEanField(): void
    {
        const elements = document.querySelectorAll('.ean_scan_input');
        elements[0].focus();
        for(let i = 1; i < elements.length; i++) {
            elements[i].readOnly = true;
        }
    }

    protected findAncestor (el, cls) {
        while ((el = el.parentElement) && !el.classList.contains(cls));
        return el;
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

    protected get pauseButtonSelector(): string {
        return `.${this.jsName}__pause`;
    }

    protected get quantityFieldSelector(): string {
        return `input[type="number"].js-product-item-multiple-picking__quantity`;
    }

    protected get quantityOutputSelector(): string {
        return `.${this.jsName}__quantity-output`;
    }

    protected get eanScannenDivSelector(): string {
        return `#eanScannenDiv`;
    }

    protected get eanScannenInputSelector(): string {
        return `#txt_ean_scannen`;
    }

    protected get weightInputFieldSelector(): string {
        return `input[type="number"].js-product-item-multiple-picking__weight`;
    }

    protected get pickedCLass(): string {
        return `${this.name}--picked`;
    }

    protected get pickedNotFullyCLass(): string {
        return `${this.name}--picked-not-fully`;
    }

    protected get pausedClass(): string {
        return `${this.name}--paused`;
    }

    protected get notPickedCLass(): string {
        return `${this.name}--not-picked`;
    }

    protected get addUndoCLass(): string {
        return `button--undo`;
    }

    protected get containerScanConfirmation(): string {
        return `txt_container_scan`;
    }


    get maxQuantity(): number {
        return Number(this.$quantityField.prop('max'));
    }

    get currentQuantity(): number {
        return Number(this.$quantityField.val());
    }

    get currentWeight(): number {
        return Number(this.$weightField.val());
    }

    get sku(): string {
        return String(this.$this.find(`div.product-item__card`).attr('data-sku'));
    }
}
