<script lang="ts" setup>
const toggle = reactive({
  bag: false,
  tienDe: false,
  figure: false,
  tienPhap: false,
  ren: false,
  tienLinh: false,
})

const toggleBag = () => {
  toggle.bag = true
}

const toggleTienDe = () => {
  toggle.tienDe = true
}

const toggleFigure = () => {
  toggle.figure = true
}

const toggleTienPhap = () => {
  toggle.tienPhap = true
}

const toggleRen = () => {
  toggle.ren = true
}

const toggleTienLinh = () => {
  toggle.tienLinh = true
}
</script>

<template>
  <div class="footer fixed bottom-0 h-[60px] w-full">
    <img class="h-[60px] w-full" src="/bottom/bg0_mainui_bottom.png" format="webp" alt="">
    <div class="absolute top-[50%] left-[50%] w-full flex items-center justify-center" style="transform: translate(-50%, -50%)">
      <NuxtImg class="h-[60px] mb-2 mr-1" src="/bottom/bottom-1.png" format="webp" alt="Tiên Đế" @click.stop="toggleTienDe" />
      <NuxtImg class="h-[45px]" src="/bottom/bottom-3.png" format="webp" alt="Nhân Vật" @click.stop="toggleFigure" />
      <NuxtImg class="h-[45px]" src="/bottom/bottom-2.png" format="webp" alt="Tiên Pháp" @click.stop="toggleTienPhap" />
      <NuxtImg class="h-[45px]" src="/bottom/bottom-4.png" format="webp" alt="Rèn" @click.stop="toggleRen" />
      <NuxtImg class="h-[45px]" src="/bottom/bottom-5.png" format="webp" alt="Tiên Linh" @click.stop="toggleTienLinh" />
      <NuxtImg class="h-[45px]" src="/bottom/bottom-6.png" format="webp" alt="Ba Lô" @click.stop="toggleBag" />
      <NuxtImg class="h-[60px] mb-2 ml-1" src="/bottom/bottom-7.png" format="webp" alt="" />
    </div>
    <div>
      <Teleport to="body">
        <PageFooterBag v-if="-toggle.bag" />
      </Teleport>
    </div>
  </div>
</template>
