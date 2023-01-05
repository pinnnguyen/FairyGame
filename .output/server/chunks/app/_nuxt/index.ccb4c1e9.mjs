import { _ as __nuxt_component_0$2 } from './index.2feaf918.mjs';
import { useSSRContext, mergeProps, defineComponent, ref, withCtx, createVNode, toDisplayString, unref, openBlock, createBlock, createCommentVNode, withModifiers, defineAsyncComponent } from 'vue';
import { f as __nuxt_component_0$1, s as storeToRefs, n as navigateTo$1, g as __nuxt_component_2 } from '../server.mjs';
import { o as onClickOutside, _ as __nuxt_component_0, a as _sfc_main$7, s as sendMessage } from './useMessage.ea1a408e.mjs';
import { ssrRenderAttrs, ssrRenderComponent, ssrRenderSlot, ssrInterpolate, ssrRenderStyle, ssrRenderClass, ssrRenderList } from 'vue/server-renderer';
import { B as BATTLE_TURN, u as useBattleRoundStore } from './useBattleRound.ec9cc598.mjs';
import { u as usePlayerStore } from './usePlayer.51d49ed6.mjs';
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
import 'node-cron';
import 'socket.io';
import 'moment';
import 'node:fs';
import 'node:url';
import 'pathe';
import 'ipx';
import 'vexip-ui';
import 'socket.io-client';

const _sfc_main$6 = /* @__PURE__ */ defineComponent({
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
      const _component_Blocker = __nuxt_component_0;
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
const _sfc_setup$6 = _sfc_main$6.setup;
_sfc_main$6.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/Battle/info.vue");
  return _sfc_setup$6 ? _sfc_setup$6(props, ctx) : void 0;
};
const _sfc_main$5 = /* @__PURE__ */ defineComponent({
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
const _sfc_setup$5 = _sfc_main$5.setup;
_sfc_main$5.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/Battle/status-bar.vue");
  return _sfc_setup$5 ? _sfc_setup$5(props, ctx) : void 0;
};
const _sfc_main$4 = /* @__PURE__ */ defineComponent({
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
      const _component_NuxtImg = __nuxt_component_0$1;
      const _component_BattleStatusBar = _sfc_main$5;
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
const _sfc_setup$4 = _sfc_main$4.setup;
_sfc_main$4.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/Battle/player-realtime.vue");
  return _sfc_setup$4 ? _sfc_setup$4(props, ctx) : void 0;
};
const _sfc_main$3 = /* @__PURE__ */ defineComponent({
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
      const _component_NuxtImg = __nuxt_component_0$1;
      const _component_BattleStatusBar = _sfc_main$5;
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
const _sfc_setup$3 = _sfc_main$3.setup;
_sfc_main$3.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/Battle/enemy-realtime.vue");
  return _sfc_setup$3 ? _sfc_setup$3(props, ctx) : void 0;
};
const _sfc_main$2 = /* @__PURE__ */ defineComponent({
  __name: "history",
  __ssrInlineRender: true,
  props: {
    battleRounds: null
  },
  setup(__props) {
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<!--[-->`);
      ssrRenderList(__props.battleRounds, (round, index2) => {
        _push(`<div class="mb-2 border-b border-gray-300 duration-500"><h3 class="text-10"> [L\u01B0\u1EE3t ${ssrInterpolate(round.roundNum)}] </h3><strong>${ssrInterpolate(round.turn === unref(BATTLE_TURN).PLAYER ? "B\u1EA1n" : "Muc Ti\xEAu")}</strong> g\xE2y <strong class="text-red-600">${ssrInterpolate(round.damage)}</strong> s\xE1t th\u01B0\u01A1ng l\xEAn <strong>${ssrInterpolate(round.turn === unref(BATTLE_TURN).PLAYER ? "M\u1EE5c ti\xEAu" : "B\u1EA1n")}</strong></div>`);
      });
      _push(`<!--]-->`);
    };
  }
});
const _sfc_setup$2 = _sfc_main$2.setup;
_sfc_main$2.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/Battle/history.vue");
  return _sfc_setup$2 ? _sfc_setup$2(props, ctx) : void 0;
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
      const _component_NuxtImg = __nuxt_component_0$1;
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
const __nuxt_component_1_lazy = /* @__PURE__ */ defineAsyncComponent(() => import('./battle-result.5f3bb364.mjs').then((m) => m.default || m));
const __nuxt_component_8_lazy = /* @__PURE__ */ defineAsyncComponent(() => import('./refresh-mid.a0884c71.mjs').then((m) => m.default || m));
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "index",
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
      inRefresh,
      refreshTime,
      reward
    } = storeToRefs(useBattleRoundStore());
    useBattleRoundStore();
    const { playerInfo } = storeToRefs(usePlayerStore());
    const { loadPlayer } = usePlayerStore();
    const { _socket } = useSocket();
    const showPlayerInfo = ref(false);
    const showEnemyInfo = ref(false);
    const refreshFinished = () => {
      _socket.emit("battle:refresh");
    };
    const nextMid = async () => {
      try {
        loading.value = true;
        const player = await $fetch("/api/mid/set", {
          method: "POST"
        });
        loadPlayer(player);
        loading.value = false;
      } catch (e) {
        sendMessage("H\xE3y v\u01B0\u1EE3t \u1EA3i tr\u01B0\u1EDBc \u0111\xF3 \u0111\u1EC3 ti\u1EBFp t\u1EE5c");
        loading.value = false;
      }
    };
    const doCloseBattleR = () => {
      battleResult.value.show = false;
      refreshFinished();
    };
    return (_ctx, _push, _parent, _attrs) => {
      const _component_ClientOnly = __nuxt_component_0$2;
      const _component_LazyPopupBattleResult = __nuxt_component_1_lazy;
      const _component_loadingScreen = __nuxt_component_2;
      const _component_NuxtImg = __nuxt_component_0$1;
      const _component_BattleInfo = _sfc_main$6;
      const _component_BattlePlayerRealtime = _sfc_main$4;
      const _component_BattleEnemyRealtime = _sfc_main$3;
      const _component_BattleHistory = _sfc_main$2;
      const _component_LazyPopupRefreshMid = __nuxt_component_8_lazy;
      const _component_ButtonCancel = _sfc_main$1;
      const _component_ButtonConfirm = _sfc_main$7;
      _push(ssrRenderComponent(_component_ClientOnly, _attrs, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          var _a, _b, _c, _d, _e, _f, _g, _h, _i, _j, _k, _l, _m, _n, _o, _p, _q, _r, _s, _t, _u, _v;
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
              _push2(`<div class="h-screen bg-white"${_scopeId}><div class="h-[40%] bg-bg_pve bg-cover"${_scopeId}><div class="text-center pt-2 text-base font-semibold flex items-center justify-center"${_scopeId}> [${ssrInterpolate((_c = (_b = (_a = unref(playerInfo)) == null ? void 0 : _a.mid) == null ? void 0 : _b.current) == null ? void 0 : _c.name)}] </div><div class="flex justify-between p-2 pt-2"${_scopeId}><div${_scopeId}><div class="flex items-center justify-start"${_scopeId}><div class="flex items-center"${_scopeId}>`);
              _push2(ssrRenderComponent(_component_NuxtImg, {
                format: "webp",
                class: "h-[35px] border border-[#d0d0d0] bg-[#d0d0d0] rounded-full",
                src: "/pve/player-avatar.png"
              }, null, _parent2, _scopeId));
              _push2(`</div></div>`);
              if (unref(showPlayerInfo)) {
                _push2(ssrRenderComponent(_component_BattleInfo, {
                  name: (_d = unref(state).player) == null ? void 0 : _d.name,
                  hp: (_e = unref(state).player) == null ? void 0 : _e.hp,
                  damage: (_f = unref(state).player) == null ? void 0 : _f.damage,
                  def: (_g = unref(state).player) == null ? void 0 : _g.def,
                  onClose: ($event) => showPlayerInfo.value = false
                }, null, _parent2, _scopeId));
              } else {
                _push2(`<!---->`);
              }
              _push2(`</div><div${_scopeId}><div class="flex items-center justify-end"${_scopeId}><div class="flex justify-end"${_scopeId}>`);
              _push2(ssrRenderComponent(_component_NuxtImg, {
                format: "webp",
                class: "h-[35px] bg-black border border-[#d0d0d0] bg-[#d0d0d0] rounded-full",
                src: "/pve/monter-avatar.png"
              }, null, _parent2, _scopeId));
              _push2(`</div></div>`);
              if (unref(showEnemyInfo)) {
                _push2(ssrRenderComponent(_component_BattleInfo, {
                  name: (_h = unref(state).enemy) == null ? void 0 : _h.name,
                  hp: (_i = unref(state).enemy) == null ? void 0 : _i.hp,
                  damage: (_j = unref(state).enemy) == null ? void 0 : _j.damage,
                  def: (_k = unref(state).enemy) == null ? void 0 : _k.def,
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
              _push2(`</div><div class="flex items-center flex-col justify-center fixed w-full bottom-2"${_scopeId}>`);
              if (unref(inRefresh)) {
                _push2(ssrRenderComponent(_component_LazyPopupRefreshMid, {
                  "refresh-time": unref(refreshTime),
                  onRefreshFinished: refreshFinished
                }, null, _parent2, _scopeId));
              } else {
                _push2(`<!---->`);
              }
              _push2(`<div class="flex items-center"${_scopeId}>`);
              _push2(ssrRenderComponent(_component_ButtonCancel, {
                class: "mx-2",
                "class-name": "h-[23px]",
                onClick: ($event) => unref(navigateTo$1)("/")
              }, {
                default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                  if (_push3) {
                    _push3(`<span class="z-9 text-10"${_scopeId2}> V\u1EC1 th\xE0nh </span>`);
                  } else {
                    return [
                      createVNode("span", { class: "z-9 text-10" }, " V\u1EC1 th\xE0nh ")
                    ];
                  }
                }),
                _: 1
              }, _parent2, _scopeId));
              _push2(ssrRenderComponent(_component_ButtonConfirm, {
                class: "mx-2",
                onClick: nextMid
              }, {
                default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                  if (_push3) {
                    _push3(`<span class="z-9 text-10"${_scopeId2}> \u1EA2i ti\u1EBFp </span>`);
                  } else {
                    return [
                      createVNode("span", { class: "z-9 text-10" }, " \u1EA2i ti\u1EBFp ")
                    ];
                  }
                }),
                _: 1
              }, _parent2, _scopeId));
              _push2(`</div></div></div>`);
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
                createVNode("div", { class: "h-[40%] bg-bg_pve bg-cover" }, [
                  createVNode("div", { class: "text-center pt-2 text-base font-semibold flex items-center justify-center" }, " [" + toDisplayString((_n = (_m = (_l = unref(playerInfo)) == null ? void 0 : _l.mid) == null ? void 0 : _m.current) == null ? void 0 : _n.name) + "] ", 1),
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
                        name: (_o = unref(state).player) == null ? void 0 : _o.name,
                        hp: (_p = unref(state).player) == null ? void 0 : _p.hp,
                        damage: (_q = unref(state).player) == null ? void 0 : _q.damage,
                        def: (_r = unref(state).player) == null ? void 0 : _r.def,
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
                            class: "h-[35px] bg-black border border-[#d0d0d0] bg-[#d0d0d0] rounded-full",
                            src: "/pve/monter-avatar.png"
                          })
                        ], 8, ["onClick"])
                      ]),
                      unref(showEnemyInfo) ? (openBlock(), createBlock(_component_BattleInfo, {
                        key: 0,
                        name: (_s = unref(state).enemy) == null ? void 0 : _s.name,
                        hp: (_t = unref(state).enemy) == null ? void 0 : _t.hp,
                        damage: (_u = unref(state).enemy) == null ? void 0 : _u.damage,
                        def: (_v = unref(state).enemy) == null ? void 0 : _v.def,
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
                ]),
                createVNode("div", { class: "flex items-center flex-col justify-center fixed w-full bottom-2" }, [
                  unref(inRefresh) ? (openBlock(), createBlock(_component_LazyPopupRefreshMid, {
                    key: 0,
                    "refresh-time": unref(refreshTime),
                    onRefreshFinished: refreshFinished
                  }, null, 8, ["refresh-time"])) : createCommentVNode("", true),
                  createVNode("div", { class: "flex items-center" }, [
                    createVNode(_component_ButtonCancel, {
                      class: "mx-2",
                      "class-name": "h-[23px]",
                      onClick: withModifiers(($event) => unref(navigateTo$1)("/"), ["stop"])
                    }, {
                      default: withCtx(() => [
                        createVNode("span", { class: "z-9 text-10" }, " V\u1EC1 th\xE0nh ")
                      ]),
                      _: 1
                    }, 8, ["onClick"]),
                    createVNode(_component_ButtonConfirm, {
                      class: "mx-2",
                      onClick: nextMid
                    }, {
                      default: withCtx(() => [
                        createVNode("span", { class: "z-9 text-10" }, " \u1EA2i ti\u1EBFp ")
                      ]),
                      _: 1
                    })
                  ])
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
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/battle/index.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const index = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: _sfc_main
}, Symbol.toStringTag, { value: "Module" }));

export { _sfc_main$1 as _, index as i };
//# sourceMappingURL=index.ccb4c1e9.mjs.map
