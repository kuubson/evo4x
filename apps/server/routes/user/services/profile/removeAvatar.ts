import cloudinary from 'cloudinary'

import { Connection } from 'database'

import { getDefaultAvatar } from 'helpers'

import type { ProtectedRoute } from 'types/express'

export const removeAvatar: ProtectedRoute = async (req, res, next) => {
   try {
      await Connection.transaction(async transaction => {
         const { profile } = req.user
         if (profile.avatarCloudinaryId) {
            await cloudinary.v2.uploader.destroy(profile.avatarCloudinaryId, { invalidate: true })
         }
         const avatar = getDefaultAvatar(profile.name)
         await profile.update({ avatar }, { transaction })
         res.send({
            avatar,
            feedback: 'Your avatar has been updated',
         })
      })
   } catch (error) {
      next(error)
   }
}
