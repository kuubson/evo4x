import { createSlice, PayloadAction } from '@reduxjs/toolkit'

const apiFeedback = createSlice({
    name: 'apiFeedback',
    initialState: {
        apiFeedback: ''
    },
    reducers: {
        setApiFeedback: (state, { payload }: PayloadAction<string>) => {
            state.apiFeedback = payload
        }
    }
})

export default apiFeedback.reducer
