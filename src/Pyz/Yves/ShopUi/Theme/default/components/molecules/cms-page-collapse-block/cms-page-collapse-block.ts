import Component from 'ShopUi/models/component';

export default class CmsPageCollapseBlock extends Component {
    protected container: HTMLElement;
    protected collapsibleHeaders: HTMLElement[];

    protected readyCallback(): void {}

    protected init(): void {
        this.container = <HTMLElement>document.getElementsByClassName(this.collapseContainerClassName)[0];
        this.collapsibleHeaders = Array.from(this.container.querySelectorAll(`.${this.collapseHeaderClassName}`));
        this.initCollapsible();
    }

    protected initCollapsible(): void {
        this.collapsibleHeaders.map(item => {
            item.addEventListener('click', (event: Event) => {
                event.preventDefault();
                const targetElement: HTMLElement = <HTMLElement>event.target;
                targetElement.toggleAttribute('aria-expanded');
                const targetAttribute = targetElement.getAttribute('href');
                this.container.querySelector(targetAttribute).classList.toggle(this.collapseContentInactiveClassName);
                this.container.querySelector(targetAttribute).classList.toggle(this.collapseContentActiveClassName);
            });
        });
    }

    protected get collapseContainerClassName(): string {
        return this.getAttribute('collapsible-container');
    }

    protected get collapseHeaderClassName(): string {
        return this.getAttribute('collapsible-header');
    }

    protected get collapseContentActiveClassName(): string {
        return this.getAttribute('collapsible-block-active-class');
    }

    protected get collapseContentInactiveClassName(): string {
        return this.getAttribute('collapsible-block-inactive-class');
    }
}
