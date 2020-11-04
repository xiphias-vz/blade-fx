import './navigation-top-mobile.scss';
import register from 'ShopUi/app/registry';

export default register(
    'navigation-top-mobile',
    () => import(/* webpackMode: "lazy" */'./navigation-top-mobile')
);
