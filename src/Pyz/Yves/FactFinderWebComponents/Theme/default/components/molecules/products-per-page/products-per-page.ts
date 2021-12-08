import Component from 'ShopUi/models/component';

export default class ProductsPerPage extends Component {

    protected readyCallback(): void {

        this.load();
    }

    protected load(): void {
        window.addEventListener('load', () => {
            this.classList.remove('hide');
        })
    }
}
