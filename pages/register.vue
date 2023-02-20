<script setup>
import { sendNotification } from '~/composables/useNotification'

definePageMeta({
  layout: 'auth',
  auth: false,
})

const loading = ref(false)

const password = ref('')
const rePassword = ref('')
const email = ref('')

const handleRegister = async () => {
  if (!email.value) {
    sendNotification('Mail không được để trống')
    return
  }

  if (!password.value) {
    sendNotification('Passowrd không được để trống')
    return
  }

  if (password.value !== rePassword.value) {
    sendNotification('Mật khẩu không trùng nhau')
    return
  }

  try {
    const user = await $fetch('/api/user/register', {
      method: 'POST',
      body: {
        email: email.value,
        password: password.value,
      },
    })

    if (user) {
      sendNotification('Đăng ký thành công!')
      return navigateTo('/login')
    }
  }
  catch (e) {
    sendNotification('Tài khoản đã tồn tại')
  }
}
</script>

<template>
  <section>
    <div class="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0 bg-primary h-screen">
      <a class="flex items-center">
        <img class="w-30 h-30" src="/logo.png" alt="logo">
      </a>
      <div class="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
        <div class="p-6 space-y-6 sm:p-8">
          <h1 class="text-primary font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
            Đăng ký tài khoản
          </h1>
          <div class="space-y-4 md:space-y-6">
            <div>
              <var-input id="email" v-model="email" type="email" name="email" placeholder="ttg@mail.com" text-color="#ffffff" focus-color="#fff" />
            </div>
            <div>
              <var-input id="password" v-model="password" type="password" name="password" placeholder="••••••••" text-color="#ffffff" focus-color="#fff" />
            </div>
            <div>
              <var-input id="password" v-model="rePassword" type="password" name="password" placeholder="••••••••" text-color="#ffffff" focus-color="#fff" />
            </div>
            <div
              text="center"
            >
              <var-button @click="handleRegister">
                Tạo tài khoản
              </var-button>
            </div>
            <p class="text-12 text-primary">
              Bạn đã có tài khoản? <nuxt-link to="/login" class="font-medium text-primary-600 hover:underline dark:text-primary-500 underline">
                Đăng nhập
              </nuxt-link>
            </p>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>
