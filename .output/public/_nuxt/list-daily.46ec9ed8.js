import{e as w,s as y,i as l,o as n,l as i,B as s,C as a,t as u,F as k,D as g,c as B,G as _,z as C,d as j,_ as A,H as T,J as z}from"./entry.e4ed885a.js";import{_ as D}from"./ButtonConfirm.4036d8ed.js";import{u as F}from"./usePlayer.c8e019ab.js";import{s as m}from"./useMessage.4b7ebf92.js";const I=j(()=>A(()=>import("./ItemRank.402cba45.js"),["./ItemRank.402cba45.js","./usePlayerSlot.84ef414f.js","./entry.e4ed885a.js","./entry.1769143d.css","./usePlayer.c8e019ab.js"],import.meta.url).then(t=>t.default||t)),L={class:"w-[90%] h-[80px] bg-[#a0aac0cf] rounded flex justify-between"},S={class:"flex flex-col items-center justify-center"},$={class:"relative mr-2"},N={class:"text-10 text-white h-3 object-cover absolute bottom-[2px] left-[calc(50%_-_20px)]"},O={class:"flex items-center justify-center"},P={class:"flex items-center z-1 flex flex-col justify-center items-center"},R={class:"text-[#439546] text-12 font-semibold mr-2"},V=s("span",{class:"font-semibold text-[#9d521a] z-9"},"Khi\xEAu chi\u1EBFn",-1),W=w({__name:"list-daily",props:{boss:null},setup(t){const{playerInfo:d}=y(F()),f=l({}),p=l(!1),x=e=>{f.value=e,p.value=!0},h=e=>{if(d.value.level<e.level){m("Ch\u01B0a \u0111\u1EA1t c\u1EA5p \u0111\u1ED9");return}if(e.numberOfTurn<=0){m("L\u01B0\u1EE3t khi\xEAu chi\u1EBFn trong ng\xE0y \u0111\xE3 h\u1EBFt");return}T({path:`/battle/${new Date().getTime()}`,replace:!0,query:{target:"boss-daily",id:e.id}})},b=e=>e.length>3?e.splice(0,1):e;return(e,r)=>{const c=z,v=I,E=D;return n(),i("section",L,[s("div",S,[s("div",$,[a(c,{class:"w-[55px] h-[55px] rounded-full border border-[#bbc4d2]",format:"webp",src:t.boss.avatar},null,8,["src"]),a(c,{class:"w-10 h-3 object-cover absolute bottom-0 left-[calc(50%_-_20px)]",format:"webp",src:"/panel/common_2.png"}),s("p",N,u(t.boss.name),1)])]),s("div",O,[(n(!0),i(k,null,g(b(t.boss.reward.equipments),o=>(n(),B(v,{key:o.name,class:"w-[40px] h-[40px]",rank:o.rank,preview:o.preview,onClick:_(M=>x(o),["stop"])},null,8,["rank","preview","onClick"]))),128))]),s("div",P,[s("p",R," L\u01B0\u1EE3t "+u(t.boss.numberOfTurn),1),a(E,{"class-name":"h-[25px] text-10",onClick:r[0]||(r[0]=_(o=>h(t.boss),["stop"]))},{default:C(()=>[V]),_:1})])])}}});export{W as default};
