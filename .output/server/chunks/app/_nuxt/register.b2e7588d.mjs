import { ref, unref, useSSRContext } from 'vue';
import { ssrRenderAttrs, ssrRenderAttr } from 'vue/server-renderer';
import { _ as _imports_0 } from './logo.8fe7ff0c.mjs';

const _sfc_main = {
  __name: "register",
  __ssrInlineRender: true,
  setup(__props) {
    ref(false);
    const password = ref("");
    const rePassword = ref("");
    const email = ref("");
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<section${ssrRenderAttrs(_attrs)}><div class="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0"><a href="#" class="flex items-center mb-6 text-2xl font-semibold text-gray-900 dark:text-white"><img class="w-8 h-8 mr-2"${ssrRenderAttr("src", _imports_0)} alt="logo"> Tu Ti\xEAn Gi\u1EDBi </a><div class="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700"><div class="p-6 space-y-6 sm:p-8"><h1 class="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white"> \u0110\u0103ng k\xFD t\xE0i kho\u1EA3n </h1><form class="space-y-4 md:space-y-6"><div><label for="email" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Email</label><input id="email"${ssrRenderAttr("value", unref(email))} type="email" name="email" class="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="name@company.com" required=""></div><div><label for="password" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">M\u1EADt kh\u1EA9u</label><input id="password"${ssrRenderAttr("value", unref(password))} type="password" name="password" placeholder="\u2022\u2022\u2022\u2022\u2022\u2022\u2022\u2022" class="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required=""></div><div><label for="password" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Nh\u1EADp l\u1EA1i m\u1EADt kh\u1EA9u</label><input id="password"${ssrRenderAttr("value", unref(rePassword))} type="password" name="password" placeholder="\u2022\u2022\u2022\u2022\u2022\u2022\u2022\u2022" class="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required=""></div><div class="flex items-center justify-between text-right"><a href="#" class="w-full text-sm font-medium text-primary-600 hover:underline dark:text-primary-500">Qu\xEAn m\u1EADt kh\u1EA9u?</a></div><button type="submit" class="w-full text-white bg-blue-600 hover:bg-blue-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:hover:bg-primary-700"> \u0110\u0103ng nh\u1EADp </button><p class="text-sm font-light text-gray-500 dark:text-gray-400"> B\u1EA1n \u0111\xE3 c\xF3 t\xE0i kho\u1EA3n? <a href="/login" class="font-medium text-primary-600 hover:underline dark:text-primary-500">\u0110\u0103ng nh\u1EADp</a></p></form></div></div></div></section>`);
    };
  }
};
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/register.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};

export { _sfc_main as default };
//# sourceMappingURL=register.b2e7588d.mjs.map
