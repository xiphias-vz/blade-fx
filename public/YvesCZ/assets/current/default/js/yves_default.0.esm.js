(window["webpackJsonp_yves_default"] = window["webpackJsonp_yves_default"] || []).push([[0],{

/***/ "./node_modules/jquery-datetimepicker/build/jquery.datetimepicker.full.js":
/*!********************************************************************************!*\
  !*** ./node_modules/jquery-datetimepicker/build/jquery.datetimepicker.full.js ***!
  \********************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var __WEBPACK_AMD_DEFINE_FACTORY__, __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;var __WEBPACK_AMD_DEFINE_FACTORY__, __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;/*!
 * @copyright Copyright &copy; Kartik Visweswaran, Krajee.com, 2014 - 2016
 * @version 1.3.4
 *
 * Date formatter utility library that allows formatting date/time variables or Date objects using PHP DateTime format.
 * @see http://php.net/manual/en/function.date.php
 *
 * For more JQuery plugins visit http://plugins.krajee.com
 * For more Yii related demos visit http://demos.krajee.com
 */var DateFormatter;!function(){"use strict";var t,e,r,n,a,u,i;u=864e5,i=3600,t=function(t,e){return"string"==typeof t&&"string"==typeof e&&t.toLowerCase()===e.toLowerCase()},e=function(t,r,n){var a=n||"0",u=t.toString();return u.length<r?e(a+u,r):u},r=function(t){var e,n;for(t=t||{},e=1;e<arguments.length;e++)if(n=arguments[e])for(var a in n)n.hasOwnProperty(a)&&("object"==typeof n[a]?r(t[a],n[a]):t[a]=n[a]);return t},n=function(t,e){for(var r=0;r<e.length;r++)if(e[r].toLowerCase()===t.toLowerCase())return r;return-1},a={dateSettings:{days:["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"],daysShort:["Sun","Mon","Tue","Wed","Thu","Fri","Sat"],months:["January","February","March","April","May","June","July","August","September","October","November","December"],monthsShort:["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"],meridiem:["AM","PM"],ordinal:function(t){var e=t%10,r={1:"st",2:"nd",3:"rd"};return 1!==Math.floor(t%100/10)&&r[e]?r[e]:"th"}},separators:/[ \-+\/\.T:@]/g,validParts:/[dDjlNSwzWFmMntLoYyaABgGhHisueTIOPZcrU]/g,intParts:/[djwNzmnyYhHgGis]/g,tzParts:/\b(?:[PMCEA][SDP]T|(?:Pacific|Mountain|Central|Eastern|Atlantic) (?:Standard|Daylight|Prevailing) Time|(?:GMT|UTC)(?:[-+]\d{4})?)\b/g,tzClip:/[^-+\dA-Z]/g},DateFormatter=function(t){var e=this,n=r(a,t);e.dateSettings=n.dateSettings,e.separators=n.separators,e.validParts=n.validParts,e.intParts=n.intParts,e.tzParts=n.tzParts,e.tzClip=n.tzClip},DateFormatter.prototype={constructor:DateFormatter,getMonth:function(t){var e,r=this;return e=n(t,r.dateSettings.monthsShort)+1,0===e&&(e=n(t,r.dateSettings.months)+1),e},parseDate:function(e,r){var n,a,u,i,s,o,c,f,l,h,d=this,g=!1,m=!1,p=d.dateSettings,y={date:null,year:null,month:null,day:null,hour:0,min:0,sec:0};if(!e)return null;if(e instanceof Date)return e;if("U"===r)return u=parseInt(e),u?new Date(1e3*u):e;switch(typeof e){case"number":return new Date(e);case"string":break;default:return null}if(n=r.match(d.validParts),!n||0===n.length)throw new Error("Invalid date format definition.");for(a=e.replace(d.separators,"\x00").split("\x00"),u=0;u<a.length;u++)switch(i=a[u],s=parseInt(i),n[u]){case"y":case"Y":if(!s)return null;l=i.length,y.year=2===l?parseInt((70>s?"20":"19")+i):s,g=!0;break;case"m":case"n":case"M":case"F":if(isNaN(s)){if(o=d.getMonth(i),!(o>0))return null;y.month=o}else{if(!(s>=1&&12>=s))return null;y.month=s}g=!0;break;case"d":case"j":if(!(s>=1&&31>=s))return null;y.day=s,g=!0;break;case"g":case"h":if(c=n.indexOf("a")>-1?n.indexOf("a"):n.indexOf("A")>-1?n.indexOf("A"):-1,h=a[c],c>-1)f=t(h,p.meridiem[0])?0:t(h,p.meridiem[1])?12:-1,s>=1&&12>=s&&f>-1?y.hour=s+f-1:s>=0&&23>=s&&(y.hour=s);else{if(!(s>=0&&23>=s))return null;y.hour=s}m=!0;break;case"G":case"H":if(!(s>=0&&23>=s))return null;y.hour=s,m=!0;break;case"i":if(!(s>=0&&59>=s))return null;y.min=s,m=!0;break;case"s":if(!(s>=0&&59>=s))return null;y.sec=s,m=!0}if(g===!0&&y.year&&y.month&&y.day)y.date=new Date(y.year,y.month-1,y.day,y.hour,y.min,y.sec,0);else{if(m!==!0)return null;y.date=new Date(0,0,0,y.hour,y.min,y.sec,0)}return y.date},guessDate:function(t,e){if("string"!=typeof t)return t;var r,n,a,u,i,s,o=this,c=t.replace(o.separators,"\x00").split("\x00"),f=/^[djmn]/g,l=e.match(o.validParts),h=new Date,d=0;if(!f.test(l[0]))return t;for(a=0;a<c.length;a++){if(d=2,i=c[a],s=parseInt(i.substr(0,2)),isNaN(s))return null;switch(a){case 0:"m"===l[0]||"n"===l[0]?h.setMonth(s-1):h.setDate(s);break;case 1:"m"===l[0]||"n"===l[0]?h.setDate(s):h.setMonth(s-1);break;case 2:if(n=h.getFullYear(),r=i.length,d=4>r?r:4,n=parseInt(4>r?n.toString().substr(0,4-r)+i:i.substr(0,4)),!n)return null;h.setFullYear(n);break;case 3:h.setHours(s);break;case 4:h.setMinutes(s);break;case 5:h.setSeconds(s)}u=i.substr(d),u.length>0&&c.splice(a+1,0,u)}return h},parseFormat:function(t,r){var n,a=this,s=a.dateSettings,o=/\\?(.?)/gi,c=function(t,e){return n[t]?n[t]():e};return n={d:function(){return e(n.j(),2)},D:function(){return s.daysShort[n.w()]},j:function(){return r.getDate()},l:function(){return s.days[n.w()]},N:function(){return n.w()||7},w:function(){return r.getDay()},z:function(){var t=new Date(n.Y(),n.n()-1,n.j()),e=new Date(n.Y(),0,1);return Math.round((t-e)/u)},W:function(){var t=new Date(n.Y(),n.n()-1,n.j()-n.N()+3),r=new Date(t.getFullYear(),0,4);return e(1+Math.round((t-r)/u/7),2)},F:function(){return s.months[r.getMonth()]},m:function(){return e(n.n(),2)},M:function(){return s.monthsShort[r.getMonth()]},n:function(){return r.getMonth()+1},t:function(){return new Date(n.Y(),n.n(),0).getDate()},L:function(){var t=n.Y();return t%4===0&&t%100!==0||t%400===0?1:0},o:function(){var t=n.n(),e=n.W(),r=n.Y();return r+(12===t&&9>e?1:1===t&&e>9?-1:0)},Y:function(){return r.getFullYear()},y:function(){return n.Y().toString().slice(-2)},a:function(){return n.A().toLowerCase()},A:function(){var t=n.G()<12?0:1;return s.meridiem[t]},B:function(){var t=r.getUTCHours()*i,n=60*r.getUTCMinutes(),a=r.getUTCSeconds();return e(Math.floor((t+n+a+i)/86.4)%1e3,3)},g:function(){return n.G()%12||12},G:function(){return r.getHours()},h:function(){return e(n.g(),2)},H:function(){return e(n.G(),2)},i:function(){return e(r.getMinutes(),2)},s:function(){return e(r.getSeconds(),2)},u:function(){return e(1e3*r.getMilliseconds(),6)},e:function(){var t=/\((.*)\)/.exec(String(r))[1];return t||"Coordinated Universal Time"},I:function(){var t=new Date(n.Y(),0),e=Date.UTC(n.Y(),0),r=new Date(n.Y(),6),a=Date.UTC(n.Y(),6);return t-e!==r-a?1:0},O:function(){var t=r.getTimezoneOffset(),n=Math.abs(t);return(t>0?"-":"+")+e(100*Math.floor(n/60)+n%60,4)},P:function(){var t=n.O();return t.substr(0,3)+":"+t.substr(3,2)},T:function(){var t=(String(r).match(a.tzParts)||[""]).pop().replace(a.tzClip,"");return t||"UTC"},Z:function(){return 60*-r.getTimezoneOffset()},c:function(){return"Y-m-d\\TH:i:sP".replace(o,c)},r:function(){return"D, d M Y H:i:s O".replace(o,c)},U:function(){return r.getTime()/1e3||0}},c(t,t)},formatDate:function(t,e){var r,n,a,u,i,s=this,o="",c="\\";if("string"==typeof t&&(t=s.parseDate(t,e),!t))return null;if(t instanceof Date){for(a=e.length,r=0;a>r;r++)i=e.charAt(r),"S"!==i&&i!==c&&(r>0&&e.charAt(r-1)===c?o+=i:(u=s.parseFormat(i,t),r!==a-1&&s.intParts.test(i)&&"S"===e.charAt(r+1)&&(n=parseInt(u)||0,u+=s.dateSettings.ordinal(n)),o+=u));return o}return""}}}();/**
 * @preserve jQuery DateTimePicker
 * @homepage http://xdsoft.net/jqplugins/datetimepicker/
 * @author Chupurnov Valeriy (<chupurnov@gmail.com>)
 */

/**
 * @param {jQuery} $
 */
var datetimepickerFactory = function ($) {
	'use strict';

	var default_options  = {
		i18n: {
			ar: { // Arabic
				months: [
					"كانون الثاني", "شباط", "آذار", "نيسان", "مايو", "حزيران", "تموز", "آب", "أيلول", "تشرين الأول", "تشرين الثاني", "كانون الأول"
				],
				dayOfWeekShort: [
					"ن", "ث", "ع", "خ", "ج", "س", "ح"
				],
				dayOfWeek: ["الأحد", "الاثنين", "الثلاثاء", "الأربعاء", "الخميس", "الجمعة", "السبت", "الأحد"]
			},
			ro: { // Romanian
				months: [
					"Ianuarie", "Februarie", "Martie", "Aprilie", "Mai", "Iunie", "Iulie", "August", "Septembrie", "Octombrie", "Noiembrie", "Decembrie"
				],
				dayOfWeekShort: [
					"Du", "Lu", "Ma", "Mi", "Jo", "Vi", "Sâ"
				],
				dayOfWeek: ["Duminică", "Luni", "Marţi", "Miercuri", "Joi", "Vineri", "Sâmbătă"]
			},
			id: { // Indonesian
				months: [
					"Januari", "Februari", "Maret", "April", "Mei", "Juni", "Juli", "Agustus", "September", "Oktober", "November", "Desember"
				],
				dayOfWeekShort: [
					"Min", "Sen", "Sel", "Rab", "Kam", "Jum", "Sab"
				],
				dayOfWeek: ["Minggu", "Senin", "Selasa", "Rabu", "Kamis", "Jumat", "Sabtu"]
			},
			is: { // Icelandic
				months: [
					"Janúar", "Febrúar", "Mars", "Apríl", "Maí", "Júní", "Júlí", "Ágúst", "September", "Október", "Nóvember", "Desember"
				],
				dayOfWeekShort: [
					"Sun", "Mán", "Þrið", "Mið", "Fim", "Fös", "Lau"
				],
				dayOfWeek: ["Sunnudagur", "Mánudagur", "Þriðjudagur", "Miðvikudagur", "Fimmtudagur", "Föstudagur", "Laugardagur"]
			},
			bg: { // Bulgarian
				months: [
					"Януари", "Февруари", "Март", "Април", "Май", "Юни", "Юли", "Август", "Септември", "Октомври", "Ноември", "Декември"
				],
				dayOfWeekShort: [
					"Нд", "Пн", "Вт", "Ср", "Чт", "Пт", "Сб"
				],
				dayOfWeek: ["Неделя", "Понеделник", "Вторник", "Сряда", "Четвъртък", "Петък", "Събота"]
			},
			fa: { // Persian/Farsi
				months: [
					'فروردین', 'اردیبهشت', 'خرداد', 'تیر', 'مرداد', 'شهریور', 'مهر', 'آبان', 'آذر', 'دی', 'بهمن', 'اسفند'
				],
				dayOfWeekShort: [
					'یکشنبه', 'دوشنبه', 'سه شنبه', 'چهارشنبه', 'پنجشنبه', 'جمعه', 'شنبه'
				],
				dayOfWeek: ["یک‌شنبه", "دوشنبه", "سه‌شنبه", "چهارشنبه", "پنج‌شنبه", "جمعه", "شنبه", "یک‌شنبه"]
			},
			ru: { // Russian
				months: [
					'Январь', 'Февраль', 'Март', 'Апрель', 'Май', 'Июнь', 'Июль', 'Август', 'Сентябрь', 'Октябрь', 'Ноябрь', 'Декабрь'
				],
				dayOfWeekShort: [
					"Вс", "Пн", "Вт", "Ср", "Чт", "Пт", "Сб"
				],
				dayOfWeek: ["Воскресенье", "Понедельник", "Вторник", "Среда", "Четверг", "Пятница", "Суббота"]
			},
			uk: { // Ukrainian
				months: [
					'Січень', 'Лютий', 'Березень', 'Квітень', 'Травень', 'Червень', 'Липень', 'Серпень', 'Вересень', 'Жовтень', 'Листопад', 'Грудень'
				],
				dayOfWeekShort: [
					"Ндл", "Пнд", "Втр", "Срд", "Чтв", "Птн", "Сбт"
				],
				dayOfWeek: ["Неділя", "Понеділок", "Вівторок", "Середа", "Четвер", "П'ятниця", "Субота"]
			},
			en: { // English
				months: [
					"January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"
				],
				dayOfWeekShort: [
					"Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"
				],
				dayOfWeek: ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"]
			},
			el: { // Ελληνικά
				months: [
					"Ιανουάριος", "Φεβρουάριος", "Μάρτιος", "Απρίλιος", "Μάιος", "Ιούνιος", "Ιούλιος", "Αύγουστος", "Σεπτέμβριος", "Οκτώβριος", "Νοέμβριος", "Δεκέμβριος"
				],
				dayOfWeekShort: [
					"Κυρ", "Δευ", "Τρι", "Τετ", "Πεμ", "Παρ", "Σαβ"
				],
				dayOfWeek: ["Κυριακή", "Δευτέρα", "Τρίτη", "Τετάρτη", "Πέμπτη", "Παρασκευή", "Σάββατο"]
			},
			de: { // German
				months: [
					'Januar', 'Februar', 'März', 'April', 'Mai', 'Juni', 'Juli', 'August', 'September', 'Oktober', 'November', 'Dezember'
				],
				dayOfWeekShort: [
					"So", "Mo", "Di", "Mi", "Do", "Fr", "Sa"
				],
				dayOfWeek: ["Sonntag", "Montag", "Dienstag", "Mittwoch", "Donnerstag", "Freitag", "Samstag"]
			},
			nl: { // Dutch
				months: [
					"januari", "februari", "maart", "april", "mei", "juni", "juli", "augustus", "september", "oktober", "november", "december"
				],
				dayOfWeekShort: [
					"zo", "ma", "di", "wo", "do", "vr", "za"
				],
				dayOfWeek: ["zondag", "maandag", "dinsdag", "woensdag", "donderdag", "vrijdag", "zaterdag"]
			},
			tr: { // Turkish
				months: [
					"Ocak", "Şubat", "Mart", "Nisan", "Mayıs", "Haziran", "Temmuz", "Ağustos", "Eylül", "Ekim", "Kasım", "Aralık"
				],
				dayOfWeekShort: [
					"Paz", "Pts", "Sal", "Çar", "Per", "Cum", "Cts"
				],
				dayOfWeek: ["Pazar", "Pazartesi", "Salı", "Çarşamba", "Perşembe", "Cuma", "Cumartesi"]
			},
			fr: { //French
				months: [
					"Janvier", "Février", "Mars", "Avril", "Mai", "Juin", "Juillet", "Août", "Septembre", "Octobre", "Novembre", "Décembre"
				],
				dayOfWeekShort: [
					"Dim", "Lun", "Mar", "Mer", "Jeu", "Ven", "Sam"
				],
				dayOfWeek: ["dimanche", "lundi", "mardi", "mercredi", "jeudi", "vendredi", "samedi"]
			},
			es: { // Spanish
				months: [
					"Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio", "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"
				],
				dayOfWeekShort: [
					"Dom", "Lun", "Mar", "Mié", "Jue", "Vie", "Sáb"
				],
				dayOfWeek: ["Domingo", "Lunes", "Martes", "Miércoles", "Jueves", "Viernes", "Sábado"]
			},
			th: { // Thai
				months: [
					'มกราคม', 'กุมภาพันธ์', 'มีนาคม', 'เมษายน', 'พฤษภาคม', 'มิถุนายน', 'กรกฎาคม', 'สิงหาคม', 'กันยายน', 'ตุลาคม', 'พฤศจิกายน', 'ธันวาคม'
				],
				dayOfWeekShort: [
					'อา.', 'จ.', 'อ.', 'พ.', 'พฤ.', 'ศ.', 'ส.'
				],
				dayOfWeek: ["อาทิตย์", "จันทร์", "อังคาร", "พุธ", "พฤหัส", "ศุกร์", "เสาร์", "อาทิตย์"]
			},
			pl: { // Polish
				months: [
					"styczeń", "luty", "marzec", "kwiecień", "maj", "czerwiec", "lipiec", "sierpień", "wrzesień", "październik", "listopad", "grudzień"
				],
				dayOfWeekShort: [
					"nd", "pn", "wt", "śr", "cz", "pt", "sb"
				],
				dayOfWeek: ["niedziela", "poniedziałek", "wtorek", "środa", "czwartek", "piątek", "sobota"]
			},
			pt: { // Portuguese
				months: [
					"Janeiro", "Fevereiro", "Março", "Abril", "Maio", "Junho", "Julho", "Agosto", "Setembro", "Outubro", "Novembro", "Dezembro"
				],
				dayOfWeekShort: [
					"Dom", "Seg", "Ter", "Qua", "Qui", "Sex", "Sab"
				],
				dayOfWeek: ["Domingo", "Segunda", "Terça", "Quarta", "Quinta", "Sexta", "Sábado"]
			},
			ch: { // Simplified Chinese
				months: [
					"一月", "二月", "三月", "四月", "五月", "六月", "七月", "八月", "九月", "十月", "十一月", "十二月"
				],
				dayOfWeekShort: [
					"日", "一", "二", "三", "四", "五", "六"
				]
			},
			se: { // Swedish
				months: [
					"Januari", "Februari", "Mars", "April", "Maj", "Juni", "Juli", "Augusti", "September",  "Oktober", "November", "December"
				],
				dayOfWeekShort: [
					"Sön", "Mån", "Tis", "Ons", "Tor", "Fre", "Lör"
				]
			},
			km: { // Khmer (ភាសាខ្មែរ)
				months: [
					"មករា​", "កុម្ភៈ", "មិនា​", "មេសា​", "ឧសភា​", "មិថុនា​", "កក្កដា​", "សីហា​", "កញ្ញា​", "តុលា​", "វិច្ឆិកា", "ធ្នូ​"
				],
				dayOfWeekShort: ["អាទិ​", "ច័ន្ទ​", "អង្គារ​", "ពុធ​", "ព្រហ​​", "សុក្រ​", "សៅរ៍"],
				dayOfWeek: ["អាទិត្យ​", "ច័ន្ទ​", "អង្គារ​", "ពុធ​", "ព្រហស្បតិ៍​", "សុក្រ​", "សៅរ៍"]
			},
			kr: { // Korean
				months: [
					"1월", "2월", "3월", "4월", "5월", "6월", "7월", "8월", "9월", "10월", "11월", "12월"
				],
				dayOfWeekShort: [
					"일", "월", "화", "수", "목", "금", "토"
				],
				dayOfWeek: ["일요일", "월요일", "화요일", "수요일", "목요일", "금요일", "토요일"]
			},
			it: { // Italian
				months: [
					"Gennaio", "Febbraio", "Marzo", "Aprile", "Maggio", "Giugno", "Luglio", "Agosto", "Settembre", "Ottobre", "Novembre", "Dicembre"
				],
				dayOfWeekShort: [
					"Dom", "Lun", "Mar", "Mer", "Gio", "Ven", "Sab"
				],
				dayOfWeek: ["Domenica", "Lunedì", "Martedì", "Mercoledì", "Giovedì", "Venerdì", "Sabato"]
			},
			da: { // Dansk
				months: [
					"Januar", "Februar", "Marts", "April", "Maj", "Juni", "Juli", "August", "September", "Oktober", "November", "December"
				],
				dayOfWeekShort: [
					"Søn", "Man", "Tir", "Ons", "Tor", "Fre", "Lør"
				],
				dayOfWeek: ["søndag", "mandag", "tirsdag", "onsdag", "torsdag", "fredag", "lørdag"]
			},
			no: { // Norwegian
				months: [
					"Januar", "Februar", "Mars", "April", "Mai", "Juni", "Juli", "August", "September", "Oktober", "November", "Desember"
				],
				dayOfWeekShort: [
					"Søn", "Man", "Tir", "Ons", "Tor", "Fre", "Lør"
				],
				dayOfWeek: ['Søndag', 'Mandag', 'Tirsdag', 'Onsdag', 'Torsdag', 'Fredag', 'Lørdag']
			},
			ja: { // Japanese
				months: [
					"1月", "2月", "3月", "4月", "5月", "6月", "7月", "8月", "9月", "10月", "11月", "12月"
				],
				dayOfWeekShort: [
					"日", "月", "火", "水", "木", "金", "土"
				],
				dayOfWeek: ["日曜", "月曜", "火曜", "水曜", "木曜", "金曜", "土曜"]
			},
			vi: { // Vietnamese
				months: [
					"Tháng 1", "Tháng 2", "Tháng 3", "Tháng 4", "Tháng 5", "Tháng 6", "Tháng 7", "Tháng 8", "Tháng 9", "Tháng 10", "Tháng 11", "Tháng 12"
				],
				dayOfWeekShort: [
					"CN", "T2", "T3", "T4", "T5", "T6", "T7"
				],
				dayOfWeek: ["Chủ nhật", "Thứ hai", "Thứ ba", "Thứ tư", "Thứ năm", "Thứ sáu", "Thứ bảy"]
			},
			sl: { // Slovenščina
				months: [
					"Januar", "Februar", "Marec", "April", "Maj", "Junij", "Julij", "Avgust", "September", "Oktober", "November", "December"
				],
				dayOfWeekShort: [
					"Ned", "Pon", "Tor", "Sre", "Čet", "Pet", "Sob"
				],
				dayOfWeek: ["Nedelja", "Ponedeljek", "Torek", "Sreda", "Četrtek", "Petek", "Sobota"]
			},
			cs: { // Čeština
				months: [
					"Leden", "Únor", "Březen", "Duben", "Květen", "Červen", "Červenec", "Srpen", "Září", "Říjen", "Listopad", "Prosinec"
				],
				dayOfWeekShort: [
					"Ne", "Po", "Út", "St", "Čt", "Pá", "So"
				]
			},
			hu: { // Hungarian
				months: [
					"Január", "Február", "Március", "Április", "Május", "Június", "Július", "Augusztus", "Szeptember", "Október", "November", "December"
				],
				dayOfWeekShort: [
					"Va", "Hé", "Ke", "Sze", "Cs", "Pé", "Szo"
				],
				dayOfWeek: ["vasárnap", "hétfő", "kedd", "szerda", "csütörtök", "péntek", "szombat"]
			},
			az: { //Azerbaijanian (Azeri)
				months: [
					"Yanvar", "Fevral", "Mart", "Aprel", "May", "Iyun", "Iyul", "Avqust", "Sentyabr", "Oktyabr", "Noyabr", "Dekabr"
				],
				dayOfWeekShort: [
					"B", "Be", "Ça", "Ç", "Ca", "C", "Ş"
				],
				dayOfWeek: ["Bazar", "Bazar ertəsi", "Çərşənbə axşamı", "Çərşənbə", "Cümə axşamı", "Cümə", "Şənbə"]
			},
			bs: { //Bosanski
				months: [
					"Januar", "Februar", "Mart", "April", "Maj", "Jun", "Jul", "Avgust", "Septembar", "Oktobar", "Novembar", "Decembar"
				],
				dayOfWeekShort: [
					"Ned", "Pon", "Uto", "Sri", "Čet", "Pet", "Sub"
				],
				dayOfWeek: ["Nedjelja","Ponedjeljak", "Utorak", "Srijeda", "Četvrtak", "Petak", "Subota"]
			},
			ca: { //Català
				months: [
					"Gener", "Febrer", "Març", "Abril", "Maig", "Juny", "Juliol", "Agost", "Setembre", "Octubre", "Novembre", "Desembre"
				],
				dayOfWeekShort: [
					"Dg", "Dl", "Dt", "Dc", "Dj", "Dv", "Ds"
				],
				dayOfWeek: ["Diumenge", "Dilluns", "Dimarts", "Dimecres", "Dijous", "Divendres", "Dissabte"]
			},
			'en-GB': { //English (British)
				months: [
					"January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"
				],
				dayOfWeekShort: [
					"Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"
				],
				dayOfWeek: ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"]
			},
			et: { //"Eesti"
				months: [
					"Jaanuar", "Veebruar", "Märts", "Aprill", "Mai", "Juuni", "Juuli", "August", "September", "Oktoober", "November", "Detsember"
				],
				dayOfWeekShort: [
					"P", "E", "T", "K", "N", "R", "L"
				],
				dayOfWeek: ["Pühapäev", "Esmaspäev", "Teisipäev", "Kolmapäev", "Neljapäev", "Reede", "Laupäev"]
			},
			eu: { //Euskara
				months: [
					"Urtarrila", "Otsaila", "Martxoa", "Apirila", "Maiatza", "Ekaina", "Uztaila", "Abuztua", "Iraila", "Urria", "Azaroa", "Abendua"
				],
				dayOfWeekShort: [
					"Ig.", "Al.", "Ar.", "Az.", "Og.", "Or.", "La."
				],
				dayOfWeek: ['Igandea', 'Astelehena', 'Asteartea', 'Asteazkena', 'Osteguna', 'Ostirala', 'Larunbata']
			},
			fi: { //Finnish (Suomi)
				months: [
					"Tammikuu", "Helmikuu", "Maaliskuu", "Huhtikuu", "Toukokuu", "Kesäkuu", "Heinäkuu", "Elokuu", "Syyskuu", "Lokakuu", "Marraskuu", "Joulukuu"
				],
				dayOfWeekShort: [
					"Su", "Ma", "Ti", "Ke", "To", "Pe", "La"
				],
				dayOfWeek: ["sunnuntai", "maanantai", "tiistai", "keskiviikko", "torstai", "perjantai", "lauantai"]
			},
			gl: { //Galego
				months: [
					"Xan", "Feb", "Maz", "Abr", "Mai", "Xun", "Xul", "Ago", "Set", "Out", "Nov", "Dec"
				],
				dayOfWeekShort: [
					"Dom", "Lun", "Mar", "Mer", "Xov", "Ven", "Sab"
				],
				dayOfWeek: ["Domingo", "Luns", "Martes", "Mércores", "Xoves", "Venres", "Sábado"]
			},
			hr: { //Hrvatski
				months: [
					"Siječanj", "Veljača", "Ožujak", "Travanj", "Svibanj", "Lipanj", "Srpanj", "Kolovoz", "Rujan", "Listopad", "Studeni", "Prosinac"
				],
				dayOfWeekShort: [
					"Ned", "Pon", "Uto", "Sri", "Čet", "Pet", "Sub"
				],
				dayOfWeek: ["Nedjelja", "Ponedjeljak", "Utorak", "Srijeda", "Četvrtak", "Petak", "Subota"]
			},
			ko: { //Korean (한국어)
				months: [
					"1월", "2월", "3월", "4월", "5월", "6월", "7월", "8월", "9월", "10월", "11월", "12월"
				],
				dayOfWeekShort: [
					"일", "월", "화", "수", "목", "금", "토"
				],
				dayOfWeek: ["일요일", "월요일", "화요일", "수요일", "목요일", "금요일", "토요일"]
			},
			lt: { //Lithuanian (lietuvių)
				months: [
					"Sausio", "Vasario", "Kovo", "Balandžio", "Gegužės", "Birželio", "Liepos", "Rugpjūčio", "Rugsėjo", "Spalio", "Lapkričio", "Gruodžio"
				],
				dayOfWeekShort: [
					"Sek", "Pir", "Ant", "Tre", "Ket", "Pen", "Šeš"
				],
				dayOfWeek: ["Sekmadienis", "Pirmadienis", "Antradienis", "Trečiadienis", "Ketvirtadienis", "Penktadienis", "Šeštadienis"]
			},
			lv: { //Latvian (Latviešu)
				months: [
					"Janvāris", "Februāris", "Marts", "Aprīlis ", "Maijs", "Jūnijs", "Jūlijs", "Augusts", "Septembris", "Oktobris", "Novembris", "Decembris"
				],
				dayOfWeekShort: [
					"Sv", "Pr", "Ot", "Tr", "Ct", "Pk", "St"
				],
				dayOfWeek: ["Svētdiena", "Pirmdiena", "Otrdiena", "Trešdiena", "Ceturtdiena", "Piektdiena", "Sestdiena"]
			},
			mk: { //Macedonian (Македонски)
				months: [
					"јануари", "февруари", "март", "април", "мај", "јуни", "јули", "август", "септември", "октомври", "ноември", "декември"
				],
				dayOfWeekShort: [
					"нед", "пон", "вто", "сре", "чет", "пет", "саб"
				],
				dayOfWeek: ["Недела", "Понеделник", "Вторник", "Среда", "Четврток", "Петок", "Сабота"]
			},
			mn: { //Mongolian (Монгол)
				months: [
					"1-р сар", "2-р сар", "3-р сар", "4-р сар", "5-р сар", "6-р сар", "7-р сар", "8-р сар", "9-р сар", "10-р сар", "11-р сар", "12-р сар"
				],
				dayOfWeekShort: [
					"Дав", "Мяг", "Лха", "Пүр", "Бсн", "Бям", "Ням"
				],
				dayOfWeek: ["Даваа", "Мягмар", "Лхагва", "Пүрэв", "Баасан", "Бямба", "Ням"]
			},
			'pt-BR': { //Português(Brasil)
				months: [
					"Janeiro", "Fevereiro", "Março", "Abril", "Maio", "Junho", "Julho", "Agosto", "Setembro", "Outubro", "Novembro", "Dezembro"
				],
				dayOfWeekShort: [
					"Dom", "Seg", "Ter", "Qua", "Qui", "Sex", "Sáb"
				],
				dayOfWeek: ["Domingo", "Segunda", "Terça", "Quarta", "Quinta", "Sexta", "Sábado"]
			},
			sk: { //Slovenčina
				months: [
					"Január", "Február", "Marec", "Apríl", "Máj", "Jún", "Júl", "August", "September", "Október", "November", "December"
				],
				dayOfWeekShort: [
					"Ne", "Po", "Ut", "St", "Št", "Pi", "So"
				],
				dayOfWeek: ["Nedeľa", "Pondelok", "Utorok", "Streda", "Štvrtok", "Piatok", "Sobota"]
			},
			sq: { //Albanian (Shqip)
				months: [
					"Janar", "Shkurt", "Mars", "Prill", "Maj", "Qershor", "Korrik", "Gusht", "Shtator", "Tetor", "Nëntor", "Dhjetor"
				],
				dayOfWeekShort: [
					"Die", "Hën", "Mar", "Mër", "Enj", "Pre", "Shtu"
				],
				dayOfWeek: ["E Diel", "E Hënë", "E Martē", "E Mërkurë", "E Enjte", "E Premte", "E Shtunë"]
			},
			'sr-YU': { //Serbian (Srpski)
				months: [
					"Januar", "Februar", "Mart", "April", "Maj", "Jun", "Jul", "Avgust", "Septembar", "Oktobar", "Novembar", "Decembar"
				],
				dayOfWeekShort: [
					"Ned", "Pon", "Uto", "Sre", "čet", "Pet", "Sub"
				],
				dayOfWeek: ["Nedelja","Ponedeljak", "Utorak", "Sreda", "Četvrtak", "Petak", "Subota"]
			},
			sr: { //Serbian Cyrillic (Српски)
				months: [
					"јануар", "фебруар", "март", "април", "мај", "јун", "јул", "август", "септембар", "октобар", "новембар", "децембар"
				],
				dayOfWeekShort: [
					"нед", "пон", "уто", "сре", "чет", "пет", "суб"
				],
				dayOfWeek: ["Недеља","Понедељак", "Уторак", "Среда", "Четвртак", "Петак", "Субота"]
			},
			sv: { //Svenska
				months: [
					"Januari", "Februari", "Mars", "April", "Maj", "Juni", "Juli", "Augusti", "September", "Oktober", "November", "December"
				],
				dayOfWeekShort: [
					"Sön", "Mån", "Tis", "Ons", "Tor", "Fre", "Lör"
				],
				dayOfWeek: ["Söndag", "Måndag", "Tisdag", "Onsdag", "Torsdag", "Fredag", "Lördag"]
			},
			'zh-TW': { //Traditional Chinese (繁體中文)
				months: [
					"一月", "二月", "三月", "四月", "五月", "六月", "七月", "八月", "九月", "十月", "十一月", "十二月"
				],
				dayOfWeekShort: [
					"日", "一", "二", "三", "四", "五", "六"
				],
				dayOfWeek: ["星期日", "星期一", "星期二", "星期三", "星期四", "星期五", "星期六"]
			},
			zh: { //Simplified Chinese (简体中文)
				months: [
					"一月", "二月", "三月", "四月", "五月", "六月", "七月", "八月", "九月", "十月", "十一月", "十二月"
				],
				dayOfWeekShort: [
					"日", "一", "二", "三", "四", "五", "六"
				],
				dayOfWeek: ["星期日", "星期一", "星期二", "星期三", "星期四", "星期五", "星期六"]
			},
			ug:{ // Uyghur(ئۇيغۇرچە)
				months: [
					"1-ئاي","2-ئاي","3-ئاي","4-ئاي","5-ئاي","6-ئاي","7-ئاي","8-ئاي","9-ئاي","10-ئاي","11-ئاي","12-ئاي"
				],
				dayOfWeek: [
					"يەكشەنبە", "دۈشەنبە","سەيشەنبە","چارشەنبە","پەيشەنبە","جۈمە","شەنبە"
				]
			},
			he: { //Hebrew (עברית)
				months: [
					'ינואר', 'פברואר', 'מרץ', 'אפריל', 'מאי', 'יוני', 'יולי', 'אוגוסט', 'ספטמבר', 'אוקטובר', 'נובמבר', 'דצמבר'
				],
				dayOfWeekShort: [
					'א\'', 'ב\'', 'ג\'', 'ד\'', 'ה\'', 'ו\'', 'שבת'
				],
				dayOfWeek: ["ראשון", "שני", "שלישי", "רביעי", "חמישי", "שישי", "שבת", "ראשון"]
			},
			hy: { // Armenian
				months: [
					"Հունվար", "Փետրվար", "Մարտ", "Ապրիլ", "Մայիս", "Հունիս", "Հուլիս", "Օգոստոս", "Սեպտեմբեր", "Հոկտեմբեր", "Նոյեմբեր", "Դեկտեմբեր"
				],
				dayOfWeekShort: [
					"Կի", "Երկ", "Երք", "Չոր", "Հնգ", "Ուրբ", "Շբթ"
				],
				dayOfWeek: ["Կիրակի", "Երկուշաբթի", "Երեքշաբթի", "Չորեքշաբթի", "Հինգշաբթի", "Ուրբաթ", "Շաբաթ"]
			},
			kg: { // Kyrgyz
				months: [
					'Үчтүн айы', 'Бирдин айы', 'Жалган Куран', 'Чын Куран', 'Бугу', 'Кулжа', 'Теке', 'Баш Оона', 'Аяк Оона', 'Тогуздун айы', 'Жетинин айы', 'Бештин айы'
				],
				dayOfWeekShort: [
					"Жек", "Дүй", "Шей", "Шар", "Бей", "Жум", "Ише"
				],
				dayOfWeek: [
					"Жекшемб", "Дүйшөмб", "Шейшемб", "Шаршемб", "Бейшемби", "Жума", "Ишенб"
				]
			},
			rm: { // Romansh
				months: [
					"Schaner", "Favrer", "Mars", "Avrigl", "Matg", "Zercladur", "Fanadur", "Avust", "Settember", "October", "November", "December"
				],
				dayOfWeekShort: [
					"Du", "Gli", "Ma", "Me", "Gie", "Ve", "So"
				],
				dayOfWeek: [
					"Dumengia", "Glindesdi", "Mardi", "Mesemna", "Gievgia", "Venderdi", "Sonda"
				]
			},
			ka: { // Georgian
				months: [
					'იანვარი', 'თებერვალი', 'მარტი', 'აპრილი', 'მაისი', 'ივნისი', 'ივლისი', 'აგვისტო', 'სექტემბერი', 'ოქტომბერი', 'ნოემბერი', 'დეკემბერი'
				],
				dayOfWeekShort: [
					"კვ", "ორშ", "სამშ", "ოთხ", "ხუთ", "პარ", "შაბ"
				],
				dayOfWeek: ["კვირა", "ორშაბათი", "სამშაბათი", "ოთხშაბათი", "ხუთშაბათი", "პარასკევი", "შაბათი"]
			}
		},

		ownerDocument: document,
		contentWindow: window,

		value: '',
		rtl: false,

		format:	'Y/m/d H:i',
		formatTime:	'H:i',
		formatDate:	'Y/m/d',

		startDate:	false, // new Date(), '1986/12/08', '-1970/01/05','-1970/01/05',
		step: 60,
		monthChangeSpinner: true,

		closeOnDateSelect: false,
		closeOnTimeSelect: true,
		closeOnWithoutClick: true,
		closeOnInputClick: true,
		openOnFocus: true,

		timepicker: true,
		datepicker: true,
		weeks: false,

		defaultTime: false,	// use formatTime format (ex. '10:00' for formatTime:	'H:i')
		defaultDate: false,	// use formatDate format (ex new Date() or '1986/12/08' or '-1970/01/05' or '-1970/01/05')

		minDate: false,
		maxDate: false,
		minTime: false,
		maxTime: false,
		minDateTime: false,
		maxDateTime: false,

		allowTimes: [],
		opened: false,
		initTime: true,
		inline: false,
		theme: '',
		touchMovedThreshold: 5,

		onSelectDate: function () {},
		onSelectTime: function () {},
		onChangeMonth: function () {},
		onGetWeekOfYear: function () {},
		onChangeYear: function () {},
		onChangeDateTime: function () {},
		onShow: function () {},
		onClose: function () {},
		onGenerate: function () {},

		withoutCopyright: true,
		inverseButton: false,
		hours12: false,
		next: 'xdsoft_next',
		prev : 'xdsoft_prev',
		dayOfWeekStart: 0,
		parentID: 'body',
		timeHeightInTimePicker: 25,
		timepickerScrollbar: true,
		todayButton: true,
		prevButton: true,
		nextButton: true,
		defaultSelect: true,

		scrollMonth: true,
		scrollTime: true,
		scrollInput: true,

		lazyInit: false,
		mask: false,
		validateOnBlur: true,
		allowBlank: true,
		yearStart: 1950,
		yearEnd: 2050,
		monthStart: 0,
		monthEnd: 11,
		style: '',
		id: '',
		fixed: false,
		roundTime: 'round', // ceil, floor
		className: '',
		weekends: [],
		highlightedDates: [],
		highlightedPeriods: [],
		allowDates : [],
		allowDateRe : null,
		disabledDates : [],
		disabledWeekDays: [],
		yearOffset: 0,
		beforeShowDay: null,

		enterLikeTab: true,
        showApplyButton: false,
        insideParent: false,
	};

	var dateHelper = null,
		defaultDateHelper = null,
		globalLocaleDefault = 'en',
		globalLocale = 'en';

	var dateFormatterOptionsDefault = {
		meridiem: ['AM', 'PM']
	};

	var initDateFormatter = function(){
		var locale = default_options.i18n[globalLocale],
			opts = {
				days: locale.dayOfWeek,
				daysShort: locale.dayOfWeekShort,
				months: locale.months,
				monthsShort: $.map(locale.months, function(n){ return n.substring(0, 3) })
			};

		if (typeof DateFormatter === 'function') {
			dateHelper = defaultDateHelper = new DateFormatter({
				dateSettings: $.extend({}, dateFormatterOptionsDefault, opts)
			});
		}
	};

	var dateFormatters = {
		moment: {
			default_options:{
				format: 'YYYY/MM/DD HH:mm',
				formatDate: 'YYYY/MM/DD',
				formatTime: 'HH:mm',
			},
			formatter: {
				parseDate: function (date, format) {
					if(isFormatStandard(format)){
						return defaultDateHelper.parseDate(date, format);
					} 
					var d = moment(date, format);
					return d.isValid() ? d.toDate() : false;
				},

				formatDate: function (date, format) {
					if(isFormatStandard(format)){
						return defaultDateHelper.formatDate(date, format);
					} 
					return moment(date).format(format);
				},

				formatMask: function(format){
					return format
						.replace(/Y{4}/g, '9999')
						.replace(/Y{2}/g, '99')
						.replace(/M{2}/g, '19')
						.replace(/D{2}/g, '39')
						.replace(/H{2}/g, '29')
						.replace(/m{2}/g, '59')
						.replace(/s{2}/g, '59');
				},
			}
		}
	}

	// for locale settings
	$.datetimepicker = {
		setLocale: function(locale){
			var newLocale = default_options.i18n[locale] ? locale : globalLocaleDefault;
			if (globalLocale !== newLocale) {
				globalLocale = newLocale;
				// reinit date formatter
				initDateFormatter();
			}
		},

		setDateFormatter: function(dateFormatter) {
			if(typeof dateFormatter === 'string' && dateFormatters.hasOwnProperty(dateFormatter)){
				var df = dateFormatters[dateFormatter];
				$.extend(default_options, df.default_options);
				dateHelper = df.formatter; 
			}
			else {
				dateHelper = dateFormatter;
			}
		},
	};

	var standardFormats = {
		RFC_2822: 'D, d M Y H:i:s O',
		ATOM: 'Y-m-d\TH:i:sP',
		ISO_8601: 'Y-m-d\TH:i:sO',
		RFC_822: 'D, d M y H:i:s O',
		RFC_850: 'l, d-M-y H:i:s T',
		RFC_1036: 'D, d M y H:i:s O',
		RFC_1123: 'D, d M Y H:i:s O',
		RSS: 'D, d M Y H:i:s O',
		W3C: 'Y-m-d\TH:i:sP'
	}

	var isFormatStandard = function(format){
		return Object.values(standardFormats).indexOf(format) === -1 ? false : true;
	}

	$.extend($.datetimepicker, standardFormats);

	// first init date formatter
	initDateFormatter();

	// fix for ie8
	if (!window.getComputedStyle) {
		window.getComputedStyle = function (el) {
			this.el = el;
			this.getPropertyValue = function (prop) {
				var re = /(-([a-z]))/g;
				if (prop === 'float') {
					prop = 'styleFloat';
				}
				if (re.test(prop)) {
					prop = prop.replace(re, function (a, b, c) {
						return c.toUpperCase();
					});
				}
				return el.currentStyle[prop] || null;
			};
			return this;
		};
	}
	if (!Array.prototype.indexOf) {
		Array.prototype.indexOf = function (obj, start) {
			var i, j;
			for (i = (start || 0), j = this.length; i < j; i += 1) {
				if (this[i] === obj) { return i; }
			}
			return -1;
		};
	}

	Date.prototype.countDaysInMonth = function () {
		return new Date(this.getFullYear(), this.getMonth() + 1, 0).getDate();
	};

	$.fn.xdsoftScroller = function (options, percent) {
		return this.each(function () {
			var timeboxparent = $(this),
				pointerEventToXY = function (e) {
					var out = {x: 0, y: 0},
						touch;
					if (e.type === 'touchstart' || e.type === 'touchmove' || e.type === 'touchend' || e.type === 'touchcancel') {
						touch  = e.originalEvent.touches[0] || e.originalEvent.changedTouches[0];
						out.x = touch.clientX;
						out.y = touch.clientY;
					} else if (e.type === 'mousedown' || e.type === 'mouseup' || e.type === 'mousemove' || e.type === 'mouseover' || e.type === 'mouseout' || e.type === 'mouseenter' || e.type === 'mouseleave') {
						out.x = e.clientX;
						out.y = e.clientY;
					}
					return out;
				},
				timebox,
				parentHeight,
				height,
				scrollbar,
				scroller,
				maximumOffset = 100,
				start = false,
				startY = 0,
				startTop = 0,
				h1 = 0,
				touchStart = false,
				startTopScroll = 0,
				calcOffset = function () {};

			if (percent === 'hide') {
				timeboxparent.find('.xdsoft_scrollbar').hide();
				return;
			}

			if (!$(this).hasClass('xdsoft_scroller_box')) {
				timebox = timeboxparent.children().eq(0);
				parentHeight = timeboxparent[0].clientHeight;
				height = timebox[0].offsetHeight;
				scrollbar = $('<div class="xdsoft_scrollbar"></div>');
				scroller = $('<div class="xdsoft_scroller"></div>');
				scrollbar.append(scroller);

				timeboxparent.addClass('xdsoft_scroller_box').append(scrollbar);
				calcOffset = function calcOffset(event) {
					var offset = pointerEventToXY(event).y - startY + startTopScroll;
					if (offset < 0) {
						offset = 0;
					}
					if (offset + scroller[0].offsetHeight > h1) {
						offset = h1 - scroller[0].offsetHeight;
					}
					timeboxparent.trigger('scroll_element.xdsoft_scroller', [maximumOffset ? offset / maximumOffset : 0]);
				};

				scroller
					.on('touchstart.xdsoft_scroller mousedown.xdsoft_scroller', function (event) {
						if (!parentHeight) {
							timeboxparent.trigger('resize_scroll.xdsoft_scroller', [percent]);
						}

						startY = pointerEventToXY(event).y;
						startTopScroll = parseInt(scroller.css('margin-top'), 10);
						h1 = scrollbar[0].offsetHeight;

						if (event.type === 'mousedown' || event.type === 'touchstart') {
							if (options.ownerDocument) {
								$(options.ownerDocument.body).addClass('xdsoft_noselect');
							}
							$([options.ownerDocument.body, options.contentWindow]).on('touchend mouseup.xdsoft_scroller', function arguments_callee() {
								$([options.ownerDocument.body, options.contentWindow]).off('touchend mouseup.xdsoft_scroller', arguments_callee)
									.off('mousemove.xdsoft_scroller', calcOffset)
									.removeClass('xdsoft_noselect');
							});
							$(options.ownerDocument.body).on('mousemove.xdsoft_scroller', calcOffset);
						} else {
							touchStart = true;
							event.stopPropagation();
							event.preventDefault();
						}
					})
					.on('touchmove', function (event) {
						if (touchStart) {
							event.preventDefault();
							calcOffset(event);
						}
					})
					.on('touchend touchcancel', function () {
						touchStart =  false;
						startTopScroll = 0;
					});

				timeboxparent
					.on('scroll_element.xdsoft_scroller', function (event, percentage) {
						if (!parentHeight) {
							timeboxparent.trigger('resize_scroll.xdsoft_scroller', [percentage, true]);
						}
						percentage = percentage > 1 ? 1 : (percentage < 0 || isNaN(percentage)) ? 0 : percentage;

						scroller.css('margin-top', maximumOffset * percentage);

						setTimeout(function () {
							timebox.css('marginTop', -parseInt((timebox[0].offsetHeight - parentHeight) * percentage, 10));
						}, 10);
					})
					.on('resize_scroll.xdsoft_scroller', function (event, percentage, noTriggerScroll) {
						var percent, sh;
						parentHeight = timeboxparent[0].clientHeight;
						height = timebox[0].offsetHeight;
						percent = parentHeight / height;
						sh = percent * scrollbar[0].offsetHeight;
						if (percent > 1) {
							scroller.hide();
						} else {
							scroller.show();
							scroller.css('height', parseInt(sh > 10 ? sh : 10, 10));
							maximumOffset = scrollbar[0].offsetHeight - scroller[0].offsetHeight;
							if (noTriggerScroll !== true) {
								timeboxparent.trigger('scroll_element.xdsoft_scroller', [percentage || Math.abs(parseInt(timebox.css('marginTop'), 10)) / (height - parentHeight)]);
							}
						}
					});

				timeboxparent.on('mousewheel', function (event) {
					var top = Math.abs(parseInt(timebox.css('marginTop'), 10));

					top = top - (event.deltaY * 20);
					if (top < 0) {
						top = 0;
					}

					timeboxparent.trigger('scroll_element.xdsoft_scroller', [top / (height - parentHeight)]);
					event.stopPropagation();
					return false;
				});

				timeboxparent.on('touchstart', function (event) {
					start = pointerEventToXY(event);
					startTop = Math.abs(parseInt(timebox.css('marginTop'), 10));
				});

				timeboxparent.on('touchmove', function (event) {
					if (start) {
						event.preventDefault();
						var coord = pointerEventToXY(event);
						timeboxparent.trigger('scroll_element.xdsoft_scroller', [(startTop - (coord.y - start.y)) / (height - parentHeight)]);
					}
				});

				timeboxparent.on('touchend touchcancel', function () {
					start = false;
					startTop = 0;
				});
			}
			timeboxparent.trigger('resize_scroll.xdsoft_scroller', [percent]);
		});
	};

	$.fn.datetimepicker = function (opt, opt2) {
		var result = this,
			KEY0 = 48,
			KEY9 = 57,
			_KEY0 = 96,
			_KEY9 = 105,
            CTRLKEY = 17,
            CMDKEY = 91,
			DEL = 46,
			ENTER = 13,
			ESC = 27,
			BACKSPACE = 8,
			ARROWLEFT = 37,
			ARROWUP = 38,
			ARROWRIGHT = 39,
			ARROWDOWN = 40,
			TAB = 9,
			F5 = 116,
			AKEY = 65,
			CKEY = 67,
			VKEY = 86,
			ZKEY = 90,
			YKEY = 89,
            ctrlDown	=	false,
            cmdDown = false,
			options = ($.isPlainObject(opt) || !opt) ? $.extend(true, {}, default_options, opt) : $.extend(true, {}, default_options),

			lazyInitTimer = 0,
			createDateTimePicker,
			destroyDateTimePicker,

			lazyInit = function (input) {
				input
					.on('open.xdsoft focusin.xdsoft mousedown.xdsoft touchstart', function initOnActionCallback() {
						if (input.is(':disabled') || input.data('xdsoft_datetimepicker')) {
							return;
						}
						clearTimeout(lazyInitTimer);
						lazyInitTimer = setTimeout(function () {

							if (!input.data('xdsoft_datetimepicker')) {
								createDateTimePicker(input);
							}
							input
								.off('open.xdsoft focusin.xdsoft mousedown.xdsoft touchstart', initOnActionCallback)
								.trigger('open.xdsoft');
						}, 100);
					});
			};

		createDateTimePicker = function (input) {
			var datetimepicker = $('<div class="xdsoft_datetimepicker xdsoft_noselect"></div>'),
				xdsoft_copyright = $('<div class="xdsoft_copyright"><a target="_blank" href="http://xdsoft.net/jqplugins/datetimepicker/">xdsoft.net</a></div>'),
				datepicker = $('<div class="xdsoft_datepicker active"></div>'),
				month_picker = $('<div class="xdsoft_monthpicker"><button type="button" class="xdsoft_prev"></button><button type="button" class="xdsoft_today_button"></button>' +
					'<div class="xdsoft_label xdsoft_month"><span></span><i></i></div>' +
					'<div class="xdsoft_label xdsoft_year"><span></span><i></i></div>' +
					'<button type="button" class="xdsoft_next"></button></div>'),
				calendar = $('<div class="xdsoft_calendar"></div>'),
				timepicker = $('<div class="xdsoft_timepicker active"><button type="button" class="xdsoft_prev"></button><div class="xdsoft_time_box"></div><button type="button" class="xdsoft_next"></button></div>'),
				timeboxparent = timepicker.find('.xdsoft_time_box').eq(0),
				timebox = $('<div class="xdsoft_time_variant"></div>'),
				applyButton = $('<button type="button" class="xdsoft_save_selected blue-gradient-button">Save Selected</button>'),

				monthselect = $('<div class="xdsoft_select xdsoft_monthselect"><div></div></div>'),
				yearselect = $('<div class="xdsoft_select xdsoft_yearselect"><div></div></div>'),
				triggerAfterOpen = false,
				XDSoft_datetime,

				xchangeTimer,
				timerclick,
				current_time_index,
				setPos,
				timer = 0,
				_xdsoft_datetime,
				forEachAncestorOf;

			if (options.id) {
				datetimepicker.attr('id', options.id);
			}
			if (options.style) {
				datetimepicker.attr('style', options.style);
			}
			if (options.weeks) {
				datetimepicker.addClass('xdsoft_showweeks');
			}
			if (options.rtl) {
				datetimepicker.addClass('xdsoft_rtl');
			}

			datetimepicker.addClass('xdsoft_' + options.theme);
			datetimepicker.addClass(options.className);

			month_picker
				.find('.xdsoft_month span')
				.after(monthselect);
			month_picker
				.find('.xdsoft_year span')
				.after(yearselect);

			month_picker
				.find('.xdsoft_month,.xdsoft_year')
				.on('touchstart mousedown.xdsoft', function (event) {
					var select = $(this).find('.xdsoft_select').eq(0),
						val = 0,
						top = 0,
						visible = select.is(':visible'),
						items,
						i;

					month_picker
						.find('.xdsoft_select')
						.hide();
					if (_xdsoft_datetime.currentTime) {
						val = _xdsoft_datetime.currentTime[$(this).hasClass('xdsoft_month') ? 'getMonth' : 'getFullYear']();
					}

					select[visible ? 'hide' : 'show']();
					for (items = select.find('div.xdsoft_option'), i = 0; i < items.length; i += 1) {
						if (items.eq(i).data('value') === val) {
							break;
						} else {
							top += items[0].offsetHeight;
						}
					}

					select.xdsoftScroller(options, top / (select.children()[0].offsetHeight - (select[0].clientHeight)));
					event.stopPropagation();
					return false;
				});

			var handleTouchMoved = function (event) {
				var evt = event.originalEvent;
				var touchPosition = evt.touches ? evt.touches[0] : evt;
				this.touchStartPosition = this.touchStartPosition || touchPosition;
				var xMovement = Math.abs(this.touchStartPosition.clientX - touchPosition.clientX);
				var yMovement = Math.abs(this.touchStartPosition.clientY - touchPosition.clientY);
				var distance = Math.sqrt(xMovement * xMovement + yMovement * yMovement);
				if(distance > options.touchMovedThreshold) {
					this.touchMoved = true;
				}
			}

			month_picker
				.find('.xdsoft_select')
				.xdsoftScroller(options)
				.on('touchstart mousedown.xdsoft', function (event) {
					var evt = event.originalEvent;
					this.touchMoved = false;
					this.touchStartPosition = evt.touches ? evt.touches[0] : evt;
					event.stopPropagation();
					event.preventDefault();
				})
				.on('touchmove', '.xdsoft_option', handleTouchMoved)
				.on('touchend mousedown.xdsoft', '.xdsoft_option', function () {
					if (!this.touchMoved) {
						if (_xdsoft_datetime.currentTime === undefined || _xdsoft_datetime.currentTime === null) {
							_xdsoft_datetime.currentTime = _xdsoft_datetime.now();
						}

						var year = _xdsoft_datetime.currentTime.getFullYear();
						if (_xdsoft_datetime && _xdsoft_datetime.currentTime) {
							_xdsoft_datetime.currentTime[$(this).parent().parent().hasClass('xdsoft_monthselect') ? 'setMonth' : 'setFullYear']($(this).data('value'));
						}

						$(this).parent().parent().hide();

						datetimepicker.trigger('xchange.xdsoft');
						if (options.onChangeMonth && $.isFunction(options.onChangeMonth)) {
							options.onChangeMonth.call(datetimepicker, _xdsoft_datetime.currentTime, datetimepicker.data('input'));
						}

						if (year !== _xdsoft_datetime.currentTime.getFullYear() && $.isFunction(options.onChangeYear)) {
							options.onChangeYear.call(datetimepicker, _xdsoft_datetime.currentTime, datetimepicker.data('input'));
						}
					}
				});

			datetimepicker.getValue = function () {
				return _xdsoft_datetime.getCurrentTime();
			};

			datetimepicker.setOptions = function (_options) {
				var highlightedDates = {};

				options = $.extend(true, {}, options, _options);

				if (_options.allowTimes && $.isArray(_options.allowTimes) && _options.allowTimes.length) {
					options.allowTimes = $.extend(true, [], _options.allowTimes);
				}

				if (_options.weekends && $.isArray(_options.weekends) && _options.weekends.length) {
					options.weekends = $.extend(true, [], _options.weekends);
				}

				if (_options.allowDates && $.isArray(_options.allowDates) && _options.allowDates.length) {
					options.allowDates = $.extend(true, [], _options.allowDates);
				}

				if (_options.allowDateRe && Object.prototype.toString.call(_options.allowDateRe)==="[object String]") {
					options.allowDateRe = new RegExp(_options.allowDateRe);
				}

				if (_options.highlightedDates && $.isArray(_options.highlightedDates) && _options.highlightedDates.length) {
					$.each(_options.highlightedDates, function (index, value) {
						var splitData = $.map(value.split(','), $.trim),
							exDesc,
							hDate = new HighlightedDate(dateHelper.parseDate(splitData[0], options.formatDate), splitData[1], splitData[2]), // date, desc, style
							keyDate = dateHelper.formatDate(hDate.date, options.formatDate);
						if (highlightedDates[keyDate] !== undefined) {
							exDesc = highlightedDates[keyDate].desc;
							if (exDesc && exDesc.length && hDate.desc && hDate.desc.length) {
								highlightedDates[keyDate].desc = exDesc + "\n" + hDate.desc;
							}
						} else {
							highlightedDates[keyDate] = hDate;
						}
					});

					options.highlightedDates = $.extend(true, [], highlightedDates);
				}

				if (_options.highlightedPeriods && $.isArray(_options.highlightedPeriods) && _options.highlightedPeriods.length) {
					highlightedDates = $.extend(true, [], options.highlightedDates);
					$.each(_options.highlightedPeriods, function (index, value) {
						var dateTest, // start date
							dateEnd,
							desc,
							hDate,
							keyDate,
							exDesc,
							style;
						if ($.isArray(value)) {
							dateTest = value[0];
							dateEnd = value[1];
							desc = value[2];
							style = value[3];
						}
						else {
							var splitData = $.map(value.split(','), $.trim);
							dateTest = dateHelper.parseDate(splitData[0], options.formatDate);
							dateEnd = dateHelper.parseDate(splitData[1], options.formatDate);
							desc = splitData[2];
							style = splitData[3];
						}

						while (dateTest <= dateEnd) {
							hDate = new HighlightedDate(dateTest, desc, style);
							keyDate = dateHelper.formatDate(dateTest, options.formatDate);
							dateTest.setDate(dateTest.getDate() + 1);
							if (highlightedDates[keyDate] !== undefined) {
								exDesc = highlightedDates[keyDate].desc;
								if (exDesc && exDesc.length && hDate.desc && hDate.desc.length) {
									highlightedDates[keyDate].desc = exDesc + "\n" + hDate.desc;
								}
							} else {
								highlightedDates[keyDate] = hDate;
							}
						}
					});

					options.highlightedDates = $.extend(true, [], highlightedDates);
				}

				if (_options.disabledDates && $.isArray(_options.disabledDates) && _options.disabledDates.length) {
					options.disabledDates = $.extend(true, [], _options.disabledDates);
				}

				if (_options.disabledWeekDays && $.isArray(_options.disabledWeekDays) && _options.disabledWeekDays.length) {
					options.disabledWeekDays = $.extend(true, [], _options.disabledWeekDays);
				}

				if ((options.open || options.opened) && (!options.inline)) {
					input.trigger('open.xdsoft');
				}

				if (options.inline) {
					triggerAfterOpen = true;
					datetimepicker.addClass('xdsoft_inline');
					input.after(datetimepicker).hide();
				}

				if (options.inverseButton) {
					options.next = 'xdsoft_prev';
					options.prev = 'xdsoft_next';
				}

				if (options.datepicker) {
					datepicker.addClass('active');
				} else {
					datepicker.removeClass('active');
				}

				if (options.timepicker) {
					timepicker.addClass('active');
				} else {
					timepicker.removeClass('active');
				}

				if (options.value) {
					_xdsoft_datetime.setCurrentTime(options.value);
					if (input && input.val) {
						input.val(_xdsoft_datetime.str);
					}
				}

				if (isNaN(options.dayOfWeekStart)) {
					options.dayOfWeekStart = 0;
				} else {
					options.dayOfWeekStart = parseInt(options.dayOfWeekStart, 10) % 7;
				}

				if (!options.timepickerScrollbar) {
					timeboxparent.xdsoftScroller(options, 'hide');
				}

				if (options.minDate && /^[\+\-](.*)$/.test(options.minDate)) {
					options.minDate = dateHelper.formatDate(_xdsoft_datetime.strToDateTime(options.minDate), options.formatDate);
				}

				if (options.maxDate &&  /^[\+\-](.*)$/.test(options.maxDate)) {
					options.maxDate = dateHelper.formatDate(_xdsoft_datetime.strToDateTime(options.maxDate), options.formatDate);
				}

                if (options.minDateTime &&  /^\+(.*)$/.test(options.minDateTime)) {
                	options.minDateTime = _xdsoft_datetime.strToDateTime(options.minDateTime).dateFormat(options.formatDate);
                }

                if (options.maxDateTime &&  /^\+(.*)$/.test(options.maxDateTime)) {
                	options.maxDateTime = _xdsoft_datetime.strToDateTime(options.maxDateTime).dateFormat(options.formatDate);
                }

				applyButton.toggle(options.showApplyButton);

				month_picker
					.find('.xdsoft_today_button')
					.css('visibility', !options.todayButton ? 'hidden' : 'visible');

				month_picker
					.find('.' + options.prev)
					.css('visibility', !options.prevButton ? 'hidden' : 'visible');

				month_picker
					.find('.' + options.next)
					.css('visibility', !options.nextButton ? 'hidden' : 'visible');

				setMask(options);

				if (options.validateOnBlur) {
					input
						.off('blur.xdsoft')
						.on('blur.xdsoft', function () {
							if (options.allowBlank && (!$.trim($(this).val()).length ||
									(typeof options.mask === "string" && $.trim($(this).val()) === options.mask.replace(/[0-9]/g, '_')))) {
								$(this).val(null);
								datetimepicker.data('xdsoft_datetime').empty();
							} else {
								var d = dateHelper.parseDate($(this).val(), options.format);
								if (d) { // parseDate() may skip some invalid parts like date or time, so make it clear for user: show parsed date/time
									$(this).val(dateHelper.formatDate(d, options.format));
								} else {
									var splittedHours   = +([$(this).val()[0], $(this).val()[1]].join('')),
										splittedMinutes = +([$(this).val()[2], $(this).val()[3]].join(''));

									// parse the numbers as 0312 => 03:12
									if (!options.datepicker && options.timepicker && splittedHours >= 0 && splittedHours < 24 && splittedMinutes >= 0 && splittedMinutes < 60) {
										$(this).val([splittedHours, splittedMinutes].map(function (item) {
											return item > 9 ? item : '0' + item;
										}).join(':'));
									} else {
										$(this).val(dateHelper.formatDate(_xdsoft_datetime.now(), options.format));
									}
								}
								datetimepicker.data('xdsoft_datetime').setCurrentTime($(this).val());
							}

							datetimepicker.trigger('changedatetime.xdsoft');
							datetimepicker.trigger('close.xdsoft');
						});
				}
				options.dayOfWeekStartPrev = (options.dayOfWeekStart === 0) ? 6 : options.dayOfWeekStart - 1;

				datetimepicker
					.trigger('xchange.xdsoft')
					.trigger('afterOpen.xdsoft');
			};

			datetimepicker
				.data('options', options)
				.on('touchstart mousedown.xdsoft', function (event) {
					event.stopPropagation();
					event.preventDefault();
					yearselect.hide();
					monthselect.hide();
					return false;
				});

			//scroll_element = timepicker.find('.xdsoft_time_box');
			timeboxparent.append(timebox);
			timeboxparent.xdsoftScroller(options);

			datetimepicker.on('afterOpen.xdsoft', function () {
				timeboxparent.xdsoftScroller(options);
			});

			datetimepicker
				.append(datepicker)
				.append(timepicker);

			if (options.withoutCopyright !== true) {
				datetimepicker
					.append(xdsoft_copyright);
			}

			datepicker
				.append(month_picker)
				.append(calendar)
				.append(applyButton);

            if (options.insideParent) {
                $(input).parent().append(datetimepicker);
            } else {
                $(options.parentID).append(datetimepicker);
            }

			XDSoft_datetime = function () {
				var _this = this;
				_this.now = function (norecursion) {
					var d = new Date(),
						date,
						time;

					if (!norecursion && options.defaultDate) {
						date = _this.strToDateTime(options.defaultDate);
						d.setFullYear(date.getFullYear());
						d.setMonth(date.getMonth());
						d.setDate(date.getDate());
					}

					d.setFullYear(d.getFullYear());

					if (!norecursion && options.defaultTime) {
						time = _this.strtotime(options.defaultTime);
						d.setHours(time.getHours());
						d.setMinutes(time.getMinutes());
						d.setSeconds(time.getSeconds());
						d.setMilliseconds(time.getMilliseconds());
					}
					return d;
				};

				_this.isValidDate = function (d) {
					if (Object.prototype.toString.call(d) !== "[object Date]") {
						return false;
					}
					return !isNaN(d.getTime());
				};

				_this.setCurrentTime = function (dTime, requireValidDate) {
					if (typeof dTime === 'string') {
						_this.currentTime = _this.strToDateTime(dTime);
					}
					else if (_this.isValidDate(dTime)) {
						_this.currentTime = dTime;
					}
					else if (!dTime && !requireValidDate && options.allowBlank && !options.inline) {
						_this.currentTime = null;
					}
					else {
						_this.currentTime = _this.now();
					}

					datetimepicker.trigger('xchange.xdsoft');
				};

				_this.empty = function () {
					_this.currentTime = null;
				};

				_this.getCurrentTime = function () {
					return _this.currentTime;
				};

				_this.nextMonth = function () {

					if (_this.currentTime === undefined || _this.currentTime === null) {
						_this.currentTime = _this.now();
					}

					var month = _this.currentTime.getMonth() + 1,
						year;
					if (month === 12) {
						_this.currentTime.setFullYear(_this.currentTime.getFullYear() + 1);
						month = 0;
					}

					year = _this.currentTime.getFullYear();

					_this.currentTime.setDate(
						Math.min(
							new Date(_this.currentTime.getFullYear(), month + 1, 0).getDate(),
							_this.currentTime.getDate()
						)
					);
					_this.currentTime.setMonth(month);

					if (options.onChangeMonth && $.isFunction(options.onChangeMonth)) {
						options.onChangeMonth.call(datetimepicker, _xdsoft_datetime.currentTime, datetimepicker.data('input'));
					}

					if (year !== _this.currentTime.getFullYear() && $.isFunction(options.onChangeYear)) {
						options.onChangeYear.call(datetimepicker, _xdsoft_datetime.currentTime, datetimepicker.data('input'));
					}

					datetimepicker.trigger('xchange.xdsoft');
					return month;
				};

				_this.prevMonth = function () {

					if (_this.currentTime === undefined || _this.currentTime === null) {
						_this.currentTime = _this.now();
					}

					var month = _this.currentTime.getMonth() - 1;
					if (month === -1) {
						_this.currentTime.setFullYear(_this.currentTime.getFullYear() - 1);
						month = 11;
					}
					_this.currentTime.setDate(
						Math.min(
							new Date(_this.currentTime.getFullYear(), month + 1, 0).getDate(),
							_this.currentTime.getDate()
						)
					);
					_this.currentTime.setMonth(month);
					if (options.onChangeMonth && $.isFunction(options.onChangeMonth)) {
						options.onChangeMonth.call(datetimepicker, _xdsoft_datetime.currentTime, datetimepicker.data('input'));
					}
					datetimepicker.trigger('xchange.xdsoft');
					return month;
				};

				_this.getWeekOfYear = function (datetime) {
					if (options.onGetWeekOfYear && $.isFunction(options.onGetWeekOfYear)) {
						var week = options.onGetWeekOfYear.call(datetimepicker, datetime);
						if (typeof week !== 'undefined') {
							return week;
						}
					}
					var onejan = new Date(datetime.getFullYear(), 0, 1);

					//First week of the year is th one with the first Thursday according to ISO8601
					if (onejan.getDay() !== 4) {
						onejan.setMonth(0, 1 + ((4 - onejan.getDay()+ 7) % 7));
					}

					return Math.ceil((((datetime - onejan) / 86400000) + onejan.getDay() + 1) / 7);
				};

				_this.strToDateTime = function (sDateTime) {
					var tmpDate = [], timeOffset, currentTime;

					if (sDateTime && sDateTime instanceof Date && _this.isValidDate(sDateTime)) {
						return sDateTime;
					}

					tmpDate = /^([+-]{1})(.*)$/.exec(sDateTime);

					if (tmpDate) {
						tmpDate[2] = dateHelper.parseDate(tmpDate[2], options.formatDate);
					}

					if (tmpDate  && tmpDate[2]) {
						timeOffset = tmpDate[2].getTime() - (tmpDate[2].getTimezoneOffset()) * 60000;
						currentTime = new Date((_this.now(true)).getTime() + parseInt(tmpDate[1] + '1', 10) * timeOffset);
					} else {
						currentTime = sDateTime ? dateHelper.parseDate(sDateTime, options.format) : _this.now();
					}

					if (!_this.isValidDate(currentTime)) {
						currentTime = _this.now();
					}

					return currentTime;
				};

				_this.strToDate = function (sDate) {
					if (sDate && sDate instanceof Date && _this.isValidDate(sDate)) {
						return sDate;
					}

					var currentTime = sDate ? dateHelper.parseDate(sDate, options.formatDate) : _this.now(true);
					if (!_this.isValidDate(currentTime)) {
						currentTime = _this.now(true);
					}
					return currentTime;
				};

				_this.strtotime = function (sTime) {
					if (sTime && sTime instanceof Date && _this.isValidDate(sTime)) {
						return sTime;
					}
					var currentTime = sTime ? dateHelper.parseDate(sTime, options.formatTime) : _this.now(true);
					if (!_this.isValidDate(currentTime)) {
						currentTime = _this.now(true);
					}
					return currentTime;
				};

				_this.str = function () {
					var format = options.format;
					if (options.yearOffset) {
						format = format.replace('Y', _this.currentTime.getFullYear() + options.yearOffset);
						format = format.replace('y', String(_this.currentTime.getFullYear() + options.yearOffset).substring(2, 4));
					}
					return dateHelper.formatDate(_this.currentTime, format);
				};
				_this.currentTime = this.now();
			};

			_xdsoft_datetime = new XDSoft_datetime();

			applyButton.on('touchend click', function (e) {//pathbrite
				e.preventDefault();
				datetimepicker.data('changed', true);
				_xdsoft_datetime.setCurrentTime(getCurrentValue());
				input.val(_xdsoft_datetime.str());
				datetimepicker.trigger('close.xdsoft');
			});
			month_picker
				.find('.xdsoft_today_button')
				.on('touchend mousedown.xdsoft', function () {
					datetimepicker.data('changed', true);
					_xdsoft_datetime.setCurrentTime(0, true);
					datetimepicker.trigger('afterOpen.xdsoft');
				}).on('dblclick.xdsoft', function () {
				var currentDate = _xdsoft_datetime.getCurrentTime(), minDate, maxDate;
				currentDate = new Date(currentDate.getFullYear(), currentDate.getMonth(), currentDate.getDate());
				minDate = _xdsoft_datetime.strToDate(options.minDate);
				minDate = new Date(minDate.getFullYear(), minDate.getMonth(), minDate.getDate());
				if (currentDate < minDate) {
					return;
				}
				maxDate = _xdsoft_datetime.strToDate(options.maxDate);
				maxDate = new Date(maxDate.getFullYear(), maxDate.getMonth(), maxDate.getDate());
				if (currentDate > maxDate) {
					return;
				}
				input.val(_xdsoft_datetime.str());
				input.trigger('change');
				datetimepicker.trigger('close.xdsoft');
			});
			month_picker
				.find('.xdsoft_prev,.xdsoft_next')
				.on('touchend mousedown.xdsoft', function () {
					var $this = $(this),
						timer = 0,
						stop = false;

					(function arguments_callee1(v) {
						if ($this.hasClass(options.next)) {
							_xdsoft_datetime.nextMonth();
						} else if ($this.hasClass(options.prev)) {
							_xdsoft_datetime.prevMonth();
						}
						if (options.monthChangeSpinner) {
							if (!stop) {
								timer = setTimeout(arguments_callee1, v || 100);
							}
						}
					}(500));

					$([options.ownerDocument.body, options.contentWindow]).on('touchend mouseup.xdsoft', function arguments_callee2() {
						clearTimeout(timer);
						stop = true;
						$([options.ownerDocument.body, options.contentWindow]).off('touchend mouseup.xdsoft', arguments_callee2);
					});
				});

			timepicker
				.find('.xdsoft_prev,.xdsoft_next')
				.on('touchend mousedown.xdsoft', function () {
					var $this = $(this),
						timer = 0,
						stop = false,
						period = 110;
					(function arguments_callee4(v) {
						var pheight = timeboxparent[0].clientHeight,
							height = timebox[0].offsetHeight,
							top = Math.abs(parseInt(timebox.css('marginTop'), 10));
						if ($this.hasClass(options.next) && (height - pheight) - options.timeHeightInTimePicker >= top) {
							timebox.css('marginTop', '-' + (top + options.timeHeightInTimePicker) + 'px');
						} else if ($this.hasClass(options.prev) && top - options.timeHeightInTimePicker >= 0) {
							timebox.css('marginTop', '-' + (top - options.timeHeightInTimePicker) + 'px');
						}
						/**
						 * Fixed bug:
						 * When using css3 transition, it will cause a bug that you cannot scroll the timepicker list.
						 * The reason is that the transition-duration time, if you set it to 0, all things fine, otherwise, this
						 * would cause a bug when you use jquery.css method.
						 * Let's say: * { transition: all .5s ease; }
						 * jquery timebox.css('marginTop') will return the original value which is before you clicking the next/prev button,
						 * meanwhile the timebox[0].style.marginTop will return the right value which is after you clicking the
						 * next/prev button.
						 *
						 * What we should do:
						 * Replace timebox.css('marginTop') with timebox[0].style.marginTop.
						 */
						timeboxparent.trigger('scroll_element.xdsoft_scroller', [Math.abs(parseInt(timebox[0].style.marginTop, 10) / (height - pheight))]);
						period = (period > 10) ? 10 : period - 10;
						if (!stop) {
							timer = setTimeout(arguments_callee4, v || period);
						}
					}(500));
					$([options.ownerDocument.body, options.contentWindow]).on('touchend mouseup.xdsoft', function arguments_callee5() {
						clearTimeout(timer);
						stop = true;
						$([options.ownerDocument.body, options.contentWindow])
							.off('touchend mouseup.xdsoft', arguments_callee5);
					});
				});

			xchangeTimer = 0;
			// base handler - generating a calendar and timepicker
			datetimepicker
				.on('xchange.xdsoft', function (event) {
					clearTimeout(xchangeTimer);
					xchangeTimer = setTimeout(function () {

						if (_xdsoft_datetime.currentTime === undefined || _xdsoft_datetime.currentTime === null) {
							_xdsoft_datetime.currentTime = _xdsoft_datetime.now();
						}

						var table =	'',
							start = new Date(_xdsoft_datetime.currentTime.getFullYear(), _xdsoft_datetime.currentTime.getMonth(), 1, 12, 0, 0),
							i = 0,
							j,
							today = _xdsoft_datetime.now(),
							maxDate = false,
							minDate = false,
							minDateTime = false,
							maxDateTime = false,
							hDate,
							day,
							d,
							y,
							m,
							w,
							classes = [],
							customDateSettings,
							newRow = true,
							time = '',
							h,
							line_time,
							description;

						while (start.getDay() !== options.dayOfWeekStart) {
							start.setDate(start.getDate() - 1);
						}

						table += '<table><thead><tr>';

						if (options.weeks) {
							table += '<th></th>';
						}

						for (j = 0; j < 7; j += 1) {
							table += '<th>' + options.i18n[globalLocale].dayOfWeekShort[(j + options.dayOfWeekStart) % 7] + '</th>';
						}

						table += '</tr></thead>';
						table += '<tbody>';

						if (options.maxDate !== false) {
							maxDate = _xdsoft_datetime.strToDate(options.maxDate);
							maxDate = new Date(maxDate.getFullYear(), maxDate.getMonth(), maxDate.getDate(), 23, 59, 59, 999);
						}

						if (options.minDate !== false) {
							minDate = _xdsoft_datetime.strToDate(options.minDate);
							minDate = new Date(minDate.getFullYear(), minDate.getMonth(), minDate.getDate());
						}

                        if (options.minDateTime !== false) {
							minDateTime = _xdsoft_datetime.strToDate(options.minDateTime);
							minDateTime = new Date(minDateTime.getFullYear(), minDateTime.getMonth(), minDateTime.getDate(), minDateTime.getHours(), minDateTime.getMinutes(), minDateTime.getSeconds());
						}

                        if (options.maxDateTime !== false) {
							maxDateTime = _xdsoft_datetime.strToDate(options.maxDateTime);
							maxDateTime = new Date(maxDateTime.getFullYear(), maxDateTime.getMonth(), maxDateTime.getDate(), maxDateTime.getHours(), maxDateTime.getMinutes(), maxDateTime.getSeconds());
						}

						var maxDateTimeDay;
						if (maxDateTime !== false) {
							maxDateTimeDay = ((maxDateTime.getFullYear() * 12) + maxDateTime.getMonth()) * 31 + maxDateTime.getDate();
						}

						while (i < _xdsoft_datetime.currentTime.countDaysInMonth() || start.getDay() !== options.dayOfWeekStart || _xdsoft_datetime.currentTime.getMonth() === start.getMonth()) {
							classes = [];
							i += 1;

							day = start.getDay();
							d = start.getDate();
							y = start.getFullYear();
							m = start.getMonth();
							w = _xdsoft_datetime.getWeekOfYear(start);
							description = '';

							classes.push('xdsoft_date');

							if (options.beforeShowDay && $.isFunction(options.beforeShowDay.call)) {
								customDateSettings = options.beforeShowDay.call(datetimepicker, start);
							} else {
								customDateSettings = null;
							}

							if(options.allowDateRe && Object.prototype.toString.call(options.allowDateRe) === "[object RegExp]"){
								if(!options.allowDateRe.test(dateHelper.formatDate(start, options.formatDate))){
									classes.push('xdsoft_disabled');
								}
							}
							
							if(options.allowDates && options.allowDates.length>0){
								if(options.allowDates.indexOf(dateHelper.formatDate(start, options.formatDate)) === -1){
									classes.push('xdsoft_disabled');
								}
							}
							
							var currentDay = ((start.getFullYear() * 12) + start.getMonth()) * 31 + start.getDate();
							if ((maxDate !== false && start > maxDate) || (minDateTime !== false && start < minDateTime)  || (minDate !== false && start < minDate) || (maxDateTime !== false && currentDay > maxDateTimeDay) || (customDateSettings && customDateSettings[0] === false)) {
								classes.push('xdsoft_disabled');
							}
							
							if (options.disabledDates.indexOf(dateHelper.formatDate(start, options.formatDate)) !== -1) {
								classes.push('xdsoft_disabled');
							}
							
							if (options.disabledWeekDays.indexOf(day) !== -1) {
								classes.push('xdsoft_disabled');
							}
							
							if (input.is('[disabled]')) {
								classes.push('xdsoft_disabled');
							}

							if (customDateSettings && customDateSettings[1] !== "") {
								classes.push(customDateSettings[1]);
							}

							if (_xdsoft_datetime.currentTime.getMonth() !== m) {
								classes.push('xdsoft_other_month');
							}

							if ((options.defaultSelect || datetimepicker.data('changed')) && dateHelper.formatDate(_xdsoft_datetime.currentTime, options.formatDate) === dateHelper.formatDate(start, options.formatDate)) {
								classes.push('xdsoft_current');
							}

							if (dateHelper.formatDate(today, options.formatDate) === dateHelper.formatDate(start, options.formatDate)) {
								classes.push('xdsoft_today');
							}

							if (start.getDay() === 0 || start.getDay() === 6 || options.weekends.indexOf(dateHelper.formatDate(start, options.formatDate)) !== -1) {
								classes.push('xdsoft_weekend');
							}

							if (options.highlightedDates[dateHelper.formatDate(start, options.formatDate)] !== undefined) {
								hDate = options.highlightedDates[dateHelper.formatDate(start, options.formatDate)];
								classes.push(hDate.style === undefined ? 'xdsoft_highlighted_default' : hDate.style);
								description = hDate.desc === undefined ? '' : hDate.desc;
							}

							if (options.beforeShowDay && $.isFunction(options.beforeShowDay)) {
								classes.push(options.beforeShowDay(start));
							}

							if (newRow) {
								table += '<tr>';
								newRow = false;
								if (options.weeks) {
									table += '<th>' + w + '</th>';
								}
							}

							table += '<td data-date="' + d + '" data-month="' + m + '" data-year="' + y + '"' + ' class="xdsoft_date xdsoft_day_of_week' + start.getDay() + ' ' + classes.join(' ') + '" title="' + description + '">' +
								'<div>' + d + '</div>' +
								'</td>';

							if (start.getDay() === options.dayOfWeekStartPrev) {
								table += '</tr>';
								newRow = true;
							}

							start.setDate(d + 1);
						}
						table += '</tbody></table>';

						calendar.html(table);

						month_picker.find('.xdsoft_label span').eq(0).text(options.i18n[globalLocale].months[_xdsoft_datetime.currentTime.getMonth()]);
						month_picker.find('.xdsoft_label span').eq(1).text(_xdsoft_datetime.currentTime.getFullYear() + options.yearOffset);

						// generate timebox
						time = '';
						h = '';
						m = '';

						var minTimeMinutesOfDay = 0;
						if (options.minTime !== false) {
						    var t = _xdsoft_datetime.strtotime(options.minTime);
						    minTimeMinutesOfDay = 60 * t.getHours() + t.getMinutes();
						}
						var maxTimeMinutesOfDay = 24 * 60;
						if (options.maxTime !== false) {
						    var t = _xdsoft_datetime.strtotime(options.maxTime);
						    maxTimeMinutesOfDay = 60 * t.getHours() + t.getMinutes();
						}

						if (options.minDateTime !== false) {
							var t = _xdsoft_datetime.strToDateTime(options.minDateTime);
						        var currentDayIsMinDateTimeDay = dateHelper.formatDate(_xdsoft_datetime.currentTime, options.formatDate) === dateHelper.formatDate(t, options.formatDate);
							if (currentDayIsMinDateTimeDay) {
								var m = 60 * t.getHours() + t.getMinutes();
								if (m > minTimeMinutesOfDay) minTimeMinutesOfDay = m;
							}
						}

						if (options.maxDateTime !== false) {
							var t = _xdsoft_datetime.strToDateTime(options.maxDateTime);
						        var currentDayIsMaxDateTimeDay = dateHelper.formatDate(_xdsoft_datetime.currentTime, options.formatDate) === dateHelper.formatDate(t, options.formatDate);
							if (currentDayIsMaxDateTimeDay) {
								var m = 60 * t.getHours() + t.getMinutes();
								if (m < maxTimeMinutesOfDay) maxTimeMinutesOfDay = m;
							}
						}

						line_time = function line_time(h, m) {
							var now = _xdsoft_datetime.now(), current_time,
								isALlowTimesInit = options.allowTimes && $.isArray(options.allowTimes) && options.allowTimes.length;
							now.setHours(h);
							h = parseInt(now.getHours(), 10);
							now.setMinutes(m);
							m = parseInt(now.getMinutes(), 10);
							classes = [];
							var currentMinutesOfDay = 60 * h + m;
							if (input.is('[disabled]') || (currentMinutesOfDay >= maxTimeMinutesOfDay) || (currentMinutesOfDay < minTimeMinutesOfDay)) {
								classes.push('xdsoft_disabled');
							}

							current_time = new Date(_xdsoft_datetime.currentTime);
							current_time.setHours(parseInt(_xdsoft_datetime.currentTime.getHours(), 10));

							if (!isALlowTimesInit) {
								current_time.setMinutes(Math[options.roundTime](_xdsoft_datetime.currentTime.getMinutes() / options.step) * options.step);
							}

							if ((options.initTime || options.defaultSelect || datetimepicker.data('changed')) && current_time.getHours() === parseInt(h, 10) && ((!isALlowTimesInit && options.step > 59) || current_time.getMinutes() === parseInt(m, 10))) {
								if (options.defaultSelect || datetimepicker.data('changed')) {
									classes.push('xdsoft_current');
								} else if (options.initTime) {
									classes.push('xdsoft_init_time');
								}
							}
							if (parseInt(today.getHours(), 10) === parseInt(h, 10) && parseInt(today.getMinutes(), 10) === parseInt(m, 10)) {
								classes.push('xdsoft_today');
							}
							time += '<div class="xdsoft_time ' + classes.join(' ') + '" data-hour="' + h + '" data-minute="' + m + '">' + dateHelper.formatDate(now, options.formatTime) + '</div>';
						};

						if (!options.allowTimes || !$.isArray(options.allowTimes) || !options.allowTimes.length) {
							for (i = 0, j = 0; i < (options.hours12 ? 12 : 24); i += 1) {
								for (j = 0; j < 60; j += options.step) {
								        var currentMinutesOfDay = i * 60 + j;
								        if (currentMinutesOfDay < minTimeMinutesOfDay) continue;
								        if (currentMinutesOfDay >= maxTimeMinutesOfDay) continue;
									h = (i < 10 ? '0' : '') + i;
									m = (j < 10 ? '0' : '') + j;
									line_time(h, m);
								}
							}
						} else {
							for (i = 0; i < options.allowTimes.length; i += 1) {
								h = _xdsoft_datetime.strtotime(options.allowTimes[i]).getHours();
								m = _xdsoft_datetime.strtotime(options.allowTimes[i]).getMinutes();
								line_time(h, m);
							}
						}

						timebox.html(time);

						opt = '';

						for (i = parseInt(options.yearStart, 10); i <= parseInt(options.yearEnd, 10); i += 1) {
							opt += '<div class="xdsoft_option ' + (_xdsoft_datetime.currentTime.getFullYear() === i ? 'xdsoft_current' : '') + '" data-value="' + i + '">' + (i + options.yearOffset) + '</div>';
						}
						yearselect.children().eq(0)
							.html(opt);

						for (i = parseInt(options.monthStart, 10), opt = ''; i <= parseInt(options.monthEnd, 10); i += 1) {
							opt += '<div class="xdsoft_option ' + (_xdsoft_datetime.currentTime.getMonth() === i ? 'xdsoft_current' : '') + '" data-value="' + i + '">' + options.i18n[globalLocale].months[i] + '</div>';
						}
						monthselect.children().eq(0).html(opt);
						$(datetimepicker)
							.trigger('generate.xdsoft');
					}, 10);
					event.stopPropagation();
				})
				.on('afterOpen.xdsoft', function () {
					if (options.timepicker) {
						var classType, pheight, height, top;
						if (timebox.find('.xdsoft_current').length) {
							classType = '.xdsoft_current';
						} else if (timebox.find('.xdsoft_init_time').length) {
							classType = '.xdsoft_init_time';
						}
						if (classType) {
							pheight = timeboxparent[0].clientHeight;
							height = timebox[0].offsetHeight;
							top = timebox.find(classType).index() * options.timeHeightInTimePicker + 1;
							if ((height - pheight) < top) {
								top = height - pheight;
							}
							timeboxparent.trigger('scroll_element.xdsoft_scroller', [parseInt(top, 10) / (height - pheight)]);
						} else {
							timeboxparent.trigger('scroll_element.xdsoft_scroller', [0]);
						}
					}
				});

			timerclick = 0;
			calendar
				.on('touchend click.xdsoft', 'td', function (xdevent) {
					xdevent.stopPropagation();  // Prevents closing of Pop-ups, Modals and Flyouts in Bootstrap
					timerclick += 1;
					var $this = $(this),
						currentTime = _xdsoft_datetime.currentTime;

					if (currentTime === undefined || currentTime === null) {
						_xdsoft_datetime.currentTime = _xdsoft_datetime.now();
						currentTime = _xdsoft_datetime.currentTime;
					}

					if ($this.hasClass('xdsoft_disabled')) {
						return false;
					}

					currentTime.setDate(1);
					currentTime.setFullYear($this.data('year'));
					currentTime.setMonth($this.data('month'));
					currentTime.setDate($this.data('date'));

					datetimepicker.trigger('select.xdsoft', [currentTime]);

					input.val(_xdsoft_datetime.str());

					if (options.onSelectDate &&	$.isFunction(options.onSelectDate)) {
						options.onSelectDate.call(datetimepicker, _xdsoft_datetime.currentTime, datetimepicker.data('input'), xdevent);
					}

					datetimepicker.data('changed', true);
					datetimepicker.trigger('xchange.xdsoft');
					datetimepicker.trigger('changedatetime.xdsoft');
					if ((timerclick > 1 || (options.closeOnDateSelect === true || (options.closeOnDateSelect === false && !options.timepicker))) && !options.inline) {
						datetimepicker.trigger('close.xdsoft');
					}
					setTimeout(function () {
						timerclick = 0;
					}, 200);
				});

			timebox
				.on('touchstart', 'div', function (xdevent) {
					this.touchMoved = false;
				})
				.on('touchmove', 'div', handleTouchMoved)
				.on('touchend click.xdsoft', 'div', function (xdevent) {
					if (!this.touchMoved) {
						xdevent.stopPropagation();
						var $this = $(this),
							currentTime = _xdsoft_datetime.currentTime;

						if (currentTime === undefined || currentTime === null) {
							_xdsoft_datetime.currentTime = _xdsoft_datetime.now();
							currentTime = _xdsoft_datetime.currentTime;
						}

						if ($this.hasClass('xdsoft_disabled')) {
							return false;
						}
						currentTime.setHours($this.data('hour'));
						currentTime.setMinutes($this.data('minute'));
						datetimepicker.trigger('select.xdsoft', [currentTime]);

						datetimepicker.data('input').val(_xdsoft_datetime.str());

						if (options.onSelectTime && $.isFunction(options.onSelectTime)) {
							options.onSelectTime.call(datetimepicker, _xdsoft_datetime.currentTime, datetimepicker.data('input'), xdevent);
						}
						datetimepicker.data('changed', true);
						datetimepicker.trigger('xchange.xdsoft');
						datetimepicker.trigger('changedatetime.xdsoft');
						if (options.inline !== true && options.closeOnTimeSelect === true) {
							datetimepicker.trigger('close.xdsoft');
						}
					}
				});

			datepicker
				.on('mousewheel.xdsoft', function (event) {
					if (!options.scrollMonth) {
						return true;
					}
					if (event.deltaY < 0) {
						_xdsoft_datetime.nextMonth();
					} else {
						_xdsoft_datetime.prevMonth();
					}
					return false;
				});

			input
				.on('mousewheel.xdsoft', function (event) {
					if (!options.scrollInput) {
						return true;
					}
					if (!options.datepicker && options.timepicker) {
						current_time_index = timebox.find('.xdsoft_current').length ? timebox.find('.xdsoft_current').eq(0).index() : 0;
						if (current_time_index + event.deltaY >= 0 && current_time_index + event.deltaY < timebox.children().length) {
							current_time_index += event.deltaY;
						}
						if (timebox.children().eq(current_time_index).length) {
							timebox.children().eq(current_time_index).trigger('mousedown');
						}
						return false;
					}
					if (options.datepicker && !options.timepicker) {
						datepicker.trigger(event, [event.deltaY, event.deltaX, event.deltaY]);
						if (input.val) {
							input.val(_xdsoft_datetime.str());
						}
						datetimepicker.trigger('changedatetime.xdsoft');
						return false;
					}
				});

			datetimepicker
				.on('changedatetime.xdsoft', function (event) {
					if (options.onChangeDateTime && $.isFunction(options.onChangeDateTime)) {
						var $input = datetimepicker.data('input');
						options.onChangeDateTime.call(datetimepicker, _xdsoft_datetime.currentTime, $input, event);
						delete options.value;
						$input.trigger('change');
					}
				})
				.on('generate.xdsoft', function () {
					if (options.onGenerate && $.isFunction(options.onGenerate)) {
						options.onGenerate.call(datetimepicker, _xdsoft_datetime.currentTime, datetimepicker.data('input'));
					}
					if (triggerAfterOpen) {
						datetimepicker.trigger('afterOpen.xdsoft');
						triggerAfterOpen = false;
					}
				})
				.on('click.xdsoft', function (xdevent) {
					xdevent.stopPropagation();
				});

			current_time_index = 0;

			/**
			 * Runs the callback for each of the specified node's ancestors.
			 *
			 * Return FALSE from the callback to stop ascending.
			 *
			 * @param {DOMNode} node
			 * @param {Function} callback
			 * @returns {undefined}
			 */
			forEachAncestorOf = function (node, callback) {
				do {
					node = node.parentNode;

					if (!node || callback(node) === false) {
						break;
					}
				} while (node.nodeName !== 'HTML');
			};

			/**
			 * Sets the position of the picker.
			 *
			 * @returns {undefined}
			 */
			setPos = function () {
				var dateInputOffset,
					dateInputElem,
					verticalPosition,
					left,
					position,
					datetimepickerElem,
					dateInputHasFixedAncestor,
					$dateInput,
					windowWidth,
					verticalAnchorEdge,
					datetimepickerCss,
					windowHeight,
					windowScrollTop;

				$dateInput = datetimepicker.data('input');
				dateInputOffset = $dateInput.offset();
				dateInputElem = $dateInput[0];

				verticalAnchorEdge = 'top';
				verticalPosition = (dateInputOffset.top + dateInputElem.offsetHeight) - 1;
				left = dateInputOffset.left;
				position = "absolute";

				windowWidth = $(options.contentWindow).width();
				windowHeight = $(options.contentWindow).height();
				windowScrollTop = $(options.contentWindow).scrollTop();

				if ((options.ownerDocument.documentElement.clientWidth - dateInputOffset.left) < datepicker.parent().outerWidth(true)) {
					var diff = datepicker.parent().outerWidth(true) - dateInputElem.offsetWidth;
					left = left - diff;
				}

				if ($dateInput.parent().css('direction') === 'rtl') {
					left -= (datetimepicker.outerWidth() - $dateInput.outerWidth());
				}

				if (options.fixed) {
					verticalPosition -= windowScrollTop;
					left -= $(options.contentWindow).scrollLeft();
					position = "fixed";
				} else {
					dateInputHasFixedAncestor = false;

					forEachAncestorOf(dateInputElem, function (ancestorNode) {
						if (ancestorNode === null) {
							return false;
						}

						if (options.contentWindow.getComputedStyle(ancestorNode).getPropertyValue('position') === 'fixed') {
							dateInputHasFixedAncestor = true;
							return false;
						}
					});

					if (dateInputHasFixedAncestor && !options.insideParent) {
						position = 'fixed';

						//If the picker won't fit entirely within the viewport then display it above the date input.
						if (verticalPosition + datetimepicker.outerHeight() > windowHeight + windowScrollTop) {
							verticalAnchorEdge = 'bottom';
							verticalPosition = (windowHeight + windowScrollTop) - dateInputOffset.top;
						} else {
							verticalPosition -= windowScrollTop;
						}
					} else {
						if (verticalPosition + datetimepicker[0].offsetHeight > windowHeight + windowScrollTop) {
							verticalPosition = dateInputOffset.top - datetimepicker[0].offsetHeight + 1;
						}
					}

					if (verticalPosition < 0) {
						verticalPosition = 0;
					}

					if (left + dateInputElem.offsetWidth > windowWidth) {
						left = windowWidth - dateInputElem.offsetWidth;
					}
				}

				datetimepickerElem = datetimepicker[0];

				forEachAncestorOf(datetimepickerElem, function (ancestorNode) {
					var ancestorNodePosition;

					ancestorNodePosition = options.contentWindow.getComputedStyle(ancestorNode).getPropertyValue('position');

					if (ancestorNodePosition === 'relative' && windowWidth >= ancestorNode.offsetWidth) {
						left = left - ((windowWidth - ancestorNode.offsetWidth) / 2);
						return false;
					}
				});

				datetimepickerCss = {
					position: position,
					left: options.insideParent ? dateInputElem.offsetLeft : left,
					top: '',  //Initialize to prevent previous values interfering with new ones.
					bottom: ''  //Initialize to prevent previous values interfering with new ones.
				};

				if (options.insideParent) {
                    datetimepickerCss[verticalAnchorEdge] = dateInputElem.offsetTop + dateInputElem.offsetHeight;
                } else {
                    datetimepickerCss[verticalAnchorEdge] = verticalPosition;
                }

				datetimepicker.css(datetimepickerCss);
			};

			datetimepicker
				.on('open.xdsoft', function (event) {
					var onShow = true;
					if (options.onShow && $.isFunction(options.onShow)) {
						onShow = options.onShow.call(datetimepicker, _xdsoft_datetime.currentTime, datetimepicker.data('input'), event);
					}
					if (onShow !== false) {
						datetimepicker.show();
						setPos();
						$(options.contentWindow)
							.off('resize.xdsoft', setPos)
							.on('resize.xdsoft', setPos);

						if (options.closeOnWithoutClick) {
							$([options.ownerDocument.body, options.contentWindow]).on('touchstart mousedown.xdsoft', function arguments_callee6() {
								datetimepicker.trigger('close.xdsoft');
								$([options.ownerDocument.body, options.contentWindow]).off('touchstart mousedown.xdsoft', arguments_callee6);
							});
						}
					}
				})
				.on('close.xdsoft', function (event) {
					var onClose = true;
					month_picker
						.find('.xdsoft_month,.xdsoft_year')
						.find('.xdsoft_select')
						.hide();
					if (options.onClose && $.isFunction(options.onClose)) {
						onClose = options.onClose.call(datetimepicker, _xdsoft_datetime.currentTime, datetimepicker.data('input'), event);
					}
					if (onClose !== false && !options.opened && !options.inline) {
						datetimepicker.hide();
					}
					event.stopPropagation();
				})
				.on('toggle.xdsoft', function () {
					if (datetimepicker.is(':visible')) {
						datetimepicker.trigger('close.xdsoft');
					} else {
						datetimepicker.trigger('open.xdsoft');
					}
				})
				.data('input', input);

			timer = 0;

			datetimepicker.data('xdsoft_datetime', _xdsoft_datetime);
			datetimepicker.setOptions(options);

			function getCurrentValue() {
				var ct = false, time;

				if (options.startDate) {
					ct = _xdsoft_datetime.strToDate(options.startDate);
				} else {
					ct = options.value || ((input && input.val && input.val()) ? input.val() : '');
					if (ct) {
						ct = _xdsoft_datetime.strToDateTime(ct);
						if (options.yearOffset) {
							ct = new Date(ct.getFullYear() - options.yearOffset, ct.getMonth(), ct.getDate(), ct.getHours(), ct.getMinutes(), ct.getSeconds(), ct.getMilliseconds());
						}
					} else if (options.defaultDate) {
						ct = _xdsoft_datetime.strToDateTime(options.defaultDate);
						if (options.defaultTime) {
							time = _xdsoft_datetime.strtotime(options.defaultTime);
							ct.setHours(time.getHours());
							ct.setMinutes(time.getMinutes());
						}
					}
				}

				if (ct && _xdsoft_datetime.isValidDate(ct)) {
					datetimepicker.data('changed', true);
				} else {
					ct = '';
				}

				return ct || 0;
			}

			function setMask(options) {

				var isValidValue = function (mask, value) {
						var reg = mask
							.replace(/([\[\]\/\{\}\(\)\-\.\+]{1})/g, '\\$1')
							.replace(/_/g, '{digit+}')
							.replace(/([0-9]{1})/g, '{digit$1}')
							.replace(/\{digit([0-9]{1})\}/g, '[0-$1_]{1}')
							.replace(/\{digit[\+]\}/g, '[0-9_]{1}');
						return (new RegExp(reg)).test(value);
					},
					getCaretPos = function (input) {
						try {
							if (options.ownerDocument.selection && options.ownerDocument.selection.createRange) {
								var range = options.ownerDocument.selection.createRange();
								return range.getBookmark().charCodeAt(2) - 2;
							}
							if (input.setSelectionRange) {
								return input.selectionStart;
							}
						} catch (e) {
							return 0;
						}
					},
					setCaretPos = function (node, pos) {
						node = (typeof node === "string" || node instanceof String) ? options.ownerDocument.getElementById(node) : node;
						if (!node) {
							return false;
						}
						if (node.createTextRange) {
							var textRange = node.createTextRange();
							textRange.collapse(true);
							textRange.moveEnd('character', pos);
							textRange.moveStart('character', pos);
							textRange.select();
							return true;
						}
						if (node.setSelectionRange) {
							node.setSelectionRange(pos, pos);
							return true;
						}
						return false;
					};

				if(options.mask) {
					input.off('keydown.xdsoft');
				}

				if (options.mask === true) {
					if (dateHelper.formatMask) {
						options.mask = dateHelper.formatMask(options.format)
					} else {
						options.mask = options.format
							.replace(/Y/g, '9999')
							.replace(/F/g, '9999')
							.replace(/m/g, '19')
							.replace(/d/g, '39')
							.replace(/H/g, '29')
							.replace(/i/g, '59')
							.replace(/s/g, '59');
					}
				}

				if ($.type(options.mask) === 'string') {
					if (!isValidValue(options.mask, input.val())) {
						input.val(options.mask.replace(/[0-9]/g, '_'));
						setCaretPos(input[0], 0);
					}

					input.on('paste.xdsoft', function (event) {
					    // couple options here
					    // 1. return false - tell them they can't paste
					    // 2. insert over current characters - minimal validation
					    // 3. full fledged parsing and validation
					    // let's go option 2 for now

					    // fires multiple times for some reason

					    // https://stackoverflow.com/a/30496488/1366033
					    var clipboardData = event.clipboardData || event.originalEvent.clipboardData || window.clipboardData,
						pastedData = clipboardData.getData('text'),
						val = this.value,
						pos = this.selectionStart

					    var valueBeforeCursor = val.substr(0, pos);
					    var valueAfterPaste = val.substr(pos + pastedData.length);

					    val = valueBeforeCursor + pastedData + valueAfterPaste;           
					    pos += pastedData.length;

					    if (isValidValue(options.mask, val)) {
						this.value = val;
						setCaretPos(this, pos);
					    } else if ($.trim(val) === '') {
						this.value = options.mask.replace(/[0-9]/g, '_');
					    } else {
						input.trigger('error_input.xdsoft');
					    }

					    event.preventDefault();
					    return false;
					  });

					  input.on('keydown.xdsoft', function (event) {
					    var val = this.value,
						key = event.which,
						pos = this.selectionStart,
						selEnd = this.selectionEnd,
						hasSel = pos !== selEnd,
						digit;

					    // only alow these characters
					    if (((key >=  KEY0 && key <=  KEY9)  ||
						 (key >= _KEY0 && key <= _KEY9)) || 
						 (key === BACKSPACE || key === DEL)) {

					      // get char to insert which is new character or placeholder ('_')
					      digit = (key === BACKSPACE || key === DEL) ? '_' :
							  String.fromCharCode((_KEY0 <= key && key <= _KEY9) ? key - KEY0 : key);

						// we're deleting something, we're not at the start, and have normal cursor, move back one
						// if we have a selection length, cursor actually sits behind deletable char, not in front
						if (key === BACKSPACE && pos && !hasSel) {
						    pos -= 1;
						}

						// don't stop on a separator, continue whatever direction you were going
						//   value char - keep incrementing position while on separator char and we still have room
						//   del char   - keep decrementing position while on separator char and we still have room
						while (true) {
						  var maskValueAtCurPos = options.mask.substr(pos, 1);
						  var posShorterThanMaskLength = pos < options.mask.length;
						  var posGreaterThanZero = pos > 0;
						  var notNumberOrPlaceholder = /[^0-9_]/;
						  var curPosOnSep = notNumberOrPlaceholder.test(maskValueAtCurPos);
						  var continueMovingPosition = curPosOnSep && posShorterThanMaskLength && posGreaterThanZero

						  // if we hit a real char, stay where we are
						  if (!continueMovingPosition) break;

						  // hitting backspace in a selection, you can possibly go back any further - go forward
						  pos += (key === BACKSPACE && !hasSel) ? -1 : 1;

                        }
                        
                        if (event.metaKey) {    // cmd has been pressed
                            pos = 0;
                            hasSel = true;
                        }

						if (hasSel) {
						  // pos might have moved so re-calc length
						  var selLength = selEnd - pos

						  // if we have a selection length we will wipe out entire selection and replace with default template for that range
						  var defaultBlank = options.mask.replace(/[0-9]/g, '_');
						  var defaultBlankSelectionReplacement = defaultBlank.substr(pos, selLength); 
						  var selReplacementRemainder = defaultBlankSelectionReplacement.substr(1) // might be empty

						  var valueBeforeSel = val.substr(0, pos);
						  var insertChars = digit + selReplacementRemainder;
						  var charsAfterSelection = val.substr(pos + selLength);

						  val = valueBeforeSel + insertChars + charsAfterSelection

						} else {
						  var valueBeforeCursor = val.substr(0, pos);
						  var insertChar = digit;
						  var valueAfterNextChar = val.substr(pos + 1);

						  val = valueBeforeCursor + insertChar + valueAfterNextChar
						}

						if ($.trim(val) === '') {
						  // if empty, set to default
						    val = defaultBlank
						} else {
						  // if at the last character don't need to do anything
						    if (pos === options.mask.length) {
							event.preventDefault();
							return false;
						    }
						}

						// resume cursor location
						pos += (key === BACKSPACE) ? 0 : 1;
						// don't stop on a separator, continue whatever direction you were going
						while (/[^0-9_]/.test(options.mask.substr(pos, 1)) && pos < options.mask.length && pos > 0) {
						    pos += (key === BACKSPACE) ? 0 : 1;
						}

						if (isValidValue(options.mask, val)) {
						    this.value = val;
						    setCaretPos(this, pos);
						} else if ($.trim(val) === '') {
						    this.value = options.mask.replace(/[0-9]/g, '_');
						} else {
						    input.trigger('error_input.xdsoft');
						}
					    } else {
						if (([AKEY, CKEY, VKEY, ZKEY, YKEY].indexOf(key) !== -1 && ctrlDown) || [ESC, ARROWUP, ARROWDOWN, ARROWLEFT, ARROWRIGHT, F5, CTRLKEY, TAB, ENTER].indexOf(key) !== -1) {
						    return true;
						}
					    }

					    event.preventDefault();
					    return false;
					  });
				}
			}

			_xdsoft_datetime.setCurrentTime(getCurrentValue());

			input
				.data('xdsoft_datetimepicker', datetimepicker)
				.on('open.xdsoft focusin.xdsoft mousedown.xdsoft touchstart', function () {
					if (input.is(':disabled') || (input.data('xdsoft_datetimepicker').is(':visible') && options.closeOnInputClick)) {
						return;
					}
					if (!options.openOnFocus) {
						return;
					}
					clearTimeout(timer);
					timer = setTimeout(function () {
						if (input.is(':disabled')) {
							return;
						}

						triggerAfterOpen = true;
						_xdsoft_datetime.setCurrentTime(getCurrentValue(), true);
						if(options.mask) {
							setMask(options);
						}
						datetimepicker.trigger('open.xdsoft');
					}, 100);
				})
				.on('keydown.xdsoft', function (event) {
					var elementSelector,
						key = event.which;
					if ([ENTER].indexOf(key) !== -1 && options.enterLikeTab) {
						elementSelector = $("input:visible,textarea:visible,button:visible,a:visible");
						datetimepicker.trigger('close.xdsoft');
						elementSelector.eq(elementSelector.index(this) + 1).focus();
						return false;
					}
					if ([TAB].indexOf(key) !== -1) {
						datetimepicker.trigger('close.xdsoft');
						return true;
					}
				})
				.on('blur.xdsoft', function () {
					datetimepicker.trigger('close.xdsoft');
				});
		};
		destroyDateTimePicker = function (input) {
			var datetimepicker = input.data('xdsoft_datetimepicker');
			if (datetimepicker) {
				datetimepicker.data('xdsoft_datetime', null);
				datetimepicker.remove();
				input
					.data('xdsoft_datetimepicker', null)
					.off('.xdsoft');
				$(options.contentWindow).off('resize.xdsoft');
				$([options.contentWindow, options.ownerDocument.body]).off('mousedown.xdsoft touchstart');
				if (input.unmousewheel) {
					input.unmousewheel();
				}
			}
		};
		$(options.ownerDocument)
            .off('keydown.xdsoftctrl keyup.xdsoftctrl')
            .off('keydown.xdsoftcmd keyup.xdsoftcmd')
			.on('keydown.xdsoftctrl', function (e) {
				if (e.keyCode === CTRLKEY) {
					ctrlDown = true;
                }
			})
			.on('keyup.xdsoftctrl', function (e) {
				if (e.keyCode === CTRLKEY) {
					ctrlDown = false;
                }
            })
            .on('keydown.xdsoftcmd', function (e) {
                if (e.keyCode === CMDKEY) {
                    cmdDown = true;
                }
			})
			.on('keyup.xdsoftcmd', function (e) {
                if (e.keyCode === CMDKEY) {
                    cmdDown = false;
                }
			});

		this.each(function () {
			var datetimepicker = $(this).data('xdsoft_datetimepicker'), $input;
			if (datetimepicker) {
				if ($.type(opt) === 'string') {
					switch (opt) {
						case 'show':
							$(this).select().focus();
							datetimepicker.trigger('open.xdsoft');
							break;
						case 'hide':
							datetimepicker.trigger('close.xdsoft');
							break;
						case 'toggle':
							datetimepicker.trigger('toggle.xdsoft');
							break;
						case 'destroy':
							destroyDateTimePicker($(this));
							break;
						case 'reset':
							this.value = this.defaultValue;
							if (!this.value || !datetimepicker.data('xdsoft_datetime').isValidDate(dateHelper.parseDate(this.value, options.format))) {
								datetimepicker.data('changed', false);
							}
							datetimepicker.data('xdsoft_datetime').setCurrentTime(this.value);
							break;
						case 'validate':
							$input = datetimepicker.data('input');
							$input.trigger('blur.xdsoft');
							break;
						default:
							if (datetimepicker[opt] && $.isFunction(datetimepicker[opt])) {
								result = datetimepicker[opt](opt2);
							}
					}
				} else {
					datetimepicker
						.setOptions(opt);
				}
				return 0;
			}
			if ($.type(opt) !== 'string') {
				if (!options.lazyInit || options.open || options.inline) {
					createDateTimePicker($(this));
				} else {
					lazyInit($(this));
				}
			}
		});

		return result;
	};

	$.fn.datetimepicker.defaults = default_options;

	function HighlightedDate(date, desc, style) {
		"use strict";
		this.date = date;
		this.desc = desc;
		this.style = style;
	}
};
;(function (factory) {
	if ( true ) {
		// AMD. Register as an anonymous module.
		!(__WEBPACK_AMD_DEFINE_ARRAY__ = [__webpack_require__(/*! jquery */ "./node_modules/jquery/dist/jquery.js"), __webpack_require__(/*! jquery-mousewheel */ "./node_modules/jquery-mousewheel/jquery.mousewheel.js")], __WEBPACK_AMD_DEFINE_FACTORY__ = (factory),
				__WEBPACK_AMD_DEFINE_RESULT__ = (typeof __WEBPACK_AMD_DEFINE_FACTORY__ === 'function' ?
				(__WEBPACK_AMD_DEFINE_FACTORY__.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__)) : __WEBPACK_AMD_DEFINE_FACTORY__),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
	} else {}
}(datetimepickerFactory));


/*!
 * jQuery Mousewheel 3.1.13
 *
 * Copyright jQuery Foundation and other contributors
 * Released under the MIT license
 * http://jquery.org/license
 */

(function (factory) {
    if ( true ) {
        // AMD. Register as an anonymous module.
        !(__WEBPACK_AMD_DEFINE_ARRAY__ = [__webpack_require__(/*! jquery */ "./node_modules/jquery/dist/jquery.js")], __WEBPACK_AMD_DEFINE_FACTORY__ = (factory),
				__WEBPACK_AMD_DEFINE_RESULT__ = (typeof __WEBPACK_AMD_DEFINE_FACTORY__ === 'function' ?
				(__WEBPACK_AMD_DEFINE_FACTORY__.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__)) : __WEBPACK_AMD_DEFINE_FACTORY__),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
    } else {}
}(function ($) {

    var toFix  = ['wheel', 'mousewheel', 'DOMMouseScroll', 'MozMousePixelScroll'],
        toBind = ( 'onwheel' in document || document.documentMode >= 9 ) ?
                    ['wheel'] : ['mousewheel', 'DomMouseScroll', 'MozMousePixelScroll'],
        slice  = Array.prototype.slice,
        nullLowestDeltaTimeout, lowestDelta;

    if ( $.event.fixHooks ) {
        for ( var i = toFix.length; i; ) {
            $.event.fixHooks[ toFix[--i] ] = $.event.mouseHooks;
        }
    }

    var special = $.event.special.mousewheel = {
        version: '3.1.12',

        setup: function() {
            if ( this.addEventListener ) {
                for ( var i = toBind.length; i; ) {
                    this.addEventListener( toBind[--i], handler, false );
                }
            } else {
                this.onmousewheel = handler;
            }
            // Store the line height and page height for this particular element
            $.data(this, 'mousewheel-line-height', special.getLineHeight(this));
            $.data(this, 'mousewheel-page-height', special.getPageHeight(this));
        },

        teardown: function() {
            if ( this.removeEventListener ) {
                for ( var i = toBind.length; i; ) {
                    this.removeEventListener( toBind[--i], handler, false );
                }
            } else {
                this.onmousewheel = null;
            }
            // Clean up the data we added to the element
            $.removeData(this, 'mousewheel-line-height');
            $.removeData(this, 'mousewheel-page-height');
        },

        getLineHeight: function(elem) {
            var $elem = $(elem),
                $parent = $elem['offsetParent' in $.fn ? 'offsetParent' : 'parent']();
            if (!$parent.length) {
                $parent = $('body');
            }
            return parseInt($parent.css('fontSize'), 10) || parseInt($elem.css('fontSize'), 10) || 16;
        },

        getPageHeight: function(elem) {
            return $(elem).height();
        },

        settings: {
            adjustOldDeltas: true, // see shouldAdjustOldDeltas() below
            normalizeOffset: true  // calls getBoundingClientRect for each event
        }
    };

    $.fn.extend({
        mousewheel: function(fn) {
            return fn ? this.bind('mousewheel', fn) : this.trigger('mousewheel');
        },

        unmousewheel: function(fn) {
            return this.unbind('mousewheel', fn);
        }
    });


    function handler(event) {
        var orgEvent   = event || window.event,
            args       = slice.call(arguments, 1),
            delta      = 0,
            deltaX     = 0,
            deltaY     = 0,
            absDelta   = 0,
            offsetX    = 0,
            offsetY    = 0;
        event = $.event.fix(orgEvent);
        event.type = 'mousewheel';

        // Old school scrollwheel delta
        if ( 'detail'      in orgEvent ) { deltaY = orgEvent.detail * -1;      }
        if ( 'wheelDelta'  in orgEvent ) { deltaY = orgEvent.wheelDelta;       }
        if ( 'wheelDeltaY' in orgEvent ) { deltaY = orgEvent.wheelDeltaY;      }
        if ( 'wheelDeltaX' in orgEvent ) { deltaX = orgEvent.wheelDeltaX * -1; }

        // Firefox < 17 horizontal scrolling related to DOMMouseScroll event
        if ( 'axis' in orgEvent && orgEvent.axis === orgEvent.HORIZONTAL_AXIS ) {
            deltaX = deltaY * -1;
            deltaY = 0;
        }

        // Set delta to be deltaY or deltaX if deltaY is 0 for backwards compatabilitiy
        delta = deltaY === 0 ? deltaX : deltaY;

        // New school wheel delta (wheel event)
        if ( 'deltaY' in orgEvent ) {
            deltaY = orgEvent.deltaY * -1;
            delta  = deltaY;
        }
        if ( 'deltaX' in orgEvent ) {
            deltaX = orgEvent.deltaX;
            if ( deltaY === 0 ) { delta  = deltaX * -1; }
        }

        // No change actually happened, no reason to go any further
        if ( deltaY === 0 && deltaX === 0 ) { return; }

        // Need to convert lines and pages to pixels if we aren't already in pixels
        // There are three delta modes:
        //   * deltaMode 0 is by pixels, nothing to do
        //   * deltaMode 1 is by lines
        //   * deltaMode 2 is by pages
        if ( orgEvent.deltaMode === 1 ) {
            var lineHeight = $.data(this, 'mousewheel-line-height');
            delta  *= lineHeight;
            deltaY *= lineHeight;
            deltaX *= lineHeight;
        } else if ( orgEvent.deltaMode === 2 ) {
            var pageHeight = $.data(this, 'mousewheel-page-height');
            delta  *= pageHeight;
            deltaY *= pageHeight;
            deltaX *= pageHeight;
        }

        // Store lowest absolute delta to normalize the delta values
        absDelta = Math.max( Math.abs(deltaY), Math.abs(deltaX) );

        if ( !lowestDelta || absDelta < lowestDelta ) {
            lowestDelta = absDelta;

            // Adjust older deltas if necessary
            if ( shouldAdjustOldDeltas(orgEvent, absDelta) ) {
                lowestDelta /= 40;
            }
        }

        // Adjust older deltas if necessary
        if ( shouldAdjustOldDeltas(orgEvent, absDelta) ) {
            // Divide all the things by 40!
            delta  /= 40;
            deltaX /= 40;
            deltaY /= 40;
        }

        // Get a whole, normalized value for the deltas
        delta  = Math[ delta  >= 1 ? 'floor' : 'ceil' ](delta  / lowestDelta);
        deltaX = Math[ deltaX >= 1 ? 'floor' : 'ceil' ](deltaX / lowestDelta);
        deltaY = Math[ deltaY >= 1 ? 'floor' : 'ceil' ](deltaY / lowestDelta);

        // Normalise offsetX and offsetY properties
        if ( special.settings.normalizeOffset && this.getBoundingClientRect ) {
            var boundingRect = this.getBoundingClientRect();
            offsetX = event.clientX - boundingRect.left;
            offsetY = event.clientY - boundingRect.top;
        }

        // Add information to the event object
        event.deltaX = deltaX;
        event.deltaY = deltaY;
        event.deltaFactor = lowestDelta;
        event.offsetX = offsetX;
        event.offsetY = offsetY;
        // Go ahead and set deltaMode to 0 since we converted to pixels
        // Although this is a little odd since we overwrite the deltaX/Y
        // properties with normalized deltas.
        event.deltaMode = 0;

        // Add event and delta to the front of the arguments
        args.unshift(event, delta, deltaX, deltaY);

        // Clearout lowestDelta after sometime to better
        // handle multiple device types that give different
        // a different lowestDelta
        // Ex: trackpad = 3 and mouse wheel = 120
        if (nullLowestDeltaTimeout) { clearTimeout(nullLowestDeltaTimeout); }
        nullLowestDeltaTimeout = setTimeout(nullLowestDelta, 200);

        return ($.event.dispatch || $.event.handle).apply(this, args);
    }

    function nullLowestDelta() {
        lowestDelta = null;
    }

    function shouldAdjustOldDeltas(orgEvent, absDelta) {
        // If this is an older event and the delta is divisable by 120,
        // then we are assuming that the browser is treating this as an
        // older mouse wheel event and that we should divide the deltas
        // by 40 to try and get a more usable deltaFactor.
        // Side note, this actually impacts the reported scroll distance
        // in older browsers and can cause scrolling to be slower than native.
        // Turn this off by setting $.event.special.mousewheel.settings.adjustOldDeltas to false.
        return special.settings.adjustOldDeltas && orgEvent.type === 'mousewheel' && absDelta % 120 === 0;
    }

}));


/***/ }),

/***/ "./node_modules/jquery-mousewheel/jquery.mousewheel.js":
/*!*************************************************************!*\
  !*** ./node_modules/jquery-mousewheel/jquery.mousewheel.js ***!
  \*************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var __WEBPACK_AMD_DEFINE_FACTORY__, __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;/*!
 * jQuery Mousewheel 3.1.13
 *
 * Copyright jQuery Foundation and other contributors
 * Released under the MIT license
 * http://jquery.org/license
 */

(function (factory) {
    if ( true ) {
        // AMD. Register as an anonymous module.
        !(__WEBPACK_AMD_DEFINE_ARRAY__ = [__webpack_require__(/*! jquery */ "./node_modules/jquery/dist/jquery.js")], __WEBPACK_AMD_DEFINE_FACTORY__ = (factory),
				__WEBPACK_AMD_DEFINE_RESULT__ = (typeof __WEBPACK_AMD_DEFINE_FACTORY__ === 'function' ?
				(__WEBPACK_AMD_DEFINE_FACTORY__.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__)) : __WEBPACK_AMD_DEFINE_FACTORY__),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
    } else {}
}(function ($) {

    var toFix  = ['wheel', 'mousewheel', 'DOMMouseScroll', 'MozMousePixelScroll'],
        toBind = ( 'onwheel' in document || document.documentMode >= 9 ) ?
                    ['wheel'] : ['mousewheel', 'DomMouseScroll', 'MozMousePixelScroll'],
        slice  = Array.prototype.slice,
        nullLowestDeltaTimeout, lowestDelta;

    if ( $.event.fixHooks ) {
        for ( var i = toFix.length; i; ) {
            $.event.fixHooks[ toFix[--i] ] = $.event.mouseHooks;
        }
    }

    var special = $.event.special.mousewheel = {
        version: '3.1.12',

        setup: function() {
            if ( this.addEventListener ) {
                for ( var i = toBind.length; i; ) {
                    this.addEventListener( toBind[--i], handler, false );
                }
            } else {
                this.onmousewheel = handler;
            }
            // Store the line height and page height for this particular element
            $.data(this, 'mousewheel-line-height', special.getLineHeight(this));
            $.data(this, 'mousewheel-page-height', special.getPageHeight(this));
        },

        teardown: function() {
            if ( this.removeEventListener ) {
                for ( var i = toBind.length; i; ) {
                    this.removeEventListener( toBind[--i], handler, false );
                }
            } else {
                this.onmousewheel = null;
            }
            // Clean up the data we added to the element
            $.removeData(this, 'mousewheel-line-height');
            $.removeData(this, 'mousewheel-page-height');
        },

        getLineHeight: function(elem) {
            var $elem = $(elem),
                $parent = $elem['offsetParent' in $.fn ? 'offsetParent' : 'parent']();
            if (!$parent.length) {
                $parent = $('body');
            }
            return parseInt($parent.css('fontSize'), 10) || parseInt($elem.css('fontSize'), 10) || 16;
        },

        getPageHeight: function(elem) {
            return $(elem).height();
        },

        settings: {
            adjustOldDeltas: true, // see shouldAdjustOldDeltas() below
            normalizeOffset: true  // calls getBoundingClientRect for each event
        }
    };

    $.fn.extend({
        mousewheel: function(fn) {
            return fn ? this.bind('mousewheel', fn) : this.trigger('mousewheel');
        },

        unmousewheel: function(fn) {
            return this.unbind('mousewheel', fn);
        }
    });


    function handler(event) {
        var orgEvent   = event || window.event,
            args       = slice.call(arguments, 1),
            delta      = 0,
            deltaX     = 0,
            deltaY     = 0,
            absDelta   = 0,
            offsetX    = 0,
            offsetY    = 0;
        event = $.event.fix(orgEvent);
        event.type = 'mousewheel';

        // Old school scrollwheel delta
        if ( 'detail'      in orgEvent ) { deltaY = orgEvent.detail * -1;      }
        if ( 'wheelDelta'  in orgEvent ) { deltaY = orgEvent.wheelDelta;       }
        if ( 'wheelDeltaY' in orgEvent ) { deltaY = orgEvent.wheelDeltaY;      }
        if ( 'wheelDeltaX' in orgEvent ) { deltaX = orgEvent.wheelDeltaX * -1; }

        // Firefox < 17 horizontal scrolling related to DOMMouseScroll event
        if ( 'axis' in orgEvent && orgEvent.axis === orgEvent.HORIZONTAL_AXIS ) {
            deltaX = deltaY * -1;
            deltaY = 0;
        }

        // Set delta to be deltaY or deltaX if deltaY is 0 for backwards compatabilitiy
        delta = deltaY === 0 ? deltaX : deltaY;

        // New school wheel delta (wheel event)
        if ( 'deltaY' in orgEvent ) {
            deltaY = orgEvent.deltaY * -1;
            delta  = deltaY;
        }
        if ( 'deltaX' in orgEvent ) {
            deltaX = orgEvent.deltaX;
            if ( deltaY === 0 ) { delta  = deltaX * -1; }
        }

        // No change actually happened, no reason to go any further
        if ( deltaY === 0 && deltaX === 0 ) { return; }

        // Need to convert lines and pages to pixels if we aren't already in pixels
        // There are three delta modes:
        //   * deltaMode 0 is by pixels, nothing to do
        //   * deltaMode 1 is by lines
        //   * deltaMode 2 is by pages
        if ( orgEvent.deltaMode === 1 ) {
            var lineHeight = $.data(this, 'mousewheel-line-height');
            delta  *= lineHeight;
            deltaY *= lineHeight;
            deltaX *= lineHeight;
        } else if ( orgEvent.deltaMode === 2 ) {
            var pageHeight = $.data(this, 'mousewheel-page-height');
            delta  *= pageHeight;
            deltaY *= pageHeight;
            deltaX *= pageHeight;
        }

        // Store lowest absolute delta to normalize the delta values
        absDelta = Math.max( Math.abs(deltaY), Math.abs(deltaX) );

        if ( !lowestDelta || absDelta < lowestDelta ) {
            lowestDelta = absDelta;

            // Adjust older deltas if necessary
            if ( shouldAdjustOldDeltas(orgEvent, absDelta) ) {
                lowestDelta /= 40;
            }
        }

        // Adjust older deltas if necessary
        if ( shouldAdjustOldDeltas(orgEvent, absDelta) ) {
            // Divide all the things by 40!
            delta  /= 40;
            deltaX /= 40;
            deltaY /= 40;
        }

        // Get a whole, normalized value for the deltas
        delta  = Math[ delta  >= 1 ? 'floor' : 'ceil' ](delta  / lowestDelta);
        deltaX = Math[ deltaX >= 1 ? 'floor' : 'ceil' ](deltaX / lowestDelta);
        deltaY = Math[ deltaY >= 1 ? 'floor' : 'ceil' ](deltaY / lowestDelta);

        // Normalise offsetX and offsetY properties
        if ( special.settings.normalizeOffset && this.getBoundingClientRect ) {
            var boundingRect = this.getBoundingClientRect();
            offsetX = event.clientX - boundingRect.left;
            offsetY = event.clientY - boundingRect.top;
        }

        // Add information to the event object
        event.deltaX = deltaX;
        event.deltaY = deltaY;
        event.deltaFactor = lowestDelta;
        event.offsetX = offsetX;
        event.offsetY = offsetY;
        // Go ahead and set deltaMode to 0 since we converted to pixels
        // Although this is a little odd since we overwrite the deltaX/Y
        // properties with normalized deltas.
        event.deltaMode = 0;

        // Add event and delta to the front of the arguments
        args.unshift(event, delta, deltaX, deltaY);

        // Clearout lowestDelta after sometime to better
        // handle multiple device types that give different
        // a different lowestDelta
        // Ex: trackpad = 3 and mouse wheel = 120
        if (nullLowestDeltaTimeout) { clearTimeout(nullLowestDeltaTimeout); }
        nullLowestDeltaTimeout = setTimeout(nullLowestDelta, 200);

        return ($.event.dispatch || $.event.handle).apply(this, args);
    }

    function nullLowestDelta() {
        lowestDelta = null;
    }

    function shouldAdjustOldDeltas(orgEvent, absDelta) {
        // If this is an older event and the delta is divisable by 120,
        // then we are assuming that the browser is treating this as an
        // older mouse wheel event and that we should divide the deltas
        // by 40 to try and get a more usable deltaFactor.
        // Side note, this actually impacts the reported scroll distance
        // in older browsers and can cause scrolling to be slower than native.
        // Turn this off by setting $.event.special.mousewheel.settings.adjustOldDeltas to false.
        return special.settings.adjustOldDeltas && orgEvent.type === 'mousewheel' && absDelta % 120 === 0;
    }

}));


/***/ }),

/***/ "./src/Pyz/Yves/ShopUi/Theme/default/components/molecules/date-time-picker/date-time-picker.ts":
/*!*****************************************************************************************************!*\
  !*** ./src/Pyz/Yves/ShopUi/Theme/default/components/molecules/date-time-picker/date-time-picker.ts ***!
  \*****************************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return DateTimePicker; });
/* harmony import */ var ShopUi_models_component__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ShopUi/models/component */ "./vendor/spryker-shop/shop-ui/src/SprykerShop/Yves/ShopUi/Theme/default/models/component.ts");
/* harmony import */ var jquery_dist_jquery__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! jquery/dist/jquery */ "./node_modules/jquery/dist/jquery.js");
/* harmony import */ var jquery_dist_jquery__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(jquery_dist_jquery__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var jquery_datetimepicker_build_jquery_datetimepicker_full__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! jquery-datetimepicker/build/jquery.datetimepicker.full */ "./node_modules/jquery-datetimepicker/build/jquery.datetimepicker.full.js");
/* harmony import */ var jquery_datetimepicker_build_jquery_datetimepicker_full__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(jquery_datetimepicker_build_jquery_datetimepicker_full__WEBPACK_IMPORTED_MODULE_2__);
function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }




class DateTimePicker extends ShopUi_models_component__WEBPACK_IMPORTED_MODULE_0__["default"] {
  constructor() {
    super(...arguments);

    _defineProperty(this, "trigger", void 0);
  }

  readyCallback() {}

  init() {
    this.trigger = this.querySelector('input');
    this.mapEvents();
  }

  mapEvents() {
    this.datetimepickerInit();
    this.setLanguage(this.language);
  }

  datetimepickerInit() {
    jquery_dist_jquery__WEBPACK_IMPORTED_MODULE_1___default()(this.trigger).datetimepicker(this.config);
  }

  setLanguage(language) {
    jquery_dist_jquery__WEBPACK_IMPORTED_MODULE_1___default.a.datetimepicker.setLocale(language);
  }

  get parent() {
    return this.getAttribute('parent-id');
  }

  get language() {
    return this.getAttribute('language');
  }

  get config() {
    var config = JSON.parse(this.getAttribute('config'));
    config.parentID = this.parent;
    return config;
  }

}

/***/ })

}]);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvanF1ZXJ5LWRhdGV0aW1lcGlja2VyL2J1aWxkL2pxdWVyeS5kYXRldGltZXBpY2tlci5mdWxsLmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9qcXVlcnktbW91c2V3aGVlbC9qcXVlcnkubW91c2V3aGVlbC5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvUHl6L1l2ZXMvU2hvcFVpL1RoZW1lL2RlZmF1bHQvY29tcG9uZW50cy9tb2xlY3VsZXMvZGF0ZS10aW1lLXBpY2tlci9kYXRlLXRpbWUtcGlja2VyLnRzIl0sIm5hbWVzIjpbIkRhdGVUaW1lUGlja2VyIiwiQ29tcG9uZW50IiwicmVhZHlDYWxsYmFjayIsImluaXQiLCJ0cmlnZ2VyIiwicXVlcnlTZWxlY3RvciIsIm1hcEV2ZW50cyIsImRhdGV0aW1lcGlja2VySW5pdCIsInNldExhbmd1YWdlIiwibGFuZ3VhZ2UiLCIkIiwiZGF0ZXRpbWVwaWNrZXIiLCJjb25maWciLCJzZXRMb2NhbGUiLCJwYXJlbnQiLCJnZXRBdHRyaWJ1dGUiLCJKU09OIiwicGFyc2UiLCJwYXJlbnRJRCJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7O0FBQUE7QUFDQSw4QkFBOEI7QUFDOUI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxxQkFBcUIsWUFBWSxhQUFhLGtCQUFrQiwrQkFBK0IsZ0ZBQWdGLG1CQUFtQiw0QkFBNEIsNkJBQTZCLGVBQWUsUUFBUSxXQUFXLEtBQUssbUJBQW1CLHlHQUF5RyxTQUFTLGlCQUFpQixZQUFZLFdBQVcscURBQXFELFNBQVMsSUFBSSxjQUFjLDBYQUEwWCxjQUFjLHNCQUFzQixpREFBaUQsc1BBQXNQLEVBQUUsNkJBQTZCLDJCQUEyQixvQkFBb0IsOElBQThJLDBCQUEwQiwrQ0FBK0MsYUFBYSxxRkFBcUYseUJBQXlCLDZEQUE2RCw0REFBNEQsa0JBQWtCLDhCQUE4QixvREFBb0QsaUJBQWlCLGdDQUFnQyxtQkFBbUIsb0JBQW9CLCtGQUErRix1REFBdUQsV0FBVyxzQ0FBc0Msa0NBQWtDLDREQUE0RCxNQUFNLDZDQUE2QyxzQ0FBc0MsVUFBVSxLQUFLLDhCQUE4QixVQUFVLEtBQUssTUFBTSw4Q0FBOEMsYUFBYSxNQUFNLDZNQUE2TSxLQUFLLDhCQUE4QixTQUFTLEtBQUssTUFBTSw4Q0FBOEMsY0FBYyxNQUFNLHNDQUFzQyxhQUFhLE1BQU0sc0NBQXNDLGFBQWEsK0ZBQStGLEtBQUssc0JBQXNCLDRDQUE0QyxjQUFjLHlCQUF5QiwrQkFBK0IsMEhBQTBILDBCQUEwQixRQUFRLFdBQVcsS0FBSyw2REFBNkQsVUFBVSwyREFBMkQsTUFBTSwyREFBMkQsTUFBTSwySEFBMkgsaUJBQWlCLE1BQU0scUJBQXFCLE1BQU0sdUJBQXVCLE1BQU0sdUJBQXVCLDRDQUE0QyxTQUFTLDJCQUEyQiw0REFBNEQsc0JBQXNCLFVBQVUsYUFBYSxrQkFBa0IsY0FBYywwQkFBMEIsY0FBYyxtQkFBbUIsY0FBYyxxQkFBcUIsY0FBYyxnQkFBZ0IsY0FBYyxrQkFBa0IsY0FBYywwREFBMEQsMkJBQTJCLGNBQWMsNEVBQTRFLG9DQUFvQyxjQUFjLDhCQUE4QixjQUFjLGtCQUFrQixjQUFjLG1DQUFtQyxjQUFjLHNCQUFzQixjQUFjLHlDQUF5QyxjQUFjLFlBQVkseUNBQXlDLGNBQWMsNEJBQTRCLHlDQUF5QyxjQUFjLHVCQUF1QixjQUFjLGtDQUFrQyxjQUFjLDJCQUEyQixjQUFjLG1CQUFtQixxQkFBcUIsY0FBYyxtRUFBbUUsMkNBQTJDLGNBQWMsb0JBQW9CLGNBQWMsb0JBQW9CLGNBQWMsa0JBQWtCLGNBQWMsa0JBQWtCLGNBQWMsMkJBQTJCLGNBQWMsMkJBQTJCLGNBQWMsb0NBQW9DLGNBQWMsb0NBQW9DLHVDQUF1QyxjQUFjLG9GQUFvRixxQkFBcUIsY0FBYywwQ0FBMEMsbURBQW1ELGNBQWMsWUFBWSx1Q0FBdUMsY0FBYyxvRUFBb0UsZ0JBQWdCLGNBQWMsaUNBQWlDLGNBQWMsb0NBQW9DLGNBQWMsc0NBQXNDLGNBQWMsMkJBQTJCLFFBQVEsMEJBQTBCLGlDQUFpQywyREFBMkQsc0JBQXNCLG1CQUFtQixJQUFJLDhMQUE4TCxTQUFTLFdBQVcsR0FBRztBQUN0c007QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQSxXQUFXLE9BQU87QUFDbEI7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQSxRQUFRO0FBQ1I7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxJQUFJO0FBQ0osUUFBUTtBQUNSO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsSUFBSTtBQUNKLFFBQVE7QUFDUjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLElBQUk7QUFDSixRQUFRO0FBQ1I7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxJQUFJO0FBQ0osUUFBUTtBQUNSO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsSUFBSTtBQUNKLFFBQVE7QUFDUjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLElBQUk7QUFDSixRQUFRO0FBQ1I7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxJQUFJO0FBQ0osUUFBUTtBQUNSO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsSUFBSTtBQUNKLFFBQVE7QUFDUjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLElBQUk7QUFDSixRQUFRO0FBQ1I7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxJQUFJO0FBQ0osUUFBUTtBQUNSO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsSUFBSTtBQUNKLFFBQVE7QUFDUjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLElBQUk7QUFDSixRQUFRO0FBQ1I7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxJQUFJO0FBQ0osUUFBUTtBQUNSO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsSUFBSTtBQUNKLFFBQVE7QUFDUjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLElBQUk7QUFDSixRQUFRO0FBQ1I7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxJQUFJO0FBQ0osUUFBUTtBQUNSO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsSUFBSTtBQUNKLFFBQVE7QUFDUjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLElBQUk7QUFDSixRQUFRO0FBQ1I7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsSUFBSTtBQUNKLFFBQVE7QUFDUjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxJQUFJO0FBQ0osUUFBUTtBQUNSO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxJQUFJO0FBQ0osUUFBUTtBQUNSO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsSUFBSTtBQUNKLFFBQVE7QUFDUjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLElBQUk7QUFDSixRQUFRO0FBQ1I7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxJQUFJO0FBQ0osUUFBUTtBQUNSO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsSUFBSTtBQUNKLFFBQVE7QUFDUjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLElBQUk7QUFDSixRQUFRO0FBQ1I7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxJQUFJO0FBQ0osUUFBUTtBQUNSO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsSUFBSTtBQUNKLFFBQVE7QUFDUjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxJQUFJO0FBQ0osUUFBUTtBQUNSO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsSUFBSTtBQUNKLFFBQVE7QUFDUjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLElBQUk7QUFDSixRQUFRO0FBQ1I7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxJQUFJO0FBQ0osUUFBUTtBQUNSO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsSUFBSTtBQUNKLGFBQWE7QUFDYjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLElBQUk7QUFDSixRQUFRO0FBQ1I7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxJQUFJO0FBQ0osUUFBUTtBQUNSO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsSUFBSTtBQUNKLFFBQVE7QUFDUjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLElBQUk7QUFDSixRQUFRO0FBQ1I7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxJQUFJO0FBQ0osUUFBUTtBQUNSO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsSUFBSTtBQUNKLFFBQVE7QUFDUjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLElBQUk7QUFDSixRQUFRO0FBQ1I7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxJQUFJO0FBQ0osUUFBUTtBQUNSO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsSUFBSTtBQUNKLFFBQVE7QUFDUjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLElBQUk7QUFDSixRQUFRO0FBQ1I7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxJQUFJO0FBQ0osYUFBYTtBQUNiO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsSUFBSTtBQUNKLFFBQVE7QUFDUjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLElBQUk7QUFDSixRQUFRO0FBQ1I7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxJQUFJO0FBQ0osYUFBYTtBQUNiO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsSUFBSTtBQUNKLFFBQVE7QUFDUjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLElBQUk7QUFDSixRQUFRO0FBQ1I7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxJQUFJO0FBQ0osYUFBYTtBQUNiO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsSUFBSTtBQUNKLFFBQVE7QUFDUjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLElBQUk7QUFDSixPQUFPO0FBQ1A7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsSUFBSTtBQUNKLFFBQVE7QUFDUjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLElBQUk7QUFDSixRQUFRO0FBQ1I7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxJQUFJO0FBQ0osUUFBUTtBQUNSO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLElBQUk7QUFDSixRQUFRO0FBQ1I7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsSUFBSTtBQUNKLFFBQVE7QUFDUjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsR0FBRzs7QUFFSDtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUEsOEJBQThCO0FBQzlCLDhCQUE4QjtBQUM5QiwrQkFBK0I7QUFDL0IsaUNBQWlDO0FBQ2pDLDhCQUE4QjtBQUM5QixrQ0FBa0M7QUFDbEMsd0JBQXdCO0FBQ3hCLHlCQUF5QjtBQUN6Qiw0QkFBNEI7O0FBRTVCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0Esa0RBQWtELDJCQUEyQjtBQUM3RTs7QUFFQTtBQUNBO0FBQ0EsNkJBQTZCO0FBQzdCLElBQUk7QUFDSjtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLElBQUk7QUFDSjtBQUNBO0FBQ0E7QUFDQTtBQUNBLE07QUFDQTtBQUNBO0FBQ0EsS0FBSzs7QUFFTDtBQUNBO0FBQ0E7QUFDQSxNO0FBQ0E7QUFDQSxLQUFLOztBQUVMO0FBQ0E7QUFDQSxrQkFBa0IsRUFBRTtBQUNwQixrQkFBa0IsRUFBRTtBQUNwQixrQkFBa0IsRUFBRTtBQUNwQixrQkFBa0IsRUFBRTtBQUNwQixrQkFBa0IsRUFBRTtBQUNwQixrQkFBa0IsRUFBRTtBQUNwQixrQkFBa0IsRUFBRTtBQUNwQixLQUFLO0FBQ0w7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEdBQUc7O0FBRUg7QUFDQTtBQUNBO0FBQ0E7QUFDQSw4QjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsR0FBRztBQUNIOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsTUFBTTtBQUNOO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLDBDQUEwQyxPQUFPO0FBQ2pELDBCQUEwQixVQUFVO0FBQ3BDO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGdCQUFnQixXQUFXO0FBQzNCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxNQUFNO0FBQ047QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsUUFBUTtBQUNSO0FBQ0EsT0FBTztBQUNQO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsTUFBTTtBQUNOO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxNQUFNO0FBQ047QUFDQTtBQUNBO0FBQ0EsTUFBTTs7QUFFTjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBLE9BQU87QUFDUCxNQUFNO0FBQ047QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLE9BQU87QUFDUDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLE1BQU07O0FBRU47QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxLQUFLOztBQUVMO0FBQ0E7QUFDQTtBQUNBLEtBQUs7O0FBRUw7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSzs7QUFFTDtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBLEdBQUc7QUFDSDs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLCtEQUErRCwyQ0FBMkM7O0FBRTFHO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLE9BQU87QUFDUCxNQUFNO0FBQ047O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQSwwREFBMEQsa0JBQWtCO0FBQzVFO0FBQ0E7QUFDQSxPQUFPO0FBQ1A7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7O0FBRUw7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSzs7QUFFTDtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQSwrQkFBK0I7O0FBRS9CO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsT0FBTztBQUNQO0FBQ0E7QUFDQSxNQUFNOztBQUVOO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxRQUFRO0FBQ1I7QUFDQTtBQUNBO0FBQ0EsTUFBTTs7QUFFTjtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBOztBQUVBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFFBQVE7QUFDUjtBQUNBLGdCQUFnQjtBQUNoQjtBQUNBLFNBQVM7QUFDVDtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsV0FBVztBQUNYLFVBQVU7QUFDVjtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQSxPQUFPO0FBQ1A7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSzs7QUFFTDtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLElBQUk7O0FBRUo7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQSxhQUFhO0FBQ2I7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUEsdUJBQXVCLEVBQUU7O0FBRXpCO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxNQUFNO0FBQ047QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUEsa0RBQWtEO0FBQ2xEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxJQUFJO0FBQ0o7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLElBQUk7QUFDSjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsT0FBTztBQUNQO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsTUFBTTs7QUFFTjtBQUNBO0FBQ0E7QUFDQTtBQUNBLE1BQU07QUFDTixLQUFLOztBQUVMO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsT0FBTztBQUNQO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsdUJBQXVCLDBCQUEwQjtBQUNqRDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxNQUFNO0FBQ047QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLE1BQU07QUFDTixLQUFLOztBQUVMO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQSxpQkFBaUIsT0FBTztBQUN4QjtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0EsUUFBUTtBQUNSO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQSx5QkFBeUIsaUNBQWlDO0FBQzFELG1CQUFtQixRQUFRO0FBQzNCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxPQUFPO0FBQ1Asa0JBQWtCLCtCQUErQjtBQUNqRDtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBOztBQUVBOztBQUVBLCtDQUErQyxvQ0FBb0M7QUFDbkY7QUFDQTtBQUNBO0FBQ0E7O0FBRUEsMERBQTBELHFDQUFxQztBQUMvRjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsTUFBTTtBQUNOO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxPQUFPO0FBQ1A7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxPQUFPO0FBQ1A7QUFDQTtBQUNBO0FBQ0EsS0FBSzs7QUFFTDtBQUNBO0FBQ0E7QUFDQSwrQkFBK0I7QUFDL0I7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLE1BQU07QUFDTixLQUFLOztBQUVMO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSzs7QUFFTDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLE1BQU07QUFDTjtBQUNBO0FBQ0E7QUFDQSxLQUFLOztBQUVMO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLOztBQUVMO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0EsS0FBSzs7QUFFTDs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsY0FBYyxRQUFRO0FBQ3RCLGNBQWMsU0FBUztBQUN2QixnQkFBZ0I7QUFDaEI7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMOztBQUVBO0FBQ0E7QUFDQTtBQUNBLGdCQUFnQjtBQUNoQjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQSxNQUFNOztBQUVOO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQSxPQUFPO0FBQ1A7QUFDQTtBQUNBLE1BQU07QUFDTjtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7O0FBRUw7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQSxpQkFBaUI7QUFDakI7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFFBQVE7QUFDUjtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBLE1BQU07QUFDTjtBQUNBO0FBQ0EsS0FBSztBQUNMOztBQUVBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLE1BQU07QUFDTjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTs7QUFFQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQSwyQkFBMkIsRUFBRSxZQUFZLEVBQUU7QUFDM0Msd0JBQXdCLE9BQU87QUFDL0Isd0JBQXdCLEVBQUUsT0FBTyxRQUFRO0FBQ3pDLG1CQUFtQixZQUFZLEVBQUUsR0FBRyxhQUFhLEVBQUU7QUFDbkQsbUJBQW1CLFdBQVcsWUFBWSxFQUFFO0FBQzVDO0FBQ0EsTUFBTTtBQUNOO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLE9BQU87QUFDUDtBQUNBO0FBQ0EsTUFBTTtBQUNOO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxNQUFNO0FBQ047QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBLGdFO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsVUFBVTtBQUNWO0FBQ0EsVUFBVTtBQUNWO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLFFBQVE7O0FBRVI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBOztBQUVBLDRDQUE0QztBQUM1QztBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQSxtRjtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQSxPQUFPO0FBQ1A7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsT0FBTztBQUNQO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsT0FBTztBQUNQO0FBQ0EsT0FBTztBQUNQO0FBQ0E7QUFDQSxVQUFVO0FBQ1Y7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLFFBQVE7QUFDUjtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsTUFBTTtBQUNOLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxJQUFJO0FBQ0o7QUFDQTtBQUNBO0FBQ0E7QUFDQSxhQUFhO0FBQ2I7QUFDQTtBQUNBO0FBQ0E7QUFDQSxJQUFJO0FBQ0o7QUFDQTtBQUNBO0FBQ0E7QUFDQSxJQUFJOztBQUVKO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0EsR0FBRzs7QUFFSDtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsQ0FBQztBQUNELE1BQU0sSUFBMEM7QUFDaEQ7QUFDQSxFQUFFLGlDQUFPLENBQUMseUVBQVEsRUFBRSxxR0FBbUIsQ0FBQyxvQ0FBRSxPQUFPO0FBQUE7QUFBQTtBQUFBLG9HQUFDO0FBQ2xELEVBQUUsTUFBTSxFQU1OO0FBQ0YsQ0FBQzs7O0FBR0Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQSxTQUFTLElBQTBDO0FBQ25EO0FBQ0EsUUFBUSxpQ0FBTyxDQUFDLHlFQUFRLENBQUMsb0NBQUUsT0FBTztBQUFBO0FBQUE7QUFBQSxvR0FBQztBQUNuQyxLQUFLLE1BQU0sRUFNTjtBQUNMLENBQUM7O0FBRUQ7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBLG1DQUFtQyxHQUFHO0FBQ3RDO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQSw0Q0FBNEMsR0FBRztBQUMvQztBQUNBO0FBQ0EsYUFBYTtBQUNiO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxTQUFTOztBQUVUO0FBQ0E7QUFDQSw0Q0FBNEMsR0FBRztBQUMvQztBQUNBO0FBQ0EsYUFBYTtBQUNiO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxTQUFTOztBQUVUO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUzs7QUFFVDtBQUNBO0FBQ0EsU0FBUzs7QUFFVDtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLFNBQVM7O0FBRVQ7QUFDQTtBQUNBO0FBQ0EsS0FBSzs7O0FBR0w7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBLDBDQUEwQywrQkFBK0I7QUFDekUsMENBQTBDLDhCQUE4QjtBQUN4RSwwQ0FBMEMsK0JBQStCO0FBQ3pFLDBDQUEwQyxvQ0FBb0M7O0FBRTlFO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGlDQUFpQyxzQkFBc0I7QUFDdkQ7O0FBRUE7QUFDQSw2Q0FBNkMsUUFBUTs7QUFFckQ7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLHFDQUFxQyxzQ0FBc0M7QUFDM0U7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUEsQ0FBQzs7Ozs7Ozs7Ozs7O0FDOTFGRDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBLFNBQVMsSUFBMEM7QUFDbkQ7QUFDQSxRQUFRLGlDQUFPLENBQUMseUVBQVEsQ0FBQyxvQ0FBRSxPQUFPO0FBQUE7QUFBQTtBQUFBLG9HQUFDO0FBQ25DLEtBQUssTUFBTSxFQU1OO0FBQ0wsQ0FBQzs7QUFFRDtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0EsbUNBQW1DLEdBQUc7QUFDdEM7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLDRDQUE0QyxHQUFHO0FBQy9DO0FBQ0E7QUFDQSxhQUFhO0FBQ2I7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFNBQVM7O0FBRVQ7QUFDQTtBQUNBLDRDQUE0QyxHQUFHO0FBQy9DO0FBQ0E7QUFDQSxhQUFhO0FBQ2I7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFNBQVM7O0FBRVQ7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxTQUFTOztBQUVUO0FBQ0E7QUFDQSxTQUFTOztBQUVUO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsU0FBUzs7QUFFVDtBQUNBO0FBQ0E7QUFDQSxLQUFLOzs7QUFHTDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0EsMENBQTBDLCtCQUErQjtBQUN6RSwwQ0FBMEMsOEJBQThCO0FBQ3hFLDBDQUEwQywrQkFBK0I7QUFDekUsMENBQTBDLG9DQUFvQzs7QUFFOUU7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsaUNBQWlDLHNCQUFzQjtBQUN2RDs7QUFFQTtBQUNBLDZDQUE2QyxRQUFROztBQUVyRDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EscUNBQXFDLHNDQUFzQztBQUMzRTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQSxDQUFDOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FDNU5EO0FBQ0E7QUFDQTtBQUVlLE1BQU1BLGNBQU4sU0FBNkJDLCtEQUE3QixDQUF1QztBQUFBO0FBQUE7O0FBQUE7QUFBQTs7QUFHeENDLGVBQVYsR0FBZ0MsQ0FBRTs7QUFFeEJDLE1BQVYsR0FBdUI7QUFDbkIsU0FBS0MsT0FBTCxHQUFpQyxLQUFLQyxhQUFMLENBQW1CLE9BQW5CLENBQWpDO0FBQ0EsU0FBS0MsU0FBTDtBQUNIOztBQUVTQSxXQUFWLEdBQTRCO0FBQ3hCLFNBQUtDLGtCQUFMO0FBQ0EsU0FBS0MsV0FBTCxDQUFpQixLQUFLQyxRQUF0QjtBQUNIOztBQUVTRixvQkFBVixHQUFxQztBQUNqQ0csNkRBQUMsQ0FBQyxLQUFLTixPQUFOLENBQUQsQ0FBZ0JPLGNBQWhCLENBQStCLEtBQUtDLE1BQXBDO0FBQ0g7O0FBRVNKLGFBQVYsQ0FBc0JDLFFBQXRCLEVBQThDO0FBQzFDQyw2REFBQyxDQUFDQyxjQUFGLENBQWlCRSxTQUFqQixDQUEyQkosUUFBM0I7QUFDSDs7QUFFRCxNQUFjSyxNQUFkLEdBQStCO0FBQzNCLFdBQU8sS0FBS0MsWUFBTCxDQUFrQixXQUFsQixDQUFQO0FBQ0g7O0FBRUQsTUFBY04sUUFBZCxHQUFpQztBQUM3QixXQUFPLEtBQUtNLFlBQUwsQ0FBa0IsVUFBbEIsQ0FBUDtBQUNIOztBQUVELE1BQWNILE1BQWQsR0FBK0I7QUFDM0IsUUFBTUEsTUFBTSxHQUFHSSxJQUFJLENBQUNDLEtBQUwsQ0FBVyxLQUFLRixZQUFMLENBQWtCLFFBQWxCLENBQVgsQ0FBZjtBQUNBSCxVQUFNLENBQUNNLFFBQVAsR0FBa0IsS0FBS0osTUFBdkI7QUFFQSxXQUFPRixNQUFQO0FBQ0g7O0FBcENpRCxDIiwiZmlsZSI6Ii4vanMveXZlc19kZWZhdWx0LjAuZXNtLmpzIiwic291cmNlc0NvbnRlbnQiOlsiLyohXG4gKiBAY29weXJpZ2h0IENvcHlyaWdodCAmY29weTsgS2FydGlrIFZpc3dlc3dhcmFuLCBLcmFqZWUuY29tLCAyMDE0IC0gMjAxNlxuICogQHZlcnNpb24gMS4zLjRcbiAqXG4gKiBEYXRlIGZvcm1hdHRlciB1dGlsaXR5IGxpYnJhcnkgdGhhdCBhbGxvd3MgZm9ybWF0dGluZyBkYXRlL3RpbWUgdmFyaWFibGVzIG9yIERhdGUgb2JqZWN0cyB1c2luZyBQSFAgRGF0ZVRpbWUgZm9ybWF0LlxuICogQHNlZSBodHRwOi8vcGhwLm5ldC9tYW51YWwvZW4vZnVuY3Rpb24uZGF0ZS5waHBcbiAqXG4gKiBGb3IgbW9yZSBKUXVlcnkgcGx1Z2lucyB2aXNpdCBodHRwOi8vcGx1Z2lucy5rcmFqZWUuY29tXG4gKiBGb3IgbW9yZSBZaWkgcmVsYXRlZCBkZW1vcyB2aXNpdCBodHRwOi8vZGVtb3Mua3JhamVlLmNvbVxuICovdmFyIERhdGVGb3JtYXR0ZXI7IWZ1bmN0aW9uKCl7XCJ1c2Ugc3RyaWN0XCI7dmFyIHQsZSxyLG4sYSx1LGk7dT04NjRlNSxpPTM2MDAsdD1mdW5jdGlvbih0LGUpe3JldHVyblwic3RyaW5nXCI9PXR5cGVvZiB0JiZcInN0cmluZ1wiPT10eXBlb2YgZSYmdC50b0xvd2VyQ2FzZSgpPT09ZS50b0xvd2VyQ2FzZSgpfSxlPWZ1bmN0aW9uKHQscixuKXt2YXIgYT1ufHxcIjBcIix1PXQudG9TdHJpbmcoKTtyZXR1cm4gdS5sZW5ndGg8cj9lKGErdSxyKTp1fSxyPWZ1bmN0aW9uKHQpe3ZhciBlLG47Zm9yKHQ9dHx8e30sZT0xO2U8YXJndW1lbnRzLmxlbmd0aDtlKyspaWYobj1hcmd1bWVudHNbZV0pZm9yKHZhciBhIGluIG4pbi5oYXNPd25Qcm9wZXJ0eShhKSYmKFwib2JqZWN0XCI9PXR5cGVvZiBuW2FdP3IodFthXSxuW2FdKTp0W2FdPW5bYV0pO3JldHVybiB0fSxuPWZ1bmN0aW9uKHQsZSl7Zm9yKHZhciByPTA7cjxlLmxlbmd0aDtyKyspaWYoZVtyXS50b0xvd2VyQ2FzZSgpPT09dC50b0xvd2VyQ2FzZSgpKXJldHVybiByO3JldHVybi0xfSxhPXtkYXRlU2V0dGluZ3M6e2RheXM6W1wiU3VuZGF5XCIsXCJNb25kYXlcIixcIlR1ZXNkYXlcIixcIldlZG5lc2RheVwiLFwiVGh1cnNkYXlcIixcIkZyaWRheVwiLFwiU2F0dXJkYXlcIl0sZGF5c1Nob3J0OltcIlN1blwiLFwiTW9uXCIsXCJUdWVcIixcIldlZFwiLFwiVGh1XCIsXCJGcmlcIixcIlNhdFwiXSxtb250aHM6W1wiSmFudWFyeVwiLFwiRmVicnVhcnlcIixcIk1hcmNoXCIsXCJBcHJpbFwiLFwiTWF5XCIsXCJKdW5lXCIsXCJKdWx5XCIsXCJBdWd1c3RcIixcIlNlcHRlbWJlclwiLFwiT2N0b2JlclwiLFwiTm92ZW1iZXJcIixcIkRlY2VtYmVyXCJdLG1vbnRoc1Nob3J0OltcIkphblwiLFwiRmViXCIsXCJNYXJcIixcIkFwclwiLFwiTWF5XCIsXCJKdW5cIixcIkp1bFwiLFwiQXVnXCIsXCJTZXBcIixcIk9jdFwiLFwiTm92XCIsXCJEZWNcIl0sbWVyaWRpZW06W1wiQU1cIixcIlBNXCJdLG9yZGluYWw6ZnVuY3Rpb24odCl7dmFyIGU9dCUxMCxyPXsxOlwic3RcIiwyOlwibmRcIiwzOlwicmRcIn07cmV0dXJuIDEhPT1NYXRoLmZsb29yKHQlMTAwLzEwKSYmcltlXT9yW2VdOlwidGhcIn19LHNlcGFyYXRvcnM6L1sgXFwtK1xcL1xcLlQ6QF0vZyx2YWxpZFBhcnRzOi9bZERqbE5Td3pXRm1NbnRMb1l5YUFCZ0doSGlzdWVUSU9QWmNyVV0vZyxpbnRQYXJ0czovW2Rqd056bW55WWhIZ0dpc10vZyx0elBhcnRzOi9cXGIoPzpbUE1DRUFdW1NEUF1UfCg/OlBhY2lmaWN8TW91bnRhaW58Q2VudHJhbHxFYXN0ZXJufEF0bGFudGljKSAoPzpTdGFuZGFyZHxEYXlsaWdodHxQcmV2YWlsaW5nKSBUaW1lfCg/OkdNVHxVVEMpKD86Wy0rXVxcZHs0fSk/KVxcYi9nLHR6Q2xpcDovW14tK1xcZEEtWl0vZ30sRGF0ZUZvcm1hdHRlcj1mdW5jdGlvbih0KXt2YXIgZT10aGlzLG49cihhLHQpO2UuZGF0ZVNldHRpbmdzPW4uZGF0ZVNldHRpbmdzLGUuc2VwYXJhdG9ycz1uLnNlcGFyYXRvcnMsZS52YWxpZFBhcnRzPW4udmFsaWRQYXJ0cyxlLmludFBhcnRzPW4uaW50UGFydHMsZS50elBhcnRzPW4udHpQYXJ0cyxlLnR6Q2xpcD1uLnR6Q2xpcH0sRGF0ZUZvcm1hdHRlci5wcm90b3R5cGU9e2NvbnN0cnVjdG9yOkRhdGVGb3JtYXR0ZXIsZ2V0TW9udGg6ZnVuY3Rpb24odCl7dmFyIGUscj10aGlzO3JldHVybiBlPW4odCxyLmRhdGVTZXR0aW5ncy5tb250aHNTaG9ydCkrMSwwPT09ZSYmKGU9bih0LHIuZGF0ZVNldHRpbmdzLm1vbnRocykrMSksZX0scGFyc2VEYXRlOmZ1bmN0aW9uKGUscil7dmFyIG4sYSx1LGkscyxvLGMsZixsLGgsZD10aGlzLGc9ITEsbT0hMSxwPWQuZGF0ZVNldHRpbmdzLHk9e2RhdGU6bnVsbCx5ZWFyOm51bGwsbW9udGg6bnVsbCxkYXk6bnVsbCxob3VyOjAsbWluOjAsc2VjOjB9O2lmKCFlKXJldHVybiBudWxsO2lmKGUgaW5zdGFuY2VvZiBEYXRlKXJldHVybiBlO2lmKFwiVVwiPT09cilyZXR1cm4gdT1wYXJzZUludChlKSx1P25ldyBEYXRlKDFlMyp1KTplO3N3aXRjaCh0eXBlb2YgZSl7Y2FzZVwibnVtYmVyXCI6cmV0dXJuIG5ldyBEYXRlKGUpO2Nhc2VcInN0cmluZ1wiOmJyZWFrO2RlZmF1bHQ6cmV0dXJuIG51bGx9aWYobj1yLm1hdGNoKGQudmFsaWRQYXJ0cyksIW58fDA9PT1uLmxlbmd0aCl0aHJvdyBuZXcgRXJyb3IoXCJJbnZhbGlkIGRhdGUgZm9ybWF0IGRlZmluaXRpb24uXCIpO2ZvcihhPWUucmVwbGFjZShkLnNlcGFyYXRvcnMsXCJcXHgwMFwiKS5zcGxpdChcIlxceDAwXCIpLHU9MDt1PGEubGVuZ3RoO3UrKylzd2l0Y2goaT1hW3VdLHM9cGFyc2VJbnQoaSksblt1XSl7Y2FzZVwieVwiOmNhc2VcIllcIjppZighcylyZXR1cm4gbnVsbDtsPWkubGVuZ3RoLHkueWVhcj0yPT09bD9wYXJzZUludCgoNzA+cz9cIjIwXCI6XCIxOVwiKStpKTpzLGc9ITA7YnJlYWs7Y2FzZVwibVwiOmNhc2VcIm5cIjpjYXNlXCJNXCI6Y2FzZVwiRlwiOmlmKGlzTmFOKHMpKXtpZihvPWQuZ2V0TW9udGgoaSksIShvPjApKXJldHVybiBudWxsO3kubW9udGg9b31lbHNle2lmKCEocz49MSYmMTI+PXMpKXJldHVybiBudWxsO3kubW9udGg9c31nPSEwO2JyZWFrO2Nhc2VcImRcIjpjYXNlXCJqXCI6aWYoIShzPj0xJiYzMT49cykpcmV0dXJuIG51bGw7eS5kYXk9cyxnPSEwO2JyZWFrO2Nhc2VcImdcIjpjYXNlXCJoXCI6aWYoYz1uLmluZGV4T2YoXCJhXCIpPi0xP24uaW5kZXhPZihcImFcIik6bi5pbmRleE9mKFwiQVwiKT4tMT9uLmluZGV4T2YoXCJBXCIpOi0xLGg9YVtjXSxjPi0xKWY9dChoLHAubWVyaWRpZW1bMF0pPzA6dChoLHAubWVyaWRpZW1bMV0pPzEyOi0xLHM+PTEmJjEyPj1zJiZmPi0xP3kuaG91cj1zK2YtMTpzPj0wJiYyMz49cyYmKHkuaG91cj1zKTtlbHNle2lmKCEocz49MCYmMjM+PXMpKXJldHVybiBudWxsO3kuaG91cj1zfW09ITA7YnJlYWs7Y2FzZVwiR1wiOmNhc2VcIkhcIjppZighKHM+PTAmJjIzPj1zKSlyZXR1cm4gbnVsbDt5LmhvdXI9cyxtPSEwO2JyZWFrO2Nhc2VcImlcIjppZighKHM+PTAmJjU5Pj1zKSlyZXR1cm4gbnVsbDt5Lm1pbj1zLG09ITA7YnJlYWs7Y2FzZVwic1wiOmlmKCEocz49MCYmNTk+PXMpKXJldHVybiBudWxsO3kuc2VjPXMsbT0hMH1pZihnPT09ITAmJnkueWVhciYmeS5tb250aCYmeS5kYXkpeS5kYXRlPW5ldyBEYXRlKHkueWVhcix5Lm1vbnRoLTEseS5kYXkseS5ob3VyLHkubWluLHkuc2VjLDApO2Vsc2V7aWYobSE9PSEwKXJldHVybiBudWxsO3kuZGF0ZT1uZXcgRGF0ZSgwLDAsMCx5LmhvdXIseS5taW4seS5zZWMsMCl9cmV0dXJuIHkuZGF0ZX0sZ3Vlc3NEYXRlOmZ1bmN0aW9uKHQsZSl7aWYoXCJzdHJpbmdcIiE9dHlwZW9mIHQpcmV0dXJuIHQ7dmFyIHIsbixhLHUsaSxzLG89dGhpcyxjPXQucmVwbGFjZShvLnNlcGFyYXRvcnMsXCJcXHgwMFwiKS5zcGxpdChcIlxceDAwXCIpLGY9L15bZGptbl0vZyxsPWUubWF0Y2goby52YWxpZFBhcnRzKSxoPW5ldyBEYXRlLGQ9MDtpZighZi50ZXN0KGxbMF0pKXJldHVybiB0O2ZvcihhPTA7YTxjLmxlbmd0aDthKyspe2lmKGQ9MixpPWNbYV0scz1wYXJzZUludChpLnN1YnN0cigwLDIpKSxpc05hTihzKSlyZXR1cm4gbnVsbDtzd2l0Y2goYSl7Y2FzZSAwOlwibVwiPT09bFswXXx8XCJuXCI9PT1sWzBdP2guc2V0TW9udGgocy0xKTpoLnNldERhdGUocyk7YnJlYWs7Y2FzZSAxOlwibVwiPT09bFswXXx8XCJuXCI9PT1sWzBdP2guc2V0RGF0ZShzKTpoLnNldE1vbnRoKHMtMSk7YnJlYWs7Y2FzZSAyOmlmKG49aC5nZXRGdWxsWWVhcigpLHI9aS5sZW5ndGgsZD00PnI/cjo0LG49cGFyc2VJbnQoND5yP24udG9TdHJpbmcoKS5zdWJzdHIoMCw0LXIpK2k6aS5zdWJzdHIoMCw0KSksIW4pcmV0dXJuIG51bGw7aC5zZXRGdWxsWWVhcihuKTticmVhaztjYXNlIDM6aC5zZXRIb3VycyhzKTticmVhaztjYXNlIDQ6aC5zZXRNaW51dGVzKHMpO2JyZWFrO2Nhc2UgNTpoLnNldFNlY29uZHMocyl9dT1pLnN1YnN0cihkKSx1Lmxlbmd0aD4wJiZjLnNwbGljZShhKzEsMCx1KX1yZXR1cm4gaH0scGFyc2VGb3JtYXQ6ZnVuY3Rpb24odCxyKXt2YXIgbixhPXRoaXMscz1hLmRhdGVTZXR0aW5ncyxvPS9cXFxcPyguPykvZ2ksYz1mdW5jdGlvbih0LGUpe3JldHVybiBuW3RdP25bdF0oKTplfTtyZXR1cm4gbj17ZDpmdW5jdGlvbigpe3JldHVybiBlKG4uaigpLDIpfSxEOmZ1bmN0aW9uKCl7cmV0dXJuIHMuZGF5c1Nob3J0W24udygpXX0sajpmdW5jdGlvbigpe3JldHVybiByLmdldERhdGUoKX0sbDpmdW5jdGlvbigpe3JldHVybiBzLmRheXNbbi53KCldfSxOOmZ1bmN0aW9uKCl7cmV0dXJuIG4udygpfHw3fSx3OmZ1bmN0aW9uKCl7cmV0dXJuIHIuZ2V0RGF5KCl9LHo6ZnVuY3Rpb24oKXt2YXIgdD1uZXcgRGF0ZShuLlkoKSxuLm4oKS0xLG4uaigpKSxlPW5ldyBEYXRlKG4uWSgpLDAsMSk7cmV0dXJuIE1hdGgucm91bmQoKHQtZSkvdSl9LFc6ZnVuY3Rpb24oKXt2YXIgdD1uZXcgRGF0ZShuLlkoKSxuLm4oKS0xLG4uaigpLW4uTigpKzMpLHI9bmV3IERhdGUodC5nZXRGdWxsWWVhcigpLDAsNCk7cmV0dXJuIGUoMStNYXRoLnJvdW5kKCh0LXIpL3UvNyksMil9LEY6ZnVuY3Rpb24oKXtyZXR1cm4gcy5tb250aHNbci5nZXRNb250aCgpXX0sbTpmdW5jdGlvbigpe3JldHVybiBlKG4ubigpLDIpfSxNOmZ1bmN0aW9uKCl7cmV0dXJuIHMubW9udGhzU2hvcnRbci5nZXRNb250aCgpXX0sbjpmdW5jdGlvbigpe3JldHVybiByLmdldE1vbnRoKCkrMX0sdDpmdW5jdGlvbigpe3JldHVybiBuZXcgRGF0ZShuLlkoKSxuLm4oKSwwKS5nZXREYXRlKCl9LEw6ZnVuY3Rpb24oKXt2YXIgdD1uLlkoKTtyZXR1cm4gdCU0PT09MCYmdCUxMDAhPT0wfHx0JTQwMD09PTA/MTowfSxvOmZ1bmN0aW9uKCl7dmFyIHQ9bi5uKCksZT1uLlcoKSxyPW4uWSgpO3JldHVybiByKygxMj09PXQmJjk+ZT8xOjE9PT10JiZlPjk/LTE6MCl9LFk6ZnVuY3Rpb24oKXtyZXR1cm4gci5nZXRGdWxsWWVhcigpfSx5OmZ1bmN0aW9uKCl7cmV0dXJuIG4uWSgpLnRvU3RyaW5nKCkuc2xpY2UoLTIpfSxhOmZ1bmN0aW9uKCl7cmV0dXJuIG4uQSgpLnRvTG93ZXJDYXNlKCl9LEE6ZnVuY3Rpb24oKXt2YXIgdD1uLkcoKTwxMj8wOjE7cmV0dXJuIHMubWVyaWRpZW1bdF19LEI6ZnVuY3Rpb24oKXt2YXIgdD1yLmdldFVUQ0hvdXJzKCkqaSxuPTYwKnIuZ2V0VVRDTWludXRlcygpLGE9ci5nZXRVVENTZWNvbmRzKCk7cmV0dXJuIGUoTWF0aC5mbG9vcigodCtuK2EraSkvODYuNCklMWUzLDMpfSxnOmZ1bmN0aW9uKCl7cmV0dXJuIG4uRygpJTEyfHwxMn0sRzpmdW5jdGlvbigpe3JldHVybiByLmdldEhvdXJzKCl9LGg6ZnVuY3Rpb24oKXtyZXR1cm4gZShuLmcoKSwyKX0sSDpmdW5jdGlvbigpe3JldHVybiBlKG4uRygpLDIpfSxpOmZ1bmN0aW9uKCl7cmV0dXJuIGUoci5nZXRNaW51dGVzKCksMil9LHM6ZnVuY3Rpb24oKXtyZXR1cm4gZShyLmdldFNlY29uZHMoKSwyKX0sdTpmdW5jdGlvbigpe3JldHVybiBlKDFlMypyLmdldE1pbGxpc2Vjb25kcygpLDYpfSxlOmZ1bmN0aW9uKCl7dmFyIHQ9L1xcKCguKilcXCkvLmV4ZWMoU3RyaW5nKHIpKVsxXTtyZXR1cm4gdHx8XCJDb29yZGluYXRlZCBVbml2ZXJzYWwgVGltZVwifSxJOmZ1bmN0aW9uKCl7dmFyIHQ9bmV3IERhdGUobi5ZKCksMCksZT1EYXRlLlVUQyhuLlkoKSwwKSxyPW5ldyBEYXRlKG4uWSgpLDYpLGE9RGF0ZS5VVEMobi5ZKCksNik7cmV0dXJuIHQtZSE9PXItYT8xOjB9LE86ZnVuY3Rpb24oKXt2YXIgdD1yLmdldFRpbWV6b25lT2Zmc2V0KCksbj1NYXRoLmFicyh0KTtyZXR1cm4odD4wP1wiLVwiOlwiK1wiKStlKDEwMCpNYXRoLmZsb29yKG4vNjApK24lNjAsNCl9LFA6ZnVuY3Rpb24oKXt2YXIgdD1uLk8oKTtyZXR1cm4gdC5zdWJzdHIoMCwzKStcIjpcIit0LnN1YnN0cigzLDIpfSxUOmZ1bmN0aW9uKCl7dmFyIHQ9KFN0cmluZyhyKS5tYXRjaChhLnR6UGFydHMpfHxbXCJcIl0pLnBvcCgpLnJlcGxhY2UoYS50ekNsaXAsXCJcIik7cmV0dXJuIHR8fFwiVVRDXCJ9LFo6ZnVuY3Rpb24oKXtyZXR1cm4gNjAqLXIuZ2V0VGltZXpvbmVPZmZzZXQoKX0sYzpmdW5jdGlvbigpe3JldHVyblwiWS1tLWRcXFxcVEg6aTpzUFwiLnJlcGxhY2UobyxjKX0scjpmdW5jdGlvbigpe3JldHVyblwiRCwgZCBNIFkgSDppOnMgT1wiLnJlcGxhY2UobyxjKX0sVTpmdW5jdGlvbigpe3JldHVybiByLmdldFRpbWUoKS8xZTN8fDB9fSxjKHQsdCl9LGZvcm1hdERhdGU6ZnVuY3Rpb24odCxlKXt2YXIgcixuLGEsdSxpLHM9dGhpcyxvPVwiXCIsYz1cIlxcXFxcIjtpZihcInN0cmluZ1wiPT10eXBlb2YgdCYmKHQ9cy5wYXJzZURhdGUodCxlKSwhdCkpcmV0dXJuIG51bGw7aWYodCBpbnN0YW5jZW9mIERhdGUpe2ZvcihhPWUubGVuZ3RoLHI9MDthPnI7cisrKWk9ZS5jaGFyQXQociksXCJTXCIhPT1pJiZpIT09YyYmKHI+MCYmZS5jaGFyQXQoci0xKT09PWM/bys9aToodT1zLnBhcnNlRm9ybWF0KGksdCksciE9PWEtMSYmcy5pbnRQYXJ0cy50ZXN0KGkpJiZcIlNcIj09PWUuY2hhckF0KHIrMSkmJihuPXBhcnNlSW50KHUpfHwwLHUrPXMuZGF0ZVNldHRpbmdzLm9yZGluYWwobikpLG8rPXUpKTtyZXR1cm4gb31yZXR1cm5cIlwifX19KCk7LyoqXG4gKiBAcHJlc2VydmUgalF1ZXJ5IERhdGVUaW1lUGlja2VyXG4gKiBAaG9tZXBhZ2UgaHR0cDovL3hkc29mdC5uZXQvanFwbHVnaW5zL2RhdGV0aW1lcGlja2VyL1xuICogQGF1dGhvciBDaHVwdXJub3YgVmFsZXJpeSAoPGNodXB1cm5vdkBnbWFpbC5jb20+KVxuICovXG5cbi8qKlxuICogQHBhcmFtIHtqUXVlcnl9ICRcbiAqL1xudmFyIGRhdGV0aW1lcGlja2VyRmFjdG9yeSA9IGZ1bmN0aW9uICgkKSB7XG5cdCd1c2Ugc3RyaWN0JztcblxuXHR2YXIgZGVmYXVsdF9vcHRpb25zICA9IHtcblx0XHRpMThuOiB7XG5cdFx0XHRhcjogeyAvLyBBcmFiaWNcblx0XHRcdFx0bW9udGhzOiBbXG5cdFx0XHRcdFx0XCLZg9in2YbZiNmGINin2YTYq9in2YbZilwiLCBcIti02KjYp9i3XCIsIFwi2KLYsNin2LFcIiwgXCLZhtmK2LPYp9mGXCIsIFwi2YXYp9mK2YhcIiwgXCLYrdiy2YrYsdin2YZcIiwgXCLYqtmF2YjYslwiLCBcItii2KhcIiwgXCLYo9mK2YTZiNmEXCIsIFwi2KrYtNix2YrZhiDYp9mE2KPZiNmEXCIsIFwi2KrYtNix2YrZhiDYp9mE2KvYp9mG2YpcIiwgXCLZg9in2YbZiNmGINin2YTYo9mI2YRcIlxuXHRcdFx0XHRdLFxuXHRcdFx0XHRkYXlPZldlZWtTaG9ydDogW1xuXHRcdFx0XHRcdFwi2YZcIiwgXCLYq1wiLCBcIti5XCIsIFwi2K5cIiwgXCLYrFwiLCBcItizXCIsIFwi2K1cIlxuXHRcdFx0XHRdLFxuXHRcdFx0XHRkYXlPZldlZWs6IFtcItin2YTYo9it2K9cIiwgXCLYp9mE2KfYq9mG2YrZhlwiLCBcItin2YTYq9mE2KfYq9in2KFcIiwgXCLYp9mE2KPYsdio2LnYp9ihXCIsIFwi2KfZhNiu2YXZitizXCIsIFwi2KfZhNis2YXYudipXCIsIFwi2KfZhNiz2KjYqlwiLCBcItin2YTYo9it2K9cIl1cblx0XHRcdH0sXG5cdFx0XHRybzogeyAvLyBSb21hbmlhblxuXHRcdFx0XHRtb250aHM6IFtcblx0XHRcdFx0XHRcIklhbnVhcmllXCIsIFwiRmVicnVhcmllXCIsIFwiTWFydGllXCIsIFwiQXByaWxpZVwiLCBcIk1haVwiLCBcIkl1bmllXCIsIFwiSXVsaWVcIiwgXCJBdWd1c3RcIiwgXCJTZXB0ZW1icmllXCIsIFwiT2N0b21icmllXCIsIFwiTm9pZW1icmllXCIsIFwiRGVjZW1icmllXCJcblx0XHRcdFx0XSxcblx0XHRcdFx0ZGF5T2ZXZWVrU2hvcnQ6IFtcblx0XHRcdFx0XHRcIkR1XCIsIFwiTHVcIiwgXCJNYVwiLCBcIk1pXCIsIFwiSm9cIiwgXCJWaVwiLCBcIlPDolwiXG5cdFx0XHRcdF0sXG5cdFx0XHRcdGRheU9mV2VlazogW1wiRHVtaW5pY8SDXCIsIFwiTHVuaVwiLCBcIk1hcsWjaVwiLCBcIk1pZXJjdXJpXCIsIFwiSm9pXCIsIFwiVmluZXJpXCIsIFwiU8OibWLEg3TEg1wiXVxuXHRcdFx0fSxcblx0XHRcdGlkOiB7IC8vIEluZG9uZXNpYW5cblx0XHRcdFx0bW9udGhzOiBbXG5cdFx0XHRcdFx0XCJKYW51YXJpXCIsIFwiRmVicnVhcmlcIiwgXCJNYXJldFwiLCBcIkFwcmlsXCIsIFwiTWVpXCIsIFwiSnVuaVwiLCBcIkp1bGlcIiwgXCJBZ3VzdHVzXCIsIFwiU2VwdGVtYmVyXCIsIFwiT2t0b2JlclwiLCBcIk5vdmVtYmVyXCIsIFwiRGVzZW1iZXJcIlxuXHRcdFx0XHRdLFxuXHRcdFx0XHRkYXlPZldlZWtTaG9ydDogW1xuXHRcdFx0XHRcdFwiTWluXCIsIFwiU2VuXCIsIFwiU2VsXCIsIFwiUmFiXCIsIFwiS2FtXCIsIFwiSnVtXCIsIFwiU2FiXCJcblx0XHRcdFx0XSxcblx0XHRcdFx0ZGF5T2ZXZWVrOiBbXCJNaW5nZ3VcIiwgXCJTZW5pblwiLCBcIlNlbGFzYVwiLCBcIlJhYnVcIiwgXCJLYW1pc1wiLCBcIkp1bWF0XCIsIFwiU2FidHVcIl1cblx0XHRcdH0sXG5cdFx0XHRpczogeyAvLyBJY2VsYW5kaWNcblx0XHRcdFx0bW9udGhzOiBbXG5cdFx0XHRcdFx0XCJKYW7DumFyXCIsIFwiRmVicsO6YXJcIiwgXCJNYXJzXCIsIFwiQXByw61sXCIsIFwiTWHDrVwiLCBcIkrDum7DrVwiLCBcIkrDumzDrVwiLCBcIsOBZ8O6c3RcIiwgXCJTZXB0ZW1iZXJcIiwgXCJPa3TDs2JlclwiLCBcIk7Ds3ZlbWJlclwiLCBcIkRlc2VtYmVyXCJcblx0XHRcdFx0XSxcblx0XHRcdFx0ZGF5T2ZXZWVrU2hvcnQ6IFtcblx0XHRcdFx0XHRcIlN1blwiLCBcIk3DoW5cIiwgXCLDnnJpw7BcIiwgXCJNacOwXCIsIFwiRmltXCIsIFwiRsO2c1wiLCBcIkxhdVwiXG5cdFx0XHRcdF0sXG5cdFx0XHRcdGRheU9mV2VlazogW1wiU3VubnVkYWd1clwiLCBcIk3DoW51ZGFndXJcIiwgXCLDnnJpw7BqdWRhZ3VyXCIsIFwiTWnDsHZpa3VkYWd1clwiLCBcIkZpbW10dWRhZ3VyXCIsIFwiRsO2c3R1ZGFndXJcIiwgXCJMYXVnYXJkYWd1clwiXVxuXHRcdFx0fSxcblx0XHRcdGJnOiB7IC8vIEJ1bGdhcmlhblxuXHRcdFx0XHRtb250aHM6IFtcblx0XHRcdFx0XHRcItCv0L3Rg9Cw0YDQuFwiLCBcItCk0LXQstGA0YPQsNGA0LhcIiwgXCLQnNCw0YDRglwiLCBcItCQ0L/RgNC40LtcIiwgXCLQnNCw0LlcIiwgXCLQrtC90LhcIiwgXCLQrtC70LhcIiwgXCLQkNCy0LPRg9GB0YJcIiwgXCLQodC10L/RgtC10LzQstGA0LhcIiwgXCLQntC60YLQvtC80LLRgNC4XCIsIFwi0J3QvtC10LzQstGA0LhcIiwgXCLQlNC10LrQtdC80LLRgNC4XCJcblx0XHRcdFx0XSxcblx0XHRcdFx0ZGF5T2ZXZWVrU2hvcnQ6IFtcblx0XHRcdFx0XHRcItCd0LRcIiwgXCLQn9C9XCIsIFwi0JLRglwiLCBcItCh0YBcIiwgXCLQp9GCXCIsIFwi0J/RglwiLCBcItCh0LFcIlxuXHRcdFx0XHRdLFxuXHRcdFx0XHRkYXlPZldlZWs6IFtcItCd0LXQtNC10LvRj1wiLCBcItCf0L7QvdC10LTQtdC70L3QuNC6XCIsIFwi0JLRgtC+0YDQvdC40LpcIiwgXCLQodGA0Y/QtNCwXCIsIFwi0KfQtdGC0LLRitGA0YLRitC6XCIsIFwi0J/QtdGC0YrQulwiLCBcItCh0YrQsdC+0YLQsFwiXVxuXHRcdFx0fSxcblx0XHRcdGZhOiB7IC8vIFBlcnNpYW4vRmFyc2lcblx0XHRcdFx0bW9udGhzOiBbXG5cdFx0XHRcdFx0J9mB2LHZiNix2K/bjNmGJywgJ9in2LHYr9uM2KjZh9i02KonLCAn2K7Ysdiv2KfYrycsICfYqtuM2LEnLCAn2YXYsdiv2KfYrycsICfYtNmH2LHbjNmI2LEnLCAn2YXZh9ixJywgJ9ii2KjYp9mGJywgJ9ii2LDYsScsICfYr9uMJywgJ9io2YfZhdmGJywgJ9in2LPZgdmG2K8nXG5cdFx0XHRcdF0sXG5cdFx0XHRcdGRheU9mV2Vla1Nob3J0OiBbXG5cdFx0XHRcdFx0J9uM2qnYtNmG2KjZhycsICfYr9mI2LTZhtio2YcnLCAn2LPZhyDYtNmG2KjZhycsICfahtmH2KfYsdi02YbYqNmHJywgJ9m+2YbYrNi02YbYqNmHJywgJ9is2YXYudmHJywgJ9i02YbYqNmHJ1xuXHRcdFx0XHRdLFxuXHRcdFx0XHRkYXlPZldlZWs6IFtcItuM2qnigIzYtNmG2KjZh1wiLCBcItiv2YjYtNmG2KjZh1wiLCBcItiz2YfigIzYtNmG2KjZh1wiLCBcItqG2YfYp9ix2LTZhtio2YdcIiwgXCLZvtmG2KzigIzYtNmG2KjZh1wiLCBcItis2YXYudmHXCIsIFwi2LTZhtio2YdcIiwgXCLbjNqp4oCM2LTZhtio2YdcIl1cblx0XHRcdH0sXG5cdFx0XHRydTogeyAvLyBSdXNzaWFuXG5cdFx0XHRcdG1vbnRoczogW1xuXHRcdFx0XHRcdCfQr9C90LLQsNGA0YwnLCAn0KTQtdCy0YDQsNC70YwnLCAn0JzQsNGA0YInLCAn0JDQv9GA0LXQu9GMJywgJ9Cc0LDQuScsICfQmNGO0L3RjCcsICfQmNGO0LvRjCcsICfQkNCy0LPRg9GB0YInLCAn0KHQtdC90YLRj9Cx0YDRjCcsICfQntC60YLRj9Cx0YDRjCcsICfQndC+0Y/QsdGA0YwnLCAn0JTQtdC60LDQsdGA0YwnXG5cdFx0XHRcdF0sXG5cdFx0XHRcdGRheU9mV2Vla1Nob3J0OiBbXG5cdFx0XHRcdFx0XCLQktGBXCIsIFwi0J/QvVwiLCBcItCS0YJcIiwgXCLQodGAXCIsIFwi0KfRglwiLCBcItCf0YJcIiwgXCLQodCxXCJcblx0XHRcdFx0XSxcblx0XHRcdFx0ZGF5T2ZXZWVrOiBbXCLQktC+0YHQutGA0LXRgdC10L3RjNC1XCIsIFwi0J/QvtC90LXQtNC10LvRjNC90LjQulwiLCBcItCS0YLQvtGA0L3QuNC6XCIsIFwi0KHRgNC10LTQsFwiLCBcItCn0LXRgtCy0LXRgNCzXCIsIFwi0J/Rj9GC0L3QuNGG0LBcIiwgXCLQodGD0LHQsdC+0YLQsFwiXVxuXHRcdFx0fSxcblx0XHRcdHVrOiB7IC8vIFVrcmFpbmlhblxuXHRcdFx0XHRtb250aHM6IFtcblx0XHRcdFx0XHQn0KHRltGH0LXQvdGMJywgJ9Cb0Y7RgtC40LknLCAn0JHQtdGA0LXQt9C10L3RjCcsICfQmtCy0ZbRgtC10L3RjCcsICfQotGA0LDQstC10L3RjCcsICfQp9C10YDQstC10L3RjCcsICfQm9C40L/QtdC90YwnLCAn0KHQtdGA0L/QtdC90YwnLCAn0JLQtdGA0LXRgdC10L3RjCcsICfQltC+0LLRgtC10L3RjCcsICfQm9C40YHRgtC+0L/QsNC0JywgJ9CT0YDRg9C00LXQvdGMJ1xuXHRcdFx0XHRdLFxuXHRcdFx0XHRkYXlPZldlZWtTaG9ydDogW1xuXHRcdFx0XHRcdFwi0J3QtNC7XCIsIFwi0J/QvdC0XCIsIFwi0JLRgtGAXCIsIFwi0KHRgNC0XCIsIFwi0KfRgtCyXCIsIFwi0J/RgtC9XCIsIFwi0KHQsdGCXCJcblx0XHRcdFx0XSxcblx0XHRcdFx0ZGF5T2ZXZWVrOiBbXCLQndC10LTRltC70Y9cIiwgXCLQn9C+0L3QtdC00ZbQu9C+0LpcIiwgXCLQktGW0LLRgtC+0YDQvtC6XCIsIFwi0KHQtdGA0LXQtNCwXCIsIFwi0KfQtdGC0LLQtdGAXCIsIFwi0J8n0Y/RgtC90LjRhtGPXCIsIFwi0KHRg9Cx0L7RgtCwXCJdXG5cdFx0XHR9LFxuXHRcdFx0ZW46IHsgLy8gRW5nbGlzaFxuXHRcdFx0XHRtb250aHM6IFtcblx0XHRcdFx0XHRcIkphbnVhcnlcIiwgXCJGZWJydWFyeVwiLCBcIk1hcmNoXCIsIFwiQXByaWxcIiwgXCJNYXlcIiwgXCJKdW5lXCIsIFwiSnVseVwiLCBcIkF1Z3VzdFwiLCBcIlNlcHRlbWJlclwiLCBcIk9jdG9iZXJcIiwgXCJOb3ZlbWJlclwiLCBcIkRlY2VtYmVyXCJcblx0XHRcdFx0XSxcblx0XHRcdFx0ZGF5T2ZXZWVrU2hvcnQ6IFtcblx0XHRcdFx0XHRcIlN1blwiLCBcIk1vblwiLCBcIlR1ZVwiLCBcIldlZFwiLCBcIlRodVwiLCBcIkZyaVwiLCBcIlNhdFwiXG5cdFx0XHRcdF0sXG5cdFx0XHRcdGRheU9mV2VlazogW1wiU3VuZGF5XCIsIFwiTW9uZGF5XCIsIFwiVHVlc2RheVwiLCBcIldlZG5lc2RheVwiLCBcIlRodXJzZGF5XCIsIFwiRnJpZGF5XCIsIFwiU2F0dXJkYXlcIl1cblx0XHRcdH0sXG5cdFx0XHRlbDogeyAvLyDOlc67zrvOt869zrnOus6sXG5cdFx0XHRcdG1vbnRoczogW1xuXHRcdFx0XHRcdFwizpnOsc69zr/Phc6sz4HOuc6/z4JcIiwgXCLOps61zrLPgc6/z4XOrM+BzrnOv8+CXCIsIFwizpzOrM+Bz4TOuc6/z4JcIiwgXCLOkc+Az4HOr867zrnOv8+CXCIsIFwizpzOrM65zr/PglwiLCBcIs6Zzr/Pjc69zrnOv8+CXCIsIFwizpnOv8+NzrvOuc6/z4JcIiwgXCLOkc+NzrPOv8+Fz4PPhM6/z4JcIiwgXCLOo861z4DPhM6tzrzOss+BzrnOv8+CXCIsIFwizp/Ous+Ez47Oss+BzrnOv8+CXCIsIFwizp3Ov86tzrzOss+BzrnOv8+CXCIsIFwizpTOtc66zq3OvM6yz4HOuc6/z4JcIlxuXHRcdFx0XHRdLFxuXHRcdFx0XHRkYXlPZldlZWtTaG9ydDogW1xuXHRcdFx0XHRcdFwizprPhc+BXCIsIFwizpTOtc+FXCIsIFwizqTPgc65XCIsIFwizqTOtc+EXCIsIFwizqDOtc68XCIsIFwizqDOsc+BXCIsIFwizqPOsc6yXCJcblx0XHRcdFx0XSxcblx0XHRcdFx0ZGF5T2ZXZWVrOiBbXCLOms+Fz4HOuc6xzrrOrlwiLCBcIs6UzrXPhc+Ezq3Pgc6xXCIsIFwizqTPgc6vz4TOt1wiLCBcIs6kzrXPhM6sz4HPhM63XCIsIFwizqDOrc68z4DPhM63XCIsIFwizqDOsc+BzrHPg866zrXPhc6uXCIsIFwizqPOrM6yzrLOsc+Ezr9cIl1cblx0XHRcdH0sXG5cdFx0XHRkZTogeyAvLyBHZXJtYW5cblx0XHRcdFx0bW9udGhzOiBbXG5cdFx0XHRcdFx0J0phbnVhcicsICdGZWJydWFyJywgJ03DpHJ6JywgJ0FwcmlsJywgJ01haScsICdKdW5pJywgJ0p1bGknLCAnQXVndXN0JywgJ1NlcHRlbWJlcicsICdPa3RvYmVyJywgJ05vdmVtYmVyJywgJ0RlemVtYmVyJ1xuXHRcdFx0XHRdLFxuXHRcdFx0XHRkYXlPZldlZWtTaG9ydDogW1xuXHRcdFx0XHRcdFwiU29cIiwgXCJNb1wiLCBcIkRpXCIsIFwiTWlcIiwgXCJEb1wiLCBcIkZyXCIsIFwiU2FcIlxuXHRcdFx0XHRdLFxuXHRcdFx0XHRkYXlPZldlZWs6IFtcIlNvbm50YWdcIiwgXCJNb250YWdcIiwgXCJEaWVuc3RhZ1wiLCBcIk1pdHR3b2NoXCIsIFwiRG9ubmVyc3RhZ1wiLCBcIkZyZWl0YWdcIiwgXCJTYW1zdGFnXCJdXG5cdFx0XHR9LFxuXHRcdFx0bmw6IHsgLy8gRHV0Y2hcblx0XHRcdFx0bW9udGhzOiBbXG5cdFx0XHRcdFx0XCJqYW51YXJpXCIsIFwiZmVicnVhcmlcIiwgXCJtYWFydFwiLCBcImFwcmlsXCIsIFwibWVpXCIsIFwianVuaVwiLCBcImp1bGlcIiwgXCJhdWd1c3R1c1wiLCBcInNlcHRlbWJlclwiLCBcIm9rdG9iZXJcIiwgXCJub3ZlbWJlclwiLCBcImRlY2VtYmVyXCJcblx0XHRcdFx0XSxcblx0XHRcdFx0ZGF5T2ZXZWVrU2hvcnQ6IFtcblx0XHRcdFx0XHRcInpvXCIsIFwibWFcIiwgXCJkaVwiLCBcIndvXCIsIFwiZG9cIiwgXCJ2clwiLCBcInphXCJcblx0XHRcdFx0XSxcblx0XHRcdFx0ZGF5T2ZXZWVrOiBbXCJ6b25kYWdcIiwgXCJtYWFuZGFnXCIsIFwiZGluc2RhZ1wiLCBcIndvZW5zZGFnXCIsIFwiZG9uZGVyZGFnXCIsIFwidnJpamRhZ1wiLCBcInphdGVyZGFnXCJdXG5cdFx0XHR9LFxuXHRcdFx0dHI6IHsgLy8gVHVya2lzaFxuXHRcdFx0XHRtb250aHM6IFtcblx0XHRcdFx0XHRcIk9jYWtcIiwgXCLFnnViYXRcIiwgXCJNYXJ0XCIsIFwiTmlzYW5cIiwgXCJNYXnEsXNcIiwgXCJIYXppcmFuXCIsIFwiVGVtbXV6XCIsIFwiQcSfdXN0b3NcIiwgXCJFeWzDvGxcIiwgXCJFa2ltXCIsIFwiS2FzxLFtXCIsIFwiQXJhbMSxa1wiXG5cdFx0XHRcdF0sXG5cdFx0XHRcdGRheU9mV2Vla1Nob3J0OiBbXG5cdFx0XHRcdFx0XCJQYXpcIiwgXCJQdHNcIiwgXCJTYWxcIiwgXCLDh2FyXCIsIFwiUGVyXCIsIFwiQ3VtXCIsIFwiQ3RzXCJcblx0XHRcdFx0XSxcblx0XHRcdFx0ZGF5T2ZXZWVrOiBbXCJQYXphclwiLCBcIlBhemFydGVzaVwiLCBcIlNhbMSxXCIsIFwiw4dhcsWfYW1iYVwiLCBcIlBlcsWfZW1iZVwiLCBcIkN1bWFcIiwgXCJDdW1hcnRlc2lcIl1cblx0XHRcdH0sXG5cdFx0XHRmcjogeyAvL0ZyZW5jaFxuXHRcdFx0XHRtb250aHM6IFtcblx0XHRcdFx0XHRcIkphbnZpZXJcIiwgXCJGw6l2cmllclwiLCBcIk1hcnNcIiwgXCJBdnJpbFwiLCBcIk1haVwiLCBcIkp1aW5cIiwgXCJKdWlsbGV0XCIsIFwiQW/Du3RcIiwgXCJTZXB0ZW1icmVcIiwgXCJPY3RvYnJlXCIsIFwiTm92ZW1icmVcIiwgXCJEw6ljZW1icmVcIlxuXHRcdFx0XHRdLFxuXHRcdFx0XHRkYXlPZldlZWtTaG9ydDogW1xuXHRcdFx0XHRcdFwiRGltXCIsIFwiTHVuXCIsIFwiTWFyXCIsIFwiTWVyXCIsIFwiSmV1XCIsIFwiVmVuXCIsIFwiU2FtXCJcblx0XHRcdFx0XSxcblx0XHRcdFx0ZGF5T2ZXZWVrOiBbXCJkaW1hbmNoZVwiLCBcImx1bmRpXCIsIFwibWFyZGlcIiwgXCJtZXJjcmVkaVwiLCBcImpldWRpXCIsIFwidmVuZHJlZGlcIiwgXCJzYW1lZGlcIl1cblx0XHRcdH0sXG5cdFx0XHRlczogeyAvLyBTcGFuaXNoXG5cdFx0XHRcdG1vbnRoczogW1xuXHRcdFx0XHRcdFwiRW5lcm9cIiwgXCJGZWJyZXJvXCIsIFwiTWFyem9cIiwgXCJBYnJpbFwiLCBcIk1heW9cIiwgXCJKdW5pb1wiLCBcIkp1bGlvXCIsIFwiQWdvc3RvXCIsIFwiU2VwdGllbWJyZVwiLCBcIk9jdHVicmVcIiwgXCJOb3ZpZW1icmVcIiwgXCJEaWNpZW1icmVcIlxuXHRcdFx0XHRdLFxuXHRcdFx0XHRkYXlPZldlZWtTaG9ydDogW1xuXHRcdFx0XHRcdFwiRG9tXCIsIFwiTHVuXCIsIFwiTWFyXCIsIFwiTWnDqVwiLCBcIkp1ZVwiLCBcIlZpZVwiLCBcIlPDoWJcIlxuXHRcdFx0XHRdLFxuXHRcdFx0XHRkYXlPZldlZWs6IFtcIkRvbWluZ29cIiwgXCJMdW5lc1wiLCBcIk1hcnRlc1wiLCBcIk1pw6lyY29sZXNcIiwgXCJKdWV2ZXNcIiwgXCJWaWVybmVzXCIsIFwiU8OhYmFkb1wiXVxuXHRcdFx0fSxcblx0XHRcdHRoOiB7IC8vIFRoYWlcblx0XHRcdFx0bW9udGhzOiBbXG5cdFx0XHRcdFx0J+C4oeC4geC4o+C4suC4hOC4oScsICfguIHguLjguKHguKDguLLguJ7guLHguJnguJjguYwnLCAn4Lih4Li14LiZ4Liy4LiE4LihJywgJ+C5gOC4oeC4qeC4suC4ouC4mScsICfguJ7guKTguKnguKDguLLguITguKEnLCAn4Lih4Li04LiW4Li44LiZ4Liy4Lii4LiZJywgJ+C4geC4o+C4geC4juC4suC4hOC4oScsICfguKrguLTguIfguKvguLLguITguKEnLCAn4LiB4Lix4LiZ4Lii4Liy4Lii4LiZJywgJ+C4leC4uOC4peC4suC4hOC4oScsICfguJ7guKTguKjguIjguLTguIHguLLguKLguJknLCAn4LiY4Lix4LiZ4Lin4Liy4LiE4LihJ1xuXHRcdFx0XHRdLFxuXHRcdFx0XHRkYXlPZldlZWtTaG9ydDogW1xuXHRcdFx0XHRcdCfguK3guLIuJywgJ+C4iC4nLCAn4LitLicsICfguJ4uJywgJ+C4nuC4pC4nLCAn4LioLicsICfguKouJ1xuXHRcdFx0XHRdLFxuXHRcdFx0XHRkYXlPZldlZWs6IFtcIuC4reC4suC4l+C4tOC4leC4ouC5jFwiLCBcIuC4iOC4seC4meC4l+C4o+C5jFwiLCBcIuC4reC4seC4h+C4hOC4suC4o1wiLCBcIuC4nuC4uOC4mFwiLCBcIuC4nuC4pOC4q+C4seC4qlwiLCBcIuC4qOC4uOC4geC4o+C5jFwiLCBcIuC5gOC4quC4suC4o+C5jFwiLCBcIuC4reC4suC4l+C4tOC4leC4ouC5jFwiXVxuXHRcdFx0fSxcblx0XHRcdHBsOiB7IC8vIFBvbGlzaFxuXHRcdFx0XHRtb250aHM6IFtcblx0XHRcdFx0XHRcInN0eWN6ZcWEXCIsIFwibHV0eVwiLCBcIm1hcnplY1wiLCBcImt3aWVjaWXFhFwiLCBcIm1halwiLCBcImN6ZXJ3aWVjXCIsIFwibGlwaWVjXCIsIFwic2llcnBpZcWEXCIsIFwid3J6ZXNpZcWEXCIsIFwicGHFumR6aWVybmlrXCIsIFwibGlzdG9wYWRcIiwgXCJncnVkemllxYRcIlxuXHRcdFx0XHRdLFxuXHRcdFx0XHRkYXlPZldlZWtTaG9ydDogW1xuXHRcdFx0XHRcdFwibmRcIiwgXCJwblwiLCBcInd0XCIsIFwixZtyXCIsIFwiY3pcIiwgXCJwdFwiLCBcInNiXCJcblx0XHRcdFx0XSxcblx0XHRcdFx0ZGF5T2ZXZWVrOiBbXCJuaWVkemllbGFcIiwgXCJwb25pZWR6aWHFgmVrXCIsIFwid3RvcmVrXCIsIFwixZtyb2RhXCIsIFwiY3p3YXJ0ZWtcIiwgXCJwacSFdGVrXCIsIFwic29ib3RhXCJdXG5cdFx0XHR9LFxuXHRcdFx0cHQ6IHsgLy8gUG9ydHVndWVzZVxuXHRcdFx0XHRtb250aHM6IFtcblx0XHRcdFx0XHRcIkphbmVpcm9cIiwgXCJGZXZlcmVpcm9cIiwgXCJNYXLDp29cIiwgXCJBYnJpbFwiLCBcIk1haW9cIiwgXCJKdW5ob1wiLCBcIkp1bGhvXCIsIFwiQWdvc3RvXCIsIFwiU2V0ZW1icm9cIiwgXCJPdXR1YnJvXCIsIFwiTm92ZW1icm9cIiwgXCJEZXplbWJyb1wiXG5cdFx0XHRcdF0sXG5cdFx0XHRcdGRheU9mV2Vla1Nob3J0OiBbXG5cdFx0XHRcdFx0XCJEb21cIiwgXCJTZWdcIiwgXCJUZXJcIiwgXCJRdWFcIiwgXCJRdWlcIiwgXCJTZXhcIiwgXCJTYWJcIlxuXHRcdFx0XHRdLFxuXHRcdFx0XHRkYXlPZldlZWs6IFtcIkRvbWluZ29cIiwgXCJTZWd1bmRhXCIsIFwiVGVyw6dhXCIsIFwiUXVhcnRhXCIsIFwiUXVpbnRhXCIsIFwiU2V4dGFcIiwgXCJTw6FiYWRvXCJdXG5cdFx0XHR9LFxuXHRcdFx0Y2g6IHsgLy8gU2ltcGxpZmllZCBDaGluZXNlXG5cdFx0XHRcdG1vbnRoczogW1xuXHRcdFx0XHRcdFwi5LiA5pyIXCIsIFwi5LqM5pyIXCIsIFwi5LiJ5pyIXCIsIFwi5Zub5pyIXCIsIFwi5LqU5pyIXCIsIFwi5YWt5pyIXCIsIFwi5LiD5pyIXCIsIFwi5YWr5pyIXCIsIFwi5Lmd5pyIXCIsIFwi5Y2B5pyIXCIsIFwi5Y2B5LiA5pyIXCIsIFwi5Y2B5LqM5pyIXCJcblx0XHRcdFx0XSxcblx0XHRcdFx0ZGF5T2ZXZWVrU2hvcnQ6IFtcblx0XHRcdFx0XHRcIuaXpVwiLCBcIuS4gFwiLCBcIuS6jFwiLCBcIuS4iVwiLCBcIuWbm1wiLCBcIuS6lFwiLCBcIuWFrVwiXG5cdFx0XHRcdF1cblx0XHRcdH0sXG5cdFx0XHRzZTogeyAvLyBTd2VkaXNoXG5cdFx0XHRcdG1vbnRoczogW1xuXHRcdFx0XHRcdFwiSmFudWFyaVwiLCBcIkZlYnJ1YXJpXCIsIFwiTWFyc1wiLCBcIkFwcmlsXCIsIFwiTWFqXCIsIFwiSnVuaVwiLCBcIkp1bGlcIiwgXCJBdWd1c3RpXCIsIFwiU2VwdGVtYmVyXCIsICBcIk9rdG9iZXJcIiwgXCJOb3ZlbWJlclwiLCBcIkRlY2VtYmVyXCJcblx0XHRcdFx0XSxcblx0XHRcdFx0ZGF5T2ZXZWVrU2hvcnQ6IFtcblx0XHRcdFx0XHRcIlPDtm5cIiwgXCJNw6VuXCIsIFwiVGlzXCIsIFwiT25zXCIsIFwiVG9yXCIsIFwiRnJlXCIsIFwiTMO2clwiXG5cdFx0XHRcdF1cblx0XHRcdH0sXG5cdFx0XHRrbTogeyAvLyBLaG1lciAo4Z6X4Z624Z6f4Z624Z6B4Z+S4Z6Y4Z+C4Z6aKVxuXHRcdFx0XHRtb250aHM6IFtcblx0XHRcdFx0XHRcIuGemOGegOGemuGetuKAi1wiLCBcIuGegOGeu+GemOGfkuGel+GfiFwiLCBcIuGemOGet+Gek+GetuKAi1wiLCBcIuGemOGfgeGen+GetuKAi1wiLCBcIuGep+Gen+Gel+GetuKAi1wiLCBcIuGemOGet+GekOGeu+Gek+GetuKAi1wiLCBcIuGegOGegOGfkuGegOGeiuGetuKAi1wiLCBcIuGen+GeuOGeoOGetuKAi1wiLCBcIuGegOGeieGfkuGeieGetuKAi1wiLCBcIuGej+Geu+Gem+GetuKAi1wiLCBcIuGenOGet+GeheGfkuGehuGet+GegOGetlwiLCBcIuGekuGfkuGek+GevOKAi1wiXG5cdFx0XHRcdF0sXG5cdFx0XHRcdGRheU9mV2Vla1Nob3J0OiBbXCLhnqLhnrbhnpHhnrfigItcIiwgXCLhnoXhn5DhnpPhn5LhnpHigItcIiwgXCLhnqLhnoThn5LhnoLhnrbhnprigItcIiwgXCLhnpbhnrvhnpLigItcIiwgXCLhnpbhn5LhnprhnqDigIvigItcIiwgXCLhnp/hnrvhnoDhn5LhnprigItcIiwgXCLhnp/hn4Xhnprhn41cIl0sXG5cdFx0XHRcdGRheU9mV2VlazogW1wi4Z6i4Z624Z6R4Z634Z6P4Z+S4Z6Z4oCLXCIsIFwi4Z6F4Z+Q4Z6T4Z+S4Z6R4oCLXCIsIFwi4Z6i4Z6E4Z+S4Z6C4Z624Z6a4oCLXCIsIFwi4Z6W4Z674Z6S4oCLXCIsIFwi4Z6W4Z+S4Z6a4Z6g4Z6f4Z+S4Z6U4Z6P4Z634Z+N4oCLXCIsIFwi4Z6f4Z674Z6A4Z+S4Z6a4oCLXCIsIFwi4Z6f4Z+F4Z6a4Z+NXCJdXG5cdFx0XHR9LFxuXHRcdFx0a3I6IHsgLy8gS29yZWFuXG5cdFx0XHRcdG1vbnRoczogW1xuXHRcdFx0XHRcdFwiMeyblFwiLCBcIjLsm5RcIiwgXCIz7JuUXCIsIFwiNOyblFwiLCBcIjXsm5RcIiwgXCI27JuUXCIsIFwiN+yblFwiLCBcIjjsm5RcIiwgXCI57JuUXCIsIFwiMTDsm5RcIiwgXCIxMeyblFwiLCBcIjEy7JuUXCJcblx0XHRcdFx0XSxcblx0XHRcdFx0ZGF5T2ZXZWVrU2hvcnQ6IFtcblx0XHRcdFx0XHRcIuydvFwiLCBcIuyblFwiLCBcIu2ZlFwiLCBcIuyImFwiLCBcIuuqqVwiLCBcIuq4iFwiLCBcIu2GoFwiXG5cdFx0XHRcdF0sXG5cdFx0XHRcdGRheU9mV2VlazogW1wi7J287JqU7J28XCIsIFwi7JuU7JqU7J28XCIsIFwi7ZmU7JqU7J28XCIsIFwi7IiY7JqU7J28XCIsIFwi66qp7JqU7J28XCIsIFwi6riI7JqU7J28XCIsIFwi7Yag7JqU7J28XCJdXG5cdFx0XHR9LFxuXHRcdFx0aXQ6IHsgLy8gSXRhbGlhblxuXHRcdFx0XHRtb250aHM6IFtcblx0XHRcdFx0XHRcIkdlbm5haW9cIiwgXCJGZWJicmFpb1wiLCBcIk1hcnpvXCIsIFwiQXByaWxlXCIsIFwiTWFnZ2lvXCIsIFwiR2l1Z25vXCIsIFwiTHVnbGlvXCIsIFwiQWdvc3RvXCIsIFwiU2V0dGVtYnJlXCIsIFwiT3R0b2JyZVwiLCBcIk5vdmVtYnJlXCIsIFwiRGljZW1icmVcIlxuXHRcdFx0XHRdLFxuXHRcdFx0XHRkYXlPZldlZWtTaG9ydDogW1xuXHRcdFx0XHRcdFwiRG9tXCIsIFwiTHVuXCIsIFwiTWFyXCIsIFwiTWVyXCIsIFwiR2lvXCIsIFwiVmVuXCIsIFwiU2FiXCJcblx0XHRcdFx0XSxcblx0XHRcdFx0ZGF5T2ZXZWVrOiBbXCJEb21lbmljYVwiLCBcIkx1bmVkw6xcIiwgXCJNYXJ0ZWTDrFwiLCBcIk1lcmNvbGVkw6xcIiwgXCJHaW92ZWTDrFwiLCBcIlZlbmVyZMOsXCIsIFwiU2FiYXRvXCJdXG5cdFx0XHR9LFxuXHRcdFx0ZGE6IHsgLy8gRGFuc2tcblx0XHRcdFx0bW9udGhzOiBbXG5cdFx0XHRcdFx0XCJKYW51YXJcIiwgXCJGZWJydWFyXCIsIFwiTWFydHNcIiwgXCJBcHJpbFwiLCBcIk1halwiLCBcIkp1bmlcIiwgXCJKdWxpXCIsIFwiQXVndXN0XCIsIFwiU2VwdGVtYmVyXCIsIFwiT2t0b2JlclwiLCBcIk5vdmVtYmVyXCIsIFwiRGVjZW1iZXJcIlxuXHRcdFx0XHRdLFxuXHRcdFx0XHRkYXlPZldlZWtTaG9ydDogW1xuXHRcdFx0XHRcdFwiU8O4blwiLCBcIk1hblwiLCBcIlRpclwiLCBcIk9uc1wiLCBcIlRvclwiLCBcIkZyZVwiLCBcIkzDuHJcIlxuXHRcdFx0XHRdLFxuXHRcdFx0XHRkYXlPZldlZWs6IFtcInPDuG5kYWdcIiwgXCJtYW5kYWdcIiwgXCJ0aXJzZGFnXCIsIFwib25zZGFnXCIsIFwidG9yc2RhZ1wiLCBcImZyZWRhZ1wiLCBcImzDuHJkYWdcIl1cblx0XHRcdH0sXG5cdFx0XHRubzogeyAvLyBOb3J3ZWdpYW5cblx0XHRcdFx0bW9udGhzOiBbXG5cdFx0XHRcdFx0XCJKYW51YXJcIiwgXCJGZWJydWFyXCIsIFwiTWFyc1wiLCBcIkFwcmlsXCIsIFwiTWFpXCIsIFwiSnVuaVwiLCBcIkp1bGlcIiwgXCJBdWd1c3RcIiwgXCJTZXB0ZW1iZXJcIiwgXCJPa3RvYmVyXCIsIFwiTm92ZW1iZXJcIiwgXCJEZXNlbWJlclwiXG5cdFx0XHRcdF0sXG5cdFx0XHRcdGRheU9mV2Vla1Nob3J0OiBbXG5cdFx0XHRcdFx0XCJTw7huXCIsIFwiTWFuXCIsIFwiVGlyXCIsIFwiT25zXCIsIFwiVG9yXCIsIFwiRnJlXCIsIFwiTMO4clwiXG5cdFx0XHRcdF0sXG5cdFx0XHRcdGRheU9mV2VlazogWydTw7huZGFnJywgJ01hbmRhZycsICdUaXJzZGFnJywgJ09uc2RhZycsICdUb3JzZGFnJywgJ0ZyZWRhZycsICdMw7hyZGFnJ11cblx0XHRcdH0sXG5cdFx0XHRqYTogeyAvLyBKYXBhbmVzZVxuXHRcdFx0XHRtb250aHM6IFtcblx0XHRcdFx0XHRcIjHmnIhcIiwgXCIy5pyIXCIsIFwiM+aciFwiLCBcIjTmnIhcIiwgXCI15pyIXCIsIFwiNuaciFwiLCBcIjfmnIhcIiwgXCI45pyIXCIsIFwiOeaciFwiLCBcIjEw5pyIXCIsIFwiMTHmnIhcIiwgXCIxMuaciFwiXG5cdFx0XHRcdF0sXG5cdFx0XHRcdGRheU9mV2Vla1Nob3J0OiBbXG5cdFx0XHRcdFx0XCLml6VcIiwgXCLmnIhcIiwgXCLngatcIiwgXCLmsLRcIiwgXCLmnKhcIiwgXCLph5FcIiwgXCLlnJ9cIlxuXHRcdFx0XHRdLFxuXHRcdFx0XHRkYXlPZldlZWs6IFtcIuaXpeabnFwiLCBcIuaciOabnFwiLCBcIueBq+abnFwiLCBcIuawtOabnFwiLCBcIuacqOabnFwiLCBcIumHkeabnFwiLCBcIuWcn+abnFwiXVxuXHRcdFx0fSxcblx0XHRcdHZpOiB7IC8vIFZpZXRuYW1lc2Vcblx0XHRcdFx0bW9udGhzOiBbXG5cdFx0XHRcdFx0XCJUaMOhbmcgMVwiLCBcIlRow6FuZyAyXCIsIFwiVGjDoW5nIDNcIiwgXCJUaMOhbmcgNFwiLCBcIlRow6FuZyA1XCIsIFwiVGjDoW5nIDZcIiwgXCJUaMOhbmcgN1wiLCBcIlRow6FuZyA4XCIsIFwiVGjDoW5nIDlcIiwgXCJUaMOhbmcgMTBcIiwgXCJUaMOhbmcgMTFcIiwgXCJUaMOhbmcgMTJcIlxuXHRcdFx0XHRdLFxuXHRcdFx0XHRkYXlPZldlZWtTaG9ydDogW1xuXHRcdFx0XHRcdFwiQ05cIiwgXCJUMlwiLCBcIlQzXCIsIFwiVDRcIiwgXCJUNVwiLCBcIlQ2XCIsIFwiVDdcIlxuXHRcdFx0XHRdLFxuXHRcdFx0XHRkYXlPZldlZWs6IFtcIkNo4bunIG5o4bqtdFwiLCBcIlRo4bupIGhhaVwiLCBcIlRo4bupIGJhXCIsIFwiVGjhu6kgdMawXCIsIFwiVGjhu6kgbsSDbVwiLCBcIlRo4bupIHPDoXVcIiwgXCJUaOG7qSBi4bqjeVwiXVxuXHRcdFx0fSxcblx0XHRcdHNsOiB7IC8vIFNsb3ZlbsWhxI1pbmFcblx0XHRcdFx0bW9udGhzOiBbXG5cdFx0XHRcdFx0XCJKYW51YXJcIiwgXCJGZWJydWFyXCIsIFwiTWFyZWNcIiwgXCJBcHJpbFwiLCBcIk1halwiLCBcIkp1bmlqXCIsIFwiSnVsaWpcIiwgXCJBdmd1c3RcIiwgXCJTZXB0ZW1iZXJcIiwgXCJPa3RvYmVyXCIsIFwiTm92ZW1iZXJcIiwgXCJEZWNlbWJlclwiXG5cdFx0XHRcdF0sXG5cdFx0XHRcdGRheU9mV2Vla1Nob3J0OiBbXG5cdFx0XHRcdFx0XCJOZWRcIiwgXCJQb25cIiwgXCJUb3JcIiwgXCJTcmVcIiwgXCLEjGV0XCIsIFwiUGV0XCIsIFwiU29iXCJcblx0XHRcdFx0XSxcblx0XHRcdFx0ZGF5T2ZXZWVrOiBbXCJOZWRlbGphXCIsIFwiUG9uZWRlbGpla1wiLCBcIlRvcmVrXCIsIFwiU3JlZGFcIiwgXCLEjGV0cnRla1wiLCBcIlBldGVrXCIsIFwiU29ib3RhXCJdXG5cdFx0XHR9LFxuXHRcdFx0Y3M6IHsgLy8gxIxlxaF0aW5hXG5cdFx0XHRcdG1vbnRoczogW1xuXHRcdFx0XHRcdFwiTGVkZW5cIiwgXCLDmm5vclwiLCBcIkLFmWV6ZW5cIiwgXCJEdWJlblwiLCBcIkt2xJt0ZW5cIiwgXCLEjGVydmVuXCIsIFwixIxlcnZlbmVjXCIsIFwiU3JwZW5cIiwgXCJaw6HFmcOtXCIsIFwixZjDrWplblwiLCBcIkxpc3RvcGFkXCIsIFwiUHJvc2luZWNcIlxuXHRcdFx0XHRdLFxuXHRcdFx0XHRkYXlPZldlZWtTaG9ydDogW1xuXHRcdFx0XHRcdFwiTmVcIiwgXCJQb1wiLCBcIsOadFwiLCBcIlN0XCIsIFwixIx0XCIsIFwiUMOhXCIsIFwiU29cIlxuXHRcdFx0XHRdXG5cdFx0XHR9LFxuXHRcdFx0aHU6IHsgLy8gSHVuZ2FyaWFuXG5cdFx0XHRcdG1vbnRoczogW1xuXHRcdFx0XHRcdFwiSmFudcOhclwiLCBcIkZlYnJ1w6FyXCIsIFwiTcOhcmNpdXNcIiwgXCLDgXByaWxpc1wiLCBcIk3DoWp1c1wiLCBcIkrDum5pdXNcIiwgXCJKw7psaXVzXCIsIFwiQXVndXN6dHVzXCIsIFwiU3plcHRlbWJlclwiLCBcIk9rdMOzYmVyXCIsIFwiTm92ZW1iZXJcIiwgXCJEZWNlbWJlclwiXG5cdFx0XHRcdF0sXG5cdFx0XHRcdGRheU9mV2Vla1Nob3J0OiBbXG5cdFx0XHRcdFx0XCJWYVwiLCBcIkjDqVwiLCBcIktlXCIsIFwiU3plXCIsIFwiQ3NcIiwgXCJQw6lcIiwgXCJTem9cIlxuXHRcdFx0XHRdLFxuXHRcdFx0XHRkYXlPZldlZWs6IFtcInZhc8Ohcm5hcFwiLCBcImjDqXRmxZFcIiwgXCJrZWRkXCIsIFwic3plcmRhXCIsIFwiY3PDvHTDtnJ0w7ZrXCIsIFwicMOpbnRla1wiLCBcInN6b21iYXRcIl1cblx0XHRcdH0sXG5cdFx0XHRhejogeyAvL0F6ZXJiYWlqYW5pYW4gKEF6ZXJpKVxuXHRcdFx0XHRtb250aHM6IFtcblx0XHRcdFx0XHRcIllhbnZhclwiLCBcIkZldnJhbFwiLCBcIk1hcnRcIiwgXCJBcHJlbFwiLCBcIk1heVwiLCBcIkl5dW5cIiwgXCJJeXVsXCIsIFwiQXZxdXN0XCIsIFwiU2VudHlhYnJcIiwgXCJPa3R5YWJyXCIsIFwiTm95YWJyXCIsIFwiRGVrYWJyXCJcblx0XHRcdFx0XSxcblx0XHRcdFx0ZGF5T2ZXZWVrU2hvcnQ6IFtcblx0XHRcdFx0XHRcIkJcIiwgXCJCZVwiLCBcIsOHYVwiLCBcIsOHXCIsIFwiQ2FcIiwgXCJDXCIsIFwixZ5cIlxuXHRcdFx0XHRdLFxuXHRcdFx0XHRkYXlPZldlZWs6IFtcIkJhemFyXCIsIFwiQmF6YXIgZXJ0yZlzaVwiLCBcIsOHyZlyxZ/JmW5iyZkgYXjFn2FtxLFcIiwgXCLDh8mZcsWfyZluYsmZXCIsIFwiQ8O8bcmZIGF4xZ9hbcSxXCIsIFwiQ8O8bcmZXCIsIFwixZ7JmW5iyZlcIl1cblx0XHRcdH0sXG5cdFx0XHRiczogeyAvL0Jvc2Fuc2tpXG5cdFx0XHRcdG1vbnRoczogW1xuXHRcdFx0XHRcdFwiSmFudWFyXCIsIFwiRmVicnVhclwiLCBcIk1hcnRcIiwgXCJBcHJpbFwiLCBcIk1halwiLCBcIkp1blwiLCBcIkp1bFwiLCBcIkF2Z3VzdFwiLCBcIlNlcHRlbWJhclwiLCBcIk9rdG9iYXJcIiwgXCJOb3ZlbWJhclwiLCBcIkRlY2VtYmFyXCJcblx0XHRcdFx0XSxcblx0XHRcdFx0ZGF5T2ZXZWVrU2hvcnQ6IFtcblx0XHRcdFx0XHRcIk5lZFwiLCBcIlBvblwiLCBcIlV0b1wiLCBcIlNyaVwiLCBcIsSMZXRcIiwgXCJQZXRcIiwgXCJTdWJcIlxuXHRcdFx0XHRdLFxuXHRcdFx0XHRkYXlPZldlZWs6IFtcIk5lZGplbGphXCIsXCJQb25lZGplbGpha1wiLCBcIlV0b3Jha1wiLCBcIlNyaWplZGFcIiwgXCLEjGV0dnJ0YWtcIiwgXCJQZXRha1wiLCBcIlN1Ym90YVwiXVxuXHRcdFx0fSxcblx0XHRcdGNhOiB7IC8vQ2F0YWzDoFxuXHRcdFx0XHRtb250aHM6IFtcblx0XHRcdFx0XHRcIkdlbmVyXCIsIFwiRmVicmVyXCIsIFwiTWFyw6dcIiwgXCJBYnJpbFwiLCBcIk1haWdcIiwgXCJKdW55XCIsIFwiSnVsaW9sXCIsIFwiQWdvc3RcIiwgXCJTZXRlbWJyZVwiLCBcIk9jdHVicmVcIiwgXCJOb3ZlbWJyZVwiLCBcIkRlc2VtYnJlXCJcblx0XHRcdFx0XSxcblx0XHRcdFx0ZGF5T2ZXZWVrU2hvcnQ6IFtcblx0XHRcdFx0XHRcIkRnXCIsIFwiRGxcIiwgXCJEdFwiLCBcIkRjXCIsIFwiRGpcIiwgXCJEdlwiLCBcIkRzXCJcblx0XHRcdFx0XSxcblx0XHRcdFx0ZGF5T2ZXZWVrOiBbXCJEaXVtZW5nZVwiLCBcIkRpbGx1bnNcIiwgXCJEaW1hcnRzXCIsIFwiRGltZWNyZXNcIiwgXCJEaWpvdXNcIiwgXCJEaXZlbmRyZXNcIiwgXCJEaXNzYWJ0ZVwiXVxuXHRcdFx0fSxcblx0XHRcdCdlbi1HQic6IHsgLy9FbmdsaXNoIChCcml0aXNoKVxuXHRcdFx0XHRtb250aHM6IFtcblx0XHRcdFx0XHRcIkphbnVhcnlcIiwgXCJGZWJydWFyeVwiLCBcIk1hcmNoXCIsIFwiQXByaWxcIiwgXCJNYXlcIiwgXCJKdW5lXCIsIFwiSnVseVwiLCBcIkF1Z3VzdFwiLCBcIlNlcHRlbWJlclwiLCBcIk9jdG9iZXJcIiwgXCJOb3ZlbWJlclwiLCBcIkRlY2VtYmVyXCJcblx0XHRcdFx0XSxcblx0XHRcdFx0ZGF5T2ZXZWVrU2hvcnQ6IFtcblx0XHRcdFx0XHRcIlN1blwiLCBcIk1vblwiLCBcIlR1ZVwiLCBcIldlZFwiLCBcIlRodVwiLCBcIkZyaVwiLCBcIlNhdFwiXG5cdFx0XHRcdF0sXG5cdFx0XHRcdGRheU9mV2VlazogW1wiU3VuZGF5XCIsIFwiTW9uZGF5XCIsIFwiVHVlc2RheVwiLCBcIldlZG5lc2RheVwiLCBcIlRodXJzZGF5XCIsIFwiRnJpZGF5XCIsIFwiU2F0dXJkYXlcIl1cblx0XHRcdH0sXG5cdFx0XHRldDogeyAvL1wiRWVzdGlcIlxuXHRcdFx0XHRtb250aHM6IFtcblx0XHRcdFx0XHRcIkphYW51YXJcIiwgXCJWZWVicnVhclwiLCBcIk3DpHJ0c1wiLCBcIkFwcmlsbFwiLCBcIk1haVwiLCBcIkp1dW5pXCIsIFwiSnV1bGlcIiwgXCJBdWd1c3RcIiwgXCJTZXB0ZW1iZXJcIiwgXCJPa3Rvb2JlclwiLCBcIk5vdmVtYmVyXCIsIFwiRGV0c2VtYmVyXCJcblx0XHRcdFx0XSxcblx0XHRcdFx0ZGF5T2ZXZWVrU2hvcnQ6IFtcblx0XHRcdFx0XHRcIlBcIiwgXCJFXCIsIFwiVFwiLCBcIktcIiwgXCJOXCIsIFwiUlwiLCBcIkxcIlxuXHRcdFx0XHRdLFxuXHRcdFx0XHRkYXlPZldlZWs6IFtcIlDDvGhhcMOkZXZcIiwgXCJFc21hc3DDpGV2XCIsIFwiVGVpc2lww6RldlwiLCBcIktvbG1hcMOkZXZcIiwgXCJOZWxqYXDDpGV2XCIsIFwiUmVlZGVcIiwgXCJMYXVww6RldlwiXVxuXHRcdFx0fSxcblx0XHRcdGV1OiB7IC8vRXVza2FyYVxuXHRcdFx0XHRtb250aHM6IFtcblx0XHRcdFx0XHRcIlVydGFycmlsYVwiLCBcIk90c2FpbGFcIiwgXCJNYXJ0eG9hXCIsIFwiQXBpcmlsYVwiLCBcIk1haWF0emFcIiwgXCJFa2FpbmFcIiwgXCJVenRhaWxhXCIsIFwiQWJ1enR1YVwiLCBcIklyYWlsYVwiLCBcIlVycmlhXCIsIFwiQXphcm9hXCIsIFwiQWJlbmR1YVwiXG5cdFx0XHRcdF0sXG5cdFx0XHRcdGRheU9mV2Vla1Nob3J0OiBbXG5cdFx0XHRcdFx0XCJJZy5cIiwgXCJBbC5cIiwgXCJBci5cIiwgXCJBei5cIiwgXCJPZy5cIiwgXCJPci5cIiwgXCJMYS5cIlxuXHRcdFx0XHRdLFxuXHRcdFx0XHRkYXlPZldlZWs6IFsnSWdhbmRlYScsICdBc3RlbGVoZW5hJywgJ0FzdGVhcnRlYScsICdBc3RlYXprZW5hJywgJ09zdGVndW5hJywgJ09zdGlyYWxhJywgJ0xhcnVuYmF0YSddXG5cdFx0XHR9LFxuXHRcdFx0Zmk6IHsgLy9GaW5uaXNoIChTdW9taSlcblx0XHRcdFx0bW9udGhzOiBbXG5cdFx0XHRcdFx0XCJUYW1taWt1dVwiLCBcIkhlbG1pa3V1XCIsIFwiTWFhbGlza3V1XCIsIFwiSHVodGlrdXVcIiwgXCJUb3Vrb2t1dVwiLCBcIktlc8Oka3V1XCIsIFwiSGVpbsOka3V1XCIsIFwiRWxva3V1XCIsIFwiU3l5c2t1dVwiLCBcIkxva2FrdXVcIiwgXCJNYXJyYXNrdXVcIiwgXCJKb3VsdWt1dVwiXG5cdFx0XHRcdF0sXG5cdFx0XHRcdGRheU9mV2Vla1Nob3J0OiBbXG5cdFx0XHRcdFx0XCJTdVwiLCBcIk1hXCIsIFwiVGlcIiwgXCJLZVwiLCBcIlRvXCIsIFwiUGVcIiwgXCJMYVwiXG5cdFx0XHRcdF0sXG5cdFx0XHRcdGRheU9mV2VlazogW1wic3VubnVudGFpXCIsIFwibWFhbmFudGFpXCIsIFwidGlpc3RhaVwiLCBcImtlc2tpdmlpa2tvXCIsIFwidG9yc3RhaVwiLCBcInBlcmphbnRhaVwiLCBcImxhdWFudGFpXCJdXG5cdFx0XHR9LFxuXHRcdFx0Z2w6IHsgLy9HYWxlZ29cblx0XHRcdFx0bW9udGhzOiBbXG5cdFx0XHRcdFx0XCJYYW5cIiwgXCJGZWJcIiwgXCJNYXpcIiwgXCJBYnJcIiwgXCJNYWlcIiwgXCJYdW5cIiwgXCJYdWxcIiwgXCJBZ29cIiwgXCJTZXRcIiwgXCJPdXRcIiwgXCJOb3ZcIiwgXCJEZWNcIlxuXHRcdFx0XHRdLFxuXHRcdFx0XHRkYXlPZldlZWtTaG9ydDogW1xuXHRcdFx0XHRcdFwiRG9tXCIsIFwiTHVuXCIsIFwiTWFyXCIsIFwiTWVyXCIsIFwiWG92XCIsIFwiVmVuXCIsIFwiU2FiXCJcblx0XHRcdFx0XSxcblx0XHRcdFx0ZGF5T2ZXZWVrOiBbXCJEb21pbmdvXCIsIFwiTHVuc1wiLCBcIk1hcnRlc1wiLCBcIk3DqXJjb3Jlc1wiLCBcIlhvdmVzXCIsIFwiVmVucmVzXCIsIFwiU8OhYmFkb1wiXVxuXHRcdFx0fSxcblx0XHRcdGhyOiB7IC8vSHJ2YXRza2lcblx0XHRcdFx0bW9udGhzOiBbXG5cdFx0XHRcdFx0XCJTaWplxI1hbmpcIiwgXCJWZWxqYcSNYVwiLCBcIk/FvnVqYWtcIiwgXCJUcmF2YW5qXCIsIFwiU3ZpYmFualwiLCBcIkxpcGFualwiLCBcIlNycGFualwiLCBcIktvbG92b3pcIiwgXCJSdWphblwiLCBcIkxpc3RvcGFkXCIsIFwiU3R1ZGVuaVwiLCBcIlByb3NpbmFjXCJcblx0XHRcdFx0XSxcblx0XHRcdFx0ZGF5T2ZXZWVrU2hvcnQ6IFtcblx0XHRcdFx0XHRcIk5lZFwiLCBcIlBvblwiLCBcIlV0b1wiLCBcIlNyaVwiLCBcIsSMZXRcIiwgXCJQZXRcIiwgXCJTdWJcIlxuXHRcdFx0XHRdLFxuXHRcdFx0XHRkYXlPZldlZWs6IFtcIk5lZGplbGphXCIsIFwiUG9uZWRqZWxqYWtcIiwgXCJVdG9yYWtcIiwgXCJTcmlqZWRhXCIsIFwixIxldHZydGFrXCIsIFwiUGV0YWtcIiwgXCJTdWJvdGFcIl1cblx0XHRcdH0sXG5cdFx0XHRrbzogeyAvL0tvcmVhbiAo7ZWc6rWt7Ja0KVxuXHRcdFx0XHRtb250aHM6IFtcblx0XHRcdFx0XHRcIjHsm5RcIiwgXCIy7JuUXCIsIFwiM+yblFwiLCBcIjTsm5RcIiwgXCI17JuUXCIsIFwiNuyblFwiLCBcIjfsm5RcIiwgXCI47JuUXCIsIFwiOeyblFwiLCBcIjEw7JuUXCIsIFwiMTHsm5RcIiwgXCIxMuyblFwiXG5cdFx0XHRcdF0sXG5cdFx0XHRcdGRheU9mV2Vla1Nob3J0OiBbXG5cdFx0XHRcdFx0XCLsnbxcIiwgXCLsm5RcIiwgXCLtmZRcIiwgXCLsiJhcIiwgXCLrqqlcIiwgXCLquIhcIiwgXCLthqBcIlxuXHRcdFx0XHRdLFxuXHRcdFx0XHRkYXlPZldlZWs6IFtcIuydvOyalOydvFwiLCBcIuyblOyalOydvFwiLCBcIu2ZlOyalOydvFwiLCBcIuyImOyalOydvFwiLCBcIuuqqeyalOydvFwiLCBcIuq4iOyalOydvFwiLCBcIu2GoOyalOydvFwiXVxuXHRcdFx0fSxcblx0XHRcdGx0OiB7IC8vTGl0aHVhbmlhbiAobGlldHV2acWzKVxuXHRcdFx0XHRtb250aHM6IFtcblx0XHRcdFx0XHRcIlNhdXNpb1wiLCBcIlZhc2FyaW9cIiwgXCJLb3ZvXCIsIFwiQmFsYW5kxb5pb1wiLCBcIkdlZ3XFvsSXc1wiLCBcIkJpcsW+ZWxpb1wiLCBcIkxpZXBvc1wiLCBcIlJ1Z3BqxavEjWlvXCIsIFwiUnVnc8SXam9cIiwgXCJTcGFsaW9cIiwgXCJMYXBrcmnEjWlvXCIsIFwiR3J1b2TFvmlvXCJcblx0XHRcdFx0XSxcblx0XHRcdFx0ZGF5T2ZXZWVrU2hvcnQ6IFtcblx0XHRcdFx0XHRcIlNla1wiLCBcIlBpclwiLCBcIkFudFwiLCBcIlRyZVwiLCBcIktldFwiLCBcIlBlblwiLCBcIsWgZcWhXCJcblx0XHRcdFx0XSxcblx0XHRcdFx0ZGF5T2ZXZWVrOiBbXCJTZWttYWRpZW5pc1wiLCBcIlBpcm1hZGllbmlzXCIsIFwiQW50cmFkaWVuaXNcIiwgXCJUcmXEjWlhZGllbmlzXCIsIFwiS2V0dmlydGFkaWVuaXNcIiwgXCJQZW5rdGFkaWVuaXNcIiwgXCLFoGXFoXRhZGllbmlzXCJdXG5cdFx0XHR9LFxuXHRcdFx0bHY6IHsgLy9MYXR2aWFuIChMYXR2aWXFoXUpXG5cdFx0XHRcdG1vbnRoczogW1xuXHRcdFx0XHRcdFwiSmFudsSBcmlzXCIsIFwiRmVicnXEgXJpc1wiLCBcIk1hcnRzXCIsIFwiQXByxKtsaXMgXCIsIFwiTWFpanNcIiwgXCJKxatuaWpzXCIsIFwiSsWrbGlqc1wiLCBcIkF1Z3VzdHNcIiwgXCJTZXB0ZW1icmlzXCIsIFwiT2t0b2JyaXNcIiwgXCJOb3ZlbWJyaXNcIiwgXCJEZWNlbWJyaXNcIlxuXHRcdFx0XHRdLFxuXHRcdFx0XHRkYXlPZldlZWtTaG9ydDogW1xuXHRcdFx0XHRcdFwiU3ZcIiwgXCJQclwiLCBcIk90XCIsIFwiVHJcIiwgXCJDdFwiLCBcIlBrXCIsIFwiU3RcIlxuXHRcdFx0XHRdLFxuXHRcdFx0XHRkYXlPZldlZWs6IFtcIlN2xJN0ZGllbmFcIiwgXCJQaXJtZGllbmFcIiwgXCJPdHJkaWVuYVwiLCBcIlRyZcWhZGllbmFcIiwgXCJDZXR1cnRkaWVuYVwiLCBcIlBpZWt0ZGllbmFcIiwgXCJTZXN0ZGllbmFcIl1cblx0XHRcdH0sXG5cdFx0XHRtazogeyAvL01hY2Vkb25pYW4gKNCc0LDQutC10LTQvtC90YHQutC4KVxuXHRcdFx0XHRtb250aHM6IFtcblx0XHRcdFx0XHRcItGY0LDQvdGD0LDRgNC4XCIsIFwi0YTQtdCy0YDRg9Cw0YDQuFwiLCBcItC80LDRgNGCXCIsIFwi0LDQv9GA0LjQu1wiLCBcItC80LDRmFwiLCBcItGY0YPQvdC4XCIsIFwi0ZjRg9C70LhcIiwgXCLQsNCy0LPRg9GB0YJcIiwgXCLRgdC10L/RgtC10LzQstGA0LhcIiwgXCLQvtC60YLQvtC80LLRgNC4XCIsIFwi0L3QvtC10LzQstGA0LhcIiwgXCLQtNC10LrQtdC80LLRgNC4XCJcblx0XHRcdFx0XSxcblx0XHRcdFx0ZGF5T2ZXZWVrU2hvcnQ6IFtcblx0XHRcdFx0XHRcItC90LXQtFwiLCBcItC/0L7QvVwiLCBcItCy0YLQvlwiLCBcItGB0YDQtVwiLCBcItGH0LXRglwiLCBcItC/0LXRglwiLCBcItGB0LDQsVwiXG5cdFx0XHRcdF0sXG5cdFx0XHRcdGRheU9mV2VlazogW1wi0J3QtdC00LXQu9CwXCIsIFwi0J/QvtC90LXQtNC10LvQvdC40LpcIiwgXCLQktGC0L7RgNC90LjQulwiLCBcItCh0YDQtdC00LBcIiwgXCLQp9C10YLQstGA0YLQvtC6XCIsIFwi0J/QtdGC0L7QulwiLCBcItCh0LDQsdC+0YLQsFwiXVxuXHRcdFx0fSxcblx0XHRcdG1uOiB7IC8vTW9uZ29saWFuICjQnNC+0L3Qs9C+0LspXG5cdFx0XHRcdG1vbnRoczogW1xuXHRcdFx0XHRcdFwiMS3RgCDRgdCw0YBcIiwgXCIyLdGAINGB0LDRgFwiLCBcIjMt0YAg0YHQsNGAXCIsIFwiNC3RgCDRgdCw0YBcIiwgXCI1LdGAINGB0LDRgFwiLCBcIjYt0YAg0YHQsNGAXCIsIFwiNy3RgCDRgdCw0YBcIiwgXCI4LdGAINGB0LDRgFwiLCBcIjkt0YAg0YHQsNGAXCIsIFwiMTAt0YAg0YHQsNGAXCIsIFwiMTEt0YAg0YHQsNGAXCIsIFwiMTIt0YAg0YHQsNGAXCJcblx0XHRcdFx0XSxcblx0XHRcdFx0ZGF5T2ZXZWVrU2hvcnQ6IFtcblx0XHRcdFx0XHRcItCU0LDQslwiLCBcItCc0Y/Qs1wiLCBcItCb0YXQsFwiLCBcItCf0q/RgFwiLCBcItCR0YHQvVwiLCBcItCR0Y/QvFwiLCBcItCd0Y/QvFwiXG5cdFx0XHRcdF0sXG5cdFx0XHRcdGRheU9mV2VlazogW1wi0JTQsNCy0LDQsFwiLCBcItCc0Y/Qs9C80LDRgFwiLCBcItCb0YXQsNCz0LLQsFwiLCBcItCf0q/RgNGN0LJcIiwgXCLQkdCw0LDRgdCw0L1cIiwgXCLQkdGP0LzQsdCwXCIsIFwi0J3Rj9C8XCJdXG5cdFx0XHR9LFxuXHRcdFx0J3B0LUJSJzogeyAvL1BvcnR1Z3XDqnMoQnJhc2lsKVxuXHRcdFx0XHRtb250aHM6IFtcblx0XHRcdFx0XHRcIkphbmVpcm9cIiwgXCJGZXZlcmVpcm9cIiwgXCJNYXLDp29cIiwgXCJBYnJpbFwiLCBcIk1haW9cIiwgXCJKdW5ob1wiLCBcIkp1bGhvXCIsIFwiQWdvc3RvXCIsIFwiU2V0ZW1icm9cIiwgXCJPdXR1YnJvXCIsIFwiTm92ZW1icm9cIiwgXCJEZXplbWJyb1wiXG5cdFx0XHRcdF0sXG5cdFx0XHRcdGRheU9mV2Vla1Nob3J0OiBbXG5cdFx0XHRcdFx0XCJEb21cIiwgXCJTZWdcIiwgXCJUZXJcIiwgXCJRdWFcIiwgXCJRdWlcIiwgXCJTZXhcIiwgXCJTw6FiXCJcblx0XHRcdFx0XSxcblx0XHRcdFx0ZGF5T2ZXZWVrOiBbXCJEb21pbmdvXCIsIFwiU2VndW5kYVwiLCBcIlRlcsOnYVwiLCBcIlF1YXJ0YVwiLCBcIlF1aW50YVwiLCBcIlNleHRhXCIsIFwiU8OhYmFkb1wiXVxuXHRcdFx0fSxcblx0XHRcdHNrOiB7IC8vU2xvdmVuxI1pbmFcblx0XHRcdFx0bW9udGhzOiBbXG5cdFx0XHRcdFx0XCJKYW51w6FyXCIsIFwiRmVicnXDoXJcIiwgXCJNYXJlY1wiLCBcIkFwcsOtbFwiLCBcIk3DoWpcIiwgXCJKw7puXCIsIFwiSsO6bFwiLCBcIkF1Z3VzdFwiLCBcIlNlcHRlbWJlclwiLCBcIk9rdMOzYmVyXCIsIFwiTm92ZW1iZXJcIiwgXCJEZWNlbWJlclwiXG5cdFx0XHRcdF0sXG5cdFx0XHRcdGRheU9mV2Vla1Nob3J0OiBbXG5cdFx0XHRcdFx0XCJOZVwiLCBcIlBvXCIsIFwiVXRcIiwgXCJTdFwiLCBcIsWgdFwiLCBcIlBpXCIsIFwiU29cIlxuXHRcdFx0XHRdLFxuXHRcdFx0XHRkYXlPZldlZWs6IFtcIk5lZGXEvmFcIiwgXCJQb25kZWxva1wiLCBcIlV0b3Jva1wiLCBcIlN0cmVkYVwiLCBcIsWgdHZydG9rXCIsIFwiUGlhdG9rXCIsIFwiU29ib3RhXCJdXG5cdFx0XHR9LFxuXHRcdFx0c3E6IHsgLy9BbGJhbmlhbiAoU2hxaXApXG5cdFx0XHRcdG1vbnRoczogW1xuXHRcdFx0XHRcdFwiSmFuYXJcIiwgXCJTaGt1cnRcIiwgXCJNYXJzXCIsIFwiUHJpbGxcIiwgXCJNYWpcIiwgXCJRZXJzaG9yXCIsIFwiS29ycmlrXCIsIFwiR3VzaHRcIiwgXCJTaHRhdG9yXCIsIFwiVGV0b3JcIiwgXCJOw6tudG9yXCIsIFwiRGhqZXRvclwiXG5cdFx0XHRcdF0sXG5cdFx0XHRcdGRheU9mV2Vla1Nob3J0OiBbXG5cdFx0XHRcdFx0XCJEaWVcIiwgXCJIw6tuXCIsIFwiTWFyXCIsIFwiTcOrclwiLCBcIkVualwiLCBcIlByZVwiLCBcIlNodHVcIlxuXHRcdFx0XHRdLFxuXHRcdFx0XHRkYXlPZldlZWs6IFtcIkUgRGllbFwiLCBcIkUgSMOrbsOrXCIsIFwiRSBNYXJ0xJNcIiwgXCJFIE3Dq3JrdXLDq1wiLCBcIkUgRW5qdGVcIiwgXCJFIFByZW10ZVwiLCBcIkUgU2h0dW7Dq1wiXVxuXHRcdFx0fSxcblx0XHRcdCdzci1ZVSc6IHsgLy9TZXJiaWFuIChTcnBza2kpXG5cdFx0XHRcdG1vbnRoczogW1xuXHRcdFx0XHRcdFwiSmFudWFyXCIsIFwiRmVicnVhclwiLCBcIk1hcnRcIiwgXCJBcHJpbFwiLCBcIk1halwiLCBcIkp1blwiLCBcIkp1bFwiLCBcIkF2Z3VzdFwiLCBcIlNlcHRlbWJhclwiLCBcIk9rdG9iYXJcIiwgXCJOb3ZlbWJhclwiLCBcIkRlY2VtYmFyXCJcblx0XHRcdFx0XSxcblx0XHRcdFx0ZGF5T2ZXZWVrU2hvcnQ6IFtcblx0XHRcdFx0XHRcIk5lZFwiLCBcIlBvblwiLCBcIlV0b1wiLCBcIlNyZVwiLCBcIsSNZXRcIiwgXCJQZXRcIiwgXCJTdWJcIlxuXHRcdFx0XHRdLFxuXHRcdFx0XHRkYXlPZldlZWs6IFtcIk5lZGVsamFcIixcIlBvbmVkZWxqYWtcIiwgXCJVdG9yYWtcIiwgXCJTcmVkYVwiLCBcIsSMZXR2cnRha1wiLCBcIlBldGFrXCIsIFwiU3Vib3RhXCJdXG5cdFx0XHR9LFxuXHRcdFx0c3I6IHsgLy9TZXJiaWFuIEN5cmlsbGljICjQodGA0L/RgdC60LgpXG5cdFx0XHRcdG1vbnRoczogW1xuXHRcdFx0XHRcdFwi0ZjQsNC90YPQsNGAXCIsIFwi0YTQtdCx0YDRg9Cw0YBcIiwgXCLQvNCw0YDRglwiLCBcItCw0L/RgNC40LtcIiwgXCLQvNCw0ZhcIiwgXCLRmNGD0L1cIiwgXCLRmNGD0LtcIiwgXCLQsNCy0LPRg9GB0YJcIiwgXCLRgdC10L/RgtC10LzQsdCw0YBcIiwgXCLQvtC60YLQvtCx0LDRgFwiLCBcItC90L7QstC10LzQsdCw0YBcIiwgXCLQtNC10YbQtdC80LHQsNGAXCJcblx0XHRcdFx0XSxcblx0XHRcdFx0ZGF5T2ZXZWVrU2hvcnQ6IFtcblx0XHRcdFx0XHRcItC90LXQtFwiLCBcItC/0L7QvVwiLCBcItGD0YLQvlwiLCBcItGB0YDQtVwiLCBcItGH0LXRglwiLCBcItC/0LXRglwiLCBcItGB0YPQsVwiXG5cdFx0XHRcdF0sXG5cdFx0XHRcdGRheU9mV2VlazogW1wi0J3QtdC00LXRmdCwXCIsXCLQn9C+0L3QtdC00LXRmdCw0LpcIiwgXCLQo9GC0L7RgNCw0LpcIiwgXCLQodGA0LXQtNCwXCIsIFwi0KfQtdGC0LLRgNGC0LDQulwiLCBcItCf0LXRgtCw0LpcIiwgXCLQodGD0LHQvtGC0LBcIl1cblx0XHRcdH0sXG5cdFx0XHRzdjogeyAvL1N2ZW5za2Fcblx0XHRcdFx0bW9udGhzOiBbXG5cdFx0XHRcdFx0XCJKYW51YXJpXCIsIFwiRmVicnVhcmlcIiwgXCJNYXJzXCIsIFwiQXByaWxcIiwgXCJNYWpcIiwgXCJKdW5pXCIsIFwiSnVsaVwiLCBcIkF1Z3VzdGlcIiwgXCJTZXB0ZW1iZXJcIiwgXCJPa3RvYmVyXCIsIFwiTm92ZW1iZXJcIiwgXCJEZWNlbWJlclwiXG5cdFx0XHRcdF0sXG5cdFx0XHRcdGRheU9mV2Vla1Nob3J0OiBbXG5cdFx0XHRcdFx0XCJTw7ZuXCIsIFwiTcOlblwiLCBcIlRpc1wiLCBcIk9uc1wiLCBcIlRvclwiLCBcIkZyZVwiLCBcIkzDtnJcIlxuXHRcdFx0XHRdLFxuXHRcdFx0XHRkYXlPZldlZWs6IFtcIlPDtm5kYWdcIiwgXCJNw6VuZGFnXCIsIFwiVGlzZGFnXCIsIFwiT25zZGFnXCIsIFwiVG9yc2RhZ1wiLCBcIkZyZWRhZ1wiLCBcIkzDtnJkYWdcIl1cblx0XHRcdH0sXG5cdFx0XHQnemgtVFcnOiB7IC8vVHJhZGl0aW9uYWwgQ2hpbmVzZSAo57mB6auU5Lit5paHKVxuXHRcdFx0XHRtb250aHM6IFtcblx0XHRcdFx0XHRcIuS4gOaciFwiLCBcIuS6jOaciFwiLCBcIuS4ieaciFwiLCBcIuWbm+aciFwiLCBcIuS6lOaciFwiLCBcIuWFreaciFwiLCBcIuS4g+aciFwiLCBcIuWFq+aciFwiLCBcIuS5neaciFwiLCBcIuWNgeaciFwiLCBcIuWNgeS4gOaciFwiLCBcIuWNgeS6jOaciFwiXG5cdFx0XHRcdF0sXG5cdFx0XHRcdGRheU9mV2Vla1Nob3J0OiBbXG5cdFx0XHRcdFx0XCLml6VcIiwgXCLkuIBcIiwgXCLkuoxcIiwgXCLkuIlcIiwgXCLlm5tcIiwgXCLkupRcIiwgXCLlha1cIlxuXHRcdFx0XHRdLFxuXHRcdFx0XHRkYXlPZldlZWs6IFtcIuaYn+acn+aXpVwiLCBcIuaYn+acn+S4gFwiLCBcIuaYn+acn+S6jFwiLCBcIuaYn+acn+S4iVwiLCBcIuaYn+acn+Wbm1wiLCBcIuaYn+acn+S6lFwiLCBcIuaYn+acn+WFrVwiXVxuXHRcdFx0fSxcblx0XHRcdHpoOiB7IC8vU2ltcGxpZmllZCBDaGluZXNlICjnroDkvZPkuK3mlocpXG5cdFx0XHRcdG1vbnRoczogW1xuXHRcdFx0XHRcdFwi5LiA5pyIXCIsIFwi5LqM5pyIXCIsIFwi5LiJ5pyIXCIsIFwi5Zub5pyIXCIsIFwi5LqU5pyIXCIsIFwi5YWt5pyIXCIsIFwi5LiD5pyIXCIsIFwi5YWr5pyIXCIsIFwi5Lmd5pyIXCIsIFwi5Y2B5pyIXCIsIFwi5Y2B5LiA5pyIXCIsIFwi5Y2B5LqM5pyIXCJcblx0XHRcdFx0XSxcblx0XHRcdFx0ZGF5T2ZXZWVrU2hvcnQ6IFtcblx0XHRcdFx0XHRcIuaXpVwiLCBcIuS4gFwiLCBcIuS6jFwiLCBcIuS4iVwiLCBcIuWbm1wiLCBcIuS6lFwiLCBcIuWFrVwiXG5cdFx0XHRcdF0sXG5cdFx0XHRcdGRheU9mV2VlazogW1wi5pif5pyf5pelXCIsIFwi5pif5pyf5LiAXCIsIFwi5pif5pyf5LqMXCIsIFwi5pif5pyf5LiJXCIsIFwi5pif5pyf5ZubXCIsIFwi5pif5pyf5LqUXCIsIFwi5pif5pyf5YWtXCJdXG5cdFx0XHR9LFxuXHRcdFx0dWc6eyAvLyBVeWdodXIo2Kbbh9mK2Lrbh9ix2obblSlcblx0XHRcdFx0bW9udGhzOiBbXG5cdFx0XHRcdFx0XCIxLdim2KfZilwiLFwiMi3Yptin2YpcIixcIjMt2KbYp9mKXCIsXCI0Ldim2KfZilwiLFwiNS3Yptin2YpcIixcIjYt2KbYp9mKXCIsXCI3Ldim2KfZilwiLFwiOC3Yptin2YpcIixcIjkt2KbYp9mKXCIsXCIxMC3Yptin2YpcIixcIjExLdim2KfZilwiLFwiMTIt2KbYp9mKXCJcblx0XHRcdFx0XSxcblx0XHRcdFx0ZGF5T2ZXZWVrOiBbXG5cdFx0XHRcdFx0XCLZituV2YPYtNuV2YbYqNuVXCIsIFwi2K/biNi025XZhtio25VcIixcItiz25XZiti025XZhtio25VcIixcItqG2KfYsdi025XZhtio25VcIixcItm+25XZiti025XZhtio25VcIixcItis24jZhduVXCIsXCLYtNuV2YbYqNuVXCJcblx0XHRcdFx0XVxuXHRcdFx0fSxcblx0XHRcdGhlOiB7IC8vSGVicmV3ICjXoteR16jXmdeqKVxuXHRcdFx0XHRtb250aHM6IFtcblx0XHRcdFx0XHQn15nXoNeV15DXqCcsICfXpNeR16jXldeQ16gnLCAn157XqNelJywgJ9eQ16TXqNeZ15wnLCAn157XkNeZJywgJ9eZ15XXoNeZJywgJ9eZ15XXnNeZJywgJ9eQ15XXkteV16HXmCcsICfXodek15jXnteR16gnLCAn15DXlden15jXldeR16gnLCAn16DXldeR157XkdeoJywgJ9eT16bXnteR16gnXG5cdFx0XHRcdF0sXG5cdFx0XHRcdGRheU9mV2Vla1Nob3J0OiBbXG5cdFx0XHRcdFx0J9eQXFwnJywgJ9eRXFwnJywgJ9eSXFwnJywgJ9eTXFwnJywgJ9eUXFwnJywgJ9eVXFwnJywgJ9ep15HXqidcblx0XHRcdFx0XSxcblx0XHRcdFx0ZGF5T2ZXZWVrOiBbXCLXqNeQ16nXldefXCIsIFwi16nXoNeZXCIsIFwi16nXnNeZ16nXmVwiLCBcIteo15HXmdei15lcIiwgXCLXl9ee15nXqdeZXCIsIFwi16nXmdep15lcIiwgXCLXqdeR16pcIiwgXCLXqNeQ16nXldefXCJdXG5cdFx0XHR9LFxuXHRcdFx0aHk6IHsgLy8gQXJtZW5pYW5cblx0XHRcdFx0bW9udGhzOiBbXG5cdFx0XHRcdFx0XCLVgNW41oLVttW+1aHWgFwiLCBcItWT1aXVv9aA1b7VodaAXCIsIFwi1YTVodaA1b9cIiwgXCLUsdW61oDVq9WsXCIsIFwi1YTVodW11avVvVwiLCBcItWA1bjWgtW21avVvVwiLCBcItWA1bjWgtWs1avVvVwiLCBcItWV1aPVuNW91b/VuNW9XCIsIFwi1Y3VpdW61b/VpdW01aLVpdaAXCIsIFwi1YDVuNWv1b/VpdW01aLVpdaAXCIsIFwi1YbVuNW11aXVtNWi1aXWgFwiLCBcItS01aXVr9W/1aXVtNWi1aXWgFwiXG5cdFx0XHRcdF0sXG5cdFx0XHRcdGRheU9mV2Vla1Nob3J0OiBbXG5cdFx0XHRcdFx0XCLUv9WrXCIsIFwi1LXWgNWvXCIsIFwi1LXWgNaEXCIsIFwi1YnVuNaAXCIsIFwi1YDVttWjXCIsIFwi1YjWgtaA1aJcIiwgXCLVh9Wi1alcIlxuXHRcdFx0XHRdLFxuXHRcdFx0XHRkYXlPZldlZWs6IFtcItS/1avWgNWh1a/Vq1wiLCBcItS11oDVr9W41oLVt9Wh1aLVqdWrXCIsIFwi1LXWgNWl1oTVt9Wh1aLVqdWrXCIsIFwi1YnVuNaA1aXWhNW31aHVotWp1atcIiwgXCLVgNWr1bbVo9W31aHVotWp1atcIiwgXCLViNaC1oDVotWh1alcIiwgXCLVh9Wh1aLVodWpXCJdXG5cdFx0XHR9LFxuXHRcdFx0a2c6IHsgLy8gS3lyZ3l6XG5cdFx0XHRcdG1vbnRoczogW1xuXHRcdFx0XHRcdCfSrtGH0YLSr9C9INCw0LnRiycsICfQkdC40YDQtNC40L0g0LDQudGLJywgJ9CW0LDQu9Cz0LDQvSDQmtGD0YDQsNC9JywgJ9Cn0YvQvSDQmtGD0YDQsNC9JywgJ9CR0YPQs9GDJywgJ9Ca0YPQu9C20LAnLCAn0KLQtdC60LUnLCAn0JHQsNGIINCe0L7QvdCwJywgJ9CQ0Y/QuiDQntC+0L3QsCcsICfQotC+0LPRg9C30LTRg9C9INCw0LnRiycsICfQltC10YLQuNC90LjQvSDQsNC50YsnLCAn0JHQtdGI0YLQuNC9INCw0LnRiydcblx0XHRcdFx0XSxcblx0XHRcdFx0ZGF5T2ZXZWVrU2hvcnQ6IFtcblx0XHRcdFx0XHRcItCW0LXQulwiLCBcItCU0q/QuVwiLCBcItCo0LXQuVwiLCBcItCo0LDRgFwiLCBcItCR0LXQuVwiLCBcItCW0YPQvFwiLCBcItCY0YjQtVwiXG5cdFx0XHRcdF0sXG5cdFx0XHRcdGRheU9mV2VlazogW1xuXHRcdFx0XHRcdFwi0JbQtdC60YjQtdC80LFcIiwgXCLQlNKv0LnRiNOp0LzQsVwiLCBcItCo0LXQudGI0LXQvNCxXCIsIFwi0KjQsNGA0YjQtdC80LFcIiwgXCLQkdC10LnRiNC10LzQsdC4XCIsIFwi0JbRg9C80LBcIiwgXCLQmNGI0LXQvdCxXCJcblx0XHRcdFx0XVxuXHRcdFx0fSxcblx0XHRcdHJtOiB7IC8vIFJvbWFuc2hcblx0XHRcdFx0bW9udGhzOiBbXG5cdFx0XHRcdFx0XCJTY2hhbmVyXCIsIFwiRmF2cmVyXCIsIFwiTWFyc1wiLCBcIkF2cmlnbFwiLCBcIk1hdGdcIiwgXCJaZXJjbGFkdXJcIiwgXCJGYW5hZHVyXCIsIFwiQXZ1c3RcIiwgXCJTZXR0ZW1iZXJcIiwgXCJPY3RvYmVyXCIsIFwiTm92ZW1iZXJcIiwgXCJEZWNlbWJlclwiXG5cdFx0XHRcdF0sXG5cdFx0XHRcdGRheU9mV2Vla1Nob3J0OiBbXG5cdFx0XHRcdFx0XCJEdVwiLCBcIkdsaVwiLCBcIk1hXCIsIFwiTWVcIiwgXCJHaWVcIiwgXCJWZVwiLCBcIlNvXCJcblx0XHRcdFx0XSxcblx0XHRcdFx0ZGF5T2ZXZWVrOiBbXG5cdFx0XHRcdFx0XCJEdW1lbmdpYVwiLCBcIkdsaW5kZXNkaVwiLCBcIk1hcmRpXCIsIFwiTWVzZW1uYVwiLCBcIkdpZXZnaWFcIiwgXCJWZW5kZXJkaVwiLCBcIlNvbmRhXCJcblx0XHRcdFx0XVxuXHRcdFx0fSxcblx0XHRcdGthOiB7IC8vIEdlb3JnaWFuXG5cdFx0XHRcdG1vbnRoczogW1xuXHRcdFx0XHRcdCfhg5jhg5Dhg5zhg5Xhg5Dhg6Dhg5gnLCAn4YOX4YOU4YOR4YOU4YOg4YOV4YOQ4YOa4YOYJywgJ+GDm+GDkOGDoOGDouGDmCcsICfhg5Dhg57hg6Dhg5jhg5rhg5gnLCAn4YOb4YOQ4YOY4YOh4YOYJywgJ+GDmOGDleGDnOGDmOGDoeGDmCcsICfhg5jhg5Xhg5rhg5jhg6Hhg5gnLCAn4YOQ4YOS4YOV4YOY4YOh4YOi4YOdJywgJ+GDoeGDlOGDpeGDouGDlOGDm+GDkeGDlOGDoOGDmCcsICfhg53hg6Xhg6Lhg53hg5vhg5Hhg5Thg6Dhg5gnLCAn4YOc4YOd4YOU4YOb4YOR4YOU4YOg4YOYJywgJ+GDk+GDlOGDmeGDlOGDm+GDkeGDlOGDoOGDmCdcblx0XHRcdFx0XSxcblx0XHRcdFx0ZGF5T2ZXZWVrU2hvcnQ6IFtcblx0XHRcdFx0XHRcIuGDmeGDlVwiLCBcIuGDneGDoOGDqFwiLCBcIuGDoeGDkOGDm+GDqFwiLCBcIuGDneGDl+GDrlwiLCBcIuGDruGDo+GDl1wiLCBcIuGDnuGDkOGDoFwiLCBcIuGDqOGDkOGDkVwiXG5cdFx0XHRcdF0sXG5cdFx0XHRcdGRheU9mV2VlazogW1wi4YOZ4YOV4YOY4YOg4YOQXCIsIFwi4YOd4YOg4YOo4YOQ4YOR4YOQ4YOX4YOYXCIsIFwi4YOh4YOQ4YOb4YOo4YOQ4YOR4YOQ4YOX4YOYXCIsIFwi4YOd4YOX4YOu4YOo4YOQ4YOR4YOQ4YOX4YOYXCIsIFwi4YOu4YOj4YOX4YOo4YOQ4YOR4YOQ4YOX4YOYXCIsIFwi4YOe4YOQ4YOg4YOQ4YOh4YOZ4YOU4YOV4YOYXCIsIFwi4YOo4YOQ4YOR4YOQ4YOX4YOYXCJdXG5cdFx0XHR9XG5cdFx0fSxcblxuXHRcdG93bmVyRG9jdW1lbnQ6IGRvY3VtZW50LFxuXHRcdGNvbnRlbnRXaW5kb3c6IHdpbmRvdyxcblxuXHRcdHZhbHVlOiAnJyxcblx0XHRydGw6IGZhbHNlLFxuXG5cdFx0Zm9ybWF0Olx0J1kvbS9kIEg6aScsXG5cdFx0Zm9ybWF0VGltZTpcdCdIOmknLFxuXHRcdGZvcm1hdERhdGU6XHQnWS9tL2QnLFxuXG5cdFx0c3RhcnREYXRlOlx0ZmFsc2UsIC8vIG5ldyBEYXRlKCksICcxOTg2LzEyLzA4JywgJy0xOTcwLzAxLzA1JywnLTE5NzAvMDEvMDUnLFxuXHRcdHN0ZXA6IDYwLFxuXHRcdG1vbnRoQ2hhbmdlU3Bpbm5lcjogdHJ1ZSxcblxuXHRcdGNsb3NlT25EYXRlU2VsZWN0OiBmYWxzZSxcblx0XHRjbG9zZU9uVGltZVNlbGVjdDogdHJ1ZSxcblx0XHRjbG9zZU9uV2l0aG91dENsaWNrOiB0cnVlLFxuXHRcdGNsb3NlT25JbnB1dENsaWNrOiB0cnVlLFxuXHRcdG9wZW5PbkZvY3VzOiB0cnVlLFxuXG5cdFx0dGltZXBpY2tlcjogdHJ1ZSxcblx0XHRkYXRlcGlja2VyOiB0cnVlLFxuXHRcdHdlZWtzOiBmYWxzZSxcblxuXHRcdGRlZmF1bHRUaW1lOiBmYWxzZSxcdC8vIHVzZSBmb3JtYXRUaW1lIGZvcm1hdCAoZXguICcxMDowMCcgZm9yIGZvcm1hdFRpbWU6XHQnSDppJylcblx0XHRkZWZhdWx0RGF0ZTogZmFsc2UsXHQvLyB1c2UgZm9ybWF0RGF0ZSBmb3JtYXQgKGV4IG5ldyBEYXRlKCkgb3IgJzE5ODYvMTIvMDgnIG9yICctMTk3MC8wMS8wNScgb3IgJy0xOTcwLzAxLzA1JylcblxuXHRcdG1pbkRhdGU6IGZhbHNlLFxuXHRcdG1heERhdGU6IGZhbHNlLFxuXHRcdG1pblRpbWU6IGZhbHNlLFxuXHRcdG1heFRpbWU6IGZhbHNlLFxuXHRcdG1pbkRhdGVUaW1lOiBmYWxzZSxcblx0XHRtYXhEYXRlVGltZTogZmFsc2UsXG5cblx0XHRhbGxvd1RpbWVzOiBbXSxcblx0XHRvcGVuZWQ6IGZhbHNlLFxuXHRcdGluaXRUaW1lOiB0cnVlLFxuXHRcdGlubGluZTogZmFsc2UsXG5cdFx0dGhlbWU6ICcnLFxuXHRcdHRvdWNoTW92ZWRUaHJlc2hvbGQ6IDUsXG5cblx0XHRvblNlbGVjdERhdGU6IGZ1bmN0aW9uICgpIHt9LFxuXHRcdG9uU2VsZWN0VGltZTogZnVuY3Rpb24gKCkge30sXG5cdFx0b25DaGFuZ2VNb250aDogZnVuY3Rpb24gKCkge30sXG5cdFx0b25HZXRXZWVrT2ZZZWFyOiBmdW5jdGlvbiAoKSB7fSxcblx0XHRvbkNoYW5nZVllYXI6IGZ1bmN0aW9uICgpIHt9LFxuXHRcdG9uQ2hhbmdlRGF0ZVRpbWU6IGZ1bmN0aW9uICgpIHt9LFxuXHRcdG9uU2hvdzogZnVuY3Rpb24gKCkge30sXG5cdFx0b25DbG9zZTogZnVuY3Rpb24gKCkge30sXG5cdFx0b25HZW5lcmF0ZTogZnVuY3Rpb24gKCkge30sXG5cblx0XHR3aXRob3V0Q29weXJpZ2h0OiB0cnVlLFxuXHRcdGludmVyc2VCdXR0b246IGZhbHNlLFxuXHRcdGhvdXJzMTI6IGZhbHNlLFxuXHRcdG5leHQ6ICd4ZHNvZnRfbmV4dCcsXG5cdFx0cHJldiA6ICd4ZHNvZnRfcHJldicsXG5cdFx0ZGF5T2ZXZWVrU3RhcnQ6IDAsXG5cdFx0cGFyZW50SUQ6ICdib2R5Jyxcblx0XHR0aW1lSGVpZ2h0SW5UaW1lUGlja2VyOiAyNSxcblx0XHR0aW1lcGlja2VyU2Nyb2xsYmFyOiB0cnVlLFxuXHRcdHRvZGF5QnV0dG9uOiB0cnVlLFxuXHRcdHByZXZCdXR0b246IHRydWUsXG5cdFx0bmV4dEJ1dHRvbjogdHJ1ZSxcblx0XHRkZWZhdWx0U2VsZWN0OiB0cnVlLFxuXG5cdFx0c2Nyb2xsTW9udGg6IHRydWUsXG5cdFx0c2Nyb2xsVGltZTogdHJ1ZSxcblx0XHRzY3JvbGxJbnB1dDogdHJ1ZSxcblxuXHRcdGxhenlJbml0OiBmYWxzZSxcblx0XHRtYXNrOiBmYWxzZSxcblx0XHR2YWxpZGF0ZU9uQmx1cjogdHJ1ZSxcblx0XHRhbGxvd0JsYW5rOiB0cnVlLFxuXHRcdHllYXJTdGFydDogMTk1MCxcblx0XHR5ZWFyRW5kOiAyMDUwLFxuXHRcdG1vbnRoU3RhcnQ6IDAsXG5cdFx0bW9udGhFbmQ6IDExLFxuXHRcdHN0eWxlOiAnJyxcblx0XHRpZDogJycsXG5cdFx0Zml4ZWQ6IGZhbHNlLFxuXHRcdHJvdW5kVGltZTogJ3JvdW5kJywgLy8gY2VpbCwgZmxvb3Jcblx0XHRjbGFzc05hbWU6ICcnLFxuXHRcdHdlZWtlbmRzOiBbXSxcblx0XHRoaWdobGlnaHRlZERhdGVzOiBbXSxcblx0XHRoaWdobGlnaHRlZFBlcmlvZHM6IFtdLFxuXHRcdGFsbG93RGF0ZXMgOiBbXSxcblx0XHRhbGxvd0RhdGVSZSA6IG51bGwsXG5cdFx0ZGlzYWJsZWREYXRlcyA6IFtdLFxuXHRcdGRpc2FibGVkV2Vla0RheXM6IFtdLFxuXHRcdHllYXJPZmZzZXQ6IDAsXG5cdFx0YmVmb3JlU2hvd0RheTogbnVsbCxcblxuXHRcdGVudGVyTGlrZVRhYjogdHJ1ZSxcbiAgICAgICAgc2hvd0FwcGx5QnV0dG9uOiBmYWxzZSxcbiAgICAgICAgaW5zaWRlUGFyZW50OiBmYWxzZSxcblx0fTtcblxuXHR2YXIgZGF0ZUhlbHBlciA9IG51bGwsXG5cdFx0ZGVmYXVsdERhdGVIZWxwZXIgPSBudWxsLFxuXHRcdGdsb2JhbExvY2FsZURlZmF1bHQgPSAnZW4nLFxuXHRcdGdsb2JhbExvY2FsZSA9ICdlbic7XG5cblx0dmFyIGRhdGVGb3JtYXR0ZXJPcHRpb25zRGVmYXVsdCA9IHtcblx0XHRtZXJpZGllbTogWydBTScsICdQTSddXG5cdH07XG5cblx0dmFyIGluaXREYXRlRm9ybWF0dGVyID0gZnVuY3Rpb24oKXtcblx0XHR2YXIgbG9jYWxlID0gZGVmYXVsdF9vcHRpb25zLmkxOG5bZ2xvYmFsTG9jYWxlXSxcblx0XHRcdG9wdHMgPSB7XG5cdFx0XHRcdGRheXM6IGxvY2FsZS5kYXlPZldlZWssXG5cdFx0XHRcdGRheXNTaG9ydDogbG9jYWxlLmRheU9mV2Vla1Nob3J0LFxuXHRcdFx0XHRtb250aHM6IGxvY2FsZS5tb250aHMsXG5cdFx0XHRcdG1vbnRoc1Nob3J0OiAkLm1hcChsb2NhbGUubW9udGhzLCBmdW5jdGlvbihuKXsgcmV0dXJuIG4uc3Vic3RyaW5nKDAsIDMpIH0pXG5cdFx0XHR9O1xuXG5cdFx0aWYgKHR5cGVvZiBEYXRlRm9ybWF0dGVyID09PSAnZnVuY3Rpb24nKSB7XG5cdFx0XHRkYXRlSGVscGVyID0gZGVmYXVsdERhdGVIZWxwZXIgPSBuZXcgRGF0ZUZvcm1hdHRlcih7XG5cdFx0XHRcdGRhdGVTZXR0aW5nczogJC5leHRlbmQoe30sIGRhdGVGb3JtYXR0ZXJPcHRpb25zRGVmYXVsdCwgb3B0cylcblx0XHRcdH0pO1xuXHRcdH1cblx0fTtcblxuXHR2YXIgZGF0ZUZvcm1hdHRlcnMgPSB7XG5cdFx0bW9tZW50OiB7XG5cdFx0XHRkZWZhdWx0X29wdGlvbnM6e1xuXHRcdFx0XHRmb3JtYXQ6ICdZWVlZL01NL0REIEhIOm1tJyxcblx0XHRcdFx0Zm9ybWF0RGF0ZTogJ1lZWVkvTU0vREQnLFxuXHRcdFx0XHRmb3JtYXRUaW1lOiAnSEg6bW0nLFxuXHRcdFx0fSxcblx0XHRcdGZvcm1hdHRlcjoge1xuXHRcdFx0XHRwYXJzZURhdGU6IGZ1bmN0aW9uIChkYXRlLCBmb3JtYXQpIHtcblx0XHRcdFx0XHRpZihpc0Zvcm1hdFN0YW5kYXJkKGZvcm1hdCkpe1xuXHRcdFx0XHRcdFx0cmV0dXJuIGRlZmF1bHREYXRlSGVscGVyLnBhcnNlRGF0ZShkYXRlLCBmb3JtYXQpO1xuXHRcdFx0XHRcdH0gXG5cdFx0XHRcdFx0dmFyIGQgPSBtb21lbnQoZGF0ZSwgZm9ybWF0KTtcblx0XHRcdFx0XHRyZXR1cm4gZC5pc1ZhbGlkKCkgPyBkLnRvRGF0ZSgpIDogZmFsc2U7XG5cdFx0XHRcdH0sXG5cblx0XHRcdFx0Zm9ybWF0RGF0ZTogZnVuY3Rpb24gKGRhdGUsIGZvcm1hdCkge1xuXHRcdFx0XHRcdGlmKGlzRm9ybWF0U3RhbmRhcmQoZm9ybWF0KSl7XG5cdFx0XHRcdFx0XHRyZXR1cm4gZGVmYXVsdERhdGVIZWxwZXIuZm9ybWF0RGF0ZShkYXRlLCBmb3JtYXQpO1xuXHRcdFx0XHRcdH0gXG5cdFx0XHRcdFx0cmV0dXJuIG1vbWVudChkYXRlKS5mb3JtYXQoZm9ybWF0KTtcblx0XHRcdFx0fSxcblxuXHRcdFx0XHRmb3JtYXRNYXNrOiBmdW5jdGlvbihmb3JtYXQpe1xuXHRcdFx0XHRcdHJldHVybiBmb3JtYXRcblx0XHRcdFx0XHRcdC5yZXBsYWNlKC9ZezR9L2csICc5OTk5Jylcblx0XHRcdFx0XHRcdC5yZXBsYWNlKC9ZezJ9L2csICc5OScpXG5cdFx0XHRcdFx0XHQucmVwbGFjZSgvTXsyfS9nLCAnMTknKVxuXHRcdFx0XHRcdFx0LnJlcGxhY2UoL0R7Mn0vZywgJzM5Jylcblx0XHRcdFx0XHRcdC5yZXBsYWNlKC9IezJ9L2csICcyOScpXG5cdFx0XHRcdFx0XHQucmVwbGFjZSgvbXsyfS9nLCAnNTknKVxuXHRcdFx0XHRcdFx0LnJlcGxhY2UoL3N7Mn0vZywgJzU5Jyk7XG5cdFx0XHRcdH0sXG5cdFx0XHR9XG5cdFx0fVxuXHR9XG5cblx0Ly8gZm9yIGxvY2FsZSBzZXR0aW5nc1xuXHQkLmRhdGV0aW1lcGlja2VyID0ge1xuXHRcdHNldExvY2FsZTogZnVuY3Rpb24obG9jYWxlKXtcblx0XHRcdHZhciBuZXdMb2NhbGUgPSBkZWZhdWx0X29wdGlvbnMuaTE4bltsb2NhbGVdID8gbG9jYWxlIDogZ2xvYmFsTG9jYWxlRGVmYXVsdDtcblx0XHRcdGlmIChnbG9iYWxMb2NhbGUgIT09IG5ld0xvY2FsZSkge1xuXHRcdFx0XHRnbG9iYWxMb2NhbGUgPSBuZXdMb2NhbGU7XG5cdFx0XHRcdC8vIHJlaW5pdCBkYXRlIGZvcm1hdHRlclxuXHRcdFx0XHRpbml0RGF0ZUZvcm1hdHRlcigpO1xuXHRcdFx0fVxuXHRcdH0sXG5cblx0XHRzZXREYXRlRm9ybWF0dGVyOiBmdW5jdGlvbihkYXRlRm9ybWF0dGVyKSB7XG5cdFx0XHRpZih0eXBlb2YgZGF0ZUZvcm1hdHRlciA9PT0gJ3N0cmluZycgJiYgZGF0ZUZvcm1hdHRlcnMuaGFzT3duUHJvcGVydHkoZGF0ZUZvcm1hdHRlcikpe1xuXHRcdFx0XHR2YXIgZGYgPSBkYXRlRm9ybWF0dGVyc1tkYXRlRm9ybWF0dGVyXTtcblx0XHRcdFx0JC5leHRlbmQoZGVmYXVsdF9vcHRpb25zLCBkZi5kZWZhdWx0X29wdGlvbnMpO1xuXHRcdFx0XHRkYXRlSGVscGVyID0gZGYuZm9ybWF0dGVyOyBcblx0XHRcdH1cblx0XHRcdGVsc2Uge1xuXHRcdFx0XHRkYXRlSGVscGVyID0gZGF0ZUZvcm1hdHRlcjtcblx0XHRcdH1cblx0XHR9LFxuXHR9O1xuXG5cdHZhciBzdGFuZGFyZEZvcm1hdHMgPSB7XG5cdFx0UkZDXzI4MjI6ICdELCBkIE0gWSBIOmk6cyBPJyxcblx0XHRBVE9NOiAnWS1tLWRcXFRIOmk6c1AnLFxuXHRcdElTT184NjAxOiAnWS1tLWRcXFRIOmk6c08nLFxuXHRcdFJGQ184MjI6ICdELCBkIE0geSBIOmk6cyBPJyxcblx0XHRSRkNfODUwOiAnbCwgZC1NLXkgSDppOnMgVCcsXG5cdFx0UkZDXzEwMzY6ICdELCBkIE0geSBIOmk6cyBPJyxcblx0XHRSRkNfMTEyMzogJ0QsIGQgTSBZIEg6aTpzIE8nLFxuXHRcdFJTUzogJ0QsIGQgTSBZIEg6aTpzIE8nLFxuXHRcdFczQzogJ1ktbS1kXFxUSDppOnNQJ1xuXHR9XG5cblx0dmFyIGlzRm9ybWF0U3RhbmRhcmQgPSBmdW5jdGlvbihmb3JtYXQpe1xuXHRcdHJldHVybiBPYmplY3QudmFsdWVzKHN0YW5kYXJkRm9ybWF0cykuaW5kZXhPZihmb3JtYXQpID09PSAtMSA/IGZhbHNlIDogdHJ1ZTtcblx0fVxuXG5cdCQuZXh0ZW5kKCQuZGF0ZXRpbWVwaWNrZXIsIHN0YW5kYXJkRm9ybWF0cyk7XG5cblx0Ly8gZmlyc3QgaW5pdCBkYXRlIGZvcm1hdHRlclxuXHRpbml0RGF0ZUZvcm1hdHRlcigpO1xuXG5cdC8vIGZpeCBmb3IgaWU4XG5cdGlmICghd2luZG93LmdldENvbXB1dGVkU3R5bGUpIHtcblx0XHR3aW5kb3cuZ2V0Q29tcHV0ZWRTdHlsZSA9IGZ1bmN0aW9uIChlbCkge1xuXHRcdFx0dGhpcy5lbCA9IGVsO1xuXHRcdFx0dGhpcy5nZXRQcm9wZXJ0eVZhbHVlID0gZnVuY3Rpb24gKHByb3ApIHtcblx0XHRcdFx0dmFyIHJlID0gLygtKFthLXpdKSkvZztcblx0XHRcdFx0aWYgKHByb3AgPT09ICdmbG9hdCcpIHtcblx0XHRcdFx0XHRwcm9wID0gJ3N0eWxlRmxvYXQnO1xuXHRcdFx0XHR9XG5cdFx0XHRcdGlmIChyZS50ZXN0KHByb3ApKSB7XG5cdFx0XHRcdFx0cHJvcCA9IHByb3AucmVwbGFjZShyZSwgZnVuY3Rpb24gKGEsIGIsIGMpIHtcblx0XHRcdFx0XHRcdHJldHVybiBjLnRvVXBwZXJDYXNlKCk7XG5cdFx0XHRcdFx0fSk7XG5cdFx0XHRcdH1cblx0XHRcdFx0cmV0dXJuIGVsLmN1cnJlbnRTdHlsZVtwcm9wXSB8fCBudWxsO1xuXHRcdFx0fTtcblx0XHRcdHJldHVybiB0aGlzO1xuXHRcdH07XG5cdH1cblx0aWYgKCFBcnJheS5wcm90b3R5cGUuaW5kZXhPZikge1xuXHRcdEFycmF5LnByb3RvdHlwZS5pbmRleE9mID0gZnVuY3Rpb24gKG9iaiwgc3RhcnQpIHtcblx0XHRcdHZhciBpLCBqO1xuXHRcdFx0Zm9yIChpID0gKHN0YXJ0IHx8IDApLCBqID0gdGhpcy5sZW5ndGg7IGkgPCBqOyBpICs9IDEpIHtcblx0XHRcdFx0aWYgKHRoaXNbaV0gPT09IG9iaikgeyByZXR1cm4gaTsgfVxuXHRcdFx0fVxuXHRcdFx0cmV0dXJuIC0xO1xuXHRcdH07XG5cdH1cblxuXHREYXRlLnByb3RvdHlwZS5jb3VudERheXNJbk1vbnRoID0gZnVuY3Rpb24gKCkge1xuXHRcdHJldHVybiBuZXcgRGF0ZSh0aGlzLmdldEZ1bGxZZWFyKCksIHRoaXMuZ2V0TW9udGgoKSArIDEsIDApLmdldERhdGUoKTtcblx0fTtcblxuXHQkLmZuLnhkc29mdFNjcm9sbGVyID0gZnVuY3Rpb24gKG9wdGlvbnMsIHBlcmNlbnQpIHtcblx0XHRyZXR1cm4gdGhpcy5lYWNoKGZ1bmN0aW9uICgpIHtcblx0XHRcdHZhciB0aW1lYm94cGFyZW50ID0gJCh0aGlzKSxcblx0XHRcdFx0cG9pbnRlckV2ZW50VG9YWSA9IGZ1bmN0aW9uIChlKSB7XG5cdFx0XHRcdFx0dmFyIG91dCA9IHt4OiAwLCB5OiAwfSxcblx0XHRcdFx0XHRcdHRvdWNoO1xuXHRcdFx0XHRcdGlmIChlLnR5cGUgPT09ICd0b3VjaHN0YXJ0JyB8fCBlLnR5cGUgPT09ICd0b3VjaG1vdmUnIHx8IGUudHlwZSA9PT0gJ3RvdWNoZW5kJyB8fCBlLnR5cGUgPT09ICd0b3VjaGNhbmNlbCcpIHtcblx0XHRcdFx0XHRcdHRvdWNoICA9IGUub3JpZ2luYWxFdmVudC50b3VjaGVzWzBdIHx8IGUub3JpZ2luYWxFdmVudC5jaGFuZ2VkVG91Y2hlc1swXTtcblx0XHRcdFx0XHRcdG91dC54ID0gdG91Y2guY2xpZW50WDtcblx0XHRcdFx0XHRcdG91dC55ID0gdG91Y2guY2xpZW50WTtcblx0XHRcdFx0XHR9IGVsc2UgaWYgKGUudHlwZSA9PT0gJ21vdXNlZG93bicgfHwgZS50eXBlID09PSAnbW91c2V1cCcgfHwgZS50eXBlID09PSAnbW91c2Vtb3ZlJyB8fCBlLnR5cGUgPT09ICdtb3VzZW92ZXInIHx8IGUudHlwZSA9PT0gJ21vdXNlb3V0JyB8fCBlLnR5cGUgPT09ICdtb3VzZWVudGVyJyB8fCBlLnR5cGUgPT09ICdtb3VzZWxlYXZlJykge1xuXHRcdFx0XHRcdFx0b3V0LnggPSBlLmNsaWVudFg7XG5cdFx0XHRcdFx0XHRvdXQueSA9IGUuY2xpZW50WTtcblx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0cmV0dXJuIG91dDtcblx0XHRcdFx0fSxcblx0XHRcdFx0dGltZWJveCxcblx0XHRcdFx0cGFyZW50SGVpZ2h0LFxuXHRcdFx0XHRoZWlnaHQsXG5cdFx0XHRcdHNjcm9sbGJhcixcblx0XHRcdFx0c2Nyb2xsZXIsXG5cdFx0XHRcdG1heGltdW1PZmZzZXQgPSAxMDAsXG5cdFx0XHRcdHN0YXJ0ID0gZmFsc2UsXG5cdFx0XHRcdHN0YXJ0WSA9IDAsXG5cdFx0XHRcdHN0YXJ0VG9wID0gMCxcblx0XHRcdFx0aDEgPSAwLFxuXHRcdFx0XHR0b3VjaFN0YXJ0ID0gZmFsc2UsXG5cdFx0XHRcdHN0YXJ0VG9wU2Nyb2xsID0gMCxcblx0XHRcdFx0Y2FsY09mZnNldCA9IGZ1bmN0aW9uICgpIHt9O1xuXG5cdFx0XHRpZiAocGVyY2VudCA9PT0gJ2hpZGUnKSB7XG5cdFx0XHRcdHRpbWVib3hwYXJlbnQuZmluZCgnLnhkc29mdF9zY3JvbGxiYXInKS5oaWRlKCk7XG5cdFx0XHRcdHJldHVybjtcblx0XHRcdH1cblxuXHRcdFx0aWYgKCEkKHRoaXMpLmhhc0NsYXNzKCd4ZHNvZnRfc2Nyb2xsZXJfYm94JykpIHtcblx0XHRcdFx0dGltZWJveCA9IHRpbWVib3hwYXJlbnQuY2hpbGRyZW4oKS5lcSgwKTtcblx0XHRcdFx0cGFyZW50SGVpZ2h0ID0gdGltZWJveHBhcmVudFswXS5jbGllbnRIZWlnaHQ7XG5cdFx0XHRcdGhlaWdodCA9IHRpbWVib3hbMF0ub2Zmc2V0SGVpZ2h0O1xuXHRcdFx0XHRzY3JvbGxiYXIgPSAkKCc8ZGl2IGNsYXNzPVwieGRzb2Z0X3Njcm9sbGJhclwiPjwvZGl2PicpO1xuXHRcdFx0XHRzY3JvbGxlciA9ICQoJzxkaXYgY2xhc3M9XCJ4ZHNvZnRfc2Nyb2xsZXJcIj48L2Rpdj4nKTtcblx0XHRcdFx0c2Nyb2xsYmFyLmFwcGVuZChzY3JvbGxlcik7XG5cblx0XHRcdFx0dGltZWJveHBhcmVudC5hZGRDbGFzcygneGRzb2Z0X3Njcm9sbGVyX2JveCcpLmFwcGVuZChzY3JvbGxiYXIpO1xuXHRcdFx0XHRjYWxjT2Zmc2V0ID0gZnVuY3Rpb24gY2FsY09mZnNldChldmVudCkge1xuXHRcdFx0XHRcdHZhciBvZmZzZXQgPSBwb2ludGVyRXZlbnRUb1hZKGV2ZW50KS55IC0gc3RhcnRZICsgc3RhcnRUb3BTY3JvbGw7XG5cdFx0XHRcdFx0aWYgKG9mZnNldCA8IDApIHtcblx0XHRcdFx0XHRcdG9mZnNldCA9IDA7XG5cdFx0XHRcdFx0fVxuXHRcdFx0XHRcdGlmIChvZmZzZXQgKyBzY3JvbGxlclswXS5vZmZzZXRIZWlnaHQgPiBoMSkge1xuXHRcdFx0XHRcdFx0b2Zmc2V0ID0gaDEgLSBzY3JvbGxlclswXS5vZmZzZXRIZWlnaHQ7XG5cdFx0XHRcdFx0fVxuXHRcdFx0XHRcdHRpbWVib3hwYXJlbnQudHJpZ2dlcignc2Nyb2xsX2VsZW1lbnQueGRzb2Z0X3Njcm9sbGVyJywgW21heGltdW1PZmZzZXQgPyBvZmZzZXQgLyBtYXhpbXVtT2Zmc2V0IDogMF0pO1xuXHRcdFx0XHR9O1xuXG5cdFx0XHRcdHNjcm9sbGVyXG5cdFx0XHRcdFx0Lm9uKCd0b3VjaHN0YXJ0Lnhkc29mdF9zY3JvbGxlciBtb3VzZWRvd24ueGRzb2Z0X3Njcm9sbGVyJywgZnVuY3Rpb24gKGV2ZW50KSB7XG5cdFx0XHRcdFx0XHRpZiAoIXBhcmVudEhlaWdodCkge1xuXHRcdFx0XHRcdFx0XHR0aW1lYm94cGFyZW50LnRyaWdnZXIoJ3Jlc2l6ZV9zY3JvbGwueGRzb2Z0X3Njcm9sbGVyJywgW3BlcmNlbnRdKTtcblx0XHRcdFx0XHRcdH1cblxuXHRcdFx0XHRcdFx0c3RhcnRZID0gcG9pbnRlckV2ZW50VG9YWShldmVudCkueTtcblx0XHRcdFx0XHRcdHN0YXJ0VG9wU2Nyb2xsID0gcGFyc2VJbnQoc2Nyb2xsZXIuY3NzKCdtYXJnaW4tdG9wJyksIDEwKTtcblx0XHRcdFx0XHRcdGgxID0gc2Nyb2xsYmFyWzBdLm9mZnNldEhlaWdodDtcblxuXHRcdFx0XHRcdFx0aWYgKGV2ZW50LnR5cGUgPT09ICdtb3VzZWRvd24nIHx8IGV2ZW50LnR5cGUgPT09ICd0b3VjaHN0YXJ0Jykge1xuXHRcdFx0XHRcdFx0XHRpZiAob3B0aW9ucy5vd25lckRvY3VtZW50KSB7XG5cdFx0XHRcdFx0XHRcdFx0JChvcHRpb25zLm93bmVyRG9jdW1lbnQuYm9keSkuYWRkQ2xhc3MoJ3hkc29mdF9ub3NlbGVjdCcpO1xuXHRcdFx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0XHRcdCQoW29wdGlvbnMub3duZXJEb2N1bWVudC5ib2R5LCBvcHRpb25zLmNvbnRlbnRXaW5kb3ddKS5vbigndG91Y2hlbmQgbW91c2V1cC54ZHNvZnRfc2Nyb2xsZXInLCBmdW5jdGlvbiBhcmd1bWVudHNfY2FsbGVlKCkge1xuXHRcdFx0XHRcdFx0XHRcdCQoW29wdGlvbnMub3duZXJEb2N1bWVudC5ib2R5LCBvcHRpb25zLmNvbnRlbnRXaW5kb3ddKS5vZmYoJ3RvdWNoZW5kIG1vdXNldXAueGRzb2Z0X3Njcm9sbGVyJywgYXJndW1lbnRzX2NhbGxlZSlcblx0XHRcdFx0XHRcdFx0XHRcdC5vZmYoJ21vdXNlbW92ZS54ZHNvZnRfc2Nyb2xsZXInLCBjYWxjT2Zmc2V0KVxuXHRcdFx0XHRcdFx0XHRcdFx0LnJlbW92ZUNsYXNzKCd4ZHNvZnRfbm9zZWxlY3QnKTtcblx0XHRcdFx0XHRcdFx0fSk7XG5cdFx0XHRcdFx0XHRcdCQob3B0aW9ucy5vd25lckRvY3VtZW50LmJvZHkpLm9uKCdtb3VzZW1vdmUueGRzb2Z0X3Njcm9sbGVyJywgY2FsY09mZnNldCk7XG5cdFx0XHRcdFx0XHR9IGVsc2Uge1xuXHRcdFx0XHRcdFx0XHR0b3VjaFN0YXJ0ID0gdHJ1ZTtcblx0XHRcdFx0XHRcdFx0ZXZlbnQuc3RvcFByb3BhZ2F0aW9uKCk7XG5cdFx0XHRcdFx0XHRcdGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG5cdFx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0fSlcblx0XHRcdFx0XHQub24oJ3RvdWNobW92ZScsIGZ1bmN0aW9uIChldmVudCkge1xuXHRcdFx0XHRcdFx0aWYgKHRvdWNoU3RhcnQpIHtcblx0XHRcdFx0XHRcdFx0ZXZlbnQucHJldmVudERlZmF1bHQoKTtcblx0XHRcdFx0XHRcdFx0Y2FsY09mZnNldChldmVudCk7XG5cdFx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0fSlcblx0XHRcdFx0XHQub24oJ3RvdWNoZW5kIHRvdWNoY2FuY2VsJywgZnVuY3Rpb24gKCkge1xuXHRcdFx0XHRcdFx0dG91Y2hTdGFydCA9ICBmYWxzZTtcblx0XHRcdFx0XHRcdHN0YXJ0VG9wU2Nyb2xsID0gMDtcblx0XHRcdFx0XHR9KTtcblxuXHRcdFx0XHR0aW1lYm94cGFyZW50XG5cdFx0XHRcdFx0Lm9uKCdzY3JvbGxfZWxlbWVudC54ZHNvZnRfc2Nyb2xsZXInLCBmdW5jdGlvbiAoZXZlbnQsIHBlcmNlbnRhZ2UpIHtcblx0XHRcdFx0XHRcdGlmICghcGFyZW50SGVpZ2h0KSB7XG5cdFx0XHRcdFx0XHRcdHRpbWVib3hwYXJlbnQudHJpZ2dlcigncmVzaXplX3Njcm9sbC54ZHNvZnRfc2Nyb2xsZXInLCBbcGVyY2VudGFnZSwgdHJ1ZV0pO1xuXHRcdFx0XHRcdFx0fVxuXHRcdFx0XHRcdFx0cGVyY2VudGFnZSA9IHBlcmNlbnRhZ2UgPiAxID8gMSA6IChwZXJjZW50YWdlIDwgMCB8fCBpc05hTihwZXJjZW50YWdlKSkgPyAwIDogcGVyY2VudGFnZTtcblxuXHRcdFx0XHRcdFx0c2Nyb2xsZXIuY3NzKCdtYXJnaW4tdG9wJywgbWF4aW11bU9mZnNldCAqIHBlcmNlbnRhZ2UpO1xuXG5cdFx0XHRcdFx0XHRzZXRUaW1lb3V0KGZ1bmN0aW9uICgpIHtcblx0XHRcdFx0XHRcdFx0dGltZWJveC5jc3MoJ21hcmdpblRvcCcsIC1wYXJzZUludCgodGltZWJveFswXS5vZmZzZXRIZWlnaHQgLSBwYXJlbnRIZWlnaHQpICogcGVyY2VudGFnZSwgMTApKTtcblx0XHRcdFx0XHRcdH0sIDEwKTtcblx0XHRcdFx0XHR9KVxuXHRcdFx0XHRcdC5vbigncmVzaXplX3Njcm9sbC54ZHNvZnRfc2Nyb2xsZXInLCBmdW5jdGlvbiAoZXZlbnQsIHBlcmNlbnRhZ2UsIG5vVHJpZ2dlclNjcm9sbCkge1xuXHRcdFx0XHRcdFx0dmFyIHBlcmNlbnQsIHNoO1xuXHRcdFx0XHRcdFx0cGFyZW50SGVpZ2h0ID0gdGltZWJveHBhcmVudFswXS5jbGllbnRIZWlnaHQ7XG5cdFx0XHRcdFx0XHRoZWlnaHQgPSB0aW1lYm94WzBdLm9mZnNldEhlaWdodDtcblx0XHRcdFx0XHRcdHBlcmNlbnQgPSBwYXJlbnRIZWlnaHQgLyBoZWlnaHQ7XG5cdFx0XHRcdFx0XHRzaCA9IHBlcmNlbnQgKiBzY3JvbGxiYXJbMF0ub2Zmc2V0SGVpZ2h0O1xuXHRcdFx0XHRcdFx0aWYgKHBlcmNlbnQgPiAxKSB7XG5cdFx0XHRcdFx0XHRcdHNjcm9sbGVyLmhpZGUoKTtcblx0XHRcdFx0XHRcdH0gZWxzZSB7XG5cdFx0XHRcdFx0XHRcdHNjcm9sbGVyLnNob3coKTtcblx0XHRcdFx0XHRcdFx0c2Nyb2xsZXIuY3NzKCdoZWlnaHQnLCBwYXJzZUludChzaCA+IDEwID8gc2ggOiAxMCwgMTApKTtcblx0XHRcdFx0XHRcdFx0bWF4aW11bU9mZnNldCA9IHNjcm9sbGJhclswXS5vZmZzZXRIZWlnaHQgLSBzY3JvbGxlclswXS5vZmZzZXRIZWlnaHQ7XG5cdFx0XHRcdFx0XHRcdGlmIChub1RyaWdnZXJTY3JvbGwgIT09IHRydWUpIHtcblx0XHRcdFx0XHRcdFx0XHR0aW1lYm94cGFyZW50LnRyaWdnZXIoJ3Njcm9sbF9lbGVtZW50Lnhkc29mdF9zY3JvbGxlcicsIFtwZXJjZW50YWdlIHx8IE1hdGguYWJzKHBhcnNlSW50KHRpbWVib3guY3NzKCdtYXJnaW5Ub3AnKSwgMTApKSAvIChoZWlnaHQgLSBwYXJlbnRIZWlnaHQpXSk7XG5cdFx0XHRcdFx0XHRcdH1cblx0XHRcdFx0XHRcdH1cblx0XHRcdFx0XHR9KTtcblxuXHRcdFx0XHR0aW1lYm94cGFyZW50Lm9uKCdtb3VzZXdoZWVsJywgZnVuY3Rpb24gKGV2ZW50KSB7XG5cdFx0XHRcdFx0dmFyIHRvcCA9IE1hdGguYWJzKHBhcnNlSW50KHRpbWVib3guY3NzKCdtYXJnaW5Ub3AnKSwgMTApKTtcblxuXHRcdFx0XHRcdHRvcCA9IHRvcCAtIChldmVudC5kZWx0YVkgKiAyMCk7XG5cdFx0XHRcdFx0aWYgKHRvcCA8IDApIHtcblx0XHRcdFx0XHRcdHRvcCA9IDA7XG5cdFx0XHRcdFx0fVxuXG5cdFx0XHRcdFx0dGltZWJveHBhcmVudC50cmlnZ2VyKCdzY3JvbGxfZWxlbWVudC54ZHNvZnRfc2Nyb2xsZXInLCBbdG9wIC8gKGhlaWdodCAtIHBhcmVudEhlaWdodCldKTtcblx0XHRcdFx0XHRldmVudC5zdG9wUHJvcGFnYXRpb24oKTtcblx0XHRcdFx0XHRyZXR1cm4gZmFsc2U7XG5cdFx0XHRcdH0pO1xuXG5cdFx0XHRcdHRpbWVib3hwYXJlbnQub24oJ3RvdWNoc3RhcnQnLCBmdW5jdGlvbiAoZXZlbnQpIHtcblx0XHRcdFx0XHRzdGFydCA9IHBvaW50ZXJFdmVudFRvWFkoZXZlbnQpO1xuXHRcdFx0XHRcdHN0YXJ0VG9wID0gTWF0aC5hYnMocGFyc2VJbnQodGltZWJveC5jc3MoJ21hcmdpblRvcCcpLCAxMCkpO1xuXHRcdFx0XHR9KTtcblxuXHRcdFx0XHR0aW1lYm94cGFyZW50Lm9uKCd0b3VjaG1vdmUnLCBmdW5jdGlvbiAoZXZlbnQpIHtcblx0XHRcdFx0XHRpZiAoc3RhcnQpIHtcblx0XHRcdFx0XHRcdGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG5cdFx0XHRcdFx0XHR2YXIgY29vcmQgPSBwb2ludGVyRXZlbnRUb1hZKGV2ZW50KTtcblx0XHRcdFx0XHRcdHRpbWVib3hwYXJlbnQudHJpZ2dlcignc2Nyb2xsX2VsZW1lbnQueGRzb2Z0X3Njcm9sbGVyJywgWyhzdGFydFRvcCAtIChjb29yZC55IC0gc3RhcnQueSkpIC8gKGhlaWdodCAtIHBhcmVudEhlaWdodCldKTtcblx0XHRcdFx0XHR9XG5cdFx0XHRcdH0pO1xuXG5cdFx0XHRcdHRpbWVib3hwYXJlbnQub24oJ3RvdWNoZW5kIHRvdWNoY2FuY2VsJywgZnVuY3Rpb24gKCkge1xuXHRcdFx0XHRcdHN0YXJ0ID0gZmFsc2U7XG5cdFx0XHRcdFx0c3RhcnRUb3AgPSAwO1xuXHRcdFx0XHR9KTtcblx0XHRcdH1cblx0XHRcdHRpbWVib3hwYXJlbnQudHJpZ2dlcigncmVzaXplX3Njcm9sbC54ZHNvZnRfc2Nyb2xsZXInLCBbcGVyY2VudF0pO1xuXHRcdH0pO1xuXHR9O1xuXG5cdCQuZm4uZGF0ZXRpbWVwaWNrZXIgPSBmdW5jdGlvbiAob3B0LCBvcHQyKSB7XG5cdFx0dmFyIHJlc3VsdCA9IHRoaXMsXG5cdFx0XHRLRVkwID0gNDgsXG5cdFx0XHRLRVk5ID0gNTcsXG5cdFx0XHRfS0VZMCA9IDk2LFxuXHRcdFx0X0tFWTkgPSAxMDUsXG4gICAgICAgICAgICBDVFJMS0VZID0gMTcsXG4gICAgICAgICAgICBDTURLRVkgPSA5MSxcblx0XHRcdERFTCA9IDQ2LFxuXHRcdFx0RU5URVIgPSAxMyxcblx0XHRcdEVTQyA9IDI3LFxuXHRcdFx0QkFDS1NQQUNFID0gOCxcblx0XHRcdEFSUk9XTEVGVCA9IDM3LFxuXHRcdFx0QVJST1dVUCA9IDM4LFxuXHRcdFx0QVJST1dSSUdIVCA9IDM5LFxuXHRcdFx0QVJST1dET1dOID0gNDAsXG5cdFx0XHRUQUIgPSA5LFxuXHRcdFx0RjUgPSAxMTYsXG5cdFx0XHRBS0VZID0gNjUsXG5cdFx0XHRDS0VZID0gNjcsXG5cdFx0XHRWS0VZID0gODYsXG5cdFx0XHRaS0VZID0gOTAsXG5cdFx0XHRZS0VZID0gODksXG4gICAgICAgICAgICBjdHJsRG93blx0PVx0ZmFsc2UsXG4gICAgICAgICAgICBjbWREb3duID0gZmFsc2UsXG5cdFx0XHRvcHRpb25zID0gKCQuaXNQbGFpbk9iamVjdChvcHQpIHx8ICFvcHQpID8gJC5leHRlbmQodHJ1ZSwge30sIGRlZmF1bHRfb3B0aW9ucywgb3B0KSA6ICQuZXh0ZW5kKHRydWUsIHt9LCBkZWZhdWx0X29wdGlvbnMpLFxuXG5cdFx0XHRsYXp5SW5pdFRpbWVyID0gMCxcblx0XHRcdGNyZWF0ZURhdGVUaW1lUGlja2VyLFxuXHRcdFx0ZGVzdHJveURhdGVUaW1lUGlja2VyLFxuXG5cdFx0XHRsYXp5SW5pdCA9IGZ1bmN0aW9uIChpbnB1dCkge1xuXHRcdFx0XHRpbnB1dFxuXHRcdFx0XHRcdC5vbignb3Blbi54ZHNvZnQgZm9jdXNpbi54ZHNvZnQgbW91c2Vkb3duLnhkc29mdCB0b3VjaHN0YXJ0JywgZnVuY3Rpb24gaW5pdE9uQWN0aW9uQ2FsbGJhY2soKSB7XG5cdFx0XHRcdFx0XHRpZiAoaW5wdXQuaXMoJzpkaXNhYmxlZCcpIHx8IGlucHV0LmRhdGEoJ3hkc29mdF9kYXRldGltZXBpY2tlcicpKSB7XG5cdFx0XHRcdFx0XHRcdHJldHVybjtcblx0XHRcdFx0XHRcdH1cblx0XHRcdFx0XHRcdGNsZWFyVGltZW91dChsYXp5SW5pdFRpbWVyKTtcblx0XHRcdFx0XHRcdGxhenlJbml0VGltZXIgPSBzZXRUaW1lb3V0KGZ1bmN0aW9uICgpIHtcblxuXHRcdFx0XHRcdFx0XHRpZiAoIWlucHV0LmRhdGEoJ3hkc29mdF9kYXRldGltZXBpY2tlcicpKSB7XG5cdFx0XHRcdFx0XHRcdFx0Y3JlYXRlRGF0ZVRpbWVQaWNrZXIoaW5wdXQpO1xuXHRcdFx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0XHRcdGlucHV0XG5cdFx0XHRcdFx0XHRcdFx0Lm9mZignb3Blbi54ZHNvZnQgZm9jdXNpbi54ZHNvZnQgbW91c2Vkb3duLnhkc29mdCB0b3VjaHN0YXJ0JywgaW5pdE9uQWN0aW9uQ2FsbGJhY2spXG5cdFx0XHRcdFx0XHRcdFx0LnRyaWdnZXIoJ29wZW4ueGRzb2Z0Jyk7XG5cdFx0XHRcdFx0XHR9LCAxMDApO1xuXHRcdFx0XHRcdH0pO1xuXHRcdFx0fTtcblxuXHRcdGNyZWF0ZURhdGVUaW1lUGlja2VyID0gZnVuY3Rpb24gKGlucHV0KSB7XG5cdFx0XHR2YXIgZGF0ZXRpbWVwaWNrZXIgPSAkKCc8ZGl2IGNsYXNzPVwieGRzb2Z0X2RhdGV0aW1lcGlja2VyIHhkc29mdF9ub3NlbGVjdFwiPjwvZGl2PicpLFxuXHRcdFx0XHR4ZHNvZnRfY29weXJpZ2h0ID0gJCgnPGRpdiBjbGFzcz1cInhkc29mdF9jb3B5cmlnaHRcIj48YSB0YXJnZXQ9XCJfYmxhbmtcIiBocmVmPVwiaHR0cDovL3hkc29mdC5uZXQvanFwbHVnaW5zL2RhdGV0aW1lcGlja2VyL1wiPnhkc29mdC5uZXQ8L2E+PC9kaXY+JyksXG5cdFx0XHRcdGRhdGVwaWNrZXIgPSAkKCc8ZGl2IGNsYXNzPVwieGRzb2Z0X2RhdGVwaWNrZXIgYWN0aXZlXCI+PC9kaXY+JyksXG5cdFx0XHRcdG1vbnRoX3BpY2tlciA9ICQoJzxkaXYgY2xhc3M9XCJ4ZHNvZnRfbW9udGhwaWNrZXJcIj48YnV0dG9uIHR5cGU9XCJidXR0b25cIiBjbGFzcz1cInhkc29mdF9wcmV2XCI+PC9idXR0b24+PGJ1dHRvbiB0eXBlPVwiYnV0dG9uXCIgY2xhc3M9XCJ4ZHNvZnRfdG9kYXlfYnV0dG9uXCI+PC9idXR0b24+JyArXG5cdFx0XHRcdFx0JzxkaXYgY2xhc3M9XCJ4ZHNvZnRfbGFiZWwgeGRzb2Z0X21vbnRoXCI+PHNwYW4+PC9zcGFuPjxpPjwvaT48L2Rpdj4nICtcblx0XHRcdFx0XHQnPGRpdiBjbGFzcz1cInhkc29mdF9sYWJlbCB4ZHNvZnRfeWVhclwiPjxzcGFuPjwvc3Bhbj48aT48L2k+PC9kaXY+JyArXG5cdFx0XHRcdFx0JzxidXR0b24gdHlwZT1cImJ1dHRvblwiIGNsYXNzPVwieGRzb2Z0X25leHRcIj48L2J1dHRvbj48L2Rpdj4nKSxcblx0XHRcdFx0Y2FsZW5kYXIgPSAkKCc8ZGl2IGNsYXNzPVwieGRzb2Z0X2NhbGVuZGFyXCI+PC9kaXY+JyksXG5cdFx0XHRcdHRpbWVwaWNrZXIgPSAkKCc8ZGl2IGNsYXNzPVwieGRzb2Z0X3RpbWVwaWNrZXIgYWN0aXZlXCI+PGJ1dHRvbiB0eXBlPVwiYnV0dG9uXCIgY2xhc3M9XCJ4ZHNvZnRfcHJldlwiPjwvYnV0dG9uPjxkaXYgY2xhc3M9XCJ4ZHNvZnRfdGltZV9ib3hcIj48L2Rpdj48YnV0dG9uIHR5cGU9XCJidXR0b25cIiBjbGFzcz1cInhkc29mdF9uZXh0XCI+PC9idXR0b24+PC9kaXY+JyksXG5cdFx0XHRcdHRpbWVib3hwYXJlbnQgPSB0aW1lcGlja2VyLmZpbmQoJy54ZHNvZnRfdGltZV9ib3gnKS5lcSgwKSxcblx0XHRcdFx0dGltZWJveCA9ICQoJzxkaXYgY2xhc3M9XCJ4ZHNvZnRfdGltZV92YXJpYW50XCI+PC9kaXY+JyksXG5cdFx0XHRcdGFwcGx5QnV0dG9uID0gJCgnPGJ1dHRvbiB0eXBlPVwiYnV0dG9uXCIgY2xhc3M9XCJ4ZHNvZnRfc2F2ZV9zZWxlY3RlZCBibHVlLWdyYWRpZW50LWJ1dHRvblwiPlNhdmUgU2VsZWN0ZWQ8L2J1dHRvbj4nKSxcblxuXHRcdFx0XHRtb250aHNlbGVjdCA9ICQoJzxkaXYgY2xhc3M9XCJ4ZHNvZnRfc2VsZWN0IHhkc29mdF9tb250aHNlbGVjdFwiPjxkaXY+PC9kaXY+PC9kaXY+JyksXG5cdFx0XHRcdHllYXJzZWxlY3QgPSAkKCc8ZGl2IGNsYXNzPVwieGRzb2Z0X3NlbGVjdCB4ZHNvZnRfeWVhcnNlbGVjdFwiPjxkaXY+PC9kaXY+PC9kaXY+JyksXG5cdFx0XHRcdHRyaWdnZXJBZnRlck9wZW4gPSBmYWxzZSxcblx0XHRcdFx0WERTb2Z0X2RhdGV0aW1lLFxuXG5cdFx0XHRcdHhjaGFuZ2VUaW1lcixcblx0XHRcdFx0dGltZXJjbGljayxcblx0XHRcdFx0Y3VycmVudF90aW1lX2luZGV4LFxuXHRcdFx0XHRzZXRQb3MsXG5cdFx0XHRcdHRpbWVyID0gMCxcblx0XHRcdFx0X3hkc29mdF9kYXRldGltZSxcblx0XHRcdFx0Zm9yRWFjaEFuY2VzdG9yT2Y7XG5cblx0XHRcdGlmIChvcHRpb25zLmlkKSB7XG5cdFx0XHRcdGRhdGV0aW1lcGlja2VyLmF0dHIoJ2lkJywgb3B0aW9ucy5pZCk7XG5cdFx0XHR9XG5cdFx0XHRpZiAob3B0aW9ucy5zdHlsZSkge1xuXHRcdFx0XHRkYXRldGltZXBpY2tlci5hdHRyKCdzdHlsZScsIG9wdGlvbnMuc3R5bGUpO1xuXHRcdFx0fVxuXHRcdFx0aWYgKG9wdGlvbnMud2Vla3MpIHtcblx0XHRcdFx0ZGF0ZXRpbWVwaWNrZXIuYWRkQ2xhc3MoJ3hkc29mdF9zaG93d2Vla3MnKTtcblx0XHRcdH1cblx0XHRcdGlmIChvcHRpb25zLnJ0bCkge1xuXHRcdFx0XHRkYXRldGltZXBpY2tlci5hZGRDbGFzcygneGRzb2Z0X3J0bCcpO1xuXHRcdFx0fVxuXG5cdFx0XHRkYXRldGltZXBpY2tlci5hZGRDbGFzcygneGRzb2Z0XycgKyBvcHRpb25zLnRoZW1lKTtcblx0XHRcdGRhdGV0aW1lcGlja2VyLmFkZENsYXNzKG9wdGlvbnMuY2xhc3NOYW1lKTtcblxuXHRcdFx0bW9udGhfcGlja2VyXG5cdFx0XHRcdC5maW5kKCcueGRzb2Z0X21vbnRoIHNwYW4nKVxuXHRcdFx0XHQuYWZ0ZXIobW9udGhzZWxlY3QpO1xuXHRcdFx0bW9udGhfcGlja2VyXG5cdFx0XHRcdC5maW5kKCcueGRzb2Z0X3llYXIgc3BhbicpXG5cdFx0XHRcdC5hZnRlcih5ZWFyc2VsZWN0KTtcblxuXHRcdFx0bW9udGhfcGlja2VyXG5cdFx0XHRcdC5maW5kKCcueGRzb2Z0X21vbnRoLC54ZHNvZnRfeWVhcicpXG5cdFx0XHRcdC5vbigndG91Y2hzdGFydCBtb3VzZWRvd24ueGRzb2Z0JywgZnVuY3Rpb24gKGV2ZW50KSB7XG5cdFx0XHRcdFx0dmFyIHNlbGVjdCA9ICQodGhpcykuZmluZCgnLnhkc29mdF9zZWxlY3QnKS5lcSgwKSxcblx0XHRcdFx0XHRcdHZhbCA9IDAsXG5cdFx0XHRcdFx0XHR0b3AgPSAwLFxuXHRcdFx0XHRcdFx0dmlzaWJsZSA9IHNlbGVjdC5pcygnOnZpc2libGUnKSxcblx0XHRcdFx0XHRcdGl0ZW1zLFxuXHRcdFx0XHRcdFx0aTtcblxuXHRcdFx0XHRcdG1vbnRoX3BpY2tlclxuXHRcdFx0XHRcdFx0LmZpbmQoJy54ZHNvZnRfc2VsZWN0Jylcblx0XHRcdFx0XHRcdC5oaWRlKCk7XG5cdFx0XHRcdFx0aWYgKF94ZHNvZnRfZGF0ZXRpbWUuY3VycmVudFRpbWUpIHtcblx0XHRcdFx0XHRcdHZhbCA9IF94ZHNvZnRfZGF0ZXRpbWUuY3VycmVudFRpbWVbJCh0aGlzKS5oYXNDbGFzcygneGRzb2Z0X21vbnRoJykgPyAnZ2V0TW9udGgnIDogJ2dldEZ1bGxZZWFyJ10oKTtcblx0XHRcdFx0XHR9XG5cblx0XHRcdFx0XHRzZWxlY3RbdmlzaWJsZSA/ICdoaWRlJyA6ICdzaG93J10oKTtcblx0XHRcdFx0XHRmb3IgKGl0ZW1zID0gc2VsZWN0LmZpbmQoJ2Rpdi54ZHNvZnRfb3B0aW9uJyksIGkgPSAwOyBpIDwgaXRlbXMubGVuZ3RoOyBpICs9IDEpIHtcblx0XHRcdFx0XHRcdGlmIChpdGVtcy5lcShpKS5kYXRhKCd2YWx1ZScpID09PSB2YWwpIHtcblx0XHRcdFx0XHRcdFx0YnJlYWs7XG5cdFx0XHRcdFx0XHR9IGVsc2Uge1xuXHRcdFx0XHRcdFx0XHR0b3AgKz0gaXRlbXNbMF0ub2Zmc2V0SGVpZ2h0O1xuXHRcdFx0XHRcdFx0fVxuXHRcdFx0XHRcdH1cblxuXHRcdFx0XHRcdHNlbGVjdC54ZHNvZnRTY3JvbGxlcihvcHRpb25zLCB0b3AgLyAoc2VsZWN0LmNoaWxkcmVuKClbMF0ub2Zmc2V0SGVpZ2h0IC0gKHNlbGVjdFswXS5jbGllbnRIZWlnaHQpKSk7XG5cdFx0XHRcdFx0ZXZlbnQuc3RvcFByb3BhZ2F0aW9uKCk7XG5cdFx0XHRcdFx0cmV0dXJuIGZhbHNlO1xuXHRcdFx0XHR9KTtcblxuXHRcdFx0dmFyIGhhbmRsZVRvdWNoTW92ZWQgPSBmdW5jdGlvbiAoZXZlbnQpIHtcblx0XHRcdFx0dmFyIGV2dCA9IGV2ZW50Lm9yaWdpbmFsRXZlbnQ7XG5cdFx0XHRcdHZhciB0b3VjaFBvc2l0aW9uID0gZXZ0LnRvdWNoZXMgPyBldnQudG91Y2hlc1swXSA6IGV2dDtcblx0XHRcdFx0dGhpcy50b3VjaFN0YXJ0UG9zaXRpb24gPSB0aGlzLnRvdWNoU3RhcnRQb3NpdGlvbiB8fCB0b3VjaFBvc2l0aW9uO1xuXHRcdFx0XHR2YXIgeE1vdmVtZW50ID0gTWF0aC5hYnModGhpcy50b3VjaFN0YXJ0UG9zaXRpb24uY2xpZW50WCAtIHRvdWNoUG9zaXRpb24uY2xpZW50WCk7XG5cdFx0XHRcdHZhciB5TW92ZW1lbnQgPSBNYXRoLmFicyh0aGlzLnRvdWNoU3RhcnRQb3NpdGlvbi5jbGllbnRZIC0gdG91Y2hQb3NpdGlvbi5jbGllbnRZKTtcblx0XHRcdFx0dmFyIGRpc3RhbmNlID0gTWF0aC5zcXJ0KHhNb3ZlbWVudCAqIHhNb3ZlbWVudCArIHlNb3ZlbWVudCAqIHlNb3ZlbWVudCk7XG5cdFx0XHRcdGlmKGRpc3RhbmNlID4gb3B0aW9ucy50b3VjaE1vdmVkVGhyZXNob2xkKSB7XG5cdFx0XHRcdFx0dGhpcy50b3VjaE1vdmVkID0gdHJ1ZTtcblx0XHRcdFx0fVxuXHRcdFx0fVxuXG5cdFx0XHRtb250aF9waWNrZXJcblx0XHRcdFx0LmZpbmQoJy54ZHNvZnRfc2VsZWN0Jylcblx0XHRcdFx0Lnhkc29mdFNjcm9sbGVyKG9wdGlvbnMpXG5cdFx0XHRcdC5vbigndG91Y2hzdGFydCBtb3VzZWRvd24ueGRzb2Z0JywgZnVuY3Rpb24gKGV2ZW50KSB7XG5cdFx0XHRcdFx0dmFyIGV2dCA9IGV2ZW50Lm9yaWdpbmFsRXZlbnQ7XG5cdFx0XHRcdFx0dGhpcy50b3VjaE1vdmVkID0gZmFsc2U7XG5cdFx0XHRcdFx0dGhpcy50b3VjaFN0YXJ0UG9zaXRpb24gPSBldnQudG91Y2hlcyA/IGV2dC50b3VjaGVzWzBdIDogZXZ0O1xuXHRcdFx0XHRcdGV2ZW50LnN0b3BQcm9wYWdhdGlvbigpO1xuXHRcdFx0XHRcdGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG5cdFx0XHRcdH0pXG5cdFx0XHRcdC5vbigndG91Y2htb3ZlJywgJy54ZHNvZnRfb3B0aW9uJywgaGFuZGxlVG91Y2hNb3ZlZClcblx0XHRcdFx0Lm9uKCd0b3VjaGVuZCBtb3VzZWRvd24ueGRzb2Z0JywgJy54ZHNvZnRfb3B0aW9uJywgZnVuY3Rpb24gKCkge1xuXHRcdFx0XHRcdGlmICghdGhpcy50b3VjaE1vdmVkKSB7XG5cdFx0XHRcdFx0XHRpZiAoX3hkc29mdF9kYXRldGltZS5jdXJyZW50VGltZSA9PT0gdW5kZWZpbmVkIHx8IF94ZHNvZnRfZGF0ZXRpbWUuY3VycmVudFRpbWUgPT09IG51bGwpIHtcblx0XHRcdFx0XHRcdFx0X3hkc29mdF9kYXRldGltZS5jdXJyZW50VGltZSA9IF94ZHNvZnRfZGF0ZXRpbWUubm93KCk7XG5cdFx0XHRcdFx0XHR9XG5cblx0XHRcdFx0XHRcdHZhciB5ZWFyID0gX3hkc29mdF9kYXRldGltZS5jdXJyZW50VGltZS5nZXRGdWxsWWVhcigpO1xuXHRcdFx0XHRcdFx0aWYgKF94ZHNvZnRfZGF0ZXRpbWUgJiYgX3hkc29mdF9kYXRldGltZS5jdXJyZW50VGltZSkge1xuXHRcdFx0XHRcdFx0XHRfeGRzb2Z0X2RhdGV0aW1lLmN1cnJlbnRUaW1lWyQodGhpcykucGFyZW50KCkucGFyZW50KCkuaGFzQ2xhc3MoJ3hkc29mdF9tb250aHNlbGVjdCcpID8gJ3NldE1vbnRoJyA6ICdzZXRGdWxsWWVhciddKCQodGhpcykuZGF0YSgndmFsdWUnKSk7XG5cdFx0XHRcdFx0XHR9XG5cblx0XHRcdFx0XHRcdCQodGhpcykucGFyZW50KCkucGFyZW50KCkuaGlkZSgpO1xuXG5cdFx0XHRcdFx0XHRkYXRldGltZXBpY2tlci50cmlnZ2VyKCd4Y2hhbmdlLnhkc29mdCcpO1xuXHRcdFx0XHRcdFx0aWYgKG9wdGlvbnMub25DaGFuZ2VNb250aCAmJiAkLmlzRnVuY3Rpb24ob3B0aW9ucy5vbkNoYW5nZU1vbnRoKSkge1xuXHRcdFx0XHRcdFx0XHRvcHRpb25zLm9uQ2hhbmdlTW9udGguY2FsbChkYXRldGltZXBpY2tlciwgX3hkc29mdF9kYXRldGltZS5jdXJyZW50VGltZSwgZGF0ZXRpbWVwaWNrZXIuZGF0YSgnaW5wdXQnKSk7XG5cdFx0XHRcdFx0XHR9XG5cblx0XHRcdFx0XHRcdGlmICh5ZWFyICE9PSBfeGRzb2Z0X2RhdGV0aW1lLmN1cnJlbnRUaW1lLmdldEZ1bGxZZWFyKCkgJiYgJC5pc0Z1bmN0aW9uKG9wdGlvbnMub25DaGFuZ2VZZWFyKSkge1xuXHRcdFx0XHRcdFx0XHRvcHRpb25zLm9uQ2hhbmdlWWVhci5jYWxsKGRhdGV0aW1lcGlja2VyLCBfeGRzb2Z0X2RhdGV0aW1lLmN1cnJlbnRUaW1lLCBkYXRldGltZXBpY2tlci5kYXRhKCdpbnB1dCcpKTtcblx0XHRcdFx0XHRcdH1cblx0XHRcdFx0XHR9XG5cdFx0XHRcdH0pO1xuXG5cdFx0XHRkYXRldGltZXBpY2tlci5nZXRWYWx1ZSA9IGZ1bmN0aW9uICgpIHtcblx0XHRcdFx0cmV0dXJuIF94ZHNvZnRfZGF0ZXRpbWUuZ2V0Q3VycmVudFRpbWUoKTtcblx0XHRcdH07XG5cblx0XHRcdGRhdGV0aW1lcGlja2VyLnNldE9wdGlvbnMgPSBmdW5jdGlvbiAoX29wdGlvbnMpIHtcblx0XHRcdFx0dmFyIGhpZ2hsaWdodGVkRGF0ZXMgPSB7fTtcblxuXHRcdFx0XHRvcHRpb25zID0gJC5leHRlbmQodHJ1ZSwge30sIG9wdGlvbnMsIF9vcHRpb25zKTtcblxuXHRcdFx0XHRpZiAoX29wdGlvbnMuYWxsb3dUaW1lcyAmJiAkLmlzQXJyYXkoX29wdGlvbnMuYWxsb3dUaW1lcykgJiYgX29wdGlvbnMuYWxsb3dUaW1lcy5sZW5ndGgpIHtcblx0XHRcdFx0XHRvcHRpb25zLmFsbG93VGltZXMgPSAkLmV4dGVuZCh0cnVlLCBbXSwgX29wdGlvbnMuYWxsb3dUaW1lcyk7XG5cdFx0XHRcdH1cblxuXHRcdFx0XHRpZiAoX29wdGlvbnMud2Vla2VuZHMgJiYgJC5pc0FycmF5KF9vcHRpb25zLndlZWtlbmRzKSAmJiBfb3B0aW9ucy53ZWVrZW5kcy5sZW5ndGgpIHtcblx0XHRcdFx0XHRvcHRpb25zLndlZWtlbmRzID0gJC5leHRlbmQodHJ1ZSwgW10sIF9vcHRpb25zLndlZWtlbmRzKTtcblx0XHRcdFx0fVxuXG5cdFx0XHRcdGlmIChfb3B0aW9ucy5hbGxvd0RhdGVzICYmICQuaXNBcnJheShfb3B0aW9ucy5hbGxvd0RhdGVzKSAmJiBfb3B0aW9ucy5hbGxvd0RhdGVzLmxlbmd0aCkge1xuXHRcdFx0XHRcdG9wdGlvbnMuYWxsb3dEYXRlcyA9ICQuZXh0ZW5kKHRydWUsIFtdLCBfb3B0aW9ucy5hbGxvd0RhdGVzKTtcblx0XHRcdFx0fVxuXG5cdFx0XHRcdGlmIChfb3B0aW9ucy5hbGxvd0RhdGVSZSAmJiBPYmplY3QucHJvdG90eXBlLnRvU3RyaW5nLmNhbGwoX29wdGlvbnMuYWxsb3dEYXRlUmUpPT09XCJbb2JqZWN0IFN0cmluZ11cIikge1xuXHRcdFx0XHRcdG9wdGlvbnMuYWxsb3dEYXRlUmUgPSBuZXcgUmVnRXhwKF9vcHRpb25zLmFsbG93RGF0ZVJlKTtcblx0XHRcdFx0fVxuXG5cdFx0XHRcdGlmIChfb3B0aW9ucy5oaWdobGlnaHRlZERhdGVzICYmICQuaXNBcnJheShfb3B0aW9ucy5oaWdobGlnaHRlZERhdGVzKSAmJiBfb3B0aW9ucy5oaWdobGlnaHRlZERhdGVzLmxlbmd0aCkge1xuXHRcdFx0XHRcdCQuZWFjaChfb3B0aW9ucy5oaWdobGlnaHRlZERhdGVzLCBmdW5jdGlvbiAoaW5kZXgsIHZhbHVlKSB7XG5cdFx0XHRcdFx0XHR2YXIgc3BsaXREYXRhID0gJC5tYXAodmFsdWUuc3BsaXQoJywnKSwgJC50cmltKSxcblx0XHRcdFx0XHRcdFx0ZXhEZXNjLFxuXHRcdFx0XHRcdFx0XHRoRGF0ZSA9IG5ldyBIaWdobGlnaHRlZERhdGUoZGF0ZUhlbHBlci5wYXJzZURhdGUoc3BsaXREYXRhWzBdLCBvcHRpb25zLmZvcm1hdERhdGUpLCBzcGxpdERhdGFbMV0sIHNwbGl0RGF0YVsyXSksIC8vIGRhdGUsIGRlc2MsIHN0eWxlXG5cdFx0XHRcdFx0XHRcdGtleURhdGUgPSBkYXRlSGVscGVyLmZvcm1hdERhdGUoaERhdGUuZGF0ZSwgb3B0aW9ucy5mb3JtYXREYXRlKTtcblx0XHRcdFx0XHRcdGlmIChoaWdobGlnaHRlZERhdGVzW2tleURhdGVdICE9PSB1bmRlZmluZWQpIHtcblx0XHRcdFx0XHRcdFx0ZXhEZXNjID0gaGlnaGxpZ2h0ZWREYXRlc1trZXlEYXRlXS5kZXNjO1xuXHRcdFx0XHRcdFx0XHRpZiAoZXhEZXNjICYmIGV4RGVzYy5sZW5ndGggJiYgaERhdGUuZGVzYyAmJiBoRGF0ZS5kZXNjLmxlbmd0aCkge1xuXHRcdFx0XHRcdFx0XHRcdGhpZ2hsaWdodGVkRGF0ZXNba2V5RGF0ZV0uZGVzYyA9IGV4RGVzYyArIFwiXFxuXCIgKyBoRGF0ZS5kZXNjO1xuXHRcdFx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0XHR9IGVsc2Uge1xuXHRcdFx0XHRcdFx0XHRoaWdobGlnaHRlZERhdGVzW2tleURhdGVdID0gaERhdGU7XG5cdFx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0fSk7XG5cblx0XHRcdFx0XHRvcHRpb25zLmhpZ2hsaWdodGVkRGF0ZXMgPSAkLmV4dGVuZCh0cnVlLCBbXSwgaGlnaGxpZ2h0ZWREYXRlcyk7XG5cdFx0XHRcdH1cblxuXHRcdFx0XHRpZiAoX29wdGlvbnMuaGlnaGxpZ2h0ZWRQZXJpb2RzICYmICQuaXNBcnJheShfb3B0aW9ucy5oaWdobGlnaHRlZFBlcmlvZHMpICYmIF9vcHRpb25zLmhpZ2hsaWdodGVkUGVyaW9kcy5sZW5ndGgpIHtcblx0XHRcdFx0XHRoaWdobGlnaHRlZERhdGVzID0gJC5leHRlbmQodHJ1ZSwgW10sIG9wdGlvbnMuaGlnaGxpZ2h0ZWREYXRlcyk7XG5cdFx0XHRcdFx0JC5lYWNoKF9vcHRpb25zLmhpZ2hsaWdodGVkUGVyaW9kcywgZnVuY3Rpb24gKGluZGV4LCB2YWx1ZSkge1xuXHRcdFx0XHRcdFx0dmFyIGRhdGVUZXN0LCAvLyBzdGFydCBkYXRlXG5cdFx0XHRcdFx0XHRcdGRhdGVFbmQsXG5cdFx0XHRcdFx0XHRcdGRlc2MsXG5cdFx0XHRcdFx0XHRcdGhEYXRlLFxuXHRcdFx0XHRcdFx0XHRrZXlEYXRlLFxuXHRcdFx0XHRcdFx0XHRleERlc2MsXG5cdFx0XHRcdFx0XHRcdHN0eWxlO1xuXHRcdFx0XHRcdFx0aWYgKCQuaXNBcnJheSh2YWx1ZSkpIHtcblx0XHRcdFx0XHRcdFx0ZGF0ZVRlc3QgPSB2YWx1ZVswXTtcblx0XHRcdFx0XHRcdFx0ZGF0ZUVuZCA9IHZhbHVlWzFdO1xuXHRcdFx0XHRcdFx0XHRkZXNjID0gdmFsdWVbMl07XG5cdFx0XHRcdFx0XHRcdHN0eWxlID0gdmFsdWVbM107XG5cdFx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0XHRlbHNlIHtcblx0XHRcdFx0XHRcdFx0dmFyIHNwbGl0RGF0YSA9ICQubWFwKHZhbHVlLnNwbGl0KCcsJyksICQudHJpbSk7XG5cdFx0XHRcdFx0XHRcdGRhdGVUZXN0ID0gZGF0ZUhlbHBlci5wYXJzZURhdGUoc3BsaXREYXRhWzBdLCBvcHRpb25zLmZvcm1hdERhdGUpO1xuXHRcdFx0XHRcdFx0XHRkYXRlRW5kID0gZGF0ZUhlbHBlci5wYXJzZURhdGUoc3BsaXREYXRhWzFdLCBvcHRpb25zLmZvcm1hdERhdGUpO1xuXHRcdFx0XHRcdFx0XHRkZXNjID0gc3BsaXREYXRhWzJdO1xuXHRcdFx0XHRcdFx0XHRzdHlsZSA9IHNwbGl0RGF0YVszXTtcblx0XHRcdFx0XHRcdH1cblxuXHRcdFx0XHRcdFx0d2hpbGUgKGRhdGVUZXN0IDw9IGRhdGVFbmQpIHtcblx0XHRcdFx0XHRcdFx0aERhdGUgPSBuZXcgSGlnaGxpZ2h0ZWREYXRlKGRhdGVUZXN0LCBkZXNjLCBzdHlsZSk7XG5cdFx0XHRcdFx0XHRcdGtleURhdGUgPSBkYXRlSGVscGVyLmZvcm1hdERhdGUoZGF0ZVRlc3QsIG9wdGlvbnMuZm9ybWF0RGF0ZSk7XG5cdFx0XHRcdFx0XHRcdGRhdGVUZXN0LnNldERhdGUoZGF0ZVRlc3QuZ2V0RGF0ZSgpICsgMSk7XG5cdFx0XHRcdFx0XHRcdGlmIChoaWdobGlnaHRlZERhdGVzW2tleURhdGVdICE9PSB1bmRlZmluZWQpIHtcblx0XHRcdFx0XHRcdFx0XHRleERlc2MgPSBoaWdobGlnaHRlZERhdGVzW2tleURhdGVdLmRlc2M7XG5cdFx0XHRcdFx0XHRcdFx0aWYgKGV4RGVzYyAmJiBleERlc2MubGVuZ3RoICYmIGhEYXRlLmRlc2MgJiYgaERhdGUuZGVzYy5sZW5ndGgpIHtcblx0XHRcdFx0XHRcdFx0XHRcdGhpZ2hsaWdodGVkRGF0ZXNba2V5RGF0ZV0uZGVzYyA9IGV4RGVzYyArIFwiXFxuXCIgKyBoRGF0ZS5kZXNjO1xuXHRcdFx0XHRcdFx0XHRcdH1cblx0XHRcdFx0XHRcdFx0fSBlbHNlIHtcblx0XHRcdFx0XHRcdFx0XHRoaWdobGlnaHRlZERhdGVzW2tleURhdGVdID0gaERhdGU7XG5cdFx0XHRcdFx0XHRcdH1cblx0XHRcdFx0XHRcdH1cblx0XHRcdFx0XHR9KTtcblxuXHRcdFx0XHRcdG9wdGlvbnMuaGlnaGxpZ2h0ZWREYXRlcyA9ICQuZXh0ZW5kKHRydWUsIFtdLCBoaWdobGlnaHRlZERhdGVzKTtcblx0XHRcdFx0fVxuXG5cdFx0XHRcdGlmIChfb3B0aW9ucy5kaXNhYmxlZERhdGVzICYmICQuaXNBcnJheShfb3B0aW9ucy5kaXNhYmxlZERhdGVzKSAmJiBfb3B0aW9ucy5kaXNhYmxlZERhdGVzLmxlbmd0aCkge1xuXHRcdFx0XHRcdG9wdGlvbnMuZGlzYWJsZWREYXRlcyA9ICQuZXh0ZW5kKHRydWUsIFtdLCBfb3B0aW9ucy5kaXNhYmxlZERhdGVzKTtcblx0XHRcdFx0fVxuXG5cdFx0XHRcdGlmIChfb3B0aW9ucy5kaXNhYmxlZFdlZWtEYXlzICYmICQuaXNBcnJheShfb3B0aW9ucy5kaXNhYmxlZFdlZWtEYXlzKSAmJiBfb3B0aW9ucy5kaXNhYmxlZFdlZWtEYXlzLmxlbmd0aCkge1xuXHRcdFx0XHRcdG9wdGlvbnMuZGlzYWJsZWRXZWVrRGF5cyA9ICQuZXh0ZW5kKHRydWUsIFtdLCBfb3B0aW9ucy5kaXNhYmxlZFdlZWtEYXlzKTtcblx0XHRcdFx0fVxuXG5cdFx0XHRcdGlmICgob3B0aW9ucy5vcGVuIHx8IG9wdGlvbnMub3BlbmVkKSAmJiAoIW9wdGlvbnMuaW5saW5lKSkge1xuXHRcdFx0XHRcdGlucHV0LnRyaWdnZXIoJ29wZW4ueGRzb2Z0Jyk7XG5cdFx0XHRcdH1cblxuXHRcdFx0XHRpZiAob3B0aW9ucy5pbmxpbmUpIHtcblx0XHRcdFx0XHR0cmlnZ2VyQWZ0ZXJPcGVuID0gdHJ1ZTtcblx0XHRcdFx0XHRkYXRldGltZXBpY2tlci5hZGRDbGFzcygneGRzb2Z0X2lubGluZScpO1xuXHRcdFx0XHRcdGlucHV0LmFmdGVyKGRhdGV0aW1lcGlja2VyKS5oaWRlKCk7XG5cdFx0XHRcdH1cblxuXHRcdFx0XHRpZiAob3B0aW9ucy5pbnZlcnNlQnV0dG9uKSB7XG5cdFx0XHRcdFx0b3B0aW9ucy5uZXh0ID0gJ3hkc29mdF9wcmV2Jztcblx0XHRcdFx0XHRvcHRpb25zLnByZXYgPSAneGRzb2Z0X25leHQnO1xuXHRcdFx0XHR9XG5cblx0XHRcdFx0aWYgKG9wdGlvbnMuZGF0ZXBpY2tlcikge1xuXHRcdFx0XHRcdGRhdGVwaWNrZXIuYWRkQ2xhc3MoJ2FjdGl2ZScpO1xuXHRcdFx0XHR9IGVsc2Uge1xuXHRcdFx0XHRcdGRhdGVwaWNrZXIucmVtb3ZlQ2xhc3MoJ2FjdGl2ZScpO1xuXHRcdFx0XHR9XG5cblx0XHRcdFx0aWYgKG9wdGlvbnMudGltZXBpY2tlcikge1xuXHRcdFx0XHRcdHRpbWVwaWNrZXIuYWRkQ2xhc3MoJ2FjdGl2ZScpO1xuXHRcdFx0XHR9IGVsc2Uge1xuXHRcdFx0XHRcdHRpbWVwaWNrZXIucmVtb3ZlQ2xhc3MoJ2FjdGl2ZScpO1xuXHRcdFx0XHR9XG5cblx0XHRcdFx0aWYgKG9wdGlvbnMudmFsdWUpIHtcblx0XHRcdFx0XHRfeGRzb2Z0X2RhdGV0aW1lLnNldEN1cnJlbnRUaW1lKG9wdGlvbnMudmFsdWUpO1xuXHRcdFx0XHRcdGlmIChpbnB1dCAmJiBpbnB1dC52YWwpIHtcblx0XHRcdFx0XHRcdGlucHV0LnZhbChfeGRzb2Z0X2RhdGV0aW1lLnN0cik7XG5cdFx0XHRcdFx0fVxuXHRcdFx0XHR9XG5cblx0XHRcdFx0aWYgKGlzTmFOKG9wdGlvbnMuZGF5T2ZXZWVrU3RhcnQpKSB7XG5cdFx0XHRcdFx0b3B0aW9ucy5kYXlPZldlZWtTdGFydCA9IDA7XG5cdFx0XHRcdH0gZWxzZSB7XG5cdFx0XHRcdFx0b3B0aW9ucy5kYXlPZldlZWtTdGFydCA9IHBhcnNlSW50KG9wdGlvbnMuZGF5T2ZXZWVrU3RhcnQsIDEwKSAlIDc7XG5cdFx0XHRcdH1cblxuXHRcdFx0XHRpZiAoIW9wdGlvbnMudGltZXBpY2tlclNjcm9sbGJhcikge1xuXHRcdFx0XHRcdHRpbWVib3hwYXJlbnQueGRzb2Z0U2Nyb2xsZXIob3B0aW9ucywgJ2hpZGUnKTtcblx0XHRcdFx0fVxuXG5cdFx0XHRcdGlmIChvcHRpb25zLm1pbkRhdGUgJiYgL15bXFwrXFwtXSguKikkLy50ZXN0KG9wdGlvbnMubWluRGF0ZSkpIHtcblx0XHRcdFx0XHRvcHRpb25zLm1pbkRhdGUgPSBkYXRlSGVscGVyLmZvcm1hdERhdGUoX3hkc29mdF9kYXRldGltZS5zdHJUb0RhdGVUaW1lKG9wdGlvbnMubWluRGF0ZSksIG9wdGlvbnMuZm9ybWF0RGF0ZSk7XG5cdFx0XHRcdH1cblxuXHRcdFx0XHRpZiAob3B0aW9ucy5tYXhEYXRlICYmICAvXltcXCtcXC1dKC4qKSQvLnRlc3Qob3B0aW9ucy5tYXhEYXRlKSkge1xuXHRcdFx0XHRcdG9wdGlvbnMubWF4RGF0ZSA9IGRhdGVIZWxwZXIuZm9ybWF0RGF0ZShfeGRzb2Z0X2RhdGV0aW1lLnN0clRvRGF0ZVRpbWUob3B0aW9ucy5tYXhEYXRlKSwgb3B0aW9ucy5mb3JtYXREYXRlKTtcblx0XHRcdFx0fVxuXG4gICAgICAgICAgICAgICAgaWYgKG9wdGlvbnMubWluRGF0ZVRpbWUgJiYgIC9eXFwrKC4qKSQvLnRlc3Qob3B0aW9ucy5taW5EYXRlVGltZSkpIHtcbiAgICAgICAgICAgICAgICBcdG9wdGlvbnMubWluRGF0ZVRpbWUgPSBfeGRzb2Z0X2RhdGV0aW1lLnN0clRvRGF0ZVRpbWUob3B0aW9ucy5taW5EYXRlVGltZSkuZGF0ZUZvcm1hdChvcHRpb25zLmZvcm1hdERhdGUpO1xuICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgIGlmIChvcHRpb25zLm1heERhdGVUaW1lICYmICAvXlxcKyguKikkLy50ZXN0KG9wdGlvbnMubWF4RGF0ZVRpbWUpKSB7XG4gICAgICAgICAgICAgICAgXHRvcHRpb25zLm1heERhdGVUaW1lID0gX3hkc29mdF9kYXRldGltZS5zdHJUb0RhdGVUaW1lKG9wdGlvbnMubWF4RGF0ZVRpbWUpLmRhdGVGb3JtYXQob3B0aW9ucy5mb3JtYXREYXRlKTtcbiAgICAgICAgICAgICAgICB9XG5cblx0XHRcdFx0YXBwbHlCdXR0b24udG9nZ2xlKG9wdGlvbnMuc2hvd0FwcGx5QnV0dG9uKTtcblxuXHRcdFx0XHRtb250aF9waWNrZXJcblx0XHRcdFx0XHQuZmluZCgnLnhkc29mdF90b2RheV9idXR0b24nKVxuXHRcdFx0XHRcdC5jc3MoJ3Zpc2liaWxpdHknLCAhb3B0aW9ucy50b2RheUJ1dHRvbiA/ICdoaWRkZW4nIDogJ3Zpc2libGUnKTtcblxuXHRcdFx0XHRtb250aF9waWNrZXJcblx0XHRcdFx0XHQuZmluZCgnLicgKyBvcHRpb25zLnByZXYpXG5cdFx0XHRcdFx0LmNzcygndmlzaWJpbGl0eScsICFvcHRpb25zLnByZXZCdXR0b24gPyAnaGlkZGVuJyA6ICd2aXNpYmxlJyk7XG5cblx0XHRcdFx0bW9udGhfcGlja2VyXG5cdFx0XHRcdFx0LmZpbmQoJy4nICsgb3B0aW9ucy5uZXh0KVxuXHRcdFx0XHRcdC5jc3MoJ3Zpc2liaWxpdHknLCAhb3B0aW9ucy5uZXh0QnV0dG9uID8gJ2hpZGRlbicgOiAndmlzaWJsZScpO1xuXG5cdFx0XHRcdHNldE1hc2sob3B0aW9ucyk7XG5cblx0XHRcdFx0aWYgKG9wdGlvbnMudmFsaWRhdGVPbkJsdXIpIHtcblx0XHRcdFx0XHRpbnB1dFxuXHRcdFx0XHRcdFx0Lm9mZignYmx1ci54ZHNvZnQnKVxuXHRcdFx0XHRcdFx0Lm9uKCdibHVyLnhkc29mdCcsIGZ1bmN0aW9uICgpIHtcblx0XHRcdFx0XHRcdFx0aWYgKG9wdGlvbnMuYWxsb3dCbGFuayAmJiAoISQudHJpbSgkKHRoaXMpLnZhbCgpKS5sZW5ndGggfHxcblx0XHRcdFx0XHRcdFx0XHRcdCh0eXBlb2Ygb3B0aW9ucy5tYXNrID09PSBcInN0cmluZ1wiICYmICQudHJpbSgkKHRoaXMpLnZhbCgpKSA9PT0gb3B0aW9ucy5tYXNrLnJlcGxhY2UoL1swLTldL2csICdfJykpKSkge1xuXHRcdFx0XHRcdFx0XHRcdCQodGhpcykudmFsKG51bGwpO1xuXHRcdFx0XHRcdFx0XHRcdGRhdGV0aW1lcGlja2VyLmRhdGEoJ3hkc29mdF9kYXRldGltZScpLmVtcHR5KCk7XG5cdFx0XHRcdFx0XHRcdH0gZWxzZSB7XG5cdFx0XHRcdFx0XHRcdFx0dmFyIGQgPSBkYXRlSGVscGVyLnBhcnNlRGF0ZSgkKHRoaXMpLnZhbCgpLCBvcHRpb25zLmZvcm1hdCk7XG5cdFx0XHRcdFx0XHRcdFx0aWYgKGQpIHsgLy8gcGFyc2VEYXRlKCkgbWF5IHNraXAgc29tZSBpbnZhbGlkIHBhcnRzIGxpa2UgZGF0ZSBvciB0aW1lLCBzbyBtYWtlIGl0IGNsZWFyIGZvciB1c2VyOiBzaG93IHBhcnNlZCBkYXRlL3RpbWVcblx0XHRcdFx0XHRcdFx0XHRcdCQodGhpcykudmFsKGRhdGVIZWxwZXIuZm9ybWF0RGF0ZShkLCBvcHRpb25zLmZvcm1hdCkpO1xuXHRcdFx0XHRcdFx0XHRcdH0gZWxzZSB7XG5cdFx0XHRcdFx0XHRcdFx0XHR2YXIgc3BsaXR0ZWRIb3VycyAgID0gKyhbJCh0aGlzKS52YWwoKVswXSwgJCh0aGlzKS52YWwoKVsxXV0uam9pbignJykpLFxuXHRcdFx0XHRcdFx0XHRcdFx0XHRzcGxpdHRlZE1pbnV0ZXMgPSArKFskKHRoaXMpLnZhbCgpWzJdLCAkKHRoaXMpLnZhbCgpWzNdXS5qb2luKCcnKSk7XG5cblx0XHRcdFx0XHRcdFx0XHRcdC8vIHBhcnNlIHRoZSBudW1iZXJzIGFzIDAzMTIgPT4gMDM6MTJcblx0XHRcdFx0XHRcdFx0XHRcdGlmICghb3B0aW9ucy5kYXRlcGlja2VyICYmIG9wdGlvbnMudGltZXBpY2tlciAmJiBzcGxpdHRlZEhvdXJzID49IDAgJiYgc3BsaXR0ZWRIb3VycyA8IDI0ICYmIHNwbGl0dGVkTWludXRlcyA+PSAwICYmIHNwbGl0dGVkTWludXRlcyA8IDYwKSB7XG5cdFx0XHRcdFx0XHRcdFx0XHRcdCQodGhpcykudmFsKFtzcGxpdHRlZEhvdXJzLCBzcGxpdHRlZE1pbnV0ZXNdLm1hcChmdW5jdGlvbiAoaXRlbSkge1xuXHRcdFx0XHRcdFx0XHRcdFx0XHRcdHJldHVybiBpdGVtID4gOSA/IGl0ZW0gOiAnMCcgKyBpdGVtO1xuXHRcdFx0XHRcdFx0XHRcdFx0XHR9KS5qb2luKCc6JykpO1xuXHRcdFx0XHRcdFx0XHRcdFx0fSBlbHNlIHtcblx0XHRcdFx0XHRcdFx0XHRcdFx0JCh0aGlzKS52YWwoZGF0ZUhlbHBlci5mb3JtYXREYXRlKF94ZHNvZnRfZGF0ZXRpbWUubm93KCksIG9wdGlvbnMuZm9ybWF0KSk7XG5cdFx0XHRcdFx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0XHRcdFx0fVxuXHRcdFx0XHRcdFx0XHRcdGRhdGV0aW1lcGlja2VyLmRhdGEoJ3hkc29mdF9kYXRldGltZScpLnNldEN1cnJlbnRUaW1lKCQodGhpcykudmFsKCkpO1xuXHRcdFx0XHRcdFx0XHR9XG5cblx0XHRcdFx0XHRcdFx0ZGF0ZXRpbWVwaWNrZXIudHJpZ2dlcignY2hhbmdlZGF0ZXRpbWUueGRzb2Z0Jyk7XG5cdFx0XHRcdFx0XHRcdGRhdGV0aW1lcGlja2VyLnRyaWdnZXIoJ2Nsb3NlLnhkc29mdCcpO1xuXHRcdFx0XHRcdFx0fSk7XG5cdFx0XHRcdH1cblx0XHRcdFx0b3B0aW9ucy5kYXlPZldlZWtTdGFydFByZXYgPSAob3B0aW9ucy5kYXlPZldlZWtTdGFydCA9PT0gMCkgPyA2IDogb3B0aW9ucy5kYXlPZldlZWtTdGFydCAtIDE7XG5cblx0XHRcdFx0ZGF0ZXRpbWVwaWNrZXJcblx0XHRcdFx0XHQudHJpZ2dlcigneGNoYW5nZS54ZHNvZnQnKVxuXHRcdFx0XHRcdC50cmlnZ2VyKCdhZnRlck9wZW4ueGRzb2Z0Jyk7XG5cdFx0XHR9O1xuXG5cdFx0XHRkYXRldGltZXBpY2tlclxuXHRcdFx0XHQuZGF0YSgnb3B0aW9ucycsIG9wdGlvbnMpXG5cdFx0XHRcdC5vbigndG91Y2hzdGFydCBtb3VzZWRvd24ueGRzb2Z0JywgZnVuY3Rpb24gKGV2ZW50KSB7XG5cdFx0XHRcdFx0ZXZlbnQuc3RvcFByb3BhZ2F0aW9uKCk7XG5cdFx0XHRcdFx0ZXZlbnQucHJldmVudERlZmF1bHQoKTtcblx0XHRcdFx0XHR5ZWFyc2VsZWN0LmhpZGUoKTtcblx0XHRcdFx0XHRtb250aHNlbGVjdC5oaWRlKCk7XG5cdFx0XHRcdFx0cmV0dXJuIGZhbHNlO1xuXHRcdFx0XHR9KTtcblxuXHRcdFx0Ly9zY3JvbGxfZWxlbWVudCA9IHRpbWVwaWNrZXIuZmluZCgnLnhkc29mdF90aW1lX2JveCcpO1xuXHRcdFx0dGltZWJveHBhcmVudC5hcHBlbmQodGltZWJveCk7XG5cdFx0XHR0aW1lYm94cGFyZW50Lnhkc29mdFNjcm9sbGVyKG9wdGlvbnMpO1xuXG5cdFx0XHRkYXRldGltZXBpY2tlci5vbignYWZ0ZXJPcGVuLnhkc29mdCcsIGZ1bmN0aW9uICgpIHtcblx0XHRcdFx0dGltZWJveHBhcmVudC54ZHNvZnRTY3JvbGxlcihvcHRpb25zKTtcblx0XHRcdH0pO1xuXG5cdFx0XHRkYXRldGltZXBpY2tlclxuXHRcdFx0XHQuYXBwZW5kKGRhdGVwaWNrZXIpXG5cdFx0XHRcdC5hcHBlbmQodGltZXBpY2tlcik7XG5cblx0XHRcdGlmIChvcHRpb25zLndpdGhvdXRDb3B5cmlnaHQgIT09IHRydWUpIHtcblx0XHRcdFx0ZGF0ZXRpbWVwaWNrZXJcblx0XHRcdFx0XHQuYXBwZW5kKHhkc29mdF9jb3B5cmlnaHQpO1xuXHRcdFx0fVxuXG5cdFx0XHRkYXRlcGlja2VyXG5cdFx0XHRcdC5hcHBlbmQobW9udGhfcGlja2VyKVxuXHRcdFx0XHQuYXBwZW5kKGNhbGVuZGFyKVxuXHRcdFx0XHQuYXBwZW5kKGFwcGx5QnV0dG9uKTtcblxuICAgICAgICAgICAgaWYgKG9wdGlvbnMuaW5zaWRlUGFyZW50KSB7XG4gICAgICAgICAgICAgICAgJChpbnB1dCkucGFyZW50KCkuYXBwZW5kKGRhdGV0aW1lcGlja2VyKTtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgJChvcHRpb25zLnBhcmVudElEKS5hcHBlbmQoZGF0ZXRpbWVwaWNrZXIpO1xuICAgICAgICAgICAgfVxuXG5cdFx0XHRYRFNvZnRfZGF0ZXRpbWUgPSBmdW5jdGlvbiAoKSB7XG5cdFx0XHRcdHZhciBfdGhpcyA9IHRoaXM7XG5cdFx0XHRcdF90aGlzLm5vdyA9IGZ1bmN0aW9uIChub3JlY3Vyc2lvbikge1xuXHRcdFx0XHRcdHZhciBkID0gbmV3IERhdGUoKSxcblx0XHRcdFx0XHRcdGRhdGUsXG5cdFx0XHRcdFx0XHR0aW1lO1xuXG5cdFx0XHRcdFx0aWYgKCFub3JlY3Vyc2lvbiAmJiBvcHRpb25zLmRlZmF1bHREYXRlKSB7XG5cdFx0XHRcdFx0XHRkYXRlID0gX3RoaXMuc3RyVG9EYXRlVGltZShvcHRpb25zLmRlZmF1bHREYXRlKTtcblx0XHRcdFx0XHRcdGQuc2V0RnVsbFllYXIoZGF0ZS5nZXRGdWxsWWVhcigpKTtcblx0XHRcdFx0XHRcdGQuc2V0TW9udGgoZGF0ZS5nZXRNb250aCgpKTtcblx0XHRcdFx0XHRcdGQuc2V0RGF0ZShkYXRlLmdldERhdGUoKSk7XG5cdFx0XHRcdFx0fVxuXG5cdFx0XHRcdFx0ZC5zZXRGdWxsWWVhcihkLmdldEZ1bGxZZWFyKCkpO1xuXG5cdFx0XHRcdFx0aWYgKCFub3JlY3Vyc2lvbiAmJiBvcHRpb25zLmRlZmF1bHRUaW1lKSB7XG5cdFx0XHRcdFx0XHR0aW1lID0gX3RoaXMuc3RydG90aW1lKG9wdGlvbnMuZGVmYXVsdFRpbWUpO1xuXHRcdFx0XHRcdFx0ZC5zZXRIb3Vycyh0aW1lLmdldEhvdXJzKCkpO1xuXHRcdFx0XHRcdFx0ZC5zZXRNaW51dGVzKHRpbWUuZ2V0TWludXRlcygpKTtcblx0XHRcdFx0XHRcdGQuc2V0U2Vjb25kcyh0aW1lLmdldFNlY29uZHMoKSk7XG5cdFx0XHRcdFx0XHRkLnNldE1pbGxpc2Vjb25kcyh0aW1lLmdldE1pbGxpc2Vjb25kcygpKTtcblx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0cmV0dXJuIGQ7XG5cdFx0XHRcdH07XG5cblx0XHRcdFx0X3RoaXMuaXNWYWxpZERhdGUgPSBmdW5jdGlvbiAoZCkge1xuXHRcdFx0XHRcdGlmIChPYmplY3QucHJvdG90eXBlLnRvU3RyaW5nLmNhbGwoZCkgIT09IFwiW29iamVjdCBEYXRlXVwiKSB7XG5cdFx0XHRcdFx0XHRyZXR1cm4gZmFsc2U7XG5cdFx0XHRcdFx0fVxuXHRcdFx0XHRcdHJldHVybiAhaXNOYU4oZC5nZXRUaW1lKCkpO1xuXHRcdFx0XHR9O1xuXG5cdFx0XHRcdF90aGlzLnNldEN1cnJlbnRUaW1lID0gZnVuY3Rpb24gKGRUaW1lLCByZXF1aXJlVmFsaWREYXRlKSB7XG5cdFx0XHRcdFx0aWYgKHR5cGVvZiBkVGltZSA9PT0gJ3N0cmluZycpIHtcblx0XHRcdFx0XHRcdF90aGlzLmN1cnJlbnRUaW1lID0gX3RoaXMuc3RyVG9EYXRlVGltZShkVGltZSk7XG5cdFx0XHRcdFx0fVxuXHRcdFx0XHRcdGVsc2UgaWYgKF90aGlzLmlzVmFsaWREYXRlKGRUaW1lKSkge1xuXHRcdFx0XHRcdFx0X3RoaXMuY3VycmVudFRpbWUgPSBkVGltZTtcblx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0ZWxzZSBpZiAoIWRUaW1lICYmICFyZXF1aXJlVmFsaWREYXRlICYmIG9wdGlvbnMuYWxsb3dCbGFuayAmJiAhb3B0aW9ucy5pbmxpbmUpIHtcblx0XHRcdFx0XHRcdF90aGlzLmN1cnJlbnRUaW1lID0gbnVsbDtcblx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0ZWxzZSB7XG5cdFx0XHRcdFx0XHRfdGhpcy5jdXJyZW50VGltZSA9IF90aGlzLm5vdygpO1xuXHRcdFx0XHRcdH1cblxuXHRcdFx0XHRcdGRhdGV0aW1lcGlja2VyLnRyaWdnZXIoJ3hjaGFuZ2UueGRzb2Z0Jyk7XG5cdFx0XHRcdH07XG5cblx0XHRcdFx0X3RoaXMuZW1wdHkgPSBmdW5jdGlvbiAoKSB7XG5cdFx0XHRcdFx0X3RoaXMuY3VycmVudFRpbWUgPSBudWxsO1xuXHRcdFx0XHR9O1xuXG5cdFx0XHRcdF90aGlzLmdldEN1cnJlbnRUaW1lID0gZnVuY3Rpb24gKCkge1xuXHRcdFx0XHRcdHJldHVybiBfdGhpcy5jdXJyZW50VGltZTtcblx0XHRcdFx0fTtcblxuXHRcdFx0XHRfdGhpcy5uZXh0TW9udGggPSBmdW5jdGlvbiAoKSB7XG5cblx0XHRcdFx0XHRpZiAoX3RoaXMuY3VycmVudFRpbWUgPT09IHVuZGVmaW5lZCB8fCBfdGhpcy5jdXJyZW50VGltZSA9PT0gbnVsbCkge1xuXHRcdFx0XHRcdFx0X3RoaXMuY3VycmVudFRpbWUgPSBfdGhpcy5ub3coKTtcblx0XHRcdFx0XHR9XG5cblx0XHRcdFx0XHR2YXIgbW9udGggPSBfdGhpcy5jdXJyZW50VGltZS5nZXRNb250aCgpICsgMSxcblx0XHRcdFx0XHRcdHllYXI7XG5cdFx0XHRcdFx0aWYgKG1vbnRoID09PSAxMikge1xuXHRcdFx0XHRcdFx0X3RoaXMuY3VycmVudFRpbWUuc2V0RnVsbFllYXIoX3RoaXMuY3VycmVudFRpbWUuZ2V0RnVsbFllYXIoKSArIDEpO1xuXHRcdFx0XHRcdFx0bW9udGggPSAwO1xuXHRcdFx0XHRcdH1cblxuXHRcdFx0XHRcdHllYXIgPSBfdGhpcy5jdXJyZW50VGltZS5nZXRGdWxsWWVhcigpO1xuXG5cdFx0XHRcdFx0X3RoaXMuY3VycmVudFRpbWUuc2V0RGF0ZShcblx0XHRcdFx0XHRcdE1hdGgubWluKFxuXHRcdFx0XHRcdFx0XHRuZXcgRGF0ZShfdGhpcy5jdXJyZW50VGltZS5nZXRGdWxsWWVhcigpLCBtb250aCArIDEsIDApLmdldERhdGUoKSxcblx0XHRcdFx0XHRcdFx0X3RoaXMuY3VycmVudFRpbWUuZ2V0RGF0ZSgpXG5cdFx0XHRcdFx0XHQpXG5cdFx0XHRcdFx0KTtcblx0XHRcdFx0XHRfdGhpcy5jdXJyZW50VGltZS5zZXRNb250aChtb250aCk7XG5cblx0XHRcdFx0XHRpZiAob3B0aW9ucy5vbkNoYW5nZU1vbnRoICYmICQuaXNGdW5jdGlvbihvcHRpb25zLm9uQ2hhbmdlTW9udGgpKSB7XG5cdFx0XHRcdFx0XHRvcHRpb25zLm9uQ2hhbmdlTW9udGguY2FsbChkYXRldGltZXBpY2tlciwgX3hkc29mdF9kYXRldGltZS5jdXJyZW50VGltZSwgZGF0ZXRpbWVwaWNrZXIuZGF0YSgnaW5wdXQnKSk7XG5cdFx0XHRcdFx0fVxuXG5cdFx0XHRcdFx0aWYgKHllYXIgIT09IF90aGlzLmN1cnJlbnRUaW1lLmdldEZ1bGxZZWFyKCkgJiYgJC5pc0Z1bmN0aW9uKG9wdGlvbnMub25DaGFuZ2VZZWFyKSkge1xuXHRcdFx0XHRcdFx0b3B0aW9ucy5vbkNoYW5nZVllYXIuY2FsbChkYXRldGltZXBpY2tlciwgX3hkc29mdF9kYXRldGltZS5jdXJyZW50VGltZSwgZGF0ZXRpbWVwaWNrZXIuZGF0YSgnaW5wdXQnKSk7XG5cdFx0XHRcdFx0fVxuXG5cdFx0XHRcdFx0ZGF0ZXRpbWVwaWNrZXIudHJpZ2dlcigneGNoYW5nZS54ZHNvZnQnKTtcblx0XHRcdFx0XHRyZXR1cm4gbW9udGg7XG5cdFx0XHRcdH07XG5cblx0XHRcdFx0X3RoaXMucHJldk1vbnRoID0gZnVuY3Rpb24gKCkge1xuXG5cdFx0XHRcdFx0aWYgKF90aGlzLmN1cnJlbnRUaW1lID09PSB1bmRlZmluZWQgfHwgX3RoaXMuY3VycmVudFRpbWUgPT09IG51bGwpIHtcblx0XHRcdFx0XHRcdF90aGlzLmN1cnJlbnRUaW1lID0gX3RoaXMubm93KCk7XG5cdFx0XHRcdFx0fVxuXG5cdFx0XHRcdFx0dmFyIG1vbnRoID0gX3RoaXMuY3VycmVudFRpbWUuZ2V0TW9udGgoKSAtIDE7XG5cdFx0XHRcdFx0aWYgKG1vbnRoID09PSAtMSkge1xuXHRcdFx0XHRcdFx0X3RoaXMuY3VycmVudFRpbWUuc2V0RnVsbFllYXIoX3RoaXMuY3VycmVudFRpbWUuZ2V0RnVsbFllYXIoKSAtIDEpO1xuXHRcdFx0XHRcdFx0bW9udGggPSAxMTtcblx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0X3RoaXMuY3VycmVudFRpbWUuc2V0RGF0ZShcblx0XHRcdFx0XHRcdE1hdGgubWluKFxuXHRcdFx0XHRcdFx0XHRuZXcgRGF0ZShfdGhpcy5jdXJyZW50VGltZS5nZXRGdWxsWWVhcigpLCBtb250aCArIDEsIDApLmdldERhdGUoKSxcblx0XHRcdFx0XHRcdFx0X3RoaXMuY3VycmVudFRpbWUuZ2V0RGF0ZSgpXG5cdFx0XHRcdFx0XHQpXG5cdFx0XHRcdFx0KTtcblx0XHRcdFx0XHRfdGhpcy5jdXJyZW50VGltZS5zZXRNb250aChtb250aCk7XG5cdFx0XHRcdFx0aWYgKG9wdGlvbnMub25DaGFuZ2VNb250aCAmJiAkLmlzRnVuY3Rpb24ob3B0aW9ucy5vbkNoYW5nZU1vbnRoKSkge1xuXHRcdFx0XHRcdFx0b3B0aW9ucy5vbkNoYW5nZU1vbnRoLmNhbGwoZGF0ZXRpbWVwaWNrZXIsIF94ZHNvZnRfZGF0ZXRpbWUuY3VycmVudFRpbWUsIGRhdGV0aW1lcGlja2VyLmRhdGEoJ2lucHV0JykpO1xuXHRcdFx0XHRcdH1cblx0XHRcdFx0XHRkYXRldGltZXBpY2tlci50cmlnZ2VyKCd4Y2hhbmdlLnhkc29mdCcpO1xuXHRcdFx0XHRcdHJldHVybiBtb250aDtcblx0XHRcdFx0fTtcblxuXHRcdFx0XHRfdGhpcy5nZXRXZWVrT2ZZZWFyID0gZnVuY3Rpb24gKGRhdGV0aW1lKSB7XG5cdFx0XHRcdFx0aWYgKG9wdGlvbnMub25HZXRXZWVrT2ZZZWFyICYmICQuaXNGdW5jdGlvbihvcHRpb25zLm9uR2V0V2Vla09mWWVhcikpIHtcblx0XHRcdFx0XHRcdHZhciB3ZWVrID0gb3B0aW9ucy5vbkdldFdlZWtPZlllYXIuY2FsbChkYXRldGltZXBpY2tlciwgZGF0ZXRpbWUpO1xuXHRcdFx0XHRcdFx0aWYgKHR5cGVvZiB3ZWVrICE9PSAndW5kZWZpbmVkJykge1xuXHRcdFx0XHRcdFx0XHRyZXR1cm4gd2Vlaztcblx0XHRcdFx0XHRcdH1cblx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0dmFyIG9uZWphbiA9IG5ldyBEYXRlKGRhdGV0aW1lLmdldEZ1bGxZZWFyKCksIDAsIDEpO1xuXG5cdFx0XHRcdFx0Ly9GaXJzdCB3ZWVrIG9mIHRoZSB5ZWFyIGlzIHRoIG9uZSB3aXRoIHRoZSBmaXJzdCBUaHVyc2RheSBhY2NvcmRpbmcgdG8gSVNPODYwMVxuXHRcdFx0XHRcdGlmIChvbmVqYW4uZ2V0RGF5KCkgIT09IDQpIHtcblx0XHRcdFx0XHRcdG9uZWphbi5zZXRNb250aCgwLCAxICsgKCg0IC0gb25lamFuLmdldERheSgpKyA3KSAlIDcpKTtcblx0XHRcdFx0XHR9XG5cblx0XHRcdFx0XHRyZXR1cm4gTWF0aC5jZWlsKCgoKGRhdGV0aW1lIC0gb25lamFuKSAvIDg2NDAwMDAwKSArIG9uZWphbi5nZXREYXkoKSArIDEpIC8gNyk7XG5cdFx0XHRcdH07XG5cblx0XHRcdFx0X3RoaXMuc3RyVG9EYXRlVGltZSA9IGZ1bmN0aW9uIChzRGF0ZVRpbWUpIHtcblx0XHRcdFx0XHR2YXIgdG1wRGF0ZSA9IFtdLCB0aW1lT2Zmc2V0LCBjdXJyZW50VGltZTtcblxuXHRcdFx0XHRcdGlmIChzRGF0ZVRpbWUgJiYgc0RhdGVUaW1lIGluc3RhbmNlb2YgRGF0ZSAmJiBfdGhpcy5pc1ZhbGlkRGF0ZShzRGF0ZVRpbWUpKSB7XG5cdFx0XHRcdFx0XHRyZXR1cm4gc0RhdGVUaW1lO1xuXHRcdFx0XHRcdH1cblxuXHRcdFx0XHRcdHRtcERhdGUgPSAvXihbKy1dezF9KSguKikkLy5leGVjKHNEYXRlVGltZSk7XG5cblx0XHRcdFx0XHRpZiAodG1wRGF0ZSkge1xuXHRcdFx0XHRcdFx0dG1wRGF0ZVsyXSA9IGRhdGVIZWxwZXIucGFyc2VEYXRlKHRtcERhdGVbMl0sIG9wdGlvbnMuZm9ybWF0RGF0ZSk7XG5cdFx0XHRcdFx0fVxuXG5cdFx0XHRcdFx0aWYgKHRtcERhdGUgICYmIHRtcERhdGVbMl0pIHtcblx0XHRcdFx0XHRcdHRpbWVPZmZzZXQgPSB0bXBEYXRlWzJdLmdldFRpbWUoKSAtICh0bXBEYXRlWzJdLmdldFRpbWV6b25lT2Zmc2V0KCkpICogNjAwMDA7XG5cdFx0XHRcdFx0XHRjdXJyZW50VGltZSA9IG5ldyBEYXRlKChfdGhpcy5ub3codHJ1ZSkpLmdldFRpbWUoKSArIHBhcnNlSW50KHRtcERhdGVbMV0gKyAnMScsIDEwKSAqIHRpbWVPZmZzZXQpO1xuXHRcdFx0XHRcdH0gZWxzZSB7XG5cdFx0XHRcdFx0XHRjdXJyZW50VGltZSA9IHNEYXRlVGltZSA/IGRhdGVIZWxwZXIucGFyc2VEYXRlKHNEYXRlVGltZSwgb3B0aW9ucy5mb3JtYXQpIDogX3RoaXMubm93KCk7XG5cdFx0XHRcdFx0fVxuXG5cdFx0XHRcdFx0aWYgKCFfdGhpcy5pc1ZhbGlkRGF0ZShjdXJyZW50VGltZSkpIHtcblx0XHRcdFx0XHRcdGN1cnJlbnRUaW1lID0gX3RoaXMubm93KCk7XG5cdFx0XHRcdFx0fVxuXG5cdFx0XHRcdFx0cmV0dXJuIGN1cnJlbnRUaW1lO1xuXHRcdFx0XHR9O1xuXG5cdFx0XHRcdF90aGlzLnN0clRvRGF0ZSA9IGZ1bmN0aW9uIChzRGF0ZSkge1xuXHRcdFx0XHRcdGlmIChzRGF0ZSAmJiBzRGF0ZSBpbnN0YW5jZW9mIERhdGUgJiYgX3RoaXMuaXNWYWxpZERhdGUoc0RhdGUpKSB7XG5cdFx0XHRcdFx0XHRyZXR1cm4gc0RhdGU7XG5cdFx0XHRcdFx0fVxuXG5cdFx0XHRcdFx0dmFyIGN1cnJlbnRUaW1lID0gc0RhdGUgPyBkYXRlSGVscGVyLnBhcnNlRGF0ZShzRGF0ZSwgb3B0aW9ucy5mb3JtYXREYXRlKSA6IF90aGlzLm5vdyh0cnVlKTtcblx0XHRcdFx0XHRpZiAoIV90aGlzLmlzVmFsaWREYXRlKGN1cnJlbnRUaW1lKSkge1xuXHRcdFx0XHRcdFx0Y3VycmVudFRpbWUgPSBfdGhpcy5ub3codHJ1ZSk7XG5cdFx0XHRcdFx0fVxuXHRcdFx0XHRcdHJldHVybiBjdXJyZW50VGltZTtcblx0XHRcdFx0fTtcblxuXHRcdFx0XHRfdGhpcy5zdHJ0b3RpbWUgPSBmdW5jdGlvbiAoc1RpbWUpIHtcblx0XHRcdFx0XHRpZiAoc1RpbWUgJiYgc1RpbWUgaW5zdGFuY2VvZiBEYXRlICYmIF90aGlzLmlzVmFsaWREYXRlKHNUaW1lKSkge1xuXHRcdFx0XHRcdFx0cmV0dXJuIHNUaW1lO1xuXHRcdFx0XHRcdH1cblx0XHRcdFx0XHR2YXIgY3VycmVudFRpbWUgPSBzVGltZSA/IGRhdGVIZWxwZXIucGFyc2VEYXRlKHNUaW1lLCBvcHRpb25zLmZvcm1hdFRpbWUpIDogX3RoaXMubm93KHRydWUpO1xuXHRcdFx0XHRcdGlmICghX3RoaXMuaXNWYWxpZERhdGUoY3VycmVudFRpbWUpKSB7XG5cdFx0XHRcdFx0XHRjdXJyZW50VGltZSA9IF90aGlzLm5vdyh0cnVlKTtcblx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0cmV0dXJuIGN1cnJlbnRUaW1lO1xuXHRcdFx0XHR9O1xuXG5cdFx0XHRcdF90aGlzLnN0ciA9IGZ1bmN0aW9uICgpIHtcblx0XHRcdFx0XHR2YXIgZm9ybWF0ID0gb3B0aW9ucy5mb3JtYXQ7XG5cdFx0XHRcdFx0aWYgKG9wdGlvbnMueWVhck9mZnNldCkge1xuXHRcdFx0XHRcdFx0Zm9ybWF0ID0gZm9ybWF0LnJlcGxhY2UoJ1knLCBfdGhpcy5jdXJyZW50VGltZS5nZXRGdWxsWWVhcigpICsgb3B0aW9ucy55ZWFyT2Zmc2V0KTtcblx0XHRcdFx0XHRcdGZvcm1hdCA9IGZvcm1hdC5yZXBsYWNlKCd5JywgU3RyaW5nKF90aGlzLmN1cnJlbnRUaW1lLmdldEZ1bGxZZWFyKCkgKyBvcHRpb25zLnllYXJPZmZzZXQpLnN1YnN0cmluZygyLCA0KSk7XG5cdFx0XHRcdFx0fVxuXHRcdFx0XHRcdHJldHVybiBkYXRlSGVscGVyLmZvcm1hdERhdGUoX3RoaXMuY3VycmVudFRpbWUsIGZvcm1hdCk7XG5cdFx0XHRcdH07XG5cdFx0XHRcdF90aGlzLmN1cnJlbnRUaW1lID0gdGhpcy5ub3coKTtcblx0XHRcdH07XG5cblx0XHRcdF94ZHNvZnRfZGF0ZXRpbWUgPSBuZXcgWERTb2Z0X2RhdGV0aW1lKCk7XG5cblx0XHRcdGFwcGx5QnV0dG9uLm9uKCd0b3VjaGVuZCBjbGljaycsIGZ1bmN0aW9uIChlKSB7Ly9wYXRoYnJpdGVcblx0XHRcdFx0ZS5wcmV2ZW50RGVmYXVsdCgpO1xuXHRcdFx0XHRkYXRldGltZXBpY2tlci5kYXRhKCdjaGFuZ2VkJywgdHJ1ZSk7XG5cdFx0XHRcdF94ZHNvZnRfZGF0ZXRpbWUuc2V0Q3VycmVudFRpbWUoZ2V0Q3VycmVudFZhbHVlKCkpO1xuXHRcdFx0XHRpbnB1dC52YWwoX3hkc29mdF9kYXRldGltZS5zdHIoKSk7XG5cdFx0XHRcdGRhdGV0aW1lcGlja2VyLnRyaWdnZXIoJ2Nsb3NlLnhkc29mdCcpO1xuXHRcdFx0fSk7XG5cdFx0XHRtb250aF9waWNrZXJcblx0XHRcdFx0LmZpbmQoJy54ZHNvZnRfdG9kYXlfYnV0dG9uJylcblx0XHRcdFx0Lm9uKCd0b3VjaGVuZCBtb3VzZWRvd24ueGRzb2Z0JywgZnVuY3Rpb24gKCkge1xuXHRcdFx0XHRcdGRhdGV0aW1lcGlja2VyLmRhdGEoJ2NoYW5nZWQnLCB0cnVlKTtcblx0XHRcdFx0XHRfeGRzb2Z0X2RhdGV0aW1lLnNldEN1cnJlbnRUaW1lKDAsIHRydWUpO1xuXHRcdFx0XHRcdGRhdGV0aW1lcGlja2VyLnRyaWdnZXIoJ2FmdGVyT3Blbi54ZHNvZnQnKTtcblx0XHRcdFx0fSkub24oJ2RibGNsaWNrLnhkc29mdCcsIGZ1bmN0aW9uICgpIHtcblx0XHRcdFx0dmFyIGN1cnJlbnREYXRlID0gX3hkc29mdF9kYXRldGltZS5nZXRDdXJyZW50VGltZSgpLCBtaW5EYXRlLCBtYXhEYXRlO1xuXHRcdFx0XHRjdXJyZW50RGF0ZSA9IG5ldyBEYXRlKGN1cnJlbnREYXRlLmdldEZ1bGxZZWFyKCksIGN1cnJlbnREYXRlLmdldE1vbnRoKCksIGN1cnJlbnREYXRlLmdldERhdGUoKSk7XG5cdFx0XHRcdG1pbkRhdGUgPSBfeGRzb2Z0X2RhdGV0aW1lLnN0clRvRGF0ZShvcHRpb25zLm1pbkRhdGUpO1xuXHRcdFx0XHRtaW5EYXRlID0gbmV3IERhdGUobWluRGF0ZS5nZXRGdWxsWWVhcigpLCBtaW5EYXRlLmdldE1vbnRoKCksIG1pbkRhdGUuZ2V0RGF0ZSgpKTtcblx0XHRcdFx0aWYgKGN1cnJlbnREYXRlIDwgbWluRGF0ZSkge1xuXHRcdFx0XHRcdHJldHVybjtcblx0XHRcdFx0fVxuXHRcdFx0XHRtYXhEYXRlID0gX3hkc29mdF9kYXRldGltZS5zdHJUb0RhdGUob3B0aW9ucy5tYXhEYXRlKTtcblx0XHRcdFx0bWF4RGF0ZSA9IG5ldyBEYXRlKG1heERhdGUuZ2V0RnVsbFllYXIoKSwgbWF4RGF0ZS5nZXRNb250aCgpLCBtYXhEYXRlLmdldERhdGUoKSk7XG5cdFx0XHRcdGlmIChjdXJyZW50RGF0ZSA+IG1heERhdGUpIHtcblx0XHRcdFx0XHRyZXR1cm47XG5cdFx0XHRcdH1cblx0XHRcdFx0aW5wdXQudmFsKF94ZHNvZnRfZGF0ZXRpbWUuc3RyKCkpO1xuXHRcdFx0XHRpbnB1dC50cmlnZ2VyKCdjaGFuZ2UnKTtcblx0XHRcdFx0ZGF0ZXRpbWVwaWNrZXIudHJpZ2dlcignY2xvc2UueGRzb2Z0Jyk7XG5cdFx0XHR9KTtcblx0XHRcdG1vbnRoX3BpY2tlclxuXHRcdFx0XHQuZmluZCgnLnhkc29mdF9wcmV2LC54ZHNvZnRfbmV4dCcpXG5cdFx0XHRcdC5vbigndG91Y2hlbmQgbW91c2Vkb3duLnhkc29mdCcsIGZ1bmN0aW9uICgpIHtcblx0XHRcdFx0XHR2YXIgJHRoaXMgPSAkKHRoaXMpLFxuXHRcdFx0XHRcdFx0dGltZXIgPSAwLFxuXHRcdFx0XHRcdFx0c3RvcCA9IGZhbHNlO1xuXG5cdFx0XHRcdFx0KGZ1bmN0aW9uIGFyZ3VtZW50c19jYWxsZWUxKHYpIHtcblx0XHRcdFx0XHRcdGlmICgkdGhpcy5oYXNDbGFzcyhvcHRpb25zLm5leHQpKSB7XG5cdFx0XHRcdFx0XHRcdF94ZHNvZnRfZGF0ZXRpbWUubmV4dE1vbnRoKCk7XG5cdFx0XHRcdFx0XHR9IGVsc2UgaWYgKCR0aGlzLmhhc0NsYXNzKG9wdGlvbnMucHJldikpIHtcblx0XHRcdFx0XHRcdFx0X3hkc29mdF9kYXRldGltZS5wcmV2TW9udGgoKTtcblx0XHRcdFx0XHRcdH1cblx0XHRcdFx0XHRcdGlmIChvcHRpb25zLm1vbnRoQ2hhbmdlU3Bpbm5lcikge1xuXHRcdFx0XHRcdFx0XHRpZiAoIXN0b3ApIHtcblx0XHRcdFx0XHRcdFx0XHR0aW1lciA9IHNldFRpbWVvdXQoYXJndW1lbnRzX2NhbGxlZTEsIHYgfHwgMTAwKTtcblx0XHRcdFx0XHRcdFx0fVxuXHRcdFx0XHRcdFx0fVxuXHRcdFx0XHRcdH0oNTAwKSk7XG5cblx0XHRcdFx0XHQkKFtvcHRpb25zLm93bmVyRG9jdW1lbnQuYm9keSwgb3B0aW9ucy5jb250ZW50V2luZG93XSkub24oJ3RvdWNoZW5kIG1vdXNldXAueGRzb2Z0JywgZnVuY3Rpb24gYXJndW1lbnRzX2NhbGxlZTIoKSB7XG5cdFx0XHRcdFx0XHRjbGVhclRpbWVvdXQodGltZXIpO1xuXHRcdFx0XHRcdFx0c3RvcCA9IHRydWU7XG5cdFx0XHRcdFx0XHQkKFtvcHRpb25zLm93bmVyRG9jdW1lbnQuYm9keSwgb3B0aW9ucy5jb250ZW50V2luZG93XSkub2ZmKCd0b3VjaGVuZCBtb3VzZXVwLnhkc29mdCcsIGFyZ3VtZW50c19jYWxsZWUyKTtcblx0XHRcdFx0XHR9KTtcblx0XHRcdFx0fSk7XG5cblx0XHRcdHRpbWVwaWNrZXJcblx0XHRcdFx0LmZpbmQoJy54ZHNvZnRfcHJldiwueGRzb2Z0X25leHQnKVxuXHRcdFx0XHQub24oJ3RvdWNoZW5kIG1vdXNlZG93bi54ZHNvZnQnLCBmdW5jdGlvbiAoKSB7XG5cdFx0XHRcdFx0dmFyICR0aGlzID0gJCh0aGlzKSxcblx0XHRcdFx0XHRcdHRpbWVyID0gMCxcblx0XHRcdFx0XHRcdHN0b3AgPSBmYWxzZSxcblx0XHRcdFx0XHRcdHBlcmlvZCA9IDExMDtcblx0XHRcdFx0XHQoZnVuY3Rpb24gYXJndW1lbnRzX2NhbGxlZTQodikge1xuXHRcdFx0XHRcdFx0dmFyIHBoZWlnaHQgPSB0aW1lYm94cGFyZW50WzBdLmNsaWVudEhlaWdodCxcblx0XHRcdFx0XHRcdFx0aGVpZ2h0ID0gdGltZWJveFswXS5vZmZzZXRIZWlnaHQsXG5cdFx0XHRcdFx0XHRcdHRvcCA9IE1hdGguYWJzKHBhcnNlSW50KHRpbWVib3guY3NzKCdtYXJnaW5Ub3AnKSwgMTApKTtcblx0XHRcdFx0XHRcdGlmICgkdGhpcy5oYXNDbGFzcyhvcHRpb25zLm5leHQpICYmIChoZWlnaHQgLSBwaGVpZ2h0KSAtIG9wdGlvbnMudGltZUhlaWdodEluVGltZVBpY2tlciA+PSB0b3ApIHtcblx0XHRcdFx0XHRcdFx0dGltZWJveC5jc3MoJ21hcmdpblRvcCcsICctJyArICh0b3AgKyBvcHRpb25zLnRpbWVIZWlnaHRJblRpbWVQaWNrZXIpICsgJ3B4Jyk7XG5cdFx0XHRcdFx0XHR9IGVsc2UgaWYgKCR0aGlzLmhhc0NsYXNzKG9wdGlvbnMucHJldikgJiYgdG9wIC0gb3B0aW9ucy50aW1lSGVpZ2h0SW5UaW1lUGlja2VyID49IDApIHtcblx0XHRcdFx0XHRcdFx0dGltZWJveC5jc3MoJ21hcmdpblRvcCcsICctJyArICh0b3AgLSBvcHRpb25zLnRpbWVIZWlnaHRJblRpbWVQaWNrZXIpICsgJ3B4Jyk7XG5cdFx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0XHQvKipcblx0XHRcdFx0XHRcdCAqIEZpeGVkIGJ1Zzpcblx0XHRcdFx0XHRcdCAqIFdoZW4gdXNpbmcgY3NzMyB0cmFuc2l0aW9uLCBpdCB3aWxsIGNhdXNlIGEgYnVnIHRoYXQgeW91IGNhbm5vdCBzY3JvbGwgdGhlIHRpbWVwaWNrZXIgbGlzdC5cblx0XHRcdFx0XHRcdCAqIFRoZSByZWFzb24gaXMgdGhhdCB0aGUgdHJhbnNpdGlvbi1kdXJhdGlvbiB0aW1lLCBpZiB5b3Ugc2V0IGl0IHRvIDAsIGFsbCB0aGluZ3MgZmluZSwgb3RoZXJ3aXNlLCB0aGlzXG5cdFx0XHRcdFx0XHQgKiB3b3VsZCBjYXVzZSBhIGJ1ZyB3aGVuIHlvdSB1c2UganF1ZXJ5LmNzcyBtZXRob2QuXG5cdFx0XHRcdFx0XHQgKiBMZXQncyBzYXk6ICogeyB0cmFuc2l0aW9uOiBhbGwgLjVzIGVhc2U7IH1cblx0XHRcdFx0XHRcdCAqIGpxdWVyeSB0aW1lYm94LmNzcygnbWFyZ2luVG9wJykgd2lsbCByZXR1cm4gdGhlIG9yaWdpbmFsIHZhbHVlIHdoaWNoIGlzIGJlZm9yZSB5b3UgY2xpY2tpbmcgdGhlIG5leHQvcHJldiBidXR0b24sXG5cdFx0XHRcdFx0XHQgKiBtZWFud2hpbGUgdGhlIHRpbWVib3hbMF0uc3R5bGUubWFyZ2luVG9wIHdpbGwgcmV0dXJuIHRoZSByaWdodCB2YWx1ZSB3aGljaCBpcyBhZnRlciB5b3UgY2xpY2tpbmcgdGhlXG5cdFx0XHRcdFx0XHQgKiBuZXh0L3ByZXYgYnV0dG9uLlxuXHRcdFx0XHRcdFx0ICpcblx0XHRcdFx0XHRcdCAqIFdoYXQgd2Ugc2hvdWxkIGRvOlxuXHRcdFx0XHRcdFx0ICogUmVwbGFjZSB0aW1lYm94LmNzcygnbWFyZ2luVG9wJykgd2l0aCB0aW1lYm94WzBdLnN0eWxlLm1hcmdpblRvcC5cblx0XHRcdFx0XHRcdCAqL1xuXHRcdFx0XHRcdFx0dGltZWJveHBhcmVudC50cmlnZ2VyKCdzY3JvbGxfZWxlbWVudC54ZHNvZnRfc2Nyb2xsZXInLCBbTWF0aC5hYnMocGFyc2VJbnQodGltZWJveFswXS5zdHlsZS5tYXJnaW5Ub3AsIDEwKSAvIChoZWlnaHQgLSBwaGVpZ2h0KSldKTtcblx0XHRcdFx0XHRcdHBlcmlvZCA9IChwZXJpb2QgPiAxMCkgPyAxMCA6IHBlcmlvZCAtIDEwO1xuXHRcdFx0XHRcdFx0aWYgKCFzdG9wKSB7XG5cdFx0XHRcdFx0XHRcdHRpbWVyID0gc2V0VGltZW91dChhcmd1bWVudHNfY2FsbGVlNCwgdiB8fCBwZXJpb2QpO1xuXHRcdFx0XHRcdFx0fVxuXHRcdFx0XHRcdH0oNTAwKSk7XG5cdFx0XHRcdFx0JChbb3B0aW9ucy5vd25lckRvY3VtZW50LmJvZHksIG9wdGlvbnMuY29udGVudFdpbmRvd10pLm9uKCd0b3VjaGVuZCBtb3VzZXVwLnhkc29mdCcsIGZ1bmN0aW9uIGFyZ3VtZW50c19jYWxsZWU1KCkge1xuXHRcdFx0XHRcdFx0Y2xlYXJUaW1lb3V0KHRpbWVyKTtcblx0XHRcdFx0XHRcdHN0b3AgPSB0cnVlO1xuXHRcdFx0XHRcdFx0JChbb3B0aW9ucy5vd25lckRvY3VtZW50LmJvZHksIG9wdGlvbnMuY29udGVudFdpbmRvd10pXG5cdFx0XHRcdFx0XHRcdC5vZmYoJ3RvdWNoZW5kIG1vdXNldXAueGRzb2Z0JywgYXJndW1lbnRzX2NhbGxlZTUpO1xuXHRcdFx0XHRcdH0pO1xuXHRcdFx0XHR9KTtcblxuXHRcdFx0eGNoYW5nZVRpbWVyID0gMDtcblx0XHRcdC8vIGJhc2UgaGFuZGxlciAtIGdlbmVyYXRpbmcgYSBjYWxlbmRhciBhbmQgdGltZXBpY2tlclxuXHRcdFx0ZGF0ZXRpbWVwaWNrZXJcblx0XHRcdFx0Lm9uKCd4Y2hhbmdlLnhkc29mdCcsIGZ1bmN0aW9uIChldmVudCkge1xuXHRcdFx0XHRcdGNsZWFyVGltZW91dCh4Y2hhbmdlVGltZXIpO1xuXHRcdFx0XHRcdHhjaGFuZ2VUaW1lciA9IHNldFRpbWVvdXQoZnVuY3Rpb24gKCkge1xuXG5cdFx0XHRcdFx0XHRpZiAoX3hkc29mdF9kYXRldGltZS5jdXJyZW50VGltZSA9PT0gdW5kZWZpbmVkIHx8IF94ZHNvZnRfZGF0ZXRpbWUuY3VycmVudFRpbWUgPT09IG51bGwpIHtcblx0XHRcdFx0XHRcdFx0X3hkc29mdF9kYXRldGltZS5jdXJyZW50VGltZSA9IF94ZHNvZnRfZGF0ZXRpbWUubm93KCk7XG5cdFx0XHRcdFx0XHR9XG5cblx0XHRcdFx0XHRcdHZhciB0YWJsZSA9XHQnJyxcblx0XHRcdFx0XHRcdFx0c3RhcnQgPSBuZXcgRGF0ZShfeGRzb2Z0X2RhdGV0aW1lLmN1cnJlbnRUaW1lLmdldEZ1bGxZZWFyKCksIF94ZHNvZnRfZGF0ZXRpbWUuY3VycmVudFRpbWUuZ2V0TW9udGgoKSwgMSwgMTIsIDAsIDApLFxuXHRcdFx0XHRcdFx0XHRpID0gMCxcblx0XHRcdFx0XHRcdFx0aixcblx0XHRcdFx0XHRcdFx0dG9kYXkgPSBfeGRzb2Z0X2RhdGV0aW1lLm5vdygpLFxuXHRcdFx0XHRcdFx0XHRtYXhEYXRlID0gZmFsc2UsXG5cdFx0XHRcdFx0XHRcdG1pbkRhdGUgPSBmYWxzZSxcblx0XHRcdFx0XHRcdFx0bWluRGF0ZVRpbWUgPSBmYWxzZSxcblx0XHRcdFx0XHRcdFx0bWF4RGF0ZVRpbWUgPSBmYWxzZSxcblx0XHRcdFx0XHRcdFx0aERhdGUsXG5cdFx0XHRcdFx0XHRcdGRheSxcblx0XHRcdFx0XHRcdFx0ZCxcblx0XHRcdFx0XHRcdFx0eSxcblx0XHRcdFx0XHRcdFx0bSxcblx0XHRcdFx0XHRcdFx0dyxcblx0XHRcdFx0XHRcdFx0Y2xhc3NlcyA9IFtdLFxuXHRcdFx0XHRcdFx0XHRjdXN0b21EYXRlU2V0dGluZ3MsXG5cdFx0XHRcdFx0XHRcdG5ld1JvdyA9IHRydWUsXG5cdFx0XHRcdFx0XHRcdHRpbWUgPSAnJyxcblx0XHRcdFx0XHRcdFx0aCxcblx0XHRcdFx0XHRcdFx0bGluZV90aW1lLFxuXHRcdFx0XHRcdFx0XHRkZXNjcmlwdGlvbjtcblxuXHRcdFx0XHRcdFx0d2hpbGUgKHN0YXJ0LmdldERheSgpICE9PSBvcHRpb25zLmRheU9mV2Vla1N0YXJ0KSB7XG5cdFx0XHRcdFx0XHRcdHN0YXJ0LnNldERhdGUoc3RhcnQuZ2V0RGF0ZSgpIC0gMSk7XG5cdFx0XHRcdFx0XHR9XG5cblx0XHRcdFx0XHRcdHRhYmxlICs9ICc8dGFibGU+PHRoZWFkPjx0cj4nO1xuXG5cdFx0XHRcdFx0XHRpZiAob3B0aW9ucy53ZWVrcykge1xuXHRcdFx0XHRcdFx0XHR0YWJsZSArPSAnPHRoPjwvdGg+Jztcblx0XHRcdFx0XHRcdH1cblxuXHRcdFx0XHRcdFx0Zm9yIChqID0gMDsgaiA8IDc7IGogKz0gMSkge1xuXHRcdFx0XHRcdFx0XHR0YWJsZSArPSAnPHRoPicgKyBvcHRpb25zLmkxOG5bZ2xvYmFsTG9jYWxlXS5kYXlPZldlZWtTaG9ydFsoaiArIG9wdGlvbnMuZGF5T2ZXZWVrU3RhcnQpICUgN10gKyAnPC90aD4nO1xuXHRcdFx0XHRcdFx0fVxuXG5cdFx0XHRcdFx0XHR0YWJsZSArPSAnPC90cj48L3RoZWFkPic7XG5cdFx0XHRcdFx0XHR0YWJsZSArPSAnPHRib2R5Pic7XG5cblx0XHRcdFx0XHRcdGlmIChvcHRpb25zLm1heERhdGUgIT09IGZhbHNlKSB7XG5cdFx0XHRcdFx0XHRcdG1heERhdGUgPSBfeGRzb2Z0X2RhdGV0aW1lLnN0clRvRGF0ZShvcHRpb25zLm1heERhdGUpO1xuXHRcdFx0XHRcdFx0XHRtYXhEYXRlID0gbmV3IERhdGUobWF4RGF0ZS5nZXRGdWxsWWVhcigpLCBtYXhEYXRlLmdldE1vbnRoKCksIG1heERhdGUuZ2V0RGF0ZSgpLCAyMywgNTksIDU5LCA5OTkpO1xuXHRcdFx0XHRcdFx0fVxuXG5cdFx0XHRcdFx0XHRpZiAob3B0aW9ucy5taW5EYXRlICE9PSBmYWxzZSkge1xuXHRcdFx0XHRcdFx0XHRtaW5EYXRlID0gX3hkc29mdF9kYXRldGltZS5zdHJUb0RhdGUob3B0aW9ucy5taW5EYXRlKTtcblx0XHRcdFx0XHRcdFx0bWluRGF0ZSA9IG5ldyBEYXRlKG1pbkRhdGUuZ2V0RnVsbFllYXIoKSwgbWluRGF0ZS5nZXRNb250aCgpLCBtaW5EYXRlLmdldERhdGUoKSk7XG5cdFx0XHRcdFx0XHR9XG5cbiAgICAgICAgICAgICAgICAgICAgICAgIGlmIChvcHRpb25zLm1pbkRhdGVUaW1lICE9PSBmYWxzZSkge1xuXHRcdFx0XHRcdFx0XHRtaW5EYXRlVGltZSA9IF94ZHNvZnRfZGF0ZXRpbWUuc3RyVG9EYXRlKG9wdGlvbnMubWluRGF0ZVRpbWUpO1xuXHRcdFx0XHRcdFx0XHRtaW5EYXRlVGltZSA9IG5ldyBEYXRlKG1pbkRhdGVUaW1lLmdldEZ1bGxZZWFyKCksIG1pbkRhdGVUaW1lLmdldE1vbnRoKCksIG1pbkRhdGVUaW1lLmdldERhdGUoKSwgbWluRGF0ZVRpbWUuZ2V0SG91cnMoKSwgbWluRGF0ZVRpbWUuZ2V0TWludXRlcygpLCBtaW5EYXRlVGltZS5nZXRTZWNvbmRzKCkpO1xuXHRcdFx0XHRcdFx0fVxuXG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAob3B0aW9ucy5tYXhEYXRlVGltZSAhPT0gZmFsc2UpIHtcblx0XHRcdFx0XHRcdFx0bWF4RGF0ZVRpbWUgPSBfeGRzb2Z0X2RhdGV0aW1lLnN0clRvRGF0ZShvcHRpb25zLm1heERhdGVUaW1lKTtcblx0XHRcdFx0XHRcdFx0bWF4RGF0ZVRpbWUgPSBuZXcgRGF0ZShtYXhEYXRlVGltZS5nZXRGdWxsWWVhcigpLCBtYXhEYXRlVGltZS5nZXRNb250aCgpLCBtYXhEYXRlVGltZS5nZXREYXRlKCksIG1heERhdGVUaW1lLmdldEhvdXJzKCksIG1heERhdGVUaW1lLmdldE1pbnV0ZXMoKSwgbWF4RGF0ZVRpbWUuZ2V0U2Vjb25kcygpKTtcblx0XHRcdFx0XHRcdH1cblxuXHRcdFx0XHRcdFx0dmFyIG1heERhdGVUaW1lRGF5O1xuXHRcdFx0XHRcdFx0aWYgKG1heERhdGVUaW1lICE9PSBmYWxzZSkge1xuXHRcdFx0XHRcdFx0XHRtYXhEYXRlVGltZURheSA9ICgobWF4RGF0ZVRpbWUuZ2V0RnVsbFllYXIoKSAqIDEyKSArIG1heERhdGVUaW1lLmdldE1vbnRoKCkpICogMzEgKyBtYXhEYXRlVGltZS5nZXREYXRlKCk7XG5cdFx0XHRcdFx0XHR9XG5cblx0XHRcdFx0XHRcdHdoaWxlIChpIDwgX3hkc29mdF9kYXRldGltZS5jdXJyZW50VGltZS5jb3VudERheXNJbk1vbnRoKCkgfHwgc3RhcnQuZ2V0RGF5KCkgIT09IG9wdGlvbnMuZGF5T2ZXZWVrU3RhcnQgfHwgX3hkc29mdF9kYXRldGltZS5jdXJyZW50VGltZS5nZXRNb250aCgpID09PSBzdGFydC5nZXRNb250aCgpKSB7XG5cdFx0XHRcdFx0XHRcdGNsYXNzZXMgPSBbXTtcblx0XHRcdFx0XHRcdFx0aSArPSAxO1xuXG5cdFx0XHRcdFx0XHRcdGRheSA9IHN0YXJ0LmdldERheSgpO1xuXHRcdFx0XHRcdFx0XHRkID0gc3RhcnQuZ2V0RGF0ZSgpO1xuXHRcdFx0XHRcdFx0XHR5ID0gc3RhcnQuZ2V0RnVsbFllYXIoKTtcblx0XHRcdFx0XHRcdFx0bSA9IHN0YXJ0LmdldE1vbnRoKCk7XG5cdFx0XHRcdFx0XHRcdHcgPSBfeGRzb2Z0X2RhdGV0aW1lLmdldFdlZWtPZlllYXIoc3RhcnQpO1xuXHRcdFx0XHRcdFx0XHRkZXNjcmlwdGlvbiA9ICcnO1xuXG5cdFx0XHRcdFx0XHRcdGNsYXNzZXMucHVzaCgneGRzb2Z0X2RhdGUnKTtcblxuXHRcdFx0XHRcdFx0XHRpZiAob3B0aW9ucy5iZWZvcmVTaG93RGF5ICYmICQuaXNGdW5jdGlvbihvcHRpb25zLmJlZm9yZVNob3dEYXkuY2FsbCkpIHtcblx0XHRcdFx0XHRcdFx0XHRjdXN0b21EYXRlU2V0dGluZ3MgPSBvcHRpb25zLmJlZm9yZVNob3dEYXkuY2FsbChkYXRldGltZXBpY2tlciwgc3RhcnQpO1xuXHRcdFx0XHRcdFx0XHR9IGVsc2Uge1xuXHRcdFx0XHRcdFx0XHRcdGN1c3RvbURhdGVTZXR0aW5ncyA9IG51bGw7XG5cdFx0XHRcdFx0XHRcdH1cblxuXHRcdFx0XHRcdFx0XHRpZihvcHRpb25zLmFsbG93RGF0ZVJlICYmIE9iamVjdC5wcm90b3R5cGUudG9TdHJpbmcuY2FsbChvcHRpb25zLmFsbG93RGF0ZVJlKSA9PT0gXCJbb2JqZWN0IFJlZ0V4cF1cIil7XG5cdFx0XHRcdFx0XHRcdFx0aWYoIW9wdGlvbnMuYWxsb3dEYXRlUmUudGVzdChkYXRlSGVscGVyLmZvcm1hdERhdGUoc3RhcnQsIG9wdGlvbnMuZm9ybWF0RGF0ZSkpKXtcblx0XHRcdFx0XHRcdFx0XHRcdGNsYXNzZXMucHVzaCgneGRzb2Z0X2Rpc2FibGVkJyk7XG5cdFx0XHRcdFx0XHRcdFx0fVxuXHRcdFx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0XHRcdFxuXHRcdFx0XHRcdFx0XHRpZihvcHRpb25zLmFsbG93RGF0ZXMgJiYgb3B0aW9ucy5hbGxvd0RhdGVzLmxlbmd0aD4wKXtcblx0XHRcdFx0XHRcdFx0XHRpZihvcHRpb25zLmFsbG93RGF0ZXMuaW5kZXhPZihkYXRlSGVscGVyLmZvcm1hdERhdGUoc3RhcnQsIG9wdGlvbnMuZm9ybWF0RGF0ZSkpID09PSAtMSl7XG5cdFx0XHRcdFx0XHRcdFx0XHRjbGFzc2VzLnB1c2goJ3hkc29mdF9kaXNhYmxlZCcpO1xuXHRcdFx0XHRcdFx0XHRcdH1cblx0XHRcdFx0XHRcdFx0fVxuXHRcdFx0XHRcdFx0XHRcblx0XHRcdFx0XHRcdFx0dmFyIGN1cnJlbnREYXkgPSAoKHN0YXJ0LmdldEZ1bGxZZWFyKCkgKiAxMikgKyBzdGFydC5nZXRNb250aCgpKSAqIDMxICsgc3RhcnQuZ2V0RGF0ZSgpO1xuXHRcdFx0XHRcdFx0XHRpZiAoKG1heERhdGUgIT09IGZhbHNlICYmIHN0YXJ0ID4gbWF4RGF0ZSkgfHwgKG1pbkRhdGVUaW1lICE9PSBmYWxzZSAmJiBzdGFydCA8IG1pbkRhdGVUaW1lKSAgfHwgKG1pbkRhdGUgIT09IGZhbHNlICYmIHN0YXJ0IDwgbWluRGF0ZSkgfHwgKG1heERhdGVUaW1lICE9PSBmYWxzZSAmJiBjdXJyZW50RGF5ID4gbWF4RGF0ZVRpbWVEYXkpIHx8IChjdXN0b21EYXRlU2V0dGluZ3MgJiYgY3VzdG9tRGF0ZVNldHRpbmdzWzBdID09PSBmYWxzZSkpIHtcblx0XHRcdFx0XHRcdFx0XHRjbGFzc2VzLnB1c2goJ3hkc29mdF9kaXNhYmxlZCcpO1xuXHRcdFx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0XHRcdFxuXHRcdFx0XHRcdFx0XHRpZiAob3B0aW9ucy5kaXNhYmxlZERhdGVzLmluZGV4T2YoZGF0ZUhlbHBlci5mb3JtYXREYXRlKHN0YXJ0LCBvcHRpb25zLmZvcm1hdERhdGUpKSAhPT0gLTEpIHtcblx0XHRcdFx0XHRcdFx0XHRjbGFzc2VzLnB1c2goJ3hkc29mdF9kaXNhYmxlZCcpO1xuXHRcdFx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0XHRcdFxuXHRcdFx0XHRcdFx0XHRpZiAob3B0aW9ucy5kaXNhYmxlZFdlZWtEYXlzLmluZGV4T2YoZGF5KSAhPT0gLTEpIHtcblx0XHRcdFx0XHRcdFx0XHRjbGFzc2VzLnB1c2goJ3hkc29mdF9kaXNhYmxlZCcpO1xuXHRcdFx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0XHRcdFxuXHRcdFx0XHRcdFx0XHRpZiAoaW5wdXQuaXMoJ1tkaXNhYmxlZF0nKSkge1xuXHRcdFx0XHRcdFx0XHRcdGNsYXNzZXMucHVzaCgneGRzb2Z0X2Rpc2FibGVkJyk7XG5cdFx0XHRcdFx0XHRcdH1cblxuXHRcdFx0XHRcdFx0XHRpZiAoY3VzdG9tRGF0ZVNldHRpbmdzICYmIGN1c3RvbURhdGVTZXR0aW5nc1sxXSAhPT0gXCJcIikge1xuXHRcdFx0XHRcdFx0XHRcdGNsYXNzZXMucHVzaChjdXN0b21EYXRlU2V0dGluZ3NbMV0pO1xuXHRcdFx0XHRcdFx0XHR9XG5cblx0XHRcdFx0XHRcdFx0aWYgKF94ZHNvZnRfZGF0ZXRpbWUuY3VycmVudFRpbWUuZ2V0TW9udGgoKSAhPT0gbSkge1xuXHRcdFx0XHRcdFx0XHRcdGNsYXNzZXMucHVzaCgneGRzb2Z0X290aGVyX21vbnRoJyk7XG5cdFx0XHRcdFx0XHRcdH1cblxuXHRcdFx0XHRcdFx0XHRpZiAoKG9wdGlvbnMuZGVmYXVsdFNlbGVjdCB8fCBkYXRldGltZXBpY2tlci5kYXRhKCdjaGFuZ2VkJykpICYmIGRhdGVIZWxwZXIuZm9ybWF0RGF0ZShfeGRzb2Z0X2RhdGV0aW1lLmN1cnJlbnRUaW1lLCBvcHRpb25zLmZvcm1hdERhdGUpID09PSBkYXRlSGVscGVyLmZvcm1hdERhdGUoc3RhcnQsIG9wdGlvbnMuZm9ybWF0RGF0ZSkpIHtcblx0XHRcdFx0XHRcdFx0XHRjbGFzc2VzLnB1c2goJ3hkc29mdF9jdXJyZW50Jyk7XG5cdFx0XHRcdFx0XHRcdH1cblxuXHRcdFx0XHRcdFx0XHRpZiAoZGF0ZUhlbHBlci5mb3JtYXREYXRlKHRvZGF5LCBvcHRpb25zLmZvcm1hdERhdGUpID09PSBkYXRlSGVscGVyLmZvcm1hdERhdGUoc3RhcnQsIG9wdGlvbnMuZm9ybWF0RGF0ZSkpIHtcblx0XHRcdFx0XHRcdFx0XHRjbGFzc2VzLnB1c2goJ3hkc29mdF90b2RheScpO1xuXHRcdFx0XHRcdFx0XHR9XG5cblx0XHRcdFx0XHRcdFx0aWYgKHN0YXJ0LmdldERheSgpID09PSAwIHx8IHN0YXJ0LmdldERheSgpID09PSA2IHx8IG9wdGlvbnMud2Vla2VuZHMuaW5kZXhPZihkYXRlSGVscGVyLmZvcm1hdERhdGUoc3RhcnQsIG9wdGlvbnMuZm9ybWF0RGF0ZSkpICE9PSAtMSkge1xuXHRcdFx0XHRcdFx0XHRcdGNsYXNzZXMucHVzaCgneGRzb2Z0X3dlZWtlbmQnKTtcblx0XHRcdFx0XHRcdFx0fVxuXG5cdFx0XHRcdFx0XHRcdGlmIChvcHRpb25zLmhpZ2hsaWdodGVkRGF0ZXNbZGF0ZUhlbHBlci5mb3JtYXREYXRlKHN0YXJ0LCBvcHRpb25zLmZvcm1hdERhdGUpXSAhPT0gdW5kZWZpbmVkKSB7XG5cdFx0XHRcdFx0XHRcdFx0aERhdGUgPSBvcHRpb25zLmhpZ2hsaWdodGVkRGF0ZXNbZGF0ZUhlbHBlci5mb3JtYXREYXRlKHN0YXJ0LCBvcHRpb25zLmZvcm1hdERhdGUpXTtcblx0XHRcdFx0XHRcdFx0XHRjbGFzc2VzLnB1c2goaERhdGUuc3R5bGUgPT09IHVuZGVmaW5lZCA/ICd4ZHNvZnRfaGlnaGxpZ2h0ZWRfZGVmYXVsdCcgOiBoRGF0ZS5zdHlsZSk7XG5cdFx0XHRcdFx0XHRcdFx0ZGVzY3JpcHRpb24gPSBoRGF0ZS5kZXNjID09PSB1bmRlZmluZWQgPyAnJyA6IGhEYXRlLmRlc2M7XG5cdFx0XHRcdFx0XHRcdH1cblxuXHRcdFx0XHRcdFx0XHRpZiAob3B0aW9ucy5iZWZvcmVTaG93RGF5ICYmICQuaXNGdW5jdGlvbihvcHRpb25zLmJlZm9yZVNob3dEYXkpKSB7XG5cdFx0XHRcdFx0XHRcdFx0Y2xhc3Nlcy5wdXNoKG9wdGlvbnMuYmVmb3JlU2hvd0RheShzdGFydCkpO1xuXHRcdFx0XHRcdFx0XHR9XG5cblx0XHRcdFx0XHRcdFx0aWYgKG5ld1Jvdykge1xuXHRcdFx0XHRcdFx0XHRcdHRhYmxlICs9ICc8dHI+Jztcblx0XHRcdFx0XHRcdFx0XHRuZXdSb3cgPSBmYWxzZTtcblx0XHRcdFx0XHRcdFx0XHRpZiAob3B0aW9ucy53ZWVrcykge1xuXHRcdFx0XHRcdFx0XHRcdFx0dGFibGUgKz0gJzx0aD4nICsgdyArICc8L3RoPic7XG5cdFx0XHRcdFx0XHRcdFx0fVxuXHRcdFx0XHRcdFx0XHR9XG5cblx0XHRcdFx0XHRcdFx0dGFibGUgKz0gJzx0ZCBkYXRhLWRhdGU9XCInICsgZCArICdcIiBkYXRhLW1vbnRoPVwiJyArIG0gKyAnXCIgZGF0YS15ZWFyPVwiJyArIHkgKyAnXCInICsgJyBjbGFzcz1cInhkc29mdF9kYXRlIHhkc29mdF9kYXlfb2Zfd2VlaycgKyBzdGFydC5nZXREYXkoKSArICcgJyArIGNsYXNzZXMuam9pbignICcpICsgJ1wiIHRpdGxlPVwiJyArIGRlc2NyaXB0aW9uICsgJ1wiPicgK1xuXHRcdFx0XHRcdFx0XHRcdCc8ZGl2PicgKyBkICsgJzwvZGl2PicgK1xuXHRcdFx0XHRcdFx0XHRcdCc8L3RkPic7XG5cblx0XHRcdFx0XHRcdFx0aWYgKHN0YXJ0LmdldERheSgpID09PSBvcHRpb25zLmRheU9mV2Vla1N0YXJ0UHJldikge1xuXHRcdFx0XHRcdFx0XHRcdHRhYmxlICs9ICc8L3RyPic7XG5cdFx0XHRcdFx0XHRcdFx0bmV3Um93ID0gdHJ1ZTtcblx0XHRcdFx0XHRcdFx0fVxuXG5cdFx0XHRcdFx0XHRcdHN0YXJ0LnNldERhdGUoZCArIDEpO1xuXHRcdFx0XHRcdFx0fVxuXHRcdFx0XHRcdFx0dGFibGUgKz0gJzwvdGJvZHk+PC90YWJsZT4nO1xuXG5cdFx0XHRcdFx0XHRjYWxlbmRhci5odG1sKHRhYmxlKTtcblxuXHRcdFx0XHRcdFx0bW9udGhfcGlja2VyLmZpbmQoJy54ZHNvZnRfbGFiZWwgc3BhbicpLmVxKDApLnRleHQob3B0aW9ucy5pMThuW2dsb2JhbExvY2FsZV0ubW9udGhzW194ZHNvZnRfZGF0ZXRpbWUuY3VycmVudFRpbWUuZ2V0TW9udGgoKV0pO1xuXHRcdFx0XHRcdFx0bW9udGhfcGlja2VyLmZpbmQoJy54ZHNvZnRfbGFiZWwgc3BhbicpLmVxKDEpLnRleHQoX3hkc29mdF9kYXRldGltZS5jdXJyZW50VGltZS5nZXRGdWxsWWVhcigpICsgb3B0aW9ucy55ZWFyT2Zmc2V0KTtcblxuXHRcdFx0XHRcdFx0Ly8gZ2VuZXJhdGUgdGltZWJveFxuXHRcdFx0XHRcdFx0dGltZSA9ICcnO1xuXHRcdFx0XHRcdFx0aCA9ICcnO1xuXHRcdFx0XHRcdFx0bSA9ICcnO1xuXG5cdFx0XHRcdFx0XHR2YXIgbWluVGltZU1pbnV0ZXNPZkRheSA9IDA7XG5cdFx0XHRcdFx0XHRpZiAob3B0aW9ucy5taW5UaW1lICE9PSBmYWxzZSkge1xuXHRcdFx0XHRcdFx0ICAgIHZhciB0ID0gX3hkc29mdF9kYXRldGltZS5zdHJ0b3RpbWUob3B0aW9ucy5taW5UaW1lKTtcblx0XHRcdFx0XHRcdCAgICBtaW5UaW1lTWludXRlc09mRGF5ID0gNjAgKiB0LmdldEhvdXJzKCkgKyB0LmdldE1pbnV0ZXMoKTtcblx0XHRcdFx0XHRcdH1cblx0XHRcdFx0XHRcdHZhciBtYXhUaW1lTWludXRlc09mRGF5ID0gMjQgKiA2MDtcblx0XHRcdFx0XHRcdGlmIChvcHRpb25zLm1heFRpbWUgIT09IGZhbHNlKSB7XG5cdFx0XHRcdFx0XHQgICAgdmFyIHQgPSBfeGRzb2Z0X2RhdGV0aW1lLnN0cnRvdGltZShvcHRpb25zLm1heFRpbWUpO1xuXHRcdFx0XHRcdFx0ICAgIG1heFRpbWVNaW51dGVzT2ZEYXkgPSA2MCAqIHQuZ2V0SG91cnMoKSArIHQuZ2V0TWludXRlcygpO1xuXHRcdFx0XHRcdFx0fVxuXG5cdFx0XHRcdFx0XHRpZiAob3B0aW9ucy5taW5EYXRlVGltZSAhPT0gZmFsc2UpIHtcblx0XHRcdFx0XHRcdFx0dmFyIHQgPSBfeGRzb2Z0X2RhdGV0aW1lLnN0clRvRGF0ZVRpbWUob3B0aW9ucy5taW5EYXRlVGltZSk7XG5cdFx0XHRcdFx0XHQgICAgICAgIHZhciBjdXJyZW50RGF5SXNNaW5EYXRlVGltZURheSA9IGRhdGVIZWxwZXIuZm9ybWF0RGF0ZShfeGRzb2Z0X2RhdGV0aW1lLmN1cnJlbnRUaW1lLCBvcHRpb25zLmZvcm1hdERhdGUpID09PSBkYXRlSGVscGVyLmZvcm1hdERhdGUodCwgb3B0aW9ucy5mb3JtYXREYXRlKTtcblx0XHRcdFx0XHRcdFx0aWYgKGN1cnJlbnREYXlJc01pbkRhdGVUaW1lRGF5KSB7XG5cdFx0XHRcdFx0XHRcdFx0dmFyIG0gPSA2MCAqIHQuZ2V0SG91cnMoKSArIHQuZ2V0TWludXRlcygpO1xuXHRcdFx0XHRcdFx0XHRcdGlmIChtID4gbWluVGltZU1pbnV0ZXNPZkRheSkgbWluVGltZU1pbnV0ZXNPZkRheSA9IG07XG5cdFx0XHRcdFx0XHRcdH1cblx0XHRcdFx0XHRcdH1cblxuXHRcdFx0XHRcdFx0aWYgKG9wdGlvbnMubWF4RGF0ZVRpbWUgIT09IGZhbHNlKSB7XG5cdFx0XHRcdFx0XHRcdHZhciB0ID0gX3hkc29mdF9kYXRldGltZS5zdHJUb0RhdGVUaW1lKG9wdGlvbnMubWF4RGF0ZVRpbWUpO1xuXHRcdFx0XHRcdFx0ICAgICAgICB2YXIgY3VycmVudERheUlzTWF4RGF0ZVRpbWVEYXkgPSBkYXRlSGVscGVyLmZvcm1hdERhdGUoX3hkc29mdF9kYXRldGltZS5jdXJyZW50VGltZSwgb3B0aW9ucy5mb3JtYXREYXRlKSA9PT0gZGF0ZUhlbHBlci5mb3JtYXREYXRlKHQsIG9wdGlvbnMuZm9ybWF0RGF0ZSk7XG5cdFx0XHRcdFx0XHRcdGlmIChjdXJyZW50RGF5SXNNYXhEYXRlVGltZURheSkge1xuXHRcdFx0XHRcdFx0XHRcdHZhciBtID0gNjAgKiB0LmdldEhvdXJzKCkgKyB0LmdldE1pbnV0ZXMoKTtcblx0XHRcdFx0XHRcdFx0XHRpZiAobSA8IG1heFRpbWVNaW51dGVzT2ZEYXkpIG1heFRpbWVNaW51dGVzT2ZEYXkgPSBtO1xuXHRcdFx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0XHR9XG5cblx0XHRcdFx0XHRcdGxpbmVfdGltZSA9IGZ1bmN0aW9uIGxpbmVfdGltZShoLCBtKSB7XG5cdFx0XHRcdFx0XHRcdHZhciBub3cgPSBfeGRzb2Z0X2RhdGV0aW1lLm5vdygpLCBjdXJyZW50X3RpbWUsXG5cdFx0XHRcdFx0XHRcdFx0aXNBTGxvd1RpbWVzSW5pdCA9IG9wdGlvbnMuYWxsb3dUaW1lcyAmJiAkLmlzQXJyYXkob3B0aW9ucy5hbGxvd1RpbWVzKSAmJiBvcHRpb25zLmFsbG93VGltZXMubGVuZ3RoO1xuXHRcdFx0XHRcdFx0XHRub3cuc2V0SG91cnMoaCk7XG5cdFx0XHRcdFx0XHRcdGggPSBwYXJzZUludChub3cuZ2V0SG91cnMoKSwgMTApO1xuXHRcdFx0XHRcdFx0XHRub3cuc2V0TWludXRlcyhtKTtcblx0XHRcdFx0XHRcdFx0bSA9IHBhcnNlSW50KG5vdy5nZXRNaW51dGVzKCksIDEwKTtcblx0XHRcdFx0XHRcdFx0Y2xhc3NlcyA9IFtdO1xuXHRcdFx0XHRcdFx0XHR2YXIgY3VycmVudE1pbnV0ZXNPZkRheSA9IDYwICogaCArIG07XG5cdFx0XHRcdFx0XHRcdGlmIChpbnB1dC5pcygnW2Rpc2FibGVkXScpIHx8IChjdXJyZW50TWludXRlc09mRGF5ID49IG1heFRpbWVNaW51dGVzT2ZEYXkpIHx8IChjdXJyZW50TWludXRlc09mRGF5IDwgbWluVGltZU1pbnV0ZXNPZkRheSkpIHtcblx0XHRcdFx0XHRcdFx0XHRjbGFzc2VzLnB1c2goJ3hkc29mdF9kaXNhYmxlZCcpO1xuXHRcdFx0XHRcdFx0XHR9XG5cblx0XHRcdFx0XHRcdFx0Y3VycmVudF90aW1lID0gbmV3IERhdGUoX3hkc29mdF9kYXRldGltZS5jdXJyZW50VGltZSk7XG5cdFx0XHRcdFx0XHRcdGN1cnJlbnRfdGltZS5zZXRIb3VycyhwYXJzZUludChfeGRzb2Z0X2RhdGV0aW1lLmN1cnJlbnRUaW1lLmdldEhvdXJzKCksIDEwKSk7XG5cblx0XHRcdFx0XHRcdFx0aWYgKCFpc0FMbG93VGltZXNJbml0KSB7XG5cdFx0XHRcdFx0XHRcdFx0Y3VycmVudF90aW1lLnNldE1pbnV0ZXMoTWF0aFtvcHRpb25zLnJvdW5kVGltZV0oX3hkc29mdF9kYXRldGltZS5jdXJyZW50VGltZS5nZXRNaW51dGVzKCkgLyBvcHRpb25zLnN0ZXApICogb3B0aW9ucy5zdGVwKTtcblx0XHRcdFx0XHRcdFx0fVxuXG5cdFx0XHRcdFx0XHRcdGlmICgob3B0aW9ucy5pbml0VGltZSB8fCBvcHRpb25zLmRlZmF1bHRTZWxlY3QgfHwgZGF0ZXRpbWVwaWNrZXIuZGF0YSgnY2hhbmdlZCcpKSAmJiBjdXJyZW50X3RpbWUuZ2V0SG91cnMoKSA9PT0gcGFyc2VJbnQoaCwgMTApICYmICgoIWlzQUxsb3dUaW1lc0luaXQgJiYgb3B0aW9ucy5zdGVwID4gNTkpIHx8IGN1cnJlbnRfdGltZS5nZXRNaW51dGVzKCkgPT09IHBhcnNlSW50KG0sIDEwKSkpIHtcblx0XHRcdFx0XHRcdFx0XHRpZiAob3B0aW9ucy5kZWZhdWx0U2VsZWN0IHx8IGRhdGV0aW1lcGlja2VyLmRhdGEoJ2NoYW5nZWQnKSkge1xuXHRcdFx0XHRcdFx0XHRcdFx0Y2xhc3Nlcy5wdXNoKCd4ZHNvZnRfY3VycmVudCcpO1xuXHRcdFx0XHRcdFx0XHRcdH0gZWxzZSBpZiAob3B0aW9ucy5pbml0VGltZSkge1xuXHRcdFx0XHRcdFx0XHRcdFx0Y2xhc3Nlcy5wdXNoKCd4ZHNvZnRfaW5pdF90aW1lJyk7XG5cdFx0XHRcdFx0XHRcdFx0fVxuXHRcdFx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0XHRcdGlmIChwYXJzZUludCh0b2RheS5nZXRIb3VycygpLCAxMCkgPT09IHBhcnNlSW50KGgsIDEwKSAmJiBwYXJzZUludCh0b2RheS5nZXRNaW51dGVzKCksIDEwKSA9PT0gcGFyc2VJbnQobSwgMTApKSB7XG5cdFx0XHRcdFx0XHRcdFx0Y2xhc3Nlcy5wdXNoKCd4ZHNvZnRfdG9kYXknKTtcblx0XHRcdFx0XHRcdFx0fVxuXHRcdFx0XHRcdFx0XHR0aW1lICs9ICc8ZGl2IGNsYXNzPVwieGRzb2Z0X3RpbWUgJyArIGNsYXNzZXMuam9pbignICcpICsgJ1wiIGRhdGEtaG91cj1cIicgKyBoICsgJ1wiIGRhdGEtbWludXRlPVwiJyArIG0gKyAnXCI+JyArIGRhdGVIZWxwZXIuZm9ybWF0RGF0ZShub3csIG9wdGlvbnMuZm9ybWF0VGltZSkgKyAnPC9kaXY+Jztcblx0XHRcdFx0XHRcdH07XG5cblx0XHRcdFx0XHRcdGlmICghb3B0aW9ucy5hbGxvd1RpbWVzIHx8ICEkLmlzQXJyYXkob3B0aW9ucy5hbGxvd1RpbWVzKSB8fCAhb3B0aW9ucy5hbGxvd1RpbWVzLmxlbmd0aCkge1xuXHRcdFx0XHRcdFx0XHRmb3IgKGkgPSAwLCBqID0gMDsgaSA8IChvcHRpb25zLmhvdXJzMTIgPyAxMiA6IDI0KTsgaSArPSAxKSB7XG5cdFx0XHRcdFx0XHRcdFx0Zm9yIChqID0gMDsgaiA8IDYwOyBqICs9IG9wdGlvbnMuc3RlcCkge1xuXHRcdFx0XHRcdFx0XHRcdCAgICAgICAgdmFyIGN1cnJlbnRNaW51dGVzT2ZEYXkgPSBpICogNjAgKyBqO1xuXHRcdFx0XHRcdFx0XHRcdCAgICAgICAgaWYgKGN1cnJlbnRNaW51dGVzT2ZEYXkgPCBtaW5UaW1lTWludXRlc09mRGF5KSBjb250aW51ZTtcblx0XHRcdFx0XHRcdFx0XHQgICAgICAgIGlmIChjdXJyZW50TWludXRlc09mRGF5ID49IG1heFRpbWVNaW51dGVzT2ZEYXkpIGNvbnRpbnVlO1xuXHRcdFx0XHRcdFx0XHRcdFx0aCA9IChpIDwgMTAgPyAnMCcgOiAnJykgKyBpO1xuXHRcdFx0XHRcdFx0XHRcdFx0bSA9IChqIDwgMTAgPyAnMCcgOiAnJykgKyBqO1xuXHRcdFx0XHRcdFx0XHRcdFx0bGluZV90aW1lKGgsIG0pO1xuXHRcdFx0XHRcdFx0XHRcdH1cblx0XHRcdFx0XHRcdFx0fVxuXHRcdFx0XHRcdFx0fSBlbHNlIHtcblx0XHRcdFx0XHRcdFx0Zm9yIChpID0gMDsgaSA8IG9wdGlvbnMuYWxsb3dUaW1lcy5sZW5ndGg7IGkgKz0gMSkge1xuXHRcdFx0XHRcdFx0XHRcdGggPSBfeGRzb2Z0X2RhdGV0aW1lLnN0cnRvdGltZShvcHRpb25zLmFsbG93VGltZXNbaV0pLmdldEhvdXJzKCk7XG5cdFx0XHRcdFx0XHRcdFx0bSA9IF94ZHNvZnRfZGF0ZXRpbWUuc3RydG90aW1lKG9wdGlvbnMuYWxsb3dUaW1lc1tpXSkuZ2V0TWludXRlcygpO1xuXHRcdFx0XHRcdFx0XHRcdGxpbmVfdGltZShoLCBtKTtcblx0XHRcdFx0XHRcdFx0fVxuXHRcdFx0XHRcdFx0fVxuXG5cdFx0XHRcdFx0XHR0aW1lYm94Lmh0bWwodGltZSk7XG5cblx0XHRcdFx0XHRcdG9wdCA9ICcnO1xuXG5cdFx0XHRcdFx0XHRmb3IgKGkgPSBwYXJzZUludChvcHRpb25zLnllYXJTdGFydCwgMTApOyBpIDw9IHBhcnNlSW50KG9wdGlvbnMueWVhckVuZCwgMTApOyBpICs9IDEpIHtcblx0XHRcdFx0XHRcdFx0b3B0ICs9ICc8ZGl2IGNsYXNzPVwieGRzb2Z0X29wdGlvbiAnICsgKF94ZHNvZnRfZGF0ZXRpbWUuY3VycmVudFRpbWUuZ2V0RnVsbFllYXIoKSA9PT0gaSA/ICd4ZHNvZnRfY3VycmVudCcgOiAnJykgKyAnXCIgZGF0YS12YWx1ZT1cIicgKyBpICsgJ1wiPicgKyAoaSArIG9wdGlvbnMueWVhck9mZnNldCkgKyAnPC9kaXY+Jztcblx0XHRcdFx0XHRcdH1cblx0XHRcdFx0XHRcdHllYXJzZWxlY3QuY2hpbGRyZW4oKS5lcSgwKVxuXHRcdFx0XHRcdFx0XHQuaHRtbChvcHQpO1xuXG5cdFx0XHRcdFx0XHRmb3IgKGkgPSBwYXJzZUludChvcHRpb25zLm1vbnRoU3RhcnQsIDEwKSwgb3B0ID0gJyc7IGkgPD0gcGFyc2VJbnQob3B0aW9ucy5tb250aEVuZCwgMTApOyBpICs9IDEpIHtcblx0XHRcdFx0XHRcdFx0b3B0ICs9ICc8ZGl2IGNsYXNzPVwieGRzb2Z0X29wdGlvbiAnICsgKF94ZHNvZnRfZGF0ZXRpbWUuY3VycmVudFRpbWUuZ2V0TW9udGgoKSA9PT0gaSA/ICd4ZHNvZnRfY3VycmVudCcgOiAnJykgKyAnXCIgZGF0YS12YWx1ZT1cIicgKyBpICsgJ1wiPicgKyBvcHRpb25zLmkxOG5bZ2xvYmFsTG9jYWxlXS5tb250aHNbaV0gKyAnPC9kaXY+Jztcblx0XHRcdFx0XHRcdH1cblx0XHRcdFx0XHRcdG1vbnRoc2VsZWN0LmNoaWxkcmVuKCkuZXEoMCkuaHRtbChvcHQpO1xuXHRcdFx0XHRcdFx0JChkYXRldGltZXBpY2tlcilcblx0XHRcdFx0XHRcdFx0LnRyaWdnZXIoJ2dlbmVyYXRlLnhkc29mdCcpO1xuXHRcdFx0XHRcdH0sIDEwKTtcblx0XHRcdFx0XHRldmVudC5zdG9wUHJvcGFnYXRpb24oKTtcblx0XHRcdFx0fSlcblx0XHRcdFx0Lm9uKCdhZnRlck9wZW4ueGRzb2Z0JywgZnVuY3Rpb24gKCkge1xuXHRcdFx0XHRcdGlmIChvcHRpb25zLnRpbWVwaWNrZXIpIHtcblx0XHRcdFx0XHRcdHZhciBjbGFzc1R5cGUsIHBoZWlnaHQsIGhlaWdodCwgdG9wO1xuXHRcdFx0XHRcdFx0aWYgKHRpbWVib3guZmluZCgnLnhkc29mdF9jdXJyZW50JykubGVuZ3RoKSB7XG5cdFx0XHRcdFx0XHRcdGNsYXNzVHlwZSA9ICcueGRzb2Z0X2N1cnJlbnQnO1xuXHRcdFx0XHRcdFx0fSBlbHNlIGlmICh0aW1lYm94LmZpbmQoJy54ZHNvZnRfaW5pdF90aW1lJykubGVuZ3RoKSB7XG5cdFx0XHRcdFx0XHRcdGNsYXNzVHlwZSA9ICcueGRzb2Z0X2luaXRfdGltZSc7XG5cdFx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0XHRpZiAoY2xhc3NUeXBlKSB7XG5cdFx0XHRcdFx0XHRcdHBoZWlnaHQgPSB0aW1lYm94cGFyZW50WzBdLmNsaWVudEhlaWdodDtcblx0XHRcdFx0XHRcdFx0aGVpZ2h0ID0gdGltZWJveFswXS5vZmZzZXRIZWlnaHQ7XG5cdFx0XHRcdFx0XHRcdHRvcCA9IHRpbWVib3guZmluZChjbGFzc1R5cGUpLmluZGV4KCkgKiBvcHRpb25zLnRpbWVIZWlnaHRJblRpbWVQaWNrZXIgKyAxO1xuXHRcdFx0XHRcdFx0XHRpZiAoKGhlaWdodCAtIHBoZWlnaHQpIDwgdG9wKSB7XG5cdFx0XHRcdFx0XHRcdFx0dG9wID0gaGVpZ2h0IC0gcGhlaWdodDtcblx0XHRcdFx0XHRcdFx0fVxuXHRcdFx0XHRcdFx0XHR0aW1lYm94cGFyZW50LnRyaWdnZXIoJ3Njcm9sbF9lbGVtZW50Lnhkc29mdF9zY3JvbGxlcicsIFtwYXJzZUludCh0b3AsIDEwKSAvIChoZWlnaHQgLSBwaGVpZ2h0KV0pO1xuXHRcdFx0XHRcdFx0fSBlbHNlIHtcblx0XHRcdFx0XHRcdFx0dGltZWJveHBhcmVudC50cmlnZ2VyKCdzY3JvbGxfZWxlbWVudC54ZHNvZnRfc2Nyb2xsZXInLCBbMF0pO1xuXHRcdFx0XHRcdFx0fVxuXHRcdFx0XHRcdH1cblx0XHRcdFx0fSk7XG5cblx0XHRcdHRpbWVyY2xpY2sgPSAwO1xuXHRcdFx0Y2FsZW5kYXJcblx0XHRcdFx0Lm9uKCd0b3VjaGVuZCBjbGljay54ZHNvZnQnLCAndGQnLCBmdW5jdGlvbiAoeGRldmVudCkge1xuXHRcdFx0XHRcdHhkZXZlbnQuc3RvcFByb3BhZ2F0aW9uKCk7ICAvLyBQcmV2ZW50cyBjbG9zaW5nIG9mIFBvcC11cHMsIE1vZGFscyBhbmQgRmx5b3V0cyBpbiBCb290c3RyYXBcblx0XHRcdFx0XHR0aW1lcmNsaWNrICs9IDE7XG5cdFx0XHRcdFx0dmFyICR0aGlzID0gJCh0aGlzKSxcblx0XHRcdFx0XHRcdGN1cnJlbnRUaW1lID0gX3hkc29mdF9kYXRldGltZS5jdXJyZW50VGltZTtcblxuXHRcdFx0XHRcdGlmIChjdXJyZW50VGltZSA9PT0gdW5kZWZpbmVkIHx8IGN1cnJlbnRUaW1lID09PSBudWxsKSB7XG5cdFx0XHRcdFx0XHRfeGRzb2Z0X2RhdGV0aW1lLmN1cnJlbnRUaW1lID0gX3hkc29mdF9kYXRldGltZS5ub3coKTtcblx0XHRcdFx0XHRcdGN1cnJlbnRUaW1lID0gX3hkc29mdF9kYXRldGltZS5jdXJyZW50VGltZTtcblx0XHRcdFx0XHR9XG5cblx0XHRcdFx0XHRpZiAoJHRoaXMuaGFzQ2xhc3MoJ3hkc29mdF9kaXNhYmxlZCcpKSB7XG5cdFx0XHRcdFx0XHRyZXR1cm4gZmFsc2U7XG5cdFx0XHRcdFx0fVxuXG5cdFx0XHRcdFx0Y3VycmVudFRpbWUuc2V0RGF0ZSgxKTtcblx0XHRcdFx0XHRjdXJyZW50VGltZS5zZXRGdWxsWWVhcigkdGhpcy5kYXRhKCd5ZWFyJykpO1xuXHRcdFx0XHRcdGN1cnJlbnRUaW1lLnNldE1vbnRoKCR0aGlzLmRhdGEoJ21vbnRoJykpO1xuXHRcdFx0XHRcdGN1cnJlbnRUaW1lLnNldERhdGUoJHRoaXMuZGF0YSgnZGF0ZScpKTtcblxuXHRcdFx0XHRcdGRhdGV0aW1lcGlja2VyLnRyaWdnZXIoJ3NlbGVjdC54ZHNvZnQnLCBbY3VycmVudFRpbWVdKTtcblxuXHRcdFx0XHRcdGlucHV0LnZhbChfeGRzb2Z0X2RhdGV0aW1lLnN0cigpKTtcblxuXHRcdFx0XHRcdGlmIChvcHRpb25zLm9uU2VsZWN0RGF0ZSAmJlx0JC5pc0Z1bmN0aW9uKG9wdGlvbnMub25TZWxlY3REYXRlKSkge1xuXHRcdFx0XHRcdFx0b3B0aW9ucy5vblNlbGVjdERhdGUuY2FsbChkYXRldGltZXBpY2tlciwgX3hkc29mdF9kYXRldGltZS5jdXJyZW50VGltZSwgZGF0ZXRpbWVwaWNrZXIuZGF0YSgnaW5wdXQnKSwgeGRldmVudCk7XG5cdFx0XHRcdFx0fVxuXG5cdFx0XHRcdFx0ZGF0ZXRpbWVwaWNrZXIuZGF0YSgnY2hhbmdlZCcsIHRydWUpO1xuXHRcdFx0XHRcdGRhdGV0aW1lcGlja2VyLnRyaWdnZXIoJ3hjaGFuZ2UueGRzb2Z0Jyk7XG5cdFx0XHRcdFx0ZGF0ZXRpbWVwaWNrZXIudHJpZ2dlcignY2hhbmdlZGF0ZXRpbWUueGRzb2Z0Jyk7XG5cdFx0XHRcdFx0aWYgKCh0aW1lcmNsaWNrID4gMSB8fCAob3B0aW9ucy5jbG9zZU9uRGF0ZVNlbGVjdCA9PT0gdHJ1ZSB8fCAob3B0aW9ucy5jbG9zZU9uRGF0ZVNlbGVjdCA9PT0gZmFsc2UgJiYgIW9wdGlvbnMudGltZXBpY2tlcikpKSAmJiAhb3B0aW9ucy5pbmxpbmUpIHtcblx0XHRcdFx0XHRcdGRhdGV0aW1lcGlja2VyLnRyaWdnZXIoJ2Nsb3NlLnhkc29mdCcpO1xuXHRcdFx0XHRcdH1cblx0XHRcdFx0XHRzZXRUaW1lb3V0KGZ1bmN0aW9uICgpIHtcblx0XHRcdFx0XHRcdHRpbWVyY2xpY2sgPSAwO1xuXHRcdFx0XHRcdH0sIDIwMCk7XG5cdFx0XHRcdH0pO1xuXG5cdFx0XHR0aW1lYm94XG5cdFx0XHRcdC5vbigndG91Y2hzdGFydCcsICdkaXYnLCBmdW5jdGlvbiAoeGRldmVudCkge1xuXHRcdFx0XHRcdHRoaXMudG91Y2hNb3ZlZCA9IGZhbHNlO1xuXHRcdFx0XHR9KVxuXHRcdFx0XHQub24oJ3RvdWNobW92ZScsICdkaXYnLCBoYW5kbGVUb3VjaE1vdmVkKVxuXHRcdFx0XHQub24oJ3RvdWNoZW5kIGNsaWNrLnhkc29mdCcsICdkaXYnLCBmdW5jdGlvbiAoeGRldmVudCkge1xuXHRcdFx0XHRcdGlmICghdGhpcy50b3VjaE1vdmVkKSB7XG5cdFx0XHRcdFx0XHR4ZGV2ZW50LnN0b3BQcm9wYWdhdGlvbigpO1xuXHRcdFx0XHRcdFx0dmFyICR0aGlzID0gJCh0aGlzKSxcblx0XHRcdFx0XHRcdFx0Y3VycmVudFRpbWUgPSBfeGRzb2Z0X2RhdGV0aW1lLmN1cnJlbnRUaW1lO1xuXG5cdFx0XHRcdFx0XHRpZiAoY3VycmVudFRpbWUgPT09IHVuZGVmaW5lZCB8fCBjdXJyZW50VGltZSA9PT0gbnVsbCkge1xuXHRcdFx0XHRcdFx0XHRfeGRzb2Z0X2RhdGV0aW1lLmN1cnJlbnRUaW1lID0gX3hkc29mdF9kYXRldGltZS5ub3coKTtcblx0XHRcdFx0XHRcdFx0Y3VycmVudFRpbWUgPSBfeGRzb2Z0X2RhdGV0aW1lLmN1cnJlbnRUaW1lO1xuXHRcdFx0XHRcdFx0fVxuXG5cdFx0XHRcdFx0XHRpZiAoJHRoaXMuaGFzQ2xhc3MoJ3hkc29mdF9kaXNhYmxlZCcpKSB7XG5cdFx0XHRcdFx0XHRcdHJldHVybiBmYWxzZTtcblx0XHRcdFx0XHRcdH1cblx0XHRcdFx0XHRcdGN1cnJlbnRUaW1lLnNldEhvdXJzKCR0aGlzLmRhdGEoJ2hvdXInKSk7XG5cdFx0XHRcdFx0XHRjdXJyZW50VGltZS5zZXRNaW51dGVzKCR0aGlzLmRhdGEoJ21pbnV0ZScpKTtcblx0XHRcdFx0XHRcdGRhdGV0aW1lcGlja2VyLnRyaWdnZXIoJ3NlbGVjdC54ZHNvZnQnLCBbY3VycmVudFRpbWVdKTtcblxuXHRcdFx0XHRcdFx0ZGF0ZXRpbWVwaWNrZXIuZGF0YSgnaW5wdXQnKS52YWwoX3hkc29mdF9kYXRldGltZS5zdHIoKSk7XG5cblx0XHRcdFx0XHRcdGlmIChvcHRpb25zLm9uU2VsZWN0VGltZSAmJiAkLmlzRnVuY3Rpb24ob3B0aW9ucy5vblNlbGVjdFRpbWUpKSB7XG5cdFx0XHRcdFx0XHRcdG9wdGlvbnMub25TZWxlY3RUaW1lLmNhbGwoZGF0ZXRpbWVwaWNrZXIsIF94ZHNvZnRfZGF0ZXRpbWUuY3VycmVudFRpbWUsIGRhdGV0aW1lcGlja2VyLmRhdGEoJ2lucHV0JyksIHhkZXZlbnQpO1xuXHRcdFx0XHRcdFx0fVxuXHRcdFx0XHRcdFx0ZGF0ZXRpbWVwaWNrZXIuZGF0YSgnY2hhbmdlZCcsIHRydWUpO1xuXHRcdFx0XHRcdFx0ZGF0ZXRpbWVwaWNrZXIudHJpZ2dlcigneGNoYW5nZS54ZHNvZnQnKTtcblx0XHRcdFx0XHRcdGRhdGV0aW1lcGlja2VyLnRyaWdnZXIoJ2NoYW5nZWRhdGV0aW1lLnhkc29mdCcpO1xuXHRcdFx0XHRcdFx0aWYgKG9wdGlvbnMuaW5saW5lICE9PSB0cnVlICYmIG9wdGlvbnMuY2xvc2VPblRpbWVTZWxlY3QgPT09IHRydWUpIHtcblx0XHRcdFx0XHRcdFx0ZGF0ZXRpbWVwaWNrZXIudHJpZ2dlcignY2xvc2UueGRzb2Z0Jyk7XG5cdFx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0fVxuXHRcdFx0XHR9KTtcblxuXHRcdFx0ZGF0ZXBpY2tlclxuXHRcdFx0XHQub24oJ21vdXNld2hlZWwueGRzb2Z0JywgZnVuY3Rpb24gKGV2ZW50KSB7XG5cdFx0XHRcdFx0aWYgKCFvcHRpb25zLnNjcm9sbE1vbnRoKSB7XG5cdFx0XHRcdFx0XHRyZXR1cm4gdHJ1ZTtcblx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0aWYgKGV2ZW50LmRlbHRhWSA8IDApIHtcblx0XHRcdFx0XHRcdF94ZHNvZnRfZGF0ZXRpbWUubmV4dE1vbnRoKCk7XG5cdFx0XHRcdFx0fSBlbHNlIHtcblx0XHRcdFx0XHRcdF94ZHNvZnRfZGF0ZXRpbWUucHJldk1vbnRoKCk7XG5cdFx0XHRcdFx0fVxuXHRcdFx0XHRcdHJldHVybiBmYWxzZTtcblx0XHRcdFx0fSk7XG5cblx0XHRcdGlucHV0XG5cdFx0XHRcdC5vbignbW91c2V3aGVlbC54ZHNvZnQnLCBmdW5jdGlvbiAoZXZlbnQpIHtcblx0XHRcdFx0XHRpZiAoIW9wdGlvbnMuc2Nyb2xsSW5wdXQpIHtcblx0XHRcdFx0XHRcdHJldHVybiB0cnVlO1xuXHRcdFx0XHRcdH1cblx0XHRcdFx0XHRpZiAoIW9wdGlvbnMuZGF0ZXBpY2tlciAmJiBvcHRpb25zLnRpbWVwaWNrZXIpIHtcblx0XHRcdFx0XHRcdGN1cnJlbnRfdGltZV9pbmRleCA9IHRpbWVib3guZmluZCgnLnhkc29mdF9jdXJyZW50JykubGVuZ3RoID8gdGltZWJveC5maW5kKCcueGRzb2Z0X2N1cnJlbnQnKS5lcSgwKS5pbmRleCgpIDogMDtcblx0XHRcdFx0XHRcdGlmIChjdXJyZW50X3RpbWVfaW5kZXggKyBldmVudC5kZWx0YVkgPj0gMCAmJiBjdXJyZW50X3RpbWVfaW5kZXggKyBldmVudC5kZWx0YVkgPCB0aW1lYm94LmNoaWxkcmVuKCkubGVuZ3RoKSB7XG5cdFx0XHRcdFx0XHRcdGN1cnJlbnRfdGltZV9pbmRleCArPSBldmVudC5kZWx0YVk7XG5cdFx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0XHRpZiAodGltZWJveC5jaGlsZHJlbigpLmVxKGN1cnJlbnRfdGltZV9pbmRleCkubGVuZ3RoKSB7XG5cdFx0XHRcdFx0XHRcdHRpbWVib3guY2hpbGRyZW4oKS5lcShjdXJyZW50X3RpbWVfaW5kZXgpLnRyaWdnZXIoJ21vdXNlZG93bicpO1xuXHRcdFx0XHRcdFx0fVxuXHRcdFx0XHRcdFx0cmV0dXJuIGZhbHNlO1xuXHRcdFx0XHRcdH1cblx0XHRcdFx0XHRpZiAob3B0aW9ucy5kYXRlcGlja2VyICYmICFvcHRpb25zLnRpbWVwaWNrZXIpIHtcblx0XHRcdFx0XHRcdGRhdGVwaWNrZXIudHJpZ2dlcihldmVudCwgW2V2ZW50LmRlbHRhWSwgZXZlbnQuZGVsdGFYLCBldmVudC5kZWx0YVldKTtcblx0XHRcdFx0XHRcdGlmIChpbnB1dC52YWwpIHtcblx0XHRcdFx0XHRcdFx0aW5wdXQudmFsKF94ZHNvZnRfZGF0ZXRpbWUuc3RyKCkpO1xuXHRcdFx0XHRcdFx0fVxuXHRcdFx0XHRcdFx0ZGF0ZXRpbWVwaWNrZXIudHJpZ2dlcignY2hhbmdlZGF0ZXRpbWUueGRzb2Z0Jyk7XG5cdFx0XHRcdFx0XHRyZXR1cm4gZmFsc2U7XG5cdFx0XHRcdFx0fVxuXHRcdFx0XHR9KTtcblxuXHRcdFx0ZGF0ZXRpbWVwaWNrZXJcblx0XHRcdFx0Lm9uKCdjaGFuZ2VkYXRldGltZS54ZHNvZnQnLCBmdW5jdGlvbiAoZXZlbnQpIHtcblx0XHRcdFx0XHRpZiAob3B0aW9ucy5vbkNoYW5nZURhdGVUaW1lICYmICQuaXNGdW5jdGlvbihvcHRpb25zLm9uQ2hhbmdlRGF0ZVRpbWUpKSB7XG5cdFx0XHRcdFx0XHR2YXIgJGlucHV0ID0gZGF0ZXRpbWVwaWNrZXIuZGF0YSgnaW5wdXQnKTtcblx0XHRcdFx0XHRcdG9wdGlvbnMub25DaGFuZ2VEYXRlVGltZS5jYWxsKGRhdGV0aW1lcGlja2VyLCBfeGRzb2Z0X2RhdGV0aW1lLmN1cnJlbnRUaW1lLCAkaW5wdXQsIGV2ZW50KTtcblx0XHRcdFx0XHRcdGRlbGV0ZSBvcHRpb25zLnZhbHVlO1xuXHRcdFx0XHRcdFx0JGlucHV0LnRyaWdnZXIoJ2NoYW5nZScpO1xuXHRcdFx0XHRcdH1cblx0XHRcdFx0fSlcblx0XHRcdFx0Lm9uKCdnZW5lcmF0ZS54ZHNvZnQnLCBmdW5jdGlvbiAoKSB7XG5cdFx0XHRcdFx0aWYgKG9wdGlvbnMub25HZW5lcmF0ZSAmJiAkLmlzRnVuY3Rpb24ob3B0aW9ucy5vbkdlbmVyYXRlKSkge1xuXHRcdFx0XHRcdFx0b3B0aW9ucy5vbkdlbmVyYXRlLmNhbGwoZGF0ZXRpbWVwaWNrZXIsIF94ZHNvZnRfZGF0ZXRpbWUuY3VycmVudFRpbWUsIGRhdGV0aW1lcGlja2VyLmRhdGEoJ2lucHV0JykpO1xuXHRcdFx0XHRcdH1cblx0XHRcdFx0XHRpZiAodHJpZ2dlckFmdGVyT3Blbikge1xuXHRcdFx0XHRcdFx0ZGF0ZXRpbWVwaWNrZXIudHJpZ2dlcignYWZ0ZXJPcGVuLnhkc29mdCcpO1xuXHRcdFx0XHRcdFx0dHJpZ2dlckFmdGVyT3BlbiA9IGZhbHNlO1xuXHRcdFx0XHRcdH1cblx0XHRcdFx0fSlcblx0XHRcdFx0Lm9uKCdjbGljay54ZHNvZnQnLCBmdW5jdGlvbiAoeGRldmVudCkge1xuXHRcdFx0XHRcdHhkZXZlbnQuc3RvcFByb3BhZ2F0aW9uKCk7XG5cdFx0XHRcdH0pO1xuXG5cdFx0XHRjdXJyZW50X3RpbWVfaW5kZXggPSAwO1xuXG5cdFx0XHQvKipcblx0XHRcdCAqIFJ1bnMgdGhlIGNhbGxiYWNrIGZvciBlYWNoIG9mIHRoZSBzcGVjaWZpZWQgbm9kZSdzIGFuY2VzdG9ycy5cblx0XHRcdCAqXG5cdFx0XHQgKiBSZXR1cm4gRkFMU0UgZnJvbSB0aGUgY2FsbGJhY2sgdG8gc3RvcCBhc2NlbmRpbmcuXG5cdFx0XHQgKlxuXHRcdFx0ICogQHBhcmFtIHtET01Ob2RlfSBub2RlXG5cdFx0XHQgKiBAcGFyYW0ge0Z1bmN0aW9ufSBjYWxsYmFja1xuXHRcdFx0ICogQHJldHVybnMge3VuZGVmaW5lZH1cblx0XHRcdCAqL1xuXHRcdFx0Zm9yRWFjaEFuY2VzdG9yT2YgPSBmdW5jdGlvbiAobm9kZSwgY2FsbGJhY2spIHtcblx0XHRcdFx0ZG8ge1xuXHRcdFx0XHRcdG5vZGUgPSBub2RlLnBhcmVudE5vZGU7XG5cblx0XHRcdFx0XHRpZiAoIW5vZGUgfHwgY2FsbGJhY2sobm9kZSkgPT09IGZhbHNlKSB7XG5cdFx0XHRcdFx0XHRicmVhaztcblx0XHRcdFx0XHR9XG5cdFx0XHRcdH0gd2hpbGUgKG5vZGUubm9kZU5hbWUgIT09ICdIVE1MJyk7XG5cdFx0XHR9O1xuXG5cdFx0XHQvKipcblx0XHRcdCAqIFNldHMgdGhlIHBvc2l0aW9uIG9mIHRoZSBwaWNrZXIuXG5cdFx0XHQgKlxuXHRcdFx0ICogQHJldHVybnMge3VuZGVmaW5lZH1cblx0XHRcdCAqL1xuXHRcdFx0c2V0UG9zID0gZnVuY3Rpb24gKCkge1xuXHRcdFx0XHR2YXIgZGF0ZUlucHV0T2Zmc2V0LFxuXHRcdFx0XHRcdGRhdGVJbnB1dEVsZW0sXG5cdFx0XHRcdFx0dmVydGljYWxQb3NpdGlvbixcblx0XHRcdFx0XHRsZWZ0LFxuXHRcdFx0XHRcdHBvc2l0aW9uLFxuXHRcdFx0XHRcdGRhdGV0aW1lcGlja2VyRWxlbSxcblx0XHRcdFx0XHRkYXRlSW5wdXRIYXNGaXhlZEFuY2VzdG9yLFxuXHRcdFx0XHRcdCRkYXRlSW5wdXQsXG5cdFx0XHRcdFx0d2luZG93V2lkdGgsXG5cdFx0XHRcdFx0dmVydGljYWxBbmNob3JFZGdlLFxuXHRcdFx0XHRcdGRhdGV0aW1lcGlja2VyQ3NzLFxuXHRcdFx0XHRcdHdpbmRvd0hlaWdodCxcblx0XHRcdFx0XHR3aW5kb3dTY3JvbGxUb3A7XG5cblx0XHRcdFx0JGRhdGVJbnB1dCA9IGRhdGV0aW1lcGlja2VyLmRhdGEoJ2lucHV0Jyk7XG5cdFx0XHRcdGRhdGVJbnB1dE9mZnNldCA9ICRkYXRlSW5wdXQub2Zmc2V0KCk7XG5cdFx0XHRcdGRhdGVJbnB1dEVsZW0gPSAkZGF0ZUlucHV0WzBdO1xuXG5cdFx0XHRcdHZlcnRpY2FsQW5jaG9yRWRnZSA9ICd0b3AnO1xuXHRcdFx0XHR2ZXJ0aWNhbFBvc2l0aW9uID0gKGRhdGVJbnB1dE9mZnNldC50b3AgKyBkYXRlSW5wdXRFbGVtLm9mZnNldEhlaWdodCkgLSAxO1xuXHRcdFx0XHRsZWZ0ID0gZGF0ZUlucHV0T2Zmc2V0LmxlZnQ7XG5cdFx0XHRcdHBvc2l0aW9uID0gXCJhYnNvbHV0ZVwiO1xuXG5cdFx0XHRcdHdpbmRvd1dpZHRoID0gJChvcHRpb25zLmNvbnRlbnRXaW5kb3cpLndpZHRoKCk7XG5cdFx0XHRcdHdpbmRvd0hlaWdodCA9ICQob3B0aW9ucy5jb250ZW50V2luZG93KS5oZWlnaHQoKTtcblx0XHRcdFx0d2luZG93U2Nyb2xsVG9wID0gJChvcHRpb25zLmNvbnRlbnRXaW5kb3cpLnNjcm9sbFRvcCgpO1xuXG5cdFx0XHRcdGlmICgob3B0aW9ucy5vd25lckRvY3VtZW50LmRvY3VtZW50RWxlbWVudC5jbGllbnRXaWR0aCAtIGRhdGVJbnB1dE9mZnNldC5sZWZ0KSA8IGRhdGVwaWNrZXIucGFyZW50KCkub3V0ZXJXaWR0aCh0cnVlKSkge1xuXHRcdFx0XHRcdHZhciBkaWZmID0gZGF0ZXBpY2tlci5wYXJlbnQoKS5vdXRlcldpZHRoKHRydWUpIC0gZGF0ZUlucHV0RWxlbS5vZmZzZXRXaWR0aDtcblx0XHRcdFx0XHRsZWZ0ID0gbGVmdCAtIGRpZmY7XG5cdFx0XHRcdH1cblxuXHRcdFx0XHRpZiAoJGRhdGVJbnB1dC5wYXJlbnQoKS5jc3MoJ2RpcmVjdGlvbicpID09PSAncnRsJykge1xuXHRcdFx0XHRcdGxlZnQgLT0gKGRhdGV0aW1lcGlja2VyLm91dGVyV2lkdGgoKSAtICRkYXRlSW5wdXQub3V0ZXJXaWR0aCgpKTtcblx0XHRcdFx0fVxuXG5cdFx0XHRcdGlmIChvcHRpb25zLmZpeGVkKSB7XG5cdFx0XHRcdFx0dmVydGljYWxQb3NpdGlvbiAtPSB3aW5kb3dTY3JvbGxUb3A7XG5cdFx0XHRcdFx0bGVmdCAtPSAkKG9wdGlvbnMuY29udGVudFdpbmRvdykuc2Nyb2xsTGVmdCgpO1xuXHRcdFx0XHRcdHBvc2l0aW9uID0gXCJmaXhlZFwiO1xuXHRcdFx0XHR9IGVsc2Uge1xuXHRcdFx0XHRcdGRhdGVJbnB1dEhhc0ZpeGVkQW5jZXN0b3IgPSBmYWxzZTtcblxuXHRcdFx0XHRcdGZvckVhY2hBbmNlc3Rvck9mKGRhdGVJbnB1dEVsZW0sIGZ1bmN0aW9uIChhbmNlc3Rvck5vZGUpIHtcblx0XHRcdFx0XHRcdGlmIChhbmNlc3Rvck5vZGUgPT09IG51bGwpIHtcblx0XHRcdFx0XHRcdFx0cmV0dXJuIGZhbHNlO1xuXHRcdFx0XHRcdFx0fVxuXG5cdFx0XHRcdFx0XHRpZiAob3B0aW9ucy5jb250ZW50V2luZG93LmdldENvbXB1dGVkU3R5bGUoYW5jZXN0b3JOb2RlKS5nZXRQcm9wZXJ0eVZhbHVlKCdwb3NpdGlvbicpID09PSAnZml4ZWQnKSB7XG5cdFx0XHRcdFx0XHRcdGRhdGVJbnB1dEhhc0ZpeGVkQW5jZXN0b3IgPSB0cnVlO1xuXHRcdFx0XHRcdFx0XHRyZXR1cm4gZmFsc2U7XG5cdFx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0fSk7XG5cblx0XHRcdFx0XHRpZiAoZGF0ZUlucHV0SGFzRml4ZWRBbmNlc3RvciAmJiAhb3B0aW9ucy5pbnNpZGVQYXJlbnQpIHtcblx0XHRcdFx0XHRcdHBvc2l0aW9uID0gJ2ZpeGVkJztcblxuXHRcdFx0XHRcdFx0Ly9JZiB0aGUgcGlja2VyIHdvbid0IGZpdCBlbnRpcmVseSB3aXRoaW4gdGhlIHZpZXdwb3J0IHRoZW4gZGlzcGxheSBpdCBhYm92ZSB0aGUgZGF0ZSBpbnB1dC5cblx0XHRcdFx0XHRcdGlmICh2ZXJ0aWNhbFBvc2l0aW9uICsgZGF0ZXRpbWVwaWNrZXIub3V0ZXJIZWlnaHQoKSA+IHdpbmRvd0hlaWdodCArIHdpbmRvd1Njcm9sbFRvcCkge1xuXHRcdFx0XHRcdFx0XHR2ZXJ0aWNhbEFuY2hvckVkZ2UgPSAnYm90dG9tJztcblx0XHRcdFx0XHRcdFx0dmVydGljYWxQb3NpdGlvbiA9ICh3aW5kb3dIZWlnaHQgKyB3aW5kb3dTY3JvbGxUb3ApIC0gZGF0ZUlucHV0T2Zmc2V0LnRvcDtcblx0XHRcdFx0XHRcdH0gZWxzZSB7XG5cdFx0XHRcdFx0XHRcdHZlcnRpY2FsUG9zaXRpb24gLT0gd2luZG93U2Nyb2xsVG9wO1xuXHRcdFx0XHRcdFx0fVxuXHRcdFx0XHRcdH0gZWxzZSB7XG5cdFx0XHRcdFx0XHRpZiAodmVydGljYWxQb3NpdGlvbiArIGRhdGV0aW1lcGlja2VyWzBdLm9mZnNldEhlaWdodCA+IHdpbmRvd0hlaWdodCArIHdpbmRvd1Njcm9sbFRvcCkge1xuXHRcdFx0XHRcdFx0XHR2ZXJ0aWNhbFBvc2l0aW9uID0gZGF0ZUlucHV0T2Zmc2V0LnRvcCAtIGRhdGV0aW1lcGlja2VyWzBdLm9mZnNldEhlaWdodCArIDE7XG5cdFx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0fVxuXG5cdFx0XHRcdFx0aWYgKHZlcnRpY2FsUG9zaXRpb24gPCAwKSB7XG5cdFx0XHRcdFx0XHR2ZXJ0aWNhbFBvc2l0aW9uID0gMDtcblx0XHRcdFx0XHR9XG5cblx0XHRcdFx0XHRpZiAobGVmdCArIGRhdGVJbnB1dEVsZW0ub2Zmc2V0V2lkdGggPiB3aW5kb3dXaWR0aCkge1xuXHRcdFx0XHRcdFx0bGVmdCA9IHdpbmRvd1dpZHRoIC0gZGF0ZUlucHV0RWxlbS5vZmZzZXRXaWR0aDtcblx0XHRcdFx0XHR9XG5cdFx0XHRcdH1cblxuXHRcdFx0XHRkYXRldGltZXBpY2tlckVsZW0gPSBkYXRldGltZXBpY2tlclswXTtcblxuXHRcdFx0XHRmb3JFYWNoQW5jZXN0b3JPZihkYXRldGltZXBpY2tlckVsZW0sIGZ1bmN0aW9uIChhbmNlc3Rvck5vZGUpIHtcblx0XHRcdFx0XHR2YXIgYW5jZXN0b3JOb2RlUG9zaXRpb247XG5cblx0XHRcdFx0XHRhbmNlc3Rvck5vZGVQb3NpdGlvbiA9IG9wdGlvbnMuY29udGVudFdpbmRvdy5nZXRDb21wdXRlZFN0eWxlKGFuY2VzdG9yTm9kZSkuZ2V0UHJvcGVydHlWYWx1ZSgncG9zaXRpb24nKTtcblxuXHRcdFx0XHRcdGlmIChhbmNlc3Rvck5vZGVQb3NpdGlvbiA9PT0gJ3JlbGF0aXZlJyAmJiB3aW5kb3dXaWR0aCA+PSBhbmNlc3Rvck5vZGUub2Zmc2V0V2lkdGgpIHtcblx0XHRcdFx0XHRcdGxlZnQgPSBsZWZ0IC0gKCh3aW5kb3dXaWR0aCAtIGFuY2VzdG9yTm9kZS5vZmZzZXRXaWR0aCkgLyAyKTtcblx0XHRcdFx0XHRcdHJldHVybiBmYWxzZTtcblx0XHRcdFx0XHR9XG5cdFx0XHRcdH0pO1xuXG5cdFx0XHRcdGRhdGV0aW1lcGlja2VyQ3NzID0ge1xuXHRcdFx0XHRcdHBvc2l0aW9uOiBwb3NpdGlvbixcblx0XHRcdFx0XHRsZWZ0OiBvcHRpb25zLmluc2lkZVBhcmVudCA/IGRhdGVJbnB1dEVsZW0ub2Zmc2V0TGVmdCA6IGxlZnQsXG5cdFx0XHRcdFx0dG9wOiAnJywgIC8vSW5pdGlhbGl6ZSB0byBwcmV2ZW50IHByZXZpb3VzIHZhbHVlcyBpbnRlcmZlcmluZyB3aXRoIG5ldyBvbmVzLlxuXHRcdFx0XHRcdGJvdHRvbTogJycgIC8vSW5pdGlhbGl6ZSB0byBwcmV2ZW50IHByZXZpb3VzIHZhbHVlcyBpbnRlcmZlcmluZyB3aXRoIG5ldyBvbmVzLlxuXHRcdFx0XHR9O1xuXG5cdFx0XHRcdGlmIChvcHRpb25zLmluc2lkZVBhcmVudCkge1xuICAgICAgICAgICAgICAgICAgICBkYXRldGltZXBpY2tlckNzc1t2ZXJ0aWNhbEFuY2hvckVkZ2VdID0gZGF0ZUlucHV0RWxlbS5vZmZzZXRUb3AgKyBkYXRlSW5wdXRFbGVtLm9mZnNldEhlaWdodDtcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICBkYXRldGltZXBpY2tlckNzc1t2ZXJ0aWNhbEFuY2hvckVkZ2VdID0gdmVydGljYWxQb3NpdGlvbjtcbiAgICAgICAgICAgICAgICB9XG5cblx0XHRcdFx0ZGF0ZXRpbWVwaWNrZXIuY3NzKGRhdGV0aW1lcGlja2VyQ3NzKTtcblx0XHRcdH07XG5cblx0XHRcdGRhdGV0aW1lcGlja2VyXG5cdFx0XHRcdC5vbignb3Blbi54ZHNvZnQnLCBmdW5jdGlvbiAoZXZlbnQpIHtcblx0XHRcdFx0XHR2YXIgb25TaG93ID0gdHJ1ZTtcblx0XHRcdFx0XHRpZiAob3B0aW9ucy5vblNob3cgJiYgJC5pc0Z1bmN0aW9uKG9wdGlvbnMub25TaG93KSkge1xuXHRcdFx0XHRcdFx0b25TaG93ID0gb3B0aW9ucy5vblNob3cuY2FsbChkYXRldGltZXBpY2tlciwgX3hkc29mdF9kYXRldGltZS5jdXJyZW50VGltZSwgZGF0ZXRpbWVwaWNrZXIuZGF0YSgnaW5wdXQnKSwgZXZlbnQpO1xuXHRcdFx0XHRcdH1cblx0XHRcdFx0XHRpZiAob25TaG93ICE9PSBmYWxzZSkge1xuXHRcdFx0XHRcdFx0ZGF0ZXRpbWVwaWNrZXIuc2hvdygpO1xuXHRcdFx0XHRcdFx0c2V0UG9zKCk7XG5cdFx0XHRcdFx0XHQkKG9wdGlvbnMuY29udGVudFdpbmRvdylcblx0XHRcdFx0XHRcdFx0Lm9mZigncmVzaXplLnhkc29mdCcsIHNldFBvcylcblx0XHRcdFx0XHRcdFx0Lm9uKCdyZXNpemUueGRzb2Z0Jywgc2V0UG9zKTtcblxuXHRcdFx0XHRcdFx0aWYgKG9wdGlvbnMuY2xvc2VPbldpdGhvdXRDbGljaykge1xuXHRcdFx0XHRcdFx0XHQkKFtvcHRpb25zLm93bmVyRG9jdW1lbnQuYm9keSwgb3B0aW9ucy5jb250ZW50V2luZG93XSkub24oJ3RvdWNoc3RhcnQgbW91c2Vkb3duLnhkc29mdCcsIGZ1bmN0aW9uIGFyZ3VtZW50c19jYWxsZWU2KCkge1xuXHRcdFx0XHRcdFx0XHRcdGRhdGV0aW1lcGlja2VyLnRyaWdnZXIoJ2Nsb3NlLnhkc29mdCcpO1xuXHRcdFx0XHRcdFx0XHRcdCQoW29wdGlvbnMub3duZXJEb2N1bWVudC5ib2R5LCBvcHRpb25zLmNvbnRlbnRXaW5kb3ddKS5vZmYoJ3RvdWNoc3RhcnQgbW91c2Vkb3duLnhkc29mdCcsIGFyZ3VtZW50c19jYWxsZWU2KTtcblx0XHRcdFx0XHRcdFx0fSk7XG5cdFx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0fVxuXHRcdFx0XHR9KVxuXHRcdFx0XHQub24oJ2Nsb3NlLnhkc29mdCcsIGZ1bmN0aW9uIChldmVudCkge1xuXHRcdFx0XHRcdHZhciBvbkNsb3NlID0gdHJ1ZTtcblx0XHRcdFx0XHRtb250aF9waWNrZXJcblx0XHRcdFx0XHRcdC5maW5kKCcueGRzb2Z0X21vbnRoLC54ZHNvZnRfeWVhcicpXG5cdFx0XHRcdFx0XHQuZmluZCgnLnhkc29mdF9zZWxlY3QnKVxuXHRcdFx0XHRcdFx0LmhpZGUoKTtcblx0XHRcdFx0XHRpZiAob3B0aW9ucy5vbkNsb3NlICYmICQuaXNGdW5jdGlvbihvcHRpb25zLm9uQ2xvc2UpKSB7XG5cdFx0XHRcdFx0XHRvbkNsb3NlID0gb3B0aW9ucy5vbkNsb3NlLmNhbGwoZGF0ZXRpbWVwaWNrZXIsIF94ZHNvZnRfZGF0ZXRpbWUuY3VycmVudFRpbWUsIGRhdGV0aW1lcGlja2VyLmRhdGEoJ2lucHV0JyksIGV2ZW50KTtcblx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0aWYgKG9uQ2xvc2UgIT09IGZhbHNlICYmICFvcHRpb25zLm9wZW5lZCAmJiAhb3B0aW9ucy5pbmxpbmUpIHtcblx0XHRcdFx0XHRcdGRhdGV0aW1lcGlja2VyLmhpZGUoKTtcblx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0ZXZlbnQuc3RvcFByb3BhZ2F0aW9uKCk7XG5cdFx0XHRcdH0pXG5cdFx0XHRcdC5vbigndG9nZ2xlLnhkc29mdCcsIGZ1bmN0aW9uICgpIHtcblx0XHRcdFx0XHRpZiAoZGF0ZXRpbWVwaWNrZXIuaXMoJzp2aXNpYmxlJykpIHtcblx0XHRcdFx0XHRcdGRhdGV0aW1lcGlja2VyLnRyaWdnZXIoJ2Nsb3NlLnhkc29mdCcpO1xuXHRcdFx0XHRcdH0gZWxzZSB7XG5cdFx0XHRcdFx0XHRkYXRldGltZXBpY2tlci50cmlnZ2VyKCdvcGVuLnhkc29mdCcpO1xuXHRcdFx0XHRcdH1cblx0XHRcdFx0fSlcblx0XHRcdFx0LmRhdGEoJ2lucHV0JywgaW5wdXQpO1xuXG5cdFx0XHR0aW1lciA9IDA7XG5cblx0XHRcdGRhdGV0aW1lcGlja2VyLmRhdGEoJ3hkc29mdF9kYXRldGltZScsIF94ZHNvZnRfZGF0ZXRpbWUpO1xuXHRcdFx0ZGF0ZXRpbWVwaWNrZXIuc2V0T3B0aW9ucyhvcHRpb25zKTtcblxuXHRcdFx0ZnVuY3Rpb24gZ2V0Q3VycmVudFZhbHVlKCkge1xuXHRcdFx0XHR2YXIgY3QgPSBmYWxzZSwgdGltZTtcblxuXHRcdFx0XHRpZiAob3B0aW9ucy5zdGFydERhdGUpIHtcblx0XHRcdFx0XHRjdCA9IF94ZHNvZnRfZGF0ZXRpbWUuc3RyVG9EYXRlKG9wdGlvbnMuc3RhcnREYXRlKTtcblx0XHRcdFx0fSBlbHNlIHtcblx0XHRcdFx0XHRjdCA9IG9wdGlvbnMudmFsdWUgfHwgKChpbnB1dCAmJiBpbnB1dC52YWwgJiYgaW5wdXQudmFsKCkpID8gaW5wdXQudmFsKCkgOiAnJyk7XG5cdFx0XHRcdFx0aWYgKGN0KSB7XG5cdFx0XHRcdFx0XHRjdCA9IF94ZHNvZnRfZGF0ZXRpbWUuc3RyVG9EYXRlVGltZShjdCk7XG5cdFx0XHRcdFx0XHRpZiAob3B0aW9ucy55ZWFyT2Zmc2V0KSB7XG5cdFx0XHRcdFx0XHRcdGN0ID0gbmV3IERhdGUoY3QuZ2V0RnVsbFllYXIoKSAtIG9wdGlvbnMueWVhck9mZnNldCwgY3QuZ2V0TW9udGgoKSwgY3QuZ2V0RGF0ZSgpLCBjdC5nZXRIb3VycygpLCBjdC5nZXRNaW51dGVzKCksIGN0LmdldFNlY29uZHMoKSwgY3QuZ2V0TWlsbGlzZWNvbmRzKCkpO1xuXHRcdFx0XHRcdFx0fVxuXHRcdFx0XHRcdH0gZWxzZSBpZiAob3B0aW9ucy5kZWZhdWx0RGF0ZSkge1xuXHRcdFx0XHRcdFx0Y3QgPSBfeGRzb2Z0X2RhdGV0aW1lLnN0clRvRGF0ZVRpbWUob3B0aW9ucy5kZWZhdWx0RGF0ZSk7XG5cdFx0XHRcdFx0XHRpZiAob3B0aW9ucy5kZWZhdWx0VGltZSkge1xuXHRcdFx0XHRcdFx0XHR0aW1lID0gX3hkc29mdF9kYXRldGltZS5zdHJ0b3RpbWUob3B0aW9ucy5kZWZhdWx0VGltZSk7XG5cdFx0XHRcdFx0XHRcdGN0LnNldEhvdXJzKHRpbWUuZ2V0SG91cnMoKSk7XG5cdFx0XHRcdFx0XHRcdGN0LnNldE1pbnV0ZXModGltZS5nZXRNaW51dGVzKCkpO1xuXHRcdFx0XHRcdFx0fVxuXHRcdFx0XHRcdH1cblx0XHRcdFx0fVxuXG5cdFx0XHRcdGlmIChjdCAmJiBfeGRzb2Z0X2RhdGV0aW1lLmlzVmFsaWREYXRlKGN0KSkge1xuXHRcdFx0XHRcdGRhdGV0aW1lcGlja2VyLmRhdGEoJ2NoYW5nZWQnLCB0cnVlKTtcblx0XHRcdFx0fSBlbHNlIHtcblx0XHRcdFx0XHRjdCA9ICcnO1xuXHRcdFx0XHR9XG5cblx0XHRcdFx0cmV0dXJuIGN0IHx8IDA7XG5cdFx0XHR9XG5cblx0XHRcdGZ1bmN0aW9uIHNldE1hc2sob3B0aW9ucykge1xuXG5cdFx0XHRcdHZhciBpc1ZhbGlkVmFsdWUgPSBmdW5jdGlvbiAobWFzaywgdmFsdWUpIHtcblx0XHRcdFx0XHRcdHZhciByZWcgPSBtYXNrXG5cdFx0XHRcdFx0XHRcdC5yZXBsYWNlKC8oW1xcW1xcXVxcL1xce1xcfVxcKFxcKVxcLVxcLlxcK117MX0pL2csICdcXFxcJDEnKVxuXHRcdFx0XHRcdFx0XHQucmVwbGFjZSgvXy9nLCAne2RpZ2l0K30nKVxuXHRcdFx0XHRcdFx0XHQucmVwbGFjZSgvKFswLTldezF9KS9nLCAne2RpZ2l0JDF9Jylcblx0XHRcdFx0XHRcdFx0LnJlcGxhY2UoL1xce2RpZ2l0KFswLTldezF9KVxcfS9nLCAnWzAtJDFfXXsxfScpXG5cdFx0XHRcdFx0XHRcdC5yZXBsYWNlKC9cXHtkaWdpdFtcXCtdXFx9L2csICdbMC05X117MX0nKTtcblx0XHRcdFx0XHRcdHJldHVybiAobmV3IFJlZ0V4cChyZWcpKS50ZXN0KHZhbHVlKTtcblx0XHRcdFx0XHR9LFxuXHRcdFx0XHRcdGdldENhcmV0UG9zID0gZnVuY3Rpb24gKGlucHV0KSB7XG5cdFx0XHRcdFx0XHR0cnkge1xuXHRcdFx0XHRcdFx0XHRpZiAob3B0aW9ucy5vd25lckRvY3VtZW50LnNlbGVjdGlvbiAmJiBvcHRpb25zLm93bmVyRG9jdW1lbnQuc2VsZWN0aW9uLmNyZWF0ZVJhbmdlKSB7XG5cdFx0XHRcdFx0XHRcdFx0dmFyIHJhbmdlID0gb3B0aW9ucy5vd25lckRvY3VtZW50LnNlbGVjdGlvbi5jcmVhdGVSYW5nZSgpO1xuXHRcdFx0XHRcdFx0XHRcdHJldHVybiByYW5nZS5nZXRCb29rbWFyaygpLmNoYXJDb2RlQXQoMikgLSAyO1xuXHRcdFx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0XHRcdGlmIChpbnB1dC5zZXRTZWxlY3Rpb25SYW5nZSkge1xuXHRcdFx0XHRcdFx0XHRcdHJldHVybiBpbnB1dC5zZWxlY3Rpb25TdGFydDtcblx0XHRcdFx0XHRcdFx0fVxuXHRcdFx0XHRcdFx0fSBjYXRjaCAoZSkge1xuXHRcdFx0XHRcdFx0XHRyZXR1cm4gMDtcblx0XHRcdFx0XHRcdH1cblx0XHRcdFx0XHR9LFxuXHRcdFx0XHRcdHNldENhcmV0UG9zID0gZnVuY3Rpb24gKG5vZGUsIHBvcykge1xuXHRcdFx0XHRcdFx0bm9kZSA9ICh0eXBlb2Ygbm9kZSA9PT0gXCJzdHJpbmdcIiB8fCBub2RlIGluc3RhbmNlb2YgU3RyaW5nKSA/IG9wdGlvbnMub3duZXJEb2N1bWVudC5nZXRFbGVtZW50QnlJZChub2RlKSA6IG5vZGU7XG5cdFx0XHRcdFx0XHRpZiAoIW5vZGUpIHtcblx0XHRcdFx0XHRcdFx0cmV0dXJuIGZhbHNlO1xuXHRcdFx0XHRcdFx0fVxuXHRcdFx0XHRcdFx0aWYgKG5vZGUuY3JlYXRlVGV4dFJhbmdlKSB7XG5cdFx0XHRcdFx0XHRcdHZhciB0ZXh0UmFuZ2UgPSBub2RlLmNyZWF0ZVRleHRSYW5nZSgpO1xuXHRcdFx0XHRcdFx0XHR0ZXh0UmFuZ2UuY29sbGFwc2UodHJ1ZSk7XG5cdFx0XHRcdFx0XHRcdHRleHRSYW5nZS5tb3ZlRW5kKCdjaGFyYWN0ZXInLCBwb3MpO1xuXHRcdFx0XHRcdFx0XHR0ZXh0UmFuZ2UubW92ZVN0YXJ0KCdjaGFyYWN0ZXInLCBwb3MpO1xuXHRcdFx0XHRcdFx0XHR0ZXh0UmFuZ2Uuc2VsZWN0KCk7XG5cdFx0XHRcdFx0XHRcdHJldHVybiB0cnVlO1xuXHRcdFx0XHRcdFx0fVxuXHRcdFx0XHRcdFx0aWYgKG5vZGUuc2V0U2VsZWN0aW9uUmFuZ2UpIHtcblx0XHRcdFx0XHRcdFx0bm9kZS5zZXRTZWxlY3Rpb25SYW5nZShwb3MsIHBvcyk7XG5cdFx0XHRcdFx0XHRcdHJldHVybiB0cnVlO1xuXHRcdFx0XHRcdFx0fVxuXHRcdFx0XHRcdFx0cmV0dXJuIGZhbHNlO1xuXHRcdFx0XHRcdH07XG5cblx0XHRcdFx0aWYob3B0aW9ucy5tYXNrKSB7XG5cdFx0XHRcdFx0aW5wdXQub2ZmKCdrZXlkb3duLnhkc29mdCcpO1xuXHRcdFx0XHR9XG5cblx0XHRcdFx0aWYgKG9wdGlvbnMubWFzayA9PT0gdHJ1ZSkge1xuXHRcdFx0XHRcdGlmIChkYXRlSGVscGVyLmZvcm1hdE1hc2spIHtcblx0XHRcdFx0XHRcdG9wdGlvbnMubWFzayA9IGRhdGVIZWxwZXIuZm9ybWF0TWFzayhvcHRpb25zLmZvcm1hdClcblx0XHRcdFx0XHR9IGVsc2Uge1xuXHRcdFx0XHRcdFx0b3B0aW9ucy5tYXNrID0gb3B0aW9ucy5mb3JtYXRcblx0XHRcdFx0XHRcdFx0LnJlcGxhY2UoL1kvZywgJzk5OTknKVxuXHRcdFx0XHRcdFx0XHQucmVwbGFjZSgvRi9nLCAnOTk5OScpXG5cdFx0XHRcdFx0XHRcdC5yZXBsYWNlKC9tL2csICcxOScpXG5cdFx0XHRcdFx0XHRcdC5yZXBsYWNlKC9kL2csICczOScpXG5cdFx0XHRcdFx0XHRcdC5yZXBsYWNlKC9IL2csICcyOScpXG5cdFx0XHRcdFx0XHRcdC5yZXBsYWNlKC9pL2csICc1OScpXG5cdFx0XHRcdFx0XHRcdC5yZXBsYWNlKC9zL2csICc1OScpO1xuXHRcdFx0XHRcdH1cblx0XHRcdFx0fVxuXG5cdFx0XHRcdGlmICgkLnR5cGUob3B0aW9ucy5tYXNrKSA9PT0gJ3N0cmluZycpIHtcblx0XHRcdFx0XHRpZiAoIWlzVmFsaWRWYWx1ZShvcHRpb25zLm1hc2ssIGlucHV0LnZhbCgpKSkge1xuXHRcdFx0XHRcdFx0aW5wdXQudmFsKG9wdGlvbnMubWFzay5yZXBsYWNlKC9bMC05XS9nLCAnXycpKTtcblx0XHRcdFx0XHRcdHNldENhcmV0UG9zKGlucHV0WzBdLCAwKTtcblx0XHRcdFx0XHR9XG5cblx0XHRcdFx0XHRpbnB1dC5vbigncGFzdGUueGRzb2Z0JywgZnVuY3Rpb24gKGV2ZW50KSB7XG5cdFx0XHRcdFx0ICAgIC8vIGNvdXBsZSBvcHRpb25zIGhlcmVcblx0XHRcdFx0XHQgICAgLy8gMS4gcmV0dXJuIGZhbHNlIC0gdGVsbCB0aGVtIHRoZXkgY2FuJ3QgcGFzdGVcblx0XHRcdFx0XHQgICAgLy8gMi4gaW5zZXJ0IG92ZXIgY3VycmVudCBjaGFyYWN0ZXJzIC0gbWluaW1hbCB2YWxpZGF0aW9uXG5cdFx0XHRcdFx0ICAgIC8vIDMuIGZ1bGwgZmxlZGdlZCBwYXJzaW5nIGFuZCB2YWxpZGF0aW9uXG5cdFx0XHRcdFx0ICAgIC8vIGxldCdzIGdvIG9wdGlvbiAyIGZvciBub3dcblxuXHRcdFx0XHRcdCAgICAvLyBmaXJlcyBtdWx0aXBsZSB0aW1lcyBmb3Igc29tZSByZWFzb25cblxuXHRcdFx0XHRcdCAgICAvLyBodHRwczovL3N0YWNrb3ZlcmZsb3cuY29tL2EvMzA0OTY0ODgvMTM2NjAzM1xuXHRcdFx0XHRcdCAgICB2YXIgY2xpcGJvYXJkRGF0YSA9IGV2ZW50LmNsaXBib2FyZERhdGEgfHwgZXZlbnQub3JpZ2luYWxFdmVudC5jbGlwYm9hcmREYXRhIHx8IHdpbmRvdy5jbGlwYm9hcmREYXRhLFxuXHRcdFx0XHRcdFx0cGFzdGVkRGF0YSA9IGNsaXBib2FyZERhdGEuZ2V0RGF0YSgndGV4dCcpLFxuXHRcdFx0XHRcdFx0dmFsID0gdGhpcy52YWx1ZSxcblx0XHRcdFx0XHRcdHBvcyA9IHRoaXMuc2VsZWN0aW9uU3RhcnRcblxuXHRcdFx0XHRcdCAgICB2YXIgdmFsdWVCZWZvcmVDdXJzb3IgPSB2YWwuc3Vic3RyKDAsIHBvcyk7XG5cdFx0XHRcdFx0ICAgIHZhciB2YWx1ZUFmdGVyUGFzdGUgPSB2YWwuc3Vic3RyKHBvcyArIHBhc3RlZERhdGEubGVuZ3RoKTtcblxuXHRcdFx0XHRcdCAgICB2YWwgPSB2YWx1ZUJlZm9yZUN1cnNvciArIHBhc3RlZERhdGEgKyB2YWx1ZUFmdGVyUGFzdGU7ICAgICAgICAgICBcblx0XHRcdFx0XHQgICAgcG9zICs9IHBhc3RlZERhdGEubGVuZ3RoO1xuXG5cdFx0XHRcdFx0ICAgIGlmIChpc1ZhbGlkVmFsdWUob3B0aW9ucy5tYXNrLCB2YWwpKSB7XG5cdFx0XHRcdFx0XHR0aGlzLnZhbHVlID0gdmFsO1xuXHRcdFx0XHRcdFx0c2V0Q2FyZXRQb3ModGhpcywgcG9zKTtcblx0XHRcdFx0XHQgICAgfSBlbHNlIGlmICgkLnRyaW0odmFsKSA9PT0gJycpIHtcblx0XHRcdFx0XHRcdHRoaXMudmFsdWUgPSBvcHRpb25zLm1hc2sucmVwbGFjZSgvWzAtOV0vZywgJ18nKTtcblx0XHRcdFx0XHQgICAgfSBlbHNlIHtcblx0XHRcdFx0XHRcdGlucHV0LnRyaWdnZXIoJ2Vycm9yX2lucHV0Lnhkc29mdCcpO1xuXHRcdFx0XHRcdCAgICB9XG5cblx0XHRcdFx0XHQgICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcblx0XHRcdFx0XHQgICAgcmV0dXJuIGZhbHNlO1xuXHRcdFx0XHRcdCAgfSk7XG5cblx0XHRcdFx0XHQgIGlucHV0Lm9uKCdrZXlkb3duLnhkc29mdCcsIGZ1bmN0aW9uIChldmVudCkge1xuXHRcdFx0XHRcdCAgICB2YXIgdmFsID0gdGhpcy52YWx1ZSxcblx0XHRcdFx0XHRcdGtleSA9IGV2ZW50LndoaWNoLFxuXHRcdFx0XHRcdFx0cG9zID0gdGhpcy5zZWxlY3Rpb25TdGFydCxcblx0XHRcdFx0XHRcdHNlbEVuZCA9IHRoaXMuc2VsZWN0aW9uRW5kLFxuXHRcdFx0XHRcdFx0aGFzU2VsID0gcG9zICE9PSBzZWxFbmQsXG5cdFx0XHRcdFx0XHRkaWdpdDtcblxuXHRcdFx0XHRcdCAgICAvLyBvbmx5IGFsb3cgdGhlc2UgY2hhcmFjdGVyc1xuXHRcdFx0XHRcdCAgICBpZiAoKChrZXkgPj0gIEtFWTAgJiYga2V5IDw9ICBLRVk5KSAgfHxcblx0XHRcdFx0XHRcdCAoa2V5ID49IF9LRVkwICYmIGtleSA8PSBfS0VZOSkpIHx8IFxuXHRcdFx0XHRcdFx0IChrZXkgPT09IEJBQ0tTUEFDRSB8fCBrZXkgPT09IERFTCkpIHtcblxuXHRcdFx0XHRcdCAgICAgIC8vIGdldCBjaGFyIHRvIGluc2VydCB3aGljaCBpcyBuZXcgY2hhcmFjdGVyIG9yIHBsYWNlaG9sZGVyICgnXycpXG5cdFx0XHRcdFx0ICAgICAgZGlnaXQgPSAoa2V5ID09PSBCQUNLU1BBQ0UgfHwga2V5ID09PSBERUwpID8gJ18nIDpcblx0XHRcdFx0XHRcdFx0ICBTdHJpbmcuZnJvbUNoYXJDb2RlKChfS0VZMCA8PSBrZXkgJiYga2V5IDw9IF9LRVk5KSA/IGtleSAtIEtFWTAgOiBrZXkpO1xuXG5cdFx0XHRcdFx0XHQvLyB3ZSdyZSBkZWxldGluZyBzb21ldGhpbmcsIHdlJ3JlIG5vdCBhdCB0aGUgc3RhcnQsIGFuZCBoYXZlIG5vcm1hbCBjdXJzb3IsIG1vdmUgYmFjayBvbmVcblx0XHRcdFx0XHRcdC8vIGlmIHdlIGhhdmUgYSBzZWxlY3Rpb24gbGVuZ3RoLCBjdXJzb3IgYWN0dWFsbHkgc2l0cyBiZWhpbmQgZGVsZXRhYmxlIGNoYXIsIG5vdCBpbiBmcm9udFxuXHRcdFx0XHRcdFx0aWYgKGtleSA9PT0gQkFDS1NQQUNFICYmIHBvcyAmJiAhaGFzU2VsKSB7XG5cdFx0XHRcdFx0XHQgICAgcG9zIC09IDE7XG5cdFx0XHRcdFx0XHR9XG5cblx0XHRcdFx0XHRcdC8vIGRvbid0IHN0b3Agb24gYSBzZXBhcmF0b3IsIGNvbnRpbnVlIHdoYXRldmVyIGRpcmVjdGlvbiB5b3Ugd2VyZSBnb2luZ1xuXHRcdFx0XHRcdFx0Ly8gICB2YWx1ZSBjaGFyIC0ga2VlcCBpbmNyZW1lbnRpbmcgcG9zaXRpb24gd2hpbGUgb24gc2VwYXJhdG9yIGNoYXIgYW5kIHdlIHN0aWxsIGhhdmUgcm9vbVxuXHRcdFx0XHRcdFx0Ly8gICBkZWwgY2hhciAgIC0ga2VlcCBkZWNyZW1lbnRpbmcgcG9zaXRpb24gd2hpbGUgb24gc2VwYXJhdG9yIGNoYXIgYW5kIHdlIHN0aWxsIGhhdmUgcm9vbVxuXHRcdFx0XHRcdFx0d2hpbGUgKHRydWUpIHtcblx0XHRcdFx0XHRcdCAgdmFyIG1hc2tWYWx1ZUF0Q3VyUG9zID0gb3B0aW9ucy5tYXNrLnN1YnN0cihwb3MsIDEpO1xuXHRcdFx0XHRcdFx0ICB2YXIgcG9zU2hvcnRlclRoYW5NYXNrTGVuZ3RoID0gcG9zIDwgb3B0aW9ucy5tYXNrLmxlbmd0aDtcblx0XHRcdFx0XHRcdCAgdmFyIHBvc0dyZWF0ZXJUaGFuWmVybyA9IHBvcyA+IDA7XG5cdFx0XHRcdFx0XHQgIHZhciBub3ROdW1iZXJPclBsYWNlaG9sZGVyID0gL1teMC05X10vO1xuXHRcdFx0XHRcdFx0ICB2YXIgY3VyUG9zT25TZXAgPSBub3ROdW1iZXJPclBsYWNlaG9sZGVyLnRlc3QobWFza1ZhbHVlQXRDdXJQb3MpO1xuXHRcdFx0XHRcdFx0ICB2YXIgY29udGludWVNb3ZpbmdQb3NpdGlvbiA9IGN1clBvc09uU2VwICYmIHBvc1Nob3J0ZXJUaGFuTWFza0xlbmd0aCAmJiBwb3NHcmVhdGVyVGhhblplcm9cblxuXHRcdFx0XHRcdFx0ICAvLyBpZiB3ZSBoaXQgYSByZWFsIGNoYXIsIHN0YXkgd2hlcmUgd2UgYXJlXG5cdFx0XHRcdFx0XHQgIGlmICghY29udGludWVNb3ZpbmdQb3NpdGlvbikgYnJlYWs7XG5cblx0XHRcdFx0XHRcdCAgLy8gaGl0dGluZyBiYWNrc3BhY2UgaW4gYSBzZWxlY3Rpb24sIHlvdSBjYW4gcG9zc2libHkgZ28gYmFjayBhbnkgZnVydGhlciAtIGdvIGZvcndhcmRcblx0XHRcdFx0XHRcdCAgcG9zICs9IChrZXkgPT09IEJBQ0tTUEFDRSAmJiAhaGFzU2VsKSA/IC0xIDogMTtcblxuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgXG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoZXZlbnQubWV0YUtleSkgeyAgICAvLyBjbWQgaGFzIGJlZW4gcHJlc3NlZFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHBvcyA9IDA7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaGFzU2VsID0gdHJ1ZTtcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cblxuXHRcdFx0XHRcdFx0aWYgKGhhc1NlbCkge1xuXHRcdFx0XHRcdFx0ICAvLyBwb3MgbWlnaHQgaGF2ZSBtb3ZlZCBzbyByZS1jYWxjIGxlbmd0aFxuXHRcdFx0XHRcdFx0ICB2YXIgc2VsTGVuZ3RoID0gc2VsRW5kIC0gcG9zXG5cblx0XHRcdFx0XHRcdCAgLy8gaWYgd2UgaGF2ZSBhIHNlbGVjdGlvbiBsZW5ndGggd2Ugd2lsbCB3aXBlIG91dCBlbnRpcmUgc2VsZWN0aW9uIGFuZCByZXBsYWNlIHdpdGggZGVmYXVsdCB0ZW1wbGF0ZSBmb3IgdGhhdCByYW5nZVxuXHRcdFx0XHRcdFx0ICB2YXIgZGVmYXVsdEJsYW5rID0gb3B0aW9ucy5tYXNrLnJlcGxhY2UoL1swLTldL2csICdfJyk7XG5cdFx0XHRcdFx0XHQgIHZhciBkZWZhdWx0QmxhbmtTZWxlY3Rpb25SZXBsYWNlbWVudCA9IGRlZmF1bHRCbGFuay5zdWJzdHIocG9zLCBzZWxMZW5ndGgpOyBcblx0XHRcdFx0XHRcdCAgdmFyIHNlbFJlcGxhY2VtZW50UmVtYWluZGVyID0gZGVmYXVsdEJsYW5rU2VsZWN0aW9uUmVwbGFjZW1lbnQuc3Vic3RyKDEpIC8vIG1pZ2h0IGJlIGVtcHR5XG5cblx0XHRcdFx0XHRcdCAgdmFyIHZhbHVlQmVmb3JlU2VsID0gdmFsLnN1YnN0cigwLCBwb3MpO1xuXHRcdFx0XHRcdFx0ICB2YXIgaW5zZXJ0Q2hhcnMgPSBkaWdpdCArIHNlbFJlcGxhY2VtZW50UmVtYWluZGVyO1xuXHRcdFx0XHRcdFx0ICB2YXIgY2hhcnNBZnRlclNlbGVjdGlvbiA9IHZhbC5zdWJzdHIocG9zICsgc2VsTGVuZ3RoKTtcblxuXHRcdFx0XHRcdFx0ICB2YWwgPSB2YWx1ZUJlZm9yZVNlbCArIGluc2VydENoYXJzICsgY2hhcnNBZnRlclNlbGVjdGlvblxuXG5cdFx0XHRcdFx0XHR9IGVsc2Uge1xuXHRcdFx0XHRcdFx0ICB2YXIgdmFsdWVCZWZvcmVDdXJzb3IgPSB2YWwuc3Vic3RyKDAsIHBvcyk7XG5cdFx0XHRcdFx0XHQgIHZhciBpbnNlcnRDaGFyID0gZGlnaXQ7XG5cdFx0XHRcdFx0XHQgIHZhciB2YWx1ZUFmdGVyTmV4dENoYXIgPSB2YWwuc3Vic3RyKHBvcyArIDEpO1xuXG5cdFx0XHRcdFx0XHQgIHZhbCA9IHZhbHVlQmVmb3JlQ3Vyc29yICsgaW5zZXJ0Q2hhciArIHZhbHVlQWZ0ZXJOZXh0Q2hhclxuXHRcdFx0XHRcdFx0fVxuXG5cdFx0XHRcdFx0XHRpZiAoJC50cmltKHZhbCkgPT09ICcnKSB7XG5cdFx0XHRcdFx0XHQgIC8vIGlmIGVtcHR5LCBzZXQgdG8gZGVmYXVsdFxuXHRcdFx0XHRcdFx0ICAgIHZhbCA9IGRlZmF1bHRCbGFua1xuXHRcdFx0XHRcdFx0fSBlbHNlIHtcblx0XHRcdFx0XHRcdCAgLy8gaWYgYXQgdGhlIGxhc3QgY2hhcmFjdGVyIGRvbid0IG5lZWQgdG8gZG8gYW55dGhpbmdcblx0XHRcdFx0XHRcdCAgICBpZiAocG9zID09PSBvcHRpb25zLm1hc2subGVuZ3RoKSB7XG5cdFx0XHRcdFx0XHRcdGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG5cdFx0XHRcdFx0XHRcdHJldHVybiBmYWxzZTtcblx0XHRcdFx0XHRcdCAgICB9XG5cdFx0XHRcdFx0XHR9XG5cblx0XHRcdFx0XHRcdC8vIHJlc3VtZSBjdXJzb3IgbG9jYXRpb25cblx0XHRcdFx0XHRcdHBvcyArPSAoa2V5ID09PSBCQUNLU1BBQ0UpID8gMCA6IDE7XG5cdFx0XHRcdFx0XHQvLyBkb24ndCBzdG9wIG9uIGEgc2VwYXJhdG9yLCBjb250aW51ZSB3aGF0ZXZlciBkaXJlY3Rpb24geW91IHdlcmUgZ29pbmdcblx0XHRcdFx0XHRcdHdoaWxlICgvW14wLTlfXS8udGVzdChvcHRpb25zLm1hc2suc3Vic3RyKHBvcywgMSkpICYmIHBvcyA8IG9wdGlvbnMubWFzay5sZW5ndGggJiYgcG9zID4gMCkge1xuXHRcdFx0XHRcdFx0ICAgIHBvcyArPSAoa2V5ID09PSBCQUNLU1BBQ0UpID8gMCA6IDE7XG5cdFx0XHRcdFx0XHR9XG5cblx0XHRcdFx0XHRcdGlmIChpc1ZhbGlkVmFsdWUob3B0aW9ucy5tYXNrLCB2YWwpKSB7XG5cdFx0XHRcdFx0XHQgICAgdGhpcy52YWx1ZSA9IHZhbDtcblx0XHRcdFx0XHRcdCAgICBzZXRDYXJldFBvcyh0aGlzLCBwb3MpO1xuXHRcdFx0XHRcdFx0fSBlbHNlIGlmICgkLnRyaW0odmFsKSA9PT0gJycpIHtcblx0XHRcdFx0XHRcdCAgICB0aGlzLnZhbHVlID0gb3B0aW9ucy5tYXNrLnJlcGxhY2UoL1swLTldL2csICdfJyk7XG5cdFx0XHRcdFx0XHR9IGVsc2Uge1xuXHRcdFx0XHRcdFx0ICAgIGlucHV0LnRyaWdnZXIoJ2Vycm9yX2lucHV0Lnhkc29mdCcpO1xuXHRcdFx0XHRcdFx0fVxuXHRcdFx0XHRcdCAgICB9IGVsc2Uge1xuXHRcdFx0XHRcdFx0aWYgKChbQUtFWSwgQ0tFWSwgVktFWSwgWktFWSwgWUtFWV0uaW5kZXhPZihrZXkpICE9PSAtMSAmJiBjdHJsRG93bikgfHwgW0VTQywgQVJST1dVUCwgQVJST1dET1dOLCBBUlJPV0xFRlQsIEFSUk9XUklHSFQsIEY1LCBDVFJMS0VZLCBUQUIsIEVOVEVSXS5pbmRleE9mKGtleSkgIT09IC0xKSB7XG5cdFx0XHRcdFx0XHQgICAgcmV0dXJuIHRydWU7XG5cdFx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0ICAgIH1cblxuXHRcdFx0XHRcdCAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuXHRcdFx0XHRcdCAgICByZXR1cm4gZmFsc2U7XG5cdFx0XHRcdFx0ICB9KTtcblx0XHRcdFx0fVxuXHRcdFx0fVxuXG5cdFx0XHRfeGRzb2Z0X2RhdGV0aW1lLnNldEN1cnJlbnRUaW1lKGdldEN1cnJlbnRWYWx1ZSgpKTtcblxuXHRcdFx0aW5wdXRcblx0XHRcdFx0LmRhdGEoJ3hkc29mdF9kYXRldGltZXBpY2tlcicsIGRhdGV0aW1lcGlja2VyKVxuXHRcdFx0XHQub24oJ29wZW4ueGRzb2Z0IGZvY3VzaW4ueGRzb2Z0IG1vdXNlZG93bi54ZHNvZnQgdG91Y2hzdGFydCcsIGZ1bmN0aW9uICgpIHtcblx0XHRcdFx0XHRpZiAoaW5wdXQuaXMoJzpkaXNhYmxlZCcpIHx8IChpbnB1dC5kYXRhKCd4ZHNvZnRfZGF0ZXRpbWVwaWNrZXInKS5pcygnOnZpc2libGUnKSAmJiBvcHRpb25zLmNsb3NlT25JbnB1dENsaWNrKSkge1xuXHRcdFx0XHRcdFx0cmV0dXJuO1xuXHRcdFx0XHRcdH1cblx0XHRcdFx0XHRpZiAoIW9wdGlvbnMub3Blbk9uRm9jdXMpIHtcblx0XHRcdFx0XHRcdHJldHVybjtcblx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0Y2xlYXJUaW1lb3V0KHRpbWVyKTtcblx0XHRcdFx0XHR0aW1lciA9IHNldFRpbWVvdXQoZnVuY3Rpb24gKCkge1xuXHRcdFx0XHRcdFx0aWYgKGlucHV0LmlzKCc6ZGlzYWJsZWQnKSkge1xuXHRcdFx0XHRcdFx0XHRyZXR1cm47XG5cdFx0XHRcdFx0XHR9XG5cblx0XHRcdFx0XHRcdHRyaWdnZXJBZnRlck9wZW4gPSB0cnVlO1xuXHRcdFx0XHRcdFx0X3hkc29mdF9kYXRldGltZS5zZXRDdXJyZW50VGltZShnZXRDdXJyZW50VmFsdWUoKSwgdHJ1ZSk7XG5cdFx0XHRcdFx0XHRpZihvcHRpb25zLm1hc2spIHtcblx0XHRcdFx0XHRcdFx0c2V0TWFzayhvcHRpb25zKTtcblx0XHRcdFx0XHRcdH1cblx0XHRcdFx0XHRcdGRhdGV0aW1lcGlja2VyLnRyaWdnZXIoJ29wZW4ueGRzb2Z0Jyk7XG5cdFx0XHRcdFx0fSwgMTAwKTtcblx0XHRcdFx0fSlcblx0XHRcdFx0Lm9uKCdrZXlkb3duLnhkc29mdCcsIGZ1bmN0aW9uIChldmVudCkge1xuXHRcdFx0XHRcdHZhciBlbGVtZW50U2VsZWN0b3IsXG5cdFx0XHRcdFx0XHRrZXkgPSBldmVudC53aGljaDtcblx0XHRcdFx0XHRpZiAoW0VOVEVSXS5pbmRleE9mKGtleSkgIT09IC0xICYmIG9wdGlvbnMuZW50ZXJMaWtlVGFiKSB7XG5cdFx0XHRcdFx0XHRlbGVtZW50U2VsZWN0b3IgPSAkKFwiaW5wdXQ6dmlzaWJsZSx0ZXh0YXJlYTp2aXNpYmxlLGJ1dHRvbjp2aXNpYmxlLGE6dmlzaWJsZVwiKTtcblx0XHRcdFx0XHRcdGRhdGV0aW1lcGlja2VyLnRyaWdnZXIoJ2Nsb3NlLnhkc29mdCcpO1xuXHRcdFx0XHRcdFx0ZWxlbWVudFNlbGVjdG9yLmVxKGVsZW1lbnRTZWxlY3Rvci5pbmRleCh0aGlzKSArIDEpLmZvY3VzKCk7XG5cdFx0XHRcdFx0XHRyZXR1cm4gZmFsc2U7XG5cdFx0XHRcdFx0fVxuXHRcdFx0XHRcdGlmIChbVEFCXS5pbmRleE9mKGtleSkgIT09IC0xKSB7XG5cdFx0XHRcdFx0XHRkYXRldGltZXBpY2tlci50cmlnZ2VyKCdjbG9zZS54ZHNvZnQnKTtcblx0XHRcdFx0XHRcdHJldHVybiB0cnVlO1xuXHRcdFx0XHRcdH1cblx0XHRcdFx0fSlcblx0XHRcdFx0Lm9uKCdibHVyLnhkc29mdCcsIGZ1bmN0aW9uICgpIHtcblx0XHRcdFx0XHRkYXRldGltZXBpY2tlci50cmlnZ2VyKCdjbG9zZS54ZHNvZnQnKTtcblx0XHRcdFx0fSk7XG5cdFx0fTtcblx0XHRkZXN0cm95RGF0ZVRpbWVQaWNrZXIgPSBmdW5jdGlvbiAoaW5wdXQpIHtcblx0XHRcdHZhciBkYXRldGltZXBpY2tlciA9IGlucHV0LmRhdGEoJ3hkc29mdF9kYXRldGltZXBpY2tlcicpO1xuXHRcdFx0aWYgKGRhdGV0aW1lcGlja2VyKSB7XG5cdFx0XHRcdGRhdGV0aW1lcGlja2VyLmRhdGEoJ3hkc29mdF9kYXRldGltZScsIG51bGwpO1xuXHRcdFx0XHRkYXRldGltZXBpY2tlci5yZW1vdmUoKTtcblx0XHRcdFx0aW5wdXRcblx0XHRcdFx0XHQuZGF0YSgneGRzb2Z0X2RhdGV0aW1lcGlja2VyJywgbnVsbClcblx0XHRcdFx0XHQub2ZmKCcueGRzb2Z0Jyk7XG5cdFx0XHRcdCQob3B0aW9ucy5jb250ZW50V2luZG93KS5vZmYoJ3Jlc2l6ZS54ZHNvZnQnKTtcblx0XHRcdFx0JChbb3B0aW9ucy5jb250ZW50V2luZG93LCBvcHRpb25zLm93bmVyRG9jdW1lbnQuYm9keV0pLm9mZignbW91c2Vkb3duLnhkc29mdCB0b3VjaHN0YXJ0Jyk7XG5cdFx0XHRcdGlmIChpbnB1dC51bm1vdXNld2hlZWwpIHtcblx0XHRcdFx0XHRpbnB1dC51bm1vdXNld2hlZWwoKTtcblx0XHRcdFx0fVxuXHRcdFx0fVxuXHRcdH07XG5cdFx0JChvcHRpb25zLm93bmVyRG9jdW1lbnQpXG4gICAgICAgICAgICAub2ZmKCdrZXlkb3duLnhkc29mdGN0cmwga2V5dXAueGRzb2Z0Y3RybCcpXG4gICAgICAgICAgICAub2ZmKCdrZXlkb3duLnhkc29mdGNtZCBrZXl1cC54ZHNvZnRjbWQnKVxuXHRcdFx0Lm9uKCdrZXlkb3duLnhkc29mdGN0cmwnLCBmdW5jdGlvbiAoZSkge1xuXHRcdFx0XHRpZiAoZS5rZXlDb2RlID09PSBDVFJMS0VZKSB7XG5cdFx0XHRcdFx0Y3RybERvd24gPSB0cnVlO1xuICAgICAgICAgICAgICAgIH1cblx0XHRcdH0pXG5cdFx0XHQub24oJ2tleXVwLnhkc29mdGN0cmwnLCBmdW5jdGlvbiAoZSkge1xuXHRcdFx0XHRpZiAoZS5rZXlDb2RlID09PSBDVFJMS0VZKSB7XG5cdFx0XHRcdFx0Y3RybERvd24gPSBmYWxzZTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9KVxuICAgICAgICAgICAgLm9uKCdrZXlkb3duLnhkc29mdGNtZCcsIGZ1bmN0aW9uIChlKSB7XG4gICAgICAgICAgICAgICAgaWYgKGUua2V5Q29kZSA9PT0gQ01ES0VZKSB7XG4gICAgICAgICAgICAgICAgICAgIGNtZERvd24gPSB0cnVlO1xuICAgICAgICAgICAgICAgIH1cblx0XHRcdH0pXG5cdFx0XHQub24oJ2tleXVwLnhkc29mdGNtZCcsIGZ1bmN0aW9uIChlKSB7XG4gICAgICAgICAgICAgICAgaWYgKGUua2V5Q29kZSA9PT0gQ01ES0VZKSB7XG4gICAgICAgICAgICAgICAgICAgIGNtZERvd24gPSBmYWxzZTtcbiAgICAgICAgICAgICAgICB9XG5cdFx0XHR9KTtcblxuXHRcdHRoaXMuZWFjaChmdW5jdGlvbiAoKSB7XG5cdFx0XHR2YXIgZGF0ZXRpbWVwaWNrZXIgPSAkKHRoaXMpLmRhdGEoJ3hkc29mdF9kYXRldGltZXBpY2tlcicpLCAkaW5wdXQ7XG5cdFx0XHRpZiAoZGF0ZXRpbWVwaWNrZXIpIHtcblx0XHRcdFx0aWYgKCQudHlwZShvcHQpID09PSAnc3RyaW5nJykge1xuXHRcdFx0XHRcdHN3aXRjaCAob3B0KSB7XG5cdFx0XHRcdFx0XHRjYXNlICdzaG93Jzpcblx0XHRcdFx0XHRcdFx0JCh0aGlzKS5zZWxlY3QoKS5mb2N1cygpO1xuXHRcdFx0XHRcdFx0XHRkYXRldGltZXBpY2tlci50cmlnZ2VyKCdvcGVuLnhkc29mdCcpO1xuXHRcdFx0XHRcdFx0XHRicmVhaztcblx0XHRcdFx0XHRcdGNhc2UgJ2hpZGUnOlxuXHRcdFx0XHRcdFx0XHRkYXRldGltZXBpY2tlci50cmlnZ2VyKCdjbG9zZS54ZHNvZnQnKTtcblx0XHRcdFx0XHRcdFx0YnJlYWs7XG5cdFx0XHRcdFx0XHRjYXNlICd0b2dnbGUnOlxuXHRcdFx0XHRcdFx0XHRkYXRldGltZXBpY2tlci50cmlnZ2VyKCd0b2dnbGUueGRzb2Z0Jyk7XG5cdFx0XHRcdFx0XHRcdGJyZWFrO1xuXHRcdFx0XHRcdFx0Y2FzZSAnZGVzdHJveSc6XG5cdFx0XHRcdFx0XHRcdGRlc3Ryb3lEYXRlVGltZVBpY2tlcigkKHRoaXMpKTtcblx0XHRcdFx0XHRcdFx0YnJlYWs7XG5cdFx0XHRcdFx0XHRjYXNlICdyZXNldCc6XG5cdFx0XHRcdFx0XHRcdHRoaXMudmFsdWUgPSB0aGlzLmRlZmF1bHRWYWx1ZTtcblx0XHRcdFx0XHRcdFx0aWYgKCF0aGlzLnZhbHVlIHx8ICFkYXRldGltZXBpY2tlci5kYXRhKCd4ZHNvZnRfZGF0ZXRpbWUnKS5pc1ZhbGlkRGF0ZShkYXRlSGVscGVyLnBhcnNlRGF0ZSh0aGlzLnZhbHVlLCBvcHRpb25zLmZvcm1hdCkpKSB7XG5cdFx0XHRcdFx0XHRcdFx0ZGF0ZXRpbWVwaWNrZXIuZGF0YSgnY2hhbmdlZCcsIGZhbHNlKTtcblx0XHRcdFx0XHRcdFx0fVxuXHRcdFx0XHRcdFx0XHRkYXRldGltZXBpY2tlci5kYXRhKCd4ZHNvZnRfZGF0ZXRpbWUnKS5zZXRDdXJyZW50VGltZSh0aGlzLnZhbHVlKTtcblx0XHRcdFx0XHRcdFx0YnJlYWs7XG5cdFx0XHRcdFx0XHRjYXNlICd2YWxpZGF0ZSc6XG5cdFx0XHRcdFx0XHRcdCRpbnB1dCA9IGRhdGV0aW1lcGlja2VyLmRhdGEoJ2lucHV0Jyk7XG5cdFx0XHRcdFx0XHRcdCRpbnB1dC50cmlnZ2VyKCdibHVyLnhkc29mdCcpO1xuXHRcdFx0XHRcdFx0XHRicmVhaztcblx0XHRcdFx0XHRcdGRlZmF1bHQ6XG5cdFx0XHRcdFx0XHRcdGlmIChkYXRldGltZXBpY2tlcltvcHRdICYmICQuaXNGdW5jdGlvbihkYXRldGltZXBpY2tlcltvcHRdKSkge1xuXHRcdFx0XHRcdFx0XHRcdHJlc3VsdCA9IGRhdGV0aW1lcGlja2VyW29wdF0ob3B0Mik7XG5cdFx0XHRcdFx0XHRcdH1cblx0XHRcdFx0XHR9XG5cdFx0XHRcdH0gZWxzZSB7XG5cdFx0XHRcdFx0ZGF0ZXRpbWVwaWNrZXJcblx0XHRcdFx0XHRcdC5zZXRPcHRpb25zKG9wdCk7XG5cdFx0XHRcdH1cblx0XHRcdFx0cmV0dXJuIDA7XG5cdFx0XHR9XG5cdFx0XHRpZiAoJC50eXBlKG9wdCkgIT09ICdzdHJpbmcnKSB7XG5cdFx0XHRcdGlmICghb3B0aW9ucy5sYXp5SW5pdCB8fCBvcHRpb25zLm9wZW4gfHwgb3B0aW9ucy5pbmxpbmUpIHtcblx0XHRcdFx0XHRjcmVhdGVEYXRlVGltZVBpY2tlcigkKHRoaXMpKTtcblx0XHRcdFx0fSBlbHNlIHtcblx0XHRcdFx0XHRsYXp5SW5pdCgkKHRoaXMpKTtcblx0XHRcdFx0fVxuXHRcdFx0fVxuXHRcdH0pO1xuXG5cdFx0cmV0dXJuIHJlc3VsdDtcblx0fTtcblxuXHQkLmZuLmRhdGV0aW1lcGlja2VyLmRlZmF1bHRzID0gZGVmYXVsdF9vcHRpb25zO1xuXG5cdGZ1bmN0aW9uIEhpZ2hsaWdodGVkRGF0ZShkYXRlLCBkZXNjLCBzdHlsZSkge1xuXHRcdFwidXNlIHN0cmljdFwiO1xuXHRcdHRoaXMuZGF0ZSA9IGRhdGU7XG5cdFx0dGhpcy5kZXNjID0gZGVzYztcblx0XHR0aGlzLnN0eWxlID0gc3R5bGU7XG5cdH1cbn07XG47KGZ1bmN0aW9uIChmYWN0b3J5KSB7XG5cdGlmICggdHlwZW9mIGRlZmluZSA9PT0gJ2Z1bmN0aW9uJyAmJiBkZWZpbmUuYW1kICkge1xuXHRcdC8vIEFNRC4gUmVnaXN0ZXIgYXMgYW4gYW5vbnltb3VzIG1vZHVsZS5cblx0XHRkZWZpbmUoWydqcXVlcnknLCAnanF1ZXJ5LW1vdXNld2hlZWwnXSwgZmFjdG9yeSk7XG5cdH0gZWxzZSBpZiAodHlwZW9mIGV4cG9ydHMgPT09ICdvYmplY3QnKSB7XG5cdFx0Ly8gTm9kZS9Db21tb25KUyBzdHlsZSBmb3IgQnJvd3NlcmlmeVxuXHRcdG1vZHVsZS5leHBvcnRzID0gZmFjdG9yeShyZXF1aXJlKCdqcXVlcnknKSk7O1xuXHR9IGVsc2Uge1xuXHRcdC8vIEJyb3dzZXIgZ2xvYmFsc1xuXHRcdGZhY3RvcnkoalF1ZXJ5KTtcblx0fVxufShkYXRldGltZXBpY2tlckZhY3RvcnkpKTtcblxuXG4vKiFcbiAqIGpRdWVyeSBNb3VzZXdoZWVsIDMuMS4xM1xuICpcbiAqIENvcHlyaWdodCBqUXVlcnkgRm91bmRhdGlvbiBhbmQgb3RoZXIgY29udHJpYnV0b3JzXG4gKiBSZWxlYXNlZCB1bmRlciB0aGUgTUlUIGxpY2Vuc2VcbiAqIGh0dHA6Ly9qcXVlcnkub3JnL2xpY2Vuc2VcbiAqL1xuXG4oZnVuY3Rpb24gKGZhY3RvcnkpIHtcbiAgICBpZiAoIHR5cGVvZiBkZWZpbmUgPT09ICdmdW5jdGlvbicgJiYgZGVmaW5lLmFtZCApIHtcbiAgICAgICAgLy8gQU1ELiBSZWdpc3RlciBhcyBhbiBhbm9ueW1vdXMgbW9kdWxlLlxuICAgICAgICBkZWZpbmUoWydqcXVlcnknXSwgZmFjdG9yeSk7XG4gICAgfSBlbHNlIGlmICh0eXBlb2YgZXhwb3J0cyA9PT0gJ29iamVjdCcpIHtcbiAgICAgICAgLy8gTm9kZS9Db21tb25KUyBzdHlsZSBmb3IgQnJvd3NlcmlmeVxuICAgICAgICBtb2R1bGUuZXhwb3J0cyA9IGZhY3Rvcnk7XG4gICAgfSBlbHNlIHtcbiAgICAgICAgLy8gQnJvd3NlciBnbG9iYWxzXG4gICAgICAgIGZhY3RvcnkoalF1ZXJ5KTtcbiAgICB9XG59KGZ1bmN0aW9uICgkKSB7XG5cbiAgICB2YXIgdG9GaXggID0gWyd3aGVlbCcsICdtb3VzZXdoZWVsJywgJ0RPTU1vdXNlU2Nyb2xsJywgJ01vek1vdXNlUGl4ZWxTY3JvbGwnXSxcbiAgICAgICAgdG9CaW5kID0gKCAnb253aGVlbCcgaW4gZG9jdW1lbnQgfHwgZG9jdW1lbnQuZG9jdW1lbnRNb2RlID49IDkgKSA/XG4gICAgICAgICAgICAgICAgICAgIFsnd2hlZWwnXSA6IFsnbW91c2V3aGVlbCcsICdEb21Nb3VzZVNjcm9sbCcsICdNb3pNb3VzZVBpeGVsU2Nyb2xsJ10sXG4gICAgICAgIHNsaWNlICA9IEFycmF5LnByb3RvdHlwZS5zbGljZSxcbiAgICAgICAgbnVsbExvd2VzdERlbHRhVGltZW91dCwgbG93ZXN0RGVsdGE7XG5cbiAgICBpZiAoICQuZXZlbnQuZml4SG9va3MgKSB7XG4gICAgICAgIGZvciAoIHZhciBpID0gdG9GaXgubGVuZ3RoOyBpOyApIHtcbiAgICAgICAgICAgICQuZXZlbnQuZml4SG9va3NbIHRvRml4Wy0taV0gXSA9ICQuZXZlbnQubW91c2VIb29rcztcbiAgICAgICAgfVxuICAgIH1cblxuICAgIHZhciBzcGVjaWFsID0gJC5ldmVudC5zcGVjaWFsLm1vdXNld2hlZWwgPSB7XG4gICAgICAgIHZlcnNpb246ICczLjEuMTInLFxuXG4gICAgICAgIHNldHVwOiBmdW5jdGlvbigpIHtcbiAgICAgICAgICAgIGlmICggdGhpcy5hZGRFdmVudExpc3RlbmVyICkge1xuICAgICAgICAgICAgICAgIGZvciAoIHZhciBpID0gdG9CaW5kLmxlbmd0aDsgaTsgKSB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuYWRkRXZlbnRMaXN0ZW5lciggdG9CaW5kWy0taV0sIGhhbmRsZXIsIGZhbHNlICk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICB0aGlzLm9ubW91c2V3aGVlbCA9IGhhbmRsZXI7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICAvLyBTdG9yZSB0aGUgbGluZSBoZWlnaHQgYW5kIHBhZ2UgaGVpZ2h0IGZvciB0aGlzIHBhcnRpY3VsYXIgZWxlbWVudFxuICAgICAgICAgICAgJC5kYXRhKHRoaXMsICdtb3VzZXdoZWVsLWxpbmUtaGVpZ2h0Jywgc3BlY2lhbC5nZXRMaW5lSGVpZ2h0KHRoaXMpKTtcbiAgICAgICAgICAgICQuZGF0YSh0aGlzLCAnbW91c2V3aGVlbC1wYWdlLWhlaWdodCcsIHNwZWNpYWwuZ2V0UGFnZUhlaWdodCh0aGlzKSk7XG4gICAgICAgIH0sXG5cbiAgICAgICAgdGVhcmRvd246IGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgaWYgKCB0aGlzLnJlbW92ZUV2ZW50TGlzdGVuZXIgKSB7XG4gICAgICAgICAgICAgICAgZm9yICggdmFyIGkgPSB0b0JpbmQubGVuZ3RoOyBpOyApIHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5yZW1vdmVFdmVudExpc3RlbmVyKCB0b0JpbmRbLS1pXSwgaGFuZGxlciwgZmFsc2UgKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIHRoaXMub25tb3VzZXdoZWVsID0gbnVsbDtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIC8vIENsZWFuIHVwIHRoZSBkYXRhIHdlIGFkZGVkIHRvIHRoZSBlbGVtZW50XG4gICAgICAgICAgICAkLnJlbW92ZURhdGEodGhpcywgJ21vdXNld2hlZWwtbGluZS1oZWlnaHQnKTtcbiAgICAgICAgICAgICQucmVtb3ZlRGF0YSh0aGlzLCAnbW91c2V3aGVlbC1wYWdlLWhlaWdodCcpO1xuICAgICAgICB9LFxuXG4gICAgICAgIGdldExpbmVIZWlnaHQ6IGZ1bmN0aW9uKGVsZW0pIHtcbiAgICAgICAgICAgIHZhciAkZWxlbSA9ICQoZWxlbSksXG4gICAgICAgICAgICAgICAgJHBhcmVudCA9ICRlbGVtWydvZmZzZXRQYXJlbnQnIGluICQuZm4gPyAnb2Zmc2V0UGFyZW50JyA6ICdwYXJlbnQnXSgpO1xuICAgICAgICAgICAgaWYgKCEkcGFyZW50Lmxlbmd0aCkge1xuICAgICAgICAgICAgICAgICRwYXJlbnQgPSAkKCdib2R5Jyk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICByZXR1cm4gcGFyc2VJbnQoJHBhcmVudC5jc3MoJ2ZvbnRTaXplJyksIDEwKSB8fCBwYXJzZUludCgkZWxlbS5jc3MoJ2ZvbnRTaXplJyksIDEwKSB8fCAxNjtcbiAgICAgICAgfSxcblxuICAgICAgICBnZXRQYWdlSGVpZ2h0OiBmdW5jdGlvbihlbGVtKSB7XG4gICAgICAgICAgICByZXR1cm4gJChlbGVtKS5oZWlnaHQoKTtcbiAgICAgICAgfSxcblxuICAgICAgICBzZXR0aW5nczoge1xuICAgICAgICAgICAgYWRqdXN0T2xkRGVsdGFzOiB0cnVlLCAvLyBzZWUgc2hvdWxkQWRqdXN0T2xkRGVsdGFzKCkgYmVsb3dcbiAgICAgICAgICAgIG5vcm1hbGl6ZU9mZnNldDogdHJ1ZSAgLy8gY2FsbHMgZ2V0Qm91bmRpbmdDbGllbnRSZWN0IGZvciBlYWNoIGV2ZW50XG4gICAgICAgIH1cbiAgICB9O1xuXG4gICAgJC5mbi5leHRlbmQoe1xuICAgICAgICBtb3VzZXdoZWVsOiBmdW5jdGlvbihmbikge1xuICAgICAgICAgICAgcmV0dXJuIGZuID8gdGhpcy5iaW5kKCdtb3VzZXdoZWVsJywgZm4pIDogdGhpcy50cmlnZ2VyKCdtb3VzZXdoZWVsJyk7XG4gICAgICAgIH0sXG5cbiAgICAgICAgdW5tb3VzZXdoZWVsOiBmdW5jdGlvbihmbikge1xuICAgICAgICAgICAgcmV0dXJuIHRoaXMudW5iaW5kKCdtb3VzZXdoZWVsJywgZm4pO1xuICAgICAgICB9XG4gICAgfSk7XG5cblxuICAgIGZ1bmN0aW9uIGhhbmRsZXIoZXZlbnQpIHtcbiAgICAgICAgdmFyIG9yZ0V2ZW50ICAgPSBldmVudCB8fCB3aW5kb3cuZXZlbnQsXG4gICAgICAgICAgICBhcmdzICAgICAgID0gc2xpY2UuY2FsbChhcmd1bWVudHMsIDEpLFxuICAgICAgICAgICAgZGVsdGEgICAgICA9IDAsXG4gICAgICAgICAgICBkZWx0YVggICAgID0gMCxcbiAgICAgICAgICAgIGRlbHRhWSAgICAgPSAwLFxuICAgICAgICAgICAgYWJzRGVsdGEgICA9IDAsXG4gICAgICAgICAgICBvZmZzZXRYICAgID0gMCxcbiAgICAgICAgICAgIG9mZnNldFkgICAgPSAwO1xuICAgICAgICBldmVudCA9ICQuZXZlbnQuZml4KG9yZ0V2ZW50KTtcbiAgICAgICAgZXZlbnQudHlwZSA9ICdtb3VzZXdoZWVsJztcblxuICAgICAgICAvLyBPbGQgc2Nob29sIHNjcm9sbHdoZWVsIGRlbHRhXG4gICAgICAgIGlmICggJ2RldGFpbCcgICAgICBpbiBvcmdFdmVudCApIHsgZGVsdGFZID0gb3JnRXZlbnQuZGV0YWlsICogLTE7ICAgICAgfVxuICAgICAgICBpZiAoICd3aGVlbERlbHRhJyAgaW4gb3JnRXZlbnQgKSB7IGRlbHRhWSA9IG9yZ0V2ZW50LndoZWVsRGVsdGE7ICAgICAgIH1cbiAgICAgICAgaWYgKCAnd2hlZWxEZWx0YVknIGluIG9yZ0V2ZW50ICkgeyBkZWx0YVkgPSBvcmdFdmVudC53aGVlbERlbHRhWTsgICAgICB9XG4gICAgICAgIGlmICggJ3doZWVsRGVsdGFYJyBpbiBvcmdFdmVudCApIHsgZGVsdGFYID0gb3JnRXZlbnQud2hlZWxEZWx0YVggKiAtMTsgfVxuXG4gICAgICAgIC8vIEZpcmVmb3ggPCAxNyBob3Jpem9udGFsIHNjcm9sbGluZyByZWxhdGVkIHRvIERPTU1vdXNlU2Nyb2xsIGV2ZW50XG4gICAgICAgIGlmICggJ2F4aXMnIGluIG9yZ0V2ZW50ICYmIG9yZ0V2ZW50LmF4aXMgPT09IG9yZ0V2ZW50LkhPUklaT05UQUxfQVhJUyApIHtcbiAgICAgICAgICAgIGRlbHRhWCA9IGRlbHRhWSAqIC0xO1xuICAgICAgICAgICAgZGVsdGFZID0gMDtcbiAgICAgICAgfVxuXG4gICAgICAgIC8vIFNldCBkZWx0YSB0byBiZSBkZWx0YVkgb3IgZGVsdGFYIGlmIGRlbHRhWSBpcyAwIGZvciBiYWNrd2FyZHMgY29tcGF0YWJpbGl0aXlcbiAgICAgICAgZGVsdGEgPSBkZWx0YVkgPT09IDAgPyBkZWx0YVggOiBkZWx0YVk7XG5cbiAgICAgICAgLy8gTmV3IHNjaG9vbCB3aGVlbCBkZWx0YSAod2hlZWwgZXZlbnQpXG4gICAgICAgIGlmICggJ2RlbHRhWScgaW4gb3JnRXZlbnQgKSB7XG4gICAgICAgICAgICBkZWx0YVkgPSBvcmdFdmVudC5kZWx0YVkgKiAtMTtcbiAgICAgICAgICAgIGRlbHRhICA9IGRlbHRhWTtcbiAgICAgICAgfVxuICAgICAgICBpZiAoICdkZWx0YVgnIGluIG9yZ0V2ZW50ICkge1xuICAgICAgICAgICAgZGVsdGFYID0gb3JnRXZlbnQuZGVsdGFYO1xuICAgICAgICAgICAgaWYgKCBkZWx0YVkgPT09IDAgKSB7IGRlbHRhICA9IGRlbHRhWCAqIC0xOyB9XG4gICAgICAgIH1cblxuICAgICAgICAvLyBObyBjaGFuZ2UgYWN0dWFsbHkgaGFwcGVuZWQsIG5vIHJlYXNvbiB0byBnbyBhbnkgZnVydGhlclxuICAgICAgICBpZiAoIGRlbHRhWSA9PT0gMCAmJiBkZWx0YVggPT09IDAgKSB7IHJldHVybjsgfVxuXG4gICAgICAgIC8vIE5lZWQgdG8gY29udmVydCBsaW5lcyBhbmQgcGFnZXMgdG8gcGl4ZWxzIGlmIHdlIGFyZW4ndCBhbHJlYWR5IGluIHBpeGVsc1xuICAgICAgICAvLyBUaGVyZSBhcmUgdGhyZWUgZGVsdGEgbW9kZXM6XG4gICAgICAgIC8vICAgKiBkZWx0YU1vZGUgMCBpcyBieSBwaXhlbHMsIG5vdGhpbmcgdG8gZG9cbiAgICAgICAgLy8gICAqIGRlbHRhTW9kZSAxIGlzIGJ5IGxpbmVzXG4gICAgICAgIC8vICAgKiBkZWx0YU1vZGUgMiBpcyBieSBwYWdlc1xuICAgICAgICBpZiAoIG9yZ0V2ZW50LmRlbHRhTW9kZSA9PT0gMSApIHtcbiAgICAgICAgICAgIHZhciBsaW5lSGVpZ2h0ID0gJC5kYXRhKHRoaXMsICdtb3VzZXdoZWVsLWxpbmUtaGVpZ2h0Jyk7XG4gICAgICAgICAgICBkZWx0YSAgKj0gbGluZUhlaWdodDtcbiAgICAgICAgICAgIGRlbHRhWSAqPSBsaW5lSGVpZ2h0O1xuICAgICAgICAgICAgZGVsdGFYICo9IGxpbmVIZWlnaHQ7XG4gICAgICAgIH0gZWxzZSBpZiAoIG9yZ0V2ZW50LmRlbHRhTW9kZSA9PT0gMiApIHtcbiAgICAgICAgICAgIHZhciBwYWdlSGVpZ2h0ID0gJC5kYXRhKHRoaXMsICdtb3VzZXdoZWVsLXBhZ2UtaGVpZ2h0Jyk7XG4gICAgICAgICAgICBkZWx0YSAgKj0gcGFnZUhlaWdodDtcbiAgICAgICAgICAgIGRlbHRhWSAqPSBwYWdlSGVpZ2h0O1xuICAgICAgICAgICAgZGVsdGFYICo9IHBhZ2VIZWlnaHQ7XG4gICAgICAgIH1cblxuICAgICAgICAvLyBTdG9yZSBsb3dlc3QgYWJzb2x1dGUgZGVsdGEgdG8gbm9ybWFsaXplIHRoZSBkZWx0YSB2YWx1ZXNcbiAgICAgICAgYWJzRGVsdGEgPSBNYXRoLm1heCggTWF0aC5hYnMoZGVsdGFZKSwgTWF0aC5hYnMoZGVsdGFYKSApO1xuXG4gICAgICAgIGlmICggIWxvd2VzdERlbHRhIHx8IGFic0RlbHRhIDwgbG93ZXN0RGVsdGEgKSB7XG4gICAgICAgICAgICBsb3dlc3REZWx0YSA9IGFic0RlbHRhO1xuXG4gICAgICAgICAgICAvLyBBZGp1c3Qgb2xkZXIgZGVsdGFzIGlmIG5lY2Vzc2FyeVxuICAgICAgICAgICAgaWYgKCBzaG91bGRBZGp1c3RPbGREZWx0YXMob3JnRXZlbnQsIGFic0RlbHRhKSApIHtcbiAgICAgICAgICAgICAgICBsb3dlc3REZWx0YSAvPSA0MDtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgIC8vIEFkanVzdCBvbGRlciBkZWx0YXMgaWYgbmVjZXNzYXJ5XG4gICAgICAgIGlmICggc2hvdWxkQWRqdXN0T2xkRGVsdGFzKG9yZ0V2ZW50LCBhYnNEZWx0YSkgKSB7XG4gICAgICAgICAgICAvLyBEaXZpZGUgYWxsIHRoZSB0aGluZ3MgYnkgNDAhXG4gICAgICAgICAgICBkZWx0YSAgLz0gNDA7XG4gICAgICAgICAgICBkZWx0YVggLz0gNDA7XG4gICAgICAgICAgICBkZWx0YVkgLz0gNDA7XG4gICAgICAgIH1cblxuICAgICAgICAvLyBHZXQgYSB3aG9sZSwgbm9ybWFsaXplZCB2YWx1ZSBmb3IgdGhlIGRlbHRhc1xuICAgICAgICBkZWx0YSAgPSBNYXRoWyBkZWx0YSAgPj0gMSA/ICdmbG9vcicgOiAnY2VpbCcgXShkZWx0YSAgLyBsb3dlc3REZWx0YSk7XG4gICAgICAgIGRlbHRhWCA9IE1hdGhbIGRlbHRhWCA+PSAxID8gJ2Zsb29yJyA6ICdjZWlsJyBdKGRlbHRhWCAvIGxvd2VzdERlbHRhKTtcbiAgICAgICAgZGVsdGFZID0gTWF0aFsgZGVsdGFZID49IDEgPyAnZmxvb3InIDogJ2NlaWwnIF0oZGVsdGFZIC8gbG93ZXN0RGVsdGEpO1xuXG4gICAgICAgIC8vIE5vcm1hbGlzZSBvZmZzZXRYIGFuZCBvZmZzZXRZIHByb3BlcnRpZXNcbiAgICAgICAgaWYgKCBzcGVjaWFsLnNldHRpbmdzLm5vcm1hbGl6ZU9mZnNldCAmJiB0aGlzLmdldEJvdW5kaW5nQ2xpZW50UmVjdCApIHtcbiAgICAgICAgICAgIHZhciBib3VuZGluZ1JlY3QgPSB0aGlzLmdldEJvdW5kaW5nQ2xpZW50UmVjdCgpO1xuICAgICAgICAgICAgb2Zmc2V0WCA9IGV2ZW50LmNsaWVudFggLSBib3VuZGluZ1JlY3QubGVmdDtcbiAgICAgICAgICAgIG9mZnNldFkgPSBldmVudC5jbGllbnRZIC0gYm91bmRpbmdSZWN0LnRvcDtcbiAgICAgICAgfVxuXG4gICAgICAgIC8vIEFkZCBpbmZvcm1hdGlvbiB0byB0aGUgZXZlbnQgb2JqZWN0XG4gICAgICAgIGV2ZW50LmRlbHRhWCA9IGRlbHRhWDtcbiAgICAgICAgZXZlbnQuZGVsdGFZID0gZGVsdGFZO1xuICAgICAgICBldmVudC5kZWx0YUZhY3RvciA9IGxvd2VzdERlbHRhO1xuICAgICAgICBldmVudC5vZmZzZXRYID0gb2Zmc2V0WDtcbiAgICAgICAgZXZlbnQub2Zmc2V0WSA9IG9mZnNldFk7XG4gICAgICAgIC8vIEdvIGFoZWFkIGFuZCBzZXQgZGVsdGFNb2RlIHRvIDAgc2luY2Ugd2UgY29udmVydGVkIHRvIHBpeGVsc1xuICAgICAgICAvLyBBbHRob3VnaCB0aGlzIGlzIGEgbGl0dGxlIG9kZCBzaW5jZSB3ZSBvdmVyd3JpdGUgdGhlIGRlbHRhWC9ZXG4gICAgICAgIC8vIHByb3BlcnRpZXMgd2l0aCBub3JtYWxpemVkIGRlbHRhcy5cbiAgICAgICAgZXZlbnQuZGVsdGFNb2RlID0gMDtcblxuICAgICAgICAvLyBBZGQgZXZlbnQgYW5kIGRlbHRhIHRvIHRoZSBmcm9udCBvZiB0aGUgYXJndW1lbnRzXG4gICAgICAgIGFyZ3MudW5zaGlmdChldmVudCwgZGVsdGEsIGRlbHRhWCwgZGVsdGFZKTtcblxuICAgICAgICAvLyBDbGVhcm91dCBsb3dlc3REZWx0YSBhZnRlciBzb21ldGltZSB0byBiZXR0ZXJcbiAgICAgICAgLy8gaGFuZGxlIG11bHRpcGxlIGRldmljZSB0eXBlcyB0aGF0IGdpdmUgZGlmZmVyZW50XG4gICAgICAgIC8vIGEgZGlmZmVyZW50IGxvd2VzdERlbHRhXG4gICAgICAgIC8vIEV4OiB0cmFja3BhZCA9IDMgYW5kIG1vdXNlIHdoZWVsID0gMTIwXG4gICAgICAgIGlmIChudWxsTG93ZXN0RGVsdGFUaW1lb3V0KSB7IGNsZWFyVGltZW91dChudWxsTG93ZXN0RGVsdGFUaW1lb3V0KTsgfVxuICAgICAgICBudWxsTG93ZXN0RGVsdGFUaW1lb3V0ID0gc2V0VGltZW91dChudWxsTG93ZXN0RGVsdGEsIDIwMCk7XG5cbiAgICAgICAgcmV0dXJuICgkLmV2ZW50LmRpc3BhdGNoIHx8ICQuZXZlbnQuaGFuZGxlKS5hcHBseSh0aGlzLCBhcmdzKTtcbiAgICB9XG5cbiAgICBmdW5jdGlvbiBudWxsTG93ZXN0RGVsdGEoKSB7XG4gICAgICAgIGxvd2VzdERlbHRhID0gbnVsbDtcbiAgICB9XG5cbiAgICBmdW5jdGlvbiBzaG91bGRBZGp1c3RPbGREZWx0YXMob3JnRXZlbnQsIGFic0RlbHRhKSB7XG4gICAgICAgIC8vIElmIHRoaXMgaXMgYW4gb2xkZXIgZXZlbnQgYW5kIHRoZSBkZWx0YSBpcyBkaXZpc2FibGUgYnkgMTIwLFxuICAgICAgICAvLyB0aGVuIHdlIGFyZSBhc3N1bWluZyB0aGF0IHRoZSBicm93c2VyIGlzIHRyZWF0aW5nIHRoaXMgYXMgYW5cbiAgICAgICAgLy8gb2xkZXIgbW91c2Ugd2hlZWwgZXZlbnQgYW5kIHRoYXQgd2Ugc2hvdWxkIGRpdmlkZSB0aGUgZGVsdGFzXG4gICAgICAgIC8vIGJ5IDQwIHRvIHRyeSBhbmQgZ2V0IGEgbW9yZSB1c2FibGUgZGVsdGFGYWN0b3IuXG4gICAgICAgIC8vIFNpZGUgbm90ZSwgdGhpcyBhY3R1YWxseSBpbXBhY3RzIHRoZSByZXBvcnRlZCBzY3JvbGwgZGlzdGFuY2VcbiAgICAgICAgLy8gaW4gb2xkZXIgYnJvd3NlcnMgYW5kIGNhbiBjYXVzZSBzY3JvbGxpbmcgdG8gYmUgc2xvd2VyIHRoYW4gbmF0aXZlLlxuICAgICAgICAvLyBUdXJuIHRoaXMgb2ZmIGJ5IHNldHRpbmcgJC5ldmVudC5zcGVjaWFsLm1vdXNld2hlZWwuc2V0dGluZ3MuYWRqdXN0T2xkRGVsdGFzIHRvIGZhbHNlLlxuICAgICAgICByZXR1cm4gc3BlY2lhbC5zZXR0aW5ncy5hZGp1c3RPbGREZWx0YXMgJiYgb3JnRXZlbnQudHlwZSA9PT0gJ21vdXNld2hlZWwnICYmIGFic0RlbHRhICUgMTIwID09PSAwO1xuICAgIH1cblxufSkpO1xuIiwiLyohXG4gKiBqUXVlcnkgTW91c2V3aGVlbCAzLjEuMTNcbiAqXG4gKiBDb3B5cmlnaHQgalF1ZXJ5IEZvdW5kYXRpb24gYW5kIG90aGVyIGNvbnRyaWJ1dG9yc1xuICogUmVsZWFzZWQgdW5kZXIgdGhlIE1JVCBsaWNlbnNlXG4gKiBodHRwOi8vanF1ZXJ5Lm9yZy9saWNlbnNlXG4gKi9cblxuKGZ1bmN0aW9uIChmYWN0b3J5KSB7XG4gICAgaWYgKCB0eXBlb2YgZGVmaW5lID09PSAnZnVuY3Rpb24nICYmIGRlZmluZS5hbWQgKSB7XG4gICAgICAgIC8vIEFNRC4gUmVnaXN0ZXIgYXMgYW4gYW5vbnltb3VzIG1vZHVsZS5cbiAgICAgICAgZGVmaW5lKFsnanF1ZXJ5J10sIGZhY3RvcnkpO1xuICAgIH0gZWxzZSBpZiAodHlwZW9mIGV4cG9ydHMgPT09ICdvYmplY3QnKSB7XG4gICAgICAgIC8vIE5vZGUvQ29tbW9uSlMgc3R5bGUgZm9yIEJyb3dzZXJpZnlcbiAgICAgICAgbW9kdWxlLmV4cG9ydHMgPSBmYWN0b3J5O1xuICAgIH0gZWxzZSB7XG4gICAgICAgIC8vIEJyb3dzZXIgZ2xvYmFsc1xuICAgICAgICBmYWN0b3J5KGpRdWVyeSk7XG4gICAgfVxufShmdW5jdGlvbiAoJCkge1xuXG4gICAgdmFyIHRvRml4ICA9IFsnd2hlZWwnLCAnbW91c2V3aGVlbCcsICdET01Nb3VzZVNjcm9sbCcsICdNb3pNb3VzZVBpeGVsU2Nyb2xsJ10sXG4gICAgICAgIHRvQmluZCA9ICggJ29ud2hlZWwnIGluIGRvY3VtZW50IHx8IGRvY3VtZW50LmRvY3VtZW50TW9kZSA+PSA5ICkgP1xuICAgICAgICAgICAgICAgICAgICBbJ3doZWVsJ10gOiBbJ21vdXNld2hlZWwnLCAnRG9tTW91c2VTY3JvbGwnLCAnTW96TW91c2VQaXhlbFNjcm9sbCddLFxuICAgICAgICBzbGljZSAgPSBBcnJheS5wcm90b3R5cGUuc2xpY2UsXG4gICAgICAgIG51bGxMb3dlc3REZWx0YVRpbWVvdXQsIGxvd2VzdERlbHRhO1xuXG4gICAgaWYgKCAkLmV2ZW50LmZpeEhvb2tzICkge1xuICAgICAgICBmb3IgKCB2YXIgaSA9IHRvRml4Lmxlbmd0aDsgaTsgKSB7XG4gICAgICAgICAgICAkLmV2ZW50LmZpeEhvb2tzWyB0b0ZpeFstLWldIF0gPSAkLmV2ZW50Lm1vdXNlSG9va3M7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICB2YXIgc3BlY2lhbCA9ICQuZXZlbnQuc3BlY2lhbC5tb3VzZXdoZWVsID0ge1xuICAgICAgICB2ZXJzaW9uOiAnMy4xLjEyJyxcblxuICAgICAgICBzZXR1cDogZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICBpZiAoIHRoaXMuYWRkRXZlbnRMaXN0ZW5lciApIHtcbiAgICAgICAgICAgICAgICBmb3IgKCB2YXIgaSA9IHRvQmluZC5sZW5ndGg7IGk7ICkge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLmFkZEV2ZW50TGlzdGVuZXIoIHRvQmluZFstLWldLCBoYW5kbGVyLCBmYWxzZSApO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgdGhpcy5vbm1vdXNld2hlZWwgPSBoYW5kbGVyO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgLy8gU3RvcmUgdGhlIGxpbmUgaGVpZ2h0IGFuZCBwYWdlIGhlaWdodCBmb3IgdGhpcyBwYXJ0aWN1bGFyIGVsZW1lbnRcbiAgICAgICAgICAgICQuZGF0YSh0aGlzLCAnbW91c2V3aGVlbC1saW5lLWhlaWdodCcsIHNwZWNpYWwuZ2V0TGluZUhlaWdodCh0aGlzKSk7XG4gICAgICAgICAgICAkLmRhdGEodGhpcywgJ21vdXNld2hlZWwtcGFnZS1oZWlnaHQnLCBzcGVjaWFsLmdldFBhZ2VIZWlnaHQodGhpcykpO1xuICAgICAgICB9LFxuXG4gICAgICAgIHRlYXJkb3duOiBmdW5jdGlvbigpIHtcbiAgICAgICAgICAgIGlmICggdGhpcy5yZW1vdmVFdmVudExpc3RlbmVyICkge1xuICAgICAgICAgICAgICAgIGZvciAoIHZhciBpID0gdG9CaW5kLmxlbmd0aDsgaTsgKSB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMucmVtb3ZlRXZlbnRMaXN0ZW5lciggdG9CaW5kWy0taV0sIGhhbmRsZXIsIGZhbHNlICk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICB0aGlzLm9ubW91c2V3aGVlbCA9IG51bGw7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICAvLyBDbGVhbiB1cCB0aGUgZGF0YSB3ZSBhZGRlZCB0byB0aGUgZWxlbWVudFxuICAgICAgICAgICAgJC5yZW1vdmVEYXRhKHRoaXMsICdtb3VzZXdoZWVsLWxpbmUtaGVpZ2h0Jyk7XG4gICAgICAgICAgICAkLnJlbW92ZURhdGEodGhpcywgJ21vdXNld2hlZWwtcGFnZS1oZWlnaHQnKTtcbiAgICAgICAgfSxcblxuICAgICAgICBnZXRMaW5lSGVpZ2h0OiBmdW5jdGlvbihlbGVtKSB7XG4gICAgICAgICAgICB2YXIgJGVsZW0gPSAkKGVsZW0pLFxuICAgICAgICAgICAgICAgICRwYXJlbnQgPSAkZWxlbVsnb2Zmc2V0UGFyZW50JyBpbiAkLmZuID8gJ29mZnNldFBhcmVudCcgOiAncGFyZW50J10oKTtcbiAgICAgICAgICAgIGlmICghJHBhcmVudC5sZW5ndGgpIHtcbiAgICAgICAgICAgICAgICAkcGFyZW50ID0gJCgnYm9keScpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgcmV0dXJuIHBhcnNlSW50KCRwYXJlbnQuY3NzKCdmb250U2l6ZScpLCAxMCkgfHwgcGFyc2VJbnQoJGVsZW0uY3NzKCdmb250U2l6ZScpLCAxMCkgfHwgMTY7XG4gICAgICAgIH0sXG5cbiAgICAgICAgZ2V0UGFnZUhlaWdodDogZnVuY3Rpb24oZWxlbSkge1xuICAgICAgICAgICAgcmV0dXJuICQoZWxlbSkuaGVpZ2h0KCk7XG4gICAgICAgIH0sXG5cbiAgICAgICAgc2V0dGluZ3M6IHtcbiAgICAgICAgICAgIGFkanVzdE9sZERlbHRhczogdHJ1ZSwgLy8gc2VlIHNob3VsZEFkanVzdE9sZERlbHRhcygpIGJlbG93XG4gICAgICAgICAgICBub3JtYWxpemVPZmZzZXQ6IHRydWUgIC8vIGNhbGxzIGdldEJvdW5kaW5nQ2xpZW50UmVjdCBmb3IgZWFjaCBldmVudFxuICAgICAgICB9XG4gICAgfTtcblxuICAgICQuZm4uZXh0ZW5kKHtcbiAgICAgICAgbW91c2V3aGVlbDogZnVuY3Rpb24oZm4pIHtcbiAgICAgICAgICAgIHJldHVybiBmbiA/IHRoaXMuYmluZCgnbW91c2V3aGVlbCcsIGZuKSA6IHRoaXMudHJpZ2dlcignbW91c2V3aGVlbCcpO1xuICAgICAgICB9LFxuXG4gICAgICAgIHVubW91c2V3aGVlbDogZnVuY3Rpb24oZm4pIHtcbiAgICAgICAgICAgIHJldHVybiB0aGlzLnVuYmluZCgnbW91c2V3aGVlbCcsIGZuKTtcbiAgICAgICAgfVxuICAgIH0pO1xuXG5cbiAgICBmdW5jdGlvbiBoYW5kbGVyKGV2ZW50KSB7XG4gICAgICAgIHZhciBvcmdFdmVudCAgID0gZXZlbnQgfHwgd2luZG93LmV2ZW50LFxuICAgICAgICAgICAgYXJncyAgICAgICA9IHNsaWNlLmNhbGwoYXJndW1lbnRzLCAxKSxcbiAgICAgICAgICAgIGRlbHRhICAgICAgPSAwLFxuICAgICAgICAgICAgZGVsdGFYICAgICA9IDAsXG4gICAgICAgICAgICBkZWx0YVkgICAgID0gMCxcbiAgICAgICAgICAgIGFic0RlbHRhICAgPSAwLFxuICAgICAgICAgICAgb2Zmc2V0WCAgICA9IDAsXG4gICAgICAgICAgICBvZmZzZXRZICAgID0gMDtcbiAgICAgICAgZXZlbnQgPSAkLmV2ZW50LmZpeChvcmdFdmVudCk7XG4gICAgICAgIGV2ZW50LnR5cGUgPSAnbW91c2V3aGVlbCc7XG5cbiAgICAgICAgLy8gT2xkIHNjaG9vbCBzY3JvbGx3aGVlbCBkZWx0YVxuICAgICAgICBpZiAoICdkZXRhaWwnICAgICAgaW4gb3JnRXZlbnQgKSB7IGRlbHRhWSA9IG9yZ0V2ZW50LmRldGFpbCAqIC0xOyAgICAgIH1cbiAgICAgICAgaWYgKCAnd2hlZWxEZWx0YScgIGluIG9yZ0V2ZW50ICkgeyBkZWx0YVkgPSBvcmdFdmVudC53aGVlbERlbHRhOyAgICAgICB9XG4gICAgICAgIGlmICggJ3doZWVsRGVsdGFZJyBpbiBvcmdFdmVudCApIHsgZGVsdGFZID0gb3JnRXZlbnQud2hlZWxEZWx0YVk7ICAgICAgfVxuICAgICAgICBpZiAoICd3aGVlbERlbHRhWCcgaW4gb3JnRXZlbnQgKSB7IGRlbHRhWCA9IG9yZ0V2ZW50LndoZWVsRGVsdGFYICogLTE7IH1cblxuICAgICAgICAvLyBGaXJlZm94IDwgMTcgaG9yaXpvbnRhbCBzY3JvbGxpbmcgcmVsYXRlZCB0byBET01Nb3VzZVNjcm9sbCBldmVudFxuICAgICAgICBpZiAoICdheGlzJyBpbiBvcmdFdmVudCAmJiBvcmdFdmVudC5heGlzID09PSBvcmdFdmVudC5IT1JJWk9OVEFMX0FYSVMgKSB7XG4gICAgICAgICAgICBkZWx0YVggPSBkZWx0YVkgKiAtMTtcbiAgICAgICAgICAgIGRlbHRhWSA9IDA7XG4gICAgICAgIH1cblxuICAgICAgICAvLyBTZXQgZGVsdGEgdG8gYmUgZGVsdGFZIG9yIGRlbHRhWCBpZiBkZWx0YVkgaXMgMCBmb3IgYmFja3dhcmRzIGNvbXBhdGFiaWxpdGl5XG4gICAgICAgIGRlbHRhID0gZGVsdGFZID09PSAwID8gZGVsdGFYIDogZGVsdGFZO1xuXG4gICAgICAgIC8vIE5ldyBzY2hvb2wgd2hlZWwgZGVsdGEgKHdoZWVsIGV2ZW50KVxuICAgICAgICBpZiAoICdkZWx0YVknIGluIG9yZ0V2ZW50ICkge1xuICAgICAgICAgICAgZGVsdGFZID0gb3JnRXZlbnQuZGVsdGFZICogLTE7XG4gICAgICAgICAgICBkZWx0YSAgPSBkZWx0YVk7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKCAnZGVsdGFYJyBpbiBvcmdFdmVudCApIHtcbiAgICAgICAgICAgIGRlbHRhWCA9IG9yZ0V2ZW50LmRlbHRhWDtcbiAgICAgICAgICAgIGlmICggZGVsdGFZID09PSAwICkgeyBkZWx0YSAgPSBkZWx0YVggKiAtMTsgfVxuICAgICAgICB9XG5cbiAgICAgICAgLy8gTm8gY2hhbmdlIGFjdHVhbGx5IGhhcHBlbmVkLCBubyByZWFzb24gdG8gZ28gYW55IGZ1cnRoZXJcbiAgICAgICAgaWYgKCBkZWx0YVkgPT09IDAgJiYgZGVsdGFYID09PSAwICkgeyByZXR1cm47IH1cblxuICAgICAgICAvLyBOZWVkIHRvIGNvbnZlcnQgbGluZXMgYW5kIHBhZ2VzIHRvIHBpeGVscyBpZiB3ZSBhcmVuJ3QgYWxyZWFkeSBpbiBwaXhlbHNcbiAgICAgICAgLy8gVGhlcmUgYXJlIHRocmVlIGRlbHRhIG1vZGVzOlxuICAgICAgICAvLyAgICogZGVsdGFNb2RlIDAgaXMgYnkgcGl4ZWxzLCBub3RoaW5nIHRvIGRvXG4gICAgICAgIC8vICAgKiBkZWx0YU1vZGUgMSBpcyBieSBsaW5lc1xuICAgICAgICAvLyAgICogZGVsdGFNb2RlIDIgaXMgYnkgcGFnZXNcbiAgICAgICAgaWYgKCBvcmdFdmVudC5kZWx0YU1vZGUgPT09IDEgKSB7XG4gICAgICAgICAgICB2YXIgbGluZUhlaWdodCA9ICQuZGF0YSh0aGlzLCAnbW91c2V3aGVlbC1saW5lLWhlaWdodCcpO1xuICAgICAgICAgICAgZGVsdGEgICo9IGxpbmVIZWlnaHQ7XG4gICAgICAgICAgICBkZWx0YVkgKj0gbGluZUhlaWdodDtcbiAgICAgICAgICAgIGRlbHRhWCAqPSBsaW5lSGVpZ2h0O1xuICAgICAgICB9IGVsc2UgaWYgKCBvcmdFdmVudC5kZWx0YU1vZGUgPT09IDIgKSB7XG4gICAgICAgICAgICB2YXIgcGFnZUhlaWdodCA9ICQuZGF0YSh0aGlzLCAnbW91c2V3aGVlbC1wYWdlLWhlaWdodCcpO1xuICAgICAgICAgICAgZGVsdGEgICo9IHBhZ2VIZWlnaHQ7XG4gICAgICAgICAgICBkZWx0YVkgKj0gcGFnZUhlaWdodDtcbiAgICAgICAgICAgIGRlbHRhWCAqPSBwYWdlSGVpZ2h0O1xuICAgICAgICB9XG5cbiAgICAgICAgLy8gU3RvcmUgbG93ZXN0IGFic29sdXRlIGRlbHRhIHRvIG5vcm1hbGl6ZSB0aGUgZGVsdGEgdmFsdWVzXG4gICAgICAgIGFic0RlbHRhID0gTWF0aC5tYXgoIE1hdGguYWJzKGRlbHRhWSksIE1hdGguYWJzKGRlbHRhWCkgKTtcblxuICAgICAgICBpZiAoICFsb3dlc3REZWx0YSB8fCBhYnNEZWx0YSA8IGxvd2VzdERlbHRhICkge1xuICAgICAgICAgICAgbG93ZXN0RGVsdGEgPSBhYnNEZWx0YTtcblxuICAgICAgICAgICAgLy8gQWRqdXN0IG9sZGVyIGRlbHRhcyBpZiBuZWNlc3NhcnlcbiAgICAgICAgICAgIGlmICggc2hvdWxkQWRqdXN0T2xkRGVsdGFzKG9yZ0V2ZW50LCBhYnNEZWx0YSkgKSB7XG4gICAgICAgICAgICAgICAgbG93ZXN0RGVsdGEgLz0gNDA7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICAvLyBBZGp1c3Qgb2xkZXIgZGVsdGFzIGlmIG5lY2Vzc2FyeVxuICAgICAgICBpZiAoIHNob3VsZEFkanVzdE9sZERlbHRhcyhvcmdFdmVudCwgYWJzRGVsdGEpICkge1xuICAgICAgICAgICAgLy8gRGl2aWRlIGFsbCB0aGUgdGhpbmdzIGJ5IDQwIVxuICAgICAgICAgICAgZGVsdGEgIC89IDQwO1xuICAgICAgICAgICAgZGVsdGFYIC89IDQwO1xuICAgICAgICAgICAgZGVsdGFZIC89IDQwO1xuICAgICAgICB9XG5cbiAgICAgICAgLy8gR2V0IGEgd2hvbGUsIG5vcm1hbGl6ZWQgdmFsdWUgZm9yIHRoZSBkZWx0YXNcbiAgICAgICAgZGVsdGEgID0gTWF0aFsgZGVsdGEgID49IDEgPyAnZmxvb3InIDogJ2NlaWwnIF0oZGVsdGEgIC8gbG93ZXN0RGVsdGEpO1xuICAgICAgICBkZWx0YVggPSBNYXRoWyBkZWx0YVggPj0gMSA/ICdmbG9vcicgOiAnY2VpbCcgXShkZWx0YVggLyBsb3dlc3REZWx0YSk7XG4gICAgICAgIGRlbHRhWSA9IE1hdGhbIGRlbHRhWSA+PSAxID8gJ2Zsb29yJyA6ICdjZWlsJyBdKGRlbHRhWSAvIGxvd2VzdERlbHRhKTtcblxuICAgICAgICAvLyBOb3JtYWxpc2Ugb2Zmc2V0WCBhbmQgb2Zmc2V0WSBwcm9wZXJ0aWVzXG4gICAgICAgIGlmICggc3BlY2lhbC5zZXR0aW5ncy5ub3JtYWxpemVPZmZzZXQgJiYgdGhpcy5nZXRCb3VuZGluZ0NsaWVudFJlY3QgKSB7XG4gICAgICAgICAgICB2YXIgYm91bmRpbmdSZWN0ID0gdGhpcy5nZXRCb3VuZGluZ0NsaWVudFJlY3QoKTtcbiAgICAgICAgICAgIG9mZnNldFggPSBldmVudC5jbGllbnRYIC0gYm91bmRpbmdSZWN0LmxlZnQ7XG4gICAgICAgICAgICBvZmZzZXRZID0gZXZlbnQuY2xpZW50WSAtIGJvdW5kaW5nUmVjdC50b3A7XG4gICAgICAgIH1cblxuICAgICAgICAvLyBBZGQgaW5mb3JtYXRpb24gdG8gdGhlIGV2ZW50IG9iamVjdFxuICAgICAgICBldmVudC5kZWx0YVggPSBkZWx0YVg7XG4gICAgICAgIGV2ZW50LmRlbHRhWSA9IGRlbHRhWTtcbiAgICAgICAgZXZlbnQuZGVsdGFGYWN0b3IgPSBsb3dlc3REZWx0YTtcbiAgICAgICAgZXZlbnQub2Zmc2V0WCA9IG9mZnNldFg7XG4gICAgICAgIGV2ZW50Lm9mZnNldFkgPSBvZmZzZXRZO1xuICAgICAgICAvLyBHbyBhaGVhZCBhbmQgc2V0IGRlbHRhTW9kZSB0byAwIHNpbmNlIHdlIGNvbnZlcnRlZCB0byBwaXhlbHNcbiAgICAgICAgLy8gQWx0aG91Z2ggdGhpcyBpcyBhIGxpdHRsZSBvZGQgc2luY2Ugd2Ugb3ZlcndyaXRlIHRoZSBkZWx0YVgvWVxuICAgICAgICAvLyBwcm9wZXJ0aWVzIHdpdGggbm9ybWFsaXplZCBkZWx0YXMuXG4gICAgICAgIGV2ZW50LmRlbHRhTW9kZSA9IDA7XG5cbiAgICAgICAgLy8gQWRkIGV2ZW50IGFuZCBkZWx0YSB0byB0aGUgZnJvbnQgb2YgdGhlIGFyZ3VtZW50c1xuICAgICAgICBhcmdzLnVuc2hpZnQoZXZlbnQsIGRlbHRhLCBkZWx0YVgsIGRlbHRhWSk7XG5cbiAgICAgICAgLy8gQ2xlYXJvdXQgbG93ZXN0RGVsdGEgYWZ0ZXIgc29tZXRpbWUgdG8gYmV0dGVyXG4gICAgICAgIC8vIGhhbmRsZSBtdWx0aXBsZSBkZXZpY2UgdHlwZXMgdGhhdCBnaXZlIGRpZmZlcmVudFxuICAgICAgICAvLyBhIGRpZmZlcmVudCBsb3dlc3REZWx0YVxuICAgICAgICAvLyBFeDogdHJhY2twYWQgPSAzIGFuZCBtb3VzZSB3aGVlbCA9IDEyMFxuICAgICAgICBpZiAobnVsbExvd2VzdERlbHRhVGltZW91dCkgeyBjbGVhclRpbWVvdXQobnVsbExvd2VzdERlbHRhVGltZW91dCk7IH1cbiAgICAgICAgbnVsbExvd2VzdERlbHRhVGltZW91dCA9IHNldFRpbWVvdXQobnVsbExvd2VzdERlbHRhLCAyMDApO1xuXG4gICAgICAgIHJldHVybiAoJC5ldmVudC5kaXNwYXRjaCB8fCAkLmV2ZW50LmhhbmRsZSkuYXBwbHkodGhpcywgYXJncyk7XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gbnVsbExvd2VzdERlbHRhKCkge1xuICAgICAgICBsb3dlc3REZWx0YSA9IG51bGw7XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gc2hvdWxkQWRqdXN0T2xkRGVsdGFzKG9yZ0V2ZW50LCBhYnNEZWx0YSkge1xuICAgICAgICAvLyBJZiB0aGlzIGlzIGFuIG9sZGVyIGV2ZW50IGFuZCB0aGUgZGVsdGEgaXMgZGl2aXNhYmxlIGJ5IDEyMCxcbiAgICAgICAgLy8gdGhlbiB3ZSBhcmUgYXNzdW1pbmcgdGhhdCB0aGUgYnJvd3NlciBpcyB0cmVhdGluZyB0aGlzIGFzIGFuXG4gICAgICAgIC8vIG9sZGVyIG1vdXNlIHdoZWVsIGV2ZW50IGFuZCB0aGF0IHdlIHNob3VsZCBkaXZpZGUgdGhlIGRlbHRhc1xuICAgICAgICAvLyBieSA0MCB0byB0cnkgYW5kIGdldCBhIG1vcmUgdXNhYmxlIGRlbHRhRmFjdG9yLlxuICAgICAgICAvLyBTaWRlIG5vdGUsIHRoaXMgYWN0dWFsbHkgaW1wYWN0cyB0aGUgcmVwb3J0ZWQgc2Nyb2xsIGRpc3RhbmNlXG4gICAgICAgIC8vIGluIG9sZGVyIGJyb3dzZXJzIGFuZCBjYW4gY2F1c2Ugc2Nyb2xsaW5nIHRvIGJlIHNsb3dlciB0aGFuIG5hdGl2ZS5cbiAgICAgICAgLy8gVHVybiB0aGlzIG9mZiBieSBzZXR0aW5nICQuZXZlbnQuc3BlY2lhbC5tb3VzZXdoZWVsLnNldHRpbmdzLmFkanVzdE9sZERlbHRhcyB0byBmYWxzZS5cbiAgICAgICAgcmV0dXJuIHNwZWNpYWwuc2V0dGluZ3MuYWRqdXN0T2xkRGVsdGFzICYmIG9yZ0V2ZW50LnR5cGUgPT09ICdtb3VzZXdoZWVsJyAmJiBhYnNEZWx0YSAlIDEyMCA9PT0gMDtcbiAgICB9XG5cbn0pKTtcbiIsImltcG9ydCBDb21wb25lbnQgZnJvbSAnU2hvcFVpL21vZGVscy9jb21wb25lbnQnO1xuaW1wb3J0ICQgZnJvbSAnanF1ZXJ5L2Rpc3QvanF1ZXJ5JztcbmltcG9ydCAnanF1ZXJ5LWRhdGV0aW1lcGlja2VyL2J1aWxkL2pxdWVyeS5kYXRldGltZXBpY2tlci5mdWxsJztcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgRGF0ZVRpbWVQaWNrZXIgZXh0ZW5kcyBDb21wb25lbnQge1xuICAgIHByb3RlY3RlZCB0cmlnZ2VyOiBIVE1MSW5wdXRFbGVtZW50O1xuXG4gICAgcHJvdGVjdGVkIHJlYWR5Q2FsbGJhY2soKTogdm9pZCB7fVxuXG4gICAgcHJvdGVjdGVkIGluaXQoKTogdm9pZCB7XG4gICAgICAgIHRoaXMudHJpZ2dlciA9IDxIVE1MSW5wdXRFbGVtZW50PnRoaXMucXVlcnlTZWxlY3RvcignaW5wdXQnKTtcbiAgICAgICAgdGhpcy5tYXBFdmVudHMoKTtcbiAgICB9XG5cbiAgICBwcm90ZWN0ZWQgbWFwRXZlbnRzKCk6IHZvaWQge1xuICAgICAgICB0aGlzLmRhdGV0aW1lcGlja2VySW5pdCgpO1xuICAgICAgICB0aGlzLnNldExhbmd1YWdlKHRoaXMubGFuZ3VhZ2UpO1xuICAgIH1cblxuICAgIHByb3RlY3RlZCBkYXRldGltZXBpY2tlckluaXQoKTogdm9pZCB7XG4gICAgICAgICQodGhpcy50cmlnZ2VyKS5kYXRldGltZXBpY2tlcih0aGlzLmNvbmZpZyk7XG4gICAgfVxuXG4gICAgcHJvdGVjdGVkIHNldExhbmd1YWdlKGxhbmd1YWdlOiBzdHJpbmcpOiB2b2lkIHtcbiAgICAgICAgJC5kYXRldGltZXBpY2tlci5zZXRMb2NhbGUobGFuZ3VhZ2UpO1xuICAgIH1cblxuICAgIHByb3RlY3RlZCBnZXQgcGFyZW50KCk6IHN0cmluZyB7XG4gICAgICAgIHJldHVybiB0aGlzLmdldEF0dHJpYnV0ZSgncGFyZW50LWlkJyk7XG4gICAgfVxuXG4gICAgcHJvdGVjdGVkIGdldCBsYW5ndWFnZSgpOiBzdHJpbmcge1xuICAgICAgICByZXR1cm4gdGhpcy5nZXRBdHRyaWJ1dGUoJ2xhbmd1YWdlJyk7XG4gICAgfVxuXG4gICAgcHJvdGVjdGVkIGdldCBjb25maWcoKTogb2JqZWN0IHtcbiAgICAgICAgY29uc3QgY29uZmlnID0gSlNPTi5wYXJzZSh0aGlzLmdldEF0dHJpYnV0ZSgnY29uZmlnJykpO1xuICAgICAgICBjb25maWcucGFyZW50SUQgPSB0aGlzLnBhcmVudDtcblxuICAgICAgICByZXR1cm4gY29uZmlnO1xuICAgIH1cbn1cbiJdLCJzb3VyY2VSb290IjoiIn0=