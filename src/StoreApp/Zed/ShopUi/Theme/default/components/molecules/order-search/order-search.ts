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
        let itemsFound = 0;
        let numOfCharacters = 0;

        this.$searchItems.each((index: number, searchItem: HTMLElement) => {
            const $inputValue = this.currentInputValue;
            const $searchItem = $(searchItem);
            const isMatchByOrder = $searchItem.data('order').indexOf($inputValue) >= 0;
            const isMatchByReference = $searchItem.data('reference').indexOf($inputValue) >= 0;
            const isNotReadyForCollection = $searchItem.data('pickupstatus') != "ready for collection";

                if($inputValue==='') {
                    $searchItem.show();
                    itemsFound++;
                } else {
                numOfCharacters = $inputValue.length;
                $searchItem.hide();

                if (isMatchByOrder || isMatchByReference) {
                    itemsFound++;

                    if(numOfCharacters === 9){
                        if(isMatchByReference){
                            if(isNotReadyForCollection){
                                alert("Bestellung in Bearbeitung");
                            }
                        }
                    }
                    else if(numOfCharacters > 4){
                        if(isMatchByOrder){
                            if(isNotReadyForCollection){
                                alert("Bestellung in Bearbeitung");
                            }
                        }
                    }

                }

                if(itemsFound != 0){
                    $searchItem.show();
                }
             }

        });

        if(itemsFound === 0){
            alert("Unbekannte Bestellung");
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
