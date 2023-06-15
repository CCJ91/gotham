<template>
    <div class="flex flex-col py-10 px-20">
        <p class="text-3xl font-semibold text-center">Chart Manager</p>
        <div v-if="years.length">
            <div class="my-6 flex justify-center">
                <select @change="onSelectYear">
                    <option v-for="year in years" :value="year">{{year}}</option>
                </select>
            </div>
            <div class="mb-4 lg:mb-10 flex flex-col space-y-4 lg:space-y-0 lg:flex-row justify-between">
                <BarChart :bar-chart-data="barChartData" />
                <DoughnutChart :doughnut-chart-data="doughnutChartData" />
            </div>
            <LineChart :lineChartData="lineChartData" />
        </div>
        <div v-else>
            <p class="text-center mt-10">No data found for this user.</p>
        </div>
    </div>
</template>

<script>
import BarChart from "./charts/BarChart.vue";
import LineChart from "./charts/LineChart.vue";
import DoughnutChart from "./charts/DoughnutChart.vue";
import {intervalToDuration} from "date-fns";
import {computed, onMounted, reactive} from "vue";
import {useStore} from "vuex";
import {WorkingTimeActionType} from "../store/modules/workingTime";
import {UserActionType} from "../store/modules/user";

export default {
    name: 'ChartManager',
    components: { DoughnutChart, LineChart, BarChart },
    props: {
      userId: {
        type: Number,
        required: true
      }
    },
    setup(props) {
        const store = useStore();
        const data = reactive({
            selectedYear: ''
        });
        onMounted(() => {
          store.dispatch(WorkingTimeActionType.FetchAllWorkingTimesForCharts)
          store.dispatch(UserActionType.FetchTeams, props.userId)
        })
        const workingtimes = computed(() => store.state.workingTimes.workingTimes);
        const teams = computed(() => store.state.users.teams);
        const role = computed(() => store.state.login.loginUserRights);

        const workingtimesOfConnectedUser = computed(() => workingtimes.value.filter(x => x.user === props.userId));
        const years = computed(() => (workingtimesOfConnectedUser.value).reduce((acc, x) => {
            !acc.includes(parseInt(x.start.split('-')[0])) && acc.push(parseInt(x.start.split('-')[0]));
            return acc;
        }, []).sort().reverse());
        const onSelectYear = (e) => {
          data.selectedYear = e.target.value;
        }
        const selectedYearWorkingtimesOfUserConnected = computed(() => workingtimesOfConnectedUser.value.filter(x => parseInt(x.start.split('-')[0]) === parseInt(data.selectedYear)));
        const selectedYearWorkingtimesOfAllUsers = computed(() => workingtimes.value.filter(x => parseInt(x.start.split('-')[0]) === parseInt(data.selectedYear)));
        const hoursWorkedByMonthByTeams = computed(() => {
            const res = [];
            const colors = ['#da4856', '#9f6cf5', '#35abdc', '#f6ca3a'];
            teams.value.map((t, i) => {
                let init = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
                const usersOfTeams = Object.values(t)[0];
                selectedYearWorkingtimesOfAllUsers.value.filter(w => usersOfTeams.includes(w.user)).map(w => {
                    const month = parseInt(w.start.split('-')[1]);
                    init[month - 1] += intervalToDuration({start: Date.parse(w.start), end: Date.parse(w.end)}).hours;
                });
                res.push({
                    label: `Team ${Object.keys(t)[0]}`,
                    backgroundColor: colors[i],
                    borderColor: colors[i],
                    data: init.map(w => w / usersOfTeams.length)
                });
            });
            return res;
        });
        const hoursWorkedByMonthByConnectedUser = computed(() => {
            let hours = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
            let dayOrNight = [0, 0];
            selectedYearWorkingtimesOfUserConnected.value.map(w => {
                const month = parseInt(w.start.split('-')[1]);
                const interval = intervalToDuration({start: Date.parse(w.start), end: Date.parse(w.end)});
                const startDate = new Date(w.start);
                const startDay = new Date(Date.UTC(startDate.getFullYear(), startDate.getMonth(), startDate.getDate(), 7, 0, 0))
                const startNight = new Date(Date.UTC(startDate.getFullYear(), startDate.getMonth(), startDate.getDate(), 21, 0, 0))
                const endDate = new Date(w.end);
                const startHours = startDate.getHours();
                const endHours = endDate.getHours();
                if (startHours < 7) {
                    if (endHours < 7) {
                        dayOrNight[1] += intervalToDuration({start: startDate, end: endDate}).hours;
                    } else if (7 <= endHours &&  endHours <= 21) {
                        dayOrNight[1] += intervalToDuration({start: startDate, end: startDay}).hours;
                        dayOrNight[0] += intervalToDuration({start: startDay, end: endDate}).hours;
                    } else if (21 < endHours) {
                        dayOrNight[1] += intervalToDuration({start: startDate, end: startDay}).hours;
                        dayOrNight[0] += intervalToDuration({start: startDay, end: startNight}).hours;
                        dayOrNight[1] += intervalToDuration({start: startNight, end: endDate}).hours;
                    }
                } else if (7 <= startHours && startHours <= 21) {
                    if (21 < endHours) {
                        dayOrNight[0] += intervalToDuration({start: startDate, end: startNight}).hours;
                        dayOrNight[1] += intervalToDuration({start: startNight, end: endDate}).hours;
                    } else {
                        dayOrNight[0] += intervalToDuration({start: startDate, end: endDate}).hours;
                    }
                } else {
                    dayOrNight[1] += intervalToDuration({start: startDate, end: endDate}).hours;
                }
                hours[month - 1] += interval.hours;
            })
          return {hours, dayOrNight}
        });
        const additionalHours = computed(() => {
          let normal = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
          let additional = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
          hoursWorkedByMonthByConnectedUser.value.hours.map((h, i) => {
            if (h > 140) {
              additional[i] = h - 140;
              normal[i] = 140;
            } else {
              normal[i] = h;
            }
          })
          return {normal, additional};
        });
        const labels = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
        let barChartData = computed(() => {
            return { labels, datasets: [
                { label: 'Normal Hours', data: additionalHours.value.normal, backgroundColor: ['#e1ad15'], stack: 'Stack 0'},
                { label: 'Additional Hours', data: additionalHours.value.additional, backgroundColor: ['#f57526'], stack: 'Stack 0'}
              ] }
        });
        const doughnutChartData = computed(() => {
            return { labels: ['Day', 'Night'], datasets: [{ data: hoursWorkedByMonthByConnectedUser.value.dayOrNight, backgroundColor: ['#e1ad15', '#1f74ab'] }] }
        });
        const lineChartData = computed(() => {
            return { labels, datasets: [
                { label: 'You', backgroundColor: '#63cea7', borderColor: '#63cea7', data: hoursWorkedByMonthByConnectedUser.value.hours },
                ...hoursWorkedByMonthByTeams.value
            ] }
        });
        setTimeout(() => {
          data.selectedYear = years.value[0]
        }, 1000);
        return {
            barChartData,
            doughnutChartData,
            lineChartData,
            years,
            role,
            onSelectYear,
        }
    }
}
</script>