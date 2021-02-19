import Component from 'ShopUi/models/component';
import $ from 'jquery/dist/jquery';

export default class PopupUiError extends Component {
    protected $this: $ = $(this);
    public $openPopupButton: $;
    public $closeButton: $;
    public $submitButton: $;
    public $updateButton: $;

    protected readyCallback(): void {
        this.$openPopupButton = this.$this.find(this.openPopupButton);
        this.$closeButton = this.$this.find(this.closeButtonSelector);
        this.$submitButton = this.$this.find(this.submitButtonSelector);
        this.$updateButton = this.$this.find('.update-holder');
        this.mapEvents();
    }

    protected mapEvents(): void {
        this.$closeButton.on('click', (event: Event) => this.triggerPopup(event));

        if (this.isCloseOnSubmit) {
            this.$submitButton.on('click', () => this.triggerPopup());
        }

         if(this.$updateButton.attr('update') == 1) {
             this.triggerPopup();
         }

    }
    public triggerPopupWithAnimation(event?: Event) : void {
        this.$this.toggleClass(this.showClass);
        setTimeout(() => {
            this.$this.fadeOut('2000');
        }, 5000)

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
