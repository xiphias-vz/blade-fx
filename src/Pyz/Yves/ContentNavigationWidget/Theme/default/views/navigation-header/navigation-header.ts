import Component from 'ShopUi/models/component';

export default class NavigationHeader extends Component
{
    protected asnPrice: HTMLElement;
    private defaultClassName: string = 'icon-globus-leaf-default-md';
    private categoryClass: string = 'category-filter-style';
    private categoryClassDiv: string = 'category-filter-style-div';
    private navigationButton: HTMLButtonElement;
    private navigationContainer: HTMLElement;

    protected classData = {
        'Fachtmetzgerei': 'icon-butcher-md',
        'Süßes & Salziges': 'icon-sweet-and-savoury-md',
        'Wurst & Käse': 'icon-sausage-and-cheese-md',
        'Bäckerei': 'icon-baker-md',
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
        'Haushalt': 'icon-household-md'
    };
    protected map: Map<string, string>;

    protected init() {
        super.init();

        this.map = new Map<string, string>(Object.entries(this.classData));

        if (document.readyState === 'interactive' || document.readyState === 'complete') {
            window.addEventListener('DOMNodeInserted', nodeInsertedEvent => {
                if (nodeInsertedEvent.relatedNode.localName === 'ff-navigation-item') {
                    let anchor = nodeInsertedEvent.relatedNode.querySelector('.navigation-icon');
                    if (anchor !== undefined && anchor !== null) {
                        const className = this.getClassName(anchor.innerText.trim());
                        if (nodeInsertedEvent.relatedNode.hasAttribute('cluster-level')) {
                            if (nodeInsertedEvent.relatedNode.getAttribute('cluster-level') === '0') {
                                this.addClasses(anchor, className, 'span');
                            }
                        }
                    }
                }
            });
            this.navigationButton = <HTMLButtonElement>document.getElementsByClassName('button__all-products')[0];
            this.navigationContainer = document.getElementsByClassName('js-header__navigation-target')[0];
            this.addButtonEventListener();
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

    private addButtonEventListener(){
        if(this.navigationButton !== undefined && this.navigationContainer !== undefined){
            this.navigationButton.addEventListener('mouseover', () => {
                if(this.navigationContainer.classList.contains('is-hidden')){
                    this.navigationContainer.classList.remove('is-hidden');
                }
            })

            this.navigationContainer.addEventListener('mouseleave', () => {
                if(!this.navigationContainer.classList.contains('is-hidden')){
                    this.navigationContainer.classList.add('is-hidden');
                }
            })
        }
    }


}
