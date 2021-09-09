import { useSelector } from 'react-redux'

const useLoader = () => {
    const { apiFeedback } = useSelector(state => state.apiFeedback)
    return {
        apiFeedback
    }
}

export default useLoader
