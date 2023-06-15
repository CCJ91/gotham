export type AppError = {
    message: string
    httpCode: number
    gravity: AppErrorGravity
}

export enum AppErrorGravity {
    SEVERE = 'SEVERE',
    WARN = 'WARN',
}
