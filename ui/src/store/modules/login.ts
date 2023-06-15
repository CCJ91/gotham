import { Commit, Dispatch } from 'vuex'
import router from '../../router'
import authenticateService from '../../services/authenticate.service'
import accountService from '../../services/account.service'
import {ToastMutationType} from "./toast";
import {AppError} from "../../models/AppError";
import {buildToastFromAppError} from "../../helpers/toast-builder";
import {User} from "../../models/User";
import {UserActionType, UserMutationType} from "./user";

// typage des objets du store
interface LoginState {
    isLoading: boolean
    loginUser: User
}

// mutation type = nom des mutations & nom namespaces
enum MutationType {
    SetToken = 'SET_TOKEN',
    SetIsLoading = 'SET_IS_LOADING',
    SetLoginUser = 'SET_LOGIN_USER',
}
export enum LoginMutationType {
    SetToken = 'login/SET_TOKEN',
    SetIsLoading = 'login/SET_IS_LOADING',
    SetLoginUser = 'login/SET_LOGIN_USER',
}

// getter type = nom des mutations & nom namespaces
enum GetterType {
    GetToken = 'GET_TOKEN',
    IsAdmin = 'IS_ADMIN',
}
export enum LoginGetterType {
    GetToken = 'login/GET_TOKEN',
    IsAdmin = 'login/IS_ADMIN',
}

// action type = nom des action & nom namespaces
enum ActionType {
    Disconnect = 'DISCONNECT',
    FetchLogin = 'FETCH_LOGIN',
    ChangeColorScheme = 'CHANGE_COLOR_SCHEME',
    FetchUserByToken = 'FETCH_USER_BY_TOKEN',
}
export enum LoginActionType {
    Disconnect = 'login/DISCONNECT',
    FetchLogin = 'login/FETCH_LOGIN',
    ChangeColorScheme = 'login/CHANGE_COLOR_SCHEME',
    FetchUserByToken = 'login/FETCH_USER_BY_TOKEN',
}

// store en lui même
export default {
    namespaced: true,

    // state avec init par défaut des objets du store
    state: {
        isLoading: false,
        openMenu: false,
        loginUser: {} as User,
    } as LoginState,

    // getters
    getters: {},

    // mutations
    mutations: {
        // setIsLoading
        [MutationType.SetIsLoading](state: LoginState, isLoading: boolean): void {
            state.isLoading = isLoading
        },
        // setLogin
        [MutationType.SetToken](state: LoginState, token: string): void {
            localStorage.setItem('token', JSON.stringify(token))
        },
        [MutationType.SetLoginUser](state: LoginState, loginUser: User): void {
            state.loginUser = loginUser
        },
    },

    // actions
    actions: {
        // fetchLogin
        [ActionType.FetchLogin](
            { commit }: { commit: Commit; dispatch: Dispatch },
            userForm: any,
        ): void {
            commit(MutationType.SetIsLoading, true)
            authenticateService
                .authenticate(userForm)
                .then((response) => {
                    commit(MutationType.SetToken, response.token)
                    accountService
                        .account()
                        .then((response: any) => {
                            commit(MutationType.SetLoginUser, response)
                            commit(UserMutationType.SetUser, response)
                            router.push(`/chartManager/${response.id}`)
                        })
                })
                .catch((err: AppError) => {
                        commit(ToastMutationType.SetToast, buildToastFromAppError(err, 'Bad credentials'), {
                            root: true,
                        })
                    }
                )
                .finally(() => commit(MutationType.SetIsLoading, false))
        },
        // fetchUserByToken
        [ActionType.FetchUserByToken]({ commit }: { commit: Commit }): void {
            commit(MutationType.SetIsLoading, true)
            console.log('1')
            accountService
                .account()
                .then((response: any) => {
                    commit(MutationType.SetLoginUser, response)
                })
                .catch((err: AppError) => {
                    console.error('test')
                    commit(ToastMutationType.SetToast, buildToastFromAppError(err, 'No user for this token'), {
                            root: true,
                        })
                    }
                )
                .finally(() => commit(MutationType.SetIsLoading, false))
        },
        // disconnect
        [ActionType.Disconnect]({ commit }: { commit: Commit }): void {
            commit(MutationType.SetToken, '')
            localStorage.clear()
            router.push('/login')
        },
    },
}
