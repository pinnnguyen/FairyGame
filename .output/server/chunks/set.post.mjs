import { d as defineEventHandler, g as getServerSession, c as createError, P as PlayerSchema, h as BattleSchema, i as BATTLE_KIND, k as getPlayer } from './nitro/node-server.mjs';
import 'node-fetch-native/polyfill';
import 'node:http';
import 'node:https';
import 'destr';
import 'ufo';
import 'radix3';
import 'cookie-es';
import 'ofetch';
import 'unenv/runtime/fetch/index';
import 'hookable';
import 'scule';
import 'ohash';
import 'unstorage';
import 'defu';
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
  const battle = await BattleSchema.findOne({ "mid.id": player == null ? void 0 : player.midId, "winner": player._id, "kind": BATTLE_KIND.PVE });
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
