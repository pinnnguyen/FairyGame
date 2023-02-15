import { defineEventHandler, createError, readBody } from 'h3';
import { g as getServerSession, P as PlayerSchema, i as PlayerEquipmentSchema, l as cloneDeep, m as PlayerItemSchema, n as PlayerGemSchema } from './nitro/node-server.mjs';
import { M as MarketSchema } from './market.mjs';
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

const sell_post = defineEventHandler(async (event) => {
  var _a;
  const session = await getServerSession(event);
  if (!session) {
    return createError({
      statusCode: 401,
      statusMessage: "Unauthorized"
    });
  }
  const player = await PlayerSchema.findOne({ userId: (_a = session == null ? void 0 : session.user) == null ? void 0 : _a.email }).select("sid");
  if (!player) {
    return createError({
      statusCode: 400,
      statusMessage: "Player Invalid"
    });
  }
  const body = await readBody(event);
  if (!body.price || body.price <= 0) {
    return createError({
      statusCode: 400,
      statusMessage: "Price Invalid"
    });
  }
  if (!body.type) {
    return createError({
      statusCode: 400,
      statusMessage: "Invalid params"
    });
  }
  if (!body._id) {
    return createError({
      statusCode: 400,
      statusMessage: "Invalid Id"
    });
  }
  if (body.type === "equipment") {
    const equipment = await PlayerEquipmentSchema.findOne({ sid: player.sid, _id: body._id }, { _id: false, __v: false });
    if (!equipment) {
      return createError({
        statusCode: 400,
        statusMessage: "Equipment Invalid"
      });
    }
    await PlayerEquipmentSchema.findOneAndDelete({ _id: body._id });
    const cloneItem = cloneDeep(equipment);
    await MarketSchema.create({
      sid: player.sid,
      type: body.type,
      price: body.price,
      record: {
        ...cloneItem
      }
    });
  }
  if (body.type === "item") {
    const playerItem = await PlayerItemSchema.findOne({
      sid: player.sid,
      _id: body._id,
      sum: {
        $gte: body.quantity
      }
    }, { _id: false, __v: false });
    if (!playerItem) {
      return createError({
        statusCode: 400,
        statusMessage: "Item Invalid"
      });
    }
    await PlayerItemSchema.findOneAndUpdate({
      sid: player.sid,
      _id: body._id,
      sum: {
        $gte: 1
      }
    }, {
      $inc: {
        sum: -body.quantity
      }
    });
    await MarketSchema.create({
      sid: player.sid,
      type: body.type,
      price: body.price,
      record: {
        itemId: playerItem.itemId,
        sum: body.quantity
      }
    });
  }
  if (body.type === "gem") {
    const playerGem = await PlayerGemSchema.findOne({
      sid: player.sid,
      _id: body._id,
      sum: {
        $gte: body.quantity
      }
    }, { _id: false, __v: false });
    if (!playerGem) {
      return createError({
        statusCode: 400,
        statusMessage: "Gem Invalid"
      });
    }
    await PlayerGemSchema.findOneAndUpdate({
      sid: player.sid,
      _id: body._id,
      sum: {
        $gte: body.quantity
      }
    }, {
      $inc: {
        sum: -body.quantity
      }
    });
    await MarketSchema.create({
      sid: player.sid,
      price: body.price,
      type: body.type,
      record: {
        ...cloneDeep(playerGem),
        sum: body.quantity
      }
    });
  }
  return {
    success: true,
    message: "Treo b\xE1n v\u1EADt ph\u1EA9m th\xE0nh c\xF4ng"
  };
});

export { sell_post as default };
//# sourceMappingURL=sell.post.mjs.map
