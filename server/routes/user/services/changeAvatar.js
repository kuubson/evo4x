import fs from 'fs'
import cloudinary from 'cloudinary'

import { Connection } from '@database'

const changeAvatar = async (req, res, next) => {
    try {
        const { path } = req.file
        await Connection.transaction(async transaction => {
            const cloudinaryId = req.user.profile.avatarCloudinaryId
            if (cloudinaryId) {
                await cloudinary.v2.uploader.destroy(cloudinaryId, {
                    invalidate: true
                })
            }
            const { public_id, secure_url } = await cloudinary.v2.uploader.upload(path, {
                use_filename: true
            })
            try {
                fs.existsSync(path) && fs.unlinkSync(path)
            } catch (error) {}
            await req.user.profile.update(
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
        try {
            fs.existsSync(path) && fs.unlinkSync(path)
        } catch (error) {}
        next(error)
    }
}

export default changeAvatar
