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
    protected confirmButtonForScannedContainers: HTMLButtonElement;
    protected listOfContainersHolder: HTMLElement;
    protected listContainersShelf: HTMLElement;
    protected binIconHolder: HTMLElement;
    protected popupUiError: HTMLElement;
    protected applicationUrl: URL;
    protected orderReferenceNumber: string;
    protected existingContainers: object[];
    protected numberOfAddedContainers: number;
    protected nextOrderPosition: number;
    protected containerTransfer: Array<containerTransfer>;
    protected popupUiErrorInfo: object;

    protected readyCallback(): void {
    }

    protected init(): void {

        this.numberOfAddedContainers = 0;
        this.applicationUrl = new URL(window.location.href);
        this.containerTransfer = new Array<containerTransfer>();
        this.popupUiErrorInfo = {};
        this.nextOrderPositionInput = <HTMLInputElement>this.querySelector('input[name=nextOrderPosition]');
        this.form = this.querySelector('#frm_scanContainerOrder');
        this.popupUiError = this.querySelector('.popup-ui-error');
        this.existingContainers = JSON.parse(this.form.getAttribute('data-containers'));
        this.allPacksForCustomerNumber = this.querySelector('.checkbox-holder input[type=checkbox]');
        this.listContainersShelf = this.querySelector('.list-containers-shelf');
        this.confirmButtonForScannedContainers = this.parentElement.querySelector('#confirm-scan-containers button')
        this.inputScanner = this.querySelector('#input_scanner');
        this.orderReferenceNumber = this.inputScanner.previousElementSibling.querySelector('.order-reference-holder').innerHTML;
        this.listOfContainersHolder = this.querySelector('.list-containers-holder');
        this.binIconHolder = this.querySelector('.bin-icon-holder');
        this.containerInput = this.querySelector('input[name=idContainers]');

        this.containerTransfer.push(
            {
                orderReference: this.orderReferenceNumber,
                containers: []
            }
        )
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
                this.showPopUpErrorMessageForNonValidContainer();
                this.clearInputField(this.inputScanner);
                return false;
            }

            this.nextOrderPosition = ++this.nextOrderPosition;
            this.nextOrderPositionInput.value = String(this.nextOrderPosition);

        })
    }

    protected atLeastOneContainerIsAdded(listOfContainersHolder, listContainersShelf) {
         return (listOfContainersHolder.childElementCount != 0 || listContainersShelf.childElementCount != 0);
    }

    protected toggleConfirmButton(event):void {
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

            if(formattedContainerInput == "") {
                return;
            }

            if(formattedContainerInput.length != 8) {
                this.showPopUpErrorMessageForNonValidContainer();
                return;
            }

            let containerExists = this.containerExists(formattedContainerInput, this.orderReferenceNumber);

            if(containerExists) {
               this.showPopUpErrorMessage();
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
                Container-ID muss eingestellt werden <br> und  <br> 8 Zeichen haben
            </p>
        `;
        this.popupUiError.classList.add('popup-ui-error--show');
    }

    protected showPopUpErrorMessageForEmptyContainer() {
        let popUpInfo = this.popupUiError.querySelector('.error-info');
        popUpInfo.innerHTML = `
            <p class="container-name">
               Bitte Container scannen
            </p>
        `;
        this.popupUiError.classList.add('popup-ui-error--show');
    }

    protected showPopUpErrorMessage():void {
        let popUpInfo = this.popupUiError.querySelector('.error-info');
        popUpInfo.innerHTML = `
            <p class="container-name">
                Container: <span>${this.popupUiErrorInfo.ContainerCode}</span><br>
                 <span class="container-desc">ist bereits für Kunde ${this.popupUiErrorInfo.firstName} ${this.popupUiErrorInfo.lastName} </span><br>
                 <span class="container-order">Bestellung: ${this.popupUiErrorInfo.orderReference} aktiviert</span>
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
}
