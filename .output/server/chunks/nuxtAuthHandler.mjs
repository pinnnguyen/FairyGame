import { eventHandler, setCookie, appendHeader, sendRedirect, createError, parseCookies, getHeaders, getMethod, getQuery, isMethod, readBody } from 'h3';
import { NextAuthHandler } from 'next-auth/core';
import getURL from 'requrl';
import defu from 'defu';
import { u as useRuntimeConfig } from './nitro/node-server.mjs';

const isNonEmptyObject = (obj) => typeof obj === "object" && Object.keys(obj).length > 0;

let preparedAuthHandler;
let usedSecret;
const SUPPORTED_ACTIONS = ["providers", "session", "csrf", "signin", "signout", "callback", "verify-request", "error", "_log"];
const readBodyForNext = async (event) => {
  let body;
  if (isMethod(event, "PATCH") || isMethod(event, "POST") || isMethod(event, "PUT") || isMethod(event, "DELETE")) {
    body = await readBody(event);
  }
  return body;
};
const parseActionAndProvider = ({ context }) => {
  const params = context.params._?.split("/");
  if (!params || ![1, 2].includes(params.length)) {
    throw createError({ statusCode: 400, statusMessage: `Invalid path used for auth-endpoint. Supply either one path parameter (e.g., \`/api/auth/session\`) or two (e.g., \`/api/auth/signin/github\` after the base path (in previous examples base path was: \`/api/auth/\`. Received \`${params}\`` });
  }
  const [unvalidatedAction, providerId] = params;
  const action = SUPPORTED_ACTIONS.find((action2) => action2 === unvalidatedAction);
  if (!action) {
    throw createError({ statusCode: 400, statusMessage: `Called endpoint with unsupported action ${unvalidatedAction}. Only the following actions are supported: ${SUPPORTED_ACTIONS.join(", ")}` });
  }
  return { action, providerId };
};
const getServerOrigin = (event) => useRuntimeConfig().auth.origin ?? ("");
const detectHost = (trusted, forwardedValue, defaultValue) => {
  if (trusted && forwardedValue) {
    return Array.isArray(forwardedValue) ? forwardedValue[0] : forwardedValue;
  }
  return defaultValue || void 0;
};
const NuxtAuthHandler = (nuxtAuthOptions) => {
  usedSecret = nuxtAuthOptions?.secret;
  if (!usedSecret) {
    console.warn('nuxt-auth runtime: No `secret` supplied - supplying a `secret` will be necessary for production. Set the `secret` in the `NuxtAuthHandler` like so: `NuxtAuthHandler({ secret: "your-production-secret" })`');
    {
      throw new Error('Bad production config - set `secret` inside the `NuxtAuthHandler` like so: `NuxtAuthHandler({ secret: "your-production-secret" })`');
    }
  }
  if (!useRuntimeConfig().auth.isOriginSet) {
    console.warn('nuxt-auth runtime: No `origin` supplied - supplying an `origin` will be necessary for production. Set the `origin` in your `nuxt.config.ts` like so: `auth: { origin: "https://your-origin.com" }`');
    {
      throw new Error('Bad production config - set the application `origin` inside your `nuxt.config.ts` file like so: `auth: { origin: "https://your-cool-website.com" }` ');
    }
  }
  const options = defu(nuxtAuthOptions, {
    secret: usedSecret,
    logger: void 0,
    providers: [],
    trustHost: useRuntimeConfig().auth.trustHost
  });
  const getInternalNextAuthRequestData = async (event) => {
    const nextRequest = {
      host: detectHost(
        options.trustHost,
        getURL(event.node.req),
        getServerOrigin()
      ),
      body: void 0,
      cookies: parseCookies(event),
      query: void 0,
      headers: getHeaders(event),
      method: getMethod(event),
      providerId: void 0,
      error: void 0
    };
    if (event.context.checkSessionOnNonAuthRequest === true) {
      return {
        ...nextRequest,
        method: "GET",
        action: "session"
      };
    }
    const query = getQuery(event);
    const { action, providerId } = parseActionAndProvider(event);
    const error = query.error;
    if (Array.isArray(error)) {
      throw createError({ statusCode: 400, statusMessage: "Error query parameter can only appear once" });
    }
    const body = await readBodyForNext(event);
    return {
      ...nextRequest,
      body,
      query,
      action,
      providerId,
      error: error || void 0
    };
  };
  const handler = eventHandler(async (event) => {
    const { res } = event.node;
    const nextRequest = await getInternalNextAuthRequestData(event);
    const nextResult = await NextAuthHandler({
      req: nextRequest,
      options
    });
    if (nextResult.status) {
      res.statusCode = nextResult.status;
    }
    nextResult.cookies?.forEach((cookie) => setCookie(event, cookie.name, cookie.value, cookie.options));
    nextResult.headers?.forEach((header) => appendHeader(event, header.key, header.value));
    if (!nextResult.redirect) {
      return nextResult.body;
    }
    if (nextRequest.body?.json) {
      return { url: nextResult.redirect };
    }
    return sendRedirect(event, nextResult.redirect);
  });
  if (preparedAuthHandler) {
    console.warn("You setup the auth handler for a second time - this is likely undesired. Make sure that you only call `NuxtAuthHandler( ... )` once");
  }
  preparedAuthHandler = handler;
  return handler;
};
const getServerSession = async (event) => {
  if (!preparedAuthHandler) {
    throw createError({ statusCode: 500, statusMessage: "Tried to get server session without setting up an endpoint to handle authentication (see https://github.com/sidebase/nuxt-auth#quick-start)" });
  }
  event.context.checkSessionOnNonAuthRequest = true;
  const session = await preparedAuthHandler(event);
  delete event.context.checkSessionOnNonAuthRequest;
  if (isNonEmptyObject(session)) {
    return session;
  }
  return null;
};

export { NuxtAuthHandler as N, getServerSession as g };
//# sourceMappingURL=nuxtAuthHandler.mjs.map
