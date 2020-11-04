/* tslint:disable: no-any */
declare var Payone: any;
/* tslint:enable: no-any */
import EcoPayoneCreditCard from 'Payone/components/molecules/payone-credit-card/payone-credit-card';
import ScriptLoader from 'ShopUi/components/molecules/script-loader/script-loader';

const VALID_RESPONSE_STATUS = 'VALID';
const CHECK_CALLBACK_ID = 'checkCallback';
const CURRENT_PAYMENT_METHOD = 'payoneCreditCard';

const defaultHostedIFramesConfig = {
    fields: {
        cardtype: {
            selector: 'cardtype',
            cardtypes: ['V', 'M'],
        },
        cardpan: {
            selector: 'cardpan',
            type: 'text',
        },
        cardcvc2: {
            selector: 'cardcvc2',
            type: 'password',
            size: '3',
            maxlength: '3',
            length: {V: 3, M: 3},
        },
        cardexpiremonth: {
            selector: 'cardexpiremonth',
            type: 'select',
            size: '2',
            maxlength: '2',
            iframe: {
                width: '100%',
            },
        },
        cardexpireyear: {
            selector: 'cardexpireyear',
            type: 'select',
            iframe: {
                width: '100%',
            },
        },
    },

    defaultStyle: {
        input: `
            margin: 0;
            font-size: 0.9375rem;
            font-weight: 700;
            line-height: 1.125rem;
            font-family: sans-serif;
            height: 50px;
            width: 100%;
            border: 0.0625rem solid #dce0e5;
            padding: 0.5rem 0.5rem 0.75rem;
            color: #4a4a4a;
            border-radius: 0.125rem;
        `,
        inputFocus: `
            margin: 0;
            font-size: 0.9375rem;
            font-weight: 700;
            line-height: 1.125rem;
            font-family: sans-serif;
            height: 50px;
            width: 100%;
            border: 0.0625rem solid #dce0e5;
            padding: 0.5rem 0.5rem 0.75rem;
            color: #4a4a4a;
            border-radius: 0.125rem;
            outline: 0;
        `,
        select: `
            margin: 0;
            font-size: 0.875em;
            height: 50px;
            width: 100%;
            border: 0.0625rem solid #dce0e5;
            border-radius: 0.125rem;
            background-color: #fefefe;
        `,
        selectFocus: `
            margin: 0;
            font-size: 0.875em;
            height: 50px;
            width: 100%;
            border: 0.0625rem solid #dce0e5;
            border-radius: 0.125rem;
            background-color: #fefefe;
            outline: 0;
        `,
        iframe: {
            height: '56px',
            width: '100%',
            margin: 0,
        },
    },

    error: 'errorOutput',
};

export default class PayoneCreditCard extends EcoPayoneCreditCard {
    protected submitButton: HTMLButtonElement[];

    protected readyCallback(): void {
        this.scriptLoader = <ScriptLoader>this.querySelector('script-loader');
        this.form = <HTMLFormElement>document.querySelector(this.formSelector);
        this.cardHolderInput = <HTMLInputElement>this.querySelector(this.cardHolderSelector);
        this.clientApiConfigInput = <HTMLInputElement>this.querySelector(this.clientApiConfigSelector);
        this.languageInput = <HTMLInputElement>this.querySelector(this.languageSelector);
        this.pseudoCardPanInput = <HTMLInputElement>this.querySelector(this.pseudoCardPanSelector);
        this.errorElement = this.querySelector(this.errorContainer);

        this.mapEvents();

        this.submitButton = <HTMLButtonElement[]>Array.from(
            document.getElementsByClassName(`${this.jsName}__submit`)
        );

        this.submitButton.forEach(button => {
            button.addEventListener('click', (event: Event) => this.onSubmit(event));
        });
    }

    protected mapEvents(): void {
        this.scriptLoader.addEventListener('scriptload', (event: Event) => this.onScriptLoad(event));
        this.form.addEventListener('submit', (event: Event) => this.onSubmit(event));
    }

    protected enableSubmit(): void {
        this.submitButton.forEach(button => {
            button.removeAttribute('disabled');
        });
    }

    protected loadPayoneIFrame(): void {
        this.hostedIFramesApi = new Payone.ClientApi.HostedIFrames(this.hostedIFramesConfig, this.clientApiConfig);

        Payone.ClientApi.Language.de.placeholders.cardpan = '_ _ _ _  _ _ _ _  _ _ _ _  _ _ _ _';
        Payone.ClientApi.Language.de.placeholders.cvc = '• • •';
    }

    get hostedIFramesConfig(): Object {
        return {
            ...defaultHostedIFramesConfig,
            language: this.language
        };
    }

    protected onSubmit(event: Event): void {
        event.preventDefault();

        if (typeof this.isCurrentPaymentMethod === 'undefined') {
            this.enableSubmit();

            return;
        }

        if (!this.isCurrentPaymentMethod || this.isPaymentValid) {
            this.form.submit();
        }

        this.checkCreditCard();
    }

    protected checkCreditCard(): void {
        if (this.hostedIFramesApi.isComplete() && this.cardHolderInput.value) {
            this.hostedIFramesApi.creditCardCheck(CHECK_CALLBACK_ID);

            return;
        }

        this.errorElement.innerHTML = this.hostedIFramesConfig.language.transactionRejected;
        this.enableSubmit();
    }

    /* tslint:disable: no-any */
    protected async checkCallback(response: any): Promise<void> {
        /* tslint:enable: no-any */
        if (response.status !== VALID_RESPONSE_STATUS) {
            this.enableSubmit();

            return;
        }

        this.pseudoCardPanInput.value = await Promise.resolve(response.pseudocardpan);
        this.setPaymentToValid();
        this.form.submit();
    }

    get isCurrentPaymentMethod(): boolean | undefined {
        const currentPaymentMethodInput = <HTMLInputElement>document.querySelector(this.currentPaymentMethodSelector);

        return currentPaymentMethodInput?.value
            ? currentPaymentMethodInput.value === CURRENT_PAYMENT_METHOD
            : undefined;
    }
}
