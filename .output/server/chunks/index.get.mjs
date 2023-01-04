import { defineEventHandler, createError } from 'h3';
import { g as getServerSession } from './nuxtAuthHandler.mjs';
import { g as getPlayer } from './nitro/node-server.mjs';
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
import 'socket.io';
import 'moment';
import 'node:fs';
import 'node:url';
import 'pathe';
import 'ipx';

const index_get = defineEventHandler(async (event) => {
  var _a;
  const session = await getServerSession(event);
  if (!session) {
    return createError({
      statusCode: 401,
      statusMessage: "Unauthorized"
    });
  }
  const playerResource = await getPlayer((_a = session == null ? void 0 : session.user) == null ? void 0 : _a.email, "");
  if (!playerResource) {
    return createError({
      statusCode: 404,
      statusMessage: "Player not found"
    });
  }
  return {
    player: playerResource == null ? void 0 : playerResource.player,
    attribute: playerResource == null ? void 0 : playerResource.attribute,
    mid: playerResource == null ? void 0 : playerResource.mid,
    upgrade: playerResource == null ? void 0 : playerResource.upgrade,
    equipments: playerResource.equipments,
    playerEquipUpgrade: playerResource.playerEquipUpgrade
  };
});

export { index_get as default };
//# sourceMappingURL=index.get.mjs.map
