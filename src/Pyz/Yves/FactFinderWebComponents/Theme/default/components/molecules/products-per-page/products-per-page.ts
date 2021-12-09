import Component from 'ShopUi/models/component';

export default class ProductsPerPage extends Component {
    protected dropdownBox: any;

    protected readyCallback(): void {
        this.dropdownBox = document.getElementById("dropdown");

        this.load();
    }

    protected load(): void {
        window.addEventListener('load', () => {
            this.classList.remove('hide');
            this.dropdownBox.addEventListener("click", this.toggleAttributeProductsPerPage);
            this.dropdownBox.addEventListener("blur", this.toggleAttributeProductsPerPage);
        })
    }

    protected toggleAttributeProductsPerPage(){
        if(this.dropdownBox.hasAttribute("opened")){
            this.dropdownBox.removeAttribute("opened");
            this.dropdownBox.setAttribute("closed", "closed");
        }else if(this.dropdownBox.hasAttribute("closed")){
            this.dropdownBox.removeAttribute("closed");
            this.dropdownBox.setAttribute("opened", "opened");
        }
    };

}
