import passport from 'passport'

export default (req, res, next) => {
    passport.authenticate('jwt', { session: false }, (error, { user, role }) => {
        if (error || !user || role !== req.originalUrl.split('/')[2]) {
            return res
                .clearCookie('token', {
                    secure: process.env.NODE_ENV === 'production',
                    httpOnly: true,
                    sameSite: true
                })
                .status(401)
                .send({
                    error: 'The authentication cookie is invalid, log in again'
                })
        }
        req.user = user
        next()
    })(req, res, next)
}
