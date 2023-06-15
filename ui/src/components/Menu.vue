<template>
  <div
      class="w-64 bg-gray-50 dark:bg-gray-800 rounded absolute z-10"
      aria-label="Sidebar"
  >
    <div class="pt-4 pb-2 px-6">
      <div class="flex items-center">
        <div class="grow ml-3">
          <p
              class="text-center text-sm font-semibold text-blue-600 dark:text-gray-100"
              v-if="currentUser"
          >
            Bonjour {{ currentUser.username }} !
          </p>
        </div>
      </div>
    </div>
    <div class="overflow-y-auto py-4 px-3 bg-gray-50 rounded dark:bg-gray-800">
      <ul class="space-y-2" @click="$router.push('/')">
        <li>
          <a
            :class="['text-gray-900 dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700',
              'flex cursor-pointer items-center p-2 text-base font-normal rounded-lg transition duration-300',
            ]"
          >
            <svg
                class="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
            >
              <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
              ></path>
            </svg>
            <span class="flex-1 ml-3 whitespace-nowrap">Accueil</span>
          </a>
        </li>
      </ul>
      <ul
          class="pt-4 mt-4 space-y-2 border-t border-gray-200 dark:border-gray-700"
      >
        <li
            v-for="(item, index) in navItems"
            :key="index"
            @click="$router.push(`/${item.route}`)"
        >
          <a
              :class="[
              'text-gray-900 dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700',
              'flex cursor-pointer items-center p-2 text-base font-normal rounded-lg transition duration-300',
            ]"
          >
            <svg
                class="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
            >
              <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  :d="item.icon"
              ></path>
            </svg>
            <span class="ml-4">{{ item.name }}</span>
          </a>
        </li>
      </ul>
      <ul
          class="pt-4 mt-4 space-y-2 border-t border-gray-200 dark:border-gray-700"
      >
        <li
            v-for="(item, index) in navItemsAdmin"
            :key="index"
            @click="$router.push(`/${item.route}`)"
        >
          <a
              :class="[
              'text-gray-900 dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700',
              'flex cursor-pointer items-center p-2 text-base font-normal rounded-lg transition duration-300',
            ]"
          >
            <svg
                class="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
            >
              <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  :d="item.icon"
              ></path>
            </svg>
            <span class="ml-4">{{ item.name }}</span>
          </a>
        </li>
      </ul>
      <ClockManager class="pt-4 mt-4 space-y-2 border-t border-gray-200 dark:border-gray-700" v-if="currentUser" :user-id="currentUser.id"/>
      <ul
          class="space-y-2 pt-4 mt-4 space-y-2 border-t border-gray-200 dark:border-gray-700"
          @click="disconnect"
      >
        <li>
          <a
              class="flex cursor-pointer items-center p-2 text-base font-normal text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700"
          >
            <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke-width="1.5"
                stroke="currentColor"
                class="w-6 h-6"
            >
              <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  d="M15.75 9V5.25A2.25 2.25 0 0013.5 3h-6a2.25 2.25 0 00-2.25 2.25v13.5A2.25 2.25 0 007.5 21h6a2.25 2.25 0 002.25-2.25V15M12 9l-3 3m0 0l3 3m-3-3h12.75"
              />
            </svg>
            <span class="flex-1 ml-3 whitespace-nowrap">Deconnexion </span>
          </a>
        </li>
      </ul>
    </div>
  </div>
</template>

<script lang="ts">
import {defineComponent, computed, onMounted} from 'vue'
import ClockManager from "../components/ClockManager.vue";
import { useStore } from 'vuex'
import {LoginActionType} from "../store/modules/login";
import {UserActionType} from "../store/modules/user";

export default defineComponent({
  name: 'Menu',
  components: {ClockManager},
  props: {
    firstName: String,
    lastName: String,
  },
  setup() {
    const store = useStore()

    function disconnect() {
      store.dispatch(LoginActionType.Disconnect)
      store.dispatch(UserActionType.OpenMenu, false)
    }
    const navItems = [
      {
        name: 'UserManager',
        route: 'userManager',
        icon: 'M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z',
      },
      {
        name: 'WorkingTimesManager',
        route: 'workingTime/' + store.state.users.user.id,
        icon: 'M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01',
      },
    ]
    const navItemsAdmin = [
      {
        name: 'AdminUsers',
        route: 'admin/users',
        icon: 'M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z',
      },
      {
        name: 'AdminWorkingTimes',
        route: 'admin/workingTimes',
        icon: 'M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01',
      },
    ]

    return {
      currentUser: computed(() => store.state.login.loginUser),
      navItems,
      navItemsAdmin,
      disconnect,
    }
  },
})
</script>

<style scoped></style>
