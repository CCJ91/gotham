import { Commit } from 'vuex'
import { Toast, ToastLevel } from '../../models/Toast'

// typage des objets du store
interface ToastState {
    toast: Toast
}

// mutation type = nom des mutations & nom namespaces
enum MutationType {
    SetToast = 'SET_TOAST',
}
export enum ToastMutationType {
    SetToast = 'toast/SET_TOAST',
}

// getters type = nom des action & nom namespaces
enum ActionType {
    ClearToast = 'CLEAR_TOAST',
    PushToast = 'PUSH_TOAST',
}
export enum ToastActionType {
    ClearToast = 'toast/CLEAR_TOAST',
    PushToast = 'toast/PUSH_TOAST',
}

// getters type = nom des getters & nom namespaces
enum GetterType {
    HasToast = 'HAS_TOAST',
}
export enum ToastGetterType {
    HasToast = 'toast/HAS_TOAST',
}

// store en lui même
export default {
    namespaced: true,
    // state avec init par défaut des objets du store
    state: {
        toast: { message: '', level: ToastLevel.WARN } as Toast,
    } as ToastState,

    // getters
    getters: {
        // hasToast
        [GetterType.HasToast](state: ToastState): boolean {
            return state.toast.message !== ''
        },
    },

    // mutations
    mutations: {
        // setToast
        [MutationType.SetToast](state: ToastState, toast: Toast): void {
            state.toast = toast
        },
    },

    // actions
    actions: {
        // clearToast
        [ActionType.ClearToast]({ commit }: { commit: Commit }) {
            commit(MutationType.SetToast, {
                message: '',
                level: ToastLevel.WARN,
            } as Toast)
        },

        // pushToast
        [ActionType.PushToast]({ commit }: { commit: Commit }, toast: Toast) {
            commit(MutationType.SetToast, toast)
        },
    },
}
