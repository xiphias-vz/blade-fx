import './searchbox.scss';
import register from 'ShopUi/app/registry';
export default register('search-box', () => import(/* webpackMode: "eager" */'./searchbox'));
