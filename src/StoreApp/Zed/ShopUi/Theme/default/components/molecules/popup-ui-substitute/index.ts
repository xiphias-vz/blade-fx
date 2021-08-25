import './popup-ui-substitute.scss';
import register from 'ShopUi/app/registry';
export default register('popup-ui-substitute', () => import(/* webpackMode: "lazy" */'./popup-ui-substitute'));
