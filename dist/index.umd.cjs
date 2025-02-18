(function(H,N){typeof exports=="object"&&typeof module<"u"?N(exports,require("data0")):typeof define=="function"&&define.amd?define(["exports","data0"],N):(H=typeof globalThis<"u"?globalThis:H||self,N(H.router0={},H.data0))})(this,function(H,N){"use strict";function $(){return $=Object.assign?Object.assign.bind():function(r){for(var e=1;e<arguments.length;e++){var a=arguments[e];for(var n in a)({}).hasOwnProperty.call(a,n)&&(r[n]=a[n])}return r},$.apply(null,arguments)}var b;(function(r){r.Pop="POP",r.Push="PUSH",r.Replace="REPLACE"})(b||(b={}));var V=process.env.NODE_ENV!=="production"?function(r){return Object.freeze(r)}:function(r){return r};function M(r,e){if(!r){typeof console<"u"&&console.warn(e);try{throw new Error(e)}catch{}}}var J="beforeunload",K="hashchange",q="popstate";function Y(r){r===void 0&&(r={});var e=r,a=e.window,n=a===void 0?document.defaultView:a,i=n.history;function o(){var c=n.location,t=c.pathname,s=c.search,d=c.hash,f=i.state||{};return[f.idx,V({pathname:t,search:s,hash:d,state:f.usr||null,key:f.key||"default"})]}var l=null;function E(){if(l)y.call(l),l=null;else{var c=b.Pop,t=o(),s=t[0],d=t[1];if(y.length)if(s!=null){var f=p-s;f&&(l={action:c,location:d,retry:function(){m(f*-1)}},m(f))}else process.env.NODE_ENV!=="production"&&M(!1,"You are trying to block a POP navigation to a location that was not created by the history library. The block will fail silently in production, but in general you should do all navigation with the history library (instead of using window.history.pushState directly) to avoid this situation.");else C(c)}}n.addEventListener(q,E);var w=b.Pop,O=o(),p=O[0],v=O[1],x=D(),y=D();p==null&&(p=0,i.replaceState($({},i.state,{idx:p}),""));function _(c){return typeof c=="string"?c:j(c)}function T(c,t){return t===void 0&&(t=null),V($({pathname:v.pathname,hash:"",search:""},typeof c=="string"?B(c):c,{state:t,key:z()}))}function R(c,t){return[{usr:c.state,key:c.key,idx:t},_(c)]}function A(c,t,s){return!y.length||(y.call({action:c,location:t,retry:s}),!1)}function C(c){w=c;var t=o();p=t[0],v=t[1],x.call({action:w,location:v})}function h(c,t){var s=b.Push,d=T(c,t);function f(){h(c,t)}if(A(s,d,f)){var P=R(d,p+1),k=P[0],L=P[1];try{i.pushState(k,"",L)}catch{n.location.assign(L)}C(s)}}function u(c,t){var s=b.Replace,d=T(c,t);function f(){u(c,t)}if(A(s,d,f)){var P=R(d,p),k=P[0],L=P[1];i.replaceState(k,"",L),C(s)}}function m(c){i.go(c)}var g={get action(){return w},get location(){return v},createHref:_,push:h,replace:u,go:m,back:function(){m(-1)},forward:function(){m(1)},listen:function(t){return x.push(t)},block:function(t){var s=y.push(t);return y.length===1&&n.addEventListener(J,U),function(){s(),y.length||n.removeEventListener(J,U)}}};return g}function F(r){r===void 0&&(r={});var e=r,a=e.window,n=a===void 0?document.defaultView:a,i=n.history;function o(){var t=B(n.location.hash.substr(1)),s=t.pathname,d=s===void 0?"/":s,f=t.search,P=f===void 0?"":f,k=t.hash,L=k===void 0?"":k,S=i.state||{};return[S.idx,V({pathname:d,search:P,hash:L,state:S.usr||null,key:S.key||"default"})]}var l=null;function E(){if(l)y.call(l),l=null;else{var t=b.Pop,s=o(),d=s[0],f=s[1];if(y.length)if(d!=null){var P=p-d;P&&(l={action:t,location:f,retry:function(){g(P*-1)}},g(P))}else process.env.NODE_ENV!=="production"&&M(!1,"You are trying to block a POP navigation to a location that was not created by the history library. The block will fail silently in production, but in general you should do all navigation with the history library (instead of using window.history.pushState directly) to avoid this situation.");else h(t)}}n.addEventListener(q,E),n.addEventListener(K,function(){var t=o(),s=t[1];j(s)!==j(v)&&E()});var w=b.Pop,O=o(),p=O[0],v=O[1],x=D(),y=D();p==null&&(p=0,i.replaceState($({},i.state,{idx:p}),""));function _(){var t=document.querySelector("base"),s="";if(t&&t.getAttribute("href")){var d=n.location.href,f=d.indexOf("#");s=f===-1?d:d.slice(0,f)}return s}function T(t){return _()+"#"+(typeof t=="string"?t:j(t))}function R(t,s){return s===void 0&&(s=null),V($({pathname:v.pathname,hash:"",search:""},typeof t=="string"?B(t):t,{state:s,key:z()}))}function A(t,s){return[{usr:t.state,key:t.key,idx:s},T(t)]}function C(t,s,d){return!y.length||(y.call({action:t,location:s,retry:d}),!1)}function h(t){w=t;var s=o();p=s[0],v=s[1],x.call({action:w,location:v})}function u(t,s){var d=b.Push,f=R(t,s);function P(){u(t,s)}if(process.env.NODE_ENV!=="production"&&M(f.pathname.charAt(0)==="/","Relative pathnames are not supported in hash history.push("+JSON.stringify(t)+")"),C(d,f,P)){var k=A(f,p+1),L=k[0],S=k[1];try{i.pushState(L,"",S)}catch{n.location.assign(S)}h(d)}}function m(t,s){var d=b.Replace,f=R(t,s);function P(){m(t,s)}if(process.env.NODE_ENV!=="production"&&M(f.pathname.charAt(0)==="/","Relative pathnames are not supported in hash history.replace("+JSON.stringify(t)+")"),C(d,f,P)){var k=A(f,p),L=k[0],S=k[1];i.replaceState(L,"",S),h(d)}}function g(t){i.go(t)}var c={get action(){return w},get location(){return v},createHref:T,push:u,replace:m,go:g,back:function(){g(-1)},forward:function(){g(1)},listen:function(s){return x.push(s)},block:function(s){var d=y.push(s);return y.length===1&&n.addEventListener(J,U),function(){d(),y.length||n.removeEventListener(J,U)}}};return c}function G(r){r===void 0&&(r={});var e=r,a=e.initialEntries,n=a===void 0?["/"]:a,i=e.initialIndex,o=n.map(function(h){var u=V($({pathname:"/",search:"",hash:"",state:null,key:z()},typeof h=="string"?B(h):h));return process.env.NODE_ENV!=="production"&&M(u.pathname.charAt(0)==="/","Relative pathnames are not supported in createMemoryHistory({ initialEntries }) (invalid entry: "+JSON.stringify(h)+")"),u}),l=I(i??o.length-1,0,o.length-1),E=b.Pop,w=o[l],O=D(),p=D();function v(h){return typeof h=="string"?h:j(h)}function x(h,u){return u===void 0&&(u=null),V($({pathname:w.pathname,search:"",hash:""},typeof h=="string"?B(h):h,{state:u,key:z()}))}function y(h,u,m){return!p.length||(p.call({action:h,location:u,retry:m}),!1)}function _(h,u){E=h,w=u,O.call({action:E,location:w})}function T(h,u){var m=b.Push,g=x(h,u);function c(){T(h,u)}process.env.NODE_ENV!=="production"&&M(w.pathname.charAt(0)==="/","Relative pathnames are not supported in memory history.push("+JSON.stringify(h)+")"),y(m,g,c)&&(l+=1,o.splice(l,o.length,g),_(m,g))}function R(h,u){var m=b.Replace,g=x(h,u);function c(){R(h,u)}process.env.NODE_ENV!=="production"&&M(w.pathname.charAt(0)==="/","Relative pathnames are not supported in memory history.replace("+JSON.stringify(h)+")"),y(m,g,c)&&(o[l]=g,_(m,g))}function A(h){var u=I(l+h,0,o.length-1),m=b.Pop,g=o[u];function c(){A(h)}y(m,g,c)&&(l=u,_(m,g))}var C={get index(){return l},get action(){return E},get location(){return w},createHref:v,push:T,replace:R,go:A,back:function(){A(-1)},forward:function(){A(1)},listen:function(u){return O.push(u)},block:function(u){return p.push(u)}};return C}function I(r,e,a){return Math.min(Math.max(r,e),a)}function U(r){r.preventDefault(),r.returnValue=""}function D(){var r=[];return{get length(){return r.length},push:function(a){return r.push(a),function(){r=r.filter(function(n){return n!==a})}},call:function(a){r.forEach(function(n){return n&&n(a)})}}}function z(){return Math.random().toString(36).substr(2,8)}function j(r){var e=r.pathname,a=e===void 0?"/":e,n=r.search,i=n===void 0?"":n,o=r.hash,l=o===void 0?"":o;return i&&i!=="?"&&(a+=i.charAt(0)==="?"?i:"?"+i),l&&l!=="#"&&(a+=l.charAt(0)==="#"?l:"#"+l),a}function B(r){var e={};if(r){var a=r.indexOf("#");a>=0&&(e.hash=r.substr(a),r=r.substr(0,a));var n=r.indexOf("?");n>=0&&(e.search=r.substr(n),r=r.substr(0,n)),r&&(e.pathname=r)}return e}class W extends N.ManualCleanup{constructor(e,a=Y(),n="",i){super(),this.data=e,this.history=a,this.parentPath=n,this.parent=i,this.pathname=N.atom(""),this.handler=N.atom(void 0),this.params=N.atom({}),this.searchParams=N.atom({}),this.path=N.atom(""),this.children=new N.RxSet([]),this.map={children:new Map,handler:void 0,redirect:void 0,strictHandler:void 0},this.onHistoryChange=()=>{this.pathname(this.history.location.pathname);const o=this.recognize(this.history.location.pathname);if(this.handler(o.handler),this.path(o.path),this.params(o.params),this.searchParams(o.searchParams),o.redirect&&o.isExactMatch){const[l,E]=Array.isArray(o.redirect)?o.redirect:[o.redirect,!1];this.push(l,E)}},e.forEach(o=>this.addOne(o)),this.unlisten=this.history.listen(this.onHistoryChange),this.onHistoryChange(),this.parent&&this.parent.children.add(this)}destroy(){var e;this.unlisten(),(e=this.parent)==null||e.children.delete(this)}addOne(e){const a=e.path.split("/").filter(Boolean);let n=this.map;a.forEach(i=>{if(i.startsWith(":")){if(n.dynamicChildren)throw new Error("only one dynamic param is allowed");n.dynamicChildren={paramName:i.slice(1),node:{children:new Map,handler:void 0,strictHandler:void 0}},n=n.dynamicChildren.node}else{const o=n.children;n=o.get(i),n||o.set(i,n={children:new Map,handler:void 0,strictHandler:void 0})}}),e.strict?n.strictHandler=e.handler:n.handler=e.handler,n.redirect=e.redirect}add(e){e.forEach(a=>this.addOne(a)),this.onHistoryChange()}recognize(e){const n=(e.startsWith(this.parentPath)?e.slice(this.parentPath.length):e).split("/").filter(Boolean);let i=this.map;const o=[],l=[],E={},w={};let O=!0;for(let v of n){const x=i.children.get(v);if(x)o.push(v),l.push(v),i=x;else if(i.dynamicChildren)E[i.dynamicChildren.paramName]=v,o.push(i.dynamicChildren.paramName),l.push(v),i=i.dynamicChildren.node;else{O=!1;break}}const p=new URLSearchParams(this.history.location.search);for(const[v,x]of p)w[v]=x;return{handler:i.handler||i.strictHandler,redirect:i.redirect,params:E,searchParams:w,isExactMatch:O,path:`/${o.join("/")}`,matchPath:`/${l.join("/")}`}}redirect(e,a=!1){a?window.location.href=e:this.history.push(e)}push(e,a=!1){if(e.startsWith("//"))return this.redirect(e.slice(1),a);a?window.location.href=`${this.parentPath}${e}`:this.history.push(`${this.parentPath}${e}`)}updateSearchParams(e){const a=new URL(window.location.href),n={...this.searchParams.raw};Object.entries(e).forEach(([i,o])=>{o===void 0?(a.searchParams.delete(i),delete n[i]):(a.searchParams.set(i,o),n[i]=o)}),window.history.pushState({},"",a),this.searchParams(n)}derive(e=this.path.raw){const a=this,n=`${a.parentPath}${e}`;return class extends W{constructor(o,l=""){super(o,a.history,`${n}${l}`,a),this.data=o,this.subParentPath=l}}}}H.Router=W,H.createBrowserHistory=Y,H.createHashHistory=F,H.createMemoryHistory=G,Object.defineProperty(H,Symbol.toStringTag,{value:"Module"})});
//# sourceMappingURL=index.umd.cjs.map
