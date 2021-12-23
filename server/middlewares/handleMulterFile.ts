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
                utils.deleteTemporaryFile(req.file.path)
                next(new utils.ApiError('You cannot send a file with this extension', 500))
                break
            case req.sizeLimit:
                utils.deleteTemporaryFile(req.file.path)
                next(new utils.ApiError('You cannot send this large file', 500))
                break
            default:
                const { filename, path } = req.file
                if (utils.filesRegex.images.test(filename)) {
                    helpers.reduceImageSize(path, next)
                } else {
                    next()
                }
        }
    })

export default handleMulterFile
