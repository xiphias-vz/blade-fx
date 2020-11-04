import './matomo-popup-ui-corrector.scss';
import register from 'ShopUi/app/registry';
export default register('matomo-popup-ui-corrector', () => import(/* webpackMode: "lazy" */'./matomo-popup-ui-corrector'));
