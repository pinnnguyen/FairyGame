import { d as defineEventHandler, g as getServerSession, r as readBody, c as createError, k as getPlayer, P as PlayerSchema, m as PlayerAttributeSchema, M as MidSchema, n as addSystemChat } from './nitro/node-server.mjs';
import mongoose from 'mongoose';
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
import 'node-cron';
import 'next-auth/core';
import 'requrl';
import 'node:fs';
import 'node:url';
import 'pathe';
import 'socket.io';
import 'moment';
import 'ipx';

const DEFAULT_ROLE = {
  gold: 0,
  coin: 0,
  power: 0,
  vip_level: 0,
  level: 0,
  midId: 1,
  exp: 0,
  knb: 0
};
const DEFAULT_ATTRIBUTE = {
  counterAttack: 0,
  // phản đòn
  recoveryPerformance: 0,
  // hiệu xuất hồi phục
  avoid: 0,
  // né đòn
  reductionCriticalDamage: 0,
  // miễn thương bạo kích
  reductionRecoveryPerformance: 0,
  // khang hoi phuc
  reductionBloodsucking: 0,
  damage: 50,
  def: 30,
  hp: 200,
  mp: 50,
  bloodsucking: 0,
  critical: 0,
  // 0%
  criticalDamage: 150,
  // 150%
  speed: 1,
  reductionCounterAttack: 0,
  reductionAvoid: 0
};

const ObjectId = mongoose.Types.ObjectId;
const createRole = defineEventHandler(async (event) => {
  var _a, _b;
  const session = await getServerSession(event);
  const body = await readBody(event);
  const sid = new ObjectId().toString();
  if (!session) {
    return createError({
      statusCode: 401,
      statusMessage: "Unauthorized"
    });
  }
  const playerResource = await getPlayer((_a = session == null ? void 0 : session.user) == null ? void 0 : _a.email, "");
  if (playerResource) {
    return {
      player: playerResource.player,
      attribute: playerResource.attribute,
      mid: playerResource.mid
    };
  }
  const playerName = await PlayerSchema.findOne({ name: body.name });
  if (playerName) {
    return {
      success: false,
      message: "T\xEAn nh\xE2n v\u1EADt c\u1EE7a \u0111\u1EA1o h\u1EEFu \u0111\xE3 b\u1ECB tr\xF9ng!"
    };
  }
  const createRole = new PlayerSchema({
    sid,
    name: body.name,
    gender: body.gender,
    userId: (_b = session == null ? void 0 : session.user) == null ? void 0 : _b.email,
    class: body == null ? void 0 : body.class,
    ...DEFAULT_ROLE
  });
  await createRole.save();
  const createAttribute = new PlayerAttributeSchema({
    sid: createRole.sid,
    ...DEFAULT_ATTRIBUTE
  });
  const mid = await MidSchema.find({
    id: {
      $in: [createRole.midId, createRole.midId + 1]
    }
  });
  await createAttribute.save();
  await addSystemChat("", `Ch\xE0o m\u1EEBng ${body.name} gia nh\u1EADp Tu ti\xEAn gi\u1EA3`);
  return {
    success: true,
    message: "T\u1EA1o nh\xE2n v\u1EADt th\xE0nh c\xF4ng",
    player: createRole,
    attribute: createAttribute,
    mid
  };
});

export { createRole as default };
//# sourceMappingURL=create-role.mjs.map
