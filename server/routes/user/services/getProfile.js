const getProfile = async (_, res, next) => {
    try {
        res.send({
            feedback: 'profile'
        })
    } catch (error) {
        next(error)
    }
}

export default getProfile
