import Component from 'ShopUi/models/component';

export default class DeliverySubmitter extends Component {
    protected customCheckboxes: HTMLInputElement[];
    protected inputs: HTMLInputElement[];
    protected counterNode: HTMLElement;
    protected counter = 0;
    protected activeClass = 'active';

    protected readyCallback(): void {
        this.customCheckboxes = <HTMLInputElement[]>Array.from(document.getElementsByClassName(this.checkboxClassName));
        this.inputs = <HTMLInputElement[]>Array.from(document.getElementsByClassName(''));
        this.counterNode = <HTMLElement>this.getElementsByClassName(this.counterSelector)[0];

        this.mapEvents();
    }

    protected mapEvents(): void {
        this.initialCheckboxesState();

        this.customCheckboxes.forEach(checkbox => {
            checkbox.addEventListener('change', () => this.triggerCheckbox(checkbox));
        });
    }

    protected initialCheckboxesState(): void {
        this.customCheckboxes.forEach(checkbox => {
            if (checkbox.dataset.default === this.activeClass) {
                this.counter += 1;
                checkbox.checked = true;
            }
        });

        this.classList.toggle(this.activeClass, this.counter > 0);
        this.counterNode.innerHTML = this.counter.toString();
    }

    protected triggerCheckbox(checkbox: HTMLInputElement): void {
        const checkboxId = checkbox.dataset.id;
        const allInputs = <HTMLInputElement[]>Array.from(document.getElementsByTagName('input'));
        const symfonyCheckbox = allInputs.filter(input => input.id === checkboxId)[0];
        const closestBlock = checkbox.closest(`.${this.closestBlockClassName}`);

        this.counter = checkbox.checked ? this.counter + 1 : this.counter - 1;
        this.counterNode.innerHTML = this.counter.toString();
        this.classList.add(this.activeClass);
        closestBlock.classList.toggle(this.activeClass, checkbox.checked);
        symfonyCheckbox.checked = checkbox.checked;
    }

    get checkboxClassName(): string {
        return this.getAttribute('target-checkbox-class');
    }

    get closestBlockClassName(): string {
        return this.getAttribute('closest-block-class');
    }

    get counterSelector(): string {
        return `${this.jsName}__counter`;
    }
}
