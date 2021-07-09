import Component from 'ShopUi/models/component';
import $ from 'jquery/dist/jquery';

export default class PopupUiLoginFormCz extends Component {
    protected $this: $ = $(this);
    protected linkToLoginModal;
    protected linkToLoginModalMobile;
    protected closeModalBtn;

    protected readyCallback(): void {
        this.linkToLoginModalMobile = document.getElementsByClassName(this.getLinkToLoginModal)[0];
        this.linkToLoginModal = document.getElementById(this.getLinkToLoginModal);
        this.closeModalBtn = this.$this.find(this.closeButtonSelector);
        this.mapEvents();
    }

    protected mapEvents(): void {

        if (this.linkToLoginModalMobile != undefined){
            this.linkToLoginModalMobile.addEventListener('click', () => {
                this.$this.addClass(`${this.name}--show`);
            });
        }

        if (this.linkToLoginModal != undefined){
            this.linkToLoginModal.addEventListener('click', () => {
                alert("TJOS");
                this.$this.addClass(`${this.name}--show`);
            });
        }

        this.closeModalBtn.on('click', () => {
            this.$this.toggleClass(this.showClass);
        });

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

    get closeButtonSelector(): string {
        return `.${this.name}__close`;
    }

    get getLinkToLoginModal(): string {
        return `link-to-login-modal`;
    }

    get getIsUserLoggedIn(): string {
        return 'is_user_logged_in';
    }
}
