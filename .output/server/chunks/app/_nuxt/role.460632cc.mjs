import { l as defineNuxtRouteMiddleware, e as useRequestHeaders, n as navigateTo$1 } from '../server.mjs';
import { u as usePlayerStore } from './usePlayer.51d49ed6.mjs';
import { executeAsync } from 'unctx';
import 'vue';
import 'ofetch';
import 'hookable';
import 'ufo';
import 'h3';
import '@unhead/vue';
import '@unhead/dom';
import 'vue-router';
import 'defu';
import 'requrl';
import 'vue/server-renderer';
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

const role = defineNuxtRouteMiddleware(async () => {
  var _a;
  let __temp, __restore;
  const { loadPlayer } = usePlayerStore();
  try {
    const role2 = ([__temp, __restore] = executeAsync(() => $fetch("/api/player", {
      headers: useRequestHeaders(["cookie"])
    })), __temp = await __temp, __restore(), __temp);
    if ((_a = role2 == null ? void 0 : role2.player) == null ? void 0 : _a.sid) {
      loadPlayer(role2);
      return navigateTo$1("/");
    }
  } catch (error) {
    console.error(error);
  }
});

export { role as default };
//# sourceMappingURL=role.460632cc.mjs.map
