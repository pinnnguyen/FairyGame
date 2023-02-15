import { defineEventHandler, createError, getQuery } from 'h3';
import { g as getServerSession, P as PlayerSchema, n as PlayerGemSchema } from './nitro/node-server.mjs';
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

const index_get = defineEventHandler(async (event) => {
  var _a;
  const session = await getServerSession(event);
  if (!session) {
    return createError({
      statusCode: 401,
      statusMessage: "Unauthorized"
    });
  }
  const query = getQuery(event);
  const playerInfo = await PlayerSchema.findOne({ userId: (_a = session == null ? void 0 : session.user) == null ? void 0 : _a.email });
  if (query.slot) {
    return PlayerGemSchema.find({
      sid: playerInfo == null ? void 0 : playerInfo.sid,
      slot: query.slot,
      sum: {
        $gte: 1
      }
    });
  }
  return [];
});

export { index_get as default };
//# sourceMappingURL=index.get5.mjs.map
