<script setup>
const emits = defineEmits(['close'])
const onClose = () => {
  emits('close')
}
</script>

<template>
  <button style="background: url('/button/btn_xfy_qf_1.png'); background-size: cover" class="p-4 h-[35px] flex items-center justify-center text-[#8d734b]" @click.stop="onClose">
    <slot />
  </button>
</template>
