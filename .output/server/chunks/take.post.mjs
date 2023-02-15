import { defineEventHandler, readBody, createError } from 'h3';
import { g as getServerSession, P as PlayerSchema, p as MailSchema, q as addPlayerGem, i as PlayerEquipmentSchema, a as addPlayerItem } from './nitro/node-server.mjs';
import 'node-fetch-native/polyfill';
import 'node:http';
import 'node:https';
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
import 'next-auth/core';
import 'requrl';
import 'node:fs';
import 'node:url';
import 'pathe';
import 'socket.io';
import 'moment';
import 'ipx';

const take_post = defineEventHandler(async (event) => {
  var _a, _b, _c;
  const body = await readBody(event);
  if (!body._mailId) {
    return createError({
      statusCode: 400,
      statusMessage: "Params Invalid"
    });
  }
  const session = await getServerSession(event);
  if (!session) {
    return createError({
      statusCode: 401,
      statusMessage: "Unauthorized"
    });
  }
  const playerInfo = await PlayerSchema.findOne({ userId: (_a = session == null ? void 0 : session.user) == null ? void 0 : _a.email }).select("sid");
  if (!playerInfo) {
    return createError({
      statusCode: 404,
      statusMessage: "Player Invalid"
    });
  }
  const mail = await MailSchema.findOneAndUpdate({
    _id: body._mailId,
    isRead: false,
    deleted: false
  }, {
    isRead: true
  });
  if (!mail) {
    return createError({
      statusCode: 404,
      statusMessage: "Mail Invalid"
    });
  }
  if (mail.recordType === "gem") {
    for (const record of mail.records)
      await addPlayerGem(playerInfo.sid, (_b = record.gemId) != null ? _b : record.id, record.quality, (_c = record.sum) != null ? _c : 1);
  }
  if (mail.recordType === "equipment") {
    for (const record of mail.records) {
      delete record.sid;
      await PlayerEquipmentSchema.create({
        sid: playerInfo.sid,
        ...record
      });
    }
  }
  if (mail.recordType === "item") {
    for (const record of mail.records) {
      if (record.itemId === 8) {
        await PlayerSchema.changeCurrency({
          kind: "knb",
          sid: playerInfo.sid,
          value: record.sum
        });
      } else {
        await addPlayerItem(playerInfo.sid, record.sum, record.itemId);
      }
    }
  }
  return {
    success: true,
    message: "Nh\u1EADn th\u01B0 th\xE0nh c\xF4ng"
  };
});

export { take_post as default };
//# sourceMappingURL=take.post.mjs.map
