import Component from 'ShopUi/models/component';
import $ from 'jquery/dist/jquery';
import {array} from 'fast-glob/out/utils';

type ContainersShelf = {
    ContainerCode: string;
    ShelfCode: string;
    HasSubstitutedItem: string;
};

export default class ShelfScanOrder extends Component {
    protected containerNumberLength: number = 8;
    protected notificationMessageDelay: number = 3000;
    protected positionId: HTMLElement;
    protected hasSubstitutedItem: HTMLElement[];
    protected form: HTMLFormElement;
    protected formItems: HTMLInputElement[];
    protected buttonConfirm: HTMLButtonElement;
    protected hrElement: HTMLElement;
    protected barcodePrefix: string = '/x11';
    protected popUpUiInfo: HTMLElement;
    protected containerShelfInputField: HTMLInputElement;
    protected containerShelfTransfer: ContainersShelf[];
    protected containerShelf: ContainersShelf;
    firstLetter: HTMLInputElement;
    notAllFields: HTMLInputElement;

    protected containerScanInput: HTMLInputElement;
    protected shelfScanInput: HTMLInputElement;
    protected popupUiError: HTMLElement;
    protected popupUiErrorInfo: object;
    protected containerDoesntHaveRightAmountOfLettersErrorMessage: HTMLInputElement;
    protected containerNotFoundInputFieldMessage: HTMLInputElement;
    protected containerNotFoundInputFieldMessagePartTwo: HTMLInputElement;
    protected listOfContainers: HTMLSpanElement[];
    protected listOfShelves: HTMLSpanElement[];
    protected listOfScannedContainers: HTMLInputElement[];
    protected errorCloseButton: HTMLButtonElement;
    protected successfulScanningNotificationMessage: HTMLDivElement;

    protected readyCallback(): void {
        this.popUpUiInfo = <HTMLElement>document.getElementsByClassName('popup-ui-info')[0];
        this.hasSubstitutedItem = Array.from(this.querySelectorAll('input[name=hasSubstitutedItem]'));
        this.form = <HTMLFormElement>document.getElementById('frmMultiPickingScanningContainer');
        this.formItems = Array.from(this.form.querySelectorAll('input[type=text]'));
        this.buttonConfirm = <HTMLButtonElement>document.getElementsByClassName('btnMultiPickingScanningContainer')[0];
        this.containerShelfInputField = <HTMLInputElement>document.querySelector('input[name=containersShelf]');
        this.containerShelfTransfer = new Array<ContainersShelf>();
        this.firstLetter = <HTMLInputElement>document.querySelector('#first_letter');
        this.notAllFields = <HTMLInputElement>document.querySelector('#not_all_fields');
        this.containerShelf = {
            ContainerCode:'',
            ShelfCode:'',
            HasSubstitutedItem: ''
        };
        this.containerScanInput = this.querySelector('#inputScanningContainer');
        this.shelfScanInput = this.querySelector('#inputScanningShelf');
        this.popupUiError = this.querySelector('.popup-ui-error');
        this.popupUiErrorInfo = {};
        this.containerDoesntHaveRightAmountOfLettersErrorMessage = this.querySelector('#containerID_eighth_characters_set');
        this.containerNotFoundInputFieldMessage = this.querySelector('#container_scan_order_error_pop-up_1');
        this.containerNotFoundInputFieldMessagePartTwo = this.querySelector('#container_scan_error_pop-up_1');
        this.listOfContainers = Array.from(this.querySelectorAll('.shelf-scan-order__container'));
        this.listOfShelves = Array.from(this.querySelectorAll('.shelf-scan-order__shelf'));
        this.listOfScannedContainers = Array.from(this.querySelectorAll('.shelf-scan-order__scanned-container'));
        this.successfulScanningNotificationMessage = this.querySelector('.shelf-scan-order__successful-scan-notification');

        this.mapEventsForInputs();
    }

    protected mapEventsForInputs(): void {
        this.formItems.forEach((element: HTMLInputElement, index: number) => {
            let flag = '';
            if (element.id === 'inputScanningShelf') {
                flag = 'shelf';
                element.addEventListener('input', (event: KeyboardEvent) => this.onInputItemChange(event));
            } else {
                flag = 'container';
                element.focus();
            }

            element.addEventListener('keypress', (event: KeyboardEvent) => this.onInputKeyPress(event, flag, element));
        });
    }

    protected onInputItemChange(event): void {
        // force removing of barcode prefix
        const replacedValue = event.target.value.replace(this.barcodePrefix, '');
        event.target.value = replacedValue;

        // check if shelf Id starts with capital letter
        const firstChar = (replacedValue.charAt(0));
        const reg = new RegExp (/^[A-Z]+$/g);
        const regTest = reg.test(firstChar);
        if (!regTest) {
            event.target.value = '';
            alert(this.firstLetter.value);
        }
    }

    protected onInputKeyPress(event, flag: string, element: HTMLInputElement): void {
        if (event.key == 'Enter') {
            event.preventDefault();

            const inputFieldNumber = event.target.value;

            if (inputFieldNumber != undefined && inputFieldNumber !== '') {
                if (flag === 'container') {
                    if (inputFieldNumber.length !== this.containerNumberLength) {
                        this.showPopUpErrorMessageForNonValidContainer();

                        return;
                    } else {
                        this.formItems.forEach(item => {
                            if (item !== element) {
                                item.focus();
                            }
                        });
                    }
                } else if (flag === 'shelf') {
                    this.checkContainerAndShelf();
                }
            }
        }
    }

    protected updateContainerShelfTransfer(event): void {
        const containerCode = this.formItems[0].value;
        const shelfCode = this.formItems[1].value;
        const lengthOfLists = this.listOfContainers.length;
        let hasSubstitutedItem;
        for (let i = 0; i < lengthOfLists; i += 1) {
            if (containerCode === this.listOfContainers[i].innerText) {
                hasSubstitutedItem = this.hasSubstitutedItem[i].value;
            }
        }
        this.containerShelf = {
            ContainerCode: '',
            ShelfCode: '',
            HasSubstitutedItem: ''
        };
        this.containerShelf.ContainerCode = containerCode;
        this.containerShelf.ShelfCode = shelfCode;
        this.containerShelf.HasSubstitutedItem = hasSubstitutedItem;
        this.containerShelfTransfer.push(this.containerShelf);
        this.containerShelfInputField.value = JSON.stringify(this.containerShelfTransfer);
        this.cleanInputFieldsAndResetFocus();
        this.checkHowManyContainersAreScanned();
    }

    protected showPopUpUiInfo(ContainerCode, ShelfCode): void {
        this.popUpUiInfo.querySelector('#firstBlock').innerHTML = 'Container: <strong>' + ContainerCode + '</strong>';
        this.popUpUiInfo.querySelector('#secondBlock').innerHTML = 'Lagerplatz: <strong>' + ShelfCode + '</strong>';
        this.popUpUiInfo.classList.add('popup-ui-info--show');
    }

    protected checkContainerAndShelf(): void {
        const lengthOfLists = this.listOfContainers.length;
        const containerCode = this.formItems[0];
        const shelfCode = this.formItems[1];
        let isContainerFound = false;

        for (let i = 0; i < lengthOfLists; i += 1) {
            if (containerCode.value === this.listOfContainers[i].innerText && this.listOfScannedContainers[i].value === 'false') {
                // making selected row green
                const parent = this.listOfContainers[i].parentElement;
                parent.style.color = '#1bbea0';

                // image with check appears
                const firstChild = parent.firstChild.nextSibling as HTMLSpanElement;
                firstChild.style.display = 'inline-block';

                // shelf is written in span element
                this.listOfShelves[i].innerText = shelfCode.value;
                this.listOfScannedContainers[i].value = 'true';

                isContainerFound = true;
            }
        }

        if (isContainerFound) {
            this.showContainerScannedSuccessfullyNotificationMessage(containerCode.value, shelfCode.value);
            this.updateContainerShelfTransfer(event);
        } else {
            this.noContainerFoundErrorMessage(containerCode);
        }
    }

    protected cleanInputFieldsAndResetFocus(): void {
        this.formItems.forEach(item => {
            item.value = '';
        });
        this.formItems[0].focus();
    }

    protected checkHowManyContainersAreScanned(): void {
        let areSomeLeftUnscanned = false;
        this.listOfScannedContainers.forEach(item => {
            if (item.value !== 'true') {
                areSomeLeftUnscanned = true;
            }
        });

        if (!areSomeLeftUnscanned) {
            this.buttonConfirm.removeAttribute('disabled');
            this.buttonConfirm.click();
        }
    }

    protected showContainerScannedSuccessfullyNotificationMessage(containerCodeValue: string, shelfCodeValue: string): void {
        const strongElements = Array.from(this.successfulScanningNotificationMessage.querySelectorAll('strong'));
        const elementsLength = strongElements.length;

        for (let i = 0; i < elementsLength; i += 1) {
            i === 0 ? strongElements[i].innerText = containerCodeValue : strongElements[i].innerText = shelfCodeValue;
        }

        this.successfulScanningNotificationMessage.classList.remove('hidden');

        setTimeout(() => {
            this.successfulScanningNotificationMessage.classList.add('hidden');
        }, this.notificationMessageDelay);
    }

    protected noContainerFoundErrorMessage(container: HTMLInputElement): void {
        const popUpInfo = this.popupUiError.querySelector('.error-info');
        const popUpTitle = this.popupUiError.querySelector('.error-status');
        const horizontalLine = document.createElement('hr');
        horizontalLine.classList.add('error-horizontal-line');

        if (popUpTitle.nextElementSibling.tagName !== horizontalLine.tagName) {
            popUpTitle.after(horizontalLine);
        }

        popUpInfo.innerHTML = `<p class="shelf-scan-order__container-name">
                ${this.containerNotFoundInputFieldMessage.value}
                ${container.value}
                ${this.containerNotFoundInputFieldMessagePartTwo.value}
            </p>`;

        this.errorCloseButton = this.querySelector(this.getErrorCloseButtonSelector);
        this.errorCloseButton.addEventListener('click', (event: MouseEvent) => this.cleanInputFieldsAndResetFocus());
        this.popupUiError.classList.add('popup-ui-error--show');
    }

    protected showPopUpErrorMessageForNonValidContainer(): void {
        const popUpInfo = this.popupUiError.querySelector('.error-info');
        popUpInfo.innerHTML = `
            <p class="shelf-scan-order__container-name">
                ${this.containerDoesntHaveRightAmountOfLettersErrorMessage.value}
            </p>
        `;
        this.popupUiError.classList.add('popup-ui-error--show');
    }

    get getErrorCloseButtonSelector(): string {
        return `.js-popup-ui-error__close`;
    }
}
