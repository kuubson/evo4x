import * as helpers from 'helpers'

import { history } from 'utils'

export const handleApiError = (error: any) => {
    if (process.env.NODE_ENV !== 'production') {
        console.log(error)
    }
    if (error.response) {
        const status = error.response.status
        const { error: apiError } = error.response.data
        if (status === 401 || status === 403) {
            history.push('/?failedAuthentication=true')
        }
        if (!apiError) {
            return helpers.setApiFeedback('The connection could not be established with the server')
        }
        return helpers.setApiFeedback(apiError)
    }
    if (error.request) {
        return helpers.setApiFeedback('The server cannot temporarily process your request')
    }
    helpers.setApiFeedback('The app has encountered an unexpected error')
}
