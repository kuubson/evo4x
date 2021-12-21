import cloudinary from 'cloudinary'

import { Connection } from 'database/database'

import utils from 'utils'

import { ProtectedMulterRoute } from 'types/express'

const changeAvatar: ProtectedMulterRoute = async (req, res, next) => {
    try {
        await Connection.transaction(async transaction => {
            const { path } = req.file
            const { profile } = req.user
            if (profile.avatarCloudinaryId) {
                await cloudinary.v2.uploader.destroy(profile.avatarCloudinaryId, {
                    invalidate: true
                })
            }
            const { public_id, secure_url } = await cloudinary.v2.uploader.upload(path, {
                use_filename: true
            })
            utils.deleteTemporaryFile(req.file.path)
            await profile.update(
                {
                    avatar: secure_url,
                    avatarCloudinaryId: public_id
                },
                {
                    transaction
                }
            )
            res.send({
                avatar: secure_url,
                feedback: 'Your avatar has been updated'
            })
        })
    } catch (error) {
        utils.deleteTemporaryFile(req.file.path)
        next(error)
    }
}

export default changeAvatar
