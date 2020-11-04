import Component from 'ShopUi/models/component';
import FlashMessage from 'ShopUi/components/molecules/flash-message/flash-message';

const HIDDEN_CLASS = 'is-hidden';

export default class AjaxAddToCart extends Component {
    protected links: HTMLLinkElement[];
    protected cartBlock: HTMLElement;
    protected amount: HTMLElement[];
    protected quantity: HTMLElement[];
    protected icon: HTMLElement;
    protected flashMessages: FlashMessage[];
    protected messagesTextHolders: HTMLElement[];
    protected notificationArea: HTMLElement;

    protected readyCallback(): void {
        this.links = <HTMLLinkElement[]>Array.from(document.getElementsByClassName(this.addToCartLinkClass));

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

        this.mapEvents();
    }

    protected mapEvents(): void {
        this.links.forEach((link: HTMLLinkElement) => {
            link.addEventListener('click', (event: Event) => this.linkClickHandler(event, link));
        });
    }

    protected linkClickHandler(event: Event, link: HTMLLinkElement): void {
        event.preventDefault();

        this.sendRequest(link.href, link);
    }

    protected async sendRequest(url: string, link: HTMLLinkElement): Promise<void> {
        const formData = new FormData();

        formData.append('token', link.dataset.csrfToken);
        fetch(url, {method: 'POST', body: formData})
            .then(response => response.json())
            .then(parsedResponse => {
                if (parsedResponse.error.length > 0) {
                    this.setMessages(parsedResponse.error);
                    this.showMessages();

                    return;
                }

                this.replaceQuantity(parsedResponse.quantity);
                this.replaceAmount(parsedResponse.amount);
                this.hideIcon();
                this.showQuantity();
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

    protected get addToCartLinkClass(): string {
        return `${this.jsName}__link`;
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
}
