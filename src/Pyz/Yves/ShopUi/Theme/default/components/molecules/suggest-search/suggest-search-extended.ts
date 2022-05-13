import SuggestSearch from 'ShopUi/components/molecules/suggest-search/suggest-search';
import debounce from 'lodash-es/debounce';

export default class SuggestSearchExtended extends SuggestSearch {
    wrap: HTMLElement;
    clearButton: HTMLElement;
    triggers: HTMLElement[];
    target: HTMLElement;
    searchCartButton: HTMLInputElement;
    private suggestSearchInput: HTMLElement;

    protected init() {
        this.wrap = <HTMLElement> document.getElementsByClassName(this.wrapClassName)[0];
        this.clearButton = <HTMLElement> document.getElementsByClassName(this.clearButtonClassName)[0];
        this.triggers = <HTMLElement[]> Array.from(document.getElementsByClassName(`${this.jsName}--trigger`));
        this.target = <HTMLElement> document.getElementsByClassName(`${this.jsName}--target`)[0];
        this.suggestSearchInput = <HTMLElement> document.querySelector('.suggest-search__input');
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
        this.searchInput.addEventListener('blur', debounce((event) => this.onInputFocusOutWithEvent(event), this.debounceDelay));
        this.searchInput.addEventListener('click', () => this.onInputClick());
    }

    protected async onInputKeyUp(): Promise<void> {
        super.onInputKeyUp();
        this.toggleClearButton(Boolean(!this.currentSearchValue));
    }

    protected onInputClick(): void {
        this.activeItemIndex = 0;

        if (this.isNavigationExist()) {
            this.updateNavigation();
            if (this.searchInput.value !== '' && this.currentSearchValue !== '') {
                this.showSugestions();
            }
        }
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
        this.suggestionsContainer.classList.remove('is-hidden');
        this.suggestSearchInput.style.borderTopRightRadius = '24px';
        this.suggestSearchInput.style.borderBottomRightRadius = '0';
        this.suggestSearchInput.style.borderLeft = '2px solid';
        this.suggestSearchInput.style.borderTop = '2px solid';
        this.suggestSearchInput.style.borderRight = '2px solid';
        this.suggestSearchInput.style.borderColor = '#009933';
        this.suggestSearchInput.style.borderBottom = '0';

        this.wrap.classList.add(this.wrapActiveClassName);
        this.hintInput.classList.add(`${this.name}__hint--active`);
    }

    hideSugestions(): void {
        this.suggestionsContainer.classList.add('is-hidden');
        this.suggestSearchInput.style.borderRadius = '0 30px 30px 0';
        this.suggestSearchInput.style.border = null;
        this.wrap.classList.remove(this.wrapActiveClassName);
        this.hintInput.classList.remove(`${this.name}__hint--active`);
    }

    protected onInputFocusOutWithEvent(event: any): void {
        let parentEl = document.getElementsByClassName("search-form")[0];
        if (!parentEl.contains(event.relatedTarget)) {
            this.hideSugestions();
        }
        else {
            this.searchInput.focus();
        }
    }

    protected onInputFocusOut(): void {
    }

    protected clearSearchField(): void {
        this.searchInput.value = '';
        this.currentSearchValue = '';
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
