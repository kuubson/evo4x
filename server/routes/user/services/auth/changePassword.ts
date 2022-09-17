import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'

import { Connection, User } from 'database'

import { validator } from 'helpers'

import { ApiError } from 'utils'

import type { Route } from 'types/express'

export const changePassword: Route = async (req, res, next) => {
   try {
      await Connection.transaction(async transaction => {
         const { password, passwordToken } = req.body
         return jwt.verify(passwordToken, process.env.JWT_KEY!, async (error: any, data: any) => {
            try {
               if (error) {
                  if (error.message.includes('expired')) {
                     throw new ApiError('The link to change your password has expired', 400)
                  }
                  throw new ApiError('The link to change your password is invalid', 400)
               }
               const user = await User.findOne({
                  where: {
                     email: data.email,
                     passwordToken,
                  },
               })
               if (!user) {
                  throw new ApiError('The link to change your password is incorrect', 404)
               }
               await user.update(
                  {
                     password: bcrypt.hashSync(password, 11),
                     passwordToken: null,
                  },
                  { transaction }
               )
               res.send({ feedback: 'Your password has been changed. You can login now' })
            } catch (error) {
               next(error)
            }
         })
      })
   } catch (error) {
      next(error)
   }
}

export const validation = () => [
   validator.validatePassword(),
   validator.validateRepeatedPassword(),
   validator.validateProperty('passwordToken').isJWT(),
]
