import type { ProtectedRoute } from 'types/express'

export const getProfile: ProtectedRoute = async (req, res, next) => {
   try {
      const { name, story, avatar } = req.user.profile
      res.send({
         name,
         story,
         avatar,
      })
   } catch (error) {
      next(error)
   }
}
