import { createSlice, PayloadAction } from '@reduxjs/toolkit'

const apiFeedbackSlice = createSlice({
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

export const { setApiFeedback } = apiFeedbackSlice.actions

export default apiFeedbackSlice.reducer
