import { defineComponent, ref, createElementBlock } from 'vue';

const __nuxt_component_0 = defineComponent({
  name: "ClientOnly",
  inheritAttrs: false,
  props: ["fallback", "placeholder", "placeholderTag", "fallbackTag"],
  setup(_, { slots, attrs }) {
    const mounted = ref(false);
    return (props) => {
      var _a;
      if (mounted.value) {
        return (_a = slots.default) == null ? void 0 : _a.call(slots);
      }
      const slot = slots.fallback || slots.placeholder;
      if (slot) {
        return slot();
      }
      const fallbackStr = props.fallback || props.placeholder || "";
      const fallbackTag = props.fallbackTag || props.placeholderTag || "span";
      return createElementBlock(fallbackTag, attrs, fallbackStr);
    };
  }
});
const sleep = (ms) => {
  return new Promise((resolve) => setTimeout(resolve, ms));
};
const randomNumber = (min, max) => {
  return Math.random() * (max - min) + min;
};
const convertMillisecondsToSeconds = (milliseconds) => {
  return milliseconds / 1e3;
};
const formatCash = (n) => {
  if (!n)
    return 0;
  if (n < 1e3)
    return n;
  return `${+(n / 1e3).toFixed(1)} V\u1EA1n`;
};
const timeOffset = (time) => {
  return {
    hours: Math.round(time / 60 / 60),
    minutes: Math.floor(time / 60) % 60,
    seconds: Math.round(time % 60)
  };
};

export { __nuxt_component_0 as _, convertMillisecondsToSeconds as c, formatCash as f, randomNumber as r, sleep as s, timeOffset as t };
//# sourceMappingURL=index.2feaf918.mjs.map
