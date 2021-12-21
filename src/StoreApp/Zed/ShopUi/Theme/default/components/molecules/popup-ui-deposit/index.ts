import './popup-ui-deposit.scss';
import register from 'ShopUi/app/registry';
export default register('popup-ui-deposit', () => import(/* webpackMode: "lazy" */'./popup-ui-deposit'));
