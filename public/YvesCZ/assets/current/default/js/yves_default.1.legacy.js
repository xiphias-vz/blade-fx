(window["webpackJsonp_yves_default"] = window["webpackJsonp_yves_default"] || []).push([[1],{

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
/* harmony import */ var _babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @babel/runtime/helpers/createClass */ "./node_modules/@babel/runtime/helpers/createClass.js");
/* harmony import */ var _babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _babel_runtime_helpers_assertThisInitialized__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @babel/runtime/helpers/assertThisInitialized */ "./node_modules/@babel/runtime/helpers/assertThisInitialized.js");
/* harmony import */ var _babel_runtime_helpers_assertThisInitialized__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_assertThisInitialized__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _babel_runtime_helpers_possibleConstructorReturn__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @babel/runtime/helpers/possibleConstructorReturn */ "./node_modules/@babel/runtime/helpers/possibleConstructorReturn.js");
/* harmony import */ var _babel_runtime_helpers_possibleConstructorReturn__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_possibleConstructorReturn__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _babel_runtime_helpers_getPrototypeOf__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @babel/runtime/helpers/getPrototypeOf */ "./node_modules/@babel/runtime/helpers/getPrototypeOf.js");
/* harmony import */ var _babel_runtime_helpers_getPrototypeOf__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_getPrototypeOf__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _babel_runtime_helpers_inheritsLoose__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @babel/runtime/helpers/inheritsLoose */ "./node_modules/@babel/runtime/helpers/inheritsLoose.js");
/* harmony import */ var _babel_runtime_helpers_inheritsLoose__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_inheritsLoose__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @babel/runtime/helpers/defineProperty */ "./node_modules/@babel/runtime/helpers/defineProperty.js");
/* harmony import */ var _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_5__);
/* harmony import */ var ShopUi_models_component__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ShopUi/models/component */ "./vendor/spryker-shop/shop-ui/src/SprykerShop/Yves/ShopUi/Theme/default/models/component.ts");
/* harmony import */ var jquery_dist_jquery__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! jquery/dist/jquery */ "./node_modules/jquery/dist/jquery.js");
/* harmony import */ var jquery_dist_jquery__WEBPACK_IMPORTED_MODULE_7___default = /*#__PURE__*/__webpack_require__.n(jquery_dist_jquery__WEBPACK_IMPORTED_MODULE_7__);
/* harmony import */ var jquery_datetimepicker_build_jquery_datetimepicker_full__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! jquery-datetimepicker/build/jquery.datetimepicker.full */ "./node_modules/jquery-datetimepicker/build/jquery.datetimepicker.full.js");
/* harmony import */ var jquery_datetimepicker_build_jquery_datetimepicker_full__WEBPACK_IMPORTED_MODULE_8___default = /*#__PURE__*/__webpack_require__.n(jquery_datetimepicker_build_jquery_datetimepicker_full__WEBPACK_IMPORTED_MODULE_8__);







function _createSuper(Derived) { return function () { var Super = _babel_runtime_helpers_getPrototypeOf__WEBPACK_IMPORTED_MODULE_3___default()(Derived), result; if (_isNativeReflectConstruct()) { var NewTarget = _babel_runtime_helpers_getPrototypeOf__WEBPACK_IMPORTED_MODULE_3___default()(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _babel_runtime_helpers_possibleConstructorReturn__WEBPACK_IMPORTED_MODULE_2___default()(this, result); }; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Date.prototype.toString.call(Reflect.construct(Date, [], function () {})); return true; } catch (e) { return false; } }





var DateTimePicker = /*#__PURE__*/function (_Component) {
  _babel_runtime_helpers_inheritsLoose__WEBPACK_IMPORTED_MODULE_4___default()(DateTimePicker, _Component);

  var _super = _createSuper(DateTimePicker);

  function DateTimePicker() {
    var _this;

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this = _Component.call.apply(_Component, [this].concat(args)) || this;

    _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_5___default()(_babel_runtime_helpers_assertThisInitialized__WEBPACK_IMPORTED_MODULE_1___default()(_this), "trigger", void 0);

    return _this;
  }

  var _proto = DateTimePicker.prototype;

  _proto.readyCallback = function readyCallback() {};

  _proto.init = function init() {
    this.trigger = this.querySelector('input');
    this.mapEvents();
  };

  _proto.mapEvents = function mapEvents() {
    this.datetimepickerInit();
    this.setLanguage(this.language);
  };

  _proto.datetimepickerInit = function datetimepickerInit() {
    jquery_dist_jquery__WEBPACK_IMPORTED_MODULE_7___default()(this.trigger).datetimepicker(this.config);
  };

  _proto.setLanguage = function setLanguage(language) {
    jquery_dist_jquery__WEBPACK_IMPORTED_MODULE_7___default.a.datetimepicker.setLocale(language);
  };

  _babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_0___default()(DateTimePicker, [{
    key: "parent",
    get: function get() {
      return this.getAttribute('parent-id');
    }
  }, {
    key: "language",
    get: function get() {
      return this.getAttribute('language');
    }
  }, {
    key: "config",
    get: function get() {
      var config = JSON.parse(this.getAttribute('config'));
      config.parentID = this.parent;
      return config;
    }
  }]);

  return DateTimePicker;
}(ShopUi_models_component__WEBPACK_IMPORTED_MODULE_6__["default"]);



/***/ })

}]);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvanF1ZXJ5LWRhdGV0aW1lcGlja2VyL2J1aWxkL2pxdWVyeS5kYXRldGltZXBpY2tlci5mdWxsLmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9qcXVlcnktbW91c2V3aGVlbC9qcXVlcnkubW91c2V3aGVlbC5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvUHl6L1l2ZXMvU2hvcFVpL1RoZW1lL2RlZmF1bHQvY29tcG9uZW50cy9tb2xlY3VsZXMvZGF0ZS10aW1lLXBpY2tlci9kYXRlLXRpbWUtcGlja2VyLnRzIl0sIm5hbWVzIjpbIkRhdGVUaW1lUGlja2VyIiwicmVhZHlDYWxsYmFjayIsImluaXQiLCJ0cmlnZ2VyIiwicXVlcnlTZWxlY3RvciIsIm1hcEV2ZW50cyIsImRhdGV0aW1lcGlja2VySW5pdCIsInNldExhbmd1YWdlIiwibGFuZ3VhZ2UiLCIkIiwiZGF0ZXRpbWVwaWNrZXIiLCJjb25maWciLCJzZXRMb2NhbGUiLCJnZXRBdHRyaWJ1dGUiLCJKU09OIiwicGFyc2UiLCJwYXJlbnRJRCIsInBhcmVudCIsIkNvbXBvbmVudCJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7O0FBQUE7QUFDQSw4QkFBOEI7QUFDOUI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxxQkFBcUIsWUFBWSxhQUFhLGtCQUFrQiwrQkFBK0IsZ0ZBQWdGLG1CQUFtQiw0QkFBNEIsNkJBQTZCLGVBQWUsUUFBUSxXQUFXLEtBQUssbUJBQW1CLHlHQUF5RyxTQUFTLGlCQUFpQixZQUFZLFdBQVcscURBQXFELFNBQVMsSUFBSSxjQUFjLDBYQUEwWCxjQUFjLHNCQUFzQixpREFBaUQsc1BBQXNQLEVBQUUsNkJBQTZCLDJCQUEyQixvQkFBb0IsOElBQThJLDBCQUEwQiwrQ0FBK0MsYUFBYSxxRkFBcUYseUJBQXlCLDZEQUE2RCw0REFBNEQsa0JBQWtCLDhCQUE4QixvREFBb0QsaUJBQWlCLGdDQUFnQyxtQkFBbUIsb0JBQW9CLCtGQUErRix1REFBdUQsV0FBVyxzQ0FBc0Msa0NBQWtDLDREQUE0RCxNQUFNLDZDQUE2QyxzQ0FBc0MsVUFBVSxLQUFLLDhCQUE4QixVQUFVLEtBQUssTUFBTSw4Q0FBOEMsYUFBYSxNQUFNLDZNQUE2TSxLQUFLLDhCQUE4QixTQUFTLEtBQUssTUFBTSw4Q0FBOEMsY0FBYyxNQUFNLHNDQUFzQyxhQUFhLE1BQU0sc0NBQXNDLGFBQWEsK0ZBQStGLEtBQUssc0JBQXNCLDRDQUE0QyxjQUFjLHlCQUF5QiwrQkFBK0IsMEhBQTBILDBCQUEwQixRQUFRLFdBQVcsS0FBSyw2REFBNkQsVUFBVSwyREFBMkQsTUFBTSwyREFBMkQsTUFBTSwySEFBMkgsaUJBQWlCLE1BQU0scUJBQXFCLE1BQU0sdUJBQXVCLE1BQU0sdUJBQXVCLDRDQUE0QyxTQUFTLDJCQUEyQiw0REFBNEQsc0JBQXNCLFVBQVUsYUFBYSxrQkFBa0IsY0FBYywwQkFBMEIsY0FBYyxtQkFBbUIsY0FBYyxxQkFBcUIsY0FBYyxnQkFBZ0IsY0FBYyxrQkFBa0IsY0FBYywwREFBMEQsMkJBQTJCLGNBQWMsNEVBQTRFLG9DQUFvQyxjQUFjLDhCQUE4QixjQUFjLGtCQUFrQixjQUFjLG1DQUFtQyxjQUFjLHNCQUFzQixjQUFjLHlDQUF5QyxjQUFjLFlBQVkseUNBQXlDLGNBQWMsNEJBQTRCLHlDQUF5QyxjQUFjLHVCQUF1QixjQUFjLGtDQUFrQyxjQUFjLDJCQUEyQixjQUFjLG1CQUFtQixxQkFBcUIsY0FBYyxtRUFBbUUsMkNBQTJDLGNBQWMsb0JBQW9CLGNBQWMsb0JBQW9CLGNBQWMsa0JBQWtCLGNBQWMsa0JBQWtCLGNBQWMsMkJBQTJCLGNBQWMsMkJBQTJCLGNBQWMsb0NBQW9DLGNBQWMsb0NBQW9DLHVDQUF1QyxjQUFjLG9GQUFvRixxQkFBcUIsY0FBYywwQ0FBMEMsbURBQW1ELGNBQWMsWUFBWSx1Q0FBdUMsY0FBYyxvRUFBb0UsZ0JBQWdCLGNBQWMsaUNBQWlDLGNBQWMsb0NBQW9DLGNBQWMsc0NBQXNDLGNBQWMsMkJBQTJCLFFBQVEsMEJBQTBCLGlDQUFpQywyREFBMkQsc0JBQXNCLG1CQUFtQixJQUFJLDhMQUE4TCxTQUFTLFdBQVcsR0FBRztBQUN0c007QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQSxXQUFXLE9BQU87QUFDbEI7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQSxRQUFRO0FBQ1I7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxJQUFJO0FBQ0osUUFBUTtBQUNSO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsSUFBSTtBQUNKLFFBQVE7QUFDUjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLElBQUk7QUFDSixRQUFRO0FBQ1I7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxJQUFJO0FBQ0osUUFBUTtBQUNSO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsSUFBSTtBQUNKLFFBQVE7QUFDUjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLElBQUk7QUFDSixRQUFRO0FBQ1I7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxJQUFJO0FBQ0osUUFBUTtBQUNSO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsSUFBSTtBQUNKLFFBQVE7QUFDUjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLElBQUk7QUFDSixRQUFRO0FBQ1I7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxJQUFJO0FBQ0osUUFBUTtBQUNSO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsSUFBSTtBQUNKLFFBQVE7QUFDUjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLElBQUk7QUFDSixRQUFRO0FBQ1I7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxJQUFJO0FBQ0osUUFBUTtBQUNSO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsSUFBSTtBQUNKLFFBQVE7QUFDUjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLElBQUk7QUFDSixRQUFRO0FBQ1I7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxJQUFJO0FBQ0osUUFBUTtBQUNSO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsSUFBSTtBQUNKLFFBQVE7QUFDUjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLElBQUk7QUFDSixRQUFRO0FBQ1I7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsSUFBSTtBQUNKLFFBQVE7QUFDUjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxJQUFJO0FBQ0osUUFBUTtBQUNSO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxJQUFJO0FBQ0osUUFBUTtBQUNSO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsSUFBSTtBQUNKLFFBQVE7QUFDUjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLElBQUk7QUFDSixRQUFRO0FBQ1I7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxJQUFJO0FBQ0osUUFBUTtBQUNSO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsSUFBSTtBQUNKLFFBQVE7QUFDUjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLElBQUk7QUFDSixRQUFRO0FBQ1I7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxJQUFJO0FBQ0osUUFBUTtBQUNSO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsSUFBSTtBQUNKLFFBQVE7QUFDUjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxJQUFJO0FBQ0osUUFBUTtBQUNSO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsSUFBSTtBQUNKLFFBQVE7QUFDUjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLElBQUk7QUFDSixRQUFRO0FBQ1I7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxJQUFJO0FBQ0osUUFBUTtBQUNSO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsSUFBSTtBQUNKLGFBQWE7QUFDYjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLElBQUk7QUFDSixRQUFRO0FBQ1I7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxJQUFJO0FBQ0osUUFBUTtBQUNSO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsSUFBSTtBQUNKLFFBQVE7QUFDUjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLElBQUk7QUFDSixRQUFRO0FBQ1I7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxJQUFJO0FBQ0osUUFBUTtBQUNSO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsSUFBSTtBQUNKLFFBQVE7QUFDUjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLElBQUk7QUFDSixRQUFRO0FBQ1I7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxJQUFJO0FBQ0osUUFBUTtBQUNSO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsSUFBSTtBQUNKLFFBQVE7QUFDUjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLElBQUk7QUFDSixRQUFRO0FBQ1I7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxJQUFJO0FBQ0osYUFBYTtBQUNiO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsSUFBSTtBQUNKLFFBQVE7QUFDUjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLElBQUk7QUFDSixRQUFRO0FBQ1I7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxJQUFJO0FBQ0osYUFBYTtBQUNiO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsSUFBSTtBQUNKLFFBQVE7QUFDUjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLElBQUk7QUFDSixRQUFRO0FBQ1I7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxJQUFJO0FBQ0osYUFBYTtBQUNiO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsSUFBSTtBQUNKLFFBQVE7QUFDUjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLElBQUk7QUFDSixPQUFPO0FBQ1A7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsSUFBSTtBQUNKLFFBQVE7QUFDUjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLElBQUk7QUFDSixRQUFRO0FBQ1I7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxJQUFJO0FBQ0osUUFBUTtBQUNSO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLElBQUk7QUFDSixRQUFRO0FBQ1I7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsSUFBSTtBQUNKLFFBQVE7QUFDUjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsR0FBRzs7QUFFSDtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUEsOEJBQThCO0FBQzlCLDhCQUE4QjtBQUM5QiwrQkFBK0I7QUFDL0IsaUNBQWlDO0FBQ2pDLDhCQUE4QjtBQUM5QixrQ0FBa0M7QUFDbEMsd0JBQXdCO0FBQ3hCLHlCQUF5QjtBQUN6Qiw0QkFBNEI7O0FBRTVCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0Esa0RBQWtELDJCQUEyQjtBQUM3RTs7QUFFQTtBQUNBO0FBQ0EsNkJBQTZCO0FBQzdCLElBQUk7QUFDSjtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLElBQUk7QUFDSjtBQUNBO0FBQ0E7QUFDQTtBQUNBLE07QUFDQTtBQUNBO0FBQ0EsS0FBSzs7QUFFTDtBQUNBO0FBQ0E7QUFDQSxNO0FBQ0E7QUFDQSxLQUFLOztBQUVMO0FBQ0E7QUFDQSxrQkFBa0IsRUFBRTtBQUNwQixrQkFBa0IsRUFBRTtBQUNwQixrQkFBa0IsRUFBRTtBQUNwQixrQkFBa0IsRUFBRTtBQUNwQixrQkFBa0IsRUFBRTtBQUNwQixrQkFBa0IsRUFBRTtBQUNwQixrQkFBa0IsRUFBRTtBQUNwQixLQUFLO0FBQ0w7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEdBQUc7O0FBRUg7QUFDQTtBQUNBO0FBQ0E7QUFDQSw4QjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsR0FBRztBQUNIOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsTUFBTTtBQUNOO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLDBDQUEwQyxPQUFPO0FBQ2pELDBCQUEwQixVQUFVO0FBQ3BDO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGdCQUFnQixXQUFXO0FBQzNCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxNQUFNO0FBQ047QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsUUFBUTtBQUNSO0FBQ0EsT0FBTztBQUNQO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsTUFBTTtBQUNOO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxNQUFNO0FBQ047QUFDQTtBQUNBO0FBQ0EsTUFBTTs7QUFFTjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBLE9BQU87QUFDUCxNQUFNO0FBQ047QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLE9BQU87QUFDUDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLE1BQU07O0FBRU47QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxLQUFLOztBQUVMO0FBQ0E7QUFDQTtBQUNBLEtBQUs7O0FBRUw7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSzs7QUFFTDtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBLEdBQUc7QUFDSDs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLCtEQUErRCwyQ0FBMkM7O0FBRTFHO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLE9BQU87QUFDUCxNQUFNO0FBQ047O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQSwwREFBMEQsa0JBQWtCO0FBQzVFO0FBQ0E7QUFDQSxPQUFPO0FBQ1A7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7O0FBRUw7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSzs7QUFFTDtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQSwrQkFBK0I7O0FBRS9CO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsT0FBTztBQUNQO0FBQ0E7QUFDQSxNQUFNOztBQUVOO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxRQUFRO0FBQ1I7QUFDQTtBQUNBO0FBQ0EsTUFBTTs7QUFFTjtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBOztBQUVBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFFBQVE7QUFDUjtBQUNBLGdCQUFnQjtBQUNoQjtBQUNBLFNBQVM7QUFDVDtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsV0FBVztBQUNYLFVBQVU7QUFDVjtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQSxPQUFPO0FBQ1A7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSzs7QUFFTDtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLElBQUk7O0FBRUo7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQSxhQUFhO0FBQ2I7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUEsdUJBQXVCLEVBQUU7O0FBRXpCO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxNQUFNO0FBQ047QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUEsa0RBQWtEO0FBQ2xEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxJQUFJO0FBQ0o7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLElBQUk7QUFDSjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsT0FBTztBQUNQO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsTUFBTTs7QUFFTjtBQUNBO0FBQ0E7QUFDQTtBQUNBLE1BQU07QUFDTixLQUFLOztBQUVMO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsT0FBTztBQUNQO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsdUJBQXVCLDBCQUEwQjtBQUNqRDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxNQUFNO0FBQ047QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLE1BQU07QUFDTixLQUFLOztBQUVMO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQSxpQkFBaUIsT0FBTztBQUN4QjtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0EsUUFBUTtBQUNSO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQSx5QkFBeUIsaUNBQWlDO0FBQzFELG1CQUFtQixRQUFRO0FBQzNCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxPQUFPO0FBQ1Asa0JBQWtCLCtCQUErQjtBQUNqRDtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBOztBQUVBOztBQUVBLCtDQUErQyxvQ0FBb0M7QUFDbkY7QUFDQTtBQUNBO0FBQ0E7O0FBRUEsMERBQTBELHFDQUFxQztBQUMvRjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsTUFBTTtBQUNOO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxPQUFPO0FBQ1A7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxPQUFPO0FBQ1A7QUFDQTtBQUNBO0FBQ0EsS0FBSzs7QUFFTDtBQUNBO0FBQ0E7QUFDQSwrQkFBK0I7QUFDL0I7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLE1BQU07QUFDTixLQUFLOztBQUVMO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSzs7QUFFTDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLE1BQU07QUFDTjtBQUNBO0FBQ0E7QUFDQSxLQUFLOztBQUVMO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLOztBQUVMO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0EsS0FBSzs7QUFFTDs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsY0FBYyxRQUFRO0FBQ3RCLGNBQWMsU0FBUztBQUN2QixnQkFBZ0I7QUFDaEI7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMOztBQUVBO0FBQ0E7QUFDQTtBQUNBLGdCQUFnQjtBQUNoQjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQSxNQUFNOztBQUVOO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQSxPQUFPO0FBQ1A7QUFDQTtBQUNBLE1BQU07QUFDTjtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7O0FBRUw7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQSxpQkFBaUI7QUFDakI7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFFBQVE7QUFDUjtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBLE1BQU07QUFDTjtBQUNBO0FBQ0EsS0FBSztBQUNMOztBQUVBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLE1BQU07QUFDTjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTs7QUFFQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQSwyQkFBMkIsRUFBRSxZQUFZLEVBQUU7QUFDM0Msd0JBQXdCLE9BQU87QUFDL0Isd0JBQXdCLEVBQUUsT0FBTyxRQUFRO0FBQ3pDLG1CQUFtQixZQUFZLEVBQUUsR0FBRyxhQUFhLEVBQUU7QUFDbkQsbUJBQW1CLFdBQVcsWUFBWSxFQUFFO0FBQzVDO0FBQ0EsTUFBTTtBQUNOO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLE9BQU87QUFDUDtBQUNBO0FBQ0EsTUFBTTtBQUNOO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxNQUFNO0FBQ047QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBLGdFO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsVUFBVTtBQUNWO0FBQ0EsVUFBVTtBQUNWO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLFFBQVE7O0FBRVI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBOztBQUVBLDRDQUE0QztBQUM1QztBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQSxtRjtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQSxPQUFPO0FBQ1A7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsT0FBTztBQUNQO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsT0FBTztBQUNQO0FBQ0EsT0FBTztBQUNQO0FBQ0E7QUFDQSxVQUFVO0FBQ1Y7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLFFBQVE7QUFDUjtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsTUFBTTtBQUNOLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxJQUFJO0FBQ0o7QUFDQTtBQUNBO0FBQ0E7QUFDQSxhQUFhO0FBQ2I7QUFDQTtBQUNBO0FBQ0E7QUFDQSxJQUFJO0FBQ0o7QUFDQTtBQUNBO0FBQ0E7QUFDQSxJQUFJOztBQUVKO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0EsR0FBRzs7QUFFSDtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsQ0FBQztBQUNELE1BQU0sSUFBMEM7QUFDaEQ7QUFDQSxFQUFFLGlDQUFPLENBQUMseUVBQVEsRUFBRSxxR0FBbUIsQ0FBQyxvQ0FBRSxPQUFPO0FBQUE7QUFBQTtBQUFBLG9HQUFDO0FBQ2xELEVBQUUsTUFBTSxFQU1OO0FBQ0YsQ0FBQzs7O0FBR0Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQSxTQUFTLElBQTBDO0FBQ25EO0FBQ0EsUUFBUSxpQ0FBTyxDQUFDLHlFQUFRLENBQUMsb0NBQUUsT0FBTztBQUFBO0FBQUE7QUFBQSxvR0FBQztBQUNuQyxLQUFLLE1BQU0sRUFNTjtBQUNMLENBQUM7O0FBRUQ7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBLG1DQUFtQyxHQUFHO0FBQ3RDO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQSw0Q0FBNEMsR0FBRztBQUMvQztBQUNBO0FBQ0EsYUFBYTtBQUNiO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxTQUFTOztBQUVUO0FBQ0E7QUFDQSw0Q0FBNEMsR0FBRztBQUMvQztBQUNBO0FBQ0EsYUFBYTtBQUNiO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxTQUFTOztBQUVUO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUzs7QUFFVDtBQUNBO0FBQ0EsU0FBUzs7QUFFVDtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLFNBQVM7O0FBRVQ7QUFDQTtBQUNBO0FBQ0EsS0FBSzs7O0FBR0w7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBLDBDQUEwQywrQkFBK0I7QUFDekUsMENBQTBDLDhCQUE4QjtBQUN4RSwwQ0FBMEMsK0JBQStCO0FBQ3pFLDBDQUEwQyxvQ0FBb0M7O0FBRTlFO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGlDQUFpQyxzQkFBc0I7QUFDdkQ7O0FBRUE7QUFDQSw2Q0FBNkMsUUFBUTs7QUFFckQ7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLHFDQUFxQyxzQ0FBc0M7QUFDM0U7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUEsQ0FBQzs7Ozs7Ozs7Ozs7O0FDOTFGRDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBLFNBQVMsSUFBMEM7QUFDbkQ7QUFDQSxRQUFRLGlDQUFPLENBQUMseUVBQVEsQ0FBQyxvQ0FBRSxPQUFPO0FBQUE7QUFBQTtBQUFBLG9HQUFDO0FBQ25DLEtBQUssTUFBTSxFQU1OO0FBQ0wsQ0FBQzs7QUFFRDtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0EsbUNBQW1DLEdBQUc7QUFDdEM7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLDRDQUE0QyxHQUFHO0FBQy9DO0FBQ0E7QUFDQSxhQUFhO0FBQ2I7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFNBQVM7O0FBRVQ7QUFDQTtBQUNBLDRDQUE0QyxHQUFHO0FBQy9DO0FBQ0E7QUFDQSxhQUFhO0FBQ2I7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFNBQVM7O0FBRVQ7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxTQUFTOztBQUVUO0FBQ0E7QUFDQSxTQUFTOztBQUVUO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsU0FBUzs7QUFFVDtBQUNBO0FBQ0E7QUFDQSxLQUFLOzs7QUFHTDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0EsMENBQTBDLCtCQUErQjtBQUN6RSwwQ0FBMEMsOEJBQThCO0FBQ3hFLDBDQUEwQywrQkFBK0I7QUFDekUsMENBQTBDLG9DQUFvQzs7QUFFOUU7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsaUNBQWlDLHNCQUFzQjtBQUN2RDs7QUFFQTtBQUNBLDZDQUE2QyxRQUFROztBQUVyRDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EscUNBQXFDLHNDQUFzQztBQUMzRTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQSxDQUFDOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FDNU5EO0FBQ0E7QUFDQTs7SUFFcUJBLGM7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztTQUdQQyxhLEdBQVYseUJBQWdDLENBQUUsQzs7U0FFeEJDLEksR0FBVixnQkFBdUI7QUFDbkIsU0FBS0MsT0FBTCxHQUFpQyxLQUFLQyxhQUFMLENBQW1CLE9BQW5CLENBQWpDO0FBQ0EsU0FBS0MsU0FBTDtBQUNILEc7O1NBRVNBLFMsR0FBVixxQkFBNEI7QUFDeEIsU0FBS0Msa0JBQUw7QUFDQSxTQUFLQyxXQUFMLENBQWlCLEtBQUtDLFFBQXRCO0FBQ0gsRzs7U0FFU0Ysa0IsR0FBViw4QkFBcUM7QUFDakNHLDZEQUFDLENBQUMsS0FBS04sT0FBTixDQUFELENBQWdCTyxjQUFoQixDQUErQixLQUFLQyxNQUFwQztBQUNILEc7O1NBRVNKLFcsR0FBVixxQkFBc0JDLFFBQXRCLEVBQThDO0FBQzFDQyw2REFBQyxDQUFDQyxjQUFGLENBQWlCRSxTQUFqQixDQUEyQkosUUFBM0I7QUFDSCxHOzs7O3dCQUU4QjtBQUMzQixhQUFPLEtBQUtLLFlBQUwsQ0FBa0IsV0FBbEIsQ0FBUDtBQUNIOzs7d0JBRWdDO0FBQzdCLGFBQU8sS0FBS0EsWUFBTCxDQUFrQixVQUFsQixDQUFQO0FBQ0g7Ozt3QkFFOEI7QUFDM0IsVUFBTUYsTUFBTSxHQUFHRyxJQUFJLENBQUNDLEtBQUwsQ0FBVyxLQUFLRixZQUFMLENBQWtCLFFBQWxCLENBQVgsQ0FBZjtBQUNBRixZQUFNLENBQUNLLFFBQVAsR0FBa0IsS0FBS0MsTUFBdkI7QUFFQSxhQUFPTixNQUFQO0FBQ0g7Ozs7RUFwQ3VDTywrRCIsImZpbGUiOiIuL2pzL3l2ZXNfZGVmYXVsdC4xLmxlZ2FjeS5qcyIsInNvdXJjZXNDb250ZW50IjpbIi8qIVxuICogQGNvcHlyaWdodCBDb3B5cmlnaHQgJmNvcHk7IEthcnRpayBWaXN3ZXN3YXJhbiwgS3JhamVlLmNvbSwgMjAxNCAtIDIwMTZcbiAqIEB2ZXJzaW9uIDEuMy40XG4gKlxuICogRGF0ZSBmb3JtYXR0ZXIgdXRpbGl0eSBsaWJyYXJ5IHRoYXQgYWxsb3dzIGZvcm1hdHRpbmcgZGF0ZS90aW1lIHZhcmlhYmxlcyBvciBEYXRlIG9iamVjdHMgdXNpbmcgUEhQIERhdGVUaW1lIGZvcm1hdC5cbiAqIEBzZWUgaHR0cDovL3BocC5uZXQvbWFudWFsL2VuL2Z1bmN0aW9uLmRhdGUucGhwXG4gKlxuICogRm9yIG1vcmUgSlF1ZXJ5IHBsdWdpbnMgdmlzaXQgaHR0cDovL3BsdWdpbnMua3JhamVlLmNvbVxuICogRm9yIG1vcmUgWWlpIHJlbGF0ZWQgZGVtb3MgdmlzaXQgaHR0cDovL2RlbW9zLmtyYWplZS5jb21cbiAqL3ZhciBEYXRlRm9ybWF0dGVyOyFmdW5jdGlvbigpe1widXNlIHN0cmljdFwiO3ZhciB0LGUscixuLGEsdSxpO3U9ODY0ZTUsaT0zNjAwLHQ9ZnVuY3Rpb24odCxlKXtyZXR1cm5cInN0cmluZ1wiPT10eXBlb2YgdCYmXCJzdHJpbmdcIj09dHlwZW9mIGUmJnQudG9Mb3dlckNhc2UoKT09PWUudG9Mb3dlckNhc2UoKX0sZT1mdW5jdGlvbih0LHIsbil7dmFyIGE9bnx8XCIwXCIsdT10LnRvU3RyaW5nKCk7cmV0dXJuIHUubGVuZ3RoPHI/ZShhK3Uscik6dX0scj1mdW5jdGlvbih0KXt2YXIgZSxuO2Zvcih0PXR8fHt9LGU9MTtlPGFyZ3VtZW50cy5sZW5ndGg7ZSsrKWlmKG49YXJndW1lbnRzW2VdKWZvcih2YXIgYSBpbiBuKW4uaGFzT3duUHJvcGVydHkoYSkmJihcIm9iamVjdFwiPT10eXBlb2YgblthXT9yKHRbYV0sblthXSk6dFthXT1uW2FdKTtyZXR1cm4gdH0sbj1mdW5jdGlvbih0LGUpe2Zvcih2YXIgcj0wO3I8ZS5sZW5ndGg7cisrKWlmKGVbcl0udG9Mb3dlckNhc2UoKT09PXQudG9Mb3dlckNhc2UoKSlyZXR1cm4gcjtyZXR1cm4tMX0sYT17ZGF0ZVNldHRpbmdzOntkYXlzOltcIlN1bmRheVwiLFwiTW9uZGF5XCIsXCJUdWVzZGF5XCIsXCJXZWRuZXNkYXlcIixcIlRodXJzZGF5XCIsXCJGcmlkYXlcIixcIlNhdHVyZGF5XCJdLGRheXNTaG9ydDpbXCJTdW5cIixcIk1vblwiLFwiVHVlXCIsXCJXZWRcIixcIlRodVwiLFwiRnJpXCIsXCJTYXRcIl0sbW9udGhzOltcIkphbnVhcnlcIixcIkZlYnJ1YXJ5XCIsXCJNYXJjaFwiLFwiQXByaWxcIixcIk1heVwiLFwiSnVuZVwiLFwiSnVseVwiLFwiQXVndXN0XCIsXCJTZXB0ZW1iZXJcIixcIk9jdG9iZXJcIixcIk5vdmVtYmVyXCIsXCJEZWNlbWJlclwiXSxtb250aHNTaG9ydDpbXCJKYW5cIixcIkZlYlwiLFwiTWFyXCIsXCJBcHJcIixcIk1heVwiLFwiSnVuXCIsXCJKdWxcIixcIkF1Z1wiLFwiU2VwXCIsXCJPY3RcIixcIk5vdlwiLFwiRGVjXCJdLG1lcmlkaWVtOltcIkFNXCIsXCJQTVwiXSxvcmRpbmFsOmZ1bmN0aW9uKHQpe3ZhciBlPXQlMTAscj17MTpcInN0XCIsMjpcIm5kXCIsMzpcInJkXCJ9O3JldHVybiAxIT09TWF0aC5mbG9vcih0JTEwMC8xMCkmJnJbZV0/cltlXTpcInRoXCJ9fSxzZXBhcmF0b3JzOi9bIFxcLStcXC9cXC5UOkBdL2csdmFsaWRQYXJ0czovW2REamxOU3d6V0ZtTW50TG9ZeWFBQmdHaEhpc3VlVElPUFpjclVdL2csaW50UGFydHM6L1tkandOem1ueVloSGdHaXNdL2csdHpQYXJ0czovXFxiKD86W1BNQ0VBXVtTRFBdVHwoPzpQYWNpZmljfE1vdW50YWlufENlbnRyYWx8RWFzdGVybnxBdGxhbnRpYykgKD86U3RhbmRhcmR8RGF5bGlnaHR8UHJldmFpbGluZykgVGltZXwoPzpHTVR8VVRDKSg/OlstK11cXGR7NH0pPylcXGIvZyx0ekNsaXA6L1teLStcXGRBLVpdL2d9LERhdGVGb3JtYXR0ZXI9ZnVuY3Rpb24odCl7dmFyIGU9dGhpcyxuPXIoYSx0KTtlLmRhdGVTZXR0aW5ncz1uLmRhdGVTZXR0aW5ncyxlLnNlcGFyYXRvcnM9bi5zZXBhcmF0b3JzLGUudmFsaWRQYXJ0cz1uLnZhbGlkUGFydHMsZS5pbnRQYXJ0cz1uLmludFBhcnRzLGUudHpQYXJ0cz1uLnR6UGFydHMsZS50ekNsaXA9bi50ekNsaXB9LERhdGVGb3JtYXR0ZXIucHJvdG90eXBlPXtjb25zdHJ1Y3RvcjpEYXRlRm9ybWF0dGVyLGdldE1vbnRoOmZ1bmN0aW9uKHQpe3ZhciBlLHI9dGhpcztyZXR1cm4gZT1uKHQsci5kYXRlU2V0dGluZ3MubW9udGhzU2hvcnQpKzEsMD09PWUmJihlPW4odCxyLmRhdGVTZXR0aW5ncy5tb250aHMpKzEpLGV9LHBhcnNlRGF0ZTpmdW5jdGlvbihlLHIpe3ZhciBuLGEsdSxpLHMsbyxjLGYsbCxoLGQ9dGhpcyxnPSExLG09ITEscD1kLmRhdGVTZXR0aW5ncyx5PXtkYXRlOm51bGwseWVhcjpudWxsLG1vbnRoOm51bGwsZGF5Om51bGwsaG91cjowLG1pbjowLHNlYzowfTtpZighZSlyZXR1cm4gbnVsbDtpZihlIGluc3RhbmNlb2YgRGF0ZSlyZXR1cm4gZTtpZihcIlVcIj09PXIpcmV0dXJuIHU9cGFyc2VJbnQoZSksdT9uZXcgRGF0ZSgxZTMqdSk6ZTtzd2l0Y2godHlwZW9mIGUpe2Nhc2VcIm51bWJlclwiOnJldHVybiBuZXcgRGF0ZShlKTtjYXNlXCJzdHJpbmdcIjpicmVhaztkZWZhdWx0OnJldHVybiBudWxsfWlmKG49ci5tYXRjaChkLnZhbGlkUGFydHMpLCFufHwwPT09bi5sZW5ndGgpdGhyb3cgbmV3IEVycm9yKFwiSW52YWxpZCBkYXRlIGZvcm1hdCBkZWZpbml0aW9uLlwiKTtmb3IoYT1lLnJlcGxhY2UoZC5zZXBhcmF0b3JzLFwiXFx4MDBcIikuc3BsaXQoXCJcXHgwMFwiKSx1PTA7dTxhLmxlbmd0aDt1Kyspc3dpdGNoKGk9YVt1XSxzPXBhcnNlSW50KGkpLG5bdV0pe2Nhc2VcInlcIjpjYXNlXCJZXCI6aWYoIXMpcmV0dXJuIG51bGw7bD1pLmxlbmd0aCx5LnllYXI9Mj09PWw/cGFyc2VJbnQoKDcwPnM/XCIyMFwiOlwiMTlcIikraSk6cyxnPSEwO2JyZWFrO2Nhc2VcIm1cIjpjYXNlXCJuXCI6Y2FzZVwiTVwiOmNhc2VcIkZcIjppZihpc05hTihzKSl7aWYobz1kLmdldE1vbnRoKGkpLCEobz4wKSlyZXR1cm4gbnVsbDt5Lm1vbnRoPW99ZWxzZXtpZighKHM+PTEmJjEyPj1zKSlyZXR1cm4gbnVsbDt5Lm1vbnRoPXN9Zz0hMDticmVhaztjYXNlXCJkXCI6Y2FzZVwialwiOmlmKCEocz49MSYmMzE+PXMpKXJldHVybiBudWxsO3kuZGF5PXMsZz0hMDticmVhaztjYXNlXCJnXCI6Y2FzZVwiaFwiOmlmKGM9bi5pbmRleE9mKFwiYVwiKT4tMT9uLmluZGV4T2YoXCJhXCIpOm4uaW5kZXhPZihcIkFcIik+LTE/bi5pbmRleE9mKFwiQVwiKTotMSxoPWFbY10sYz4tMSlmPXQoaCxwLm1lcmlkaWVtWzBdKT8wOnQoaCxwLm1lcmlkaWVtWzFdKT8xMjotMSxzPj0xJiYxMj49cyYmZj4tMT95LmhvdXI9cytmLTE6cz49MCYmMjM+PXMmJih5LmhvdXI9cyk7ZWxzZXtpZighKHM+PTAmJjIzPj1zKSlyZXR1cm4gbnVsbDt5LmhvdXI9c31tPSEwO2JyZWFrO2Nhc2VcIkdcIjpjYXNlXCJIXCI6aWYoIShzPj0wJiYyMz49cykpcmV0dXJuIG51bGw7eS5ob3VyPXMsbT0hMDticmVhaztjYXNlXCJpXCI6aWYoIShzPj0wJiY1OT49cykpcmV0dXJuIG51bGw7eS5taW49cyxtPSEwO2JyZWFrO2Nhc2VcInNcIjppZighKHM+PTAmJjU5Pj1zKSlyZXR1cm4gbnVsbDt5LnNlYz1zLG09ITB9aWYoZz09PSEwJiZ5LnllYXImJnkubW9udGgmJnkuZGF5KXkuZGF0ZT1uZXcgRGF0ZSh5LnllYXIseS5tb250aC0xLHkuZGF5LHkuaG91cix5Lm1pbix5LnNlYywwKTtlbHNle2lmKG0hPT0hMClyZXR1cm4gbnVsbDt5LmRhdGU9bmV3IERhdGUoMCwwLDAseS5ob3VyLHkubWluLHkuc2VjLDApfXJldHVybiB5LmRhdGV9LGd1ZXNzRGF0ZTpmdW5jdGlvbih0LGUpe2lmKFwic3RyaW5nXCIhPXR5cGVvZiB0KXJldHVybiB0O3ZhciByLG4sYSx1LGkscyxvPXRoaXMsYz10LnJlcGxhY2Uoby5zZXBhcmF0b3JzLFwiXFx4MDBcIikuc3BsaXQoXCJcXHgwMFwiKSxmPS9eW2RqbW5dL2csbD1lLm1hdGNoKG8udmFsaWRQYXJ0cyksaD1uZXcgRGF0ZSxkPTA7aWYoIWYudGVzdChsWzBdKSlyZXR1cm4gdDtmb3IoYT0wO2E8Yy5sZW5ndGg7YSsrKXtpZihkPTIsaT1jW2FdLHM9cGFyc2VJbnQoaS5zdWJzdHIoMCwyKSksaXNOYU4ocykpcmV0dXJuIG51bGw7c3dpdGNoKGEpe2Nhc2UgMDpcIm1cIj09PWxbMF18fFwiblwiPT09bFswXT9oLnNldE1vbnRoKHMtMSk6aC5zZXREYXRlKHMpO2JyZWFrO2Nhc2UgMTpcIm1cIj09PWxbMF18fFwiblwiPT09bFswXT9oLnNldERhdGUocyk6aC5zZXRNb250aChzLTEpO2JyZWFrO2Nhc2UgMjppZihuPWguZ2V0RnVsbFllYXIoKSxyPWkubGVuZ3RoLGQ9ND5yP3I6NCxuPXBhcnNlSW50KDQ+cj9uLnRvU3RyaW5nKCkuc3Vic3RyKDAsNC1yKStpOmkuc3Vic3RyKDAsNCkpLCFuKXJldHVybiBudWxsO2guc2V0RnVsbFllYXIobik7YnJlYWs7Y2FzZSAzOmguc2V0SG91cnMocyk7YnJlYWs7Y2FzZSA0Omguc2V0TWludXRlcyhzKTticmVhaztjYXNlIDU6aC5zZXRTZWNvbmRzKHMpfXU9aS5zdWJzdHIoZCksdS5sZW5ndGg+MCYmYy5zcGxpY2UoYSsxLDAsdSl9cmV0dXJuIGh9LHBhcnNlRm9ybWF0OmZ1bmN0aW9uKHQscil7dmFyIG4sYT10aGlzLHM9YS5kYXRlU2V0dGluZ3Msbz0vXFxcXD8oLj8pL2dpLGM9ZnVuY3Rpb24odCxlKXtyZXR1cm4gblt0XT9uW3RdKCk6ZX07cmV0dXJuIG49e2Q6ZnVuY3Rpb24oKXtyZXR1cm4gZShuLmooKSwyKX0sRDpmdW5jdGlvbigpe3JldHVybiBzLmRheXNTaG9ydFtuLncoKV19LGo6ZnVuY3Rpb24oKXtyZXR1cm4gci5nZXREYXRlKCl9LGw6ZnVuY3Rpb24oKXtyZXR1cm4gcy5kYXlzW24udygpXX0sTjpmdW5jdGlvbigpe3JldHVybiBuLncoKXx8N30sdzpmdW5jdGlvbigpe3JldHVybiByLmdldERheSgpfSx6OmZ1bmN0aW9uKCl7dmFyIHQ9bmV3IERhdGUobi5ZKCksbi5uKCktMSxuLmooKSksZT1uZXcgRGF0ZShuLlkoKSwwLDEpO3JldHVybiBNYXRoLnJvdW5kKCh0LWUpL3UpfSxXOmZ1bmN0aW9uKCl7dmFyIHQ9bmV3IERhdGUobi5ZKCksbi5uKCktMSxuLmooKS1uLk4oKSszKSxyPW5ldyBEYXRlKHQuZ2V0RnVsbFllYXIoKSwwLDQpO3JldHVybiBlKDErTWF0aC5yb3VuZCgodC1yKS91LzcpLDIpfSxGOmZ1bmN0aW9uKCl7cmV0dXJuIHMubW9udGhzW3IuZ2V0TW9udGgoKV19LG06ZnVuY3Rpb24oKXtyZXR1cm4gZShuLm4oKSwyKX0sTTpmdW5jdGlvbigpe3JldHVybiBzLm1vbnRoc1Nob3J0W3IuZ2V0TW9udGgoKV19LG46ZnVuY3Rpb24oKXtyZXR1cm4gci5nZXRNb250aCgpKzF9LHQ6ZnVuY3Rpb24oKXtyZXR1cm4gbmV3IERhdGUobi5ZKCksbi5uKCksMCkuZ2V0RGF0ZSgpfSxMOmZ1bmN0aW9uKCl7dmFyIHQ9bi5ZKCk7cmV0dXJuIHQlND09PTAmJnQlMTAwIT09MHx8dCU0MDA9PT0wPzE6MH0sbzpmdW5jdGlvbigpe3ZhciB0PW4ubigpLGU9bi5XKCkscj1uLlkoKTtyZXR1cm4gcisoMTI9PT10JiY5PmU/MToxPT09dCYmZT45Py0xOjApfSxZOmZ1bmN0aW9uKCl7cmV0dXJuIHIuZ2V0RnVsbFllYXIoKX0seTpmdW5jdGlvbigpe3JldHVybiBuLlkoKS50b1N0cmluZygpLnNsaWNlKC0yKX0sYTpmdW5jdGlvbigpe3JldHVybiBuLkEoKS50b0xvd2VyQ2FzZSgpfSxBOmZ1bmN0aW9uKCl7dmFyIHQ9bi5HKCk8MTI/MDoxO3JldHVybiBzLm1lcmlkaWVtW3RdfSxCOmZ1bmN0aW9uKCl7dmFyIHQ9ci5nZXRVVENIb3VycygpKmksbj02MCpyLmdldFVUQ01pbnV0ZXMoKSxhPXIuZ2V0VVRDU2Vjb25kcygpO3JldHVybiBlKE1hdGguZmxvb3IoKHQrbithK2kpLzg2LjQpJTFlMywzKX0sZzpmdW5jdGlvbigpe3JldHVybiBuLkcoKSUxMnx8MTJ9LEc6ZnVuY3Rpb24oKXtyZXR1cm4gci5nZXRIb3VycygpfSxoOmZ1bmN0aW9uKCl7cmV0dXJuIGUobi5nKCksMil9LEg6ZnVuY3Rpb24oKXtyZXR1cm4gZShuLkcoKSwyKX0saTpmdW5jdGlvbigpe3JldHVybiBlKHIuZ2V0TWludXRlcygpLDIpfSxzOmZ1bmN0aW9uKCl7cmV0dXJuIGUoci5nZXRTZWNvbmRzKCksMil9LHU6ZnVuY3Rpb24oKXtyZXR1cm4gZSgxZTMqci5nZXRNaWxsaXNlY29uZHMoKSw2KX0sZTpmdW5jdGlvbigpe3ZhciB0PS9cXCgoLiopXFwpLy5leGVjKFN0cmluZyhyKSlbMV07cmV0dXJuIHR8fFwiQ29vcmRpbmF0ZWQgVW5pdmVyc2FsIFRpbWVcIn0sSTpmdW5jdGlvbigpe3ZhciB0PW5ldyBEYXRlKG4uWSgpLDApLGU9RGF0ZS5VVEMobi5ZKCksMCkscj1uZXcgRGF0ZShuLlkoKSw2KSxhPURhdGUuVVRDKG4uWSgpLDYpO3JldHVybiB0LWUhPT1yLWE/MTowfSxPOmZ1bmN0aW9uKCl7dmFyIHQ9ci5nZXRUaW1lem9uZU9mZnNldCgpLG49TWF0aC5hYnModCk7cmV0dXJuKHQ+MD9cIi1cIjpcIitcIikrZSgxMDAqTWF0aC5mbG9vcihuLzYwKStuJTYwLDQpfSxQOmZ1bmN0aW9uKCl7dmFyIHQ9bi5PKCk7cmV0dXJuIHQuc3Vic3RyKDAsMykrXCI6XCIrdC5zdWJzdHIoMywyKX0sVDpmdW5jdGlvbigpe3ZhciB0PShTdHJpbmcocikubWF0Y2goYS50elBhcnRzKXx8W1wiXCJdKS5wb3AoKS5yZXBsYWNlKGEudHpDbGlwLFwiXCIpO3JldHVybiB0fHxcIlVUQ1wifSxaOmZ1bmN0aW9uKCl7cmV0dXJuIDYwKi1yLmdldFRpbWV6b25lT2Zmc2V0KCl9LGM6ZnVuY3Rpb24oKXtyZXR1cm5cIlktbS1kXFxcXFRIOmk6c1BcIi5yZXBsYWNlKG8sYyl9LHI6ZnVuY3Rpb24oKXtyZXR1cm5cIkQsIGQgTSBZIEg6aTpzIE9cIi5yZXBsYWNlKG8sYyl9LFU6ZnVuY3Rpb24oKXtyZXR1cm4gci5nZXRUaW1lKCkvMWUzfHwwfX0sYyh0LHQpfSxmb3JtYXREYXRlOmZ1bmN0aW9uKHQsZSl7dmFyIHIsbixhLHUsaSxzPXRoaXMsbz1cIlwiLGM9XCJcXFxcXCI7aWYoXCJzdHJpbmdcIj09dHlwZW9mIHQmJih0PXMucGFyc2VEYXRlKHQsZSksIXQpKXJldHVybiBudWxsO2lmKHQgaW5zdGFuY2VvZiBEYXRlKXtmb3IoYT1lLmxlbmd0aCxyPTA7YT5yO3IrKylpPWUuY2hhckF0KHIpLFwiU1wiIT09aSYmaSE9PWMmJihyPjAmJmUuY2hhckF0KHItMSk9PT1jP28rPWk6KHU9cy5wYXJzZUZvcm1hdChpLHQpLHIhPT1hLTEmJnMuaW50UGFydHMudGVzdChpKSYmXCJTXCI9PT1lLmNoYXJBdChyKzEpJiYobj1wYXJzZUludCh1KXx8MCx1Kz1zLmRhdGVTZXR0aW5ncy5vcmRpbmFsKG4pKSxvKz11KSk7cmV0dXJuIG99cmV0dXJuXCJcIn19fSgpOy8qKlxuICogQHByZXNlcnZlIGpRdWVyeSBEYXRlVGltZVBpY2tlclxuICogQGhvbWVwYWdlIGh0dHA6Ly94ZHNvZnQubmV0L2pxcGx1Z2lucy9kYXRldGltZXBpY2tlci9cbiAqIEBhdXRob3IgQ2h1cHVybm92IFZhbGVyaXkgKDxjaHVwdXJub3ZAZ21haWwuY29tPilcbiAqL1xuXG4vKipcbiAqIEBwYXJhbSB7alF1ZXJ5fSAkXG4gKi9cbnZhciBkYXRldGltZXBpY2tlckZhY3RvcnkgPSBmdW5jdGlvbiAoJCkge1xuXHQndXNlIHN0cmljdCc7XG5cblx0dmFyIGRlZmF1bHRfb3B0aW9ucyAgPSB7XG5cdFx0aTE4bjoge1xuXHRcdFx0YXI6IHsgLy8gQXJhYmljXG5cdFx0XHRcdG1vbnRoczogW1xuXHRcdFx0XHRcdFwi2YPYp9mG2YjZhiDYp9mE2KvYp9mG2YpcIiwgXCLYtNio2KfYt1wiLCBcItii2LDYp9ixXCIsIFwi2YbZitiz2KfZhlwiLCBcItmF2KfZitmIXCIsIFwi2K3YstmK2LHYp9mGXCIsIFwi2KrZhdmI2LJcIiwgXCLYotioXCIsIFwi2KPZitmE2YjZhFwiLCBcItiq2LTYsdmK2YYg2KfZhNij2YjZhFwiLCBcItiq2LTYsdmK2YYg2KfZhNir2KfZhtmKXCIsIFwi2YPYp9mG2YjZhiDYp9mE2KPZiNmEXCJcblx0XHRcdFx0XSxcblx0XHRcdFx0ZGF5T2ZXZWVrU2hvcnQ6IFtcblx0XHRcdFx0XHRcItmGXCIsIFwi2KtcIiwgXCLYuVwiLCBcItiuXCIsIFwi2KxcIiwgXCLYs1wiLCBcItitXCJcblx0XHRcdFx0XSxcblx0XHRcdFx0ZGF5T2ZXZWVrOiBbXCLYp9mE2KPYrdivXCIsIFwi2KfZhNin2KvZhtmK2YZcIiwgXCLYp9mE2KvZhNin2KvYp9ihXCIsIFwi2KfZhNij2LHYqNi52KfYoVwiLCBcItin2YTYrtmF2YrYs1wiLCBcItin2YTYrNmF2LnYqVwiLCBcItin2YTYs9io2KpcIiwgXCLYp9mE2KPYrdivXCJdXG5cdFx0XHR9LFxuXHRcdFx0cm86IHsgLy8gUm9tYW5pYW5cblx0XHRcdFx0bW9udGhzOiBbXG5cdFx0XHRcdFx0XCJJYW51YXJpZVwiLCBcIkZlYnJ1YXJpZVwiLCBcIk1hcnRpZVwiLCBcIkFwcmlsaWVcIiwgXCJNYWlcIiwgXCJJdW5pZVwiLCBcIkl1bGllXCIsIFwiQXVndXN0XCIsIFwiU2VwdGVtYnJpZVwiLCBcIk9jdG9tYnJpZVwiLCBcIk5vaWVtYnJpZVwiLCBcIkRlY2VtYnJpZVwiXG5cdFx0XHRcdF0sXG5cdFx0XHRcdGRheU9mV2Vla1Nob3J0OiBbXG5cdFx0XHRcdFx0XCJEdVwiLCBcIkx1XCIsIFwiTWFcIiwgXCJNaVwiLCBcIkpvXCIsIFwiVmlcIiwgXCJTw6JcIlxuXHRcdFx0XHRdLFxuXHRcdFx0XHRkYXlPZldlZWs6IFtcIkR1bWluaWPEg1wiLCBcIkx1bmlcIiwgXCJNYXLFo2lcIiwgXCJNaWVyY3VyaVwiLCBcIkpvaVwiLCBcIlZpbmVyaVwiLCBcIlPDom1ixIN0xINcIl1cblx0XHRcdH0sXG5cdFx0XHRpZDogeyAvLyBJbmRvbmVzaWFuXG5cdFx0XHRcdG1vbnRoczogW1xuXHRcdFx0XHRcdFwiSmFudWFyaVwiLCBcIkZlYnJ1YXJpXCIsIFwiTWFyZXRcIiwgXCJBcHJpbFwiLCBcIk1laVwiLCBcIkp1bmlcIiwgXCJKdWxpXCIsIFwiQWd1c3R1c1wiLCBcIlNlcHRlbWJlclwiLCBcIk9rdG9iZXJcIiwgXCJOb3ZlbWJlclwiLCBcIkRlc2VtYmVyXCJcblx0XHRcdFx0XSxcblx0XHRcdFx0ZGF5T2ZXZWVrU2hvcnQ6IFtcblx0XHRcdFx0XHRcIk1pblwiLCBcIlNlblwiLCBcIlNlbFwiLCBcIlJhYlwiLCBcIkthbVwiLCBcIkp1bVwiLCBcIlNhYlwiXG5cdFx0XHRcdF0sXG5cdFx0XHRcdGRheU9mV2VlazogW1wiTWluZ2d1XCIsIFwiU2VuaW5cIiwgXCJTZWxhc2FcIiwgXCJSYWJ1XCIsIFwiS2FtaXNcIiwgXCJKdW1hdFwiLCBcIlNhYnR1XCJdXG5cdFx0XHR9LFxuXHRcdFx0aXM6IHsgLy8gSWNlbGFuZGljXG5cdFx0XHRcdG1vbnRoczogW1xuXHRcdFx0XHRcdFwiSmFuw7phclwiLCBcIkZlYnLDumFyXCIsIFwiTWFyc1wiLCBcIkFwcsOtbFwiLCBcIk1hw61cIiwgXCJKw7puw61cIiwgXCJKw7psw61cIiwgXCLDgWfDunN0XCIsIFwiU2VwdGVtYmVyXCIsIFwiT2t0w7NiZXJcIiwgXCJOw7N2ZW1iZXJcIiwgXCJEZXNlbWJlclwiXG5cdFx0XHRcdF0sXG5cdFx0XHRcdGRheU9mV2Vla1Nob3J0OiBbXG5cdFx0XHRcdFx0XCJTdW5cIiwgXCJNw6FuXCIsIFwiw55yacOwXCIsIFwiTWnDsFwiLCBcIkZpbVwiLCBcIkbDtnNcIiwgXCJMYXVcIlxuXHRcdFx0XHRdLFxuXHRcdFx0XHRkYXlPZldlZWs6IFtcIlN1bm51ZGFndXJcIiwgXCJNw6FudWRhZ3VyXCIsIFwiw55yacOwanVkYWd1clwiLCBcIk1pw7B2aWt1ZGFndXJcIiwgXCJGaW1tdHVkYWd1clwiLCBcIkbDtnN0dWRhZ3VyXCIsIFwiTGF1Z2FyZGFndXJcIl1cblx0XHRcdH0sXG5cdFx0XHRiZzogeyAvLyBCdWxnYXJpYW5cblx0XHRcdFx0bW9udGhzOiBbXG5cdFx0XHRcdFx0XCLQr9C90YPQsNGA0LhcIiwgXCLQpNC10LLRgNGD0LDRgNC4XCIsIFwi0JzQsNGA0YJcIiwgXCLQkNC/0YDQuNC7XCIsIFwi0JzQsNC5XCIsIFwi0K7QvdC4XCIsIFwi0K7Qu9C4XCIsIFwi0JDQstCz0YPRgdGCXCIsIFwi0KHQtdC/0YLQtdC80LLRgNC4XCIsIFwi0J7QutGC0L7QvNCy0YDQuFwiLCBcItCd0L7QtdC80LLRgNC4XCIsIFwi0JTQtdC60LXQvNCy0YDQuFwiXG5cdFx0XHRcdF0sXG5cdFx0XHRcdGRheU9mV2Vla1Nob3J0OiBbXG5cdFx0XHRcdFx0XCLQndC0XCIsIFwi0J/QvVwiLCBcItCS0YJcIiwgXCLQodGAXCIsIFwi0KfRglwiLCBcItCf0YJcIiwgXCLQodCxXCJcblx0XHRcdFx0XSxcblx0XHRcdFx0ZGF5T2ZXZWVrOiBbXCLQndC10LTQtdC70Y9cIiwgXCLQn9C+0L3QtdC00LXQu9C90LjQulwiLCBcItCS0YLQvtGA0L3QuNC6XCIsIFwi0KHRgNGP0LTQsFwiLCBcItCn0LXRgtCy0YrRgNGC0YrQulwiLCBcItCf0LXRgtGK0LpcIiwgXCLQodGK0LHQvtGC0LBcIl1cblx0XHRcdH0sXG5cdFx0XHRmYTogeyAvLyBQZXJzaWFuL0ZhcnNpXG5cdFx0XHRcdG1vbnRoczogW1xuXHRcdFx0XHRcdCfZgdix2YjYsdiv24zZhicsICfYp9ix2K/bjNio2YfYtNiqJywgJ9iu2LHYr9in2K8nLCAn2KrbjNixJywgJ9mF2LHYr9in2K8nLCAn2LTZh9ix24zZiNixJywgJ9mF2YfYsScsICfYotio2KfZhicsICfYotiw2LEnLCAn2K/bjCcsICfYqNmH2YXZhicsICfYp9iz2YHZhtivJ1xuXHRcdFx0XHRdLFxuXHRcdFx0XHRkYXlPZldlZWtTaG9ydDogW1xuXHRcdFx0XHRcdCfbjNqp2LTZhtio2YcnLCAn2K/ZiNi02YbYqNmHJywgJ9iz2Ycg2LTZhtio2YcnLCAn2obZh9in2LHYtNmG2KjZhycsICfZvtmG2KzYtNmG2KjZhycsICfYrNmF2LnZhycsICfYtNmG2KjZhydcblx0XHRcdFx0XSxcblx0XHRcdFx0ZGF5T2ZXZWVrOiBbXCLbjNqp4oCM2LTZhtio2YdcIiwgXCLYr9mI2LTZhtio2YdcIiwgXCLYs9mH4oCM2LTZhtio2YdcIiwgXCLahtmH2KfYsdi02YbYqNmHXCIsIFwi2b7Zhtis4oCM2LTZhtio2YdcIiwgXCLYrNmF2LnZh1wiLCBcIti02YbYqNmHXCIsIFwi24zaqeKAjNi02YbYqNmHXCJdXG5cdFx0XHR9LFxuXHRcdFx0cnU6IHsgLy8gUnVzc2lhblxuXHRcdFx0XHRtb250aHM6IFtcblx0XHRcdFx0XHQn0K/QvdCy0LDRgNGMJywgJ9Ck0LXQstGA0LDQu9GMJywgJ9Cc0LDRgNGCJywgJ9CQ0L/RgNC10LvRjCcsICfQnNCw0LknLCAn0JjRjtC90YwnLCAn0JjRjtC70YwnLCAn0JDQstCz0YPRgdGCJywgJ9Ch0LXQvdGC0Y/QsdGA0YwnLCAn0J7QutGC0Y/QsdGA0YwnLCAn0J3QvtGP0LHRgNGMJywgJ9CU0LXQutCw0LHRgNGMJ1xuXHRcdFx0XHRdLFxuXHRcdFx0XHRkYXlPZldlZWtTaG9ydDogW1xuXHRcdFx0XHRcdFwi0JLRgVwiLCBcItCf0L1cIiwgXCLQktGCXCIsIFwi0KHRgFwiLCBcItCn0YJcIiwgXCLQn9GCXCIsIFwi0KHQsVwiXG5cdFx0XHRcdF0sXG5cdFx0XHRcdGRheU9mV2VlazogW1wi0JLQvtGB0LrRgNC10YHQtdC90YzQtVwiLCBcItCf0L7QvdC10LTQtdC70YzQvdC40LpcIiwgXCLQktGC0L7RgNC90LjQulwiLCBcItCh0YDQtdC00LBcIiwgXCLQp9C10YLQstC10YDQs1wiLCBcItCf0Y/RgtC90LjRhtCwXCIsIFwi0KHRg9Cx0LHQvtGC0LBcIl1cblx0XHRcdH0sXG5cdFx0XHR1azogeyAvLyBVa3JhaW5pYW5cblx0XHRcdFx0bW9udGhzOiBbXG5cdFx0XHRcdFx0J9Ch0ZbRh9C10L3RjCcsICfQm9GO0YLQuNC5JywgJ9CR0LXRgNC10LfQtdC90YwnLCAn0JrQstGW0YLQtdC90YwnLCAn0KLRgNCw0LLQtdC90YwnLCAn0KfQtdGA0LLQtdC90YwnLCAn0JvQuNC/0LXQvdGMJywgJ9Ch0LXRgNC/0LXQvdGMJywgJ9CS0LXRgNC10YHQtdC90YwnLCAn0JbQvtCy0YLQtdC90YwnLCAn0JvQuNGB0YLQvtC/0LDQtCcsICfQk9GA0YPQtNC10L3RjCdcblx0XHRcdFx0XSxcblx0XHRcdFx0ZGF5T2ZXZWVrU2hvcnQ6IFtcblx0XHRcdFx0XHRcItCd0LTQu1wiLCBcItCf0L3QtFwiLCBcItCS0YLRgFwiLCBcItCh0YDQtFwiLCBcItCn0YLQslwiLCBcItCf0YLQvVwiLCBcItCh0LHRglwiXG5cdFx0XHRcdF0sXG5cdFx0XHRcdGRheU9mV2VlazogW1wi0J3QtdC00ZbQu9GPXCIsIFwi0J/QvtC90LXQtNGW0LvQvtC6XCIsIFwi0JLRltCy0YLQvtGA0L7QulwiLCBcItCh0LXRgNC10LTQsFwiLCBcItCn0LXRgtCy0LXRgFwiLCBcItCfJ9GP0YLQvdC40YbRj1wiLCBcItCh0YPQsdC+0YLQsFwiXVxuXHRcdFx0fSxcblx0XHRcdGVuOiB7IC8vIEVuZ2xpc2hcblx0XHRcdFx0bW9udGhzOiBbXG5cdFx0XHRcdFx0XCJKYW51YXJ5XCIsIFwiRmVicnVhcnlcIiwgXCJNYXJjaFwiLCBcIkFwcmlsXCIsIFwiTWF5XCIsIFwiSnVuZVwiLCBcIkp1bHlcIiwgXCJBdWd1c3RcIiwgXCJTZXB0ZW1iZXJcIiwgXCJPY3RvYmVyXCIsIFwiTm92ZW1iZXJcIiwgXCJEZWNlbWJlclwiXG5cdFx0XHRcdF0sXG5cdFx0XHRcdGRheU9mV2Vla1Nob3J0OiBbXG5cdFx0XHRcdFx0XCJTdW5cIiwgXCJNb25cIiwgXCJUdWVcIiwgXCJXZWRcIiwgXCJUaHVcIiwgXCJGcmlcIiwgXCJTYXRcIlxuXHRcdFx0XHRdLFxuXHRcdFx0XHRkYXlPZldlZWs6IFtcIlN1bmRheVwiLCBcIk1vbmRheVwiLCBcIlR1ZXNkYXlcIiwgXCJXZWRuZXNkYXlcIiwgXCJUaHVyc2RheVwiLCBcIkZyaWRheVwiLCBcIlNhdHVyZGF5XCJdXG5cdFx0XHR9LFxuXHRcdFx0ZWw6IHsgLy8gzpXOu867zrfOvc65zrrOrFxuXHRcdFx0XHRtb250aHM6IFtcblx0XHRcdFx0XHRcIs6ZzrHOvc6/z4XOrM+BzrnOv8+CXCIsIFwizqbOtc6yz4HOv8+FzqzPgc65zr/PglwiLCBcIs6czqzPgc+EzrnOv8+CXCIsIFwizpHPgM+Bzq/Ou865zr/PglwiLCBcIs6czqzOuc6/z4JcIiwgXCLOmc6/z43Ovc65zr/PglwiLCBcIs6Zzr/Pjc67zrnOv8+CXCIsIFwizpHPjc6zzr/Phc+Dz4TOv8+CXCIsIFwizqPOtc+Az4TOrc68zrLPgc65zr/PglwiLCBcIs6fzrrPhM+OzrLPgc65zr/PglwiLCBcIs6dzr/Orc68zrLPgc65zr/PglwiLCBcIs6UzrXOus6tzrzOss+BzrnOv8+CXCJcblx0XHRcdFx0XSxcblx0XHRcdFx0ZGF5T2ZXZWVrU2hvcnQ6IFtcblx0XHRcdFx0XHRcIs6az4XPgVwiLCBcIs6UzrXPhVwiLCBcIs6kz4HOuVwiLCBcIs6kzrXPhFwiLCBcIs6gzrXOvFwiLCBcIs6gzrHPgVwiLCBcIs6jzrHOslwiXG5cdFx0XHRcdF0sXG5cdFx0XHRcdGRheU9mV2VlazogW1wizprPhc+BzrnOsc66zq5cIiwgXCLOlM61z4XPhM6tz4HOsVwiLCBcIs6kz4HOr8+EzrdcIiwgXCLOpM61z4TOrM+Bz4TOt1wiLCBcIs6gzq3OvM+Az4TOt1wiLCBcIs6gzrHPgc6xz4POus61z4XOrlwiLCBcIs6jzqzOss6yzrHPhM6/XCJdXG5cdFx0XHR9LFxuXHRcdFx0ZGU6IHsgLy8gR2VybWFuXG5cdFx0XHRcdG1vbnRoczogW1xuXHRcdFx0XHRcdCdKYW51YXInLCAnRmVicnVhcicsICdNw6RyeicsICdBcHJpbCcsICdNYWknLCAnSnVuaScsICdKdWxpJywgJ0F1Z3VzdCcsICdTZXB0ZW1iZXInLCAnT2t0b2JlcicsICdOb3ZlbWJlcicsICdEZXplbWJlcidcblx0XHRcdFx0XSxcblx0XHRcdFx0ZGF5T2ZXZWVrU2hvcnQ6IFtcblx0XHRcdFx0XHRcIlNvXCIsIFwiTW9cIiwgXCJEaVwiLCBcIk1pXCIsIFwiRG9cIiwgXCJGclwiLCBcIlNhXCJcblx0XHRcdFx0XSxcblx0XHRcdFx0ZGF5T2ZXZWVrOiBbXCJTb25udGFnXCIsIFwiTW9udGFnXCIsIFwiRGllbnN0YWdcIiwgXCJNaXR0d29jaFwiLCBcIkRvbm5lcnN0YWdcIiwgXCJGcmVpdGFnXCIsIFwiU2Ftc3RhZ1wiXVxuXHRcdFx0fSxcblx0XHRcdG5sOiB7IC8vIER1dGNoXG5cdFx0XHRcdG1vbnRoczogW1xuXHRcdFx0XHRcdFwiamFudWFyaVwiLCBcImZlYnJ1YXJpXCIsIFwibWFhcnRcIiwgXCJhcHJpbFwiLCBcIm1laVwiLCBcImp1bmlcIiwgXCJqdWxpXCIsIFwiYXVndXN0dXNcIiwgXCJzZXB0ZW1iZXJcIiwgXCJva3RvYmVyXCIsIFwibm92ZW1iZXJcIiwgXCJkZWNlbWJlclwiXG5cdFx0XHRcdF0sXG5cdFx0XHRcdGRheU9mV2Vla1Nob3J0OiBbXG5cdFx0XHRcdFx0XCJ6b1wiLCBcIm1hXCIsIFwiZGlcIiwgXCJ3b1wiLCBcImRvXCIsIFwidnJcIiwgXCJ6YVwiXG5cdFx0XHRcdF0sXG5cdFx0XHRcdGRheU9mV2VlazogW1wiem9uZGFnXCIsIFwibWFhbmRhZ1wiLCBcImRpbnNkYWdcIiwgXCJ3b2Vuc2RhZ1wiLCBcImRvbmRlcmRhZ1wiLCBcInZyaWpkYWdcIiwgXCJ6YXRlcmRhZ1wiXVxuXHRcdFx0fSxcblx0XHRcdHRyOiB7IC8vIFR1cmtpc2hcblx0XHRcdFx0bW9udGhzOiBbXG5cdFx0XHRcdFx0XCJPY2FrXCIsIFwixZ51YmF0XCIsIFwiTWFydFwiLCBcIk5pc2FuXCIsIFwiTWF5xLFzXCIsIFwiSGF6aXJhblwiLCBcIlRlbW11elwiLCBcIkHEn3VzdG9zXCIsIFwiRXlsw7xsXCIsIFwiRWtpbVwiLCBcIkthc8SxbVwiLCBcIkFyYWzEsWtcIlxuXHRcdFx0XHRdLFxuXHRcdFx0XHRkYXlPZldlZWtTaG9ydDogW1xuXHRcdFx0XHRcdFwiUGF6XCIsIFwiUHRzXCIsIFwiU2FsXCIsIFwiw4dhclwiLCBcIlBlclwiLCBcIkN1bVwiLCBcIkN0c1wiXG5cdFx0XHRcdF0sXG5cdFx0XHRcdGRheU9mV2VlazogW1wiUGF6YXJcIiwgXCJQYXphcnRlc2lcIiwgXCJTYWzEsVwiLCBcIsOHYXLFn2FtYmFcIiwgXCJQZXLFn2VtYmVcIiwgXCJDdW1hXCIsIFwiQ3VtYXJ0ZXNpXCJdXG5cdFx0XHR9LFxuXHRcdFx0ZnI6IHsgLy9GcmVuY2hcblx0XHRcdFx0bW9udGhzOiBbXG5cdFx0XHRcdFx0XCJKYW52aWVyXCIsIFwiRsOpdnJpZXJcIiwgXCJNYXJzXCIsIFwiQXZyaWxcIiwgXCJNYWlcIiwgXCJKdWluXCIsIFwiSnVpbGxldFwiLCBcIkFvw7t0XCIsIFwiU2VwdGVtYnJlXCIsIFwiT2N0b2JyZVwiLCBcIk5vdmVtYnJlXCIsIFwiRMOpY2VtYnJlXCJcblx0XHRcdFx0XSxcblx0XHRcdFx0ZGF5T2ZXZWVrU2hvcnQ6IFtcblx0XHRcdFx0XHRcIkRpbVwiLCBcIkx1blwiLCBcIk1hclwiLCBcIk1lclwiLCBcIkpldVwiLCBcIlZlblwiLCBcIlNhbVwiXG5cdFx0XHRcdF0sXG5cdFx0XHRcdGRheU9mV2VlazogW1wiZGltYW5jaGVcIiwgXCJsdW5kaVwiLCBcIm1hcmRpXCIsIFwibWVyY3JlZGlcIiwgXCJqZXVkaVwiLCBcInZlbmRyZWRpXCIsIFwic2FtZWRpXCJdXG5cdFx0XHR9LFxuXHRcdFx0ZXM6IHsgLy8gU3BhbmlzaFxuXHRcdFx0XHRtb250aHM6IFtcblx0XHRcdFx0XHRcIkVuZXJvXCIsIFwiRmVicmVyb1wiLCBcIk1hcnpvXCIsIFwiQWJyaWxcIiwgXCJNYXlvXCIsIFwiSnVuaW9cIiwgXCJKdWxpb1wiLCBcIkFnb3N0b1wiLCBcIlNlcHRpZW1icmVcIiwgXCJPY3R1YnJlXCIsIFwiTm92aWVtYnJlXCIsIFwiRGljaWVtYnJlXCJcblx0XHRcdFx0XSxcblx0XHRcdFx0ZGF5T2ZXZWVrU2hvcnQ6IFtcblx0XHRcdFx0XHRcIkRvbVwiLCBcIkx1blwiLCBcIk1hclwiLCBcIk1pw6lcIiwgXCJKdWVcIiwgXCJWaWVcIiwgXCJTw6FiXCJcblx0XHRcdFx0XSxcblx0XHRcdFx0ZGF5T2ZXZWVrOiBbXCJEb21pbmdvXCIsIFwiTHVuZXNcIiwgXCJNYXJ0ZXNcIiwgXCJNacOpcmNvbGVzXCIsIFwiSnVldmVzXCIsIFwiVmllcm5lc1wiLCBcIlPDoWJhZG9cIl1cblx0XHRcdH0sXG5cdFx0XHR0aDogeyAvLyBUaGFpXG5cdFx0XHRcdG1vbnRoczogW1xuXHRcdFx0XHRcdCfguKHguIHguKPguLLguITguKEnLCAn4LiB4Li44Lih4Lig4Liy4Lie4Lix4LiZ4LiY4LmMJywgJ+C4oeC4teC4meC4suC4hOC4oScsICfguYDguKHguKnguLLguKLguJknLCAn4Lie4Lik4Lip4Lig4Liy4LiE4LihJywgJ+C4oeC4tOC4luC4uOC4meC4suC4ouC4mScsICfguIHguKPguIHguI7guLLguITguKEnLCAn4Liq4Li04LiH4Lir4Liy4LiE4LihJywgJ+C4geC4seC4meC4ouC4suC4ouC4mScsICfguJXguLjguKXguLLguITguKEnLCAn4Lie4Lik4Lio4LiI4Li04LiB4Liy4Lii4LiZJywgJ+C4mOC4seC4meC4p+C4suC4hOC4oSdcblx0XHRcdFx0XSxcblx0XHRcdFx0ZGF5T2ZXZWVrU2hvcnQ6IFtcblx0XHRcdFx0XHQn4Lit4LiyLicsICfguIguJywgJ+C4rS4nLCAn4LieLicsICfguJ7guKQuJywgJ+C4qC4nLCAn4LiqLidcblx0XHRcdFx0XSxcblx0XHRcdFx0ZGF5T2ZXZWVrOiBbXCLguK3guLLguJfguLTguJXguKLguYxcIiwgXCLguIjguLHguJnguJfguKPguYxcIiwgXCLguK3guLHguIfguITguLLguKNcIiwgXCLguJ7guLjguJhcIiwgXCLguJ7guKTguKvguLHguKpcIiwgXCLguKjguLjguIHguKPguYxcIiwgXCLguYDguKrguLLguKPguYxcIiwgXCLguK3guLLguJfguLTguJXguKLguYxcIl1cblx0XHRcdH0sXG5cdFx0XHRwbDogeyAvLyBQb2xpc2hcblx0XHRcdFx0bW9udGhzOiBbXG5cdFx0XHRcdFx0XCJzdHljemXFhFwiLCBcImx1dHlcIiwgXCJtYXJ6ZWNcIiwgXCJrd2llY2llxYRcIiwgXCJtYWpcIiwgXCJjemVyd2llY1wiLCBcImxpcGllY1wiLCBcInNpZXJwaWXFhFwiLCBcIndyemVzaWXFhFwiLCBcInBhxbpkemllcm5pa1wiLCBcImxpc3RvcGFkXCIsIFwiZ3J1ZHppZcWEXCJcblx0XHRcdFx0XSxcblx0XHRcdFx0ZGF5T2ZXZWVrU2hvcnQ6IFtcblx0XHRcdFx0XHRcIm5kXCIsIFwicG5cIiwgXCJ3dFwiLCBcIsWbclwiLCBcImN6XCIsIFwicHRcIiwgXCJzYlwiXG5cdFx0XHRcdF0sXG5cdFx0XHRcdGRheU9mV2VlazogW1wibmllZHppZWxhXCIsIFwicG9uaWVkemlhxYJla1wiLCBcInd0b3Jla1wiLCBcIsWbcm9kYVwiLCBcImN6d2FydGVrXCIsIFwicGnEhXRla1wiLCBcInNvYm90YVwiXVxuXHRcdFx0fSxcblx0XHRcdHB0OiB7IC8vIFBvcnR1Z3Vlc2Vcblx0XHRcdFx0bW9udGhzOiBbXG5cdFx0XHRcdFx0XCJKYW5laXJvXCIsIFwiRmV2ZXJlaXJvXCIsIFwiTWFyw6dvXCIsIFwiQWJyaWxcIiwgXCJNYWlvXCIsIFwiSnVuaG9cIiwgXCJKdWxob1wiLCBcIkFnb3N0b1wiLCBcIlNldGVtYnJvXCIsIFwiT3V0dWJyb1wiLCBcIk5vdmVtYnJvXCIsIFwiRGV6ZW1icm9cIlxuXHRcdFx0XHRdLFxuXHRcdFx0XHRkYXlPZldlZWtTaG9ydDogW1xuXHRcdFx0XHRcdFwiRG9tXCIsIFwiU2VnXCIsIFwiVGVyXCIsIFwiUXVhXCIsIFwiUXVpXCIsIFwiU2V4XCIsIFwiU2FiXCJcblx0XHRcdFx0XSxcblx0XHRcdFx0ZGF5T2ZXZWVrOiBbXCJEb21pbmdvXCIsIFwiU2VndW5kYVwiLCBcIlRlcsOnYVwiLCBcIlF1YXJ0YVwiLCBcIlF1aW50YVwiLCBcIlNleHRhXCIsIFwiU8OhYmFkb1wiXVxuXHRcdFx0fSxcblx0XHRcdGNoOiB7IC8vIFNpbXBsaWZpZWQgQ2hpbmVzZVxuXHRcdFx0XHRtb250aHM6IFtcblx0XHRcdFx0XHRcIuS4gOaciFwiLCBcIuS6jOaciFwiLCBcIuS4ieaciFwiLCBcIuWbm+aciFwiLCBcIuS6lOaciFwiLCBcIuWFreaciFwiLCBcIuS4g+aciFwiLCBcIuWFq+aciFwiLCBcIuS5neaciFwiLCBcIuWNgeaciFwiLCBcIuWNgeS4gOaciFwiLCBcIuWNgeS6jOaciFwiXG5cdFx0XHRcdF0sXG5cdFx0XHRcdGRheU9mV2Vla1Nob3J0OiBbXG5cdFx0XHRcdFx0XCLml6VcIiwgXCLkuIBcIiwgXCLkuoxcIiwgXCLkuIlcIiwgXCLlm5tcIiwgXCLkupRcIiwgXCLlha1cIlxuXHRcdFx0XHRdXG5cdFx0XHR9LFxuXHRcdFx0c2U6IHsgLy8gU3dlZGlzaFxuXHRcdFx0XHRtb250aHM6IFtcblx0XHRcdFx0XHRcIkphbnVhcmlcIiwgXCJGZWJydWFyaVwiLCBcIk1hcnNcIiwgXCJBcHJpbFwiLCBcIk1halwiLCBcIkp1bmlcIiwgXCJKdWxpXCIsIFwiQXVndXN0aVwiLCBcIlNlcHRlbWJlclwiLCAgXCJPa3RvYmVyXCIsIFwiTm92ZW1iZXJcIiwgXCJEZWNlbWJlclwiXG5cdFx0XHRcdF0sXG5cdFx0XHRcdGRheU9mV2Vla1Nob3J0OiBbXG5cdFx0XHRcdFx0XCJTw7ZuXCIsIFwiTcOlblwiLCBcIlRpc1wiLCBcIk9uc1wiLCBcIlRvclwiLCBcIkZyZVwiLCBcIkzDtnJcIlxuXHRcdFx0XHRdXG5cdFx0XHR9LFxuXHRcdFx0a206IHsgLy8gS2htZXIgKOGel+GetuGen+GetuGegeGfkuGemOGfguGemilcblx0XHRcdFx0bW9udGhzOiBbXG5cdFx0XHRcdFx0XCLhnpjhnoDhnprhnrbigItcIiwgXCLhnoDhnrvhnpjhn5Lhnpfhn4hcIiwgXCLhnpjhnrfhnpPhnrbigItcIiwgXCLhnpjhn4Hhnp/hnrbigItcIiwgXCLhnqfhnp/hnpfhnrbigItcIiwgXCLhnpjhnrfhnpDhnrvhnpPhnrbigItcIiwgXCLhnoDhnoDhn5LhnoDhnorhnrbigItcIiwgXCLhnp/hnrjhnqDhnrbigItcIiwgXCLhnoDhnonhn5LhnonhnrbigItcIiwgXCLhno/hnrvhnpvhnrbigItcIiwgXCLhnpzhnrfhnoXhn5LhnobhnrfhnoDhnrZcIiwgXCLhnpLhn5LhnpPhnrzigItcIlxuXHRcdFx0XHRdLFxuXHRcdFx0XHRkYXlPZldlZWtTaG9ydDogW1wi4Z6i4Z624Z6R4Z634oCLXCIsIFwi4Z6F4Z+Q4Z6T4Z+S4Z6R4oCLXCIsIFwi4Z6i4Z6E4Z+S4Z6C4Z624Z6a4oCLXCIsIFwi4Z6W4Z674Z6S4oCLXCIsIFwi4Z6W4Z+S4Z6a4Z6g4oCL4oCLXCIsIFwi4Z6f4Z674Z6A4Z+S4Z6a4oCLXCIsIFwi4Z6f4Z+F4Z6a4Z+NXCJdLFxuXHRcdFx0XHRkYXlPZldlZWs6IFtcIuGeouGetuGekeGet+Gej+GfkuGemeKAi1wiLCBcIuGeheGfkOGek+GfkuGekeKAi1wiLCBcIuGeouGehOGfkuGeguGetuGemuKAi1wiLCBcIuGeluGeu+GekuKAi1wiLCBcIuGeluGfkuGemuGeoOGen+GfkuGelOGej+Get+GfjeKAi1wiLCBcIuGen+Geu+GegOGfkuGemuKAi1wiLCBcIuGen+GfheGemuGfjVwiXVxuXHRcdFx0fSxcblx0XHRcdGtyOiB7IC8vIEtvcmVhblxuXHRcdFx0XHRtb250aHM6IFtcblx0XHRcdFx0XHRcIjHsm5RcIiwgXCIy7JuUXCIsIFwiM+yblFwiLCBcIjTsm5RcIiwgXCI17JuUXCIsIFwiNuyblFwiLCBcIjfsm5RcIiwgXCI47JuUXCIsIFwiOeyblFwiLCBcIjEw7JuUXCIsIFwiMTHsm5RcIiwgXCIxMuyblFwiXG5cdFx0XHRcdF0sXG5cdFx0XHRcdGRheU9mV2Vla1Nob3J0OiBbXG5cdFx0XHRcdFx0XCLsnbxcIiwgXCLsm5RcIiwgXCLtmZRcIiwgXCLsiJhcIiwgXCLrqqlcIiwgXCLquIhcIiwgXCLthqBcIlxuXHRcdFx0XHRdLFxuXHRcdFx0XHRkYXlPZldlZWs6IFtcIuydvOyalOydvFwiLCBcIuyblOyalOydvFwiLCBcIu2ZlOyalOydvFwiLCBcIuyImOyalOydvFwiLCBcIuuqqeyalOydvFwiLCBcIuq4iOyalOydvFwiLCBcIu2GoOyalOydvFwiXVxuXHRcdFx0fSxcblx0XHRcdGl0OiB7IC8vIEl0YWxpYW5cblx0XHRcdFx0bW9udGhzOiBbXG5cdFx0XHRcdFx0XCJHZW5uYWlvXCIsIFwiRmViYnJhaW9cIiwgXCJNYXJ6b1wiLCBcIkFwcmlsZVwiLCBcIk1hZ2dpb1wiLCBcIkdpdWdub1wiLCBcIkx1Z2xpb1wiLCBcIkFnb3N0b1wiLCBcIlNldHRlbWJyZVwiLCBcIk90dG9icmVcIiwgXCJOb3ZlbWJyZVwiLCBcIkRpY2VtYnJlXCJcblx0XHRcdFx0XSxcblx0XHRcdFx0ZGF5T2ZXZWVrU2hvcnQ6IFtcblx0XHRcdFx0XHRcIkRvbVwiLCBcIkx1blwiLCBcIk1hclwiLCBcIk1lclwiLCBcIkdpb1wiLCBcIlZlblwiLCBcIlNhYlwiXG5cdFx0XHRcdF0sXG5cdFx0XHRcdGRheU9mV2VlazogW1wiRG9tZW5pY2FcIiwgXCJMdW5lZMOsXCIsIFwiTWFydGVkw6xcIiwgXCJNZXJjb2xlZMOsXCIsIFwiR2lvdmVkw6xcIiwgXCJWZW5lcmTDrFwiLCBcIlNhYmF0b1wiXVxuXHRcdFx0fSxcblx0XHRcdGRhOiB7IC8vIERhbnNrXG5cdFx0XHRcdG1vbnRoczogW1xuXHRcdFx0XHRcdFwiSmFudWFyXCIsIFwiRmVicnVhclwiLCBcIk1hcnRzXCIsIFwiQXByaWxcIiwgXCJNYWpcIiwgXCJKdW5pXCIsIFwiSnVsaVwiLCBcIkF1Z3VzdFwiLCBcIlNlcHRlbWJlclwiLCBcIk9rdG9iZXJcIiwgXCJOb3ZlbWJlclwiLCBcIkRlY2VtYmVyXCJcblx0XHRcdFx0XSxcblx0XHRcdFx0ZGF5T2ZXZWVrU2hvcnQ6IFtcblx0XHRcdFx0XHRcIlPDuG5cIiwgXCJNYW5cIiwgXCJUaXJcIiwgXCJPbnNcIiwgXCJUb3JcIiwgXCJGcmVcIiwgXCJMw7hyXCJcblx0XHRcdFx0XSxcblx0XHRcdFx0ZGF5T2ZXZWVrOiBbXCJzw7huZGFnXCIsIFwibWFuZGFnXCIsIFwidGlyc2RhZ1wiLCBcIm9uc2RhZ1wiLCBcInRvcnNkYWdcIiwgXCJmcmVkYWdcIiwgXCJsw7hyZGFnXCJdXG5cdFx0XHR9LFxuXHRcdFx0bm86IHsgLy8gTm9yd2VnaWFuXG5cdFx0XHRcdG1vbnRoczogW1xuXHRcdFx0XHRcdFwiSmFudWFyXCIsIFwiRmVicnVhclwiLCBcIk1hcnNcIiwgXCJBcHJpbFwiLCBcIk1haVwiLCBcIkp1bmlcIiwgXCJKdWxpXCIsIFwiQXVndXN0XCIsIFwiU2VwdGVtYmVyXCIsIFwiT2t0b2JlclwiLCBcIk5vdmVtYmVyXCIsIFwiRGVzZW1iZXJcIlxuXHRcdFx0XHRdLFxuXHRcdFx0XHRkYXlPZldlZWtTaG9ydDogW1xuXHRcdFx0XHRcdFwiU8O4blwiLCBcIk1hblwiLCBcIlRpclwiLCBcIk9uc1wiLCBcIlRvclwiLCBcIkZyZVwiLCBcIkzDuHJcIlxuXHRcdFx0XHRdLFxuXHRcdFx0XHRkYXlPZldlZWs6IFsnU8O4bmRhZycsICdNYW5kYWcnLCAnVGlyc2RhZycsICdPbnNkYWcnLCAnVG9yc2RhZycsICdGcmVkYWcnLCAnTMO4cmRhZyddXG5cdFx0XHR9LFxuXHRcdFx0amE6IHsgLy8gSmFwYW5lc2Vcblx0XHRcdFx0bW9udGhzOiBbXG5cdFx0XHRcdFx0XCIx5pyIXCIsIFwiMuaciFwiLCBcIjPmnIhcIiwgXCI05pyIXCIsIFwiNeaciFwiLCBcIjbmnIhcIiwgXCI35pyIXCIsIFwiOOaciFwiLCBcIjnmnIhcIiwgXCIxMOaciFwiLCBcIjEx5pyIXCIsIFwiMTLmnIhcIlxuXHRcdFx0XHRdLFxuXHRcdFx0XHRkYXlPZldlZWtTaG9ydDogW1xuXHRcdFx0XHRcdFwi5pelXCIsIFwi5pyIXCIsIFwi54GrXCIsIFwi5rC0XCIsIFwi5pyoXCIsIFwi6YeRXCIsIFwi5ZyfXCJcblx0XHRcdFx0XSxcblx0XHRcdFx0ZGF5T2ZXZWVrOiBbXCLml6Xmm5xcIiwgXCLmnIjmm5xcIiwgXCLngavmm5xcIiwgXCLmsLTmm5xcIiwgXCLmnKjmm5xcIiwgXCLph5Hmm5xcIiwgXCLlnJ/mm5xcIl1cblx0XHRcdH0sXG5cdFx0XHR2aTogeyAvLyBWaWV0bmFtZXNlXG5cdFx0XHRcdG1vbnRoczogW1xuXHRcdFx0XHRcdFwiVGjDoW5nIDFcIiwgXCJUaMOhbmcgMlwiLCBcIlRow6FuZyAzXCIsIFwiVGjDoW5nIDRcIiwgXCJUaMOhbmcgNVwiLCBcIlRow6FuZyA2XCIsIFwiVGjDoW5nIDdcIiwgXCJUaMOhbmcgOFwiLCBcIlRow6FuZyA5XCIsIFwiVGjDoW5nIDEwXCIsIFwiVGjDoW5nIDExXCIsIFwiVGjDoW5nIDEyXCJcblx0XHRcdFx0XSxcblx0XHRcdFx0ZGF5T2ZXZWVrU2hvcnQ6IFtcblx0XHRcdFx0XHRcIkNOXCIsIFwiVDJcIiwgXCJUM1wiLCBcIlQ0XCIsIFwiVDVcIiwgXCJUNlwiLCBcIlQ3XCJcblx0XHRcdFx0XSxcblx0XHRcdFx0ZGF5T2ZXZWVrOiBbXCJDaOG7pyBuaOG6rXRcIiwgXCJUaOG7qSBoYWlcIiwgXCJUaOG7qSBiYVwiLCBcIlRo4bupIHTGsFwiLCBcIlRo4bupIG7Eg21cIiwgXCJUaOG7qSBzw6F1XCIsIFwiVGjhu6kgYuG6o3lcIl1cblx0XHRcdH0sXG5cdFx0XHRzbDogeyAvLyBTbG92ZW7FocSNaW5hXG5cdFx0XHRcdG1vbnRoczogW1xuXHRcdFx0XHRcdFwiSmFudWFyXCIsIFwiRmVicnVhclwiLCBcIk1hcmVjXCIsIFwiQXByaWxcIiwgXCJNYWpcIiwgXCJKdW5palwiLCBcIkp1bGlqXCIsIFwiQXZndXN0XCIsIFwiU2VwdGVtYmVyXCIsIFwiT2t0b2JlclwiLCBcIk5vdmVtYmVyXCIsIFwiRGVjZW1iZXJcIlxuXHRcdFx0XHRdLFxuXHRcdFx0XHRkYXlPZldlZWtTaG9ydDogW1xuXHRcdFx0XHRcdFwiTmVkXCIsIFwiUG9uXCIsIFwiVG9yXCIsIFwiU3JlXCIsIFwixIxldFwiLCBcIlBldFwiLCBcIlNvYlwiXG5cdFx0XHRcdF0sXG5cdFx0XHRcdGRheU9mV2VlazogW1wiTmVkZWxqYVwiLCBcIlBvbmVkZWxqZWtcIiwgXCJUb3Jla1wiLCBcIlNyZWRhXCIsIFwixIxldHJ0ZWtcIiwgXCJQZXRla1wiLCBcIlNvYm90YVwiXVxuXHRcdFx0fSxcblx0XHRcdGNzOiB7IC8vIMSMZcWhdGluYVxuXHRcdFx0XHRtb250aHM6IFtcblx0XHRcdFx0XHRcIkxlZGVuXCIsIFwiw5pub3JcIiwgXCJCxZllemVuXCIsIFwiRHViZW5cIiwgXCJLdsSbdGVuXCIsIFwixIxlcnZlblwiLCBcIsSMZXJ2ZW5lY1wiLCBcIlNycGVuXCIsIFwiWsOhxZnDrVwiLCBcIsWYw61qZW5cIiwgXCJMaXN0b3BhZFwiLCBcIlByb3NpbmVjXCJcblx0XHRcdFx0XSxcblx0XHRcdFx0ZGF5T2ZXZWVrU2hvcnQ6IFtcblx0XHRcdFx0XHRcIk5lXCIsIFwiUG9cIiwgXCLDmnRcIiwgXCJTdFwiLCBcIsSMdFwiLCBcIlDDoVwiLCBcIlNvXCJcblx0XHRcdFx0XVxuXHRcdFx0fSxcblx0XHRcdGh1OiB7IC8vIEh1bmdhcmlhblxuXHRcdFx0XHRtb250aHM6IFtcblx0XHRcdFx0XHRcIkphbnXDoXJcIiwgXCJGZWJydcOhclwiLCBcIk3DoXJjaXVzXCIsIFwiw4FwcmlsaXNcIiwgXCJNw6FqdXNcIiwgXCJKw7puaXVzXCIsIFwiSsO6bGl1c1wiLCBcIkF1Z3VzenR1c1wiLCBcIlN6ZXB0ZW1iZXJcIiwgXCJPa3TDs2JlclwiLCBcIk5vdmVtYmVyXCIsIFwiRGVjZW1iZXJcIlxuXHRcdFx0XHRdLFxuXHRcdFx0XHRkYXlPZldlZWtTaG9ydDogW1xuXHRcdFx0XHRcdFwiVmFcIiwgXCJIw6lcIiwgXCJLZVwiLCBcIlN6ZVwiLCBcIkNzXCIsIFwiUMOpXCIsIFwiU3pvXCJcblx0XHRcdFx0XSxcblx0XHRcdFx0ZGF5T2ZXZWVrOiBbXCJ2YXPDoXJuYXBcIiwgXCJow6l0ZsWRXCIsIFwia2VkZFwiLCBcInN6ZXJkYVwiLCBcImNzw7x0w7ZydMO2a1wiLCBcInDDqW50ZWtcIiwgXCJzem9tYmF0XCJdXG5cdFx0XHR9LFxuXHRcdFx0YXo6IHsgLy9BemVyYmFpamFuaWFuIChBemVyaSlcblx0XHRcdFx0bW9udGhzOiBbXG5cdFx0XHRcdFx0XCJZYW52YXJcIiwgXCJGZXZyYWxcIiwgXCJNYXJ0XCIsIFwiQXByZWxcIiwgXCJNYXlcIiwgXCJJeXVuXCIsIFwiSXl1bFwiLCBcIkF2cXVzdFwiLCBcIlNlbnR5YWJyXCIsIFwiT2t0eWFiclwiLCBcIk5veWFiclwiLCBcIkRla2FiclwiXG5cdFx0XHRcdF0sXG5cdFx0XHRcdGRheU9mV2Vla1Nob3J0OiBbXG5cdFx0XHRcdFx0XCJCXCIsIFwiQmVcIiwgXCLDh2FcIiwgXCLDh1wiLCBcIkNhXCIsIFwiQ1wiLCBcIsWeXCJcblx0XHRcdFx0XSxcblx0XHRcdFx0ZGF5T2ZXZWVrOiBbXCJCYXphclwiLCBcIkJhemFyIGVydMmZc2lcIiwgXCLDh8mZcsWfyZluYsmZIGF4xZ9hbcSxXCIsIFwiw4fJmXLFn8mZbmLJmVwiLCBcIkPDvG3JmSBheMWfYW3EsVwiLCBcIkPDvG3JmVwiLCBcIsWeyZluYsmZXCJdXG5cdFx0XHR9LFxuXHRcdFx0YnM6IHsgLy9Cb3NhbnNraVxuXHRcdFx0XHRtb250aHM6IFtcblx0XHRcdFx0XHRcIkphbnVhclwiLCBcIkZlYnJ1YXJcIiwgXCJNYXJ0XCIsIFwiQXByaWxcIiwgXCJNYWpcIiwgXCJKdW5cIiwgXCJKdWxcIiwgXCJBdmd1c3RcIiwgXCJTZXB0ZW1iYXJcIiwgXCJPa3RvYmFyXCIsIFwiTm92ZW1iYXJcIiwgXCJEZWNlbWJhclwiXG5cdFx0XHRcdF0sXG5cdFx0XHRcdGRheU9mV2Vla1Nob3J0OiBbXG5cdFx0XHRcdFx0XCJOZWRcIiwgXCJQb25cIiwgXCJVdG9cIiwgXCJTcmlcIiwgXCLEjGV0XCIsIFwiUGV0XCIsIFwiU3ViXCJcblx0XHRcdFx0XSxcblx0XHRcdFx0ZGF5T2ZXZWVrOiBbXCJOZWRqZWxqYVwiLFwiUG9uZWRqZWxqYWtcIiwgXCJVdG9yYWtcIiwgXCJTcmlqZWRhXCIsIFwixIxldHZydGFrXCIsIFwiUGV0YWtcIiwgXCJTdWJvdGFcIl1cblx0XHRcdH0sXG5cdFx0XHRjYTogeyAvL0NhdGFsw6Bcblx0XHRcdFx0bW9udGhzOiBbXG5cdFx0XHRcdFx0XCJHZW5lclwiLCBcIkZlYnJlclwiLCBcIk1hcsOnXCIsIFwiQWJyaWxcIiwgXCJNYWlnXCIsIFwiSnVueVwiLCBcIkp1bGlvbFwiLCBcIkFnb3N0XCIsIFwiU2V0ZW1icmVcIiwgXCJPY3R1YnJlXCIsIFwiTm92ZW1icmVcIiwgXCJEZXNlbWJyZVwiXG5cdFx0XHRcdF0sXG5cdFx0XHRcdGRheU9mV2Vla1Nob3J0OiBbXG5cdFx0XHRcdFx0XCJEZ1wiLCBcIkRsXCIsIFwiRHRcIiwgXCJEY1wiLCBcIkRqXCIsIFwiRHZcIiwgXCJEc1wiXG5cdFx0XHRcdF0sXG5cdFx0XHRcdGRheU9mV2VlazogW1wiRGl1bWVuZ2VcIiwgXCJEaWxsdW5zXCIsIFwiRGltYXJ0c1wiLCBcIkRpbWVjcmVzXCIsIFwiRGlqb3VzXCIsIFwiRGl2ZW5kcmVzXCIsIFwiRGlzc2FidGVcIl1cblx0XHRcdH0sXG5cdFx0XHQnZW4tR0InOiB7IC8vRW5nbGlzaCAoQnJpdGlzaClcblx0XHRcdFx0bW9udGhzOiBbXG5cdFx0XHRcdFx0XCJKYW51YXJ5XCIsIFwiRmVicnVhcnlcIiwgXCJNYXJjaFwiLCBcIkFwcmlsXCIsIFwiTWF5XCIsIFwiSnVuZVwiLCBcIkp1bHlcIiwgXCJBdWd1c3RcIiwgXCJTZXB0ZW1iZXJcIiwgXCJPY3RvYmVyXCIsIFwiTm92ZW1iZXJcIiwgXCJEZWNlbWJlclwiXG5cdFx0XHRcdF0sXG5cdFx0XHRcdGRheU9mV2Vla1Nob3J0OiBbXG5cdFx0XHRcdFx0XCJTdW5cIiwgXCJNb25cIiwgXCJUdWVcIiwgXCJXZWRcIiwgXCJUaHVcIiwgXCJGcmlcIiwgXCJTYXRcIlxuXHRcdFx0XHRdLFxuXHRcdFx0XHRkYXlPZldlZWs6IFtcIlN1bmRheVwiLCBcIk1vbmRheVwiLCBcIlR1ZXNkYXlcIiwgXCJXZWRuZXNkYXlcIiwgXCJUaHVyc2RheVwiLCBcIkZyaWRheVwiLCBcIlNhdHVyZGF5XCJdXG5cdFx0XHR9LFxuXHRcdFx0ZXQ6IHsgLy9cIkVlc3RpXCJcblx0XHRcdFx0bW9udGhzOiBbXG5cdFx0XHRcdFx0XCJKYWFudWFyXCIsIFwiVmVlYnJ1YXJcIiwgXCJNw6RydHNcIiwgXCJBcHJpbGxcIiwgXCJNYWlcIiwgXCJKdXVuaVwiLCBcIkp1dWxpXCIsIFwiQXVndXN0XCIsIFwiU2VwdGVtYmVyXCIsIFwiT2t0b29iZXJcIiwgXCJOb3ZlbWJlclwiLCBcIkRldHNlbWJlclwiXG5cdFx0XHRcdF0sXG5cdFx0XHRcdGRheU9mV2Vla1Nob3J0OiBbXG5cdFx0XHRcdFx0XCJQXCIsIFwiRVwiLCBcIlRcIiwgXCJLXCIsIFwiTlwiLCBcIlJcIiwgXCJMXCJcblx0XHRcdFx0XSxcblx0XHRcdFx0ZGF5T2ZXZWVrOiBbXCJQw7xoYXDDpGV2XCIsIFwiRXNtYXNww6RldlwiLCBcIlRlaXNpcMOkZXZcIiwgXCJLb2xtYXDDpGV2XCIsIFwiTmVsamFww6RldlwiLCBcIlJlZWRlXCIsIFwiTGF1cMOkZXZcIl1cblx0XHRcdH0sXG5cdFx0XHRldTogeyAvL0V1c2thcmFcblx0XHRcdFx0bW9udGhzOiBbXG5cdFx0XHRcdFx0XCJVcnRhcnJpbGFcIiwgXCJPdHNhaWxhXCIsIFwiTWFydHhvYVwiLCBcIkFwaXJpbGFcIiwgXCJNYWlhdHphXCIsIFwiRWthaW5hXCIsIFwiVXp0YWlsYVwiLCBcIkFidXp0dWFcIiwgXCJJcmFpbGFcIiwgXCJVcnJpYVwiLCBcIkF6YXJvYVwiLCBcIkFiZW5kdWFcIlxuXHRcdFx0XHRdLFxuXHRcdFx0XHRkYXlPZldlZWtTaG9ydDogW1xuXHRcdFx0XHRcdFwiSWcuXCIsIFwiQWwuXCIsIFwiQXIuXCIsIFwiQXouXCIsIFwiT2cuXCIsIFwiT3IuXCIsIFwiTGEuXCJcblx0XHRcdFx0XSxcblx0XHRcdFx0ZGF5T2ZXZWVrOiBbJ0lnYW5kZWEnLCAnQXN0ZWxlaGVuYScsICdBc3RlYXJ0ZWEnLCAnQXN0ZWF6a2VuYScsICdPc3RlZ3VuYScsICdPc3RpcmFsYScsICdMYXJ1bmJhdGEnXVxuXHRcdFx0fSxcblx0XHRcdGZpOiB7IC8vRmlubmlzaCAoU3VvbWkpXG5cdFx0XHRcdG1vbnRoczogW1xuXHRcdFx0XHRcdFwiVGFtbWlrdXVcIiwgXCJIZWxtaWt1dVwiLCBcIk1hYWxpc2t1dVwiLCBcIkh1aHRpa3V1XCIsIFwiVG91a29rdXVcIiwgXCJLZXPDpGt1dVwiLCBcIkhlaW7DpGt1dVwiLCBcIkVsb2t1dVwiLCBcIlN5eXNrdXVcIiwgXCJMb2tha3V1XCIsIFwiTWFycmFza3V1XCIsIFwiSm91bHVrdXVcIlxuXHRcdFx0XHRdLFxuXHRcdFx0XHRkYXlPZldlZWtTaG9ydDogW1xuXHRcdFx0XHRcdFwiU3VcIiwgXCJNYVwiLCBcIlRpXCIsIFwiS2VcIiwgXCJUb1wiLCBcIlBlXCIsIFwiTGFcIlxuXHRcdFx0XHRdLFxuXHRcdFx0XHRkYXlPZldlZWs6IFtcInN1bm51bnRhaVwiLCBcIm1hYW5hbnRhaVwiLCBcInRpaXN0YWlcIiwgXCJrZXNraXZpaWtrb1wiLCBcInRvcnN0YWlcIiwgXCJwZXJqYW50YWlcIiwgXCJsYXVhbnRhaVwiXVxuXHRcdFx0fSxcblx0XHRcdGdsOiB7IC8vR2FsZWdvXG5cdFx0XHRcdG1vbnRoczogW1xuXHRcdFx0XHRcdFwiWGFuXCIsIFwiRmViXCIsIFwiTWF6XCIsIFwiQWJyXCIsIFwiTWFpXCIsIFwiWHVuXCIsIFwiWHVsXCIsIFwiQWdvXCIsIFwiU2V0XCIsIFwiT3V0XCIsIFwiTm92XCIsIFwiRGVjXCJcblx0XHRcdFx0XSxcblx0XHRcdFx0ZGF5T2ZXZWVrU2hvcnQ6IFtcblx0XHRcdFx0XHRcIkRvbVwiLCBcIkx1blwiLCBcIk1hclwiLCBcIk1lclwiLCBcIlhvdlwiLCBcIlZlblwiLCBcIlNhYlwiXG5cdFx0XHRcdF0sXG5cdFx0XHRcdGRheU9mV2VlazogW1wiRG9taW5nb1wiLCBcIkx1bnNcIiwgXCJNYXJ0ZXNcIiwgXCJNw6lyY29yZXNcIiwgXCJYb3Zlc1wiLCBcIlZlbnJlc1wiLCBcIlPDoWJhZG9cIl1cblx0XHRcdH0sXG5cdFx0XHRocjogeyAvL0hydmF0c2tpXG5cdFx0XHRcdG1vbnRoczogW1xuXHRcdFx0XHRcdFwiU2lqZcSNYW5qXCIsIFwiVmVsamHEjWFcIiwgXCJPxb51amFrXCIsIFwiVHJhdmFualwiLCBcIlN2aWJhbmpcIiwgXCJMaXBhbmpcIiwgXCJTcnBhbmpcIiwgXCJLb2xvdm96XCIsIFwiUnVqYW5cIiwgXCJMaXN0b3BhZFwiLCBcIlN0dWRlbmlcIiwgXCJQcm9zaW5hY1wiXG5cdFx0XHRcdF0sXG5cdFx0XHRcdGRheU9mV2Vla1Nob3J0OiBbXG5cdFx0XHRcdFx0XCJOZWRcIiwgXCJQb25cIiwgXCJVdG9cIiwgXCJTcmlcIiwgXCLEjGV0XCIsIFwiUGV0XCIsIFwiU3ViXCJcblx0XHRcdFx0XSxcblx0XHRcdFx0ZGF5T2ZXZWVrOiBbXCJOZWRqZWxqYVwiLCBcIlBvbmVkamVsamFrXCIsIFwiVXRvcmFrXCIsIFwiU3JpamVkYVwiLCBcIsSMZXR2cnRha1wiLCBcIlBldGFrXCIsIFwiU3Vib3RhXCJdXG5cdFx0XHR9LFxuXHRcdFx0a286IHsgLy9Lb3JlYW4gKO2VnOq1reyWtClcblx0XHRcdFx0bW9udGhzOiBbXG5cdFx0XHRcdFx0XCIx7JuUXCIsIFwiMuyblFwiLCBcIjPsm5RcIiwgXCI07JuUXCIsIFwiNeyblFwiLCBcIjbsm5RcIiwgXCI37JuUXCIsIFwiOOyblFwiLCBcIjnsm5RcIiwgXCIxMOyblFwiLCBcIjEx7JuUXCIsIFwiMTLsm5RcIlxuXHRcdFx0XHRdLFxuXHRcdFx0XHRkYXlPZldlZWtTaG9ydDogW1xuXHRcdFx0XHRcdFwi7J28XCIsIFwi7JuUXCIsIFwi7ZmUXCIsIFwi7IiYXCIsIFwi66qpXCIsIFwi6riIXCIsIFwi7YagXCJcblx0XHRcdFx0XSxcblx0XHRcdFx0ZGF5T2ZXZWVrOiBbXCLsnbzsmpTsnbxcIiwgXCLsm5TsmpTsnbxcIiwgXCLtmZTsmpTsnbxcIiwgXCLsiJjsmpTsnbxcIiwgXCLrqqnsmpTsnbxcIiwgXCLquIjsmpTsnbxcIiwgXCLthqDsmpTsnbxcIl1cblx0XHRcdH0sXG5cdFx0XHRsdDogeyAvL0xpdGh1YW5pYW4gKGxpZXR1dmnFsylcblx0XHRcdFx0bW9udGhzOiBbXG5cdFx0XHRcdFx0XCJTYXVzaW9cIiwgXCJWYXNhcmlvXCIsIFwiS292b1wiLCBcIkJhbGFuZMW+aW9cIiwgXCJHZWd1xb7El3NcIiwgXCJCaXLFvmVsaW9cIiwgXCJMaWVwb3NcIiwgXCJSdWdwasWrxI1pb1wiLCBcIlJ1Z3PEl2pvXCIsIFwiU3BhbGlvXCIsIFwiTGFwa3JpxI1pb1wiLCBcIkdydW9kxb5pb1wiXG5cdFx0XHRcdF0sXG5cdFx0XHRcdGRheU9mV2Vla1Nob3J0OiBbXG5cdFx0XHRcdFx0XCJTZWtcIiwgXCJQaXJcIiwgXCJBbnRcIiwgXCJUcmVcIiwgXCJLZXRcIiwgXCJQZW5cIiwgXCLFoGXFoVwiXG5cdFx0XHRcdF0sXG5cdFx0XHRcdGRheU9mV2VlazogW1wiU2VrbWFkaWVuaXNcIiwgXCJQaXJtYWRpZW5pc1wiLCBcIkFudHJhZGllbmlzXCIsIFwiVHJlxI1pYWRpZW5pc1wiLCBcIktldHZpcnRhZGllbmlzXCIsIFwiUGVua3RhZGllbmlzXCIsIFwixaBlxaF0YWRpZW5pc1wiXVxuXHRcdFx0fSxcblx0XHRcdGx2OiB7IC8vTGF0dmlhbiAoTGF0dmllxaF1KVxuXHRcdFx0XHRtb250aHM6IFtcblx0XHRcdFx0XHRcIkphbnbEgXJpc1wiLCBcIkZlYnJ1xIFyaXNcIiwgXCJNYXJ0c1wiLCBcIkFwcsSrbGlzIFwiLCBcIk1haWpzXCIsIFwiSsWrbmlqc1wiLCBcIkrFq2xpanNcIiwgXCJBdWd1c3RzXCIsIFwiU2VwdGVtYnJpc1wiLCBcIk9rdG9icmlzXCIsIFwiTm92ZW1icmlzXCIsIFwiRGVjZW1icmlzXCJcblx0XHRcdFx0XSxcblx0XHRcdFx0ZGF5T2ZXZWVrU2hvcnQ6IFtcblx0XHRcdFx0XHRcIlN2XCIsIFwiUHJcIiwgXCJPdFwiLCBcIlRyXCIsIFwiQ3RcIiwgXCJQa1wiLCBcIlN0XCJcblx0XHRcdFx0XSxcblx0XHRcdFx0ZGF5T2ZXZWVrOiBbXCJTdsSTdGRpZW5hXCIsIFwiUGlybWRpZW5hXCIsIFwiT3RyZGllbmFcIiwgXCJUcmXFoWRpZW5hXCIsIFwiQ2V0dXJ0ZGllbmFcIiwgXCJQaWVrdGRpZW5hXCIsIFwiU2VzdGRpZW5hXCJdXG5cdFx0XHR9LFxuXHRcdFx0bWs6IHsgLy9NYWNlZG9uaWFuICjQnNCw0LrQtdC00L7QvdGB0LrQuClcblx0XHRcdFx0bW9udGhzOiBbXG5cdFx0XHRcdFx0XCLRmNCw0L3Rg9Cw0YDQuFwiLCBcItGE0LXQstGA0YPQsNGA0LhcIiwgXCLQvNCw0YDRglwiLCBcItCw0L/RgNC40LtcIiwgXCLQvNCw0ZhcIiwgXCLRmNGD0L3QuFwiLCBcItGY0YPQu9C4XCIsIFwi0LDQstCz0YPRgdGCXCIsIFwi0YHQtdC/0YLQtdC80LLRgNC4XCIsIFwi0L7QutGC0L7QvNCy0YDQuFwiLCBcItC90L7QtdC80LLRgNC4XCIsIFwi0LTQtdC60LXQvNCy0YDQuFwiXG5cdFx0XHRcdF0sXG5cdFx0XHRcdGRheU9mV2Vla1Nob3J0OiBbXG5cdFx0XHRcdFx0XCLQvdC10LRcIiwgXCLQv9C+0L1cIiwgXCLQstGC0L5cIiwgXCLRgdGA0LVcIiwgXCLRh9C10YJcIiwgXCLQv9C10YJcIiwgXCLRgdCw0LFcIlxuXHRcdFx0XHRdLFxuXHRcdFx0XHRkYXlPZldlZWs6IFtcItCd0LXQtNC10LvQsFwiLCBcItCf0L7QvdC10LTQtdC70L3QuNC6XCIsIFwi0JLRgtC+0YDQvdC40LpcIiwgXCLQodGA0LXQtNCwXCIsIFwi0KfQtdGC0LLRgNGC0L7QulwiLCBcItCf0LXRgtC+0LpcIiwgXCLQodCw0LHQvtGC0LBcIl1cblx0XHRcdH0sXG5cdFx0XHRtbjogeyAvL01vbmdvbGlhbiAo0JzQvtC90LPQvtC7KVxuXHRcdFx0XHRtb250aHM6IFtcblx0XHRcdFx0XHRcIjEt0YAg0YHQsNGAXCIsIFwiMi3RgCDRgdCw0YBcIiwgXCIzLdGAINGB0LDRgFwiLCBcIjQt0YAg0YHQsNGAXCIsIFwiNS3RgCDRgdCw0YBcIiwgXCI2LdGAINGB0LDRgFwiLCBcIjct0YAg0YHQsNGAXCIsIFwiOC3RgCDRgdCw0YBcIiwgXCI5LdGAINGB0LDRgFwiLCBcIjEwLdGAINGB0LDRgFwiLCBcIjExLdGAINGB0LDRgFwiLCBcIjEyLdGAINGB0LDRgFwiXG5cdFx0XHRcdF0sXG5cdFx0XHRcdGRheU9mV2Vla1Nob3J0OiBbXG5cdFx0XHRcdFx0XCLQlNCw0LJcIiwgXCLQnNGP0LNcIiwgXCLQm9GF0LBcIiwgXCLQn9Kv0YBcIiwgXCLQkdGB0L1cIiwgXCLQkdGP0LxcIiwgXCLQndGP0LxcIlxuXHRcdFx0XHRdLFxuXHRcdFx0XHRkYXlPZldlZWs6IFtcItCU0LDQstCw0LBcIiwgXCLQnNGP0LPQvNCw0YBcIiwgXCLQm9GF0LDQs9Cy0LBcIiwgXCLQn9Kv0YDRjdCyXCIsIFwi0JHQsNCw0YHQsNC9XCIsIFwi0JHRj9C80LHQsFwiLCBcItCd0Y/QvFwiXVxuXHRcdFx0fSxcblx0XHRcdCdwdC1CUic6IHsgLy9Qb3J0dWd1w6pzKEJyYXNpbClcblx0XHRcdFx0bW9udGhzOiBbXG5cdFx0XHRcdFx0XCJKYW5laXJvXCIsIFwiRmV2ZXJlaXJvXCIsIFwiTWFyw6dvXCIsIFwiQWJyaWxcIiwgXCJNYWlvXCIsIFwiSnVuaG9cIiwgXCJKdWxob1wiLCBcIkFnb3N0b1wiLCBcIlNldGVtYnJvXCIsIFwiT3V0dWJyb1wiLCBcIk5vdmVtYnJvXCIsIFwiRGV6ZW1icm9cIlxuXHRcdFx0XHRdLFxuXHRcdFx0XHRkYXlPZldlZWtTaG9ydDogW1xuXHRcdFx0XHRcdFwiRG9tXCIsIFwiU2VnXCIsIFwiVGVyXCIsIFwiUXVhXCIsIFwiUXVpXCIsIFwiU2V4XCIsIFwiU8OhYlwiXG5cdFx0XHRcdF0sXG5cdFx0XHRcdGRheU9mV2VlazogW1wiRG9taW5nb1wiLCBcIlNlZ3VuZGFcIiwgXCJUZXLDp2FcIiwgXCJRdWFydGFcIiwgXCJRdWludGFcIiwgXCJTZXh0YVwiLCBcIlPDoWJhZG9cIl1cblx0XHRcdH0sXG5cdFx0XHRzazogeyAvL1Nsb3ZlbsSNaW5hXG5cdFx0XHRcdG1vbnRoczogW1xuXHRcdFx0XHRcdFwiSmFudcOhclwiLCBcIkZlYnJ1w6FyXCIsIFwiTWFyZWNcIiwgXCJBcHLDrWxcIiwgXCJNw6FqXCIsIFwiSsO6blwiLCBcIkrDumxcIiwgXCJBdWd1c3RcIiwgXCJTZXB0ZW1iZXJcIiwgXCJPa3TDs2JlclwiLCBcIk5vdmVtYmVyXCIsIFwiRGVjZW1iZXJcIlxuXHRcdFx0XHRdLFxuXHRcdFx0XHRkYXlPZldlZWtTaG9ydDogW1xuXHRcdFx0XHRcdFwiTmVcIiwgXCJQb1wiLCBcIlV0XCIsIFwiU3RcIiwgXCLFoHRcIiwgXCJQaVwiLCBcIlNvXCJcblx0XHRcdFx0XSxcblx0XHRcdFx0ZGF5T2ZXZWVrOiBbXCJOZWRlxL5hXCIsIFwiUG9uZGVsb2tcIiwgXCJVdG9yb2tcIiwgXCJTdHJlZGFcIiwgXCLFoHR2cnRva1wiLCBcIlBpYXRva1wiLCBcIlNvYm90YVwiXVxuXHRcdFx0fSxcblx0XHRcdHNxOiB7IC8vQWxiYW5pYW4gKFNocWlwKVxuXHRcdFx0XHRtb250aHM6IFtcblx0XHRcdFx0XHRcIkphbmFyXCIsIFwiU2hrdXJ0XCIsIFwiTWFyc1wiLCBcIlByaWxsXCIsIFwiTWFqXCIsIFwiUWVyc2hvclwiLCBcIktvcnJpa1wiLCBcIkd1c2h0XCIsIFwiU2h0YXRvclwiLCBcIlRldG9yXCIsIFwiTsOrbnRvclwiLCBcIkRoamV0b3JcIlxuXHRcdFx0XHRdLFxuXHRcdFx0XHRkYXlPZldlZWtTaG9ydDogW1xuXHRcdFx0XHRcdFwiRGllXCIsIFwiSMOrblwiLCBcIk1hclwiLCBcIk3Dq3JcIiwgXCJFbmpcIiwgXCJQcmVcIiwgXCJTaHR1XCJcblx0XHRcdFx0XSxcblx0XHRcdFx0ZGF5T2ZXZWVrOiBbXCJFIERpZWxcIiwgXCJFIEjDq27Dq1wiLCBcIkUgTWFydMSTXCIsIFwiRSBNw6tya3Vyw6tcIiwgXCJFIEVuanRlXCIsIFwiRSBQcmVtdGVcIiwgXCJFIFNodHVuw6tcIl1cblx0XHRcdH0sXG5cdFx0XHQnc3ItWVUnOiB7IC8vU2VyYmlhbiAoU3Jwc2tpKVxuXHRcdFx0XHRtb250aHM6IFtcblx0XHRcdFx0XHRcIkphbnVhclwiLCBcIkZlYnJ1YXJcIiwgXCJNYXJ0XCIsIFwiQXByaWxcIiwgXCJNYWpcIiwgXCJKdW5cIiwgXCJKdWxcIiwgXCJBdmd1c3RcIiwgXCJTZXB0ZW1iYXJcIiwgXCJPa3RvYmFyXCIsIFwiTm92ZW1iYXJcIiwgXCJEZWNlbWJhclwiXG5cdFx0XHRcdF0sXG5cdFx0XHRcdGRheU9mV2Vla1Nob3J0OiBbXG5cdFx0XHRcdFx0XCJOZWRcIiwgXCJQb25cIiwgXCJVdG9cIiwgXCJTcmVcIiwgXCLEjWV0XCIsIFwiUGV0XCIsIFwiU3ViXCJcblx0XHRcdFx0XSxcblx0XHRcdFx0ZGF5T2ZXZWVrOiBbXCJOZWRlbGphXCIsXCJQb25lZGVsamFrXCIsIFwiVXRvcmFrXCIsIFwiU3JlZGFcIiwgXCLEjGV0dnJ0YWtcIiwgXCJQZXRha1wiLCBcIlN1Ym90YVwiXVxuXHRcdFx0fSxcblx0XHRcdHNyOiB7IC8vU2VyYmlhbiBDeXJpbGxpYyAo0KHRgNC/0YHQutC4KVxuXHRcdFx0XHRtb250aHM6IFtcblx0XHRcdFx0XHRcItGY0LDQvdGD0LDRgFwiLCBcItGE0LXQsdGA0YPQsNGAXCIsIFwi0LzQsNGA0YJcIiwgXCLQsNC/0YDQuNC7XCIsIFwi0LzQsNGYXCIsIFwi0ZjRg9C9XCIsIFwi0ZjRg9C7XCIsIFwi0LDQstCz0YPRgdGCXCIsIFwi0YHQtdC/0YLQtdC80LHQsNGAXCIsIFwi0L7QutGC0L7QsdCw0YBcIiwgXCLQvdC+0LLQtdC80LHQsNGAXCIsIFwi0LTQtdGG0LXQvNCx0LDRgFwiXG5cdFx0XHRcdF0sXG5cdFx0XHRcdGRheU9mV2Vla1Nob3J0OiBbXG5cdFx0XHRcdFx0XCLQvdC10LRcIiwgXCLQv9C+0L1cIiwgXCLRg9GC0L5cIiwgXCLRgdGA0LVcIiwgXCLRh9C10YJcIiwgXCLQv9C10YJcIiwgXCLRgdGD0LFcIlxuXHRcdFx0XHRdLFxuXHRcdFx0XHRkYXlPZldlZWs6IFtcItCd0LXQtNC10ZnQsFwiLFwi0J/QvtC90LXQtNC10ZnQsNC6XCIsIFwi0KPRgtC+0YDQsNC6XCIsIFwi0KHRgNC10LTQsFwiLCBcItCn0LXRgtCy0YDRgtCw0LpcIiwgXCLQn9C10YLQsNC6XCIsIFwi0KHRg9Cx0L7RgtCwXCJdXG5cdFx0XHR9LFxuXHRcdFx0c3Y6IHsgLy9TdmVuc2thXG5cdFx0XHRcdG1vbnRoczogW1xuXHRcdFx0XHRcdFwiSmFudWFyaVwiLCBcIkZlYnJ1YXJpXCIsIFwiTWFyc1wiLCBcIkFwcmlsXCIsIFwiTWFqXCIsIFwiSnVuaVwiLCBcIkp1bGlcIiwgXCJBdWd1c3RpXCIsIFwiU2VwdGVtYmVyXCIsIFwiT2t0b2JlclwiLCBcIk5vdmVtYmVyXCIsIFwiRGVjZW1iZXJcIlxuXHRcdFx0XHRdLFxuXHRcdFx0XHRkYXlPZldlZWtTaG9ydDogW1xuXHRcdFx0XHRcdFwiU8O2blwiLCBcIk3DpW5cIiwgXCJUaXNcIiwgXCJPbnNcIiwgXCJUb3JcIiwgXCJGcmVcIiwgXCJMw7ZyXCJcblx0XHRcdFx0XSxcblx0XHRcdFx0ZGF5T2ZXZWVrOiBbXCJTw7ZuZGFnXCIsIFwiTcOlbmRhZ1wiLCBcIlRpc2RhZ1wiLCBcIk9uc2RhZ1wiLCBcIlRvcnNkYWdcIiwgXCJGcmVkYWdcIiwgXCJMw7ZyZGFnXCJdXG5cdFx0XHR9LFxuXHRcdFx0J3poLVRXJzogeyAvL1RyYWRpdGlvbmFsIENoaW5lc2UgKOe5gemrlOS4reaWhylcblx0XHRcdFx0bW9udGhzOiBbXG5cdFx0XHRcdFx0XCLkuIDmnIhcIiwgXCLkuozmnIhcIiwgXCLkuInmnIhcIiwgXCLlm5vmnIhcIiwgXCLkupTmnIhcIiwgXCLlha3mnIhcIiwgXCLkuIPmnIhcIiwgXCLlhavmnIhcIiwgXCLkuZ3mnIhcIiwgXCLljYHmnIhcIiwgXCLljYHkuIDmnIhcIiwgXCLljYHkuozmnIhcIlxuXHRcdFx0XHRdLFxuXHRcdFx0XHRkYXlPZldlZWtTaG9ydDogW1xuXHRcdFx0XHRcdFwi5pelXCIsIFwi5LiAXCIsIFwi5LqMXCIsIFwi5LiJXCIsIFwi5ZubXCIsIFwi5LqUXCIsIFwi5YWtXCJcblx0XHRcdFx0XSxcblx0XHRcdFx0ZGF5T2ZXZWVrOiBbXCLmmJ/mnJ/ml6VcIiwgXCLmmJ/mnJ/kuIBcIiwgXCLmmJ/mnJ/kuoxcIiwgXCLmmJ/mnJ/kuIlcIiwgXCLmmJ/mnJ/lm5tcIiwgXCLmmJ/mnJ/kupRcIiwgXCLmmJ/mnJ/lha1cIl1cblx0XHRcdH0sXG5cdFx0XHR6aDogeyAvL1NpbXBsaWZpZWQgQ2hpbmVzZSAo566A5L2T5Lit5paHKVxuXHRcdFx0XHRtb250aHM6IFtcblx0XHRcdFx0XHRcIuS4gOaciFwiLCBcIuS6jOaciFwiLCBcIuS4ieaciFwiLCBcIuWbm+aciFwiLCBcIuS6lOaciFwiLCBcIuWFreaciFwiLCBcIuS4g+aciFwiLCBcIuWFq+aciFwiLCBcIuS5neaciFwiLCBcIuWNgeaciFwiLCBcIuWNgeS4gOaciFwiLCBcIuWNgeS6jOaciFwiXG5cdFx0XHRcdF0sXG5cdFx0XHRcdGRheU9mV2Vla1Nob3J0OiBbXG5cdFx0XHRcdFx0XCLml6VcIiwgXCLkuIBcIiwgXCLkuoxcIiwgXCLkuIlcIiwgXCLlm5tcIiwgXCLkupRcIiwgXCLlha1cIlxuXHRcdFx0XHRdLFxuXHRcdFx0XHRkYXlPZldlZWs6IFtcIuaYn+acn+aXpVwiLCBcIuaYn+acn+S4gFwiLCBcIuaYn+acn+S6jFwiLCBcIuaYn+acn+S4iVwiLCBcIuaYn+acn+Wbm1wiLCBcIuaYn+acn+S6lFwiLCBcIuaYn+acn+WFrVwiXVxuXHRcdFx0fSxcblx0XHRcdHVnOnsgLy8gVXlnaHVyKNim24fZiti624fYsdqG25UpXG5cdFx0XHRcdG1vbnRoczogW1xuXHRcdFx0XHRcdFwiMS3Yptin2YpcIixcIjIt2KbYp9mKXCIsXCIzLdim2KfZilwiLFwiNC3Yptin2YpcIixcIjUt2KbYp9mKXCIsXCI2Ldim2KfZilwiLFwiNy3Yptin2YpcIixcIjgt2KbYp9mKXCIsXCI5Ldim2KfZilwiLFwiMTAt2KbYp9mKXCIsXCIxMS3Yptin2YpcIixcIjEyLdim2KfZilwiXG5cdFx0XHRcdF0sXG5cdFx0XHRcdGRheU9mV2VlazogW1xuXHRcdFx0XHRcdFwi2YrbldmD2LTbldmG2KjblVwiLCBcItiv24jYtNuV2YbYqNuVXCIsXCLYs9uV2YrYtNuV2YbYqNuVXCIsXCLahtin2LHYtNuV2YbYqNuVXCIsXCLZvtuV2YrYtNuV2YbYqNuVXCIsXCLYrNuI2YXblVwiLFwi2LTbldmG2KjblVwiXG5cdFx0XHRcdF1cblx0XHRcdH0sXG5cdFx0XHRoZTogeyAvL0hlYnJldyAo16LXkdeo15nXqilcblx0XHRcdFx0bW9udGhzOiBbXG5cdFx0XHRcdFx0J9eZ16DXldeQ16gnLCAn16TXkdeo15XXkNeoJywgJ9ee16jXpScsICfXkNek16jXmdecJywgJ9ee15DXmScsICfXmdeV16DXmScsICfXmdeV15zXmScsICfXkNeV15LXldeh15gnLCAn16HXpNeY157XkdeoJywgJ9eQ15XXp9eY15XXkdeoJywgJ9eg15XXkdee15HXqCcsICfXk9em157XkdeoJ1xuXHRcdFx0XHRdLFxuXHRcdFx0XHRkYXlPZldlZWtTaG9ydDogW1xuXHRcdFx0XHRcdCfXkFxcJycsICfXkVxcJycsICfXklxcJycsICfXk1xcJycsICfXlFxcJycsICfXlVxcJycsICfXqdeR16onXG5cdFx0XHRcdF0sXG5cdFx0XHRcdGRheU9mV2VlazogW1wi16jXkNep15XXn1wiLCBcItep16DXmVwiLCBcItep15zXmdep15lcIiwgXCLXqNeR15nXoteZXCIsIFwi15fXnteZ16nXmVwiLCBcItep15nXqdeZXCIsIFwi16nXkdeqXCIsIFwi16jXkNep15XXn1wiXVxuXHRcdFx0fSxcblx0XHRcdGh5OiB7IC8vIEFybWVuaWFuXG5cdFx0XHRcdG1vbnRoczogW1xuXHRcdFx0XHRcdFwi1YDVuNaC1bbVvtWh1oBcIiwgXCLVk9Wl1b/WgNW+1aHWgFwiLCBcItWE1aHWgNW/XCIsIFwi1LHVutaA1avVrFwiLCBcItWE1aHVtdWr1b1cIiwgXCLVgNW41oLVttWr1b1cIiwgXCLVgNW41oLVrNWr1b1cIiwgXCLVldWj1bjVvdW/1bjVvVwiLCBcItWN1aXVutW/1aXVtNWi1aXWgFwiLCBcItWA1bjVr9W/1aXVtNWi1aXWgFwiLCBcItWG1bjVtdWl1bTVotWl1oBcIiwgXCLUtNWl1a/Vv9Wl1bTVotWl1oBcIlxuXHRcdFx0XHRdLFxuXHRcdFx0XHRkYXlPZldlZWtTaG9ydDogW1xuXHRcdFx0XHRcdFwi1L/Vq1wiLCBcItS11oDVr1wiLCBcItS11oDWhFwiLCBcItWJ1bjWgFwiLCBcItWA1bbVo1wiLCBcItWI1oLWgNWiXCIsIFwi1YfVotWpXCJcblx0XHRcdFx0XSxcblx0XHRcdFx0ZGF5T2ZXZWVrOiBbXCLUv9Wr1oDVodWv1atcIiwgXCLUtdaA1a/VuNaC1bfVodWi1anVq1wiLCBcItS11oDVpdaE1bfVodWi1anVq1wiLCBcItWJ1bjWgNWl1oTVt9Wh1aLVqdWrXCIsIFwi1YDVq9W21aPVt9Wh1aLVqdWrXCIsIFwi1YjWgtaA1aLVodWpXCIsIFwi1YfVodWi1aHVqVwiXVxuXHRcdFx0fSxcblx0XHRcdGtnOiB7IC8vIEt5cmd5elxuXHRcdFx0XHRtb250aHM6IFtcblx0XHRcdFx0XHQn0q7Rh9GC0q/QvSDQsNC50YsnLCAn0JHQuNGA0LTQuNC9INCw0LnRiycsICfQltCw0LvQs9Cw0L0g0JrRg9GA0LDQvScsICfQp9GL0L0g0JrRg9GA0LDQvScsICfQkdGD0LPRgycsICfQmtGD0LvQttCwJywgJ9Ci0LXQutC1JywgJ9CR0LDRiCDQntC+0L3QsCcsICfQkNGP0Log0J7QvtC90LAnLCAn0KLQvtCz0YPQt9C00YPQvSDQsNC50YsnLCAn0JbQtdGC0LjQvdC40L0g0LDQudGLJywgJ9CR0LXRiNGC0LjQvSDQsNC50YsnXG5cdFx0XHRcdF0sXG5cdFx0XHRcdGRheU9mV2Vla1Nob3J0OiBbXG5cdFx0XHRcdFx0XCLQltC10LpcIiwgXCLQlNKv0LlcIiwgXCLQqNC10LlcIiwgXCLQqNCw0YBcIiwgXCLQkdC10LlcIiwgXCLQltGD0LxcIiwgXCLQmNGI0LVcIlxuXHRcdFx0XHRdLFxuXHRcdFx0XHRkYXlPZldlZWs6IFtcblx0XHRcdFx0XHRcItCW0LXQutGI0LXQvNCxXCIsIFwi0JTSr9C50YjTqdC80LFcIiwgXCLQqNC10LnRiNC10LzQsVwiLCBcItCo0LDRgNGI0LXQvNCxXCIsIFwi0JHQtdC50YjQtdC80LHQuFwiLCBcItCW0YPQvNCwXCIsIFwi0JjRiNC10L3QsVwiXG5cdFx0XHRcdF1cblx0XHRcdH0sXG5cdFx0XHRybTogeyAvLyBSb21hbnNoXG5cdFx0XHRcdG1vbnRoczogW1xuXHRcdFx0XHRcdFwiU2NoYW5lclwiLCBcIkZhdnJlclwiLCBcIk1hcnNcIiwgXCJBdnJpZ2xcIiwgXCJNYXRnXCIsIFwiWmVyY2xhZHVyXCIsIFwiRmFuYWR1clwiLCBcIkF2dXN0XCIsIFwiU2V0dGVtYmVyXCIsIFwiT2N0b2JlclwiLCBcIk5vdmVtYmVyXCIsIFwiRGVjZW1iZXJcIlxuXHRcdFx0XHRdLFxuXHRcdFx0XHRkYXlPZldlZWtTaG9ydDogW1xuXHRcdFx0XHRcdFwiRHVcIiwgXCJHbGlcIiwgXCJNYVwiLCBcIk1lXCIsIFwiR2llXCIsIFwiVmVcIiwgXCJTb1wiXG5cdFx0XHRcdF0sXG5cdFx0XHRcdGRheU9mV2VlazogW1xuXHRcdFx0XHRcdFwiRHVtZW5naWFcIiwgXCJHbGluZGVzZGlcIiwgXCJNYXJkaVwiLCBcIk1lc2VtbmFcIiwgXCJHaWV2Z2lhXCIsIFwiVmVuZGVyZGlcIiwgXCJTb25kYVwiXG5cdFx0XHRcdF1cblx0XHRcdH0sXG5cdFx0XHRrYTogeyAvLyBHZW9yZ2lhblxuXHRcdFx0XHRtb250aHM6IFtcblx0XHRcdFx0XHQn4YOY4YOQ4YOc4YOV4YOQ4YOg4YOYJywgJ+GDl+GDlOGDkeGDlOGDoOGDleGDkOGDmuGDmCcsICfhg5vhg5Dhg6Dhg6Lhg5gnLCAn4YOQ4YOe4YOg4YOY4YOa4YOYJywgJ+GDm+GDkOGDmOGDoeGDmCcsICfhg5jhg5Xhg5zhg5jhg6Hhg5gnLCAn4YOY4YOV4YOa4YOY4YOh4YOYJywgJ+GDkOGDkuGDleGDmOGDoeGDouGDnScsICfhg6Hhg5Thg6Xhg6Lhg5Thg5vhg5Hhg5Thg6Dhg5gnLCAn4YOd4YOl4YOi4YOd4YOb4YOR4YOU4YOg4YOYJywgJ+GDnOGDneGDlOGDm+GDkeGDlOGDoOGDmCcsICfhg5Phg5Thg5nhg5Thg5vhg5Hhg5Thg6Dhg5gnXG5cdFx0XHRcdF0sXG5cdFx0XHRcdGRheU9mV2Vla1Nob3J0OiBbXG5cdFx0XHRcdFx0XCLhg5nhg5VcIiwgXCLhg53hg6Dhg6hcIiwgXCLhg6Hhg5Dhg5vhg6hcIiwgXCLhg53hg5fhg65cIiwgXCLhg67hg6Phg5dcIiwgXCLhg57hg5Dhg6BcIiwgXCLhg6jhg5Dhg5FcIlxuXHRcdFx0XHRdLFxuXHRcdFx0XHRkYXlPZldlZWs6IFtcIuGDmeGDleGDmOGDoOGDkFwiLCBcIuGDneGDoOGDqOGDkOGDkeGDkOGDl+GDmFwiLCBcIuGDoeGDkOGDm+GDqOGDkOGDkeGDkOGDl+GDmFwiLCBcIuGDneGDl+GDruGDqOGDkOGDkeGDkOGDl+GDmFwiLCBcIuGDruGDo+GDl+GDqOGDkOGDkeGDkOGDl+GDmFwiLCBcIuGDnuGDkOGDoOGDkOGDoeGDmeGDlOGDleGDmFwiLCBcIuGDqOGDkOGDkeGDkOGDl+GDmFwiXVxuXHRcdFx0fVxuXHRcdH0sXG5cblx0XHRvd25lckRvY3VtZW50OiBkb2N1bWVudCxcblx0XHRjb250ZW50V2luZG93OiB3aW5kb3csXG5cblx0XHR2YWx1ZTogJycsXG5cdFx0cnRsOiBmYWxzZSxcblxuXHRcdGZvcm1hdDpcdCdZL20vZCBIOmknLFxuXHRcdGZvcm1hdFRpbWU6XHQnSDppJyxcblx0XHRmb3JtYXREYXRlOlx0J1kvbS9kJyxcblxuXHRcdHN0YXJ0RGF0ZTpcdGZhbHNlLCAvLyBuZXcgRGF0ZSgpLCAnMTk4Ni8xMi8wOCcsICctMTk3MC8wMS8wNScsJy0xOTcwLzAxLzA1Jyxcblx0XHRzdGVwOiA2MCxcblx0XHRtb250aENoYW5nZVNwaW5uZXI6IHRydWUsXG5cblx0XHRjbG9zZU9uRGF0ZVNlbGVjdDogZmFsc2UsXG5cdFx0Y2xvc2VPblRpbWVTZWxlY3Q6IHRydWUsXG5cdFx0Y2xvc2VPbldpdGhvdXRDbGljazogdHJ1ZSxcblx0XHRjbG9zZU9uSW5wdXRDbGljazogdHJ1ZSxcblx0XHRvcGVuT25Gb2N1czogdHJ1ZSxcblxuXHRcdHRpbWVwaWNrZXI6IHRydWUsXG5cdFx0ZGF0ZXBpY2tlcjogdHJ1ZSxcblx0XHR3ZWVrczogZmFsc2UsXG5cblx0XHRkZWZhdWx0VGltZTogZmFsc2UsXHQvLyB1c2UgZm9ybWF0VGltZSBmb3JtYXQgKGV4LiAnMTA6MDAnIGZvciBmb3JtYXRUaW1lOlx0J0g6aScpXG5cdFx0ZGVmYXVsdERhdGU6IGZhbHNlLFx0Ly8gdXNlIGZvcm1hdERhdGUgZm9ybWF0IChleCBuZXcgRGF0ZSgpIG9yICcxOTg2LzEyLzA4JyBvciAnLTE5NzAvMDEvMDUnIG9yICctMTk3MC8wMS8wNScpXG5cblx0XHRtaW5EYXRlOiBmYWxzZSxcblx0XHRtYXhEYXRlOiBmYWxzZSxcblx0XHRtaW5UaW1lOiBmYWxzZSxcblx0XHRtYXhUaW1lOiBmYWxzZSxcblx0XHRtaW5EYXRlVGltZTogZmFsc2UsXG5cdFx0bWF4RGF0ZVRpbWU6IGZhbHNlLFxuXG5cdFx0YWxsb3dUaW1lczogW10sXG5cdFx0b3BlbmVkOiBmYWxzZSxcblx0XHRpbml0VGltZTogdHJ1ZSxcblx0XHRpbmxpbmU6IGZhbHNlLFxuXHRcdHRoZW1lOiAnJyxcblx0XHR0b3VjaE1vdmVkVGhyZXNob2xkOiA1LFxuXG5cdFx0b25TZWxlY3REYXRlOiBmdW5jdGlvbiAoKSB7fSxcblx0XHRvblNlbGVjdFRpbWU6IGZ1bmN0aW9uICgpIHt9LFxuXHRcdG9uQ2hhbmdlTW9udGg6IGZ1bmN0aW9uICgpIHt9LFxuXHRcdG9uR2V0V2Vla09mWWVhcjogZnVuY3Rpb24gKCkge30sXG5cdFx0b25DaGFuZ2VZZWFyOiBmdW5jdGlvbiAoKSB7fSxcblx0XHRvbkNoYW5nZURhdGVUaW1lOiBmdW5jdGlvbiAoKSB7fSxcblx0XHRvblNob3c6IGZ1bmN0aW9uICgpIHt9LFxuXHRcdG9uQ2xvc2U6IGZ1bmN0aW9uICgpIHt9LFxuXHRcdG9uR2VuZXJhdGU6IGZ1bmN0aW9uICgpIHt9LFxuXG5cdFx0d2l0aG91dENvcHlyaWdodDogdHJ1ZSxcblx0XHRpbnZlcnNlQnV0dG9uOiBmYWxzZSxcblx0XHRob3VyczEyOiBmYWxzZSxcblx0XHRuZXh0OiAneGRzb2Z0X25leHQnLFxuXHRcdHByZXYgOiAneGRzb2Z0X3ByZXYnLFxuXHRcdGRheU9mV2Vla1N0YXJ0OiAwLFxuXHRcdHBhcmVudElEOiAnYm9keScsXG5cdFx0dGltZUhlaWdodEluVGltZVBpY2tlcjogMjUsXG5cdFx0dGltZXBpY2tlclNjcm9sbGJhcjogdHJ1ZSxcblx0XHR0b2RheUJ1dHRvbjogdHJ1ZSxcblx0XHRwcmV2QnV0dG9uOiB0cnVlLFxuXHRcdG5leHRCdXR0b246IHRydWUsXG5cdFx0ZGVmYXVsdFNlbGVjdDogdHJ1ZSxcblxuXHRcdHNjcm9sbE1vbnRoOiB0cnVlLFxuXHRcdHNjcm9sbFRpbWU6IHRydWUsXG5cdFx0c2Nyb2xsSW5wdXQ6IHRydWUsXG5cblx0XHRsYXp5SW5pdDogZmFsc2UsXG5cdFx0bWFzazogZmFsc2UsXG5cdFx0dmFsaWRhdGVPbkJsdXI6IHRydWUsXG5cdFx0YWxsb3dCbGFuazogdHJ1ZSxcblx0XHR5ZWFyU3RhcnQ6IDE5NTAsXG5cdFx0eWVhckVuZDogMjA1MCxcblx0XHRtb250aFN0YXJ0OiAwLFxuXHRcdG1vbnRoRW5kOiAxMSxcblx0XHRzdHlsZTogJycsXG5cdFx0aWQ6ICcnLFxuXHRcdGZpeGVkOiBmYWxzZSxcblx0XHRyb3VuZFRpbWU6ICdyb3VuZCcsIC8vIGNlaWwsIGZsb29yXG5cdFx0Y2xhc3NOYW1lOiAnJyxcblx0XHR3ZWVrZW5kczogW10sXG5cdFx0aGlnaGxpZ2h0ZWREYXRlczogW10sXG5cdFx0aGlnaGxpZ2h0ZWRQZXJpb2RzOiBbXSxcblx0XHRhbGxvd0RhdGVzIDogW10sXG5cdFx0YWxsb3dEYXRlUmUgOiBudWxsLFxuXHRcdGRpc2FibGVkRGF0ZXMgOiBbXSxcblx0XHRkaXNhYmxlZFdlZWtEYXlzOiBbXSxcblx0XHR5ZWFyT2Zmc2V0OiAwLFxuXHRcdGJlZm9yZVNob3dEYXk6IG51bGwsXG5cblx0XHRlbnRlckxpa2VUYWI6IHRydWUsXG4gICAgICAgIHNob3dBcHBseUJ1dHRvbjogZmFsc2UsXG4gICAgICAgIGluc2lkZVBhcmVudDogZmFsc2UsXG5cdH07XG5cblx0dmFyIGRhdGVIZWxwZXIgPSBudWxsLFxuXHRcdGRlZmF1bHREYXRlSGVscGVyID0gbnVsbCxcblx0XHRnbG9iYWxMb2NhbGVEZWZhdWx0ID0gJ2VuJyxcblx0XHRnbG9iYWxMb2NhbGUgPSAnZW4nO1xuXG5cdHZhciBkYXRlRm9ybWF0dGVyT3B0aW9uc0RlZmF1bHQgPSB7XG5cdFx0bWVyaWRpZW06IFsnQU0nLCAnUE0nXVxuXHR9O1xuXG5cdHZhciBpbml0RGF0ZUZvcm1hdHRlciA9IGZ1bmN0aW9uKCl7XG5cdFx0dmFyIGxvY2FsZSA9IGRlZmF1bHRfb3B0aW9ucy5pMThuW2dsb2JhbExvY2FsZV0sXG5cdFx0XHRvcHRzID0ge1xuXHRcdFx0XHRkYXlzOiBsb2NhbGUuZGF5T2ZXZWVrLFxuXHRcdFx0XHRkYXlzU2hvcnQ6IGxvY2FsZS5kYXlPZldlZWtTaG9ydCxcblx0XHRcdFx0bW9udGhzOiBsb2NhbGUubW9udGhzLFxuXHRcdFx0XHRtb250aHNTaG9ydDogJC5tYXAobG9jYWxlLm1vbnRocywgZnVuY3Rpb24obil7IHJldHVybiBuLnN1YnN0cmluZygwLCAzKSB9KVxuXHRcdFx0fTtcblxuXHRcdGlmICh0eXBlb2YgRGF0ZUZvcm1hdHRlciA9PT0gJ2Z1bmN0aW9uJykge1xuXHRcdFx0ZGF0ZUhlbHBlciA9IGRlZmF1bHREYXRlSGVscGVyID0gbmV3IERhdGVGb3JtYXR0ZXIoe1xuXHRcdFx0XHRkYXRlU2V0dGluZ3M6ICQuZXh0ZW5kKHt9LCBkYXRlRm9ybWF0dGVyT3B0aW9uc0RlZmF1bHQsIG9wdHMpXG5cdFx0XHR9KTtcblx0XHR9XG5cdH07XG5cblx0dmFyIGRhdGVGb3JtYXR0ZXJzID0ge1xuXHRcdG1vbWVudDoge1xuXHRcdFx0ZGVmYXVsdF9vcHRpb25zOntcblx0XHRcdFx0Zm9ybWF0OiAnWVlZWS9NTS9ERCBISDptbScsXG5cdFx0XHRcdGZvcm1hdERhdGU6ICdZWVlZL01NL0REJyxcblx0XHRcdFx0Zm9ybWF0VGltZTogJ0hIOm1tJyxcblx0XHRcdH0sXG5cdFx0XHRmb3JtYXR0ZXI6IHtcblx0XHRcdFx0cGFyc2VEYXRlOiBmdW5jdGlvbiAoZGF0ZSwgZm9ybWF0KSB7XG5cdFx0XHRcdFx0aWYoaXNGb3JtYXRTdGFuZGFyZChmb3JtYXQpKXtcblx0XHRcdFx0XHRcdHJldHVybiBkZWZhdWx0RGF0ZUhlbHBlci5wYXJzZURhdGUoZGF0ZSwgZm9ybWF0KTtcblx0XHRcdFx0XHR9IFxuXHRcdFx0XHRcdHZhciBkID0gbW9tZW50KGRhdGUsIGZvcm1hdCk7XG5cdFx0XHRcdFx0cmV0dXJuIGQuaXNWYWxpZCgpID8gZC50b0RhdGUoKSA6IGZhbHNlO1xuXHRcdFx0XHR9LFxuXG5cdFx0XHRcdGZvcm1hdERhdGU6IGZ1bmN0aW9uIChkYXRlLCBmb3JtYXQpIHtcblx0XHRcdFx0XHRpZihpc0Zvcm1hdFN0YW5kYXJkKGZvcm1hdCkpe1xuXHRcdFx0XHRcdFx0cmV0dXJuIGRlZmF1bHREYXRlSGVscGVyLmZvcm1hdERhdGUoZGF0ZSwgZm9ybWF0KTtcblx0XHRcdFx0XHR9IFxuXHRcdFx0XHRcdHJldHVybiBtb21lbnQoZGF0ZSkuZm9ybWF0KGZvcm1hdCk7XG5cdFx0XHRcdH0sXG5cblx0XHRcdFx0Zm9ybWF0TWFzazogZnVuY3Rpb24oZm9ybWF0KXtcblx0XHRcdFx0XHRyZXR1cm4gZm9ybWF0XG5cdFx0XHRcdFx0XHQucmVwbGFjZSgvWXs0fS9nLCAnOTk5OScpXG5cdFx0XHRcdFx0XHQucmVwbGFjZSgvWXsyfS9nLCAnOTknKVxuXHRcdFx0XHRcdFx0LnJlcGxhY2UoL017Mn0vZywgJzE5Jylcblx0XHRcdFx0XHRcdC5yZXBsYWNlKC9EezJ9L2csICczOScpXG5cdFx0XHRcdFx0XHQucmVwbGFjZSgvSHsyfS9nLCAnMjknKVxuXHRcdFx0XHRcdFx0LnJlcGxhY2UoL217Mn0vZywgJzU5Jylcblx0XHRcdFx0XHRcdC5yZXBsYWNlKC9zezJ9L2csICc1OScpO1xuXHRcdFx0XHR9LFxuXHRcdFx0fVxuXHRcdH1cblx0fVxuXG5cdC8vIGZvciBsb2NhbGUgc2V0dGluZ3Ncblx0JC5kYXRldGltZXBpY2tlciA9IHtcblx0XHRzZXRMb2NhbGU6IGZ1bmN0aW9uKGxvY2FsZSl7XG5cdFx0XHR2YXIgbmV3TG9jYWxlID0gZGVmYXVsdF9vcHRpb25zLmkxOG5bbG9jYWxlXSA/IGxvY2FsZSA6IGdsb2JhbExvY2FsZURlZmF1bHQ7XG5cdFx0XHRpZiAoZ2xvYmFsTG9jYWxlICE9PSBuZXdMb2NhbGUpIHtcblx0XHRcdFx0Z2xvYmFsTG9jYWxlID0gbmV3TG9jYWxlO1xuXHRcdFx0XHQvLyByZWluaXQgZGF0ZSBmb3JtYXR0ZXJcblx0XHRcdFx0aW5pdERhdGVGb3JtYXR0ZXIoKTtcblx0XHRcdH1cblx0XHR9LFxuXG5cdFx0c2V0RGF0ZUZvcm1hdHRlcjogZnVuY3Rpb24oZGF0ZUZvcm1hdHRlcikge1xuXHRcdFx0aWYodHlwZW9mIGRhdGVGb3JtYXR0ZXIgPT09ICdzdHJpbmcnICYmIGRhdGVGb3JtYXR0ZXJzLmhhc093blByb3BlcnR5KGRhdGVGb3JtYXR0ZXIpKXtcblx0XHRcdFx0dmFyIGRmID0gZGF0ZUZvcm1hdHRlcnNbZGF0ZUZvcm1hdHRlcl07XG5cdFx0XHRcdCQuZXh0ZW5kKGRlZmF1bHRfb3B0aW9ucywgZGYuZGVmYXVsdF9vcHRpb25zKTtcblx0XHRcdFx0ZGF0ZUhlbHBlciA9IGRmLmZvcm1hdHRlcjsgXG5cdFx0XHR9XG5cdFx0XHRlbHNlIHtcblx0XHRcdFx0ZGF0ZUhlbHBlciA9IGRhdGVGb3JtYXR0ZXI7XG5cdFx0XHR9XG5cdFx0fSxcblx0fTtcblxuXHR2YXIgc3RhbmRhcmRGb3JtYXRzID0ge1xuXHRcdFJGQ18yODIyOiAnRCwgZCBNIFkgSDppOnMgTycsXG5cdFx0QVRPTTogJ1ktbS1kXFxUSDppOnNQJyxcblx0XHRJU09fODYwMTogJ1ktbS1kXFxUSDppOnNPJyxcblx0XHRSRkNfODIyOiAnRCwgZCBNIHkgSDppOnMgTycsXG5cdFx0UkZDXzg1MDogJ2wsIGQtTS15IEg6aTpzIFQnLFxuXHRcdFJGQ18xMDM2OiAnRCwgZCBNIHkgSDppOnMgTycsXG5cdFx0UkZDXzExMjM6ICdELCBkIE0gWSBIOmk6cyBPJyxcblx0XHRSU1M6ICdELCBkIE0gWSBIOmk6cyBPJyxcblx0XHRXM0M6ICdZLW0tZFxcVEg6aTpzUCdcblx0fVxuXG5cdHZhciBpc0Zvcm1hdFN0YW5kYXJkID0gZnVuY3Rpb24oZm9ybWF0KXtcblx0XHRyZXR1cm4gT2JqZWN0LnZhbHVlcyhzdGFuZGFyZEZvcm1hdHMpLmluZGV4T2YoZm9ybWF0KSA9PT0gLTEgPyBmYWxzZSA6IHRydWU7XG5cdH1cblxuXHQkLmV4dGVuZCgkLmRhdGV0aW1lcGlja2VyLCBzdGFuZGFyZEZvcm1hdHMpO1xuXG5cdC8vIGZpcnN0IGluaXQgZGF0ZSBmb3JtYXR0ZXJcblx0aW5pdERhdGVGb3JtYXR0ZXIoKTtcblxuXHQvLyBmaXggZm9yIGllOFxuXHRpZiAoIXdpbmRvdy5nZXRDb21wdXRlZFN0eWxlKSB7XG5cdFx0d2luZG93LmdldENvbXB1dGVkU3R5bGUgPSBmdW5jdGlvbiAoZWwpIHtcblx0XHRcdHRoaXMuZWwgPSBlbDtcblx0XHRcdHRoaXMuZ2V0UHJvcGVydHlWYWx1ZSA9IGZ1bmN0aW9uIChwcm9wKSB7XG5cdFx0XHRcdHZhciByZSA9IC8oLShbYS16XSkpL2c7XG5cdFx0XHRcdGlmIChwcm9wID09PSAnZmxvYXQnKSB7XG5cdFx0XHRcdFx0cHJvcCA9ICdzdHlsZUZsb2F0Jztcblx0XHRcdFx0fVxuXHRcdFx0XHRpZiAocmUudGVzdChwcm9wKSkge1xuXHRcdFx0XHRcdHByb3AgPSBwcm9wLnJlcGxhY2UocmUsIGZ1bmN0aW9uIChhLCBiLCBjKSB7XG5cdFx0XHRcdFx0XHRyZXR1cm4gYy50b1VwcGVyQ2FzZSgpO1xuXHRcdFx0XHRcdH0pO1xuXHRcdFx0XHR9XG5cdFx0XHRcdHJldHVybiBlbC5jdXJyZW50U3R5bGVbcHJvcF0gfHwgbnVsbDtcblx0XHRcdH07XG5cdFx0XHRyZXR1cm4gdGhpcztcblx0XHR9O1xuXHR9XG5cdGlmICghQXJyYXkucHJvdG90eXBlLmluZGV4T2YpIHtcblx0XHRBcnJheS5wcm90b3R5cGUuaW5kZXhPZiA9IGZ1bmN0aW9uIChvYmosIHN0YXJ0KSB7XG5cdFx0XHR2YXIgaSwgajtcblx0XHRcdGZvciAoaSA9IChzdGFydCB8fCAwKSwgaiA9IHRoaXMubGVuZ3RoOyBpIDwgajsgaSArPSAxKSB7XG5cdFx0XHRcdGlmICh0aGlzW2ldID09PSBvYmopIHsgcmV0dXJuIGk7IH1cblx0XHRcdH1cblx0XHRcdHJldHVybiAtMTtcblx0XHR9O1xuXHR9XG5cblx0RGF0ZS5wcm90b3R5cGUuY291bnREYXlzSW5Nb250aCA9IGZ1bmN0aW9uICgpIHtcblx0XHRyZXR1cm4gbmV3IERhdGUodGhpcy5nZXRGdWxsWWVhcigpLCB0aGlzLmdldE1vbnRoKCkgKyAxLCAwKS5nZXREYXRlKCk7XG5cdH07XG5cblx0JC5mbi54ZHNvZnRTY3JvbGxlciA9IGZ1bmN0aW9uIChvcHRpb25zLCBwZXJjZW50KSB7XG5cdFx0cmV0dXJuIHRoaXMuZWFjaChmdW5jdGlvbiAoKSB7XG5cdFx0XHR2YXIgdGltZWJveHBhcmVudCA9ICQodGhpcyksXG5cdFx0XHRcdHBvaW50ZXJFdmVudFRvWFkgPSBmdW5jdGlvbiAoZSkge1xuXHRcdFx0XHRcdHZhciBvdXQgPSB7eDogMCwgeTogMH0sXG5cdFx0XHRcdFx0XHR0b3VjaDtcblx0XHRcdFx0XHRpZiAoZS50eXBlID09PSAndG91Y2hzdGFydCcgfHwgZS50eXBlID09PSAndG91Y2htb3ZlJyB8fCBlLnR5cGUgPT09ICd0b3VjaGVuZCcgfHwgZS50eXBlID09PSAndG91Y2hjYW5jZWwnKSB7XG5cdFx0XHRcdFx0XHR0b3VjaCAgPSBlLm9yaWdpbmFsRXZlbnQudG91Y2hlc1swXSB8fCBlLm9yaWdpbmFsRXZlbnQuY2hhbmdlZFRvdWNoZXNbMF07XG5cdFx0XHRcdFx0XHRvdXQueCA9IHRvdWNoLmNsaWVudFg7XG5cdFx0XHRcdFx0XHRvdXQueSA9IHRvdWNoLmNsaWVudFk7XG5cdFx0XHRcdFx0fSBlbHNlIGlmIChlLnR5cGUgPT09ICdtb3VzZWRvd24nIHx8IGUudHlwZSA9PT0gJ21vdXNldXAnIHx8IGUudHlwZSA9PT0gJ21vdXNlbW92ZScgfHwgZS50eXBlID09PSAnbW91c2VvdmVyJyB8fCBlLnR5cGUgPT09ICdtb3VzZW91dCcgfHwgZS50eXBlID09PSAnbW91c2VlbnRlcicgfHwgZS50eXBlID09PSAnbW91c2VsZWF2ZScpIHtcblx0XHRcdFx0XHRcdG91dC54ID0gZS5jbGllbnRYO1xuXHRcdFx0XHRcdFx0b3V0LnkgPSBlLmNsaWVudFk7XG5cdFx0XHRcdFx0fVxuXHRcdFx0XHRcdHJldHVybiBvdXQ7XG5cdFx0XHRcdH0sXG5cdFx0XHRcdHRpbWVib3gsXG5cdFx0XHRcdHBhcmVudEhlaWdodCxcblx0XHRcdFx0aGVpZ2h0LFxuXHRcdFx0XHRzY3JvbGxiYXIsXG5cdFx0XHRcdHNjcm9sbGVyLFxuXHRcdFx0XHRtYXhpbXVtT2Zmc2V0ID0gMTAwLFxuXHRcdFx0XHRzdGFydCA9IGZhbHNlLFxuXHRcdFx0XHRzdGFydFkgPSAwLFxuXHRcdFx0XHRzdGFydFRvcCA9IDAsXG5cdFx0XHRcdGgxID0gMCxcblx0XHRcdFx0dG91Y2hTdGFydCA9IGZhbHNlLFxuXHRcdFx0XHRzdGFydFRvcFNjcm9sbCA9IDAsXG5cdFx0XHRcdGNhbGNPZmZzZXQgPSBmdW5jdGlvbiAoKSB7fTtcblxuXHRcdFx0aWYgKHBlcmNlbnQgPT09ICdoaWRlJykge1xuXHRcdFx0XHR0aW1lYm94cGFyZW50LmZpbmQoJy54ZHNvZnRfc2Nyb2xsYmFyJykuaGlkZSgpO1xuXHRcdFx0XHRyZXR1cm47XG5cdFx0XHR9XG5cblx0XHRcdGlmICghJCh0aGlzKS5oYXNDbGFzcygneGRzb2Z0X3Njcm9sbGVyX2JveCcpKSB7XG5cdFx0XHRcdHRpbWVib3ggPSB0aW1lYm94cGFyZW50LmNoaWxkcmVuKCkuZXEoMCk7XG5cdFx0XHRcdHBhcmVudEhlaWdodCA9IHRpbWVib3hwYXJlbnRbMF0uY2xpZW50SGVpZ2h0O1xuXHRcdFx0XHRoZWlnaHQgPSB0aW1lYm94WzBdLm9mZnNldEhlaWdodDtcblx0XHRcdFx0c2Nyb2xsYmFyID0gJCgnPGRpdiBjbGFzcz1cInhkc29mdF9zY3JvbGxiYXJcIj48L2Rpdj4nKTtcblx0XHRcdFx0c2Nyb2xsZXIgPSAkKCc8ZGl2IGNsYXNzPVwieGRzb2Z0X3Njcm9sbGVyXCI+PC9kaXY+Jyk7XG5cdFx0XHRcdHNjcm9sbGJhci5hcHBlbmQoc2Nyb2xsZXIpO1xuXG5cdFx0XHRcdHRpbWVib3hwYXJlbnQuYWRkQ2xhc3MoJ3hkc29mdF9zY3JvbGxlcl9ib3gnKS5hcHBlbmQoc2Nyb2xsYmFyKTtcblx0XHRcdFx0Y2FsY09mZnNldCA9IGZ1bmN0aW9uIGNhbGNPZmZzZXQoZXZlbnQpIHtcblx0XHRcdFx0XHR2YXIgb2Zmc2V0ID0gcG9pbnRlckV2ZW50VG9YWShldmVudCkueSAtIHN0YXJ0WSArIHN0YXJ0VG9wU2Nyb2xsO1xuXHRcdFx0XHRcdGlmIChvZmZzZXQgPCAwKSB7XG5cdFx0XHRcdFx0XHRvZmZzZXQgPSAwO1xuXHRcdFx0XHRcdH1cblx0XHRcdFx0XHRpZiAob2Zmc2V0ICsgc2Nyb2xsZXJbMF0ub2Zmc2V0SGVpZ2h0ID4gaDEpIHtcblx0XHRcdFx0XHRcdG9mZnNldCA9IGgxIC0gc2Nyb2xsZXJbMF0ub2Zmc2V0SGVpZ2h0O1xuXHRcdFx0XHRcdH1cblx0XHRcdFx0XHR0aW1lYm94cGFyZW50LnRyaWdnZXIoJ3Njcm9sbF9lbGVtZW50Lnhkc29mdF9zY3JvbGxlcicsIFttYXhpbXVtT2Zmc2V0ID8gb2Zmc2V0IC8gbWF4aW11bU9mZnNldCA6IDBdKTtcblx0XHRcdFx0fTtcblxuXHRcdFx0XHRzY3JvbGxlclxuXHRcdFx0XHRcdC5vbigndG91Y2hzdGFydC54ZHNvZnRfc2Nyb2xsZXIgbW91c2Vkb3duLnhkc29mdF9zY3JvbGxlcicsIGZ1bmN0aW9uIChldmVudCkge1xuXHRcdFx0XHRcdFx0aWYgKCFwYXJlbnRIZWlnaHQpIHtcblx0XHRcdFx0XHRcdFx0dGltZWJveHBhcmVudC50cmlnZ2VyKCdyZXNpemVfc2Nyb2xsLnhkc29mdF9zY3JvbGxlcicsIFtwZXJjZW50XSk7XG5cdFx0XHRcdFx0XHR9XG5cblx0XHRcdFx0XHRcdHN0YXJ0WSA9IHBvaW50ZXJFdmVudFRvWFkoZXZlbnQpLnk7XG5cdFx0XHRcdFx0XHRzdGFydFRvcFNjcm9sbCA9IHBhcnNlSW50KHNjcm9sbGVyLmNzcygnbWFyZ2luLXRvcCcpLCAxMCk7XG5cdFx0XHRcdFx0XHRoMSA9IHNjcm9sbGJhclswXS5vZmZzZXRIZWlnaHQ7XG5cblx0XHRcdFx0XHRcdGlmIChldmVudC50eXBlID09PSAnbW91c2Vkb3duJyB8fCBldmVudC50eXBlID09PSAndG91Y2hzdGFydCcpIHtcblx0XHRcdFx0XHRcdFx0aWYgKG9wdGlvbnMub3duZXJEb2N1bWVudCkge1xuXHRcdFx0XHRcdFx0XHRcdCQob3B0aW9ucy5vd25lckRvY3VtZW50LmJvZHkpLmFkZENsYXNzKCd4ZHNvZnRfbm9zZWxlY3QnKTtcblx0XHRcdFx0XHRcdFx0fVxuXHRcdFx0XHRcdFx0XHQkKFtvcHRpb25zLm93bmVyRG9jdW1lbnQuYm9keSwgb3B0aW9ucy5jb250ZW50V2luZG93XSkub24oJ3RvdWNoZW5kIG1vdXNldXAueGRzb2Z0X3Njcm9sbGVyJywgZnVuY3Rpb24gYXJndW1lbnRzX2NhbGxlZSgpIHtcblx0XHRcdFx0XHRcdFx0XHQkKFtvcHRpb25zLm93bmVyRG9jdW1lbnQuYm9keSwgb3B0aW9ucy5jb250ZW50V2luZG93XSkub2ZmKCd0b3VjaGVuZCBtb3VzZXVwLnhkc29mdF9zY3JvbGxlcicsIGFyZ3VtZW50c19jYWxsZWUpXG5cdFx0XHRcdFx0XHRcdFx0XHQub2ZmKCdtb3VzZW1vdmUueGRzb2Z0X3Njcm9sbGVyJywgY2FsY09mZnNldClcblx0XHRcdFx0XHRcdFx0XHRcdC5yZW1vdmVDbGFzcygneGRzb2Z0X25vc2VsZWN0Jyk7XG5cdFx0XHRcdFx0XHRcdH0pO1xuXHRcdFx0XHRcdFx0XHQkKG9wdGlvbnMub3duZXJEb2N1bWVudC5ib2R5KS5vbignbW91c2Vtb3ZlLnhkc29mdF9zY3JvbGxlcicsIGNhbGNPZmZzZXQpO1xuXHRcdFx0XHRcdFx0fSBlbHNlIHtcblx0XHRcdFx0XHRcdFx0dG91Y2hTdGFydCA9IHRydWU7XG5cdFx0XHRcdFx0XHRcdGV2ZW50LnN0b3BQcm9wYWdhdGlvbigpO1xuXHRcdFx0XHRcdFx0XHRldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuXHRcdFx0XHRcdFx0fVxuXHRcdFx0XHRcdH0pXG5cdFx0XHRcdFx0Lm9uKCd0b3VjaG1vdmUnLCBmdW5jdGlvbiAoZXZlbnQpIHtcblx0XHRcdFx0XHRcdGlmICh0b3VjaFN0YXJ0KSB7XG5cdFx0XHRcdFx0XHRcdGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG5cdFx0XHRcdFx0XHRcdGNhbGNPZmZzZXQoZXZlbnQpO1xuXHRcdFx0XHRcdFx0fVxuXHRcdFx0XHRcdH0pXG5cdFx0XHRcdFx0Lm9uKCd0b3VjaGVuZCB0b3VjaGNhbmNlbCcsIGZ1bmN0aW9uICgpIHtcblx0XHRcdFx0XHRcdHRvdWNoU3RhcnQgPSAgZmFsc2U7XG5cdFx0XHRcdFx0XHRzdGFydFRvcFNjcm9sbCA9IDA7XG5cdFx0XHRcdFx0fSk7XG5cblx0XHRcdFx0dGltZWJveHBhcmVudFxuXHRcdFx0XHRcdC5vbignc2Nyb2xsX2VsZW1lbnQueGRzb2Z0X3Njcm9sbGVyJywgZnVuY3Rpb24gKGV2ZW50LCBwZXJjZW50YWdlKSB7XG5cdFx0XHRcdFx0XHRpZiAoIXBhcmVudEhlaWdodCkge1xuXHRcdFx0XHRcdFx0XHR0aW1lYm94cGFyZW50LnRyaWdnZXIoJ3Jlc2l6ZV9zY3JvbGwueGRzb2Z0X3Njcm9sbGVyJywgW3BlcmNlbnRhZ2UsIHRydWVdKTtcblx0XHRcdFx0XHRcdH1cblx0XHRcdFx0XHRcdHBlcmNlbnRhZ2UgPSBwZXJjZW50YWdlID4gMSA/IDEgOiAocGVyY2VudGFnZSA8IDAgfHwgaXNOYU4ocGVyY2VudGFnZSkpID8gMCA6IHBlcmNlbnRhZ2U7XG5cblx0XHRcdFx0XHRcdHNjcm9sbGVyLmNzcygnbWFyZ2luLXRvcCcsIG1heGltdW1PZmZzZXQgKiBwZXJjZW50YWdlKTtcblxuXHRcdFx0XHRcdFx0c2V0VGltZW91dChmdW5jdGlvbiAoKSB7XG5cdFx0XHRcdFx0XHRcdHRpbWVib3guY3NzKCdtYXJnaW5Ub3AnLCAtcGFyc2VJbnQoKHRpbWVib3hbMF0ub2Zmc2V0SGVpZ2h0IC0gcGFyZW50SGVpZ2h0KSAqIHBlcmNlbnRhZ2UsIDEwKSk7XG5cdFx0XHRcdFx0XHR9LCAxMCk7XG5cdFx0XHRcdFx0fSlcblx0XHRcdFx0XHQub24oJ3Jlc2l6ZV9zY3JvbGwueGRzb2Z0X3Njcm9sbGVyJywgZnVuY3Rpb24gKGV2ZW50LCBwZXJjZW50YWdlLCBub1RyaWdnZXJTY3JvbGwpIHtcblx0XHRcdFx0XHRcdHZhciBwZXJjZW50LCBzaDtcblx0XHRcdFx0XHRcdHBhcmVudEhlaWdodCA9IHRpbWVib3hwYXJlbnRbMF0uY2xpZW50SGVpZ2h0O1xuXHRcdFx0XHRcdFx0aGVpZ2h0ID0gdGltZWJveFswXS5vZmZzZXRIZWlnaHQ7XG5cdFx0XHRcdFx0XHRwZXJjZW50ID0gcGFyZW50SGVpZ2h0IC8gaGVpZ2h0O1xuXHRcdFx0XHRcdFx0c2ggPSBwZXJjZW50ICogc2Nyb2xsYmFyWzBdLm9mZnNldEhlaWdodDtcblx0XHRcdFx0XHRcdGlmIChwZXJjZW50ID4gMSkge1xuXHRcdFx0XHRcdFx0XHRzY3JvbGxlci5oaWRlKCk7XG5cdFx0XHRcdFx0XHR9IGVsc2Uge1xuXHRcdFx0XHRcdFx0XHRzY3JvbGxlci5zaG93KCk7XG5cdFx0XHRcdFx0XHRcdHNjcm9sbGVyLmNzcygnaGVpZ2h0JywgcGFyc2VJbnQoc2ggPiAxMCA/IHNoIDogMTAsIDEwKSk7XG5cdFx0XHRcdFx0XHRcdG1heGltdW1PZmZzZXQgPSBzY3JvbGxiYXJbMF0ub2Zmc2V0SGVpZ2h0IC0gc2Nyb2xsZXJbMF0ub2Zmc2V0SGVpZ2h0O1xuXHRcdFx0XHRcdFx0XHRpZiAobm9UcmlnZ2VyU2Nyb2xsICE9PSB0cnVlKSB7XG5cdFx0XHRcdFx0XHRcdFx0dGltZWJveHBhcmVudC50cmlnZ2VyKCdzY3JvbGxfZWxlbWVudC54ZHNvZnRfc2Nyb2xsZXInLCBbcGVyY2VudGFnZSB8fCBNYXRoLmFicyhwYXJzZUludCh0aW1lYm94LmNzcygnbWFyZ2luVG9wJyksIDEwKSkgLyAoaGVpZ2h0IC0gcGFyZW50SGVpZ2h0KV0pO1xuXHRcdFx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0fSk7XG5cblx0XHRcdFx0dGltZWJveHBhcmVudC5vbignbW91c2V3aGVlbCcsIGZ1bmN0aW9uIChldmVudCkge1xuXHRcdFx0XHRcdHZhciB0b3AgPSBNYXRoLmFicyhwYXJzZUludCh0aW1lYm94LmNzcygnbWFyZ2luVG9wJyksIDEwKSk7XG5cblx0XHRcdFx0XHR0b3AgPSB0b3AgLSAoZXZlbnQuZGVsdGFZICogMjApO1xuXHRcdFx0XHRcdGlmICh0b3AgPCAwKSB7XG5cdFx0XHRcdFx0XHR0b3AgPSAwO1xuXHRcdFx0XHRcdH1cblxuXHRcdFx0XHRcdHRpbWVib3hwYXJlbnQudHJpZ2dlcignc2Nyb2xsX2VsZW1lbnQueGRzb2Z0X3Njcm9sbGVyJywgW3RvcCAvIChoZWlnaHQgLSBwYXJlbnRIZWlnaHQpXSk7XG5cdFx0XHRcdFx0ZXZlbnQuc3RvcFByb3BhZ2F0aW9uKCk7XG5cdFx0XHRcdFx0cmV0dXJuIGZhbHNlO1xuXHRcdFx0XHR9KTtcblxuXHRcdFx0XHR0aW1lYm94cGFyZW50Lm9uKCd0b3VjaHN0YXJ0JywgZnVuY3Rpb24gKGV2ZW50KSB7XG5cdFx0XHRcdFx0c3RhcnQgPSBwb2ludGVyRXZlbnRUb1hZKGV2ZW50KTtcblx0XHRcdFx0XHRzdGFydFRvcCA9IE1hdGguYWJzKHBhcnNlSW50KHRpbWVib3guY3NzKCdtYXJnaW5Ub3AnKSwgMTApKTtcblx0XHRcdFx0fSk7XG5cblx0XHRcdFx0dGltZWJveHBhcmVudC5vbigndG91Y2htb3ZlJywgZnVuY3Rpb24gKGV2ZW50KSB7XG5cdFx0XHRcdFx0aWYgKHN0YXJ0KSB7XG5cdFx0XHRcdFx0XHRldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuXHRcdFx0XHRcdFx0dmFyIGNvb3JkID0gcG9pbnRlckV2ZW50VG9YWShldmVudCk7XG5cdFx0XHRcdFx0XHR0aW1lYm94cGFyZW50LnRyaWdnZXIoJ3Njcm9sbF9lbGVtZW50Lnhkc29mdF9zY3JvbGxlcicsIFsoc3RhcnRUb3AgLSAoY29vcmQueSAtIHN0YXJ0LnkpKSAvIChoZWlnaHQgLSBwYXJlbnRIZWlnaHQpXSk7XG5cdFx0XHRcdFx0fVxuXHRcdFx0XHR9KTtcblxuXHRcdFx0XHR0aW1lYm94cGFyZW50Lm9uKCd0b3VjaGVuZCB0b3VjaGNhbmNlbCcsIGZ1bmN0aW9uICgpIHtcblx0XHRcdFx0XHRzdGFydCA9IGZhbHNlO1xuXHRcdFx0XHRcdHN0YXJ0VG9wID0gMDtcblx0XHRcdFx0fSk7XG5cdFx0XHR9XG5cdFx0XHR0aW1lYm94cGFyZW50LnRyaWdnZXIoJ3Jlc2l6ZV9zY3JvbGwueGRzb2Z0X3Njcm9sbGVyJywgW3BlcmNlbnRdKTtcblx0XHR9KTtcblx0fTtcblxuXHQkLmZuLmRhdGV0aW1lcGlja2VyID0gZnVuY3Rpb24gKG9wdCwgb3B0Mikge1xuXHRcdHZhciByZXN1bHQgPSB0aGlzLFxuXHRcdFx0S0VZMCA9IDQ4LFxuXHRcdFx0S0VZOSA9IDU3LFxuXHRcdFx0X0tFWTAgPSA5Nixcblx0XHRcdF9LRVk5ID0gMTA1LFxuICAgICAgICAgICAgQ1RSTEtFWSA9IDE3LFxuICAgICAgICAgICAgQ01ES0VZID0gOTEsXG5cdFx0XHRERUwgPSA0Nixcblx0XHRcdEVOVEVSID0gMTMsXG5cdFx0XHRFU0MgPSAyNyxcblx0XHRcdEJBQ0tTUEFDRSA9IDgsXG5cdFx0XHRBUlJPV0xFRlQgPSAzNyxcblx0XHRcdEFSUk9XVVAgPSAzOCxcblx0XHRcdEFSUk9XUklHSFQgPSAzOSxcblx0XHRcdEFSUk9XRE9XTiA9IDQwLFxuXHRcdFx0VEFCID0gOSxcblx0XHRcdEY1ID0gMTE2LFxuXHRcdFx0QUtFWSA9IDY1LFxuXHRcdFx0Q0tFWSA9IDY3LFxuXHRcdFx0VktFWSA9IDg2LFxuXHRcdFx0WktFWSA9IDkwLFxuXHRcdFx0WUtFWSA9IDg5LFxuICAgICAgICAgICAgY3RybERvd25cdD1cdGZhbHNlLFxuICAgICAgICAgICAgY21kRG93biA9IGZhbHNlLFxuXHRcdFx0b3B0aW9ucyA9ICgkLmlzUGxhaW5PYmplY3Qob3B0KSB8fCAhb3B0KSA/ICQuZXh0ZW5kKHRydWUsIHt9LCBkZWZhdWx0X29wdGlvbnMsIG9wdCkgOiAkLmV4dGVuZCh0cnVlLCB7fSwgZGVmYXVsdF9vcHRpb25zKSxcblxuXHRcdFx0bGF6eUluaXRUaW1lciA9IDAsXG5cdFx0XHRjcmVhdGVEYXRlVGltZVBpY2tlcixcblx0XHRcdGRlc3Ryb3lEYXRlVGltZVBpY2tlcixcblxuXHRcdFx0bGF6eUluaXQgPSBmdW5jdGlvbiAoaW5wdXQpIHtcblx0XHRcdFx0aW5wdXRcblx0XHRcdFx0XHQub24oJ29wZW4ueGRzb2Z0IGZvY3VzaW4ueGRzb2Z0IG1vdXNlZG93bi54ZHNvZnQgdG91Y2hzdGFydCcsIGZ1bmN0aW9uIGluaXRPbkFjdGlvbkNhbGxiYWNrKCkge1xuXHRcdFx0XHRcdFx0aWYgKGlucHV0LmlzKCc6ZGlzYWJsZWQnKSB8fCBpbnB1dC5kYXRhKCd4ZHNvZnRfZGF0ZXRpbWVwaWNrZXInKSkge1xuXHRcdFx0XHRcdFx0XHRyZXR1cm47XG5cdFx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0XHRjbGVhclRpbWVvdXQobGF6eUluaXRUaW1lcik7XG5cdFx0XHRcdFx0XHRsYXp5SW5pdFRpbWVyID0gc2V0VGltZW91dChmdW5jdGlvbiAoKSB7XG5cblx0XHRcdFx0XHRcdFx0aWYgKCFpbnB1dC5kYXRhKCd4ZHNvZnRfZGF0ZXRpbWVwaWNrZXInKSkge1xuXHRcdFx0XHRcdFx0XHRcdGNyZWF0ZURhdGVUaW1lUGlja2VyKGlucHV0KTtcblx0XHRcdFx0XHRcdFx0fVxuXHRcdFx0XHRcdFx0XHRpbnB1dFxuXHRcdFx0XHRcdFx0XHRcdC5vZmYoJ29wZW4ueGRzb2Z0IGZvY3VzaW4ueGRzb2Z0IG1vdXNlZG93bi54ZHNvZnQgdG91Y2hzdGFydCcsIGluaXRPbkFjdGlvbkNhbGxiYWNrKVxuXHRcdFx0XHRcdFx0XHRcdC50cmlnZ2VyKCdvcGVuLnhkc29mdCcpO1xuXHRcdFx0XHRcdFx0fSwgMTAwKTtcblx0XHRcdFx0XHR9KTtcblx0XHRcdH07XG5cblx0XHRjcmVhdGVEYXRlVGltZVBpY2tlciA9IGZ1bmN0aW9uIChpbnB1dCkge1xuXHRcdFx0dmFyIGRhdGV0aW1lcGlja2VyID0gJCgnPGRpdiBjbGFzcz1cInhkc29mdF9kYXRldGltZXBpY2tlciB4ZHNvZnRfbm9zZWxlY3RcIj48L2Rpdj4nKSxcblx0XHRcdFx0eGRzb2Z0X2NvcHlyaWdodCA9ICQoJzxkaXYgY2xhc3M9XCJ4ZHNvZnRfY29weXJpZ2h0XCI+PGEgdGFyZ2V0PVwiX2JsYW5rXCIgaHJlZj1cImh0dHA6Ly94ZHNvZnQubmV0L2pxcGx1Z2lucy9kYXRldGltZXBpY2tlci9cIj54ZHNvZnQubmV0PC9hPjwvZGl2PicpLFxuXHRcdFx0XHRkYXRlcGlja2VyID0gJCgnPGRpdiBjbGFzcz1cInhkc29mdF9kYXRlcGlja2VyIGFjdGl2ZVwiPjwvZGl2PicpLFxuXHRcdFx0XHRtb250aF9waWNrZXIgPSAkKCc8ZGl2IGNsYXNzPVwieGRzb2Z0X21vbnRocGlja2VyXCI+PGJ1dHRvbiB0eXBlPVwiYnV0dG9uXCIgY2xhc3M9XCJ4ZHNvZnRfcHJldlwiPjwvYnV0dG9uPjxidXR0b24gdHlwZT1cImJ1dHRvblwiIGNsYXNzPVwieGRzb2Z0X3RvZGF5X2J1dHRvblwiPjwvYnV0dG9uPicgK1xuXHRcdFx0XHRcdCc8ZGl2IGNsYXNzPVwieGRzb2Z0X2xhYmVsIHhkc29mdF9tb250aFwiPjxzcGFuPjwvc3Bhbj48aT48L2k+PC9kaXY+JyArXG5cdFx0XHRcdFx0JzxkaXYgY2xhc3M9XCJ4ZHNvZnRfbGFiZWwgeGRzb2Z0X3llYXJcIj48c3Bhbj48L3NwYW4+PGk+PC9pPjwvZGl2PicgK1xuXHRcdFx0XHRcdCc8YnV0dG9uIHR5cGU9XCJidXR0b25cIiBjbGFzcz1cInhkc29mdF9uZXh0XCI+PC9idXR0b24+PC9kaXY+JyksXG5cdFx0XHRcdGNhbGVuZGFyID0gJCgnPGRpdiBjbGFzcz1cInhkc29mdF9jYWxlbmRhclwiPjwvZGl2PicpLFxuXHRcdFx0XHR0aW1lcGlja2VyID0gJCgnPGRpdiBjbGFzcz1cInhkc29mdF90aW1lcGlja2VyIGFjdGl2ZVwiPjxidXR0b24gdHlwZT1cImJ1dHRvblwiIGNsYXNzPVwieGRzb2Z0X3ByZXZcIj48L2J1dHRvbj48ZGl2IGNsYXNzPVwieGRzb2Z0X3RpbWVfYm94XCI+PC9kaXY+PGJ1dHRvbiB0eXBlPVwiYnV0dG9uXCIgY2xhc3M9XCJ4ZHNvZnRfbmV4dFwiPjwvYnV0dG9uPjwvZGl2PicpLFxuXHRcdFx0XHR0aW1lYm94cGFyZW50ID0gdGltZXBpY2tlci5maW5kKCcueGRzb2Z0X3RpbWVfYm94JykuZXEoMCksXG5cdFx0XHRcdHRpbWVib3ggPSAkKCc8ZGl2IGNsYXNzPVwieGRzb2Z0X3RpbWVfdmFyaWFudFwiPjwvZGl2PicpLFxuXHRcdFx0XHRhcHBseUJ1dHRvbiA9ICQoJzxidXR0b24gdHlwZT1cImJ1dHRvblwiIGNsYXNzPVwieGRzb2Z0X3NhdmVfc2VsZWN0ZWQgYmx1ZS1ncmFkaWVudC1idXR0b25cIj5TYXZlIFNlbGVjdGVkPC9idXR0b24+JyksXG5cblx0XHRcdFx0bW9udGhzZWxlY3QgPSAkKCc8ZGl2IGNsYXNzPVwieGRzb2Z0X3NlbGVjdCB4ZHNvZnRfbW9udGhzZWxlY3RcIj48ZGl2PjwvZGl2PjwvZGl2PicpLFxuXHRcdFx0XHR5ZWFyc2VsZWN0ID0gJCgnPGRpdiBjbGFzcz1cInhkc29mdF9zZWxlY3QgeGRzb2Z0X3llYXJzZWxlY3RcIj48ZGl2PjwvZGl2PjwvZGl2PicpLFxuXHRcdFx0XHR0cmlnZ2VyQWZ0ZXJPcGVuID0gZmFsc2UsXG5cdFx0XHRcdFhEU29mdF9kYXRldGltZSxcblxuXHRcdFx0XHR4Y2hhbmdlVGltZXIsXG5cdFx0XHRcdHRpbWVyY2xpY2ssXG5cdFx0XHRcdGN1cnJlbnRfdGltZV9pbmRleCxcblx0XHRcdFx0c2V0UG9zLFxuXHRcdFx0XHR0aW1lciA9IDAsXG5cdFx0XHRcdF94ZHNvZnRfZGF0ZXRpbWUsXG5cdFx0XHRcdGZvckVhY2hBbmNlc3Rvck9mO1xuXG5cdFx0XHRpZiAob3B0aW9ucy5pZCkge1xuXHRcdFx0XHRkYXRldGltZXBpY2tlci5hdHRyKCdpZCcsIG9wdGlvbnMuaWQpO1xuXHRcdFx0fVxuXHRcdFx0aWYgKG9wdGlvbnMuc3R5bGUpIHtcblx0XHRcdFx0ZGF0ZXRpbWVwaWNrZXIuYXR0cignc3R5bGUnLCBvcHRpb25zLnN0eWxlKTtcblx0XHRcdH1cblx0XHRcdGlmIChvcHRpb25zLndlZWtzKSB7XG5cdFx0XHRcdGRhdGV0aW1lcGlja2VyLmFkZENsYXNzKCd4ZHNvZnRfc2hvd3dlZWtzJyk7XG5cdFx0XHR9XG5cdFx0XHRpZiAob3B0aW9ucy5ydGwpIHtcblx0XHRcdFx0ZGF0ZXRpbWVwaWNrZXIuYWRkQ2xhc3MoJ3hkc29mdF9ydGwnKTtcblx0XHRcdH1cblxuXHRcdFx0ZGF0ZXRpbWVwaWNrZXIuYWRkQ2xhc3MoJ3hkc29mdF8nICsgb3B0aW9ucy50aGVtZSk7XG5cdFx0XHRkYXRldGltZXBpY2tlci5hZGRDbGFzcyhvcHRpb25zLmNsYXNzTmFtZSk7XG5cblx0XHRcdG1vbnRoX3BpY2tlclxuXHRcdFx0XHQuZmluZCgnLnhkc29mdF9tb250aCBzcGFuJylcblx0XHRcdFx0LmFmdGVyKG1vbnRoc2VsZWN0KTtcblx0XHRcdG1vbnRoX3BpY2tlclxuXHRcdFx0XHQuZmluZCgnLnhkc29mdF95ZWFyIHNwYW4nKVxuXHRcdFx0XHQuYWZ0ZXIoeWVhcnNlbGVjdCk7XG5cblx0XHRcdG1vbnRoX3BpY2tlclxuXHRcdFx0XHQuZmluZCgnLnhkc29mdF9tb250aCwueGRzb2Z0X3llYXInKVxuXHRcdFx0XHQub24oJ3RvdWNoc3RhcnQgbW91c2Vkb3duLnhkc29mdCcsIGZ1bmN0aW9uIChldmVudCkge1xuXHRcdFx0XHRcdHZhciBzZWxlY3QgPSAkKHRoaXMpLmZpbmQoJy54ZHNvZnRfc2VsZWN0JykuZXEoMCksXG5cdFx0XHRcdFx0XHR2YWwgPSAwLFxuXHRcdFx0XHRcdFx0dG9wID0gMCxcblx0XHRcdFx0XHRcdHZpc2libGUgPSBzZWxlY3QuaXMoJzp2aXNpYmxlJyksXG5cdFx0XHRcdFx0XHRpdGVtcyxcblx0XHRcdFx0XHRcdGk7XG5cblx0XHRcdFx0XHRtb250aF9waWNrZXJcblx0XHRcdFx0XHRcdC5maW5kKCcueGRzb2Z0X3NlbGVjdCcpXG5cdFx0XHRcdFx0XHQuaGlkZSgpO1xuXHRcdFx0XHRcdGlmIChfeGRzb2Z0X2RhdGV0aW1lLmN1cnJlbnRUaW1lKSB7XG5cdFx0XHRcdFx0XHR2YWwgPSBfeGRzb2Z0X2RhdGV0aW1lLmN1cnJlbnRUaW1lWyQodGhpcykuaGFzQ2xhc3MoJ3hkc29mdF9tb250aCcpID8gJ2dldE1vbnRoJyA6ICdnZXRGdWxsWWVhciddKCk7XG5cdFx0XHRcdFx0fVxuXG5cdFx0XHRcdFx0c2VsZWN0W3Zpc2libGUgPyAnaGlkZScgOiAnc2hvdyddKCk7XG5cdFx0XHRcdFx0Zm9yIChpdGVtcyA9IHNlbGVjdC5maW5kKCdkaXYueGRzb2Z0X29wdGlvbicpLCBpID0gMDsgaSA8IGl0ZW1zLmxlbmd0aDsgaSArPSAxKSB7XG5cdFx0XHRcdFx0XHRpZiAoaXRlbXMuZXEoaSkuZGF0YSgndmFsdWUnKSA9PT0gdmFsKSB7XG5cdFx0XHRcdFx0XHRcdGJyZWFrO1xuXHRcdFx0XHRcdFx0fSBlbHNlIHtcblx0XHRcdFx0XHRcdFx0dG9wICs9IGl0ZW1zWzBdLm9mZnNldEhlaWdodDtcblx0XHRcdFx0XHRcdH1cblx0XHRcdFx0XHR9XG5cblx0XHRcdFx0XHRzZWxlY3QueGRzb2Z0U2Nyb2xsZXIob3B0aW9ucywgdG9wIC8gKHNlbGVjdC5jaGlsZHJlbigpWzBdLm9mZnNldEhlaWdodCAtIChzZWxlY3RbMF0uY2xpZW50SGVpZ2h0KSkpO1xuXHRcdFx0XHRcdGV2ZW50LnN0b3BQcm9wYWdhdGlvbigpO1xuXHRcdFx0XHRcdHJldHVybiBmYWxzZTtcblx0XHRcdFx0fSk7XG5cblx0XHRcdHZhciBoYW5kbGVUb3VjaE1vdmVkID0gZnVuY3Rpb24gKGV2ZW50KSB7XG5cdFx0XHRcdHZhciBldnQgPSBldmVudC5vcmlnaW5hbEV2ZW50O1xuXHRcdFx0XHR2YXIgdG91Y2hQb3NpdGlvbiA9IGV2dC50b3VjaGVzID8gZXZ0LnRvdWNoZXNbMF0gOiBldnQ7XG5cdFx0XHRcdHRoaXMudG91Y2hTdGFydFBvc2l0aW9uID0gdGhpcy50b3VjaFN0YXJ0UG9zaXRpb24gfHwgdG91Y2hQb3NpdGlvbjtcblx0XHRcdFx0dmFyIHhNb3ZlbWVudCA9IE1hdGguYWJzKHRoaXMudG91Y2hTdGFydFBvc2l0aW9uLmNsaWVudFggLSB0b3VjaFBvc2l0aW9uLmNsaWVudFgpO1xuXHRcdFx0XHR2YXIgeU1vdmVtZW50ID0gTWF0aC5hYnModGhpcy50b3VjaFN0YXJ0UG9zaXRpb24uY2xpZW50WSAtIHRvdWNoUG9zaXRpb24uY2xpZW50WSk7XG5cdFx0XHRcdHZhciBkaXN0YW5jZSA9IE1hdGguc3FydCh4TW92ZW1lbnQgKiB4TW92ZW1lbnQgKyB5TW92ZW1lbnQgKiB5TW92ZW1lbnQpO1xuXHRcdFx0XHRpZihkaXN0YW5jZSA+IG9wdGlvbnMudG91Y2hNb3ZlZFRocmVzaG9sZCkge1xuXHRcdFx0XHRcdHRoaXMudG91Y2hNb3ZlZCA9IHRydWU7XG5cdFx0XHRcdH1cblx0XHRcdH1cblxuXHRcdFx0bW9udGhfcGlja2VyXG5cdFx0XHRcdC5maW5kKCcueGRzb2Z0X3NlbGVjdCcpXG5cdFx0XHRcdC54ZHNvZnRTY3JvbGxlcihvcHRpb25zKVxuXHRcdFx0XHQub24oJ3RvdWNoc3RhcnQgbW91c2Vkb3duLnhkc29mdCcsIGZ1bmN0aW9uIChldmVudCkge1xuXHRcdFx0XHRcdHZhciBldnQgPSBldmVudC5vcmlnaW5hbEV2ZW50O1xuXHRcdFx0XHRcdHRoaXMudG91Y2hNb3ZlZCA9IGZhbHNlO1xuXHRcdFx0XHRcdHRoaXMudG91Y2hTdGFydFBvc2l0aW9uID0gZXZ0LnRvdWNoZXMgPyBldnQudG91Y2hlc1swXSA6IGV2dDtcblx0XHRcdFx0XHRldmVudC5zdG9wUHJvcGFnYXRpb24oKTtcblx0XHRcdFx0XHRldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuXHRcdFx0XHR9KVxuXHRcdFx0XHQub24oJ3RvdWNobW92ZScsICcueGRzb2Z0X29wdGlvbicsIGhhbmRsZVRvdWNoTW92ZWQpXG5cdFx0XHRcdC5vbigndG91Y2hlbmQgbW91c2Vkb3duLnhkc29mdCcsICcueGRzb2Z0X29wdGlvbicsIGZ1bmN0aW9uICgpIHtcblx0XHRcdFx0XHRpZiAoIXRoaXMudG91Y2hNb3ZlZCkge1xuXHRcdFx0XHRcdFx0aWYgKF94ZHNvZnRfZGF0ZXRpbWUuY3VycmVudFRpbWUgPT09IHVuZGVmaW5lZCB8fCBfeGRzb2Z0X2RhdGV0aW1lLmN1cnJlbnRUaW1lID09PSBudWxsKSB7XG5cdFx0XHRcdFx0XHRcdF94ZHNvZnRfZGF0ZXRpbWUuY3VycmVudFRpbWUgPSBfeGRzb2Z0X2RhdGV0aW1lLm5vdygpO1xuXHRcdFx0XHRcdFx0fVxuXG5cdFx0XHRcdFx0XHR2YXIgeWVhciA9IF94ZHNvZnRfZGF0ZXRpbWUuY3VycmVudFRpbWUuZ2V0RnVsbFllYXIoKTtcblx0XHRcdFx0XHRcdGlmIChfeGRzb2Z0X2RhdGV0aW1lICYmIF94ZHNvZnRfZGF0ZXRpbWUuY3VycmVudFRpbWUpIHtcblx0XHRcdFx0XHRcdFx0X3hkc29mdF9kYXRldGltZS5jdXJyZW50VGltZVskKHRoaXMpLnBhcmVudCgpLnBhcmVudCgpLmhhc0NsYXNzKCd4ZHNvZnRfbW9udGhzZWxlY3QnKSA/ICdzZXRNb250aCcgOiAnc2V0RnVsbFllYXInXSgkKHRoaXMpLmRhdGEoJ3ZhbHVlJykpO1xuXHRcdFx0XHRcdFx0fVxuXG5cdFx0XHRcdFx0XHQkKHRoaXMpLnBhcmVudCgpLnBhcmVudCgpLmhpZGUoKTtcblxuXHRcdFx0XHRcdFx0ZGF0ZXRpbWVwaWNrZXIudHJpZ2dlcigneGNoYW5nZS54ZHNvZnQnKTtcblx0XHRcdFx0XHRcdGlmIChvcHRpb25zLm9uQ2hhbmdlTW9udGggJiYgJC5pc0Z1bmN0aW9uKG9wdGlvbnMub25DaGFuZ2VNb250aCkpIHtcblx0XHRcdFx0XHRcdFx0b3B0aW9ucy5vbkNoYW5nZU1vbnRoLmNhbGwoZGF0ZXRpbWVwaWNrZXIsIF94ZHNvZnRfZGF0ZXRpbWUuY3VycmVudFRpbWUsIGRhdGV0aW1lcGlja2VyLmRhdGEoJ2lucHV0JykpO1xuXHRcdFx0XHRcdFx0fVxuXG5cdFx0XHRcdFx0XHRpZiAoeWVhciAhPT0gX3hkc29mdF9kYXRldGltZS5jdXJyZW50VGltZS5nZXRGdWxsWWVhcigpICYmICQuaXNGdW5jdGlvbihvcHRpb25zLm9uQ2hhbmdlWWVhcikpIHtcblx0XHRcdFx0XHRcdFx0b3B0aW9ucy5vbkNoYW5nZVllYXIuY2FsbChkYXRldGltZXBpY2tlciwgX3hkc29mdF9kYXRldGltZS5jdXJyZW50VGltZSwgZGF0ZXRpbWVwaWNrZXIuZGF0YSgnaW5wdXQnKSk7XG5cdFx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0fVxuXHRcdFx0XHR9KTtcblxuXHRcdFx0ZGF0ZXRpbWVwaWNrZXIuZ2V0VmFsdWUgPSBmdW5jdGlvbiAoKSB7XG5cdFx0XHRcdHJldHVybiBfeGRzb2Z0X2RhdGV0aW1lLmdldEN1cnJlbnRUaW1lKCk7XG5cdFx0XHR9O1xuXG5cdFx0XHRkYXRldGltZXBpY2tlci5zZXRPcHRpb25zID0gZnVuY3Rpb24gKF9vcHRpb25zKSB7XG5cdFx0XHRcdHZhciBoaWdobGlnaHRlZERhdGVzID0ge307XG5cblx0XHRcdFx0b3B0aW9ucyA9ICQuZXh0ZW5kKHRydWUsIHt9LCBvcHRpb25zLCBfb3B0aW9ucyk7XG5cblx0XHRcdFx0aWYgKF9vcHRpb25zLmFsbG93VGltZXMgJiYgJC5pc0FycmF5KF9vcHRpb25zLmFsbG93VGltZXMpICYmIF9vcHRpb25zLmFsbG93VGltZXMubGVuZ3RoKSB7XG5cdFx0XHRcdFx0b3B0aW9ucy5hbGxvd1RpbWVzID0gJC5leHRlbmQodHJ1ZSwgW10sIF9vcHRpb25zLmFsbG93VGltZXMpO1xuXHRcdFx0XHR9XG5cblx0XHRcdFx0aWYgKF9vcHRpb25zLndlZWtlbmRzICYmICQuaXNBcnJheShfb3B0aW9ucy53ZWVrZW5kcykgJiYgX29wdGlvbnMud2Vla2VuZHMubGVuZ3RoKSB7XG5cdFx0XHRcdFx0b3B0aW9ucy53ZWVrZW5kcyA9ICQuZXh0ZW5kKHRydWUsIFtdLCBfb3B0aW9ucy53ZWVrZW5kcyk7XG5cdFx0XHRcdH1cblxuXHRcdFx0XHRpZiAoX29wdGlvbnMuYWxsb3dEYXRlcyAmJiAkLmlzQXJyYXkoX29wdGlvbnMuYWxsb3dEYXRlcykgJiYgX29wdGlvbnMuYWxsb3dEYXRlcy5sZW5ndGgpIHtcblx0XHRcdFx0XHRvcHRpb25zLmFsbG93RGF0ZXMgPSAkLmV4dGVuZCh0cnVlLCBbXSwgX29wdGlvbnMuYWxsb3dEYXRlcyk7XG5cdFx0XHRcdH1cblxuXHRcdFx0XHRpZiAoX29wdGlvbnMuYWxsb3dEYXRlUmUgJiYgT2JqZWN0LnByb3RvdHlwZS50b1N0cmluZy5jYWxsKF9vcHRpb25zLmFsbG93RGF0ZVJlKT09PVwiW29iamVjdCBTdHJpbmddXCIpIHtcblx0XHRcdFx0XHRvcHRpb25zLmFsbG93RGF0ZVJlID0gbmV3IFJlZ0V4cChfb3B0aW9ucy5hbGxvd0RhdGVSZSk7XG5cdFx0XHRcdH1cblxuXHRcdFx0XHRpZiAoX29wdGlvbnMuaGlnaGxpZ2h0ZWREYXRlcyAmJiAkLmlzQXJyYXkoX29wdGlvbnMuaGlnaGxpZ2h0ZWREYXRlcykgJiYgX29wdGlvbnMuaGlnaGxpZ2h0ZWREYXRlcy5sZW5ndGgpIHtcblx0XHRcdFx0XHQkLmVhY2goX29wdGlvbnMuaGlnaGxpZ2h0ZWREYXRlcywgZnVuY3Rpb24gKGluZGV4LCB2YWx1ZSkge1xuXHRcdFx0XHRcdFx0dmFyIHNwbGl0RGF0YSA9ICQubWFwKHZhbHVlLnNwbGl0KCcsJyksICQudHJpbSksXG5cdFx0XHRcdFx0XHRcdGV4RGVzYyxcblx0XHRcdFx0XHRcdFx0aERhdGUgPSBuZXcgSGlnaGxpZ2h0ZWREYXRlKGRhdGVIZWxwZXIucGFyc2VEYXRlKHNwbGl0RGF0YVswXSwgb3B0aW9ucy5mb3JtYXREYXRlKSwgc3BsaXREYXRhWzFdLCBzcGxpdERhdGFbMl0pLCAvLyBkYXRlLCBkZXNjLCBzdHlsZVxuXHRcdFx0XHRcdFx0XHRrZXlEYXRlID0gZGF0ZUhlbHBlci5mb3JtYXREYXRlKGhEYXRlLmRhdGUsIG9wdGlvbnMuZm9ybWF0RGF0ZSk7XG5cdFx0XHRcdFx0XHRpZiAoaGlnaGxpZ2h0ZWREYXRlc1trZXlEYXRlXSAhPT0gdW5kZWZpbmVkKSB7XG5cdFx0XHRcdFx0XHRcdGV4RGVzYyA9IGhpZ2hsaWdodGVkRGF0ZXNba2V5RGF0ZV0uZGVzYztcblx0XHRcdFx0XHRcdFx0aWYgKGV4RGVzYyAmJiBleERlc2MubGVuZ3RoICYmIGhEYXRlLmRlc2MgJiYgaERhdGUuZGVzYy5sZW5ndGgpIHtcblx0XHRcdFx0XHRcdFx0XHRoaWdobGlnaHRlZERhdGVzW2tleURhdGVdLmRlc2MgPSBleERlc2MgKyBcIlxcblwiICsgaERhdGUuZGVzYztcblx0XHRcdFx0XHRcdFx0fVxuXHRcdFx0XHRcdFx0fSBlbHNlIHtcblx0XHRcdFx0XHRcdFx0aGlnaGxpZ2h0ZWREYXRlc1trZXlEYXRlXSA9IGhEYXRlO1xuXHRcdFx0XHRcdFx0fVxuXHRcdFx0XHRcdH0pO1xuXG5cdFx0XHRcdFx0b3B0aW9ucy5oaWdobGlnaHRlZERhdGVzID0gJC5leHRlbmQodHJ1ZSwgW10sIGhpZ2hsaWdodGVkRGF0ZXMpO1xuXHRcdFx0XHR9XG5cblx0XHRcdFx0aWYgKF9vcHRpb25zLmhpZ2hsaWdodGVkUGVyaW9kcyAmJiAkLmlzQXJyYXkoX29wdGlvbnMuaGlnaGxpZ2h0ZWRQZXJpb2RzKSAmJiBfb3B0aW9ucy5oaWdobGlnaHRlZFBlcmlvZHMubGVuZ3RoKSB7XG5cdFx0XHRcdFx0aGlnaGxpZ2h0ZWREYXRlcyA9ICQuZXh0ZW5kKHRydWUsIFtdLCBvcHRpb25zLmhpZ2hsaWdodGVkRGF0ZXMpO1xuXHRcdFx0XHRcdCQuZWFjaChfb3B0aW9ucy5oaWdobGlnaHRlZFBlcmlvZHMsIGZ1bmN0aW9uIChpbmRleCwgdmFsdWUpIHtcblx0XHRcdFx0XHRcdHZhciBkYXRlVGVzdCwgLy8gc3RhcnQgZGF0ZVxuXHRcdFx0XHRcdFx0XHRkYXRlRW5kLFxuXHRcdFx0XHRcdFx0XHRkZXNjLFxuXHRcdFx0XHRcdFx0XHRoRGF0ZSxcblx0XHRcdFx0XHRcdFx0a2V5RGF0ZSxcblx0XHRcdFx0XHRcdFx0ZXhEZXNjLFxuXHRcdFx0XHRcdFx0XHRzdHlsZTtcblx0XHRcdFx0XHRcdGlmICgkLmlzQXJyYXkodmFsdWUpKSB7XG5cdFx0XHRcdFx0XHRcdGRhdGVUZXN0ID0gdmFsdWVbMF07XG5cdFx0XHRcdFx0XHRcdGRhdGVFbmQgPSB2YWx1ZVsxXTtcblx0XHRcdFx0XHRcdFx0ZGVzYyA9IHZhbHVlWzJdO1xuXHRcdFx0XHRcdFx0XHRzdHlsZSA9IHZhbHVlWzNdO1xuXHRcdFx0XHRcdFx0fVxuXHRcdFx0XHRcdFx0ZWxzZSB7XG5cdFx0XHRcdFx0XHRcdHZhciBzcGxpdERhdGEgPSAkLm1hcCh2YWx1ZS5zcGxpdCgnLCcpLCAkLnRyaW0pO1xuXHRcdFx0XHRcdFx0XHRkYXRlVGVzdCA9IGRhdGVIZWxwZXIucGFyc2VEYXRlKHNwbGl0RGF0YVswXSwgb3B0aW9ucy5mb3JtYXREYXRlKTtcblx0XHRcdFx0XHRcdFx0ZGF0ZUVuZCA9IGRhdGVIZWxwZXIucGFyc2VEYXRlKHNwbGl0RGF0YVsxXSwgb3B0aW9ucy5mb3JtYXREYXRlKTtcblx0XHRcdFx0XHRcdFx0ZGVzYyA9IHNwbGl0RGF0YVsyXTtcblx0XHRcdFx0XHRcdFx0c3R5bGUgPSBzcGxpdERhdGFbM107XG5cdFx0XHRcdFx0XHR9XG5cblx0XHRcdFx0XHRcdHdoaWxlIChkYXRlVGVzdCA8PSBkYXRlRW5kKSB7XG5cdFx0XHRcdFx0XHRcdGhEYXRlID0gbmV3IEhpZ2hsaWdodGVkRGF0ZShkYXRlVGVzdCwgZGVzYywgc3R5bGUpO1xuXHRcdFx0XHRcdFx0XHRrZXlEYXRlID0gZGF0ZUhlbHBlci5mb3JtYXREYXRlKGRhdGVUZXN0LCBvcHRpb25zLmZvcm1hdERhdGUpO1xuXHRcdFx0XHRcdFx0XHRkYXRlVGVzdC5zZXREYXRlKGRhdGVUZXN0LmdldERhdGUoKSArIDEpO1xuXHRcdFx0XHRcdFx0XHRpZiAoaGlnaGxpZ2h0ZWREYXRlc1trZXlEYXRlXSAhPT0gdW5kZWZpbmVkKSB7XG5cdFx0XHRcdFx0XHRcdFx0ZXhEZXNjID0gaGlnaGxpZ2h0ZWREYXRlc1trZXlEYXRlXS5kZXNjO1xuXHRcdFx0XHRcdFx0XHRcdGlmIChleERlc2MgJiYgZXhEZXNjLmxlbmd0aCAmJiBoRGF0ZS5kZXNjICYmIGhEYXRlLmRlc2MubGVuZ3RoKSB7XG5cdFx0XHRcdFx0XHRcdFx0XHRoaWdobGlnaHRlZERhdGVzW2tleURhdGVdLmRlc2MgPSBleERlc2MgKyBcIlxcblwiICsgaERhdGUuZGVzYztcblx0XHRcdFx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0XHRcdH0gZWxzZSB7XG5cdFx0XHRcdFx0XHRcdFx0aGlnaGxpZ2h0ZWREYXRlc1trZXlEYXRlXSA9IGhEYXRlO1xuXHRcdFx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0fSk7XG5cblx0XHRcdFx0XHRvcHRpb25zLmhpZ2hsaWdodGVkRGF0ZXMgPSAkLmV4dGVuZCh0cnVlLCBbXSwgaGlnaGxpZ2h0ZWREYXRlcyk7XG5cdFx0XHRcdH1cblxuXHRcdFx0XHRpZiAoX29wdGlvbnMuZGlzYWJsZWREYXRlcyAmJiAkLmlzQXJyYXkoX29wdGlvbnMuZGlzYWJsZWREYXRlcykgJiYgX29wdGlvbnMuZGlzYWJsZWREYXRlcy5sZW5ndGgpIHtcblx0XHRcdFx0XHRvcHRpb25zLmRpc2FibGVkRGF0ZXMgPSAkLmV4dGVuZCh0cnVlLCBbXSwgX29wdGlvbnMuZGlzYWJsZWREYXRlcyk7XG5cdFx0XHRcdH1cblxuXHRcdFx0XHRpZiAoX29wdGlvbnMuZGlzYWJsZWRXZWVrRGF5cyAmJiAkLmlzQXJyYXkoX29wdGlvbnMuZGlzYWJsZWRXZWVrRGF5cykgJiYgX29wdGlvbnMuZGlzYWJsZWRXZWVrRGF5cy5sZW5ndGgpIHtcblx0XHRcdFx0XHRvcHRpb25zLmRpc2FibGVkV2Vla0RheXMgPSAkLmV4dGVuZCh0cnVlLCBbXSwgX29wdGlvbnMuZGlzYWJsZWRXZWVrRGF5cyk7XG5cdFx0XHRcdH1cblxuXHRcdFx0XHRpZiAoKG9wdGlvbnMub3BlbiB8fCBvcHRpb25zLm9wZW5lZCkgJiYgKCFvcHRpb25zLmlubGluZSkpIHtcblx0XHRcdFx0XHRpbnB1dC50cmlnZ2VyKCdvcGVuLnhkc29mdCcpO1xuXHRcdFx0XHR9XG5cblx0XHRcdFx0aWYgKG9wdGlvbnMuaW5saW5lKSB7XG5cdFx0XHRcdFx0dHJpZ2dlckFmdGVyT3BlbiA9IHRydWU7XG5cdFx0XHRcdFx0ZGF0ZXRpbWVwaWNrZXIuYWRkQ2xhc3MoJ3hkc29mdF9pbmxpbmUnKTtcblx0XHRcdFx0XHRpbnB1dC5hZnRlcihkYXRldGltZXBpY2tlcikuaGlkZSgpO1xuXHRcdFx0XHR9XG5cblx0XHRcdFx0aWYgKG9wdGlvbnMuaW52ZXJzZUJ1dHRvbikge1xuXHRcdFx0XHRcdG9wdGlvbnMubmV4dCA9ICd4ZHNvZnRfcHJldic7XG5cdFx0XHRcdFx0b3B0aW9ucy5wcmV2ID0gJ3hkc29mdF9uZXh0Jztcblx0XHRcdFx0fVxuXG5cdFx0XHRcdGlmIChvcHRpb25zLmRhdGVwaWNrZXIpIHtcblx0XHRcdFx0XHRkYXRlcGlja2VyLmFkZENsYXNzKCdhY3RpdmUnKTtcblx0XHRcdFx0fSBlbHNlIHtcblx0XHRcdFx0XHRkYXRlcGlja2VyLnJlbW92ZUNsYXNzKCdhY3RpdmUnKTtcblx0XHRcdFx0fVxuXG5cdFx0XHRcdGlmIChvcHRpb25zLnRpbWVwaWNrZXIpIHtcblx0XHRcdFx0XHR0aW1lcGlja2VyLmFkZENsYXNzKCdhY3RpdmUnKTtcblx0XHRcdFx0fSBlbHNlIHtcblx0XHRcdFx0XHR0aW1lcGlja2VyLnJlbW92ZUNsYXNzKCdhY3RpdmUnKTtcblx0XHRcdFx0fVxuXG5cdFx0XHRcdGlmIChvcHRpb25zLnZhbHVlKSB7XG5cdFx0XHRcdFx0X3hkc29mdF9kYXRldGltZS5zZXRDdXJyZW50VGltZShvcHRpb25zLnZhbHVlKTtcblx0XHRcdFx0XHRpZiAoaW5wdXQgJiYgaW5wdXQudmFsKSB7XG5cdFx0XHRcdFx0XHRpbnB1dC52YWwoX3hkc29mdF9kYXRldGltZS5zdHIpO1xuXHRcdFx0XHRcdH1cblx0XHRcdFx0fVxuXG5cdFx0XHRcdGlmIChpc05hTihvcHRpb25zLmRheU9mV2Vla1N0YXJ0KSkge1xuXHRcdFx0XHRcdG9wdGlvbnMuZGF5T2ZXZWVrU3RhcnQgPSAwO1xuXHRcdFx0XHR9IGVsc2Uge1xuXHRcdFx0XHRcdG9wdGlvbnMuZGF5T2ZXZWVrU3RhcnQgPSBwYXJzZUludChvcHRpb25zLmRheU9mV2Vla1N0YXJ0LCAxMCkgJSA3O1xuXHRcdFx0XHR9XG5cblx0XHRcdFx0aWYgKCFvcHRpb25zLnRpbWVwaWNrZXJTY3JvbGxiYXIpIHtcblx0XHRcdFx0XHR0aW1lYm94cGFyZW50Lnhkc29mdFNjcm9sbGVyKG9wdGlvbnMsICdoaWRlJyk7XG5cdFx0XHRcdH1cblxuXHRcdFx0XHRpZiAob3B0aW9ucy5taW5EYXRlICYmIC9eW1xcK1xcLV0oLiopJC8udGVzdChvcHRpb25zLm1pbkRhdGUpKSB7XG5cdFx0XHRcdFx0b3B0aW9ucy5taW5EYXRlID0gZGF0ZUhlbHBlci5mb3JtYXREYXRlKF94ZHNvZnRfZGF0ZXRpbWUuc3RyVG9EYXRlVGltZShvcHRpb25zLm1pbkRhdGUpLCBvcHRpb25zLmZvcm1hdERhdGUpO1xuXHRcdFx0XHR9XG5cblx0XHRcdFx0aWYgKG9wdGlvbnMubWF4RGF0ZSAmJiAgL15bXFwrXFwtXSguKikkLy50ZXN0KG9wdGlvbnMubWF4RGF0ZSkpIHtcblx0XHRcdFx0XHRvcHRpb25zLm1heERhdGUgPSBkYXRlSGVscGVyLmZvcm1hdERhdGUoX3hkc29mdF9kYXRldGltZS5zdHJUb0RhdGVUaW1lKG9wdGlvbnMubWF4RGF0ZSksIG9wdGlvbnMuZm9ybWF0RGF0ZSk7XG5cdFx0XHRcdH1cblxuICAgICAgICAgICAgICAgIGlmIChvcHRpb25zLm1pbkRhdGVUaW1lICYmICAvXlxcKyguKikkLy50ZXN0KG9wdGlvbnMubWluRGF0ZVRpbWUpKSB7XG4gICAgICAgICAgICAgICAgXHRvcHRpb25zLm1pbkRhdGVUaW1lID0gX3hkc29mdF9kYXRldGltZS5zdHJUb0RhdGVUaW1lKG9wdGlvbnMubWluRGF0ZVRpbWUpLmRhdGVGb3JtYXQob3B0aW9ucy5mb3JtYXREYXRlKTtcbiAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICBpZiAob3B0aW9ucy5tYXhEYXRlVGltZSAmJiAgL15cXCsoLiopJC8udGVzdChvcHRpb25zLm1heERhdGVUaW1lKSkge1xuICAgICAgICAgICAgICAgIFx0b3B0aW9ucy5tYXhEYXRlVGltZSA9IF94ZHNvZnRfZGF0ZXRpbWUuc3RyVG9EYXRlVGltZShvcHRpb25zLm1heERhdGVUaW1lKS5kYXRlRm9ybWF0KG9wdGlvbnMuZm9ybWF0RGF0ZSk7XG4gICAgICAgICAgICAgICAgfVxuXG5cdFx0XHRcdGFwcGx5QnV0dG9uLnRvZ2dsZShvcHRpb25zLnNob3dBcHBseUJ1dHRvbik7XG5cblx0XHRcdFx0bW9udGhfcGlja2VyXG5cdFx0XHRcdFx0LmZpbmQoJy54ZHNvZnRfdG9kYXlfYnV0dG9uJylcblx0XHRcdFx0XHQuY3NzKCd2aXNpYmlsaXR5JywgIW9wdGlvbnMudG9kYXlCdXR0b24gPyAnaGlkZGVuJyA6ICd2aXNpYmxlJyk7XG5cblx0XHRcdFx0bW9udGhfcGlja2VyXG5cdFx0XHRcdFx0LmZpbmQoJy4nICsgb3B0aW9ucy5wcmV2KVxuXHRcdFx0XHRcdC5jc3MoJ3Zpc2liaWxpdHknLCAhb3B0aW9ucy5wcmV2QnV0dG9uID8gJ2hpZGRlbicgOiAndmlzaWJsZScpO1xuXG5cdFx0XHRcdG1vbnRoX3BpY2tlclxuXHRcdFx0XHRcdC5maW5kKCcuJyArIG9wdGlvbnMubmV4dClcblx0XHRcdFx0XHQuY3NzKCd2aXNpYmlsaXR5JywgIW9wdGlvbnMubmV4dEJ1dHRvbiA/ICdoaWRkZW4nIDogJ3Zpc2libGUnKTtcblxuXHRcdFx0XHRzZXRNYXNrKG9wdGlvbnMpO1xuXG5cdFx0XHRcdGlmIChvcHRpb25zLnZhbGlkYXRlT25CbHVyKSB7XG5cdFx0XHRcdFx0aW5wdXRcblx0XHRcdFx0XHRcdC5vZmYoJ2JsdXIueGRzb2Z0Jylcblx0XHRcdFx0XHRcdC5vbignYmx1ci54ZHNvZnQnLCBmdW5jdGlvbiAoKSB7XG5cdFx0XHRcdFx0XHRcdGlmIChvcHRpb25zLmFsbG93QmxhbmsgJiYgKCEkLnRyaW0oJCh0aGlzKS52YWwoKSkubGVuZ3RoIHx8XG5cdFx0XHRcdFx0XHRcdFx0XHQodHlwZW9mIG9wdGlvbnMubWFzayA9PT0gXCJzdHJpbmdcIiAmJiAkLnRyaW0oJCh0aGlzKS52YWwoKSkgPT09IG9wdGlvbnMubWFzay5yZXBsYWNlKC9bMC05XS9nLCAnXycpKSkpIHtcblx0XHRcdFx0XHRcdFx0XHQkKHRoaXMpLnZhbChudWxsKTtcblx0XHRcdFx0XHRcdFx0XHRkYXRldGltZXBpY2tlci5kYXRhKCd4ZHNvZnRfZGF0ZXRpbWUnKS5lbXB0eSgpO1xuXHRcdFx0XHRcdFx0XHR9IGVsc2Uge1xuXHRcdFx0XHRcdFx0XHRcdHZhciBkID0gZGF0ZUhlbHBlci5wYXJzZURhdGUoJCh0aGlzKS52YWwoKSwgb3B0aW9ucy5mb3JtYXQpO1xuXHRcdFx0XHRcdFx0XHRcdGlmIChkKSB7IC8vIHBhcnNlRGF0ZSgpIG1heSBza2lwIHNvbWUgaW52YWxpZCBwYXJ0cyBsaWtlIGRhdGUgb3IgdGltZSwgc28gbWFrZSBpdCBjbGVhciBmb3IgdXNlcjogc2hvdyBwYXJzZWQgZGF0ZS90aW1lXG5cdFx0XHRcdFx0XHRcdFx0XHQkKHRoaXMpLnZhbChkYXRlSGVscGVyLmZvcm1hdERhdGUoZCwgb3B0aW9ucy5mb3JtYXQpKTtcblx0XHRcdFx0XHRcdFx0XHR9IGVsc2Uge1xuXHRcdFx0XHRcdFx0XHRcdFx0dmFyIHNwbGl0dGVkSG91cnMgICA9ICsoWyQodGhpcykudmFsKClbMF0sICQodGhpcykudmFsKClbMV1dLmpvaW4oJycpKSxcblx0XHRcdFx0XHRcdFx0XHRcdFx0c3BsaXR0ZWRNaW51dGVzID0gKyhbJCh0aGlzKS52YWwoKVsyXSwgJCh0aGlzKS52YWwoKVszXV0uam9pbignJykpO1xuXG5cdFx0XHRcdFx0XHRcdFx0XHQvLyBwYXJzZSB0aGUgbnVtYmVycyBhcyAwMzEyID0+IDAzOjEyXG5cdFx0XHRcdFx0XHRcdFx0XHRpZiAoIW9wdGlvbnMuZGF0ZXBpY2tlciAmJiBvcHRpb25zLnRpbWVwaWNrZXIgJiYgc3BsaXR0ZWRIb3VycyA+PSAwICYmIHNwbGl0dGVkSG91cnMgPCAyNCAmJiBzcGxpdHRlZE1pbnV0ZXMgPj0gMCAmJiBzcGxpdHRlZE1pbnV0ZXMgPCA2MCkge1xuXHRcdFx0XHRcdFx0XHRcdFx0XHQkKHRoaXMpLnZhbChbc3BsaXR0ZWRIb3Vycywgc3BsaXR0ZWRNaW51dGVzXS5tYXAoZnVuY3Rpb24gKGl0ZW0pIHtcblx0XHRcdFx0XHRcdFx0XHRcdFx0XHRyZXR1cm4gaXRlbSA+IDkgPyBpdGVtIDogJzAnICsgaXRlbTtcblx0XHRcdFx0XHRcdFx0XHRcdFx0fSkuam9pbignOicpKTtcblx0XHRcdFx0XHRcdFx0XHRcdH0gZWxzZSB7XG5cdFx0XHRcdFx0XHRcdFx0XHRcdCQodGhpcykudmFsKGRhdGVIZWxwZXIuZm9ybWF0RGF0ZShfeGRzb2Z0X2RhdGV0aW1lLm5vdygpLCBvcHRpb25zLmZvcm1hdCkpO1xuXHRcdFx0XHRcdFx0XHRcdFx0fVxuXHRcdFx0XHRcdFx0XHRcdH1cblx0XHRcdFx0XHRcdFx0XHRkYXRldGltZXBpY2tlci5kYXRhKCd4ZHNvZnRfZGF0ZXRpbWUnKS5zZXRDdXJyZW50VGltZSgkKHRoaXMpLnZhbCgpKTtcblx0XHRcdFx0XHRcdFx0fVxuXG5cdFx0XHRcdFx0XHRcdGRhdGV0aW1lcGlja2VyLnRyaWdnZXIoJ2NoYW5nZWRhdGV0aW1lLnhkc29mdCcpO1xuXHRcdFx0XHRcdFx0XHRkYXRldGltZXBpY2tlci50cmlnZ2VyKCdjbG9zZS54ZHNvZnQnKTtcblx0XHRcdFx0XHRcdH0pO1xuXHRcdFx0XHR9XG5cdFx0XHRcdG9wdGlvbnMuZGF5T2ZXZWVrU3RhcnRQcmV2ID0gKG9wdGlvbnMuZGF5T2ZXZWVrU3RhcnQgPT09IDApID8gNiA6IG9wdGlvbnMuZGF5T2ZXZWVrU3RhcnQgLSAxO1xuXG5cdFx0XHRcdGRhdGV0aW1lcGlja2VyXG5cdFx0XHRcdFx0LnRyaWdnZXIoJ3hjaGFuZ2UueGRzb2Z0Jylcblx0XHRcdFx0XHQudHJpZ2dlcignYWZ0ZXJPcGVuLnhkc29mdCcpO1xuXHRcdFx0fTtcblxuXHRcdFx0ZGF0ZXRpbWVwaWNrZXJcblx0XHRcdFx0LmRhdGEoJ29wdGlvbnMnLCBvcHRpb25zKVxuXHRcdFx0XHQub24oJ3RvdWNoc3RhcnQgbW91c2Vkb3duLnhkc29mdCcsIGZ1bmN0aW9uIChldmVudCkge1xuXHRcdFx0XHRcdGV2ZW50LnN0b3BQcm9wYWdhdGlvbigpO1xuXHRcdFx0XHRcdGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG5cdFx0XHRcdFx0eWVhcnNlbGVjdC5oaWRlKCk7XG5cdFx0XHRcdFx0bW9udGhzZWxlY3QuaGlkZSgpO1xuXHRcdFx0XHRcdHJldHVybiBmYWxzZTtcblx0XHRcdFx0fSk7XG5cblx0XHRcdC8vc2Nyb2xsX2VsZW1lbnQgPSB0aW1lcGlja2VyLmZpbmQoJy54ZHNvZnRfdGltZV9ib3gnKTtcblx0XHRcdHRpbWVib3hwYXJlbnQuYXBwZW5kKHRpbWVib3gpO1xuXHRcdFx0dGltZWJveHBhcmVudC54ZHNvZnRTY3JvbGxlcihvcHRpb25zKTtcblxuXHRcdFx0ZGF0ZXRpbWVwaWNrZXIub24oJ2FmdGVyT3Blbi54ZHNvZnQnLCBmdW5jdGlvbiAoKSB7XG5cdFx0XHRcdHRpbWVib3hwYXJlbnQueGRzb2Z0U2Nyb2xsZXIob3B0aW9ucyk7XG5cdFx0XHR9KTtcblxuXHRcdFx0ZGF0ZXRpbWVwaWNrZXJcblx0XHRcdFx0LmFwcGVuZChkYXRlcGlja2VyKVxuXHRcdFx0XHQuYXBwZW5kKHRpbWVwaWNrZXIpO1xuXG5cdFx0XHRpZiAob3B0aW9ucy53aXRob3V0Q29weXJpZ2h0ICE9PSB0cnVlKSB7XG5cdFx0XHRcdGRhdGV0aW1lcGlja2VyXG5cdFx0XHRcdFx0LmFwcGVuZCh4ZHNvZnRfY29weXJpZ2h0KTtcblx0XHRcdH1cblxuXHRcdFx0ZGF0ZXBpY2tlclxuXHRcdFx0XHQuYXBwZW5kKG1vbnRoX3BpY2tlcilcblx0XHRcdFx0LmFwcGVuZChjYWxlbmRhcilcblx0XHRcdFx0LmFwcGVuZChhcHBseUJ1dHRvbik7XG5cbiAgICAgICAgICAgIGlmIChvcHRpb25zLmluc2lkZVBhcmVudCkge1xuICAgICAgICAgICAgICAgICQoaW5wdXQpLnBhcmVudCgpLmFwcGVuZChkYXRldGltZXBpY2tlcik7XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICQob3B0aW9ucy5wYXJlbnRJRCkuYXBwZW5kKGRhdGV0aW1lcGlja2VyKTtcbiAgICAgICAgICAgIH1cblxuXHRcdFx0WERTb2Z0X2RhdGV0aW1lID0gZnVuY3Rpb24gKCkge1xuXHRcdFx0XHR2YXIgX3RoaXMgPSB0aGlzO1xuXHRcdFx0XHRfdGhpcy5ub3cgPSBmdW5jdGlvbiAobm9yZWN1cnNpb24pIHtcblx0XHRcdFx0XHR2YXIgZCA9IG5ldyBEYXRlKCksXG5cdFx0XHRcdFx0XHRkYXRlLFxuXHRcdFx0XHRcdFx0dGltZTtcblxuXHRcdFx0XHRcdGlmICghbm9yZWN1cnNpb24gJiYgb3B0aW9ucy5kZWZhdWx0RGF0ZSkge1xuXHRcdFx0XHRcdFx0ZGF0ZSA9IF90aGlzLnN0clRvRGF0ZVRpbWUob3B0aW9ucy5kZWZhdWx0RGF0ZSk7XG5cdFx0XHRcdFx0XHRkLnNldEZ1bGxZZWFyKGRhdGUuZ2V0RnVsbFllYXIoKSk7XG5cdFx0XHRcdFx0XHRkLnNldE1vbnRoKGRhdGUuZ2V0TW9udGgoKSk7XG5cdFx0XHRcdFx0XHRkLnNldERhdGUoZGF0ZS5nZXREYXRlKCkpO1xuXHRcdFx0XHRcdH1cblxuXHRcdFx0XHRcdGQuc2V0RnVsbFllYXIoZC5nZXRGdWxsWWVhcigpKTtcblxuXHRcdFx0XHRcdGlmICghbm9yZWN1cnNpb24gJiYgb3B0aW9ucy5kZWZhdWx0VGltZSkge1xuXHRcdFx0XHRcdFx0dGltZSA9IF90aGlzLnN0cnRvdGltZShvcHRpb25zLmRlZmF1bHRUaW1lKTtcblx0XHRcdFx0XHRcdGQuc2V0SG91cnModGltZS5nZXRIb3VycygpKTtcblx0XHRcdFx0XHRcdGQuc2V0TWludXRlcyh0aW1lLmdldE1pbnV0ZXMoKSk7XG5cdFx0XHRcdFx0XHRkLnNldFNlY29uZHModGltZS5nZXRTZWNvbmRzKCkpO1xuXHRcdFx0XHRcdFx0ZC5zZXRNaWxsaXNlY29uZHModGltZS5nZXRNaWxsaXNlY29uZHMoKSk7XG5cdFx0XHRcdFx0fVxuXHRcdFx0XHRcdHJldHVybiBkO1xuXHRcdFx0XHR9O1xuXG5cdFx0XHRcdF90aGlzLmlzVmFsaWREYXRlID0gZnVuY3Rpb24gKGQpIHtcblx0XHRcdFx0XHRpZiAoT2JqZWN0LnByb3RvdHlwZS50b1N0cmluZy5jYWxsKGQpICE9PSBcIltvYmplY3QgRGF0ZV1cIikge1xuXHRcdFx0XHRcdFx0cmV0dXJuIGZhbHNlO1xuXHRcdFx0XHRcdH1cblx0XHRcdFx0XHRyZXR1cm4gIWlzTmFOKGQuZ2V0VGltZSgpKTtcblx0XHRcdFx0fTtcblxuXHRcdFx0XHRfdGhpcy5zZXRDdXJyZW50VGltZSA9IGZ1bmN0aW9uIChkVGltZSwgcmVxdWlyZVZhbGlkRGF0ZSkge1xuXHRcdFx0XHRcdGlmICh0eXBlb2YgZFRpbWUgPT09ICdzdHJpbmcnKSB7XG5cdFx0XHRcdFx0XHRfdGhpcy5jdXJyZW50VGltZSA9IF90aGlzLnN0clRvRGF0ZVRpbWUoZFRpbWUpO1xuXHRcdFx0XHRcdH1cblx0XHRcdFx0XHRlbHNlIGlmIChfdGhpcy5pc1ZhbGlkRGF0ZShkVGltZSkpIHtcblx0XHRcdFx0XHRcdF90aGlzLmN1cnJlbnRUaW1lID0gZFRpbWU7XG5cdFx0XHRcdFx0fVxuXHRcdFx0XHRcdGVsc2UgaWYgKCFkVGltZSAmJiAhcmVxdWlyZVZhbGlkRGF0ZSAmJiBvcHRpb25zLmFsbG93QmxhbmsgJiYgIW9wdGlvbnMuaW5saW5lKSB7XG5cdFx0XHRcdFx0XHRfdGhpcy5jdXJyZW50VGltZSA9IG51bGw7XG5cdFx0XHRcdFx0fVxuXHRcdFx0XHRcdGVsc2Uge1xuXHRcdFx0XHRcdFx0X3RoaXMuY3VycmVudFRpbWUgPSBfdGhpcy5ub3coKTtcblx0XHRcdFx0XHR9XG5cblx0XHRcdFx0XHRkYXRldGltZXBpY2tlci50cmlnZ2VyKCd4Y2hhbmdlLnhkc29mdCcpO1xuXHRcdFx0XHR9O1xuXG5cdFx0XHRcdF90aGlzLmVtcHR5ID0gZnVuY3Rpb24gKCkge1xuXHRcdFx0XHRcdF90aGlzLmN1cnJlbnRUaW1lID0gbnVsbDtcblx0XHRcdFx0fTtcblxuXHRcdFx0XHRfdGhpcy5nZXRDdXJyZW50VGltZSA9IGZ1bmN0aW9uICgpIHtcblx0XHRcdFx0XHRyZXR1cm4gX3RoaXMuY3VycmVudFRpbWU7XG5cdFx0XHRcdH07XG5cblx0XHRcdFx0X3RoaXMubmV4dE1vbnRoID0gZnVuY3Rpb24gKCkge1xuXG5cdFx0XHRcdFx0aWYgKF90aGlzLmN1cnJlbnRUaW1lID09PSB1bmRlZmluZWQgfHwgX3RoaXMuY3VycmVudFRpbWUgPT09IG51bGwpIHtcblx0XHRcdFx0XHRcdF90aGlzLmN1cnJlbnRUaW1lID0gX3RoaXMubm93KCk7XG5cdFx0XHRcdFx0fVxuXG5cdFx0XHRcdFx0dmFyIG1vbnRoID0gX3RoaXMuY3VycmVudFRpbWUuZ2V0TW9udGgoKSArIDEsXG5cdFx0XHRcdFx0XHR5ZWFyO1xuXHRcdFx0XHRcdGlmIChtb250aCA9PT0gMTIpIHtcblx0XHRcdFx0XHRcdF90aGlzLmN1cnJlbnRUaW1lLnNldEZ1bGxZZWFyKF90aGlzLmN1cnJlbnRUaW1lLmdldEZ1bGxZZWFyKCkgKyAxKTtcblx0XHRcdFx0XHRcdG1vbnRoID0gMDtcblx0XHRcdFx0XHR9XG5cblx0XHRcdFx0XHR5ZWFyID0gX3RoaXMuY3VycmVudFRpbWUuZ2V0RnVsbFllYXIoKTtcblxuXHRcdFx0XHRcdF90aGlzLmN1cnJlbnRUaW1lLnNldERhdGUoXG5cdFx0XHRcdFx0XHRNYXRoLm1pbihcblx0XHRcdFx0XHRcdFx0bmV3IERhdGUoX3RoaXMuY3VycmVudFRpbWUuZ2V0RnVsbFllYXIoKSwgbW9udGggKyAxLCAwKS5nZXREYXRlKCksXG5cdFx0XHRcdFx0XHRcdF90aGlzLmN1cnJlbnRUaW1lLmdldERhdGUoKVxuXHRcdFx0XHRcdFx0KVxuXHRcdFx0XHRcdCk7XG5cdFx0XHRcdFx0X3RoaXMuY3VycmVudFRpbWUuc2V0TW9udGgobW9udGgpO1xuXG5cdFx0XHRcdFx0aWYgKG9wdGlvbnMub25DaGFuZ2VNb250aCAmJiAkLmlzRnVuY3Rpb24ob3B0aW9ucy5vbkNoYW5nZU1vbnRoKSkge1xuXHRcdFx0XHRcdFx0b3B0aW9ucy5vbkNoYW5nZU1vbnRoLmNhbGwoZGF0ZXRpbWVwaWNrZXIsIF94ZHNvZnRfZGF0ZXRpbWUuY3VycmVudFRpbWUsIGRhdGV0aW1lcGlja2VyLmRhdGEoJ2lucHV0JykpO1xuXHRcdFx0XHRcdH1cblxuXHRcdFx0XHRcdGlmICh5ZWFyICE9PSBfdGhpcy5jdXJyZW50VGltZS5nZXRGdWxsWWVhcigpICYmICQuaXNGdW5jdGlvbihvcHRpb25zLm9uQ2hhbmdlWWVhcikpIHtcblx0XHRcdFx0XHRcdG9wdGlvbnMub25DaGFuZ2VZZWFyLmNhbGwoZGF0ZXRpbWVwaWNrZXIsIF94ZHNvZnRfZGF0ZXRpbWUuY3VycmVudFRpbWUsIGRhdGV0aW1lcGlja2VyLmRhdGEoJ2lucHV0JykpO1xuXHRcdFx0XHRcdH1cblxuXHRcdFx0XHRcdGRhdGV0aW1lcGlja2VyLnRyaWdnZXIoJ3hjaGFuZ2UueGRzb2Z0Jyk7XG5cdFx0XHRcdFx0cmV0dXJuIG1vbnRoO1xuXHRcdFx0XHR9O1xuXG5cdFx0XHRcdF90aGlzLnByZXZNb250aCA9IGZ1bmN0aW9uICgpIHtcblxuXHRcdFx0XHRcdGlmIChfdGhpcy5jdXJyZW50VGltZSA9PT0gdW5kZWZpbmVkIHx8IF90aGlzLmN1cnJlbnRUaW1lID09PSBudWxsKSB7XG5cdFx0XHRcdFx0XHRfdGhpcy5jdXJyZW50VGltZSA9IF90aGlzLm5vdygpO1xuXHRcdFx0XHRcdH1cblxuXHRcdFx0XHRcdHZhciBtb250aCA9IF90aGlzLmN1cnJlbnRUaW1lLmdldE1vbnRoKCkgLSAxO1xuXHRcdFx0XHRcdGlmIChtb250aCA9PT0gLTEpIHtcblx0XHRcdFx0XHRcdF90aGlzLmN1cnJlbnRUaW1lLnNldEZ1bGxZZWFyKF90aGlzLmN1cnJlbnRUaW1lLmdldEZ1bGxZZWFyKCkgLSAxKTtcblx0XHRcdFx0XHRcdG1vbnRoID0gMTE7XG5cdFx0XHRcdFx0fVxuXHRcdFx0XHRcdF90aGlzLmN1cnJlbnRUaW1lLnNldERhdGUoXG5cdFx0XHRcdFx0XHRNYXRoLm1pbihcblx0XHRcdFx0XHRcdFx0bmV3IERhdGUoX3RoaXMuY3VycmVudFRpbWUuZ2V0RnVsbFllYXIoKSwgbW9udGggKyAxLCAwKS5nZXREYXRlKCksXG5cdFx0XHRcdFx0XHRcdF90aGlzLmN1cnJlbnRUaW1lLmdldERhdGUoKVxuXHRcdFx0XHRcdFx0KVxuXHRcdFx0XHRcdCk7XG5cdFx0XHRcdFx0X3RoaXMuY3VycmVudFRpbWUuc2V0TW9udGgobW9udGgpO1xuXHRcdFx0XHRcdGlmIChvcHRpb25zLm9uQ2hhbmdlTW9udGggJiYgJC5pc0Z1bmN0aW9uKG9wdGlvbnMub25DaGFuZ2VNb250aCkpIHtcblx0XHRcdFx0XHRcdG9wdGlvbnMub25DaGFuZ2VNb250aC5jYWxsKGRhdGV0aW1lcGlja2VyLCBfeGRzb2Z0X2RhdGV0aW1lLmN1cnJlbnRUaW1lLCBkYXRldGltZXBpY2tlci5kYXRhKCdpbnB1dCcpKTtcblx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0ZGF0ZXRpbWVwaWNrZXIudHJpZ2dlcigneGNoYW5nZS54ZHNvZnQnKTtcblx0XHRcdFx0XHRyZXR1cm4gbW9udGg7XG5cdFx0XHRcdH07XG5cblx0XHRcdFx0X3RoaXMuZ2V0V2Vla09mWWVhciA9IGZ1bmN0aW9uIChkYXRldGltZSkge1xuXHRcdFx0XHRcdGlmIChvcHRpb25zLm9uR2V0V2Vla09mWWVhciAmJiAkLmlzRnVuY3Rpb24ob3B0aW9ucy5vbkdldFdlZWtPZlllYXIpKSB7XG5cdFx0XHRcdFx0XHR2YXIgd2VlayA9IG9wdGlvbnMub25HZXRXZWVrT2ZZZWFyLmNhbGwoZGF0ZXRpbWVwaWNrZXIsIGRhdGV0aW1lKTtcblx0XHRcdFx0XHRcdGlmICh0eXBlb2Ygd2VlayAhPT0gJ3VuZGVmaW5lZCcpIHtcblx0XHRcdFx0XHRcdFx0cmV0dXJuIHdlZWs7XG5cdFx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0fVxuXHRcdFx0XHRcdHZhciBvbmVqYW4gPSBuZXcgRGF0ZShkYXRldGltZS5nZXRGdWxsWWVhcigpLCAwLCAxKTtcblxuXHRcdFx0XHRcdC8vRmlyc3Qgd2VlayBvZiB0aGUgeWVhciBpcyB0aCBvbmUgd2l0aCB0aGUgZmlyc3QgVGh1cnNkYXkgYWNjb3JkaW5nIHRvIElTTzg2MDFcblx0XHRcdFx0XHRpZiAob25lamFuLmdldERheSgpICE9PSA0KSB7XG5cdFx0XHRcdFx0XHRvbmVqYW4uc2V0TW9udGgoMCwgMSArICgoNCAtIG9uZWphbi5nZXREYXkoKSsgNykgJSA3KSk7XG5cdFx0XHRcdFx0fVxuXG5cdFx0XHRcdFx0cmV0dXJuIE1hdGguY2VpbCgoKChkYXRldGltZSAtIG9uZWphbikgLyA4NjQwMDAwMCkgKyBvbmVqYW4uZ2V0RGF5KCkgKyAxKSAvIDcpO1xuXHRcdFx0XHR9O1xuXG5cdFx0XHRcdF90aGlzLnN0clRvRGF0ZVRpbWUgPSBmdW5jdGlvbiAoc0RhdGVUaW1lKSB7XG5cdFx0XHRcdFx0dmFyIHRtcERhdGUgPSBbXSwgdGltZU9mZnNldCwgY3VycmVudFRpbWU7XG5cblx0XHRcdFx0XHRpZiAoc0RhdGVUaW1lICYmIHNEYXRlVGltZSBpbnN0YW5jZW9mIERhdGUgJiYgX3RoaXMuaXNWYWxpZERhdGUoc0RhdGVUaW1lKSkge1xuXHRcdFx0XHRcdFx0cmV0dXJuIHNEYXRlVGltZTtcblx0XHRcdFx0XHR9XG5cblx0XHRcdFx0XHR0bXBEYXRlID0gL14oWystXXsxfSkoLiopJC8uZXhlYyhzRGF0ZVRpbWUpO1xuXG5cdFx0XHRcdFx0aWYgKHRtcERhdGUpIHtcblx0XHRcdFx0XHRcdHRtcERhdGVbMl0gPSBkYXRlSGVscGVyLnBhcnNlRGF0ZSh0bXBEYXRlWzJdLCBvcHRpb25zLmZvcm1hdERhdGUpO1xuXHRcdFx0XHRcdH1cblxuXHRcdFx0XHRcdGlmICh0bXBEYXRlICAmJiB0bXBEYXRlWzJdKSB7XG5cdFx0XHRcdFx0XHR0aW1lT2Zmc2V0ID0gdG1wRGF0ZVsyXS5nZXRUaW1lKCkgLSAodG1wRGF0ZVsyXS5nZXRUaW1lem9uZU9mZnNldCgpKSAqIDYwMDAwO1xuXHRcdFx0XHRcdFx0Y3VycmVudFRpbWUgPSBuZXcgRGF0ZSgoX3RoaXMubm93KHRydWUpKS5nZXRUaW1lKCkgKyBwYXJzZUludCh0bXBEYXRlWzFdICsgJzEnLCAxMCkgKiB0aW1lT2Zmc2V0KTtcblx0XHRcdFx0XHR9IGVsc2Uge1xuXHRcdFx0XHRcdFx0Y3VycmVudFRpbWUgPSBzRGF0ZVRpbWUgPyBkYXRlSGVscGVyLnBhcnNlRGF0ZShzRGF0ZVRpbWUsIG9wdGlvbnMuZm9ybWF0KSA6IF90aGlzLm5vdygpO1xuXHRcdFx0XHRcdH1cblxuXHRcdFx0XHRcdGlmICghX3RoaXMuaXNWYWxpZERhdGUoY3VycmVudFRpbWUpKSB7XG5cdFx0XHRcdFx0XHRjdXJyZW50VGltZSA9IF90aGlzLm5vdygpO1xuXHRcdFx0XHRcdH1cblxuXHRcdFx0XHRcdHJldHVybiBjdXJyZW50VGltZTtcblx0XHRcdFx0fTtcblxuXHRcdFx0XHRfdGhpcy5zdHJUb0RhdGUgPSBmdW5jdGlvbiAoc0RhdGUpIHtcblx0XHRcdFx0XHRpZiAoc0RhdGUgJiYgc0RhdGUgaW5zdGFuY2VvZiBEYXRlICYmIF90aGlzLmlzVmFsaWREYXRlKHNEYXRlKSkge1xuXHRcdFx0XHRcdFx0cmV0dXJuIHNEYXRlO1xuXHRcdFx0XHRcdH1cblxuXHRcdFx0XHRcdHZhciBjdXJyZW50VGltZSA9IHNEYXRlID8gZGF0ZUhlbHBlci5wYXJzZURhdGUoc0RhdGUsIG9wdGlvbnMuZm9ybWF0RGF0ZSkgOiBfdGhpcy5ub3codHJ1ZSk7XG5cdFx0XHRcdFx0aWYgKCFfdGhpcy5pc1ZhbGlkRGF0ZShjdXJyZW50VGltZSkpIHtcblx0XHRcdFx0XHRcdGN1cnJlbnRUaW1lID0gX3RoaXMubm93KHRydWUpO1xuXHRcdFx0XHRcdH1cblx0XHRcdFx0XHRyZXR1cm4gY3VycmVudFRpbWU7XG5cdFx0XHRcdH07XG5cblx0XHRcdFx0X3RoaXMuc3RydG90aW1lID0gZnVuY3Rpb24gKHNUaW1lKSB7XG5cdFx0XHRcdFx0aWYgKHNUaW1lICYmIHNUaW1lIGluc3RhbmNlb2YgRGF0ZSAmJiBfdGhpcy5pc1ZhbGlkRGF0ZShzVGltZSkpIHtcblx0XHRcdFx0XHRcdHJldHVybiBzVGltZTtcblx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0dmFyIGN1cnJlbnRUaW1lID0gc1RpbWUgPyBkYXRlSGVscGVyLnBhcnNlRGF0ZShzVGltZSwgb3B0aW9ucy5mb3JtYXRUaW1lKSA6IF90aGlzLm5vdyh0cnVlKTtcblx0XHRcdFx0XHRpZiAoIV90aGlzLmlzVmFsaWREYXRlKGN1cnJlbnRUaW1lKSkge1xuXHRcdFx0XHRcdFx0Y3VycmVudFRpbWUgPSBfdGhpcy5ub3codHJ1ZSk7XG5cdFx0XHRcdFx0fVxuXHRcdFx0XHRcdHJldHVybiBjdXJyZW50VGltZTtcblx0XHRcdFx0fTtcblxuXHRcdFx0XHRfdGhpcy5zdHIgPSBmdW5jdGlvbiAoKSB7XG5cdFx0XHRcdFx0dmFyIGZvcm1hdCA9IG9wdGlvbnMuZm9ybWF0O1xuXHRcdFx0XHRcdGlmIChvcHRpb25zLnllYXJPZmZzZXQpIHtcblx0XHRcdFx0XHRcdGZvcm1hdCA9IGZvcm1hdC5yZXBsYWNlKCdZJywgX3RoaXMuY3VycmVudFRpbWUuZ2V0RnVsbFllYXIoKSArIG9wdGlvbnMueWVhck9mZnNldCk7XG5cdFx0XHRcdFx0XHRmb3JtYXQgPSBmb3JtYXQucmVwbGFjZSgneScsIFN0cmluZyhfdGhpcy5jdXJyZW50VGltZS5nZXRGdWxsWWVhcigpICsgb3B0aW9ucy55ZWFyT2Zmc2V0KS5zdWJzdHJpbmcoMiwgNCkpO1xuXHRcdFx0XHRcdH1cblx0XHRcdFx0XHRyZXR1cm4gZGF0ZUhlbHBlci5mb3JtYXREYXRlKF90aGlzLmN1cnJlbnRUaW1lLCBmb3JtYXQpO1xuXHRcdFx0XHR9O1xuXHRcdFx0XHRfdGhpcy5jdXJyZW50VGltZSA9IHRoaXMubm93KCk7XG5cdFx0XHR9O1xuXG5cdFx0XHRfeGRzb2Z0X2RhdGV0aW1lID0gbmV3IFhEU29mdF9kYXRldGltZSgpO1xuXG5cdFx0XHRhcHBseUJ1dHRvbi5vbigndG91Y2hlbmQgY2xpY2snLCBmdW5jdGlvbiAoZSkgey8vcGF0aGJyaXRlXG5cdFx0XHRcdGUucHJldmVudERlZmF1bHQoKTtcblx0XHRcdFx0ZGF0ZXRpbWVwaWNrZXIuZGF0YSgnY2hhbmdlZCcsIHRydWUpO1xuXHRcdFx0XHRfeGRzb2Z0X2RhdGV0aW1lLnNldEN1cnJlbnRUaW1lKGdldEN1cnJlbnRWYWx1ZSgpKTtcblx0XHRcdFx0aW5wdXQudmFsKF94ZHNvZnRfZGF0ZXRpbWUuc3RyKCkpO1xuXHRcdFx0XHRkYXRldGltZXBpY2tlci50cmlnZ2VyKCdjbG9zZS54ZHNvZnQnKTtcblx0XHRcdH0pO1xuXHRcdFx0bW9udGhfcGlja2VyXG5cdFx0XHRcdC5maW5kKCcueGRzb2Z0X3RvZGF5X2J1dHRvbicpXG5cdFx0XHRcdC5vbigndG91Y2hlbmQgbW91c2Vkb3duLnhkc29mdCcsIGZ1bmN0aW9uICgpIHtcblx0XHRcdFx0XHRkYXRldGltZXBpY2tlci5kYXRhKCdjaGFuZ2VkJywgdHJ1ZSk7XG5cdFx0XHRcdFx0X3hkc29mdF9kYXRldGltZS5zZXRDdXJyZW50VGltZSgwLCB0cnVlKTtcblx0XHRcdFx0XHRkYXRldGltZXBpY2tlci50cmlnZ2VyKCdhZnRlck9wZW4ueGRzb2Z0Jyk7XG5cdFx0XHRcdH0pLm9uKCdkYmxjbGljay54ZHNvZnQnLCBmdW5jdGlvbiAoKSB7XG5cdFx0XHRcdHZhciBjdXJyZW50RGF0ZSA9IF94ZHNvZnRfZGF0ZXRpbWUuZ2V0Q3VycmVudFRpbWUoKSwgbWluRGF0ZSwgbWF4RGF0ZTtcblx0XHRcdFx0Y3VycmVudERhdGUgPSBuZXcgRGF0ZShjdXJyZW50RGF0ZS5nZXRGdWxsWWVhcigpLCBjdXJyZW50RGF0ZS5nZXRNb250aCgpLCBjdXJyZW50RGF0ZS5nZXREYXRlKCkpO1xuXHRcdFx0XHRtaW5EYXRlID0gX3hkc29mdF9kYXRldGltZS5zdHJUb0RhdGUob3B0aW9ucy5taW5EYXRlKTtcblx0XHRcdFx0bWluRGF0ZSA9IG5ldyBEYXRlKG1pbkRhdGUuZ2V0RnVsbFllYXIoKSwgbWluRGF0ZS5nZXRNb250aCgpLCBtaW5EYXRlLmdldERhdGUoKSk7XG5cdFx0XHRcdGlmIChjdXJyZW50RGF0ZSA8IG1pbkRhdGUpIHtcblx0XHRcdFx0XHRyZXR1cm47XG5cdFx0XHRcdH1cblx0XHRcdFx0bWF4RGF0ZSA9IF94ZHNvZnRfZGF0ZXRpbWUuc3RyVG9EYXRlKG9wdGlvbnMubWF4RGF0ZSk7XG5cdFx0XHRcdG1heERhdGUgPSBuZXcgRGF0ZShtYXhEYXRlLmdldEZ1bGxZZWFyKCksIG1heERhdGUuZ2V0TW9udGgoKSwgbWF4RGF0ZS5nZXREYXRlKCkpO1xuXHRcdFx0XHRpZiAoY3VycmVudERhdGUgPiBtYXhEYXRlKSB7XG5cdFx0XHRcdFx0cmV0dXJuO1xuXHRcdFx0XHR9XG5cdFx0XHRcdGlucHV0LnZhbChfeGRzb2Z0X2RhdGV0aW1lLnN0cigpKTtcblx0XHRcdFx0aW5wdXQudHJpZ2dlcignY2hhbmdlJyk7XG5cdFx0XHRcdGRhdGV0aW1lcGlja2VyLnRyaWdnZXIoJ2Nsb3NlLnhkc29mdCcpO1xuXHRcdFx0fSk7XG5cdFx0XHRtb250aF9waWNrZXJcblx0XHRcdFx0LmZpbmQoJy54ZHNvZnRfcHJldiwueGRzb2Z0X25leHQnKVxuXHRcdFx0XHQub24oJ3RvdWNoZW5kIG1vdXNlZG93bi54ZHNvZnQnLCBmdW5jdGlvbiAoKSB7XG5cdFx0XHRcdFx0dmFyICR0aGlzID0gJCh0aGlzKSxcblx0XHRcdFx0XHRcdHRpbWVyID0gMCxcblx0XHRcdFx0XHRcdHN0b3AgPSBmYWxzZTtcblxuXHRcdFx0XHRcdChmdW5jdGlvbiBhcmd1bWVudHNfY2FsbGVlMSh2KSB7XG5cdFx0XHRcdFx0XHRpZiAoJHRoaXMuaGFzQ2xhc3Mob3B0aW9ucy5uZXh0KSkge1xuXHRcdFx0XHRcdFx0XHRfeGRzb2Z0X2RhdGV0aW1lLm5leHRNb250aCgpO1xuXHRcdFx0XHRcdFx0fSBlbHNlIGlmICgkdGhpcy5oYXNDbGFzcyhvcHRpb25zLnByZXYpKSB7XG5cdFx0XHRcdFx0XHRcdF94ZHNvZnRfZGF0ZXRpbWUucHJldk1vbnRoKCk7XG5cdFx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0XHRpZiAob3B0aW9ucy5tb250aENoYW5nZVNwaW5uZXIpIHtcblx0XHRcdFx0XHRcdFx0aWYgKCFzdG9wKSB7XG5cdFx0XHRcdFx0XHRcdFx0dGltZXIgPSBzZXRUaW1lb3V0KGFyZ3VtZW50c19jYWxsZWUxLCB2IHx8IDEwMCk7XG5cdFx0XHRcdFx0XHRcdH1cblx0XHRcdFx0XHRcdH1cblx0XHRcdFx0XHR9KDUwMCkpO1xuXG5cdFx0XHRcdFx0JChbb3B0aW9ucy5vd25lckRvY3VtZW50LmJvZHksIG9wdGlvbnMuY29udGVudFdpbmRvd10pLm9uKCd0b3VjaGVuZCBtb3VzZXVwLnhkc29mdCcsIGZ1bmN0aW9uIGFyZ3VtZW50c19jYWxsZWUyKCkge1xuXHRcdFx0XHRcdFx0Y2xlYXJUaW1lb3V0KHRpbWVyKTtcblx0XHRcdFx0XHRcdHN0b3AgPSB0cnVlO1xuXHRcdFx0XHRcdFx0JChbb3B0aW9ucy5vd25lckRvY3VtZW50LmJvZHksIG9wdGlvbnMuY29udGVudFdpbmRvd10pLm9mZigndG91Y2hlbmQgbW91c2V1cC54ZHNvZnQnLCBhcmd1bWVudHNfY2FsbGVlMik7XG5cdFx0XHRcdFx0fSk7XG5cdFx0XHRcdH0pO1xuXG5cdFx0XHR0aW1lcGlja2VyXG5cdFx0XHRcdC5maW5kKCcueGRzb2Z0X3ByZXYsLnhkc29mdF9uZXh0Jylcblx0XHRcdFx0Lm9uKCd0b3VjaGVuZCBtb3VzZWRvd24ueGRzb2Z0JywgZnVuY3Rpb24gKCkge1xuXHRcdFx0XHRcdHZhciAkdGhpcyA9ICQodGhpcyksXG5cdFx0XHRcdFx0XHR0aW1lciA9IDAsXG5cdFx0XHRcdFx0XHRzdG9wID0gZmFsc2UsXG5cdFx0XHRcdFx0XHRwZXJpb2QgPSAxMTA7XG5cdFx0XHRcdFx0KGZ1bmN0aW9uIGFyZ3VtZW50c19jYWxsZWU0KHYpIHtcblx0XHRcdFx0XHRcdHZhciBwaGVpZ2h0ID0gdGltZWJveHBhcmVudFswXS5jbGllbnRIZWlnaHQsXG5cdFx0XHRcdFx0XHRcdGhlaWdodCA9IHRpbWVib3hbMF0ub2Zmc2V0SGVpZ2h0LFxuXHRcdFx0XHRcdFx0XHR0b3AgPSBNYXRoLmFicyhwYXJzZUludCh0aW1lYm94LmNzcygnbWFyZ2luVG9wJyksIDEwKSk7XG5cdFx0XHRcdFx0XHRpZiAoJHRoaXMuaGFzQ2xhc3Mob3B0aW9ucy5uZXh0KSAmJiAoaGVpZ2h0IC0gcGhlaWdodCkgLSBvcHRpb25zLnRpbWVIZWlnaHRJblRpbWVQaWNrZXIgPj0gdG9wKSB7XG5cdFx0XHRcdFx0XHRcdHRpbWVib3guY3NzKCdtYXJnaW5Ub3AnLCAnLScgKyAodG9wICsgb3B0aW9ucy50aW1lSGVpZ2h0SW5UaW1lUGlja2VyKSArICdweCcpO1xuXHRcdFx0XHRcdFx0fSBlbHNlIGlmICgkdGhpcy5oYXNDbGFzcyhvcHRpb25zLnByZXYpICYmIHRvcCAtIG9wdGlvbnMudGltZUhlaWdodEluVGltZVBpY2tlciA+PSAwKSB7XG5cdFx0XHRcdFx0XHRcdHRpbWVib3guY3NzKCdtYXJnaW5Ub3AnLCAnLScgKyAodG9wIC0gb3B0aW9ucy50aW1lSGVpZ2h0SW5UaW1lUGlja2VyKSArICdweCcpO1xuXHRcdFx0XHRcdFx0fVxuXHRcdFx0XHRcdFx0LyoqXG5cdFx0XHRcdFx0XHQgKiBGaXhlZCBidWc6XG5cdFx0XHRcdFx0XHQgKiBXaGVuIHVzaW5nIGNzczMgdHJhbnNpdGlvbiwgaXQgd2lsbCBjYXVzZSBhIGJ1ZyB0aGF0IHlvdSBjYW5ub3Qgc2Nyb2xsIHRoZSB0aW1lcGlja2VyIGxpc3QuXG5cdFx0XHRcdFx0XHQgKiBUaGUgcmVhc29uIGlzIHRoYXQgdGhlIHRyYW5zaXRpb24tZHVyYXRpb24gdGltZSwgaWYgeW91IHNldCBpdCB0byAwLCBhbGwgdGhpbmdzIGZpbmUsIG90aGVyd2lzZSwgdGhpc1xuXHRcdFx0XHRcdFx0ICogd291bGQgY2F1c2UgYSBidWcgd2hlbiB5b3UgdXNlIGpxdWVyeS5jc3MgbWV0aG9kLlxuXHRcdFx0XHRcdFx0ICogTGV0J3Mgc2F5OiAqIHsgdHJhbnNpdGlvbjogYWxsIC41cyBlYXNlOyB9XG5cdFx0XHRcdFx0XHQgKiBqcXVlcnkgdGltZWJveC5jc3MoJ21hcmdpblRvcCcpIHdpbGwgcmV0dXJuIHRoZSBvcmlnaW5hbCB2YWx1ZSB3aGljaCBpcyBiZWZvcmUgeW91IGNsaWNraW5nIHRoZSBuZXh0L3ByZXYgYnV0dG9uLFxuXHRcdFx0XHRcdFx0ICogbWVhbndoaWxlIHRoZSB0aW1lYm94WzBdLnN0eWxlLm1hcmdpblRvcCB3aWxsIHJldHVybiB0aGUgcmlnaHQgdmFsdWUgd2hpY2ggaXMgYWZ0ZXIgeW91IGNsaWNraW5nIHRoZVxuXHRcdFx0XHRcdFx0ICogbmV4dC9wcmV2IGJ1dHRvbi5cblx0XHRcdFx0XHRcdCAqXG5cdFx0XHRcdFx0XHQgKiBXaGF0IHdlIHNob3VsZCBkbzpcblx0XHRcdFx0XHRcdCAqIFJlcGxhY2UgdGltZWJveC5jc3MoJ21hcmdpblRvcCcpIHdpdGggdGltZWJveFswXS5zdHlsZS5tYXJnaW5Ub3AuXG5cdFx0XHRcdFx0XHQgKi9cblx0XHRcdFx0XHRcdHRpbWVib3hwYXJlbnQudHJpZ2dlcignc2Nyb2xsX2VsZW1lbnQueGRzb2Z0X3Njcm9sbGVyJywgW01hdGguYWJzKHBhcnNlSW50KHRpbWVib3hbMF0uc3R5bGUubWFyZ2luVG9wLCAxMCkgLyAoaGVpZ2h0IC0gcGhlaWdodCkpXSk7XG5cdFx0XHRcdFx0XHRwZXJpb2QgPSAocGVyaW9kID4gMTApID8gMTAgOiBwZXJpb2QgLSAxMDtcblx0XHRcdFx0XHRcdGlmICghc3RvcCkge1xuXHRcdFx0XHRcdFx0XHR0aW1lciA9IHNldFRpbWVvdXQoYXJndW1lbnRzX2NhbGxlZTQsIHYgfHwgcGVyaW9kKTtcblx0XHRcdFx0XHRcdH1cblx0XHRcdFx0XHR9KDUwMCkpO1xuXHRcdFx0XHRcdCQoW29wdGlvbnMub3duZXJEb2N1bWVudC5ib2R5LCBvcHRpb25zLmNvbnRlbnRXaW5kb3ddKS5vbigndG91Y2hlbmQgbW91c2V1cC54ZHNvZnQnLCBmdW5jdGlvbiBhcmd1bWVudHNfY2FsbGVlNSgpIHtcblx0XHRcdFx0XHRcdGNsZWFyVGltZW91dCh0aW1lcik7XG5cdFx0XHRcdFx0XHRzdG9wID0gdHJ1ZTtcblx0XHRcdFx0XHRcdCQoW29wdGlvbnMub3duZXJEb2N1bWVudC5ib2R5LCBvcHRpb25zLmNvbnRlbnRXaW5kb3ddKVxuXHRcdFx0XHRcdFx0XHQub2ZmKCd0b3VjaGVuZCBtb3VzZXVwLnhkc29mdCcsIGFyZ3VtZW50c19jYWxsZWU1KTtcblx0XHRcdFx0XHR9KTtcblx0XHRcdFx0fSk7XG5cblx0XHRcdHhjaGFuZ2VUaW1lciA9IDA7XG5cdFx0XHQvLyBiYXNlIGhhbmRsZXIgLSBnZW5lcmF0aW5nIGEgY2FsZW5kYXIgYW5kIHRpbWVwaWNrZXJcblx0XHRcdGRhdGV0aW1lcGlja2VyXG5cdFx0XHRcdC5vbigneGNoYW5nZS54ZHNvZnQnLCBmdW5jdGlvbiAoZXZlbnQpIHtcblx0XHRcdFx0XHRjbGVhclRpbWVvdXQoeGNoYW5nZVRpbWVyKTtcblx0XHRcdFx0XHR4Y2hhbmdlVGltZXIgPSBzZXRUaW1lb3V0KGZ1bmN0aW9uICgpIHtcblxuXHRcdFx0XHRcdFx0aWYgKF94ZHNvZnRfZGF0ZXRpbWUuY3VycmVudFRpbWUgPT09IHVuZGVmaW5lZCB8fCBfeGRzb2Z0X2RhdGV0aW1lLmN1cnJlbnRUaW1lID09PSBudWxsKSB7XG5cdFx0XHRcdFx0XHRcdF94ZHNvZnRfZGF0ZXRpbWUuY3VycmVudFRpbWUgPSBfeGRzb2Z0X2RhdGV0aW1lLm5vdygpO1xuXHRcdFx0XHRcdFx0fVxuXG5cdFx0XHRcdFx0XHR2YXIgdGFibGUgPVx0JycsXG5cdFx0XHRcdFx0XHRcdHN0YXJ0ID0gbmV3IERhdGUoX3hkc29mdF9kYXRldGltZS5jdXJyZW50VGltZS5nZXRGdWxsWWVhcigpLCBfeGRzb2Z0X2RhdGV0aW1lLmN1cnJlbnRUaW1lLmdldE1vbnRoKCksIDEsIDEyLCAwLCAwKSxcblx0XHRcdFx0XHRcdFx0aSA9IDAsXG5cdFx0XHRcdFx0XHRcdGosXG5cdFx0XHRcdFx0XHRcdHRvZGF5ID0gX3hkc29mdF9kYXRldGltZS5ub3coKSxcblx0XHRcdFx0XHRcdFx0bWF4RGF0ZSA9IGZhbHNlLFxuXHRcdFx0XHRcdFx0XHRtaW5EYXRlID0gZmFsc2UsXG5cdFx0XHRcdFx0XHRcdG1pbkRhdGVUaW1lID0gZmFsc2UsXG5cdFx0XHRcdFx0XHRcdG1heERhdGVUaW1lID0gZmFsc2UsXG5cdFx0XHRcdFx0XHRcdGhEYXRlLFxuXHRcdFx0XHRcdFx0XHRkYXksXG5cdFx0XHRcdFx0XHRcdGQsXG5cdFx0XHRcdFx0XHRcdHksXG5cdFx0XHRcdFx0XHRcdG0sXG5cdFx0XHRcdFx0XHRcdHcsXG5cdFx0XHRcdFx0XHRcdGNsYXNzZXMgPSBbXSxcblx0XHRcdFx0XHRcdFx0Y3VzdG9tRGF0ZVNldHRpbmdzLFxuXHRcdFx0XHRcdFx0XHRuZXdSb3cgPSB0cnVlLFxuXHRcdFx0XHRcdFx0XHR0aW1lID0gJycsXG5cdFx0XHRcdFx0XHRcdGgsXG5cdFx0XHRcdFx0XHRcdGxpbmVfdGltZSxcblx0XHRcdFx0XHRcdFx0ZGVzY3JpcHRpb247XG5cblx0XHRcdFx0XHRcdHdoaWxlIChzdGFydC5nZXREYXkoKSAhPT0gb3B0aW9ucy5kYXlPZldlZWtTdGFydCkge1xuXHRcdFx0XHRcdFx0XHRzdGFydC5zZXREYXRlKHN0YXJ0LmdldERhdGUoKSAtIDEpO1xuXHRcdFx0XHRcdFx0fVxuXG5cdFx0XHRcdFx0XHR0YWJsZSArPSAnPHRhYmxlPjx0aGVhZD48dHI+JztcblxuXHRcdFx0XHRcdFx0aWYgKG9wdGlvbnMud2Vla3MpIHtcblx0XHRcdFx0XHRcdFx0dGFibGUgKz0gJzx0aD48L3RoPic7XG5cdFx0XHRcdFx0XHR9XG5cblx0XHRcdFx0XHRcdGZvciAoaiA9IDA7IGogPCA3OyBqICs9IDEpIHtcblx0XHRcdFx0XHRcdFx0dGFibGUgKz0gJzx0aD4nICsgb3B0aW9ucy5pMThuW2dsb2JhbExvY2FsZV0uZGF5T2ZXZWVrU2hvcnRbKGogKyBvcHRpb25zLmRheU9mV2Vla1N0YXJ0KSAlIDddICsgJzwvdGg+Jztcblx0XHRcdFx0XHRcdH1cblxuXHRcdFx0XHRcdFx0dGFibGUgKz0gJzwvdHI+PC90aGVhZD4nO1xuXHRcdFx0XHRcdFx0dGFibGUgKz0gJzx0Ym9keT4nO1xuXG5cdFx0XHRcdFx0XHRpZiAob3B0aW9ucy5tYXhEYXRlICE9PSBmYWxzZSkge1xuXHRcdFx0XHRcdFx0XHRtYXhEYXRlID0gX3hkc29mdF9kYXRldGltZS5zdHJUb0RhdGUob3B0aW9ucy5tYXhEYXRlKTtcblx0XHRcdFx0XHRcdFx0bWF4RGF0ZSA9IG5ldyBEYXRlKG1heERhdGUuZ2V0RnVsbFllYXIoKSwgbWF4RGF0ZS5nZXRNb250aCgpLCBtYXhEYXRlLmdldERhdGUoKSwgMjMsIDU5LCA1OSwgOTk5KTtcblx0XHRcdFx0XHRcdH1cblxuXHRcdFx0XHRcdFx0aWYgKG9wdGlvbnMubWluRGF0ZSAhPT0gZmFsc2UpIHtcblx0XHRcdFx0XHRcdFx0bWluRGF0ZSA9IF94ZHNvZnRfZGF0ZXRpbWUuc3RyVG9EYXRlKG9wdGlvbnMubWluRGF0ZSk7XG5cdFx0XHRcdFx0XHRcdG1pbkRhdGUgPSBuZXcgRGF0ZShtaW5EYXRlLmdldEZ1bGxZZWFyKCksIG1pbkRhdGUuZ2V0TW9udGgoKSwgbWluRGF0ZS5nZXREYXRlKCkpO1xuXHRcdFx0XHRcdFx0fVxuXG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAob3B0aW9ucy5taW5EYXRlVGltZSAhPT0gZmFsc2UpIHtcblx0XHRcdFx0XHRcdFx0bWluRGF0ZVRpbWUgPSBfeGRzb2Z0X2RhdGV0aW1lLnN0clRvRGF0ZShvcHRpb25zLm1pbkRhdGVUaW1lKTtcblx0XHRcdFx0XHRcdFx0bWluRGF0ZVRpbWUgPSBuZXcgRGF0ZShtaW5EYXRlVGltZS5nZXRGdWxsWWVhcigpLCBtaW5EYXRlVGltZS5nZXRNb250aCgpLCBtaW5EYXRlVGltZS5nZXREYXRlKCksIG1pbkRhdGVUaW1lLmdldEhvdXJzKCksIG1pbkRhdGVUaW1lLmdldE1pbnV0ZXMoKSwgbWluRGF0ZVRpbWUuZ2V0U2Vjb25kcygpKTtcblx0XHRcdFx0XHRcdH1cblxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKG9wdGlvbnMubWF4RGF0ZVRpbWUgIT09IGZhbHNlKSB7XG5cdFx0XHRcdFx0XHRcdG1heERhdGVUaW1lID0gX3hkc29mdF9kYXRldGltZS5zdHJUb0RhdGUob3B0aW9ucy5tYXhEYXRlVGltZSk7XG5cdFx0XHRcdFx0XHRcdG1heERhdGVUaW1lID0gbmV3IERhdGUobWF4RGF0ZVRpbWUuZ2V0RnVsbFllYXIoKSwgbWF4RGF0ZVRpbWUuZ2V0TW9udGgoKSwgbWF4RGF0ZVRpbWUuZ2V0RGF0ZSgpLCBtYXhEYXRlVGltZS5nZXRIb3VycygpLCBtYXhEYXRlVGltZS5nZXRNaW51dGVzKCksIG1heERhdGVUaW1lLmdldFNlY29uZHMoKSk7XG5cdFx0XHRcdFx0XHR9XG5cblx0XHRcdFx0XHRcdHZhciBtYXhEYXRlVGltZURheTtcblx0XHRcdFx0XHRcdGlmIChtYXhEYXRlVGltZSAhPT0gZmFsc2UpIHtcblx0XHRcdFx0XHRcdFx0bWF4RGF0ZVRpbWVEYXkgPSAoKG1heERhdGVUaW1lLmdldEZ1bGxZZWFyKCkgKiAxMikgKyBtYXhEYXRlVGltZS5nZXRNb250aCgpKSAqIDMxICsgbWF4RGF0ZVRpbWUuZ2V0RGF0ZSgpO1xuXHRcdFx0XHRcdFx0fVxuXG5cdFx0XHRcdFx0XHR3aGlsZSAoaSA8IF94ZHNvZnRfZGF0ZXRpbWUuY3VycmVudFRpbWUuY291bnREYXlzSW5Nb250aCgpIHx8IHN0YXJ0LmdldERheSgpICE9PSBvcHRpb25zLmRheU9mV2Vla1N0YXJ0IHx8IF94ZHNvZnRfZGF0ZXRpbWUuY3VycmVudFRpbWUuZ2V0TW9udGgoKSA9PT0gc3RhcnQuZ2V0TW9udGgoKSkge1xuXHRcdFx0XHRcdFx0XHRjbGFzc2VzID0gW107XG5cdFx0XHRcdFx0XHRcdGkgKz0gMTtcblxuXHRcdFx0XHRcdFx0XHRkYXkgPSBzdGFydC5nZXREYXkoKTtcblx0XHRcdFx0XHRcdFx0ZCA9IHN0YXJ0LmdldERhdGUoKTtcblx0XHRcdFx0XHRcdFx0eSA9IHN0YXJ0LmdldEZ1bGxZZWFyKCk7XG5cdFx0XHRcdFx0XHRcdG0gPSBzdGFydC5nZXRNb250aCgpO1xuXHRcdFx0XHRcdFx0XHR3ID0gX3hkc29mdF9kYXRldGltZS5nZXRXZWVrT2ZZZWFyKHN0YXJ0KTtcblx0XHRcdFx0XHRcdFx0ZGVzY3JpcHRpb24gPSAnJztcblxuXHRcdFx0XHRcdFx0XHRjbGFzc2VzLnB1c2goJ3hkc29mdF9kYXRlJyk7XG5cblx0XHRcdFx0XHRcdFx0aWYgKG9wdGlvbnMuYmVmb3JlU2hvd0RheSAmJiAkLmlzRnVuY3Rpb24ob3B0aW9ucy5iZWZvcmVTaG93RGF5LmNhbGwpKSB7XG5cdFx0XHRcdFx0XHRcdFx0Y3VzdG9tRGF0ZVNldHRpbmdzID0gb3B0aW9ucy5iZWZvcmVTaG93RGF5LmNhbGwoZGF0ZXRpbWVwaWNrZXIsIHN0YXJ0KTtcblx0XHRcdFx0XHRcdFx0fSBlbHNlIHtcblx0XHRcdFx0XHRcdFx0XHRjdXN0b21EYXRlU2V0dGluZ3MgPSBudWxsO1xuXHRcdFx0XHRcdFx0XHR9XG5cblx0XHRcdFx0XHRcdFx0aWYob3B0aW9ucy5hbGxvd0RhdGVSZSAmJiBPYmplY3QucHJvdG90eXBlLnRvU3RyaW5nLmNhbGwob3B0aW9ucy5hbGxvd0RhdGVSZSkgPT09IFwiW29iamVjdCBSZWdFeHBdXCIpe1xuXHRcdFx0XHRcdFx0XHRcdGlmKCFvcHRpb25zLmFsbG93RGF0ZVJlLnRlc3QoZGF0ZUhlbHBlci5mb3JtYXREYXRlKHN0YXJ0LCBvcHRpb25zLmZvcm1hdERhdGUpKSl7XG5cdFx0XHRcdFx0XHRcdFx0XHRjbGFzc2VzLnB1c2goJ3hkc29mdF9kaXNhYmxlZCcpO1xuXHRcdFx0XHRcdFx0XHRcdH1cblx0XHRcdFx0XHRcdFx0fVxuXHRcdFx0XHRcdFx0XHRcblx0XHRcdFx0XHRcdFx0aWYob3B0aW9ucy5hbGxvd0RhdGVzICYmIG9wdGlvbnMuYWxsb3dEYXRlcy5sZW5ndGg+MCl7XG5cdFx0XHRcdFx0XHRcdFx0aWYob3B0aW9ucy5hbGxvd0RhdGVzLmluZGV4T2YoZGF0ZUhlbHBlci5mb3JtYXREYXRlKHN0YXJ0LCBvcHRpb25zLmZvcm1hdERhdGUpKSA9PT0gLTEpe1xuXHRcdFx0XHRcdFx0XHRcdFx0Y2xhc3Nlcy5wdXNoKCd4ZHNvZnRfZGlzYWJsZWQnKTtcblx0XHRcdFx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0XHRcdH1cblx0XHRcdFx0XHRcdFx0XG5cdFx0XHRcdFx0XHRcdHZhciBjdXJyZW50RGF5ID0gKChzdGFydC5nZXRGdWxsWWVhcigpICogMTIpICsgc3RhcnQuZ2V0TW9udGgoKSkgKiAzMSArIHN0YXJ0LmdldERhdGUoKTtcblx0XHRcdFx0XHRcdFx0aWYgKChtYXhEYXRlICE9PSBmYWxzZSAmJiBzdGFydCA+IG1heERhdGUpIHx8IChtaW5EYXRlVGltZSAhPT0gZmFsc2UgJiYgc3RhcnQgPCBtaW5EYXRlVGltZSkgIHx8IChtaW5EYXRlICE9PSBmYWxzZSAmJiBzdGFydCA8IG1pbkRhdGUpIHx8IChtYXhEYXRlVGltZSAhPT0gZmFsc2UgJiYgY3VycmVudERheSA+IG1heERhdGVUaW1lRGF5KSB8fCAoY3VzdG9tRGF0ZVNldHRpbmdzICYmIGN1c3RvbURhdGVTZXR0aW5nc1swXSA9PT0gZmFsc2UpKSB7XG5cdFx0XHRcdFx0XHRcdFx0Y2xhc3Nlcy5wdXNoKCd4ZHNvZnRfZGlzYWJsZWQnKTtcblx0XHRcdFx0XHRcdFx0fVxuXHRcdFx0XHRcdFx0XHRcblx0XHRcdFx0XHRcdFx0aWYgKG9wdGlvbnMuZGlzYWJsZWREYXRlcy5pbmRleE9mKGRhdGVIZWxwZXIuZm9ybWF0RGF0ZShzdGFydCwgb3B0aW9ucy5mb3JtYXREYXRlKSkgIT09IC0xKSB7XG5cdFx0XHRcdFx0XHRcdFx0Y2xhc3Nlcy5wdXNoKCd4ZHNvZnRfZGlzYWJsZWQnKTtcblx0XHRcdFx0XHRcdFx0fVxuXHRcdFx0XHRcdFx0XHRcblx0XHRcdFx0XHRcdFx0aWYgKG9wdGlvbnMuZGlzYWJsZWRXZWVrRGF5cy5pbmRleE9mKGRheSkgIT09IC0xKSB7XG5cdFx0XHRcdFx0XHRcdFx0Y2xhc3Nlcy5wdXNoKCd4ZHNvZnRfZGlzYWJsZWQnKTtcblx0XHRcdFx0XHRcdFx0fVxuXHRcdFx0XHRcdFx0XHRcblx0XHRcdFx0XHRcdFx0aWYgKGlucHV0LmlzKCdbZGlzYWJsZWRdJykpIHtcblx0XHRcdFx0XHRcdFx0XHRjbGFzc2VzLnB1c2goJ3hkc29mdF9kaXNhYmxlZCcpO1xuXHRcdFx0XHRcdFx0XHR9XG5cblx0XHRcdFx0XHRcdFx0aWYgKGN1c3RvbURhdGVTZXR0aW5ncyAmJiBjdXN0b21EYXRlU2V0dGluZ3NbMV0gIT09IFwiXCIpIHtcblx0XHRcdFx0XHRcdFx0XHRjbGFzc2VzLnB1c2goY3VzdG9tRGF0ZVNldHRpbmdzWzFdKTtcblx0XHRcdFx0XHRcdFx0fVxuXG5cdFx0XHRcdFx0XHRcdGlmIChfeGRzb2Z0X2RhdGV0aW1lLmN1cnJlbnRUaW1lLmdldE1vbnRoKCkgIT09IG0pIHtcblx0XHRcdFx0XHRcdFx0XHRjbGFzc2VzLnB1c2goJ3hkc29mdF9vdGhlcl9tb250aCcpO1xuXHRcdFx0XHRcdFx0XHR9XG5cblx0XHRcdFx0XHRcdFx0aWYgKChvcHRpb25zLmRlZmF1bHRTZWxlY3QgfHwgZGF0ZXRpbWVwaWNrZXIuZGF0YSgnY2hhbmdlZCcpKSAmJiBkYXRlSGVscGVyLmZvcm1hdERhdGUoX3hkc29mdF9kYXRldGltZS5jdXJyZW50VGltZSwgb3B0aW9ucy5mb3JtYXREYXRlKSA9PT0gZGF0ZUhlbHBlci5mb3JtYXREYXRlKHN0YXJ0LCBvcHRpb25zLmZvcm1hdERhdGUpKSB7XG5cdFx0XHRcdFx0XHRcdFx0Y2xhc3Nlcy5wdXNoKCd4ZHNvZnRfY3VycmVudCcpO1xuXHRcdFx0XHRcdFx0XHR9XG5cblx0XHRcdFx0XHRcdFx0aWYgKGRhdGVIZWxwZXIuZm9ybWF0RGF0ZSh0b2RheSwgb3B0aW9ucy5mb3JtYXREYXRlKSA9PT0gZGF0ZUhlbHBlci5mb3JtYXREYXRlKHN0YXJ0LCBvcHRpb25zLmZvcm1hdERhdGUpKSB7XG5cdFx0XHRcdFx0XHRcdFx0Y2xhc3Nlcy5wdXNoKCd4ZHNvZnRfdG9kYXknKTtcblx0XHRcdFx0XHRcdFx0fVxuXG5cdFx0XHRcdFx0XHRcdGlmIChzdGFydC5nZXREYXkoKSA9PT0gMCB8fCBzdGFydC5nZXREYXkoKSA9PT0gNiB8fCBvcHRpb25zLndlZWtlbmRzLmluZGV4T2YoZGF0ZUhlbHBlci5mb3JtYXREYXRlKHN0YXJ0LCBvcHRpb25zLmZvcm1hdERhdGUpKSAhPT0gLTEpIHtcblx0XHRcdFx0XHRcdFx0XHRjbGFzc2VzLnB1c2goJ3hkc29mdF93ZWVrZW5kJyk7XG5cdFx0XHRcdFx0XHRcdH1cblxuXHRcdFx0XHRcdFx0XHRpZiAob3B0aW9ucy5oaWdobGlnaHRlZERhdGVzW2RhdGVIZWxwZXIuZm9ybWF0RGF0ZShzdGFydCwgb3B0aW9ucy5mb3JtYXREYXRlKV0gIT09IHVuZGVmaW5lZCkge1xuXHRcdFx0XHRcdFx0XHRcdGhEYXRlID0gb3B0aW9ucy5oaWdobGlnaHRlZERhdGVzW2RhdGVIZWxwZXIuZm9ybWF0RGF0ZShzdGFydCwgb3B0aW9ucy5mb3JtYXREYXRlKV07XG5cdFx0XHRcdFx0XHRcdFx0Y2xhc3Nlcy5wdXNoKGhEYXRlLnN0eWxlID09PSB1bmRlZmluZWQgPyAneGRzb2Z0X2hpZ2hsaWdodGVkX2RlZmF1bHQnIDogaERhdGUuc3R5bGUpO1xuXHRcdFx0XHRcdFx0XHRcdGRlc2NyaXB0aW9uID0gaERhdGUuZGVzYyA9PT0gdW5kZWZpbmVkID8gJycgOiBoRGF0ZS5kZXNjO1xuXHRcdFx0XHRcdFx0XHR9XG5cblx0XHRcdFx0XHRcdFx0aWYgKG9wdGlvbnMuYmVmb3JlU2hvd0RheSAmJiAkLmlzRnVuY3Rpb24ob3B0aW9ucy5iZWZvcmVTaG93RGF5KSkge1xuXHRcdFx0XHRcdFx0XHRcdGNsYXNzZXMucHVzaChvcHRpb25zLmJlZm9yZVNob3dEYXkoc3RhcnQpKTtcblx0XHRcdFx0XHRcdFx0fVxuXG5cdFx0XHRcdFx0XHRcdGlmIChuZXdSb3cpIHtcblx0XHRcdFx0XHRcdFx0XHR0YWJsZSArPSAnPHRyPic7XG5cdFx0XHRcdFx0XHRcdFx0bmV3Um93ID0gZmFsc2U7XG5cdFx0XHRcdFx0XHRcdFx0aWYgKG9wdGlvbnMud2Vla3MpIHtcblx0XHRcdFx0XHRcdFx0XHRcdHRhYmxlICs9ICc8dGg+JyArIHcgKyAnPC90aD4nO1xuXHRcdFx0XHRcdFx0XHRcdH1cblx0XHRcdFx0XHRcdFx0fVxuXG5cdFx0XHRcdFx0XHRcdHRhYmxlICs9ICc8dGQgZGF0YS1kYXRlPVwiJyArIGQgKyAnXCIgZGF0YS1tb250aD1cIicgKyBtICsgJ1wiIGRhdGEteWVhcj1cIicgKyB5ICsgJ1wiJyArICcgY2xhc3M9XCJ4ZHNvZnRfZGF0ZSB4ZHNvZnRfZGF5X29mX3dlZWsnICsgc3RhcnQuZ2V0RGF5KCkgKyAnICcgKyBjbGFzc2VzLmpvaW4oJyAnKSArICdcIiB0aXRsZT1cIicgKyBkZXNjcmlwdGlvbiArICdcIj4nICtcblx0XHRcdFx0XHRcdFx0XHQnPGRpdj4nICsgZCArICc8L2Rpdj4nICtcblx0XHRcdFx0XHRcdFx0XHQnPC90ZD4nO1xuXG5cdFx0XHRcdFx0XHRcdGlmIChzdGFydC5nZXREYXkoKSA9PT0gb3B0aW9ucy5kYXlPZldlZWtTdGFydFByZXYpIHtcblx0XHRcdFx0XHRcdFx0XHR0YWJsZSArPSAnPC90cj4nO1xuXHRcdFx0XHRcdFx0XHRcdG5ld1JvdyA9IHRydWU7XG5cdFx0XHRcdFx0XHRcdH1cblxuXHRcdFx0XHRcdFx0XHRzdGFydC5zZXREYXRlKGQgKyAxKTtcblx0XHRcdFx0XHRcdH1cblx0XHRcdFx0XHRcdHRhYmxlICs9ICc8L3Rib2R5PjwvdGFibGU+JztcblxuXHRcdFx0XHRcdFx0Y2FsZW5kYXIuaHRtbCh0YWJsZSk7XG5cblx0XHRcdFx0XHRcdG1vbnRoX3BpY2tlci5maW5kKCcueGRzb2Z0X2xhYmVsIHNwYW4nKS5lcSgwKS50ZXh0KG9wdGlvbnMuaTE4bltnbG9iYWxMb2NhbGVdLm1vbnRoc1tfeGRzb2Z0X2RhdGV0aW1lLmN1cnJlbnRUaW1lLmdldE1vbnRoKCldKTtcblx0XHRcdFx0XHRcdG1vbnRoX3BpY2tlci5maW5kKCcueGRzb2Z0X2xhYmVsIHNwYW4nKS5lcSgxKS50ZXh0KF94ZHNvZnRfZGF0ZXRpbWUuY3VycmVudFRpbWUuZ2V0RnVsbFllYXIoKSArIG9wdGlvbnMueWVhck9mZnNldCk7XG5cblx0XHRcdFx0XHRcdC8vIGdlbmVyYXRlIHRpbWVib3hcblx0XHRcdFx0XHRcdHRpbWUgPSAnJztcblx0XHRcdFx0XHRcdGggPSAnJztcblx0XHRcdFx0XHRcdG0gPSAnJztcblxuXHRcdFx0XHRcdFx0dmFyIG1pblRpbWVNaW51dGVzT2ZEYXkgPSAwO1xuXHRcdFx0XHRcdFx0aWYgKG9wdGlvbnMubWluVGltZSAhPT0gZmFsc2UpIHtcblx0XHRcdFx0XHRcdCAgICB2YXIgdCA9IF94ZHNvZnRfZGF0ZXRpbWUuc3RydG90aW1lKG9wdGlvbnMubWluVGltZSk7XG5cdFx0XHRcdFx0XHQgICAgbWluVGltZU1pbnV0ZXNPZkRheSA9IDYwICogdC5nZXRIb3VycygpICsgdC5nZXRNaW51dGVzKCk7XG5cdFx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0XHR2YXIgbWF4VGltZU1pbnV0ZXNPZkRheSA9IDI0ICogNjA7XG5cdFx0XHRcdFx0XHRpZiAob3B0aW9ucy5tYXhUaW1lICE9PSBmYWxzZSkge1xuXHRcdFx0XHRcdFx0ICAgIHZhciB0ID0gX3hkc29mdF9kYXRldGltZS5zdHJ0b3RpbWUob3B0aW9ucy5tYXhUaW1lKTtcblx0XHRcdFx0XHRcdCAgICBtYXhUaW1lTWludXRlc09mRGF5ID0gNjAgKiB0LmdldEhvdXJzKCkgKyB0LmdldE1pbnV0ZXMoKTtcblx0XHRcdFx0XHRcdH1cblxuXHRcdFx0XHRcdFx0aWYgKG9wdGlvbnMubWluRGF0ZVRpbWUgIT09IGZhbHNlKSB7XG5cdFx0XHRcdFx0XHRcdHZhciB0ID0gX3hkc29mdF9kYXRldGltZS5zdHJUb0RhdGVUaW1lKG9wdGlvbnMubWluRGF0ZVRpbWUpO1xuXHRcdFx0XHRcdFx0ICAgICAgICB2YXIgY3VycmVudERheUlzTWluRGF0ZVRpbWVEYXkgPSBkYXRlSGVscGVyLmZvcm1hdERhdGUoX3hkc29mdF9kYXRldGltZS5jdXJyZW50VGltZSwgb3B0aW9ucy5mb3JtYXREYXRlKSA9PT0gZGF0ZUhlbHBlci5mb3JtYXREYXRlKHQsIG9wdGlvbnMuZm9ybWF0RGF0ZSk7XG5cdFx0XHRcdFx0XHRcdGlmIChjdXJyZW50RGF5SXNNaW5EYXRlVGltZURheSkge1xuXHRcdFx0XHRcdFx0XHRcdHZhciBtID0gNjAgKiB0LmdldEhvdXJzKCkgKyB0LmdldE1pbnV0ZXMoKTtcblx0XHRcdFx0XHRcdFx0XHRpZiAobSA+IG1pblRpbWVNaW51dGVzT2ZEYXkpIG1pblRpbWVNaW51dGVzT2ZEYXkgPSBtO1xuXHRcdFx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0XHR9XG5cblx0XHRcdFx0XHRcdGlmIChvcHRpb25zLm1heERhdGVUaW1lICE9PSBmYWxzZSkge1xuXHRcdFx0XHRcdFx0XHR2YXIgdCA9IF94ZHNvZnRfZGF0ZXRpbWUuc3RyVG9EYXRlVGltZShvcHRpb25zLm1heERhdGVUaW1lKTtcblx0XHRcdFx0XHRcdCAgICAgICAgdmFyIGN1cnJlbnREYXlJc01heERhdGVUaW1lRGF5ID0gZGF0ZUhlbHBlci5mb3JtYXREYXRlKF94ZHNvZnRfZGF0ZXRpbWUuY3VycmVudFRpbWUsIG9wdGlvbnMuZm9ybWF0RGF0ZSkgPT09IGRhdGVIZWxwZXIuZm9ybWF0RGF0ZSh0LCBvcHRpb25zLmZvcm1hdERhdGUpO1xuXHRcdFx0XHRcdFx0XHRpZiAoY3VycmVudERheUlzTWF4RGF0ZVRpbWVEYXkpIHtcblx0XHRcdFx0XHRcdFx0XHR2YXIgbSA9IDYwICogdC5nZXRIb3VycygpICsgdC5nZXRNaW51dGVzKCk7XG5cdFx0XHRcdFx0XHRcdFx0aWYgKG0gPCBtYXhUaW1lTWludXRlc09mRGF5KSBtYXhUaW1lTWludXRlc09mRGF5ID0gbTtcblx0XHRcdFx0XHRcdFx0fVxuXHRcdFx0XHRcdFx0fVxuXG5cdFx0XHRcdFx0XHRsaW5lX3RpbWUgPSBmdW5jdGlvbiBsaW5lX3RpbWUoaCwgbSkge1xuXHRcdFx0XHRcdFx0XHR2YXIgbm93ID0gX3hkc29mdF9kYXRldGltZS5ub3coKSwgY3VycmVudF90aW1lLFxuXHRcdFx0XHRcdFx0XHRcdGlzQUxsb3dUaW1lc0luaXQgPSBvcHRpb25zLmFsbG93VGltZXMgJiYgJC5pc0FycmF5KG9wdGlvbnMuYWxsb3dUaW1lcykgJiYgb3B0aW9ucy5hbGxvd1RpbWVzLmxlbmd0aDtcblx0XHRcdFx0XHRcdFx0bm93LnNldEhvdXJzKGgpO1xuXHRcdFx0XHRcdFx0XHRoID0gcGFyc2VJbnQobm93LmdldEhvdXJzKCksIDEwKTtcblx0XHRcdFx0XHRcdFx0bm93LnNldE1pbnV0ZXMobSk7XG5cdFx0XHRcdFx0XHRcdG0gPSBwYXJzZUludChub3cuZ2V0TWludXRlcygpLCAxMCk7XG5cdFx0XHRcdFx0XHRcdGNsYXNzZXMgPSBbXTtcblx0XHRcdFx0XHRcdFx0dmFyIGN1cnJlbnRNaW51dGVzT2ZEYXkgPSA2MCAqIGggKyBtO1xuXHRcdFx0XHRcdFx0XHRpZiAoaW5wdXQuaXMoJ1tkaXNhYmxlZF0nKSB8fCAoY3VycmVudE1pbnV0ZXNPZkRheSA+PSBtYXhUaW1lTWludXRlc09mRGF5KSB8fCAoY3VycmVudE1pbnV0ZXNPZkRheSA8IG1pblRpbWVNaW51dGVzT2ZEYXkpKSB7XG5cdFx0XHRcdFx0XHRcdFx0Y2xhc3Nlcy5wdXNoKCd4ZHNvZnRfZGlzYWJsZWQnKTtcblx0XHRcdFx0XHRcdFx0fVxuXG5cdFx0XHRcdFx0XHRcdGN1cnJlbnRfdGltZSA9IG5ldyBEYXRlKF94ZHNvZnRfZGF0ZXRpbWUuY3VycmVudFRpbWUpO1xuXHRcdFx0XHRcdFx0XHRjdXJyZW50X3RpbWUuc2V0SG91cnMocGFyc2VJbnQoX3hkc29mdF9kYXRldGltZS5jdXJyZW50VGltZS5nZXRIb3VycygpLCAxMCkpO1xuXG5cdFx0XHRcdFx0XHRcdGlmICghaXNBTGxvd1RpbWVzSW5pdCkge1xuXHRcdFx0XHRcdFx0XHRcdGN1cnJlbnRfdGltZS5zZXRNaW51dGVzKE1hdGhbb3B0aW9ucy5yb3VuZFRpbWVdKF94ZHNvZnRfZGF0ZXRpbWUuY3VycmVudFRpbWUuZ2V0TWludXRlcygpIC8gb3B0aW9ucy5zdGVwKSAqIG9wdGlvbnMuc3RlcCk7XG5cdFx0XHRcdFx0XHRcdH1cblxuXHRcdFx0XHRcdFx0XHRpZiAoKG9wdGlvbnMuaW5pdFRpbWUgfHwgb3B0aW9ucy5kZWZhdWx0U2VsZWN0IHx8IGRhdGV0aW1lcGlja2VyLmRhdGEoJ2NoYW5nZWQnKSkgJiYgY3VycmVudF90aW1lLmdldEhvdXJzKCkgPT09IHBhcnNlSW50KGgsIDEwKSAmJiAoKCFpc0FMbG93VGltZXNJbml0ICYmIG9wdGlvbnMuc3RlcCA+IDU5KSB8fCBjdXJyZW50X3RpbWUuZ2V0TWludXRlcygpID09PSBwYXJzZUludChtLCAxMCkpKSB7XG5cdFx0XHRcdFx0XHRcdFx0aWYgKG9wdGlvbnMuZGVmYXVsdFNlbGVjdCB8fCBkYXRldGltZXBpY2tlci5kYXRhKCdjaGFuZ2VkJykpIHtcblx0XHRcdFx0XHRcdFx0XHRcdGNsYXNzZXMucHVzaCgneGRzb2Z0X2N1cnJlbnQnKTtcblx0XHRcdFx0XHRcdFx0XHR9IGVsc2UgaWYgKG9wdGlvbnMuaW5pdFRpbWUpIHtcblx0XHRcdFx0XHRcdFx0XHRcdGNsYXNzZXMucHVzaCgneGRzb2Z0X2luaXRfdGltZScpO1xuXHRcdFx0XHRcdFx0XHRcdH1cblx0XHRcdFx0XHRcdFx0fVxuXHRcdFx0XHRcdFx0XHRpZiAocGFyc2VJbnQodG9kYXkuZ2V0SG91cnMoKSwgMTApID09PSBwYXJzZUludChoLCAxMCkgJiYgcGFyc2VJbnQodG9kYXkuZ2V0TWludXRlcygpLCAxMCkgPT09IHBhcnNlSW50KG0sIDEwKSkge1xuXHRcdFx0XHRcdFx0XHRcdGNsYXNzZXMucHVzaCgneGRzb2Z0X3RvZGF5Jyk7XG5cdFx0XHRcdFx0XHRcdH1cblx0XHRcdFx0XHRcdFx0dGltZSArPSAnPGRpdiBjbGFzcz1cInhkc29mdF90aW1lICcgKyBjbGFzc2VzLmpvaW4oJyAnKSArICdcIiBkYXRhLWhvdXI9XCInICsgaCArICdcIiBkYXRhLW1pbnV0ZT1cIicgKyBtICsgJ1wiPicgKyBkYXRlSGVscGVyLmZvcm1hdERhdGUobm93LCBvcHRpb25zLmZvcm1hdFRpbWUpICsgJzwvZGl2Pic7XG5cdFx0XHRcdFx0XHR9O1xuXG5cdFx0XHRcdFx0XHRpZiAoIW9wdGlvbnMuYWxsb3dUaW1lcyB8fCAhJC5pc0FycmF5KG9wdGlvbnMuYWxsb3dUaW1lcykgfHwgIW9wdGlvbnMuYWxsb3dUaW1lcy5sZW5ndGgpIHtcblx0XHRcdFx0XHRcdFx0Zm9yIChpID0gMCwgaiA9IDA7IGkgPCAob3B0aW9ucy5ob3VyczEyID8gMTIgOiAyNCk7IGkgKz0gMSkge1xuXHRcdFx0XHRcdFx0XHRcdGZvciAoaiA9IDA7IGogPCA2MDsgaiArPSBvcHRpb25zLnN0ZXApIHtcblx0XHRcdFx0XHRcdFx0XHQgICAgICAgIHZhciBjdXJyZW50TWludXRlc09mRGF5ID0gaSAqIDYwICsgajtcblx0XHRcdFx0XHRcdFx0XHQgICAgICAgIGlmIChjdXJyZW50TWludXRlc09mRGF5IDwgbWluVGltZU1pbnV0ZXNPZkRheSkgY29udGludWU7XG5cdFx0XHRcdFx0XHRcdFx0ICAgICAgICBpZiAoY3VycmVudE1pbnV0ZXNPZkRheSA+PSBtYXhUaW1lTWludXRlc09mRGF5KSBjb250aW51ZTtcblx0XHRcdFx0XHRcdFx0XHRcdGggPSAoaSA8IDEwID8gJzAnIDogJycpICsgaTtcblx0XHRcdFx0XHRcdFx0XHRcdG0gPSAoaiA8IDEwID8gJzAnIDogJycpICsgajtcblx0XHRcdFx0XHRcdFx0XHRcdGxpbmVfdGltZShoLCBtKTtcblx0XHRcdFx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0XHRcdH1cblx0XHRcdFx0XHRcdH0gZWxzZSB7XG5cdFx0XHRcdFx0XHRcdGZvciAoaSA9IDA7IGkgPCBvcHRpb25zLmFsbG93VGltZXMubGVuZ3RoOyBpICs9IDEpIHtcblx0XHRcdFx0XHRcdFx0XHRoID0gX3hkc29mdF9kYXRldGltZS5zdHJ0b3RpbWUob3B0aW9ucy5hbGxvd1RpbWVzW2ldKS5nZXRIb3VycygpO1xuXHRcdFx0XHRcdFx0XHRcdG0gPSBfeGRzb2Z0X2RhdGV0aW1lLnN0cnRvdGltZShvcHRpb25zLmFsbG93VGltZXNbaV0pLmdldE1pbnV0ZXMoKTtcblx0XHRcdFx0XHRcdFx0XHRsaW5lX3RpbWUoaCwgbSk7XG5cdFx0XHRcdFx0XHRcdH1cblx0XHRcdFx0XHRcdH1cblxuXHRcdFx0XHRcdFx0dGltZWJveC5odG1sKHRpbWUpO1xuXG5cdFx0XHRcdFx0XHRvcHQgPSAnJztcblxuXHRcdFx0XHRcdFx0Zm9yIChpID0gcGFyc2VJbnQob3B0aW9ucy55ZWFyU3RhcnQsIDEwKTsgaSA8PSBwYXJzZUludChvcHRpb25zLnllYXJFbmQsIDEwKTsgaSArPSAxKSB7XG5cdFx0XHRcdFx0XHRcdG9wdCArPSAnPGRpdiBjbGFzcz1cInhkc29mdF9vcHRpb24gJyArIChfeGRzb2Z0X2RhdGV0aW1lLmN1cnJlbnRUaW1lLmdldEZ1bGxZZWFyKCkgPT09IGkgPyAneGRzb2Z0X2N1cnJlbnQnIDogJycpICsgJ1wiIGRhdGEtdmFsdWU9XCInICsgaSArICdcIj4nICsgKGkgKyBvcHRpb25zLnllYXJPZmZzZXQpICsgJzwvZGl2Pic7XG5cdFx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0XHR5ZWFyc2VsZWN0LmNoaWxkcmVuKCkuZXEoMClcblx0XHRcdFx0XHRcdFx0Lmh0bWwob3B0KTtcblxuXHRcdFx0XHRcdFx0Zm9yIChpID0gcGFyc2VJbnQob3B0aW9ucy5tb250aFN0YXJ0LCAxMCksIG9wdCA9ICcnOyBpIDw9IHBhcnNlSW50KG9wdGlvbnMubW9udGhFbmQsIDEwKTsgaSArPSAxKSB7XG5cdFx0XHRcdFx0XHRcdG9wdCArPSAnPGRpdiBjbGFzcz1cInhkc29mdF9vcHRpb24gJyArIChfeGRzb2Z0X2RhdGV0aW1lLmN1cnJlbnRUaW1lLmdldE1vbnRoKCkgPT09IGkgPyAneGRzb2Z0X2N1cnJlbnQnIDogJycpICsgJ1wiIGRhdGEtdmFsdWU9XCInICsgaSArICdcIj4nICsgb3B0aW9ucy5pMThuW2dsb2JhbExvY2FsZV0ubW9udGhzW2ldICsgJzwvZGl2Pic7XG5cdFx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0XHRtb250aHNlbGVjdC5jaGlsZHJlbigpLmVxKDApLmh0bWwob3B0KTtcblx0XHRcdFx0XHRcdCQoZGF0ZXRpbWVwaWNrZXIpXG5cdFx0XHRcdFx0XHRcdC50cmlnZ2VyKCdnZW5lcmF0ZS54ZHNvZnQnKTtcblx0XHRcdFx0XHR9LCAxMCk7XG5cdFx0XHRcdFx0ZXZlbnQuc3RvcFByb3BhZ2F0aW9uKCk7XG5cdFx0XHRcdH0pXG5cdFx0XHRcdC5vbignYWZ0ZXJPcGVuLnhkc29mdCcsIGZ1bmN0aW9uICgpIHtcblx0XHRcdFx0XHRpZiAob3B0aW9ucy50aW1lcGlja2VyKSB7XG5cdFx0XHRcdFx0XHR2YXIgY2xhc3NUeXBlLCBwaGVpZ2h0LCBoZWlnaHQsIHRvcDtcblx0XHRcdFx0XHRcdGlmICh0aW1lYm94LmZpbmQoJy54ZHNvZnRfY3VycmVudCcpLmxlbmd0aCkge1xuXHRcdFx0XHRcdFx0XHRjbGFzc1R5cGUgPSAnLnhkc29mdF9jdXJyZW50Jztcblx0XHRcdFx0XHRcdH0gZWxzZSBpZiAodGltZWJveC5maW5kKCcueGRzb2Z0X2luaXRfdGltZScpLmxlbmd0aCkge1xuXHRcdFx0XHRcdFx0XHRjbGFzc1R5cGUgPSAnLnhkc29mdF9pbml0X3RpbWUnO1xuXHRcdFx0XHRcdFx0fVxuXHRcdFx0XHRcdFx0aWYgKGNsYXNzVHlwZSkge1xuXHRcdFx0XHRcdFx0XHRwaGVpZ2h0ID0gdGltZWJveHBhcmVudFswXS5jbGllbnRIZWlnaHQ7XG5cdFx0XHRcdFx0XHRcdGhlaWdodCA9IHRpbWVib3hbMF0ub2Zmc2V0SGVpZ2h0O1xuXHRcdFx0XHRcdFx0XHR0b3AgPSB0aW1lYm94LmZpbmQoY2xhc3NUeXBlKS5pbmRleCgpICogb3B0aW9ucy50aW1lSGVpZ2h0SW5UaW1lUGlja2VyICsgMTtcblx0XHRcdFx0XHRcdFx0aWYgKChoZWlnaHQgLSBwaGVpZ2h0KSA8IHRvcCkge1xuXHRcdFx0XHRcdFx0XHRcdHRvcCA9IGhlaWdodCAtIHBoZWlnaHQ7XG5cdFx0XHRcdFx0XHRcdH1cblx0XHRcdFx0XHRcdFx0dGltZWJveHBhcmVudC50cmlnZ2VyKCdzY3JvbGxfZWxlbWVudC54ZHNvZnRfc2Nyb2xsZXInLCBbcGFyc2VJbnQodG9wLCAxMCkgLyAoaGVpZ2h0IC0gcGhlaWdodCldKTtcblx0XHRcdFx0XHRcdH0gZWxzZSB7XG5cdFx0XHRcdFx0XHRcdHRpbWVib3hwYXJlbnQudHJpZ2dlcignc2Nyb2xsX2VsZW1lbnQueGRzb2Z0X3Njcm9sbGVyJywgWzBdKTtcblx0XHRcdFx0XHRcdH1cblx0XHRcdFx0XHR9XG5cdFx0XHRcdH0pO1xuXG5cdFx0XHR0aW1lcmNsaWNrID0gMDtcblx0XHRcdGNhbGVuZGFyXG5cdFx0XHRcdC5vbigndG91Y2hlbmQgY2xpY2sueGRzb2Z0JywgJ3RkJywgZnVuY3Rpb24gKHhkZXZlbnQpIHtcblx0XHRcdFx0XHR4ZGV2ZW50LnN0b3BQcm9wYWdhdGlvbigpOyAgLy8gUHJldmVudHMgY2xvc2luZyBvZiBQb3AtdXBzLCBNb2RhbHMgYW5kIEZseW91dHMgaW4gQm9vdHN0cmFwXG5cdFx0XHRcdFx0dGltZXJjbGljayArPSAxO1xuXHRcdFx0XHRcdHZhciAkdGhpcyA9ICQodGhpcyksXG5cdFx0XHRcdFx0XHRjdXJyZW50VGltZSA9IF94ZHNvZnRfZGF0ZXRpbWUuY3VycmVudFRpbWU7XG5cblx0XHRcdFx0XHRpZiAoY3VycmVudFRpbWUgPT09IHVuZGVmaW5lZCB8fCBjdXJyZW50VGltZSA9PT0gbnVsbCkge1xuXHRcdFx0XHRcdFx0X3hkc29mdF9kYXRldGltZS5jdXJyZW50VGltZSA9IF94ZHNvZnRfZGF0ZXRpbWUubm93KCk7XG5cdFx0XHRcdFx0XHRjdXJyZW50VGltZSA9IF94ZHNvZnRfZGF0ZXRpbWUuY3VycmVudFRpbWU7XG5cdFx0XHRcdFx0fVxuXG5cdFx0XHRcdFx0aWYgKCR0aGlzLmhhc0NsYXNzKCd4ZHNvZnRfZGlzYWJsZWQnKSkge1xuXHRcdFx0XHRcdFx0cmV0dXJuIGZhbHNlO1xuXHRcdFx0XHRcdH1cblxuXHRcdFx0XHRcdGN1cnJlbnRUaW1lLnNldERhdGUoMSk7XG5cdFx0XHRcdFx0Y3VycmVudFRpbWUuc2V0RnVsbFllYXIoJHRoaXMuZGF0YSgneWVhcicpKTtcblx0XHRcdFx0XHRjdXJyZW50VGltZS5zZXRNb250aCgkdGhpcy5kYXRhKCdtb250aCcpKTtcblx0XHRcdFx0XHRjdXJyZW50VGltZS5zZXREYXRlKCR0aGlzLmRhdGEoJ2RhdGUnKSk7XG5cblx0XHRcdFx0XHRkYXRldGltZXBpY2tlci50cmlnZ2VyKCdzZWxlY3QueGRzb2Z0JywgW2N1cnJlbnRUaW1lXSk7XG5cblx0XHRcdFx0XHRpbnB1dC52YWwoX3hkc29mdF9kYXRldGltZS5zdHIoKSk7XG5cblx0XHRcdFx0XHRpZiAob3B0aW9ucy5vblNlbGVjdERhdGUgJiZcdCQuaXNGdW5jdGlvbihvcHRpb25zLm9uU2VsZWN0RGF0ZSkpIHtcblx0XHRcdFx0XHRcdG9wdGlvbnMub25TZWxlY3REYXRlLmNhbGwoZGF0ZXRpbWVwaWNrZXIsIF94ZHNvZnRfZGF0ZXRpbWUuY3VycmVudFRpbWUsIGRhdGV0aW1lcGlja2VyLmRhdGEoJ2lucHV0JyksIHhkZXZlbnQpO1xuXHRcdFx0XHRcdH1cblxuXHRcdFx0XHRcdGRhdGV0aW1lcGlja2VyLmRhdGEoJ2NoYW5nZWQnLCB0cnVlKTtcblx0XHRcdFx0XHRkYXRldGltZXBpY2tlci50cmlnZ2VyKCd4Y2hhbmdlLnhkc29mdCcpO1xuXHRcdFx0XHRcdGRhdGV0aW1lcGlja2VyLnRyaWdnZXIoJ2NoYW5nZWRhdGV0aW1lLnhkc29mdCcpO1xuXHRcdFx0XHRcdGlmICgodGltZXJjbGljayA+IDEgfHwgKG9wdGlvbnMuY2xvc2VPbkRhdGVTZWxlY3QgPT09IHRydWUgfHwgKG9wdGlvbnMuY2xvc2VPbkRhdGVTZWxlY3QgPT09IGZhbHNlICYmICFvcHRpb25zLnRpbWVwaWNrZXIpKSkgJiYgIW9wdGlvbnMuaW5saW5lKSB7XG5cdFx0XHRcdFx0XHRkYXRldGltZXBpY2tlci50cmlnZ2VyKCdjbG9zZS54ZHNvZnQnKTtcblx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0c2V0VGltZW91dChmdW5jdGlvbiAoKSB7XG5cdFx0XHRcdFx0XHR0aW1lcmNsaWNrID0gMDtcblx0XHRcdFx0XHR9LCAyMDApO1xuXHRcdFx0XHR9KTtcblxuXHRcdFx0dGltZWJveFxuXHRcdFx0XHQub24oJ3RvdWNoc3RhcnQnLCAnZGl2JywgZnVuY3Rpb24gKHhkZXZlbnQpIHtcblx0XHRcdFx0XHR0aGlzLnRvdWNoTW92ZWQgPSBmYWxzZTtcblx0XHRcdFx0fSlcblx0XHRcdFx0Lm9uKCd0b3VjaG1vdmUnLCAnZGl2JywgaGFuZGxlVG91Y2hNb3ZlZClcblx0XHRcdFx0Lm9uKCd0b3VjaGVuZCBjbGljay54ZHNvZnQnLCAnZGl2JywgZnVuY3Rpb24gKHhkZXZlbnQpIHtcblx0XHRcdFx0XHRpZiAoIXRoaXMudG91Y2hNb3ZlZCkge1xuXHRcdFx0XHRcdFx0eGRldmVudC5zdG9wUHJvcGFnYXRpb24oKTtcblx0XHRcdFx0XHRcdHZhciAkdGhpcyA9ICQodGhpcyksXG5cdFx0XHRcdFx0XHRcdGN1cnJlbnRUaW1lID0gX3hkc29mdF9kYXRldGltZS5jdXJyZW50VGltZTtcblxuXHRcdFx0XHRcdFx0aWYgKGN1cnJlbnRUaW1lID09PSB1bmRlZmluZWQgfHwgY3VycmVudFRpbWUgPT09IG51bGwpIHtcblx0XHRcdFx0XHRcdFx0X3hkc29mdF9kYXRldGltZS5jdXJyZW50VGltZSA9IF94ZHNvZnRfZGF0ZXRpbWUubm93KCk7XG5cdFx0XHRcdFx0XHRcdGN1cnJlbnRUaW1lID0gX3hkc29mdF9kYXRldGltZS5jdXJyZW50VGltZTtcblx0XHRcdFx0XHRcdH1cblxuXHRcdFx0XHRcdFx0aWYgKCR0aGlzLmhhc0NsYXNzKCd4ZHNvZnRfZGlzYWJsZWQnKSkge1xuXHRcdFx0XHRcdFx0XHRyZXR1cm4gZmFsc2U7XG5cdFx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0XHRjdXJyZW50VGltZS5zZXRIb3VycygkdGhpcy5kYXRhKCdob3VyJykpO1xuXHRcdFx0XHRcdFx0Y3VycmVudFRpbWUuc2V0TWludXRlcygkdGhpcy5kYXRhKCdtaW51dGUnKSk7XG5cdFx0XHRcdFx0XHRkYXRldGltZXBpY2tlci50cmlnZ2VyKCdzZWxlY3QueGRzb2Z0JywgW2N1cnJlbnRUaW1lXSk7XG5cblx0XHRcdFx0XHRcdGRhdGV0aW1lcGlja2VyLmRhdGEoJ2lucHV0JykudmFsKF94ZHNvZnRfZGF0ZXRpbWUuc3RyKCkpO1xuXG5cdFx0XHRcdFx0XHRpZiAob3B0aW9ucy5vblNlbGVjdFRpbWUgJiYgJC5pc0Z1bmN0aW9uKG9wdGlvbnMub25TZWxlY3RUaW1lKSkge1xuXHRcdFx0XHRcdFx0XHRvcHRpb25zLm9uU2VsZWN0VGltZS5jYWxsKGRhdGV0aW1lcGlja2VyLCBfeGRzb2Z0X2RhdGV0aW1lLmN1cnJlbnRUaW1lLCBkYXRldGltZXBpY2tlci5kYXRhKCdpbnB1dCcpLCB4ZGV2ZW50KTtcblx0XHRcdFx0XHRcdH1cblx0XHRcdFx0XHRcdGRhdGV0aW1lcGlja2VyLmRhdGEoJ2NoYW5nZWQnLCB0cnVlKTtcblx0XHRcdFx0XHRcdGRhdGV0aW1lcGlja2VyLnRyaWdnZXIoJ3hjaGFuZ2UueGRzb2Z0Jyk7XG5cdFx0XHRcdFx0XHRkYXRldGltZXBpY2tlci50cmlnZ2VyKCdjaGFuZ2VkYXRldGltZS54ZHNvZnQnKTtcblx0XHRcdFx0XHRcdGlmIChvcHRpb25zLmlubGluZSAhPT0gdHJ1ZSAmJiBvcHRpb25zLmNsb3NlT25UaW1lU2VsZWN0ID09PSB0cnVlKSB7XG5cdFx0XHRcdFx0XHRcdGRhdGV0aW1lcGlja2VyLnRyaWdnZXIoJ2Nsb3NlLnhkc29mdCcpO1xuXHRcdFx0XHRcdFx0fVxuXHRcdFx0XHRcdH1cblx0XHRcdFx0fSk7XG5cblx0XHRcdGRhdGVwaWNrZXJcblx0XHRcdFx0Lm9uKCdtb3VzZXdoZWVsLnhkc29mdCcsIGZ1bmN0aW9uIChldmVudCkge1xuXHRcdFx0XHRcdGlmICghb3B0aW9ucy5zY3JvbGxNb250aCkge1xuXHRcdFx0XHRcdFx0cmV0dXJuIHRydWU7XG5cdFx0XHRcdFx0fVxuXHRcdFx0XHRcdGlmIChldmVudC5kZWx0YVkgPCAwKSB7XG5cdFx0XHRcdFx0XHRfeGRzb2Z0X2RhdGV0aW1lLm5leHRNb250aCgpO1xuXHRcdFx0XHRcdH0gZWxzZSB7XG5cdFx0XHRcdFx0XHRfeGRzb2Z0X2RhdGV0aW1lLnByZXZNb250aCgpO1xuXHRcdFx0XHRcdH1cblx0XHRcdFx0XHRyZXR1cm4gZmFsc2U7XG5cdFx0XHRcdH0pO1xuXG5cdFx0XHRpbnB1dFxuXHRcdFx0XHQub24oJ21vdXNld2hlZWwueGRzb2Z0JywgZnVuY3Rpb24gKGV2ZW50KSB7XG5cdFx0XHRcdFx0aWYgKCFvcHRpb25zLnNjcm9sbElucHV0KSB7XG5cdFx0XHRcdFx0XHRyZXR1cm4gdHJ1ZTtcblx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0aWYgKCFvcHRpb25zLmRhdGVwaWNrZXIgJiYgb3B0aW9ucy50aW1lcGlja2VyKSB7XG5cdFx0XHRcdFx0XHRjdXJyZW50X3RpbWVfaW5kZXggPSB0aW1lYm94LmZpbmQoJy54ZHNvZnRfY3VycmVudCcpLmxlbmd0aCA/IHRpbWVib3guZmluZCgnLnhkc29mdF9jdXJyZW50JykuZXEoMCkuaW5kZXgoKSA6IDA7XG5cdFx0XHRcdFx0XHRpZiAoY3VycmVudF90aW1lX2luZGV4ICsgZXZlbnQuZGVsdGFZID49IDAgJiYgY3VycmVudF90aW1lX2luZGV4ICsgZXZlbnQuZGVsdGFZIDwgdGltZWJveC5jaGlsZHJlbigpLmxlbmd0aCkge1xuXHRcdFx0XHRcdFx0XHRjdXJyZW50X3RpbWVfaW5kZXggKz0gZXZlbnQuZGVsdGFZO1xuXHRcdFx0XHRcdFx0fVxuXHRcdFx0XHRcdFx0aWYgKHRpbWVib3guY2hpbGRyZW4oKS5lcShjdXJyZW50X3RpbWVfaW5kZXgpLmxlbmd0aCkge1xuXHRcdFx0XHRcdFx0XHR0aW1lYm94LmNoaWxkcmVuKCkuZXEoY3VycmVudF90aW1lX2luZGV4KS50cmlnZ2VyKCdtb3VzZWRvd24nKTtcblx0XHRcdFx0XHRcdH1cblx0XHRcdFx0XHRcdHJldHVybiBmYWxzZTtcblx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0aWYgKG9wdGlvbnMuZGF0ZXBpY2tlciAmJiAhb3B0aW9ucy50aW1lcGlja2VyKSB7XG5cdFx0XHRcdFx0XHRkYXRlcGlja2VyLnRyaWdnZXIoZXZlbnQsIFtldmVudC5kZWx0YVksIGV2ZW50LmRlbHRhWCwgZXZlbnQuZGVsdGFZXSk7XG5cdFx0XHRcdFx0XHRpZiAoaW5wdXQudmFsKSB7XG5cdFx0XHRcdFx0XHRcdGlucHV0LnZhbChfeGRzb2Z0X2RhdGV0aW1lLnN0cigpKTtcblx0XHRcdFx0XHRcdH1cblx0XHRcdFx0XHRcdGRhdGV0aW1lcGlja2VyLnRyaWdnZXIoJ2NoYW5nZWRhdGV0aW1lLnhkc29mdCcpO1xuXHRcdFx0XHRcdFx0cmV0dXJuIGZhbHNlO1xuXHRcdFx0XHRcdH1cblx0XHRcdFx0fSk7XG5cblx0XHRcdGRhdGV0aW1lcGlja2VyXG5cdFx0XHRcdC5vbignY2hhbmdlZGF0ZXRpbWUueGRzb2Z0JywgZnVuY3Rpb24gKGV2ZW50KSB7XG5cdFx0XHRcdFx0aWYgKG9wdGlvbnMub25DaGFuZ2VEYXRlVGltZSAmJiAkLmlzRnVuY3Rpb24ob3B0aW9ucy5vbkNoYW5nZURhdGVUaW1lKSkge1xuXHRcdFx0XHRcdFx0dmFyICRpbnB1dCA9IGRhdGV0aW1lcGlja2VyLmRhdGEoJ2lucHV0Jyk7XG5cdFx0XHRcdFx0XHRvcHRpb25zLm9uQ2hhbmdlRGF0ZVRpbWUuY2FsbChkYXRldGltZXBpY2tlciwgX3hkc29mdF9kYXRldGltZS5jdXJyZW50VGltZSwgJGlucHV0LCBldmVudCk7XG5cdFx0XHRcdFx0XHRkZWxldGUgb3B0aW9ucy52YWx1ZTtcblx0XHRcdFx0XHRcdCRpbnB1dC50cmlnZ2VyKCdjaGFuZ2UnKTtcblx0XHRcdFx0XHR9XG5cdFx0XHRcdH0pXG5cdFx0XHRcdC5vbignZ2VuZXJhdGUueGRzb2Z0JywgZnVuY3Rpb24gKCkge1xuXHRcdFx0XHRcdGlmIChvcHRpb25zLm9uR2VuZXJhdGUgJiYgJC5pc0Z1bmN0aW9uKG9wdGlvbnMub25HZW5lcmF0ZSkpIHtcblx0XHRcdFx0XHRcdG9wdGlvbnMub25HZW5lcmF0ZS5jYWxsKGRhdGV0aW1lcGlja2VyLCBfeGRzb2Z0X2RhdGV0aW1lLmN1cnJlbnRUaW1lLCBkYXRldGltZXBpY2tlci5kYXRhKCdpbnB1dCcpKTtcblx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0aWYgKHRyaWdnZXJBZnRlck9wZW4pIHtcblx0XHRcdFx0XHRcdGRhdGV0aW1lcGlja2VyLnRyaWdnZXIoJ2FmdGVyT3Blbi54ZHNvZnQnKTtcblx0XHRcdFx0XHRcdHRyaWdnZXJBZnRlck9wZW4gPSBmYWxzZTtcblx0XHRcdFx0XHR9XG5cdFx0XHRcdH0pXG5cdFx0XHRcdC5vbignY2xpY2sueGRzb2Z0JywgZnVuY3Rpb24gKHhkZXZlbnQpIHtcblx0XHRcdFx0XHR4ZGV2ZW50LnN0b3BQcm9wYWdhdGlvbigpO1xuXHRcdFx0XHR9KTtcblxuXHRcdFx0Y3VycmVudF90aW1lX2luZGV4ID0gMDtcblxuXHRcdFx0LyoqXG5cdFx0XHQgKiBSdW5zIHRoZSBjYWxsYmFjayBmb3IgZWFjaCBvZiB0aGUgc3BlY2lmaWVkIG5vZGUncyBhbmNlc3RvcnMuXG5cdFx0XHQgKlxuXHRcdFx0ICogUmV0dXJuIEZBTFNFIGZyb20gdGhlIGNhbGxiYWNrIHRvIHN0b3AgYXNjZW5kaW5nLlxuXHRcdFx0ICpcblx0XHRcdCAqIEBwYXJhbSB7RE9NTm9kZX0gbm9kZVxuXHRcdFx0ICogQHBhcmFtIHtGdW5jdGlvbn0gY2FsbGJhY2tcblx0XHRcdCAqIEByZXR1cm5zIHt1bmRlZmluZWR9XG5cdFx0XHQgKi9cblx0XHRcdGZvckVhY2hBbmNlc3Rvck9mID0gZnVuY3Rpb24gKG5vZGUsIGNhbGxiYWNrKSB7XG5cdFx0XHRcdGRvIHtcblx0XHRcdFx0XHRub2RlID0gbm9kZS5wYXJlbnROb2RlO1xuXG5cdFx0XHRcdFx0aWYgKCFub2RlIHx8IGNhbGxiYWNrKG5vZGUpID09PSBmYWxzZSkge1xuXHRcdFx0XHRcdFx0YnJlYWs7XG5cdFx0XHRcdFx0fVxuXHRcdFx0XHR9IHdoaWxlIChub2RlLm5vZGVOYW1lICE9PSAnSFRNTCcpO1xuXHRcdFx0fTtcblxuXHRcdFx0LyoqXG5cdFx0XHQgKiBTZXRzIHRoZSBwb3NpdGlvbiBvZiB0aGUgcGlja2VyLlxuXHRcdFx0ICpcblx0XHRcdCAqIEByZXR1cm5zIHt1bmRlZmluZWR9XG5cdFx0XHQgKi9cblx0XHRcdHNldFBvcyA9IGZ1bmN0aW9uICgpIHtcblx0XHRcdFx0dmFyIGRhdGVJbnB1dE9mZnNldCxcblx0XHRcdFx0XHRkYXRlSW5wdXRFbGVtLFxuXHRcdFx0XHRcdHZlcnRpY2FsUG9zaXRpb24sXG5cdFx0XHRcdFx0bGVmdCxcblx0XHRcdFx0XHRwb3NpdGlvbixcblx0XHRcdFx0XHRkYXRldGltZXBpY2tlckVsZW0sXG5cdFx0XHRcdFx0ZGF0ZUlucHV0SGFzRml4ZWRBbmNlc3Rvcixcblx0XHRcdFx0XHQkZGF0ZUlucHV0LFxuXHRcdFx0XHRcdHdpbmRvd1dpZHRoLFxuXHRcdFx0XHRcdHZlcnRpY2FsQW5jaG9yRWRnZSxcblx0XHRcdFx0XHRkYXRldGltZXBpY2tlckNzcyxcblx0XHRcdFx0XHR3aW5kb3dIZWlnaHQsXG5cdFx0XHRcdFx0d2luZG93U2Nyb2xsVG9wO1xuXG5cdFx0XHRcdCRkYXRlSW5wdXQgPSBkYXRldGltZXBpY2tlci5kYXRhKCdpbnB1dCcpO1xuXHRcdFx0XHRkYXRlSW5wdXRPZmZzZXQgPSAkZGF0ZUlucHV0Lm9mZnNldCgpO1xuXHRcdFx0XHRkYXRlSW5wdXRFbGVtID0gJGRhdGVJbnB1dFswXTtcblxuXHRcdFx0XHR2ZXJ0aWNhbEFuY2hvckVkZ2UgPSAndG9wJztcblx0XHRcdFx0dmVydGljYWxQb3NpdGlvbiA9IChkYXRlSW5wdXRPZmZzZXQudG9wICsgZGF0ZUlucHV0RWxlbS5vZmZzZXRIZWlnaHQpIC0gMTtcblx0XHRcdFx0bGVmdCA9IGRhdGVJbnB1dE9mZnNldC5sZWZ0O1xuXHRcdFx0XHRwb3NpdGlvbiA9IFwiYWJzb2x1dGVcIjtcblxuXHRcdFx0XHR3aW5kb3dXaWR0aCA9ICQob3B0aW9ucy5jb250ZW50V2luZG93KS53aWR0aCgpO1xuXHRcdFx0XHR3aW5kb3dIZWlnaHQgPSAkKG9wdGlvbnMuY29udGVudFdpbmRvdykuaGVpZ2h0KCk7XG5cdFx0XHRcdHdpbmRvd1Njcm9sbFRvcCA9ICQob3B0aW9ucy5jb250ZW50V2luZG93KS5zY3JvbGxUb3AoKTtcblxuXHRcdFx0XHRpZiAoKG9wdGlvbnMub3duZXJEb2N1bWVudC5kb2N1bWVudEVsZW1lbnQuY2xpZW50V2lkdGggLSBkYXRlSW5wdXRPZmZzZXQubGVmdCkgPCBkYXRlcGlja2VyLnBhcmVudCgpLm91dGVyV2lkdGgodHJ1ZSkpIHtcblx0XHRcdFx0XHR2YXIgZGlmZiA9IGRhdGVwaWNrZXIucGFyZW50KCkub3V0ZXJXaWR0aCh0cnVlKSAtIGRhdGVJbnB1dEVsZW0ub2Zmc2V0V2lkdGg7XG5cdFx0XHRcdFx0bGVmdCA9IGxlZnQgLSBkaWZmO1xuXHRcdFx0XHR9XG5cblx0XHRcdFx0aWYgKCRkYXRlSW5wdXQucGFyZW50KCkuY3NzKCdkaXJlY3Rpb24nKSA9PT0gJ3J0bCcpIHtcblx0XHRcdFx0XHRsZWZ0IC09IChkYXRldGltZXBpY2tlci5vdXRlcldpZHRoKCkgLSAkZGF0ZUlucHV0Lm91dGVyV2lkdGgoKSk7XG5cdFx0XHRcdH1cblxuXHRcdFx0XHRpZiAob3B0aW9ucy5maXhlZCkge1xuXHRcdFx0XHRcdHZlcnRpY2FsUG9zaXRpb24gLT0gd2luZG93U2Nyb2xsVG9wO1xuXHRcdFx0XHRcdGxlZnQgLT0gJChvcHRpb25zLmNvbnRlbnRXaW5kb3cpLnNjcm9sbExlZnQoKTtcblx0XHRcdFx0XHRwb3NpdGlvbiA9IFwiZml4ZWRcIjtcblx0XHRcdFx0fSBlbHNlIHtcblx0XHRcdFx0XHRkYXRlSW5wdXRIYXNGaXhlZEFuY2VzdG9yID0gZmFsc2U7XG5cblx0XHRcdFx0XHRmb3JFYWNoQW5jZXN0b3JPZihkYXRlSW5wdXRFbGVtLCBmdW5jdGlvbiAoYW5jZXN0b3JOb2RlKSB7XG5cdFx0XHRcdFx0XHRpZiAoYW5jZXN0b3JOb2RlID09PSBudWxsKSB7XG5cdFx0XHRcdFx0XHRcdHJldHVybiBmYWxzZTtcblx0XHRcdFx0XHRcdH1cblxuXHRcdFx0XHRcdFx0aWYgKG9wdGlvbnMuY29udGVudFdpbmRvdy5nZXRDb21wdXRlZFN0eWxlKGFuY2VzdG9yTm9kZSkuZ2V0UHJvcGVydHlWYWx1ZSgncG9zaXRpb24nKSA9PT0gJ2ZpeGVkJykge1xuXHRcdFx0XHRcdFx0XHRkYXRlSW5wdXRIYXNGaXhlZEFuY2VzdG9yID0gdHJ1ZTtcblx0XHRcdFx0XHRcdFx0cmV0dXJuIGZhbHNlO1xuXHRcdFx0XHRcdFx0fVxuXHRcdFx0XHRcdH0pO1xuXG5cdFx0XHRcdFx0aWYgKGRhdGVJbnB1dEhhc0ZpeGVkQW5jZXN0b3IgJiYgIW9wdGlvbnMuaW5zaWRlUGFyZW50KSB7XG5cdFx0XHRcdFx0XHRwb3NpdGlvbiA9ICdmaXhlZCc7XG5cblx0XHRcdFx0XHRcdC8vSWYgdGhlIHBpY2tlciB3b24ndCBmaXQgZW50aXJlbHkgd2l0aGluIHRoZSB2aWV3cG9ydCB0aGVuIGRpc3BsYXkgaXQgYWJvdmUgdGhlIGRhdGUgaW5wdXQuXG5cdFx0XHRcdFx0XHRpZiAodmVydGljYWxQb3NpdGlvbiArIGRhdGV0aW1lcGlja2VyLm91dGVySGVpZ2h0KCkgPiB3aW5kb3dIZWlnaHQgKyB3aW5kb3dTY3JvbGxUb3ApIHtcblx0XHRcdFx0XHRcdFx0dmVydGljYWxBbmNob3JFZGdlID0gJ2JvdHRvbSc7XG5cdFx0XHRcdFx0XHRcdHZlcnRpY2FsUG9zaXRpb24gPSAod2luZG93SGVpZ2h0ICsgd2luZG93U2Nyb2xsVG9wKSAtIGRhdGVJbnB1dE9mZnNldC50b3A7XG5cdFx0XHRcdFx0XHR9IGVsc2Uge1xuXHRcdFx0XHRcdFx0XHR2ZXJ0aWNhbFBvc2l0aW9uIC09IHdpbmRvd1Njcm9sbFRvcDtcblx0XHRcdFx0XHRcdH1cblx0XHRcdFx0XHR9IGVsc2Uge1xuXHRcdFx0XHRcdFx0aWYgKHZlcnRpY2FsUG9zaXRpb24gKyBkYXRldGltZXBpY2tlclswXS5vZmZzZXRIZWlnaHQgPiB3aW5kb3dIZWlnaHQgKyB3aW5kb3dTY3JvbGxUb3ApIHtcblx0XHRcdFx0XHRcdFx0dmVydGljYWxQb3NpdGlvbiA9IGRhdGVJbnB1dE9mZnNldC50b3AgLSBkYXRldGltZXBpY2tlclswXS5vZmZzZXRIZWlnaHQgKyAxO1xuXHRcdFx0XHRcdFx0fVxuXHRcdFx0XHRcdH1cblxuXHRcdFx0XHRcdGlmICh2ZXJ0aWNhbFBvc2l0aW9uIDwgMCkge1xuXHRcdFx0XHRcdFx0dmVydGljYWxQb3NpdGlvbiA9IDA7XG5cdFx0XHRcdFx0fVxuXG5cdFx0XHRcdFx0aWYgKGxlZnQgKyBkYXRlSW5wdXRFbGVtLm9mZnNldFdpZHRoID4gd2luZG93V2lkdGgpIHtcblx0XHRcdFx0XHRcdGxlZnQgPSB3aW5kb3dXaWR0aCAtIGRhdGVJbnB1dEVsZW0ub2Zmc2V0V2lkdGg7XG5cdFx0XHRcdFx0fVxuXHRcdFx0XHR9XG5cblx0XHRcdFx0ZGF0ZXRpbWVwaWNrZXJFbGVtID0gZGF0ZXRpbWVwaWNrZXJbMF07XG5cblx0XHRcdFx0Zm9yRWFjaEFuY2VzdG9yT2YoZGF0ZXRpbWVwaWNrZXJFbGVtLCBmdW5jdGlvbiAoYW5jZXN0b3JOb2RlKSB7XG5cdFx0XHRcdFx0dmFyIGFuY2VzdG9yTm9kZVBvc2l0aW9uO1xuXG5cdFx0XHRcdFx0YW5jZXN0b3JOb2RlUG9zaXRpb24gPSBvcHRpb25zLmNvbnRlbnRXaW5kb3cuZ2V0Q29tcHV0ZWRTdHlsZShhbmNlc3Rvck5vZGUpLmdldFByb3BlcnR5VmFsdWUoJ3Bvc2l0aW9uJyk7XG5cblx0XHRcdFx0XHRpZiAoYW5jZXN0b3JOb2RlUG9zaXRpb24gPT09ICdyZWxhdGl2ZScgJiYgd2luZG93V2lkdGggPj0gYW5jZXN0b3JOb2RlLm9mZnNldFdpZHRoKSB7XG5cdFx0XHRcdFx0XHRsZWZ0ID0gbGVmdCAtICgod2luZG93V2lkdGggLSBhbmNlc3Rvck5vZGUub2Zmc2V0V2lkdGgpIC8gMik7XG5cdFx0XHRcdFx0XHRyZXR1cm4gZmFsc2U7XG5cdFx0XHRcdFx0fVxuXHRcdFx0XHR9KTtcblxuXHRcdFx0XHRkYXRldGltZXBpY2tlckNzcyA9IHtcblx0XHRcdFx0XHRwb3NpdGlvbjogcG9zaXRpb24sXG5cdFx0XHRcdFx0bGVmdDogb3B0aW9ucy5pbnNpZGVQYXJlbnQgPyBkYXRlSW5wdXRFbGVtLm9mZnNldExlZnQgOiBsZWZ0LFxuXHRcdFx0XHRcdHRvcDogJycsICAvL0luaXRpYWxpemUgdG8gcHJldmVudCBwcmV2aW91cyB2YWx1ZXMgaW50ZXJmZXJpbmcgd2l0aCBuZXcgb25lcy5cblx0XHRcdFx0XHRib3R0b206ICcnICAvL0luaXRpYWxpemUgdG8gcHJldmVudCBwcmV2aW91cyB2YWx1ZXMgaW50ZXJmZXJpbmcgd2l0aCBuZXcgb25lcy5cblx0XHRcdFx0fTtcblxuXHRcdFx0XHRpZiAob3B0aW9ucy5pbnNpZGVQYXJlbnQpIHtcbiAgICAgICAgICAgICAgICAgICAgZGF0ZXRpbWVwaWNrZXJDc3NbdmVydGljYWxBbmNob3JFZGdlXSA9IGRhdGVJbnB1dEVsZW0ub2Zmc2V0VG9wICsgZGF0ZUlucHV0RWxlbS5vZmZzZXRIZWlnaHQ7XG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgZGF0ZXRpbWVwaWNrZXJDc3NbdmVydGljYWxBbmNob3JFZGdlXSA9IHZlcnRpY2FsUG9zaXRpb247XG4gICAgICAgICAgICAgICAgfVxuXG5cdFx0XHRcdGRhdGV0aW1lcGlja2VyLmNzcyhkYXRldGltZXBpY2tlckNzcyk7XG5cdFx0XHR9O1xuXG5cdFx0XHRkYXRldGltZXBpY2tlclxuXHRcdFx0XHQub24oJ29wZW4ueGRzb2Z0JywgZnVuY3Rpb24gKGV2ZW50KSB7XG5cdFx0XHRcdFx0dmFyIG9uU2hvdyA9IHRydWU7XG5cdFx0XHRcdFx0aWYgKG9wdGlvbnMub25TaG93ICYmICQuaXNGdW5jdGlvbihvcHRpb25zLm9uU2hvdykpIHtcblx0XHRcdFx0XHRcdG9uU2hvdyA9IG9wdGlvbnMub25TaG93LmNhbGwoZGF0ZXRpbWVwaWNrZXIsIF94ZHNvZnRfZGF0ZXRpbWUuY3VycmVudFRpbWUsIGRhdGV0aW1lcGlja2VyLmRhdGEoJ2lucHV0JyksIGV2ZW50KTtcblx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0aWYgKG9uU2hvdyAhPT0gZmFsc2UpIHtcblx0XHRcdFx0XHRcdGRhdGV0aW1lcGlja2VyLnNob3coKTtcblx0XHRcdFx0XHRcdHNldFBvcygpO1xuXHRcdFx0XHRcdFx0JChvcHRpb25zLmNvbnRlbnRXaW5kb3cpXG5cdFx0XHRcdFx0XHRcdC5vZmYoJ3Jlc2l6ZS54ZHNvZnQnLCBzZXRQb3MpXG5cdFx0XHRcdFx0XHRcdC5vbigncmVzaXplLnhkc29mdCcsIHNldFBvcyk7XG5cblx0XHRcdFx0XHRcdGlmIChvcHRpb25zLmNsb3NlT25XaXRob3V0Q2xpY2spIHtcblx0XHRcdFx0XHRcdFx0JChbb3B0aW9ucy5vd25lckRvY3VtZW50LmJvZHksIG9wdGlvbnMuY29udGVudFdpbmRvd10pLm9uKCd0b3VjaHN0YXJ0IG1vdXNlZG93bi54ZHNvZnQnLCBmdW5jdGlvbiBhcmd1bWVudHNfY2FsbGVlNigpIHtcblx0XHRcdFx0XHRcdFx0XHRkYXRldGltZXBpY2tlci50cmlnZ2VyKCdjbG9zZS54ZHNvZnQnKTtcblx0XHRcdFx0XHRcdFx0XHQkKFtvcHRpb25zLm93bmVyRG9jdW1lbnQuYm9keSwgb3B0aW9ucy5jb250ZW50V2luZG93XSkub2ZmKCd0b3VjaHN0YXJ0IG1vdXNlZG93bi54ZHNvZnQnLCBhcmd1bWVudHNfY2FsbGVlNik7XG5cdFx0XHRcdFx0XHRcdH0pO1xuXHRcdFx0XHRcdFx0fVxuXHRcdFx0XHRcdH1cblx0XHRcdFx0fSlcblx0XHRcdFx0Lm9uKCdjbG9zZS54ZHNvZnQnLCBmdW5jdGlvbiAoZXZlbnQpIHtcblx0XHRcdFx0XHR2YXIgb25DbG9zZSA9IHRydWU7XG5cdFx0XHRcdFx0bW9udGhfcGlja2VyXG5cdFx0XHRcdFx0XHQuZmluZCgnLnhkc29mdF9tb250aCwueGRzb2Z0X3llYXInKVxuXHRcdFx0XHRcdFx0LmZpbmQoJy54ZHNvZnRfc2VsZWN0Jylcblx0XHRcdFx0XHRcdC5oaWRlKCk7XG5cdFx0XHRcdFx0aWYgKG9wdGlvbnMub25DbG9zZSAmJiAkLmlzRnVuY3Rpb24ob3B0aW9ucy5vbkNsb3NlKSkge1xuXHRcdFx0XHRcdFx0b25DbG9zZSA9IG9wdGlvbnMub25DbG9zZS5jYWxsKGRhdGV0aW1lcGlja2VyLCBfeGRzb2Z0X2RhdGV0aW1lLmN1cnJlbnRUaW1lLCBkYXRldGltZXBpY2tlci5kYXRhKCdpbnB1dCcpLCBldmVudCk7XG5cdFx0XHRcdFx0fVxuXHRcdFx0XHRcdGlmIChvbkNsb3NlICE9PSBmYWxzZSAmJiAhb3B0aW9ucy5vcGVuZWQgJiYgIW9wdGlvbnMuaW5saW5lKSB7XG5cdFx0XHRcdFx0XHRkYXRldGltZXBpY2tlci5oaWRlKCk7XG5cdFx0XHRcdFx0fVxuXHRcdFx0XHRcdGV2ZW50LnN0b3BQcm9wYWdhdGlvbigpO1xuXHRcdFx0XHR9KVxuXHRcdFx0XHQub24oJ3RvZ2dsZS54ZHNvZnQnLCBmdW5jdGlvbiAoKSB7XG5cdFx0XHRcdFx0aWYgKGRhdGV0aW1lcGlja2VyLmlzKCc6dmlzaWJsZScpKSB7XG5cdFx0XHRcdFx0XHRkYXRldGltZXBpY2tlci50cmlnZ2VyKCdjbG9zZS54ZHNvZnQnKTtcblx0XHRcdFx0XHR9IGVsc2Uge1xuXHRcdFx0XHRcdFx0ZGF0ZXRpbWVwaWNrZXIudHJpZ2dlcignb3Blbi54ZHNvZnQnKTtcblx0XHRcdFx0XHR9XG5cdFx0XHRcdH0pXG5cdFx0XHRcdC5kYXRhKCdpbnB1dCcsIGlucHV0KTtcblxuXHRcdFx0dGltZXIgPSAwO1xuXG5cdFx0XHRkYXRldGltZXBpY2tlci5kYXRhKCd4ZHNvZnRfZGF0ZXRpbWUnLCBfeGRzb2Z0X2RhdGV0aW1lKTtcblx0XHRcdGRhdGV0aW1lcGlja2VyLnNldE9wdGlvbnMob3B0aW9ucyk7XG5cblx0XHRcdGZ1bmN0aW9uIGdldEN1cnJlbnRWYWx1ZSgpIHtcblx0XHRcdFx0dmFyIGN0ID0gZmFsc2UsIHRpbWU7XG5cblx0XHRcdFx0aWYgKG9wdGlvbnMuc3RhcnREYXRlKSB7XG5cdFx0XHRcdFx0Y3QgPSBfeGRzb2Z0X2RhdGV0aW1lLnN0clRvRGF0ZShvcHRpb25zLnN0YXJ0RGF0ZSk7XG5cdFx0XHRcdH0gZWxzZSB7XG5cdFx0XHRcdFx0Y3QgPSBvcHRpb25zLnZhbHVlIHx8ICgoaW5wdXQgJiYgaW5wdXQudmFsICYmIGlucHV0LnZhbCgpKSA/IGlucHV0LnZhbCgpIDogJycpO1xuXHRcdFx0XHRcdGlmIChjdCkge1xuXHRcdFx0XHRcdFx0Y3QgPSBfeGRzb2Z0X2RhdGV0aW1lLnN0clRvRGF0ZVRpbWUoY3QpO1xuXHRcdFx0XHRcdFx0aWYgKG9wdGlvbnMueWVhck9mZnNldCkge1xuXHRcdFx0XHRcdFx0XHRjdCA9IG5ldyBEYXRlKGN0LmdldEZ1bGxZZWFyKCkgLSBvcHRpb25zLnllYXJPZmZzZXQsIGN0LmdldE1vbnRoKCksIGN0LmdldERhdGUoKSwgY3QuZ2V0SG91cnMoKSwgY3QuZ2V0TWludXRlcygpLCBjdC5nZXRTZWNvbmRzKCksIGN0LmdldE1pbGxpc2Vjb25kcygpKTtcblx0XHRcdFx0XHRcdH1cblx0XHRcdFx0XHR9IGVsc2UgaWYgKG9wdGlvbnMuZGVmYXVsdERhdGUpIHtcblx0XHRcdFx0XHRcdGN0ID0gX3hkc29mdF9kYXRldGltZS5zdHJUb0RhdGVUaW1lKG9wdGlvbnMuZGVmYXVsdERhdGUpO1xuXHRcdFx0XHRcdFx0aWYgKG9wdGlvbnMuZGVmYXVsdFRpbWUpIHtcblx0XHRcdFx0XHRcdFx0dGltZSA9IF94ZHNvZnRfZGF0ZXRpbWUuc3RydG90aW1lKG9wdGlvbnMuZGVmYXVsdFRpbWUpO1xuXHRcdFx0XHRcdFx0XHRjdC5zZXRIb3Vycyh0aW1lLmdldEhvdXJzKCkpO1xuXHRcdFx0XHRcdFx0XHRjdC5zZXRNaW51dGVzKHRpbWUuZ2V0TWludXRlcygpKTtcblx0XHRcdFx0XHRcdH1cblx0XHRcdFx0XHR9XG5cdFx0XHRcdH1cblxuXHRcdFx0XHRpZiAoY3QgJiYgX3hkc29mdF9kYXRldGltZS5pc1ZhbGlkRGF0ZShjdCkpIHtcblx0XHRcdFx0XHRkYXRldGltZXBpY2tlci5kYXRhKCdjaGFuZ2VkJywgdHJ1ZSk7XG5cdFx0XHRcdH0gZWxzZSB7XG5cdFx0XHRcdFx0Y3QgPSAnJztcblx0XHRcdFx0fVxuXG5cdFx0XHRcdHJldHVybiBjdCB8fCAwO1xuXHRcdFx0fVxuXG5cdFx0XHRmdW5jdGlvbiBzZXRNYXNrKG9wdGlvbnMpIHtcblxuXHRcdFx0XHR2YXIgaXNWYWxpZFZhbHVlID0gZnVuY3Rpb24gKG1hc2ssIHZhbHVlKSB7XG5cdFx0XHRcdFx0XHR2YXIgcmVnID0gbWFza1xuXHRcdFx0XHRcdFx0XHQucmVwbGFjZSgvKFtcXFtcXF1cXC9cXHtcXH1cXChcXClcXC1cXC5cXCtdezF9KS9nLCAnXFxcXCQxJylcblx0XHRcdFx0XHRcdFx0LnJlcGxhY2UoL18vZywgJ3tkaWdpdCt9Jylcblx0XHRcdFx0XHRcdFx0LnJlcGxhY2UoLyhbMC05XXsxfSkvZywgJ3tkaWdpdCQxfScpXG5cdFx0XHRcdFx0XHRcdC5yZXBsYWNlKC9cXHtkaWdpdChbMC05XXsxfSlcXH0vZywgJ1swLSQxX117MX0nKVxuXHRcdFx0XHRcdFx0XHQucmVwbGFjZSgvXFx7ZGlnaXRbXFwrXVxcfS9nLCAnWzAtOV9dezF9Jyk7XG5cdFx0XHRcdFx0XHRyZXR1cm4gKG5ldyBSZWdFeHAocmVnKSkudGVzdCh2YWx1ZSk7XG5cdFx0XHRcdFx0fSxcblx0XHRcdFx0XHRnZXRDYXJldFBvcyA9IGZ1bmN0aW9uIChpbnB1dCkge1xuXHRcdFx0XHRcdFx0dHJ5IHtcblx0XHRcdFx0XHRcdFx0aWYgKG9wdGlvbnMub3duZXJEb2N1bWVudC5zZWxlY3Rpb24gJiYgb3B0aW9ucy5vd25lckRvY3VtZW50LnNlbGVjdGlvbi5jcmVhdGVSYW5nZSkge1xuXHRcdFx0XHRcdFx0XHRcdHZhciByYW5nZSA9IG9wdGlvbnMub3duZXJEb2N1bWVudC5zZWxlY3Rpb24uY3JlYXRlUmFuZ2UoKTtcblx0XHRcdFx0XHRcdFx0XHRyZXR1cm4gcmFuZ2UuZ2V0Qm9va21hcmsoKS5jaGFyQ29kZUF0KDIpIC0gMjtcblx0XHRcdFx0XHRcdFx0fVxuXHRcdFx0XHRcdFx0XHRpZiAoaW5wdXQuc2V0U2VsZWN0aW9uUmFuZ2UpIHtcblx0XHRcdFx0XHRcdFx0XHRyZXR1cm4gaW5wdXQuc2VsZWN0aW9uU3RhcnQ7XG5cdFx0XHRcdFx0XHRcdH1cblx0XHRcdFx0XHRcdH0gY2F0Y2ggKGUpIHtcblx0XHRcdFx0XHRcdFx0cmV0dXJuIDA7XG5cdFx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0fSxcblx0XHRcdFx0XHRzZXRDYXJldFBvcyA9IGZ1bmN0aW9uIChub2RlLCBwb3MpIHtcblx0XHRcdFx0XHRcdG5vZGUgPSAodHlwZW9mIG5vZGUgPT09IFwic3RyaW5nXCIgfHwgbm9kZSBpbnN0YW5jZW9mIFN0cmluZykgPyBvcHRpb25zLm93bmVyRG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQobm9kZSkgOiBub2RlO1xuXHRcdFx0XHRcdFx0aWYgKCFub2RlKSB7XG5cdFx0XHRcdFx0XHRcdHJldHVybiBmYWxzZTtcblx0XHRcdFx0XHRcdH1cblx0XHRcdFx0XHRcdGlmIChub2RlLmNyZWF0ZVRleHRSYW5nZSkge1xuXHRcdFx0XHRcdFx0XHR2YXIgdGV4dFJhbmdlID0gbm9kZS5jcmVhdGVUZXh0UmFuZ2UoKTtcblx0XHRcdFx0XHRcdFx0dGV4dFJhbmdlLmNvbGxhcHNlKHRydWUpO1xuXHRcdFx0XHRcdFx0XHR0ZXh0UmFuZ2UubW92ZUVuZCgnY2hhcmFjdGVyJywgcG9zKTtcblx0XHRcdFx0XHRcdFx0dGV4dFJhbmdlLm1vdmVTdGFydCgnY2hhcmFjdGVyJywgcG9zKTtcblx0XHRcdFx0XHRcdFx0dGV4dFJhbmdlLnNlbGVjdCgpO1xuXHRcdFx0XHRcdFx0XHRyZXR1cm4gdHJ1ZTtcblx0XHRcdFx0XHRcdH1cblx0XHRcdFx0XHRcdGlmIChub2RlLnNldFNlbGVjdGlvblJhbmdlKSB7XG5cdFx0XHRcdFx0XHRcdG5vZGUuc2V0U2VsZWN0aW9uUmFuZ2UocG9zLCBwb3MpO1xuXHRcdFx0XHRcdFx0XHRyZXR1cm4gdHJ1ZTtcblx0XHRcdFx0XHRcdH1cblx0XHRcdFx0XHRcdHJldHVybiBmYWxzZTtcblx0XHRcdFx0XHR9O1xuXG5cdFx0XHRcdGlmKG9wdGlvbnMubWFzaykge1xuXHRcdFx0XHRcdGlucHV0Lm9mZigna2V5ZG93bi54ZHNvZnQnKTtcblx0XHRcdFx0fVxuXG5cdFx0XHRcdGlmIChvcHRpb25zLm1hc2sgPT09IHRydWUpIHtcblx0XHRcdFx0XHRpZiAoZGF0ZUhlbHBlci5mb3JtYXRNYXNrKSB7XG5cdFx0XHRcdFx0XHRvcHRpb25zLm1hc2sgPSBkYXRlSGVscGVyLmZvcm1hdE1hc2sob3B0aW9ucy5mb3JtYXQpXG5cdFx0XHRcdFx0fSBlbHNlIHtcblx0XHRcdFx0XHRcdG9wdGlvbnMubWFzayA9IG9wdGlvbnMuZm9ybWF0XG5cdFx0XHRcdFx0XHRcdC5yZXBsYWNlKC9ZL2csICc5OTk5Jylcblx0XHRcdFx0XHRcdFx0LnJlcGxhY2UoL0YvZywgJzk5OTknKVxuXHRcdFx0XHRcdFx0XHQucmVwbGFjZSgvbS9nLCAnMTknKVxuXHRcdFx0XHRcdFx0XHQucmVwbGFjZSgvZC9nLCAnMzknKVxuXHRcdFx0XHRcdFx0XHQucmVwbGFjZSgvSC9nLCAnMjknKVxuXHRcdFx0XHRcdFx0XHQucmVwbGFjZSgvaS9nLCAnNTknKVxuXHRcdFx0XHRcdFx0XHQucmVwbGFjZSgvcy9nLCAnNTknKTtcblx0XHRcdFx0XHR9XG5cdFx0XHRcdH1cblxuXHRcdFx0XHRpZiAoJC50eXBlKG9wdGlvbnMubWFzaykgPT09ICdzdHJpbmcnKSB7XG5cdFx0XHRcdFx0aWYgKCFpc1ZhbGlkVmFsdWUob3B0aW9ucy5tYXNrLCBpbnB1dC52YWwoKSkpIHtcblx0XHRcdFx0XHRcdGlucHV0LnZhbChvcHRpb25zLm1hc2sucmVwbGFjZSgvWzAtOV0vZywgJ18nKSk7XG5cdFx0XHRcdFx0XHRzZXRDYXJldFBvcyhpbnB1dFswXSwgMCk7XG5cdFx0XHRcdFx0fVxuXG5cdFx0XHRcdFx0aW5wdXQub24oJ3Bhc3RlLnhkc29mdCcsIGZ1bmN0aW9uIChldmVudCkge1xuXHRcdFx0XHRcdCAgICAvLyBjb3VwbGUgb3B0aW9ucyBoZXJlXG5cdFx0XHRcdFx0ICAgIC8vIDEuIHJldHVybiBmYWxzZSAtIHRlbGwgdGhlbSB0aGV5IGNhbid0IHBhc3RlXG5cdFx0XHRcdFx0ICAgIC8vIDIuIGluc2VydCBvdmVyIGN1cnJlbnQgY2hhcmFjdGVycyAtIG1pbmltYWwgdmFsaWRhdGlvblxuXHRcdFx0XHRcdCAgICAvLyAzLiBmdWxsIGZsZWRnZWQgcGFyc2luZyBhbmQgdmFsaWRhdGlvblxuXHRcdFx0XHRcdCAgICAvLyBsZXQncyBnbyBvcHRpb24gMiBmb3Igbm93XG5cblx0XHRcdFx0XHQgICAgLy8gZmlyZXMgbXVsdGlwbGUgdGltZXMgZm9yIHNvbWUgcmVhc29uXG5cblx0XHRcdFx0XHQgICAgLy8gaHR0cHM6Ly9zdGFja292ZXJmbG93LmNvbS9hLzMwNDk2NDg4LzEzNjYwMzNcblx0XHRcdFx0XHQgICAgdmFyIGNsaXBib2FyZERhdGEgPSBldmVudC5jbGlwYm9hcmREYXRhIHx8IGV2ZW50Lm9yaWdpbmFsRXZlbnQuY2xpcGJvYXJkRGF0YSB8fCB3aW5kb3cuY2xpcGJvYXJkRGF0YSxcblx0XHRcdFx0XHRcdHBhc3RlZERhdGEgPSBjbGlwYm9hcmREYXRhLmdldERhdGEoJ3RleHQnKSxcblx0XHRcdFx0XHRcdHZhbCA9IHRoaXMudmFsdWUsXG5cdFx0XHRcdFx0XHRwb3MgPSB0aGlzLnNlbGVjdGlvblN0YXJ0XG5cblx0XHRcdFx0XHQgICAgdmFyIHZhbHVlQmVmb3JlQ3Vyc29yID0gdmFsLnN1YnN0cigwLCBwb3MpO1xuXHRcdFx0XHRcdCAgICB2YXIgdmFsdWVBZnRlclBhc3RlID0gdmFsLnN1YnN0cihwb3MgKyBwYXN0ZWREYXRhLmxlbmd0aCk7XG5cblx0XHRcdFx0XHQgICAgdmFsID0gdmFsdWVCZWZvcmVDdXJzb3IgKyBwYXN0ZWREYXRhICsgdmFsdWVBZnRlclBhc3RlOyAgICAgICAgICAgXG5cdFx0XHRcdFx0ICAgIHBvcyArPSBwYXN0ZWREYXRhLmxlbmd0aDtcblxuXHRcdFx0XHRcdCAgICBpZiAoaXNWYWxpZFZhbHVlKG9wdGlvbnMubWFzaywgdmFsKSkge1xuXHRcdFx0XHRcdFx0dGhpcy52YWx1ZSA9IHZhbDtcblx0XHRcdFx0XHRcdHNldENhcmV0UG9zKHRoaXMsIHBvcyk7XG5cdFx0XHRcdFx0ICAgIH0gZWxzZSBpZiAoJC50cmltKHZhbCkgPT09ICcnKSB7XG5cdFx0XHRcdFx0XHR0aGlzLnZhbHVlID0gb3B0aW9ucy5tYXNrLnJlcGxhY2UoL1swLTldL2csICdfJyk7XG5cdFx0XHRcdFx0ICAgIH0gZWxzZSB7XG5cdFx0XHRcdFx0XHRpbnB1dC50cmlnZ2VyKCdlcnJvcl9pbnB1dC54ZHNvZnQnKTtcblx0XHRcdFx0XHQgICAgfVxuXG5cdFx0XHRcdFx0ICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG5cdFx0XHRcdFx0ICAgIHJldHVybiBmYWxzZTtcblx0XHRcdFx0XHQgIH0pO1xuXG5cdFx0XHRcdFx0ICBpbnB1dC5vbigna2V5ZG93bi54ZHNvZnQnLCBmdW5jdGlvbiAoZXZlbnQpIHtcblx0XHRcdFx0XHQgICAgdmFyIHZhbCA9IHRoaXMudmFsdWUsXG5cdFx0XHRcdFx0XHRrZXkgPSBldmVudC53aGljaCxcblx0XHRcdFx0XHRcdHBvcyA9IHRoaXMuc2VsZWN0aW9uU3RhcnQsXG5cdFx0XHRcdFx0XHRzZWxFbmQgPSB0aGlzLnNlbGVjdGlvbkVuZCxcblx0XHRcdFx0XHRcdGhhc1NlbCA9IHBvcyAhPT0gc2VsRW5kLFxuXHRcdFx0XHRcdFx0ZGlnaXQ7XG5cblx0XHRcdFx0XHQgICAgLy8gb25seSBhbG93IHRoZXNlIGNoYXJhY3RlcnNcblx0XHRcdFx0XHQgICAgaWYgKCgoa2V5ID49ICBLRVkwICYmIGtleSA8PSAgS0VZOSkgIHx8XG5cdFx0XHRcdFx0XHQgKGtleSA+PSBfS0VZMCAmJiBrZXkgPD0gX0tFWTkpKSB8fCBcblx0XHRcdFx0XHRcdCAoa2V5ID09PSBCQUNLU1BBQ0UgfHwga2V5ID09PSBERUwpKSB7XG5cblx0XHRcdFx0XHQgICAgICAvLyBnZXQgY2hhciB0byBpbnNlcnQgd2hpY2ggaXMgbmV3IGNoYXJhY3RlciBvciBwbGFjZWhvbGRlciAoJ18nKVxuXHRcdFx0XHRcdCAgICAgIGRpZ2l0ID0gKGtleSA9PT0gQkFDS1NQQUNFIHx8IGtleSA9PT0gREVMKSA/ICdfJyA6XG5cdFx0XHRcdFx0XHRcdCAgU3RyaW5nLmZyb21DaGFyQ29kZSgoX0tFWTAgPD0ga2V5ICYmIGtleSA8PSBfS0VZOSkgPyBrZXkgLSBLRVkwIDoga2V5KTtcblxuXHRcdFx0XHRcdFx0Ly8gd2UncmUgZGVsZXRpbmcgc29tZXRoaW5nLCB3ZSdyZSBub3QgYXQgdGhlIHN0YXJ0LCBhbmQgaGF2ZSBub3JtYWwgY3Vyc29yLCBtb3ZlIGJhY2sgb25lXG5cdFx0XHRcdFx0XHQvLyBpZiB3ZSBoYXZlIGEgc2VsZWN0aW9uIGxlbmd0aCwgY3Vyc29yIGFjdHVhbGx5IHNpdHMgYmVoaW5kIGRlbGV0YWJsZSBjaGFyLCBub3QgaW4gZnJvbnRcblx0XHRcdFx0XHRcdGlmIChrZXkgPT09IEJBQ0tTUEFDRSAmJiBwb3MgJiYgIWhhc1NlbCkge1xuXHRcdFx0XHRcdFx0ICAgIHBvcyAtPSAxO1xuXHRcdFx0XHRcdFx0fVxuXG5cdFx0XHRcdFx0XHQvLyBkb24ndCBzdG9wIG9uIGEgc2VwYXJhdG9yLCBjb250aW51ZSB3aGF0ZXZlciBkaXJlY3Rpb24geW91IHdlcmUgZ29pbmdcblx0XHRcdFx0XHRcdC8vICAgdmFsdWUgY2hhciAtIGtlZXAgaW5jcmVtZW50aW5nIHBvc2l0aW9uIHdoaWxlIG9uIHNlcGFyYXRvciBjaGFyIGFuZCB3ZSBzdGlsbCBoYXZlIHJvb21cblx0XHRcdFx0XHRcdC8vICAgZGVsIGNoYXIgICAtIGtlZXAgZGVjcmVtZW50aW5nIHBvc2l0aW9uIHdoaWxlIG9uIHNlcGFyYXRvciBjaGFyIGFuZCB3ZSBzdGlsbCBoYXZlIHJvb21cblx0XHRcdFx0XHRcdHdoaWxlICh0cnVlKSB7XG5cdFx0XHRcdFx0XHQgIHZhciBtYXNrVmFsdWVBdEN1clBvcyA9IG9wdGlvbnMubWFzay5zdWJzdHIocG9zLCAxKTtcblx0XHRcdFx0XHRcdCAgdmFyIHBvc1Nob3J0ZXJUaGFuTWFza0xlbmd0aCA9IHBvcyA8IG9wdGlvbnMubWFzay5sZW5ndGg7XG5cdFx0XHRcdFx0XHQgIHZhciBwb3NHcmVhdGVyVGhhblplcm8gPSBwb3MgPiAwO1xuXHRcdFx0XHRcdFx0ICB2YXIgbm90TnVtYmVyT3JQbGFjZWhvbGRlciA9IC9bXjAtOV9dLztcblx0XHRcdFx0XHRcdCAgdmFyIGN1clBvc09uU2VwID0gbm90TnVtYmVyT3JQbGFjZWhvbGRlci50ZXN0KG1hc2tWYWx1ZUF0Q3VyUG9zKTtcblx0XHRcdFx0XHRcdCAgdmFyIGNvbnRpbnVlTW92aW5nUG9zaXRpb24gPSBjdXJQb3NPblNlcCAmJiBwb3NTaG9ydGVyVGhhbk1hc2tMZW5ndGggJiYgcG9zR3JlYXRlclRoYW5aZXJvXG5cblx0XHRcdFx0XHRcdCAgLy8gaWYgd2UgaGl0IGEgcmVhbCBjaGFyLCBzdGF5IHdoZXJlIHdlIGFyZVxuXHRcdFx0XHRcdFx0ICBpZiAoIWNvbnRpbnVlTW92aW5nUG9zaXRpb24pIGJyZWFrO1xuXG5cdFx0XHRcdFx0XHQgIC8vIGhpdHRpbmcgYmFja3NwYWNlIGluIGEgc2VsZWN0aW9uLCB5b3UgY2FuIHBvc3NpYmx5IGdvIGJhY2sgYW55IGZ1cnRoZXIgLSBnbyBmb3J3YXJkXG5cdFx0XHRcdFx0XHQgIHBvcyArPSAoa2V5ID09PSBCQUNLU1BBQ0UgJiYgIWhhc1NlbCkgPyAtMSA6IDE7XG5cbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgIFxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGV2ZW50Lm1ldGFLZXkpIHsgICAgLy8gY21kIGhhcyBiZWVuIHByZXNzZWRcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBwb3MgPSAwO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGhhc1NlbCA9IHRydWU7XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG5cblx0XHRcdFx0XHRcdGlmIChoYXNTZWwpIHtcblx0XHRcdFx0XHRcdCAgLy8gcG9zIG1pZ2h0IGhhdmUgbW92ZWQgc28gcmUtY2FsYyBsZW5ndGhcblx0XHRcdFx0XHRcdCAgdmFyIHNlbExlbmd0aCA9IHNlbEVuZCAtIHBvc1xuXG5cdFx0XHRcdFx0XHQgIC8vIGlmIHdlIGhhdmUgYSBzZWxlY3Rpb24gbGVuZ3RoIHdlIHdpbGwgd2lwZSBvdXQgZW50aXJlIHNlbGVjdGlvbiBhbmQgcmVwbGFjZSB3aXRoIGRlZmF1bHQgdGVtcGxhdGUgZm9yIHRoYXQgcmFuZ2Vcblx0XHRcdFx0XHRcdCAgdmFyIGRlZmF1bHRCbGFuayA9IG9wdGlvbnMubWFzay5yZXBsYWNlKC9bMC05XS9nLCAnXycpO1xuXHRcdFx0XHRcdFx0ICB2YXIgZGVmYXVsdEJsYW5rU2VsZWN0aW9uUmVwbGFjZW1lbnQgPSBkZWZhdWx0Qmxhbmsuc3Vic3RyKHBvcywgc2VsTGVuZ3RoKTsgXG5cdFx0XHRcdFx0XHQgIHZhciBzZWxSZXBsYWNlbWVudFJlbWFpbmRlciA9IGRlZmF1bHRCbGFua1NlbGVjdGlvblJlcGxhY2VtZW50LnN1YnN0cigxKSAvLyBtaWdodCBiZSBlbXB0eVxuXG5cdFx0XHRcdFx0XHQgIHZhciB2YWx1ZUJlZm9yZVNlbCA9IHZhbC5zdWJzdHIoMCwgcG9zKTtcblx0XHRcdFx0XHRcdCAgdmFyIGluc2VydENoYXJzID0gZGlnaXQgKyBzZWxSZXBsYWNlbWVudFJlbWFpbmRlcjtcblx0XHRcdFx0XHRcdCAgdmFyIGNoYXJzQWZ0ZXJTZWxlY3Rpb24gPSB2YWwuc3Vic3RyKHBvcyArIHNlbExlbmd0aCk7XG5cblx0XHRcdFx0XHRcdCAgdmFsID0gdmFsdWVCZWZvcmVTZWwgKyBpbnNlcnRDaGFycyArIGNoYXJzQWZ0ZXJTZWxlY3Rpb25cblxuXHRcdFx0XHRcdFx0fSBlbHNlIHtcblx0XHRcdFx0XHRcdCAgdmFyIHZhbHVlQmVmb3JlQ3Vyc29yID0gdmFsLnN1YnN0cigwLCBwb3MpO1xuXHRcdFx0XHRcdFx0ICB2YXIgaW5zZXJ0Q2hhciA9IGRpZ2l0O1xuXHRcdFx0XHRcdFx0ICB2YXIgdmFsdWVBZnRlck5leHRDaGFyID0gdmFsLnN1YnN0cihwb3MgKyAxKTtcblxuXHRcdFx0XHRcdFx0ICB2YWwgPSB2YWx1ZUJlZm9yZUN1cnNvciArIGluc2VydENoYXIgKyB2YWx1ZUFmdGVyTmV4dENoYXJcblx0XHRcdFx0XHRcdH1cblxuXHRcdFx0XHRcdFx0aWYgKCQudHJpbSh2YWwpID09PSAnJykge1xuXHRcdFx0XHRcdFx0ICAvLyBpZiBlbXB0eSwgc2V0IHRvIGRlZmF1bHRcblx0XHRcdFx0XHRcdCAgICB2YWwgPSBkZWZhdWx0Qmxhbmtcblx0XHRcdFx0XHRcdH0gZWxzZSB7XG5cdFx0XHRcdFx0XHQgIC8vIGlmIGF0IHRoZSBsYXN0IGNoYXJhY3RlciBkb24ndCBuZWVkIHRvIGRvIGFueXRoaW5nXG5cdFx0XHRcdFx0XHQgICAgaWYgKHBvcyA9PT0gb3B0aW9ucy5tYXNrLmxlbmd0aCkge1xuXHRcdFx0XHRcdFx0XHRldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuXHRcdFx0XHRcdFx0XHRyZXR1cm4gZmFsc2U7XG5cdFx0XHRcdFx0XHQgICAgfVxuXHRcdFx0XHRcdFx0fVxuXG5cdFx0XHRcdFx0XHQvLyByZXN1bWUgY3Vyc29yIGxvY2F0aW9uXG5cdFx0XHRcdFx0XHRwb3MgKz0gKGtleSA9PT0gQkFDS1NQQUNFKSA/IDAgOiAxO1xuXHRcdFx0XHRcdFx0Ly8gZG9uJ3Qgc3RvcCBvbiBhIHNlcGFyYXRvciwgY29udGludWUgd2hhdGV2ZXIgZGlyZWN0aW9uIHlvdSB3ZXJlIGdvaW5nXG5cdFx0XHRcdFx0XHR3aGlsZSAoL1teMC05X10vLnRlc3Qob3B0aW9ucy5tYXNrLnN1YnN0cihwb3MsIDEpKSAmJiBwb3MgPCBvcHRpb25zLm1hc2subGVuZ3RoICYmIHBvcyA+IDApIHtcblx0XHRcdFx0XHRcdCAgICBwb3MgKz0gKGtleSA9PT0gQkFDS1NQQUNFKSA/IDAgOiAxO1xuXHRcdFx0XHRcdFx0fVxuXG5cdFx0XHRcdFx0XHRpZiAoaXNWYWxpZFZhbHVlKG9wdGlvbnMubWFzaywgdmFsKSkge1xuXHRcdFx0XHRcdFx0ICAgIHRoaXMudmFsdWUgPSB2YWw7XG5cdFx0XHRcdFx0XHQgICAgc2V0Q2FyZXRQb3ModGhpcywgcG9zKTtcblx0XHRcdFx0XHRcdH0gZWxzZSBpZiAoJC50cmltKHZhbCkgPT09ICcnKSB7XG5cdFx0XHRcdFx0XHQgICAgdGhpcy52YWx1ZSA9IG9wdGlvbnMubWFzay5yZXBsYWNlKC9bMC05XS9nLCAnXycpO1xuXHRcdFx0XHRcdFx0fSBlbHNlIHtcblx0XHRcdFx0XHRcdCAgICBpbnB1dC50cmlnZ2VyKCdlcnJvcl9pbnB1dC54ZHNvZnQnKTtcblx0XHRcdFx0XHRcdH1cblx0XHRcdFx0XHQgICAgfSBlbHNlIHtcblx0XHRcdFx0XHRcdGlmICgoW0FLRVksIENLRVksIFZLRVksIFpLRVksIFlLRVldLmluZGV4T2Yoa2V5KSAhPT0gLTEgJiYgY3RybERvd24pIHx8IFtFU0MsIEFSUk9XVVAsIEFSUk9XRE9XTiwgQVJST1dMRUZULCBBUlJPV1JJR0hULCBGNSwgQ1RSTEtFWSwgVEFCLCBFTlRFUl0uaW5kZXhPZihrZXkpICE9PSAtMSkge1xuXHRcdFx0XHRcdFx0ICAgIHJldHVybiB0cnVlO1xuXHRcdFx0XHRcdFx0fVxuXHRcdFx0XHRcdCAgICB9XG5cblx0XHRcdFx0XHQgICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcblx0XHRcdFx0XHQgICAgcmV0dXJuIGZhbHNlO1xuXHRcdFx0XHRcdCAgfSk7XG5cdFx0XHRcdH1cblx0XHRcdH1cblxuXHRcdFx0X3hkc29mdF9kYXRldGltZS5zZXRDdXJyZW50VGltZShnZXRDdXJyZW50VmFsdWUoKSk7XG5cblx0XHRcdGlucHV0XG5cdFx0XHRcdC5kYXRhKCd4ZHNvZnRfZGF0ZXRpbWVwaWNrZXInLCBkYXRldGltZXBpY2tlcilcblx0XHRcdFx0Lm9uKCdvcGVuLnhkc29mdCBmb2N1c2luLnhkc29mdCBtb3VzZWRvd24ueGRzb2Z0IHRvdWNoc3RhcnQnLCBmdW5jdGlvbiAoKSB7XG5cdFx0XHRcdFx0aWYgKGlucHV0LmlzKCc6ZGlzYWJsZWQnKSB8fCAoaW5wdXQuZGF0YSgneGRzb2Z0X2RhdGV0aW1lcGlja2VyJykuaXMoJzp2aXNpYmxlJykgJiYgb3B0aW9ucy5jbG9zZU9uSW5wdXRDbGljaykpIHtcblx0XHRcdFx0XHRcdHJldHVybjtcblx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0aWYgKCFvcHRpb25zLm9wZW5PbkZvY3VzKSB7XG5cdFx0XHRcdFx0XHRyZXR1cm47XG5cdFx0XHRcdFx0fVxuXHRcdFx0XHRcdGNsZWFyVGltZW91dCh0aW1lcik7XG5cdFx0XHRcdFx0dGltZXIgPSBzZXRUaW1lb3V0KGZ1bmN0aW9uICgpIHtcblx0XHRcdFx0XHRcdGlmIChpbnB1dC5pcygnOmRpc2FibGVkJykpIHtcblx0XHRcdFx0XHRcdFx0cmV0dXJuO1xuXHRcdFx0XHRcdFx0fVxuXG5cdFx0XHRcdFx0XHR0cmlnZ2VyQWZ0ZXJPcGVuID0gdHJ1ZTtcblx0XHRcdFx0XHRcdF94ZHNvZnRfZGF0ZXRpbWUuc2V0Q3VycmVudFRpbWUoZ2V0Q3VycmVudFZhbHVlKCksIHRydWUpO1xuXHRcdFx0XHRcdFx0aWYob3B0aW9ucy5tYXNrKSB7XG5cdFx0XHRcdFx0XHRcdHNldE1hc2sob3B0aW9ucyk7XG5cdFx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0XHRkYXRldGltZXBpY2tlci50cmlnZ2VyKCdvcGVuLnhkc29mdCcpO1xuXHRcdFx0XHRcdH0sIDEwMCk7XG5cdFx0XHRcdH0pXG5cdFx0XHRcdC5vbigna2V5ZG93bi54ZHNvZnQnLCBmdW5jdGlvbiAoZXZlbnQpIHtcblx0XHRcdFx0XHR2YXIgZWxlbWVudFNlbGVjdG9yLFxuXHRcdFx0XHRcdFx0a2V5ID0gZXZlbnQud2hpY2g7XG5cdFx0XHRcdFx0aWYgKFtFTlRFUl0uaW5kZXhPZihrZXkpICE9PSAtMSAmJiBvcHRpb25zLmVudGVyTGlrZVRhYikge1xuXHRcdFx0XHRcdFx0ZWxlbWVudFNlbGVjdG9yID0gJChcImlucHV0OnZpc2libGUsdGV4dGFyZWE6dmlzaWJsZSxidXR0b246dmlzaWJsZSxhOnZpc2libGVcIik7XG5cdFx0XHRcdFx0XHRkYXRldGltZXBpY2tlci50cmlnZ2VyKCdjbG9zZS54ZHNvZnQnKTtcblx0XHRcdFx0XHRcdGVsZW1lbnRTZWxlY3Rvci5lcShlbGVtZW50U2VsZWN0b3IuaW5kZXgodGhpcykgKyAxKS5mb2N1cygpO1xuXHRcdFx0XHRcdFx0cmV0dXJuIGZhbHNlO1xuXHRcdFx0XHRcdH1cblx0XHRcdFx0XHRpZiAoW1RBQl0uaW5kZXhPZihrZXkpICE9PSAtMSkge1xuXHRcdFx0XHRcdFx0ZGF0ZXRpbWVwaWNrZXIudHJpZ2dlcignY2xvc2UueGRzb2Z0Jyk7XG5cdFx0XHRcdFx0XHRyZXR1cm4gdHJ1ZTtcblx0XHRcdFx0XHR9XG5cdFx0XHRcdH0pXG5cdFx0XHRcdC5vbignYmx1ci54ZHNvZnQnLCBmdW5jdGlvbiAoKSB7XG5cdFx0XHRcdFx0ZGF0ZXRpbWVwaWNrZXIudHJpZ2dlcignY2xvc2UueGRzb2Z0Jyk7XG5cdFx0XHRcdH0pO1xuXHRcdH07XG5cdFx0ZGVzdHJveURhdGVUaW1lUGlja2VyID0gZnVuY3Rpb24gKGlucHV0KSB7XG5cdFx0XHR2YXIgZGF0ZXRpbWVwaWNrZXIgPSBpbnB1dC5kYXRhKCd4ZHNvZnRfZGF0ZXRpbWVwaWNrZXInKTtcblx0XHRcdGlmIChkYXRldGltZXBpY2tlcikge1xuXHRcdFx0XHRkYXRldGltZXBpY2tlci5kYXRhKCd4ZHNvZnRfZGF0ZXRpbWUnLCBudWxsKTtcblx0XHRcdFx0ZGF0ZXRpbWVwaWNrZXIucmVtb3ZlKCk7XG5cdFx0XHRcdGlucHV0XG5cdFx0XHRcdFx0LmRhdGEoJ3hkc29mdF9kYXRldGltZXBpY2tlcicsIG51bGwpXG5cdFx0XHRcdFx0Lm9mZignLnhkc29mdCcpO1xuXHRcdFx0XHQkKG9wdGlvbnMuY29udGVudFdpbmRvdykub2ZmKCdyZXNpemUueGRzb2Z0Jyk7XG5cdFx0XHRcdCQoW29wdGlvbnMuY29udGVudFdpbmRvdywgb3B0aW9ucy5vd25lckRvY3VtZW50LmJvZHldKS5vZmYoJ21vdXNlZG93bi54ZHNvZnQgdG91Y2hzdGFydCcpO1xuXHRcdFx0XHRpZiAoaW5wdXQudW5tb3VzZXdoZWVsKSB7XG5cdFx0XHRcdFx0aW5wdXQudW5tb3VzZXdoZWVsKCk7XG5cdFx0XHRcdH1cblx0XHRcdH1cblx0XHR9O1xuXHRcdCQob3B0aW9ucy5vd25lckRvY3VtZW50KVxuICAgICAgICAgICAgLm9mZigna2V5ZG93bi54ZHNvZnRjdHJsIGtleXVwLnhkc29mdGN0cmwnKVxuICAgICAgICAgICAgLm9mZigna2V5ZG93bi54ZHNvZnRjbWQga2V5dXAueGRzb2Z0Y21kJylcblx0XHRcdC5vbigna2V5ZG93bi54ZHNvZnRjdHJsJywgZnVuY3Rpb24gKGUpIHtcblx0XHRcdFx0aWYgKGUua2V5Q29kZSA9PT0gQ1RSTEtFWSkge1xuXHRcdFx0XHRcdGN0cmxEb3duID0gdHJ1ZTtcbiAgICAgICAgICAgICAgICB9XG5cdFx0XHR9KVxuXHRcdFx0Lm9uKCdrZXl1cC54ZHNvZnRjdHJsJywgZnVuY3Rpb24gKGUpIHtcblx0XHRcdFx0aWYgKGUua2V5Q29kZSA9PT0gQ1RSTEtFWSkge1xuXHRcdFx0XHRcdGN0cmxEb3duID0gZmFsc2U7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSlcbiAgICAgICAgICAgIC5vbigna2V5ZG93bi54ZHNvZnRjbWQnLCBmdW5jdGlvbiAoZSkge1xuICAgICAgICAgICAgICAgIGlmIChlLmtleUNvZGUgPT09IENNREtFWSkge1xuICAgICAgICAgICAgICAgICAgICBjbWREb3duID0gdHJ1ZTtcbiAgICAgICAgICAgICAgICB9XG5cdFx0XHR9KVxuXHRcdFx0Lm9uKCdrZXl1cC54ZHNvZnRjbWQnLCBmdW5jdGlvbiAoZSkge1xuICAgICAgICAgICAgICAgIGlmIChlLmtleUNvZGUgPT09IENNREtFWSkge1xuICAgICAgICAgICAgICAgICAgICBjbWREb3duID0gZmFsc2U7XG4gICAgICAgICAgICAgICAgfVxuXHRcdFx0fSk7XG5cblx0XHR0aGlzLmVhY2goZnVuY3Rpb24gKCkge1xuXHRcdFx0dmFyIGRhdGV0aW1lcGlja2VyID0gJCh0aGlzKS5kYXRhKCd4ZHNvZnRfZGF0ZXRpbWVwaWNrZXInKSwgJGlucHV0O1xuXHRcdFx0aWYgKGRhdGV0aW1lcGlja2VyKSB7XG5cdFx0XHRcdGlmICgkLnR5cGUob3B0KSA9PT0gJ3N0cmluZycpIHtcblx0XHRcdFx0XHRzd2l0Y2ggKG9wdCkge1xuXHRcdFx0XHRcdFx0Y2FzZSAnc2hvdyc6XG5cdFx0XHRcdFx0XHRcdCQodGhpcykuc2VsZWN0KCkuZm9jdXMoKTtcblx0XHRcdFx0XHRcdFx0ZGF0ZXRpbWVwaWNrZXIudHJpZ2dlcignb3Blbi54ZHNvZnQnKTtcblx0XHRcdFx0XHRcdFx0YnJlYWs7XG5cdFx0XHRcdFx0XHRjYXNlICdoaWRlJzpcblx0XHRcdFx0XHRcdFx0ZGF0ZXRpbWVwaWNrZXIudHJpZ2dlcignY2xvc2UueGRzb2Z0Jyk7XG5cdFx0XHRcdFx0XHRcdGJyZWFrO1xuXHRcdFx0XHRcdFx0Y2FzZSAndG9nZ2xlJzpcblx0XHRcdFx0XHRcdFx0ZGF0ZXRpbWVwaWNrZXIudHJpZ2dlcigndG9nZ2xlLnhkc29mdCcpO1xuXHRcdFx0XHRcdFx0XHRicmVhaztcblx0XHRcdFx0XHRcdGNhc2UgJ2Rlc3Ryb3knOlxuXHRcdFx0XHRcdFx0XHRkZXN0cm95RGF0ZVRpbWVQaWNrZXIoJCh0aGlzKSk7XG5cdFx0XHRcdFx0XHRcdGJyZWFrO1xuXHRcdFx0XHRcdFx0Y2FzZSAncmVzZXQnOlxuXHRcdFx0XHRcdFx0XHR0aGlzLnZhbHVlID0gdGhpcy5kZWZhdWx0VmFsdWU7XG5cdFx0XHRcdFx0XHRcdGlmICghdGhpcy52YWx1ZSB8fCAhZGF0ZXRpbWVwaWNrZXIuZGF0YSgneGRzb2Z0X2RhdGV0aW1lJykuaXNWYWxpZERhdGUoZGF0ZUhlbHBlci5wYXJzZURhdGUodGhpcy52YWx1ZSwgb3B0aW9ucy5mb3JtYXQpKSkge1xuXHRcdFx0XHRcdFx0XHRcdGRhdGV0aW1lcGlja2VyLmRhdGEoJ2NoYW5nZWQnLCBmYWxzZSk7XG5cdFx0XHRcdFx0XHRcdH1cblx0XHRcdFx0XHRcdFx0ZGF0ZXRpbWVwaWNrZXIuZGF0YSgneGRzb2Z0X2RhdGV0aW1lJykuc2V0Q3VycmVudFRpbWUodGhpcy52YWx1ZSk7XG5cdFx0XHRcdFx0XHRcdGJyZWFrO1xuXHRcdFx0XHRcdFx0Y2FzZSAndmFsaWRhdGUnOlxuXHRcdFx0XHRcdFx0XHQkaW5wdXQgPSBkYXRldGltZXBpY2tlci5kYXRhKCdpbnB1dCcpO1xuXHRcdFx0XHRcdFx0XHQkaW5wdXQudHJpZ2dlcignYmx1ci54ZHNvZnQnKTtcblx0XHRcdFx0XHRcdFx0YnJlYWs7XG5cdFx0XHRcdFx0XHRkZWZhdWx0OlxuXHRcdFx0XHRcdFx0XHRpZiAoZGF0ZXRpbWVwaWNrZXJbb3B0XSAmJiAkLmlzRnVuY3Rpb24oZGF0ZXRpbWVwaWNrZXJbb3B0XSkpIHtcblx0XHRcdFx0XHRcdFx0XHRyZXN1bHQgPSBkYXRldGltZXBpY2tlcltvcHRdKG9wdDIpO1xuXHRcdFx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0fVxuXHRcdFx0XHR9IGVsc2Uge1xuXHRcdFx0XHRcdGRhdGV0aW1lcGlja2VyXG5cdFx0XHRcdFx0XHQuc2V0T3B0aW9ucyhvcHQpO1xuXHRcdFx0XHR9XG5cdFx0XHRcdHJldHVybiAwO1xuXHRcdFx0fVxuXHRcdFx0aWYgKCQudHlwZShvcHQpICE9PSAnc3RyaW5nJykge1xuXHRcdFx0XHRpZiAoIW9wdGlvbnMubGF6eUluaXQgfHwgb3B0aW9ucy5vcGVuIHx8IG9wdGlvbnMuaW5saW5lKSB7XG5cdFx0XHRcdFx0Y3JlYXRlRGF0ZVRpbWVQaWNrZXIoJCh0aGlzKSk7XG5cdFx0XHRcdH0gZWxzZSB7XG5cdFx0XHRcdFx0bGF6eUluaXQoJCh0aGlzKSk7XG5cdFx0XHRcdH1cblx0XHRcdH1cblx0XHR9KTtcblxuXHRcdHJldHVybiByZXN1bHQ7XG5cdH07XG5cblx0JC5mbi5kYXRldGltZXBpY2tlci5kZWZhdWx0cyA9IGRlZmF1bHRfb3B0aW9ucztcblxuXHRmdW5jdGlvbiBIaWdobGlnaHRlZERhdGUoZGF0ZSwgZGVzYywgc3R5bGUpIHtcblx0XHRcInVzZSBzdHJpY3RcIjtcblx0XHR0aGlzLmRhdGUgPSBkYXRlO1xuXHRcdHRoaXMuZGVzYyA9IGRlc2M7XG5cdFx0dGhpcy5zdHlsZSA9IHN0eWxlO1xuXHR9XG59O1xuOyhmdW5jdGlvbiAoZmFjdG9yeSkge1xuXHRpZiAoIHR5cGVvZiBkZWZpbmUgPT09ICdmdW5jdGlvbicgJiYgZGVmaW5lLmFtZCApIHtcblx0XHQvLyBBTUQuIFJlZ2lzdGVyIGFzIGFuIGFub255bW91cyBtb2R1bGUuXG5cdFx0ZGVmaW5lKFsnanF1ZXJ5JywgJ2pxdWVyeS1tb3VzZXdoZWVsJ10sIGZhY3RvcnkpO1xuXHR9IGVsc2UgaWYgKHR5cGVvZiBleHBvcnRzID09PSAnb2JqZWN0Jykge1xuXHRcdC8vIE5vZGUvQ29tbW9uSlMgc3R5bGUgZm9yIEJyb3dzZXJpZnlcblx0XHRtb2R1bGUuZXhwb3J0cyA9IGZhY3RvcnkocmVxdWlyZSgnanF1ZXJ5JykpOztcblx0fSBlbHNlIHtcblx0XHQvLyBCcm93c2VyIGdsb2JhbHNcblx0XHRmYWN0b3J5KGpRdWVyeSk7XG5cdH1cbn0oZGF0ZXRpbWVwaWNrZXJGYWN0b3J5KSk7XG5cblxuLyohXG4gKiBqUXVlcnkgTW91c2V3aGVlbCAzLjEuMTNcbiAqXG4gKiBDb3B5cmlnaHQgalF1ZXJ5IEZvdW5kYXRpb24gYW5kIG90aGVyIGNvbnRyaWJ1dG9yc1xuICogUmVsZWFzZWQgdW5kZXIgdGhlIE1JVCBsaWNlbnNlXG4gKiBodHRwOi8vanF1ZXJ5Lm9yZy9saWNlbnNlXG4gKi9cblxuKGZ1bmN0aW9uIChmYWN0b3J5KSB7XG4gICAgaWYgKCB0eXBlb2YgZGVmaW5lID09PSAnZnVuY3Rpb24nICYmIGRlZmluZS5hbWQgKSB7XG4gICAgICAgIC8vIEFNRC4gUmVnaXN0ZXIgYXMgYW4gYW5vbnltb3VzIG1vZHVsZS5cbiAgICAgICAgZGVmaW5lKFsnanF1ZXJ5J10sIGZhY3RvcnkpO1xuICAgIH0gZWxzZSBpZiAodHlwZW9mIGV4cG9ydHMgPT09ICdvYmplY3QnKSB7XG4gICAgICAgIC8vIE5vZGUvQ29tbW9uSlMgc3R5bGUgZm9yIEJyb3dzZXJpZnlcbiAgICAgICAgbW9kdWxlLmV4cG9ydHMgPSBmYWN0b3J5O1xuICAgIH0gZWxzZSB7XG4gICAgICAgIC8vIEJyb3dzZXIgZ2xvYmFsc1xuICAgICAgICBmYWN0b3J5KGpRdWVyeSk7XG4gICAgfVxufShmdW5jdGlvbiAoJCkge1xuXG4gICAgdmFyIHRvRml4ICA9IFsnd2hlZWwnLCAnbW91c2V3aGVlbCcsICdET01Nb3VzZVNjcm9sbCcsICdNb3pNb3VzZVBpeGVsU2Nyb2xsJ10sXG4gICAgICAgIHRvQmluZCA9ICggJ29ud2hlZWwnIGluIGRvY3VtZW50IHx8IGRvY3VtZW50LmRvY3VtZW50TW9kZSA+PSA5ICkgP1xuICAgICAgICAgICAgICAgICAgICBbJ3doZWVsJ10gOiBbJ21vdXNld2hlZWwnLCAnRG9tTW91c2VTY3JvbGwnLCAnTW96TW91c2VQaXhlbFNjcm9sbCddLFxuICAgICAgICBzbGljZSAgPSBBcnJheS5wcm90b3R5cGUuc2xpY2UsXG4gICAgICAgIG51bGxMb3dlc3REZWx0YVRpbWVvdXQsIGxvd2VzdERlbHRhO1xuXG4gICAgaWYgKCAkLmV2ZW50LmZpeEhvb2tzICkge1xuICAgICAgICBmb3IgKCB2YXIgaSA9IHRvRml4Lmxlbmd0aDsgaTsgKSB7XG4gICAgICAgICAgICAkLmV2ZW50LmZpeEhvb2tzWyB0b0ZpeFstLWldIF0gPSAkLmV2ZW50Lm1vdXNlSG9va3M7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICB2YXIgc3BlY2lhbCA9ICQuZXZlbnQuc3BlY2lhbC5tb3VzZXdoZWVsID0ge1xuICAgICAgICB2ZXJzaW9uOiAnMy4xLjEyJyxcblxuICAgICAgICBzZXR1cDogZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICBpZiAoIHRoaXMuYWRkRXZlbnRMaXN0ZW5lciApIHtcbiAgICAgICAgICAgICAgICBmb3IgKCB2YXIgaSA9IHRvQmluZC5sZW5ndGg7IGk7ICkge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLmFkZEV2ZW50TGlzdGVuZXIoIHRvQmluZFstLWldLCBoYW5kbGVyLCBmYWxzZSApO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgdGhpcy5vbm1vdXNld2hlZWwgPSBoYW5kbGVyO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgLy8gU3RvcmUgdGhlIGxpbmUgaGVpZ2h0IGFuZCBwYWdlIGhlaWdodCBmb3IgdGhpcyBwYXJ0aWN1bGFyIGVsZW1lbnRcbiAgICAgICAgICAgICQuZGF0YSh0aGlzLCAnbW91c2V3aGVlbC1saW5lLWhlaWdodCcsIHNwZWNpYWwuZ2V0TGluZUhlaWdodCh0aGlzKSk7XG4gICAgICAgICAgICAkLmRhdGEodGhpcywgJ21vdXNld2hlZWwtcGFnZS1oZWlnaHQnLCBzcGVjaWFsLmdldFBhZ2VIZWlnaHQodGhpcykpO1xuICAgICAgICB9LFxuXG4gICAgICAgIHRlYXJkb3duOiBmdW5jdGlvbigpIHtcbiAgICAgICAgICAgIGlmICggdGhpcy5yZW1vdmVFdmVudExpc3RlbmVyICkge1xuICAgICAgICAgICAgICAgIGZvciAoIHZhciBpID0gdG9CaW5kLmxlbmd0aDsgaTsgKSB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMucmVtb3ZlRXZlbnRMaXN0ZW5lciggdG9CaW5kWy0taV0sIGhhbmRsZXIsIGZhbHNlICk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICB0aGlzLm9ubW91c2V3aGVlbCA9IG51bGw7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICAvLyBDbGVhbiB1cCB0aGUgZGF0YSB3ZSBhZGRlZCB0byB0aGUgZWxlbWVudFxuICAgICAgICAgICAgJC5yZW1vdmVEYXRhKHRoaXMsICdtb3VzZXdoZWVsLWxpbmUtaGVpZ2h0Jyk7XG4gICAgICAgICAgICAkLnJlbW92ZURhdGEodGhpcywgJ21vdXNld2hlZWwtcGFnZS1oZWlnaHQnKTtcbiAgICAgICAgfSxcblxuICAgICAgICBnZXRMaW5lSGVpZ2h0OiBmdW5jdGlvbihlbGVtKSB7XG4gICAgICAgICAgICB2YXIgJGVsZW0gPSAkKGVsZW0pLFxuICAgICAgICAgICAgICAgICRwYXJlbnQgPSAkZWxlbVsnb2Zmc2V0UGFyZW50JyBpbiAkLmZuID8gJ29mZnNldFBhcmVudCcgOiAncGFyZW50J10oKTtcbiAgICAgICAgICAgIGlmICghJHBhcmVudC5sZW5ndGgpIHtcbiAgICAgICAgICAgICAgICAkcGFyZW50ID0gJCgnYm9keScpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgcmV0dXJuIHBhcnNlSW50KCRwYXJlbnQuY3NzKCdmb250U2l6ZScpLCAxMCkgfHwgcGFyc2VJbnQoJGVsZW0uY3NzKCdmb250U2l6ZScpLCAxMCkgfHwgMTY7XG4gICAgICAgIH0sXG5cbiAgICAgICAgZ2V0UGFnZUhlaWdodDogZnVuY3Rpb24oZWxlbSkge1xuICAgICAgICAgICAgcmV0dXJuICQoZWxlbSkuaGVpZ2h0KCk7XG4gICAgICAgIH0sXG5cbiAgICAgICAgc2V0dGluZ3M6IHtcbiAgICAgICAgICAgIGFkanVzdE9sZERlbHRhczogdHJ1ZSwgLy8gc2VlIHNob3VsZEFkanVzdE9sZERlbHRhcygpIGJlbG93XG4gICAgICAgICAgICBub3JtYWxpemVPZmZzZXQ6IHRydWUgIC8vIGNhbGxzIGdldEJvdW5kaW5nQ2xpZW50UmVjdCBmb3IgZWFjaCBldmVudFxuICAgICAgICB9XG4gICAgfTtcblxuICAgICQuZm4uZXh0ZW5kKHtcbiAgICAgICAgbW91c2V3aGVlbDogZnVuY3Rpb24oZm4pIHtcbiAgICAgICAgICAgIHJldHVybiBmbiA/IHRoaXMuYmluZCgnbW91c2V3aGVlbCcsIGZuKSA6IHRoaXMudHJpZ2dlcignbW91c2V3aGVlbCcpO1xuICAgICAgICB9LFxuXG4gICAgICAgIHVubW91c2V3aGVlbDogZnVuY3Rpb24oZm4pIHtcbiAgICAgICAgICAgIHJldHVybiB0aGlzLnVuYmluZCgnbW91c2V3aGVlbCcsIGZuKTtcbiAgICAgICAgfVxuICAgIH0pO1xuXG5cbiAgICBmdW5jdGlvbiBoYW5kbGVyKGV2ZW50KSB7XG4gICAgICAgIHZhciBvcmdFdmVudCAgID0gZXZlbnQgfHwgd2luZG93LmV2ZW50LFxuICAgICAgICAgICAgYXJncyAgICAgICA9IHNsaWNlLmNhbGwoYXJndW1lbnRzLCAxKSxcbiAgICAgICAgICAgIGRlbHRhICAgICAgPSAwLFxuICAgICAgICAgICAgZGVsdGFYICAgICA9IDAsXG4gICAgICAgICAgICBkZWx0YVkgICAgID0gMCxcbiAgICAgICAgICAgIGFic0RlbHRhICAgPSAwLFxuICAgICAgICAgICAgb2Zmc2V0WCAgICA9IDAsXG4gICAgICAgICAgICBvZmZzZXRZICAgID0gMDtcbiAgICAgICAgZXZlbnQgPSAkLmV2ZW50LmZpeChvcmdFdmVudCk7XG4gICAgICAgIGV2ZW50LnR5cGUgPSAnbW91c2V3aGVlbCc7XG5cbiAgICAgICAgLy8gT2xkIHNjaG9vbCBzY3JvbGx3aGVlbCBkZWx0YVxuICAgICAgICBpZiAoICdkZXRhaWwnICAgICAgaW4gb3JnRXZlbnQgKSB7IGRlbHRhWSA9IG9yZ0V2ZW50LmRldGFpbCAqIC0xOyAgICAgIH1cbiAgICAgICAgaWYgKCAnd2hlZWxEZWx0YScgIGluIG9yZ0V2ZW50ICkgeyBkZWx0YVkgPSBvcmdFdmVudC53aGVlbERlbHRhOyAgICAgICB9XG4gICAgICAgIGlmICggJ3doZWVsRGVsdGFZJyBpbiBvcmdFdmVudCApIHsgZGVsdGFZID0gb3JnRXZlbnQud2hlZWxEZWx0YVk7ICAgICAgfVxuICAgICAgICBpZiAoICd3aGVlbERlbHRhWCcgaW4gb3JnRXZlbnQgKSB7IGRlbHRhWCA9IG9yZ0V2ZW50LndoZWVsRGVsdGFYICogLTE7IH1cblxuICAgICAgICAvLyBGaXJlZm94IDwgMTcgaG9yaXpvbnRhbCBzY3JvbGxpbmcgcmVsYXRlZCB0byBET01Nb3VzZVNjcm9sbCBldmVudFxuICAgICAgICBpZiAoICdheGlzJyBpbiBvcmdFdmVudCAmJiBvcmdFdmVudC5heGlzID09PSBvcmdFdmVudC5IT1JJWk9OVEFMX0FYSVMgKSB7XG4gICAgICAgICAgICBkZWx0YVggPSBkZWx0YVkgKiAtMTtcbiAgICAgICAgICAgIGRlbHRhWSA9IDA7XG4gICAgICAgIH1cblxuICAgICAgICAvLyBTZXQgZGVsdGEgdG8gYmUgZGVsdGFZIG9yIGRlbHRhWCBpZiBkZWx0YVkgaXMgMCBmb3IgYmFja3dhcmRzIGNvbXBhdGFiaWxpdGl5XG4gICAgICAgIGRlbHRhID0gZGVsdGFZID09PSAwID8gZGVsdGFYIDogZGVsdGFZO1xuXG4gICAgICAgIC8vIE5ldyBzY2hvb2wgd2hlZWwgZGVsdGEgKHdoZWVsIGV2ZW50KVxuICAgICAgICBpZiAoICdkZWx0YVknIGluIG9yZ0V2ZW50ICkge1xuICAgICAgICAgICAgZGVsdGFZID0gb3JnRXZlbnQuZGVsdGFZICogLTE7XG4gICAgICAgICAgICBkZWx0YSAgPSBkZWx0YVk7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKCAnZGVsdGFYJyBpbiBvcmdFdmVudCApIHtcbiAgICAgICAgICAgIGRlbHRhWCA9IG9yZ0V2ZW50LmRlbHRhWDtcbiAgICAgICAgICAgIGlmICggZGVsdGFZID09PSAwICkgeyBkZWx0YSAgPSBkZWx0YVggKiAtMTsgfVxuICAgICAgICB9XG5cbiAgICAgICAgLy8gTm8gY2hhbmdlIGFjdHVhbGx5IGhhcHBlbmVkLCBubyByZWFzb24gdG8gZ28gYW55IGZ1cnRoZXJcbiAgICAgICAgaWYgKCBkZWx0YVkgPT09IDAgJiYgZGVsdGFYID09PSAwICkgeyByZXR1cm47IH1cblxuICAgICAgICAvLyBOZWVkIHRvIGNvbnZlcnQgbGluZXMgYW5kIHBhZ2VzIHRvIHBpeGVscyBpZiB3ZSBhcmVuJ3QgYWxyZWFkeSBpbiBwaXhlbHNcbiAgICAgICAgLy8gVGhlcmUgYXJlIHRocmVlIGRlbHRhIG1vZGVzOlxuICAgICAgICAvLyAgICogZGVsdGFNb2RlIDAgaXMgYnkgcGl4ZWxzLCBub3RoaW5nIHRvIGRvXG4gICAgICAgIC8vICAgKiBkZWx0YU1vZGUgMSBpcyBieSBsaW5lc1xuICAgICAgICAvLyAgICogZGVsdGFNb2RlIDIgaXMgYnkgcGFnZXNcbiAgICAgICAgaWYgKCBvcmdFdmVudC5kZWx0YU1vZGUgPT09IDEgKSB7XG4gICAgICAgICAgICB2YXIgbGluZUhlaWdodCA9ICQuZGF0YSh0aGlzLCAnbW91c2V3aGVlbC1saW5lLWhlaWdodCcpO1xuICAgICAgICAgICAgZGVsdGEgICo9IGxpbmVIZWlnaHQ7XG4gICAgICAgICAgICBkZWx0YVkgKj0gbGluZUhlaWdodDtcbiAgICAgICAgICAgIGRlbHRhWCAqPSBsaW5lSGVpZ2h0O1xuICAgICAgICB9IGVsc2UgaWYgKCBvcmdFdmVudC5kZWx0YU1vZGUgPT09IDIgKSB7XG4gICAgICAgICAgICB2YXIgcGFnZUhlaWdodCA9ICQuZGF0YSh0aGlzLCAnbW91c2V3aGVlbC1wYWdlLWhlaWdodCcpO1xuICAgICAgICAgICAgZGVsdGEgICo9IHBhZ2VIZWlnaHQ7XG4gICAgICAgICAgICBkZWx0YVkgKj0gcGFnZUhlaWdodDtcbiAgICAgICAgICAgIGRlbHRhWCAqPSBwYWdlSGVpZ2h0O1xuICAgICAgICB9XG5cbiAgICAgICAgLy8gU3RvcmUgbG93ZXN0IGFic29sdXRlIGRlbHRhIHRvIG5vcm1hbGl6ZSB0aGUgZGVsdGEgdmFsdWVzXG4gICAgICAgIGFic0RlbHRhID0gTWF0aC5tYXgoIE1hdGguYWJzKGRlbHRhWSksIE1hdGguYWJzKGRlbHRhWCkgKTtcblxuICAgICAgICBpZiAoICFsb3dlc3REZWx0YSB8fCBhYnNEZWx0YSA8IGxvd2VzdERlbHRhICkge1xuICAgICAgICAgICAgbG93ZXN0RGVsdGEgPSBhYnNEZWx0YTtcblxuICAgICAgICAgICAgLy8gQWRqdXN0IG9sZGVyIGRlbHRhcyBpZiBuZWNlc3NhcnlcbiAgICAgICAgICAgIGlmICggc2hvdWxkQWRqdXN0T2xkRGVsdGFzKG9yZ0V2ZW50LCBhYnNEZWx0YSkgKSB7XG4gICAgICAgICAgICAgICAgbG93ZXN0RGVsdGEgLz0gNDA7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICAvLyBBZGp1c3Qgb2xkZXIgZGVsdGFzIGlmIG5lY2Vzc2FyeVxuICAgICAgICBpZiAoIHNob3VsZEFkanVzdE9sZERlbHRhcyhvcmdFdmVudCwgYWJzRGVsdGEpICkge1xuICAgICAgICAgICAgLy8gRGl2aWRlIGFsbCB0aGUgdGhpbmdzIGJ5IDQwIVxuICAgICAgICAgICAgZGVsdGEgIC89IDQwO1xuICAgICAgICAgICAgZGVsdGFYIC89IDQwO1xuICAgICAgICAgICAgZGVsdGFZIC89IDQwO1xuICAgICAgICB9XG5cbiAgICAgICAgLy8gR2V0IGEgd2hvbGUsIG5vcm1hbGl6ZWQgdmFsdWUgZm9yIHRoZSBkZWx0YXNcbiAgICAgICAgZGVsdGEgID0gTWF0aFsgZGVsdGEgID49IDEgPyAnZmxvb3InIDogJ2NlaWwnIF0oZGVsdGEgIC8gbG93ZXN0RGVsdGEpO1xuICAgICAgICBkZWx0YVggPSBNYXRoWyBkZWx0YVggPj0gMSA/ICdmbG9vcicgOiAnY2VpbCcgXShkZWx0YVggLyBsb3dlc3REZWx0YSk7XG4gICAgICAgIGRlbHRhWSA9IE1hdGhbIGRlbHRhWSA+PSAxID8gJ2Zsb29yJyA6ICdjZWlsJyBdKGRlbHRhWSAvIGxvd2VzdERlbHRhKTtcblxuICAgICAgICAvLyBOb3JtYWxpc2Ugb2Zmc2V0WCBhbmQgb2Zmc2V0WSBwcm9wZXJ0aWVzXG4gICAgICAgIGlmICggc3BlY2lhbC5zZXR0aW5ncy5ub3JtYWxpemVPZmZzZXQgJiYgdGhpcy5nZXRCb3VuZGluZ0NsaWVudFJlY3QgKSB7XG4gICAgICAgICAgICB2YXIgYm91bmRpbmdSZWN0ID0gdGhpcy5nZXRCb3VuZGluZ0NsaWVudFJlY3QoKTtcbiAgICAgICAgICAgIG9mZnNldFggPSBldmVudC5jbGllbnRYIC0gYm91bmRpbmdSZWN0LmxlZnQ7XG4gICAgICAgICAgICBvZmZzZXRZID0gZXZlbnQuY2xpZW50WSAtIGJvdW5kaW5nUmVjdC50b3A7XG4gICAgICAgIH1cblxuICAgICAgICAvLyBBZGQgaW5mb3JtYXRpb24gdG8gdGhlIGV2ZW50IG9iamVjdFxuICAgICAgICBldmVudC5kZWx0YVggPSBkZWx0YVg7XG4gICAgICAgIGV2ZW50LmRlbHRhWSA9IGRlbHRhWTtcbiAgICAgICAgZXZlbnQuZGVsdGFGYWN0b3IgPSBsb3dlc3REZWx0YTtcbiAgICAgICAgZXZlbnQub2Zmc2V0WCA9IG9mZnNldFg7XG4gICAgICAgIGV2ZW50Lm9mZnNldFkgPSBvZmZzZXRZO1xuICAgICAgICAvLyBHbyBhaGVhZCBhbmQgc2V0IGRlbHRhTW9kZSB0byAwIHNpbmNlIHdlIGNvbnZlcnRlZCB0byBwaXhlbHNcbiAgICAgICAgLy8gQWx0aG91Z2ggdGhpcyBpcyBhIGxpdHRsZSBvZGQgc2luY2Ugd2Ugb3ZlcndyaXRlIHRoZSBkZWx0YVgvWVxuICAgICAgICAvLyBwcm9wZXJ0aWVzIHdpdGggbm9ybWFsaXplZCBkZWx0YXMuXG4gICAgICAgIGV2ZW50LmRlbHRhTW9kZSA9IDA7XG5cbiAgICAgICAgLy8gQWRkIGV2ZW50IGFuZCBkZWx0YSB0byB0aGUgZnJvbnQgb2YgdGhlIGFyZ3VtZW50c1xuICAgICAgICBhcmdzLnVuc2hpZnQoZXZlbnQsIGRlbHRhLCBkZWx0YVgsIGRlbHRhWSk7XG5cbiAgICAgICAgLy8gQ2xlYXJvdXQgbG93ZXN0RGVsdGEgYWZ0ZXIgc29tZXRpbWUgdG8gYmV0dGVyXG4gICAgICAgIC8vIGhhbmRsZSBtdWx0aXBsZSBkZXZpY2UgdHlwZXMgdGhhdCBnaXZlIGRpZmZlcmVudFxuICAgICAgICAvLyBhIGRpZmZlcmVudCBsb3dlc3REZWx0YVxuICAgICAgICAvLyBFeDogdHJhY2twYWQgPSAzIGFuZCBtb3VzZSB3aGVlbCA9IDEyMFxuICAgICAgICBpZiAobnVsbExvd2VzdERlbHRhVGltZW91dCkgeyBjbGVhclRpbWVvdXQobnVsbExvd2VzdERlbHRhVGltZW91dCk7IH1cbiAgICAgICAgbnVsbExvd2VzdERlbHRhVGltZW91dCA9IHNldFRpbWVvdXQobnVsbExvd2VzdERlbHRhLCAyMDApO1xuXG4gICAgICAgIHJldHVybiAoJC5ldmVudC5kaXNwYXRjaCB8fCAkLmV2ZW50LmhhbmRsZSkuYXBwbHkodGhpcywgYXJncyk7XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gbnVsbExvd2VzdERlbHRhKCkge1xuICAgICAgICBsb3dlc3REZWx0YSA9IG51bGw7XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gc2hvdWxkQWRqdXN0T2xkRGVsdGFzKG9yZ0V2ZW50LCBhYnNEZWx0YSkge1xuICAgICAgICAvLyBJZiB0aGlzIGlzIGFuIG9sZGVyIGV2ZW50IGFuZCB0aGUgZGVsdGEgaXMgZGl2aXNhYmxlIGJ5IDEyMCxcbiAgICAgICAgLy8gdGhlbiB3ZSBhcmUgYXNzdW1pbmcgdGhhdCB0aGUgYnJvd3NlciBpcyB0cmVhdGluZyB0aGlzIGFzIGFuXG4gICAgICAgIC8vIG9sZGVyIG1vdXNlIHdoZWVsIGV2ZW50IGFuZCB0aGF0IHdlIHNob3VsZCBkaXZpZGUgdGhlIGRlbHRhc1xuICAgICAgICAvLyBieSA0MCB0byB0cnkgYW5kIGdldCBhIG1vcmUgdXNhYmxlIGRlbHRhRmFjdG9yLlxuICAgICAgICAvLyBTaWRlIG5vdGUsIHRoaXMgYWN0dWFsbHkgaW1wYWN0cyB0aGUgcmVwb3J0ZWQgc2Nyb2xsIGRpc3RhbmNlXG4gICAgICAgIC8vIGluIG9sZGVyIGJyb3dzZXJzIGFuZCBjYW4gY2F1c2Ugc2Nyb2xsaW5nIHRvIGJlIHNsb3dlciB0aGFuIG5hdGl2ZS5cbiAgICAgICAgLy8gVHVybiB0aGlzIG9mZiBieSBzZXR0aW5nICQuZXZlbnQuc3BlY2lhbC5tb3VzZXdoZWVsLnNldHRpbmdzLmFkanVzdE9sZERlbHRhcyB0byBmYWxzZS5cbiAgICAgICAgcmV0dXJuIHNwZWNpYWwuc2V0dGluZ3MuYWRqdXN0T2xkRGVsdGFzICYmIG9yZ0V2ZW50LnR5cGUgPT09ICdtb3VzZXdoZWVsJyAmJiBhYnNEZWx0YSAlIDEyMCA9PT0gMDtcbiAgICB9XG5cbn0pKTtcbiIsIi8qIVxuICogalF1ZXJ5IE1vdXNld2hlZWwgMy4xLjEzXG4gKlxuICogQ29weXJpZ2h0IGpRdWVyeSBGb3VuZGF0aW9uIGFuZCBvdGhlciBjb250cmlidXRvcnNcbiAqIFJlbGVhc2VkIHVuZGVyIHRoZSBNSVQgbGljZW5zZVxuICogaHR0cDovL2pxdWVyeS5vcmcvbGljZW5zZVxuICovXG5cbihmdW5jdGlvbiAoZmFjdG9yeSkge1xuICAgIGlmICggdHlwZW9mIGRlZmluZSA9PT0gJ2Z1bmN0aW9uJyAmJiBkZWZpbmUuYW1kICkge1xuICAgICAgICAvLyBBTUQuIFJlZ2lzdGVyIGFzIGFuIGFub255bW91cyBtb2R1bGUuXG4gICAgICAgIGRlZmluZShbJ2pxdWVyeSddLCBmYWN0b3J5KTtcbiAgICB9IGVsc2UgaWYgKHR5cGVvZiBleHBvcnRzID09PSAnb2JqZWN0Jykge1xuICAgICAgICAvLyBOb2RlL0NvbW1vbkpTIHN0eWxlIGZvciBCcm93c2VyaWZ5XG4gICAgICAgIG1vZHVsZS5leHBvcnRzID0gZmFjdG9yeTtcbiAgICB9IGVsc2Uge1xuICAgICAgICAvLyBCcm93c2VyIGdsb2JhbHNcbiAgICAgICAgZmFjdG9yeShqUXVlcnkpO1xuICAgIH1cbn0oZnVuY3Rpb24gKCQpIHtcblxuICAgIHZhciB0b0ZpeCAgPSBbJ3doZWVsJywgJ21vdXNld2hlZWwnLCAnRE9NTW91c2VTY3JvbGwnLCAnTW96TW91c2VQaXhlbFNjcm9sbCddLFxuICAgICAgICB0b0JpbmQgPSAoICdvbndoZWVsJyBpbiBkb2N1bWVudCB8fCBkb2N1bWVudC5kb2N1bWVudE1vZGUgPj0gOSApID9cbiAgICAgICAgICAgICAgICAgICAgWyd3aGVlbCddIDogWydtb3VzZXdoZWVsJywgJ0RvbU1vdXNlU2Nyb2xsJywgJ01vek1vdXNlUGl4ZWxTY3JvbGwnXSxcbiAgICAgICAgc2xpY2UgID0gQXJyYXkucHJvdG90eXBlLnNsaWNlLFxuICAgICAgICBudWxsTG93ZXN0RGVsdGFUaW1lb3V0LCBsb3dlc3REZWx0YTtcblxuICAgIGlmICggJC5ldmVudC5maXhIb29rcyApIHtcbiAgICAgICAgZm9yICggdmFyIGkgPSB0b0ZpeC5sZW5ndGg7IGk7ICkge1xuICAgICAgICAgICAgJC5ldmVudC5maXhIb29rc1sgdG9GaXhbLS1pXSBdID0gJC5ldmVudC5tb3VzZUhvb2tzO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgdmFyIHNwZWNpYWwgPSAkLmV2ZW50LnNwZWNpYWwubW91c2V3aGVlbCA9IHtcbiAgICAgICAgdmVyc2lvbjogJzMuMS4xMicsXG5cbiAgICAgICAgc2V0dXA6IGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgaWYgKCB0aGlzLmFkZEV2ZW50TGlzdGVuZXIgKSB7XG4gICAgICAgICAgICAgICAgZm9yICggdmFyIGkgPSB0b0JpbmQubGVuZ3RoOyBpOyApIHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5hZGRFdmVudExpc3RlbmVyKCB0b0JpbmRbLS1pXSwgaGFuZGxlciwgZmFsc2UgKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIHRoaXMub25tb3VzZXdoZWVsID0gaGFuZGxlcjtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIC8vIFN0b3JlIHRoZSBsaW5lIGhlaWdodCBhbmQgcGFnZSBoZWlnaHQgZm9yIHRoaXMgcGFydGljdWxhciBlbGVtZW50XG4gICAgICAgICAgICAkLmRhdGEodGhpcywgJ21vdXNld2hlZWwtbGluZS1oZWlnaHQnLCBzcGVjaWFsLmdldExpbmVIZWlnaHQodGhpcykpO1xuICAgICAgICAgICAgJC5kYXRhKHRoaXMsICdtb3VzZXdoZWVsLXBhZ2UtaGVpZ2h0Jywgc3BlY2lhbC5nZXRQYWdlSGVpZ2h0KHRoaXMpKTtcbiAgICAgICAgfSxcblxuICAgICAgICB0ZWFyZG93bjogZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICBpZiAoIHRoaXMucmVtb3ZlRXZlbnRMaXN0ZW5lciApIHtcbiAgICAgICAgICAgICAgICBmb3IgKCB2YXIgaSA9IHRvQmluZC5sZW5ndGg7IGk7ICkge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLnJlbW92ZUV2ZW50TGlzdGVuZXIoIHRvQmluZFstLWldLCBoYW5kbGVyLCBmYWxzZSApO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgdGhpcy5vbm1vdXNld2hlZWwgPSBudWxsO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgLy8gQ2xlYW4gdXAgdGhlIGRhdGEgd2UgYWRkZWQgdG8gdGhlIGVsZW1lbnRcbiAgICAgICAgICAgICQucmVtb3ZlRGF0YSh0aGlzLCAnbW91c2V3aGVlbC1saW5lLWhlaWdodCcpO1xuICAgICAgICAgICAgJC5yZW1vdmVEYXRhKHRoaXMsICdtb3VzZXdoZWVsLXBhZ2UtaGVpZ2h0Jyk7XG4gICAgICAgIH0sXG5cbiAgICAgICAgZ2V0TGluZUhlaWdodDogZnVuY3Rpb24oZWxlbSkge1xuICAgICAgICAgICAgdmFyICRlbGVtID0gJChlbGVtKSxcbiAgICAgICAgICAgICAgICAkcGFyZW50ID0gJGVsZW1bJ29mZnNldFBhcmVudCcgaW4gJC5mbiA/ICdvZmZzZXRQYXJlbnQnIDogJ3BhcmVudCddKCk7XG4gICAgICAgICAgICBpZiAoISRwYXJlbnQubGVuZ3RoKSB7XG4gICAgICAgICAgICAgICAgJHBhcmVudCA9ICQoJ2JvZHknKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHJldHVybiBwYXJzZUludCgkcGFyZW50LmNzcygnZm9udFNpemUnKSwgMTApIHx8IHBhcnNlSW50KCRlbGVtLmNzcygnZm9udFNpemUnKSwgMTApIHx8IDE2O1xuICAgICAgICB9LFxuXG4gICAgICAgIGdldFBhZ2VIZWlnaHQ6IGZ1bmN0aW9uKGVsZW0pIHtcbiAgICAgICAgICAgIHJldHVybiAkKGVsZW0pLmhlaWdodCgpO1xuICAgICAgICB9LFxuXG4gICAgICAgIHNldHRpbmdzOiB7XG4gICAgICAgICAgICBhZGp1c3RPbGREZWx0YXM6IHRydWUsIC8vIHNlZSBzaG91bGRBZGp1c3RPbGREZWx0YXMoKSBiZWxvd1xuICAgICAgICAgICAgbm9ybWFsaXplT2Zmc2V0OiB0cnVlICAvLyBjYWxscyBnZXRCb3VuZGluZ0NsaWVudFJlY3QgZm9yIGVhY2ggZXZlbnRcbiAgICAgICAgfVxuICAgIH07XG5cbiAgICAkLmZuLmV4dGVuZCh7XG4gICAgICAgIG1vdXNld2hlZWw6IGZ1bmN0aW9uKGZuKSB7XG4gICAgICAgICAgICByZXR1cm4gZm4gPyB0aGlzLmJpbmQoJ21vdXNld2hlZWwnLCBmbikgOiB0aGlzLnRyaWdnZXIoJ21vdXNld2hlZWwnKTtcbiAgICAgICAgfSxcblxuICAgICAgICB1bm1vdXNld2hlZWw6IGZ1bmN0aW9uKGZuKSB7XG4gICAgICAgICAgICByZXR1cm4gdGhpcy51bmJpbmQoJ21vdXNld2hlZWwnLCBmbik7XG4gICAgICAgIH1cbiAgICB9KTtcblxuXG4gICAgZnVuY3Rpb24gaGFuZGxlcihldmVudCkge1xuICAgICAgICB2YXIgb3JnRXZlbnQgICA9IGV2ZW50IHx8IHdpbmRvdy5ldmVudCxcbiAgICAgICAgICAgIGFyZ3MgICAgICAgPSBzbGljZS5jYWxsKGFyZ3VtZW50cywgMSksXG4gICAgICAgICAgICBkZWx0YSAgICAgID0gMCxcbiAgICAgICAgICAgIGRlbHRhWCAgICAgPSAwLFxuICAgICAgICAgICAgZGVsdGFZICAgICA9IDAsXG4gICAgICAgICAgICBhYnNEZWx0YSAgID0gMCxcbiAgICAgICAgICAgIG9mZnNldFggICAgPSAwLFxuICAgICAgICAgICAgb2Zmc2V0WSAgICA9IDA7XG4gICAgICAgIGV2ZW50ID0gJC5ldmVudC5maXgob3JnRXZlbnQpO1xuICAgICAgICBldmVudC50eXBlID0gJ21vdXNld2hlZWwnO1xuXG4gICAgICAgIC8vIE9sZCBzY2hvb2wgc2Nyb2xsd2hlZWwgZGVsdGFcbiAgICAgICAgaWYgKCAnZGV0YWlsJyAgICAgIGluIG9yZ0V2ZW50ICkgeyBkZWx0YVkgPSBvcmdFdmVudC5kZXRhaWwgKiAtMTsgICAgICB9XG4gICAgICAgIGlmICggJ3doZWVsRGVsdGEnICBpbiBvcmdFdmVudCApIHsgZGVsdGFZID0gb3JnRXZlbnQud2hlZWxEZWx0YTsgICAgICAgfVxuICAgICAgICBpZiAoICd3aGVlbERlbHRhWScgaW4gb3JnRXZlbnQgKSB7IGRlbHRhWSA9IG9yZ0V2ZW50LndoZWVsRGVsdGFZOyAgICAgIH1cbiAgICAgICAgaWYgKCAnd2hlZWxEZWx0YVgnIGluIG9yZ0V2ZW50ICkgeyBkZWx0YVggPSBvcmdFdmVudC53aGVlbERlbHRhWCAqIC0xOyB9XG5cbiAgICAgICAgLy8gRmlyZWZveCA8IDE3IGhvcml6b250YWwgc2Nyb2xsaW5nIHJlbGF0ZWQgdG8gRE9NTW91c2VTY3JvbGwgZXZlbnRcbiAgICAgICAgaWYgKCAnYXhpcycgaW4gb3JnRXZlbnQgJiYgb3JnRXZlbnQuYXhpcyA9PT0gb3JnRXZlbnQuSE9SSVpPTlRBTF9BWElTICkge1xuICAgICAgICAgICAgZGVsdGFYID0gZGVsdGFZICogLTE7XG4gICAgICAgICAgICBkZWx0YVkgPSAwO1xuICAgICAgICB9XG5cbiAgICAgICAgLy8gU2V0IGRlbHRhIHRvIGJlIGRlbHRhWSBvciBkZWx0YVggaWYgZGVsdGFZIGlzIDAgZm9yIGJhY2t3YXJkcyBjb21wYXRhYmlsaXRpeVxuICAgICAgICBkZWx0YSA9IGRlbHRhWSA9PT0gMCA/IGRlbHRhWCA6IGRlbHRhWTtcblxuICAgICAgICAvLyBOZXcgc2Nob29sIHdoZWVsIGRlbHRhICh3aGVlbCBldmVudClcbiAgICAgICAgaWYgKCAnZGVsdGFZJyBpbiBvcmdFdmVudCApIHtcbiAgICAgICAgICAgIGRlbHRhWSA9IG9yZ0V2ZW50LmRlbHRhWSAqIC0xO1xuICAgICAgICAgICAgZGVsdGEgID0gZGVsdGFZO1xuICAgICAgICB9XG4gICAgICAgIGlmICggJ2RlbHRhWCcgaW4gb3JnRXZlbnQgKSB7XG4gICAgICAgICAgICBkZWx0YVggPSBvcmdFdmVudC5kZWx0YVg7XG4gICAgICAgICAgICBpZiAoIGRlbHRhWSA9PT0gMCApIHsgZGVsdGEgID0gZGVsdGFYICogLTE7IH1cbiAgICAgICAgfVxuXG4gICAgICAgIC8vIE5vIGNoYW5nZSBhY3R1YWxseSBoYXBwZW5lZCwgbm8gcmVhc29uIHRvIGdvIGFueSBmdXJ0aGVyXG4gICAgICAgIGlmICggZGVsdGFZID09PSAwICYmIGRlbHRhWCA9PT0gMCApIHsgcmV0dXJuOyB9XG5cbiAgICAgICAgLy8gTmVlZCB0byBjb252ZXJ0IGxpbmVzIGFuZCBwYWdlcyB0byBwaXhlbHMgaWYgd2UgYXJlbid0IGFscmVhZHkgaW4gcGl4ZWxzXG4gICAgICAgIC8vIFRoZXJlIGFyZSB0aHJlZSBkZWx0YSBtb2RlczpcbiAgICAgICAgLy8gICAqIGRlbHRhTW9kZSAwIGlzIGJ5IHBpeGVscywgbm90aGluZyB0byBkb1xuICAgICAgICAvLyAgICogZGVsdGFNb2RlIDEgaXMgYnkgbGluZXNcbiAgICAgICAgLy8gICAqIGRlbHRhTW9kZSAyIGlzIGJ5IHBhZ2VzXG4gICAgICAgIGlmICggb3JnRXZlbnQuZGVsdGFNb2RlID09PSAxICkge1xuICAgICAgICAgICAgdmFyIGxpbmVIZWlnaHQgPSAkLmRhdGEodGhpcywgJ21vdXNld2hlZWwtbGluZS1oZWlnaHQnKTtcbiAgICAgICAgICAgIGRlbHRhICAqPSBsaW5lSGVpZ2h0O1xuICAgICAgICAgICAgZGVsdGFZICo9IGxpbmVIZWlnaHQ7XG4gICAgICAgICAgICBkZWx0YVggKj0gbGluZUhlaWdodDtcbiAgICAgICAgfSBlbHNlIGlmICggb3JnRXZlbnQuZGVsdGFNb2RlID09PSAyICkge1xuICAgICAgICAgICAgdmFyIHBhZ2VIZWlnaHQgPSAkLmRhdGEodGhpcywgJ21vdXNld2hlZWwtcGFnZS1oZWlnaHQnKTtcbiAgICAgICAgICAgIGRlbHRhICAqPSBwYWdlSGVpZ2h0O1xuICAgICAgICAgICAgZGVsdGFZICo9IHBhZ2VIZWlnaHQ7XG4gICAgICAgICAgICBkZWx0YVggKj0gcGFnZUhlaWdodDtcbiAgICAgICAgfVxuXG4gICAgICAgIC8vIFN0b3JlIGxvd2VzdCBhYnNvbHV0ZSBkZWx0YSB0byBub3JtYWxpemUgdGhlIGRlbHRhIHZhbHVlc1xuICAgICAgICBhYnNEZWx0YSA9IE1hdGgubWF4KCBNYXRoLmFicyhkZWx0YVkpLCBNYXRoLmFicyhkZWx0YVgpICk7XG5cbiAgICAgICAgaWYgKCAhbG93ZXN0RGVsdGEgfHwgYWJzRGVsdGEgPCBsb3dlc3REZWx0YSApIHtcbiAgICAgICAgICAgIGxvd2VzdERlbHRhID0gYWJzRGVsdGE7XG5cbiAgICAgICAgICAgIC8vIEFkanVzdCBvbGRlciBkZWx0YXMgaWYgbmVjZXNzYXJ5XG4gICAgICAgICAgICBpZiAoIHNob3VsZEFkanVzdE9sZERlbHRhcyhvcmdFdmVudCwgYWJzRGVsdGEpICkge1xuICAgICAgICAgICAgICAgIGxvd2VzdERlbHRhIC89IDQwO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgLy8gQWRqdXN0IG9sZGVyIGRlbHRhcyBpZiBuZWNlc3NhcnlcbiAgICAgICAgaWYgKCBzaG91bGRBZGp1c3RPbGREZWx0YXMob3JnRXZlbnQsIGFic0RlbHRhKSApIHtcbiAgICAgICAgICAgIC8vIERpdmlkZSBhbGwgdGhlIHRoaW5ncyBieSA0MCFcbiAgICAgICAgICAgIGRlbHRhICAvPSA0MDtcbiAgICAgICAgICAgIGRlbHRhWCAvPSA0MDtcbiAgICAgICAgICAgIGRlbHRhWSAvPSA0MDtcbiAgICAgICAgfVxuXG4gICAgICAgIC8vIEdldCBhIHdob2xlLCBub3JtYWxpemVkIHZhbHVlIGZvciB0aGUgZGVsdGFzXG4gICAgICAgIGRlbHRhICA9IE1hdGhbIGRlbHRhICA+PSAxID8gJ2Zsb29yJyA6ICdjZWlsJyBdKGRlbHRhICAvIGxvd2VzdERlbHRhKTtcbiAgICAgICAgZGVsdGFYID0gTWF0aFsgZGVsdGFYID49IDEgPyAnZmxvb3InIDogJ2NlaWwnIF0oZGVsdGFYIC8gbG93ZXN0RGVsdGEpO1xuICAgICAgICBkZWx0YVkgPSBNYXRoWyBkZWx0YVkgPj0gMSA/ICdmbG9vcicgOiAnY2VpbCcgXShkZWx0YVkgLyBsb3dlc3REZWx0YSk7XG5cbiAgICAgICAgLy8gTm9ybWFsaXNlIG9mZnNldFggYW5kIG9mZnNldFkgcHJvcGVydGllc1xuICAgICAgICBpZiAoIHNwZWNpYWwuc2V0dGluZ3Mubm9ybWFsaXplT2Zmc2V0ICYmIHRoaXMuZ2V0Qm91bmRpbmdDbGllbnRSZWN0ICkge1xuICAgICAgICAgICAgdmFyIGJvdW5kaW5nUmVjdCA9IHRoaXMuZ2V0Qm91bmRpbmdDbGllbnRSZWN0KCk7XG4gICAgICAgICAgICBvZmZzZXRYID0gZXZlbnQuY2xpZW50WCAtIGJvdW5kaW5nUmVjdC5sZWZ0O1xuICAgICAgICAgICAgb2Zmc2V0WSA9IGV2ZW50LmNsaWVudFkgLSBib3VuZGluZ1JlY3QudG9wO1xuICAgICAgICB9XG5cbiAgICAgICAgLy8gQWRkIGluZm9ybWF0aW9uIHRvIHRoZSBldmVudCBvYmplY3RcbiAgICAgICAgZXZlbnQuZGVsdGFYID0gZGVsdGFYO1xuICAgICAgICBldmVudC5kZWx0YVkgPSBkZWx0YVk7XG4gICAgICAgIGV2ZW50LmRlbHRhRmFjdG9yID0gbG93ZXN0RGVsdGE7XG4gICAgICAgIGV2ZW50Lm9mZnNldFggPSBvZmZzZXRYO1xuICAgICAgICBldmVudC5vZmZzZXRZID0gb2Zmc2V0WTtcbiAgICAgICAgLy8gR28gYWhlYWQgYW5kIHNldCBkZWx0YU1vZGUgdG8gMCBzaW5jZSB3ZSBjb252ZXJ0ZWQgdG8gcGl4ZWxzXG4gICAgICAgIC8vIEFsdGhvdWdoIHRoaXMgaXMgYSBsaXR0bGUgb2RkIHNpbmNlIHdlIG92ZXJ3cml0ZSB0aGUgZGVsdGFYL1lcbiAgICAgICAgLy8gcHJvcGVydGllcyB3aXRoIG5vcm1hbGl6ZWQgZGVsdGFzLlxuICAgICAgICBldmVudC5kZWx0YU1vZGUgPSAwO1xuXG4gICAgICAgIC8vIEFkZCBldmVudCBhbmQgZGVsdGEgdG8gdGhlIGZyb250IG9mIHRoZSBhcmd1bWVudHNcbiAgICAgICAgYXJncy51bnNoaWZ0KGV2ZW50LCBkZWx0YSwgZGVsdGFYLCBkZWx0YVkpO1xuXG4gICAgICAgIC8vIENsZWFyb3V0IGxvd2VzdERlbHRhIGFmdGVyIHNvbWV0aW1lIHRvIGJldHRlclxuICAgICAgICAvLyBoYW5kbGUgbXVsdGlwbGUgZGV2aWNlIHR5cGVzIHRoYXQgZ2l2ZSBkaWZmZXJlbnRcbiAgICAgICAgLy8gYSBkaWZmZXJlbnQgbG93ZXN0RGVsdGFcbiAgICAgICAgLy8gRXg6IHRyYWNrcGFkID0gMyBhbmQgbW91c2Ugd2hlZWwgPSAxMjBcbiAgICAgICAgaWYgKG51bGxMb3dlc3REZWx0YVRpbWVvdXQpIHsgY2xlYXJUaW1lb3V0KG51bGxMb3dlc3REZWx0YVRpbWVvdXQpOyB9XG4gICAgICAgIG51bGxMb3dlc3REZWx0YVRpbWVvdXQgPSBzZXRUaW1lb3V0KG51bGxMb3dlc3REZWx0YSwgMjAwKTtcblxuICAgICAgICByZXR1cm4gKCQuZXZlbnQuZGlzcGF0Y2ggfHwgJC5ldmVudC5oYW5kbGUpLmFwcGx5KHRoaXMsIGFyZ3MpO1xuICAgIH1cblxuICAgIGZ1bmN0aW9uIG51bGxMb3dlc3REZWx0YSgpIHtcbiAgICAgICAgbG93ZXN0RGVsdGEgPSBudWxsO1xuICAgIH1cblxuICAgIGZ1bmN0aW9uIHNob3VsZEFkanVzdE9sZERlbHRhcyhvcmdFdmVudCwgYWJzRGVsdGEpIHtcbiAgICAgICAgLy8gSWYgdGhpcyBpcyBhbiBvbGRlciBldmVudCBhbmQgdGhlIGRlbHRhIGlzIGRpdmlzYWJsZSBieSAxMjAsXG4gICAgICAgIC8vIHRoZW4gd2UgYXJlIGFzc3VtaW5nIHRoYXQgdGhlIGJyb3dzZXIgaXMgdHJlYXRpbmcgdGhpcyBhcyBhblxuICAgICAgICAvLyBvbGRlciBtb3VzZSB3aGVlbCBldmVudCBhbmQgdGhhdCB3ZSBzaG91bGQgZGl2aWRlIHRoZSBkZWx0YXNcbiAgICAgICAgLy8gYnkgNDAgdG8gdHJ5IGFuZCBnZXQgYSBtb3JlIHVzYWJsZSBkZWx0YUZhY3Rvci5cbiAgICAgICAgLy8gU2lkZSBub3RlLCB0aGlzIGFjdHVhbGx5IGltcGFjdHMgdGhlIHJlcG9ydGVkIHNjcm9sbCBkaXN0YW5jZVxuICAgICAgICAvLyBpbiBvbGRlciBicm93c2VycyBhbmQgY2FuIGNhdXNlIHNjcm9sbGluZyB0byBiZSBzbG93ZXIgdGhhbiBuYXRpdmUuXG4gICAgICAgIC8vIFR1cm4gdGhpcyBvZmYgYnkgc2V0dGluZyAkLmV2ZW50LnNwZWNpYWwubW91c2V3aGVlbC5zZXR0aW5ncy5hZGp1c3RPbGREZWx0YXMgdG8gZmFsc2UuXG4gICAgICAgIHJldHVybiBzcGVjaWFsLnNldHRpbmdzLmFkanVzdE9sZERlbHRhcyAmJiBvcmdFdmVudC50eXBlID09PSAnbW91c2V3aGVlbCcgJiYgYWJzRGVsdGEgJSAxMjAgPT09IDA7XG4gICAgfVxuXG59KSk7XG4iLCJpbXBvcnQgQ29tcG9uZW50IGZyb20gJ1Nob3BVaS9tb2RlbHMvY29tcG9uZW50JztcbmltcG9ydCAkIGZyb20gJ2pxdWVyeS9kaXN0L2pxdWVyeSc7XG5pbXBvcnQgJ2pxdWVyeS1kYXRldGltZXBpY2tlci9idWlsZC9qcXVlcnkuZGF0ZXRpbWVwaWNrZXIuZnVsbCc7XG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIERhdGVUaW1lUGlja2VyIGV4dGVuZHMgQ29tcG9uZW50IHtcbiAgICBwcm90ZWN0ZWQgdHJpZ2dlcjogSFRNTElucHV0RWxlbWVudDtcblxuICAgIHByb3RlY3RlZCByZWFkeUNhbGxiYWNrKCk6IHZvaWQge31cblxuICAgIHByb3RlY3RlZCBpbml0KCk6IHZvaWQge1xuICAgICAgICB0aGlzLnRyaWdnZXIgPSA8SFRNTElucHV0RWxlbWVudD50aGlzLnF1ZXJ5U2VsZWN0b3IoJ2lucHV0Jyk7XG4gICAgICAgIHRoaXMubWFwRXZlbnRzKCk7XG4gICAgfVxuXG4gICAgcHJvdGVjdGVkIG1hcEV2ZW50cygpOiB2b2lkIHtcbiAgICAgICAgdGhpcy5kYXRldGltZXBpY2tlckluaXQoKTtcbiAgICAgICAgdGhpcy5zZXRMYW5ndWFnZSh0aGlzLmxhbmd1YWdlKTtcbiAgICB9XG5cbiAgICBwcm90ZWN0ZWQgZGF0ZXRpbWVwaWNrZXJJbml0KCk6IHZvaWQge1xuICAgICAgICAkKHRoaXMudHJpZ2dlcikuZGF0ZXRpbWVwaWNrZXIodGhpcy5jb25maWcpO1xuICAgIH1cblxuICAgIHByb3RlY3RlZCBzZXRMYW5ndWFnZShsYW5ndWFnZTogc3RyaW5nKTogdm9pZCB7XG4gICAgICAgICQuZGF0ZXRpbWVwaWNrZXIuc2V0TG9jYWxlKGxhbmd1YWdlKTtcbiAgICB9XG5cbiAgICBwcm90ZWN0ZWQgZ2V0IHBhcmVudCgpOiBzdHJpbmcge1xuICAgICAgICByZXR1cm4gdGhpcy5nZXRBdHRyaWJ1dGUoJ3BhcmVudC1pZCcpO1xuICAgIH1cblxuICAgIHByb3RlY3RlZCBnZXQgbGFuZ3VhZ2UoKTogc3RyaW5nIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuZ2V0QXR0cmlidXRlKCdsYW5ndWFnZScpO1xuICAgIH1cblxuICAgIHByb3RlY3RlZCBnZXQgY29uZmlnKCk6IG9iamVjdCB7XG4gICAgICAgIGNvbnN0IGNvbmZpZyA9IEpTT04ucGFyc2UodGhpcy5nZXRBdHRyaWJ1dGUoJ2NvbmZpZycpKTtcbiAgICAgICAgY29uZmlnLnBhcmVudElEID0gdGhpcy5wYXJlbnQ7XG5cbiAgICAgICAgcmV0dXJuIGNvbmZpZztcbiAgICB9XG59XG4iXSwic291cmNlUm9vdCI6IiJ9