import cloudinary from 'cloudinary'

import { Connection } from 'database/database'

import utils from 'utils'

import userHelpers from 'routes/user/helpers'

import { ProtectedMulterRoute } from 'types/express'

const sendFile: ProtectedMulterRoute = async (req, res, next) => {
    try {
        await Connection.transaction(async transaction => {
            const { id } = req.user
            const { name } = req.user.profile
            const { filename, path } = req.file
            let type, content, cloudinaryId
            switch (true) {
                case /jpg|jpeg|png|gif/i.test(filename):
                    type = 'IMAGE'
                    break
                case /mp4/i.test(filename):
                    type = 'VIDEO'
                    break
                case /txt|rtf|doc|docx|xlsx|ppt|pptx|pdf/i.test(filename):
                    type = 'FILE'
                    break
                default:
                    throw new utils.ApiError('There was a problem sending the file', 500)
            }
            let message = ''
            if (type === 'IMAGE') {
                message = `${name} has sent a new image`
                const { public_id, secure_url } = await cloudinary.v2.uploader.upload(path, {
                    use_filename: true
                })
                content = secure_url
                cloudinaryId = public_id
            }
            if (type === 'VIDEO') {
                message = `${name} has sent a new video`
                const { public_id, secure_url } = await cloudinary.v2.uploader.upload(path, {
                    resource_type: 'video',
                    use_filename: true
                })
                content = secure_url
                cloudinaryId = public_id
            }
            if (type === 'FILE') {
                message = `${name} has sent a new file`
                const { public_id, secure_url } = await cloudinary.v2.uploader.upload(path, {
                    resource_type: 'raw',
                    use_filename: true
                })
                content = secure_url
                cloudinaryId = public_id
            }
            utils.deleteTemporaryFile(path)
            await req.user.createMessage(
                {
                    type,
                    content,
                    readBy: id,
                    cloudinaryId
                },
                {
                    transaction
                }
            )
            userHelpers.sendNotificationsForOtherUsers(id, {
                tag: id,
                title: `From ${name}`,
                body: message,
                icon: `${utils.baseUrl(req)}/Logo.png`,
                data: {
                    userName: name,
                    url: `${utils.baseUrl(req)}/user/chat`
                }
            })
            res.send({
                type,
                content
            })
        })
    } catch (error) {
        utils.deleteTemporaryFile(req.file.path)
        next(error)
    }
}

export default sendFile
