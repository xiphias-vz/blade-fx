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
import elementClosestPolyfill from 'element-closest';
elementClosestPolyfill(window);

// then load a shim for es5 transpilers (typescript or babel)
// https://github.com/webcomponents/webcomponentsjs#custom-elements-es5-adapterjs
/* tslint:disable: no-var-requires no-require-imports */
require('@webcomponents/webcomponentsjs/custom-elements-es5-adapter.js');

// add webcomponents polyfill
require('@webcomponents/webcomponentsjs/webcomponents-bundle');
/* tslint:enable */
