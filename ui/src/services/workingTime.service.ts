import httpClient from "../router/http-common"
import {AxiosError, AxiosResponse} from "axios";
import {WorkingTime} from "../models/WorkingTime";
export type apiResponse = {
    data: {
        response: any
    }
}
class WorkingTimeService {
    private apiUrl = 'http://localhost:4000/api/workingtimes/'

    async getWorkingTimesByUserId(userId: number): Promise<WorkingTime> {
        return httpClient
            .get(this.apiUrl + `${userId}`)
            .then((response: AxiosResponse) => <WorkingTime>response.data.data)
    }

    async getAllWorkingTimes(): Promise<WorkingTime> {
        return httpClient
            .get(this.apiUrl)
            .then((response: AxiosResponse) => <WorkingTime>response.data.data)
    }

    async delete(id: number) {
        return httpClient
            .delete(this.apiUrl + `${id}`)
    }

    async create(workingTime: WorkingTime): Promise<WorkingTime> {
        const body = {
            workingtime: {
                start: workingTime.start,
                end: workingTime.end,
            }
        }
        return httpClient
            .post(this.apiUrl + `${workingTime.id}`, body)
            .then((response: AxiosResponse) => <WorkingTime>response.data)
    }
    
    async update(workingTime: WorkingTime): Promise<WorkingTime> {
        return httpClient
            .put(this.apiUrl + `${workingTime.id}`, {"start": workingTime.start, "end": workingTime.end})
            .then((response: AxiosResponse) => <WorkingTime>response.data)
    }
    
}

export default new WorkingTimeService()
