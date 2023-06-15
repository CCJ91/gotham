<template>
  <div class="flex flex-row h-full w-full justify-end">
    <div class="w-full flex flex-col center">
      <div class="m-8">
        <h1
            class="text-3xl font-bold font-Raleway decoration-gray-400 dark:text-zinc-200 justify-center flex"
        >
          Gestion des workingTime
        </h1>
      </div>

      <div
          class="not-prose relative justify-center flex rounded-xl overflow-hidden dark:bg-dark-gray"
      >
        <div class="w-3/4 overflow-auto rounded-lg" style="height: 40rem">
          <table class="table-auto w-full">
            <thead>
            <tr>
              <th
                  class="sticky px-6 py-3 text-xs font-medium leading-4 tracking-wider text-left text-gray-500 uppercase border-b border-gray-200 bg-gray-100 dark:bg-zinc-800 dark:text-zinc-400 dark:border-zinc-400"
              >
                ID
              </th>
              <th
                  class="sticky px-6 py-3 text-xs font-medium leading-4 tracking-wider text-left text-gray-500 uppercase border-b border-gray-200 bg-gray-100 dark:bg-zinc-800 dark:text-zinc-400 dark:border-zinc-400"
              >
                Start
              </th>
              <th
                  class="sticky px-6 py-3 text-xs font-medium leading-4 tracking-wider text-left text-gray-500 uppercase border-b border-gray-200 bg-gray-100 dark:bg-zinc-800 dark:text-zinc-400 dark:border-zinc-400"
              >
                End
              </th>
              <th
                  class="sticky px-6 py-3 text-xs font-medium leading-4 tracking-wider text-left text-gray-500 uppercase border-b border-gray-200 bg-gray-100 dark:bg-zinc-800 dark:text-zinc-400 dark:border-zinc-400"
              >
                UserId
              </th>
            </tr>
            </thead>
            <tbody
                class="odd:bg-gray-100 even:bg-white dark:odd:bg-zinc-800 dark:even:bg-zinc-700"
                v-for="workinTime in workingTimes"
                :key="workinTime.id"
            >
            <tr class="dark:border-zinc-400 cursor-pointer" @click="onRowClick(workinTime)">
              <td class="text-left px-6 py-4 border-b border-gray-200">
                <div
                    class="text-sm leading-5 text-gray-500 dark:text-zinc-400"
                >
                  {{ workinTime.id }}
                </div>
              </td>

              <td class="text-left px-6 py-4 border-b border-gray-200">
                <div
                    class="text-sm leading-5 text-gray-500 dark:text-zinc-400"
                >
                  {{structureTime(workinTime.start)}}
                </div>
              </td>

              <td class="text-left px-6 py-4 border-b border-gray-200">
                <div
                    class="text-sm leading-5 text-gray-500 dark:text-zinc-400"
                >
                  {{ structureTime(workinTime.end) }}
                </div>
              </td>

              <td class="text-left px-6 py-4 border-b border-gray-200">
                <div
                    class="text-sm leading-5 text-gray-500 dark:text-zinc-400"
                >
                  {{ workinTime.user }}
                </div>
              </td>
            </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  </div>
  </template>
  
  <script>
  import moment from 'moment'
  import {computed, onMounted} from "vue";
  import {useStore} from "vuex";
  import {WorkingTimeActionType} from "../store/modules/workingTime";

  export default {
    name: "WorkingTimesTable",
    props: {
      title: {
        type: String,
        required: false,
        default() {
          return "titre"
        },
      },
      dataSet: {
        type: Array,
        required: true
      },
      onRowClick: {
        type: Function,
        required: true
      },
      userId: {
        type: String,
        required: true
      }
    },

    setup(props) {
      const store = useStore()

      onMounted(() => {
        store.dispatch(WorkingTimeActionType.FetchAllWorkingTimes, +props.userId)
      })
      function structureTime(time){
        return time.replace('T', ' ')
      }
      return {
        structureTime,
        workingTimes: computed(() => store.state.workingTimes.workingTimes),
      }
    },
    methods: {
      dateFormat(date) {
        return moment(date).format("DD-MM-YYYY HH:mm")
      },
      shiftTime(start, end) {
        return moment(end).diff(moment(start), "hours") + " hours"
      },
    },
  }
  </script>
  
  <style scoped>
  
  </style>