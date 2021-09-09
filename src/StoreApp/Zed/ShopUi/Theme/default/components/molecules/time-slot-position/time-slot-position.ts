import Component from 'ShopUi/models/component';

export default class TimeSlotPosition extends Component {
    protected form: HTMLFormElement;
    protected orderCheckBoxes: HTMLInputElement;
    protected timeSlot: HTMLInputElement;
    protected idOrdersInput: HTMLInputElement;
    protected orderIsBlockedInputFields: HTMLInputElement;
    protected isAnyOrderLocked: HTMLInputElement;
    protected isAnyNonLockedOrderPicked: HTMLInputElement;
    protected confirmMultiPickingOrder: HTMLButtonElement;
    protected popupUiError: HTMLElement;
    protected orderInfo: HTMLElement;
    protected selectOrder: HTMLElement;
    protected articleCountTotal: number;
    protected articleQuantityTotal: number;
    protected totalNumberOfOrdersSelected:number;
    protected idTimeSlot: string;
    protected continueButton: HTMLInputElement;
    protected actionStopButton: HTMLInputElement;

    protected readyCallback(): void {
    }

    protected init(): void {

        this.articleCountTotal = 0;
        this.articleQuantityTotal = 0;
        this.totalNumberOfOrdersSelected = 0;
        this.form = <HTMLFormElement>this.parentElement;
        this.popupUiError = <HTMLElement>this.form.querySelector('.error-holder');
        this.isAnyOrderLocked = <HTMLInputElement>this.form.querySelector('input[name=isAnyOrderLocked]');
        this.isAnyNonLockedOrderPicked = <HTMLInputElement>this.form.querySelector('input[name=isAnyNonLockedOrderPicked]');
        this.idTimeSlot = this.getAttribute('idTimeSlot');
        this.timeSlot = <HTMLInputElement>this.querySelector(`input`);
        this.orderCheckBoxes = <HTMLInputElement>this.querySelectorAll('.select-order input[type=checkbox]');
        this.confirmMultiPickingOrder = <HTMLButtonElement>this.parentElement.lastElementChild.querySelector('.button')
        this.orderInfo = <HTMLElement>this.querySelectorAll('.order-info');
        this.orderIsBlockedInputFields = <HTMLInputElement>this.querySelectorAll('input[name=isOrderBlocked]');
        this.selectOrder = <HTMLElement>this.querySelectorAll('.select-order');
        this.idOrdersInput = <HTMLInputElement>this.parentElement.firstElementChild;
        this.continueButton = <HTMLInputElement>document.querySelector('#continue_button');
        this.actionStopButton = <HTMLInputElement>document.querySelector('#action_stop_button');

        this.addAttributeLockedOrderIfExists();
        this.setActiveOrders();
        this.mapEvents();

    }

    protected removeOrderFromLocalStorage(idOrderToCheck) {
        for(let i = 0; i < localStorage.length; i++) {
            if(!(localStorage.key(i) === 'orderItemStatus')) {
                let idOrder = localStorage.key(i).split('_')[0];
                if(idOrder === idOrderToCheck) {
                    localStorage.removeItem(localStorage.key(i));
                }
            }
        }
    }

    protected setActiveOrders(): void {

        for(let i = 0; i < this.selectOrder.length; i++) {
            let isChecked = this.selectOrder[i].getAttribute('data-isChecked');

            if(Boolean(parseInt(isChecked))) {
                this.orderCheckBoxes[i].checked = true;
                this.calculateCountAndQuantityPerOrder(this.orderCheckBoxes[i], this.orderInfo[i]);
            }
        }
    }

    protected mapEvents(): void {
        for(let i = 0; i < this.orderCheckBoxes.length; i++) {
            this.orderCheckBoxes[i].addEventListener('click', (event: Event) => this.calculateCountAndQuantityPerOrder(this.orderCheckBoxes[i], this.orderInfo[i]));
        }

        this.confirmMultiPickingOrder.addEventListener('click', (event: Event) => this.confirmMultiPickingOrder.classList.add('button--disabled'));
    }

    protected addAttributeLockedOrderIfExists() {
        let ordersWithStatus = Array.prototype.slice.call(this.orderIsBlockedInputFields);
        for(let i = 0; i < ordersWithStatus.length; i++) {
            if(ordersWithStatus[i].value == '1') {
                this.isAnyOrderLocked.value = '1';
                this.setAttribute('contains-locked-order', 'true');
                break;
            }
        }
    }

    protected showPopUpErrorMessageForNotResolvedLockedOrders() {
        this.popupUiError.parentElement.classList.add('popup-ui-error--show');
    }

    protected calculateCountAndQuantityPerOrder(orderCheckbox, orderInfo) : void {

        let articleCount = orderInfo.querySelector('.article-count');
        let articleQuantity = orderInfo.querySelector('.article-quantity');
        let orderStatus = orderInfo.parentElement.firstElementChild;
        let isOrderBlocked = orderStatus.getAttribute('data-isOrderBlocked');
        let orderHasStatus = orderStatus.childElementCount;
        let idOrder = orderInfo.parentElement.getAttribute('data-idOrder');
        let countValue = parseInt(articleCount.innerHTML);
        let quantityValue = parseInt(articleQuantity.innerHTML);
        if(!Boolean(orderHasStatus)) {
            this.removeOrderFromLocalStorage(idOrder);
        }
        if(orderCheckbox.checked) {

            if(!Boolean(parseInt(isOrderBlocked)) && Boolean(parseInt(this.isAnyOrderLocked.value))) {
                orderCheckbox.checked = false;
                this.showPopUpErrorMessageForNotResolvedLockedOrders();
                return;
            }

            this.articleCountTotal += countValue;
            this.articleQuantityTotal += quantityValue;
            this.totalNumberOfOrdersSelected++;

            this.setAttribute('data-total-selected-orders', String(this.totalNumberOfOrdersSelected));
            this.changeTextOfConfirmButtonAndShowTotalSelectedOrders();
            this.changeColorOfConfirmButton();
            this.updatePickingObjectTransfer(
                idOrder,
                this.articleQuantityTotal,
                this.articleCountTotal,
                'ADD_SELECTED_ORDER'
            );
        }
        else {

            this.articleCountTotal -= countValue;
            this.articleQuantityTotal -= quantityValue;
            this.totalNumberOfOrdersSelected--;

            this.setAttribute('data-total-selected-orders', String(this.totalNumberOfOrdersSelected));
            this.changeTextOfConfirmButtonAndShowTotalSelectedOrders();
            this.updatePickingObjectTransfer(
                idOrder,
                this.articleQuantityTotal,
                this.articleCountTotal,
                'REMOVE_UNSELECTED_ORDER'
            );
        }

        this.querySelector('.article-count-total').innerHTML = String(this.articleCountTotal);
        this.querySelector('.article-quantity-total').innerHTML = String(this.articleQuantityTotal);

    }

    protected changeColorOfConfirmButton() : void {
        this.confirmMultiPickingOrder.classList.remove('button--disabled');
    }

    protected changeTextOfConfirmButtonAndShowTotalSelectedOrders() {
        const timeSlots = this.parentElement.querySelectorAll('.time-slot-position');
        let isAtLeastOneOrderLocked = false;
        let totalSelectedOrdersPerTimeSlot = 0;

        for(let i = 0; i < timeSlots.length; i++) {
            let currentSelectedOrders = timeSlots[i].getAttribute('data-total-selected-orders') == null ?
                "0" : timeSlots[i].getAttribute('data-total-selected-orders');
            totalSelectedOrdersPerTimeSlot += parseInt(currentSelectedOrders);

            if(timeSlots[i].getAttribute('contains-locked-order') == "true") {
                isAtLeastOneOrderLocked = true;
            }
        }

        if(totalSelectedOrdersPerTimeSlot == 0) {

            if(isAtLeastOneOrderLocked == true) {
                this.confirmMultiPickingOrder.innerHTML = this.actionStopButton.value;
                this.confirmMultiPickingOrder.classList.add('button--disabled');
            }
            else {
                this.confirmMultiPickingOrder.innerHTML = this.continueButton.value;
                this.confirmMultiPickingOrder.classList.add('button--disabled');
            }
        }
        else {
            if(isAtLeastOneOrderLocked == true) {
                this.confirmMultiPickingOrder.innerHTML = this.actionStopButton.value;
            }
            else {
                this.confirmMultiPickingOrder.innerHTML = `${this.continueButton.value} (${totalSelectedOrdersPerTimeSlot})`;
            }
        }
    }

    protected updatePickingObjectTransfer(idOrder, quantityTotal, countTotal, operation) {

        let pickingObjectTransfer = [];
        let currentGlobalStoredOrders = JSON.parse(this.idOrdersInput.value);

        if(operation == 'ADD_SELECTED_ORDER') {
            currentGlobalStoredOrders.push(parseInt(idOrder));
        }

        else if(operation == 'REMOVE_UNSELECTED_ORDER') {
            currentGlobalStoredOrders = this.removeIdOrder(currentGlobalStoredOrders, parseInt(idOrder));
        }

        currentGlobalStoredOrders = this.sortOrderArray(currentGlobalStoredOrders);

        pickingObjectTransfer.push(
             {
                 timeSlot: this.idTimeSlot,
                 quantityTotal,
                 countTotal
            }
        )

        this.idOrdersInput.value = JSON.stringify(currentGlobalStoredOrders);
        this.timeSlot.value = JSON.stringify(pickingObjectTransfer);
    }

    protected sortOrderArray(orders) {
        let collator = new Intl.Collator(undefined, {numeric: true, sensitivity: 'base'});
        return orders.sort(collator.compare);
    }

    protected removeIdOrder(idOrdersList, idOrderToBeRemoved): number[] {

        let indexOfOrderToBeRemoved = idOrdersList.indexOf(parseInt(idOrderToBeRemoved));
        if (indexOfOrderToBeRemoved > -1) {
            idOrdersList.splice(indexOfOrderToBeRemoved, 1);
        }

        return idOrdersList;
    }

}
