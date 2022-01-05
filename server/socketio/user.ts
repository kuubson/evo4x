import jwt from 'jsonwebtoken'
import { Server, Socket } from 'socket.io'

import { User, Profile, Message } from 'database'
import { User as UserClass } from 'database/models/User'

import { updateReadByProperty } from 'routes/user/helpers'

import { cookie } from 'utils'

type ISocket = Socket & {
    user?: UserClass
}

export const user = (io: Server) => {
    const userIo = io.of('/user')
    userIo.use((socket: ISocket, next) => {
        const token = cookie.getCookie(socket.request.headers.cookie, 'token')
        if (!token) {
            next(new Error())
        } else {
            jwt.verify(token, process.env.JWT_KEY!, async (error, data: any) => {
                if (error) {
                    next(new Error())
                } else {
                    try {
                        const { email } = data
                        const user = await User.findOne({
                            where: {
                                email
                            },
                            include: [Profile]
                        })
                        if (!user) {
                            next(new Error())
                        } else {
                            socket.user = user
                            next()
                        }
                    } catch (error) {
                        next(new Error())
                    }
                }
            })
        }
    })
    userIo.on('connection', (socket: ISocket) => {
        const id = socket.user!.id
        socket.on('sendMessage', data => socket.broadcast.emit('sendMessage', data))
        socket.on('readMessages', async () => {
            const messages = await Message.findAll()
            await updateReadByProperty(id, messages)
        })
    })
}
