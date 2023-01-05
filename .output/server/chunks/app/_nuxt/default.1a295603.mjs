import { f as formatCash, _ as __nuxt_component_0 } from './index.2feaf918.mjs';
import { s as storeToRefs, i as useAppStore, c as __nuxt_component_0$1 } from '../server.mjs';
import { useSSRContext, mergeProps, defineComponent, unref } from 'vue';
import { ssrRenderAttrs, ssrRenderComponent, ssrRenderSlot, ssrInterpolate } from 'vue/server-renderer';
import { u as usePlayerStore } from './usePlayer.e639d27d.mjs';
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

const _sfc_main$1 = /* @__PURE__ */ defineComponent({
  __name: "Navbar",
  __ssrInlineRender: true,
  setup(__props) {
    const { playerInfo } = storeToRefs(usePlayerStore());
    return (_ctx, _push, _parent, _attrs) => {
      var _a, _b, _c, _d, _e;
      const _component_NuxtImg = __nuxt_component_0$1;
      _push(`<div${ssrRenderAttrs(mergeProps({ style: { "background": "url('/common/bj_tongyong_2.png')", "background-size": "cover" } }, _attrs))}><div class="flex items-center justify-between mx-2"><span class="text-white px-1 text-12 bg-[#454c66] rounded-xl"><span class="">${ssrInterpolate((_a = unref(playerInfo)) == null ? void 0 : _a.levelTitle)} ${ssrInterpolate((_b = unref(playerInfo)) == null ? void 0 : _b.floor)}</span></span><div class="flex items-center"><div class="text-white text-xs flex items-center bg-[#454c66] rounded-xl m-1"><div class="px-1 flex items-center">`);
      _push(ssrRenderComponent(_component_NuxtImg, {
        class: "w-[17px]",
        format: "webp",
        src: "/items/41.png"
      }, null, _parent));
      _push(`<span class="text-10 pl-[1px]">${ssrInterpolate(unref(formatCash)((_c = unref(playerInfo)) == null ? void 0 : _c.coin))}</span></div>`);
      _push(ssrRenderComponent(_component_NuxtImg, {
        class: "w-5 ml-1",
        src: "/button/add_price.png"
      }, null, _parent));
      _push(`</div><div class="text-white text-xs flex items-center mr-2 bg-[#454c66] rounded-xl m-1"><div class="px-1 flex items-center">`);
      _push(ssrRenderComponent(_component_NuxtImg, {
        class: "w-[17px]",
        format: "webp",
        src: "/items/1_s.png"
      }, null, _parent));
      _push(`<span class="text-10 pl-[1px]">${ssrInterpolate(unref(formatCash)((_d = unref(playerInfo)) == null ? void 0 : _d.knb))}</span></div>`);
      _push(ssrRenderComponent(_component_NuxtImg, {
        class: "w-5 ml-1",
        src: "/button/add_price.png"
      }, null, _parent));
      _push(`</div><div class="text-white text-12 flex items-center mr-2 bg-[#454c66] rounded-xl m-1"><div class="px-1 flex items-center">`);
      _push(ssrRenderComponent(_component_NuxtImg, {
        class: "w-[17px]",
        format: "webp",
        src: "/items/3_s.png"
      }, null, _parent));
      _push(`<span class="text-10 pl-[1px]">${ssrInterpolate(unref(formatCash)((_e = unref(playerInfo)) == null ? void 0 : _e.gold))}</span></div>`);
      _push(ssrRenderComponent(_component_NuxtImg, {
        class: "w-5 ml-1",
        src: "/button/add_price.png"
      }, null, _parent));
      _push(`</div></div></div></div>`);
    };
  }
});
const _sfc_setup$1 = _sfc_main$1.setup;
_sfc_main$1.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/Page/Navbar.vue");
  return _sfc_setup$1 ? _sfc_setup$1(props, ctx) : void 0;
};
const _sfc_main = {
  __name: "default",
  __ssrInlineRender: true,
  setup(__props) {
    storeToRefs(useAppStore());
    return (_ctx, _push, _parent, _attrs) => {
      const _component_ClientOnly = __nuxt_component_0;
      const _component_PageNavbar = _sfc_main$1;
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "flex flex-col min-h-screen" }, _attrs))}>`);
      _push(ssrRenderComponent(_component_ClientOnly, null, null, _parent));
      ssrRenderSlot(_ctx.$slots, "header", {}, () => {
        _push(ssrRenderComponent(_component_PageNavbar, null, null, _parent));
      }, _push, _parent);
      _push(`<div class="flex-1 w-full flex flex-col bg-white"><div class="relative flex-1 flex flex-col mx-auto max-w-8xl w-full h-full">`);
      ssrRenderSlot(_ctx.$slots, "default", {}, null, _push, _parent);
      _push(`</div></div></div>`);
    };
  }
};
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("layouts/default.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};

export { _sfc_main as default };
//# sourceMappingURL=default.1a295603.mjs.map
