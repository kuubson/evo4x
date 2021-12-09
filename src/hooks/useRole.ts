import { useAppSelector } from 'redux/hooks'

const useRole = () => {
    const { role } = useAppSelector(state => state.role)
    return {
        role
    }
}

export default useRole
