/*! For license information please see 82.aca827b57a0a576e94be.bundle.js.LICENSE.txt */
(window.webpackJsonp=window.webpackJsonp||[]).push([[82],{638:function(module,exports,__webpack_require__){!function(moment){"use strict";function translate(number,withoutSuffix,key,isFuture){switch(key){case"s":return withoutSuffix?"хэдхэн секунд":"хэдхэн секундын";case"ss":return number+(withoutSuffix?" секунд":" секундын");case"m":case"mm":return number+(withoutSuffix?" минут":" минутын");case"h":case"hh":return number+(withoutSuffix?" цаг":" цагийн");case"d":case"dd":return number+(withoutSuffix?" өдөр":" өдрийн");case"M":case"MM":return number+(withoutSuffix?" сар":" сарын");case"y":case"yy":return number+(withoutSuffix?" жил":" жилийн");default:return number}}moment.defineLocale("mn",{months:"Нэгдүгээр сар_Хоёрдугаар сар_Гуравдугаар сар_Дөрөвдүгээр сар_Тавдугаар сар_Зургадугаар сар_Долдугаар сар_Наймдугаар сар_Есдүгээр сар_Аравдугаар сар_Арван нэгдүгээр сар_Арван хоёрдугаар сар".split("_"),monthsShort:"1 сар_2 сар_3 сар_4 сар_5 сар_6 сар_7 сар_8 сар_9 сар_10 сар_11 сар_12 сар".split("_"),monthsParseExact:!0,weekdays:"Ням_Даваа_Мягмар_Лхагва_Пүрэв_Баасан_Бямба".split("_"),weekdaysShort:"Ням_Дав_Мяг_Лха_Пүр_Баа_Бям".split("_"),weekdaysMin:"Ня_Да_Мя_Лх_Пү_Ба_Бя".split("_"),weekdaysParseExact:!0,longDateFormat:{LT:"HH:mm",LTS:"HH:mm:ss",L:"YYYY-MM-DD",LL:"YYYY оны MMMMын D",LLL:"YYYY оны MMMMын D HH:mm",LLLL:"dddd, YYYY оны MMMMын D HH:mm"},meridiemParse:/ҮӨ|ҮХ/i,isPM:function(input){return"ҮХ"===input},meridiem:function(hour,minute,isLower){return hour<12?"ҮӨ":"ҮХ"},calendar:{sameDay:"[Өнөөдөр] LT",nextDay:"[Маргааш] LT",nextWeek:"[Ирэх] dddd LT",lastDay:"[Өчигдөр] LT",lastWeek:"[Өнгөрсөн] dddd LT",sameElse:"L"},relativeTime:{future:"%s дараа",past:"%s өмнө",s:translate,ss:translate,m:translate,mm:translate,h:translate,hh:translate,d:translate,dd:translate,M:translate,MM:translate,y:translate,yy:translate},dayOfMonthOrdinalParse:/\d{1,2} өдөр/,ordinal:function(number,period){switch(period){case"d":case"D":case"DDD":return number+" өдөр";default:return number}}})}(__webpack_require__(60))}}]);
//# sourceMappingURL=82.aca827b57a0a576e94be.bundle.js.map