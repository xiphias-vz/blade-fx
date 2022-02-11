import './lazy-image-ff.scss';
import register from 'ShopUi/app/registry';
export default register('lazy-image-ff', () => import(/* webpackMode: "lazy" */'./lazy-image-ff'));
