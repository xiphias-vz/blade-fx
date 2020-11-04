import './lazy-image.scss';
import register from 'ShopUi/app/registry';
export default register('lazy-image', () => import(/* webpackMode: "lazy" */'./lazy-image'));
