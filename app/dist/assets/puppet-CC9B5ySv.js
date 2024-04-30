import{g as _}from"./index-B17mrEX6.js";import{e as v}from"./index.nxYwrlF1.entry.js";function b(f,l){for(var o=0;o<l.length;o++){const t=l[o];if(typeof t!="string"&&!Array.isArray(t)){for(const c in t)if(c!=="default"&&!(c in f)){const u=Object.getOwnPropertyDescriptor(t,c);u&&Object.defineProperty(f,c,u.get?u:{enumerable:!0,get:()=>t[c]})}}}return Object.freeze(Object.defineProperty(f,Symbol.toStringTag,{value:"Module"}))}var k={exports:{}};(function(f,l){(function(o){o(v())})(function(o){o.defineMode("puppet",function(){var t={},c=/({)?([a-z][a-z0-9_]*)?((::[a-z][a-z0-9_]*)*::)?[a-zA-Z0-9_]+(})?/;function u(e,n){for(var i=n.split(" "),a=0;a<i.length;a++)t[i[a]]=e}u("keyword","class define site node include import inherits"),u("keyword","case if else in and elsif default or"),u("atom","false true running present absent file directory undef"),u("builtin","action augeas burst chain computer cron destination dport exec file filebucket group host icmp iniface interface jump k5login limit log_level log_prefix macauthorization mailalias maillist mcx mount nagios_command nagios_contact nagios_contactgroup nagios_host nagios_hostdependency nagios_hostescalation nagios_hostextinfo nagios_hostgroup nagios_service nagios_servicedependency nagios_serviceescalation nagios_serviceextinfo nagios_servicegroup nagios_timeperiod name notify outiface package proto reject resources router schedule scheduled_task selboolean selmodule service source sport ssh_authorized_key sshkey stage state table tidy todest toports tosource user vlan yumrepo zfs zone zpool");function p(e,n){for(var i,a,s=!1;!e.eol()&&(i=e.next())!=n.pending;){if(i==="$"&&a!="\\"&&n.pending=='"'){s=!0;break}a=i}return s&&e.backUp(1),i==n.pending?n.continueString=!1:n.continueString=!0,"string"}function g(e,n){var i=e.match(/[\w]+/,!1),a=e.match(/(\s+)?\w+\s+=>.*/,!1),s=e.match(/(\s+)?[\w:_]+(\s+)?{/,!1),h=e.match(/(\s+)?[@]{1,2}[\w:_]+(\s+)?{/,!1),r=e.next();if(r==="$")return e.match(c)?n.continueString?"variable-2":"variable":"error";if(n.continueString)return e.backUp(1),p(e,n);if(n.inDefinition){if(e.match(/(\s+)?[\w:_]+(\s+)?/))return"def";e.match(/\s+{/),n.inDefinition=!1}return n.inInclude?(e.match(/(\s+)?\S+(\s+)?/),n.inInclude=!1,"def"):e.match(/(\s+)?\w+\(/)?(e.backUp(1),"def"):a?(e.match(/(\s+)?\w+/),"tag"):i&&t.hasOwnProperty(i)?(e.backUp(1),e.match(/[\w]+/),e.match(/\s+\S+\s+{/,!1)&&(n.inDefinition=!0),i=="include"&&(n.inInclude=!0),t[i]):/(^|\s+)[A-Z][\w:_]+/.test(i)?(e.backUp(1),e.match(/(^|\s+)[A-Z][\w:_]+/),"def"):s?(e.match(/(\s+)?[\w:_]+/),"def"):h?(e.match(/(\s+)?[@]{1,2}/),"special"):r=="#"?(e.skipToEnd(),"comment"):r=="'"||r=='"'?(n.pending=r,p(e,n)):r=="{"||r=="}"?"bracket":r=="/"?(e.match(/^[^\/]*\//),"variable-3"):r.match(/[0-9]/)?(e.eatWhile(/[0-9]+/),"number"):r=="="?(e.peek()==">"&&e.next(),"operator"):(e.eatWhile(/[\w-]/),null)}return{startState:function(){var e={};return e.inDefinition=!1,e.inInclude=!1,e.continueString=!1,e.pending=!1,e},token:function(e,n){return e.eatSpace()?null:g(e,n)}}}),o.defineMIME("text/x-puppet","puppet")})})();var d=k.exports;const w=_(d),x=b({__proto__:null,default:w},[d]);export{x as p};