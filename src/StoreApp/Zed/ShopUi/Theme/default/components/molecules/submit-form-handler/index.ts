import register from 'ShopUi/app/registry';
export default register('submit-form-handler', () => import(/* webpackMode: "lazy" */'./submit-form-handler'));
