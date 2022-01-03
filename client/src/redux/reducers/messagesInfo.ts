import { createSlice, PayloadAction } from '@reduxjs/toolkit'

type SliceState = {
    lastUnreadMessageIndex: number | null
    unreadMessagesAmount: number
}

type Payload = PayloadAction<number>

const initialState: SliceState = {
    lastUnreadMessageIndex: null,
    unreadMessagesAmount: 0
}

const messagesInfo = createSlice({
    name: 'messagesInfo',
    initialState,
    reducers: {
        setLastUnreadMessageIndex: (state, { payload }: Payload) => {
            state.lastUnreadMessageIndex = payload
        },
        setUnreadMessagesAmount: (state, { payload }: Payload) => {
            state.unreadMessagesAmount = payload
        }
    }
})

export const { setLastUnreadMessageIndex, setUnreadMessagesAmount } = messagesInfo.actions

export default messagesInfo.reducer
