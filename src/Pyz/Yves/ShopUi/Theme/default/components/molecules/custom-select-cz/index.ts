import 'select2/src/scss/core.scss';
import './custom-select-cz.scss';
import register from 'ShopUi/app/registry';
export default register('custom-select-cz', () => import(/* webpackMode: "eager" */'./custom-select-cz'));
