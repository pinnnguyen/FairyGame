import { defineEventHandler, createError } from 'h3';
import { P as PlayerSchema, f as PlayerEquipmentSchema } from './nitro/node-server.mjs';
import { g as getServerSession } from './nuxtAuthHandler.mjs';
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
import 'defu';
import 'radix3';
import 'mongoose';
import 'socket.io';
import 'moment';
import 'node:fs';
import 'node:url';
import 'pathe';
import 'ipx';
import 'next-auth/core';
import 'requrl';

const index_get = defineEventHandler(async (event) => {
  var _a;
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
      statusMessage: "Ng\u01B0\u1EDDi ch\u01A1i kh\xF4ng t\u1ED3n t\u1EA1i"
    });
  }
  const equipments = await PlayerEquipmentSchema.find({ sid: player == null ? void 0 : player.sid }).limit(25);
  return {
    equipments
  };
});

export { index_get as default };
//# sourceMappingURL=index.get2.mjs.map
