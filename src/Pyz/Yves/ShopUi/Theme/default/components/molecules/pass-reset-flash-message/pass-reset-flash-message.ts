import Component from 'ShopUi/models/component';
import $ from 'jquery/dist/jquery';

export default class PassResetFlashMessage extends Component {
    protected $this: $ = $(this);
    protected flashMessage;
    protected meinKonto;
    protected passwordForgetLink;

    protected readyCallback(): void {
        this.flashMessage = document.getElementById(this.getFlashMessage);
        this.meinKonto = document.getElementById(this.getLinkToLoginModal);
        this.passwordForgetLink = document.getElementById(this.getPasswordForgetLink);

        this.mapEvents();
    }

    protected mapEvents(): void {
        if (this.meinKonto != undefined) {
            this.meinKonto.addEventListener('click',event => {
            });
        }
    }

    triggerPopup(event?: Event): void {
        if (event) {
            event.preventDefault();
        }

        this.$this.toggleClass(this.showClass);
    }

    get showClass(): string {
        return `${this.name}--show`;
    }

    get getFlashMessage(): string {
        return 'pass_reset_flash_message';
    }

    get getLinkToLoginModal(): string {
        return 'link-to-login-modal';
    }

    get getPasswordForgetLink(): string {
        return 'password-forget-link-my';
    }

    get getFlashMessageStaticLink(): string {
        return 'flash-message-static-link';
    }
}
