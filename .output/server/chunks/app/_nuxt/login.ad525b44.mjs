import { k as useSession } from '../server.mjs';
import { defineComponent, ref, unref, useSSRContext } from 'vue';
import { ssrRenderAttrs, ssrRenderAttr } from 'vue/server-renderer';
import { _ as _imports_0 } from './logo.8fe7ff0c.mjs';
import 'ofetch';
import 'hookable';
import 'unctx';
import 'ufo';
import 'h3';
import '@unhead/vue';
import '@unhead/dom';
import 'vue-router';
import 'defu';
import 'requrl';
import '../../nitro/node-server.mjs';
import 'node-fetch-native/polyfill';
import 'http';
import 'https';
import 'destr';
import 'unenv/runtime/fetch/index';
import 'scule';
import 'ohash';
import 'unstorage';
import 'radix3';
import 'mongoose';
import 'node-cron';
import 'socket.io';
import 'moment';
import 'node:fs';
import 'node:url';
import 'pathe';
import 'ipx';

const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "login",
  __ssrInlineRender: true,
  setup(__props) {
    useSession();
    const password = ref("");
    const email = ref("");
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<section${ssrRenderAttrs(_attrs)}><div class="flex flex-col items-center justify-center px-6 py-8 mx-auto h-screen lg:py-0"><a href="#" class="flex items-center mb-6 text-2xl font-semibold text-gray-900 dark:text-white"><img class="w-8 h-8 mr-2"${ssrRenderAttr("src", _imports_0)} alt="logo"> Tu Ti\xEAn Gi\u1EDBi </a><div class="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700"><div class="p-6 space-y-6 sm:p-8"><h1 class="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white"> \u0110\u0103ng nh\u1EADp t\xE0i kho\u1EA3n c\u1EE7a b\u1EA1n </h1><div class="space-y-4 md:space-y-6"><div><label for="email" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Email</label><input id="email"${ssrRenderAttr("value", unref(email))} type="email" name="email" class="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="name@company.com" required=""></div><div><label for="password" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">M\u1EADt kh\u1EA9u</label><input id="password"${ssrRenderAttr("value", unref(password))} type="password" name="password" placeholder="\u2022\u2022\u2022\u2022\u2022\u2022\u2022\u2022" class="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required=""></div><div class="flex items-center justify-between text-right"><a href="#" class="w-full text-sm font-medium text-primary-600 hover:underline dark:text-primary-500">Qu\xEAn m\u1EADt kh\u1EA9u?</a></div><button type="button" class="w-full text-white bg-blue-600 hover:bg-blue-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:hover:bg-primary-700"> \u0110\u0103ng nh\u1EADp </button><p class="text-sm font-light text-gray-500 dark:text-gray-400"> B\u1EA1n ch\u01B0a c\xF3 t\xE0i kho\u1EA3n? <a href="/register" class="font-medium text-primary-600 hover:underline dark:text-primary-500">\u0110\u0103ng k\xFD</a></p></div></div></div></div></section>`);
    };
  }
});
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/login.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};

export { _sfc_main as default };
//# sourceMappingURL=login.ad525b44.mjs.map
