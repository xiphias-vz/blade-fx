import './popup-ui-container-shelf.scss';
import register from 'ShopUi/app/registry';
export default register('popup-ui-container-shelf', () => import(/* webpackMode: "lazy" */'./popup-ui-container-shelf'));
