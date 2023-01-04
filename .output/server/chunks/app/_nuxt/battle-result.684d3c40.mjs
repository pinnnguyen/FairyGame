import { _ as __nuxt_component_0 } from './index.1b8116ed.mjs';
import { n as navigateTo$1, c as __nuxt_component_1 } from '../server.mjs';
import { _ as _sfc_main$2 } from './ButtonConfirm.bfbf963d.mjs';
import { defineComponent, ref, computed, mergeProps, withCtx, unref, createVNode, toDisplayString, openBlock, createBlock, Fragment, renderList, createCommentVNode, withModifiers, useSSRContext } from 'vue';
import { ssrRenderComponent, ssrRenderList, ssrInterpolate, ssrRenderAttrs, ssrRenderSlot } from 'vue/server-renderer';
import { c as convertMillisecondsToSeconds } from './index.6af014ab.mjs';
import { W as WINNER } from './useBattleRound.ecd98234.mjs';
import './usePlayer.7d831e1f.mjs';
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
import 'socket.io';
import 'moment';
import 'node:fs';
import 'node:url';
import 'pathe';
import 'ipx';

const ITEMS_ICON = {
  exp: "/items/7.png",
  gold: "/items/3.png"
};
const _sfc_main$1 = {
  __name: "ButtonCancel",
  __ssrInlineRender: true,
  props: {
    className: String
  },
  emits: ["close"],
  setup(__props, { emit: emits }) {
    return (_ctx, _push, _parent, _attrs) => {
      const _component_NuxtImg = __nuxt_component_1;
      _push(`<button${ssrRenderAttrs(mergeProps({
        class: [__props.className, "text-xxs relative p-4 h-[30px] flex items-center justify-center text-[#8d734b]"]
      }, _attrs))}>`);
      _push(ssrRenderComponent(_component_NuxtImg, {
        class: [__props.className, "absolute object-cover rounded"],
        format: "webp",
        src: "/button/btn_xfy_qf_0.png"
      }, null, _parent));
      ssrRenderSlot(_ctx.$slots, "default", {}, null, _push, _parent);
      _push(`</button>`);
    };
  }
};
const _sfc_setup$1 = _sfc_main$1.setup;
_sfc_main$1.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/ButtonCancel.vue");
  return _sfc_setup$1 ? _sfc_setup$1(props, ctx) : void 0;
};
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "battle-result",
  __ssrInlineRender: true,
  props: {
    battleResult: null,
    reward: null
  },
  emits: ["close"],
  setup(__props, { emit: emits }) {
    const props = __props;
    const endTime = ref(6e3);
    const close = () => {
      emits("close");
    };
    const youWin = computed(() => props.battleResult.win === WINNER.youwin);
    if (youWin.value) {
      const time = setInterval(() => {
        endTime.value = endTime.value - 1e3;
        if (endTime.value <= 0) {
          close();
          clearInterval(time);
        }
      }, 1e3);
    }
    return (_ctx, _push, _parent, _attrs) => {
      const _component_Blocker = __nuxt_component_0;
      const _component_NuxtImg = __nuxt_component_1;
      const _component_ButtonConfirm = _sfc_main$2;
      const _component_ButtonCancel = _sfc_main$1;
      _push(ssrRenderComponent(_component_Blocker, mergeProps({ class: "duration-500 transition-colors transition-opacity z-9" }, _attrs), {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<div class="flex flex-col items-center"${_scopeId}>`);
            _push2(ssrRenderComponent(_component_NuxtImg, {
              class: "w-[300px]",
              format: "webp",
              src: __props.battleResult.win === unref(WINNER).youwin ? "/battle/win.png" : "/battle/lose.png"
            }, null, _parent2, _scopeId));
            _push2(`<div class="w-[250px] h-[250px] border border-[#6d6c6c] bg-black rounded-md"${_scopeId}>`);
            if (unref(youWin)) {
              _push2(`<ul class="h-full w-full p-1"${_scopeId}><!--[-->`);
              ssrRenderList(__props.reward.base, (value, key) => {
                _push2(`<li class="float-left w-[calc(23%_-_8px)] h-[48px] ml-2 m-1 bg-iconbg_3 bg-cover"${_scopeId}><div class="relative"${_scopeId}>`);
                _push2(ssrRenderComponent(_component_NuxtImg, {
                  src: unref(ITEMS_ICON)[key],
                  format: "webp"
                }, null, _parent2, _scopeId));
                _push2(`<div class="absolute bottom-0 right-0 text-xs text-white pr-1 w-full text-right"${_scopeId}><div class=""${_scopeId}>${ssrInterpolate(value)}</div></div></div></li>`);
              });
              _push2(`<!--]--><!--[-->`);
              ssrRenderList(__props.reward.equipments, (value, key) => {
                _push2(`<li class="float-left w-[calc(23%_-_8px)] h-[48px] ml-2 m-1 bg-iconbg_3 bg-cover"${_scopeId}><div class="relative"${_scopeId}>`);
                if (value.preview) {
                  _push2(ssrRenderComponent(_component_NuxtImg, {
                    src: value.preview,
                    format: "webp"
                  }, null, _parent2, _scopeId));
                } else {
                  _push2(`<!---->`);
                }
                _push2(`<div class="absolute bottom-0 right-0 text-xs text-white pr-1 w-full text-right"${_scopeId}></div></div></li>`);
              });
              _push2(`<!--]--></ul>`);
            } else {
              _push2(`<!---->`);
            }
            _push2(`</div>`);
            if (unref(youWin)) {
              _push2(`<div${_scopeId}>`);
              _push2(ssrRenderComponent(_component_ButtonConfirm, {
                "class-name": "h-[30px]",
                class: "m-2",
                onClose: close
              }, {
                default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                  if (_push3) {
                    _push3(`<span class="font-semibold z-9"${_scopeId2}>Nh\u1EADn th\u01B0\u1EDFng (${ssrInterpolate(unref(convertMillisecondsToSeconds)(unref(endTime)))})</span>`);
                  } else {
                    return [
                      createVNode("span", { class: "font-semibold z-9" }, "Nh\u1EADn th\u01B0\u1EDFng (" + toDisplayString(unref(convertMillisecondsToSeconds)(unref(endTime))) + ")", 1)
                    ];
                  }
                }),
                _: 1
              }, _parent2, _scopeId));
              _push2(`</div>`);
            } else {
              _push2(`<div class="flex"${_scopeId}>`);
              _push2(ssrRenderComponent(_component_ButtonCancel, {
                "class-name": "h-[30px]",
                class: "m-2",
                onClose: close,
                onClick: ($event) => unref(navigateTo$1)("/")
              }, {
                default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                  if (_push3) {
                    _push3(`<span class="font-semibold z-9"${_scopeId2}>Quay v\u1EC1</span>`);
                  } else {
                    return [
                      createVNode("span", { class: "font-semibold z-9" }, "Quay v\u1EC1")
                    ];
                  }
                }),
                _: 1
              }, _parent2, _scopeId));
              _push2(ssrRenderComponent(_component_ButtonConfirm, {
                "class-name": "h-[30px]",
                class: "m-2",
                onClose: close
              }, {
                default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                  if (_push3) {
                    _push3(`<span class="font-semibold z-9"${_scopeId2}>Th\u1EED l\u1EA1i</span>`);
                  } else {
                    return [
                      createVNode("span", { class: "font-semibold z-9" }, "Th\u1EED l\u1EA1i")
                    ];
                  }
                }),
                _: 1
              }, _parent2, _scopeId));
              _push2(`</div>`);
            }
            _push2(`</div>`);
          } else {
            return [
              createVNode("div", { class: "flex flex-col items-center" }, [
                createVNode(_component_NuxtImg, {
                  class: "w-[300px]",
                  format: "webp",
                  src: __props.battleResult.win === unref(WINNER).youwin ? "/battle/win.png" : "/battle/lose.png"
                }, null, 8, ["src"]),
                createVNode("div", { class: "w-[250px] h-[250px] border border-[#6d6c6c] bg-black rounded-md" }, [
                  unref(youWin) ? (openBlock(), createBlock("ul", {
                    key: 0,
                    class: "h-full w-full p-1"
                  }, [
                    (openBlock(true), createBlock(Fragment, null, renderList(__props.reward.base, (value, key) => {
                      return openBlock(), createBlock("li", {
                        key,
                        class: "float-left w-[calc(23%_-_8px)] h-[48px] ml-2 m-1 bg-iconbg_3 bg-cover"
                      }, [
                        createVNode("div", { class: "relative" }, [
                          createVNode(_component_NuxtImg, {
                            src: unref(ITEMS_ICON)[key],
                            format: "webp"
                          }, null, 8, ["src"]),
                          createVNode("div", { class: "absolute bottom-0 right-0 text-xs text-white pr-1 w-full text-right" }, [
                            createVNode("div", { class: "" }, toDisplayString(value), 1)
                          ])
                        ])
                      ]);
                    }), 128)),
                    (openBlock(true), createBlock(Fragment, null, renderList(__props.reward.equipments, (value, key) => {
                      return openBlock(), createBlock("li", {
                        key,
                        class: "float-left w-[calc(23%_-_8px)] h-[48px] ml-2 m-1 bg-iconbg_3 bg-cover"
                      }, [
                        createVNode("div", { class: "relative" }, [
                          value.preview ? (openBlock(), createBlock(_component_NuxtImg, {
                            key: 0,
                            src: value.preview,
                            format: "webp"
                          }, null, 8, ["src"])) : createCommentVNode("", true),
                          createVNode("div", { class: "absolute bottom-0 right-0 text-xs text-white pr-1 w-full text-right" })
                        ])
                      ]);
                    }), 128))
                  ])) : createCommentVNode("", true)
                ]),
                unref(youWin) ? (openBlock(), createBlock("div", { key: 0 }, [
                  createVNode(_component_ButtonConfirm, {
                    "class-name": "h-[30px]",
                    class: "m-2",
                    onClose: close
                  }, {
                    default: withCtx(() => [
                      createVNode("span", { class: "font-semibold z-9" }, "Nh\u1EADn th\u01B0\u1EDFng (" + toDisplayString(unref(convertMillisecondsToSeconds)(unref(endTime))) + ")", 1)
                    ]),
                    _: 1
                  })
                ])) : (openBlock(), createBlock("div", {
                  key: 1,
                  class: "flex"
                }, [
                  createVNode(_component_ButtonCancel, {
                    "class-name": "h-[30px]",
                    class: "m-2",
                    onClose: close,
                    onClick: withModifiers(($event) => unref(navigateTo$1)("/"), ["stop"])
                  }, {
                    default: withCtx(() => [
                      createVNode("span", { class: "font-semibold z-9" }, "Quay v\u1EC1")
                    ]),
                    _: 1
                  }, 8, ["onClick"]),
                  createVNode(_component_ButtonConfirm, {
                    "class-name": "h-[30px]",
                    class: "m-2",
                    onClose: close
                  }, {
                    default: withCtx(() => [
                      createVNode("span", { class: "font-semibold z-9" }, "Th\u1EED l\u1EA1i")
                    ]),
                    _: 1
                  })
                ]))
              ])
            ];
          }
        }),
        _: 1
      }, _parent));
    };
  }
});
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/Popup/battle-result.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};

export { _sfc_main as default };
//# sourceMappingURL=battle-result.684d3c40.mjs.map
