import Component from 'ShopUi/models/component';
import $ from 'jquery/dist/jquery';

export default class PopupUiLoginForm extends Component {
    protected $this: $ = $(this);
    protected linkToLoginModal;
    protected linkToLoginModalMobile;
    protected closeModalBtn;
    protected isUserLoggedIn;
    protected gigyaLayoutRow;
    protected gigyaUsernameDiv;
    protected gigyaPasswordDiv;
    protected submitButton;
    protected registerText;
    protected closeResetPasswordIcon;
    protected closeResetPasswordBtn;
    protected submitButtonResetPassword;
    protected emailOrCardNumber;
    protected eyeIconDE;
    protected myAccountDE;
    protected passwordInputDE;
    protected popupUiLoginForm;

    protected forgotenPassword;

    protected mailInputField;

    private isAppended = false;

    // implementing flash messages
    protected flashMessage;
    protected fmTitle;
    protected fmMessage;
    protected fmLink;
    protected resetPasswordFormHolder;
    protected loginFormHolder;

    protected whichCountry;

    protected readyCallback(): void {
        this.linkToLoginModal = document.getElementById(this.getLinkToLoginForm);
        this.linkToLoginModalMobile = document.getElementsByClassName(this.getLinkToLoginForm)[0];
        this.closeModalBtn = this.$this.find(this.closeButtonSelector);
        this.gigyaLayoutRow = document.getElementsByClassName(this.getGigyaLayoutRow);
        this.gigyaUsernameDiv = document.getElementsByClassName(this.getGigyaUsernameDiv);
        this.gigyaPasswordDiv = document.getElementsByClassName(this.getGigyaPasswordDiv);
        this.registerText = document.getElementsByClassName(this.getRegisterText);
        this.forgotenPassword = document.getElementsByClassName(this.getForgotenPassword);
        this.submitButton = document.getElementsByClassName(this.getSubmitButton);
        this.isUserLoggedIn = document.getElementById(this.getIsUserLoggedIn);
        this.mailInputField = document.getElementsByClassName(this.getMailInputField);
        this.whichCountry = document.getElementById(this.getWhichCountry);
        this.resetPasswordFormHolder = document.querySelector('#reset-password-form-holder');
        this.loginFormHolder = document.querySelector('#login-form-holder');
        this.closeResetPasswordIcon = document.querySelector('.close-reset-password-icon');
        this.closeResetPasswordBtn = document.querySelector('.btn-return-sign-in');
        this.submitButtonResetPassword = this.resetPasswordFormHolder.querySelector('.submit-form');
        this.emailOrCardNumber = document.querySelector('#txt_email_or_card');
        this.eyeIconDE = document.getElementById(this.getEyeIconDE);
        this.passwordInputDE = document.getElementsByClassName(this.getPasswordInputDE)[8];
        this.popupUiLoginForm = document.getElementsByClassName(this.getPopupUiLoginForm)[0];
        this.myAccountDE = document.querySelectorAll(this.getMyAccountDE);

        // flash message and all related to it
        this.flashMessage = document.getElementById(this.getFlashMessage);
        this.fmTitle = document.getElementById(this.getFlashMessageTitle);
        this.fmMessage = document.getElementById(this.getFlashMessageMessage);
        this.fmLink = document.getElementById(this.getFlashMessageStaticLink);

        this.mapEvents();

    }

    protected mapEvents(): void {
        if (this.linkToLoginModalMobile != undefined) {
            this.linkToLoginModalMobile.addEventListener('click', () => {
                this.$this.addClass(`${this.name}--show`);

                if ($(this.whichCountry).val() === 'DE') {
                    if (!this.isAppended) {
                        this.appendToLoginForm();
                        this.isAppended = true;
                    }
                }

            });
        }

        this.closeResetPasswordIcon.addEventListener('click', () => {
            this.loginFormHolder.style.display = 'block';
            this.resetPasswordFormHolder.style.display = 'none';
            this.classList.add('popup-ui-login-form--show');
        })
        this.closeResetPasswordBtn.addEventListener('click', () => {
            this.loginFormHolder.style.display = 'block';
            this.resetPasswordFormHolder.style.display = 'none';
            this.classList.add('popup-ui-login-form--show');
        })

        this.submitButtonResetPassword.addEventListener('click', () => {
            const email = this.emailOrCardNumber.value;
            this.globusApiCall(email);
        })

        if (this.linkToLoginModal != undefined) {
            this.linkToLoginModal.addEventListener('click', () => {
                if (this.gigyaUsernameDiv.item(0) != undefined) {
                    if (this.isUserLoggedIn.value === 'true') {
                        location.href = 'customer/overview';
                    } else {
                        this.$this.addClass(`${this.name}--show`);

                        if ($(this.whichCountry).val() === 'DE') {
                            if (!this.isAppended) {
                                this.appendToLoginForm();
                                this.isAppended = true;
                            }
                        }

                    }
                }
            });
        }

        this.closeModalBtn.on('click', () => {
            this.$this.toggleClass(this.showClass);
        });

        this.myAccountDE.forEach(element => element.addEventListener('click', () => {
            setTimeout(() => {
                this.eyeIconDE = document.getElementById(this.getEyeIconDE);
                this.passwordInputDE = document.getElementsByClassName(this.getPasswordInputDE)[8];
                if (this.eyeIconDE){
                    this.eyeIconDE.addEventListener('click', () => {
                        if(this.passwordInputDE.type == "password"){
                            this.passwordInputDE.type = "textbox";
                            this.eyeIconDE.classList.add("icon-eyeclosed");
                        }
                        else if(this.passwordInputDE.type == "text"){
                            this.passwordInputDE.type = "password";
                            this.eyeIconDE.classList.remove("icon-eyeclosed");
                        }
                    });
                }else{
                    console.log('Can not get eye icon element');
                }
            }, 500);
        }));
    }

    protected appendToLoginForm(): void {
        // prepending Labels
        const starSpan = document.createElement('span');
        starSpan.setAttribute('class', 'login-modal-star');
        starSpan.textContent = '*';

        const usernameLabel = document.createElement('label');
        usernameLabel.setAttribute('for', 'username');
        usernameLabel.setAttribute('id', 'usernameLabel');
        usernameLabel.textContent = 'E-Mail-Adresse oder Kundenkartennummer ';
        usernameLabel.append(starSpan);

        const popupLoginEyeIcon = document.createElement('span');
        popupLoginEyeIcon.setAttribute('id', 'popupLoginEyeIconDE');
        popupLoginEyeIcon.classList.add('icon-eye', 'popup-login-eye-icon');

        const starSpanPass = document.createElement('span');
        starSpanPass.setAttribute('class', 'login-modal-star');
        starSpanPass.textContent = '*';

        const passwordLabel = document.createElement('label');
        passwordLabel.setAttribute('for', 'password');
        passwordLabel.setAttribute('id', 'passwordLabel');
        passwordLabel.textContent = 'Passwort ';
        passwordLabel.append(starSpanPass);

        this.gigyaUsernameDiv.item(1).prepend(usernameLabel);

        this.gigyaPasswordDiv.item(8).prepend(popupLoginEyeIcon);

        this.gigyaPasswordDiv.item(8).prepend(passwordLabel);

        // appending Password forget link
        const passwordForgetLink = document.createElement('a');
        passwordForgetLink.setAttribute('id', 'password-forget-link');
        passwordForgetLink.setAttribute('href', '#');
        passwordForgetLink.textContent = 'Passwort vergessen?';
        passwordForgetLink.style.float = 'left';
        // $(passwordForgetLink).css('padding-bottom', '0.7rem');
        $(passwordForgetLink).css('padding', '10px 15px');
        this.gigyaLayoutRow.item(158).append(passwordForgetLink);
        passwordForgetLink.addEventListener('click', event => {
            this.loginFormHolder.style.display = 'none';
            this.resetPasswordFormHolder.style.display = 'block';
        });

        // bottom line horizontal line
        $(this.gigyaUsernameDiv).parent().css('position', 'relative');
        $(this.gigyaUsernameDiv).parent().css('border-bottom-style', 'solid');
        $(this.gigyaUsernameDiv).parent().css('border-bottom-color', '#CDCFCC');
        $(this.gigyaUsernameDiv).parent().css('border-bottom-width', '1px');

        const textSpan = document.createElement('span');
        textSpan.setAttribute('class', 'span-in-link');
        textSpan.textContent = 'Neu beim Abholservice? ';

        // registriren link
        const registerLink = document.createElement('a');
        registerLink.setAttribute('id', 'register-now-link');
        registerLink.setAttribute('href', '/register');
        registerLink.text = 'Jetzt registrieren';
        $(registerLink).css('cursor', 'pointer');

        // placing register link in first div that comes after horizontal line
        const divForLink = document.createElement('div');
        divForLink.setAttribute('class', 'gigya-layout-row');
        divForLink.setAttribute('display', 'inline-flex');
        $(divForLink).css('text-align', 'left');
        $(divForLink).css('padding', '10px 15px');
        divForLink.append(textSpan);
        divForLink.append(registerLink);

        $(this.gigyaLayoutRow.item(159)).prepend(divForLink);

        // changing tekst in button ??
        $(this.submitButton.item(11)).parent().attr('style', 'padding-bottom: 5px !important');

    }

    triggerPopup(event?: Event): void {
        if (event) {
            event.preventDefault();
        }
        this.$this.toggleClass(this.showClass);
    }

    private changeTextInSubmitButton(): void {
        // seting weiter in submit button
        setTimeout(() => {
            if (this.submitButton.item(11) != undefined){
                this.submitButton.item(11).value = 'Weiter';
            }}, 130);
    }

    // function to call Globus API and to show toaster message for failure or success
    private globusApiCall(email: string)
    {
        const url = '/password/reset';
        const realUrl = 'https://api-dev.globus.de:443/v2/meinglobus/accounts/password/reset';
        const success = false;
        const localInstance = this;

        $.ajax(url, {
            type: 'POST',
            dataType: 'json',
            data: {
                id: email
            },
            success(data, status, xhr) {
                localInstance.showSuccessMessage();
            },
            error(jqXhr, textStatus, errorMessage) {
                localInstance.showErrorMessage();
            },
        });
    }

    showSuccessMessage()
    {
        $(this.flashMessage).parent().toggleClass(this.showMessage);
        $(this.flashMessage).removeClass('flash-message-error').addClass('flash-message-success');
        this.fmTitle.textContent = '';
        this.fmMessage.textContent = 'Ihnen wurde eine E-Mail zur Passwortänderung zugestellt. Bitte prüfen Sie Ihr Postfach.';
        this.fmLink.textContent = '';
        setTimeout(() => {
            this.closeFlashMessage();
            this.$this.toggleClass(this.showClass);
        }, 2000);
    }

    showErrorMessage() {
        $(this.flashMessage).parent().toggleClass(this.showMessage);
        $(this.flashMessage).removeClass('flash-message-success').addClass('flash-message-error');
        this.fmTitle.textContent = 'Error!';
        this.fmMessage.textContent = 'No account with selected email.';
        this.fmLink.textContent = 'OK!';
        setTimeout(() => {
            this.closeFlashMessage();
        }, 2000);
    }

    private closeFlashMessage() {
        $(this.flashMessage).parent().removeClass(this.showMessage);
    }

    // getters
    get showClass(): string {
        return `${this.name}--show`;
    }

    get showMessage(): string {
        return `pass-reset-flash-message--show`;
    }

    get closeButtonSelector(): string {
        return `.login-close-icon`;
    }

    get getLinkToLoginForm(): string {
        return 'link-to-login-modal';
    }

    get getGigyaLayoutRow(): string {
        return 'gigya-layout-row';
    }

    get getGigyaUsernameDiv(): string {
        return 'gigya-composite-control gigya-composite-control-textbox gigya-composite-control-loginID';
    }

    get getGigyaPasswordDiv(): string {
        return 'gigya-composite-control gigya-composite-control-password';
    }

    get getRegisterText(): string {
        return 'gigya-composite-control gigya-composite-control-link globus_register_link';
    }

    get getForgotenPassword(): string {
        return  'gigya-composite-control gigya-composite-control-link globus_pwforget_link';
    }

    get getSubmitButton(): string {
        return 'gigya-input-submit';
    }

    get getIsUserLoggedIn(): string {
        return 'is_user_logged_in';
    }

    get getMailInputField(): string {
        return 'gigya-input-text gigya-show-checkmark gigya-valid';
    }

    get getFlashMessage(): string {
        return 'pass_reset_flash_message';
    }

    get getFlashMessageStaticLink(): string {
        return 'flash-message-static-link';
    }

    get getFlashMessageTitle(): string {
        return 'flash-message-title';
    }

    get getFlashMessageMessage(): string {
        return 'flash-message-message';
    }

    get getWhichCountry(): string {
        return 'which_country';
    }

    get getEyeIconDE(): string {
        return 'popupLoginEyeIconDE';
    }

    get getPasswordInputDE(): string {
        return 'gigya-input-password';
    }

    get getPopupUiLoginForm(): string {
        return 'popup-ui-login-form';
    }

    get getMyAccountDE(): string {
        return '.link-to-login-modal';
    }
}
