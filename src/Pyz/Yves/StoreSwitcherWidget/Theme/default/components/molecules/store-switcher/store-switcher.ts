import Component from 'ShopUi/models/component';

export default class StoreSwitcher extends Component {
    protected select: HTMLSelectElement;
    protected storeSwitcherFormText;
    protected storeSwitcherDropDown;
    protected storeSwitcherPassword;
    protected storeSwitcherUrl;
    protected selectModalSwitcherDropDown;
    protected selectModalSwitcherSpan;
    protected select2Results: HTMLElement;
    protected codeBucket: HTMLInputElement;
    protected storeSwitchers: HTMLElement;
    protected storeSwitcher: HTMLElement;

    protected readyCallback(): void {}

    protected init(): void {
        this.select = <HTMLSelectElement>this.getElementsByClassName(`${this.jsName}__select_store`)[0];
        this.storeSwitcherFormText = document.getElementsByClassName('form-text--shop-switcher')[0];
        this.storeSwitcherDropDown = document.getElementsByClassName('form-dropdown--shop-switcher')[0];
        this.selectModalSwitcherDropDown = document.getElementsByClassName('js-store-switcher__select_store')[0];
        this.selectModalSwitcherSpan = document.querySelector('.select2-selection__rendered');
        this.storeSwitcherPassword = document.getElementById('form-password-shop-switcher');
        this.storeSwitcherUrl = document.getElementById('form-url-shop-switcher');
        this.storeSwitchers = <HTMLElement>document.getElementsByTagName('store-switcher');
        this.codeBucket = <HTMLInputElement>document.querySelector(this.getCodeBucket)
        this.mapEvents();
    }

    protected mapEvents(): void {
        this.select.addEventListener('change', (event: Event) => this.onTriggerChange(event));
        this.onStoreSwitcherClick();
    }

    protected onStoreSwitcherClick(): void {
        Array.from(this.storeSwitchers).forEach(storeSwitcher => {
           storeSwitcher.addEventListener('click', () => this.changeScrollbarColor());
        });
    }

    protected onTriggerChange(event: Event): void {
        const destinationTarget = this.selectModalSwitcherDropDown;
        const selectTarget = <HTMLSelectElement>event.currentTarget;
        const elementFromModal = selectTarget.parentElement.offsetParent.className;
        const is_pwd_protected = selectTarget.options[selectTarget.selectedIndex].getAttribute("is_password_protected");

        if (this.hasUrl(selectTarget)) {
            let url = this.currentSelectValue(selectTarget);
            let convertedUrl = url;
            if (url.includes("-&-")) {
                convertedUrl = url.replace("-&-", "AND");
            }
            if (is_pwd_protected == 1) {
                this.storeSwitcherFormText.classList.add('is-hidden');
                this.storeSwitcherPassword.classList.remove('is-hidden');
                this.storeSwitcherUrl.value = convertedUrl;
              if (elementFromModal !== 'popup-ui-store-switcher__overlay') {
                  document.getElementsByTagName('popup-ui-store-switcher')[0].classList.add('popup-ui-store-switcher--show');
                  for (let i = 0; i < destinationTarget.options.length; ++i){
                      if (destinationTarget.options[i].value === url){
                          let text = " " + destinationTarget.options[i].text;
                          destinationTarget.options[i].setAttribute("selected", true);
                          this.selectModalSwitcherSpan.textContent = text;
                      }
                  }
              }
            } else {
                window.location.href = convertedUrl;
            }
        }
    }

    protected currentSelectValue(select: HTMLSelectElement): string {
        return select.options[select.selectedIndex].value;
    }

    protected hasUrl(select: HTMLSelectElement): boolean {
        return !!select.value;
    }

    get getCodeBucket(): string {
        return "input[name=header-codebucket]";
    }

    protected changeScrollbarColor() {
        this.select2Results = document.getElementsByClassName('select2-results')[0];
        if(this.codeBucket.value === "CZ" && this.select2Results !== undefined) {
            this.select2Results.classList.add('select2-results-cz');
        }
    }
}
