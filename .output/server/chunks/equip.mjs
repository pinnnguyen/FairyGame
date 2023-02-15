import { d as defineEventHandler, g as getServerSession, r as readBody, c as createError, P as PlayerSchema, l as PlayerEquipmentSchema } from './nitro/node-server.mjs';
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
    console.log("playerEquipment.slot", playerEquipment.slot);
    console.log("player?.sid", player == null ? void 0 : player.sid);
    await PlayerEquipmentSchema.updateMany({ sid: player == null ? void 0 : player.sid, slot: playerEquipment.slot }, {
      used: false
    });
    await PlayerEquipmentSchema.updateOne({ _id: playerEquipment._id, slot: playerEquipment.slot }, {
      used: true
    });
    return {
      statusCode: 200,
      statusMessage: "Trang b\u1ECB th\xE0nh c\xF4ng"
    };
  }
  if (body.action === "unequip") {
    await PlayerEquipmentSchema.updateMany({ sid: player == null ? void 0 : player.sid, slot: playerEquipment.slot }, {
      used: false
    });
    return {
      statusCode: 200,
      statusMessage: "Th\xE1o b\u1ECB th\xE0nh c\xF4ng"
    };
  }
});

export { equip as default };
//# sourceMappingURL=equip.mjs.map
