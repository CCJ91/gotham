<template>
  <div class="vertical-container">
    <WorkingTimesTable :user-id="userId" title="WorkingTimes" class="pt-5" :dataSet="dataSet" :onRowClick="onRowClick"/>
    <div>
      <button 
        id="addButton"
        @Click="addRecord"
      >
        Add record
      </button>
    </div>
  </div>
</template>

<script lang="ts">
import WorkingTimesTable from '../components/WorkingTimesTable.vue'
import moment from 'moment'
import {useStore} from "vuex";
import {WorkingTimeActionType} from '../store/modules/workingTime'
import {UserActionType} from '../store/modules/user'
import {computed, onMounted, reactive, toRefs} from "vue";
import router from "../router";
export default {
  name: "WorkingTimes",
  components: { WorkingTimesTable },

  props: {
    userId: {
      type:String,
      required:true
    }
  },

  setup(props: { userId: string | number; }) {

    const store = useStore()

    const data = reactive({
      isManagingRecord: false,
      mode: '',
      data: {},
      id: null
    })
    onMounted(() => {
      store.dispatch(WorkingTimeActionType.FetchAllWorkingTimes, +props.userId)
    })

    function addRecord(){
      data.mode = ''
      data.isManagingRecord = true
    }

    function cancelRecord(){
      data.isManagingRecord = false
    }

    function onRowClick(row: any){
      router.push(`/workingTime/${props.userId}/${row.id}`)
    }

    function deleteRecord(id: number){
      store.dispatch(WorkingTimeActionType.DeleteWorkingTime, id)
      data.isManagingRecord = false
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
        id: data.id,
        start: moment(dateTime.startTime).format('YYYY-MM-DD HH:mm:ss'),
        end: moment(dateTime.endTime).format('YYYY-MM-DD HH:mm:ss'),
        user: props.userId,
      }
      if(moment(payload.start).isValid() && moment(payload.end).isValid()){
        store.dispatch(WorkingTimeActionType.UpdateWorkingTime, payload)
      }
    }

    return {
      ...toRefs(data),
      addRecord,
      cancelRecord,
      onRowClick,
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