import{w as m,a4 as ne,z as ae,al as te,am as re,a5 as oe,i as I,a0 as p,e as R,an as ie,ao as k,ac as se,T as q,o as h,c as L,W as y,p as $,m as le,K as de,$ as C,j as M,U as u,ah as ue,I as P,C as ce,D as fe,l as pe,s as E,X as N,v as H,t as W,A as K,a6 as ve,B as T,E as U,ab as V,aa as me,a8 as ge,r as D,ae as ye,ap as ke,af as he,ag as be,aq as Ce,a9 as Se}from"./entry.937bdf01.js";import{C as c,p as S,L as Oe}from"./ButtonSfc.4224516d.js";function X(){var e=Object.keys(c.locks).length;e<=0?document.body.classList.remove("var--lock"):document.body.classList.add("var--lock")}function O(e){c.locks[e]=1,X()}function w(e){delete c.locks[e],X()}function we(e,n){var{uid:a}=oe();n&&m(n,t=>{t===!1?w(a):t===!0&&e()===!0&&O(a)}),m(e,t=>{n&&n()===!1||(t===!0?O(a):w(a))}),ne(()=>{n&&n()===!1||e()===!0&&O(a)}),ae(()=>{n&&n()===!1||e()===!0&&w(a)}),te(()=>{n&&n()===!1||e()===!0&&O(a)}),re(()=>{n&&n()===!1||e()===!0&&w(a)})}function ze(e,n){var a=I(c.zIndex);return m(e,t=>{t&&(c.zIndex+=n,a.value=c.zIndex)},{immediate:!0}),{zIndex:a}}var Ie={name:{type:String},size:{type:[Number,String]},color:{type:String},namespace:{type:String,default:"var-icon"},transition:{type:[Number,String],default:0},onClick:p()};function Y(e,n,a,t,r,o,i){try{var l=e[o](i),d=l.value}catch(A){a(A);return}l.done?n(d):Promise.resolve(d).then(t,r)}function Le(e){return function(){var n=this,a=arguments;return new Promise(function(t,r){var o=e.apply(n,a);function i(d){Y(o,t,r,i,l,"next",d)}function l(d){Y(o,t,r,i,l,"throw",d)}i(void 0)})}}var{n:Ne,classes:Te}=q("icon");function Ae(e,n){return h(),L(le(e.isURL(e.name)?"img":"i"),{class:y(e.classes(e.n(),[e.namespace!==e.n(),e.namespace],e.namespace+"--set",[e.isURL(e.name),e.n("image"),e.namespace+"-"+e.nextName],[e.shrinking,e.n("--shrinking")])),style:$({color:e.color,transition:"transform "+e.toNumber(e.transition)+"ms",width:e.isURL(e.name)?e.toSizeUnit(e.size):null,height:e.isURL(e.name)?e.toSizeUnit(e.size):null,fontSize:e.toSizeUnit(e.size)}),src:e.isURL(e.name)?e.nextName:null,onClick:e.onClick},null,8,["class","style","src","onClick"])}var Z=R({name:"VarIcon",props:Ie,setup(e){var n=I(""),a=I(!1),t=function(){var r=Le(function*(o,i){var{transition:l}=e;if(i==null||k(l)===0){n.value=o;return}a.value=!0,yield de(),setTimeout(()=>{i!=null&&(n.value=o),a.value=!1},k(l))});return function(i,l){return r.apply(this,arguments)}}();return m(()=>e.name,t,{immediate:!0}),{n:Ne,classes:Te,nextName:n,shrinking:a,isURL:ie,toNumber:k,toSizeUnit:se}}});Z.render=Ae;const z=Z;z.install=function(e){e.component(z.name,z)};function B(){return B=Object.assign?Object.assign.bind():function(e){for(var n=1;n<arguments.length;n++){var a=arguments[n];for(var t in a)Object.prototype.hasOwnProperty.call(a,t)&&(e[t]=a[t])}return e},B.apply(this,arguments)}function Ee(e){var n=["top","center","bottom"];return n.includes(e)}function Ue(e){return G.includes(e)}var J={type:{type:String,validator:Ue},position:{type:String,default:"top",validator:Ee},content:{type:String},contentClass:{type:String},duration:{type:Number,default:3e3},vertical:{type:Boolean,default:!1},loadingType:C(S,"type"),loadingSize:C(S,"size"),loadingRadius:C(S,"radius"),loadingColor:B({},C(S,"color"),{default:"currentColor"}),lockScroll:{type:Boolean,default:!1},show:{type:Boolean,default:!1},teleport:{type:String,default:"body"},forbidClick:{type:Boolean,default:!1},onOpen:p(),onOpened:p(),onClose:p(),onClosed:p(),"onUpdate:show":p(),_update:{type:String}},{n:$e,classes:Pe}=q("snackbar"),Ve={success:"checkbox-marked-circle",warning:"warning",info:"information",error:"error",loading:""};function Be(e,n){var a=P("var-icon"),t=P("var-loading");return ce((h(),pe("div",{class:y(e.n()),style:$({pointerEvents:e.isForbidClick?"auto":"none",zIndex:e.zIndex})},[E("div",{class:y(e.classes(e.n("wrapper"),e.n("wrapper-"+e.position),e.n("$-elevation--4"),[e.vertical,e.n("vertical")],[e.type&&e.SNACKBAR_TYPE.includes(e.type),e.n("wrapper-"+e.type)])),style:$({zIndex:e.zIndex})},[E("div",{class:y([e.n("content"),e.contentClass])},[N(e.$slots,"default",{},()=>[H(W(e.content),1)])],2),E("div",{class:y(e.n("action"))},[e.iconName?(h(),L(a,{key:0,name:e.iconName},null,8,["name"])):K("v-if",!0),e.type==="loading"?(h(),L(t,{key:1,type:e.loadingType,size:e.loadingSize,color:e.loadingColor,radius:e.loadingRadius},null,8,["type","size","color","radius"])):K("v-if",!0),N(e.$slots,"action")],2)],6)],6)),[[fe,e.show]])}var Q=R({name:"VarSnackbarCore",components:{VarLoading:Oe,VarIcon:z},props:J,setup(e){var n=I(null),{zIndex:a}=ze(()=>e.show,1);we(()=>e.show,()=>e.lockScroll);var t=M(()=>e.type==="loading"||e.forbidClick),r=M(()=>e.type?Ve[e.type]:""),o=()=>{n.value=setTimeout(()=>{e.type!=="loading"&&u(e["onUpdate:show"],!1)},e.duration)};return m(()=>e.show,i=>{i?(u(e.onOpen),o()):i===!1&&(clearTimeout(n.value),u(e.onClose))}),m(()=>e._update,()=>{clearTimeout(n.value),o()}),ue(()=>{e.show&&(u(e.onOpen),o())}),{SNACKBAR_TYPE:G,n:$e,classes:Pe,zIndex:a,iconName:r,isForbidClick:t}}});Q.render=Be;const _=Q;var{n:je}=q("snackbar");function Re(e,n){var a=P("var-snackbar-core");return h(),L(ge,{to:e.teleport,disabled:e.disabled},[T(me,{name:e.n()+"-fade",onAfterEnter:e.onOpened,onAfterLeave:e.onClosed},{default:U(()=>[T(a,V(e.$props,{class:e.n("transition")}),{action:U(()=>[N(e.$slots,"action")]),default:U(()=>[N(e.$slots,"default",{},()=>[H(W(e.content),1)])]),_:3},16,["class"])]),_:3},8,["name","onAfterEnter","onAfterLeave"])],8,["to","disabled"])}var x=R({name:"VarSnackbar",components:{VarSnackbarCore:_},props:J,setup(){var{disabled:e}=ve();return{n:je,disabled:e}}});x.render=Re;const v=x;function b(){return b=Object.assign?Object.assign.bind():function(e){for(var n=1;n<arguments.length;n++){var a=arguments[n];for(var t in a)Object.prototype.hasOwnProperty.call(a,t)&&(e[t]=a[t])}return e},b.apply(this,arguments)}function qe(e){return typeof e=="function"||Object.prototype.toString.call(e)==="[object Object]"&&!Se(e)}var G=["loading","success","warning","info","error"],F=0,j=!1,ee,g=!1,s=D([]),De={type:void 0,content:"",position:"top",duration:3e3,vertical:!1,contentClass:void 0,loadingType:"circle",loadingSize:"normal",lockScroll:!1,teleport:"body",forbidClick:!1,onOpen:()=>{},onOpened:()=>{},onClose:()=>{},onClosed:()=>{}},Ge={name:"var-snackbar-fade",tag:"div",class:"var-transition-group"},Me={setup(){return()=>{var e=s.map(a=>{var{id:t,reactiveSnackOptions:r,_update:o}=a,i=document.querySelector(".var-transition-group");r.forbidClick||r.type==="loading"?i.classList.add("var-pointer-auto"):i.classList.remove("var-pointer-auto"),g&&(r.position="top");var l=g?"relative":"absolute",d=b({position:l},We(r.position));return T(_,V(r,{key:t,style:d,"data-id":t,_update:o,show:r.show,"onUpdate:show":A=>r.show=A}),null)}),n=c.zIndex;return T(Ce,V(Ge,{style:{zIndex:n},onAfterEnter:Ke,onAfterLeave:Ye}),qe(e)?e:{default:()=>[e]})}}},f=function(e){var n=he(e)||be(e)?{content:String(e)}:e,a=D(b({},De,n));a.show=!0,j||(j=!0,ee=ye(Me).unmountInstance);var{length:t}=s,r={id:F++,reactiveSnackOptions:a};if(t===0||g)Fe(r);else{var o="update-"+F;He(a,o)}return{clear(){!g&&s.length?s[0].reactiveSnackOptions.show=!1:a.show=!1}}};G.forEach(e=>{f[e]=n=>(ke(n)?n.type=e:n={content:n,type:e},f(n))});f.install=function(e){e.component(v.name,v)};f.allowMultiple=function(e){e===void 0&&(e=!1),e!==g&&(s.forEach(n=>{n.reactiveSnackOptions.show=!1}),g=e)};f.clear=function(){s.forEach(e=>{e.reactiveSnackOptions.show=!1})};f.Component=v;function Ke(e){var n=e.getAttribute("data-id"),a=s.find(t=>t.id===k(n));a&&u(a.reactiveSnackOptions.onOpened)}function Ye(e){e.parentElement&&e.parentElement.classList.remove("var-pointer-auto");var n=e.getAttribute("data-id"),a=s.find(r=>r.id===k(n));a&&(a.animationEnd=!0,u(a.reactiveSnackOptions.onClosed));var t=s.every(r=>r.animationEnd);t&&(u(ee),s=D([]),j=!1)}function Fe(e){s.push(e)}function He(e,n){var[a]=s;a.reactiveSnackOptions=b({},a.reactiveSnackOptions,e),a._update=n}function We(e){return e===void 0&&(e="top"),e==="bottom"?{[e]:"5%"}:{top:e==="top"?"5%":"45%"}}v.install=function(e){e.component(v.name,v)};const Xe=f,Qe=(e,n,a)=>{Xe({content:e,position:a??"bottom",duration:n??2e3})};export{z as I,Xe as S,we as a,Qe as s,ze as u};
