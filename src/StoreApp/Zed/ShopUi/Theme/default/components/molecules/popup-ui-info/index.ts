import './popup-ui-info.scss';
import register from 'ShopUi/app/registry';
export default register('popup-ui-info', () => import(/* webpackMode: "lazy" */'./popup-ui-info'));
