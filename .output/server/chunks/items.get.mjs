import { d as defineEventHandler, g as getServerSession, c as createError, P as PlayerSchema, C as getPlayerItems } from './nitro/node-server.mjs';
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

const items_get = defineEventHandler(async (event) => {
  var _a;
  const uServer = await getServerSession(event);
  if (!uServer) {
    return createError({
      statusCode: 401,
      statusMessage: "Unauthorized"
    });
  }
  const player = await PlayerSchema.findOne({ userId: (_a = uServer == null ? void 0 : uServer.user) == null ? void 0 : _a.email }).select("sid name");
  if (!(player == null ? void 0 : player.sid)) {
    return createError({
      statusCode: 404,
      statusMessage: "Ng\u01B0\u1EDDi ch\u01A1i kh\xF4ng t\u1ED3n t\u1EA1i"
    });
  }
  return getPlayerItems(player.sid);
});

export { items_get as default };
//# sourceMappingURL=items.get.mjs.map
