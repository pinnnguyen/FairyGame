import{e as p,j as s,o as f,l as b,C as v,L as E,G as m,u as k,F as x,K as S,s as h}from"./entry.e04b7afd.js";import{u as N}from"./usePlayer.703c932a.js";const C={1:"V\u0169 kh\xED",2:"N\xF3n",3:"\xC1o gi\xE1p",4:"G\u0103ng tay",5:"Th\u1EE7 h\u1ED9",6:"\u0110ai l\u01B0ng",7:"H\u1EA1ng li\xEAn",8:"Nh\u1EABn tr\xE1i",9:"Nh\u1EABn ph\u1EA3i",10:"Ng\u1ECDc b\u1ED9i"},q=p({__name:"ItemRank",props:{preview:null,rank:null},setup(a){const t=a,o=s(()=>t.rank===0?"bg-iconbg_0":t.rank===1?"bg-iconbg_1":t.rank===2?"bg-iconbg_2":t.rank===3?"bg-iconbg_3":t.rank===4?"bg-iconbg_4":t.rank===5?"bg-iconbg_5":t.rank===6?"bg-iconbg_6":"bg-iconbg_0");return(r,u)=>{const l=x;return f(),b("div",{class:m([k(o),"w-12 bg-contain bg-no-repeat relative"])},[v(l,{src:a.preview},null,8,["src"]),E(r.$slots,"default")],2)}}}),D=S("playerSlot",()=>{const{playerEquipUpgrade:a,attribute:t,equipments:o}=h(N()),r=s(()=>o.value.find(e=>{var n;return e._id===((n=t.value)==null?void 0:n.slot_1)})),u=s(()=>o.value.find(e=>{var n;return e._id===((n=t.value)==null?void 0:n.slot_2)})),l=s(()=>o.value.find(e=>{var n;return e._id===((n=t.value)==null?void 0:n.slot_3)})),i=s(()=>o.value.find(e=>{var n;return e._id===((n=t.value)==null?void 0:n.slot_4)})),c=s(()=>o.value.find(e=>{var n;return e._id===((n=t.value)==null?void 0:n.slot_5)})),_=s(()=>o.value.find(e=>{var n;return e._id===((n=t.value)==null?void 0:n.slot_6)})),g=s(()=>o.value.find(e=>{var n;return e._id===((n=t.value)==null?void 0:n.slot_7)})),d=s(()=>o.value.find(e=>{var n;return e._id===((n=t.value)==null?void 0:n.slot_8)}));return{slot1:r,slot2:u,slot3:l,slot4:i,slot5:c,slot6:_,slot7:g,slot8:d,getSlotEquipUpgrade:e=>a.value.find(n=>n.slot===e)}});export{C as E,q as _,D as u};
