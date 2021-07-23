import Component from 'ShopUi/models/component';
import $ from 'jquery/dist/jquery';

export default class RegisterPageLeftSide extends Component{
    protected radioButton;
    protected globusCardDiv;
    protected myGlobusCardNumber;
    protected hiddenMyGlobusCardNumber;
    protected hiddenIsAdvertise;
    protected checkboxIsAdvertise;
    protected hiddenIsMeinGlobus;

    protected readyCallback() {
    }

    protected init() {
        this.radioButton = document.querySelectorAll('input[name="radio_kundenkarte"]');
        this.globusCardDiv = document.querySelector('#globus-card-yes');
        this.myGlobusCardNumber = document.querySelector('#myGlobusCardNumber');
        this.hiddenMyGlobusCardNumber = document.querySelector('#registerForm_my_globus_card_number');
        this.hiddenIsAdvertise = document.querySelector('#registerForm_isAdvertise');
        this.checkboxIsAdvertise = document.querySelector('#chk_isAdvertise .checkbox__input');
        this.hiddenIsAdvertise.value = "false";
        this.hiddenIsMeinGlobus = document.querySelector('#registerForm_isMeinGlobus');

        this.mapEvents();
    }

    protected mapEvents(): void {
        this.radioButton.forEach(checkbox => {
            checkbox.addEventListener('change', () => this.radioChange(checkbox));
        });

        this.myGlobusCardNumber.addEventListener('focusout', () => this.focusOutMyGlobusCard());

        this.checkboxIsAdvertise.addEventListener('change', (event) => {
            if(event.currentTarget.checked) {
                this.hiddenIsAdvertise.value = "true";
            }
            else {
                this.hiddenIsAdvertise.value = "false";
            }
        })
    }

    protected radioChange(checkbox: HTMLInputElement): void {
            if (checkbox.value == "Yes"){
                this.globusCardDiv.classList.remove("hidden");
                this.hiddenIsMeinGlobus.value = true;
            }
            else {
                this.globusCardDiv.classList.add("hidden");
                this.hiddenMyGlobusCardNumber.value = '';
                this.myGlobusCardNumber.value = '';
                this.hiddenIsMeinGlobus.value = false;
            }
    }

    protected focusOutMyGlobusCard(): void {
        this.hiddenMyGlobusCardNumber.value = this.myGlobusCardNumber.value;
    }
}
