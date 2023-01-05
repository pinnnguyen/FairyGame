import { _ as __nuxt_component_0 } from './index.2feaf918.mjs';
import { s as storeToRefs, c as useRoute } from '../server.mjs';
import { defineComponent, computed, ref, onUnmounted, useSSRContext } from 'vue';
import { u as useBattleRoundStore } from './useBattleRound.ec9cc598.mjs';
import { u as usePlayerStore } from './usePlayer.51d49ed6.mjs';
import { u as useSocket } from './useSocket.fbc3bedd.mjs';
import { ssrRenderComponent } from 'vue/server-renderer';
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
  __name: "[boss]",
  __ssrInlineRender: true,
  setup(__props) {
    storeToRefs(useBattleRoundStore());
    storeToRefs(usePlayerStore());
    const { _socket } = useSocket();
    const route = useRoute();
    useBattleRoundStore();
    computed(() => route.query.target === "boss-daily");
    computed(() => route.query.target);
    computed(() => route.query.id);
    ref(false);
    ref(false);
    onUnmounted(() => {
      console.log("battle:leave");
      _socket.emit("battle:leave");
    });
    return (_ctx, _push, _parent, _attrs) => {
      const _component_ClientOnly = __nuxt_component_0;
      _push(ssrRenderComponent(_component_ClientOnly, _attrs, null, _parent));
    };
  }
});
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/battle/[boss].vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};

export { _sfc_main as default };
//# sourceMappingURL=_boss_.f3b1f044.mjs.map
