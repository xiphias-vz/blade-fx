import Component from 'ShopUi/models/component';
import FlashMessage from 'ShopUi/components/molecules/flash-message/flash-message';
import $ from 'jquery/dist/jquery';

export default class Suggest extends Component {
    clearButton: HTMLElement;
    btnCallTs: HTMLElement;
    searchInput: HTMLInputElement;
    suggestAddToCartForm: HTMLFormElement;
    currentSearchValue: string;
    protected addToCartButton: $;
    protected flashMessages: FlashMessage[];
    protected messagesTextHolders: HTMLElement[];
    protected notificationArea: HTMLElement;
    private queryEL: any;
    private menuButton: HTMLElement;


    protected readyCallback(): void {
        this.clearButton = <HTMLElement>document.getElementsByClassName(this.clearButtonClassName)[0];
        this.searchInput = <HTMLInputElement>document.getElementsByClassName(this.searchInputClassName)[0];
        this.addToCartButton = <HTMLElement>$(document).find(this.getAddToCartBtn);
        this.suggestAddToCartForm = <HTMLFormElement>document.querySelector(this.getAddToCartForm);
        this.flashMessages = <FlashMessage[]>Array.from(this.getElementsByClassName(this.flashMessagesClass));
        this.notificationArea = <HTMLElement>this.getElementsByClassName(this.notificationAreaClass)[0];
        this.messagesTextHolders = <HTMLElement[]>Array.from(
            this.getElementsByClassName(this.messagesTextHolderClass)
        );
        this.btnCallTs = <HTMLFormElement>document.querySelector("#callTs")
        this.menuButton = <HTMLElement>document.getElementsByClassName(' button--global-products')[0];
        this.changesInInputField();
        this.load();
        this.mapEvents();
    }

    protected load() {
       window.addEventListener('load', () => {
           this.classList.remove(`suggest__hide`);
       });
    }

    protected mapEvents(): void {
        this.clearButton.addEventListener('click', () => this.clearSearchField());
        this.btnCallTs.addEventListener('click', () => this.submitToCartButton());
        this.searchInput.addEventListener('keyup', () => this.changesInInputField());
    }

    protected submitToCartButton(): void {
        const that = this;

        let formData = new FormData(this.suggestAddToCartForm);
        let ajax_url = $("#addAjaxUrl").val();
        let isCartButtonClicked = document.getElementById("is-cart-button-clicked");
        let productSku = document.getElementById("data-product-sku").value;
        let productTitle = document.getElementById("data-product-name").value;
        let queryEl = document.getElementsByClassName('ffw-query');
        let query = "";

        if(queryEl.length > 0){
            query = queryEl[0].innerText;
        }

        isCartButtonClicked.value = 'y';

        let firstClickFlag = false;

        let productItemsForSyncCounter = JSON.parse(localStorage.getItem('productItemsForSyncCounter'));

        if(productItemsForSyncCounter){
            for (let i = 0; i < productItemsForSyncCounter.length; i++) {
                if (productItemsForSyncCounter[i][0].includes(productSku)) {
                    if(productItemsForSyncCounter[i][2] === false){
                        firstClickFlag = true;
                    } else {
                        firstClickFlag = false
                    }
                } else {
                    firstClickFlag = true;
                }
            }
        } else {
            firstClickFlag = true;
        }

            $.ajax(ajax_url, {
                type: 'POST',
                dataType: 'json',
                data: {
                    myToken: formData.get('token'),
                    myOperation: "ADD",
                    myQuantity: 1,
                    firstClickFlag: firstClickFlag,
                    productSku: productSku,
                    productTitle: productTitle,
                    productQuery: query,
                },
                success(data, status, xhr) {
                    if(data.error !== '') {
                        that.setMessages(data.error);
                        that.showMessages();
                        return;
                    }

                    that.replaceQuantity(data.quantity);
                    that.replaceAmount(data.amount);
                    isCartButtonClicked.value = 'n';
                },
                error(jqXhr, textStatus, errorMessage) {
                    that.setMessages(jqXhr.error);
                    that.showMessages();
                }
            });

            document.getElementsByClassName("suggest-search__input")[0].focus();
        }

    protected replaceQuantity(quantity: number): void {
        let quantityElements = $('.js-ajax-add-to-cart__quantity');
        let i;
        for (i=0; i < quantityElements.length; i++){
            quantityElements[i].innerHTML = quantity;
        }
    }

    protected replaceAmount(amount: number): void {
        let amountElements = $('.js-ajax-add-to-cart__amount');
        let i;
        for (i=0; i < amountElements.length; i++){
            amountElements[i].innerHTML = amount;
        }
    }

    protected showMessages(): void {
        this.notificationArea.classList.remove("is-hidden");
        this.flashMessages.forEach(flashMessageItem => {
            flashMessageItem.showFor(flashMessageItem.defaultDuration);
        });
    }

    protected setMessages(message: string): void {
        this.messagesTextHolders.forEach((messageItem: HTMLElement) => {
            messageItem.innerHTML = message;
        });
    }

    protected clearSearchField(): void {
        this.searchInput.value = '';
        this.toggleClearButton(true);
        this.searchInput.focus();
    }

    protected changesInInputField(): void {
        this.toggleClearButton(Boolean(!this.searchInput.value));
        this.changeButtonBorderStyle();
    }

    protected toggleClearButton(isToggled: boolean): void {
        this.clearButton.classList.toggle(this.getHiddenClass, isToggled);
    }

    protected changeButtonBorderStyle() {
        let screenSize = window.matchMedia("(max-width: 575px)");
        if(this.menuButton !== undefined && screenSize.matches) {
            let borderRadius = this.menuButton.style.borderRadius;
            if(this.searchInput.value)
                this.menuButton.style.borderBottomLeftRadius = 0;
            else
                this.menuButton.style.borderBottomLeftRadius = borderRadius;
        }
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

    protected get getAddToCartBtn(): string {
        return '.suggest__button-suggest-cart';
    }

    protected get getAddToCartForm(): string {
        return '#submit-suggested-search-product';
    }

    protected get flashMessagesClass(): string {
        return `js-ajax-add-to-cart__flash-message`;
    }

    protected get messagesTextHolderClass(): string {
        return `js-ajax-add-to-cart__message-text`;
    }

    protected get notificationAreaClass(): string {
        return `js-ajax-add-to-cart__notification-area`;
    }
}
