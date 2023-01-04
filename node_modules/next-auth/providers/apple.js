"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = Apple;

function Apple(options) {
  return {
    id: "apple",
    name: "Apple",
    type: "oauth",
    wellKnown: "https://appleid.apple.com/.well-known/openid-configuration",
    authorization: {
      params: {
        scope: "name email",
        response_mode: "form_post"
      }
    },
    idToken: true,

    profile(profile) {
      return {
        id: profile.sub,
        name: profile.name,
        email: profile.email,
        image: null
      };
    },

    checks: ["pkce"],
    style: {
      logo: 'https://raw.githubusercontent.com/nextauthjs/next-auth/main/packages/next-auth/provider-logos/apple.svg',
      logoDark: 'https://raw.githubusercontent.com/nextauthjs/next-auth/main/packages/next-auth/provider-logos/apple-dark.svg',
      bg: "#fff",
      text: "#000",
      bgDark: "#000",
      textDark: "#fff"
    },
    options
  };
}