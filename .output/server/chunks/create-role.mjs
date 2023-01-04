import { defineEventHandler, readBody, createError } from 'h3';
import mongoose from 'mongoose';
import { g as getServerSession } from './nuxtAuthHandler.mjs';
import { g as getPlayer, P as PlayerSchema, h as PlayerAttributeSchema, M as MidSchema } from './nitro/node-server.mjs';
import 'next-auth/core';
import 'requrl';
import 'defu';
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
import 'radix3';
import 'socket.io';
import 'moment';
import 'node:fs';
import 'node:url';
import 'pathe';
import 'ipx';

const DEFAULT_ROLE = {
  gold: 0,
  coin: 0,
  power: 0,
  vip_level: 0,
  level: 0,
  midId: 1,
  exp: 0
};
const DEFAULT_ATTRIBUTE = {
  damage: 50,
  def: 15,
  hp: 100,
  mp: 50,
  bloodsucking: 0,
  critical: 0,
  exp: 0,
  speed: 1
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
  const createRole = new PlayerSchema({
    sid,
    name: body.name,
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
  return {
    player: createRole,
    attribute: createAttribute,
    mid
  };
});

export { createRole as default };
//# sourceMappingURL=create-role.mjs.map
