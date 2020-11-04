import './ajax-add-to-cart.scss';
import register from 'ShopUi/app/registry';
export default register(
    'ajax-add-to-cart',
    () => import(/* webpackMode: "lazy" */'./ajax-add-to-cart')
);
