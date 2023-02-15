import { M as MidSchema, B as BASE_EXP, b as BASE_GOLD, P as PlayerSchema, e as convertMillisecondsToSeconds, f as convertSecondsToMinutes, d as defineEventHandler, g as getServerSession, c as createError, h as BattleSchema, i as BATTLE_KIND } from './nitro/node-server.mjs';
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

const resourceReceived = async (sid, lastTimeReceivedRss, midId) => {
  const now = (/* @__PURE__ */ new Date()).getTime();
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
  console.log("exp", exp);
  console.log("gold", gold);
  await PlayerSchema.updateOne({ sid }, {
    lastTimeReceivedRss: (/* @__PURE__ */ new Date()).getTime(),
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
  const battle = await BattleSchema.findOne({
    sid: _p.sid,
    kind: BATTLE_KIND.PVE
  });
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
