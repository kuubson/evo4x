import { useAppSelector } from 'redux/hooks'

const useLoader = () => {
    const { loading } = useAppSelector(state => state.loader)
    return {
        loading
    }
}

export default useLoader
