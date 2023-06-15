import { User } from '../../models/User'
import userService from "../../services/user.service";
import {Commit} from "vuex";
import {AppError} from "../../models/AppError";
import {ToastMutationType} from "./toast";
import {buildToastFromAppError} from "../../helpers/toast-builder";

interface UserState {
    users: User[],
    user: User,
    isOpen: boolean,
    teams: { number: number[] }[],
}

enum MutationType {
    SetUsers = 'SET_USERS',
    SetUser = 'SET_USER',
    SetTeams = 'SET_TEAM',
    AddUser = 'ADD_USER',
    UpdateUser = 'UPDATE_USER',
    deleteUser = 'DELETE_USER',
    OpenMenu = 'OPEN_MENU',
}

export enum UserMutationType {
    SetUsers = 'users/SET_USERS',
    SetTeams = 'users/SET_TEAM',
    SetUser = 'users/SET_USER',
    AddUser = 'users/ADD_USER',
    OpenMenu = 'users/OPEN_MENU',
}

enum ActionType {
    FetchAllUsers = 'FETCH_ALL_USERS',
    FetchTeams = 'FETCH_TEAM',
    FetchUserById = 'FETCH_USER_BY_ID',
    FetchUserByUsernameAndEmail = 'FETCH_USER_BY_USERNAME_AND_EMAIL',
    UpdateUser = 'UPDATE_USER',
    FetchUserByAccount = 'FETCH_USER_BY_ACCOUNT',
    createUser='CREATE_USER',
    deleteUser='DELETE_USER',
    OpenMenu = 'OPEN_MENU',
}

export enum UserActionType {
    FetchAllUsers = 'users/FETCH_ALL_USERS',
    FetchTeams = 'users/FETCH_TEAM',
    FetchUserById = 'users/FETCH_USER_BY_ID',
    FetchUserByUsernameAndEmail = 'users/FETCH_USER_BY_USERNAME_AND_EMAIL',
    UpdateUser = 'users/UPDATE_USER',
    FetchUserByAccount = 'user/FETCH_USER_BY_ACCOUNT',
    createUser='users/CREATE_USER',
    deleteUser='users/DELETE_USER',
    OpenMenu = 'users/OPEN_MENU',
}

export default {
    namespaced: true,

    state: {
        users:[],
        user: {} as User,
        isOpen: false,
        teams:[],
    } as UserState,

    getters: {
        users(state: UserState){ 
            return state.user
        },
        user: (state: UserState) => (id: number) => {
            return state.users.filter(user => user.id === id)
        }

    },
    mutations: {
        [MutationType.SetUsers](state: UserState, users: User[]): void {
            state.users = users
        },
        [MutationType.SetTeams](state: UserState, teams: { number: number[] }[]): void {
            state.teams = teams
        },
        [MutationType.SetUser](state: UserState, user: User): void {
            state.user = user
        },
        [MutationType.AddUser](state: UserState, user: User): void {
            state.users.push(user)
        },
        [MutationType.UpdateUser](state: UserState, user: User): void {
            let index= state.users.findIndex((e)=>e.id=user.id)
            state.users.at(index)!.username=user.username
            state.users.at(index)!.email=user.email
        },
        [MutationType.deleteUser](state: UserState, user: User): void {
            let index = state.users.indexOf(user)
            state.users.splice(index, 1)
        },
        [MutationType.OpenMenu](state: UserState, openMenu: boolean): void {
            state.isOpen = openMenu
        }
    },
    actions: {
        [ActionType.FetchAllUsers]({ commit }: { commit: Commit }): void {
            userService
                .getAllUsers()
                .then((response: User) =>
                    commit(MutationType.SetUsers, response),
                )
                .catch((err: AppError) => {
                        console.error('test')
                        commit(ToastMutationType.SetToast, buildToastFromAppError(err, `Error getting all users`), {
                            root: true,
                        })
                    }
                )
        },
        [ActionType.FetchTeams]({ commit }: { commit: Commit }, userId: number): void {
            userService
                .getTeams(userId)
                .then((response: { number: number[] }) =>
                    commit(MutationType.SetTeams, response),
                )
                .catch((err: AppError) => {
                        console.error('test')
                        commit(ToastMutationType.SetToast, buildToastFromAppError(err, `Error getting team users`), {
                            root: true,
                        })
                    }
                )
        },
        [ActionType.FetchUserById]({ commit }: { commit: Commit }, userId: number): void {
            userService
                .getUserById(userId)
                .then((response: User) =>
                    commit(MutationType.SetUser, response),
                )
                .catch((err: AppError) => {
                        console.error('test')
                        commit(ToastMutationType.SetToast, buildToastFromAppError(err, `Error getting user: ${userId}`), {
                            root: true,
                        })
                    }
                )
        },
        [ActionType.FetchUserByUsernameAndEmail]({ commit }: { commit: Commit }, user: {username: string, email: string}): void {
            userService
                .getUserByUsernameAndEmail(user.username, user.email)
                .then((response: User) =>
                    commit(MutationType.SetUsers, response),
                )
                .catch((err: AppError) => {
                        console.error('test')
                        commit(ToastMutationType.SetToast, buildToastFromAppError(err, `Error getting user`), {
                            root: true,
                        })
                    }
                )
        },
        [ActionType.createUser]({ commit }: { commit: Commit },user:{username:string, email:string, role:string, teams:[], password:string}): void {
            userService
                .createUser(user.username, user.email, user.role, user.teams, user.password)
                .then((response:User) =>
                    commit(MutationType.AddUser, response),
                )
                .catch((err: AppError) => {
                        console.error('test')
                        commit(ToastMutationType.SetToast, buildToastFromAppError(err, err.message), {
                            root: true,
                        })
                    }
                )
        },
        [ActionType.UpdateUser]({ commit }: { commit: Commit },user:{id:number,username:string, email:string, role:string, teams:[], password:string}): void {
            userService
                .updateUser(user.id,user.username, user.email, user.role, user.teams, user.password)
                .then((response:User) =>
                    commit(MutationType.UpdateUser, response),
                )
                .catch((err: AppError) => {
                        console.error('test')
                        commit(ToastMutationType.SetToast, buildToastFromAppError(err, `Error updating user: ${user.id}`), {
                            root: true,
                        })
                    }
                )
        },
        [ActionType.deleteUser]({ commit }: { commit: Commit },id:number): void {
            userService
                .deleteUser(id)
                .then((response:User) =>
                    commit(MutationType.deleteUser, response),
                )
                .catch((err: AppError) => {
                        console.error('test')
                        commit(ToastMutationType.SetToast, buildToastFromAppError(err, `Error deleting user: ${id}`), {
                            root: true,
                        })
                    }
                )
        },
        [ActionType.OpenMenu]({ commit }: { commit: Commit }, request: boolean): void {
            commit(MutationType.OpenMenu, request)
        }
    },
}