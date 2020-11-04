import Component from 'ShopUi/models/component';

export default class ConfirmationModal extends Component {
    protected triggers: HTMLElement[];
    protected closeTriggers: HTMLElement[];

    protected readyCallback(): void {
        this.triggers = <HTMLElement[]>Array.from(document.getElementsByClassName(this.triggerClass));
        this.closeTriggers = <HTMLElement[]>Array.from(this.getElementsByClassName(this.closeTriggerClass));

        this.mapEvents();
    }

    protected mapEvents(): void {
        this.triggers.forEach(trigger => {
            trigger.addEventListener('click', (event: Event) => this.showModal(event));
        });
        this.closeTriggers.forEach(trigger => {
            trigger.addEventListener('click', () => this.closeModal());
        });
    }

    protected showModal(event: Event) {
        event.preventDefault();
        this.classList.add(this.activeClass);
        document.body.classList.add('is-not-scrollable');
    }

    protected closeModal() {
        this.classList.remove(this.activeClass);
        document.body.classList.remove('is-not-scrollable');
    }

    protected get triggerClass(): string {
        return this.getAttribute('trigger-class');
    }

    protected get closeTriggerClass(): string {
        return `${this.jsName}__close`;
    }

    protected get activeClass(): string {
        return `${this.name}--is-open`;
    }
}
