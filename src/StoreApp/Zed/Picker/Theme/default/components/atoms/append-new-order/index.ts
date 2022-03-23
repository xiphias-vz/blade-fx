import register from 'ShopUi/app/registry';
export default register('append-new-order', () => import(/* webpackMode: "lazy" */'./append-new-order'));
