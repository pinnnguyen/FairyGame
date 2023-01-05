import { l as defineNuxtRouteMiddleware, k as useSession, s as storeToRefs, n as navigateTo$1 } from '../server.mjs';
import { executeAsync } from 'unctx';
import { u as usePlayerStore } from './usePlayer.ee6d41eb.mjs';
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

const game = defineNuxtRouteMiddleware(async () => {
  var _a;
  let __temp, __restore;
  const { status } = useSession();
  const { getPlayer } = usePlayerStore();
  const { playerInfo } = storeToRefs(usePlayerStore());
  if (status.value !== "authenticated")
    return navigateTo$1("/login");
  if ((_a = playerInfo.value) == null ? void 0 : _a.name)
    return;
  [__temp, __restore] = executeAsync(() => getPlayer()), await __temp, __restore();
});

export { game as default };
//# sourceMappingURL=game.9c970266.mjs.map
