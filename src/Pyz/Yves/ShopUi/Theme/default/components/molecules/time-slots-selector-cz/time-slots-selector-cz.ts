import Component from 'ShopUi/models/component';

export default class TimeSlotsSelectorCz extends Component {
    timeslotsInputs: HTMLInputElement[];
    targetInput: HTMLInputElement;
    submitButtons: HTMLButtonElement[];

    protected readyCallback(): void {}

    protected init(): void {
        this.timeslotsInputs = <HTMLInputElement[]>Array.from(this.getElementsByClassName(`${this.jsName}__input`));
        this.targetInput = <HTMLInputElement>this.getElementsByClassName(`${this.jsName}__target-input`)[0];
        this.submitButtons = <HTMLButtonElement[]>Array.from(document.getElementsByClassName(`${this.jsName}__submit-button`));
        this.mapEvents();
    }

    protected mapEvents(): void {
        this.timeslotsInputs.forEach(input => {
            input.addEventListener('change', (event: Event) => this.setTimeslot(event));
        });
    }

    protected setTimeslot(event: Event): void {
        this.targetInput.value = event.currentTarget.value;
        this.targetInput.setAttribute('value', event.currentTarget.value);
        this.enableSubmitButtons();
    }

    protected enableSubmitButtons(): void {
        this.submitButtons.forEach(button => {
            button.disabled = false;
        });
    }
}
