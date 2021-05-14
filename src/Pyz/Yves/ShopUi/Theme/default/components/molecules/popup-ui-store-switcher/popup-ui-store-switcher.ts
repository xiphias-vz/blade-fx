import Component from 'ShopUi/models/component';
import $ from 'jquery/dist/jquery';

export default class PopupUiStoreSwitcher extends Component{
    protected $this: $ = $(this);
    protected linkToStoreSwitcher: HTMLFormElement;
    protected currentStoreValue: string;
    protected buttonForStoreSwitcher: HTMLButtonElement;
    protected storeSwitcherPassword;
    protected storeSwitcherPasswordLabel;
    protected storeSwitcherErrorMessage;
    protected storeSwitcherUrl;
    protected selectStore;

    protected readyCallback() {
        this.linkToStoreSwitcher = <HTMLFormElement> document.getElementById('current_store_cookie');
        this.currentStoreValue = this.linkToStoreSwitcher.value;
        this.selectStore = document.getElementsByClassName('js-store-switcher__select_store')[0];
        this.buttonForStoreSwitcher = <HTMLButtonElement> document.getElementById('popup-ui-store-switcher-button-save');
        this.storeSwitcherPassword = document.getElementById('popup-ui-store-switcher-password');
        this.mapEvents();
    }

    protected mapEvents(): void {
        let store_value = this.currentStoreValue;
        let store_value_exist = false;
        let store_value_protected = false;
        Array.from(this.selectStore).forEach(function(option_element) {
            if(store_value != "" && store_value != null){
                if(option_element.value.includes(store_value)) {
                    store_value_exist = true;
                    if(option_element.getAttribute('is_password_protected')){
                        store_value_protected = true;
                    }
                }
            }
        });
        this.buttonForStoreSwitcher.addEventListener('click', this.onClickButtonSave);
        this.storeSwitcherPassword.addEventListener('keypress', event => this.checkIfPressEnter(event));

        if (this.currentStoreValue == null || this.currentStoreValue == "" || store_value_exist == false || store_value_protected == true){
            this.openModal();
        }
    }

    protected checkIfPressEnter(event): void {
        if(event.key === 'Enter') {
            this.onClickButtonSave();
        }
    }

    protected openModal(): void
    {
        this.$this.addClass(`${this.name}--show`);
    }

    protected onClickButtonSave(): void
    {
        this.storeSwitcherUrl = document.getElementById('form-url-shop-switcher');
        this.storeSwitcherPasswordLabel = document.querySelectorAll('label[for="popup-ui-store-switcher-password"]')[0];
        this.storeSwitcherPasswordLabel.setAttribute('style', '');
        this.storeSwitcherErrorMessage = document.getElementById('popup-ui-store-switcher-error-message');
        this.storeSwitcherErrorMessage.innerHTML = '';
        this.storeSwitcherPassword = document.getElementById('popup-ui-store-switcher-password');
        if (this.storeSwitcherPassword.value === '') {
            this.storeSwitcherPasswordLabel.setAttribute('style', 'color:red');
        } else {
            let This = this;
            $.ajax({
                type : "POST",
                url  : window.location.origin + '/store/checkStore',
                data : { 'password': this.storeSwitcherPassword.value, 'url': this.storeSwitcherUrl.value },
                success: function (res) {
                    if (res.success == true) {
                        window.location.href = res.url;
                    } else {
                        This.storeSwitcherErrorMessage.innerHTML = res.message;
                    }
                }
            });
        }
    }
}
