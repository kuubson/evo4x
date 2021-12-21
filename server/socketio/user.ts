import jwt from 'jsonwebtoken'
import { Server, Socket } from 'socket.io'

import { User, Profile, Message } from 'database/database'
import { User as UserClass } from 'database/models/User'

import utils from 'utils'

import userHelpers from 'routes/user/helpers'

interface ISocket extends Socket {
    user?: UserClass
}

const user = (io: Server) => {
    const userIo = io.of('/user')
    userIo.use((socket: ISocket, next) => {
        const token = utils.cookie.getCookie(socket.request.headers.cookie, 'token')
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
            await userHelpers.updateReadByProperty(id, messages)
        })
    })
}

export default user
