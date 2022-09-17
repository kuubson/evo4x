import { Message, Profile, User } from 'database'

import { updateReadByProperty } from 'routes/user/helpers'

import { validator } from 'helpers'

import type { ProtectedRoute } from 'types/express'

export const getMessages: ProtectedRoute = async (req, res, next) => {
   try {
      const {
         id,
         profile: { name, avatar },
      } = req.user
      const { limit, offset } = req.body
      const messages = await Message.findAll({
         limit,
         offset,
         order: [['createdAt', 'DESC']],
         attributes: { exclude: ['userId'] },
         include: [
            {
               model: User,
               attributes: ['id'],
               include: [
                  {
                     model: Profile,
                     attributes: ['name', 'avatar'],
                  },
               ],
            },
         ],
      }).then(messages => messages.sort((a, b) => a.id - b.id))
      await updateReadByProperty(id, messages)
      res.send({
         user: {
            id,
            profile: {
               name,
               avatar,
            },
         },
         messages,
      })
   } catch (error) {
      next(error)
   }
}

export const validation = () => [
   validator.validateInteger('limit'),
   validator.validateInteger('offset'),
]
