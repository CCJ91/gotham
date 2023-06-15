<template>
<div class="recordAdder container">
      <div>
        Date de début: 
        <datepicker 
          v-model="startTime"
          placeholder="Start date here"
        />
      </div>
      <div>
        Date de fin: 
        <datepicker
          v-model="endTime"
          placeholder="End date here"
        />
      </div>
      <div id="control" class="container">
        <button 
          @click="updateRecord"
        >
          Update
        </button>
        <button @click="cancelRecord">Cancel</button>
        <button 
          @click="deleteRecord"
        >
          Delete
        </button>
      </div>
    </div>
</template>

<script>

import Datepicker from '@vuepic/vue-datepicker';
import '@vuepic/vue-datepicker/dist/main.css'
import moment from 'moment'
import {reactive, toRefs} from "vue";
export default {
    name: 'WorkingTimeEdit',
    components: { Datepicker },

    emits: ['create-record', 'delete-record', 'update-record', 'cancel-record'],

    setup(props, {emit}) {

      const data = reactive({
        startTime: moment().toDate(),
        endTime: moment().toDate(),
        mode: 'update',
        id: undefined,
      })
      function cancelRecord(){
        emit('cancel-record')
      }
      function deleteRecord(){
        emit('delete-record')
      }
      function updateRecord(){
        emit('update-record',
            {
              startTime: data.startTime,
              endTime: data.endTime,
            })
      }

      return {
        ...toRefs(data),
        cancelRecord,
        deleteRecord,
        updateRecord,
      }
    },
}
</script>

<style scoped>
.container {
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  
}

.recordAdder {
  margin-top: 2%;
  background-color: grey;
  padding: 2%;
  border-radius: 10px;
}

#control {
  margin-left: 2%;
  padding: 2%;
}

#control button {
  margin: 2%;
}
</style>