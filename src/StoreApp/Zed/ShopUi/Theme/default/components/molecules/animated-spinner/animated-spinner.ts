import Component from 'ShopUi/models/component';
import $ from 'jquery';

export default class AnimatedSpinner extends Component {
    triggers: HTMLElement[];

    protected readyCallback(): void {
        this.triggers = <HTMLElement[]>Array.from(document.getElementsByClassName(this.triggerClassName));
        this.mapEvents();
    }

    protected mapEvents(): void {
        this.triggers.forEach(trigger =>
            trigger.addEventListener('click', () => this.onClickHandler())
        )
    }

    protected onClickHandler(): void {
        $(this).fadeIn();
    }

    protected get triggerClassName(): string {
        return this.getAttribute('trigger-class-name');
    }
}
