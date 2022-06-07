import Component from 'ShopUi/models/component';

interface ClonedImage {
    id: number;
    element: HTMLImageElement;
    coordinates: DOMRect;
    animationStarted: number;
}

export default class ImageAnimation extends Component {
    protected links: HTMLLinkElement[];
    protected clonedImages: ClonedImage[] = [];
    protected body: HTMLBodyElement;
    protected start: number;
    protected animationDuration: number = 1000;
    protected percent: number = 100;
    protected exponent: number = 2;
    protected cartLinks: HTMLElement[];
    protected cartLinkCoordinates: DOMRect;
    private environment: HTMLInputElement;
    private url: string;

    protected readyCallback(): void {
        this.environment = document.querySelector('#environment');
        this.url = location.href;

        if (this.environment.value === 'DE') {
            let checkRecordsAreRendered = setInterval(() => {
                this.links = <HTMLLinkElement[]>Array.from(document.getElementsByClassName(this.linksClass));
                if(this.links.length > 0) {
                    this.load();
                    this.listenForUrlChanges();
                    clearInterval(checkRecordsAreRendered);
                }
            }, 500);
        } else {
            this.loadDOM();
        }
    }

    protected listenForUrlChanges() {
        setInterval(() =>
        {
            if (this.url != location.href)
            {
                this.url = location.href;
                this.loadDOM();
            }
        }, 500);
    }

    protected loadDOM() {
        this.links = <HTMLLinkElement[]>Array.from(document.getElementsByClassName(this.linksClass));
        if (this.links.length > 0) {
            this.load();
        }
    }

    protected load() {
        this.body = <HTMLBodyElement>document.getElementsByTagName('body')[0];
        this.cartLinks = <HTMLElement[]>Array.from(document.getElementsByClassName('cart-link'));
        this.mapEvents();
    }

    protected mapEvents(): void {
        this.links.forEach((link: HTMLLinkElement) => {
            if (link.getAttribute('animation') !== "1") {
                link.addEventListener('click', (event: Event) => this.clickTrigger(event, link));
                link.setAttribute('animation', '1');
            }
        });

        window.addEventListener('scroll', () => {
            this.cartCoordinates();
        });
    }

    protected clickTrigger(event: Event, link: HTMLLinkElement): void {
        this.startImageAnimation(this.imageClass(link));
    }

    protected startImageAnimation(imageClass: string): void {
        const image = <HTMLImageElement>document.getElementsByClassName(imageClass)[0];
        const imageCoordinates = <DOMRect>image?.getBoundingClientRect();
        const clonedImage = <HTMLImageElement>image?.cloneNode(true);

        if (clonedImage !== undefined && clonedImage !== null) {
            clonedImage.className = `${this.name}__image`;
            clonedImage.style.cssText = `
            top: ${imageCoordinates.top + pageYOffset}px;
            left: ${imageCoordinates.left + pageXOffset}px;
            width: ${imageCoordinates.width}px;
        `;

            this.clonedImages.push({
                id: this.clonedImages.length ? this.clonedImages[this.clonedImages.length - 1].id + 1 : 1,
                element: clonedImage,
                animationStarted: performance.now(),
                coordinates: imageCoordinates
            });

            this.cartCoordinates();
            this.body.appendChild(clonedImage);
            requestAnimationFrame((time: number) => this.animateImage(time));
        }
    }

    protected animateImage(time: number): void {
        if (!this.clonedImages.length) {
            return;
        }

        this.moveImages(time);

        /* tslint:disable: no-shadowed-variable*/
        requestAnimationFrame((time: number) => this.animateImage(time));
        /* tslint:enable: no-shadowed-variable */
    }

    protected moveImages(time: number): void {
        this.clonedImages.forEach((image: ClonedImage) => {
            const timeFraction = (time - image.animationStarted) / this.animationDuration;
            const progress = Math.pow(timeFraction, this.exponent);
            const percentageProgress = progress * this.percent;

            const topDistance = (image.coordinates.top + pageYOffset) - (this.cartLinkCoordinates.top + pageYOffset);
            const progressTopDistance = (topDistance * percentageProgress) / this.percent;
            const newTopDistance = (image.coordinates.top + pageYOffset) - progressTopDistance;

            const leftDistance = (image.coordinates.left + pageXOffset) - (this.cartLinkCoordinates.left + pageXOffset);
            const progressLeftDistance = (leftDistance * percentageProgress) / this.percent;
            const newLeftDistance = (image.coordinates.left + pageXOffset) - progressLeftDistance;

            const widthDistance = image.coordinates.width - this.cartLinkCoordinates.width;
            const progressWidthDistance = (widthDistance * percentageProgress) / this.percent;

            image.element.style.top = `${newTopDistance}px`;
            image.element.style.left = `${newLeftDistance}px`;
            image.element.style.width = `${image.coordinates.width - progressWidthDistance}px`;

            if (percentageProgress > this.percent) {
                const index = this.clonedImages.indexOf(image);

                this.clonedImages.splice(index, 1);
                image.element.parentNode.removeChild(image.element);
            }
        });
    }

    protected cartCoordinates(): void {
        this.cartLinks.forEach((link: HTMLElement) => {
            if (link.offsetParent !== null) {
                this.cartLinkCoordinates = <DOMRect>link.getBoundingClientRect();
            }
        });
    }

    protected imageClass(link: HTMLLinkElement): string {
        let productId = link.dataset.productId.replaceAll('\n', '').trim();
        return `${this.jsName}__image-${productId}`;
    }

    protected get linksClass(): string {
        return `${this.jsName}__link`;
    }
}
