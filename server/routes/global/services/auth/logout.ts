import { Route } from 'types/express'

const logout: Route = (_, res, next) => {
    try {
        res.clearCookie('token', {
            secure: process.env.NODE_ENV === 'production',
            httpOnly: true,
            sameSite: true
        }).send()
    } catch (error) {
        next(error)
    }
}

export default logout
