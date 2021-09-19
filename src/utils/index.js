import axios from './axios'
import subscribePushNotifications from './subscribePushNotifications'
import setLoading from './setLoading'
import handleApiError from './handleApiError'
import handleApiValidation from './handleApiValidation'
import setRole from './setRole'
import setApiFeedback from './setApiFeedback'
import detectMobileDevice from './detectMobileDevice'
import history from './history'

const utils = {
    axios,
    subscribePushNotifications,
    setLoading,
    handleApiError,
    handleApiValidation,
    setRole,
    setApiFeedback,
    detectMobileDevice,
    history
}

export default utils
