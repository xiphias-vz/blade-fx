import './lazy-image-banner-grid.scss';
import register from 'ShopUi/app/registry';
export default register('lazy-image-banner-grid', () => import(
    /* webpackMode: "eager" */
    /* webpackChunkName: "lazy-image-banner-grid" */
    './lazy-image-banner-grid'));
