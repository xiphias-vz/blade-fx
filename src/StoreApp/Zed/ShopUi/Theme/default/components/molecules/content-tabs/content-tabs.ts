import Component from 'ShopUi/models/component';

export default class ContentTabs extends Component {
    protected tabsTriggers: HTMLElement[];
    protected tabsContents: HTMLElement[];
    protected tabsActiveClass = 'active';

    protected readyCallback(): void {
        this.tabsTriggers = <HTMLElement[]>Array.from(document.getElementsByClassName(this.tabTriggerSelector));
        this.tabsContents = <HTMLElement[]>Array.from(document.getElementsByClassName(this.tabContentSelector));

        this.mapEvents();
    }

    protected mapEvents(): void {
        this.tabsTriggers.forEach(tabTrigger => {
            tabTrigger.addEventListener('click', () => this.triggerContent(tabTrigger));
        });
    }

    protected triggerContent(currentTabTrigger: HTMLElement): void {
        const contentTargetSelector = currentTabTrigger.dataset.target;
        const contentTarget = <HTMLElement>document.getElementsByClassName(contentTargetSelector)[0];

        this.triggersChangeClasses(currentTabTrigger);
        this.contentChangeClasses(contentTarget);
    }

    protected triggersChangeClasses(currentTabTrigger: HTMLElement) {
        this.tabsTriggers.forEach(tabTrigger => {
            tabTrigger.classList.remove(this.tabsActiveClass);
        });

        currentTabTrigger.classList.add(this.tabsActiveClass);
    }

    protected contentChangeClasses(currentTabContent: HTMLElement) {
        this.tabsContents.forEach(tabContent => {
            tabContent.classList.remove(this.tabsActiveClass);
        });

        currentTabContent.classList.add(this.tabsActiveClass);
    }

    get tabTriggerSelector(): string {
        return `${this.jsName}__trigger`;
    }

    get tabContentSelector(): string {
        return `${this.jsName}__content`;
    }
}
