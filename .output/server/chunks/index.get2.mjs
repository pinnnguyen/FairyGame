import { defineEventHandler, getQuery, createError } from 'h3';
import { g as getServerSession, P as PlayerSchema } from './nitro/node-server.mjs';
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

const handle = defineEventHandler(async (event) => {
  const query = getQuery(event);
  const session = await getServerSession(event);
  if (!session) {
    return createError({
      statusCode: 401,
      statusMessage: "Unauthorized"
    });
  }
  if (query.sorted === "power") {
    return PlayerSchema.find({}).sort({
      power: -1
    }).limit(20).select("name level arenas power sid");
  }
  return PlayerSchema.find({}).sort({
    level: -1
  }).limit(20).select("name level arenas power sid");
});

export { handle as default };
//# sourceMappingURL=index.get2.mjs.map
