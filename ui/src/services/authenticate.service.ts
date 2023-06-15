import { AxiosResponse, AxiosError } from 'axios'
import httpClient from '../router/http-common'
import { buildAppErrorFromAxiosError } from '../helpers/http-error-builder.helper'

class AuthenticateService {
    private apiUrl = 'http://localhost:4000/api/login'
    /**
     * Recupere le token utilisateur
     */
    async authenticate(
        request: any,
    ): Promise<any> {
        return httpClient
            .post(this.apiUrl, <any>{
                email: request.email,
                password: request.password,
                isRememberMe: request.isRememberMe,
            })
            .then(
                (response: AxiosResponse) => <any>response.data,
            )
            .catch((error: AxiosError) =>
                Promise.reject(
                    buildAppErrorFromAxiosError(error),
                ),
            )
    }
}

export default new AuthenticateService()
