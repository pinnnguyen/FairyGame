import{w as m,a4 as te,z as re,ak as oe,al as ie,a5 as se,i as I,a0 as p,e as j,am as le,an as k,ac as de,T as R,o as h,c as L,W as y,p as U,m as ue,K as ce,$ as C,j as M,U as c,ag as fe,I as $,C as pe,D as ve,l as me,s as A,X as T,v as H,t as W,A as K,a6 as ge,B as N,E,ab as V,aa as ye,a8 as ke,r as D,ae as he,ao as be,af as Ce,ap as Oe,a9 as Se}from"./entry.303ba4a8.js";import{C as f,p as O,L as we}from"./ButtonSfc.676ad373.js";function X(){var e=Object.keys(f.locks).length;e<=0?document.body.classList.remove("var--lock"):document.body.classList.add("var--lock")}function S(e){f.locks[e]=1,X()}function w(e){delete f.locks[e],X()}function ze(e,n){var{uid:a}=se();n&&m(n,t=>{t===!1?w(a):t===!0&&e()===!0&&S(a)}),m(e,t=>{n&&n()===!1||(t===!0?S(a):w(a))}),te(()=>{n&&n()===!1||e()===!0&&S(a)}),re(()=>{n&&n()===!1||e()===!0&&w(a)}),oe(()=>{n&&n()===!1||e()===!0&&S(a)}),ie(()=>{n&&n()===!1||e()===!0&&w(a)})}function Ie(e,n){var a=I(f.zIndex);return m(e,t=>{t&&(f.zIndex+=n,a.value=f.zIndex)},{immediate:!0}),{zIndex:a}}var Le={name:{type:String},size:{type:[Number,String]},color:{type:String},namespace:{type:String,default:"var-icon"},transition:{type:[Number,String],default:0},onClick:p()};function Y(e,n,a,t,o,r,i){try{var l=e[r](i),u=l.value}catch(ae){a(ae);return}l.done?n(u):Promise.resolve(u).then(t,o)}function Te(e){return function(){var n=this,a=arguments;return new Promise(function(t,o){var r=e.apply(n,a);function i(u){Y(r,t,o,i,l,"next",u)}function l(u){Y(r,t,o,i,l,"throw",u)}i(void 0)})}}var{n:Ne,classes:Ae}=R("icon");function Ee(e,n){return h(),L(ue(e.isURL(e.name)?"img":"i"),{class:y(e.classes(e.n(),[e.namespace!==e.n(),e.namespace],e.namespace+"--set",[e.isURL(e.name),e.n("image"),e.namespace+"-"+e.nextName],[e.shrinking,e.n("--shrinking")])),style:U({color:e.color,transition:"transform "+e.toNumber(e.transition)+"ms",width:e.isURL(e.name)?e.toSizeUnit(e.size):null,height:e.isURL(e.name)?e.toSizeUnit(e.size):null,fontSize:e.toSizeUnit(e.size)}),src:e.isURL(e.name)?e.nextName:null,onClick:e.onClick},null,8,["class","style","src","onClick"])}var Z=j({name:"VarIcon",props:Le,setup(e){var n=I(""),a=I(!1),t=function(){var o=Te(function*(r,i){var{transition:l}=e;if(i==null||k(l)===0){n.value=r;return}a.value=!0,yield ce(),setTimeout(()=>{i!=null&&(n.value=r),a.value=!1},k(l))});return function(i,l){return o.apply(this,arguments)}}();return m(()=>e.name,t,{immediate:!0}),{n:Ne,classes:Ae,nextName:n,shrinking:a,isURL:le,toNumber:k,toSizeUnit:de}}});Z.render=Ee;const z=Z;z.install=function(e){e.component(z.name,z)};function P(){return P=Object.assign?Object.assign.bind():function(e){for(var n=1;n<arguments.length;n++){var a=arguments[n];for(var t in a)Object.prototype.hasOwnProperty.call(a,t)&&(e[t]=a[t])}return e},P.apply(this,arguments)}function Ue(e){var n=["top","center","bottom"];return n.includes(e)}function $e(e){return q.includes(e)}var J={type:{type:String,validator:$e},position:{type:String,default:"top",validator:Ue},content:{type:String},contentClass:{type:String},duration:{type:Number,default:3e3},vertical:{type:Boolean,default:!1},loadingType:C(O,"type"),loadingSize:C(O,"size"),loadingRadius:C(O,"radius"),loadingColor:P({},C(O,"color"),{default:"currentColor"}),lockScroll:{type:Boolean,default:!1},show:{type:Boolean,default:!1},teleport:{type:String,default:"body"},forbidClick:{type:Boolean,default:!1},onOpen:p(),onOpened:p(),onClose:p(),onClosed:p(),"onUpdate:show":p(),_update:{type:String}},{n:Ve,classes:Pe}=R("snackbar"),Be={success:"checkbox-marked-circle",warning:"warning",info:"information",error:"error",loading:""};function je(e,n){var a=$("var-icon"),t=$("var-loading");return pe((h(),me("div",{class:y(e.n()),style:U({pointerEvents:e.isForbidClick?"auto":"none",zIndex:e.zIndex})},[A("div",{class:y(e.classes(e.n("wrapper"),e.n("wrapper-"+e.position),e.n("$-elevation--4"),[e.vertical,e.n("vertical")],[e.type&&e.SNACKBAR_TYPE.includes(e.type),e.n("wrapper-"+e.type)])),style:U({zIndex:e.zIndex})},[A("div",{class:y([e.n("content"),e.contentClass])},[T(e.$slots,"default",{},()=>[H(W(e.content),1)])],2),A("div",{class:y(e.n("action"))},[e.iconName?(h(),L(a,{key:0,name:e.iconName},null,8,["name"])):K("v-if",!0),e.type==="loading"?(h(),L(t,{key:1,type:e.loadingType,size:e.loadingSize,color:e.loadingColor,radius:e.loadingRadius},null,8,["type","size","color","radius"])):K("v-if",!0),T(e.$slots,"action")],2)],6)],6)),[[ve,e.show]])}var Q=j({name:"VarSnackbarCore",components:{VarLoading:we,VarIcon:z},props:J,setup(e){var n=I(null),{zIndex:a}=Ie(()=>e.show,1);ze(()=>e.show,()=>e.lockScroll);var t=M(()=>e.type==="loading"||e.forbidClick),o=M(()=>e.type?Be[e.type]:""),r=()=>{n.value=setTimeout(()=>{e.type!=="loading"&&c(e["onUpdate:show"],!1)},e.duration)};return m(()=>e.show,i=>{i?(c(e.onOpen),r()):i===!1&&(clearTimeout(n.value),c(e.onClose))}),m(()=>e._update,()=>{clearTimeout(n.value),r()}),fe(()=>{e.show&&(c(e.onOpen),r())}),{SNACKBAR_TYPE:q,n:Ve,classes:Pe,zIndex:a,iconName:o,isForbidClick:t}}});Q.render=je;const _=Q;var{n:Re}=R("snackbar");function De(e,n){var a=$("var-snackbar-core");return h(),L(ke,{to:e.teleport,disabled:e.disabled},[N(ye,{name:e.n()+"-fade",onAfterEnter:e.onOpened,onAfterLeave:e.onClosed},{default:E(()=>[N(a,V(e.$props,{class:e.n("transition")}),{action:E(()=>[T(e.$slots,"action")]),default:E(()=>[T(e.$slots,"default",{},()=>[H(W(e.content),1)])]),_:3},16,["class"])]),_:3},8,["name","onAfterEnter","onAfterLeave"])],8,["to","disabled"])}var x=j({name:"VarSnackbar",components:{VarSnackbarCore:_},props:J,setup(){var{disabled:e}=ge();return{n:Re,disabled:e}}});x.render=De;const v=x;function b(){return b=Object.assign?Object.assign.bind():function(e){for(var n=1;n<arguments.length;n++){var a=arguments[n];for(var t in a)Object.prototype.hasOwnProperty.call(a,t)&&(e[t]=a[t])}return e},b.apply(this,arguments)}function qe(e){return typeof e=="function"||Object.prototype.toString.call(e)==="[object Object]"&&!Se(e)}var q=["loading","success","warning","info","error"],F=0,B=!1,ee,g=!1,ne={type:void 0,content:"",position:"top",duration:3e3,vertical:!1,contentClass:void 0,loadingType:"circle",loadingSize:"normal",lockScroll:!1,teleport:"body",forbidClick:!1,onOpen:()=>{},onOpened:()=>{},onClose:()=>{},onClosed:()=>{}},s=D([]),G=ne,Ge={name:"var-snackbar-fade",tag:"div",class:"var-transition-group"},Me={setup(){return()=>{var e=s.map(n=>{var{id:a,reactiveSnackOptions:t,_update:o}=n,r=document.querySelector(".var-transition-group");t.forbidClick||t.type==="loading"?r.classList.add("var-pointer-auto"):r.classList.remove("var-pointer-auto"),g&&(t.position="top");var i=g?"relative":"absolute",l=b({position:i},Xe(t.position));return N(_,V(t,{key:a,style:l,"data-id":a,_update:o,show:t.show,"onUpdate:show":u=>t.show=u}),null)});return N(Oe,V(Ge,{style:{zIndex:f.zIndex},onAfterEnter:Ke,onAfterLeave:Ye}),qe(e)?e:{default:()=>[e]})}}},d=function(e){var n=He(e),a=D(b({},G,n));a.show=!0,B||(B=!0,ee=he(Me).unmountInstance);var{length:t}=s,o={id:F++,reactiveSnackOptions:a};if(t===0||g)Fe(o);else{var r="update-"+F;We(a,r)}return{clear(){!g&&s.length?s[0].reactiveSnackOptions.show=!1:a.show=!1}}};q.forEach(e=>{d[e]=n=>(be(n)?n.type=e:n={content:n,type:e},d(n))});d.install=function(e){e.component(v.name,v)};d.allowMultiple=function(e){e===void 0&&(e=!1),e!==g&&(s.forEach(n=>{n.reactiveSnackOptions.show=!1}),g=e)};d.clear=function(){s.forEach(e=>{e.reactiveSnackOptions.show=!1})};d.setDefaultOptions=function(e){G=e};d.resetDefaultOptions=function(){G=ne};d.Component=v;function Ke(e){var n=e.getAttribute("data-id"),a=s.find(t=>t.id===k(n));a&&c(a.reactiveSnackOptions.onOpened)}function Ye(e){e.parentElement&&e.parentElement.classList.remove("var-pointer-auto");var n=e.getAttribute("data-id"),a=s.find(o=>o.id===k(n));a&&(a.animationEnd=!0,c(a.reactiveSnackOptions.onClosed));var t=s.every(o=>o.animationEnd);t&&(c(ee),s=D([]),B=!1)}function Fe(e){s.push(e)}function He(e){return e===void 0&&(e={}),Ce(e)?{content:e}:e}function We(e,n){var[a]=s;a.reactiveSnackOptions=b({},a.reactiveSnackOptions,e),a._update=n}function Xe(e){return e===void 0&&(e="top"),e==="bottom"?{[e]:"5%"}:{top:e==="top"?"5%":"45%"}}v.install=function(e){e.component(v.name,v)};const Ze=d,_e=(e,n,a)=>{Ze({content:e,position:a??"bottom",duration:n??2e3})};export{z as I,Ze as S,ze as a,_e as s,Ie as u};
