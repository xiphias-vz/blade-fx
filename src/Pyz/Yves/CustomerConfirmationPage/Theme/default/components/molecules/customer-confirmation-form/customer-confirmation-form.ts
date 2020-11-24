import Component from 'ShopUi/models/component';

const HIDDEN_CLASS_NAME = 'is-hidden';

export default class CustomerConfirmationForm extends Component {
    protected newPasswordInput: HTMLInputElement;
    protected phoneInput: HTMLInputElement;
    protected passwordHintHolder: HTMLElement;
    protected phoneHintHolder: HTMLElement;
    protected phoneErrorMessage: HTMLElement;
    protected submitButton: HTMLButtonElement;
    protected customerConfirmationForm: HTMLFormElement;
    protected thirdPartyRegistration: HTMLInputElement;

    protected readyCallback(): void {}

    protected init(): void {
        this.newPasswordInput = <HTMLInputElement>this.querySelector(this.newPasswordSelector);
        this.phoneInput = <HTMLInputElement>this.querySelector(this.phoneSelector);
        this.passwordHintHolder = <HTMLElement>this.getElementsByClassName(`${this.jsName}__password-criteria`)[0];
        this.phoneHintHolder = <HTMLElement>this.getElementsByClassName(`${this.jsName}__phone-criteria`)[0];
        this.phoneErrorMessage = <HTMLElement>this.getElementsByClassName(`${this.jsName}__phone-error`)[0];
        this.submitButton = <HTMLButtonElement>this.getElementsByClassName(`${this.jsName}__submit-button`)[0];
        this.thirdPartyRegistration = <HTMLInputElement>document.getElementsByName("registerForm[third_party_registration]")[1];
        this.customerConfirmationForm = <HTMLFormElement>this.getElementsByClassName(`${this.jsName}__form`)[0].children[0];
        this.mapEvents();
    }

    protected mapEvents(): void {
        if (this.newPasswordInput) {
            this.newPasswordInput.addEventListener('focus', () => this.showElement(this.passwordHintHolder));
            this.newPasswordInput.addEventListener('blur', () => this.hideElement(this.passwordHintHolder))
        }

        if (this.phoneInput) {
            this.phoneInput.addEventListener('focus', () => this.showElement(this.phoneHintHolder));
            this.phoneInput.addEventListener('blur', () => this.hideElement(this.phoneHintHolder));
            this.phoneInput.addEventListener('input', () => this.hideElement(this.phoneErrorMessage));
        }

        if (this.submitButton) {
            this.submitButton.addEventListener('click', (event: Event) => this.submitCustomerConfirmationForm(event));
        }

    }

    protected showElement(element: HTMLElement): void {
        element.classList.remove(HIDDEN_CLASS_NAME);
    }

    protected hideElement(element: HTMLElement): void {
        element.classList.add(HIDDEN_CLASS_NAME);
    }

    protected isPhoneNumberValid(): boolean {
        const pattern = /\(?\+\(?49\)?[ ()]?([- ()]?\d[- ()]?){10}/g;
        const phoneNumber = this.phoneInput.value;

        return pattern.test(phoneNumber);
    }

    protected submitCustomerConfirmationForm(event: Event): void {
        const isPhoneNumberValid = this.isPhoneNumberValid();
        if (isPhoneNumberValid) {
            if(this.thirdPartyRegistration.checked) {
                event.preventDefault();
                this.gigyaInitRegistration();
            } else {
                this.customerConfirmationForm.submit();
            }
            return;
        }

        event.preventDefault();
        this.showElement(this.phoneErrorMessage);
    }

    protected get formName(): string {
        return this.getAttribute('form-name');
    }

    protected get newPasswordSelector(): string {
        return this.getAttribute('new-password-selector');
    }

    protected get phoneSelector(): string {
        return this.getAttribute('phone-selector');
    }

    protected gigyaInitRegistration(): void {
        let params = {
            isLite: false,
            callback: this.gigyaInitRegistrationCallback,
        };
        try {
            gigya.accounts.initRegistration(params);
        } catch (e) {
            alert(e);
        }
    }

    protected gigyaInitRegistrationCallback(response): void {
        if (response.errorCode == 0) {
            let token = response.regToken;
            gigyaRegisterUser(token);
        } else {
            alert("There was an error!");
        }
    }
}
