import Component from 'ShopUi/models/component';
import $ from 'jquery/dist/jquery';

export default class PopupAgeConfirmation extends Component{
    protected $this: $ = $(this);
    protected ageRestrictionInfo: HTMLFormElement;
    protected ageConfirmationNeeded: string;
    protected ageConfirmedYesButton: HTMLButtonElement;
    protected ageConfirmedNoButton: HTMLButtonElement;

    protected readyCallback() {
        this.ageConfirmedYesButton = <HTMLButtonElement> document.getElementById('age-confirmation-yes-button');
        this.ageConfirmedNoButton = <HTMLButtonElement> document.getElementById('age-confirmation-no-button');
        this.ageRestrictionInfo = <HTMLFormElement> document.getElementById('age-restriction');
        this.ageConfirmationNeeded = this.ageRestrictionInfo.value;
        try{
            if (this.ageConfirmationNeeded === '18'){
                this.openModal();
            }
        } catch (e) {
            console.log(e);
        }
        this.mapEvents();
    }

    protected mapEvents(){
        this.ageConfirmedYesButton.addEventListener('click', () => {
            this.closeModal(this.$this);
        });
        this.ageConfirmedNoButton.addEventListener('click', () => {
            this.redirectToHomePage();
        });
    }

    protected openModal(): void
    {
        this.$this.addClass(`${this.name}--show`);
    }

    protected closeModal(className): void{
        className.removeClass(`${this.name}--show`);
    }

    protected redirectToHomePage(): void {
        $.ajax({
            type: 'POST',
            url: window.location.href = '/'
        });
    }
}
