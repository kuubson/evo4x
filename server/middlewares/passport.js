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
            async ({ role, email }, done) => {
                if (role === 'user') {
                    const user = await User.findOne({
                        where: {
                            email
                        }
                    })
                    return user
                        ? done(false, {
                              role,
                              user
                          })
                        : done(false, {})
                }
                done(false, {})
            }
        )
    )
}

export default passport
