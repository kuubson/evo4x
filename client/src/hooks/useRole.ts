import { useAppSelector } from 'redux/hooks'

export const useRole = () => {
    const { role } = useAppSelector(state => state.role)
    return {
        role
    }
}
