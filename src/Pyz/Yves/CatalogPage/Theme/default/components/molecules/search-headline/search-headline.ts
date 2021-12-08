import Component from 'ShopUi/models/component';

export default class SearchHeadline extends Component {

    protected readyCallback(): void {
        this.load();
    }

    protected load() {
        window.addEventListener('load', () => {
            this.classList.remove('hide');
        })
    }
}
