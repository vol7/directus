import{c as s,b as i,i as m,j as n}from"./index.nxYwrlF1.entry.js";import"./vue.runtime.esm-bundler-CFNbZJFY.js";import"./runtime-core.esm-bundler-BEmyk2t3.js";import"./index-B17mrEX6.js";import"./pinia.Zyw_3jCb.entry.js";import"./vue-i18n.DYnCnalz.entry.js";import"./vue-router.BHRcAWRs.entry.js";const u={lessThanXSeconds:{one:"секунд хүрэхгүй",other:"{{count}} секунд хүрэхгүй"},xSeconds:{one:"1 секунд",other:"{{count}} секунд"},halfAMinute:"хагас минут",lessThanXMinutes:{one:"минут хүрэхгүй",other:"{{count}} минут хүрэхгүй"},xMinutes:{one:"1 минут",other:"{{count}} минут"},aboutXHours:{one:"ойролцоогоор 1 цаг",other:"ойролцоогоор {{count}} цаг"},xHours:{one:"1 цаг",other:"{{count}} цаг"},xDays:{one:"1 өдөр",other:"{{count}} өдөр"},aboutXWeeks:{one:"ойролцоогоор 1 долоо хоног",other:"ойролцоогоор {{count}} долоо хоног"},xWeeks:{one:"1 долоо хоног",other:"{{count}} долоо хоног"},aboutXMonths:{one:"ойролцоогоор 1 сар",other:"ойролцоогоор {{count}} сар"},xMonths:{one:"1 сар",other:"{{count}} сар"},aboutXYears:{one:"ойролцоогоор 1 жил",other:"ойролцоогоор {{count}} жил"},xYears:{one:"1 жил",other:"{{count}} жил"},overXYears:{one:"1 жил гаран",other:"{{count}} жил гаран"},almostXYears:{one:"бараг 1 жил",other:"бараг {{count}} жил"}},l=(e,r,a)=>{let t;const o=u[e];if(typeof o=="string"?t=o:r===1?t=o.one:t=o.other.replace("{{count}}",String(r)),a!=null&&a.addSuffix){const d=t.split(" "),c=d.pop();switch(t=d.join(" "),c){case"секунд":t+=" секундийн";break;case"минут":t+=" минутын";break;case"цаг":t+=" цагийн";break;case"өдөр":t+=" өдрийн";break;case"сар":t+=" сарын";break;case"жил":t+=" жилийн";break;case"хоног":t+=" хоногийн";break;case"гаран":t+=" гараны";break;case"хүрэхгүй":t+=" хүрэхгүй хугацааны";break;default:t+=c+"-н"}return a.comparison&&a.comparison>0?t+" дараа":t+" өмнө"}return t},h={full:"y 'оны' MMMM'ын' d, EEEE 'гараг'",long:"y 'оны' MMMM'ын' d",medium:"y 'оны' MMM'ын' d",short:"y.MM.dd"},f={full:"H:mm:ss zzzz",long:"H:mm:ss z",medium:"H:mm:ss",short:"H:mm"},I={full:"{{date}} {{time}}",long:"{{date}} {{time}}",medium:"{{date}} {{time}}",short:"{{date}} {{time}}"},b={date:s({formats:h,defaultWidth:"full"}),time:s({formats:f,defaultWidth:"full"}),dateTime:s({formats:I,defaultWidth:"full"})},w={lastWeek:"'өнгөрсөн' eeee 'гарагийн' p 'цагт'",yesterday:"'өчигдөр' p 'цагт'",today:"'өнөөдөр' p 'цагт'",tomorrow:"'маргааш' p 'цагт'",nextWeek:"'ирэх' eeee 'гарагийн' p 'цагт'",other:"P"},v=(e,r,a,t)=>w[e],P={narrow:["НТӨ","НТ"],abbreviated:["НТӨ","НТ"],wide:["нийтийн тооллын өмнөх","нийтийн тооллын"]},p={narrow:["I","II","III","IV"],abbreviated:["I улирал","II улирал","III улирал","IV улирал"],wide:["1-р улирал","2-р улирал","3-р улирал","4-р улирал"]},g={narrow:["I","II","III","IV","V","VI","VII","VIII","IX","X","XI","XII"],abbreviated:["1-р сар","2-р сар","3-р сар","4-р сар","5-р сар","6-р сар","7-р сар","8-р сар","9-р сар","10-р сар","11-р сар","12-р сар"],wide:["Нэгдүгээр сар","Хоёрдугаар сар","Гуравдугаар сар","Дөрөвдүгээр сар","Тавдугаар сар","Зургаадугаар сар","Долоодугаар сар","Наймдугаар сар","Есдүгээр сар","Аравдугаар сар","Арваннэгдүгээр сар","Арван хоёрдугаар сар"]},y={narrow:["I","II","III","IV","V","VI","VII","VIII","IX","X","XI","XII"],abbreviated:["1-р сар","2-р сар","3-р сар","4-р сар","5-р сар","6-р сар","7-р сар","8-р сар","9-р сар","10-р сар","11-р сар","12-р сар"],wide:["нэгдүгээр сар","хоёрдугаар сар","гуравдугаар сар","дөрөвдүгээр сар","тавдугаар сар","зургаадугаар сар","долоодугаар сар","наймдугаар сар","есдүгээр сар","аравдугаар сар","арваннэгдүгээр сар","арван хоёрдугаар сар"]},M={narrow:["Н","Д","М","Л","П","Б","Б"],short:["Ня","Да","Мя","Лх","Пү","Ба","Бя"],abbreviated:["Ням","Дав","Мяг","Лха","Пүр","Баа","Бям"],wide:["Ням","Даваа","Мягмар","Лхагва","Пүрэв","Баасан","Бямба"]},W={narrow:["Н","Д","М","Л","П","Б","Б"],short:["Ня","Да","Мя","Лх","Пү","Ба","Бя"],abbreviated:["Ням","Дав","Мяг","Лха","Пүр","Баа","Бям"],wide:["ням","даваа","мягмар","лхагва","пүрэв","баасан","бямба"]},V={narrow:{am:"ү.ө.",pm:"ү.х.",midnight:"шөнө дунд",noon:"үд дунд",morning:"өглөө",afternoon:"өдөр",evening:"орой",night:"шөнө"},abbreviated:{am:"ү.ө.",pm:"ү.х.",midnight:"шөнө дунд",noon:"үд дунд",morning:"өглөө",afternoon:"өдөр",evening:"орой",night:"шөнө"},wide:{am:"ү.ө.",pm:"ү.х.",midnight:"шөнө дунд",noon:"үд дунд",morning:"өглөө",afternoon:"өдөр",evening:"орой",night:"шөнө"}},k=(e,r)=>String(e),x={ordinalNumber:k,era:i({values:P,defaultWidth:"wide"}),quarter:i({values:p,defaultWidth:"wide",argumentCallback:e=>e-1}),month:i({values:g,defaultWidth:"wide",formattingValues:y,defaultFormattingWidth:"wide"}),day:i({values:M,defaultWidth:"wide",formattingValues:W,defaultFormattingWidth:"wide"}),dayPeriod:i({values:V,defaultWidth:"wide"})},X=/\d+/i,$=/\d+/i,D={narrow:/^(нтө|нт)/i,abbreviated:/^(нтө|нт)/i,wide:/^(нийтийн тооллын өмнө|нийтийн тооллын)/i},F={any:[/^(нтө|нийтийн тооллын өмнө)/i,/^(нт|нийтийн тооллын)/i]},z={narrow:/^(iv|iii|ii|i)/i,abbreviated:/^(iv|iii|ii|i) улирал/i,wide:/^[1-4]-р улирал/i},E={any:[/^(i(\s|$)|1)/i,/^(ii(\s|$)|2)/i,/^(iii(\s|$)|3)/i,/^(iv(\s|$)|4)/i]},H={narrow:/^(xii|xi|x|ix|viii|vii|vi|v|iv|iii|ii|i)/i,abbreviated:/^(1-р сар|2-р сар|3-р сар|4-р сар|5-р сар|6-р сар|7-р сар|8-р сар|9-р сар|10-р сар|11-р сар|12-р сар)/i,wide:/^(нэгдүгээр сар|хоёрдугаар сар|гуравдугаар сар|дөрөвдүгээр сар|тавдугаар сар|зургаадугаар сар|долоодугаар сар|наймдугаар сар|есдүгээр сар|аравдугаар сар|арван нэгдүгээр сар|арван хоёрдугаар сар)/i},L={narrow:[/^i$/i,/^ii$/i,/^iii$/i,/^iv$/i,/^v$/i,/^vi$/i,/^vii$/i,/^viii$/i,/^ix$/i,/^x$/i,/^xi$/i,/^xii$/i],any:[/^(1|нэгдүгээр)/i,/^(2|хоёрдугаар)/i,/^(3|гуравдугаар)/i,/^(4|дөрөвдүгээр)/i,/^(5|тавдугаар)/i,/^(6|зургаадугаар)/i,/^(7|долоодугаар)/i,/^(8|наймдугаар)/i,/^(9|есдүгээр)/i,/^(10|аравдугаар)/i,/^(11|арван нэгдүгээр)/i,/^(12|арван хоёрдугаар)/i]},S={narrow:/^[ндмлпбб]/i,short:/^(ня|да|мя|лх|пү|ба|бя)/i,abbreviated:/^(ням|дав|мяг|лха|пүр|баа|бям)/i,wide:/^(ням|даваа|мягмар|лхагва|пүрэв|баасан|бямба)/i},C={narrow:[/^н/i,/^д/i,/^м/i,/^л/i,/^п/i,/^б/i,/^б/i],any:[/^ня/i,/^да/i,/^мя/i,/^лх/i,/^пү/i,/^ба/i,/^бя/i]},N={narrow:/^(ү\.ө\.|ү\.х\.|шөнө дунд|үд дунд|өглөө|өдөр|орой|шөнө)/i,any:/^(ү\.ө\.|ү\.х\.|шөнө дунд|үд дунд|өглөө|өдөр|орой|шөнө)/i},T={any:{am:/^ү\.ө\./i,pm:/^ү\.х\./i,midnight:/^шөнө дунд/i,noon:/^үд дунд/i,morning:/өглөө/i,afternoon:/өдөр/i,evening:/орой/i,night:/шөнө/i}},Y={ordinalNumber:m({matchPattern:X,parsePattern:$,valueCallback:e=>parseInt(e,10)}),era:n({matchPatterns:D,defaultMatchWidth:"wide",parsePatterns:F,defaultParseWidth:"any"}),quarter:n({matchPatterns:z,defaultMatchWidth:"wide",parsePatterns:E,defaultParseWidth:"any",valueCallback:e=>e+1}),month:n({matchPatterns:H,defaultMatchWidth:"wide",parsePatterns:L,defaultParseWidth:"any"}),day:n({matchPatterns:S,defaultMatchWidth:"wide",parsePatterns:C,defaultParseWidth:"any"}),dayPeriod:n({matchPatterns:N,defaultMatchWidth:"any",parsePatterns:T,defaultParseWidth:"any"})},B={code:"mn",formatDistance:l,formatLong:b,formatRelative:v,localize:x,match:Y,options:{weekStartsOn:1,firstWeekContainsDate:1}};export{B as default,B as mn};
