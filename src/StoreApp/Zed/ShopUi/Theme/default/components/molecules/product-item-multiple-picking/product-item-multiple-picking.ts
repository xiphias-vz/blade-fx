import Component from 'ShopUi/models/component';
import $ from 'jquery/dist/jquery';
import PickProductsMultiplePicking from '../pick-products-multiple-picking/pick-products-multiple-picking';

interface StorageItem {
    isAccepted: boolean;
    isNotFullyAccepted: boolean;
    isPaused: boolean;
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

export default class ProductItemMultiplePicking extends Component {
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
    protected pickProducts: PickProductsMultiplePicking;
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
    protected popupUiErrorInfo: object;
    protected currentItem: StorageItem;
    protected $containerScanConfirmation: HTMLInputElement;
    protected popupUiError: HTMLElement;
    eanScanInputElements:HTMLInputElement;
    eanScanInputElement: HTMLInputElement;
    listOfContainers: object[];
    listOfContainersInput: HTMLInputElement;
    alternativeEanElement: HTMLInputElement;
    orderItemStatus: HTMLInputElement;
    orderReference: string;
    eanDivWrapper: HTMLElement;
    eanInputFieldWrapper: HTMLElement;
    eanInputData: HTMLElement;
    closeButton: HTMLElement;
    pricePerKgData: HTMLElement;
    pickingItemPosition: HTMLElement;
    lastPositionDataFromDiv: HTMLElement;
    popUp: HTMLElement;
    btnSubmitPick: HTMLElement;
    bawContainerButton: HTMLElement;
    productBlockWrapper: HTMLElement;
    private weightMax: number;
    private weightMin: number;
    private lastWeight: number;

    protected readyCallback(): void {
    }

    protected init(): void {
        this.pickProducts = <PickProductsMultiplePicking>document.getElementsByTagName('pick-products-multiple-picking')[0];
        this.$minusButton = this.$this.find(this.minusButtonSelector);
        this.$plusButton = this.$this.find(this.plusButtonSelector);
        this.$acceptButton = this.$this.find(this.acceptButtonSelector);
        this.$declineButton = this.$this.find(this.declineButtonSelector);
        this.$pauseButton = this.$this.find(this.pauseButtonSelector);
        this.$quantityField = this.$this.find(this.quantityFieldSelector);
        this.$weightField = this.$this.find(this.weightInputFieldSelector);
        this.$quantityOutput = this.$this.find(this.quantityOutputSelector);
        this.eanDivWrapper = this.$this.find(this.eanScannenDivSelector);
        this.listOfContainersInput = <HTMLInputElement>this.querySelector('#listOfIdContainers');
        this.listOfContainers =  JSON.parse(this.listOfContainersInput.value);
        this.orderItemStatus = <HTMLInputElement>this.querySelector('#orderItemStatus');
        this.popupUiErrorInfo = {};
        this.orderReference = this.querySelector('#orderReference').value;
        this.eanInputFieldWrapper = <HTMLElement>document.querySelector(this.eanScannenInputSelector);
        this.popupUiError = this.querySelector('.popup-ui-error');
        this.closeButton = this.popupUiError.querySelector('.error-holder');
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

        this.$openModal = $('#idOpenModal').val();
        this.openModal(this.$openModal);

        this.removeTemporarilyReadOnlyAttributeForNonActiveFields();
        this.focusEanFieldWithoutDisplayOfKeyboard();
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
            $("#lastPickingPositionDialog").css("display", "block");
            document.querySelector("#lastPickingPositionDialog .popup-ui-container-scan").classList.add('popup-ui-container-scan--show');
        }
    }

    protected mapEvents(): void {
        this.$minusButton.on('click', () => this.clickCounterHandler());
        this.$plusButton.on('click', () => this.clickCounterHandler(true));
        this.closeButton.addEventListener('click', () => this.clearInputFields);
        this.btnSubmitPick.addEventListener('click', evt => this.onSubmitClick(evt));
        if(this.eanScanInputElement != undefined){
            this.eanScanInputElement.addEventListener('keypress', (event: KeyboardEvent) => this.formKeyPressHandler(event));
        }
        this.$acceptButton.on('click', () =>
        {
            if(document.querySelector("#gridOfTheProduct").classList.contains("paused--state")){
                document.querySelector("#gridOfTheProduct").classList.remove("paused--state");
            }

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

            if(document.querySelector("#gridOfTheProduct").classList.contains("paused--state")){
                document.querySelector("#gridOfTheProduct").classList.remove("paused--state");
            }

            if(!this.$declineButton.hasClass("button--undo")){
                $(".weightScanContainer").empty();
                this.containerData = [];
                this.weight = 0;
                this.$weightField.val("");
            }

            if (this.isAccepted || this.isDeclined || this.isNotFullyAccepted || this.isPaused) {
                this.revertView();
                this.eanScanInputElement.readOnly = true;
                this.eanScanInputElement.focus();
                setTimeout(() => {
                    this.eanScanInputElement.readOnly = false;
                }, 600)
                return;
            }

            else{
                this.$weightField.val("0");
            }

            this.declineClickHandler();
        });

        this.$pauseButton.on('click', () => {
            if(document.querySelector("#gridOfTheProduct").classList.contains("paused--state")){
                document.querySelector("#gridOfTheProduct").classList.remove("paused--state");
            }

            this.pauseClickHandler();
        });

        this.$weightField.on('change', () => {
            this.validateWeightInput();
            let weight = Number(this.$weightField.val());
            this.lastWeight = weight;
            let min = Number(this.$weightField.attr('min'));
            let max = Number(this.$weightField.attr('max'));

            if(weight < min || weight > max){
                this.$weightField.val("");
            }
        });
    }

    protected clearInputFields() {
        this.eanScanInputElement.value = '';
        this.eanScanInputElement.focus();
    }

    protected isWeightArticleInputFieldValid() {
        if(this.$weightField.length != 0) {
            let statusOfArticle = this.classList;

            if (statusOfArticle.contains(this.pickedCLass)) {
               if(Boolean(this.showErrorMessageForNotValidWeight()))
                   return false;
            }
            else if(statusOfArticle.contains((this.pickedNotFullyCLass))) {
                if(Boolean(this.showErrorMessageForNotValidWeight()))
                    return false;
            }
        }

        return true;
    }

    protected showErrorMessageForNotValidWeight() {
        if(this.$weightField[0].value == "" || this.$weightField[0].value == "0") {
            this.showPopUpErrorMessageForEmptyWeightField(this.$weightField)
            return true;
        }
    }

    protected onSubmitClick(event: MouseEvent) {
        document.querySelector("#btnSubmitPick").classList.add("button--disabled");
        let pickingPosition = this.pickingItemPosition;
        let quantity = this.$quantityOutput.text();
        let weight = 0;

        if(!Boolean(this.isWeightArticleInputFieldValid())) {
            return;
        }

        if(this.$weightField.val() != 0){
            weight = this.$weightField.val();
        }

        let isLastPosition = this.lastPositionDataFromDiv;
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

        let isAlreadyPicked = false;
        if(this.currentItem != undefined){
            if(this.currentItem.isAccepted === true || this.currentItem.isNotFullyAccepted === true){
                isAlreadyPicked = true;
            }
        }

        const urlSave = window.location.origin + "/picker/multi-picking/multi-order-picking";

        if(paused === true){
            this.setPausedStateForItem();
        }
        else if(declined === true || (accepted === true && isAlreadyPicked === true)){
            if(declined === true){
                $(".weightScanContainer").empty();
                this.containerData = [];
                this.weight = 0;
                this.$weightField.val("");
            }


            this.pickProducts.updateStorageItem(this, this.orderItemStatus);

            let saveAndGoToNext = "true";
            if(Boolean(isLastPosition) === true){
                saveAndGoToNext = "End";
            }
            this.pickProducts.update();
            let form = $('<form action="' + urlSave + '" method="post" style="visibility: hidden;">' +
                '<input type="text" name="saveAndGoToNext" value="' + saveAndGoToNext + '" />' +
                '<input type="text" name="position" value="' + pickingPosition + '" />' +
                '<input type="text" name="quantity" value="' + quantity + '" />' +
                '<input type="text" name="weight" value="' + weight + '" />' +
                '<input type="text" name="status" value="' + status + '" />' +
                '</form>');
            $('body').append(form);
            form.submit();
        }
        else{
            document.querySelector('.popup-ui-container-scan').classList.add('popup-ui-container-scan--show');

            this.$containerScanConfirmation = <HTMLInputElement>document.getElementById(this.containerScanConfirmation);
            this.$containerScanConfirmation.addEventListener('keypress', (event: KeyboardEvent) => this.containerScanConfirmationKeyHandler(event));
            this.$containerScanConfirmation.value = "";
            this.$containerScanConfirmation.readOnly = true;
            this.$containerScanConfirmation.focus();

            setTimeout(() => {
                this.$containerScanConfirmation.readOnly = false;
            }, 1000)
        }
    }

    protected setPausedStateForItem(): void {
        let urlPause = window.location.origin + "/picker/multi-picking/set-pause-state";
        const urlSave = window.location.origin + "/picker/multi-picking/multi-order-picking";

        let pickingPosition = this.pickingItemPosition;
        let quantity = this.$quantityOutput.text();
        let weight = 0;
        if(this.$weightField.val() != 0){
            weight = this.$weightField.val();
        }
        let status = "paused";
        let This = this;

        $.ajax({
            type : "POST",  //type of method
            url  : urlPause,  //your page
            data : {  },// passing the values
            success: function(res){
                // let parsedResponse = JSON.parse(res);
                let errorMsg = res.errorMessage;
                let lastPosition = res.isLastPosition;

                if(errorMsg != ""){
                    $(".container-desc").text(errorMsg);
                    document.querySelector('.popup-ui-error').classList.add('popup-ui-error--show');
                    return;
                }

                if(lastPosition === "true" || lastPosition === true){
                    $("#lastPickingPositionDialog").css("display", "block");
                    document.querySelector("#lastPickingPositionDialog .popup-ui-container-scan").classList.add('popup-ui-container-scan--show');
                }
                else {
                    let saveAndGoToNext = "true";
                    This.pickProducts.updateStorageItem(this, This.orderItemStatus);
                    This.pickProducts.update();
                    let form = $(`<form action=${urlSave} method="post" style="visibility: hidden">
                                       <input type="hidden" name="orderItemIsSetToPaused" value="true">
                                </form> `);
                    $('body').append(form);
                    form.submit();
                }

            }
        });
    }


    protected showPopUpErrorMessageForNonExistingContainer(containerNumber) {
        let popUpInfo = this.popupUiError.querySelector('.error-info');
        popUpInfo.innerHTML = `
            <p class="container-name">
               Container: ${containerNumber} existiert nicht.
            </p>
        `;
        this.popupUiError.classList.add('popup-ui-error--show');
    }

    protected showPopUpErrorMessageForEmptyWeightField(weightField) {
        let popUpInfo = this.popupUiError.querySelector('.error-info');
        let linkError = this.popupUiError.querySelector('.link--error');
        popUpInfo.innerHTML = `
            <p style="margin:40px">
               Bitte ein Gewicht angeben
            </p>
        `;
        this.popupUiError.classList.add('popup-ui-error--show');
        linkError.addEventListener("click", () => {
            this.btnSubmitPick.classList.remove("button--disabled");
            this.$weightField[0].readOnly = true;
            this.$weightField[0].focus();
            setTimeout(() => {
                this.$weightField[0].readOnly = false;
            }, 600)
        })
    }

    async updateItem(item: StorageItem): Promise<void> {
        await this.updateQuantityInput(item.count);
        let orderItemStatus = localStorage.getItem('orderItemStatus');
        this.currentItem = item;


        if(item.containerData.length > 0){
            item.containerData.forEach((value, index) => {
                this.initAddInfoBox(value);
                this.containerData = item.containerData;
            });

            if(this.currentWeight != NaN){
                this.weight = Number(item.weight);
                if(this.$weightField !== undefined) {
                    this.$weightField.val(Number(this.weight));
                }
            }
        }


        if (item.isAccepted || item.isNotFullyAccepted) {
            if(item.weight != NaN){
                this.weight = Number(item.weight);
                if(this.$weightField !== undefined) {
                    this.$weightField.val(Number(this.weight));
                }
            }

            this.acceptClickHandler();
        }

        if (item.isPaused) {
            this.$pauseButton.click();
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
            '</div>');
        elementToAdd.appendTo($(".weightScanContainer"));

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
        this.pickProducts.updateStorageItem(this, this.orderItemStatus);
        if(Number(this.currentQuantity) === Number(this.maxQuantity)){
            this.acceptClickHandler();
            this.pressSubmit();
        }
    }

    protected validateWeightInput(): boolean {

        let inputWeightValue = Number(this.$weightField.val());
        if(inputWeightValue == ""){
            inputWeightValue = Number(this.lastWeight);
        }
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
        this.pickProducts.updateStorageItem(this, this.orderItemStatus);
    }

    protected containerScanConfirmationKeyHandler(event: KeyboardEvent): void {
        if (event.key == 'Enter') {
            event.preventDefault();

            let inputContainerID = this.$containerScanConfirmation.value;
            const $formattedContainerInput = inputContainerID.replace('/x11', '').replace('/X11', '');

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

            let containerExists = this.containerExists($formattedContainerInput, this.orderReference)

            if(!containerExists) {

                let saveAndGoToNext = "true";
                const urlSave = window.location.origin + "/picker/multi-picking/multi-order-picking";

                if(this.lastPositionDataFromDiv == true){
                    // Show popup last position
                    saveAndGoToNext = "End";
                }
                this.pickProducts.updateStorageItem(this, this.orderItemStatus);

                let form = $('<form action="' + urlSave + '" method="post" style="visibility: hidden">' +
                    '<input type="text" name="saveAndGoToNext" value="' + saveAndGoToNext + '" />' +
                    '<input type="text" name="position" value="' + pickingPosition + '" />' +
                    '<input type="text" name="quantity" value="' + quantity + '" />' +
                    '<input type="text" name="weight" value="' + weight + '" />' +
                    '<input type="text" name="status" value="' + status + '" />' +
                    '</form>');
                $('body').append(form);
                form.submit();
            }

        }
    }

    protected containerExists(containerNumber, orderReferenceNumber): boolean {
        let containerExists = true;
        for(let i = 0; i < this.listOfContainers.length; i++) {
            let currentContainer = this.listOfContainers[i];
            if(currentContainer.ContainerCode == containerNumber && currentContainer.orderReference == orderReferenceNumber) {
                containerExists = false;
                return containerExists;
            }else if(currentContainer.ContainerCode == containerNumber && currentContainer.orderReference != orderReferenceNumber) {
                containerExists = true;
                this.popupUiErrorInfo.ContainerCode = currentContainer.ContainerCode;
                this.popupUiErrorInfo.orderReference = currentContainer.orderReference;
                this.popupUiErrorInfo.firstName = currentContainer.firstName;
                this.popupUiErrorInfo.lastName = currentContainer.lastName;
                this.showPopUpErrorMessage();
                return containerExists;
            }
        }
        this.showPopUpErrorMessageForNonExistingContainer(containerNumber);
        containerExists = true;
        return containerExists;
    }

    protected showPopUpErrorMessage() {
        let popUpInfo = this.popupUiError.querySelector('.error-info');
        popUpInfo.innerHTML = `
            <p class="container-name">
                Container: <span>${this.popupUiErrorInfo.ContainerCode}</span><br>
                 <span class="container-desc">ist bereits für Kunde ${this.popupUiErrorInfo.firstName} ${this.popupUiErrorInfo.lastName} </span><br>
                 <span class="container-order">Bestellung: ${this.popupUiErrorInfo.orderReference} aktiviert</span>
            </p>
        `;
        this.popupUiError.classList.add('popup-ui-error--show');
    }

    protected showPopUpErrorMessageForWrongEan() {
        let popUpInfo = this.popupUiError.querySelector('.error-info');
        popUpInfo.innerHTML = `<p class="falsche-ean">Falsche EAN</p>`;
        this.popupUiError.classList.add('popup-ui-error--show');
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
                        this.showPopUpErrorMessageForWrongEan();
                        this.focusEanFieldWithoutDisplayOfKeyboard();
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
                            this.showPopUpErrorMessageForWrongEan();
                            this.focusEanFieldWithoutDisplayOfKeyboard();
                        }
                    }
                }
            }

            if(Number(this.currentQuantity) === Number(this.maxQuantity)){
                this.acceptClickHandler();
            }

        }
    }

    protected focusEanFieldWithoutDisplayOfKeyboard() {
        this.eanScanInputElement.value = "";
        this.eanScanInputElement.readOnly = true;
        this.eanScanInputElement.focus();

        setTimeout(() => {
            this.eanScanInputElement.readOnly = false;
        }, 1000)
    }

    protected step20(quantityElement, scannedBarcodeValue, calculatedWeight: number, valueOfWeightElement: number): void {
        const sku = this.dataset.sku;
        let id = "barcodeAndWeightContainer_" + sku + '_' + this.barcodeAndWeightContainer;
        let elementToAdd = $(  '<div id="' + id + '" class="barcodeAndWeightContainer">' +
            '<div class="col--md-8 float-left">' +
            '<div><span>Barcode: <span class="scannedBarcode_' + this.barcodeAndWeightContainer + '">' + scannedBarcodeValue + '</span></span></div>' +
            '<div><span>Weight: <span class="weight_' + this.barcodeAndWeightContainer + '">' + Math.round(calculatedWeight) + '</span></span></div>' +
            '</div>' +
            '</div>');
        elementToAdd.appendTo($(".weightScanContainer"));

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
            this.pressSubmit();
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

        let eanSpan = this.$this.find('.product-item-multiple-picking__toBold');
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

      this.focusEanFieldWithoutDisplayOfKeyboard();
    }

    protected updateQuantityInput(value: number): void {
        this.currentValue = value;
        this.$this.find(this.quantityFieldSelector).val(value);
        this.$this.find(this.quantityOutputSelector).html(value);
    }

    protected pressSubmit(): void{
        this.btnSubmitPick.click();
    }

    protected acceptClickHandler(): void {
        this.$weightField.removeAttr('required');
        const $selForWeightElementVal = Number(this.$this.find(".js-product-item-multiple-picking__weight").val());
        let elementForFocus: HTMLInputElement = null;
        if (Number(this.currentValue) === 0) {
            this.updateQuantityInput(this.maxQuantity);
        }
        this.isAccepted = Number(this.currentValue) > 0;
        if ((Number(this.currentValue) === Number(this.maxQuantity)) || $selForWeightElementVal > 0) {
            this.$this.addClass(this.pickedCLass);
            this.$this[0].$declineButton.addClass(this.addUndoCLass);

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
    }

    protected declineClickHandler(): void {
        this.$weightField.removeAttr('required');
        this.$weightField.val("0");
        this.isDeclined = true;
        this.updateQuantityInput(0);
        this.$this.addClass(this.notPickedCLass);
        this.$this[0].$declineButton.addClass(this.addUndoCLass);

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
        this.$weightField.removeAttr('required');

        this.$this.addClass(this.pausedClass);
        this.$this[0].$declineButton.addClass(this.addUndoCLass);
        this.isPaused = true;
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
    }

    protected isValueInRange(inputValue: number): boolean {
        return inputValue <= this.maxQuantity && inputValue >= 0;
    }

    protected focusFirstEanField(): void
    {
        this.eanScanInputElement.focus();
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

    protected get weightInputFieldSelector(): string {
        return `input[type="number"].js-product-item-multiple-picking__weight`;
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
        return String(this.$this.find(`div.product-item-multiple-picking__card`).attr('data-sku'));
    }
}
