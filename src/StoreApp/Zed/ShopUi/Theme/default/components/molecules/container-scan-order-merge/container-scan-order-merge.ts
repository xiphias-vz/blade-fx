import Component from 'ShopUi/models/component';
import $ from 'jquery/dist/jquery';
import {array} from 'fast-glob/out/utils';

type containerTransfer = {
    orderReference: string;
    containers: Array<string>;
}

export default class ContainerScanOrderMerge extends Component {
    protected containerScanner: HTMLInputElement;
    protected mergingContainerScanner: HTMLInputElement;
    protected containerInput: HTMLInputElement;
    protected nextOrderPositionInput: HTMLInputElement;
    protected isContainerUsedInput: HTMLInputElement;
    protected confirmButtonForScannedContainers: HTMLButtonElement;
    protected listOfContainersHolder: HTMLElement;
    protected listContainersShelf: HTMLElement;
    protected binIconHolder: HTMLElement;
    protected popupUiError: HTMLElement;
    protected popupUiDeposit: HTMLElement;
    protected applicationUrl: URL;
    protected orderReferenceNumber: string;
    protected existingContainers: object[];
    protected numberOfAddedContainers: number;
    protected nextOrderPosition: number;
    protected containerTransfer: Array<containerTransfer>;
    protected popupUiErrorInfo: object;
    protected containerEighthCharactersSet: HTMLInputElement;
    protected pleaseScanContainer: HTMLInputElement;
    protected containerIsAlreadyUsed: HTMLInputElement;
    protected containerScanIsNotAllowed: HTMLInputElement;
    protected containerScanOrderErrorPopUp1: HTMLInputElement;
    protected containerScanOrderErrorPopUp2: HTMLInputElement;
    protected containerScanOrderErrorPopUp3: HTMLInputElement;
    protected containerScanOrderErrorPopUp4: HTMLInputElement;
    protected containerScanOrderErrorPopUp5: HTMLInputElement;
    protected continueUnpacking: HTMLButtonElement;
    protected confirmScanningContainers: HTMLInputElement;
    listOfContainers: object[];
    listOfContainersInput: HTMLInputElement;

    protected readyCallback(): void {
    }

    protected init(): void {

        this.numberOfAddedContainers = 0;
        this.applicationUrl = new URL(window.location.href);
        this.containerTransfer = new Array<containerTransfer>();
        this.popupUiErrorInfo = {};
        this.nextOrderPosition = 0;
        this.nextOrderPositionInput = <HTMLInputElement>this.querySelector('input[name=nextOrderPosition]');
        this.isContainerUsedInput = <HTMLInputElement>this.querySelector('input[name=isContainerUsed]');
        this.popupUiError = this.querySelector('.popup-ui-error');
        this.containerScanner = this.querySelector('#input_scannerNew');
        this.mergingContainerScanner = this.querySelector('#input_scanner_merge_container');
        this.listOfContainersInput = <HTMLInputElement>this.querySelector('#listOfIdContainers');
        this.listOfContainersHolder = this.querySelector('.list-containers-holder');
        this.containerEighthCharactersSet = <HTMLInputElement>document.querySelector('#containerID_eighth_characters_set');
        this.pleaseScanContainer = <HTMLInputElement>document.querySelector('#please_scan_container');
        this.containerIsAlreadyUsed = <HTMLInputElement>document.querySelector('#container_is_already_used');
        this.containerScanIsNotAllowed = <HTMLInputElement>document.querySelector('#container-scan-not-allowed');
        this.containerScanOrderErrorPopUp1 = <HTMLInputElement>document.querySelector('#container_scan_order_error_pop-up_1');
        this.continueUnpacking = <HTMLInputElement>document.querySelector('#btnContinueUnpacking > button');
        this.confirmScanningContainers = this.querySelector('.checkbox-holder input[type=checkbox]');
        this.confirmButtonForScannedContainers = this.parentElement.querySelector('#btnConfirmZone button');

        let backLink = document.querySelector('.header__content a.link');
        backLink.style.display = "none";
        this.containerScanner.focus();
        this.mapEvents();
    }

    protected mapEvents(): void {
        this.confirmScanningContainers.addEventListener('click', (event:MouseEvent) => this.toggleConfirmButton(event));
        this.containerScanner.addEventListener('keypress', (event: KeyboardEvent) => this.formKeyPressHandler(event));
        this.mergingContainerScanner.addEventListener('keypress', (event: KeyboardEvent) => this.mergingContainerEntered(event));
        this.continueUnpacking.addEventListener('click', (event: MouseEvent) => this.continueUnpackingClick(event));
    }

    protected atLeastOneContainerIsAdded(listOfContainersHolder, listContainersShelf) {
         return (listOfContainersHolder.childElementCount != 0 || listContainersShelf.childElementCount != 0);
    }

    protected toggleConfirmButton(event): void {
        let isChecked = event.target.checked;

        if(isChecked) {
            this.confirmButtonForScannedContainers.classList.remove('button--disabled');
        }
        else {
            this.confirmButtonForScannedContainers.classList.add('button--disabled');
        }
    }

    protected formKeyPressHandler(event) {
        if(event.key == 'Enter') {
            event.preventDefault();
            let containerNumber = event.target.value;
            const formattedContainerInput = containerNumber.replace('/x11', '').replace('/X11', '');
            event.target.value = formattedContainerInput;

            let containerExists = this.containerExists(formattedContainerInput);

            if (containerExists) {
                const url = window.location.origin + "/picker/scanning-container-merge/get-container-info";
                const formData = new FormData();
                formData.append('container', containerNumber);
                const that = this;

                $.ajax(url, {
                    type: 'POST',
                    dataType: 'json',
                    data: {
                        container: containerNumber
                    },
                    success(data, status, xhr) {
                        let parsedData = JSON.parse(data);
                        if(parsedData['error'] === 'error'){
                            that.showPopUpErrorMessageForContainerScanNotAllowed();
                        } else {
                            that.containerAndCircleColorHolder(parsedData);
                            document.querySelector("#showFullForm").classList.replace("hidden", "visible");

                            let substitute = "";

                            $("#listContainersShelf").empty();
                            for (let i = 0; i < parsedData.length; i++) {
                                substitute = "";
                                if (parsedData[i].has_substituted_item > 0) {
                                    substitute = '<span style="font-weight: bold"></span><svg class="icon icon--big" data-qa="component icon" title="icon-substitutes"> <use xlink:href="#:icon-substitutes"></use></svg>';
                                }
                                if (parsedData[i].shelf_id == null) {
                                    $("#listContainersShelf").append('<p id="cnt_' + parsedData[i].container_id + '"><span>' + parsedData[i].zone_abbrevation + '</span> > <span>' + parsedData[i].container_id + '</span>' + substitute + '</p>');
                                } else {
                                    $("#listContainersShelf").append('<p id="cnt_' + parsedData[i].container_id + '"><span>' + parsedData[i].zone_abbrevation + '</span> > <span>' + parsedData[i].container_id + '</span> > <span style="font-weight: bold">' + parsedData[i].shelf_id + '</span>' + " " + substitute + '</p>');
                                }
                            }

                            that.toggleMergingContainerInput();

                            let backLink = document.querySelector('.header__content a.link');
                            backLink.style.display = "block";
                            backLink.setAttribute('href', '#');
                            backLink.addEventListener('click',
                                function() {
                                    document.querySelector("#showFullForm").classList.replace("visible", "hidden");
                                    $("#listContainersShelf").empty();
                                    that.clearInputField(document.querySelector("#input_scannerNew"));
                                    that.mergingContainerScanner.value = "";
                                    that.confirmScanningContainers.checked = false;
                                    that.continueUnpacking.classList.add("button--disabled");
                                    backLink.style.display = "none";
                                }
                            );
                        }
                    },
                    error(jqXhr, textStatus, errorMessage) {
                        console.log(jqXhr.error);
                    }
                });
            }
            else if (containerExists) {
                this.showPopUpErrorMessageForContainerScanNotAllowed();
            }
            else {
                document.querySelector("#showFullForm").classList.replace("visible", "hidden");
                this.showPopUpErrorMessageForEmptyContainer();
            }

            this.mergingContainerScanner.value = "";
            this.toggleInputScanner();

        }
    }

    protected mergingContainerEntered(event) {

        if(event.key == 'Enter') {
            event.preventDefault();

            let containerNumberFill = event.target.value;
            const containerNumber = this.containerScanner;
            const containerNumberMove = this.containerScanner.value;
            const formattedContainerNumberFill = containerNumberFill.replace('/x11', '').replace('/X11', '');
            const formattedContainerNumberMove = containerNumberMove.replace('/x11', '').replace('/X11', '');

                const url = window.location.origin + "/picker/scanning-container-merge/merging-container-scan";
                const that = this;

                $.ajax(url, {
                    type: 'POST',
                    dataType: 'json',
                    data: {
                        containerToFill: containerNumberFill,
                        containerToMove: containerNumberMove
                    },
                    success(data, status, xhr) {
                        let parsedData = JSON.parse(data);
                        if(parsedData === "OK"){
                            that.continueUnpacking.classList.remove("button--disabled");
                            let id = '#cnt_' + containerNumberMove;
                            $(id).remove();
                            that.clearInputField(that.mergingContainerScanner);
                        }
                        else {
                            that.showPopUpErrorMessageForEmptyContainer();
                        }
                    },
                    error(jqXhr, textStatus, errorMessage) {
                        console.log(jqXhr.error);
                    }
                });

        }

    }

    protected containerExists(containerNumber): boolean {
        this.listOfContainers = JSON.parse(document.querySelector(this.getOrdersContainersData).dataset.orderscontainers);
        let containerExists = false;
        for(let i = 0; i < this.listOfContainers.length; i++) {
            let currentContainer = this.listOfContainers[i];
            if(currentContainer == containerNumber) {
                containerExists = true;
                return containerExists;
            }
            else{
                containerExists = false;
            }
        }

        return containerExists;
    }

    protected continueUnpackingClick(event) {
        let backLink = document.querySelector('.header__content a.link');
        backLink.click();
    }

    protected showPopUpErrorMessageForNonValidContainer() {
        let popUpInfo = this.popupUiError.querySelector('.error-info');
        popUpInfo.innerHTML = `
            <p class="container-name">
                ${this.containerEighthCharactersSet.value}
            </p>
        `;
        this.popupUiError.classList.add('popup-ui-error--show');
    }

    protected showPopUpErrorMessageForEmptyContainer() {
        let popUpInfo = this.popupUiError.querySelector('.error-info');
        popUpInfo.innerHTML = `
            <p class="container-name">
               ${this.containerIsAlreadyUsed.value}
            </p>
        `;
        this.popupUiError.classList.add('popup-ui-error--show');
    }

    protected showPopUpErrorMessageForContainerScanNotAllowed() {
        const popUpInfo = this.popupUiError.querySelector('.error-info');
        popUpInfo.innerHTML = `<p class="container-name">${this.containerScanIsNotAllowed.value}</p>`;
        this.popupUiError.classList.add('popup-ui-error--show');
    }


    protected toggleInputScanner(): void {

        let addMultipleContainer = this.applicationUrl.searchParams.get('add_multiple_containers');
        if(!Boolean(addMultipleContainer)) {
            this.containerScanner.style.display = this.numberOfAddedContainers == 1 ? 'none' : 'block';
            this.containerScanner.focus();
        }
    }

    protected createContainerHolder(containerNumber): HTMLElement {
        let containerHolder = document.createElement('div');
        containerHolder.classList.add('container-item');
        containerHolder.innerHTML = `<span class="container-number">${containerNumber}</span>`;

        return containerHolder;
    }

    protected toggleMergingContainerInput(): void{
        this.mergingContainerScanner.value = "";
        this.mergingContainerScanner.readOnly = true;
        this.mergingContainerScanner.focus();

        setTimeout(() => {
            this.mergingContainerScanner.readOnly = false;
        }, 1000);
    }

    protected containerAndCircleColorHolder(parsedData): void {
        const colorCode = parsedData[0]['picking_color']['back_color'];
        const colorNumber = parsedData[0]['picking_color']['id_color'];
        const textColor = parsedData[0]['picking_color']['fore_color'];

        document.querySelector(".container-color-holder").style.backgroundColor = colorCode;
        document.querySelector(".color-number").style.color = textColor;
        document.querySelector(".id-number").textContent = colorNumber;
        document.querySelector(".circle").style.backgroundColor = colorCode;
        document.querySelector(".circle").style.color = textColor;
        document.querySelector(".circle").textContent = colorNumber;
    }

    protected createBinIcon(): HTMLElement {
        let binIcon = this.binIconHolder.cloneNode(true);
        binIcon.style.removeProperty('display');

        return <HTMLElement>binIcon;
    }

    protected clearInputField(inputField): void {
        inputField.value = '';
        inputField.focus();
    }

    get getOrdersContainersData(): string {
        return 'container-scan-order-merge';
    }

}
