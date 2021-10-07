import Component from 'ShopUi/models/component';
import {eventNames} from 'commander';
import {array} from 'fast-glob/out/utils';

export default class TogglerAccordion extends Component {
    protected triggers: HTMLElement[];

    protected readyCallback(): void {}

    protected init(): void {
        this.triggers = <HTMLElement[]>Array.from(document.getElementsByClassName(this.triggerClassName));
        this.mapEvents();
    }

    protected mapEvents(): void {
        this.triggers.forEach(trigger => {
            const eventFunction = (e: Event) => this.triggerHandler(trigger, e);
            trigger.addEventListener('click', eventFunction.bind(this));
        });
    }

    protected triggerHandler(trigger: HTMLElement, event: Event): void {
        event.stopImmediatePropagation();
        const togglerContent = document.getElementsByClassName(
            trigger.getAttribute('data-toggle-target-class-name')
        )[0];
        trigger.classList.toggle(this.activeClass);
        togglerContent.classList.toggle(this.toggleClass);
    }

    protected get triggerClassName(): string {
        return this.getAttribute('trigger-class-name');
    }

    protected get toggleClass(): string {
        return this.getAttribute('class-to-toggle');
    }

    protected get activeClass(): string {
        return this.getAttribute('active-class');
    }
}
