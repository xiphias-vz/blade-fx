import Component from 'ShopUi/models/component';

export default class LazyImage extends Component {
    protected image: HTMLElement;

    protected readyCallback(): void {
        this.image = <HTMLElement>this.getElementsByClassName(this.imageClass)[0];

        this.mapEvents();
    }

    protected mapEvents(): void {
        this.removeInvisibleClass();
    }

    protected removeInvisibleClass(): void {
        this.image.classList.remove('is-invisible');
    }

    protected get imageClass(): string {
        return `${this.jsName}__content`;
    }
}
