import Component from 'ShopUi/models/component';

export default class FormDynamicSubmitter extends Component {
    protected triggers: HTMLLinkElement[];
    protected form: HTMLFormElement;
    protected tokenInput: HTMLInputElement;

    protected readyCallback(): void {}

    protected init(): void {
        this.triggers = <HTMLLinkElement[]>Array.from(document.getElementsByClassName(this.triggerClassName));
        this.form = <HTMLFormElement>this.getElementsByTagName('form')[0];
        this.tokenInput = <HTMLInputElement>this.getElementsByClassName(this.tokenInputClassName)[0];

        this.mapEvents();
    }

    protected mapEvents(): void {
        this.triggers.forEach((trigger: HTMLLinkElement) => {
            trigger.addEventListener('click', (event: Event) => this.linkClickHandler(event, trigger));
        });
    }

    protected linkClickHandler(event: Event, link: HTMLLinkElement): void {
        event.preventDefault();
        this.submitForm(link.href, link.dataset.csrfToken);
    }

    protected submitForm(url: string, token: string): void {
        this.form.action = url;
        this.tokenInput.value = token;
        this.form.submit();
    }

    protected get triggerClassName(): string {
        return this.getAttribute('trigger-class-name');
    }

    protected get tokenInputClassName(): string {
        return `${this.jsName}__input-token`;
    }
}
