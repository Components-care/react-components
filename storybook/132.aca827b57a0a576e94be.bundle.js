/*! For license information please see 132.aca827b57a0a576e94be.bundle.js.LICENSE.txt */
(window.webpackJsonp=window.webpackJsonp||[]).push([[132],{688:function(module,exports,__webpack_require__){!function(moment){"use strict";moment.defineLocale("zh-hk",{months:"一月_二月_三月_四月_五月_六月_七月_八月_九月_十月_十一月_十二月".split("_"),monthsShort:"1月_2月_3月_4月_5月_6月_7月_8月_9月_10月_11月_12月".split("_"),weekdays:"星期日_星期一_星期二_星期三_星期四_星期五_星期六".split("_"),weekdaysShort:"週日_週一_週二_週三_週四_週五_週六".split("_"),weekdaysMin:"日_一_二_三_四_五_六".split("_"),longDateFormat:{LT:"HH:mm",LTS:"HH:mm:ss",L:"YYYY/MM/DD",LL:"YYYY年M月D日",LLL:"YYYY年M月D日 HH:mm",LLLL:"YYYY年M月D日dddd HH:mm",l:"YYYY/M/D",ll:"YYYY年M月D日",lll:"YYYY年M月D日 HH:mm",llll:"YYYY年M月D日dddd HH:mm"},meridiemParse:/凌晨|早上|上午|中午|下午|晚上/,meridiemHour:function(hour,meridiem){return 12===hour&&(hour=0),"凌晨"===meridiem||"早上"===meridiem||"上午"===meridiem?hour:"中午"===meridiem?hour>=11?hour:hour+12:"下午"===meridiem||"晚上"===meridiem?hour+12:void 0},meridiem:function(hour,minute,isLower){var hm=100*hour+minute;return hm<600?"凌晨":hm<900?"早上":hm<1200?"上午":1200===hm?"中午":hm<1800?"下午":"晚上"},calendar:{sameDay:"[今天]LT",nextDay:"[明天]LT",nextWeek:"[下]ddddLT",lastDay:"[昨天]LT",lastWeek:"[上]ddddLT",sameElse:"L"},dayOfMonthOrdinalParse:/\d{1,2}(日|月|週)/,ordinal:function(number,period){switch(period){case"d":case"D":case"DDD":return number+"日";case"M":return number+"月";case"w":case"W":return number+"週";default:return number}},relativeTime:{future:"%s後",past:"%s前",s:"幾秒",ss:"%d 秒",m:"1 分鐘",mm:"%d 分鐘",h:"1 小時",hh:"%d 小時",d:"1 天",dd:"%d 天",M:"1 個月",MM:"%d 個月",y:"1 年",yy:"%d 年"}})}(__webpack_require__(60))}}]);
//# sourceMappingURL=132.aca827b57a0a576e94be.bundle.js.map