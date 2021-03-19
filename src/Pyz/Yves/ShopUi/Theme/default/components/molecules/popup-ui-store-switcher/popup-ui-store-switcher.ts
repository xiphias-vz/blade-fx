import Component from 'ShopUi/models/component';
import $ from 'jquery/dist/jquery';

export default class PopupUiStoreSwitcher extends Component{
    protected $this: $ = $(this);
    protected linkToStoreSwitcher: HTMLFormElement;
    protected currentStoreValue: string;

    protected readyCallback() {
        this.linkToStoreSwitcher = <HTMLFormElement> document.getElementById('current_store_cookie');
        this.currentStoreValue = this.linkToStoreSwitcher.value;
        this.mapEvents();
    }

    protected mapEvents(): void{
        if(this.currentStoreValue == null || this.currentStoreValue == "" ){
            this.openModal();
        }
    }

    protected openModal(): void
    {
        this.$this.addClass(`${this.name}--show`);
    }
}
