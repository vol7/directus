import{i as $,c as T,u as Y,s as it,o as at,a as lt,b as ut,d as ze,r as ft,h as Ue,p as le,e as ht,w as pt,f as dt,n as mt}from"./runtime-core.esm-bundler-BEmyk2t3.js";/*!
  * vue-router v4.3.2
  * (c) 2024 Eduardo San Martin Morote
  * @license MIT
  */const z=typeof document<"u";function Ke(e){return e.__esModule||e[Symbol.toStringTag]==="Module"}const S=Object.assign;function ue(e,t){const n={};for(const r in t){const o=t[r];n[r]=L(o)?o.map(e):e(o)}return n}const X=()=>{},L=Array.isArray,Ve=/#/g,gt=/&/g,vt=/\//g,yt=/=/g,Rt=/\?/g,De=/\+/g,Et=/%5B/g,Pt=/%5D/g,Qe=/%5E/g,wt=/%60/g,We=/%7B/g,St=/%7C/g,Fe=/%7D/g,Ct=/%20/g;function ve(e){return encodeURI(""+e).replace(St,"|").replace(Et,"[").replace(Pt,"]")}function kt(e){return ve(e).replace(We,"{").replace(Fe,"}").replace(Qe,"^")}function de(e){return ve(e).replace(De,"%2B").replace(Ct,"+").replace(Ve,"%23").replace(gt,"%26").replace(wt,"`").replace(We,"{").replace(Fe,"}").replace(Qe,"^")}function bt(e){return de(e).replace(yt,"%3D")}function At(e){return ve(e).replace(Ve,"%23").replace(Rt,"%3F")}function Ot(e){return e==null?"":At(e).replace(vt,"%2F")}function Z(e){try{return decodeURIComponent(""+e)}catch{}return""+e}const _t=/\/$/,xt=e=>e.replace(_t,"");function fe(e,t,n="/"){let r,o={},l="",h="";const p=t.indexOf("#");let i=t.indexOf("?");return p<i&&p>=0&&(i=-1),i>-1&&(r=t.slice(0,i),l=t.slice(i+1,p>-1?p:t.length),o=e(l)),p>-1&&(r=r||t.slice(0,p),h=t.slice(p,t.length)),r=Nt(r??t,n),{fullPath:r+(l&&"?")+l+h,path:r,query:o,hash:Z(h)}}function Mt(e,t){const n=t.query?e(t.query):"";return t.path+(n&&"?")+n+(t.hash||"")}function be(e,t){return!t||!e.toLowerCase().startsWith(t.toLowerCase())?e:e.slice(t.length)||"/"}function Lt(e,t,n){const r=t.matched.length-1,o=n.matched.length-1;return r>-1&&r===o&&U(t.matched[r],n.matched[o])&&Ye(t.params,n.params)&&e(t.query)===e(n.query)&&t.hash===n.hash}function U(e,t){return(e.aliasOf||e)===(t.aliasOf||t)}function Ye(e,t){if(Object.keys(e).length!==Object.keys(t).length)return!1;for(const n in e)if(!Tt(e[n],t[n]))return!1;return!0}function Tt(e,t){return L(e)?Ae(e,t):L(t)?Ae(t,e):e===t}function Ae(e,t){return L(t)?e.length===t.length&&e.every((n,r)=>n===t[r]):e.length===1&&e[0]===t}function Nt(e,t){if(e.startsWith("/"))return e;if(!e)return t;const n=t.split("/"),r=e.split("/"),o=r[r.length-1];(o===".."||o===".")&&r.push("");let l=n.length-1,h,p;for(h=0;h<r.length;h++)if(p=r[h],p!==".")if(p==="..")l>1&&l--;else break;return n.slice(0,l).join("/")+"/"+r.slice(h).join("/")}var K;(function(e){e.pop="pop",e.push="push"})(K||(K={}));var G;(function(e){e.back="back",e.forward="forward",e.unknown=""})(G||(G={}));const he="";function Xe(e){if(!e)if(z){const t=document.querySelector("base");e=t&&t.getAttribute("href")||"/",e=e.replace(/^\w+:\/\/[^\/]+/,"")}else e="/";return e[0]!=="/"&&e[0]!=="#"&&(e="/"+e),xt(e)}const jt=/^[^#]+#/;function Ze(e,t){return e.replace(jt,"#")+t}function $t(e,t){const n=document.documentElement.getBoundingClientRect(),r=e.getBoundingClientRect();return{behavior:t.behavior,left:r.left-n.left-(t.left||0),top:r.top-n.top-(t.top||0)}}const te=()=>({left:window.scrollX,top:window.scrollY});function Ht(e){let t;if("el"in e){const n=e.el,r=typeof n=="string"&&n.startsWith("#"),o=typeof n=="string"?r?document.getElementById(n.slice(1)):document.querySelector(n):n;if(!o)return;t=$t(o,e)}else t=e;"scrollBehavior"in document.documentElement.style?window.scrollTo(t):window.scrollTo(t.left!=null?t.left:window.scrollX,t.top!=null?t.top:window.scrollY)}function Oe(e,t){return(history.state?history.state.position-t:-1)+e}const me=new Map;function It(e,t){me.set(e,t)}function Bt(e){const t=me.get(e);return me.delete(e),t}let Gt=()=>location.protocol+"//"+location.host;function Je(e,t){const{pathname:n,search:r,hash:o}=t,l=e.indexOf("#");if(l>-1){let p=o.includes(e.slice(l))?e.slice(l).length:1,i=o.slice(p);return i[0]!=="/"&&(i="/"+i),be(i,"")}return be(n,e)+r+o}function qt(e,t,n,r){let o=[],l=[],h=null;const p=({state:a})=>{const g=Je(e,location),R=n.value,b=t.value;let k=0;if(a){if(n.value=g,t.value=a,h&&h===R){h=null;return}k=b?a.position-b.position:0}else r(g);o.forEach(E=>{E(n.value,R,{delta:k,type:K.pop,direction:k?k>0?G.forward:G.back:G.unknown})})};function i(){h=n.value}function f(a){o.push(a);const g=()=>{const R=o.indexOf(a);R>-1&&o.splice(R,1)};return l.push(g),g}function s(){const{history:a}=window;a.state&&a.replaceState(S({},a.state,{scroll:te()}),"")}function u(){for(const a of l)a();l=[],window.removeEventListener("popstate",p),window.removeEventListener("beforeunload",s)}return window.addEventListener("popstate",p),window.addEventListener("beforeunload",s,{passive:!0}),{pauseListeners:i,listen:f,destroy:u}}function _e(e,t,n,r=!1,o=!1){return{back:e,current:t,forward:n,replaced:r,position:window.history.length,scroll:o?te():null}}function zt(e){const{history:t,location:n}=window,r={value:Je(e,n)},o={value:t.state};o.value||l(r.value,{back:null,current:r.value,forward:null,position:t.length-1,replaced:!0,scroll:null},!0);function l(i,f,s){const u=e.indexOf("#"),a=u>-1?(n.host&&document.querySelector("base")?e:e.slice(u))+i:Gt()+e+i;try{t[s?"replaceState":"pushState"](f,"",a),o.value=f}catch(g){console.error(g),n[s?"replace":"assign"](a)}}function h(i,f){const s=S({},t.state,_e(o.value.back,i,o.value.forward,!0),f,{position:o.value.position});l(i,s,!0),r.value=i}function p(i,f){const s=S({},o.value,t.state,{forward:i,scroll:te()});l(s.current,s,!0);const u=S({},_e(r.value,i,null),{position:s.position+1},f);l(i,u,!1),r.value=i}return{location:r,state:o,push:p,replace:h}}function Ut(e){e=Xe(e);const t=zt(e),n=qt(e,t.state,t.location,t.replace);function r(l,h=!0){h||n.pauseListeners(),history.go(l)}const o=S({location:"",base:e,go:r,createHref:Ze.bind(null,e)},t,n);return Object.defineProperty(o,"location",{enumerable:!0,get:()=>t.location.value}),Object.defineProperty(o,"state",{enumerable:!0,get:()=>t.state.value}),o}function gn(e=""){let t=[],n=[he],r=0;e=Xe(e);function o(p){r++,r!==n.length&&n.splice(r),n.push(p)}function l(p,i,{direction:f,delta:s}){const u={direction:f,delta:s,type:K.pop};for(const a of t)a(p,i,u)}const h={location:he,state:{},base:e,createHref:Ze.bind(null,e),replace(p){n.splice(r--,1),o(p)},push(p,i){o(p)},listen(p){return t.push(p),()=>{const i=t.indexOf(p);i>-1&&t.splice(i,1)}},destroy(){t=[],n=[he],r=0},go(p,i=!0){const f=this.location,s=p<0?G.back:G.forward;r=Math.max(0,Math.min(r+p,n.length-1)),i&&l(this.location,f,{direction:s,delta:p})}};return Object.defineProperty(h,"location",{enumerable:!0,get:()=>n[r]}),h}function vn(e){return e=location.host?e||location.pathname+location.search:"",e.includes("#")||(e+="#"),Ut(e)}function Kt(e){return typeof e=="string"||e&&typeof e=="object"}function et(e){return typeof e=="string"||typeof e=="symbol"}const H={path:"/",name:void 0,params:{},query:{},hash:"",fullPath:"/",matched:[],meta:{},redirectedFrom:void 0},tt=Symbol("");var xe;(function(e){e[e.aborted=4]="aborted",e[e.cancelled=8]="cancelled",e[e.duplicated=16]="duplicated"})(xe||(xe={}));function V(e,t){return S(new Error,{type:e,[tt]:!0},t)}function j(e,t){return e instanceof Error&&tt in e&&(t==null||!!(e.type&t))}const Me="[^/]+?",Vt={sensitive:!1,strict:!1,start:!0,end:!0},Dt=/[.+*?^${}()[\]/\\]/g;function Qt(e,t){const n=S({},Vt,t),r=[];let o=n.start?"^":"";const l=[];for(const f of e){const s=f.length?[]:[90];n.strict&&!f.length&&(o+="/");for(let u=0;u<f.length;u++){const a=f[u];let g=40+(n.sensitive?.25:0);if(a.type===0)u||(o+="/"),o+=a.value.replace(Dt,"\\$&"),g+=40;else if(a.type===1){const{value:R,repeatable:b,optional:k,regexp:E}=a;l.push({name:R,repeatable:b,optional:k});const P=E||Me;if(P!==Me){g+=10;try{new RegExp(`(${P})`)}catch(M){throw new Error(`Invalid custom RegExp for param "${R}" (${P}): `+M.message)}}let _=b?`((?:${P})(?:/(?:${P}))*)`:`(${P})`;u||(_=k&&f.length<2?`(?:/${_})`:"/"+_),k&&(_+="?"),o+=_,g+=20,k&&(g+=-8),b&&(g+=-20),P===".*"&&(g+=-50)}s.push(g)}r.push(s)}if(n.strict&&n.end){const f=r.length-1;r[f][r[f].length-1]+=.7000000000000001}n.strict||(o+="/?"),n.end?o+="$":n.strict&&(o+="(?:/|$)");const h=new RegExp(o,n.sensitive?"":"i");function p(f){const s=f.match(h),u={};if(!s)return null;for(let a=1;a<s.length;a++){const g=s[a]||"",R=l[a-1];u[R.name]=g&&R.repeatable?g.split("/"):g}return u}function i(f){let s="",u=!1;for(const a of e){(!u||!s.endsWith("/"))&&(s+="/"),u=!1;for(const g of a)if(g.type===0)s+=g.value;else if(g.type===1){const{value:R,repeatable:b,optional:k}=g,E=R in f?f[R]:"";if(L(E)&&!b)throw new Error(`Provided param "${R}" is an array but it is not repeatable (* or + modifiers)`);const P=L(E)?E.join("/"):E;if(!P)if(k)a.length<2&&(s.endsWith("/")?s=s.slice(0,-1):u=!0);else throw new Error(`Missing required param "${R}"`);s+=P}}return s||"/"}return{re:h,score:r,keys:l,parse:p,stringify:i}}function Wt(e,t){let n=0;for(;n<e.length&&n<t.length;){const r=t[n]-e[n];if(r)return r;n++}return e.length<t.length?e.length===1&&e[0]===80?-1:1:e.length>t.length?t.length===1&&t[0]===80?1:-1:0}function Ft(e,t){let n=0;const r=e.score,o=t.score;for(;n<r.length&&n<o.length;){const l=Wt(r[n],o[n]);if(l)return l;n++}if(Math.abs(o.length-r.length)===1){if(Le(r))return 1;if(Le(o))return-1}return o.length-r.length}function Le(e){const t=e[e.length-1];return e.length>0&&t[t.length-1]<0}const Yt={type:0,value:""},Xt=/[a-zA-Z0-9_]/;function Zt(e){if(!e)return[[]];if(e==="/")return[[Yt]];if(!e.startsWith("/"))throw new Error(`Invalid path "${e}"`);function t(g){throw new Error(`ERR (${n})/"${f}": ${g}`)}let n=0,r=n;const o=[];let l;function h(){l&&o.push(l),l=[]}let p=0,i,f="",s="";function u(){f&&(n===0?l.push({type:0,value:f}):n===1||n===2||n===3?(l.length>1&&(i==="*"||i==="+")&&t(`A repeatable param (${f}) must be alone in its segment. eg: '/:ids+.`),l.push({type:1,value:f,regexp:s,repeatable:i==="*"||i==="+",optional:i==="*"||i==="?"})):t("Invalid state to consume buffer"),f="")}function a(){f+=i}for(;p<e.length;){if(i=e[p++],i==="\\"&&n!==2){r=n,n=4;continue}switch(n){case 0:i==="/"?(f&&u(),h()):i===":"?(u(),n=1):a();break;case 4:a(),n=r;break;case 1:i==="("?n=2:Xt.test(i)?a():(u(),n=0,i!=="*"&&i!=="?"&&i!=="+"&&p--);break;case 2:i===")"?s[s.length-1]=="\\"?s=s.slice(0,-1)+i:n=3:s+=i;break;case 3:u(),n=0,i!=="*"&&i!=="?"&&i!=="+"&&p--,s="";break;default:t("Unknown state");break}}return n===2&&t(`Unfinished custom RegExp for param "${f}"`),u(),h(),o}function Jt(e,t,n){const r=Qt(Zt(e.path),n),o=S(r,{record:e,parent:t,children:[],alias:[]});return t&&!o.record.aliasOf==!t.record.aliasOf&&t.children.push(o),o}function en(e,t){const n=[],r=new Map;t=je({strict:!1,end:!0,sensitive:!1},t);function o(s){return r.get(s)}function l(s,u,a){const g=!a,R=tn(s);R.aliasOf=a&&a.record;const b=je(t,s),k=[R];if("alias"in s){const _=typeof s.alias=="string"?[s.alias]:s.alias;for(const M of _)k.push(S({},R,{components:a?a.record.components:R.components,path:M,aliasOf:a?a.record:R}))}let E,P;for(const _ of k){const{path:M}=_;if(u&&M[0]!=="/"){const B=u.record.path,N=B[B.length-1]==="/"?"":"/";_.path=u.record.path+(M&&N+M)}if(E=Jt(_,u,b),a?a.alias.push(E):(P=P||E,P!==E&&P.alias.push(E),g&&s.name&&!Ne(E)&&h(s.name)),R.children){const B=R.children;for(let N=0;N<B.length;N++)l(B[N],E,a&&a.children[N])}a=a||E,(E.record.components&&Object.keys(E.record.components).length||E.record.name||E.record.redirect)&&i(E)}return P?()=>{h(P)}:X}function h(s){if(et(s)){const u=r.get(s);u&&(r.delete(s),n.splice(n.indexOf(u),1),u.children.forEach(h),u.alias.forEach(h))}else{const u=n.indexOf(s);u>-1&&(n.splice(u,1),s.record.name&&r.delete(s.record.name),s.children.forEach(h),s.alias.forEach(h))}}function p(){return n}function i(s){let u=0;for(;u<n.length&&Ft(s,n[u])>=0&&(s.record.path!==n[u].record.path||!nt(s,n[u]));)u++;n.splice(u,0,s),s.record.name&&!Ne(s)&&r.set(s.record.name,s)}function f(s,u){let a,g={},R,b;if("name"in s&&s.name){if(a=r.get(s.name),!a)throw V(1,{location:s});b=a.record.name,g=S(Te(u.params,a.keys.filter(P=>!P.optional).concat(a.parent?a.parent.keys.filter(P=>P.optional):[]).map(P=>P.name)),s.params&&Te(s.params,a.keys.map(P=>P.name))),R=a.stringify(g)}else if(s.path!=null)R=s.path,a=n.find(P=>P.re.test(R)),a&&(g=a.parse(R),b=a.record.name);else{if(a=u.name?r.get(u.name):n.find(P=>P.re.test(u.path)),!a)throw V(1,{location:s,currentLocation:u});b=a.record.name,g=S({},u.params,s.params),R=a.stringify(g)}const k=[];let E=a;for(;E;)k.unshift(E.record),E=E.parent;return{name:b,path:R,params:g,matched:k,meta:rn(k)}}return e.forEach(s=>l(s)),{addRoute:l,resolve:f,removeRoute:h,getRoutes:p,getRecordMatcher:o}}function Te(e,t){const n={};for(const r of t)r in e&&(n[r]=e[r]);return n}function tn(e){return{path:e.path,redirect:e.redirect,name:e.name,meta:e.meta||{},aliasOf:void 0,beforeEnter:e.beforeEnter,props:nn(e),children:e.children||[],instances:{},leaveGuards:new Set,updateGuards:new Set,enterCallbacks:{},components:"components"in e?e.components||null:e.component&&{default:e.component}}}function nn(e){const t={},n=e.props||!1;if("component"in e)t.default=n;else for(const r in e.components)t[r]=typeof n=="object"?n[r]:n;return t}function Ne(e){for(;e;){if(e.record.aliasOf)return!0;e=e.parent}return!1}function rn(e){return e.reduce((t,n)=>S(t,n.meta),{})}function je(e,t){const n={};for(const r in e)n[r]=r in t?t[r]:e[r];return n}function nt(e,t){return t.children.some(n=>n===e||nt(e,n))}function on(e){const t={};if(e===""||e==="?")return t;const r=(e[0]==="?"?e.slice(1):e).split("&");for(let o=0;o<r.length;++o){const l=r[o].replace(De," "),h=l.indexOf("="),p=Z(h<0?l:l.slice(0,h)),i=h<0?null:Z(l.slice(h+1));if(p in t){let f=t[p];L(f)||(f=t[p]=[f]),f.push(i)}else t[p]=i}return t}function $e(e){let t="";for(let n in e){const r=e[n];if(n=bt(n),r==null){r!==void 0&&(t+=(t.length?"&":"")+n);continue}(L(r)?r.map(l=>l&&de(l)):[r&&de(r)]).forEach(l=>{l!==void 0&&(t+=(t.length?"&":"")+n,l!=null&&(t+="="+l))})}return t}function sn(e){const t={};for(const n in e){const r=e[n];r!==void 0&&(t[n]=L(r)?r.map(o=>o==null?null:""+o):r==null?r:""+r)}return t}const ye=Symbol(""),He=Symbol(""),ne=Symbol(""),Re=Symbol(""),ge=Symbol("");function F(){let e=[];function t(r){return e.push(r),()=>{const o=e.indexOf(r);o>-1&&e.splice(o,1)}}function n(){e=[]}return{add:t,list:()=>e.slice(),reset:n}}function rt(e,t,n){const r=()=>{e[t].delete(n)};at(r),lt(r),ut(()=>{e[t].add(n)}),e[t].add(n)}function yn(e){const t=$(ye,{}).value;t&&rt(t,"leaveGuards",e)}function Rn(e){const t=$(ye,{}).value;t&&rt(t,"updateGuards",e)}function I(e,t,n,r,o,l=h=>h()){const h=r&&(r.enterCallbacks[o]=r.enterCallbacks[o]||[]);return()=>new Promise((p,i)=>{const f=a=>{a===!1?i(V(4,{from:n,to:t})):a instanceof Error?i(a):Kt(a)?i(V(2,{from:t,to:a})):(h&&r.enterCallbacks[o]===h&&typeof a=="function"&&h.push(a),p())},s=l(()=>e.call(r&&r.instances[o],t,n,f));let u=Promise.resolve(s);e.length<3&&(u=u.then(f)),u.catch(a=>i(a))})}function pe(e,t,n,r,o=l=>l()){const l=[];for(const h of e)for(const p in h.components){let i=h.components[p];if(!(t!=="beforeRouteEnter"&&!h.instances[p]))if(cn(i)){const s=(i.__vccOpts||i)[t];s&&l.push(I(s,n,r,h,p,o))}else{let f=i();l.push(()=>f.then(s=>{if(!s)return Promise.reject(new Error(`Couldn't resolve component "${p}" at "${h.path}"`));const u=Ke(s)?s.default:s;h.components[p]=u;const g=(u.__vccOpts||u)[t];return g&&I(g,n,r,h,p,o)()}))}}return l}function cn(e){return typeof e=="object"||"displayName"in e||"props"in e||"__vccOpts"in e}function En(e){return e.matched.every(t=>t.redirect)?Promise.reject(new Error("Cannot load a route that redirects.")):Promise.all(e.matched.map(t=>t.components&&Promise.all(Object.keys(t.components).reduce((n,r)=>{const o=t.components[r];return typeof o=="function"&&!("displayName"in o)&&n.push(o().then(l=>{if(!l)return Promise.reject(new Error(`Couldn't resolve component "${r}" at "${t.path}". Ensure you passed a function that returns a promise.`));const h=Ke(l)?l.default:l;t.components[r]=h})),n},[])))).then(()=>e)}function Ie(e){const t=$(ne),n=$(Re),r=T(()=>{const i=Y(e.to);return t.resolve(i)}),o=T(()=>{const{matched:i}=r.value,{length:f}=i,s=i[f-1],u=n.matched;if(!s||!u.length)return-1;const a=u.findIndex(U.bind(null,s));if(a>-1)return a;const g=Be(i[f-2]);return f>1&&Be(s)===g&&u[u.length-1].path!==g?u.findIndex(U.bind(null,i[f-2])):a}),l=T(()=>o.value>-1&&fn(n.params,r.value.params)),h=T(()=>o.value>-1&&o.value===n.matched.length-1&&Ye(n.params,r.value.params));function p(i={}){return un(i)?t[Y(e.replace)?"replace":"push"](Y(e.to)).catch(X):Promise.resolve()}return{route:r,href:T(()=>r.value.href),isActive:l,isExactActive:h,navigate:p}}const an=ze({name:"RouterLink",compatConfig:{MODE:3},props:{to:{type:[String,Object],required:!0},replace:Boolean,activeClass:String,exactActiveClass:String,custom:Boolean,ariaCurrentValue:{type:String,default:"page"}},useLink:Ie,setup(e,{slots:t}){const n=ft(Ie(e)),{options:r}=$(ne),o=T(()=>({[Ge(e.activeClass,r.linkActiveClass,"router-link-active")]:n.isActive,[Ge(e.exactActiveClass,r.linkExactActiveClass,"router-link-exact-active")]:n.isExactActive}));return()=>{const l=t.default&&t.default(n);return e.custom?l:Ue("a",{"aria-current":n.isExactActive?e.ariaCurrentValue:null,href:n.href,onClick:n.navigate,class:o.value},l)}}}),ln=an;function un(e){if(!(e.metaKey||e.altKey||e.ctrlKey||e.shiftKey)&&!e.defaultPrevented&&!(e.button!==void 0&&e.button!==0)){if(e.currentTarget&&e.currentTarget.getAttribute){const t=e.currentTarget.getAttribute("target");if(/\b_blank\b/i.test(t))return}return e.preventDefault&&e.preventDefault(),!0}}function fn(e,t){for(const n in t){const r=t[n],o=e[n];if(typeof r=="string"){if(r!==o)return!1}else if(!L(o)||o.length!==r.length||r.some((l,h)=>l!==o[h]))return!1}return!0}function Be(e){return e?e.aliasOf?e.aliasOf.path:e.path:""}const Ge=(e,t,n)=>e??t??n,hn=ze({name:"RouterView",inheritAttrs:!1,props:{name:{type:String,default:"default"},route:Object},compatConfig:{MODE:3},setup(e,{attrs:t,slots:n}){const r=$(ge),o=T(()=>e.route||r.value),l=$(He,0),h=T(()=>{let f=Y(l);const{matched:s}=o.value;let u;for(;(u=s[f])&&!u.components;)f++;return f}),p=T(()=>o.value.matched[h.value]);le(He,T(()=>h.value+1)),le(ye,p),le(ge,o);const i=ht();return pt(()=>[i.value,p.value,e.name],([f,s,u],[a,g,R])=>{s&&(s.instances[u]=f,g&&g!==s&&f&&f===a&&(s.leaveGuards.size||(s.leaveGuards=g.leaveGuards),s.updateGuards.size||(s.updateGuards=g.updateGuards))),f&&s&&(!g||!U(s,g)||!a)&&(s.enterCallbacks[u]||[]).forEach(b=>b(f))},{flush:"post"}),()=>{const f=o.value,s=e.name,u=p.value,a=u&&u.components[s];if(!a)return qe(n.default,{Component:a,route:f});const g=u.props[s],R=g?g===!0?f.params:typeof g=="function"?g(f):g:null,k=Ue(a,S({},R,t,{onVnodeUnmounted:E=>{E.component.isUnmounted&&(u.instances[s]=null)},ref:i}));return qe(n.default,{Component:k,route:f})||k}}});function qe(e,t){if(!e)return null;const n=e(t);return n.length===1?n[0]:n}const pn=hn;function Pn(e){const t=en(e.routes,e),n=e.parseQuery||on,r=e.stringifyQuery||$e,o=e.history,l=F(),h=F(),p=F(),i=it(H);let f=H;z&&e.scrollBehavior&&"scrollRestoration"in history&&(history.scrollRestoration="manual");const s=ue.bind(null,c=>""+c),u=ue.bind(null,Ot),a=ue.bind(null,Z);function g(c,m){let d,v;return et(c)?(d=t.getRecordMatcher(c),v=m):v=c,t.addRoute(v,d)}function R(c){const m=t.getRecordMatcher(c);m&&t.removeRoute(m)}function b(){return t.getRoutes().map(c=>c.record)}function k(c){return!!t.getRecordMatcher(c)}function E(c,m){if(m=S({},m||i.value),typeof c=="string"){const y=fe(n,c,m.path),O=t.resolve({path:y.path},m),W=o.createHref(y.fullPath);return S(y,O,{params:a(O.params),hash:Z(y.hash),redirectedFrom:void 0,href:W})}let d;if(c.path!=null)d=S({},c,{path:fe(n,c.path,m.path).path});else{const y=S({},c.params);for(const O in y)y[O]==null&&delete y[O];d=S({},c,{params:u(y)}),m.params=u(m.params)}const v=t.resolve(d,m),C=c.hash||"";v.params=s(a(v.params));const A=Mt(r,S({},c,{hash:kt(C),path:v.path})),w=o.createHref(A);return S({fullPath:A,hash:C,query:r===$e?sn(c.query):c.query||{}},v,{redirectedFrom:void 0,href:w})}function P(c){return typeof c=="string"?fe(n,c,i.value.path):S({},c)}function _(c,m){if(f!==c)return V(8,{from:m,to:c})}function M(c){return D(c)}function B(c){return M(S(P(c),{replace:!0}))}function N(c){const m=c.matched[c.matched.length-1];if(m&&m.redirect){const{redirect:d}=m;let v=typeof d=="function"?d(c):d;return typeof v=="string"&&(v=v.includes("?")||v.includes("#")?v=P(v):{path:v},v.params={}),S({query:c.query,hash:c.hash,params:v.path!=null?{}:c.params},v)}}function D(c,m){const d=f=E(c),v=i.value,C=c.state,A=c.force,w=c.replace===!0,y=N(d);if(y)return D(S(P(y),{state:typeof y=="object"?S({},C,y.state):C,force:A,replace:w}),m||d);const O=d;O.redirectedFrom=m;let W;return!A&&Lt(r,v,d)&&(W=V(16,{to:O,from:v}),Ce(v,v,!0,!1)),(W?Promise.resolve(W):Ee(O,v)).catch(x=>j(x)?j(x,2)?x:ce(x):se(x,O,v)).then(x=>{if(x){if(j(x,2))return D(S({replace:w},P(x.to),{state:typeof x.to=="object"?S({},C,x.to.state):C,force:A}),m||O)}else x=we(O,v,!0,w,C);return Pe(O,v,x),x})}function ot(c,m){const d=_(c,m);return d?Promise.reject(d):Promise.resolve()}function re(c){const m=ee.values().next().value;return m&&typeof m.runWithContext=="function"?m.runWithContext(c):c()}function Ee(c,m){let d;const[v,C,A]=dn(c,m);d=pe(v.reverse(),"beforeRouteLeave",c,m);for(const y of v)y.leaveGuards.forEach(O=>{d.push(I(O,c,m))});const w=ot.bind(null,c,m);return d.push(w),q(d).then(()=>{d=[];for(const y of l.list())d.push(I(y,c,m));return d.push(w),q(d)}).then(()=>{d=pe(C,"beforeRouteUpdate",c,m);for(const y of C)y.updateGuards.forEach(O=>{d.push(I(O,c,m))});return d.push(w),q(d)}).then(()=>{d=[];for(const y of A)if(y.beforeEnter)if(L(y.beforeEnter))for(const O of y.beforeEnter)d.push(I(O,c,m));else d.push(I(y.beforeEnter,c,m));return d.push(w),q(d)}).then(()=>(c.matched.forEach(y=>y.enterCallbacks={}),d=pe(A,"beforeRouteEnter",c,m,re),d.push(w),q(d))).then(()=>{d=[];for(const y of h.list())d.push(I(y,c,m));return d.push(w),q(d)}).catch(y=>j(y,8)?y:Promise.reject(y))}function Pe(c,m,d){p.list().forEach(v=>re(()=>v(c,m,d)))}function we(c,m,d,v,C){const A=_(c,m);if(A)return A;const w=m===H,y=z?history.state:{};d&&(v||w?o.replace(c.fullPath,S({scroll:w&&y&&y.scroll},C)):o.push(c.fullPath,C)),i.value=c,Ce(c,m,d,w),ce()}let Q;function st(){Q||(Q=o.listen((c,m,d)=>{if(!ke.listening)return;const v=E(c),C=N(v);if(C){D(S(C,{replace:!0}),v).catch(X);return}f=v;const A=i.value;z&&It(Oe(A.fullPath,d.delta),te()),Ee(v,A).catch(w=>j(w,12)?w:j(w,2)?(D(w.to,v).then(y=>{j(y,20)&&!d.delta&&d.type===K.pop&&o.go(-1,!1)}).catch(X),Promise.reject()):(d.delta&&o.go(-d.delta,!1),se(w,v,A))).then(w=>{w=w||we(v,A,!1),w&&(d.delta&&!j(w,8)?o.go(-d.delta,!1):d.type===K.pop&&j(w,20)&&o.go(-1,!1)),Pe(v,A,w)}).catch(X)}))}let oe=F(),Se=F(),J;function se(c,m,d){ce(c);const v=Se.list();return v.length?v.forEach(C=>C(c,m,d)):console.error(c),Promise.reject(c)}function ct(){return J&&i.value!==H?Promise.resolve():new Promise((c,m)=>{oe.add([c,m])})}function ce(c){return J||(J=!c,st(),oe.list().forEach(([m,d])=>c?d(c):m()),oe.reset()),c}function Ce(c,m,d,v){const{scrollBehavior:C}=e;if(!z||!C)return Promise.resolve();const A=!d&&Bt(Oe(c.fullPath,0))||(v||!d)&&history.state&&history.state.scroll||null;return mt().then(()=>C(c,m,A)).then(w=>w&&Ht(w)).catch(w=>se(w,c,m))}const ie=c=>o.go(c);let ae;const ee=new Set,ke={currentRoute:i,listening:!0,addRoute:g,removeRoute:R,hasRoute:k,getRoutes:b,resolve:E,options:e,push:M,replace:B,go:ie,back:()=>ie(-1),forward:()=>ie(1),beforeEach:l.add,beforeResolve:h.add,afterEach:p.add,onError:Se.add,isReady:ct,install(c){const m=this;c.component("RouterLink",ln),c.component("RouterView",pn),c.config.globalProperties.$router=m,Object.defineProperty(c.config.globalProperties,"$route",{enumerable:!0,get:()=>Y(i)}),z&&!ae&&i.value===H&&(ae=!0,M(o.location).catch(C=>{}));const d={};for(const C in H)Object.defineProperty(d,C,{get:()=>i.value[C],enumerable:!0});c.provide(ne,m),c.provide(Re,dt(d)),c.provide(ge,i);const v=c.unmount;ee.add(c),c.unmount=function(){ee.delete(c),ee.size<1&&(f=H,Q&&Q(),Q=null,i.value=H,ae=!1,J=!1),v()}}};function q(c){return c.reduce((m,d)=>m.then(()=>re(d)),Promise.resolve())}return ke}function dn(e,t){const n=[],r=[],o=[],l=Math.max(t.matched.length,e.matched.length);for(let h=0;h<l;h++){const p=t.matched[h];p&&(e.matched.find(f=>U(f,p))?r.push(p):n.push(p));const i=e.matched[h];i&&(t.matched.find(f=>U(f,i))||o.push(i))}return[n,r,o]}function wn(){return $(ne)}function Sn(){return $(Re)}export{xe as NavigationFailureType,ln as RouterLink,pn as RouterView,H as START_LOCATION,gn as createMemoryHistory,Pn as createRouter,en as createRouterMatcher,vn as createWebHashHistory,Ut as createWebHistory,j as isNavigationFailure,En as loadRouteLocation,ye as matchedRouteKey,yn as onBeforeRouteLeave,Rn as onBeforeRouteUpdate,on as parseQuery,Re as routeLocationKey,ne as routerKey,ge as routerViewLocationKey,$e as stringifyQuery,Ie as useLink,Sn as useRoute,wn as useRouter,He as viewDepthKey};
