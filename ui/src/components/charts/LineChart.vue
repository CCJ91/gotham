<template>
  <div class="w-full mb-4 p-10 bg-white shadow-sm border border-1 rounded-xl text-center">
    <p class="mb-6 text-xl font-light">Hours Worked By You And Average Teams</p>
    <Line
      :chart-options="{responsive: true}"
      :chart-data="lineChartData"
      chart-id="line-chart"
      :width="400"
      :height="100"
    />
  </div>
</template>

<script>
import { Line } from 'vue-chartjs'
import {BarElement, CategoryScale, Chart as ChartJS, Legend, LinearScale, LineElement, Title, Tooltip, PointElement} from 'chart.js'

ChartJS.register(Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale, LineElement, PointElement)

export default {
  name: 'LineChart',
  components: { Line },
  props: {
    lineChartData: {
      type: Object,
      default: () => {}
    },
  }
}
</script>