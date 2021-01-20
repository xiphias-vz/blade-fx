import Component from 'ShopUi/models/component';
import $ from 'jquery/dist/jquery';

export default class PopupUiError extends Component {
    protected $this: $ = $(this);
    public $openPopupButton: $;
    public $closeButton: $;
    public $submitButton: $;
    public $isErrorTrue: $;

    protected readyCallback(): void {
        this.$openPopupButton = this.$this.find(this.openPopupButton);
        this.$closeButton = this.$this.find(this.closeButtonSelector);
        this.$submitButton = this.$this.find(this.submitButtonSelector);
        this.$isErrorTrue = this.$this.find('.error-holder');
        console.log(1);
        this.mapEvents();
    }

    protected mapEvents(): void {
        this.$closeButton.on('click', (event: Event) => this.triggerPopup(event));

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
