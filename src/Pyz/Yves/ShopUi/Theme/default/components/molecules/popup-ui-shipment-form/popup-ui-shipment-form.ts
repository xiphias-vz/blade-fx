import Component from 'ShopUi/models/component';
import $ from 'jquery/dist/jquery';

const EVENT_TOGGLE_FORM = 'toggleForm';
const TOP_LEFT_TITLE = 'Unsere verfügbaren Abholzeiten:';
const TIME_SLOT_INFO_TEXT = 'Der Globus Abholservice steht unseren Kunden an verschiedenen Standorten zur Verfügung. Wenn Sie Ihre Abholstation wechseln, beachten Sie bitte, dass die Produktauswahl, Preise und Abholzeitfenster variieren können.';

export default class PopupUiShipmentForm extends Component {
    protected $this: $ = $(this);
    protected linkToTimeSlots;
    protected linkToTimeSlotsMobile;
    protected closeModalBtn;
    protected mainContentContainer;
    protected slickTrack;
    protected timeSlotData;
    protected daysOfWeek;
    protected btnSlickPrevious;
    protected btnSlickNext;
    protected daysCounter;

    protected readyCallback(): void {
        this.daysOfWeek = ["Sonntag", "Montag", "Dienstag", "Mittwoch", "Donnerstag", "Freitag", "Samstag"];
        this.linkToTimeSlots = document.getElementById(this.getLinkToTimeSlots);
        this.linkToTimeSlotsMobile = document.getElementById(this.getLinkToTimeSlotsMobile);
        this.closeModalBtn = this.$this.find(this.closeButtonSelector);
        this.mainContentContainer = this.$this.find(this.getMainContentContainer);

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

                this.createTimeSlotsContainer(parsedResponse)

            })
            .catch(error => {
            console.error(error);
        });

    }

    protected createTimeSlotsContainer(data): void {
        this.timeSlotData = data;

        let slickCarouselContainer = $('<div class="grid"><article class="checkout-block checkout-block--shipment checkout-block--border-bottom-less grid col col--sm-12"><div class="col col--sm-12"><div class="popup-ui-shipment-form__container-slick js-slick-carousel__container js-list-switches__item slick-initialized slick-slider"><div class="popup-ui-shipment-form__top-left-title"><span>' + TOP_LEFT_TITLE + '</span></div><div class="popup-ui-shipment-form__time-slot-buttons"><button id="goToPreviousTimeSlot" class="slick-prev slick-arrow" aria-label="Previous" type="button">Previous</button><button id="goToNextTimeSlot" class="slick-next slick-arrow" aria-label="Next" type="button">Next</button></div><div class="popup-ui-shipment-form--timeslots"><div class="slick-popup-list draggable"><div class="slick-popup-track" style="opacity: 1; transform: translate3d(0px, 0px, 0px);"></div></div></div></div></div></article><div class="time-slot-info-text"><span>' + TIME_SLOT_INFO_TEXT + '</span></div></div>');
        slickCarouselContainer.appendTo(this.mainContentContainer);

        this.btnSlickPrevious = document.getElementById(this.getSlickPrevious);
        if(this.btnSlickPrevious != null ){
            this.btnSlickPrevious.addEventListener('click', () => {
                this.updateTimeSlotData(false);
                if(this.daysCounter < 1){
                    this.btnSlickPrevious.setAttribute("disabled","disabled");
                }
            });
        }

        this.btnSlickNext = document.getElementById(this.getSlickNext);
        if(this.btnSlickNext != null ){
            this.btnSlickNext.addEventListener('click', () => {
                this.updateTimeSlotData(true);
                if(this.daysCounter > (this.timeSlotData.length - 1)){
                    this.btnSlickNext.setAttribute("disabled","disabled");
                }
            });
        }

        this.slickTrack = this.$this.find(this.getSlickTrack);

        this.daysCounter = 0;
        this.btnSlickPrevious.setAttribute("disabled","disabled");
        this.generateTimeSlotsData();
    }

    protected updateTimeSlotData(increment){
        let data = this.timeSlotData;

        this.slickTrack.empty();
        let test = this.daysCounter % 5;
        if(increment){
            let numberOfItemsInc = 0;
            for(test; test < ((this.daysCounter % 5) + 3); test++){
                let dateInc = Object.keys(data)[test];
                if(dateInc != undefined){
                    let dateObj = new Date(dateInc);
                    let formatedDate = dateObj.getDay() + "." + (dateObj.getMonth() + 1) + "." + dateObj.getFullYear();

                    let slickSlideDaysContainer = $('<div class="slick-popup-slide slick-popup-current slick-popup-active col--md-4 col--sm-12" style="float: left;"><div class="spaceBetweenCol"><div class="popup-ui-shipment-form-popup__column spacing-bottom spacing-bottom--biggest" style="width: 100%; display: inline-block;"><div class="popup-ui-shipment-form-popup__date">' + this.getDayName(dateInc) + ', ' + dateInc + '</div><div class="slots_' + dateInc + '"></div></div></div></div>');
                    slickSlideDaysContainer.appendTo(this.slickTrack);

                    let arrayOfTimeSlots = Object.values(data)[test];

                    for (const time_slot in arrayOfTimeSlots) {
                        let findEl = this.$this.find('.slots_' + dateInc);
                        let slickSlideHoursContainer = $('<div class="popup-ui-shipment-form__slot"><div class="popup-ui-shipment-form-popup__slot-label">' + Object.values(data)[test][time_slot] + '</div></div>');
                        slickSlideHoursContainer.appendTo(findEl);
                    }

                    numberOfItemsInc++;
                }
            }
            this.daysCounter += numberOfItemsInc;
        }
        else{
            let numberOfItemsDec = 0;
            for(test; test < ((this.daysCounter % 5) + 3); test++){
                let dateDec = Object.keys(data)[test];
                if(dateDec != undefined){
                    let dateObj = new Date(dateDec);
                    let formatedDate = dateObj.getDay() + "." + (dateObj.getMonth() + 1) + "." + dateObj.getFullYear();

                    let slickSlideDaysContainer = $('<div class="slick-popup-slide slick-popup-current slick-popup-active col--md-4 col--sm-12" style="float: left;"><div class="spaceBetweenCol"><div class="popup-ui-shipment-form-popup__column spacing-bottom spacing-bottom--biggest" style="width: 100%; display: inline-block;"><div class="popup-ui-shipment-form-popup__date">' + this.getDayName(dateDec) + ', ' + dateDec + '</div><div class="slots_' + dateDec + '"></div></div></div></div>');
                    slickSlideDaysContainer.appendTo(this.slickTrack);

                    let arrayOfTimeSlots = Object.values(data)[test];

                    for (const time_slot in arrayOfTimeSlots) {
                        let findEl = this.$this.find('.slots_' + dateDec);
                        let slickSlideHoursContainer = $('<div class="popup-ui-shipment-form__slot"><div class="popup-ui-shipment-form-popup__slot-label">' + Object.values(data)[test][time_slot] + '</div></div>');
                        slickSlideHoursContainer.appendTo(findEl);
                    }

                    numberOfItemsDec++;
                }
            }
            this.daysCounter -= numberOfItemsDec;
        }

        if(this.daysCounter < 3){
            this.btnSlickPrevious.setAttribute("disabled","disabled");
        }
        else {
            this.btnSlickPrevious.removeAttribute("disabled");
        }

        if(this.daysCounter > 4){
            this.btnSlickNext.setAttribute("disabled","disabled");
        }
        else {
            this.btnSlickNext.removeAttribute("disabled");
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
                let formatedDate = dateObj.getDay() + "." + (dateObj.getMonth() + 1) + "." + dateObj.getFullYear();

                let slickSlideDaysContainer = $('<div class="slick-popup-slide slick-popup-current slick-popup-active col--md-4 col--sm-12" style="float: left;"><div class="spaceBetweenCol"><div class="popup-ui-shipment-form-popup__column spacing-bottom spacing-bottom--biggest" style="width: 100%; display: inline-block;"><div class="popup-ui-shipment-form-popup__date">' + this.getDayName(property) + ', ' + formatedDate + '</div><div class="slots_' + property + '"></div></div></div></div>');
                slickSlideDaysContainer.appendTo(this.slickTrack);

                for (const time_slot in data[property]) {
                    let findEl = this.$this.find('.slots_' + property);
                    let slickSlideHoursContainer = $('<div class="popup-ui-shipment-form__slot"><div class="popup-ui-shipment-form-popup__slot-label">' + data[property][time_slot] + '</div></div>');
                    slickSlideHoursContainer.appendTo(findEl);
                }
            }
        }
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
        let date = new Date(dateStr);
        return date.toLocaleDateString("de-DE", { weekday: 'long' });
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

}
