import { createSlice, PayloadAction } from '@reduxjs/toolkit'

type SliceState = {
    role: Role
}

const initialState: SliceState = {
    role: 'guest'
}

const roleSlice = createSlice({
    name: 'role',
    initialState,
    reducers: {
        setRole: (state, { payload }: PayloadAction<Role>) => {
            state.role = payload
        }
    }
})

export default roleSlice.reducer
