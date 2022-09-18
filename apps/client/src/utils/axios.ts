import axios from 'axios'

import { handleApiError, setApiFeedback, setLoading } from 'helpers'

const apiAxios = axios.create()

let timeoutId: any

apiAxios.interceptors.request.use(
   request => {
      !timeoutId && (timeoutId = setTimeout(() => setLoading(true), 1000))
      return request
   },
   error => {
      setLoading(false)
      handleApiError(error)
      clearTimeout(timeoutId)
      timeoutId = undefined
      throw error
   }
)

apiAxios.interceptors.response.use(
   response => {
      setLoading(false)
      setApiFeedback(response.data.feedback)
      clearTimeout(timeoutId)
      timeoutId = undefined
      return response
   },
   error => {
      setLoading(false)
      handleApiError(error)
      clearTimeout(timeoutId)
      timeoutId = undefined
      throw error
   }
)

export default apiAxios
