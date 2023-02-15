import { d as defineEventHandler, g as getServerSession, c as createError, P as PlayerSchema, v as BossCreatorSchema, w as BossDataSchema, o as cloneDeep } from './nitro/node-server.mjs';
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

const getBossElite = async () => {
  const bossEliteData = await BossCreatorSchema.find({ death: false, kind: "elite" });
  if (bossEliteData.length !== 0)
    return bossEliteData;
  const bossData = await BossDataSchema.find({ kind: "elite" }).select({
    _id: false,
    __v: false
  });
  const bossClone = cloneDeep(bossData);
  return await BossCreatorSchema.insertMany(bossClone.map((b) => ({
    ...b,
    bossId: b.id,
    hp: b.attribute.hp,
    death: false,
    killer: null,
    revive: 0
  })));
};
const handle = defineEventHandler(async (event) => {
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
  return getBossElite();
});

export { handle as default };
//# sourceMappingURL=elite.get.mjs.map
