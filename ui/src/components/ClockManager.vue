<template>
  <div style="width: 100%; height: 100%"  class="clock-container">
 <form v-if="clocks.length!=0" class="form">
   <label><strong class="font-bold">Time:</strong>{{transformTime(clocks.time)}}</label><p></p>
   <label class="font-bold">Status:</label><br>
   <label v-if="clocks.status==true" for="yellow-toggle" class="inline-flex relative items-center  cursor-pointer">
     <input @click="createClock" type="checkbox" value="{{clocks.status}}" id="yellow-toggle" class="sr-only peer" checked>
     <div class="w-11 h-6 bg-gray-400 rounded-full peer dark:bg-gray-700 peer-focus:ring-4 peer-focus:ring-yellow-300 dark:peer-focus:ring-yellow-800 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-yellow-400"></div>
     <span class="ml-3 text-sm font-medium text-gray-900 dark:text-gray-300">Active</span>
   </label>

   <label v-if="clocks.status!=true" for="yellow-toggle" class="inline-flex relative items-center  cursor-pointer">
     <input @click="createClock" type="checkbox" value="{{clocks.status}}" id="yellow-toggle" class="sr-only peer" >
     <div class="w-11 h-6 bg-gray-400 rounded-full peer dark:bg-gray-700 peer-focus:ring-4 peer-focus:ring-yellow-300 dark:peer-focus:ring-yellow-800 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-yellow-400"></div>
     <span class="ml-3 text-sm font-medium text-gray-900 dark:text-gray-300">Inactive</span>
   </label>
 </form>

 <form v-if="clocks.length===0" class="form">
   <label class="text-black font-bold">Clock empty</label><br>
   <button class="rounded-3xl p-1 bg-yellow-500 font-bold" @click="createClock" type="submit">Start</button>
 </form>
 </div>
  </template>
  

<script>
import {computed, defineComponent, onMounted, reactive} from "vue";
import {useStore} from "vuex";
import {ClockActionType} from "../store/modules/clock.ts";
import clockService from "../services/clock.service.ts";
import ClockService from "../services/clock.service.ts";

export default defineComponent( {
  name: "ClockManager",
  props: {userId:{type:Number, required:true}},

setup(props) {
    const store = useStore()
    const data = reactive({
      time: '',
      userId:props
    })

    onMounted(() => {
      store.dispatch(ClockActionType. FetchClockByUserId, props.userId)
      
    })

    function getClock(clocks){
      data.time=clocks.time.replace('T', ' ')
      data.status=clocks.status
    }
  function createClock(){
    let payload={user:props.userId}
    store.dispatch(ClockActionType.CreateClock, payload)
    store.dispatch(ClockActionType.FetchClockByUserId, props.userId)
  }
function transformTime(clocks){
let time=new Date(clocks)
let jour= time.getDate()
let mois= time.getMonth()
let annee=time.getFullYear()
let day=time.getDay()
let jourSemaine=''
let stringMonth=''
let hours=time.getHours()
let min=time.getMinutes()
let seconde=time.getSeconds()
if(seconde<=9){
  seconde='0'+seconde
}
if(min<=9){
  min='0'+min
}
if(hours<=9){
  hours='0'+hours
}
switch (day) {
  case 0:
    jourSemaine='Dimanche'
    break;
  case 1:
    jourSemaine='Lundi'
    break;
  case 2:
  jourSemaine='Mardi'
    break;
  case 3:
  jourSemaine='Mercredi'
    break;
    case 4:
  jourSemaine='Jeudi'
    break;
    case 5:
  jourSemaine='Vendredi'
    break;
    case 6:
  jourSemaine='Samedi'
    break;
}
switch (mois) {
  case 1:
    stringMonth='Jan'
    break;
  case 2:
  stringMonth='Fev'
    break;
  case 3:
  stringMonth='Mars'
    break;
    case 4:
  stringMonth='Avr'
    break;
    case 5:
  stringMonth='Mai'
    break;
    case 6:
  stringMonth='Jun'
    break;
    case 7:
  stringMonth='Juil'
    break;
    case 8:
  stringMonth='Aout'
    break;
    case 9:
  stringMonth='Sept'
    break;
    case 10:
  stringMonth='Oct'
    break;
    case 11:
  stringMonth='Nov'
    break;
    case 12:
  stringMonth='Dec'
    break;
}
return ` ${jourSemaine} ${jour} ${stringMonth}, ${hours}:${min}:${seconde}`
}
    
    return {
      clocks: computed(() => store.state.clocks.clock),
    createClock,
    getClock, 
    transformTime
    }
  }
})


</script>

<style scoped>




</style>