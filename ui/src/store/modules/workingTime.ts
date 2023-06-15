import { WorkingTime } from '../../models/WorkingTime';
import { apiResponse } from '../../services/workingTime.service';
import {Commit} from 'vuex';
import workingTimeService from '../../services/workingTime.service';
import router from "../../router";
import {AppError} from "../../models/AppError";
import {ToastMutationType} from "./toast";
import {buildToastFromAppError} from "../../helpers/toast-builder";

interface WorkingTimeState {
    workingTimes: WorkingTime[]
}

enum MutationType {
    FetchAllWorkingTimes = 'FETCH_ALL_WORKING_TIMES',
    FetchAllWorkingTimesForCharts = 'FETCH_ALL_WORKING_TIMES_FOR_CHARTS',
    DeleteWorkingTime = 'DELETE_WORKING_TIME',
    CreateWorkingTime = 'CREATE_WORKING_TIME',
    UpdateWorkingTime = 'UPDATE_WORKING_TIME',
}

enum ActionType {
    FetchAllWorkingTimes = 'FETCH_ALL_WORKING_TIMES',
    FetchAllWorkingTimesForCharts = 'FETCH_ALL_WORKING_TIMES_FOR_CHARTS',
    UpdateWorkingTime = 'UPDATE_WORKING_TIME',
    DeleteWorkingTime = 'DELETE_WORKING_TIME',
    CreateWorkingTime = 'CREATE_WORKING_TIME',
}

export enum WorkingTimeActionType {
    FetchAllWorkingTimes = 'workingTimes/FETCH_ALL_WORKING_TIMES',
    FetchAllWorkingTimesForCharts = 'workingTimes/FETCH_ALL_WORKING_TIMES_FOR_CHARTS',
    CreateWorkingTime = 'workingTimes/CREATE_WORKING_TIME',
    UpdateWorkingTime = 'workingTimes/UPDATE_WORKING_TIME',
    DeleteWorkingTime = 'workingTimes/DELETE_WORKING_TIME',
}

export default {
    namespaced: true,

    state: {
        workingTimes: []
    } as WorkingTimeState,

    getters: {},
    mutations: {
        [MutationType.FetchAllWorkingTimes](state: WorkingTimeState, response: WorkingTime[]): void {
            state.workingTimes = response
        },
        [MutationType.FetchAllWorkingTimesForCharts](state: WorkingTimeState, response: WorkingTime[]): void {
            state.workingTimes = response
        },
        [MutationType.DeleteWorkingTime](state: WorkingTimeState, id: number): void {
           state.workingTimes = state.workingTimes.filter(workingTime => workingTime.id !== id)
        },
        [MutationType.CreateWorkingTime](state: WorkingTimeState, response: WorkingTime): void {
            state.workingTimes.push(response)
        },
        [MutationType.UpdateWorkingTime](state: WorkingTimeState, response: WorkingTime): void {
            state.workingTimes = state.workingTimes.map(workingTime => {
                return workingTime.id === response.id
                ? response : workingTime;
            })
        },
    },
    actions: {
        [ActionType.FetchAllWorkingTimes]({ commit }: { commit: Commit }, userId: number): void {
            workingTimeService.getWorkingTimesByUserId(userId)
                .then((response: WorkingTime) =>
                commit(MutationType.FetchAllWorkingTimes, response),
            )
                .catch((err: AppError) => {
                        console.error('test')
                        commit(ToastMutationType.SetToast, buildToastFromAppError(err, "Can't get working times for this user"), {
                            root: true,
                        })
                    }
                )
        },
        [ActionType.FetchAllWorkingTimesForCharts]({ commit }: { commit: Commit }): void {
            workingTimeService.getAllWorkingTimes()
                .then((response: WorkingTime) =>
                    commit(MutationType.FetchAllWorkingTimesForCharts, response)
            )
                .catch((err: AppError) => {
                        console.error('test')
                        commit(ToastMutationType.SetToast, buildToastFromAppError(err, "Can't get working times"), {
                            root: true,
                        })
                    }
                )
        },
        [ActionType.DeleteWorkingTime]({ commit }: { commit: Commit}, id: number): void {
            workingTimeService.delete(id)
                .then(() =>
                    commit(MutationType.DeleteWorkingTime, id)
            )
                .catch((err: AppError) => {
                        console.error('test')
                        commit(ToastMutationType.SetToast, buildToastFromAppError(err, "Error deleting working time"), {
                            root: true,
                        })
                    }
                )
        },
        [ActionType.CreateWorkingTime]({ commit }: { commit: Commit}, workingTime: WorkingTime): void {
            workingTimeService.create(workingTime)
                .then((response: WorkingTime) =>
                    commit(MutationType.CreateWorkingTime, response)
            )
                .catch((err: AppError) => {
                        console.error('test')
                        commit(ToastMutationType.SetToast, buildToastFromAppError(err, "error creating working time"), {
                            root: true,
                        })
                    }
                )
        },
        [ActionType.UpdateWorkingTime]({ commit }: { commit: Commit}, workingTime: WorkingTime): void {
            workingTimeService.update(workingTime)
                .then((response: WorkingTime) => {
                    commit(MutationType.UpdateWorkingTime, response),
                        router.push('/')
                }
            )
                .catch((err: AppError) => {
                        console.error('test')
                        commit(ToastMutationType.SetToast, buildToastFromAppError(err, "error updating working time"), {
                            root: true,
                        })
                    }
                )
        },
    }
}
