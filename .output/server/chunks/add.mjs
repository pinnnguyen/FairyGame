import { d as defineEventHandler, g as getServerSession, c as createError, r as readBody, P as PlayerSchema, k as getPlayer } from './nitro/node-server.mjs';
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

const add = defineEventHandler(async (event) => {
  var _a;
  const uServer = await getServerSession(event);
  if (!uServer) {
    return createError({
      statusCode: 401,
      statusMessage: "Unauthorized"
    });
  }
  const body = await readBody(event);
  if (!body.target) {
    return {
      statusCode: 400,
      statusMessage: "Ch\u01B0a ch\u1ECDn lo\u1EA1i thu\u1ED9c t\xEDnh n\xE2ng c\u1EA5p"
    };
  }
  const player = await PlayerSchema.findOne({ userId: (_a = uServer.user) == null ? void 0 : _a.email });
  if (!player) {
    return createError({
      statusCode: 400,
      statusMessage: "Player not found"
    });
  }
  if (player.ofAttribute <= 0 || !player.ofAttribute) {
    return {
      statusCode: 400,
      statusMessage: "\u0110i\u1EC3m thu\u1ED9c t\xEDnh kh\xF4ng \u0111\u1EE7"
    };
  }
  if (body.target === "ofPower") {
    await PlayerSchema.updateOne({ sid: player.sid }, {
      $inc: {
        "coreAttribute.ofPower": 1,
        "ofAttribute": -1
      }
    });
  }
  if (body.target === "ofAgility") {
    await PlayerSchema.updateOne({ sid: player.sid }, {
      $inc: {
        "coreAttribute.ofAgility": 1,
        "ofAttribute": -1
      }
    });
  }
  if (body.target === "ofSkillful") {
    await PlayerSchema.updateOne({ sid: player.sid }, {
      $inc: {
        "coreAttribute.ofSkillful": 1,
        "ofAttribute": -1
      }
    });
  }
  if (body.target === "ofVitality") {
    await PlayerSchema.updateOne({ sid: player.sid }, {
      $inc: {
        "coreAttribute.ofVitality": 1,
        "ofAttribute": -1
      }
    });
  }
  const _p = await getPlayer("", player.sid);
  return {
    statusCode: 201,
    statusMessage: "T\u0103ng thu\u1ED9c t\xEDnh th\xE0nh c\xF4ng",
    player: _p
  };
});

export { add as default };
//# sourceMappingURL=add.mjs.map
