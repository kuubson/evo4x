export class ApiError extends Error {
    error: string
    status: number
    constructor(error: string, status: number) {
        super()
        this.error = error
        this.status = status
    }
}
