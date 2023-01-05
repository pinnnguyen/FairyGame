import { ref, mergeProps, unref, useSSRContext } from 'vue';
import { ssrRenderAttrs, ssrInterpolate } from 'vue/server-renderer';
import { c as convertMillisecondsToSeconds } from './index.2feaf918.mjs';

const _sfc_main = {
  __name: "refresh-mid",
  __ssrInlineRender: true,
  props: {
    refreshTime: Number
  },
  emits: ["refreshFinished"],
  setup(__props, { emit: emits }) {
    const props = __props;
    const endTime = ref(props.refreshTime);
    const time = setInterval(() => {
      endTime.value = endTime.value - 1e3;
      if (endTime.value <= 1) {
        emits("refreshFinished");
        clearInterval(time);
      }
    }, 1e3);
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "text-white flex flex-col items-center justify-center" }, _attrs))}><div class="text-base text-black"> \u0110ang h\u1ED3i sinh ${ssrInterpolate(Math.round(unref(convertMillisecondsToSeconds)(unref(endTime))))}s </div></div>`);
    };
  }
};
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/Popup/refresh-mid.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};

export { _sfc_main as default };
//# sourceMappingURL=refresh-mid.a0884c71.mjs.map
