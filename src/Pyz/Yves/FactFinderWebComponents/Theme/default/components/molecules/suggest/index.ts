import './suggest.scss';
import register from 'ShopUi/app/registry';
export default register('suggest-ff', () => import(/* webpackMode: "eager" */'./suggest'));
