import './scroll-to-top.scss';
import register from 'ShopUi/app/registry';
export default register('scroll-to-top', () => import(/* webpackMode: "lazy" */'./scroll-to-top'));
