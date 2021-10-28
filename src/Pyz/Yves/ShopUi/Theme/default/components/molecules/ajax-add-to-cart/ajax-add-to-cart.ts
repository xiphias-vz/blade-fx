import Component from 'ShopUi/models/component';
import FlashMessage from 'ShopUi/components/molecules/flash-message/flash-message';
const HIDDEN_CLASS = 'is-hidden';
const CLASS_PREFIX = '.';
const ID_PREFIX = '#';

export default class AjaxAddToCart extends Component {
    protected links: HTMLLinkElement[];
    protected cartBlock: HTMLElement;
    protected amount: HTMLElement[];
    protected quantity: HTMLElement[];
    protected itemQuantity: HTMLElement[];
    protected operation: HTMLElement[];
    protected icon: HTMLElement;
    protected flashMessages: FlashMessage[];
    protected messagesTextHolders: HTMLElement[];
    protected notificationArea: HTMLElement;
    private addToCartIncrementerLinks: HTMLElement[];
    private addtoCartDecrementerLinks: HTMLElement[];
    private quantityInputs: HTMLInputElement[];
    protected timer;
    protected callBackDelay: number;

    protected readyCallback(): void {
        this.links = <HTMLLinkElement[]>Array.from(document.getElementsByClassName(this.addToCartLinkClass));
        this.addToCartIncrementerLinks = <HTMLElement[]>Array.from(document.getElementsByClassName(this.addToCartIncrementer));
        this.addtoCartDecrementerLinks = <HTMLElement[]>Array.from(document.getElementsByClassName(this.addToCartDecrementer));
        this.quantityInputs = <HTMLInputElement[]>Array.from(document.querySelectorAll('#txt-product-quantity'));

        if (!this.links.length) {
            return;
        }
        this.icon = <HTMLElement>document.getElementsByClassName(this.iconClass)[0];
        this.cartBlock = <HTMLElement>document.getElementsByClassName(this.cartClass)[0];
        this.amount = <HTMLElement[]>Array.from(document.getElementsByClassName(this.amountClass));
        this.quantity = <HTMLElement[]>Array.from(document.getElementsByClassName(this.quantityClass));
        this.flashMessages = <FlashMessage[]>Array.from(this.getElementsByClassName(this.flashMessagesClass));
        this.notificationArea = <HTMLElement>this.getElementsByClassName(this.notificationAreaClass)[0];
        this.messagesTextHolders = <HTMLElement[]>Array.from(
            this.getElementsByClassName(this.messagesTextHolderClass)
        );
        this.callBackDelay = 800;

        this.mapEvents();
    }

    protected mapEvents(): void {
        this.links.forEach((link: HTMLLinkElement) => {
            link.addEventListener('click', (event: Event) => this.linkClickHandler(event, link));
        });

        this.addToCartIncrementerLinks.forEach((incrementer: HTMLLinkElement, index:number) => {
            incrementer.addEventListener('click', (event: Event) => this.sendAjaxRequestToAddItemToCart(event, incrementer));
        });

        this.addtoCartDecrementerLinks.forEach((decrementer: HTMLLinkElement, index: number) => {
            decrementer.addEventListener('click', (event: Event) => this.sendAjaxRequestToRemoveItemFromCart(event, decrementer));
        });

        this.quantityInputs.forEach((quantityInput: HTMLInputElement) => {
            quantityInput.addEventListener('keyup', (event: Event) => this.applyQuantityValidation(event))
            quantityInput.addEventListener('change', (event: Event) => this.sendAjaxRequestToAddMultipleItemsToCart(event))
        })
    }

    protected applyQuantityValidation(event: Event) {
        let quantityInput = <HTMLInputElement>event.target;
        let quantity = quantityInput.value;
        if(quantity === ''  || quantity === '0') {
            quantityInput.value = '1';
        } else if(quantity.length > 2) {
            quantityInput.value = quantity[0] + quantity[1];
        }
    }

    protected sendAjaxRequestToAddMultipleItemsToCart(event: Event) {
        const quantityInput = <HTMLInputElement>event.target;
        let quantity = quantityInput.value;
        let incrementer: HTMLLinkElement = <HTMLLinkElement>quantityInput.nextElementSibling;
        this.sendRequest(incrementer.href, incrementer, String(quantity), 'ADD_MULTIPLE');
    }

    protected sendAjaxRequestToAddItemToCart(event: Event, incrementer: HTMLLinkElement) {
        event.preventDefault();
        clearTimeout(this.timer);
        const quantityInput: HTMLInputElement = <HTMLInputElement>incrementer.previousElementSibling;
        let quantity: number = Number(quantityInput.value);
        quantity++;
        quantityInput.value = String(quantity);
        this.timer = setTimeout(() => {
            this.sendRequest(incrementer.href, incrementer, String(quantityInput.value), 'ADD');
        }, this.callBackDelay);

    }

    protected sendAjaxRequestToRemoveItemFromCart(event: Event, decrementer) {
        event.preventDefault();
        clearTimeout(this.timer);
        let quantityInput: HTMLInputElement = <HTMLInputElement>decrementer.nextElementSibling;
        let quantity: number = Number(quantityInput.value);
        quantity--;
        let quantityWithMinimum: number = quantity === 0 ? 1 : quantity;
        quantityInput.value = String(quantityWithMinimum);
        this.toggleCounterAndAjaxButtons(decrementer, 'REMOVE', quantity);

        this.timer = setTimeout(() => {
            this.sendRequest(decrementer.href, decrementer, String(quantityInput.value), 'REMOVE');
        }, this.callBackDelay);


    }

    protected linkClickHandler(event: Event, link: HTMLLinkElement): void {
        event.preventDefault();
        this.sendRequest(link.href, link, String(1), null);
    }

    protected async sendRequest(url: string, link: HTMLLinkElement, quantity: string, operation: string): Promise<void> {
        const formData = new FormData();
        formData.append('token', link.dataset.csrfToken);
        formData.append('operation', operation);
        formData.append('quantity', quantity);

        fetch(url, {method: 'POST', body: formData})
            .then(response => response.json())
            .then(parsedResponse => {
                if (parsedResponse.error.length > 0) {
                    this.setMessages(parsedResponse.error);
                    this.showMessages();
                }
                this.updateItemQuantityInput(link, parsedResponse.itemQuantity)
                this.replaceQuantity(parsedResponse.quantity);
                this.replaceAmount(parsedResponse.amount);
                this.hideIcon();
                this.showQuantity();

                this.showCounterAndHideAjaxButton(link);
                let isCounterVisible = operation !== null;

                if(isCounterVisible) {
                    this.showMessage(parsedResponse, link);
                }

            }).catch(error => {
                console.error(error);
            });
    }

    protected showMessages(): void {
        this.notificationArea.classList.remove(HIDDEN_CLASS);
        this.flashMessages.forEach(flashMessageItem => {
            flashMessageItem.showFor(flashMessageItem.defaultDuration);
        });
    }

    protected setMessages(message: string): void {
        this.messagesTextHolders.forEach((messageItem: HTMLElement) => {
            messageItem.innerHTML = message;
        });
    }

    protected replaceAmount(amount: string): void {
        this.amount.forEach((amountItem: HTMLElement) => {
            amountItem.innerHTML = amount;
        });
    }

    protected replaceQuantity(quantity: string): void {
        this.quantity.forEach((amountItem: HTMLElement) => {
            amountItem.innerHTML = quantity;
        });
    }

    protected trackingInfo(link: HTMLLinkElement): {
        [key: string]: string
    } {
        return {
            sku: link.dataset.productSku,
            title: link.dataset.productTitle,
            price: link.dataset.productPrice,
        };
    }

    protected hideIcon(): void {
        if (this.icon) {
            this.icon.classList.add(HIDDEN_CLASS);
        }
    }

    protected showQuantity(): void {
        this.quantity.forEach((amountItem: HTMLElement) => {
            amountItem.classList.remove(HIDDEN_CLASS);
        });
    }

    protected toggleCounterAndAjaxButtons(link: HTMLLinkElement, operation: string, quantity: number) {
        if(operation === 'REMOVE' && quantity === 0) {
           this.showAjaxButtonAndHideCounter(link);
        }
    }

    protected updateItemQuantityInput(link: HTMLLinkElement, quantity: number) {
        if (quantity !== undefined) {
            let counter: HTMLInputElement = <HTMLInputElement>link.parentElement.querySelector(ID_PREFIX + this.quantityInputField);
            counter.value = String(quantity);
        }
    }

    protected showMessage(response: object, link: HTMLLinkElement) {
        const parentCounter: HTMLElement = <HTMLElement>link.parentElement;
        const addedItemMessage: HTMLElement = parentCounter.querySelector(CLASS_PREFIX + this.itemAdded);
        const removeItemMessage: HTMLElement = parentCounter.querySelector(CLASS_PREFIX + this.itemRemoved);
        if (response.code === 200 && response.operation === 'ADD') {
            if(!this.showTopMessageForMobileDevice(addedItemMessage, response)) {
                if(!this.errorExistsAndQuantityBiggerThanQuantityFromTheCart(response)) {
                    addedItemMessage.classList.remove('is-hidden');
                    this.removeItemTimeOut(addedItemMessage);
                }
            }

        } else if (response.code === 200 && response.operation === 'ADD_MULTIPLE') {

            if (!this.showTopMessageForMobileDevice(addedItemMessage, response)) {
                if(!this.errorExistsAndQuantityBiggerThanQuantityFromTheCart(response)) {
                    addedItemMessage.classList.remove('is-hidden');
                    this.removeItemTimeOut(addedItemMessage);
                }
            }

        } else {

            if (!this.showTopMessageForMobileDevice(removeItemMessage, response)) {
                if(!this.errorExistsAndQuantityBiggerThanQuantityFromTheCart(response)) {
                    removeItemMessage.classList.remove('is-hidden');
                    this.removeItemTimeOut(removeItemMessage);
                }
            }
        }
    }

    protected errorExistsAndQuantityBiggerThanQuantityFromTheCart(response: object) {

        if(response.error.length > 0) {
            let itemQuantityFromCart: number = response.itemQuantity;
            let currentQuantity: number = response.quantity;
            if (currentQuantity > itemQuantityFromCart) {
                return true;
            }
        }
        return false;
    }
    protected removeItemTimeOut(element: HTMLElement) {
        setTimeout(() => {
            element.classList.add('is-hidden');
        }, 2000)
    }

    protected showTopMessageForMobileDevice(message: HTMLElement, response: object) {
        let windowWidth: number = window.screen.width;

        if (windowWidth < 574 && !this.errorExistsAndQuantityBiggerThanQuantityFromTheCart(response)) {
            const topMessage: HTMLElement = <HTMLElement>message.cloneNode(true);
            const body : HTMLBodyElement = <HTMLBodyElement>document.body;
            topMessage.style.cssText = this.cssMessage();

            const checkMark: HTMLElement = topMessage.querySelector('.checkmark');
            checkMark.style.cssText = this.cssCheckMark()

            topMessage.classList.remove('is-hidden');
            body.style.position = 'relative';
            body.insertBefore(topMessage, body.firstElementChild);
            setTimeout(() => {
                topMessage.remove();
            }, 2000)

            return true;
        }
        return false;
    }

    protected showCounterAndHideAjaxButton(link: HTMLLinkElement): void {
        const counter = link?.nextElementSibling;
        counter?.classList.add(this.ajaxCartCounterClass);
        counter?.classList.remove(HIDDEN_CLASS);
        link?.classList.add(HIDDEN_CLASS);
    }

    protected showAjaxButtonAndHideCounter(link: HTMLLinkElement): void {
        const counter = link?.parentElement;
        const addAjaxButton = link?.parentElement.parentElement.querySelector(CLASS_PREFIX + this.ajaxAddQuantityLink)
        counter?.classList.remove(this.ajaxCartCounterClass);
        counter?.classList.add(HIDDEN_CLASS);
        addAjaxButton?.classList.remove(HIDDEN_CLASS);
    }

    protected get addToCartLinkClass(): string {
        return `${this.jsName}__link`;
    }

    protected get addToCartIncrementer(): string {
        return 'js-quantity-counter-product__incr';
    }

    protected get addToCartDecrementer(): string {
        return 'js-quantity-counter-product__decr';
    }

    protected get ajaxAddQuantityLink(): string {
        return 'js-ajax-add-to-cart__link';
    }

    protected get ajaxChangeQuantityLink(): string {
        return 'js-ajax-change-quantity__link';
    }

    protected get ajaxCartCounterClass(): string {
        return 'change-cart-counter';
    }

    protected get quantityInputField(): string {
        return 'txt-product-quantity';
    }

    protected get itemAdded(): string {
        return 'item-added';
    }

    protected get itemRemoved(): string {
        return 'item-removed';
    }

    protected get cartClass(): string {
        return `${this.jsName}__cart-block`;
    }

    protected get amountClass(): string {
        return `${this.jsName}__amount`;
    }

    protected get quantityClass(): string {
        return `${this.jsName}__quantity`;
    }

    protected get iconClass(): string {
        return `${this.jsName}__icon`;
    }

    protected get flashMessagesClass(): string {
        return `${this.jsName}__flash-message`;
    }

    protected get messagesTextHolderClass(): string {
        return `${this.jsName}__message-text`;
    }

    protected get notificationAreaClass(): string {
        return `${this.jsName}__notification-area`;
    }

    protected cssMessage(): string {

        return `
            width:90%;
            display:flex;
            justify-content:center;
            align-items:center;
            position: fixed;
            top: 5px;
            left: 5%;
            padding: 10px;
            background-color:#7b7b7b;
            color: #fff;
            z-index: 999;
        `;
    }

    protected cssCheckMark(): string {

        return `
            position: absolute;
            top: 6px;
            left:15px;
            display: inline-block;
            transform: rotate(45deg);
            height: 22px;
            width: 11px;
            border-bottom: 2px solid #fff;
            border-right: 2px solid #fff;
        `;
    }
}
