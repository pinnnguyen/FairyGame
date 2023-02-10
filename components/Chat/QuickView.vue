<template>
  <div class="h-12 w-full overflow-auto text-left">
    <div v-for="content in typeContents" :key="content._id">
      <span
        class="font-bold text-10 text-[#6ce8d4]" :class="{
          'text-[#f44336]': content.type === 'system',
        }"
      >
        [{{ content.name }}]
      </span>
      :
      <span class="text-white text-10">
        {{ content.content }}
      </span>
    </div>
  </div>
</template>
