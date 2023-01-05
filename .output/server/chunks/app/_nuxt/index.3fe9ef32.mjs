import { o as onClickOutside, _ as __nuxt_component_0 } from './index.eb8b2543.mjs';
import { f as defineStore, s as storeToRefs, g as useRequestHeaders, i as useAppStore, c as __nuxt_component_0$1, j as __nuxt_component_0$1$1, u as useNuxtApp, h as createError, b as _export_sfc } from '../server.mjs';
import { h, useSSRContext, defineComponent, ref, mergeProps, withCtx, unref, createVNode, toDisplayString, computed, onUnmounted, watch, openBlock, createBlock, createCommentVNode, withModifiers, withAsyncContext, reactive, onServerPrefetch, defineAsyncComponent, Fragment, renderList } from 'vue';
import { ssrRenderComponent, ssrInterpolate, ssrRenderAttrs, ssrRenderSlot, ssrRenderTeleport, ssrRenderList, ssrRenderStyle, ssrRenderClass } from 'vue/server-renderer';
import { r as randomNumber, _ as __nuxt_component_0$2 } from './index.2feaf918.mjs';
import { u as usePlayerStore, s as set } from './usePlayer.e639d27d.mjs';
import { u as useSocket } from './useSocket.a6558354.mjs';
import { _ as _sfc_main$a } from './ButtonConfirm.4cffc41f.mjs';
import { hash } from 'ohash';
import { Message, Icon } from 'vexip-ui';
import mongoose from 'mongoose';
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
import 'unstorage';
import 'radix3';
import 'node-cron';
import 'socket.io';
import 'moment';
import 'node:fs';
import 'node:url';
import 'pathe';
import 'ipx';
import 'socket.io-client';

const getDefault = () => null;
function useAsyncData(...args) {
  var _a, _b, _c, _d, _e, _f, _g;
  const autoKey = typeof args[args.length - 1] === "string" ? args.pop() : void 0;
  if (typeof args[0] !== "string") {
    args.unshift(autoKey);
  }
  let [key, handler, options = {}] = args;
  if (typeof key !== "string") {
    throw new TypeError("[nuxt] [asyncData] key must be a string.");
  }
  if (typeof handler !== "function") {
    throw new TypeError("[nuxt] [asyncData] handler must be a function.");
  }
  options.server = (_a = options.server) != null ? _a : true;
  options.default = (_b = options.default) != null ? _b : getDefault;
  options.lazy = (_c = options.lazy) != null ? _c : false;
  options.immediate = (_d = options.immediate) != null ? _d : true;
  const nuxt = useNuxtApp();
  const getCachedData = () => nuxt.isHydrating ? nuxt.payload.data[key] : nuxt.static.data[key];
  const hasCachedData = () => getCachedData() !== void 0;
  if (!nuxt._asyncData[key]) {
    nuxt._asyncData[key] = {
      data: ref((_g = (_f = getCachedData()) != null ? _f : (_e = options.default) == null ? void 0 : _e.call(options)) != null ? _g : null),
      pending: ref(!hasCachedData()),
      error: ref(nuxt.payload._errors[key] ? createError(nuxt.payload._errors[key]) : null)
    };
  }
  const asyncData = { ...nuxt._asyncData[key] };
  asyncData.refresh = asyncData.execute = (opts = {}) => {
    if (nuxt._asyncDataPromises[key]) {
      if (opts.dedupe === false) {
        return nuxt._asyncDataPromises[key];
      }
      nuxt._asyncDataPromises[key].cancelled = true;
    }
    if (opts._initial && hasCachedData()) {
      return getCachedData();
    }
    asyncData.pending.value = true;
    const promise = new Promise(
      (resolve, reject) => {
        try {
          resolve(handler(nuxt));
        } catch (err) {
          reject(err);
        }
      }
    ).then((result) => {
      if (promise.cancelled) {
        return nuxt._asyncDataPromises[key];
      }
      if (options.transform) {
        result = options.transform(result);
      }
      if (options.pick) {
        result = pick(result, options.pick);
      }
      asyncData.data.value = result;
      asyncData.error.value = null;
    }).catch((error) => {
      var _a2, _b2;
      if (promise.cancelled) {
        return nuxt._asyncDataPromises[key];
      }
      asyncData.error.value = error;
      asyncData.data.value = unref((_b2 = (_a2 = options.default) == null ? void 0 : _a2.call(options)) != null ? _b2 : null);
    }).finally(() => {
      if (promise.cancelled) {
        return;
      }
      asyncData.pending.value = false;
      nuxt.payload.data[key] = asyncData.data.value;
      if (asyncData.error.value) {
        nuxt.payload._errors[key] = createError(asyncData.error.value);
      }
      delete nuxt._asyncDataPromises[key];
    });
    nuxt._asyncDataPromises[key] = promise;
    return nuxt._asyncDataPromises[key];
  };
  const initialFetch = () => asyncData.refresh({ _initial: true });
  const fetchOnServer = options.server !== false && nuxt.payload.serverRendered;
  if (fetchOnServer && options.immediate) {
    const promise = initialFetch();
    onServerPrefetch(() => promise);
  }
  const asyncDataPromise = Promise.resolve(nuxt._asyncDataPromises[key]).then(() => asyncData);
  Object.assign(asyncDataPromise, asyncData);
  return asyncDataPromise;
}
function pick(obj, keys) {
  const newObj = {};
  for (const key of keys) {
    newObj[key] = obj[key];
  }
  return newObj;
}
function useFetch(request, arg1, arg2) {
  const [opts = {}, autoKey] = typeof arg1 === "string" ? [{}, arg1] : [arg1, arg2];
  const _key = opts.key || hash([autoKey, unref(opts.baseURL), typeof request === "string" ? request : "", unref(opts.params)]);
  if (!_key || typeof _key !== "string") {
    throw new TypeError("[nuxt] [useFetch] key must be a string: " + _key);
  }
  if (!request) {
    throw new Error("[nuxt] [useFetch] request is missing.");
  }
  const key = _key === autoKey ? "$f" + _key : _key;
  const _request = computed(() => {
    let r = request;
    if (typeof r === "function") {
      r = r();
    }
    return unref(r);
  });
  const {
    server,
    lazy,
    default: defaultFn,
    transform,
    pick: pick2,
    watch: watch2,
    immediate,
    ...fetchOptions
  } = opts;
  const _fetchOptions = reactive({
    ...fetchOptions,
    cache: typeof opts.cache === "boolean" ? void 0 : opts.cache
  });
  const _asyncDataOptions = {
    server,
    lazy,
    default: defaultFn,
    transform,
    pick: pick2,
    immediate,
    watch: [
      _fetchOptions,
      _request,
      ...watch2 || []
    ]
  };
  let controller;
  const asyncData = useAsyncData(key, () => {
    var _a;
    (_a = controller == null ? void 0 : controller.abort) == null ? void 0 : _a.call(controller);
    controller = typeof AbortController !== "undefined" ? new AbortController() : {};
    return $fetch(_request.value, { signal: controller.signal, ..._fetchOptions });
  }, _asyncDataOptions);
  return asyncData;
}
const EQUIPMENT_SLOT = {
  1: "V\u0169 kh\xED",
  2: "N\xF3n",
  3: "\xC1o gi\xE1p",
  4: "G\u0103ng tay",
  5: "Th\u1EE7 h\u1ED9",
  6: "\u0110ai l\u01B0ng",
  7: "H\u1EA1ng li\xEAn",
  8: "Nh\u1EABn tr\xE1i",
  9: "Nh\u1EABn ph\u1EA3i",
  10: "Ng\u1ECDc b\u1ED9i"
};
const sendMessage = (message, duration) => {
  Message.open({
    duration: duration != null ? duration : 1500,
    className: "!rounded-xl",
    closable: false,
    renderer: () => {
      return h("span", [
        h(Icon, {
          name: "bell-slash",
          style: {
            marginRight: "5px",
            color: "#339af0"
          }
        }),
        `${message}`
      ]);
    }
  });
};
const _sfc_main$9 = /* @__PURE__ */ defineComponent({
  __name: "equip-info",
  __ssrInlineRender: true,
  props: {
    item: null
  },
  emits: ["close"],
  setup(__props, { emit: emits }) {
    ref(false);
    const target = ref(null);
    onClickOutside(target, (event) => emits("close"));
    return (_ctx, _push, _parent, _attrs) => {
      const _component_Blocker = __nuxt_component_0;
      const _component_NuxtImg = __nuxt_component_0$1;
      _push(ssrRenderComponent(_component_Blocker, mergeProps({ class: "z-9999" }, _attrs), {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          var _a, _b, _c, _d, _e, _f, _g, _h;
          if (_push2) {
            _push2(`<div class="relative text-xs leading-6 text-white bg-[#31384f] p-0 border !border-[#795548] w-[320px]"${_scopeId}><div class="p-3"${_scopeId}><div class="flex items-center justify-between mb-4"${_scopeId}><div class="flex items-center justify-center"${_scopeId}><div class="bg-iconbg_3 w-15 bg-contain bg-no-repeat"${_scopeId}>`);
            _push2(ssrRenderComponent(_component_NuxtImg, {
              format: "webp",
              src: (_a = __props.item) == null ? void 0 : _a.preview
            }, null, _parent2, _scopeId));
            _push2(`</div></div><div class="mx-2"${_scopeId}><div${_scopeId}>${ssrInterpolate(__props.item.name)}</div><div${_scopeId}> V\u1ECB tr\xED: ${ssrInterpolate(unref(EQUIPMENT_SLOT)[__props.item.slot])}</div><div${_scopeId}> \u0110\u1EB3ng c\u1EA5p: ${ssrInterpolate(__props.item.level)}</div></div></div><div class="flex items-center justify-start"${_scopeId}><div class="mx-2"${_scopeId}><div class="flex justify-between"${_scopeId}><span${_scopeId}> C\xF4ng k\xEDch: ${ssrInterpolate(__props.item.damage)}</span></div><div class="flex justify-between"${_scopeId}><span${_scopeId}>Ph\xF2ng ng\u1EF1: ${ssrInterpolate(__props.item.def)}</span></div><div class="flex justify-between"${_scopeId}><span${_scopeId}>Kh\xED huy\u1EBFt: ${ssrInterpolate((_b = __props.item.hp) != null ? _b : 0)}</span></div><div class="flex justify-between"${_scopeId}><span${_scopeId}>B\u1EA1o k\xEDch: ${ssrInterpolate((_c = __props.item.critical) != null ? _c : 0)}%</span></div><div class="flex justify-between"${_scopeId}><span${_scopeId}>H\xFAt m\xE1u: ${ssrInterpolate((_d = __props.item.bloodsucking) != null ? _d : 0)}%</span></div></div></div><div class="flex justify-center mb-2"${_scopeId}></div></div></div>`);
          } else {
            return [
              createVNode("div", {
                ref_key: "target",
                ref: target,
                class: "relative text-xs leading-6 text-white bg-[#31384f] p-0 border !border-[#795548] w-[320px]"
              }, [
                createVNode("div", { class: "p-3" }, [
                  createVNode("div", { class: "flex items-center justify-between mb-4" }, [
                    createVNode("div", { class: "flex items-center justify-center" }, [
                      createVNode("div", { class: "bg-iconbg_3 w-15 bg-contain bg-no-repeat" }, [
                        createVNode(_component_NuxtImg, {
                          format: "webp",
                          src: (_e = __props.item) == null ? void 0 : _e.preview
                        }, null, 8, ["src"])
                      ])
                    ]),
                    createVNode("div", { class: "mx-2" }, [
                      createVNode("div", null, toDisplayString(__props.item.name), 1),
                      createVNode("div", null, " V\u1ECB tr\xED: " + toDisplayString(unref(EQUIPMENT_SLOT)[__props.item.slot]), 1),
                      createVNode("div", null, " \u0110\u1EB3ng c\u1EA5p: " + toDisplayString(__props.item.level), 1)
                    ])
                  ]),
                  createVNode("div", { class: "flex items-center justify-start" }, [
                    createVNode("div", { class: "mx-2" }, [
                      createVNode("div", { class: "flex justify-between" }, [
                        createVNode("span", null, " C\xF4ng k\xEDch: " + toDisplayString(__props.item.damage), 1)
                      ]),
                      createVNode("div", { class: "flex justify-between" }, [
                        createVNode("span", null, "Ph\xF2ng ng\u1EF1: " + toDisplayString(__props.item.def), 1)
                      ]),
                      createVNode("div", { class: "flex justify-between" }, [
                        createVNode("span", null, "Kh\xED huy\u1EBFt: " + toDisplayString((_f = __props.item.hp) != null ? _f : 0), 1)
                      ]),
                      createVNode("div", { class: "flex justify-between" }, [
                        createVNode("span", null, "B\u1EA1o k\xEDch: " + toDisplayString((_g = __props.item.critical) != null ? _g : 0) + "%", 1)
                      ]),
                      createVNode("div", { class: "flex justify-between" }, [
                        createVNode("span", null, "H\xFAt m\xE1u: " + toDisplayString((_h = __props.item.bloodsucking) != null ? _h : 0) + "%", 1)
                      ])
                    ])
                  ]),
                  createVNode("div", { class: "flex justify-center mb-2" })
                ])
              ], 512)
            ];
          }
        }),
        _: 1
      }, _parent));
    };
  }
});
const _sfc_setup$9 = _sfc_main$9.setup;
_sfc_main$9.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/Popup/equip-info.vue");
  return _sfc_setup$9 ? _sfc_setup$9(props, ctx) : void 0;
};
const __nuxt_component_3_lazy = /* @__PURE__ */ defineAsyncComponent(() => import('./list-daily.631745bd.mjs').then((m) => m.default || m));
const __nuxt_component_4_lazy = /* @__PURE__ */ defineAsyncComponent(() => import('./list-frame-time.89ee331f.mjs').then((m) => m.default || m));
const _sfc_main$8 = {
  __name: "daily",
  __ssrInlineRender: true,
  emits: ["close"],
  async setup(__props, { emit: emits }) {
    let __temp, __restore;
    const target = ref(null);
    onClickOutside(target, (event) => emits("close"));
    const currentTab = ref("daily");
    const equipShow = ref(false);
    const { data: dataResponse, refresh } = ([__temp, __restore] = withAsyncContext(() => useAsyncData("boss", () => $fetch("/api/boss", {
      params: {
        kind: currentTab.value
      }
    }))), __temp = await __temp, __restore(), __temp);
    console.log("bossDaily", dataResponse.value);
    watch(currentTab, (value) => {
      console.log("value", value);
      refresh();
    });
    return (_ctx, _push, _parent, _attrs) => {
      const _component_PopupEquipInfo = _sfc_main$9;
      const _component_Blocker = __nuxt_component_0;
      const _component_NuxtImg = __nuxt_component_0$1;
      const _component_LazyBossListDaily = __nuxt_component_3_lazy;
      const _component_LazyBossListFrameTime = __nuxt_component_4_lazy;
      _push(`<!--[-->`);
      ssrRenderTeleport(_push, (_push2) => {
        if (unref(equipShow)) {
          _push2(ssrRenderComponent(_component_PopupEquipInfo, {
            item: _ctx.equipSelected,
            onClose: ($event) => equipShow.value = false
          }, null, _parent));
        } else {
          _push2(`<!---->`);
        }
      }, "body", false, _parent);
      _push(ssrRenderComponent(_component_Blocker, { class: "z-99" }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<div class="flex items-center justify-center w-full h-[calc(100vh_-_30px)]"${_scopeId}><div class="w-[90%] h-[70%] absolute top-[calc(50%_-_35vh)]"${_scopeId}><div class="w-full h-full relative"${_scopeId}><span class="font-semibold absolute w-[40px] left-[calc(50%_-_15px)] top-[-1px] text-[#656f99]"${_scopeId}>BOSS</span>`);
            _push2(ssrRenderComponent(_component_NuxtImg, {
              class: "w-full h-full",
              src: "/common/bj_tongyong_1.png"
            }, null, _parent2, _scopeId));
            _push2(`<div class="absolute top-[30px] grid grid-cols-1 gap-1 items-center justify-center w-[92%] left-[calc(10%_-_10px)] max-h-[380px] overflow-scroll"${_scopeId}>`);
            if (unref(currentTab) === "daily") {
              _push2(`<!--[-->`);
              ssrRenderList(unref(dataResponse).bossNe, (bossNe) => {
                _push2(ssrRenderComponent(_component_LazyBossListDaily, {
                  key: bossNe.id,
                  boss: bossNe
                }, null, _parent2, _scopeId));
              });
              _push2(`<!--]-->`);
            } else {
              _push2(`<!---->`);
            }
            if (unref(currentTab) === "frameTime") {
              _push2(`<!--[-->`);
              ssrRenderList(unref(dataResponse).bossNe, (bossNe) => {
                _push2(ssrRenderComponent(_component_LazyBossListFrameTime, {
                  key: bossNe.id,
                  boss: bossNe
                }, null, _parent2, _scopeId));
              });
              _push2(`<!--]-->`);
            } else {
              _push2(`<!---->`);
            }
            _push2(`</div><div class="absolute bottom-[20px] left-10 text-10"${_scopeId}><button class="${ssrRenderClass([{ "!opacity-100": unref(currentTab) === "daily" }, "opacity-50 bg-[#f8d89b] h-[30px] text-[#9d521a] px-2 rounded mx-1"])}"${_scopeId}> H\u1EB1ng ng\xE0y </button><button class="${ssrRenderClass([{ "!opacity-100": unref(currentTab) === "frameTime" }, "opacity-50 bg-[#f8d89b] h-[30px] text-[#9d521a] px-2 rounded mx-1"])}"${_scopeId}> Khung gi\u1EDD </button></div></div></div></div>`);
          } else {
            return [
              createVNode("div", {
                ref_key: "target",
                ref: target,
                class: "flex items-center justify-center w-full h-[calc(100vh_-_30px)]"
              }, [
                createVNode("div", { class: "w-[90%] h-[70%] absolute top-[calc(50%_-_35vh)]" }, [
                  createVNode("div", { class: "w-full h-full relative" }, [
                    createVNode("span", { class: "font-semibold absolute w-[40px] left-[calc(50%_-_15px)] top-[-1px] text-[#656f99]" }, "BOSS"),
                    createVNode(_component_NuxtImg, {
                      class: "w-full h-full",
                      src: "/common/bj_tongyong_1.png"
                    }),
                    createVNode("div", { class: "absolute top-[30px] grid grid-cols-1 gap-1 items-center justify-center w-[92%] left-[calc(10%_-_10px)] max-h-[380px] overflow-scroll" }, [
                      unref(currentTab) === "daily" ? (openBlock(true), createBlock(Fragment, { key: 0 }, renderList(unref(dataResponse).bossNe, (bossNe) => {
                        return openBlock(), createBlock(_component_LazyBossListDaily, {
                          key: bossNe.id,
                          boss: bossNe
                        }, null, 8, ["boss"]);
                      }), 128)) : createCommentVNode("", true),
                      unref(currentTab) === "frameTime" ? (openBlock(true), createBlock(Fragment, { key: 1 }, renderList(unref(dataResponse).bossNe, (bossNe) => {
                        return openBlock(), createBlock(_component_LazyBossListFrameTime, {
                          key: bossNe.id,
                          boss: bossNe
                        }, null, 8, ["boss"]);
                      }), 128)) : createCommentVNode("", true)
                    ]),
                    createVNode("div", { class: "absolute bottom-[20px] left-10 text-10" }, [
                      createVNode("button", {
                        class: [{ "!opacity-100": unref(currentTab) === "daily" }, "opacity-50 bg-[#f8d89b] h-[30px] text-[#9d521a] px-2 rounded mx-1"],
                        onClick: ($event) => currentTab.value = "daily"
                      }, " H\u1EB1ng ng\xE0y ", 10, ["onClick"]),
                      createVNode("button", {
                        class: [{ "!opacity-100": unref(currentTab) === "frameTime" }, "opacity-50 bg-[#f8d89b] h-[30px] text-[#9d521a] px-2 rounded mx-1"],
                        onClick: ($event) => currentTab.value = "frameTime"
                      }, " Khung gi\u1EDD ", 10, ["onClick"])
                    ])
                  ])
                ])
              ], 512)
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`<!--]-->`);
    };
  }
};
const _sfc_setup$8 = _sfc_main$8.setup;
_sfc_main$8.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/Boss/daily.vue");
  return _sfc_setup$8 ? _sfc_setup$8(props, ctx) : void 0;
};
const BASE_EXP = () => {
  return randomNumber(5, 7) + 7;
};
const _sfc_main$7 = {
  __name: "index",
  __ssrInlineRender: true,
  setup(__props) {
    const { mids } = storeToRefs(usePlayerStore());
    const toggle = ref(false);
    computed(() => {
      var _a, _b, _c;
      return Math.round(BASE_EXP() * ((_c = (_b = (_a = mids.value.current) == null ? void 0 : _a.reward) == null ? void 0 : _b.base) == null ? void 0 : _c.exp));
    });
    computed(() => {
      var _a, _b, _c;
      return Math.round(BASE_EXP() * ((_c = (_b = (_a = mids.value.current) == null ? void 0 : _a.reward) == null ? void 0 : _b.base) == null ? void 0 : _c.gold));
    });
    return (_ctx, _push, _parent, _attrs) => {
      const _component_BossDaily = _sfc_main$8;
      const _component_ClientOnly = __nuxt_component_0$2;
      const _component_NuxtImg = __nuxt_component_0$1;
      _push(`<!--[-->`);
      if (unref(toggle)) {
        _push(ssrRenderComponent(_component_BossDaily, {
          onClose: ($event) => toggle.value = false
        }, null, _parent));
      } else {
        _push(`<!---->`);
      }
      _push(`<div class="text-10 mb-1 flex justify-end flex-col items-end text-white p-2 fixed bg-black top-10 right-0 z-99">`);
      _push(ssrRenderComponent(_component_ClientOnly, null, null, _parent));
      _push(`</div><div class="fixed z-10 top-[30%] right-0 flex flex-col justify-end items-end"><button class="w-[55px] relative">`);
      _push(ssrRenderComponent(_component_NuxtImg, {
        format: "webp",
        src: "/button/right_bottom.png"
      }, null, _parent));
      _push(ssrRenderComponent(_component_NuxtImg, {
        class: "w-[20px] absolute top-0",
        format: "webp",
        src: "/activity_icon/icon_61.png"
      }, null, _parent));
      _push(ssrRenderComponent(_component_NuxtImg, {
        class: "absolute w-[30px] top-[3px] right-[3px]",
        format: "webp",
        src: "/activity_icon/txt_mainui_boss.png"
      }, null, _parent));
      _push(`</button></div><!--]-->`);
    };
  }
};
const _sfc_setup$7 = _sfc_main$7.setup;
_sfc_main$7.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/TheRight/index.vue");
  return _sfc_setup$7 ? _sfc_setup$7(props, ctx) : void 0;
};
const _sfc_main$6 = {};
function _sfc_ssrRender(_ctx, _push, _parent, _attrs) {
  _push(`<section${ssrRenderAttrs(mergeProps({ class: "px-4" }, _attrs))}>`);
  ssrRenderSlot(_ctx.$slots, "default", {}, null, _push, _parent);
  _push(`</section>`);
}
const _sfc_setup$6 = _sfc_main$6.setup;
_sfc_main$6.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/Page/Section/index.vue");
  return _sfc_setup$6 ? _sfc_setup$6(props, ctx) : void 0;
};
const __nuxt_component_1 = /* @__PURE__ */ _export_sfc(_sfc_main$6, [["ssrRender", _sfc_ssrRender]]);
const _sfc_main$5 = /* @__PURE__ */ defineComponent({
  __name: "ItemRank",
  __ssrInlineRender: true,
  props: {
    preview: null,
    rank: null
  },
  setup(__props) {
    const props = __props;
    const bgRank = computed(() => {
      if (props.rank === 0)
        return "bg-iconbg_0";
      if (props.rank === 1)
        return "bg-iconbg_1";
      if (props.rank === 2)
        return "bg-iconbg_2";
      if (props.rank === 3)
        return "bg-iconbg_3";
      if (props.rank === 4)
        return "bg-iconbg_4";
      if (props.rank === 5)
        return "bg-iconbg_5";
      if (props.rank === 6)
        return "bg-iconbg_6";
      return "bg-iconbg_0";
    });
    return (_ctx, _push, _parent, _attrs) => {
      const _component_NuxtImg = __nuxt_component_0$1;
      _push(`<div${ssrRenderAttrs(mergeProps({
        class: [unref(bgRank), "w-12 bg-contain bg-no-repeat relative"]
      }, _attrs))}>`);
      _push(ssrRenderComponent(_component_NuxtImg, { src: __props.preview }, null, _parent));
      ssrRenderSlot(_ctx.$slots, "default", {}, null, _push, _parent);
      _push(`</div>`);
    };
  }
});
const _sfc_setup$5 = _sfc_main$5.setup;
_sfc_main$5.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/ItemRank.vue");
  return _sfc_setup$5 ? _sfc_setup$5(props, ctx) : void 0;
};
const ItemRank = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: _sfc_main$5
}, Symbol.toStringTag, { value: "Module" }));
const usePlayerSlot = defineStore("playerSlot", () => {
  const { playerEquipUpgrade, attribute, equipments } = storeToRefs(usePlayerStore());
  console.log("equipments", equipments.value);
  const slot1 = computed(() => equipments.value.find((e) => {
    var _a;
    return e._id === ((_a = attribute.value) == null ? void 0 : _a.slot_1);
  }));
  const slot2 = computed(() => equipments.value.find((e) => {
    var _a;
    return e._id === ((_a = attribute.value) == null ? void 0 : _a.slot_2);
  }));
  const slot3 = computed(() => equipments.value.find((e) => {
    var _a;
    return e._id === ((_a = attribute.value) == null ? void 0 : _a.slot_3);
  }));
  const slot4 = computed(() => equipments.value.find((e) => {
    var _a;
    return e._id === ((_a = attribute.value) == null ? void 0 : _a.slot_4);
  }));
  const slot5 = computed(() => equipments.value.find((e) => {
    var _a;
    return e._id === ((_a = attribute.value) == null ? void 0 : _a.slot_5);
  }));
  const slot6 = computed(() => equipments.value.find((e) => {
    var _a;
    return e._id === ((_a = attribute.value) == null ? void 0 : _a.slot_6);
  }));
  const slot7 = computed(() => equipments.value.find((e) => {
    var _a;
    return e._id === ((_a = attribute.value) == null ? void 0 : _a.slot_7);
  }));
  const slot8 = computed(() => equipments.value.find((e) => {
    var _a;
    return e._id === ((_a = attribute.value) == null ? void 0 : _a.slot_8);
  }));
  const getSlotEquipUpgrade = (slot) => {
    return playerEquipUpgrade.value.find((e) => e.slot === slot);
  };
  return {
    slot1,
    slot2,
    slot3,
    slot4,
    slot5,
    slot6,
    slot7,
    slot8,
    getSlotEquipUpgrade
  };
});
const _sfc_main$4 = /* @__PURE__ */ defineComponent({
  __name: "index",
  __ssrInlineRender: true,
  emits: ["close"],
  setup(__props, { emit: emits }) {
    const { _socket } = useSocket();
    storeToRefs(usePlayerStore());
    const { slot1, slot2, slot3, slot4, slot5, slot6, slot7, slot8 } = storeToRefs(usePlayerSlot());
    const { getSlotEquipUpgrade } = usePlayerSlot();
    usePlayerStore();
    const equipSelected = ref({});
    const needResource = ref();
    const loading = ref(false);
    onUnmounted(() => {
      _socket.emit("equip:upgrade:leave");
    });
    watch(equipSelected, (equip) => {
      console.log("equip", equip);
      _socket.emit("equip:upgrade:preview", equip._id);
    });
    return (_ctx, _push, _parent, _attrs) => {
      var _a, _b, _c, _d, _e, _f, _g, _h, _i, _j, _k, _l, _m, _n, _o, _p, _q, _r, _s;
      const _component_NuxtImg = __nuxt_component_0$1;
      const _component_ItemRank = _sfc_main$5;
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "flex items-center justify-center w-full h-[calc(100vh_-_30px)] bg-bg_5 bg-cover fixed top-[28px] w-full h-full z-99" }, _attrs))}><div class="w-full h-[80%] absolute top-10"><div class="w-full h-full relative"><span class="font-semibold absolute left-[calc(50%_-_28px)] top-[1px] text-[#656f99] text-12">C\u01B0\u1EDDng ho\xE1</span>`);
      _push(ssrRenderComponent(_component_NuxtImg, {
        class: "w-full h-full",
        format: "webp",
        src: "/common/bj_tongyong_1.png"
      }, null, _parent));
      _push(`<div class="absolute top-[30px] flex flex-col gap-1 items-center justify-center w-full"></div><div class="flex justify-around w-full absolute top-10"><div class="flex flex-col pl-2"><div>`);
      if ((_a = unref(slot1)) == null ? void 0 : _a.preview) {
        _push(ssrRenderComponent(_component_ItemRank, {
          class: "w-[55px] h-[55px]",
          rank: unref(slot1).rank,
          preview: (_b = unref(slot1)) == null ? void 0 : _b.preview,
          onClick: ($event) => equipSelected.value = unref(slot1)
        }, {
          default: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(`<div class="absolute bottom-0 pl-[2px] pb-[2px] text-12 font-semibold text-white w-[50px] flex justify-center"${_scopeId}>${ssrInterpolate(unref(getSlotEquipUpgrade)(1).upgradeLevel)} c\u1EA5p </div>`);
            } else {
              return [
                createVNode("div", { class: "absolute bottom-0 pl-[2px] pb-[2px] text-12 font-semibold text-white w-[50px] flex justify-center" }, toDisplayString(unref(getSlotEquipUpgrade)(1).upgradeLevel) + " c\u1EA5p ", 1)
              ];
            }
          }),
          _: 1
        }, _parent));
      } else {
        _push(`<div class="w-[55px] h-[55px]"></div>`);
      }
      _push(`</div><div>`);
      if ((_c = unref(slot2)) == null ? void 0 : _c.preview) {
        _push(ssrRenderComponent(_component_ItemRank, {
          class: "w-[55px] h-[55px]",
          rank: unref(slot2).rank,
          preview: (_d = unref(slot2)) == null ? void 0 : _d.preview,
          onClick: ($event) => equipSelected.value = unref(slot2)
        }, {
          default: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(`<div class="absolute bottom-0 pl-[2px] pb-[2px] text-12 font-semibold text-white w-[50px] flex justify-center"${_scopeId}>${ssrInterpolate(unref(getSlotEquipUpgrade)(2).upgradeLevel)} c\u1EA5p </div>`);
            } else {
              return [
                createVNode("div", { class: "absolute bottom-0 pl-[2px] pb-[2px] text-12 font-semibold text-white w-[50px] flex justify-center" }, toDisplayString(unref(getSlotEquipUpgrade)(2).upgradeLevel) + " c\u1EA5p ", 1)
              ];
            }
          }),
          _: 1
        }, _parent));
      } else {
        _push(`<div class="w-[55px] h-[55px]"></div>`);
      }
      _push(`</div><div>`);
      if ((_e = unref(slot3)) == null ? void 0 : _e.preview) {
        _push(ssrRenderComponent(_component_ItemRank, {
          class: "w-[55px] h-[55px]",
          rank: unref(slot3).rank,
          preview: (_f = unref(slot3)) == null ? void 0 : _f.preview,
          onClick: ($event) => equipSelected.value = unref(slot3)
        }, {
          default: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(`<div class="absolute bottom-0 pl-[2px] pb-[2px] text-12 font-semibold text-white w-[50px] flex justify-center"${_scopeId}>${ssrInterpolate(unref(getSlotEquipUpgrade)(3).upgradeLevel)} c\u1EA5p </div>`);
            } else {
              return [
                createVNode("div", { class: "absolute bottom-0 pl-[2px] pb-[2px] text-12 font-semibold text-white w-[50px] flex justify-center" }, toDisplayString(unref(getSlotEquipUpgrade)(3).upgradeLevel) + " c\u1EA5p ", 1)
              ];
            }
          }),
          _: 1
        }, _parent));
      } else {
        _push(`<div class="w-[55px] h-[55px]"></div>`);
      }
      _push(`</div><div>`);
      if ((_g = unref(slot4)) == null ? void 0 : _g.preview) {
        _push(ssrRenderComponent(_component_ItemRank, {
          class: "w-[55px] h-[55px]",
          rank: unref(slot4).rank,
          preview: (_h = unref(slot4)) == null ? void 0 : _h.preview,
          onClick: ($event) => equipSelected.value = unref(slot4)
        }, {
          default: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(`<div class="absolute bottom-0 pl-[2px] pb-[2px] text-12 font-semibold text-white w-[50px] flex justify-center"${_scopeId}>${ssrInterpolate(unref(getSlotEquipUpgrade)(4).upgradeLevel)} c\u1EA5p </div>`);
            } else {
              return [
                createVNode("div", { class: "absolute bottom-0 pl-[2px] pb-[2px] text-12 font-semibold text-white w-[50px] flex justify-center" }, toDisplayString(unref(getSlotEquipUpgrade)(4).upgradeLevel) + " c\u1EA5p ", 1)
              ];
            }
          }),
          _: 1
        }, _parent));
      } else {
        _push(`<div class="w-[55px] h-[55px]"></div>`);
      }
      _push(`</div></div><div class="flex justify-center items-center relative">`);
      _push(ssrRenderComponent(_component_NuxtImg, {
        format: "webp",
        class: "w-[200px]",
        src: "/upgrade/intensive.png"
      }, null, _parent));
      _push(`<div class="absolute mb-2 top-[73px]">`);
      if (unref(equipSelected).preview) {
        _push(ssrRenderComponent(_component_ItemRank, {
          class: "relative",
          rank: unref(equipSelected).rank,
          preview: unref(equipSelected).preview
        }, {
          default: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(`<div class="absolute bottom-0 pl-[2px] pb-[2px] text-12 font-semibold text-white w-[45px] flex justify-center"${_scopeId}>${ssrInterpolate(unref(getSlotEquipUpgrade)(unref(equipSelected).slot).upgradeLevel)} c\u1EA5p </div>`);
            } else {
              return [
                createVNode("div", { class: "absolute bottom-0 pl-[2px] pb-[2px] text-12 font-semibold text-white w-[45px] flex justify-center" }, toDisplayString(unref(getSlotEquipUpgrade)(unref(equipSelected).slot).upgradeLevel) + " c\u1EA5p ", 1)
              ];
            }
          }),
          _: 1
        }, _parent));
      } else {
        _push(`<div class="w-[44px] h-[44px]"></div>`);
      }
      _push(`</div></div><div class="flex flex-col pr-2"><div>`);
      if ((_i = unref(slot5)) == null ? void 0 : _i.preview) {
        _push(ssrRenderComponent(_component_ItemRank, {
          class: "w-[55px] h-[55px]",
          rank: unref(slot5).rank,
          preview: (_j = unref(slot5)) == null ? void 0 : _j.preview,
          onClick: ($event) => equipSelected.value = unref(slot5)
        }, {
          default: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(`<div class="absolute bottom-0 pl-[2px] pb-[2px] text-12 font-semibold text-white w-[50px] flex justify-center"${_scopeId}>${ssrInterpolate(unref(getSlotEquipUpgrade)(5).upgradeLevel)} c\u1EA5p </div>`);
            } else {
              return [
                createVNode("div", { class: "absolute bottom-0 pl-[2px] pb-[2px] text-12 font-semibold text-white w-[50px] flex justify-center" }, toDisplayString(unref(getSlotEquipUpgrade)(5).upgradeLevel) + " c\u1EA5p ", 1)
              ];
            }
          }),
          _: 1
        }, _parent));
      } else {
        _push(`<div class="w-[55px] h-[55px]"></div>`);
      }
      _push(`</div><div>`);
      if ((_k = unref(slot6)) == null ? void 0 : _k.preview) {
        _push(ssrRenderComponent(_component_ItemRank, {
          class: "w-[55px] h-[55px]",
          rank: unref(slot6).rank,
          preview: (_l = unref(slot6)) == null ? void 0 : _l.preview,
          onClick: ($event) => equipSelected.value = unref(slot6)
        }, {
          default: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(`<div class="absolute bottom-0 pl-[2px] pb-[2px] text-12 font-semibold text-white w-[50px] flex justify-center"${_scopeId}>${ssrInterpolate(unref(getSlotEquipUpgrade)(6).upgradeLevel)} c\u1EA5p </div>`);
            } else {
              return [
                createVNode("div", { class: "absolute bottom-0 pl-[2px] pb-[2px] text-12 font-semibold text-white w-[50px] flex justify-center" }, toDisplayString(unref(getSlotEquipUpgrade)(6).upgradeLevel) + " c\u1EA5p ", 1)
              ];
            }
          }),
          _: 1
        }, _parent));
      } else {
        _push(`<div class="w-[55px] h-[55px]"></div>`);
      }
      _push(`</div><div>`);
      if ((_m = unref(slot7)) == null ? void 0 : _m.preview) {
        _push(ssrRenderComponent(_component_ItemRank, {
          class: "w-[55px] h-[55px]",
          rank: unref(slot7).rank,
          preview: (_n = unref(slot7)) == null ? void 0 : _n.preview,
          onClick: ($event) => equipSelected.value = unref(slot7)
        }, {
          default: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(`<div class="absolute bottom-0 pl-[2px] pb-[2px] text-12 font-semibold text-white w-[50px] flex justify-center"${_scopeId}>${ssrInterpolate(unref(getSlotEquipUpgrade)(7).upgradeLevel)} c\u1EA5p </div>`);
            } else {
              return [
                createVNode("div", { class: "absolute bottom-0 pl-[2px] pb-[2px] text-12 font-semibold text-white w-[50px] flex justify-center" }, toDisplayString(unref(getSlotEquipUpgrade)(7).upgradeLevel) + " c\u1EA5p ", 1)
              ];
            }
          }),
          _: 1
        }, _parent));
      } else {
        _push(`<div class="w-[55px] h-[55px]"></div>`);
      }
      _push(`</div><div>`);
      if ((_o = unref(slot8)) == null ? void 0 : _o.preview) {
        _push(ssrRenderComponent(_component_ItemRank, {
          class: "w-[55px] h-[55px]",
          rank: unref(slot8).rank,
          preview: (_p = unref(slot8)) == null ? void 0 : _p.preview,
          onClick: ($event) => equipSelected.value = unref(slot8)
        }, {
          default: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(`<div class="absolute bottom-0 pl-[2px] pb-[2px] text-12 font-semibold text-white w-[50px] flex justify-center"${_scopeId}>${ssrInterpolate(unref(getSlotEquipUpgrade)(8).upgradeLevel)} c\u1EA5p </div>`);
            } else {
              return [
                createVNode("div", { class: "absolute bottom-0 pl-[2px] pb-[2px] text-12 font-semibold text-white w-[50px] flex justify-center" }, toDisplayString(unref(getSlotEquipUpgrade)(8).upgradeLevel) + " c\u1EA5p ", 1)
              ];
            }
          }),
          _: 1
        }, _parent));
      } else {
        _push(`<div class="w-[55px] h-[55px]"></div>`);
      }
      _push(`</div></div></div>`);
      if (unref(needResource)) {
        _push(`<div class="absolute bottom-0 w-full duration-500"><div class="flex items-center justify-center"><div class="flex items-center mx-1">`);
        _push(ssrRenderComponent(_component_NuxtImg, {
          format: "webp",
          class: "w-5 mr-1",
          src: "/items/3_s.png"
        }, null, _parent));
        _push(`<span class="text-12 font-semibold text-[#52648e]">${ssrInterpolate((_q = unref(needResource)) == null ? void 0 : _q.gold)}</span></div><div class="flex items-center mx-1">`);
        _push(ssrRenderComponent(_component_NuxtImg, {
          format: "webp",
          class: "w-5 mr-1",
          src: "/upgrade/cuonghoathach.png"
        }, null, _parent));
        _push(`<span class="text-12 font-semibold text-[#52648e]">${ssrInterpolate((_r = unref(needResource)) == null ? void 0 : _r.cuongHoaThach)}/${ssrInterpolate((_s = unref(needResource)) == null ? void 0 : _s.totalCuongHoaThach)}</span></div></div><div class="mb-5 mt-2 flex justify-center"><button class="bg-[#f4d59c] text-xs overflow-hidden relative p-4 h-[30px] flex items-center justify-center text-[#8d734b] rounded">`);
        if (unref(loading)) {
          _push(`<svg class="inline mr-2 w-3 h-3 text-gray-400 animate-spin dark:text-gray-600 fill-gray-600 dark:fill-gray-300" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor"></path><path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill"></path></svg>`);
        } else {
          _push(`<!---->`);
        }
        _push(`<span class="z-9 text-12 font-semibold"> C\u01B0\u1EDDng ho\xE1 </span></button></div></div>`);
      } else {
        _push(`<!---->`);
      }
      _push(`</div></div><div class="absolute bottom-0 w-full h-[65px]"><div class="w-full h-full relative">`);
      _push(ssrRenderComponent(_component_NuxtImg, {
        class: "w-full h-full",
        src: "/common/bg1_common.png"
      }, null, _parent));
      _push(`</div></div><div class="absolute bottom-0 flex justify-end w-full h-[65px]">`);
      _push(ssrRenderComponent(_component_NuxtImg, {
        class: "h-full",
        src: "/bottom/bottom_back.png"
      }, null, _parent));
      _push(`</div></div>`);
    };
  }
});
const _sfc_setup$4 = _sfc_main$4.setup;
_sfc_main$4.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/Upgrade/index.vue");
  return _sfc_setup$4 ? _sfc_setup$4(props, ctx) : void 0;
};
const _sfc_main$3 = /* @__PURE__ */ defineComponent({
  __name: "detail",
  __ssrInlineRender: true,
  props: {
    item: null
  },
  emits: ["close"],
  setup(__props, { emit: emits }) {
    const props = __props;
    const { changeEquip, hasEquip } = usePlayerStore();
    const loading = ref(false);
    const target = ref(null);
    onClickOutside(target, () => {
      console.log("click");
      emits("close");
    });
    const doEquip = async () => {
      var _a, _b;
      const _id = props.item._id;
      loading.value = true;
      const equipDataRes = await $fetch("/api/player/equip", {
        headers: useRequestHeaders(["cookie"]),
        method: "POST",
        body: {
          _equipId: _id,
          action: "equip"
        }
      });
      if (equipDataRes.statusCode === 200)
        changeEquip((_a = props.item) == null ? void 0 : _a.slot, (_b = props.item) == null ? void 0 : _b._id);
      loading.value = false;
      emits("close");
    };
    const doUnEquip = async () => {
      var _a;
      const _id = props.item._id;
      loading.value = true;
      const equipDataRes = await $fetch("/api/player/equip", {
        headers: useRequestHeaders(["cookie"]),
        method: "POST",
        body: {
          _equipId: _id,
          action: "unequip"
        }
      });
      if (equipDataRes.statusCode === 200)
        changeEquip((_a = props.item) == null ? void 0 : _a.slot, "");
      loading.value = false;
      emits("close");
    };
    return (_ctx, _push, _parent, _attrs) => {
      const _component_Blocker = __nuxt_component_0;
      const _component_ItemRank = _sfc_main$5;
      const _component_ButtonConfirm = _sfc_main$a;
      _push(ssrRenderComponent(_component_Blocker, mergeProps({ class: "z-99" }, _attrs), {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          var _a, _b, _c, _d, _e, _f, _g, _h;
          if (_push2) {
            _push2(`<div class="relative text-xs leading-6 text-white bg-[#31384f] p-0 border !border-[#795548] w-[320px]"${_scopeId}><div class="p-3"${_scopeId}><div class="flex items-center justify-between mb-4"${_scopeId}><div class="flex items-center justify-center"${_scopeId}>`);
            _push2(ssrRenderComponent(_component_ItemRank, {
              class: "w-15",
              rank: __props.item.rank,
              preview: (_a = __props.item) == null ? void 0 : _a.preview
            }, null, _parent2, _scopeId));
            _push2(`</div><div class="mx-2"${_scopeId}><div${_scopeId}>${ssrInterpolate(__props.item.name)}</div><div${_scopeId}> V\u1ECB tr\xED: ${ssrInterpolate(unref(EQUIPMENT_SLOT)[__props.item.slot])}</div><div${_scopeId}> \u0110\u1EB3ng c\u1EA5p: ${ssrInterpolate(__props.item.level)}</div></div></div><div class="flex items-center justify-start"${_scopeId}><div class="mx-2"${_scopeId}><div class="flex justify-between"${_scopeId}><span${_scopeId}> C\xF4ng k\xEDch: ${ssrInterpolate(__props.item.damage)}</span></div><div class="flex justify-between"${_scopeId}><span${_scopeId}>Ph\xF2ng ng\u1EF1: ${ssrInterpolate(__props.item.def)}</span></div><div class="flex justify-between"${_scopeId}><span${_scopeId}>Kh\xED huy\u1EBFt: ${ssrInterpolate((_b = __props.item.hp) != null ? _b : 0)}</span></div><div class="flex justify-between"${_scopeId}><span${_scopeId}>B\u1EA1o k\xEDch: ${ssrInterpolate((_c = __props.item.critical) != null ? _c : 0)}%</span></div><div class="flex justify-between"${_scopeId}><span${_scopeId}>H\xFAt m\xE1u: ${ssrInterpolate((_d = __props.item.bloodsucking) != null ? _d : 0)}%</span></div></div></div><div class="flex justify-center mb-2"${_scopeId}>`);
            if (!unref(hasEquip)(__props.item.slot, __props.item._id)) {
              _push2(ssrRenderComponent(_component_ButtonConfirm, { onClick: doEquip }, {
                default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                  if (_push3) {
                    if (unref(loading)) {
                      _push3(`<svg class="inline mr-2 w-3 h-3 text-gray-400 animate-spin dark:text-gray-600 fill-gray-600 dark:fill-gray-300" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg"${_scopeId2}><path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor"${_scopeId2}></path><path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill"${_scopeId2}></path></svg>`);
                    } else {
                      _push3(`<!---->`);
                    }
                    _push3(`<span class="z-9"${_scopeId2}>Trang b\u1ECB</span>`);
                  } else {
                    return [
                      unref(loading) ? (openBlock(), createBlock("svg", {
                        key: 0,
                        class: "inline mr-2 w-3 h-3 text-gray-400 animate-spin dark:text-gray-600 fill-gray-600 dark:fill-gray-300",
                        viewBox: "0 0 100 101",
                        fill: "none",
                        xmlns: "http://www.w3.org/2000/svg"
                      }, [
                        createVNode("path", {
                          d: "M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z",
                          fill: "currentColor"
                        }),
                        createVNode("path", {
                          d: "M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z",
                          fill: "currentFill"
                        })
                      ])) : createCommentVNode("", true),
                      createVNode("span", { class: "z-9" }, "Trang b\u1ECB")
                    ];
                  }
                }),
                _: 1
              }, _parent2, _scopeId));
            } else {
              _push2(ssrRenderComponent(_component_ButtonConfirm, { onClick: doUnEquip }, {
                default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                  if (_push3) {
                    if (unref(loading)) {
                      _push3(`<svg class="inline mr-2 w-3 h-3 text-gray-400 animate-spin dark:text-gray-600 fill-gray-600 dark:fill-gray-300" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg"${_scopeId2}><path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor"${_scopeId2}></path><path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill"${_scopeId2}></path></svg>`);
                    } else {
                      _push3(`<!---->`);
                    }
                    _push3(`<span class="z-9"${_scopeId2}>Th\xE1o trang b\u1ECB</span>`);
                  } else {
                    return [
                      unref(loading) ? (openBlock(), createBlock("svg", {
                        key: 0,
                        class: "inline mr-2 w-3 h-3 text-gray-400 animate-spin dark:text-gray-600 fill-gray-600 dark:fill-gray-300",
                        viewBox: "0 0 100 101",
                        fill: "none",
                        xmlns: "http://www.w3.org/2000/svg"
                      }, [
                        createVNode("path", {
                          d: "M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z",
                          fill: "currentColor"
                        }),
                        createVNode("path", {
                          d: "M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z",
                          fill: "currentFill"
                        })
                      ])) : createCommentVNode("", true),
                      createVNode("span", { class: "z-9" }, "Th\xE1o trang b\u1ECB")
                    ];
                  }
                }),
                _: 1
              }, _parent2, _scopeId));
            }
            _push2(`</div></div></div>`);
          } else {
            return [
              createVNode("div", {
                ref_key: "target",
                ref: target,
                class: "relative text-xs leading-6 text-white bg-[#31384f] p-0 border !border-[#795548] w-[320px]"
              }, [
                createVNode("div", { class: "p-3" }, [
                  createVNode("div", { class: "flex items-center justify-between mb-4" }, [
                    createVNode("div", { class: "flex items-center justify-center" }, [
                      createVNode(_component_ItemRank, {
                        class: "w-15",
                        rank: __props.item.rank,
                        preview: (_e = __props.item) == null ? void 0 : _e.preview
                      }, null, 8, ["rank", "preview"])
                    ]),
                    createVNode("div", { class: "mx-2" }, [
                      createVNode("div", null, toDisplayString(__props.item.name), 1),
                      createVNode("div", null, " V\u1ECB tr\xED: " + toDisplayString(unref(EQUIPMENT_SLOT)[__props.item.slot]), 1),
                      createVNode("div", null, " \u0110\u1EB3ng c\u1EA5p: " + toDisplayString(__props.item.level), 1)
                    ])
                  ]),
                  createVNode("div", { class: "flex items-center justify-start" }, [
                    createVNode("div", { class: "mx-2" }, [
                      createVNode("div", { class: "flex justify-between" }, [
                        createVNode("span", null, " C\xF4ng k\xEDch: " + toDisplayString(__props.item.damage), 1)
                      ]),
                      createVNode("div", { class: "flex justify-between" }, [
                        createVNode("span", null, "Ph\xF2ng ng\u1EF1: " + toDisplayString(__props.item.def), 1)
                      ]),
                      createVNode("div", { class: "flex justify-between" }, [
                        createVNode("span", null, "Kh\xED huy\u1EBFt: " + toDisplayString((_f = __props.item.hp) != null ? _f : 0), 1)
                      ]),
                      createVNode("div", { class: "flex justify-between" }, [
                        createVNode("span", null, "B\u1EA1o k\xEDch: " + toDisplayString((_g = __props.item.critical) != null ? _g : 0) + "%", 1)
                      ]),
                      createVNode("div", { class: "flex justify-between" }, [
                        createVNode("span", null, "H\xFAt m\xE1u: " + toDisplayString((_h = __props.item.bloodsucking) != null ? _h : 0) + "%", 1)
                      ])
                    ])
                  ]),
                  createVNode("div", { class: "flex justify-center mb-2" }, [
                    !unref(hasEquip)(__props.item.slot, __props.item._id) ? (openBlock(), createBlock(_component_ButtonConfirm, {
                      key: 0,
                      onClick: withModifiers(doEquip, ["stop"])
                    }, {
                      default: withCtx(() => [
                        unref(loading) ? (openBlock(), createBlock("svg", {
                          key: 0,
                          class: "inline mr-2 w-3 h-3 text-gray-400 animate-spin dark:text-gray-600 fill-gray-600 dark:fill-gray-300",
                          viewBox: "0 0 100 101",
                          fill: "none",
                          xmlns: "http://www.w3.org/2000/svg"
                        }, [
                          createVNode("path", {
                            d: "M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z",
                            fill: "currentColor"
                          }),
                          createVNode("path", {
                            d: "M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z",
                            fill: "currentFill"
                          })
                        ])) : createCommentVNode("", true),
                        createVNode("span", { class: "z-9" }, "Trang b\u1ECB")
                      ]),
                      _: 1
                    }, 8, ["onClick"])) : (openBlock(), createBlock(_component_ButtonConfirm, {
                      key: 1,
                      onClick: withModifiers(doUnEquip, ["stop"])
                    }, {
                      default: withCtx(() => [
                        unref(loading) ? (openBlock(), createBlock("svg", {
                          key: 0,
                          class: "inline mr-2 w-3 h-3 text-gray-400 animate-spin dark:text-gray-600 fill-gray-600 dark:fill-gray-300",
                          viewBox: "0 0 100 101",
                          fill: "none",
                          xmlns: "http://www.w3.org/2000/svg"
                        }, [
                          createVNode("path", {
                            d: "M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z",
                            fill: "currentColor"
                          }),
                          createVNode("path", {
                            d: "M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z",
                            fill: "currentFill"
                          })
                        ])) : createCommentVNode("", true),
                        createVNode("span", { class: "z-9" }, "Th\xE1o trang b\u1ECB")
                      ]),
                      _: 1
                    }, 8, ["onClick"]))
                  ])
                ])
              ], 512)
            ];
          }
        }),
        _: 1
      }, _parent));
    };
  }
});
const _sfc_setup$3 = _sfc_main$3.setup;
_sfc_main$3.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/Bag/detail.vue");
  return _sfc_setup$3 ? _sfc_setup$3(props, ctx) : void 0;
};
const __nuxt_component_2_lazy = /* @__PURE__ */ defineAsyncComponent(() => Promise.resolve().then(() => ItemRank).then((m) => m.default || m));
const _sfc_main$2 = /* @__PURE__ */ defineComponent({
  __name: "index",
  __ssrInlineRender: true,
  emits: ["close"],
  async setup(__props, { emit: emits }) {
    let __temp, __restore;
    const toggleDetail = ref(false);
    const itemSelected = ref();
    usePlayerStore();
    const { data: bagDataResponse } = ([__temp, __restore] = withAsyncContext(() => useFetch("/api/bag", {
      headers: useRequestHeaders(["cookie"])
    }, "$s5nHmPGJFc")), __temp = await __temp, __restore(), __temp);
    const pickItem = (item) => {
      set(itemSelected, item);
      set(toggleDetail, true);
    };
    return (_ctx, _push, _parent, _attrs) => {
      const _component_BagDetail = _sfc_main$3;
      const _component_NuxtImg = __nuxt_component_0$1;
      const _component_LazyItemRank = __nuxt_component_2_lazy;
      _push(`<!--[-->`);
      ssrRenderTeleport(_push, (_push2) => {
        if (unref(toggleDetail)) {
          _push2(ssrRenderComponent(_component_BagDetail, {
            item: unref(itemSelected),
            onClose: ($event) => toggleDetail.value = false
          }, null, _parent));
        } else {
          _push2(`<!---->`);
        }
      }, "body", false, _parent);
      _push(`<div class="flex items-center justify-center w-full h-[calc(100vh_-_30px)] bg-bg_5 bg-cover fixed top-[28px] w-full h-full z-99"><div class="w-full h-[80%] absolute top-10"><div class="w-full h-full relative"><span class="font-semibold absolute w-[40px] left-[calc(50%_-_10px)] top-[-1px] text-[#656f99]">T\xDAI</span>`);
      _push(ssrRenderComponent(_component_NuxtImg, {
        class: "w-full h-full",
        format: "webp",
        src: "/common/bj_tongyong_1.png"
      }, null, _parent));
      _push(`<div class="absolute top-[30px] flex flex-col gap-1 items-center justify-center w-full"><div class="grid grid-cols-5 gap-2 h-[465px] overflow-scroll"><!--[-->`);
      ssrRenderList(unref(bagDataResponse).equipments, (equipment) => {
        _push(ssrRenderComponent(_component_LazyItemRank, {
          key: equipment.id,
          onClick: ($event) => pickItem(equipment),
          preview: equipment.preview,
          rank: equipment.rank,
          class: "w-15"
        }, {
          default: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(`<p class="text-10 text-[#7c4ea2] font-semibold line-clamp-2"${_scopeId}>${ssrInterpolate(equipment == null ? void 0 : equipment.name)}</p>`);
            } else {
              return [
                createVNode("p", { class: "text-10 text-[#7c4ea2] font-semibold line-clamp-2" }, toDisplayString(equipment == null ? void 0 : equipment.name), 1)
              ];
            }
          }),
          _: 2
        }, _parent));
      });
      _push(`<!--]--></div></div></div></div><div class="absolute bottom-0 w-full h-[65px]"><div class="w-full h-full relative">`);
      _push(ssrRenderComponent(_component_NuxtImg, {
        class: "w-full h-full",
        src: "/common/bg1_common.png"
      }, null, _parent));
      _push(`</div></div><div class="absolute bottom-0 flex justify-end w-full h-[65px]">`);
      _push(ssrRenderComponent(_component_NuxtImg, {
        class: "h-full",
        src: "/bottom/bottom_back.png"
      }, null, _parent));
      _push(`</div></div><!--]-->`);
    };
  }
});
const _sfc_setup$2 = _sfc_main$2.setup;
_sfc_main$2.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/Bag/index.vue");
  return _sfc_setup$2 ? _sfc_setup$2(props, ctx) : void 0;
};
const _sfc_main$1 = /* @__PURE__ */ defineComponent({
  __name: "Bottom",
  __ssrInlineRender: true,
  setup(__props) {
    const { playerInfoComponent } = storeToRefs(useAppStore());
    const { playerInfo } = storeToRefs(usePlayerStore());
    const toggle = reactive({
      bag: false,
      tienDe: false,
      figure: false,
      tienPhap: false,
      ren: false,
      tienLinh: false
    });
    const needTimeResource = ref(0);
    const doReFetch = ref(false);
    watch(doReFetch, async (value) => {
      if (value) {
        const resources = await $fetch("/api/reward/training", {
          headers: useRequestHeaders(["cookie"])
        });
        sendMessage(`+${resources.exp} XP`);
        sendMessage(`+${resources.gold} V\xC0NG`);
        if (playerInfo.value) {
          playerInfo.value.exp += resources.exp;
          playerInfo.value.gold += resources.gold;
        }
      }
    });
    const onToggle = (key) => {
      toggle[key] = true;
    };
    const close = (key) => {
      toggle[key] = false;
    };
    return (_ctx, _push, _parent, _attrs) => {
      const _component_Upgrade = _sfc_main$4;
      const _component_Bag = _sfc_main$2;
      const _component_NuxtImg = __nuxt_component_0$1;
      const _component_NuxtLink = __nuxt_component_0$1$1;
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "h-[calc(100vh_-_230px)] bg-white" }, _attrs))}>`);
      if (unref(toggle).upgrade) {
        _push(ssrRenderComponent(_component_Upgrade, {
          onClose: ($event) => close("upgrade")
        }, null, _parent));
      } else {
        _push(`<!---->`);
      }
      if (unref(toggle).bag) {
        _push(ssrRenderComponent(_component_Bag, {
          onClose: ($event) => close("bag")
        }, null, _parent));
      } else {
        _push(`<!---->`);
      }
      _push(`<div class="flex justify-around w-full absolute top-[10px] pl-1 text-white"><div class="border-none p-0 flex flex-col items-center justify-center w-[50px] mb-3">`);
      _push(ssrRenderComponent(_component_NuxtImg, {
        class: "w-[50px]",
        src: "/index/info.png",
        onClick: ($event) => playerInfoComponent.value = true
      }, null, _parent));
      _push(`<span class="text-black whitespace-nowrap text-12">Nh\xE2n v\u1EADt</span></div><div class="border-none p-0 flex flex-col items-center justify-center w-[50px] mb-3">`);
      _push(ssrRenderComponent(_component_NuxtImg, {
        class: "w-[50px]",
        src: "/index/bag.png",
        onClick: ($event) => onToggle("bag")
      }, null, _parent));
      _push(`<span class="text-black whitespace-nowrap text-12">T\xFAi</span></div><div class="items-center justify-center flex flex-col w-[50px] mb-3">`);
      _push(ssrRenderComponent(_component_NuxtImg, {
        class: "w-[50px]",
        src: "/index/store.png"
      }, null, _parent));
      _push(`<span class="text-black whitespace-nowrap text-12">C\u1EEDa h\xE0ng</span></div>`);
      _push(ssrRenderComponent(_component_NuxtLink, {
        to: "/battle",
        class: "flex flex-col items-center justify-center w-[50px] mb-3",
        onClick: ($event) => onToggle("upgrade")
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(_component_NuxtImg, {
              class: "w-[50px]",
              src: "/index/dungeo.png"
            }, null, _parent2, _scopeId));
            _push2(`<span class="text-black whitespace-nowrap text-12"${_scopeId}>V\u01B0\u1EE3t \u1EA3i</span>`);
          } else {
            return [
              createVNode(_component_NuxtImg, {
                class: "w-[50px]",
                src: "/index/dungeo.png"
              }),
              createVNode("span", { class: "text-black whitespace-nowrap text-12" }, "V\u01B0\u1EE3t \u1EA3i")
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`</div><div class="absolute bottom-0 text-center w-full flex justify-center flex-col items-center text-white"><div class="flex items-center justify-around w-full mb-4"><div class="flex items-center jsutify-center flex-col"><div class="diamond bg-[#4881bf] w-[30px] h-[30px]"></div><span class="whitespace-nowrap text-12 text-black/70 mt-1">C\xF4ng ph\xE1p</span></div><div class="flex items-center jsutify-center flex-col"><div class="diamond bg-[#4881bf] w-[30px] h-[30px]"></div><span class="whitespace-nowrap text-12 text-black/70 mt-1">\u0110\u1EA5u gi\xE1</span></div><div class="flex items-center jsutify-center flex-col"><div class="diamond bg-[#4881bf] w-[30px] h-[30px]"></div><span class="whitespace-nowrap text-12 text-black/70 mt-1">T\xF4ng m\xF4n</span></div><div class="flex items-center jsutify-center flex-col"><div class="diamond bg-[#4881bf] w-[30px] h-[30px]"></div><span class="whitespace-nowrap text-12 text-black/70 mt-1">Ch\u1EE3</span></div><div class="flex items-center jsutify-center flex-col"><div class="diamond bg-[#4881bf] w-[30px] h-[30px]"></div><span class="whitespace-nowrap text-12 text-black/70 mt-1">C\xE0i \u0111\u1EB7t</span></div></div><div class="h-12 w-full flex justify-around items-center bg-[#1d3a62]">`);
      _push(ssrRenderComponent(_component_NuxtImg, {
        class: "w-[45px]",
        src: "/index/avatar-bottom.png"
      }, null, _parent));
      _push(`<div class="w-[60%] bg-gray-200 rounded-full h-1 dark:bg-gray-700"><div class="bg-blue-600 h-1 rounded-full duration-700" style="${ssrRenderStyle({ width: `${unref(needTimeResource)}%` })}"></div></div></div></div></div>`);
    };
  }
});
const _sfc_setup$1 = _sfc_main$1.setup;
_sfc_main$1.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/Page/Bottom.vue");
  return _sfc_setup$1 ? _sfc_setup$1(props, ctx) : void 0;
};
const ObjectId$d = mongoose.Types.ObjectId;
const schema$d = new mongoose.Schema(
  {
    _id: {
      type: String,
      default() {
        return new ObjectId$d().toString();
      }
    },
    sid: { type: String, unique: true },
    name: String,
    knb: Number,
    gold: Number,
    coin: Number,
    power: Number,
    vipLevel: Number,
    level: Number,
    exp: Number,
    midId: Number,
    userId: String,
    lastTimeReceivedRss: Number,
    levelTitle: String,
    floor: String,
    expLimited: Number,
    class: Number,
    ofAttribute: Number,
    ofPower: Number,
    ofAgility: Number,
    ofSkillful: Number,
    ofVitality: Number
  },
  {
    timestamps: true,
    statics: {
      async changeCurrency(params) {
        if (params.kind === "coin")
          return await this.findOneAndUpdate({ sid: params.sid }, { $inc: { coin: params.value } });
        if (params.kind === "gold")
          return await this.findOneAndUpdate({ sid: params.sid }, { $inc: { gold: params.value } });
      }
    }
  }
);
schema$d.index({ sid: -1 }, { unique: true });
mongoose.models && mongoose.models.PlayerSchemas ? mongoose.models.PlayerSchemas : mongoose.model("PlayerSchemas", schema$d, "players");
const ObjectId$c = mongoose.Types.ObjectId;
const schema$c = new mongoose.Schema(
  {
    _id: {
      type: String,
      default() {
        return new ObjectId$c().toString();
      }
    },
    sid: String,
    equipmentId: Number,
    name: String,
    info: String,
    damage: Number,
    speed: Number,
    def: Number,
    hp: Number,
    mp: Number,
    critical: Number,
    bloodsucking: Number,
    rank: Number,
    level: Number,
    slot: Number,
    preview: String
  },
  { timestamps: true }
);
schema$c.index({ sid: -1 });
schema$c.index({ slot: -1 });
schema$c.index({ rank: -1 });
mongoose.models && mongoose.models.PlayerEquipmentSchemas ? mongoose.models.PlayerEquipmentSchemas : mongoose.model("PlayerEquipmentSchemas", schema$c, "player_equipments");
const ObjectId$b = mongoose.Types.ObjectId;
const schema$b = new mongoose.Schema(
  {
    _id: {
      type: String,
      default() {
        return new ObjectId$b().toString();
      }
    },
    id: Number,
    name: String,
    level: Number,
    info: String,
    sex: String,
    damage: Number,
    def: Number,
    hp: Number,
    mp: Number,
    critical: Number,
    bloodsucking: Number,
    speed: Number,
    reward: {},
    class: Number
  },
  { timestamps: true }
);
schema$b.index({ id: -1 }, { unique: true });
mongoose.models && mongoose.models.MonsterSchema ? mongoose.models.MonsterSchema : mongoose.model("MonsterSchema", schema$b, "monsters");
const ObjectId$a = mongoose.Types.ObjectId;
const schema$a = new mongoose.Schema(
  {
    _id: {
      type: String,
      default() {
        return new ObjectId$a().toString();
      }
    },
    id: Number,
    name: String,
    description: String,
    monsterId: Number,
    ms: Number,
    isPvp: String,
    reward: {}
  },
  {
    timestamps: true
  }
);
schema$a.index({ id: -1 }, { unique: true });
mongoose.models && mongoose.models.MidSchema ? mongoose.models.MidSchema : mongoose.model("MidSchema", schema$a, "mids");
const ObjectId$9 = mongoose.Types.ObjectId;
const schema$9 = new mongoose.Schema(
  {
    _id: {
      type: String,
      default() {
        return new ObjectId$9().toString();
      }
    },
    id: Number,
    kind: String,
    name: String,
    level: Number,
    info: String,
    sex: String,
    damage: Number,
    def: Number,
    hp: Number,
    mhp: Number,
    mp: Number,
    critical: Number,
    bloodsucking: Number,
    speed: Number,
    reward: {},
    numberOfTurn: Number,
    class: Number,
    startHours: Number,
    endHours: Number,
    isStart: Boolean
  },
  { timestamps: true }
);
schema$9.index({ id: -1 }, { unique: true });
mongoose.models && mongoose.models.BossSchema ? mongoose.models.BossSchema : mongoose.model("BossSchema", schema$9, "boss");
const ObjectId$8 = mongoose.Types.ObjectId;
const schema$8 = new mongoose.Schema(
  {
    _id: {
      type: String,
      default() {
        return new ObjectId$8().toString();
      }
    },
    sid: String,
    damage: Number,
    def: Number,
    hp: Number,
    mp: Number,
    speed: Number,
    critical: Number,
    criticalDamage: Number,
    bloodsucking: Number,
    slot_1: String,
    slot_2: String,
    slot_3: String,
    slot_4: String,
    slot_5: String,
    slot_6: String,
    slot_7: String,
    slot_8: String
  },
  { timestamps: true }
);
schema$8.index({ sid: -1 }, { unique: true });
mongoose.models && mongoose.models.PlayerAttributeSchema ? mongoose.models.PlayerAttributeSchema : mongoose.model("PlayerAttributeSchema", schema$8, "player_attributes");
const ObjectId$7 = mongoose.Types.ObjectId;
const schema$7 = new mongoose.Schema(
  {
    _id: {
      type: String,
      default() {
        return new ObjectId$7().toString();
      }
    },
    sid: String,
    targetId: Number,
    mid: {},
    kind: String,
    emulators: [],
    enemy: {},
    player: {},
    winner: String,
    reward: {}
  },
  { timestamps: true }
);
schema$7.index({ createdAt: -1 });
mongoose.models && mongoose.models.BattleSchemas ? mongoose.models.BattleSchemas : mongoose.model("BattleSchemas", schema$7, "battles");
const ObjectId$6 = mongoose.Types.ObjectId;
const schema$6 = new mongoose.Schema(
  {
    _id: {
      type: String,
      default() {
        return new ObjectId$6().toString();
      }
    },
    email: String,
    password: String
  },
  { timestamps: true }
);
mongoose.models && mongoose.models.UserSchema ? mongoose.models.UserSchema : mongoose.model("UserSchema", schema$6, "users");
const ObjectId$5 = mongoose.Types.ObjectId;
const schema$5 = new mongoose.Schema(
  {
    _id: {
      type: String,
      default() {
        return new ObjectId$5().toString();
      }
    },
    sid: String,
    slot: Number,
    upgradeLevel: {
      type: Number,
      default: 0
    },
    startLevel: {
      type: Number,
      default: 0
    }
  },
  { timestamps: true }
);
schema$5.index({ sid: -1 });
mongoose.models && mongoose.models.PlayerEquipUpgradeSchema ? mongoose.models.PlayerEquipUpgradeSchema : mongoose.model("PlayerEquipUpgradeSchema", schema$5, "player_equip_upgrade");
const ObjectId$4 = mongoose.Types.ObjectId;
const schema$4 = new mongoose.Schema(
  {
    _id: {
      type: String,
      default() {
        return new ObjectId$4().toString();
      }
    },
    kind: Number,
    name: String,
    info: String
  },
  { timestamps: true }
);
schema$4.index({ createdAt: -1 });
mongoose.models && mongoose.models.ItemSchema ? mongoose.models.ItemSchema : mongoose.model("ItemSchema", schema$4, "items");
const ObjectId$3 = mongoose.Types.ObjectId;
const schema$3 = new mongoose.Schema(
  {
    _id: {
      type: String,
      default() {
        return new ObjectId$3().toString();
      }
    },
    sid: String,
    name: String,
    info: String,
    sum: Number,
    kind: Number
  },
  { timestamps: true }
);
schema$3.index({ sid: -1 });
mongoose.models && mongoose.models.PlayerItemSchemas ? mongoose.models.PlayerItemSchemas : mongoose.model("PlayerItemSchemas", schema$3, "player_items");
const ObjectId$2 = mongoose.Types.ObjectId;
const schema$2 = new mongoose.Schema(
  {
    _id: {
      type: String,
      default() {
        return new ObjectId$2().toString();
      }
    },
    id: Number,
    name: String,
    info: String,
    damage: Number,
    speed: Number,
    def: Number,
    hp: Number,
    mp: Number,
    critical: Number,
    bloodsucking: Number,
    rank: Number,
    level: Number,
    slot: Number,
    preview: String
  },
  { timestamps: true }
);
schema$2.index({ id: -1 }, { unique: true });
schema$2.index({ slot: -1 });
schema$2.index({ level: -1 });
schema$2.index({ rank: -1 });
mongoose.models && mongoose.models.EquipmentSchemas ? mongoose.models.EquipmentSchemas : mongoose.model("EquipmentSchemas", schema$2, "equipments");
const ObjectId$1 = mongoose.Types.ObjectId;
const schema$1 = new mongoose.Schema(
  {
    _id: {
      type: String,
      default() {
        return new ObjectId$1().toString();
      }
    },
    sid: String,
    damage: Number,
    bossId: Number,
    startHours: Number,
    clubId: String,
    name: String
  },
  { timestamps: true }
);
schema$1.index({ sid: -1 });
schema$1.index({ bossId: -1 });
mongoose.models && mongoose.models.BossRankSchema ? mongoose.models.BossRankSchema : mongoose.model("BossRankSchema", schema$1, "gl_boss_rank");
const ObjectId = mongoose.Types.ObjectId;
const schema = new mongoose.Schema(
  {
    _id: {
      type: String,
      default() {
        return new ObjectId().toString();
      }
    },
    name: String,
    info: String,
    kind: String,
    auctionItems: [],
    startTime: Number,
    endTime: Number
  },
  { timestamps: true }
);
mongoose.models && mongoose.models.AuctionSchema ? mongoose.models.AuctionSchema : mongoose.model("AuctionSchema", schema, "gl_auction");
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "index",
  __ssrInlineRender: true,
  setup(__props) {
    storeToRefs(usePlayerStore());
    return (_ctx, _push, _parent, _attrs) => {
      const _component_TheRight = _sfc_main$7;
      const _component_PageSection = __nuxt_component_1;
      const _component_NuxtImg = __nuxt_component_0$1;
      const _component_PageBottom = _sfc_main$1;
      _push(`<!--[-->`);
      _push(ssrRenderComponent(_component_TheRight, null, null, _parent));
      _push(ssrRenderComponent(_component_PageSection, { class: "flex-1 flex items-center relative justify-center z-9" }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<div class="w-full absolute top-0"${_scopeId}><div class="relative"${_scopeId}>`);
            _push2(ssrRenderComponent(_component_NuxtImg, {
              format: "webp",
              src: "/index/bg.png"
            }, null, _parent2, _scopeId));
            _push2(ssrRenderComponent(_component_NuxtImg, {
              class: "absolute bottom-4 left-[calc(50%_-_50px)] w-[100px]",
              format: "webp",
              src: "/pve/nv1.png"
            }, null, _parent2, _scopeId));
            _push2(`</div></div><div class="absolute bottom-0 w-full"${_scopeId}><div class="relative"${_scopeId}>`);
            _push2(ssrRenderComponent(_component_PageBottom, null, null, _parent2, _scopeId));
            _push2(`</div></div>`);
          } else {
            return [
              createVNode("div", { class: "w-full absolute top-0" }, [
                createVNode("div", { class: "relative" }, [
                  createVNode(_component_NuxtImg, {
                    format: "webp",
                    src: "/index/bg.png"
                  }),
                  createVNode(_component_NuxtImg, {
                    class: "absolute bottom-4 left-[calc(50%_-_50px)] w-[100px]",
                    format: "webp",
                    src: "/pve/nv1.png"
                  })
                ])
              ]),
              createVNode("div", { class: "absolute bottom-0 w-full" }, [
                createVNode("div", { class: "relative" }, [
                  createVNode(_component_PageBottom)
                ])
              ])
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`<!--]-->`);
    };
  }
});
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/index.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const index = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: _sfc_main
}, Symbol.toStringTag, { value: "Module" }));

export { ItemRank as I, index as i, sendMessage as s };
//# sourceMappingURL=index.3fe9ef32.mjs.map
