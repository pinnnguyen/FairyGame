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
    <div class="h-[40vh] w-[calc(100vw_-_70px)] m-auto bg-[#97c7e9] p-2 border-2 border-black rounded text-10 text-white/80">
      <div class="h-full p-2" style="background-image: linear-gradient(#244363, #6a8ca7)">
        <div class="h-[40%]">
          <div class="text-12 pt-2 text-white">
            {{ readMail?.title }}
          </div>
          <div class="whitespace-pre-line pt-2 text-left">
            {{ readMail?.note }}
          </div>
          <div class="text-right pr-2">
            <span class="text-yellow-400">{{ readMail?.kind === 'system' ? 'Hệ thống' : 'Cá nhân' }}</span>
            <p>{{ fromNow(new Date(readMail.createdAt).getTime()) }}</p>
          </div>
        </div>
        <div v-if="readMail?.records.length > 0" class="relative mt-2 h-35">
          <div class="mb-10">
            Phần thưởng
          </div>
          <MailList :mail="readMail" :_mail-id="readMail._id" :record-type="readMail.recordType" :records="readMail.records" />
        </div>
      </div>
    </div>
  </var-popup>
  <div class="h-[55vh] w-[calc(100vw_-_70px)] m-auto bg-[#485384] p-2 border-2 border-black rounded">
    <h2>Thư</h2>
    <div class="h-[90%] overflow-scroll scrollbar-hide">
      <div v-for="mail in mails" :key="mail?._id" class="flex items-center bg-[#87c6ea] p-2 m-1 gap-2 rounded" @click.stop="read(mail)">
        <icon v-if="!mail.isRead" name="material-symbols:mark-email-unread" size="30" />
        <icon v-else name="material-symbols:mark-email-read" size="30" />
        <div class="flex flex-col items-start">
          <div>{{ mail?.title }}</div>
          <div v-if="mail?.records.length > 0 && !mail.isRead" class="text-10 text-green-500">
            Có đính kèm chưa nhận
          </div>
        </div>
      </div>
    </div>
  </div>

  <span class="text-12 fixed transform-center bottom-4 top-auto">Nhấn ra ngoài để đóng</span>
</template>
