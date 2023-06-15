<template>
  <div class="w-full lg:w-7/12 p-10 bg-white shadow-sm border border-1 rounded-xl text-center">
    <p class="mb-6 text-xl font-light">Your Hours Worked</p>
    <Bar
      :chart-options="{responsive: true}"
      :chart-data="barChartData"
      chart-id="bar-chart"
      :width="400"
      :height="200"
    />
  </div>
</template>

<script>
import { Bar } from 'vue-chartjs'
import { Chart as ChartJS, Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale} from 'chart.js'

ChartJS.register(Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale)

export default {
  name: 'ChartManager',
  components: { Bar },
  props: {
    barChartData: {
      type: Object,
      default: () => {}
    }
  }
}
</script>