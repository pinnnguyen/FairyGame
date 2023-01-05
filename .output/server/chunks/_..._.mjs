import CredentialsProvider from 'next-auth/providers/credentials';
import { U as UserSchema } from './user.mjs';
import { N as NuxtAuthHandler } from './nuxtAuthHandler.mjs';
import 'mongoose';
import 'h3';
import 'next-auth/core';
import 'requrl';
import 'defu';
import './nitro/node-server.mjs';
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
import 'node-cron';
import 'socket.io';
import 'moment';
import 'node:fs';
import 'node:url';
import 'pathe';
import 'ipx';

const _____ = NuxtAuthHandler({
  secret: "kkfo2i1o2n2nfjjk2k22k2e2ejf",
  providers: [
    CredentialsProvider.default({
      name: "Credentials",
      credentials: {
        username: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" }
      },
      async authorize(credentials) {
        const findUser = await UserSchema.findOne({
          email: credentials == null ? void 0 : credentials.username,
          password: credentials == null ? void 0 : credentials.password
        });
        if (findUser)
          return findUser;
        else
          return null;
      }
    })
  ]
});

export { _____ as default };
//# sourceMappingURL=_..._.mjs.map
