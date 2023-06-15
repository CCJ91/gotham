<template>
  <div id="App" class="flex flex-col dark:bg-dark-gray">
    <ToastNotification
        v-if="HasToast"
        :toast="toast"
        @clear-toast="clearToast"
    />
    <Suspense>
      <router-view />
    </Suspense>
  </div>
</template>

<script lang="ts">
import ToastNotification from './components/ToastNotification.vue'
import {useStore} from "vuex";
import {computed, watch} from "vue";
import { ToastActionType, ToastGetterType } from './store/modules/toast'

export default {
  name: 'App',
  components: {
    ToastNotification,
  },

  setup() {
    const store = useStore()
    const HasToast = computed(() => store.getters[ToastGetterType.HasToast])
    const toast = computed(() => store.state.toast.toast)
    function clearToast() {
      store.dispatch(ToastActionType.ClearToast)
    }

    watch(
        () => toast.value,
        (messageNew) => {
          if (messageNew) {
            window.scrollTo(0, 0)
          }
        },
    )

    return {
      HasToast,
      toast,
      clearToast,
      isOpenMenu: store.state.users.isOpen,
    }
  },
}
</script>
<style>

</style>