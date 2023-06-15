<template>
  <div class="flex h-16 fixed items-center bg-yellow-500 dark:bg-zinc-800 w-full">
    <div class="flex items-center ml-3">
      <div class="flex items-center ml-3 cursor-pointer" @click="returnHome">
        <img
            class="h-8 w-auto mx-3"
            src="/gotham.png"
            alt="logo gotham"
        />
        <button class="text-4xl text-gray-100 hidden sm:contents">
          Gotham
        </button>
      </div>
    </div>
    <div v-if="login" class="absolute right-0 mr-3 gap-3 flex-row flex">
      <select
          class="w-full cursor-pointer flex py-1 px-2 border border-transparent text-sm font-light rounded dark:text-gray-300 dark:bg-zinc-600"
          @click="selectUser(
            /* @ts-expect-error */ 
            $event.target.value
          )"
      >
        <option
            v-for="user in users"
            :key="user.id"
            :value="user.id"
        >
          {{ user.username }}
        </option>
      </select>
      <button
          @click="switchOpenMenu"
          type="button"
          class="hover:bg-yellow-600 focus:outline-none focus:ring-yellow-200 rounded-lg text-sm p-2.5"
      >
        <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke-width="1.5"
            stroke="currentColor"
            class="h-6 w-6 text-gray-200 dark:text-gray-300"
        >
          <path
              stroke-linecap="round"
              stroke-linejoin="round"
              d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
          />
        </svg>
      </button>
    </div>

  </div>
</template>

<script lang="ts">
import router from '../router'
import {computed, defineComponent, onMounted, ref, watch} from 'vue'
import { useStore } from 'vuex'
import {useRoute} from "vue-router";
import {UserActionType} from "../store/modules/user";

export default defineComponent({
  name: 'Navbar',
  props: {login: {type: Boolean}},

  async setup() {
    const store = useStore()
    const route = useRoute()

    function returnHome() {
      router.push('/')
    }

    function selectUser(userId: number) {
      const actualRoute = route.path
      store.dispatch(UserActionType.FetchUserById, userId)
      if (route.params.userId)
        router.push(actualRoute.slice(actualRoute.length, 1) + userId)
    }

    function switchOpenMenu() {
        store.dispatch(UserActionType.OpenMenu, !store.state.users.isOpen)
    }

    onMounted(() => {
      store.dispatch(UserActionType.FetchAllUsers)
    })
    return {
      store,
      path: computed(() => route.params),
      returnHome,
      selectUser,
      switchOpenMenu,
      users: computed(() => store.state.users.users),
      selectedUser: computed(() => store.state.users.user),
    }
  },
})
</script>

<style></style>
