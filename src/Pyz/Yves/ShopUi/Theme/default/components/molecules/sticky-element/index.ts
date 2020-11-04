import register from 'ShopUi/app/registry';
export default register('sticky-element', () => import(/* webpackMode: "lazy" */'./sticky-element'));
