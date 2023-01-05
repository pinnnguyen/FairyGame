import { defineEventHandler, createError, getQuery } from 'h3';
import moment from 'moment';
import { k as BossSchema, P as PlayerSchema, d as BattleSchema, e as BATTLE_KIND, E as EquipmentSchema, l as startEndHoursBossFrameTime, m as frameTimeBossEnded } from './nitro/node-server.mjs';
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
import 'node-cron';
import 'socket.io';
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
  const query = getQuery(event);
  const today = moment().startOf("day");
  const bossNe = await BossSchema.find({ kind: query.kind });
  const player = await PlayerSchema.findOne({ userId: (_a = uServer == null ? void 0 : uServer.user) == null ? void 0 : _a.email }).select("sid");
  if (!(player == null ? void 0 : player.sid)) {
    return createError({
      statusCode: 404,
      statusMessage: "Ng\u01B0\u1EDDi ch\u01A1i kh\xF4ng t\u1ED3n t\u1EA1i"
    });
  }
  for (let i = 0; i < bossNe.length; i++) {
    const equipIds = bossNe[i].reward.equipRates.map((i2) => i2.id);
    const numberOfBattle = await BattleSchema.find({
      sid: player.sid,
      kind: BATTLE_KIND.BOSS_DAILY,
      targetId: bossNe[i].id,
      createdAt: {
        $gte: moment().startOf("day"),
        $lte: moment(today).endOf("day").toDate()
      }
    }).count();
    bossNe[i].numberOfTurn -= numberOfBattle;
    bossNe[i].reward.equipments = await EquipmentSchema.find({
      id: {
        $in: equipIds
      }
    });
    bossNe[i].isStart = false;
    if (query.kind === "frameTime") {
      const { start, end } = startEndHoursBossFrameTime(13);
      bossNe[i].isStart = frameTimeBossEnded(start, end);
      bossNe[i].startHours = start;
      bossNe[i].endHours = end;
    }
  }
  return {
    bossNe
  };
});

export { index_get as default };
//# sourceMappingURL=index.get2.mjs.map
