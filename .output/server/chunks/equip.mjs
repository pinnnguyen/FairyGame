import { defineEventHandler, readBody, createError } from 'h3';
import { g as getServerSession } from './nuxtAuthHandler.mjs';
import { P as PlayerSchema, f as PlayerEquipmentSchema, h as PlayerAttributeSchema, p as prepareSlots } from './nitro/node-server.mjs';
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
import 'mongoose';
import 'node-cron';
import 'socket.io';
import 'moment';
import 'node:fs';
import 'node:url';
import 'pathe';
import 'ipx';

const equip = defineEventHandler(async (event) => {
  var _a;
  const session = await getServerSession(event);
  const body = await readBody(event);
  if (!session) {
    return createError({
      statusCode: 401,
      statusMessage: "Unauthorized"
    });
  }
  const player = await PlayerSchema.findOne({ userId: (_a = session == null ? void 0 : session.user) == null ? void 0 : _a.email }).select("sid");
  if (!player) {
    return createError({
      statusCode: 404,
      statusMessage: "Player not found"
    });
  }
  const playerEquipment = await PlayerEquipmentSchema.findById(body._equipId).select("_id slot");
  if (!playerEquipment) {
    return createError({
      statusCode: 404,
      statusMessage: "B\u1EA1n ch\u01B0a s\u1EDF h\u1EEFu trang b\u1ECB n\xE0y"
    });
  }
  if (body.action === "equip") {
    await PlayerAttributeSchema.updateOne({ sid: player == null ? void 0 : player.sid }, prepareSlots(playerEquipment.slot, playerEquipment._id));
    return {
      statusCode: 200,
      statusMessage: "Trang b\u1ECB th\xE0nh c\xF4ng"
    };
  }
  if (body.action === "unequip") {
    await PlayerAttributeSchema.updateOne({ sid: player == null ? void 0 : player.sid }, prepareSlots(playerEquipment.slot, ""));
    return {
      statusCode: 200,
      statusMessage: "Th\xE1o b\u1ECB th\xE0nh c\xF4ng"
    };
  }
});

export { equip as default };
//# sourceMappingURL=equip.mjs.map
