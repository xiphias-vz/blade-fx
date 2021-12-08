import register from 'ShopUi/app/registry';
export default register(
    'content-renderer',
    () => import(/* webpackMode: "lazy" */'./content-renderer')
);
