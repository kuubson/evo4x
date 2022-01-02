import axios from 'axios'

import * as helpers from 'helpers'

const apiAxios = axios.create()

let timeoutId: any

apiAxios.interceptors.request.use(
    request => {
        !timeoutId && (timeoutId = setTimeout(() => helpers.setLoading(true), 500))
        return request
    },
    error => {
        helpers.setLoading(false)
        helpers.handleApiError(error)
        clearTimeout(timeoutId)
        timeoutId = undefined
        throw error
    }
)

apiAxios.interceptors.response.use(
    response => {
        helpers.setLoading(false)
        helpers.setApiFeedback(response.data.feedback)
        clearTimeout(timeoutId)
        timeoutId = undefined
        return response
    },
    error => {
        helpers.setLoading(false)
        helpers.handleApiError(error)
        clearTimeout(timeoutId)
        timeoutId = undefined
        throw error
    }
)

export default apiAxios
