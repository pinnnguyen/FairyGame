import { ref } from 'vue';
import { f as defineStore } from '../server.mjs';
import { s as sleep } from './index.2feaf918.mjs';
import { s as set } from './usePlayer.ee6d41eb.mjs';

const WINNER = {
  youwin: "youwin",
  youlose: "youlose"
};
const BATTLE_TURN = {
  PLAYER: "player",
  ENEMY: "enemy"
};
const useBattleRoundStore = defineStore("battleRound", () => {
  const loading = ref(true);
  const playerEffect = ref("");
  const battleRounds = ref([]);
  const rankDMG = ref([]);
  const inRefresh = ref(false);
  const refreshTime = ref(0);
  const reward = ref();
  const state = ref({});
  const receiver = ref({});
  const realTime = ref({
    player: {
      critical: false,
      bloodsucking: 0,
      trueDamage: false,
      dmg: 0
    },
    enemy: {
      critical: false,
      trueDamage: false,
      bloodsucking: 0,
      dmg: 0
    }
  });
  const TURN_DELAY = 2e3;
  const REAL_TIME_DELAY = 700;
  const DAMAGE_DELAY = 700;
  const SHOULD_WIN_DELAY = 1e3;
  const battleResult = ref({
    show: false,
    win: ""
  });
  const startBattle = async (war) => {
    var _a, _b, _c, _d, _e, _f;
    console.log("war", war);
    set(inRefresh, false);
    set(refreshTime, 0);
    set(loading, false);
    set(battleRounds, []);
    set(reward, null);
    set(rankDMG, war.rankDMG);
    if (!war)
      return;
    set(reward, war.reward);
    state.value.player = war.player;
    state.value.enemy = war.enemy;
    receiver.value = {
      player: {
        hp: (_a = state.value.player) == null ? void 0 : _a.hp,
        mp: (_b = state.value.player) == null ? void 0 : _b.mp
      },
      enemy: {
        hp: (_c = state.value.enemy) == null ? void 0 : _c.hp,
        mp: (_d = state.value.enemy) == null ? void 0 : _d.mp
      }
    };
    if (war.inRefresh) {
      set(inRefresh, war.inRefresh);
      set(refreshTime, war.refreshTime);
      return;
    }
    let roundNum = 0;
    for (const emulator of war.emulators) {
      for (const turn in emulator) {
        roundNum++;
        const _turn = turn.replace(/1_|2_/g, "");
        const __turn = _turn === BATTLE_TURN.PLAYER ? BATTLE_TURN.ENEMY : BATTLE_TURN.PLAYER;
        const emuT = emulator[turn];
        const DMG = (_e = emuT == null ? void 0 : emuT.state) == null ? void 0 : _e.damage;
        if (emuT.action) {
          await sleep(TURN_DELAY);
          set(playerEffect, _turn);
          receiver.value[__turn].hp = emuT.now.hp[__turn];
          receiver.value[__turn].mp = emuT.now.mp[_turn];
          realTime.value[__turn].dmg = DMG;
          realTime.value[__turn].trueDamage = true;
          realTime.value[__turn].critical = (_f = emuT == null ? void 0 : emuT.state) == null ? void 0 : _f.critical;
          realTime.value[__turn].bloodsucking = emuT.state.bloodsucking;
          battleRounds.value.unshift({
            turn: _turn,
            damage: DMG,
            roundNum
          });
          setTimeout(() => {
            set(playerEffect, "");
          }, REAL_TIME_DELAY);
          setTimeout(() => {
            realTime.value[__turn].trueDamage = false;
          }, DAMAGE_DELAY);
          if (receiver.value[__turn].hp <= 0) {
            setTimeout(() => {
              battleResult.value = {
                show: true,
                win: war.winner
              };
            }, SHOULD_WIN_DELAY);
            return;
          }
        }
      }
    }
  };
  return {
    state,
    reward,
    loading,
    receiver,
    realTime,
    inRefresh,
    startBattle,
    refreshTime,
    playerEffect,
    battleRounds,
    battleResult,
    rankDMG
  };
});

export { BATTLE_TURN as B, WINNER as W, useBattleRoundStore as u };
//# sourceMappingURL=useBattleRound.23b9a804.mjs.map
