<script setup lang='ts'>
definePageMeta({
  middleware: ['role'],
  layout: 'auth',
})

const name = ref('')
const handleCreateFigure = async () => {
  const user = useSupabaseUser()
  const { initPlayer } = usePlayerStore()

  const role = await $fetch('/api/player/create-role', {
    method: 'POST',
    body: {
      name: name.value,
      userId: user.value.id,
    },
  })

  initPlayer(role)
}
</script>

<template>
  <section class="bg-gray-50 dark:bg-gray-900">
    <div class="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
      <a href="#" class="flex items-center mb-6 text-2xl font-semibold text-gray-900 dark:text-white">
        <img class="w-8 h-8 mr-2" src="https://flowbite.s3.amazonaws.com/blocks/marketing-ui/logo.svg" alt="logo">
        <!--        Tu Tiên Giới -->
      </a>
      <div class="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
        <div class="p-6 space-y-6 sm:p-8">
          <h1 class="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
            Tạo nhân vật
          </h1>
          <form class="space-y-4 md:space-y-6" @submit.prevent="handleCreateFigure">
            <div>
              <label for="name" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Tên nhân vật</label>
              <input id="name" v-model="name" type="text" name="name" class="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="name@company.com" required="">
            </div>
            <button type="submit" class="w-full text-white bg-blue-600 hover:bg-blue-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:hover:bg-primary-700">
              Đăng nhập
            </button>
          </form>
        </div>
      </div>
    </div>
  </section>
</template>
