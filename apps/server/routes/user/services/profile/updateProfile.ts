import { check } from 'express-validator'

import { validator } from 'helpers'

import type { ProtectedRoute } from 'types/express'

export const updateProfile: ProtectedRoute = async (req, res, next) => {
   try {
      const { name, story, avatar } = req.body
      await req.user.profile.update({
         name,
         story,
         avatar,
      })
      res.send({ feedback: 'Your profile has been updated' })
   } catch (error) {
      next(error)
   }
}

export const validation = () => [
   validator.validateProperty('name'),
   check('story').trim().isString().bail(),
   check('avatar').isURL(),
]
