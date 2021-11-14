import utils from '@utils'

const login = async (req, res, next) => {
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
    utils.validator.validateProperty('name'),
    utils.validator.validateProperty('avatar')
]

export default login
