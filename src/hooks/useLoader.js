import { useSelector } from 'react-redux'

const useLoader = () => {
    const { loading } = useSelector(state => state.loader)
    return {
        loading
    }
}

export default useLoader
