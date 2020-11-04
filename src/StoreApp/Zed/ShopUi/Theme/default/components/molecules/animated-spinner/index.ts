import './animated-spinner.scss';
import register from 'ShopUi/app/registry';
export default register('animated-spinner', () => import(/* webpackMode: "lazy" */'./animated-spinner'));
