import { s as storeToRefs, n as navigateTo$1, f as __nuxt_component_0 } from '../server.mjs';
import { defineComponent, ref, mergeProps, withCtx, createVNode, useSSRContext, defineAsyncComponent } from 'vue';
import { s as sendMessage, a as _sfc_main$1 } from './useMessage.ea1a408e.mjs';
import { ssrRenderAttrs, ssrRenderComponent, ssrInterpolate, ssrRenderList } from 'vue/server-renderer';
import { u as usePlayerStore } from './usePlayer.51d49ed6.mjs';
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
import 'vexip-ui';

const __nuxt_component_1_lazy = /* @__PURE__ */ defineAsyncComponent(() => import('./index.e0725359.mjs').then((n) => n.I).then((m) => m.default || m));
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "list-daily",
  __ssrInlineRender: true,
  props: {
    boss: null
  },
  setup(__props) {
    const { playerInfo } = storeToRefs(usePlayerStore());
    const equipSelected = ref({});
    const equipShow = ref(false);
    const pickItem = (equipment) => {
      equipSelected.value = equipment;
      equipShow.value = true;
    };
    const startWar = (boss) => {
      if (playerInfo.value.level < boss.level) {
        sendMessage("Ch\u01B0a \u0111\u1EA1t c\u1EA5p \u0111\u1ED9");
        return;
      }
      if (boss.numberOfTurn <= 0) {
        sendMessage("L\u01B0\u1EE3t khi\xEAu chi\u1EBFn trong ng\xE0y \u0111\xE3 h\u1EBFt");
        return;
      }
      navigateTo$1({
        path: `/battle/${new Date().getTime()}`,
        replace: true,
        query: {
          target: "boss-daily",
          id: boss.id
        }
      });
    };
    const parseEquipments = (equipments) => {
      if (equipments.length > 3)
        return equipments.splice(0, 1);
      return equipments;
    };
    return (_ctx, _push, _parent, _attrs) => {
      const _component_NuxtImg = __nuxt_component_0;
      const _component_LazyItemRank = __nuxt_component_1_lazy;
      const _component_ButtonConfirm = _sfc_main$1;
      _push(`<section${ssrRenderAttrs(mergeProps({ class: "w-[90%] h-[80px] bg-[#a0aac0cf] rounded flex justify-between" }, _attrs))}><div class="flex flex-col items-center justify-center"><div class="relative mr-2">`);
      _push(ssrRenderComponent(_component_NuxtImg, {
        class: "w-[55px] h-[55px] rounded-full border border-[#bbc4d2]",
        format: "webp",
        src: __props.boss.avatar
      }, null, _parent));
      _push(ssrRenderComponent(_component_NuxtImg, {
        class: "w-10 h-3 object-cover absolute bottom-0 left-[calc(50%_-_20px)]",
        format: "webp",
        src: "/panel/common_2.png"
      }, null, _parent));
      _push(`<p class="text-10 text-white h-3 object-cover absolute bottom-[2px] left-[calc(50%_-_20px)]">${ssrInterpolate(__props.boss.name)}</p></div></div><div class="flex items-center justify-center"><!--[-->`);
      ssrRenderList(parseEquipments(__props.boss.reward.equipments), (equipment) => {
        _push(ssrRenderComponent(_component_LazyItemRank, {
          key: equipment.name,
          class: "w-[40px] h-[40px]",
          rank: equipment.rank,
          preview: equipment.preview,
          onClick: ($event) => pickItem(equipment)
        }, null, _parent));
      });
      _push(`<!--]--></div><div class="flex items-center z-1 flex flex-col justify-center items-center"><p class="text-[#439546] text-12 font-semibold mr-2"> L\u01B0\u1EE3t ${ssrInterpolate(__props.boss.numberOfTurn)}</p>`);
      _push(ssrRenderComponent(_component_ButtonConfirm, {
        "class-name": "h-[25px] text-10",
        onClick: ($event) => startWar(__props.boss)
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<span class="font-semibold text-[#9d521a] z-9"${_scopeId}>Khi\xEAu chi\u1EBFn</span>`);
          } else {
            return [
              createVNode("span", { class: "font-semibold text-[#9d521a] z-9" }, "Khi\xEAu chi\u1EBFn")
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`</div></section>`);
    };
  }
});
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/Boss/list-daily.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};

export { _sfc_main as default };
//# sourceMappingURL=list-daily.3b925470.mjs.map
