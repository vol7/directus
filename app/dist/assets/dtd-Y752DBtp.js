import{g as b}from"./index-B17mrEX6.js";import{e as v}from"./index.nxYwrlF1.entry.js";function y(f,d){for(var o=0;o<d.length;o++){const u=d[o];if(typeof u!="string"&&!Array.isArray(u)){for(const c in u)if(c!=="default"&&!(c in f)){const i=Object.getOwnPropertyDescriptor(u,c);i&&Object.defineProperty(f,c,i.get?i:{enumerable:!0,get:()=>u[c]})}}}return Object.freeze(Object.defineProperty(f,Symbol.toStringTag,{value:"Module"}))}var z={exports:{}};(function(f,d){(function(o){o(v())})(function(o){o.defineMode("dtd",function(u){var c=u.indentUnit,i;function l(r,e){return i=e,r}function a(r,e){var n=r.next();if(n=="<"&&r.eat("!")){if(r.eatWhile(/[\-]/))return e.tokenize=k,k(r,e);if(r.eatWhile(/[\w]/))return l("keyword","doindent")}else{if(n=="<"&&r.eat("?"))return e.tokenize=p("meta","?>"),l("meta",n);if(n=="#"&&r.eatWhile(/[\w]/))return l("atom","tag");if(n=="|")return l("keyword","separator");if(n.match(/[\(\)\[\]\-\.,\+\?>]/))return l(null,n);if(n.match(/[\[\]]/))return l("rule",n);if(n=='"'||n=="'")return e.tokenize=h(n),e.tokenize(r,e);if(r.eatWhile(/[a-zA-Z\?\+\d]/)){var t=r.current();return t.substr(t.length-1,t.length).match(/\?|\+/)!==null&&r.backUp(1),l("tag","tag")}else return n=="%"||n=="*"?l("number","number"):(r.eatWhile(/[\w\\\-_%.{,]/),l(null,null))}}function k(r,e){for(var n=0,t;(t=r.next())!=null;){if(n>=2&&t==">"){e.tokenize=a;break}n=t=="-"?n+1:0}return l("comment","comment")}function h(r){return function(e,n){for(var t=!1,s;(s=e.next())!=null;){if(s==r&&!t){n.tokenize=a;break}t=!t&&s=="\\"}return l("string","tag")}}function p(r,e){return function(n,t){for(;!n.eol();){if(n.match(e)){t.tokenize=a;break}n.next()}return r}}return{startState:function(r){return{tokenize:a,baseIndent:r||0,stack:[]}},token:function(r,e){if(r.eatSpace())return null;var n=e.tokenize(r,e),t=e.stack[e.stack.length-1];return r.current()=="["||i==="doindent"||i=="["?e.stack.push("rule"):i==="endtag"?e.stack[e.stack.length-1]="endtag":r.current()=="]"||i=="]"||i==">"&&t=="rule"?e.stack.pop():i=="["&&e.stack.push("["),n},indent:function(r,e){var n=r.stack.length;return e.charAt(0)==="]"?n--:e.substr(e.length-1,e.length)===">"&&(e.substr(0,1)==="<"||i=="doindent"&&e.length>1||(i=="doindent"?n--:i==">"&&e.length>1||i=="tag"&&e!==">"||(i=="tag"&&r.stack[r.stack.length-1]=="rule"?n--:i=="tag"?n++:e===">"&&r.stack[r.stack.length-1]=="rule"&&i===">"?n--:e===">"&&r.stack[r.stack.length-1]=="rule"||(e.substr(0,1)!=="<"&&e.substr(0,1)===">"?n=n-1:e===">"||(n=n-1)))),(i==null||i=="]")&&n--),r.baseIndent+n*c},electricChars:"]>"}}),o.defineMIME("application/xml-dtd","dtd")})})();var g=z.exports;const m=b(g),_=y({__proto__:null,default:m},[g]);export{_ as d};
