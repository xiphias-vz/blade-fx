import register from 'ShopUi/app/registry';
export default register('store-switcher', () => import(/* webpackMode: "lazy" */'./store-switcher'));
