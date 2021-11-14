const getProfile = async (req, res, next) => {
    try {
        const { name, story, avatar } = req.user.profile
        res.send({
            name,
            story,
            avatar
        })
    } catch (error) {
        next(error)
    }
}

export default getProfile
