import{c as s,b as n,i as d,j as i}from"./index.nxYwrlF1.entry.js";import"./vue.runtime.esm-bundler-CFNbZJFY.js";import"./runtime-core.esm-bundler-BEmyk2t3.js";import"./index-B17mrEX6.js";import"./pinia.Zyw_3jCb.entry.js";import"./vue-i18n.DYnCnalz.entry.js";import"./vue-router.BHRcAWRs.entry.js";const m={lessThanXSeconds:{one:"کمتر از یک ثانیه",other:"کمتر از {{count}} ثانیه"},xSeconds:{one:"1 ثانیه",other:"{{count}} ثانیه"},halfAMinute:"نیم دقیقه",lessThanXMinutes:{one:"کمتر از یک دقیقه",other:"کمتر از {{count}} دقیقه"},xMinutes:{one:"1 دقیقه",other:"{{count}} دقیقه"},aboutXHours:{one:"حدود 1 ساعت",other:"حدود {{count}} ساعت"},xHours:{one:"1 ساعت",other:"{{count}} ساعت"},xDays:{one:"1 روز",other:"{{count}} روز"},aboutXWeeks:{one:"حدود 1 هفته",other:"حدود {{count}} هفته"},xWeeks:{one:"1 هفته",other:"{{count}} هفته"},aboutXMonths:{one:"حدود 1 ماه",other:"حدود {{count}} ماه"},xMonths:{one:"1 ماه",other:"{{count}} ماه"},aboutXYears:{one:"حدود 1 سال",other:"حدود {{count}} سال"},xYears:{one:"1 سال",other:"{{count}} سال"},overXYears:{one:"بیشتر از 1 سال",other:"بیشتر از {{count}} سال"},almostXYears:{one:"نزدیک 1 سال",other:"نزدیک {{count}} سال"}},h=(t,o,a)=>{let e;const r=m[t];return typeof r=="string"?e=r:o===1?e=r.one:e=r.other.replace("{{count}}",String(o)),a!=null&&a.addSuffix?a.comparison&&a.comparison>0?"در "+e:e+" قبل":e},u={full:"EEEE do MMMM y",long:"do MMMM y",medium:"d MMM y",short:"yyyy/MM/dd"},c={full:"h:mm:ss a zzzz",long:"h:mm:ss a z",medium:"h:mm:ss a",short:"h:mm a"},l={full:"{{date}} 'در' {{time}}",long:"{{date}} 'در' {{time}}",medium:"{{date}}, {{time}}",short:"{{date}}, {{time}}"},f={date:s({formats:u,defaultWidth:"full"}),time:s({formats:c,defaultWidth:"full"}),dateTime:s({formats:l,defaultWidth:"full"})},g={lastWeek:"eeee 'گذشته در' p",yesterday:"'دیروز در' p",today:"'امروز در' p",tomorrow:"'فردا در' p",nextWeek:"eeee 'در' p",other:"P"},b=(t,o,a,e)=>g[t],w={narrow:["ق","ب"],abbreviated:["ق.م.","ب.م."],wide:["قبل از میلاد","بعد از میلاد"]},P={narrow:["1","2","3","4"],abbreviated:["س‌م1","س‌م2","س‌م3","س‌م4"],wide:["سه‌ماهه 1","سه‌ماهه 2","سه‌ماهه 3","سه‌ماهه 4"]},p={narrow:["ژ","ف","م","آ","م","ج","ج","آ","س","ا","ن","د"],abbreviated:["ژانـ","فور","مارس","آپر","می","جون","جولـ","آگو","سپتـ","اکتـ","نوامـ","دسامـ"],wide:["ژانویه","فوریه","مارس","آپریل","می","جون","جولای","آگوست","سپتامبر","اکتبر","نوامبر","دسامبر"]},y={narrow:["ی","د","س","چ","پ","ج","ش"],short:["1ش","2ش","3ش","4ش","5ش","ج","ش"],abbreviated:["یکشنبه","دوشنبه","سه‌شنبه","چهارشنبه","پنجشنبه","جمعه","شنبه"],wide:["یکشنبه","دوشنبه","سه‌شنبه","چهارشنبه","پنجشنبه","جمعه","شنبه"]},v={narrow:{am:"ق",pm:"ب",midnight:"ن",noon:"ظ",morning:"ص",afternoon:"ب.ظ.",evening:"ع",night:"ش"},abbreviated:{am:"ق.ظ.",pm:"ب.ظ.",midnight:"نیمه‌شب",noon:"ظهر",morning:"صبح",afternoon:"بعدازظهر",evening:"عصر",night:"شب"},wide:{am:"قبل‌ازظهر",pm:"بعدازظهر",midnight:"نیمه‌شب",noon:"ظهر",morning:"صبح",afternoon:"بعدازظهر",evening:"عصر",night:"شب"}},M={narrow:{am:"ق",pm:"ب",midnight:"ن",noon:"ظ",morning:"ص",afternoon:"ب.ظ.",evening:"ع",night:"ش"},abbreviated:{am:"ق.ظ.",pm:"ب.ظ.",midnight:"نیمه‌شب",noon:"ظهر",morning:"صبح",afternoon:"بعدازظهر",evening:"عصر",night:"شب"},wide:{am:"قبل‌ازظهر",pm:"بعدازظهر",midnight:"نیمه‌شب",noon:"ظهر",morning:"صبح",afternoon:"بعدازظهر",evening:"عصر",night:"شب"}},W=(t,o)=>String(t),D={ordinalNumber:W,era:n({values:w,defaultWidth:"wide"}),quarter:n({values:P,defaultWidth:"wide",argumentCallback:t=>t-1}),month:n({values:p,defaultWidth:"wide"}),day:n({values:y,defaultWidth:"wide"}),dayPeriod:n({values:v,defaultWidth:"wide",formattingValues:M,defaultFormattingWidth:"wide"})},k=/^(\d+)(th|st|nd|rd)?/i,x=/\d+/i,F={narrow:/^(ق|ب)/i,abbreviated:/^(ق\.?\s?م\.?|ق\.?\s?د\.?\s?م\.?|م\.?\s?|د\.?\s?م\.?)/i,wide:/^(قبل از میلاد|قبل از دوران مشترک|میلادی|دوران مشترک|بعد از میلاد)/i},z={any:[/^قبل/i,/^بعد/i]},V={narrow:/^[1234]/i,abbreviated:/^س‌م[1234]/i,wide:/^سه‌ماهه [1234]/i},X={any:[/1/i,/2/i,/3/i,/4/i]},E={narrow:/^[جژفمآاماسند]/i,abbreviated:/^(جنو|ژانـ|ژانویه|فوریه|فور|مارس|آوریل|آپر|مه|می|ژوئن|جون|جول|جولـ|ژوئیه|اوت|آگو|سپتمبر|سپتامبر|اکتبر|اکتوبر|نوامبر|نوامـ|دسامبر|دسامـ|دسم)/i,wide:/^(ژانویه|جنوری|فبروری|فوریه|مارچ|مارس|آپریل|اپریل|ایپریل|آوریل|مه|می|ژوئن|جون|جولای|ژوئیه|آگست|اگست|آگوست|اوت|سپتمبر|سپتامبر|اکتبر|اکتوبر|نوامبر|نومبر|دسامبر|دسمبر)/i},L={narrow:[/^(ژ|ج)/i,/^ف/i,/^م/i,/^(آ|ا)/i,/^م/i,/^(ژ|ج)/i,/^(ج|ژ)/i,/^(آ|ا)/i,/^س/i,/^ا/i,/^ن/i,/^د/i],any:[/^ژا/i,/^ف/i,/^ما/i,/^آپ/i,/^(می|مه)/i,/^(ژوئن|جون)/i,/^(ژوئی|جول)/i,/^(اوت|آگ)/i,/^س/i,/^(اوک|اک)/i,/^ن/i,/^د/i]},S={narrow:/^[شیدسچپج]/i,short:/^(ش|ج|1ش|2ش|3ش|4ش|5ش)/i,abbreviated:/^(یکشنبه|دوشنبه|سه‌شنبه|چهارشنبه|پنج‌شنبه|جمعه|شنبه)/i,wide:/^(یکشنبه|دوشنبه|سه‌شنبه|چهارشنبه|پنج‌شنبه|جمعه|شنبه)/i},R={narrow:[/^ی/i,/^دو/i,/^س/i,/^چ/i,/^پ/i,/^ج/i,/^ش/i],any:[/^(ی|1ش|یکشنبه)/i,/^(د|2ش|دوشنبه)/i,/^(س|3ش|سه‌شنبه)/i,/^(چ|4ش|چهارشنبه)/i,/^(پ|5ش|پنجشنبه)/i,/^(ج|جمعه)/i,/^(ش|شنبه)/i]},C={narrow:/^(ب|ق|ن|ظ|ص|ب.ظ.|ع|ش)/i,abbreviated:/^(ق.ظ.|ب.ظ.|نیمه‌شب|ظهر|صبح|بعدازظهر|عصر|شب)/i,wide:/^(قبل‌ازظهر|نیمه‌شب|ظهر|صبح|بعدازظهر|عصر|شب)/i},N={any:{am:/^(ق|ق.ظ.|قبل‌ازظهر)/i,pm:/^(ب|ب.ظ.|بعدازظهر)/i,midnight:/^(‌نیمه‌شب|ن)/i,noon:/^(ظ|ظهر)/i,morning:/(ص|صبح)/i,afternoon:/(ب|ب.ظ.|بعدازظهر)/i,evening:/(ع|عصر)/i,night:/(ش|شب)/i}},T={ordinalNumber:d({matchPattern:k,parsePattern:x,valueCallback:t=>parseInt(t,10)}),era:i({matchPatterns:F,defaultMatchWidth:"wide",parsePatterns:z,defaultParseWidth:"any"}),quarter:i({matchPatterns:V,defaultMatchWidth:"wide",parsePatterns:X,defaultParseWidth:"any",valueCallback:t=>t+1}),month:i({matchPatterns:E,defaultMatchWidth:"wide",parsePatterns:L,defaultParseWidth:"any"}),day:i({matchPatterns:S,defaultMatchWidth:"wide",parsePatterns:R,defaultParseWidth:"any"}),dayPeriod:i({matchPatterns:C,defaultMatchWidth:"wide",parsePatterns:N,defaultParseWidth:"any"})},j={code:"fa-IR",formatDistance:h,formatLong:f,formatRelative:b,localize:D,match:T,options:{weekStartsOn:6,firstWeekContainsDate:1}};export{j as default,j as faIR};
