import Component from 'ShopUi/models/component';

const EVENT_TOGGLE_FORM = 'toggleForm';

export default class ListSwitches extends Component {
    protected triggers: HTMLElement[];

    protected readyCallback(): void {}

    protected init(): void {
        this.triggers = <HTMLElement[]>Array.from(this.getElementsByClassName(`${this.jsName}__item`));

        this.mapEvents();
    }

    protected mapEvents(): void {
        this.triggers.forEach(trigger => {
            trigger.addEventListener('click', (event: Event) => this.createCustomEvent(event));
        });
    }

    createCustomEvent(event: Event): void {
        const target = event.currentTarget;
        this.dispatchCustomEvent(EVENT_TOGGLE_FORM, {targetClass: target.dataset.targetClass});
    }
}
