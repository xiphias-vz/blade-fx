import Component from 'ShopUi/models/component';

export default class StickyElement extends Component {
    protected targets: HTMLElement[];
    protected  previousScrollPosition: number  = window.pageYOffset;
    protected  windowSize: number = window.screen.width;
    protected  currentScrollPosition: number;

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

        this.currentScrollPosition = window.pageYOffset;
        if(this.previousScrollPosition > this.currentScrollPosition) {
            target.classList.toggle(this.toggleClass, true);
        }
        else {
            target.classList.toggle(this.toggleClass, false);
        }
        this.previousScrollPosition = this.currentScrollPosition;
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
