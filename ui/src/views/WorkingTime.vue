<template>
  <div class="vertical-container">
    <WorkingTimeEdit
        @cancelRecord="cancelRecord"
        @delete-record="deleteRecord"
        @update-record="updateRecord"
    />
  </div>
</template>

<script lang="ts">
import WorkingTimeEdit from '../components/WorkingTimeEdit.vue'
import moment from 'moment'
import {useStore} from "vuex";
import {WorkingTimeActionType} from '../store/modules/workingTime'
import {computed, onMounted, reactive, toRefs} from "vue";
import router from "../router";
export default {
  name: "WorkingTime",
  components: { WorkingTimeEdit },
  
  props: {
    userId: {
      type:String,
    },
    workingTimeId: {
      type:Number,
    }
  },

  setup(props: any) {

    const store = useStore()

    const data = reactive({
      mode: '',
      data: {},
      id: null
    })
    onMounted(() => {
      store.dispatch(WorkingTimeActionType.FetchAllWorkingTimes, +props.userId)
    })

    function cancelRecord(){
      router.push('/')
    }

    function deleteRecord(id: number){
      store.dispatch(WorkingTimeActionType.DeleteWorkingTime, props.workingTimeId)
      router.push('/')
    }

    function createRecord(dateTime: any){
      const payload = {
        start: moment(dateTime.startTime).format('YYYY-MM-DD HH:mm:ss'),
        end: moment(dateTime.endTime).format('YYYY-MM-DD HH:mm:ss'),
        user: +props.userId
      }
      if(moment(payload.start).isValid() && moment(payload.end).isValid()){
        store.dispatch(WorkingTimeActionType.CreateWorkingTime, payload)
      }
    }

    function updateRecord(dateTime: any){
      const payload = {
        id: props.workingTimeId,
        start: moment(dateTime.startTime).format('YYYY-MM-DD HH:mm:ss'),
        end: moment(dateTime.endTime).format('YYYY-MM-DD HH:mm:ss'),
        user: +props.userId,
      }
      if(moment(payload.start).isValid() && moment(payload.end).isValid()){
        store.dispatch(WorkingTimeActionType.UpdateWorkingTime, payload)
      }
    }

    return {
      ...toRefs(data),
      cancelRecord,
      deleteRecord,
      createRecord,
      updateRecord,
      dataSet: computed(() => store.state.workingTimes.workingTimes),
      user: computed(() => store.state.users.user)
    }
  },
}
</script>

<style scoped>
.vertical-container {
  display: flex;
  flex-direction: column;
  align-items: center;
}

#addButton {
  margin-top: 2%;
}
</style>