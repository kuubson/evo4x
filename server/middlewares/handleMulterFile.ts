import fs from 'fs'
import sharp from 'sharp'

import middlewares from 'middlewares'

import utils from 'utils'

import { MulterMiddleware } from 'types/multer'

const handleMulterFile = (): MulterMiddleware => (req, res, next) =>
    middlewares.multerFile.single('file')(req, res, () => {
        switch (true) {
            case !req.file as boolean:
                next(new utils.ApiError('There was a problem sending the file', 500))
                break
            case req.allowedExtenstionsError:
                utils.deleteTemporaryFile(req.file.path)
                next(new utils.ApiError('You cannot send a file with this extension', 500))
                break
            case req.sizeLimit:
                utils.deleteTemporaryFile(req.file.path)
                next(new utils.ApiError('You cannot send this large file', 500))
                break
            default:
                const { filename, path } = req.file
                const handleSharp = async () =>
                    await sharp(path)
                        .rotate()
                        .resize(800)
                        .jpeg({ quality: 75 })
                        .toBuffer((error, buffer) => {
                            if (error) {
                                utils.deleteTemporaryFile(req.file.path)
                                next(
                                    new utils.ApiError('There was a problem sending the file', 500)
                                )
                            }
                            fs.writeFileSync(path, buffer)
                            next()
                        })
                if (/jpg|jpeg|png|gif/i.test(filename)) {
                    handleSharp()
                } else {
                    next()
                }
        }
    })

export default handleMulterFile
