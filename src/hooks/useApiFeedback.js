import { useSelector } from 'react-redux'

const useApiFeedback = () => {
    const { apiFeedback } = useSelector(state => state.apiFeedback)
    return {
        apiFeedback
    }
}

export default useApiFeedback
