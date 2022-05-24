import Component from 'ShopUi/models/component';

export default class FacetsAsn extends Component
{
    protected asnPrice: HTMLElement;
    private defaultClassName: string = 'icon-globus-leaf-default-md';
    private categoryClass: string = 'category-filter-style';
    private categoryClassDiv: string = 'category-filter-style-div';
    protected classData = {
        'Fachtmetzgerei': 'icon-butcher-md',
        'Fachmetzgerei': 'icon-butcher-md',
        'Süßes & Salziges': 'icon-sweet-and-savoury-md',
        'Wurst & Käse': 'icon-sausage-and-cheese-md',
        'Bäckerei': 'icon-baker-md',
        'Meisterbäckerei': 'icon-baker-md',
        'Fleich & Fisch': 'icon-meat-sausages-fish-md',
        'Tiefkühl': 'icon-ready-meals-md',
        'Angebote': 'icon-offer-md',
        'Obst & Gemüse': 'icon-fruit-and-vegetables-md',
        'Spiel- & Schreibwaren': 'icon-games-md',
        'Spiel & Schreibwaren': 'icon-games-md',
        'Körperpflege & Kosmetik': 'icon-cosmetics-md',
        'Frische Produkte': 'icon-fresh-product-md',
        'Vorratsschrank': 'icon-pantry-md',
        'Freizeit, Tier & Auto': 'icon-animals-md',
        'Baby & Schwangerschaft': 'icon-baby-md',
        'Elektronik': 'icon-electronics-md',
        'Textil & Schmuck': 'icon-clothes-md',
        'Getränke': 'icon-drinks-md',
        'Fertiggerichte & Tiefkühl': 'icon-ready-meals-md',
        'Fisch & Fleisch': 'icon-meat-md',
        'Fleisch & Fisch': 'icon-meat-md',
        'Haushalt': 'icon-household-md'
    };
    protected map: Map<string, string>;

    protected init() {
        super.init();
        this.map = new Map<string, string>(Object.entries(this.classData));

        if (document.readyState === 'interactive' || document.readyState === 'complete') {
            window.addEventListener('DOMNodeInserted', nodeInsertedEvent => {
                if (nodeInsertedEvent.relatedNode.localName === 'ff-asn-group-element') {
                    const span = nodeInsertedEvent.relatedNode.querySelector('span');
                    if (span !== undefined && span !== null) {
                        if (span.classList.contains('filterName')) {
                            const className = this.getClassName(span.innerText.trim());
                            if (!nodeInsertedEvent.relatedNode.classList.contains('clusterLevel1') &&
                                !nodeInsertedEvent.relatedNode.classList.contains('clusterLevel2') &&
                                !nodeInsertedEvent.relatedNode.classList.contains('clusterLevel3'))
                            {
                                this.addClasses(span, className, 'span');
                            }
                        }
                    } else {
                        if (nodeInsertedEvent.relatedNode.hasAttribute('selected') &&
                            !nodeInsertedEvent.relatedNode.classList.contains('clusterLevel1') &&
                            !nodeInsertedEvent.relatedNode.classList.contains('clusterLevel2') &&
                            !nodeInsertedEvent.relatedNode.classList.contains('clusterLevel3'))
                        {
                            const parentDiv = nodeInsertedEvent.relatedNode.querySelector('div[slot=selected]');
                            if (parentDiv !== undefined && parentDiv !== null) {
                                const className = this.getClassName(parentDiv.innerText.trim());
                                this.addClasses(parentDiv, className, 'div');
                            }
                        }
                    }
                }
            });
        }
    }

    protected readyCallback() {}

    private getClassName(text: string) {
        text = text.trim();
        let className = this.map.get(text);
        if (className === undefined || className === null || className.length < 1) {
            className = this.defaultClassName;
        }

        return className;
    }

    private addClasses(element: HTMLElement, className: string, flag: string) {
        element.classList.add(className);
        if (flag === 'div') {
            element.classList.add(this.categoryClassDiv);
        } else {
            element.classList.add(this.categoryClass);
        }
    }
}
