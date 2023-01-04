import { defineEventHandler, createError } from 'h3';
import { g as getServerSession } from './nuxtAuthHandler.mjs';
import { P as PlayerSchema, d as BattleSchema, W as WINNER, e as BATTLE_KIND, g as getPlayer } from './nitro/node-server.mjs';
import 'next-auth/core';
import 'requrl';
import 'defu';
import 'node-fetch-native/polyfill';
import 'http';
import 'https';
import 'destr';
import 'ofetch';
import 'unenv/runtime/fetch/index';
import 'hookable';
import 'scule';
import 'ohash';
import 'ufo';
import 'unstorage';
import 'radix3';
import 'mongoose';
import 'socket.io';
import 'moment';
import 'node:fs';
import 'node:url';
import 'pathe';
import 'ipx';

const set_post = defineEventHandler(async (event) => {
  var _a, _b, _c;
  const session = await getServerSession(event);
  if (!session) {
    return createError({
      statusCode: 401,
      statusMessage: "Unauthorized"
    });
  }
  const player = await PlayerSchema.findOne({ userId: (_a = session == null ? void 0 : session.user) == null ? void 0 : _a.email });
  const battle = await BattleSchema.findOne({ "mid.id": player == null ? void 0 : player.midId, "winner": WINNER.youwin, "kind": BATTLE_KIND.PVE });
  if (!battle) {
    return createError({
      statusCode: 400,
      statusMessage: "ERROR_BATTLE"
    });
  }
  const changeMid = await PlayerSchema.findOneAndUpdate({ userId: (_b = session == null ? void 0 : session.user) == null ? void 0 : _b.email }, {
    $inc: {
      midId: 1
    }
  });
  if (!changeMid) {
    return createError({
      statusCode: 400,
      statusMessage: "Chuy\u1EC3n map th\u1EA5t b\u1EA1i"
    });
  }
  return await getPlayer((_c = session.user) == null ? void 0 : _c.email, "");
});

export { set_post as default };
//# sourceMappingURL=set.post.mjs.map
