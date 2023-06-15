import httpClient from "../router/http-common";
import {AxiosError, AxiosResponse} from "axios";
import { buildAppErrorFromAxiosError } from '../helpers/http-error-builder.helper'

class AccountService {
    private apiUrl = 'http://localhost:4000/api/auth'

    async account(): Promise<any> {
        return httpClient
            .get(this.apiUrl)
            .then((response: AxiosResponse) => <any>response.data.data)
            .catch((error: AxiosError) =>
                Promise.reject(
                    buildAppErrorFromAxiosError(error),
                ),
            )
    }

}

export default new AccountService()
