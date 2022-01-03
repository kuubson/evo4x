import { createSlice, PayloadAction } from '@reduxjs/toolkit'

const loaderSlice = createSlice({
    name: 'loader',
    initialState: {
        loading: false
    },
    reducers: {
        setLoading: (state, { payload }: PayloadAction<boolean>) => {
            state.loading = payload
        }
    }
})

export default loaderSlice.reducer
