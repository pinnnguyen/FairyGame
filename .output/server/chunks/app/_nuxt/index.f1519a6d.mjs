import { _ as __nuxt_component_0 } from './index.6af014ab.mjs';
import { defineComponent, ref, useSSRContext } from 'vue';
import { u as useBattleRoundStore } from './useBattleRound.ecd98234.mjs';
import { u as usePlayerStore } from './usePlayer.7d831e1f.mjs';
import { u as useSocket } from './useSocket.fbc3bedd.mjs';
import { ssrRenderComponent } from 'vue/server-renderer';
import { s as storeToRefs } from '../server.mjs';
import 'socket.io-client';
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
import 'socket.io';
import 'moment';
import 'node:fs';
import 'node:url';
import 'pathe';
import 'ipx';

const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "index",
  __ssrInlineRender: true,
  setup(__props) {
    storeToRefs(useBattleRoundStore());
    useBattleRoundStore();
    storeToRefs(usePlayerStore());
    usePlayerStore();
    useSocket();
    ref(false);
    ref(false);
    return (_ctx, _push, _parent, _attrs) => {
      const _component_ClientOnly = __nuxt_component_0;
      _push(ssrRenderComponent(_component_ClientOnly, _attrs, null, _parent));
    };
  }
});
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/battle/index.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};

export { _sfc_main as default };
//# sourceMappingURL=index.f1519a6d.mjs.map
