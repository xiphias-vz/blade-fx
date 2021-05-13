import Component from 'ShopUi/models/component';

export default class StoreSwitcher extends Component {
    protected select: HTMLSelectElement;
    protected storeSwitcherFormText;
    protected storeSwitcherDropDown;
    protected storeSwitcherPassword;
    protected storeSwitcherUrl;

    protected readyCallback(): void {}

    protected init(): void {
        this.select = <HTMLSelectElement>this.getElementsByClassName(`${this.jsName}__select_store`)[0];
        this.storeSwitcherFormText = document.getElementsByClassName('form-text--shop-switcher')[0];
        this.storeSwitcherDropDown = document.getElementsByClassName('form-dropdown--shop-switcher')[0];
        this.storeSwitcherPassword = document.getElementById('form-password-shop-switcher');
        this.storeSwitcherUrl = document.getElementById('form-url-shop-switcher');
        this.mapEvents();
    }

    protected mapEvents(): void {
        this.select.addEventListener('change', (event: Event) => this.onTriggerChange(event));
    }

    protected onTriggerChange(event: Event): void {
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
                this.storeSwitcherDropDown.classList.add('is-hidden');
                this.storeSwitcherPassword.classList.remove('is-hidden');
                this.storeSwitcherUrl.value = convertedUrl;
              if (elementFromModal !== 'popup-ui-store-switcher__overlay') {
                  document.getElementsByTagName('popup-ui-store-switcher')[0].classList.add('popup-ui-store-switcher--show');
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
}
