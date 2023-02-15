import CredentialsProvider from 'next-auth/providers/credentials';
import { U as UserSchema } from './user.mjs';
import { N as NuxtAuthHandler } from './nitro/node-server.mjs';
import 'mongoose';
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
import 'node-cron';
import 'next-auth/core';
import 'requrl';
import 'node:fs';
import 'node:url';
import 'pathe';
import 'socket.io';
import 'moment';
import 'ipx';

const _____ = NuxtAuthHandler({
  // secret needed to run nuxt-auth in production mode (used to encrypt data)
  secret: "kkfo2i1o2n2nfjjk2k22k2e2ejf",
  providers: [
    //    GithubProvider.default({
    //      clientId: process.env.GITHUB_CLIENT_ID,
    //      clientSecret: process.env.GITHUB_CLIENT_SECRET,
    //    }),
    // FacebookProvider.de
    // @ts-expect-error Import is exported on .default during SSR, so we need to call it this way. May be fixed via Vite at some point
    CredentialsProvider.default({
      // The name to display on the sign in form (e.g. 'Sign in with...')
      name: "Credentials",
      // The credentials is used to generate a suitable form on the sign in page.
      // You can specify whatever fields you are expecting to be submitted.
      // e.g. domain, username, password, 2FA token, etc.
      // You can pass any HTML attribute to the <input> tag through the object.
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
