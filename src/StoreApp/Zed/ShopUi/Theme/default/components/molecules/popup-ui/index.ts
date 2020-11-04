import './popup-ui.scss';
import register from 'ShopUi/app/registry';
export default register('popup-ui', () => import(/* webpackMode: "lazy" */'./popup-ui'));
