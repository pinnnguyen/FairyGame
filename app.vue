<script setup>
import {
  StyleProvider,
} from '@varlet/ui'
import '@varlet/ui/es/snackbar/style/index'
import '@varlet/ui/es/dialog/style/index'

StyleProvider({
  '--snackbar-content-padding': '6px 16px',
  '--snackbar-background': 'radial-gradient(#4041448c, #191b1e)',
  '--snackbar-border-radius': '0px',
  '--snackbar-width': '200px',
  '--popup-content-background-color': '1',
  '--dialog-message-color': 'white',
  '--dialog-background': '#191b1e',
  '--dialog-cancel-button-color': '#d2d2d2',
  '--input-placeholder-size': '12px',
  '--snackbar-margin': '1px 24px',
  '--snackbar-font-size': '10px',
})
</script>

<template>
  <Body
    overflow="hidden"
    transition="duration-300 colors"
    max-w="[70vh]"
    m="auto"
  >
    <NuxtLayout>
      <NuxtPage />
    </NuxtLayout>
  </Body>
</template>
