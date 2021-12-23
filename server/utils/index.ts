import { Op } from 'sequelize'
import ApiError from './ApiError'
import handleError from './handleError'
import baseUrl from './baseUrl'
import transporter from './transporter'
import cookie from './cookie'
import emailTemplate from './emailTemplate'
import deleteTemporaryFile from './deleteTemporaryFile'
import filesRegex from './filesRegex'
import validator from './validator'
import checkSanitization from './checkSanitization'
import defaultAvatar from './defaultAvatar'

const utils = {
    Op,
    ApiError,
    handleError,
    baseUrl,
    transporter,
    cookie,
    emailTemplate,
    deleteTemporaryFile,
    filesRegex,
    validator,
    checkSanitization,
    defaultAvatar
}

export default utils
