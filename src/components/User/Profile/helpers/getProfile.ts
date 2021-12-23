import utils from 'utils'

type ProfileGetter = {
    setProfile: React.Dispatch<React.SetStateAction<Profile>>
    setAvatar: DispatchString
}

const getProfile = async ({ setProfile, setAvatar }: ProfileGetter) => {
    try {
        const url = '/api/user/profile/getProfile'
        const response = await utils.axios.get(url)
        if (response) {
            const { name, story, avatar } = response.data
            setProfile(profile => ({
                ...profile,
                name,
                story
            }))
            setAvatar(avatar)
        }
    } catch (error) {
        setAvatar(utils.defaultAvatar(''))
    }
}

export default getProfile
