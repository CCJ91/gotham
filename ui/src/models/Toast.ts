export type Toast = {
    message: string
    level: ToastLevel
}

export enum ToastLevel {
    SEVERE = 'SEVERE',
    WARN = 'WARN',
    SUCCESS = 'SUCCESS',
}
