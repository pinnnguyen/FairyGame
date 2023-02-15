import { d as defineEventHandler, r as readBody, P as PlayerSchema, c as createError, a as addPlayerItem } from './nitro/node-server.mjs';
import { S as StoreItemSchema } from './store.mjs';
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

var CurrencyTitle = /* @__PURE__ */ ((CurrencyTitle2) => {
  CurrencyTitle2["knb"] = "Ti\xEAn Duy\xEAn";
  CurrencyTitle2["gold"] = "Ti\u1EC1n Ti\xEAn";
  CurrencyTitle2["coin"] = "Ti\xEAn Ng\u1ECDc";
  CurrencyTitle2["scoreTienDau"] = "\u0110i\u1EC3m Ti\xEAn \u0110\u1EA5u";
  return CurrencyTitle2;
})(CurrencyTitle || {});

const buy_post = defineEventHandler(async (event) => {
  var _a, _b, _c;
  const body = await readBody(event);
  const player = await PlayerSchema.findOne({ sid: body.sid }).select("sid knb arenas");
  if (!player) {
    return createError({
      statusCode: 400,
      statusMessage: "PLAYER_NOT_FOUND"
    });
  }
  const storeItem = await StoreItemSchema.findOne({ itemId: body.itemId });
  if (!storeItem) {
    return {
      statusCode: 400,
      statusMessage: "ITEM_NOT_FOUND"
    };
  }
  if (storeItem.currency === "knb") {
    const price = storeItem.price;
    if (player.knb < price) {
      return {
        statusCode: 400,
        statusMessage: `C\xF2n thi\u1EBFu ${price - player.knb} ${CurrencyTitle[storeItem.currency]} \u0111\u1EC3 mua v\u1EADt ph\u1EA9m n\xE0y`
      };
    }
    await PlayerSchema.updateOne({ sid: player.sid }, {
      $inc: {
        knb: -price
      }
    });
  }
  if (storeItem.currency === "scoreTienDau") {
    const price = storeItem.price;
    const playerPrice = (_c = (_b = (_a = player.arenas) == null ? void 0 : _a.tienDau) == null ? void 0 : _b.score) != null ? _c : 0;
    if (playerPrice < price) {
      return {
        statusCode: 400,
        statusMessage: `C\xF2n thi\u1EBFu ${price - playerPrice} ${CurrencyTitle[storeItem.currency]} \u0111\u1EC3 mua v\u1EADt ph\u1EA9m n\xE0y`
      };
    }
    await PlayerSchema.updateOne({ sid: player.sid }, {
      $inc: {
        "arenas.tienDau.score": -price
      }
    });
  }
  await addPlayerItem(body.sid, storeItem.quantity, storeItem.itemId);
  return {
    statusCode: 200,
    statusMessage: "Mua th\xE0nh c\xF4ng"
  };
});

export { buy_post as default };
//# sourceMappingURL=buy.post.mjs.map
