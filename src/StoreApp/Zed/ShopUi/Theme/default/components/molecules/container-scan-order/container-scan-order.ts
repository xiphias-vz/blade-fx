import Component from 'ShopUi/models/component';

type containerTransfer = {
    orderReference: string;
    containers: Array<string>;
}

export default class ContainerScanOrder extends Component {
    protected form: HTMLFormElement;
    protected allPacksForCustomerNumber: HTMLInputElement;
    protected inputScanner: HTMLInputElement;
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
    protected containerScanOrderErrorPopUp1: HTMLInputElement;
    protected containerScanOrderErrorPopUp2: HTMLInputElement;
    protected containerScanOrderErrorPopUp3: HTMLInputElement;
    protected containerScanOrderErrorPopUp4: HTMLInputElement;
    protected containerScanOrderErrorPopUp5: HTMLInputElement;
    protected openPopupButton: HTMLButtonElement;
    protected containersIdList: HTMLInputElement;
    protected containerAlreadyUsed: HTMLInputElement;

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
        this.form = this.querySelector('#frm_scanContainerOrder');
        this.popupUiError = this.querySelector('.popup-ui-error');
        this.popupUiDeposit = this.querySelector('.popup-ui-deposit');
        this.existingContainers = JSON.parse(this.form.getAttribute('data-containers'));
        this.allPacksForCustomerNumber = this.querySelector('.checkbox-holder input[type=checkbox]');
        this.listContainersShelf = this.querySelector('.list-containers-shelf');
        this.confirmButtonForScannedContainers = this.parentElement.querySelector('#confirm-scan-containers button');
        this.inputScanner = this.querySelector('#input_scanner');
        this.orderReferenceNumber = this.inputScanner.previousElementSibling.querySelector('.order-reference-holder').innerHTML;
        this.listOfContainersHolder = this.querySelector('.list-containers-holder');
        this.binIconHolder = this.querySelector('.bin-icon-holder');
        this.containerInput = this.querySelector('input[name=idContainers]');
        this.containerEighthCharactersSet = <HTMLInputElement>document.querySelector('#containerID_eighth_characters_set');
        this.pleaseScanContainer = <HTMLInputElement>document.querySelector('#please_scan_container');
        this.containerScanOrderErrorPopUp1 = <HTMLInputElement>document.querySelector('#container_scan_order_error_pop-up_1');
        this.containerScanOrderErrorPopUp2 = <HTMLInputElement>document.querySelector('#container_scan_order_error_pop-up_2');
        this.containerScanOrderErrorPopUp3 = <HTMLInputElement>document.querySelector('#container_scan_order_error_pop-up_3');
        this.containerScanOrderErrorPopUp4 = <HTMLInputElement>document.querySelector('#container_scan_order_error_pop-up_4');
        this.containerScanOrderErrorPopUp5 = <HTMLInputElement>document.querySelector('#container_scan_order_error_pop-up_5');
        this.containerAlreadyUsed = <HTMLInputElement>document.querySelector('#container_already_used');
        this.openPopupButton = this.querySelector('.popup-ui-deposit__open');
        this.containersIdList = this.querySelector('#containerArrayIds');

        this.containerTransfer.push(
            {
                orderReference: this.orderReferenceNumber,
                containers: []
            }
        );
        this.containerInput.value = JSON.stringify(this.containerTransfer);
        this.nextOrderPosition = parseInt(this.nextOrderPositionInput.value);
        this.inputScanner.focus();
        this.mapEvents();
    }

    protected mapEvents(): void {
        this.allPacksForCustomerNumber.addEventListener('click', (event:MouseEvent) => this.toggleConfirmButton(event));
        this.inputScanner.addEventListener('keypress', (event: KeyboardEvent) => this.formKeyPressHandler(event));
        this.form.addEventListener('submit', (e) => {

            if(!this.atLeastOneContainerIsAdded(this.listOfContainersHolder, this.listContainersShelf)) {
                e.preventDefault();

                this.clearInputField(this.inputScanner);
                return false;
            }

            this.confirmButtonForScannedContainers.classList.add('button--disabled');
            const isUsedContainer = this.isContainerUsedInput.value;
            if (!(Boolean(parseInt(isUsedContainer)))) {
                this.nextOrderPosition = (this.nextOrderPosition += 1);
            }
            this.nextOrderPositionInput.value = String(this.nextOrderPosition);

        });

        if (this.openPopupButton != undefined) {
            this.openPopupButton.addEventListener('click', (event:MouseEvent) => this.showDepositPopup(event));
        }
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
            let container = this.containersIdList.value;
            let containerSplit = container.split(":");
            const formattedContainerInput = containerNumber.replace('/x11', '').replace('/X11', '');

            if(formattedContainerInput == "") {
                return;
            }

            if(formattedContainerInput.length != 8) {
                this.showPopUpErrorMessageForNonValidContainer();
                return;
            }

            if(containerSplit.includes(formattedContainerInput)) {
                this.showPopUpErrorMessageForUsedContainer();
                return;
            }
            this.updateContainerInputFieldValue(formattedContainerInput, 'ADD_CONTAINER');

            let containerHolder = this.createContainerHolder(formattedContainerInput);
            let binIcon = this.createBinIcon();

            containerHolder.appendChild(binIcon);
            this.listOfContainersHolder.appendChild(containerHolder);
            this.clearInputField(event.target);
            this.numberOfAddedContainers++;

            binIcon.addEventListener('click', (event: MouseEvent) =>  this.removeContainer(event, binIcon));
            this.toggleInputScanner();

        }
    }

    protected containerExists(containerNumber, orderReferenceNumber): boolean {
        let containerExists = false;
        for(let i = 0; i < this.existingContainers.length; i++) {
            let currentContainer = this.existingContainers[i];
            if(currentContainer.ContainerCode == containerNumber && currentContainer.orderReference != orderReferenceNumber) {
                containerExists = true;
                this.popupUiErrorInfo.ContainerCode = currentContainer.ContainerCode;
                this.popupUiErrorInfo.orderReference = currentContainer.orderReference;
                this.popupUiErrorInfo.firstName = currentContainer.firstName;
                this.popupUiErrorInfo.lastName = currentContainer.lastName;
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
               ${this.pleaseScanContainer.value}
            </p>
        `;
        this.popupUiError.classList.add('popup-ui-error--show');
    }

    protected showPopUpErrorMessageForUsedContainer() {
        let popUpInfo = this.popupUiError.querySelector('.error-info');
        popUpInfo.innerHTML = `
            <p class="container-name">
                ${this.containerAlreadyUsed.value}
            </p>
        `;
        this.popupUiError.classList.add('popup-ui-error--show');
    }

    protected showPopUpErrorMessage():void {
        let popUpInfo = this.popupUiError.querySelector('.error-info');
        popUpInfo.innerHTML = `
            <p class="container-name">
                ${this.containerScanOrderErrorPopUp1.value} <span>${this.popupUiErrorInfo.ContainerCode}</span><br>
                 <span class="container-desc">${this.containerScanOrderErrorPopUp2.value} ${this.popupUiErrorInfo.firstName} ${this.popupUiErrorInfo.lastName}${this.containerScanOrderErrorPopUp3.value} </span><br>
                 <span class="container-order">${this.containerScanOrderErrorPopUp4.value} ${this.popupUiErrorInfo.orderReference} ${this.containerScanOrderErrorPopUp5.value}</span>
            </p>
        `;
        this.inputScanner.value = '';
        this.inputScanner.focus();
        this.popupUiError.classList.add('popup-ui-error--show');
    }

    protected toggleInputScanner(): void {

        let addMultipleContainer = this.applicationUrl.searchParams.get('add_multiple_containers');
        if(!Boolean(addMultipleContainer)) {
            this.inputScanner.style.display = this.numberOfAddedContainers == 1 ? 'none' : 'block';
            this.inputScanner.focus();
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

    protected removeContainer(event, binIcon):void {
        let containerNumber = binIcon.parentElement.querySelector('.container-number').innerHTML;
        this.numberOfAddedContainers--;
        this.toggleInputScanner();
        this.updateContainerInputFieldValue(containerNumber, 'REMOVE_CONTAINER');
        binIcon.parentElement.remove();

    }

    protected updateContainerInputFieldValue(containerNumber, operation): void {
        this.containerInput.value = JSON.stringify(this.updateContainerTransfer(containerNumber, operation));
    }

    protected updateContainerTransfer(containerNumber, operation): Array<containerTransfer> {

        if(operation == 'ADD_CONTAINER') {
             this.containerTransfer.forEach(field => {
                 if(field.containers) {
                    field.containers.push(containerNumber);
                 }
            });
        }
        else if(operation == 'REMOVE_CONTAINER') {
            this.containerTransfer.forEach(field => {
                if(field.containers) {
                    let indexOfContainerToBeRemoved = field.containers.indexOf(containerNumber);
                    if (indexOfContainerToBeRemoved > -1) {
                        field.containers.splice(indexOfContainerToBeRemoved, 1);
                    }
                }
            });
        }

        return this.containerTransfer;
    }

    protected confirmButtonForScannedContainersClick(event): void {
        this.popupUiDeposit.classList.add('popup-ui-deposit--show');
    }

    protected get submitButtonSelector(): string {
        return `.${this.jsName}__submit`;
    }

    public showDepositPopup(event?: Event): void {
        if (event) {
            event.preventDefault();
        }

        if(!this.atLeastOneContainerIsAdded(this.listOfContainersHolder, this.listContainersShelf)) {
            event.preventDefault();

            this.clearInputField(this.inputScanner);
        }
        else{
            this.popupUiDeposit.classList.add('popup-ui-deposit--show');
        }
    }
}
