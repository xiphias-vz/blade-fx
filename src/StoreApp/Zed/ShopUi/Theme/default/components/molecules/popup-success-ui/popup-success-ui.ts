import Component from 'ShopUi/models/component';
import $ from 'jquery/dist/jquery';

export default class PopupSuccessUi extends Component {
    protected $this: $ = $(this);
    public $openPopupButton: $;
    public $closeButton: $;
    public $submitButton: $;
    public $isSuccessTrue: $;

    protected readyCallback(): void {
        this.$closeButton = this.$this.find(this.closeButtonSelector);
        this.$isSuccessTrue = this.$this.find('.success-holder');

        this.mapEvents();
    }

    protected mapEvents(): void {
        this.$closeButton.on('click', (event: Event) => this.triggerPopup(event));

        if(this.$isSuccessTrue.attr('success') == 1) {
            this.triggerPopupWithAnimation();
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
