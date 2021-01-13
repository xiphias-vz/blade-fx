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

    protected readyCallback(): void {}

    protected init(): void {
        this.$searchItems = <$>$(document).find(this.searchItemsSelector);
        this.$input = <$>$(this).find(this.inputSelector);
        this.$select = <$>$(this).find(this.selectSelector);

        this.mapEvents();
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
        let orderInProgress = 0;
        let itemsFound = 0;
        let numOfCharacters = 0;

        this.$searchItems.each((index: number, searchItem: HTMLElement) => {
            const $searchItem = $(searchItem);
            const $inputValue = this.currentInputValue;
            if($inputValue==='') {
                $searchItem.show();
                itemsFound++;
            } else {
                const isMatchByOrder = $searchItem.data('order').indexOf($inputValue) >= 0;
                const isMatchByReference = $searchItem.data('reference').indexOf($inputValue) >= 0;
                const isNotReadyForCollection = $searchItem.data('pickupstatus') != "ready for collection";
                numOfCharacters = $inputValue.length;
                $searchItem.hide();

                if (isMatchByOrder || isMatchByReference || $inputValue == '') {
                    if(isNotReadyForCollection) {
                        orderInProgress++;
                    }
                    else{
                        $searchItem.show();
                        itemsFound++;
                    }
                }
            }
        });

        if(itemsFound === 0){
            if((orderInProgress === 1)) {
                alert("Bestellung in Bearbeitung");
            } else if(numOfCharacters === 9){
                alert("Unbekannte Bestellung");
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
