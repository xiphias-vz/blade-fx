import Component from 'ShopUi/models/component';
import $ from 'jquery/dist/jquery';

const ANIMATION_SPEED = 500;
const ANIMATION_TYPE = 'swing';

export default class ScrollToTop extends Component {
    trigger: HTMLElement;

    protected readyCallback(): void {}

    protected init(): void {
        this.trigger = <HTMLElement>this.getElementsByClassName(`${this.jsName}__trigger`)[0];

        this.mapEvents();
    }

    protected mapEvents(): void {
        this.trigger.addEventListener('click', () => this.scrollToTop());
    }

    scrollToTop(): void {
        const $body = $('html, body');
        $body.stop().animate({scrollTop:0}, ANIMATION_SPEED, ANIMATION_TYPE);
    }
}
