import './content-tabs.scss';
import register from 'ShopUi/app/registry';
export default register('content-tabs', () => import(/* webpackMode: "lazy" */'./content-tabs'));
