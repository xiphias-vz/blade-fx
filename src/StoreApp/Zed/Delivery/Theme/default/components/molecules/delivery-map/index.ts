import 'ol/ol.css';
import './delivery-map.scss';
import register from 'ShopUi/app/registry';
export default register('delivery-map', () => import(/* webpackMode: "lazy" */'./delivery-map'));
