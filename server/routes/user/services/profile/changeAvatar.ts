import fs from 'fs'
import cloudinary from 'cloudinary'

import { Connection } from 'database/database'

import { ProtectedMulterRoute } from 'types/express'

const changeAvatar: ProtectedMulterRoute = async (req, res, next) => {
    const { path } = req.file
    try {
        await Connection.transaction(async transaction => {
            const { profile } = req.user
            if (profile.avatarCloudinaryId) {
                await cloudinary.v2.uploader.destroy(profile.avatarCloudinaryId, {
                    invalidate: true
                })
            }
            const { public_id, secure_url } = await cloudinary.v2.uploader.upload(path, {
                use_filename: true
            })
            try {
                fs.existsSync(path) && fs.unlinkSync(path)
            } catch (error) {}
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
        try {
            fs.existsSync(path) && fs.unlinkSync(path)
        } catch (error) {}
        next(error)
    }
}

export default changeAvatar
