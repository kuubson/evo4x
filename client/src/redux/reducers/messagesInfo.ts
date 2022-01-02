import { createSlice, PayloadAction } from '@reduxjs/toolkit'

type SliceState = {
    lastUnreadMessageIndex: null | number
    unreadMessagesAmount: number
}

const initialState: SliceState = {
    lastUnreadMessageIndex: null,
    unreadMessagesAmount: 0
}

const messagesInfo = createSlice({
    name: 'messagesInfo',
    initialState,
    reducers: {
        setLastUnreadMessageIndex: (state, { payload }: PayloadAction<number>) => {
            state.lastUnreadMessageIndex = payload
        },
        setUnreadMessagesAmount: (state, { payload }: PayloadAction<number>) => {
            state.unreadMessagesAmount = payload
        }
    }
})

export const { setLastUnreadMessageIndex, setUnreadMessagesAmount } = messagesInfo.actions

export default messagesInfo.reducer
