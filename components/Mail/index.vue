<script setup lang="ts">
import { set } from '@vueuse/core'
import { fromNow } from '~/common'

const props = defineProps<{
  mails: any
}>()

const toggle = reactive({
  mail: false,
})

const readMail = ref({})

const gemReward = computed(() => {
  return props.mails.filter((m: any) => {
    return m.recordType === 'gem'
  })
})

const equipmentReward = computed(() => {
  return props.mails.filter((m: any) => {
    return m.recordType === 'equipment'
  })
})

const itemReward = computed(() => {
  return props.mails.filter((m: any) => {
    return m.recordType === 'item'
  })
})

const read = (mail: any) => {
  set(readMail, mail)
  toggle.mail = true
}

const take = async (mail: any) => {
  if (mail.isRead) {
    sendMessage('Phần thưởng đã được nhận trước đó', 2500)
    return
  }

  try {
    const takeRes: any = await $fetch('/api/mail/take', {
      method: 'POST',
      body: {
        _mailId: mail._id,
      },
    })

    sendMessage(takeRes.message, 2500)
  }
  catch (e: any) {
    sendMessage(e.statusMessage)
  }
}
</script>

<template>
  <div
    p="2"
    h="full"
    overflow="auto"
  >
    <div
      v-for="mail in mails"
      :key="mail?._id"
      flex="~ "
      pos="relative"
      align="items-center"
      border="1 white/40 rounded"
      p="2"
      m="1"
      gap="2"
      @click.stop="read(mail)"
    >
      <div
        flex="~ col"
        align="items-start"
        text="[#b86f4e] normal"
      >
        <div font="bold">
          {{ mail?.title }}
        </div>
        <div text="10 white" class="w-[calc(100%_-_100px)]">
          {{ mail.note }}
        </div>
        <div m="t-2">
          <reward-list-item-horizontal v-if="mail.recordType === 'item'" :rewards="mail.records" />
          <reward-list-gem-horizontal v-if="mail.recordType === 'gem'" :rewards="mail.records" />
          <reward-list-equipment-horizontal v-if="mail.recordType === 'equipment'" :rewards="mail.records" />
        </div>
        <div
          pos="absolute"
          right="2"
          top="5"
        >
          <var-button
            :disabled="mail.isRead"
            class="!text-[#333] !px-4 w-20"
            size="small"
            @click.stop="take(mail)"
          >
            {{ !mail.isRead ? 'Nhận' : 'Đã nhận' }}
          </var-button>
        </div>
        <p
          pos="absolute"
          bottom="2"
          right="2"
          text="white 10 right"
        >
          {{ fromNow(new Date(mail.createdAt).getTime()) }}
        </p>
      </div>
    </div>
  </div>
</template>
