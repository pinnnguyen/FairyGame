import { d as defineEventHandler, g as getServerSession, c as createError, P as PlayerSchema } from './nitro/node-server.mjs';
import { F as FriendlySchema } from './friendly.mjs';
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

const handle = defineEventHandler(async (event) => {
  var _a;
  const session = await getServerSession(event);
  if (!session) {
    return createError({
      statusCode: 401,
      statusMessage: "Unauthorized"
    });
  }
  const player = await PlayerSchema.findOne({ userId: (_a = session.user) == null ? void 0 : _a.email }).select("sid");
  if (!player) {
    return createError({
      statusCode: 404,
      statusMessage: "Player Not Found"
    });
  }
  const friends = await FriendlySchema.aggregate([
    {
      $match: {
        sid: player.sid
      }
    },
    {
      $lookup: {
        from: "players",
        localField: "friendSid",
        foreignField: "sid",
        as: "player"
      }
    }
  ]);
  return friends;
});

export { handle as default };
//# sourceMappingURL=index.get6.mjs.map
