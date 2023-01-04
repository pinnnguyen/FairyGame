import { _ as __nuxt_component_0 } from './index.6af014ab.mjs';
import { useSSRContext, defineComponent, computed, ref, onUnmounted, withCtx, unref, openBlock, createBlock, createCommentVNode, createVNode, toDisplayString, mergeProps, defineAsyncComponent } from 'vue';
import { s as storeToRefs, d as useRoute, n as navigateTo$1, e as __nuxt_component_2, c as __nuxt_component_1 } from '../server.mjs';
import { o as onClickOutside, _ as __nuxt_component_0$1 } from './index.1b8116ed.mjs';
import { ssrRenderComponent, ssrInterpolate, ssrRenderAttrs, ssrRenderStyle, ssrRenderClass, ssrRenderList } from 'vue/server-renderer';
import { u as useBattleRoundStore, B as BATTLE_TURN } from './useBattleRound.ecd98234.mjs';
import { u as usePlayerStore } from './usePlayer.7d831e1f.mjs';
import { u as useSocket } from './useSocket.fbc3bedd.mjs';
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
import 'socket.io-client';

const _sfc_main$5 = /* @__PURE__ */ defineComponent({
  __name: "info",
  __ssrInlineRender: true,
  props: {
    name: null,
    hp: null,
    damage: null,
    def: null
  },
  emits: ["close"],
  setup(__props, { emit: emits }) {
    const target = ref(null);
    onClickOutside(target, () => emits("close"));
    return (_ctx, _push, _parent, _attrs) => {
      const _component_Blocker = __nuxt_component_0$1;
      _push(ssrRenderComponent(_component_Blocker, _attrs, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<div class="flex justify-start flex-col mt-2 text-10"${_scopeId}><div class="text-white bg-[#3f51b5] p-4"${_scopeId}><span class="pb-[2px] font-medium"${_scopeId}>${ssrInterpolate(__props.name)}</span><p${_scopeId}> Sinh l\u1EF1c: ${ssrInterpolate(__props.hp)}</p><p${_scopeId}> C\xF4ng k\xEDch ${ssrInterpolate(__props.damage)}</p><p${_scopeId}> Ph\xF2ng ng\u1EF1 ${ssrInterpolate(__props.def)}</p></div></div>`);
          } else {
            return [
              createVNode("div", {
                ref_key: "target",
                ref: target,
                class: "flex justify-start flex-col mt-2 text-10"
              }, [
                createVNode("div", { class: "text-white bg-[#3f51b5] p-4" }, [
                  createVNode("span", { class: "pb-[2px] font-medium" }, toDisplayString(__props.name), 1),
                  createVNode("p", null, " Sinh l\u1EF1c: " + toDisplayString(__props.hp), 1),
                  createVNode("p", null, " C\xF4ng k\xEDch " + toDisplayString(__props.damage), 1),
                  createVNode("p", null, " Ph\xF2ng ng\u1EF1 " + toDisplayString(__props.def), 1)
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
const _sfc_setup$5 = _sfc_main$5.setup;
_sfc_main$5.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/Battle/info.vue");
  return _sfc_setup$5 ? _sfc_setup$5(props, ctx) : void 0;
};
const _sfc_main$4 = /* @__PURE__ */ defineComponent({
  __name: "status-bar",
  __ssrInlineRender: true,
  props: {
    receiverHp: null,
    hp: null,
    mp: null,
    receiverMp: null
  },
  setup(__props) {
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "mt-2" }, _attrs))}><div class="flex items-center justify-start"><div class="h-[5px] w-15 rounded-full bg-[#212121] flex items-center p-[2px]"><div class="h-[2px] w-full rounded-full bg-red-600" style="${ssrRenderStyle({
        width: `${__props.receiverHp / __props.hp * 100}%`
      })}"></div></div></div><div class="flex items-center justify-start mt-[1px]"><div class="h-[5px] w-15 rounded-full bg-[#212121] flex items-center p-[2px]"><div class="h-[2px] w-full rounded-full bg-blue-600" style="${ssrRenderStyle({
        width: `${__props.receiverMp / __props.mp * 100}%`
      })}"></div></div></div></div>`);
    };
  }
});
const _sfc_setup$4 = _sfc_main$4.setup;
_sfc_main$4.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/Battle/status-bar.vue");
  return _sfc_setup$4 ? _sfc_setup$4(props, ctx) : void 0;
};
const _sfc_main$3 = /* @__PURE__ */ defineComponent({
  __name: "player-realtime",
  __ssrInlineRender: true,
  props: {
    playerEffect: null,
    realTime: null,
    state: null,
    receiver: null
  },
  setup(__props) {
    return (_ctx, _push, _parent, _attrs) => {
      var _a, _b, _c, _d, _e, _f, _g, _h, _i, _j, _k, _l;
      const _component_NuxtImg = __nuxt_component_1;
      const _component_BattleStatusBar = _sfc_main$4;
      _push(`<div${ssrRenderAttrs(mergeProps({
        class: "relative duration-800 transition-transform flex flex-col items-center justify-center",
        style: {
          transform: __props.playerEffect === unref(BATTLE_TURN).PLAYER ? "translate(30%)" : ""
        }
      }, _attrs))}><span class="${ssrRenderClass([{ show: ((_a = __props.realTime.enemy) == null ? void 0 : _a.bloodsucking) > 0 && __props.realTime.enemy.trueDamage }, "text-[#22ae28] font-semibold battle-damage whitespace-nowrap"])}"> H\xFAt (+${ssrInterpolate((_b = __props.realTime.enemy) == null ? void 0 : _b.bloodsucking)}) </span><span class="${ssrRenderClass([{ show: __props.realTime.player.trueDamage }, "duration-800 text-xl font-semibold text-red-500 battle-damage"])}">`);
      if ((_d = (_c = __props.realTime) == null ? void 0 : _c.player) == null ? void 0 : _d.critical) {
        _push(`<span class="whitespace-nowrap font-bold"> Ch\xED m\u1EA1ng -${ssrInterpolate(__props.realTime.player.dmg)}</span>`);
      } else {
        _push(`<span>-${ssrInterpolate(__props.realTime.player.dmg)}</span>`);
      }
      _push(`</span>`);
      _push(ssrRenderComponent(_component_NuxtImg, {
        format: "webp",
        class: "h-[100px]",
        src: "/pve/nv1.png"
      }, null, _parent));
      _push(ssrRenderComponent(_component_BattleStatusBar, {
        "receiver-hp": (_f = (_e = __props.receiver) == null ? void 0 : _e.player) == null ? void 0 : _f.hp,
        hp: (_h = (_g = __props.state) == null ? void 0 : _g.player) == null ? void 0 : _h.hp,
        "receiver-mp": (_j = (_i = __props.receiver) == null ? void 0 : _i.player) == null ? void 0 : _j.mp,
        mp: (_l = (_k = __props.state) == null ? void 0 : _k.player) == null ? void 0 : _l.mp
      }, null, _parent));
      _push(`</div>`);
    };
  }
});
const _sfc_setup$3 = _sfc_main$3.setup;
_sfc_main$3.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/Battle/player-realtime.vue");
  return _sfc_setup$3 ? _sfc_setup$3(props, ctx) : void 0;
};
const _sfc_main$2 = /* @__PURE__ */ defineComponent({
  __name: "enemy-realtime",
  __ssrInlineRender: true,
  props: {
    playerEffect: null,
    realTime: null,
    state: null,
    receiver: null
  },
  setup(__props) {
    return (_ctx, _push, _parent, _attrs) => {
      var _a, _b, _c, _d, _e, _f, _g, _h, _i, _j, _k, _l;
      const _component_NuxtImg = __nuxt_component_1;
      const _component_BattleStatusBar = _sfc_main$4;
      _push(`<div${ssrRenderAttrs(mergeProps({
        class: "relative duration-800 transition-transform flex flex-col items-center justify-center",
        style: {
          transform: __props.playerEffect === unref(BATTLE_TURN).ENEMY ? "translate(-30%)" : ""
        }
      }, _attrs))}><span class="${ssrRenderClass([{ show: ((_a = __props.realTime.player) == null ? void 0 : _a.bloodsucking) > 0 && __props.realTime.enemy.trueDamage }, "text-[#22ae28] font-semibold battle-damage whitespace-nowrap"])}"> H\xFAt (+${ssrInterpolate((_b = __props.realTime.player) == null ? void 0 : _b.bloodsucking)}) </span><span class="${ssrRenderClass([{ show: __props.realTime.enemy.trueDamage }, "text-xl duration-800 font-semibold text-red-500 battle-damage"])}">`);
      if ((_d = (_c = __props.realTime) == null ? void 0 : _c.enemy) == null ? void 0 : _d.critical) {
        _push(`<span class="whitespace-nowrap font-bold"> Ch\xED m\u1EA1ng -${ssrInterpolate(__props.realTime.enemy.dmg)}</span>`);
      } else {
        _push(`<span>-${ssrInterpolate(__props.realTime.enemy.dmg)}</span>`);
      }
      _push(`</span>`);
      _push(ssrRenderComponent(_component_NuxtImg, {
        format: "webp",
        class: "h-[100px]",
        src: "/pve/nv2.png"
      }, null, _parent));
      _push(ssrRenderComponent(_component_BattleStatusBar, {
        "receiver-hp": (_f = (_e = __props.receiver) == null ? void 0 : _e.enemy) == null ? void 0 : _f.hp,
        hp: (_h = (_g = __props.state) == null ? void 0 : _g.enemy) == null ? void 0 : _h.hp,
        "receiver-mp": (_j = (_i = __props.receiver) == null ? void 0 : _i.enemy) == null ? void 0 : _j.mp,
        mp: (_l = (_k = __props.state) == null ? void 0 : _k.enemy) == null ? void 0 : _l.mp
      }, null, _parent));
      _push(`</div>`);
    };
  }
});
const _sfc_setup$2 = _sfc_main$2.setup;
_sfc_main$2.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/Battle/enemy-realtime.vue");
  return _sfc_setup$2 ? _sfc_setup$2(props, ctx) : void 0;
};
const _sfc_main$1 = /* @__PURE__ */ defineComponent({
  __name: "history",
  __ssrInlineRender: true,
  props: {
    battleRounds: null
  },
  setup(__props) {
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<!--[-->`);
      ssrRenderList(__props.battleRounds, (round, index) => {
        _push(`<div class="mb-2 border-b border-gray-300 duration-500"><h3 class="text-10"> [L\u01B0\u1EE3t ${ssrInterpolate(round.roundNum)}] </h3><strong>${ssrInterpolate(round.turn === unref(BATTLE_TURN).PLAYER ? "B\u1EA1n" : "Muc Ti\xEAu")}</strong> g\xE2y <strong class="text-red-600">${ssrInterpolate(round.damage)}</strong> s\xE1t th\u01B0\u01A1ng l\xEAn <strong>${ssrInterpolate(round.turn === unref(BATTLE_TURN).PLAYER ? "M\u1EE5c ti\xEAu" : "B\u1EA1n")}</strong></div>`);
      });
      _push(`<!--]-->`);
    };
  }
});
const _sfc_setup$1 = _sfc_main$1.setup;
_sfc_main$1.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/Battle/history.vue");
  return _sfc_setup$1 ? _sfc_setup$1(props, ctx) : void 0;
};
const __nuxt_component_1_lazy = /* @__PURE__ */ defineAsyncComponent(() => import('./battle-result.684d3c40.mjs').then((m) => m.default || m));
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "[boss]",
  __ssrInlineRender: true,
  setup(__props) {
    const {
      loading,
      state,
      receiver,
      playerEffect,
      realTime,
      battleRounds,
      battleResult,
      reward
    } = storeToRefs(useBattleRoundStore());
    const { playerInfo } = storeToRefs(usePlayerStore());
    const { _socket } = useSocket();
    const route = useRoute();
    useBattleRoundStore();
    const hasBossDaily = computed(() => route.query.target === "boss-daily");
    computed(() => route.query.target);
    computed(() => route.query.id);
    const showPlayerInfo = ref(false);
    const showEnemyInfo = ref(false);
    onUnmounted(() => {
      console.log("battle:leave");
      _socket.emit("battle:leave");
    });
    const doCloseBattleR = () => {
      battleResult.value.show = false;
      return navigateTo$1("/");
    };
    return (_ctx, _push, _parent, _attrs) => {
      const _component_ClientOnly = __nuxt_component_0;
      const _component_LazyPopupBattleResult = __nuxt_component_1_lazy;
      const _component_loadingScreen = __nuxt_component_2;
      const _component_NuxtImg = __nuxt_component_1;
      const _component_BattleInfo = _sfc_main$5;
      const _component_BattlePlayerRealtime = _sfc_main$3;
      const _component_BattleEnemyRealtime = _sfc_main$2;
      const _component_BattleHistory = _sfc_main$1;
      _push(ssrRenderComponent(_component_ClientOnly, _attrs, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          var _a, _b, _c, _d, _e, _f, _g, _h, _i, _j, _k, _l, _m, _n;
          if (_push2) {
            if (unref(battleResult).show) {
              _push2(ssrRenderComponent(_component_LazyPopupBattleResult, {
                "battle-result": unref(battleResult),
                reward: unref(reward),
                onClose: doCloseBattleR
              }, null, _parent2, _scopeId));
            } else {
              _push2(`<!---->`);
            }
            if (unref(loading)) {
              _push2(ssrRenderComponent(_component_loadingScreen, null, null, _parent2, _scopeId));
            } else {
              _push2(`<div class="h-screen bg-white"${_scopeId}><div class="h-[60%] bg-bg_pve bg-cover"${_scopeId}>`);
              if (!unref(hasBossDaily)) {
                _push2(`<div class="text-center pt-2 text-base font-semibold flex items-center justify-center"${_scopeId}> [${ssrInterpolate((_c = (_b = (_a = unref(playerInfo)) == null ? void 0 : _a.mid) == null ? void 0 : _b.current) == null ? void 0 : _c.name)}] </div>`);
              } else {
                _push2(`<!---->`);
              }
              _push2(`<div class="flex justify-between p-2 pt-2"${_scopeId}><div${_scopeId}><div class="flex items-center justify-start"${_scopeId}><div class="flex items-center"${_scopeId}>`);
              _push2(ssrRenderComponent(_component_NuxtImg, {
                format: "webp",
                class: "h-[35px] border border-[#d0d0d0] bg-[#d0d0d0] rounded-full",
                src: "/pve/player-avatar.png"
              }, null, _parent2, _scopeId));
              _push2(`</div></div>`);
              if (unref(showPlayerInfo)) {
                _push2(ssrRenderComponent(_component_BattleInfo, {
                  name: unref(state).player.name,
                  hp: unref(state).player.hp,
                  damage: unref(state).player.damage,
                  def: unref(state).player.def,
                  onClose: ($event) => showPlayerInfo.value = false
                }, null, _parent2, _scopeId));
              } else {
                _push2(`<!---->`);
              }
              _push2(`</div><div${_scopeId}><div class="flex items-center justify-end"${_scopeId}><div class="flex justify-end"${_scopeId}>`);
              _push2(ssrRenderComponent(_component_NuxtImg, {
                format: "webp",
                class: "h-[35px] border border-[#d0d0d0] bg-[#d0d0d0] rounded-full",
                src: "/pve/monter-avatar.png"
              }, null, _parent2, _scopeId));
              _push2(`</div></div>`);
              if (unref(showEnemyInfo)) {
                _push2(ssrRenderComponent(_component_BattleInfo, {
                  name: (_d = unref(state).enemy) == null ? void 0 : _d.name,
                  hp: (_e = unref(state).enemy) == null ? void 0 : _e.hp,
                  damage: (_f = unref(state).enemy) == null ? void 0 : _f.damage,
                  def: (_g = unref(state).enemy) == null ? void 0 : _g.def,
                  onClose: ($event) => showEnemyInfo.value = false
                }, null, _parent2, _scopeId));
              } else {
                _push2(`<!---->`);
              }
              _push2(`</div></div><div class="flex justify-around mt-8"${_scopeId}>`);
              _push2(ssrRenderComponent(_component_BattlePlayerRealtime, {
                "player-effect": unref(playerEffect),
                state: unref(state),
                receiver: unref(receiver),
                "real-time": unref(realTime)
              }, null, _parent2, _scopeId));
              _push2(ssrRenderComponent(_component_BattleEnemyRealtime, {
                "player-effect": unref(playerEffect),
                state: unref(state),
                receiver: unref(receiver),
                "real-time": unref(realTime)
              }, null, _parent2, _scopeId));
              _push2(`</div></div><div class="p-4 h-[25%] overflow-scroll"${_scopeId}>`);
              _push2(ssrRenderComponent(_component_BattleHistory, { "battle-rounds": unref(battleRounds) }, null, _parent2, _scopeId));
              _push2(`</div></div>`);
            }
          } else {
            return [
              unref(battleResult).show ? (openBlock(), createBlock(_component_LazyPopupBattleResult, {
                key: 0,
                "battle-result": unref(battleResult),
                reward: unref(reward),
                onClose: doCloseBattleR
              }, null, 8, ["battle-result", "reward"])) : createCommentVNode("", true),
              unref(loading) ? (openBlock(), createBlock(_component_loadingScreen, { key: 1 })) : (openBlock(), createBlock("div", {
                key: 2,
                class: "h-screen bg-white"
              }, [
                createVNode("div", { class: "h-[60%] bg-bg_pve bg-cover" }, [
                  !unref(hasBossDaily) ? (openBlock(), createBlock("div", {
                    key: 0,
                    class: "text-center pt-2 text-base font-semibold flex items-center justify-center"
                  }, " [" + toDisplayString((_j = (_i = (_h = unref(playerInfo)) == null ? void 0 : _h.mid) == null ? void 0 : _i.current) == null ? void 0 : _j.name) + "] ", 1)) : createCommentVNode("", true),
                  createVNode("div", { class: "flex justify-between p-2 pt-2" }, [
                    createVNode("div", null, [
                      createVNode("div", { class: "flex items-center justify-start" }, [
                        createVNode("div", {
                          class: "flex items-center",
                          onClick: ($event) => showPlayerInfo.value = !unref(showPlayerInfo)
                        }, [
                          createVNode(_component_NuxtImg, {
                            format: "webp",
                            class: "h-[35px] border border-[#d0d0d0] bg-[#d0d0d0] rounded-full",
                            src: "/pve/player-avatar.png"
                          })
                        ], 8, ["onClick"])
                      ]),
                      unref(showPlayerInfo) ? (openBlock(), createBlock(_component_BattleInfo, {
                        key: 0,
                        name: unref(state).player.name,
                        hp: unref(state).player.hp,
                        damage: unref(state).player.damage,
                        def: unref(state).player.def,
                        onClose: ($event) => showPlayerInfo.value = false
                      }, null, 8, ["name", "hp", "damage", "def", "onClose"])) : createCommentVNode("", true)
                    ]),
                    createVNode("div", null, [
                      createVNode("div", { class: "flex items-center justify-end" }, [
                        createVNode("div", {
                          class: "flex justify-end",
                          onClick: ($event) => showEnemyInfo.value = !unref(showEnemyInfo)
                        }, [
                          createVNode(_component_NuxtImg, {
                            format: "webp",
                            class: "h-[35px] border border-[#d0d0d0] bg-[#d0d0d0] rounded-full",
                            src: "/pve/monter-avatar.png"
                          })
                        ], 8, ["onClick"])
                      ]),
                      unref(showEnemyInfo) ? (openBlock(), createBlock(_component_BattleInfo, {
                        key: 0,
                        name: (_k = unref(state).enemy) == null ? void 0 : _k.name,
                        hp: (_l = unref(state).enemy) == null ? void 0 : _l.hp,
                        damage: (_m = unref(state).enemy) == null ? void 0 : _m.damage,
                        def: (_n = unref(state).enemy) == null ? void 0 : _n.def,
                        onClose: ($event) => showEnemyInfo.value = false
                      }, null, 8, ["name", "hp", "damage", "def", "onClose"])) : createCommentVNode("", true)
                    ])
                  ]),
                  createVNode("div", { class: "flex justify-around mt-8" }, [
                    createVNode(_component_BattlePlayerRealtime, {
                      "player-effect": unref(playerEffect),
                      state: unref(state),
                      receiver: unref(receiver),
                      "real-time": unref(realTime)
                    }, null, 8, ["player-effect", "state", "receiver", "real-time"]),
                    createVNode(_component_BattleEnemyRealtime, {
                      "player-effect": unref(playerEffect),
                      state: unref(state),
                      receiver: unref(receiver),
                      "real-time": unref(realTime)
                    }, null, 8, ["player-effect", "state", "receiver", "real-time"])
                  ])
                ]),
                createVNode("div", { class: "p-4 h-[25%] overflow-scroll" }, [
                  createVNode(_component_BattleHistory, { "battle-rounds": unref(battleRounds) }, null, 8, ["battle-rounds"])
                ])
              ]))
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
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/battle/[boss].vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};

export { _sfc_main as default };
//# sourceMappingURL=_boss_.bc476887.mjs.map
