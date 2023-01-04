import { defineEventHandler, readBody, createError } from 'h3';
import { g as getPlayer, i as conditionForUpLevel, r as randomNumber, s as shouldTupo, P as PlayerSchema, U as UPGRADE_LEVEL, h as PlayerAttributeSchema, j as playerLevelUp } from './nitro/node-server.mjs';
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
import 'defu';
import 'radix3';
import 'mongoose';
import 'socket.io';
import 'moment';
import 'node:fs';
import 'node:url';
import 'pathe';
import 'ipx';

const caseNone = (response) => {
  response.status = false;
  response.message = "Ch\u01B0a \u0111\u1EE7 \u0111i\u1EC1u ki\u1EC7n \u0111\u1ED9t ph\xE1";
  return response;
};
const caseLevelUpNormal = async (response, sjs, sid) => {
  const pAttribute = await PlayerAttributeSchema.findOne({ sid });
  if (!pAttribute) {
    return createError({
      statusCode: 400,
      statusMessage: "player attribute not found"
    });
  }
  if (sjs <= 3) {
    response.status = false;
    response.message = "\u0110\u1ED9t ph\xE1 th\u1EA5t b\u1EA1i";
    return response;
  }
  const uhp = 2 + Math.round(pAttribute.hp / 50);
  const udmg = 1 + Math.round(pAttribute.damage / 70);
  const udef = 1 + Math.round(pAttribute.def / 70);
  await PlayerAttributeSchema.updateOne({ sid }, {
    $inc: {
      hp: uhp,
      damage: udmg,
      def: udef
    }
  });
  await playerLevelUp(sid);
  response.status = true;
  response.message = "\u0110\u1ED9t ph\xE1 th\xE0nh c\xF4ng";
  return response;
};
const caseBigLevel = async (response, sjs, sid) => {
  const pAttribute = await PlayerAttributeSchema.findOne({ sid });
  if (!pAttribute) {
    return createError({
      statusCode: 400,
      statusMessage: "player attribute not found"
    });
  }
  const uhp = 4 + Math.round(pAttribute.hp / 20);
  const udmg = 2 + Math.round(pAttribute.damage / 10);
  const udef = 2 + Math.round(pAttribute.def / 10);
  if (sjs < 8) {
    response.status = false;
    response.message = "\u0110\u1ED9t ph\xE1 th\u1EA5t b\u1EA1i";
    return response;
  }
  await PlayerAttributeSchema.updateOne({ sid }, {
    $inc: {
      hp: uhp,
      damage: udmg,
      def: udef
    }
  });
  await playerLevelUp(sid);
  response.status = true;
  response.message = "\u0110\u1ED9t ph\xE1 th\xE0nh c\xF4ng";
  return response;
};
const index_post = defineEventHandler(async (event) => {
  var _a, _b;
  const body = await readBody(event);
  const playerAfter = await getPlayer("", body.sid);
  if (!playerAfter) {
    return createError({
      statusCode: 400,
      statusMessage: "player not found"
    });
  }
  const _p = playerAfter.player;
  const { needGold } = conditionForUpLevel(_p);
  const sjs = randomNumber(1, 10);
  const upgrade = shouldTupo(_p);
  const response = {
    level: _p.level,
    nextLevel: _p.level + 1,
    gold: _p.gold,
    needGold,
    message: "",
    status: true
  };
  if (_p.gold < needGold) {
    response.status = false;
    response.message = `B\u1EA1n c\u1EA7n ${needGold} V\xE0ng \u0111\u1EC3 \u0111\u1ED9t ph\xE1`;
    return response;
  }
  if (((_a = playerAfter == null ? void 0 : playerAfter.player) == null ? void 0 : _a.exp) < ((_b = playerAfter == null ? void 0 : playerAfter.player) == null ? void 0 : _b.expLimited)) {
    response.status = false;
    response.message = "Tu vi ch\u01B0a \u0111\u1EE7 \u0111\u1EC3 \u0111\u1ED9t ph\xE1";
    return response;
  }
  const changeResult = await PlayerSchema.changeCurrency({
    kind: "gold",
    sid: _p.sid,
    value: -needGold
  });
  if (!changeResult) {
    return createError({
      statusCode: 500,
      statusMessage: "changeCurrency error"
    });
  }
  console.log("upgrade", upgrade);
  console.log("sjs", sjs);
  switch (upgrade) {
    case UPGRADE_LEVEL.NONE:
      return caseNone(response);
    case UPGRADE_LEVEL.BIG_UP_LEVEL:
      response.status = true;
      response.message = "\u0110\u1ED9t \u0111\u1EA1i ph\xE1 th\xE0nh c\xF4ng";
      await caseBigLevel(response, sjs, _p.sid);
      break;
    case UPGRADE_LEVEL.UP_LEVEL:
      await caseLevelUpNormal(response, sjs, _p.sid);
      break;
  }
  const playerBefore = await getPlayer("", _p.sid);
  return {
    ...response,
    playerBefore: playerBefore || {},
    playerAfter: playerAfter || {}
  };
});

export { index_post as default };
//# sourceMappingURL=index.post.mjs.map
