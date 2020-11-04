import CoreMerchantSelectorForm from 'MerchantSwitcherWidget/components/molecules/merchant-selector-form/merchant-selector-form';

export default class MerchantSelectorForm extends CoreMerchantSelectorForm {
    protected init(): void {
        super.init();
    }

    async setMerchant(): Promise<void> {
        if (!confirm(this.message)) {
            this.selectInitialOption();

            return;
        }

        try {
            this.form.submit();
        } catch (error) {
            console.error(error);
        }
    }

    protected selectInitialOption(): void {
        const initialMerchantOption: HTMLOptionElement = this.select.options[this.initiallySelectedIndex];
        initialMerchantOption.selected = true;
    }
}
