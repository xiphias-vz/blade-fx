import Component from 'ShopUi/models/component';

const MIN_DECREMENT_VALUE = 2;

export default class QuantityCounter extends Component {
    protected quantityInput: HTMLInputElement;
    protected decrButton: HTMLButtonElement;
    protected incrButton: HTMLButtonElement;
    protected value: number;
    protected duration: number = 1000;
    protected timeout: number = 0;
    protected inputChange: Event = new Event('input');

    protected readyCallback(): void {}

    protected init(): void {
        this.quantityInput = <HTMLInputElement>this.getElementsByClassName(`${this.jsName}__input`)[0];
        this.decrButton = <HTMLButtonElement>this.getElementsByClassName(`${this.jsName}__decr`)[0];
        this.incrButton = <HTMLButtonElement>this.getElementsByClassName(`${this.jsName}__incr`)[0];
        this.value = this.getValue;

        this.mapEvents();
        this.setMaxQuantityToInfinity();
    }

    protected mapEvents(): void {
        this.quantityInput.addEventListener('change', () => this.autoUpdateOnChange());
        this.decrButton.addEventListener('click', () => this.onDecrementButtonClick());
        this.incrButton.addEventListener('click', () => this.onIncrementButtonClick());
    }

    protected onDecrementButtonClick(): void {
        const value: number = Number(this.quantityInput.value);

        if (value > this.minQuantity) {
            this.quantityInput.value = (value - 1).toString();
        }

        if (this.isRemovalUrlAllowed && value === this.minQuantity) {
            this.quantityInput.form.action = this.removeUrl;
        }

        if (value <= MIN_DECREMENT_VALUE) {
            this.decrButton.classList.add('button--disabled');
        }

        this.autoUpdateOnChange();
        this.triggerInputEvent();
    }

    protected onIncrementButtonClick(): void {
        const value: number = Number(this.quantityInput.value);

        if (value >= 1) {
            this.decrButton.classList.remove('button--disabled');
        }

        if (value < this.maxQuantity) {
            this.quantityInput.value = (value + 1).toString();

            this.autoUpdateOnChange();
            this.triggerInputEvent();
        }
    }

    protected autoUpdateOnChange(): void {
        if (this.autoUpdate) {
            this.timer();
        }
    }

    protected triggerInputEvent(): void {
        this.quantityInput.dispatchEvent(this.inputChange);
    }

    protected timer(): void {
        clearTimeout(this.timeout);
        this.timeout = window.setTimeout(() => {
            if (this.value !== this.getValue || this.isRemovalUrlAllowed) {
                this.quantityInput.form.submit();
            }
        }, this.duration);
    }

    protected setMaxQuantityToInfinity(): void {
        if (!this.maxQuantity) {
            this.quantityInput.setAttribute('data-max-quantity', 'Infinity');
        }
    }

    protected get maxQuantity(): number {
        return +this.quantityInput.getAttribute('data-max-quantity');
    }

    protected get minQuantity(): number {
        return +this.quantityInput.getAttribute('data-min-quantity');
    }

    protected get removeUrl(): string {
        return this.quantityInput.getAttribute('data-remove-url');
    }

    protected get isRemovalUrlAllowed(): boolean {
        return this.removeUrl !== null;
    }

    protected get autoUpdate(): string {
        return this.quantityInput.getAttribute('data-auto-update');
    }

    protected get getValue(): number {
        return +this.quantityInput.value;
    }
}
