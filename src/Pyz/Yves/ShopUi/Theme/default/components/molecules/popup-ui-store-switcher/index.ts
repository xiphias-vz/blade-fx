import './popup-ui-store-switcher.scss';
import register from 'ShopUi/app/registry';
export default register('popup-ui-store-switcher', () => import(/* webpackMode: "lazy" */'./popup-ui-store-switcher'));
