import{i as q,M as w,w as E,N as b,O as P,u as h,K as U,j as r,P as S,D as I}from"./entry.e04b7afd.js";var y;const d=typeof window<"u",A=t=>typeof t=="function",_=t=>typeof t=="string",$=()=>{};d&&((y=window==null?void 0:window.navigator)==null?void 0:y.userAgent)&&/iP(ad|hone|od)/.test(window.navigator.userAgent);function C(t){return typeof t=="function"?t():h(t)}function k(t){return t}function m(t){return b()?(P(t),!0):!1}function v(...t){if(t.length===2){const[n,u]=t;n.value=u}if(t.length===3){const[n,u,a]=t;n[u]=a}}function F(t,n=1e3,u={}){const{immediate:a=!0,immediateCallback:o=!1}=u;let i=null;const s=q(!1);function p(){i&&(clearInterval(i),i=null)}function c(){s.value=!1,p()}function l(){h(n)<=0||(s.value=!0,o&&t(),p(),i=setInterval(t,C(n)))}if(a&&d&&l(),w(n)||A(n)){const g=E(n,()=>{s.value&&d&&l()});m(g)}return m(c),{isActive:s,pause:c,resume:l}}const O=U("player",()=>{const t=q(),n=r(()=>{var e;return(e=t.value)==null?void 0:e.sid}),u=r(()=>{var e;return(e=t.value)==null?void 0:e.mid}),a=r(()=>{var e;return(e=t.value)==null?void 0:e.upgrade}),o=r(()=>{var e;return(e=t.value)==null?void 0:e.attribute}),i=r(()=>{var e;return(e=t.value)==null?void 0:e.equipments}),s=r(()=>{var e;return(e=t.value)==null?void 0:e.playerEquipUpgrade});return{sid:n,mids:u,playerInfo:t,getPlayer:async()=>{const e=await $fetch("/api/player",{headers:S()});if(!e)return I("/role");v(t,{...e==null?void 0:e.player,attribute:{...e==null?void 0:e.attribute},mid:{...e==null?void 0:e.mid},upgrade:{...e==null?void 0:e.upgrade},equipments:e.equipments,playerEquipUpgrade:e.playerEquipUpgrade})},loadPlayer:e=>{v(t,{...e.player,attribute:{...e.attribute},mid:{...e.mid},upgrade:{...e.upgrade},equipments:e.equipments,playerEquipUpgrade:e.playerEquipUpgrade})},upgrade:a,attribute:o,hasEquip:(e,f)=>o.value[`slot_${e}`]===f,changeEquip:(e,f)=>o.value[`slot_${e}`]=f,equipments:i,playerEquipUpgrade:s}});export{_ as a,k as b,F as c,d as i,$ as n,C as r,v as s,m as t,O as u};
