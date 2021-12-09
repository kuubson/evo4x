import actions from 'redux/actions'

type Role = 'admin' | 'user' | 'guest'

type State = {
    role: Role
}

const initialState: State = {
    role: 'guest'
}

type Action = {
    payload: Role
    type: 'SET_ROLE'
}

const role = (state = initialState, { payload, type }: Action) => {
    switch (type) {
        case actions.SET_ROLE:
            return {
                ...state,
                role: payload
            }
        default:
            return state
    }
}

export default role
