import { d as defineEventHandler, r as readBody, c as createError } from './nitro/node-server.mjs';
import { U as UserSchema } from './user.mjs';
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

const register = defineEventHandler(async (event) => {
  const body = await readBody(event);
  const user = await UserSchema.findOne({ email: body.email });
  if (user) {
    return createError({
      statusCode: 400,
      statusMessage: "USERNAME EXITS"
    });
  }
  const newUser = new UserSchema({
    email: body.email,
    password: body.password
  });
  await newUser.save();
  return {
    user: newUser
  };
});

export { register as default };
//# sourceMappingURL=register.mjs.map
