import './offline-mode.scss';
import register from 'ShopUi/app/registry';
export default register('offline-mode', () => import(/* webpackMode: "lazy" */'./offline-mode'));
