<template>
  <div class="w-full lg:w-1/3 p-10 bg-white shadow-sm border border-1 rounded-xl text-center">
    <p class="mb-6 text-xl font-light">Your Day And Night Hours</p>
    <Doughnut
      :chart-options="{responsive: true}"
      :chart-data="doughnutChartData"
      chart-id="doughnut-chart"
      :width="400"
      :height="100"
      class="mx-0 sm:mx-20 md:mx-32 lg:mx-0"
    />
  </div>
</template>

<script>
import { Doughnut } from 'vue-chartjs'
import {Chart as ChartJS, ArcElement, Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale} from 'chart.js'

ChartJS.register(Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale, ArcElement)

export default {
  name: 'DoughnutChart',
  components: { Doughnut },
  props: {
    doughnutChartData: {
      type: Object,
      default: () => {}
    }
  }
}
</script>