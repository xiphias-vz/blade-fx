import SuggestSearch from 'ShopUi/components/molecules/suggest-search/suggest-search';

export default class SuggestSearchExtended extends SuggestSearch {
    wrap: HTMLElement;
    clearButton: HTMLElement;
    triggers: HTMLElement[];
    target: HTMLElement;
    searchCartButton: HTMLInputElement;

    protected init() {
        this.wrap = <HTMLElement> document.getElementsByClassName(this.wrapClassName)[0];
        this.clearButton = <HTMLElement> document.getElementsByClassName(this.clearButtonClassName)[0];
        this.triggers = <HTMLElement[]> Array.from(document.getElementsByClassName(`${this.jsName}--trigger`));
        this.target = <HTMLElement> document.getElementsByClassName(`${this.jsName}--target`)[0];
        super.init();
        this.toggleClearButton(!this.searchInput.value);
        this.searchCartButton = <HTMLInputElement> document.getElementById('is-cart-button-clicked');
    }

    protected mapEvents(): void {
        super.mapEvents();
        this.clearButton.addEventListener('click', () => this.clearSearchField());
        this.triggers.forEach((trigger: HTMLElement) => {
            trigger.addEventListener('click', (event: Event) => this.onTriggerClick(event));
        });
    }

    protected async onInputKeyUp(): Promise<void> {
        super.onInputKeyUp();
        this.toggleClearButton(Boolean(!this.currentSearchValue));
    }

    protected async getSuggestions(): Promise<void> {
        const suggestQuery = this.getSearchValue();

        this.ajaxProvider.queryParams.set('q', suggestQuery);

        const response = await this.ajaxProvider.fetch(suggestQuery);
        const suggestions = JSON.parse(response).suggestion;

        this.suggestionsContainer.innerHTML = suggestions;
        this.hint = JSON.parse(response).completion;
        if (suggestions) {
            this.showSugestions();
        }
        if (this.hint) {
            this.updateHintInput();
        }
        if (this.hint === null || !this.getSearchValue()) {
            this.setHintValue('');
        }
        this.navigation = this.getNavigation();
        this.updateNavigation();
    }

    showSugestions(): void {
        super.showSugestions();
        this.wrap.classList.add(this.wrapActiveClassName);
        this.hintInput.classList.add(`${this.name}__hint--active`);
    }

    hideSugestions(): void {
        super.hideSugestions();
        this.wrap.classList.remove(this.wrapActiveClassName);
        this.hintInput.classList.remove(`${this.name}__hint--active`);
    }

    protected onInputFocusOut(): void {
        if (this.searchCartButton.value === 'y'){
        } else{
            this.hideSugestions();
        }
    }

    protected clearSearchField(): void {
        this.searchInput.value = '';
        this.hideSugestions();
        this.toggleClearButton(true);
        this.setHintValue('');
    }

    protected toggleClearButton(isToggled: boolean): void {
        this.clearButton.classList.toggle(this.clearButtonHideClassName, isToggled);
    }

    protected onTriggerClick(event: Event): void {
        event.preventDefault();
        this.target.classList.toggle(this.targetToggleClassName);
    }

    protected get wrapClassName(): string {
        return this.getAttribute('wrap-class-name');
    }

    protected get wrapActiveClassName(): string {
        return this.getAttribute('wrap-active-class-name');
    }

    protected get clearButtonClassName(): string {
        return this.getAttribute('clear-button-class-name');
    }

    protected get clearButtonHideClassName(): string {
        return this.getAttribute('clear-button-hide-class-name');
    }

    protected get targetToggleClassName(): string {
        return this.getAttribute('target-toggle-class-name');
    }
}
