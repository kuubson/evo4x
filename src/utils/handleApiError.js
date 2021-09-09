import utils from 'utils'

const handleApiError = error => {
    if (process.env.NODE_ENV !== 'production') {
        console.log(error)
    }
    if (error.response) {
        const status = error.response.status
        const { error: apiError } = error.response.data
        if (status === 401 || status === 403) {
            return utils.redirectTo('/')
        }
        if (!apiError) {
            return utils.setApiFeedback('The connection could not be established with the server')
        }
        return utils.setApiFeedback(apiError)
    }
    if (error.request) {
        return utils.setApiFeedback('The server cannot temporarily process your request')
    }
    utils.setApiFeedback('An unexpected problem has occurred in the application')
}

export default handleApiError