import { c as __nuxt_component_1 } from '../server.mjs';
import { mergeProps, useSSRContext } from 'vue';
import { ssrRenderAttrs, ssrRenderComponent, ssrRenderSlot } from 'vue/server-renderer';

const _sfc_main = {
  __name: "ButtonConfirm",
  __ssrInlineRender: true,
  props: {
    className: String
  },
  emits: ["close"],
  setup(__props, { emit: emits }) {
    return (_ctx, _push, _parent, _attrs) => {
      const _component_NuxtImg = __nuxt_component_1;
      _push(`<button${ssrRenderAttrs(mergeProps({
        class: [__props.className, "text-xs overflow-hidden relative p-4 h-[30px] flex items-center justify-center text-[#8d734b]"]
      }, _attrs))}>`);
      _push(ssrRenderComponent(_component_NuxtImg, {
        class: [__props.className, "absolute object-cover"],
        format: "webp",
        src: "/button/btn_tongyong_23.png"
      }, null, _parent));
      ssrRenderSlot(_ctx.$slots, "default", {}, null, _push, _parent);
      _push(`</button>`);
    };
  }
};
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/ButtonConfirm.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};

export { _sfc_main as _ };
//# sourceMappingURL=ButtonConfirm.bfbf963d.mjs.map
