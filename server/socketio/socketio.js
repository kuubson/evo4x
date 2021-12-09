import user from './user'

const socketio = io => {
    user(io)
}

export default socketio
