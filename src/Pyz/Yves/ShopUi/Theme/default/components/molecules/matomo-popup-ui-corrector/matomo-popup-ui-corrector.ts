import Component from 'ShopUi/models/component';

const INTERVAL_TIMEOUT = 200;
const MAX_TIMEOUT = 5000;

export default class MatomoPopupUiCorrector extends Component {
    protected interval: number;
    protected popupHolder: HTMLElement;
    protected pageBody: HTMLElement;

    protected readyCallback(): void {}

    protected init(): void {
        this.pageBody = document.getElementsByTagName('body')[0];
        window.setTimeout(this.clearCurrentInterval.bind(this), MAX_TIMEOUT);
        this.interval = window.setInterval(this.removeScrollOnOverlay.bind(this), INTERVAL_TIMEOUT);
    }

    protected clearCurrentInterval(): void {
        window.clearInterval(this.interval);
    }

    protected removeScrollOnOverlay() {
        this.popupHolder = document.querySelector('[id^="ppms_cm_consent_popup"]');
        if (!this.popupHolder) {
            return;
        }
        this.pageBody.classList.add('no-scroll');
        this.initModalButtons();
        this.removeDisagreeButton();
        this.clearCurrentInterval();
    }

    protected initModalButtons(): void {
        const buttons: HTMLElement[] = [];
        buttons.push(<HTMLElement>document.getElementsByClassName('ppms_cm_close_popup')[0]);
        buttons.push(<HTMLElement>document.getElementsByClassName('ppms_cm_button_primary')[0]);
        buttons.push(<HTMLElement>document.getElementsByClassName('ppms_cm_button')[0]);
        buttons.map(button => {
            button.addEventListener('click', () => {
                this.pageBody.classList.remove('no-scroll');
            });
        });
    }

    protected removeDisagreeButton(): void {
        const disagreeButton = <HTMLButtonElement>document.getElementById('ppms_cm_disagree');
        if (!disagreeButton){
            return;
        }
        disagreeButton.remove();
    }
}
