import Component from 'ShopUi/models/component';
import CustomSelect from '../custom-select/custom-select';
import ListSwitcher from '../list-switches/list-switches';
import $ from 'jquery/dist/jquery';
import 'slick-carousel';

const EVENT_TOGGLE_FORM = 'toggleForm';

export default class SlickCarousel extends Component {
    protected container: HTMLElement;
    protected $container: $;
    protected customSelects: CustomSelect[];
    protected initTriggers: HTMLElement[];
    protected listSwitcher: ListSwitcher;

    protected readyCallback(): void {}

    protected init(): void {
        this.container = <HTMLElement>this.getElementsByClassName(`${this.jsName}__container`)[0];
        this.listSwitcher = <ListSwitcher>document.getElementsByClassName('list-switches')[0];

        if (this.customSelectClassName) {
            this.customSelects = <CustomSelect[]>Array.from(this.getElementsByClassName(this.customSelectClassName));
        }

        if (this.isInintOnLoad) {
            this.initialize(this.container);
        }

        if (this.listSwitcher) {
            this.initializeSliderByCustomEvent();
        }
    }

    protected initializeSliderByCustomEvent(): void {
        this.listSwitcher.addEventListener(EVENT_TOGGLE_FORM, (event: CustomEvent) => {
            if (this.container.classList.contains('slick-initialized')) {
                return;
            }

            const targetContainer = <HTMLElement>this.getElementsByClassName(event.detail.targetClass)[0];
            this.initialize(targetContainer);
        });
    }

    protected initialize(container: HTMLElement): void {
        const $container = $(container);

        $container.on('init', () => {
            if (this.customSelects) {
                this.customSelects.forEach((select: CustomSelect) => {
                    select.initSelect();
                    select.changeSelectEvent();
                });
            }
        });

        $container.slick(
            this.sliderConfig
        );

        if ('ontouchstart' in document.documentElement){
            $container.slick('slickPause');
        }
    }

    protected get customSelectClassName(): string {
        return this.getAttribute('custom-select-class-name');
    }

    protected get sliderConfig(): object {
        return JSON.parse(this.getAttribute('data-json'));
    }

    protected get isInintOnLoad(): boolean {
        return this.hasAttribute('is-init-on-load');
    }
}
