import Component from 'ShopUi/models/component';

export default class NavigationTopMobile extends Component {
    protected mobileSearchTriggerButton: HTMLButtonElement;
    protected mobileNavTriggerButton: HTMLElement[];
    protected isMobileSearchVisible: Boolean;
    protected isMobileNavVisible: Boolean;

    protected readyCallback(): void {}

    protected init(): void {
        this.mobileSearchTriggerButton = this.querySelector(`.${this.navTriggerButtonClassName}`);
        this.mobileNavTriggerButton = Array.from(this.querySelectorAll(`.${this.mobileNavigationClassName}`));
        this.isMobileSearchVisible = false;
        this.isMobileNavVisible = false;
        this.mapEvents();
    }

    protected mapEvents(): void {
        this.mobileSearchTriggerButton.addEventListener('click', (event: Event) => this.closeNavIfSearch(event));
        this.mobileNavTriggerButton.map(button => {
            button.addEventListener('click', (event: Event) => this.closeSearchIfNav(event));
        });
    }

    protected closeNavIfSearch(event: Event): void {
        this.isMobileSearchVisible = !this.isMobileSearchVisible;
        if (!this.isMobileNavVisible) {
            return;
        }

        this.mobileNavTriggerButton.map(button => {
            if (button.classList.contains('is-hidden')) {
                return;
            }
            button.click();
        });

        const target = <HTMLElement>event.target;
        target.click();
    }

    protected closeSearchIfNav(event: Event): void {
        this.isMobileNavVisible = !this.isMobileNavVisible;
        if (!this.isMobileSearchVisible) {
            return;
        }

        this.mobileSearchTriggerButton.click();
        const target = <HTMLElement>event.target;
        target.click();
    }

    protected get navTriggerButtonClassName(): string {
        return this.getAttribute('mobile-search-trigger-button');
    }

    protected get mobileNavigationClassName(): string {
        return this.getAttribute('mobile-nav-trigger-button');
    }
}
