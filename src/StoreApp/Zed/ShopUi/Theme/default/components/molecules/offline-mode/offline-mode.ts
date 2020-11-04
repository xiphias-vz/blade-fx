import Component from 'ShopUi/models/component';
import $ from 'jquery/dist/jquery';

export default class OfflineMode extends Component {
    protected overlay: HTMLElement;

    protected readyCallback(): void {}

    protected init(): void {}

    initOfflineMode($form: $): void {
        window.addEventListener('online',  () => {
            $form.submit();
        });
    }

    showOfflineMessage(): void {
        this.classList.add(`${this.name}--showed`);
    }

    hideOfflineMessage(): void {
        this.classList.remove(`${this.name}--showed`);
    }
}
