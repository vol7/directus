import{c as m,b as r,i as c,j as s}from"./index.nxYwrlF1.entry.js";import{i as o}from"./isSameWeek-DcbxGRFt.js";import"./vue.runtime.esm-bundler-CFNbZJFY.js";import"./runtime-core.esm-bundler-BEmyk2t3.js";import"./index-B17mrEX6.js";import"./pinia.Zyw_3jCb.entry.js";import"./vue-i18n.DYnCnalz.entry.js";import"./vue-router.BHRcAWRs.entry.js";function i(e){return(a,t)=>{if(a===1)return t!=null&&t.addSuffix?e.one[0].replace("{{time}}",e.one[2]):e.one[0].replace("{{time}}",e.one[1]);{const n=a%10===1&&a%100!==11;return t!=null&&t.addSuffix?e.other[0].replace("{{time}}",n?e.other[3]:e.other[4]).replace("{{count}}",String(a)):e.other[0].replace("{{time}}",n?e.other[1]:e.other[2]).replace("{{count}}",String(a))}}}const p={lessThanXSeconds:i({one:["mazāk par {{time}}","sekundi","sekundi"],other:["mazāk nekā {{count}} {{time}}","sekunde","sekundes","sekundes","sekundēm"]}),xSeconds:i({one:["1 {{time}}","sekunde","sekundes"],other:["{{count}} {{time}}","sekunde","sekundes","sekundes","sekundēm"]}),halfAMinute:(e,a)=>a!=null&&a.addSuffix?"pusminūtes":"pusminūte",lessThanXMinutes:i({one:["mazāk par {{time}}","minūti","minūti"],other:["mazāk nekā {{count}} {{time}}","minūte","minūtes","minūtes","minūtēm"]}),xMinutes:i({one:["1 {{time}}","minūte","minūtes"],other:["{{count}} {{time}}","minūte","minūtes","minūtes","minūtēm"]}),aboutXHours:i({one:["apmēram 1 {{time}}","stunda","stundas"],other:["apmēram {{count}} {{time}}","stunda","stundas","stundas","stundām"]}),xHours:i({one:["1 {{time}}","stunda","stundas"],other:["{{count}} {{time}}","stunda","stundas","stundas","stundām"]}),xDays:i({one:["1 {{time}}","diena","dienas"],other:["{{count}} {{time}}","diena","dienas","dienas","dienām"]}),aboutXWeeks:i({one:["apmēram 1 {{time}}","nedēļa","nedēļas"],other:["apmēram {{count}} {{time}}","nedēļa","nedēļu","nedēļas","nedēļām"]}),xWeeks:i({one:["1 {{time}}","nedēļa","nedēļas"],other:["{{count}} {{time}}","nedēļa","nedēļu","nedēļas","nedēļām"]}),aboutXMonths:i({one:["apmēram 1 {{time}}","mēnesis","mēneša"],other:["apmēram {{count}} {{time}}","mēnesis","mēneši","mēneša","mēnešiem"]}),xMonths:i({one:["1 {{time}}","mēnesis","mēneša"],other:["{{count}} {{time}}","mēnesis","mēneši","mēneša","mēnešiem"]}),aboutXYears:i({one:["apmēram 1 {{time}}","gads","gada"],other:["apmēram {{count}} {{time}}","gads","gadi","gada","gadiem"]}),xYears:i({one:["1 {{time}}","gads","gada"],other:["{{count}} {{time}}","gads","gadi","gada","gadiem"]}),overXYears:i({one:["ilgāk par 1 {{time}}","gadu","gadu"],other:["vairāk nekā {{count}} {{time}}","gads","gadi","gada","gadiem"]}),almostXYears:i({one:["gandrīz 1 {{time}}","gads","gada"],other:["vairāk nekā {{count}} {{time}}","gads","gadi","gada","gadiem"]})},l=(e,a,t)=>{const n=p[e](a,t);return t!=null&&t.addSuffix?t.comparison&&t.comparison>0?"pēc "+n:"pirms "+n:n},k={full:"EEEE, y. 'gada' d. MMMM",long:"y. 'gada' d. MMMM",medium:"dd.MM.y.",short:"dd.MM.y."},f={full:"HH:mm:ss zzzz",long:"HH:mm:ss z",medium:"HH:mm:ss",short:"HH:mm"},h={full:"{{date}} 'plkst.' {{time}}",long:"{{date}} 'plkst.' {{time}}",medium:"{{date}}, {{time}}",short:"{{date}}, {{time}}"},g={date:m({formats:k,defaultWidth:"full"}),time:m({formats:f,defaultWidth:"full"}),dateTime:m({formats:h,defaultWidth:"full"})},u=["svētdienā","pirmdienā","otrdienā","trešdienā","ceturtdienā","piektdienā","sestdienā"],v={lastWeek:(e,a,t)=>o(e,a,t)?"eeee 'plkst.' p":"'Pagājušā "+u[e.getDay()]+" plkst.' p",yesterday:"'Vakar plkst.' p",today:"'Šodien plkst.' p",tomorrow:"'Rīt plkst.' p",nextWeek:(e,a,t)=>o(e,a,t)?"eeee 'plkst.' p":"'Nākamajā "+u[e.getDay()]+" plkst.' p",other:"P"},b=(e,a,t,n)=>{const d=v[e];return typeof d=="function"?d(a,t,n):d},w={narrow:["p.m.ē","m.ē"],abbreviated:["p. m. ē.","m. ē."],wide:["pirms mūsu ēras","mūsu ērā"]},j={narrow:["1","2","3","4"],abbreviated:["1. cet.","2. cet.","3. cet.","4. cet."],wide:["pirmais ceturksnis","otrais ceturksnis","trešais ceturksnis","ceturtais ceturksnis"]},P={narrow:["1","2","3","4"],abbreviated:["1. cet.","2. cet.","3. cet.","4. cet."],wide:["pirmajā ceturksnī","otrajā ceturksnī","trešajā ceturksnī","ceturtajā ceturksnī"]},y={narrow:["J","F","M","A","M","J","J","A","S","O","N","D"],abbreviated:["janv.","febr.","marts","apr.","maijs","jūn.","jūl.","aug.","sept.","okt.","nov.","dec."],wide:["janvāris","februāris","marts","aprīlis","maijs","jūnijs","jūlijs","augusts","septembris","oktobris","novembris","decembris"]},M={narrow:["J","F","M","A","M","J","J","A","S","O","N","D"],abbreviated:["janv.","febr.","martā","apr.","maijs","jūn.","jūl.","aug.","sept.","okt.","nov.","dec."],wide:["janvārī","februārī","martā","aprīlī","maijā","jūnijā","jūlijā","augustā","septembrī","oktobrī","novembrī","decembrī"]},W={narrow:["S","P","O","T","C","P","S"],short:["Sv","P","O","T","C","Pk","S"],abbreviated:["svētd.","pirmd.","otrd.","trešd.","ceturtd.","piektd.","sestd."],wide:["svētdiena","pirmdiena","otrdiena","trešdiena","ceturtdiena","piektdiena","sestdiena"]},S={narrow:["S","P","O","T","C","P","S"],short:["Sv","P","O","T","C","Pk","S"],abbreviated:["svētd.","pirmd.","otrd.","trešd.","ceturtd.","piektd.","sestd."],wide:["svētdienā","pirmdienā","otrdienā","trešdienā","ceturtdienā","piektdienā","sestdienā"]},D={narrow:{am:"am",pm:"pm",midnight:"pusn.",noon:"pusd.",morning:"rīts",afternoon:"diena",evening:"vakars",night:"nakts"},abbreviated:{am:"am",pm:"pm",midnight:"pusn.",noon:"pusd.",morning:"rīts",afternoon:"pēcpusd.",evening:"vakars",night:"nakts"},wide:{am:"am",pm:"pm",midnight:"pusnakts",noon:"pusdienlaiks",morning:"rīts",afternoon:"pēcpusdiena",evening:"vakars",night:"nakts"}},F={narrow:{am:"am",pm:"pm",midnight:"pusn.",noon:"pusd.",morning:"rītā",afternoon:"dienā",evening:"vakarā",night:"naktī"},abbreviated:{am:"am",pm:"pm",midnight:"pusn.",noon:"pusd.",morning:"rītā",afternoon:"pēcpusd.",evening:"vakarā",night:"naktī"},wide:{am:"am",pm:"pm",midnight:"pusnaktī",noon:"pusdienlaikā",morning:"rītā",afternoon:"pēcpusdienā",evening:"vakarā",night:"naktī"}},z=(e,a)=>Number(e)+".",V={ordinalNumber:z,era:r({values:w,defaultWidth:"wide"}),quarter:r({values:j,defaultWidth:"wide",formattingValues:P,defaultFormattingWidth:"wide",argumentCallback:e=>e-1}),month:r({values:y,defaultWidth:"wide",formattingValues:M,defaultFormattingWidth:"wide"}),day:r({values:W,defaultWidth:"wide",formattingValues:S,defaultFormattingWidth:"wide"}),dayPeriod:r({values:D,defaultWidth:"wide",formattingValues:F,defaultFormattingWidth:"wide"})},x=/^(\d+)\./i,H=/\d+/i,O={narrow:/^(p\.m\.ē|m\.ē)/i,abbreviated:/^(p\. m\. ē\.|m\. ē\.)/i,wide:/^(pirms mūsu ēras|mūsu ērā)/i},T={any:[/^p/i,/^m/i]},C={narrow:/^[1234]/i,abbreviated:/^[1234](\. cet\.)/i,wide:/^(pirma(is|jā)|otra(is|jā)|treša(is|jā)|ceturta(is|jā)) ceturksn(is|ī)/i},N={narrow:[/^1/i,/^2/i,/^3/i,/^4/i],abbreviated:[/^1/i,/^2/i,/^3/i,/^4/i],wide:[/^p/i,/^o/i,/^t/i,/^c/i]},X={narrow:/^[jfmasond]/i,abbreviated:/^(janv\.|febr\.|marts|apr\.|maijs|jūn\.|jūl\.|aug\.|sept\.|okt\.|nov\.|dec\.)/i,wide:/^(janvār(is|ī)|februār(is|ī)|mart[sā]|aprīl(is|ī)|maij[sā]|jūnij[sā]|jūlij[sā]|august[sā]|septembr(is|ī)|oktobr(is|ī)|novembr(is|ī)|decembr(is|ī))/i},L={narrow:[/^j/i,/^f/i,/^m/i,/^a/i,/^m/i,/^j/i,/^j/i,/^a/i,/^s/i,/^o/i,/^n/i,/^d/i],any:[/^ja/i,/^f/i,/^mar/i,/^ap/i,/^mai/i,/^jūn/i,/^jūl/i,/^au/i,/^s/i,/^o/i,/^n/i,/^d/i]},E={narrow:/^[spotc]/i,short:/^(sv|pi|o|t|c|pk|s)/i,abbreviated:/^(svētd\.|pirmd\.|otrd.\|trešd\.|ceturtd\.|piektd\.|sestd\.)/i,wide:/^(svētdien(a|ā)|pirmdien(a|ā)|otrdien(a|ā)|trešdien(a|ā)|ceturtdien(a|ā)|piektdien(a|ā)|sestdien(a|ā))/i},J={narrow:[/^s/i,/^p/i,/^o/i,/^t/i,/^c/i,/^p/i,/^s/i],any:[/^sv/i,/^pi/i,/^o/i,/^t/i,/^c/i,/^p/i,/^se/i]},A={narrow:/^(am|pm|pusn\.|pusd\.|rīt(s|ā)|dien(a|ā)|vakar(s|ā)|nakt(s|ī))/,abbreviated:/^(am|pm|pusn\.|pusd\.|rīt(s|ā)|pēcpusd\.|vakar(s|ā)|nakt(s|ī))/,wide:/^(am|pm|pusnakt(s|ī)|pusdienlaik(s|ā)|rīt(s|ā)|pēcpusdien(a|ā)|vakar(s|ā)|nakt(s|ī))/i},R={any:{am:/^am/i,pm:/^pm/i,midnight:/^pusn/i,noon:/^pusd/i,morning:/^r/i,afternoon:/^(d|pēc)/i,evening:/^v/i,night:/^n/i}},Y={ordinalNumber:c({matchPattern:x,parsePattern:H,valueCallback:e=>parseInt(e,10)}),era:s({matchPatterns:O,defaultMatchWidth:"wide",parsePatterns:T,defaultParseWidth:"any"}),quarter:s({matchPatterns:C,defaultMatchWidth:"wide",parsePatterns:N,defaultParseWidth:"wide",valueCallback:e=>e+1}),month:s({matchPatterns:X,defaultMatchWidth:"wide",parsePatterns:L,defaultParseWidth:"any"}),day:s({matchPatterns:E,defaultMatchWidth:"wide",parsePatterns:J,defaultParseWidth:"any"}),dayPeriod:s({matchPatterns:A,defaultMatchWidth:"wide",parsePatterns:R,defaultParseWidth:"any"})},Z={code:"lv",formatDistance:l,formatLong:g,formatRelative:b,localize:V,match:Y,options:{weekStartsOn:1,firstWeekContainsDate:4}};export{Z as default,Z as lv};
