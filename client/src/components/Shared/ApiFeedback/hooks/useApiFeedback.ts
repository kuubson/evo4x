import { useEffect } from 'react'
import { useAppSelector } from 'redux/hooks'

import utils from 'utils'

const useApiFeedback = () => {
    const { apiFeedback } = useAppSelector(state => state.apiFeedback)
    useEffect(() => {
        if (apiFeedback) {
            setTimeout(() => utils.setApiFeedback(''), 5000)
        }
    }, [apiFeedback])
    return {
        apiFeedback
    }
}

export default useApiFeedback
