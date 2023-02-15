import{a as $t,r as Zt,b as te,e as tt,h as R,f as ee,i as ne,j as E,w as oe,k as ie,u as x,o as A,l as lt,c as at,m as re,t as se,p as ce}from"./entry.937bdf01.js";import{_ as le}from"./_plugin-vue_export-helper.c27b6911.js";function ae(){const t=$t();return t._appConfig||(t._appConfig=Zt(te)),t._appConfig}const Ft=Object.freeze({left:0,top:0,width:16,height:16}),Pt=Object.freeze({rotate:0,vFlip:!1,hFlip:!1}),et=Object.freeze({...Ft,...Pt});Object.freeze({...et,body:"",hidden:!1});({...Ft});const Mt=Object.freeze({width:null,height:null}),Et=Object.freeze({...Mt,...Pt});function fe(t,o){const n={...t};for(const i in o){const e=o[i],r=typeof e;i in Mt?(e===null||e&&(r==="string"||r==="number"))&&(n[i]=e):r===typeof n[i]&&(n[i]=i==="rotate"?e%4:e)}return n}const ue=/[\s,]+/;function he(t,o){o.split(ue).forEach(n=>{switch(n.trim()){case"horizontal":t.hFlip=!0;break;case"vertical":t.vFlip=!0;break}})}function de(t,o=0){const n=t.replace(/^-?[0-9.]*/,"");function i(e){for(;e<0;)e+=4;return e%4}if(n===""){const e=parseInt(t);return isNaN(e)?0:i(e)}else if(n!==t){let e=0;switch(n){case"%":e=25;break;case"deg":e=90}if(e){let r=parseFloat(t.slice(0,t.length-n.length));return isNaN(r)?0:(r=r/e,r%1===0?i(r):0)}}return o}const pe=/(-?[0-9.]*[0-9]+[0-9.]*)/g,ge=/^-?[0-9.]*[0-9]+[0-9.]*$/g;function ft(t,o,n){if(o===1)return t;if(n=n||100,typeof t=="number")return Math.ceil(t*o*n)/n;if(typeof t!="string")return t;const i=t.split(pe);if(i===null||!i.length)return t;const e=[];let r=i.shift(),s=ge.test(r);for(;;){if(s){const c=parseFloat(r);isNaN(c)?e.push(r):e.push(Math.ceil(c*o*n)/n)}else e.push(r);if(r=i.shift(),r===void 0)return e.join("");s=!s}}const me=t=>t==="unset"||t==="undefined"||t==="none";function ye(t,o){const n={...et,...t},i={...Et,...o},e={left:n.left,top:n.top,width:n.width,height:n.height};let r=n.body;[n,i].forEach(b=>{const h=[],u=b.hFlip,S=b.vFlip;let w=b.rotate;u?S?w+=2:(h.push("translate("+(e.width+e.left).toString()+" "+(0-e.top).toString()+")"),h.push("scale(-1 1)"),e.top=e.left=0):S&&(h.push("translate("+(0-e.left).toString()+" "+(e.height+e.top).toString()+")"),h.push("scale(1 -1)"),e.top=e.left=0);let y;switch(w<0&&(w-=Math.floor(w/4)*4),w=w%4,w){case 1:y=e.height/2+e.top,h.unshift("rotate(90 "+y.toString()+" "+y.toString()+")");break;case 2:h.unshift("rotate(180 "+(e.width/2+e.left).toString()+" "+(e.height/2+e.top).toString()+")");break;case 3:y=e.width/2+e.left,h.unshift("rotate(-90 "+y.toString()+" "+y.toString()+")");break}w%2===1&&(e.left!==e.top&&(y=e.left,e.left=e.top,e.top=y),e.width!==e.height&&(y=e.width,e.width=e.height,e.height=y)),h.length&&(r='<g transform="'+h.join(" ")+'">'+r+"</g>")});const s=i.width,c=i.height,l=e.width,a=e.height;let f,d;s===null?(d=c===null?"1em":c==="auto"?a:c,f=ft(d,l/a)):(f=s==="auto"?l:s,d=c===null?ft(f,a/l):c==="auto"?a:c);const p={},g=(b,h)=>{me(h)||(p[b]=h.toString())};return g("width",f),g("height",d),p.viewBox=e.left.toString()+" "+e.top.toString()+" "+l.toString()+" "+a.toString(),{attributes:p,body:r}}const we=/\sid="(\S+)"/g,be="IconifyId"+Date.now().toString(16)+(Math.random()*16777216|0).toString(16);let xe=0;function Se(t,o=be){const n=[];let i;for(;i=we.exec(t);)n.push(i[1]);if(!n.length)return t;const e="suffix"+(Math.random()*16777216|Date.now()).toString(16);return n.forEach(r=>{const s=typeof o=="function"?o(r):o+(xe++).toString(),c=r.replace(/[.*+?^${}()|[\]\\]/g,"\\$&");t=t.replace(new RegExp('([#;"])('+c+')([")]|\\.[a-z])',"g"),"$1"+s+e+"$3")}),t=t.replace(new RegExp(e,"g"),""),t}function ve(t,o){let n=t.indexOf("xlink:")===-1?"":' xmlns:xlink="http://www.w3.org/1999/xlink"';for(const i in o)n+=" "+i+'="'+o[i]+'"';return'<svg xmlns="http://www.w3.org/2000/svg"'+n+">"+t+"</svg>"}function Ie(t){return t.replace(/"/g,"'").replace(/%/g,"%25").replace(/#/g,"%23").replace(/</g,"%3C").replace(/>/g,"%3E").replace(/\s+/g," ")}function ke(t){return'url("data:image/svg+xml,'+Ie(t)+'")'}const ut={...Et,inline:!1},Ce={xmlns:"http://www.w3.org/2000/svg","xmlns:xlink":"http://www.w3.org/1999/xlink","aria-hidden":!0,role:"img"},_e={display:"inline-block"},Q={backgroundColor:"currentColor"},At={backgroundColor:"transparent"},ht={Image:"var(--svg)",Repeat:"no-repeat",Size:"100% 100%"},dt={webkitMask:Q,mask:Q,background:At};for(const t in dt){const o=dt[t];for(const n in ht)o[t+n]=ht[n]}const L={};["horizontal","vertical"].forEach(t=>{const o=t.slice(0,1)+"Flip";L[t+"-flip"]=o,L[t.slice(0,1)+"-flip"]=o,L[t+"Flip"]=o});function pt(t){return t+(t.match(/^[-0-9.]+$/)?"px":"")}const je=(t,o)=>{const n=fe(ut,o),i={...Ce},e=o.mode||"svg",r={},s=o.style,c=typeof s=="object"&&!(s instanceof Array)?s:{};for(let h in o){const u=o[h];if(u!==void 0)switch(h){case"icon":case"style":case"onLoad":case"mode":break;case"inline":case"hFlip":case"vFlip":n[h]=u===!0||u==="true"||u===1;break;case"flip":typeof u=="string"&&he(n,u);break;case"color":r.color=u;break;case"rotate":typeof u=="string"?n[h]=de(u):typeof u=="number"&&(n[h]=u);break;case"ariaHidden":case"aria-hidden":u!==!0&&u!=="true"&&delete i["aria-hidden"];break;default:{const S=L[h];S?(u===!0||u==="true"||u===1)&&(n[S]=!0):ut[h]===void 0&&(i[h]=u)}}}const l=ye(t,n),a=l.attributes;if(n.inline&&(r.verticalAlign="-0.125em"),e==="svg"){i.style={...r,...c},Object.assign(i,a);let h=0,u=o.id;return typeof u=="string"&&(u=u.replace(/-/g,"_")),i.innerHTML=Se(l.body,u?()=>u+"ID"+h++:"iconifyVue"),R("svg",i)}const{body:f,width:d,height:p}=t,g=e==="mask"||(e==="bg"?!1:f.indexOf("currentColor")!==-1),b=ve(f,{...a,width:d+"",height:p+""});return i.style={...r,"--svg":ke(b),width:pt(a.width),height:pt(a.height),..._e,...g?Q:At,...c},R("span",i)},Te=Object.create(null),$e=tt({inheritAttrs:!1,render(){const t=this.$attrs,o=t.icon,n=typeof o=="string"?Te[o]:typeof o=="object"?o:null;return n===null||typeof n!="object"||typeof n.body!="string"?this.$slots.default?this.$slots.default():null:je({...et,...n},t)}}),j=/^[a-z0-9]+(-[a-z0-9]+)*$/,F=(t,o,n,i="")=>{const e=t.split(":");if(t.slice(0,1)==="@"){if(e.length<2||e.length>3)return null;i=e.shift().slice(1)}if(e.length>3||!e.length)return null;if(e.length>1){const c=e.pop(),l=e.pop(),a={provider:e.length>0?e[0]:i,prefix:l,name:c};return o&&!N(a)?null:a}const r=e[0],s=r.split("-");if(s.length>1){const c={provider:i,prefix:s.shift(),name:s.join("-")};return o&&!N(c)?null:c}if(n&&i===""){const c={provider:i,prefix:"",name:r};return o&&!N(c,n)?null:c}return null},N=(t,o)=>t?!!((t.provider===""||t.provider.match(j))&&(o&&t.prefix===""||t.prefix.match(j))&&t.name.match(j)):!1,Ot=Object.freeze({left:0,top:0,width:16,height:16}),H=Object.freeze({rotate:0,vFlip:!1,hFlip:!1}),P=Object.freeze({...Ot,...H}),G=Object.freeze({...P,body:"",hidden:!1});function Fe(t,o){const n={};!t.hFlip!=!o.hFlip&&(n.hFlip=!0),!t.vFlip!=!o.vFlip&&(n.vFlip=!0);const i=((t.rotate||0)+(o.rotate||0))%4;return i&&(n.rotate=i),n}function gt(t,o){const n=Fe(t,o);for(const i in G)i in H?i in t&&!(i in n)&&(n[i]=H[i]):i in o?n[i]=o[i]:i in t&&(n[i]=t[i]);return n}function Pe(t,o){const n=t.icons,i=t.aliases||Object.create(null),e=Object.create(null);function r(s){if(n[s])return e[s]=[];if(!(s in e)){e[s]=null;const c=i[s]&&i[s].parent,l=c&&r(c);l&&(e[s]=[c].concat(l))}return e[s]}return(o||Object.keys(n).concat(Object.keys(i))).forEach(r),e}function Me(t,o,n){const i=t.icons,e=t.aliases||Object.create(null);let r={};function s(c){r=gt(i[c]||e[c],r)}return s(o),n.forEach(s),gt(t,r)}function Lt(t,o){const n=[];if(typeof t!="object"||typeof t.icons!="object")return n;t.not_found instanceof Array&&t.not_found.forEach(e=>{o(e,null),n.push(e)});const i=Pe(t);for(const e in i){const r=i[e];r&&(o(e,Me(t,e,r)),n.push(e))}return n}const Ee={provider:"",aliases:{},not_found:{},...Ot};function U(t,o){for(const n in o)if(n in t&&typeof t[n]!=typeof o[n])return!1;return!0}function Nt(t){if(typeof t!="object"||t===null)return null;const o=t;if(typeof o.prefix!="string"||!t.icons||typeof t.icons!="object"||!U(t,Ee))return null;const n=o.icons;for(const e in n){const r=n[e];if(!e.match(j)||typeof r.body!="string"||!U(r,G))return null}const i=o.aliases||Object.create(null);for(const e in i){const r=i[e],s=r.parent;if(!e.match(j)||typeof s!="string"||!n[s]&&!i[s]||!U(r,G))return null}return o}const mt=Object.create(null);function Ae(t,o){return{provider:t,prefix:o,icons:Object.create(null),missing:new Set}}function k(t,o){const n=mt[t]||(mt[t]=Object.create(null));return n[o]||(n[o]=Ae(t,o))}function nt(t,o){return Nt(o)?Lt(o,(n,i)=>{i?t.icons[n]=i:t.missing.add(n)}):[]}function Oe(t,o,n){try{if(typeof n.body=="string")return t.icons[o]={...n},!0}catch{}return!1}let T=!1;function Dt(t){return typeof t=="boolean"&&(T=t),T}function zt(t){const o=typeof t=="string"?F(t,!0,T):t;if(o){const n=k(o.provider,o.prefix),i=o.name;return n.icons[i]||(n.missing.has(i)?null:void 0)}}function Le(t,o){const n=F(t,!0,T);if(!n)return!1;const i=k(n.provider,n.prefix);return Oe(i,n.name,o)}function Ne(t,o){if(typeof t!="object")return!1;if(typeof o!="string"&&(o=t.provider||""),T&&!o&&!t.prefix){let e=!1;return Nt(t)&&(t.prefix="",Lt(t,(r,s)=>{s&&Le(r,s)&&(e=!0)})),e}const n=t.prefix;if(!N({provider:o,prefix:n,name:"a"}))return!1;const i=k(o,n);return!!nt(i,t)}const Rt=Object.freeze({width:null,height:null}),Ht=Object.freeze({...Rt,...H}),De=/(-?[0-9.]*[0-9]+[0-9.]*)/g,ze=/^-?[0-9.]*[0-9]+[0-9.]*$/g;function yt(t,o,n){if(o===1)return t;if(n=n||100,typeof t=="number")return Math.ceil(t*o*n)/n;if(typeof t!="string")return t;const i=t.split(De);if(i===null||!i.length)return t;const e=[];let r=i.shift(),s=ze.test(r);for(;;){if(s){const c=parseFloat(r);isNaN(c)?e.push(r):e.push(Math.ceil(c*o*n)/n)}else e.push(r);if(r=i.shift(),r===void 0)return e.join("");s=!s}}const Re=t=>t==="unset"||t==="undefined"||t==="none";function He(t,o){const n={...P,...t},i={...Ht,...o},e={left:n.left,top:n.top,width:n.width,height:n.height};let r=n.body;[n,i].forEach(b=>{const h=[],u=b.hFlip,S=b.vFlip;let w=b.rotate;u?S?w+=2:(h.push("translate("+(e.width+e.left).toString()+" "+(0-e.top).toString()+")"),h.push("scale(-1 1)"),e.top=e.left=0):S&&(h.push("translate("+(0-e.left).toString()+" "+(e.height+e.top).toString()+")"),h.push("scale(1 -1)"),e.top=e.left=0);let y;switch(w<0&&(w-=Math.floor(w/4)*4),w=w%4,w){case 1:y=e.height/2+e.top,h.unshift("rotate(90 "+y.toString()+" "+y.toString()+")");break;case 2:h.unshift("rotate(180 "+(e.width/2+e.left).toString()+" "+(e.height/2+e.top).toString()+")");break;case 3:y=e.width/2+e.left,h.unshift("rotate(-90 "+y.toString()+" "+y.toString()+")");break}w%2===1&&(e.left!==e.top&&(y=e.left,e.left=e.top,e.top=y),e.width!==e.height&&(y=e.width,e.width=e.height,e.height=y)),h.length&&(r='<g transform="'+h.join(" ")+'">'+r+"</g>")});const s=i.width,c=i.height,l=e.width,a=e.height;let f,d;s===null?(d=c===null?"1em":c==="auto"?a:c,f=yt(d,l/a)):(f=s==="auto"?l:s,d=c===null?yt(f,a/l):c==="auto"?a:c);const p={},g=(b,h)=>{Re(h)||(p[b]=h.toString())};return g("width",f),g("height",d),p.viewBox=e.left.toString()+" "+e.top.toString()+" "+l.toString()+" "+a.toString(),{attributes:p,body:r}}const Be=/\sid="(\S+)"/g,Ve="IconifyId"+Date.now().toString(16)+(Math.random()*16777216|0).toString(16);let Ue=0;function qe(t,o=Ve){const n=[];let i;for(;i=Be.exec(t);)n.push(i[1]);if(!n.length)return t;const e="suffix"+(Math.random()*16777216|Date.now()).toString(16);return n.forEach(r=>{const s=typeof o=="function"?o(r):o+(Ue++).toString(),c=r.replace(/[.*+?^${}()|[\]\\]/g,"\\$&");t=t.replace(new RegExp('([#;"])('+c+')([")]|\\.[a-z])',"g"),"$1"+s+e+"$3")}),t=t.replace(new RegExp(e,"g"),""),t}const K=Object.create(null);function Qe(t,o){K[t]=o}function W(t){return K[t]||K[""]}function ot(t){let o;if(typeof t.resources=="string")o=[t.resources];else if(o=t.resources,!(o instanceof Array)||!o.length)return null;return{resources:o,path:t.path||"/",maxURL:t.maxURL||500,rotate:t.rotate||750,timeout:t.timeout||5e3,random:t.random===!0,index:t.index||0,dataAfterTimeout:t.dataAfterTimeout!==!1}}const it=Object.create(null),_=["https://api.simplesvg.com","https://api.unisvg.com"],D=[];for(;_.length>0;)_.length===1||Math.random()>.5?D.push(_.shift()):D.push(_.pop());it[""]=ot({resources:["https://api.iconify.design"].concat(D)});function Ge(t,o){const n=ot(o);return n===null?!1:(it[t]=n,!0)}function rt(t){return it[t]}const Ke=()=>{let t;try{if(t=fetch,typeof t=="function")return t}catch{}};let wt=Ke();function We(t,o){const n=rt(t);if(!n)return 0;let i;if(!n.maxURL)i=0;else{let e=0;n.resources.forEach(s=>{e=Math.max(e,s.length)});const r=o+".json?icons=";i=n.maxURL-e-n.path.length-r.length}return i}function Je(t){return t===404}const Xe=(t,o,n)=>{const i=[],e=We(t,o),r="icons";let s={type:r,provider:t,prefix:o,icons:[]},c=0;return n.forEach((l,a)=>{c+=l.length+1,c>=e&&a>0&&(i.push(s),s={type:r,provider:t,prefix:o,icons:[]},c=l.length),s.icons.push(l)}),i.push(s),i};function Ye(t){if(typeof t=="string"){const o=rt(t);if(o)return o.path}return"/"}const Ze=(t,o,n)=>{if(!wt){n("abort",424);return}let i=Ye(o.provider);switch(o.type){case"icons":{const r=o.prefix,c=o.icons.join(","),l=new URLSearchParams({icons:c});i+=r+".json?"+l.toString();break}case"custom":{const r=o.uri;i+=r.slice(0,1)==="/"?r.slice(1):r;break}default:n("abort",400);return}let e=503;wt(t+i).then(r=>{const s=r.status;if(s!==200){setTimeout(()=>{n(Je(s)?"abort":"next",s)});return}return e=501,r.json()}).then(r=>{if(typeof r!="object"||r===null){setTimeout(()=>{r===404?n("abort",r):n("next",e)});return}setTimeout(()=>{n("success",r)})}).catch(()=>{n("next",e)})},tn={prepare:Xe,send:Ze};function en(t){const o={loaded:[],missing:[],pending:[]},n=Object.create(null);t.sort((e,r)=>e.provider!==r.provider?e.provider.localeCompare(r.provider):e.prefix!==r.prefix?e.prefix.localeCompare(r.prefix):e.name.localeCompare(r.name));let i={provider:"",prefix:"",name:""};return t.forEach(e=>{if(i.name===e.name&&i.prefix===e.prefix&&i.provider===e.provider)return;i=e;const r=e.provider,s=e.prefix,c=e.name,l=n[r]||(n[r]=Object.create(null)),a=l[s]||(l[s]=k(r,s));let f;c in a.icons?f=o.loaded:s===""||a.missing.has(c)?f=o.missing:f=o.pending;const d={provider:r,prefix:s,name:c};f.push(d)}),o}function Bt(t,o){t.forEach(n=>{const i=n.loaderCallbacks;i&&(n.loaderCallbacks=i.filter(e=>e.id!==o))})}function nn(t){t.pendingCallbacksFlag||(t.pendingCallbacksFlag=!0,setTimeout(()=>{t.pendingCallbacksFlag=!1;const o=t.loaderCallbacks?t.loaderCallbacks.slice(0):[];if(!o.length)return;let n=!1;const i=t.provider,e=t.prefix;o.forEach(r=>{const s=r.icons,c=s.pending.length;s.pending=s.pending.filter(l=>{if(l.prefix!==e)return!0;const a=l.name;if(t.icons[a])s.loaded.push({provider:i,prefix:e,name:a});else if(t.missing.has(a))s.missing.push({provider:i,prefix:e,name:a});else return n=!0,!0;return!1}),s.pending.length!==c&&(n||Bt([t],r.id),r.callback(s.loaded.slice(0),s.missing.slice(0),s.pending.slice(0),r.abort))})}))}let on=0;function rn(t,o,n){const i=on++,e=Bt.bind(null,n,i);if(!o.pending.length)return e;const r={id:i,icons:o,callback:t,abort:e};return n.forEach(s=>{(s.loaderCallbacks||(s.loaderCallbacks=[])).push(r)}),e}function sn(t,o=!0,n=!1){const i=[];return t.forEach(e=>{const r=typeof e=="string"?F(e,o,n):e;r&&i.push(r)}),i}var cn={resources:[],index:0,timeout:2e3,rotate:750,random:!1,dataAfterTimeout:!1};function ln(t,o,n,i){const e=t.resources.length,r=t.random?Math.floor(Math.random()*e):t.index;let s;if(t.random){let m=t.resources.slice(0);for(s=[];m.length>1;){const v=Math.floor(Math.random()*m.length);s.push(m[v]),m=m.slice(0,v).concat(m.slice(v+1))}s=s.concat(m)}else s=t.resources.slice(r).concat(t.resources.slice(0,r));const c=Date.now();let l="pending",a=0,f,d=null,p=[],g=[];typeof i=="function"&&g.push(i);function b(){d&&(clearTimeout(d),d=null)}function h(){l==="pending"&&(l="aborted"),b(),p.forEach(m=>{m.status==="pending"&&(m.status="aborted")}),p=[]}function u(m,v){v&&(g=[]),typeof m=="function"&&g.push(m)}function S(){return{startTime:c,payload:o,status:l,queriesSent:a,queriesPending:p.length,subscribe:u,abort:h}}function w(){l="failed",g.forEach(m=>{m(void 0,f)})}function y(){p.forEach(m=>{m.status==="pending"&&(m.status="aborted")}),p=[]}function Yt(m,v,C){const M=v!=="success";switch(p=p.filter(I=>I!==m),l){case"pending":break;case"failed":if(M||!t.dataAfterTimeout)return;break;default:return}if(v==="abort"){f=C,w();return}if(M){f=C,p.length||(s.length?V():w());return}if(b(),y(),!t.random){const I=t.resources.indexOf(m.resource);I!==-1&&I!==t.index&&(t.index=I)}l="completed",g.forEach(I=>{I(C)})}function V(){if(l!=="pending")return;b();const m=s.shift();if(m===void 0){if(p.length){d=setTimeout(()=>{b(),l==="pending"&&(y(),w())},t.timeout);return}w();return}const v={status:"pending",resource:m,callback:(C,M)=>{Yt(v,C,M)}};p.push(v),a++,d=setTimeout(V,t.rotate),n(m,o,v.callback)}return setTimeout(V),S}function Vt(t){const o={...cn,...t};let n=[];function i(){n=n.filter(c=>c().status==="pending")}function e(c,l,a){const f=ln(o,c,l,(d,p)=>{i(),a&&a(d,p)});return n.push(f),f}function r(c){return n.find(l=>c(l))||null}return{query:e,find:r,setIndex:c=>{o.index=c},getIndex:()=>o.index,cleanup:i}}function bt(){}const q=Object.create(null);function an(t){if(!q[t]){const o=rt(t);if(!o)return;const n=Vt(o),i={config:o,redundancy:n};q[t]=i}return q[t]}function fn(t,o,n){let i,e;if(typeof t=="string"){const r=W(t);if(!r)return n(void 0,424),bt;e=r.send;const s=an(t);s&&(i=s.redundancy)}else{const r=ot(t);if(r){i=Vt(r);const s=t.resources?t.resources[0]:"",c=W(s);c&&(e=c.send)}}return!i||!e?(n(void 0,424),bt):i.query(o,e,n)().abort}const xt="iconify2",$="iconify",Ut=$+"-count",St=$+"-version",qt=36e5,un=168;function J(t,o){try{return t.getItem(o)}catch{}}function st(t,o,n){try{return t.setItem(o,n),!0}catch{}}function vt(t,o){try{t.removeItem(o)}catch{}}function X(t,o){return st(t,Ut,o.toString())}function Y(t){return parseInt(J(t,Ut))||0}const B={local:!0,session:!0},Qt={local:new Set,session:new Set};let ct=!1;function hn(t){ct=t}let O=typeof window>"u"?{}:window;function Gt(t){const o=t+"Storage";try{if(O&&O[o]&&typeof O[o].length=="number")return O[o]}catch{}B[t]=!1}function Kt(t,o){const n=Gt(t);if(!n)return;const i=J(n,St);if(i!==xt){if(i){const c=Y(n);for(let l=0;l<c;l++)vt(n,$+l.toString())}st(n,St,xt),X(n,0);return}const e=Math.floor(Date.now()/qt)-un,r=c=>{const l=$+c.toString(),a=J(n,l);if(typeof a=="string"){try{const f=JSON.parse(a);if(typeof f=="object"&&typeof f.cached=="number"&&f.cached>e&&typeof f.provider=="string"&&typeof f.data=="object"&&typeof f.data.prefix=="string"&&o(f,c))return!0}catch{}vt(n,l)}};let s=Y(n);for(let c=s-1;c>=0;c--)r(c)||(c===s-1?(s--,X(n,s)):Qt[t].add(c))}function Wt(){if(!ct){hn(!0);for(const t in B)Kt(t,o=>{const n=o.data,i=o.provider,e=n.prefix,r=k(i,e);if(!nt(r,n).length)return!1;const s=n.lastModified||-1;return r.lastModifiedCached=r.lastModifiedCached?Math.min(r.lastModifiedCached,s):s,!0})}}function dn(t,o){const n=t.lastModifiedCached;if(n&&n>=o)return n===o;if(t.lastModifiedCached=o,n)for(const i in B)Kt(i,e=>{const r=e.data;return e.provider!==t.provider||r.prefix!==t.prefix||r.lastModified===o});return!0}function pn(t,o){ct||Wt();function n(i){let e;if(!B[i]||!(e=Gt(i)))return;const r=Qt[i];let s;if(r.size)r.delete(s=Array.from(r).shift());else if(s=Y(e),!X(e,s+1))return;const c={cached:Math.floor(Date.now()/qt),provider:t.provider,data:o};return st(e,$+s.toString(),JSON.stringify(c))}o.lastModified&&!dn(t,o.lastModified)||Object.keys(o.icons).length&&(o.not_found&&(o=Object.assign({},o),delete o.not_found),n("local")||n("session"))}function It(){}function gn(t){t.iconsLoaderFlag||(t.iconsLoaderFlag=!0,setTimeout(()=>{t.iconsLoaderFlag=!1,nn(t)}))}function mn(t,o){t.iconsToLoad?t.iconsToLoad=t.iconsToLoad.concat(o).sort():t.iconsToLoad=o,t.iconsQueueFlag||(t.iconsQueueFlag=!0,setTimeout(()=>{t.iconsQueueFlag=!1;const{provider:n,prefix:i}=t,e=t.iconsToLoad;delete t.iconsToLoad;let r;if(!e||!(r=W(n)))return;r.prepare(n,i,e).forEach(c=>{fn(n,c,l=>{if(typeof l!="object")c.icons.forEach(a=>{t.missing.add(a)});else try{const a=nt(t,l);if(!a.length)return;const f=t.pendingIcons;f&&a.forEach(d=>{f.delete(d)}),pn(t,l)}catch(a){console.error(a)}gn(t)})})}))}const Jt=(t,o)=>{const n=sn(t,!0,Dt()),i=en(n);if(!i.pending.length){let l=!0;return o&&setTimeout(()=>{l&&o(i.loaded,i.missing,i.pending,It)}),()=>{l=!1}}const e=Object.create(null),r=[];let s,c;return i.pending.forEach(l=>{const{provider:a,prefix:f}=l;if(f===c&&a===s)return;s=a,c=f,r.push(k(a,f));const d=e[a]||(e[a]=Object.create(null));d[f]||(d[f]=[])}),i.pending.forEach(l=>{const{provider:a,prefix:f,name:d}=l,p=k(a,f),g=p.pendingIcons||(p.pendingIcons=new Set);g.has(d)||(g.add(d),e[a][f].push(d))}),r.forEach(l=>{const{provider:a,prefix:f}=l;e[a][f].length&&mn(l,e[a][f])}),o?rn(o,i,r):It},yn=t=>new Promise((o,n)=>{const i=typeof t=="string"?F(t,!0):t;if(!i){n(t);return}Jt([i||t],e=>{if(e.length&&i){const r=zt(i);if(r){o({...P,...r});return}}n(t)})});function wn(t,o){const n={...t};for(const i in o){const e=o[i],r=typeof e;i in Rt?(e===null||e&&(r==="string"||r==="number"))&&(n[i]=e):r===typeof n[i]&&(n[i]=i==="rotate"?e%4:e)}return n}const bn=/[\s,]+/;function xn(t,o){o.split(bn).forEach(n=>{switch(n.trim()){case"horizontal":t.hFlip=!0;break;case"vertical":t.vFlip=!0;break}})}function Sn(t,o=0){const n=t.replace(/^-?[0-9.]*/,"");function i(e){for(;e<0;)e+=4;return e%4}if(n===""){const e=parseInt(t);return isNaN(e)?0:i(e)}else if(n!==t){let e=0;switch(n){case"%":e=25;break;case"deg":e=90}if(e){let r=parseFloat(t.slice(0,t.length-n.length));return isNaN(r)?0:(r=r/e,r%1===0?i(r):0)}}return o}function vn(t,o){let n=t.indexOf("xlink:")===-1?"":' xmlns:xlink="http://www.w3.org/1999/xlink"';for(const i in o)n+=" "+i+'="'+o[i]+'"';return'<svg xmlns="http://www.w3.org/2000/svg"'+n+">"+t+"</svg>"}function In(t){return t.replace(/"/g,"'").replace(/%/g,"%25").replace(/#/g,"%23").replace(/</g,"%3C").replace(/>/g,"%3E").replace(/\s+/g," ")}function kn(t){return'url("data:image/svg+xml,'+In(t)+'")'}const kt={...Ht,inline:!1},Cn={xmlns:"http://www.w3.org/2000/svg","xmlns:xlink":"http://www.w3.org/1999/xlink","aria-hidden":!0,role:"img"},_n={display:"inline-block"},Z={backgroundColor:"currentColor"},Xt={backgroundColor:"transparent"},Ct={Image:"var(--svg)",Repeat:"no-repeat",Size:"100% 100%"},_t={webkitMask:Z,mask:Z,background:Xt};for(const t in _t){const o=_t[t];for(const n in Ct)o[t+n]=Ct[n]}const z={};["horizontal","vertical"].forEach(t=>{const o=t.slice(0,1)+"Flip";z[t+"-flip"]=o,z[t.slice(0,1)+"-flip"]=o,z[t+"Flip"]=o});function jt(t){return t+(t.match(/^[-0-9.]+$/)?"px":"")}const Tt=(t,o)=>{const n=wn(kt,o),i={...Cn},e=o.mode||"svg",r={},s=o.style,c=typeof s=="object"&&!(s instanceof Array)?s:{};for(let h in o){const u=o[h];if(u!==void 0)switch(h){case"icon":case"style":case"onLoad":case"mode":break;case"inline":case"hFlip":case"vFlip":n[h]=u===!0||u==="true"||u===1;break;case"flip":typeof u=="string"&&xn(n,u);break;case"color":r.color=u;break;case"rotate":typeof u=="string"?n[h]=Sn(u):typeof u=="number"&&(n[h]=u);break;case"ariaHidden":case"aria-hidden":u!==!0&&u!=="true"&&delete i["aria-hidden"];break;default:{const S=z[h];S?(u===!0||u==="true"||u===1)&&(n[S]=!0):kt[h]===void 0&&(i[h]=u)}}}const l=He(t,n),a=l.attributes;if(n.inline&&(r.verticalAlign="-0.125em"),e==="svg"){i.style={...r,...c},Object.assign(i,a);let h=0,u=o.id;return typeof u=="string"&&(u=u.replace(/-/g,"_")),i.innerHTML=qe(l.body,u?()=>u+"ID"+h++:"iconifyVue"),R("svg",i)}const{body:f,width:d,height:p}=t,g=e==="mask"||(e==="bg"?!1:f.indexOf("currentColor")!==-1),b=vn(f,{...a,width:d+"",height:p+""});return i.style={...r,"--svg":kn(b),width:jt(a.width),height:jt(a.height),..._n,...g?Z:Xt,...c},R("span",i)};Dt(!0);Qe("",tn);if(typeof document<"u"&&typeof window<"u"){Wt();const t=window;if(t.IconifyPreload!==void 0){const o=t.IconifyPreload,n="Invalid IconifyPreload syntax.";typeof o=="object"&&o!==null&&(o instanceof Array?o:[o]).forEach(i=>{try{(typeof i!="object"||i===null||i instanceof Array||typeof i.icons!="object"||typeof i.prefix!="string"||!Ne(i))&&console.error(n)}catch{console.error(n)}})}if(t.IconifyProviders!==void 0){const o=t.IconifyProviders;if(typeof o=="object"&&o!==null)for(let n in o){const i="IconifyProviders["+n+"] is invalid.";try{const e=o[n];if(typeof e!="object"||!e||e.resources===void 0)continue;Ge(n,e)||console.error(i)}catch{console.error(i)}}}}const jn={...P,body:""};tt({inheritAttrs:!1,data(){return{iconMounted:!1,counter:0}},mounted(){this._name="",this._loadingIcon=null,this.iconMounted=!0},unmounted(){this.abortLoading()},methods:{abortLoading(){this._loadingIcon&&(this._loadingIcon.abort(),this._loadingIcon=null)},getIcon(t,o){if(typeof t=="object"&&t!==null&&typeof t.body=="string")return this._name="",this.abortLoading(),{data:t};let n;if(typeof t!="string"||(n=F(t,!1,!0))===null)return this.abortLoading(),null;const i=zt(n);if(!i)return(!this._loadingIcon||this._loadingIcon.name!==t)&&(this.abortLoading(),this._name="",i!==null&&(this._loadingIcon={name:t,abort:Jt([n],()=>{this.counter++})})),null;this.abortLoading(),this._name!==t&&(this._name=t,o&&o(t));const e=["iconify"];return n.prefix!==""&&e.push("iconify--"+n.prefix),n.provider!==""&&e.push("iconify--"+n.provider),{data:i,classes:e}}},render(){this.counter;const t=this.$attrs,o=this.iconMounted?this.getIcon(t.icon,t.onLoad):null;if(!o)return Tt(jn,t);let n=t;return o.classes&&(n={...t,class:(typeof t.class=="string"?t.class+" ":"")+o.classes.join(" ")}),Tt({...P,...o.data},n)}});const Tn=["width","height"],$n=tt({__name:"Icon",props:{name:{type:String,required:!0},size:{type:String,default:""}},async setup(t){let o,n;const i=t,e=$t(),r=ae().nuxtIcon,s=ee("icons",()=>({})),c=ne(!1),l=E(()=>((r==null?void 0:r.aliases)||{})[i.name]||i.name),a=E(()=>{var g;return(g=s.value)==null?void 0:g[l.value]}),f=E(()=>e.vueApp.component(l.value)),d=E(()=>{const g=i.size||(r==null?void 0:r.size)||"1em";return String(Number(g))===g?`${g}px`:g});async function p(){var g;f.value||(g=s.value)!=null&&g[l.value]||(c.value=!0,s.value[l.value]=await yn(l.value).catch(()=>{}),c.value=!1)}return oe(()=>l.value,p),!f.value&&([o,n]=ie(()=>p()),o=await o,n()),(g,b)=>x(c)?(A(),lt("span",{key:0,class:"icon",width:x(d),height:x(d)},null,8,Tn)):x(a)?(A(),at(x($e),{key:1,icon:x(a),class:"icon",width:x(d),height:x(d)},null,8,["icon","width","height"])):x(f)?(A(),at(re(x(f)),{key:2,class:"icon",width:x(d),height:x(d)},null,8,["width","height"])):(A(),lt("span",{key:3,class:"icon",style:ce({fontSize:x(d),lineHeight:x(d),width:x(d),height:x(d)})},se(t.name),5))}});const Mn=le($n,[["__scopeId","data-v-ca945699"]]);export{Mn as default};
