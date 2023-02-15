import { d as defineEventHandler, g as getServerSession, c as createError, v as BossCreatorSchema, w as BossDataSchema, o as cloneDeep, x as startEndHoursBossFrameTime } from './nitro/node-server.mjs';
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

const getBossFrameTime = async () => {
  const now = (/* @__PURE__ */ new Date()).getTime();
  const bossFrameTime = await BossCreatorSchema.find({
    death: false,
    kind: "frame_time",
    startHours: {
      $gte: now
    },
    endHours: {
      $lte: now
    }
  });
  if (bossFrameTime.length !== 0)
    return bossFrameTime;
  const bossFrameTimeList = await BossDataSchema.find({ kind: "frame_time" }).select({
    _id: false,
    __v: false
  });
  const bossList = cloneDeep(bossFrameTimeList);
  const newBoss = [];
  for (let i = 0; i < bossList.length; i++) {
    const { start, end } = startEndHoursBossFrameTime(bossList[i].startHours);
    bossList[i].startHours = start;
    bossList[i].endHours = end;
    newBoss.push({
      bossId: bossList[i].id,
      hp: bossList[i].attribute.hp,
      death: false,
      killer: null,
      revive: 0,
      ...bossList[i]
    });
  }
  await BossCreatorSchema.insertMany(newBoss);
  return newBoss;
};
const handle = defineEventHandler(async (event) => {
  const uServer = await getServerSession(event);
  if (!uServer) {
    return createError({
      statusCode: 401,
      statusMessage: "Unauthorized"
    });
  }
  return getBossFrameTime();
});

export { handle as default };
//# sourceMappingURL=frameTime.get.mjs.map
