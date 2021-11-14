import cloudinary from 'cloudinary'

import { Connection } from '@database'

const removeAvatar = async (req, res, next) => {
    try {
        await Connection.transaction(async transaction => {
            await cloudinary.v2.uploader.destroy(req.user.profile.avatarCloudinaryId, {
                invalidate: true
            })
            const avatar = `https://eu.ui-avatars.com/api/?name=${req.user.profile.name.charAt(0)}`
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
