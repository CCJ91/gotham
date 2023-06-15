<template>
  <div>
    <ChartManager :user-id="userId" />
  </div>
</template>

<script>
import ChartManager from "../components/ChartManager.vue";
import {defineComponent} from "vue";

export default defineComponent({
  name: 'ChartManagerView',
  components: {ChartManager},
  props: {
    userId: {
      type: Number,
      required: true
    }
  }
})
</script>