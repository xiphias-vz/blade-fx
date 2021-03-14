import Component from 'ShopUi/models/component';
import $ from 'jquery/dist/jquery';


export default class PosListeItem extends Component{
    $this: $ = $(this);
    protected $productItemWrapper: $;
    public $productItemId: string;
    public $productItemForm: HTMLFormElement;

    /**
     *
     * @protected
     */
    protected readyCallback() {

    }

    /**
     *
     * @protected
     */
    protected init(): void{
        this.$productItemWrapper = this.$this.find(this.productItemDivSelector);
        this.$productItemForm =  this.$this.find(this.orderItemForm);
        this.mapEvents();
    }

    /**
     *
     * @param event
     * @protected
     */
    protected formClickHandler(event: MouseEvent): void
    {
        this.$productItemId = this.$productItemWrapper[0].id;
        alert('IN PROGRESS \n You will be rerouted to the order picking process to the item with id: ' + this.$productItemId);
    }

    /**
     *
     * @protected
     */
    protected get productItemDivSelector(): string{
        return `.${this.jsName}__product-item`;
    }

    /**
     *
     * @protected
     */
    protected mapEvents(): void{
        this.$productItemWrapper.on('click', (event: MouseEvent) => this.formClickHandler(event));
    }

    /**
     *
     * @protected
     */
    protected get orderItemForm(): string {
        return `.${this.jsName}__form`;
    }

}
