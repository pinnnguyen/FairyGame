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
  if (!email.value) {
    sendMessage('Mail không được để trống')
    return
  }

  if (!password.value) {
    sendMessage('Passowrd không được để trống')
    return
  }

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
    <div class="flex flex-col items-center justify-center px-6 py-8 mx-auto h-screen lg:py-0 bg-primary max-w-[70vh] m-auto">
      <a href="#" class="flex items-center">
        <img class="w-30 h-30 mr-2" src="/logo.png" alt="logo">
      </a>
      <div class="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
        <div class="p-6 space-y-6 sm:p-8">
          <h1 class="text-primary text-xl font-bold leading-tight tracking-tight md:text-2xl">
            Đăng nhập
          </h1>
          <div class="space-y-4 md:space-y-6">
            <div>
              <var-input v-model="email" name="email" placeholder="ttg@gmail.com" required="" text-color="#ffffff" focus-color="#fff" />
            </div>
            <div>
              <var-input v-model="password" type="password" name="password" placeholder="••••••••" required="" text-color="#ffffff" focus-color="#fff" />
            </div>
            <div
              text="center"
            >
              <var-button
                @click="handleLogin"
              >
                Đăng nhập
              </var-button>
            </div>
            <p class="text-12 text-primary">
              Bạn chưa có tài khoản? <nuxt-link to="/register" class="underline font-medium text-primary-600 hover:underline dark:text-primary-500">
                Đăng ký
              </nuxt-link>
            </p>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>
