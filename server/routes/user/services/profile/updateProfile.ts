import { check } from 'express-validator'

import helpers from 'helpers'

import { ProtectedRoute } from 'types/express'

const updateProfile: ProtectedRoute = async (req, res, next) => {
    try {
        const { name, story, avatar } = req.body
        await req.user.profile.update({
            name,
            story,
            avatar
        })
        res.send({
            feedback: 'Your profile has been updated'
        })
    } catch (error) {
        next(error)
    }
}

export const validation = () => [
    helpers.validator.validateProperty('name'),
    check('story').trim().isString().bail(),
    check('avatar').isURL()
]

export default updateProfile
