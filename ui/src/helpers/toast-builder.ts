import { Toast, ToastLevel } from '../models/Toast'
import { AppError } from '../models/AppError'

export const buildToastFromAppError = (error: AppError, message: string): Toast => {
    if (message) {
        return {
            message: message,
            level: ToastLevel[error.gravity],
        } as Toast
    } else
    return {
        message: error?.message,
        level: ToastLevel[error.gravity],
    } as Toast
}
