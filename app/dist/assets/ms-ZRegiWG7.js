import{c as m,b as n,i as s,j as i}from"./index.nxYwrlF1.entry.js";import"./vue.runtime.esm-bundler-CFNbZJFY.js";import"./runtime-core.esm-bundler-BEmyk2t3.js";import"./index-B17mrEX6.js";import"./pinia.Zyw_3jCb.entry.js";import"./vue-i18n.DYnCnalz.entry.js";import"./vue-router.BHRcAWRs.entry.js";const h={lessThanXSeconds:{one:"kurang dari 1 saat",other:"kurang dari {{count}} saat"},xSeconds:{one:"1 saat",other:"{{count}} saat"},halfAMinute:"setengah minit",lessThanXMinutes:{one:"kurang dari 1 minit",other:"kurang dari {{count}} minit"},xMinutes:{one:"1 minit",other:"{{count}} minit"},aboutXHours:{one:"sekitar 1 jam",other:"sekitar {{count}} jam"},xHours:{one:"1 jam",other:"{{count}} jam"},xDays:{one:"1 hari",other:"{{count}} hari"},aboutXWeeks:{one:"sekitar 1 minggu",other:"sekitar {{count}} minggu"},xWeeks:{one:"1 minggu",other:"{{count}} minggu"},aboutXMonths:{one:"sekitar 1 bulan",other:"sekitar {{count}} bulan"},xMonths:{one:"1 bulan",other:"{{count}} bulan"},aboutXYears:{one:"sekitar 1 tahun",other:"sekitar {{count}} tahun"},xYears:{one:"1 tahun",other:"{{count}} tahun"},overXYears:{one:"lebih dari 1 tahun",other:"lebih dari {{count}} tahun"},almostXYears:{one:"hampir 1 tahun",other:"hampir {{count}} tahun"}},u=(a,r,t)=>{let e;const o=h[a];return typeof o=="string"?e=o:r===1?e=o.one:e=o.other.replace("{{count}}",String(r)),t!=null&&t.addSuffix?t.comparison&&t.comparison>0?"dalam masa "+e:e+" yang lalu":e},d={full:"EEEE, d MMMM yyyy",long:"d MMMM yyyy",medium:"d MMM yyyy",short:"d/M/yyyy"},l={full:"HH.mm.ss",long:"HH.mm.ss",medium:"HH.mm",short:"HH.mm"},g={full:"{{date}} 'pukul' {{time}}",long:"{{date}} 'pukul' {{time}}",medium:"{{date}}, {{time}}",short:"{{date}}, {{time}}"},c={date:m({formats:d,defaultWidth:"full"}),time:m({formats:l,defaultWidth:"full"}),dateTime:m({formats:g,defaultWidth:"full"})},p={lastWeek:"eeee 'lepas pada jam' p",yesterday:"'Semalam pada jam' p",today:"'Hari ini pada jam' p",tomorrow:"'Esok pada jam' p",nextWeek:"eeee 'pada jam' p",other:"P"},b=(a,r,t,e)=>p[a],f={narrow:["SM","M"],abbreviated:["SM","M"],wide:["Sebelum Masihi","Masihi"]},k={narrow:["1","2","3","4"],abbreviated:["S1","S2","S3","S4"],wide:["Suku pertama","Suku kedua","Suku ketiga","Suku keempat"]},y={narrow:["J","F","M","A","M","J","J","O","S","O","N","D"],abbreviated:["Jan","Feb","Mac","Apr","Mei","Jun","Jul","Ogo","Sep","Okt","Nov","Dis"],wide:["Januari","Februari","Mac","April","Mei","Jun","Julai","Ogos","September","Oktober","November","Disember"]},M={narrow:["A","I","S","R","K","J","S"],short:["Ahd","Isn","Sel","Rab","Kha","Jum","Sab"],abbreviated:["Ahd","Isn","Sel","Rab","Kha","Jum","Sab"],wide:["Ahad","Isnin","Selasa","Rabu","Khamis","Jumaat","Sabtu"]},P={narrow:{am:"am",pm:"pm",midnight:"tgh malam",noon:"tgh hari",morning:"pagi",afternoon:"tengah hari",evening:"petang",night:"malam"},abbreviated:{am:"AM",pm:"PM",midnight:"tengah malam",noon:"tengah hari",morning:"pagi",afternoon:"tengah hari",evening:"petang",night:"malam"},wide:{am:"a.m.",pm:"p.m.",midnight:"tengah malam",noon:"tengah hari",morning:"pagi",afternoon:"tengah hari",evening:"petang",night:"malam"}},w={narrow:{am:"am",pm:"pm",midnight:"tengah malam",noon:"tengah hari",morning:"pagi",afternoon:"tengah hari",evening:"petang",night:"malam"},abbreviated:{am:"AM",pm:"PM",midnight:"tengah malam",noon:"tengah hari",morning:"pagi",afternoon:"tengah hari",evening:"petang",night:"malam"},wide:{am:"a.m.",pm:"p.m.",midnight:"tengah malam",noon:"tengah hari",morning:"pagi",afternoon:"tengah hari",evening:"petang",night:"malam"}},v=(a,r)=>"ke-"+Number(a),S={ordinalNumber:v,era:n({values:f,defaultWidth:"wide"}),quarter:n({values:k,defaultWidth:"wide",argumentCallback:a=>a-1}),month:n({values:y,defaultWidth:"wide"}),day:n({values:M,defaultWidth:"wide"}),dayPeriod:n({values:P,defaultWidth:"wide",formattingValues:w,defaultFormattingWidth:"wide"})},j=/^ke-(\d+)?/i,W=/petama|\d+/i,D={narrow:/^(sm|m)/i,abbreviated:/^(s\.?\s?m\.?|m\.?)/i,wide:/^(sebelum masihi|masihi)/i},J={any:[/^s/i,/^(m)/i]},F={narrow:/^[1234]/i,abbreviated:/^S[1234]/i,wide:/Suku (pertama|kedua|ketiga|keempat)/i},H={any:[/pertama|1/i,/kedua|2/i,/ketiga|3/i,/keempat|4/i]},x={narrow:/^[jfmasond]/i,abbreviated:/^(jan|feb|mac|apr|mei|jun|jul|ogo|sep|okt|nov|dis)/i,wide:/^(januari|februari|mac|april|mei|jun|julai|ogos|september|oktober|november|disember)/i},A={narrow:[/^j/i,/^f/i,/^m/i,/^a/i,/^m/i,/^j/i,/^j/i,/^o/i,/^s/i,/^o/i,/^n/i,/^d/i],any:[/^ja/i,/^f/i,/^ma/i,/^ap/i,/^me/i,/^jun/i,/^jul/i,/^og/i,/^s/i,/^ok/i,/^n/i,/^d/i]},O={narrow:/^[aisrkj]/i,short:/^(ahd|isn|sel|rab|kha|jum|sab)/i,abbreviated:/^(ahd|isn|sel|rab|kha|jum|sab)/i,wide:/^(ahad|isnin|selasa|rabu|khamis|jumaat|sabtu)/i},N={narrow:[/^a/i,/^i/i,/^s/i,/^r/i,/^k/i,/^j/i,/^s/i],any:[/^a/i,/^i/i,/^se/i,/^r/i,/^k/i,/^j/i,/^sa/i]},V={narrow:/^(am|pm|tengah malam|tengah hari|pagi|petang|malam)/i,any:/^([ap]\.?\s?m\.?|tengah malam|tengah hari|pagi|petang|malam)/i},X={any:{am:/^a/i,pm:/^pm/i,midnight:/^tengah m/i,noon:/^tengah h/i,morning:/pa/i,afternoon:/tengah h/i,evening:/pe/i,night:/m/i}},E={ordinalNumber:s({matchPattern:j,parsePattern:W,valueCallback:a=>parseInt(a,10)}),era:i({matchPatterns:D,defaultMatchWidth:"wide",parsePatterns:J,defaultParseWidth:"any"}),quarter:i({matchPatterns:F,defaultMatchWidth:"wide",parsePatterns:H,defaultParseWidth:"any",valueCallback:a=>a+1}),month:i({matchPatterns:x,defaultMatchWidth:"wide",parsePatterns:A,defaultParseWidth:"any"}),day:i({matchPatterns:O,defaultMatchWidth:"wide",parsePatterns:N,defaultParseWidth:"any"}),dayPeriod:i({matchPatterns:V,defaultMatchWidth:"any",parsePatterns:X,defaultParseWidth:"any"})},_={code:"ms",formatDistance:u,formatLong:c,formatRelative:b,localize:S,match:E,options:{weekStartsOn:1,firstWeekContainsDate:1}};export{_ as default,_ as ms};