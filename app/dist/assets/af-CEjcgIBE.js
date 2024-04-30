import{c as d,b as r,i as m,j as i}from"./index.nxYwrlF1.entry.js";import"./vue.runtime.esm-bundler-CFNbZJFY.js";import"./runtime-core.esm-bundler-BEmyk2t3.js";import"./index-B17mrEX6.js";import"./pinia.Zyw_3jCb.entry.js";import"./vue-i18n.DYnCnalz.entry.js";import"./vue-router.BHRcAWRs.entry.js";const s={lessThanXSeconds:{one:"minder as 'n sekonde",other:"minder as {{count}} sekondes"},xSeconds:{one:"1 sekonde",other:"{{count}} sekondes"},halfAMinute:"'n halwe minuut",lessThanXMinutes:{one:"minder as 'n minuut",other:"minder as {{count}} minute"},xMinutes:{one:"'n minuut",other:"{{count}} minute"},aboutXHours:{one:"ongeveer 1 uur",other:"ongeveer {{count}} ure"},xHours:{one:"1 uur",other:"{{count}} ure"},xDays:{one:"1 dag",other:"{{count}} dae"},aboutXWeeks:{one:"ongeveer 1 week",other:"ongeveer {{count}} weke"},xWeeks:{one:"1 week",other:"{{count}} weke"},aboutXMonths:{one:"ongeveer 1 maand",other:"ongeveer {{count}} maande"},xMonths:{one:"1 maand",other:"{{count}} maande"},aboutXYears:{one:"ongeveer 1 jaar",other:"ongeveer {{count}} jaar"},xYears:{one:"1 jaar",other:"{{count}} jaar"},overXYears:{one:"meer as 1 jaar",other:"meer as {{count}} jaar"},almostXYears:{one:"byna 1 jaar",other:"byna {{count}} jaar"}},u=(e,t,a)=>{let n;const o=s[e];return typeof o=="string"?n=o:t===1?n=o.one:n=o.other.replace("{{count}}",String(t)),a!=null&&a.addSuffix?a.comparison&&a.comparison>0?"oor "+n:n+" gelede":n},g={full:"EEEE, d MMMM yyyy",long:"d MMMM yyyy",medium:"d MMM yyyy",short:"yyyy/MM/dd"},l={full:"HH:mm:ss zzzz",long:"HH:mm:ss z",medium:"HH:mm:ss",short:"HH:mm"},c={full:"{{date}} 'om' {{time}}",long:"{{date}} 'om' {{time}}",medium:"{{date}}, {{time}}",short:"{{date}}, {{time}}"},h={date:d({formats:g,defaultWidth:"full"}),time:d({formats:l,defaultWidth:"full"}),dateTime:d({formats:c,defaultWidth:"full"})},f={lastWeek:"'verlede' eeee 'om' p",yesterday:"'gister om' p",today:"'vandag om' p",tomorrow:"'môre om' p",nextWeek:"eeee 'om' p",other:"P"},v=(e,t,a,n)=>f[e],b={narrow:["vC","nC"],abbreviated:["vC","nC"],wide:["voor Christus","na Christus"]},y={narrow:["1","2","3","4"],abbreviated:["K1","K2","K3","K4"],wide:["1ste kwartaal","2de kwartaal","3de kwartaal","4de kwartaal"]},M={narrow:["J","F","M","A","M","J","J","A","S","O","N","D"],abbreviated:["Jan","Feb","Mrt","Apr","Mei","Jun","Jul","Aug","Sep","Okt","Nov","Des"],wide:["Januarie","Februarie","Maart","April","Mei","Junie","Julie","Augustus","September","Oktober","November","Desember"]},w={narrow:["S","M","D","W","D","V","S"],short:["So","Ma","Di","Wo","Do","Vr","Sa"],abbreviated:["Son","Maa","Din","Woe","Don","Vry","Sat"],wide:["Sondag","Maandag","Dinsdag","Woensdag","Donderdag","Vrydag","Saterdag"]},p={narrow:{am:"vm",pm:"nm",midnight:"middernag",noon:"middaguur",morning:"oggend",afternoon:"middag",evening:"laat middag",night:"aand"},abbreviated:{am:"vm",pm:"nm",midnight:"middernag",noon:"middaguur",morning:"oggend",afternoon:"middag",evening:"laat middag",night:"aand"},wide:{am:"vm",pm:"nm",midnight:"middernag",noon:"middaguur",morning:"oggend",afternoon:"middag",evening:"laat middag",night:"aand"}},P={narrow:{am:"vm",pm:"nm",midnight:"middernag",noon:"uur die middag",morning:"uur die oggend",afternoon:"uur die middag",evening:"uur die aand",night:"uur die aand"},abbreviated:{am:"vm",pm:"nm",midnight:"middernag",noon:"uur die middag",morning:"uur die oggend",afternoon:"uur die middag",evening:"uur die aand",night:"uur die aand"},wide:{am:"vm",pm:"nm",midnight:"middernag",noon:"uur die middag",morning:"uur die oggend",afternoon:"uur die middag",evening:"uur die aand",night:"uur die aand"}},D=e=>{const t=Number(e),a=t%100;if(a<20)switch(a){case 1:case 8:return t+"ste";default:return t+"de"}return t+"ste"},W={ordinalNumber:D,era:r({values:b,defaultWidth:"wide"}),quarter:r({values:y,defaultWidth:"wide",argumentCallback:e=>e-1}),month:r({values:M,defaultWidth:"wide"}),day:r({values:w,defaultWidth:"wide"}),dayPeriod:r({values:p,defaultWidth:"wide",formattingValues:P,defaultFormattingWidth:"wide"})},S=/^(\d+)(ste|de)?/i,k=/\d+/i,J={narrow:/^([vn]\.? ?C\.?)/,abbreviated:/^([vn]\. ?C\.?)/,wide:/^((voor|na) Christus)/},V={any:[/^v/,/^n/]},F={narrow:/^[1234]/i,abbreviated:/^K[1234]/i,wide:/^[1234](st|d)e kwartaal/i},A={any:[/1/i,/2/i,/3/i,/4/i]},C={narrow:/^[jfmasond]/i,abbreviated:/^(Jan|Feb|Mrt|Apr|Mei|Jun|Jul|Aug|Sep|Okt|Nov|Dec)\.?/i,wide:/^(Januarie|Februarie|Maart|April|Mei|Junie|Julie|Augustus|September|Oktober|November|Desember)/i},N={narrow:[/^J/i,/^F/i,/^M/i,/^A/i,/^M/i,/^J/i,/^J/i,/^A/i,/^S/i,/^O/i,/^N/i,/^D/i],any:[/^Jan/i,/^Feb/i,/^Mrt/i,/^Apr/i,/^Mei/i,/^Jun/i,/^Jul/i,/^Aug/i,/^Sep/i,/^Okt/i,/^Nov/i,/^Dec/i]},j={narrow:/^[smdwv]/i,short:/^(So|Ma|Di|Wo|Do|Vr|Sa)/i,abbreviated:/^(Son|Maa|Din|Woe|Don|Vry|Sat)/i,wide:/^(Sondag|Maandag|Dinsdag|Woensdag|Donderdag|Vrydag|Saterdag)/i},x={narrow:[/^S/i,/^M/i,/^D/i,/^W/i,/^D/i,/^V/i,/^S/i],any:[/^So/i,/^Ma/i,/^Di/i,/^Wo/i,/^Do/i,/^Vr/i,/^Sa/i]},H={any:/^(vm|nm|middernag|(?:uur )?die (oggend|middag|aand))/i},O={any:{am:/^vm/i,pm:/^nm/i,midnight:/^middernag/i,noon:/^middaguur/i,morning:/oggend/i,afternoon:/middag/i,evening:/laat middag/i,night:/aand/i}},z={ordinalNumber:m({matchPattern:S,parsePattern:k,valueCallback:e=>parseInt(e,10)}),era:i({matchPatterns:J,defaultMatchWidth:"wide",parsePatterns:V,defaultParseWidth:"any"}),quarter:i({matchPatterns:F,defaultMatchWidth:"wide",parsePatterns:A,defaultParseWidth:"any",valueCallback:e=>e+1}),month:i({matchPatterns:C,defaultMatchWidth:"wide",parsePatterns:N,defaultParseWidth:"any"}),day:i({matchPatterns:j,defaultMatchWidth:"wide",parsePatterns:x,defaultParseWidth:"any"}),dayPeriod:i({matchPatterns:H,defaultMatchWidth:"any",parsePatterns:O,defaultParseWidth:"any"})},R={code:"af",formatDistance:u,formatLong:h,formatRelative:v,localize:W,match:z,options:{weekStartsOn:0,firstWeekContainsDate:1}};export{R as af,R as default};