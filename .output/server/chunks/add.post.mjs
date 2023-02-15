import { d as defineEventHandler, r as readBody, g as getServerSession, c as createError, P as PlayerSchema } from './nitro/node-server.mjs';
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
  const body = await readBody(event);
  const session = await getServerSession(event);
  if (!session) {
    return createError({
      statusCode: 401,
      statusMessage: "Unauthorized"
    });
  }
  if (!body.friendSid) {
    return createError({
      statusCode: 400,
      statusMessage: "Params Ivalid"
    });
  }
  const player = await PlayerSchema.findOne({ userId: (_a = session.user) == null ? void 0 : _a.email }).select("sid");
  if (!player) {
    return createError({
      statusCode: 404,
      statusMessage: "Player Not Found"
    });
  }
  const friend = await PlayerSchema.findOne({ sid: body.friendSid }).select("name");
  if (!friend) {
    return createError({
      statusCode: 404,
      statusMessage: "Friend Not Found"
    });
  }
  await FriendlySchema.create({
    sid: player.sid,
    friendSid: body.friendSid,
    relationship: "friend"
  });
  return {
    success: true,
    message: `K\u1EBFt b\u1EA1n th\xE0nh c\xF4ng v\u1EDBi ${friend.name}`
  };
});

export { handle as default };
//# sourceMappingURL=add.post.mjs.map
