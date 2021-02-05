import Component from 'ShopUi/models/component';
import $ from 'jquery/dist/jquery';
import ProductItem from '../product-item/product-item';
import isEmpty from 'lodash-es/isEmpty';

type ScanningBox = {
    id: number;
    scannedBarcode: number;
    scannedWeight: number;
    fullScannedId: string;
}

type BoxContainer = {
    [key:number]: ScanningBox;
}

export default class PickProducts extends Component {
    protected $document = $(document);
    protected productItems: ProductItem[];
    protected quantityInput: HTMLInputElement;
    protected pickedProductsCount: number;
    protected notPickedCount: number;
    protected pickedCount: number;
    protected weight: number;
    protected showInfo: boolean;
    protected containerData: any;
    protected $notPickedField: $;
    protected $pickedField: $;
    protected $weightField: $;
    protected $hasInfoField: $;
    protected $action: $;
    protected $submitButton: $;
    protected $bagsStatus: $;
    protected storageData: {
        items: {
            [key: string]: {
                isAccepted: boolean;
                isNotFullyAccepted: boolean;
                isDeclined: boolean;
                count: number;
                weight: number;
                showInfo: boolean;
                containerData: Array<BoxContainer>;
            }
        };
        timestamp: Date;
    } = {
        items: {},
        timestamp: new Date()
    };
    protected twentyFourHours = 1.2e+6;

    protected readyCallback(): void {}

    protected init(): void {
        this.productItems = <ProductItem[]>Array.from(document.getElementsByTagName('product-item'));
        this.quantityInput = $(document).find('.quantity-counter input')[0];
        this.$notPickedField = $(document).find(this.notPickedFieldSelector);
        this.$pickedField = $(document).find(this.pickedFieldSelector);
        this.$weightField = $(document).find(this.weightFieldSelector);
        this.$hasInfoField = $(document).find(this.hasInfoFieldSelector);
        this.$action = $(document).find(this.actionSelector);
        this.$submitButton = $(document).find(this.submitButtonSelector);
        this.$bagsStatus = $(document).find(this.bagsSelector);

        this.mapEvents();
        this.initOrderStorage();
    }

    protected mapEvents(): void {
        this.$submitButton.on('click', () => localStorage.removeItem(this.orderId));

        if (this.quantityInput) {
            this.quantityInput.addEventListener('change', (event: Event) => {
                this.$bagsStatus.html(this.quantityInput.value);
            });
        }
    }

    protected initOrderStorage(): void {
        const storageData = JSON.parse(localStorage.getItem(this.orderId));

        if (!storageData) {
            return;
        }

        this.storageData = storageData;
        this.parseStorage();
        this.clearStorage();
    }

    update(): void {
        this.pickedProductsCount = 0;
        this.notPickedCount = 0;
        this.pickedCount = 0;

        this.productItems.forEach((item: ProductItem) => {
            if (item.isAccepted || item.isDeclined || item.isNotFullyAccepted) {
                this.pickedProductsCount += 1;
            }

            this.pickedCount += item.currentValue;
            this.notPickedCount += item.maxQuantity - item.currentValue;
            this.weight = item.weight;
            this.showInfo = item.showInfo;
            this.containerData = item.containerData;

            this.updateStorageItem(item);
        });

        this.showAction();
        this.updateCalculation();
    }

    updateStorageItem(productItem: ProductItem): void {
        this.storageData.items[productItem.sku] = {
            isAccepted: productItem.isAccepted,
            isNotFullyAccepted: productItem.isNotFullyAccepted,
            isDeclined: productItem.isDeclined,
            count: productItem.currentValue,
            weight: productItem.weight,
            showInfo: productItem.showInfo,
            containerData: productItem.containerData
        };

        localStorage.setItem(this.orderId, JSON.stringify(this.storageData));
    }

    protected parseStorage(): void {
        if (isEmpty(this.storageData)) {
            return;
        }

        this.productItems.forEach((item: ProductItem) => {
            const storageData = this.storageData.items[item.sku];

            if (storageData) {
                item.updateItem(storageData);
            }
        });
    }

    protected clearStorage(): void {
        for (let i = 0; i < localStorage.length; i += 1){
            const storageData = JSON.parse(localStorage.getItem(localStorage.key(i)));
            const storageDataTime = new Date(storageData.timestamp).getTime();
            const currentTime = new Date().getTime();

            if (currentTime - storageDataTime > this.twentyFourHours) {
                localStorage.removeItem(localStorage.key(i));
            }
        }
    }

    protected showAction(): void {
        const isActionShow = this.pickedProductsCount === this.productItems.length;

        this.$action.toggleClass(`${this.name}__action--fixed`, isActionShow);
        $('.js-pick-products__submit-button').toggleClass('button--disabled', !isActionShow);
    }

    protected updateCalculation(): void {
        this.$notPickedField.html(this.notPickedCount);
        this.$pickedField.html(this.pickedCount);
    }

    protected get weightFieldSelector(): string {
        return `.${this.jsName}__weight`;
    }

    protected get hasInfoFieldSelector(): string {
        return `.${this.jsName}__hasInfo`;
    }

    protected get notPickedFieldSelector(): string {
        return `.${this.jsName}__not-picked`;
    }

    protected get pickedFieldSelector(): string {
        return `.${this.jsName}__picked`;
    }

    protected get actionSelector(): string {
        return `.${this.jsName}__action`;
    }

    protected get bagsSelector(): string {
        return `.${this.jsName}__bags`;
    }

    protected get submitButtonSelector(): string {
        return `.${this.jsName}__submit`;
    }

    get productsCount(): number {
        return Number(this.getAttribute('products-count'));
    }

    get orderId(): string {
        return String(this.getAttribute('order-id'));
    }
}
