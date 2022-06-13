import Component from 'ShopUi/models/component';
import $ from 'jquery/dist/jquery';

export default class PopupUiLoginFormCz extends Component {
    protected $this: $ = $(this);
    protected linkToLoginModal;
    protected linkToLoginModalMobile;
    protected closeModalBtn;
    protected passwordInputField;
    protected eyeIcon;

    protected readyCallback(): void {
        this.linkToLoginModalMobile = document.getElementsByClassName(this.getLinkToLoginModal)[0];
        this.linkToLoginModal = document.getElementById(this.getLinkToLoginModal);
        this.closeModalBtn = this.$this.find(this.closeButtonSelector);
        this.passwordInputField = document.getElementById(this.getPasswordInputField);
        this.eyeIcon = document.getElementById(this.getEyeIcon);
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
                this.$this.addClass(`${this.name}--show`);
            });
        }

        this.closeModalBtn.on('click', () => {
            this.$this.toggleClass(this.showClass);
        });

        this.eyeIcon?.addEventListener('click', () => {
            if(this.passwordInputField !== 'undefined'){
                if(this.passwordInputField.type === "password"){
                    this.passwordInputField.type = "textbox";
                    this.eyeIcon.classList.add("icon-eyeclosed");
                }
                else if(this.passwordInputField.type === "text"){
                    this.passwordInputField.type = "password";
                    this.eyeIcon.classList.remove("icon-eyeclosed");
                }
            }
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
    get getPasswordInputField(): string {
        return 'loginForm_password';
    }
    get getEyeIcon(): string {
        return 'eye-icon-password-cz';
    }
}
