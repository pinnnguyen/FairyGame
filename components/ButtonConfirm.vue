<script setup>
defineProps({
  className: String,
})
const emits = defineEmits(['close'])
const onClose = () => {
  emits('close')
}
</script>

<template>
  <button :class="className" class="text-xs overflow-hidden relative p-4 h-[30px] flex items-center justify-center text-[#8d734b]" @click.stop="onClose">
    <nuxt-img :class="className" class="absolute object-cover" format="webp" src="/button/btn_tongyong_23.png" />
    <slot />
  </button>
</template>
