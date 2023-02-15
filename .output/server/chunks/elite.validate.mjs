import { defineEventHandler, createError } from 'h3';
import { g as getServerSession, P as PlayerSchema, e as BattleSchema, f as BATTLE_KIND } from './nitro/node-server.mjs';
import 'node-fetch-native/polyfill';
import 'node:http';
import 'node:https';
import 'destr';
import 'ofetch';
import 'unenv/runtime/fetch/index';
import 'hookable';
import 'scule';
import 'ohash';
import 'ufo';
import 'unstorage';
import 'defu';
import 'radix3';
import 'mongoose';
import 'node-cron';
import 'next-auth/core';
import 'requrl';
import 'node:fs';
import 'node:url';
import 'pathe';
import 'socket.io';
import 'moment';
import 'ipx';

const handle = defineEventHandler(async (event) => {
  var _a;
  const now = (/* @__PURE__ */ new Date()).getTime();
  const uServer = await getServerSession(event);
  if (!uServer) {
    return createError({
      statusCode: 401,
      statusMessage: "Unauthorized"
    });
  }
  const player = await PlayerSchema.findOne({ userId: (_a = uServer == null ? void 0 : uServer.user) == null ? void 0 : _a.email }).select("sid");
  if (!(player == null ? void 0 : player.sid)) {
    return createError({
      statusCode: 404,
      statusMessage: "Player Invalid"
    });
  }
  const battle = await BattleSchema.findOne({ sid: player.sid, kind: BATTLE_KIND.BOSS_ELITE }).sort({ createdAt: -1 }).select("createdAt");
  if (battle) {
    const doRefresh = new Date(battle.createdAt).getTime() + 6e4;
    if (doRefresh > now) {
      return {
        inRefresh: true,
        refreshTime: doRefresh - now
      };
    }
  }
  return {
    inRefresh: false,
    refreshTime: 0
  };
});

export { handle as default };
//# sourceMappingURL=elite.validate.mjs.map
