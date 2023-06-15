import { AxiosError } from 'axios'

export const buildAppErrorFromAxiosError = (
    error: AxiosError,
) => {
    return {
        message: error?.message,
        httpCode: error?.response?.status ?? 0,
        gravity: 'SEVERE',
    }
}

