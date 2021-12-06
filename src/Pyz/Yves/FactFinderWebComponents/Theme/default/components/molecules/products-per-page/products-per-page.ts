// import Component from 'ShopUi/models/component';
//
// export default class ProductsPerPage extends Component
// {
//     protected dropdownBox: HTMLElement;
//
//     protected readyCallback(): void {
//
//         this.dropdownBox = document.getElementById('dropdown');
//
//         this.mapEvents();
//     }
//
//     protected mapEvents(): void {
//         this.dropdownBox.addEventListener('click', () => this.toggleDropdownProductsPerPage());
//         this.dropdownBox.addEventListener('blur', () => this.toggleDropdownProductsPerPage());
//     }
//
//     protected toggleDropdownProductsPerPage(): void{
//         if (this.dropdownBox.hasAttribute('opened')){
//             this.dropdownBox.removeAttribute('opened');
//             this.dropdownBox.setAttribute('closed', 'closed');
//         }else if (this.dropdownBox.hasAttribute('closed')){
//             this.dropdownBox.removeAttribute('closed');
//             this.dropdownBox.setAttribute('opened', 'opened');
//         }
//     }
// }
