// import $ from 'jquery/dist/jquery';
// import Component from 'ShopUi/models/component';
//
// export default class ProductsPerPage extends Component
// {
//     // let dropdown = document.getElementById("dropdown");
//     // let attribute = dropdown.attributes;
//     protected dropdown: HTMLElement;
//     protected attribute;
//
//     protected readyCallback(): void {
//
//         this.dropdown = document.getElementById('dropdown');
//
//         this.mapEvents();
//     }
//
//     protected mapEvents(): void {
//         this.dropdown.addEventListener('click', () => this.toggleDropdown());
//     }
//
//     protected toggleDropdown(): void{
//         if (this.dropdown.hasAttribute('opened')){
//             this.dropdown.removeAttribute('opened');
//             this.dropdown.setAttribute('closed', 'closed');
//         }else if (this.dropdown.hasAttribute('closed')){
//             this.dropdown.removeAttribute('closed');
//             this.dropdown.setAttribute('opened', 'opened');
//         }
//     }
// }
