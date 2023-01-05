import { ref, computed, getCurrentScope, onScopeDispose, unref } from 'vue';
import { f as defineStore, g as useRequestHeaders, n as navigateTo$1 } from '../server.mjs';

const isString = (val) => typeof val === "string";
const noop = () => {
};
function resolveUnref(r) {
  return typeof r === "function" ? r() : unref(r);
}
function identity(arg) {
  return arg;
}
function tryOnScopeDispose(fn) {
  if (getCurrentScope()) {
    onScopeDispose(fn);
    return true;
  }
  return false;
}
function set(...args) {
  if (args.length === 2) {
    const [ref2, value] = args;
    ref2.value = value;
  }
  if (args.length === 3) {
    {
      const [target, key, value] = args;
      target[key] = value;
    }
  }
}
const usePlayerStore = defineStore("player", () => {
  const playerInfo = ref();
  const sid = computed(() => {
    var _a;
    return (_a = playerInfo.value) == null ? void 0 : _a.sid;
  });
  const mids = computed(() => {
    var _a;
    return (_a = playerInfo.value) == null ? void 0 : _a.mid;
  });
  const upgrade = computed(() => {
    var _a;
    return (_a = playerInfo.value) == null ? void 0 : _a.upgrade;
  });
  const attribute = computed(() => {
    var _a;
    return (_a = playerInfo.value) == null ? void 0 : _a.attribute;
  });
  const equipments = computed(() => {
    var _a;
    return (_a = playerInfo.value) == null ? void 0 : _a.equipments;
  });
  const playerEquipUpgrade = computed(() => {
    var _a;
    return (_a = playerInfo.value) == null ? void 0 : _a.playerEquipUpgrade;
  });
  const hasEquip = (pos, _equipId) => {
    return attribute.value[`slot_${pos}`] === _equipId;
  };
  const changeEquip = (pos, _equipId) => {
    return attribute.value[`slot_${pos}`] = _equipId;
  };
  const loadPlayer = (data) => {
    set(playerInfo, {
      ...data.player,
      attribute: {
        ...data.attribute
      },
      mid: {
        ...data.mid
      },
      upgrade: {
        ...data.upgrade
      },
      equipments: data.equipments,
      playerEquipUpgrade: data.playerEquipUpgrade
    });
  };
  const getPlayer = async () => {
    const data = await $fetch("/api/player", {
      headers: useRequestHeaders(["cookie"])
    });
    if (!data)
      return navigateTo$1("/role");
    set(playerInfo, {
      ...data == null ? void 0 : data.player,
      attribute: {
        ...data == null ? void 0 : data.attribute
      },
      mid: {
        ...data == null ? void 0 : data.mid
      },
      upgrade: {
        ...data == null ? void 0 : data.upgrade
      },
      equipments: data.equipments,
      playerEquipUpgrade: data.playerEquipUpgrade
    });
  };
  return {
    sid,
    mids,
    playerInfo,
    getPlayer,
    loadPlayer,
    upgrade,
    attribute,
    hasEquip,
    changeEquip,
    equipments,
    playerEquipUpgrade
  };
});

export { identity as a, isString as i, noop as n, resolveUnref as r, set as s, tryOnScopeDispose as t, usePlayerStore as u };
//# sourceMappingURL=usePlayer.e639d27d.mjs.map
