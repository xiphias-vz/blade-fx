import Component from 'ShopUi/models/component';
import $ from 'jquery/dist/jquery';

export default class RegisterPageLeftSide extends Component{
    protected radioButton;
    protected globusCardDiv;
    protected myGlobusCardNumber;
    protected hiddenMyGlobusCardNumber;

    protected readyCallback() {
    }

    protected init() {
        this.radioButton = document.querySelectorAll('input[name="radio_kundenkarte"]');
        this.globusCardDiv = document.querySelector('#globus-card-yes');
        this.myGlobusCardNumber = document.querySelector('#myGlobusCardNumber');
        this.hiddenMyGlobusCardNumber = document.querySelector('#registerForm_my_globus_card_number');

        this.mapEvents();
    }

    protected mapEvents(): void {
        this.radioButton.forEach(checkbox => {
            checkbox.addEventListener('change', () => this.radioChange(checkbox));
        });
        this.myGlobusCardNumber.addEventListener('focusout', () => this.focusOutMyGlobusCard());
    }

    protected radioChange(checkbox: HTMLInputElement): void {
            if (checkbox.value == "Yes"){
            this.globusCardDiv.classList.remove("hidden");
            }
            else {
                this.globusCardDiv.classList.add("hidden");
                this.hiddenMyGlobusCardNumber.value = '';
                this.myGlobusCardNumber.value = '';
            }
    }

    protected focusOutMyGlobusCard(): void {
        this.hiddenMyGlobusCardNumber.value = this.myGlobusCardNumber.value;
    }
}
