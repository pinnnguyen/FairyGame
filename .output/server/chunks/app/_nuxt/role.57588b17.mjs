import { c as __nuxt_component_0 } from '../server.mjs';
import { defineComponent, ref, mergeProps, unref, useSSRContext } from 'vue';
import { u as useSocket } from './useSocket.a6558354.mjs';
import { ssrRenderAttrs, ssrRenderList, ssrInterpolate, ssrRenderComponent, ssrRenderAttr } from 'vue/server-renderer';
import 'ofetch';
import 'hookable';
import 'unctx';
import 'ufo';
import 'h3';
import '@unhead/vue';
import '@unhead/dom';
import 'vue-router';
import 'defu';
import 'requrl';
import '../../nitro/node-server.mjs';
import 'node-fetch-native/polyfill';
import 'http';
import 'https';
import 'destr';
import 'unenv/runtime/fetch/index';
import 'scule';
import 'ohash';
import 'unstorage';
import 'radix3';
import 'mongoose';
import 'node-cron';
import 'socket.io';
import 'moment';
import 'node:fs';
import 'node:url';
import 'pathe';
import 'ipx';
import 'socket.io-client';

const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "role",
  __ssrInlineRender: true,
  setup(__props) {
    useSocket();
    const name = ref("");
    const classList = [
      {
        id: 1,
        name: "Tu ti\xEAn",
        img: "/role/fs_007_1.png",
        description: `              <p class="text-12 mt-1">
                              Kh\u1EAFc ch\u1EBF: G\xE2y th\xEAm <strong class="text-red">10%</strong> s\xE1t th\u01B0\u01A1ng g\xE2y l\xEAn ng\u01B0\u1EDDi ch\u01A1i h\u1EC7 tu ma
                            </p>
                            <span class="text-12 font-normal">Huy\u1EBFt m\u1EA1ch: </span><span class="text-12">T\u0103ng <strong class="text-red">10%</strong> t\u1EA5n c\xF4ng, <strong>5%</strong> s\xE1t th\u01B0\u01A1ng b\u1EA1o k\xEDch c\u01A1 b\u1EA3n (Kh\xF4ng bao g\u1ED3m trang b\u1ECB)</span>
                          `
      },
      {
        id: 2,
        name: "Tu y\xEAu",
        img: "/role/fs_007_2.png",
        description: `                <p class="text-12 mt-1">
                              Kh\u1EAFc ch\u1EBF: G\xE2y th\xEAm <strong class="text-red">10%</strong> s\xE1t th\u01B0\u01A1ng g\xE2y l\xEAn ng\u01B0\u1EDDi ch\u01A1i h\u1EC7 tu ti\xEAn
                            </p>
                            <span class="text-12 font-normal">Huy\u1EBFt m\u1EA1ch: </span><span class="text-12">T\u0103ng <strong class="text-[#03a9f4]">10%</strong> sinh l\u1EF1c, <strong class="text-green">5%</strong> ph\xF2ng th\u1EE7 c\u01A1 b\u1EA3n (Kh\xF4ng bao g\u1ED3m trang b\u1ECB)</span>
                           `
      },
      {
        id: 3,
        name: "Tu ma",
        img: "/role/fs_007_4.png",
        description: `                   <p class="text-12 mt-1">
                              Kh\u1EAFc ch\u1EBF: G\xE2y th\xEAm <strong class="text-red">10%</strong> s\xE1t th\u01B0\u01A1ng g\xE2y l\xEAn ng\u01B0\u1EDDi ch\u01A1i nh\xE2n t\u1ED9c
                            </p>
                            <span class="text-12 font-normal">Huy\u1EBFt m\u1EA1ch: </span><span class="text-12">T\u0103ng <strong class="text-red">5%</strong> T\u1EA5n c\xF4ng, <strong>10%</strong> s\xE1t th\u01B0\u01A1ng b\u1EA1o k\xEDch (Kh\xF4ng bao g\u1ED3m trang b\u1ECB)</span>
                          `
      },
      {
        id: 4,
        name: "Nh\xE2n t\u1ED9c",
        img: "/role/fs_007_3.png",
        description: `              <p class="text-12 mt-1">
                              Kh\u1EAFc ch\u1EBF: G\xE2y th\xEAm <strong class="text-red">10%</strong> s\xE1t th\u01B0\u01A1ng g\xE2y l\xEAn ng\u01B0\u1EDDi ch\u01A1i h\u1EC7 tu y\xEAu
                            </p>
                            <span class="text-12 font-normal">Huy\u1EBFt m\u1EA1ch: </span><span class="text-12">T\u0103ng <strong class="text-red">5%</strong> T\u1EA5n c\xF4ng, <strong class="text-[#03a9f4]">5%</strong> sinh l\u1EF1c, <strong class="text-green">5%</strong> ph\xF2ng th\u1EE7 (Kh\xF4ng bao g\u1ED3m trang b\u1ECB)</span>
                         `
      }
    ];
    const selected = ref(classList[2]);
    return (_ctx, _push, _parent, _attrs) => {
      const _component_NuxtImg = __nuxt_component_0;
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "h-[95vh] relative bg-black/70" }, _attrs))}><div class="text-white p-2 h-full"><form class="h-full bg-black p-2 relative"><div><p class="text-center text-base font-semibold uppercase mb-1"> H\u1EC7 ph\xE1i </p><div class="flex items-start justify-between grid grid-cols-4"><!--[-->`);
      ssrRenderList(classList, (classE) => {
        _push(`<div class="mb-4 p-2"><p class="text-center font-semibold">${ssrInterpolate(classE.name)}</p>`);
        _push(ssrRenderComponent(_component_NuxtImg, {
          class: ["w-full duration-500 transition transform h-[300px] object-cover", { "scale-130": unref(selected) ? unref(selected).id === classE.id : 0 }],
          format: "webg",
          src: classE.img
        }, null, _parent));
        _push(`</div>`);
      });
      _push(`<!--]--></div></div><div class="pt-10 duration">${unref(selected).description}</div><div class="absolute bottom-0 left-0 mb-4 flex w-full justify-center items-center"><div><p><input${ssrRenderAttr("value", unref(name))} placeholder="T\xEAn nh\xE2n v\u1EADt" class="w-[160px] border border-[#dcc18d] focus:border-[#dcc18d] bg-[#2d251d] rounded h-[30px] leading-[35px] text-center flex items-center justify-center" type="text" name="username" maxlength="16"></p></div><div class="ml-2"><button class="bg-[#ffd400] text-base border-none leading-8 h-[30px] text-black flex items-center justify-center !w-[70px] !m-0 !rounded" type="submit" value="T\u1EA1o"> T\u1EA1o </button></div></div></form></div></div>`);
    };
  }
});
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/role.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};

export { _sfc_main as default };
//# sourceMappingURL=role.57588b17.mjs.map
