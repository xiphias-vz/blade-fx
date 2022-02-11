import Component from 'ShopUi/models/component';

export default class LazyImageFf extends Component {
    protected image: HTMLElement;
    protected imageSource: string;

    protected readyCallback(): void {
        this.image = <HTMLElement>this.getElementsByClassName(this.imageClass)[0];
        this.imageSource = this.image.src;
        this.mapEvents();
    }

    protected mapEvents(): void {
        this.removeInvisibleClass();
        this.setCorrectHeightClassForImage(this.imageSource);

    }

    protected removeInvisibleClass(): void {
        this.image.classList.remove('is-invisible');
    }

    protected setCorrectHeightClassForImage(url: string): void
    {
        this.getWidthAndHeightOfImageFromSrcUrl(url);
    }

    protected getWidthAndHeightOfImageFromSrcUrl(url: string): void
    {
        let img = new Image();
        var self = this;
        img.addEventListener("load", function (){
            if (this.width !== this.height){
                 self.removeDefaultHeightAttribute(this.height, this.width);
            }
        });
        img.src = url;
    }

    protected removeDefaultHeightAttribute(height: number, width: number): void{
        if(width > height)
        {
            this.image.parentElement.classList.remove('lazy-image');
        }
        this.image.classList.remove('js-lazy-image__content');
    }

    protected get imageClass(): string {
        return `${this.jsName}__content`;
    }

}
