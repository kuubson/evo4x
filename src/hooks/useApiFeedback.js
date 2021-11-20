import { useEffect } from 'react'
import { useSelector } from 'react-redux'

import utils from 'utils'

const useApiFeedback = () => {
    const { apiFeedback } = useSelector(state => state.apiFeedback)
    useEffect(() => {
        if (apiFeedback) {
            setTimeout(() => {
                utils.setApiFeedback('')
            }, 3000)
        }
    }, [apiFeedback])
    return {
        apiFeedback
    }
}

export default useApiFeedback
