import axios from 'axios'

import utils from 'utils'

const apiAxios = axios.create()

let timeoutId: any

apiAxios.interceptors.request.use(
    request => {
        !timeoutId && (timeoutId = setTimeout(() => utils.setLoading(true), 500))
        return request
    },
    error => {
        utils.setLoading(false)
        utils.handleApiError(error)
        clearTimeout(timeoutId)
        timeoutId = undefined
        throw error
    }
)

apiAxios.interceptors.response.use(
    response => {
        utils.setLoading(false)
        utils.setApiFeedback(response.data.feedback)
        clearTimeout(timeoutId)
        timeoutId = undefined
        return response
    },
    error => {
        utils.setLoading(false)
        utils.handleApiError(error)
        clearTimeout(timeoutId)
        timeoutId = undefined
        throw error
    }
)

export default apiAxios
