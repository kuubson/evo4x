import fs from 'fs'
import path from 'path'
import crypto from 'crypto'
import multer from 'multer'

import utils from 'utils'

import { MulterRequest } from 'types/multer'

const storage = multer.diskStorage({
    destination: (_, __, callback) => {
        try {
            const destination = `./uploads`
            !fs.existsSync(destination) && fs.mkdirSync(destination)
            return callback(null, destination)
        } catch (error) {}
    },
    filename: (_, { originalname }, callback) => {
        const extension = path.extname(originalname)
        const hash = crypto.randomBytes(30).toString('hex')
        callback(null, `filefilename${originalname}filename${hash}${extension}`)
    }
})

const multerFile = multer({
    storage,
    fileFilter: (req: MulterRequest, { mimetype, originalname }, callback) => {
        const { filesRegex } = utils
        const isImage = filesRegex.images.test(mimetype) || filesRegex.images.test(originalname)
        const isVideo = filesRegex.videos.test(mimetype) || filesRegex.videos.test(originalname)
        const isFile = filesRegex.files.test(mimetype) || filesRegex.files.test(originalname)
        if (!isImage && !isVideo && !isFile) {
            req.allowedExtenstionsError = true
        }
        const size = parseInt(req.headers['content-length']!)
        if (isImage) {
            if (size > 31457280) {
                req.sizeLimit = true // 30MB
            }
        }
        if (isVideo) {
            if (size > 52428800) {
                req.sizeLimit = true // 50MB
            }
        }
        if (isFile) {
            if (size > 10485760) {
                req.sizeLimit = true // 10MB
            }
        }
        return callback(null, true)
    }
})

export default multerFile
