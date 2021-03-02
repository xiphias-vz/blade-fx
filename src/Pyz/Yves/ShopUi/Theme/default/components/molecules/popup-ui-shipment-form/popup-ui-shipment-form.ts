import Component from 'ShopUi/models/component';
import $ from 'jquery/dist/jquery';

export default class PopupUiShipmentForm extends Component {
    protected $this: $ = $(this);
    protected linkToTimeSlots;
    protected linkToTimeSlotsMobile;
    protected closeModalBtn;
    protected mainContentContainer;
    protected slickTrack;

    protected readyCallback(): void {
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

                this.createTimeSlotsData(parsedResponse.time_slots_capacity)

            }).catch(error => {
            console.error(error);
        });

    }

    protected createTimeSlotsData(data): void {

        let slickCarouselContainer = $('<div class="popup-ui-shipment-form--timeslots"><div class="slick-popup-list draggable"><div class="slick-popup-track" style="opacity: 1; transform: translate3d(0px, 0px, 0px);"></div></div></div>');
        slickCarouselContainer.appendTo(this.mainContentContainer);

        this.slickTrack = this.$this.find(this.getSlickTrack);

        let daysData = this.uniqueByDateDay(data);
        for(let day = 0; day < daysData.length; day++){
            let slickSlideDaysContainer = $('<div class="slick-popup-slide slick-popup-current slick-popup-active col--md-2 col--sm-12" style="float: left;"><div><div class="popup-ui-shipment-form-popup__column spacing-bottom spacing-bottom--biggest" style="width: 100%; display: inline-block;"><div class="popup-ui-shipment-form-popup__date">' + this.getDayName(daysData[day]) + ', ' + daysData[day] + '</div><div class="slots_' + daysData[day] + '"></div></div></div></div>');
            slickSlideDaysContainer.appendTo(this.slickTrack);
        }

        data.forEach((value, index) => {
            let findEl = this.$this.find('.slots_' + value.date);

            let slickSlideHoursContainer = $('<div class="popup-ui-shipment-form__slot"><div class="popup-ui-shipment-form-popup__slot-label">' + value.time_slot + '</div></div>');
            slickSlideHoursContainer.appendTo(findEl);
        });

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
        return date.toLocaleDateString("en-US", { weekday: 'long' });
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

}
