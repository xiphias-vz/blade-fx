import register from 'ShopUi/app/registry';
export default register('ajax-renderer', () => import(/* webpackMode: "lazy" */'./ajax-renderer-extended'));
