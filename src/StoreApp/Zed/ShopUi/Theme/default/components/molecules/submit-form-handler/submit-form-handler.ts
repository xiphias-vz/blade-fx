import Component from 'ShopUi/models/component';
import $ from 'jquery/dist/jquery';
import OfflineMode from '../offline-mode/offline-mode';

export default class SubmitFormHandler extends Component {
    protected $document = $(document);
    protected $form: $;
    protected offlineMode: OfflineMode;

    protected readyCallback(): void {}

    protected init(): void {
        this.$form = this.$document.find(`.${this.jsName}__form`);
        this.offlineMode = <OfflineMode>document.getElementsByClassName('offline-mode')[0];

        this.mapEvents();
    }

    protected mapEvents(): void {
        this.$form.on('submit', (event: Event) => this.formSubmitHandler(event));
    }

    protected formSubmitHandler(event: Event): void {
        if (navigator.onLine) {
            return;
        }

        event.preventDefault();
        const $form = $(event.currentTarget);

        this.offlineMode.showOfflineMessage();
        this.offlineMode.initOfflineMode($form);
    }

    get action(): string {
        return this.$form.prop('action');
    }

    get routeId(): string {
        return this.getAttribute('route-id');
    }
}
