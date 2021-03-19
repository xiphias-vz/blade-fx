import Component from 'ShopUi/models/component';
import $ from 'jquery/dist/jquery';

export default class PopupUiError extends Component {
    protected $this: $ = $(this);
    public $openPopupButton: $;
    public $closeButton: $;
    public $submitButton: $;
    public $isErrorTrue: $;
    public isPopupErrorForPickingArticles: string;

    protected readyCallback(): void {
        this.$openPopupButton = this.$this.find(this.openPopupButton);
        this.$closeButton = this.$this.find(this.closeButtonSelector);
        this.$submitButton = this.$this.find(this.submitButtonSelector);
        this.$isErrorTrue = this.$this.find('.error-holder');
        this.isPopupErrorForPickingArticles = this.querySelector('.error-holder').getAttribute('isPopUpErrorForPickingArticles');
        this.mapEvents();
    }

    protected mapEvents(): void {

        if(this.isPopupErrorForPickingArticles == "1") {
            this.$closeButton.on('click', (event: Event) => this.triggerPopupWithClearingInputField(event));
        }
        else if(this.isPopupErrorForPickingArticles == "2"){
            this.$closeButton.on('click', (event: Event) => this.triggerPopupWithClearingInputFieldForContainer(event));
        }
        else {
            this.$closeButton.on('click', (event: Event) => this.triggerPopup(event));
        }

        if (this.isCloseOnSubmit) {
            this.$submitButton.on('click', () => this.triggerPopup());
        }

        if(this.$isErrorTrue.attr('error') == 1) {
            this.triggerPopup();
        }

        if (this.$openPopupButton.length) {
            this.$openPopupButton.on('click', (event: Event) => this.triggerPopup(event));
        }
    }
    public triggerPopupWithClearingInputFieldForContainer(event?: Event): void {
        this.$this.toggleClass(this.showClass);
        const scanInputField = $('#input_scanner');
        scanInputField.value = '';
        scanInputField.focus();
    }

    public triggerPopupWithClearingInputField(event?: Event): void {
        this.$this.toggleClass(this.showClass);
        const scanInputField = this.previousElementSibling.querySelector('#txt_container_scan');
        scanInputField.value = '';
        scanInputField.focus();
    }

    public triggerPopup(event?: Event): void {
        this.$this.toggleClass(this.showClass);
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
        return `.${this.jsName}__close`;
    }

    get isCloseOnSubmit(): boolean {
        return this.hasAttribute('close-on-submit');
    }
}
