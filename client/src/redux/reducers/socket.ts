import { Socket } from 'socket.io-client'
import { WritableDraft } from 'immer/dist/internal'

import { createSlice, PayloadAction } from '@reduxjs/toolkit'

type SliceState = {
    socket: null | Socket
}

const initialState: SliceState = {
    socket: null
}

const socket = createSlice({
    name: 'socket',
    initialState,
    reducers: {
        setSocket: (state, { payload }: PayloadAction<WritableDraft<Socket>>) => {
            state.socket = payload
        }
    }
})

export const { setSocket } = socket.actions

export default socket.reducer
