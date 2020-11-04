import register from 'ShopUi/app/registry';

export default register(
    'cms-page-collapse-block',
    () => import(/* webpackMode: "lazy" */'./cms-page-collapse-block')
);
