import passportJwt from 'passport-jwt'

import { User } from '@database'

const JwtStrategy = passportJwt.Strategy
const ExtractJwt = passportJwt.ExtractJwt

const passport = passport => {
    const extractJwtFromCookies = ({ cookies }) => cookies.token
    passport.use(
        new JwtStrategy(
            {
                jwtFromRequest: ExtractJwt.fromExtractors([extractJwtFromCookies]),
                secretOrKey: process.env.JWT_KEY
            },
            async (data, done) => {
                const { email, role } = data
                if (role === 'user') {
                    const user = await User.findOne({
                        where: {
                            email
                        }
                    })
                    return user
                        ? done(false, {
                              user,
                              role
                          })
                        : done(false, {})
                }
                done(false, {})
            }
        )
    )
}

export default passport
