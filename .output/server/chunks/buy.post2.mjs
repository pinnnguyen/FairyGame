import { d as defineEventHandler, g as getServerSession, c as createError, P as PlayerSchema, r as readBody, S as SendKnbMarketSystemMail, s as SendMarketSystemMail, I as ItemSchema, o as cloneDeep } from './nitro/node-server.mjs';
import { M as MarketSchema } from './market.mjs';
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

const buy_post = defineEventHandler(async (event) => {
  var _a;
  const session = await getServerSession(event);
  if (!session) {
    return createError({
      statusCode: 401,
      statusMessage: "Unauthorized"
    });
  }
  const player = await PlayerSchema.findOne({ userId: (_a = session == null ? void 0 : session.user) == null ? void 0 : _a.email }).select("sid knb");
  if (!player) {
    return createError({
      statusCode: 400,
      statusMessage: "Player Invalid"
    });
  }
  const body = await readBody(event);
  if (!body._id) {
    return createError({
      statusCode: 400,
      statusMessage: "Id Invalid"
    });
  }
  const market = await MarketSchema.findById(body._id);
  if (!market) {
    return {
      success: false,
      message: "V\u1EADt ph\u1EA9m \u0111\xE3 c\xF3 ng\u01B0\u1EDDi mua tr\u01B0\u1EDBc \u0111\xF3"
    };
  }
  if (player.knb < market.price) {
    return createError({
      statusCode: 400,
      statusMessage: "Price Invalid"
    });
  }
  await MarketSchema.findByIdAndDelete(market._id);
  await SendKnbMarketSystemMail(market.sid, market.price, body.name);
  await PlayerSchema.findOneAndUpdate({ sid: player.sid }, {
    $inc: {
      knb: -market.price
    }
  });
  const recordType = market.type;
  const record = market.record;
  if (recordType === "gem")
    await SendMarketSystemMail(player.sid, "gem", record, body.name);
  if (recordType === "equipment")
    await SendMarketSystemMail(player.sid, "equipment", record, body.name);
  if (recordType === "item") {
    const item = await ItemSchema.findOne({ id: record.itemId }, { _id: false, __v: false });
    const cloneItem = cloneDeep(item);
    await SendMarketSystemMail(player.sid, "item", {
      sum: record.sum,
      itemId: cloneItem == null ? void 0 : cloneItem.id,
      ...cloneItem
    }, body.name);
  }
  return {
    success: true,
    message: "Mua th\xE0nh c\xF4ng"
  };
});

export { buy_post as default };
//# sourceMappingURL=buy.post2.mjs.map
