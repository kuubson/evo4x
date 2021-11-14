import cloudinary from 'cloudinary'

import { Connection } from '@database'

import utils from '@utils'

const removeAvatar = async (req, res, next) => {
    try {
        await Connection.transaction(async transaction => {
            const cloudinaryId = req.user.profile.avatarCloudinaryId
            if (cloudinaryId) {
                await cloudinary.v2.uploader.destroy(cloudinaryId, {
                    invalidate: true
                })
            }
            const avatar = utils.defaultAvatar(req.user.profile.name)
            await req.user.profile.update(
                {
                    avatar
                },
                {
                    transaction
                }
            )
            res.send({
                avatar,
                feedback: 'Your avatar has been updated'
            })
        })
    } catch (error) {
        next(error)
    }
}

export default removeAvatar
