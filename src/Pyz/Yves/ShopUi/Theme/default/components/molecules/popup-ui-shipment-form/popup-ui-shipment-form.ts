import Component from 'ShopUi/models/component';
import $ from 'jquery/dist/jquery';

export default class PopupUiShipmentForm extends Component {
    protected $this: $ = $(this);
    protected linkToTimeSlots;
    protected linkToTimeSlotsMobile;
    protected closeModalBtn;
    protected mainContentContainer;
    protected slickTrack;
    protected timeSlotData;
    protected btnSlickPrevious;
    protected btnSlickNext;
    protected daysCounter;
    protected currentItemForMobile;
    protected lastOperation;
    pickUpTimes: HTMLInputElement;
    footerMessage: HTMLInputElement;
    locale: HTMLInputElement;
    todayTranslation: HTMLInputElement;
    codeBucket: HTMLInputElement;


    protected readyCallback(): void {
        this.linkToTimeSlots = document.getElementById(this.getLinkToTimeSlots);
        this.linkToTimeSlotsMobile = document.getElementById(this.getLinkToTimeSlotsMobile);
        this.closeModalBtn = this.$this.find(this.closeButtonSelector);
        this.mainContentContainer = this.$this.find(this.getMainContentContainer);
        this.currentItemForMobile = 0;
        this.pickUpTimes = <HTMLInputElement>document.querySelector('#pickup_times');
        this.footerMessage = <HTMLInputElement>document.querySelector('#footer_message');
        this.todayTranslation = <HTMLInputElement>document.querySelector('#today_translation');
        this.locale = <HTMLInputElement>document.querySelector('#locale');
        this.codeBucket = <HTMLInputElement>document.querySelector(this.getCodeBucket)

        this.mapEvents();
    }

    protected mapEvents(): void {

        if(this.linkToTimeSlots != null ){
            this.linkToTimeSlots.addEventListener('click', () => {
                this.$this.addClass(`${this.name}--show`);
                this.sendRequest();
            });
        }

        if(this.linkToTimeSlotsMobile != null ){
            this.linkToTimeSlotsMobile.addEventListener('click', () => {
                $(".js-page-layout-main__side-drawer-trigger").click()
                this.$this.addClass(`${this.name}--show`);
                this.sendRequest();
            });
        }

        this.closeModalBtn.on('click', () => {
            this.$this.toggleClass(this.showClass);
            this.mainContentContainer.empty();
        });

    }

    public triggerPopup(event?: Event): void {
        if (event) {
            event.preventDefault();
        }

        this.$this.toggleClass(this.showClass);
    }

    protected async sendRequest(): Promise<void> {

        const url = "/checkout/time-slots-data";

        fetch(url, {method: 'POST'})
            .then(response => response.json())
            .then(parsedResponse => {

                if(parsedResponse != undefined && parsedResponse != []){
                    this.createTimeSlotsContainer(parsedResponse)
                }

            })
            .catch(error => {
            console.error(error);
        });

    }

    protected createTimeSlotsContainer(data): void {
        this.timeSlotData = data;
        let slickCarouselContainer;
        if(this.codeBucket.value === "DE") {
            slickCarouselContainer = $('<div class="grid"><article class="checkout-block checkout-block--shipment checkout-block--border-bottom-less grid col col--sm-12"><div class="col col--sm-12"><div class="popup-ui-shipment-form__container-slick js-slick-carousel__container js-list-switches__item slick-initialized slick-slider"><div class="popup-ui-shipment-form__top-left-title"><span>' + this.pickUpTimes.value + '</span></div><div class="popup-ui-shipment-form__time-slot-buttons"><button id="goToPreviousTimeSlot" class="slick-prev slick-arrow" aria-label="Previous" type="button">Previous</button><button id="goToNextTimeSlot" class="slick-next slick-arrow" aria-label="Next" type="button">Next</button></div><div class="popup-ui-shipment-form--timeslots"><div class="slick-popup-list draggable"><div class="slick-popup-track" style="opacity: 1; transform: translate3d(0px, 0px, 0px);"></div></div></div></div></div></article><div class="time-slot-info-text"><span>' + this.footerMessage.value + '</span></div></div>');
        } else {
            slickCarouselContainer = $('<div class="grid"><article class="checkout-block checkout-block--shipment checkout-block--border-bottom-less grid col col--sm-12 font-cz"><div class="col col--sm-12"><div class="popup-ui-shipment-form__container-slick js-slick-carousel__container js-list-switches__item slick-initialized slick-slider"><div class="popup-ui-shipment-form__top-left-title"><span>' + this.pickUpTimes.value + '</span></div><div class="popup-ui-shipment-form__time-slot-buttons"><button id="goToPreviousTimeSlot" class="slick-prev slick-arrow-cz" aria-label="Previous" type="button">Previous</button><button id="goToNextTimeSlot" class="slick-next slick-arrow-cz" aria-label="Next" type="button">Next</button></div><div class="popup-ui-shipment-form--timeslots-cz"><div class="slick-popup-list draggable"><div class="slick-popup-track" style="opacity: 1; transform: translate3d(0px, 0px, 0px);"></div></div></div></div></div></article><div class="time-slot-info-text"><span>' + this.footerMessage.value + '</span></div></div>');
        }
        slickCarouselContainer.appendTo(this.mainContentContainer);

        this.btnSlickPrevious = document.getElementById(this.getSlickPrevious);
        if(this.btnSlickPrevious != null ){
            this.btnSlickPrevious.addEventListener('click', () => {
                this.updateTimeSlotData(false);
            });
        }

        this.btnSlickNext = document.getElementById(this.getSlickNext);
        if(this.btnSlickNext != null ){
            this.btnSlickNext.addEventListener('click', () => {
                this.updateTimeSlotData(true);
            });
        }

        this.slickTrack = this.$this.find(this.getSlickTrack);

        this.daysCounter = 0;
        this.btnSlickPrevious.setAttribute("disabled","disabled");
        this.generateTimeSlotsData();
    }

    protected updateTimeSlotData(increment){
        this.slickTrack.empty();

        let data = this.timeSlotData;
        let numberOfItems = 3;
        let item = 0;
        let loopIterationsQuantity = 0;

        if ($(this).width() < 580) {
            numberOfItems = 1;
            if(this.lastOperation == "decrement"){
                this.currentItemForMobile++;
            }
            item = this.currentItemForMobile;
            loopIterationsQuantity = item + 1;
        }
        else{
            item = this.daysCounter % 5;
            loopIterationsQuantity = (this.daysCounter % 5) + numberOfItems;
        }


        if(increment){
            this.lastOperation = "increment";
            let numberOfItemsInc = 0;
            for(item; item < loopIterationsQuantity; item++){
                let dateInc = Object.keys(data)[item];
                if(dateInc != undefined){
                    let dateObj = new Date(dateInc);
                    let germanFormatDate = dateObj.toLocaleDateString(this.locale.value);
                    let slickSlideDaysContainer = $('<div class="slick-popup-slide slick-popup-current slick-popup-active col--md-4 col--sm-12" style="float: left;"><div class="spaceBetweenCol"><div class="popup-ui-shipment-form-popup__column spacing-bottom spacing-bottom--biggest" style="width: 100%; display: inline-block;overflow-x: hidden;overflow-y: scroll;height: 400px;"><div class="popup-ui-shipment-form-popup__date">' + this.getDayName(dateInc) + ', ' + germanFormatDate + '</div><div class="slots_' + dateInc + '"></div></div></div></div>');
                    slickSlideDaysContainer.appendTo(this.slickTrack);

                    let arrayOfTimeSlots = Object.values(data)[item] as Array<string>;

                    for (const time_slot in arrayOfTimeSlots) {
                        let findEl = this.$this.find('.slots_' + dateInc);
                        let slickSlideHoursContainer = $('<div class="popup-ui-shipment-form__slot"><div class="popup-ui-shipment-form-popup__slot-label">' + Object.values(data)[item][time_slot] + '</div></div>');
                        slickSlideHoursContainer.appendTo(findEl);
                    }

                    this.currentItemForMobile++;
                    numberOfItemsInc++;
                }
            }
            this.daysCounter += numberOfItemsInc;
        }
        else{
            this.lastOperation = "decrement";
            let numberOfItemsDec = 0;
            if(item == 1){
                item = item-1;
            }
            else{
                item = item-2;
            }
            this.currentItemForMobile = item;

            for(item; item < loopIterationsQuantity; item++){
                let dateDec = Object.keys(data)[item];
                if(dateDec != undefined){
                    let dateObj = new Date(dateDec);
                    let germanFormatDate = dateObj.toLocaleDateString(this.locale.value);

                    let slickSlideDaysContainer = $('<div class="slick-popup-slide slick-popup-current slick-popup-active col--md-4 col--sm-12" style="float: left;"><div class="spaceBetweenCol"><div class="popup-ui-shipment-form-popup__column spacing-bottom spacing-bottom--biggest" style="width: 100%; display: inline-block;overflow-x: hidden;overflow-y: scroll;height: 400px;"><div class="popup-ui-shipment-form-popup__date">' + this.getDayName(dateDec) + ', ' + germanFormatDate + '</div><div class="slots_' + dateDec + '"></div></div></div></div>');
                    slickSlideDaysContainer.appendTo(this.slickTrack);

                    let arrayOfTimeSlots = Object.values(data)[item] as Array<string>;

                    for (const time_slot in arrayOfTimeSlots) {
                        let findEl = this.$this.find('.slots_' + dateDec);
                        let slickSlideHoursContainer = $('<div class="popup-ui-shipment-form__slot"><div class="popup-ui-shipment-form-popup__slot-label">' + Object.values(data)[item][time_slot] + '</div></div>');
                        slickSlideHoursContainer.appendTo(findEl);
                    }

                    numberOfItemsDec++;
                }
            }
            this.daysCounter -= numberOfItemsDec;
        }

        if($(this).width() < 580){
            if(this.currentItemForMobile < 1){
                this.btnSlickPrevious.setAttribute("disabled","disabled");
            }
            else {
                this.btnSlickPrevious.removeAttribute("disabled");
            }

            if(this.currentItemForMobile > 4){
                this.btnSlickNext.setAttribute("disabled","disabled");
            }
            else {
                this.btnSlickNext.removeAttribute("disabled");
            }
        }
        else{
            if(this.daysCounter < numberOfItems){
                this.btnSlickPrevious.setAttribute("disabled","disabled");
            }
            else {
                this.btnSlickPrevious.removeAttribute("disabled");
            }

            if(this.daysCounter > (numberOfItems + 1)){
                this.btnSlickNext.setAttribute("disabled","disabled");
            }
            else {
                this.btnSlickNext.removeAttribute("disabled");
            }
        }


        this.checkSize();

    }

    protected checkSize(): void {
        if ($(this).width() < 580) {

            let sel = $(".slick-popup-slide");

            if(sel != null){
                for(let i=0;i<sel.length;i++){
                    if(i == 0){
                        $('.slick-popup-slide')[i].style.display = "block";
                    }
                    else{
                        $('.slick-popup-slide')[i].style.display = "none";
                    }
                }
            }

        }
    }

    protected generateTimeSlotsData(): void {
        this.btnSlickPrevious.setAttribute("disabled","disabled");

        let data = this.timeSlotData;
        let maxDayCounter = this.daysCounter + 3;
        for (const property in data) {
            if(this.daysCounter < maxDayCounter){
                this.daysCounter++;

                let dateObj = new Date(property);
                let germanFormatDate = dateObj.toLocaleDateString(this.locale.value);

                let slickSlideDaysContainer = $('<div class="slick-popup-slide slick-popup-current slick-popup-active col--md-4 col--sm-12" style="float: left;"><div class="spaceBetweenCol"><div class="popup-ui-shipment-form-popup__column spacing-bottom spacing-bottom--biggest" style="width: 100%; display: inline-block;overflow-x: hidden;overflow-y: scroll;height: 400px;"><div class="popup-ui-shipment-form-popup__date">' + this.getDayName(property) + ', ' + germanFormatDate + '</div><div class="slots_' + property + '"></div></div></div></div>');
                slickSlideDaysContainer.appendTo(this.slickTrack);

                for (const time_slot in data[property]) {
                    let findEl = this.$this.find('.slots_' + property);
                    let slickSlideHoursContainer = $('<div class="popup-ui-shipment-form__slot"><div class="popup-ui-shipment-form-popup__slot-label">' + data[property][time_slot] + '</div></div>');
                    slickSlideHoursContainer.appendTo(findEl);
                }
            }
        }
        this.currentItemForMobile = 1;
        this.daysCounter = 2;
        this.checkSize();
    }

    protected uniqueByDateDay(arr){
        return arr.reduce((a, d) => {
            let date = d["date"];
            let day = this.getDayName(date)
            if (!a.includes(d["date"])) { a.push(date); }
            return a;
        }, []);
    }

    protected getDayName(dateStr)
    {
        let today = new Date();
        today.setHours(0,0,0,0);
        let date = new Date(dateStr);
        date.setHours(0,0,0,0);
        if(today.toISOString() === date.toISOString()){
            return this.todayTranslation.value;
        }
        return date.toLocaleDateString(this.locale.value, { weekday: 'long' });
    }

    get showClass(): string {
        return `${this.name}--show`;
    }

    get openPopupButton(): string {
        return `.${this.jsName}__open`;
    }

    get submitButtonSelector(): string {
        return `.${this.jsName}__submit`;
    }

    get closeButtonSelector(): string {
        return `.${this.name}__close`;
    }

    get isCloseOnSubmit(): boolean {
        return this.hasAttribute('close-on-submit');
    }

    get pickedCLass(): string {
        return `${this.name}--picked`;
    }

    get getMainContentContainer(): string {
        return `.${this.name}__content`;
    }

    get getSlickTrack(): string {
        return `.slick-popup-track`;
    }

    get getLinkToTimeSlots(): string {
        return `link-to-time-slots`;
    }

    get getLinkToTimeSlotsMobile(): string {
        return `link-to-time-slots-mobile`;
    }

    get getSlickPrevious(): string {
        return `goToPreviousTimeSlot`;
    }

    get getSlickNext(): string {
        return `goToNextTimeSlot`;
    }


    get getCodeBucket(): string {
        return "input[name=header-codebucket]";
    }



}
