import axios, {
    AxiosError,
    AxiosInstance, AxiosRequestConfig, AxiosResponse,
} from 'axios'
import router from "./index";

const httpClient: AxiosInstance = axios.create({
    baseURL: 'http://localhost:4000/api/',
    headers: {
        'Content-Type': 'application/json',
    },
})

const onResponseError = (error: AxiosError) => {
    // déconnexion si nécessaire
    if (error.response?.status === 401) {
        localStorage.removeItem('token')
        router.push('/login'  )
    }
    return Promise.reject(error)
}

const onRequestSuccess = (config: AxiosRequestConfig) => {
    const token = JSON.parse(`${localStorage.getItem('token')}`)
    if (token) {
        if (!config.headers) {
            config.headers = {}
        }
        config.headers.Authorization = `Bearer ${token}`
    }
    config.timeout = 1000000
    return config
}

// Request interceptor
httpClient.interceptors.request.use(onRequestSuccess)

// Response interceptor
httpClient.interceptors.response.use(
    (request: AxiosResponse) => request,
    (error: AxiosError) => onResponseError(error),
)


export default httpClient
