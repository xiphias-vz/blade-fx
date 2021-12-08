import Component from 'ShopUi/models/component';


export default class ContentRenderer extends Component {

    protected readyCallback(): void {
        this.load();
    }

    protected load() {
        window.addEventListener('load', () => {
            this.parentElement.classList.remove('hide');
        })
    }
}
