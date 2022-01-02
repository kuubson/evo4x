import { useEffect } from 'react'

import { useAppSelector } from 'redux/hooks'

import { setApiFeedback } from 'helpers'

export const useApiFeedback = () => {
    const { apiFeedback } = useAppSelector(state => state.apiFeedback)
    useEffect(() => {
        if (apiFeedback) {
            setTimeout(() => setApiFeedback(''), 5000)
        }
    }, [apiFeedback])
    return {
        apiFeedback
    }
}
