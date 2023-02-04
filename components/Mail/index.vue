<script setup lang="ts">
import { set } from '@vueuse/core'
import { fromNow } from '~/common'

defineProps<{
  mails: any
}>()

const toggle = reactive({
  mail: false,
})

const readMail = ref({})
const read = (mail: any) => {
  set(readMail, mail)
  toggle.mail = true
}
</script>

<template>
  <var-popup v-model:show="toggle.mail">
    <div
      class="h-[40vh] border-1 border-white/40 w-[calc(100vw_-_70px)] m-auto bg-primary p-2 rounded text-10 text-white/80"
    >
      <div class="h-full p-2">
        <div class="h-[40%]">
          <div class="text-12 pt-2 text-white">
            {{ readMail?.title }}
          </div>
          <div class="whitespace-pre-line pt-2 text-left">
            {{ readMail?.note }}
          </div>
          <div class="text-right pr-2 pt-2">
            <span class="text-yellow-400">{{ readMail?.kind === 'system' ? 'Hệ thống' : 'Cá nhân' }}</span>
            <p>{{ fromNow(new Date(readMail.createdAt).getTime()) }}</p>
          </div>
        </div>
        <div v-if="readMail?.records.length > 0" class="relative mt-2 h-35">
          <div class="mb-10 text-center">
            Phần thưởng
          </div>
          <MailList :mail="readMail" :_mail-id="readMail._id" :record-type="readMail.recordType" :records="readMail.records" />
        </div>
      </div>
    </div>
  </var-popup>
  <div class="h-[55vh] w-[calc(100vw_-_70px)] m-auto bg-primary p-2 border-1 border-white/40 rounded">
    <Line class="py-2">
      <span class="text-white">Thư</span>
    </Line>
    <div class="h-[90%] overflow-scroll scrollbar-hide">
      <div
        v-for="mail in mails"
        :key="mail?._id"
        class="flex items-center border border-white/40 p-2 m-1 gap-2 rounded"
        @click.stop="read(mail)"
      >
        <div v-if="!mail.isRead" class="text-10 text-primary">
          (Chưa nhận)
        </div>
        <div v-else class="text-10 text-primary">
          (Đã nhận)
        </div>
        <div class="flex flex-col items-start text-white">
          <div>{{ mail?.title }}</div>
          <div
            v-if="mail?.records.length > 0 && !mail.isRead"
            class="text-10 text-green-300"
          >
            Có đính kèm chưa nhận
          </div>
        </div>
      </div>
    </div>
  </div>

  <span class="text-12 fixed transform-center bottom-4 top-auto">Nhấn ra ngoài để đóng</span>
</template>
