import{g as R}from"./index-B17mrEX6.js";import{e as k}from"./index.nxYwrlF1.entry.js";function S(u,f){for(var n=0;n<f.length;n++){const i=f[n];if(typeof i!="string"&&!Array.isArray(i)){for(const o in i)if(o!=="default"&&!(o in u)){const a=Object.getOwnPropertyDescriptor(i,o);a&&Object.defineProperty(u,o,a.get?a:{enumerable:!0,get:()=>i[o]})}}}return Object.freeze(Object.defineProperty(u,Symbol.toStringTag,{value:"Module"}))}var T={exports:{}};(function(u,f){(function(n){n(k())})(function(n){var i=["From","Sender","Reply-To","To","Cc","Bcc","Message-ID","In-Reply-To","References","Resent-From","Resent-Sender","Resent-To","Resent-Cc","Resent-Bcc","Resent-Message-ID","Return-Path","Received"],o=["Date","Subject","Comments","Keywords","Resent-Date"];n.registerHelper("hintWords","mbox",i.concat(o));var a=/^[ \t]/,m=/^From /,p=new RegExp("^("+i.join("|")+"): "),s=new RegExp("^("+o.join("|")+"): "),v=/^[^:]+:/,b=/^[^ ]+@[^ ]+/,H=/^.*?(?=[^ ]+?@[^ ]+)/,g=/^<.*?>/,h=/^.*?(?=<.*>)/;function x(e){return e==="Subject"?"header":"string"}function E(e,r){if(e.sol()){if(r.inSeparator=!1,r.inHeader&&e.match(a))return null;if(r.inHeader=!1,r.header=null,e.match(m))return r.inHeaders=!0,r.inSeparator=!0,"atom";var t,d=!1;return(t=e.match(s))||(d=!0)&&(t=e.match(p))?(r.inHeaders=!0,r.inHeader=!0,r.emailPermitted=d,r.header=t[1],"atom"):r.inHeaders&&(t=e.match(v))?(r.inHeader=!0,r.emailPermitted=!0,r.header=t[1],"atom"):(r.inHeaders=!1,e.skipToEnd(),null)}if(r.inSeparator)return e.match(b)?"link":(e.match(H)||e.skipToEnd(),"atom");if(r.inHeader){var l=x(r.header);if(r.emailPermitted){if(e.match(g))return l+" link";if(e.match(h))return l}return e.skipToEnd(),l}return e.skipToEnd(),null}n.defineMode("mbox",function(){return{startState:function(){return{inSeparator:!1,inHeader:!1,emailPermitted:!1,header:null,inHeaders:!1}},token:E,blankLine:function(e){e.inHeaders=e.inSeparator=e.inHeader=!1}}}),n.defineMIME("application/mbox","mbox")})})();var c=T.exports;const j=R(c),D=S({__proto__:null,default:j},[c]);export{D as m};