"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = Atlassian;

function Atlassian(options) {
  return {
    id: "atlassian",
    name: "Atlassian",
    type: "oauth",
    authorization: {
      url: "https://auth.atlassian.com/authorize",
      params: {
        audience: "api.atlassian.com",
        prompt: "consent"
      }
    },
    token: "https://auth.atlassian.com/oauth/token",
    userinfo: "https://api.atlassian.com/me",

    profile(profile) {
      return {
        id: profile.account_id,
        name: profile.name,
        email: profile.email,
        image: profile.picture
      };
    },

    style: {
      logo: "https://raw.githubusercontent.com/nextauthjs/next-auth/main/packages/next-auth/provider-logos/atlassian.svg",
      logoDark: "https://raw.githubusercontent.com/nextauthjs/next-auth/main/packages/next-auth/provider-logos/atlassian-dark.svg",
      bg: "#0052cc",
      text: "#fff",
      bgDark: "#fff",
      textDark: "#0052cc"
    },
    options
  };
}