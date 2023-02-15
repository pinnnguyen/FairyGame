import { defineEventHandler, readBody, createError } from 'h3';
import { p as MailSchema } from './nitro/node-server.mjs';
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
  const body = await readBody(event);
  if (!body._mailId) {
    return createError({
      statusCode: 400,
      statusMessage: "Params Invalid"
    });
  }
  const mail = await MailSchema.findById(body._mailId);
  if (!mail) {
    return createError({
      statusCode: 400,
      statusMessage: "Mail Invalid"
    });
  }
  if (body.forksDelete) {
    await MailSchema.findByIdAndUpdate(body._mailId, {
      deleted: true
    });
    return {
      success: true,
      message: "Xo\xE1 th\u01B0 th\xE0nh c\xF4ng"
    };
  }
  if (mail.records && mail.records.length > 0 && !mail.isRead) {
    return {
      success: false,
      message: "Th\u01B0 c\xF2n v\u1EADt ph\u1EA9m ch\u01B0a nh\u1EADn \u0111\u1EA1o h\u1EEFu c\xF3 mu\u1ED1n xo\xE1?"
    };
  }
  await MailSchema.findByIdAndUpdate(body._mailId, {
    deleted: true
  });
  return {
    success: true,
    message: "Xo\xE1 th\u01B0 th\xE0nh c\xF4ng"
  };
});

export { handle as default };
//# sourceMappingURL=delete.post.mjs.map
