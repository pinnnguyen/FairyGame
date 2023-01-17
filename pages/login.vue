<script setup lang="ts">
import { sendMessage } from '~/composables/useMessage'
const { signIn } = useSession()

definePageMeta({
  auth: false,
  layout: 'auth',
})

const password = ref('')
const email = ref('')

const handleLogin = async () => {
  const { error, url } = await signIn('credentials', { username: email.value, password: password.value, redirect: false })
  if (url) {
    sendMessage('Đăng nhập thành công!')
    return navigateTo('/role')
  }

  if (error)
    sendMessage('Tài khoản mật khẩu không chính xác')
}
</script>

<template>
  <section>
    <div class="flex flex-col items-center justify-center px-6 py-8 mx-auto h-screen lg:py-0">
      <a href="#" class="flex items-center mb-6 text-2xl font-semibold text-gray-900 dark:text-white">
        <img class="w-8 h-8 mr-2" src="/logo.png" alt="logo">
        Tu Tiên Giới
      </a>
      <div class="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
        <div class="p-6 space-y-6 sm:p-8">
          <h1 class="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
            Đăng nhập tài khoản của bạn
          </h1>
          <div class="space-y-4 md:space-y-6">
            <div>
              <label for="email" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Email</label>
              <input id="email" v-model="email" type="email" name="email" class="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="name@company.com" required="">
            </div>
            <div>
              <label for="password" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Mật khẩu</label>
              <input id="password" v-model="password" type="password" name="password" placeholder="••••••••" class="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required="">
            </div>
            <!-- <div class="flex items-center justify-between text-right">
              <a href="#" class="w-full text-sm font-medium text-primary-600 hover:underline dark:text-primary-500">Quên mật khẩu?</a>
            </div> -->
            <button type="button" class="w-full text-white bg-blue-600 hover:bg-blue-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:hover:bg-primary-700" @click="handleLogin">
              Đăng nhập
            </button>
            <p class="text-sm font-light text-gray-500 dark:text-gray-400">
              Bạn chưa có tài khoản? <a href="/register" class="font-medium text-primary-600 hover:underline dark:text-primary-500">Đăng ký</a>
            </p>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>
