class ApiError extends Error {
    constructor(error, status) {
        super()
        this.error = error
        this.status = status
    }
}

export default ApiError
