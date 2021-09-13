import passport from 'passport'

const jwtAuthorization = (req, res, next) => {
    passport.authenticate('jwt', { session: false }, (error, { role, user }) => {
        if (error || !user || role !== req.originalUrl.split('/')[2]) {
            return res
                .clearCookie('token', {
                    secure: process.env.NODE_ENV === 'production',
                    httpOnly: true,
                    sameSite: true
                })
                .status(401)
                .send({
                    error: 'Authentication has failed. Please login again'
                })
        }
        req.user = user
        next()
    })(req, res, next)
}

export default jwtAuthorization
