import Component from 'ShopUi/models/component';
import $ from 'jquery/dist/jquery';
import {array} from 'fast-glob/out/utils';

type containerTransfer = {
    orderReference: string;
    containers: Array<string>;
}

export default class ContainerScanOrderMerge extends Component {
    // protected form: HTMLFormElement;
    // protected allPacksForCustomerNumber: HTMLInputElement;
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
    protected containerScanOrderErrorPopUp1: HTMLInputElement;
    protected containerScanOrderErrorPopUp2: HTMLInputElement;
    protected containerScanOrderErrorPopUp3: HTMLInputElement;
    protected containerScanOrderErrorPopUp4: HTMLInputElement;
    protected containerScanOrderErrorPopUp5: HTMLInputElement;
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
        this.containerScanOrderErrorPopUp1 = <HTMLInputElement>document.querySelector('#container_scan_order_error_pop-up_1');

        this.containerScanner.focus();
        this.mapEvents();
    }

    protected mapEvents(): void {
        this.containerScanner.addEventListener('keypress', (event: KeyboardEvent) => this.formKeyPressHandler(event));
        this.mergingContainerScanner.addEventListener('keypress', (event: KeyboardEvent) => this.mergingContainerEntered(event));
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

            let containerExists = this.containerExists(formattedContainerInput);

            if(containerExists) {
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

                        $("#listContainersShelf").empty();
                        for (let i = 0; i < parsedData.length; i++) {
                            if(parsedData[i].shelf_id == null){
                                $("#listContainersShelf").append('<p><span>' + parsedData[i].zone_abbrevation + '</span> > <span>' + parsedData[i].container_id + '</span></p>');
                            }
                            else{
                                $("#listContainersShelf").append('<p><span>' + parsedData[i].zone_abbrevation + '</span> > <span>' + parsedData[i].container_id + '</span> > <span style="font-weight: bold">' + parsedData[i].shelf_id + '</span></p>');
                            }
                        }

                        let backLink = document.querySelector('.header__content a.link');
                        backLink.setAttribute('href', '#');
                        backLink.addEventListener('click',
                    function(){
                                document.querySelector("#showFullForm").classList.replace("visible", "hidden");
                                $("#listContainersShelf").empty();
                                that.clearInputField(document.querySelector("#input_scannerNew"));
                            }
                        );

                    },
                    error(jqXhr, textStatus, errorMessage) {
                        console.log(jqXhr.error);
                    }
                });

               document.querySelector("#showFullForm").classList.replace("hidden", "visible");
            }
            else {
                document.querySelector("#showFullForm").classList.replace("visible", "hidden");
                this.showPopUpErrorMessageForEmptyContainer();
            }

            this.toggleInputScanner();

        }
    }

    protected mergingContainerEntered(event) {

        if(event.key == 'Enter') {
            event.preventDefault();

            let containerNumberFill = event.target.value;
            let containerNumberMove = this.containerScanner.value;
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
                            document.querySelector("#btnContinueUnpacking > button").classList.remove("button--disabled");
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
