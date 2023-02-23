<script setup lang="ts">
const { signOut } = useSession()

const toggleOptions = reactive({
  showSetting: false,
})

const settingTabs = [
  {
    key: 'gift+code',
    name: 'Giftcode',
    fn: () => {
      console.log('giftcode')
    },
  },
  {
    key: 'logout',
    name: 'Đăng xuất',
    fn: () => {
      signOut()
      navigateTo('/login')
    },
  },
]
</script>

<template>
  <div
    m="4"
    flex="~"
    justify="center"
    align="items-center"
    gap="4"
    p="5"
  >
    <div
      v-for="settingTab in settingTabs"
      :key="settingTab.key"
      text="center italic 10 primary"
      w="50"
      m="x-2 auto"
      p="x-2 y-2"
      transition="~ opacity"
      border="rounded 1 white/40"
      font="bold"
      @click.stop="settingTab.fn"
    >
      {{ settingTab.name }}
    </div>
  </div>
</template>
