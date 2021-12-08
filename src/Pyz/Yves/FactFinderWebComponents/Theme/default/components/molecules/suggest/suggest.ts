import Component from 'ShopUi/models/component';

export default class Suggest extends Component {
    clearButton: HTMLElement;
    searchInput: HTMLInputElement;
    currentSearchValue: string;

    protected readyCallback(): void {
        this.clearButton = <HTMLElement>document.getElementsByClassName(this.clearButtonClassName)[0];
        this.searchInput = <HTMLInputElement>document.getElementsByClassName(this.searchInputClassName)[0];
        this.changesInInputField();
        this.load();
        this.mapEvents();
    }

    protected load() {
       window.addEventListener('load', () => {
           this.classList.remove(`suggest__hide`);
       })
    }

    protected mapEvents(): void {
        this.clearButton.addEventListener('click', () => this.clearSearchField());
        this.searchInput.addEventListener('keyup', () => this.changesInInputField());
    }

    protected clearSearchField(): void {
        this.searchInput.value = '';
        this.toggleClearButton(true);
        this.searchInput.focus();
    }

    protected changesInInputField(): void {
        this.toggleClearButton(Boolean(!this.searchInput.value));
    }

    protected toggleClearButton(isToggled: boolean): void {
        this.clearButton.classList.toggle(this.getHiddenClass, isToggled);
    }

    protected get getHiddenClass(): string {
        return 'is-hidden';
    }

    protected get clearButtonClassName(): string {
        return 'searchbox__clear';
    }

    protected get searchInputClassName(): string {
        return 'searchbox__input';
    }
}
