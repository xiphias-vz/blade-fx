import Component from 'ShopUi/models/component';
import $ from 'jquery/dist/jquery';

export default class OrderItemAbholung extends Component {
    protected waitingTime: HTMLInputElement;
    protected containerNotPartOfOrder: HTMLInputElement;
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
    protected customerNote: HTMLElement;
    protected customerNoteInfo: HTMLElement;
    protected arrowToggle: HTMLElement;
    protected bottomInfo: HTMLElement;
    protected detailPage: HTMLInputElement;

    protected readyCallback() {}

    protected init(): void {
        this.waitingTime = this.querySelector<HTMLInputElement>("#calculatedWaitingTime");
        this.containerNotPartOfOrder = this.querySelector<HTMLInputElement>("#containerNotPartOfOrder");
        this.queuedOrder = this.querySelector<HTMLElement>(".order-item-abholung__queued-time");
        this.newCustomerInQueueInfo = document.querySelector<HTMLElement>(".order-search__popup_notification-hidden");
        this.filteringCheckbox = document.querySelector<HTMLInputElement>('input[id="filter-queued-orders"]');
        this.order = this.querySelector<HTMLElement>(".order-item-abholung__pickup");
        this.containerScanInput = <HTMLInputElement>document.getElementById('containerInput');
        this.containerScanCheckBoxID = <HTMLInputElement>this.getElementsByClassName('checkbox__input');
        this.orderId = <HTMLInputElement>document.querySelector('input[name="idOrder"]');
        this.isOrderInQueue = <Boolean>document.querySelector('input[id="isOrderInQueue"]');
        this.lastOrderInQueueInput = <HTMLInputElement>document.querySelector('input[id="lastOrderInQueue"]');
        this.customerNote = <HTMLElement>this.querySelector(".customer-info__cart-note");
        this.customerNoteInfo = <HTMLElement>this.querySelector(".customer-info__cart-note--info");
        this.arrowToggle = <HTMLElement>this.querySelector(".customer-info__chevron");
        this.bottomInfo = <HTMLElement>this.querySelector(".order-item-abholung__bottom-info");
        this.detailPage = <HTMLInputElement>document.querySelector('input[class="detail-page"]');
        this.removeHiddenClassIfCartNote();
        this.checkForWaitingQueue();
        setInterval(this.checkForWaitingQueue.bind(this), this.checkOrderInQueueDelay);

        if(this.bottomInfo) {
            if (!this.bottomInfo.childElementCount > 0) {
                this.bottomInfo.style.padding = "0";
            }
        }

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

        if(this.customerNoteInfo) {
            this.customerNoteInfo.addEventListener('click', function() {
                if (this.customerNote.classList.contains(this.hiddenClass)){
                    this.customerNote.classList.remove(this.hiddenClass)
                    this.arrowToggle.classList.add(this.rotatedClass);
                } else {
                    this.customerNote.classList.add(this.hiddenClass)
                    this.arrowToggle.classList.remove(this.rotatedClass);
                }
            }.bind(this));
        }

        if (this.order && this.detailPage.value !== "true") {
            this.order.addEventListener('click', function(event){
                let noteValue = that.customerNote.getAttribute('value');
                event.target.classList.forEach(item => {
                    if (!item.includes('customer-info')) {
                        let orderForm = <HTMLFormElement>that.order.querySelectorAll('.js-submit-form-handler__form');
                        orderForm[0].submit();
                    } else if(item.includes('customer-info') && noteValue !== "true"){
                        let orderForm = <HTMLFormElement>that.order.querySelectorAll('.js-submit-form-handler__form');
                        orderForm[0].submit();
                    }
                });
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
                    alert(that.containerNotPartOfOrder.value);
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

    protected removeHiddenClassIfCartNote (): void
    {
        let noteValue = this.customerNote.getAttribute('value');
        if(noteValue === "true") {
            this.customerNoteInfo.classList.remove(this.hiddenClass)
        }
    }


    protected checkForWaitingQueue(): void
    {
        let currentTime = new Date().getTime();
        let timeAfterWaiting = this.waitingTime.value * 1000;
        if (currentTime > timeAfterWaiting && this.waitingTime.value) {
            this.order.classList.remove("order-item-abholung__pickup-in-queue");
            this.order.classList.add("order-item-abholung__pickup-alert");
        } else if(this.queuedOrder && this.queuedOrder.innerText !== "") {
            this.order.classList.add("order-item-abholung__pickup-in-queue");
        }
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

    get hiddenClass(): string {
        return 'is-hidden';
    }

    get rotatedClass(): string {
        return 'customer-info__chevron-rotated';
    }
}
