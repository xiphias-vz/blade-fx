import './products-per-page.scss';
import register from 'ShopUi/app/registry';
export default register(
    'products-per-page',
    () => import(/* webpackMode: "lazy" */'./products-per-page')
);
