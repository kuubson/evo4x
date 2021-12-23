import { NextFunction } from 'express'
import fs from 'fs'
import sharp from 'sharp'

import utils from 'utils'

const reduceImageSize = async (path: string, next: NextFunction) =>
    await sharp(path)
        .rotate()
        .resize(800)
        .jpeg({ quality: 75 })
        .toBuffer((error, buffer) => {
            if (error) {
                utils.deleteTemporaryFile(path)
                next(new utils.ApiError('There was a problem sending the file', 500))
            }
            fs.writeFileSync(path, buffer)
            next()
        })

export default reduceImageSize
