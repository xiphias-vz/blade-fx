import './search-headline.scss'
import register from 'ShopUi/app/registry';
export default register('search-headline', () => import(/* webpackMode: "lazy" */'./search-headline'));
