import { Clock } from '../../models/Clock'
import clockService from "../../services/clock.service";
import {Commit} from "vuex";
import {User} from "../../models/User";
import {AppError} from "../../models/AppError";
import {ToastMutationType} from "./toast";
import {buildToastFromAppError} from "../../helpers/toast-builder";

interface ClockState {
    clock: Clock
}

enum MutationType {
    SetClocks = 'SET_CLOCK',
    AddClock = 'ADD_CLOCK',
}

export enum ClockMutationType {
    SetClock = 'clocks/SET_CLOCK',
}

enum ActionType {
    FetchAllClocks = 'FETCH_ALL_CLOCK',
    FetchClockByUserId = 'FETCH_CLOCK_BY_ID',
    UpdateClock = 'UPDATE_CLOCK',
    CreateClock = 'CREATE_CLOCK',
}

export enum ClockActionType {
    FetchAllClocks = 'clocks/FETCH_ALL_CLOCKS',
    FetchClockByUserId = 'clocks/FETCH_CLOCK_BY_ID',
    UpdateClock = 'clocks/UPDATE_clock',
    CreateClock = 'clocks/CREATE_CLOCK',
}

export default {
    namespaced: true,

    state: {
        clock:[]
    },


    getters: {},
    mutations: {
        [MutationType.SetClocks](state: ClockState, clock: Clock): void {
            state.clock = clock
        },
        [MutationType.AddClock](state: ClockState, clock: Clock): void {
           // state.clock.push(clock)
        },
    },
    actions: {
        [ActionType.FetchClockByUserId]({ commit }: { commit: Commit }, userId: number): void {
            clockService
                .getClockById(userId)
                .then((response: Clock) =>
                    commit(MutationType.SetClocks, response),
                )
                .catch((err: AppError) => {
                        console.error('test')
                        commit(ToastMutationType.SetToast, buildToastFromAppError(err, 'No clock available for this user'), {
                            root: true,
                        })
                    }
                )
        },
       //[ActionType.UpdateClock]({ commit }: { commit: Commit }, clock:{time:string, status:boolean, userId: number}): void {
       //    clockService
       //        .updateClock(clock.time, clock.status,clock.userId)
       //        .then((response: Clock) =>
       //            commit(MutationType.SetClocks, response),
       //        )
       //        .catch((err: Error) =>
       //            console.error(err)
       //        )
       //},
        [ActionType.CreateClock]({ commit }: { commit: Commit },clock:{time:string, user:number}): void {
            clockService
                .createClock(clock.time, clock.user)
                .then((response:Clock) =>
                    commit(MutationType.AddClock, response),
                )
                .catch((err: AppError) => {
                        console.error('test')
                        commit(ToastMutationType.SetToast, buildToastFromAppError(err, "Can't create clock"), {
                            root: true,
                        })
                    }
                )
        },
    },
}