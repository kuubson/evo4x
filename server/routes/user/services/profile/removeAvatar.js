import cloudinary from 'cloudinary'

import { Connection } from '@database'

import utils from '@utils'

const removeAvatar = async (req, res, next) => {
    try {
        await Connection.transaction(async transaction => {
            const { profile } = req.user
            if (profile.avatarCloudinaryId) {
                await cloudinary.v2.uploader.destroy(profile.avatarCloudinaryId, {
                    invalidate: true
                })
            }
            const avatar = utils.defaultAvatar(profile.name)
            await profile.update(
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
