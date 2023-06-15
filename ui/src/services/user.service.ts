import httpClient from '../router/http-common'
import {AxiosResponse} from "axios";
import {User} from "../models/User";

class UserService {
    private apiUrl = 'http://localhost:4000/api/users'

    async getAllUsers(): Promise<User> {
        return httpClient
            .get(this.apiUrl)
            .then((response: AxiosResponse) => <User>response.data.data)
    }
    async getTeams(userId: number): Promise<{ number: number[] }> {
        return httpClient
            .get(`${this.apiUrl}/teams/${userId}`)
            .then((response: AxiosResponse) => <{ number: number[] }>response.data.teams)
    }
    async getUserById(userId: number): Promise<User> {
        return httpClient
            .get(`${this.apiUrl}/${userId}`)
            .then((response: AxiosResponse) => <User>response.data.data)
    }
    async getUserByUsernameAndEmail(username: string, email: string): Promise<User> {
        return httpClient
            .get(`${this.apiUrl}?email=${email}&username=${username}`)
    }
    async createUser(username:string, email:string, role:string, teams:[], password:string): Promise<User> {
        return httpClient
            .post(this.apiUrl,{"user":{"username":username, 'email':email, 'role':role, 'teams':teams, 'password':password}})
            .then((response: AxiosResponse) => <User>response.data.data)
    }
    async updateUser(id:number,username:string, email:string, role:string, teams:[], password:string): Promise<User> {
        return httpClient
            .put(this.apiUrl+'/'+id,{"user":{"username":username, 'email':email, 'role':role, 'teams':teams, 'password':password}})
            .then((response: AxiosResponse) => <User>response.data.data)
    }
    async deleteUser(id:number): Promise<User> {
        return httpClient
            .delete(`${this.apiUrl}/${id}`)
            .then((response: AxiosResponse) => <User>response.data.data)
    }
}

export default new UserService()
