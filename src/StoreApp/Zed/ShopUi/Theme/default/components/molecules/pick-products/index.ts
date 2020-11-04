import './pick-products.scss';
import register from 'ShopUi/app/registry';
export default register('pick-products', () => import(/* webpackMode: "lazy" */'./pick-products'));
