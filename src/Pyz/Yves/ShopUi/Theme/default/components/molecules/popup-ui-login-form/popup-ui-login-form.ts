import Component from 'ShopUi/models/component';
import $ from 'jquery/dist/jquery';

const EVENT_TOGGLE_FORM = 'toggleForm';

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
        // prepending Labels
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

        // Appending Password forget link
        const passwordForgetLink = document.createElement('a');
        passwordForgetLink.setAttribute('id', 'password-forget-link-my');
        passwordForgetLink.setAttribute('href', '#');
        passwordForgetLink.textContent = 'Passwort vergessen?';
        passwordForgetLink.style.float = 'left';
        this.gigyaLayoutRow.item(158).append(passwordForgetLink);
        passwordForgetLink.addEventListener('click', () => {
            this.globusApiCall(this.mailInputField.item(0).value);
        });

        // bottom line horizontal line
        $(this.gigyaUsernameDiv).parent().css('position', 'relative');
        $(this.gigyaUsernameDiv).parent().css('padding-bottom', '10px');
        $(this.gigyaUsernameDiv).parent().css('border-bottom-style', 'solid');
        $(this.gigyaUsernameDiv).parent().css('border-bottom-color', 'black');
        $(this.gigyaUsernameDiv).parent().css('border-bottom-width', '1px');

        // positioning forget password link //this code is not needed
        $(this.forgotenPassword.item(1)).css('text-align', 'left');
        $(this.forgotenPassword.item(1)).css('position', 'absolute');
        $(this.forgotenPassword.item(1)).css('bottom', '15px');

        // styling "jetzt registrieren" link
        const textSpan = document.createElement('span');
        textSpan.setAttribute('class', 'span-in-link');
        textSpan.textContent = '> Neu beim Abholservice? ';

        // registriren link
        $(this.registerText.item(1)).parent().prepend(textSpan);
        $(this.registerText.item(1)).parent().css('display', 'inline-flex');
        this.registerText.item(1).setAttribute('id', 'register-now-link-in-modal');
        this.registerText.item(1).text = 'Jetzt registrieren';
        this.registerText.item(1).removeAttribute('href');
        this.registerText.item(1).setAttribute('href', '/register');

        $(this.registerText.item(1)).css('cursor', 'pointer');

        // changing tekst in button
        this.submitButton.item(11).value = 'Weiter';
        // this.submitButton.item(11).removeAttribute('')
        this.submitButton.item(11).setAttribute('gigya-default-value', 'Weiter');

    }

    triggerPopup(event?: Event): void {
        if (event) {
            event.preventDefault();
        }
        this.$this.toggleClass(this.showClass);
    }

    private changeTextInSubmitButton():void {
        // seting weiter in submit button
        setTimeout(() => {
            if (this.submitButton.item(11) != undefined){
                this.submitButton.item(11).value = 'Weiter';
            } else {
                //console.log("Submit button is null");
            }
        }, 130);
    }

    // function to call Globus API and to show toaster message for failure or success
    private globusApiCall(mail: string)
    {
        // https://api-dev.globus.de:443/v2/meinglobus/accounts/password/reset
        const url = '/password/reset';

        $.ajax(url, {
            type: 'POST',
            dataType: 'application/json',
            data: {
                id: mail
            },
            success: function(data, status, xhr) {
                //let response = JSON.parse(data);
                /*console.log(data);
                console.log(status);
                console.log(xhr);
                console.log("Success");
                console.log(response);*/
                alert('E-Mail zum Zurücksetzen Ihres Passworts wurde an Sie gesendet');
            },
            error: function(response) {
                /*console.log(response);
                console.log("Error");*/
                alert('Kein Konto mit dieser Mail');
            },
        });
    }

    // GETTERS
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
