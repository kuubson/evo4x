import { check } from 'express-validator'

import utils from '@utils'

const validateProperty = property =>
    check(`${property}`)
        .trim()
        .notEmpty()
        .withMessage('This fields cannot be empty')
        .bail()
        .isString()
        .bail()
        .custom(utils.checkSanitization)
        .withMessage('This field contains invalid characters')
        .bail()
const validateInteger = property => {
    return check(`${property}`).notEmpty().bail().isInt().bail()
}
const validateBoolean = property => {
    return check(`${property}`).notEmpty().bail().isBoolean().bail()
}
const validateArray = (property, canBeEmpty) =>
    !canBeEmpty
        ? check(`${property}`).notEmpty().bail().isArray().bail()
        : check(`${property}`).isArray().bail()
const validateEmail = () =>
    check('email')
        .trim()
        .notEmpty()
        .withMessage('Type your email address')
        .bail()
        .isEmail()
        .withMessage('Type proper email address')
        .normalizeEmail()
const validatePassword = (withLogin = false) =>
    !withLogin
        ? check('password')
              .notEmpty()
              .withMessage('Type your password')
              .bail()
              .custom((password, { req }) => {
                  if (!/(?=.{8,})/.test(password)) {
                      throw new Error('Password must be at least 8 characters long')
                  }
                  if (!/(?=.*[a-z])/.test(password)) {
                      throw new Error('Password must contain at least one small letter')
                  }
                  if (!/(?=.*[A-Z])/.test(password)) {
                      throw new Error('Password must contain at least one big letter')
                  }
                  if (!/(?=.*[0-9])/.test(password)) {
                      throw new Error('Password must contain at least one digit')
                  }
                  if (password !== req.body.password) {
                      throw new Error('Passwords are different')
                  }
                  return password
              })
        : check('password').notEmpty().withMessage('Type your password')
const validateRepeatedPassword = () =>
    check('repeatedPassword')
        .notEmpty()
        .withMessage('Type password twice')
        .bail()
        .custom((repeatedPassword, { req }) => {
            if (repeatedPassword !== req.body.password) {
                throw new Error('Passwords are different')
            }
            return repeatedPassword
        })

export default {
    validateProperty,
    validateInteger,
    validateBoolean,
    validateArray,
    validateEmail,
    validatePassword,
    validateRepeatedPassword
}
