import Component from 'ShopUi/models/component';
import $ from 'jquery/dist/jquery';
import 'slick-carousel';

export default class ImageGallery extends Component {
    protected galleryItems: HTMLElement[];
    protected image: HTMLElement;
    protected thumbnail: HTMLElement;
    protected thumbnailItems: HTMLElement[];

    protected readyCallback(): void {
    }

    protected init(): void {
        this.galleryItems = <HTMLElement[]>Array.from(this.getElementsByClassName(`${this.jsName}__item`));
        this.thumbnail = <HTMLElement>this.getElementsByClassName(`${this.jsName}-thumbnail`)[0];
        this.thumbnailItems = <HTMLElement[]>Array.from(this.getElementsByClassName(`${this.jsName}-thumbnail__item`));
        this.image = <HTMLElement>this.getElementsByClassName(this.imageClass)[0];

        this.initSlider();
        this.addHeightToTheImg();
        this.mapEvents();
    }

    protected mapEvents(): void {

        if (this.thumbnail) {
            this.thumbnail.addEventListener('click', (event: Event) => this.onThumbnailHover(event), true);
        }
    }

    protected addHeightToTheImg(): void{
        this.image.setAttribute('style', 'height: auto !important');
    }

    protected initSlider(): void {
        if (window.matchMedia('(max-width: 768px)').matches) {
            $(".slick-track").css({"transform": "translate3d(0px, 0px, 0px)"});
            this.mobileViewSetPreviewImage();
        }
        else {
            $("#mobile-slider").css("display", "none");
        }
        $(this.thumbnail).slick(this.thumbnailSliderConfig);
    }

    protected onThumbnailHover(event: Event): void {
        const thumbnail = <HTMLElement> event.target;
        if (thumbnail.classList.contains(`${this.jsName}-thumbnail__item`)) {
           this.thumbnailChange(thumbnail);
        }
    }

    protected thumbnailChange(thumbnail: HTMLElement): void {
        const index = Number(thumbnail.dataset.thumbnailIndex);
        if (!thumbnail.classList.contains(this.thumbnailActiveClass)) {
            var allItems = <HTMLElement[]>Array.from(this.getElementsByClassName(`${this.jsName}-thumbnail__item`));
            allItems.forEach(thumbnailItem => thumbnailItem.classList.remove(this.thumbnailActiveClass));
            thumbnail.classList.add(this.thumbnailActiveClass);
            this.setActiveImage(index);
        }
    }

    setActiveImage(activeItemIndex: number): void {
        var allGalleryItems = <HTMLElement[]>Array.from(this.getElementsByClassName(`${this.jsName}__item`));
        allGalleryItems.forEach(galleryItem => galleryItem.classList.remove(this.activeClass));
        this.galleryItems[activeItemIndex].classList.add(this.activeClass);
        this.mobileViewSetPreviewImage();
    }

    protected mobileViewSetPreviewImage(): void {
        $("#mobile-slider").empty();
        var find = $(".image-gallery-thumbnail__item.js-image-gallery-thumbnail__item.image-gallery-thumbnail__item--active")[0];
        var imgSrc = find.getElementsByClassName("image-gallery-thumbnail__img")[0].src;
        var splited = imgSrc.split('thumb_');
        if(splited.length > 1){
            var srcWithOutThumb = splited[0] + splited[1];
            find.getElementsByClassName("image-gallery-thumbnail__img")[0].src = srcWithOutThumb;
        }
        var activeSource = $(find).clone();
        $(activeSource[0]).removeClass("image-gallery-thumbnail__item");
        $(activeSource[0]).removeClass("js-image-gallery-thumbnail__item");
        $(activeSource[0]).removeClass("image-gallery-thumbnail__item--active");
        $("#mobile-slider").append(activeSource);

    }

    protected get activeClass(): string {
        return this.getAttribute('active-class');
    }

    protected get thumbnailSliderConfig(): object {
        return JSON.parse(this.getAttribute('slider-config'));
    }

    protected get thumbnailActiveClass(): string {
        return this.getAttribute('thumbnail-active-class');
    }

    protected get imageClass(): string {
        return `image-gallery-thumbnail__img`;
    }
}
