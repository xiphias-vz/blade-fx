import Component from 'ShopUi/models/component';
import $ from 'jquery/dist/jquery';

export default class PopupUiLoginForm extends Component {
    protected $this: $ = $(this);
    protected linkToLoginModal;
    protected closeModalBtn;
    protected isUserLoggedIn;
    protected gigyaLayoutRow;
    protected gigyaUsernameDiv;
    protected gigyaPasswordDiv;
    protected submitButton;
    protected registerText;

    protected forgotenPassword;

    protected mailInputField;

    private isAppended = false;

    protected readyCallback(): void {
        this.linkToLoginModal = document.getElementById(this.getLinkToLoginForm);
        this.closeModalBtn = this.$this.find(this.closeButtonSelector);
        this.gigyaLayoutRow = document.getElementsByClassName(this.getGigyaLayoutRow);
        this.gigyaUsernameDiv = document.getElementsByClassName(this.getGigyaUsernameDiv);
        this.gigyaPasswordDiv = document.getElementsByClassName(this.getGigyaPasswordDiv);
        this.registerText = document.getElementsByClassName(this.getRegisterText);
        this.forgotenPassword = document.getElementsByClassName(this.getForgotenPassword);
        this.submitButton = document.getElementsByClassName(this.getSubmitButton);
        this.isUserLoggedIn = document.getElementById(this.getIsUserLoggedIn);
        this.mailInputField = document.getElementsByClassName(this.getMailInputField);

        this.mapEvents();

    }

    protected mapEvents(): void {

        if (this.linkToLoginModal != undefined) {
            this.linkToLoginModal.addEventListener('click', () => {
                if (this.gigyaUsernameDiv.item(0) != undefined) {
                    if (this.isUserLoggedIn.value === 'true') {
                        location.href = 'customer/overview';
                    } else {
                        this.$this.addClass(`${this.name}--show`);
                        if (!this.isAppended) {
                            this.appendToLoginForm();
                            this.isAppended = true;
                        }

                        this.changeTextInSubmitButton();
                    }
                }
            });
        }

        this.closeModalBtn.on('click', () => {
            this.$this.toggleClass(this.showClass);
        });
    }

    protected appendToLoginForm(): void {
        const starSpan = document.createElement('span');
        starSpan.setAttribute('class', 'login-modal-star');
        starSpan.textContent = '*';

        const usernameLabel = document.createElement('label');
        usernameLabel.setAttribute('for', 'username');
        usernameLabel.setAttribute('id', 'usernameLabel');
        usernameLabel.textContent = 'E-Mail-Adresse oder Kundenkartennummer ';
        usernameLabel.append(starSpan);

        const starSpanPass = document.createElement('span');
        starSpanPass.setAttribute('class', 'login-modal-star');
        starSpanPass.textContent = '*';

        const passwordLabel = document.createElement('label');
        passwordLabel.setAttribute('for', 'password');
        passwordLabel.setAttribute('id', 'passwordLabel');
        passwordLabel.textContent = 'Passwort ';
        passwordLabel.append(starSpanPass);

        this.gigyaUsernameDiv.item(1).prepend(usernameLabel);
        this.gigyaPasswordDiv.item(8).prepend(passwordLabel);

        const passwordForgetLink = document.createElement('a');
        passwordForgetLink.setAttribute('id', 'password-forget-link-my');
        passwordForgetLink.setAttribute('href', '#');
        passwordForgetLink.textContent = 'Passwort vergessen?';
        passwordForgetLink.style.float = 'left';
        $(passwordForgetLink).css('padding-bottom', '0.7rem');
        this.gigyaLayoutRow.item(158).append(passwordForgetLink);
        passwordForgetLink.addEventListener('click', () => {
            this.globusApiCall(this.mailInputField.item(0).value);
        });

        $(this.gigyaUsernameDiv).parent().css('position', 'relative');
        // $(this.gigyaUsernameDiv).parent().css('padding-bottom', '10px');
        $(this.gigyaUsernameDiv).parent().css('border-bottom-style', 'solid');
        $(this.gigyaUsernameDiv).parent().css('border-bottom-color', 'black');
        $(this.gigyaUsernameDiv).parent().css('border-bottom-width', '1px');

        const textSpan = document.createElement('span');
        textSpan.setAttribute('class', 'span-in-link');
        textSpan.textContent = '> Neu beim Abholservice? ';

        const registerLink = document.createElement('a');
        registerLink.setAttribute('id', 'register-now-link-in-modal');
        registerLink.setAttribute('href', '/register');
        registerLink.text = 'Jetzt registrieren';
        $(registerLink).css('cursor', 'pointer');

        const divForLink = document.createElement('div');
        divForLink.setAttribute('class', 'gigya-layout-row');
        divForLink.setAttribute('display', 'inline-flex');
        $(divForLink).css('text-align', 'left');
        $(divForLink).css('padding-top', '0.6rem');
        divForLink.append(textSpan);
        divForLink.append(registerLink);

        $(this.gigyaLayoutRow.item(159)).prepend(divForLink);

        this.submitButton.item(11).value = 'Weiter';
        this.submitButton.item(11).setAttribute('gigya-default-value', 'Weiter');
        $(this.submitButton.item(11)).parent().attr('style', 'padding-bottom: 5px !important');

    }

    triggerPopup(event?: Event): void {
        if (event) {
            event.preventDefault();
        }
        this.$this.toggleClass(this.showClass);
    }

    private changeTextInSubmitButton(): void {
        setTimeout(() => {
            if (this.submitButton.item(11) != undefined){
                this.submitButton.item(11).value = 'Weiter';
            } else {
            }
        }, 130);
    }

    private globusApiCall(mail: string)
    {
        const url = '/password/reset';

        $.ajax(url, {
            type: 'POST',
            dataType: 'application/json',
            data: {
                id: mail
            },
            success: function(data, status, xhr) {
                let response = JSON.parse(data);
                console.log("Success");
                alert('E-Mail zum Zurücksetzen Ihres Passworts wurde an Sie gesendet');
            },
            error: function(response) {
                console.log("Error");
                alert('Kein Konto mit dieser Mail');
            },
        });
    }

    get showClass(): string {
        return `${this.name}--show`;
    }

    get closeButtonSelector(): string {
        return `.${this.name}__close`;
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

}
