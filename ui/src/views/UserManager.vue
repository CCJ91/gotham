<template>
<div>
  <!-- <h2 v-if="selectedUser!=''" class="message">{{message}}</h2>-->
    <div class="w-90">
      <User @selectUser="createMessage"/>

    </div>
  </div>

</template>

<script lang="ts">
import User from '../components/User.vue';
import {useStore} from "vuex";
import {computed, onMounted, reactive, toRefs} from "vue";
import {UserActionType} from "../store/modules/user";
import ClockManager from "../components/ClockManager.vue";
import {LoginActionType} from "../store/modules/login";

export default {
  name: 'App',
  components: {
    User,
    ClockManager,
  },

  setup() {
    const store = useStore()

    return {
      currentUser: computed(() => store.state.users.user)
    }
  },
}
</script>
<style>
</style>