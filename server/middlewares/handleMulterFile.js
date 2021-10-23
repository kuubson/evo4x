import fs from 'fs'
import sharp from 'sharp'

import middlewares from '@middlewares'

import utils from '@utils'

const handleMulterFile = () => (req, res, next) =>
    middlewares.multerFile.single('file')(req, res, () => {
        const deleteFile = () => {
            try {
                fs.existsSync(req.file.path) && fs.unlinkSync(req.file.path)
            } catch (error) {}
        }
        switch (true) {
            case !req.file:
                next(new utils.ApiError('There was a problem sending the file', 500))
                break
            case req.allowedExtenstionsError:
                deleteFile()
                next(new utils.ApiError('You cannot send a file with this extension', 500))
                break
            case req.sizeLimit:
                deleteFile()
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
                                deleteFile()
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
