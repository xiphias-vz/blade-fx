import './image-animation.scss';
import register from 'ShopUi/app/registry';
export default register(
    'image-animation',
    () => import(/* webpackMode: "lazy" */'./image-animation')
);
