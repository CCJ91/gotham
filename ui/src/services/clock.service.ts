import {Clock} from "../models/Clock";
import httpClient from "../router/http-common";
import {AxiosResponse} from "axios";


class ClockService {
    private apiUrl = 'http://localhost:4000/api/clocks/'

    async getClockById(userId: number): Promise<Clock> {
        return httpClient
            .get(`${this.apiUrl}${userId}`)
            .then((response: AxiosResponse) => <Clock>response.data.data)
    }
    async createClock(time:string, userId:number): Promise<Clock> {
        return httpClient
            .post(this.apiUrl+`${userId}`,{"clock":{"user":userId}})
            .then((response: AxiosResponse) => <Clock>response.data.data)
    }
}

export default new ClockService()
