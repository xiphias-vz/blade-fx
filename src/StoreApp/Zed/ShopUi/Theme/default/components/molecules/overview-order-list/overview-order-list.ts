import Component from 'ShopUi/models/component';
import $ from 'jquery/dist/jquery';

export default class OverviewOrderList extends Component {
    protected displayNoteOnOrder: HTMLCollection;
    protected hideNoteOnOrder: HTMLCollection;
    protected $divNote: [];

    protected readyCallback(): void {}

    protected init(): void {
       this.displayNoteOnOrder = <HTMLCollection>this.querySelectorAll('.button-note-div');
       this.hideNoteOnOrder = <HTMLCollection>this.querySelectorAll('.close-note');

       this.mapEvents();
    }

    protected mapEvents(): void {
        let orders = <HTMLElement>document.getElementsByClassName('orderClass');

        for(let i = 0; i < this.displayNoteOnOrder.length; i++) {
            let idOrder = orders[i].getAttribute("data-idOrder");
            this.displayNoteOnOrder[i].addEventListener('click', (event: Event) => this.showNoteOnOrder(idOrder));
            this.hideNoteOnOrder[i].addEventListener('click', (event: Event) => this.removeNoteOnOrder(idOrder));
        }
    }

    protected showNoteOnOrder(elementId)
    {
        let divNoteId = "divNote-" + elementId;
        let noteMessage = <HTMLElement>document.getElementById(divNoteId);
        let bubbleNoteId = "buttonNote-" + elementId;
        let buttonChange = <HTMLElement>document.getElementById(bubbleNoteId);

        noteMessage.style.display = "block";
        buttonChange.classList.add("overview-order-list__bubble-green");
    }

    protected removeNoteOnOrder(elementId)
    {
        let divNoteId = "divNote-" + elementId;
        let noteMessage = <HTMLElement>document.getElementById(divNoteId);
        let bubbleNoteId = "buttonNote-" + elementId;
        let bubbleButton = <HTMLElement>document.getElementById(bubbleNoteId);

        noteMessage.style.display = "none";
        bubbleButton.classList.remove("overview-order-list__bubble-green");
    }

}
