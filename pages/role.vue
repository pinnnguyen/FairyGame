<script setup lang='ts'>
const { initPlayer } = usePlayerStore()

definePageMeta({
  // middleware: ['role'],
  layout: 'auth',
})

onMounted(async () => {
  const role = await $fetch('/api/player', {
    headers: (useRequestHeaders(['cookie']) as any),
  })

  if (role?.player?.sid) {
    initPlayer(role)
    return navigateTo('/')
  }
})

const name = ref('')
const classList = [
  {
    id: 1,
    name: 'Tu tiên',
    img: 'role/fs_007_1.png',
    description: `              <p class="text-12 mt-1">
                              Khắc chế: Gây thêm <strong class="text-red">10%</strong> sát thương gây lên người chơi hệ tu ma
                            </p>
                            <span class="text-12 font-normal">Huyết mạch: </span><span class="text-12">Tăng <strong class="text-red">10%</strong> tấn công, <strong>5%</strong> sát thương bạo kích cơ bản (Không bao gồm trang bị)</span>
                          `,
  },
  {
    id: 2,
    name: 'Tu yêu',
    img: 'role/fs_007_2.png',
    description: `                <p class="text-12 mt-1">
                              Khắc chế: Gây thêm <strong class="text-red">10%</strong> sát thương gây lên người chơi hệ tu tiên
                            </p>
                            <span class="text-12 font-normal">Huyết mạch: </span><span class="text-12">Tăng <strong class="text-[#03a9f4]">10%</strong> sinh lực, <strong class="text-green">5%</strong> phòng thủ cơ bản (Không bao gồm trang bị)</span>
                           `,
  },
  {
    id: 3,
    name: 'Tu ma',
    img: 'role/fs_007_4.png',
    description: `                   <p class="text-12 mt-1">
                              Khắc chế: Gây thêm <strong class="text-red">10%</strong> sát thương gây lên người chơi nhân tộc
                            </p>
                            <span class="text-12 font-normal">Huyết mạch: </span><span class="text-12">Tăng <strong class="text-red">5%</strong> Tấn công, <strong>10%</strong> sát thương bạo kích (Không bao gồm trang bị)</span>
                          `,
  },
  {
    id: 4,
    name: 'Nhân tộc',
    img: 'role/fs_007_3.png',
    description: `              <p class="text-12 mt-1">
                              Khắc chế: Gây thêm <strong class="text-red">10%</strong> sát thương gây lên người chơi hệ tu yêu
                            </p>
                            <span class="text-12 font-normal">Huyết mạch: </span><span class="text-12">Tăng <strong class="text-red">5%</strong> Tấn công, <strong class="text-[#03a9f4]">5%</strong> sinh lực, <strong class="text-green">5%</strong> phòng thủ (Không bao gồm trang bị)</span>
                         `,
  },
]

const seleted = ref(classList[0])
const handleCreateFigure = async () => {
  const { initPlayer } = usePlayerStore()

  const role = await $fetch('/api/player/create-role', {
    method: 'POST',
    headers: (useRequestHeaders(['cookie']) as any),
    body: {
      name: name.value,
      class: seleted.value.id,
    },
  })

  initPlayer(role)
  navigateTo('/')
}
</script>

<template>
  <div class="h-[95vh] relative bg-black/70">
    <div class="text-white p-2 h-full">
      <form class="h-full bg-black p-2 relative" @submit.prevent="handleCreateFigure">
        <div>
          <p class="text-center text-base font-semibold uppercase mb-1">
            Hệ phái
          </p>
          <div class="flex items-start justify-between grid grid-cols-4">
            <div v-for="classE in classList" :key="classE.name" class="mb-4 p-2" @click="seleted = classE">
              <p class="text-center font-semibold">
                {{ classE.name }}
              </p>
              <NuxtImg
                class="w-full duration-500 transition transform h-[300px] object-cover"
                :class="{ 'scale-130': seleted ? seleted.id === classE.id : 0 }"
                format="webg"
                :src="classE.img"
              />
            </div>
          </div>
        </div>
        <div class="pt-10 duration" v-html="seleted.description" />
        <div class="absolute bottom-0 left-0 mb-4 flex w-full justify-center items-center">
          <div>
            <p>
              <input v-model="name" placeholder="Tên nhân vật" class="w-[160px] border border-[#dcc18d] focus:border-[#dcc18d] bg-[#2d251d] rounded h-[30px] leading-[35px] text-center flex items-center justify-center" type="text" name="username" maxlength="16">
            </p>
          </div>

          <div class="ml-2">
            <button class="bg-[#ffd400] text-base border-none leading-8 h-[30px] text-black flex items-center justify-center !w-[70px] !m-0 !rounded" type="submit" value="Tạo">
              Tạo
            </button>
          </div>
        </div>
      </form>
    </div>
  </div>
</template>
