<template>
  <navbar :login="false"/>
  <div class="flex pt-48 justify-center">
    <div
        class="flex items-center flex-col w-1/3 h-fit pt-5 bg-white rounded-2xl shadow-2xl dark:bg-stone-800"
    >
      <img
          class="w-60"
          id="login-logo"
          src="/gotham.png"
          alt="logo gotham"
      />

      <form :model="formValue" size="large" class="mt-8 space-y-6">
        <div class="rounded-md  space-y-px" path="email">
          <label for="email" class="relative block">
            <input
                id="email"
                class="py-2 pl-9 pr-3 text-sm items-center block w-full px-3 py-2 border border-gray-300 text-gray-900 rounded-md transition duration-75 duration-200 ease-in-out focus:outline-none focus:ring-green-600 focus:border-green-600 focus:z-10 focus:ring-1 hover:outline-none hover:ring-green-600 hover:border-green-600"
                v-model="formValue.email"
                placeholder="email"
            />
          </label>
        </div>
        <div class="rounded-md space-y-p" path="password">
          <label for="password" class="relative block">
            <input
                id="password"
                class="py-2 pl-9 pr-3 text-sm items-center block w-full px-3 py-2 border border-gray-300 text-gray-900 rounded-md transition duration-75 duration-200 ease-in-out focus:outline-none focus:ring-green-600 focus:border-green-600 focus:z-10 focus:ring-1 hover:outline-none hover:ring-green-600 hover:border-green-600"
                type="password"
                placeholder="Mot de passe"
                v-model="formValue.password"
            />
          </label>
        </div>
        <div
            class="flex items-center block text-gray-500 font-bold justify-center"
        >
          <label for="remember">
            <input
                class="ml-2 leading-tight"
                id="remember"
                name="remember"
                type="checkbox"
                v-model="formValue.rememberMe"
            />
            <span class="text-sm m-1 dark:text-zinc-400"
            >Se souvenir de moi</span
            >
          </label>
        </div>
        <div class="py-5 justify-center flex">
          <button
              type="submit"
              id="buttonLogin"
              class="relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded text-white bg-yellow-400 transition duration-500 dark:bg-blue-600 hover:bg-yellow-600 hover:dark:bg-blue-800"
              @click="handleValidateClick"
          >
            Connexion
          </button>
        </div>
      </form>
    </div>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent } from 'vue'
import { useStore } from 'vuex'
import { LoginActionType } from '../store/modules/login'
import { reactive } from 'vue'
import Navbar from "../components/Navbar.vue";

/**
 * Page de login
 */
export default defineComponent({
  name: 'Login',
  components: {Navbar},
  async setup() {
    const store = useStore()
    let formValue = reactive({
      email: '',
      password: '',
      rememberMe: false,
    })

    async function handleValidateClick(e: Event) {
      e.preventDefault()
      await store.dispatch(LoginActionType.FetchLogin, {
        email: formValue.email,
        password: formValue.password,
        rememberMe: formValue.rememberMe,
      })
    }

    return {
      formValue,
      handleValidateClick,
      currentColorScheme: computed(() => store.state.login.colorScheme),
    }
  },
})
</script>

<style scoped>
</style>
