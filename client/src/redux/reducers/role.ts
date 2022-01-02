import { createSlice, PayloadAction } from '@reduxjs/toolkit'

type SliceState = {
    role: AllRoles
}

const initialState: SliceState = {
    role: 'guest'
}

const roleSlice = createSlice({
    name: 'role',
    initialState,
    reducers: {
        setRole: (state, { payload }: PayloadAction<AllRoles>) => {
            state.role = payload
        }
    }
})

export default roleSlice.reducer
