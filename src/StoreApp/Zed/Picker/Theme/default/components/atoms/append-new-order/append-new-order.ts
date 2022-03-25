import Component from 'ShopUi/models/component';
import $ from 'jquery/dist/jquery';

export default class AppendNewOrder extends Component {
    protected checkForNewOrderReadyForCollectionTimeInterval: number = 15000;
    protected checkForNewOrderInQueueTimeInterval: number = 5000;
    protected notificationMessageDelay: number = 4000;
    protected lastOrderInQueueInput: HTMLInputElement;
    protected newCustomerInQueueInfo: HTMLElement;

    protected readyCallback() {}

    protected init(): void {
        this.newCustomerInQueueInfo = document.querySelector<HTMLElement>(this.getNewOrderInQueueNotificationClass);
        this.lastOrderInQueueInput = <HTMLInputElement>document.querySelector(this.getLastOrderInQueueInputId);
        this.checkForNewOrderInQueue();
        setInterval(this.checkForNewPickUps, this.checkForNewOrderReadyForCollectionTimeInterval);
        setInterval(this.checkForNewOrderInQueue.bind(this), this.checkForNewOrderInQueueTimeInterval);
    }

    protected checkForNewPickUps(): void {
        const url = window.location.origin + '/picker/collect-by-customer/provideListOfOrders';

        $.ajax(url, {
            type: 'post',
            dataType: 'json',
            success(data, status, xhr) {
                if (data.newOrders) {
                    window.location.reload();
                }
            }
        });
    }

    protected checkForNewOrderInQueue(){
        const urlCheck = window.location.origin + '/picker/collect-by-customer/new-queue-check';
        const dataToSend = {};
        dataToSend.lastId = this.lastOrderInQueueInput.value;
        const that = this;
        $.ajax(urlCheck, {
            type : 'POST',
            dataType: 'json',
            data : dataToSend,
            success(response, status, xhr){
                const errorMsg = response.errorMessage;
                const lastId = response.lastId;
                if (errorMsg !== '') {
                    alert(errorMsg);

                    return;
                }
                if (that.lastOrderInQueueInput.value === '') {
                    that.lastOrderInQueueInput.value = lastId === null ? 0 : lastId;
                } else if (lastId > that.lastOrderInQueueInput.value) {
                    that.lastOrderInQueueInput.value = lastId;
                    that.showPopupInfoIfInQueue();
                }
            },
        });
    }

    protected showPopupInfoIfInQueue(): void {
        this.newCustomerInQueueInfo.classList.remove('order-search__popup_notification-hidden');
        setTimeout(() => {
            this.newCustomerInQueueInfo.classList.add('order-search__popup_notification-hidden');
        }, this.notificationMessageDelay);

        setTimeout(() => {
            window.location.reload();
        }, this.notificationMessageDelay);
    }

    get getNewOrderInQueueNotificationClass(): string {
        return '.order-search__popup_notification-hidden';
    }

    get getLastOrderInQueueInputId(): string {
        return 'input[id="lastOrderInQueue"]';
    }
}
