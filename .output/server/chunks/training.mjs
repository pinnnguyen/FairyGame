import { defineEventHandler, createError } from 'h3';
import { M as MidSchema, B as BASE_EXP, a as BASE_GOLD, P as PlayerSchema, c as convertMillisecondsToSeconds, b as convertSecondsToMinutes, d as BattleSchema, e as BATTLE_KIND } from './nitro/node-server.mjs';
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
import 'moment';
import 'node:fs';
import 'node:url';
import 'pathe';
import 'ipx';
import 'next-auth/core';
import 'requrl';

const resourceReceived = async (sid, lastTimeReceivedRss, midId) => {
  const now = new Date().getTime();
  const seconds = Math.round(convertMillisecondsToSeconds(now - lastTimeReceivedRss));
  const minutes = Math.round(convertSecondsToMinutes(seconds));
  const mid = await MidSchema.findOne({ id: midId });
  if (!mid) {
    return {
      exp: 0,
      gold: 0,
      minutes: 0
    };
  }
  const expInMinute = Math.round(BASE_EXP() * mid.reward.base.exp);
  const goldInMinute = Math.round(BASE_GOLD() * mid.reward.base.gold);
  console.log("seconds", seconds);
  if (seconds < 60) {
    return {
      exp: 0,
      gold: 0,
      minutes: 0
    };
  }
  let exp = 0;
  let gold = 0;
  for (let i = 0; i < minutes; i++) {
    exp += expInMinute;
    gold += goldInMinute;
  }
  await PlayerSchema.updateOne({ sid }, {
    lastTimeReceivedRss: new Date().getTime(),
    $inc: {
      exp,
      gold
    }
  });
  return {
    exp,
    gold,
    minutes
  };
};

const training = defineEventHandler(async (event) => {
  var _a;
  const session = await getServerSession(event);
  if (!session) {
    return createError({
      statusCode: 401,
      statusMessage: "Unauthorized"
    });
  }
  const _p = await PlayerSchema.findOne({ userId: (_a = session == null ? void 0 : session.user) == null ? void 0 : _a.email });
  if (!_p) {
    return createError({
      statusCode: 400,
      message: "Invalid player"
    });
  }
  const battle = await BattleSchema.findOne({ "sid": _p.sid, "mid.id": _p.midId, "kind": BATTLE_KIND.PVE });
  if (!battle) {
    return createError({
      statusCode: 400,
      message: "Invalid battle"
    });
  }
  const { exp, gold, minutes } = await resourceReceived(_p.sid, _p.lastTimeReceivedRss, _p.midId);
  return {
    exp,
    gold,
    minutes
  };
});

export { training as default };
//# sourceMappingURL=training.mjs.map
