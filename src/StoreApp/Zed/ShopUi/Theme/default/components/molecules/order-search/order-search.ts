import Component from 'ShopUi/models/component';
import debounce from 'lodash-es/debounce';
import $ from 'jquery/dist/jquery';

export default class OrderSearch extends Component {
    protected $searchItems: $;
    protected $input: $;
    protected currentInputValue: string;
    protected $select: $;
    protected currentSelectValue: string;
    protected isTimeActive = false;
    protected debounceDelay = 300;
    orderProgress: HTMLInputElement;
    orderUnknown: HTMLInputElement;

    protected readyCallback(): void {}

    protected init(): void {
        this.$searchItems = <$>$(document).find(this.searchItemsSelector);
        this.$input = <$>$(this).find(this.inputSelector);
        this.$select = <$>$(this).find(this.selectSelector);
        this.orderProgress = <HTMLInputElement>document.querySelector('#order_progress');
        this.orderUnknown = <HTMLInputElement>document.querySelector('#order_unknown');

        this.mapEvents();
        document.body.onload = function() {
            document.querySelector(".js-order-search__input").focus();
            var evt = new KeyboardEvent('keydown', {'key':'a'});
            document.dispatchEvent(evt);
        };
    }

    protected mapEvents(): void {
        this.$input.on('input', debounce(() => this.searchChangedHandler(), this.debounceDelay));

        if (this.$select.length) {
            this.$select.on('change', () => this.searchChangedHandler());
            this.isTimeActive = true;
        }
    }

    protected searchChangedHandler(): void {
        this.currentInputValue = String(this.$input.val()).toLowerCase();

        if (this.$select.length) {
            this.currentSelectValue = this.$select.val();
        }

        this.searchItems();
    }

    protected searchItems(): void {
        let itemsWithOtherStatus = 0;
        let itemsFound = 0;
        let numOfCharacters = 0;
        let numberOfReady = 0;
        let numberOfNotReady = 0;
        const $inputValue = this.currentInputValue.toUpperCase();
        let statusType = document.querySelector("#sourcetwig").getAttribute("datatype");

        this.$searchItems.each((index: number, searchItem: HTMLElement) => {
            const $searchItem = $(searchItem);
            const isMatchByOrder = $searchItem.data('order').toUpperCase().indexOf($inputValue) >= 0;
            const isMatchByReference = $searchItem.data('reference').toUpperCase().indexOf($inputValue) >= 0;
            const ordersBeforeReadyToCollectStatus = $searchItem.data('ordersbeforereadytocollectstatus');

            if($inputValue==='') {
                $searchItem.show();
                itemsFound++;
            } else {
                numOfCharacters = $inputValue.length;
                $searchItem.hide();

                if (isMatchByOrder || isMatchByReference) {
                    numberOfNotReady++;

                    $searchItem.show();
                    itemsFound++;

                }
                else {
                    $.map(ordersBeforeReadyToCollectStatus, function(v) {
                        if(v["orderReference"].indexOf($inputValue) >= 0 || v["collectNumber"].indexOf($inputValue) >= 0){
                            itemsWithOtherStatus++;
                        }
                    })

                }
             }
        });

        if(itemsFound === 0){
            if(itemsWithOtherStatus > 0){
                alert(this.orderProgress.value);
            }
            else{
                alert(this.orderUnknown.value);
            }
        }

    }

    get inputSelector(): string {
        return `.${this.jsName}__input`;
    }

    get selectSelector(): string {
        return `.${this.jsName}__select`;
    }

    get searchItemsSelector(): string {
        return `.${this.getAttribute('search-item-class')}`;
    }
}
