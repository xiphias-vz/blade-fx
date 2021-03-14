import Component from 'ShopUi/models/component';
import $ from 'jquery/dist/jquery';
import {array} from 'fast-glob/out/utils';

type containersShelf = {
    ContainerCode: string;
    ShelfCode: string;
    PositionId: string;
}

export default class ShelfScanOrder extends Component {
    protected positionId: HTMLElement;
    protected form: HTMLFormElement;
    protected formItems: HTMLInputElement[];
    protected buttonConfirm: HTMLButtonElement;
    protected hrElement: HTMLElement;
    protected barcodePrefix: string = '/x11';
    protected popUpUiInfo: HTMLElement;
    protected popUpUiSuccess: HTMLElement;
    protected containerShelfInputField: HTMLInputElement;
    protected containerShelfTransfer: Array<containersShelf>;
    protected containerShelf: containersShelf;

    protected readyCallback(): void {
        this.popUpUiInfo = <HTMLElement>document.getElementsByClassName('popup-ui-info')[0];
        this.popUpUiSuccess= <HTMLElement>document.getElementsByClassName('popup-success-ui')[0];
        this.positionId = <HTMLElement>document.getElementsByClassName('color-number')[0];
        this.form = <HTMLFormElement>document.getElementById('frmMultiPickingScanningContainer');
        this.formItems = Array.from(this.form.querySelectorAll('input[type=text]'));
        this.buttonConfirm = <HTMLButtonElement>document.getElementsByClassName('btnMultiPickingScanningContainer')[0];
        this.buttonConfirm.addEventListener('click', (event: MouseEvent) => this.checkInputBeforeSubmit(event));
        this.containerShelfInputField = <HTMLInputElement>document.querySelector('input[name=containersShelf]');
        this.containerShelfTransfer = new Array<containersShelf>();
        this.containerShelf = {
            ContainerCode:'',
            ShelfCode:'',
            PositionId: ''
        };

        this.mapEventsForInputs();
        this.focusInputElement(1);
        this.removeLastHrElement();
    }

    protected checkInputBeforeSubmit(event): void {
        let counter = 0;
        this.formItems.forEach((element: HTMLInputElement) => {
            if (element.value == "") {
                event.preventDefault();
                counter++;
            }
        });
        if (counter > 0) {
            alert("Es werden nicht alle Felder eingegeben!");
        } else {
            if (this.buttonConfirm.classList.contains('lastOrder')) {
                document.querySelector('.popup-ui-container-scan').classList.add('popup-ui-container-scan--show');
            }
        }
    }

    protected mapEventsForInputs(): void {
        this.formItems.forEach((element: HTMLInputElement) => {
            element.addEventListener('input', (event: KeyboardEvent) => this.onInputItemChange(event));
            element.addEventListener('keypress', (event: KeyboardEvent) => this.onInputKeyPress(event));
        });
    }

    protected focusInputElement(indexId): void {
        let focusInput = <HTMLInputElement>document.getElementById('inputScanningShelf_' + indexId);
        if (focusInput != null) {
            focusInput.focus();
        }
    }

    protected removeLastHrElement(): void {
        let countItems = this.formItems.length;
        this.hrElement = <HTMLElement>document.getElementById('hrId_' + countItems);
        if (this.hrElement != null) {
            this.hrElement.remove();
        }
    }

    protected onInputItemChange(event): void {
        // force removing of barcode prefix
        let replacedValue = event.target.value.replace(this.barcodePrefix, '');
        event.target.value = replacedValue;

        //check if shelf Id starts with capital letter
        let firstChar = (replacedValue.charAt(0));
        let reg = new RegExp (/^[A-Z]+$/g);
        let regTest = reg.test(firstChar);
        if (!regTest) {
            event.target.value = "";
            alert('Der erste Buchstabe muss Großbuchstaben sein');
        }
    }

    protected onInputKeyPress(event): void {
        if (event.key == "Enter") {
            event.preventDefault();
            if (event.target.value != null && event.target.value != "") {
                this.checkContainerAndShelfId(event);
            }
        }
    }

    protected checkContainerAndShelfId(event):void {
        let ShelfCode = event.target.value;
        let InputData = $('.listOfExistingContainers').data('listofexistingcontainers');
        if (ShelfCode != "") {
            let exist = false;
            for (let i = 0; i < InputData.length; i++) {
                if (InputData[i]["ShelfCode"] == ShelfCode) {
                    exist = true;
                    this.showPopUpUiInfo(InputData[i]["ContainerCode"], InputData[i]["ShelfCode"]);
                    event.target.value = "";
                    break;
                }
            }

            for (let i = 0; i < this.containerShelfTransfer.length; i++) {
                if (this.containerShelfTransfer[i]["ShelfCode"] == ShelfCode) {
                    exist = true
                    this.showPopUpUiInfo(this.containerShelfTransfer[i]["ContainerCode"], this.containerShelfTransfer[i]["ShelfCode"]);
                    event.target.value = "";
                    break;
                }
            }
            if (exist == false) {
                this.updateContainerShelfTransfer(event);
            }
        }
    }

    protected updateContainerShelfTransfer(event) {
        let ContainerCode = event.target.previousElementSibling.innerHTML;
        let ShelfCode = event.target.value;
        let PositionId = this.positionId.innerText;
        this.containerShelf = {
            ContainerCode: '',
            ShelfCode: '',
            PositionId: ''
        };
        this.containerShelf.ContainerCode = ContainerCode;
        this.containerShelf.ShelfCode = ShelfCode;
        this.containerShelf.PositionId = PositionId;
        this.containerShelfTransfer.push(this.containerShelf);
        this.containerShelfInputField.value = JSON.stringify(this.containerShelfTransfer);
        this.showContainerAndShelf(event);
    }

    protected showContainerAndShelf(event):void {
        let indexId = event.target.id.split("_").pop();
        let containerElement = <HTMLElement>document.getElementById('container_' + indexId);
        let shelfElement = <HTMLElement>document.getElementById('containerToShelf_' + indexId);
        containerElement.classList.add('is-hidden');
        let shelfCode = <HTMLElement>document.getElementById('shelfCode_' + indexId);
        shelfCode.innerText = event.target.value;
        shelfElement.classList.remove('is-hidden');
        ++indexId;
        this.focusInputElement(indexId);
    }

    protected showPopUpUiInfo(ContainerCode, ShelfCode): void {
        this.popUpUiInfo.querySelector("#firstBlock").innerHTML = 'Container: <strong>' + ContainerCode + '</strong>';
        this.popUpUiInfo.querySelector("#secondBlock").innerHTML = 'Lagerplatz: <strong>' + ShelfCode + '</strong>';
        this.popUpUiInfo.classList.add('popup-ui-info--show');
    }
}
