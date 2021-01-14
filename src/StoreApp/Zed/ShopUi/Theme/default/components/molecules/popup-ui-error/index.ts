import './popup-ui-error.scss';
import register from 'ShopUi/app/registry';
export default register('popup-ui-error', () => import(/* webpackMode: "lazy" */'./popup-ui-error'));
