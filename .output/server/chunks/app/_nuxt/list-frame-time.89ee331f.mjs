import { s as storeToRefs, n as navigateTo$1, c as __nuxt_component_0 } from '../server.mjs';
import { defineComponent, ref, computed, unref, withCtx, createVNode, useSSRContext, defineAsyncComponent } from 'vue';
import { _ as _sfc_main$1 } from './ButtonConfirm.4cffc41f.mjs';
import { ssrInterpolate, ssrRenderComponent, ssrRenderList } from 'vue/server-renderer';
import { u as usePlayerStore } from './usePlayer.e639d27d.mjs';
import { s as sendMessage } from './index.3fe9ef32.mjs';
import { t as timeOffset } from './index.2feaf918.mjs';
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
import './index.eb8b2543.mjs';
import './useSocket.a6558354.mjs';
import 'socket.io-client';
import 'vexip-ui';

const __nuxt_component_1_lazy = /* @__PURE__ */ defineAsyncComponent(() => import('./index.3fe9ef32.mjs').then((n) => n.I).then((m) => m.default || m));
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "list-frame-time",
  __ssrInlineRender: true,
  props: {
    boss: null
  },
  setup(__props) {
    const props = __props;
    const { playerInfo } = storeToRefs(usePlayerStore());
    const equipSelected = ref({});
    const equipShow = ref(false);
    const now = new Date().getTime();
    const startTime = computed(() => (props.boss.startHours - new Date().getTime()) / 1e3);
    const endTime = computed(() => (props.boss.endHours - now) / 1e3);
    const pickItem = (equipment) => {
      equipSelected.value = equipment;
      equipShow.value = true;
    };
    const startWar = (boss) => {
      if (!props.boss.isStart) {
        sendMessage("Th\u1EDDi gian ho\u1EA1t \u0111\u1ED9ng \u0111\xE3 k\u1EBFt th\xFAc");
        return;
      }
      if (playerInfo.value && playerInfo.value.level < 10) {
        sendMessage("Ch\u01B0a \u0111\u1EA1t c\u1EA5p \u0111\u1ED9 10");
        return;
      }
      navigateTo$1({
        path: `/battle/${new Date().getTime()}`,
        replace: true,
        query: {
          target: "boss-frame-time",
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
      _push(`<!--[--><p class="text-[#439546] text-12 font-semibold mr-2">`);
      if (!__props.boss.isStart) {
        _push(`<span> Boss h\u1ED3i sinh sau: ${ssrInterpolate(unref(timeOffset)(unref(startTime)).hours)}h ${ssrInterpolate(unref(timeOffset)(unref(startTime)).minutes)}ph\xFAt </span>`);
      } else {
        _push(`<span> Boss k\u1EBFt th\xFAc sau: ${ssrInterpolate(unref(timeOffset)(unref(endTime)).hours)}h ${ssrInterpolate(unref(timeOffset)(unref(endTime)).minutes)}ph\xFAt </span>`);
      }
      _push(`</p><section class="w-[90%] h-[80px] bg-[#a0aac0cf] rounded flex justify-between"><div class="flex flex-col items-center justify-center"><div class="relative mr-2">`);
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
      _push(`<!--]--></div><div class="flex items-center z-1 flex flex-col justify-center items-center">`);
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
      _push(`</div></section><!--]-->`);
    };
  }
});
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/Boss/list-frame-time.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};

export { _sfc_main as default };
//# sourceMappingURL=list-frame-time.89ee331f.mjs.map
