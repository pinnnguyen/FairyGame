import { d as defineEventHandler, g as getServerSession, c as createError, P as PlayerSchema, q as PlayerGemSchema } from './nitro/node-server.mjs';
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

const gems_get = defineEventHandler(async (event) => {
  var _a;
  const session = await getServerSession(event);
  if (!session) {
    return createError({
      statusCode: 401,
      statusMessage: "Unauthorized"
    });
  }
  const playerInfo = await PlayerSchema.findOne({ userId: (_a = session == null ? void 0 : session.user) == null ? void 0 : _a.email }).select("sid");
  return PlayerGemSchema.find({
    sid: playerInfo == null ? void 0 : playerInfo.sid,
    sum: {
      $gte: 1
    }
  }).sort({
    quality: -1
  });
});

export { gems_get as default };
//# sourceMappingURL=gems.get.mjs.map
