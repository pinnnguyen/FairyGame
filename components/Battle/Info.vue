<script setup lang="ts">
defineProps<{
  levelTitle?: string
  floor?: string
  name?: string
  hp?: number
  damage?: number
  def?: number
}>()
</script>

<template>
  <div class="flex justify-start flex-col mt-2 text-10">
    <div class="text-white bg-black rounded p-3">
      <span class="pb-[2px] font-medium">{{ name }}</span>
      <p>{{ levelTitle }} {{ floor }}</p>
      <p class="flex items-center gap-1">
        <Icon name="ph:heart-straight-fill" />
        <span>
          Sinh lực: {{ hp }}
        </span>
      </p>
      <p class="flex items-center gap-1">
        <Icon name="material-symbols:swords" />
        <span>
          Công kích {{ damage }}
        </span>
      </p>
      <p class="flex items-center gap-1">
        <Icon name="material-symbols:shield" />
        <span>Phòng ngự {{ def }}</span>
      </p>
    </div>
  </div>
</template>
