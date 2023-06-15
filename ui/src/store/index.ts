import { createStore, createLogger } from 'vuex'
import userModule from './modules/user'
import clockModule from './modules/clock'
import workingTimeModule from "./modules/workingTime";
import toastModule from "./modules/toast";
import loginModule from "./modules/login";
const debug = process.env.NODE_ENV !== 'production'

export default createStore({
    modules: {
        users: userModule,
        clocks: clockModule,
        workingTimes: workingTimeModule,
        login: loginModule,
        toast: toastModule,
    },
    strict: debug,
    plugins: debug ? [createLogger()] : [],
})
