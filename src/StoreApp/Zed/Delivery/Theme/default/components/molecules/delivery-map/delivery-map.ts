import Component from 'ShopUi/models/component';
import Map from 'ol/Map';
import View from 'ol/View';
import { defaults as defaultInteractions, DragRotateAndZoom } from 'ol/interaction';
import { Point } from 'ol/geom';
import { fromLonLat, transform } from 'ol/proj';
import { Vector as SouceVector } from 'ol/source';
import { Vector as LayerVector } from 'ol/layer';
import { Icon, Style } from 'ol/style';
import Overlay from 'ol/Overlay';
import TileLayer from 'ol/layer/Tile';
import OSM from 'ol/source/OSM';
import Feature from 'ol/Feature';

interface MarkerItem {
    address: string;
    deliveryInterval: string;
    latitude: number;
    longitude: number;
    reference: string;
}

export default class DeliveryMap extends Component {
    /* tslint:disable:no-any */
    protected map: any;
    protected addressPopup: any;
    /* tslint:enable:no-any */
    protected mapWrapper: HTMLDivElement;
    protected half: number = 2;

    protected readyCallback(): void {
        this.mapWrapper = <HTMLDivElement>this.getElementsByClassName(this.mapWrapperClass)[0];

        this.createMap();
    }

    protected async createMap(): Promise<void> {
        this.addressPopup = await this.createAddressPopup();

        this.map = await new Map({
            interactions: defaultInteractions().extend([
                new DragRotateAndZoom({
                    onFocusOnly: true
                })
            ]),
            layers: [
                new TileLayer({
                    source: new OSM()
                })
            ],
            overlays: [this.addressPopup],
            target: this.mapWrapper,
            ...(this.mapMarkers.length === 1 && {
                view: new View({
                    center: fromLonLat([this.mapMarkers[0].longitude, this.mapMarkers[0].latitude]),
                    zoom: 14
                })
            })
        });

        this.mapEvents();
        this.setMarkers();
    }

    protected mapEvents(): void {
        const closeBtn = this.addressPopup.options.element.getElementsByClassName(this.closeBtnClass)[0];

        closeBtn.addEventListener('click', (event: Event) => {
            this.clickHandler(event);
        });
    }

    protected clickHandler(event: Event): void {
        event.preventDefault();

        this.addressPopup.setPosition(undefined);
    }

    protected setMarkers(): void {
        const markers = [];

        this.mapMarkers.forEach((markerData: MarkerItem) => {
            markers.push(this.createMarker(markerData));
            this.createMarker(markerData);
        });

        const vectorSource = new SouceVector({
            features: markers
        });

        const markerVectorLayer = new LayerVector({
            source: vectorSource,
        });

        this.map.addLayer(markerVectorLayer);

        /* tslint:disable:no-magic-numbers */
        if (markers.length > 1) this.map.getView().fit(vectorSource.getExtent(), {padding: [30, 30, 30, 30]});
        /* tslint:enable:no-magic-numbers */
    }

    protected createMarker(markerData: MarkerItem): Feature {
        const marker = new Feature({
            geometry: new Point(
                fromLonLat([markerData.longitude, markerData.latitude]),
            ),
        });

        const markerIcon = new Overlay({
            position: fromLonLat([markerData.longitude, markerData.latitude]),
            element: this.createMarkerBody(markerData),
            positioning: 'center-center'
        });

        this.map.addOverlay(markerIcon);

        return marker;
    }

    protected createMarkerBody(markerData: MarkerItem): HTMLElement {
        const popupElement = document.createElement('div');

        popupElement.innerHTML = this.referencePopupTemplate.replace(/%reference%/gi, markerData.reference);

        popupElement.addEventListener('click', () => {
            this.setAddressPopup(markerData);
        });

        return popupElement;
    }

    protected createAddressPopup(): Overlay {
        const popupElement = document.createElement('div');

        popupElement.innerHTML = this.addressPopupTemplate;

        const addressPopup = new Overlay({
            element: popupElement,
            positioning: 'bottom-center',
            autoPan: true,
            autoPanAnimation: {
                duration: 250
            }
        });

        return addressPopup;
    }

    protected setAddressPopup(markerData: MarkerItem): void {
        const content = this.addressPopup.options.element.getElementsByClassName(this.contentClass)[0];

        content.innerHTML = `
            <div>${markerData.deliveryInterval}</div>
            <div>${markerData.address}</div>
        `;

        this.addressPopup.setPosition(fromLonLat([markerData.longitude, markerData.latitude]));
    }

    get mapMarkers(): MarkerItem[] {
        return JSON.parse(this.getAttribute('markers-json'));
    }

    get mapWrapperClass(): string {
        return `${this.jsName}__map`;
    }

    get contentClass(): string {
        return `${this.jsName}__content`;
    }

    get closeBtnClass(): string {
        return `${this.jsName}__close`;
    }

    get referencePopupTemplate(): string {
        return JSON.parse(this.getAttribute('reference-popup'));
    }

    get addressPopupTemplate(): string {
        return JSON.parse(this.getAttribute('address-popup'));
    }
}
