import Component from 'ShopUi/models/component';
import $ from 'jquery/dist/jquery';

export default class OrderItemAbholung extends Component {
    protected waitingTime: HTMLInputElement;
    protected filteringCheckbox: HTMLInputElement;
    protected order: HTMLElement;
    protected queuedOrder: HTMLElement;
    protected queuedOrderList = [];
    protected newCustomerInQueueInfo: HTMLElement;
    protected notificationMessageDelay: number = 3000;
    protected checkOrderInQueueDelay: number = 5000;
    protected containerScanInput: HTMLInputElement;
    protected containerScanCheckBoxID: HTMLInputElement;
    protected orderId: HTMLInputElement;
    protected lastOrderInQueueInput: HTMLInputElement;
    protected isOrderInQueue: Boolean;
    protected counterChecked = 0;

    protected readyCallback() {}

    protected init(): void {
        this.waitingTime = this.querySelector<HTMLInputElement>("#calculatedWaitingTime");
        this.queuedOrder = this.querySelector<HTMLElement>(".order-item-abholung__queued-time");
        this.newCustomerInQueueInfo = document.querySelector<HTMLElement>(".order-search__popup_notification-hidden");
        this.filteringCheckbox = document.querySelector<HTMLInputElement>('input[id="filter-queued-orders"]');
        this.order = this.querySelector<HTMLElement>(".order-item-abholung__pickup");
        this.containerScanInput = <HTMLInputElement>document.getElementById('containerInput');
        this.containerScanCheckBoxID = <HTMLInputElement>this.getElementsByClassName('checkbox__input');
        this.orderId = <HTMLInputElement>document.querySelector('input[name="idOrder"]');
        this.isOrderInQueue = <Boolean>document.querySelector('input[id="isOrderInQueue"]');
        this.lastOrderInQueueInput = <HTMLInputElement>document.querySelector('input[id="lastOrderInQueue"]');
        this.checkForWaitingQueue();
        setInterval(this.checkForWaitingQueue.bind(this), this.checkOrderInQueueDelay);
        this.mapEvents();
    }

    protected mapEvents(): void {
        let that = this;
        if(this.filteringCheckbox) {
            this.filteringCheckbox.addEventListener('change', function() {
                if(that.queuedOrder) {
                    if (this.checked && that.queuedOrder.innerHTML == "") {
                        that.order.style.display = "none";
                    } else {
                        that.order.style.display = "block";
                    }
                }
            });
        }

        if(this.containerScanInput){
            this.containerScanInput.addEventListener("change", function()
            {
                let inputValue = that.containerScanInput.value;
                let containerExists = false;
                let barcode = inputValue.replace('/x11', '').replace('/X11', '');

                for(let i = 0; i < that.containerScanCheckBoxID.length; i++)
                {
                    let containerId = that.containerScanCheckBoxID[i].attributes[2].value;
                    if(barcode === containerId)
                    {
                        that.containerScanCheckBoxID[i].checked = true;
                        if(that.isOrderInQueue.value == true) {
                            that.countCheckedContainers();
                        }
                        containerExists = true;
                        break;
                    }
                }
                if(containerExists === false)
                {
                    alert("This container is not part of the order!");
                }
                that.containerScanInput.value = "";
            });
        }

        if(this.isOrderInQueue && this.isOrderInQueue.value == true) {
            if (this.containerScanCheckBoxID) {
                for (let i = 0; i < this.containerScanCheckBoxID.length; i++) {
                    this.containerScanCheckBoxID[i].addEventListener("change", function() {
                        that.countCheckedContainers();
                    });
                }
            }
        }
    }

    protected checkForWaitingQueue(): void
    {
        let currentTime = new Date().getTime();
        let timeAfterWaiting = this.waitingTime.value * 1000;
        if (currentTime > timeAfterWaiting && this.waitingTime.value) {
            this.order.classList.add("order-item-abholung__pickup-alert");
        }
        if (this.lastOrderInQueueInput){
            this.checkForNewOrderInQueue();
        }
    }

    protected showPopupInfoIfInQueue(): void {
        this.newCustomerInQueueInfo.classList.remove('order-search__popup_notification-hidden');
        setTimeout(() => {
            this.newCustomerInQueueInfo.classList.add('order-search__popup_notification-hidden');
        }, this.notificationMessageDelay);
    }

    protected countCheckedContainers(): void {
        let urlCheck = window.location.origin + "/picker/collect-by-customer/check-containers";
        const sizeOfCheckedContainers = this.containerScanCheckBoxID.length;
        let checkedContainers;

        if(this.counterChecked > 0) {
            this.counterChecked = 0;
        }

        for(let i = 0; i < sizeOfCheckedContainers; i++) {
            if (this.containerScanCheckBoxID[i].checked == true){
                this.counterChecked++;
            }
            checkedContainers = this.counterChecked;
        }

        let orderData = {};
        orderData["no_of_containers_total"] = this.containerScanCheckBoxID.length;
        orderData["no_of_containers_collected"] = checkedContainers;
        let dataToSend = {};
        let flag = "checkedContainers";
        let orderId = this.orderId.value;
        dataToSend['order_data'] = orderData;
        dataToSend['flag'] = flag;
        dataToSend['order_id'] = orderId;

        $.ajax({
            type : "POST",
            url  : urlCheck,
            data : dataToSend,
            success: function(res){
                let errorMsg = res.errorMessage;

                if (errorMsg != "") {
                    alert(errorMsg);

                    return;
                }
            },
        });
    }

    protected checkForNewOrderInQueue(){
        let urlCheck = window.location.origin + "/picker/collect-by-customer/new-queue-check";
        let dataToSend = {};
        dataToSend['lastId'] = this.lastOrderInQueueInput.value;
        let that = this;
        $.ajax({
            type : "POST",
            url  : urlCheck,
            data : dataToSend,
            success: function(res){
                let errorMsg = res.errorMessage;
                let lastId = res.lastId;
                if (errorMsg != "") {
                    alert(errorMsg);
                    return;
                }
                if (that.lastOrderInQueueInput.value === '') {
                    that.lastOrderInQueueInput.value = lastId;
                } else if (lastId > that.lastOrderInQueueInput.value) {
                    that.lastOrderInQueueInput.value = lastId;
                    that.showPopupInfoIfInQueue();
                }
            },
        });
    }
}
