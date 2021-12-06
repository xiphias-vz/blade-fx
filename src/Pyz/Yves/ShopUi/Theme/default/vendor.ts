/* tslint:disable: no-any */
declare const require: any;
/* tslint:enable */

// add polyfills
import 'core-js/features/promise';
import 'core-js/features/array';
import 'core-js/features/set';
import 'core-js/features/map';
import 'classlist-polyfill';
import 'core-js/features/string/starts-with';
import lozad from 'lozad';
import 'whatwg-fetch';
import elementClosestPolyfill from 'element-closest';
elementClosestPolyfill(window);

// then load a shim for es5 transpilers (typescript or babel)
// https://github.com/webcomponents/webcomponentsjs#custom-elements-es5-adapterjs
/* tslint:disable: no-var-requires no-require-imports */
require('@webcomponents/webcomponentsjs/custom-elements-es5-adapter.js');

// add webcomponents polyfill
require('@webcomponents/webcomponents-platform/webcomponents-platform');
require('@webcomponents/custom-elements/custom-elements.min');
/* tslint:enable */

const observer = lozad('.js-lazy-image__content');
observer.observe();

// check if the browser natively supports webcomponents (and es6)
const hasNativeCustomElements = !!window.customElements;

// then load a shim for es5 transpilers (typescript or babel)
// https://github.com/webcomponents/webcomponentsjs#custom-elements-es5-adapterjs
if (hasNativeCustomElements) {
    import(/* webpackMode: "eager" */'@webcomponents/webcomponentsjs/custom-elements-es5-adapter');
}

// add webcomponents polyfill
import '@webcomponents/webcomponentsjs/custom-elements-es5-adapter';
import '@webcomponents/webcomponentsjs/webcomponents-loader';
import '@webcomponents/webcomponentsjs/webcomponents-bundle';
import 'ff-web-components/dist/bundle';
