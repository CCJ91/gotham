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
                User
              </th>
              <th
                  class="sticky px-6 py-3 text-xs font-medium leading-4 tracking-wider text-left text-gray-500 uppercase border-b border-gray-200 bg-gray-100 dark:bg-zinc-800 dark:text-zinc-400 dark:border-zinc-400"
              />
            </tr>
            </thead>
            <tbody
                class="odd:bg-gray-100 even:bg-white dark:odd:bg-zinc-800 dark:even:bg-zinc-700"
                v-for="workinTime in workingTimes"
                :key="workinTime.id"
            >
            <tr class="dark:border-zinc-400">
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

              <td
                  class="text-leftpx-6 py-4 border-b border-gray-200 sticky px-6 py-3 text-xs font-medium leading-4 tracking-wider text-center text-gray-500 uppercase border-b border-gray-200 dark:text-zinc-400"
              >
                <button
                    class="flex items-center p-2.5 rounded-lg hover:bg-red-100"
                    @click="deleteWorkingTime(workinTime)"
                >
                  <svg
                      class="w-6 h-6 text-red-400 hover:text-red-500 relative text-gray-900 transition duration-75"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                      xmlns="http://www.w3.org/2000/svg"
                      stroke-width="2"
                  >
                    <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0"
                    />
                  </svg>
                </button>
              </td>
            </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent, onMounted } from 'vue'
import { useStore } from 'vuex'
import {WorkingTime} from "../models/WorkingTime";
import {WorkingTimeActionType} from "../store/modules/workingTime";

export default defineComponent({
  name: 'AdminWorkingTime',

  setup() {
    const store = useStore()

    onMounted(() => {
      store.dispatch(WorkingTimeActionType.FetchAllWorkingTimesForCharts)
    })

    function deleteWorkingTime(workingTime: WorkingTime) {
      store.dispatch(WorkingTimeActionType.DeleteWorkingTime, workingTime.id)
    }
    function structureTime(time:any){
      let newTime=time.replace('T', ' ')
      return newTime
    }
    return {
      deleteWorkingTime,
      workingTimes: computed(() => store.state.workingTimes.workingTimes),
      structureTime,
    }
  },
})
</script>

<style scoped></style>
