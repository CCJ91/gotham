<template>
  <div class="min-h-screen">
    <Navbar :login="true"/>
    <div class="flex flex-row-reverse pt-16 h-screen w-full mr-10">
      <Menu v-if="isOpenMenu"></Menu>
      <Suspense>
        <router-view class="flex w-full justify-center"
                     :key="$route.path"
        />
      </Suspense>
    </div>
  </div>
</template>
    
<script>
import {computed, defineComponent } from "vue";
import Navbar from "../components/Navbar.vue";
import Menu from "../components/Menu.vue";
import {useStore} from "vuex";

export default defineComponent({
  name: 'Home',
  components: {Navbar, Menu},

  setup() {
    const store = useStore()

    return {
      isOpenMenu: computed(() => store.state.users.isOpen),
    }
  }
})
</script>

<style scoped>

</style>