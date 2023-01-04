"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = Okta;

function Okta(options) {
  return {
    id: "okta",
    name: "Okta",
    type: "oauth",
    wellKnown: `${options.issuer}/.well-known/openid-configuration`,
    authorization: {
      params: {
        scope: "openid email profile"
      }
    },
    idToken: true,

    profile(profile) {
      var _profile$name;

      return {
        id: profile.sub,
        name: (_profile$name = profile.name) !== null && _profile$name !== void 0 ? _profile$name : profile.preferred_username,
        email: profile.email,
        image: profile.picture
      };
    },

    style: {
      logo: "https://raw.githubusercontent.com/nextauthjs/next-auth/main/packages/next-auth/provider-logos/okta.svg",
      logoDark: "https://raw.githubusercontent.com/nextauthjs/next-auth/main/packages/next-auth/provider-logos/okta-dark.svg",
      bg: "#fff",
      text: "#000",
      bgDark: "#000",
      textDark: "#fff"
    },
    options
  };
}