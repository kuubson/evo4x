import type { PayloadAction } from '@reduxjs/toolkit'
import { createSlice } from '@reduxjs/toolkit'
import type { Socket } from 'socket.io-client'

type SliceState = {
   socket: SocketType
}

type SocketType = Socket | null

const initialState: SliceState = { socket: null }

const socketSlice = createSlice({
   name: 'socket',
   initialState,
   reducers: {
      setSocket: (state, { payload }: PayloadAction<SocketType>) => {
         state.socket = payload as any
      },
   },
})

export const { setSocket } = socketSlice.actions

export default socketSlice.reducer
