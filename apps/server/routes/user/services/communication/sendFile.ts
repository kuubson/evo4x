import cloudinary from 'cloudinary'

import { Connection } from 'database'

import { sendNotificationsForOtherUsers } from 'routes/user/helpers'

import { deleteTemporaryFile } from 'helpers'

import { ApiError, baseUrl, filesInfo } from 'utils'

import type { ProtectedMulterRoute } from 'types/express'

export const sendFile: ProtectedMulterRoute = async (req, res, next) => {
   try {
      await Connection.transaction(async transaction => {
         const { id } = req.user
         const { name } = req.user.profile
         const { images, videos, files } = filesInfo.regex
         const { mimetype, originalname, path } = req.file
         let type, content, cloudinaryId
         switch (true) {
            case images.test(mimetype) || images.test(originalname):
               type = 'IMAGE'
               break
            case videos.test(mimetype) || videos.test(originalname):
               type = 'VIDEO'
               break
            case files.test(mimetype) || files.test(originalname):
               type = 'FILE'
               break
            default:
               throw new ApiError('There was a problem sending the file', 500)
         }
         let message = ''
         if (type === 'IMAGE') {
            message = `${name} has sent a new image`
            const { public_id, secure_url } = await cloudinary.v2.uploader.upload(path, {
               use_filename: true,
            })
            content = secure_url
            cloudinaryId = public_id
         }
         if (type === 'VIDEO') {
            message = `${name} has sent a new video`
            const { public_id, secure_url } = await cloudinary.v2.uploader.upload(path, {
               resource_type: 'video',
               use_filename: true,
            })
            content = secure_url
            cloudinaryId = public_id
         }
         if (type === 'FILE') {
            message = `${name} has sent a new file`
            const { public_id, secure_url } = await cloudinary.v2.uploader.upload(path, {
               resource_type: 'raw',
               use_filename: true,
            })
            content = secure_url
            cloudinaryId = public_id
         }
         deleteTemporaryFile(path)
         await req.user.createMessage(
            {
               type,
               content,
               readBy: id,
               filename: originalname,
               cloudinaryId,
            },
            { transaction }
         )
         sendNotificationsForOtherUsers(id, {
            tag: id,
            title: `From ${name}`,
            body: message,
            icon: `${baseUrl(req)}/Logo.png`,
            data: {
               userName: name,
               url: `${baseUrl(req)}/user/chat`,
            },
         })
         res.send({
            type,
            content,
         })
      })
   } catch (error) {
      deleteTemporaryFile(req.file.path)
      const emptyTextFile = (error as any).message === 'Empty file'
      if (emptyTextFile) {
         next(new ApiError('The selected text file is empty', 422))
      } else {
         next(error)
      }
   }
}
