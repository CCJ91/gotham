<template>
  <div class="w-80 mx-auto ">
    <div>
      <div class="text-center bg-yellow-500 rounded-3xl border mx-auto shadow-lg max-w-xl mb-3 mt-2">
    <form @submit.prevent="selectAnUSer">
    <label class="font-bold text-lg">Choisir user:</label>
  <select class="border rounded-3xl w-3/4 m-3 text-center" v-model="selectedUser">
    <option v-for="user in users" :key="user.id" v-bind:value="user">{{user.username}}</option>
  </select>
  <button class="font-bold border border-amber-700 rounded-3xl p-1 bg-amber-400 m-1 hover:bg-amber-300" @click="getClock" type="submit">Confirm</button>
</form>
    </div>
  </div>
  </div>
  <!---Firs Card-->
    <div class="flex items-start w-full space-x-5">
    <div v-if="valider==true" class="flex items-center justify-center w-50 ">
    <div class="bg-white font-semibold text-center rounded-3xl border shadow-lg max-w-xl">
      <img class="mb-3 mx-auto w-2/5" src="https://media.forbiddenplanet.com/products/13/4d/933b76f34e3a4ac2a548af3e0626db59da9a.png" alt="product designer">
      <h1 v-if="valider" class="text-xl text-gray-800" v-text="username"></h1>
      <h3 v-if="valider" class="text-base text-gray-600" v-text="email"></h3>
      <h3 v-if="valider" class="text-base text-gray-500" v-text="role"></h3>
      <div v-if="valider">
        <div class="mt-10">
          <ClockManager :user-id="selectedId"/>
        </div>
        <details class="bg-gray-400 open:bg-amber-400 duration-300 rounded-3xl">
          <summary class="bg-inherit px-5 py-3 text-lg cursor-pointer">Modify my info</summary>
          <div class="bg-white px-5 py-3 border border-gray-300 text-lg font-light rounded-3xl">
            <form class="flex flex-col items-center">
              <label class="font-bold">Username:</label>
              <input v-model="username" class="shadow hover:bg-gray-100 appearance-none border rounded-3xl w-full p-2 mb-5 text-center sm:w-52 lg:w-1/2 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"  type="text" >
              <label class="font-bold">Email:</label>
              <input v-model="email" class="shadow hover:bg-gray-100 appearance-none border rounded-3xl w-full p-2 mb-5 text-center sm:w-52 lg:w-1/2 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"  type="email" >
              <label class="font-bold">Password:</label>
              <input v-model="password" id="password" class="shadow hover:bg-gray-100 appearance-none border sm:w-52 lg:w-1/2 rounded-3xl text-center w-full m-1 mb-2 p-2 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"  type="password" > 
              <i class="fa-solid fa-eye mb-5 hover:text-gray-600" @click="switchVisibility" id="eye"></i>
              <div>
                <button class="border rounded-3xl p-1 bg-yellow-500 m-1 font-bold"  @click="updateUser" type="submit">Modify</button>
                <button class="border rounded-3xl p-1 bg-yellow-500 m-1 font-bold" @click="deleteUser" type="submit">Delete</button>

              </div>
              
            </form>
          </div>
        </details>
    </div>
  </div>
  </div>
  <!---Second Card-->
        <div class="bg-white font-semibold text-center rounded-3xl border shadow-lg max-w-xl" >
          <img class="mb-3 mx-auto w-2/5 " src="https://media.forbiddenplanet.com/products/13/4d/933b76f34e3a4ac2a548af3e0626db59da9a.png" alt="product designer">
                <form class="w-7/12 m-auto">
                 <div class="flex flex-row">
                    <label class="basis-1/2">Username:</label>
                    <input v-model="usernamecreate" class=" basis-1/2 shadow appearance-none border rounded-3xl w-3/4 m-1 p-1 text-gray-700 hover:bg-gray-100 leading-tight focus:outline-none focus:shadow-outline"  type="text" ><br>
                  </div>
                  <div class="flex flex-row">
                    <label class="basis-1/2">Email:</label>
                    <input v-model="emailcreate" class="basis-1/2 shadow appearance-none border rounded-3xl w-3/4 m-1 p-1 text-gray-700 hover:bg-gray-100 leading-tight focus:outline-none focus:shadow-outline"  type="email" ><br>
                  </div>
                  <div class="flex flex-row">
                    <label class="basis-1/2">Teams:</label>
                    <select class="basis-1/2 shadow border hover:bg-gray-100 rounded-3xl w-3/4 m-1 p-0.5 text-center" id="select" v-model="teamscreate">
                    <option  v-for="manager in managers" :key="manager.role" v-bind:value="[manager.id]">{{manager.username}}</option>
                    </select><br>
                  </div>
                <div class="flex flex-row">
                   <label class="basis-1/2">Role:</label>
                   <select class="basis-1/2 shadow border hover:bg-gray-100 rounded-3xl w-3/4 m-1 p-0.5 text-center" v-model="rolecreate" id="select">
                   <option value=ADMIN>Admin</option>
                   <option value=USER>User</option>
                   </select><br>
                </div>
                  <div class="flex flex-row">
                    <label class="basis-1/2">Password:</label>
                    <input v-model="passwordcreate" class="basis-1/2 hover:bg-gray-100 shadow appearance-none border rounded-3xl w-50 p-1 m-1 w-3/4 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"  type="text" ><br>
                  </div>
                  <div>
                    <button class="rounded-3xl bg-yellow-500 font-bold p-1 m-1 w-1/4" @click="createUser" type="submit">Create</button>
                  </div>
                </form>
          </div>
        </div>
  </template>

<script lang="ts">
import ClockManager from "../components/ClockManager.vue";
import { computed, reactive, onMounted, toRefs, defineComponent, ref } from 'vue'
import { useStore } from 'vuex'
import {UserActionType} from "../store/modules/user";
import {ClockActionType} from "../store/modules/clock";


export default defineComponent( {
  name: "User",
  components: {ClockManager},
  emits:['selectUser'],
  methods: {
    switchVisibility() {
      this.passwordFieldType = this.passwordFieldType === "password" ? "text" : "password";
    }
    },

  setup(props,{emit}) {
    const store = useStore();
    let usernamecreate = '';
    let emailcreate = '';
    let teamscreate = '';
    let rolecreate = '';
    let passwordcreate = '';

    const data = reactive({
      selectedUser: {id:0,username:'', email:'',role:'',password:'',teams:''},
      selectedId:0,
      username: '',
      email: '',
      role:'',
      password:'',
      teams:'',
      valider:false,
      usernamecreate,
      teamscreate,
      rolecreate,
      passwordcreate,
      emailcreate,
      passwordFieldType: "password"
    })

    function getClock(){
      data.selectedId=data.selectedUser.id
      store.dispatch(UserActionType.FetchUserById, data.selectedUser.id)
      store.dispatch(ClockActionType. FetchClockByUserId, data.selectedUser.id)

    }
    function selectAnUSer(){
      data.username=data.selectedUser.username
      data.email=data.selectedUser.email
      data.selectedId=data.selectedUser.id
      data.role=data.selectedUser.role
      data.teams=data.selectedUser.teams
      data.password=data.selectedUser.password
      data.valider=true
      emit('selectUser', data.selectedUser.username)
    }
    function createUser(){
      let payload={username:data.usernamecreate, email:data.emailcreate,role:data.rolecreate, teams:data.teamscreate, password:data.passwordcreate}
      store.dispatch(UserActionType.createUser, payload)
      data.usernamecreate = ""
      data.emailcreate = ""
      data.passwordcreate = ""
      data.teamscreate = ""
      data.rolecreate = ""


    }
    function updateUser(){
    let payload={id:data.selectedId,username:data.username, email:data.email,role:data.role, teams:data.teams, password:data.password}
    store.dispatch(UserActionType.UpdateUser, payload)
    store.dispatch(UserActionType.FetchAllUsers)
      data.selectedUser={id:data.selectedId, username:data.username, email:data.email,role:data.role, teams:data.teams, password:data.password}
    emit('selectUser', data.selectedUser.username)
    }
    function deleteUser(){
      let selectedId=data.selectedId
      store.dispatch(UserActionType.deleteUser, selectedId)
      data.valider=false
      data.username=''
      data.email=''
      data.role=''
      data.teams=''
      data.password=''
      data.selectedUser={id:0, username:'', email:'',role:'',password:'',teams:''}
      emit('selectUser', '')
      store.dispatch(UserActionType.FetchAllUsers)
    }
    return {
      ...toRefs(data),
      users: computed(() => store.state.users.users),
      selectAnUSer,
      createUser, 
      updateUser, 
      deleteUser,
      getClock,
      managers: computed(() => store.state.users.users.filter((i: { role: string; })=>i.role==="ADMIN")),

    }
  }
})
</script>

<style scoped>



</style>