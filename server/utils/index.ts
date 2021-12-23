import { Op } from 'sequelize'
import ApiError from './ApiError'
import handleError from './handleError'
import baseUrl from './baseUrl'
import cookie from './cookie'
import emailTemplate from './emailTemplate'
import defaultAvatar from './defaultAvatar'
import filesInfo from './filesInfo'

const utils = {
    Op,
    ApiError,
    handleError,
    baseUrl,
    cookie,
    emailTemplate,
    defaultAvatar,
    filesInfo
}

export default utils
