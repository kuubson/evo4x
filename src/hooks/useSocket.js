import { useDispatch, useSelector } from 'react-redux'

const useSocket = () => {
    const dispatch = useDispatch()
    const { socket } = useSelector(state => state.socket)
    const setSocket = payload => dispatch({ type: 'setSocket', payload })
    return {
        socket,
        setSocket
    }
}

export default useSocket
