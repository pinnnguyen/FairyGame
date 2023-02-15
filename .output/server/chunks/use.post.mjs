import { u as addPlayerGem, y as PlayerStatusSchema, z as PlayerStatusTypeCon, P as PlayerSchema, d as defineEventHandler, r as readBody, A as getPlayerItem, p as PlayerItemSchema } from './nitro/node-server.mjs';
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

const useItems = () => {
  const useUnboxGem = async (sid, itemInfo) => {
    await addPlayerGem(sid, itemInfo.value, 1, 1);
  };
  const useIncreaseExp = async (sid, itemInfo) => {
    const playerStatus = await PlayerStatusSchema.findOne({
      sid,
      type: PlayerStatusTypeCon.increase_exp
    });
    if (!playerStatus) {
      await PlayerStatusSchema.create({
        sid,
        type: PlayerStatusTypeCon.increase_exp,
        value: itemInfo.value,
        timeLeft: (/* @__PURE__ */ new Date()).getTime() + 72e5
        // 2h
      });
      return;
    }
    const now = (/* @__PURE__ */ new Date()).getTime();
    let timeLeft = 0;
    if (playerStatus.timeLeft < now)
      timeLeft = now + 72e5;
    else
      timeLeft = playerStatus.timeLeft + 72e5;
    await PlayerStatusSchema.updateOne({
      sid,
      type: PlayerStatusTypeCon.increase_exp
    }, {
      value: itemInfo.value,
      $inc: {
        timeLeft
        // 1 Day
      }
    });
  };
  const useGold = async (sid, itemInfo) => {
    await PlayerSchema.findOneAndUpdate({ sid }, {
      $inc: {
        gold: itemInfo.value
      }
    });
  };
  const useReducedTimeItemRefreshMonster = async (sid, itemInfo) => {
    const playerStatus = await PlayerStatusSchema.findOne({
      sid,
      type: PlayerStatusTypeCon.reduce_waiting_time_training
    });
    if (!playerStatus) {
      await PlayerStatusSchema.create({
        sid,
        type: PlayerStatusTypeCon.reduce_waiting_time_training,
        value: itemInfo.value,
        timeLeft: (/* @__PURE__ */ new Date()).getTime() + 864e5
      });
      return;
    }
    const now = (/* @__PURE__ */ new Date()).getTime();
    let timeLeft = 0;
    if (playerStatus.timeLeft < now)
      timeLeft = now + 864e5;
    else
      timeLeft = playerStatus.timeLeft + 864e5;
    await PlayerStatusSchema.updateOne({
      sid,
      type: PlayerStatusTypeCon.reduce_waiting_time_training
    }, {
      value: itemInfo.value,
      $inc: {
        timeLeft
        // 1 Day
      }
    });
  };
  return {
    useReducedTimeItemRefreshMonster,
    useGold,
    useIncreaseExp,
    useUnboxGem
  };
};

const { useReducedTimeItemRefreshMonster, useGold, useIncreaseExp, useUnboxGem } = useItems();
const use_post = defineEventHandler(async (event) => {
  var _a;
  const body = await readBody(event);
  const playerItems = await getPlayerItem(body.sid, body.itemId);
  if (playerItems.length === 0) {
    return {
      statusCode: 400,
      statusMessage: "V\u1EADt ph\u1EA9m kh\xF4ng t\u1ED3n t\u1EA1i"
    };
  }
  const playerItem = playerItems[0];
  if (((_a = playerItem == null ? void 0 : playerItem.info) == null ? void 0 : _a.kind) !== body.kind) {
    return {
      statusCode: 400,
      statusMessage: "Lo\u1EA1i v\u1EADt ph\u1EA3m kh\xF4ng h\u1EE3p l\u1EC7"
    };
  }
  if (playerItem.sum && playerItem.sum < body.quantity) {
    return {
      statusCode: 400,
      statusMessage: "V\u1EADt ph\u1EA9m kh\xF4ng \u0111\u1EE7 s\u1ED1 l\u01B0\u1EE3ng"
    };
  }
  await PlayerItemSchema.updateOne({ sid: body.sid, itemId: body.itemId }, {
    $inc: {
      sum: -body.quantity
    }
  });
  switch (body.itemId) {
    case 4:
    case 5:
    case 6:
    case 7:
      await useReducedTimeItemRefreshMonster(body.sid, playerItem.info);
      break;
    case 9:
      await useGold(body.sid, playerItem.info);
      break;
    case 10:
    case 11:
      await useIncreaseExp(body.sid, playerItem.info);
      break;
    case 12:
      await useUnboxGem(body.sid, playerItem.info);
      break;
  }
  return {
    statusCode: 200,
    statusMessage: "S\u1EED d\u1EE5ng v\u1EADt ph\u1EA9m th\xE0nh c\xF4ng"
  };
});

export { use_post as default };
//# sourceMappingURL=use.post.mjs.map
