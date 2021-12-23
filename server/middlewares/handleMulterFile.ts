import middlewares from 'middlewares'

import utils from 'utils'

import helpers from 'helpers'

import { MulterMiddleware } from 'types/multer'

const handleMulterFile = (): MulterMiddleware => (req, res, next) =>
    middlewares.multerFile.single('file')(req, res, () => {
        switch (true) {
            case !req.file as boolean:
                next(new utils.ApiError('There was a problem sending the file', 500))
                break
            case req.allowedExtenstionsError:
                helpers.deleteTemporaryFile(req.file.path)
                next(new utils.ApiError('You cannot send a file with this extension', 500))
                break
            case req.sizeLimit:
                helpers.deleteTemporaryFile(req.file.path)
                next(new utils.ApiError('You cannot send this large file', 500))
                break
            default:
                const { regex } = utils.filesInfo
                const { mimetype, originalname, path } = req.file
                if (regex.images.test(mimetype) || regex.images.test(originalname)) {
                    helpers.reduceImageSize(path, next)
                } else {
                    next()
                }
        }
    })

export default handleMulterFile
