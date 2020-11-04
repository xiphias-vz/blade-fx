import AjaxRenderer from 'ShopUi/components/molecules/ajax-renderer/ajax-renderer';
import { mount } from 'ShopUi/app';

export default class AjaxRendererExtended extends AjaxRenderer {
    protected onFetched(event: Event): void {
        super.onFetched(event);

        if (this.mountAfterRender) {
            mount();
        }
    }
}
