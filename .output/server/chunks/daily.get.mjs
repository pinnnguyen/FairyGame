import { d as defineEventHandler, g as getServerSession, c as createError, P as PlayerSchema, w as BossDataSchema, h as BattleSchema, i as BATTLE_KIND, E as EquipmentSchema } from './nitro/node-server.mjs';
import moment from 'moment/moment';
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

const getBossDaily = async (player) => {
  const today = moment().startOf("day");
  const bossDaily = await BossDataSchema.find({ kind: "daily" }).sort({ level: 1 });
  for (let i = 0; i < bossDaily.length; i++) {
    const equipIds = bossDaily[i].reward.equipRates.map((i2) => i2.id);
    const numberOfBattle = await BattleSchema.find({
      sid: player.sid,
      kind: BATTLE_KIND.BOSS_DAILY,
      targetId: bossDaily[i].id,
      createdAt: {
        $gte: moment().startOf("day"),
        $lte: moment(today).endOf("day").toDate()
      }
    }).count();
    bossDaily[i].numberOfTurn -= numberOfBattle;
    bossDaily[i].reward.equipments = await EquipmentSchema.find({
      id: {
        $in: equipIds
      }
    });
  }
  return bossDaily;
};
const daily_get = defineEventHandler(async (event) => {
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
  return getBossDaily(player);
});

export { daily_get as default };
//# sourceMappingURL=daily.get.mjs.map
