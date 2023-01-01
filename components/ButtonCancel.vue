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
  <button :class="className" class="text-xxs relative p-4 h-[30px] flex items-center justify-center text-[#8d734b]" @click.stop="onClose">
    <NuxtImg :class="className" class="absolute object-cover rounded" format="webp" src="/button/btn_xfy_qf_0.png" />
    <slot />
  </button>
</template>
