<script setup lang='ts'>
definePageMeta({
  middleware: ['role'],
  layout: 'auth',
})

const { $io } = useNuxtApp()
const name = ref('')
const classList = [
  {
    id: 1,
    name: 'Tu tiên',
    description: `<p class="text-12 mt-1">
                              Khắc chế: Gây thêm <strong class="text-red">10%</strong> sát thương gây lên người chơi hệ tu ma
                            </p>
                            <span class="text-12 font-normal">Huyết mạch: </span><span class="text-12">Tăng <strong class="text-red">10%</strong> tấn công, <strong>5%</strong> sát thương bạo kích cơ bản (Không bao gồm trang bị)</span>
                          `,
  },
  {
    id: 2,
    name: 'Tu yêu',
    description: `<p class="text-12 mt-1">Khắc chế: Gây thêm <strong class="text-red">10%</strong> sát thương gây lên người chơi hệ tu tiên</p>
                            <span class="text-12 font-normal">Huyết mạch: </span><span class="text-12">Tăng <strong class="text-[#03a9f4]">10%</strong> sinh lực, <strong class="text-green-500">5%</strong> phòng thủ cơ bản (Không bao gồm trang bị)</span>
                           `,
  },
  {
    id: 3,
    name: 'Tu ma',
    description: `<p class="text-12 mt-1">Khắc chế: Gây thêm <strong class="text-red">10%</strong> sát thương gây lên người chơi nhân tộc
                            </p>
                            <span class="text-12 font-normal">Huyết mạch: </span><span class="text-12">Tăng <strong class="text-red">5%</strong> Tấn công, <strong>10%</strong> sát thương bạo kích (Không bao gồm trang bị)</span>
                          `,
  },
  {
    id: 4,
    name: 'Nhân tộc',
    description: `<p class="text-12 mt-1">
                              Khắc chế: Gây thêm <strong class="text-red">10%</strong> sát thương gây lên người chơi hệ tu yêu
                            </p>
                            <span class="text-12 font-normal">Huyết mạch: </span><span class="text-12">Tăng <strong class="text-red">5%</strong> Tấn công, <strong class="text-[#03a9f4]">5%</strong> sinh lực, <strong class="text-green">5%</strong> phòng thủ (Không bao gồm trang bị)</span>
                         `,
  },
]

const genders = [
  {
    key: 'male',
    name: 'Nam',
  },
  {
    key: 'female',
    name: 'Nữ',
  },
]

const selected = ref(classList[2])
const selectedGender = ref('male')
const handleCreateFigure = async () => {
  const { loadPlayer } = usePlayerStore()

  try {
    const role: any = await $fetch('/api/player/create-role', {
      method: 'POST',
      headers: (useRequestHeaders(['cookie']) as any),
      body: {
        name: name.value,
        class: selected.value.id,
        gender: selectedGender.value,
      },
    })

    sendMessage(role.message)

    loadPlayer(role)
    navigateTo('/')
  }
  catch (e: any) {
    sendMessage(e.statusMessage)
  }
}
</script>

<template>
  <div class="h-screen relative bg-primary text-primary italic relative max-w-[70vh] m-auto border border-white/40">
    <div class="p-4 w-full transform-center absolute">
      <div>
        <Line
          m="y-2"
        >
          <div text="12">
            Chọn hệ phái
          </div>
        </Line>
        <div class="flex justify-center">
          <div
            v-for="gender in genders"
            :key="gender.name"
            @click="selectedGender = gender.key"
          >
            <div
              class="text-center font-semibold border-box text-10 mb-4 mx-1 py-2 px-2 opacity-40 w-20"
              :class="{
                'opacity-100': gender.key === selectedGender,
              }"
            >
              {{ gender.name }}
            </div>
          </div>
        </div>

        <div class="flex items-start justify-between grid grid-cols-4">
          <div v-for="classE in classList" :key="classE.name" @click="selected = classE">
            <div
              class="text-center font-semibold border-box text-10 mb-4 mx-1 py-2 px-2 opacity-40"
              :class="{
                'opacity-100': classE.name === selected.name,
              }"
            >
              {{ classE.name }}
            </div>
          </div>
        </div>
      </div>
      <div class="pt-10 duration" v-html="selected.description" />
    </div>
    <div class="ml-2 absolute bottom-20 flex w-full gap-2 items-center justify-center">
      <input
        v-model="name"
        placeholder="Tên nhân vật"
        class="w-[160px] rounded h-[30px] leading-[35px] text-center flex-center text-[#333]"
        type="text" name="username"
        maxlength="16"
      >
      <var-button
        class="!text-[#333] font-medium"
        size="small"
        @click="handleCreateFigure"
      >
        Tạo ngay
      </var-button>
    </div>
  </div>
</template>
