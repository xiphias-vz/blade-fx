import Component from 'ShopUi/models/component';

export default class StickyElement extends Component {
    protected targets: HTMLElement[];

    protected readyCallback(): void {}

    protected init(): void {
        this.targets = <HTMLElement[]>Array.from(document.getElementsByClassName(this.targetClassName));

        if (this.decktopOnly && document.body.classList.contains('touch')) {
            return;
        }

        this.mapEvents();
    }

    protected mapEvents(): void {
        this.targets.forEach(target => {
            window.addEventListener('load', this.targetHandler.bind(this, target));
            window.addEventListener('scroll', this.targetHandler.bind(this, target));
        });
    }

    protected targetHandler(target: HTMLElement): void {
        const isSticky = window.pageYOffset > this.getActiveOffset(target);
        target.classList.toggle(this.toggleClass, isSticky);
    }

    protected getActiveOffset(target: HTMLElement): number {
        if (this.offset) {
            return this.offset;
        }

        if (this.wrapperClassName) {
            const wrapper = <HTMLElement>document.getElementsByClassName(this.wrapperClassName)[0];

            return wrapper.offsetTop;
        }

        return target.offsetTop;
    }

    protected get targetClassName(): string {
        return this.getAttribute('target-class-name');
    }

    protected get toggleClass(): string {
        return this.getAttribute('class-to-toggle');
    }

    protected get wrapperClassName(): string {
        return this.getAttribute('wrapper-class-name');
    }

    protected get decktopOnly(): boolean {
        return this.hasAttribute('desktop-only');
    }

    protected get offset(): number {
        return Number(this.getAttribute('offset'));
    }
}
